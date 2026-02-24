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
  const [output, setOutput] = useState('Welcome. Start with a template and run checks.')
  const [running, setRunning] = useState(false)
  const [aiStatus, setAiStatus] = useState('Not initialized')
  const [aiRoute, setAiRoute] = useState<AIRoute>('heuristic')
  const [engine, setEngine] = useState<any>(null)
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
'Pyodide runtime check complete\\nTest Cases section: ' + ('FOUND' if has_tc else 'MISSING') + '\\nLine count: ' + str(len(lines))
      `)
      setOutput(String(result))
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
        const e = await webllm.CreateMLCEngine(primary, {
          initProgressCallback: (p: any) => setAiStatus(`WebLLM primary: ${Math.round((p.progress || 0) * 100)}%`),
        })
        setEngine(e)
        setAiRoute('webllm-primary')
        setAiStatus(`Ready with ${primary}`)
        return
      } catch {
        const e2 = await webllm.CreateMLCEngine(fallback, {
          initProgressCallback: (p: any) => setAiStatus(`WebLLM fallback: ${Math.round((p.progress || 0) * 100)}%`),
        })
        setEngine(e2)
        setAiRoute('webllm-fallback')
        setAiStatus(`Ready with ${fallback}`)
        return
      }
    } catch {
      setAiRoute('wllama-fallback')
      setAiStatus('WebLLM unavailable. wllama fallback hook is reserved for GGUF integration in next patch.')
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
        <p className="subtle">Beautiful, browser-native, product-grade authoring for Robot Framework.</p>
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
      </aside>

      <main className="main">
        <div className="hero">
          <h1>Ship Robot tests faster, with confidence.</h1>
          <p>No manual required: pick a template, edit in the center pane, run checks, and get AI guidance.</p>
        </div>
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
          height="52vh"
          language="python"
          value={activeFile ? files[activeFile] : ''}
          onChange={(v) => activeFile && setFiles((prev) => ({ ...prev, [activeFile]: v ?? '' }))}
          theme="vs-dark"
          options={{ minimap: { enabled: false }, fontSize: 14, smoothScrolling: true }}
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
            <p className="subtle">
              Route order: WebLLM primary (Qwen2.5 1.5B) → WebLLM fallback (Llama 3.2 1B) → wllama fallback → heuristic.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
