import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CreatePatientSchema } from '@/lib/validations'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { clinicId, id: userId, role } = session.user
  const search = req.nextUrl.searchParams.get('search') ?? ''

  const patients = await prisma.patient.findMany({
    where: {
      clinicId,
      ...(role === 'DOCTOR' ? { doctorId: userId } : {}),
      ...(search
        ? {
            OR: [
              { firstName: { contains: search, mode: 'insensitive' } },
              { lastName: { contains: search, mode: 'insensitive' } },
              { chartNumber: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    },
    include: {
      doctor: { select: { id: true, name: true } },
      _count: { select: { reports: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(patients)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = CreatePatientSchema.safeParse(await req.json())
  if (!body.success) return Response.json({ error: body.error.flatten() }, { status: 400 })

  const patient = await prisma.patient.create({
    data: {
      ...body.data,
      dateOfBirth: new Date(body.data.dateOfBirth),
      clinicId: session.user.clinicId,
      doctorId: session.user.id,
    },
  })

  return Response.json(patient, { status: 201 })
}
