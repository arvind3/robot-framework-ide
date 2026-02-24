import { useMemo, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import JSZip from 'jszip'
import './App.css'

type FileMap = Record<string, string>
type PyodideWindow = Window & { loadPyodide?: (opts?: unknown) => Promise<any>; __pyodide?: any }

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
  'API Test': {
    'tests/api.robot': `*** Settings ***
Library    RequestsLibrary

*** Test Cases ***
Ping API
    Log    Replace with API call`,
  },
}

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
  const [output, setOutput] = useState('Ready. Select a file and run validation.')
  const [running, setRunning] = useState(false)
  const importRef = useRef<HTMLInputElement>(null)

  const fileList = useMemo(() => Object.keys(files).sort(), [files])

  const createFile = () => {
    const name = prompt('New file path (example: tests/new.robot)')
    if (!name || files[name]) return
    setFiles((prev) => ({ ...prev, [name]: '*** Test Cases ***\nNew Test\n    Log    Hello' }))
    setActiveFile(name)
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
  }

  const loadTemplate = (name: string) => {
    const tpl = starterTemplates[name]
    setFiles(tpl)
    setActiveFile(Object.keys(tpl)[0])
    setOutput(`Loaded template: ${name}`)
  }

  const runValidation = () => {
    const text = files[activeFile] || ''
    const hasSection = text.includes('*** Test Cases ***')
    const msg = [
      `Robot Framework v${rfVersion} check complete`,
      hasSection ? '✔ Test Cases section found' : '✖ Missing *** Test Cases *** section',
      `File: ${activeFile}`,
      '',
      'Next: full runtime switch implementation with RF wheel sets.',
    ].join('\n')
    setOutput(msg)
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
msg = []
msg.append('Pyodide runtime check complete')
msg.append('Test Cases section: ' + ('FOUND' if has_tc else 'MISSING'))
msg.append('Line count: ' + str(len(lines)))
'\\n'.join(msg)
      `)
      setOutput(`${result}\n\nNote: full Robot execution + RF version packs is next phase.`)
    } catch (e) {
      setOutput(`Runtime error: ${(e as Error).message}`)
    } finally {
      setRunning(false)
    }
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
    }
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Robot Framework IDE</h2>
        <label>Version</label>
        <select value={rfVersion} onChange={(e) => setRfVersion(e.target.value)}>
          {rfVersions.map((v) => (
            <option key={v} value={v}>v{v}</option>
          ))}
        </select>

        <div className="actions">
          <button onClick={createFile}>New</button>
          <button onClick={renameFile} disabled={!activeFile}>Rename</button>
          <button onClick={deleteFile} disabled={!activeFile}>Delete</button>
        </div>

        <div className="templateButtons" style={{ marginTop: 10 }}>
          <button onClick={exportProject}>Export ZIP</button>
          <button onClick={() => importRef.current?.click()}>Import ZIP</button>
          <input
            ref={importRef}
            type="file"
            accept=".zip"
            style={{ display: 'none' }}
            onChange={(e) => importProject(e.target.files?.[0])}
          />
        </div>

        <h3>Files</h3>
        <ul>
          {fileList.map((file) => (
            <li key={file} className={file === activeFile ? 'active' : ''} onClick={() => setActiveFile(file)}>
              {file}
            </li>
          ))}
        </ul>

        <h3>Starter Templates</h3>
        <div className="templateButtons">
          {Object.keys(starterTemplates).map((name) => (
            <button key={name} onClick={() => loadTemplate(name)}>{name}</button>
          ))}
        </div>
      </aside>

      <main className="main">
        <div className="toolbar">
          <span>{activeFile || 'No file selected'}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={runValidation} disabled={!activeFile}>Run Check</button>
            <button onClick={runPyodideCheck} disabled={!activeFile || running}>{running ? 'Running...' : 'Run Runtime Check'}</button>
          </div>
        </div>
        <Editor
          height="58vh"
          defaultLanguage="python"
          language="python"
          value={activeFile ? files[activeFile] : ''}
          onChange={(v) => activeFile && setFiles((prev) => ({ ...prev, [activeFile]: v ?? '' }))}
          theme="vs-dark"
          options={{ minimap: { enabled: false }, fontSize: 14 }}
        />

        <section className="panels">
          <div>
            <h3>Output</h3>
            <pre>{output}</pre>
          </div>
          <div>
            <h3>AI Assistant (planned)</h3>
            <p>
              WebLLM (small model) + WASM fallback (wllama) roadmap: explain failures, suggest keywords,
              and generate test skeletons directly from selected files.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
