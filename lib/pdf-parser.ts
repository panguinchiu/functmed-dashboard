import pdfParse from 'pdf-parse'
import {
  ParsedReportData,
  HormoneValues,
  AllergyValues,
  GutHealthValues,
  OrganicAcidsValues,
  ToxicElementsValues,
  OxidativeStressValues,
  LabValue,
  FoodSensitivityItem,
  Flag,
} from '@/types'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseFlag(flag: string): Flag | undefined {
  const f = flag.trim().toUpperCase()
  if (f === 'H') return 'HIGH'
  if (f === 'L') return 'LOW'
  return undefined
}

function parseNumber(s: string): number | null {
  const n = parseFloat(s.replace(/,/g, ''))
  return isNaN(n) ? null : n
}

/**
 * Parse a typical lab line:
 * "TSH  4.82  uIU/mL  0.45 - 4.50  H"
 * Returns { name, value, unit, referenceRange, flag }
 */
function parseLabLine(line: string): { name: string; lab: LabValue } | null {
  // Match: label ... number ... unit ... ref-range ... optional flag
  const match = line.match(
    /^(.+?)\s+([\d.]+)\s+([^\s]+)\s+([\d.]+ ?[-–] ?[\d.]+|[<>][\s]?[\d.]+)\s*(H|L)?\s*$/
  )
  if (!match) return null

  const [, name, valueStr, unit, referenceRange, flagStr] = match
  const value = parseNumber(valueStr)
  if (value === null) return null

  return {
    name: name.trim(),
    lab: {
      value,
      unit: unit.trim(),
      referenceRange: referenceRange.trim(),
      flag: flagStr ? parseFlag(flagStr) : 'NORMAL',
    },
  }
}

function hasFlaggedValues(obj: Record<string, LabValue | undefined | FoodSensitivityItem[]>): boolean {
  return Object.values(obj).some((v) => {
    if (!v || Array.isArray(v)) return false
    const lv = v as LabValue
    return lv.flag === 'HIGH' || lv.flag === 'LOW' || lv.flag === 'CRITICAL_HIGH' || lv.flag === 'CRITICAL_LOW'
  })
}

// ─── Section splitter ────────────────────────────────────────────────────────

const SECTION_PATTERNS: Record<string, RegExp> = {
  HORMONE: /一[、.]?\s*全套荷爾蒙|Comprehensive Hormone Panel/i,
  ALLERGY_FOOD_SENSITIVITY: /二[、.]?\s*全套過敏原|Allergy.*Food Sensitivity/i,
  GI_HEALTH: /三[、.]?\s*腸道|GI Health/i,
  ORGANIC_ACIDS: /四[、.]?\s*營養代謝|Organic Acids/i,
  TOXIC_ELEMENTS: /五[、.]?\s*重金屬|Toxic Elements/i,
  OXIDATIVE_STRESS: /六[、.]?\s*氧化壓力|Oxidative Stress/i,
}

function splitSections(text: string): Record<string, string> {
  const sections: Record<string, string> = {}
  const entries = Object.entries(SECTION_PATTERNS)

  for (let i = 0; i < entries.length; i++) {
    const [key, pattern] = entries[i]
    const start = text.search(pattern)
    if (start === -1) continue

    let end = text.length
    for (let j = i + 1; j < entries.length; j++) {
      const nextStart = text.search(entries[j][1])
      if (nextStart !== -1 && nextStart > start) {
        end = nextStart
        break
      }
    }
    sections[key] = text.slice(start, end)
  }

  return sections
}

// ─── Panel parsers ────────────────────────────────────────────────────────────

function parseHormoneSection(text: string): HormoneValues {
  const values: HormoneValues = {}

  const lineMap: Record<string, keyof HormoneValues> = {
    '晨間皮質醇': 'cortisolAM',
    '中午皮質醇': 'cortisolNoon',
    '午後皮質醇': 'cortisolPM',
    '夜間皮質醇': 'cortisolNight',
    'DHEA-S': 'dheaS',
    '皮質醇/DHEA': 'cortisolDheasRatio',
    'TSH': 'tsh',
    'Free T4': 'freeT4',
    'Free T3': 'freeT3',
    'Reverse T3': 'reverseT3',
    'Anti-TPO': 'antiTpoAb',
    'Anti-TG': 'antiTgAb',
    'Estradiol': 'estradiol',
    'Progesterone': 'progesterone',
    'Testosterone': 'testosterone',
    'E2/P4': 'e2P4Ratio',
    'SHBG': 'shbg',
  }

  const lines = text.split('\n')
  for (const line of lines) {
    for (const [pattern, key] of Object.entries(lineMap)) {
      if (line.includes(pattern)) {
        const parsed = parseLabLine(line)
        if (parsed) values[key] = parsed.lab
      }
    }
  }

  return values
}

function parseAllergySection(text: string): AllergyValues {
  const values: AllergyValues = {}
  const foodSensitivities: FoodSensitivityItem[] = []

  const igeMap: Record<string, keyof AllergyValues> = {
    'Total IgE': 'igeTotal',
    '塵蟎': 'dustMite',
    '蟑螂': 'cockroach',
    '黴菌': 'mold',
    '花粉': 'pollen',
    '貓皮屑': 'catDander',
  }

  const lines = text.split('\n')
  for (const line of lines) {
    // IgE markers
    for (const [pattern, key] of Object.entries(igeMap)) {
      if (line.includes(pattern)) {
        const parsed = parseLabLine(line)
        if (parsed) values[key] = parsed.lab
      }
    }

    // IgG food sensitivities: "食物 數值 U/mL Class N 描述"
    const igGMatch = line.match(
      /^([^\d]+?)\s+([\d.]+)\s+U\/mL\s+Class\s+(\d)\s+(重度敏感|中度敏感|輕度敏感|正常)/
    )
    if (igGMatch) {
      const [, food, igGStr, classNum, severityZh] = igGMatch
      const severityMap: Record<string, FoodSensitivityItem['severity']> = {
        '重度敏感': 'severe',
        '中度敏感': 'moderate',
        '輕度敏感': 'mild',
        '正常': 'normal',
      }
      foodSensitivities.push({
        food: food.trim(),
        igG: parseFloat(igGStr),
        unit: 'U/mL',
        level: `Class ${classNum}` as FoodSensitivityItem['level'],
        severity: severityMap[severityZh] ?? 'normal',
      })
    }
  }

  if (foodSensitivities.length > 0) values.foodSensitivities = foodSensitivities
  return values
}

function parseGiHealthSection(text: string): GutHealthValues {
  const values: GutHealthValues = {}

  const lineMap: Record<string, keyof GutHealthValues> = {
    'Shannon': 'shannonIndex',
    'Firmicutes': 'firmicutesBacteroidetes',
    'Lactobacillus': 'lactobacillus',
    'Bifidobacterium': 'bifidobacterium',
    'Akkermansia': 'akkermansia',
    'Faecalibacterium': 'faecalibacterium',
    'Zonulin': 'zonulin',
    'sIgA': 'sIgA',
    'Calprotectin': 'calprotectin',
    'Elastase': 'pancreaticElastase',
    '丁酸': 'butyrate',
    '丙酸': 'propionate',
    'Beta-glucuronidase': 'betaGlucuronidase',
  }

  const lines = text.split('\n')
  for (const line of lines) {
    for (const [pattern, key] of Object.entries(lineMap)) {
      if (line.includes(pattern)) {
        const parsed = parseLabLine(line)
        if (parsed) values[key] = parsed.lab
      }
    }
  }

  return values
}

function parseOrganicAcidsSection(text: string): OrganicAcidsValues {
  const values: OrganicAcidsValues = {}

  const lineMap: Record<string, keyof OrganicAcidsValues> = {
    'Citric': 'citricAcid',
    'Succinic': 'succinicAcid',
    'Fumaric': 'fumaricAcid',
    'Malic': 'malicAcid',
    'Pyruvic': 'pyruvicAcid',
    'Lactic': 'lacticAcid',
    'HVA': 'hva',
    'VMA': 'vma',
    '5-HIAA': 'hiaa',
    'Quinolinic': 'quinolinicAcid',
    'Kynurenic': 'kynurenicAcid',
    'Methylmalonic': 'methylmalonicAcid',
    'Xanthurenic': 'xanthurenicAcid',
    'FIGLU': 'figlu',
    'Arabinose': 'arabinose',
    'DHPPA': 'dhppa',
    '4-Cresol': 'cresol',
    'D-Arabinitol': 'dArabinitol',
  }

  const lines = text.split('\n')
  for (const line of lines) {
    for (const [pattern, key] of Object.entries(lineMap)) {
      if (line.includes(pattern)) {
        const parsed = parseLabLine(line)
        if (parsed) values[key] = parsed.lab
      }
    }
  }

  return values
}

function parseToxicElementsSection(text: string): ToxicElementsValues {
  const values: ToxicElementsValues = {}

  const lines = text.split('\n')
  for (const line of lines) {
    if (line.includes('Mercury') || line.includes('汞')) {
      if (line.includes('血液') || line.includes('blood')) {
        const parsed = parseLabLine(line)
        if (parsed) values.mercuryBlood = parsed.lab
      } else if (line.includes('螯合') || line.includes('尿液')) {
        const parsed = parseLabLine(line)
        if (parsed) values.mercuryUrine = parsed.lab
      }
    }

    const lineMap: Record<string, keyof ToxicElementsValues> = {
      'Lead': 'lead', '鉛': 'lead',
      'Arsenic': 'arsenic', '砷': 'arsenic',
      'Cadmium': 'cadmium', '鎘': 'cadmium',
      'Aluminum': 'aluminum', '鋁': 'aluminum',
      'Zinc': 'zinc', '鋅': 'zinc',
      'Selenium': 'selenium', '硒': 'selenium',
      'Magnesium': 'magnesiumRbc', '鎂': 'magnesiumRbc',
      'Copper': 'copper', '銅 ': 'copper',
      'Cu/Zn': 'cuZnRatio', '銅鋅': 'cuZnRatio',
      'Ferritin': 'ferritin', '鐵蛋白': 'ferritin',
      'Iodine': 'iodine', '碘': 'iodine',
      'MEHP': 'mehp',
      'BPA': 'bpa',
      'Nonylphenol': 'nonylphenol', '壬基酚': 'nonylphenol',
      'Glyphosate': 'glyphosate', '嘉磷塞': 'glyphosate',
    }

    for (const [pattern, key] of Object.entries(lineMap)) {
      if (line.includes(pattern) && !values[key]) {
        const parsed = parseLabLine(line)
        if (parsed) values[key] = parsed.lab
      }
    }
  }

  return values
}

function parseOxidativeStressSection(text: string): OxidativeStressValues {
  const values: OxidativeStressValues = {}

  const lineMap: Record<string, keyof OxidativeStressValues> = {
    '8-OHdG': 'ohdg',
    'MDA': 'mda',
    'Isoprostane': 'isoprostanes',
    'Protein Carbonyl': 'proteinCarbonyls',
    'GSH ': 'gsh',
    'GSSG': 'gssg',
    'GSH/GSSG': 'gshGssgRatio',
    'SOD': 'sod',
    'GPx': 'gpx',
    'Catalase': 'catalase',
    'CoQ10': 'coq10',
    'Vitamin C': 'vitaminC',
    'Vitamin E': 'vitaminE',
    'TAC': 'tac',
  }

  const lines = text.split('\n')
  for (const line of lines) {
    for (const [pattern, key] of Object.entries(lineMap)) {
      if (line.includes(pattern)) {
        const parsed = parseLabLine(line)
        if (parsed) values[key] = parsed.lab
      }
    }
  }

  return values
}

// ─── Patient info parser ──────────────────────────────────────────────────────

function parsePatientInfo(text: string): Partial<ParsedReportData> {
  const info: Partial<ParsedReportData> = {}

  const nameMatch = text.match(/姓\s*名\s+([^\n\t]+)/)
  if (nameMatch) info.patientName = nameMatch[1].trim()

  const ageMatch = text.match(/年\s*齡\s+(\d+)\s*歲/)
  if (ageMatch) info.patientAge = ageMatch[1]

  const genderMatch = text.match(/性\s*別\s+(男|女)/)
  if (genderMatch) info.patientGender = genderMatch[1]

  const collectMatch = text.match(/採檢日期\s+([\d-]+)/)
  if (collectMatch) info.collectionDate = collectMatch[1]

  const reportMatch = text.match(/報告日期\s+([\d-]+)/)
  if (reportMatch) info.reportDate = reportMatch[1]

  const doctorMatch = text.match(/送檢醫師\s+([^\n\t]+)/)
  if (doctorMatch) info.referringDoctor = doctorMatch[1].trim()

  return info
}

// ─── Main export ──────────────────────────────────────────────────────────────

export interface ParseResult {
  parsedData: ParsedReportData
  sections: Record<string, string>
  errors: string[]
}

export async function parsePdfReport(buffer: Buffer): Promise<ParseResult> {
  const { text } = await pdfParse(buffer)
  const errors: string[] = []
  const sections = splitSections(text)

  const parsedData: ParsedReportData = {
    ...parsePatientInfo(text),
  }

  const parsers: Record<string, () => void> = {
    HORMONE: () => { parsedData.hormone = parseHormoneSection(sections.HORMONE ?? '') },
    ALLERGY_FOOD_SENSITIVITY: () => { parsedData.allergyFoodSensitivity = parseAllergySection(sections.ALLERGY_FOOD_SENSITIVITY ?? '') },
    GI_HEALTH: () => { parsedData.giHealth = parseGiHealthSection(sections.GI_HEALTH ?? '') },
    ORGANIC_ACIDS: () => { parsedData.organicAcids = parseOrganicAcidsSection(sections.ORGANIC_ACIDS ?? '') },
    TOXIC_ELEMENTS: () => { parsedData.toxicElements = parseToxicElementsSection(sections.TOXIC_ELEMENTS ?? '') },
    OXIDATIVE_STRESS: () => { parsedData.oxidativeStress = parseOxidativeStressSection(sections.OXIDATIVE_STRESS ?? '') },
  }

  for (const [key, parser] of Object.entries(parsers)) {
    try {
      if (!sections[key]) {
        errors.push(`Section not found: ${key}`)
      } else {
        parser()
      }
    } catch (err) {
      errors.push(`Parse error in ${key}: ${String(err)}`)
    }
  }

  return { parsedData, sections, errors }
}

export { hasFlaggedValues }
