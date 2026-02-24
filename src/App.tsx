import { useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import Editor from '@monaco-editor/react'
import JSZip from 'jszip'
import './App.css'
import { generateCoachResponse, runCoachEval } from './coach'
import { bookChapters, type Chapter } from './bookChapters'

type FileMap = Record<string, string>
type PyodideWindow = Window & { loadPyodide?: (opts?: unknown) => Promise<any>; __pyodide?: any }
type Artifact = { path: string; content: string }

const chapters: Chapter[] = bookChapters

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

const configureRobotMonaco = (monaco: any) => {
  if (!monaco.languages.getLanguages().some((l: any) => l.id === 'robotframework')) {
    monaco.languages.register({ id: 'robotframework' })
    monaco.languages.setMonarchTokensProvider('robotframework', {
      tokenizer: {
        root: [
          [/^\*\*\*\s*(Settings|Variables|Test Cases|Keywords|Comments)\s*\*\*\*/, 'keyword.section'],
          [/\$\{[^\}]+\}/, 'variable'],
          [/\b(Log|Should Be Equal|Should Contain|FOR|END|IF|ELSE|Suite Setup|Suite Teardown|Resource|Variables|Library)\b/, 'keyword'],
          [/\[[^\]]+\]/, 'type'],
          [/^\s{2,}.+$/, 'string'],
        ],
      },
    })
  }
}

function App() {
  const [selectedChapterId, setSelectedChapterId] = useState(chapters[0].id)
  const selectedChapter = useMemo(() => chapters.find((c) => c.id === selectedChapterId)!, [selectedChapterId])
  const [files, setFiles] = useState<FileMap>(selectedChapter.files)
  const [activeFile, setActiveFile] = useState(Object.keys(selectedChapter.files)[0])
  const [terminal, setTerminal] = useState<string[]>(['Robot IDE ready. Type a command below.'])
  const [cmd, setCmd] = useState(`robot ${selectedChapter.entrypoint}`)
  const [lastCmd, setLastCmd] = useState(`robot ${selectedChapter.entrypoint}`)
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [rightOpen, setRightOpen] = useState(false)
  const [aiText, setAiText] = useState('Click "Check My Solution" to open AI Coach.')
  const [output, setOutput] = useState('')
  const [runtimeHealth, setRuntimeHealth] = useState<'ok'|'degraded'>('ok')
  const [fetchError, setFetchError] = useState('')
  const [artifacts, setArtifacts] = useState<Artifact[]>([])
  const [contextMenu, setContextMenu] = useState<{x:number;y:number;file:string}|null>(null)
  const [coachInput, setCoachInput] = useState('')
  const [coachChat, setCoachChat] = useState<Array<{role:'user'|'assistant'; text:string}>>([])
  const [coachTopPct, setCoachTopPct] = useState(55)
  const [isResizingCoach, setIsResizingCoach] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const importRef = useRef<HTMLInputElement>(null)

  const fileList = useMemo(() => Object.keys(files).sort(), [files])

  const loadChapter = (id: string) => {
    const c = chapters.find((x) => x.id === id)
    if (!c) return
    setSelectedChapterId(id)
    setFiles(c.files)
    setActiveFile(Object.keys(c.files).sort()[0])
    setTerminal((p) => [...p, `Loaded chapter ${id}: ${c.title}`])
    setCmd(`robot ${c.entrypoint}`)
    setLastCmd(`robot ${c.entrypoint}`)
    setArtifacts([])
  }

  const createFile = () => {
    const name = prompt('New file path')
    if (!name || files[name]) return
    setFiles((p) => ({ ...p, [name]: '' }))
    setActiveFile(name)
  }

  const createFolder = () => {
    const folder = prompt('New folder name')
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
    setActiveFile(fileList.find((f) => f !== activeFile) || '')
  }

  const exportZip = async () => {
    const zip = new JSZip()
    Object.entries(files).forEach(([k, v]) => zip.file(k, v))
    const blob = await zip.generateAsync({ type: 'blob' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `chapter-${selectedChapterId}.zip`
    a.click()
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

  const downloadSampleImportZip = async () => {
    const zip = new JSZip()
    zip.file('tests/sample.robot', `*** Settings ***\nResource    ../resources/common.resource\n\n*** Test Cases ***\nSample Import Flow\n    Open App`)
    zip.file('resources/common.resource', `*** Keywords ***\nOpen App\n    Log    App opened`)
    zip.file('README-run.md', `Run this sample:\nrobot tests/sample.robot\n\nOptional artifacts:\nrobot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html tests/sample.robot`)
    const blob = await zip.generateAsync({ type: 'blob' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'robot-ide-import-sample.zip'
    a.click()
  }

  const syncFilesToPyodide = async (pyodide: any) => {
    await pyodide.runPythonAsync(`
import os
for p in ['tests','resources','pages','artifacts']:
    os.makedirs(p, exist_ok=True)
`)
    for (const [path, content] of Object.entries(files)) {
      const escaped = content.replace(/\\/g, '\\\\').replace(/`/g, '\\`')
      const dir = path.includes('/') ? path.split('/').slice(0, -1).join('/') : ''
      if (dir) await pyodide.runPythonAsync(`import os; os.makedirs('${dir}', exist_ok=True)`)
      await pyodide.runPythonAsync(`open('${path}','w',encoding='utf-8').write('''${escaped}''')`)
    }
  }

  const refreshArtifacts = async (pyodide: any) => {
    const result = await pyodide.runPythonAsync(`
import os
items=[]
if os.path.exists('artifacts'):
  for n in os.listdir('artifacts'):
    p='artifacts/'+n
    if os.path.isfile(p):
      try:
        c=open(p,'r',encoding='utf-8',errors='ignore').read()
      except:
        c='[binary artifact]'
      items.append((p,c[:200000]))
items
`)
    const mapped = Array.isArray(result) ? result.map((x: any) => ({ path: x[0], content: x[1] })) : []
    setArtifacts(mapped)
  }

  const runCoachSelfTest = () => {
    const result = runCoachEval({
      chapterId: selectedChapter.id,
      chapterTitle: selectedChapter.title,
      objective: selectedChapter.objective,
      activeFile,
      activeText: files[activeFile] || '',
      lastCmd,
      terminalTail: terminal.slice(-10),
      artifacts: artifacts.map((a) => a.path),
    })

    const summary = [`Coach self-test: ${result.pass}/${result.total} passing`, ...result.lines].join('\n')
    setTerminal((p) => [...p, summary])
    setOutput(summary)
  }

  const runCommand = async () => {
    const command = cmd.trim()
    if (!command) return
    setLastCmd(command)
    setCmdHistory((h) => [...h, command])
    setHistoryIdx(-1)
    setFetchError('')
    setTerminal((p) => [...p, `$ ${command}`])

    try {
      const pyodide = await ensurePyodideAndRobot(setTerminal)
      await syncFilesToPyodide(pyodide)

      if (command.startsWith('robot ')) {
        const args = command.replace(/^robot\s+/, '').split(' ').filter(Boolean)
        const py = `
from robot import run_cli
import io, contextlib
buf = io.StringIO()
try:
    with contextlib.redirect_stdout(buf), contextlib.redirect_stderr(buf):
        run_cli(${JSON.stringify(args)}, exit=False)
except Exception as e:
    buf.write(str(e))
buf.getvalue()
`
        const result = await pyodide.runPythonAsync(py)
        const text = String(result || '').trim() || '(no output)'
        setTerminal((p) => [...p, text])
        setOutput(text)
        setRuntimeHealth('ok')
        await refreshArtifacts(pyodide)
      } else if (command === 'help') {
        setTerminal((p) => [...p, 'Commands: robot <suite.robot>, coach:selftest, help, clear'])
      } else if (command === 'coach:selftest') {
        runCoachSelfTest()
      } else if (command === 'clear') {
        setTerminal(['Terminal cleared.'])
      } else {
        setTerminal((p) => [...p, 'Unknown command. Try: help'])
      }
    } catch (e) {
      const msg = (e as Error).message
      setTerminal((p) => [...p, `Error: ${msg}`])
      setOutput(`Command failed: ${msg}`)
      setRuntimeHealth('degraded')
      if (/fetch|network|resolve|dns/i.test(msg)) setFetchError(`Runtime fetch failed: ${msg}`)
    }
  }

  const toggleAICoach = () => setRightOpen((x) => !x)

  const gradeChapterTask = () => {
    setRightOpen(true)
    const text = files[activeFile] || ''
    const score = [text.includes('*** Settings ***'), text.includes('*** Test Cases ***'), text.length > 40].filter(Boolean).length
    setAiText(`Chapter: ${selectedChapter.title}\n\nObjective: ${selectedChapter.objective}\n\nRubric score: ${score}/3\n- Include Settings\n- Include Test Cases\n- Add meaningful steps`)
  }

  const openArtifact = (a: Artifact) => {
    setRightOpen(true)
    setAiText(`Artifact: ${a.path}\n\n${a.content.slice(0, 5000)}`)
  }

  const sendCoachMessage = () => {
    const q = coachInput.trim()
    if (!q) return

    const response = generateCoachResponse(q, {
      chapterId: selectedChapter.id,
      chapterTitle: selectedChapter.title,
      objective: selectedChapter.objective,
      activeFile,
      activeText: files[activeFile] || '',
      lastCmd,
      terminalTail: terminal.slice(-10),
      artifacts: artifacts.map((a) => a.path),
    })

    setCoachChat((c) => [...c, { role: 'user', text: q }, { role: 'assistant', text: response }])
    setCoachInput('')
    setRightOpen(true)
  }

  const onFileContextMenu = (e: MouseEvent<HTMLLIElement>, file: string) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY, file })
  }

  const closeContextMenu = () => setContextMenu(null)

  const onCmdKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand()
      return
    }
    if (e.key === 'ArrowUp' && cmdHistory.length) {
      e.preventDefault()
      const nextIdx = historyIdx < 0 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1)
      setHistoryIdx(nextIdx)
      setCmd(cmdHistory[nextIdx])
    }
    if (e.key === 'ArrowDown' && cmdHistory.length) {
      e.preventDefault()
      const nextIdx = historyIdx >= cmdHistory.length - 1 ? -1 : historyIdx + 1
      setHistoryIdx(nextIdx)
      setCmd(nextIdx === -1 ? '' : cmdHistory[nextIdx])
    }
  }

  const onCoachMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!isResizingCoach) return
    const el = e.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    const pct = Math.min(80, Math.max(30, ((e.clientY - rect.top) / rect.height) * 100))
    setCoachTopPct(pct)
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
          <span className={`health ${runtimeHealth}`}>runtime: {runtimeHealth}</span>
          <button onClick={() => setShowHelp(true)}>Help</button>
          <button onClick={toggleAICoach}>AI Coach</button>
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

        <ul className="filetree" onClick={closeContextMenu}>
          {fileList.map((f) => (
            <li
              key={f}
              className={f === activeFile ? 'active' : ''}
              onClick={() => setActiveFile(f)}
              onContextMenu={(e) => onFileContextMenu(e, f)}
              title={f}
            >
              {f}
            </li>
          ))}
        </ul>

        <h4 className="artifacts-title">Artifacts</h4>
        <ul className="filetree artifacts-list">
          {artifacts.length === 0 && <li className="muted-li">No artifacts yet</li>}
          {artifacts.map((a) => <li key={a.path} onClick={() => openArtifact(a)} title={a.path}>{a.path}</li>)}
        </ul>

        <div className="left-footer">
          <button onClick={exportZip}>Export</button>
          <button onClick={() => importRef.current?.click()}>Import</button>
          <input ref={importRef} type="file" accept=".zip" style={{ display: 'none' }} onChange={(e) => importZip(e.target.files?.[0])} />
        </div>
      </aside>

      <main className="center">
        <div className="editor-head">{activeFile || 'No file selected'}</div>
        <div className="editor-pane">
          <Editor
            height="100%"
            beforeMount={configureRobotMonaco}
            language={activeFile.endsWith('.robot') || activeFile.endsWith('.resource') ? 'robotframework' : activeFile.endsWith('.py') ? 'python' : 'plaintext'}
            value={activeFile ? files[activeFile] : ''}
            onChange={(v) => activeFile && setFiles((p) => ({ ...p, [activeFile]: v ?? '' }))}
            theme="vs-dark"
            options={{ minimap: { enabled: false }, fontSize: 14, lineNumbers: 'on' }}
          />
        </div>

        <div className="terminal">
          {fetchError && (
            <div className="error-banner">
              <span>{fetchError}</span>
              <button onClick={() => { setCmd(lastCmd); runCommand() }}>Retry</button>
            </div>
          )}
          <div className="terminal-log">
            {terminal.slice(-160).map((line, i) => <div key={i}>{line}</div>)}
          </div>
          <div className="terminal-input">
            <input value={cmd} onChange={(e) => setCmd(e.target.value)} placeholder={`robot ${selectedChapter.entrypoint}`} onKeyDown={onCmdKeyDown} />
            <button onClick={runCommand}>Execute CLI</button>
          </div>
        </div>
      </main>

      <aside className={`right ${rightOpen ? 'open' : 'collapsed'}`} onMouseMove={onCoachMouseMove} onMouseUp={() => setIsResizingCoach(false)} onMouseLeave={() => setIsResizingCoach(false)}>
        {rightOpen && (
          <>
            <div className="right-head" title="AI Coach panel">
              <button onClick={gradeChapterTask}>Check Solution</button>
            </div>
            <div className="coach-layout" style={{ gridTemplateRows: `${coachTopPct}% 8px auto` }}>
              <div className="coach-top">
                <pre className="coach">{aiText}</pre>
                <h4>CLI Output</h4>
                <pre className="coach">{output || 'No output yet.'}</pre>
              </div>
              <div className="coach-splitter" onMouseDown={() => setIsResizingCoach(true)} title="Drag to resize" />
              <div className="coach-bottom">
                <h4>Ask AI Coach</h4>
                <div className="coach-chat">
                  {coachChat.length === 0 && <div className="coach-empty">Ask anything about current chapter, file, or terminal error.</div>}
                  {coachChat.map((m, i) => <div key={i} className={`bubble ${m.role}`}>{m.text}</div>)}
                </div>
                <div className="coach-input">
                  <input value={coachInput} onChange={(e) => setCoachInput(e.target.value)} placeholder="Ask a question..." onKeyDown={(e) => e.key === 'Enter' && sendCoachMessage()} />
                  <button onClick={sendCoachMessage}>Send</button>
                </div>
              </div>
            </div>
          </>
        )}
      </aside>

      {contextMenu && (
        <div className="context-menu" style={{ left: contextMenu.x, top: contextMenu.y }}>
          <button onClick={() => { setActiveFile(contextMenu.file); renameFile(); closeContextMenu() }}>Rename</button>
          <button onClick={() => { setActiveFile(contextMenu.file); deleteFile(); closeContextMenu() }}>Delete</button>
          <button onClick={() => { setActiveFile(contextMenu.file); createFile(); closeContextMenu() }}>New File</button>
        </div>
      )}

      {showHelp && (
        <div className="help-overlay" onClick={() => setShowHelp(false)}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            <div className="help-head">
              <h3>Robot IDE Quick Guide</h3>
              <button onClick={() => setShowHelp(false)}>Close</button>
            </div>
            <ul>
              <li><b>Chapter dropdown:</b> load a guided lesson project.</li>
              <li><b>Explorer:</b> create/rename/delete files, import/export zip.</li>
              <li><b>Right-click file:</b> rename/delete/new file actions.</li>
              <li><b>Terminal:</b> run commands like <code>robot tests/01_foundation.robot</code>.</li>
              <li><b>Artifacts:</b> generated report/log/output files appear in left panel after run.</li>
              <li><b>AI Coach:</b> open panel, check solution, ask questions in chat.</li>
            </ul>
            <h4>Import format expectation</h4>
            <p>Import a zip with project-style paths (e.g. <code>tests/*.robot</code>, <code>resources/*.resource</code>).</p>
            <button onClick={downloadSampleImportZip}>Download sample import zip</button>
          </div>
        </div>
      )}

      <div className="build-stamp">build {(import.meta as any).env?.VITE_BUILD_ID || 'local'}</div>
    </div>
  )
}

export default App
