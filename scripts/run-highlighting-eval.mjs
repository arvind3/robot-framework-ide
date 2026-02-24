import fs from 'node:fs/promises'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')
const tmpDir = path.join(repoRoot, '.tmp', 'highlight-eval-build')
const reportDir = path.join(repoRoot, 'eval', 'highlighting', 'reports')

function run(cmd, args, cwd = repoRoot) {
  const res = spawnSync(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' })
  if (res.status !== 0) throw new Error(`Command failed: ${cmd} ${args.join(' ')}`)
}

function hasToken(tokens, tokenType) {
  return tokens.some((t) => t.tokenType === tokenType)
}

async function main() {
  await fs.mkdir(tmpDir, { recursive: true })
  await fs.mkdir(reportDir, { recursive: true })

  run('npx.cmd', ['tsc', 'src/robotSemanticCore.ts', '--target', 'es2020', '--module', 'es2020', '--skipLibCheck', '--outDir', tmpDir])
  const mod = await import(pathToFileURL(path.join(tmpDir, 'robotSemanticCore.js')).href)
  const { analyzeRobotSemanticTokens } = mod

  const baseCases = [
    { id: 'HEADER', text: '*** Settings ***', expect: ['header'] },
    { id: 'VARIABLE', text: 'Log    ${USER}', expect: ['variable', 'keywordCall', 'argument'] },
    { id: 'COMMENT_LINE', text: '# comment only', expect: ['comment'] },
    { id: 'INLINE_COMMENT', text: 'Log    hello    # inline', expect: ['comment'] },
    { id: 'SETTING_KEYWORD', text: '*** Settings ***\nLibrary    SeleniumLibrary', expect: ['setting'] },
    { id: 'TESTCASE_NAME', text: '*** Test Cases ***\nLogin smoke', expect: ['testCaseName'] },
    { id: 'KEYWORD_DEF', text: '*** Keywords ***\nOpen App', expect: ['keywordDefinition'] },
    { id: 'KEYWORD_CALL', text: '*** Test Cases ***\nT\n    Open Browser    about:blank', expect: ['keywordCall', 'argument'] },
    { id: 'CONTROL_IF', text: '*** Test Cases ***\nT\n    IF    ${x}', expect: ['control', 'variable'] },
    { id: 'CONTROL_FOR', text: '*** Test Cases ***\nT\n    FOR    ${i}    IN RANGE    3', expect: ['control', 'variable'] },
    { id: 'SETTING_BRACKET', text: '[Documentation]    sample', expect: ['setting'] },
    { id: 'DICT_VAR', text: 'Log    &{cfg}', expect: ['variable'] },
    { id: 'LIST_VAR', text: 'Log    @{items}', expect: ['variable'] },
    { id: 'PERCENT_VAR', text: 'Log    %{HOME}', expect: ['variable'] },
    { id: 'MIXED', text: '*** Keywords ***\nDo Work\n    [Arguments]    ${u}\n    Log    ${u}', expect: ['keywordDefinition', 'setting', 'variable', 'keywordCall'] },
  ]

  const cases = []
  for (const c of baseCases) {
    cases.push(c)
    cases.push({ id: `${c.id}_PIPE`, text: c.text.replace(/\n/g, '\n|    ').replace(/^/, '|    '), expect: c.expect })
  }

  const results = cases.map((c) => {
    const tokens = analyzeRobotSemanticTokens(c.text)
    const missing = c.expect.filter((e) => !hasToken(tokens, e))
    const pass = missing.length === 0
    return {
      id: c.id,
      expected: c.expect,
      pass,
      missing,
      actualTypes: [...new Set(tokens.map((t) => t.tokenType))],
      tokenCount: tokens.length,
      sample: c.text,
    }
  })

  const passed = results.filter((r) => r.pass).length
  const total = results.length
  const summary = {
    generatedAt: new Date().toISOString(),
    total,
    passed,
    failed: total - passed,
    passRate: Number(((passed / total) * 100).toFixed(1)),
  }

  await fs.writeFile(path.join(reportDir, 'latest.json'), JSON.stringify({ summary, results }, null, 2), 'utf8')

  let md = '# Robot Syntax Highlighting Evaluation Report\n\n'
  md += `- Generated: ${summary.generatedAt}\n`
  md += `- Total cases: ${summary.total}\n`
  md += `- Passed: ${summary.passed}\n`
  md += `- Failed: ${summary.failed}\n`
  md += `- Pass rate: ${summary.passRate}%\n\n`
  md += '| # | Case | Expected Tokens | Actual Tokens | Status |\n|---|---|---|---|---|\n'
  results.forEach((r, i) => {
    md += `| ${i + 1} | ${r.id} | ${r.expected.join(', ')} | ${r.actualTypes.join(', ')} | ${r.pass ? 'PASS' : 'FAIL'} |\n`
  })

  md += '\n## Failed Case Details\n\n'
  const fails = results.filter((r) => !r.pass)
  if (!fails.length) {
    md += 'All highlighting cases passed.\n'
  } else {
    fails.forEach((r, i) => {
      md += `### ${i + 1}. ${r.id}\n`
      md += `- Missing tokens: ${r.missing.join(', ')}\n`
      md += `- Expected: ${r.expected.join(', ')}\n`
      md += `- Actual: ${r.actualTypes.join(', ')}\n`
      md += `- Sample: ${r.sample.replace(/\n/g, ' ⏎ ')}\n\n`
    })
  }

  await fs.writeFile(path.join(reportDir, 'latest.md'), md, 'utf8')
  console.log(`Highlight eval complete: ${summary.passed}/${summary.total} passed (${summary.passRate}%)`)

  if (summary.failed > 0) process.exit(1)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
