import Anthropic from '@anthropic-ai/sdk'

export async function GET() {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) {
    return Response.json({ error: 'ANTHROPIC_API_KEY not set' }, { status: 500 })
  }
  
  try {
    const anthropic = new Anthropic({ apiKey: key })
    const msg = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 10,
      messages: [{ role: 'user', content: 'Say "ok"' }],
    })
    return Response.json({ ok: true, key_prefix: key.substring(0, 20), response: msg.content })
  } catch (err: any) {
    return Response.json({ 
      error: err?.message, 
      type: err?.constructor?.name,
      status: err?.status,
      key_prefix: key.substring(0, 20),
    }, { status: 500 })
  }
}
