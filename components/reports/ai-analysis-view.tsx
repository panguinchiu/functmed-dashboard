'use client'

import { useState, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface PatientInfo {
  name: string
  age: number
  gender: string
  chartNumber: string
  reportDate: string
  flaggedPanels: number
  totalPanels: number
}

interface AiAnalysisViewProps {
  reportId: string
  initialStatus: string
  initialAnalysis: string | null
  patient?: PatientInfo
}

// ─── Patient Summary Card ─────────────────────────────────────────────────────

function PatientSummaryCard({ patient }: { patient: PatientInfo }) {
  const initial = patient.name.charAt(0)
  const abnormalRatio = patient.totalPanels > 0
    ? Math.round((patient.flaggedPanels / patient.totalPanels) * 100)
    : 0

  return (
    <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden shadow-sm animate-fade-in">
      {/* Top strip */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-400 px-5 py-2 flex items-center justify-between">
        <span className="text-xs font-bold text-white tracking-wide uppercase">病患摘要</span>
        <span className="text-[10px] text-white/80">報告日期 {patient.reportDate}</span>
      </div>

      <div className="px-4 py-4 flex items-start gap-3 md:gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 shadow-sm shadow-amber-200">
          <span className="text-white text-lg font-bold">{initial}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-gray-900">{patient.name}</p>
          <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {patient.age} 歲・{patient.gender}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              病歷號 {patient.chartNumber}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-2 md:gap-3 shrink-0">
          <div className="text-center">
            <p className="text-2xl font-black text-red-500 leading-none">{patient.flaggedPanels}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">異常面板</p>
          </div>
          <div className="w-px bg-amber-100" />
          <div className="text-center">
            <p className="text-2xl font-black text-gray-700 leading-none">{patient.totalPanels}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">檢測面板</p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-5 pb-4">
        <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
          <span>異常面板比例</span>
          <span className="font-semibold text-red-500">{abnormalRatio}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-amber-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-red-400 transition-all duration-700"
            style={{ width: `${abnormalRatio}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Section metadata ─────────────────────────────────────────────────────────

const SECTION_META: Record<string, { icon: string; accent: string; bg: string; border: string }> = {
  '一': { icon: '⚠️', accent: 'text-red-700',     bg: 'bg-red-50',     border: 'border-red-100'     },
  '二': { icon: '🔍', accent: 'text-purple-700',  bg: 'bg-purple-50',  border: 'border-purple-100'  },
  '三': { icon: '📋', accent: 'text-blue-700',    bg: 'bg-blue-50',    border: 'border-blue-100'    },
  '四': { icon: '💊', accent: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  '五': { icon: '🥗', accent: 'text-teal-700',    bg: 'bg-teal-50',    border: 'border-teal-100'    },
  '六': { icon: '📊', accent: 'text-indigo-700',  bg: 'bg-indigo-50',  border: 'border-indigo-100'  },
  '七': { icon: '💬', accent: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-100'   },
}

interface Section { num: string; title: string; body: string; complete: boolean }

function parseSections(raw: string): { sections: Section[]; preamble: string } {
  const parts = raw.split(/(?=###\s)/)
  const sections: Section[] = []
  let preamble = ''
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (!part.startsWith('###')) { if (i === 0) preamble = part; continue }
    const lines = part.split('\n')
    const heading = lines[0].replace(/^###\s*/, '').trim()
    const body = lines.slice(1).join('\n').trim()
    const num = heading.match(/^([一二三四五六七])/)?.[1] ?? ''
    sections.push({ num, title: heading, body, complete: i < parts.length - 1 })
  }
  return { sections, preamble }
}

function SectionCard({ section, streaming }: { section: Section; streaming: boolean }) {
  const meta = SECTION_META[section.num] ?? { icon: '📄', accent: 'text-gray-700', bg: 'bg-gray-50', border: 'border-gray-100' }
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div className={`rounded-2xl border ${meta.border} overflow-hidden shadow-sm animate-fade-in`}>
      <button onClick={() => setCollapsed(c => !c)}
        className={`w-full flex items-center justify-between px-5 py-3.5 ${meta.bg} transition-all hover:brightness-95 active:scale-[0.995]`}>
        <div className="flex items-center gap-3">
          <span className="text-lg leading-none">{meta.icon}</span>
          <span className={`text-sm font-bold ${meta.accent}`}>{section.title}</span>
          {!section.complete && streaming && (
            <span className="flex gap-0.5 ml-1">
              {[0,1,2].map(i => (
                <span key={i} className={`w-1.5 h-1.5 rounded-full ${meta.bg.replace('bg-','bg-').replace('-50','-400')} opacity-70 animate-bounce`}
                  style={{ animationDelay: `${i*0.15}s` }} />
              ))}
            </span>
          )}
        </div>
        <svg className={`w-4 h-4 ${meta.accent} transition-transform duration-200 ${collapsed ? '-rotate-90' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {!collapsed && (
        <div className="bg-white px-5 py-5">
          <div className="prose prose-sm max-w-none text-gray-700 prose-headings:font-semibold prose-headings:text-gray-800 prose-strong:text-gray-900 prose-strong:font-semibold prose-li:my-0.5 prose-hr:border-gray-100 prose-table:w-full prose-table:text-xs prose-thead:bg-gray-50 prose-th:px-3 prose-th:py-2 prose-th:font-semibold prose-th:text-gray-600 prose-td:px-3 prose-td:py-2 prose-td:border-b prose-td:border-gray-100">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{section.body}</ReactMarkdown>
            {!section.complete && streaming && <span className="cursor-blink" />}
          </div>
        </div>
      )}
    </div>
  )
}

function SkeletonCard({ delay = 0 }: { delay?: number }) {
  return (
    <div className="rounded-2xl border border-gray-100 overflow-hidden" style={{ animationDelay: `${delay}ms` }}>
      <div className="px-5 py-3.5 bg-gray-50 flex items-center gap-3">
        <div className="w-6 h-6 rounded-full skeleton" />
        <div className="h-4 w-44 rounded-lg skeleton" />
      </div>
      <div className="bg-white px-5 py-5 space-y-2.5">
        <div className="h-3 w-full rounded-lg skeleton" />
        <div className="h-3 w-5/6 rounded-lg skeleton" />
        <div className="h-3 w-3/4 rounded-lg skeleton" />
      </div>
    </div>
  )
}

export function AiAnalysisView({ reportId, initialStatus, initialAnalysis, patient }: AiAnalysisViewProps) {
  const [text, setText] = useState(initialAnalysis ?? '')
  const [status, setStatus] = useState(initialStatus)
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState('')

  const canAnalyze = ['PARSED', 'PENDING', 'COMPLETE', 'ERROR'].includes(status) && !streaming
  const { sections, preamble } = useMemo(() => parseSections(text), [text])

  async function startAnalysis() {
    setStreaming(true); setError(''); setText(''); setStatus('ANALYZING')
    try {
      const response = await fetch(`/api/reports/${reportId}/analyze`, { method: 'POST' })
      if (!response.ok) {
        let errMsg = `Error: ${response.status}`
        try { const e = await response.json(); errMsg = e.error ?? errMsg } catch {
          try { errMsg = await response.text() || errMsg } catch { /* ignore */ }
        }
        setError(errMsg); setStatus('ERROR'); setStreaming(false); return
      }
      const reader = response.body!.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        setText(prev => prev + decoder.decode(value, { stream: true }))
      }
      setStatus('COMPLETE')
    } catch (err) {
      setError(String(err)); setStatus('ERROR')
    } finally {
      setStreaming(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-sm shadow-amber-200">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">AI 功能醫學分析</h3>
            <p className="text-xs text-gray-400">由 Claude Sonnet 4.6 生成</p>
          </div>
        </div>
        <button onClick={startAnalysis} disabled={!canAnalyze}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100">
          {streaming ? (
            <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>分析中...</>
          ) : status === 'COMPLETE' ? '重新分析' : '開始 AI 分析'}
        </button>
      </div>

      {/* Patient summary card */}
      {patient && <PatientSummaryCard patient={patient} />}

      {/* Disclaimer */}
      <div className="glass-amber rounded-xl px-4 py-3 text-xs text-amber-800 flex gap-2 items-start">
        <span className="shrink-0">⚠️</span>
        AI 分析結果僅供臨床參考，不能取代醫師判斷。最終診斷及治療方案需由執業醫師評估決定。
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex gap-2">
          <span>❌</span><span>{error}</span>
        </div>
      )}

      {/* Loading skeletons */}
      {streaming && sections.length === 0 && (
        <div className="space-y-3">
          <SkeletonCard delay={0} /><SkeletonCard delay={120} /><SkeletonCard delay={240} />
        </div>
      )}

      {/* Section cards */}
      {sections.length > 0 && (
        <div className="space-y-3">
          {preamble.trim() && (
            <div className="rounded-2xl border border-gray-100 bg-white px-5 py-4 text-sm text-gray-600 shadow-sm">
              {preamble.trim()}
            </div>
          )}
          {sections.map(s => <SectionCard key={s.num + s.title} section={s} streaming={streaming} />)}
        </div>
      )}

      {/* Empty state */}
      {!text && !streaming && !error && ['PARSED','PENDING'].includes(status) && (
        <div className="rounded-2xl border-2 border-dashed border-amber-200 bg-amber-50/30 p-14 text-center">
          <div className="text-5xl mb-4">🤖</div>
          <p className="text-gray-700 text-sm font-semibold">點擊「開始 AI 分析」以生成功能醫學建議</p>
          <p className="text-gray-400 text-xs mt-2">使用 Claude Sonnet 4.6，分析約需 20–40 秒</p>
        </div>
      )}
    </div>
  )
}
