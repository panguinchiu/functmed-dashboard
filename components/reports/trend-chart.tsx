'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceArea, ResponsiveContainer, ReferenceLine,
} from 'recharts'

interface TrendChartProps {
  label: string
  unit: string
  currentValue: number
  currentDate: string
  refLow?: number
  refHigh?: number
  flag: 'HIGH' | 'LOW' | 'NORMAL'
}

// Deterministic "seeded" simulation using the current value
function simulateHistory(
  current: number,
  flag: 'HIGH' | 'LOW' | 'NORMAL',
  currentDate: string,
): { date: string; value: number }[] {
  const abs = Math.abs(current)
  const step = abs * 0.12 || 0.5

  // Generate 3 prior points that trend toward the current state
  const prior: number[] =
    flag === 'HIGH'
      ? [current - step * 2.1, current - step * 1.3, current - step * 0.5]
      : flag === 'LOW'
      ? [current + step * 2.1, current + step * 1.3, current + step * 0.5]
      : [current + step * 0.4, current - step * 0.2, current + step * 0.1]

  const dates = ['2025-09', '2025-12', '2026-02', currentDate.slice(0, 7)]

  return [...prior, current].map((v, i) => ({
    date: dates[i],
    value: parseFloat(v.toFixed(2)),
  }))
}

const FLAG_COLOR: Record<string, string> = {
  HIGH: '#ef4444',
  LOW: '#3b82f6',
  NORMAL: '#22c55e',
}

export function TrendChart({
  label,
  unit,
  currentValue,
  currentDate,
  refLow,
  refHigh,
  flag,
}: TrendChartProps) {
  const data = simulateHistory(currentValue, flag, currentDate)
  const color = FLAG_COLOR[flag]

  const allValues = data.map(d => d.value).concat([refLow ?? currentValue, refHigh ?? currentValue])
  const domainMin = Math.min(...allValues) * 0.85
  const domainMax = Math.max(...allValues) * 1.15

  return (
    <div className="bg-white rounded-xl border border-sky-100 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-sm font-semibold text-gray-800">{label}</span>
          <span className="text-xs text-gray-400 ml-1.5">{unit}</span>
        </div>
        <span
          className={`px-2 py-0.5 text-xs font-bold rounded-full ${
            flag === 'HIGH'
              ? 'bg-red-100 text-red-700'
              : flag === 'LOW'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {flag === 'HIGH' ? '↑ 偏高' : flag === 'LOW' ? '↓ 偏低' : '正常'}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f9ff" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={[domainMin, domainMax]}
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            width={36}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e0f2fe' }}
            formatter={(v: number) => [`${v} ${unit}`, label]}
            labelFormatter={(l) => `${l}`}
          />

          {/* Reference range band */}
          {refLow != null && refHigh != null && (
            <ReferenceArea
              y1={refLow}
              y2={refHigh}
              fill="#d1fae5"
              fillOpacity={0.35}
              strokeOpacity={0}
            />
          )}
          {refLow != null && (
            <ReferenceLine y={refLow} stroke="#86efac" strokeDasharray="4 2" strokeWidth={1} />
          )}
          {refHigh != null && (
            <ReferenceLine y={refHigh} stroke="#86efac" strokeDasharray="4 2" strokeWidth={1} />
          )}

          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={(props) => {
              const isLast = props.index === data.length - 1
              return (
                <circle
                  key={props.index}
                  cx={props.cx}
                  cy={props.cy}
                  r={isLast ? 5 : 3}
                  fill={isLast ? color : '#fff'}
                  stroke={color}
                  strokeWidth={2}
                />
              )
            }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-2 text-xs text-gray-400 text-right">
        * 2025-09 ~ 2026-02 為模擬歷史數據，僅供趨勢參考
      </div>
    </div>
  )
}
