// Demo mock data — used when database is not available
// Auto-generated from 10 patient PDF reports

export const MOCK_CLINIC = {
  id: 'demo-clinic-001',
  name: '台北功能醫學診所（示範）',
  slug: 'taipei-wellness',
}

export const MOCK_USERS = [
  { id: 'demo-admin-001', name: '王院長', email: 'admin@taipei-wellness.com', role: 'CLINIC_ADMIN', createdAt: new Date('2026-01-01'), _count: { patients: 0 } },
  { id: 'demo-doctor-001', name: '陳明德 醫師', email: 'chen@taipei-wellness.com', role: 'DOCTOR', createdAt: new Date('2026-01-05'), _count: { patients: 7 } },
  { id: 'demo-doctor-002', name: '林雅琪 醫師', email: 'lin@taipei-wellness.com', role: 'DOCTOR', createdAt: new Date('2026-01-10'), _count: { patients: 3 } },
]

export const MOCK_PATIENTS = [
  {
    id: 'demo-patient-01',
    chartNumber: 'FM-2026-00501',
    firstName: '志偉',
    lastName: '林',
    dateOfBirth: new Date('1991-03-15'),
    gender: 'MALE',
    email: null,
    phone: null,
    notes: null,
    clinicId: 'demo-clinic-001',
    doctorId: 'demo-doctor-001',
    createdAt: new Date('2026-03-10T00:00:00.000Z'),
    updatedAt: new Date('2026-03-10T00:00:00.000Z'),
    doctor: { id: 'demo-doctor-001', name: '陳明德  檢驗機構 聯安功能醫學中心 醫師' },
    _count: { reports: 1 },
  },
  {
    id: 'demo-patient-02',
    chartNumber: 'FM-2026-00502',
    firstName: '淑芬',
    lastName: '張',
    dateOfBirth: new Date('1971-06-20'),
    gender: 'FEMALE',
    email: null,
    phone: null,
    notes: null,
    clinicId: 'demo-clinic-001',
    doctorId: 'demo-doctor-002',
    createdAt: new Date('2026-03-11T00:00:00.000Z'),
    updatedAt: new Date('2026-03-11T00:00:00.000Z'),
    doctor: { id: 'demo-doctor-002', name: '林雅琪  檢驗機構 瀚仕功能醫學研究中心 醫師' },
    _count: { reports: 1 },
  },
  {
    id: 'demo-patient-03',
    chartNumber: 'FM-2026-00503',
    firstName: '建宏',
    lastName: '王',
    dateOfBirth: new Date('1978-11-08'),
    gender: 'MALE',
    email: null,
    phone: null,
    notes: null,
    clinicId: 'demo-clinic-001',
    doctorId: 'demo-doctor-001',
    createdAt: new Date('2026-03-12T00:00:00.000Z'),
    updatedAt: new Date('2026-03-12T00:00:00.000Z'),
    doctor: { id: 'demo-doctor-001', name: '陳明德  檢驗機構 聯欣功能醫學中心 醫師' },
    _count: { reports: 1 },
  },
  {
    id: 'demo-patient-04',
    chartNumber: 'FM-2026-00504',
    firstName: '雅婷',
    lastName: '李',
    dateOfBirth: new Date('1989-04-25'),
    gender: 'FEMALE',
    email: null,
    phone: null,
    notes: null,
    clinicId: 'demo-clinic-001',
    doctorId: 'demo-doctor-001',
    createdAt: new Date('2026-03-13T00:00:00.000Z'),
    updatedAt: new Date('2026-03-13T00:00:00.000Z'),
    doctor: { id: 'demo-doctor-001', name: '王大明  檢驗機構 瀚仕功能醫學研究中心 醫師' },
    _count: { reports: 1 },
  },
  {
    id: 'demo-patient-05',
    chartNumber: 'FM-2026-00505',
    firstName: '俊穎',
    lastName: '陳',
    dateOfBirth: new Date('1985-09-12'),
    gender: 'MALE',
    email: null,
    phone: null,
    notes: null,
    clinicId: 'demo-clinic-001',
    doctorId: 'demo-doctor-002',
    createdAt: new Date('2026-03-14T00:00:00.000Z'),
    updatedAt: new Date('2026-03-14T00:00:00.000Z'),
    doctor: { id: 'demo-doctor-002', name: '林雅琪  檢驗機構 聯安功能醫學中心 醫師' },
    _count: { reports: 1 },
  },
  {
    id: 'demo-patient-06',
    chartNumber: 'FM-2026-00506',
    firstName: '美慧',
    lastName: '吳',
    dateOfBirth: new Date('1967-02-14'),
    gender: 'FEMALE',
    email: null,
    phone: null,
    notes: null,
    clinicId: 'demo-clinic-001',
    doctorId: 'demo-doctor-001',
    createdAt: new Date('2026-03-15T00:00:00.000Z'),
    updatedAt: new Date('2026-03-15T00:00:00.000Z'),
    doctor: { id: 'demo-doctor-001', name: '陳明德  檢驗機構 聯欣功能醫學中心 醫師' },
    _count: { reports: 1 },
  },
  {
    id: 'demo-patient-07',
    chartNumber: 'FM-2026-00507',
    firstName: '志豪',
    lastName: '黃',
    dateOfBirth: new Date('1993-07-30'),
    gender: 'MALE',
    email: null,
    phone: null,
    notes: null,
    clinicId: 'demo-clinic-001',
    doctorId: 'demo-doctor-001',
    createdAt: new Date('2026-03-16T00:00:00.000Z'),
    updatedAt: new Date('2026-03-16T00:00:00.000Z'),
    doctor: { id: 'demo-doctor-001', name: '王大明  檢驗機構 瀚仕功能醫學研究中心 醫師' },
    _count: { reports: 1 },
  },
  {
    id: 'demo-patient-08',
    chartNumber: 'FM-2026-00508',
    firstName: '雅芳',
    lastName: '許',
    dateOfBirth: new Date('1980-12-05'),
    gender: 'FEMALE',
    email: null,
    phone: null,
    notes: null,
    clinicId: 'demo-clinic-001',
    doctorId: 'demo-doctor-002',
    createdAt: new Date('2026-03-17T00:00:00.000Z'),
    updatedAt: new Date('2026-03-17T00:00:00.000Z'),
    doctor: { id: 'demo-doctor-002', name: '林雅琪  檢驗機構 聯安功能醫學中心 醫師' },
    _count: { reports: 1 },
  },
  {
    id: 'demo-patient-09',
    chartNumber: 'FM-2026-00509',
    firstName: '家銘',
    lastName: '劉',
    dateOfBirth: new Date('1975-08-18'),
    gender: 'MALE',
    email: null,
    phone: null,
    notes: null,
    clinicId: 'demo-clinic-001',
    doctorId: 'demo-doctor-001',
    createdAt: new Date('2026-03-18T00:00:00.000Z'),
    updatedAt: new Date('2026-03-18T00:00:00.000Z'),
    doctor: { id: 'demo-doctor-001', name: '陳明德  檢驗機構 聯欣功能醫學中心 醫師' },
    _count: { reports: 1 },
  },
  {
    id: 'demo-patient-10',
    chartNumber: 'FM-2026-00510',
    firstName: '雅文',
    lastName: '鄭',
    dateOfBirth: new Date('1988-01-22'),
    gender: 'FEMALE',
    email: null,
    phone: null,
    notes: null,
    clinicId: 'demo-clinic-001',
    doctorId: 'demo-doctor-001',
    createdAt: new Date('2026-03-19T00:00:00.000Z'),
    updatedAt: new Date('2026-03-19T00:00:00.000Z'),
    doctor: { id: 'demo-doctor-001', name: '王大明  檢驗機構 瀚仕功能醫學研究中心 醫師' },
    _count: { reports: 1 },
  }
]

export const MOCK_REPORTS = [
  {
    id: 'demo-report-01',
    reportDate: new Date('2026-03-18'),
    status: 'PARSED' as const,
    blobName: 'demo/林志偉.pdf',
    originalName: 'report_01_林志偉.pdf',
    fileSizeBytes: 100000,
    parsedData: null,
    parseError: null,
    aiAnalysis: null,
    analysisAt: null,
    createdAt: new Date('2026-03-18T00:00:00.000Z'),
    updatedAt: new Date('2026-03-18T00:00:00.000Z'),
    patientId: 'demo-patient-01',
    clinicId: 'demo-clinic-001',
    uploadedBy: 'demo-doctor-001',
    patient: {
      id: 'demo-patient-01',
      chartNumber: 'FM-2026-00501',
      firstName: '志偉',
      lastName: '林',
      dateOfBirth: new Date('1991-03-15'),
      gender: 'MALE',
      doctor: { id: 'demo-doctor-001', name: '陳明德  檢驗機構 聯安功能醫學中心 醫師' },
    },
    panels: [
      { panelType: 'HORMONE', flagged: true },
      { panelType: 'ALLERGY_FOOD_SENSITIVITY', flagged: true },
      { panelType: 'GI_HEALTH', flagged: true },
      { panelType: 'ORGANIC_ACIDS', flagged: false },
      { panelType: 'TOXIC_ELEMENTS', flagged: true },
      { panelType: 'OXIDATIVE_STRESS', flagged: true }
    ],
  },
  {
    id: 'demo-report-02',
    reportDate: new Date('2026-03-18'),
    status: 'PARSED' as const,
    blobName: 'demo/張淑芬.pdf',
    originalName: 'report_02_張淑芬.pdf',
    fileSizeBytes: 100500,
    parsedData: null,
    parseError: null,
    aiAnalysis: null,
    analysisAt: null,
    createdAt: new Date('2026-03-19T00:00:00.000Z'),
    updatedAt: new Date('2026-03-19T00:00:00.000Z'),
    patientId: 'demo-patient-02',
    clinicId: 'demo-clinic-001',
    uploadedBy: 'demo-doctor-002',
    patient: {
      id: 'demo-patient-02',
      chartNumber: 'FM-2026-00502',
      firstName: '淑芬',
      lastName: '張',
      dateOfBirth: new Date('1971-06-20'),
      gender: 'FEMALE',
      doctor: { id: 'demo-doctor-002', name: '林雅琪  檢驗機構 瀚仕功能醫學研究中心 醫師' },
    },
    panels: [
      { panelType: 'HORMONE', flagged: true },
      { panelType: 'ALLERGY_FOOD_SENSITIVITY', flagged: false },
      { panelType: 'GI_HEALTH', flagged: true },
      { panelType: 'ORGANIC_ACIDS', flagged: false },
      { panelType: 'TOXIC_ELEMENTS', flagged: true },
      { panelType: 'OXIDATIVE_STRESS', flagged: true }
    ],
  },
  {
    id: 'demo-report-03',
    reportDate: new Date('2026-03-19'),
    status: 'PARSED' as const,
    blobName: 'demo/王建宏.pdf',
    originalName: 'report_03_王建宏.pdf',
    fileSizeBytes: 101000,
    parsedData: null,
    parseError: null,
    aiAnalysis: null,
    analysisAt: null,
    createdAt: new Date('2026-03-20T00:00:00.000Z'),
    updatedAt: new Date('2026-03-20T00:00:00.000Z'),
    patientId: 'demo-patient-03',
    clinicId: 'demo-clinic-001',
    uploadedBy: 'demo-doctor-001',
    patient: {
      id: 'demo-patient-03',
      chartNumber: 'FM-2026-00503',
      firstName: '建宏',
      lastName: '王',
      dateOfBirth: new Date('1978-11-08'),
      gender: 'MALE',
      doctor: { id: 'demo-doctor-001', name: '陳明德  檢驗機構 聯欣功能醫學中心 醫師' },
    },
    panels: [
      { panelType: 'HORMONE', flagged: true },
      { panelType: 'ALLERGY_FOOD_SENSITIVITY', flagged: false },
      { panelType: 'GI_HEALTH', flagged: true },
      { panelType: 'ORGANIC_ACIDS', flagged: false },
      { panelType: 'TOXIC_ELEMENTS', flagged: true },
      { panelType: 'OXIDATIVE_STRESS', flagged: true }
    ],
  },
  {
    id: 'demo-report-04',
    reportDate: new Date('2026-03-19'),
    status: 'PARSED' as const,
    blobName: 'demo/李雅婷.pdf',
    originalName: 'report_04_李雅婷.pdf',
    fileSizeBytes: 101500,
    parsedData: null,
    parseError: null,
    aiAnalysis: null,
    analysisAt: null,
    createdAt: new Date('2026-03-21T00:00:00.000Z'),
    updatedAt: new Date('2026-03-21T00:00:00.000Z'),
    patientId: 'demo-patient-04',
    clinicId: 'demo-clinic-001',
    uploadedBy: 'demo-doctor-001',
    patient: {
      id: 'demo-patient-04',
      chartNumber: 'FM-2026-00504',
      firstName: '雅婷',
      lastName: '李',
      dateOfBirth: new Date('1989-04-25'),
      gender: 'FEMALE',
      doctor: { id: 'demo-doctor-001', name: '王大明  檢驗機構 瀚仕功能醫學研究中心 醫師' },
    },
    panels: [
      { panelType: 'HORMONE', flagged: true },
      { panelType: 'ALLERGY_FOOD_SENSITIVITY', flagged: true },
      { panelType: 'GI_HEALTH', flagged: true },
      { panelType: 'ORGANIC_ACIDS', flagged: false },
      { panelType: 'TOXIC_ELEMENTS', flagged: true },
      { panelType: 'OXIDATIVE_STRESS', flagged: true }
    ],
  },
  {
    id: 'demo-report-05',
    reportDate: new Date('2026-03-20'),
    status: 'PARSED' as const,
    blobName: 'demo/陳俊穎.pdf',
    originalName: 'report_05_陳俊穎.pdf',
    fileSizeBytes: 102000,
    parsedData: null,
    parseError: null,
    aiAnalysis: null,
    analysisAt: null,
    createdAt: new Date('2026-03-22T00:00:00.000Z'),
    updatedAt: new Date('2026-03-22T00:00:00.000Z'),
    patientId: 'demo-patient-05',
    clinicId: 'demo-clinic-001',
    uploadedBy: 'demo-doctor-002',
    patient: {
      id: 'demo-patient-05',
      chartNumber: 'FM-2026-00505',
      firstName: '俊穎',
      lastName: '陳',
      dateOfBirth: new Date('1985-09-12'),
      gender: 'MALE',
      doctor: { id: 'demo-doctor-002', name: '林雅琪  檢驗機構 聯安功能醫學中心 醫師' },
    },
    panels: [
      { panelType: 'HORMONE', flagged: true },
      { panelType: 'ALLERGY_FOOD_SENSITIVITY', flagged: false },
      { panelType: 'GI_HEALTH', flagged: true },
      { panelType: 'ORGANIC_ACIDS', flagged: false },
      { panelType: 'TOXIC_ELEMENTS', flagged: true },
      { panelType: 'OXIDATIVE_STRESS', flagged: true }
    ],
  },
  {
    id: 'demo-report-06',
    reportDate: new Date('2026-03-20'),
    status: 'PARSED' as const,
    blobName: 'demo/吳美慧.pdf',
    originalName: 'report_06_吳美慧.pdf',
    fileSizeBytes: 102500,
    parsedData: null,
    parseError: null,
    aiAnalysis: null,
    analysisAt: null,
    createdAt: new Date('2026-03-23T00:00:00.000Z'),
    updatedAt: new Date('2026-03-23T00:00:00.000Z'),
    patientId: 'demo-patient-06',
    clinicId: 'demo-clinic-001',
    uploadedBy: 'demo-doctor-001',
    patient: {
      id: 'demo-patient-06',
      chartNumber: 'FM-2026-00506',
      firstName: '美慧',
      lastName: '吳',
      dateOfBirth: new Date('1967-02-14'),
      gender: 'FEMALE',
      doctor: { id: 'demo-doctor-001', name: '陳明德  檢驗機構 聯欣功能醫學中心 醫師' },
    },
    panels: [
      { panelType: 'HORMONE', flagged: true },
      { panelType: 'ALLERGY_FOOD_SENSITIVITY', flagged: true },
      { panelType: 'GI_HEALTH', flagged: true },
      { panelType: 'ORGANIC_ACIDS', flagged: false },
      { panelType: 'TOXIC_ELEMENTS', flagged: true },
      { panelType: 'OXIDATIVE_STRESS', flagged: true }
    ],
  },
  {
    id: 'demo-report-07',
    reportDate: new Date('2026-03-21'),
    status: 'PARSED' as const,
    blobName: 'demo/黃志豪.pdf',
    originalName: 'report_07_黃志豪.pdf',
    fileSizeBytes: 103000,
    parsedData: null,
    parseError: null,
    aiAnalysis: null,
    analysisAt: null,
    createdAt: new Date('2026-03-24T00:00:00.000Z'),
    updatedAt: new Date('2026-03-24T00:00:00.000Z'),
    patientId: 'demo-patient-07',
    clinicId: 'demo-clinic-001',
    uploadedBy: 'demo-doctor-001',
    patient: {
      id: 'demo-patient-07',
      chartNumber: 'FM-2026-00507',
      firstName: '志豪',
      lastName: '黃',
      dateOfBirth: new Date('1993-07-30'),
      gender: 'MALE',
      doctor: { id: 'demo-doctor-001', name: '王大明  檢驗機構 瀚仕功能醫學研究中心 醫師' },
    },
    panels: [
      { panelType: 'HORMONE', flagged: true },
      { panelType: 'ALLERGY_FOOD_SENSITIVITY', flagged: false },
      { panelType: 'GI_HEALTH', flagged: true },
      { panelType: 'ORGANIC_ACIDS', flagged: false },
      { panelType: 'TOXIC_ELEMENTS', flagged: true },
      { panelType: 'OXIDATIVE_STRESS', flagged: true }
    ],
  },
  {
    id: 'demo-report-08',
    reportDate: new Date('2026-03-21'),
    status: 'PARSED' as const,
    blobName: 'demo/許雅芳.pdf',
    originalName: 'report_08_許雅芳.pdf',
    fileSizeBytes: 103500,
    parsedData: null,
    parseError: null,
    aiAnalysis: null,
    analysisAt: null,
    createdAt: new Date('2026-03-25T00:00:00.000Z'),
    updatedAt: new Date('2026-03-25T00:00:00.000Z'),
    patientId: 'demo-patient-08',
    clinicId: 'demo-clinic-001',
    uploadedBy: 'demo-doctor-002',
    patient: {
      id: 'demo-patient-08',
      chartNumber: 'FM-2026-00508',
      firstName: '雅芳',
      lastName: '許',
      dateOfBirth: new Date('1980-12-05'),
      gender: 'FEMALE',
      doctor: { id: 'demo-doctor-002', name: '林雅琪  檢驗機構 聯安功能醫學中心 醫師' },
    },
    panels: [
      { panelType: 'HORMONE', flagged: true },
      { panelType: 'ALLERGY_FOOD_SENSITIVITY', flagged: false },
      { panelType: 'GI_HEALTH', flagged: true },
      { panelType: 'ORGANIC_ACIDS', flagged: false },
      { panelType: 'TOXIC_ELEMENTS', flagged: true },
      { panelType: 'OXIDATIVE_STRESS', flagged: true }
    ],
  },
  {
    id: 'demo-report-09',
    reportDate: new Date('2026-03-21'),
    status: 'PARSED' as const,
    blobName: 'demo/劉家銘.pdf',
    originalName: 'report_09_劉家銘.pdf',
    fileSizeBytes: 104000,
    parsedData: null,
    parseError: null,
    aiAnalysis: null,
    analysisAt: null,
    createdAt: new Date('2026-03-26T00:00:00.000Z'),
    updatedAt: new Date('2026-03-26T00:00:00.000Z'),
    patientId: 'demo-patient-09',
    clinicId: 'demo-clinic-001',
    uploadedBy: 'demo-doctor-001',
    patient: {
      id: 'demo-patient-09',
      chartNumber: 'FM-2026-00509',
      firstName: '家銘',
      lastName: '劉',
      dateOfBirth: new Date('1975-08-18'),
      gender: 'MALE',
      doctor: { id: 'demo-doctor-001', name: '陳明德  檢驗機構 聯欣功能醫學中心 醫師' },
    },
    panels: [
      { panelType: 'HORMONE', flagged: true },
      { panelType: 'ALLERGY_FOOD_SENSITIVITY', flagged: false },
      { panelType: 'GI_HEALTH', flagged: true },
      { panelType: 'ORGANIC_ACIDS', flagged: false },
      { panelType: 'TOXIC_ELEMENTS', flagged: true },
      { panelType: 'OXIDATIVE_STRESS', flagged: true }
    ],
  },
  {
    id: 'demo-report-10',
    reportDate: new Date('2026-03-21'),
    status: 'PARSED' as const,
    blobName: 'demo/鄭雅文.pdf',
    originalName: 'report_10_鄭雅文.pdf',
    fileSizeBytes: 104500,
    parsedData: null,
    parseError: null,
    aiAnalysis: null,
    analysisAt: null,
    createdAt: new Date('2026-03-27T00:00:00.000Z'),
    updatedAt: new Date('2026-03-27T00:00:00.000Z'),
    patientId: 'demo-patient-10',
    clinicId: 'demo-clinic-001',
    uploadedBy: 'demo-doctor-001',
    patient: {
      id: 'demo-patient-10',
      chartNumber: 'FM-2026-00510',
      firstName: '雅文',
      lastName: '鄭',
      dateOfBirth: new Date('1988-01-22'),
      gender: 'FEMALE',
      doctor: { id: 'demo-doctor-001', name: '王大明  檢驗機構 瀚仕功能醫學研究中心 醫師' },
    },
    panels: [
      { panelType: 'HORMONE', flagged: true },
      { panelType: 'ALLERGY_FOOD_SENSITIVITY', flagged: true },
      { panelType: 'GI_HEALTH', flagged: true },
      { panelType: 'ORGANIC_ACIDS', flagged: false },
      { panelType: 'TOXIC_ELEMENTS', flagged: true },
      { panelType: 'OXIDATIVE_STRESS', flagged: true }
    ],
  }
]

export const MOCK_PANELS = [
  {
    id: 'demo-panel-01-HORMONE',
    reportId: 'demo-report-01',
    panelType: 'HORMONE',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "cortisolAM": {
            "value": 7.2,
            "unit": "nmol/L",
            "referenceRange": "13.0 - 24.0",
            "flag": "LOW"
      },
      "cortisolNoon": {
            "value": 3.3,
            "unit": "nmol/L",
            "referenceRange": "5.0 - 10.0",
            "flag": "LOW"
      },
      "cortisolPM": {
            "value": 1.5,
            "unit": "nmol/L",
            "referenceRange": "3.0 - 8.0",
            "flag": "LOW"
      },
      "cortisolNight": {
            "value": 0.8,
            "unit": "nmol/L",
            "referenceRange": "0.5 - 3.0",
            "flag": "NORMAL"
      },
      "dheaS": {
            "value": 84.0,
            "unit": "ug/dL",
            "referenceRange": "120 - 360",
            "flag": "LOW"
      },
      "tsh": {
            "value": 2.7,
            "unit": "uIU/mL",
            "referenceRange": "0.45 - 4.50",
            "flag": "NORMAL"
      },
      "freeT4": {
            "value": 1.2,
            "unit": "ng/dL",
            "referenceRange": "0.82 - 1.77",
            "flag": "NORMAL"
      },
      "freeT3": {
            "value": 2.2,
            "unit": "pg/mL",
            "referenceRange": "2.0 - 4.4",
            "flag": "NORMAL"
      },
      "reverseT3": {
            "value": 25.0,
            "unit": "ng/dL",
            "referenceRange": "9.2 - 24.1",
            "flag": "HIGH"
      },
      "antiTpoAb": {
            "value": 12.0,
            "unit": "IU/mL",
            "referenceRange": "< 34",
            "flag": "NORMAL"
      },
      "antiTgAb": {
            "value": 10.0,
            "unit": "IU/mL",
            "referenceRange": "< 40",
            "flag": "NORMAL"
      },
      "estradiol": {
            "value": 22.0,
            "unit": "pg/mL",
            "referenceRange": "10 - 40",
            "flag": "NORMAL"
      },
      "testosterone": {
            "value": 284.0,
            "unit": "ng/dL",
            "referenceRange": "300 - 1000",
            "flag": "LOW"
      },
      "shbg": {
            "value": 46.0,
            "unit": "nmol/L",
            "referenceRange": "18 - 54",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-01-ALLERGY_FOOD_SENSITIVITY',
    reportId: 'demo-report-01',
    panelType: 'ALLERGY_FOOD_SENSITIVITY',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "igeTotal": {
            "value": 104.0,
            "unit": "IU/mL",
            "referenceRange": "< 100",
            "flag": "HIGH"
      },
      "dustMite": {
            "value": 0.3,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "catDander": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "cockroach": {
            "value": 0.2,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "mold": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "pollen": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "foodSensitivities": [
            {
                  "food": "杏仁",
                  "igG": 8.4,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "鮭魚",
                  "igG": 4.9,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "白米",
                  "igG": 6.2,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            }
      ]
},
  },
  {
    id: 'demo-panel-01-GI_HEALTH',
    reportId: 'demo-report-01',
    panelType: 'GI_HEALTH',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "zonulin": {
            "value": 144.0,
            "unit": "ng/mL",
            "referenceRange": "< 107",
            "flag": "HIGH"
      },
      "sIgA": {
            "value": 273.0,
            "unit": "ug/mL",
            "referenceRange": "400 - 880",
            "flag": "LOW"
      },
      "calprotectin": {
            "value": 98.0,
            "unit": "ug/g",
            "referenceRange": "< 50",
            "flag": "HIGH"
      },
      "pancreaticElastase": {
            "value": 338.0,
            "unit": "ug/g",
            "referenceRange": "> 200",
            "flag": "NORMAL"
      },
      "butyrate": {
            "value": 6.4,
            "unit": "umol/g",
            "referenceRange": "10.0 - 25.0",
            "flag": "LOW"
      },
      "propionate": {
            "value": 11.7,
            "unit": "umol/g",
            "referenceRange": "10.0 - 20.0",
            "flag": "NORMAL"
      },
      "betaGlucuronidase": {
            "value": 3182.0,
            "unit": "U/g",
            "referenceRange": "< 2000",
            "flag": "HIGH"
      }
},
  },
  {
    id: 'demo-panel-01-ORGANIC_ACIDS',
    reportId: 'demo-report-01',
    panelType: 'ORGANIC_ACIDS',
    flagged: false,
    rawText: '',
    createdAt: new Date(),
    values: {},
  },
  {
    id: 'demo-panel-01-TOXIC_ELEMENTS',
    reportId: 'demo-report-01',
    panelType: 'TOXIC_ELEMENTS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mercuryBlood": {
            "value": 4.3,
            "unit": "ug/L",
            "referenceRange": "< 5.0",
            "flag": "NORMAL"
      },
      "lead": {
            "value": 4.2,
            "unit": "ug/dL",
            "referenceRange": "< 3.5",
            "flag": "HIGH"
      },
      "arsenic": {
            "value": 31.0,
            "unit": "ug/L",
            "referenceRange": "< 35",
            "flag": "NORMAL"
      },
      "cadmium": {
            "value": 0.5,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "NORMAL"
      },
      "aluminum": {
            "value": 22.0,
            "unit": "ug/L",
            "referenceRange": "< 30",
            "flag": "NORMAL"
      },
      "zinc": {
            "value": 57.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 120",
            "flag": "LOW"
      },
      "selenium": {
            "value": 81.0,
            "unit": "ug/L",
            "referenceRange": "70 - 150",
            "flag": "NORMAL"
      },
      "magnesiumRbc": {
            "value": 3.5,
            "unit": "mg/dL",
            "referenceRange": "4.2 - 6.8",
            "flag": "LOW"
      },
      "copper": {
            "value": 149.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 140",
            "flag": "HIGH"
      },
      "ferritin": {
            "value": 15.0,
            "unit": "ng/mL",
            "referenceRange": "20 - 200",
            "flag": "LOW"
      },
      "iodine": {
            "value": 58.0,
            "unit": "ug/L",
            "referenceRange": "100 - 300",
            "flag": "LOW"
      },
      "mehp": {
            "value": 14.8,
            "unit": "ug/L",
            "referenceRange": "< 10.0",
            "flag": "HIGH"
      },
      "bpa": {
            "value": 5.0,
            "unit": "ug/L",
            "referenceRange": "< 2.0",
            "flag": "HIGH"
      },
      "nonylphenol": {
            "value": 2.9,
            "unit": "ug/L",
            "referenceRange": "< 2.5",
            "flag": "HIGH"
      },
      "glyphosate": {
            "value": 0.8,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-01-OXIDATIVE_STRESS',
    reportId: 'demo-report-01',
    panelType: 'OXIDATIVE_STRESS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mda": {
            "value": 4.2,
            "unit": "umol/L",
            "referenceRange": "0.8 - 2.5",
            "flag": "HIGH"
      },
      "proteinCarbonyls": {
            "value": 1.3,
            "unit": "nmol/mg",
            "referenceRange": "0.4 - 1.0",
            "flag": "HIGH"
      },
      "gsh": {
            "value": 608.0,
            "unit": "umol/L",
            "referenceRange": "800 - 1200",
            "flag": "LOW"
      },
      "gssg": {
            "value": 193.0,
            "unit": "umol/L",
            "referenceRange": "< 150",
            "flag": "HIGH"
      },
      "sod": {
            "value": 1050.0,
            "unit": "U/gHb",
            "referenceRange": "1100 - 1800",
            "flag": "LOW"
      },
      "gpx": {
            "value": 26.0,
            "unit": "U/gHb",
            "referenceRange": "30 - 55",
            "flag": "LOW"
      },
      "catalase": {
            "value": 166.0,
            "unit": "kU/gHb",
            "referenceRange": "150 - 350",
            "flag": "NORMAL"
      },
      "coq10": {
            "value": 0.4,
            "unit": "ug/mL",
            "referenceRange": "0.50 - 1.50",
            "flag": "LOW"
      },
      "vitaminC": {
            "value": 0.3,
            "unit": "mg/dL",
            "referenceRange": "0.60 - 2.00",
            "flag": "LOW"
      },
      "vitaminE": {
            "value": 8.3,
            "unit": "mg/L",
            "referenceRange": "5.5 - 17.0",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-02-HORMONE',
    reportId: 'demo-report-02',
    panelType: 'HORMONE',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "cortisolAM": {
            "value": 16.3,
            "unit": "nmol/L",
            "referenceRange": "13.0 - 24.0",
            "flag": "NORMAL"
      },
      "cortisolNoon": {
            "value": 7.3,
            "unit": "nmol/L",
            "referenceRange": "5.0 - 10.0",
            "flag": "NORMAL"
      },
      "cortisolPM": {
            "value": 4.3,
            "unit": "nmol/L",
            "referenceRange": "3.0 - 8.0",
            "flag": "NORMAL"
      },
      "cortisolNight": {
            "value": 2.5,
            "unit": "nmol/L",
            "referenceRange": "0.5 - 3.0",
            "flag": "NORMAL"
      },
      "dheaS": {
            "value": 82.0,
            "unit": "ug/dL",
            "referenceRange": "120 - 360",
            "flag": "LOW"
      },
      "tsh": {
            "value": 4.8,
            "unit": "uIU/mL",
            "referenceRange": "0.45 - 4.50",
            "flag": "HIGH"
      },
      "freeT4": {
            "value": 1.1,
            "unit": "ng/dL",
            "referenceRange": "0.82 - 1.77",
            "flag": "NORMAL"
      },
      "freeT3": {
            "value": 2.4,
            "unit": "pg/mL",
            "referenceRange": "2.0 - 4.4",
            "flag": "NORMAL"
      },
      "reverseT3": {
            "value": 21.0,
            "unit": "ng/dL",
            "referenceRange": "9.2 - 24.1",
            "flag": "NORMAL"
      },
      "antiTpoAb": {
            "value": 28.0,
            "unit": "IU/mL",
            "referenceRange": "< 34",
            "flag": "NORMAL"
      },
      "antiTgAb": {
            "value": 14.0,
            "unit": "IU/mL",
            "referenceRange": "< 40",
            "flag": "NORMAL"
      },
      "estradiol": {
            "value": 16.0,
            "unit": "pg/mL",
            "referenceRange": "40 - 400",
            "flag": "LOW"
      },
      "progesterone": {
            "value": 0.2,
            "unit": "ng/mL",
            "referenceRange": "1.8 - 24.0",
            "flag": "LOW"
      },
      "testosterone": {
            "value": 8.0,
            "unit": "ng/dL",
            "referenceRange": "15 - 70",
            "flag": "LOW"
      },
      "shbg": {
            "value": 97.0,
            "unit": "nmol/L",
            "referenceRange": "18 - 114",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-02-ALLERGY_FOOD_SENSITIVITY',
    reportId: 'demo-report-02',
    panelType: 'ALLERGY_FOOD_SENSITIVITY',
    flagged: false,
    rawText: '',
    createdAt: new Date(),
    values: {
      "igeTotal": {
            "value": 99.0,
            "unit": "IU/mL",
            "referenceRange": "< 100",
            "flag": "NORMAL"
      },
      "dustMite": {
            "value": 0.2,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "catDander": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "cockroach": {
            "value": 0.2,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "mold": {
            "value": 0.2,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "pollen": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "foodSensitivities": [
            {
                  "food": "花生",
                  "igG": 8.1,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "杏仁",
                  "igG": 5.8,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "鮭魚",
                  "igG": 4.2,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "白米",
                  "igG": 5.3,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "豬肉",
                  "igG": 9.7,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "咖啡因",
                  "igG": 8.3,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            }
      ]
},
  },
  {
    id: 'demo-panel-02-GI_HEALTH',
    reportId: 'demo-report-02',
    panelType: 'GI_HEALTH',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "zonulin": {
            "value": 112.0,
            "unit": "ng/mL",
            "referenceRange": "< 107",
            "flag": "HIGH"
      },
      "sIgA": {
            "value": 501.0,
            "unit": "ug/mL",
            "referenceRange": "400 - 880",
            "flag": "NORMAL"
      },
      "calprotectin": {
            "value": 42.0,
            "unit": "ug/g",
            "referenceRange": "< 50",
            "flag": "NORMAL"
      },
      "pancreaticElastase": {
            "value": 276.0,
            "unit": "ug/g",
            "referenceRange": "> 200",
            "flag": "NORMAL"
      },
      "butyrate": {
            "value": 9.1,
            "unit": "umol/g",
            "referenceRange": "10.0 - 25.0",
            "flag": "LOW"
      },
      "propionate": {
            "value": 14.5,
            "unit": "umol/g",
            "referenceRange": "10.0 - 20.0",
            "flag": "NORMAL"
      },
      "betaGlucuronidase": {
            "value": 2127.0,
            "unit": "U/g",
            "referenceRange": "< 2000",
            "flag": "HIGH"
      }
},
  },
  {
    id: 'demo-panel-02-ORGANIC_ACIDS',
    reportId: 'demo-report-02',
    panelType: 'ORGANIC_ACIDS',
    flagged: false,
    rawText: '',
    createdAt: new Date(),
    values: {},
  },
  {
    id: 'demo-panel-02-TOXIC_ELEMENTS',
    reportId: 'demo-report-02',
    panelType: 'TOXIC_ELEMENTS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mercuryBlood": {
            "value": 5.7,
            "unit": "ug/L",
            "referenceRange": "< 5.0",
            "flag": "HIGH"
      },
      "lead": {
            "value": 2.9,
            "unit": "ug/dL",
            "referenceRange": "< 3.5",
            "flag": "NORMAL"
      },
      "arsenic": {
            "value": 29.0,
            "unit": "ug/L",
            "referenceRange": "< 35",
            "flag": "NORMAL"
      },
      "cadmium": {
            "value": 1.5,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "HIGH"
      },
      "aluminum": {
            "value": 18.0,
            "unit": "ug/L",
            "referenceRange": "< 30",
            "flag": "NORMAL"
      },
      "zinc": {
            "value": 71.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 120",
            "flag": "NORMAL"
      },
      "selenium": {
            "value": 81.0,
            "unit": "ug/L",
            "referenceRange": "70 - 150",
            "flag": "NORMAL"
      },
      "magnesiumRbc": {
            "value": 4.4,
            "unit": "mg/dL",
            "referenceRange": "4.2 - 6.8",
            "flag": "NORMAL"
      },
      "copper": {
            "value": 127.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 140",
            "flag": "NORMAL"
      },
      "ferritin": {
            "value": 22.0,
            "unit": "ng/mL",
            "referenceRange": "20 - 200",
            "flag": "NORMAL"
      },
      "iodine": {
            "value": 48.0,
            "unit": "ug/L",
            "referenceRange": "100 - 300",
            "flag": "LOW"
      },
      "mehp": {
            "value": 13.1,
            "unit": "ug/L",
            "referenceRange": "< 10.0",
            "flag": "HIGH"
      },
      "bpa": {
            "value": 3.0,
            "unit": "ug/L",
            "referenceRange": "< 2.0",
            "flag": "HIGH"
      },
      "nonylphenol": {
            "value": 2.3,
            "unit": "ug/L",
            "referenceRange": "< 2.5",
            "flag": "NORMAL"
      },
      "glyphosate": {
            "value": 0.5,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-02-OXIDATIVE_STRESS',
    reportId: 'demo-report-02',
    panelType: 'OXIDATIVE_STRESS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mda": {
            "value": 4.4,
            "unit": "umol/L",
            "referenceRange": "0.8 - 2.5",
            "flag": "HIGH"
      },
      "proteinCarbonyls": {
            "value": 0.9,
            "unit": "nmol/mg",
            "referenceRange": "0.4 - 1.0",
            "flag": "NORMAL"
      },
      "gsh": {
            "value": 669.0,
            "unit": "umol/L",
            "referenceRange": "800 - 1200",
            "flag": "LOW"
      },
      "gssg": {
            "value": 171.0,
            "unit": "umol/L",
            "referenceRange": "< 150",
            "flag": "HIGH"
      },
      "sod": {
            "value": 1097.0,
            "unit": "U/gHb",
            "referenceRange": "1100 - 1800",
            "flag": "LOW"
      },
      "gpx": {
            "value": 30.0,
            "unit": "U/gHb",
            "referenceRange": "30 - 55",
            "flag": "NORMAL"
      },
      "catalase": {
            "value": 188.0,
            "unit": "kU/gHb",
            "referenceRange": "150 - 350",
            "flag": "NORMAL"
      },
      "coq10": {
            "value": 0.5,
            "unit": "ug/mL",
            "referenceRange": "0.50 - 1.50",
            "flag": "NORMAL"
      },
      "vitaminC": {
            "value": 0.4,
            "unit": "mg/dL",
            "referenceRange": "0.60 - 2.00",
            "flag": "LOW"
      },
      "vitaminE": {
            "value": 6.5,
            "unit": "mg/L",
            "referenceRange": "5.5 - 17.0",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-03-HORMONE',
    reportId: 'demo-report-03',
    panelType: 'HORMONE',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "cortisolAM": {
            "value": 27.1,
            "unit": "nmol/L",
            "referenceRange": "13.0 - 24.0",
            "flag": "HIGH"
      },
      "cortisolNoon": {
            "value": 14.2,
            "unit": "nmol/L",
            "referenceRange": "5.0 - 10.0",
            "flag": "HIGH"
      },
      "cortisolPM": {
            "value": 10.3,
            "unit": "nmol/L",
            "referenceRange": "3.0 - 8.0",
            "flag": "HIGH"
      },
      "cortisolNight": {
            "value": 4.7,
            "unit": "nmol/L",
            "referenceRange": "0.5 - 3.0",
            "flag": "HIGH"
      },
      "dheaS": {
            "value": 110.0,
            "unit": "ug/dL",
            "referenceRange": "120 - 360",
            "flag": "LOW"
      },
      "tsh": {
            "value": 2.5,
            "unit": "uIU/mL",
            "referenceRange": "0.45 - 4.50",
            "flag": "NORMAL"
      },
      "freeT4": {
            "value": 1.1,
            "unit": "ng/dL",
            "referenceRange": "0.82 - 1.77",
            "flag": "NORMAL"
      },
      "freeT3": {
            "value": 3.0,
            "unit": "pg/mL",
            "referenceRange": "2.0 - 4.4",
            "flag": "NORMAL"
      },
      "reverseT3": {
            "value": 16.0,
            "unit": "ng/dL",
            "referenceRange": "9.2 - 24.1",
            "flag": "NORMAL"
      },
      "antiTpoAb": {
            "value": 10.0,
            "unit": "IU/mL",
            "referenceRange": "< 34",
            "flag": "NORMAL"
      },
      "antiTgAb": {
            "value": 8.0,
            "unit": "IU/mL",
            "referenceRange": "< 40",
            "flag": "NORMAL"
      },
      "estradiol": {
            "value": 43.0,
            "unit": "pg/mL",
            "referenceRange": "10 - 40",
            "flag": "HIGH"
      },
      "testosterone": {
            "value": 329.0,
            "unit": "ng/dL",
            "referenceRange": "300 - 1000",
            "flag": "NORMAL"
      },
      "shbg": {
            "value": 23.0,
            "unit": "nmol/L",
            "referenceRange": "18 - 54",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-03-ALLERGY_FOOD_SENSITIVITY',
    reportId: 'demo-report-03',
    panelType: 'ALLERGY_FOOD_SENSITIVITY',
    flagged: false,
    rawText: '',
    createdAt: new Date(),
    values: {
      "igeTotal": {
            "value": 99.0,
            "unit": "IU/mL",
            "referenceRange": "< 100",
            "flag": "NORMAL"
      },
      "dustMite": {
            "value": 0.3,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "catDander": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "cockroach": {
            "value": 0.2,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "mold": {
            "value": 0.2,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "pollen": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "foodSensitivities": [
            {
                  "food": "花生",
                  "igG": 10.5,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "杏仁",
                  "igG": 5.1,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "鮭魚",
                  "igG": 4.0,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "白米",
                  "igG": 8.3,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            }
      ]
},
  },
  {
    id: 'demo-panel-03-GI_HEALTH',
    reportId: 'demo-report-03',
    panelType: 'GI_HEALTH',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "zonulin": {
            "value": 138.0,
            "unit": "ng/mL",
            "referenceRange": "< 107",
            "flag": "HIGH"
      },
      "sIgA": {
            "value": 334.0,
            "unit": "ug/mL",
            "referenceRange": "400 - 880",
            "flag": "LOW"
      },
      "calprotectin": {
            "value": 69.0,
            "unit": "ug/g",
            "referenceRange": "< 50",
            "flag": "HIGH"
      },
      "pancreaticElastase": {
            "value": 383.0,
            "unit": "ug/g",
            "referenceRange": "> 200",
            "flag": "NORMAL"
      },
      "butyrate": {
            "value": 7.7,
            "unit": "umol/g",
            "referenceRange": "10.0 - 25.0",
            "flag": "LOW"
      },
      "propionate": {
            "value": 13.1,
            "unit": "umol/g",
            "referenceRange": "10.0 - 20.0",
            "flag": "NORMAL"
      },
      "betaGlucuronidase": {
            "value": 3481.0,
            "unit": "U/g",
            "referenceRange": "< 2000",
            "flag": "HIGH"
      }
},
  },
  {
    id: 'demo-panel-03-ORGANIC_ACIDS',
    reportId: 'demo-report-03',
    panelType: 'ORGANIC_ACIDS',
    flagged: false,
    rawText: '',
    createdAt: new Date(),
    values: {},
  },
  {
    id: 'demo-panel-03-TOXIC_ELEMENTS',
    reportId: 'demo-report-03',
    panelType: 'TOXIC_ELEMENTS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mercuryBlood": {
            "value": 4.8,
            "unit": "ug/L",
            "referenceRange": "< 5.0",
            "flag": "NORMAL"
      },
      "lead": {
            "value": 3.6,
            "unit": "ug/dL",
            "referenceRange": "< 3.5",
            "flag": "HIGH"
      },
      "arsenic": {
            "value": 46.0,
            "unit": "ug/L",
            "referenceRange": "< 35",
            "flag": "HIGH"
      },
      "cadmium": {
            "value": 0.8,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "NORMAL"
      },
      "aluminum": {
            "value": 29.0,
            "unit": "ug/L",
            "referenceRange": "< 30",
            "flag": "NORMAL"
      },
      "zinc": {
            "value": 52.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 120",
            "flag": "LOW"
      },
      "selenium": {
            "value": 73.0,
            "unit": "ug/L",
            "referenceRange": "70 - 150",
            "flag": "NORMAL"
      },
      "magnesiumRbc": {
            "value": 3.1,
            "unit": "mg/dL",
            "referenceRange": "4.2 - 6.8",
            "flag": "LOW"
      },
      "copper": {
            "value": 162.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 140",
            "flag": "HIGH"
      },
      "ferritin": {
            "value": 12.0,
            "unit": "ng/mL",
            "referenceRange": "20 - 200",
            "flag": "LOW"
      },
      "iodine": {
            "value": 60.0,
            "unit": "ug/L",
            "referenceRange": "100 - 300",
            "flag": "LOW"
      },
      "mehp": {
            "value": 23.3,
            "unit": "ug/L",
            "referenceRange": "< 10.0",
            "flag": "HIGH"
      },
      "bpa": {
            "value": 6.6,
            "unit": "ug/L",
            "referenceRange": "< 2.0",
            "flag": "HIGH"
      },
      "nonylphenol": {
            "value": 4.0,
            "unit": "ug/L",
            "referenceRange": "< 2.5",
            "flag": "HIGH"
      },
      "glyphosate": {
            "value": 1.5,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "HIGH"
      }
},
  },
  {
    id: 'demo-panel-03-OXIDATIVE_STRESS',
    reportId: 'demo-report-03',
    panelType: 'OXIDATIVE_STRESS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mda": {
            "value": 3.3,
            "unit": "umol/L",
            "referenceRange": "0.8 - 2.5",
            "flag": "HIGH"
      },
      "proteinCarbonyls": {
            "value": 1.4,
            "unit": "nmol/mg",
            "referenceRange": "0.4 - 1.0",
            "flag": "HIGH"
      },
      "gsh": {
            "value": 619.0,
            "unit": "umol/L",
            "referenceRange": "800 - 1200",
            "flag": "LOW"
      },
      "gssg": {
            "value": 186.0,
            "unit": "umol/L",
            "referenceRange": "< 150",
            "flag": "HIGH"
      },
      "sod": {
            "value": 1036.0,
            "unit": "U/gHb",
            "referenceRange": "1100 - 1800",
            "flag": "LOW"
      },
      "gpx": {
            "value": 28.0,
            "unit": "U/gHb",
            "referenceRange": "30 - 55",
            "flag": "LOW"
      },
      "catalase": {
            "value": 178.0,
            "unit": "kU/gHb",
            "referenceRange": "150 - 350",
            "flag": "NORMAL"
      },
      "coq10": {
            "value": 0.4,
            "unit": "ug/mL",
            "referenceRange": "0.50 - 1.50",
            "flag": "LOW"
      },
      "vitaminC": {
            "value": 0.4,
            "unit": "mg/dL",
            "referenceRange": "0.60 - 2.00",
            "flag": "LOW"
      },
      "vitaminE": {
            "value": 7.5,
            "unit": "mg/L",
            "referenceRange": "5.5 - 17.0",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-04-HORMONE',
    reportId: 'demo-report-04',
    panelType: 'HORMONE',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "cortisolAM": {
            "value": 10.9,
            "unit": "nmol/L",
            "referenceRange": "13.0 - 24.0",
            "flag": "LOW"
      },
      "cortisolNoon": {
            "value": 6.8,
            "unit": "nmol/L",
            "referenceRange": "5.0 - 10.0",
            "flag": "NORMAL"
      },
      "cortisolPM": {
            "value": 5.0,
            "unit": "nmol/L",
            "referenceRange": "3.0 - 8.0",
            "flag": "NORMAL"
      },
      "cortisolNight": {
            "value": 4.3,
            "unit": "nmol/L",
            "referenceRange": "0.5 - 3.0",
            "flag": "HIGH"
      },
      "dheaS": {
            "value": 104.0,
            "unit": "ug/dL",
            "referenceRange": "120 - 360",
            "flag": "LOW"
      },
      "tsh": {
            "value": 5.7,
            "unit": "uIU/mL",
            "referenceRange": "0.45 - 4.50",
            "flag": "HIGH"
      },
      "freeT4": {
            "value": 0.9,
            "unit": "ng/dL",
            "referenceRange": "0.82 - 1.77",
            "flag": "NORMAL"
      },
      "freeT3": {
            "value": 2.3,
            "unit": "pg/mL",
            "referenceRange": "2.0 - 4.4",
            "flag": "NORMAL"
      },
      "reverseT3": {
            "value": 26.0,
            "unit": "ng/dL",
            "referenceRange": "9.2 - 24.1",
            "flag": "HIGH"
      },
      "antiTpoAb": {
            "value": 182.0,
            "unit": "IU/mL",
            "referenceRange": "< 34",
            "flag": "HIGH"
      },
      "antiTgAb": {
            "value": 67.0,
            "unit": "IU/mL",
            "referenceRange": "< 40",
            "flag": "HIGH"
      },
      "estradiol": {
            "value": 225.0,
            "unit": "pg/mL",
            "referenceRange": "40 - 400",
            "flag": "NORMAL"
      },
      "progesterone": {
            "value": 0.5,
            "unit": "ng/mL",
            "referenceRange": "1.8 - 24.0",
            "flag": "LOW"
      },
      "testosterone": {
            "value": 22.0,
            "unit": "ng/dL",
            "referenceRange": "15 - 70",
            "flag": "NORMAL"
      },
      "shbg": {
            "value": 92.0,
            "unit": "nmol/L",
            "referenceRange": "18 - 114",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-04-ALLERGY_FOOD_SENSITIVITY',
    reportId: 'demo-report-04',
    panelType: 'ALLERGY_FOOD_SENSITIVITY',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "igeTotal": {
            "value": 416.0,
            "unit": "IU/mL",
            "referenceRange": "< 100",
            "flag": "HIGH"
      },
      "dustMite": {
            "value": 6.3,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "HIGH"
      },
      "catDander": {
            "value": 0.2,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "cockroach": {
            "value": 1.8,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "HIGH"
      },
      "mold": {
            "value": 1.5,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "HIGH"
      },
      "pollen": {
            "value": 0.8,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "HIGH"
      },
      "foodSensitivities": [
            {
                  "food": "鮭魚",
                  "igG": 7.5,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "白米",
                  "igG": 10.3,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            }
      ]
},
  },
  {
    id: 'demo-panel-04-GI_HEALTH',
    reportId: 'demo-report-04',
    panelType: 'GI_HEALTH',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "zonulin": {
            "value": 160.0,
            "unit": "ng/mL",
            "referenceRange": "< 107",
            "flag": "HIGH"
      },
      "sIgA": {
            "value": 205.0,
            "unit": "ug/mL",
            "referenceRange": "400 - 880",
            "flag": "LOW"
      },
      "calprotectin": {
            "value": 119.0,
            "unit": "ug/g",
            "referenceRange": "< 50",
            "flag": "HIGH"
      },
      "pancreaticElastase": {
            "value": 428.0,
            "unit": "ug/g",
            "referenceRange": "> 200",
            "flag": "NORMAL"
      },
      "butyrate": {
            "value": 5.5,
            "unit": "umol/g",
            "referenceRange": "10.0 - 25.0",
            "flag": "LOW"
      },
      "propionate": {
            "value": 10.8,
            "unit": "umol/g",
            "referenceRange": "10.0 - 20.0",
            "flag": "NORMAL"
      },
      "betaGlucuronidase": {
            "value": 2827.0,
            "unit": "U/g",
            "referenceRange": "< 2000",
            "flag": "HIGH"
      }
},
  },
  {
    id: 'demo-panel-04-ORGANIC_ACIDS',
    reportId: 'demo-report-04',
    panelType: 'ORGANIC_ACIDS',
    flagged: false,
    rawText: '',
    createdAt: new Date(),
    values: {},
  },
  {
    id: 'demo-panel-04-TOXIC_ELEMENTS',
    reportId: 'demo-report-04',
    panelType: 'TOXIC_ELEMENTS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mercuryBlood": {
            "value": 8.0,
            "unit": "ug/L",
            "referenceRange": "< 5.0",
            "flag": "HIGH"
      },
      "lead": {
            "value": 3.3,
            "unit": "ug/dL",
            "referenceRange": "< 3.5",
            "flag": "NORMAL"
      },
      "arsenic": {
            "value": 35.0,
            "unit": "ug/L",
            "referenceRange": "< 35",
            "flag": "NORMAL"
      },
      "cadmium": {
            "value": 0.6,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "NORMAL"
      },
      "aluminum": {
            "value": 21.0,
            "unit": "ug/L",
            "referenceRange": "< 30",
            "flag": "NORMAL"
      },
      "zinc": {
            "value": 53.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 120",
            "flag": "LOW"
      },
      "selenium": {
            "value": 70.0,
            "unit": "ug/L",
            "referenceRange": "70 - 150",
            "flag": "NORMAL"
      },
      "magnesiumRbc": {
            "value": 3.4,
            "unit": "mg/dL",
            "referenceRange": "4.2 - 6.8",
            "flag": "LOW"
      },
      "copper": {
            "value": 147.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 140",
            "flag": "HIGH"
      },
      "ferritin": {
            "value": 16.0,
            "unit": "ng/mL",
            "referenceRange": "20 - 200",
            "flag": "LOW"
      },
      "iodine": {
            "value": 48.0,
            "unit": "ug/L",
            "referenceRange": "100 - 300",
            "flag": "LOW"
      },
      "mehp": {
            "value": 19.6,
            "unit": "ug/L",
            "referenceRange": "< 10.0",
            "flag": "HIGH"
      },
      "bpa": {
            "value": 5.7,
            "unit": "ug/L",
            "referenceRange": "< 2.0",
            "flag": "HIGH"
      },
      "nonylphenol": {
            "value": 3.7,
            "unit": "ug/L",
            "referenceRange": "< 2.5",
            "flag": "HIGH"
      },
      "glyphosate": {
            "value": 1.0,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-04-OXIDATIVE_STRESS',
    reportId: 'demo-report-04',
    panelType: 'OXIDATIVE_STRESS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mda": {
            "value": 5.2,
            "unit": "umol/L",
            "referenceRange": "0.8 - 2.5",
            "flag": "HIGH"
      },
      "proteinCarbonyls": {
            "value": 1.5,
            "unit": "nmol/mg",
            "referenceRange": "0.4 - 1.0",
            "flag": "HIGH"
      },
      "gsh": {
            "value": 509.0,
            "unit": "umol/L",
            "referenceRange": "800 - 1200",
            "flag": "LOW"
      },
      "gssg": {
            "value": 210.0,
            "unit": "umol/L",
            "referenceRange": "< 150",
            "flag": "HIGH"
      },
      "sod": {
            "value": 934.0,
            "unit": "U/gHb",
            "referenceRange": "1100 - 1800",
            "flag": "LOW"
      },
      "gpx": {
            "value": 25.0,
            "unit": "U/gHb",
            "referenceRange": "30 - 55",
            "flag": "LOW"
      },
      "catalase": {
            "value": 170.0,
            "unit": "kU/gHb",
            "referenceRange": "150 - 350",
            "flag": "NORMAL"
      },
      "coq10": {
            "value": 0.3,
            "unit": "ug/mL",
            "referenceRange": "0.50 - 1.50",
            "flag": "LOW"
      },
      "vitaminC": {
            "value": 0.3,
            "unit": "mg/dL",
            "referenceRange": "0.60 - 2.00",
            "flag": "LOW"
      },
      "vitaminE": {
            "value": 9.1,
            "unit": "mg/L",
            "referenceRange": "5.5 - 17.0",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-05-HORMONE',
    reportId: 'demo-report-05',
    panelType: 'HORMONE',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "cortisolAM": {
            "value": 14.1,
            "unit": "nmol/L",
            "referenceRange": "13.0 - 24.0",
            "flag": "NORMAL"
      },
      "cortisolNoon": {
            "value": 5.6,
            "unit": "nmol/L",
            "referenceRange": "5.0 - 10.0",
            "flag": "NORMAL"
      },
      "cortisolPM": {
            "value": 3.5,
            "unit": "nmol/L",
            "referenceRange": "3.0 - 8.0",
            "flag": "NORMAL"
      },
      "cortisolNight": {
            "value": 1.7,
            "unit": "nmol/L",
            "referenceRange": "0.5 - 3.0",
            "flag": "NORMAL"
      },
      "dheaS": {
            "value": 70.0,
            "unit": "ug/dL",
            "referenceRange": "120 - 360",
            "flag": "LOW"
      },
      "tsh": {
            "value": 3.7,
            "unit": "uIU/mL",
            "referenceRange": "0.45 - 4.50",
            "flag": "NORMAL"
      },
      "freeT4": {
            "value": 1.1,
            "unit": "ng/dL",
            "referenceRange": "0.82 - 1.77",
            "flag": "NORMAL"
      },
      "freeT3": {
            "value": 2.1,
            "unit": "pg/mL",
            "referenceRange": "2.0 - 4.4",
            "flag": "NORMAL"
      },
      "reverseT3": {
            "value": 28.0,
            "unit": "ng/dL",
            "referenceRange": "9.2 - 24.1",
            "flag": "HIGH"
      },
      "antiTpoAb": {
            "value": 14.0,
            "unit": "IU/mL",
            "referenceRange": "< 34",
            "flag": "NORMAL"
      },
      "antiTgAb": {
            "value": 12.0,
            "unit": "IU/mL",
            "referenceRange": "< 40",
            "flag": "NORMAL"
      },
      "estradiol": {
            "value": 27.0,
            "unit": "pg/mL",
            "referenceRange": "10 - 40",
            "flag": "NORMAL"
      },
      "testosterone": {
            "value": 232.0,
            "unit": "ng/dL",
            "referenceRange": "300 - 1000",
            "flag": "LOW"
      },
      "shbg": {
            "value": 59.0,
            "unit": "nmol/L",
            "referenceRange": "18 - 54",
            "flag": "HIGH"
      }
},
  },
  {
    id: 'demo-panel-05-ALLERGY_FOOD_SENSITIVITY',
    reportId: 'demo-report-05',
    panelType: 'ALLERGY_FOOD_SENSITIVITY',
    flagged: false,
    rawText: '',
    createdAt: new Date(),
    values: {
      "igeTotal": {
            "value": 96.0,
            "unit": "IU/mL",
            "referenceRange": "< 100",
            "flag": "NORMAL"
      },
      "dustMite": {
            "value": 0.2,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "catDander": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "cockroach": {
            "value": 0.2,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "mold": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "pollen": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "foodSensitivities": [
            {
                  "food": "蛋黃",
                  "igG": 9.9,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "花生",
                  "igG": 8.2,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "杏仁",
                  "igG": 4.9,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "鮭魚",
                  "igG": 6.4,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "白米",
                  "igG": 4.0,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "酵母",
                  "igG": 9.4,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "咖啡因",
                  "igG": 7.9,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            }
      ]
},
  },
  {
    id: 'demo-panel-05-GI_HEALTH',
    reportId: 'demo-report-05',
    panelType: 'GI_HEALTH',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "zonulin": {
            "value": 112.0,
            "unit": "ng/mL",
            "referenceRange": "< 107",
            "flag": "HIGH"
      },
      "sIgA": {
            "value": 470.0,
            "unit": "ug/mL",
            "referenceRange": "400 - 880",
            "flag": "NORMAL"
      },
      "calprotectin": {
            "value": 47.0,
            "unit": "ug/g",
            "referenceRange": "< 50",
            "flag": "NORMAL"
      },
      "pancreaticElastase": {
            "value": 221.0,
            "unit": "ug/g",
            "referenceRange": "> 200",
            "flag": "NORMAL"
      },
      "butyrate": {
            "value": 9.1,
            "unit": "umol/g",
            "referenceRange": "10.0 - 25.0",
            "flag": "LOW"
      },
      "propionate": {
            "value": 13.2,
            "unit": "umol/g",
            "referenceRange": "10.0 - 20.0",
            "flag": "NORMAL"
      },
      "betaGlucuronidase": {
            "value": 1778.0,
            "unit": "U/g",
            "referenceRange": "< 2000",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-05-ORGANIC_ACIDS',
    reportId: 'demo-report-05',
    panelType: 'ORGANIC_ACIDS',
    flagged: false,
    rawText: '',
    createdAt: new Date(),
    values: {},
  },
  {
    id: 'demo-panel-05-TOXIC_ELEMENTS',
    reportId: 'demo-report-05',
    panelType: 'TOXIC_ELEMENTS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mercuryBlood": {
            "value": 9.1,
            "unit": "ug/L",
            "referenceRange": "< 5.0",
            "flag": "HIGH"
      },
      "lead": {
            "value": 5.5,
            "unit": "ug/dL",
            "referenceRange": "< 3.5",
            "flag": "HIGH"
      },
      "arsenic": {
            "value": 37.0,
            "unit": "ug/L",
            "referenceRange": "< 35",
            "flag": "HIGH"
      },
      "cadmium": {
            "value": 0.8,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "NORMAL"
      },
      "aluminum": {
            "value": 36.0,
            "unit": "ug/L",
            "referenceRange": "< 30",
            "flag": "HIGH"
      },
      "zinc": {
            "value": 64.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 120",
            "flag": "LOW"
      },
      "selenium": {
            "value": 69.0,
            "unit": "ug/L",
            "referenceRange": "70 - 150",
            "flag": "LOW"
      },
      "magnesiumRbc": {
            "value": 3.7,
            "unit": "mg/dL",
            "referenceRange": "4.2 - 6.8",
            "flag": "LOW"
      },
      "copper": {
            "value": 138.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 140",
            "flag": "NORMAL"
      },
      "ferritin": {
            "value": 27.0,
            "unit": "ng/mL",
            "referenceRange": "20 - 200",
            "flag": "NORMAL"
      },
      "iodine": {
            "value": 61.0,
            "unit": "ug/L",
            "referenceRange": "100 - 300",
            "flag": "LOW"
      },
      "mehp": {
            "value": 10.4,
            "unit": "ug/L",
            "referenceRange": "< 10.0",
            "flag": "HIGH"
      },
      "bpa": {
            "value": 3.5,
            "unit": "ug/L",
            "referenceRange": "< 2.0",
            "flag": "HIGH"
      },
      "nonylphenol": {
            "value": 2.5,
            "unit": "ug/L",
            "referenceRange": "< 2.5",
            "flag": "NORMAL"
      },
      "glyphosate": {
            "value": 0.8,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-05-OXIDATIVE_STRESS',
    reportId: 'demo-report-05',
    panelType: 'OXIDATIVE_STRESS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mda": {
            "value": 3.9,
            "unit": "umol/L",
            "referenceRange": "0.8 - 2.5",
            "flag": "HIGH"
      },
      "proteinCarbonyls": {
            "value": 1.2,
            "unit": "nmol/mg",
            "referenceRange": "0.4 - 1.0",
            "flag": "HIGH"
      },
      "gsh": {
            "value": 627.0,
            "unit": "umol/L",
            "referenceRange": "800 - 1200",
            "flag": "LOW"
      },
      "gssg": {
            "value": 182.0,
            "unit": "umol/L",
            "referenceRange": "< 150",
            "flag": "HIGH"
      },
      "sod": {
            "value": 1005.0,
            "unit": "U/gHb",
            "referenceRange": "1100 - 1800",
            "flag": "LOW"
      },
      "gpx": {
            "value": 24.0,
            "unit": "U/gHb",
            "referenceRange": "30 - 55",
            "flag": "LOW"
      },
      "catalase": {
            "value": 182.0,
            "unit": "kU/gHb",
            "referenceRange": "150 - 350",
            "flag": "NORMAL"
      },
      "coq10": {
            "value": 0.3,
            "unit": "ug/mL",
            "referenceRange": "0.50 - 1.50",
            "flag": "LOW"
      },
      "vitaminC": {
            "value": 0.5,
            "unit": "mg/dL",
            "referenceRange": "0.60 - 2.00",
            "flag": "LOW"
      },
      "vitaminE": {
            "value": 7.6,
            "unit": "mg/L",
            "referenceRange": "5.5 - 17.0",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-06-HORMONE',
    reportId: 'demo-report-06',
    panelType: 'HORMONE',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "cortisolAM": {
            "value": 11.5,
            "unit": "nmol/L",
            "referenceRange": "13.0 - 24.0",
            "flag": "LOW"
      },
      "cortisolNoon": {
            "value": 4.8,
            "unit": "nmol/L",
            "referenceRange": "5.0 - 10.0",
            "flag": "LOW"
      },
      "cortisolPM": {
            "value": 2.2,
            "unit": "nmol/L",
            "referenceRange": "3.0 - 8.0",
            "flag": "LOW"
      },
      "cortisolNight": {
            "value": 3.6,
            "unit": "nmol/L",
            "referenceRange": "0.5 - 3.0",
            "flag": "HIGH"
      },
      "dheaS": {
            "value": 90.0,
            "unit": "ug/dL",
            "referenceRange": "120 - 360",
            "flag": "LOW"
      },
      "tsh": {
            "value": 5.2,
            "unit": "uIU/mL",
            "referenceRange": "0.45 - 4.50",
            "flag": "HIGH"
      },
      "freeT4": {
            "value": 1.0,
            "unit": "ng/dL",
            "referenceRange": "0.82 - 1.77",
            "flag": "NORMAL"
      },
      "freeT3": {
            "value": 2.0,
            "unit": "pg/mL",
            "referenceRange": "2.0 - 4.4",
            "flag": "NORMAL"
      },
      "reverseT3": {
            "value": 29.0,
            "unit": "ng/dL",
            "referenceRange": "9.2 - 24.1",
            "flag": "HIGH"
      },
      "antiTpoAb": {
            "value": 53.0,
            "unit": "IU/mL",
            "referenceRange": "< 34",
            "flag": "HIGH"
      },
      "antiTgAb": {
            "value": 17.0,
            "unit": "IU/mL",
            "referenceRange": "< 40",
            "flag": "NORMAL"
      },
      "estradiol": {
            "value": 177.0,
            "unit": "pg/mL",
            "referenceRange": "40 - 400",
            "flag": "NORMAL"
      },
      "progesterone": {
            "value": 1.2,
            "unit": "ng/mL",
            "referenceRange": "1.8 - 24.0",
            "flag": "LOW"
      },
      "testosterone": {
            "value": 19.0,
            "unit": "ng/dL",
            "referenceRange": "15 - 70",
            "flag": "NORMAL"
      },
      "shbg": {
            "value": 70.0,
            "unit": "nmol/L",
            "referenceRange": "18 - 114",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-06-ALLERGY_FOOD_SENSITIVITY',
    reportId: 'demo-report-06',
    panelType: 'ALLERGY_FOOD_SENSITIVITY',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "igeTotal": {
            "value": 198.0,
            "unit": "IU/mL",
            "referenceRange": "< 100",
            "flag": "HIGH"
      },
      "dustMite": {
            "value": 3.4,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "HIGH"
      },
      "catDander": {
            "value": 0.5,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "HIGH"
      },
      "cockroach": {
            "value": 1.2,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "HIGH"
      },
      "mold": {
            "value": 0.4,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "HIGH"
      },
      "pollen": {
            "value": 0.3,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "foodSensitivities": [
            {
                  "food": "鮭魚",
                  "igG": 6.3,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "白米",
                  "igG": 7.8,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            }
      ]
},
  },
  {
    id: 'demo-panel-06-GI_HEALTH',
    reportId: 'demo-report-06',
    panelType: 'GI_HEALTH',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "zonulin": {
            "value": 152.0,
            "unit": "ng/mL",
            "referenceRange": "< 107",
            "flag": "HIGH"
      },
      "sIgA": {
            "value": 244.0,
            "unit": "ug/mL",
            "referenceRange": "400 - 880",
            "flag": "LOW"
      },
      "calprotectin": {
            "value": 104.0,
            "unit": "ug/g",
            "referenceRange": "< 50",
            "flag": "HIGH"
      },
      "pancreaticElastase": {
            "value": 363.0,
            "unit": "ug/g",
            "referenceRange": "> 200",
            "flag": "NORMAL"
      },
      "butyrate": {
            "value": 5.5,
            "unit": "umol/g",
            "referenceRange": "10.0 - 25.0",
            "flag": "LOW"
      },
      "propionate": {
            "value": 11.2,
            "unit": "umol/g",
            "referenceRange": "10.0 - 20.0",
            "flag": "NORMAL"
      },
      "betaGlucuronidase": {
            "value": 3178.0,
            "unit": "U/g",
            "referenceRange": "< 2000",
            "flag": "HIGH"
      }
},
  },
  {
    id: 'demo-panel-06-ORGANIC_ACIDS',
    reportId: 'demo-report-06',
    panelType: 'ORGANIC_ACIDS',
    flagged: false,
    rawText: '',
    createdAt: new Date(),
    values: {},
  },
  {
    id: 'demo-panel-06-TOXIC_ELEMENTS',
    reportId: 'demo-report-06',
    panelType: 'TOXIC_ELEMENTS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mercuryBlood": {
            "value": 7.7,
            "unit": "ug/L",
            "referenceRange": "< 5.0",
            "flag": "HIGH"
      },
      "lead": {
            "value": 3.7,
            "unit": "ug/dL",
            "referenceRange": "< 3.5",
            "flag": "HIGH"
      },
      "arsenic": {
            "value": 33.0,
            "unit": "ug/L",
            "referenceRange": "< 35",
            "flag": "NORMAL"
      },
      "cadmium": {
            "value": 0.5,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "NORMAL"
      },
      "aluminum": {
            "value": 21.0,
            "unit": "ug/L",
            "referenceRange": "< 30",
            "flag": "NORMAL"
      },
      "zinc": {
            "value": 51.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 120",
            "flag": "LOW"
      },
      "selenium": {
            "value": 77.0,
            "unit": "ug/L",
            "referenceRange": "70 - 150",
            "flag": "NORMAL"
      },
      "magnesiumRbc": {
            "value": 3.2,
            "unit": "mg/dL",
            "referenceRange": "4.2 - 6.8",
            "flag": "LOW"
      },
      "copper": {
            "value": 159.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 140",
            "flag": "HIGH"
      },
      "ferritin": {
            "value": 12.0,
            "unit": "ng/mL",
            "referenceRange": "20 - 200",
            "flag": "LOW"
      },
      "iodine": {
            "value": 44.0,
            "unit": "ug/L",
            "referenceRange": "100 - 300",
            "flag": "LOW"
      },
      "mehp": {
            "value": 19.3,
            "unit": "ug/L",
            "referenceRange": "< 10.0",
            "flag": "HIGH"
      },
      "bpa": {
            "value": 5.6,
            "unit": "ug/L",
            "referenceRange": "< 2.0",
            "flag": "HIGH"
      },
      "nonylphenol": {
            "value": 3.7,
            "unit": "ug/L",
            "referenceRange": "< 2.5",
            "flag": "HIGH"
      },
      "glyphosate": {
            "value": 1.2,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "HIGH"
      }
},
  },
  {
    id: 'demo-panel-06-OXIDATIVE_STRESS',
    reportId: 'demo-report-06',
    panelType: 'OXIDATIVE_STRESS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mda": {
            "value": 4.6,
            "unit": "umol/L",
            "referenceRange": "0.8 - 2.5",
            "flag": "HIGH"
      },
      "proteinCarbonyls": {
            "value": 1.3,
            "unit": "nmol/mg",
            "referenceRange": "0.4 - 1.0",
            "flag": "HIGH"
      },
      "gsh": {
            "value": 520.0,
            "unit": "umol/L",
            "referenceRange": "800 - 1200",
            "flag": "LOW"
      },
      "gssg": {
            "value": 200.0,
            "unit": "umol/L",
            "referenceRange": "< 150",
            "flag": "HIGH"
      },
      "sod": {
            "value": 917.0,
            "unit": "U/gHb",
            "referenceRange": "1100 - 1800",
            "flag": "LOW"
      },
      "gpx": {
            "value": 21.0,
            "unit": "U/gHb",
            "referenceRange": "30 - 55",
            "flag": "LOW"
      },
      "catalase": {
            "value": 158.0,
            "unit": "kU/gHb",
            "referenceRange": "150 - 350",
            "flag": "NORMAL"
      },
      "coq10": {
            "value": 0.3,
            "unit": "ug/mL",
            "referenceRange": "0.50 - 1.50",
            "flag": "LOW"
      },
      "vitaminC": {
            "value": 0.2,
            "unit": "mg/dL",
            "referenceRange": "0.60 - 2.00",
            "flag": "LOW"
      },
      "vitaminE": {
            "value": 8.7,
            "unit": "mg/L",
            "referenceRange": "5.5 - 17.0",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-07-HORMONE',
    reportId: 'demo-report-07',
    panelType: 'HORMONE',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "cortisolAM": {
            "value": 12.0,
            "unit": "nmol/L",
            "referenceRange": "13.0 - 24.0",
            "flag": "LOW"
      },
      "cortisolNoon": {
            "value": 5.3,
            "unit": "nmol/L",
            "referenceRange": "5.0 - 10.0",
            "flag": "NORMAL"
      },
      "cortisolPM": {
            "value": 3.6,
            "unit": "nmol/L",
            "referenceRange": "3.0 - 8.0",
            "flag": "NORMAL"
      },
      "cortisolNight": {
            "value": 1.5,
            "unit": "nmol/L",
            "referenceRange": "0.5 - 3.0",
            "flag": "NORMAL"
      },
      "dheaS": {
            "value": 111.0,
            "unit": "ug/dL",
            "referenceRange": "120 - 360",
            "flag": "LOW"
      },
      "tsh": {
            "value": 2.6,
            "unit": "uIU/mL",
            "referenceRange": "0.45 - 4.50",
            "flag": "NORMAL"
      },
      "freeT4": {
            "value": 1.2,
            "unit": "ng/dL",
            "referenceRange": "0.82 - 1.77",
            "flag": "NORMAL"
      },
      "freeT3": {
            "value": 3.1,
            "unit": "pg/mL",
            "referenceRange": "2.0 - 4.4",
            "flag": "NORMAL"
      },
      "reverseT3": {
            "value": 16.0,
            "unit": "ng/dL",
            "referenceRange": "9.2 - 24.1",
            "flag": "NORMAL"
      },
      "antiTpoAb": {
            "value": 10.0,
            "unit": "IU/mL",
            "referenceRange": "< 34",
            "flag": "NORMAL"
      },
      "antiTgAb": {
            "value": 8.0,
            "unit": "IU/mL",
            "referenceRange": "< 40",
            "flag": "NORMAL"
      },
      "estradiol": {
            "value": 24.0,
            "unit": "pg/mL",
            "referenceRange": "10 - 40",
            "flag": "NORMAL"
      },
      "testosterone": {
            "value": 429.0,
            "unit": "ng/dL",
            "referenceRange": "300 - 1000",
            "flag": "NORMAL"
      },
      "shbg": {
            "value": 41.0,
            "unit": "nmol/L",
            "referenceRange": "18 - 54",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-07-ALLERGY_FOOD_SENSITIVITY',
    reportId: 'demo-report-07',
    panelType: 'ALLERGY_FOOD_SENSITIVITY',
    flagged: false,
    rawText: '',
    createdAt: new Date(),
    values: {
      "igeTotal": {
            "value": 79.0,
            "unit": "IU/mL",
            "referenceRange": "< 100",
            "flag": "NORMAL"
      },
      "dustMite": {
            "value": 0.3,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "catDander": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "cockroach": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "mold": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "pollen": {
            "value": 0.2,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "foodSensitivities": [
            {
                  "food": "鮭魚",
                  "igG": 8.4,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "白米",
                  "igG": 10.8,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            }
      ]
},
  },
  {
    id: 'demo-panel-07-GI_HEALTH',
    reportId: 'demo-report-07',
    panelType: 'GI_HEALTH',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "zonulin": {
            "value": 176.0,
            "unit": "ng/mL",
            "referenceRange": "< 107",
            "flag": "HIGH"
      },
      "sIgA": {
            "value": 183.0,
            "unit": "ug/mL",
            "referenceRange": "400 - 880",
            "flag": "LOW"
      },
      "calprotectin": {
            "value": 150.0,
            "unit": "ug/g",
            "referenceRange": "< 50",
            "flag": "HIGH"
      },
      "pancreaticElastase": {
            "value": 423.0,
            "unit": "ug/g",
            "referenceRange": "> 200",
            "flag": "NORMAL"
      },
      "butyrate": {
            "value": 4.7,
            "unit": "umol/g",
            "referenceRange": "10.0 - 25.0",
            "flag": "LOW"
      },
      "propionate": {
            "value": 9.7,
            "unit": "umol/g",
            "referenceRange": "10.0 - 20.0",
            "flag": "LOW"
      },
      "betaGlucuronidase": {
            "value": 3776.0,
            "unit": "U/g",
            "referenceRange": "< 2000",
            "flag": "HIGH"
      }
},
  },
  {
    id: 'demo-panel-07-ORGANIC_ACIDS',
    reportId: 'demo-report-07',
    panelType: 'ORGANIC_ACIDS',
    flagged: false,
    rawText: '',
    createdAt: new Date(),
    values: {},
  },
  {
    id: 'demo-panel-07-TOXIC_ELEMENTS',
    reportId: 'demo-report-07',
    panelType: 'TOXIC_ELEMENTS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mercuryBlood": {
            "value": 5.4,
            "unit": "ug/L",
            "referenceRange": "< 5.0",
            "flag": "HIGH"
      },
      "lead": {
            "value": 3.9,
            "unit": "ug/dL",
            "referenceRange": "< 3.5",
            "flag": "HIGH"
      },
      "arsenic": {
            "value": 36.0,
            "unit": "ug/L",
            "referenceRange": "< 35",
            "flag": "HIGH"
      },
      "cadmium": {
            "value": 0.6,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "NORMAL"
      },
      "aluminum": {
            "value": 24.0,
            "unit": "ug/L",
            "referenceRange": "< 30",
            "flag": "NORMAL"
      },
      "zinc": {
            "value": 59.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 120",
            "flag": "LOW"
      },
      "selenium": {
            "value": 78.0,
            "unit": "ug/L",
            "referenceRange": "70 - 150",
            "flag": "NORMAL"
      },
      "magnesiumRbc": {
            "value": 3.6,
            "unit": "mg/dL",
            "referenceRange": "4.2 - 6.8",
            "flag": "LOW"
      },
      "copper": {
            "value": 142.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 140",
            "flag": "HIGH"
      },
      "ferritin": {
            "value": 18.0,
            "unit": "ng/mL",
            "referenceRange": "20 - 200",
            "flag": "LOW"
      },
      "iodine": {
            "value": 56.0,
            "unit": "ug/L",
            "referenceRange": "100 - 300",
            "flag": "LOW"
      },
      "mehp": {
            "value": 13.1,
            "unit": "ug/L",
            "referenceRange": "< 10.0",
            "flag": "HIGH"
      },
      "bpa": {
            "value": 3.7,
            "unit": "ug/L",
            "referenceRange": "< 2.0",
            "flag": "HIGH"
      },
      "nonylphenol": {
            "value": 2.5,
            "unit": "ug/L",
            "referenceRange": "< 2.5",
            "flag": "NORMAL"
      },
      "glyphosate": {
            "value": 0.6,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-07-OXIDATIVE_STRESS',
    reportId: 'demo-report-07',
    panelType: 'OXIDATIVE_STRESS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mda": {
            "value": 3.1,
            "unit": "umol/L",
            "referenceRange": "0.8 - 2.5",
            "flag": "HIGH"
      },
      "proteinCarbonyls": {
            "value": 1.0,
            "unit": "nmol/mg",
            "referenceRange": "0.4 - 1.0",
            "flag": "NORMAL"
      },
      "gsh": {
            "value": 619.0,
            "unit": "umol/L",
            "referenceRange": "800 - 1200",
            "flag": "LOW"
      },
      "gssg": {
            "value": 164.0,
            "unit": "umol/L",
            "referenceRange": "< 150",
            "flag": "HIGH"
      },
      "sod": {
            "value": 1076.0,
            "unit": "U/gHb",
            "referenceRange": "1100 - 1800",
            "flag": "LOW"
      },
      "gpx": {
            "value": 30.0,
            "unit": "U/gHb",
            "referenceRange": "30 - 55",
            "flag": "NORMAL"
      },
      "catalase": {
            "value": 185.0,
            "unit": "kU/gHb",
            "referenceRange": "150 - 350",
            "flag": "NORMAL"
      },
      "coq10": {
            "value": 0.4,
            "unit": "ug/mL",
            "referenceRange": "0.50 - 1.50",
            "flag": "LOW"
      },
      "vitaminC": {
            "value": 0.4,
            "unit": "mg/dL",
            "referenceRange": "0.60 - 2.00",
            "flag": "LOW"
      },
      "vitaminE": {
            "value": 7.1,
            "unit": "mg/L",
            "referenceRange": "5.5 - 17.0",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-08-HORMONE',
    reportId: 'demo-report-08',
    panelType: 'HORMONE',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "cortisolAM": {
            "value": 18.6,
            "unit": "nmol/L",
            "referenceRange": "13.0 - 24.0",
            "flag": "NORMAL"
      },
      "cortisolNoon": {
            "value": 8.1,
            "unit": "nmol/L",
            "referenceRange": "5.0 - 10.0",
            "flag": "NORMAL"
      },
      "cortisolPM": {
            "value": 4.3,
            "unit": "nmol/L",
            "referenceRange": "3.0 - 8.0",
            "flag": "NORMAL"
      },
      "cortisolNight": {
            "value": 2.0,
            "unit": "nmol/L",
            "referenceRange": "0.5 - 3.0",
            "flag": "NORMAL"
      },
      "dheaS": {
            "value": 156.0,
            "unit": "ug/dL",
            "referenceRange": "120 - 360",
            "flag": "NORMAL"
      },
      "tsh": {
            "value": 3.5,
            "unit": "uIU/mL",
            "referenceRange": "0.45 - 4.50",
            "flag": "NORMAL"
      },
      "freeT4": {
            "value": 1.1,
            "unit": "ng/dL",
            "referenceRange": "0.82 - 1.77",
            "flag": "NORMAL"
      },
      "freeT3": {
            "value": 2.7,
            "unit": "pg/mL",
            "referenceRange": "2.0 - 4.4",
            "flag": "NORMAL"
      },
      "reverseT3": {
            "value": 18.0,
            "unit": "ng/dL",
            "referenceRange": "9.2 - 24.1",
            "flag": "NORMAL"
      },
      "antiTpoAb": {
            "value": 41.0,
            "unit": "IU/mL",
            "referenceRange": "< 34",
            "flag": "HIGH"
      },
      "antiTgAb": {
            "value": 20.0,
            "unit": "IU/mL",
            "referenceRange": "< 40",
            "flag": "NORMAL"
      },
      "estradiol": {
            "value": 207.0,
            "unit": "pg/mL",
            "referenceRange": "40 - 400",
            "flag": "NORMAL"
      },
      "progesterone": {
            "value": 0.6,
            "unit": "ng/mL",
            "referenceRange": "1.8 - 24.0",
            "flag": "LOW"
      },
      "testosterone": {
            "value": 27.0,
            "unit": "ng/dL",
            "referenceRange": "15 - 70",
            "flag": "NORMAL"
      },
      "shbg": {
            "value": 78.0,
            "unit": "nmol/L",
            "referenceRange": "18 - 114",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-08-ALLERGY_FOOD_SENSITIVITY',
    reportId: 'demo-report-08',
    panelType: 'ALLERGY_FOOD_SENSITIVITY',
    flagged: false,
    rawText: '',
    createdAt: new Date(),
    values: {
      "igeTotal": {
            "value": 70.0,
            "unit": "IU/mL",
            "referenceRange": "< 100",
            "flag": "NORMAL"
      },
      "dustMite": {
            "value": 0.3,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "catDander": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "cockroach": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "mold": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "pollen": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "foodSensitivities": [
            {
                  "food": "花生",
                  "igG": 8.4,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "杏仁",
                  "igG": 5.2,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "鮭魚",
                  "igG": 4.1,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "白米",
                  "igG": 6.3,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "咖啡因",
                  "igG": 10.0,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            }
      ]
},
  },
  {
    id: 'demo-panel-08-GI_HEALTH',
    reportId: 'demo-report-08',
    panelType: 'GI_HEALTH',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "zonulin": {
            "value": 110.0,
            "unit": "ng/mL",
            "referenceRange": "< 107",
            "flag": "HIGH"
      },
      "sIgA": {
            "value": 536.0,
            "unit": "ug/mL",
            "referenceRange": "400 - 880",
            "flag": "NORMAL"
      },
      "calprotectin": {
            "value": 36.0,
            "unit": "ug/g",
            "referenceRange": "< 50",
            "flag": "NORMAL"
      },
      "pancreaticElastase": {
            "value": 438.0,
            "unit": "ug/g",
            "referenceRange": "> 200",
            "flag": "NORMAL"
      },
      "butyrate": {
            "value": 11.1,
            "unit": "umol/g",
            "referenceRange": "10.0 - 25.0",
            "flag": "NORMAL"
      },
      "propionate": {
            "value": 15.5,
            "unit": "umol/g",
            "referenceRange": "10.0 - 20.0",
            "flag": "NORMAL"
      },
      "betaGlucuronidase": {
            "value": 1635.0,
            "unit": "U/g",
            "referenceRange": "< 2000",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-08-ORGANIC_ACIDS',
    reportId: 'demo-report-08',
    panelType: 'ORGANIC_ACIDS',
    flagged: false,
    rawText: '',
    createdAt: new Date(),
    values: {},
  },
  {
    id: 'demo-panel-08-TOXIC_ELEMENTS',
    reportId: 'demo-report-08',
    panelType: 'TOXIC_ELEMENTS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mercuryBlood": {
            "value": 7.4,
            "unit": "ug/L",
            "referenceRange": "< 5.0",
            "flag": "HIGH"
      },
      "lead": {
            "value": 2.4,
            "unit": "ug/dL",
            "referenceRange": "< 3.5",
            "flag": "NORMAL"
      },
      "arsenic": {
            "value": 24.0,
            "unit": "ug/L",
            "referenceRange": "< 35",
            "flag": "NORMAL"
      },
      "cadmium": {
            "value": 0.4,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "NORMAL"
      },
      "aluminum": {
            "value": 15.0,
            "unit": "ug/L",
            "referenceRange": "< 30",
            "flag": "NORMAL"
      },
      "zinc": {
            "value": 55.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 120",
            "flag": "LOW"
      },
      "selenium": {
            "value": 80.0,
            "unit": "ug/L",
            "referenceRange": "70 - 150",
            "flag": "NORMAL"
      },
      "magnesiumRbc": {
            "value": 3.5,
            "unit": "mg/dL",
            "referenceRange": "4.2 - 6.8",
            "flag": "LOW"
      },
      "copper": {
            "value": 142.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 140",
            "flag": "HIGH"
      },
      "ferritin": {
            "value": 14.0,
            "unit": "ng/mL",
            "referenceRange": "20 - 200",
            "flag": "LOW"
      },
      "iodine": {
            "value": 47.0,
            "unit": "ug/L",
            "referenceRange": "100 - 300",
            "flag": "LOW"
      },
      "mehp": {
            "value": 24.4,
            "unit": "ug/L",
            "referenceRange": "< 10.0",
            "flag": "HIGH"
      },
      "bpa": {
            "value": 7.8,
            "unit": "ug/L",
            "referenceRange": "< 2.0",
            "flag": "HIGH"
      },
      "nonylphenol": {
            "value": 5.3,
            "unit": "ug/L",
            "referenceRange": "< 2.5",
            "flag": "HIGH"
      },
      "glyphosate": {
            "value": 1.8,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "HIGH"
      }
},
  },
  {
    id: 'demo-panel-08-OXIDATIVE_STRESS',
    reportId: 'demo-report-08',
    panelType: 'OXIDATIVE_STRESS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mda": {
            "value": 2.7,
            "unit": "umol/L",
            "referenceRange": "0.8 - 2.5",
            "flag": "HIGH"
      },
      "proteinCarbonyls": {
            "value": 0.8,
            "unit": "nmol/mg",
            "referenceRange": "0.4 - 1.0",
            "flag": "NORMAL"
      },
      "gsh": {
            "value": 735.0,
            "unit": "umol/L",
            "referenceRange": "800 - 1200",
            "flag": "LOW"
      },
      "gssg": {
            "value": 155.0,
            "unit": "umol/L",
            "referenceRange": "< 150",
            "flag": "HIGH"
      },
      "sod": {
            "value": 1084.0,
            "unit": "U/gHb",
            "referenceRange": "1100 - 1800",
            "flag": "LOW"
      },
      "gpx": {
            "value": 30.0,
            "unit": "U/gHb",
            "referenceRange": "30 - 55",
            "flag": "NORMAL"
      },
      "catalase": {
            "value": 190.0,
            "unit": "kU/gHb",
            "referenceRange": "150 - 350",
            "flag": "NORMAL"
      },
      "coq10": {
            "value": 0.4,
            "unit": "ug/mL",
            "referenceRange": "0.50 - 1.50",
            "flag": "LOW"
      },
      "vitaminC": {
            "value": 0.5,
            "unit": "mg/dL",
            "referenceRange": "0.60 - 2.00",
            "flag": "LOW"
      },
      "vitaminE": {
            "value": 8.2,
            "unit": "mg/L",
            "referenceRange": "5.5 - 17.0",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-09-HORMONE',
    reportId: 'demo-report-09',
    panelType: 'HORMONE',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "cortisolAM": {
            "value": 26.3,
            "unit": "nmol/L",
            "referenceRange": "13.0 - 24.0",
            "flag": "HIGH"
      },
      "cortisolNoon": {
            "value": 14.2,
            "unit": "nmol/L",
            "referenceRange": "5.0 - 10.0",
            "flag": "HIGH"
      },
      "cortisolPM": {
            "value": 11.1,
            "unit": "nmol/L",
            "referenceRange": "3.0 - 8.0",
            "flag": "HIGH"
      },
      "cortisolNight": {
            "value": 4.7,
            "unit": "nmol/L",
            "referenceRange": "0.5 - 3.0",
            "flag": "HIGH"
      },
      "dheaS": {
            "value": 115.0,
            "unit": "ug/dL",
            "referenceRange": "120 - 360",
            "flag": "LOW"
      },
      "tsh": {
            "value": 2.4,
            "unit": "uIU/mL",
            "referenceRange": "0.45 - 4.50",
            "flag": "NORMAL"
      },
      "freeT4": {
            "value": 1.2,
            "unit": "ng/dL",
            "referenceRange": "0.82 - 1.77",
            "flag": "NORMAL"
      },
      "freeT3": {
            "value": 3.1,
            "unit": "pg/mL",
            "referenceRange": "2.0 - 4.4",
            "flag": "NORMAL"
      },
      "reverseT3": {
            "value": 17.0,
            "unit": "ng/dL",
            "referenceRange": "9.2 - 24.1",
            "flag": "NORMAL"
      },
      "antiTpoAb": {
            "value": 10.0,
            "unit": "IU/mL",
            "referenceRange": "< 34",
            "flag": "NORMAL"
      },
      "antiTgAb": {
            "value": 8.0,
            "unit": "IU/mL",
            "referenceRange": "< 40",
            "flag": "NORMAL"
      },
      "estradiol": {
            "value": 37.0,
            "unit": "pg/mL",
            "referenceRange": "10 - 40",
            "flag": "NORMAL"
      },
      "testosterone": {
            "value": 270.0,
            "unit": "ng/dL",
            "referenceRange": "300 - 1000",
            "flag": "LOW"
      },
      "shbg": {
            "value": 40.0,
            "unit": "nmol/L",
            "referenceRange": "18 - 54",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-09-ALLERGY_FOOD_SENSITIVITY',
    reportId: 'demo-report-09',
    panelType: 'ALLERGY_FOOD_SENSITIVITY',
    flagged: false,
    rawText: '',
    createdAt: new Date(),
    values: {
      "igeTotal": {
            "value": 72.0,
            "unit": "IU/mL",
            "referenceRange": "< 100",
            "flag": "NORMAL"
      },
      "dustMite": {
            "value": 0.2,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "catDander": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "cockroach": {
            "value": 0.2,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "mold": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "pollen": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "foodSensitivities": [
            {
                  "food": "花生",
                  "igG": 10.6,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "杏仁",
                  "igG": 6.3,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "鮭魚",
                  "igG": 5.0,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "白米",
                  "igG": 3.8,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            }
      ]
},
  },
  {
    id: 'demo-panel-09-GI_HEALTH',
    reportId: 'demo-report-09',
    panelType: 'GI_HEALTH',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "zonulin": {
            "value": 122.0,
            "unit": "ng/mL",
            "referenceRange": "< 107",
            "flag": "HIGH"
      },
      "sIgA": {
            "value": 386.0,
            "unit": "ug/mL",
            "referenceRange": "400 - 880",
            "flag": "LOW"
      },
      "calprotectin": {
            "value": 69.0,
            "unit": "ug/g",
            "referenceRange": "< 50",
            "flag": "HIGH"
      },
      "pancreaticElastase": {
            "value": 374.0,
            "unit": "ug/g",
            "referenceRange": "> 200",
            "flag": "NORMAL"
      },
      "butyrate": {
            "value": 8.5,
            "unit": "umol/g",
            "referenceRange": "10.0 - 25.0",
            "flag": "LOW"
      },
      "propionate": {
            "value": 12.9,
            "unit": "umol/g",
            "referenceRange": "10.0 - 20.0",
            "flag": "NORMAL"
      },
      "betaGlucuronidase": {
            "value": 2986.0,
            "unit": "U/g",
            "referenceRange": "< 2000",
            "flag": "HIGH"
      }
},
  },
  {
    id: 'demo-panel-09-ORGANIC_ACIDS',
    reportId: 'demo-report-09',
    panelType: 'ORGANIC_ACIDS',
    flagged: false,
    rawText: '',
    createdAt: new Date(),
    values: {},
  },
  {
    id: 'demo-panel-09-TOXIC_ELEMENTS',
    reportId: 'demo-report-09',
    panelType: 'TOXIC_ELEMENTS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mercuryBlood": {
            "value": 5.4,
            "unit": "ug/L",
            "referenceRange": "< 5.0",
            "flag": "HIGH"
      },
      "lead": {
            "value": 5.8,
            "unit": "ug/dL",
            "referenceRange": "< 3.5",
            "flag": "HIGH"
      },
      "arsenic": {
            "value": 40.0,
            "unit": "ug/L",
            "referenceRange": "< 35",
            "flag": "HIGH"
      },
      "cadmium": {
            "value": 0.8,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "NORMAL"
      },
      "aluminum": {
            "value": 28.0,
            "unit": "ug/L",
            "referenceRange": "< 30",
            "flag": "NORMAL"
      },
      "zinc": {
            "value": 60.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 120",
            "flag": "LOW"
      },
      "selenium": {
            "value": 78.0,
            "unit": "ug/L",
            "referenceRange": "70 - 150",
            "flag": "NORMAL"
      },
      "magnesiumRbc": {
            "value": 3.2,
            "unit": "mg/dL",
            "referenceRange": "4.2 - 6.8",
            "flag": "LOW"
      },
      "copper": {
            "value": 170.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 140",
            "flag": "HIGH"
      },
      "ferritin": {
            "value": 10.0,
            "unit": "ng/mL",
            "referenceRange": "20 - 200",
            "flag": "LOW"
      },
      "iodine": {
            "value": 54.0,
            "unit": "ug/L",
            "referenceRange": "100 - 300",
            "flag": "LOW"
      },
      "mehp": {
            "value": 18.3,
            "unit": "ug/L",
            "referenceRange": "< 10.0",
            "flag": "HIGH"
      },
      "bpa": {
            "value": 5.3,
            "unit": "ug/L",
            "referenceRange": "< 2.0",
            "flag": "HIGH"
      },
      "nonylphenol": {
            "value": 3.1,
            "unit": "ug/L",
            "referenceRange": "< 2.5",
            "flag": "HIGH"
      },
      "glyphosate": {
            "value": 0.8,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-09-OXIDATIVE_STRESS',
    reportId: 'demo-report-09',
    panelType: 'OXIDATIVE_STRESS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mda": {
            "value": 4.6,
            "unit": "umol/L",
            "referenceRange": "0.8 - 2.5",
            "flag": "HIGH"
      },
      "proteinCarbonyls": {
            "value": 1.4,
            "unit": "nmol/mg",
            "referenceRange": "0.4 - 1.0",
            "flag": "HIGH"
      },
      "gsh": {
            "value": 585.0,
            "unit": "umol/L",
            "referenceRange": "800 - 1200",
            "flag": "LOW"
      },
      "gssg": {
            "value": 185.0,
            "unit": "umol/L",
            "referenceRange": "< 150",
            "flag": "HIGH"
      },
      "sod": {
            "value": 1024.0,
            "unit": "U/gHb",
            "referenceRange": "1100 - 1800",
            "flag": "LOW"
      },
      "gpx": {
            "value": 27.0,
            "unit": "U/gHb",
            "referenceRange": "30 - 55",
            "flag": "LOW"
      },
      "catalase": {
            "value": 170.0,
            "unit": "kU/gHb",
            "referenceRange": "150 - 350",
            "flag": "NORMAL"
      },
      "coq10": {
            "value": 0.4,
            "unit": "ug/mL",
            "referenceRange": "0.50 - 1.50",
            "flag": "LOW"
      },
      "vitaminC": {
            "value": 0.3,
            "unit": "mg/dL",
            "referenceRange": "0.60 - 2.00",
            "flag": "LOW"
      },
      "vitaminE": {
            "value": 7.8,
            "unit": "mg/L",
            "referenceRange": "5.5 - 17.0",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-10-HORMONE',
    reportId: 'demo-report-10',
    panelType: 'HORMONE',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "cortisolAM": {
            "value": 29.3,
            "unit": "nmol/L",
            "referenceRange": "13.0 - 24.0",
            "flag": "HIGH"
      },
      "cortisolNoon": {
            "value": 11.6,
            "unit": "nmol/L",
            "referenceRange": "5.0 - 10.0",
            "flag": "HIGH"
      },
      "cortisolPM": {
            "value": 8.3,
            "unit": "nmol/L",
            "referenceRange": "3.0 - 8.0",
            "flag": "HIGH"
      },
      "cortisolNight": {
            "value": 5.2,
            "unit": "nmol/L",
            "referenceRange": "0.5 - 3.0",
            "flag": "HIGH"
      },
      "dheaS": {
            "value": 132.0,
            "unit": "ug/dL",
            "referenceRange": "120 - 360",
            "flag": "NORMAL"
      },
      "tsh": {
            "value": 2.5,
            "unit": "uIU/mL",
            "referenceRange": "0.45 - 4.50",
            "flag": "NORMAL"
      },
      "freeT4": {
            "value": 1.2,
            "unit": "ng/dL",
            "referenceRange": "0.82 - 1.77",
            "flag": "NORMAL"
      },
      "freeT3": {
            "value": 3.0,
            "unit": "pg/mL",
            "referenceRange": "2.0 - 4.4",
            "flag": "NORMAL"
      },
      "reverseT3": {
            "value": 16.0,
            "unit": "ng/dL",
            "referenceRange": "9.2 - 24.1",
            "flag": "NORMAL"
      },
      "antiTpoAb": {
            "value": 10.0,
            "unit": "IU/mL",
            "referenceRange": "< 34",
            "flag": "NORMAL"
      },
      "antiTgAb": {
            "value": 8.0,
            "unit": "IU/mL",
            "referenceRange": "< 40",
            "flag": "NORMAL"
      },
      "estradiol": {
            "value": 178.0,
            "unit": "pg/mL",
            "referenceRange": "40 - 400",
            "flag": "NORMAL"
      },
      "progesterone": {
            "value": 1.5,
            "unit": "ng/mL",
            "referenceRange": "1.8 - 24.0",
            "flag": "LOW"
      },
      "testosterone": {
            "value": 28.0,
            "unit": "ng/dL",
            "referenceRange": "15 - 70",
            "flag": "NORMAL"
      },
      "shbg": {
            "value": 66.0,
            "unit": "nmol/L",
            "referenceRange": "18 - 114",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-10-ALLERGY_FOOD_SENSITIVITY',
    reportId: 'demo-report-10',
    panelType: 'ALLERGY_FOOD_SENSITIVITY',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "igeTotal": {
            "value": 218.0,
            "unit": "IU/mL",
            "referenceRange": "< 100",
            "flag": "HIGH"
      },
      "dustMite": {
            "value": 2.7,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "HIGH"
      },
      "catDander": {
            "value": 0.1,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "NORMAL"
      },
      "cockroach": {
            "value": 0.4,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "HIGH"
      },
      "mold": {
            "value": 0.7,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "HIGH"
      },
      "pollen": {
            "value": 1.2,
            "unit": "kU/L",
            "referenceRange": "< 0.35",
            "flag": "HIGH"
      },
      "foodSensitivities": [
            {
                  "food": "花生",
                  "igG": 8.3,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "杏仁",
                  "igG": 5.3,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "鮭魚",
                  "igG": 4.0,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            },
            {
                  "food": "白米",
                  "igG": 6.0,
                  "unit": "U/mL",
                  "level": "Class 0",
                  "severity": "normal"
            }
      ]
},
  },
  {
    id: 'demo-panel-10-GI_HEALTH',
    reportId: 'demo-report-10',
    panelType: 'GI_HEALTH',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "zonulin": {
            "value": 116.0,
            "unit": "ng/mL",
            "referenceRange": "< 107",
            "flag": "HIGH"
      },
      "sIgA": {
            "value": 334.0,
            "unit": "ug/mL",
            "referenceRange": "400 - 880",
            "flag": "LOW"
      },
      "calprotectin": {
            "value": 54.0,
            "unit": "ug/g",
            "referenceRange": "< 50",
            "flag": "HIGH"
      },
      "pancreaticElastase": {
            "value": 385.0,
            "unit": "ug/g",
            "referenceRange": "> 200",
            "flag": "NORMAL"
      },
      "butyrate": {
            "value": 7.6,
            "unit": "umol/g",
            "referenceRange": "10.0 - 25.0",
            "flag": "LOW"
      },
      "propionate": {
            "value": 14.1,
            "unit": "umol/g",
            "referenceRange": "10.0 - 20.0",
            "flag": "NORMAL"
      },
      "betaGlucuronidase": {
            "value": 2073.0,
            "unit": "U/g",
            "referenceRange": "< 2000",
            "flag": "HIGH"
      }
},
  },
  {
    id: 'demo-panel-10-ORGANIC_ACIDS',
    reportId: 'demo-report-10',
    panelType: 'ORGANIC_ACIDS',
    flagged: false,
    rawText: '',
    createdAt: new Date(),
    values: {},
  },
  {
    id: 'demo-panel-10-TOXIC_ELEMENTS',
    reportId: 'demo-report-10',
    panelType: 'TOXIC_ELEMENTS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mercuryBlood": {
            "value": 3.9,
            "unit": "ug/L",
            "referenceRange": "< 5.0",
            "flag": "NORMAL"
      },
      "lead": {
            "value": 2.2,
            "unit": "ug/dL",
            "referenceRange": "< 3.5",
            "flag": "NORMAL"
      },
      "arsenic": {
            "value": 23.0,
            "unit": "ug/L",
            "referenceRange": "< 35",
            "flag": "NORMAL"
      },
      "cadmium": {
            "value": 0.4,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "NORMAL"
      },
      "aluminum": {
            "value": 17.0,
            "unit": "ug/L",
            "referenceRange": "< 30",
            "flag": "NORMAL"
      },
      "zinc": {
            "value": 62.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 120",
            "flag": "LOW"
      },
      "selenium": {
            "value": 86.0,
            "unit": "ug/L",
            "referenceRange": "70 - 150",
            "flag": "NORMAL"
      },
      "magnesiumRbc": {
            "value": 3.9,
            "unit": "mg/dL",
            "referenceRange": "4.2 - 6.8",
            "flag": "LOW"
      },
      "copper": {
            "value": 137.0,
            "unit": "ug/dL",
            "referenceRange": "70 - 140",
            "flag": "NORMAL"
      },
      "ferritin": {
            "value": 21.0,
            "unit": "ng/mL",
            "referenceRange": "20 - 200",
            "flag": "NORMAL"
      },
      "iodine": {
            "value": 56.0,
            "unit": "ug/L",
            "referenceRange": "100 - 300",
            "flag": "LOW"
      },
      "mehp": {
            "value": 12.5,
            "unit": "ug/L",
            "referenceRange": "< 10.0",
            "flag": "HIGH"
      },
      "bpa": {
            "value": 3.5,
            "unit": "ug/L",
            "referenceRange": "< 2.0",
            "flag": "HIGH"
      },
      "nonylphenol": {
            "value": 2.9,
            "unit": "ug/L",
            "referenceRange": "< 2.5",
            "flag": "HIGH"
      },
      "glyphosate": {
            "value": 0.5,
            "unit": "ug/L",
            "referenceRange": "< 1.0",
            "flag": "NORMAL"
      }
},
  },
  {
    id: 'demo-panel-10-OXIDATIVE_STRESS',
    reportId: 'demo-report-10',
    panelType: 'OXIDATIVE_STRESS',
    flagged: true,
    rawText: '',
    createdAt: new Date(),
    values: {
      "mda": {
            "value": 2.8,
            "unit": "umol/L",
            "referenceRange": "0.8 - 2.5",
            "flag": "HIGH"
      },
      "proteinCarbonyls": {
            "value": 0.9,
            "unit": "nmol/mg",
            "referenceRange": "0.4 - 1.0",
            "flag": "NORMAL"
      },
      "gsh": {
            "value": 704.0,
            "unit": "umol/L",
            "referenceRange": "800 - 1200",
            "flag": "LOW"
      },
      "gssg": {
            "value": 159.0,
            "unit": "umol/L",
            "referenceRange": "< 150",
            "flag": "HIGH"
      },
      "sod": {
            "value": 1086.0,
            "unit": "U/gHb",
            "referenceRange": "1100 - 1800",
            "flag": "LOW"
      },
      "gpx": {
            "value": 30.0,
            "unit": "U/gHb",
            "referenceRange": "30 - 55",
            "flag": "NORMAL"
      },
      "catalase": {
            "value": 188.0,
            "unit": "kU/gHb",
            "referenceRange": "150 - 350",
            "flag": "NORMAL"
      },
      "coq10": {
            "value": 0.4,
            "unit": "ug/mL",
            "referenceRange": "0.50 - 1.50",
            "flag": "LOW"
      },
      "vitaminC": {
            "value": 0.5,
            "unit": "mg/dL",
            "referenceRange": "0.60 - 2.00",
            "flag": "LOW"
      },
      "vitaminE": {
            "value": 8.6,
            "unit": "mg/L",
            "referenceRange": "5.5 - 17.0",
            "flag": "NORMAL"
      }
},
  }
]
