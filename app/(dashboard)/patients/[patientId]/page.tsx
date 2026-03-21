import { requireSession } from '@/lib/auth-guard'
import { prisma } from '@/lib/prisma'
import { MOCK_PATIENTS, MOCK_REPORTS } from '@/lib/mock-data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate, calcAge } from '@/lib/utils'
import { UploadDialog } from '@/components/reports/upload-dialog'

const GENDER_LABELS: Record<string, string> = { MALE: '男', FEMALE: '女', OTHER: '其他' }
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

export default async function PatientPage({ params }: { params: { patientId: string } }) {
  const session = await requireSession()

  let patient: any = null

  try {
    patient = await prisma.patient.findFirst({
      where: { id: params.patientId, clinicId: session.user.clinicId },
      include: {
        doctor: { select: { name: true } },
        reports: {
          orderBy: { reportDate: 'desc' },
          select: {
            id: true, reportDate: true, status: true,
            originalName: true, fileSizeBytes: true,
            createdAt: true, analysisAt: true,
            panels: { select: { flagged: true } },
          },
        },
      },
    })
  } catch {
    patient = MOCK_PATIENTS.find(p => p.id === params.patientId) ?? null
    if (patient) {
      patient = {
        ...patient,
        reports: MOCK_REPORTS
          .filter(r => r.patientId === params.patientId)
          .map(r => ({ ...r, panels: r.panels })),
      }
    }
  }

  if (!patient) notFound()

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500">
        <Link href="/patients" className="hover:text-gray-700">患者管理</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{patient.lastName}{patient.firstName}</span>
      </nav>

      {/* Patient info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-700 text-xl font-bold">{patient.lastName}</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{patient.lastName}{patient.firstName}</h1>
              <p className="text-sm text-gray-500 mt-0.5">病歷號：{patient.chartNumber}</p>
            </div>
          </div>
          <UploadDialog patientId={patient.id} patientName={`${patient.lastName}${patient.firstName}`} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
          {[
            { label: '年齡', value: `${calcAge(patient.dateOfBirth)} 歲` },
            { label: '性別', value: GENDER_LABELS[patient.gender] },
            { label: '出生日期', value: formatDate(patient.dateOfBirth) },
            { label: '主治醫師', value: patient.doctor?.name ?? '—' },
          ].map(item => (
            <div key={item.label}>
              <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
              <p className="text-sm font-medium text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>

        {patient.notes && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-1">備註</p>
            <p className="text-sm text-gray-700">{patient.notes}</p>
          </div>
        )}
      </div>

      {/* Reports */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">檢測報告記錄</h2>
          <span className="text-sm text-gray-500">{patient.reports.length} 份</span>
        </div>

        {patient.reports.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">尚無報告，請上傳 PDF 檢測報告</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {patient.reports.map((report: any) => {
              const hasFlagged = report.panels?.some((p: any) => p.flagged)
              return (
                <Link
                  key={report.id}
                  href={`/patients/${patient.id}/reports/${report.id}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-lg">📄</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{report.originalName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        報告日期：{formatDate(report.reportDate)}
                        {report.analysisAt && ` · 分析：${formatDate(report.analysisAt)}`}
                      </p>
                    </div>
                    {hasFlagged && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">有異常</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[report.status]}`}>
                      {STATUS_LABELS[report.status]}
                    </span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
