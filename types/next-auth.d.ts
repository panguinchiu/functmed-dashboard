import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: 'CLINIC_ADMIN' | 'DOCTOR'
      clinicId: string
      clinicName: string
    }
  }
  interface User {
    role: 'CLINIC_ADMIN' | 'DOCTOR'
    clinicId: string
    clinicName: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: 'CLINIC_ADMIN' | 'DOCTOR'
    clinicId: string
    clinicName: string
  }
}
