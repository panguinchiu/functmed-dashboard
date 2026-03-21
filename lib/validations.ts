import { z } from 'zod'

export const CreatePatientSchema = z.object({
  chartNumber: z.string().min(1).max(50),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  dateOfBirth: z.string(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  notes: z.string().optional(),
})

export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(8),
  role: z.enum(['CLINIC_ADMIN', 'DOCTOR']),
})

export const UploadReportSchema = z.object({
  patientId: z.string().min(1),
  reportDate: z.string(),
})
