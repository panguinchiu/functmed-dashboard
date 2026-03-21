'use client'

import Link from 'next/link'
import { Appointment } from '@/lib/mock-appointments'

const TYPE_COLORS: Record<string, string> = {
  '功能醫學初診': 'bg-purple-100 text-purple-700',
  '追蹤回診': 'bg-blue-100 text-blue-700',
  '報告解說': 'bg-emerald-100 text-emerald-700',
  '電話諮詢': 'bg-amber-100 text-amber-700',
}

const FLAG_COLORS: Record<string, string> = {
  HIGH: 'text-red-600',
  LOW: 'text-blue-600',
  NORMAL: 'text-gray-500',
}

interface AppointmentQueueProps {
  appointments: Appointment[]
  highlightIndex?: number // index of current/next appointment
}

export function AppointmentQueue({ appointments, highlightIndex = 0 }: AppointmentQueueProps) {
  if (appointments.length === 0) {
    return (
      <div className="py-16 text-center text-gray-400 text-sm">
        今日無預約排程
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-100">
      {appointments.map((appt, i) => {
        const isCurrent = i === highlightIndex
        const isPast = i < highlightIndex
        return (
          <Link
            key={appt.id}
            href={
              appt.reportId
                ? `/patients/${appt.patientId}/reports/${appt.reportId}`
                : `/patients/${appt.patientId}`
            }
            className={`flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors group ${
              isCurrent ? 'bg-blue-50/60 border-l-2 border-blue-500' : ''
            } ${isPast ? 'opacity-50' : ''}`}
          >
            {/* Time column */}
            <div className="w-12 shrink-0 text-center pt-0.5">
              <span className={`text-sm font-bold tabular-nums ${isCurrent ? 'text-blue-700' : 'text-gray-600'}`}>
                {appt.time}
              </span>
              {isCurrent && (
                <div className="text-[10px] text-blue-500 font-medium mt-0.5">進行中</div>
              )}
            </div>

            {/* Timeline bar */}
            <div className={`w-0.5 self-stretch rounded-full mt-1.5 shrink-0 ${isCurrent ? 'bg-blue-400' : 'bg-gray-200'}`} />

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-gray-900">{appt.patientName}</span>
                {appt.isNew && (
                  <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded-sm uppercase tracking-wide">
                    初診
                  </span>
                )}
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    TYPE_COLORS[appt.type] ?? 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {appt.type}
                </span>
                {appt.hasReport && (
                  <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-medium rounded border border-indigo-200">
                    有報告
                  </span>
                )}
              </div>

              {/* Flagged panels */}
              {appt.flaggedPanels.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {appt.flaggedPanels.map(panel => (
                    <span
                      key={panel}
                      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-red-50 border border-red-200 text-red-600 text-[10px] font-medium rounded"
                    >
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {panel}
                    </span>
                  ))}
                </div>
              )}

              {/* Key lab values */}
              {appt.keyValues.length > 0 && (
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1.5">
                  {appt.keyValues.map(kv => (
                    <span key={kv.label} className={`text-xs ${FLAG_COLORS[kv.flag]}`}>
                      {kv.label}:{' '}
                      <span className="font-semibold">{kv.value}</span>{' '}
                      <span className="opacity-70">{kv.unit}</span>
                      {kv.flag !== 'NORMAL' && (
                        <span className="font-bold ml-0.5">{kv.flag === 'HIGH' ? '↑' : '↓'}</span>
                      )}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Arrow */}
            <svg
              className="w-4 h-4 text-gray-300 group-hover:text-gray-500 shrink-0 mt-1 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )
      })}
    </div>
  )
}
