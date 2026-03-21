// Mock appointment schedule for today's physician dashboard

import { MOCK_PATIENTS, MOCK_REPORTS, MOCK_PANELS } from './mock-data'

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  time: string
  type: '功能醫學初診' | '追蹤回診' | '報告解說' | '電話諮詢'
  reportId: string | null
  hasReport: boolean
  isNew: boolean
  flaggedPanels: string[]
  keyValues: { label: string; value: string; unit: string; flag: 'HIGH' | 'LOW' | 'NORMAL' }[]
}

const PANEL_LABEL: Record<string, string> = {
  HORMONE: '荷爾蒙',
  ALLERGY_FOOD_SENSITIVITY: '過敏/食物敏感',
  GI_HEALTH: '腸道健康',
  ORGANIC_ACIDS: '有機酸',
  TOXIC_ELEMENTS: '毒素重金屬',
  OXIDATIVE_STRESS: '氧化壓力',
}

const TIMES = ['09:00','09:30','10:00','10:30','11:00','11:30','13:30','14:00','14:30','15:00']
const TYPES: Appointment['type'][] = ['功能醫學初診','追蹤回診','報告解說','追蹤回診','報告解說','追蹤回診','報告解說','追蹤回診','報告解說','追蹤回診']

function getKeyValues(reportId: string) {
  const panels = MOCK_PANELS.filter((p: any) => p.reportId === reportId)
  const result: Appointment['keyValues'] = []

  for (const panel of panels) {
    const vals = panel.values as Record<string, any>
    for (const [k, v] of Object.entries(vals)) {
      if (Array.isArray(v)) continue
      if (v?.flag && v.flag !== 'NORMAL') {
        const labelMap: Record<string, string> = {
          cortisolAM: '晨間皮質醇', tsh: 'TSH', reverseT3: 'Reverse T3',
          progesterone: '黃體素', zonulin: 'Zonulin', calprotectin: 'Calprotectin',
          mercuryBlood: '血汞', ferritin: '鐵蛋白', gsh: '穀胱甘肽', coq10: 'CoQ10',
          dheaS: 'DHEA-S', estradiol: 'Estradiol', antiTpoAb: 'Anti-TPO',
        }
        if (labelMap[k]) {
          result.push({ label: labelMap[k], value: String(v.value), unit: v.unit ?? '', flag: v.flag })
          if (result.length >= 4) break
        }
      }
    }
    if (result.length >= 4) break
  }
  return result
}

export function getTodayAppointments(doctorId: string): Appointment[] {
  const doctorPatients = MOCK_PATIENTS.filter((p: any) => p.doctorId === doctorId)
  return doctorPatients.slice(0, 10).map((patient: any, i: number) => {
    const report = MOCK_REPORTS.find((r: any) => r.patientId === patient.id) ?? null
    const flaggedPanels = report
      ? (report.panels as any[]).filter(p => p.flagged).map(p => PANEL_LABEL[p.panelType] ?? p.panelType)
      : []
    return {
      id: `appt-${patient.id}`,
      patientId: patient.id,
      patientName: `${patient.lastName}${patient.firstName}`,
      time: TIMES[i] ?? '15:30',
      type: TYPES[i] ?? '追蹤回診',
      reportId: report?.id ?? null,
      hasReport: !!report,
      isNew: i === 0 || i === 4,
      flaggedPanels,
      keyValues: report ? getKeyValues(report.id) : [],
    }
  })
}

export function getAllAppointments(): Appointment[] {
  return MOCK_PATIENTS.slice(0, 10).map((patient: any, i: number) => {
    const report = MOCK_REPORTS.find((r: any) => r.patientId === patient.id) ?? null
    const flaggedPanels = report
      ? (report.panels as any[]).filter(p => p.flagged).map(p => PANEL_LABEL[p.panelType] ?? p.panelType)
      : []
    return {
      id: `appt-${patient.id}`,
      patientId: patient.id,
      patientName: `${patient.lastName}${patient.firstName}`,
      time: TIMES[i] ?? '15:30',
      type: TYPES[i] ?? '追蹤回診',
      reportId: report?.id ?? null,
      hasReport: !!report,
      isNew: i === 0 || i === 4,
      flaggedPanels,
      keyValues: report ? getKeyValues(report.id) : [],
    }
  })
}
