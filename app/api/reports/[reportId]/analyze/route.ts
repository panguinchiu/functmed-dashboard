export const maxDuration = 300 // 5 min — Vercel Pro/Fluid Compute

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { streamLabAnalysis } from '@/lib/claude'
import { ParsedReportData } from '@/types'
import { MOCK_REPORTS, MOCK_PANELS } from '@/lib/mock-data'

// Build ParsedReportData from mock panels for demo mode
function buildMockParsedData(): ParsedReportData {
  const result: ParsedReportData = {
    patientName: '陳美玲',
    patientAge: '42',
    patientGender: '女',
    collectionDate: '2026-03-10',
  }
  for (const panel of MOCK_PANELS) {
    const key = panel.panelType.toLowerCase().replace(/_([a-z])/g, (_: string, c: string) => c.toUpperCase())
    const keyMap: Record<string, keyof ParsedReportData> = {
      hORMONE: 'hormone',
      hormone: 'hormone',
      aLLERGYFOODSENSITIVITY: 'allergyFoodSensitivity',
      allergyFoodSensitivity: 'allergyFoodSensitivity',
      gIHEALTH: 'giHealth',
      giHealth: 'giHealth',
      oRGANICAcids: 'organicAcids',
      organicAcids: 'organicAcids',
      tOXICELEMENTS: 'toxicElements',
      toxicElements: 'toxicElements',
      oXIDATIVESTRESS: 'oxidativeStress',
      oxidativeStress: 'oxidativeStress',
    }
    const panelDataKey: Record<string, keyof ParsedReportData> = {
      HORMONE: 'hormone',
      ALLERGY_FOOD_SENSITIVITY: 'allergyFoodSensitivity',
      GI_HEALTH: 'giHealth',
      ORGANIC_ACIDS: 'organicAcids',
      TOXIC_ELEMENTS: 'toxicElements',
      OXIDATIVE_STRESS: 'oxidativeStress',
    }
    const dataKey = panelDataKey[panel.panelType]
    if (dataKey) {
      ;(result as any)[dataKey] = panel.values
    }
  }
  return result
}

export async function POST(
  req: Request,
  { params }: { params: { reportId: string } }
) {
  // Allow demo reports without strict auth check (Vercel demo mode)
  const isDemoReport = params.reportId.startsWith('demo-')

  if (!isDemoReport) {
    const session = await getServerSession(authOptions)
    if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let parsedData: ParsedReportData | null = null
  let isDemo = false

  // Try real DB first (skip for demo reports)
  try {
    if (isDemoReport) throw new Error('demo') // skip to mock

    const session = await getServerSession(authOptions)
    const report = await prisma.labReport.findFirst({
      where: { id: params.reportId, clinicId: session!.user.clinicId },
      include: { patient: true },
    })

    if (!report) {
      // Check if it's a demo report
      const mockReport = MOCK_REPORTS.find(r => r.id === params.reportId)
      if (!mockReport) return Response.json({ error: 'Not found' }, { status: 404 })
      parsedData = buildMockParsedData()
      isDemo = true
    } else {
      if (report.status === 'ANALYZING') {
        return Response.json({ error: 'Analysis already in progress' }, { status: 409 })
      }
      if (!report.parsedData) {
        // No parsed data from real report — use mock panels for demo
        parsedData = buildMockParsedData()
      } else {
        parsedData = report.parsedData as unknown as ParsedReportData
      }
      // Update status
      try {
        await prisma.labReport.update({
          where: { id: report.id },
          data: { status: 'ANALYZING' },
        })
      } catch { /* non-critical */ }
    }
  } catch {
    // DB unavailable — check mock reports
    const mockReport = MOCK_REPORTS.find(r => r.id === params.reportId)
    if (!mockReport) return Response.json({ error: 'Not found' }, { status: 404 })
    parsedData = buildMockParsedData()
    isDemo = true
  }

  if (!parsedData) {
    return Response.json({ error: 'No data to analyze' }, { status: 400 })
  }

  let fullText = ''

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of streamLabAnalysis(parsedData!)) {
          fullText += chunk
          controller.enqueue(new TextEncoder().encode(chunk))
        }

        // Save result to DB if available and not demo
        if (!isDemo) {
          try {
            await prisma.labReport.update({
              where: { id: params.reportId },
              data: { status: 'COMPLETE', aiAnalysis: fullText, analysisAt: new Date() },
            })
          } catch { /* non-critical */ }
        }

        controller.close()
      } catch (err) {
        console.error('AI analysis error:', err)
        // Send error as text in the stream so client can display it
        const errMsg = `\n\n**分析時發生錯誤：** ${String(err)}`
        controller.enqueue(new TextEncoder().encode(errMsg))
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  })
}
