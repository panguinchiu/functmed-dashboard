'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const DEMO_ROLES = [
  {
    role: 'admin' as const,
    title: '診所管理員',
    subtitle: '管理醫師帳號、診所設定',
    name: '王診所長（示範）',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'purple',
    bg: 'bg-purple-50 hover:bg-purple-100 border-purple-200 hover:border-purple-400',
    iconBg: 'bg-purple-100 text-purple-600',
    badge: 'bg-purple-100 text-purple-700',
    btn: 'bg-purple-600 hover:bg-purple-700',
  },
  {
    role: 'doctor' as const,
    title: '醫師',
    subtitle: '檢視患者、上傳報告、AI 分析',
    name: '王大明 醫師（示範）',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    color: 'blue',
    bg: 'bg-blue-50 hover:bg-blue-100 border-blue-200 hover:border-blue-400',
    iconBg: 'bg-blue-100 text-blue-600',
    badge: 'bg-blue-100 text-blue-700',
    btn: 'bg-blue-600 hover:bg-blue-700',
  },
]

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<'admin' | 'doctor' | null>(null)

  async function handleDemoLogin(role: 'admin' | 'doctor') {
    setLoading(role)
    const result = await signIn('credentials', {
      demoRole: role,
      redirect: false,
    })
    if (result?.ok) {
      router.push('/dashboard')
      router.refresh()
    } else {
      setLoading(null)
    }
  }

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-8 py-10 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">功能醫學儀表板</h1>
          <p className="text-blue-200 text-sm mt-1">台北功能醫學診所 · 示範版</p>
        </div>

        <div className="px-8 py-8">
          <p className="text-center text-sm font-medium text-gray-500 mb-5">選擇登入身份</p>

          <div className="space-y-3">
            {DEMO_ROLES.map(item => (
              <button
                key={item.role}
                onClick={() => handleDemoLogin(item.role)}
                disabled={loading !== null}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${item.bg} ${
                  loading === item.role ? 'opacity-70' : ''
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.iconBg}`}>
                  {loading === item.role ? (
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : item.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-base font-semibold text-gray-900">{item.title}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.badge}`}>示範</span>
                  </div>
                  <p className="text-xs text-gray-500">{item.subtitle}</p>
                  <p className="text-xs text-gray-400 mt-0.5">以 {item.name} 身份登入</p>
                </div>

                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-400 bg-white px-3">
              或使用帳號密碼登入
            </div>
          </div>

          <CredentialsForm />
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-4">
        示範版 · 所有資料均為模擬教學用途
      </p>
    </div>
  )
}

function CredentialsForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (result?.error) {
      setError('帳號或密碼錯誤')
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="w-full py-2.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 rounded-lg transition-colors"
      >
        輸入帳號密碼
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email" value={email} onChange={e => setEmail(e.target.value)} required
        placeholder="電子郵件"
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password" value={password} onChange={e => setPassword(e.target.value)} required
        placeholder="密碼"
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button
        type="submit" disabled={loading}
        className="w-full bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
      >
        {loading ? '登入中...' : '登入'}
      </button>
    </form>
  )
}
