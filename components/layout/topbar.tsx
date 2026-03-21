'use client'

import { signOut } from 'next-auth/react'

interface TopbarProps {
  user: {
    name: string
    email: string
    role: 'CLINIC_ADMIN' | 'DOCTOR'
  }
}

const ROLE_LABELS = {
  CLINIC_ADMIN: '診所管理員',
  DOCTOR: '醫師',
}

export function Topbar({ user }: TopbarProps) {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div />
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <p className="text-xs text-gray-500">{ROLE_LABELS[user.role]}</p>
        </div>
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-700 text-sm font-semibold">
            {user.name?.charAt(0) ?? 'U'}
          </span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          登出
        </button>
      </div>
    </header>
  )
}
