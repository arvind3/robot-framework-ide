export type SemanticTokenAbs = {
  line: number
  start: number
  length: number
  tokenType: string
  tokenModifiers?: string[]
}

export type SemanticProjectContext = {
  currentFile?: string
  projectFiles?: Record<string, string>
}

const CONTROL_WORDS = new Set(['IF', 'ELSE', 'ELSE IF', 'END', 'FOR', 'WHILE', 'TRY', 'EXCEPT', 'FINALLY', 'RETURN', 'BREAK', 'CONTINUE', 'GIVEN', 'WHEN', 'THEN', 'AND', 'BUT'])
const BUILTIN_KEYWORDS = new Set(['log', 'should be equal', 'should contain', 'set variable', 'run keyword if', 'fail', 'comment', 'sleep'])

const SECTION_MAP: Array<{ key: string; value: 'settings' | 'variables' | 'testcases' | 'keywords' | 'unknown' }> = [
  { key: 'setting', value: 'settings' },
  { key: 'variable', value: 'variables' },
  { key: 'test case', value: 'testcases' },
  { key: 'task', value: 'testcases' },
  { key: 'keyword', value: 'keywords' },
]

function normalizePipeLine(raw: string): { line: string; offset: number } {
  const pipeIdx = raw.search(/\|/)
  if (pipeIdx < 0 || !raw.trimStart().startsWith('|')) return { line: raw, offset: 0 }
  const sliced = raw.slice(pipeIdx + 1)
  const normalized = sliced.replace(/\s*\|\s*/g, '  ')
  return { line: normalized, offset: pipeIdx + 1 }
}

function firstCellBounds(line: string): { start: number; end: number } | null {
  const contentStart = line.search(/\S/)
  if (contentStart < 0) return null
  const rest = line.slice(contentStart)
  const sep = rest.search(/\s{2,}|\t/)
  if (sep < 0) return { start: contentStart, end: line.length }
  return { start: contentStart, end: contentStart + sep }
}

function normalizeKeywordName(v: string): string {
  return v.trim().toLowerCase().replace(/\s+/g, ' ')
}

function pushUnique(tokens: SemanticTokenAbs[], seen: Set<string>, t: SemanticTokenAbs) {
  if (t.length <= 0) return
  const key = `${t.line}:${t.start}:${t.length}:${t.tokenType}`
  if (seen.has(key)) return
  seen.add(key)
  tokens.push(t)
}

function joinPath(baseFile: string, rel: string): string {
  const baseParts = baseFile.split('/').slice(0, -1)
  const parts = [...baseParts, ...rel.split('/')]
  const out: string[] = []
  for (const p of parts) {
    if (!p || p === '.') continue
    if (p === '..') out.pop()
    else out.push(p)
  }
  return out.join('/')
}

function collectKeywordDefinitions(text: string): Set<string> {
  const defs = new Set<string>()
  const lines = text.split(/\r?\n/)
  let section: 'keywords' | 'other' = 'other'
  for (const raw of lines) {
    const line = normalizePipeLine(raw).line
    const trimmed = line.trim()
    if (!trimmed) continue
    const header = line.match(/\*\*\*\s*([^*]+?)\s*\*\*\*/)
    if (header) {
      section = header[1].toLowerCase().includes('keyword') ? 'keywords' : 'other'
      continue
    }
    if (section !== 'keywords') continue
    const cell = firstCellBounds(line)
    if (!cell) continue
    const firstCell = line.slice(cell.start, cell.end)
    const remainder = line.slice(cell.end)
    if (remainder.trim()) continue
    defs.add(normalizeKeywordName(firstCell))
  }
  return defs
}

function collectImportedResourceFiles(currentFile: string, projectFiles: Record<string, string>, text: string): string[] {
  const out: string[] = []
  const lines = text.split(/\r?\n/)
  let inSettings = false
  for (const raw of lines) {
    const line = normalizePipeLine(raw).line
    const trimmed = line.trim()
    if (!trimmed) continue
    const header = line.match(/\*\*\*\s*([^*]+?)\s*\*\*\*/)
    if (header) {
      inSettings = header[1].toLowerCase().includes('setting')
      continue
    }
    if (!inSettings) continue
    const m = line.match(/^\s*Resource\s{2,}(.+)$/i)
    if (!m) continue
    const candidate = m[1].trim().replace(/\\/g, '/')
    const resolved = joinPath(currentFile, candidate)
    if (projectFiles[resolved] != null) out.push(resolved)
  }
  return out
}

export function analyzeRobotSemanticTokens(text: string, ctx: SemanticProjectContext = {}): SemanticTokenAbs[] {
  const tokens: SemanticTokenAbs[] = []
  const seen = new Set<string>()
  const lines = text.split(/\r?\n/)
  let section: 'settings' | 'variables' | 'testcases' | 'keywords' | 'unknown' = 'unknown'

  const projectFiles = ctx.projectFiles || {}
  const currentFile = ctx.currentFile || ''

  const knownKeywords = new Set<string>(BUILTIN_KEYWORDS)
  collectKeywordDefinitions(text).forEach((k) => knownKeywords.add(k))
  if (currentFile && projectFiles[currentFile] != null) {
    const imported = collectImportedResourceFiles(currentFile, projectFiles, text)
    for (const file of imported) {
      collectKeywordDefinitions(projectFiles[file] || '').forEach((k) => knownKeywords.add(k))
    }
  }

  for (let lineNo = 0; lineNo < lines.length; lineNo++) {
    const raw = lines[lineNo]
    const normalized = normalizePipeLine(raw)
    const line = normalized.line
    const offset = normalized.offset
    const isPipeRow = offset > 0
    const trimmed = line.trim()
    if (!trimmed) continue

    const headerMatch = line.match(/\*\*\*\s*([^*]+?)\s*\*\*\*/)
    if (headerMatch && headerMatch.index != null) {
      pushUnique(tokens, seen, { line: lineNo, start: offset + headerMatch.index, length: headerMatch[0].length, tokenType: 'header' })
      const header = headerMatch[1].toLowerCase()
      section = 'unknown'
      for (const cand of SECTION_MAP) {
        if (header.includes(cand.key)) {
          section = cand.value
          break
        }
      }
      continue
    }

    const commentStart = line.indexOf('#')
    if (trimmed.startsWith('#') && commentStart >= 0) {
      pushUnique(tokens, seen, { line: lineNo, start: offset + commentStart, length: line.length - commentStart, tokenType: 'comment' })
      continue
    }

    for (const m of line.matchAll(/[$@&%]\{[^}]+\}/g)) {
      if (m.index != null) pushUnique(tokens, seen, { line: lineNo, start: offset + m.index, length: m[0].length, tokenType: 'variable' })
    }

    for (const m of line.matchAll(/\[[^\]]+\]/g)) {
      if (m.index != null) pushUnique(tokens, seen, { line: lineNo, start: offset + m.index, length: m[0].length, tokenType: 'setting' })
    }

    const cell = firstCellBounds(line)
    if (!cell) continue
    const firstCell = line.slice(cell.start, cell.end)
    const upperCell = firstCell.toUpperCase()
    const remainder = line.slice(cell.end)
    const hasArguments = remainder.trim().length > 0
    const leadingWs = (line.match(/^\s*/) || [''])[0].length
    const isDefinitionLike = !hasArguments && !CONTROL_WORDS.has(upperCell) && !trimmed.startsWith('...') && (!/^\s/.test(line) || isPipeRow)

    if (section === 'settings') {
      pushUnique(tokens, seen, { line: lineNo, start: offset + cell.start, length: firstCell.length, tokenType: 'setting' })
    }

    if (section === 'testcases' && isDefinitionLike && leadingWs <= 4) {
      pushUnique(tokens, seen, { line: lineNo, start: offset + cell.start, length: firstCell.length, tokenType: 'testCaseName' })
      continue
    }

    if (section === 'keywords' && isDefinitionLike && leadingWs <= 4) {
      pushUnique(tokens, seen, { line: lineNo, start: offset + cell.start, length: firstCell.length, tokenType: 'keywordDefinition' })
      continue
    }

    const keywordLike = section === 'testcases' || section === 'keywords' || /^\s/.test(line) || hasArguments
    if (CONTROL_WORDS.has(upperCell)) {
      pushUnique(tokens, seen, { line: lineNo, start: offset + cell.start, length: firstCell.length, tokenType: 'control' })
    } else if (keywordLike) {
      pushUnique(tokens, seen, { line: lineNo, start: offset + cell.start, length: firstCell.length, tokenType: 'keywordCall' })
      const normalizedName = normalizeKeywordName(firstCell.includes('.') ? firstCell.split('.').slice(1).join('.') : firstCell)
      if (normalizedName && !knownKeywords.has(normalizedName)) {
        pushUnique(tokens, seen, { line: lineNo, start: offset + cell.start, length: firstCell.length, tokenType: 'error' })
      }
    }

    for (const m of remainder.matchAll(/[^\s][^\t]*(?=(\s{2,}|\t|$))/g)) {
      if (m.index == null) continue
      const token = m[0].trim()
      if (!token) continue
      pushUnique(tokens, seen, { line: lineNo, start: offset + cell.end + m.index, length: token.length, tokenType: 'argument' })
    }

    if (commentStart > 0) pushUnique(tokens, seen, { line: lineNo, start: offset + commentStart, length: line.length - commentStart, tokenType: 'comment' })
  }

  tokens.sort((a, b) => (a.line - b.line) || (a.start - b.start) || (a.length - b.length))
  return tokens
}
