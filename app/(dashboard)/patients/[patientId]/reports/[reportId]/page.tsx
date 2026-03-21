import { requireSession } from '@/lib/auth-guard'
import { prisma } from '@/lib/prisma'
import { MOCK_REPORTS, MOCK_PANELS } from '@/lib/mock-data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate, calcAge, formatFileSize } from '@/lib/utils'
import { PanelViewer } from '@/components/reports/panel-viewer'
import { AiAnalysisView } from '@/components/reports/ai-analysis-view'
import { PANEL_META, LabValue, FoodSensitivityItem } from '@/types'

const PANEL_ORDER = [
  'HORMONE', 'ALLERGY_FOOD_SENSITIVITY', 'GI_HEALTH',
  'ORGANIC_ACIDS', 'TOXIC_ELEMENTS', 'OXIDATIVE_STRESS',
]

const STATUS_LABELS: Record<string, string> = {
  PENDING: '待解析', PARSING: '解析中', PARSED: '待AI分析',
  ANALYZING: 'AI分析中', COMPLETE: '分析完成', ERROR: '錯誤',
}
const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-700',
  PARSING: 'bg-yellow-100 text-yellow-700',
  PARSED: 'bg-blue-100 text-blue-700',
  ANALYZING: 'bg-purple-100 text-purple-700',
  COMPLETE: 'bg-green-100 text-green-700',
  ERROR: 'bg-red-100 text-red-700',
}

export default async function ReportPage({
  params,
}: {
  params: { patientId: string; reportId: string }
}) {
  const session = await requireSession()

  let report: any = null
  let panels: any[] = []
  let pdfSasUrl: string | null = null

  try {
    report = await prisma.labReport.findFirst({
      where: { id: params.reportId, clinicId: session.user.clinicId },
      include: { patient: true, panels: { orderBy: { panelType: 'asc' } } },
    })
    if (report) {
      panels = report.panels
      // Try to get SAS URL
      try {
        const { getBlobSasUrl } = await import('@/lib/azure-storage')
        pdfSasUrl = await getBlobSasUrl(report.blobName, 60)
      } catch { /* non-critical */ }
    }
  } catch {
    // DB unavailable — use mock data
    report = MOCK_REPORTS.find(r => r.id === params.reportId) ?? null
    panels = MOCK_PANELS
  }

  if (!report) notFound()

  const panelMap = Object.fromEntries(panels.map((p: any) => [p.panelType, p]))
  const patient = report.patient ?? MOCK_REPORTS[0].patient

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500">
        <Link href="/patients" className="hover:text-gray-700">患者管理</Link>
        <span className="mx-2">/</span>
        <Link href={`/patients/${report.patientId}`} className="hover:text-gray-700">
          {patient.lastName}{patient.firstName}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">報告詳情</span>
      </nav>

      {/* Report header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-xl font-bold text-gray-900">
                {patient.lastName}{patient.firstName} — 功能醫學報告
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[report.status]}`}>
                {STATUS_LABELS[report.status]}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>報告日期：{formatDate(report.reportDate)}</span>
              <span>年齡：{calcAge(patient.dateOfBirth)} 歲</span>
              <span>性別：{patient.gender === 'FEMALE' ? '女' : patient.gender === 'MALE' ? '男' : '其他'}</span>
              <span>病歷號：{patient.chartNumber}</span>
            </div>
          </div>
          {pdfSasUrl && (
            <a href={pdfSasUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              下載原始PDF
            </a>
          )}
        </div>
        <div className="mt-3 text-xs text-gray-400">
          {report.originalName} · {formatFileSize(report.fileSizeBytes)}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left: Lab panels */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900">檢測面板</h2>
          {PANEL_ORDER.map(panelType => {
            const panel = panelMap[panelType]
            if (!panel) return null
            const meta = PANEL_META[panelType]
            return (
              <details key={panelType} className="bg-white rounded-xl border border-gray-200 group" open={panel.flagged}>
                <summary className="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{meta?.label ?? panelType}</span>
                    <span className="text-xs text-gray-400">{meta?.labelEn}</span>
                    {panel.flagged && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">有異常</span>
                    )}
                  </div>
                  <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4">
                  <PanelViewer
                    panelType={panelType}
                    values={panel.values as Record<string, LabValue | FoodSensitivityItem[] | undefined>}
                    flagged={panel.flagged}
                  />
                </div>
              </details>
            )
          })}
        </div>

        {/* Right: AI analysis */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-4">AI 功能醫學分析</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <AiAnalysisView
              reportId={report.id}
              initialStatus={report.status}
              initialAnalysis={report.aiAnalysis ?? null}
              patient={{
                name: `${patient.lastName}${patient.firstName}`,
                age: calcAge(patient.dateOfBirth),
                gender: patient.gender === 'FEMALE' ? '女' : patient.gender === 'MALE' ? '男' : '其他',
                chartNumber: patient.chartNumber,
                reportDate: formatDate(report.reportDate),
                flaggedPanels: panels.filter((p: any) => p.flagged).length,
                totalPanels: panels.length,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
