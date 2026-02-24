export type CoachContext = {
  chapterId: string
  chapterTitle: string
  objective: string
  activeFile: string
  activeText: string
  lastCmd: string
  terminalTail: string[]
  artifacts: string[]
}

export const COACH_SYSTEM_PROMPT = `
You are AI Coach for a browser-based Robot Framework IDE.
Goals:
1) Be accurate and practical.
2) Give short step-by-step guidance beginners can execute immediately.
3) Use current chapter, active file, terminal tail, and artifacts as context.
4) Never give generic fluff.
Output style:
- concise
- actionable
- include exact command examples where useful
`

const normalize = (s: string) => s.toLowerCase().trim()
const has = (q: string, words: string[]) => words.some((w) => q.includes(w))

export function generateCoachResponse(question: string, ctx: CoachContext): string {
  const q = normalize(question)
  const hasSettings = ctx.activeText.includes('*** Settings ***')
  const hasTests = ctx.activeText.includes('*** Test Cases ***')
  const hasKeywords = ctx.activeText.includes('*** Keywords ***')

  if (has(q, ['what does this program do', 'what this program do', 'what does this app do', 'explain this program'])) {
    return [
      'This is Robot Framework IDE — Browser-first LocalAI Dev Platform.',
      'You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html).',
      'Flow: Chapter → Edit → Execute CLI → Review Artifacts → Ask AI Coach.',
    ].join(' ')
  }

  if (has(q, ['import', 'zip format', 'how to import'])) {
    return [
      'Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource).',
      'On import, current file tree is replaced by ZIP contents.',
      'Use Help → Download sample import zip for a known-good structure.',
    ].join(' ')
  }

  if (has(q, ['error', 'failed', 'failure', 'debug', 'not working', 'fetch failed'])) {
    const tail = ctx.terminalTail.slice(-4).join(' | ') || 'No terminal output yet.'
    return [
      'Debug checklist:',
      `1) Re-run: ${ctx.lastCmd}`,
      `2) Structure check: Settings=${hasSettings ? 'yes' : 'no'}, Test Cases=${hasTests ? 'yes' : 'no'}, Keywords=${hasKeywords ? 'yes' : 'no'}`,
      '3) Validate file path passed to robot command.',
      '4) If fetch/network appears, retry runtime bootstrap and verify connectivity.',
      `Terminal tail: ${tail}`,
    ].join(' ')
  }

  if (has(q, ['report', 'artifact', 'output.xml', 'log.html', 'report.html'])) {
    const artifactSummary = ctx.artifacts.length ? `Current artifacts: ${ctx.artifacts.join(', ')}` : 'No artifacts listed yet.'
    return [
      'Use explicit artifact flags:',
      '`robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot`',
      artifactSummary,
      'Then click an artifact in left panel to preview.',
    ].join(' ')
  }

  if (has(q, ['improve', 'refactor', 'best practice', 'quality'])) {
    return [
      `Chapter focus: ${ctx.objective}`,
      'Quality upgrades:',
      '- clear test names by behavior',
      '- reusable keywords in resource files',
      '- avoid duplicate steps',
      `Current structure: Settings=${hasSettings ? 'ok' : 'missing'}, Test Cases=${hasTests ? 'ok' : 'missing'}, Keywords=${hasKeywords ? 'ok' : 'missing'}`,
    ].join(' ')
  }

  return [
    `Chapter ${ctx.chapterId}: ${ctx.chapterTitle}. Objective: ${ctx.objective}.`,
    `Active file: ${ctx.activeFile}.`,
    `Next action: run ${ctx.lastCmd} and inspect terminal + artifacts.`,
    'Ask specific topics (import, debug, reports, quality) for targeted steps.',
  ].join(' ')
}

export function runCoachEval(ctx: CoachContext): { pass: number; total: number; lines: string[] } {
  const cases = [
    { q: 'what does this program do', expect: ['learning IDE', 'Robot Framework', 'Flow:'] },
    { q: 'how to import zip', expect: ['Import expects a ZIP', 'tests/*.robot'] },
    { q: 'I get fetch failed error', expect: ['Debug checklist', 'retry runtime bootstrap'] },
    { q: 'how to generate report', expect: ['--output artifacts/output.xml', 'artifacts'] },
    { q: 'improve my test quality', expect: ['Quality upgrades', 'Settings='] },
    { q: 'what should i do next', expect: ['Next action: run'] },
    { q: 'artifact not visible', expect: ['artifacts'] },
    { q: 'program explanation', expect: ['browser-based Robot Framework learning IDE'] },
  ]

  let pass = 0
  const lines = cases.map((c, i) => {
    const r = generateCoachResponse(c.q, ctx)
    const ok = c.expect.every((k) => r.toLowerCase().includes(k.toLowerCase()))
    if (ok) pass += 1
    return `${ok ? 'PASS' : 'FAIL'} [${i + 1}] ${c.q}`
  })

  return { pass, total: cases.length, lines }
}
