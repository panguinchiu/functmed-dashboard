'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Appointment } from '@/lib/mock-appointments'
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'

// ─── Types ─────────────────────────────────────────────────────────────────

interface DoctorDashboardProps {
  appointments: Appointment[]
  userName: string
  clinicName: string
}

// ─── Helpers ───────────────────────────────────────────────────────────────

const TYPE_COLORS: Record<string, string> = {
  '功能醫學初診': 'bg-purple-100 text-purple-700 border-purple-200',
  '追蹤回診':    'bg-blue-100  text-blue-700  border-blue-200',
  '報告解說':    'bg-emerald-100 text-emerald-700 border-emerald-200',
  '電話諮詢':    'bg-amber-100  text-amber-700  border-amber-200',
}

const FLAG_TEXT: Record<string, string> = {
  HIGH: 'text-red-500', LOW: 'text-blue-500', NORMAL: 'text-emerald-600',
}
const FLAG_ARROW: Record<string, string> = { HIGH: '↑', LOW: '↓', NORMAL: '' }

function buildSparkData(current: number, flag: string) {
  const step = Math.abs(current) * 0.1 || 0.3
  const vals = flag === 'HIGH'
    ? [current - step * 2.5, current - step * 1.5, current - step * 0.7, current]
    : flag === 'LOW'
    ? [current + step * 2.5, current + step * 1.5, current + step * 0.7, current]
    : [current + step * 0.3, current - step * 0.2, current + step * 0.1, current]
  return vals.map((v, i) => ({ i, v: parseFloat(v.toFixed(2)) }))
}

// ─── Sparkline ─────────────────────────────────────────────────────────────

function Sparkline({ value, flag }: { value: number; flag: string }) {
  const data = buildSparkData(value, flag)
  const color = flag === 'HIGH' ? '#ef4444' : flag === 'LOW' ? '#3b82f6' : '#22c55e'
  return (
    <ResponsiveContainer width={60} height={26}>
      <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5}
          fill={color} fillOpacity={0.1} dot={false} />
        <Tooltip
          contentStyle={{ fontSize: 11, padding: '2px 6px', borderRadius: 6, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,.12)' }}
          formatter={(v: number) => [v, '']} labelFormatter={() => ''}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// ─── Mini Calendar ─────────────────────────────────────────────────────────

function MiniCalendar() {
  const today = new Date()
  const [viewing, setViewing] = useState({ year: today.getFullYear(), month: today.getMonth() })

  const firstDay = new Date(viewing.year, viewing.month, 1).getDay()
  const daysInMonth = new Date(viewing.year, viewing.month + 1, 0).getDate()
  const monthLabel = new Date(viewing.year, viewing.month).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long' })
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  const isToday = (d: number) =>
    d === today.getDate() && viewing.month === today.getMonth() && viewing.year === today.getFullYear()

  return (
    <div className="card-lift p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-700">{monthLabel}</span>
        <div className="flex gap-1">
          {['prev','next'].map(dir => (
            <button
              key={dir}
              onClick={() => setViewing(v =>
                dir === 'prev'
                  ? v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 }
                  : v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 }
              )}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-all duration-150 active:scale-90"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={dir === 'prev' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-[10px] text-gray-400 font-medium mb-2">
        {['日','一','二','三','四','五','六'].map(d => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 text-center gap-y-1">
        {cells.map((d, i) => (
          <div key={i} className={`text-xs leading-6 rounded-full w-6 h-6 mx-auto flex items-center justify-center select-none ${
            d === null ? '' :
            isToday(d)
              ? 'bg-amber-400 text-white font-bold shadow-sm shadow-amber-200'
              : 'text-gray-600 hover:bg-amber-50 cursor-default transition-colors'
          }`}>
            {d ?? ''}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">今日排程</p>
        {[
          { color: 'bg-blue-400', label: '追蹤回診 × 6' },
          { color: 'bg-purple-400', label: '初診 × 2' },
          { color: 'bg-emerald-400', label: '報告解說 × 2' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${item.color} animate-pulse-dot`} />
            <span className="text-xs text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Prep Summary Popup ────────────────────────────────────────────────────

function PrepSummaryPopup({ appt, onClose }: { appt: Appointment; onClose: () => void }) {
  return (
    <div className="absolute right-4 top-14 z-50 w-80 glass rounded-2xl shadow-xl p-6 animate-slide-up border border-white/70">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-bold text-gray-900">{appt.patientName}</p>
          <p className="text-[11px] text-gray-400">{appt.time} · {appt.type}</p>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all active:scale-90"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {appt.keyValues.length > 0 ? (
        <>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">關鍵指標趨勢</p>
          <div className="space-y-3 mb-5">
            {appt.keyValues.map(kv => (
              <div key={kv.label} className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-gray-700">{kv.label}</span>
                  <div className={`text-sm font-bold ${FLAG_TEXT[kv.flag]}`}>
                    {kv.value} <span className="text-xs font-normal text-gray-400">{kv.unit}</span> {FLAG_ARROW[kv.flag]}
                  </div>
                </div>
                <Sparkline value={Number(kv.value)} flag={kv.flag} />
              </div>
            ))}
          </div>

          <div className="glass-amber rounded-xl p-3 mb-4">
            <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-1.5">近期檢驗重點</p>
            {appt.keyValues.map(kv => (
              <div key={kv.label} className="flex items-center justify-between text-xs py-0.5">
                <span className="text-gray-600">{kv.label}</span>
                <span className={`font-semibold ${kv.flag === 'HIGH' ? 'text-red-500' : kv.flag === 'LOW' ? 'text-blue-500' : 'text-emerald-600'}`}>
                  {kv.flag === 'HIGH' ? '↑ 偏高' : kv.flag === 'LOW' ? '↓ 偏低' : '正常'}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-xs text-gray-400 mb-4 py-4 text-center">尚無檢驗數據</p>
      )}

      {appt.reportId ? (
        <Link
          href={`/patients/${appt.patientId}/reports/${appt.reportId}`}
          className="btn-primary w-full"
        >
          開啟深度分析
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      ) : (
        <Link href={`/patients/${appt.patientId}`} className="btn-secondary w-full">
          查看患者頁面
        </Link>
      )}
    </div>
  )
}

// ─── Patient Queue ─────────────────────────────────────────────────────────

function PatientQueue({ appointments }: { appointments: Appointment[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const now = new Date()
  const nowMin = now.getHours() * 60 + now.getMinutes()

  const currentIdx = useMemo(() => {
    const idx = appointments.findIndex(a => {
      const [h, m] = a.time.split(':').map(Number)
      return h * 60 + m >= nowMin
    })
    return idx === -1 ? 0 : idx
  }, [appointments, nowMin])

  const selectedAppt = appointments.find(a => a.id === selectedId) ?? null

  return (
    // @container marks this div as a container query context
    <div className="@container card-lift relative overflow-visible">
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">今日患者排程</h2>
        <Link href="/patients" className="btn-ghost text-xs">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          優先摘要
        </Link>
      </div>

      {/* Column headers — hide smart tags on narrow containers */}
      <div className="hidden @lg:grid grid-cols-[64px_1fr_116px_1fr] gap-3 px-6 py-2.5 border-b border-gray-50 text-[11px] text-gray-400 font-semibold uppercase tracking-wide">
        <span>時間</span><span>患者姓名</span><span>預約類型</span><span>AI 智能標記</span>
      </div>

      <div className="divide-y divide-gray-50">
        {appointments.map((appt, i) => {
          const isCurrent = i === currentIdx
          const isPast = i < currentIdx
          const isSelected = appt.id === selectedId

          return (
            <button
              key={appt.id}
              onClick={() => setSelectedId(isSelected ? null : appt.id)}
              className={`w-full text-left transition-all duration-150 active:scale-[0.995]
                @lg:grid @lg:grid-cols-[64px_1fr_116px_1fr] @lg:gap-3
                flex flex-col gap-1 px-6 py-4
                border-l-2
                ${isSelected
                  ? 'bg-amber-50 border-amber-400'
                  : isCurrent
                  ? 'bg-amber-50/40 border-amber-200'
                  : 'hover:bg-gray-50/80 border-transparent hover:border-gray-200'
                }
                ${isPast ? 'opacity-40' : ''}
              `}
            >
              {/* Time */}
              <div className="flex items-center gap-1.5 @lg:block">
                <span className={`text-sm font-bold tabular-nums ${isCurrent ? 'text-amber-600' : 'text-gray-600'}`}>
                  {appt.time}
                </span>
                {isCurrent && (
                  <span className="@lg:block text-[10px] font-semibold text-amber-500 bg-amber-100 px-1.5 py-0.5 rounded-full">
                    進行中
                  </span>
                )}
              </div>

              {/* Name */}
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <span className="text-sm font-semibold text-gray-900">{appt.patientName}</span>
                {appt.isNew && (
                  <span className="px-1.5 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-bold rounded-md border border-orange-200">
                    初診
                  </span>
                )}
              </div>

              {/* Type */}
              <div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium border ${TYPE_COLORS[appt.type] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                  {appt.type}
                </span>
              </div>

              {/* AI Tags */}
              <div className="flex flex-wrap gap-1.5 items-center min-w-0">
                {appt.hasReport && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-medium rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    報告完成
                  </span>
                )}
                {appt.flaggedPanels.slice(0, 2).map(p => (
                  <span key={p} className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 border border-red-200 text-red-600 text-[10px] font-medium rounded-full">
                    ⚠ {p}
                  </span>
                ))}
                {appt.keyValues.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-medium rounded-full">
                    👉 {appt.keyValues.length} 項異常
                  </span>
                )}
                {!appt.hasReport && appt.flaggedPanels.length === 0 && (
                  <span className="text-[11px] text-gray-300">—</span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Prep Summary Popup */}
      {selectedAppt && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setSelectedId(null)} />
          <PrepSummaryPopup appt={selectedAppt} onClose={() => setSelectedId(null)} />
        </>
      )}
    </div>
  )
}

// ─── Notifications ─────────────────────────────────────────────────────────

function Notifications() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null
  return (
    <div className="card-lift p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-gray-700">通知</p>
        <button
          onClick={() => setDismissed(true)}
          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 text-xs transition-all active:scale-90"
        >✕</button>
      </div>
      <div className="space-y-3">
        {[
          { dot: 'bg-amber-400', text: 'AI 今日為您節省約 2.4 小時備診時間' },
          { dot: 'bg-red-400',   text: '林志偉 荷爾蒙面板有 4 項異常，請優先查看' },
          { dot: 'bg-blue-400',  text: '張淑芬 腸道健康報告解析完成' },
        ].map(n => (
          <div key={n.text} className="flex gap-2.5 text-xs text-gray-600">
            <span className={`w-2 h-2 rounded-full mt-0.5 shrink-0 ${n.dot}`} />
            {n.text}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Quick Stats ───────────────────────────────────────────────────────────

function QuickStats({ appointments }: { appointments: Appointment[] }) {
  const stats = [
    { label: '排程患者', value: appointments.length, color: 'text-gray-800' },
    { label: '有異常指標', value: appointments.filter(a => a.flaggedPanels.length > 0).length, color: 'text-red-500' },
    { label: '有報告可查', value: appointments.filter(a => a.hasReport).length, color: 'text-emerald-600' },
    { label: '初診患者', value: appointments.filter(a => a.isNew).length, color: 'text-purple-600' },
  ]
  return (
    <div className="card-lift p-5">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">今日概覽</p>
      <div className="space-y-3">
        {stats.map(s => (
          <div key={s.label} className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{s.label}</span>
            <span className={`text-lg font-bold tabular-nums ${s.color}`}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────

export function DoctorDashboard({ appointments, userName }: DoctorDashboardProps) {
  const aiHours = (appointments.length * 0.62).toFixed(1)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Efficiency banner */}
      <div className="glass-amber rounded-2xl px-4 md:px-7 py-4 md:py-5">
        <p className="text-sm text-gray-700 leading-relaxed">
          <span className="font-bold text-gray-900">今日效率總覽　</span>
          共 <span className="font-bold text-amber-600 text-base">{appointments.length}</span> 位患者已排程，
          其中 <span className="font-bold text-red-500">{appointments.filter(a => a.flaggedPanels.length > 0).length}</span> 位有異常指標需優先關注。
          AI 預計節省 <span className="font-bold text-emerald-600">{aiHours}</span> 小時備診時間。
        </p>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Queue — flex 1 */}
        <div className="flex-1 min-w-0 w-full">
          <PatientQueue appointments={appointments} />
        </div>

        {/* Right sidebar */}
        <div className="w-full lg:w-60 lg:shrink-0 grid grid-cols-2 lg:grid-cols-1 gap-4">
          <MiniCalendar />
          <QuickStats appointments={appointments} />
          <div className="col-span-2 lg:col-span-1">
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  )
}
