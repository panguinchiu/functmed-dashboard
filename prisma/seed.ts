import { PrismaClient, Role, Gender, PanelType, ReportStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create demo clinic
  const clinic = await prisma.clinic.upsert({
    where: { slug: 'taipei-wellness' },
    update: {},
    create: {
      name: '台北功能醫學診所',
      slug: 'taipei-wellness',
    },
  })
  console.log(`Clinic: ${clinic.name}`)

  // Create clinic admin
  const adminHash = await bcrypt.hash('Admin1234!', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@taipei-wellness.com' },
    update: {},
    create: {
      email: 'admin@taipei-wellness.com',
      name: '診所管理員',
      passwordHash: adminHash,
      role: Role.CLINIC_ADMIN,
      clinicId: clinic.id,
    },
  })
  console.log(`Admin: ${admin.email}`)

  // Create demo doctor
  const doctorHash = await bcrypt.hash('Doctor1234!', 12)
  const doctor = await prisma.user.upsert({
    where: { email: 'wang@taipei-wellness.com' },
    update: {},
    create: {
      email: 'wang@taipei-wellness.com',
      name: '王大明 醫師',
      passwordHash: doctorHash,
      role: Role.DOCTOR,
      clinicId: clinic.id,
    },
  })
  console.log(`Doctor: ${doctor.email}`)

  // Create demo patient
  const patient = await prisma.patient.upsert({
    where: { clinicId_chartNumber: { clinicId: clinic.id, chartNumber: 'FM-2026-00421' } },
    update: {},
    create: {
      chartNumber: 'FM-2026-00421',
      firstName: '美玲',
      lastName: '陳',
      dateOfBirth: new Date('1984-05-15'),
      gender: Gender.FEMALE,
      email: 'meiling.chen@example.com',
      phone: '0912-345-678',
      notes: '模擬教學患者資料',
      clinicId: clinic.id,
      doctorId: doctor.id,
    },
  })
  console.log(`Patient: ${patient.lastName}${patient.firstName}`)

  console.log('Seed complete.')
  console.log('')
  console.log('Login credentials:')
  console.log(`  Admin:  admin@taipei-wellness.com / Admin1234!`)
  console.log(`  Doctor: wang@taipei-wellness.com  / Doctor1234!`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
