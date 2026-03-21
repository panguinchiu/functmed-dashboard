'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface AiAnalysisViewProps {
  reportId: string
  initialStatus: string
  initialAnalysis: string | null
}

export function AiAnalysisView({ reportId, initialStatus, initialAnalysis }: AiAnalysisViewProps) {
  const [text, setText] = useState(initialAnalysis ?? '')
  const [status, setStatus] = useState(initialStatus)
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState('')

  const canAnalyze = ['PARSED', 'PENDING', 'COMPLETE', 'ERROR'].includes(status) && !streaming

  async function startAnalysis() {
    setStreaming(true)
    setError('')
    setText('')
    setStatus('ANALYZING')

    try {
      const response = await fetch(`/api/reports/${reportId}/analyze`, {
        method: 'POST',
      })

      if (!response.ok) {
        // Safely parse error — response may not be JSON
        let errMsg = `HTTP ${response.status}`
        try {
          const err = await response.json()
          errMsg = err.error ?? errMsg
        } catch {
          try { errMsg = await response.text() || errMsg } catch { /* ignore */ }
        }
        setError(errMsg)
        setStatus('ERROR')
        setStreaming(false)
        return
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
      setError(String(err))
      setStatus('ERROR')
    } finally {
      setStreaming(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">AI 功能醫學分析</h3>
            <p className="text-xs text-gray-500">由 Claude claude-sonnet-4-6 生成</p>
          </div>
        </div>
        <button
          onClick={startAnalysis}
          disabled={!canAnalyze}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {streaming ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              分析中...
            </>
          ) : status === 'COMPLETE' ? (
            '重新分析'
          ) : (
            '開始 AI 分析'
          )}
        </button>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2.5 text-xs text-yellow-800">
        ⚠️ AI 分析結果僅供臨床參考，不能取代醫師判斷。最終診斷及治療方案需由執業醫師評估決定。
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Analysis content */}
      {(text || streaming) && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="prose prose-sm max-w-none text-gray-800">
            <ReactMarkdown>{text}</ReactMarkdown>
            {streaming && <span className="cursor-blink" />}
          </div>
        </div>
      )}

      {!text && !streaming && ['PARSED', 'PENDING'].includes(status) && (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
          <div className="text-4xl mb-3">🤖</div>
          <p className="text-gray-500 text-sm">點擊「開始 AI 分析」以生成功能醫學建議</p>
          <p className="text-gray-400 text-xs mt-1">分析約需 30-60 秒</p>
        </div>
      )}
    </div>
  )
}
