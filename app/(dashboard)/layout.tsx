import { requireSession } from '@/lib/auth-guard'
import { Sidebar } from '@/components/layout/sidebar'
import { Topbar } from '@/components/layout/topbar'
import { MobileNav } from '@/components/layout/mobile-nav'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession()

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar — desktop only */}
      <div className="hidden md:block">
        <Sidebar role={session.user.role} clinicName={session.user.clinicName} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar user={session.user} />
        <main className="flex-1 overflow-y-auto p-3 md:p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>

      {/* Bottom nav — mobile only */}
      <MobileNav role={session.user.role} />
    </div>
  )
}
