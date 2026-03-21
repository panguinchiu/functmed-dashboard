import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { uploadPdfToBlob } from '@/lib/azure-storage'
import { parsePdfReport, hasFlaggedValues } from '@/lib/pdf-parser'
import { PanelType } from '@prisma/client'

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const patientId = formData.get('patientId') as string | null
  const reportDate = formData.get('reportDate') as string | null

  if (!file || !patientId || !reportDate) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (file.size > MAX_FILE_SIZE) {
    return Response.json({ error: 'File too large (max 20MB)' }, { status: 400 })
  }

  if (file.type !== 'application/pdf') {
    return Response.json({ error: 'Only PDF files are accepted' }, { status: 400 })
  }

  // Verify patient belongs to this clinic
  const patient = await prisma.patient.findFirst({
    where: { id: patientId, clinicId: session.user.clinicId },
  })
  if (!patient) return Response.json({ error: 'Patient not found' }, { status: 404 })

  const buffer = Buffer.from(await file.arrayBuffer())

  // Upload to Azure Blob Storage
  const { blobName } = await uploadPdfToBlob(
    buffer,
    file.name,
    session.user.clinicId,
    patientId
  )

  // Create report record
  const report = await prisma.labReport.create({
    data: {
      patientId,
      clinicId: session.user.clinicId,
      uploadedBy: session.user.id,
      reportDate: new Date(reportDate),
      blobName,
      originalName: file.name,
      fileSizeBytes: file.size,
      status: 'PARSING',
    },
  })

  // Parse PDF and update record
  try {
    const { parsedData, sections, errors } = await parsePdfReport(buffer)

    // Create LabPanel records for each section
    const panelTypeMap: Record<string, PanelType> = {
      HORMONE: 'HORMONE',
      ALLERGY_FOOD_SENSITIVITY: 'ALLERGY_FOOD_SENSITIVITY',
      GI_HEALTH: 'GI_HEALTH',
      ORGANIC_ACIDS: 'ORGANIC_ACIDS',
      TOXIC_ELEMENTS: 'TOXIC_ELEMENTS',
      OXIDATIVE_STRESS: 'OXIDATIVE_STRESS',
    }

    const panelDataMap: Record<string, object> = {
      HORMONE: parsedData.hormone ?? {},
      ALLERGY_FOOD_SENSITIVITY: parsedData.allergyFoodSensitivity ?? {},
      GI_HEALTH: parsedData.giHealth ?? {},
      ORGANIC_ACIDS: parsedData.organicAcids ?? {},
      TOXIC_ELEMENTS: parsedData.toxicElements ?? {},
      OXIDATIVE_STRESS: parsedData.oxidativeStress ?? {},
    }

    await Promise.all(
      Object.entries(sections).map(([key, rawText]) =>
        prisma.labPanel.create({
          data: {
            reportId: report.id,
            panelType: panelTypeMap[key],
            rawText,
            values: panelDataMap[key],
            flagged: hasFlaggedValues(panelDataMap[key] as Record<string, any>),
          },
        })
      )
    )

    await prisma.labReport.update({
      where: { id: report.id },
      data: {
        status: errors.length === 0 ? 'PARSED' : 'PARSED',
        parsedData: parsedData as any,
        parseError: errors.length > 0 ? errors.join('; ') : null,
      },
    })
  } catch (err) {
    await prisma.labReport.update({
      where: { id: report.id },
      data: { status: 'ERROR', parseError: String(err) },
    })
  }

  return Response.json({ reportId: report.id }, { status: 201 })
}
