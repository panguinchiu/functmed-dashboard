import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

// Demo accounts — no DB required (for prototype/demo purposes)
const DEMO_USERS = {
  admin: {
    id: 'demo-admin-001',
    email: 'admin@taipei-wellness.com',
    name: '王院長（示範）',
    role: 'CLINIC_ADMIN' as const,
    clinicId: 'demo-clinic-001',
    clinicName: '台北功能醫學診所（示範）',
  },
  doctor: {
    id: 'demo-doctor-001',
    email: 'chen@taipei-wellness.com',
    name: '陳明德 醫師（示範）',
    role: 'DOCTOR' as const,
    clinicId: 'demo-clinic-001',
    clinicName: '台北功能醫學診所（示範）',
  },
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        demoRole: { label: 'Demo Role', type: 'text' },
      },
      async authorize(credentials) {
        // Demo login — no DB lookup required
        if (credentials?.demoRole === 'admin') return DEMO_USERS.admin
        if (credentials?.demoRole === 'doctor') return DEMO_USERS.doctor

        // Real credentials login
        if (!credentials?.email || !credentials?.password) return null

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: { clinic: true },
          })
          if (!user || !user.passwordHash) return null
          const valid = await bcrypt.compare(credentials.password, user.passwordHash)
          if (!valid) return null
          return {
            id: user.id,
            email: user.email,
            name: user.name ?? '',
            role: user.role,
            clinicId: user.clinicId,
            clinicName: user.clinic.name,
          }
        } catch {
          // DB not available — fall through
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.clinicId = user.clinicId
        token.clinicName = user.clinicName
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.role = token.role
      session.user.clinicId = token.clinicId
      session.user.clinicName = token.clinicName
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
}
