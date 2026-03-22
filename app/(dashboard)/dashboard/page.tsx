import { requireSession } from '@/lib/auth-guard'
import { prisma } from '@/lib/prisma'
import { MOCK_PATIENTS, MOCK_REPORTS } from '@/lib/mock-data'
import { getTodayAppointments } from '@/lib/mock-appointments'
import { DoctorDashboard } from '@/components/dashboard/doctor-dashboard'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

const STATUS_LABELS: Record<string, string> = {
  PENDING: '待解析', PARSING: '解析中', PARSED: '待分析',
  ANALYZING: 'AI分析中', COMPLETE: '已完成', ERROR: '錯誤',
}
const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-700',
  PARSING: 'bg-yellow-100 text-yellow-700',
  PARSED: 'bg-blue-100 text-blue-700',
  ANALYZING: 'bg-purple-100 text-purple-700',
  COMPLETE: 'bg-green-100 text-green-700',
  ERROR: 'bg-red-100 text-red-700',
}

export default async function DashboardPage() {
  const session = await requireSession()
  const { clinicId, id: userId, role } = session.user

  // ── Doctor role: show Physician Prep Dashboard ────────────────────────────
  if (role === 'DOCTOR') {
    const appointments = getTodayAppointments(userId)
    return (
      <DoctorDashboard
        appointments={appointments}
        userName={session.user.name ?? ''}
        clinicName={session.user.clinicName ?? ''}
      />
    )
  }

  // ── Admin role: show stats overview ───────────────────────────────────────
  let totalPatients = 0
  let reportsThisMonth = 0
  let pendingAnalysis = 0
  let recentReports: typeof MOCK_REPORTS = []

  try {
    const whereClause = { clinicId }
    ;[totalPatients, reportsThisMonth, pendingAnalysis, recentReports] = await Promise.all([
      prisma.patient.count({ where: whereClause }),
      prisma.labReport.count({
        where: { clinicId, createdAt: { gte: new Date(new Date().setDate(1)) } },
      }),
      prisma.labReport.count({
        where: { clinicId, status: { in: ['PARSED', 'PENDING'] } },
      }),
      prisma.labReport.findMany({
        where: { clinicId },
        include: { patient: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }) as any,
    ])
  } catch {
    totalPatients = MOCK_PATIENTS.length
    reportsThisMonth = MOCK_REPORTS.length
    pendingAnalysis = MOCK_REPORTS.filter(r => r.status === 'PARSED').length
    recentReports = MOCK_REPORTS as any
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          歡迎回來，{session.user.name}
        </h1>
        <p className="text-sm text-gray-500 mt-1">{session.user.clinicName}</p>
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {[
          { label: '患者總數', value: totalPatients, icon: '👥' },
          { label: '本月報告', value: reportsThisMonth, icon: '📋' },
          { label: '待AI分析', value: pendingAnalysis, icon: '🤖' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-3 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
              <div>
                <p className="text-xs md:text-sm text-gray-500 leading-tight">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-0.5 md:mt-1">{stat.value}</p>
              </div>
              <span className="text-xl md:text-3xl hidden md:block">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">最近上傳報告</h2>
          <Link href="/patients" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            查看全部患者 →
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recentReports.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-sm">尚無報告</div>
          ) : (
            recentReports.map((report: any) => (
              <Link
                key={report.id}
                href={`/patients/${report.patientId}/reports/${report.id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {report.patient.lastName}{report.patient.firstName}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {report.originalName} · {formatDate(report.reportDate)}
                  </p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[report.status]}`}>
                  {STATUS_LABELS[report.status]}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
