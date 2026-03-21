import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { patientId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const patient = await prisma.patient.findFirst({
    where: { id: params.patientId, clinicId: session.user.clinicId },
    include: {
      doctor: { select: { id: true, name: true } },
      reports: {
        orderBy: { reportDate: 'desc' },
        select: {
          id: true,
          reportDate: true,
          status: true,
          originalName: true,
          fileSizeBytes: true,
          createdAt: true,
          analysisAt: true,
        },
      },
    },
  })

  if (!patient) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(patient)
}

export async function DELETE(
  req: Request,
  { params }: { params: { patientId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  if (session.user.role !== 'CLINIC_ADMIN') {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const patient = await prisma.patient.findFirst({
    where: { id: params.patientId, clinicId: session.user.clinicId },
  })
  if (!patient) return Response.json({ error: 'Not found' }, { status: 404 })

  await prisma.patient.delete({ where: { id: params.patientId } })
  return new Response(null, { status: 204 })
}
