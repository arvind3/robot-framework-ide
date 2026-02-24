type AbsToken = { line: number; start: number; length: number; tokenType: string; tokenModifiers?: string[] }

const legendTypes = ['variable', 'comment', 'header', 'setting', 'keywordDefinition', 'keywordCall', 'control', 'testCaseName', 'argument', 'error', 'documentation']
const legendMap = new Map(legendTypes.map((t, i) => [t, i]))

let installed = false
let worker: Worker | null = null
let msgId = 0
const pending = new Map<number, (tokens: AbsToken[]) => void>()

function ensureWorker() {
  if (worker) return worker
  worker = new Worker(new URL('./robotSemanticWorker.ts', import.meta.url), { type: 'module' })
  worker.onmessage = (ev: MessageEvent<{ id: number; tokens: AbsToken[] }>) => {
    const cb = pending.get(ev.data.id)
    if (!cb) return
    pending.delete(ev.data.id)
    cb(ev.data.tokens)
  }
  return worker
}

function requestTokens(text: string): Promise<AbsToken[]> {
  const w = ensureWorker()
  return new Promise((resolve) => {
    const id = ++msgId
    pending.set(id, resolve)
    w.postMessage({ id, text })
  })
}

function encodeTokens(tokens: AbsToken[]): Uint32Array {
  const data: number[] = []
  let prevLine = 0
  let prevChar = 0

  for (const t of tokens) {
    const tokenType = legendMap.get(t.tokenType)
    if (tokenType == null) continue

    const deltaLine = t.line - prevLine
    const deltaStart = deltaLine === 0 ? t.start - prevChar : t.start

    data.push(deltaLine, deltaStart, t.length, tokenType, 0)
    prevLine = t.line
    prevChar = t.start
  }

  return Uint32Array.from(data)
}

export function registerRobotSemanticProvider(monaco: any) {
  if (installed) return
  installed = true

  monaco.languages.registerDocumentSemanticTokensProvider('robotframework', {
    getLegend() {
      return { tokenTypes: legendTypes, tokenModifiers: [] }
    },
    async provideDocumentSemanticTokens(model: any) {
      const tokens = await requestTokens(model.getValue())
      return { data: encodeTokens(tokens) }
    },
    releaseDocumentSemanticTokens() {
      // no-op
    },
  })
}
