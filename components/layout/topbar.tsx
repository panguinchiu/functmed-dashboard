'use client'

import { signOut } from 'next-auth/react'
import { useState } from 'react'

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
  const [signingOut, setSigningOut] = useState(false)

  async function handleSignOut() {
    setSigningOut(true)
    await signOut({ callbackUrl: `${window.location.origin}/login` })
  }

  return (
    <header className="h-14 glass border-b border-white/60 sticky top-0 z-30 flex items-center justify-between px-6">
      <div />

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800">{user.name}</p>
          <p className="text-[11px] text-gray-400">{ROLE_LABELS[user.role]}</p>
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center shadow-sm">
          <span className="text-amber-700 text-sm font-bold">
            {user.name?.charAt(0) ?? 'U'}
          </span>
        </div>

        {/* Sign-out — micro-interaction */}
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="btn-ghost text-xs gap-1.5 disabled:opacity-50"
        >
          {signingOut ? (
            <>
              <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              登出中
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              登出
            </>
          )}
        </button>
      </div>
    </header>
  )
}
