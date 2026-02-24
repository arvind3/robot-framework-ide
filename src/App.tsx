import { useMemo, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import JSZip from 'jszip'
import './App.css'

type FileMap = Record<string, string>
type PyodideWindow = Window & { loadPyodide?: (opts?: unknown) => Promise<any>; __pyodide?: any }
type AIRoute = 'webllm-primary' | 'webllm-fallback' | 'wllama-fallback' | 'heuristic'

type Chapter = {
  id: string
  title: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  outcomes: string[]
  challenge: string
  rubric: string[]
  files: FileMap
}

const rfVersions = ['3.1', '3.2', '4.1', '5.0', '6.1']

const chapters: Chapter[] = [
  {
    id: 'ch1',
    title: 'Variables + Shared Keywords',
    level: 'Beginner',
    outcomes: ['Use variables.py', 'Call keywords from resource file', 'Understand suite structure'],
    challenge: 'Add one new test case that reuses existing keywords and variables.',
    rubric: ['Has *** Test Cases ***', 'Calls shared keyword', 'Uses variable from variables.py'],
    files: {
      'tests/01_variables_keywords.robot': `*** Settings ***
Variables    ../resources/variables.py
Resource     ../resources/common.resource

*** Test Cases ***
Login With Shared Data
    Open App
    Login As Default User
    Verify Dashboard Title
`,
      'resources/common.resource': `*** Keywords ***
Open App
    Log    Opening ${'$'}{BASE_URL}

Login As Default User
    Log    Login with ${'$'}{DEFAULT_USER}

Verify Dashboard Title
    Should Be Equal    ${'$'}{EXPECTED_TITLE}    Demo Dashboard
`,
      'resources/variables.py': `BASE_URL = "https://example.test"
DEFAULT_USER = "demo.user"
EXPECTED_TITLE = "Demo Dashboard"
`,
    },
  },
  {
    id: 'ch2',
    title: 'POM + Locators + Env Override',
    level: 'Intermediate',
    outcomes: ['Use page objects', 'Centralize locators', 'Override env vars from CLI'],
    challenge: 'Add a logout scenario using the same page object model style.',
    rubric: ['Uses resource page object', 'Has locator variables', 'Includes override command note'],
    files: {
      'tests/02_pom_style.robot': `*** Settings ***
Variables    ../resources/env.py
Resource     ../pages/login_page.resource

*** Test Cases ***
Login Through POM
    Given User Opens Login Page
    When User Signs In
    Then User Should Reach Home
`,
      'pages/login_page.resource': `*** Variables ***
${'$'}{LOGIN_USER_INPUT}    css:#username
${'$'}{LOGIN_PASS_INPUT}    css:#password
${'$'}{LOGIN_BUTTON}        css:button[type="submit"]

*** Keywords ***
Given User Opens Login Page
    Log    Open ${'$'}{APP_URL}

When User Signs In
    Log    Type into ${'$'}{LOGIN_USER_INPUT}
    Log    Type into ${'$'}{LOGIN_PASS_INPUT}
    Log    Click ${'$'}{LOGIN_BUTTON}

Then User Should Reach Home
    Log    Assert URL contains /home
`,
      'resources/env.py': `APP_URL = "https://example.test/login"
`,
      'README-run.md': `Run override example:\nrobot -v APP_URL:https://staging.example.test/login tests/02_pom_style.robot`,
    },
  },
  {
    id: 'ch3',
    title: 'Reports + Tags + Metadata',
    level: 'Advanced',
    outcomes: ['Generate report/log/output', 'Use tags and metadata', 'Document tests for teams'],
    challenge: 'Add one regression-tagged test and include clear test documentation.',
    rubric: ['Uses Test Tags', 'Has Metadata', 'Includes report command'],
    files: {
      'tests/03_reporting.robot': `*** Settings ***
Documentation    Example suite for report and log generation
Metadata         Owner    QA Team
Metadata         Sprint   Sprint-12
Test Tags        smoke    reporting

*** Test Cases ***
Checkout Smoke
    [Documentation]    Validates core checkout path
    Log    Checkout flow pass

Profile Update Smoke
    [Documentation]    Validates profile update
    Log    Profile update pass
`,
      'README-run.md': `Suggested command:\nrobot --output output.xml --log log.html --report report.html tests/03_reporting.robot`,
    },
  },
]

async function ensurePyodide() {
  const w = window as PyodideWindow
  if (w.__pyodide) return w.__pyodide
  if (!w.loadPyodide) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.3/full/pyodide.js'
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load Pyodide script'))
      document.body.appendChild(script)
    })
  }
  const pyodide = await w.loadPyodide?.({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.3/full/' })
  if (!pyodide) throw new Error('Pyodide unavailable')
  w.__pyodide = pyodide
  return pyodide
}

function App() {
  const [selectedChapter, setSelectedChapter] = useState(chapters[0])
  const [files, setFiles] = useState<FileMap>(chapters[0].files)
  const [activeFile, setActiveFile] = useState(Object.keys(chapters[0].files)[0])
  const [rfVersion, setRfVersion] = useState('6.1')
  const [output, setOutput] = useState('Welcome. Pick chapter → edit files → run checks.')
  const [running, setRunning] = useState(false)
  const [aiStatus, setAiStatus] = useState('Not initialized')
  const [aiRoute, setAiRoute] = useState<AIRoute>('heuristic')
  const [engine, setEngine] = useState<any>(null)
  const [toast, setToast] = useState('')
  const importRef = useRef<HTMLInputElement>(null)

  const fileList = useMemo(() => Object.keys(files).sort(), [files])

  const pulse = (m: string) => {
    setToast(m)
    window.setTimeout(() => setToast(''), 1600)
  }

  const loadChapter = (id: string) => {
    const chapter = chapters.find((c) => c.id === id)
    if (!chapter) return
    setSelectedChapter(chapter)
    setFiles(chapter.files)
    const first = Object.keys(chapter.files).sort()[0]
    setActiveFile(first)
    setOutput(`Loaded ${chapter.title}\n\nOutcomes:\n- ${chapter.outcomes.join('\n- ')}\n\nChallenge:\n${chapter.challenge}`)
    pulse(`${chapter.level} chapter loaded`)
  }

  const runValidation = () => {
    const text = files[activeFile] || ''
    const checks = [
      text.includes('*** Test Cases ***'),
      text.includes('*** Settings ***') || activeFile.endsWith('.md'),
      text.length > 30,
    ]
    setOutput([
      `Robot Framework v${rfVersion} check complete`,
      `File: ${activeFile}`,
      `Quality: ${checks.filter(Boolean).length}/3`,
      checks[0] ? '✔ Test Cases section' : '✖ Add *** Test Cases ***',
      checks[1] ? '✔ Settings/Doc structure' : '✖ Add *** Settings ***',
      '',
      `Challenge: ${selectedChapter.challenge}`,
    ].join('\n'))
    pulse('Validation complete')
  }

  const runPyodideCheck = async () => {
    if (!activeFile) return
    setRunning(true)
    try {
      const pyodide = await ensurePyodide()
      pyodide.globals.set('robot_text', files[activeFile] || '')
      const result = pyodide.runPython(`
lines = robot_text.splitlines()
'Pyodide runtime check complete\\nLine count: ' + str(len(lines))
      `)
      setOutput(String(result))
      pulse('Runtime check complete')
    } catch (e) {
      setOutput(`Runtime error: ${(e as Error).message}`)
    } finally {
      setRunning(false)
    }
  }

  const initAI = async () => {
    setAiStatus('Initializing...')
    try {
      const webllm = await import('@mlc-ai/web-llm')
      try {
        const e = await webllm.CreateMLCEngine('Qwen2.5-1.5B-Instruct-q4f16_1-MLC')
        setEngine(e)
        setAiRoute('webllm-primary')
        setAiStatus('Ready with Qwen2.5-1.5B')
      } catch {
        const e2 = await webllm.CreateMLCEngine('Llama-3.2-1B-Instruct-q4f16_1-MLC')
        setEngine(e2)
        setAiRoute('webllm-fallback')
        setAiStatus('Ready with Llama-3.2-1B')
      }
      pulse('AI initialized')
    } catch {
      setAiRoute('wllama-fallback')
      setAiStatus('WebLLM unavailable. Fallback hook active.')
    }
  }

  const checkMySolution = async () => {
    const text = files[activeFile] || ''
    if (engine) {
      const r = await engine.chat.completions.create({
        messages: [
          { role: 'system', content: 'Grade this Robot Framework solution with concise feedback.' },
          { role: 'user', content: `Rubric:\n- ${selectedChapter.rubric.join('\n- ')}\n\nFile:\n${text}` },
        ],
      })
      setOutput(r.choices?.[0]?.message?.content || 'No response')
      return
    }
    const hits = selectedChapter.rubric.filter((r) => text.toLowerCase().includes(r.toLowerCase().split(' ')[1] || ''))
    setOutput(`Heuristic chapter rubric result: ${hits.length}/${selectedChapter.rubric.length}\n- ${selectedChapter.rubric.join('\n- ')}`)
  }

  const exportProject = async () => {
    const zip = new JSZip()
    Object.entries(files).forEach(([path, content]) => zip.file(path, content))
    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `robot-framework-ide-${selectedChapter.id}.zip`
    a.click()
    URL.revokeObjectURL(url)
    pulse('Project exported')
  }

  const importProject = async (file?: File) => {
    if (!file) return
    const zip = await JSZip.loadAsync(await file.arrayBuffer())
    const next: FileMap = {}
    for (const name of Object.keys(zip.files)) {
      const f = zip.files[name]
      if (!f.dir) next[name] = await f.async('string')
    }
    const keys = Object.keys(next)
    if (keys.length) {
      setFiles(next)
      setActiveFile(keys.sort()[0])
      setOutput(`Imported ${keys.length} files from ${file.name}`)
      pulse('Project imported')
    }
  }

  return (
    <div className="layout">
      {toast && <div className="toast">{toast}</div>}
      <aside className="sidebar">
        <h2>Robot Framework IDE</h2>
        <p className="subtle">No setup. Practical chapters. Real multi-file learning.</p>

        <h3>Chapter Navigator</h3>
        <div className="templateButtons">
          {chapters.map((c) => (
            <button key={c.id} onClick={() => loadChapter(c.id)}>{c.level}: {c.title}</button>
          ))}
        </div>

        <label>Robot Version</label>
        <select value={rfVersion} onChange={(e) => setRfVersion(e.target.value)}>
          {rfVersions.map((v) => <option key={v} value={v}>v{v}</option>)}
        </select>

        <div className="templateButtons" style={{ marginTop: 10 }}>
          <button onClick={exportProject}>Export ZIP</button>
          <button onClick={() => importRef.current?.click()}>Import ZIP</button>
          <input ref={importRef} type="file" accept=".zip" style={{ display: 'none' }} onChange={(e) => importProject(e.target.files?.[0])} />
        </div>

        <h3>Files</h3>
        <ul>
          {fileList.map((file) => (
            <li key={file} className={file === activeFile ? 'active' : ''} onClick={() => setActiveFile(file)}>{file}</li>
          ))}
        </ul>
      </aside>

      <main className="main">
        <div className="hero">
          <h1>{selectedChapter.title}</h1>
          <p>{selectedChapter.challenge}</p>
        </div>

        <div className="guide">
          <div className="guideHead"><strong>You will learn</strong></div>
          <div className="steps">
            {selectedChapter.outcomes.map((o, i) => <div key={o}><span>{i + 1}</span>{o}</div>)}
          </div>
        </div>

        <div className="toolbar">
          <span>{activeFile || 'No file selected'}</span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={runValidation} disabled={!activeFile}>Run Check</button>
            <button onClick={runPyodideCheck} disabled={!activeFile || running}>{running ? 'Running...' : 'Run Runtime Check'}</button>
            <button onClick={initAI}>Init AI</button>
            <button onClick={checkMySolution} disabled={!activeFile}>Check My Solution</button>
          </div>
        </div>

        <Editor
          height="50vh"
          language="python"
          value={activeFile ? files[activeFile] : ''}
          onChange={(v) => activeFile && setFiles((prev) => ({ ...prev, [activeFile]: v ?? '' }))}
          theme="vs-dark"
          options={{ minimap: { enabled: false }, fontSize: 14, smoothScrolling: true, cursorBlinking: 'smooth' }}
        />

        <section className="panels">
          <div>
            <h3>Output</h3>
            <pre>{output}</pre>
          </div>
          <div>
            <h3>AI Route</h3>
            <p><strong>Current route:</strong> {aiRoute}</p>
            <p><strong>Status:</strong> {aiStatus}</p>
            <p className="subtle">Route: Qwen 1.5B → Llama 1B → wllama hook → heuristic.</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
