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
  const [query, setQuery] = useState("dental implants");
  return (
    <div className="fade" style={{ overflowY: "auto", height: "calc(100vh - 57px)" }}>
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${C.border}`, background: C.white, display: "flex", gap: 10 }}>
        <div style={{ flex: 1, display: "flex", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 9, overflow: "hidden" }}>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter keyword..."
            style={{ flex: 1, padding: "9px 14px", background: "transparent", border: "none", outline: "none", color: C.text, fontSize: 13.5, fontFamily: "inherit" }} />
          <select style={{ background: "transparent", border: "none", outline: "none", color: C.textMid, fontSize: 12, padding: "0 12px", borderLeft: `1px solid ${C.border}`, cursor: "pointer", fontFamily: "inherit" }}>
            <option>All Locations</option><option>Philippines</option><option>United States</option>
          </select>
        </div>
        <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "10px 22px", borderRadius: 9, fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>Search</button>
        <button style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", padding: "10px 14px", borderRadius: 9, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}>
          <Filter size={13} /> Filters
        </button>
      </div>

      <div style={{ padding: "20px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { l: "Search Volume", v: "8,200", sub: "Monthly searches", c: C.blueL, icon: BarChart2 },
            { l: "Keyword Difficulty", v: "28", sub: "Low competition", c: C.green, icon: Target },
            { l: "CPC (Avg.)", v: "$4.20", sub: "Cost per click", c: C.orange, icon: BarChart },
            { l: "SERP Features", v: "6", sub: "Snippets, maps, ads", c: C.purple, icon: Star },
          ].map(({ l, v, sub, c, icon: Icon }) => (
            <div key={l} className="card" style={{ padding: "16px 18px" }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: `${c}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                <Icon size={15} color={c} />
              </div>
              <div className="sg" style={{ color: C.text, fontSize: 22, fontWeight: 800 }}>{v}</div>
              <div style={{ color: C.textDim, fontSize: 11, marginTop: 2 }}>{l}</div>
              <div style={{ color: c, fontSize: 11, marginTop: 2, fontWeight: 600 }}>{sub}</div>
            </div>
          ))}
        </div>

        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "12px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="sg" style={{ color: C.text, fontSize: 14, fontWeight: 700 }}>Keyword Suggestions</span>
            <button style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", padding: "5px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}>
              <Download size={12} /> Export
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2.5fr .8fr .6fr .7fr .8fr 100px", padding: "9px 18px", background: C.bg, borderBottom: `1px solid ${C.border}` }}>
            {["Keyword", "Volume", "KD", "CPC", "Intent", "Action"].map((h) => (
              <div key={h} style={{ color: C.textDim, fontSize: 10.5, fontWeight: 700, letterSpacing: .4 }}>{h.toUpperCase()}</div>
            ))}
          </div>
          {keywords.map(({ kw, pos, vol, kd, cpc, chg, intent }, i) => (
            <div key={kw} className="td" style={{
              display: "grid", gridTemplateColumns: "2.5fr .8fr .6fr .7fr .8fr 100px",
              padding: "11px 18px", borderBottom: i < keywords.length - 1 ? `1px solid ${C.border}` : "none", alignItems: "center"
            }}>
              <div>
                <div style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{kw}</div>
                <div style={{ color: C.textDim, fontSize: 10.5, marginTop: 2 }}>Rank #{pos} · {chg}</div>
              </div>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>{vol}</div>
              <div>
                <span className="chip" style={{ color: kd < 35 ? C.green : kd < 55 ? C.yellow : C.red, background: kd < 35 ? C.greenL : kd < 55 ? C.yellowL : C.redL }}>{kd}</span>
              </div>
              <div style={{ color: C.textMid, fontSize: 12.5 }}>{cpc}</div>
              <div><span className="chip" style={{ color: C.purple, background: C.purpleL }}>{intent}</span></div>
              <div style={{ display: "flex", gap: 5 }}>
                <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "5px 10px", borderRadius: 7, fontSize: 11, fontWeight: 700, fontFamily: "inherit" }}>Track</button>
                <button style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", padding: "5px 8px", borderRadius: 7, fontSize: 11, display: "flex", fontFamily: "inherit" }}>
                  <Plus size={11} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
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

// ── Backlink Research ─────────────────────────────────────────────────
function BacklinkResearch() {
  return (
    <div className="fade" style={{ overflowY: "auto", height: "calc(100vh - 57px)" }}>
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${C.border}`, background: C.white, display: "flex", gap: 10 }}>
        <div style={{ flex: 1, display: "flex", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 9, overflow: "hidden" }}>
          <input defaultValue="seoengineboost.com" style={{ flex: 1, padding: "9px 14px", background: "transparent", border: "none", outline: "none", color: C.text, fontSize: 13, fontFamily: "inherit" }} />
        </div>
        <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "10px 22px", borderRadius: 9, fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>Analyze</button>
      </div>

      <div style={{ padding: "20px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 18 }}>
          {[
            { l: "Total Backlinks", v: "1,847", c: C.blueL, icon: Link2 },
            { l: "Referring Domains", v: "312", c: C.orange, icon: Globe },
            { l: "Domain Rating", v: "42", c: C.green, icon: Shield },
            { l: "Dofollow Links", v: "1,204", c: C.purple, icon: ArrowUpRight },
            { l: "New (30 days)", v: "+124", c: C.green, icon: TrendingUp },
          ].map(({ l, v, c, icon: Icon }) => (
            <div key={l} className="card ch" style={{ padding: "16px 16px" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${c}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                <Icon size={14} color={c} />
              </div>
              <div className="sg" style={{ color: C.text, fontSize: 22, fontWeight: 800 }}>{v}</div>
              <div style={{ color: C.textDim, fontSize: 11, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>

        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "12px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="sg" style={{ color: C.text, fontSize: 14, fontWeight: 700 }}>Backlink Profile</span>
            <button style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", padding: "5px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}>
              <Download size={12} /> Export
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr .6fr .6fr 1.5fr .8fr .8fr", padding: "9px 18px", background: C.bg, borderBottom: `1px solid ${C.border}` }}>
            {["Referring Domain", "DR", "Links", "Anchor Text", "Type", "Date"].map((h) => (
              <div key={h} style={{ color: C.textDim, fontSize: 10.5, fontWeight: 700, letterSpacing: .4 }}>{h.toUpperCase()}</div>
            ))}
          </div>
          {backlinks.map(({ domain, dr, links, anchor, type, date }, i) => (
            <div key={domain} className="td" style={{ display: "grid", gridTemplateColumns: "2fr .6fr .6fr 1.5fr .8fr .8fr", padding: "12px 18px", borderBottom: i < backlinks.length - 1 ? `1px solid ${C.border}` : "none", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: 6, background: C.bgLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Globe size={11} color={C.blueL} />
                </div>
                <span style={{ color: C.blueL, fontSize: 12.5, fontWeight: 600 }}>{domain}</span>
              </div>
              <div>
                <span style={{ background: `${dr >= 85 ? C.green : dr >= 70 ? C.blueL : C.yellow}18`, color: dr >= 85 ? C.green : dr >= 70 ? C.blueL : C.yellow, padding: "2px 7px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{dr}</span>
              </div>
              <div style={{ color: C.textMid, fontSize: 12.5 }}>{links}</div>
              <div style={{ color: C.textMid, fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{anchor}</div>
              <div>
                <span className="chip" style={{ color: type === "Dofollow" ? C.green : C.textDim, background: type === "Dofollow" ? C.greenL : "#F1F5F9" }}>{type}</span>
              </div>
              <div style={{ color: C.textDim, fontSize: 11.5 }}>{date}</div>
            </div>
          ))}
        </div>
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
  const tabs = [
    { id: "profile", icon: Users, l: "Profile" },
    { id: "workspace", icon: Briefcase, l: "Workspace" },
    { id: "notifications", icon: Bell, l: "Notifications" },
    { id: "integrations", icon: Cpu, l: "Integrations" },
    { id: "billing", icon: BarChart, l: "Billing" },
    { id: "security", icon: Shield, l: "Security" },
  ];
  return (
    <div className="fade" style={{ display: "flex", height: "calc(100vh - 57px)", overflow: "hidden" }}>
      <div style={{ width: 190, background: C.white, borderRight: `1px solid ${C.border}`, padding: "14px 8px" }}>
        <div style={{ color: C.textDim, fontSize: 9.5, fontWeight: 700, letterSpacing: 1.2, padding: "0 8px", marginBottom: 5 }}>SETTINGS</div>
        {tabs.map(({ id, icon: Icon, l }) => (
          <div key={id} className={`nav${tab === id ? " on" : ""}`} onClick={() => setTab(id)}>
            <Icon size={14} />{l}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "26px 32px", background: C.bg }}>
        {tab === "profile" && (
          <div>
            <div className="sg" style={{ color: C.text, fontSize: 18, fontWeight: 800, marginBottom: 5 }}>Profile Settings</div>
            <p style={{ color: C.textDim, fontSize: 13, marginBottom: 22 }}>Manage your personal account details</p>
            <div className="card" style={{ padding: "22px 24px", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 22 }}>
                <Av l="Y" size={68} />
                <div>
                  <div style={{ color: C.text, fontSize: 15, fontWeight: 700, marginBottom: 3 }}>Your Account</div>
                  <div style={{ color: C.textDim, fontSize: 12, marginBottom: 10 }}>admin@boostly.app · Pro Plan</div>
                  <button style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, cursor: "pointer", padding: "6px 14px", borderRadius: 8, fontSize: 12, fontFamily: "inherit" }}>Change Avatar</button>
                </div>
              </div>
              {[{ l: "Full Name", v: "Your Name" }, { l: "Email", v: "admin@boostly.app" }, { l: "Role", v: "Admin" }, { l: "Time Zone", v: "Asia/Manila (UTC+8)" }].map(({ l, v }) => (
                <div key={l} style={{ marginBottom: 14 }}>
                  <label style={{ color: C.textMid, fontSize: 12, fontWeight: 600, display: "block", marginBottom: 5 }}>{l}</label>
                  <input defaultValue={v} style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 13px", color: C.text, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
                </div>
              ))}
              <button style={{ background: C.blueL, color: "#fff", border: "none", cursor: "pointer", padding: "9px 22px", borderRadius: 9, fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>Save Changes</button>
            </div>
          </div>
        )}
        {tab === "integrations" && (
          <div>
            <div className="sg" style={{ color: C.text, fontSize: 18, fontWeight: 800, marginBottom: 5 }}>Integrations</div>
            <p style={{ color: C.textDim, fontSize: 13, marginBottom: 22 }}>Connect Boostly with your tools</p>
            {[
              { n: "Semrush", d: "Import keyword data & audits", connected: false },
              { n: "Google Analytics 4", d: "Traffic & conversion tracking", connected: true },
              { n: "Slack", d: "Sync notifications & messages", connected: true },
              { n: "Google Search Console", d: "Rankings & indexation data", connected: false },
              { n: "Ahrefs", d: "Backlink analysis", connected: false },
              { n: "WordPress", d: "One-click content publishing", connected: true },
            ].map(({ n, d, connected }) => (
              <div key={n} className="card" style={{ padding: "14px 18px", marginBottom: 10, display: "flex", alignItems: "center", gap: 14, border: connected ? `1px solid ${C.green}40` : `1px solid ${C.border}` }}>
                <div style={{ width: 38, height: 38, borderRadius: 9, background: C.bgLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Globe size={16} color={C.blueL} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>{n}</div>
                  <div style={{ color: C.textDim, fontSize: 11.5, marginTop: 1 }}>{d}</div>
                </div>
                <button style={{ padding: "7px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit", background: connected ? C.greenL : C.blueL, color: connected ? C.green : "#fff" }}>
                  {connected ? "Connected ✓" : "Connect"}
                </button>
              </div>
            ))}
          </div>
        )}
        {!["profile", "integrations"].includes(tab) && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50%", textAlign: "center" }}>
            <Settings size={40} color={C.border} style={{ marginBottom: 14 }} />
            <div className="sg" style={{ color: C.textMid, fontSize: 16, fontWeight: 700, marginBottom: 5 }}>
              {tabs.find((t) => t.id === tab)?.l} Settings
            </div>
            <p style={{ color: C.textDim, fontSize: 13 }}>Configuration options coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Screen Map ────────────────────────────────────────────────────────
const SCREENS = {
  dashboard:   { C: Dashboard,         title: "Dashboard",               sub: "SEO Engine Boost · Boostly Platform" },
  keyword:     { C: KeywordResearch,   title: "Keyword Research",        sub: "Discover high-value keywords" },
  competitive: { C: Dashboard,         title: "Competitive Research",    sub: "Domain overview & keyword gaps" },
  backlink:    { C: BacklinkResearch,  title: "Backlink Research",       sub: "Monitor your full backlink profile" },
  onpage:      { C: OnPageAudit,       title: "On Page & Tech Audit",    sub: "AI-powered SEO health check" },
  rank:        { C: Dashboard,         title: "Rank Tracking",           sub: "Track keyword positions" },
  messages:    { C: Messages,          title: "Messages",                sub: "Team chat · AI-powered" },
  tasks:       { C: Tasks,             title: "Tasks & Projects",        sub: "Kanban board — plan and ship" },
  clients:     { C: Clients,           title: "Clients",                 sub: "Manage all client projects" },
  calendar:    { C: Dashboard,         title: "Calendar",                sub: "Campaign planner" },
  settings:    { C: SettingsView,      title: "Settings",                sub: "Account & integrations" },
};

// ── App ───────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("dashboard");
  const [sub, setSub] = useState(null);
  const screen = SCREENS[active] || SCREENS.dashboard;
  const Screen = screen.C;

  return (
    <>
      <style>{CSS}</style>
      <div style={{ display: "flex", height: "100vh", background: C.bg, fontFamily: "'Manrope',sans-serif", overflow: "hidden" }}>
        <Sidebar active={active} setActive={setActive} sub={sub} setSub={setSub} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <Topbar title={screen.title} sub={screen.sub} />
          <Screen />
        </div>
      </div>
    </>
  );
}
