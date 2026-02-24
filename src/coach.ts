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

const normalize = (s: string) => s.toLowerCase().trim()

const has = (q: string, words: string[]) => words.some((w) => q.includes(w))

export function generateCoachResponse(question: string, ctx: CoachContext): string {
  const q = normalize(question)
  const hasSettings = ctx.activeText.includes('*** Settings ***')
  const hasTests = ctx.activeText.includes('*** Test Cases ***')
  const hasKeywords = ctx.activeText.includes('*** Keywords ***')

  if (has(q, ['what does this program do', 'what this program do', 'what does this app do', 'explain this program'])) {
    return [
      'This is a browser-based Robot Framework learning IDE.',
      'You can load a chapter, edit multi-file tests, run Robot CLI in-browser, and inspect generated artifacts.',
      'Main flow: Select chapter → Edit files → Execute CLI → Review artifacts → Ask AI Coach.'
    ].join(' ')
  }

  if (has(q, ['import', 'zip format', 'how to import'])) {
    return [
      'Import expects a ZIP with project-style paths (for example: tests/*.robot and resources/*.resource).',
      'After import, the file tree is replaced by the ZIP contents.',
      'Use Help → “Download sample import zip” to get a working starter package.'
    ].join(' ')
  }

  if (has(q, ['error', 'failed', 'failure', 'debug', 'not working', 'fetch failed'])) {
    const tail = ctx.terminalTail.slice(-3).join(' | ') || 'No terminal output yet.'
    return [
      'Debug checklist:',
      '1) Re-run the command and read terminal tail.',
      `2) Last command: ${ctx.lastCmd}.`,
      `3) Verify active file structure: Settings=${hasSettings ? 'yes' : 'no'}, Test Cases=${hasTests ? 'yes' : 'no'}, Keywords=${hasKeywords ? 'yes' : 'no'}.`,
      '4) If fetch/network error appears, retry runtime bootstrap and check connectivity.',
      `Recent terminal tail: ${tail}`,
    ].join(' ')
  }

  if (has(q, ['report', 'artifact', 'output.xml', 'log.html', 'report.html'])) {
    const artifactSummary = ctx.artifacts.length ? `Current artifacts: ${ctx.artifacts.join(', ')}` : 'No artifacts are currently listed.'
    return [
      'Use explicit artifact flags in command:',
      '`robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot`.',
      artifactSummary,
      'Click an artifact in the left panel to preview it in AI Coach.'
    ].join(' ')
  }

  if (has(q, ['improve', 'refactor', 'best practice', 'quality'])) {
    return [
      `For chapter ${ctx.chapterId} (${ctx.chapterTitle}), prioritize objective: ${ctx.objective}.`,
      `Active file: ${ctx.activeFile}.`,
      'Improvements: use reusable keywords, keep test names behavior-focused, and avoid duplicate steps.',
      `Structure check: Settings=${hasSettings ? 'ok' : 'missing'}, Test Cases=${hasTests ? 'ok' : 'missing'}, Keywords=${hasKeywords ? 'ok' : 'missing'}.`
    ].join(' ')
  }

  return [
    `Chapter ${ctx.chapterId}: ${ctx.chapterTitle}. Objective: ${ctx.objective}.`,
    `Active file: ${ctx.activeFile}.`,
    `Next action: run \
${ctx.lastCmd}\
 then inspect terminal and artifacts for feedback loops.`,
    'If you ask a specific question (import, debugging, reports, best practices), I will give targeted steps.'
  ].join(' ')
}
