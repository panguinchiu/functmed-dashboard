import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CreateUserSchema } from '@/lib/validations'
import bcrypt from 'bcryptjs'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  if (session.user.role !== 'CLINIC_ADMIN') return Response.json({ error: 'Forbidden' }, { status: 403 })

  const users = await prisma.user.findMany({
    where: { clinicId: session.user.clinicId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      _count: { select: { patients: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(users)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  if (session.user.role !== 'CLINIC_ADMIN') return Response.json({ error: 'Forbidden' }, { status: 403 })

  const body = CreateUserSchema.safeParse(await req.json())
  if (!body.success) return Response.json({ error: body.error.flatten() }, { status: 400 })

  const existing = await prisma.user.findUnique({ where: { email: body.data.email } })
  if (existing) return Response.json({ error: 'Email already exists' }, { status: 409 })

  const passwordHash = await bcrypt.hash(body.data.password, 12)
  const user = await prisma.user.create({
    data: {
      email: body.data.email,
      name: body.data.name,
      passwordHash,
      role: body.data.role,
      clinicId: session.user.clinicId,
    },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  })

  return Response.json(user, { status: 201 })
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  if (session.user.role !== 'CLINIC_ADMIN') return Response.json({ error: 'Forbidden' }, { status: 403 })

  const { userId } = await req.json()
  if (userId === session.user.id) {
    return Response.json({ error: 'Cannot delete yourself' }, { status: 400 })
  }

  const user = await prisma.user.findFirst({
    where: { id: userId, clinicId: session.user.clinicId },
  })
  if (!user) return Response.json({ error: 'Not found' }, { status: 404 })

  await prisma.user.delete({ where: { id: userId } })
  return new Response(null, { status: 204 })
}
