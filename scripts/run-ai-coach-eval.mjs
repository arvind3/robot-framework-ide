import fs from 'node:fs/promises'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')
const tmpDir = path.join(repoRoot, '.tmp', 'ai-coach-eval-build')
const reportDir = path.join(repoRoot, 'eval', 'ai-coach', 'reports')

const minPassRate = Number(process.argv.find((a) => a.startsWith('--min-pass-rate='))?.split('=')[1] ?? '100')
const chapterLimit = Number(process.argv.find((a) => a.startsWith('--chapter-limit='))?.split('=')[1] ?? '10')

function run(cmd, args, cwd = repoRoot) {
  const res = spawnSync(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' })
  if (res.status !== 0) {
    throw new Error(`Command failed: ${cmd} ${args.join(' ')}`)
  }
}

function normalize(s) {
  return String(s ?? '').toLowerCase()
}

async function main() {
  await fs.mkdir(tmpDir, { recursive: true })
  await fs.mkdir(reportDir, { recursive: true })

  // Compile TS sources needed for eval (no app behavior changes)
  run('npx.cmd', ['tsc', 'src/coach.ts', 'src/bookChapters.ts', '--target', 'es2020', '--module', 'es2020', '--skipLibCheck', '--outDir', tmpDir])

  const coachMod = await import(pathToFileURL(path.join(tmpDir, 'coach.js')).href)
  const chaptersMod = await import(pathToFileURL(path.join(tmpDir, 'bookChapters.js')).href)

  const { generateCoachResponse } = coachMod
  const { bookChapters } = chaptersMod

  const archetypes = JSON.parse(await fs.readFile(path.join(repoRoot, 'eval', 'ai-coach', 'prompt-archetypes.json'), 'utf8'))

  const chapters = bookChapters.slice(0, chapterLimit)
  const cases = []

  for (const chapter of chapters) {
    const filePaths = Object.keys(chapter.files).sort()
    const activeFile = filePaths[0]
    const activeText = chapter.files[activeFile] || ''

    for (const a of archetypes) {
      cases.push({
        id: `${chapter.slug}-${a.id}`,
        chapter: chapter.slug,
        category: a.category,
        severity: a.severity,
        prompt: a.prompt,
        mustInclude: a.mustInclude,
        mustNotInclude: a.mustNotInclude,
        ctx: {
          chapterId: chapter.id,
          chapterTitle: chapter.title,
          objective: chapter.objective,
          activeFile,
          activeText,
          lastCmd: `robot ${chapter.entrypoint}`,
          terminalTail: ['Robot IDE ready', 'Run complete'],
          artifacts: [],
        },
      })
    }
  }

  const results = cases.map((tc) => {
    const actual = generateCoachResponse(tc.prompt, tc.ctx)
    const n = normalize(actual)
    const missing = tc.mustInclude.filter((k) => !n.includes(normalize(k)))
    const forbidden = tc.mustNotInclude.filter((k) => n.includes(normalize(k)))
    const pass = missing.length === 0 && forbidden.length === 0
    return {
      ...tc,
      actual,
      pass,
      missing,
      forbidden,
    }
  })

  const passed = results.filter((r) => r.pass).length
  const failed = results.length - passed
  const passRate = results.length ? (passed / results.length) * 100 : 0

  const byCategory = Object.fromEntries(
    [...new Set(results.map((r) => r.category))].map((cat) => {
      const subset = results.filter((r) => r.category === cat)
      const ok = subset.filter((r) => r.pass).length
      return [cat, { total: subset.length, passed: ok, failed: subset.length - ok, passRate: Number(((ok / subset.length) * 100).toFixed(1)) }]
    }),
  )

  const summary = {
    generatedAt: new Date().toISOString(),
    totalCases: results.length,
    passed,
    failed,
    passRate: Number(passRate.toFixed(1)),
    minPassRate,
    chapterLimit,
    byCategory,
  }

  await fs.writeFile(path.join(reportDir, 'latest.json'), JSON.stringify({ summary, results }, null, 2), 'utf8')

  let md = '# AI Coach Evaluation Report\n\n'
  md += `- Generated: ${summary.generatedAt}\n`
  md += `- Total cases: ${summary.totalCases}\n`
  md += `- Passed: ${summary.passed}\n`
  md += `- Failed: ${summary.failed}\n`
  md += `- Pass rate: ${summary.passRate}%\n`
  md += `- Required minimum: ${summary.minPassRate}%\n\n`

  md += '## Category Breakdown\n\n'
  md += '| Category | Total | Passed | Failed | Pass Rate |\n|---|---:|---:|---:|---:|\n'
  for (const [cat, v] of Object.entries(byCategory)) {
    md += `| ${cat} | ${v.total} | ${v.passed} | ${v.failed} | ${v.passRate}% |\n`
  }

  md += '\n## Case Results\n\n'
  md += '| # | Case ID | Category | Severity | Prompt | Status |\n|---|---|---|---|---|---|\n'
  results.forEach((r, i) => {
    md += `| ${i + 1} | ${r.id} | ${r.category} | ${r.severity} | ${r.prompt} | ${r.pass ? 'PASS' : 'FAIL'} |\n`
  })

  md += '\n## Failed Details (Expected vs Actual)\n\n'
  const failures = results.filter((r) => !r.pass)
  if (!failures.length) {
    md += 'All test cases passed.\n'
  } else {
    failures.forEach((r, i) => {
      md += `### ${i + 1}. ${r.id}\n`
      md += `- Category: ${r.category} (${r.severity})\n`
      md += `- Prompt: ${r.prompt}\n`
      md += `- Expected include: ${r.mustInclude.join(', ')}\n`
      md += `- Expected exclude: ${r.mustNotInclude.join(', ')}\n`
      if (r.missing.length) md += `- Missing: ${r.missing.join(', ')}\n`
      if (r.forbidden.length) md += `- Forbidden present: ${r.forbidden.join(', ')}\n`
      md += `- Actual: ${String(r.actual).replace(/\n/g, ' ')}\n\n`
    })
  }

  await fs.writeFile(path.join(reportDir, 'latest.md'), md, 'utf8')

  console.log(`AI Coach eval complete: ${summary.passed}/${summary.totalCases} passed (${summary.passRate}%)`)
  console.log(`Reports: eval/ai-coach/reports/latest.md and latest.json`)

  if (summary.passRate < minPassRate) {
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
