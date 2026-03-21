import { LabValue } from '@/types'

interface LabValueRowProps {
  label: string
  value: LabValue
}

const FLAG_STYLES: Record<string, string> = {
  HIGH: 'bg-red-100 text-red-700 border border-red-200',
  LOW: 'bg-blue-100 text-blue-700 border border-blue-200',
  CRITICAL_HIGH: 'bg-red-200 text-red-900 border border-red-300 font-bold',
  CRITICAL_LOW: 'bg-blue-200 text-blue-900 border border-blue-300 font-bold',
  NORMAL: 'bg-green-50 text-green-700 border border-green-200',
}

const FLAG_LABELS: Record<string, string> = {
  HIGH: 'H ↑',
  LOW: 'L ↓',
  CRITICAL_HIGH: 'H ↑↑',
  CRITICAL_LOW: 'L ↓↓',
  NORMAL: '正常',
}

export function LabValueRow({ label, value }: LabValueRowProps) {
  const flag = value.flag ?? 'NORMAL'
  const isAbnormal = flag !== 'NORMAL'

  return (
    <tr className={isAbnormal ? 'bg-red-50/30' : ''}>
      <td className="py-2 px-4 text-sm text-gray-700 font-medium">{label}</td>
      <td className="py-2 px-4 text-sm text-gray-900 font-mono">
        {String(value.value)}
      </td>
      <td className="py-2 px-4 text-sm text-gray-500">{value.unit ?? '—'}</td>
      <td className="py-2 px-4 text-sm text-gray-500">{value.referenceRange ?? '—'}</td>
      <td className="py-2 px-4">
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${FLAG_STYLES[flag]}`}>
          {FLAG_LABELS[flag]}
        </span>
      </td>
    </tr>
  )
}
