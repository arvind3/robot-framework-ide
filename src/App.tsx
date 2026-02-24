import { useMemo, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import JSZip from 'jszip'
import './App.css'

type FileMap = Record<string, string>
type PyodideWindow = Window & { loadPyodide?: (opts?: unknown) => Promise<any>; __pyodide?: any }
type AIRoute = 'webllm-primary' | 'webllm-fallback' | 'wllama-fallback' | 'heuristic'

const rfVersions = ['3.1', '3.2', '4.1', '5.0', '6.1']

const starterTemplates: Record<string, FileMap> = {
  'Smoke Test': {
    'tests/smoke.robot': `*** Settings ***
Library    BuiltIn

*** Test Cases ***
Open Home Page
    Log    This is a smoke test`,
    'resources/common.resource': `*** Keywords ***
Open App
    Log    Opening app`,
  },
  'Best Practice': {
    'tests/login.robot': `*** Settings ***
Resource    ../resources/common.resource

*** Test Cases ***
Login Happy Path
    Given app is open
    When user logs in with valid credentials
    Then dashboard is visible`,
    'resources/common.resource': `*** Keywords ***
Given app is open
    Log    Open browser and navigate

When user logs in with valid credentials
    Log    Fill user/password and submit

Then dashboard is visible
    Log    Assert dashboard`,
  },
}

const learningPaths: Array<{ name: string; outcomes: string[]; files: FileMap }> = [
  {
    name: 'Variables + Keywords + Multi-file Basics',
    outcomes: ['Use Variables file', 'Share keywords via resource', 'Run one suite with clean structure'],
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
    name: 'POM + Locators + Override Variables',
    outcomes: ['Separate locators into one file', 'Use page object keywords', 'Override env from CLI variable'],
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
      'README-run.md': `Run with override example:\nrobot -v APP_URL:https://staging.example.test/login tests/02_pom_style.robot`,
    },
  },
  {
    name: 'Reports + Tags + Suite Metadata',
    outcomes: ['Add docs/tags for maintainability', 'Generate report/log/output files', 'Model production-style suite metadata'],
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
  const [files, setFiles] = useState<FileMap>(starterTemplates['Smoke Test'])
  const [activeFile, setActiveFile] = useState(Object.keys(starterTemplates['Smoke Test'])[0])
  const [rfVersion, setRfVersion] = useState('6.1')
  const [output, setOutput] = useState('Welcome. Start with template → edit → run check.')
  const [running, setRunning] = useState(false)
  const [aiStatus, setAiStatus] = useState('Not initialized')
  const [aiRoute, setAiRoute] = useState<AIRoute>('heuristic')
  const [engine, setEngine] = useState<any>(null)
  const [showGuide, setShowGuide] = useState(true)
  const [toast, setToast] = useState('')
  const importRef = useRef<HTMLInputElement>(null)

  const fileList = useMemo(() => Object.keys(files).sort(), [files])

  const pulse = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(''), 1800)
  }

  const createFile = () => {
    const name = prompt('New file path (example: tests/new.robot)')
    if (!name || files[name]) return
    setFiles((prev) => ({ ...prev, [name]: '*** Test Cases ***\nNew Test\n    Log    Hello' }))
    setActiveFile(name)
    pulse('File created')
  }

  const renameFile = () => {
    const next = prompt('Rename file to:', activeFile)
    if (!next || next === activeFile || files[next]) return
    const content = files[activeFile]
    setFiles((prev) => {
      const clone = { ...prev }
      delete clone[activeFile]
      clone[next] = content
      return clone
    })
    setActiveFile(next)
    pulse('File renamed')
  }

  const deleteFile = () => {
    if (!confirm(`Delete ${activeFile}?`)) return
    setFiles((prev) => {
      const clone = { ...prev }
      delete clone[activeFile]
      return clone
    })
    const remaining = fileList.filter((f) => f !== activeFile)
    setActiveFile(remaining[0] || '')
    pulse('File deleted')
  }

  const loadTemplate = (name: string) => {
    const tpl = starterTemplates[name]
    setFiles(tpl)
    setActiveFile(Object.keys(tpl)[0])
    setOutput(`Loaded template: ${name}`)
    pulse(`Template: ${name}`)
  }

  const loadLearningPath = (name: string) => {
    const pack = learningPaths.find((x) => x.name === name)
    if (!pack) return
    setFiles(pack.files)
    const first = Object.keys(pack.files).sort()[0]
    setActiveFile(first)
    setOutput(`Loaded lesson: ${pack.name}\n\nYou will learn:\n- ${pack.outcomes.join('\n- ')}`)
    pulse('Lesson loaded')
  }

  const runValidation = () => {
    const text = files[activeFile] || ''
    const hasSection = text.includes('*** Test Cases ***')
    setOutput([
      `Robot Framework v${rfVersion} check complete`,
      hasSection ? '✔ Test Cases section found' : '✖ Missing *** Test Cases *** section',
      `File: ${activeFile}`,
    ].join('\n'))
    pulse('Validation complete')
  }

  const runPyodideCheck = async () => {
    if (!activeFile) return
    setRunning(true)
    try {
      setOutput('Loading Pyodide runtime...')
      const pyodide = await ensurePyodide()
      const text = files[activeFile] || ''
      pyodide.globals.set('robot_text', text)
      const result = pyodide.runPython(`
lines = robot_text.splitlines()
has_tc = any('*** Test Cases ***' in x for x in lines)
'Pyodide runtime check complete\\nTest Cases section: ' + ('FOUND' if has_tc else 'MISSING') + '\\nLine count: ' + str(len(lines))
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
      const primary = 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC'
      const fallback = 'Llama-3.2-1B-Instruct-q4f16_1-MLC'
      try {
        const e = await webllm.CreateMLCEngine(primary, { initProgressCallback: (p: any) => setAiStatus(`WebLLM primary: ${Math.round((p.progress || 0) * 100)}%`) })
        setEngine(e)
        setAiRoute('webllm-primary')
        setAiStatus(`Ready with ${primary}`)
      } catch {
        const e2 = await webllm.CreateMLCEngine(fallback, { initProgressCallback: (p: any) => setAiStatus(`WebLLM fallback: ${Math.round((p.progress || 0) * 100)}%`) })
        setEngine(e2)
        setAiRoute('webllm-fallback')
        setAiStatus(`Ready with ${fallback}`)
      }
      pulse('AI initialized')
    } catch {
      setAiRoute('wllama-fallback')
      setAiStatus('WebLLM unavailable. wllama GGUF fallback will be wired in next patch.')
    }
  }

  const explainWithAI = async () => {
    const text = files[activeFile] || ''
    if (!text) return
    if (engine) {
      const r = await engine.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a strict Robot Framework assistant. Keep output concise and practical.' },
          { role: 'user', content: `Review this Robot Framework file and provide issues + improvements:\n\n${text}` },
        ],
      })
      setOutput(r.choices?.[0]?.message?.content || 'No response')
      return
    }
    const hints = []
    if (!text.includes('*** Test Cases ***')) hints.push('Add *** Test Cases *** section.')
    if (!text.includes('*** Settings ***')) hints.push('Add *** Settings *** for clearer dependencies.')
    if (text.includes('Log    ')) hints.push('Replace placeholder Log steps with business-intent keywords.')
    if (!hints.length) hints.push('Structure looks good. Next: add assertions and reusable keywords.')
    setOutput(`[${aiRoute}]\n` + hints.map((h) => `- ${h}`).join('\n'))
  }

  const exportProject = async () => {
    const zip = new JSZip()
    Object.entries(files).forEach(([path, content]) => zip.file(path, content))
    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'robot-framework-ide-project.zip'
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
        <p className="subtle">Premium browser-native authoring. Built to feel obvious from first click.</p>
        <label>Robot Version</label>
        <select value={rfVersion} onChange={(e) => setRfVersion(e.target.value)}>
          {rfVersions.map((v) => <option key={v} value={v}>v{v}</option>)}
        </select>

        <div className="actions">
          <button onClick={createFile}>New</button>
          <button onClick={renameFile} disabled={!activeFile}>Rename</button>
          <button onClick={deleteFile} disabled={!activeFile}>Delete</button>
        </div>

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

        <h3>Starter Templates</h3>
        <div className="templateButtons">
          {Object.keys(starterTemplates).map((name) => <button key={name} onClick={() => loadTemplate(name)}>{name}</button>)}
        </div>

        <h3>Guided Learning Paths</h3>
        <div className="templateButtons">
          {learningPaths.map((p) => <button key={p.name} onClick={() => loadLearningPath(p.name)}>{p.name}</button>)}
        </div>
      </aside>

      <main className="main">
        <div className="hero">
          <h1>Ship Robot tests faster, with confidence.</h1>
          <p>Pick a template, edit, run checks, and ask AI for improvements.</p>
        </div>

        {showGuide && (
          <section className="guide">
            <div className="guideHead">
              <strong>Start in 30 seconds</strong>
              <button className="ghost" onClick={() => setShowGuide(false)}>Hide</button>
            </div>
            <div className="steps">
              <div><span>1</span>Choose <b>Best Practice</b> template</div>
              <div><span>2</span>Edit steps in the center editor</div>
              <div><span>3</span>Click <b>Run Check</b> then <b>Explain with AI</b></div>
            </div>
          </section>
        )}

        <div className="toolbar">
          <span>{activeFile || 'No file selected'}</span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={runValidation} disabled={!activeFile}>Run Check</button>
            <button onClick={runPyodideCheck} disabled={!activeFile || running}>{running ? 'Running...' : 'Run Runtime Check'}</button>
            <button onClick={initAI}>Init AI</button>
            <button onClick={explainWithAI} disabled={!activeFile}>Explain with AI</button>
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
            <p className="subtle">Route: Qwen 1.5B → Llama 1B → wllama fallback hook → heuristic.</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
