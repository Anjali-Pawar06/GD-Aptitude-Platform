import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
  Activity, BarChart3, Brain, CheckCircle2, ChevronRight, Clock3, FileText,
  LayoutDashboard, LogOut, Menu, MessageSquare, Play, ShieldCheck, Sparkles,
  Target, Trophy, Users, X, Mic, Video, Send, ArrowLeft, Search, BookOpen
} from 'lucide-react'
import { aiParticipants, gdTopics, questions } from './data'

type UserRole = 'student' | 'admin'
type User = { name: string; role: UserRole }

function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('hiresprint_user')
    return saved ? JSON.parse(saved) : null
  })
  const login = (u: User) => { localStorage.setItem('hiresprint_user', JSON.stringify(u)); setUser(u) }
  const logout = () => { localStorage.removeItem('hiresprint_user'); setUser(null) }
  return { user, login, logout }
}

function Protected({ children, role }: { children: React.ReactNode; role?: UserRole }) {
  const saved = localStorage.getItem('hiresprint_user')
  const user: User | null = saved ? JSON.parse(saved) : null
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} replace />
  return <>{children}</>
}

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [role, setRole] = useState<UserRole>('student')
  const [email, setEmail] = useState('student@hiresprint.com')
  const [password, setPassword] = useState('student123')
  const [error, setError] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const ok = role === 'student'
      ? email === 'student@hiresprint.com' && password === 'student123'
      : email === 'admin@hiresprint.com' && password === 'admin123'
    if (!ok) return setError('Invalid demo credentials.')
    login({ name: role === 'student' ? 'Aditi' : 'Placement Admin', role })
    navigate(role === 'student' ? '/student/dashboard' : '/admin/dashboard')
  }

  return <div className="min-h-screen grid lg:grid-cols-2 bg-slate-950">
    <div className="hidden lg:flex relative overflow-hidden p-14 text-white items-end">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-950" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="relative max-w-xl">
        <div className="brand mb-8"><span className="brand-mark">H</span> Hiresprint</div>
        <h1 className="text-5xl font-bold leading-tight">Prepare smarter.<br/>Assess better.</h1>
        <p className="mt-6 text-slate-300 text-lg">One platform for aptitude assessments, AI-powered Group Discussions, live practice and measurable placement readiness.</p>
        <div className="mt-10 flex gap-3 flex-wrap">
          {['Aptitude','AI GD','Live GD','Analytics'].map(x => <span key={x} className="pill dark">{x}</span>)}
        </div>
      </div>
    </div>
    <div className="bg-slate-50 flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-md">
        <div className="lg:hidden brand mb-10"><span className="brand-mark">H</span> Hiresprint</div>
        <div className="card p-8">
          <div className="mb-7">
            <p className="eyebrow">Welcome back</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">Sign in to Hiresprint</h2>
            <p className="text-slate-500 mt-2">Continue your placement preparation.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-6">
            <button type="button" className={role === 'student' ? 'role-btn active' : 'role-btn'} onClick={() => {setRole('student'); setEmail('student@hiresprint.com'); setPassword('student123')}}>Student</button>
            <button type="button" className={role === 'admin' ? 'role-btn active' : 'role-btn'} onClick={() => {setRole('admin'); setEmail('admin@hiresprint.com'); setPassword('admin123')}}>Admin</button>
          </div>
          <label>Email<input value={email} onChange={e=>setEmail(e.target.value)} className="input" /></label>
          <label className="mt-4 block">Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="input" /></label>
          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
          <button className="btn-primary w-full mt-6">Login <ChevronRight size={17}/></button>
          <p className="text-xs text-slate-400 mt-5 text-center">Demo credentials are prefilled. Production authentication will use the backend.</p>
        </div>
      </form>
    </div>
  </div>
}

function Shell({ children, role }: { children: React.ReactNode; role: UserRole }) {
  const { logout } = useAuth()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const studentLinks = [
    ['/student/dashboard','Dashboard',LayoutDashboard], ['/student/aptitude','Aptitude',Brain],
    ['/student/gd','Group Discussion',MessageSquare], ['/student/performance','Performance',BarChart3]
  ] as const
  const adminLinks = [
    ['/admin/dashboard','Dashboard',LayoutDashboard], ['/admin/students','Students',Users],
    ['/admin/assessments','Assessments',FileText], ['/admin/gd-sessions','GD Sessions',MessageSquare]
  ] as const
  const links = role === 'student' ? studentLinks : adminLinks
  return <div className="min-h-screen bg-slate-50 flex">
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="brand px-5 py-6 text-white"><span className="brand-mark">H</span> Hiresprint</div>
      <div className="px-4 text-xs uppercase tracking-widest text-slate-500 mt-4 mb-3">{role === 'student' ? 'Preparation' : 'Placement Cell'}</div>
      <nav className="space-y-1 px-3">
        {links.map(([to,label,Icon]) => <Link key={to} onClick={()=>setOpen(false)} className={`nav-link ${location.pathname === to ? 'active':''}`} to={to}><Icon size={18}/>{label}</Link>)}
      </nav>
      <div className="mt-auto p-3">
        <button onClick={logout} className="nav-link w-full text-slate-400"><LogOut size={18}/>Logout</button>
      </div>
    </aside>
    <div className="flex-1 min-w-0">
      <header className="mobile-header"><button onClick={()=>setOpen(!open)}><Menu/></button><div className="brand"><span className="brand-mark">H</span> Hiresprint</div></header>
      <main className="max-w-7xl mx-auto p-5 md:p-8">{children}</main>
    </div>
  </div>
}

function Header({ eyebrow, title, subtitle }: {eyebrow:string;title:string;subtitle?:string}) {
  return <div className="mb-8"><p className="eyebrow">{eyebrow}</p><h1 className="page-title">{title}</h1>{subtitle && <p className="text-slate-500 mt-2">{subtitle}</p>}</div>
}

function Stat({ icon:Icon, label, value, note }: {icon:any;label:string;value:string;note:string}) {
  return <div className="card p-5"><div className="flex justify-between items-start"><div className="icon-box"><Icon size={19}/></div><span className="text-xs text-slate-400">{note}</span></div><p className="text-slate-500 text-sm mt-4">{label}</p><p className="text-2xl font-bold mt-1">{value}</p></div>
}

function StudentDashboard() {
  return <Shell role="student">
    <Header eyebrow="Student dashboard" title="Welcome back, Aditi" subtitle="Continue your placement preparation and improve your performance."/>
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
      <Stat icon={Brain} label="Aptitude Score" value="78%" note="+6%"/>
      <Stat icon={MessageSquare} label="GD Score" value="82%" note="+9%"/>
      <Stat icon={FileText} label="Assessments" value="12" note="completed"/>
      <Stat icon={Activity} label="GD Sessions" value="18" note="completed"/>
    </div>
    <div className="grid lg:grid-cols-2 gap-5">
      <FeatureCard icon={Brain} title="Aptitude Preparation" desc="Practice questions or simulate a real placement assessment." actions={[['Practice','/student/aptitude/practice'],['Take Assessment','/student/aptitude/assessment']]}/>
      <FeatureCard icon={MessageSquare} title="Group Discussion" desc="Practice with AI participants or join a live GD room." actions={[['AI GD','/student/gd/ai'],['Live GD','/student/gd/live']]}/>
    </div>
    <div className="grid lg:grid-cols-5 gap-5 mt-5">
      <div className="card p-6 lg:col-span-3"><div className="flex justify-between"><div><h3 className="section-title">Performance overview</h3><p className="text-sm text-slate-500">Placement readiness over recent attempts</p></div><span className="pill success">Improving</span></div><div className="h-48 mt-6 flex items-end gap-3">{[45,52,49,62,66,73,78,81].map((v,i)=><div key={i} className="flex-1"><div className="chart-bar" style={{height:`${v*1.7}px`}}></div><p className="text-[10px] text-center text-slate-400 mt-2">T{i+1}</p></div>)}</div></div>
      <div className="card p-6 lg:col-span-2"><h3 className="section-title">Recent activity</h3><div className="mt-4 space-y-4">{[['Aptitude Assessment','24/30','2 hours ago'],['AI GD','8.2/10','Yesterday'],['Logical Reasoning','18/20','2 days ago']].map(x=><div key={x[0]} className="flex justify-between border-b pb-3 last:border-0"><div><p className="font-medium text-sm">{x[0]}</p><p className="text-xs text-slate-400">{x[2]}</p></div><span className="font-semibold text-sm">{x[1]}</span></div>)}</div></div>
    </div>
  </Shell>
}

function FeatureCard({icon:Icon,title,desc,actions}:{icon:any;title:string;desc:string;actions:[string,string][]}) {
  return <div className="card p-6"><div className="icon-box"><Icon size={21}/></div><h3 className="text-xl font-bold mt-5">{title}</h3><p className="text-slate-500 mt-2 text-sm leading-6">{desc}</p><div className="flex gap-2 mt-6">{actions.map(([label,to])=><Link key={to} to={to} className="btn-secondary">{label}<ChevronRight size={15}/></Link>)}</div></div>
}

function AptitudeHome() {
  const cats = ['Quantitative Aptitude','Logical Reasoning','Verbal Ability','Data Interpretation']
  return <Shell role="student"><Header eyebrow="Aptitude" title="Aptitude Preparation" subtitle="Practice your skills or simulate a placement assessment."/>
    <div className="grid lg:grid-cols-2 gap-5 mb-6">
      <FeatureCard icon={BookOpen} title="Practice Mode" desc="Solve questions at your own pace with explanations and immediate feedback." actions={[['Start Practice','/student/aptitude/practice']]}/>
      <FeatureCard icon={Clock3} title="Assessment Mode" desc="Take a timed placement-style test with a question navigator and automatic submission." actions={[['Start Assessment','/student/aptitude/assessment']]}/>
    </div>
    <h2 className="section-title mb-4">Skill categories</h2><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{cats.map((c,i)=><div className="card p-5" key={c}><div className="icon-box"><Brain size={18}/></div><h3 className="font-semibold mt-4">{c}</h3><p className="text-xs text-slate-500 mt-1">{i+6} questions available</p><button className="text-sm font-semibold text-indigo-600 mt-5">Practice <ChevronRight size={14} className="inline"/></button></div>)}</div>
  </Shell>
}

function AptitudeTest({assessment=false}:{assessment?:boolean}) {
  const navigate=useNavigate()
  const [idx,setIdx]=useState(0), [answers,setAnswers]=useState<Record<number,number>>({}), [time,setTime]=useState(assessment?30*60:0)
  const q=questions[idx]
  useEffect(()=>{if(!assessment)return; const t=setInterval(()=>setTime(v=>Math.max(0,v-1)),1000); return()=>clearInterval(t)},[assessment])
  const finish=()=>{localStorage.setItem('hiresprint_aptitude_score', String(Object.entries(answers).filter(([id,a])=>questions.find(q=>q.id===Number(id))?.answer===a).length)); navigate('/student/aptitude/result')}
  const mm=String(Math.floor(time/60)).padStart(2,'0'), ss=String(time%60).padStart(2,'0')
  return <Shell role="student">
    <div className="flex justify-between items-center mb-5"><button onClick={()=>navigate('/student/aptitude')} className="back"><ArrowLeft size={16}/> Back</button>{assessment&&<div className="timer"><Clock3 size={16}/> {mm}:{ss}</div>}</div>
    <div className="grid lg:grid-cols-[1fr_280px] gap-5">
      <div className="card p-6 md:p-8"><div className="flex justify-between"><span className="pill">{q.category}</span><span className="text-sm text-slate-400">Question {idx+1} of {questions.length}</span></div><h2 className="text-xl font-semibold mt-7 leading-8">{q.text}</h2><div className="mt-6 space-y-3">{q.options.map((o,i)=><button key={o} onClick={()=>setAnswers({...answers,[q.id]:i})} className={`option ${answers[q.id]===i?'selected':''}`}><span>{String.fromCharCode(65+i)}</span>{o}</button>)}</div><div className="flex justify-between mt-8"><button disabled={idx===0} onClick={()=>setIdx(idx-1)} className="btn-secondary disabled:opacity-40">Previous</button>{idx===questions.length-1?<button onClick={finish} className="btn-primary">Submit {assessment?'Assessment':'Practice'} <CheckCircle2 size={16}/></button>:<button onClick={()=>setIdx(idx+1)} className="btn-primary">Next <ChevronRight size={16}/></button>}</div>{!assessment&&answers[q.id]!==undefined&&<div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600"><strong>Explanation:</strong> {q.explanation}</div>}</div>
      <div className="card p-5 h-fit"><h3 className="font-semibold">Question navigator</h3><div className="grid grid-cols-5 gap-2 mt-4">{questions.map((x,i)=><button key={x.id} onClick={()=>setIdx(i)} className={`qnav ${i===idx?'current':''} ${answers[x.id]!==undefined?'answered':''}`}>{i+1}</button>)}</div>{assessment&&<><div className="border-t mt-5 pt-5 text-xs text-slate-500 space-y-2"><p>Answered: {Object.keys(answers).length}</p><p>Unanswered: {questions.length-Object.keys(answers).length}</p></div><button onClick={finish} className="btn-primary w-full mt-5">Submit Test</button></>}</div>
    </div>
  </Shell>
}

function AptitudeResult() {
  const score=Number(localStorage.getItem('hiresprint_aptitude_score')||24), pct=Math.round(score/questions.length*100)
  return <Shell role="student"><Header eyebrow="Assessment result" title="Assessment Completed" subtitle="Here is your performance breakdown."/>
    <div className="card p-8 text-center mb-5"><div className="mx-auto score-ring"><div><strong>{score}/{questions.length}</strong><span>{pct}% Accuracy</span></div></div><h2 className="text-xl font-bold mt-5">Good progress</h2><p className="text-slate-500 text-sm mt-1">Keep practicing your weaker areas.</p></div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{[['Quantitative','8/10'],['Logical','9/10'],['Verbal','7/10'],['Time Management','Good']].map(x=><div className="card p-5" key={x[0]}><p className="text-sm text-slate-500">{x[0]}</p><p className="text-xl font-bold mt-2">{x[1]}</p></div>)}</div>
    <div className="grid lg:grid-cols-2 gap-5 mt-5"><div className="card p-6"><h3 className="section-title">Strengths</h3><ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2"><li>Strong logical reasoning</li><li>Good numerical accuracy</li></ul></div><div className="card p-6"><h3 className="section-title">Areas to improve</h3><ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2"><li>Verbal ability</li><li>Maintain speed on longer questions</li></ul></div></div>
  </Shell>
}

function GDHome() {
  return <Shell role="student"><Header eyebrow="Group discussion" title="Build confidence through practice" subtitle="Choose an AI simulation or a live student GD."/><div className="grid lg:grid-cols-2 gap-5"><FeatureCard icon={Sparkles} title="AI Group Discussion" desc="Practice independently with AI participants having different discussion personalities." actions={[['Start AI GD','/student/gd/ai']]}/><FeatureCard icon={Video} title="Live Group Discussion" desc="Join a real-time GD room with other students. WebRTC can be connected in the next phase." actions={[['Join Live GD','/student/gd/live']]}/></div><div className="card p-6 mt-5"><h3 className="section-title">Recent GD sessions</h3><div className="mt-4 divide-y">{[['Should AI replace human jobs?','AI GD','8.2/10'],['Remote work vs office work','Live GD','7.8/10'],['Social media: benefit or distraction?','AI GD','8.6/10']].map(x=><div className="py-4 flex justify-between" key={x[0]}><div><p className="font-medium">{x[0]}</p><p className="text-xs text-slate-400 mt-1">{x[1]}</p></div><span className="font-semibold">{x[2]}</span></div>)}</div></div></Shell>
}

function AIGD() {
  const [topic,setTopic]=useState(gdTopics[0]), [messages,setMessages]=useState<{name:string;text:string;mine?:boolean}[]>([{name:'Alex',text:'I believe AI will transform many jobs rather than completely replace humans.'},{name:'Ryan',text:'But repetitive roles are already being automated. How should workers adapt to that change?'}]), [input,setInput]=useState('')
  const send=()=>{if(!input.trim())return; const text=input.trim(); setMessages(m=>[...m,{name:'You',text,mine:true}]); setInput(''); setTimeout(()=>setMessages(m=>[...m,{name:'Sarah',text:'That is a useful point. I would also consider the impact on reskilling and new job creation.'}]),600)}
  return <Shell role="student"><div className="flex justify-between items-center mb-5"><div><p className="eyebrow">AI simulation</p><h1 className="page-title">Virtual Group Discussion</h1></div><div className="timer"><Clock3 size={16}/> 08:42</div></div>
    <div className="card overflow-hidden"><div className="p-5 border-b bg-slate-50 flex flex-wrap justify-between gap-3"><div><p className="text-xs uppercase tracking-wider text-slate-400">Topic</p><p className="font-semibold mt-1">{topic}</p></div><select value={topic} onChange={e=>setTopic(e.target.value)} className="input max-w-xs"><option>{topic}</option>{gdTopics.filter(x=>x!==topic).map(x=><option key={x}>{x}</option>)}</select></div>
      <div className="grid md:grid-cols-[210px_1fr] min-h-[520px]"><div className="p-5 border-r bg-white"><p className="eyebrow">Participants</p><div className="mt-4 space-y-3">{aiParticipants.map(p=><div className="participant" key={p.name}><div className="avatar">{p.name[0]}</div><div><p className="font-medium text-sm">{p.name}</p><p className="text-xs text-slate-400">{p.role}</p></div></div>)}<div className="participant"><div className="avatar you">Y</div><div><p className="font-medium text-sm">You</p><p className="text-xs text-slate-400">Student</p></div></div></div></div>
      <div className="flex flex-col"><div className="flex-1 p-5 space-y-4 overflow-auto">{messages.map((m,i)=><div className={`flex ${m.mine?'justify-end':''}`} key={i}><div className={`message ${m.mine?'mine':''}`}><p className="text-xs font-semibold mb-1 opacity-70">{m.name}</p><p className="text-sm leading-6">{m.text}</p></div></div>)}</div><div className="p-4 border-t"><div className="flex gap-2"><button className="icon-btn" title="Voice input"><Mic size={18}/></button><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Type your contribution..." className="input"/><button onClick={send} className="btn-primary"><Send size={16}/> Send</button></div><button className="btn-danger mt-3">End Discussion</button></div></div></div></div>
  </Shell>
}

function LiveGD() {
  return <Shell role="student"><Header eyebrow="Live room" title="Live Group Discussion" subtitle="Frontend demo of the real-time GD room. Connect WebRTC/Socket.IO in the integration phase."/><div className="card p-5"><div className="flex justify-between items-center mb-5"><div><span className="pill">GD-4821</span><span className="text-sm text-slate-500 ml-3">Topic: Should AI replace human jobs?</span></div><div className="timer"><Clock3 size={16}/> 09:12</div></div><div className="grid sm:grid-cols-2 gap-4">{['You','Student 1','Student 2','Student 3'].map((x,i)=><div className="video-card" key={x}><div className="video-avatar">{x[0]}</div><div className="absolute bottom-3 left-3 right-3 flex justify-between"><span>{x}</span><span>{i===1?'Speaking':'Mic on'}</span></div></div>)}</div><div className="flex justify-center gap-2 mt-5"><button className="icon-btn"><Mic/></button><button className="icon-btn"><Video/></button><button className="btn-danger">Leave GD</button></div></div></Shell>
}

function GDResult() {
  return <Shell role="student"><Header eyebrow="GD report" title="GD Performance Report" subtitle="A structured view of your discussion performance."/><div className="card p-7 flex flex-wrap justify-between gap-5 items-center"><div><p className="text-slate-500">Overall Score</p><p className="text-5xl font-bold mt-1">8.2<span className="text-xl text-slate-400">/10</span></p></div><div className="grid grid-cols-2 md:grid-cols-4 gap-3">{[['Content','8.5'],['Relevance','9.0'],['Communication','7.5'],['Participation','8.0']].map(x=><div className="score-mini" key={x[0]}><p>{x[0]}</p><strong>{x[1]}</strong></div>)}</div></div><div className="grid lg:grid-cols-2 gap-5 mt-5"><div className="card p-6"><h3 className="section-title">Strengths</h3><ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2"><li>Relevant arguments</li><li>Good topic understanding</li><li>Consistent participation</li></ul></div><div className="card p-6"><h3 className="section-title">Areas to improve</h3><ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2"><li>Improve clarity of arguments</li><li>Support points with examples</li><li>Contribute earlier in the discussion</li></ul></div></div><div className="card p-6 mt-5"><h3 className="section-title">Discussion transcript</h3><div className="mt-4 space-y-3">{[['Alex','AI will transform many jobs.'],['Ryan','How do we address job displacement?'],['You','Reskilling can help workers transition into new roles.']].map(x=><div className="transcript" key={x[0]}><strong>{x[0]}</strong><span>{x[1]}</span></div>)}</div></div></Shell>
}

function Performance() {
  return <Shell role="student"><Header eyebrow="Analytics" title="My Performance" subtitle="Track your placement readiness across assessments and GD practice."/><div className="card p-7 flex items-center gap-8 mb-5"><div className="score-ring small"><div><strong>81%</strong><span>Readiness</span></div></div><div><h2 className="text-xl font-bold">You're progressing</h2><p className="text-slate-500 mt-1">Your recent attempts show steady improvement.</p></div></div><div className="grid lg:grid-cols-2 gap-5"><div className="card p-6"><h3 className="section-title">Aptitude performance</h3>{[['Quantitative','82%'],['Logical','89%'],['Verbal','70%'],['Data Interpretation','76%']].map(x=><div className="progress-row" key={x[0]}><div><span>{x[0]}</span><strong>{x[1]}</strong></div><div className="progress"><i style={{width:x[1]}}/></div></div>)}</div><div className="card p-6"><h3 className="section-title">GD performance</h3>{[['Content','85%'],['Relevance','90%'],['Communication','75%'],['Participation','80%']].map(x=><div className="progress-row" key={x[0]}><div><span>{x[0]}</span><strong>{x[1]}</strong></div><div className="progress"><i style={{width:x[1]}}/></div></div>)}</div></div></Shell>
}

const students=[['Aditi Pawar','aditi@example.com','82%','84%','83%','Good'],['Rahul Shah','rahul@example.com','61%','72%','67%','Needs Improvement'],['Sneha Patil','sneha@example.com','91%','88%','90%','Excellent'],['Om Kulkarni','om@example.com','76%','79%','78%','Good']]

function AdminLayout({title,children}:{title:string;children:React.ReactNode}) {
 return <Shell role="admin"><Header eyebrow="Placement cell" title={title} subtitle="Monitor student preparation and assessment activity." />{children}</Shell>
}
function AdminDashboard(){return <AdminLayout title="Placement Dashboard"><div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4"><Stat icon={Users} label="Total Students" value="250" note="registered"/><Stat icon={FileText} label="Assessments" value="1,240" note="completed"/><Stat icon={MessageSquare} label="GD Sessions" value="860" note="recorded"/><Stat icon={Trophy} label="Avg. Readiness" value="76%" note="current"/></div><div className="card p-6 mt-5"><h3 className="section-title">Student performance</h3><StudentTable/></div></AdminLayout>}
function StudentTable(){return <div className="table-wrap mt-4"><table><thead><tr><th>Student</th><th>Aptitude</th><th>GD</th><th>Overall</th><th>Status</th></tr></thead><tbody>{students.map(s=><tr key={s[0]}>{s.map((v,i)=><td key={i}>{i===0?<strong>{v}</strong>:i===4?<span className={`status ${v.includes('Improvement')?'warn':'good'}`}>{v}</span>:v}</td>)}</tr>)}</tbody></table></div>}
function AdminStudents(){return <AdminLayout title="Students"><div className="card p-6"><div className="flex gap-3"><div className="search"><Search size={17}/><input placeholder="Search students..."/></div><button className="btn-secondary">Filter</button></div><StudentTable/></div></AdminLayout>}
function AdminAssessments(){return <AdminLayout title="Assessments"><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"><Stat icon={FileText} label="Total Attempts" value="1,240" note="all tests"/><Stat icon={Activity} label="Average Score" value="76%" note="all students"/><Stat icon={Trophy} label="Highest Score" value="98%" note="current"/><Stat icon={Target} label="Accuracy" value="81%" note="average"/></div><div className="card p-6 mt-5"><h3 className="section-title">Recent assessments</h3><div className="table-wrap mt-4"><table><thead><tr><th>Test</th><th>Attempts</th><th>Average</th><th>Status</th></tr></thead><tbody>{[['Placement Aptitude Mock 01','218','78%','Active'],['Quantitative Screening','184','74%','Active'],['Logical Reasoning Mock','165','81%','Active']].map(x=><tr key={x[0]}>{x.map((v,i)=><td key={i}>{i===0?<strong>{v}</strong>:v}</td>)}</tr>)}</tbody></table></div></div></AdminLayout>}
function AdminGD(){return <AdminLayout title="GD Sessions"><div className="card p-6"><h3 className="section-title">Recent sessions</h3><div className="table-wrap mt-4"><table><thead><tr><th>Student</th><th>Type</th><th>Topic</th><th>Score</th><th>Date</th></tr></thead><tbody>{[['Aditi Pawar','AI GD','Should AI replace human jobs?','8.2/10','Today'],['Rahul Shah','Live GD','Remote work vs office work','7.8/10','Yesterday'],['Sneha Patil','AI GD','Social media: benefit or distraction?','8.6/10','Yesterday']].map(x=><tr key={x[0]}>{x.map((v,i)=><td key={i}>{i===0?<strong>{v}</strong>:v}</td>)}</tr>)}</tbody></table></div></div></AdminLayout>}

function App(){
  return <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/student/dashboard" element={<Protected role="student"><StudentDashboard/></Protected>}/>
    <Route path="/student/aptitude" element={<Protected role="student"><AptitudeHome/></Protected>}/>
    <Route path="/student/aptitude/practice" element={<Protected role="student"><AptitudeTest/></Protected>}/>
    <Route path="/student/aptitude/assessment" element={<Protected role="student"><AptitudeTest assessment/></Protected>}/>
    <Route path="/student/aptitude/result" element={<Protected role="student"><AptitudeResult/></Protected>}/>
    <Route path="/student/gd" element={<Protected role="student"><GDHome/></Protected>}/>
    <Route path="/student/gd/ai" element={<Protected role="student"><AIGD/></Protected>}/>
    <Route path="/student/gd/live" element={<Protected role="student"><LiveGD/></Protected>}/>
    <Route path="/student/gd/result" element={<Protected role="student"><GDResult/></Protected>}/>
    <Route path="/student/performance" element={<Protected role="student"><Performance/></Protected>}/>
    <Route path="/admin/dashboard" element={<Protected role="admin"><AdminDashboard/></Protected>}/>
    <Route path="/admin/students" element={<Protected role="admin"><AdminStudents/></Protected>}/>
    <Route path="/admin/assessments" element={<Protected role="admin"><AdminAssessments/></Protected>}/>
    <Route path="/admin/gd-sessions" element={<Protected role="admin"><AdminGD/></Protected>}/>
    <Route path="*" element={<Navigate to="/login" replace/>}/>
  </Routes>
}
export default App