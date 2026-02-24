import { useMemo, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import JSZip from 'jszip'
import './App.css'

type FileMap = Record<string, string>
type PyodideWindow = Window & { loadPyodide?: (opts?: unknown) => Promise<any>; __pyodide?: any }

type Chapter = { id: string; title: string; files: FileMap; objective: string }

const chapters: Chapter[] = [
  {
    id: '1',
    title: 'Foundations: Variables + Keywords',
    objective: 'Learn multi-file structure and shared keywords.',
    files: {
      'tests/01_foundation.robot': `*** Settings ***\nVariables    ../resources/variables.py\nResource     ../resources/common.resource\n\n*** Test Cases ***\nSample Smoke\n    Open App\n    Login As Default User`,
      'resources/common.resource': `*** Keywords ***\nOpen App\n    Log    Opening ${'$'}{BASE_URL}\n\nLogin As Default User\n    Log    Login with ${'$'}{DEFAULT_USER}`,
      'resources/variables.py': `BASE_URL = "https://example.test"\nDEFAULT_USER = "demo.user"\n`,
    },
  },
  {
    id: '2',
    title: 'POM + Locators',
    objective: 'Use page object resources and locator variables.',
    files: {
      'tests/02_pom.robot': `*** Settings ***\nResource    ../pages/login_page.resource\n\n*** Test Cases ***\nLogin Through POM\n    Given User Opens Login Page\n    When User Signs In\n    Then User Should Reach Home`,
      'pages/login_page.resource': `*** Variables ***\n${'$'}{LOGIN_USER}    css:#username\n${'$'}{LOGIN_PASS}    css:#password\n\n*** Keywords ***\nGiven User Opens Login Page\n    Log    Open login page\nWhen User Signs In\n    Log    Type creds and submit\nThen User Should Reach Home\n    Log    Assert /home`,
    },
  },
]

async function ensurePyodideAndRobot(setTerminal: (x: (prev: string[]) => string[]) => void) {
  const w = window as PyodideWindow
  if (!w.loadPyodide) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.3/full/pyodide.js'
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load Pyodide'))
      document.body.appendChild(script)
    })
  }

  if (!w.__pyodide) {
    setTerminal((p) => [...p, '$ boot pyodide', 'Loading Python runtime...'])
    w.__pyodide = await w.loadPyodide?.({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.3/full/' })
  }

  const pyodide = w.__pyodide
  if (!pyodide.globals.get('__robot_ready__')) {
    setTerminal((p) => [...p, 'Installing robotframework (first run may take time)...'])
    await pyodide.loadPackage('micropip')
    await pyodide.runPythonAsync(`
import micropip
await micropip.install('robotframework')
__robot_ready__ = True
`)
    setTerminal((p) => [...p, 'robotframework installed'])
  }
  return pyodide
}

function App() {
  const [selectedChapterId, setSelectedChapterId] = useState(chapters[0].id)
  const selectedChapter = useMemo(() => chapters.find((c) => c.id === selectedChapterId)!, [selectedChapterId])
  const [files, setFiles] = useState<FileMap>(selectedChapter.files)
  const [activeFile, setActiveFile] = useState(Object.keys(selectedChapter.files)[0])
  const [terminal, setTerminal] = useState<string[]>(['Robot IDE ready. Type a command below.'])
  const [cmd, setCmd] = useState('robot tests/01_foundation.robot')
  const [rightOpen, setRightOpen] = useState(false)
  const [aiText, setAiText] = useState('Click "Grade Chapter Task" to open AI Coach.')
  const [output, setOutput] = useState('')
  const importRef = useRef<HTMLInputElement>(null)

  const fileList = useMemo(() => Object.keys(files).sort(), [files])

  const loadChapter = (id: string) => {
    const c = chapters.find((x) => x.id === id)
    if (!c) return
    setSelectedChapterId(id)
    setFiles(c.files)
    setActiveFile(Object.keys(c.files).sort()[0])
    setTerminal((p) => [...p, `Loaded chapter ${id}: ${c.title}`])
  }

  const createFile = () => {
    const name = prompt('New file path')
    if (!name || files[name]) return
    setFiles((p) => ({ ...p, [name]: '' }))
    setActiveFile(name)
  }

  const createFolder = () => {
    const folder = prompt('New folder name (example: pages)')
    if (!folder) return
    const placeholder = `${folder}/.keep`
    if (files[placeholder]) return
    setFiles((p) => ({ ...p, [placeholder]: '' }))
    setActiveFile(placeholder)
  }

  const renameFile = () => {
    const next = prompt('Rename file to', activeFile)
    if (!next || next === activeFile || files[next]) return
    const content = files[activeFile]
    setFiles((p) => {
      const c = { ...p }
      delete c[activeFile]
      c[next] = content
      return c
    })
    setActiveFile(next)
  }

  const deleteFile = () => {
    if (!confirm(`Delete ${activeFile}?`)) return
    setFiles((p) => {
      const c = { ...p }
      delete c[activeFile]
      return c
    })
    const next = fileList.filter((f) => f !== activeFile)[0] || ''
    setActiveFile(next)
  }

  const exportZip = async () => {
    const zip = new JSZip()
    Object.entries(files).forEach(([k, v]) => zip.file(k, v))
    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chapter-${selectedChapterId}.zip`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importZip = async (file?: File) => {
    if (!file) return
    const zip = await JSZip.loadAsync(await file.arrayBuffer())
    const next: FileMap = {}
    for (const path of Object.keys(zip.files)) {
      const f = zip.files[path]
      if (!f.dir) next[path] = await f.async('string')
    }
    if (Object.keys(next).length) {
      setFiles(next)
      setActiveFile(Object.keys(next).sort()[0])
    }
  }

  const runCommand = async () => {
    const command = cmd.trim()
    if (!command) return
    setTerminal((p) => [...p, `$ ${command}`])

    try {
      const pyodide = await ensurePyodideAndRobot(setTerminal)

      // sync editor files to pyodide FS
      await pyodide.runPythonAsync(`
import os
for p in ['tests','resources','pages','artifacts']:
    os.makedirs(p, exist_ok=True)
`)
      for (const [path, content] of Object.entries(files)) {
        const escaped = content.replace(/\\/g, '\\\\').replace(/`/g, '\\`')
        const dir = path.includes('/') ? path.split('/').slice(0, -1).join('/') : ''
        if (dir) await pyodide.runPythonAsync(`import os; os.makedirs('${dir}', exist_ok=True)`)
        await pyodide.runPythonAsync(`open('${path}','w',encoding='utf-8').write(
'''${escaped}''')`)
      }

      if (command.startsWith('robot ')) {
        const args = command.replace(/^robot\s+/, '').split(' ').filter(Boolean)
        const py = `
from robot import run_cli
import io, contextlib
buf = io.StringIO()
code = 0
try:
    with contextlib.redirect_stdout(buf), contextlib.redirect_stderr(buf):
        code = run_cli(${JSON.stringify(args)}, exit=False)
except Exception as e:
    buf.write(str(e))
buf.getvalue()
`
        const result = await pyodide.runPythonAsync(py)
        const text = String(result || '').trim() || '(no output)'
        setTerminal((p) => [...p, text])
        setOutput(text)
      } else if (command === 'help') {
        setTerminal((p) => [...p, 'Commands:', 'robot <suite.robot>', 'help', 'clear'])
      } else if (command === 'clear') {
        setTerminal(['Terminal cleared.'])
      } else {
        setTerminal((p) => [...p, 'Unknown command. Try: help'])
      }
    } catch (e) {
      setTerminal((p) => [...p, `Error: ${(e as Error).message}`])
    }
  }

  const gradeChapterTask = () => {
    setRightOpen(true)
    const text = files[activeFile] || ''
    const score = [text.includes('*** Settings ***'), text.includes('*** Test Cases ***'), text.length > 40].filter(Boolean).length
    setAiText(`Chapter: ${selectedChapter.title}\n\nObjective: ${selectedChapter.objective}\n\nRubric score: ${score}/3\n- Include Settings\n- Include Test Cases\n- Add meaningful steps`) 
  }

  return (
    <div className={`vscode ${rightOpen ? 'right-open' : 'right-closed'}`}>
      <header className="topbar">
        <div className="brand">
          <strong>Robot Framework IDE</strong>
          <span className="muted">Browser-first learning lab</span>
        </div>
        <div className="top-actions">
          <label>Chapter</label>
          <select value={selectedChapterId} onChange={(e) => loadChapter(e.target.value)}>
            {chapters.map((c) => <option key={c.id} value={c.id}>Chapter {c.id}: {c.title}</option>)}
          </select>
          <button onClick={gradeChapterTask}>Check My Solution</button>
        </div>
      </header>

      <aside className="left">
        <div className="explorer-head">
          <strong>Explorer</strong>
          <div className="icon-actions">
            <button title="New File" onClick={createFile}>+File</button>
            <button title="New Folder" onClick={createFolder}>+Folder</button>
            <button title="Rename" onClick={renameFile}>Rename</button>
            <button title="Delete" onClick={deleteFile}>Delete</button>
          </div>
        </div>
        <div className="icon-actions block">
          <button onClick={exportZip}>Export</button>
          <button onClick={() => importRef.current?.click()}>Import</button>
          <input ref={importRef} type="file" accept=".zip" style={{ display: 'none' }} onChange={(e) => importZip(e.target.files?.[0])} />
        </div>
        <ul className="filetree">
          {fileList.map((f) => <li key={f} className={f === activeFile ? 'active' : ''} onClick={() => setActiveFile(f)}>{f}</li>)}
        </ul>
      </aside>

      <main className="center">
        <div className="editor-head">{activeFile || 'No file selected'}</div>
        <Editor
          height="48vh"
          language="python"
          value={activeFile ? files[activeFile] : ''}
          onChange={(v) => activeFile && setFiles((p) => ({ ...p, [activeFile]: v ?? '' }))}
          theme="vs-dark"
          options={{ minimap: { enabled: false }, fontSize: 14 }}
        />
        <div className="terminal">
          <div className="terminal-log">
            {terminal.slice(-120).map((line, i) => <div key={i}>{line}</div>)}
          </div>
          <div className="terminal-input">
            <input value={cmd} onChange={(e) => setCmd(e.target.value)} placeholder="robot tests/01_foundation.robot" onKeyDown={(e) => e.key === 'Enter' && runCommand()} />
            <button onClick={runCommand}>Execute CLI</button>
          </div>
        </div>
      </main>

      <aside className={`right ${rightOpen ? 'open' : 'collapsed'}`}>
        <div className="right-head">
          {rightOpen ? <strong>AI Coach</strong> : <strong>AI</strong>}
          <button onClick={() => setRightOpen((x) => !x)}>{rightOpen ? '⟩' : '⟨'}</button>
        </div>
        {rightOpen && (
          <>
            <pre className="coach">{aiText}</pre>
            <h4>CLI Output</h4>
            <pre className="coach">{output || 'No output yet.'}</pre>
          </>
        )}
      </aside>
    </div>
  )
}

export default App
