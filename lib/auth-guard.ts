import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import { redirect } from 'next/navigation'

export async function requireSession() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  return session
}

export async function requireClinicAdmin() {
  const session = await requireSession()
  if (session.user.role !== 'CLINIC_ADMIN') redirect('/dashboard')
  return session
}

export async function assertClinicOwnership(resourceClinicId: string) {
  const session = await requireSession()
  if (session.user.clinicId !== resourceClinicId) {
    throw new Error('Forbidden: cross-clinic access denied')
  }
  return session
}
