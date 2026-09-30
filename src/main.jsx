import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const WHY = [
  {
    id: 'scheduling', number: '01', title: 'Independent Scheduling', short: 'WHO GETS THE CPU?',
    color: 'blue',
    text: 'Each process has its own CPU state. The operating system can pause one process and give CPU time to another.',
    demo: 'The CPU switches between processes. They do not need to run at exactly the same moment.'
  },
  {
    id: 'memory', number: '02', title: 'Memory Isolation', short: 'WHO OWNS THE MEMORY?',
    color: 'green',
    text: 'Each process has its own virtual address space, helping protect one process from another.',
    demo: 'Document A and Document B get separate memory spaces. One process cannot simply overwrite the other.'
  },
  {
    id: 'resources', number: '03', title: 'Resource Ownership', short: 'WHO OWNS WHAT?',
    color: 'orange',
    text: 'Each process can have its own files, handles and other system resources.',
    demo: 'Different Word processes can work with different documents and resources independently.'
  },
  {
    id: 'fault', number: '04', title: 'Fault Isolation', short: 'WHAT IF ONE CRASHES?',
    color: 'purple',
    text: 'If one process crashes, the operating system can terminate that process while other processes keep running.',
    demo: 'Crash Process 1. Process 2 survives — showing why isolation matters.'
  }
];

function App() {
  const [active, setActive] = useState('scheduling');
  const [running, setRunning] = useState(1);
  const [crashed, setCrashed] = useState(false);
  const [presentation, setPresentation] = useState(false);
  const item = WHY.find(w => w.id === active);

  useEffect(() => {
    if (active !== 'scheduling') return;
    const timer = setInterval(() => setRunning(v => v === 1 ? 2 : 1), 1300);
    return () => clearInterval(timer);
  }, [active]);

  function choose(id) {
    setActive(id);
    if (id !== 'fault') setCrashed(false);
  }

  function reset() { setCrashed(false); setRunning(1); }

  return <div className="app">
    <header className="topbar">
      <div className="brand"><span className="brandMark">OS</span><span>PROCESS LAB</span></div>
      <div className="topActions"><span className="status"><i/> LIVE DEMO</span><button onClick={() => setPresentation(!presentation)}>{presentation ? 'EXIT PRESENTATION' : 'PRESENTATION MODE'}</button></div>
    </header>

    <main className={presentation ? 'presentation' : ''}>
      <section className="hero">
        <div className="eyebrow">OPERATING SYSTEMS / GROUP WORK / QUESTION 03</div>
        <h1>ONE PROGRAM.<br/><span>MANY PROCESSES.</span></h1>
        <p className="heroLead">A visual explanation of <strong>WHY</strong> multiple processes can execute the same program.</p>
      </section>

      <section className="model grid2">
        <div className="panel programPanel">
          <div className="panelTag">THE PROGRAM</div>
          <div className="programTitle"><div className="wordIcon">W</div><div><h2>WINWORD.EXE</h2><p>Same code on disk</p></div></div>
          <div className="arrowDown">↓</div>
          <div className="processes">
            <ProcessCard label="PROCESS 1" doc="Document A" state={crashed ? 'CRASHED' : 'RUNNING'} dead={crashed}/>
            <ProcessCard label="PROCESS 2" doc="Document B" state="RUNNING" />
          </div>
          <div className="formula"><b>1 PROGRAM</b><span>→</span><b>2 INDEPENDENT EXECUTIONS</b></div>
        </div>

        <div className={`panel whyPanel ${item.color}`}>
          <div className="panelTag">YOUR EXPLANATION</div>
          <div className="whyHeader"><div className="number">{item.number}</div><div><h2>{item.title}</h2><p>{item.short}</p></div></div>
          <p className="whyText">{item.text}</p>
          <div className="demoBox"><span className="demoLabel">WHAT THE ANIMATION SHOWS</span><p>{item.demo}</p></div>
          {active === 'fault' && <button className="bigAction" onClick={() => setCrashed(v => !v)}>{crashed ? '↻ RESET PROCESS' : '💥 CRASH PROCESS 1'}</button>}
        </div>
      </section>

      <section className="whyGrid">
        {WHY.map(w => <button key={w.id} className={`whyCard ${active === w.id ? 'selected' : ''} ${w.color}`} onClick={() => choose(w.id)}>
          <span className="cardNumber">{w.number}</span><span className="cardTitle">{w.title}</span><span className="cardHint">{w.short}</span><span className="go">→</span>
        </button>)}
      </section>

      {active === 'scheduling' && <section className="visualSection blueSection">
        <div className="sectionHead"><span>01 / CPU SCHEDULER</span><h2>THE OS SHARES THE CPU.</h2></div>
        <div className="cpuStage">
          <div className="cpu"><span>CPU</span><small>{running === 1 ? 'PROCESS 1' : 'PROCESS 2'}</small></div>
          <div className={`lane ${running === 1 ? 'active' : ''}`}><b>PROCESS 1</b><span>{running === 1 ? 'RUNNING' : 'WAITING'}</span></div>
          <div className="switch">↕<small>OS SWITCH</small></div>
          <div className={`lane ${running === 2 ? 'active' : ''}`}><b>PROCESS 2</b><span>{running === 2 ? 'RUNNING' : 'WAITING'}</span></div>
        </div>
      </section>}

      {active === 'memory' && <section className="visualSection greenSection">
        <div className="sectionHead"><span>02 / MEMORY</span><h2>SEPARATE ADDRESS SPACES.</h2></div>
        <div className="memoryStage"><MemoryBox name="PROCESS 1" doc="DOCUMENT A"/><div className="wall">✕<small>ISOLATED</small></div><MemoryBox name="PROCESS 2" doc="DOCUMENT B"/></div>
      </section>}

      {active === 'resources' && <section className="visualSection orangeSection">
        <div className="sectionHead"><span>03 / RESOURCES</span><h2>DIFFERENT PROCESSES, DIFFERENT RESOURCES.</h2></div>
        <div className="resourceStage"><Resource name="PROCESS 1" doc="Document A" handle="#123"/><div className="osCore">OS<br/><small>MANAGES</small></div><Resource name="PROCESS 2" doc="Document B" handle="#456"/></div>
      </section>}

      {active === 'fault' && <section className="visualSection purpleSection">
        <div className="sectionHead"><span>04 / FAULT ISOLATION</span><h2>ONE FAILURE DOESN'T HAVE TO TAKE EVERYTHING DOWN.</h2></div>
        <div className="faultStage"><div className={`faultProc ${crashed ? 'dead' : ''}`}><b>PROCESS 1</b><span>{crashed ? '✕ CRASHED' : '✓ RUNNING'}</span></div><div className="isolationLine">OS ISOLATES THE FAILURE</div><div className="faultProc"><b>PROCESS 2</b><span>✓ RUNNING</span></div></div>
        {!crashed && <button className="bigAction" onClick={() => setCrashed(true)}>💥 CRASH PROCESS 1</button>}
      </section>}

      <section className="takeaway"><div className="check">✓</div><div><span>THE TAKEAWAY</span><h2>The program is the code.<br/>The process is an independent execution of that code.</h2></div><button onClick={reset}>RESET DEMO ↻</button></section>
    </main>
    <footer><span>OS PROCESS LAB</span><span>ONE PROGRAM / MANY PROCESSES</span><span>GROUP WORK — QUESTION 03</span></footer>
  </div>
}

function ProcessCard({label, doc, state, dead}) { return <div className={`processCard ${dead ? 'dead' : ''}`}><div className="procTop"><b>{label}</b><span className={dead ? 'red' : 'green'}>{state}</span></div><div className="docIcon">▤</div><strong>{doc}</strong><small>private execution context</small></div> }
function MemoryBox({name, doc}) { return <div className="memoryBox"><b>{name}</b><div className="memLine code">CODE <span>shared / read-only</span></div><div className="memLine">DATA <span>{doc}</span></div><div className="memLine">HEAP <span>private</span></div><div className="memLine">STACK <span>private</span></div></div> }
function Resource({name, doc, handle}) { return <div className="resource"><b>{name}</b><div className="file">▤<strong>{doc}</strong></div><span>FILE HANDLE</span><code>{handle}</code></div> }

createRoot(document.getElementById('root')).render(<App />);
