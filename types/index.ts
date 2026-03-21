export type Flag = 'HIGH' | 'LOW' | 'CRITICAL_HIGH' | 'CRITICAL_LOW' | 'NORMAL'

export interface LabValue {
  value: number | string
  unit?: string
  referenceRange?: string
  flag?: Flag
}

// ─── Panel-specific value types ───────────────────────────────────────────────

export interface HormoneValues {
  // Adrenal
  cortisolAM?: LabValue
  cortisolNoon?: LabValue
  cortisolPM?: LabValue
  cortisolNight?: LabValue
  dheaS?: LabValue
  cortisolDheasRatio?: LabValue
  // Thyroid
  tsh?: LabValue
  freeT4?: LabValue
  freeT3?: LabValue
  reverseT3?: LabValue
  antiTpoAb?: LabValue
  antiTgAb?: LabValue
  // Sex hormones
  estradiol?: LabValue
  progesterone?: LabValue
  testosterone?: LabValue
  e2P4Ratio?: LabValue
  shbg?: LabValue
  [key: string]: LabValue | undefined
}

export interface FoodSensitivityItem {
  food: string
  igG: number
  unit: string
  level: 'Class 0' | 'Class 1' | 'Class 2' | 'Class 3'
  severity: 'normal' | 'mild' | 'moderate' | 'severe'
}

export interface AllergyValues {
  igeTotal?: LabValue
  dustMite?: LabValue
  cockroach?: LabValue
  mold?: LabValue
  pollen?: LabValue
  catDander?: LabValue
  foodSensitivities?: FoodSensitivityItem[]
  [key: string]: LabValue | FoodSensitivityItem[] | undefined
}

export interface GutHealthValues {
  shannonIndex?: LabValue
  firmicutesBacteroidetes?: LabValue
  lactobacillus?: LabValue
  bifidobacterium?: LabValue
  akkermansia?: LabValue
  faecalibacterium?: LabValue
  zonulin?: LabValue
  sIgA?: LabValue
  calprotectin?: LabValue
  pancreaticElastase?: LabValue
  butyrate?: LabValue
  propionate?: LabValue
  betaGlucuronidase?: LabValue
  [key: string]: LabValue | undefined
}

export interface OrganicAcidsValues {
  // Energy
  citricAcid?: LabValue
  succinicAcid?: LabValue
  fumaricAcid?: LabValue
  malicAcid?: LabValue
  pyruvicAcid?: LabValue
  lacticAcid?: LabValue
  // Neurotransmitters
  hva?: LabValue
  vma?: LabValue
  hiaa?: LabValue
  quinolinicAcid?: LabValue
  kynurenicAcid?: LabValue
  // B vitamins
  methylmalonicAcid?: LabValue
  xanthurenicAcid?: LabValue
  figlu?: LabValue
  // Microbial
  arabinose?: LabValue
  dhppa?: LabValue
  cresol?: LabValue
  dArabinitol?: LabValue
  [key: string]: LabValue | undefined
}

export interface ToxicElementsValues {
  // Heavy metals
  mercuryBlood?: LabValue
  mercuryUrine?: LabValue
  lead?: LabValue
  arsenic?: LabValue
  cadmium?: LabValue
  aluminum?: LabValue
  // Minerals
  zinc?: LabValue
  selenium?: LabValue
  magnesiumRbc?: LabValue
  copper?: LabValue
  cuZnRatio?: LabValue
  ferritin?: LabValue
  iodine?: LabValue
  // Environmental toxins
  mehp?: LabValue
  bpa?: LabValue
  nonylphenol?: LabValue
  glyphosate?: LabValue
  [key: string]: LabValue | undefined
}

export interface OxidativeStressValues {
  ohdg?: LabValue
  mda?: LabValue
  isoprostanes?: LabValue
  proteinCarbonyls?: LabValue
  gsh?: LabValue
  gssg?: LabValue
  gshGssgRatio?: LabValue
  sod?: LabValue
  gpx?: LabValue
  catalase?: LabValue
  coq10?: LabValue
  vitaminC?: LabValue
  vitaminE?: LabValue
  tac?: LabValue
  [key: string]: LabValue | undefined
}

// Full parsed report
export interface ParsedReportData {
  patientName?: string
  patientAge?: string
  patientGender?: string
  collectionDate?: string
  reportDate?: string
  referringDoctor?: string
  hormone?: HormoneValues
  allergyFoodSensitivity?: AllergyValues
  giHealth?: GutHealthValues
  organicAcids?: OrganicAcidsValues
  toxicElements?: ToxicElementsValues
  oxidativeStress?: OxidativeStressValues
}

// Panel display metadata
export const PANEL_META: Record<string, { label: string; labelEn: string; color: string }> = {
  HORMONE: { label: '荷爾蒙', labelEn: 'Hormone', color: 'purple' },
  ALLERGY_FOOD_SENSITIVITY: { label: '過敏/食物敏感', labelEn: 'Allergy & Food Sensitivity', color: 'orange' },
  GI_HEALTH: { label: '腸道健康', labelEn: 'GI Health', color: 'green' },
  ORGANIC_ACIDS: { label: '有機酸', labelEn: 'Organic Acids', color: 'blue' },
  TOXIC_ELEMENTS: { label: '毒素重金屬', labelEn: 'Toxic Elements', color: 'red' },
  OXIDATIVE_STRESS: { label: '氧化壓力', labelEn: 'Oxidative Stress', color: 'yellow' },
}
