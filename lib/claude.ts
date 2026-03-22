import Anthropic from '@anthropic-ai/sdk'
import { ParsedReportData, LabValue, FoodSensitivityItem } from '@/types'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

const SYSTEM_PROMPT = `你是一位資深功能醫學醫師助理，擁有 IFM（Institute for Functional Medicine）認證知識背景。
你的工作是協助診所醫師解讀功能醫學全方位檢測報告，提供深入的臨床分析與個人化建議。

## 分析原則
- 遵循功能醫學「尋找根本原因」理念，而非頭痛醫頭
- 考慮各系統之間的交互影響（腸-腦-荷爾蒙軸等）
- 建議應基於實證醫學，同時納入功能醫學整合視角
- 語言：繁體中文，專業但易懂

## 輸出格式（請嚴格遵守以下結構）

### 一、異常指標摘要
列出所有 H（偏高）和 L（偏低）的指標，並說明其臨床意義。

### 二、根本原因矩陣
分析各異常指標之間的上下游關係，找出最可能的根本失衡來源。
格式：「[根本原因] → [中間機轉] → [結果/症狀]」

### 三、優先處置清單（按緊急度排序，最多 5 項）
每項格式：
**[優先順序]. [處置目標]**
- 具體行動
- 預期效果

### 四、個人化補充品協議
每項格式：
| 補充品 | 建議劑量 | 使用時機 | 療程 | 注意事項 |

### 五、飲食與生活型態調整
根據食物敏感結果及代謝指標，提供具體飲食建議。

### 六、追蹤監測計畫
3 個月後需優先複查的指標清單及目標值。

### 七、患者衛教重點
以患者可理解的語言（不使用醫學術語）說明主要問題與改善方向，約 150-200 字。

---
⚠️ 免責聲明：本 AI 分析僅供臨床參考，不能取代醫師的臨床判斷。最終診斷與治療方案需由執業醫師綜合評估後決定。`

function formatLabValue(key: string, v: LabValue | undefined): string {
  if (!v) return ''
  const flagStr = v.flag && v.flag !== 'NORMAL' ? ` [${v.flag}]` : ''
  return `  ${key}: ${v.value} ${v.unit ?? ''} (參考: ${v.referenceRange ?? 'N/A'})${flagStr}`
}

function buildReportText(data: ParsedReportData): string {
  const lines: string[] = []

  lines.push(`## 患者資訊`)
  if (data.patientName) lines.push(`  姓名: ${data.patientName}`)
  if (data.patientAge) lines.push(`  年齡: ${data.patientAge} 歲`)
  if (data.patientGender) lines.push(`  性別: ${data.patientGender}`)
  if (data.collectionDate) lines.push(`  採檢日期: ${data.collectionDate}`)

  if (data.hormone) {
    lines.push(`\n## 一、荷爾蒙面板`)
    for (const [k, v] of Object.entries(data.hormone)) {
      const formatted = formatLabValue(k, v as LabValue)
      if (formatted) lines.push(formatted)
    }
  }

  if (data.allergyFoodSensitivity) {
    lines.push(`\n## 二、過敏/食物敏感面板`)
    const a = data.allergyFoodSensitivity
    for (const [k, v] of Object.entries(a)) {
      if (k === 'foodSensitivities' && Array.isArray(v)) {
        lines.push('  食物 IgG 敏感性:')
        for (const item of v as FoodSensitivityItem[]) {
          lines.push(`    ${item.food}: ${item.igG} ${item.unit} (${item.level} - ${item.severity})`)
        }
      } else {
        const formatted = formatLabValue(k, v as LabValue)
        if (formatted) lines.push(formatted)
      }
    }
  }

  if (data.giHealth) {
    lines.push(`\n## 三、腸道健康面板`)
    for (const [k, v] of Object.entries(data.giHealth)) {
      const formatted = formatLabValue(k, v as LabValue)
      if (formatted) lines.push(formatted)
    }
  }

  if (data.organicAcids) {
    lines.push(`\n## 四、有機酸/營養代謝面板`)
    for (const [k, v] of Object.entries(data.organicAcids)) {
      const formatted = formatLabValue(k, v as LabValue)
      if (formatted) lines.push(formatted)
    }
  }

  if (data.toxicElements) {
    lines.push(`\n## 五、重金屬與毒素面板`)
    for (const [k, v] of Object.entries(data.toxicElements)) {
      const formatted = formatLabValue(k, v as LabValue)
      if (formatted) lines.push(formatted)
    }
  }

  if (data.oxidativeStress) {
    lines.push(`\n## 六、氧化壓力面板`)
    for (const [k, v] of Object.entries(data.oxidativeStress)) {
      const formatted = formatLabValue(k, v as LabValue)
      if (formatted) lines.push(formatted)
    }
  }

  return lines.join('\n')
}

export async function* streamLabAnalysis(
  parsedData: ParsedReportData,
): AsyncGenerator<string> {
  const reportText = buildReportText(parsedData)

  const userMessage = `請根據以下功能醫學檢測報告，提供完整的臨床分析與建議：

${reportText}

請依照系統提示中的七個章節格式輸出分析結果。`

  const stream = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    stream: true,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userMessage }],
  })

  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      yield chunk.delta.text
    }
  }
}
