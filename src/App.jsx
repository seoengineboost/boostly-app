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
  ArrowUpRight, Smile
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
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

// ── Micro Components ────────────────────────────────────────────────
function Av({ l, size = 32 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${C.blueL}, ${C.blue})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontSize: size * 0.38, fontWeight: 700, flexShrink: 0,
      fontFamily: "Space Grotesk"
    }}>{l}</div>
  );
}

function ScoreRing({ score, size = 52 }) {
  const r = size * 0.4;
  const circ = 2 * Math.PI * r;
  const off = circ * (1 - score / 100);
  const col = score >= 80 ? C.green : score >= 60 ? C.yellow : C.red;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E2E8F0" strokeWidth={size * 0.1} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth={size * 0.1}
          strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round" />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center",
        justifyContent: "center", color: col, fontWeight: 800, fontSize: size * 0.28,
        fontFamily: "Space Grotesk"
      }}>{score}</div>
    </div>
  );
}

function PriBadge({ p }) {
  const map = {
    high: [C.red, C.redL, "High"],
    medium: [C.yellow, C.yellowL, "Med"],
    low: [C.green, C.greenL, "Low"]
  };
  const [col, bg, label] = map[p] || map.low;
  return <span className="chip" style={{ color: col, background: bg }}>{label}</span>;
}

function ProgBar({ v, col = C.blueL, h = 5 }) {
  return (
    <div style={{ background: "#E2E8F0", borderRadius: 10, height: h, overflow: "hidden" }}>
      <div style={{ width: `${v}%`, height: "100%", background: col, borderRadius: 10 }} />
    </div>
  );
}

// ── Sidebar ─────────────────────────────────────────────────────────
function Sidebar({ active, setActive, sub, setSub }) {
  const seoNav = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    {
      id: "competitive", icon: Globe, label: "Competitive Research",
      subs: [{ id: "domain-overview", l: "Domain Overview" }, { id: "keyword-gap", l: "Keyword Gap" }]
    },
    {
      id: "keyword", icon: Search, label: "Keyword Research",
      subs: [{ id: "kw-overview", l: "Keyword Overview" }, { id: "kw-ideas", l: "Keyword Ideas" }]
    },
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
    <div style={{
      width: 214, background: C.white, borderRight: `1px solid ${C.border}`,
      display: "flex", flexDirection: "column", height: "100vh",
      position: "sticky", top: 0, flexShrink: 0, overflowY: "auto"
    }}>
      {/* Logo */}
      <div style={{ padding: "16px 14px 12px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: `linear-gradient(135deg, ${C.orange}, ${C.blueL})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 3px 10px rgba(249,115,22,0.3)"
          }}>
            <Zap size={17} color="#fff" fill="#fff" />
          </div>
          <div>
            <div className="sg" style={{ color: C.text, fontWeight: 800, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }}>Boostly</div>
            <div style={{ color: C.textDim, fontSize: 9, letterSpacing: ".8px", fontWeight: 700 }}>SEO · MARKETING · AI</div>
          </div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 7, padding: "6px 9px",
          background: C.bgLight, borderRadius: 7, border: `1px solid ${C.bluePale}`, cursor: "pointer"
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} className="pls" />
          <span style={{ color: C.blue, fontSize: 11, fontWeight: 600, flex: 1 }}>Marketing Workspace</span>
          <ChevronDown size={10} color={C.textDim} />
        </div>
      </div>

      <div style={{ padding: "10px 8px", flex: 1 }}>
        <div style={{ color: C.textDim, fontSize: 9.5, fontWeight: 700, letterSpacing: 1.2, padding: "0 8px", marginBottom: 4 }}>SEO TOOLS</div>
        {seoNav.map(({ id, icon: Icon, label, subs }) => (
          <div key={id}>
            <div
              className={`nav${active === id && !sub ? " on" : ""}`}
              onClick={() => { setActive(id); if (!subs) setSub(null); }}
            >
              <Icon size={15} />
              <span style={{ flex: 1 }}>{label}</span>
              {subs && (
                <ChevronDown size={11} color={C.textDim}
                  style={{ transform: active === id ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
              )}
            </div>
            {subs && active === id && (
              <div style={{ marginBottom: 2 }}>
                {subs.map((s) => (
                  <div key={s.id} className={`nsub${sub === s.id ? " on" : ""}`} onClick={() => setSub(s.id)}>{s.l}</div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10, marginTop: 8 }}>
          <div style={{ color: C.textDim, fontSize: 9.5, fontWeight: 700, letterSpacing: 1.2, padding: "0 8px", marginBottom: 4 }}>WORKSPACE</div>
          {toolNav.map(({ id, icon: Icon, label, badge }) => (
            <div key={id} className={`nav${active === id ? " on" : ""}`} onClick={() => { setActive(id); setSub(null); }}>
              <Icon size={15} />
              <span style={{ flex: 1 }}>{label}</span>
              {badge && (
                <span style={{
                  background: C.orange, color: "#fff", fontSize: 9, fontWeight: 700,
                  width: 17, height: 17, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>{badge}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.border}`, padding: "10px 10px 14px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, padding: "8px 8px",
          background: C.bg, borderRadius: 9, cursor: "pointer"
        }}>
          <Av l="Y" size={28} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: C.text, fontSize: 12, fontWeight: 700 }}>Your Account</div>
            <div style={{ color: C.textDim, fontSize: 10 }}>Admin · Pro Plan</div>
          </div>
          <ChevronDown size={11} color={C.textDim} />
        </div>
      </div>
    </div>
  );
}

// ── Topbar ──────────────────────────────────────────────────────────
function Topbar({ title, sub }) {
  return (
    <div style={{
      padding: "12px 24px", borderBottom: `1px solid ${C.border}`,
      display: "flex", alignItems: "center", gap: 12, background: C.white,
      position: "sticky", top: 0, zIndex: 20, flexShrink: 0
    }}>
      <div style={{ flex: 1 }}>
        <h1 className="sg" style={{ color: C.text, fontSize: 16, fontWeight: 700 }}>{title}</h1>
        {sub && <p style={{ color: C.textDim, fontSize: 11, marginTop: 1 }}>{sub}</p>}
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 8, background: C.bg,
        border: `1px solid ${C.border}`, borderRadius: 9, padding: "7px 12px", width: 200
      }}>
        <Search size={13} color={C.textDim} />
        <input placeholder="Search..." style={{
          background: "transparent", border: "none", outline: "none",
          color: C.textMid, fontSize: 12.5, width: "100%", fontFamily: "inherit"
        }} />
      </div>
      <button style={{
        background: C.blueL, color: "#fff", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
        borderRadius: 9, fontSize: 13, fontWeight: 700, fontFamily: "inherit"
      }}>
        <Plus size={14} /> New Project
      </button>
      <div style={{ position: "relative", cursor: "pointer" }}>
        <Bell size={18} color={C.textDim} />
        <div style={{
          width: 7, height: 7, borderRadius: "50%", background: C.orange,
          position: "absolute", top: -1, right: -1, border: "1.5px solid #fff"
        }} />
      </div>
      <Av l="Y" size={32} />
    </div>
  );
}

// ── Dashboard ────────────────────────────────────────────────────────
function Dashboard() {
  const stats = [
    { l: "Domain Rating", v: "42", chg: "+3", up: true, icon: Shield, c: C.blueL },
    { l: "Backlinks", v: "1,847", chg: "+124", up: true, icon: Link2, c: C.orange },
    { l: "Keywords Ranked", v: "3,241", chg: "+89", up: true, icon: Target, c: C.green },
    { l: "Organic Traffic", v: "92.4K", chg: "+18%", up: true, icon: TrendingUp, c: C.purple },
    { l: "Avg. Position", v: "14.2", chg: "-2.1", up: true, icon: BarChart2, c: C.blueL },
    { l: "Site Health", v: "78/100", chg: "+5", up: true, icon: Activity, c: C.green },
  ];
  const acts = [
    { u: "Mahmoud", a: "completed keyword audit for", t: "Dental Pro", ago: "2m", icon: CheckCircle2, c: C.green },
    { u: "Aisha", a: "created 4 tasks in", t: "TechFlow Campaign", ago: "14m", icon: Plus, c: C.blueL },
    { u: "AI Copilot", a: "fixed 3 broken links on", t: "seoengineboost.com", ago: "1h", icon: Bot, c: C.purple },
    { u: "Sam", a: "published blog post for", t: "Dental Client", ago: "2h", icon: FileText, c: C.orange },
    { u: "Jordan", a: "started working on", t: "Homepage Redesign", ago: "3h", icon: PlayCircle, c: C.yellow },
  ];

  return (
    <div className="fade" style={{ padding: "22px 24px", overflowY: "auto", height: "calc(100vh - 57px)" }}>
      {/* Hero Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${C.blue} 0%, ${C.blueL} 100%)`,
        borderRadius: 16, padding: "22px 28px", marginBottom: 22,
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: -30, right: 60, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <Sparkles size={13} color="#FED7AA" />
            <span style={{ color: "#FED7AA", fontSize: 11, fontWeight: 700, letterSpacing: .5 }}>GOOD MORNING — May 5, 2026</span>
          </div>
          <h2 className="sg" style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 7 }}>
            Your SEO performance is <span style={{ color: "#FED7AA" }}>improving</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,.75)", fontSize: 13 }}>
            7 tasks due today · 3 client reports pending · Organic traffic up 18% this month
          </p>
          <div style={{ display: "flex", gap: 9, marginTop: 16 }}>
            <button style={{
              background: C.orange, color: "#fff", border: "none", cursor: "pointer",
              padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700,
              display: "flex", alignItems: "center", gap: 7, fontFamily: "inherit"
            }}>
              <Target size={14} /> Run SEO Audit
            </button>
            <button style={{
              background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.25)",
              color: "#fff", padding: "9px 18px", borderRadius: 8, fontSize: 13,
              fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center",
              gap: 7, fontFamily: "inherit"
            }}>
              <Bot size={14} /> Ask AI Copilot
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12, marginBottom: 20 }}>
        {stats.map(({ l, v, chg, up, icon: Icon, c }) => (
          <div key={l} className="card ch" style={{ padding: "16px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${c}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={14} color={c} />
              </div>
              <span className="chip" style={{ color: up ? C.green : C.red, background: up ? C.greenL : C.redL, fontSize: 9.5 }}>
                {up ? "↑" : "↓"} {chg}
              </span>
            </div>
            <div className="sg" style={{ color: C.text, fontSize: 20, fontWeight: 800 }}>{v}</div>
            <div style={{ color: C.textDim, fontSize: 10.5, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 260px", gap: 14, marginBottom: 20 }}>
        <div className="card" style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div className="sg" style={{ color: C.text, fontSize: 14, fontWeight: 700 }}>Traffic Overview</div>
              <div style={{ color: C.textDim, fontSize: 11, marginTop: 2 }}>Organic · Paid · Last 7 months</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={trafficData} margin={{ top: 0, right: 0, left: -22, bottom: 0 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.blueL} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={C.blueL} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.orange} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={C.orange} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="m" tick={{ fill: C.textDim, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.textDim, fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11 }} />
              <Area type="monotone" dataKey="organic" stroke={C.blueL} fill="url(#g1)" strokeWidth={2} />
              <Area type="monotone" dataKey="paid" stroke={C.orange} fill="url(#g2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: "18px 20px" }}>
          <div className="sg" style={{ color: C.text, fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Ranking Trend</div>
          <div style={{ color: C.textDim, fontSize: 11, marginBottom: 14 }}>Avg. position (lower = better)</div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={rankData} margin={{ top: 0, right: 0, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="n" tick={{ fill: C.textDim, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis reversed tick={{ fill: C.textDim, fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11 }} />
              <Line type="monotone" dataKey="pos" stroke={C.green} strokeWidth={2.5} dot={{ fill: C.green, r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: "18px 20px" }}>
          <div className="sg" style={{ color: C.text, fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Keywords</div>
          <div style={{ color: C.textDim, fontSize: 11, marginBottom: 10 }}>200 tracked</div>
          <ResponsiveContainer width="100%" height={110}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={36} outerRadius={52} paddingAngle={3} dataKey="v">
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
          {pieData.map((d, i) => (
            <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, background: PIE_COLORS[i] }} />
              <span style={{ color: C.textMid, fontSize: 11, flex: 1 }}>{d.name}</span>
              <span style={{ color: C.text, fontWeight: 700, fontSize: 12 }}>{d.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity + Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 14 }}>
        <div className="card" style={{ padding: "18px 20px" }}>
          <div className="sg" style={{ color: C.text, fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Team Activity</div>
          {acts.map(({ u, a, t, ago, icon: Icon, c }, i) => (
            <div key={i} style={{
              display: "flex", gap: 10, paddingBottom: 12, marginBottom: 12,
              borderBottom: i < acts.length - 1 ? `1px solid ${C.border}` : "none", alignItems: "flex-start"
            }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: `${c}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={13} color={c} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: C.textMid, fontSize: 12.5 }}>
                  <span style={{ color: C.text, fontWeight: 700 }}>{u}</span> {a} <span style={{ color: C.blueL }}>{t}</span>
                </p>
                <span style={{ color: C.textDim, fontSize: 10.5 }}>{ago} ago</span>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: "18px 18px" }}>
          <div className="sg" style={{ color: C.text, fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Quick Actions</div>
          {[
            { l: "Run Site Audit", icon: FileSearch, c: C.blueL, d: "Check site health" },
            { l: "Keyword Research", icon: Search, c: C.orange, d: "Find new keywords" },
            { l: "Generate Report", icon: BarChart2, c: C.green, d: "Branded PDF report" },
            { l: "Content Writer", icon: Edit2, c: C.purple, d: "AI blog generator" },
            { l: "Competitor Analysis", icon: Globe, c: C.yellow, d: "Track competitors" },
            { l: "AI Copilot", icon: Sparkles, c: C.blueL, d: "Ask anything" },
          ].map(({ l, icon: Icon, c, d }) => (
            <div key={l} className="hl" style={{
              display: "flex", alignItems: "center", gap: 9, padding: "8px 8px",
              borderRadius: 8, marginBottom: 4
            }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: `${c}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={13} color={c} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.text, fontSize: 12, fontWeight: 600 }}>{l}</div>
                <div style={{ color: C.textDim, fontSize: 10.5 }}>{d}</div>
              </div>
              <ChevronRight size={12} color={C.textDim} />
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

  // Mini sparkline SVG
  const Spark = ({ data, col }) => {
    const max = Math.max(...data), min = Math.min(...data);
    const pts = data.map((v, i) => {
      const x = (i / (data.length - 1)) * 58;
      const y = 16 - ((v - min) / (max - min + 1)) * 14;
      return `${x},${y}`;
    }).join(" ");
    return (
      <svg width={60} height={18} viewBox="0 0 60 18">
        <polyline points={pts} fill="none" stroke={col} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  const kwResults = [
    {kw:"seo",vol:"135,000",cpc:"$4.50",comp:"High",compCPC:74.50,last:"Aug 15, 2025",trend:[60,55,70,65,80,75,90]},
    {kw:"search engine optimisation seo",vol:"135,000",cpc:"$4.50",comp:"High",compCPC:74.50,last:"Aug 15, 2025",trend:[40,50,45,60,55,70,65]},
    {kw:"seo",vol:"135,000",cpc:"$4.50",comp:"High",compCPC:74.50,last:"Aug 15, 2025",trend:[30,40,50,45,60,55,70]},
    {kw:"seo search engine optimization",vol:"135,000",cpc:"$4.50",comp:"High",compCPC:74.50,last:"Aug 15, 2025",trend:[70,65,80,75,85,80,90]},
    {kw:"what is seo",vol:"135,000",cpc:"$4.50",comp:"High",compCPC:74.50,last:"Aug 15, 2025",trend:[50,60,55,65,60,70,65]},
    {kw:"seo key words",vol:"74,000",cpc:"$3.20",comp:"Medium",compCPC:44.20,last:"Aug 15, 2025",trend:[30,35,40,38,45,42,48]},
    {kw:"seo services",vol:"74,000",cpc:"$3.20",comp:"Medium",compCPC:44.20,last:"Aug 15, 2025",trend:[55,50,60,58,65,62,68]},
    {kw:"seo services seo",vol:"74,000",cpc:"$3.20",comp:"Medium",compCPC:44.20,last:"Aug 15, 2025",trend:[40,42,38,45,43,48,46]},
    {kw:"off page seo",vol:"14,000",cpc:"$1.80",comp:"Medium",compCPC:21.80,last:"Aug 15, 2025",trend:[20,18,22,20,25,23,28]},
    {kw:"seo services marketing seo",vol:"14,000",cpc:"$1.20",comp:"Medium",compCPC:18.50,last:"Aug 15, 2025",trend:[15,18,16,20,18,22,20]},
    {kw:"dental seo services",vol:"9,900",cpc:"$6.80",comp:"Medium",compCPC:55.20,last:"Aug 15, 2025",trend:[25,28,30,27,32,30,35]},
    {kw:"local seo services",vol:"9,900",cpc:"$5.40",comp:"Medium",compCPC:48.10,last:"Aug 15, 2025",trend:[35,38,40,37,42,40,45]},
    {kw:"free seo tools",vol:"8,100",cpc:"$2.10",comp:"Low",compCPC:15.30,last:"Aug 15, 2025",trend:[60,65,62,70,68,72,75]},
    {kw:"seo analytics",vol:"6,600",cpc:"$3.90",comp:"Low",compCPC:28.40,last:"Aug 15, 2025",trend:[20,22,25,23,28,26,30]},
  ];

  const CompBadge = ({ comp }) => {
    const map = { High:[C.red,C.redL], Medium:[C.yellow,C.yellowL], Low:[C.green,C.greenL] };
    const [c,bg] = map[comp] || map.Low;
    return <span className="chip" style={{color:c,background:bg,fontSize:10.5}}>{comp}</span>;
  };

  const ExportBar = () => (
    <div style={{display:"flex",gap:4}}>
      {["Copy","CSV","Excel","PDF","Print"].map(btn => (
        <button key={btn} style={{padding:"4px 10px",border:`1px solid ${C.border}`,borderRadius:5,background:C.bg,cursor:"pointer",fontSize:11,fontWeight:600,color:C.textMid,fontFamily:"inherit"}}>{btn}</button>
      ))}
    </div>
  );

  const totalPages = Math.ceil(kwResults.length / perPage);
  const pageData = kwResults.slice((page-1)*perPage, page*perPage);

  return (
    <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)",background:C.bg}}>
      {/* Header */}
      <div style={{padding:"22px 28px 0",background:C.white,borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16}}>
          <div>
            <h2 className="sg" style={{color:C.text,fontSize:20,fontWeight:800,marginBottom:4}}>Keyword Research</h2>
            <p style={{color:C.textDim,fontSize:13}}>See detailed keyword or domain data for any page by entering the keywords in the field below.</p>
          </div>
          <span style={{background:"#D1FAE5",color:"#065F46",fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:6,flexShrink:0}}>40 Searches Remaining</span>
        </div>
        {/* Tabs */}
        <div style={{display:"flex",gap:0}}>
          {[["keywords","Search By Keywords"],["domain","Search By Domain"]].map(([id,label]) => (
            <button key={id} onClick={()=>setTab(id)} style={{padding:"10px 20px",border:"none",borderBottom:tab===id?`2.5px solid ${C.blueL}`:"2.5px solid transparent",cursor:"pointer",fontSize:13,fontWeight:tab===id?700:500,fontFamily:"inherit",background:"transparent",color:tab===id?C.blueL:C.textMid,marginBottom:-1}}>{label}</button>
          ))}
        </div>
      </div>

      {/* Search form */}
      <div style={{padding:"20px 28px",background:C.white,borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",gap:10,alignItems:"flex-end"}}>
          <div style={{flex:1}}>
            <label style={{display:"block",color:C.textMid,fontSize:12,fontWeight:600,marginBottom:6}}>
              {tab==="keywords"?"Enter any specific keywords separated by a comma":"Enter your domain name"}
            </label>
            {tab==="keywords"
              ? <textarea value={query} onChange={e=>setQuery(e.target.value)} rows={2}
                  style={{width:"100%",padding:"9px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,color:C.text,fontFamily:"inherit",outline:"none",resize:"none",lineHeight:1.5}}
                  placeholder="e.g. seo, search engine optimization, best seo tools"/>
              : <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <input value={domain} onChange={e=>setDomain(e.target.value)}
                    style={{flex:1,padding:"9px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,color:C.text,fontFamily:"inherit",outline:"none"}}/>
                  <button style={{background:"transparent",border:"none",cursor:"pointer",padding:"8px 10px",display:"flex",alignItems:"center"}}>
                    <Edit2 size={14} color={C.blueL}/>
                  </button>
                </div>
            }
          </div>
          <div style={{display:"flex",gap:8}}>
            <div>
              <label style={{display:"block",color:C.textMid,fontSize:12,fontWeight:600,marginBottom:6}}>Country</label>
              <select value={country} onChange={e=>setCountry(e.target.value)}
                style={{padding:"9px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:12,fontFamily:"inherit",outline:"none",background:"white",color:C.text}}>
                <option>🇺🇸 United States (US)</option>
                <option>🇵🇭 Philippines</option>
                <option>🇬🇧 United Kingdom (UK)</option>
                <option>🇦🇺 Australia</option>
                <option>🇨🇦 Canada</option>
                <option>🇳🇬 Nigeria</option>
              </select>
            </div>
            <div>
              <label style={{display:"block",color:C.textMid,fontSize:12,fontWeight:600,marginBottom:6}}>Language</label>
              <select value={lang} onChange={e=>setLang(e.target.value)}
                style={{padding:"9px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:12,fontFamily:"inherit",outline:"none",background:"white",color:C.text}}>
                <option>English</option><option>Spanish</option><option>French</option><option>Arabic</option><option>Filipino</option>
              </select>
            </div>
            <div style={{display:"flex",alignItems:"flex-end"}}>
              <button onClick={()=>setSearched(true)} style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"9px 24px",borderRadius:8,fontSize:13,fontWeight:700,fontFamily:"inherit"}}>Research</button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {searched && (
        <div style={{padding:"20px 28px"}}>
          <div style={{marginBottom:10,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div className="sg" style={{color:C.text,fontSize:14,fontWeight:700}}>
              Results <span style={{color:C.textDim,fontWeight:400,fontSize:12}}>— {kwResults.length} keywords found for "{query}"</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{color:C.textDim,fontSize:12}}>Show</span>
              <select style={{padding:"4px 8px",border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,fontFamily:"inherit",outline:"none",background:"white"}}>
                <option>10</option><option>25</option><option>50</option>
              </select>
              <span style={{color:C.textDim,fontSize:12}}>entries</span>
            </div>
          </div>

          <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
            {/* Table header */}
            <div style={{display:"grid",gridTemplateColumns:"2.5fr 130px 100px 110px 130px 80px 60px",padding:"10px 16px",background:C.bg,borderBottom:`1px solid ${C.border}`,gap:8}}>
              {["KEYWORD","MONTHLY SEARCHES","CPC","COMPETITION","LAST UPDATED","TREND","ADD"].map(h=>(
                <div key={h} style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:.4}}>{h}</div>
              ))}
            </div>

            {pageData.map((row,i) => (
              <div key={i} className="td" style={{display:"grid",gridTemplateColumns:"2.5fr 130px 100px 110px 130px 80px 60px",padding:"10px 16px",borderBottom:i<pageData.length-1?`1px solid ${C.border}`:"none",alignItems:"center",gap:8}}>
                <div style={{color:C.text,fontSize:13,fontWeight:500}}>{row.kw}</div>
                <div style={{color:C.text,fontSize:12.5,fontWeight:600}}>{row.vol}</div>
                <div style={{color:C.textMid,fontSize:12.5}}>{row.cpc}</div>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <CompBadge comp={row.comp}/>
                </div>
                <div style={{color:C.textDim,fontSize:12}}>{row.last}</div>
                <Spark data={row.trend} col={row.comp==="High"?C.orange:row.comp==="Medium"?C.blueL:C.green}/>
                <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"5px 10px",borderRadius:6,fontSize:11,fontWeight:700,fontFamily:"inherit"}}>Add</button>
              </div>
            ))}

            {/* Footer */}
            <div style={{padding:"12px 16px",background:C.bg,borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                <ExportBar/>
                <span style={{color:C.textDim,fontSize:12}}>Showing {(page-1)*perPage+1} to {Math.min(page*perPage,kwResults.length)} of {kwResults.length} entries</span>
              </div>
              <div style={{display:"flex",gap:4}}>
                <button onClick={()=>setPage(p=>Math.max(1,p-1))} style={{padding:"5px 12px",border:`1px solid ${C.border}`,borderRadius:5,background:"transparent",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>Previous</button>
                {[...Array(totalPages)].map((_,i)=>(
                  <button key={i} onClick={()=>setPage(i+1)} style={{padding:"5px 10px",border:"none",borderRadius:5,background:page===i+1?C.blueL:"transparent",color:page===i+1?"#fff":C.textMid,cursor:"pointer",fontSize:12,fontWeight:page===i+1?700:400,fontFamily:"inherit"}}>{i+1}</button>
                ))}
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
    <div className="fade" style={{ overflowY: "auto", height: "calc(100vh - 57px)" }}>
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${C.border}`, background: C.white, display: "flex", gap: 10 }}>
        <div style={{ flex: 1, display: "flex", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 9, overflow: "hidden" }}>
          <input defaultValue="seoengineboost.com" style={{ flex: 1, padding: "9px 14px", background: "transparent", border: "none", outline: "none", color: C.text, fontSize: 13, fontFamily: "inherit" }} />
        </div>
        <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "10px 22px", borderRadius: 9, fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>Run Audit</button>
      </div>

      <div style={{ padding: "20px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 20 }}>
          {[{ l: "All Audits", s: 78 }, { l: "Successful", s: 85 }, { l: "Errors", s: 62 }, { l: "Warnings", s: 71 }, { l: "Basic Info", s: 90 }].map(({ l, s }) => (
            <div key={l} className="card ch" style={{ padding: "16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <ScoreRing score={s} />
              <div style={{ color: C.textMid, fontSize: 12, fontWeight: 600 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{
          background: `linear-gradient(135deg, ${C.orange}, #EA6C0A)`,
          borderRadius: 14, padding: "18px 22px", marginBottom: 16,
          display: "flex", alignItems: "center", gap: 20
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: "rgba(255,255,255,.7)", fontSize: 11, fontWeight: 700, letterSpacing: .5, marginBottom: 4 }}>AUDIT REPORT</div>
            <div className="sg" style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>seoengineboost.com</div>
            <div style={{ color: "rgba(255,255,255,.75)", fontSize: 12.5, marginTop: 4 }}>Issues with internal backlinks, meta tags, HTTP status codes</div>
          </div>
          <ScoreRing score={78} size={72} />
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ background: "rgba(255,255,255,.2)", border: "1px solid rgba(255,255,255,.3)", color: "#fff", padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", gap: 6, alignItems: "center", fontFamily: "inherit" }}>
              <Send size={12} /> Email
            </button>
            <button style={{ background: "rgba(255,255,255,.2)", border: "1px solid rgba(255,255,255,.3)", color: "#fff", padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", gap: 6, alignItems: "center", fontFamily: "inherit" }}>
              <Download size={12} /> Download
            </button>
          </div>
        </div>

        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "12px 18px", borderBottom: `1px solid ${C.border}` }}>
            <span className="sg" style={{ color: C.text, fontSize: 14, fontWeight: 700 }}>Audit Results</span>
          </div>
          {auditItems.map(({ label, status, desc, fix }, i) => {
            const ic = { error: [C.red, C.redL, "✕"], warning: [C.yellow, C.yellowL, "⚠"], ok: [C.green, C.greenL, "✓"] };
            const [col, bg, sym] = ic[status];
            return (
              <div key={label} className="td" style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 18px", borderBottom: i < auditItems.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: bg, display: "flex", alignItems: "center", justifyContent: "center", color: col, fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{sym}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{label}</div>
                  <div style={{ color: C.textDim, fontSize: 11.5, marginTop: 2 }}>{desc}</div>
                </div>
                <span className="chip" style={{ color: col, background: bg }}>{status.toUpperCase()}</span>
                {fix && (
                  <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "5px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}>
                    <Zap size={10} /> AI Fix
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Backlink Research — Full 7-tab version (matches SEOptimizer) ──────
function BacklinkResearch() {
  const [tab, setTab] = useState("overview");
  const [url, setUrl] = useState("https://seoengineboost.com/");
  const [toggle, setToggle] = useState("backlinks");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("First Seen");

  const TABS = ["Overview","Backlinks","Referring Domains","Top Pages","Anchors","TLDs","Countries"];

  // ─ Data (matching the actual SEOptimizer data from screenshots) ─
  const blData = [
    {ds:33,ps:0,ref:"https://buzzakoo.com/search/hashtag/It_service/posts",target:"https://www.seoengineboost.com/seo-audit-services/",anchor:"SEO Audit Services",follow:"Follow",first:"2025-08-09",last:"2025-08-09"},
    {ds:33,ps:0,ref:"https://buzzakoo.com/search/hashtag/It_service/posts",target:"https://www.seoengineboost.com/seo-audit-services/",anchor:"https://www.seoengineboost.com/seo-audit-services/",follow:"Follow",first:"2025-08-09",last:"2025-08-09"},
    {ds:42,ps:0,ref:"https://ajax-directory.com/listings84521/international-seo-agency",target:"https://www.seoengineboost.com/",anchor:"https://www.seoengineboost.com/",follow:"Nofollow",first:"2025-08-08",last:"2025-08-08"},
    {ds:33,ps:0,ref:"https://buzzakoo.com/search/hashtag/It_service",target:"https://www.seoengineboost.com/seo-audit-services/",anchor:"SEO Audit Services",follow:"Follow",first:"2025-08-07",last:"2025-08-07"},
    {ds:33,ps:0,ref:"https://buzzakoo.com/KhanSeo",target:"https://www.seoengineboost.com/seo-audit-services/",anchor:"SEO Audit Services",follow:"Follow",first:"2025-08-07",last:"2025-08-07"},
    {ds:17,ps:0,ref:"https://ubuntusafa.com/listing/seo-engine-boost",target:"https://www.seoengineboost.com/",anchor:"seoengineboost.com",follow:"Nofollow",first:"2025-08-07",last:"2025-08-07"},
    {ds:13,ps:0,ref:"https://reviewsandcomplaints.us/seo-engine",target:"https://www.seoengineboost.com/about-us/",anchor:"About Us",follow:"Follow",first:"2025-08-07",last:"2025-08-07"},
    {ds:70,ps:0,ref:"https://ekcechat.com/seo-tools",target:"https://www.seoengineboost.com/",anchor:"https://www.seoengineboost.com/",follow:"Nofollow",first:"2025-07-31",last:"2025-07-31"},
    {ds:63,ps:0,ref:"https://your-directory.com/seo-engine-boost",target:"https://www.seoengineboost.com/",anchor:"SEO Engine Boost",follow:"Follow",first:"2025-07-31",last:"2025-07-31"},
    {ds:33,ps:0,ref:"https://buzzakoo.com/KhanSeo/posts",target:"https://www.seoengineboost.com/",anchor:"seo agency leeds",follow:"Follow",first:"2025-07-30",last:"2025-07-30"},
  ];

  const rdData = [
    {ds:42,domain:"ajax-directory.com",count:1,dofollow:1,first:"2025-08-08"},
    {ds:17,domain:"ubuntusafa.com",count:2,dofollow:0,first:"2025-08-07"},
    {ds:13,domain:"reviewsandcomplaints.us",count:5,dofollow:5,first:"2025-08-07"},
    {ds:33,domain:"buzzakoo.com",count:10,dofollow:0,first:"2025-08-05"},
    {ds:70,domain:"ekcechat.com",count:2,dofollow:0,first:"2025-07-31"},
    {ds:63,domain:"your-directory.com",count:1,dofollow:1,first:"2025-07-31"},
    {ds:44,domain:"bizzdirectory.com",count:3,dofollow:2,first:"2025-07-28"},
    {ds:38,domain:"seo-listings.net",count:2,dofollow:1,first:"2025-07-25"},
  ];

  const tpData = [
    {page:"https://seoengineboost.com/",backlinks:13,dofollow:0,nofollow:13,first:"2025-02-07",last:"2025-07-27"},
    {page:"https://seoengineboost.com/seo-audit-services/",backlinks:8,dofollow:6,nofollow:2,first:"2025-06-01",last:"2025-08-09"},
    {page:"https://seoengineboost.com/about-us/",backlinks:5,dofollow:5,nofollow:0,first:"2025-07-07",last:"2025-08-07"},
    {page:"https://seoengineboost.com/international-seo-consultant/",backlinks:4,dofollow:4,nofollow:0,first:"2025-07-10",last:"2025-08-06"},
  ];

  const anchorsData = [
    {anchor:"https://www.seoengineboost.com/",backlinks:29,domains:12},
    {anchor:"www.seoengineboost.com Top-Rated SEO Agency | Global SEO for Rankings & ROI...",backlinks:24,domains:8},
    {anchor:"https://www.seoengineboost.com/about-us/",backlinks:15,domains:7},
    {anchor:"About Us",backlinks:15,domains:6},
    {anchor:"seoengineboost.com",backlinks:13,domains:5},
    {anchor:"SEO Audit Services",backlinks:6,domains:3},
    {anchor:"https://www.seoengineboost.com/seo-audit-services/",backlinks:6,domains:3},
    {anchor:"https://www.seoengineboost.com/international-seo-consultant/",backlinks:6,domains:2},
    {anchor:"Home",backlinks:4,domains:2},
    {anchor:"seo agency leeds",backlinks:2,domains:1},
  ];

  const tldsData = [
    {tld:".com",count:10,color:"#F59E0B"},
    {tld:".in",count:2,color:"#10B981"},
    {tld:".biz",count:1,color:"#EF4444"},
    {tld:".co",count:1,color:"#06B6D4"},
    {tld:"Other",count:3,color:"#94A3B8"},
  ];

  const totalTLD = tldsData.reduce((s,d) => s+d.count, 0);

  // Simple donut chart SVG
  const DonutChart = () => {
    let cumulative = 0;
    const r = 60, cx = 80, cy = 80, stroke = 28;
    const circ = 2 * Math.PI * r;
    return (
      <svg width={160} height={160} viewBox="0 0 160 160">
        {tldsData.map(({ count, color }) => {
          const pct = count / totalTLD;
          const offset = circ * (1 - pct);
          const rotation = (cumulative / totalTLD) * 360 - 90;
          cumulative += count;
          return (
            <circle key={color} cx={cx} cy={cy} r={r} fill="none" stroke={color}
              strokeWidth={stroke} strokeDasharray={`${circ * pct} ${circ * (1-pct)}`}
              strokeDashoffset={0} style={{ transform: `rotate(${rotation}deg)`, transformOrigin: `${cx}px ${cy}px` }} />
          );
        })}
        <circle cx={cx} cy={cy} r={r - stroke/2 - 2} fill="white" />
        <text x={cx} y={cy-4} textAnchor="middle" style={{fontSize:18,fontWeight:800,fill:"#1E293B",fontFamily:"Space Grotesk"}}>17</text>
        <text x={cx} y={cy+12} textAnchor="middle" style={{fontSize:9,fill:"#94A3B8",fontFamily:"inherit"}}>Total</text>
      </svg>
    );
  };

  // Simple world map SVG (countries view)
  const WorldMap = () => (
    <div style={{ position: "relative", background: "#F8FAFC", borderRadius: 12, padding: "20px", overflow: "hidden" }}>
      <svg viewBox="0 0 900 450" style={{ width: "100%", height: 280 }}>
        {/* Background */}
        <rect width="900" height="450" fill="#F1F5F9" rx="8"/>
        {/* Simplified world continents */}
        {/* North America */}
        <path d="M120,80 L200,75 L250,90 L260,130 L240,160 L210,180 L180,200 L160,190 L140,170 L120,140 L110,110 Z" fill={C.blueL} opacity="0.85"/>
        {/* USA highlight - more prominent */}
        <path d="M130,130 L220,125 L240,145 L230,170 L190,180 L150,175 L130,160 Z" fill={C.blueL}/>
        {/* Greenland */}
        <path d="M220,40 L260,35 L270,60 L250,75 L220,65 Z" fill="#CBD5E1"/>
        {/* South America */}
        <path d="M200,210 L240,205 L260,230 L255,280 L235,310 L210,300 L195,270 L190,240 Z" fill="#CBD5E1"/>
        {/* Europe */}
        <path d="M400,70 L460,65 L480,85 L470,110 L440,120 L410,115 L395,95 Z" fill={C.blueL} opacity="0.6"/>
        {/* UK highlight */}
        <path d="M390,75 L405,72 L408,88 L395,92 Z" fill={C.blueL}/>
        {/* Africa */}
        <path d="M410,130 L460,125 L475,160 L470,220 L445,250 L415,245 L400,210 L400,165 Z" fill="#CBD5E1"/>
        {/* Asia */}
        <path d="M480,60 L640,55 L660,90 L650,130 L610,150 L560,155 L510,145 L480,120 L470,90 Z" fill="#CBD5E1"/>
        {/* India */}
        <path d="M560,130 L590,128 L595,160 L575,175 L555,165 L548,145 Z" fill={C.blueL} opacity="0.5"/>
        {/* SE Asia */}
        <path d="M620,130 L650,125 L660,145 L645,155 L620,150 Z" fill="#CBD5E1"/>
        {/* Australia */}
        <path d="M640,260 L700,255 L720,280 L710,310 L680,320 L650,310 L635,290 Z" fill="#CBD5E1"/>
        {/* Japan */}
        <path d="M680,95 L695,90 L700,105 L688,112 L678,108 Z" fill={C.blueL} opacity="0.4"/>
        {/* Dots for other countries */}
        <circle cx="448" cy="90" r="4" fill={C.blueL} opacity="0.7"/>
        <circle cx="510" cy="100" r="3" fill={C.blueL} opacity="0.5"/>
        <circle cx="555" cy="85" r="3" fill={C.blueL} opacity="0.4"/>
      </svg>
      {/* Zoom controls */}
      <div style={{ position: "absolute", bottom: 20, right: 20, display: "flex", flexDirection: "column", gap: 2 }}>
        <button style={{ width: 28, height: 28, background: C.blueL, color: "#fff", border: "none", borderRadius: "6px 6px 0 0", cursor: "pointer", fontSize: 16, fontWeight: 700 }}>+</button>
        <button style={{ width: 28, height: 28, background: C.blueL, color: "#fff", border: "none", borderRadius: "0 0 6px 6px", cursor: "pointer", fontSize: 16, fontWeight: 700 }}>−</button>
      </div>
      {/* Legend */}
      <div style={{ position: "absolute", bottom: 20, left: 20, display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.9)", padding: "4px 10px", borderRadius: 6, border: `1px solid ${C.border}` }}>
        <div style={{ width: 12, height: 12, background: C.blueL, borderRadius: 2 }} />
        <span style={{ fontSize: 11, color: C.textMid }}>Has backlinks</span>
        <div style={{ width: 12, height: 12, background: "#CBD5E1", borderRadius: 2, marginLeft: 8 }} />
        <span style={{ fontSize: 11, color: C.textMid }}>No backlinks</span>
      </div>
    </div>
  );

  const filteredBL = blData.filter(r =>
    search === "" ||
    r.ref.toLowerCase().includes(search.toLowerCase()) ||
    r.anchor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade" style={{ overflowY: "auto", height: "calc(100vh - 57px)", background: C.bg }}>
      {/* Header + URL bar */}
      <div style={{ padding: "22px 28px 0", background: C.white, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <h2 className="sg" style={{ color: C.text, fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Backlink Research</h2>
            <p style={{ color: C.textDim, fontSize: 13 }}>See detailed backlink data for any page by entering the URL below.</p>
          </div>
          <span style={{ background: "#D1FAE5", color: "#065F46", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6, flexShrink: 0 }}>24 Searches Remaining</span>
        </div>
        {/* URL input */}
        <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
          <input value={url} onChange={e => setUrl(e.target.value)}
            style={{ flex: 1, padding: "9px 14px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, color: C.text, fontFamily: "inherit", outline: "none", background: C.white }}
            placeholder="https://example.com" />
          <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "9px 24px", borderRadius: 8, fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>Research</button>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 0 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t.toLowerCase().replace(" ",""))}
              style={{ padding: "10px 16px", border: "none", borderBottom: tab===t.toLowerCase().replace(" ","") ? `2.5px solid ${C.blueL}` : "2.5px solid transparent", cursor: "pointer", fontSize: 13, fontWeight: tab===t.toLowerCase().replace(" ","") ? 700 : 500, fontFamily: "inherit", background: "transparent", color: tab===t.toLowerCase().replace(" ","") ? C.blueL : C.textMid, marginBottom: -1, transition: "all .15s" }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ padding: "24px 28px" }}>

        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <div>
            {/* Strength circles */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px", marginBottom: 16, display: "flex", gap: 40, alignItems: "center" }}>
              {[{label:"Domain Strength",value:2},{label:"Page Strength",value:1}].map(({label,value}) => {
                const r=36, circ=2*Math.PI*r;
                return (
                  <div key={label} style={{textAlign:"center"}}>
                    <div style={{position:"relative",width:90,height:90,margin:"0 auto 8px"}}>
                      <svg width={90} height={90} viewBox="0 0 90 90">
                        <circle cx={45} cy={45} r={r} fill="none" stroke="#E2E8F0" strokeWidth={10}/>
                        <circle cx={45} cy={45} r={r} fill="none" stroke={C.red} strokeWidth={10}
                          strokeDasharray={circ} strokeDashoffset={circ*(1-value/100)}
                          strokeLinecap="round" style={{transform:"rotate(-90deg)",transformOrigin:"45px 45px"}}/>
                      </svg>
                      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <span style={{fontSize:22,fontWeight:800,color:C.text,fontFamily:"Space Grotesk"}}>{value}</span>
                      </div>
                    </div>
                    <div style={{color:C.textMid,fontSize:12,fontWeight:600}}>{label}</div>
                  </div>
                );
              })}
              <div style={{width:1,height:60,background:C.border}}/>
              <div style={{display:"flex",gap:20}}>
                {[
                  {icon:"🔗",v:"136",l:"Backlinks"},
                  {icon:"🌐",v:"17",l:"Referring Domains"},
                  {icon:"📍",v:"19",l:"IPs"},
                  {icon:"🖧",v:"19",l:"Subnets"},
                ].map(({icon,v,l}) => (
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

        {/* ── BACKLINKS ── */}
        {tab === "backlinks" && (
          <div>
            {/* Mini stats */}
            <div style={{display:"flex",gap:12,marginBottom:16}}>
              {[{icon:"🔗",v:"136",l:"Total Backlinks"},{icon:"🔒",v:"119",l:"Nofollow"},{icon:"✅",v:"17",l:"Dofollow"},{icon:"🎓",v:"0",l:"Edu"},{icon:"🏛",v:"0",l:"Gov"},{icon:"T",v:"99",l:"Text",bold:true}].map(({icon,v,l,bold}) => (
                <div key={l} style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 16px",flex:1,textAlign:"center"}}>
                  <div style={{fontSize:bold?16:18,fontWeight:bold?800:400,marginBottom:4,fontFamily:bold?"Space Grotesk":"inherit"}}>{icon}</div>
                  <div className="sg" style={{color:C.text,fontSize:18,fontWeight:800,lineHeight:1}}>{v}</div>
                  <div style={{color:C.textDim,fontSize:10.5,marginTop:2}}>{l}</div>
                </div>
              ))}
            </div>

            {/* Search + Sort */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{color:C.textDim,fontSize:12}}>Search:</span>
                <input value={search} onChange={e=>setSearch(e.target.value)}
                  style={{padding:"5px 10px",border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,width:200,fontFamily:"inherit",outline:"none"}}/>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{color:C.textDim,fontSize:12}}>Sort:</span>
                <select value={sort} onChange={e=>setSort(e.target.value)}
                  style={{padding:"5px 10px",border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,fontFamily:"inherit",outline:"none",background:"white"}}>
                  {["First Seen","Last Crawled","Domain Strength"].map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Table */}
            <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"50px 50px 2fr 2fr 1.5fr 90px 100px 100px",padding:"9px 14px",background:C.bg,borderBottom:`1px solid ${C.border}`,gap:8}}>
                {["DS","PS","REFERRING PAGE","TARGET PAGE","ANCHOR TEXT","FOLLOW","FIRST SEEN","LAST CRAWLED"].map(h=>(
                  <div key={h} style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:.4}}>{h}</div>
                ))}
              </div>
              {filteredBL.map((row,i) => (
                <div key={i} className="td" style={{display:"grid",gridTemplateColumns:"50px 50px 2fr 2fr 1.5fr 90px 100px 100px",padding:"10px 14px",borderBottom:i<filteredBL.length-1?`1px solid ${C.border}`:"none",alignItems:"center",gap:8}}>
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
              <div style={{padding:"10px 14px",background:C.bg,borderTop:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{color:C.textDim,fontSize:12}}>Showing 1 to {filteredBL.length} of {blData.length} entries</span>
                <div style={{display:"flex",gap:4}}>
                  <button style={{padding:"4px 10px",border:`1px solid ${C.border}`,borderRadius:5,background:"transparent",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>Previous</button>
                  <button style={{padding:"4px 10px",border:"none",borderRadius:5,background:C.blueL,color:"#fff",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit"}}>1</button>
                  <button style={{padding:"4px 10px",border:`1px solid ${C.border}`,borderRadius:5,background:"transparent",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>Next</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── REFERRING DOMAINS ── */}
        {tab === "referringdomains" && (
          <div>
            {/* Mini stats */}
            <div style={{display:"flex",gap:12,marginBottom:16}}>
              {[{v:"17",l:"Referring Domains"},{v:"0",l:"From Homepage"},{v:"4",l:"Dofollow Refdomains"},{v:"0",l:"Edu Refdomains"},{v:"0",l:"Gov Refdomains"}].map(({v,l}) => (
                <div key={l} style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 16px",flex:1}}>
                  <div className="sg" style={{color:C.text,fontSize:22,fontWeight:800,lineHeight:1}}>{v}</div>
                  <div style={{color:C.textDim,fontSize:11,marginTop:4}}>{l}</div>
                </div>
              ))}
            </div>

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{color:C.textDim,fontSize:12}}>Search:</span>
                <input style={{padding:"5px 10px",border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,width:200,fontFamily:"inherit",outline:"none"}}/>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{color:C.textDim,fontSize:12}}>Sort:</span>
                <select style={{padding:"5px 10px",border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,fontFamily:"inherit",outline:"none",background:"white"}}>
                  {["First Seen","Domain Strength","Backlink Count"].map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"80px 2fr 120px 120px 120px",padding:"9px 14px",background:C.bg,borderBottom:`1px solid ${C.border}`,gap:8}}>
                {["DOMAIN STR.","REFERRING DOMAIN","BACKLINK COUNT","DOFOLLOW COUNT","FIRST SEEN"].map(h=>(
                  <div key={h} style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:.4}}>{h}</div>
                ))}
              </div>
              {rdData.map((row,i) => (
                <div key={i} className="td" style={{display:"grid",gridTemplateColumns:"80px 2fr 120px 120px 120px",padding:"11px 14px",borderBottom:i<rdData.length-1?`1px solid ${C.border}`:"none",alignItems:"center",gap:8}}>
                  <div style={{background:row.ds>=60?"#FEF3C7":row.ds>=30?"#DBEAFE":"#FEE2E2",color:row.ds>=60?C.yellow:row.ds>=30?C.blueL:C.red,fontWeight:800,fontSize:11,padding:"2px 8px",borderRadius:5,textAlign:"center",width:"fit-content"}}>{row.ds}</div>
                  <div style={{color:C.blueL,fontSize:12.5,fontWeight:500,cursor:"pointer"}}>{row.domain}</div>
                  <div style={{color:C.textMid,fontSize:12.5}}>{row.count}</div>
                  <div style={{color:C.textMid,fontSize:12.5}}>{row.dofollow}</div>
                  <div style={{color:C.textDim,fontSize:12}}>{row.first}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TOP PAGES ── */}
        {tab === "toppages" && (
          <div>
            {/* Toggle */}
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
              <span style={{color:C.textMid,fontSize:13,fontWeight:toggle==="backlinks"?700:400,cursor:"pointer"}} onClick={()=>setToggle("backlinks")}>Backlinks</span>
              <div onClick={()=>setToggle(toggle==="backlinks"?"domains":"backlinks")}
                style={{width:40,height:22,borderRadius:11,background:toggle==="domains"?C.blueL:"#CBD5E1",cursor:"pointer",position:"relative",transition:"background .2s"}}>
                <div style={{width:18,height:18,borderRadius:"50%",background:"white",position:"absolute",top:2,left:toggle==="domains"?20:2,transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/>
              </div>
              <span style={{color:C.textMid,fontSize:13,fontWeight:toggle==="domains"?700:400,cursor:"pointer"}} onClick={()=>setToggle("domains")}>Referring Domains</span>
            </div>

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div/>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{color:C.textDim,fontSize:12}}>Search:</span>
                <input style={{padding:"5px 10px",border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,width:200,fontFamily:"inherit",outline:"none"}}/>
              </div>
            </div>

            <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"3fr 100px 140px 140px 130px 130px",padding:"9px 14px",background:C.bg,borderBottom:`1px solid ${C.border}`,gap:8}}>
                {["PAGE","BACKLINKS","DOFOLLOW BACKLINKS","INFOLLOW BACKLINKS","FIRST SEEN","LAST CRAWLED"].map(h=>(
                  <div key={h} style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:.4}}>{h}</div>
                ))}
              </div>
              {tpData.map((row,i) => (
                <div key={i} className="td" style={{display:"grid",gridTemplateColumns:"3fr 100px 140px 140px 130px 130px",padding:"12px 14px",borderBottom:i<tpData.length-1?`1px solid ${C.border}`:"none",alignItems:"center",gap:8}}>
                  <div style={{color:C.blueL,fontSize:12,cursor:"pointer",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.page}</div>
                  <div style={{color:C.textMid,fontSize:12.5}}>{row.backlinks}</div>
                  <div style={{color:C.textMid,fontSize:12.5}}>{row.dofollow}</div>
                  <div style={{color:C.textMid,fontSize:12.5}}>{row.nofollow}</div>
                  <div style={{color:C.textDim,fontSize:12}}>{row.first}</div>
                  <div style={{color:C.textDim,fontSize:12}}>{row.last}</div>
                </div>
              ))}
              <div style={{padding:"10px 14px",background:C.bg,borderTop:`1px solid ${C.border}`}}>
                <span style={{color:C.textDim,fontSize:12}}>Showing 1 to {tpData.length} of {tpData.length} entries</span>
              </div>
            </div>
          </div>
        )}

        {/* ── ANCHORS ── */}
        {tab === "anchors" && (
          <div>
            {/* Toggle */}
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
              <span style={{color:C.textMid,fontSize:13,fontWeight:toggle==="backlinks"?700:400,cursor:"pointer"}} onClick={()=>setToggle("backlinks")}>Backlinks</span>
              <div onClick={()=>setToggle(toggle==="backlinks"?"domains":"backlinks")}
                style={{width:40,height:22,borderRadius:11,background:toggle==="domains"?C.blueL:"#CBD5E1",cursor:"pointer",position:"relative",transition:"background .2s"}}>
                <div style={{width:18,height:18,borderRadius:"50%",background:"white",position:"absolute",top:2,left:toggle==="domains"?20:2,transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/>
              </div>
              <span style={{color:C.textMid,fontSize:13,fontWeight:toggle==="domains"?700:400,cursor:"pointer"}} onClick={()=>setToggle("domains")}>Referring Domains</span>
            </div>

            <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 120px",padding:"9px 18px",background:C.bg,borderBottom:`1px solid ${C.border}`}}>
                <div style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:.4}}>ANCHOR</div>
                <div style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:.4,textAlign:"right"}}>{toggle==="backlinks"?"BACKLINKS":"DOMAINS"}</div>
              </div>
              {anchorsData.map((row,i) => (
                <div key={i} className="td" style={{display:"grid",gridTemplateColumns:"1fr 120px",padding:"11px 18px",borderBottom:i<anchorsData.length-1?`1px solid ${C.border}`:"none",alignItems:"center"}}>
                  <div style={{color:C.blueL,fontSize:12.5,cursor:"pointer"}}>{row.anchor}</div>
                  <div style={{color:C.text,fontSize:13,fontWeight:700,textAlign:"right"}}>{toggle==="backlinks"?row.backlinks:row.domains}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TLDs ── */}
        {tab === "tlds" && (
          <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:"28px 32px"}}>
            <div style={{display:"flex",alignItems:"center",gap:48}}>
              <DonutChart />
              <div style={{flex:1}}>
                {tldsData.map(({tld,count,color}) => (
                  <div key={tld} style={{display:"flex",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:color,marginRight:12,flexShrink:0}}/>
                    <span style={{color:C.text,fontSize:13,flex:1}}>{tld}</span>
                    <div style={{flex:2,margin:"0 16px"}}>
                      <ProgBar v={(count/totalTLD)*100} col={color} h={6}/>
                    </div>
                    <span style={{color:C.text,fontSize:13,fontWeight:700,minWidth:30,textAlign:"right"}}>{count}</span>
                  </div>
                ))}
                <div style={{display:"flex",alignItems:"center",padding:"8px 0",marginTop:4}}>
                  <div style={{width:10,height:10,marginRight:12}}/>
                  <span style={{color:C.textDim,fontSize:12,flex:1}}>Total</span>
                  <span style={{color:C.text,fontSize:13,fontWeight:800,minWidth:30,textAlign:"right"}}>{totalTLD}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── COUNTRIES ── */}
        {tab === "countries" && (
          <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:"20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div className="sg" style={{color:C.text,fontSize:14,fontWeight:700}}>Backlinks by Country</div>
              <div style={{display:"flex",gap:12}}>
                {[["🇺🇸","United States","42"],["🇬🇧","United Kingdom","18"],["🇮🇳","India","12"],["🇵🇭","Philippines","8"],["🇨🇦","Canada","6"]].map(([flag,country,count]) => (
                  <div key={country} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 10px",background:C.bg,borderRadius:8,border:`1px solid ${C.border}`}}>
                    <span style={{fontSize:14}}>{flag}</span>
                    <span style={{color:C.textMid,fontSize:11}}>{country}</span>
                    <span style={{color:C.blueL,fontWeight:700,fontSize:12}}>{count}</span>
                  </div>
                ))}
              </div>
            </div>
            <WorldMap/>
          </div>
        )}

      </div>
    </div>
  );
}

// ── Tasks / Kanban ────────────────────────────────────────────────────
function Tasks() {
  const [view, setView] = useState("kanban");
  return (
    <div className="fade" style={{ height: "calc(100vh - 57px)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "10px 22px", borderBottom: `1px solid ${C.border}`, background: C.white, display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 3, background: C.bg, padding: 3, borderRadius: 8, border: `1px solid ${C.border}` }}>
          {[{ k: "kanban", icon: Kanban, l: "Kanban" }, { k: "list", icon: AlignLeft, l: "List" }, { k: "calendar", icon: CalendarCheck, l: "Calendar" }].map(({ k, icon: Icon, l }) => (
            <button key={k} onClick={() => setView(k)} style={{
              display: "flex", alignItems: "center", gap: 5, padding: "5px 12px",
              borderRadius: 7, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
              background: view === k ? C.blueL : "transparent", color: view === k ? "#fff" : C.textDim,
              fontFamily: "inherit"
            }}>
              <Icon size={12} />{l}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 7 }}>
          {[{ icon: Filter, l: "Filter" }, { icon: SortAsc, l: "Sort" }, { icon: Tag, l: "Labels" }].map(({ icon: Icon, l }) => (
            <button key={l} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: "6px 11px", borderRadius: 8, fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>
              <Icon size={12} />{l}
            </button>
          ))}
          <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>
            <Plus size={13} /> Add Task
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowX: "auto", overflowY: "hidden", padding: "16px 22px", background: C.bg }}>
        <div style={{ display: "flex", gap: 12, height: "100%" }}>
          {Object.entries(kanbanData).map(([colId, { label, color, tasks }]) => (
            <div key={colId} style={{ flex: "0 0 268px", display: "flex", flexDirection: "column", height: "100%", background: C.white, borderRadius: 12, padding: "12px 10px", border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
                <span className="sg" style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>{label}</span>
                <span className="chip" style={{ color, background: `${color}18`, marginLeft: 2 }}>{tasks.length}</span>
                <Plus size={12} color={C.textDim} style={{ marginLeft: "auto", cursor: "pointer" }} />
              </div>
              <div style={{ flex: 1, overflowY: "auto" }}>
                {tasks.map(({ id, title, tags, pri, avs, due, cmts, prog }) => (
                  <div key={id} className="kc">
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                      <PriBadge p={pri} />
                      <MoreHorizontal size={12} color={C.textDim} style={{ cursor: "pointer" }} />
                    </div>
                    <p style={{ color: C.text, fontSize: 12.5, fontWeight: 500, lineHeight: 1.5, marginBottom: 8 }}>{title}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 8 }}>
                      {tags.map((t) => <span key={t} className="chip" style={{ color: C.blue, background: C.bluePale }}>{t}</span>)}
                    </div>
                    {prog !== undefined && (
                      <div style={{ marginBottom: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                          <span style={{ color: C.textDim, fontSize: 10 }}>Progress</span>
                          <span style={{ color: C.blueL, fontSize: 10, fontWeight: 700 }}>{prog}%</span>
                        </div>
                        <ProgBar v={prog} col={prog > 70 ? C.green : C.blueL} />
                      </div>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ display: "flex" }}>
                        {avs.map((a, i) => <div key={i} style={{ marginLeft: i > 0 ? -6 : 0, zIndex: avs.length - i }}><Av l={a} size={19} /></div>)}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 3, color: C.textDim, fontSize: 10, marginLeft: "auto" }}>
                        <MessageSquare size={9} />{cmts}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 3, color: C.textDim, fontSize: 10 }}>
                        <Clock size={9} />{due}
                      </div>
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

// ── Messages ──────────────────────────────────────────────────────────
function Messages() {
  const [ch, setCh] = useState("seo-team");
  const [input, setInput] = useState("");
  const [aiShow, setAiShow] = useState(true);

  return (
    <div className="fade" style={{ display: "flex", height: "calc(100vh - 57px)", overflow: "hidden" }}>
      <div style={{ width: 200, background: C.white, borderRight: `1px solid ${C.border}`, padding: "12px 8px", overflowY: "auto", flexShrink: 0 }}>
        <div style={{ marginBottom: 8 }}>
          {[{ l: "Inbox", icon: Inbox }, { l: "Drafts", icon: Edit2 }].map(({ l, icon: Icon }) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 9px", borderRadius: 7, cursor: "pointer", color: C.textDim, fontSize: 12.5 }}>
              <Icon size={13} />{l}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "0 8px", marginBottom: 5 }}>
            <span style={{ color: C.textDim, fontSize: 9.5, fontWeight: 700, letterSpacing: 1 }}>CHANNELS</span>
            <Plus size={11} color={C.textDim} style={{ cursor: "pointer" }} />
          </div>
          {channels.map(({ n, u }) => (
            <div key={n} onClick={() => setCh(n)} style={{
              display: "flex", alignItems: "center", gap: 7, padding: "6px 9px", borderRadius: 7, cursor: "pointer",
              fontSize: 12.5, background: ch === n ? C.bluePale : "transparent",
              color: ch === n ? C.blue : C.textDim, fontWeight: ch === n ? 700 : 400, marginBottom: 1
            }}>
              <Hash size={12} /><span style={{ flex: 1 }}>#{n}</span>
              {u > 0 && <span style={{ background: C.orange, color: "#fff", fontSize: 9, fontWeight: 700, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{u}</span>}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8, marginTop: 4 }}>
          <div style={{ color: C.textDim, fontSize: 9.5, fontWeight: 700, letterSpacing: 1, padding: "0 8px", marginBottom: 5 }}>DIRECT</div>
          {[{ n: "Mahmoud", s: "online" }, { n: "Aisha", s: "online" }, { n: "Sam", s: "away" }, { n: "Jordan", s: "offline" }].map(({ n, s }) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 9px", borderRadius: 7, cursor: "pointer", fontSize: 12, color: C.textMid }}>
              <div style={{ position: "relative" }}>
                <Av l={n[0]} size={18} />
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: s === "online" ? C.green : s === "away" ? C.yellow : C.textDim, position: "absolute", bottom: -1, right: -1, border: "1px solid #fff" }} />
              </div>
              {n}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "10px 18px", borderBottom: `1px solid ${C.border}`, background: C.white, display: "flex", alignItems: "center", gap: 9, flexShrink: 0 }}>
          <Hash size={15} color={C.blueL} />
          <span className="sg" style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>#{ch}</span>
          <span style={{ color: C.textDim, fontSize: 12 }}>· 8 members</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
            {[Phone, Video, Search, Pin].map((Icon, i) => (
              <button key={i} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", padding: "5px 7px", borderRadius: 7, display: "flex" }}>
                <Icon size={13} />
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "18px 20px", background: C.bg }}>
          {chatMsgs.map(({ id, user, av, text, time, mine }) => (
            <div key={id} style={{ display: "flex", flexDirection: mine ? "row-reverse" : "row", gap: 9, marginBottom: 16, alignItems: "flex-end" }}>
              {!mine && <Av l={av} size={28} />}
              <div style={{ maxWidth: "65%" }}>
                {!mine && <div style={{ color: C.textDim, fontSize: 10.5, marginBottom: 3, fontWeight: 600 }}>{user} · {time}</div>}
                <div style={{
                  padding: "9px 13px",
                  borderRadius: mine ? "13px 13px 3px 13px" : "3px 13px 13px 13px",
                  background: mine ? C.blueL : C.white,
                  color: mine ? "#fff" : C.text,
                  fontSize: 13.5, lineHeight: 1.5,
                  border: mine ? "none" : `1px solid ${C.border}`,
                  boxShadow: mine ? "none" : "0 1px 4px rgba(0,0,0,.05)"
                }}>
                  {text}
                </div>
                {mine && <div style={{ color: C.textDim, fontSize: 9.5, textAlign: "right", marginTop: 2 }}>{time} · ✓✓</div>}
              </div>
            </div>
          ))}

          <div style={{ display: "flex", gap: 9, alignItems: "flex-end", marginBottom: 12 }}>
            <Av l="A" size={28} />
            <div style={{ background: C.white, borderRadius: "3px 13px 13px 13px", padding: "11px 14px", display: "flex", gap: 4, border: `1px solid ${C.border}` }}>
              {[0, 1, 2].map((i) => <div key={i} className="tdot" style={{ animationDelay: `${i * .2}s` }} />)}
            </div>
          </div>

          {aiShow && (
            <div style={{ padding: "13px 15px", background: "#FFF7ED", border: `1px solid ${C.orangeL}`, borderRadius: 10, display: "flex", alignItems: "flex-start", gap: 11, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: C.orangeL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Zap size={14} color={C.orange} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.orange, fontSize: 12.5, fontWeight: 700, marginBottom: 3 }}>AI detected 3 action items</div>
                <div style={{ color: C.textMid, fontSize: 12, lineHeight: 1.5 }}>Write 6 dental articles, setup GA4, prepare keyword brief. Convert to tasks?</div>
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                <button style={{ background: C.orange, color: "#fff", border: "none", cursor: "pointer", padding: "5px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, fontFamily: "inherit" }}>Convert</button>
                <button onClick={() => setAiShow(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={13} color={C.textDim} /></button>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: "10px 18px 14px", borderTop: `1px solid ${C.border}`, background: C.white, flexShrink: 0 }}>
          <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, display: "flex", alignItems: "center", gap: 7, padding: "7px 11px" }}>
            {[Paperclip, Image, Link2, AtSign].map((Icon, i) => (
              <button key={i} style={{ background: "none", border: "none", cursor: "pointer" }}><Icon size={14} color={C.textDim} /></button>
            ))}
            <div style={{ width: 1, height: 16, background: C.border }} />
            <input placeholder={`Message #${ch}...`} value={input} onChange={(e) => setInput(e.target.value)}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.text, fontSize: 13, fontFamily: "inherit" }} />
            <Smile size={14} color={C.textDim} style={{ cursor: "pointer" }} />
            <Bot size={14} color={C.blueL} style={{ cursor: "pointer" }} />
            <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "6px 12px", borderRadius: 9, display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>
              <Send size={12} /> Send
            </button>
          </div>
        </div>
      </div>

      <div style={{ width: 240, background: C.white, borderLeft: `1px solid ${C.border}`, padding: 14, overflowY: "auto", flexShrink: 0 }}>
        <div style={{ background: "#EFF6FF", border: `1px solid #BFDBFE`, borderRadius: 10, padding: 12, marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 7 }}>
            <Bot size={13} color={C.blueL} />
            <span className="sg" style={{ color: C.blue, fontSize: 12, fontWeight: 700 }}>Boostly AI</span>
          </div>
          <p style={{ color: C.textMid, fontSize: 12, lineHeight: 1.6, marginBottom: 8 }}>3 conversation threads about Dental client. Want me to create task list?</p>
          <div style={{ display: "flex", gap: 5 }}>
            <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "5px 10px", borderRadius: 7, fontSize: 11, fontWeight: 700, fontFamily: "inherit" }}>Create tasks</button>
            <button style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", padding: "5px 8px", borderRadius: 7, fontSize: 11, fontFamily: "inherit" }}>Summarize</button>
          </div>
        </div>
        <div className="sg" style={{ color: C.text, fontSize: 13, fontWeight: 700, marginBottom: 9 }}>Members</div>
        {[{ n: "Mahmoud", s: "online" }, { n: "Aisha", s: "online" }, { n: "Sam", s: "away" }, { n: "Jordan", s: "offline" }, { n: "You", s: "online" }].map(({ n, s }) => (
          <div key={n} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
            <div style={{ position: "relative" }}>
              <Av l={n[0]} size={24} />
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: s === "online" ? C.green : s === "away" ? C.yellow : C.textDim, position: "absolute", bottom: -1, right: -1, border: "1.5px solid #fff" }} />
            </div>
            <div>
              <div style={{ color: C.text, fontSize: 12, fontWeight: 600 }}>{n}</div>
              <div style={{ color: C.textDim, fontSize: 10, textTransform: "capitalize" }}>{s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Clients ──────────────────────────────────────────────────────────
function Clients() {
  return (
    <div className="fade" style={{ padding: "22px 24px", overflowY: "auto", height: "calc(100vh - 57px)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { l: "Total Clients", v: "18", icon: Users, c: C.blueL },
          { l: "Active Projects", v: "34", icon: Briefcase, c: C.orange },
          { l: "Pending Approvals", v: "6", icon: AlertCircle, c: C.yellow },
          { l: "Monthly Revenue", v: "$22.1K", icon: TrendingUp, c: C.green },
        ].map(({ l, v, icon: Icon, c }) => (
          <div key={l} className="card ch" style={{ padding: "16px 18px" }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: `${c}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
              <Icon size={15} color={c} />
            </div>
            <div className="sg" style={{ color: C.text, fontSize: 22, fontWeight: 800 }}>{v}</div>
            <div style={{ color: C.textDim, fontSize: 11, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "13px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="sg" style={{ color: C.text, fontSize: 14, fontWeight: 700 }}>All Clients</span>
          <div style={{ display: "flex", gap: 7 }}>
            <button style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", display: "flex", gap: 5, padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}><Filter size={12} /> Filter</button>
            <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", display: "flex", gap: 5, padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}><Plus size={13} /> Add Client</button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1.2fr 100px", padding: "9px 20px", background: C.bg, borderBottom: `1px solid ${C.border}` }}>
          {["Client", "Status", "Tasks", "Revenue", "Health Score", "Actions"].map((h) => (
            <div key={h} style={{ color: C.textDim, fontSize: 10.5, fontWeight: 700, letterSpacing: .4 }}>{h.toUpperCase()}</div>
          ))}
        </div>
        {clientList.map(({ n, av, status, tasks, done, rev, health, last }, i) => (
          <div key={n} className="td" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1.2fr 100px", padding: "13px 20px", borderBottom: i < clientList.length - 1 ? `1px solid ${C.border}` : "none", alignItems: "center", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <Av l={av} size={34} />
              <div>
                <div style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>{n}</div>
                <div style={{ color: C.textDim, fontSize: 10.5 }}>Last active {last}</div>
              </div>
            </div>
            <div>
              <span className="chip" style={{ color: status === "active" ? C.green : status === "review" ? C.yellow : C.textDim, background: status === "active" ? C.greenL : status === "review" ? C.yellowL : "#F1F5F9" }}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
            <div style={{ color: C.textMid, fontSize: 12.5 }}><span style={{ color: C.text, fontWeight: 700 }}>{done}</span>/{tasks}</div>
            <div style={{ color: C.green, fontWeight: 700, fontSize: 13.5 }}>{rev}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <ProgBar v={health} col={health > 75 ? C.green : health > 50 ? C.yellow : C.red} h={5} />
              <span style={{ color: health > 75 ? C.green : health > 50 ? C.yellow : C.red, fontSize: 11, fontWeight: 700, minWidth: 28 }}>{health}%</span>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {[Eye, MessageSquare, ExternalLink].map((Icon, j) => (
                <button key={j} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={11} />
                </button>
              ))}
            </div>
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
  const [lang, setLang] = useState("English");
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifSMS, setNotifSMS] = useState(false);
  const [notifWeekly, setNotifWeekly] = useState(true);

  const tabs = [
    { id:"profile",       icon:Users,       l:"Profile" },
    { id:"general",       icon:Settings,    l:"General" },
    { id:"security",      icon:Shield,      l:"Security" },
    { id:"notifications", icon:Bell,        l:"Notifications" },
    { id:"integrations",  icon:Cpu,         l:"Integrations" },
    { id:"billing",       icon:BarChart,    l:"Billing & Plan" },
    { id:"workspace",     icon:Briefcase,   l:"Workspace" },
  ];

  // Toggle component
  const Toggle = ({ on, setOn }) => (
    <div onClick={() => setOn(!on)} style={{ width: 44, height: 24, borderRadius: 12, background: on ? C.blueL : "#CBD5E1", cursor: "pointer", position: "relative", transition: "background .2s", flexShrink: 0 }}>
      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: on ? 22 : 2, transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }} />
    </div>
  );

  // Row item (mobile-style list row)
  const Row = ({ icon: Icon, label, value, badge, onClick, danger }) => (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderBottom: `1px solid ${C.border}`, cursor: "pointer", transition: "background .12s" }}
      className="td">
      {Icon && <div style={{ width: 36, height: 36, borderRadius: 10, background: danger ? C.redL : C.bgLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={15} color={danger ? C.red : C.blueL} />
      </div>}
      <div style={{ flex: 1 }}>
        <div style={{ color: danger ? C.red : C.text, fontSize: 13.5, fontWeight: 500 }}>{label}</div>
        {value && <div style={{ color: C.textDim, fontSize: 12, marginTop: 2 }}>{value}</div>}
      </div>
      {badge && <span style={{ background: C.red, color: "#fff", fontSize: 10, fontWeight: 800, width: 19, height: 19, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{badge}</span>}
      <ChevronRight size={15} color={C.textDim} />
    </div>
  );

  return (
    <div className="fade" style={{ display: "flex", height: "calc(100vh - 57px)", overflow: "hidden" }}>
      {/* Settings nav */}
      <div style={{ width: 200, background: C.white, borderRight: `1px solid ${C.border}`, padding: "14px 8px", flexShrink: 0 }}>
        <div style={{ color: C.textDim, fontSize: 9.5, fontWeight: 700, letterSpacing: 1.2, padding: "0 8px", marginBottom: 6 }}>SETTINGS</div>
        {tabs.map(({ id, icon: Icon, l }) => (
          <div key={id} className={`nav${tab === id ? " on" : ""}`} onClick={() => setTab(id)}>
            <Icon size={14} />{l}
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px", background: C.bg }}>

        {/* ── PROFILE ── */}
        {tab === "profile" && (
          <div style={{ maxWidth: 700 }}>
            <div className="sg" style={{ color: C.text, fontSize: 18, fontWeight: 800, marginBottom: 5 }}>Profile</div>
            <p style={{ color: C.textDim, fontSize: 13, marginBottom: 20 }}>Manage your personal information and account preferences</p>

            {/* Profile card */}
            <div className="card" style={{ padding: "22px 24px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 22, paddingBottom: 18, borderBottom: `1px solid ${C.border}` }}>
                <div style={{ position: "relative" }}>
                  <Av l="Y" size={72} />
                  <button style={{ position: "absolute", bottom: 0, right: 0, width: 22, height: 22, borderRadius: "50%", background: C.blueL, border: "2px solid #fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Edit2 size={10} color="#fff" />
                  </button>
                </div>
                <div>
                  <div style={{ color: C.text, fontSize: 17, fontWeight: 800 }}>Your Name</div>
                  <div style={{ color: C.textDim, fontSize: 13, marginBottom: 4 }}>Admin · SEO Specialist</div>
                  <span className="chip" style={{ color: C.green, background: C.greenL }}>Pro Plan · Active</span>
                </div>
                <button style={{ marginLeft: "auto", background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", padding: "7px 14px", borderRadius: 8, fontSize: 12, fontFamily: "inherit" }}>Edit Profile</button>
              </div>
              {[
                { l: "Full Name", v: "Your Name", type: "text" },
                { l: "Email Address", v: "admin@boostly.app", type: "email" },
                { l: "Phone Number", v: "+63 912 345 6789", type: "tel" },
                { l: "Job Title", v: "SEO Manager", type: "text" },
                { l: "Company", v: "SEO Engine Boost", type: "text" },
                { l: "Website", v: "https://seoengineboost.com", type: "url" },
              ].map(({ l, v, type }) => (
                <div key={l} style={{ marginBottom: 14 }}>
                  <label style={{ color: C.textMid, fontSize: 12, fontWeight: 600, display: "block", marginBottom: 5 }}>{l}</label>
                  <input defaultValue={v} type={type} style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 13px", color: C.text, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "9px 22px", borderRadius: 9, fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>Save Changes</button>
                <button style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", padding: "9px 18px", borderRadius: 9, fontSize: 13, fontFamily: "inherit" }}>Cancel</button>
              </div>
            </div>

            {/* Profile menu (mobile-style) */}
            <div className="card" style={{ overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}` }}>
                <div className="sg" style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>Account Options</div>
              </div>
              <Row icon={Users} label="Personal Information" value="Update your name, email and phone" />
              <Row icon={BarChart} label="Payment Preferences" value="Manage billing and payment methods" />
              <Row icon={Shield} label="Banks and Cards" value="Connected payment methods" />
              <Row icon={Bell} label="Notifications" value="Email, push and SMS preferences" badge={2} onClick={() => setTab("notifications")} />
              <Row icon={MessageSquare} label="Message Center" value="In-app messages and announcements" />
              <Row icon={Globe} label="Address" value="Location and timezone settings" />
              <Row icon={Settings} label="Settings" value="Language, security and privacy" onClick={() => setTab("general")} />
            </div>
          </div>
        )}

        {/* ── GENERAL ── */}
        {tab === "general" && (
          <div style={{ maxWidth: 620 }}>
            <div className="sg" style={{ color: C.text, fontSize: 18, fontWeight: 800, marginBottom: 5 }}>General Settings</div>
            <p style={{ color: C.textDim, fontSize: 13, marginBottom: 20 }}>Manage your app preferences and display options</p>

            {/* General section */}
            <div className="card" style={{ overflow: "hidden", marginBottom: 16 }}>
              <div style={{ padding: "12px 16px 8px", color: C.textDim, fontSize: 10.5, fontWeight: 700, letterSpacing: 1 }}>GENERAL</div>
              <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: C.bgLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Globe size={15} color={C.blueL} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: C.text, fontSize: 13.5, fontWeight: 500 }}>Language</div>
                </div>
                <select value={lang} onChange={e => setLang(e.target.value)} style={{ border: `1px solid ${C.border}`, borderRadius: 7, padding: "5px 10px", fontSize: 13, fontFamily: "inherit", outline: "none", background: C.white, color: C.textMid, cursor: "pointer" }}>
                  <option>English</option><option>Spanish</option><option>French</option><option>Arabic</option><option>Filipino</option>
                </select>
              </div>
              <Row icon={Users} label="My Profile" value="View and edit your profile" onClick={() => setTab("profile")} />
              <Row icon={HelpCircle} label="Contact Us" value="Get help and support" />
            </div>

            {/* Security section */}
            <div className="card" style={{ overflow: "hidden", marginBottom: 16 }}>
              <div style={{ padding: "12px 16px 8px", color: C.textDim, fontSize: 10.5, fontWeight: 700, letterSpacing: 1 }}>SECURITY</div>
              <Row icon={Key} label="Change Password" value="Update your account password" onClick={() => setTab("security")} />
              <Row icon={Shield} label="Privacy Policy" value="How we handle your data" />
              <div style={{ padding: "12px 16px 6px 16px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ color: C.textDim, fontSize: 11, marginBottom: 10 }}>Choose what data you share with us</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: C.bgLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Cpu size={15} color={C.blueL} />
                    </div>
                    <div>
                      <div style={{ color: C.text, fontSize: 13.5, fontWeight: 500 }}>Biometric Login</div>
                      <div style={{ color: C.textDim, fontSize: 11.5, marginTop: 1 }}>Use fingerprint or face ID</div>
                    </div>
                  </div>
                  <Toggle on={biometric} setOn={setBiometric} />
                </div>
              </div>
            </div>

            {/* Danger zone */}
            <div className="card" style={{ overflow: "hidden" }}>
              <div style={{ padding: "12px 16px 8px", color: C.red, fontSize: 10.5, fontWeight: 700, letterSpacing: 1 }}>DANGER ZONE</div>
              <Row icon={AlertCircle} label="Delete Account" value="Permanently delete your account and all data" danger />
              <Row icon={LogOut} label="Sign Out" value="Sign out of all devices" danger />
            </div>
          </div>
        )}

        {/* ── SECURITY ── */}
        {tab === "security" && (
          <div style={{ maxWidth: 620 }}>
            <div className="sg" style={{ color: C.text, fontSize: 18, fontWeight: 800, marginBottom: 5 }}>Security</div>
            <p style={{ color: C.textDim, fontSize: 13, marginBottom: 20 }}>Manage your password, 2FA and security settings</p>
            <div className="card" style={{ padding: "22px 24px", marginBottom: 16 }}>
              <div className="sg" style={{ color: C.text, fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Change Password</div>
              {[{ l: "Current Password", p: "Enter current password" }, { l: "New Password", p: "Min. 8 characters" }, { l: "Confirm New Password", p: "Repeat new password" }].map(({ l, p }) => (
                <div key={l} style={{ marginBottom: 14 }}>
                  <label style={{ color: C.textMid, fontSize: 12, fontWeight: 600, display: "block", marginBottom: 5 }}>{l}</label>
                  <input type="password" placeholder={p} style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 13px", color: C.text, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
                </div>
              ))}
              <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "9px 22px", borderRadius: 9, fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>Update Password</button>
            </div>
            <div className="card" style={{ padding: "20px 24px", marginBottom: 16 }}>
              <div className="sg" style={{ color: C.text, fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Two-Factor Authentication</div>
              <p style={{ color: C.textDim, fontSize: 12.5, marginBottom: 14 }}>Add an extra layer of security to your account using an authenticator app.</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="chip" style={{ color: C.textDim, background: "#F1F5F9" }}>Not Enabled</span>
                <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "8px 18px", borderRadius: 8, fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>Enable 2FA</button>
              </div>
            </div>
            <div className="card" style={{ padding: "20px 24px" }}>
              <div className="sg" style={{ color: C.text, fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Active Sessions</div>
              {[
                { device: "Chrome on MacBook Pro", location: "Cebu, Philippines", current: true, time: "Now" },
                { device: "Safari on iPhone 15", location: "Manila, Philippines", current: false, time: "2 hours ago" },
                { device: "Chrome on Windows PC", location: "Manila, Philippines", current: false, time: "Yesterday" },
              ].map(({ device, location, current, time }) => (
                <div key={device} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: current ? C.bgLight : "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Cpu size={15} color={current ? C.blueL : C.textDim} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{device} {current && <span className="chip" style={{ color: C.green, background: C.greenL, marginLeft: 6 }}>Current</span>}</div>
                    <div style={{ color: C.textDim, fontSize: 11.5 }}>{location} · {time}</div>
                  </div>
                  {!current && <button style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.red, cursor: "pointer", padding: "5px 12px", borderRadius: 7, fontSize: 11, fontWeight: 600, fontFamily: "inherit" }}>Revoke</button>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── NOTIFICATIONS ── */}
        {tab === "notifications" && (
          <div style={{ maxWidth: 620 }}>
            <div className="sg" style={{ color: C.text, fontSize: 18, fontWeight: 800, marginBottom: 5 }}>Notifications</div>
            <p style={{ color: C.textDim, fontSize: 13, marginBottom: 20 }}>Choose what notifications you receive and how</p>
            {[
              { label: "Email Notifications", desc: "Receive reports, alerts and updates via email", on: notifEmail, setOn: setNotifEmail },
              { label: "Push Notifications", desc: "Browser push notifications for real-time alerts", on: notifPush, setOn: setNotifPush },
              { label: "SMS Notifications", desc: "Text message alerts for critical updates", on: notifSMS, setOn: setNotifSMS },
              { label: "Weekly SEO Report", desc: "Automated weekly summary delivered to your inbox", on: notifWeekly, setOn: setNotifWeekly },
            ].map(({ label, desc, on, setOn }) => (
              <div key={label} className="card" style={{ padding: "16px 20px", marginBottom: 10, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ color: C.text, fontSize: 13.5, fontWeight: 600 }}>{label}</div>
                  <div style={{ color: C.textDim, fontSize: 12, marginTop: 2 }}>{desc}</div>
                </div>
                <Toggle on={on} setOn={setOn} />
              </div>
            ))}
            <div className="card" style={{ padding: "18px 20px", marginTop: 6 }}>
              <div className="sg" style={{ color: C.text, fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Alert Frequency</div>
              {["Immediately", "Daily Digest", "Weekly Summary"].map((opt, i) => (
                <label key={opt} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", cursor: "pointer", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
                  <input type="radio" name="freq" defaultChecked={i === 0} style={{ accentColor: C.blueL, width: 16, height: 16 }} />
                  <span style={{ color: C.text, fontSize: 13 }}>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ── INTEGRATIONS ── */}
        {tab === "integrations" && (
          <div style={{ maxWidth: 700 }}>
            <div className="sg" style={{ color: C.text, fontSize: 18, fontWeight: 800, marginBottom: 5 }}>Integrations</div>
            <p style={{ color: C.textDim, fontSize: 13, marginBottom: 20 }}>Connect Boostly with your favorite tools and platforms</p>
            {[
              { n:"Semrush",               d:"Import keyword data, site audits and analytics",  connected:false, category:"SEO" },
              { n:"Google Analytics 4",    d:"Traffic, conversions and behavior tracking",       connected:true,  category:"Analytics" },
              { n:"Google Search Console", d:"Search rankings, clicks and indexation data",      connected:false, category:"SEO" },
              { n:"Slack",                 d:"Sync notifications, alerts and team messages",     connected:true,  category:"Communication" },
              { n:"Ahrefs",                d:"Backlink intelligence and keyword explorer",       connected:false, category:"SEO" },
              { n:"WordPress",             d:"One-click content publishing to your CMS",         connected:true,  category:"CMS" },
              { n:"HubSpot",               d:"CRM, lead management and marketing automation",    connected:false, category:"CRM" },
              { n:"Grammarly",             d:"Grammar, tone and readability corrections",        connected:false, category:"Content" },
              { n:"Zapier",                d:"Automate workflows with 5,000+ apps",             connected:false, category:"Automation" },
            ].map(({ n, d, connected, category }) => (
              <div key={n} className="card" style={{ padding: "14px 18px", marginBottom: 10, display: "flex", alignItems: "center", gap: 14, border: connected ? `1px solid ${C.green}40` : `1px solid ${C.border}` }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: connected ? C.greenL : C.bgLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Globe size={17} color={connected ? C.green : C.blueL} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <div style={{ color: C.text, fontWeight: 700, fontSize: 13.5 }}>{n}</div>
                    <span className="chip" style={{ color: C.textDim, background: "#F1F5F9", fontSize: 9 }}>{category}</span>
                  </div>
                  <div style={{ color: C.textDim, fontSize: 12 }}>{d}</div>
                </div>
                <button style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit", background: connected ? C.greenL : C.blueL, color: connected ? C.green : "#fff", flexShrink: 0 }}>
                  {connected ? "Connected ✓" : "Connect"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── BILLING ── */}
        {tab === "billing" && (
          <div style={{ maxWidth: 680 }}>
            <div className="sg" style={{ color: C.text, fontSize: 18, fontWeight: 800, marginBottom: 5 }}>Billing & Plan</div>
            <p style={{ color: C.textDim, fontSize: 13, marginBottom: 20 }}>Manage your subscription, usage and payment methods</p>
            {/* Current plan */}
            <div style={{ background: `linear-gradient(135deg,${C.blue},${C.blueL})`, borderRadius: 14, padding: "22px 26px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,.08)" }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
                <div>
                  <div style={{ color: "rgba(255,255,255,.7)", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>CURRENT PLAN</div>
                  <div className="sg" style={{ color: "#fff", fontSize: 22, fontWeight: 900, marginBottom: 4 }}>Pro Plan</div>
                  <div style={{ color: "rgba(255,255,255,.75)", fontSize: 13 }}>$30/month · Renews June 1, 2026</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "rgba(255,255,255,.7)", fontSize: 11, marginBottom: 4 }}>Usage this month</div>
                  <div style={{ color: "#fff", fontSize: 18, fontWeight: 800 }}>4 / 4 crawls</div>
                  <button style={{ marginTop: 8, background: C.orange, color: "#fff", border: "none", cursor: "pointer", padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>Upgrade Plan</button>
                </div>
              </div>
            </div>
            {/* Usage */}
            <div className="card" style={{ padding: "18px 22px", marginBottom: 14 }}>
              <div className="sg" style={{ color: C.text, fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Monthly Usage</div>
              {[{ l: "Site Crawls", v: 4, max: 4, c: C.red }, { l: "Keyword Searches", v: 36, max: 40, c: C.orange }, { l: "Backlink Lookups", v: 24, max: 24, c: C.red }, { l: "Reports Generated", v: 8, max: 20, c: C.green }].map(({ l, v, max, c }) => (
                <div key={l} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ color: C.textMid, fontSize: 12 }}>{l}</span>
                    <span style={{ color: v >= max ? C.red : C.text, fontSize: 12, fontWeight: 700 }}>{v} / {max}</span>
                  </div>
                  <ProgBar v={(v / max) * 100} col={v >= max ? C.red : v >= max * 0.8 ? C.orange : c} h={6} />
                </div>
              ))}
            </div>
            {/* Payment */}
            <div className="card" style={{ padding: "18px 22px" }}>
              <div className="sg" style={{ color: C.text, fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Payment Method</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: C.bg, borderRadius: 9, border: `1px solid ${C.border}` }}>
                <div style={{ width: 40, height: 26, borderRadius: 5, background: C.blueL, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontSize: 9, fontWeight: 800 }}>VISA</span>
                </div>
                <div style={{ flex: 1 }}><div style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>Visa ending in 4242</div><div style={{ color: C.textDim, fontSize: 11.5 }}>Expires 12/2027</div></div>
                <button style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", padding: "5px 12px", borderRadius: 7, fontSize: 11, fontFamily: "inherit" }}>Update</button>
              </div>
            </div>
          </div>
        )}

        {/* ── WORKSPACE ── */}
        {tab === "workspace" && (
          <div style={{ maxWidth: 620 }}>
            <div className="sg" style={{ color: C.text, fontSize: 18, fontWeight: 800, marginBottom: 5 }}>Workspace Settings</div>
            <p style={{ color: C.textDim, fontSize: 13, marginBottom: 20 }}>Configure your team workspace preferences</p>
            <div className="card" style={{ padding: "22px 24px" }}>
              {[{ l: "Workspace Name", v: "SEO Engine Boost" }, { l: "Website URL", v: "https://seoengineboost.com" }, { l: "Industry", v: "Digital Marketing" }, { l: "Team Size", v: "1-10 people" }].map(({ l, v }) => (
                <div key={l} style={{ marginBottom: 14 }}>
                  <label style={{ color: C.textMid, fontSize: 12, fontWeight: 600, display: "block", marginBottom: 5 }}>{l}</label>
                  <input defaultValue={v} style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 13px", color: C.text, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
                </div>
              ))}
              <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "9px 22px", borderRadius: 9, fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>Save Workspace</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Competitive Research Screen ───────────────────────────────────────
function CompetitiveResearch() {
  return (
    <div className="fade" style={{ overflowY: "auto", height: "calc(100vh - 57px)" }}>
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${C.border}`, background: C.white, display: "flex", gap: 10 }}>
        <div style={{ flex: 1, display: "flex", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 9, overflow: "hidden" }}>
          <input defaultValue="designer.com" style={{ flex: 1, padding: "9px 14px", background: "transparent", border: "none", outline: "none", color: C.text, fontSize: 13, fontFamily: "inherit" }} />
          <select style={{ background: "transparent", border: "none", outline: "none", color: C.textMid, fontSize: 12, padding: "0 12px", borderLeft: `1px solid ${C.border}`, cursor: "pointer", fontFamily: "inherit" }}>
            <option>Global</option><option>Philippines</option><option>United States</option>
          </select>
        </div>
        <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "10px 22px", borderRadius: 9, fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>Compare</button>
        <button style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", padding: "10px 14px", borderRadius: 9, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}>
          <Plus size={13} /> Add Competitor
        </button>
      </div>
      <div style={{ padding: "20px 24px" }}>
        {/* Overview */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: 14, marginBottom: 16 }}>
          <div className="card" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ color: C.orange, fontWeight: 800, fontSize: 16, fontFamily: "Space Grotesk" }}>Organic Traffic</span>
                  <span style={{ color: C.textDim, fontSize: 13 }}>81,346/month</span>
                </div>
                <div style={{ color: C.textDim, fontSize: 12 }}>designer.com · Date: 12 September 2025</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
              {[["Visits","333K","+4%"],["Unique Visitors","33K","+3%"],["Pages/Visit","4.2",""],["Avg Duration","3:21",""]].map(([l,v,ch]) => (
                <div key={l} style={{ padding: "10px 12px", background: C.bg, borderRadius: 8, border: `1px solid ${C.border}` }}>
                  <div style={{ color: C.textDim, fontSize: 10.5, marginBottom: 4 }}>{l}</div>
                  <div className="sg" style={{ color: C.text, fontSize: 18, fontWeight: 800 }}>{v}</div>
                  {ch && <div style={{ color: C.green, fontSize: 10.5, fontWeight: 700 }}>{ch}</div>}
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={130}>
              <AreaChart data={trafficData} margin={{ top: 0, right: 0, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.blueL} stopOpacity={.18} />
                    <stop offset="95%" stopColor={C.blueL} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="m" tick={{ fill: C.textDim, fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.textDim, fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11 }} />
                <Area type="monotone" dataKey="organic" stroke={C.blueL} fill="url(#cg1)" strokeWidth={2} />
                <Area type="monotone" dataKey="paid" stroke={C.orange} fill="none" strokeWidth={1.5} strokeDasharray="4 2" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[["Backlinks","1.2K","+5%",C.blueL],["Page/Visitors","552.5K","+2%",C.green],["Avg Duration","61K","-4%",C.orange],["Authority Score","61","+2",C.purple],["Paid Traffic","621K","+8%",C.blueL]].map(([l,v,ch,col]) => (
              <div key={l} className="card" style={{ padding: "10px 14px", flex: 1 }}>
                <div style={{ color: C.textDim, fontSize: 10.5 }}>{l}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 2 }}>
                  <div className="sg" style={{ color: C.text, fontSize: 18, fontWeight: 800 }}>{v}</div>
                  <span className="chip" style={{ color: C.green, background: C.greenL, fontSize: 9.5 }}>{ch}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Keywords table */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "12px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: C.orange, fontWeight: 700, fontSize: 14, fontFamily: "Space Grotesk" }}>Keywords</span>
            <button style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", padding: "4px 10px", borderRadius: 7, fontSize: 11, fontFamily: "inherit" }}>View All →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr .7fr .7fr .5fr .5fr", padding: "8px 18px", background: C.bg, borderBottom: `1px solid ${C.border}` }}>
            {["Keyword","Trend","CPC","SERP","KD"].map(h => (
              <div key={h} style={{ color: C.textDim, fontSize: 10, fontWeight: 700, letterSpacing: .4 }}>{h.toUpperCase()}</div>
            ))}
          </div>
          {keywords.slice(0, 6).map(({ kw, cpc, kd }, i) => (
            <div key={i} className="td" style={{ display: "grid", gridTemplateColumns: "2fr .7fr .7fr .5fr .5fr", padding: "10px 18px", borderBottom: i < 5 ? `1px solid ${C.border}` : "none", alignItems: "center" }}>
              <div style={{ color: C.text, fontSize: 12, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{kw}</div>
              <div style={{ color: C.green, fontSize: 11, fontWeight: 700 }}>↑</div>
              <div style={{ color: C.textMid, fontSize: 12 }}>{cpc}</div>
              <div style={{ color: C.textMid, fontSize: 12 }}>31</div>
              <div style={{ color: C.textMid, fontSize: 12 }}>{kd}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Rank Tracking Screen ───────────────────────────────────────────────
function RankTracking() {
  const [step, setStep] = useState("rankings"); // "rankings" | "settings" | "keywords"
  const [device, setDevice] = useState("desktop");
  const [engine, setEngine] = useState("Google");
  const [country, setCountry] = useState("United States (US)");
  const [lang, setLang] = useState("English");
  const [kwInput, setKwInput] = useState("seo");
  const [search, setSearch] = useState("");
  const [showPerPage, setShowPerPage] = useState("25");

  const rankRows = [
    {kw:"seo",pageRank:null,device:"Desktop",pos:null,notRanking:true,estTraffic:0,vol:"135,000",movement:null},
    {kw:"dental implants near me",pageRank:"/dental-implants",device:"Desktop",pos:4,notRanking:false,estTraffic:820,vol:"8,200",movement:+3},
    {kw:"best SEO tools 2026",pageRank:"/seo-tools",device:"Desktop",pos:7,notRanking:false,estTraffic:280,vol:"5,100",movement:+5},
    {kw:"agency project management",pageRank:"/project-mgmt",device:"Mobile",pos:11,notRanking:false,estTraffic:95,vol:"3,400",movement:-2},
    {kw:"SEO reporting dashboard",pageRank:"/reports",device:"Desktop",pos:6,notRanking:false,estTraffic:180,vol:"4,100",movement:+8},
    {kw:"content marketing software",pageRank:"/content",device:"Mobile",pos:19,notRanking:false,estTraffic:60,vol:"6,700",movement:+1},
    {kw:"task management agencies",pageRank:"/tasks",device:"Desktop",pos:9,notRanking:false,estTraffic:120,vol:"3,800",movement:-1},
    {kw:"marketing collaboration tool",pageRank:"/collaboration",device:"Desktop",pos:15,notRanking:false,estTraffic:45,vol:"2,900",movement:+4},
  ];

  const filtered = rankRows.filter(r => r.kw.toLowerCase().includes(search.toLowerCase()));

  const ExportBar = () => (
    <div style={{display:"flex",gap:4,marginTop:6}}>
      {["Copy","Excel","CSV","PDF","Print"].map(btn=>(
        <button key={btn} style={{padding:"4px 10px",border:`1px solid ${C.border}`,borderRadius:5,background:C.bg,cursor:"pointer",fontSize:11,fontWeight:600,color:C.textMid,fontFamily:"inherit"}}>{btn}</button>
      ))}
    </div>
  );

  // ── Settings step ──
  if (step === "settings") {
    return (
      <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)",background:C.bg,display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:40}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:20,width:"100%",maxWidth:900,padding:"0 28px"}}>
          {/* Left: intro */}
          <div>
            <h2 className="sg" style={{color:C.text,fontSize:20,fontWeight:800,marginBottom:6}}>Keyword Tracking</h2>
            <p style={{color:C.textDim,fontSize:13,marginBottom:16}}>for <strong>www.seoengineboost.com</strong> in 🇺🇸 {country} (EN) - {engine} ({device==="desktop"?"🖥 Desktop":"📱 Mobile"})</p>
            <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:"20px 22px"}}>
              <div style={{fontWeight:700,fontSize:14,color:C.text,marginBottom:10}}>Enter Keywords Manually</div>
              <p style={{color:C.textDim,fontSize:12.5,marginBottom:10}}>Enter any specific keywords separated by a comma</p>
              <textarea value={kwInput} onChange={e=>setKwInput(e.target.value)} rows={4}
                style={{width:"100%",padding:"10px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,fontFamily:"inherit",outline:"none",resize:"none",color:C.text}}
                placeholder="seo, best seo tools, dental implants near me"/>
              <button onClick={()=>setStep("rankings")} style={{marginTop:10,background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"8px 20px",borderRadius:8,fontSize:13,fontWeight:700,fontFamily:"inherit"}}>Add</button>
            </div>
          </div>

          {/* Right: Settings panel */}
          <div style={{background:C.white,border:`2px solid ${C.blueL}`,borderRadius:12,padding:"20px 22px",alignSelf:"flex-start"}}>
            <div className="sg" style={{color:C.text,fontSize:15,fontWeight:800,marginBottom:8}}>Keyword Tracking Settings</div>
            <p style={{color:C.textDim,fontSize:12,lineHeight:1.6,marginBottom:18}}>
              Google's Search Results vary by country because Google aims to show the most relevant localized results. Hence your Keyword Rankings and traffic will also vary depending by country. Please choose the country which is the most relevant for your site.
            </p>

            <div style={{marginBottom:14}}>
              <label style={{display:"block",color:C.text,fontSize:13,fontWeight:600,marginBottom:6}}>Search Engine:</label>
              <select value={engine} onChange={e=>setEngine(e.target.value)}
                style={{width:"100%",padding:"9px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,fontFamily:"inherit",outline:"none",background:"white"}}>
                <option>🅖 Google</option><option>Bing</option><option>Yahoo</option>
              </select>
            </div>
            <div style={{marginBottom:14}}>
              <label style={{display:"block",color:C.text,fontSize:13,fontWeight:600,marginBottom:6}}>Country:</label>
              <select value={country} onChange={e=>setCountry(e.target.value)}
                style={{width:"100%",padding:"9px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,fontFamily:"inherit",outline:"none",background:"white"}}>
                <option>🇺🇸 United States (US)</option><option>🇵🇭 Philippines</option>
                <option>🇬🇧 United Kingdom (UK)</option><option>🇳🇬 Nigeria</option>
                <option>🇦🇺 Australia</option>
              </select>
            </div>
            <div style={{marginBottom:16}}>
              <label style={{display:"block",color:C.text,fontSize:13,fontWeight:600,marginBottom:6}}>Language:</label>
              <select value={lang} onChange={e=>setLang(e.target.value)}
                style={{width:"100%",padding:"9px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,fontFamily:"inherit",outline:"none",background:"white"}}>
                <option>English</option><option>Spanish</option><option>French</option><option>Arabic</option>
              </select>
            </div>
            <div style={{marginBottom:20}}>
              <label style={{display:"block",color:C.text,fontSize:13,fontWeight:600,marginBottom:10}}>Device:</label>
              <div style={{display:"flex",gap:16}}>
                {[["desktop","🖥 Desktop"],["mobile","📱 Mobile"]].map(([id,label])=>(
                  <label key={id} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13,color:C.text}}>
                    <input type="checkbox" checked={device===id||device==="both"} onChange={()=>setDevice(id)}
                      style={{width:16,height:16,accentColor:C.blueL,cursor:"pointer"}}/>
                    {label}
                  </label>
                ))}
              </div>
            </div>
            <button onClick={()=>setStep("rankings")} style={{width:"100%",background:C.yellow,color:"#fff",border:"none",cursor:"pointer",padding:"10px",borderRadius:9,fontSize:14,fontWeight:700,fontFamily:"inherit"}}>Next →</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Rankings table ──
  return (
    <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)",background:C.bg}}>
      {/* Header */}
      <div style={{padding:"22px 28px",background:C.white,borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
        <div>
          <h2 className="sg" style={{color:C.text,fontSize:20,fontWeight:800,marginBottom:4}}>Keyword Rankings</h2>
          <p style={{color:C.textDim,fontSize:13}}>for <strong>www.seoengineboost.com</strong> in 🇺🇸 {country} (EN) - {engine} ({device==="desktop"?"🖥 Desktop":"📱 Mobile"})</p>
          <p style={{color:C.textDim,fontSize:12,marginTop:4}}>Last Updated 9 August 2025</p>
        </div>
        <button onClick={()=>setStep("settings")} style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"9px 20px",borderRadius:9,fontSize:13,fontWeight:700,fontFamily:"inherit",flexShrink:0}}>Update Your Keywords</button>
      </div>

      {/* Stats cards */}
      <div style={{padding:"16px 28px 0"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {[
            {l:"Tracked Keywords",v:`${rankRows.length}`,c:C.blueL,icon:Target},
            {l:"Ranking (Top 3)",v:"2",c:C.green,icon:TrendingUp},
            {l:"Ranking (Top 10)",v:"4",c:C.orange,icon:BarChart2},
            {l:"Not Ranking",v:"1",c:C.red,icon:AlertCircle},
          ].map(({l,v,c,icon:Icon})=>(
            <div key={l} className="card ch" style={{padding:"14px 18px"}}>
              <div style={{width:32,height:32,borderRadius:8,background:`${c}18`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:8}}><Icon size={14} color={c}/></div>
              <div className="sg" style={{color:C.text,fontSize:22,fontWeight:800}}>{v}</div>
              <div style={{color:C.textDim,fontSize:11,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{padding:"0 28px 28px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{color:C.textDim,fontSize:12}}>Show</span>
            <select value={showPerPage} onChange={e=>setShowPerPage(e.target.value)}
              style={{padding:"4px 8px",border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,fontFamily:"inherit",outline:"none",background:"white"}}>
              {["10","25","50","100"].map(o=><option key={o}>{o}</option>)}
            </select>
            <span style={{color:C.textDim,fontSize:12}}>entries</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{color:C.textDim,fontSize:12}}>Search:</span>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              style={{padding:"5px 10px",border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,width:180,fontFamily:"inherit",outline:"none"}}/>
          </div>
        </div>

        <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
          <div style={{display:"grid",gridTemplateColumns:"2.2fr 1.5fr 90px 90px 140px 150px 140px",padding:"10px 18px",background:C.bg,borderBottom:`1px solid ${C.border}`,gap:8}}>
            {["KEYWORD","PAGE RANKING","DEVICE","POSITION","EST. TRAFFIC","SEARCH VOLUME","RECENT MOVEMENT"].map(h=>(
              <div key={h} style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:.4}}>{h}</div>
            ))}
          </div>

          {filtered.map((row,i)=>(
            <div key={i} className="td" style={{display:"grid",gridTemplateColumns:"2.2fr 1.5fr 90px 90px 140px 150px 140px",padding:"12px 18px",borderBottom:i<filtered.length-1?`1px solid ${C.border}`:"none",alignItems:"center",gap:8}}>
              <div style={{color:C.text,fontSize:13,fontWeight:500}}>{row.kw}</div>
              <div style={{color:C.blueL,fontSize:12,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",cursor:"pointer"}}>{row.pageRank || "—"}</div>
              <div style={{display:"flex",alignItems:"center",gap:5,color:C.textMid,fontSize:12}}>
                {row.device==="Desktop"?"🖥":"📱"} {row.device}
              </div>
              <div>
                {row.notRanking
                  ? <span style={{background:"#FEF3C7",color:"#92400E",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:5}}>Not Ranking</span>
                  : <span style={{background:row.pos<=3?C.greenL:row.pos<=10?C.bluePale:"#F1F5F9",color:row.pos<=3?C.green:row.pos<=10?C.blueL:C.textMid,fontSize:12,fontWeight:800,padding:"2px 8px",borderRadius:5}}>#{row.pos}</span>
                }
              </div>
              <div style={{color:C.textMid,fontSize:12.5}}>{row.estTraffic>0?row.estTraffic.toLocaleString():"0"}</div>
              <div style={{color:C.textMid,fontSize:12.5}}>{row.vol}</div>
              <div>
                {row.movement===null
                  ? <span style={{color:C.textDim,fontSize:12}}>—</span>
                  : <span style={{color:row.movement>0?C.green:C.red,fontWeight:700,fontSize:13,display:"flex",alignItems:"center",gap:3}}>
                      {row.movement>0?<TrendingUp size={13}/>:<TrendingDown size={13}/>}
                      {row.movement>0?`+${row.movement}`:row.movement}
                    </span>
                }
              </div>
            </div>
          ))}

          <div style={{padding:"12px 18px",background:C.bg,borderTop:`1px solid ${C.border}`,display:"flex",flexDirection:"column",gap:4}}>
            <span style={{color:C.textDim,fontSize:12}}>Showing 1 to {filtered.length} of {rankRows.length} entries</span>
            <ExportBar/>
          </div>
        </div>

        {/* Ranking history chart */}
        <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 22px",marginTop:16}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <div className="sg" style={{color:C.text,fontSize:14,fontWeight:700}}>Ranking History</div>
            <div style={{display:"flex",gap:8}}>
              {["1W","1M","3M","All"].map((t,i)=>(
                <button key={t} style={{padding:"4px 12px",borderRadius:6,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"inherit",background:i===1?C.blueL:"rgba(0,0,0,.05)",color:i===1?"#fff":C.textDim}}>{t}</button>
              ))}
            </div>
          </div>
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

// ── Calendar Screen ────────────────────────────────────────────────────
function CalendarView() {
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const events = {
    2:[{l:"Team Sync",c:C.blueL}],5:[{l:"Client Call",c:C.orange}],
    7:[{l:"Q2 Launch",c:C.green}],10:[{l:"Content Due",c:C.red}],
    14:[{l:"SEO Report",c:C.green}],18:[{l:"Team Meeting",c:C.purple}],
    21:[{l:"Client Review",c:C.yellow}],25:[{l:"Blog Batch",c:C.blueL}],
    28:[{l:"Sprint Retro",c:C.orange}],
  };
  const upcoming = [
    {l:"Team Sync",d:"Today, 10:00 AM",c:C.blueL,t:"Meeting"},
    {l:"Client Call",d:"Today, 2:00 PM",c:C.orange,t:"Call"},
    {l:"Q2 Campaign Launch",d:"May 7, 9:00 AM",c:C.green,t:"Launch"},
    {l:"Content Deadline",d:"May 10, 5:00 PM",c:C.red,t:"Deadline"},
    {l:"SEO Report Due",d:"May 14, EOD",c:C.green,t:"Report"},
  ];
  return (
    <div className="fade" style={{ display: "flex", height: "calc(100vh - 57px)", overflow: "hidden" }}>
      <div style={{ flex: 1, padding: "20px 24px", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button style={{ background: "transparent", border: `1px solid ${C.border}`, cursor: "pointer", padding: "6px 9px", borderRadius: 8, display: "flex" }}><ChevronLeft size={14} /></button>
            <h2 className="sg" style={{ color: C.text, fontSize: 18, fontWeight: 800 }}>May 2026</h2>
            <button style={{ background: "transparent", border: `1px solid ${C.border}`, cursor: "pointer", padding: "6px 9px", borderRadius: 8, display: "flex" }}><ChevronRight size={13} /></button>
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            {["Day","Week","Month"].map((v,i) => (
              <button key={v} style={{ padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit", background: i===2?C.blueL:"rgba(0,0,0,.05)", color: i===2?"#fff":C.textDim }}>{v}</button>
            ))}
          </div>
        </div>
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", borderBottom: `1px solid ${C.border}` }}>
            {days.map(d => <div key={d} style={{ padding: "10px 0", textAlign: "center", color: C.textDim, fontSize: 11, fontWeight: 700, letterSpacing: .5 }}>{d.toUpperCase()}</div>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>
            {[...Array(37)].map((_,i) => {
              const day = i - 1;
              const isToday = day === 2;
              const hasEvt = events[day];
              return (
                <div key={i} style={{ minHeight: 80, padding: "7px", borderBottom: `1px solid ${C.border}`, borderRight: (i+1)%7!==0?`1px solid ${C.border}`:"none", background: isToday?"rgba(37,99,235,0.04)":"transparent", cursor: "pointer" }}>
                  {day > 0 && day <= 31 && (
                    <>
                      <div style={{ width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: isToday?800:400, color: isToday?"#fff":C.textMid, background: isToday?C.blueL:"transparent", marginBottom: 3 }}>{day}</div>
                      {hasEvt && hasEvt.map((ev,ei) => (
                        <div key={ei} style={{ background:`${ev.c}15`, color:ev.c, fontSize:9.5, fontWeight:700, padding:"2px 5px", borderRadius:4, marginBottom:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", borderLeft:`2px solid ${ev.c}` }}>{ev.l}</div>
                      ))}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ width: 260, background: C.white, borderLeft: `1px solid ${C.border}`, padding: 18, overflowY: "auto", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div className="sg" style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>Upcoming</div>
          <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "5px 10px", borderRadius: 7, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit" }}><Plus size={11}/>New</button>
        </div>
        {upcoming.map(({ l, d, c, t }) => (
          <div key={l} style={{ background: C.bg, borderLeft: `3px solid ${c}`, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 12px", marginBottom: 9 }}>
            <span className="chip" style={{ color: c, background: `${c}18`, marginBottom: 5, display: "inline-flex" }}>{t.toUpperCase()}</span>
            <div style={{ color: C.text, fontSize: 12.5, fontWeight: 600, marginBottom: 3 }}>{l}</div>
            <div style={{ display: "flex", gap: 5, color: C.textDim, fontSize: 11, alignItems: "center" }}><Clock size={10}/>{d}</div>
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14, marginTop: 4 }}>
          <div className="sg" style={{ color: C.text, fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Social Queue</div>
          {[{p:"LinkedIn",t:"Today 10AM",s:"scheduled"},{p:"Instagram",t:"Today 2PM",s:"draft"},{p:"Twitter / X",t:"May 4 9AM",s:"scheduled"},{p:"Facebook",t:"May 5 12PM",s:"pending"}].map(({p,t,s}) => (
            <div key={p} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", background: C.bg, borderRadius: 8, marginBottom: 6, border: `1px solid ${C.border}` }}>
              <Globe size={12} color={C.blueL}/>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.text, fontSize: 12, fontWeight: 600 }}>{p}</div>
                <div style={{ color: C.textDim, fontSize: 10 }}>{t}</div>
              </div>
              <span className="chip" style={{ color: s==="scheduled"?C.green:s==="draft"?C.textDim:C.yellow, background: s==="scheduled"?C.greenL:s==="draft"?"#F1F5F9":C.yellowL }}>{s.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Pricing Page ───────────────────────────────────────────────────────
function PricingPage({ goBack }) {
  const [billing, setBilling] = useState("monthly");
  const pricingPlans = [
    { id:"individual", name:"Individual", mo:12, yr:9,  desc:"Perfect for freelancers and solo SEO professionals.", current:true },
    { id:"business",   name:"Business",   mo:20, yr:15, desc:"For growing agencies managing multiple clients.", popular:true },
    { id:"enterprise", name:"Enterprise", mo:40, yr:30, desc:"Full power for large teams and enterprises." },
    { id:"enterprise2",name:"Enterprise", mo:40, yr:30, desc:"Lorem ipsum dolor sit amet, consectetur" },
  ];
  const feats = ["SEO Training & Support","Reports Per Day","Projects","Chrome Extension Search Limits","Rank Tracking","Site Audit","Keyword Research","Competitive Analysis","Backlinks"];
  const fMatrix = {
    individual:["✓","5/day","3","100/day","100 kw","500 pages","✓","Basic","100"],
    business:["✓","20/day","15","500/day","1,000 kw","5,000 pages","✓","Advanced","1,000"],
    enterprise:["Priority","Unlimited","Unlimited","Unlimited","Unlimited","Unlimited","✓","Full","Unlimited"],
  };
  return (
    <div style={{ minHeight: "100vh", background: "#fff", overflowY: "auto" }}>
      {/* Nav */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 40px", display: "flex", alignItems: "center", height: 56, position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 36, cursor: "pointer" }} onClick={goBack}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: `linear-gradient(135deg, ${C.orange}, ${C.blueL})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={15} color="#fff" fill="#fff" />
          </div>
          <span style={{ color: C.text, fontWeight: 800, fontSize: 15 }}>Boostly</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24, flex: 1 }}>
          {["Tools","Pricing","Results","Training","Consulting","Contact"].map(l => (
            <span key={l} style={{ color: l==="Pricing"?C.blueL:C.textMid, fontSize: 13.5, fontWeight: l==="Pricing"?700:500, cursor: "pointer" }}>{l}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: C.textMid, cursor: "pointer" }}>🇳🇬 Nigeria ▾</span>
          <button onClick={goBack} style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "7px 16px", borderRadius: 7, fontSize: 13, fontWeight: 600, fontFamily: "inherit" }}>← Back to App</button>
        </div>
      </nav>

      {/* Cards */}
      <section style={{ padding: "50px 40px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: C.text, marginBottom: 40 }}>Pricing</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
          {pricingPlans.map(plan => {
            const price = billing === "monthly" ? plan.mo : plan.yr;
            return (
              <div key={plan.id} style={{ background: "#fff", border: `1px solid ${plan.popular ? C.blueL : "#E5E7EB"}`, borderRadius: 12, padding: "26px 22px", position: "relative", overflow: "hidden", boxShadow: plan.popular ? `0 4px 20px rgba(37,99,235,.15)` : "0 1px 4px rgba(0,0,0,.06)", transition: "all .2s" }}>
                <div style={{ position: "absolute", top: -18, right: -18, width: 60, height: 60, borderRadius: "50%", background: C.orange }} />
                <div style={{ position: "relative" }}>
                  <div style={{ color: C.text, fontWeight: 700, fontSize: 15, marginBottom: 10 }}>{plan.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 8 }}>
                    <span style={{ fontSize: 26, fontWeight: 800, color: C.text }}>${price}</span>
                    <span style={{ fontSize: 12, color: C.textDim }}>/ month</span>
                  </div>
                  <p style={{ color: C.textMid, fontSize: 12, lineHeight: 1.6, marginBottom: 16 }}>{plan.desc}</p>
                  {plan.current
                    ? <button style={{ width: "100%", padding: "9px 0", fontSize: 13, borderRadius: 7, border: "1.5px solid #D1D5DB", background: "transparent", color: "#374151", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, marginBottom: 18 }}>Current Plan</button>
                    : <button style={{ width: "100%", padding: "9px 0", fontSize: 13, borderRadius: 7, border: "none", background: C.blueL, color: "#fff", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, marginBottom: 18 }}>Upgrade</button>
                  }
                  {[...Array(7)].map((_,i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
                      <div style={{ width: 15, height: 15, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check size={8} color={C.green} strokeWidth={3} />
                      </div>
                      <span style={{ color: C.textMid, fontSize: 12 }}>sit amet, consectetur</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Toggle */}
      <div style={{ display: "flex", justifyContent: "center", padding: "16px 0 44px" }}>
        <div style={{ display: "flex", background: "#F3F4F6", borderRadius: 6, padding: 4, gap: 2 }}>
          {["monthly","yearly"].map(b => (
            <button key={b} onClick={() => setBilling(b)} style={{ padding: "8px 28px", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit", borderRadius: 4, background: billing===b?"#111827":"transparent", color: billing===b?"#fff":"#374151" }}>
              {b === "monthly" ? "Monthly" : "Annually"}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison table */}
      <section style={{ background: "#F9FAFB", padding: "0 40px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, overflow: "hidden", padding: "40px" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: C.text, fontStyle: "italic", fontFamily: "Georgia, serif" }}>
                Shoot for the stars with your SEO performance
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr 1fr" }}>
              <div style={{ paddingBottom: 20 }}>
                <p style={{ color: C.textMid, fontSize: 12.5, lineHeight: 1.7 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor consectetur</p>
              </div>
              {["individual","business","enterprise"].map(pid => {
                const pl = pricingPlans.find(p => p.id === pid);
                const pr = billing === "monthly" ? pl.mo : pl.yr;
                return (
                  <div key={pid} style={{ padding: "0 16px 20px", borderLeft: "1px solid #E5E7EB", textAlign: "center" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 4 }}>{pl.name}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 3, justifyContent: "center", marginBottom: 5 }}>
                      <span style={{ fontSize: 19, fontWeight: 800, color: C.text }}>${pr}</span>
                      <span style={{ fontSize: 11, color: C.textDim }}>/ month</span>
                    </div>
                    <p style={{ color: C.textMid, fontSize: 11, lineHeight: 1.5 }}>Lorem ipsum dolor sit amet</p>
                  </div>
                );
              })}
              {feats.map((feat, i) => (
                <>
                  <div key={`f${i}`} style={{ padding: "12px 0", borderTop: "1px solid #E5E7EB", fontSize: 13, color: C.text, fontWeight: 500 }}>{feat}</div>
                  {["individual","business","enterprise"].map(pid => (
                    <div key={`${pid}${i}`} style={{ padding: "12px 16px", borderTop: "1px solid #E5E7EB", borderLeft: "1px solid #E5E7EB", textAlign: "center", fontSize: 12, color: C.textMid }}>
                      {fMatrix[pid][i] === "✓"
                        ? <div style={{ display: "flex", justifyContent: "center" }}><div style={{ width: 15, height: 15, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={8} color={C.green} strokeWidth={3} /></div></div>
                        : <span style={{ color: C.blueL, fontWeight: 600, fontSize: 11 }}>{fMatrix[pid][i]}</span>
                      }
                    </div>
                  ))}
                </>
              ))}
              <div style={{ padding: "20px 0 0", borderTop: "1px solid #E5E7EB" }} />
              {["individual","business","enterprise"].map(pid => {
                const pl = pricingPlans.find(p => p.id === pid);
                return (
                  <div key={`cta${pid}`} style={{ padding: "20px 16px 0", borderTop: "1px solid #E5E7EB", borderLeft: "1px solid #E5E7EB", textAlign: "center" }}>
                    {pl.current
                      ? <button style={{ padding: "7px 18px", borderRadius: 7, border: "1.5px solid #D1D5DB", background: "transparent", color: "#374151", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>Current Plan</button>
                      : <button style={{ padding: "7px 18px", borderRadius: 7, border: "none", background: C.blueL, color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>Upgrade</button>
                    }
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#111827", color: "#fff", padding: "44px 40px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 28, marginBottom: 36 }}>
            <div>
              <div style={{ color: "#9CA3AF", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 14 }}>CONTACT US</div>
              <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                <input placeholder="Enter Email" style={{ flex: 1, background: "#1F2937", border: "1px solid #374151", borderRadius: 6, padding: "7px 10px", color: "#fff", fontSize: 12, fontFamily: "inherit", outline: "none" }} />
                <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "7px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>Search</button>
              </div>
              <p style={{ color: "#6B7280", fontSize: 11.5, lineHeight: 1.7 }}>10:00 AM - 6:00 PM (EST/EDT), Monday - Friday<br/>USA, 25 ayo idiaghe Street Suite 2475 Boston, MA 02199</p>
              <div style={{ color: "#9CA3AF", fontSize: 12, marginTop: 10 }}>✉ Mail@example.com</div>
              <div style={{ color: "#9CA3AF", fontSize: 12, marginTop: 4 }}>🇳🇬 Nigeria · +2348069035122</div>
            </div>
            {[
              { t:"COMPANY", ls:["About Us","Legal Info","Privacy Policy","Cookie Settings","Security Info","Contact Us"] },
              { t:"FEATURES", ls:["Pricing","Success Stories","Stats and Facts","Data Studies","News","Custom Report"] },
              { t:"TOOLS",    ls:["Keyword research","Domain analysis","On page analysis","backlinks"] },
            ].map(({ t, ls }) => (
              <div key={t}>
                <div style={{ color: "#9CA3AF", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 14 }}>{t}</div>
                {ls.map(l => <div key={l} style={{ color: "#6B7280", fontSize: 13, marginBottom: 9, cursor: "pointer" }}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #1F2937", paddingTop: 20, display: "flex", justifyContent: "flex-end" }}>
            <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "9px 20px", borderRadius: 7, fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>Get Started</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Screen Map ────────────────────────────────────────────────────────
// ── Content Lab ───────────────────────────────────────────────────────
function ContentLab() {
  const [score, setScore] = useState(72);
  const [tab, setTab] = useState("editor");
  const [content, setContent] = useState("Start writing your SEO-optimized content here. The AI Copilot will analyze your text in real time and suggest improvements.\n\nAdd your target keyword, adjust tone, and watch your SEO score improve as you write.");

  const suggestions = [
    { type: "keyword", msg: "Add 'dental implants cost' — missing from intro", icon: Target, c: C.orange },
    { type: "heading", msg: "Add H2 heading after paragraph 2 for structure", icon: AlignLeft, c: C.blueL },
    { type: "link", msg: "Add internal link to /dental-services page", icon: Link2, c: C.green },
    { type: "readability", msg: "Sentence too long — split at 'and'", icon: Edit2, c: C.yellow },
    { type: "meta", msg: "Meta description missing — click to generate", icon: FileText, c: C.purple },
  ];

  return (
    <div className="fade" style={{ display: "flex", height: "calc(100vh - 57px)", overflow: "hidden" }}>
      {/* Left: Editor */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Toolbar */}
        <div style={{ padding: "10px 20px", borderBottom: `1px solid ${C.border}`, background: C.white, display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 3, background: C.bg, padding: 3, borderRadius: 8, border: `1px solid ${C.border}` }}>
            {["Editor","Outline","SERP Preview","Brief"].map((t,i) => (
              <button key={t} onClick={() => setTab(t.toLowerCase())} style={{ padding: "5px 12px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit", background: tab===t.toLowerCase()||( tab==="editor"&&i===0)?C.blueL:"transparent", color: tab===t.toLowerCase()||(tab==="editor"&&i===0)?"#fff":C.textDim }}>{t}</button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", background: C.bgLight, borderRadius: 8 }}>
            <Target size={13} color={C.blueL} />
            <span style={{ color: C.textDim, fontSize: 12 }}>Target:</span>
            <input defaultValue="dental implants near me" style={{ background: "transparent", border: "none", outline: "none", color: C.blueL, fontSize: 12, fontWeight: 600, width: 160, fontFamily: "inherit" }} />
          </div>
          <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}>
            <Sparkles size={13} /> AI Generate
          </button>
          <button style={{ background: C.green, color: "#fff", border: "none", cursor: "pointer", padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}>
            <Download size={13} /> Export
          </button>
        </div>

        {/* Title input */}
        <div style={{ padding: "16px 28px 0", background: C.white, flexShrink: 0 }}>
          <input defaultValue="The Complete Guide to Dental Implants: Costs, Benefits & What to Expect" style={{ width: "100%", border: "none", outline: "none", fontSize: 22, fontWeight: 800, color: C.text, fontFamily: "Space Grotesk, sans-serif" }} placeholder="Article title..." />
          <div style={{ display: "flex", gap: 16, marginTop: 8, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}>
            {[{l:"Words",v:"847"},{l:"Read time",v:"4 min"},{l:"Paragraphs",v:"12"},{l:"Headings",v:"6"}].map(({l,v}) => (
              <span key={l} style={{ color: C.textDim, fontSize: 11 }}><span style={{ color: C.text, fontWeight: 700 }}>{v}</span> {l}</span>
            ))}
          </div>
        </div>

        {/* Editor area */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          <textarea value={content} onChange={e => { setContent(e.target.value); setScore(Math.min(98, score + 1)); }}
            style={{ width: "100%", height: "100%", padding: "20px 28px", border: "none", outline: "none", resize: "none", fontSize: 14, lineHeight: 1.8, color: C.text, fontFamily: "inherit", background: C.white }} />
        </div>

        {/* Bottom bar */}
        <div style={{ padding: "8px 20px", borderTop: `1px solid ${C.border}`, background: C.white, display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          {[["B","bold"],["I","italic"],["U","underline"],["H1","h1"],["H2","h2"],["Link","link"]].map(([l]) => (
            <button key={l} style={{ padding: "3px 8px", borderRadius: 5, border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", fontSize: 12, fontWeight: 700, color: C.textMid, fontFamily: "inherit" }}>{l}</button>
          ))}
          <div style={{ flex: 1 }} />
          <span style={{ color: C.green, fontSize: 12, fontWeight: 600 }}>✓ Auto-saved</span>
        </div>
      </div>

      {/* Right: SEO Score + Suggestions */}
      <div style={{ width: 300, background: C.white, borderLeft: `1px solid ${C.border}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* Score */}
        <div style={{ padding: "18px 18px 14px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div className="sg" style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>SEO Score</div>
            <span className="chip" style={{ color: C.green, background: C.greenL, fontSize: 10 }}>Live</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
            <ScoreRing score={score} size={60} />
            <div>
              <div style={{ color: C.text, fontSize: 22, fontWeight: 800 }}>{score}/100</div>
              <div style={{ color: C.green, fontSize: 11, fontWeight: 600 }}>↑ Good — keep writing</div>
            </div>
          </div>
          <ProgBar v={score} col={score > 75 ? C.green : score > 50 ? C.yellow : C.red} h={6} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
            {[{l:"Keyword density",v:"2.1%",ok:true},{l:"Readability",v:"Grade 9",ok:true},{l:"Word count",v:"847",ok:false},{l:"Internal links",v:"0",ok:false}].map(({l,v,ok}) => (
              <div key={l} style={{ padding: "7px 9px", background: ok?C.greenL:C.redL, borderRadius: 7 }}>
                <div style={{ color: ok?C.green:C.red, fontSize: 9.5, fontWeight: 700 }}>{ok?"✓":"✗"} {l}</div>
                <div style={{ color: C.text, fontSize: 12, fontWeight: 700, marginTop: 1 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestions */}
        <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
          <div className="sg" style={{ color: C.text, fontSize: 13, fontWeight: 700, marginBottom: 10 }}>AI Suggestions</div>
          {suggestions.map(({ type, msg, icon: Icon, c }, i) => (
            <div key={i} style={{ display: "flex", gap: 9, padding: "10px 10px", background: C.bg, borderRadius: 9, marginBottom: 7, border: `1px solid ${C.border}`, cursor: "pointer" }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: `${c}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={12} color={c} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: C.textMid, fontSize: 11.5, lineHeight: 1.5 }}>{msg}</p>
              </div>
              <button style={{ background: `${c}18`, border: "none", cursor: "pointer", padding: "3px 8px", borderRadius: 5, fontSize: 10, fontWeight: 700, color: c, fontFamily: "inherit", flexShrink: 0 }}>Fix</button>
            </div>
          ))}
        </div>

        {/* Keyword density */}
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}` }}>
          <div className="sg" style={{ color: C.text, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Keyword Density</div>
          {[{kw:"dental implants",count:8,target:10},{ kw:"near me",count:3,target:5},{kw:"cost",count:2,target:4},{kw:"procedure",count:5,target:6}].map(({kw,count,target}) => (
            <div key={kw} style={{ marginBottom: 7 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ color: C.textMid, fontSize: 11 }}>{kw}</span>
                <span style={{ color: C.text, fontSize: 11, fontWeight: 700 }}>{count}/{target}</span>
              </div>
              <ProgBar v={(count/target)*100} col={count>=target?C.green:C.blueL} h={4} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Reports & Insights ────────────────────────────────────────────────
function Reports() {
  const [reportTab, setReportTab] = useState("seo");
  const reportTabs = ["SEO Report","Audit Report","Content Performance","Client Summary"];
  const clientReports = [
    {client:"Dental Pro Clinic",date:"May 1, 2026",type:"Monthly SEO",status:"ready",score:84},
    {client:"TechFlow Agency",date:"Apr 30, 2026",type:"Audit Report",status:"ready",score:71},
    {client:"GreenLeaf Studios",date:"Apr 28, 2026",type:"Content Perf.",status:"draft",score:55},
    {client:"Urban Eats Brand",date:"Apr 25, 2026",type:"Monthly SEO",status:"sent",score:100},
    {client:"Nexus Consulting",date:"Apr 20, 2026",type:"Client Summary",status:"ready",score:62},
    {client:"Bright Media Co.",date:"Apr 18, 2026",type:"Monthly SEO",status:"sent",score:88},
  ];
  return (
    <div className="fade" style={{ overflowY: "auto", height: "calc(100vh - 57px)" }}>
      <div style={{ padding: "20px 24px" }}>
        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 22 }}>
          {[
            {l:"Reports Generated",v:"48",c:C.blueL,icon:FileText},
            {l:"Reports Sent",v:"32",c:C.green,icon:Share2},
            {l:"Avg. Client Score",v:"76/100",c:C.orange,icon:BarChart2},
            {l:"Pending Reports",v:"6",c:C.yellow,icon:Clock},
          ].map(({l,v,c,icon:Icon}) => (
            <div key={l} className="card ch" style={{padding:"16px 18px"}}>
              <div style={{width:32,height:32,borderRadius:8,background:`${c}18`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}><Icon size={14} color={c}/></div>
              <div className="sg" style={{color:C.text,fontSize:22,fontWeight:800}}>{v}</div>
              <div style={{color:C.textDim,fontSize:11,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Report tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
          {reportTabs.map((t,i) => (
            <button key={t} onClick={() => setReportTab(t.toLowerCase())} style={{ padding: "7px 16px", borderRadius: 8, border: `1px solid ${reportTab===t.toLowerCase()||i===0&&reportTab==="seo"?C.blueL:C.border}`, cursor: "pointer", fontSize: 12.5, fontWeight: 600, fontFamily: "inherit", background: reportTab===t.toLowerCase()||(i===0&&reportTab==="seo")?C.bluePale:"transparent", color: reportTab===t.toLowerCase()||(i===0&&reportTab==="seo")?C.blueL:C.textMid }}>{t}</button>
          ))}
          <div style={{flex:1}}/>
          <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"7px 16px",borderRadius:8,fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:6,fontFamily:"inherit"}}><Plus size={13}/> New Report</button>
        </div>

        {/* Report preview area */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
          {/* Report preview */}
          <div className="card" style={{ padding: "24px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <div className="sg" style={{ color: C.text, fontSize: 16, fontWeight: 800 }}>Monthly SEO Report</div>
                <div style={{ color: C.textDim, fontSize: 12, marginTop: 2 }}>Dental Pro Clinic · May 2026</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}><Eye size={12}/> Preview</button>
                <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}><Download size={12}/> Download PDF</button>
                <button style={{ background: C.orange, color: "#fff", border: "none", cursor: "pointer", padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}><Send size={12}/> Send to Client</button>
              </div>
            </div>

            {/* Report content */}
            <div style={{ background: C.bg, borderRadius: 12, padding: "20px 22px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: `linear-gradient(135deg,${C.orange},${C.blueL})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Zap size={20} color="#fff" fill="#fff" />
                </div>
                <div>
                  <div className="sg" style={{ color: C.text, fontSize: 14, fontWeight: 700 }}>Boostly SEO Report</div>
                  <div style={{ color: C.textDim, fontSize: 11 }}>Generated for Dental Pro Clinic · May 1, 2026</div>
                </div>
                <ScoreRing score={84} size={50} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                {[["Organic Traffic","↑ 23%",C.green],["Ranked Keywords","↑ 12",C.blueL],["Backlinks","↑ 47",C.orange],["Avg Position","↑ 4.2",C.green]].map(([l,v,c]) => (
                  <div key={l} style={{ background: C.white, borderRadius: 8, padding: "10px 12px", border: `1px solid ${C.border}` }}>
                    <div style={{ color: C.textDim, fontSize: 10.5 }}>{l}</div>
                    <div style={{ color: c, fontSize: 14, fontWeight: 800, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={trafficData} margin={{top:0,right:0,left:-22,bottom:0}}>
                <defs>
                  <linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.blueL} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={C.blueL} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
                <XAxis dataKey="m" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
                <Area type="monotone" dataKey="organic" stroke={C.blueL} fill="url(#rg1)" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Report list */}
          <div className="card" style={{ overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}` }}>
              <div className="sg" style={{ color: C.text, fontSize: 14, fontWeight: 700 }}>All Reports</div>
            </div>
            {clientReports.map(({client,date,type,status,score},i) => (
              <div key={i} className="td" style={{ padding: "12px 18px", borderBottom: i<clientReports.length-1?`1px solid ${C.border}`:"none", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Av l={client[0]} size={30} />
                  <div style={{ flex: 1 }}>
                    <div style={{ color: C.text, fontSize: 12.5, fontWeight: 600 }}>{client}</div>
                    <div style={{ color: C.textDim, fontSize: 10.5 }}>{type} · {date}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="chip" style={{ color: status==="sent"?C.green:status==="ready"?C.blueL:C.yellow, background: status==="sent"?C.greenL:status==="ready"?C.bluePale:C.yellowL }}>
                      {status.toUpperCase()}
                    </span>
                    <span style={{ color: score>75?C.green:score>50?C.yellow:C.red, fontWeight: 800, fontSize: 12 }}>{score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Local SEO ─────────────────────────────────────────────────────────
function LocalSEO() {
  const locations = [
    {name:"Dental Pro Clinic",addr:"123 Main St, Atlanta GA",rating:4.8,reviews:124,status:"verified",updated:"2h ago"},
    {name:"TechFlow HQ",addr:"456 Tech Blvd, Austin TX",rating:4.2,reviews:67,status:"verified",updated:"1d ago"},
    {name:"GreenLeaf Studio",addr:"789 Park Ave, NYC",rating:3.9,reviews:43,status:"pending",updated:"3d ago"},
  ];
  const reviewsList = [
    {author:"Sarah M.",rating:5,text:"Absolutely amazing service! Highly recommended.",time:"2 days ago",platform:"Google",replied:false},
    {author:"Mark R.",rating:4,text:"Great experience overall. Quick and professional.",time:"5 days ago",platform:"Google",replied:true},
    {author:"James K.",rating:2,text:"Had some issues with scheduling but team was helpful.",time:"1 week ago",platform:"Yelp",replied:false},
    {author:"Anna L.",rating:5,text:"Best dental clinic in Atlanta. Will come back!",time:"2 weeks ago",platform:"Google",replied:true},
  ];
  return (
    <div className="fade" style={{ overflowY: "auto", height: "calc(100vh - 57px)", padding: "20px 24px" }}>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 22 }}>
        {[
          {l:"GMB Locations",v:"3",c:C.blueL,icon:Globe},
          {l:"Avg Star Rating",v:"4.3 ★",c:C.yellow,icon:Star},
          {l:"Total Reviews",v:"234",c:C.green,icon:Users},
          {l:"Pending Replies",v:"8",c:C.orange,icon:MessageSquare},
        ].map(({l,v,c,icon:Icon}) => (
          <div key={l} className="card ch" style={{padding:"16px 18px"}}>
            <div style={{width:32,height:32,borderRadius:8,background:`${c}18`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}><Icon size={14} color={c}/></div>
            <div className="sg" style={{color:C.text,fontSize:22,fontWeight:800}}>{v}</div>
            <div style={{color:C.textDim,fontSize:11,marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* GMB Locations */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="sg" style={{ color: C.text, fontSize: 14, fontWeight: 700 }}>Google My Business</div>
            <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "6px 12px", borderRadius: 7, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}><Plus size={12}/> Add Location</button>
          </div>
          {locations.map(({name,addr,rating,reviews,status,updated},i) => (
            <div key={i} className="td" style={{ padding: "14px 18px", borderBottom: i<locations.length-1?`1px solid ${C.border}`:"none" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: C.bgLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Globe size={15} color={C.blueL} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <div style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>{name}</div>
                    <span className="chip" style={{ color: status==="verified"?C.green:C.yellow, background: status==="verified"?C.greenL:C.yellowL }}>{status}</span>
                  </div>
                  <div style={{ color: C.textDim, fontSize: 11.5, marginBottom: 4 }}>{addr}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ color: C.yellow, fontSize: 12, fontWeight: 700 }}>★ {rating}</span>
                    <span style={{ color: C.textDim, fontSize: 11 }}>{reviews} reviews</span>
                    <span style={{ color: C.textDim, fontSize: 11 }}>Updated {updated}</span>
                  </div>
                </div>
                <button style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", padding: "5px 10px", borderRadius: 7, fontSize: 11, fontFamily: "inherit" }}>Optimize</button>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="sg" style={{ color: C.text, fontSize: 14, fontWeight: 700 }}>Recent Reviews</div>
            <div style={{ display: "flex", gap: 5 }}>
              {["All","Google","Yelp"].map((t,i) => (
                <button key={t} style={{ padding: "4px 10px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: "inherit", background: i===0?C.blueL:"transparent", color: i===0?"#fff":C.textDim }}>{t}</button>
              ))}
            </div>
          </div>
          {reviewsList.map(({author,rating,text,time,platform,replied},i) => (
            <div key={i} className="td" style={{ padding: "13px 18px", borderBottom: i<reviewsList.length-1?`1px solid ${C.border}`:"none" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <Av l={author[0]} size={30} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span style={{ color: C.text, fontSize: 12.5, fontWeight: 700 }}>{author}</span>
                    <span style={{ color: C.yellow, fontSize: 11 }}>{"★".repeat(rating)}{"☆".repeat(5-rating)}</span>
                    <span className="chip" style={{ color: platform==="Google"?C.blueL:C.orange, background: platform==="Google"?C.bluePale:C.orangeL }}>{platform}</span>
                    <span style={{ color: C.textDim, fontSize: 10.5 }}>{time}</span>
                  </div>
                  <p style={{ color: C.textMid, fontSize: 12, lineHeight: 1.5, marginBottom: 6 }}>{text}</p>
                  {!replied
                    ? <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "5px 12px", borderRadius: 7, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit" }}>
                        <Bot size={10} /> AI Reply
                      </button>
                    : <span style={{ color: C.green, fontSize: 11, fontWeight: 600 }}>✓ Replied</span>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Team Members ──────────────────────────────────────────────────────
function TeamMembers() {
  const team = [
    {name:"Mahmoud Al-Rashid",role:"Admin · Owner",email:"mahmoud@seoengineboost.com",status:"active",tasks:12,projects:8,joined:"Sep 2024",avatar:"M",permissions:"Full Access"},
    {name:"Aisha Santos",role:"SEO Lead",email:"aisha@seoengineboost.com",status:"active",tasks:18,projects:6,joined:"Oct 2024",avatar:"A",permissions:"Editor"},
    {name:"Sam Dela Cruz",role:"Content Writer",email:"sam@seoengineboost.com",status:"active",tasks:9,projects:4,joined:"Nov 2024",avatar:"S",permissions:"Writer"},
    {name:"Jordan Reyes",role:"UI/UX Designer",email:"jordan@seoengineboost.com",status:"away",tasks:5,projects:3,joined:"Jan 2025",avatar:"J",permissions:"Viewer"},
    {name:"Alex Tan",role:"Developer",email:"alex@seoengineboost.com",status:"active",tasks:14,projects:5,joined:"Feb 2025",avatar:"X",permissions:"Editor"},
    {name:"Maria Chen",role:"Account Manager",email:"maria@seoengineboost.com",status:"offline",tasks:7,projects:6,joined:"Mar 2025",avatar:"C",permissions:"Editor"},
  ];
  const roles = [
    {role:"Admin",desc:"Full access — manage billing, team, all data",count:1,c:C.red},
    {role:"Editor",desc:"Create, edit, and publish content and reports",count:3,c:C.blueL},
    {role:"Writer",desc:"Write and submit content for review",count:1,c:C.green},
    {role:"Viewer",desc:"Read-only access to reports and dashboards",count:1,c:C.textDim},
  ];
  return (
    <div className="fade" style={{ overflowY: "auto", height: "calc(100vh - 57px)", padding: "20px 24px" }}>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 22 }}>
        {[{l:"Team Members",v:"6",c:C.blueL,icon:Users},{l:"Active Now",v:"4",c:C.green,icon:Activity},{l:"Tasks Assigned",v:"65",c:C.orange,icon:CheckSquare},{l:"Avg Productivity",v:"87%",c:C.purple,icon:TrendingUp}].map(({l,v,c,icon:Icon}) => (
          <div key={l} className="card ch" style={{padding:"16px 18px"}}>
            <div style={{width:32,height:32,borderRadius:8,background:`${c}18`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}><Icon size={14} color={c}/></div>
            <div className="sg" style={{color:C.text,fontSize:22,fontWeight:800}}>{v}</div>
            <div style={{color:C.textDim,fontSize:11,marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16 }}>
        {/* Members table */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="sg" style={{ color: C.text, fontSize: 14, fontWeight: 700 }}>All Members</div>
            <div style={{ display: "flex", gap: 7 }}>
              <button style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", display: "flex", gap: 5, padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}><Filter size={12}/> Filter</button>
              <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", display: "flex", gap: 5, padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}><UserPlus size={13}/> Invite Member</button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr .8fr .8fr .8fr 90px", padding: "9px 20px", background: C.bg, borderBottom: `1px solid ${C.border}` }}>
            {["Member","Role","Tasks","Projects","Status","Actions"].map(h => <div key={h} style={{ color: C.textDim, fontSize: 10.5, fontWeight: 700, letterSpacing: .4 }}>{h.toUpperCase()}</div>)}
          </div>
          {team.map(({name,role,email,status,tasks,projects,joined,avatar,permissions},i) => (
            <div key={name} className="td" style={{ display: "grid", gridTemplateColumns: "2fr 1fr .8fr .8fr .8fr 90px", padding: "12px 20px", borderBottom: i<team.length-1?`1px solid ${C.border}`:"none", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ position: "relative" }}>
                  <Av l={avatar} size={34} />
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: status==="active"?C.green:status==="away"?C.yellow:C.textDim, position: "absolute", bottom: 0, right: 0, border: "1.5px solid #fff" }} />
                </div>
                <div>
                  <div style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>{name}</div>
                  <div style={{ color: C.textDim, fontSize: 10.5 }}>{email}</div>
                </div>
              </div>
              <div>
                <div style={{ color: C.text, fontSize: 12.5, fontWeight: 600 }}>{role.split("·")[0].trim()}</div>
                <span className="chip" style={{ color: permissions==="Full Access"?C.red:permissions==="Editor"?C.blueL:permissions==="Writer"?C.green:C.textDim, background: permissions==="Full Access"?C.redL:permissions==="Editor"?C.bluePale:permissions==="Writer"?C.greenL:"#F1F5F9", fontSize: 9 }}>{permissions}</span>
              </div>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>{tasks}</div>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>{projects}</div>
              <div>
                <span className="chip" style={{ color: status==="active"?C.green:status==="away"?C.yellow:C.textDim, background: status==="active"?C.greenL:status==="away"?C.yellowL:"#F1F5F9" }}>
                  {status.charAt(0).toUpperCase()+status.slice(1)}
                </span>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {[Edit2,MessageSquare,ExternalLink].map((Icon,j) => (
                  <button key={j} style={{ background: "transparent", border: `1px solid ${C.border}`, cursor: "pointer", width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={11} color={C.textDim} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Roles + Permissions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="card" style={{ padding: "16px 18px" }}>
            <div className="sg" style={{ color: C.text, fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Roles & Permissions</div>
            {roles.map(({role,desc,count,c}) => (
              <div key={role} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: `${c}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Shield size={12} color={c} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <span style={{ color: C.text, fontSize: 12.5, fontWeight: 700 }}>{role}</span>
                    <span className="chip" style={{ color: c, background: `${c}18` }}>{count}</span>
                  </div>
                  <div style={{ color: C.textDim, fontSize: 11, lineHeight: 1.4 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: "16px 18px" }}>
            <div className="sg" style={{ color: C.text, fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Pending Invites</div>
            {[{email:"tom@agency.com",role:"Editor"},{email:"lisa@freelance.io",role:"Writer"}].map(({email,role}) => (
              <div key={email} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <UserPlus size={12} color={C.textDim} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: C.text, fontSize: 12, fontWeight: 600 }}>{email}</div>
                  <div style={{ color: C.textDim, fontSize: 10.5 }}>{role} · Pending</div>
                </div>
                <button style={{ background: "transparent", border: "none", cursor: "pointer" }}><X size={13} color={C.textDim}/></button>
              </div>
            ))}
            <button style={{ width: "100%", marginTop: 10, background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "8px 0", borderRadius: 8, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit" }}>
              <UserPlus size={13} /> Invite New Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── AI Copilot Floating Panel ─────────────────────────────────────────
function AICopilot({ onClose }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm your SEO Copilot. Ask me anything — strategy, audits, keyword ideas, or what to do next." },
    { role: "user", text: "Why did my traffic drop last week?" },
    { role: "ai", text: "Based on your data, I see 3 possible causes: 1) Google algorithm update on Apr 29 affected dental keywords, 2) Page speed dropped to 3.2s on mobile, 3) 2 high-authority backlinks were removed. I'd recommend running a full audit. Want me to do that now?" },
  ]);
  const suggestions = ["What keywords should I target?","Generate a blog outline","Why did traffic drop?","Fix my top audit issues","Create monthly report"];

  const send = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { role: "user", text: input }, { role: "ai", text: `Analyzing your question about "${input}"... Based on your site data, here are my top recommendations for your SEO strategy.` }]);
    setInput("");
  };

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, width: 380, height: 540, background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,0.18)", display: "flex", flexDirection: "column", zIndex: 999 }}>
      {/* Header */}
      <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10, background: `linear-gradient(135deg,${C.blue},${C.blueL})`, borderRadius: "16px 16px 0 0" }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Bot size={16} color="#fff" />
        </div>
        <div>
          <div className="sg" style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>AI SEO Copilot</div>
          <div style={{ color: "rgba(255,255,255,.7)", fontSize: 10.5 }}>Powered by Boostly AI · Always on</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <span style={{ color: "rgba(255,255,255,.7)", fontSize: 10, background: "rgba(255,255,255,.15)", padding: "2px 7px", borderRadius: 10, fontWeight: 600 }}>LIVE</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={15} color="rgba(255,255,255,.7)" /></button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px" }}>
        {messages.map(({ role, text }, i) => (
          <div key={i} style={{ display: "flex", flexDirection: role==="user"?"row-reverse":"row", gap: 8, marginBottom: 12 }}>
            {role==="ai" && (
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(135deg,${C.blue},${C.blueL})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                <Bot size={12} color="#fff" />
              </div>
            )}
            <div style={{ maxWidth: "80%", padding: "9px 12px", borderRadius: role==="user"?"12px 12px 3px 12px":"3px 12px 12px 12px", background: role==="user"?C.blueL:C.bg, color: role==="user"?"#fff":C.text, fontSize: 12.5, lineHeight: 1.5, border: role==="ai"?`1px solid ${C.border}`:"none" }}>
              {text}
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div style={{ padding: "8px 14px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", gap: 5, overflowX: "auto", paddingBottom: 6 }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => setInput(s)} style={{ background: C.bluePale, border: "none", color: C.blueL, cursor: "pointer", padding: "4px 10px", borderRadius: 20, fontSize: 10.5, fontWeight: 600, whiteSpace: "nowrap", fontFamily: "inherit" }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div style={{ padding: "8px 14px 14px" }}>
        <div style={{ display: "flex", gap: 6, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "6px 10px" }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter"&&send()} placeholder="Ask anything about your SEO..." style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 12.5, color: C.text, fontFamily: "inherit" }} />
          <button onClick={send} style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "6px 10px", borderRadius: 7, display: "flex", alignItems: "center" }}>
            <Send size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Updated Sidebar with all nav items ────────────────────────────────
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
    { id:"competitive",         icon:Globe,           label:"Competitive Research", subs:[{id:"domain-overview",l:"Domain Overview"},{id:"keyword-gap",l:"Keyword Gap"}] },
    { id:"competitoranalyzer",  icon:Target,          label:"Competitor Analyzer" },
    { id:"keyword",             icon:Search,          label:"Keyword Research" },
    { id:"advancedkeywords",    icon:TrendingUp,      label:"Advanced Keywords", badge:"PRO" },
    { id:"keywordsperformance", icon:BarChart2,        label:"Keywords Performance" },
    { id:"backlink",            icon:Link2,           label:"Backlink Research" },
    { id:"rank",                icon:BarChart2,       label:"Rank Tracking" },
    { id:"ranktracker",         icon:Activity,        label:"Domain Tracker" },
    { id:"trafficanalytics",    icon:BarChart,        label:"Traffic Analytics" },
    { id:"localseo",            icon:Globe,           label:"Local SEO" },
  ];
  const contentNav = [
    { id:"contentlab",   icon:Edit2,      label:"Content Lab", badge:"AI" },
    { id:"seoassistant", icon:Bot,        label:"SEO Assistant", badge:"AI" },
    { id:"reports",      icon:BarChart2,  label:"Reports & Insights" },
    { id:"calendar",     icon:Calendar,   label:"Campaign Planner" },
  ];
  const teamNav = [
    { id:"messages",  icon:MessageSquare, label:"Messages", badge:17 },
    { id:"tasks",     icon:CheckSquare,   label:"Project Tasks" },
    { id:"clients",   icon:Briefcase,     label:"Clients" },
    { id:"team",      icon:Users,         label:"Team Members" },
    { id:"dashboard", icon:BarChart2,     label:"Analytics" },
  ];
  const adminNav = [
    { id:"admin",             icon:Shield,         label:"Admin Dashboard" },
    { id:"usermanagement",    icon:Users,          label:"User Management" },
    { id:"paymentlogs",       icon:BarChart,       label:"Payment Logs" },
    { id:"nlpanalytics",      icon:Activity,       label:"NLP Analytics" },
    { id:"pushnotifications", icon:Bell,           label:"Push Notifications" },
  ];

  const NavItem = ({ id, icon: Icon, label, badge, subs }) => (
    <div>
      <div className={`nav${active===id&&!sub?" on":""}`} onClick={() => { setActive(id); if(!subs) setSub(null); }}>
        <Icon size={14} />
        <span style={{ flex: 1 }}>{label}</span>
        {badge && typeof badge === "number"
          ? <span style={{ background: C.orange, color: "#fff", fontSize: 9, fontWeight: 700, width: 17, height: 17, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{badge}</span>
          : badge && <span className="chip" style={{ color: C.blueL, background: C.bluePale, fontSize: 9 }}>{badge}</span>
        }
        {subs && <ChevronDown size={10} color={C.textDim} style={{ transform: active===id?"rotate(180deg)":"none", transition: "transform .2s" }} />}
      </div>
      {subs && active===id && subs.map(s => (
        <div key={s.id} className={`nsub${sub===s.id?" on":""}`} onClick={() => setSub(s.id)}>{s.l}</div>
      ))}
    </div>
  );

  return (
    <div style={{ width: 214, background: C.white, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0, flexShrink: 0, overflowY: "auto" }}>
      {/* Logo */}
      <div style={{ padding: "14px 14px 12px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg,${C.orange},${C.blueL})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 10px rgba(249,115,22,0.3)" }}>
            <Zap size={17} color="#fff" fill="#fff" />
          </div>
          <div>
            <div className="sg" style={{ color: C.text, fontWeight: 800, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }}>Boostly</div>
            <div style={{ color: C.textDim, fontSize: 9, letterSpacing: ".8px", fontWeight: 700 }}>SEO · MARKETING · AI</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 9px", background: C.bgLight, borderRadius: 7, border: `1px solid ${C.bluePale}`, cursor: "pointer" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} className="pls" />
          <span style={{ color: C.blue, fontSize: 11, fontWeight: 600, flex: 1 }}>Marketing Workspace</span>
          <ChevronDown size={10} color={C.textDim} />
        </div>
      </div>

      <div style={{ padding: "10px 8px", flex: 1 }}>
        {/* AI Copilot button */}
        <button onClick={() => setOpenAI(!openAI)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "9px 12px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, marginBottom: 12, fontFamily: "inherit", background: openAI?`linear-gradient(135deg,${C.blue},${C.blueL})`:`linear-gradient(135deg,${C.bgLight},${C.bluePale})`, color: openAI?"#fff":C.blue }}>
          <Bot size={15} />
          <span style={{ flex: 1 }}>AI SEO Copilot</span>
          <span className="chip" style={{ background: openAI?"rgba(255,255,255,.2)":C.blueL, color: openAI?"#fff":"#fff", fontSize: 9 }}>LIVE</span>
        </button>

        <div style={{ color: C.textDim, fontSize: 9.5, fontWeight: 700, letterSpacing: 1.2, padding: "0 8px", marginBottom: 4 }}>SEO TOOLS</div>
        {seoNav.map(item => <NavItem key={item.id} {...item} />)}

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8, marginTop: 8 }}>
          <div style={{ color: C.textDim, fontSize: 9.5, fontWeight: 700, letterSpacing: 1.2, padding: "0 8px", marginBottom: 4 }}>CONTENT & AI</div>
          {contentNav.map(item => <NavItem key={item.id} {...item} />)}
        </div>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8, marginTop: 8 }}>
          <div style={{ color: C.textDim, fontSize: 9.5, fontWeight: 700, letterSpacing: 1.2, padding: "0 8px", marginBottom: 4 }}>TEAM & CLIENTS</div>
          {teamNav.map(item => <NavItem key={item.id} {...item} />)}
        </div>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8, marginTop: 8 }}>
          <div style={{ color: C.textDim, fontSize: 9.5, fontWeight: 700, letterSpacing: 1.2, padding: "0 8px", marginBottom: 4 }}>ADMIN</div>
          {adminNav.map(item => <NavItem key={item.id} {...item} />)}
        </div>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8, marginTop: 8 }}>
          <div className="nav" onClick={() => setActive("settings")} style={{ color: active==="settings"?C.blueL:C.textDim }}>
            <Settings size={14} /> Settings
          </div>
          <div className="nav" style={{ color: C.textDim }}>
            <HelpCircle size={14} /> Help & Docs
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.border}`, padding: "10px 10px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 8px", background: C.bg, borderRadius: 9, cursor: "pointer" }}>
          <Av l="Y" size={28} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: C.text, fontSize: 12, fontWeight: 700 }}>Your Account</div>
            <div style={{ color: C.textDim, fontSize: 10 }}>Admin · Pro Plan</div>
          </div>
          <ChevronDown size={11} color={C.textDim} />
        </div>
      </div>
    </div>
  );
}

// ── SEO Task Management ───────────────────────────────────────────────
function SEOTaskManagement() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Open");
  const [category, setCategory] = useState("All Categories");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);
  const [statusOpen, setStatusOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const allTasks = [
    {id:1,cat:"On-Page SEO",title:"Add a Meta Description Tag",desc:"Your page appears to be missing a Meta Description Tag.",url:"www.seoengineboost.com/author/moudy/",time:"30 minutes",status:"Open"},
    {id:2,cat:"On-Page SEO",title:"Add a Meta Description Tag",desc:"Your page appears to be missing a Meta Description Tag.",url:"www.seoengineboost.com/category/beginner-seo/",time:"30 minutes",status:"Open"},
    {id:3,cat:"On-Page SEO",title:"Add a Meta Description Tag",desc:"Your page appears to be missing a Meta Description Tag.",url:"www.seoengineboost.com/category/content-marketing-seo/",time:"30 minutes",status:"Open"},
    {id:4,cat:"On-Page SEO",title:"Increase length of Title Tag",desc:"You have a Title Tag, but ideally it should be between 50 and 60 characters in length (including spaces).",url:"www.seoengineboost.com/about-us/",time:"15 minutes",status:"Open"},
    {id:5,cat:"On-Page SEO",title:"Reduce length of Meta Description",desc:"Your page has a Meta Description Tag however, your Meta Description should ideally be between 120 and 160 characters (including spaces).",url:"www.seoengineboost.com/about-us/",time:"30 minutes",status:"Open"},
    {id:6,cat:"On-Page SEO",title:"Increase length of Title Tag",desc:"You have a Title Tag, but ideally it should be between 50 and 60 characters in length (including spaces).",url:"www.seoengineboost.com/best-backlinks-agency/",time:"15 minutes",status:"Completed"},
    {id:7,cat:"On-Page SEO",title:"Reduce length of Meta Description",desc:"Your page has a Meta Description Tag however, your Meta Description should ideally be between 120 and 160 characters (including spaces).",url:"www.seoengineboost.com/best-backlinks-agency/",time:"30 minutes",status:"Open"},
    {id:8,cat:"On-Page SEO",title:"Increase length of Title Tag",desc:"You have a Title Tag, but ideally it should be between 50 and 60 characters in length (including spaces).",url:"www.seoengineboost.com/blog/",time:"15 minutes",status:"Open"},
    {id:9,cat:"On-Page SEO",title:"Reduce length of Meta Description",desc:"Your page has a Meta Description Tag however, your Meta Description should ideally be between 120 and 160 characters (including spaces).",url:"www.seoengineboost.com/blog/",time:"30 minutes",status:"Open"},
    {id:10,cat:"On-Page SEO",title:"Increase length of Title Tag",desc:"You have a Title Tag, but ideally it should be between 50 and 60 characters.",url:"www.seoengineboost.com/content-marketing-services/",time:"15 minutes",status:"Open"},
    {id:11,cat:"On-Page SEO",title:"Reduce length of Meta Description",desc:"Your page has a Meta Description Tag however, your Meta Description should ideally be between 120 and 160 characters.",url:"www.seoengineboost.com/content-marketing-services/",time:"30 minutes",status:"Open"},
    {id:12,cat:"On-Page SEO",title:"Increase length of Title Tag",desc:"You have a Title Tag, but ideally it should be between 50 and 60 characters.",url:"www.seoengineboost.com/contact/",time:"15 minutes",status:"Open"},
    {id:13,cat:"Technical SEO",title:"Fix Broken Internal Links",desc:"Found 12 broken internal links that return 404 errors. These hurt user experience and SEO.",url:"www.seoengineboost.com/",time:"45 minutes",status:"Open"},
    {id:14,cat:"Technical SEO",title:"Improve Page Speed",desc:"Your page load time is 3.2 seconds on mobile. Aim for under 2 seconds for better rankings.",url:"www.seoengineboost.com/",time:"60 minutes",status:"Open"},
    {id:15,cat:"Content",title:"Add Missing Alt Text to Images",desc:"48 images are missing alt attributes. Alt text helps search engines understand image content.",url:"www.seoengineboost.com/",time:"45 minutes",status:"Open"},
  ];

  const [taskList, setTaskList] = useState(allTasks);

  const filtered = taskList.filter(t => {
    const ms = search===""||t.title.toLowerCase().includes(search.toLowerCase())||t.url.toLowerCase().includes(search.toLowerCase());
    const mst = status==="All Statuses"||t.status===status;
    const mc = category==="All Categories"||t.cat===category;
    return ms&&mst&&mc;
  });

  const perPage=6, totalPages=Math.ceil(filtered.length/perPage);
  const pageData=filtered.slice((page-1)*perPage,page*perPage);

  const completeTask=(id)=>{setTaskList(l=>l.map(t=>t.id===id?{...t,status:"Completed"}:t));setModal(null);};
  const deleteTask=(id)=>{setTaskList(l=>l.map(t=>t.id===id?{...t,status:"Deleted"}:t));setModal(null);};

  const TaskModal=({task})=>(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}} onClick={()=>setModal(null)}>
      <div style={{background:C.white,borderRadius:16,padding:"28px 32px",width:600,maxHeight:"88vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
          <h2 className="sg" style={{color:C.text,fontSize:18,fontWeight:800,flex:1,paddingRight:16}}>{task.title}</h2>
          <button onClick={()=>setModal(null)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={18} color={C.textDim}/></button>
        </div>
        <div style={{marginBottom:14}}>
          <div style={{color:C.text,fontSize:13,fontWeight:700,textDecoration:"underline",marginBottom:5}}>URL Affected</div>
          <span style={{color:C.blueL,fontSize:13}}>{task.url}</span>
        </div>
        <div style={{marginBottom:14}}>
          <div style={{color:C.text,fontSize:13,fontWeight:700,textDecoration:"underline",marginBottom:5}}>Issue Description</div>
          <p style={{color:C.textMid,fontSize:13,lineHeight:1.6,marginBottom:8}}>{task.desc}</p>
          {task.title.includes("Meta Description")&&(
            <div style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px",marginBottom:6}}>
              <p style={{color:C.textMid,fontSize:12,lineHeight:1.6,fontStyle:"italic"}}>Content Marketing Services SEO-Driven Content That Attracts, Engages, and Converts At SEO Engine Boost, we build strategic content marketing campaigns that do more than just "create content." We craft SEO-friendly stories, guides, blogs, and landing pages...</p>
              <div style={{color:C.textDim,fontSize:12,marginTop:6,fontWeight:600}}>Length: 379</div>
            </div>
          )}
        </div>
        <div style={{marginBottom:14}}>
          <div style={{color:C.text,fontSize:13,fontWeight:700,textDecoration:"underline",marginBottom:5}}>What is it</div>
          <p style={{color:C.textMid,fontSize:13,lineHeight:1.6,marginBottom:8}}>
            {task.title.includes("Meta")?"Meta Description is another important HTML element that explains more descriptively to Search Engines what your page is about. Meta Descriptions are often used as the text snippets used in Search Engine results and can help further signal to Search Engines what keywords your page should rank for.":"The Title Tag is one of the most important on-page SEO elements. It tells Search Engines and users what the page is about. An ideal title should be 50-60 characters and include your target keyword."}
          </p>
          <button style={{background:C.bgLight,border:`1px solid ${C.bluePale}`,color:C.blueL,cursor:"pointer",padding:"6px 14px",borderRadius:7,fontSize:12,fontWeight:600,fontFamily:"inherit"}}>More Info</button>
        </div>
        <div style={{marginBottom:22}}>
          <div style={{color:C.text,fontSize:13,fontWeight:700,textDecoration:"underline",marginBottom:5}}>How do I fix it</div>
          <p style={{color:C.textMid,fontSize:13,lineHeight:1.6,marginBottom:12}}>
            {task.title.includes("Meta")?"Make sure your page has a Meta Description included, and is at an optimum length (between 120 and 160 characters). Make your Meta Description text interesting and easy to comprehend. Use phrases and keywords relevant to the page. Meta Description is normally available to be updated in your CMS.":"Update your Title Tag to be between 50-60 characters. Include your primary keyword near the beginning. Make it compelling and click-worthy. Each page should have a unique title that accurately describes the content."}
          </p>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            <button style={{background:C.bgLight,border:`1px solid ${C.bluePale}`,color:C.blueL,cursor:"pointer",padding:"6px 14px",borderRadius:7,fontSize:12,fontWeight:600,fontFamily:"inherit"}}>Best Practices</button>
            {["How to fix in Wordpress","How to fix in Shopify","How to fix in Wix"].map(btn=>(
              <button key={btn} style={{background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",padding:"6px 12px",borderRadius:7,fontSize:12,fontFamily:"inherit"}}>{btn}</button>
            ))}
          </div>
        </div>
        <div style={{display:"flex",gap:10,paddingTop:16,borderTop:`1px solid ${C.border}`}}>
          <button onClick={()=>completeTask(task.id)} style={{background:"#D1FAE5",color:C.green,border:`1px solid ${C.green}44`,cursor:"pointer",padding:"9px 20px",borderRadius:9,fontSize:13,fontWeight:700,display:"flex",alignItems:"center",gap:6,fontFamily:"inherit"}}><Check size={14}/>Complete</button>
          <button onClick={()=>deleteTask(task.id)} style={{background:C.redL,color:C.red,border:`1px solid ${C.red}44`,cursor:"pointer",padding:"9px 20px",borderRadius:9,fontSize:13,fontWeight:700,display:"flex",alignItems:"center",gap:6,fontFamily:"inherit"}}><X size={14}/>Delete</button>
          <button onClick={()=>setModal(null)} style={{background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",padding:"9px 20px",borderRadius:9,fontSize:13,fontFamily:"inherit",marginLeft:"auto"}}>Close</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)",background:C.bg}}>
      {modal&&<TaskModal task={modal}/>}
      <div style={{padding:"22px 28px"}}>
        <h2 className="sg" style={{color:C.text,fontSize:20,fontWeight:800,marginBottom:16}}>Task Management</h2>
        {/* Filters */}
        <div style={{display:"flex",gap:12,marginBottom:16}}>
          <div style={{flex:1,display:"flex",alignItems:"center",gap:8,background:C.white,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px"}}>
            <Search size={13} color={C.textDim}/>
            <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} placeholder="Search" style={{flex:1,border:"none",outline:"none",fontSize:13,color:C.text,fontFamily:"inherit"}}/>
          </div>
          {/* Status */}
          <div style={{position:"relative"}}>
            <button onClick={()=>{setStatusOpen(!statusOpen);setCatOpen(false);}} style={{display:"flex",alignItems:"center",gap:8,background:C.white,border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 14px",cursor:"pointer",fontSize:13,color:C.text,fontFamily:"inherit",minWidth:170,justifyContent:"space-between"}}>
              {status}<ChevronDown size={13} color={C.textDim}/>
            </button>
            {statusOpen&&(
              <div style={{position:"absolute",top:"calc(100% + 2px)",left:0,right:0,background:C.white,border:`1px solid ${C.border}`,borderRadius:9,boxShadow:"0 4px 16px rgba(0,0,0,.1)",zIndex:50,overflow:"hidden"}}>
                {["All Statuses","Open","Completed","Deleted"].map(s=>(
                  <div key={s} onClick={()=>{setStatus(s);setStatusOpen(false);setPage(1);}} style={{padding:"10px 14px",cursor:"pointer",fontSize:13,color:s===status?C.blueL:C.text,fontFamily:"inherit"}} className="td">{s}</div>
                ))}
              </div>
            )}
          </div>
          {/* Category */}
          <div style={{position:"relative"}}>
            <button onClick={()=>{setCatOpen(!catOpen);setStatusOpen(false);}} style={{display:"flex",alignItems:"center",gap:8,background:C.white,border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 14px",cursor:"pointer",fontSize:13,color:C.text,fontFamily:"inherit",minWidth:190,justifyContent:"space-between"}}>
              {category}<ChevronDown size={13} color={C.textDim}/>
            </button>
            {catOpen&&(
              <div style={{position:"absolute",top:"calc(100% + 2px)",left:0,right:0,background:C.white,border:`1px solid ${C.border}`,borderRadius:9,boxShadow:"0 4px 16px rgba(0,0,0,.1)",zIndex:50,overflow:"hidden"}}>
                {["All Categories","On-Page SEO","Technical SEO","Content","Backlinks"].map(c=>(
                  <div key={c} onClick={()=>{setCategory(c);setCatOpen(false);setPage(1);}} style={{padding:"10px 14px",cursor:"pointer",fontSize:13,color:c===category?C.blueL:C.text,fontFamily:"inherit"}} className="td">{c}</div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Stats */}
        <div style={{display:"flex",gap:10,marginBottom:16}}>
          {[{l:"Total",v:taskList.length,c:C.blueL},{l:"Open",v:taskList.filter(t=>t.status==="Open").length,c:C.orange},{l:"Completed",v:taskList.filter(t=>t.status==="Completed").length,c:C.green},{l:"Deleted",v:taskList.filter(t=>t.status==="Deleted").length,c:C.red}].map(({l,v,c})=>(
            <div key={l} style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 14px",display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:c}}/><span style={{color:C.textMid,fontSize:12}}>{l}:</span><span style={{color:C.text,fontWeight:800,fontSize:13,fontFamily:"Space Grotesk"}}>{v}</span>
            </div>
          ))}
        </div>
        {/* Grid */}
        {pageData.length===0
          ?<div style={{textAlign:"center",padding:"60px 0",color:C.textDim}}>No tasks found.</div>
          :<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:22}}>
            {pageData.map(task=>(
              <div key={task.id} onClick={()=>setModal(task)}
                style={{background:C.white,border:`2px solid ${task.status==="Completed"?`${C.green}40`:C.border}`,borderRadius:12,padding:"16px 18px",cursor:"pointer",transition:"border-color .15s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=C.blueL}
                onMouseLeave={e=>e.currentTarget.style.borderColor=task.status==="Completed"?`${C.green}40`:C.border}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:9}}>
                  <span style={{background:"#E0F2FE",color:"#0369A1",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20}}>{task.cat}</span>
                  <div style={{width:24,height:24,borderRadius:6,background:"#E0F2FE",display:"flex",alignItems:"center",justifyContent:"center"}}><Tag size={12} color="#0369A1"/></div>
                </div>
                <h3 style={{color:C.text,fontSize:13,fontWeight:700,lineHeight:1.4,marginBottom:7}}>{task.title}</h3>
                <p style={{color:C.textMid,fontSize:11.5,lineHeight:1.6,marginBottom:7}}>{task.desc}</p>
                <a href="#" style={{color:C.blueL,fontSize:11,display:"block",marginBottom:11}}>{task.url}</a>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  {task.status==="Open"?(
                    <>
                      <button onClick={e=>{e.stopPropagation();completeTask(task.id);}} style={{background:"#D1FAE5",color:C.green,border:`1px solid ${C.green}44`,cursor:"pointer",padding:"4px 11px",borderRadius:7,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",gap:3,fontFamily:"inherit"}}><Check size={10}/>Complete</button>
                      <button onClick={e=>{e.stopPropagation();deleteTask(task.id);}} style={{background:C.redL,color:C.red,border:`1px solid ${C.red}44`,cursor:"pointer",padding:"4px 11px",borderRadius:7,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",gap:3,fontFamily:"inherit"}}><X size={10}/>Delete</button>
                    </>
                  ):<span className="chip" style={{color:task.status==="Completed"?C.green:C.red,background:task.status==="Completed"?C.greenL:C.redL}}>{task.status}</span>}
                  <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:4,color:C.textDim,fontSize:11}}><Clock size={10}/>{task.time}</div>
                </div>
              </div>
            ))}
          </div>
        }
        {totalPages>1&&(
          <div style={{display:"flex",justifyContent:"center",gap:4}}>
            {[...Array(Math.min(totalPages,7))].map((_,i)=>(
              <button key={i} onClick={()=>setPage(i+1)} style={{width:32,height:32,borderRadius:6,border:"none",cursor:"pointer",fontSize:13,fontWeight:page===i+1?700:400,fontFamily:"inherit",background:page===i+1?C.blueL:"transparent",color:page===i+1?"#fff":C.textMid}}>{i+1}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Progress Screen ────────────────────────────────────────────────────
function ProgressScreen() {
  const progressData=[
    {d:"01 Aug",issues:40,tasks:0},{d:"02 Aug",issues:40,tasks:0},{d:"03 Aug",issues:40,tasks:0},
    {d:"04 Aug",issues:40,tasks:0},{d:"05 Aug",issues:40,tasks:0},{d:"06 Aug",issues:40,tasks:0},
    {d:"07 Aug",issues:40,tasks:0},{d:"08 Aug",issues:40,tasks:0},{d:"09 Aug",issues:40,tasks:1},
  ];
  return (
    <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)",background:C.bg,padding:"22px 28px"}}>
      <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:14,padding:"22px 26px",marginBottom:18}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20}}>
          <div>
            <h2 className="sg" style={{color:C.text,fontSize:17,fontWeight:800,marginBottom:4}}>Progress for https://www.seoengineboost.com</h2>
            <p style={{color:C.textMid,fontSize:13}}>Top-Rated SEO Agency | Global SEO for Rankings & ROI</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:7}}>
            <div style={{color:C.textDim,fontSize:12}}>Last Crawl Date <span style={{fontWeight:700,color:C.text}}>02-Aug-25</span> · <span style={{fontWeight:700,color:C.text}}>1</span> of 4 crawls used</div>
            <div style={{display:"flex",gap:7}}>
              <button style={{background:C.yellow,color:"#fff",border:"none",cursor:"pointer",padding:"8px 14px",borderRadius:8,fontSize:12,fontWeight:700,fontFamily:"inherit"}}>View Crawl Report</button>
              <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"8px 14px",borderRadius:8,fontSize:12,fontWeight:700,fontFamily:"inherit"}}>Recrawl Now</button>
            </div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:22}}>
          {[{icon:"🔍",v:"19",l:"Pages Found"},{icon:"⚠️",v:"40",l:"Outstanding Issues"},{icon:"✅",v:"0",l:"Tasks Completed"}].map(({icon,v,l})=>(
            <div key={l} style={{background:C.bg,borderRadius:10,padding:"18px 20px",border:`1px solid ${C.border}`,textAlign:"center"}}>
              <div style={{fontSize:26,marginBottom:7}}>{icon}</div>
              <div className="sg" style={{color:C.text,fontSize:30,fontWeight:900,lineHeight:1}}>{v}</div>
              <div style={{color:C.textMid,fontSize:13,marginTop:5}}>{l}</div>
            </div>
          ))}
        </div>
        <div className="sg" style={{color:C.text,fontSize:14,fontWeight:700,marginBottom:14}}>Task & Issue Progress Over Time</div>
        <ResponsiveContainer width="100%" height={200}>
          <RBar data={progressData} margin={{top:0,right:0,left:-20,bottom:0}} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
            <XAxis dataKey="d" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
            <YAxis domain={[0,50]} tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
            <Bar dataKey="issues" name="Issues Found" fill={C.blueL} radius={[4,4,0,0]} barSize={14}/>
            <Bar dataKey="tasks" name="Tasks Completed" fill={C.greenL} radius={[4,4,0,0]} barSize={14}/>
          </RBar>
        </ResponsiveContainer>
        <div style={{display:"flex",gap:14,marginTop:8,justifyContent:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:C.textMid}}><div style={{width:12,height:12,background:C.blueL,borderRadius:2}}/>Issues Found</div>
          <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:C.textMid}}><div style={{width:12,height:12,background:C.greenL,border:`1px solid ${C.green}`,borderRadius:2}}/>Tasks Completed</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 22px"}}>
          <div className="sg" style={{color:C.text,fontSize:13,fontWeight:700,marginBottom:12}}>Issue Breakdown</div>
          {[{cat:"Meta Descriptions",count:12,c:C.orange},{cat:"Title Tags",count:9,c:C.blueL},{cat:"Missing H1 Tags",count:6,c:C.red},{cat:"Image Alt Text",count:8,c:C.purple},{cat:"Page Speed Issues",count:5,c:C.yellow}].map(({cat,count,c})=>(
            <div key={cat} style={{marginBottom:9}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{color:C.textMid,fontSize:12}}>{cat}</span><span style={{color:C.text,fontWeight:700,fontSize:12}}>{count}</span></div>
              <ProgBar v={(count/40)*100} col={c} h={5}/>
            </div>
          ))}
        </div>
        <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 22px"}}>
          <div className="sg" style={{color:C.text,fontSize:13,fontWeight:700,marginBottom:12}}>Crawl History</div>
          {[{date:"02 Aug 2025",pages:19,issues:40},{date:"26 Jul 2025",pages:18,issues:42},{date:"19 Jul 2025",pages:17,issues:38},{date:"12 Jul 2025",pages:17,issues:45}].map(({date,pages,issues},i)=>(
            <div key={i} className="td" style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:i<3?`1px solid ${C.border}`:"none"}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:C.green,flexShrink:0}}/>
              <div style={{flex:1}}><div style={{color:C.text,fontSize:12.5,fontWeight:600}}>{date}</div><div style={{color:C.textDim,fontSize:11}}>{pages} pages · {issues} issues</div></div>
              <span className="chip" style={{color:C.green,background:C.greenL}}>Done</span>
              <button style={{background:"transparent",border:`1px solid ${C.border}`,color:C.blueL,cursor:"pointer",padding:"4px 10px",borderRadius:6,fontSize:11,fontFamily:"inherit"}}>View</button>
            </div>
          ))}
          <button style={{width:"100%",marginTop:10,background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"8px",borderRadius:8,fontSize:12,fontWeight:700,fontFamily:"inherit"}}>Recrawl Now →</button>
        </div>
      </div>
    </div>
  );
}

// ── Crawl Dashboard (Welcome) ─────────────────────────────────────────
function CrawlDashboard({ onNavigate }) {
  const [url, setUrl] = useState("");
  const cards=[
    {id:"onpage",icon:"🔍",title:"Run an Audit",desc:"Run a quick one-off report on any website or page. Use this to research your competitor's strengths, or review specific pages of your site.",hasInput:true,c:C.blueL},
    {id:"progress",icon:"📊",title:"Crawl Report",desc:"See a detailed report of your site's issues listed in priority order together with helpful information. Details are updated live during a crawl.",c:C.green},
    {id:"progress",icon:"📈",title:"See Your Site's Progress",desc:"Get a summary of progress on SEO improvements to your site in terms of task completion and remaining issues.",c:C.orange},
    {id:"seotasks",icon:"✅",title:"Manage Tasks",desc:"See the issues identified on your site in priority order or category together with helpful information. Complete tasks to remove them from the list.",c:C.blueL},
    {id:"keyword",icon:"🔑",title:"Perform Keyword Research",desc:"Get keyword recommendations and their SEO metrics based on some input keywords or see any site's current ranking keywords.",c:C.purple},
    {id:"rank",icon:"📉",title:"Track Keyword Rankings",desc:"Choose keywords to track for your site and location and start tracking their movements over time.",c:C.orange},
    {id:"backlink",icon:"🔗",title:"Perform Backlink Research",desc:"Get an insight into any site's backlink profile, high level metrics as well as a detailed view of every backlink and referring domain.",c:C.green},
  ];
  return (
    <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)",background:C.bg,padding:"28px 32px"}}>
      <div style={{textAlign:"center",marginBottom:34}}>
        <div style={{width:54,height:54,borderRadius:14,background:`linear-gradient(135deg,${C.orange},${C.blueL})`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",boxShadow:`0 4px 16px ${C.orange}44`}}><Zap size={24} color="#fff" fill="#fff"/></div>
        <h1 className="sg" style={{color:C.text,fontSize:22,fontWeight:900,marginBottom:7}}>Welcome to <span style={{color:C.blueL}}>Boostly</span></h1>
        <p style={{color:C.textMid,fontSize:13.5,maxWidth:540,margin:"0 auto",lineHeight:1.6}}>The dashboard contains links to the most important functions. Reach out via <span style={{color:C.blueL,cursor:"pointer"}}>Live Chat</span> if you need help — we'll respond within 24 hours. Get started by running an audit on your or your client's site.</p>
      </div>
      <h2 className="sg" style={{color:C.text,fontSize:15,fontWeight:700,marginBottom:16,textAlign:"center"}}>Your Dashboard</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,maxWidth:880,margin:"0 auto"}}>
        {cards.map(({id,icon,title,desc,c,hasInput},i)=>(
          <div key={i} className="card ch" style={{padding:"20px 20px",cursor:"pointer"}} onClick={()=>onNavigate&&onNavigate(id)}>
            <div style={{width:42,height:42,borderRadius:11,background:`${c}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:12}}>{icon}</div>
            <div className="sg" style={{color:C.text,fontSize:13.5,fontWeight:700,marginBottom:5}}>{title}</div>
            <p style={{color:C.textMid,fontSize:12,lineHeight:1.6,marginBottom:hasInput?10:0}}>{desc}</p>
            {hasInput&&(
              <div style={{display:"flex",gap:6}} onClick={e=>e.stopPropagation()}>
                <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Website URL" style={{flex:1,padding:"6px 10px",border:`1px solid ${C.border}`,borderRadius:7,fontSize:12,fontFamily:"inherit",outline:"none"}}/>
                <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"6px 12px",borderRadius:7,fontSize:12,fontWeight:700,fontFamily:"inherit"}}>Run</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Advanced Keyword Research ──────────────────────────────────────────
function AdvancedKeywordResearch() {
  const [kw, setKw] = useState("");
  const [filters, setFilters] = useState({longTail:false,lowComp:false,highCPC:false});
  const results = [
    {kw:"best ai seo tools",vol:"4,800/mo",comp:"Low",compPct:20,cpc:"$3.20"},
    {kw:"ai content generator seo",vol:"3,200/mo",comp:"Medium",compPct:50,cpc:"$4.75"},
    {kw:"how to rank with ai content",vol:"2,400/mo",comp:"High",compPct:82,cpc:"$5.50"},
    {kw:"ai seo optimization tips",vol:"1,900/mo",comp:"Low",compPct:18,cpc:"$2.40"},
    {kw:"seo automation tools 2025",vol:"1,600/mo",comp:"Medium",compPct:45,cpc:"$3.90"},
    {kw:"free seo ai writer",vol:"1,200/mo",comp:"Low",compPct:15,cpc:"$1.80"},
    {kw:"keyword research with ai",vol:"900/mo",comp:"Medium",compPct:55,cpc:"$4.20"},
    {kw:"rank tracking software",vol:"8,100/mo",comp:"High",compPct:78,cpc:"$6.50"},
  ];
  const compColor = (c) => c==="Low"?C.green:c==="Medium"?C.orange:C.red;
  const filteredRes = results.filter(r => {
    if (filters.lowComp && r.comp!=="Low") return false;
    if (filters.highCPC && parseFloat(r.cpc.slice(1))<4) return false;
    return true;
  });
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg }}>
      <div style={{ background:`linear-gradient(135deg,${C.blueL},${C.blue})`, padding:"18px 28px" }}>
        <h2 className="sg" style={{ color:"#fff", fontSize:18, fontWeight:800, marginBottom:12 }}>Advanced Keyword Research</h2>
        <div style={{ display:"flex", gap:10 }}>
          <div style={{ flex:1, display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.15)", border:"1px solid rgba(255,255,255,.25)", borderRadius:10, padding:"9px 14px" }}>
            <Search size={14} color="rgba(255,255,255,.7)"/>
            <input value={kw} onChange={e=>setKw(e.target.value)} placeholder="Search keywords..." style={{ flex:1, background:"transparent", border:"none", outline:"none", color:"#fff", fontSize:13, fontFamily:"inherit" }}/>
          </div>
          <button style={{ background:"rgba(255,255,255,.2)", border:"1px solid rgba(255,255,255,.3)", color:"#fff", cursor:"pointer", padding:"9px 14px", borderRadius:10, display:"flex", alignItems:"center" }}><Filter size={15}/></button>
        </div>
        <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap" }}>
          {[["longTail","Long-tail"],["lowComp","Low competition"],["highCPC","High CPC"]].map(([k,l]) => (
            <button key={k} onClick={()=>setFilters(f=>({...f,[k]:!f[k]}))} style={{ padding:"5px 12px", borderRadius:20, border:`1px solid rgba(255,255,255,${filters[k]?.5:.25})`, background:filters[k]?"rgba(255,255,255,.25)":"transparent", color:"#fff", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"inherit" }}>{l}</button>
          ))}
          <button style={{ marginLeft:"auto", background:"rgba(255,255,255,.15)", border:"1px solid rgba(255,255,255,.3)", color:"#fff", cursor:"pointer", padding:"5px 14px", borderRadius:20, fontSize:12, fontWeight:700, fontFamily:"inherit" }}>Add to Project</button>
        </div>
      </div>
      <div style={{ padding:"16px 28px" }}>
        {filteredRes.map((r,i) => (
          <div key={i} className="card ch" style={{ padding:"14px 18px", marginBottom:10 }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:8 }}>
              <div style={{ color:C.text, fontSize:14, fontWeight:700 }}>{r.kw}</div>
              <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"4px 12px", borderRadius:7, fontSize:11, fontWeight:700, fontFamily:"inherit", flexShrink:0 }}>Add to Project</button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
              <div>
                <div style={{ color:C.textDim, fontSize:10.5, marginBottom:2 }}>Search Volume</div>
                <div className="sg" style={{ color:C.text, fontSize:16, fontWeight:800 }}>{r.vol}</div>
              </div>
              <div>
                <div style={{ color:C.textDim, fontSize:10.5, marginBottom:2 }}>Competition</div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <div style={{ flex:1, height:6, background:C.border, borderRadius:3, overflow:"hidden" }}>
                    <div style={{ width:`${r.compPct}%`, height:"100%", background:compColor(r.comp), borderRadius:3 }}/>
                  </div>
                  <span style={{ color:compColor(r.comp), fontSize:11, fontWeight:700 }}>{r.comp}</span>
                </div>
              </div>
              <div>
                <div style={{ color:C.textDim, fontSize:10.5, marginBottom:2 }}>CPC Value</div>
                <div className="sg" style={{ color:C.text, fontSize:16, fontWeight:800 }}>{r.cpc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button style={{ position:"fixed", bottom:24, right:24, width:52, height:52, borderRadius:"50%", background:`linear-gradient(135deg,${C.blueL},${C.blue})`, color:"#fff", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 6px 20px ${C.blueL}55`, zIndex:100 }}>
        <Plus size={22}/>
      </button>
    </div>
  );
}

// ── Competitor Analyzer ────────────────────────────────────────────────
function CompetitorAnalyzer() {
  const [url, setUrl] = useState("imranashrafai.com");
  const [tab, setTab] = useState("traffic");
  const TABS = ["Traffic","Keywords","Pages","Gaps"];
  const trafficSources = [
    {name:"Organic Search (45%)",pct:45,color:C.blueL},
    {name:"Direct (25%)",pct:25,color:C.green},
    {name:"Referral (8%)",pct:8,color:C.orange},
    {name:"Social (20%)",pct:20,color:C.purple},
    {name:"Email (2%)",pct:2,color:C.yellow},
  ];
  const topKeywords = [
    {kw:"SEO tools (Ranking 2)",vol:"8,200/mo",bar:80},
    {kw:"Keyword tool (Ranking 4)",vol:"5,400/mo",bar:55},
    {kw:"Backlink analyzer (Ranking 4)",vol:"4,100/mo",bar:42},
    {kw:"Site audit tool (Ranking V)",vol:"3,300/mo",bar:34},
    {kw:"Seo guide (Ranking 3)",vol:"2,800/mo",bar:28},
  ];
  const topPages = [
    {title:"How to Do Keyword Research",traffic:"34,350/mo",words:"3,210"},
    {title:"SEO Tools Comparison",traffic:"18,720/mo",words:"4,520"},
    {title:"Backlink Building Guide",traffic:"15,430/mo",words:"2,890"},
  ];
  const gaps = [
    {kw:"SEO Strategy Templates",vol:"3,800",diff:"Medium"},
    {kw:"Content SEO Checklist",vol:"2,500",diff:"Low"},
    {kw:"Google Algorithm Updates",vol:"4,200",diff:"High"},
    {kw:"Local SEO Guide 2025",vol:"1,900",diff:"Low"},
  ];
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg }}>
      <div style={{ padding:"18px 28px", background:C.white, borderBottom:`1px solid ${C.border}` }}>
        <h2 className="sg" style={{ color:C.text, fontSize:18, fontWeight:800, marginBottom:14 }}>Competitor Analyzer</h2>
        <div style={{ display:"flex", gap:10 }}>
          <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Enter competitor URL" style={{ flex:1, padding:"10px 14px", border:`1px solid ${C.border}`, borderRadius:10, fontSize:13, fontFamily:"inherit", outline:"none", color:C.text, background:C.bg }}/>
          <button style={{ background:`linear-gradient(135deg,${C.blueL},${C.blue})`, color:"#fff", border:"none", cursor:"pointer", padding:"10px 24px", borderRadius:10, fontSize:13, fontWeight:700, fontFamily:"inherit" }}>Analyze Now</button>
        </div>
      </div>
      <div style={{ padding:"16px 28px 0" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
          <div className="sg" style={{ color:C.text, fontSize:15, fontWeight:700 }}>Analysis Results</div>
          <span style={{ color:C.blueL, fontSize:12.5, cursor:"pointer" }}>{url}</span>
        </div>
        <div style={{ display:"flex", gap:0, background:C.white, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden", marginBottom:16 }}>
          {TABS.map((t,i) => (
            <button key={t} onClick={()=>setTab(t.toLowerCase())} style={{ flex:1, padding:"11px 0", border:"none", borderRight:i<TABS.length-1?`1px solid ${C.border}`:"none", cursor:"pointer", fontSize:13, fontWeight:tab===t.toLowerCase()?700:500, fontFamily:"inherit", background:tab===t.toLowerCase()?C.blueL:"transparent", color:tab===t.toLowerCase()?"#fff":C.textMid }}>{t}</button>
          ))}
        </div>
        {tab==="traffic" && (
          <div>
            <div className="card" style={{ padding:"18px 20px", marginBottom:14 }}>
              <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:16 }}>
                <span className="sg" style={{ color:C.text, fontSize:28, fontWeight:900 }}>124,583</span>
                <span style={{ color:C.textDim, fontSize:13 }}>Monthly Visits</span>
              </div>
              <div style={{ display:"flex", gap:20, alignItems:"center" }}>
                <svg width={140} height={140} viewBox="0 0 140 140">
                  {(()=>{let cum=0;const r=56,cx=70,cy=70,circ=2*Math.PI*r;return trafficSources.map(({pct,color},i)=>{const slice=(pct/100)*circ;const rot=(cum/100)*360-90;cum+=pct;return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={28} strokeDasharray={`${slice} ${circ-slice}`} style={{transform:`rotate(${rot}deg)`,transformOrigin:`${cx}px ${cy}px`}}/>;});})()}
                  <circle cx={70} cy={70} r={42} fill="white"/>
                </svg>
                <div style={{ flex:1 }}>
                  {trafficSources.map(({name,color}) => (
                    <div key={name} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}>
                      <div style={{ width:10, height:10, borderRadius:3, background:color, flexShrink:0 }}/>
                      <span style={{ color:C.textMid, fontSize:12 }}>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button style={{ width:"100%", background:`linear-gradient(135deg,${C.blueL},${C.blue})`, color:"#fff", border:"none", cursor:"pointer", padding:"13px", borderRadius:12, fontSize:14, fontWeight:700, fontFamily:"inherit" }}>Download Report</button>
          </div>
        )}
        {tab==="keywords" && (
          <div>
            <div className="card" style={{ padding:"16px 18px", marginBottom:12 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                <div><div style={{ color:C.textDim, fontSize:11 }}>Total Keywords</div><div className="sg" style={{ color:C.text, fontSize:24, fontWeight:900 }}>1,432</div></div>
                <span className="chip" style={{ color:C.green, background:C.greenL }}>↑ 12.1%</span>
              </div>
              {topKeywords.map(({kw,vol,bar},i) => (
                <div key={i} style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ color:C.blueL, fontSize:12, cursor:"pointer" }}>{kw}</span>
                    <span style={{ color:C.textMid, fontSize:12 }}>{vol}</span>
                  </div>
                  <ProgBar v={bar} col={C.blueL} h={6}/>
                </div>
              ))}
              <div style={{ display:"flex", gap:6, marginTop:12 }}>
                {[{l:"Top 3",v:"286",c:C.green},{l:"4-10",v:"543",c:C.blueL},{l:"11-20",v:"327",c:C.orange},{l:"21+",v:"276",c:C.textDim}].map(({l,v,c}) => (
                  <div key={l} style={{ flex:1, background:`${c}15`, border:`1px solid ${c}30`, borderRadius:8, padding:"8px", textAlign:"center" }}>
                    <div className="sg" style={{ color:c, fontSize:16, fontWeight:800 }}>{v}</div>
                    <div style={{ color:C.textDim, fontSize:10 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <button style={{ width:"100%", background:`linear-gradient(135deg,${C.blueL},${C.blue})`, color:"#fff", border:"none", cursor:"pointer", padding:"13px", borderRadius:12, fontSize:14, fontWeight:700, fontFamily:"inherit" }}>Download Report</button>
          </div>
        )}
        {tab==="pages" && (
          <div>
            <div className="sg" style={{ color:C.text, fontSize:14, fontWeight:700, marginBottom:12 }}>Top Performing Pages</div>
            {topPages.map(({title,traffic,words},i) => (
              <div key={i} className="card" style={{ padding:"14px 18px", marginBottom:10 }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:8 }}>
                  <div style={{ color:C.text, fontSize:13, fontWeight:700, flex:1, paddingRight:10 }}>{title}</div>
                  <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"4px 12px", borderRadius:6, fontSize:11, fontWeight:700, fontFamily:"inherit", flexShrink:0 }}>View Page</button>
                </div>
                <div style={{ display:"flex", gap:16 }}>
                  <span style={{ color:C.textDim, fontSize:12 }}>Traffic: <span style={{ color:C.blueL, fontWeight:700 }}>{traffic}</span></span>
                  <span style={{ color:C.textDim, fontSize:12 }}>Words: <span style={{ color:C.text, fontWeight:600 }}>{words}</span></span>
                </div>
              </div>
            ))}
            <button style={{ width:"100%", background:`linear-gradient(135deg,${C.blueL},${C.blue})`, color:"#fff", border:"none", cursor:"pointer", padding:"13px", borderRadius:12, fontSize:14, fontWeight:700, fontFamily:"inherit" }}>Download Report</button>
          </div>
        )}
        {tab==="gaps" && (
          <div>
            <div className="card" style={{ padding:"16px 18px", marginBottom:14 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                <div><div style={{ color:C.textDim, fontSize:11 }}>Total Gap Keywords</div><div className="sg" style={{ color:C.text, fontSize:26, fontWeight:900 }}>348</div></div>
                <span style={{ background:`${C.orange}20`, color:C.orange, fontSize:11, fontWeight:800, padding:"4px 10px", borderRadius:20 }}>High Opportunity</span>
              </div>
              {gaps.map(({kw,vol,diff},i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 14px", background:C.bg, borderRadius:9, marginBottom:7, border:`1px solid ${C.border}` }}>
                  <div style={{ flex:1 }}>
                    <div style={{ color:C.text, fontSize:13, fontWeight:600 }}>{kw}</div>
                    <div style={{ color:C.textDim, fontSize:11 }}>Monthly Volume: {vol} · Difficulty: {diff}</div>
                  </div>
                  <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"6px 14px", borderRadius:7, fontSize:11, fontWeight:700, fontFamily:"inherit" }}>Target</button>
                </div>
              ))}
            </div>
            <button style={{ width:"100%", background:`linear-gradient(135deg,${C.blueL},${C.blue})`, color:"#fff", border:"none", cursor:"pointer", padding:"13px", borderRadius:12, fontSize:14, fontWeight:700, fontFamily:"inherit" }}>Download Report</button>
          </div>
        )}
      </div>
      <div style={{ height:28 }}/>
    </div>
  );
}

// ── Traffic Analytics ──────────────────────────────────────────────────
function TrafficAnalytics() {
  const [domainTab, setDomainTab] = useState("overview");
  const organicData = [
    {m:"Sep",v:120},{m:"Oct",v:130},{m:"Nov",v:125},{m:"Dec",v:140},{m:"Jan",v:150},
    {m:"Feb",v:145},{m:"Mar",v:155},{m:"Apr",v:160},{m:"May",v:158},{m:"Jun",v:165},{m:"Jul",v:170},{m:"Aug",v:175},
  ];
  const topKwTraffic = [
    {kw:"tim kiem bang hinh anh",pct:"5.23"},{kw:"rut gon link",pct:"4.10"},{kw:"content marketing",pct:"3.36"},
    {kw:"seo tools 2025",pct:"2.62"},{kw:"suaghe tv",pct:"2.24"},{kw:"content",pct:"2.23"},
  ];
  const topUrls = [
    {url:"/seo-tools",pct:"18.96"},{url:"/keyword-research",pct:"4.69"},{url:"/backlinks",pct:"4.64"},
    {url:"/content-marketing",pct:"3.62"},{url:"/seo-audit",pct:"3.38"},
  ];
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg }}>
      <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, padding:"18px 28px" }}>
        <div style={{ color:C.textDim, fontSize:12, marginBottom:4 }}>Domain:</div>
        <h2 className="sg" style={{ color:C.text, fontSize:20, fontWeight:800, marginBottom:14 }}>seoengineboost.com</h2>
        <div style={{ display:"flex", gap:0 }}>
          {["Overview","Top Keywords","Top URL","Backlinks"].map((t,i) => (
            <button key={t} onClick={()=>setDomainTab(t.toLowerCase().replace(" ",""))} style={{ padding:"9px 18px", border:"none", borderBottom:domainTab===t.toLowerCase().replace(" ","")?`2.5px solid ${C.blueL}`:"2.5px solid transparent", cursor:"pointer", fontSize:13, fontWeight:domainTab===t.toLowerCase().replace(" ","")? 700:500, fontFamily:"inherit", background:"transparent", color:domainTab===t.toLowerCase().replace(" ","")?C.blueL:C.textMid }}>{t}</button>
          ))}
        </div>
      </div>
      <div style={{ padding:"20px 28px" }}>
        {/* Domain metrics */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginBottom:20 }}>
          {[{l:"Authority Score",v:"42",chg:"+5",c:C.blueL},{l:"Backlinks",v:"104.7k",chg:"-50",c:C.orange},{l:"SEO Score",v:"73.1",chg:"",c:C.green},{l:"Link Index",v:"82",chg:"+4",c:C.purple},{l:"Traffic",v:"35.6k",chg:"+224",c:C.blueL}].map(({l,v,chg,c}) => (
            <div key={l} className="card ch" style={{ padding:"14px 16px" }}>
              <div className="sg" style={{ color:C.text, fontSize:18, fontWeight:800 }}>{v}</div>
              {chg && <span style={{ color:parseFloat(chg)>0?C.green:C.red, fontSize:10.5, fontWeight:700 }}>{chg}</span>}
              <div style={{ color:C.textDim, fontSize:10.5, marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding:"18px 22px", marginBottom:16 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
            <div className="sg" style={{ color:C.text, fontSize:14, fontWeight:700 }}>Organic Traffic</div>
            <div style={{ display:"flex", gap:6 }}>
              {["3M","6M","12M","All device"].map((t,i) => (
                <button key={t} style={{ padding:"4px 10px", borderRadius:6, border:"none", cursor:"pointer", fontSize:11, fontWeight:i===2?700:400, fontFamily:"inherit", background:i===2?C.blueL:"rgba(0,0,0,.05)", color:i===2?"#fff":C.textDim }}>{t}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={organicData} margin={{top:0,right:0,left:-20,bottom:0}}>
              <defs><linearGradient id="tg1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.blueL} stopOpacity={.18}/><stop offset="95%" stopColor={C.blueL} stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
              <XAxis dataKey="m" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}} formatter={v=>[`${v}K`,"Traffic"]}/>
              <Area type="monotone" dataKey="v" stroke={C.blueL} fill="url(#tg1)" strokeWidth={2.5}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <div className="card" style={{ overflow:"hidden" }}>
            <div style={{ padding:"12px 18px", borderBottom:`1px solid ${C.border}` }}>
              <div className="sg" style={{ color:C.text, fontSize:13, fontWeight:700 }}>Top Organic Traffic Keywords</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr auto", padding:"8px 18px", background:C.bg, borderBottom:`1px solid ${C.border}` }}>
              <span style={{ color:C.textDim, fontSize:10, fontWeight:700 }}>KEYWORD</span>
              <span style={{ color:C.textDim, fontSize:10, fontWeight:700 }}>TRAFFIC %</span>
            </div>
            {topKwTraffic.map(({kw,pct},i) => (
              <div key={i} className="td" style={{ display:"grid", gridTemplateColumns:"1fr auto", padding:"10px 18px", borderBottom:i<topKwTraffic.length-1?`1px solid ${C.border}`:"none", alignItems:"center" }}>
                <span style={{ color:C.text, fontSize:12.5 }}>{kw}</span>
                <span style={{ color:C.blueL, fontWeight:700, fontSize:12 }}>{pct}</span>
              </div>
            ))}
            <div style={{ padding:"10px 18px" }}>
              <button style={{ color:C.blueL, background:"none", border:"none", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"inherit" }}>View all →</button>
            </div>
          </div>
          <div className="card" style={{ overflow:"hidden" }}>
            <div style={{ padding:"12px 18px", borderBottom:`1px solid ${C.border}` }}>
              <div className="sg" style={{ color:C.text, fontSize:13, fontWeight:700 }}>Top Organic Traffic URLs</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr auto", padding:"8px 18px", background:C.bg, borderBottom:`1px solid ${C.border}` }}>
              <span style={{ color:C.textDim, fontSize:10, fontWeight:700 }}>URL</span>
              <span style={{ color:C.textDim, fontSize:10, fontWeight:700 }}>TRAFFIC %</span>
            </div>
            {topUrls.map(({url,pct},i) => (
              <div key={i} className="td" style={{ display:"grid", gridTemplateColumns:"1fr auto", padding:"10px 18px", borderBottom:i<topUrls.length-1?`1px solid ${C.border}`:"none", alignItems:"center" }}>
                <span style={{ color:C.blueL, fontSize:12, cursor:"pointer", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{url}</span>
                <span style={{ color:C.blueL, fontWeight:700, fontSize:12 }}>{pct}</span>
              </div>
            ))}
            <div style={{ padding:"10px 18px" }}>
              <button style={{ color:C.blueL, background:"none", border:"none", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"inherit" }}>View all →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Site Audit ────────────────────────────────────────────────────────
function SiteAudit() {
  const [period, setPeriod] = useState("Year");
  const healthData = [{m:"Sep",v:60},{m:"Oct",v:65},{m:"Nov",v:70},{m:"Dec",v:68},{m:"Jan",v:72},{m:"Feb",v:75},{m:"Mar",v:73},{m:"Apr",v:78},{m:"May",v:76},{m:"Jun",v:80},{m:"Jul",v:82},{m:"Aug",v:80}];
  const issues = [
    {t:"73 pages have slow load speed",pct:5,c:C.orange},
    {t:"2 issues with mixed content",pct:2,c:C.yellow},
    {t:"3 redirect chains and loops",pct:0,c:C.red},
    {t:"22 pages have slow load speed",pct:5,c:C.orange},
    {t:"100 issues with mixed content",pct:10,c:C.yellow},
    {t:"50 redirect chains and loops",pct:5,c:C.red},
  ];
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg, padding:"20px 28px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
        <h2 className="sg" style={{ color:C.text, fontSize:18, fontWeight:800 }}>Site Audit</h2>
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 14px", background:C.white, border:`1px solid ${C.border}`, borderRadius:9 }}>
          <input defaultValue="toponseek.com" style={{ border:"none", outline:"none", fontSize:13, color:C.text, fontFamily:"inherit", width:160 }}/>
          <button style={{ background:C.blueL, color:"#fff", border:"none", cursor:"pointer", padding:"5px 12px", borderRadius:7, fontSize:12, fontWeight:700, fontFamily:"inherit" }}>Check SEO Audit</button>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"320px 1fr", gap:16, marginBottom:16 }}>
        {/* Health gauge */}
        <div className="card" style={{ padding:"20px 22px" }}>
          <div className="sg" style={{ color:C.text, fontSize:13, fontWeight:700, marginBottom:14 }}>Site Health</div>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:12 }}>
            <div style={{ position:"relative", width:140, height:80, overflow:"hidden" }}>
              <svg width={140} height={140} viewBox="0 0 140 140" style={{ marginTop:-70 }}>
                <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none" stroke="#E2E8F0" strokeWidth={22} strokeLinecap="round"/>
                <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none" stroke={C.blueL} strokeWidth={22} strokeLinecap="round" strokeDasharray={`${(57/100)*188} 188`}/>
              </svg>
              <div style={{ position:"absolute", top:30, left:"50%", transform:"translateX(-50%)", textAlign:"center" }}>
                <div className="sg" style={{ color:C.text, fontSize:26, fontWeight:900 }}>57%</div>
                <div style={{ color:C.textDim, fontSize:10 }}>no changes</div>
              </div>
            </div>
          </div>
          <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:12 }}>
            {[{l:"ERROR",v:6,c:C.red},{l:"WARNING",v:2,c:C.orange},{l:"NOTICE",v:2,c:C.blueL},{l:"PASSED",v:17,c:C.green}].map(({l,v,c}) => (
              <div key={l} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:c }}/>
                <span style={{ color:C.textMid, fontSize:11.5, flex:1 }}>{l}</span>
                <span style={{ color:C.text, fontWeight:700, fontSize:12 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop:12, paddingTop:12, borderTop:`1px solid ${C.border}` }}>
            <div className="sg" style={{ color:C.text, fontSize:13, fontWeight:700, marginBottom:8 }}>Crawled Pages</div>
            <div className="sg" style={{ color:C.blueL, fontSize:36, fontWeight:900 }}>1,334</div>
            <ProgBar v={70} col={C.blueL} h={8}/>
          </div>
          <div style={{ marginTop:12, paddingTop:12, borderTop:`1px solid ${C.border}` }}>
            <div className="sg" style={{ color:C.text, fontSize:13, fontWeight:700, marginBottom:8 }}>PageSpeed — Desktop</div>
            <div style={{ display:"flex", justifyContent:"center" }}>
              <ScoreRing score={90} size={80}/>
            </div>
          </div>
        </div>
        {/* Issues */}
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:14 }}>
            {[{l:"Errors",v:"235",chg:"-1,837",c:C.red},{l:"Warnings",v:"1,366",chg:"-59,161",c:C.orange},{l:"Notices",v:"2,605",chg:"-26,941",c:C.blueL}].map(({l,v,chg,c}) => (
              <div key={l} className="card ch" style={{ padding:"14px 18px" }}>
                <div style={{ color:C.textDim, fontSize:11, marginBottom:4 }}>{l}</div>
                <div className="sg" style={{ color:c, fontSize:28, fontWeight:900 }}>{v}</div>
                <span className="chip" style={{ color:C.green, background:C.greenL, fontSize:9 }}>{chg}</span>
              </div>
            ))}
          </div>
          <div className="card" style={{ overflow:"hidden" }}>
            <div style={{ padding:"12px 18px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div className="sg" style={{ color:C.text, fontSize:13, fontWeight:700 }}>Top Issues</div>
              <div style={{ display:"flex", gap:4 }}>
                {["All issues","Onpage","Technical"].map((f,i) => (
                  <button key={f} style={{ padding:"4px 10px", borderRadius:6, border:"none", cursor:"pointer", fontSize:11, fontFamily:"inherit", background:i===0?C.blueL:"rgba(0,0,0,.05)", color:i===0?"#fff":C.textDim }}>{f}</button>
                ))}
              </div>
            </div>
            {issues.map(({t,pct,c},i) => (
              <div key={i} style={{ padding:"10px 18px", borderBottom:i<issues.length-1?`1px solid ${C.border}`:"none" }}>
                <div style={{ color:C.blueL, fontSize:13, cursor:"pointer", marginBottom:4 }}>{t}</div>
                <div style={{ color:C.textDim, fontSize:11, marginBottom:5 }}>{pct}% of total issues</div>
                <ProgBar v={pct*4} col={c} h={4}/>
              </div>
            ))}
            <div style={{ padding:"12px 18px" }}>
              <button style={{ color:C.blueL, background:"none", border:`1px solid ${C.blueL}`, cursor:"pointer", padding:"7px 16px", borderRadius:8, fontSize:12, fontWeight:600, fontFamily:"inherit" }}>View all issues →</button>
            </div>
          </div>
        </div>
      </div>
      <div className="card" style={{ padding:"18px 22px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
          <div className="sg" style={{ color:C.text, fontSize:14, fontWeight:700 }}>Site Health History</div>
          <div style={{ display:"flex", gap:4 }}>
            {["Week","Month","Year"].map(p => (
              <button key={p} onClick={()=>setPeriod(p)} style={{ padding:"5px 12px", borderRadius:7, border:"none", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"inherit", background:period===p?C.blueL:"rgba(0,0,0,.05)", color:period===p?"#fff":C.textDim }}>{p}</button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={healthData} margin={{top:0,right:0,left:-20,bottom:0}}>
            <defs><linearGradient id="hg1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.blueL} stopOpacity={.15}/><stop offset="95%" stopColor={C.blueL} stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
            <XAxis dataKey="m" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
            <YAxis domain={[0,100]} tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}} formatter={v=>[`${v}%`,"Health"]}/>
            <Area type="monotone" dataKey="v" stroke={C.blueL} fill="url(#hg1)" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Domain Rank Tracker ────────────────────────────────────────────────
function DomainRankTracker() {
  const [newDomain, setNewDomain] = useState("");
  const domains = [
    { name:"RU9", url:"https://www.ru9.vn", avgPos:8.2, change:"+1.9", posData:[{n:"W1",pos:10},{n:"W2",pos:9},{n:"W3",pos:8},{n:"W4",pos:7},{n:"W5",pos:8}] },
    { name:"TOPONTECH", url:"topon.tech", avgPos:3.4, change:"-1.9", posData:[{n:"W1",pos:4},{n:"W2",pos:3},{n:"W3",pos:4},{n:"W4",pos:3},{n:"W5",pos:3}] },
    { name:"SEO Engine Boost", url:"seoengineboost.com", avgPos:12.6, change:"+3.2", posData:[{n:"W1",pos:16},{n:"W2",pos:14},{n:"W3",pos:13},{n:"W4",pos:12},{n:"W5",pos:11}] },
  ];
  const last24 = [{l:"Top 1",v:46},{l:"Top 5",v:32},{l:"Top 10",v:97},{l:"Top 20",v:46},{l:"Top 100",v:32},{l:">100",v:97}];
  const pieD = [{name:"Top 3",v:280,color:C.green},{name:"Top 10",v:400,color:C.blueL},{name:"Top 20",v:300,color:C.orange},{name:"Top 100",v:300,color:C.yellow},{name:">100",v:195,color:C.textDim}];
  return (
    <div className="fade" style={{ overflowY:"auto", height:"calc(100vh - 57px)", background:C.bg }}>
      {/* Add domain */}
      <div style={{ background:`linear-gradient(135deg,${C.blueL},${C.blue})`, padding:"22px 28px", textAlign:"center" }}>
        <h2 className="sg" style={{ color:"#fff", fontSize:18, fontWeight:800, marginBottom:8 }}>Have another website to track? Enter the domain</h2>
        <div style={{ display:"flex", gap:10, maxWidth:600, margin:"0 auto 12px" }}>
          <input value={newDomain} onChange={e=>setNewDomain(e.target.value)} placeholder="topon tech" style={{ flex:1, padding:"11px 16px", border:"none", borderRadius:10, fontSize:14, fontFamily:"inherit", outline:"none", color:C.text }}/>
          <button style={{ background:C.orange, color:"#fff", border:"none", cursor:"pointer", padding:"11px 28px", borderRadius:10, fontSize:14, fontWeight:700, fontFamily:"inherit" }}>Next</button>
        </div>
        <p style={{ color:"rgba(255,255,255,.7)", fontSize:12, lineHeight:1.6 }}>Create a campaign for any website and get keyword rankings, technical issues, social activity, and recommendations.</p>
      </div>
      <div style={{ padding:"20px 28px" }}>
        {domains.map((d,di) => (
          <div key={di} className="card" style={{ padding:"18px 22px", marginBottom:16 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <div style={{ width:32, height:32, borderRadius:8, background:`linear-gradient(135deg,${C.blueL},${C.blue})`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Target size={15} color="#fff"/>
              </div>
              <div>
                <div className="sg" style={{ color:C.text, fontSize:15, fontWeight:800 }}>{d.name}</div>
                <div style={{ color:C.textDim, fontSize:12 }}>{d.url}</div>
              </div>
              <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ color:C.green, fontSize:11, fontWeight:600 }}>✓ Updated: today at 9:23am</span>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 200px 180px", gap:16, alignItems:"start" }}>
              <div>
                <div style={{ color:C.textDim, fontSize:11, marginBottom:4 }}>AVERAGE POSITION</div>
                <div style={{ display:"flex", gap:12, marginBottom:10 }}>
                  {["Today","Last 7 days","Last 30 days"].map((t,i) => (
                    <button key={t} style={{ padding:"4px 10px", borderRadius:6, border:"none", cursor:"pointer", fontSize:11, fontFamily:"inherit", background:i===1?C.blueL:"rgba(0,0,0,.05)", color:i===1?"#fff":C.textDim }}>{t}</button>
                  ))}
                </div>
                <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:8 }}>
                  <span className="sg" style={{ color:C.text, fontSize:28, fontWeight:900 }}>{d.avgPos}</span>
                  <span style={{ color:parseFloat(d.change)>0?C.green:C.red, fontWeight:700, fontSize:13 }}>{d.change}</span>
                </div>
                <ResponsiveContainer width="100%" height={80}>
                  <LineChart data={d.posData} margin={{top:0,right:0,left:0,bottom:0}}>
                    <Line type="monotone" dataKey="pos" stroke={C.blueL} strokeWidth={2} dot={{fill:C.blueL,r:3}} legendType="none"/>
                    <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}} formatter={v=>[`#${v}`,"Position"]}/>
                  </LineChart>
                </ResponsiveContainer>
                <div style={{ marginTop:8 }}>
                  <div style={{ color:C.textDim, fontSize:10, fontWeight:700, letterSpacing:.5, marginBottom:6 }}>RANKING CHANGE</div>
                  {[["Last 24 hours","123 ↑","123 ↓","123"],["Last 7 days","123 ↑","123 ↓","123"],["Last 30 days","123 ↑","123 ↓","123"]].map(([l,u,d2,n],i) => (
                    <div key={i} style={{ display:"flex", gap:16, padding:"4px 0", borderBottom:i<2?`1px solid ${C.border}`:"none" }}>
                      <span style={{ color:C.textDim, fontSize:11, flex:1 }}>{l}</span>
                      <span style={{ color:C.green, fontSize:11, fontWeight:600 }}>{u}</span>
                      <span style={{ color:C.red, fontSize:11, fontWeight:600 }}>{d2}</span>
                      <span style={{ color:C.textMid, fontSize:11 }}>{n}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ color:C.textDim, fontSize:11, marginBottom:6 }}>LAST 24 HOURS</div>
                {last24.map(({l,v},i) => (
                  <div key={i} style={{ display:"flex", gap:8, marginBottom:5, alignItems:"center" }}>
                    <span style={{ color:C.textMid, fontSize:11, flex:1 }}>{l}</span>
                    <span style={{ color:C.blueL, fontWeight:700, fontSize:12 }}>{v}</span>
                    <span style={{ color:C.green, fontSize:10 }}>↑</span>
                    <span style={{ color:C.red, fontSize:10 }}>↓</span>
                  </div>
                ))}
              </div>
              <div>
                <ResponsiveContainer width="100%" height={120}>
                  <PieChart>
                    <Pie data={pieD} cx="50%" cy="50%" innerRadius={32} outerRadius={50} paddingAngle={2} dataKey="v">
                      {pieD.map((pd,i) => <Cell key={i} fill={pd.color}/>)}
                    </Pie>
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" style={{fontSize:14,fontWeight:800,fill:C.text,fontFamily:"Space Grotesk"}}>1475</text>
                    <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// ── Projects Dashboard ────────────────────────────────────────────────
function ProjectsDashboard() {
  const projects = [
    {
      name:"jiohealth.com",
      auditScore:92,auditTrend:"up",
      pages:1024,trackers:6,avgRank:2.3,rankTrend:"down",
      trackerItems:[
        {label:"JIO HEALTH",rank:82.1,kw:1500,freq:"Daily Update"},
        {label:"JIO HEALTH (1)",rank:50.7,kw:850,freq:"Weekly Update"},
        {label:"JIO HEALTH (Int...)",rank:98.4,kw:2500,freq:"Daily Update"},
        {label:"JIO HEALTH (2)",rank:54.3,kw:1234,freq:"Monthly Update"},
        {label:"JIO HEALTH (Cate)",rank:65.6,kw:2500,freq:"Daily Update"},
      ]
    },
    {name:"topon.tech",      auditScore:92,auditTrend:"up",pages:1024,trackers:6,avgRank:2.3,rankTrend:"down",trackerItems:[]},
    {name:"toponseek.com",   auditScore:92,auditTrend:"up",pages:1024,trackers:6,avgRank:2.3,rankTrend:"down",trackerItems:[]},
    {name:"tinhte.vn",       auditScore:92,auditTrend:"up",pages:1024,trackers:6,avgRank:2.3,rankTrend:"down",trackerItems:[]},
    {name:"genk.vn",         auditScore:92,auditTrend:"up",pages:1024,trackers:6,avgRank:2.3,rankTrend:"down",trackerItems:[]},
    {name:"seoengineboost.com",auditScore:76,auditTrend:"up",pages:19,trackers:3,avgRank:8.2,rankTrend:"up",trackerItems:[]},
  ];
  const [expanded, setExpanded] = useState("jiohealth.com");
  const [newProject, setNewProject] = useState("");

  return (
    <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)",background:C.bg}}>
      {/* Add Project banner */}
      <div style={{background:`linear-gradient(135deg,${C.blueL},${C.blue})`,padding:"22px 28px 18px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-40,right:-40,width:180,height:180,borderRadius:"50%",background:"rgba(255,255,255,.06)",pointerEvents:"none"}}/>
        <h2 className="sg" style={{color:"#fff",fontSize:16,fontWeight:800,marginBottom:14}}>Home › Project › Rank Checker</h2>
        <div style={{display:"flex",gap:10,maxWidth:640}}>
          <input value={newProject} onChange={e=>setNewProject(e.target.value)} placeholder="Enter domain to track"
            style={{flex:1,padding:"10px 16px",border:"none",borderRadius:10,fontSize:14,fontFamily:"inherit",outline:"none",color:C.text}}/>
          <button style={{background:C.orange,color:"#fff",border:"none",cursor:"pointer",padding:"10px 28px",borderRadius:10,fontSize:14,fontWeight:700,fontFamily:"inherit",boxShadow:`0 3px 10px ${C.orange}44`}}>Add Project</button>
        </div>
        <p style={{color:"rgba(255,255,255,.65)",fontSize:12,marginTop:8,lineHeight:1.6}}>
          Create a campaign for any website and get keyword rankings, technical issues, social activity, and on-page recommendations.
        </p>
        {/* Expiry warning */}
        <div style={{background:C.orange,borderRadius:8,padding:"8px 14px",marginTop:12,fontSize:12,color:"#fff",fontWeight:500}}>
          ⚠️ Your projects will expire in 24 hours since created! <span style={{fontWeight:800,textDecoration:"underline",cursor:"pointer"}}>Sign in</span> to save projects up to 7 days, get keywords ranking auto updated daily and much more!
        </div>
      </div>

      {/* Projects list */}
      <div style={{padding:"20px 28px"}}>
        {projects.map((proj,pi) => (
          <div key={proj.name} className="card" style={{marginBottom:14,overflow:"hidden"}}>
            {/* Project header */}
            <div onClick={()=>setExpanded(expanded===proj.name?null:proj.name)}
              style={{padding:"16px 20px",cursor:"pointer",display:"flex",alignItems:"center",gap:12,borderBottom:expanded===proj.name&&proj.trackerItems.length>0?`1px solid ${C.border}`:"none"}}>
              <div style={{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${C.blueL},${C.blue})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Target size={16} color="#fff"/>
              </div>
              <div style={{flex:1}}>
                <div className="sg" style={{color:C.blueL,fontSize:15,fontWeight:800}}>{proj.name}</div>
                <div style={{color:C.textDim,fontSize:11}}>https://www.{proj.name}</div>
              </div>
              {/* Metrics */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24,marginRight:16}}>
                {[
                  {l:"Audit Score",v:proj.auditScore,c:proj.auditScore>=80?C.green:proj.auditScore>=60?C.orange:C.red,trend:proj.auditTrend},
                  {l:"Pages",v:proj.pages.toLocaleString(),c:C.blueL,trend:null},
                  {l:"Rank Trackers",v:proj.trackers,c:C.blueL,trend:null},
                  {l:"Average Ranking",v:proj.avgRank,c:proj.avgRank<=5?C.green:proj.avgRank<=15?C.orange:C.red,trend:proj.rankTrend},
                ].map(({l,v,c,trend}) => (
                  <div key={l} style={{textAlign:"center"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
                      <span className="sg" style={{color:c,fontSize:22,fontWeight:900}}>{v}</span>
                      {trend && <span style={{color:trend==="up"?C.green:C.red,fontSize:12}}>{trend==="up"?"↑":"↓"}</span>}
                    </div>
                    <div style={{color:C.textDim,fontSize:10.5,fontWeight:600}}>{l}</div>
                  </div>
                ))}
              </div>
              <ChevronDown size={15} color={C.textDim} style={{transform:expanded===proj.name?"rotate(180deg)":"none",transition:"transform .2s"}}/>
            </div>

            {/* Rank tracker rows */}
            {expanded===proj.name && proj.trackerItems.length>0 && (
              <div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 120px 140px 160px 120px",padding:"8px 20px",background:C.bg,borderBottom:`1px solid ${C.border}`}}>
                  {["Rank tracker","","Avg. rank","No. of keyword","Frequency"].map(h => (
                    <div key={h} style={{color:C.textDim,fontSize:10.5,fontWeight:700,letterSpacing:.4}}>{h.toUpperCase()}</div>
                  ))}
                </div>
                {proj.trackerItems.map((item,i) => (
                  <div key={i} className="td" style={{display:"grid",gridTemplateColumns:"1fr 120px 140px 160px 120px",padding:"11px 20px",borderBottom:i<proj.trackerItems.length-1?`1px solid ${C.border}`:"none",alignItems:"center"}}>
                    <span style={{color:C.blueL,fontSize:13,fontWeight:600,cursor:"pointer"}}>{item.label}</span>
                    <div style={{display:"flex",gap:6}}>
                      <button style={{width:26,height:26,borderRadius:6,background:C.bgLight,border:`1px solid ${C.border}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Users size={11} color={C.textDim}/></button>
                      <button style={{width:26,height:26,borderRadius:6,background:C.redL,border:`1px solid ${C.red}30`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><X size={11} color={C.red}/></button>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:5}}>
                      <span className="sg" style={{color:item.rank<60?C.green:C.orange,fontSize:14,fontWeight:800}}>{item.rank}</span>
                      <span style={{color:C.green,fontSize:11}}>↑</span>
                    </div>
                    <span style={{color:C.textMid,fontSize:13}}>{item.kw.toLocaleString()}</span>
                    <span className="chip" style={{color:C.blueL,background:C.bluePale,fontSize:10.5}}>{item.freq}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Add new project card */}
        <div style={{border:`2px dashed ${C.border}`,borderRadius:14,padding:"24px",textAlign:"center",cursor:"pointer",background:"transparent",transition:"all .2s"}}
          className="td">
          <Plus size={20} color={C.textDim} style={{margin:"0 auto 8px"}}/>
          <div style={{color:C.textDim,fontSize:13,fontWeight:600}}>Add new project</div>
          <div style={{color:C.textDim,fontSize:11,marginTop:3}}>Track another domain's rankings</div>
        </div>
      </div>
    </div>
  );
}

// ── Article Checker ────────────────────────────────────────────────────
function ArticleChecker() {
  const [url, setUrl] = useState("");
  const [kw, setKw] = useState("dich vu seo");
  const [checked, setChecked] = useState(true);
  const [activeTab, setActiveTab] = useState("On-Page");
  const onPageTabs = ["On-Page","Diagnosis","Mobile"];
  const opportunities = [
    "Reduce server response times (TTFB) ← 0.95 s",
    "Preconnect to required origins ← 0.75 s",
    "Eliminate render-blocking resources ← 0.4 s",
    "Properly size images",
    "Serve images in next-gen formats",
    "Efficiently encode images",
    "Enable text compression",
    "Avoid multiple page redirects",
  ];
  const passedAudits = [
    "First Contentful Paint ← 2.1 s",
    "First Meaningful Paint ← 2.1 s",
    "Speed Index ← 4.7 s",
    "Time to Interactive ← 6.9 s",
  ];
  return (
    <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)",background:C.bg}}>
      {/* Header */}
      <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"16px 28px"}}>
        <div style={{color:C.textDim,fontSize:12,marginBottom:8}}>Home › Article Checker</div>
        <h2 className="sg" style={{color:C.text,fontSize:16,fontWeight:800,marginBottom:14}}>
          You want to track keywords (free up to 100) on your page? Enter your URL
        </h2>
        <div style={{display:"flex",gap:10}}>
          <div style={{flex:2,display:"flex",alignItems:"center",gap:8,background:C.bg,border:`1px solid ${C.border}`,borderRadius:9,padding:"8px 14px"}}>
            <Search size={13} color={C.textDim}/>
            <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Enter your URL and keyword to check"
              style={{flex:1,background:"transparent",border:"none",outline:"none",color:C.text,fontSize:13,fontFamily:"inherit"}}/>
          </div>
          <div style={{flex:1,display:"flex",alignItems:"center",gap:8,background:C.bg,border:`1px solid ${C.border}`,borderRadius:9,padding:"8px 14px"}}>
            <input value={kw} onChange={e=>setKw(e.target.value)} placeholder="Use keyword"
              style={{flex:1,background:"transparent",border:"none",outline:"none",color:C.text,fontSize:13,fontFamily:"inherit"}}/>
          </div>
          <button onClick={()=>setChecked(true)} style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"10px 28px",borderRadius:9,fontSize:13,fontWeight:700,fontFamily:"inherit"}}>CHECK</button>
        </div>
      </div>

      {checked && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 360px",gap:0,height:"calc(100% - 90px)"}}>
          {/* Left: Page info + audit */}
          <div style={{overflowY:"auto",padding:"20px 28px",borderRight:`1px solid ${C.border}`}}>
            {/* Page Info */}
            <div className="card" style={{padding:"14px 18px",marginBottom:14}}>
              <div style={{color:C.textDim,fontSize:10.5,fontWeight:700,letterSpacing:.5,marginBottom:8}}>PAGE INFO</div>
              <div style={{color:C.textDim,fontSize:11,marginBottom:2}}>June 23, 2020 • 12:00 AM</div>
              <div style={{color:C.blueL,fontSize:13,fontWeight:600,marginBottom:4,cursor:"pointer"}}>
                https://www.toponseek.com/dich-vu-seo/
              </div>
            </div>

            {/* Keyword to check */}
            <div className="card" style={{padding:"14px 18px",marginBottom:14}}>
              <div style={{color:C.textDim,fontSize:10.5,fontWeight:700,letterSpacing:.5,marginBottom:8}}>KEYWORDS TO CHECK</div>
              <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:C.blueL+"15",borderRadius:8,border:`1px solid ${C.blueL}30`}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:C.blueL}}/>
                <span style={{color:C.blueL,fontSize:13,fontWeight:600}}>{kw || "dich vu seo"}</span>
              </div>
            </div>

            {/* SEO Audit Scores */}
            <div className="card" style={{padding:"14px 18px",marginBottom:14}}>
              <div style={{color:C.textDim,fontSize:10.5,fontWeight:700,letterSpacing:.5,marginBottom:12}}>SEO AUDIT SCORES</div>
              <div style={{display:"flex",alignItems:"center",gap:16,justifyContent:"center"}}>
                {[{l:"Performance",v:95,c:C.green},{l:"Accessibility",v:100,c:C.green},{l:"Best Practices",v:77,c:C.orange},{l:"SEO",v:92,c:C.green}].map(({l,v,c}) => (
                  <div key={l} style={{textAlign:"center"}}>
                    <div style={{width:48,height:48,borderRadius:"50%",border:`4px solid ${c}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 6px"}}>
                      <span className="sg" style={{color:c,fontSize:14,fontWeight:900}}>{v}</span>
                    </div>
                    <div style={{color:C.textDim,fontSize:10}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostics */}
            <div className="card" style={{padding:"14px 18px",marginBottom:14}}>
              <div style={{color:C.textDim,fontSize:10.5,fontWeight:700,letterSpacing:.5,marginBottom:10}}>DIAGNOSIS</div>
              <div style={{display:"flex",gap:16,marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}><Check size={13} color={C.green}/><span style={{color:C.textMid,fontSize:12}}>Passed: <strong>10</strong></span></div>
                <div style={{display:"flex",alignItems:"center",gap:6}}><AlertCircle size={13} color={C.red}/><span style={{color:C.textMid,fontSize:12}}>Error: <strong>2</strong></span></div>
                <div style={{display:"flex",alignItems:"center",gap:6}}><AlertCircle size={13} color={C.yellow}/><span style={{color:C.textMid,fontSize:12}}>Warning: <strong>4</strong></span></div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
                {[{l:"Current Rank",v:"3"},{l:"Density",v:"3%"},{l:"Total Words",v:"3,948"},{l:"Plagiarism",v:"18"}].map(({l,v}) => (
                  <div key={l} style={{background:C.bg,borderRadius:8,padding:"10px 12px",border:`1px solid ${C.border}`,textAlign:"center"}}>
                    <div className="sg" style={{color:C.text,fontSize:18,fontWeight:900}}>{v}</div>
                    <div style={{color:C.textDim,fontSize:10,marginTop:2}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* On-Page Analysis */}
            <div className="card" style={{overflow:"hidden"}}>
              <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div className="sg" style={{color:C.text,fontSize:13,fontWeight:700}}>ON-PAGE</div>
                <button style={{color:C.blueL,background:"none",border:`1px solid ${C.blueL}`,cursor:"pointer",padding:"4px 12px",borderRadius:6,fontSize:11,fontWeight:600,fontFamily:"inherit"}}>View all ideas to rank →</button>
              </div>
              {/* Performance section */}
              <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                  <div style={{color:C.text,fontSize:13,fontWeight:700}}>PERFORMANCE</div>
                  <span style={{color:C.orange,fontSize:11}}>🔥</span>
                </div>
                <div style={{color:C.textDim,fontSize:10.5,fontWeight:700,letterSpacing:.5,marginBottom:8}}>METRIC</div>
                {[
                  {l:"First Contentful Paint",v:"0.1 s",c:C.green},
                  {l:"First Meaningful Paint",v:"2.1 s",c:C.green},
                  {l:"Speed Index",v:"4.7 s",c:C.orange},
                  {l:"Time to Interactive",v:"6.9 s",c:C.red},
                ].map(({l,v,c}) => (
                  <div key={l} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${C.border}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:c,flexShrink:0}}/>
                      <span style={{color:C.textMid,fontSize:12}}>{l}</span>
                    </div>
                    <span style={{color:c,fontSize:12,fontWeight:700}}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{padding:"14px 18px"}}>
                <div style={{color:C.textDim,fontSize:10.5,fontWeight:700,letterSpacing:.5,marginBottom:8}}>OPPORTUNITIES</div>
                {opportunities.slice(0,4).map((o,i) => (
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:6,marginBottom:7}}>
                    <AlertCircle size={12} color={C.orange} style={{flexShrink:0,marginTop:2}}/>
                    <span style={{color:C.textMid,fontSize:12,lineHeight:1.4}}>{o}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: On-Page / Diagnosis / Mobile tabs */}
          <div style={{overflowY:"auto",background:C.white}}>
            <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`}}>
              <div style={{color:C.textDim,fontSize:10.5,fontWeight:700,letterSpacing:.5,marginBottom:10}}>ON-PAGE</div>
              <div style={{display:"flex",gap:4}}>
                {onPageTabs.map(t => (
                  <button key={t} onClick={()=>setActiveTab(t)} style={{padding:"5px 12px",borderRadius:6,border:"none",cursor:"pointer",fontSize:12,fontWeight:activeTab===t?700:500,fontFamily:"inherit",background:activeTab===t?C.blueL:"rgba(0,0,0,.05)",color:activeTab===t?"#fff":C.textDim}}>{t}</button>
                ))}
              </div>
            </div>
            <div style={{padding:"14px 18px"}}>
              {/* Performance section */}
              <div style={{marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",background:C.bg,borderRadius:8,border:`1px solid ${C.border}`,cursor:"pointer",marginBottom:6}}>
                  <span style={{color:C.text,fontSize:12.5,fontWeight:700}}>Performance</span>
                  <ChevronDown size={13} color={C.textDim}/>
                </div>
                <div style={{paddingLeft:8}}>
                  {["First Contentful Paint","First Meaningful Paint","Speed Index","Time To First Byte","Time To Interactive","Total Blocking Time"].map((m,i) => (
                    <div key={i} style={{padding:"6px 10px",borderBottom:`1px solid ${C.border}`,fontSize:11.5,color:C.textMid,display:"flex",justifyContent:"space-between"}}>
                      <span>{m}</span>
                      <span style={{color:i<2?C.green:i<4?C.orange:C.red,fontWeight:600}}>{["2.1s","2.1s","4.7s","0.7s","6.9s","0.4s"][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",background:C.bg,borderRadius:8,border:`1px solid ${C.border}`,cursor:"pointer",marginBottom:6}}>
                  <span style={{color:C.text,fontSize:12.5,fontWeight:700}}>Opportunities</span>
                  <ChevronDown size={13} color={C.textDim}/>
                </div>
                {opportunities.slice(0,5).map((o,i) => (
                  <div key={i} style={{padding:"7px 10px",borderBottom:`1px solid ${C.border}`,fontSize:11.5,color:C.textMid,display:"flex",alignItems:"flex-start",gap:6}}>
                    <AlertCircle size={11} color={C.orange} style={{flexShrink:0,marginTop:2}}/>
                    <span>{o}</span>
                  </div>
                ))}
              </div>
              <div style={{marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",background:C.bg,borderRadius:8,border:`1px solid ${C.border}`,cursor:"pointer",marginBottom:6}}>
                  <span style={{color:C.text,fontSize:12.5,fontWeight:700}}>Diagnostics</span>
                  <ChevronDown size={13} color={C.textDim}/>
                </div>
              </div>
              <div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",background:C.bg,borderRadius:8,border:`1px solid ${C.border}`,cursor:"pointer",marginBottom:6}}>
                  <span style={{color:C.text,fontSize:12.5,fontWeight:700}}>Passed Audits ({passedAudits.length})</span>
                  <ChevronDown size={13} color={C.textDim}/>
                </div>
                {passedAudits.map((a,i) => (
                  <div key={i} style={{padding:"6px 10px",borderBottom:`1px solid ${C.border}`,fontSize:11.5,display:"flex",alignItems:"center",gap:6}}>
                    <Check size={11} color={C.green}/>
                    <span style={{color:C.textMid}}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Keywords Performance ───────────────────────────────────────────────
function KeywordsPerformance() {
  const [period, setPeriod] = useState("Last 7 days");
  const [search, setSearch] = useState("");
  const avgData = [{n:"W1",pos:10},{n:"W2",pos:9},{n:"W3",pos:8},{n:"W4",pos:8.2},{n:"W5",pos:7.8},{n:"W6",pos:8.2}];
  const last24 = [{l:"Top 1",v:46},{l:"Top 5",v:32},{l:"Top 10",v:97},{l:"Top 20",v:46},{l:"Top 100",v:32},{l:">100",v:97}];
  const pieD2 = [{name:"Top 3",v:280,color:C.green},{name:"Top 10",v:400,color:C.blueL},{name:"Top 20",v:300,color:C.orange},{name:"Top 100",v:295,color:C.yellow},{name:">100",v:200,color:"#CBD5E1"}];
  const winners = [
    {kw:"gym tai nha",domain:"cfly.com.vn",cur:3,prev:34},
    {kw:"abcve",domain:"abcve.com.vn",cur:3,prev:34},
    {kw:"gym lien Ba",domain:"def.com",cur:3,prev:34},
    {kw:"tap gem",domain:"abc.com.vn",cur:3,prev:34},
    {kw:"Phong tap",domain:"abc.com.vn",cur:3,prev:34},
    {kw:"Phong tap thanh pho Ho Chi Minh",domain:"abc.com.vn",cur:3,prev:34},
    {kw:"Cach tri tap gem",domain:"abc.com.vn",cur:3,prev:34},
    {kw:"Danxe nhem",domain:"abc.com.vn",cur:3,prev:34},
    {kw:"Yoga 7 ngay",domain:"abc.com.vn",cur:3,prev:34},
  ];
  const losers = [
    {kw:"Gym tai nha",domain:"cfly.com.vn",cur:3,prev:34},
    {kw:"alo.vn",domain:"alo.vn",cur:3,prev:34},
    {kw:"gym lien Ba",domain:"def.com",cur:5,prev:34},
    {kw:"Tap gem",domain:"abc.com.vn",cur:3,prev:34},
    {kw:"Phong tap",domain:"abc.com.vn",cur:3,prev:34},
    {kw:"Yoga 7 ngay",domain:"abc.com.vn",cur:3,prev:34},
  ];
  return (
    <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)",background:C.bg}}>
      {/* Domain header */}
      <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"16px 28px"}}>
        <div style={{color:C.textDim,fontSize:12,marginBottom:4}}>Home › Project › Dep365 › Rank report</div>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
          <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${C.blueL},${C.blue})`,display:"flex",alignItems:"center",justifyContent:"center"}}><Target size={14} color="#fff"/></div>
          <div>
            <div className="sg" style={{color:C.text,fontSize:16,fontWeight:800}}>seoengineboost.com</div>
            <div style={{display:"flex",gap:10,marginTop:2}}>
              <span className="chip" style={{color:"#fff",background:C.blueL,fontSize:10}}>125 client</span>
              <span style={{color:C.textDim,fontSize:11}}>seoengineboost.com</span>
              <span style={{color:C.textDim,fontSize:11}}>Total terms: 2294</span>
              <span style={{color:C.textDim,fontSize:11}}>Search engine: google.com.vn</span>
              <span style={{color:C.textDim,fontSize:11}}>Language: Vietnamese</span>
            </div>
          </div>
          <button style={{marginLeft:"auto",background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",padding:"6px 14px",borderRadius:8,fontSize:12,fontFamily:"inherit"}}>Share</button>
        </div>
        {/* Tabs */}
        <div style={{display:"flex",gap:0}}>
          {["Keywords Performance","Competitors","SEO Audit"].map((t,i) => (
            <button key={t} style={{padding:"10px 20px",border:"none",borderBottom:i===0?`2.5px solid ${C.blueL}`:"2.5px solid transparent",cursor:"pointer",fontSize:13,fontWeight:i===0?700:500,fontFamily:"inherit",background:"transparent",color:i===0?C.blueL:C.textMid}}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{padding:"20px 28px"}}>
        {/* Top stats */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 220px 200px",gap:16,marginBottom:20}}>
          {/* Average position */}
          <div className="card" style={{padding:"18px 22px"}}>
            <div style={{color:C.textDim,fontSize:10.5,fontWeight:700,letterSpacing:.5,marginBottom:10}}>AVERAGE POSITION</div>
            <div style={{display:"flex",gap:8,marginBottom:10}}>
              {[["Today",""],["Last 7 days","active"],["Last 30 days",""]].map(([l,a]) => (
                <button key={l} onClick={()=>setPeriod(l)} style={{padding:"4px 10px",borderRadius:6,border:"none",cursor:"pointer",fontSize:11,fontWeight:period===l?700:400,fontFamily:"inherit",background:period===l?C.blueL:"rgba(0,0,0,.05)",color:period===l?"#fff":C.textDim}}>{l}</button>
              ))}
            </div>
            <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:4}}>
              <span className="sg" style={{color:C.text,fontSize:34,fontWeight:900}}>8.2</span>
              <span style={{background:C.green,color:"#fff",fontSize:11,fontWeight:700,padding:"2px 7px",borderRadius:5}}>↑ 1.9</span>
            </div>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={avgData} margin={{top:0,right:0,left:0,bottom:0}}>
                <Line type="monotone" dataKey="pos" stroke={C.blueL} strokeWidth={2.5} dot={{fill:C.blueL,r:3}} legendType="none"/>
                <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}} formatter={v=>[`#${v}`,"Position"]}/>
              </LineChart>
            </ResponsiveContainer>
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:10,marginTop:8}}>
              <div style={{color:C.textDim,fontSize:10,fontWeight:700,letterSpacing:.5,marginBottom:6}}>RANKING CHANGE</div>
              {[["Last 24 hours"],["Last 7 days"],["Last 30 days"]].map(([l],i) => (
                <div key={i} style={{display:"flex",gap:12,padding:"4px 0",borderBottom:i<2?`1px solid ${C.border}`:"none",alignItems:"center"}}>
                  <span style={{color:C.textDim,fontSize:11,flex:1}}>{l}</span>
                  <span style={{color:C.green,fontSize:11,fontWeight:600}}>123 ↑</span>
                  <span style={{color:C.red,fontSize:11,fontWeight:600}}>123 ↓</span>
                  <span style={{color:C.textMid,fontSize:11}}>123</span>
                </div>
              ))}
            </div>
          </div>

          {/* Last 24 hours */}
          <div className="card" style={{padding:"16px 18px"}}>
            <div style={{color:C.textDim,fontSize:10.5,fontWeight:700,letterSpacing:.5,marginBottom:10}}>LAST 24 HOURS</div>
            {last24.map(({l,v},i) => (
              <div key={i} style={{display:"flex",gap:8,marginBottom:7,alignItems:"center"}}>
                <span style={{color:C.textMid,fontSize:11.5,flex:1}}>{l}</span>
                <span style={{color:C.blueL,fontWeight:800,fontSize:13}}>{v}</span>
                <span style={{color:C.green,fontSize:11}}>↑</span>
                <span style={{color:C.red,fontSize:11}}>↓</span>
              </div>
            ))}
          </div>

          {/* Pie */}
          <div className="card" style={{padding:"16px 18px",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{color:C.textDim,fontSize:10.5,fontWeight:700,letterSpacing:.5,marginBottom:8}}>DISTRIBUTION</div>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={pieD2} cx="50%" cy="50%" innerRadius={36} outerRadius={58} paddingAngle={2} dataKey="v">
                  {pieD2.map((pd,i) => <Cell key={i} fill={pd.color}/>)}
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" style={{fontSize:16,fontWeight:900,fill:C.text,fontFamily:"Space Grotesk"}}>1475</text>
                <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
              </PieChart>
            </ResponsiveContainer>
            {pieD2.map(({name,color}) => (
              <div key={name} style={{display:"flex",alignItems:"center",gap:6,marginBottom:3,width:"100%"}}>
                <div style={{width:8,height:8,borderRadius:2,background:color}}/>
                <span style={{color:C.textMid,fontSize:10.5}}>{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Keyword search + Add */}
        <div style={{display:"flex",gap:10,marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8,background:C.white,border:`1px solid ${C.border}`,borderRadius:9,padding:"7px 12px",flex:1}}>
            <Search size={13} color={C.textDim}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search for keywords" style={{flex:1,border:"none",outline:"none",fontSize:13,color:C.text,fontFamily:"inherit"}}/>
          </div>
          <button style={{background:C.blueL,color:"#fff",border:"none",cursor:"pointer",padding:"7px 16px",borderRadius:9,fontSize:13,fontWeight:700,fontFamily:"inherit",display:"flex",alignItems:"center",gap:6}}>
            <Plus size={13}/> Add new keyword
          </button>
          <button style={{background:"transparent",border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",padding:"7px 14px",borderRadius:9,fontSize:13,fontFamily:"inherit"}}>Export</button>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{color:C.textDim,fontSize:12}}>View mode</span>
            <select style={{border:`1px solid ${C.border}`,borderRadius:7,padding:"5px 10px",fontSize:12,fontFamily:"inherit",outline:"none",background:C.white}}>
              <option>Normal</option><option>Compact</option>
            </select>
          </div>
        </div>

        {/* Winner / Loser tables */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          {/* Winners */}
          <div className="card" style={{overflow:"hidden"}}>
            <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`,background:`${C.green}10`}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <TrendingUp size={15} color={C.green}/>
                <span className="sg" style={{color:C.green,fontSize:14,fontWeight:700}}>Winner: {winners.length} keywords</span>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",padding:"8px 14px",background:C.bg,borderBottom:`1px solid ${C.border}`}}>
              {["Keyword","Domain","Current","Yesterday"].map(h => <div key={h} style={{color:C.textDim,fontSize:10,fontWeight:700,letterSpacing:.4}}>{h.toUpperCase()}</div>)}
            </div>
            {winners.filter(w => !search || w.kw.toLowerCase().includes(search.toLowerCase())).map((w,i) => (
              <div key={i} className="td" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",padding:"9px 14px",borderBottom:i<winners.length-1?`1px solid ${C.border}`:"none",alignItems:"center"}}>
                <span style={{color:C.text,fontSize:12,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{w.kw}</span>
                <span style={{color:C.blueL,fontSize:11,cursor:"pointer"}}>{w.domain}</span>
                <span style={{color:C.green,fontWeight:700,fontSize:12}}>{w.cur}</span>
                <span style={{color:C.textDim,fontSize:12}}>{w.prev}</span>
              </div>
            ))}
          </div>

          {/* Losers */}
          <div className="card" style={{overflow:"hidden"}}>
            <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`,background:`${C.red}08`}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <TrendingDown size={15} color={C.red}/>
                <span className="sg" style={{color:C.red,fontSize:14,fontWeight:700}}>Loser: {losers.length} keywords</span>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",padding:"8px 14px",background:C.bg,borderBottom:`1px solid ${C.border}`}}>
              {["Keyword","Domain","Current","Yesterday"].map(h => <div key={h} style={{color:C.textDim,fontSize:10,fontWeight:700,letterSpacing:.4}}>{h.toUpperCase()}</div>)}
            </div>
            {losers.filter(l => !search || l.kw.toLowerCase().includes(search.toLowerCase())).map((l,i) => (
              <div key={i} className="td" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",padding:"9px 14px",borderBottom:i<losers.length-1?`1px solid ${C.border}`:"none",alignItems:"center"}}>
                <span style={{color:C.text,fontSize:12,fontWeight:500}}>{l.kw}</span>
                <span style={{color:C.blueL,fontSize:11,cursor:"pointer"}}>{l.domain}</span>
                <span style={{color:C.red,fontWeight:700,fontSize:12}}>{l.cur}</span>
                <span style={{color:C.textDim,fontSize:12}}>{l.prev}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <select style={{border:`1px solid ${C.border}`,borderRadius:7,padding:"5px 10px",fontSize:12,fontFamily:"inherit",outline:"none",background:C.white}}>
              <option>50</option><option>25</option><option>100</option>
            </select>
            <span style={{color:C.textDim,fontSize:12}}>terms per page</span>
          </div>
          <div style={{display:"flex",gap:4}}>
            <button style={{padding:"5px 12px",border:`1px solid ${C.border}`,borderRadius:5,background:"transparent",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>‹</button>
            <button style={{padding:"5px 10px",border:"none",borderRadius:5,background:C.blueL,color:"#fff",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit"}}>1</button>
            {[2,3,"...",7].map((p,i) => <button key={i} style={{padding:"5px 10px",border:`1px solid ${C.border}`,borderRadius:5,background:"transparent",cursor:"pointer",fontSize:12,fontFamily:"inherit",color:C.textMid}}>{p}</button>)}
            <button style={{padding:"5px 12px",border:`1px solid ${C.border}`,borderRadius:5,background:"transparent",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>›</button>
          </div>
        </div>
      </div>
    </div>
  );
}
// ── Screen Map ────────────────────────────────────────────────────────
const SCREENS = {
  crawl:               { C: CrawlDashboard,          title: "Dashboard",               sub: "Welcome to Boostly — your SEO command center" },
  dashboard:           { C: Dashboard,               title: "Analytics Overview",      sub: "SEO Engine Boost · Full platform metrics" },
  keyword:             { C: KeywordResearch,         title: "Keyword Research",        sub: "Discover high-value keywords & opportunities" },
  advancedkeywords:    { C: AdvancedKeywordResearch, title: "Advanced Keywords",       sub: "Filter by Long-tail, Low competition, High CPC" },
  competitive:         { C: CompetitiveResearch,     title: "Competitive Research",    sub: "Domain overview, keyword gaps & backlink comparison" },
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

// ── App ───────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("crawl");
  const [sub, setSub] = useState(null);
  const [view, setView] = useState("app");
  const [aiOpen, setAiOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const screen = SCREENS[active] || SCREENS.crawl;
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
      <div style={{ display: "flex", height: "100vh", background: C.bg, fontFamily: "'Manrope',sans-serif", overflow: "hidden", position: "relative" }}>
        <SidebarFull
          active={active}
          setActive={(id) => { setActive(id); setSub(null); }}
          sub={sub}
          setSub={setSub}
          openAI={aiOpen}
          setOpenAI={setAiOpen}
        />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Topbar */}
          <div style={{ padding: "0 24px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10, background: C.white, position: "sticky", top: 0, zIndex: 20, flexShrink: 0, height: 57 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 className="sg" style={{ color: C.text, fontSize: 15, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{screen.title}</h1>
              <p style={{ color: C.textDim, fontSize: 10.5 }}>{screen.sub}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 9, padding: "6px 10px", width: 180, flexShrink: 0 }}>
              <Search size={12} color={C.textDim} />
              <input placeholder="Search anything..." style={{ background: "transparent", border: "none", outline: "none", color: C.textMid, fontSize: 12, width: "100%", fontFamily: "inherit" }} />
            </div>
            <button onClick={() => setView("pricing")} style={{ background: C.orange, color: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: "7px 13px", borderRadius: 8, fontSize: 12, fontWeight: 700, fontFamily: "inherit", flexShrink: 0 }}>
              ⚡ Upgrade
            </button>
            <button onClick={() => setAiOpen(!aiOpen)} style={{ background: aiOpen?`linear-gradient(135deg,${C.blue},${C.blueL})`:"transparent", color: aiOpen?"#fff":C.blueL, border: `1px solid ${aiOpen?C.blueL:C.border}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, fontFamily: "inherit", flexShrink: 0 }}>
              <Bot size={13} /> AI Copilot
            </button>
            <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setNotifOpen(!notifOpen)}>
              <Bell size={17} color={C.textDim} />
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.orange, position: "absolute", top: -1, right: -1, border: "1.5px solid #fff" }} />
            </div>
            {notifOpen && (
              <div style={{ position: "absolute", top: 57, right: 16, width: 320, background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.12)", zIndex: 100, overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="sg" style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>Notifications</span>
                  <button onClick={() => setNotifOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={13} color={C.textDim} /></button>
                </div>
                {[
                  {icon:CheckCircle2,c:C.green,msg:"Jordan completed 'Homepage Redesign'",t:"2m ago"},
                  {icon:MessageSquare,c:C.blueL,msg:"Mahmoud mentioned you in #seo-team",t:"14m ago"},
                  {icon:AlertCircle,c:C.yellow,msg:"Task 'Facebook Ads Copy' is due tomorrow",t:"1h ago"},
                  {icon:Bot,c:C.blueL,msg:"AI summarized 24 messages in #content-writers",t:"2h ago"},
                  {icon:BarChart2,c:C.purple,msg:"Weekly SEO report ready for Dental Pro",t:"5h ago"},
                ].map(({icon:Icon,c,msg,t},i) => (
                  <div key={i} style={{ display: "flex", gap: 10, padding: "10px 16px", borderBottom: i<4?`1px solid ${C.border}`:"none", cursor: "pointer" }} className="td">
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: `${c}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={13} color={c}/></div>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: C.text, fontSize: 12 }}>{msg}</p>
                      <span style={{ color: C.textDim, fontSize: 10.5 }}>{t}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Av l="Y" size={30} />
          </div>
          <Screen onNavigate={(id) => { setActive(id); setSub(null); }} />
        </div>

        {/* Floating AI Copilot */}
        {aiOpen && <AICopilot onClose={() => setAiOpen(false)} />}
      </div>
    </>
  );
}
