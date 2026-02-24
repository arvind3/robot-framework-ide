import { analyzeRobotSemanticTokens } from './robotSemanticCore'

type Req = { id: number; text: string }
type Res = { id: number; tokens: ReturnType<typeof analyzeRobotSemanticTokens> }

self.onmessage = (ev: MessageEvent<Req>) => {
  const { id, text } = ev.data
  const tokens = analyzeRobotSemanticTokens(text)
  const result: Res = { id, tokens }
  self.postMessage(result)
}
