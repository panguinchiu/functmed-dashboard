'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function CreateUserForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'DOCTOR',
  })

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? 'Failed')
      }

      const user = await res.json()
      setSuccess(`帳號 ${user.email} 已成功建立`)
      setForm({ name: '', email: '', password: '', role: 'DOCTOR' })
      router.refresh()
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
        <input value={form.name} onChange={e => update('name', e.target.value)} required
          placeholder="王大明 醫師"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">電子郵件 *</label>
        <input type="email" value={form.email} onChange={e => update('email', e.target.value)} required
          placeholder="doctor@clinic.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">初始密碼 * (最少8位)</label>
        <input type="password" value={form.password} onChange={e => update('password', e.target.value)} required minLength={8}
          placeholder="••••••••"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">角色 *</label>
        <select value={form.role} onChange={e => update('role', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="DOCTOR">醫師</option>
          <option value="CLINIC_ADMIN">診所管理員</option>
        </select>
      </div>

      {error && (
        <div className="md:col-span-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="md:col-span-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          ✓ {success}
        </div>
      )}

      <div className="md:col-span-2">
        <button type="submit" disabled={loading}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white text-sm font-medium rounded-lg transition-colors">
          {loading ? '建立中...' : '建立帳號'}
        </button>
      </div>
    </form>
  )
}
