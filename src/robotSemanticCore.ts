export type SemanticTokenAbs = {
  line: number
  start: number
  length: number
  tokenType: string
  tokenModifiers?: string[]
}

const CONTROL_WORDS = new Set(['IF', 'ELSE', 'ELSE IF', 'END', 'FOR', 'WHILE', 'TRY', 'EXCEPT', 'FINALLY', 'RETURN', 'BREAK', 'CONTINUE', 'GIVEN', 'WHEN', 'THEN', 'AND', 'BUT'])

const SECTION_MAP: Array<{ key: string; value: 'settings' | 'variables' | 'testcases' | 'keywords' | 'unknown' }> = [
  { key: 'setting', value: 'settings' },
  { key: 'variable', value: 'variables' },
  { key: 'test case', value: 'testcases' },
  { key: 'task', value: 'testcases' },
  { key: 'keyword', value: 'keywords' },
]

function pushUnique(tokens: SemanticTokenAbs[], seen: Set<string>, t: SemanticTokenAbs) {
  if (t.length <= 0) return
  const key = `${t.line}:${t.start}:${t.length}:${t.tokenType}`
  if (seen.has(key)) return
  seen.add(key)
  tokens.push(t)
}

function firstCellBounds(line: string): { start: number; end: number } | null {
  const contentStart = line.search(/\S/)
  if (contentStart < 0) return null
  const rest = line.slice(contentStart)
  const sep = rest.search(/\s{2,}|\t/)
  if (sep < 0) return { start: contentStart, end: line.length }
  return { start: contentStart, end: contentStart + sep }
}

function normalizePipeLine(raw: string): { line: string; offset: number } {
  const pipeIdx = raw.search(/\|/)
  if (pipeIdx < 0 || !raw.trimStart().startsWith('|')) return { line: raw, offset: 0 }
  const sliced = raw.slice(pipeIdx + 1)
  const normalized = sliced.replace(/\s*\|\s*/g, '  ')
  return { line: normalized, offset: pipeIdx + 1 }
}

export function analyzeRobotSemanticTokens(text: string): SemanticTokenAbs[] {
  const tokens: SemanticTokenAbs[] = []
  const seen = new Set<string>()
  const lines = text.split(/\r?\n/)
  let section: 'settings' | 'variables' | 'testcases' | 'keywords' | 'unknown' = 'unknown'

  for (let lineNo = 0; lineNo < lines.length; lineNo++) {
    const raw = lines[lineNo]
    const normalized = normalizePipeLine(raw)
    const line = normalized.line
    const offset = normalized.offset
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

    const varRegex = /[$@&%]\{[^}]+\}/g
    for (const m of line.matchAll(varRegex)) {
      if (m.index != null) {
        pushUnique(tokens, seen, { line: lineNo, start: offset + m.index, length: m[0].length, tokenType: 'variable' })
      }
    }

    const settingBracketRegex = /\[[^\]]+\]/g
    for (const m of line.matchAll(settingBracketRegex)) {
      if (m.index != null) {
        pushUnique(tokens, seen, { line: lineNo, start: offset + m.index, length: m[0].length, tokenType: 'setting' })
      }
    }

    const cell = firstCellBounds(line)
    if (!cell) continue
    const firstCell = line.slice(cell.start, cell.end)
    const upperCell = firstCell.toUpperCase()

    if (section === 'settings') {
      pushUnique(tokens, seen, { line: lineNo, start: offset + cell.start, length: firstCell.length, tokenType: 'setting' })
    }

    const remainder = line.slice(cell.end)
    const hasArguments = remainder.trim().length > 0
    const isDefinitionLike = !hasArguments && !CONTROL_WORDS.has(upperCell) && !trimmed.startsWith('...')

    if (section === 'testcases' && isDefinitionLike) {
      pushUnique(tokens, seen, { line: lineNo, start: offset + cell.start, length: firstCell.length, tokenType: 'testCaseName' })
      continue
    }

    if (section === 'keywords' && isDefinitionLike) {
      pushUnique(tokens, seen, { line: lineNo, start: offset + cell.start, length: firstCell.length, tokenType: 'keywordDefinition' })
      continue
    }

    if (CONTROL_WORDS.has(upperCell)) {
      pushUnique(tokens, seen, { line: lineNo, start: offset + cell.start, length: firstCell.length, tokenType: 'control' })
    } else if (section === 'testcases' || section === 'keywords' || /^\s/.test(line) || hasArguments) {
      pushUnique(tokens, seen, { line: lineNo, start: offset + cell.start, length: firstCell.length, tokenType: 'keywordCall' })
    }

    const valueRegex = /[^\s][^\t]*(?=(\s{2,}|\t|$))/g
    for (const m of remainder.matchAll(valueRegex)) {
      if (m.index != null) {
        const start = offset + cell.end + m.index
        const token = m[0].trim()
        if (!token) continue
        pushUnique(tokens, seen, { line: lineNo, start, length: token.length, tokenType: 'argument' })
      }
    }

    if (commentStart > 0) {
      pushUnique(tokens, seen, { line: lineNo, start: offset + commentStart, length: line.length - commentStart, tokenType: 'comment' })
    }
  }

  tokens.sort((a, b) => (a.line - b.line) || (a.start - b.start) || (a.length - b.length))
  return tokens
}
