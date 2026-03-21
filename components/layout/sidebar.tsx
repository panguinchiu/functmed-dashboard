'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  role: 'CLINIC_ADMIN' | 'DOCTOR'
  clinicName: string
}

const navItems = [
  {
    href: '/dashboard',
    label: '總覽',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    adminOnly: false,
  },
  {
    href: '/patients',
    label: '患者管理',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    adminOnly: false,
  },
  {
    href: '/admin',
    label: '診所管理',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    adminOnly: true,
  },
]

export function Sidebar({ role, clinicName }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-sm">

      {/* Logo */}
      <Link
        href="/dashboard"
        className="flex items-center gap-3 px-6 py-5 border-b border-gray-100 group transition-colors hover:bg-amber-50/60"
      >
        {/* Compass star */}
        <div className="shrink-0 transition-transform duration-200 group-hover:scale-105">
          <svg width="38" height="38" viewBox="0 0 60 60" fill="none">
            <path d="M30 4 Q31.5 4 32 5.5 L37 30 L23 30 L28 5.5 Q28.5 4 30 4Z" fill="#FDE68A" />
            <path d="M30 56 Q28.5 56 28 54.5 L23 30 L37 30 L32 54.5 Q31.5 56 30 56Z" fill="#FDE68A" />
            <path d="M5 30 Q5 28.5 6.5 28 L30 23 L30 37 L6.5 32 Q5 31.5 5 30Z" fill="#FCD34D" />
            <path d="M57 30 Q57 31.5 55.5 32 L30 37 L30 23 L55.5 28 Q57 28.5 57 30Z" fill="#F59E0B" />
          </svg>
        </div>

        <div className="min-w-0">
          <span
            className="text-lg font-bold tracking-wide block"
            style={{ fontFamily: 'var(--font-nunito)', color: '#E8672A' }}
          >
            Lumi Health
          </span>
          <p className="text-[11px] text-gray-400 truncate leading-tight">{clinicName}</p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems
          .filter(item => !item.adminOnly || role === 'CLINIC_ADMIN')
          .map(item => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive ? 'nav-active' : 'nav-inactive'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            )
          })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100">
        <p className="text-xs text-gray-300 text-center" style={{ fontFamily: 'var(--font-nunito)' }}>
          Lumi Health v1.0
        </p>
      </div>
    </aside>
  )
}
