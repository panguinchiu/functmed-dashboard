import { requireSession } from '@/lib/auth-guard'
import { prisma } from '@/lib/prisma'
import { MOCK_PATIENTS } from '@/lib/mock-data'
import Link from 'next/link'
import { formatDate, calcAge } from '@/lib/utils'
import { AddPatientDialog } from '@/components/patients/add-patient-dialog'

const GENDER_LABELS: Record<string, string> = { MALE: '男', FEMALE: '女', OTHER: '其他' }

export default async function PatientsPage({
  searchParams,
}: {
  searchParams: { search?: string }
}) {
  const session = await requireSession()
  const { clinicId, id: userId, role } = session.user
  const search = searchParams.search ?? ''

  let patients: typeof MOCK_PATIENTS = []

  try {
    patients = await prisma.patient.findMany({
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
    }) as any
  } catch {
    patients = MOCK_PATIENTS.filter(p =>
      !search ||
      p.firstName.includes(search) ||
      p.lastName.includes(search) ||
      p.chartNumber.includes(search)
    ) as any
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">患者管理</h1>
          <p className="text-sm text-gray-500 mt-1">共 {patients.length} 位患者</p>
        </div>
        <AddPatientDialog />
      </div>

      {/* Search */}
      <form method="GET" className="flex gap-3">
        <input
          name="search"
          defaultValue={search}
          placeholder="搜尋姓名或病歷號..."
          className="flex-1 max-w-xs px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
          搜尋
        </button>
      </form>

      {/* Mobile card list */}
      <div className="md:hidden space-y-2">
        {patients.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 py-12 text-center text-gray-400 text-sm">
            {search ? `找不到「${search}」相關患者` : '尚無患者資料'}
          </div>
        ) : patients.map((p: any) => (
          <Link key={p.id} href={`/patients/${p.id}`}
            className="block bg-white rounded-xl border border-gray-200 p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-sm">{p.lastName}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{p.lastName}{p.firstName}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.chartNumber} · {calcAge(p.dateOfBirth)} 歲 / {GENDER_LABELS[p.gender]}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">{p._count?.reports ?? 0} 份</span>
                <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['病歷號', '姓名', '年齡/性別', '主治醫師', '報告數', '建檔日期', ''].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400 text-sm">
                    {search ? `找不到「${search}」相關患者` : '尚無患者資料'}
                  </td>
                </tr>
              ) : (
                patients.map((p: any) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm font-mono text-gray-600">{p.chartNumber}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{p.lastName}{p.firstName}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{calcAge(p.dateOfBirth)} 歲 / {GENDER_LABELS[p.gender]}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{p.doctor?.name ?? '—'}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {p._count?.reports ?? 0} 份
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{formatDate(p.createdAt)}</td>
                    <td className="py-3 px-4">
                      <Link href={`/patients/${p.id}`} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        查看 →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
