import { requireClinicAdmin } from '@/lib/auth-guard'
import { prisma } from '@/lib/prisma'
import { MOCK_USERS } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import { CreateUserForm } from '@/components/admin/create-user-form'

const ROLE_LABELS: Record<string, string> = {
  CLINIC_ADMIN: '診所管理員',
  DOCTOR: '醫師',
}

export default async function AdminPage() {
  const session = await requireClinicAdmin()

  let users: typeof MOCK_USERS = []

  try {
    users = await prisma.user.findMany({
      where: { clinicId: session.user.clinicId },
      select: {
        id: true, email: true, name: true, role: true, createdAt: true,
        _count: { select: { patients: true } },
      },
      orderBy: { createdAt: 'asc' },
    }) as any
  } catch {
    users = MOCK_USERS as any
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">診所管理</h1>
        <p className="text-sm text-gray-500 mt-1">{session.user.clinicName}</p>
      </div>

      {/* User list */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">帳號管理</h2>
          <span className="text-sm text-gray-500">{users.length} 個帳號</span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {['姓名', '電子郵件', '角色', '管理患者數', '建立日期'].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user: any) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{user.name}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'CLINIC_ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {ROLE_LABELS[user.role]}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{user._count?.patients ?? 0} 位</td>
                <td className="py-3 px-4 text-sm text-gray-500">{formatDate(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create user form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">新增帳號</h2>
        <CreateUserForm />
      </div>
    </div>
  )
}
