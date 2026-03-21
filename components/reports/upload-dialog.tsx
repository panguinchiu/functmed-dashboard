'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { formatFileSize } from '@/lib/utils'

interface UploadDialogProps {
  patientId: string
  patientName: string
}

export function UploadDialog({ patientId, patientName }: UploadDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return

    if (f.type !== 'application/pdf') {
      setError('只接受 PDF 格式')
      return
    }
    if (f.size > 20 * 1024 * 1024) {
      setError('檔案不可超過 20MB')
      return
    }
    setError('')
    setFile(f)
  }

  async function handleUpload() {
    if (!file) return
    setUploading(true)
    setError('')
    setProgress(10)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('patientId', patientId)
      formData.append('reportDate', new Date(reportDate).toISOString())

      setProgress(30)
      const res = await fetch('/api/reports/upload', {
        method: 'POST',
        body: formData,
      })
      setProgress(90)

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? 'Upload failed')
      }

      const { reportId } = await res.json()
      setProgress(100)
      setOpen(false)
      router.push(`/patients/${patientId}/reports/${reportId}`)
      router.refresh()
    } catch (err) {
      setError(String(err))
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        上傳檢測報告
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">上傳檢測報告</h2>
          <p className="text-sm text-gray-500 mt-1">患者：{patientName}</p>
        </div>

        <div className="p-6 space-y-5">
          {/* File upload area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PDF 報告檔案</label>
            <div
              onClick={() => inputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-6 text-center cursor-pointer transition-colors"
            >
              {file ? (
                <div>
                  <div className="text-2xl mb-1">📄</div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              ) : (
                <div>
                  <div className="text-3xl mb-2">☁️</div>
                  <p className="text-sm text-gray-600">點擊選擇 PDF 檔案</p>
                  <p className="text-xs text-gray-400 mt-1">最大 20MB</p>
                </div>
              )}
            </div>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Report date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">報告日期</label>
            <input
              type="date"
              value={reportDate}
              onChange={e => setReportDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Progress */}
          {uploading && progress > 0 && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{progress < 90 ? '上傳中...' : '解析報告...'}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="p-6 pt-0 flex gap-3">
          <button
            onClick={() => { setOpen(false); setFile(null); setError('') }}
            disabled={uploading}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            取消
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {uploading ? '上傳中...' : '上傳並解析'}
          </button>
        </div>
      </div>
    </div>
  )
}
