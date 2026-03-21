import { LabValue, FoodSensitivityItem, PANEL_META } from '@/types'
import { LabValueRow } from './lab-value-row'

interface PanelViewerProps {
  panelType: string
  values: Record<string, LabValue | FoodSensitivityItem[] | undefined>
  flagged: boolean
}

const LABEL_MAP: Record<string, string> = {
  // Hormone
  cortisolAM: '晨間皮質醇 (7-8AM)',
  cortisolNoon: '中午皮質醇',
  cortisolPM: '午後皮質醇',
  cortisolNight: '夜間皮質醇',
  dheaS: 'DHEA-S',
  cortisolDheasRatio: '皮質醇/DHEA-S 比值',
  tsh: 'TSH',
  freeT4: 'Free T4',
  freeT3: 'Free T3',
  reverseT3: 'Reverse T3',
  antiTpoAb: 'Anti-TPO Ab',
  antiTgAb: 'Anti-TG Ab',
  estradiol: 'Estradiol (E2)',
  progesterone: 'Progesterone',
  testosterone: 'Testosterone',
  e2P4Ratio: 'E2/P4 比值',
  shbg: 'SHBG',
  // Allergy
  igeTotal: 'Total IgE',
  dustMite: '塵蟎',
  cockroach: '蟑螂',
  mold: '黴菌',
  pollen: '花粉',
  catDander: '貓皮屑',
  // GI Health
  shannonIndex: 'Shannon Diversity Index',
  firmicutesBacteroidetes: 'Firmicutes/Bacteroidetes 比值',
  lactobacillus: 'Lactobacillus spp.',
  bifidobacterium: 'Bifidobacterium spp.',
  akkermansia: 'Akkermansia muciniphila',
  faecalibacterium: 'Faecalibacterium prausnitzii',
  zonulin: 'Zonulin（腸漏指標）',
  sIgA: 'sIgA（分泌型免疫球蛋白A）',
  calprotectin: 'Calprotectin（腸道發炎）',
  pancreaticElastase: 'Pancreatic Elastase',
  butyrate: '短鏈脂肪酸-丁酸',
  propionate: '短鏈脂肪酸-丙酸',
  betaGlucuronidase: 'Beta-glucuronidase',
  // Organic Acids
  citricAcid: 'Citric Acid',
  succinicAcid: 'Succinic Acid',
  fumaricAcid: 'Fumaric Acid',
  malicAcid: 'Malic Acid',
  pyruvicAcid: 'Pyruvic Acid',
  lacticAcid: 'Lactic Acid',
  hva: 'HVA（多巴胺代謝）',
  vma: 'VMA（腎上腺素代謝）',
  hiaa: '5-HIAA（血清素代謝）',
  quinolinicAcid: 'Quinolinic Acid',
  kynurenicAcid: 'Kynurenic Acid',
  methylmalonicAcid: 'Methylmalonic Acid (B12)',
  xanthurenicAcid: 'Xanthurenic Acid (B6)',
  figlu: 'FIGLU（葉酸）',
  arabinose: 'Arabinose（酵母菌）',
  dhppa: 'DHPPA（益菌代謝）',
  cresol: '4-Cresol（梭菌屬）',
  dArabinitol: 'D-Arabinitol',
  // Toxic Elements
  mercuryBlood: '汞 Mercury（血液）',
  mercuryUrine: '汞 Mercury（螯合尿液）',
  lead: '鉛 Lead',
  arsenic: '砷 Arsenic',
  cadmium: '鎘 Cadmium',
  aluminum: '鋁 Aluminum',
  zinc: '鋅 Zinc',
  selenium: '硒 Selenium',
  magnesiumRbc: '鎂 Magnesium (RBC)',
  copper: '銅 Copper',
  cuZnRatio: '銅鋅比值 Cu/Zn',
  ferritin: '鐵蛋白 Ferritin',
  iodine: '碘 Iodine',
  mehp: 'MEHP（塑化劑）',
  bpa: 'BPA（雙酚A）',
  nonylphenol: '4-Nonylphenol（壬基酚）',
  glyphosate: 'Glyphosate（嘉磷塞）',
  // Oxidative Stress
  ohdg: '8-OHdG（DNA氧化損傷）',
  mda: 'MDA（脂質過氧化）',
  isoprostanes: 'Isoprostanes',
  proteinCarbonyls: 'Protein Carbonyls',
  gsh: 'GSH 還原型穀胱甘肽',
  gssg: 'GSSG 氧化型穀胱甘肽',
  gshGssgRatio: 'GSH/GSSG 比值',
  sod: 'SOD 超氧化物歧化酶',
  gpx: 'GPx 穀胱甘肽過氧化酶',
  catalase: 'Catalase',
  coq10: 'CoQ10',
  vitaminC: 'Vitamin C',
  vitaminE: 'Vitamin E',
  tac: 'TAC 總抗氧化力',
}

const SEVERITY_STYLES: Record<string, string> = {
  severe: 'bg-red-100 text-red-800 border border-red-200',
  moderate: 'bg-orange-100 text-orange-800 border border-orange-200',
  mild: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  normal: 'bg-green-50 text-green-700 border border-green-200',
}

const SEVERITY_LABELS: Record<string, string> = {
  severe: '重度敏感',
  moderate: '中度敏感',
  mild: '輕度敏感',
  normal: '正常',
}

export function PanelViewer({ panelType, values, flagged }: PanelViewerProps) {
  const meta = PANEL_META[panelType]
  const labEntries = Object.entries(values).filter(
    ([k, v]) => k !== 'foodSensitivities' && v !== undefined
  ) as [string, LabValue][]

  const foodSensitivities = values.foodSensitivities as FoodSensitivityItem[] | undefined

  return (
    <div className="space-y-4">
      {/* Panel header */}
      <div className="flex items-center gap-2">
        <h3 className="text-base font-semibold text-gray-900">{meta?.label ?? panelType}</h3>
        {flagged && (
          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
            有異常指標
          </span>
        )}
      </div>

      {/* Lab values table */}
      {labEntries.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">檢測項目</th>
                <th className="text-left py-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">結果</th>
                <th className="text-left py-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">單位</th>
                <th className="text-left py-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">參考範圍</th>
                <th className="text-left py-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">判讀</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {labEntries.map(([key, value]) => (
                <LabValueRow
                  key={key}
                  label={LABEL_MAP[key] ?? key}
                  value={value}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Food sensitivities table */}
      {foodSensitivities && foodSensitivities.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">慢性食物敏感 IgG</h4>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-2 px-4 text-xs font-semibold text-gray-500">食物</th>
                  <th className="text-left py-2 px-4 text-xs font-semibold text-gray-500">IgG 濃度</th>
                  <th className="text-left py-2 px-4 text-xs font-semibold text-gray-500">等級</th>
                  <th className="text-left py-2 px-4 text-xs font-semibold text-gray-500">敏感程度</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {foodSensitivities
                  .sort((a, b) => b.igG - a.igG)
                  .map((item, i) => (
                    <tr key={i} className={item.severity === 'severe' ? 'bg-red-50/30' : ''}>
                      <td className="py-2 px-4 text-sm text-gray-900 font-medium">{item.food}</td>
                      <td className="py-2 px-4 text-sm text-gray-700 font-mono">{item.igG} {item.unit}</td>
                      <td className="py-2 px-4 text-sm text-gray-600">{item.level}</td>
                      <td className="py-2 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${SEVERITY_STYLES[item.severity]}`}>
                          {SEVERITY_LABELS[item.severity]}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {labEntries.length === 0 && !foodSensitivities && (
        <p className="text-sm text-gray-400 italic">無法解析此面板的數值</p>
      )}
    </div>
  )
}
