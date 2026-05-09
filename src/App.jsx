import { useState } from "react";
import {
  LayoutDashboard, Search, BarChart2, Globe, Link2, FileSearch,
  TrendingUp, TrendingDown, MessageSquare, CheckSquare, Users, Calendar,
  Bell, Plus, ChevronDown, ChevronRight, MoreHorizontal, Send,
  Paperclip, Video, Phone, Hash, Settings, AlertCircle, Clock,
  Target, Zap, Filter, Tag, X, Edit2, Eye, Download, Sparkles,
  Bot, FileText, Image, AtSign, Mic, UserPlus, Briefcase, Shield,
  Inbox, Share2, PlayCircle, CheckCircle2, LogOut, HelpCircle,
  ExternalLink, Activity, Cpu, RefreshCw, Star, ChevronLeft,
  SortAsc, Kanban, AlignLeft, CalendarCheck, Pin, BarChart,
  ArrowUpRight, Smile, Check, Key
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
  BarChart as RBarChart, Bar
} from "recharts";

// ── Brand Colors (seoengineboost.com) ──────────────────────────────
const C = {
  white:    "#FFFFFF",
  bg:       "#F7F9FC",
  bgCard:   "#FFFFFF",
  bgLight:  "#EEF3FB",
  navy:     "#0A1628",
  blue:     "#1A4FB5",
  blueL:    "#2563EB",
  bluePale: "#DBEAFE",
  orange:   "#F97316",
  orangeL:  "#FED7AA",
  text:     "#1E293B",
  textMid:  "#475569",
  textDim:  "#94A3B8",
  border:   "#E2E8F0",
  green:    "#16A34A",
  greenL:   "#DCFCE7",
  red:      "#DC2626",
  redL:     "#FEE2E2",
  yellow:   "#D97706",
  yellowL:  "#FEF3C7",
  purple:   "#7C3AED",
  purpleL:  "#EDE9FE",
};

// ── Global CSS ─────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Manrope',sans-serif;background:#F7F9FC;color:#1E293B;}
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:4px;}
.sg{font-family:'Space Grotesk',sans-serif;}
.fade{animation:fi 0.3s ease;}
@keyframes fi{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
.hl{transition:background 0.12s;cursor:pointer;}
.hl:hover{background:#F1F5F9 !important;}
.card{background:#fff;border:1px solid #E2E8F0;border-radius:12px;}
.ch{transition:all 0.15s;}.ch:hover{box-shadow:0 4px 16px rgba(37,99,235,0.10);transform:translateY(-1px);}
.chip{display:inline-flex;align-items:center;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;}
.nav{display:flex;align-items:center;gap:9px;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:500;color:#64748B;transition:all 0.12s;}
.nav:hover{background:#EEF3FB;color:#1A4FB5;}
.nav.on{background:#DBEAFE;color:#1A4FB5;font-weight:700;}
.nsub{display:flex;align-items:center;gap:8px;padding:6px 12px 6px 32px;border-radius:6px;cursor:pointer;font-size:12px;color:#64748B;transition:all 0.12s;}
.nsub:hover{color:#1A4FB5;}.nsub.on{color:#1A4FB5;font-weight:600;}
.kc{background:#fff;border:1px solid #E2E8F0;border-radius:10px;padding:12px;margin-bottom:8px;cursor:pointer;transition:all .15s;}
.kc:hover{border-color:#2563EB;box-shadow:0 2px 8px rgba(37,99,235,.08);}
.td{transition:background .1s;}.td:hover{background:#F8FAFC;}
.pls{animation:p 1.8s ease-in-out infinite;}
@keyframes p{0%,100%{opacity:1}50%{opacity:.3}}
.tdot{width:6px;height:6px;border-radius:50%;background:#94A3B8;animation:td 1.2s infinite;}
@keyframes td{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
`;

// ── Data ────────────────────────────────────────────────────────────
const trafficData = [
  {m:"Jan",organic:3800,paid:1900},{m:"Feb",organic:5100,paid:2400},
  {m:"Mar",organic:4600,paid:2800},{m:"Apr",organic:6800,paid:3400},
  {m:"May",organic:5900,paid:3800},{m:"Jun",organic:8200,paid:4200},
  {m:"Jul",organic:9000,paid:4800},
];
const rankData = [
  {n:"Wk1",pos:22},{n:"Wk2",pos:18},{n:"Wk3",pos:13},
  {n:"Wk4",pos:10},{n:"Wk5",pos:8},{n:"Wk6",pos:5},{n:"Wk7",pos:4},
];
const pieData = [
  {name:"Top 3",v:12},{name:"Top 10",v:38},
  {name:"Top 30",v:61},{name:"Unranked",v:89}
];
const PIE_COLORS = [C.green, C.blueL, C.yellow, C.textDim];

const keywords = [
  {kw:"dental implants near me",pos:4,vol:"8,200",kd:28,cpc:"$4.20",chg:"+3",intent:"Commercial"},
  {kw:"best SEO tools 2026",pos:7,vol:"5,100",kd:42,cpc:"$6.80",chg:"+5",intent:"Informational"},
  {kw:"agency project management",pos:11,vol:"3,400",kd:35,cpc:"$3.50",chg:"-2",intent:"Navigational"},
  {kw:"marketing collaboration tool",pos:15,vol:"2,900",kd:31,cpc:"$5.10",chg:"+4",intent:"Commercial"},
  {kw:"content marketing software",pos:19,vol:"6,700",kd:58,cpc:"$8.20",chg:"+1",intent:"Commercial"},
  {kw:"SEO reporting dashboard",pos:6,vol:"4,100",kd:29,cpc:"$5.60",chg:"+8",intent:"Commercial"},
  {kw:"task management agencies",pos:9,vol:"3,800",kd:44,cpc:"$4.90",chg:"-1",intent:"Commercial"},
];

const backlinks = [
  {domain:"hubspot.com",dr:93,links:142,anchor:"SEO tools comparison",type:"Dofollow",date:"May 2"},
  {domain:"searchengineland.com",dr:88,links:67,anchor:"boostly platform",type:"Dofollow",date:"Apr 29"},
  {domain:"moz.com",dr:91,links:23,anchor:"marketing workspace",type:"Nofollow",date:"Apr 25"},
  {domain:"semrush.com",dr:95,links:8,anchor:"agency SEO tool",type:"Dofollow",date:"Apr 20"},
  {domain:"ahrefs.com",dr:90,links:15,anchor:"seo platform review",type:"Dofollow",date:"Apr 18"},
];

const auditItems = [
  {label:"Title Tag",status:"error",desc:"Missing on 3 pages",fix:true},
  {label:"Meta Description",status:"warning",desc:"Too short on 7 pages",fix:true},
  {label:"H1 Tags",status:"ok",desc:"All pages have H1 tags"},
  {label:"Image Alt Text",status:"error",desc:"48 images missing alt attributes",fix:true},
  {label:"Page Speed",status:"warning",desc:"Avg load time 3.2s",fix:true},
  {label:"Mobile Friendly",status:"ok",desc:"All pages pass mobile test"},
  {label:"Broken Links",status:"error",desc:"12 broken internal links",fix:true},
  {label:"SSL Certificate",status:"ok",desc:"Valid SSL — expires Aug 2026"},
  {label:"Sitemap",status:"warning",desc:"Sitemap missing 14 new pages",fix:true},
];

const clientList = [
  {n:"Dental Pro Clinic",av:"D",status:"active",tasks:14,done:9,rev:"$4,200",health:92,last:"2h ago"},
  {n:"TechFlow Agency",av:"T",status:"active",tasks:22,done:18,rev:"$6,800",health:78,last:"1d ago"},
  {n:"GreenLeaf Studios",av:"G",status:"review",tasks:8,done:4,rev:"$2,100",health:55,last:"3d ago"},
  {n:"Urban Eats Brand",av:"U",status:"active",tasks:17,done:17,rev:"$3,900",health:100,last:"5h ago"},
  {n:"Nexus Consulting",av:"N",status:"paused",tasks:11,done:6,rev:"$5,100",health:40,last:"2w ago"},
];

const kanbanData = {
  todo:{label:"To Do",color:C.textDim,tasks:[
    {id:1,title:"Research competitor SEO strategies",tags:["SEO","Research"],pri:"high",avs:["M","A"],due:"May 5",cmts:3},
    {id:2,title:"Design email nurture sequence",tags:["Email"],pri:"medium",avs:["S"],due:"May 8",cmts:1},
    {id:3,title:"Setup Google Analytics 4",tags:["Analytics"],pri:"low",avs:["J"],due:"May 12",cmts:0},
  ]},
  inprog:{label:"In Progress",color:C.blueL,tasks:[
    {id:4,title:"Keyword clustering tool phase 2",tags:["SEO","Dev"],pri:"high",avs:["M"],due:"May 3",cmts:7,prog:65},
    {id:5,title:"Client reporting dashboard PDF",tags:["Reports"],pri:"high",avs:["A","S"],due:"May 4",cmts:4,prog:40},
    {id:6,title:"Q2 blog content — 6 articles",tags:["Content"],pri:"medium",avs:["J"],due:"May 6",cmts:2,prog:80},
  ]},
  review:{label:"In Review",color:C.yellow,tasks:[
    {id:7,title:"Homepage redesign mockups",tags:["Design"],pri:"high",avs:["M","J"],due:"May 2",cmts:12},
    {id:8,title:"Facebook Ads copy — Q2",tags:["Ads"],pri:"medium",avs:["A"],due:"May 3",cmts:5},
  ]},
  done:{label:"Done",color:C.green,tasks:[
    {id:9,title:"Full backlink profile audit",tags:["SEO"],pri:"medium",avs:["S"],due:"Apr 30",cmts:8},
    {id:10,title:"Chat-to-task integration v1",tags:["Dev"],pri:"high",avs:["M"],due:"Apr 28",cmts:15},
  ]},
};

const chatMsgs = [
  {id:1,user:"Mahmoud",av:"M",text:"Hey team! Finished keyword research for Dental Pro. Found 340+ keywords!",time:"9:14 AM",mine:false},
  {id:2,user:"Aisha",av:"A",text:"Amazing! Any high-volume low-competition clusters?",time:"9:16 AM",mine:false},
  {id:3,user:"Me",av:"Y",text:"Yes — 'dental implants near me': 8,200/mo, KD 28. Sharing sheet now.",time:"9:18 AM",mine:true},
  {id:4,user:"Sam",av:"S",text:"That's exactly what we needed. Convert to tasks?",time:"9:20 AM",mine:false},
  {id:5,user:"Me",av:"Y",text:"Yes — using Boostly AI chat-to-task feature now!",time:"9:21 AM",mine:true},
];

const channels = [
  {n:"general",u:3},{n:"seo-team",u:0},{n:"content-writers",u:12},
  {n:"dev-updates",u:1},{n:"client-dental",u:0},{n:"marketing",u:5},
];

// ── BarChart alias for progress screens ──────────────────────────────
const RBar = RBarChart;


// ── Micro Components ────────────────────────────────────────────────
function Av({ l, size = 32 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: `linear-gradient(135deg, ${C.blueL}, ${C.blue})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: size * 0.38, fontWeight: 700, flexShrink: 0, fontFamily: "Space Grotesk" }}>{l}</div>
  );
}
function ScoreRing({ score, size = 52 }) {
  const r = size * 0.4; const circ = 2 * Math.PI * r; const off = circ * (1 - score / 100);
  const col = score >= 80 ? C.green : score >= 60 ? C.yellow : C.red;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E2E8F0" strokeWidth={size * 0.1} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth={size * 0.1} strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: col, fontWeight: 800, fontSize: size * 0.28, fontFamily: "Space Grotesk" }}>{score}</div>
    </div>
  );
}
function PriBadge({ p }) {
  const map = { high: [C.red, C.redL, "High"], medium: [C.yellow, C.yellowL, "Med"], low: [C.green, C.greenL, "Low"] };
  const [col, bg, label] = map[p] || map.low;
  return <span className="chip" style={{ color: col, background: bg }}>{label}</span>;
}
function ProgBar({ v, col = C.blueL, h = 5 }) {
  return (
    <div style={{ background: "#E2E8F0", borderRadius: 10, height: h, overflow: "hidden" }}>
      <div style={{ width: `${Math.min(v, 100)}%`, height: "100%", background: col, borderRadius: 10 }} />
    </div>
  );
}

// ── Simple Sidebar (kept for compatibility) ──────────────────────────
function Sidebar({ active, setActive, sub, setSub }) {
  const seoNav = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "competitive", icon: Globe, label: "Competitive Research", subs: [{ id: "domain-overview", l: "Domain Overview" }, { id: "keyword-gap", l: "Keyword Gap" }] },
    { id: "keyword", icon: Search, label: "Keyword Research", subs: [{ id: "kw-overview", l: "Keyword Overview" }, { id: "kw-ideas", l: "Keyword Ideas" }] },
    { id: "backlink", icon: Link2, label: "Backlink Research" },
    { id: "onpage", icon: FileSearch, label: "On Page & Tech Audit" },
    { id: "rank", icon: TrendingUp, label: "Rank Tracking" },
  ];
  const toolNav = [
    { id: "messages", icon: MessageSquare, label: "Messages", badge: 17 },
    { id: "tasks", icon: CheckSquare, label: "Tasks" },
    { id: "clients", icon: Users, label: "Clients" },
    { id: "calendar", icon: Calendar, label: "Calendar" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];
  return (
    <div style={{ width: 214, background: C.white, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0, flexShrink: 0, overflowY: "auto" }}>
      <div style={{ padding: "16px 14px 12px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${C.orange}, ${C.blueL})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 10px rgba(249,115,22,0.3)" }}><Zap size={17} color="#fff" fill="#fff" /></div>
          <div><div className="sg" style={{ color: C.text, fontWeight: 800, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }}>Boostly</div><div style={{ color: C.textDim, fontSize: 9, letterSpacing: ".8px", fontWeight: 700 }}>SEO · MARKETING · AI</div></div>
        </div>
      </div>
      <div style={{ padding: "10px 8px", flex: 1 }}>
        <div style={{ color: C.textDim, fontSize: 9.5, fontWeight: 700, letterSpacing: 1.2, padding: "0 8px", marginBottom: 4 }}>SEO TOOLS</div>
        {seoNav.map(({ id, icon: Icon, label, subs }) => (
          <div key={id}>
            <div className={`nav${active === id && !sub ? " on" : ""}`} onClick={() => { setActive(id); if (!subs) setSub(null); }}>
              <Icon size={15} /><span style={{ flex: 1 }}>{label}</span>
              {subs && <ChevronDown size={11} color={C.textDim} style={{ transform: active === id ? "rotate(180deg)" : "none", transition: "transform .2s" }} />}
            </div>
            {subs && active === id && subs.map((s) => (
              <div key={s.id} className={`nsub${sub === s.id ? " on" : ""}`} onClick={() => setSub(s.id)}>{s.l}</div>
            ))}
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10, marginTop: 8 }}>
          <div style={{ color: C.textDim, fontSize: 9.5, fontWeight: 700, letterSpacing: 1.2, padding: "0 8px", marginBottom: 4 }}>WORKSPACE</div>
          {toolNav.map(({ id, icon: Icon, label, badge }) => (
            <div key={id} className={`nav${active === id ? " on" : ""}`} onClick={() => { setActive(id); setSub(null); }}>
              <Icon size={15} /><span style={{ flex: 1 }}>{label}</span>
              {badge && <span style={{ background: C.orange, color: "#fff", fontSize: 9, fontWeight: 700, width: 17, height: 17, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{badge}</span>}
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "10px 10px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 8px", background: C.bg, borderRadius: 9, cursor: "pointer" }}>
          <Av l="Y" size={28} />
          <div style={{ flex: 1, minWidth: 0 }}><div style={{ color: C.text, fontSize: 12, fontWeight: 700 }}>Your Account</div><div style={{ color: C.textDim, fontSize: 10 }}>Admin · Pro Plan</div></div>
          <ChevronDown size={11} color={C.textDim} />
        </div>
      </div>
    </div>
  );
}

// ── Topbar ──────────────────────────────────────────────────────────
function Topbar({ title, sub }) {
  return (
    <div style={{ padding: "12px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12, background: C.white, position: "sticky", top: 0, zIndex: 20, flexShrink: 0 }}>
      <div style={{ flex: 1 }}>
        <h1 className="sg" style={{ color: C.text, fontSize: 16, fontWeight: 700 }}>{title}</h1>
        {sub && <p style={{ color: C.textDim, fontSize: 11, marginTop: 1 }}>{sub}</p>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 9, padding: "7px 12px", width: 200 }}>
        <Search size={13} color={C.textDim} />
        <input placeholder="Search..." style={{ background: "transparent", border: "none", outline: "none", color: C.textMid, fontSize: 12.5, width: "100%", fontFamily: "inherit" }} />
      </div>
      <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>
        <Plus size={14} /> New Project
      </button>
      <div style={{ position: "relative", cursor: "pointer" }}>
        <Bell size={18} color={C.textDim} />
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.orange, position: "absolute", top: -1, right: -1, border: "1.5px solid #fff" }} />
      </div>
      <Av l="Y" size={32} />
    </div>
  );
}


// ── Dashboard ─────────────────────────────────────────────────────────
function Dashboard() {
  const stats = [
    {l:"Domain Rating",v:"42",chg:"+3",up:true,icon:Shield,c:C.blueL},
    {l:"Backlinks",v:"1,847",chg:"+124",up:true,icon:Link2,c:C.orange},
    {l:"Keywords Ranked",v:"3,241",chg:"+89",up:true,icon:Target,c:C.green},
    {l:"Organic Traffic",v:"92.4K",chg:"+18%",up:true,icon:TrendingUp,c:C.purple},
    {l:"Avg. Position",v:"14.2",chg:"-2.1",up:true,icon:BarChart2,c:C.blueL},
    {l:"Site Health",v:"78/100",chg:"+5",up:true,icon:Activity,c:C.green},
  ];
  const acts = [
    {u:"Mahmoud",a:"completed keyword audit for",t:"Dental Pro",ago:"2m",icon:CheckCircle2,c:C.green},
    {u:"Aisha",a:"created 4 tasks in",t:"TechFlow Campaign",ago:"14m",icon:Plus,c:C.blueL},
    {u:"AI Copilot",a:"fixed 3 broken links on",t:"seoengineboost.com",ago:"1h",icon:Bot,c:C.purple},
    {u:"Sam",a:"published blog post for",t:"Dental Client",ago:"2h",icon:FileText,c:C.orange},
    {u:"Jordan",a:"started working on",t:"Homepage Redesign",ago:"3h",icon:PlayCircle,c:C.yellow},
  ];
  return (
    <div className="fade" style={{padding:"22px 24px",overflowY:"auto",height:"calc(100vh - 57px)"}}>
      <div style={{background:`linear-gradient(135deg,${C.blue} 0%,${C.blueL} 100%)`,borderRadius:16,padding:"22px 28px",marginBottom:22,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-30,right:60,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,0.07)"}}/>
        <div style={{position:"relative"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><Sparkles size={13} color="#FED7AA"/><span style={{color:"#FED7AA",fontSize:11,fontWeight:700,letterSpacing:.5}}>GOOD MORNING — May 9, 2026</span></div>
          <h2 className="sg" style={{color:"#fff",fontSize:22,fontWeight:800,marginBottom:7}}>Your SEO performance is <span style={{color:"#FED7AA"}}>improving</span></h2>
          <p style={{color:"rgba(255,255,255,.75)",fontSize:13}}>7 tasks due today · 3 client reports pending · Organic traffic up 18% this month</p>
          <div style={{display:"flex",gap:9,marginTop:16}}>
            <button style={{background:C.orange,color:"#fff",border:"none",cursor:"pointer",padding:"9px 18px",borderRadius:8,fontSize:13,fontWeight:700,display:"flex",alignItems:"center",gap:7,fontFamily:"inherit"}}><Target size={14}/> Run SEO Audit</button>
            <button style={{background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.25)",color:"#fff",padding:"9px 18px",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:7,fontFamily:"inherit"}}><Bot size={14}/> Ask AI Copilot</button>
          </div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12,marginBottom:20}}>
        {stats.map(({l,v,chg,up,icon:Icon,c})=>(
          <div key={l} className="card ch" style={{padding:"16px 16px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <div style={{width:32,height:32,borderRadius:8,background:`${c}18`,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={14} color={c}/></div>
              <span className="chip" style={{color:up?C.green:C.red,background:up?C.greenL:C.redL,fontSize:9.5}}>{up?"↑":"↓"} {chg}</span>
            </div>
            <div className="sg" style={{color:C.text,fontSize:20,fontWeight:800}}>{v}</div>
            <div style={{color:C.textDim,fontSize:10.5,marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 260px",gap:14,marginBottom:20}}>
        <div className="card" style={{padding:"18px 20px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <div><div className="sg" style={{color:C.text,fontSize:14,fontWeight:700}}>Traffic Overview</div><div style={{color:C.textDim,fontSize:11,marginTop:2}}>Organic · Paid · Last 7 months</div></div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={trafficData} margin={{top:0,right:0,left:-22,bottom:0}}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.blueL} stopOpacity={0.2}/><stop offset="95%" stopColor={C.blueL} stopOpacity={0}/></linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.orange} stopOpacity={0.15}/><stop offset="95%" stopColor={C.orange} stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
              <XAxis dataKey="m" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
              <Area type="monotone" dataKey="organic" stroke={C.blueL} fill="url(#g1)" strokeWidth={2}/>
              <Area type="monotone" dataKey="paid" stroke={C.orange} fill="url(#g2)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{padding:"18px 20px"}}>
          <div className="sg" style={{color:C.text,fontSize:14,fontWeight:700,marginBottom:4}}>Ranking Trend</div>
          <div style={{color:C.textDim,fontSize:11,marginBottom:14}}>Avg. position (lower = better)</div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={rankData} margin={{top:0,right:0,left:-22,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
              <XAxis dataKey="n" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis reversed tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
              <Line type="monotone" dataKey="pos" stroke={C.green} strokeWidth={2.5} dot={{fill:C.green,r:3}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{padding:"18px 20px"}}>
          <div className="sg" style={{color:C.text,fontSize:14,fontWeight:700,marginBottom:4}}>Keywords</div>
          <div style={{color:C.textDim,fontSize:11,marginBottom:10}}>200 tracked</div>
          <ResponsiveContainer width="100%" height={110}>
            <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={36} outerRadius={52} paddingAngle={3} dataKey="v">{pieData.map((_,i)=><Cell key={i} fill={PIE_COLORS[i]}/>)}</Pie><Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/></PieChart>
          </ResponsiveContainer>
          {pieData.map((d,i)=>(<div key={d.name} style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}><div style={{width:7,height:7,borderRadius:2,background:PIE_COLORS[i]}}/><span style={{color:C.textMid,fontSize:11,flex:1}}>{d.name}</span><span style={{color:C.text,fontWeight:700,fontSize:12}}>{d.v}</span></div>))}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 260px",gap:14}}>
        <div className="card" style={{padding:"18px 20px"}}>
          <div className="sg" style={{color:C.text,fontSize:14,fontWeight:700,marginBottom:14}}>Team Activity</div>
          {acts.map(({u,a,t,ago,icon:Icon,c},i)=>(
            <div key={i} style={{display:"flex",gap:10,paddingBottom:12,marginBottom:12,borderBottom:i<acts.length-1?`1px solid ${C.border}`:"none",alignItems:"flex-start"}}>
              <div style={{width:30,height:30,borderRadius:8,background:`${c}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Icon size={13} color={c}/></div>
              <div style={{flex:1}}><p style={{color:C.textMid,fontSize:12.5}}><span style={{color:C.text,fontWeight:700}}>{u}</span> {a} <span style={{color:C.blueL}}>{t}</span></p><span style={{color:C.textDim,fontSize:10.5}}>{ago} ago</span></div>
            </div>
          ))}
        </div>
        <div className="card" style={{padding:"18px 18px"}}>
          <div className="sg" style={{color:C.text,fontSize:14,fontWeight:700,marginBottom:12}}>Quick Actions</div>
          {[{l:"Run Site Audit",icon:FileSearch,c:C.blueL,d:"Check site health"},{l:"Keyword Research",icon:Search,c:C.orange,d:"Find new keywords"},{l:"Generate Report",icon:BarChart2,c:C.green,d:"Branded PDF report"},{l:"Content Writer",icon:Edit2,c:C.purple,d:"AI blog generator"},{l:"Competitor Analysis",icon:Globe,c:C.yellow,d:"Track competitors"},{l:"AI Copilot",icon:Sparkles,c:C.blueL,d:"Ask anything"}].map(({l,icon:Icon,c,d})=>(
            <div key={l} className="hl" style={{display:"flex",alignItems:"center",gap:9,padding:"8px 8px",borderRadius:8,marginBottom:4}}>
              <div style={{width:30,height:30,borderRadius:8,background:`${c}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Icon size={13} color={c}/></div>
              <div style={{flex:1}}><div style={{color:C.text,fontSize:12,fontWeight:600}}>{l}</div><div style={{color:C.textDim,fontSize:10.5}}>{d}</div></div>
              <ChevronRight size={12} color={C.textDim}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Keyword Research ─────────────────────────────────────────────────
function KeywordResearch() {
  const [tab, setTab] = useState("keywords");
  const [query, setQuery] = useState("seo");
  const [domain, setDomain] = useState("seoengineboost.com");
  const [country, setCountry] = useState("United States (US)");
  const [lang, setLang] = useState("English");
  const [searched, setSearched] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const Spark = ({ data, col }) => {
    const max = Math.max(...data), min = Math.min(...data);
    const pts = data.map((v, i) => { const x = (i/(data.length-1))*58, y = 16-((v-min)/(max-min+1))*14; return `${x},${y}`; }).join(" ");
    return <svg width={60} height={18} viewBox="0 0 60 18"><polyline points={pts} fill="none" stroke={col} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/></svg>;
  };
  const kwResults = [
    {kw:"seo",vol:"135,000",cpc:"$4.50",comp:"High",last:"Aug 15, 2025",trend:[60,55,70,65,80,75,90]},
    {kw:"search engine optimisation seo",vol:"135,000",cpc:"$4.50",comp:"High",last:"Aug 15, 2025",trend:[40,50,45,60,55,70,65]},
    {kw:"seo search engine optimization",vol:"135,000",cpc:"$4.50",comp:"High",last:"Aug 15, 2025",trend:[70,65,80,75,85,80,90]},
    {kw:"what is seo",vol:"135,000",cpc:"$4.50",comp:"High",last:"Aug 15, 2025",trend:[50,60,55,65,60,70,65]},
    {kw:"seo key words",vol:"74,000",cpc:"$3.20",comp:"Medium",last:"Aug 15, 2025",trend:[30,35,40,38,45,42,48]},
    {kw:"seo services",vol:"74,000",cpc:"$3.20",comp:"Medium",last:"Aug 15, 2025",trend:[55,50,60,58,65,62,68]},
    {kw:"off page seo",vol:"14,000",cpc:"$1.80",comp:"Medium",last:"Aug 15, 2025",trend:[20,18,22,20,25,23,28]},
    {kw:"seo services marketing",vol:"14,000",cpc:"$1.20",comp:"Medium",last:"Aug 15, 2025",trend:[15,18,16,20,18,22,20]},
    {kw:"dental seo services",vol:"9,900",cpc:"$6.80",comp:"Medium",last:"Aug 15, 2025",trend:[25,28,30,27,32,30,35]},
    {kw:"local seo services",vol:"9,900",cpc:"$5.40",comp:"Medium",last:"Aug 15, 2025",trend:[35,38,40,37,42,40,45]},
    {kw:"free seo tools",vol:"8,100",cpc:"$2.10",comp:"Low",last:"Aug 15, 2025",trend:[60,65,62,70,68,72,75]},
    {kw:"seo analytics",vol:"6,600",cpc:"$3.90",comp:"Low",last:"Aug 15, 2025",trend:[20,22,25,23,28,26,30]},
    {kw:"rank tracking tool",vol:"5,500",cpc:"$4.10",comp:"Low",last:"Aug 15, 2025",trend:[30,35,40,38,45,42,48]},
    {kw:"backlink checker",vol:"12,000",cpc:"$3.60",comp:"Medium",last:"Aug 15, 2025",trend:[45,50,55,53,60,57,65]},
  ];
  const CompBadge = ({comp}) => { const map={High:[C.red,C.redL],Medium:[C.yellow,C.yellowL],Low:[C.green,C.greenL]}; const[c,bg]=map[comp]||map.Low; return <span className="chip" style={{color:c,background:bg,fontSize:10.5}}>{comp}</span>; };
  const ExportBar = () => (<div style={{display:"flex",gap:4}}>{["Copy","CSV","Excel","PDF","Print"].map(btn=>(<button key={btn} style={{padding:"4px 10px",border:`1px solid ${C.border}`,borderRadius:5,background:C.bg,cursor:"pointer",fontSize:11,fontWeight:600,color:C.textMid,fontFamily:"inherit"}}>{btn}</button>))}</div>);
  const totalPages = Math.ceil(kwResults.length / perPage);
  const pageData = kwResults.slice((page-1)*perPage, page*perPage);
  return (
    <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)",background:C.bg}}>
      <div style={{padding:"22px 28px 0",background:C.white,borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16}}>
          <div><h2 className="sg" style={{color:C.text,fontSize:20,fontWeight:800,marginBottom:4}}>Keyword Research</h2><p style={{color:C.textDim,fontSize:13}}>See detailed keyword or domain data for any page.</p></div>
          <span style={{background:"#D1FAE5",color:"#065F46",fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:6,flexShrink:0}}>40 Searches Remaining</span>
        </div>
        <div style={{display:"flex",gap:0}}>
          {[["keywords","Search By Keywords"],["domain","Search By Domain"]].map(([id,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={{padding:"10px 20px",border:"none",borderBottom:tab===id?`2.5px solid ${C.blueL}`:"2.5px solid transparent",cursor:"pointer",fontSize:13,fontWeight:tab===id?700:500,fontFamily:"inherit",background:"transparent",color:tab===id?C.blueL:C.textMid,marginBottom:-1}}>{label}</button>
          ))}
        </div>
      </div>
      <div style={{padding:"20px 28px",background:C.white,borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",gap:10,alignItems:"flex-end"}}>
          <div style={{flex:1}}>
            <label style={{display:"block",color:C.textMid,fontSize:12,fontWeight:600,marginBottom:6}}>{tab==="keywords"?"Enter keywords separated by comma":"Enter domain name"}</label>
            {tab==="keywords"
              ? <textarea value={query} onChange={e=>setQuery(e.target.value)} rows={2} style={{width:"100%",padding:"9px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,color:C.text,fontFamily:"inherit",outline:"none",resize:"none",lineHeight:1.5}} placeholder="e.g. seo, best seo tools"/>
              : <input value={domain} onChange={e=>setDomain(e.target.value)} style={{width:"100%",padding:"9px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,color:C.text,fontFamily:"inherit",outline:"none"}}/>
            }
          </div>
          <div style={{display:"flex",gap:8}}>
            <div><label style={{display:"block",color:C.textMid,fontSize:12,fontWeight:600,marginBottom:6}}>Country</label>
              <select value={country} onChange={e=>setCountry(e.target.value)} style={{padding:"9px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:12,fontFamily:"inherit",outline:"none",background:"white",color:C.text}}>
                <option>🇺🇸 United States (US)</option><option>🇵🇭 Philippines</option><option>🇬🇧 United Kingdom (UK)</option><option>🇦🇺 Australia</option><option>🇨🇦 Canada</option><option>🇳🇬 Nigeria</option>
              </select>
            </div>
            <div><label style={{display:"block",color:C.textMid,fontSize:12,fontWeight:600,marginBottom:6}}>Language</label>
              <select value={lang} onChange={e=>setLang(e.target.value)} style={{padding:"9px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:12,fontFamily:"inherit",outline:"none",background:"white",color:C.text}}>
                <option>English</option><option>Spanish</option><option>French</option><option>Arabic</option>
              </select>
            </div>
            <div style={{display:"flex",alignItems:"flex-end"}}><button onClick={()=>setSearched(true)} style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"9px 24px",borderRadius:8,fontSize:13,fontWeight:700,fontFamily:"inherit"}}>Research</button></div>
          </div>
        </div>
      </div>
      {searched && (
        <div style={{padding:"20px 28px"}}>
          <div style={{marginBottom:10,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div className="sg" style={{color:C.text,fontSize:14,fontWeight:700}}>Results <span style={{color:C.textDim,fontWeight:400,fontSize:12}}>— {kwResults.length} keywords found</span></div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{color:C.textDim,fontSize:12}}>Show</span>
              <select style={{padding:"4px 8px",border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,fontFamily:"inherit",outline:"none",background:"white"}}><option>10</option><option>25</option><option>50</option></select>
              <span style={{color:C.textDim,fontSize:12}}>entries</span>
            </div>
          </div>
          <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"2.5fr 130px 100px 110px 130px 80px 60px",padding:"10px 16px",background:C.bg,borderBottom:`1px solid ${C.border}`,gap:8}}>
              {["KEYWORD","MONTHLY SEARCHES","CPC","COMPETITION","LAST UPDATED","TREND","ADD"].map(h=>(<div key={h} style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:.4}}>{h}</div>))}
            </div>
            {pageData.map((row,i)=>(
              <div key={i} className="td" style={{display:"grid",gridTemplateColumns:"2.5fr 130px 100px 110px 130px 80px 60px",padding:"10px 16px",borderBottom:i<pageData.length-1?`1px solid ${C.border}`:"none",alignItems:"center",gap:8}}>
                <div style={{color:C.text,fontSize:13,fontWeight:500}}>{row.kw}</div>
                <div style={{color:C.text,fontSize:12.5,fontWeight:600}}>{row.vol}</div>
                <div style={{color:C.textMid,fontSize:12.5}}>{row.cpc}</div>
                <div><CompBadge comp={row.comp}/></div>
                <div style={{color:C.textDim,fontSize:12}}>{row.last}</div>
                <Spark data={row.trend} col={row.comp==="High"?C.orange:row.comp==="Medium"?C.blueL:C.green}/>
                <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"5px 10px",borderRadius:6,fontSize:11,fontWeight:700,fontFamily:"inherit"}}>Add</button>
              </div>
            ))}
            <div style={{padding:"12px 16px",background:C.bg,borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",flexDirection:"column",gap:8}}><ExportBar/><span style={{color:C.textDim,fontSize:12}}>Showing {(page-1)*perPage+1} to {Math.min(page*perPage,kwResults.length)} of {kwResults.length} entries</span></div>
              <div style={{display:"flex",gap:4}}>
                <button onClick={()=>setPage(p=>Math.max(1,p-1))} style={{padding:"5px 12px",border:`1px solid ${C.border}`,borderRadius:5,background:"transparent",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>Previous</button>
                {[...Array(totalPages)].map((_,i)=>(<button key={i} onClick={()=>setPage(i+1)} style={{padding:"5px 10px",border:"none",borderRadius:5,background:page===i+1?C.blueL:"transparent",color:page===i+1?"#fff":C.textMid,cursor:"pointer",fontSize:12,fontWeight:page===i+1?700:400,fontFamily:"inherit"}}>{i+1}</button>))}
                <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} style={{padding:"5px 12px",border:`1px solid ${C.border}`,borderRadius:5,background:"transparent",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>Next</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── On Page Audit ────────────────────────────────────────────────────
function OnPageAudit() {
  return (
    <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)"}}>
      <div style={{padding:"16px 24px",borderBottom:`1px solid ${C.border}`,background:C.white,display:"flex",gap:10}}>
        <div style={{flex:1,display:"flex",background:C.bg,border:`1px solid ${C.border}`,borderRadius:9,overflow:"hidden"}}>
          <input defaultValue="seoengineboost.com" style={{flex:1,padding:"9px 14px",background:"transparent",border:"none",outline:"none",color:C.text,fontSize:13,fontFamily:"inherit"}}/>
        </div>
        <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"10px 22px",borderRadius:9,fontSize:13,fontWeight:700,fontFamily:"inherit"}}>Run Audit</button>
      </div>
      <div style={{padding:"20px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:20}}>
          {[{l:"All Audits",s:78},{l:"Successful",s:85},{l:"Errors",s:62},{l:"Warnings",s:71},{l:"Basic Info",s:90}].map(({l,s})=>(
            <div key={l} className="card ch" style={{padding:"16px",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
              <ScoreRing score={s}/><div style={{color:C.textMid,fontSize:12,fontWeight:600}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{background:`linear-gradient(135deg,${C.orange},#EA6C0A)`,borderRadius:14,padding:"18px 22px",marginBottom:16,display:"flex",alignItems:"center",gap:20}}>
          <div style={{flex:1}}>
            <div style={{color:"rgba(255,255,255,.7)",fontSize:11,fontWeight:700,letterSpacing:.5,marginBottom:4}}>AUDIT REPORT</div>
            <div className="sg" style={{color:"#fff",fontSize:20,fontWeight:800}}>seoengineboost.com</div>
            <div style={{color:"rgba(255,255,255,.75)",fontSize:12.5,marginTop:4}}>Issues with internal backlinks, meta tags, HTTP status codes</div>
          </div>
          <ScoreRing score={78} size={72}/>
          <div style={{display:"flex",gap:8}}>
            <button style={{background:"rgba(255,255,255,.2)",border:"1px solid rgba(255,255,255,.3)",color:"#fff",padding:"8px 14px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",gap:6,alignItems:"center",fontFamily:"inherit"}}><Send size={12}/> Email</button>
            <button style={{background:"rgba(255,255,255,.2)",border:"1px solid rgba(255,255,255,.3)",color:"#fff",padding:"8px 14px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",gap:6,alignItems:"center",fontFamily:"inherit"}}><Download size={12}/> Download</button>
          </div>
        </div>
        <div className="card" style={{overflow:"hidden"}}>
          <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`}}><span className="sg" style={{color:C.text,fontSize:14,fontWeight:700}}>Audit Results</span></div>
          {auditItems.map(({label,status,desc,fix},i)=>{
            const ic={error:[C.red,C.redL,"✕"],warning:[C.yellow,C.yellowL,"⚠"],ok:[C.green,C.greenL,"✓"]};
            const[col,bg,sym]=ic[status];
            return (
              <div key={label} className="td" style={{display:"flex",alignItems:"center",gap:14,padding:"13px 18px",borderBottom:i<auditItems.length-1?`1px solid ${C.border}`:"none"}}>
                <div style={{width:28,height:28,borderRadius:7,background:bg,display:"flex",alignItems:"center",justifyContent:"center",color:col,fontSize:13,fontWeight:800,flexShrink:0}}>{sym}</div>
                <div style={{flex:1}}><div style={{color:C.text,fontSize:13,fontWeight:600}}>{label}</div><div style={{color:C.textDim,fontSize:11.5,marginTop:2}}>{desc}</div></div>
                <span className="chip" style={{color:col,background:bg}}>{status.toUpperCase()}</span>
                {fix&&<button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"5px 12px",borderRadius:8,fontSize:11,fontWeight:700,fontFamily:"inherit",display:"flex",alignItems:"center",gap:4}}><Zap size={10}/> AI Fix</button>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Backlink Research ─────────────────────────────────────────────────
function BacklinkResearch() {
  const [tab, setTab] = useState("overview");
  const [url, setUrl] = useState("https://seoengineboost.com/");
  const TABS = ["Overview","Backlinks","Referring Domains","Top Pages","Anchors","TLDs","Countries"];
  const blData = [
    {ds:33,ps:0,ref:"https://buzzakoo.com/search/hashtag/It_service/posts",target:"https://www.seoengineboost.com/seo-audit-services/",anchor:"SEO Audit Services",follow:"Follow",first:"2025-08-09",last:"2025-08-09"},
    {ds:42,ps:0,ref:"https://ajax-directory.com/listings84521/international-seo-agency",target:"https://www.seoengineboost.com/",anchor:"seoengineboost.com",follow:"Nofollow",first:"2025-08-08",last:"2025-08-08"},
    {ds:33,ps:0,ref:"https://buzzakoo.com/search/hashtag/It_service",target:"https://www.seoengineboost.com/seo-audit-services/",anchor:"SEO Audit Services",follow:"Follow",first:"2025-08-07",last:"2025-08-07"},
    {ds:70,ps:0,ref:"https://ekcechat.com/seo-tools",target:"https://www.seoengineboost.com/",anchor:"seoengineboost.com",follow:"Nofollow",first:"2025-07-31",last:"2025-07-31"},
    {ds:63,ps:0,ref:"https://your-directory.com/seo-engine-boost",target:"https://www.seoengineboost.com/",anchor:"SEO Engine Boost",follow:"Follow",first:"2025-07-31",last:"2025-07-31"},
  ];
  const anchorsData = [
    {anchor:"https://www.seoengineboost.com/",backlinks:29,domains:12},
    {anchor:"seoengineboost.com",backlinks:13,domains:5},
    {anchor:"SEO Audit Services",backlinks:6,domains:3},
    {anchor:"About Us",backlinks:15,domains:6},
  ];
  const tldsData = [{tld:".com",count:10,color:"#F59E0B"},{tld:".in",count:2,color:"#10B981"},{tld:".biz",count:1,color:"#EF4444"},{tld:"Other",count:4,color:"#94A3B8"}];
  const totalTLD = tldsData.reduce((s,d)=>s+d.count,0);
  return (
    <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)",background:C.bg}}>
      <div style={{padding:"22px 28px 0",background:C.white,borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16}}>
          <div><h2 className="sg" style={{color:C.text,fontSize:20,fontWeight:800,marginBottom:4}}>Backlink Research</h2><p style={{color:C.textDim,fontSize:13}}>See detailed backlink data for any page by entering the URL below.</p></div>
          <span style={{background:"#D1FAE5",color:"#065F46",fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:6,flexShrink:0}}>24 Searches Remaining</span>
        </div>
        <div style={{display:"flex",gap:10,marginBottom:18}}>
          <input value={url} onChange={e=>setUrl(e.target.value)} style={{flex:1,padding:"9px 14px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,color:C.text,fontFamily:"inherit",outline:"none",background:C.white}} placeholder="https://example.com"/>
          <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"9px 24px",borderRadius:8,fontSize:13,fontWeight:700,fontFamily:"inherit"}}>Research</button>
        </div>
        <div style={{display:"flex",gap:0}}>
          {TABS.map(t=>(<button key={t} onClick={()=>setTab(t.toLowerCase().replace(" ",""))} style={{padding:"10px 16px",border:"none",borderBottom:tab===t.toLowerCase().replace(" ","")?`2.5px solid ${C.blueL}`:"2.5px solid transparent",cursor:"pointer",fontSize:13,fontWeight:tab===t.toLowerCase().replace(" ","")? 700:500,fontFamily:"inherit",background:"transparent",color:tab===t.toLowerCase().replace(" ","")?C.blueL:C.textMid,marginBottom:-1}}>{t}</button>))}
        </div>
      </div>
      <div style={{padding:"24px 28px"}}>
        {tab==="overview" && (
          <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:"24px 28px",marginBottom:16}}>
            <div style={{display:"flex",gap:40,alignItems:"center"}}>
              {[{label:"Domain Strength",value:2},{label:"Page Strength",value:1}].map(({label,value})=>{
                const r=36,circ=2*Math.PI*r;
                return(<div key={label} style={{textAlign:"center"}}><div style={{position:"relative",width:90,height:90,margin:"0 auto 8px"}}><svg width={90} height={90} viewBox="0 0 90 90"><circle cx={45} cy={45} r={r} fill="none" stroke="#E2E8F0" strokeWidth={10}/><circle cx={45} cy={45} r={r} fill="none" stroke={C.red} strokeWidth={10} strokeDasharray={circ} strokeDashoffset={circ*(1-value/100)} strokeLinecap="round" style={{transform:"rotate(-90deg)",transformOrigin:"45px 45px"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:22,fontWeight:800,color:C.text,fontFamily:"Space Grotesk"}}>{value}</span></div></div><div style={{color:C.textMid,fontSize:12,fontWeight:600}}>{label}</div></div>);
              })}
              <div style={{width:1,height:60,background:C.border}}/>
              <div style={{display:"flex",gap:20}}>
                {[{icon:"🔗",v:"136",l:"Backlinks"},{icon:"🌐",v:"17",l:"Referring Domains"},{icon:"📍",v:"19",l:"IPs"},{icon:"🖧",v:"19",l:"Subnets"}].map(({icon,v,l})=>(
                  <div key={l} style={{textAlign:"center",padding:"12px 16px",background:C.bg,borderRadius:10,border:`1px solid ${C.border}`,minWidth:80}}>
                    <div style={{fontSize:20,marginBottom:4}}>{icon}</div>
                    <div className="sg" style={{color:C.text,fontSize:22,fontWeight:800,lineHeight:1}}>{v}</div>
                    <div style={{color:C.textDim,fontSize:11,marginTop:2}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab==="backlinks" && (
          <div>
            <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"50px 50px 2fr 2fr 1.5fr 90px 100px 100px",padding:"9px 14px",background:C.bg,borderBottom:`1px solid ${C.border}`,gap:8}}>
                {["DS","PS","REFERRING PAGE","TARGET PAGE","ANCHOR TEXT","FOLLOW","FIRST SEEN","LAST CRAWLED"].map(h=>(<div key={h} style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:.4}}>{h}</div>))}
              </div>
              {blData.map((row,i)=>(
                <div key={i} className="td" style={{display:"grid",gridTemplateColumns:"50px 50px 2fr 2fr 1.5fr 90px 100px 100px",padding:"10px 14px",borderBottom:i<blData.length-1?`1px solid ${C.border}`:"none",alignItems:"center",gap:8}}>
                  <div style={{background:row.ds>=60?"#FEF3C7":row.ds>=30?"#DBEAFE":"#FEE2E2",color:row.ds>=60?C.yellow:row.ds>=30?C.blueL:C.red,fontWeight:800,fontSize:11,padding:"2px 6px",borderRadius:5,textAlign:"center"}}>{row.ds}</div>
                  <div style={{color:C.textDim,fontSize:11,textAlign:"center"}}>{row.ps}</div>
                  <div style={{color:C.blueL,fontSize:11,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",cursor:"pointer"}}>{row.ref}</div>
                  <div style={{color:C.blueL,fontSize:11,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",cursor:"pointer"}}>{row.target}</div>
                  <div style={{color:C.textMid,fontSize:11,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.anchor}</div>
                  <div><span style={{background:row.follow==="Follow"?C.greenL:C.redL,color:row.follow==="Follow"?C.green:C.red,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:4}}>{row.follow}</span></div>
                  <div style={{color:C.textDim,fontSize:11}}>{row.first}</div>
                  <div style={{color:C.textDim,fontSize:11}}>{row.last}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="anchors" && (
          <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 120px",padding:"9px 18px",background:C.bg,borderBottom:`1px solid ${C.border}`}}>
              <div style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:.4}}>ANCHOR</div>
              <div style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:.4,textAlign:"right"}}>BACKLINKS</div>
            </div>
            {anchorsData.map((row,i)=>(
              <div key={i} className="td" style={{display:"grid",gridTemplateColumns:"1fr 120px",padding:"11px 18px",borderBottom:i<anchorsData.length-1?`1px solid ${C.border}`:"none",alignItems:"center"}}>
                <div style={{color:C.blueL,fontSize:12.5,cursor:"pointer"}}>{row.anchor}</div>
                <div style={{color:C.text,fontSize:13,fontWeight:700,textAlign:"right"}}>{row.backlinks}</div>
              </div>
            ))}
          </div>
        )}
        {tab==="tlds" && (
          <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:"28px 32px"}}>
            <div style={{display:"flex",alignItems:"center",gap:48}}>
              <svg width={160} height={160} viewBox="0 0 160 160">
                {(()=>{let cum=0;const r=60,cx=80,cy=80,circ=2*Math.PI*r;return tldsData.map(({count,color})=>{const pct=count/totalTLD,sl=pct*circ,rot=(cum/totalTLD)*360-90;cum+=count;return(<circle key={color} cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={28} strokeDasharray={`${circ*pct} ${circ*(1-pct)}`} strokeDashoffset={0} style={{transform:`rotate(${rot}deg)`,transformOrigin:`${cx}px ${cy}px`}}/>);})})()}
                <circle cx={80} cy={80} r={46} fill="white"/>
                <text x={80} y={77} textAnchor="middle" style={{fontSize:18,fontWeight:800,fill:C.text,fontFamily:"Space Grotesk"}}>{totalTLD}</text>
                <text x={80} y={91} textAnchor="middle" style={{fontSize:9,fill:C.textDim}}>Total</text>
              </svg>
              <div style={{flex:1}}>
                {tldsData.map(({tld,count,color})=>(
                  <div key={tld} style={{display:"flex",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:color,marginRight:12,flexShrink:0}}/>
                    <span style={{color:C.text,fontSize:13,flex:1}}>{tld}</span>
                    <div style={{flex:2,margin:"0 16px"}}><ProgBar v={(count/totalTLD)*100} col={color} h={6}/></div>
                    <span style={{color:C.text,fontSize:13,fontWeight:700,minWidth:30,textAlign:"right"}}>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {(tab==="referringdomains"||tab==="toppages"||tab==="countries") && (
          <div className="card" style={{padding:"40px",textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:16}}>📊</div>
            <div className="sg" style={{color:C.text,fontSize:16,fontWeight:700}}>Enter a URL and click Research to see {tab} data</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Tasks / Kanban ─────────────────────────────────────────────────────
function Tasks() {
  const [view, setView] = useState("kanban");
  return (
    <div className="fade" style={{height:"calc(100vh - 57px)",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{padding:"10px 22px",borderBottom:`1px solid ${C.border}`,background:C.white,display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
        <div style={{display:"flex",gap:3,background:C.bg,padding:3,borderRadius:8,border:`1px solid ${C.border}`}}>
          {[{k:"kanban",icon:Kanban,l:"Kanban"},{k:"list",icon:AlignLeft,l:"List"},{k:"calendar",icon:CalendarCheck,l:"Calendar"}].map(({k,icon:Icon,l})=>(
            <button key={k} onClick={()=>setView(k)} style={{display:"flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:7,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:view===k?C.blueL:"transparent",color:view===k?"#fff":C.textDim,fontFamily:"inherit"}}><Icon size={12}/>{l}</button>
          ))}
        </div>
        <div style={{marginLeft:"auto",display:"flex",gap:7}}>
          {[{icon:Filter,l:"Filter"},{icon:SortAsc,l:"Sort"},{icon:Tag,l:"Labels"}].map(({icon:Icon,l})=>(
            <button key={l} style={{background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",display:"flex",alignItems:"center",gap:5,padding:"6px 11px",borderRadius:8,fontSize:12,fontWeight:600,fontFamily:"inherit"}}><Icon size={12}/>{l}</button>
          ))}
          <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:5,padding:"7px 14px",borderRadius:8,fontSize:12,fontWeight:700,fontFamily:"inherit"}}><Plus size={13}/> Add Task</button>
        </div>
      </div>
      <div style={{flex:1,overflowX:"auto",overflowY:"hidden",padding:"16px 22px",background:C.bg}}>
        <div style={{display:"flex",gap:12,height:"100%"}}>
          {Object.entries(kanbanData).map(([colId,{label,color,tasks}])=>(
            <div key={colId} style={{flex:"0 0 268px",display:"flex",flexDirection:"column",height:"100%",background:C.white,borderRadius:12,padding:"12px 10px",border:`1px solid ${C.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:12}}>
                <div style={{width:8,height:8,borderRadius:2,background:color}}/>
                <span className="sg" style={{color:C.text,fontWeight:700,fontSize:13}}>{label}</span>
                <span className="chip" style={{color,background:`${color}18`,marginLeft:2}}>{tasks.length}</span>
                <Plus size={12} color={C.textDim} style={{marginLeft:"auto",cursor:"pointer"}}/>
              </div>
              <div style={{flex:1,overflowY:"auto"}}>
                {tasks.map(({id,title,tags,pri,avs,due,cmts,prog})=>(
                  <div key={id} className="kc">
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}><PriBadge p={pri}/><MoreHorizontal size={12} color={C.textDim} style={{cursor:"pointer"}}/></div>
                    <p style={{color:C.text,fontSize:12.5,fontWeight:500,lineHeight:1.5,marginBottom:8}}>{title}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:8}}>{tags.map(t=><span key={t} className="chip" style={{color:C.blue,background:C.bluePale}}>{t}</span>)}</div>
                    {prog!==undefined&&(<div style={{marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{color:C.textDim,fontSize:10}}>Progress</span><span style={{color:C.blueL,fontSize:10,fontWeight:700}}>{prog}%</span></div><ProgBar v={prog} col={prog>70?C.green:C.blueL}/></div>)}
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <div style={{display:"flex"}}>{avs.map((a,i)=><div key={i} style={{marginLeft:i>0?-6:0,zIndex:avs.length-i}}><Av l={a} size={19}/></div>)}</div>
                      <div style={{display:"flex",alignItems:"center",gap:3,color:C.textDim,fontSize:10,marginLeft:"auto"}}><MessageSquare size={9}/>{cmts}</div>
                      <div style={{display:"flex",alignItems:"center",gap:3,color:C.textDim,fontSize:10}}><Clock size={9}/>{due}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Messages ───────────────────────────────────────────────────────────
function Messages() {
  const [ch, setCh] = useState("seo-team");
  const [input, setInput] = useState("");
  const [aiShow, setAiShow] = useState(true);
  return (
    <div className="fade" style={{display:"flex",height:"calc(100vh - 57px)",overflow:"hidden"}}>
      <div style={{width:200,background:C.white,borderRight:`1px solid ${C.border}`,padding:"12px 8px",overflowY:"auto",flexShrink:0}}>
        <div style={{marginBottom:8}}>{[{l:"Inbox",icon:Inbox},{l:"Drafts",icon:Edit2}].map(({l,icon:Icon})=>(<div key={l} style={{display:"flex",alignItems:"center",gap:7,padding:"6px 9px",borderRadius:7,cursor:"pointer",color:C.textDim,fontSize:12.5}}><Icon size={13}/>{l}</div>))}</div>
        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:8}}>
          <div style={{display:"flex",justifyContent:"space-between",padding:"0 8px",marginBottom:5}}><span style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:1}}>CHANNELS</span><Plus size={11} color={C.textDim} style={{cursor:"pointer"}}/></div>
          {channels.map(({n,u})=>(
            <div key={n} onClick={()=>setCh(n)} style={{display:"flex",alignItems:"center",gap:7,padding:"6px 9px",borderRadius:7,cursor:"pointer",fontSize:12.5,background:ch===n?C.bluePale:"transparent",color:ch===n?C.blue:C.textDim,fontWeight:ch===n?700:400,marginBottom:1}}>
              <Hash size={12}/><span style={{flex:1}}>#{n}</span>
              {u>0&&<span style={{background:C.orange,color:"#fff",fontSize:9,fontWeight:700,width:16,height:16,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{u}</span>}
            </div>
          ))}
        </div>
        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:8,marginTop:4}}>
          <div style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:1,padding:"0 8px",marginBottom:5}}>DIRECT</div>
          {[{n:"Mahmoud",s:"online"},{n:"Aisha",s:"online"},{n:"Sam",s:"away"},{n:"Jordan",s:"offline"}].map(({n,s})=>(
            <div key={n} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 9px",borderRadius:7,cursor:"pointer",fontSize:12,color:C.textMid}}>
              <div style={{position:"relative"}}><Av l={n[0]} size={18}/><div style={{width:5,height:5,borderRadius:"50%",background:s==="online"?C.green:s==="away"?C.yellow:C.textDim,position:"absolute",bottom:-1,right:-1,border:"1px solid #fff"}}/></div>{n}
            </div>
          ))}
        </div>
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{padding:"10px 18px",borderBottom:`1px solid ${C.border}`,background:C.white,display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
          <Hash size={15} color={C.blueL}/><span className="sg" style={{color:C.text,fontWeight:700,fontSize:14}}>#{ch}</span><span style={{color:C.textDim,fontSize:12}}>· 8 members</span>
          <div style={{marginLeft:"auto",display:"flex",gap:5}}>{[Phone,Video,Search,Pin].map((Icon,i)=>(<button key={i} style={{background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",padding:"5px 7px",borderRadius:7,display:"flex"}}><Icon size={13}/></button>))}</div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"18px 20px",background:C.bg}}>
          {chatMsgs.map(({id,user,av,text,time,mine})=>(
            <div key={id} style={{display:"flex",flexDirection:mine?"row-reverse":"row",gap:9,marginBottom:16,alignItems:"flex-end"}}>
              {!mine&&<Av l={av} size={28}/>}
              <div style={{maxWidth:"65%"}}>
                {!mine&&<div style={{color:C.textDim,fontSize:10.5,marginBottom:3,fontWeight:600}}>{user} · {time}</div>}
                <div style={{padding:"9px 13px",borderRadius:mine?"13px 13px 3px 13px":"3px 13px 13px 13px",background:mine?C.blueL:C.white,color:mine?"#fff":C.text,fontSize:13.5,lineHeight:1.5,border:mine?"none":`1px solid ${C.border}`,boxShadow:mine?"none":"0 1px 4px rgba(0,0,0,.05)"}}>{text}</div>
                {mine&&<div style={{color:C.textDim,fontSize:9.5,textAlign:"right",marginTop:2}}>{time} · ✓✓</div>}
              </div>
            </div>
          ))}
          {aiShow&&(
            <div style={{padding:"13px 15px",background:"#FFF7ED",border:`1px solid ${C.orangeL}`,borderRadius:10,display:"flex",alignItems:"flex-start",gap:11,marginBottom:8}}>
              <div style={{width:32,height:32,borderRadius:8,background:C.orangeL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Zap size={14} color={C.orange}/></div>
              <div style={{flex:1}}><div style={{color:C.orange,fontSize:12.5,fontWeight:700,marginBottom:3}}>AI detected 3 action items</div><div style={{color:C.textMid,fontSize:12,lineHeight:1.5}}>Write 6 dental articles, setup GA4, prepare keyword brief.</div></div>
              <div style={{display:"flex",gap:5}}>
                <button style={{background:C.orange,color:"#fff",border:"none",cursor:"pointer",padding:"5px 12px",borderRadius:8,fontSize:11,fontWeight:700,fontFamily:"inherit"}}>Convert</button>
                <button onClick={()=>setAiShow(false)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={13} color={C.textDim}/></button>
              </div>
            </div>
          )}
        </div>
        <div style={{padding:"10px 18px 14px",borderTop:`1px solid ${C.border}`,background:C.white,flexShrink:0}}>
          <div style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:10,display:"flex",alignItems:"center",gap:7,padding:"7px 11px"}}>
            {[Paperclip,Image,Link2,AtSign].map((Icon,i)=>(<button key={i} style={{background:"none",border:"none",cursor:"pointer"}}><Icon size={14} color={C.textDim}/></button>))}
            <div style={{width:1,height:16,background:C.border}}/>
            <input placeholder={`Message #${ch}...`} value={input} onChange={e=>setInput(e.target.value)} style={{flex:1,background:"transparent",border:"none",outline:"none",color:C.text,fontSize:13,fontFamily:"inherit"}}/>
            <Smile size={14} color={C.textDim} style={{cursor:"pointer"}}/><Bot size={14} color={C.blueL} style={{cursor:"pointer"}}/>
            <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"6px 12px",borderRadius:9,display:"flex",alignItems:"center",gap:5,fontSize:12,fontWeight:700,fontFamily:"inherit"}}><Send size={12}/> Send</button>
          </div>
        </div>
      </div>
      <div style={{width:240,background:C.white,borderLeft:`1px solid ${C.border}`,padding:14,overflowY:"auto",flexShrink:0}}>
        <div style={{background:"#EFF6FF",border:`1px solid #BFDBFE`,borderRadius:10,padding:12,marginBottom:14}}>
          <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:7}}><Bot size={13} color={C.blueL}/><span className="sg" style={{color:C.blue,fontSize:12,fontWeight:700}}>Boostly AI</span></div>
          <p style={{color:C.textMid,fontSize:12,lineHeight:1.6,marginBottom:8}}>3 conversation threads about Dental client. Want me to create task list?</p>
          <div style={{display:"flex",gap:5}}>
            <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"5px 10px",borderRadius:7,fontSize:11,fontWeight:700,fontFamily:"inherit"}}>Create tasks</button>
            <button style={{background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",padding:"5px 8px",borderRadius:7,fontSize:11,fontFamily:"inherit"}}>Summarize</button>
          </div>
        </div>
        <div className="sg" style={{color:C.text,fontSize:13,fontWeight:700,marginBottom:9}}>Members</div>
        {[{n:"Mahmoud",s:"online"},{n:"Aisha",s:"online"},{n:"Sam",s:"away"},{n:"Jordan",s:"offline"},{n:"You",s:"online"}].map(({n,s})=>(
          <div key={n} style={{display:"flex",alignItems:"center",gap:8,marginBottom:9}}>
            <div style={{position:"relative"}}><Av l={n[0]} size={24}/><div style={{width:6,height:6,borderRadius:"50%",background:s==="online"?C.green:s==="away"?C.yellow:C.textDim,position:"absolute",bottom:-1,right:-1,border:"1.5px solid #fff"}}/></div>
            <div><div style={{color:C.text,fontSize:12,fontWeight:600}}>{n}</div><div style={{color:C.textDim,fontSize:10,textTransform:"capitalize"}}>{s}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Clients ─────────────────────────────────────────────────────────────
function Clients() {
  return (
    <div className="fade" style={{padding:"22px 24px",overflowY:"auto",height:"calc(100vh - 57px)"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
        {[{l:"Total Clients",v:"18",icon:Users,c:C.blueL},{l:"Active Projects",v:"34",icon:Briefcase,c:C.orange},{l:"Pending Approvals",v:"6",icon:AlertCircle,c:C.yellow},{l:"Monthly Revenue",v:"$22.1K",icon:TrendingUp,c:C.green}].map(({l,v,icon:Icon,c})=>(
          <div key={l} className="card ch" style={{padding:"16px 18px"}}>
            <div style={{width:34,height:34,borderRadius:9,background:`${c}18`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}><Icon size={15} color={c}/></div>
            <div className="sg" style={{color:C.text,fontSize:22,fontWeight:800}}>{v}</div>
            <div style={{color:C.textDim,fontSize:11,marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{overflow:"hidden"}}>
        <div style={{padding:"13px 20px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span className="sg" style={{color:C.text,fontSize:14,fontWeight:700}}>All Clients</span>
          <div style={{display:"flex",gap:7}}>
            <button style={{background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",display:"flex",gap:5,padding:"6px 12px",borderRadius:8,fontSize:12,fontWeight:600,fontFamily:"inherit"}}><Filter size={12}/> Filter</button>
            <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",display:"flex",gap:5,padding:"7px 14px",borderRadius:8,fontSize:12,fontWeight:700,fontFamily:"inherit"}}><Plus size={13}/> Add Client</button>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1.2fr 100px",padding:"9px 20px",background:C.bg,borderBottom:`1px solid ${C.border}`}}>
          {["Client","Status","Tasks","Revenue","Health Score","Actions"].map(h=>(<div key={h} style={{color:C.textDim,fontSize:10.5,fontWeight:700,letterSpacing:.4}}>{h.toUpperCase()}</div>))}
        </div>
        {clientList.map(({n,av,status,tasks,done,rev,health,last},i)=>(
          <div key={n} className="td" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1.2fr 100px",padding:"13px 20px",borderBottom:i<clientList.length-1?`1px solid ${C.border}`:"none",alignItems:"center",cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:9}}><Av l={av} size={34}/><div><div style={{color:C.text,fontWeight:700,fontSize:13}}>{n}</div><div style={{color:C.textDim,fontSize:10.5}}>Last active {last}</div></div></div>
            <div><span className="chip" style={{color:status==="active"?C.green:status==="review"?C.yellow:C.textDim,background:status==="active"?C.greenL:status==="review"?C.yellowL:"#F1F5F9"}}>{status.charAt(0).toUpperCase()+status.slice(1)}</span></div>
            <div style={{color:C.textMid,fontSize:12.5}}><span style={{color:C.text,fontWeight:700}}>{done}</span>/{tasks}</div>
            <div style={{color:C.green,fontWeight:700,fontSize:13.5}}>{rev}</div>
            <div style={{display:"flex",alignItems:"center",gap:6}}><ProgBar v={health} col={health>75?C.green:health>50?C.yellow:C.red} h={5}/><span style={{color:health>75?C.green:health>50?C.yellow:C.red,fontSize:11,fontWeight:700,minWidth:28}}>{health}%</span></div>
            <div style={{display:"flex",gap:4}}>{[Eye,MessageSquare,ExternalLink].map((Icon,j)=>(<button key={j} style={{background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",width:26,height:26,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={11}/></button>))}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Settings ─────────────────────────────────────────────────────────
function SettingsView() {
  const [tab, setTab] = useState("profile");
  const [biometric, setBiometric] = useState(false);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifSMS, setNotifSMS] = useState(false);
  const [notifWeekly, setNotifWeekly] = useState(true);
  const tabs = [{id:"profile",icon:Users,l:"Profile"},{id:"general",icon:Settings,l:"General"},{id:"security",icon:Shield,l:"Security"},{id:"notifications",icon:Bell,l:"Notifications"},{id:"integrations",icon:Cpu,l:"Integrations"},{id:"billing",icon:BarChart,l:"Billing & Plan"},{id:"workspace",icon:Briefcase,l:"Workspace"}];
  const Toggle = ({on,setOn}) => (<div onClick={()=>setOn(!on)} style={{width:44,height:24,borderRadius:12,background:on?C.blueL:"#CBD5E1",cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}><div style={{width:20,height:20,borderRadius:"50%",background:"#fff",position:"absolute",top:2,left:on?22:2,transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/></div>);
  return (
    <div className="fade" style={{display:"flex",height:"calc(100vh - 57px)",overflow:"hidden"}}>
      <div style={{width:200,background:C.white,borderRight:`1px solid ${C.border}`,padding:"14px 8px",flexShrink:0}}>
        <div style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:1.2,padding:"0 8px",marginBottom:6}}>SETTINGS</div>
        {tabs.map(({id,icon:Icon,l})=>(<div key={id} className={`nav${tab===id?" on":""}`} onClick={()=>setTab(id)}><Icon size={14}/>{l}</div>))}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"24px 32px",background:C.bg}}>
        {tab==="profile" && (
          <div style={{maxWidth:620}}>
            <div className="sg" style={{color:C.text,fontSize:18,fontWeight:800,marginBottom:5}}>Profile</div>
            <div className="card" style={{padding:"22px 24px",marginBottom:16}}>
              <div style={{display:"flex",alignItems:"center",gap:18,marginBottom:22,paddingBottom:18,borderBottom:`1px solid ${C.border}`}}>
                <div style={{position:"relative"}}><Av l="Y" size={72}/><button style={{position:"absolute",bottom:0,right:0,width:22,height:22,borderRadius:"50%",background:C.blueL,border:"2px solid #fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Edit2 size={10} color="#fff"/></button></div>
                <div><div style={{color:C.text,fontSize:17,fontWeight:800}}>Your Name</div><div style={{color:C.textDim,fontSize:13,marginBottom:4}}>Admin · SEO Specialist</div><span className="chip" style={{color:C.green,background:C.greenL}}>Pro Plan · Active</span></div>
                <button style={{marginLeft:"auto",background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",padding:"7px 14px",borderRadius:8,fontSize:12,fontFamily:"inherit"}}>Edit Profile</button>
              </div>
              {[{l:"Full Name",v:"Your Name",type:"text"},{l:"Email Address",v:"admin@boostly.app",type:"email"},{l:"Phone",v:"+63 912 345 6789",type:"tel"},{l:"Company",v:"SEO Engine Boost",type:"text"},{l:"Website",v:"https://seoengineboost.com",type:"url"}].map(({l,v,type})=>(
                <div key={l} style={{marginBottom:14}}><label style={{color:C.textMid,fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>{l}</label><input defaultValue={v} type={type} style={{width:"100%",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 13px",color:C.text,fontSize:13,fontFamily:"inherit",outline:"none"}}/></div>
              ))}
              <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"9px 22px",borderRadius:9,fontSize:13,fontWeight:700,fontFamily:"inherit"}}>Save Changes</button>
            </div>
          </div>
        )}
        {tab==="notifications" && (
          <div style={{maxWidth:620}}>
            <div className="sg" style={{color:C.text,fontSize:18,fontWeight:800,marginBottom:5}}>Notifications</div>
            {[{label:"Email Notifications",desc:"Reports, alerts and updates via email",on:notifEmail,setOn:setNotifEmail},{label:"Push Notifications",desc:"Browser push notifications for real-time alerts",on:notifPush,setOn:setNotifPush},{label:"SMS Notifications",desc:"Text message alerts for critical updates",on:notifSMS,setOn:setNotifSMS},{label:"Weekly SEO Report",desc:"Automated weekly summary",on:notifWeekly,setOn:setNotifWeekly}].map(({label,desc,on,setOn})=>(
              <div key={label} className="card" style={{padding:"16px 20px",marginBottom:10,display:"flex",alignItems:"center",gap:14}}>
                <div style={{flex:1}}><div style={{color:C.text,fontSize:13.5,fontWeight:600}}>{label}</div><div style={{color:C.textDim,fontSize:12,marginTop:2}}>{desc}</div></div>
                <Toggle on={on} setOn={setOn}/>
              </div>
            ))}
          </div>
        )}
        {tab==="security" && (
          <div style={{maxWidth:620}}>
            <div className="sg" style={{color:C.text,fontSize:18,fontWeight:800,marginBottom:5}}>Security</div>
            <div className="card" style={{padding:"22px 24px",marginBottom:16}}>
              <div className="sg" style={{color:C.text,fontSize:14,fontWeight:700,marginBottom:14}}>Change Password</div>
              {[{l:"Current Password",p:"Enter current password"},{l:"New Password",p:"Min. 8 characters"},{l:"Confirm New Password",p:"Repeat new password"}].map(({l,p})=>(
                <div key={l} style={{marginBottom:14}}><label style={{color:C.textMid,fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>{l}</label><input type="password" placeholder={p} style={{width:"100%",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 13px",color:C.text,fontSize:13,fontFamily:"inherit",outline:"none"}}/></div>
              ))}
              <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"9px 22px",borderRadius:9,fontSize:13,fontWeight:700,fontFamily:"inherit"}}>Update Password</button>
            </div>
            <div className="card" style={{padding:"20px 24px"}}>
              <div className="sg" style={{color:C.text,fontSize:14,fontWeight:700,marginBottom:4}}>Two-Factor Authentication</div>
              <p style={{color:C.textDim,fontSize:12.5,marginBottom:14}}>Add an extra layer of security to your account.</p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span className="chip" style={{color:C.textDim,background:"#F1F5F9"}}>Not Enabled</span>
                <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"8px 18px",borderRadius:8,fontSize:12,fontWeight:700,fontFamily:"inherit"}}>Enable 2FA</button>
              </div>
            </div>
          </div>
        )}
        {tab==="integrations" && (
          <div style={{maxWidth:700}}>
            <div className="sg" style={{color:C.text,fontSize:18,fontWeight:800,marginBottom:5}}>Integrations</div>
            {[{n:"Google Analytics 4",d:"Traffic, conversions and behavior tracking",connected:true,cat:"Analytics"},{n:"Semrush",d:"Import keyword data, site audits and analytics",connected:false,cat:"SEO"},{n:"Google Search Console",d:"Search rankings, clicks and indexation data",connected:false,cat:"SEO"},{n:"Slack",d:"Sync notifications, alerts and team messages",connected:true,cat:"Communication"},{n:"WordPress",d:"One-click content publishing to your CMS",connected:true,cat:"CMS"},{n:"Ahrefs",d:"Backlink intelligence and keyword explorer",connected:false,cat:"SEO"},{n:"HubSpot",d:"CRM, lead management and marketing automation",connected:false,cat:"CRM"},{n:"Zapier",d:"Automate workflows with 5,000+ apps",connected:false,cat:"Automation"}].map(({n,d,connected,cat})=>(
              <div key={n} className="card" style={{padding:"14px 18px",marginBottom:10,display:"flex",alignItems:"center",gap:14,border:connected?`1px solid ${C.green}40`:`1px solid ${C.border}`}}>
                <div style={{width:40,height:40,borderRadius:10,background:connected?C.greenL:C.bgLight,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Globe size={17} color={connected?C.green:C.blueL}/></div>
                <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}><div style={{color:C.text,fontWeight:700,fontSize:13.5}}>{n}</div><span className="chip" style={{color:C.textDim,background:"#F1F5F9",fontSize:9}}>{cat}</span></div><div style={{color:C.textDim,fontSize:12}}>{d}</div></div>
                <button style={{padding:"8px 16px",borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit",background:connected?C.greenL:C.blueL,color:connected?C.green:"#fff",flexShrink:0}}>{connected?"Connected ✓":"Connect"}</button>
              </div>
            ))}
          </div>
        )}
        {tab==="billing" && (
          <div style={{maxWidth:680}}>
            <div className="sg" style={{color:C.text,fontSize:18,fontWeight:800,marginBottom:5}}>Billing & Plan</div>
            <div style={{background:`linear-gradient(135deg,${C.blue},${C.blueL})`,borderRadius:14,padding:"22px 26px",marginBottom:16}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div><div style={{color:"rgba(255,255,255,.7)",fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:4}}>CURRENT PLAN</div><div className="sg" style={{color:"#fff",fontSize:22,fontWeight:900,marginBottom:4}}>Pro Plan</div><div style={{color:"rgba(255,255,255,.75)",fontSize:13}}>$30/month · Renews June 1, 2026</div></div>
                <div style={{textAlign:"right"}}><div style={{color:"rgba(255,255,255,.7)",fontSize:11,marginBottom:4}}>Usage this month</div><div style={{color:"#fff",fontSize:18,fontWeight:800}}>4 / 4 crawls</div><button style={{marginTop:8,background:C.orange,color:"#fff",border:"none",cursor:"pointer",padding:"7px 16px",borderRadius:8,fontSize:12,fontWeight:700,fontFamily:"inherit"}}>Upgrade Plan</button></div>
              </div>
            </div>
            <div className="card" style={{padding:"18px 22px"}}>
              <div className="sg" style={{color:C.text,fontSize:13,fontWeight:700,marginBottom:12}}>Monthly Usage</div>
              {[{l:"Site Crawls",v:4,max:4,c:C.red},{l:"Keyword Searches",v:36,max:40,c:C.orange},{l:"Backlink Lookups",v:24,max:24,c:C.red},{l:"Reports Generated",v:8,max:20,c:C.green}].map(({l,v,max,c})=>(
                <div key={l} style={{marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{color:C.textMid,fontSize:12}}>{l}</span><span style={{color:v>=max?C.red:C.text,fontSize:12,fontWeight:700}}>{v} / {max}</span></div>
                  <ProgBar v={(v/max)*100} col={v>=max?C.red:v>=max*0.8?C.orange:c} h={6}/>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="general" && (
          <div style={{maxWidth:620}}>
            <div className="sg" style={{color:C.text,fontSize:18,fontWeight:800,marginBottom:5}}>General Settings</div>
            <div className="card" style={{overflow:"hidden",marginBottom:16}}>
              <div style={{padding:"12px 16px 8px",color:C.textDim,fontSize:10.5,fontWeight:700,letterSpacing:1}}>SECURITY</div>
              <div style={{padding:"12px 16px 6px 16px",borderBottom:`1px solid ${C.border}`}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12}}><div style={{width:36,height:36,borderRadius:10,background:C.bgLight,display:"flex",alignItems:"center",justifyContent:"center"}}><Cpu size={15} color={C.blueL}/></div><div><div style={{color:C.text,fontSize:13.5,fontWeight:500}}>Biometric Login</div><div style={{color:C.textDim,fontSize:11.5,marginTop:1}}>Use fingerprint or face ID</div></div></div>
                  <Toggle on={biometric} setOn={setBiometric}/>
                </div>
              </div>
            </div>
            <div className="card" style={{overflow:"hidden"}}>
              <div style={{padding:"12px 16px 8px",color:C.red,fontSize:10.5,fontWeight:700,letterSpacing:1}}>DANGER ZONE</div>
              <div className="td" style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",cursor:"pointer",borderBottom:`1px solid ${C.border}`}}><div style={{width:36,height:36,borderRadius:10,background:C.redL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><AlertCircle size={15} color={C.red}/></div><div style={{flex:1}}><div style={{color:C.red,fontSize:13.5,fontWeight:500}}>Delete Account</div><div style={{color:C.textDim,fontSize:12,marginTop:2}}>Permanently delete your account</div></div><ChevronRight size={15} color={C.textDim}/></div>
              <div className="td" style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",cursor:"pointer"}}><div style={{width:36,height:36,borderRadius:10,background:C.redL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><LogOut size={15} color={C.red}/></div><div style={{flex:1}}><div style={{color:C.red,fontSize:13.5,fontWeight:500}}>Sign Out</div></div><ChevronRight size={15} color={C.textDim}/></div>
            </div>
          </div>
        )}
        {tab==="workspace" && (
          <div style={{maxWidth:620}}>
            <div className="sg" style={{color:C.text,fontSize:18,fontWeight:800,marginBottom:5}}>Workspace Settings</div>
            <div className="card" style={{padding:"22px 24px"}}>
              {[{l:"Workspace Name",v:"SEO Engine Boost"},{l:"Website URL",v:"https://seoengineboost.com"},{l:"Industry",v:"Digital Marketing"},{l:"Team Size",v:"1-10 people"}].map(({l,v})=>(
                <div key={l} style={{marginBottom:14}}><label style={{color:C.textMid,fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>{l}</label><input defaultValue={v} style={{width:"100%",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 13px",color:C.text,fontSize:13,fontFamily:"inherit",outline:"none"}}/></div>
              ))}
              <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"9px 22px",borderRadius:9,fontSize:13,fontWeight:700,fontFamily:"inherit"}}>Save Workspace</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Competitive Research ──────────────────────────────────────────────
function CompetitiveResearch() {
  return (
    <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)"}}>
      <div style={{padding:"16px 24px",borderBottom:`1px solid ${C.border}`,background:C.white,display:"flex",gap:10}}>
        <div style={{flex:1,display:"flex",background:C.bg,border:`1px solid ${C.border}`,borderRadius:9,overflow:"hidden"}}>
          <input defaultValue="designer.com" style={{flex:1,padding:"9px 14px",background:"transparent",border:"none",outline:"none",color:C.text,fontSize:13,fontFamily:"inherit"}}/>
          <select style={{background:"transparent",border:"none",outline:"none",color:C.textMid,fontSize:12,padding:"0 12px",borderLeft:`1px solid ${C.border}`,cursor:"pointer",fontFamily:"inherit"}}><option>Global</option><option>Philippines</option><option>United States</option></select>
        </div>
        <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"10px 22px",borderRadius:9,fontSize:13,fontWeight:700,fontFamily:"inherit"}}>Compare</button>
        <button style={{background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",padding:"10px 14px",borderRadius:9,fontSize:13,fontWeight:600,display:"flex",alignItems:"center",gap:6,fontFamily:"inherit"}}><Plus size={13}/> Add Competitor</button>
      </div>
      <div style={{padding:"20px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 220px",gap:14,marginBottom:16}}>
          <div className="card" style={{padding:"18px 20px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{color:C.orange,fontWeight:800,fontSize:16,fontFamily:"Space Grotesk"}}>Organic Traffic</span><span style={{color:C.textDim,fontSize:13}}>81,346/month</span></div>
                <div style={{color:C.textDim,fontSize:12}}>designer.com · Date: 12 September 2025</div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
              {[["Visits","333K","+4%"],["Unique Visitors","33K","+3%"],["Pages/Visit","4.2",""],["Avg Duration","3:21",""]].map(([l,v,ch])=>(
                <div key={l} style={{padding:"10px 12px",background:C.bg,borderRadius:8,border:`1px solid ${C.border}`}}>
                  <div style={{color:C.textDim,fontSize:10.5,marginBottom:4}}>{l}</div>
                  <div className="sg" style={{color:C.text,fontSize:18,fontWeight:800}}>{v}</div>
                  {ch&&<div style={{color:C.green,fontSize:10.5,fontWeight:700}}>{ch}</div>}
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={130}>
              <AreaChart data={trafficData} margin={{top:0,right:0,left:-22,bottom:0}}>
                <defs><linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.blueL} stopOpacity={.18}/><stop offset="95%" stopColor={C.blueL} stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
                <XAxis dataKey="m" tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
                <Area type="monotone" dataKey="organic" stroke={C.blueL} fill="url(#cg1)" strokeWidth={2}/>
                <Area type="monotone" dataKey="paid" stroke={C.orange} fill="none" strokeWidth={1.5} strokeDasharray="4 2"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {[["Backlinks","1.2K","+5%",C.blueL],["Page Visitors","552.5K","+2%",C.green],["Avg Duration","61K","-4%",C.orange],["Authority Score","61","+2",C.purple],["Paid Traffic","621K","+8%",C.blueL]].map(([l,v,ch,col])=>(
              <div key={l} className="card" style={{padding:"10px 14px",flex:1}}>
                <div style={{color:C.textDim,fontSize:10.5}}>{l}</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:2}}>
                  <div className="sg" style={{color:C.text,fontSize:18,fontWeight:800}}>{v}</div>
                  <span className="chip" style={{color:C.green,background:C.greenL,fontSize:9.5}}>{ch}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{overflow:"hidden"}}>
          <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{color:C.orange,fontWeight:700,fontSize:14,fontFamily:"Space Grotesk"}}>Keywords</span>
            <button style={{background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",padding:"4px 10px",borderRadius:7,fontSize:11,fontFamily:"inherit"}}>View All →</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"2fr .7fr .7fr .5fr .5fr",padding:"8px 18px",background:C.bg,borderBottom:`1px solid ${C.border}`}}>
            {["Keyword","Trend","CPC","SERP","KD"].map(h=>(<div key={h} style={{color:C.textDim,fontSize:10,fontWeight:700,letterSpacing:.4}}>{h.toUpperCase()}</div>))}
          </div>
          {keywords.slice(0,6).map(({kw,cpc,kd},i)=>(
            <div key={i} className="td" style={{display:"grid",gridTemplateColumns:"2fr .7fr .7fr .5fr .5fr",padding:"10px 18px",borderBottom:i<5?`1px solid ${C.border}`:"none",alignItems:"center"}}>
              <div style={{color:C.text,fontSize:12,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{kw}</div>
              <div style={{color:C.green,fontSize:11,fontWeight:700}}>↑</div>
              <div style={{color:C.textMid,fontSize:12}}>{cpc}</div>
              <div style={{color:C.textMid,fontSize:12}}>31</div>
              <div style={{color:C.textMid,fontSize:12}}>{kd}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Rank Tracking ─────────────────────────────────────────────────────
function RankTracking() {
  const [step, setStep] = useState("rankings");
  const [device, setDevice] = useState("desktop");
  const [engine, setEngine] = useState("Google");
  const [country, setCountry] = useState("United States (US)");
  const [kwInput, setKwInput] = useState("seo");
  const [search, setSearch] = useState("");
  const rankRows = [
    {kw:"dental implants near me",pageRank:"/dental-implants",device:"Desktop",pos:4,notRanking:false,estTraffic:820,vol:"8,200",movement:+3},
    {kw:"best SEO tools 2026",pageRank:"/seo-tools",device:"Desktop",pos:7,notRanking:false,estTraffic:280,vol:"5,100",movement:+5},
    {kw:"agency project management",pageRank:"/project-mgmt",device:"Mobile",pos:11,notRanking:false,estTraffic:95,vol:"3,400",movement:-2},
    {kw:"SEO reporting dashboard",pageRank:"/reports",device:"Desktop",pos:6,notRanking:false,estTraffic:180,vol:"4,100",movement:+8},
    {kw:"content marketing software",pageRank:"/content",device:"Mobile",pos:19,notRanking:false,estTraffic:60,vol:"6,700",movement:+1},
    {kw:"seo",pageRank:null,device:"Desktop",pos:null,notRanking:true,estTraffic:0,vol:"135,000",movement:null},
    {kw:"task management agencies",pageRank:"/tasks",device:"Desktop",pos:9,notRanking:false,estTraffic:120,vol:"3,800",movement:-1},
  ];
  const filtered = rankRows.filter(r=>r.kw.toLowerCase().includes(search.toLowerCase()));
  if (step==="settings") {
    return (
      <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)",background:C.bg,display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:40}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:20,width:"100%",maxWidth:900,padding:"0 28px"}}>
          <div>
            <h2 className="sg" style={{color:C.text,fontSize:20,fontWeight:800,marginBottom:6}}>Keyword Tracking</h2>
            <p style={{color:C.textDim,fontSize:13,marginBottom:16}}>for <strong>www.seoengineboost.com</strong> in {country} - {engine}</p>
            <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:"20px 22px"}}>
              <div style={{fontWeight:700,fontSize:14,color:C.text,marginBottom:10}}>Enter Keywords Manually</div>
              <textarea value={kwInput} onChange={e=>setKwInput(e.target.value)} rows={4} style={{width:"100%",padding:"10px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,fontFamily:"inherit",outline:"none",resize:"none",color:C.text}} placeholder="seo, best seo tools, dental implants near me"/>
              <button onClick={()=>setStep("rankings")} style={{marginTop:10,background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"8px 20px",borderRadius:8,fontSize:13,fontWeight:700,fontFamily:"inherit"}}>Add Keywords</button>
            </div>
          </div>
          <div style={{background:C.white,border:`2px solid ${C.blueL}`,borderRadius:12,padding:"20px 22px"}}>
            <div className="sg" style={{color:C.text,fontSize:15,fontWeight:800,marginBottom:8}}>Keyword Tracking Settings</div>
            <div style={{marginBottom:14}}><label style={{display:"block",color:C.text,fontSize:13,fontWeight:600,marginBottom:6}}>Search Engine:</label><select value={engine} onChange={e=>setEngine(e.target.value)} style={{width:"100%",padding:"9px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,fontFamily:"inherit",outline:"none",background:"white"}}><option>🅖 Google</option><option>Bing</option><option>Yahoo</option></select></div>
            <div style={{marginBottom:14}}><label style={{display:"block",color:C.text,fontSize:13,fontWeight:600,marginBottom:6}}>Country:</label><select value={country} onChange={e=>setCountry(e.target.value)} style={{width:"100%",padding:"9px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,fontFamily:"inherit",outline:"none",background:"white"}}><option>🇺🇸 United States (US)</option><option>🇵🇭 Philippines</option><option>🇬🇧 United Kingdom (UK)</option></select></div>
            <div style={{marginBottom:20}}><label style={{display:"block",color:C.text,fontSize:13,fontWeight:600,marginBottom:10}}>Device:</label><div style={{display:"flex",gap:16}}>{[["desktop","🖥 Desktop"],["mobile","📱 Mobile"]].map(([id,label])=>(<label key={id} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13,color:C.text}}><input type="checkbox" checked={device===id} onChange={()=>setDevice(id)} style={{width:16,height:16,accentColor:C.blueL,cursor:"pointer"}}/>{label}</label>))}</div></div>
            <button onClick={()=>setStep("rankings")} style={{width:"100%",background:C.yellow,color:"#fff",border:"none",cursor:"pointer",padding:"10px",borderRadius:9,fontSize:14,fontWeight:700,fontFamily:"inherit"}}>Next →</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)",background:C.bg}}>
      <div style={{padding:"22px 28px",background:C.white,borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
        <div><h2 className="sg" style={{color:C.text,fontSize:20,fontWeight:800,marginBottom:4}}>Keyword Rankings</h2><p style={{color:C.textDim,fontSize:13}}>for <strong>www.seoengineboost.com</strong> in {country} - {engine}</p></div>
        <button onClick={()=>setStep("settings")} style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"9px 20px",borderRadius:9,fontSize:13,fontWeight:700,fontFamily:"inherit"}}>Update Your Keywords</button>
      </div>
      <div style={{padding:"16px 28px 0"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {[{l:"Tracked Keywords",v:`${rankRows.length}`,c:C.blueL,icon:Target},{l:"Ranking (Top 3)",v:"2",c:C.green,icon:TrendingUp},{l:"Ranking (Top 10)",v:"4",c:C.orange,icon:BarChart2},{l:"Not Ranking",v:"1",c:C.red,icon:AlertCircle}].map(({l,v,c,icon:Icon})=>(
            <div key={l} className="card ch" style={{padding:"14px 18px"}}><div style={{width:32,height:32,borderRadius:8,background:`${c}18`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:8}}><Icon size={14} color={c}/></div><div className="sg" style={{color:C.text,fontSize:22,fontWeight:800}}>{v}</div><div style={{color:C.textDim,fontSize:11,marginTop:2}}>{l}</div></div>
          ))}
        </div>
      </div>
      <div style={{padding:"0 28px 28px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{color:C.textDim,fontSize:12}}>Search:</span><input value={search} onChange={e=>setSearch(e.target.value)} style={{padding:"5px 10px",border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,width:180,fontFamily:"inherit",outline:"none"}}/></div>
        </div>
        <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
          <div style={{display:"grid",gridTemplateColumns:"2.2fr 1.5fr 90px 90px 140px 150px 140px",padding:"10px 18px",background:C.bg,borderBottom:`1px solid ${C.border}`,gap:8}}>
            {["KEYWORD","PAGE RANKING","DEVICE","POSITION","EST. TRAFFIC","SEARCH VOLUME","RECENT MOVEMENT"].map(h=>(<div key={h} style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:.4}}>{h}</div>))}
          </div>
          {filtered.map((row,i)=>(
            <div key={i} className="td" style={{display:"grid",gridTemplateColumns:"2.2fr 1.5fr 90px 90px 140px 150px 140px",padding:"12px 18px",borderBottom:i<filtered.length-1?`1px solid ${C.border}`:"none",alignItems:"center",gap:8}}>
              <div style={{color:C.text,fontSize:13,fontWeight:500}}>{row.kw}</div>
              <div style={{color:C.blueL,fontSize:12,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",cursor:"pointer"}}>{row.pageRank||"—"}</div>
              <div style={{color:C.textMid,fontSize:12}}>{row.device==="Desktop"?"🖥":"📱"} {row.device}</div>
              <div>{row.notRanking?<span style={{background:"#FEF3C7",color:"#92400E",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:5}}>Not Ranking</span>:<span style={{background:row.pos<=3?C.greenL:row.pos<=10?C.bluePale:"#F1F5F9",color:row.pos<=3?C.green:row.pos<=10?C.blueL:C.textMid,fontSize:12,fontWeight:800,padding:"2px 8px",borderRadius:5}}>#{row.pos}</span>}</div>
              <div style={{color:C.textMid,fontSize:12.5}}>{row.estTraffic>0?row.estTraffic.toLocaleString():"0"}</div>
              <div style={{color:C.textMid,fontSize:12.5}}>{row.vol}</div>
              <div>{row.movement===null?<span style={{color:C.textDim,fontSize:12}}>—</span>:<span style={{color:row.movement>0?C.green:C.red,fontWeight:700,fontSize:13,display:"flex",alignItems:"center",gap:3}}>{row.movement>0?<TrendingUp size={13}/>:<TrendingDown size={13}/>}{row.movement>0?`+${row.movement}`:row.movement}</span>}</div>
            </div>
          ))}
          <div style={{padding:"12px 18px",background:C.bg,borderTop:`1px solid ${C.border}`}}>
            <span style={{color:C.textDim,fontSize:12}}>Showing 1 to {filtered.length} of {rankRows.length} entries</span>
          </div>
        </div>
        <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 22px",marginTop:16}}>
          <div className="sg" style={{color:C.text,fontSize:14,fontWeight:700,marginBottom:14}}>Ranking History</div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={rankData} margin={{top:0,right:0,left:-22,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
              <XAxis dataKey="n" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis reversed tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}} formatter={(v)=>[`Position #${v}`,""]}/>
              <Line type="monotone" dataKey="pos" stroke={C.blueL} strokeWidth={2.5} dot={{fill:C.blueL,r:3}} activeDot={{r:5}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ── Calendar Screen ───────────────────────────────────────────────────
function CalendarView() {
  const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const events={2:[{l:"Team Sync",c:C.blueL}],5:[{l:"Client Call",c:C.orange}],7:[{l:"Q2 Launch",c:C.green}],10:[{l:"Content Due",c:C.red}],14:[{l:"SEO Report",c:C.green}],18:[{l:"Team Meeting",c:C.purple}],21:[{l:"Client Review",c:C.yellow}],25:[{l:"Blog Batch",c:C.blueL}],28:[{l:"Sprint Retro",c:C.orange}]};
  const upcoming=[{l:"Team Sync",d:"Today, 10:00 AM",c:C.blueL,t:"Meeting"},{l:"Client Call",d:"Today, 2:00 PM",c:C.orange,t:"Call"},{l:"Q2 Campaign Launch",d:"May 7, 9:00 AM",c:C.green,t:"Launch"},{l:"Content Deadline",d:"May 10, 5:00 PM",c:C.red,t:"Deadline"}];
  return (
    <div className="fade" style={{display:"flex",height:"calc(100vh - 57px)",overflow:"hidden"}}>
      <div style={{flex:1,padding:"20px 24px",overflowY:"auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <button style={{background:"transparent",border:`1px solid ${C.border}`,cursor:"pointer",padding:"6px 9px",borderRadius:8,display:"flex"}}><ChevronLeft size={14}/></button>
            <h2 className="sg" style={{color:C.text,fontSize:18,fontWeight:800}}>May 2026</h2>
            <button style={{background:"transparent",border:`1px solid ${C.border}`,cursor:"pointer",padding:"6px 9px",borderRadius:8,display:"flex"}}><ChevronRight size={13}/></button>
          </div>
          <div style={{display:"flex",gap:5}}>{["Day","Week","Month"].map((v,i)=>(<button key={v} style={{padding:"6px 14px",borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"inherit",background:i===2?C.blueL:"rgba(0,0,0,.05)",color:i===2?"#fff":C.textDim}}>{v}</button>))}</div>
        </div>
        <div className="card" style={{overflow:"hidden"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",borderBottom:`1px solid ${C.border}`}}>
            {days.map(d=>(<div key={d} style={{padding:"10px 0",textAlign:"center",color:C.textDim,fontSize:11,fontWeight:700,letterSpacing:.5}}>{d.toUpperCase()}</div>))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)"}}>
            {[...Array(37)].map((_,i)=>{const day=i-1,isToday=day===2,hasEvt=events[day];return(
              <div key={i} style={{minHeight:80,padding:"7px",borderBottom:`1px solid ${C.border}`,borderRight:(i+1)%7!==0?`1px solid ${C.border}`:"none",background:isToday?"rgba(37,99,235,0.04)":"transparent",cursor:"pointer"}}>
                {day>0&&day<=31&&(<>
                  <div style={{width:26,height:26,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:isToday?800:400,color:isToday?"#fff":C.textMid,background:isToday?C.blueL:"transparent",marginBottom:3}}>{day}</div>
                  {hasEvt&&hasEvt.map((ev,ei)=>(<div key={ei} style={{background:`${ev.c}15`,color:ev.c,fontSize:9.5,fontWeight:700,padding:"2px 5px",borderRadius:4,marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",borderLeft:`2px solid ${ev.c}`}}>{ev.l}</div>))}
                </>)}
              </div>
            );})}
          </div>
        </div>
      </div>
      <div style={{width:260,background:C.white,borderLeft:`1px solid ${C.border}`,padding:18,overflowY:"auto",flexShrink:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div className="sg" style={{color:C.text,fontWeight:700,fontSize:14}}>Upcoming</div>
          <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"5px 10px",borderRadius:7,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",gap:4,fontFamily:"inherit"}}><Plus size={11}/>New</button>
        </div>
        {upcoming.map(({l,d,c,t})=>(
          <div key={l} style={{background:C.bg,borderLeft:`3px solid ${c}`,border:`1px solid ${C.border}`,borderRadius:10,padding:"11px 12px",marginBottom:9}}>
            <span className="chip" style={{color:c,background:`${c}18`,marginBottom:5,display:"inline-flex"}}>{t.toUpperCase()}</span>
            <div style={{color:C.text,fontSize:12.5,fontWeight:600,marginBottom:3}}>{l}</div>
            <div style={{display:"flex",gap:5,color:C.textDim,fontSize:11,alignItems:"center"}}><Clock size={10}/>{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Pricing Page ───────────────────────────────────────────────────────
function PricingPage({ goBack }) {
  const [billing, setBilling] = useState("monthly");
  const plans = [
    {name:"Starter",mo:29,yr:22,desc:"Perfect for freelancers and solo SEO professionals.",current:false},
    {name:"Pro",mo:79,yr:59,desc:"For growing agencies managing multiple clients.",popular:true},
    {name:"Agency",mo:199,yr:149,desc:"Full power for large teams and enterprises.",current:false},
  ];
  return (
    <div style={{minHeight:"100vh",background:"#fff",overflowY:"auto"}}>
      <nav style={{background:"#fff",borderBottom:"1px solid #E5E7EB",padding:"0 40px",display:"flex",alignItems:"center",height:56,position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginRight:36,cursor:"pointer"}} onClick={goBack}>
          <div style={{width:28,height:28,borderRadius:6,background:`linear-gradient(135deg,${C.orange},${C.blueL})`,display:"flex",alignItems:"center",justifyContent:"center"}}><Zap size={15} color="#fff" fill="#fff"/></div>
          <span style={{color:C.text,fontWeight:800,fontSize:15}}>Boostly</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:24,flex:1}}>{["Tools","Pricing","Results","Training","Consulting","Contact"].map(l=>(<span key={l} style={{color:l==="Pricing"?C.blueL:C.textMid,fontSize:13.5,fontWeight:l==="Pricing"?700:500,cursor:"pointer"}}>{l}</span>))}</div>
        <button onClick={goBack} style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"7px 16px",borderRadius:7,fontSize:13,fontWeight:600,fontFamily:"inherit"}}>← Back to App</button>
      </nav>
      <section style={{padding:"50px 40px 40px",maxWidth:960,margin:"0 auto",textAlign:"center"}}>
        <h1 style={{fontSize:36,fontWeight:900,color:C.text,marginBottom:10}}>Simple, transparent pricing</h1>
        <p style={{color:C.textMid,fontSize:16,marginBottom:28}}>Start free. Upgrade when you need more power.</p>
        <div style={{display:"flex",justifyContent:"center",marginBottom:40}}>
          <div style={{display:"flex",background:"#F3F4F6",borderRadius:6,padding:4,gap:2}}>
            {["monthly","yearly"].map(b=>(<button key={b} onClick={()=>setBilling(b)} style={{padding:"8px 28px",border:"none",cursor:"pointer",fontSize:14,fontWeight:600,fontFamily:"inherit",borderRadius:4,background:billing===b?"#111827":"transparent",color:billing===b?"#fff":"#374151"}}>{b==="monthly"?"Monthly":"Annually (25% off)"}</button>))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,marginBottom:48}}>
          {plans.map(plan=>{const price=billing==="monthly"?plan.mo:plan.yr;return(
            <div key={plan.name} style={{background:"#fff",border:`${plan.popular?"2px":"1px"} solid ${plan.popular?C.blueL:"#E5E7EB"}`,borderRadius:16,padding:"28px 24px",position:"relative",boxShadow:plan.popular?`0 4px 20px rgba(37,99,235,.15)`:"0 1px 4px rgba(0,0,0,.06)"}}>
              {plan.popular&&<div style={{position:"absolute",top:-13,left:"50%",transform:"translateX(-50%)",background:C.blueL,color:"#fff",fontSize:11,fontWeight:800,padding:"4px 16px",borderRadius:20}}>MOST POPULAR</div>}
              <div style={{color:C.text,fontWeight:700,fontSize:18,marginBottom:8}}>{plan.name}</div>
              <div style={{display:"flex",alignItems:"baseline",gap:3,marginBottom:10,justifyContent:"center"}}>
                <span style={{fontSize:40,fontWeight:900,color:C.text}}>${price}</span>
                <span style={{fontSize:13,color:C.textDim}}>/mo</span>
              </div>
              <p style={{color:C.textMid,fontSize:13,lineHeight:1.6,marginBottom:20}}>{plan.desc}</p>
              <button style={{width:"100%",padding:"11px 0",fontSize:14,borderRadius:9,border:"none",background:plan.popular?C.blueL:C.bg,color:plan.popular?"#fff":C.text,cursor:"pointer",fontFamily:"inherit",fontWeight:700,marginBottom:20}}>{plan.current?"Current Plan":"Get Started"}</button>
              {["Unlimited keyword tracking","Advanced competitor analysis","AI-powered content lab","White-label PDF reports","Priority 24/7 support","Full API access"].map(f=>(<div key={f} style={{display:"flex",alignItems:"center",gap:7,marginBottom:7,textAlign:"left"}}><div style={{width:15,height:15,borderRadius:"50%",background:C.greenL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Check size={8} color={C.green} strokeWidth={3}/></div><span style={{color:C.textMid,fontSize:12}}>{f}</span></div>))}
            </div>
          );})}
        </div>
      </section>
    </div>
  );
}

// ── CrawlDashboard ───────────────────────────────────────────────────
function CrawlDashboard({ onNavigate }) {
  const stats = [
    { l:"Domain Rating", v:"42", ch:"+3", up:true, icon:Shield, c:C.blueL },
    { l:"Organic Traffic", v:"52,340", ch:"+18.4%", up:true, icon:TrendingUp, c:C.green },
    { l:"Keywords Ranked", v:"1,475", ch:"+12.1%", up:true, icon:Search, c:C.orange },
    { l:"Backlinks", v:"14,280", ch:"-2.3%", up:false, icon:Link2, c:C.purple },
  ];
  const issues = [
    { t:"12 pages missing H1 tags", sev:"Critical", c:C.red, bg:C.redL },
    { t:"Core Web Vitals failing on mobile", sev:"Critical", c:C.red, bg:C.redL },
    { t:"48 images missing alt text", sev:"High", c:C.yellow, bg:C.yellowL },
    { t:"14 orphan pages found", sev:"Medium", c:C.orange, bg:C.orangeL },
  ];
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", padding:"22px 28px", background:C.bg }}>
      <div style={{ background:`linear-gradient(135deg,${C.blue},${C.blueL})`, borderRadius:16, padding:"28px 32px", marginBottom:24, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-20, top:-20, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.06)" }}/>
        <div style={{ color:"rgba(255,255,255,.7)", fontSize:13, marginBottom:6 }}>Good Morning 👋</div>
        <div className="sg" style={{ fontSize:26, fontWeight:800, color:"#fff", marginBottom:10 }}>Welcome back, Admin</div>
        <div style={{ color:"rgba(255,255,255,.75)", fontSize:14, marginBottom:20, maxWidth:420 }}>Your SEO performance is improving. 3 keywords moved into top 10 this week.</div>
        <div style={{ display:"flex", gap:12 }}>
          <button style={{ background:"#fff", color:C.blue, border:"none", cursor:"pointer", padding:"9px 20px", borderRadius:9, fontSize:13, fontWeight:700, fontFamily:"inherit" }} onClick={() => onNavigate && onNavigate("siteaudit")}>Run SEO Audit</button>
          <button style={{ background:"rgba(255,255,255,.15)", color:"#fff", border:"1px solid rgba(255,255,255,.3)", cursor:"pointer", padding:"9px 20px", borderRadius:9, fontSize:13, fontWeight:700, fontFamily:"inherit" }} onClick={() => onNavigate && onNavigate("seoassistant")}>Ask AI Copilot</button>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        {stats.map(m => (
          <div key={m.l} className="card ch" style={{ padding:18 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:`${m.c}18`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <m.icon size={17} color={m.c}/>
              </div>
              <span style={{ color:C.textDim, fontSize:12 }}>{m.l}</span>
            </div>
            <div className="sg" style={{ fontSize:24, fontWeight:800, color:C.text, marginBottom:4 }}>{m.v}</div>
            <div style={{ color:m.up?C.green:C.red, fontSize:12, fontWeight:600 }}>{m.up?"↑":"↓"} {m.ch} vs last month</div>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20, marginBottom:24 }}>
        <div className="card" style={{ padding:20 }}>
          <div className="sg" style={{ color:C.text, fontWeight:700, marginBottom:16 }}>Organic Traffic Trend</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="cdg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.blueL} stopOpacity={0.25}/>
                  <stop offset="95%" stopColor={C.blueL} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
              <XAxis dataKey="m" tick={{ fill:C.textDim, fontSize:11 }} axisLine={false}/>
              <YAxis tick={{ fill:C.textDim, fontSize:11 }} axisLine={false} tickFormatter={v=>`${v/1000}k`}/>
              <Tooltip contentStyle={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8 }}/>
              <Area type="monotone" dataKey="v" stroke={C.blueL} fill="url(#cdg)" strokeWidth={2} name="Traffic"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{ padding:20 }}>
          <div className="sg" style={{ color:C.text, fontWeight:700, marginBottom:14 }}>Critical Issues</div>
          {issues.map((iss,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 0", borderBottom:i<issues.length-1?`1px solid ${C.border}`:"none" }}>
              <span className="chip" style={{ color:iss.c, background:iss.bg, flexShrink:0 }}>{iss.sev}</span>
              <span style={{ color:C.textMid, fontSize:12, flex:1 }}>{iss.t}</span>
            </div>
          ))}
          <button style={{ marginTop:12, width:"100%", background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"8px", borderRadius:8, fontSize:12, fontWeight:700, fontFamily:"inherit" }} onClick={() => onNavigate && onNavigate("aisuggestions")}>Fix All Issues →</button>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <div className="card" style={{ padding:20 }}>
          <div className="sg" style={{ color:C.text, fontWeight:700, marginBottom:14 }}>Top Keywords This Week</div>
          {[
            { kw:"designer tools", pos:3, ch:+2, vol:"8.1K" },
            { kw:"SEO software", pos:7, ch:+5, vol:"22K" },
            { kw:"web design agency", pos:12, ch:-1, vol:"14K" },
            { kw:"keyword tracker", pos:18, ch:+3, vol:"5.5K" },
          ].map(k => (
            <div key={k.kw} style={{ display:"flex", alignItems:"center", padding:"9px 0", borderBottom:`1px solid ${C.border}` }}>
              <div style={{ flex:1, color:C.text, fontSize:13 }}>{k.kw}</div>
              <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:14, marginRight:12 }}>#{k.pos}</div>
              <div style={{ color:k.ch>0?C.green:C.red, fontSize:12, fontWeight:600, marginRight:12 }}>{k.ch>0?"↑":"↓"}{Math.abs(k.ch)}</div>
              <div style={{ color:C.textDim, fontSize:12 }}>{k.vol}/mo</div>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding:20 }}>
          <div className="sg" style={{ color:C.text, fontWeight:700, marginBottom:14 }}>Recent Activity</div>
          {[
            { t:"Audit completed", d:"85 issues found on homepage", c:C.orange, time:"5m ago" },
            { t:"New backlink", d:"techcrunch.com → /blog/seo", c:C.green, time:"2h ago" },
            { t:"Rank change", d:"'designer' moved from #8 → #3", c:C.blueL, time:"4h ago" },
            { t:"Report generated", d:"Monthly SEO report ready", c:C.purple, time:"1d ago" },
          ].map((a,i) => (
            <div key={i} style={{ display:"flex", gap:12, padding:"9px 0", borderBottom:`1px solid ${C.border}` }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:a.c, marginTop:4, flexShrink:0 }}/>
              <div style={{ flex:1 }}>
                <div style={{ color:C.text, fontSize:13, fontWeight:600 }}>{a.t}</div>
                <div style={{ color:C.textMid, fontSize:12 }}>{a.d}</div>
              </div>
              <div style={{ color:C.textDim, fontSize:11 }}>{a.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── AdvancedKeywordResearch ───────────────────────────────────────────
function AdvancedKeywordResearch() {
  const [filter, setFilter] = useState("longtail");
  const filters = [
    { id:"longtail", l:"Long-tail Keywords" },
    { id:"low", l:"Low Competition" },
    { id:"highcpc", l:"High CPC" },
    { id:"trending", l:"Trending" },
    { id:"local", l:"Local Intent" },
  ];
  const kws = [
    { kw:"best seo tools for small business 2026", vol:"2,400", kd:24, cpc:"$4.80", trend:"↑", int:"Commercial" },
    { kw:"how to rank on google first page free", vol:"5,800", kd:18, cpc:"$2.10", trend:"↑", int:"Informational" },
    { kw:"local seo services near me", vol:"1,900", kd:31, cpc:"$12.40", trend:"→", int:"Transactional" },
    { kw:"seo audit checklist for beginners", vol:"3,200", kd:22, cpc:"$3.50", trend:"↑", int:"Informational" },
    { kw:"buy seo backlinks safe 2026", vol:"880", kd:15, cpc:"$6.70", trend:"↓", int:"Transactional" },
    { kw:"competitor keyword research free tool", vol:"4,100", kd:27, cpc:"$5.20", trend:"↑", int:"Commercial" },
  ];
  const kdCol = kd => kd < 30 ? C.green : kd < 60 ? C.yellow : C.red;
  const intCol = i => i==="Commercial"?C.blueL:i==="Transactional"?C.orange:C.purple;
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", padding:"22px 28px", background:C.bg }}>
      <div className="card" style={{ padding:"14px 18px", marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        <Search size={14} color={C.textDim}/>
        <input placeholder="Enter seed keyword or topic..." style={{ flex:1, background:"transparent", border:"none", outline:"none", color:C.text, fontSize:14, fontFamily:"inherit" }} defaultValue="seo tools"/>
        <select style={{ background:C.bgLight, border:`1px solid ${C.border}`, borderRadius:7, padding:"6px 10px", color:C.textMid, fontSize:12, fontFamily:"inherit" }}><option>United States</option><option>Philippines</option><option>UK</option></select>
        <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"8px 18px", borderRadius:8, fontSize:13, fontWeight:700, fontFamily:"inherit" }}>Analyze</button>
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{ background:filter===f.id?C.blueL:"transparent", color:filter===f.id?"#fff":C.textMid, border:`1px solid ${filter===f.id?C.blueL:C.border}`, cursor:"pointer", padding:"7px 16px", borderRadius:20, fontSize:12, fontWeight:600, fontFamily:"inherit", transition:"all .15s" }}>{f.l}</button>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
        {[
          { l:"Total Keywords", v:"1,847", c:C.blueL },
          { l:"Low Competition", v:"384", c:C.green },
          { l:"High CPC Opportunities", v:"127", c:C.orange },
          { l:"Avg. Search Volume", v:"3,240", c:C.purple },
        ].map(s => (
          <div key={s.l} className="card" style={{ padding:"14px 16px" }}>
            <div style={{ color:C.textDim, fontSize:11, marginBottom:6 }}>{s.l}</div>
            <div className="sg" style={{ fontSize:22, fontWeight:800, color:s.c }}>{s.v}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ overflow:"hidden" }}>
        <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:10 }}>
          <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:14, flex:1 }}>Advanced Keyword Results</span>
          <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"5px 12px", borderRadius:7, fontSize:12, fontFamily:"inherit" }}>
            <Download size={11} style={{ marginRight:4 }}/>Export CSV
          </button>
        </div>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:C.bg }}>
              {["Keyword","Volume","KD","CPC","Trend","Intent","Action"].map(h => (
                <th key={h} style={{ padding:"10px 14px", textAlign:"left", color:C.textDim, fontSize:11, fontWeight:700, borderBottom:`1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {kws.map((k,i) => (
              <tr key={i} className="td">
                <td style={{ padding:"12px 14px", color:C.text, fontSize:13 }}>{k.kw}</td>
                <td style={{ padding:"12px 14px", color:C.textMid, fontSize:13 }}>{k.vol}</td>
                <td style={{ padding:"12px 14px" }}>
                  <span style={{ background:`${kdCol(k.kd)}18`, color:kdCol(k.kd), padding:"3px 8px", borderRadius:6, fontSize:11, fontWeight:700 }}>{k.kd}</span>
                </td>
                <td style={{ padding:"12px 14px", color:C.textMid, fontSize:13 }}>{k.cpc}</td>
                <td style={{ padding:"12px 14px", color:k.trend==="↑"?C.green:k.trend==="↓"?C.red:C.textDim, fontSize:14, fontWeight:700 }}>{k.trend}</td>
                <td style={{ padding:"12px 14px" }}>
                  <span className="chip" style={{ color:intCol(k.int), background:`${intCol(k.int)}18` }}>{k.int}</span>
                </td>
                <td style={{ padding:"12px 14px" }}>
                  <button style={{ background:C.bluePale, color:C.blueL, border:"none", cursor:"pointer", padding:"5px 11px", borderRadius:6, fontSize:11, fontWeight:700, fontFamily:"inherit" }}>+ Add</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── CompetitorAnalyzer ────────────────────────────────────────────────
function CompetitorAnalyzer() {
  const [domain1, setDomain1] = useState("seoengineboost.com");
  const [domain2, setDomain2] = useState("semrush.com");
  const data = [
    { m:"Jan", a:42000, b:180000 }, { m:"Feb", a:44000, b:178000 },
    { m:"Mar", a:48000, b:185000 }, { m:"Apr", a:52000, b:192000 },
    { m:"May", a:55000, b:196000 }, { m:"Jun", a:58000, b:201000 },
  ];
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", padding:"22px 28px", background:C.bg }}>
      <div className="card" style={{ padding:18, marginBottom:20 }}>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <div style={{ flex:1, display:"flex", alignItems:"center", gap:8, background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px" }}>
            <Globe size={13} color={C.blueL}/>
            <input value={domain1} onChange={e=>setDomain1(e.target.value)} style={{ background:"transparent", border:"none", outline:"none", color:C.text, fontSize:13, fontFamily:"inherit", flex:1 }}/>
          </div>
          <span style={{ color:C.textDim, fontWeight:700, fontSize:12 }}>VS</span>
          <div style={{ flex:1, display:"flex", alignItems:"center", gap:8, background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px" }}>
            <Globe size={13} color={C.orange}/>
            <input value={domain2} onChange={e=>setDomain2(e.target.value)} style={{ background:"transparent", border:"none", outline:"none", color:C.text, fontSize:13, fontFamily:"inherit", flex:1 }}/>
          </div>
          <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"10px 22px", borderRadius:9, fontSize:13, fontWeight:700, fontFamily:"inherit" }}>Compare</button>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        {[
          { l:"Organic Keywords", v1:"1,475", v2:"12,400" },
          { l:"Organic Traffic", v1:"52K", v2:"890K" },
          { l:"Domain Rating", v1:"42", v2:"91" },
          { l:"Backlinks", v1:"14.2K", v2:"2.1M" },
        ].map(m => (
          <div key={m.l} className="card" style={{ padding:"14px 16px" }}>
            <div style={{ color:C.textDim, fontSize:11, marginBottom:8 }}>{m.l}</div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <div><div className="sg" style={{ fontSize:18, fontWeight:800, color:C.blueL }}>{m.v1}</div><div style={{ color:C.textDim, fontSize:10 }}>{domain1}</div></div>
              <div style={{ textAlign:"right" }}><div className="sg" style={{ fontSize:18, fontWeight:800, color:C.orange }}>{m.v2}</div><div style={{ color:C.textDim, fontSize:10 }}>{domain2}</div></div>
            </div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding:20, marginBottom:20 }}>
        <div className="sg" style={{ color:C.text, fontWeight:700, marginBottom:16 }}>Traffic Comparison (6 months)</div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="d1g" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.blueL} stopOpacity={0.2}/><stop offset="95%" stopColor={C.blueL} stopOpacity={0}/></linearGradient>
              <linearGradient id="d2g" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.orange} stopOpacity={0.15}/><stop offset="95%" stopColor={C.orange} stopOpacity={0}/></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="m" tick={{ fill:C.textDim, fontSize:11 }} axisLine={false}/>
            <YAxis tick={{ fill:C.textDim, fontSize:11 }} axisLine={false} tickFormatter={v=>`${v/1000}k`}/>
            <Tooltip contentStyle={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8 }}/>
            <Area type="monotone" dataKey="a" stroke={C.blueL} fill="url(#d1g)" strokeWidth={2} name={domain1}/>
            <Area type="monotone" dataKey="b" stroke={C.orange} fill="url(#d2g)" strokeWidth={2} name={domain2}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="card" style={{ overflow:"hidden" }}>
        <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}` }}>
          <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:14 }}>Keyword Gap — Competitor Wins</span>
        </div>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr style={{ background:C.bg }}>
            {["Keyword","Competitor Pos","Your Pos","Volume","Opportunity"].map(h => (
              <th key={h} style={{ padding:"10px 14px", textAlign:"left", color:C.textDim, fontSize:11, fontWeight:700, borderBottom:`1px solid ${C.border}` }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[
              { kw:"seo platform comparison", cp:3, yp:"—", vol:"4,200", opp:"High" },
              { kw:"keyword difficulty checker", cp:5, yp:18, vol:"8,100", opp:"High" },
              { kw:"site crawl tool free", cp:7, yp:"—", vol:"3,600", opp:"Medium" },
              { kw:"backlink monitoring software", cp:11, yp:24, vol:"5,900", opp:"High" },
            ].map((r,i) => (
              <tr key={i} className="td">
                <td style={{ padding:"12px 14px", color:C.text, fontSize:13 }}>{r.kw}</td>
                <td style={{ padding:"12px 14px" }}><span style={{ color:C.orange, fontWeight:700 }}>#{r.cp}</span></td>
                <td style={{ padding:"12px 14px", color:r.yp==="—"?C.red:C.textMid, fontWeight:r.yp==="—"?700:400 }}>{r.yp==="—"?r.yp:`#${r.yp}`}</td>
                <td style={{ padding:"12px 14px", color:C.textMid }}>{r.vol}</td>
                <td style={{ padding:"12px 14px" }}><span className="chip" style={{ color:r.opp==="High"?C.green:C.yellow, background:r.opp==="High"?C.greenL:C.yellowL }}>{r.opp}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── SiteAudit ─────────────────────────────────────────────────────────
function SiteAudit() {
  const issues = [
    { cat:"Technical", items:32, sev:"Critical", icon:Cpu, c:C.red, bg:C.redL },
    { cat:"On-Page SEO", items:18, sev:"High", icon:FileText, c:C.orange, bg:C.orangeL },
    { cat:"Performance", items:9, sev:"Medium", icon:Zap, c:C.yellow, bg:C.yellowL },
    { cat:"Links", items:5, sev:"Low", icon:Link2, c:C.green, bg:C.greenL },
  ];
  const score = 68;
  const r = 48; const circ = 2*Math.PI*r; const off = circ*(1-score/100);
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", padding:"22px 28px", background:C.bg }}>
      <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:20, marginBottom:22 }}>
        <div className="card" style={{ padding:24, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minWidth:160 }}>
          <div style={{ position:"relative", width:110, height:110 }}>
            <svg width="110" height="110" style={{ transform:"rotate(-90deg)" }}>
              <circle cx="55" cy="55" r={r} fill="none" stroke={C.border} strokeWidth="10"/>
              <circle cx="55" cy="55" r={r} fill="none" stroke={score>=70?C.green:score>=50?C.yellow:C.red} strokeWidth="10" strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"/>
            </svg>
            <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
              <div className="sg" style={{ fontSize:28, fontWeight:800, color:C.text }}>{score}</div>
              <div style={{ fontSize:10, color:C.textDim }}>Site Score</div>
            </div>
          </div>
          <div style={{ color:C.yellow, fontWeight:700, fontSize:13, marginTop:8 }}>Needs Work</div>
          <button style={{ marginTop:12, background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"8px 16px", borderRadius:8, fontSize:12, fontWeight:700, fontFamily:"inherit" }}>Re-Crawl Site</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
          {issues.map(is => (
            <div key={is.cat} className="card" style={{ padding:"16px 18px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <div style={{ width:34, height:34, borderRadius:9, background:is.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <is.icon size={16} color={is.c}/>
                </div>
                <span className="chip" style={{ color:is.c, background:is.bg }}>{is.sev}</span>
              </div>
              <div className="sg" style={{ fontSize:26, fontWeight:800, color:C.text }}>{is.items}</div>
              <div style={{ color:C.textDim, fontSize:12, marginTop:4 }}>{is.cat} issues</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ overflow:"hidden" }}>
        <div style={{ padding:"12px 18px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:10 }}>
          <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:14, flex:1 }}>Audit Issues</span>
          <select style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:7, padding:"5px 10px", color:C.textMid, fontSize:12, fontFamily:"inherit" }}><option>All Issues</option><option>Critical</option><option>High</option></select>
        </div>
        {[
          { url:"/about", issue:"Missing H1 tag", cat:"On-Page SEO", sev:"Critical" },
          { url:"/blog/seo-tips", issue:"Meta description too long (185 chars)", cat:"On-Page SEO", sev:"High" },
          { url:"/services", issue:"Missing alt text on 6 images", cat:"On-Page SEO", sev:"High" },
          { url:"/contact", issue:"Slow page speed (LCP 4.2s)", cat:"Performance", sev:"Critical" },
          { url:"/pricing", issue:"Broken internal link to /old-pricing", cat:"Links", sev:"Medium" },
          { url:"/blog/", issue:"Duplicate meta description", cat:"Technical", sev:"Medium" },
        ].map((r,i) => (
          <div key={i} className="td" style={{ display:"flex", alignItems:"center", gap:16, padding:"12px 18px", borderBottom:`1px solid ${C.border}` }}>
            <code style={{ color:C.blueL, fontSize:12, background:C.bluePale, padding:"2px 7px", borderRadius:5 }}>{r.url}</code>
            <span style={{ color:C.text, fontSize:13, flex:1 }}>{r.issue}</span>
            <span className="chip" style={{ color:C.textDim, background:C.bg }}>{r.cat}</span>
            <span className="chip" style={{ color:r.sev==="Critical"?C.red:r.sev==="High"?C.orange:C.yellow, background:r.sev==="Critical"?C.redL:r.sev==="High"?C.orangeL:C.yellowL }}>{r.sev}</span>
            <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"5px 10px", borderRadius:6, fontSize:11, fontFamily:"inherit" }}>Fix</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── DomainRankTracker ─────────────────────────────────────────────────
function DomainRankTracker() {
  const domains = [
    { d:"seoengineboost.com", kws:1475, top3:48, top10:214, dr:42, traffic:"52K" },
    { d:"dentalpro.com", kws:892, top3:31, top10:148, dr:38, traffic:"31K" },
    { d:"fitnessapp.io", kws:634, top3:22, top10:95, dr:29, traffic:"18K" },
  ];
  const data = [
    { d:"Week 1", a:12, b:8, c:5 }, { d:"Week 2", a:10, b:7, c:6 },
    { d:"Week 3", a:9, b:7, c:7 }, { d:"Week 4", a:8, b:6, c:7 },
    { d:"Week 5", a:7, b:6, c:8 }, { d:"Week 6", a:6, b:5, c:9 },
  ];
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", padding:"22px 28px", background:C.bg }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:22 }}>
        {domains.map(d => (
          <div key={d.d} className="card ch" style={{ padding:18 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <Globe size={14} color={C.blueL}/>
              <span style={{ color:C.text, fontWeight:700, fontSize:13 }}>{d.d}</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {[["Keywords",d.kws],["Top 3",d.top3],["Top 10",d.top10],["DR",d.dr]].map(([l,v]) => (
                <div key={l} style={{ background:C.bg, borderRadius:7, padding:"8px 10px" }}>
                  <div style={{ color:C.textDim, fontSize:10, marginBottom:3 }}>{l}</div>
                  <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:16 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:12, color:C.green, fontSize:12, fontWeight:600 }}>↑ {d.traffic} monthly traffic</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding:20, marginBottom:20 }}>
        <div className="sg" style={{ color:C.text, fontWeight:700, marginBottom:16 }}>Average Position Trend (6 Weeks)</div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="d" tick={{ fill:C.textDim, fontSize:11 }} axisLine={false}/>
            <YAxis reversed tick={{ fill:C.textDim, fontSize:11 }} axisLine={false} domain={[1,15]}/>
            <Tooltip contentStyle={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8 }} formatter={(v)=>[`Position ${v}`,""]}/>
            <Line type="monotone" dataKey="a" stroke={C.blueL} strokeWidth={2} dot={{ fill:C.blueL, r:3 }} name="seoengineboost.com"/>
            <Line type="monotone" dataKey="b" stroke={C.orange} strokeWidth={2} dot={{ fill:C.orange, r:3 }} name="dentalpro.com"/>
            <Line type="monotone" dataKey="c" stroke={C.green} strokeWidth={2} dot={{ fill:C.green, r:3 }} name="fitnessapp.io"/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── ProjectsDashboard ─────────────────────────────────────────────────
function ProjectsDashboard() {
  const projects = [
    { name:"SEO Engine Boost", domain:"seoengineboost.com", score:68, kws:1475, issues:32, traffic:"52K", dr:42, status:"Active" },
    { name:"Dental Pro", domain:"dentalpro.com", score:74, kws:892, issues:18, traffic:"31K", dr:38, status:"Active" },
    { name:"Fitness App", domain:"fitnessapp.io", score:55, kws:634, issues:47, traffic:"18K", dr:29, status:"Needs Audit" },
    { name:"Tech Blog", domain:"techinsights.blog", score:81, kws:2240, issues:8, traffic:"94K", dr:56, status:"Healthy" },
  ];
  const statusCol = s => s==="Healthy"?C.green:s==="Active"?C.blueL:C.yellow;
  const statusBg = s => s==="Healthy"?C.greenL:s==="Active"?C.bluePale:C.yellowL;
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", padding:"22px 28px", background:C.bg }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div style={{ color:C.textDim, fontSize:14 }}>Tracking <strong style={{ color:C.text }}>{projects.length} projects</strong> across all domains</div>
        <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"9px 18px", borderRadius:9, fontSize:13, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 }}>
          <Plus size={13}/> Add Project
        </button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
        {projects.map(p => (
          <div key={p.domain} className="card ch" style={{ padding:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
              <ScoreRing score={p.score} size={52}/>
              <div>
                <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:15 }}>{p.name}</div>
                <div style={{ color:C.blueL, fontSize:12 }}>{p.domain}</div>
              </div>
              <span className="chip" style={{ color:statusCol(p.status), background:statusBg(p.status), marginLeft:"auto" }}>{p.status}</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:14 }}>
              {[["Keywords",p.kws],["Issues",p.issues],["Traffic",p.traffic],["DR",p.dr]].map(([l,v]) => (
                <div key={l} style={{ background:C.bg, borderRadius:7, padding:"8px" }}>
                  <div style={{ color:C.textDim, fontSize:10 }}>{l}</div>
                  <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:14 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button style={{ flex:1, background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"7px", borderRadius:7, fontSize:12, fontWeight:700, fontFamily:"inherit" }}>View Report</button>
              <button style={{ flex:1, background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"7px", borderRadius:7, fontSize:12, fontFamily:"inherit" }}>Run Audit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── KeywordsPerformance ───────────────────────────────────────────────
function KeywordsPerformance() {
  const winners = [
    { kw:"seo tools 2026", pos:3, prev:8, vol:"12K" },
    { kw:"backlink checker free", pos:5, prev:11, vol:"8.4K" },
    { kw:"site audit tool", pos:7, prev:15, vol:"6.1K" },
    { kw:"rank tracker online", pos:9, prev:14, vol:"4.8K" },
  ];
  const losers = [
    { kw:"keyword planner alternative", pos:18, prev:12, vol:"5.2K" },
    { kw:"seo dashboard template", pos:24, prev:18, vol:"3.1K" },
    { kw:"competitor analysis free", pos:31, prev:22, vol:"9.7K" },
  ];
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", padding:"22px 28px", background:C.bg }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
        {[
          { l:"Keywords Tracked", v:"1,475", c:C.blueL },
          { l:"Top 3 Positions", v:"48", c:C.green },
          { l:"Top 10 Positions", v:"214", c:C.orange },
          { l:"Positions Lost", v:"37", c:C.red },
        ].map(s => (
          <div key={s.l} className="card" style={{ padding:"14px 18px" }}>
            <div style={{ color:C.textDim, fontSize:12, marginBottom:6 }}>{s.l}</div>
            <div className="sg" style={{ fontSize:24, fontWeight:800, color:s.c }}>{s.v}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <div className="card" style={{ overflow:"hidden" }}>
          <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:8 }}>
            <TrendingUp size={15} color={C.green}/>
            <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:14 }}>Winners — Gained Positions</span>
          </div>
          {winners.map((k,i) => (
            <div key={i} className="td" style={{ padding:"12px 16px", borderBottom:i<winners.length-1?`1px solid ${C.border}`:"none", display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ flex:1 }}>
                <div style={{ color:C.text, fontSize:13 }}>{k.kw}</div>
                <div style={{ color:C.textDim, fontSize:11 }}>{k.vol}/mo</div>
              </div>
              <div style={{ textAlign:"center" }}>
                <div className="sg" style={{ color:C.text, fontWeight:700 }}>#{k.pos}</div>
                <div style={{ color:C.textDim, fontSize:10 }}>was #{k.prev}</div>
              </div>
              <div style={{ background:C.greenL, color:C.green, padding:"3px 9px", borderRadius:6, fontSize:12, fontWeight:700 }}>↑{k.prev-k.pos}</div>
            </div>
          ))}
        </div>
        <div className="card" style={{ overflow:"hidden" }}>
          <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:8 }}>
            <TrendingDown size={15} color={C.red}/>
            <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:14 }}>Losers — Lost Positions</span>
          </div>
          {losers.map((k,i) => (
            <div key={i} className="td" style={{ padding:"12px 16px", borderBottom:i<losers.length-1?`1px solid ${C.border}`:"none", display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ flex:1 }}>
                <div style={{ color:C.text, fontSize:13 }}>{k.kw}</div>
                <div style={{ color:C.textDim, fontSize:11 }}>{k.vol}/mo</div>
              </div>
              <div style={{ textAlign:"center" }}>
                <div className="sg" style={{ color:C.text, fontWeight:700 }}>#{k.pos}</div>
                <div style={{ color:C.textDim, fontSize:10 }}>was #{k.prev}</div>
              </div>
              <div style={{ background:C.redL, color:C.red, padding:"3px 9px", borderRadius:6, fontSize:12, fontWeight:700 }}>↓{k.pos-k.prev}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ArticleChecker ─────────────────────────────────────────────────────
function ArticleChecker() {
  const [url, setUrl] = useState("https://seoengineboost.com/blog/seo-tools-2026");
  const [kw, setKw] = useState("seo tools 2026");
  const score = 76;
  const r = 40; const circ = 2*Math.PI*r; const off = circ*(1-score/100);
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", padding:"22px 28px", background:C.bg }}>
      <div className="card" style={{ padding:18, marginBottom:20 }}>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://your-page.com/article..." style={{ flex:2, background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", color:C.text, fontSize:13, fontFamily:"inherit", outline:"none" }}/>
          <input value={kw} onChange={e=>setKw(e.target.value)} placeholder="Target keyword..." style={{ flex:1, background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", color:C.text, fontSize:13, fontFamily:"inherit", outline:"none" }}/>
          <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"10px 22px", borderRadius:9, fontSize:13, fontWeight:700, fontFamily:"inherit" }}>Analyze</button>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:20, marginBottom:20 }}>
        <div className="card" style={{ padding:20, display:"flex", flexDirection:"column", alignItems:"center", minWidth:150 }}>
          <div style={{ position:"relative", width:90, height:90 }}>
            <svg width="90" height="90" style={{ transform:"rotate(-90deg)" }}>
              <circle cx="45" cy="45" r={r} fill="none" stroke={C.border} strokeWidth="8"/>
              <circle cx="45" cy="45" r={r} fill="none" stroke={score>=70?C.green:score>=50?C.yellow:C.red} strokeWidth="8" strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"/>
            </svg>
            <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
              <div className="sg" style={{ fontSize:22, fontWeight:800, color:C.text }}>{score}</div>
              <div style={{ fontSize:9, color:C.textDim }}>SEO Score</div>
            </div>
          </div>
          <div style={{ color:C.yellow, fontWeight:700, fontSize:12, marginTop:8 }}>Good</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
          {[
            { l:"Word Count", v:"1,840", ok:true },
            { l:"Keyword Density", v:"1.8%", ok:true },
            { l:"Readability", v:"Grade 8", ok:true },
            { l:"Internal Links", v:"3", ok:false },
            { l:"Images with Alt", v:"4/6", ok:false },
            { l:"Schema Markup", v:"None", ok:false },
          ].map(m => (
            <div key={m.l} className="card" style={{ padding:"12px 14px", display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:22, height:22, borderRadius:6, background:m.ok?C.greenL:C.redL, display:"flex", alignItems:"center", justifyContent:"center" }}>
                {m.ok?<CheckCircle2 size={12} color={C.green}/>:<AlertCircle size={12} color={C.red}/>}
              </div>
              <div>
                <div style={{ color:C.textDim, fontSize:10 }}>{m.l}</div>
                <div style={{ color:C.text, fontWeight:700, fontSize:13 }}>{m.v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ padding:18 }}>
        <div className="sg" style={{ color:C.text, fontWeight:700, marginBottom:14 }}>On-Page Recommendations</div>
        {[
          { t:"Add 2-3 more internal links to related articles", c:C.orange, label:"Recommended" },
          { t:"Add alt text to 2 missing images", c:C.yellow, label:"Medium" },
          { t:"Add FAQ schema markup to boost CTR", c:C.blueL, label:"Quick Win" },
          { t:"Include keyword in H2 subheadings (currently 0)", c:C.orange, label:"Recommended" },
        ].map((r,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:`1px solid ${C.border}` }}>
            <span className="chip" style={{ color:r.c, background:`${r.c}18`, flexShrink:0 }}>{r.label}</span>
            <span style={{ color:C.textMid, fontSize:13 }}>{r.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TrafficAnalytics ───────────────────────────────────────────────────
function TrafficAnalytics() {
  const data = [
    { m:"Oct", org:38000, paid:8200, direct:6100 }, { m:"Nov", org:42000, paid:9400, direct:5800 },
    { m:"Dec", org:45000, paid:10200, direct:6400 }, { m:"Jan", org:48000, paid:8800, direct:7200 },
    { m:"Feb", org:50000, paid:11000, direct:6800 }, { m:"Mar", org:52000, paid:12400, direct:7400 },
  ];
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", padding:"22px 28px", background:C.bg }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
        {[
          { l:"Organic Traffic", v:"52,340", ch:"+18.4%", up:true, c:C.blueL },
          { l:"Paid Traffic", v:"12,400", ch:"+5.2%", up:true, c:C.orange },
          { l:"Direct", v:"7,400", ch:"-1.8%", up:false, c:C.purple },
          { l:"Bounce Rate", v:"38.4%", ch:"-2.1%", up:true, c:C.green },
        ].map(s => (
          <div key={s.l} className="card" style={{ padding:"14px 18px" }}>
            <div style={{ color:C.textDim, fontSize:12, marginBottom:6 }}>{s.l}</div>
            <div className="sg" style={{ fontSize:22, fontWeight:800, color:s.c }}>{s.v}</div>
            <div style={{ color:s.up?C.green:C.red, fontSize:12, fontWeight:600, marginTop:4 }}>{s.up?"↑":"↓"} {s.ch}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding:20, marginBottom:20 }}>
        <div className="sg" style={{ color:C.text, fontWeight:700, marginBottom:16 }}>Traffic by Channel (6 months)</div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="og" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.blueL} stopOpacity={0.3}/><stop offset="95%" stopColor={C.blueL} stopOpacity={0}/></linearGradient>
              <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.orange} stopOpacity={0.2}/><stop offset="95%" stopColor={C.orange} stopOpacity={0}/></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="m" tick={{ fill:C.textDim, fontSize:11 }} axisLine={false}/>
            <YAxis tick={{ fill:C.textDim, fontSize:11 }} axisLine={false} tickFormatter={v=>`${v/1000}k`}/>
            <Tooltip contentStyle={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8 }}/>
            <Area type="monotone" dataKey="org" stroke={C.blueL} fill="url(#og)" strokeWidth={2} name="Organic"/>
            <Area type="monotone" dataKey="paid" stroke={C.orange} fill="url(#pg)" strokeWidth={2} name="Paid"/>
            <Area type="monotone" dataKey="direct" stroke={C.purple} fill="none" strokeWidth={2} strokeDasharray="5 3" name="Direct"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="card" style={{ overflow:"hidden" }}>
        <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}` }}>
          <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:14 }}>Top Traffic Pages</span>
        </div>
        {[
          { url:"/", title:"Homepage", sessions:"12,480", organic:"88%", bounce:"28%" },
          { url:"/blog/seo-tools", title:"Best SEO Tools 2026", sessions:"8,340", organic:"96%", bounce:"34%" },
          { url:"/pricing", title:"Pricing Plans", sessions:"5,910", organic:"54%", bounce:"22%" },
          { url:"/blog/keyword-research", title:"Keyword Research Guide", sessions:"4,780", organic:"94%", bounce:"41%" },
        ].map((p,i) => (
          <div key={i} className="td" style={{ display:"flex", alignItems:"center", gap:16, padding:"11px 16px", borderBottom:`1px solid ${C.border}` }}>
            <code style={{ color:C.blueL, fontSize:12, background:C.bluePale, padding:"2px 7px", borderRadius:5, flexShrink:0 }}>{p.url}</code>
            <span style={{ color:C.text, fontSize:13, flex:1 }}>{p.title}</span>
            <span style={{ color:C.textMid, fontSize:12 }}>{p.sessions} sessions</span>
            <span style={{ color:C.green, fontSize:12, fontWeight:600 }}>{p.organic} organic</span>
            <span style={{ color:C.textDim, fontSize:12 }}>BR: {p.bounce}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── LocalSEO ──────────────────────────────────────────────────────────
function LocalSEO() {
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", padding:"22px 28px", background:C.bg }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
        {[
          { l:"GMB Views", v:"4,210", c:C.blueL, ch:"+12%" },
          { l:"Direction Requests", v:"328", c:C.green, ch:"+8%" },
          { l:"Calls from GMB", v:"142", c:C.orange, ch:"+24%" },
          { l:"Avg. Star Rating", v:"4.7 ★", c:C.yellow, ch:"+0.1" },
        ].map(s => (
          <div key={s.l} className="card" style={{ padding:"14px 18px" }}>
            <div style={{ color:C.textDim, fontSize:12, marginBottom:6 }}>{s.l}</div>
            <div className="sg" style={{ fontSize:22, fontWeight:800, color:s.c }}>{s.v}</div>
            <div style={{ color:C.green, fontSize:12, fontWeight:600, marginTop:4 }}>↑ {s.ch} this month</div>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20, marginBottom:20 }}>
        <div className="card" style={{ padding:20 }}>
          <div className="sg" style={{ color:C.text, fontWeight:700, marginBottom:14 }}>Google Business Profile</div>
          <div style={{ display:"flex", gap:12, marginBottom:14 }}>
            <div style={{ width:56, height:56, borderRadius:12, background:C.blueL, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Globe size={24} color="#fff"/>
            </div>
            <div>
              <div style={{ color:C.text, fontWeight:700, fontSize:15 }}>SEO Engine Boost</div>
              <div style={{ color:C.textDim, fontSize:12 }}>Digital Marketing Agency · Cebu City, Philippines</div>
              <span className="chip" style={{ color:C.green, background:C.greenL }}>Verified ✓</span>
            </div>
          </div>
          {[
            { l:"Business Name", v:"SEO Engine Boost" },
            { l:"Address", v:"IT Park, Cebu City, Philippines" },
            { l:"Phone", v:"+63 32 123 4567" },
            { l:"Website", v:"seoengineboost.com" },
            { l:"Category", v:"Digital Marketing Agency" },
          ].map(f => (
            <div key={f.l} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:`1px solid ${C.border}` }}>
              <span style={{ color:C.textDim, fontSize:12 }}>{f.l}</span>
              <span style={{ color:C.text, fontSize:12, fontWeight:600 }}>{f.v}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding:20 }}>
          <div className="sg" style={{ color:C.text, fontWeight:700, marginBottom:14 }}>Recent Reviews</div>
          {[
            { name:"Maria K.", rating:5, text:"Amazing SEO results! Traffic doubled in 2 months.", t:"2d ago" },
            { name:"John D.", rating:5, text:"Best SEO tool I've used. Very professional team.", t:"1w ago" },
            { name:"Ana G.", rating:4, text:"Great tool, would love more local features.", t:"2w ago" },
          ].map((r,i) => (
            <div key={i} style={{ padding:"10px 0", borderBottom:i<2?`1px solid ${C.border}`:"none" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ color:C.text, fontWeight:600, fontSize:13 }}>{r.name}</span>
                <span style={{ color:C.yellow, fontSize:12 }}>{"★".repeat(r.rating)}</span>
              </div>
              <p style={{ color:C.textMid, fontSize:12, lineHeight:1.5 }}>{r.text}</p>
              <span style={{ color:C.textDim, fontSize:10 }}>{r.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SEOTaskManagement ─────────────────────────────────────────────────
function SEOTaskManagement() {
  const tasks = [
    { t:"Add H1 tags to 12 pages", cat:"On-Page SEO", pri:"high", status:"Todo", assign:"Mahmoud", due:"Today" },
    { t:"Fix Core Web Vitals on mobile", cat:"Performance", pri:"high", status:"In Progress", assign:"Sam", due:"Tomorrow" },
    { t:"Create 5 FAQ schema markups", cat:"Technical SEO", pri:"medium", status:"Todo", assign:"Aisha", due:"This week" },
    { t:"Build 3 backlinks from DA 50+ sites", cat:"Link Building", pri:"high", status:"In Progress", assign:"You", due:"This week" },
    { t:"Optimize meta descriptions on blog", cat:"On-Page SEO", pri:"medium", status:"Done", assign:"Mahmoud", due:"Done" },
    { t:"Add alt text to 48 images", cat:"On-Page SEO", pri:"medium", status:"Todo", assign:"Aisha", due:"Next week" },
  ];
  const stCol = s => s==="Done"?C.green:s==="In Progress"?C.blueL:C.textDim;
  const stBg = s => s==="Done"?C.greenL:s==="In Progress"?C.bluePale:C.bg;
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", padding:"22px 28px", background:C.bg }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
        {[
          { l:"Total Tasks", v:tasks.length, c:C.blueL },
          { l:"In Progress", v:tasks.filter(t=>t.status==="In Progress").length, c:C.orange },
          { l:"Completed", v:tasks.filter(t=>t.status==="Done").length, c:C.green },
          { l:"Due Today", v:tasks.filter(t=>t.due==="Today").length, c:C.red },
        ].map(s => (
          <div key={s.l} className="card" style={{ padding:"14px 18px" }}>
            <div style={{ color:C.textDim, fontSize:12, marginBottom:6 }}>{s.l}</div>
            <div className="sg" style={{ fontSize:26, fontWeight:800, color:s.c }}>{s.v}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <div style={{ display:"flex", gap:8 }}>
          {["All","On-Page SEO","Technical SEO","Link Building","Performance"].map(c => (
            <button key={c} style={{ background:c==="All"?C.blueL:"transparent", color:c==="All"?"#fff":C.textMid, border:`1px solid ${c==="All"?C.blueL:C.border}`, cursor:"pointer", padding:"6px 14px", borderRadius:7, fontSize:12, fontFamily:"inherit" }}>{c}</button>
          ))}
        </div>
        <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"8px 16px", borderRadius:8, fontSize:13, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 }}>
          <Plus size={12}/> Add Task
        </button>
      </div>
      <div className="card" style={{ overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr style={{ background:C.bg }}>
            {["Task","Category","Priority","Status","Assignee","Due"].map(h => (
              <th key={h} style={{ padding:"10px 14px", textAlign:"left", color:C.textDim, fontSize:11, fontWeight:700, borderBottom:`1px solid ${C.border}` }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {tasks.map((t,i) => (
              <tr key={i} className="td" style={{ opacity:t.status==="Done"?0.65:1 }}>
                <td style={{ padding:"12px 14px", color:C.text, fontSize:13 }}>{t.t}</td>
                <td style={{ padding:"12px 14px" }}><span className="chip" style={{ color:C.blueL, background:C.bluePale }}>{t.cat}</span></td>
                <td style={{ padding:"12px 14px" }}><PriBadge p={t.pri}/></td>
                <td style={{ padding:"12px 14px" }}><span className="chip" style={{ color:stCol(t.status), background:stBg(t.status) }}>{t.status}</span></td>
                <td style={{ padding:"12px 14px", color:C.textMid, fontSize:12 }}>{t.assign}</td>
                <td style={{ padding:"12px 14px", color:t.due==="Today"?C.red:C.textMid, fontSize:12, fontWeight:t.due==="Today"?700:400 }}>{t.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── ProgressScreen ────────────────────────────────────────────────────
function ProgressScreen() {
  const crawlData = [
    { m:"Oct", issues:120, fixed:40 }, { m:"Nov", issues:98, fixed:65 },
    { m:"Dec", issues:75, fixed:80 }, { m:"Jan", issues:64, fixed:90 },
    { m:"Feb", issues:52, fixed:95 }, { m:"Mar", issues:32, fixed:102 },
  ];
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", padding:"22px 28px", background:C.bg }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
        {[
          { l:"Crawled Pages", v:"1,248", c:C.blueL },
          { l:"Issues Found", v:"32", c:C.red },
          { l:"Issues Fixed", v:"102", c:C.green },
          { l:"SEO Score", v:"68/100", c:C.yellow },
        ].map(s => (
          <div key={s.l} className="card" style={{ padding:"14px 18px" }}>
            <div style={{ color:C.textDim, fontSize:12, marginBottom:6 }}>{s.l}</div>
            <div className="sg" style={{ fontSize:22, fontWeight:800, color:s.c }}>{s.v}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding:20, marginBottom:20 }}>
        <div className="sg" style={{ color:C.text, fontWeight:700, marginBottom:16 }}>Issues Found vs Fixed Over Time</div>
        <ResponsiveContainer width="100%" height={220}>
          <RBarChart data={crawlData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="m" tick={{ fill:C.textDim, fontSize:11 }} axisLine={false}/>
            <YAxis tick={{ fill:C.textDim, fontSize:11 }} axisLine={false}/>
            <Tooltip contentStyle={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8 }}/>
            <Bar dataKey="issues" fill={C.red} radius={[4,4,0,0]} name="Issues Found" fillOpacity={0.7}/>
            <Bar dataKey="fixed" fill={C.green} radius={[4,4,0,0]} name="Issues Fixed"/>
          </RBarChart>
        </ResponsiveContainer>
      </div>
      <div className="card" style={{ padding:20 }}>
        <div className="sg" style={{ color:C.text, fontWeight:700, marginBottom:14 }}>Category Progress</div>
        {[
          { cat:"Technical SEO", done:18, total:22, c:C.blueL },
          { cat:"On-Page SEO", done:8, total:14, c:C.orange },
          { cat:"Link Building", done:5, total:7, c:C.purple },
          { cat:"Performance", done:3, total:5, c:C.green },
        ].map(p => (
          <div key={p.cat} style={{ marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <span style={{ color:C.text, fontSize:13 }}>{p.cat}</span>
              <span style={{ color:C.textDim, fontSize:12 }}>{p.done}/{p.total}</span>
            </div>
            <ProgBar v={p.done/p.total*100} col={p.c} h={7}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ContentLab ────────────────────────────────────────────────────────
function ContentLab() {
  const [prompt, setPrompt] = useState("");
  const [tab, setTab] = useState("write");
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", padding:"22px 28px", background:C.bg }}>
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {["write","optimize","brief","outline"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ background:tab===t?C.blueL:"transparent", color:tab===t?"#fff":C.textMid, border:`1px solid ${tab===t?C.blueL:C.border}`, cursor:"pointer", padding:"8px 18px", borderRadius:20, fontSize:12, fontWeight:600, fontFamily:"inherit", textTransform:"capitalize" }}>{t==="write"?"Write Content":t==="optimize"?"Optimize Existing":t==="brief"?"Content Brief":"Content Outline"}</button>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <div>
          <div className="card" style={{ padding:18, marginBottom:16 }}>
            <div style={{ color:C.textDim, fontSize:12, fontWeight:700, marginBottom:8 }}>TOPIC / TARGET KEYWORD</div>
            <input placeholder="e.g. best seo tools 2026" style={{ width:"100%", background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", color:C.text, fontSize:13, fontFamily:"inherit", outline:"none" }}/>
          </div>
          <div className="card" style={{ padding:18, marginBottom:16 }}>
            <div style={{ color:C.textDim, fontSize:12, fontWeight:700, marginBottom:8 }}>AI PROMPT</div>
            <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Write a comprehensive 1500-word blog post about the best SEO tools in 2026, including free and paid options..." style={{ width:"100%", background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 12px", color:C.text, fontSize:13, fontFamily:"inherit", outline:"none", resize:"vertical", minHeight:120 }}/>
            <div style={{ display:"flex", gap:8, marginTop:10 }}>
              <button style={{ flex:1, background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"10px", borderRadius:8, fontSize:13, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                <Sparkles size={13}/> Generate Content
              </button>
              <button style={{ flex:1, background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"10px", borderRadius:8, fontSize:13, fontFamily:"inherit" }}>Clear</button>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {["Tone: Professional","Length: 1500w","Language: English","Format: Blog Post"].map(s => (
              <div key={s} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 12px", color:C.textMid, fontSize:12, display:"flex", justifyContent:"space-between" }}>
                <span>{s.split(":")[0]}</span><strong style={{ color:C.text }}>{s.split(":")[1]}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding:18 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div className="sg" style={{ color:C.text, fontWeight:700 }}>Generated Content</div>
            <div style={{ display:"flex", gap:6 }}>
              <button style={{ background:C.bg, border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"5px 10px", borderRadius:6, fontSize:11, fontFamily:"inherit" }}>Copy</button>
              <button style={{ background:C.bg, border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"5px 10px", borderRadius:6, fontSize:11, fontFamily:"inherit" }}>Export</button>
            </div>
          </div>
          <div style={{ background:C.bg, borderRadius:10, padding:16, minHeight:300, color:C.textMid, fontSize:13, lineHeight:1.7 }}>
            <p style={{ color:C.text, fontWeight:700, fontSize:16, marginBottom:10 }}>The 10 Best SEO Tools of 2026: A Comprehensive Guide</p>
            <p style={{ marginBottom:12 }}>In the fast-evolving world of search engine optimization, having the right tools can make or break your digital strategy. Whether you're a beginner just starting out or an experienced SEO professional managing multiple clients, the right toolkit can dramatically improve your results.</p>
            <p>In this comprehensive guide, we'll explore the top SEO tools available in 2026, covering everything from keyword research and rank tracking to technical audits and competitor analysis...</p>
            <div style={{ marginTop:16, padding:"10px 14px", background:C.bluePale, borderRadius:8, borderLeft:`3px solid ${C.blueL}` }}>
              <div style={{ color:C.blueL, fontSize:12, fontWeight:700 }}>SEO Score: 84/100</div>
              <div style={{ color:C.textMid, fontSize:11, marginTop:3 }}>Keyword density 1.8% · Readability Grade 8 · 1,240 words generated</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Reports ───────────────────────────────────────────────────────────
function Reports() {
  const reports = [
    { name:"SEO Monthly Report — April 2026", client:"SEO Engine Boost", date:"May 1, 2026", type:"Monthly", status:"Ready" },
    { name:"Dental Pro Q1 Performance", client:"Dental Pro", date:"Apr 1, 2026", type:"Quarterly", status:"Ready" },
    { name:"Keyword Performance Deep-Dive", client:"Fitness App", date:"Apr 15, 2026", type:"Custom", status:"Draft" },
    { name:"Backlink Audit Report", client:"Tech Blog", date:"Apr 28, 2026", type:"Audit", status:"Ready" },
  ];
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", padding:"22px 28px", background:C.bg }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div style={{ display:"flex", gap:8 }}>
          {["All Reports","Monthly","Quarterly","Custom","Audit"].map(t => (
            <button key={t} style={{ background:t==="All Reports"?C.blueL:"transparent", color:t==="All Reports"?"#fff":C.textMid, border:`1px solid ${t==="All Reports"?C.blueL:C.border}`, cursor:"pointer", padding:"7px 14px", borderRadius:7, fontSize:12, fontFamily:"inherit" }}>{t}</button>
          ))}
        </div>
        <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"9px 18px", borderRadius:8, fontSize:13, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 }}>
          <Plus size={13}/> New Report
        </button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
        {reports.map((r,i) => (
          <div key={i} className="card ch" style={{ padding:20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
              <div>
                <div style={{ color:C.text, fontWeight:700, fontSize:14, marginBottom:4 }}>{r.name}</div>
                <div style={{ color:C.textDim, fontSize:12 }}>{r.client} · {r.date}</div>
              </div>
              <span className="chip" style={{ color:r.status==="Ready"?C.green:C.yellow, background:r.status==="Ready"?C.greenL:C.yellowL }}>{r.status}</span>
            </div>
            <div style={{ display:"flex", gap:6 }}>
              <span className="chip" style={{ color:C.blueL, background:C.bluePale }}>{r.type}</span>
            </div>
            <div style={{ display:"flex", gap:8, marginTop:14 }}>
              <button style={{ flex:1, background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"7px", borderRadius:7, fontSize:12, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
                <Download size={11}/> Export PDF
              </button>
              <button style={{ flex:1, background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"7px", borderRadius:7, fontSize:12, fontFamily:"inherit" }}>Preview</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TeamMembers ───────────────────────────────────────────────────────
function TeamMembers() {
  const members = [
    { name:"Mahmoud Al-Rashid", role:"SEO Manager", email:"mahmoud@boostly.io", av:"M", status:"Active", tasks:12 },
    { name:"Aisha Omar", role:"Content Writer", email:"aisha@boostly.io", av:"A", status:"Active", tasks:8 },
    { name:"Sam Chen", role:"Developer", email:"sam@boostly.io", av:"S", status:"Active", tasks:5 },
    { name:"Jordan Smith", role:"Link Builder", email:"jordan@boostly.io", av:"J", status:"Away", tasks:9 },
    { name:"You", role:"Admin", email:"admin@boostly.io", av:"Y", status:"Active", tasks:15 },
  ];
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", padding:"22px 28px", background:C.bg }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div style={{ color:C.textDim, fontSize:14 }}><strong style={{ color:C.text }}>{members.length} members</strong> in your workspace</div>
        <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"9px 18px", borderRadius:8, fontSize:13, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 }}>
          <UserPlus size={13}/> Invite Member
        </button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
        {members.map((m,i) => (
          <div key={i} className="card ch" style={{ padding:20, textAlign:"center" }}>
            <div style={{ position:"relative", display:"inline-block", marginBottom:12 }}>
              <Av l={m.av} size={52}/>
              <div style={{ position:"absolute", bottom:0, right:0, width:12, height:12, borderRadius:"50%", background:m.status==="Active"?C.green:C.yellow, border:"2px solid #fff" }}/>
            </div>
            <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:15 }}>{m.name}</div>
            <div style={{ color:C.textDim, fontSize:12, marginBottom:12 }}>{m.role}</div>
            <div style={{ display:"flex", justifyContent:"center", gap:16, marginBottom:14 }}>
              <div><div className="sg" style={{ color:C.text, fontWeight:700, fontSize:18 }}>{m.tasks}</div><div style={{ color:C.textDim, fontSize:10 }}>Active Tasks</div></div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button style={{ flex:1, background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"7px", borderRadius:7, fontSize:12, fontFamily:"inherit" }}>Message</button>
              <button style={{ flex:1, background:C.bg, border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"7px", borderRadius:7, fontSize:12, fontFamily:"inherit" }}>Edit Role</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── AICopilot ─────────────────────────────────────────────────────────
function AICopilot({ onClose }) {
  const [msgs, setMsgs] = useState([
    { role:"ai", text:"Hi! I'm your AI SEO Copilot. I can help you analyze keywords, fix technical issues, write content, and grow your rankings. What would you like to work on?" },
  ]);
  const [input, setInput] = useState("");
  const send = () => {
    if (!input.trim()) return;
    const q = input;
    setMsgs(m => [...m, { role:"user", text:q }, { role:"ai", text:`Great question! Based on your site data, here's what I recommend for "${q}": Focus on fixing Core Web Vitals first (your LCP is 4.2s — target under 2.5s), then build 3 high-quality backlinks from DA 60+ sites in your niche. This should boost your domain rating by 5-8 points within 60 days.` }]);
    setInput("");
  };
  return (
    <div style={{ position:"fixed", top:0, right:0, width:380, height:"100vh", background:C.white, borderLeft:`1px solid ${C.border}`, boxShadow:"-8px 0 30px rgba(0,0,0,0.1)", display:"flex", flexDirection:"column", zIndex:200 }}>
      <div style={{ padding:"14px 16px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:10, background:`linear-gradient(135deg,${C.blue},${C.blueL})` }}>
        <div style={{ width:32, height:32, borderRadius:9, background:"rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Bot size={16} color="#fff"/>
        </div>
        <div>
          <div className="sg" style={{ color:"#fff", fontWeight:700, fontSize:14 }}>AI SEO Copilot</div>
          <div style={{ color:"rgba(255,255,255,.7)", fontSize:10 }}>Powered by Claude AI</div>
        </div>
        <button onClick={onClose} style={{ marginLeft:"auto", background:"rgba(255,255,255,.15)", border:"none", cursor:"pointer", width:28, height:28, borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <X size={13} color="#fff"/>
        </button>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:16, display:"flex", flexDirection:"column", gap:12 }}>
        {msgs.map((m,i) => (
          <div key={i} style={{ display:"flex", gap:8, flexDirection:m.role==="user"?"row-reverse":"row" }}>
            <div style={{ width:28, height:28, borderRadius:7, background:m.role==="user"?C.orange:C.blueL, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              {m.role==="user"?<Av l="Y" size={28}/>:<Bot size={14} color="#fff"/>}
            </div>
            <div style={{ maxWidth:"80%", background:m.role==="user"?C.orange:`${C.blueL}12`, color:m.role==="user"?"#fff":C.text, padding:"10px 13px", borderRadius:10, fontSize:13, lineHeight:1.55 }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding:"10px 14px", borderTop:`1px solid ${C.border}` }}>
        <div style={{ display:"flex", gap:6, marginBottom:8 }}>
          {["Fix my top issues","Write blog post","Keyword ideas"].map(chip => (
            <button key={chip} onClick={() => setInput(chip)} style={{ background:C.bluePale, color:C.blueL, border:"none", cursor:"pointer", padding:"4px 10px", borderRadius:20, fontSize:11, fontWeight:600, fontFamily:"inherit" }}>{chip}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask anything about SEO..." style={{ flex:1, background:C.bg, border:`1px solid ${C.border}`, borderRadius:9, padding:"9px 12px", color:C.text, fontSize:13, fontFamily:"inherit", outline:"none" }}/>
          <button onClick={send} style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", width:36, height:36, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Send size={14}/>
          </button>
        </div>
      </div>
    </div>
  );
}
function DomainOverviewScreen() {
  const [domain, setDomain] = useState("designer.com");
  const [country, setCountry] = useState("Mid");
  const blData2 = [{m:"Jan 2022",v:120},{m:"Jun 2022",v:140},{m:"Jan 2023",v:160},{m:"Aug 2023",v:200},{m:"Aug 2024",v:230}];
  const topPages = [
    {page:"/studio/blog/a-hands-on-guide-to-",share:"67.65%",uv:"285K",visitors:"19K"},
    {page:"design.com",share:"5.9%",uv:"28.7K",visitors:"28.7K"},
    {page:"/studio/blog/a",share:"1.69%",uv:"8.5K",visitors:"8.5K"},
    {page:"app.uxpin.com",share:"0.35%",uv:"6.5K",visitors:"6.5K"},
  ];
  const kwData2 = [
    {kw:"Designer",cpc:"$46",serp:31,kd:54},{kw:"Designs",cpc:"$46",serp:31,kd:54},
    {kw:"Design",cpc:"$46",serp:31,kd:54},{kw:"Designing",cpc:"$46",serp:31,kd:54},
  ];

  return (
    <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)",background:C.bg}}>
      {/* Header */}
      <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"16px 28px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"7px 14px",borderRadius:8,fontSize:12,fontWeight:700,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}><Plus size={12}/> Create Project</button>
          <button style={{background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",padding:"7px 14px",borderRadius:8,fontSize:12,fontFamily:"inherit"}}>See projects ▾</button>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{flex:1,display:"flex",alignItems:"center",gap:8,background:C.bg,border:`1px solid ${C.border}`,borderRadius:9,padding:"8px 14px"}}>
            <Search size={13} color={C.textDim}/>
            <input value={domain} onChange={e=>setDomain(e.target.value)} style={{flex:1,background:"transparent",border:"none",outline:"none",color:C.text,fontSize:13,fontFamily:"inherit"}}/>
            <select value={country} onChange={e=>setCountry(e.target.value)} style={{background:"transparent",border:"none",outline:"none",color:C.textMid,fontSize:12,fontFamily:"inherit",cursor:"pointer"}}>
              <option>Mid</option><option>Global</option><option>PH</option><option>US</option>
            </select>
          </div>
          <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"9px 22px",borderRadius:9,fontSize:13,fontWeight:700,fontFamily:"inherit"}}>Search</button>
        </div>
        <div style={{marginTop:12}}>
          <div style={{color:C.orange,fontSize:16,fontWeight:800,fontFamily:"Space Grotesk",marginBottom:2}}>Domain Overview</div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{color:C.textDim,fontSize:12}}>Date:</span>
            <span style={{color:C.blueL,fontSize:12,fontWeight:600,cursor:"pointer"}}>12 September 2023 ▾</span>
          </div>
        </div>
      </div>

      <div style={{padding:"20px 28px"}}>
        {/* Organic Traffic Card */}
        <div className="card" style={{padding:"20px 24px",marginBottom:16}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:20,marginBottom:16}}>
            <div style={{flex:1}}>
              <div style={{color:C.orange,fontSize:14,fontWeight:800,fontFamily:"Space Grotesk",marginBottom:8}}>Organic Traffic  <span style={{color:C.textDim,fontSize:12,fontWeight:400}}>81.34k/month</span></div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
                {[["Visits","333K","+4%"],["Unique Visitors","33K","+3%"],["Pages/Visit","4.2",""],["Avg Duration","3:21",""]].map(([l,v,ch]) => (
                  <div key={l} style={{padding:"10px 12px",background:C.bg,borderRadius:8,border:`1px solid ${C.border}`}}>
                    <div style={{color:C.textDim,fontSize:10.5,marginBottom:4}}>{l}</div>
                    <div className="sg" style={{color:C.text,fontSize:18,fontWeight:800}}>{v}</div>
                    {ch&&<div style={{color:C.green,fontSize:10.5,fontWeight:700}}>{ch}</div>}
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={110}>
                <AreaChart data={trafficData} margin={{top:0,right:0,left:-22,bottom:0}}>
                  <defs>
                    <linearGradient id="dog1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.blueL} stopOpacity={.15}/><stop offset="95%" stopColor={C.blueL} stopOpacity={0}/></linearGradient>
                    <linearGradient id="dog2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.orange} stopOpacity={.1}/><stop offset="95%" stopColor={C.orange} stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
                  <XAxis dataKey="m" tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
                  <Area type="monotone" dataKey="organic" stroke={C.blueL} fill="url(#dog1)" strokeWidth={2}/>
                  <Area type="monotone" dataKey="paid" stroke={C.orange} fill="url(#dog2)" strokeWidth={1.5} strokeDasharray="4 2"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {/* Sidebar stats */}
            <div style={{display:"flex",flexDirection:"column",gap:8,minWidth:180}}>
              {[["Backlinks","1.2K","+5%",C.blueL],["Page/Visitors","552.5K","+2%",C.green],["Avg Duration","61K","-4%",C.orange],["Authority Score","61","+2",C.purple],["Paid Traffic","621K","+8%",C.blueL]].map(([l,v,ch,col]) => (
                <div key={l} className="card" style={{padding:"10px 14px"}}>
                  <div style={{color:C.textDim,fontSize:10.5}}>{l}</div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:2}}>
                    <div className="sg" style={{color:C.text,fontSize:16,fontWeight:800}}>{v}</div>
                    <span className="chip" style={{color:parseFloat(ch)>0?C.green:C.red,background:parseFloat(ch)>0?C.greenL:C.redL,fontSize:9}}>{ch}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Backlinks section */}
        <div className="card" style={{padding:"18px 22px",marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <div className="sg" style={{color:C.text,fontSize:14,fontWeight:700}}>Backlinks</div>
            <button style={{background:"transparent",border:`1px solid ${C.border}`,color:C.blueL,cursor:"pointer",padding:"5px 12px",borderRadius:7,fontSize:12,fontFamily:"inherit"}}>View Backlinks →</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:16,alignItems:"center"}}>
            <ResponsiveContainer width="100%" height={100}>
              <AreaChart data={blData2} margin={{top:0,right:0,left:-22,bottom:0}}>
                <defs><linearGradient id="blg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.orange} stopOpacity={.2}/><stop offset="95%" stopColor={C.orange} stopOpacity={0}/></linearGradient></defs>
                <XAxis dataKey="m" tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
                <Area type="monotone" dataKey="v" stroke={C.orange} fill="url(#blg)" strokeWidth={2}/>
                <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
              </AreaChart>
            </ResponsiveContainer>
            <div>
              <p style={{color:C.textMid,fontSize:12,lineHeight:1.6,marginBottom:10}}>Evaluate the link profile of a site or page URL. Analyze backlink authority, type, and growth over time.</p>
              <div style={{display:"flex",gap:8}}>
                <input placeholder="Paste to domain name" style={{flex:1,padding:"7px 10px",border:`1px solid ${C.border}`,borderRadius:7,fontSize:12,fontFamily:"inherit",outline:"none"}}/>
                <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"7px 14px",borderRadius:7,fontSize:12,fontWeight:700,fontFamily:"inherit"}}>Search</button>
              </div>
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="card" style={{overflow:"hidden",marginBottom:16}}>
          <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",gap:8}}>
            {["Top pages","Top SubDomains","Top Subdomains+"].map((t,i) => (
              <button key={t} style={{padding:"5px 12px",borderRadius:6,border:"none",cursor:"pointer",fontSize:12,fontFamily:"inherit",background:i===0?C.blueL:"transparent",color:i===0?"#fff":C.textDim}}>{t}</button>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",padding:"8px 18px",background:C.bg,borderBottom:`1px solid ${C.border}`}}>
            {["Page","Traffic Share","Unique Pageviews","Unique Visitors"].map(h=><div key={h} style={{color:C.textDim,fontSize:10,fontWeight:700,letterSpacing:.4}}>{h.toUpperCase()}</div>)}
          </div>
          {topPages.map(({page,share,uv,visitors},i) => (
            <div key={i} className="td" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",padding:"10px 18px",borderBottom:i<topPages.length-1?`1px solid ${C.border}`:"none",alignItems:"center"}}>
              <span style={{color:C.blueL,fontSize:12,cursor:"pointer"}}>{page}</span>
              <span style={{color:C.textMid,fontSize:12}}>{share}</span>
              <span style={{color:C.textMid,fontSize:12}}>{uv}</span>
              <span style={{color:C.textMid,fontSize:12}}>{visitors}</span>
            </div>
          ))}
        </div>

        {/* Keywords */}
        <div className="card" style={{overflow:"hidden"}}>
          <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`}}>
            <div className="sg" style={{color:C.orange,fontSize:14,fontWeight:700}}>Keywords</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"2fr .7fr .7fr .5fr .5fr",padding:"8px 18px",background:C.bg,borderBottom:`1px solid ${C.border}`}}>
            {["Keyword","Trend","CPC","SERP","KD"].map(h=><div key={h} style={{color:C.textDim,fontSize:10,fontWeight:700}}>{h.toUpperCase()}</div>)}
          </div>
          {kwData2.map(({kw,cpc,serp,kd},i) => (
            <div key={i} className="td" style={{display:"grid",gridTemplateColumns:"2fr .7fr .7fr .5fr .5fr",padding:"10px 18px",borderBottom:i<kwData2.length-1?`1px solid ${C.border}`:"none",alignItems:"center"}}>
              <span style={{color:C.text,fontSize:12.5,fontWeight:500}}>{kw}</span>
              <div style={{display:"flex",gap:1}}>
                {[2,3,4,5,4,3,4,5,4,3].map((v,j) => <div key={j} style={{width:3,height:v*3,background:C.blueL,borderRadius:1,alignSelf:"flex-end"}}/>)}
              </div>
              <span style={{color:C.textMid,fontSize:12}}>{cpc}</span>
              <span style={{color:C.textMid,fontSize:12}}>{serp}</span>
              <span style={{color:C.textMid,fontSize:12}}>{kd}</span>
            </div>
          ))}
          <div style={{padding:"10px 18px"}}>
            <button style={{color:C.blueL,background:"none",border:`1px solid ${C.blueL}`,cursor:"pointer",padding:"6px 14px",borderRadius:7,fontSize:12,fontWeight:600,fontFamily:"inherit"}}>View all Keywords →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Keyword Gap Screen (matches images 3 & 4) ───────────────────────────
// ── ADDITIONS START HERE ──
// These are new components to add BEFORE the SCREENS map

// ── Onboarding Screen ─────────────────────────────────────────────────
function OnboardingScreen({ onDone }) {
  const [slide, setSlide] = useState(0);
  const slides = [
    { emoji: "🚀", title: "Fastest SEO Analysis in the World", desc: "Get website audits, keyword research, and AI-powered recommendations in seconds. Used by 10,000+ SEO professionals.", col: C.blueL },
    { emoji: "📊", title: "The Most Accurate SEO Platform", desc: "Data-driven insights powered by real search data. Outrank competitors and grow your organic traffic consistently.", col: C.orange },
    { emoji: "⚡", title: "Everything You Need, in One Place", desc: "Manage technical SEO, content, backlinks, and rankings — all from one powerful dashboard.", col: C.green },
  ];
  const cur = slides[slide];
  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(135deg,${C.navy||"#0A1628"},${C.blue})`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, fontFamily:"'Manrope',sans-serif" }}>
      <style>{CSS}</style>
      <div style={{ marginBottom:16, display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg,${C.orange},${C.blueL})`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Zap size={18} color="#fff" fill="#fff"/>
        </div>
        <span className="sg" style={{ color:"#fff", fontSize:20, fontWeight:800 }}>Boostly</span>
      </div>
      <div style={{ textAlign:"center", maxWidth:440 }}>
        <div style={{ fontSize:72, marginBottom:22 }}>{cur.emoji}</div>
        <h1 className="sg" style={{ color:"#fff", fontSize:28, fontWeight:800, lineHeight:1.3, marginBottom:14 }}>{cur.title}</h1>
        <p style={{ color:"rgba(255,255,255,.75)", fontSize:14.5, lineHeight:1.75, marginBottom:36 }}>{cur.desc}</p>
        <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:32 }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setSlide(i)} style={{ width: i===slide?28:8, height:8, borderRadius:4, background: i===slide?"#fff":"rgba(255,255,255,.3)", cursor:"pointer", transition:"all 0.3s" }}/>
          ))}
        </div>
        <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
          {slide < slides.length - 1
            ? <button onClick={() => setSlide(slide+1)} style={{ background:"#fff", color:C.blue, border:"none", cursor:"pointer", padding:"12px 32px", borderRadius:10, fontSize:14, fontWeight:800, fontFamily:"inherit" }}>Next →</button>
            : <button onClick={onDone} style={{ background:C.orange, color:"#fff", border:"none", cursor:"pointer", padding:"12px 32px", borderRadius:10, fontSize:14, fontWeight:800, fontFamily:"inherit" }}>Get Started 🚀</button>
          }
          {slide < slides.length - 1 && (
            <button onClick={onDone} style={{ background:"rgba(255,255,255,.15)", color:"rgba(255,255,255,.8)", border:"1px solid rgba(255,255,255,.3)", cursor:"pointer", padding:"12px 24px", borderRadius:10, fontSize:13, fontFamily:"inherit" }}>Skip</button>
          )}
        </div>
      </div>
      <div style={{ position:"absolute", bottom:24, color:"rgba(255,255,255,.4)", fontSize:12 }}>Trusted by 10,000+ SEO professionals worldwide</div>
    </div>
  );
}

// ── Login Screen ──────────────────────────────────────────────────────
function LoginScreen({ onLogin, onSignup }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = () => { setLoading(true); setTimeout(() => { setLoading(false); onLogin(); }, 900); };
  return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Manrope',sans-serif", padding:24 }}>
      <style>{CSS}</style>
      <div style={{ width:"100%", maxWidth:420 }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:9, marginBottom:18 }}>
            <div style={{ width:38, height:38, borderRadius:10, background:`linear-gradient(135deg,${C.orange},${C.blueL})`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 4px 14px ${C.orange}44` }}>
              <Zap size={19} color="#fff" fill="#fff"/>
            </div>
            <span className="sg" style={{ color:C.text, fontSize:22, fontWeight:800 }}>Boostly</span>
          </div>
          <h1 className="sg" style={{ color:C.text, fontSize:24, fontWeight:800, marginBottom:7 }}>Welcome Back</h1>
          <p style={{ color:C.textDim, fontSize:13.5 }}>Sign in to your SEO command center</p>
        </div>
        <div className="card" style={{ padding:"28px 28px" }}>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", color:C.textMid, fontSize:12, fontWeight:600, marginBottom:5 }}>Email Address</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@company.com"
              style={{ width:"100%", padding:"11px 13px", border:`1px solid ${C.border}`, borderRadius:9, fontSize:13, fontFamily:"inherit", outline:"none", color:C.text, background:C.bg, boxSizing:"border-box" }}/>
          </div>
          <div style={{ marginBottom:20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <label style={{ color:C.textMid, fontSize:12, fontWeight:600 }}>Password</label>
              <span style={{ color:C.blueL, fontSize:12, cursor:"pointer" }}>Forgot password?</span>
            </div>
            <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="••••••••"
              style={{ width:"100%", padding:"11px 13px", border:`1px solid ${C.border}`, borderRadius:9, fontSize:13, fontFamily:"inherit", outline:"none", color:C.text, background:C.bg, boxSizing:"border-box" }}/>
          </div>
          <button onClick={handleLogin} disabled={loading} style={{ width:"100%", padding:"12px", background:loading?"#93C5FD":C.blueL, color:"#fff", border:"none", cursor:"pointer", borderRadius:9, fontSize:14, fontWeight:700, fontFamily:"inherit" }}>
            {loading ? "Signing in..." : "Sign In →"}
          </button>
          <div style={{ display:"flex", gap:10, margin:"16px 0" }}>
            <div style={{ flex:1, height:1, background:C.border }}/>
            <span style={{ color:C.textDim, fontSize:12 }}>or</span>
            <div style={{ flex:1, height:1, background:C.border }}/>
          </div>
          {[{ l:"Continue with Google", emoji:"🇬" }, { l:"Continue with GitHub", emoji:"⬡" }].map(btn => (
            <button key={btn.l} onClick={onLogin} style={{ width:"100%", padding:"10px", background:"#fff", border:`1px solid ${C.border}`, cursor:"pointer", borderRadius:9, fontSize:13, fontWeight:600, fontFamily:"inherit", color:C.text, marginBottom:8, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              <span style={{ fontSize:16 }}>{btn.emoji}</span> {btn.l}
            </button>
          ))}
          <p style={{ textAlign:"center", color:C.textDim, fontSize:13, marginTop:8 }}>
            Don't have an account? <span style={{ color:C.blueL, fontWeight:700, cursor:"pointer" }} onClick={onSignup}>Sign Up Free</span>
          </p>
        </div>
        <p style={{ textAlign:"center", color:C.textDim, fontSize:11, marginTop:16 }}>By signing in, you agree to our Terms of Service & Privacy Policy</p>
      </div>
    </div>
  );
}

// ── Signup Screen ─────────────────────────────────────────────────────
function SignupScreen({ onSignup, onLogin }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name:"", email:"", pass:"", company:"", website:"", goal:"traffic" });
  const upd = (k,v) => setForm(f=>({...f,[k]:v}));
  return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Manrope',sans-serif", padding:24, overflowY:"auto" }}>
      <style>{CSS}</style>
      <div style={{ width:"100%", maxWidth:440 }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:9, marginBottom:16 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg,${C.orange},${C.blueL})`, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Zap size={17} color="#fff" fill="#fff"/>
            </div>
            <span className="sg" style={{ color:C.text, fontSize:20, fontWeight:800 }}>Boostly</span>
          </div>
          <h1 className="sg" style={{ color:C.text, fontSize:22, fontWeight:800, marginBottom:6 }}>Create Your Account</h1>
          <div style={{ display:"flex", gap:8, justifyContent:"center", marginTop:14 }}>
            {[1,2].map(i => (
              <div key={i} style={{ height:4, width: i<=step ? 60:28, borderRadius:2, background: i<=step ? C.blueL : C.border, transition:"all 0.3s" }}/>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding:"26px 26px" }}>
          {step === 1 ? (
            <>
              <div style={{ fontWeight:700, color:C.text, marginBottom:14, fontSize:13.5 }}>Step 1 of 2 — Your Account</div>
              {[["Full Name","name","text","John Smith"],["Work Email","email","email","you@company.com"],["Password","pass","password","Min 8 characters"]].map(([l,k,t,ph]) => (
                <div key={k} style={{ marginBottom:14 }}>
                  <label style={{ display:"block", color:C.textMid, fontSize:12, fontWeight:600, marginBottom:5 }}>{l}</label>
                  <input value={form[k]} onChange={e=>upd(k,e.target.value)} type={t} placeholder={ph}
                    style={{ width:"100%", padding:"11px 13px", border:`1px solid ${C.border}`, borderRadius:9, fontSize:13, fontFamily:"inherit", outline:"none", boxSizing:"border-box" }}/>
                </div>
              ))}
              <button onClick={() => setStep(2)} style={{ width:"100%", padding:"12px", background:C.blueL, color:"#fff", border:"none", cursor:"pointer", borderRadius:9, fontSize:14, fontWeight:700, fontFamily:"inherit" }}>Continue →</button>
            </>
          ) : (
            <>
              <div style={{ fontWeight:700, color:C.text, marginBottom:14, fontSize:13.5 }}>Step 2 of 2 — Your Business</div>
              {[["Company Name","company","text","Acme Inc."],["Website URL","website","url","https://yoursite.com"]].map(([l,k,t,ph]) => (
                <div key={k} style={{ marginBottom:14 }}>
                  <label style={{ display:"block", color:C.textMid, fontSize:12, fontWeight:600, marginBottom:5 }}>{l}</label>
                  <input value={form[k]} onChange={e=>upd(k,e.target.value)} type={t} placeholder={ph}
                    style={{ width:"100%", padding:"11px 13px", border:`1px solid ${C.border}`, borderRadius:9, fontSize:13, fontFamily:"inherit", outline:"none", boxSizing:"border-box" }}/>
                </div>
              ))}
              <div style={{ marginBottom:18 }}>
                <label style={{ display:"block", color:C.textMid, fontSize:12, fontWeight:600, marginBottom:8 }}>Primary Goal</label>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  {[["traffic","🚀 More Traffic"],["rankings","📈 Better Rankings"],["backlinks","🔗 Build Backlinks"],["clients","👥 Manage Clients"]].map(([v,l]) => (
                    <div key={v} onClick={() => upd("goal",v)} style={{ padding:"10px 12px", border:`2px solid ${form.goal===v?C.blueL:C.border}`, borderRadius:9, cursor:"pointer", fontSize:12, fontWeight:600, color:form.goal===v?C.blueL:C.textMid, background:form.goal===v?C.bluePale:"transparent" }}>
                      {l}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background:C.greenL, border:`1px solid ${C.green}40`, borderRadius:9, padding:"10px 14px", marginBottom:16, fontSize:12, color:C.green, fontWeight:600 }}>
                ✓ 14-day free trial · No credit card required · Cancel anytime
              </div>
              <button onClick={onSignup} style={{ width:"100%", padding:"12px", background:`linear-gradient(135deg,${C.orange},#EA6C0A)`, color:"#fff", border:"none", cursor:"pointer", borderRadius:9, fontSize:14, fontWeight:800, fontFamily:"inherit" }}>
                Create Free Account 🚀
              </button>
              <button onClick={() => setStep(1)} style={{ width:"100%", marginTop:8, padding:"10px", background:"transparent", color:C.textMid, border:`1px solid ${C.border}`, cursor:"pointer", borderRadius:9, fontSize:13, fontFamily:"inherit" }}>← Back</button>
            </>
          )}
          <p style={{ textAlign:"center", color:C.textDim, fontSize:13, marginTop:14 }}>
            Already have an account? <span style={{ color:C.blueL, fontWeight:700, cursor:"pointer" }} onClick={onLogin}>Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Premium Success Screen ─────────────────────────────────────────────
function PremiumSuccessScreen({ onContinue }) {
  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(135deg,${C.blue},${C.blueL})`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Manrope',sans-serif", textAlign:"center", padding:32 }}>
      <style>{CSS}</style>
      <div style={{ maxWidth:480 }}>
        <div style={{ fontSize:72, marginBottom:16 }}>👑</div>
        <h1 className="sg" style={{ color:"#fff", fontSize:32, fontWeight:900, marginBottom:10 }}>You're Now Premium!</h1>
        <p style={{ color:C.orange, fontWeight:700, fontSize:16, marginBottom:22 }}>Welcome to Boostly Pro — Unlimited Power Unlocked</p>
        <p style={{ color:"rgba(255,255,255,.75)", fontSize:14.5, lineHeight:1.7, marginBottom:32 }}>Every tool is now at your fingertips. Let's start dominating your rankings.</p>
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:32 }}>
          {["Unlimited keyword tracking & rank monitoring","Advanced competitor & backlink analysis","AI-powered content optimization (unlimited)","White-label PDF reports for clients","Priority support 24/7 — dedicated team","Full API access & custom integrations"].map(f => (
            <div key={f} style={{ display:"flex", alignItems:"center", gap:12, background:"rgba(255,255,255,.12)", borderRadius:10, padding:"12px 16px", textAlign:"left" }}>
              <CheckCircle2 size={16} color={C.green}/>
              <span style={{ color:"#fff", fontSize:13.5 }}>{f}</span>
            </div>
          ))}
        </div>
        <button onClick={onContinue} style={{ background:C.orange, color:"#fff", border:"none", cursor:"pointer", padding:"14px 40px", borderRadius:12, fontSize:16, fontWeight:800, fontFamily:"inherit", boxShadow:`0 6px 20px ${C.orange}55` }}>
          Start Exploring Premium →
        </button>
      </div>
    </div>
  );
}

// ── Backlink Gap Screen (image-matched) ──────────────────────────────
function BacklinkGapScreen() {
  const [d1, setD1] = useState("designer.com");
  const [d2, setD2] = useState("webflow.com");
  const [ran, setRan] = useState(false);
  const [filterTab, setFilterTab] = useState("Best");
  const authData = [
    {m:"Jan 2024",v1:42,v2:55},{m:"Apr 2024",v1:44,v2:58},{m:"Aug 2024",v1:43,v2:57},{m:"Nov 2024",v1:46,v2:60},{m:"Mar 2025",v1:48,v2:62}
  ];
  const refData = [
    {m:"Jan 2024",v1:18000,v2:22000},{m:"Apr 2024",v1:19500,v2:24000},{m:"Aug 2024",v1:21000,v2:26000},{m:"Nov 2024",v1:20000,v2:25000},{m:"Mar 2025",v1:22000,v2:27000}
  ];
  const prospects = [
    { name:"toplink.io", cat:"Business & Industrial Business Operations", as:41, bl:1.1, ref:1.0, fb:0, tw:2 },
    { name:"toplink.io", cat:"Business & Industrial Business Operations", as:41, bl:3.4, ref:5.0, fb:0, tw:9 },
    { name:"toplink.io", cat:"Business & Industrial Business Operations", as:41, bl:125, ref:5.0, fb:0, tw:3 },
    { name:"toplink.io", cat:"Business & Industrial Business Operations", as:41, bl:225, ref:5.0, fb:0, tw:2 },
  ];
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg }}>
      <div style={{ padding:"20px 28px 0", background:C.white, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ marginBottom:16 }}>
          <h2 className="sg" style={{ color:C.text, fontSize:20, fontWeight:800, marginBottom:4 }}>Backlink Gap</h2>
          <p style={{ color:C.textDim, fontSize:13 }}>Compare backlink profiles and discover link-building opportunities</p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
          {[{v:d1,sv:setD1},{v:d2,sv:setD2}].map((row,i) => (
            <div key={i} style={{ display:"flex", gap:8, alignItems:"center" }}>
              <select style={{ padding:"8px 10px", border:`1px solid ${C.border}`, borderRadius:7, fontSize:12, fontFamily:"inherit", outline:"none", background:"white" }}><option>Root Domain</option><option>Subdomain</option><option>URL</option></select>
              <input value={row.v} onChange={e=>row.sv(e.target.value)} style={{ flex:1, padding:"8px 12px", border:`1px solid ${C.border}`, borderRadius:7, fontSize:13, fontFamily:"inherit", outline:"none" }}/>
              <select style={{ padding:"8px 10px", border:`1px solid ${C.border}`, borderRadius:7, fontSize:12, fontFamily:"inherit", outline:"none", background:"white" }}><option>Organic keywords</option><option>Paid keywords</option></select>
            </div>
          ))}
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={() => setRan(true)} style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"9px 22px", borderRadius:8, fontSize:13, fontWeight:700, fontFamily:"inherit" }}>Find prospect</button>
            <button onClick={() => setRan(false)} style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"9px 16px", borderRadius:8, fontSize:13, fontFamily:"inherit" }}>Clear all</button>
            <button style={{ background:"transparent", border:"none", color:C.blueL, cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"inherit" }}>+ Add up to 3 competitors</button>
          </div>
        </div>
      </div>

      {!ran ? (
        <div style={{ padding:"32px 28px" }}>
          <div className="card" style={{ padding:"28px 32px", marginBottom:20 }}>
            <h3 className="sg" style={{ color:C.text, fontSize:16, fontWeight:700, marginBottom:8 }}>Discover every detail about your and your competitors' backlinks</h3>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginTop:20 }}>
              <div>
                <div style={{ color:C.textDim, fontSize:11, fontWeight:700, letterSpacing:.5, marginBottom:8 }}>TRACK DOMAIN BACKLINKS</div>
                <h4 className="sg" style={{ color:C.text, fontSize:15, fontWeight:800, marginBottom:8 }}>Track Domain Backlinks</h4>
                <p style={{ color:C.textMid, fontSize:12.5, lineHeight:1.7, marginBottom:12 }}>Evaluate the link profile of a site or page URL. Compare your backlink profile against competitors to find link-building opportunities.</p>
                <ResponsiveContainer width="100%" height={140}>
                  <LineChart data={[{n:0,v1:250,v2:400},{n:1,v1:270,v2:420},{n:2,v1:260,v2:450},{n:3,v1:300,v2:480},{n:4,v1:350,v2:500},{n:5,v1:380,v2:520},{n:6,v1:400,v2:550},{n:7,v1:420,v2:570},{n:8,v1:480,v2:600},{n:9,v1:460,v2:620}]} margin={{top:0,right:0,left:-22,bottom:0}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
                    <XAxis dataKey="n" tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
                    <YAxis tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
                    <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
                    <Line type="monotone" dataKey="v1" stroke={C.blueL} strokeWidth={2} dot={false}/>
                    <Line type="monotone" dataKey="v2" stroke={C.orange} strokeWidth={2} dot={false}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <div style={{ color:C.textDim, fontSize:11, fontWeight:700, letterSpacing:.5, marginBottom:8 }}>SEE TOP PAGES AND OTHER CHARTED RANKINGS</div>
                <h4 className="sg" style={{ color:C.text, fontSize:15, fontWeight:800, marginBottom:8 }}>See Top Pages and Other charted rankings</h4>
                <p style={{ color:C.textMid, fontSize:12.5, lineHeight:1.7, marginBottom:12 }}>Get a full comparison of top ranking pages and their backlink profiles across your competitors' domains.</p>
                <ResponsiveContainer width="100%" height={140}>
                  <LineChart data={[{n:"May 25",v1:80,v2:60},{n:"Jun 15",v1:85,v2:65},{n:"Jun 30",v1:90,v2:70},{n:"Aug 5",v1:75,v2:80}]} margin={{top:0,right:0,left:-22,bottom:0}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
                    <XAxis dataKey="n" tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
                    <YAxis tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
                    <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
                    <Line type="monotone" dataKey="v1" stroke={C.blueL} strokeWidth={2.5} dot={false}/>
                    <Line type="monotone" dataKey="v2" stroke={C.orange} strokeWidth={2} dot={false}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding:"20px 28px" }}>
          <div className="sg" style={{ color:C.text, fontSize:14, fontWeight:700, marginBottom:14 }}>▼ Charts</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
            <div className="card" style={{ padding:"16px 20px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <div><div style={{ color:C.textMid, fontSize:11 }}>Authority Score</div><div style={{ color:C.textDim, fontSize:10 }}>Abigail / Topic Text Growth</div></div>
                <div style={{ color:C.textDim, fontSize:10 }}>Cat Competes</div>
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={authData} margin={{top:0,right:0,left:-25,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
                  <XAxis dataKey="m" tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
                  <Line type="monotone" dataKey="v1" stroke={C.blueL} strokeWidth={2} dot={false} name={d1}/>
                  <Line type="monotone" dataKey="v2" stroke={C.green} strokeWidth={2} dot={false} name={d2}/>
                </LineChart>
              </ResponsiveContainer>
              <div style={{ display:"flex", gap:12, marginTop:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:5 }}><div style={{ width:8,height:8,borderRadius:2,background:C.blueL }}/><span style={{ color:C.textMid,fontSize:11 }}>{d1}</span></div>
                <div style={{ display:"flex", alignItems:"center", gap:5 }}><div style={{ width:8,height:8,borderRadius:2,background:C.green }}/><span style={{ color:C.textMid,fontSize:11 }}>{d2}</span></div>
              </div>
            </div>
            <div className="card" style={{ padding:"16px 20px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <div><div style={{ color:C.textMid, fontSize:11 }}>Referring Domains</div><div style={{ color:C.textDim, fontSize:10 }}>Plugy Supper Prev Compar</div></div>
                <div style={{ color:C.textDim, fontSize:10 }}>Last 6 months</div>
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <AreaChart data={refData} margin={{top:0,right:0,left:-25,bottom:0}}>
                  <defs>
                    <linearGradient id="bgg1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.blueL} stopOpacity={.15}/><stop offset="95%" stopColor={C.blueL} stopOpacity={0}/></linearGradient>
                    <linearGradient id="bgg2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.green} stopOpacity={.1}/><stop offset="95%" stopColor={C.green} stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
                  <XAxis dataKey="m" tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}k`}/>
                  <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
                  <Area type="monotone" dataKey="v1" stroke={C.blueL} fill="url(#bgg1)" strokeWidth={2} name={d1}/>
                  <Area type="monotone" dataKey="v2" stroke={C.green} fill="url(#bgg2)" strokeWidth={2} name={d2}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card" style={{ overflow:"hidden" }}>
            <div style={{ padding:"13px 18px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", gap:4 }}>
                <span style={{ color:C.textDim, fontSize:12.5 }}>Prospects for:</span>
                <input defaultValue={d1} style={{ border:"none", outline:"none", color:C.blueL, fontSize:12.5, fontWeight:600, fontFamily:"inherit", width:120 }}/>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                {["Best","Strong","Prospect","Untried","All"].map((t,i) => (
                  <button key={t} onClick={() => setFilterTab(t)} style={{ padding:"4px 10px", borderRadius:6, border:"none", cursor:"pointer", fontSize:11, fontWeight:filterTab===t?700:500, fontFamily:"inherit", background:filterTab===t?C.blueL:"rgba(0,0,0,.05)", color:filterTab===t?"#fff":C.textDim }}>{t}</button>
                ))}
                <button style={{ padding:"5px 10px", border:`1px solid ${C.border}`, borderRadius:6, background:"transparent", cursor:"pointer", fontSize:11, color:C.textMid, fontFamily:"inherit" }}>Authority Score ∨</button>
                <button style={{ padding:"5px 10px", border:`1px solid ${C.border}`, borderRadius:6, background:"transparent", cursor:"pointer", fontSize:11, color:C.textMid, fontFamily:"inherit" }}>Advanced Filters</button>
                <button style={{ padding:"5px 12px", background:`${C.blueL}18`, border:`1px solid ${C.blueL}44`, borderRadius:6, cursor:"pointer", fontSize:11, fontWeight:700, color:C.blueL, fontFamily:"inherit" }}>EXPORT ↑</button>
                <button style={{ padding:"5px 12px", background:C.blueL, border:"none", borderRadius:6, cursor:"pointer", fontSize:11, fontWeight:700, color:"#fff", fontFamily:"inherit" }}>+ Start Outreach</button>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"2.5fr 1fr 1fr 1fr 80px 80px", padding:"8px 16px", background:C.bg, borderBottom:`1px solid ${C.border}`, gap:8 }}>
              {["NAME","AS","BACKLINKS","REF DOMAINS","FB","TW"].map(h => <div key={h} style={{ color:C.textDim, fontSize:9.5, fontWeight:700, letterSpacing:.4 }}>{h}</div>)}
            </div>
            {prospects.map((p,i) => (
              <div key={i} className="td" style={{ display:"grid", gridTemplateColumns:"2.5fr 1fr 1fr 1fr 80px 80px", padding:"11px 16px", borderBottom:i<prospects.length-1?`1px solid ${C.border}`:"none", alignItems:"start", gap:8 }}>
                <div>
                  <div style={{ color:C.blueL, fontSize:13, fontWeight:600, cursor:"pointer" }}>{p.name}</div>
                  <div style={{ color:C.textDim, fontSize:11 }}>{p.cat}</div>
                </div>
                <span style={{ color:C.text, fontWeight:700, fontSize:12 }}>{p.as}</span>
                <span style={{ color:C.textMid, fontSize:12 }}>{p.bl}</span>
                <span style={{ color:C.textMid, fontSize:12 }}>{p.ref}</span>
                <span style={{ color:C.textDim, fontSize:12 }}>{p.fb}</span>
                <span style={{ color:C.textDim, fontSize:12 }}>{p.tw}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Keyword Gap Screen (image-matched) ───────────────────────────────
function KeywordGapScreen() {
  const [d1, setD1] = useState("Webflow.com");
  const [d2, setD2] = useState("Wix.com");
  const [kwType, setKwType] = useState("organic");
  const [ran, setRan] = useState(false);
  const [sharedTab, setSharedTab] = useState("Shared 38,889");
  const gapKws = [
    {kw:"Designer",kd:"N",kd2:10,vol:"2500",cpc:"$0",cpm:50,serp:0,result:124},
    {kw:"Designer",kd:"F",kd2:20,vol:"2250",cpc:"$0",cpm:50,serp:0,result:122},
    {kw:"Designer",kd:"I T",kd2:85,vol:"140k",cpc:"$0",cpm:70,serp:0,result:131},
    {kw:"Designer",kd:"F",kd2:70,vol:"1200",cpc:"$0",cpm:70,serp:0,result:104},
    {kw:"Designer",kd:40,kd2:40,vol:"217000",cpc:"$0",cpm:22,serp:0,result:23},
    {kw:"Designer",kd:35,kd2:35,vol:"157084",cpc:"$0",cpm:77,serp:0,result:149},
    {kw:"Designer",kd:18,kd2:18,vol:"24461",cpc:"$0",cpm:180,serp:0,result:31},
  ];
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg }}>
      <div style={{ padding:"18px 28px 0", background:C.white, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:6 }}>
          <div>
            <h2 className="sg" style={{ color:C.text, fontSize:20, fontWeight:800, marginBottom:3 }}>Keyword Gap</h2>
            <p style={{ color:C.textDim, fontSize:13 }}>Compare keyword profiles to find untapped opportunities</p>
          </div>
          <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
            {["Database: All ∨","Device: Desktop ∨","Date: 12 Sep 2025 ∨","Currency: NGN"].map(b => (
              <button key={b} style={{ padding:"5px 10px", border:`1px solid ${C.border}`, borderRadius:6, background:"white", cursor:"pointer", fontSize:11, color:C.textMid, fontFamily:"inherit" }}>{b}</button>
            ))}
            <button style={{ padding:"5px 12px", background:C.blueL, border:"none", borderRadius:6, cursor:"pointer", fontSize:11, fontWeight:700, color:"#fff", fontFamily:"inherit" }}>Export to PDF</button>
          </div>
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:14 }}>
          {[["organic","Organic keywords"],["paid","Paid keywords"],["pla","PLA keywords"]].map(([v,l]) => (
            <button key={v} onClick={() => setKwType(v)} style={{ padding:"6px 14px", border:`1px solid ${kwType===v?C.blueL:C.border}`, borderRadius:20, cursor:"pointer", fontSize:12, fontWeight:kwType===v?700:500, color:kwType===v?C.blueL:C.textMid, background:kwType===v?C.bluePale:"white", fontFamily:"inherit" }}>{l}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"flex-end", marginBottom:16 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:6, flex:1 }}>
            <div style={{ display:"flex", gap:8 }}>
              <select style={{ padding:"8px 10px", border:`1px solid ${C.border}`, borderRadius:7, fontSize:12, fontFamily:"inherit", outline:"none", background:"white" }}><option>Root Domain</option></select>
              <input value={d1} onChange={e=>setD1(e.target.value)} style={{ flex:1, padding:"8px 12px", border:`1px solid ${C.border}`, borderRadius:7, fontSize:13, fontFamily:"inherit", outline:"none" }}/>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <select style={{ padding:"8px 10px", border:`1px solid ${C.border}`, borderRadius:7, fontSize:12, fontFamily:"inherit", outline:"none", background:"white" }}><option>Root Domain</option></select>
              <input value={d2} onChange={e=>setD2(e.target.value)} style={{ flex:1, padding:"8px 12px", border:`1px solid ${C.border}`, borderRadius:7, fontSize:13, fontFamily:"inherit", outline:"none" }}/>
            </div>
          </div>
          <button onClick={() => setRan(true)} style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"10px 24px", borderRadius:8, fontSize:13, fontWeight:700, fontFamily:"inherit" }}>Compare</button>
          {ran && <button onClick={() => setRan(false)} style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"10px 14px", borderRadius:8, fontSize:13, fontFamily:"inherit" }}>Cancel</button>}
          <button style={{ background:"transparent", border:"none", color:C.blueL, cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"inherit" }}>+ Add up to 3 competitors</button>
        </div>
      </div>

      {!ran ? (
        <div style={{ padding:"32px 28px" }}>
          <div className="card" style={{ padding:"28px 32px", marginBottom:20 }}>
            <h3 className="sg" style={{ color:C.text, fontSize:16, fontWeight:700, marginBottom:12 }}>Discover every detail about your and your competitors</h3>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
              <div>
                <div style={{ color:C.textDim, fontSize:11, fontWeight:700, marginBottom:8 }}>TREND</div>
                <div style={{ background:C.bg, borderRadius:10, padding:"14px", marginBottom:12 }}>
                  <p style={{ color:C.textDim, fontSize:12, marginBottom:8 }}>Search value of this keyword over one year</p>
                  <ResponsiveContainer width="100%" height={80}>
                    <BarChart data={[{v:30},{v:45},{v:40},{v:60},{v:55},{v:70},{v:65},{v:80},{v:75},{v:90},{v:85},{v:100}]} margin={{top:0,right:0,left:-30,bottom:0}}>
                      <Bar dataKey="v" fill={C.blueL} radius={[2,2,0,0]}/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div className="sg" style={{ color:C.text, fontSize:14, fontWeight:700, marginBottom:6 }}>Track Domain Keyword</div>
                  <p style={{ color:C.textMid, fontSize:12.5, lineHeight:1.6 }}>Evaluate the link profile of a site or page URL. Compare keyword rankings and find opportunities.</p>
                </div>
              </div>
              <div>
                <div className="sg" style={{ color:C.text, fontSize:14, fontWeight:700, marginBottom:8 }}>See Top Pages and Other charted rankings</div>
                <p style={{ color:C.textMid, fontSize:12.5, lineHeight:1.6, marginBottom:16 }}>Get detailed insights on top ranking pages and keyword difficulty for each domain you compare.</p>
                <div style={{ background:C.bg, borderRadius:10, padding:"16px", textAlign:"center" }}>
                  <div style={{ color:C.textDim, fontSize:11, fontWeight:700, marginBottom:8 }}>KEYWORD DIFFICULTY</div>
                  <div className="sg" style={{ color:C.red, fontSize:32, fontWeight:900 }}>100%</div>
                  <div style={{ color:C.red, fontSize:12 }}>Very Hard</div>
                  <div style={{ position:"relative", width:60, height:60, margin:"12px auto 0" }}>
                    <svg width={60} height={60} style={{ transform:"rotate(-90deg)" }}>
                      <circle cx={30} cy={30} r={24} fill="none" stroke="#E2E8F0" strokeWidth={8}/>
                      <circle cx={30} cy={30} r={24} fill="none" stroke={C.red} strokeWidth={8} strokeDasharray={`${2*Math.PI*24} ${2*Math.PI*24}`} strokeDashoffset={0}/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding:"20px 28px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:16, marginBottom:20 }}>
            <div className="card" style={{ padding:"18px 20px" }}>
              <div style={{ fontWeight:700, color:C.text, fontSize:14, marginBottom:14 }}>Keyword Overlap</div>
              <div style={{ display:"flex", gap:16, alignItems:"center", justifyContent:"center" }}>
                <svg width={240} height={130} viewBox="0 0 240 130">
                  <circle cx={90} cy={65} r={60} fill={C.blueL} fillOpacity="0.2" stroke={C.blueL} strokeWidth="1.5"/>
                  <circle cx={155} cy={65} r={60} fill={C.green} fillOpacity="0.15" stroke={C.green} strokeWidth="1.5"/>
                  <text x={70} y={55} fill={C.blueL} fontSize="10" fontWeight="700" textAnchor="middle">{d1}</text>
                  <text x={70} y={68} fill={C.blueL} fontSize="9" textAnchor="middle">48,292</text>
                  <text x={122} y={60} fill="#555" fontSize="9" textAnchor="middle">Shared</text>
                  <text x={122} y={72} fill="#555" fontSize="9" textAnchor="middle">12,738</text>
                  <text x={175} y={55} fill={C.green} fontSize="10" fontWeight="700" textAnchor="middle">{d2}</text>
                  <text x={175} y={68} fill={C.green} fontSize="9" textAnchor="middle">76,544</text>
                </svg>
              </div>
              <div style={{ display:"flex", gap:16, marginTop:12, justifyContent:"center" }}>
                <div style={{ display:"flex", gap:5, alignItems:"center" }}><div style={{ width:10,height:10,borderRadius:"50%",background:C.blueL }}/><span style={{ fontSize:11,color:C.textMid }}>{d1}</span></div>
                <div style={{ display:"flex", gap:5, alignItems:"center" }}><div style={{ width:10,height:10,borderRadius:"50%",background:C.green }}/><span style={{ fontSize:11,color:C.textMid }}>{d2}</span></div>
              </div>
            </div>
            <div className="card" style={{ padding:"16px 18px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <div style={{ fontWeight:700, color:C.text, fontSize:14 }}>Top Opportunities</div>
                <div style={{ display:"flex", gap:6 }}>
                  <span className="chip" style={{ color:"#fff", background:C.orange }}>New</span>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4, marginBottom:8 }}>
                <span style={{ color:C.textDim, fontSize:10, fontWeight:700 }}>KEYWORD</span>
                <span style={{ color:C.textDim, fontSize:10, fontWeight:700, textAlign:"right" }}>VOLUME</span>
              </div>
              {[{kw:"Easy >>",v:"16,000,000"},{kw:"a >>",v:"7,400,000"},{kw:"b >>",v:"680,000"}].map((o,i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ color:C.blueL, fontSize:12.5, cursor:"pointer" }}>{o.kw}</span>
                  <span style={{ color:C.text, fontSize:12.5 }}>{o.v}</span>
                </div>
              ))}
              <button style={{ width:"100%", marginTop:12, padding:"8px", background:C.blueL, color:"#fff", border:"none", cursor:"pointer", borderRadius:8, fontSize:12, fontWeight:700, fontFamily:"inherit" }}>View details</button>
            </div>
          </div>

          <div className="card" style={{ overflow:"hidden" }}>
            <div style={{ padding:"12px 18px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
              <div style={{ display:"flex", gap:4 }}>
                {["Shared 38,889","Missing 9,409","Weak 14,389","Strong 12,889","Untapped 1,889","All 238,100"].map((t,i) => (
                  <button key={t} onClick={() => setSharedTab(t)} style={{ padding:"4px 10px", borderRadius:6, border:"none", cursor:"pointer", fontSize:10.5, fontWeight:sharedTab===t?700:500, fontFamily:"inherit", background:sharedTab===t?C.blueL:"rgba(0,0,0,.05)", color:sharedTab===t?"#fff":C.textDim }}>{t}</button>
                ))}
              </div>
              <div style={{ display:"flex", gap:6 }}>
                <span style={{ color:C.textDim, fontSize:12 }}>All keyword details for:</span>
                <span style={{ color:C.blueL, fontSize:12, fontWeight:700 }}>{d1}</span>
                <button style={{ padding:"4px 10px", border:`1px solid ${C.border}`, borderRadius:6, background:"transparent", cursor:"pointer", fontSize:11, color:C.textMid, fontFamily:"inherit" }}>Filter by Keyword</button>
                <button style={{ padding:"4px 12px", background:`${C.blueL}18`, border:`1px solid ${C.blueL}44`, borderRadius:6, cursor:"pointer", fontSize:11, fontWeight:700, color:C.blueL, fontFamily:"inherit" }}>EXPORT ↑</button>
                <button style={{ padding:"4px 12px", background:C.blueL, border:"none", borderRadius:6, cursor:"pointer", fontSize:11, fontWeight:700, color:"#fff", fontFamily:"inherit" }}>+ Add to keyword list</button>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"2.2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", padding:"8px 14px", background:C.bg, borderBottom:`1px solid ${C.border}`, gap:6 }}>
              {["Keyword","KD","KD+","Volume","CPC","CPM","SERP","Result"].map(h => <div key={h} style={{ color:C.textDim, fontSize:9.5, fontWeight:700, letterSpacing:.4 }}>{h.toUpperCase()}</div>)}
            </div>
            {gapKws.map((row,i) => (
              <div key={i} className="td" style={{ display:"grid", gridTemplateColumns:"2.2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", padding:"10px 14px", borderBottom:i<gapKws.length-1?`1px solid ${C.border}`:"none", alignItems:"center", gap:6 }}>
                <span style={{ color:C.blueL, fontSize:13, fontWeight:600, cursor:"pointer" }}>{row.kw}</span>
                <div><span style={{ background:typeof row.kd==="number"?row.kd<40?C.greenL:row.kd<70?C.yellowL:C.redL:C.bluePale, color:typeof row.kd==="number"?row.kd<40?C.green:row.kd<70?C.yellow:C.red:C.blueL, fontSize:10, fontWeight:700, padding:"2px 6px", borderRadius:4 }}>{row.kd}</span></div>
                <span style={{ color:C.textMid, fontSize:12 }}>{row.kd2}</span>
                <span style={{ color:C.text, fontWeight:700, fontSize:12 }}>{row.vol}</span>
                <span style={{ color:C.textMid, fontSize:12 }}>{row.cpc}</span>
                <span style={{ color:C.textMid, fontSize:12 }}>${row.cpm}</span>
                <span style={{ color:C.textMid, fontSize:12 }}>{row.serp}</span>
                <span style={{ color:C.textMid, fontSize:12 }}>{row.result}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── AI Suggestions Screen ─────────────────────────────────────────────
function AISuggestions() {
  const [dismissed, setDismissed] = useState([]);
  const critical = [
    {id:1, t:"47 pages missing meta descriptions — Fix all for +15% CTR", detail:"Pages without meta descriptions lose significant click-through rate in search results."},
    {id:2, t:"12 broken internal links causing crawl budget waste", detail:"Broken links prevent search engines from properly indexing your content."},
    {id:3, t:"Homepage load time is 4.2s — Target under 2s for ranking boost", detail:"Page speed is a confirmed Google ranking factor. Slow pages lose rankings."},
  ];
  const improvements = [
    {t:"Add FAQ schema to your top 10 pages",impact:"+12% CTR",effort:"Low",c:C.green,icon:"🎯"},
    {t:"Target 'web design tools' keyword — KD: 38, Vol: 8.1K/mo",impact:"+8.1K traffic/mo",effort:"Med",c:C.blueL,icon:"🔑"},
    {t:"Improve content depth on /blog/seo-guide (1,200 words, target 2,500+)",impact:"+3 positions",effort:"High",c:C.orange,icon:"✍️"},
    {t:"Build 5 links from design industry directories",impact:"+DA 4pts",effort:"Med",c:C.purple,icon:"🔗"},
    {t:"Compress 85 unoptimized images — save 2.3MB",impact:"-1.2s load time",effort:"Low",c:C.green,icon:"🖼️"},
    {t:"Add alt text to 48 images for accessibility + SEO",impact:"+A11y score",effort:"Low",c:C.blueL,icon:"♿"},
  ];
  const contentInsights = ["dental implants","seo tools","near me","local dentist","implant cost","best seo","web design","2026","agency","content strategy","keyword research","rank tracker"];
  const stats = [{l:"Critical Issues",v:critical.filter(c=>!dismissed.includes(c.id)).length,c:C.red},{l:"Improvements",v:improvements.length,c:C.orange},{l:"AI Actions Taken",v:23,c:C.green},{l:"Est. Traffic Gain",v:"+4.2K/mo",c:C.blueL}];
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, padding:"20px 24px 0" }}>
        {stats.map(({l,v,c}) => (
          <div key={l} className="card ch" style={{ padding:"14px 18px" }}>
            <div className="sg" style={{ color:c, fontSize:22, fontWeight:800 }}>{v}</div>
            <div style={{ color:C.textDim, fontSize:11, marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ padding:"16px 24px" }}>
        {critical.filter(c=>!dismissed.includes(c.id)).length > 0 && (
          <div style={{ background:`${C.red}10`, border:`1px solid ${C.red}30`, borderRadius:14, padding:"18px 22px", marginBottom:16 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <AlertCircle size={16} color={C.red}/>
                <div className="sg" style={{ color:C.red, fontSize:15, fontWeight:700 }}>Critical Issues ({critical.filter(c=>!dismissed.includes(c.id)).length})</div>
              </div>
              <button style={{ background:C.red, color:"#fff", border:"none", cursor:"pointer", padding:"7px 16px", borderRadius:8, fontSize:12, fontWeight:700, fontFamily:"inherit" }}>Fix All Now</button>
            </div>
            {critical.filter(c=>!dismissed.includes(c.id)).map(({id,t,detail}) => (
              <div key={id} style={{ background:"rgba(255,255,255,.7)", borderRadius:9, padding:"12px 14px", marginBottom:9, display:"flex", alignItems:"flex-start", gap:12 }}>
                <div style={{ width:7,height:7,borderRadius:"50%",background:C.red,flexShrink:0,marginTop:4 }}/>
                <div style={{ flex:1 }}>
                  <div style={{ color:C.text, fontSize:13, fontWeight:600, marginBottom:3 }}>{t}</div>
                  <div style={{ color:C.textDim, fontSize:11.5 }}>{detail}</div>
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  <button style={{ padding:"4px 10px", background:C.blueL, color:"#fff", border:"none", cursor:"pointer", borderRadius:6, fontSize:11, fontWeight:700, fontFamily:"inherit" }}>Fix</button>
                  <button onClick={() => setDismissed(d=>[...d,id])} style={{ background:"none", border:"none", cursor:"pointer" }}><X size={13} color={C.textDim}/></button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="sg" style={{ color:C.text, fontSize:14, fontWeight:700, marginBottom:12 }}>Improvement Opportunities</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
          {improvements.map(({t,impact,effort,c,icon},i) => (
            <div key={i} className="card" style={{ padding:"14px 16px", borderLeft:`3px solid ${c}` }}>
              <div style={{ display:"flex", gap:10, marginBottom:8 }}>
                <span style={{ fontSize:20 }}>{icon}</span>
                <div style={{ flex:1 }}>
                  <p style={{ color:C.text, fontSize:12.5, lineHeight:1.5, marginBottom:6 }}>{t}</p>
                  <div style={{ display:"flex", gap:6 }}>
                    <span className="chip" style={{ color:C.green, background:C.greenL }}>{impact}</span>
                    <span className="chip" style={{ color:effort==="Low"?C.green:effort==="Med"?C.yellow:C.orange, background:effort==="Low"?C.greenL:effort==="Med"?C.yellowL:`${C.orange}20` }}>Effort: {effort}</span>
                  </div>
                </div>
              </div>
              <button style={{ width:"100%", padding:"7px", background:`${c}18`, border:`1px solid ${c}30`, color:c, borderRadius:7, cursor:"pointer", fontSize:11, fontWeight:700, fontFamily:"inherit" }}>Apply Suggestion</button>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding:"16px 20px" }}>
          <div className="sg" style={{ color:C.text, fontSize:13, fontWeight:700, marginBottom:10 }}>Content Insights — High-Value Keywords to Target</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {contentInsights.map((kw,i) => (
              <span key={kw} className="chip" style={{ color:[C.blueL,C.orange,C.green,C.purple][i%4], background:[C.bluePale,C.orangeL,C.greenL,`${C.purple}18`][i%4], fontSize:12, padding:"4px 10px" }}>{kw}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SEO Assistant Screen ──────────────────────────────────────────────
function SEOAssistant() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([
    {role:"ai",text:"👋 I'm your SEO Assistant! I can help with content strategy, keyword research, competitor analysis, technical fixes, and much more. What would you like to optimize today?"},
    {role:"user",text:"How can I improve my homepage ranking for 'dental implants near me'?"},
    {role:"ai",text:"Great question! Here's a targeted strategy for ranking 'dental implants near me':\n\n**1. On-Page Optimization**\n• Add the phrase to your H1, first paragraph, and meta description\n• Create a dedicated service page for each location you serve\n\n**2. Local SEO**\n• Optimize your Google My Business with complete NAP information\n• Get reviews mentioning 'dental implants' from patients\n\n**3. Content Gap**\n• Write a comprehensive guide: 'How Much Do Dental Implants Cost Near You' (8,200/mo searches, KD: 28)\n\n**4. Technical**\n• Add LocalBusiness schema markup\n• Ensure your site loads under 3 seconds on mobile\n\nWant me to run a detailed audit on your current page?"},
  ]);
  const chips = ["Analyze my competitors","Find keyword gaps","Generate meta descriptions","Fix my audit issues","Content ideas for SEO","Build a link strategy","On-page optimization tips"];
  const send = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMsgs(m => [...m, {role:"user",text:userMsg}]);
    setInput("");
    setTimeout(() => {
      setMsgs(m => [...m, {role:"ai",text:`Analyzing your question about **"${userMsg}"**...\n\nBased on your site data and current SEO landscape, here are my top 3 recommendations tailored to your specific situation. Would you like me to dive deeper into any of these?`}]);
    }, 800);
  };
  return (
    <div className="fade" style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 57px)", overflow:"hidden" }}>
      <div style={{ padding:"10px 20px", borderBottom:`1px solid ${C.border}`, background:`linear-gradient(135deg,${C.blue},${C.blueL})`, flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:32,height:32,borderRadius:9,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center" }}><Bot size={16} color="#fff"/></div>
          <div>
            <div className="sg" style={{ color:"#fff", fontSize:14, fontWeight:700 }}>Boostly SEO Assistant</div>
            <div style={{ color:"rgba(255,255,255,.7)", fontSize:10.5 }}>AI-powered · Always learning from your data · Instant answers</div>
          </div>
          <span style={{ marginLeft:"auto", background:"rgba(255,255,255,.15)", color:"rgba(255,255,255,.9)", fontSize:9.5, fontWeight:700, padding:"3px 9px", borderRadius:10 }}>LIVE</span>
        </div>
      </div>

      <div style={{ display:"flex", gap:8, padding:"10px 20px", background:C.bg, borderBottom:`1px solid ${C.border}`, flexShrink:0, overflowX:"auto" }}>
        {chips.map(c => (
          <button key={c} onClick={() => setInput(c)} style={{ background:C.white, border:`1px solid ${C.border}`, color:C.blueL, cursor:"pointer", padding:"5px 12px", borderRadius:20, fontSize:11.5, fontWeight:600, whiteSpace:"nowrap", fontFamily:"inherit" }}>{c}</button>
        ))}
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"18px 20px", display:"flex", flexDirection:"column", gap:14, background:C.bg }}>
        {msgs.map(({role,text},i) => (
          <div key={i} style={{ display:"flex", flexDirection:role==="user"?"row-reverse":"row", gap:9 }}>
            {role==="ai" && (
              <div style={{ width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,${C.blue},${C.blueL})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2 }}>
                <Bot size={13} color="#fff"/>
              </div>
            )}
            <div style={{ maxWidth:"78%", padding:"11px 14px", borderRadius:role==="user"?"13px 13px 3px 13px":"3px 13px 13px 13px", background:role==="user"?C.blueL:C.white, color:role==="user"?"#fff":C.text, fontSize:13, lineHeight:1.65, border:role==="ai"?`1px solid ${C.border}`:"none", boxShadow:role==="ai"?"0 1px 4px rgba(0,0,0,.05)":"none", whiteSpace:"pre-line" }}>
              {text}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding:"10px 18px 16px", borderTop:`1px solid ${C.border}`, background:C.white, flexShrink:0 }}>
        <div style={{ display:"flex", gap:8, background:C.bg, border:`1px solid ${C.border}`, borderRadius:12, padding:"8px 12px" }}>
          {[Paperclip,Image,Link2,AtSign].map((Icon,j) => (
            <button key={j} style={{ background:"none",border:"none",cursor:"pointer" }}><Icon size={14} color={C.textDim}/></button>
          ))}
          <div style={{ width:1,height:18,background:C.border,margin:"2px 4px" }}/>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()} placeholder="Ask your SEO Assistant anything..." style={{ flex:1,background:"transparent",border:"none",outline:"none",color:C.text,fontSize:13,fontFamily:"inherit" }}/>
          <button onClick={send} style={{ background:`linear-gradient(135deg,${C.blueL},${C.blue})`,color:"#fff",border:"none",cursor:"pointer",padding:"7px 16px",borderRadius:9,display:"flex",alignItems:"center",gap:5,fontSize:12,fontWeight:700,fontFamily:"inherit" }}>
            <Send size={12}/> Send
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Admin Dashboard Screen ────────────────────────────────────────────
function AdminDashboard({ onNavigate }) {
  const revData = [
    {m:"Jan",v:28000},{m:"Feb",v:32000},{m:"Mar",v:35000},{m:"Apr",v:38000},{m:"May",v:42000},{m:"Jun",v:45000}
  ];
  const recentUsers = [
    {name:"Ahmed Al-Rashid",email:"ahmed@company.com",plan:"Pro",joined:"May 8",rev:"$79"},
    {name:"Sarah Kim",email:"sarah@agency.io",plan:"Agency",joined:"May 7",rev:"$199"},
    {name:"James Park",email:"james@startup.com",plan:"Starter",joined:"May 6",rev:"$29"},
    {name:"Lena Garcia",email:"lena@design.co",plan:"Pro",joined:"May 5",rev:"$79"},
  ];
  const planColor = {Pro:C.orange,Agency:C.purple,Starter:C.blueL};
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, padding:"20px 24px 0" }}>
        {[{l:"Total Users",v:"1,284",chg:"+84 this month",c:C.blueL,icon:Users},{l:"Active Subscriptions",v:"842",chg:"65.6% of users",c:C.green,icon:CheckCircle2},{l:"Monthly Revenue",v:"$48,920",chg:"+18.4% vs last mo.",c:C.orange,icon:Activity},{l:"Churn Rate",v:"2.4%",chg:"-0.8% vs last mo.",c:C.red,icon:TrendingDown}].map(({l,v,chg,c,icon:Icon}) => (
          <div key={l} className="card ch" style={{ padding:"16px 18px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
              <div style={{ width:34,height:34,borderRadius:9,background:`${c}18`,display:"flex",alignItems:"center",justifyContent:"center" }}><Icon size={14} color={c}/></div>
              <span className="chip" style={{ color:c.includes(C.red)?C.red:C.green, background:c.includes(C.red)?C.redL:C.greenL, fontSize:9.5 }}>{chg}</span>
            </div>
            <div className="sg" style={{ color:C.text, fontSize:22, fontWeight:800 }}>{v}</div>
            <div style={{ color:C.textDim, fontSize:11, marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ padding:"16px 24px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:16, marginBottom:16 }}>
          <div className="card" style={{ padding:"18px 22px" }}>
            <div className="sg" style={{ color:C.text, fontSize:14, fontWeight:700, marginBottom:14 }}>Monthly Revenue</div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={revData} margin={{top:0,right:0,left:-22,bottom:0}}>
                <defs><linearGradient id="adg1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.green} stopOpacity={.2}/><stop offset="95%" stopColor={C.green} stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
                <XAxis dataKey="m" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false} tickFormatter={v=>`$${v/1000}k`}/>
                <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
                <Area type="monotone" dataKey="v" stroke={C.green} fill="url(#adg1)" strokeWidth={2.5} name="Revenue"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="card" style={{ padding:"16px 18px" }}>
            <div className="sg" style={{ color:C.text, fontSize:13, fontWeight:700, marginBottom:12 }}>Quick Actions</div>
            {[{l:"User Management",ic:"usermanagement",icon:Users,c:C.blueL},{l:"Payment Logs",ic:"paymentlogs",icon:Activity,c:C.green},{l:"NLP Analytics",ic:"nlpanalytics",icon:BarChart2,c:C.purple},{l:"Push Notifications",ic:"pushnotifications",icon:Bell,c:C.orange}].map(({l,ic,icon:Icon,c}) => (
              <div key={l} onClick={() => onNavigate && onNavigate(ic)} className="hl" style={{ display:"flex", alignItems:"center", gap:9, padding:"9px 8px", borderRadius:8, cursor:"pointer", marginBottom:4 }}>
                <div style={{ width:30,height:30,borderRadius:8,background:`${c}18`,display:"flex",alignItems:"center",justifyContent:"center" }}><Icon size={13} color={c}/></div>
                <span style={{ color:C.text, fontSize:13, fontWeight:600 }}>{l}</span>
                <ChevronRight size={12} color={C.textDim} style={{ marginLeft:"auto" }}/>
              </div>
            ))}
            <div style={{ marginTop:12, paddingTop:12, borderTop:`1px solid ${C.border}` }}>
              {[{l:"Plans (3 active)",v:"Starter · Pro · Agency"},{l:"Trial Users",v:"346 users in trial"},{l:"Avg. Revenue/User",v:"$58.1/month"}].map(({l,v}) => (
                <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0" }}>
                  <span style={{ color:C.textDim, fontSize:11 }}>{l}</span>
                  <span style={{ color:C.text, fontSize:11, fontWeight:600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card" style={{ overflow:"hidden" }}>
          <div style={{ padding:"13px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div className="sg" style={{ color:C.text, fontSize:13, fontWeight:700 }}>Recent Sign-ups</div>
            <button onClick={() => onNavigate && onNavigate("usermanagement")} style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.blueL, cursor:"pointer", padding:"5px 12px", borderRadius:7, fontSize:11, fontFamily:"inherit" }}>View All →</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 2fr 1fr 1fr 1fr", padding:"8px 20px", background:C.bg, borderBottom:`1px solid ${C.border}` }}>
            {["Name","Email","Plan","Joined","Revenue"].map(h => <div key={h} style={{ color:C.textDim, fontSize:10.5, fontWeight:700, letterSpacing:.4 }}>{h.toUpperCase()}</div>)}
          </div>
          {recentUsers.map(({name,email,plan,joined,rev},i) => (
            <div key={i} className="td" style={{ display:"grid", gridTemplateColumns:"2fr 2fr 1fr 1fr 1fr", padding:"11px 20px", borderBottom:i<recentUsers.length-1?`1px solid ${C.border}`:"none", alignItems:"center" }}>
              <div style={{ display:"flex", gap:8 }}><Av l={name[0]} size={28}/><span style={{ color:C.text, fontSize:13, fontWeight:600, alignSelf:"center" }}>{name}</span></div>
              <span style={{ color:C.textDim, fontSize:12.5 }}>{email}</span>
              <span className="chip" style={{ color:planColor[plan]||C.textMid, background:`${planColor[plan]||C.textMid}18` }}>{plan}</span>
              <span style={{ color:C.textDim, fontSize:12 }}>{joined}</span>
              <span style={{ color:C.green, fontWeight:700, fontSize:13 }}>{rev}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── User Management Screen ────────────────────────────────────────────
function UserManagement() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("All");
  const allUsers = [
    {name:"Ahmed Al-Rashid",email:"ahmed@company.com",plan:"Pro",status:"Active",joined:"Jan 12",rev:"$79",kw:124,sessions:48},
    {name:"Sarah Kim",email:"sarah@agency.io",plan:"Agency",status:"Active",joined:"Feb 3",rev:"$199",kw:580,sessions:112},
    {name:"James Park",email:"james@startup.com",plan:"Starter",status:"Active",joined:"Mar 18",rev:"$29",kw:45,sessions:23},
    {name:"Lena Garcia",email:"lena@design.co",plan:"Pro",status:"Churned",joined:"Nov 8",rev:"$0",kw:0,sessions:0},
    {name:"Mike Johnson",email:"mike@seo.agency",plan:"Agency",status:"Trial",joined:"May 1",rev:"$0",kw:0,sessions:12},
    {name:"Lisa Chen",email:"lisa@brand.co",plan:"Pro",status:"Active",joined:"Apr 20",rev:"$79",kw:98,sessions:67},
    {name:"Tom Roberts",email:"tom@consulting.com",plan:"Starter",status:"Active",joined:"Apr 5",rev:"$29",kw:32,sessions:18},
  ];
  const planColor = {Pro:C.orange,Agency:C.purple,Starter:C.blueL};
  const statColor = {Active:C.green,Churned:C.red,Trial:C.yellow};
  const filtered = allUsers.filter(u => {
    const ms = search===""||u.name.toLowerCase().includes(search.toLowerCase())||u.email.toLowerCase().includes(search.toLowerCase());
    const mp = planFilter==="All"||u.plan===planFilter;
    return ms && mp;
  });
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, padding:"20px 24px 0" }}>
        {[{l:"Total Users",v:allUsers.length},{l:"Active",v:allUsers.filter(u=>u.status==="Active").length},{l:"Trial",v:allUsers.filter(u=>u.status==="Trial").length},{l:"Churned",v:allUsers.filter(u=>u.status==="Churned").length}].map(({l,v},i) => (
          <div key={l} className="card" style={{ padding:"14px 18px" }}>
            <div className="sg" style={{ color:[C.blueL,C.green,C.yellow,C.red][i], fontSize:24, fontWeight:800 }}>{v}</div>
            <div style={{ color:C.textDim, fontSize:11, marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ padding:"16px 24px" }}>
        <div style={{ display:"flex", gap:10, marginBottom:16 }}>
          <div style={{ flex:1, display:"flex", alignItems:"center", gap:7, background:C.white, border:`1px solid ${C.border}`, borderRadius:9, padding:"7px 12px" }}>
            <Search size={13} color={C.textDim}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search users..." style={{ flex:1,border:"none",outline:"none",fontSize:13,color:C.text,fontFamily:"inherit" }}/>
          </div>
          <div style={{ display:"flex", gap:6 }}>
            {["All","Pro","Agency","Starter"].map(p => (
              <button key={p} onClick={() => setPlanFilter(p)} style={{ padding:"7px 14px", borderRadius:8, border:"none", cursor:"pointer", fontSize:12, fontWeight:planFilter===p?700:500, fontFamily:"inherit", background:planFilter===p?C.blueL:"rgba(0,0,0,.05)", color:planFilter===p?"#fff":C.textDim }}>{p}</button>
            ))}
          </div>
          <button style={{ background:C.orange, color:"#fff", border:"none", cursor:"pointer", padding:"7px 16px", borderRadius:8, fontSize:12, fontWeight:700, fontFamily:"inherit" }}>+ Add User</button>
          <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"7px 14px", borderRadius:8, fontSize:12, fontFamily:"inherit" }}>Export CSV</button>
        </div>
        <div className="card" style={{ overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 2fr 1fr 1fr 1fr 1fr 1fr 100px", padding:"9px 18px", background:C.bg, borderBottom:`1px solid ${C.border}`, gap:8 }}>
            {["Name","Email","Plan","Status","Joined","Revenue","Sessions","Actions"].map(h => <div key={h} style={{ color:C.textDim, fontSize:9.5, fontWeight:700, letterSpacing:.4 }}>{h.toUpperCase()}</div>)}
          </div>
          {filtered.map(({name,email,plan,status,joined,rev,kw,sessions},i) => (
            <div key={name} className="td" style={{ display:"grid", gridTemplateColumns:"2fr 2fr 1fr 1fr 1fr 1fr 1fr 100px", padding:"11px 18px", borderBottom:i<filtered.length-1?`1px solid ${C.border}`:"none", alignItems:"center", gap:8 }}>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}><Av l={name[0]} size={28}/><span style={{ color:C.text, fontSize:12.5, fontWeight:600 }}>{name}</span></div>
              <span style={{ color:C.textDim, fontSize:11.5 }}>{email}</span>
              <span className="chip" style={{ color:planColor[plan]||C.textMid, background:`${planColor[plan]||C.textMid}18` }}>{plan}</span>
              <span className="chip" style={{ color:statColor[status]||C.textMid, background:`${statColor[status]||C.textMid}18` }}>{status}</span>
              <span style={{ color:C.textDim, fontSize:12 }}>{joined}</span>
              <span style={{ color:rev==="$0"?C.textDim:C.green, fontWeight:700, fontSize:12 }}>{rev}</span>
              <span style={{ color:C.textMid, fontSize:12 }}>{sessions}</span>
              <div style={{ display:"flex", gap:4 }}>
                <button style={{ padding:"4px 8px", background:C.bgLight, border:`1px solid ${C.border}`, borderRadius:5, cursor:"pointer", fontSize:10, fontWeight:600, color:C.blueL, fontFamily:"inherit" }}>Edit</button>
                <button style={{ padding:"4px 8px", background:C.redL, border:`1px solid ${C.red}30`, borderRadius:5, cursor:"pointer", fontSize:10, fontWeight:600, color:C.red, fontFamily:"inherit" }}>Ban</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Payment Logs Screen ───────────────────────────────────────────────
function PaymentLogs() {
  const logs = [
    {user:"Ahmed Al-Rashid",plan:"Pro",amount:"$79.00",date:"May 1, 2026",status:"Success",method:"Visa ****4242",txId:"txn_1NxABC"},
    {user:"Sarah Kim",plan:"Agency",amount:"$199.00",date:"May 1, 2026",status:"Success",method:"Mastercard ****8820",txId:"txn_1NxDEF"},
    {user:"Lena Garcia",plan:"Pro",amount:"$79.00",date:"Apr 1, 2026",status:"Failed",method:"Visa ****1122",txId:"txn_1NxGHI"},
    {user:"James Park",plan:"Starter",amount:"$29.00",date:"May 1, 2026",status:"Success",method:"PayPal",txId:"txn_1NxJKL"},
    {user:"Mike Johnson",plan:"Agency",amount:"$199.00",date:"Apr 28, 2026",status:"Refunded",method:"Visa ****3388",txId:"txn_1NxMNO"},
    {user:"Lisa Chen",plan:"Pro",amount:"$79.00",date:"Apr 20, 2026",status:"Success",method:"Amex ****2021",txId:"txn_1NxPQR"},
  ];
  const statColor = {Success:C.green,Failed:C.red,Refunded:C.yellow};
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, padding:"20px 24px 0" }}>
        {[{l:"Total Revenue (May)",v:"$48,920",c:C.green},{l:"Transactions",v:"284",c:C.blueL},{l:"Failed Payments",v:"12",c:C.red},{l:"Refunds",v:"3",c:C.yellow}].map(({l,v,c}) => (
          <div key={l} className="card ch" style={{ padding:"14px 18px" }}>
            <div className="sg" style={{ color:c, fontSize:22, fontWeight:800 }}>{v}</div>
            <div style={{ color:C.textDim, fontSize:11, marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ padding:"16px 24px" }}>
        <div style={{ display:"flex", gap:10, marginBottom:14 }}>
          {["All Status","Success","Failed","Refunded"].map((f,i) => (
            <button key={f} style={{ padding:"6px 14px", borderRadius:8, border:"none", cursor:"pointer", fontSize:12, fontWeight:i===0?700:500, fontFamily:"inherit", background:i===0?C.blueL:"rgba(0,0,0,.05)", color:i===0?"#fff":C.textMid }}>{f}</button>
          ))}
          <button style={{ marginLeft:"auto", padding:"6px 14px", background:C.green, color:"#fff", border:"none", cursor:"pointer", borderRadius:8, fontSize:12, fontWeight:700, fontFamily:"inherit" }}>Export Report</button>
        </div>
        <div className="card" style={{ overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1.2fr 1fr 1.5fr 1fr", padding:"9px 18px", background:C.bg, borderBottom:`1px solid ${C.border}`, gap:8 }}>
            {["User","Plan","Amount","Date","Status","Method","Tx ID"].map(h => <div key={h} style={{ color:C.textDim, fontSize:9.5, fontWeight:700, letterSpacing:.4 }}>{h.toUpperCase()}</div>)}
          </div>
          {logs.map(({user,plan,amount,date,status,method,txId},i) => (
            <div key={i} className="td" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1.2fr 1fr 1.5fr 1fr", padding:"12px 18px", borderBottom:i<logs.length-1?`1px solid ${C.border}`:"none", alignItems:"center", gap:8 }}>
              <div style={{ display:"flex", gap:7, alignItems:"center" }}><Av l={user[0]} size={24}/><span style={{ color:C.text, fontSize:12.5, fontWeight:600 }}>{user}</span></div>
              <span style={{ color:C.textMid, fontSize:12 }}>{plan}</span>
              <span style={{ color:C.green, fontWeight:700, fontSize:13 }}>{amount}</span>
              <span style={{ color:C.textDim, fontSize:12 }}>{date}</span>
              <span className="chip" style={{ color:statColor[status], background:`${statColor[status]}18` }}>{status}</span>
              <span style={{ color:C.textDim, fontSize:11.5 }}>{method}</span>
              <span style={{ color:C.textDim, fontSize:10.5, fontFamily:"monospace" }}>{txId}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── NLP Analytics Screen ──────────────────────────────────────────────
function NLPAnalytics() {
  const intentData = [{name:"Informational",v:45,c:C.blueL},{name:"Transactional",v:28,c:C.orange},{name:"Navigational",v:18,c:C.green},{name:"Commercial",v:9,c:C.purple}];
  const entities = [{e:"Webflow",type:"Brand",count:1240},{e:"SEO Tools",type:"Topic",count:890},{e:"Backlinks",type:"Concept",count:654},{e:"Google",type:"Brand",count:580},{e:"Keywords",type:"Concept",count:430},{e:"Rankings",type:"Topic",count:320}];
  const topQueries = [{q:"best seo tools 2025",cnt:284},{q:"how to improve ranking",cnt:198},{q:"backlink checker free",cnt:167},{q:"keyword research tips",cnt:145},{q:"site audit tool",cnt:128}];
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", padding:"20px 24px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
        {[{l:"AI Queries Today",v:"1,247",c:C.blueL},{l:"Unique Intents",v:"34",c:C.orange},{l:"Avg Confidence",v:"94.2%",c:C.green},{l:"Flagged Queries",v:"12",c:C.red}].map(({l,v,c}) => (
          <div key={l} className="card ch" style={{ padding:"14px 18px" }}>
            <div className="sg" style={{ color:c, fontSize:22, fontWeight:800 }}>{v}</div>
            <div style={{ color:C.textDim, fontSize:11, marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
        <div className="card" style={{ padding:"18px 20px" }}>
          <div className="sg" style={{ color:C.text, fontSize:13, fontWeight:700, marginBottom:14 }}>Query Intent Distribution</div>
          <div style={{ display:"flex", alignItems:"center", gap:20 }}>
            <div>
              <svg width={130} height={130} viewBox="0 0 130 130">
                {(()=>{ let cum=0; const r=50,cx=65,cy=65,circ=2*Math.PI*r;
                  return intentData.map(({v,c:col},i)=>{ const sl=(v/100)*circ; const rot=(cum/100)*360-90; cum+=v;
                    return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={col} strokeWidth={24} strokeDasharray={`${sl} ${circ-sl}`} style={{transform:`rotate(${rot}deg)`,transformOrigin:`${cx}px ${cy}px`}}/>;
                  });
                })()}
                <circle cx={65} cy={65} r={38} fill="white"/>
                <text x={65} y={61} textAnchor="middle" style={{fontSize:16,fontWeight:800,fill:C.text,fontFamily:"Space Grotesk"}}>1,247</text>
                <text x={65} y={75} textAnchor="middle" style={{fontSize:9,fill:C.textDim}}>queries</text>
              </svg>
            </div>
            <div style={{ flex:1 }}>
              {intentData.map(({name,v,c:col}) => (
                <div key={name} style={{ display:"flex", alignItems:"center", gap:7, marginBottom:9 }}>
                  <div style={{ width:9,height:9,borderRadius:3,background:col,flexShrink:0 }}/>
                  <span style={{ color:C.textMid, fontSize:12, flex:1 }}>{name}</span>
                  <span style={{ color:C.text, fontWeight:700, fontSize:12 }}>{v}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card" style={{ overflow:"hidden" }}>
          <div style={{ padding:"12px 18px", borderBottom:`1px solid ${C.border}` }}>
            <div className="sg" style={{ color:C.text, fontSize:13, fontWeight:700 }}>Top Entities Detected</div>
          </div>
          {entities.map(({e,type,count},i) => (
            <div key={i} className="td" style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 18px", borderBottom:i<entities.length-1?`1px solid ${C.border}`:"none" }}>
              <div style={{ flex:1 }}>
                <span style={{ color:C.text, fontWeight:600, fontSize:13 }}>{e}</span>
                <span className="chip" style={{ color:C.blueL, background:C.bluePale, marginLeft:8, fontSize:9 }}>{type}</span>
              </div>
              <div style={{ width:100, marginRight:10 }}><ProgBar v={(count/1240)*100} col={C.blueL} h={5}/></div>
              <span style={{ color:C.orange, fontWeight:700, fontSize:12 }}>{count.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <div className="card" style={{ padding:"18px 20px" }}>
          <div className="sg" style={{ color:C.text, fontSize:13, fontWeight:700, marginBottom:14 }}>Sentiment Analysis</div>
          {[{l:"Positive",v:62,c:C.green},{l:"Neutral",v:29,c:C.blueL},{l:"Negative",v:9,c:C.red}].map(({l,v,c}) => (
            <div key={l} style={{ marginBottom:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                <span style={{ color:C.textMid, fontSize:12 }}>{l}</span>
                <span style={{ color:c, fontWeight:700, fontSize:13 }}>{v}%</span>
              </div>
              <ProgBar v={v} col={c} h={8}/>
            </div>
          ))}
        </div>
        <div className="card" style={{ overflow:"hidden" }}>
          <div style={{ padding:"12px 18px", borderBottom:`1px solid ${C.border}` }}>
            <div className="sg" style={{ color:C.text, fontSize:13, fontWeight:700 }}>Most Asked Queries</div>
          </div>
          {topQueries.map(({q,cnt},i) => (
            <div key={i} className="td" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 18px", borderBottom:i<topQueries.length-1?`1px solid ${C.border}`:"none" }}>
              <span style={{ color:C.text, fontSize:12.5 }}>{q}</span>
              <span className="chip" style={{ color:C.orange, background:C.orangeL }}>{cnt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Push Notifications Screen ─────────────────────────────────────────
function PushNotifications() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [segment, setSegment] = useState("all");
  const [schedule, setSchedule] = useState("now");
  const sent = [
    {title:"🚀 New feature: AI Content Lab is live!",sent:"2,840 users",date:"May 1",open:"68%",click:"12%"},
    {title:"⚠️ Action required: Update your billing info",sent:"420 users",date:"Apr 28",open:"82%",click:"44%"},
    {title:"📊 Your monthly SEO report is ready",sent:"1,284 users",date:"Apr 30",open:"74%",click:"28%"},
    {title:"🎉 Boostly turns 2 — get 40% off annual plan!",sent:"3,100 users",date:"Apr 15",open:"91%",click:"35%"},
  ];
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, padding:"20px 24px 0" }}>
        {[{l:"Total Sent (30d)",v:"12,844",c:C.blueL},{l:"Avg Open Rate",v:"78.8%",c:C.green},{l:"Avg Click Rate",v:"29.7%",c:C.orange},{l:"Failed Deliveries",v:"24",c:C.red}].map(({l,v,c}) => (
          <div key={l} className="card ch" style={{ padding:"14px 18px" }}>
            <div className="sg" style={{ color:c, fontSize:22, fontWeight:800 }}>{v}</div>
            <div style={{ color:C.textDim, fontSize:11, marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, padding:"16px 24px" }}>
        <div className="card" style={{ padding:"20px 24px" }}>
          <div className="sg" style={{ color:C.text, fontSize:14, fontWeight:700, marginBottom:16 }}>Send New Notification</div>
          <div style={{ marginBottom:14 }}>
            <label style={{ display:"block", color:C.textMid, fontSize:12, fontWeight:600, marginBottom:5 }}>Notification Title</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Your weekly SEO report is ready 📊" style={{ width:"100%", padding:"9px 13px", border:`1px solid ${C.border}`, borderRadius:9, fontSize:13, fontFamily:"inherit", outline:"none", boxSizing:"border-box" }}/>
          </div>
          <div style={{ marginBottom:14 }}>
            <label style={{ display:"block", color:C.textMid, fontSize:12, fontWeight:600, marginBottom:5 }}>Message Body</label>
            <textarea value={body} onChange={e=>setBody(e.target.value)} rows={3} placeholder="Your message here..." style={{ width:"100%", padding:"9px 13px", border:`1px solid ${C.border}`, borderRadius:9, fontSize:13, fontFamily:"inherit", outline:"none", resize:"none", boxSizing:"border-box" }}/>
          </div>
          <div style={{ marginBottom:14 }}>
            <label style={{ display:"block", color:C.textMid, fontSize:12, fontWeight:600, marginBottom:5 }}>Target Segment</label>
            <select value={segment} onChange={e=>setSegment(e.target.value)} style={{ width:"100%", padding:"9px 13px", border:`1px solid ${C.border}`, borderRadius:9, fontSize:13, fontFamily:"inherit", outline:"none", background:"white" }}>
              <option value="all">All Users (1,284)</option>
              <option value="pro">Pro Plan Users (412)</option>
              <option value="agency">Agency Plan Users (84)</option>
              <option value="trial">Trial Users (346)</option>
              <option value="churned">Churned Users (142)</option>
              <option value="inactive">Inactive 30d+ (210)</option>
            </select>
          </div>
          <div style={{ marginBottom:18 }}>
            <label style={{ display:"block", color:C.textMid, fontSize:12, fontWeight:600, marginBottom:8 }}>Delivery</label>
            <div style={{ display:"flex", gap:8 }}>
              {[["now","Send Now"],["schedule","Schedule"]].map(([v,l]) => (
                <label key={v} style={{ display:"flex", alignItems:"center", gap:6, cursor:"pointer", fontSize:13, color:C.text }}>
                  <input type="radio" name="schedule" checked={schedule===v} onChange={() => setSchedule(v)} style={{ accentColor:C.blueL }}/>
                  {l}
                </label>
              ))}
            </div>
          </div>
          <div style={{ background:C.bgLight, borderRadius:9, padding:"10px 14px", marginBottom:16, fontSize:12, color:C.blue, border:`1px solid ${C.bluePale}` }}>
            💡 Notifications sent between 9–11 AM have the highest open rates
          </div>
          <button style={{ width:"100%", padding:"11px", background:`linear-gradient(135deg,${C.orange},#EA6C0A)`, color:"#fff", border:"none", cursor:"pointer", borderRadius:9, fontSize:14, fontWeight:700, fontFamily:"inherit" }}>
            {schedule==="now" ? "🚀 Send Notification Now" : "📅 Schedule Notification"}
          </button>
        </div>

        <div className="card" style={{ overflow:"hidden" }}>
          <div style={{ padding:"14px 18px", borderBottom:`1px solid ${C.border}` }}>
            <div className="sg" style={{ color:C.text, fontSize:14, fontWeight:700 }}>Sent History</div>
          </div>
          {sent.map(({title,sent:s,date,open,click},i) => (
            <div key={i} className="td" style={{ padding:"13px 18px", borderBottom:i<sent.length-1?`1px solid ${C.border}`:"none" }}>
              <div style={{ color:C.text, fontSize:13, fontWeight:600, marginBottom:4 }}>{title}</div>
              <div style={{ display:"flex", gap:12 }}>
                <span style={{ color:C.textDim, fontSize:11 }}>Sent to: <span style={{ fontWeight:600, color:C.textMid }}>{s}</span></span>
                <span style={{ color:C.textDim, fontSize:11 }}>{date}</span>
              </div>
              <div style={{ display:"flex", gap:10, marginTop:6 }}>
                <span className="chip" style={{ color:C.green, background:C.greenL }}>Open: {open}</span>
                <span className="chip" style={{ color:C.blueL, background:C.bluePale }}>Click: {click}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── (end of new additions) ─────────────────────────────────────────────

// ── Updated SCREENS Map (with all screens including new sub-screens) ────
const SCREENS = {
  crawl:               { C: CrawlDashboard,          title: "Dashboard",               sub: "Welcome to Boostly — your SEO command center" },
  dashboard:           { C: Dashboard,               title: "Analytics Overview",      sub: "SEO Engine Boost · Full platform metrics" },
  keyword:             { C: KeywordResearch,         title: "Keyword Research",        sub: "Discover high-value keywords & opportunities" },
  advancedkeywords:    { C: AdvancedKeywordResearch, title: "Advanced Keywords",       sub: "Filter by Long-tail, Low competition, High CPC" },
  competitive:         { C: CompetitiveResearch,     title: "Competitive Research",    sub: "Domain overview, keyword gaps & backlink comparison" },
  "domain-overview":   { C: DomainOverviewScreen,    title: "Domain Overview",         sub: "Organic traffic, backlinks, keywords & on-page score" },
  "keyword-gap":       { C: KeywordGapScreen,        title: "Keyword Gap",             sub: "Find keywords competitors rank for that you don't" },
  "backlink-gap":      { C: BacklinkGapScreen,       title: "Backlink Gap",            sub: "Find link prospects by comparing backlink profiles" },
  competitoranalyzer:  { C: CompetitorAnalyzer,      title: "Competitor Analyzer",     sub: "Traffic, keywords, pages & gap analysis" },
  backlink:            { C: BacklinkResearch,        title: "Backlink Research",       sub: "Monitor and grow your full backlink profile" },
  onpage:              { C: OnPageAudit,             title: "On Page & Tech Audit",    sub: "Full technical SEO analysis with AI-powered fixes" },
  siteaudit:           { C: SiteAudit,               title: "Site Audit",              sub: "Site health, crawl errors, warnings & page speed" },
  rank:                { C: RankTracking,            title: "Rank Tracking",           sub: "Track keyword positions across devices and regions" },
  ranktracker:         { C: DomainRankTracker,       title: "Domain Rank Tracker",     sub: "Track multiple domains with position history" },
  projectsdashboard:   { C: ProjectsDashboard,       title: "Projects Dashboard",      sub: "All tracked domains with audit scores & rank trackers" },
  keywordsperformance: { C: KeywordsPerformance,     title: "Keywords Performance",    sub: "Winner & loser keywords, ranking changes & position charts" },
  articlechecker:      { C: ArticleChecker,          title: "Article Checker",         sub: "URL & keyword tracking — SEO scores, diagnostics, on-page" },
  trafficanalytics:    { C: TrafficAnalytics,        title: "Traffic Analytics",       sub: "Organic traffic, top keywords & competitor position map" },
  localseo:            { C: LocalSEO,                title: "Local SEO Manager",       sub: "Google My Business, reviews & local optimization" },
  seotasks:            { C: SEOTaskManagement,       title: "SEO Task Management",     sub: "Fix SEO issues — On-Page · Technical · Content" },
  progress:            { C: ProgressScreen,          title: "SEO Progress",            sub: "Crawl results, outstanding issues & task completion" },
  aisuggestions:       { C: AISuggestions,           title: "AI Suggestions",          sub: "Critical issues, improvements & content insights" },
  contentlab:          { C: ContentLab,              title: "Content Lab",             sub: "AI-powered writing workspace with live SEO scoring" },
  seoassistant:        { C: SEOAssistant,            title: "SEO Assistant",           sub: "AI-powered SEO chat — ask anything, get answers" },
  reports:             { C: Reports,                 title: "Reports & Insights",      sub: "Branded client reports — PDF export & auto-send" },
  messages:            { C: Messages,                title: "Messages",                sub: "Team chat · AI Chat-to-Task · Always-on Copilot" },
  tasks:               { C: Tasks,                   title: "Project Tasks",           sub: "Kanban board — plan, assign, track & ship" },
  clients:             { C: Clients,                 title: "Clients",                 sub: "Manage all client projects and relationships" },
  team:                { C: TeamMembers,             title: "Team Members",            sub: "Manage your team, roles & permissions" },
  calendar:            { C: CalendarView,            title: "Campaign Planner",        sub: "Campaign calendar, social queue & scheduler" },
  settings:            { C: SettingsView,            title: "Settings",                sub: "Account, workspace & integrations" },
  admin:               { C: AdminDashboard,          title: "Admin Dashboard",         sub: "Platform overview, users & revenue analytics" },
  usermanagement:      { C: UserManagement,          title: "User Management",         sub: "View, upgrade, and manage all platform users" },
  paymentlogs:         { C: PaymentLogs,             title: "Payment Logs",            sub: "Transaction history, filters & subscription status" },
  nlpanalytics:        { C: NLPAnalytics,            title: "NLP Analytics",           sub: "Keywords, AI articles & most active users" },
  pushnotifications:   { C: PushNotifications,       title: "Push Notifications",      sub: "Broadcast messages to all or targeted users" },
};

// ── Updated Sidebar with backlink-gap sub ─────────────────────────────
function SidebarFull({ active, setActive, sub, setSub, openAI, setOpenAI }) {
  const seoNav = [
    { id:"crawl",               icon:LayoutDashboard, label:"SEO Dashboard" },
    { id:"projectsdashboard",   icon:Briefcase,       label:"Projects Dashboard" },
    { id:"progress",            icon:Activity,        label:"Progress" },
    { id:"siteaudit",           icon:FileSearch,      label:"Site Audit" },
    { id:"onpage",              icon:Shield,          label:"On-Page Audit" },
    { id:"seotasks",            icon:CheckSquare,     label:"SEO Tasks", badge:15 },
    { id:"aisuggestions",       icon:Sparkles,        label:"AI Suggestions", badge:"AI" },
    { id:"articlechecker",      icon:FileText,        label:"Article Checker" },
    {
      id:"competitive", icon:Globe, label:"Competitive Research",
      subs:[{id:"domain-overview",l:"Domain Overview"},{id:"keyword-gap",l:"Keyword Gap"},{id:"backlink-gap",l:"Backlink Gap"}]
    },
    { id:"competitoranalyzer",  icon:Target,          label:"Competitor Analyzer" },
    { id:"keyword",             icon:Search,          label:"Keyword Research" },
    { id:"advancedkeywords",    icon:TrendingUp,      label:"Advanced Keywords", badge:"PRO" },
    { id:"keywordsperformance", icon:BarChart2,       label:"Keywords Performance" },
    { id:"backlink",            icon:Link2,           label:"Backlink Research" },
    { id:"rank",                icon:BarChart2,       label:"Rank Tracking" },
    { id:"ranktracker",         icon:Activity,        label:"Domain Tracker" },
    { id:"trafficanalytics",    icon:BarChart,        label:"Traffic Analytics" },
    { id:"localseo",            icon:Globe,           label:"Local SEO" },
  ];
  const contentNav = [
    { id:"contentlab",   icon:Edit2,     label:"Content Lab", badge:"AI" },
    { id:"seoassistant", icon:Bot,       label:"SEO Assistant", badge:"AI" },
    { id:"reports",      icon:BarChart2, label:"Reports & Insights" },
    { id:"calendar",     icon:Calendar,  label:"Campaign Planner" },
  ];
  const teamNav = [
    { id:"messages",  icon:MessageSquare, label:"Messages", badge:17 },
    { id:"tasks",     icon:CheckSquare,   label:"Project Tasks" },
    { id:"clients",   icon:Briefcase,     label:"Clients" },
    { id:"team",      icon:Users,         label:"Team Members" },
    { id:"dashboard", icon:BarChart2,     label:"Analytics" },
  ];
  const adminNav = [
    { id:"admin",             icon:Shield,  label:"Admin Dashboard" },
    { id:"usermanagement",    icon:Users,   label:"User Management" },
    { id:"paymentlogs",       icon:BarChart,label:"Payment Logs" },
    { id:"nlpanalytics",      icon:Activity,label:"NLP Analytics" },
    { id:"pushnotifications", icon:Bell,    label:"Push Notifications" },
  ];

  const NavItem = ({ id, icon: Icon, label, badge, subs }) => (
    <div>
      <div className={`nav${active===id&&!sub?" on":""}`} onClick={() => { setActive(id); if(!subs) setSub(null); }}>
        <Icon size={14}/>
        <span style={{ flex:1 }}>{label}</span>
        {badge && typeof badge==="number"
          ? <span style={{background:C.orange,color:"#fff",fontSize:9,fontWeight:700,width:17,height:17,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{badge}</span>
          : badge && <span className="chip" style={{color:C.blueL,background:C.bluePale,fontSize:9}}>{badge}</span>
        }
        {subs && <ChevronDown size={10} color={C.textDim} style={{transform:active===id?"rotate(180deg)":"none",transition:"transform .2s"}}/>}
      </div>
      {subs && active===id && subs.map(s => (
        <div key={s.id} className={`nsub${sub===s.id?" on":""}`} onClick={() => setSub(s.id)}>{s.l}</div>
      ))}
    </div>
  );

  return (
    <div style={{width:214,background:C.white,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",height:"100vh",position:"sticky",top:0,flexShrink:0,overflowY:"auto"}}>
      {/* Logo */}
      <div style={{padding:"14px 14px 12px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <div style={{width:34,height:34,borderRadius:10,background:`linear-gradient(135deg,${C.orange},${C.blueL})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 3px 10px rgba(249,115,22,0.3)"}}>
            <Zap size={17} color="#fff" fill="#fff"/>
          </div>
          <div>
            <div className="sg" style={{color:C.text,fontWeight:800,fontSize:17,letterSpacing:"-0.5px",lineHeight:1}}>Boostly</div>
            <div style={{color:C.textDim,fontSize:9,letterSpacing:".8px",fontWeight:700}}>SEO · MARKETING · AI</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:7,padding:"6px 9px",background:C.bgLight,borderRadius:7,border:`1px solid ${C.bluePale}`,cursor:"pointer"}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:C.green}} className="pls"/>
          <span style={{color:C.blue,fontSize:11,fontWeight:600,flex:1}}>Marketing Workspace</span>
          <ChevronDown size={10} color={C.textDim}/>
        </div>
      </div>

      <div style={{padding:"10px 8px",flex:1}}>
        {/* AI Copilot toggle */}
        <button onClick={() => setOpenAI(!openAI)} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:"9px 12px",borderRadius:9,border:"none",cursor:"pointer",fontSize:13,fontWeight:700,marginBottom:12,fontFamily:"inherit",background:openAI?`linear-gradient(135deg,${C.blue},${C.blueL})`:`linear-gradient(135deg,${C.bgLight},${C.bluePale})`,color:openAI?"#fff":C.blue}}>
          <Bot size={15}/>
          <span style={{flex:1}}>AI SEO Copilot</span>
          <span className="chip" style={{background:openAI?"rgba(255,255,255,.2)":C.blueL,color:"#fff",fontSize:9}}>LIVE</span>
        </button>

        <div style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:1.2,padding:"0 8px",marginBottom:4}}>SEO TOOLS</div>
        {seoNav.map(item => <NavItem key={item.id} {...item}/>)}

        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:8,marginTop:8}}>
          <div style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:1.2,padding:"0 8px",marginBottom:4}}>CONTENT & AI</div>
          {contentNav.map(item => <NavItem key={item.id} {...item}/>)}
        </div>

        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:8,marginTop:8}}>
          <div style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:1.2,padding:"0 8px",marginBottom:4}}>TEAM & CLIENTS</div>
          {teamNav.map(item => <NavItem key={item.id} {...item}/>)}
        </div>

        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:8,marginTop:8}}>
          <div style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:1.2,padding:"0 8px",marginBottom:4}}>ADMIN</div>
          {adminNav.map(item => <NavItem key={item.id} {...item}/>)}
        </div>

        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:8,marginTop:8}}>
          <div className={`nav${active==="settings"?" on":""}`} onClick={() => {setActive("settings");setSub(null);}}>
            <Settings size={14}/> Settings
          </div>
          <div className="nav" style={{color:C.textDim}}><HelpCircle size={14}/> Help & Docs</div>
        </div>
      </div>

      <div style={{borderTop:`1px solid ${C.border}`,padding:"10px 10px 14px"}}>
        {/* Upgrade banner */}
        <div style={{background:`linear-gradient(135deg,${C.orange},#EA580C)`,borderRadius:10,padding:"12px 14px",marginBottom:10,cursor:"pointer"}} onClick={() => setActive("pricing")}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
            <Zap size={13} color="#fff" fill="#fff"/>
            <span style={{color:"#fff",fontSize:12,fontWeight:700}}>Upgrade to Pro</span>
          </div>
          <div style={{color:"rgba(255,255,255,.8)",fontSize:10.5,lineHeight:1.5}}>Unlock unlimited crawls, keywords & AI features</div>
          <button style={{marginTop:8,width:"100%",background:"rgba(255,255,255,.2)",border:"1px solid rgba(255,255,255,.3)",color:"#fff",cursor:"pointer",padding:"5px 0",borderRadius:7,fontSize:11,fontWeight:700,fontFamily:"inherit"}}>View Plans →</button>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 8px",background:C.bg,borderRadius:9,cursor:"pointer"}}>
          <Av l="Y" size={28}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{color:C.text,fontSize:12,fontWeight:700}}>Your Account</div>
            <div style={{color:C.textDim,fontSize:10}}>Admin · Pro Plan</div>
          </div>
          <ChevronDown size={11} color={C.textDim}/>
        </div>
      </div>
    </div>
  );
}

// ── App Component (with sub-routing for competitive research) ──────────
export default function App() {
  const [active, setActive] = useState("crawl");
  const [sub, setSub] = useState(null);
  const [view, setView] = useState("app");
  const [aiOpen, setAiOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // Sub-routing: when competitive is active and a sub is selected, use that sub as the screen key
  const screenKey = (active === "competitive" && sub) ? sub : active;
  const screen = SCREENS[screenKey] || SCREENS.crawl;
  const Screen = screen.C;

  if (view === "pricing") {
    return (
      <>
        <style>{CSS}</style>
        <PricingPage goBack={() => setView("app")} />
      </>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div style={{display:"flex",height:"100vh",background:C.bg,fontFamily:"'Manrope',sans-serif",overflow:"hidden",position:"relative"}}>
        <SidebarFull
          active={active}
          setActive={(id) => { setActive(id); setSub(null); }}
          sub={sub}
          setSub={setSub}
          openAI={aiOpen}
          setOpenAI={setAiOpen}
        />
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          {/* Topbar */}
          <div style={{padding:"0 24px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10,background:C.white,position:"sticky",top:0,zIndex:20,flexShrink:0,height:57}}>
            <div style={{flex:1,minWidth:0}}>
              <h1 className="sg" style={{color:C.text,fontSize:15,fontWeight:700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{screen.title}</h1>
              <p style={{color:C.textDim,fontSize:10.5}}>{screen.sub}</p>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6,background:C.bg,border:`1px solid ${C.border}`,borderRadius:9,padding:"6px 10px",width:180,flexShrink:0}}>
              <Search size={12} color={C.textDim}/>
              <input placeholder="Search anything..." style={{background:"transparent",border:"none",outline:"none",color:C.textMid,fontSize:12,width:"100%",fontFamily:"inherit"}}/>
            </div>
            <button onClick={() => setView("pricing")} style={{background:C.orange,color:"#fff",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:5,padding:"7px 13px",borderRadius:8,fontSize:12,fontWeight:700,fontFamily:"inherit",flexShrink:0}}>
              ⚡ Upgrade
            </button>
            <button onClick={() => setAiOpen(!aiOpen)} style={{background:aiOpen?`linear-gradient(135deg,${C.blue},${C.blueL})`:"transparent",color:aiOpen?"#fff":C.blueL,border:`1px solid ${aiOpen?C.blueL:C.border}`,cursor:"pointer",display:"flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:8,fontSize:12,fontWeight:700,fontFamily:"inherit",flexShrink:0}}>
              <Bot size={13}/> AI Copilot
            </button>
            <div style={{position:"relative",cursor:"pointer"}} onClick={() => setNotifOpen(!notifOpen)}>
              <Bell size={17} color={C.textDim}/>
              <div style={{width:6,height:6,borderRadius:"50%",background:C.orange,position:"absolute",top:-1,right:-1,border:"1.5px solid #fff"}}/>
            </div>
            {notifOpen && (
              <div style={{position:"absolute",top:57,right:16,width:320,background:C.white,border:`1px solid ${C.border}`,borderRadius:12,boxShadow:"0 8px 30px rgba(0,0,0,0.12)",zIndex:100,overflow:"hidden"}}>
                <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span className="sg" style={{color:C.text,fontWeight:700,fontSize:13}}>Notifications</span>
                  <button onClick={() => setNotifOpen(false)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={13} color={C.textDim}/></button>
                </div>
                {[
                  {icon:CheckCircle2,c:C.green,msg:"Jordan completed 'Homepage Redesign'",t:"2m ago"},
                  {icon:MessageSquare,c:C.blueL,msg:"Mahmoud mentioned you in #seo-team",t:"14m ago"},
                  {icon:AlertCircle,c:C.yellow,msg:"Task 'Facebook Ads Copy' is due tomorrow",t:"1h ago"},
                  {icon:Bot,c:C.blueL,msg:"AI summarized 24 messages in #content-writers",t:"2h ago"},
                  {icon:BarChart2,c:C.purple,msg:"Weekly SEO report ready for Dental Pro",t:"5h ago"},
                ].map(({icon:Icon,c,msg,t},i) => (
                  <div key={i} style={{display:"flex",gap:10,padding:"10px 16px",borderBottom:i<4?`1px solid ${C.border}`:"none",cursor:"pointer"}} className="td">
                    <div style={{width:28,height:28,borderRadius:7,background:`${c}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Icon size={13} color={c}/></div>
                    <div style={{flex:1}}><p style={{color:C.text,fontSize:12}}>{msg}</p><span style={{color:C.textDim,fontSize:10.5}}>{t}</span></div>
                  </div>
                ))}
              </div>
            )}
            <Av l="Y" size={30}/>
          </div>
          <Screen onNavigate={(id) => { setActive(id); setSub(null); }}/>
        </div>

        {/* Floating AI Copilot */}
        {aiOpen && <AICopilot onClose={() => setAiOpen(false)}/>}
      </div>
    </>
  );
}
