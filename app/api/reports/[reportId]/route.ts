import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getBlobSasUrl } from '@/lib/azure-storage'

export async function GET(
  req: Request,
  { params }: { params: { reportId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const report = await prisma.labReport.findFirst({
    where: { id: params.reportId, clinicId: session.user.clinicId },
    include: {
      patient: true,
      panels: { orderBy: { panelType: 'asc' } },
    },
  })

  if (!report) return Response.json({ error: 'Not found' }, { status: 404 })

  // Generate SAS URL for PDF download
  let pdfSasUrl: string | null = null
  try {
    pdfSasUrl = await getBlobSasUrl(report.blobName, 60)
  } catch {
    // SAS URL generation failed — not critical
  }

  return Response.json({ ...report, pdfSasUrl })
}
