import { useState, useEffect } from "react";
import {
  LayoutDashboard, Search, BarChart2, Globe, Link2, FileSearch, Code,
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
function Dashboard({ onNavigate, onUpgrade }) {
  const [dateRange, setDateRange] = useState("30d");
  const stats = [
    {l:"Organic Traffic", v:"92.4K",  chg:"+18%", up:true,  icon:TrendingUp, c:C.blueL},
    {l:"Keywords Top 10", v:"214",    chg:"+31",  up:true,  icon:Target,     c:C.green},
    {l:"Domain Rating",   v:"42",     chg:"+3",   up:true,  icon:Shield,     c:C.orange},
    {l:"Backlinks",       v:"14.2K",  chg:"+482", up:true,  icon:Link2,      c:C.purple},
    {l:"Avg. Position",   v:"12.4",   chg:"-1.8", up:true,  icon:BarChart2,  c:C.blueL},
    {l:"Site Health",     v:"68/100", chg:"+5",   up:true,  icon:Activity,   c:C.yellow},
  ];
  const mrrData = [
    {m:"Oct",v:3800},{m:"Nov",v:4200},{m:"Dec",v:3900},{m:"Jan",v:5100},{m:"Feb",v:5800},{m:"Mar",v:6200},{m:"Apr",v:7100},{m:"May",v:7840},
  ];
  const trafficByChannel = [
    {name:"Organic",   value:68, color:C.blueL},
    {name:"Direct",    value:18, color:C.green},
    {name:"Referral",  value:9,  color:C.orange},
    {name:"Paid",      value:5,  color:C.purple},
  ];
  const acts = [
    {u:"Mahmoud",  a:"completed keyword audit for",  t:"Dental Pro",        ago:"2m",  icon:CheckCircle2, c:C.green},
    {u:"Aisha",    a:"created 4 tasks in",            t:"TechFlow Campaign", ago:"14m", icon:Plus,         c:C.blueL},
    {u:"AI",       a:"fixed 3 broken links on",       t:"seoengineboost.com",ago:"1h",  icon:Bot,          c:C.purple},
    {u:"Sam",      a:"published blog post for",       t:"Dental Client",     ago:"2h",  icon:FileText,     c:C.orange},
    {u:"Jordan",   a:"approved client report",        t:"LegalEdge Q1",      ago:"3h",  icon:CheckCircle2, c:C.yellow},
  ];
  const topKws = [
    {kw:"seo tools 2026",        pos:3,  ch:+4, vol:"12K"},
    {kw:"backlink checker",       pos:7,  ch:+2, vol:"8.4K"},
    {kw:"keyword rank tracker",   pos:9,  ch:-1, vol:"6.1K"},
    {kw:"site audit free",        pos:12, ch:+5, vol:"5.8K"},
    {kw:"competitor analysis",    pos:18, ch:+3, vol:"9.7K"},
  ];

  return (
    <div className="fade" style={{padding:"20px 24px",overflowY:"auto",height:"calc(100vh - 57px)",background:C.bg}}>
      {/* Hero strip */}
      <div style={{background:`linear-gradient(135deg,${C.blue} 0%,${C.blueL} 100%)`,borderRadius:16,padding:"22px 28px",marginBottom:22,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-30,right:60,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,0.07)"}}/>
        <div style={{position:"relative"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><Sparkles size={13} color="#FED7AA"/><span style={{color:"#FED7AA",fontSize:11,fontWeight:700,letterSpacing:.5}}>ANALYTICS OVERVIEW · MAY 2026</span></div>
          <h2 className="sg" style={{color:"#fff",fontSize:22,fontWeight:800,marginBottom:7}}>Your performance is <span style={{color:"#FED7AA"}}>improving</span> 📈</h2>
          <p style={{color:"rgba(255,255,255,.75)",fontSize:13,marginBottom:16}}>7 tasks due today · 3 client reports pending · MRR up 24% this month</p>
          <div style={{display:"flex",gap:9}}>
            <button onClick={()=>onNavigate&&onNavigate("siteaudit")} style={{background:C.orange,color:"#fff",border:"none",cursor:"pointer",padding:"9px 18px",borderRadius:8,fontSize:13,fontWeight:700,display:"flex",alignItems:"center",gap:7,fontFamily:"inherit"}}><Target size={14}/> Run SEO Audit</button>
            <button onClick={()=>onNavigate&&onNavigate("seoassistant")} style={{background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.25)",color:"#fff",padding:"9px 18px",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:7,fontFamily:"inherit"}}><Bot size={14}/> Ask AI Copilot</button>
          </div>
        </div>
      </div>

      {/* Date range selector */}
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:16,gap:6}}>
        {[["7d","7 days"],["30d","30 days"],["90d","90 days"],["1y","1 year"]].map(([id,label])=>(
          <button key={id} onClick={()=>setDateRange(id)} style={{background:dateRange===id?C.blueL:C.white,color:dateRange===id?"#fff":C.textMid,border:`1px solid ${dateRange===id?C.blueL:C.border}`,cursor:"pointer",padding:"5px 12px",borderRadius:6,fontSize:11,fontFamily:"inherit"}}>{label}</button>
        ))}
      </div>

      {/* 6 stat cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12,marginBottom:20}}>
        {stats.map(({l,v,chg,up,icon:Icon,c})=>(
          <div key={l} className="card ch" style={{padding:"14px 14px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
              <div style={{width:28,height:28,borderRadius:7,background:`${c}18`,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={13} color={c}/></div>
              <span style={{color:up?C.green:C.red,fontSize:10,fontWeight:700}}>{up?"↑":"↓"}{chg}</span>
            </div>
            <div className="sg" style={{color:C.text,fontSize:20,fontWeight:800,marginBottom:2}}>{v}</div>
            <div style={{color:C.textDim,fontSize:10,lineHeight:1.3}}>{l}</div>
          </div>
        ))}
      </div>

      {/* Main charts row */}
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16,marginBottom:16}}>
        {/* MRR chart */}
        <div className="card" style={{padding:20}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <div className="sg" style={{color:C.text,fontWeight:700,fontSize:14}}>Monthly Recurring Revenue</div>
            <div className="sg" style={{color:C.green,fontWeight:800,fontSize:16}}>$7,840 <span style={{color:C.textDim,fontSize:11,fontWeight:400}}>MRR</span></div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={mrrData} margin={{top:4,right:4,left:-22,bottom:0}}>
              <defs><linearGradient id="mrrg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.green} stopOpacity={.2}/><stop offset="95%" stopColor={C.green} stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
              <XAxis dataKey="m" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false} tickFormatter={v=>`$${v/1000}k`}/>
              <Tooltip contentStyle={{background:C.white,border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}} formatter={v=>[`$${v.toLocaleString()}`,""]}/>
              <Area type="monotone" dataKey="v" stroke={C.green} fill="url(#mrrg)" strokeWidth={2.5}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* Traffic by channel */}
        <div className="card" style={{padding:20}}>
          <div className="sg" style={{color:C.text,fontWeight:700,fontSize:14,marginBottom:14}}>Traffic by Channel</div>
          <ResponsiveContainer width="100%" height={140}>
            <RPieChart>
              <Pie data={trafficByChannel} cx="50%" cy="50%" innerRadius={42} outerRadius={62} dataKey="value" paddingAngle={3}>
                {trafficByChannel.map((d,i)=><Cell key={i} fill={d.color}/>)}
              </Pie>
              <Tooltip contentStyle={{background:C.white,border:`1px solid ${C.border}`,borderRadius:6,fontSize:10}} formatter={v=>[`${v}%`,""]}/>
            </RPieChart>
          </ResponsiveContainer>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:6}}>
            {trafficByChannel.map(d=>(
              <div key={d.name} style={{display:"flex",alignItems:"center",gap:4}}>
                <div style={{width:8,height:8,borderRadius:2,background:d.color}}/>
                <span style={{fontSize:11,color:C.textMid}}>{d.name} {d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: top keywords + activity */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div className="card" style={{overflow:"hidden"}}>
          <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span className="sg" style={{color:C.text,fontWeight:700,fontSize:13}}>Top Keywords</span>
            <button onClick={()=>onNavigate&&onNavigate("keywordsperformance")} style={{background:"transparent",border:"none",color:C.blueL,cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>View All →</button>
          </div>
          {topKws.map((k,i)=>(
            <div key={i} className="td" style={{display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:i<topKws.length-1?`1px solid ${C.border}`:"none",gap:10}}>
              <div style={{flex:1,color:C.text,fontSize:13}}>{k.kw}</div>
              <div className="sg" style={{color:C.text,fontWeight:700,fontSize:13,minWidth:26}}>#{k.pos}</div>
              <div style={{color:k.ch>0?C.green:C.red,fontSize:12,fontWeight:600,minWidth:28}}>{k.ch>0?"↑":"↓"}{Math.abs(k.ch)}</div>
              <div style={{color:C.textDim,fontSize:11,minWidth:36}}>{k.vol}</div>
            </div>
          ))}
        </div>
        <div className="card" style={{overflow:"hidden"}}>
          <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span className="sg" style={{color:C.text,fontWeight:700,fontSize:13}}>Team Activity</span>
            <button onClick={()=>onNavigate&&onNavigate("activitylog")} style={{background:"transparent",border:"none",color:C.blueL,cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>Full Log →</button>
          </div>
          {acts.map(({u,a,t,ago,icon:Icon,c},i)=>(
            <div key={i} className="td" style={{display:"flex",gap:10,padding:"10px 16px",borderBottom:i<acts.length-1?`1px solid ${C.border}`:"none",alignItems:"center"}}>
              <div style={{width:30,height:30,borderRadius:8,background:`${c}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Icon size={13} color={c}/></div>
              <div style={{flex:1,minWidth:0}}>
                <span style={{color:C.text,fontWeight:600,fontSize:12}}>{u} </span>
                <span style={{color:C.textMid,fontSize:12}}>{a} </span>
                <span style={{color:C.blueL,fontSize:12,fontWeight:600}}>{t}</span>
              </div>
              <span style={{color:C.textDim,fontSize:11,flexShrink:0}}>{ago}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  KEYWORD RESEARCH — SEMrush-quality, two distinct sub-pages
// ══════════════════════════════════════════════════════════════════
function KeywordResearch({ onNavigate, onUpgrade }) {
  const [kwPage, setKwPage] = useState("overview"); // overview | ideas
  const [query, setQuery]   = useState("dental implants");
  const [location, setLocation] = useState("All Locations");
  const [searched, setSearched] = useState(true);
  const [tracked, setTracked]   = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [intentFilter, setIntentFilter] = useState("all");

  // ── KD badge ─────────────────────────────────────────────────────
  const KDBadge = ({kd}) => {
    const col = kd<=30?"#15803D":kd<=60?"#D97706":"#DC2626";
    const bg  = kd<=30?"#DCFCE7":kd<=60?"#FEF3C7":"#FEE2E2";
    return <div style={{width:34,height:34,borderRadius:"50%",background:bg,border:`2px solid ${col}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:col,flexShrink:0}}>{kd}</div>;
  };

  // ── Intent badge ──────────────────────────────────────────────────
  const IntentBadge = ({intent}) => {
    const map={Commercial:[C.purple,C.purpleL],Informational:[C.blueL,C.bluePale],Navigational:[C.orange,C.orangeL],Transactional:[C.green,C.greenL]};
    const [col,bg]=map[intent]||[C.textDim,C.bg];
    return <span style={{background:bg,color:col,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600}}>{intent}</span>;
  };

  // ── Data ──────────────────────────────────────────────────────────
  const metrics = [
    { icon:"📊", value:"8,200", label:"Search Volume", sub:"Monthly searches", subColor:C.blueL },
    { icon:"🎯", value:"28",    label:"Keyword Difficulty", sub:"Low competition", subColor:C.green },
    { icon:"💰", value:"$4.20", label:"CPC (Avg.)", sub:"Cost per click", subColor:C.orange },
    { icon:"⭐", value:"6",     label:"SERP Features", sub:"Snippets, maps, ads", subColor:C.purple },
  ];

  const suggestions = [
    { kw:"dental implants near me",     rank:4,  ch:+3, vol:8200,  kd:28, cpc:"$4.20", intent:"Commercial" },
    { kw:"best SEO tools 2026",          rank:7,  ch:+5, vol:5100,  kd:42, cpc:"$6.80", intent:"Informational" },
    { kw:"agency project management",    rank:11, ch:-2, vol:3400,  kd:35, cpc:"$3.50", intent:"Navigational" },
    { kw:"dental implants cost",         rank:6,  ch:+8, vol:12400, kd:51, cpc:"$8.40", intent:"Commercial" },
    { kw:"how much are dental implants", rank:9,  ch:+2, vol:6700,  kd:22, cpc:"$5.10", intent:"Informational" },
    { kw:"dental implants vs dentures",  rank:14, ch:+4, vol:4300,  kd:38, cpc:"$4.90", intent:"Informational" },
    { kw:"cheap dental implants",        rank:18, ch:-1, vol:3800,  kd:29, cpc:"$7.20", intent:"Commercial" },
    { kw:"dental implants recovery",     rank:22, ch:+6, vol:2100,  kd:18, cpc:"$2.80", intent:"Informational" },
  ];

  const filtered = intentFilter==="all" ? suggestions : suggestions.filter(s=>s.intent===intentFilter);

  // ── SERP trend data ───────────────────────────────────────────────
  const trendData = [
    {m:"Nov 25",v:6800},{m:"Dec 25",v:7200},{m:"Jan 26",v:7800},{m:"Feb 26",v:7400},
    {m:"Mar 26",v:8000},{m:"Apr 26",v:7900},{m:"May 26",v:8200},
  ];

  // ── Keyword clusters (for Ideas page) ────────────────────────────
  const clusters = [
    { name:"Cost & Pricing", color:C.orange, keywords:["dental implants cost","how much do implants cost","dental implants price near me","affordable dental implants"], totalVol:"42K", avgKD:38, opportunity:"High" },
    { name:"Near Me / Local", color:C.blueL, keywords:["dental implants near me","best dentist for implants","dental implant clinic","implant dentist open now"], totalVol:"28K", avgKD:31, opportunity:"High" },
    { name:"Types & Options", color:C.green, keywords:["full mouth implants","all on 4 implants","mini dental implants","same day implants"], totalVol:"19K", avgKD:42, opportunity:"Medium" },
    { name:"vs Comparisons", color:C.purple, keywords:["implants vs dentures","implants vs bridges","implants vs veneers"], totalVol:"14K", avgKD:35, opportunity:"Medium" },
    { name:"Recovery & Care", color:C.red, keywords:["dental implant healing time","implant aftercare","pain after implant"], totalVol:"8K", avgKD:19, opportunity:"Low" },
  ];

  const questions = [
    { q:"How long do dental implants last?",        vol:9800, kd:24, intent:"Informational" },
    { q:"Are dental implants covered by insurance?", vol:7600, kd:18, intent:"Informational" },
    { q:"What is the best age for dental implants?", vol:5400, kd:21, intent:"Informational" },
    { q:"How painful is a dental implant?",          vol:4800, kd:16, intent:"Informational" },
    { q:"Can dental implants fail?",                 vol:3200, kd:28, intent:"Informational" },
    { q:"Who is a good candidate for implants?",     vol:2800, kd:22, intent:"Informational" },
  ];

  // ── RENDER ────────────────────────────────────────────────────────
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg }}>

      {/* Sub-nav tabs */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, padding:"0 28px", display:"flex", alignItems:"center", gap:0 }}>
        {[["overview","Keyword Overview"],["ideas","Keyword Ideas"]].map(([id,label])=>(
          <button key={id} onClick={()=>setKwPage(id)} style={{ padding:"13px 20px", border:"none", borderBottom:kwPage===id?`2.5px solid ${C.blueL}`:"2.5px solid transparent", cursor:"pointer", fontSize:13, fontWeight:kwPage===id?700:500, fontFamily:"inherit", background:"transparent", color:kwPage===id?C.blueL:C.textMid, marginBottom:-1 }}>{label}</button>
        ))}
      </div>

      {/* Search bar */}
      <div style={{ padding:"20px 28px 0" }}>
        <div style={{ display:"flex", gap:10, marginBottom:searched?20:0 }}>
          <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setSearched(true)} placeholder="Enter keyword, topic, or URL..." style={{ flex:1, background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"12px 18px", color:C.text, fontSize:15, fontFamily:"inherit", outline:"none", boxShadow:"0 1px 4px rgba(0,0,0,.05)" }}/>
          <select value={location} onChange={e=>setLocation(e.target.value)} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"12px 16px", color:C.text, fontSize:13, fontFamily:"inherit", outline:"none", cursor:"pointer" }}>
            <option>All Locations</option><option>🇺🇸 United States</option><option>🇵🇭 Philippines</option><option>🇬🇧 United Kingdom</option><option>🇦🇺 Australia</option><option>🇳🇬 Nigeria</option>
          </select>
          <button onClick={()=>setSearched(true)} style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"12px 28px", borderRadius:10, fontSize:14, fontWeight:700, fontFamily:"inherit" }}>Search</button>
          <button onClick={()=>setFilterOpen(!filterOpen)} style={{ background:C.white, border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"12px 18px", borderRadius:10, fontSize:13, fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 }}>
            <Filter size={14}/> Filters
          </button>
        </div>

        {/* Filters panel */}
        {filterOpen && (
          <div className="card" style={{ padding:"16px 20px", marginBottom:16, display:"flex", gap:20, alignItems:"center" }}>
            <div>
              <div style={{ color:C.textDim, fontSize:10, fontWeight:700, marginBottom:6 }}>INTENT</div>
              <div style={{ display:"flex", gap:6 }}>
                {["all","Commercial","Informational","Navigational","Transactional"].map(i=>(
                  <button key={i} onClick={()=>setIntentFilter(i)} style={{ background:intentFilter===i?C.blueL:"transparent", color:intentFilter===i?"#fff":C.textMid, border:`1px solid ${intentFilter===i?C.blueL:C.border}`, cursor:"pointer", padding:"5px 12px", borderRadius:20, fontSize:11, fontFamily:"inherit" }}>{i==="all"?"All":i}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color:C.textDim, fontSize:10, fontWeight:700, marginBottom:6 }}>KD RANGE</div>
              <div style={{ display:"flex", gap:6 }}>
                {[["Easy (0-30)","easy"],["Medium (31-60)","med"],["Hard (61+)","hard"]].map(([label,id])=>(
                  <button key={id} style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"5px 12px", borderRadius:20, fontSize:11, fontFamily:"inherit" }}>{label}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color:C.textDim, fontSize:10, fontWeight:700, marginBottom:6 }}>MIN VOLUME</div>
              <input defaultValue="1000" style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:7, padding:"5px 10px", width:80, fontSize:13, fontFamily:"inherit", outline:"none" }}/>
            </div>
          </div>
        )}
      </div>

      {/* ══ KEYWORD OVERVIEW PAGE ══════════════════════════════════════ */}
      {kwPage==="overview" && searched && (
        <div style={{ padding:"0 28px 28px" }}>
          {/* 4 metric cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
            {metrics.map((m,i)=>(
              <div key={i} className="card" style={{ padding:"22px 24px" }}>
                <div style={{ fontSize:28, marginBottom:10 }}>{m.icon}</div>
                <div className="sg" style={{ color:C.text, fontSize:30, fontWeight:900, marginBottom:4 }}>{m.value}</div>
                <div style={{ color:C.textDim, fontSize:12, marginBottom:4 }}>{m.label}</div>
                <div style={{ color:m.subColor, fontSize:12, fontWeight:600 }}>{m.sub}</div>
              </div>
            ))}
          </div>

          {/* Trend chart */}
          <div className="card" style={{ padding:"20px 24px", marginBottom:20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <div>
                <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:15 }}>Search Volume Trend</div>
                <div style={{ color:C.textDim, fontSize:12 }}>Monthly searches for "<strong>{query}</strong>" over 7 months</div>
              </div>
              <div style={{ display:"flex", gap:6 }}>
                {["3M","6M","12M"].map(r=>(
                  <button key={r} style={{ background:r==="6M"?C.blueL:"transparent", color:r==="6M"?"#fff":C.textMid, border:`1px solid ${r==="6M"?C.blueL:C.border}`, cursor:"pointer", padding:"5px 12px", borderRadius:6, fontSize:11, fontFamily:"inherit" }}>{r}</button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={trendData} margin={{top:4,right:4,left:-22,bottom:0}}>
                <defs><linearGradient id="kwg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.blueL} stopOpacity={.2}/><stop offset="95%" stopColor={C.blueL} stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis dataKey="m" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}k`}/>
                <Tooltip contentStyle={{background:C.white,border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
                <Area type="monotone" dataKey="v" stroke={C.blueL} fill="url(#kwg)" strokeWidth={2.5} name="Search Volume"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Keyword Suggestions table */}
          <div className="card" style={{ overflow:"hidden" }}>
            <div style={{ padding:"14px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:10 }}>
              <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:15, flex:1 }}>Keyword Suggestions
                <span style={{ color:C.textDim, fontSize:12, fontWeight:400, marginLeft:8 }}>{filtered.length} results</span>
              </div>
              <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"7px 14px", borderRadius:8, fontSize:12, fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 }}>
                <Download size={13}/> Export
              </button>
            </div>
            {/* Table header */}
            <div style={{ display:"grid", gridTemplateColumns:"2.5fr 120px 80px 100px 160px 140px", padding:"10px 20px", background:C.bg, borderBottom:`1px solid ${C.border}`, gap:8 }}>
              {["KEYWORD","VOLUME","KD","CPC","INTENT","ACTION"].map(h=>(
                <div key={h} style={{ color:C.textDim, fontSize:10, fontWeight:700, letterSpacing:.6 }}>{h}</div>
              ))}
            </div>
            {/* Table rows */}
            {filtered.map((row,i)=>(
              <div key={i} className="td" style={{ display:"grid", gridTemplateColumns:"2.5fr 120px 80px 100px 160px 140px", padding:"14px 20px", borderBottom:i<filtered.length-1?`1px solid ${C.border}`:"none", alignItems:"center", gap:8 }}>
                <div>
                  <div style={{ color:C.text, fontSize:14, fontWeight:600, marginBottom:3 }}>{row.kw}</div>
                  <div style={{ color:C.textDim, fontSize:11 }}>Rank #{row.rank} · <span style={{ color:row.ch>0?C.green:C.red }}>{row.ch>0?"+":""}{row.ch}</span></div>
                </div>
                <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:14 }}>{row.vol.toLocaleString()}</div>
                <KDBadge kd={row.kd}/>
                <div style={{ color:C.orange, fontWeight:600, fontSize:13 }}>{row.cpc}</div>
                <IntentBadge intent={row.intent}/>
                <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                  <button onClick={()=>setTracked(t=>t.includes(row.kw)?t:[ ...t, row.kw])} style={{ background:tracked.includes(row.kw)?C.green:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"7px 16px", borderRadius:7, fontSize:12, fontWeight:700, fontFamily:"inherit" }}>
                    {tracked.includes(row.kw)?"✓ Tracking":"Track"}
                  </button>
                  <button style={{ width:28, height:28, borderRadius:7, border:`1px solid ${C.border}`, background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><Plus size={13} color={C.textDim}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ KEYWORD IDEAS PAGE ═════════════════════════════════════════ */}
      {kwPage==="ideas" && (
        <div style={{ padding:"20px 28px 28px" }}>
          {/* Header strip */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
            <div style={{ background:`${C.blueL}10`, border:`1px solid ${C.blueL}22`, borderRadius:10, padding:"10px 16px", display:"flex", alignItems:"center", gap:8 }}>
              <Bot size={16} color={C.blueL}/>
              <span style={{ color:C.blueL, fontSize:13, fontWeight:600 }}>AI found <strong>247 keyword opportunities</strong> grouped into 5 topic clusters for "<strong>{query}</strong>"</span>
            </div>
            <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"9px 14px", borderRadius:8, fontSize:12, fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 }}>
              <Download size={13}/> Export All
            </button>
          </div>

          {/* Keyword Clusters */}
          <div style={{ marginBottom:26 }}>
            <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:16, marginBottom:4 }}>📦 Keyword Clusters</div>
            <div style={{ color:C.textDim, fontSize:12, marginBottom:14 }}>AI-grouped topics — target entire clusters to dominate search intent</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {clusters.map((cl,i)=>(
                <div key={i} className="card" style={{ padding:"16px 20px", borderLeft:`4px solid ${cl.color}` }}>
                  <div style={{ display:"grid", gridTemplateColumns:"2fr 100px 100px 120px 1fr", alignItems:"center", gap:12 }}>
                    <div>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                        <div style={{ width:8, height:8, borderRadius:"50%", background:cl.color }}/>
                        <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:14 }}>{cl.name}</span>
                        <span style={{ background:`${cl.color}18`, color:cl.color, fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:10 }}>{cl.keywords.length} keywords</span>
                      </div>
                      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                        {cl.keywords.map((kw,j)=>(
                          <span key={j} style={{ background:C.bg, border:`1px solid ${C.border}`, color:C.textMid, fontSize:11, padding:"2px 9px", borderRadius:20 }}>{kw}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ textAlign:"center" }}>
                      <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:16 }}>{cl.totalVol}</div>
                      <div style={{ color:C.textDim, fontSize:10 }}>Total Volume</div>
                    </div>
                    <div style={{ textAlign:"center" }}>
                      <KDBadge kd={cl.avgKD}/>
                      <div style={{ color:C.textDim, fontSize:10, marginTop:4 }}>Avg KD</div>
                    </div>
                    <div style={{ textAlign:"center" }}>
                      <span className="chip" style={{ color:cl.opportunity==="High"?C.green:cl.opportunity==="Medium"?C.orange:C.textDim, background:cl.opportunity==="High"?C.greenL:cl.opportunity==="Medium"?C.orangeL:C.bg, fontSize:11, padding:"4px 12px" }}>{cl.opportunity} Opportunity</span>
                    </div>
                    <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"8px 16px", borderRadius:8, fontSize:12, fontWeight:700, fontFamily:"inherit" }}>Track Cluster →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Questions people ask */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
            <div>
              <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:16, marginBottom:4 }}>❓ Questions People Ask</div>
              <div style={{ color:C.textDim, fontSize:12, marginBottom:14 }}>Target these for featured snippets (Position 0)</div>
              <div className="card" style={{ overflow:"hidden" }}>
                {questions.map((q,i)=>(
                  <div key={i} className="td" style={{ padding:"13px 16px", borderBottom:i<questions.length-1?`1px solid ${C.border}`:"none", display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ color:C.text, fontSize:13, marginBottom:4 }}>{q.q}</div>
                      <div style={{ display:"flex", gap:8 }}>
                        <span style={{ color:C.textDim, fontSize:11 }}>Vol: <strong>{q.vol.toLocaleString()}</strong></span>
                        <KDBadge kd={q.kd}/>
                      </div>
                    </div>
                    <IntentBadge intent={q.intent}/>
                    <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.blueL, cursor:"pointer", padding:"5px 10px", borderRadius:6, fontSize:11, fontFamily:"inherit" }}>Track</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Opportunities panel */}
            <div>
              <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:16, marginBottom:4 }}>🚀 Content Opportunities</div>
              <div style={{ color:C.textDim, fontSize:12, marginBottom:14 }}>High-volume, low-competition gaps you're not ranking for</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[
                  { title:"Dental Implants Cost Guide 2026",   vol:"42K", gap:"Not ranking", score:94, color:C.green },
                  { title:"Best Dental Implants Near Me",       vol:"28K", gap:"Rank #22",    score:87, color:C.green },
                  { title:"Are Implants Worth It? (Guide)",     vol:"19K", gap:"Not ranking", score:81, color:C.blueL },
                  { title:"Implants vs Dentures Comparison",    vol:"14K", gap:"Rank #18",    score:76, color:C.blueL },
                  { title:"Dental Implant Recovery Timeline",   vol:"8K",  gap:"Not ranking", score:68, color:C.orange },
                ].map((opp,i)=>(
                  <div key={i} className="card" style={{ padding:"14px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:38, height:38, borderRadius:9, background:`${opp.color}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <span className="sg" style={{ color:opp.color, fontWeight:800, fontSize:13 }}>{opp.score}</span>
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ color:C.text, fontWeight:600, fontSize:13, marginBottom:2 }}>{opp.title}</div>
                        <div style={{ display:"flex", gap:10 }}>
                          <span style={{ color:C.textDim, fontSize:11 }}>Vol: {opp.vol}</span>
                          <span style={{ color:opp.gap==="Not ranking"?C.red:C.orange, fontSize:11, fontWeight:600 }}>{opp.gap}</span>
                        </div>
                      </div>
                      <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"6px 12px", borderRadius:6, fontSize:11, fontWeight:700, fontFamily:"inherit" }}>Create</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty state when not searched */}
      {!searched && (
        <div style={{ padding:"60px 28px", textAlign:"center" }}>
          <div style={{ fontSize:64, marginBottom:16 }}>🔍</div>
          <div className="sg" style={{ color:C.text, fontSize:22, fontWeight:800, marginBottom:8 }}>Find your next keyword opportunity</div>
          <p style={{ color:C.textMid, fontSize:14 }}>Enter any keyword or topic above to get search volume, difficulty, CPC, and hundreds of related keyword ideas.</p>
        </div>
      )}
    </div>
  );
}

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
  const [searched, setSearched] = useState(false);
  const [url, setUrl] = useState("");
  const [tab, setTab] = useState("overview");
  const TABS = ["Overview","Backlinks","Referring Domains","Anchors","Top Pages","TLDs","Countries"];

  const refData = [
    {m:"Jan",rd:84,bl:310},{m:"Feb",rd:78,bl:290},{m:"Mar",rd:80,bl:300},{m:"Apr",rd:76,bl:280},
    {m:"May",rd:82,bl:320},{m:"Jun",rd:88,bl:350},{m:"Jul",rd:85,bl:340},{m:"Aug",rd:90,bl:360},
  ];
  const asBarData = [
    {range:"80-89",your:2,comp:12},{range:"70-79",your:1,comp:8},{range:"60-69",your:0,comp:15},
    {range:"50-59",your:3,comp:20},{range:"40-49",your:5,comp:18},{range:"30-39",your:8,comp:14},
    {range:"20-29",your:12,comp:10},{range:"10-19",your:15,comp:6},{range:"0-9",your:10,comp:4},
  ];
  const blTypeData = [
    {type:"Text",your:65,comp:58},{type:"Image",your:18,comp:22},{type:"Form",your:8,comp:12},{type:"Frame",your:9,comp:8},
  ];
  const topCountries = [
    {c:"🇺🇸 USA",backlinks:8420,domains:142},{c:"🇬🇧 UK",backlinks:3210,domains:68},
    {c:"🇨🇦 Canada",backlinks:2180,domains:44},{c:"🇦🇺 Australia",backlinks:1940,domains:38},
    {c:"🇩🇪 Germany",backlinks:890,domains:21},
  ];
  const topPages = [
    {url:"/",backlinks:234},{url:"/seo-audit-services/",backlinks:78},
    {url:"/blog/seo-tools",backlinks:45},{url:"/pricing",backlinks:31},{url:"/blog/",backlinks:28},
  ];
  const tlsData = [
    {tld:".com",count:82,c:C.orange},{tld:".org",count:18,c:C.blueL},{tld:".net",count:12,c:C.green},
    {tld:".io",count:8,c:C.purple},{tld:"Other",count:24,c:C.textDim},
  ];
  const totalTLD = tlsData.reduce((s,d)=>s+d.count,0);
  const blData = [
    {ds:33,ps:0,ref:"https://buzzakoo.com/search/hashtag/It_service/posts",target:"https://www.seoengineboost.com/seo-audit-services/",anchor:"SEO Audit Services",follow:"Follow",first:"2025-08-09"},
    {ds:42,ps:0,ref:"https://ajax-directory.com/listings/international-seo-agency",target:"https://www.seoengineboost.com/",anchor:"seoengineboost.com",follow:"Nofollow",first:"2025-08-08"},
    {ds:70,ps:0,ref:"https://ekcechat.com/seo-tools",target:"https://www.seoengineboost.com/",anchor:"seoengineboost.com",follow:"Nofollow",first:"2025-07-31"},
    {ds:63,ps:0,ref:"https://your-directory.com/seo-engine-boost",target:"https://www.seoengineboost.com/",anchor:"SEO Engine Boost",follow:"Follow",first:"2025-07-31"},
  ];

  // Landing state — Image 9
  if (!searched) return (
    <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)",background:C.bg,padding:"24px 28px"}}>
      {/* Search box */}
      <div className="card" style={{padding:"20px 24px",marginBottom:24,border:`2px solid ${C.blueL}`}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
          <div className="sg" style={{color:C.text,fontSize:18,fontWeight:800}}>Backlink Analysis</div>
          <div style={{display:"flex",alignItems:"center",gap:6,background:C.bg,border:`1px solid ${C.border}`,borderRadius:7,padding:"6px 10px"}}>
            <span style={{color:C.textMid,fontSize:12}}>Language: EN</span>
            <ChevronDown size={11} color={C.textDim}/>
          </div>
        </div>
        <div style={{color:C.textDim,fontSize:13,marginBottom:14}}>Lorem ipsum dolor sit amet, consectetur adipiscing</div>
        <div style={{display:"flex",gap:10,marginBottom:10}}>
          <input value={url} onChange={e=>setUrl(e.target.value)} style={{flex:1,background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",color:C.text,fontSize:13,fontFamily:"inherit",outline:"none"}} placeholder="Enter domain or URL..."/>
          <select style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 10px",color:C.textMid,fontSize:12,fontFamily:"inherit"}}><option>Domain</option><option>URL</option></select>
          <button onClick={()=>setSearched(true)} style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"10px 28px",borderRadius:8,fontSize:13,fontWeight:700,fontFamily:"inherit"}}>Search</button>
        </div>
        <div style={{color:C.textDim,fontSize:11,marginTop:6}}>
          Example: <span style={{color:C.blueL,cursor:"pointer",textDecoration:"underline"}}>kicaid.org</span>{" "}
          <span style={{color:C.blueL,cursor:"pointer",textDecoration:"underline"}}>semrush.com/analytics/backlinks</span>
        </div>
      </div>
      {/* Discover section */}
      <div className="card" style={{padding:"22px 24px",marginBottom:20}}>
        <div className="sg" style={{color:C.text,fontSize:16,fontWeight:700,marginBottom:16}}>Discover every detail about your and your competitors' backlinks</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:20,alignItems:"center"}}>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={refData} margin={{top:4,right:4,left:-28,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
              <XAxis dataKey="m" tick={{fill:C.textDim,fontSize:10}} axisLine={false}/>
              <YAxis tick={{fill:C.textDim,fontSize:10}} axisLine={false}/>
              <Tooltip contentStyle={{background:C.white,border:`1px solid ${C.border}`,borderRadius:6,fontSize:10}}/>
              <Line type="monotone" dataKey="rd" stroke={C.blueL} strokeWidth={2} dot={{r:3,fill:C.blueL}} name="Referring Domains"/>
              <Line type="monotone" dataKey="bl" stroke={C.orange} strokeWidth={2} dot={{r:3,fill:C.orange}} name="Backlinks"/>
            </LineChart>
          </ResponsiveContainer>
          <div>
            <div className="sg" style={{color:C.text,fontWeight:700,fontSize:15,marginBottom:8}}>Track Domain Backlinks</div>
            <div style={{color:C.textMid,fontSize:13,lineHeight:1.6}}>Evaluate the link profile of a site or page URL. Lorem ipsum dolor sit amet, consectetur adipiscing</div>
          </div>
        </div>
      </div>
      {/* Top pages section */}
      <div className="card" style={{padding:"22px 24px"}}>
        <div className="sg" style={{color:C.text,fontSize:15,fontWeight:700,marginBottom:16}}>See Top Pages and Other charted rankings</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,alignItems:"center"}}>
          <div style={{color:C.textMid,fontSize:13,lineHeight:1.7}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={[{v:40},{v:55},{v:48},{v:62},{v:50},{v:45},{v:60},{v:58}]} margin={{top:4,right:4,left:-28,bottom:0}}>
              <defs>
                <linearGradient id="blg1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.blueL} stopOpacity={.25}/><stop offset="95%" stopColor={C.blueL} stopOpacity={0}/></linearGradient>
                <linearGradient id="blg2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.orange} stopOpacity={.2}/><stop offset="95%" stopColor={C.orange} stopOpacity={0}/></linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke={C.blueL} fill="url(#blg1)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  // Results state — Image 8 detailed
  return (
    <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)",background:C.bg}}>
      <div style={{padding:"12px 24px",background:C.white,borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10}}>
        <input value={url||"seoengineboost.com"} onChange={e=>setUrl(e.target.value)} style={{flex:1,background:C.bg,border:`1px solid ${C.border}`,borderRadius:7,padding:"7px 12px",fontSize:12,fontFamily:"inherit",outline:"none",color:C.text}}/>
        <button style={{background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",padding:"6px 14px",borderRadius:7,fontSize:11,fontFamily:"inherit"}}>Advanced</button>
        <select style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:7,padding:"6px 10px",color:C.textMid,fontSize:11,fontFamily:"inherit"}}><option>Newest ∨</option></select>
        <button onClick={()=>setSearched(false)} style={{background:"transparent",border:`1px solid ${C.border}`,color:C.blueL,cursor:"pointer",padding:"6px 12px",borderRadius:7,fontSize:11,fontFamily:"inherit"}}>← Back</button>
        <select style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:7,padding:"6px 10px",color:C.textMid,fontSize:11,fontFamily:"inherit"}}><option>Language: EN</option></select>
      </div>

      {/* Tab bar */}
      <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"0 24px",display:"flex",gap:0,overflowX:"auto"}}>
        {TABS.map(t=>(
          <button key={t} onClick={()=>setTab(t.toLowerCase().replace(/ /g,""))} style={{padding:"10px 14px",border:"none",borderBottom:tab===t.toLowerCase().replace(/ /g,"")?`2.5px solid ${C.blueL}`:"2.5px solid transparent",cursor:"pointer",fontSize:12,fontWeight:tab===t.toLowerCase().replace(/ /g,"")? 700:500,fontFamily:"inherit",background:"transparent",color:tab===t.toLowerCase().replace(/ /g,"")?C.blueL:C.textMid,marginBottom:-1,whiteSpace:"nowrap"}}>{t}</button>
        ))}
      </div>

      <div style={{padding:"20px 24px"}}>
        {/* Stats row */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:20}}>
          {[["44.2K","Backlinks"],["44.2K","Referring Domains"],["44.2K","Referring IPs"],["44.2K","Subnets"],["44.2K","TLDs"]].map(([v,l])=>(
            <div key={l} className="card" style={{padding:"12px 14px",textAlign:"center"}}>
              <div className="sg" style={{color:C.blueL,fontSize:18,fontWeight:800,marginBottom:2}}>{v}</div>
              <div style={{color:C.textDim,fontSize:10}}>{l}</div>
            </div>
          ))}
        </div>

        {tab==="overview" && (
          <>
            {/* Referring Domains + Backlinks charts */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
              {[["Referring Domains",C.blueL,"rd"],["Backlinks",C.orange,"bl"]].map(([title,color,key])=>(
                <div key={title} className="card" style={{padding:"16px 18px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                    <span className="sg" style={{color:C.text,fontWeight:700,fontSize:13}}>{title}</span>
                    <button style={{background:"transparent",border:`1px solid ${C.border}`,color:C.blueL,cursor:"pointer",padding:"3px 8px",borderRadius:5,fontSize:10,fontFamily:"inherit"}}>View All →</button>
                  </div>
                  <ResponsiveContainer width="100%" height={120}>
                    <AreaChart data={refData} margin={{top:4,right:4,left:-28,bottom:0}}>
                      <defs><linearGradient id={`g${key}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={color} stopOpacity={.2}/><stop offset="95%" stopColor={color} stopOpacity={0}/></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                      <XAxis dataKey="m" tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
                      <Tooltip contentStyle={{background:C.white,border:`1px solid ${C.border}`,borderRadius:6,fontSize:9}}/>
                      <Area type="monotone" dataKey={key} stroke={color} fill={`url(#g${key})`} strokeWidth={2}/>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>

            {/* Authority Score + Backlink Types */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
              <div className="card" style={{padding:"16px 18px"}}>
                <div className="sg" style={{color:C.text,fontWeight:700,fontSize:13,marginBottom:12}}>Authority Score by Domain</div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                  <span style={{background:C.bluePale,color:C.blueL,padding:"2px 8px",borderRadius:5,fontSize:11,fontWeight:700}}>80</span>
                  <span style={{color:C.textDim,fontSize:11}}>Your domain score</span>
                </div>
                {asBarData.slice(0,6).map((d,i)=>(
                  <div key={i} style={{marginBottom:8}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                      <span style={{color:C.textDim,fontSize:10}}>{d.range}</span>
                      <span style={{color:C.textMid,fontSize:10}}>{d.comp}</span>
                    </div>
                    <ProgBar v={d.comp/25*100} col={C.blueL} h={8}/>
                  </div>
                ))}
              </div>
              <div className="card" style={{padding:"16px 18px"}}>
                <div className="sg" style={{color:C.text,fontWeight:700,fontSize:13,marginBottom:12}}>Backlink Types</div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12}}>
                  <span style={{background:`${C.blueL}18`,color:C.blueL,padding:"2px 8px",borderRadius:5,fontSize:11,fontWeight:700}}>Your domain</span>
                  <span style={{color:C.textDim,fontSize:11}}>vs</span>
                  <span style={{background:`${C.orange}18`,color:C.orange,padding:"2px 8px",borderRadius:5,fontSize:11,fontWeight:700}}>20%</span>
                </div>
                {blTypeData.map((d,i)=>(
                  <div key={i} style={{marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                      <span style={{color:C.textMid,fontSize:11}}>{d.type}</span>
                      <span style={{color:C.textDim,fontSize:11}}>{d.your}% / {d.comp}%</span>
                    </div>
                    <div style={{display:"flex",gap:2}}>
                      <div style={{height:6,flex:d.your,background:C.blueL,borderRadius:3}}/>
                      <div style={{height:6,flex:d.comp,background:C.orange,borderRadius:3,opacity:.6}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Countries + Top Pages + TLD */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
              <div className="card" style={{padding:"16px 18px"}}>
                <div className="sg" style={{color:C.text,fontWeight:700,fontSize:13,marginBottom:10}}>Top Countries</div>
                {topCountries.map((c,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<topCountries.length-1?`1px solid ${C.border}`:"none"}}>
                    <span style={{fontSize:13}}>{c.c}</span>
                    <span style={{color:C.textMid,fontSize:11,marginLeft:"auto"}}>{(c.backlinks/1000).toFixed(1)}k</span>
                  </div>
                ))}
              </div>
              <div className="card" style={{padding:"16px 18px"}}>
                <div className="sg" style={{color:C.text,fontWeight:700,fontSize:13,marginBottom:10}}>Top Pages</div>
                {topPages.map((p,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<topPages.length-1?`1px solid ${C.border}`:"none"}}>
                    <span style={{color:C.blueL,fontSize:12,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.url}</span>
                    <span style={{color:C.textDim,fontSize:11,flexShrink:0}}>{p.backlinks} BL</span>
                  </div>
                ))}
              </div>
              <div className="card" style={{padding:"16px 18px"}}>
                <div className="sg" style={{color:C.text,fontWeight:700,fontSize:13,marginBottom:14}}>TLD Distribution</div>
                <div style={{position:"relative",width:90,height:90,margin:"0 auto 14px"}}>
                  <svg width={90} height={90} viewBox="0 0 90 90">
                    {tlsData.reduce((acc,d,i)=>{
                      const total=totalTLD, start=acc.offset, sweep=(d.count/total)*Math.PI*2;
                      const x1=45+40*Math.cos(start-Math.PI/2), y1=45+40*Math.sin(start-Math.PI/2);
                      const x2=45+40*Math.cos(start+sweep-Math.PI/2), y2=45+40*Math.sin(start+sweep-Math.PI/2);
                      acc.paths.push(<path key={i} d={`M 45 45 L ${x1} ${y1} A 40 40 0 ${sweep>Math.PI?1:0} 1 ${x2} ${y2} Z`} fill={d.c}/>);
                      acc.offset+=sweep; return acc;
                    },{paths:[],offset:0}).paths}
                  </svg>
                </div>
                {tlsData.map((d,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                    <div style={{width:8,height:8,borderRadius:2,background:d.c,flexShrink:0}}/>
                    <span style={{color:C.textMid,fontSize:11,flex:1}}>{d.tld}</span>
                    <span style={{color:C.text,fontSize:11,fontWeight:600}}>{((d.count/totalTLD)*100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {tab==="backlinks" && (
          <div className="card" style={{overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"50px 50px 2fr 2fr 1.5fr 90px 120px",padding:"9px 14px",background:C.bg,borderBottom:`1px solid ${C.border}`,gap:8}}>
              {["DS","PS","REFERRING PAGE","TARGET PAGE","ANCHOR TEXT","FOLLOW","FIRST SEEN"].map(h=>(<div key={h} style={{color:C.textDim,fontSize:9.5,fontWeight:700}}>{h}</div>))}
            </div>
            {blData.map((row,i)=>(
              <div key={i} className="td" style={{display:"grid",gridTemplateColumns:"50px 50px 2fr 2fr 1.5fr 90px 120px",padding:"10px 14px",borderBottom:`1px solid ${C.border}`,alignItems:"center",gap:8}}>
                <div style={{background:row.ds>=60?"#FEF3C7":row.ds>=30?"#DBEAFE":"#FEE2E2",color:row.ds>=60?C.yellow:row.ds>=30?C.blueL:C.red,fontWeight:800,fontSize:11,padding:"2px 6px",borderRadius:5,textAlign:"center"}}>{row.ds}</div>
                <div style={{background:"#FEE2E2",color:C.red,fontWeight:800,fontSize:11,padding:"2px 6px",borderRadius:5,textAlign:"center"}}>{row.ps}</div>
                <div style={{color:C.blueL,fontSize:11,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.ref}</div>
                <div style={{color:C.blueL,fontSize:11,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.target}</div>
                <div style={{color:C.textMid,fontSize:11,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.anchor}</div>
                <div><span style={{background:row.follow==="Follow"?C.greenL:C.redL,color:row.follow==="Follow"?C.green:C.red,padding:"2px 6px",borderRadius:4,fontSize:10,fontWeight:700}}>{row.follow}</span></div>
                <div style={{color:C.textDim,fontSize:11}}>{row.first}</div>
              </div>
            ))}
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
      {/* AI Project Manager Alert */}
      <div style={{padding:"8px 22px",background:`${C.blueL}08`,borderBottom:`1px solid ${C.blueL}22`,display:"flex",alignItems:"center",gap:10}}>
        <Bot size={14} color={C.blueL}/>
        <span style={{color:C.blueL,fontSize:12,fontWeight:700}}>AI Project Manager:</span>
        <span style={{color:C.text,fontSize:12}}>3 tasks are overdue — "SEO Audit for TechFlow" has been pending 5 days.</span>
        <span style={{color:C.textMid,fontSize:11}}>Recommendation: Assign crawler fixes before content optimization.</span>
        <button style={{marginLeft:"auto",background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"4px 10px",borderRadius:6,fontSize:11,fontWeight:700,fontFamily:"inherit",flexShrink:0}}>Auto-Prioritize ⚡</button>
      </div>
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
                  <div key={id} className="kc" draggable="true" onDragStart={()=>{}} style={{cursor:"grab"}}>
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
          <div style={{marginLeft:"auto",display:"flex",gap:5}}>
            <button style={{background:`linear-gradient(135deg,${C.blue},${C.blueL})`,color:"#fff",border:"none",cursor:"pointer",padding:"5px 10px",borderRadius:7,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",gap:5,fontFamily:"inherit"}}>
              <Bot size={11}/> AI Chat-to-Task
            </button>
            {[Phone,Video,Search,Pin].map((Icon,i)=>(<button key={i} style={{background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",padding:"5px 7px",borderRadius:7,display:"flex"}}><Icon size={13}/></button>))}
          </div>
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
  const [tab, setTab] = useState("clients");
  const [showAdd, setShowAdd] = useState(false);
  const clients = [
    { name:"Dental Pro Clinic",   contact:"Dr. Maria Santos",  email:"maria@dentalpro.com",   status:"Active",   plan:"Pro",   mrr:299,  health:92, projects:3, tasks:7,  lastContact:"2d ago" },
    { name:"LegalEdge Partners",  contact:"James Okonkwo",     email:"james@legaledge.com",   status:"Active",   plan:"Starter",mrr:49, health:74, projects:1, tasks:3,  lastContact:"1w ago" },
    { name:"FitLife Studio",      contact:"Aisha Nwosu",       email:"aisha@fitlife.io",      status:"At Risk",  plan:"Pro",   mrr:199,  health:58, projects:2, tasks:12, lastContact:"3w ago" },
    { name:"TechFlow Agency",     contact:"Samuel Chen",       email:"sam@techflow.co",       status:"Active",   plan:"Agency",mrr:499, health:88, projects:6, tasks:4,  lastContact:"Today" },
    { name:"Bloom Real Estate",   contact:"Fatima Al-Rashid",  email:"fatima@bloomre.com",    status:"Inactive", plan:"Free",  mrr:0,    health:32, projects:1, tasks:0,  lastContact:"1mo ago" },
  ];
  const invoices = [
    { client:"Dental Pro Clinic",  amount:299, due:"May 15, 2026", status:"Paid",    inv:"INV-2026-042" },
    { client:"TechFlow Agency",    amount:499, due:"May 20, 2026", status:"Pending", inv:"INV-2026-043" },
    { client:"LegalEdge Partners", amount:49,  due:"May 22, 2026", status:"Overdue", inv:"INV-2026-040" },
    { client:"FitLife Studio",     amount:199, due:"Jun 1, 2026",  status:"Pending", inv:"INV-2026-044" },
    { client:"Bloom Real Estate",  amount:0,   due:"—",            status:"Free",    inv:"—" },
  ];
  const statusCol = s => s==="Active"?"#16A34A":s==="At Risk"?C.orange:s==="Inactive"?C.red:C.textDim;
  const statusBg  = s => s==="Active"?C.greenL:s==="At Risk"?C.orangeL:s==="Inactive"?C.redL:C.bg;
  const invCol    = s => s==="Paid"?C.green:s==="Overdue"?C.red:s==="Pending"?C.orange:C.textDim;
  const invBg     = s => s==="Paid"?C.greenL:s==="Overdue"?C.redL:s==="Pending"?C.orangeL:C.bg;

  const totalMRR = clients.reduce((s,c)=>s+c.mrr,0);
  const activeCount = clients.filter(c=>c.status==="Active").length;
  const atRisk = clients.filter(c=>c.status==="At Risk").length;

  return (
    <div className="fade" style={{ overflowY:"auto",height:"calc(100vh - 57px)",background:C.bg }}>
      {/* Stats row */}
      <div style={{ padding:"16px 24px 0" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20 }}>
          {[
            { l:"Total Clients",   v:clients.length,          c:C.blueL,  icon:Briefcase },
            { l:"Active Clients",  v:activeCount,              c:C.green,  icon:CheckCircle2 },
            { l:"At Risk",         v:atRisk,                   c:C.orange, icon:AlertCircle },
            { l:"Monthly Revenue", v:`$${totalMRR.toLocaleString()}`,c:C.purple,icon:Activity },
          ].map(({l,v,c,icon:Icon})=>(
            <div key={l} className="card ch" style={{ padding:"14px 18px" }}>
              <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:8 }}>
                <div style={{ width:32,height:32,borderRadius:8,background:`${c}18`,display:"flex",alignItems:"center",justifyContent:"center" }}><Icon size={14} color={c}/></div>
              </div>
              <div className="sg" style={{ color:C.text,fontSize:22,fontWeight:800 }}>{v}</div>
              <div style={{ color:C.textDim,fontSize:11,marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Sub-tabs */}
        <div style={{ display:"flex",gap:0,borderBottom:`1px solid ${C.border}`,background:C.white,borderRadius:"10px 10px 0 0",overflow:"hidden",marginBottom:-1 }}>
          {[["clients","Clients"],["invoices","Invoices & Billing"],["comms","Communication History"],["approvals","Approvals"],["portal","Client Portal"]].map(([id,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={{ padding:"11px 20px",border:"none",borderBottom:tab===id?`2.5px solid ${C.blueL}`:"2.5px solid transparent",cursor:"pointer",fontSize:13,fontWeight:tab===id?700:500,fontFamily:"inherit",background:"transparent",color:tab===id?C.blueL:C.textMid,marginBottom:-1 }}>{label}</button>
          ))}
          <div style={{ marginLeft:"auto",display:"flex",alignItems:"center",paddingRight:12 }}>
            <button onClick={()=>setShowAdd(true)} style={{ background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"7px 16px",borderRadius:7,fontSize:12,fontWeight:700,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5 }}>
              <Plus size={12}/> Add Client
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding:"0 24px 24px" }}>
        {/* ── CLIENTS TAB ── */}
        {tab==="clients" && (
          <div className="card" style={{ overflow:"hidden" }}>
            <table style={{ width:"100%",borderCollapse:"collapse" }}>
              <thead><tr style={{ background:C.bg }}>
                {["Client","Contact","Status","Plan","MRR","Site Health","Projects","Tasks","Last Contact",""].map(h=>(
                  <th key={h} style={{ padding:"10px 14px",textAlign:"left",color:C.textDim,fontSize:10,fontWeight:700,borderBottom:`1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {clients.map((c,i)=>(
                  <tr key={i} className="td">
                    <td style={{ padding:"12px 14px",borderBottom:`1px solid ${C.border}` }}>
                      <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                        <Av l={c.name[0]} size={30}/>
                        <div>
                          <div style={{ color:C.text,fontWeight:700,fontSize:13 }}>{c.name}</div>
                          <div style={{ color:C.textDim,fontSize:11 }}>{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding:"12px 14px",color:C.textMid,fontSize:12,borderBottom:`1px solid ${C.border}` }}>{c.contact}</td>
                    <td style={{ padding:"12px 14px",borderBottom:`1px solid ${C.border}` }}>
                      <span className="chip" style={{ color:statusCol(c.status),background:statusBg(c.status) }}>{c.status}</span>
                    </td>
                    <td style={{ padding:"12px 14px",borderBottom:`1px solid ${C.border}` }}>
                      <span className="chip" style={{ color:PLANS[c.plan?.toLowerCase()]?.color||C.textDim,background:`${PLANS[c.plan?.toLowerCase()]?.color||C.textDim}18` }}>{c.plan}</span>
                    </td>
                    <td style={{ padding:"12px 14px",borderBottom:`1px solid ${C.border}` }}>
                      <span style={{ color:c.mrr>0?C.green:C.textDim,fontWeight:700,fontSize:13 }}>{c.mrr>0?`$${c.mrr}`:"Free"}</span>
                    </td>
                    <td style={{ padding:"12px 14px",borderBottom:`1px solid ${C.border}` }}>
                      <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                        <div style={{ flex:1,background:C.border,borderRadius:10,height:5,overflow:"hidden",minWidth:50 }}>
                          <div style={{ width:`${c.health}%`,height:"100%",background:c.health>=80?C.green:c.health>=60?C.yellow:C.red,borderRadius:10 }}/>
                        </div>
                        <span style={{ color:c.health>=80?C.green:c.health>=60?C.yellow:C.red,fontSize:11,fontWeight:700,flexShrink:0 }}>{c.health}</span>
                      </div>
                    </td>
                    <td style={{ padding:"12px 14px",color:C.textMid,fontSize:12,borderBottom:`1px solid ${C.border}`,textAlign:"center" }}>{c.projects}</td>
                    <td style={{ padding:"12px 14px",borderBottom:`1px solid ${C.border}`,textAlign:"center" }}>
                      <span style={{ color:c.tasks>5?C.orange:C.textMid,fontWeight:c.tasks>5?700:400,fontSize:12 }}>{c.tasks}</span>
                    </td>
                    <td style={{ padding:"12px 14px",color:C.textDim,fontSize:11,borderBottom:`1px solid ${C.border}` }}>{c.lastContact}</td>
                    <td style={{ padding:"12px 14px",borderBottom:`1px solid ${C.border}` }}>
                      <div style={{ display:"flex",gap:5 }}>
                        <button style={{ background:"transparent",border:`1px solid ${C.border}`,color:C.blueL,cursor:"pointer",padding:"4px 8px",borderRadius:5,fontSize:10,fontFamily:"inherit" }}>View →</button>
                        <button style={{ background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",padding:"4px 8px",borderRadius:5,fontSize:10,fontFamily:"inherit" }}>Report</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* At-risk alert */}
            {atRisk>0&&(
              <div style={{ padding:"12px 16px",background:`${C.orange}0d`,borderTop:`1px solid ${C.orange}33`,display:"flex",alignItems:"center",gap:10 }}>
                <AlertCircle size={14} color={C.orange}/>
                <span style={{ color:C.orange,fontSize:12,fontWeight:600 }}>{atRisk} client{atRisk>1?"s":""} flagged as At Risk — last contacted over 2 weeks ago.</span>
                <button style={{ marginLeft:"auto",background:C.orange,color:"#fff",border:"none",cursor:"pointer",padding:"5px 12px",borderRadius:6,fontSize:11,fontWeight:700,fontFamily:"inherit" }}>Schedule Check-in</button>
              </div>
            )}
          </div>
        )}

        {/* ── INVOICES TAB ── */}
        {tab==="invoices" && (
          <>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:20,marginTop:16 }}>
              {[
                { l:"Total Invoiced (May)", v:"$1,046", c:C.blueL },
                { l:"Collected",            v:"$299",   c:C.green },
                { l:"Outstanding",          v:"$748",   c:C.orange },
              ].map(s=>(
                <div key={s.l} className="card" style={{ padding:"14px 18px" }}>
                  <div style={{ color:C.textDim,fontSize:11,marginBottom:4 }}>{s.l}</div>
                  <div className="sg" style={{ fontSize:22,fontWeight:800,color:s.c }}>{s.v}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{ overflow:"hidden" }}>
              <div style={{ padding:"12px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center" }}>
                <span className="sg" style={{ color:C.text,fontWeight:700,fontSize:14,flex:1 }}>Invoice History</span>
                <button style={{ background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"7px 14px",borderRadius:7,fontSize:12,fontWeight:700,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5 }}>
                  <Plus size={11}/> Create Invoice
                </button>
              </div>
              <table style={{ width:"100%",borderCollapse:"collapse" }}>
                <thead><tr style={{ background:C.bg }}>
                  {["Invoice #","Client","Amount","Due Date","Status",""].map(h=>(
                    <th key={h} style={{ padding:"9px 14px",textAlign:"left",color:C.textDim,fontSize:10,fontWeight:700,borderBottom:`1px solid ${C.border}` }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {invoices.map((inv,i)=>(
                    <tr key={i} className="td">
                      <td style={{ padding:"11px 14px",color:C.textMid,fontSize:12,borderBottom:`1px solid ${C.border}` }}>{inv.inv}</td>
                      <td style={{ padding:"11px 14px",color:C.text,fontWeight:600,fontSize:13,borderBottom:`1px solid ${C.border}` }}>{inv.client}</td>
                      <td style={{ padding:"11px 14px",borderBottom:`1px solid ${C.border}` }}>
                        <span className="sg" style={{ color:inv.amount>0?C.text:C.textDim,fontWeight:700,fontSize:14 }}>{inv.amount>0?`$${inv.amount}`:"—"}</span>
                      </td>
                      <td style={{ padding:"11px 14px",color:C.textMid,fontSize:12,borderBottom:`1px solid ${C.border}` }}>{inv.due}</td>
                      <td style={{ padding:"11px 14px",borderBottom:`1px solid ${C.border}` }}>
                        <span className="chip" style={{ color:invCol(inv.status),background:invBg(inv.status) }}>{inv.status}</span>
                      </td>
                      <td style={{ padding:"11px 14px",borderBottom:`1px solid ${C.border}` }}>
                        <div style={{ display:"flex",gap:5 }}>
                          <button style={{ background:"transparent",border:`1px solid ${C.border}`,color:C.blueL,cursor:"pointer",padding:"4px 8px",borderRadius:5,fontSize:10,fontFamily:"inherit" }}>View</button>
                          {inv.status==="Pending"&&<button style={{ background:C.orange,color:"#fff",border:"none",cursor:"pointer",padding:"4px 8px",borderRadius:5,fontSize:10,fontFamily:"inherit" }}>Remind</button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── CLIENT PORTAL TAB ── */}
        {tab==="comms" && (
          <div style={{ marginTop:16 }}>
            <div className="card" style={{ overflow:"hidden" }}>
              <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}` }}>
                <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:14 }}>All Client Communications</span>
              </div>
              {[
                { client:"Dental Pro Clinic",  type:"Email",    subject:"April SEO Report Delivered",       date:"May 1",  icon:"📧", status:"Sent" },
                { client:"TechFlow Agency",    type:"Report",   subject:"Q1 Audit Results — 89 issues",     date:"Apr 28", icon:"📄", status:"Viewed" },
                { client:"LegalEdge Partners", type:"Invoice",  subject:"Invoice INV-2026-040 Overdue",     date:"Apr 22", icon:"💳", status:"Pending" },
                { client:"FitLife Studio",     type:"Chat",     subject:"You: 'Sent the backlink report'",  date:"Apr 14", icon:"💬", status:"Read" },
                { client:"Dental Pro Clinic",  type:"Approval", subject:"Homepage copy approved ✓",        date:"Apr 10", icon:"✅", status:"Approved" },
                { client:"Bloom Real Estate",  type:"Email",    subject:"Onboarding welcome email sent",    date:"Mar 28", icon:"📧", status:"Sent" },
              ].map((c,i)=>(
                <div key={i} className="td" style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ fontSize:18 }}>{c.icon}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ color:C.text, fontWeight:600, fontSize:13 }}>{c.subject}</div>
                    <div style={{ color:C.textDim, fontSize:11 }}>{c.client}</div>
                  </div>
                  <span className="chip" style={{ color:C.blueL, background:C.bluePale }}>{c.type}</span>
                  <span style={{ color:C.textDim, fontSize:11 }}>{c.date}</span>
                  <span className="chip" style={{ color:c.status==="Approved"||c.status==="Viewed"?C.green:c.status==="Pending"?C.orange:C.textDim, background:c.status==="Approved"||c.status==="Viewed"?C.greenL:c.status==="Pending"?C.orangeL:C.bg }}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="approvals" && (
          <div style={{ marginTop:16 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {[
                { client:"Dental Pro Clinic",  item:"Homepage SEO Content",      type:"Content",  due:"May 10", status:"Awaiting" },
                { client:"TechFlow Agency",    item:"May Monthly SEO Report",     type:"Report",   due:"May 12", status:"Awaiting" },
                { client:"LegalEdge Partners", item:"Invoice INV-2026-043",       type:"Invoice",  due:"May 20", status:"Approved" },
                { client:"FitLife Studio",     item:"Backlink Outreach Strategy", type:"Strategy", due:"May 8",  status:"Rejected" },
              ].map((a,i)=>(
                <div key={i} className="card" style={{ padding:18 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                    <span className="chip" style={{ color:C.blueL, background:C.bluePale }}>{a.type}</span>
                    <span className="chip" style={{ color:a.status==="Approved"?C.green:a.status==="Rejected"?C.red:C.orange, background:a.status==="Approved"?C.greenL:a.status==="Rejected"?C.redL:C.orangeL }}>{a.status}</span>
                  </div>
                  <div style={{ color:C.text, fontWeight:700, fontSize:14, marginBottom:4 }}>{a.item}</div>
                  <div style={{ color:C.textDim, fontSize:12, marginBottom:14 }}>{a.client} · Due {a.due}</div>
                  {a.status==="Awaiting" && (
                    <div style={{ display:"flex", gap:8 }}>
                      <button style={{ flex:1, background:C.green, color:"#fff", border:"none", cursor:"pointer", padding:"7px", borderRadius:7, fontSize:12, fontWeight:700, fontFamily:"inherit" }}>✓ Approve</button>
                      <button style={{ flex:1, background:"transparent", border:`1px solid ${C.border}`, color:C.red, cursor:"pointer", padding:"7px", borderRadius:7, fontSize:12, fontFamily:"inherit" }}>✗ Reject</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="portal" && (
          <div style={{ marginTop:16 }}>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
              <div className="card" style={{ padding:20 }}>
                <div className="sg" style={{ color:C.text,fontWeight:700,marginBottom:14 }}>Portal Access</div>
                {clients.filter(c=>c.mrr>0).map((c,i)=>(
                  <div key={i} style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:`1px solid ${C.border}` }}>
                    <Av l={c.name[0]} size={30}/>
                    <div style={{ flex:1 }}>
                      <div style={{ color:C.text,fontWeight:600,fontSize:13 }}>{c.name}</div>
                      <div style={{ color:C.textDim,fontSize:11 }}>Portal: Active</div>
                    </div>
                    <button style={{ background:C.bluePale,color:C.blueL,border:"none",cursor:"pointer",padding:"5px 10px",borderRadius:6,fontSize:11,fontWeight:700,fontFamily:"inherit" }}>Open Portal</button>
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding:20 }}>
                <div className="sg" style={{ color:C.text,fontWeight:700,marginBottom:8 }}>What clients see</div>
                <p style={{ color:C.textMid,fontSize:12,lineHeight:1.65,marginBottom:16 }}>Each client gets their own branded portal showing: SEO progress, rank tracking, reports, invoices, and task updates — all automatically.</p>
                <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                  {["📊 Live ranking dashboard","📄 Auto-generated reports","✅ Task & project progress","💳 Invoice history","💬 Direct messaging"].map(f=>(
                    <div key={f} style={{ background:C.bg,borderRadius:7,padding:"9px 12px",color:C.text,fontSize:12 }}>{f}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
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
  const tabs = [{id:"profile",icon:Users,l:"Profile"},{id:"workspace",icon:Briefcase,l:"Workspace"},{id:"notifications",icon:Bell,l:"Notifications"},{id:"integrations",icon:Cpu,l:"Integrations"},{id:"billing",icon:BarChart,l:"Billing"},{id:"security",icon:Shield,l:"Security"},{id:"whitelabel",icon:Globe,l:"White-Label"},{id:"api",icon:Code,l:"API & Webhooks"}];
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
            <div className="sg" style={{color:C.text,fontSize:18,fontWeight:800,marginBottom:2}}>Profile</div>
            <div style={{color:C.textDim,fontSize:13,marginBottom:16}}>Account & integrations</div>
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
          <BillingPage plan="free" onUpgrade={(p)=>{}} addToast={()=>{}}/>
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
        {tab==="api" && (
          <div style={{maxWidth:680}}>
            <div className="sg" style={{color:C.text,fontSize:18,fontWeight:800,marginBottom:5}}>API & Webhooks</div>
            <div style={{color:C.textDim,fontSize:13,marginBottom:20}}>Use the Boostly API to integrate with your own tools and automate workflows.</div>
            <div className="card" style={{padding:"22px 24px",marginBottom:16}}>
              <div className="sg" style={{color:C.text,fontWeight:700,fontSize:14,marginBottom:14}}>API Keys</div>
              <div style={{background:`${C.blueL}08`,border:`1px solid ${C.blueL}22`,borderRadius:10,padding:"14px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
                <div style={{flex:1}}>
                  <div style={{color:C.text,fontWeight:700,fontSize:13,marginBottom:2}}>Production Key</div>
                  <code style={{color:C.blueL,fontSize:12,background:C.bluePale,padding:"2px 10px",borderRadius:5}}>bst_live_xK9mL2nQ8pR4wV7yT3...</code>
                </div>
                <span className="chip" style={{color:C.green,background:C.greenL}}>Active</span>
                <button style={{background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",padding:"5px 10px",borderRadius:6,fontSize:11,fontFamily:"inherit"}}>Reveal</button>
                <button style={{background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",padding:"5px 10px",borderRadius:6,fontSize:11,fontFamily:"inherit"}}>Revoke</button>
              </div>
              <div style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:12,opacity:0.7}}>
                <div style={{flex:1}}>
                  <div style={{color:C.text,fontWeight:700,fontSize:13,marginBottom:2}}>Test Key</div>
                  <code style={{color:C.textDim,fontSize:12,background:C.bg,padding:"2px 10px",borderRadius:5}}>bst_test_jH5aM9vW2xP6yN3...</code>
                </div>
                <span className="chip" style={{color:C.textDim,background:C.bg}}>Sandbox</span>
                <button style={{background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",padding:"5px 10px",borderRadius:6,fontSize:11,fontFamily:"inherit"}}>Reveal</button>
              </div>
              <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"9px 18px",borderRadius:8,fontSize:12,fontWeight:700,fontFamily:"inherit",display:"flex",alignItems:"center",gap:6}}>
                <Plus size={12}/> Generate New API Key
              </button>
            </div>
            <div className="card" style={{padding:"22px 24px",marginBottom:16}}>
              <div className="sg" style={{color:C.text,fontWeight:700,fontSize:14,marginBottom:14}}>Webhooks</div>
              {[
                {event:"audit.completed",url:"https://myapp.com/webhooks/audit",status:"Active",last:"2 min ago"},
                {event:"rank.changed",url:"https://myapp.com/webhooks/rank",status:"Active",last:"1h ago"},
                {event:"report.ready",url:"https://myapp.com/webhooks/report",status:"Paused",last:"3d ago"},
              ].map((wh,i)=>(
                <div key={i} style={{padding:"12px 0",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:12}}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                      <code style={{color:C.blueL,fontSize:12,background:C.bluePale,padding:"2px 8px",borderRadius:5}}>{wh.event}</code>
                    </div>
                    <div style={{color:C.textDim,fontSize:11}}>{wh.url} · Last: {wh.last}</div>
                  </div>
                  <span className="chip" style={{color:wh.status==="Active"?C.green:C.orange,background:wh.status==="Active"?C.greenL:C.orangeL}}>{wh.status}</span>
                  <button style={{background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",padding:"5px 10px",borderRadius:6,fontSize:11,fontFamily:"inherit"}}>Edit</button>
                </div>
              ))}
              <button style={{marginTop:12,background:"transparent",border:`1px solid ${C.blueL}`,color:C.blueL,cursor:"pointer",padding:"9px 18px",borderRadius:8,fontSize:12,fontWeight:700,fontFamily:"inherit",display:"flex",alignItems:"center",gap:6}}>
                <Plus size={12}/> Add Webhook
              </button>
            </div>
            <div className="card" style={{padding:"22px 24px"}}>
              <div className="sg" style={{color:C.text,fontWeight:700,fontSize:14,marginBottom:10}}>API Usage This Month</div>
              {[["Audit API calls","342 / 1,000",34],["/keywords endpoint","1,847 / 5,000",37],["/rankings endpoint","2,241 / 5,000",44],["/backlinks endpoint","891 / 2,000",44]].map(([l,v,pct])=>(
                <div key={l} style={{marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{color:C.textMid,fontSize:12}}>{l}</span>
                    <span style={{color:C.text,fontSize:12,fontWeight:700}}>{v}</span>
                  </div>
                  <ProgBar v={pct} col={pct>=80?C.red:C.blueL} h={5}/>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="whitelabel" && (
          <div style={{maxWidth:680}}>
            <div className="sg" style={{color:C.text,fontSize:18,fontWeight:800,marginBottom:5}}>White-Label Settings</div>
            <div style={{background:`${C.orange}0d`,border:`1px solid ${C.orange}33`,borderRadius:12,padding:"14px 18px",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:20}}>🏷</span>
              <div>
                <div style={{color:C.orange,fontWeight:700,fontSize:13}}>White-Label is available on Pro & Agency plans</div>
                <div style={{color:C.textMid,fontSize:12}}>Remove Boostly branding and replace with your own logo, colors, and domain.</div>
              </div>
              <button style={{marginLeft:"auto",background:C.orange,color:"#fff",border:"none",cursor:"pointer",padding:"7px 14px",borderRadius:7,fontSize:12,fontWeight:700,fontFamily:"inherit",flexShrink:0}}>Upgrade to Pro →</button>
            </div>
            <div className="card" style={{padding:"22px 24px",marginBottom:16}}>
              <div className="sg" style={{color:C.text,fontWeight:700,fontSize:14,marginBottom:16}}>Agency Branding</div>
              {[
                {l:"Agency Name",       v:"SEO Engine Boost",    type:"text"},
                {l:"Custom Domain",     v:"app.seoengineboost.com", type:"url",  note:"Point your DNS CNAME to app.boostly.io"},
                {l:"Support Email",     v:"support@seoengineboost.com", type:"email"},
                {l:"Agency Website",    v:"https://seoengineboost.com", type:"url"},
              ].map(({l,v,type,note})=>(
                <div key={l} style={{marginBottom:14}}>
                  <label style={{color:C.textMid,fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>{l}</label>
                  <input defaultValue={v} type={type} style={{width:"100%",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 13px",color:C.text,fontSize:13,fontFamily:"inherit",outline:"none"}}/>
                  {note&&<div style={{color:C.textDim,fontSize:10,marginTop:4}}>{note}</div>}
                </div>
              ))}
            </div>
            <div className="card" style={{padding:"22px 24px",marginBottom:16}}>
              <div className="sg" style={{color:C.text,fontWeight:700,fontSize:14,marginBottom:14}}>Logo & Colors</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <div>
                  <div style={{color:C.textMid,fontSize:12,fontWeight:600,marginBottom:8}}>Agency Logo</div>
                  <div style={{background:C.bg,border:`2px dashed ${C.border}`,borderRadius:10,padding:"24px",textAlign:"center",cursor:"pointer"}}>
                    <Upload size={20} color={C.textDim} style={{margin:"0 auto 8px"}}/>
                    <div style={{color:C.textDim,fontSize:12}}>Click to upload logo</div>
                    <div style={{color:C.textDim,fontSize:10}}>PNG, SVG, 200×60px recommended</div>
                  </div>
                </div>
                <div>
                  <div style={{color:C.textMid,fontSize:12,fontWeight:600,marginBottom:8}}>Brand Colors</div>
                  {[["Primary Color","#1A4FB5"],["Accent Color","#F97316"],["Background","#F7F9FC"]].map(([l,v])=>(
                    <div key={l} style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                      <div style={{width:28,height:28,borderRadius:6,background:v,border:`1px solid ${C.border}`,cursor:"pointer",flexShrink:0}}/>
                      <span style={{color:C.textMid,fontSize:12,flex:1}}>{l}</span>
                      <input defaultValue={v} style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:6,padding:"5px 8px",fontSize:11,fontFamily:"inherit",outline:"none",width:80}}/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="card" style={{padding:"22px 24px"}}>
              <div className="sg" style={{color:C.text,fontWeight:700,fontSize:14,marginBottom:12}}>Client-Facing Features</div>
              {[
                {l:"Remove 'Powered by Boostly' footer",     on:true},
                {l:"Custom login page with your branding",    on:true},
                {l:"Branded PDF reports with agency logo",    on:true},
                {l:"Custom email templates (from your domain)",on:false},
                {l:"White-label mobile app (Agency plan)",    on:false},
              ].map(({l,on})=>(
                <div key={l} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
                  <div style={{flex:1,color:C.text,fontSize:13}}>{l}</div>
                  <span className="chip" style={{color:on?C.green:C.textDim,background:on?C.greenL:C.bg}}>{on?"✓ Active":"Upgrade"}</span>
                </div>
              ))}
            </div>
            <button style={{marginTop:16,background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"10px 24px",borderRadius:9,fontSize:13,fontWeight:700,fontFamily:"inherit"}}>Save White-Label Settings</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Competitive Research ──────────────────────────────────────────────
function CompetitiveResearch({ onNavigate }) {
  const tools = [
    {
      id:"domain-overview", icon:"🌐", color:C.blueL, bg:C.bluePale,
      title:"Domain Overview",
      desc:"Full traffic analysis, keyword landscape, backlink profile & on-page score for any domain",
      stats:[["Monthly Traffic","333K"],["Keywords","12.4K"],["Backlinks","91K"],["Authority","78"]],
      cta:"Analyze Domain"
    },
    {
      id:"keyword-gap", icon:"🔑", color:C.green, bg:C.greenL,
      title:"Keyword Gap",
      desc:"Discover every keyword your competitors rank for that you don't — find ranking gaps instantly",
      stats:[["Keywords Missing","2,847"],["Quick Wins","342"],["Avg KD","31"],["Potential Traffic","48K"]],
      cta:"Find Keyword Gaps"
    },
    {
      id:"backlink-gap", icon:"🔗", color:C.orange, bg:C.orangeL,
      title:"Backlink Gap",
      desc:"Compare backlink profiles to find link prospects your competitors have that you're missing",
      stats:[["Prospects Found","1,249"],["High DA (60+)","184"],["Common Links","89"],["Unique Opp.","1,160"]],
      cta:"Find Link Gaps"
    },
    {
      id:"competitoranalyzer", icon:"⚔️", color:C.purple, bg:C.purpleL,
      title:"Competitor Analyzer",
      desc:"Side-by-side comparison of traffic, keywords, pages & full content strategy breakdown",
      stats:[["Domains Tracked","4"],["Avg Overlap","38%"],["Your DR","42"],["Top Competitor DR","91"]],
      cta:"Compare Competitors"
    },
  ];

  const recentCompetitors = [
    { domain:"semrush.com",   dr:91, traffic:"5.2M", kws:"124K", change:"+3.2%" },
    { domain:"ahrefs.com",    dr:88, traffic:"3.8M", kws:"89K",  change:"+1.8%" },
    { domain:"moz.com",       dr:86, traffic:"2.1M", kws:"67K",  change:"-0.4%" },
    { domain:"surfer-seo.com",dr:72, traffic:"890K", kws:"31K",  change:"+5.1%" },
  ];

  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg, padding:"24px 28px" }}>
      {/* Hero */}
      <div style={{ background:`linear-gradient(135deg,${C.blue},${C.blueL})`, borderRadius:16, padding:"28px 32px", marginBottom:26, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-40, top:-40, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,.07)" }}/>
        <div style={{ position:"relative" }}>
          <div className="sg" style={{ color:"#FED7AA", fontSize:11, fontWeight:700, letterSpacing:1, marginBottom:6 }}>COMPETITIVE RESEARCH SUITE</div>
          <h2 className="sg" style={{ color:"#fff", fontSize:24, fontWeight:800, marginBottom:8 }}>Outrank every competitor</h2>
          <p style={{ color:"rgba(255,255,255,.75)", fontSize:13 }}>4 powerful tools to find gaps, steal traffic, and build an unbeatable SEO strategy.</p>
        </div>
      </div>

      {/* 4 tool cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16, marginBottom:26 }}>
        {tools.map(tool=>(
          <div key={tool.id} className="card ch" style={{ padding:"24px 26px", cursor:"pointer", border:`1px solid ${C.border}` }} onClick={()=>onNavigate&&onNavigate(tool.id)}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:14, marginBottom:16 }}>
              <div style={{ width:48, height:48, borderRadius:12, background:tool.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{tool.icon}</div>
              <div>
                <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:16, marginBottom:4 }}>{tool.title}</div>
                <div style={{ color:C.textMid, fontSize:12, lineHeight:1.6 }}>{tool.desc}</div>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:16 }}>
              {tool.stats.map(([label,val])=>(
                <div key={label} style={{ background:C.bg, borderRadius:8, padding:"10px 10px", textAlign:"center" }}>
                  <div className="sg" style={{ color:tool.color, fontWeight:800, fontSize:16 }}>{val}</div>
                  <div style={{ color:C.textDim, fontSize:10 }}>{label}</div>
                </div>
              ))}
            </div>
            <button style={{ background:tool.color, color:"#fff", border:"none", cursor:"pointer", padding:"10px 20px", borderRadius:9, fontSize:13, fontWeight:700, fontFamily:"inherit", width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
              {tool.cta} →
            </button>
          </div>
        ))}
      </div>

      {/* Recent competitor domains */}
      <div className="card" style={{ overflow:"hidden" }}>
        <div style={{ padding:"14px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center" }}>
          <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:14, flex:1 }}>Tracked Competitors</span>
          <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"6px 14px", borderRadius:7, fontSize:12, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", gap:5 }}>
            <Plus size={12}/> Add Competitor
          </button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 80px 120px 100px 100px 120px", padding:"9px 20px", background:C.bg, borderBottom:`1px solid ${C.border}` }}>
          {["DOMAIN","DR","TRAFFIC","KEYWORDS","CHANGE","ACTIONS"].map(h=>(
            <div key={h} style={{ color:C.textDim, fontSize:10, fontWeight:700, letterSpacing:.5 }}>{h}</div>
          ))}
        </div>
        {recentCompetitors.map((c,i)=>(
          <div key={i} className="td" style={{ display:"grid", gridTemplateColumns:"2fr 80px 120px 100px 100px 120px", padding:"13px 20px", borderBottom:i<recentCompetitors.length-1?`1px solid ${C.border}`:"none", alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:32, height:32, borderRadius:7, background:C.bluePale, display:"flex", alignItems:"center", justifyContent:"center" }}><Globe size={14} color={C.blueL}/></div>
              <span style={{ color:C.blueL, fontWeight:600, fontSize:13 }}>{c.domain}</span>
            </div>
            <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:14 }}>{c.dr}</span>
            <span style={{ color:C.text, fontSize:13 }}>{c.traffic}</span>
            <span style={{ color:C.text, fontSize:13 }}>{c.kws}</span>
            <span style={{ color:c.change.startsWith("+")?C.green:C.red, fontWeight:600, fontSize:13 }}>{c.change}</span>
            <div style={{ display:"flex", gap:6 }}>
              <button onClick={()=>onNavigate&&onNavigate("domain-overview")} style={{ background:C.bluePale, color:C.blueL, border:"none", cursor:"pointer", padding:"5px 10px", borderRadius:6, fontSize:11, fontWeight:700, fontFamily:"inherit" }}>Analyze</button>
              <button onClick={()=>onNavigate&&onNavigate("keyword-gap")} style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"5px 10px", borderRadius:6, fontSize:11, fontFamily:"inherit" }}>Gap</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RankTracking() {
  const [hasProject, setHasProject] = useState(true);
  const [showWizard, setShowWizard] = useState(false);
  const [project, setProject] = useState("seoengineboost.com");
  const [period, setPeriod] = useState("Last 30 days");
  const [engine, setEngine] = useState("🇵🇭 Nigeria");

  // Average position trend data
  const avgData = [
    {d:"Aug 1",pos:18},{d:"Aug 5",pos:16},{d:"Aug 8",pos:15},{d:"Aug 12",pos:13},
    {d:"Aug 15",pos:12},{d:"Aug 18",pos:13},{d:"Aug 19",pos:12.94},
  ];
  const pieData2 = [
    { name:"Top 3",  value:48,  fill:C.blueL },
    { name:"4-10",   value:166, fill:"#93C5FD" },
    { name:"11-20",  value:89,  fill:"#BFDBFE" },
    { name:"20+",    value:72,  fill:C.border },
  ];
  const tracked = [
    { kw:"Designer",   pos:12, prev:15, change:[[2,1,3,2,1,2,3]], vol:"3244", sd:31, url:"https://www.facebook.com/page" },
    { kw:"Designs",    pos:9,  prev:12, change:[[1,2,1,3,2,1,2]], vol:"1200", sd:31, url:"https://www.facebook.com/page" },
    { kw:"Design",     pos:34, prev:34, change:[[2,1,2,1,2,2,1]], vol:"335",  sd:31, url:"https://www.facebook.com/page" },
    { kw:"Designing",  pos:24, prev:28, change:[[3,2,1,2,3,2,1]], vol:"2357", sd:31, url:"https://www.facebook.com/page" },
  ];
  const serp = [
    { url:"http://wordpress.com/", page:44, bl:"20K", traffic:"135.93K", kws:900 },
    { url:"http://wordpress.org/", page:44, bl:"20K", traffic:"135.93K", kws:900 },
    { url:"http://wpbeginners.com/", page:44, bl:"20K", traffic:"135.93K", kws:900 },
    { url:"http://wordpress.com/", page:44, bl:"20K", traffic:"135.93K", kws:900 },
    { url:"http://wordpress.org/", page:44, bl:"20K", traffic:"135.93K", kws:900 },
    { url:"http://wpbeginners.com/", page:44, bl:"20K", traffic:"135.93K", kws:900 },
  ];

  if (showWizard) return <NewProjectWizard onDone={()=>setShowWizard(false)} />;

  // Empty state
  if (!hasProject) return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", padding:"16px 24px", background:C.bg }}>
      <div style={{ marginBottom:14 }}>
        <button onClick={()=>setShowWizard(true)} style={{ background:"transparent", border:`1px solid ${C.blueL}`, color:C.blueL, cursor:"pointer", padding:"7px 16px", borderRadius:7, fontSize:13, fontWeight:600, fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 }}>
          <Plus size={13}/> Add project
        </button>
      </div>
      <div style={{ background:`linear-gradient(135deg, ${C.blueL} 0%, #4F46E5 60%, #6366F1 100%)`, borderRadius:16, padding:"40px 48px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-40, top:-40, width:240, height:240, borderRadius:"50%", background:"rgba(255,255,255,0.07)" }}/>
        <div style={{ position:"absolute", right:60, bottom:-60, width:180, height:180, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
        <div style={{ position:"relative" }}>
          <h2 className="sg" style={{ color:"#fff", fontSize:20, fontWeight:800, marginBottom:8 }}>Create a project you can track<br/>and improve SEO traffic</h2>
          <p style={{ color:"rgba(255,255,255,.7)", fontSize:13, marginBottom:24 }}>Lorem ipsum dolor sit amet consectetur adipiscing</p>
          <button onClick={()=>setShowWizard(true)} style={{ background:"rgba(255,255,255,.18)", border:"1px solid rgba(255,255,255,.4)", color:"#fff", cursor:"pointer", padding:"10px 20px", borderRadius:9, fontSize:13, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", gap:8 }}>
            Add your first project <span style={{ width:26, height:26, borderRadius:"50%", border:"2px solid rgba(255,255,255,.5)", display:"inline-flex", alignItems:"center", justifyContent:"center" }}>⊕</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", padding:"16px 24px", background:C.bg }}>
      {/* Header bar */}
      <div className="card" style={{ padding:"12px 16px", marginBottom:16, display:"flex", alignItems:"center", gap:12 }}>
        <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:15 }}>Rank Tracking</span>
        <select value={project} onChange={e=>setProject(e.target.value)} style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:7, padding:"5px 10px", color:C.textMid, fontSize:12, fontFamily:"inherit" }}>
          <option>seoengineboost.com</option><option>dentalpro.com</option>
        </select>
        <button onClick={()=>setShowWizard(true)} style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.blueL, cursor:"pointer", padding:"5px 12px", borderRadius:7, fontSize:11, fontFamily:"inherit" }}>+ Edit project</button>
        <span style={{ color:C.textDim, fontSize:11, marginLeft:"auto" }}>Last fetched Aug 19, 2022</span>
      </div>

      {/* Filter row */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
        <span style={{ color:C.textDim, fontSize:12 }}>Showing rankings for:</span>
        <select value={period} onChange={e=>setPeriod(e.target.value)} style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:7, padding:"5px 10px", color:C.textMid, fontSize:12, fontFamily:"inherit" }}>
          <option>Last 30 days</option><option>Last 7 days</option><option>Last 90 days</option>
        </select>
        <select value={engine} onChange={e=>setEngine(e.target.value)} style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:7, padding:"5px 10px", color:C.textMid, fontSize:12, fontFamily:"inherit" }}>
          <option>🇵🇭 Nigeria</option><option>🇺🇸 USA</option><option>🇬🇧 UK</option>
        </select>
        <button onClick={()=>setHasProject(false)} style={{ marginLeft:"auto", background:"transparent", border:`1px solid ${C.border}`, color:C.textDim, cursor:"pointer", padding:"5px 12px", borderRadius:7, fontSize:11, fontFamily:"inherit" }}>← Empty State</button>
      </div>

      {/* Main 2-col: chart + right stats */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 180px", gap:16, marginBottom:16 }}>
        {/* Average Position */}
        <div className="card" style={{ padding:"16px 20px" }}>
          <div style={{ color:C.textDim, fontSize:12, marginBottom:4 }}>Average Position</div>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
            <span className="sg" style={{ color:C.text, fontSize:28, fontWeight:800 }}>12.94</span>
            <span style={{ color:C.red, fontSize:12, fontWeight:600 }}>▲</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            {/* Line chart */}
            <div>
              <ResponsiveContainer width="100%" height={140}>
                <LineChart data={avgData} margin={{top:4,right:4,left:-28,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                  <XAxis dataKey="d" tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
                  <YAxis reversed tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false} domain={[8,22]}/>
                  <Tooltip contentStyle={{background:C.white,border:`1px solid ${C.border}`,borderRadius:6,fontSize:10}} formatter={v=>[`#${v}`,""]}/>
                  <Line type="monotone" dataKey="pos" stroke={C.blueL} strokeWidth={2} dot={false}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Pie chart */}
            <div>
              <div style={{ color:C.textDim, fontSize:11, marginBottom:6 }}>Ranking Tracking</div>
              <ResponsiveContainer width="100%" height={130}>
                <RPieChart>
                  <Pie data={pieData2} cx="50%" cy="50%" outerRadius={55} dataKey="value" paddingAngle={2}>
                    {pieData2.map((e,i)=><Cell key={i} fill={e.fill}/>)}
                  </Pie>
                  <Tooltip contentStyle={{background:C.white,border:`1px solid ${C.border}`,borderRadius:6,fontSize:10}}/>
                </RPieChart>
              </ResponsiveContainer>
              <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
                {pieData2.map(d=>(
                  <div key={d.name} style={{ display:"flex", alignItems:"center", gap:5, fontSize:10 }}>
                    <div style={{ width:8,height:8,borderRadius:2,background:d.fill,flexShrink:0 }}/>
                    <span style={{ color:C.textMid }}>{d.name}</span>
                    <span style={{ color:C.text,fontWeight:700,marginLeft:"auto" }}>{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Right stats */}
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[
            { label:"Keywords Up", value:"0", sub:"4", c:C.green },
            { label:"Keywords down", value:"0", sub:"4", c:C.red },
            { label:"Keywords Unchanged", value:"0", sub:"4", c:C.textDim },
          ].map(s=>(
            <div key={s.label} className="card" style={{ padding:"12px 14px", flex:1, display:"flex", flexDirection:"column", justifyContent:"center" }}>
              <div style={{ color:C.textDim, fontSize:11, marginBottom:4 }}>{s.label}</div>
              <div className="sg" style={{ color:s.c, fontSize:24, fontWeight:800, lineHeight:1 }}>{s.value}</div>
              <div style={{ color:C.textDim, fontSize:10, marginTop:3 }}>↑ {s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tracked Keywords */}
      <div className="card" style={{ overflow:"hidden", marginBottom:16 }}>
        <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}` }}>
          <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:14 }}>Tracked Keywords</span>
        </div>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr style={{ background:C.bg }}>
            <th style={{ width:36, padding:"8px 10px", borderBottom:`1px solid ${C.border}` }}></th>
            {["Position","Keyword","Change","Vol","SD","URL"].map(h=>(
              <th key={h} style={{ padding:"8px 12px", textAlign:"left", color:C.textDim, fontSize:10, fontWeight:700, borderBottom:`1px solid ${C.border}` }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {tracked.map((r,i)=>(
              <tr key={i} className="td">
                <td style={{ padding:"10px 10px", borderBottom:`1px solid ${C.border}` }}>
                  <input type="checkbox" style={{ accentColor:C.blueL, cursor:"pointer" }}/>
                </td>
                <td style={{ padding:"10px 12px", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ background:r.pos<=10?C.greenL:r.pos<=20?C.bluePale:C.bg, color:r.pos<=10?C.green:r.pos<=20?C.blueL:C.textMid, fontWeight:700, fontSize:12, padding:"2px 8px", borderRadius:5 }}>{r.pos}</span>
                </td>
                <td style={{ padding:"10px 12px", color:C.text, fontSize:13, borderBottom:`1px solid ${C.border}` }}>{r.kw}</td>
                <td style={{ padding:"10px 12px", borderBottom:`1px solid ${C.border}` }}>
                  {/* Mini sparkline using inline bars */}
                  <div style={{ display:"flex", alignItems:"flex-end", gap:1, height:20 }}>
                    {[2,1,3,2,1,2,3].map((v,j)=>(
                      <div key={j} style={{ width:5, height:v*5+4, background:`${C.blueL}${50+j*20}`, borderRadius:1 }}/>
                    ))}
                  </div>
                </td>
                <td style={{ padding:"10px 12px", color:C.textMid, fontSize:12, borderBottom:`1px solid ${C.border}` }}>{r.vol}</td>
                <td style={{ padding:"10px 12px", color:C.textMid, fontSize:12, borderBottom:`1px solid ${C.border}` }}>{r.sd}</td>
                <td style={{ padding:"10px 12px", borderBottom:`1px solid ${C.border}` }}>
                  <a href="#" style={{ color:C.blueL, fontSize:11, textDecoration:"underline" }} onClick={e=>e.preventDefault()}>{r.url}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SERP Analysis */}
      <div className="card" style={{ overflow:"hidden" }}>
        <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center" }}>
          <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:14, flex:1 }}>SERP Analysis</span>
          <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.blueL, cursor:"pointer", padding:"5px 12px", borderRadius:6, fontSize:11, fontFamily:"inherit" }}>View all</button>
        </div>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr style={{ background:C.bg }}>
            {["","URL","Page","Backlinks","Search Traffic","Keywords"].map(h=>(
              <th key={h} style={{ padding:"8px 12px", textAlign:"left", color:C.textDim, fontSize:10, fontWeight:700, borderBottom:`1px solid ${C.border}` }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {serp.map((r,i)=>(
              <tr key={i} className="td">
                <td style={{ padding:"9px 12px", color:C.textDim, fontSize:12, borderBottom:`1px solid ${C.border}` }}>{i+1}.</td>
                <td style={{ padding:"9px 12px", borderBottom:`1px solid ${C.border}` }}>
                  <a href="#" style={{ color:C.blueL, fontSize:12, textDecoration:"underline" }} onClick={e=>e.preventDefault()}>{r.url}</a>
                </td>
                <td style={{ padding:"9px 12px", color:C.textMid, fontSize:12, borderBottom:`1px solid ${C.border}` }}>{r.page}</td>
                <td style={{ padding:"9px 12px", color:C.textMid, fontSize:12, borderBottom:`1px solid ${C.border}` }}>{r.bl}</td>
                <td style={{ padding:"9px 12px", color:C.textMid, fontSize:12, borderBottom:`1px solid ${C.border}` }}>{r.traffic}</td>
                <td style={{ padding:"9px 12px", color:C.textMid, fontSize:12, borderBottom:`1px solid ${C.border}` }}>{r.kws}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Calendar Screen ───────────────────────────────────────────────────
function CalendarView() {
  const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const events={2:[{l:"Team Sync",c:C.blueL}],5:[{l:"Client Call",c:C.orange}],7:[{l:"Q2 Launch",c:C.green}],10:[{l:"Content Due",c:C.red}],14:[{l:"SEO Report",c:C.green}],18:[{l:"Team Meeting",c:C.purple}],21:[{l:"Client Review",c:C.yellow}],25:[{l:"Blog Batch",c:C.blueL}],28:[{l:"Sprint Retro",c:C.orange}]};
  const [tab, setTab] = useState("calendar");
  const [showMeetingAI, setShowMeetingAI] = useState(false);
  const [aiSummaryLoading, setAiSummaryLoading] = useState(false);
  const [aiSummaryDone, setAiSummaryDone] = useState(false);

  const meetings = [
    { title:"Q2 SEO Strategy Sync", date:"Today 10:00 AM", attendees:["Mahmoud","Aisha","Sam"], duration:"45 min", status:"upcoming", type:"Internal" },
    { title:"Dental Pro Monthly Review", date:"Today 2:00 PM", attendees:["Dr. Maria Santos","You"], duration:"30 min", status:"upcoming", type:"Client Call" },
    { title:"TechFlow Onboarding",  date:"May 12, 9:00 AM", attendees:["Samuel Chen","Aisha","You"], duration:"60 min", status:"scheduled", type:"Client Call" },
    { title:"Team Sprint Retro",    date:"May 14, 3:00 PM", attendees:["All Team"], duration:"30 min", status:"scheduled", type:"Internal" },
  ];

  const pastMeeting = {
    title: "Dental Pro April Review",
    date: "Apr 28, 2:00 PM",
    duration: "32 min",
    attendees: ["Dr. Maria Santos","You"],
    rawNotes: "Client happy with rankings improvement. Asked about backlink building strategy. Wants monthly report by 1st. Budget discussion: willing to upgrade to Pro for white-label reports. Action items: send proposal by May 5, schedule follow-up May 15.",
    aiSummary: [
      { type:"✅ Decision",   text:"Client approved upgrade to Pro plan for white-label reports." },
      { type:"📋 Action Item", text:"Send Pro plan proposal by May 5. Owner: You." },
      { type:"📋 Action Item", text:"Schedule May 15 follow-up call. Owner: You." },
      { type:"📈 Insight",    text:"Client satisfaction high — rankings improved +18% this month." },
      { type:"⚠️ Risk",       text:"Budget sensitive — position upgrade as ROI, not cost." },
    ],
    tasks: [
      { t:"Send Pro plan proposal", assign:"You", due:"May 5", pri:"high" },
      { t:"Schedule follow-up call for May 15", assign:"You", due:"May 3", pri:"medium" },
      { t:"Generate April white-label report", assign:"Aisha", due:"May 1", pri:"high" },
    ]
  };

  return (
    <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)",background:C.bg}}>
      {/* Header tabs */}
      <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"0 24px",display:"flex",alignItems:"center",gap:0}}>
        {[["calendar","📅 Calendar"],["meetings","🎙 Meetings"],["notes","📝 AI Meeting Notes"]].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{padding:"12px 18px",border:"none",borderBottom:tab===id?`2.5px solid ${C.blueL}`:"2.5px solid transparent",cursor:"pointer",fontSize:13,fontWeight:tab===id?700:500,fontFamily:"inherit",background:"transparent",color:tab===id?C.blueL:C.textMid,marginBottom:-1}}>{label}</button>
        ))}
        <div style={{marginLeft:"auto",display:"flex",gap:6,padding:"8px 0"}}>
          <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"7px 14px",borderRadius:7,fontSize:12,fontWeight:700,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}>
            <Plus size={12}/> Schedule Meeting
          </button>
        </div>
      </div>

      {/* Calendar tab */}
      {tab==="calendar" && (
        <div style={{display:"flex",height:"calc(100% - 49px)"}}>
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
            {meetings.slice(0,3).map(({title,date,attendees,type},i)=>{
              const c=type==="Client Call"?C.orange:C.blueL;
              return (
                <div key={i} style={{background:C.bg,borderLeft:`3px solid ${c}`,border:`1px solid ${C.border}`,borderRadius:10,padding:"11px 12px",marginBottom:9}}>
                  <span className="chip" style={{color:c,background:`${c}18`,marginBottom:5,display:"inline-flex"}}>{type.toUpperCase()}</span>
                  <div style={{color:C.text,fontSize:12.5,fontWeight:600,marginBottom:3}}>{title}</div>
                  <div style={{display:"flex",gap:5,color:C.textDim,fontSize:11,alignItems:"center"}}><Clock size={10}/>{date}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Meetings tab */}
      {tab==="meetings" && (
        <div style={{padding:"20px 24px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
            {[
              {l:"Meetings This Week", v:"4",  c:C.blueL,  icon:Calendar},
              {l:"Client Calls",       v:"2",  c:C.orange, icon:Phone},
              {l:"Actions Generated",  v:"8",  c:C.green,  icon:CheckSquare},
            ].map(({l,v,c,icon:Icon})=>(
              <div key={l} className="card" style={{padding:"14px 18px"}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
                  <div style={{width:28,height:28,borderRadius:7,background:`${c}18`,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={13} color={c}/></div>
                  <span style={{color:C.textDim,fontSize:11}}>{l}</span>
                </div>
                <div className="sg" style={{color:C.text,fontSize:22,fontWeight:800}}>{v}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{overflow:"hidden"}}>
            <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`}}>
              <span className="sg" style={{color:C.text,fontWeight:700,fontSize:14}}>All Meetings</span>
            </div>
            {meetings.map((m,i)=>(
              <div key={i} className="td" style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:40,height:40,borderRadius:10,background:m.type==="Client Call"?C.orangeL:C.bluePale,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {m.type==="Client Call"?<Phone size={16} color={C.orange}/>:<Users size={16} color={C.blueL}/>}
                </div>
                <div style={{flex:1}}>
                  <div style={{color:C.text,fontWeight:700,fontSize:14,marginBottom:2}}>{m.title}</div>
                  <div style={{display:"flex",gap:10}}>
                    <span style={{color:C.textDim,fontSize:11}}><Clock size={10}/> {m.date}</span>
                    <span style={{color:C.textDim,fontSize:11}}>· {m.duration}</span>
                    <span style={{color:C.textDim,fontSize:11}}>· {m.attendees.join(", ")}</span>
                  </div>
                </div>
                <span className="chip" style={{color:m.status==="upcoming"?C.green:C.blueL,background:m.status==="upcoming"?C.greenL:C.bluePale}}>{m.status}</span>
                <div style={{display:"flex",gap:6}}>
                  <button style={{background:C.bluePale,color:C.blueL,border:"none",cursor:"pointer",padding:"6px 12px",borderRadius:6,fontSize:11,fontWeight:700,fontFamily:"inherit"}}>Join</button>
                  <button onClick={()=>setTab("notes")} style={{background:C.bg,border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",padding:"6px 10px",borderRadius:6,fontSize:11,fontFamily:"inherit"}}>Notes →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Meeting Notes tab */}
      {tab==="notes" && (
        <div style={{padding:"20px 24px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
            {/* Left: raw notes + AI trigger */}
            <div>
              <div className="card" style={{padding:20,marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                  <div style={{width:32,height:32,borderRadius:8,background:C.orangeL,display:"flex",alignItems:"center",justifyContent:"center"}}><Phone size={14} color={C.orange}/></div>
                  <div>
                    <div style={{color:C.text,fontWeight:700,fontSize:14}}>{pastMeeting.title}</div>
                    <div style={{color:C.textDim,fontSize:11}}>{pastMeeting.date} · {pastMeeting.duration} · {pastMeeting.attendees.join(", ")}</div>
                  </div>
                </div>
                <div style={{color:C.textDim,fontSize:11,fontWeight:700,marginBottom:6,textTransform:"uppercase",letterSpacing:.8}}>Meeting Notes</div>
                <textarea defaultValue={pastMeeting.rawNotes} style={{width:"100%",minHeight:120,background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px",color:C.text,fontSize:12,fontFamily:"inherit",outline:"none",resize:"vertical",lineHeight:1.65}}/>
                <button
                  onClick={()=>{setAiSummaryLoading(true);setTimeout(()=>{setAiSummaryLoading(false);setAiSummaryDone(true);},1800);}}
                  disabled={aiSummaryLoading}
                  style={{marginTop:12,width:"100%",background:`linear-gradient(135deg,${C.blue},${C.blueL})`,color:"#fff",border:"none",cursor:"pointer",padding:"10px",borderRadius:9,fontSize:13,fontWeight:700,fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                  <Bot size={14}/> {aiSummaryLoading?"🔄 AI Summarizing...":"✨ Generate AI Summary & Tasks"}
                </button>
              </div>
            </div>

            {/* Right: AI summary output */}
            <div>
              {!aiSummaryDone && !aiSummaryLoading && (
                <div className="card" style={{padding:24,textAlign:"center"}}>
                  <div style={{fontSize:40,marginBottom:12}}>🤖</div>
                  <div className="sg" style={{color:C.text,fontWeight:700,fontSize:15,marginBottom:8}}>AI Meeting Intelligence</div>
                  <p style={{color:C.textMid,fontSize:13,lineHeight:1.65}}>Click "Generate AI Summary" to automatically extract decisions, action items, risks, and insights — then create tasks with one click.</p>
                </div>
              )}
              {aiSummaryLoading && (
                <div className="card" style={{padding:24,textAlign:"center"}}>
                  <div style={{fontSize:40,marginBottom:12}}>⚡</div>
                  <div className="sg" style={{color:C.blueL,fontWeight:700,fontSize:15,marginBottom:8}}>AI is processing your meeting...</div>
                  <div style={{display:"flex",gap:6,justifyContent:"center"}}>
                    {["Transcribing","Extracting decisions","Creating tasks"].map((s,i)=>(
                      <span key={i} className="chip" style={{color:C.blueL,background:C.bluePale,fontSize:10}}>{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {aiSummaryDone && (
                <>
                  <div className="card" style={{padding:18,marginBottom:14}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                      <Bot size={16} color={C.blueL}/>
                      <span className="sg" style={{color:C.blueL,fontWeight:700,fontSize:14}}>AI Summary</span>
                      <span className="chip" style={{color:C.green,background:C.greenL,marginLeft:"auto"}}>✓ Generated</span>
                    </div>
                    {pastMeeting.aiSummary.map((s,i)=>(
                      <div key={i} style={{display:"flex",gap:10,padding:"9px 0",borderBottom:i<pastMeeting.aiSummary.length-1?`1px solid ${C.border}`:"none"}}>
                        <span style={{fontSize:14,flexShrink:0}}>{s.type.split(" ")[0]}</span>
                        <div>
                          <span style={{color:C.textDim,fontSize:10,fontWeight:700}}>{s.type.substring(2)} </span>
                          <span style={{color:C.text,fontSize:12}}>{s.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="card" style={{padding:18}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                      <CheckSquare size={14} color={C.green}/>
                      <span className="sg" style={{color:C.text,fontWeight:700,fontSize:13}}>Auto-Created Tasks ({pastMeeting.tasks.length})</span>
                      <button style={{marginLeft:"auto",background:C.green,color:"#fff",border:"none",cursor:"pointer",padding:"5px 12px",borderRadius:6,fontSize:11,fontWeight:700,fontFamily:"inherit"}}>Add All to Board</button>
                    </div>
                    {pastMeeting.tasks.map((t,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:i<pastMeeting.tasks.length-1?`1px solid ${C.border}`:"none"}}>
                        <input type="checkbox" defaultChecked style={{accentColor:C.blueL}}/>
                        <span style={{flex:1,color:C.text,fontSize:12}}>{t.t}</span>
                        <PriBadge p={t.pri}/>
                        <span style={{color:C.textDim,fontSize:11}}>{t.assign}</span>
                        <span style={{color:C.orange,fontSize:11,fontWeight:600}}>{t.due}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Pricing Page ───────────────────────────────────────────────────────
function PricingPage({ goBack, currentPlan, onSelectPlan }) {
  const [billing, setBilling] = useState("monthly");
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const tiers = [
    {
      id:"free", name:"Free", mo:0, yr:0, badge:null, color:C.textDim,
      desc:"Perfect for testing. Real value, real limits.",
      cta:"Current Plan", current: currentPlan==="free",
      limits:["1 project","25 pages/crawl","20 keywords","10 AI credits/mo","Basic audit","Community support"],
      features:{ "SEO Audit":"3/month","Rank Tracking":"20 keywords","Competitor Research":"1 domain","AI Credits":"10","Team Members":"1","Client Reports":"No","White-label":"No","API Access":"No" }
    },
    {
      id:"starter", name:"Starter", mo:29, yr:22, badge:null, color:C.blueL,
      desc:"For freelancers and solo SEO pros building momentum.",
      cta:"Start Free Trial",
      limits:["5 projects","5,000 pages/crawl","500 keywords","200 AI credits/mo","Client dashboards","Basic automations"],
      features:{ "SEO Audit":"Unlimited","Rank Tracking":"500 keywords","Competitor Research":"5 domains","AI Credits":"200","Team Members":"2","Client Reports":"Basic PDF","White-label":"No","API Access":"No" }
    },
    {
      id:"pro", name:"Pro", mo:79, yr:59, badge:"MOST POPULAR", color:C.orange, popular:true,
      desc:"Everything agencies need to manage clients at scale.",
      cta:"Get Pro — Most Popular",
      limits:["20 projects","50,000 pages/crawl","5,000 keywords","2,000 AI credits/mo","White-label reports","Advanced automations","Team collaboration"],
      features:{ "SEO Audit":"Unlimited","Rank Tracking":"5,000 keywords","Competitor Research":"Unlimited","AI Credits":"2,000","Team Members":"10","Client Reports":"White-label PDF","White-label":"Full","API Access":"Read-only" }
    },
    {
      id:"agency", name:"Agency", mo:199, yr:149, badge:"BEST FOR TEAMS", color:C.purple,
      desc:"Full power for large agencies running dozens of clients.",
      cta:"Start Agency Trial",
      limits:["Unlimited projects","Unlimited crawl","Unlimited keywords","9,999 AI credits/mo","Full API access","Dedicated support","Custom AI models"],
      features:{ "SEO Audit":"Unlimited","Rank Tracking":"Unlimited","Competitor Research":"Unlimited","AI Credits":"9,999","Team Members":"50","Client Reports":"Custom branded","White-label":"Custom domain","API Access":"Full" }
    },
    {
      id:"enterprise", name:"Enterprise", mo:null, yr:null, badge:"CUSTOM", color:"#0A1628",
      desc:"For large enterprises with custom compliance and scale needs.",
      cta:"Contact Sales",
      limits:["Everything in Agency","SSO / SAML","Audit logs","Custom SLAs","Dedicated CSM","Onboarding & training"],
      features:{ "SEO Audit":"Unlimited","Rank Tracking":"Unlimited","Competitor Research":"Unlimited","AI Credits":"Custom","Team Members":"Unlimited","Client Reports":"Full custom","White-label":"Enterprise","API Access":"Full + Webhooks" }
    },
  ];
  const featureRows = ["SEO Audit","Rank Tracking","Competitor Research","AI Credits","Team Members","Client Reports","White-label","API Access"];

  return (
    <div style={{ minHeight:"100vh",background:"#F8FAFC",overflowY:"auto" }}>
      {/* Topnav */}
      <nav style={{ background:"#fff",borderBottom:"1px solid #E5E7EB",padding:"0 40px",display:"flex",alignItems:"center",height:56,position:"sticky",top:0,zIndex:50 }}>
        <div style={{ display:"flex",alignItems:"center",gap:8,marginRight:36,cursor:"pointer" }} onClick={goBack}>
          <div style={{ width:28,height:28,borderRadius:6,background:`linear-gradient(135deg,${C.orange},${C.blueL})`,display:"flex",alignItems:"center",justifyContent:"center" }}><Zap size={15} color="#fff" fill="#fff"/></div>
          <span className="sg" style={{ color:C.text,fontWeight:800,fontSize:15 }}>Boostly</span>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:24,flex:1 }}>
          {["Tools","Pricing","Results","Training","Consulting","Contact"].map(l=>(
            <span key={l} style={{ color:l==="Pricing"?C.blueL:C.textMid,fontSize:13,fontWeight:l==="Pricing"?700:500,cursor:"pointer" }}>{l}</span>
          ))}
        </div>
        <div style={{ display:"flex",gap:8,alignItems:"center" }}>
          {currentPlan&&<PlanBadge plan={currentPlan}/>}
          <button onClick={goBack} style={{ background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"7px 16px",borderRadius:7,fontSize:12,fontWeight:600,fontFamily:"inherit" }}>← Back to App</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding:"56px 40px 40px",maxWidth:1100,margin:"0 auto",textAlign:"center" }}>
        <div style={{ display:"inline-flex",alignItems:"center",gap:6,background:C.bluePale,border:`1px solid ${C.blueL}22`,borderRadius:20,padding:"5px 16px",marginBottom:16 }}>
          <span style={{ color:C.blueL,fontSize:12,fontWeight:700 }}>🚀 Replace SEMrush + Slack + Trello + CRM — all in one platform</span>
        </div>
        <h1 className="sg" style={{ fontSize:40,fontWeight:900,color:C.text,marginBottom:12 }}>Simple, transparent pricing</h1>
        <p style={{ color:C.textMid,fontSize:16,marginBottom:8 }}>Start free. Upgrade when you scale. Cancel anytime.</p>
        <p style={{ color:C.textDim,fontSize:13,marginBottom:32 }}>Join 10,000+ agencies and freelancers already using Boostly</p>
        {/* Billing toggle */}
        <div style={{ display:"flex",justifyContent:"center",marginBottom:40 }}>
          <div style={{ display:"flex",background:"#F3F4F6",borderRadius:8,padding:4,gap:2,position:"relative" }}>
            {["monthly","yearly"].map(b=>(
              <button key={b} onClick={()=>setBilling(b)} style={{ padding:"9px 28px",border:"none",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"inherit",borderRadius:6,background:billing===b?"#fff":"transparent",color:billing===b?C.text:"#6B7280",boxShadow:billing===b?"0 1px 4px rgba(0,0,0,.1)":"none",transition:"all .2s" }}>
                {b==="monthly"?"Monthly":"Yearly"}{b==="yearly"&&<span style={{ marginLeft:6,background:"#DCFCE7",color:"#15803D",fontSize:10,fontWeight:800,padding:"2px 7px",borderRadius:20 }}>Save 25%</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Plan cards */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14,marginBottom:56 }}>
          {tiers.map(tier=>{
            const price = billing==="monthly"?tier.mo:tier.yr;
            const isActive = currentPlan===tier.id;
            const isHovered = hoveredPlan===tier.id;
            return (
              <div key={tier.id}
                onMouseEnter={()=>setHoveredPlan(tier.id)}
                onMouseLeave={()=>setHoveredPlan(null)}
                style={{ background:"#fff",border:`${tier.popular||isHovered?"2":"1"}px solid ${tier.popular?C.orange:isHovered?C.blueL:"#E2E8F0"}`,borderRadius:16,padding:"22px 18px",position:"relative",cursor:"pointer",transition:"all .2s",boxShadow:tier.popular?"0 6px 24px rgba(249,115,22,.15)":isHovered?"0 4px 16px rgba(37,99,235,.1)":"0 1px 4px rgba(0,0,0,.05)",transform:tier.popular?"translateY(-6px)":"none" }}>
                {tier.badge&&<div style={{ position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:tier.popular?C.orange:C.purple,color:"#fff",fontSize:9,fontWeight:800,padding:"4px 12px",borderRadius:20,whiteSpace:"nowrap" }}>{tier.badge}</div>}
                <div style={{ display:"flex",justifyContent:"center",marginBottom:10 }}>
                  <span style={{ background:`${tier.color}18`,color:tier.color,fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20 }}>{tier.name}</span>
                </div>
                <div style={{ textAlign:"center",marginBottom:12 }}>
                  {tier.mo===null
                    ? <div className="sg" style={{ fontSize:22,fontWeight:800,color:C.text }}>Custom</div>
                    : <>
                        <span className="sg" style={{ fontSize:34,fontWeight:900,color:tier.popular?C.orange:C.text }}>${price}</span>
                        <span style={{ color:C.textDim,fontSize:12 }}>/mo</span>
                        {billing==="yearly"&&tier.mo>0&&<div style={{ color:C.green,fontSize:10,fontWeight:600 }}>Save ${(tier.mo-tier.yr)*12}/yr</div>}
                      </>
                  }
                </div>
                <p style={{ color:C.textMid,fontSize:11,lineHeight:1.5,marginBottom:14,textAlign:"center",minHeight:40 }}>{tier.desc}</p>
                <button onClick={()=>{if(onSelectPlan)onSelectPlan(tier.id);goBack&&goBack();}} style={{ width:"100%",padding:"9px 0",fontSize:12,borderRadius:8,border:`${isActive?"2":"1"}px solid ${tier.popular?C.orange:isActive?C.green:C.blueL}`,background:tier.popular?`linear-gradient(135deg,${C.orange},#EA580C)`:isActive?C.greenL:"transparent",color:tier.popular?"#fff":isActive?C.green:C.blueL,cursor:"pointer",fontFamily:"inherit",fontWeight:700,marginBottom:14 }}>
                  {isActive?"✓ Current Plan":tier.cta}
                </button>
                <div style={{ borderTop:`1px solid ${C.border}`,paddingTop:12 }}>
                  {tier.limits.map(f=>(
                    <div key={f} style={{ display:"flex",alignItems:"flex-start",gap:6,marginBottom:6 }}>
                      <div style={{ width:14,height:14,borderRadius:"50%",background:`${tier.color}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1 }}>
                        <Check size={8} color={tier.color} strokeWidth={3}/>
                      </div>
                      <span style={{ color:C.textMid,fontSize:11,lineHeight:1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature comparison table */}
        <div style={{ background:"#fff",border:`1px solid ${C.border}`,borderRadius:16,overflow:"hidden",marginBottom:48 }}>
          <div style={{ padding:"18px 24px",borderBottom:`1px solid ${C.border}` }}>
            <h2 className="sg" style={{ color:C.text,fontSize:18,fontWeight:800 }}>Full feature comparison</h2>
          </div>
          <table style={{ width:"100%",borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:C.bg }}>
                <th style={{ padding:"12px 20px",textAlign:"left",color:C.textDim,fontSize:11,fontWeight:700,borderBottom:`1px solid ${C.border}`,width:"25%" }}>Feature</th>
                {tiers.map(t=>(
                  <th key={t.id} style={{ padding:"12px 12px",textAlign:"center",borderBottom:`1px solid ${C.border}`,width:"15%" }}>
                    <span style={{ color:t.color,fontSize:12,fontWeight:700 }}>{t.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureRows.map((feat,i)=>(
                <tr key={feat} style={{ background:i%2===0?"#fff":C.bg }}>
                  <td style={{ padding:"11px 20px",color:C.text,fontSize:12,fontWeight:600,borderBottom:`1px solid ${C.border}` }}>{feat}</td>
                  {tiers.map(t=>(
                    <td key={t.id} style={{ padding:"11px 12px",textAlign:"center",borderBottom:`1px solid ${C.border}` }}>
                      <span style={{ color:C.textMid,fontSize:11 }}>{t.features[feat]||"—"}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Usage-based limits explainer */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:48 }}>
          {[
            { icon:"⚡",title:"AI Credits",desc:"Each AI action (audit report, keyword suggestion, content generation) uses 1 credit. Roll over unused credits each month on Pro+." },
            { icon:"📊",title:"Soft Limits",desc:"Hit your limit? We give you a 10% grace period before asking you to upgrade — because growth shouldn't be punished." },
            { icon:"🔒",title:"Preview Locked Features",desc:"Every locked feature shows you exactly what you're getting before you pay. No surprises. No mystery boxes." },
          ].map(c=>(
            <div key={c.title} style={{ background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"20px 22px",textAlign:"left" }}>
              <div style={{ fontSize:28,marginBottom:10 }}>{c.icon}</div>
              <div style={{ color:C.text,fontWeight:700,fontSize:14,marginBottom:6 }}>{c.title}</div>
              <p style={{ color:C.textMid,fontSize:12,lineHeight:1.65 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div style={{ background:`linear-gradient(135deg,${C.blue},${C.blueL})`,borderRadius:16,padding:"36px 40px",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:40 }}>
          <div style={{ textAlign:"left" }}>
            <div className="sg" style={{ color:"#fff",fontSize:22,fontWeight:800,marginBottom:6 }}>Replace 5 tools with one platform</div>
            <p style={{ color:"rgba(255,255,255,.8)",fontSize:13 }}>SEMrush + Slack + Trello + CRM + Invoicing — all at a fraction of the cost</p>
          </div>
          <button onClick={()=>{if(onSelectPlan)onSelectPlan("pro");goBack&&goBack();}} style={{ background:"#fff",color:C.blueL,border:"none",cursor:"pointer",padding:"12px 28px",borderRadius:10,fontSize:14,fontWeight:800,fontFamily:"inherit",flexShrink:0 }}>
            Start Free Trial →
          </button>
        </div>
        <p style={{ color:C.textDim,fontSize:12,textAlign:"center" }}>No credit card required for free plan. Starter/Pro: 14-day free trial. Cancel anytime.</p>
      </section>
    </div>
  );
}

// ── CrawlDashboard ───────────────────────────────────────────────────
function CrawlDashboard({ onNavigate }) {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [country, setCountry] = useState("🇵🇭 PHL");
  const [showCreate, setShowCreate] = useState(false);
  const projects = [
    { name:"seoengineboost.com", domain:"seoengineboost.com", health:82, rankChange:"no change", status:"active" },
    { name:"dentalpro.com", domain:"dentalpro.com", health:900, rankChange:"no change", status:"active" },
  ];
  const tools = ["Site Health","Position Tracking","On-page SEO Checker","Social Media Tools","Social Media Post","Brand Monitoring","Backlink Audits","Building Links","PPC Keyword Tool","Organic Traffic","Social Direct","Content Analyzer"];
  if (showCreate) {
    return <NewProjectWizard onDone={() => setShowCreate(false)} />;
  }
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg }}>
      {/* Search bar */}
      <div style={{ padding:"10px 20px", background:C.white, borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ flex:1, display:"flex", alignItems:"center", gap:8, background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 14px" }}>
          <Search size={14} color={C.textDim}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Enter Url, domain or keyword" style={{ background:"transparent", border:"none", outline:"none", color:C.text, fontSize:13, fontFamily:"inherit", flex:1 }}/>
        </div>
        <select value={country} onChange={e=>setCountry(e.target.value)} style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 12px", color:C.text, fontSize:13, fontFamily:"inherit", cursor:"pointer" }}>
          <option>🇵🇭 PHL</option><option>🇺🇸 USA</option><option>🇬🇧 GBR</option><option>🇳🇬 NGR</option>
        </select>
        <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"9px 24px", borderRadius:8, fontSize:13, fontWeight:700, fontFamily:"inherit" }}>Search</button>
      </div>

      {/* Hero gradient banner */}
      <div style={{ margin:"16px 20px", borderRadius:16, overflow:"hidden", height:180, position:"relative", background:"linear-gradient(135deg, #3B5EF5 0%, #6B4FE8 40%, #F97316 80%, #FB923C 100%)" }}>
        {/* Diamond pattern overlay */}
        <svg style={{ position:"absolute", right:0, top:0, height:"100%", opacity:0.25 }} viewBox="0 0 400 180" preserveAspectRatio="xMaxYMid slice">
          {Array.from({length:8}).map((_,row)=>Array.from({length:12}).map((_,col)=>(
            <rect key={`${row}-${col}`} x={col*40-row*10} y={row*28-10} width={20} height={20} transform={`rotate(45,${col*40-row*10+10},${row*28})`} fill="white"/>
          )))}
        </svg>
        <div style={{ position:"relative", padding:"32px 36px", color:"#fff" }}>
          <div className="sg" style={{ fontSize:22, fontWeight:800, marginBottom:6 }}>Boostly SEO Platform</div>
          <div style={{ fontSize:14, opacity:0.85, marginBottom:18, maxWidth:400 }}>All-in-one SEO toolkit — audit, track, research and grow your organic traffic faster.</div>
          <div style={{ display:"flex", gap:10 }}>
            <button style={{ background:"rgba(255,255,255,.2)", border:"1px solid rgba(255,255,255,.4)", color:"#fff", cursor:"pointer", padding:"7px 18px", borderRadius:8, fontSize:12, fontWeight:700, fontFamily:"inherit" }} onClick={()=>onNavigate&&onNavigate("siteaudit")}>Run Audit</button>
            <button style={{ background:"rgba(255,255,255,.2)", border:"1px solid rgba(255,255,255,.4)", color:"#fff", cursor:"pointer", padding:"7px 18px", borderRadius:8, fontSize:12, fontWeight:700, fontFamily:"inherit" }} onClick={()=>onNavigate&&onNavigate("keyword")}>Keyword Research</button>
          </div>
        </div>
      </div>

      {/* AI Executive Assistant Alerts */}
      <div style={{ margin:"0 20px 14px", display:"flex", flexDirection:"column", gap:8 }}>
        {[
          { icon:"🔴", type:"Revenue Risk",    msg:"2 clients (FitLife, Bloom) inactive this month — possible churn.",   action:"Schedule Retention Meeting", c:C.red,    bg:C.redL },
          { icon:"⚠️", type:"Delayed Task",    msg:"SEO audit for TechFlow pending 5 days — recommend prioritizing.",    action:"Assign Now",                  c:C.orange, bg:C.orangeL },
          { icon:"🚀", type:"Growth Signal",   msg:"3 keywords entered top 10 this week — great moment to upsell Pro.",  action:"View Keywords",              c:C.green,  bg:C.greenL },
        ].map((a,i)=>(
          <div key={i} style={{ background:a.bg, border:`1px solid ${a.c}33`, borderRadius:10, padding:"10px 16px", display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:16 }}>{a.icon}</span>
            <span style={{ color:a.c, fontWeight:700, fontSize:12, flexShrink:0 }}>{a.type}:</span>
            <span style={{ color:C.text, fontSize:12, flex:1 }}>{a.msg}</span>
            <button style={{ background:a.c, color:"#fff", border:"none", cursor:"pointer", padding:"5px 12px", borderRadius:6, fontSize:11, fontWeight:700, fontFamily:"inherit", flexShrink:0 }}>{a.action}</button>
          </div>
        ))}
      </div>
      {/* My Projects */}
      <div style={{ margin:"0 20px 20px", background:C.white, border:`1px solid ${C.border}`, borderRadius:14, overflow:"hidden" }}>
        <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:10 }}>
          <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:15, flex:1 }}>My Projects</span>
          <span style={{ color:C.textDim, fontSize:12, marginRight:6 }}>Tags ∨</span>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:C.bg, border:`1px solid ${C.border}`, borderRadius:7, padding:"5px 10px" }}>
            <Search size={11} color={C.textDim}/>
            <input placeholder="Enter Project, Url or keyword" style={{ background:"transparent", border:"none", outline:"none", color:C.textMid, fontSize:11, width:180, fontFamily:"inherit" }}/>
          </div>
          <button style={{ background:C.bg, border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"6px 12px", borderRadius:7, fontSize:12, fontFamily:"inherit" }}>Search</button>
          <button onClick={()=>setShowCreate(true)} style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"7px 14px", borderRadius:7, fontSize:12, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", gap:5 }}>
            <Plus size={12}/> Create Project
          </button>
        </div>
        {/* Tabs */}
        <div style={{ padding:"0 16px", borderBottom:`1px solid ${C.border}`, display:"flex", gap:0 }}>
          {[["all","All (2)"],["own","My Own (2)"],["shared","Shared (0)"]].map(([id,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={{ background:"none", border:"none", borderBottom:tab===id?`2px solid ${C.blueL}`:"2px solid transparent", color:tab===id?C.blueL:C.textDim, cursor:"pointer", padding:"9px 16px", fontSize:12, fontWeight:tab===id?700:500, fontFamily:"inherit" }}>{label}</button>
          ))}
        </div>
        {/* Table */}
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:900 }}>
            <thead>
              <tr style={{ background:C.bg }}>
                <th style={{ padding:"9px 14px", textAlign:"left", color:C.textDim, fontSize:10, fontWeight:700, borderBottom:`1px solid ${C.border}`, whiteSpace:"nowrap", minWidth:140 }}>Project</th>
                {tools.map(t=>(
                  <th key={t} style={{ padding:"9px 8px", textAlign:"center", color:C.textDim, fontSize:9, fontWeight:700, borderBottom:`1px solid ${C.border}`, maxWidth:80, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{t}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p,i)=>(
                <tr key={i} className="td">
                  <td style={{ padding:"12px 14px", borderBottom:`1px solid ${C.border}` }}>
                    <div style={{ color:C.text, fontWeight:700, fontSize:13 }}>{p.name}</div>
                    <div style={{ color:C.textDim, fontSize:11 }}>{p.domain}</div>
                    <div style={{ color:p.rankChange==="no change"?C.textDim:C.green, fontSize:10, marginTop:2 }}>
                      <span style={{ background:`${C.border}`, padding:"1px 6px", borderRadius:4, marginRight:4 }}>{p.health}</span>
                      {p.rankChange}
                    </div>
                  </td>
                  {tools.map(t=>(
                    <td key={t} style={{ padding:"12px 8px", textAlign:"center", borderBottom:`1px solid ${C.border}` }}>
                      <span style={{ color:C.blueL, fontSize:11, fontWeight:600, cursor:"pointer" }} className="hl">Set Up</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── New Project Wizard ────────────────────────────────────────────────
function NewProjectWizard({ onDone }) {
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const wizardCard = (title, subtitle, children) => (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg, display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"18px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <h2 className="sg" style={{ color:C.text, fontSize:20, fontWeight:800 }}>New Project</h2>
        <div style={{ display:"flex", gap:8 }}>
          {[1,2,3].map(s=>(
            <div key={s} style={{ width:28, height:6, borderRadius:3, background:step>=s?C.blueL:C.border }}/>
          ))}
        </div>
      </div>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 24px 24px" }}>
        <div style={{ width:"100%", maxWidth:700, background:`linear-gradient(135deg, ${C.blueL} 0%, #4F46E5 60%, #6366F1 100%)`, borderRadius:18, padding:"48px 52px", position:"relative", overflow:"hidden" }}>
          {/* Decorative circle */}
          <div style={{ position:"absolute", right:-60, top:-60, width:280, height:280, borderRadius:"50%", background:"rgba(255,255,255,0.08)" }}/>
          <div style={{ position:"absolute", right:40, bottom:-80, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
          <div style={{ position:"relative" }}>
            <h3 className="sg" style={{ color:"#fff", fontSize:22, fontWeight:800, textAlign:"center", marginBottom:6 }}>{title}</h3>
            <div style={{ width:40, height:3, background:"rgba(255,255,255,.5)", borderRadius:2, margin:"0 auto 16px" }}/>
            {subtitle && <p style={{ color:"rgba(255,255,255,.75)", fontSize:13, textAlign:"center", marginBottom:24 }}>{subtitle}</p>}
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  const inputStyle = { width:"100%", background:"rgba(255,255,255,.15)", border:"1px solid rgba(255,255,255,.3)", borderRadius:8, padding:"12px 16px", color:"#fff", fontSize:14, fontFamily:"inherit", outline:"none", boxSizing:"border-box" };
  const btnBack = { background:"transparent", border:"1px solid rgba(255,255,255,.4)", color:"#fff", cursor:"pointer", padding:"9px 24px", borderRadius:8, fontSize:13, fontWeight:600, fontFamily:"inherit" };
  const btnNext = { background:"#fff", color:C.blueL, border:"none", cursor:"pointer", padding:"9px 24px", borderRadius:8, fontSize:13, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 };

  if (step===1) return wizardCard("Project Information", null, (
    <>
      <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="website URL" style={{ ...inputStyle, marginBottom:14 }}/>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Project name" style={{ ...inputStyle, marginBottom:28 }}/>
      <div style={{ display:"flex", justifyContent:"space-between" }}>
        <button onClick={onDone} style={btnBack}>Close</button>
        <button onClick={()=>setStep(2)} style={btnNext}>Next →</button>
      </div>
    </>
  ));

  if (step===2) return wizardCard("Enter Keyword", "Click on next to track the performance of keyword", (
    <>
      <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Keyword" style={{ ...inputStyle, marginBottom:10 }}/>
      <p style={{ color:"rgba(255,255,255,.6)", fontSize:12, textAlign:"center", marginBottom:28 }}>Confirm Better <span style={{ textDecoration:"underline", cursor:"pointer" }}>plans</span> to add multiple locations</p>
      <div style={{ display:"flex", justifyContent:"space-between" }}>
        <button onClick={()=>setStep(1)} style={btnBack}>Back</button>
        <button onClick={()=>setStep(3)} style={btnNext}>Next →</button>
      </div>
    </>
  ));

  return wizardCard("Specify Locations", "Enter the country or city you want traffic from", (
    <>
      <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Enter country or city" style={{ ...inputStyle, marginBottom:10 }}/>
      <p style={{ color:"rgba(255,255,255,.6)", fontSize:12, textAlign:"center", marginBottom:28 }}>Explore Better <span style={{ textDecoration:"underline", cursor:"pointer" }}>plans</span> to add multiple locations</p>
      <div style={{ display:"flex", justifyContent:"space-between" }}>
        <button onClick={()=>setStep(2)} style={btnBack}>Back</button>
        <button onClick={onDone} style={btnNext}>Next →</button>
      </div>
    </>
  ));
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
          <div style={{ marginTop:10, background:`linear-gradient(135deg,${C.blueL}18,${C.orange}14)`, border:`1px solid ${C.blueL}33`, borderRadius:9, padding:"9px 12px" }}>
            <div style={{ color:C.text, fontSize:11, fontWeight:700, marginBottom:3 }}>🎉 Score improved +12 pts this month!</div>
            <div style={{ color:C.textMid, fontSize:10, lineHeight:1.5 }}>Unlock weekly auto-audits & AI fix recommendations with Pro.</div>
            <button style={{ marginTop:6, width:"100%", background:C.orange, color:"#fff", border:"none", cursor:"pointer", padding:"5px 8px", borderRadius:6, fontSize:10, fontWeight:700, fontFamily:"inherit" }}>⚡ Unlock Pro Features</button>
          </div>
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
function DomainRankTracker({ onNavigate }) {
  const [activeDomain, setActiveDomain] = useState(0);
  const domains = [
    { d:"seoengineboost.com", kws:1475, top3:48, top10:214, dr:42, traffic:"52K", color:C.blueL },
    { d:"dentalpro.com",      kws:892,  top3:31, top10:148, dr:38, traffic:"31K", color:C.orange },
    { d:"fitnessapp.io",      kws:634,  top3:22, top10:95,  dr:29, traffic:"18K", color:C.green },
  ];
  const posData = [
    {d:"Nov 25",a:18,b:14,c:22},{d:"Dec 25",a:16,b:13,c:21},{d:"Jan 26",a:14,b:12,c:20},
    {d:"Feb 26",a:13,b:11,c:19},{d:"Mar 26",a:12,b:10,c:18},{d:"Apr 26",a:11,b:9,c:17},{d:"May 26",a:10,b:8,c:16},
  ];
  const topKws = [
    {kw:"seo tools 2026",        pos:3,  prev:7,  vol:"12K", domain:"seoengineboost.com"},
    {kw:"dental implants cost",   pos:4,  prev:9,  vol:"8.4K",domain:"dentalpro.com"},
    {kw:"fitness app 2026",       pos:8,  prev:12, vol:"5.1K",domain:"fitnessapp.io"},
    {kw:"backlink checker free",  pos:5,  prev:11, vol:"8.4K",domain:"seoengineboost.com"},
    {kw:"dental implants near me",pos:6,  prev:8,  vol:"9.2K",domain:"dentalpro.com"},
  ];
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg, padding:"20px 24px" }}>
      {/* Domain selector */}
      <div style={{ display:"flex", gap:10, marginBottom:20 }}>
        {domains.map((d,i)=>(
          <button key={i} onClick={()=>setActiveDomain(i)} style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 18px", borderRadius:10, border:`2px solid ${activeDomain===i?d.color:C.border}`, cursor:"pointer", background:activeDomain===i?`${d.color}08`:"transparent", fontFamily:"inherit", flex:1 }}>
            <Globe size={16} color={d.color}/>
            <div style={{ textAlign:"left" }}>
              <div style={{ color:C.text, fontWeight:700, fontSize:13 }}>{d.d}</div>
              <div style={{ color:d.color, fontSize:11, fontWeight:600 }}>DR {d.dr} · {d.traffic}/mo</div>
            </div>
          </button>
        ))}
        <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"12px 18px", borderRadius:10, fontSize:13, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", gap:6, whiteSpace:"nowrap" }}>
          <Plus size={13}/> Add Domain
        </button>
      </div>

      {/* Stats for active domain */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
        {[
          { l:"Keywords Tracked", v:domains[activeDomain].kws.toLocaleString(), c:domains[activeDomain].color },
          { l:"Top 3 Positions",  v:domains[activeDomain].top3,  c:C.green },
          { l:"Top 10 Positions", v:domains[activeDomain].top10, c:C.blueL },
          { l:"Organic Traffic",  v:domains[activeDomain].traffic, c:C.orange },
        ].map(s=>(
          <div key={s.l} className="card" style={{ padding:"14px 18px" }}>
            <div className="sg" style={{ color:s.c, fontSize:24, fontWeight:800, marginBottom:4 }}>{s.v}</div>
            <div style={{ color:C.textDim, fontSize:12 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Position trend chart */}
      <div className="card" style={{ padding:"20px 24px", marginBottom:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div>
            <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:14 }}>Average Position Trend</div>
            <div style={{ color:C.textDim, fontSize:12 }}>Lower = better ranking</div>
          </div>
          <div style={{ display:"flex", gap:12 }}>
            {domains.map((d,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:5 }}>
                <div style={{ width:10, height:3, borderRadius:2, background:d.color }}/>
                <span style={{ color:C.textDim, fontSize:11 }}>{d.d.split(".")[0]}</span>
              </div>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={posData} margin={{top:4,right:4,left:-28,bottom:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="d" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
            <YAxis reversed tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false} domain={[1,25]}/>
            <Tooltip contentStyle={{background:C.white,border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}} formatter={(v)=>[`Position #${v}`,""]}/>
            <Line type="monotone" dataKey="a" stroke={C.blueL}  strokeWidth={2.5} dot={{r:3,fill:C.blueL}}  name="seoengineboost.com"/>
            <Line type="monotone" dataKey="b" stroke={C.orange} strokeWidth={2.5} dot={{r:3,fill:C.orange}} name="dentalpro.com"/>
            <Line type="monotone" dataKey="c" stroke={C.green}  strokeWidth={2.5} dot={{r:3,fill:C.green}}  name="fitnessapp.io"/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top performing keywords table */}
      <div className="card" style={{ overflow:"hidden" }}>
        <div style={{ padding:"12px 18px", borderBottom:`1px solid ${C.border}` }}>
          <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:14 }}>Top Performing Keywords — All Domains</span>
        </div>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr style={{ background:C.bg }}>
            {["Keyword","Domain","Current","Previous","Change","Volume"].map(h=>(
              <th key={h} style={{ padding:"10px 16px", textAlign:"left", color:C.textDim, fontSize:10, fontWeight:700, borderBottom:`1px solid ${C.border}` }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {topKws.map((k,i)=>{
              const ch = k.prev-k.pos;
              const dc = domains.find(d=>d.d===k.domain);
              return (
                <tr key={i} className="td">
                  <td style={{ padding:"12px 16px", color:C.text, fontWeight:600, fontSize:13, borderBottom:`1px solid ${C.border}` }}>{k.kw}</td>
                  <td style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}` }}><span style={{ color:dc?.color||C.blueL, fontSize:11, fontWeight:700, background:`${dc?.color||C.blueL}18`, padding:"2px 8px", borderRadius:20 }}>{k.domain}</span></td>
                  <td style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}` }}><span className="sg" style={{ color:C.text, fontWeight:800, fontSize:16 }}>#{k.pos}</span></td>
                  <td style={{ padding:"12px 16px", color:C.textDim, fontSize:13, borderBottom:`1px solid ${C.border}` }}>#{k.prev}</td>
                  <td style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}` }}><span style={{ color:ch>0?C.green:C.red, fontWeight:700, fontSize:13, background:ch>0?C.greenL:C.redL, padding:"3px 8px", borderRadius:6 }}>{ch>0?"↑":"↓"}{Math.abs(ch)}</span></td>
                  <td style={{ padding:"12px 16px", color:C.textMid, fontSize:13, borderBottom:`1px solid ${C.border}` }}>{k.vol}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Projects Dashboard ───────────────────────────────────────────────────
function ProjectsDashboard({ onNavigate }) {
  const [view, setView] = useState("grid");
  const MiniTrend = ({data,up}) => {
    const max=Math.max(...data),min=Math.min(...data);
    const pts = data.map((v,i)=>`${(i/(data.length-1))*60},${18-((v-min)/(max-min+1))*16}`).join(" ");
    return <svg width={62} height={20}><polyline points={pts} fill="none" stroke={up?C.green:C.red} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>;
  };
  const projects = [
    { name:"SEO Engine Boost", domain:"seoengineboost.com", score:68, kws:1475, issues:32, traffic:"52K", dr:42, status:"Active",      trend:[42,45,48,50,55,60,68], rankChg:"+12", revenue:"$299/mo" },
    { name:"Dental Pro",       domain:"dentalpro.com",      score:74, kws:892,  issues:18, traffic:"31K", dr:38, status:"Active",      trend:[60,62,65,68,70,72,74], rankChg:"+8",  revenue:"$199/mo" },
    { name:"Fitness App",      domain:"fitnessapp.io",      score:55, kws:634,  issues:47, traffic:"18K", dr:29, status:"Needs Audit", trend:[58,55,52,50,48,52,55], rankChg:"-3",  revenue:"$99/mo" },
    { name:"Tech Blog",        domain:"techinsights.blog",  score:81, kws:2240, issues:8,  traffic:"94K", dr:56, status:"Healthy",     trend:[72,74,76,78,79,80,81], rankChg:"+18", revenue:"$499/mo" },
  ];
  const ss = { Healthy:{c:C.green,bg:C.greenL}, Active:{c:C.blueL,bg:C.bluePale}, "Needs Audit":{c:C.orange,bg:C.orangeL} };
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg, padding:"20px 24px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:22 }}>
        {[{l:"Active Projects",v:projects.length,c:C.blueL,icon:Briefcase},{l:"Avg Site Score",v:`${Math.round(projects.reduce((s,p)=>s+p.score,0)/projects.length)}/100`,c:C.green,icon:Activity},{l:"Total Issues",v:projects.reduce((s,p)=>s+p.issues,0),c:C.red,icon:AlertCircle},{l:"Total Revenue",v:"$1,096/mo",c:C.green,icon:TrendingUp}].map(({l,v,c,icon:Icon})=>(
          <div key={l} className="card" style={{padding:"14px 18px"}}><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}><div style={{width:30,height:30,borderRadius:8,background:`${c}18`,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={14} color={c}/></div></div><div className="sg" style={{color:C.text,fontSize:22,fontWeight:800}}>{v}</div><div style={{color:C.textDim,fontSize:11,marginTop:2}}>{l}</div></div>
        ))}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
        <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:15, flex:1 }}>All Projects</div>
        <div style={{ display:"flex", gap:2, background:C.bg, padding:3, borderRadius:8, border:`1px solid ${C.border}` }}>
          {[["grid","⊞"],["list","☰"]].map(([id,icon])=>(
            <button key={id} onClick={()=>setView(id)} style={{ background:view===id?C.white:"transparent", border:"none", cursor:"pointer", padding:"5px 10px", borderRadius:6, fontSize:14, color:view===id?C.blueL:C.textDim }}>{icon}</button>
          ))}
        </div>
        <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"8px 16px", borderRadius:8, fontSize:13, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", gap:5 }}><Plus size={13}/> Add Project</button>
      </div>
      <div style={{ display:view==="grid"?"grid":"flex", gridTemplateColumns:"repeat(2,1fr)", flexDirection:"column", gap:14 }}>
        {projects.map((p,i)=>{
          const style = ss[p.status]||ss.Active;
          const isUp = p.rankChg.startsWith("+");
          return (
            <div key={i} className="card ch" style={{ padding:"20px 22px", cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:16 }}>
                <ScoreRing score={p.score} size={52}/>
                <div style={{ flex:1 }}>
                  <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:15, marginBottom:2 }}>{p.name}</div>
                  <div style={{ color:C.blueL, fontSize:12, marginBottom:6 }}>{p.domain}</div>
                  <div style={{ display:"flex", gap:6 }}>
                    <span className="chip" style={{ color:style.c, background:style.bg }}>{p.status}</span>
                    <span style={{ color:isUp?C.green:C.red, fontSize:11, fontWeight:700 }}>Rankings {p.rankChg}</span>
                  </div>
                </div>
                <MiniTrend data={p.trend} up={isUp}/>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:14 }}>
                {[["Keywords",p.kws],["Issues",p.issues],["Traffic",p.traffic],["DR",p.dr]].map(([l,v])=>(
                  <div key={l} style={{ background:C.bg, borderRadius:7, padding:"8px 10px" }}>
                    <div style={{ color:C.textDim, fontSize:10 }}>{l}</div>
                    <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:14 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ color:C.textDim, fontSize:11 }}>Site Health</span>
                    <span style={{ color:p.score>=70?C.green:C.orange, fontSize:11, fontWeight:700 }}>{p.score}%</span>
                  </div>
                  <ProgBar v={p.score} col={p.score>=70?C.green:p.score>=50?C.yellow:C.red} h={5}/>
                </div>
                <button onClick={()=>onNavigate&&onNavigate("siteaudit")} style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"7px 12px", borderRadius:7, fontSize:12, fontWeight:700, fontFamily:"inherit" }}>Audit</button>
                <button onClick={()=>onNavigate&&onNavigate("reports")} style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"7px 12px", borderRadius:7, fontSize:12, fontFamily:"inherit" }}>Report</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
function Reports({ onUpgrade }) {
  const [tab, setTab] = useState("reports");
  const [generating, setGenerating] = useState(null);
  const [generated, setGenerated] = useState([]);
  const reports = [
    { name:"SEO Monthly Report — May 2026",    client:"SEO Engine Boost", date:"May 1, 2026", type:"Monthly",    status:"Ready" },
    { name:"Dental Pro Q1 Performance",         client:"Dental Pro",      date:"Apr 1, 2026", type:"Quarterly",  status:"Ready" },
    { name:"Keyword Performance Deep-Dive",     client:"Fitness App",     date:"Apr 15, 2026",type:"Custom",     status:"Draft" },
    { name:"Backlink Audit Report",             client:"Tech Blog",       date:"Apr 28, 2026",type:"Audit",      status:"Ready" },
  ];
  const aiReportTemplates = [
    { icon:"📊", name:"Full SEO Audit Report",         desc:"Rankings, technical issues, backlinks, recommendations",  time:"~30s", plan:"Free" },
    { icon:"🔑", name:"Keyword Performance Report",    desc:"Tracked keywords, position changes, opportunities",       time:"~20s", plan:"Free" },
    { icon:"🔗", name:"Backlink Profile Report",       desc:"New/lost links, authority score, anchor analysis",        time:"~25s", plan:"Starter" },
    { icon:"🏆", name:"Competitor Gap Report",         desc:"Compare rankings, keywords, backlinks vs competitors",    time:"~45s", plan:"Pro" },
    { icon:"📈", name:"Client Progress Report",        desc:"Branded report with ROI, wins, and next steps",          time:"~35s", plan:"Pro" },
    { icon:"⚡", name:"AI Opportunity Brief",           desc:"Top 10 growth opportunities ranked by impact",           time:"~20s", plan:"Free" },
  ];

  const handleGenerate = (template) => {
    if(template.plan==="Pro" && onUpgrade) { onUpgrade("export"); return; }
    setGenerating(template.name);
    setTimeout(() => {
      setGenerating(null);
      setGenerated(prev => [...prev, template.name]);
    }, 2200);
  };

  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg }}>
      {/* Header tabs */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, padding:"0 24px", display:"flex", alignItems:"center" }}>
        {[["reports","📄 My Reports"],["generate","✨ AI Report Generator"],["scheduled","🔁 Scheduled"]].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{ padding:"11px 18px", border:"none", borderBottom:tab===id?`2.5px solid ${C.blueL}`:"2.5px solid transparent", cursor:"pointer", fontSize:13, fontWeight:tab===id?700:500, fontFamily:"inherit", background:"transparent", color:tab===id?C.blueL:C.textMid, marginBottom:-1 }}>{label}</button>
        ))}
        <div style={{ marginLeft:"auto", display:"flex", gap:6, padding:"8px 0" }}>
          <button onClick={()=>setTab("generate")} style={{ background:`linear-gradient(135deg,${C.blue},${C.blueL})`, color:"#fff", border:"none", cursor:"pointer", padding:"7px 14px", borderRadius:7, fontSize:12, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", gap:5 }}>
            <Bot size={12}/> Generate with AI
          </button>
        </div>
      </div>

      <div style={{ padding:"20px 24px" }}>

        {/* My Reports tab */}
        {tab==="reports" && (
          <>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
              {reports.map((r,i)=>(
                <div key={i} className="card ch" style={{ padding:20 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                    <div>
                      <div style={{ color:C.text, fontWeight:700, fontSize:14, marginBottom:4 }}>{r.name}</div>
                      <div style={{ color:C.textDim, fontSize:12 }}>{r.client} · {r.date}</div>
                    </div>
                    <span className="chip" style={{ color:r.status==="Ready"?C.green:C.yellow, background:r.status==="Ready"?C.greenL:C.yellowL }}>{r.status}</span>
                  </div>
                  <span className="chip" style={{ color:C.blueL, background:C.bluePale, marginBottom:14, display:"inline-block" }}>{r.type}</span>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={()=>onUpgrade&&onUpgrade("export")} style={{ flex:1, background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"7px", borderRadius:7, fontSize:12, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
                      <Download size={11}/> Export PDF
                    </button>
                    <button style={{ flex:1, background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"7px", borderRadius:7, fontSize:12, fontFamily:"inherit" }}>Preview</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* AI Generator tab */}
        {tab==="generate" && (
          <>
            <div style={{ background:`linear-gradient(135deg,${C.blue},${C.blueL})`, borderRadius:14, padding:"20px 24px", marginBottom:20, display:"flex", alignItems:"center", gap:16 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:"rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Bot size={22} color="#fff"/>
              </div>
              <div>
                <div className="sg" style={{ color:"#fff", fontWeight:800, fontSize:16, marginBottom:4 }}>AI Report Generator</div>
                <p style={{ color:"rgba(255,255,255,.8)", fontSize:12 }}>Select a template below — AI will pull live data from your project and generate a complete, branded report in seconds.</p>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
              {aiReportTemplates.map((t,i)=>{
                const isGenerating = generating===t.name;
                const isDone = generated.includes(t.name);
                const isLocked = t.plan==="Pro";
                return (
                  <div key={i} className="card" style={{ padding:20, position:"relative", border:isDone?`2px solid ${C.green}`:isLocked?`1px dashed ${C.border}`:`1px solid ${C.border}` }}>
                    {isLocked && <div style={{ position:"absolute", top:10, right:10 }}><span className="chip" style={{ color:C.orange, background:C.orangeL, fontSize:9 }}>PRO 🔒</span></div>}
                    <div style={{ fontSize:28, marginBottom:10 }}>{t.icon}</div>
                    <div style={{ color:C.text, fontWeight:700, fontSize:13, marginBottom:4 }}>{t.name}</div>
                    <p style={{ color:C.textMid, fontSize:11, lineHeight:1.55, marginBottom:10 }}>{t.desc}</p>
                    <div style={{ display:"flex", gap:6, marginBottom:14 }}>
                      <span className="chip" style={{ color:C.blueL, background:C.bluePale, fontSize:9 }}>{t.time}</span>
                      <span className="chip" style={{ color:t.plan==="Free"?C.green:C.orange, background:t.plan==="Free"?C.greenL:C.orangeL, fontSize:9 }}>{t.plan}</span>
                    </div>
                    {isDone ? (
                      <div style={{ background:C.greenL, borderRadius:7, padding:"8px 12px", display:"flex", alignItems:"center", gap:6 }}>
                        <CheckCircle2 size={13} color={C.green}/>
                        <span style={{ color:C.green, fontSize:12, fontWeight:700 }}>Report Ready — Download PDF</span>
                      </div>
                    ) : (
                      <button onClick={()=>handleGenerate(t)} disabled={isGenerating} style={{ width:"100%", background:isGenerating?C.bg:isLocked?C.orange:C.blueL, color:isGenerating?C.textMid:"#fff", border:`1px solid ${isGenerating?C.border:"transparent"}`, cursor:isGenerating?"not-allowed":"pointer", padding:"8px", borderRadius:7, fontSize:12, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                        {isGenerating?<><span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⚙️</span> Generating...</>:<><Bot size={12}/>{isLocked?"Unlock with Pro →":"Generate Report"}</>}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Scheduled tab */}
        {tab==="scheduled" && (
          <div className="card" style={{ overflow:"hidden" }}>
            <div style={{ padding:"12px 18px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center" }}>
              <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:14, flex:1 }}>Scheduled Reports</span>
              <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"6px 14px", borderRadius:7, fontSize:12, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", gap:5 }}>
                <Plus size={11}/> Schedule Report
              </button>
            </div>
            {[
              { name:"Monthly SEO Report",    clients:"All Pro clients",       freq:"1st of month",  next:"Jun 1",  format:"White-label PDF", active:true },
              { name:"Weekly Rankings Digest", clients:"SEO Engine Boost",     freq:"Every Monday",  next:"May 13", format:"Email summary",   active:true },
              { name:"Quarterly Business Review",clients:"TechFlow Agency",    freq:"Every quarter", next:"Jul 1",  format:"Custom PDF",      active:false },
            ].map((s,i)=>(
              <div key={i} style={{ padding:"14px 18px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ flex:1 }}>
                  <div style={{ color:C.text, fontWeight:700, fontSize:13, marginBottom:3 }}>{s.name}</div>
                  <div style={{ color:C.textDim, fontSize:11 }}>{s.clients} · {s.freq} · {s.format}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ color:C.textDim, fontSize:10, marginBottom:3 }}>Next send</div>
                  <div style={{ color:C.text, fontWeight:700, fontSize:12 }}>{s.next}</div>
                </div>
                <span className="chip" style={{ color:s.active?C.green:C.textDim, background:s.active?C.greenL:C.bg }}>{s.active?"Active":"Paused"}</span>
                <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"5px 10px", borderRadius:6, fontSize:11, fontFamily:"inherit" }}>Edit</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── TeamMembers ───────────────────────────────────────────────────────
function TeamMembers({ onNavigate }) {
  const [tab, setTab] = useState("members");
  const [showInvite, setShowInvite] = useState(false);
  const members = [
    { name:"You (Admin)",      role:"Admin",          email:"admin@boostly.app",         av:"Y", status:"online",  tasks:15, kpis:[92,88,95], joined:"Jan 2026", plan:"Owner" },
    { name:"Mahmoud Al-Rashid",role:"SEO Manager",    email:"mahmoud@boostly.io",        av:"M", status:"online",  tasks:12, kpis:[88,84,91], joined:"Feb 2026", plan:"Pro" },
    { name:"Aisha Omar",       role:"Content Writer", email:"aisha@boostly.io",          av:"A", status:"online",  tasks:8,  kpis:[79,85,80], joined:"Feb 2026", plan:"Pro" },
    { name:"Sam Chen",         role:"Developer",      email:"sam@boostly.io",            av:"S", status:"away",    tasks:5,  kpis:[95,90,88], joined:"Mar 2026", plan:"Pro" },
    { name:"Jordan Smith",     role:"Link Builder",   email:"jordan@boostly.io",         av:"J", status:"offline", tasks:9,  kpis:[72,78,75], joined:"Mar 2026", plan:"Starter" },
  ];
  const perf = members.map(m=>({ name:m.name, completed:Math.round(m.kpis[0]/10), pending:Math.round(m.tasks*0.4), efficiency:m.kpis[0] }));
  const statusCol = { online:C.green, away:C.yellow, offline:C.textDim };
  const roleCol = { "Admin":C.red, "SEO Manager":C.blueL, "Content Writer":C.orange, "Developer":C.purple, "Link Builder":C.green };

  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg, padding:"20px 24px" }}>
      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
        {[
          { l:"Team Members",  v:members.length,    c:C.blueL,  icon:Users },
          { l:"Online Now",    v:members.filter(m=>m.status==="online").length, c:C.green, icon:Activity },
          { l:"Active Tasks",  v:members.reduce((s,m)=>s+m.tasks,0), c:C.orange, icon:CheckSquare },
          { l:"Avg Efficiency",v:`${Math.round(members.reduce((s,m)=>s+m.kpis[0],0)/members.length)}%`, c:C.purple, icon:TrendingUp },
        ].map(({l,v,c,icon:Icon})=>(
          <div key={l} className="card" style={{ padding:"14px 18px" }}>
            <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8 }}>
              <div style={{ width:30,height:30,borderRadius:8,background:`${c}18`,display:"flex",alignItems:"center",justifyContent:"center" }}><Icon size={14} color={c}/></div>
            </div>
            <div className="sg" style={{ color:C.text, fontSize:22, fontWeight:800 }}>{v}</div>
            <div style={{ color:C.textDim, fontSize:11, marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", alignItems:"center", gap:0, marginBottom:0, borderBottom:`1px solid ${C.border}`, background:C.white, borderRadius:"10px 10px 0 0", overflow:"hidden" }}>
        {[["members","👥 Members"],["performance","📊 Performance"],["roles","🔐 Roles & Permissions"]].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{ padding:"12px 20px", border:"none", borderBottom:tab===id?`2.5px solid ${C.blueL}`:"2.5px solid transparent", cursor:"pointer", fontSize:13, fontWeight:tab===id?700:500, fontFamily:"inherit", background:"transparent", color:tab===id?C.blueL:C.textMid, marginBottom:-1 }}>{label}</button>
        ))}
        <div style={{ flex:1 }}/>
        <button onClick={()=>setShowInvite(!showInvite)} style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"8px 16px", borderRadius:7, fontSize:12, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", gap:5, margin:"6px 12px" }}>
          <UserPlus size={13}/> Invite Member
        </button>
      </div>

      {/* Invite panel */}
      {showInvite && (
        <div style={{ background:C.bluePale, border:`1px solid ${C.blueL}33`, borderRadius:"0 0 10px 10px", padding:"16px 20px", marginBottom:14 }}>
          <div style={{ display:"flex", gap:10 }}>
            <input placeholder="Email address" style={{ flex:1, background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 14px", fontSize:13, fontFamily:"inherit", outline:"none" }}/>
            <select style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, fontFamily:"inherit" }}>
              <option>SEO Manager</option><option>Content Writer</option><option>Developer</option><option>Link Builder</option><option>Viewer</option>
            </select>
            <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"9px 18px", borderRadius:8, fontSize:13, fontWeight:700, fontFamily:"inherit" }}>Send Invite</button>
          </div>
        </div>
      )}

      {/* Members tab */}
      {tab==="members" && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, paddingTop:14 }}>
          {members.map((m,i)=>(
            <div key={i} className="card ch" style={{ padding:"20px", position:"relative" }}>
              <div style={{ position:"absolute", top:14, right:14 }}>
                <div style={{ width:10,height:10,borderRadius:"50%",background:statusCol[m.status],boxShadow:`0 0 0 3px ${statusCol[m.status]}33` }}/>
              </div>
              <div style={{ textAlign:"center", marginBottom:14 }}>
                <Av l={m.av} size={52}/>
                <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:15, marginTop:10, marginBottom:2 }}>{m.name}</div>
                <span style={{ background:`${roleCol[m.role]||C.blueL}18`, color:roleCol[m.role]||C.blueL, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>{m.role}</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6, marginBottom:14 }}>
                {[["Tasks",m.tasks],["Efficiency",`${m.kpis[0]}%`],["Plan",m.plan]].map(([l,v])=>(
                  <div key={l} style={{ background:C.bg, borderRadius:7, padding:"8px 6px", textAlign:"center" }}>
                    <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:13 }}>{v}</div>
                    <div style={{ color:C.textDim, fontSize:9 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ color:C.textDim, fontSize:10 }}>Performance</span>
                  <span style={{ color:m.kpis[0]>=80?C.green:C.orange, fontSize:10, fontWeight:700 }}>{m.kpis[0]}%</span>
                </div>
                <ProgBar v={m.kpis[0]} col={m.kpis[0]>=80?C.green:m.kpis[0]>=60?C.yellow:C.red} h={5}/>
              </div>
              <div style={{ display:"flex", gap:6 }}>
                <button style={{ flex:1, background:"transparent", border:`1px solid ${C.border}`, color:C.blueL, cursor:"pointer", padding:"7px", borderRadius:7, fontSize:11, fontFamily:"inherit" }}>Message</button>
                <button style={{ flex:1, background:C.bg, border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"7px", borderRadius:7, fontSize:11, fontFamily:"inherit" }}>View Tasks</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Performance tab */}
      {tab==="performance" && (
        <div style={{ paddingTop:14 }}>
          <div className="card" style={{ padding:"20px 24px", marginBottom:16 }}>
            <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:14, marginBottom:16 }}>Team Performance Overview</div>
            <ResponsiveContainer width="100%" height={200}>
              <RBarChart data={perf} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis dataKey="name" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickFormatter={v=>v.split(" ")[0]}/>
                <YAxis tick={{fill:C.textDim,fontSize:10}} axisLine={false}/>
                <Tooltip contentStyle={{background:C.white,border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
                <Bar dataKey="efficiency" fill={C.blueL} radius={[4,4,0,0]} name="Efficiency %"/>
                <Bar dataKey="completed" fill={C.green} radius={[4,4,0,0]} name="Tasks Completed"/>
              </RBarChart>
            </ResponsiveContainer>
          </div>
          <div className="card" style={{ overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"2fr 80px 80px 100px 100px", padding:"10px 18px", background:C.bg, borderBottom:`1px solid ${C.border}` }}>
              {["Team Member","Tasks Done","Pending","Efficiency","Score"].map(h=>(
                <div key={h} style={{ color:C.textDim, fontSize:10, fontWeight:700 }}>{h}</div>
              ))}
            </div>
            {members.map((m,i)=>(
              <div key={i} className="td" style={{ display:"grid", gridTemplateColumns:"2fr 80px 80px 100px 100px", padding:"12px 18px", borderBottom:`1px solid ${C.border}`, alignItems:"center" }}>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <Av l={m.av} size={28}/>
                  <div>
                    <div style={{ color:C.text, fontWeight:600, fontSize:13 }}>{m.name}</div>
                    <div style={{ color:C.textDim, fontSize:11 }}>{m.role}</div>
                  </div>
                </div>
                <div className="sg" style={{ color:C.green, fontWeight:700 }}>{Math.round(m.kpis[0]/10)}</div>
                <div className="sg" style={{ color:C.orange, fontWeight:700 }}>{Math.round(m.tasks*0.4)}</div>
                <div>
                  <ProgBar v={m.kpis[0]} col={m.kpis[0]>=80?C.green:C.yellow} h={5}/>
                  <div style={{ color:C.textDim, fontSize:10, marginTop:2 }}>{m.kpis[0]}%</div>
                </div>
                <span style={{ background:m.kpis[0]>=85?C.greenL:m.kpis[0]>=70?C.yellowL:C.redL, color:m.kpis[0]>=85?C.green:m.kpis[0]>=70?C.yellow:C.red, padding:"4px 10px", borderRadius:20, fontSize:11, fontWeight:700 }}>{m.kpis[0]>=85?"⭐ Top":"👍 Good"}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Roles tab */}
      {tab==="roles" && (
        <div style={{ paddingTop:14 }}>
          <div className="card" style={{ overflow:"hidden" }}>
            <div style={{ padding:"14px 18px", borderBottom:`1px solid ${C.border}` }}>
              <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:14 }}>Roles & Access Permissions</div>
            </div>
            {[
              { role:"Admin", perms:["Full access","Billing","User management","All features"], count:1, color:C.red },
              { role:"SEO Manager", perms:["All SEO tools","Reports","Clients","Tasks"], count:1, color:C.blueL },
              { role:"Content Writer", perms:["Content Lab","Article Checker","Tasks","Messages"], count:1, color:C.orange },
              { role:"Developer", perms:["Site Audit","API access","Technical SEO","Tasks"], count:1, color:C.purple },
              { role:"Link Builder", perms:["Backlink Research","Tasks","Reports (view)"], count:1, color:C.green },
              { role:"Viewer", perms:["Reports (view only)","Dashboard"], count:0, color:C.textDim },
            ].map((r,i)=>(
              <div key={i} style={{ padding:"14px 18px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:36,height:36,borderRadius:9,background:`${r.color}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <Shield size={16} color={r.color}/>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                    <span style={{ color:C.text, fontWeight:700, fontSize:13 }}>{r.role}</span>
                    <span style={{ background:`${r.color}18`, color:r.color, fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:10 }}>{r.count} member{r.count!==1?"s":""}</span>
                  </div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {r.perms.map(p=><span key={p} style={{ background:C.bg, border:`1px solid ${C.border}`, color:C.textMid, fontSize:10, padding:"2px 8px", borderRadius:20 }}>{p}</span>)}
                  </div>
                </div>
                <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.blueL, cursor:"pointer", padding:"6px 12px", borderRadius:7, fontSize:11, fontFamily:"inherit" }}>Edit</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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
// ══════════════════════════════════════════════════════════════════
//  DOMAIN OVERVIEW — Full SEMrush-quality page
// ══════════════════════════════════════════════════════════════════
function DomainOverviewScreen({ onNavigate }) {
  const [domain, setDomain] = useState("seoengineboost.com");
  const [inputDomain, setInputDomain] = useState("seoengineboost.com");
  const [dateRange, setDateRange] = useState("6M");
  const [country, setCountry] = useState("🌍 Global");
  const [activeSection, setActiveSection] = useState("organic");

  // ── Chart data ────────────────────────────────────────────────────
  const trafficHistory = [
    {m:"Dec '25",organic:28400,paid:3200,direct:4800},{m:"Jan '26",organic:32100,paid:3800,direct:5200},
    {m:"Feb '26",organic:35600,paid:4100,direct:5600},{m:"Mar '26",organic:41200,paid:4400,direct:6100},
    {m:"Apr '26",organic:47800,paid:5100,direct:6800},{m:"May '26",organic:52340,paid:5800,direct:7200},
  ];
  const backlinkHistory = [
    {m:"Dec '25",bl:9800,rd:680},{m:"Jan '26",bl:10400,rd:720},
    {m:"Feb '26",bl:11200,rd:760},{m:"Mar '26",bl:12100,rd:810},
    {m:"Apr '26",bl:13400,rd:860},{m:"May '26",bl:14280,rd:920},
  ];
  const trafficByDevice = [
    {name:"Desktop",value:58,color:C.blueL},
    {name:"Mobile", value:36,color:C.orange},
    {name:"Tablet", value:6, color:C.purple},
  ];
  const trafficByCountry = [
    {country:"🇺🇸 United States",share:"38.4%",traffic:"20.1K",change:"+5.2%",up:true},
    {country:"🇬🇧 United Kingdom",share:"12.8%",traffic:"6.7K", change:"+2.1%",up:true},
    {country:"🇵🇭 Philippines",   share:"9.4%", traffic:"4.9K", change:"+11.3%",up:true},
    {country:"🇦🇺 Australia",      share:"7.2%", traffic:"3.8K", change:"-1.4%",up:false},
    {country:"🇳🇬 Nigeria",         share:"5.6%", traffic:"2.9K", change:"+8.7%",up:true},
    {country:"🌐 Other",            share:"26.6%",traffic:"13.9K",change:"+3.1%",up:true},
  ];
  const topOrgKws = [
    {kw:"seo tools",          pos:3,  prev:7,  vol:"135K",kd:72,traffic:"18.2K",intent:"Commercial"},
    {kw:"seo audit free",     pos:5,  prev:11, vol:"22K", kd:41,traffic:"4.1K", intent:"Commercial"},
    {kw:"backlink checker",   pos:7,  prev:9,  vol:"18K", kd:58,traffic:"2.8K", intent:"Commercial"},
    {kw:"keyword rank tracker",pos:4, prev:8,  vol:"12K", kd:49,traffic:"2.4K", intent:"Commercial"},
    {kw:"site audit tool",    pos:9,  prev:15, vol:"9.8K",kd:37,traffic:"1.6K", intent:"Commercial"},
    {kw:"best seo tools 2026",pos:2,  prev:4,  vol:"8.4K",kd:55,traffic:"1.8K", intent:"Commercial"},
    {kw:"competitor analysis", pos:6, prev:10, vol:"7.2K",kd:44,traffic:"1.1K", intent:"Informational"},
    {kw:"seo reporting tool",  pos:11,prev:19, vol:"5.6K",kd:33,traffic:"0.7K", intent:"Commercial"},
  ];
  const topPages = [
    {page:"/",                         title:"SEO Engine Boost — Home",       traffic:"12.4K",share:"23.7%",kws:248},
    {page:"/blog/seo-tools-2026",      title:"Best SEO Tools 2026",           traffic:"8.1K", share:"15.5%",kws:182},
    {page:"/audit",                    title:"Free SEO Audit Tool",           traffic:"6.3K", share:"12.0%",kws:94},
    {page:"/pricing",                  title:"Pricing Plans & Features",      traffic:"4.9K", share:"9.4%", kws:61},
    {page:"/blog/keyword-research",    title:"Keyword Research Guide 2026",   traffic:"3.8K", share:"7.3%", kws:143},
    {page:"/backlink-checker",         title:"Free Backlink Checker",         traffic:"2.9K", share:"5.5%", kws:77},
  ];
  const competitors = [
    {domain:"semrush.com",    dr:91,traffic:"5.2M",overlap:"34%",kws:"124K",color:"#DC2626"},
    {domain:"ahrefs.com",     dr:88,traffic:"3.8M",overlap:"28%",kws:"89K", color:"#D97706"},
    {domain:"moz.com",        dr:86,traffic:"2.1M",overlap:"22%",kws:"67K", color:"#7C3AED"},
    {domain:"surfer-seo.com", dr:72,traffic:"890K",overlap:"41%",kws:"31K", color:"#2563EB"},
    {domain:"rankmath.com",   dr:74,traffic:"760K",overlap:"18%",kws:"28K", color:"#16A34A"},
  ];
  const refDomains = [
    {domain:"techcrunch.com",      dr:91,bl:12, anchor:"SEO Tools",     dofollow:true,  date:"May 8, 2026"},
    {domain:"searchengineland.com",dr:84,bl:8,  anchor:"SEO Audit",     dofollow:true,  date:"May 3, 2026"},
    {domain:"hubspot.com",         dr:93,bl:5,  anchor:"seoengineboost",dofollow:false, date:"Apr 28, 2026"},
    {domain:"moz.com",             dr:86,bl:3,  anchor:"Backlink Tool", dofollow:true,  date:"Apr 22, 2026"},
    {domain:"ahrefs.com",          dr:88,bl:7,  anchor:"Rank Tracker",  dofollow:true,  date:"Apr 15, 2026"},
    {domain:"backlinko.com",       dr:85,bl:4,  anchor:"SEO Guide",     dofollow:true,  date:"Apr 10, 2026"},
  ];

  const KDBadge = ({kd}) => {
    const c=kd<=30?"#15803D":kd<=60?"#D97706":"#DC2626", bg=kd<=30?"#DCFCE7":kd<=60?"#FEF3C7":"#FEE2E2";
    return <div style={{width:32,height:32,borderRadius:"50%",background:bg,border:`2px solid ${c}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:c,flexShrink:0}}>{kd}</div>;
  };
  const IntentBadge = ({intent}) => {
    const m={Commercial:[C.purple,C.purpleL],Informational:[C.blueL,C.bluePale],Navigational:[C.orange,C.orangeL],Transactional:[C.green,C.greenL]};
    const [col,bg]=m[intent]||[C.textDim,C.bg];
    return <span style={{background:bg,color:col,padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:600}}>{intent}</span>;
  };

  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg }}>

      {/* ── Search bar ────────────────────────────────────────────── */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, padding:"14px 28px" }}>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <div style={{ flex:1, display:"flex", alignItems:"center", gap:8, background:C.bg, border:`2px solid ${C.blueL}`, borderRadius:10, padding:"10px 16px" }}>
            <Globe size={16} color={C.blueL}/>
            <input value={inputDomain} onChange={e=>setInputDomain(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setDomain(inputDomain)} placeholder="Enter domain (e.g. example.com)" style={{ flex:1, background:"transparent", border:"none", outline:"none", color:C.text, fontSize:14, fontFamily:"inherit" }}/>
          </div>
          <select value={country} onChange={e=>setCountry(e.target.value)} style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:9, padding:"11px 14px", color:C.text, fontSize:13, fontFamily:"inherit", outline:"none", cursor:"pointer" }}>
            <option>🌍 Global</option><option>🇺🇸 United States</option><option>🇬🇧 United Kingdom</option><option>🇵🇭 Philippines</option><option>🇳🇬 Nigeria</option><option>🇦🇺 Australia</option>
          </select>
          <button onClick={()=>setDomain(inputDomain)} style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"11px 28px", borderRadius:9, fontSize:14, fontWeight:700, fontFamily:"inherit" }}>Analyze →</button>
          <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"11px 14px", borderRadius:9, fontSize:12, fontFamily:"inherit", display:"flex", alignItems:"center", gap:5 }}>
            <Download size={13}/> Export
          </button>
        </div>
        {/* Domain info strip */}
        <div style={{ display:"flex", alignItems:"center", gap:14, marginTop:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:28, height:28, borderRadius:6, background:C.bluePale, display:"flex", alignItems:"center", justifyContent:"center" }}><Globe size={14} color={C.blueL}/></div>
            <span className="sg" style={{ color:C.text, fontWeight:800, fontSize:16 }}>{domain}</span>
          </div>
          <span className="chip" style={{ color:C.green, background:C.greenL }}>✓ Active</span>
          <span style={{ color:C.textDim, fontSize:12 }}>Last updated: May 9, 2026</span>
          <div style={{ marginLeft:"auto", display:"flex", gap:6 }}>
            {["3M","6M","12M","All"].map(r=>(
              <button key={r} onClick={()=>setDateRange(r)} style={{ background:dateRange===r?C.blueL:"transparent", color:dateRange===r?"#fff":C.textMid, border:`1px solid ${dateRange===r?C.blueL:C.border}`, cursor:"pointer", padding:"4px 12px", borderRadius:6, fontSize:11, fontFamily:"inherit" }}>{r}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding:"20px 28px" }}>

        {/* ── Authority Score + 4 Key Metrics ───────────────────────── */}
        <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:14, marginBottom:20 }}>
          {/* Authority Score card */}
          <div className="card" style={{ padding:"22px", textAlign:"center", background:`linear-gradient(135deg,${C.blue},${C.blueL})` }}>
            <div style={{ color:"rgba(255,255,255,.7)", fontSize:11, fontWeight:700, letterSpacing:1, marginBottom:8 }}>AUTHORITY SCORE</div>
            <div style={{ position:"relative", width:90, height:90, margin:"0 auto 10px" }}>
              {(() => { const r=38,circ=2*Math.PI*r,off=circ*(1-42/100); return (
                <svg width={90} height={90} style={{transform:"rotate(-90deg)"}}>
                  <circle cx={45} cy={45} r={r} fill="none" stroke="rgba(255,255,255,.2)" strokeWidth={10}/>
                  <circle cx={45} cy={45} r={r} fill="none" stroke="#FED7AA" strokeWidth={10} strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"/>
                </svg>
              );})()}
              <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                <span className="sg" style={{ color:"#fff", fontSize:28, fontWeight:900, lineHeight:1 }}>42</span>
                <span style={{ color:"rgba(255,255,255,.7)", fontSize:9 }}>/ 100</span>
              </div>
            </div>
            <div style={{ color:"#FED7AA", fontWeight:700, fontSize:12, marginBottom:2 }}>Average</div>
            <div style={{ color:"rgba(255,255,255,.6)", fontSize:10 }}>↑ +3 vs last month</div>
          </div>
          {/* 4 metric cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
            {[
              { icon:"📈", label:"Organic Traffic",  value:"52.3K",  sub:"/month",   chg:"+18.4%", up:true,  color:C.blueL,  detail:"↑ from 44.2K last month" },
              { icon:"🔑", label:"Organic Keywords", value:"1,475",  sub:"ranked",   chg:"+89",    up:true,  color:C.green,  detail:"242 in Top 3 positions" },
              { icon:"🔗", label:"Backlinks",         value:"14.3K",  sub:"total",    chg:"+482",   up:true,  color:C.orange, detail:"920 referring domains" },
              { icon:"💰", label:"Paid Traffic",      value:"5.8K",   sub:"/month",   chg:"+12.1%", up:true,  color:C.purple, detail:"Avg CPC $3.40" },
            ].map((m,i)=>(
              <div key={i} className="card" style={{ padding:"16px 18px" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ fontSize:22 }}>{m.icon}</span>
                  <span style={{ color:m.up?C.green:C.red, fontSize:10, fontWeight:700, background:m.up?C.greenL:C.redL, padding:"2px 7px", borderRadius:10 }}>{m.chg}</span>
                </div>
                <div className="sg" style={{ color:C.text, fontSize:24, fontWeight:900, lineHeight:1, marginBottom:2 }}>{m.value}<span style={{ color:C.textDim, fontSize:12, fontWeight:400 }}>{m.sub}</span></div>
                <div style={{ color:C.textDim, fontSize:11, marginBottom:6 }}>{m.label}</div>
                <div style={{ color:m.color, fontSize:10, fontWeight:600 }}>{m.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section navigation ────────────────────────────────────── */}
        <div style={{ display:"flex", gap:6, marginBottom:18, borderBottom:`1px solid ${C.border}`, paddingBottom:0, background:C.white, borderRadius:"10px 10px 0 0", overflow:"hidden", padding:"0 4px" }}>
          {[["organic","📈 Organic Search"],["backlinks","🔗 Backlinks"],["competitors","⚔️ Competitors"],["pages","📄 Top Pages"],["geo","🌍 Geo Traffic"]].map(([id,label])=>(
            <button key={id} onClick={()=>setActiveSection(id)} style={{ padding:"12px 18px", border:"none", borderBottom:activeSection===id?`2.5px solid ${C.blueL}`:"2.5px solid transparent", cursor:"pointer", fontSize:13, fontWeight:activeSection===id?700:500, fontFamily:"inherit", background:"transparent", color:activeSection===id?C.blueL:C.textMid, marginBottom:-1 }}>{label}</button>
          ))}
        </div>

        {/* ── ORGANIC SEARCH SECTION ────────────────────────────────── */}
        {activeSection==="organic" && (
          <>
            {/* Traffic trend + device split */}
            <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:16, marginBottom:18 }}>
              <div className="card" style={{ padding:"20px 24px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                  <div>
                    <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:15 }}>Organic Traffic Trend</div>
                    <div style={{ color:C.textDim, fontSize:12 }}>Dec 2025 → May 2026</div>
                  </div>
                  <div style={{ display:"flex", gap:12 }}>
                    {[["Organic",C.blueL],["Paid",C.orange],["Direct",C.purple]].map(([label,c])=>(
                      <div key={label} style={{ display:"flex", alignItems:"center", gap:4 }}>
                        <div style={{ width:10, height:3, borderRadius:2, background:c }}/>
                        <span style={{ color:C.textDim, fontSize:11 }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={trafficHistory} margin={{top:4,right:4,left:-22,bottom:0}}>
                    <defs>
                      <linearGradient id="dog" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.blueL} stopOpacity={.25}/><stop offset="95%" stopColor={C.blueL} stopOpacity={0}/></linearGradient>
                      <linearGradient id="dpg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.orange} stopOpacity={.2}/><stop offset="95%" stopColor={C.orange} stopOpacity={0}/></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                    <XAxis dataKey="m" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
                    <YAxis tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`${(v/1000).toFixed(0)}k`}/>
                    <Tooltip contentStyle={{background:C.white,border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}} formatter={(v)=>[v.toLocaleString(),""]}/>
                    <Area type="monotone" dataKey="organic" stroke={C.blueL} fill="url(#dog)" strokeWidth={2.5} name="Organic"/>
                    <Area type="monotone" dataKey="paid"    stroke={C.orange} fill="url(#dpg)" strokeWidth={2} name="Paid"/>
                    <Area type="monotone" dataKey="direct"  stroke={C.purple} fill="none" strokeWidth={1.5} strokeDasharray="4 3" name="Direct"/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="card" style={{ padding:"20px 24px" }}>
                <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:15, marginBottom:6 }}>Traffic by Device</div>
                <div style={{ color:C.textDim, fontSize:12, marginBottom:14 }}>May 2026</div>
                <ResponsiveContainer width="100%" height={140}>
                  <RPieChart>
                    <Pie data={trafficByDevice} cx="50%" cy="50%" innerRadius={44} outerRadius={66} dataKey="value" paddingAngle={3}>
                      {trafficByDevice.map((d,i)=><Cell key={i} fill={d.color}/>)}
                    </Pie>
                    <Tooltip contentStyle={{background:C.white,border:`1px solid ${C.border}`,borderRadius:6,fontSize:10}} formatter={v=>[`${v}%`,""]}/>
                  </RPieChart>
                </ResponsiveContainer>
                <div style={{ display:"flex", flexDirection:"column", gap:7, marginTop:6 }}>
                  {trafficByDevice.map(d=>(
                    <div key={d.name} style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:10,height:10,borderRadius:2,background:d.color,flexShrink:0 }}/>
                      <span style={{ color:C.textMid, fontSize:12, flex:1 }}>{d.name}</span>
                      <div style={{ display:"flex", alignItems:"center", gap:6, flex:2 }}>
                        <div style={{ flex:1, background:C.border, borderRadius:10, height:5, overflow:"hidden" }}>
                          <div style={{ width:`${d.value}%`, height:"100%", background:d.color, borderRadius:10 }}/>
                        </div>
                        <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:13, minWidth:30 }}>{d.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top organic keywords table */}
            <div className="card" style={{ overflow:"hidden" }}>
              <div style={{ padding:"14px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center" }}>
                <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:15, flex:1 }}>Top Organic Keywords
                  <span style={{ color:C.textDim, fontWeight:400, fontSize:12, marginLeft:8 }}>1,475 total</span>
                </div>
                <button onClick={()=>onNavigate&&onNavigate("keyword")} style={{ background:"transparent", border:"none", color:C.blueL, cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>View All Keywords →</button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"2.5fr 80px 80px 100px 100px 130px 120px", padding:"9px 20px", background:C.bg, borderBottom:`1px solid ${C.border}` }}>
                {["KEYWORD","POSITION","PREV","VOLUME","KD","TRAFFIC","INTENT"].map(h=>(
                  <div key={h} style={{ color:C.textDim, fontSize:10, fontWeight:700, letterSpacing:.5 }}>{h}</div>
                ))}
              </div>
              {topOrgKws.map((k,i)=>{
                const ch = k.prev - k.pos;
                return (
                  <div key={i} className="td" style={{ display:"grid", gridTemplateColumns:"2.5fr 80px 80px 100px 100px 130px 120px", padding:"12px 20px", borderBottom:`1px solid ${C.border}`, alignItems:"center" }}>
                    <div style={{ color:C.text, fontWeight:600, fontSize:13 }}>{k.kw}</div>
                    <div className="sg" style={{ color:C.text, fontWeight:800, fontSize:16 }}>#{k.pos}</div>
                    <div style={{ color:C.textDim, fontSize:12 }}>#{k.prev}</div>
                    <div style={{ color:C.textMid, fontSize:13 }}>{k.vol}</div>
                    <KDBadge kd={k.kd}/>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ color:C.text, fontSize:13, fontWeight:600 }}>{k.traffic}</span>
                      <span style={{ color:ch>0?C.green:C.red, fontSize:10, fontWeight:700 }}>{ch>0?"↑":"↓"}{Math.abs(ch)}</span>
                    </div>
                    <IntentBadge intent={k.intent}/>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── BACKLINKS SECTION ─────────────────────────────────────── */}
        {activeSection==="backlinks" && (
          <>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:16 }}>
              {[
                { l:"Total Backlinks",     v:"14.3K", chg:"+482 this month",  c:C.blueL  },
                { l:"Referring Domains",   v:"920",   chg:"+38 this month",   c:C.green  },
                { l:"Dofollow Links",       v:"71%",   chg:"of all backlinks", c:C.orange },
                { l:"Toxic Score",          v:"12%",   chg:"Low risk",         c:C.green  },
              ].map(s=>(
                <div key={s.l} className="card" style={{ padding:"16px 20px" }}>
                  <div className="sg" style={{ color:s.c, fontSize:26, fontWeight:900, marginBottom:4 }}>{s.v}</div>
                  <div style={{ color:C.text, fontSize:13, fontWeight:600 }}>{s.l}</div>
                  <div style={{ color:C.textDim, fontSize:11, marginTop:2 }}>{s.chg}</div>
                </div>
              ))}
            </div>
            {/* Backlinks growth chart */}
            <div className="card" style={{ padding:"20px 24px", marginBottom:16 }}>
              <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:15, marginBottom:14 }}>Backlinks & Referring Domains Growth</div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={backlinkHistory} margin={{top:4,right:4,left:-22,bottom:0}}>
                  <defs>
                    <linearGradient id="blg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.blueL} stopOpacity={.2}/><stop offset="95%" stopColor={C.blueL} stopOpacity={0}/></linearGradient>
                    <linearGradient id="rdg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.orange} stopOpacity={.15}/><stop offset="95%" stopColor={C.orange} stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                  <XAxis dataKey="m" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
                  <YAxis yAxisId="bl" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`${(v/1000).toFixed(0)}k`}/>
                  <YAxis yAxisId="rd" orientation="right" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={{background:C.white,border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
                  <Area yAxisId="bl" type="monotone" dataKey="bl" stroke={C.blueL} fill="url(#blg)" strokeWidth={2.5} name="Backlinks"/>
                  <Area yAxisId="rd" type="monotone" dataKey="rd" stroke={C.orange} fill="url(#rdg)" strokeWidth={2} name="Ref. Domains"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {/* Top referring domains */}
            <div className="card" style={{ overflow:"hidden" }}>
              <div style={{ padding:"14px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center" }}>
                <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:15, flex:1 }}>Top Referring Domains</div>
                <button onClick={()=>onNavigate&&onNavigate("backlink")} style={{ background:"transparent", border:"none", color:C.blueL, cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>View Full Backlink Report →</button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"2fr 60px 80px 2fr 100px 80px 120px", padding:"9px 20px", background:C.bg, borderBottom:`1px solid ${C.border}` }}>
                {["DOMAIN","DR","BL","ANCHOR TEXT","LINK TYPE","FOLLOW","DATE"].map(h=>(
                  <div key={h} style={{ color:C.textDim, fontSize:10, fontWeight:700, letterSpacing:.4 }}>{h}</div>
                ))}
              </div>
              {refDomains.map((r,i)=>(
                <div key={i} className="td" style={{ display:"grid", gridTemplateColumns:"2fr 60px 80px 2fr 100px 80px 120px", padding:"12px 20px", borderBottom:`1px solid ${C.border}`, alignItems:"center" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:28,height:28,borderRadius:6,background:C.bluePale,display:"flex",alignItems:"center",justifyContent:"center" }}><Globe size={12} color={C.blueL}/></div>
                    <span style={{ color:C.blueL, fontWeight:600, fontSize:13 }}>{r.domain}</span>
                  </div>
                  <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:14 }}>{r.dr}</div>
                  <div style={{ color:C.textMid, fontSize:12 }}>{r.bl}</div>
                  <div style={{ color:C.textMid, fontSize:12 }}>{r.anchor}</div>
                  <span className="chip" style={{ color:C.blueL, background:C.bluePale, fontSize:10 }}>Backlink</span>
                  <span className="chip" style={{ color:r.dofollow?C.green:C.textDim, background:r.dofollow?C.greenL:C.bg, fontSize:10 }}>{r.dofollow?"Dofollow":"Nofollow"}</span>
                  <span style={{ color:C.textDim, fontSize:11 }}>{r.date}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── COMPETITORS SECTION ───────────────────────────────────── */}
        {activeSection==="competitors" && (
          <>
            <div style={{ background:`${C.blueL}08`, border:`1px solid ${C.blueL}22`, borderRadius:12, padding:"14px 20px", marginBottom:18, display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:20 }}>💡</span>
              <div>
                <div style={{ color:C.blueL, fontWeight:700, fontSize:13 }}>These domains rank for similar keywords as <strong>{domain}</strong></div>
                <div style={{ color:C.textMid, fontSize:12 }}>Sorted by keyword overlap. Use this to find gap opportunities.</div>
              </div>
              <button onClick={()=>onNavigate&&onNavigate("keyword-gap")} style={{ marginLeft:"auto", background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"8px 16px", borderRadius:8, fontSize:12, fontWeight:700, fontFamily:"inherit", flexShrink:0 }}>Run Keyword Gap →</button>
            </div>
            <div className="card" style={{ overflow:"hidden", marginBottom:16 }}>
              <div style={{ padding:"14px 20px", borderBottom:`1px solid ${C.border}` }}>
                <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:15 }}>Organic Competitors</div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"2fr 80px 120px 100px 100px 160px", padding:"9px 20px", background:C.bg, borderBottom:`1px solid ${C.border}` }}>
                {["DOMAIN","DR","TRAFFIC","KEYWORDS","OVERLAP","ACTIONS"].map(h=>(
                  <div key={h} style={{ color:C.textDim, fontSize:10, fontWeight:700, letterSpacing:.4 }}>{h}</div>
                ))}
              </div>
              {competitors.map((comp,i)=>(
                <div key={i} className="td" style={{ display:"grid", gridTemplateColumns:"2fr 80px 120px 100px 100px 160px", padding:"13px 20px", borderBottom:`1px solid ${C.border}`, alignItems:"center" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:8, height:8, borderRadius:"50%", background:comp.color }}/>
                    <span style={{ color:C.text, fontWeight:600, fontSize:13 }}>{comp.domain}</span>
                  </div>
                  <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:14 }}>{comp.dr}</div>
                  <div style={{ color:C.text, fontSize:13 }}>{comp.traffic}</div>
                  <div style={{ color:C.text, fontSize:13 }}>{comp.kws}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <div style={{ flex:1, background:C.border, borderRadius:10, height:6 }}>
                      <div style={{ width:comp.overlap, height:"100%", background:comp.color, borderRadius:10 }}/>
                    </div>
                    <span style={{ color:C.text, fontWeight:700, fontSize:12, minWidth:28 }}>{comp.overlap}</span>
                  </div>
                  <div style={{ display:"flex", gap:6 }}>
                    <button onClick={()=>onNavigate&&onNavigate("keyword-gap")} style={{ background:C.bluePale, color:C.blueL, border:"none", cursor:"pointer", padding:"5px 9px", borderRadius:6, fontSize:11, fontWeight:700, fontFamily:"inherit" }}>KW Gap</button>
                    <button onClick={()=>onNavigate&&onNavigate("backlink-gap")} style={{ background:`${C.orange}18`, color:C.orange, border:"none", cursor:"pointer", padding:"5px 9px", borderRadius:6, fontSize:11, fontWeight:700, fontFamily:"inherit" }}>BL Gap</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── TOP PAGES SECTION ─────────────────────────────────────── */}
        {activeSection==="pages" && (
          <div className="card" style={{ overflow:"hidden" }}>
            <div style={{ padding:"14px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center" }}>
              <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:15, flex:1 }}>Top Pages by Organic Traffic</div>
              <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"6px 12px", borderRadius:7, fontSize:12, fontFamily:"inherit" }}>
                <Download size={11} style={{marginRight:4}}/> Export
              </button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"2.5fr 1.5fr 100px 80px 100px", padding:"9px 20px", background:C.bg, borderBottom:`1px solid ${C.border}` }}>
              {["PAGE","TITLE","TRAFFIC","SHARE","KEYWORDS"].map(h=>(
                <div key={h} style={{ color:C.textDim, fontSize:10, fontWeight:700, letterSpacing:.4 }}>{h}</div>
              ))}
            </div>
            {topPages.map((p,i)=>(
              <div key={i} className="td" style={{ display:"grid", gridTemplateColumns:"2.5fr 1.5fr 100px 80px 100px", padding:"14px 20px", borderBottom:`1px solid ${C.border}`, alignItems:"center" }}>
                <div>
                  <div style={{ color:C.blueL, fontWeight:600, fontSize:13, marginBottom:2 }}>{domain}{p.page}</div>
                  <div style={{ display:"flex", gap:8, marginTop:4 }}>
                    <div style={{ flex:1, background:C.border, borderRadius:10, height:4, overflow:"hidden" }}>
                      <div style={{ width:p.share, height:"100%", background:C.blueL, borderRadius:10 }}/>
                    </div>
                  </div>
                </div>
                <div style={{ color:C.textMid, fontSize:12, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.title}</div>
                <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:14 }}>{p.traffic}</div>
                <span style={{ background:C.bluePale, color:C.blueL, fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:6 }}>{p.share}</span>
                <span style={{ color:C.textMid, fontSize:12 }}>{p.kws}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── GEO TRAFFIC SECTION ───────────────────────────────────── */}
        {activeSection==="geo" && (
          <>
            <div className="card" style={{ padding:"20px 24px", marginBottom:16 }}>
              <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:15, marginBottom:4 }}>Traffic by Country</div>
              <div style={{ color:C.textDim, fontSize:12, marginBottom:16 }}>Where your organic visitors come from — May 2026</div>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead><tr style={{ background:C.bg }}>
                  {["Country","Traffic Share","Monthly Visits","vs Last Month",""].map(h=>(
                    <th key={h} style={{ padding:"10px 16px", textAlign:"left", color:C.textDim, fontSize:10, fontWeight:700, borderBottom:`1px solid ${C.border}` }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {trafficByCountry.map((c,i)=>(
                    <tr key={i} className="td">
                      <td style={{ padding:"13px 16px", color:C.text, fontWeight:600, fontSize:14, borderBottom:`1px solid ${C.border}` }}>{c.country}</td>
                      <td style={{ padding:"13px 16px", borderBottom:`1px solid ${C.border}` }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <div style={{ width:120, background:C.border, borderRadius:10, height:6, overflow:"hidden" }}>
                            <div style={{ width:c.share, height:"100%", background:C.blueL, borderRadius:10 }}/>
                          </div>
                          <span style={{ color:C.text, fontWeight:700, fontSize:12, minWidth:36 }}>{c.share}</span>
                        </div>
                      </td>
                      <td style={{ padding:"13px 16px", color:C.text, fontSize:13, fontWeight:600, borderBottom:`1px solid ${C.border}` }}>{c.traffic}</td>
                      <td style={{ padding:"13px 16px", borderBottom:`1px solid ${C.border}` }}>
                        <span style={{ color:c.up?C.green:C.red, fontWeight:700, fontSize:13 }}>{c.change}</span>
                      </td>
                      <td style={{ padding:"13px 16px", borderBottom:`1px solid ${C.border}` }}>
                        <button onClick={()=>setCountry(`${c.country.split(" ")[0]} ${c.country.split(" ")[1]}`)} style={{ background:C.bg, border:`1px solid ${C.border}`, color:C.blueL, cursor:"pointer", padding:"4px 10px", borderRadius:6, fontSize:11, fontFamily:"inherit" }}>Filter</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

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
  const [tab, setTab] = useState("dashboard");
  const revData = [
    {m:"Jan",v:28000},{m:"Feb",v:32000},{m:"Mar",v:35000},{m:"Apr",v:38000},{m:"May",v:42000},{m:"Jun",v:45000}
  ];
  const plans = [
    { name:"Individual", price:"$12", users:123, c:C.blueL },
    { name:"Business",   price:"$40", users:124, c:C.blueL },
    { name:"Enterprise", price:"$12", users:324, c:C.blueL },
    { name:"Individual", price:"$12", users:98,  c:C.blueL },
  ];
  const subsUsers = [
    { name:"User 1", plan:"Individual", days:12 },
    { name:"User 2", plan:"Business",   days:12 },
    { name:"User 3", plan:"Business",   days:12 },
    { name:"User 4", plan:"Business",   days:12 },
    { name:"User 5", plan:"Business",   days:12 },
    { name:"User 6", plan:"Business",   days:12 },
  ];
  const planCol = n => n==="Individual"?C.blueL:n==="Business"?C.orange:C.purple;
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg }}>
      {/* Sidebar tabs */}
      <div style={{ display:"flex", height:"100%", position:"relative" }}>
        {/* Left mini nav */}
        <div style={{ width:170, background:C.white, borderRight:`1px solid ${C.border}`, flexShrink:0, padding:"16px 10px", display:"flex", flexDirection:"column", gap:4 }}>
          {[
            { id:"dashboard", icon:LayoutDashboard, label:"Dashboard" },
            { id:"users",     icon:Users,           label:"Users" },
            { id:"plans",     icon:BarChart2,      label:"Price and Plans" },
            { id:"payments",  icon:DollarSign,      label:"Payments" },
            { id:"settings",  icon:Settings,        label:"Settings" },
          ].map(({ id, icon:Icon, label }) => (
            <button key={id} onClick={()=>setTab(id)} style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 12px", borderRadius:8, border:"none", cursor:"pointer", fontSize:12, fontFamily:"inherit", fontWeight:tab===id?700:500, background:tab===id?C.bluePale:"transparent", color:tab===id?C.blueL:C.textMid, textAlign:"left" }}>
              <Icon size={14}/>{label}
            </button>
          ))}
          <div style={{ marginTop:4 }}>
            <button style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 12px", borderRadius:8, border:"none", cursor:"pointer", fontSize:12, fontFamily:"inherit", fontWeight:400, background:"transparent", color:C.textDim, textAlign:"left", width:"100%" }}>
              <HelpCircle size={14}/> Contact support
            </button>
          </div>
          <div style={{ borderRadius:8, border:`1px solid ${C.border}`, padding:"7px 12px", cursor:"pointer", textAlign:"center", fontSize:12, fontWeight:700, color:C.textMid, marginTop:4 }}>Help ?</div>
          <div style={{ marginTop:"auto", paddingTop:12, borderTop:`1px solid ${C.border}` }}>
            <button style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 12px", borderRadius:8, border:"none", cursor:"pointer", fontSize:12, fontFamily:"inherit", color:C.red, background:"transparent", width:"100%" }}>
              <LogOut size={14}/> Logout
            </button>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex:1, overflowY:"auto", padding:"20px 24px" }}>
          {/* Notification cards */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:16, marginBottom:20 }}>
            <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, padding:"18px 24px", display:"flex", alignItems:"center", gap:16, position:"relative", overflow:"hidden" }}>
              {/* Coin emojis */}
              <div style={{ position:"absolute", right:20, top:-5, fontSize:28, opacity:0.7 }}>🪙</div>
              <div style={{ position:"absolute", right:50, top:5, fontSize:20, opacity:0.5 }}>🪙</div>
              <div style={{ position:"absolute", right:35, top:25, fontSize:16, opacity:0.4 }}>🪙</div>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
                  <span style={{ color:C.text, fontWeight:700, fontSize:15 }}>New</span>
                  <span style={{ fontSize:16 }}>🔔</span>
                </div>
                <div style={{ color:C.textMid, fontSize:13 }}>12 subscriptions expired today!</div>
              </div>
            </div>
            <div style={{ background:C.white, border:`2px solid ${C.orange}`, borderRadius:12, padding:"16px 24px", textAlign:"center", minWidth:140 }}>
              <div style={{ color:C.orange, fontSize:12, fontWeight:700, marginBottom:6 }}>Expires in a month</div>
              <div className="sg" style={{ color:C.text, fontSize:36, fontWeight:800, lineHeight:1 }}>66</div>
            </div>
          </div>

          {/* Subscription Plans */}
          <div style={{ marginBottom:20 }}>
            <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:16, marginBottom:14 }}>Subscription Plans</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
              {plans.map((p,i)=>(
                <div key={i} className="card" style={{ padding:"16px 18px" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:10, height:10, borderRadius:"50%", background:p.c }}/>
                      <span style={{ color:C.text, fontWeight:700, fontSize:14 }}>{p.name}</span>
                    </div>
                    <span style={{ color:C.textDim, fontSize:14, cursor:"pointer" }}>···</span>
                  </div>
                  <div style={{ marginBottom:12 }}>
                    <span style={{ color:C.text, fontWeight:800, fontSize:18 }}>{p.price}</span>
                    <span style={{ color:C.textDim, fontSize:12 }}> / month</span>
                  </div>
                  <button style={{ width:"100%", background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"8px", borderRadius:7, fontSize:12, fontWeight:700, fontFamily:"inherit" }}>
                    {p.users} Users
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Users table */}
          <div className="card" style={{ overflow:"hidden", marginBottom:20 }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr style={{ background:C.bg }}>
                {["Username","Plan name","Remaining days"].map(h=>(
                  <th key={h} style={{ padding:"12px 20px", textAlign:"left", color:C.text, fontSize:13, fontWeight:700, borderBottom:`1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {subsUsers.map((u,i)=>(
                  <tr key={i} className="td">
                    <td style={{ padding:"12px 20px", color:C.textMid, fontSize:13, borderBottom:`1px solid ${C.border}` }}>{u.name}</td>
                    <td style={{ padding:"12px 20px", borderBottom:`1px solid ${C.border}` }}>
                      <span style={{ color:planCol(u.plan), fontWeight:600, fontSize:13 }}>{u.plan}</span>
                    </td>
                    <td style={{ padding:"12px 20px", color:C.textMid, fontSize:13, borderBottom:`1px solid ${C.border}` }}>{u.days} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding:"12px 20px", display:"flex", justifyContent:"flex-end", borderTop:`1px solid ${C.border}` }}>
              <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.blueL, cursor:"pointer", padding:"6px 16px", borderRadius:7, fontSize:12, fontFamily:"inherit", display:"flex", alignItems:"center", gap:5 }}>
                View all <ChevronDown size={11}/>
              </button>
            </div>
          </div>

          {/* Revenue chart */}
          <div className="card" style={{ padding:"18px 22px" }}>
            <div className="sg" style={{ color:C.text, fontSize:14, fontWeight:700, marginBottom:14 }}>Monthly Revenue</div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={revData} margin={{top:0,right:0,left:-22,bottom:0}}>
                <defs><linearGradient id="adg1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.green} stopOpacity={.2}/><stop offset="95%" stopColor={C.green} stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis dataKey="m" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false} tickFormatter={v=>`$${v/1000}k`}/>
                <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
                <Area type="monotone" dataKey="v" stroke={C.green} fill="url(#adg1)" strokeWidth={2.5} name="Revenue"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right stats column */}
        <div style={{ width:160, background:C.white, borderLeft:`1px solid ${C.border}`, flexShrink:0, padding:16, display:"flex", flexDirection:"column", gap:16 }}>
          {[
            { label:"No. of users", value:"80" },
            { label:"Active subscribers", value:"23" },
            { label:"Expired Sub.", value:"123" },
          ].map(s=>(
            <div key={s.label} className="card" style={{ padding:"14px 16px", textAlign:"center" }}>
              <div style={{ color:C.textDim, fontSize:11, marginBottom:6, lineHeight:1.4 }}>{s.label}</div>
              <div className="sg" style={{ color:C.text, fontSize:32, fontWeight:800 }}>{s.value}</div>
            </div>
          ))}
          <div style={{ marginTop:"auto", borderTop:`1px solid ${C.border}`, paddingTop:14 }}>
            {[{l:"Quick Actions",v:""},{l:"User Mgmt",ic:"usermanagement"},{l:"Payments",ic:"paymentlogs"},{l:"Push Notifs",ic:"pushnotifications"}].filter(a=>a.ic).map(a=>(
              <button key={a.ic} onClick={()=>onNavigate&&onNavigate(a.ic)} style={{ display:"block", width:"100%", background:"transparent", border:`1px solid ${C.border}`, color:C.blueL, cursor:"pointer", padding:"7px 8px", borderRadius:7, fontSize:11, fontFamily:"inherit", marginBottom:6 }}>{a.l} →</button>
            ))}
          </div>
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

// ════════════════════════════════════════════════════════════════
//  MONETIZATION LAYER — Plans, Usage, Upgrade Modals, Locks
// ════════════════════════════════════════════════════════════════

// ── Plan definitions (single source of truth) ────────────────────
const PLANS = {
  free:    { label:"Free",     color:C.textDim, bg:C.bg,      credits:10,  projects:1,  keywords:20,   pages:25,   team:1 },
  starter: { label:"Starter",  color:C.blueL,   bg:C.bluePale,credits:200, projects:5,  keywords:500,  pages:5000, team:2 },
  pro:     { label:"Pro",      color:C.orange,  bg:C.orangeL, credits:2000,projects:20, keywords:5000, pages:50000,team:10 },
  agency:  { label:"Agency",   color:C.purple,  bg:C.purpleL, credits:9999,projects:999,keywords:99999,pages:999999,team:50 },
};

// ── Usage context (simulated) ─────────────────────────────────────
const USAGE = {
  credits:    { used:8,   limit:10 },
  projects:   { used:1,   limit:1  },
  keywords:   { used:14,  limit:20 },
  pages:      { used:22,  limit:25 },
  teamMembers:{ used:1,   limit:1  },
};

// ── Upgrade Modal ────────────────────────────────────────────────
function UpgradeModal({ trigger, onClose, onUpgrade }) {
  const triggerMap = {
    credits:  { title:"AI Credits Running Low", desc:"You've used 8/10 AI credits this month. Upgrade to continue generating AI-powered reports and recommendations.", icon:"⚡" },
    projects: { title:"Project Limit Reached", desc:"You've reached your 1-project limit. Upgrade to track multiple domains and manage all your clients in one place.", icon:"📁" },
    keywords: { title:"Keyword Limit Reached", desc:"You're tracking 14/20 keywords. Upgrade to track unlimited keywords across all your projects.", icon:"🔑" },
    export:   { title:"Export Locked on Free Plan", desc:"PDF and CSV exports are available on Starter and above. Upgrade to create branded client reports.", icon:"📄" },
    team:     { title:"Team Collaboration is Pro+", desc:"Invite teammates, assign tasks, and collaborate in real-time. Available from the Starter plan.", icon:"👥" },
    whitelabel:{ title:"White-Label is Pro+", desc:"Remove Boostly branding and use your own logo, colors, and domain for client-facing reports.", icon:"🏷" },
    api:      { title:"API Access is Agency+", desc:"Integrate Boostly data into your own tools and workflows with full API access.", icon:"🔌" },
  };
  const info = triggerMap[trigger] || triggerMap.credits;
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.45)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center" }} onClick={onClose}>
      <div style={{ background:C.white,borderRadius:18,padding:"36px 40px",maxWidth:460,width:"90%",boxShadow:"0 20px 60px rgba(0,0,0,.2)",textAlign:"center" }} onClick={e=>e.stopPropagation()}>
        <div style={{ fontSize:48,marginBottom:12 }}>{info.icon}</div>
        <div className="sg" style={{ color:C.text,fontSize:20,fontWeight:800,marginBottom:10 }}>{info.title}</div>
        <p style={{ color:C.textMid,fontSize:14,lineHeight:1.65,marginBottom:24 }}>{info.desc}</p>
        {/* Plan cards */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:24 }}>
          {[
            { name:"Starter",price:29,features:["5 projects","500 keywords","200 AI credits","Client reports"] },
            { name:"Pro",price:79,features:["20 projects","5K keywords","2,000 AI credits","White-label"], popular:true },
            { name:"Agency",price:199,features:["Unlimited","Unlimited","Unlimited","Full API"] },
          ].map(p=>(
            <div key={p.name} style={{ border:`${p.popular?2:1}px solid ${p.popular?C.blueL:C.border}`,borderRadius:12,padding:"14px 12px",position:"relative",cursor:"pointer",background:p.popular?C.bluePale:C.bg }} onClick={onUpgrade}>
              {p.popular&&<div style={{ position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:C.blueL,color:"#fff",fontSize:9,fontWeight:800,padding:"3px 10px",borderRadius:20,whiteSpace:"nowrap" }}>BEST VALUE</div>}
              <div style={{ fontWeight:700,fontSize:13,color:C.text,marginBottom:4 }}>{p.name}</div>
              <div style={{ color:C.blueL,fontSize:20,fontWeight:800,marginBottom:8 }}>${p.price}<span style={{ color:C.textDim,fontSize:10,fontWeight:400 }}>/mo</span></div>
              {p.features.map(f=><div key={f} style={{ color:C.textMid,fontSize:10,marginBottom:3 }}>✓ {f}</div>)}
            </div>
          ))}
        </div>
        <div style={{ display:"flex",gap:10 }}>
          <button onClick={onClose} style={{ flex:1,background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",padding:"10px",borderRadius:9,fontSize:13,fontFamily:"inherit" }}>Maybe Later</button>
          <button onClick={onUpgrade} style={{ flex:2,background:`linear-gradient(135deg,${C.orange},#EA580C)`,color:"#fff",border:"none",cursor:"pointer",padding:"10px",borderRadius:9,fontSize:13,fontWeight:700,fontFamily:"inherit" }}>⚡ Upgrade Now — Save 25% Yearly</button>
        </div>
        <p style={{ color:C.textDim,fontSize:11,marginTop:10 }}>No contracts. Cancel anytime. 14-day money-back guarantee.</p>
      </div>
    </div>
  );
}

// ── Usage Meter bar (used in sidebar + settings) ──────────────────
function UsageMeter({ label, used, limit, color }) {
  const pct = Math.min((used/limit)*100,100);
  const danger = pct >= 80;
  return (
    <div style={{ marginBottom:8 }}>
      <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
        <span style={{ color:C.textDim,fontSize:10 }}>{label}</span>
        <span style={{ color:danger?C.red:C.textDim,fontSize:10,fontWeight:danger?700:400 }}>{used}/{limit}</span>
      </div>
      <div style={{ background:C.border,borderRadius:10,height:5,overflow:"hidden" }}>
        <div style={{ width:`${pct}%`,height:"100%",background:danger?C.red:(color||C.blueL),borderRadius:10,transition:"width .3s" }}/>
      </div>
    </div>
  );
}

// ── Locked Feature Overlay (put over any premium feature) ─────────
function LockedFeature({ feature, plan, children, onUpgrade }) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{ position:"relative",overflow:"hidden" }}
      onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
      <div style={{ filter:"blur(3px)",pointerEvents:"none",userSelect:"none",opacity:0.6 }}>{children}</div>
      <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.85)",borderRadius:10,backdropFilter:"blur(2px)" }}>
        <div style={{ width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${C.blue},${C.blueL})`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:8 }}>
          <Lock size={16} color="#fff"/>
        </div>
        <div style={{ color:C.text,fontWeight:700,fontSize:13,marginBottom:4 }}>{feature}</div>
        <div style={{ color:C.textDim,fontSize:11,marginBottom:12,textAlign:"center",maxWidth:180 }}>Available on {plan || "Pro"} plan and above</div>
        <button onClick={onUpgrade} style={{ background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"7px 18px",borderRadius:7,fontSize:12,fontWeight:700,fontFamily:"inherit" }}>
          🔒 Unlock with {plan||"Pro"}
        </button>
      </div>
    </div>
  );
}

// ── Plan badge (shown in topbar + settings) ───────────────────────
function PlanBadge({ plan, onClick }) {
  const p = PLANS[plan] || PLANS.free;
  return (
    <div onClick={onClick} style={{ display:"flex",alignItems:"center",gap:6,background:p.bg,border:`1px solid ${p.color}22`,borderRadius:7,padding:"4px 10px",cursor:"pointer" }}>
      <div style={{ width:7,height:7,borderRadius:"50%",background:p.color }}/>
      <span style={{ color:p.color,fontSize:11,fontWeight:700 }}>{p.label} Plan</span>
      <ChevronRight size={10} color={p.color}/>
    </div>
  );
}

// ── Automation Workflows ─────────────────────────────────────────
function AutomationWorkflows() {
  const [tab, setTab] = useState("active");
  const [showBuilder, setShowBuilder] = useState(false);
  const [builderStep, setBuilderStep] = useState(0);

  const automations = [
    { name:"Audit Completed → Generate Report", trigger:"Site Audit Completed", actions:["Generate AI Report","Notify Client via Email","Create Follow-up Task"], status:"Active", runs:24, last:"2h ago" },
    { name:"Keyword Drop → Alert Team", trigger:"Keyword drops 3+ positions", actions:["Send Slack notification","Create urgent task","Log to dashboard"], status:"Active", runs:8, last:"1d ago" },
    { name:"New Backlink → Record & Score", trigger:"New backlink detected", actions:["Score backlink quality","Add to tracker","Notify if DA 50+"], status:"Active", runs:142, last:"3h ago" },
    { name:"Invoice Overdue → Chase Sequence", trigger:"Invoice overdue 7 days", actions:["Send reminder email","Create follow-up task","Flag client as At Risk"], status:"Paused", runs:3, last:"5d ago" },
    { name:"Monthly → Auto-generate Client Reports", trigger:"1st of every month", actions:["Generate SEO report","Bundle rankings + audits","Send to client portal"], status:"Active", runs:12, last:"May 1" },
  ];

  const templates = [
    { icon:"📊", name:"Audit → Report → Notify",     desc:"Run audit, generate AI report, email client automatically",    triggers:2, actions:3 },
    { icon:"🔔", name:"Rank Drop Alert",              desc:"Alert team when any tracked keyword drops 3+ positions",         triggers:1, actions:2 },
    { icon:"💳", name:"Invoice Chase Sequence",       desc:"Automatically follow up on overdue invoices with escalation",    triggers:1, actions:4 },
    { icon:"📅", name:"Monthly Client Report",        desc:"Generate and deliver branded SEO report on the 1st each month",  triggers:1, actions:3 },
    { icon:"🔗", name:"New Backlink Quality Check",   desc:"Score and classify new backlinks as they're detected",           triggers:1, actions:3 },
    { icon:"⚡", name:"New Lead → Onboard Sequence",  desc:"Create project, run first audit, send welcome portal invite",    triggers:1, actions:5 },
  ];

  const builderSteps = [
    { title:"Choose Trigger",    desc:"What starts this automation?",   options:["Site Audit Completed","Keyword position changes","New backlink detected","Invoice overdue","New client added","Scheduled (daily/weekly/monthly)","Form submission","Manual trigger"] },
    { title:"Add Actions",       desc:"What should happen next?",       options:["Generate AI Report","Send Email Notification","Create Task","Notify Team (Slack)","Update Client Portal","Post to Dashboard","Assign to team member","Wait X days then..."] },
    { title:"Set Conditions",    desc:"Optional: only run when...",     options:["Only for Pro clients","Only if score < 70","Only weekdays","Only if first time","Only if revenue > $500","Skip if already done"] },
    { title:"Name & Activate",   desc:"Give your automation a name",    options:[] },
  ];

  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg }}>
      {/* Header strip */}
      <div style={{ padding:"14px 24px", background:C.white, borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ flex:1 }}>
          <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:15 }}>Automation Workflows</div>
          <div style={{ color:C.textDim, fontSize:11 }}>Replace manual work with automated sequences — set it once, run forever</div>
        </div>
        <button onClick={()=>setShowBuilder(true)} style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"9px 18px", borderRadius:8, fontSize:13, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 }}>
          <Plus size={13}/> New Automation
        </button>
      </div>

      <div style={{ padding:"20px 24px" }}>
        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:22 }}>
          {[
            { l:"Active Automations",  v:"4",   c:C.green,  icon:Activity },
            { l:"Total Runs (30d)",    v:"189", c:C.blueL,  icon:Repeat },
            { l:"Hours Saved (est.)",  v:"94h", c:C.orange, icon:Clock },
            { l:"Tasks Auto-created",  v:"47",  c:C.purple, icon:CheckSquare },
          ].map(({l,v,c,icon:Icon})=>(
            <div key={l} className="card" style={{ padding:"14px 18px" }}>
              <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8 }}>
                <div style={{ width:28, height:28, borderRadius:7, background:`${c}18`, display:"flex", alignItems:"center", justifyContent:"center" }}><Icon size={13} color={c}/></div>
                <span style={{ color:C.textDim, fontSize:11 }}>{l}</span>
              </div>
              <div className="sg" style={{ color:C.text, fontSize:22, fontWeight:800 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:0, borderBottom:`1px solid ${C.border}`, marginBottom:0, background:C.white, borderRadius:"10px 10px 0 0", overflow:"hidden" }}>
          {[["active","Active (4)"],["paused","Paused (1)"],["templates","Templates"],["history","Run History"]].map(([id,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={{ padding:"10px 20px", border:"none", borderBottom:tab===id?`2.5px solid ${C.blueL}`:"2.5px solid transparent", cursor:"pointer", fontSize:13, fontWeight:tab===id?700:500, fontFamily:"inherit", background:"transparent", color:tab===id?C.blueL:C.textMid, marginBottom:-1 }}>{label}</button>
          ))}
        </div>

        {/* Active / Paused automations */}
        {(tab==="active"||tab==="paused") && (
          <div className="card" style={{ overflow:"hidden" }}>
            {automations.filter(a=>tab==="active"?a.status==="Active":a.status==="Paused").map((a,i,arr)=>(
              <div key={i} style={{ padding:"16px 20px", borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:a.status==="Active"?C.greenL:C.yellowL, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Activity size={16} color={a.status==="Active"?C.green:C.yellow}/>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                      <span style={{ color:C.text, fontWeight:700, fontSize:14 }}>{a.name}</span>
                      <span className="chip" style={{ color:a.status==="Active"?C.green:C.yellow, background:a.status==="Active"?C.greenL:C.yellowL }}>{a.status}</span>
                    </div>
                    {/* Flow diagram */}
                    <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:8 }}>
                      <div style={{ background:C.bluePale, color:C.blueL, fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:6 }}>⚡ {a.trigger}</div>
                      {a.actions.map((ac,j)=>(
                        <div key={j} style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <span style={{ color:C.textDim, fontSize:12 }}>→</span>
                          <div style={{ background:C.bg, border:`1px solid ${C.border}`, color:C.textMid, fontSize:11, padding:"4px 10px", borderRadius:6 }}>✓ {ac}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display:"flex", gap:16 }}>
                      <span style={{ color:C.textDim, fontSize:11 }}>Ran {a.runs} times</span>
                      <span style={{ color:C.textDim, fontSize:11 }}>Last run: {a.last}</span>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:6 }}>
                    <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"5px 10px", borderRadius:6, fontSize:11, fontFamily:"inherit" }}>{a.status==="Active"?"Pause":"Resume"}</button>
                    <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.blueL, cursor:"pointer", padding:"5px 10px", borderRadius:6, fontSize:11, fontFamily:"inherit" }}>Edit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Templates */}
        {tab==="templates" && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, paddingTop:16 }}>
            {templates.map((t,i)=>(
              <div key={i} className="card ch" style={{ padding:20 }}>
                <div style={{ fontSize:28, marginBottom:12 }}>{t.icon}</div>
                <div style={{ color:C.text, fontWeight:700, fontSize:14, marginBottom:6 }}>{t.name}</div>
                <p style={{ color:C.textMid, fontSize:12, lineHeight:1.6, marginBottom:14 }}>{t.desc}</p>
                <div style={{ display:"flex", gap:8, marginBottom:14 }}>
                  <span className="chip" style={{ color:C.blueL, background:C.bluePale }}>{t.triggers} trigger{t.triggers>1?"s":""}</span>
                  <span className="chip" style={{ color:C.purple, background:C.purpleL }}>{t.actions} actions</span>
                </div>
                <button onClick={()=>{setShowBuilder(true);setBuilderStep(0);}} style={{ width:"100%", background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"8px", borderRadius:7, fontSize:12, fontWeight:700, fontFamily:"inherit" }}>Use Template</button>
              </div>
            ))}
          </div>
        )}

        {/* Run history */}
        {tab==="history" && (
          <div className="card" style={{ overflow:"hidden", marginTop:0 }}>
            <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", padding:"9px 16px", background:C.bg, borderBottom:`1px solid ${C.border}` }}>
              {["Automation","Status","Duration","Ran At"].map(h=><div key={h} style={{ color:C.textDim, fontSize:10, fontWeight:700 }}>{h}</div>)}
            </div>
            {[
              { name:"Audit Completed → Generate Report", status:"Success", dur:"4.2s", ran:"2h ago" },
              { name:"New Backlink Quality Check", status:"Success", dur:"1.1s", ran:"3h ago" },
              { name:"Monthly Client Report", status:"Success", dur:"12.4s", ran:"May 1" },
              { name:"Keyword Drop Alert", status:"Success", dur:"0.8s", ran:"1d ago" },
              { name:"Invoice Chase Sequence", status:"Failed", dur:"—", ran:"5d ago" },
            ].map((r,i)=>(
              <div key={i} className="td" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", padding:"11px 16px", borderBottom:`1px solid ${C.border}`, alignItems:"center" }}>
                <span style={{ color:C.text, fontSize:13 }}>{r.name}</span>
                <span className="chip" style={{ color:r.status==="Success"?C.green:C.red, background:r.status==="Success"?C.greenL:C.redL }}>{r.status}</span>
                <span style={{ color:C.textMid, fontSize:12 }}>{r.dur}</span>
                <span style={{ color:C.textDim, fontSize:12 }}>{r.ran}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Automation Builder Modal */}
      {showBuilder && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.45)", zIndex:500, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={()=>setShowBuilder(false)}>
          <div style={{ background:C.white, borderRadius:18, padding:"32px 36px", width:"90%", maxWidth:560, boxShadow:"0 20px 60px rgba(0,0,0,.2)" }} onClick={e=>e.stopPropagation()}>
            {/* Progress */}
            <div style={{ display:"flex", gap:6, marginBottom:20 }}>
              {builderSteps.map((_,i)=>(
                <div key={i} style={{ flex:1, height:5, borderRadius:3, background:i<=builderStep?C.blueL:C.border }}/>
              ))}
            </div>
            <div className="sg" style={{ color:C.text, fontSize:18, fontWeight:800, marginBottom:4 }}>{builderSteps[builderStep].title}</div>
            <div style={{ color:C.textDim, fontSize:13, marginBottom:18 }}>{builderSteps[builderStep].desc}</div>
            {builderStep<3 ? (
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
                {builderSteps[builderStep].options.map((opt,i)=>(
                  <div key={i} className="hl" style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:9, padding:"11px 14px", cursor:"pointer", color:C.text, fontSize:13 }}>
                    {opt}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ marginBottom:24 }}>
                <input placeholder="e.g. Monthly Client Report Builder" style={{ width:"100%", background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 14px", color:C.text, fontSize:13, fontFamily:"inherit", outline:"none" }}/>
              </div>
            )}
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>builderStep>0?setBuilderStep(s=>s-1):setShowBuilder(false)} style={{ flex:1, background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"10px", borderRadius:9, fontSize:13, fontFamily:"inherit" }}>{builderStep>0?"Back":"Cancel"}</button>
              <button onClick={()=>builderStep<3?setBuilderStep(s=>s+1):setShowBuilder(false)} style={{ flex:2, background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"10px", borderRadius:9, fontSize:13, fontWeight:700, fontFamily:"inherit" }}>{builderStep<3?"Continue →":"✓ Activate Automation"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── File & Document Management ───────────────────────────────────
function FileManager() {
  const [folder, setFolder] = useState("all");
  const [view, setViewMode] = useState("list");
  const files = [
    { name:"Dental Pro — SEO Report May 2026.pdf", type:"PDF", size:"2.4 MB", client:"Dental Pro", date:"May 1", folder:"reports", icon:"📄" },
    { name:"LegalEdge Audit Findings Q1.pdf",       type:"PDF", size:"1.8 MB", client:"LegalEdge", date:"Apr 5", folder:"reports", icon:"📄" },
    { name:"SEO Engine Boost Contract 2026.docx",   type:"DOCX", size:"480 KB", client:"Internal", date:"Jan 12", folder:"contracts", icon:"📝" },
    { name:"FitLife Proposal — Pro Package.pdf",    type:"PDF", size:"3.1 MB", client:"FitLife", date:"Mar 28", folder:"proposals", icon:"📋" },
    { name:"Google Analytics Credentials.txt",     type:"TXT", size:"2 KB",   client:"Internal", date:"Feb 3", folder:"credentials", icon:"🔑" },
    { name:"TechFlow Campaign Assets.zip",          type:"ZIP", size:"24 MB",  client:"TechFlow", date:"Apr 15", folder:"assets", icon:"📦" },
    { name:"Keyword Research — May 2026.xlsx",      type:"XLSX", size:"890 KB", client:"Internal", date:"May 2", folder:"reports", icon:"📊" },
    { name:"Client Onboarding Checklist.docx",      type:"DOCX", size:"120 KB", client:"Internal", date:"Mar 1", folder:"templates", icon:"✅" },
  ];
  const folders = [
    { id:"all",         label:"All Files",   count:files.length,     icon:"📁" },
    { id:"reports",     label:"Reports",     count:files.filter(f=>f.folder==="reports").length,     icon:"📊" },
    { id:"contracts",   label:"Contracts",   count:files.filter(f=>f.folder==="contracts").length,   icon:"📝" },
    { id:"proposals",   label:"Proposals",   count:files.filter(f=>f.folder==="proposals").length,   icon:"📋" },
    { id:"credentials", label:"Credentials", count:files.filter(f=>f.folder==="credentials").length, icon:"🔑" },
    { id:"assets",      label:"Assets",      count:files.filter(f=>f.folder==="assets").length,      icon:"📦" },
    { id:"templates",   label:"Templates",   count:files.filter(f=>f.folder==="templates").length,   icon:"⚙️" },
  ];
  const displayed = folder==="all" ? files : files.filter(f=>f.folder===folder);
  const typeCol = t => t==="PDF"?C.red:t==="DOCX"?C.blueL:t==="XLSX"?C.green:t==="ZIP"?C.orange:C.textDim;

  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg }}>
      <div style={{ display:"flex", height:"100%" }}>
        {/* Left folder nav */}
        <div style={{ width:200, background:C.white, borderRight:`1px solid ${C.border}`, padding:"16px 10px", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12, padding:"0 6px" }}>
            <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:13 }}>Files</span>
            <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", width:22, height:22, borderRadius:5, display:"flex", alignItems:"center", justifyContent:"center" }}><Plus size={11}/></button>
          </div>
          {folders.map(f=>(
            <button key={f.id} onClick={()=>setFolder(f.id)} style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"8px 10px", borderRadius:7, border:"none", cursor:"pointer", background:folder===f.id?C.bluePale:"transparent", color:folder===f.id?C.blueL:C.textMid, fontSize:12, fontFamily:"inherit", fontWeight:folder===f.id?700:400, marginBottom:2, textAlign:"left" }}>
              <span>{f.icon}</span>
              <span style={{ flex:1 }}>{f.label}</span>
              <span style={{ background:folder===f.id?C.blueL:C.bg, color:folder===f.id?"#fff":C.textDim, fontSize:9, fontWeight:700, padding:"1px 6px", borderRadius:10 }}>{f.count}</span>
            </button>
          ))}
          {/* Storage usage */}
          <div style={{ marginTop:20, padding:"10px 10px", background:C.bg, borderRadius:9 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
              <span style={{ color:C.textDim, fontSize:10 }}>Storage used</span>
              <span style={{ color:C.textDim, fontSize:10 }}>3.2 / 5 GB</span>
            </div>
            <ProgBar v={64} col={C.blueL} h={5}/>
            <div style={{ color:C.textDim, fontSize:10, marginTop:4 }}>1.8 GB remaining</div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex:1, padding:"16px 20px", overflowY:"auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
            <div style={{ flex:1, display:"flex", alignItems:"center", gap:8, background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 12px" }}>
              <Search size={13} color={C.textDim}/>
              <input placeholder="Search files..." style={{ background:"transparent", border:"none", outline:"none", color:C.text, fontSize:13, fontFamily:"inherit", flex:1 }}/>
            </div>
            <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"9px 18px", borderRadius:8, fontSize:13, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", gap:5 }}>
              <Upload size={13}/> Upload
            </button>
          </div>
          <div className="card" style={{ overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"2fr 100px 120px 140px 120px 100px", padding:"9px 16px", background:C.bg, borderBottom:`1px solid ${C.border}` }}>
              {["Name","Type","Size","Client","Date",""].map(h=><div key={h} style={{ color:C.textDim, fontSize:10, fontWeight:700 }}>{h}</div>)}
            </div>
            {displayed.map((f,i)=>(
              <div key={i} className="td" style={{ display:"grid", gridTemplateColumns:"2fr 100px 120px 140px 120px 100px", padding:"11px 16px", borderBottom:`1px solid ${C.border}`, alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:16 }}>{f.icon}</span>
                  <span style={{ color:C.text, fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.name}</span>
                </div>
                <span className="chip" style={{ color:typeCol(f.type), background:`${typeCol(f.type)}18` }}>{f.type}</span>
                <span style={{ color:C.textMid, fontSize:12 }}>{f.size}</span>
                <span style={{ color:C.textMid, fontSize:12 }}>{f.client}</span>
                <span style={{ color:C.textDim, fontSize:12 }}>{f.date}</span>
                <div style={{ display:"flex", gap:4 }}>
                  <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.blueL, cursor:"pointer", padding:"4px 8px", borderRadius:5, fontSize:10, fontFamily:"inherit" }}>↓</button>
                  <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"4px 8px", borderRadius:5, fontSize:10, fontFamily:"inherit" }}>⋯</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
//  ENTERPRISE QUALITY LAYER
//  Toast · CommandPalette · SearchOverlay · QuickStart · ActivityLog
// ════════════════════════════════════════════════════════════════════

// ── Toast Notification System ─────────────────────────────────────
function ToastContainer({ toasts, removeToast }) {
  return (
    <div style={{ position:"fixed", bottom:24, right:24, zIndex:9999, display:"flex", flexDirection:"column-reverse", gap:8, pointerEvents:"none" }}>
      {toasts.map(t => (
        <div key={t.id} className="fade" style={{ background:t.type==="success"?C.green:t.type==="error"?C.red:t.type==="warn"?C.orange:C.text, color:"#fff", borderRadius:10, padding:"11px 18px", fontSize:13, fontWeight:600, display:"flex", alignItems:"center", gap:10, boxShadow:"0 4px 20px rgba(0,0,0,.18)", pointerEvents:"all", maxWidth:340, minWidth:220 }}>
          <span style={{ fontSize:16 }}>{t.type==="success"?"✓":t.type==="error"?"✗":t.type==="warn"?"⚠":"ℹ"}</span>
          <span style={{ flex:1, lineHeight:1.4 }}>{t.msg}</span>
          <button onClick={()=>removeToast(t.id)} style={{ background:"rgba(255,255,255,.2)", border:"none", cursor:"pointer", width:20, height:20, borderRadius:4, color:"#fff", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
        </div>
      ))}
    </div>
  );
}

// ── Command Palette (⌘K) ──────────────────────────────────────────
function CommandPalette({ onClose, onNavigate, screens }) {
  const [q, setQ] = useState("");
  const ref = useRef(null);

  useEffect(() => { ref.current?.focus(); }, []);

  const items = [
    { label:"SEO Dashboard",       id:"crawl",          icon:"🏠", section:"Navigate" },
    { label:"Site Audit",          id:"siteaudit",      icon:"🔍", section:"Navigate" },
    { label:"Keyword Research",    id:"keyword",        icon:"🔑", section:"Navigate" },
    { label:"Rank Tracking",       id:"rank",           icon:"📈", section:"Navigate" },
    { label:"Backlink Research",   id:"backlink",       icon:"🔗", section:"Navigate" },
    { label:"Competitive Research",id:"competitive",    icon:"⚔️", section:"Navigate" },
    { label:"Content Lab",         id:"contentlab",     icon:"✍️", section:"Navigate" },
    { label:"AI Suggestions",      id:"aisuggestions",  icon:"⚡", section:"Navigate" },
    { label:"Reports",             id:"reports",        icon:"📊", section:"Navigate" },
    { label:"Clients",             id:"clients",        icon:"👥", section:"Navigate" },
    { label:"Tasks",               id:"tasks",          icon:"✅", section:"Navigate" },
    { label:"Messages",            id:"messages",       icon:"💬", section:"Navigate" },
    { label:"Automations",         id:"automations",    icon:"🤖", section:"Navigate" },
    { label:"File Manager",        id:"files",          icon:"📁", section:"Navigate" },
    { label:"Settings",            id:"settings",       icon:"⚙️", section:"Navigate" },
    { label:"Run New Site Audit",  id:"siteaudit",      icon:"🚀", section:"Quick Actions" },
    { label:"Add New Keyword",     id:"keyword",        icon:"➕", section:"Quick Actions" },
    { label:"Create Report",       id:"reports",        icon:"📄", section:"Quick Actions" },
    { label:"Invite Team Member",  id:"team",           icon:"👤", section:"Quick Actions" },
    { label:"Schedule Meeting",    id:"calendar",       icon:"📅", section:"Quick Actions" },
    { label:"Create Invoice",      id:"clients",        icon:"💳", section:"Quick Actions" },
  ];

  const filtered = q.trim()
    ? items.filter(i => i.label.toLowerCase().includes(q.toLowerCase()))
    : items;

  const sections = [...new Set(filtered.map(i => i.section))];

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.55)", zIndex:2000, display:"flex", alignItems:"flex-start", justifyContent:"center", paddingTop:"14vh" }} onClick={onClose}>
      <div style={{ background:C.white, borderRadius:16, width:560, maxHeight:480, overflow:"hidden", boxShadow:"0 24px 80px rgba(0,0,0,.25)", display:"flex", flexDirection:"column" }} onClick={e=>e.stopPropagation()}>
        {/* Search input */}
        <div style={{ padding:"14px 18px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:10 }}>
          <Search size={16} color={C.textDim}/>
          <input ref={ref} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search or navigate anywhere..." style={{ flex:1, border:"none", outline:"none", fontSize:14, color:C.text, fontFamily:"inherit", background:"transparent" }}
            onKeyDown={e=>{ if(e.key==="Escape") onClose(); if(e.key==="Enter"&&filtered[0]){ onNavigate(filtered[0].id); onClose(); }}}/>
          <kbd style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:5, padding:"2px 7px", fontSize:11, color:C.textDim }}>ESC</kbd>
        </div>
        {/* Results */}
        <div style={{ overflowY:"auto", flex:1 }}>
          {sections.map(section => (
            <div key={section}>
              <div style={{ padding:"10px 18px 4px", color:C.textDim, fontSize:10, fontWeight:700, letterSpacing:1.2, textTransform:"uppercase" }}>{section}</div>
              {filtered.filter(i=>i.section===section).map((item,idx) => (
                <div key={idx} onClick={()=>{ onNavigate(item.id); onClose(); }} className="hl" style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 18px", cursor:"pointer" }}>
                  <span style={{ fontSize:18, width:24, textAlign:"center" }}>{item.icon}</span>
                  <span style={{ color:C.text, fontSize:13, flex:1 }}>{item.label}</span>
                  <kbd style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:4, padding:"1px 6px", fontSize:10, color:C.textDim }}>↵</kbd>
                </div>
              ))}
            </div>
          ))}
          {filtered.length===0 && (
            <div style={{ padding:"32px", textAlign:"center", color:C.textDim }}>
              <div style={{ fontSize:32, marginBottom:8 }}>🔍</div>
              <div style={{ fontSize:13 }}>No results for "{q}"</div>
            </div>
          )}
        </div>
        <div style={{ padding:"10px 18px", borderTop:`1px solid ${C.border}`, display:"flex", gap:16, background:C.bg }}>
          <span style={{ color:C.textDim, fontSize:11 }}>↑↓ Navigate</span>
          <span style={{ color:C.textDim, fontSize:11 }}>↵ Open</span>
          <span style={{ color:C.textDim, fontSize:11 }}>ESC Close</span>
          <span style={{ marginLeft:"auto", color:C.textDim, fontSize:11 }}>Tip: Use ⌘K / Ctrl+K to open</span>
        </div>
      </div>
    </div>
  );
}

// ── Quick Start Guide ─────────────────────────────────────────────
function QuickStartGuide({ onNavigate, onClose }) {
  const [done, setDone] = useState([]);
  const steps = [
    { id:"project",  icon:"🏗", title:"Create your first project",          desc:"Add your domain to start tracking",        action:"crawl",    time:"1 min" },
    { id:"audit",    icon:"🔍", title:"Run a site audit",                   desc:"Find and fix all technical SEO issues",    action:"siteaudit",time:"2 min" },
    { id:"keywords", icon:"🔑", title:"Add keywords to track",              desc:"Monitor your ranking positions daily",     action:"rank",     time:"1 min" },
    { id:"team",     icon:"👤", title:"Invite your first team member",      desc:"Collaborate inside the platform",          action:"team",     time:"30 sec" },
    { id:"client",   icon:"👥", title:"Add your first client",              desc:"Set up client portal and reporting",       action:"clients",  time:"2 min" },
    { id:"report",   icon:"📊", title:"Generate your first AI report",      desc:"Branded report ready to send to clients", action:"reports",  time:"1 min" },
    { id:"automate", icon:"⚡", title:"Set up an automation",               desc:"Replace manual work with AI workflows",    action:"automations",time:"2 min" },
  ];
  const pct = Math.round((done.length/steps.length)*100);

  return (
    <div style={{ position:"fixed", bottom:80, right:24, width:340, background:C.white, borderRadius:16, boxShadow:"0 12px 40px rgba(0,0,0,.18)", border:`1px solid ${C.border}`, zIndex:500, overflow:"hidden" }}>
      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${C.blue},${C.blueL})`, padding:"16px 18px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
          <div className="sg" style={{ color:"#fff", fontWeight:800, fontSize:14 }}>🚀 Quick Start</div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,.15)", border:"none", cursor:"pointer", width:24, height:24, borderRadius:6, color:"#fff", fontSize:14 }}>×</button>
        </div>
        <div style={{ background:"rgba(255,255,255,.2)", borderRadius:6, height:6, marginBottom:6 }}>
          <div style={{ width:`${pct}%`, height:"100%", background:"#fff", borderRadius:6, transition:"width .3s" }}/>
        </div>
        <div style={{ color:"rgba(255,255,255,.8)", fontSize:11 }}>{done.length}/{steps.length} completed · {pct}% setup done</div>
      </div>
      {/* Steps */}
      <div style={{ maxHeight:320, overflowY:"auto" }}>
        {steps.map(s => {
          const isDone = done.includes(s.id);
          return (
            <div key={s.id} className="hl" style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 14px", borderBottom:`1px solid ${C.border}`, cursor:"pointer", background:isDone?C.greenL+"40":"transparent" }}
              onClick={()=>{ if(!isDone) setDone(d=>[...d,s.id]); onNavigate(s.action); }}>
              <div style={{ width:32, height:32, borderRadius:8, background:isDone?C.greenL:C.bg, border:`2px solid ${isDone?C.green:C.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                {isDone ? <CheckCircle2 size={14} color={C.green}/> : <span style={{ fontSize:14 }}>{s.icon}</span>}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ color:isDone?C.textDim:C.text, fontWeight:isDone?400:600, fontSize:12, marginBottom:1, textDecoration:isDone?"line-through":"none" }}>{s.title}</div>
                <div style={{ color:C.textDim, fontSize:10 }}>{s.desc}</div>
              </div>
              <span style={{ color:C.textDim, fontSize:10, flexShrink:0 }}>{s.time}</span>
            </div>
          );
        })}
      </div>
      {pct===100 && (
        <div style={{ padding:"12px 16px", background:C.greenL, textAlign:"center" }}>
          <div style={{ color:C.green, fontWeight:700, fontSize:13 }}>🎉 Setup complete! You're ready to launch.</div>
        </div>
      )}
    </div>
  );
}

// ── Activity Log Screen ───────────────────────────────────────────
function ActivityLog() {
  const [filter, setFilter] = useState("all");
  const activities = [
    { user:"You",          action:"Generated AI SEO Report",           resource:"Dental Pro",          type:"ai",      time:"2 min ago",  icon:"⚡" },
    { user:"Mahmoud",      action:"Completed keyword audit",            resource:"TechFlow",            type:"seo",     time:"14 min ago", icon:"🔑" },
    { user:"AI Copilot",   action:"Fixed 3 broken internal links",     resource:"seoengineboost.com",  type:"ai",      time:"1h ago",     icon:"🤖" },
    { user:"Aisha",        action:"Created 4 tasks",                   resource:"May Campaign",        type:"task",    time:"2h ago",     icon:"✅" },
    { user:"You",          action:"Sent invoice INV-2026-043",          resource:"TechFlow Agency",     type:"billing", time:"3h ago",     icon:"💳" },
    { user:"Sam",          action:"Published blog post",               resource:"Dental Client",       type:"content", time:"4h ago",     icon:"📝" },
    { user:"Jordan",       action:"Approved client report",            resource:"LegalEdge Q1 Report", type:"approval",time:"5h ago",     icon:"✓" },
    { user:"You",          action:"Ran site audit",                    resource:"dentalpro.com",       type:"seo",     time:"Yesterday",  icon:"🔍" },
    { user:"AI Copilot",   action:"Generated monthly report",          resource:"All clients",         type:"ai",      time:"Yesterday",  icon:"📊" },
    { user:"Mahmoud",      action:"Added 12 new keywords",             resource:"FitLife Studio",      type:"seo",     time:"2d ago",     icon:"🔑" },
    { user:"System",       action:"Automation triggered: Invoice Chase", resource:"LegalEdge",         type:"auto",    time:"2d ago",     icon:"⚡" },
    { user:"You",          action:"Upgraded plan to Pro",              resource:"Billing",             type:"billing", time:"3d ago",     icon:"💎" },
  ];
  const types = [["all","All"],["ai","AI Actions"],["seo","SEO"],["task","Tasks"],["billing","Billing"],["auto","Automations"],["approval","Approvals"]];
  const typeCol = t => ({ai:C.purple,seo:C.blueL,task:C.green,billing:C.orange,auto:C.blueL,approval:C.green,content:C.yellow})[t]||C.textDim;
  const filtered = filter==="all" ? activities : activities.filter(a=>a.type===filter);
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg, padding:"20px 24px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {types.map(([id,label])=>(
            <button key={id} onClick={()=>setFilter(id)} style={{ background:filter===id?C.blueL:"transparent", color:filter===id?"#fff":C.textMid, border:`1px solid ${filter===id?C.blueL:C.border}`, cursor:"pointer", padding:"6px 14px", borderRadius:20, fontSize:12, fontFamily:"inherit" }}>{label}</button>
          ))}
        </div>
        <button style={{ marginLeft:"auto", background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"7px 14px", borderRadius:7, fontSize:12, fontFamily:"inherit" }}>Export Log ↓</button>
      </div>
      <div className="card" style={{ overflow:"hidden" }}>
        {filtered.map((a,i)=>(
          <div key={i} className="td" style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 18px", borderBottom:i<filtered.length-1?`1px solid ${C.border}`:"none" }}>
            <div style={{ width:36, height:36, borderRadius:10, background:`${typeCol(a.type)}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:16 }}>{a.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
                <span style={{ color:C.text, fontWeight:700, fontSize:13 }}>{a.user}</span>
                <span style={{ color:C.textMid, fontSize:13 }}>{a.action}</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ color:C.blueL, fontSize:11, fontWeight:600 }}>{a.resource}</span>
                <span className="chip" style={{ color:typeCol(a.type), background:`${typeCol(a.type)}18`, fontSize:9 }}>{a.type.toUpperCase()}</span>
              </div>
            </div>
            <span style={{ color:C.textDim, fontSize:11, flexShrink:0 }}>{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Notifications Full Screen ─────────────────────────────────────
function NotificationsScreen() {
  const [filter, setFilter] = useState("all");
  const [readAll, setReadAll] = useState(false);
  const notifs = [
    { icon:CheckCircle2, c:C.green,  title:"Audit complete",             body:"Site audit for dentalpro.com found 18 issues. View report.", time:"2m ago",  unread:true,  type:"audit" },
    { icon:TrendingUp,   c:C.blueL,  title:"Keyword moved to #3",         body:"'seo tools 2026' moved from #7 to #3 this week.",           time:"14m ago", unread:true,  type:"rank" },
    { icon:MessageSquare,c:C.orange, title:"Mahmoud mentioned you",       body:"In #seo-team: '@You, can you check the TechFlow audit?'",   time:"1h ago",  unread:true,  type:"chat" },
    { icon:AlertCircle,  c:C.red,    title:"AI credits running low",      body:"You have 2/10 AI credits remaining this month.",            time:"2h ago",  unread:true,  type:"billing" },
    { icon:Bot,          c:C.purple, title:"AI report ready",             body:"Monthly SEO report for Dental Pro is ready to download.",   time:"3h ago",  unread:false, type:"ai" },
    { icon:BarChart2,    c:C.green,  title:"Traffic up 18% this week",    body:"Organic traffic for seoengineboost.com hit a new high.",    time:"5h ago",  unread:false, type:"analytics" },
    { icon:AlertCircle,  c:C.orange, title:"Invoice overdue",             body:"Invoice INV-2026-040 for LegalEdge is 7 days overdue.",     time:"Yesterday",unread:false,type:"billing" },
    { icon:Users,        c:C.blueL,  title:"Sam joined your workspace",   body:"Sam Chen accepted your invitation and joined the team.",    time:"2d ago",  unread:false, type:"team" },
  ];
  const filtered = filter==="all" ? notifs : filter==="unread" ? notifs.filter(n=>n.unread) : notifs.filter(n=>n.type===filter);
  const unreadCount = notifs.filter(n=>n.unread).length;

  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg, padding:"20px 24px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
        <div style={{ display:"flex", gap:6 }}>
          {[["all","All"],["unread",`Unread (${unreadCount})`],["audit","Audits"],["rank","Rankings"],["chat","Chat"],["billing","Billing"],["ai","AI"]].map(([id,label])=>(
            <button key={id} onClick={()=>setFilter(id)} style={{ background:filter===id?C.blueL:"transparent", color:filter===id?"#fff":C.textMid, border:`1px solid ${filter===id?C.blueL:C.border}`, cursor:"pointer", padding:"6px 14px", borderRadius:20, fontSize:12, fontFamily:"inherit" }}>{label}</button>
          ))}
        </div>
        <button onClick={()=>setReadAll(true)} style={{ marginLeft:"auto", background:"transparent", border:`1px solid ${C.border}`, color:C.blueL, cursor:"pointer", padding:"7px 14px", borderRadius:7, fontSize:12, fontFamily:"inherit" }}>Mark all read</button>
      </div>
      <div className="card" style={{ overflow:"hidden" }}>
        {filtered.map((n,i)=>(
          <div key={i} className="td" style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"14px 18px", borderBottom:i<filtered.length-1?`1px solid ${C.border}`:"none", background:n.unread&&!readAll?`${n.c}06`:"transparent" }}>
            {n.unread&&!readAll && <div style={{ width:7, height:7, borderRadius:"50%", background:C.blueL, marginTop:5, flexShrink:0 }}/>}
            {(!n.unread||readAll) && <div style={{ width:7, height:7, flexShrink:0 }}/>}
            <div style={{ width:36, height:36, borderRadius:10, background:`${n.c}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <n.icon size={16} color={n.c}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ color:C.text, fontWeight:n.unread&&!readAll?700:600, fontSize:13, marginBottom:3 }}>{n.title}</div>
              <div style={{ color:C.textMid, fontSize:12, lineHeight:1.5 }}>{n.body}</div>
            </div>
            <div style={{ flexShrink:0, textAlign:"right" }}>
              <div style={{ color:C.textDim, fontSize:11, marginBottom:4 }}>{n.time}</div>
              <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.blueL, cursor:"pointer", padding:"3px 8px", borderRadius:5, fontSize:10, fontFamily:"inherit" }}>View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Updated SCREENS Map (with all screens including new sub-screens) ────
// ══════════════════════════════════════════════════════════════════
//  BILLING PAGE — Stripe-quality, fully interactive
// ══════════════════════════════════════════════════════════════════
function BillingPage({ onUpgrade, onNavigate, addToast, plan }) {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardNo, setCardNo] = useState("•••• •••• •••• 4242");
  const [tab, setTab] = useState("overview");

  const currentPlan = plan || "free";
  const plans = [
    { id:"free",    name:"Free",       mo:0,   yr:0,   color:C.textDim,  bg:C.bg,       features:["1 project","25 pages/crawl","20 keywords","10 AI credits","Basic audit"] },
    { id:"starter", name:"Starter",    mo:29,  yr:22,  color:C.blueL,    bg:C.bluePale, features:["5 projects","5K pages/crawl","500 keywords","200 AI credits","PDF reports","Basic automations"] },
    { id:"pro",     name:"Pro",        mo:79,  yr:59,  color:C.orange,   bg:C.orangeL,  popular:true, features:["20 projects","50K pages/crawl","5K keywords","2,000 AI credits","White-label","Team (10)","API access"] },
    { id:"agency",  name:"Agency",     mo:199, yr:149, color:C.purple,   bg:C.purpleL,  features:["Unlimited everything","9,999 AI credits","Full API","Team (50)","Custom domain","Dedicated support"] },
  ];

  const invoices = [
    { inv:"INV-2026-044", date:"May 1, 2026",  amount:79,  plan:"Pro",     status:"Paid",   period:"May 2026" },
    { inv:"INV-2026-038", date:"Apr 1, 2026",  amount:79,  plan:"Pro",     status:"Paid",   period:"Apr 2026" },
    { inv:"INV-2026-032", date:"Mar 1, 2026",  amount:79,  plan:"Pro",     status:"Paid",   period:"Mar 2026" },
    { inv:"INV-2026-026", date:"Feb 1, 2026",  amount:29,  plan:"Starter", status:"Paid",   period:"Feb 2026" },
    { inv:"INV-2026-019", date:"Jan 1, 2026",  amount:29,  plan:"Starter", status:"Paid",   period:"Jan 2026" },
    { inv:"INV-2025-148", date:"Dec 1, 2025",  amount:0,   plan:"Free",    status:"Free",   period:"Dec 2025" },
  ];

  const usage = [
    { label:"AI Credits",        used:8,    limit:10,    unit:"credits",    reset:"Jun 1" },
    { label:"Site Audits",       used:4,    limit:4,     unit:"audits",     reset:"Jun 1" },
    { label:"Keywords Tracked",  used:14,   limit:20,    unit:"keywords",   reset:"Jun 1" },
    { label:"Projects",          used:1,    limit:1,     unit:"projects",   reset:"Never" },
    { label:"Team Members",      used:1,    limit:1,     unit:"members",    reset:"Never" },
    { label:"Reports Generated", used:8,    limit:20,    unit:"reports",    reset:"Jun 1" },
  ];

  const cp = plans.find(p=>p.id===currentPlan) || plans[0];

  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg }}>
      {/* Tabs */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, padding:"0 32px", display:"flex", alignItems:"center" }}>
        {[["overview","💳 Overview"],["plans","📦 Plans"],["invoices","🧾 Invoices"],["credits","⚡ AI Credits"]].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{ padding:"13px 18px", border:"none", borderBottom:tab===id?`2.5px solid ${C.blueL}`:"2.5px solid transparent", cursor:"pointer", fontSize:13, fontWeight:tab===id?700:500, fontFamily:"inherit", background:"transparent", color:tab===id?C.blueL:C.textMid, marginBottom:-1 }}>{label}</button>
        ))}
      </div>

      <div style={{ padding:"28px 32px" }}>

        {/* ── OVERVIEW TAB ── */}
        {tab==="overview" && (
          <>
            {/* Current plan hero */}
            <div style={{ background:`linear-gradient(135deg,${C.blue},${C.blueL})`, borderRadius:16, padding:"28px 32px", marginBottom:24, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", right:-40, top:-40, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,.07)" }}/>
              <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:20, position:"relative" }}>
                <div>
                  <div style={{ color:"rgba(255,255,255,.7)", fontSize:11, fontWeight:700, letterSpacing:1, marginBottom:6 }}>CURRENT PLAN</div>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
                    <span className="sg" style={{ color:"#fff", fontSize:30, fontWeight:900 }}>{cp.name} Plan</span>
                    <span style={{ background:"rgba(255,255,255,.2)", color:"#fff", padding:"4px 12px", borderRadius:20, fontSize:12, fontWeight:700 }}>{currentPlan==="free"?"Free":"Active ✓"}</span>
                  </div>
                  <div style={{ color:"rgba(255,255,255,.75)", fontSize:14 }}>
                    {cp.mo===0 ? "Free forever · Limited features" : `$${billingCycle==="monthly"?cp.mo:cp.yr}/month · Renews Jun 1, 2026`}
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  {currentPlan!=="agency" && (
                    <button onClick={()=>setTab("plans")} style={{ background:"#fff", color:C.blueL, border:"none", cursor:"pointer", padding:"12px 24px", borderRadius:10, fontSize:14, fontWeight:800, fontFamily:"inherit", display:"block", marginBottom:8 }}>
                      ⚡ Upgrade Plan
                    </button>
                  )}
                  {currentPlan!=="free" && (
                    <button style={{ background:"rgba(255,255,255,.1)", color:"rgba(255,255,255,.7)", border:"1px solid rgba(255,255,255,.2)", cursor:"pointer", padding:"8px 18px", borderRadius:8, fontSize:12, fontFamily:"inherit" }}>
                      Cancel Subscription
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Usage grid */}
            <div style={{ marginBottom:24 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:16 }}>Monthly Usage</div>
                <div style={{ color:C.textDim, fontSize:12 }}>Resets Jun 1, 2026</div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                {usage.map(u => {
                  const pct = Math.round((u.used/u.limit)*100);
                  const danger = pct >= 80;
                  return (
                    <div key={u.label} className="card" style={{ padding:"18px 20px", border:danger?`1px solid ${C.red}33`:`1px solid ${C.border}`, background:danger?`${C.red}04`:"#fff" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                        <div style={{ color:C.text, fontSize:13, fontWeight:700 }}>{u.label}</div>
                        {danger && <span style={{ background:C.redL, color:C.red, fontSize:9, fontWeight:800, padding:"2px 6px", borderRadius:10 }}>LIMIT</span>}
                      </div>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                        <span className="sg" style={{ color:danger?C.red:C.text, fontSize:22, fontWeight:800 }}>{u.used}</span>
                        <span style={{ color:C.textDim, fontSize:12, alignSelf:"flex-end" }}>/ {u.limit} {u.unit}</span>
                      </div>
                      <div style={{ background:C.border, borderRadius:10, height:6, overflow:"hidden", marginBottom:6 }}>
                        <div style={{ width:`${Math.min(pct,100)}%`, height:"100%", background:danger?C.red:pct>=60?C.orange:C.blueL, borderRadius:10, transition:"width .3s" }}/>
                      </div>
                      <div style={{ color:C.textDim, fontSize:10 }}>Resets {u.reset}</div>
                    </div>
                  );
                })}
              </div>
              {usage.some(u=>(u.used/u.limit)>=0.8) && (
                <div style={{ background:`${C.orange}10`, border:`1px solid ${C.orange}33`, borderRadius:10, padding:"12px 18px", marginTop:14, display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:18 }}>⚠️</span>
                  <div style={{ flex:1 }}>
                    <div style={{ color:C.orange, fontWeight:700, fontSize:13 }}>You're approaching your plan limits</div>
                    <div style={{ color:C.textMid, fontSize:12 }}>Upgrade to Pro to get 2,000 AI credits, 5K keywords, and 20 projects.</div>
                  </div>
                  <button onClick={()=>setTab("plans")} style={{ background:C.orange, color:"#fff", border:"none", cursor:"pointer", padding:"8px 16px", borderRadius:8, fontSize:12, fontWeight:700, fontFamily:"inherit", flexShrink:0 }}>Upgrade Now</button>
                </div>
              )}
            </div>

            {/* Payment method */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
              <div className="card" style={{ padding:"20px 24px" }}>
                <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:14, marginBottom:16 }}>Payment Method</div>
                {!showCardForm ? (
                  <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                    <div style={{ width:52, height:36, background:"linear-gradient(135deg,#1A1F71,#2563EB)", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ color:"#fff", fontSize:11, fontWeight:800 }}>VISA</span>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ color:C.text, fontWeight:700, fontSize:14 }}>{cardNo}</div>
                      <div style={{ color:C.textDim, fontSize:12 }}>Expires 09/2027</div>
                    </div>
                    <button onClick={()=>setShowCardForm(true)} style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.blueL, cursor:"pointer", padding:"6px 12px", borderRadius:7, fontSize:12, fontFamily:"inherit" }}>Update</button>
                  </div>
                ) : (
                  <div>
                    <input placeholder="Card number" style={{ width:"100%", background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 13px", color:C.text, fontSize:13, fontFamily:"inherit", outline:"none", marginBottom:10 }}/>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                      <input placeholder="MM / YY" style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 13px", color:C.text, fontSize:13, fontFamily:"inherit", outline:"none" }}/>
                      <input placeholder="CVC" style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 13px", color:C.text, fontSize:13, fontFamily:"inherit", outline:"none" }}/>
                    </div>
                    <div style={{ display:"flex", gap:8 }}>
                      <button onClick={()=>{setShowCardForm(false);setCardNo("•••• •••• •••• 5678");}} style={{ flex:1, background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"9px", borderRadius:8, fontSize:13, fontWeight:700, fontFamily:"inherit" }}>Save Card</button>
                      <button onClick={()=>setShowCardForm(false)} style={{ flex:1, background:"transparent", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"9px", borderRadius:8, fontSize:13, fontFamily:"inherit" }}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
              <div className="card" style={{ padding:"20px 24px" }}>
                <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:14, marginBottom:16 }}>Billing Cycle</div>
                <div style={{ display:"flex", background:C.bg, borderRadius:9, padding:4, gap:2, marginBottom:14 }}>
                  {[["monthly","Monthly"],["yearly","Yearly (-25%)"]].map(([id,label])=>(
                    <button key={id} onClick={()=>setBillingCycle(id)} style={{ flex:1, padding:"9px 0", border:"none", borderRadius:7, cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"inherit", background:billingCycle===id?"#fff":"transparent", color:billingCycle===id?C.text:C.textDim, boxShadow:billingCycle===id?"0 1px 4px rgba(0,0,0,.08)":"none" }}>{label}</button>
                  ))}
                </div>
                {billingCycle==="yearly" && <div style={{ background:C.greenL, borderRadius:8, padding:"10px 14px", color:C.green, fontSize:12, fontWeight:700 }}>🎉 Save ${(cp.mo-cp.yr)*12}/year with annual billing</div>}
                {billingCycle==="monthly" && <div style={{ color:C.textDim, fontSize:12 }}>Switch to annual billing to save 25% every year.</div>}
              </div>
            </div>

            {/* Recent invoices preview */}
            <div className="card" style={{ overflow:"hidden" }}>
              <div style={{ padding:"14px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center" }}>
                <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:14, flex:1 }}>Recent Invoices</span>
                <button onClick={()=>setTab("invoices")} style={{ background:"transparent", border:"none", color:C.blueL, cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>View All →</button>
              </div>
              {invoices.slice(0,4).map((inv,i)=>(
                <div key={i} className="td" style={{ display:"flex", alignItems:"center", gap:16, padding:"12px 20px", borderBottom:`1px solid ${C.border}` }}>
                  <div style={{ width:36, height:36, borderRadius:9, background:C.bluePale, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontSize:16 }}>🧾</span>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ color:C.text, fontWeight:700, fontSize:13 }}>{inv.inv}</div>
                    <div style={{ color:C.textDim, fontSize:11 }}>{inv.period} · {inv.plan} Plan</div>
                  </div>
                  <div style={{ color:C.text, fontWeight:700, fontSize:14 }}>{inv.amount>0?`$${inv.amount}`:"—"}</div>
                  <span className="chip" style={{ color:inv.status==="Paid"?C.green:C.textDim, background:inv.status==="Paid"?C.greenL:C.bg }}>{inv.status}</span>
                  <span style={{ color:C.textDim, fontSize:12 }}>{inv.date}</span>
                  <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.blueL, cursor:"pointer", padding:"5px 10px", borderRadius:6, fontSize:11, fontFamily:"inherit" }}>↓ PDF</button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── PLANS TAB ── */}
        {tab==="plans" && (
          <>
            <div style={{ textAlign:"center", marginBottom:28 }}>
              <h2 className="sg" style={{ color:C.text, fontSize:26, fontWeight:900, marginBottom:8 }}>Choose the right plan for your needs</h2>
              <p style={{ color:C.textMid, fontSize:14 }}>All plans include a 14-day free trial. No credit card required.</p>
              <div style={{ display:"flex", justifyContent:"center", marginTop:16 }}>
                <div style={{ display:"flex", background:C.bg, borderRadius:8, padding:4, gap:2 }}>
                  {[["monthly","Monthly"],["yearly","Yearly — Save 25%"]].map(([id,label])=>(
                    <button key={id} onClick={()=>setBillingCycle(id)} style={{ padding:"8px 22px", border:"none", borderRadius:6, cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"inherit", background:billingCycle===id?"#fff":"transparent", color:billingCycle===id?C.text:C.textDim }}>
                      {label}{id==="yearly"&&<span style={{ marginLeft:6, background:C.greenL, color:C.green, fontSize:10, fontWeight:800, padding:"2px 7px", borderRadius:10 }}>-25%</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
              {plans.map(p => {
                const price = billingCycle==="monthly"?p.mo:p.yr;
                const isCurrent = p.id===currentPlan;
                return (
                  <div key={p.id} style={{ background:"#fff", border:`${p.popular?"2":"1"}px solid ${p.popular?C.orange:isCurrent?C.green:C.border}`, borderRadius:16, padding:"24px 22px", position:"relative", boxShadow:p.popular?"0 8px 28px rgba(249,115,22,.15)":"0 1px 4px rgba(0,0,0,.05)", transform:p.popular?"translateY(-6px)":"none" }}>
                    {p.popular && <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", background:`linear-gradient(135deg,${C.orange},#EA580C)`, color:"#fff", fontSize:10, fontWeight:800, padding:"4px 16px", borderRadius:20 }}>MOST POPULAR</div>}
                    {isCurrent && <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", background:C.green, color:"#fff", fontSize:10, fontWeight:800, padding:"4px 16px", borderRadius:20 }}>YOUR PLAN</div>}
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                      <span style={{ background:`${p.color}18`, color:p.color, fontWeight:700, fontSize:12, padding:"3px 10px", borderRadius:20 }}>{p.name}</span>
                    </div>
                    <div style={{ marginBottom:16 }}>
                      {p.mo===0 ? (
                        <span className="sg" style={{ fontSize:32, fontWeight:900, color:C.text }}>Free</span>
                      ) : (
                        <>
                          <span className="sg" style={{ fontSize:34, fontWeight:900, color:p.popular?C.orange:C.text }}>${price}</span>
                          <span style={{ color:C.textDim, fontSize:13 }}>/month</span>
                          {billingCycle==="yearly"&&p.mo>0&&<div style={{ color:C.green, fontSize:11, fontWeight:600 }}>Save ${(p.mo-p.yr)*12}/year</div>}
                        </>
                      )}
                    </div>
                    <button
                      onClick={()=>{ if(!isCurrent&&onUpgrade) onUpgrade(p.id); }}
                      style={{ width:"100%", padding:"10px", fontSize:13, borderRadius:9, border:"none", marginBottom:18, cursor:isCurrent?"default":"pointer", background:isCurrent?C.greenL:p.popular?`linear-gradient(135deg,${C.orange},#EA580C)`:C.blueL, color:isCurrent?C.green:"#fff", fontFamily:"inherit", fontWeight:700 }}>
                      {isCurrent?"✓ Current Plan":p.mo===0?"Get Started Free":`Upgrade to ${p.name}`}
                    </button>
                    <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:14 }}>
                      {p.features.map(f=>(
                        <div key={f} style={{ display:"flex", alignItems:"center", gap:7, marginBottom:8 }}>
                          <div style={{ width:16, height:16, borderRadius:"50%", background:`${p.color}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                            <CheckCircle2 size={9} color={p.color}/>
                          </div>
                          <span style={{ color:C.textMid, fontSize:12 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop:32, background:C.bg, borderRadius:14, padding:"24px 28px", display:"flex", alignItems:"center", gap:20 }}>
              <div style={{ fontSize:40 }}>🏢</div>
              <div style={{ flex:1 }}>
                <div className="sg" style={{ color:C.text, fontWeight:800, fontSize:16, marginBottom:4 }}>Enterprise Plan</div>
                <p style={{ color:C.textMid, fontSize:13 }}>Custom pricing for large teams. SSO, SAML, dedicated support, custom AI, SLAs, audit logs, and unlimited everything.</p>
              </div>
              <button style={{ background:C.text, color:"#fff", border:"none", cursor:"pointer", padding:"12px 24px", borderRadius:10, fontSize:13, fontWeight:700, fontFamily:"inherit", flexShrink:0 }}>Contact Sales →</button>
            </div>
          </>
        )}

        {/* ── INVOICES TAB ── */}
        {tab==="invoices" && (
          <>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:24 }}>
              {[
                { l:"Total Paid (2026)", v:"$316",   c:C.green  },
                { l:"Current Plan",      v:"Pro $79", c:C.blueL  },
                { l:"Next Invoice",      v:"Jun 1",   c:C.orange },
              ].map(s=>(
                <div key={s.l} className="card" style={{ padding:"16px 20px" }}>
                  <div style={{ color:C.textDim, fontSize:12, marginBottom:6 }}>{s.l}</div>
                  <div className="sg" style={{ color:s.c, fontSize:22, fontWeight:800 }}>{s.v}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{ overflow:"hidden" }}>
              <div style={{ padding:"14px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:10 }}>
                <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:14, flex:1 }}>All Invoices</span>
                <button style={{ background:C.bg, border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", padding:"6px 12px", borderRadius:7, fontSize:12, fontFamily:"inherit" }}>Export All ↓</button>
              </div>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead><tr style={{ background:C.bg }}>
                  {["Invoice #","Date","Period","Plan","Amount","Status",""].map(h=>(
                    <th key={h} style={{ padding:"10px 18px", textAlign:"left", color:C.textDim, fontSize:11, fontWeight:700, borderBottom:`1px solid ${C.border}` }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {invoices.map((inv,i)=>(
                    <tr key={i} className="td">
                      <td style={{ padding:"13px 18px", color:C.blueL, fontWeight:600, fontSize:13, borderBottom:`1px solid ${C.border}` }}>{inv.inv}</td>
                      <td style={{ padding:"13px 18px", color:C.textMid, fontSize:12, borderBottom:`1px solid ${C.border}` }}>{inv.date}</td>
                      <td style={{ padding:"13px 18px", color:C.textMid, fontSize:12, borderBottom:`1px solid ${C.border}` }}>{inv.period}</td>
                      <td style={{ padding:"13px 18px", borderBottom:`1px solid ${C.border}` }}><span className="chip" style={{ color:C.blueL, background:C.bluePale }}>{inv.plan}</span></td>
                      <td style={{ padding:"13px 18px", borderBottom:`1px solid ${C.border}` }}><span className="sg" style={{ color:inv.amount>0?C.text:C.textDim, fontWeight:700, fontSize:14 }}>{inv.amount>0?`$${inv.amount}`:"—"}</span></td>
                      <td style={{ padding:"13px 18px", borderBottom:`1px solid ${C.border}` }}><span className="chip" style={{ color:inv.status==="Paid"?C.green:C.textDim, background:inv.status==="Paid"?C.greenL:C.bg }}>{inv.status}</span></td>
                      <td style={{ padding:"13px 18px", borderBottom:`1px solid ${C.border}` }}>
                        <button style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.blueL, cursor:"pointer", padding:"5px 12px", borderRadius:6, fontSize:11, fontFamily:"inherit" }}>↓ PDF</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── AI CREDITS TAB ── */}
        {tab==="credits" && (
          <>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24 }}>
              <div style={{ background:`linear-gradient(135deg,${C.blue},${C.blueL})`, borderRadius:14, padding:"24px 28px", color:"#fff" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:"rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Zap size={20} color="#fff" fill="#fff"/>
                  </div>
                  <div>
                    <div className="sg" style={{ fontWeight:800, fontSize:16 }}>AI Credits</div>
                    <div style={{ color:"rgba(255,255,255,.7)", fontSize:11 }}>Resets Jun 1, 2026</div>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:12 }}>
                  <span className="sg" style={{ fontSize:48, fontWeight:900 }}>8</span>
                  <span style={{ color:"rgba(255,255,255,.7)", fontSize:16 }}>/ 10 used</span>
                </div>
                <div style={{ background:"rgba(255,255,255,.2)", borderRadius:10, height:8, marginBottom:8 }}>
                  <div style={{ width:"80%", height:"100%", background:"#fff", borderRadius:10 }}/>
                </div>
                <div style={{ color:"rgba(255,255,255,.75)", fontSize:12 }}>2 credits remaining — upgrade for more</div>
              </div>
              <div className="card" style={{ padding:"24px 28px" }}>
                <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:15, marginBottom:6 }}>Buy More Credits</div>
                <p style={{ color:C.textMid, fontSize:13, marginBottom:16 }}>Top up your credits at any time. No expiry.</p>
                {[[50,"$9.99"],[200,"$29.99"],[500,"$59.99"],[1000,"$99.99"]].map(([credits,price])=>(
                  <div key={credits} className="hl" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 14px", borderRadius:9, border:`1px solid ${C.border}`, marginBottom:8, cursor:"pointer" }}>
                    <div>
                      <span className="sg" style={{ color:C.text, fontWeight:700, fontSize:15 }}>{credits} credits</span>
                      <span style={{ color:C.textDim, fontSize:12, marginLeft:8 }}>({(credits/parseInt(price.replace("$",""))).toFixed(1)} per $1)</span>
                    </div>
                    <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"7px 16px", borderRadius:7, fontSize:13, fontWeight:700, fontFamily:"inherit" }}>{price}</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding:"20px 24px" }}>
              <div className="sg" style={{ color:C.text, fontWeight:700, fontSize:14, marginBottom:14 }}>Credits by Feature</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                {[
                  { feature:"AI Site Report",      cost:3,  icon:"📊", used:2 },
                  { feature:"Keyword Suggestions", cost:1,  icon:"🔑", used:3 },
                  { feature:"Content Generation",  cost:5,  icon:"✍️", used:1 },
                  { feature:"Competitor Analysis", cost:2,  icon:"⚔️", used:1 },
                  { feature:"AI Meeting Summary",  cost:2,  icon:"🎙", used:0 },
                  { feature:"Backlink Check",       cost:1,  icon:"🔗", used:1 },
                ].map(({feature,cost,icon,used})=>(
                  <div key={feature} className="card" style={{ padding:"14px 16px", background:C.bg }}>
                    <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6 }}>
                      <span style={{ fontSize:18 }}>{icon}</span>
                      <span style={{ color:C.text, fontWeight:600, fontSize:12 }}>{feature}</span>
                    </div>
                    <div style={{ color:C.textDim, fontSize:11 }}>{cost} credit{cost>1?"s":""} each · Used {used} today</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

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
  settings:            { C: SettingsView,            title: "Settings",                sub: "Account & integrations" },
  admin:               { C: AdminDashboard,          title: "Admin Dashboard",         sub: "Platform overview, users & revenue analytics" },
  usermanagement:      { C: UserManagement,          title: "User Management",         sub: "View, upgrade, and manage all platform users" },
  paymentlogs:         { C: PaymentLogs,             title: "Payment Logs",            sub: "Transaction history, filters & subscription status" },
  nlpanalytics:        { C: NLPAnalytics,            title: "NLP Analytics",           sub: "Keywords, AI articles & most active users" },
  pushnotifications:   { C: PushNotifications,       title: "Push Notifications",      sub: "Broadcast messages to all or targeted users" },
  automations:         { C: AutomationWorkflows,    title: "Automation Workflows",    sub: "Set once, run forever — replace manual work with sequences" },
  files:               { C: FileManager,             title: "File Manager",            sub: "Reports, contracts, proposals, credentials — all in one place" },
  notifications:       { C: NotificationsScreen,     title: "Notifications",           sub: "All alerts, mentions, updates and action items" },
  activitylog:         { C: ActivityLog,              title: "Activity Log",            sub: "Complete audit trail of all platform actions" },
  billing:             { C: BillingPage,            title: "Billing & Subscription",  sub: "Plans, invoices, AI credits & payment methods" },
  gopremium:           { C: BillingPage,            title: "Go Premium",              sub: "Upgrade your plan to unlock full power" },
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
      subs:[{id:"domain-overview",l:"Domain Overview"},{id:"keyword-gap",l:"Keyword Gap"},{id:"backlink-gap",l:"Backlink Gap"},{id:"competitoranalyzer",l:"Competitor Analyzer"}]
    },
    { id:"competitoranalyzer",  icon:Target,          label:"Competitor Analyzer" },
    { id:"keyword",             icon:Search,          label:"Keyword Research", subs:[{id:"keyword",l:"Keyword Overview"},{id:"advancedkeywords",l:"Keyword Ideas"}] },
    { id:"advancedkeywords",    icon:TrendingUp,      label:"Advanced Keywords", badge:"PRO" },
    { id:"keywordsperformance", icon:BarChart2,       label:"Keywords Performance" },
    { id:"backlink",            icon:Link2,           label:"Backlink Research" },
    { id:"rank",                icon:TrendingUp,      label:"Rank Tracking" },
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
    { id:"messages",       icon:MessageSquare, label:"Messages", badge:17 },
    { id:"tasks",          icon:CheckSquare,   label:"Project Tasks" },
    { id:"clients",        icon:Briefcase,     label:"Clients" },
    { id:"team",           icon:Users,         label:"Team Members" },
    { id:"calendar",       icon:Calendar,      label:"Campaign Planner" },
    { id:"dashboard",      icon:BarChart2,     label:"Analytics Overview" },
    { id:"notifications",  icon:Bell,          label:"Notifications", badge:4 },
    { id:"activitylog",    icon:Activity,      label:"Activity Log" },
  ];
  const adminNav = [
    { id:"admin",             icon:Shield,      label:"Admin Dashboard" },
    { id:"usermanagement",    icon:Users,       label:"User Management" },
    { id:"paymentlogs",       icon:BarChart,    label:"Payment Logs" },
    { id:"nlpanalytics",      icon:Activity,    label:"NLP Analytics" },
    { id:"pushnotifications", icon:Bell,        label:"Push Notifications" },
    { id:"automations",       icon:Workflow,    label:"Automations", badge:"NEW" },
    { id:"files",             icon:Paperclip,   label:"File Manager" },
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
          <div className={`nav${active==="billing"?" on":""}`} onClick={() => {setActive("billing");setSub(null);}}>
            <BarChart size={14}/> Billing & Plans
          </div>
          <div className="nav" style={{color:C.textDim}}><HelpCircle size={14}/> Help & Docs</div>
        </div>
      </div>

      <div style={{borderTop:`1px solid ${C.border}`,padding:"10px 10px 14px"}}>
        {/* Usage meters */}
        <div style={{padding:"10px 8px",borderTop:`1px solid ${C.border}`,marginBottom:4}}>
          <UsageMeter label="AI Credits" used={USAGE.credits.used} limit={USAGE.credits.limit} color={USAGE.credits.used/USAGE.credits.limit>=0.8?C.red:C.blueL}/>
          <UsageMeter label="Keywords" used={USAGE.keywords.used} limit={USAGE.keywords.limit}/>
          <UsageMeter label="Projects" used={USAGE.projects.used} limit={USAGE.projects.limit}/>
        </div>
        {/* Upgrade banner */}
        <div style={{background:`linear-gradient(135deg,${C.orange},#EA580C)`,borderRadius:10,padding:"12px 14px",marginBottom:10,cursor:"pointer"}} onClick={() => setActive("pricing")}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
            <Zap size={13} color="#fff" fill="#fff"/>
            <span style={{color:"#fff",fontSize:12,fontWeight:700}}>Upgrade to Pro</span>
          </div>
          <div style={{color:"rgba(255,255,255,.8)",fontSize:10.5,lineHeight:1.5}}>Unlock unlimited crawls, keywords & AI features</div>
          <button style={{marginTop:8,width:"100%",background:"rgba(255,255,255,.2)",border:"1px solid rgba(255,255,255,.3)",color:"#fff",cursor:"pointer",padding:"5px 0",borderRadius:7,fontSize:11,fontWeight:700,fontFamily:"inherit"}}>View Plans →</button>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 8px",background:C.bg,borderRadius:9,cursor:"pointer"}} onClick={() => setActive("settings")}>
          <div style={{width:28,height:28,borderRadius:"50%",background:`linear-gradient(135deg,${C.blueL},${C.blue})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:11,fontWeight:700,flexShrink:0}}>Y</div>
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
  const [view, setView] = useState("onboarding"); // onboarding|login|signup|premiumSuccess|app|pricing
  const [aiOpen, setAiOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [plan, setPlan] = useState("free");
  const [upgradeModal, setUpgradeModal] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [quickStart, setQuickStart] = useState(true);
  const [userMenu, setUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const addToast = (msg, type="info") => {
    const id = Date.now();
    setToasts(t => [...t, {id, msg, type}]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
  };
  const removeToast = (id) => setToasts(t => t.filter(x => x.id !== id));

  // ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(prev => !prev); }
      if (e.key === 'Escape') { setCmdOpen(false); setUserMenu(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Sub-routing: when competitive is active and a sub is selected, use that sub as the screen key
  const screenKey = (active === "competitive" && sub) ? sub : active;
  const screen = SCREENS[screenKey] || SCREENS.crawl;
  const Screen = screen.C;

  // ── Auth / onboarding flow ──
  if (view === "onboarding") return <><style>{CSS}</style><OnboardingScreen onDone={() => setView("login")}/></>;
  if (view === "login")      return <><style>{CSS}</style><LoginScreen onLogin={() => setView("app")} onSignup={() => setView("signup")}/></>;
  if (view === "signup")     return <><style>{CSS}</style><SignupScreen onSignup={() => setView("app")} onLogin={() => setView("login")}/></>;
  if (view === "premiumSuccess") return <><style>{CSS}</style><PremiumSuccessScreen onContinue={() => { setView("app"); setPlan("pro"); }}/></>;

  if (view === "pricing") {
    return (
      <>
        <style>{CSS}</style>
        <PricingPage goBack={() => setView("app")} currentPlan={plan} onSelectPlan={(p) => { setPlan(p); if(p!=="free") setView("premiumSuccess"); else setView("app"); }} />
      </>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div style={{display:"flex",height:"100vh",background:darkMode?"#0F172A":C.bg,fontFamily:"'Manrope',sans-serif",overflow:"hidden",position:"relative",color:darkMode?C.white:C.text,colorScheme:darkMode?"dark":"light"}}>
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
              <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                <span style={{color:C.textDim,fontSize:10.5,cursor:"pointer"}} onClick={()=>setActive("crawl")}>Home</span>
                <ChevronRight size={9} color={C.textDim}/>
                <span style={{color:C.text,fontSize:10.5,fontWeight:600}}>{screen.title}</span>
              </div>
              <h1 className="sg" style={{color:C.text,fontSize:15,fontWeight:700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",lineHeight:1.2}}>{screen.title}</h1>
            </div>
            <button onClick={()=>setCmdOpen(true)} style={{display:"flex",alignItems:"center",gap:6,background:C.bg,border:`1px solid ${C.border}`,borderRadius:9,padding:"6px 12px",width:200,flexShrink:0,cursor:"pointer",fontFamily:"inherit"}}>
              <Search size={12} color={C.textDim}/>
              <span style={{color:C.textDim,fontSize:12,flex:1,textAlign:"left"}}>Search...</span>
              <kbd style={{background:C.border,borderRadius:3,padding:"1px 5px",fontSize:9,color:C.textDim}}>⌘K</kbd>
            </button>
            <button onClick={()=>setActive("projectsdashboard")} style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"8px 16px",borderRadius:9,fontSize:13,fontWeight:700,fontFamily:"inherit",display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
              <Plus size={14}/> New Project
            </button>
            <PlanBadge plan={plan} onClick={() => setView("pricing")}/>
            <div style={{display:"flex",alignItems:"center",gap:5,background:USAGE.credits.used/USAGE.credits.limit>=0.8?C.redL:C.bg,border:`1px solid ${USAGE.credits.used/USAGE.credits.limit>=0.8?C.red:C.border}`,borderRadius:7,padding:"5px 10px",cursor:"pointer",flexShrink:0}} onClick={()=>setUpgradeModal("credits")}>
              <span style={{fontSize:13}}>⚡</span>
              <span style={{color:USAGE.credits.used/USAGE.credits.limit>=0.8?C.red:C.textMid,fontSize:11,fontWeight:700}}>{USAGE.credits.used}/{USAGE.credits.limit} credits</span>
            </div>
            <button onClick={() => setView("pricing")} style={{background:C.orange,color:"#fff",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:5,padding:"7px 13px",borderRadius:8,fontSize:12,fontWeight:700,fontFamily:"inherit",flexShrink:0}}>
              ⚡ Upgrade
            </button>
            <button onClick={() => setAiOpen(!aiOpen)} style={{background:aiOpen?`linear-gradient(135deg,${C.blue},${C.blueL})`:"transparent",color:aiOpen?"#fff":C.blueL,border:`1px solid ${aiOpen?C.blueL:C.border}`,cursor:"pointer",display:"flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:8,fontSize:12,fontWeight:700,fontFamily:"inherit",flexShrink:0}}>
              <Bot size={13}/> AI Copilot
            </button>
            <div style={{position:"relative",cursor:"pointer"}} onClick={() => { setActive("notifications"); setSub(null); }}>
              <Bell size={17} color={C.textDim}/>
              <div style={{width:16,height:16,borderRadius:"50%",background:C.orange,position:"absolute",top:-6,right:-6,border:"2px solid #fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{color:"#fff",fontSize:8,fontWeight:800}}>4</span>
              </div>
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
            {/* Dark mode toggle */}
            <button onClick={()=>setDarkMode(d=>!d)} style={{background:darkMode?"#1E293B":"#F1F5F9",border:`1px solid ${darkMode?"#334155":C.border}`,color:darkMode?"#F1F5F9":C.textDim,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}} title="Toggle dark mode">
              {darkMode?<span style={{fontSize:16}}>☀️</span>:<span style={{fontSize:16}}>🌙</span>}
            </button>
            {/* ⌘K shortcut button */}
            <button onClick={()=>setCmdOpen(true)} style={{background:C.bg,border:`1px solid ${C.border}`,color:C.textDim,cursor:"pointer",padding:"5px 10px",borderRadius:7,fontSize:11,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
              <Search size={11}/> Search<kbd style={{background:C.border,borderRadius:3,padding:"1px 5px",fontSize:9,marginLeft:2}}>⌘K</kbd>
            </button>
            {/* User menu */}
            <div style={{position:"relative"}}>
              <div onClick={()=>setUserMenu(!userMenu)} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",padding:"4px 8px",borderRadius:9,background:userMenu?C.bluePale:"transparent"}}>
                <Av l="Y" size={30}/>
                <div style={{display:"none"}}><!-- user --></div>
                <ChevronDown size={11} color={C.textDim}/>
              </div>
              {userMenu && (
                <div style={{position:"absolute",top:44,right:0,width:200,background:C.white,border:`1px solid ${C.border}`,borderRadius:12,boxShadow:"0 8px 30px rgba(0,0,0,.12)",zIndex:100,overflow:"hidden"}} onClick={()=>setUserMenu(false)}>
                  <div style={{padding:"12px 14px",borderBottom:`1px solid ${C.border}`}}>
                    <div style={{color:C.text,fontWeight:700,fontSize:13}}>Your Account</div>
                    <div style={{color:C.textDim,fontSize:11}}>admin@boostly.app</div>
                    <PlanBadge plan={plan} onClick={()=>setView("pricing")}/>
                  </div>
                  {[
                    {icon:Users,   label:"Profile & Settings", action:()=>setActive("settings")},
                    {icon:BarChart2,label:"Billing & Plan",    action:()=>setActive("billing")},
                    {icon:Bell,    label:"Notifications (4)",  action:()=>setActive("notifications")},
                    {icon:Activity,label:"Activity Log",       action:()=>setActive("activitylog")},
                    {icon:HelpCircle,label:"Help & Docs",       action:()=>{}},
                    {icon:LogOut,  label:"Sign Out",            action:()=>setView("login"), red:true},
                  ].map(({icon:Icon,label,action,red})=>(
                    <div key={label} onClick={action} className="td" style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",cursor:"pointer",borderBottom:`1px solid ${C.border}`}}>
                      <Icon size={14} color={red?C.red:C.textMid}/>
                      <span style={{color:red?C.red:C.text,fontSize:13}}>{label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Screen onNavigate={(id) => { setActive(id); setSub(null); }} onUpgrade={(trigger) => setUpgradeModal(trigger||"credits")} plan={plan}/>
        </div>

        {/* Floating AI Copilot */}
        {aiOpen && <AICopilot onClose={() => setAiOpen(false)}/>}
        {upgradeModal && <UpgradeModal trigger={upgradeModal} onClose={()=>setUpgradeModal(null)} onUpgrade={()=>{setView("pricing");setUpgradeModal(null);}}/>}
        {/* Command Palette */}
        {cmdOpen && <CommandPalette onClose={()=>setCmdOpen(false)} onNavigate={(id)=>{setActive(id);setSub(null);}} screens={SCREENS}/>}
        {/* Quick Start Guide */}
        {quickStart && view==="app" && active==="crawl" && <QuickStartGuide onNavigate={(id)=>{setActive(id);setSub(null);addToast("Navigated to "+id,"info");}} onClose={()=>setQuickStart(false)}/>}
        {/* Toast Container */}
        <ToastContainer toasts={toasts} removeToast={removeToast}/>
      </div>
    </>
  );
}
