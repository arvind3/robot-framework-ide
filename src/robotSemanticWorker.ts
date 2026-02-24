import { analyzeRobotSemanticTokens } from './robotSemanticCore'

type Req = { id: number; text: string; currentFile?: string; projectFiles?: Record<string, string> }
type Res = { id: number; tokens: ReturnType<typeof analyzeRobotSemanticTokens> }

self.onmessage = (ev: MessageEvent<Req>) => {
  const { id, text, currentFile, projectFiles } = ev.data
  const tokens = analyzeRobotSemanticTokens(text, { currentFile, projectFiles })
  const result: Res = { id, tokens }
  self.postMessage(result)
}
