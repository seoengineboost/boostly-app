import { useState } from "react";
import {
  LayoutDashboard, Search, BarChart2, Globe, Link2, FileSearch,
  TrendingUp, TrendingDown, MessageSquare, CheckSquare, Users, Calendar,
  Bell, Plus, ChevronDown, ChevronRight, MoreHorizontal, Send,
  Paperclip, Smile, Video, Phone, Hash, Settings, Moon, Sun,
  AlertCircle, Clock, Target, Zap, ArrowRight, Filter, Tag, X,
  Edit2, Eye, Download, Sparkles, Bot, FileText, Image,
  AtSign, Mic, UserPlus, Briefcase, Shield, Layers, Inbox,
  Share2, PlayCircle, CheckCircle2, LogOut, HelpCircle,
  ExternalLink, Activity, PieChart, Cpu, RefreshCw, Star,
  ChevronLeft, SortAsc, Kanban, AlignLeft, CalendarCheck,
  Pin, BarChart, Key, Workflow, Award, Package, Radio,
  BookOpen, Sliders, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import {
  AreaChart, Area, BarChart as RBar, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line,
  PieChart as RPie, Pie, Cell
} from "recharts";

/* ══════════════ BRAND TOKENS — exact seoengineboost.com ══════════════ */
const C = {
  // From website: white bg hero, dark navy sections, orange CTAs, blue links
  white:    "#FFFFFF",
  bg:       "#F7F9FC",        // light app background
  bgCard:   "#FFFFFF",        // card white
  bgLight:  "#EEF3FB",        // very light blue tint
  navy:     "#0A1628",        // dark navy (footer/dark sections)
  navyMid:  "#0F2348",        // sidebar dark
  navyCard: "#132A52",        // dark card
  blue:     "#1A4FB5",        // primary blue (website blue)
  blueLight:"#2563EB",        // bright blue buttons
  bluePale: "#DBEAFE",        // very light blue
  orange:   "#F97316",        // primary orange (CTAs)
  orangeL:  "#FED7AA",        // light orange
  text:     "#1E293B",        // dark text
  textMid:  "#475569",        // mid text
  textDim:  "#94A3B8",        // dim text
  border:   "#E2E8F0",        // borders
  borderB:  "rgba(255,255,255,0.08)", // dark bg borders
  green:    "#16A34A",
  greenL:   "#DCFCE7",
  red:      "#DC2626",
  redL:     "#FEE2E2",
  yellow:   "#D97706",
  yellowL:  "#FEF3C7",
  purple:   "#7C3AED",
  purpleL:  "#EDE9FE",
};

/* ══════════════ GLOBAL STYLES ══════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Manrope',sans-serif;background:#F7F9FC;}
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:4px;}
.sgt{font-family:'Space Grotesk',sans-serif;}
.fade{animation:fadeIn 0.3s ease;}
@keyframes fadeIn{from{opacity:0;transform:translateY(5px);}to{opacity:1;transform:translateY(0);}}
.hl{transition:all 0.15s ease;}
.hl:hover{background:#F1F5F9 !important;}
.btn-blue{background:#2563EB;color:#fff;border:none;cursor:pointer;font-family:'Manrope',sans-serif;font-weight:700;transition:all 0.15s;border-radius:8px;}
.btn-blue:hover{background:#1D4ED8;}
.btn-orange{background:#F97316;color:#fff;border:none;cursor:pointer;font-family:'Manrope',sans-serif;font-weight:700;transition:all 0.15s;border-radius:8px;}
.btn-orange:hover{background:#EA6C0A;}
.btn-ghost{background:transparent;border:1px solid #E2E8F0;color:#475569;cursor:pointer;font-family:'Manrope',sans-serif;font-weight:600;transition:all 0.15s;border-radius:8px;}
.btn-ghost:hover{background:#F1F5F9;border-color:#CBD5E1;}
.nav-item{display:flex;align-items:center;gap:9px;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:500;color:#64748B;transition:all 0.12s;user-select:none;}
.nav-item:hover{background:#EEF3FB;color:#1A4FB5;}
.nav-item.on{background:#DBEAFE;color:#1A4FB5;font-weight:700;}
.nav-sub{display:flex;align-items:center;gap:8px;padding:6px 12px 6px 32px;border-radius:6px;cursor:pointer;font-size:12px;color:#64748B;transition:all 0.12s;}
.nav-sub:hover{color:#1A4FB5;}
.nav-sub.on{color:#1A4FB5;font-weight:600;}
.card{background:#fff;border:1px solid #E2E8F0;border-radius:12px;}
.card-h{transition:all 0.15s;}.card-h:hover{box-shadow:0 4px 16px rgba(37,99,235,0.10);transform:translateY(-1px);}
.chip{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;}
.pulse{animation:pls 1.8s ease-in-out infinite;}
@keyframes pls{0%,100%{opacity:1}50%{opacity:.3}}
.td{transition:background 0.1s;}
.td:hover{background:#F8FAFC;}
.tab{padding:8px 14px;border-radius:7px;font-size:12px;font-weight:600;cursor:pointer;border:none;font-family:inherit;transition:all .15s;}
.kcard{background:#fff;border:1px solid #E2E8F0;border-radius:10px;padding:12px;margin-bottom:8px;cursor:pointer;transition:all .15s;}
.kcard:hover{border-color:#2563EB;box-shadow:0 2px 8px rgba(37,99,235,.08);}
.typing-dot{width:6px;height:6px;border-radius:50%;background:#94A3B8;animation:td 1.2s infinite;}
@keyframes td{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
`;

/* ══════════════ DATA ══════════════ */
const trafficD=[
  {m:"Jan",organic:3800,paid:1900,referral:1200},
  {m:"Feb",organic:5100,paid:2400,referral:1700},
  {m:"Mar",organic:4600,paid:2800,referral:1500},
  {m:"Apr",organic:6800,paid:3400,referral:2200},
  {m:"May",organic:5900,paid:3800,referral:2000},
  {m:"Jun",organic:8200,paid:4200,referral:2800},
  {m:"Jul",organic:9000,paid:4800,referral:3200},
];
const rankD=[
  {n:"Wk1",pos:22},{n:"Wk2",pos:18},{n:"Wk3",pos:13},
  {n:"Wk4",pos:10},{n:"Wk5",pos:8},{n:"Wk6",pos:5},{n:"Wk7",pos:4},
];
const pieD=[
  {name:"Top 3",v:12},{name:"Top 10",v:38},{name:"Top 30",v:61},{name:"Unranked",v:89}
];
const PIE_C=[C.green,C.blueLight,C.yellow,C.textDim];

const keywords=[
  {kw:"dental implants near me",pos:4,vol:"8,200",kd:28,cpc:"$4.20",trend:[40,55,48,60,58,72,80],chg:"+3",intent:"Commercial"},
  {kw:"best SEO tools 2026",pos:7,vol:"5,100",kd:42,cpc:"$6.80",trend:[30,28,35,40,38,50,55],chg:"+5",intent:"Informational"},
  {kw:"agency project management",pos:11,vol:"3,400",kd:35,cpc:"$3.50",trend:[60,55,50,48,45,40,38],chg:"-2",intent:"Navigational"},
  {kw:"marketing collaboration tool",pos:15,vol:"2,900",kd:31,cpc:"$5.10",trend:[20,25,30,28,35,42,48],chg:"+4",intent:"Commercial"},
  {kw:"content marketing software",pos:19,vol:"6,700",kd:58,cpc:"$8.20",trend:[18,20,22,25,24,28,30],chg:"+1",intent:"Commercial"},
  {kw:"SEO reporting dashboard",pos:6,vol:"4,100",kd:29,cpc:"$5.60",trend:[35,40,45,52,60,68,75],chg:"+8",intent:"Commercial"},
  {kw:"task management for agencies",pos:9,vol:"3,800",kd:44,cpc:"$4.90",trend:[50,48,46,44,43,41,39],chg:"-1",intent:"Commercial"},
];
const backlinks=[
  {domain:"hubspot.com",dr:93,links:142,anchor:"SEO tools comparison",type:"Dofollow",date:"May 2"},
  {domain:"searchengineland.com",dr:88,links:67,anchor:"boostly platform",type:"Dofollow",date:"Apr 29"},
  {domain:"moz.com",dr:91,links:23,anchor:"marketing workspace",type:"Nofollow",date:"Apr 25"},
  {domain:"semrush.com",dr:95,links:8,anchor:"agency SEO tool",type:"Dofollow",date:"Apr 20"},
  {domain:"ahrefs.com",dr:90,links:15,anchor:"seo platform review",type:"Dofollow",date:"Apr 18"},
  {domain:"techcrunch.com",dr:94,links:3,anchor:"SEO Engine Boost",type:"Dofollow",date:"Apr 15"},
];
const auditItems=[
  {label:"Title Tag",status:"error",desc:"Missing on 3 pages",fix:true},
  {label:"Meta Description",status:"warning",desc:"Too short on 7 pages (under 120 chars)",fix:true},
  {label:"H1 Tags",status:"ok",desc:"All pages have H1 tags ✓"},
  {label:"Image Alt Text",status:"error",desc:"48 images missing alt attributes",fix:true},
  {label:"Page Speed",status:"warning",desc:"Avg load time 3.2s — optimize images",fix:true},
  {label:"Mobile Friendly",status:"ok",desc:"All pages pass mobile usability test ✓"},
  {label:"Canonical Tags",status:"ok",desc:"Canonical URLs properly set ✓"},
  {label:"Broken Links",status:"error",desc:"12 broken internal links found",fix:true},
  {label:"SSL Certificate",status:"ok",desc:"Valid SSL — expires Aug 2026 ✓"},
  {label:"Sitemap",status:"warning",desc:"Sitemap missing 14 new pages",fix:true},
];
const clients=[
  {n:"Dental Pro Clinic",av:"D",status:"active",tasks:14,done:9,rev:"$4,200",health:92,last:"2h ago"},
  {n:"TechFlow Agency",av:"T",status:"active",tasks:22,done:18,rev:"$6,800",health:78,last:"1d ago"},
  {n:"GreenLeaf Studios",av:"G",status:"review",tasks:8,done:4,rev:"$2,100",health:55,last:"3d ago"},
  {n:"Urban Eats Brand",av:"U",status:"active",tasks:17,done:17,rev:"$3,900",health:100,last:"5h ago"},
  {n:"Nexus Consulting",av:"N",status:"paused",tasks:11,done:6,rev:"$5,100",health:40,last:"2w ago"},
  {n:"Bright Media Co.",av:"B",status:"active",tasks:19,done:14,rev:"$7,300",health:88,last:"3h ago"},
];
const kanban={
  todo:{label:"To Do",c:C.textDim,tasks:[
    {id:1,title:"Research competitor SEO strategies",tags:["SEO","Research"],pri:"high",avs:["M","A"],due:"May 5",cmts:3},
    {id:2,title:"Design email nurture sequence",tags:["Email"],pri:"medium",avs:["S"],due:"May 8",cmts:1},
    {id:3,title:"Setup Google Analytics 4",tags:["Analytics"],pri:"low",avs:["J","M"],due:"May 12",cmts:0},
  ]},
  inprog:{label:"In Progress",c:C.blueLight,tasks:[
    {id:4,title:"Keyword clustering tool phase 2",tags:["SEO","Dev"],pri:"high",avs:["M"],due:"May 3",cmts:7,prog:65},
    {id:5,title:"Client reporting dashboard PDF",tags:["Reports"],pri:"high",avs:["A","S"],due:"May 4",cmts:4,prog:40},
    {id:6,title:"Q2 blog content — 6 articles",tags:["Content"],pri:"medium",avs:["J"],due:"May 6",cmts:2,prog:80},
  ]},
  review:{label:"In Review",c:C.yellow,tasks:[
    {id:7,title:"Homepage redesign mockups",tags:["Design"],pri:"high",avs:["M","J"],due:"May 2",cmts:12},
    {id:8,title:"Facebook Ads copy — Q2",tags:["Ads"],pri:"medium",avs:["A"],due:"May 3",cmts:5},
  ]},
  done:{label:"Done",c:C.green,tasks:[
    {id:9,title:"Full backlink profile audit",tags:["SEO"],pri:"medium",avs:["S"],due:"Apr 30",cmts:8},
    {id:10,title:"Chat-to-task integration v1",tags:["Dev"],pri:"high",avs:["M"],due:"Apr 28",cmts:15},
  ]},
};
const msgs=[
  {id:1,user:"Mahmoud",av:"M",text:"Hey team! Just finished keyword research for Dental Pro. Found 340+ keywords 🎉",time:"9:14 AM",mine:false},
  {id:2,user:"Aisha",av:"A",text:"Amazing! Any high-volume low-competition clusters?",time:"9:16 AM",mine:false},
  {id:3,user:"Me",av:"Y",text:"Yes — 'dental implants near me': 8,200/mo, KD 28. Sharing sheet now 📊",time:"9:18 AM",mine:true},
  {id:4,user:"Sam",av:"S",text:"🔥 Gold. Should we convert these to content tasks?",time:"9:20 AM",mine:false},
  {id:5,user:"Me",av:"Y",text:"Yes — using Boostly AI chat-to-task feature now ✨",time:"9:21 AM",mine:true},
];
const channels=[
  {n:"general",u:3},{n:"seo-team",u:0},{n:"content-writers",u:12},
  {n:"dev-updates",u:1},{n:"client-dental",u:0},{n:"marketing",u:5},
];

/* ══════════════ MICRO COMPONENTS ══════════════ */
const Av=({l,size=32,dark=false})=>(
  <div style={{width:size,height:size,borderRadius:"50%",
    background:dark?`linear-gradient(135deg,${C.navyMid},${C.navy})`:`linear-gradient(135deg,${C.blueLight},${C.blue})`,
    display:"flex",alignItems:"center",justifyContent:"center",
    color:"#fff",fontSize:size*.38,fontWeight:700,flexShrink:0,fontFamily:"Space Grotesk"
  }}>{l}</div>
);

const ScoreBadge=({score,size=52})=>{
  const c=score>=80?C.green:score>=60?C.yellow:C.red;
  const r=size*.4;
  const circ=2*Math.PI*r;
  const off=circ*(1-score/100);
  return(
    <div style={{position:"relative",width:size,height:size,flexShrink:0}}>
      <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E2E8F0" strokeWidth={size*.1}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={c} strokeWidth={size*.1}
          strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"/>
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
        color:c,fontWeight:800,fontSize:size*.28,fontFamily:"Space Grotesk"}}>{score}</div>
    </div>
  );
};

const PriBadge=({p})=>{
  const m={high:[C.red,C.redL,"High"],medium:[C.yellow,C.yellowL,"Med"],low:[C.green,C.greenL,"Low"]};
  const [c,bg,l]=m[p]||m.low;
  return<span className="chip" style={{color:c,background:bg}}>{l}</span>;
};

const Prog=({v,c=C.blueLight,h=5})=>(
  <div style={{background:"#E2E8F0",borderRadius:10,height:h,overflow:"hidden"}}>
    <div style={{width:`${v}%`,height:"100%",background:c,borderRadius:10,transition:"width .5s"}}/>
  </div>
);

const MiniChart=({data,c=C.blueLight})=>(
  <svg width={60} height={22} viewBox="0 0 60 22">
    {data.map((_,i)=>{
      if(i===data.length-1)return null;
      const x1=i*(60/(data.length-1)),y1=22-((data[i]/100)*18+2);
      const x2=(i+1)*(60/(data.length-1)),y2=22-((data[i+1]/100)*18+2);
      return<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={1.5} strokeLinecap="round"/>;
    })}
  </svg>
);

/* ══════════════ SIDEBAR ══════════════ */
const Sidebar=({active,setActive,sub,setSub})=>{
  const seoNav=[
    {id:"dashboard",icon:LayoutDashboard,label:"Dashboard"},
    {id:"rank",icon:TrendingUp,label:"Rank Tracking",
      subs:[{id:"rank-dashboard",l:"Dashboard"},{id:"rank-tracking",l:"Rank Tracking"}]},
    {id:"competitive",icon:Globe,label:"Competitive Research",
      subs:[{id:"domain-overview",l:"Domain Overview"},{id:"keyword-gap",l:"Keyword Gap"},{id:"backlink-gap",l:"Backlink Gap"}]},
    {id:"keyword",icon:Search,label:"Keyword Research",
      subs:[{id:"kw-overview",l:"Keyword Overview"},{id:"kw-ideas",l:"Keyword Ideas"},{id:"content-ideas",l:"Content Ideas"}]},
    {id:"backlink",icon:Link2,label:"Backlink Research"},
    {id:"onpage",icon:FileSearch,label:"On Page & Tech Audit"},
  ];
  const toolNav=[
    {id:"messages",icon:MessageSquare,label:"Messages",badge:17},
    {id:"tasks",icon:CheckSquare,label:"Tasks"},
    {id:"clients",icon:Users,label:"Clients"},
    {id:"calendar",icon:Calendar,label:"Calendar"},
    {id:"settings",icon:Settings,label:"Settings"},
  ];
  return(
    <div style={{width:212,background:C.white,borderRight:`1px solid ${C.border}`,display:"flex",
      flexDirection:"column",height:"100vh",position:"sticky",top:0,flexShrink:0,overflowY:"auto"}}>
      {/* Logo */}
      <div style={{padding:"16px 14px 12px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <div style={{width:34,height:34,borderRadius:10,
            background:`linear-gradient(135deg,${C.orange},${C.blueLight})`,
            display:"flex",alignItems:"center",justifyContent:"center",
            boxShadow:"0 3px 10px rgba(249,115,22,0.3)"}}>
            <Zap size={17} color="#fff" fill="#fff"/>
          </div>
          <div>
            <div className="sgt" style={{color:C.text,fontWeight:800,fontSize:17,letterSpacing:"-0.5px",lineHeight:1}}>Boostly</div>
            <div style={{color:C.textDim,fontSize:9,letterSpacing:".8px",fontWeight:700}}>SEO · MARKETING · AI</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:7,padding:"6px 9px",background:C.bgLight,
          borderRadius:7,border:`1px solid ${C.bluePale}`,cursor:"pointer"}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:C.green}} className="pulse"/>
          <span style={{color:C.blue,fontSize:11,fontWeight:600,flex:1}}>Marketing Workspace</span>
          <ChevronDown size={10} color={C.textDim}/>
        </div>
      </div>

      <div style={{padding:"10px 8px",flex:1}}>
        {/* SEO Tools */}
        <div style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:1.2,padding:"0 8px",marginBottom:4}}>SEO TOOLS</div>
        {seoNav.map(({id,icon:Icon,label,subs})=>(
          <div key={id}>
            <div className={`nav-item${active===id&&!sub?" on":""}`}
              onClick={()=>{setActive(id);if(!subs)setSub(null);}}>
              <Icon size={15}/>
              <span style={{flex:1}}>{label}</span>
              {subs&&<ChevronDown size={11} color={C.textDim}
                style={{transform:active===id?"rotate(180deg)":"none",transition:"transform .2s"}}/>}
            </div>
            {subs&&active===id&&(
              <div style={{marginBottom:2}}>
                {subs.map(s=>(
                  <div key={s.id} className={`nav-sub${sub===s.id?" on":""}`}
                    onClick={()=>setSub(s.id)}>{s.l}</div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:10,marginTop:8}}>
          <div style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:1.2,padding:"0 8px",marginBottom:4}}>WORKSPACE</div>
          {toolNav.map(({id,icon:Icon,label,badge})=>(
            <div key={id} className={`nav-item${active===id?" on":""}`} onClick={()=>{setActive(id);setSub(null);}}>
              <Icon size={15}/>
              <span style={{flex:1}}>{label}</span>
              {badge&&<span style={{background:C.orange,color:"#fff",fontSize:9,fontWeight:700,
                width:17,height:17,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{badge}</span>}
            </div>
          ))}
        </div>

        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:10,marginTop:8}}>
          <div className="nav-item" style={{fontSize:12}}>
            <HelpCircle size={14}/><span>Help & Support</span>
          </div>
        </div>
      </div>

      {/* User */}
      <div style={{borderTop:`1px solid ${C.border}`,padding:"10px 10px 14px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 8px",
          background:C.bg,borderRadius:9,cursor:"pointer"}}>
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
};

/* ══════════════ TOPBAR ══════════════ */
const Topbar=({title,sub})=>(
  <div style={{padding:"12px 24px",borderBottom:`1px solid ${C.border}`,
    display:"flex",alignItems:"center",gap:12,background:C.white,
    position:"sticky",top:0,zIndex:20,flexShrink:0}}>
    <div style={{flex:1}}>
      <h1 className="sgt" style={{color:C.text,fontSize:16,fontWeight:700}}>{title}</h1>
      {sub&&<p style={{color:C.textDim,fontSize:11,marginTop:1}}>{sub}</p>}
    </div>
    <div style={{display:"flex",alignItems:"center",gap:8,background:C.bg,
      border:`1px solid ${C.border}`,borderRadius:9,padding:"7px 12px",width:200}}>
      <Search size={13} color={C.textDim}/>
      <input placeholder="Search..." style={{background:"transparent",border:"none",outline:"none",
        color:C.textMid,fontSize:12.5,width:"100%",fontFamily:"inherit"}}/>
    </div>
    <button className="btn-blue" style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",fontSize:13}}>
      <Plus size={14}/> New Project
    </button>
    <div style={{position:"relative",cursor:"pointer"}}>
      <Bell size={18} color={C.textDim}/>
      <div style={{width:7,height:7,borderRadius:"50%",background:C.orange,
        position:"absolute",top:-1,right:-1,border:"1.5px solid #fff"}}/>
    </div>
    <Av l="Y" size={32}/>
  </div>
);

/* ══════════════ SCREEN: DASHBOARD ══════════════ */
const Dashboard=()=>{
  const stats=[
    {l:"Domain Rating",v:"42",chg:"+3",up:true,icon:Shield,c:C.blueLight},
    {l:"Backlinks",v:"1,847",chg:"+124",up:true,icon:Link2,c:C.orange},
    {l:"Keywords Ranked",v:"3,241",chg:"+89",up:true,icon:Target,c:C.green},
    {l:"Organic Traffic",v:"92.4K",chg:"+18%",up:true,icon:TrendingUp,c:C.purple},
    {l:"Avg. Position",v:"14.2",chg:"-2.1",up:true,icon:BarChart2,c:C.blueLight},
    {l:"Site Health Score",v:"78/100",chg:"+5",up:true,icon:Activity,c:C.green},
  ];
  const acts=[
    {u:"Mahmoud",a:"completed keyword audit",t:"Dental Pro",ago:"2m",icon:CheckCircle2,c:C.green},
    {u:"Aisha",a:"created 4 tasks in",t:"TechFlow Campaign",ago:"14m",icon:Plus,c:C.blueLight},
    {u:"AI Copilot",a:"fixed 3 broken links on",t:"seoengineboost.com",ago:"1h",icon:Bot,c:C.purple},
    {u:"Sam",a:"published blog post for",t:"Dental Client",ago:"2h",icon:FileText,c:C.orange},
    {u:"Jordan",a:"started working on",t:"Homepage Redesign",ago:"3h",icon:PlayCircle,c:C.yellow},
  ];
  return(
    <div className="fade" style={{padding:"22px 24px",overflowY:"auto",height:"calc(100vh - 57px)"}}>
      {/* Hero */}
      <div style={{background:`linear-gradient(135deg,${C.blue} 0%,${C.blueLight} 100%)`,
        borderRadius:16,padding:"22px 28px",marginBottom:22,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-30,right:60,width:160,height:160,borderRadius:"50%",
          background:"rgba(255,255,255,0.07)"}}/>
        <div style={{position:"absolute",bottom:-40,right:-20,width:200,height:200,borderRadius:"50%",
          background:"rgba(255,255,255,0.05)"}}/>
        <div style={{position:"relative"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
            <Sparkles size={13} color="#FED7AA"/>
            <span style={{color:"#FED7AA",fontSize:11,fontWeight:700,letterSpacing:.5}}>GOOD MORNING — May 5, 2026</span>
          </div>
          <h2 className="sgt" style={{color:"#fff",fontSize:22,fontWeight:800,marginBottom:7}}>
            Your SEO performance is <span style={{color:"#FED7AA"}}>improving 📈</span>
          </h2>
          <p style={{color:"rgba(255,255,255,.75)",fontSize:13,maxWidth:480}}>
            7 tasks due today · 3 client reports pending · Organic traffic up 18% this month
          </p>
          <div style={{display:"flex",gap:9,marginTop:16}}>
            <button className="btn-orange" style={{padding:"9px 18px",fontSize:13,display:"flex",alignItems:"center",gap:7}}>
              <Target size={14}/> Run SEO Audit
            </button>
            <button style={{background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.25)",
              color:"#fff",padding:"9px 18px",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",
              display:"flex",alignItems:"center",gap:7,fontFamily:"inherit"}}>
              <Bot size={14}/> Ask AI Copilot
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12,marginBottom:20}}>
        {stats.map(({l,v,chg,up,icon:Icon,c})=>(
          <div key={l} className="card card-h" style={{padding:"16px 16px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <div style={{width:32,height:32,borderRadius:8,background:`${c}18`,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon size={14} color={c}/>
              </div>
              <span className="chip" style={{color:up?C.green:C.red,background:up?C.greenL:C.redL,fontSize:9.5}}>
                {up?"↑":"↓"} {chg}
              </span>
            </div>
            <div className="sgt" style={{color:C.text,fontSize:20,fontWeight:800}}>{v}</div>
            <div style={{color:C.textDim,fontSize:10.5,marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>

      {/* Charts + Activity */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 260px",gap:14,marginBottom:20}}>
        {/* Traffic Chart */}
        <div className="card" style={{padding:"18px 20px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <div>
              <div className="sgt" style={{color:C.text,fontSize:14,fontWeight:700}}>Traffic Overview</div>
              <div style={{color:C.textDim,fontSize:11,marginTop:2}}>Organic · Paid · Referral</div>
            </div>
            <div style={{display:"flex",gap:4}}>
              {["1M","3M","6M","1Y"].map((t,i)=>(
                <button key={t} className="tab" style={{background:i===1?C.blueLight:"transparent",
                  color:i===1?"#fff":C.textDim}}>{t}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={trafficD} margin={{top:0,right:0,left:-22,bottom:0}}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.blueLight} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={C.blueLight} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.orange} stopOpacity={0.15}/>
                  <stop offset="95%" stopColor={C.orange} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
              <XAxis dataKey="m" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
              <Area type="monotone" dataKey="organic" stroke={C.blueLight} fill="url(#g1)" strokeWidth={2}/>
              <Area type="monotone" dataKey="paid" stroke={C.orange} fill="url(#g2)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Rank chart */}
        <div className="card" style={{padding:"18px 20px"}}>
          <div className="sgt" style={{color:C.text,fontSize:14,fontWeight:700,marginBottom:4}}>Ranking Trend</div>
          <div style={{color:C.textDim,fontSize:11,marginBottom:14}}>Top keyword avg. position (lower = better)</div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={rankD} margin={{top:0,right:0,left:-22,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
              <XAxis dataKey="n" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis reversed tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
              <Line type="monotone" dataKey="pos" stroke={C.green} strokeWidth={2.5}
                dot={{fill:C.green,r:3}} activeDot={{r:5}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Keyword dist */}
        <div className="card" style={{padding:"18px 20px"}}>
          <div className="sgt" style={{color:C.text,fontSize:14,fontWeight:700,marginBottom:4}}>Keyword Distribution</div>
          <div style={{color:C.textDim,fontSize:11,marginBottom:10}}>200 tracked keywords</div>
          <ResponsiveContainer width="100%" height={110}>
            <RPie><Pie data={pieD} cx="50%" cy="50%" innerRadius={36} outerRadius={52} paddingAngle={3} dataKey="v">
              {pieD.map((_,i)=><Cell key={i} fill={PIE_C[i]}/>)}
            </Pie></RPie>
          </ResponsiveContainer>
          {pieD.map((d,i)=>(
            <div key={d.name} style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}>
              <div style={{width:7,height:7,borderRadius:2,background:PIE_C[i]}}/>
              <span style={{color:C.textMid,fontSize:11,flex:1}}>{d.name}</span>
              <span style={{color:C.text,fontWeight:700,fontSize:12}}>{d.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity + Quick Actions */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 260px",gap:14}}>
        <div className="card" style={{padding:"18px 20px"}}>
          <div className="sgt" style={{color:C.text,fontSize:14,fontWeight:700,marginBottom:14}}>Team Activity</div>
          {acts.map(({u,a,t,ago,icon:Icon,c},i)=>(
            <div key={i} style={{display:"flex",gap:10,paddingBottom:12,marginBottom:12,
              borderBottom:i<acts.length-1?`1px solid ${C.border}`:"none",alignItems:"flex-start"}}>
              <div style={{width:30,height:30,borderRadius:8,background:`${c}18`,
                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Icon size={13} color={c}/>
              </div>
              <div style={{flex:1}}>
                <p style={{color:C.textMid,fontSize:12.5}}>
                  <span style={{color:C.text,fontWeight:700}}>{u}</span> {a} <span style={{color:C.blueLight}}>{t}</span>
                </p>
                <span style={{color:C.textDim,fontSize:10.5}}>{ago} ago</span>
              </div>
            </div>
          ))}
        </div>
        <div className="card" style={{padding:"18px 18px"}}>
          <div className="sgt" style={{color:C.text,fontSize:14,fontWeight:700,marginBottom:12}}>Quick Actions</div>
          {[
            {l:"Run Site Audit",icon:FileSearch,c:C.blueLight,d:"Check site health"},
            {l:"Keyword Research",icon:Search,c:C.orange,d:"Find new keywords"},
            {l:"Generate Report",icon:BarChart2,c:C.green,d:"Branded PDF report"},
            {l:"Content Writer",icon:Edit2,c:C.purple,d:"AI blog generator"},
            {l:"Competitor Analysis",icon:Globe,c:C.yellow,d:"Track competitors"},
            {l:"AI Copilot",icon:Sparkles,c:C.blueLight,d:"Ask anything"},
          ].map(({l,icon:Icon,c,d})=>(
            <div key={l} className="hl" style={{display:"flex",alignItems:"center",gap:9,padding:"8px 8px",
              borderRadius:8,marginBottom:4,cursor:"pointer"}}>
              <div style={{width:30,height:30,borderRadius:8,background:`${c}18`,
                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Icon size={13} color={c}/>
              </div>
              <div style={{flex:1}}>
                <div style={{color:C.text,fontSize:12,fontWeight:600}}>{l}</div>
                <div style={{color:C.textDim,fontSize:10.5}}>{d}</div>
              </div>
              <ChevronRight size={12} color={C.textDim}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ══════════════ SCREEN: KEYWORD RESEARCH ══════════════ */
const KeywordResearch=()=>{
  const [query,setQuery]=useState("dental implants");
  return(
    <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)"}}>
      {/* Search bar */}
      <div style={{padding:"16px 24px",borderBottom:`1px solid ${C.border}`,
        display:"flex",gap:10,alignItems:"center",background:C.white}}>
        <div style={{display:"flex",flex:1,background:C.bg,border:`1px solid ${C.border}`,borderRadius:9,overflow:"hidden"}}>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Enter keyword..."
            style={{flex:1,padding:"9px 14px",background:"transparent",border:"none",outline:"none",
              color:C.text,fontSize:13.5,fontFamily:"inherit"}}/>
          <select style={{background:"transparent",border:"none",outline:"none",color:C.textMid,
            fontSize:12,padding:"0 12px",borderLeft:`1px solid ${C.border}`,cursor:"pointer",fontFamily:"inherit"}}>
            <option>🌍 All Locations</option>
            <option>🇺🇸 United States</option>
            <option>🇬🇧 United Kingdom</option>
            <option>🇵🇭 Philippines</option>
          </select>
        </div>
        <button className="btn-blue" style={{padding:"10px 22px",fontSize:13}}>Search</button>
        <button className="btn-ghost" style={{padding:"10px 14px",fontSize:13,display:"flex",gap:6}}>
          <Filter size={13}/> Filters
        </button>
      </div>

      <div style={{padding:"20px 24px"}}>
        {/* Overview cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {[
            {l:"Search Volume",v:"8,200",sub:"Monthly searches",c:C.blueLight,icon:BarChart2},
            {l:"Keyword Difficulty",v:"28",sub:"Low competition",c:C.green,icon:Target},
            {l:"CPC (Avg.)",v:"$4.20",sub:"Cost per click",c:C.orange,icon:BarChart},
            {l:"SERP Features",v:"6",sub:"Snippets, maps, ads",c:C.purple,icon:Star},
          ].map(({l,v,sub,c,icon:Icon})=>(
            <div key={l} className="card" style={{padding:"16px 18px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div style={{width:34,height:34,borderRadius:8,background:`${c}18`,
                  display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Icon size={15} color={c}/>
                </div>
              </div>
              <div className="sgt" style={{color:C.text,fontSize:22,fontWeight:800}}>{v}</div>
              <div style={{color:C.textDim,fontSize:11,marginTop:2}}>{l}</div>
              <div style={{color:c,fontSize:11,marginTop:2,fontWeight:600}}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:4,marginBottom:16,background:C.bg,padding:4,borderRadius:9,width:"fit-content",border:`1px solid ${C.border}`}}>
          {["Keyword Ideas","Variations","Questions","Related"].map((t,i)=>(
            <button key={t} className="tab" style={{background:i===0?C.blueLight:"transparent",color:i===0?"#fff":C.textDim,fontSize:12}}>{t}</button>
          ))}
        </div>

        {/* Keyword table */}
        <div className="card" style={{overflow:"hidden"}}>
          <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`,
            display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span className="sgt" style={{color:C.text,fontSize:14,fontWeight:700}}>Keyword Suggestions — "dental implants"</span>
            <div style={{display:"flex",gap:7}}>
              <button className="btn-ghost" style={{padding:"5px 12px",fontSize:12,display:"flex",gap:5}}>
                <Download size={12}/> Export
              </button>
            </div>
          </div>
          {/* Header */}
          <div style={{display:"grid",gridTemplateColumns:"2.5fr .8fr .6fr .7fr .6fr 70px 100px",
            padding:"9px 18px",background:C.bg,borderBottom:`1px solid ${C.border}`}}>
            {["Keyword","Volume","KD","CPC","Intent","Trend","Action"].map(h=>(
              <div key={h} style={{color:C.textDim,fontSize:10.5,fontWeight:700,letterSpacing:.4}}>{h.toUpperCase()}</div>
            ))}
          </div>
          {keywords.map(({kw,pos,vol,kd,cpc,trend,chg,intent},i)=>(
            <div key={kw} className="td" style={{display:"grid",gridTemplateColumns:"2.5fr .8fr .6fr .7fr .6fr 70px 100px",
              padding:"11px 18px",borderBottom:i<keywords.length-1?`1px solid ${C.border}`:"none",alignItems:"center"}}>
              <div>
                <div style={{color:C.text,fontSize:13,fontWeight:600}}>{kw}</div>
                <div style={{color:C.textDim,fontSize:10.5,marginTop:2}}>Current Rank: <span style={{color:C.blueLight,fontWeight:700}}>#{pos}</span> · {chg}</div>
              </div>
              <div style={{color:C.text,fontWeight:700,fontSize:13}}>{vol}</div>
              <div>
                <span className="chip" style={{
                  color:kd<35?C.green:kd<55?C.yellow:C.red,
                  background:kd<35?C.greenL:kd<55?C.yellowL:C.redL}}>
                  {kd}
                </span>
              </div>
              <div style={{color:C.textMid,fontSize:12.5}}>{cpc}</div>
              <div><span className="chip" style={{color:C.purple,background:C.purpleL}}>{intent}</span></div>
              <MiniChart data={trend} c={chg.startsWith("-")?C.red:C.green}/>
              <div style={{display:"flex",gap:5}}>
                <button className="btn-blue" style={{padding:"5px 10px",fontSize:11}}>Track</button>
                <button className="btn-ghost" style={{padding:"5px 8px",fontSize:11,display:"flex"}}>
                  <Plus size={11}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ══════════════ SCREEN: ON-PAGE AUDIT ══════════════ */
const OnPageAudit=()=>(
  <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)"}}>
    {/* URL input */}
    <div style={{padding:"16px 24px",borderBottom:`1px solid ${C.border}`,background:C.white}}>
      <div style={{display:"flex",gap:10}}>
        <div style={{flex:1,display:"flex",background:C.bg,border:`1px solid ${C.border}`,borderRadius:9,overflow:"hidden"}}>
          <input defaultValue="seoengineboost.com" style={{flex:1,padding:"9px 14px",background:"transparent",border:"none",outline:"none",color:C.text,fontSize:13,fontFamily:"inherit"}}/>
        </div>
        <button className="btn-blue" style={{padding:"10px 22px",fontSize:13}}>Run Audit</button>
      </div>
    </div>

    <div style={{padding:"20px 24px"}}>
      {/* Score row */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:20}}>
        {[
          {l:"All Audits",s:78},{l:"Successful",s:85},{l:"Errors",s:62},
          {l:"Warnings",s:71},{l:"Basic Info",s:90}
        ].map(({l,s})=>(
          <div key={l} className="card card-h" style={{padding:"16px",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
            <ScoreBadge score={s}/>
            <div style={{color:C.textMid,fontSize:12,fontWeight:600}}>{l}</div>
          </div>
        ))}
      </div>

      {/* Report header */}
      <div style={{background:`linear-gradient(135deg,${C.orange},#EA6C0A)`,borderRadius:14,
        padding:"18px 22px",marginBottom:16,display:"flex",alignItems:"center",gap:20}}>
        <div style={{flex:1}}>
          <div style={{color:"rgba(255,255,255,.7)",fontSize:11,fontWeight:700,letterSpacing:.5,marginBottom:4}}>AUDIT REPORT</div>
          <div className="sgt" style={{color:"#fff",fontSize:20,fontWeight:800}}>seoengineboost.com</div>
          <div style={{color:"rgba(255,255,255,.75)",fontSize:12.5,marginTop:4}}>
            Issues with internal backlinks, external links, meta tags, HTTP status codes & rel attributes
          </div>
        </div>
        <ScoreBadge score={78} size={72}/>
        <div style={{display:"flex",gap:8}}>
          <button style={{background:"rgba(255,255,255,.2)",border:"1px solid rgba(255,255,255,.3)",
            color:"#fff",padding:"8px 14px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",
            display:"flex",gap:6,alignItems:"center",fontFamily:"inherit"}}>
            <Send size={12}/> Email
          </button>
          <button style={{background:"rgba(255,255,255,.2)",border:"1px solid rgba(255,255,255,.3)",
            color:"#fff",padding:"8px 14px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",
            display:"flex",gap:6,alignItems:"center",fontFamily:"inherit"}}>
            <Download size={12}/> Download
          </button>
        </div>
      </div>

      {/* Audit items */}
      <div className="card" style={{overflow:"hidden"}}>
        <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`}}>
          <span className="sgt" style={{color:C.text,fontSize:14,fontWeight:700}}>Audit Results</span>
        </div>
        {auditItems.map(({label,status,desc,fix},i)=>{
          const ic={error:[C.red,C.redL,"✕"],warning:[C.yellow,C.yellowL,"⚠"],ok:[C.green,C.greenL,"✓"]};
          const [c,bg,sym]=ic[status];
          return(
            <div key={label} className="td" style={{display:"flex",alignItems:"center",gap:14,
              padding:"13px 18px",borderBottom:i<auditItems.length-1?`1px solid ${C.border}`:"none"}}>
              <div style={{width:28,height:28,borderRadius:7,background:bg,
                display:"flex",alignItems:"center",justifyContent:"center",
                color:c,fontSize:13,fontWeight:800,flexShrink:0}}>{sym}</div>
              <div style={{flex:1}}>
                <div style={{color:C.text,fontSize:13,fontWeight:600}}>{label}</div>
                <div style={{color:C.textDim,fontSize:11.5,marginTop:2}}>{desc}</div>
              </div>
              <span className="chip" style={{color:c,background:bg,fontSize:10}}>
                {status.toUpperCase()}
              </span>
              {fix&&(
                <button className="btn-blue" style={{padding:"5px 12px",fontSize:11,flexShrink:0}}>
                  <span style={{display:"flex",alignItems:"center",gap:4}}><Zap size={10}/> AI Fix</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

/* ══════════════ SCREEN: COMPETITIVE RESEARCH ══════════════ */
const CompetitiveResearch=()=>(
  <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)"}}>
    <div style={{padding:"16px 24px",borderBottom:`1px solid ${C.border}`,background:C.white,display:"flex",gap:10}}>
      <div style={{flex:1,display:"flex",background:C.bg,border:`1px solid ${C.border}`,borderRadius:9,overflow:"hidden"}}>
        <input defaultValue="designer.com" style={{flex:1,padding:"9px 14px",background:"transparent",border:"none",outline:"none",color:C.text,fontSize:13,fontFamily:"inherit"}}/>
        <select style={{background:"transparent",border:"none",outline:"none",color:C.textMid,fontSize:12,padding:"0 12px",borderLeft:`1px solid ${C.border}`,cursor:"pointer",fontFamily:"inherit"}}>
          <option>🌍 Global</option><option>🇵🇭 Philippines</option><option>🇺🇸 US</option>
        </select>
      </div>
      <button className="btn-blue" style={{padding:"10px 22px",fontSize:13}}>Compare</button>
      <button className="btn-ghost" style={{padding:"10px 14px",fontSize:13}}>+ Add Competitor</button>
    </div>

    <div style={{padding:"20px 24px"}}>
      {/* Overview metrics */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 220px",gap:14,marginBottom:16}}>
        <div className="card" style={{padding:"18px 20px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                <span style={{color:C.orange,fontWeight:800,fontSize:16,fontFamily:"Space Grotesk"}}>Organic Traffic</span>
                <span style={{color:C.textDim,fontSize:13}}>81,346/month</span>
              </div>
              <div style={{color:C.textDim,fontSize:12}}>designer.com · Date: 12 September 2025</div>
            </div>
            <button className="btn-ghost" style={{padding:"6px 12px",fontSize:12,display:"flex",gap:5}}>
              <RefreshCw size={12}/> Refresh
            </button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
            {[["Visits","333K","+4%"],[`Unique Visitors`,"33K","+3%"],["Pages/Visit","4.2",""],["Avg Duration","3:21",""]].map(([l,v,c])=>(
              <div key={l} style={{padding:"10px 12px",background:C.bg,borderRadius:8,border:`1px solid ${C.border}`}}>
                <div style={{color:C.textDim,fontSize:10.5,marginBottom:4}}>{l}</div>
                <div className="sgt" style={{color:C.text,fontSize:18,fontWeight:800}}>{v}</div>
                {c&&<div style={{color:C.green,fontSize:10.5,fontWeight:700}}>{c}</div>}
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:6,marginBottom:10,padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
            {["Visits","Unique Visitors","Pages/Visit","Avg Duration"].map((t,i)=>(
              <button key={t} className="tab" style={{background:i===0?C.bluePale:"transparent",color:i===0?C.blue:C.textDim,fontSize:11}}>{t}</button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={130}>
            <AreaChart data={trafficD} margin={{top:0,right:0,left:-22,bottom:0}}>
              <defs>
                <linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.blueLight} stopOpacity={.18}/>
                  <stop offset="95%" stopColor={C.blueLight} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
              <XAxis dataKey="m" tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
              <Area type="monotone" dataKey="organic" stroke={C.blueLight} fill="url(#cg1)" strokeWidth={2}/>
              <Area type="monotone" dataKey="paid" stroke={C.orange} fill="none" strokeWidth={1.5} strokeDasharray="4 2"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Right metrics */}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {[
            {l:"Backlinks",v:"1.2K",chg:"+5%",c:C.blueLight},
            {l:"Page/Visitors",v:"552.5K",chg:"+2%",c:C.green},
            {l:"Avg Visit Duration",v:"61K",chg:"-4%",c:C.orange},
            {l:"Authority Score",v:"61",chg:"+2",c:C.purple},
            {l:"Paid Traffic",v:"621K",chg:"+8%",c:C.blueLight},
          ].map(({l,v,chg,c})=>(
            <div key={l} className="card" style={{padding:"10px 14px",flex:1}}>
              <div style={{color:C.textDim,fontSize:10.5}}>{l}</div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:2}}>
                <div className="sgt" style={{color:C.text,fontSize:18,fontWeight:800}}>{v}</div>
                <span className="chip" style={{color:C.green,background:C.greenL,fontSize:9.5}}>{chg}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top pages + Keywords */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div className="card" style={{overflow:"hidden"}}>
          <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`}}>
            <div style={{display:"flex",gap:4}}>
              {["Top Pages","Top Subfolders","Top Subdomains"].map((t,i)=>(
                <button key={t} className="tab" style={{background:i===0?C.bluePale:"transparent",color:i===0?C.blue:C.textDim,fontSize:11}}>{t}</button>
              ))}
            </div>
          </div>
          {[
            {page:"/studio/blog/a-hands-on-guide",share:"67.05%",pv:"285K",uv:"19K"},
            {page:"design.com",share:"5.9%",pv:"28.7K",uv:"28.7K"},
            {page:"/studio/blog/a",share:"1.65%",pv:"8.5K",uv:"8.5K"},
            {page:"app.uxpin.com",share:"0.35%",pv:"6.5K",uv:"6.5K"},
          ].map((r,i)=>(
            <div key={i} className="td" style={{display:"grid",gridTemplateColumns:"2fr .7fr .8fr .7fr",
              padding:"10px 18px",borderBottom:i<3?`1px solid ${C.border}`:"none",gap:8,fontSize:12}}>
              <div style={{color:C.blueLight,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.page}</div>
              <div style={{color:C.textMid}}>{r.share}</div>
              <div style={{color:C.textMid}}>{r.pv}</div>
              <div style={{color:C.textMid}}>{r.uv}</div>
            </div>
          ))}
        </div>

        <div className="card" style={{overflow:"hidden"}}>
          <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{color:C.blueLight,fontWeight:700,fontSize:14,fontFamily:"Space Grotesk"}}>Keywords</span>
            <button className="btn-ghost" style={{padding:"4px 10px",fontSize:11}}>View All →</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"2fr .7fr .7fr .5fr .5fr",padding:"8px 18px",background:C.bg,borderBottom:`1px solid ${C.border}`}}>
            {["Keyword","Trend","CPC","SERP DP","SD"].map(h=>(
              <div key={h} style={{color:C.textDim,fontSize:10,fontWeight:700,letterSpacing:.4}}>{h.toUpperCase()}</div>
            ))}
          </div>
          {keywords.slice(0,5).map(({kw,trend,cpc,kd},i)=>(
            <div key={i} className="td" style={{display:"grid",gridTemplateColumns:"2fr .7fr .7fr .5fr .5fr",
              padding:"10px 18px",borderBottom:i<4?`1px solid ${C.border}`:"none",alignItems:"center"}}>
              <div style={{color:C.text,fontSize:12,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{kw}</div>
              <MiniChart data={trend} c={C.blueLight}/>
              <div style={{color:C.textMid,fontSize:12}}>{cpc}</div>
              <div style={{color:C.textMid,fontSize:12}}>31</div>
              <div style={{color:C.textMid,fontSize:12}}>{kd}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ══════════════ SCREEN: BACKLINK RESEARCH ══════════════ */
const BacklinkResearch=()=>(
  <div className="fade" style={{overflowY:"auto",height:"calc(100vh - 57px)"}}>
    <div style={{padding:"16px 24px",borderBottom:`1px solid ${C.border}`,background:C.white,display:"flex",gap:10}}>
      <div style={{flex:1,display:"flex",background:C.bg,border:`1px solid ${C.border}`,borderRadius:9,overflow:"hidden"}}>
        <input defaultValue="seoengineboost.com" style={{flex:1,padding:"9px 14px",background:"transparent",border:"none",outline:"none",color:C.text,fontSize:13,fontFamily:"inherit"}}/>
      </div>
      <button className="btn-blue" style={{padding:"10px 22px",fontSize:13}}>Analyze</button>
    </div>

    <div style={{padding:"20px 24px"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:18}}>
        {[
          {l:"Total Backlinks",v:"1,847",c:C.blueLight,icon:Link2},
          {l:"Referring Domains",v:"312",c:C.orange,icon:Globe},
          {l:"Domain Rating",v:"42",c:C.green,icon:Shield},
          {l:"Dofollow Links",v:"1,204",c:C.purple,icon:ArrowUpRight},
          {l:"New (30 days)",v:"+124",c:C.green,icon:TrendingUp},
        ].map(({l,v,c,icon:Icon})=>(
          <div key={l} className="card card-h" style={{padding:"16px 16px"}}>
            <div style={{width:32,height:32,borderRadius:8,background:`${c}18`,
              display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}>
              <Icon size={14} color={c}/>
            </div>
            <div className="sgt" style={{color:C.text,fontSize:22,fontWeight:800}}>{v}</div>
            <div style={{color:C.textDim,fontSize:11,marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{overflow:"hidden"}}>
        <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span className="sgt" style={{color:C.text,fontSize:14,fontWeight:700}}>Backlink Profile</span>
          <div style={{display:"flex",gap:6}}>
            <button className="btn-ghost" style={{padding:"5px 12px",fontSize:12,display:"flex",gap:5}}><Filter size={12}/> Filter</button>
            <button className="btn-ghost" style={{padding:"5px 12px",fontSize:12,display:"flex",gap:5}}><Download size={12}/> Export</button>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"2fr .6fr .6fr 1.5fr .8fr .8fr",
          padding:"9px 18px",background:C.bg,borderBottom:`1px solid ${C.border}`}}>
          {["Referring Domain","DR","Links","Anchor Text","Type","Date"].map(h=>(
            <div key={h} style={{color:C.textDim,fontSize:10.5,fontWeight:700,letterSpacing:.4}}>{h.toUpperCase()}</div>
          ))}
        </div>
        {backlinks.map(({domain,dr,links,anchor,type,date},i)=>(
          <div key={domain} className="td" style={{display:"grid",gridTemplateColumns:"2fr .6fr .6fr 1.5fr .8fr .8fr",
            padding:"12px 18px",borderBottom:i<backlinks.length-1?`1px solid ${C.border}`:"none",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:26,height:26,borderRadius:6,background:C.bgLight,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Globe size={11} color={C.blueLight}/>
              </div>
              <span style={{color:C.blueLight,fontSize:12.5,fontWeight:600}}>{domain}</span>
            </div>
            <div>
              <span style={{background:`${dr>=85?C.green:dr>=70?C.blueLight:C.yellow}18`,
                color:dr>=85?C.green:dr>=70?C.blueLight:C.yellow,padding:"2px 7px",borderRadius:20,fontSize:11,fontWeight:700}}>{dr}</span>
            </div>
            <div style={{color:C.textMid,fontSize:12.5}}>{links}</div>
            <div style={{color:C.textMid,fontSize:12,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{anchor}</div>
            <div>
              <span className="chip" style={{color:type==="Dofollow"?C.green:C.textDim,background:type==="Dofollow"?C.greenL:"#F1F5F9"}}>
                {type}
              </span>
            </div>
            <div style={{color:C.textDim,fontSize:11.5}}>{date}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ══════════════ SCREEN: TASKS ══════════════ */
const Tasks=()=>{
  const [view,setView]=useState("kanban");
  return(
    <div className="fade" style={{height:"calc(100vh - 57px)",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{padding:"10px 22px",borderBottom:`1px solid ${C.border}`,background:C.white,
        display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
        <div style={{display:"flex",gap:3,background:C.bg,padding:3,borderRadius:8,border:`1px solid ${C.border}`}}>
          {[{k:"kanban",icon:Kanban,l:"Kanban"},{k:"list",icon:AlignLeft,l:"List"},{k:"calendar",icon:CalendarCheck,l:"Calendar"}].map(({k,icon:Icon,l})=>(
            <button key={k} onClick={()=>setView(k)} className="tab" style={{
              background:view===k?C.blueLight:"transparent",color:view===k?"#fff":C.textDim,
              display:"flex",alignItems:"center",gap:5,fontSize:12}}>
              <Icon size={12}/>{l}
            </button>
          ))}
        </div>
        <div style={{marginLeft:"auto",display:"flex",gap:7}}>
          {[{icon:Filter,l:"Filter"},{icon:SortAsc,l:"Sort"},{icon:Tag,l:"Labels"}].map(({icon:Icon,l})=>(
            <button key={l} className="btn-ghost" style={{display:"flex",alignItems:"center",gap:5,padding:"6px 11px",fontSize:12}}>
              <Icon size={12}/>{l}
            </button>
          ))}
          <button className="btn-blue" style={{display:"flex",alignItems:"center",gap:5,padding:"7px 14px",fontSize:12}}>
            <Plus size={13}/> Add Task
          </button>
        </div>
      </div>

      <div style={{flex:1,overflowX:"auto",overflowY:"hidden",padding:"16px 22px",background:C.bg}}>
        <div style={{display:"flex",gap:12,height:"100%"}}>
          {Object.entries(kanban).map(([colId,{label,c,tasks}])=>(
            <div key={colId} style={{flex:"0 0 268px",display:"flex",flexDirection:"column",height:"100%",
              background:C.white,borderRadius:12,padding:"12px 10px",border:`1px solid ${C.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:12}}>
                <div style={{width:8,height:8,borderRadius:2,background:c}}/>
                <span className="sgt" style={{color:C.text,fontWeight:700,fontSize:13}}>{label}</span>
                <span className="chip" style={{color:c,background:`${c}18`,marginLeft:2}}>{tasks.length}</span>
                <Plus size={12} color={C.textDim} style={{marginLeft:"auto",cursor:"pointer"}}/>
              </div>
              <div style={{flex:1,overflowY:"auto"}}>
                {tasks.map(({id,title,tags,pri,avs,due,cmts,prog})=>(
                  <div key={id} className="kcard">
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                      <PriBadge p={pri}/><MoreHorizontal size={12} color={C.textDim} style={{cursor:"pointer"}}/>
                    </div>
                    <p style={{color:C.text,fontSize:12.5,fontWeight:500,lineHeight:1.5,marginBottom:8}}>{title}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:8}}>
                      {tags.map(t=><span key={t} className="chip" style={{color:C.blue,background:C.bluePale}}>{t}</span>)}
                    </div>
                    {prog!==undefined&&(
                      <div style={{marginBottom:8}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                          <span style={{color:C.textDim,fontSize:10}}>Progress</span>
                          <span style={{color:C.blueLight,fontSize:10,fontWeight:700}}>{prog}%</span>
                        </div>
                        <Prog v={prog} c={prog>70?C.green:C.blueLight}/>
                      </div>
                    )}
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <div style={{display:"flex"}}>
                        {avs.map((a,i)=><div key={i} style={{marginLeft:i>0?-6:0,zIndex:avs.length-i}}><Av l={a} size={19}/></div>)}
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:3,color:C.textDim,fontSize:10,marginLeft:"auto"}}>
                        <MessageSquare size={9}/>{cmts}
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:3,color:C.textDim,fontSize:10}}>
                        <Clock size={9}/>{due}
                      </div>
                    </div>
                  </div>
                ))}
                <button style={{width:"100%",padding:"9px",border:`1.5px dashed ${C.border}`,borderRadius:8,
                  background:"transparent",color:C.textDim,fontSize:12,cursor:"pointer",
                  display:"flex",alignItems:"center",justifyContent:"center",gap:5,fontFamily:"inherit"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=C.blueLight}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                  <Plus size={12}/> Add task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ══════════════ SCREEN: MESSAGES ══════════════ */
const Messages=()=>{
  const [ch,setCh]=useState("seo-team");
  const [input,setInput]=useState("");
  const [aiShow,setAiShow]=useState(true);
  return(
    <div className="fade" style={{display:"flex",height:"calc(100vh - 57px)",overflow:"hidden"}}>
      {/* Channel panel */}
      <div style={{width:200,background:C.white,borderRight:`1px solid ${C.border}`,padding:"12px 8px",overflowY:"auto",flexShrink:0}}>
        <div style={{marginBottom:8}}>
          {[{l:"Inbox",icon:Inbox},{l:"Drafts",icon:Edit2}].map(({l,icon:Icon})=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:7,padding:"6px 9px",borderRadius:7,cursor:"pointer",color:C.textDim,fontSize:12.5,transition:"all .12s"}}
              onMouseEnter={e=>e.currentTarget.style.background=C.bgLight}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <Icon size={13}/>{l}
            </div>
          ))}
        </div>
        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:8}}>
          <div style={{display:"flex",justifyContent:"space-between",padding:"0 8px",marginBottom:5}}>
            <span style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:1}}>CHANNELS</span>
            <Plus size={11} color={C.textDim} style={{cursor:"pointer"}}/>
          </div>
          {channels.map(({n,u})=>(
            <div key={n} onClick={()=>setCh(n)}
              style={{display:"flex",alignItems:"center",gap:7,padding:"6px 9px",borderRadius:7,cursor:"pointer",
                fontSize:12.5,background:ch===n?C.bluePale:"transparent",color:ch===n?C.blue:C.textDim,
                fontWeight:ch===n?700:400,transition:"all .12s",marginBottom:1}}>
              <Hash size={12}/><span style={{flex:1}}>#{n}</span>
              {u>0&&<span style={{background:C.orange,color:"#fff",fontSize:9,fontWeight:700,
                width:16,height:16,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{u}</span>}
            </div>
          ))}
        </div>
        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:8,marginTop:4}}>
          <div style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:1,padding:"0 8px",marginBottom:5}}>DIRECT</div>
          {[{n:"Mahmoud",s:"online"},{n:"Aisha",s:"online"},{n:"Sam",s:"away"},{n:"Jordan",s:"offline"}].map(({n,s})=>(
            <div key={n} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 9px",borderRadius:7,cursor:"pointer",fontSize:12,color:C.textMid}}>
              <div style={{position:"relative"}}><Av l={n[0]} size={18}/>
                <div style={{width:5,height:5,borderRadius:"50%",background:s==="online"?C.green:s==="away"?C.yellow:C.textDim,
                  position:"absolute",bottom:-1,right:-1,border:"1px solid #fff"}}/>
              </div>{n}
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{padding:"10px 18px",borderBottom:`1px solid ${C.border}`,background:C.white,
          display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
          <Hash size={15} color={C.blueLight}/>
          <span className="sgt" style={{color:C.text,fontWeight:700,fontSize:14}}>#{ch}</span>
          <span style={{color:C.textDim,fontSize:12}}>· 8 members</span>
          <div style={{marginLeft:"auto",display:"flex",gap:5}}>
            {[Phone,Video,Search,Pin].map((Icon,i)=>(
              <button key={i} className="btn-ghost" style={{padding:"5px 7px",borderRadius:7,display:"flex"}}>
                <Icon size={13}/>
              </button>
            ))}
          </div>
        </div>

        <div style={{flex:1,overflowY:"auto",padding:"18px 20px",background:C.bg}}>
          {msgs.map(({id,user,av,text,time,mine})=>(
            <div key={id} style={{display:"flex",flexDirection:mine?"row-reverse":"row",gap:9,marginBottom:16,alignItems:"flex-end"}}>
              {!mine&&<Av l={av} size={28}/>}
              <div style={{maxWidth:"65%"}}>
                {!mine&&<div style={{color:C.textDim,fontSize:10.5,marginBottom:3,fontWeight:600}}>{user} · {time}</div>}
                <div style={{padding:"9px 13px",borderRadius:mine?"13px 13px 3px 13px":"3px 13px 13px 13px",
                  background:mine?C.blueLight:C.white,color:mine?"#fff":C.text,fontSize:13.5,lineHeight:1.5,
                  border:mine?"none":`1px solid ${C.border}`,boxShadow:mine?"none":"0 1px 4px rgba(0,0,0,.05)"}}>
                  {text}
                </div>
                {mine&&<div style={{color:C.textDim,fontSize:9.5,textAlign:"right",marginTop:2}}>{time} · ✓✓</div>}
              </div>
            </div>
          ))}
          <div style={{display:"flex",gap:9,alignItems:"flex-end",marginBottom:12}}>
            <Av l="A" size={28}/>
            <div style={{background:C.white,borderRadius:"3px 13px 13px 13px",padding:"11px 14px",
              display:"flex",gap:4,border:`1px solid ${C.border}`}}>
              {[0,1,2].map(i=><div key={i} className="typing-dot" style={{animationDelay:`${i*.2}s`}}/>)}
            </div>
          </div>

          {aiShow&&(
            <div style={{padding:"13px 15px",background:"#FFF7ED",border:`1px solid #FED7AA`,borderRadius:10,
              display:"flex",alignItems:"flex-start",gap:11,marginBottom:8}}>
              <div style={{width:32,height:32,borderRadius:8,background:C.orangeL,
                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Zap size={14} color={C.orange}/>
              </div>
              <div style={{flex:1}}>
                <div style={{color:C.orange,fontSize:12.5,fontWeight:700,marginBottom:3}}>AI detected 3 action items</div>
                <div style={{color:C.textMid,fontSize:12,lineHeight:1.5}}>Write 6 dental articles, setup GA4, prepare keyword brief. Convert to tasks?</div>
              </div>
              <div style={{display:"flex",gap:5}}>
                <button className="btn-orange" style={{padding:"5px 12px",fontSize:11}}>Convert</button>
                <button onClick={()=>setAiShow(false)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={13} color={C.textDim}/></button>
              </div>
            </div>
          )}
        </div>

        <div style={{padding:"10px 18px 14px",borderTop:`1px solid ${C.border}`,background:C.white,flexShrink:0}}>
          <div style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:10,
            display:"flex",alignItems:"center",gap:7,padding:"7px 11px"}}>
            {[Paperclip,Image,Link2,AtSign].map((Icon,i)=>(
              <button key={i} style={{background:"none",border:"none",cursor:"pointer"}}><Icon size={14} color={C.textDim}/></button>
            ))}
            <div style={{width:1,height:16,background:C.border}}/>
            <input placeholder={`Message #${ch}...`} value={input} onChange={e=>setInput(e.target.value)}
              style={{flex:1,background:"transparent",border:"none",outline:"none",color:C.text,fontSize:13,fontFamily:"inherit"}}/>
            <Smile size={14} color={C.textDim} style={{cursor:"pointer"}}/>
            <Bot size={14} color={C.blueLight} style={{cursor:"pointer"}}/>
            <button className="btn-blue" style={{padding:"6px 12px",display:"flex",alignItems:"center",gap:5,fontSize:12}}>
              <Send size={12}/> Send
            </button>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{width:240,background:C.white,borderLeft:`1px solid ${C.border}`,padding:14,overflowY:"auto",flexShrink:0}}>
        <div style={{background:"#EFF6FF",border:`1px solid #BFDBFE`,borderRadius:10,padding:12,marginBottom:14}}>
          <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:7}}>
            <Bot size={13} color={C.blueLight}/>
            <span className="sgt" style={{color:C.blue,fontSize:12,fontWeight:700}}>Boostly AI</span>
          </div>
          <p style={{color:C.textMid,fontSize:12,lineHeight:1.6,marginBottom:8}}>3 conversation threads about Dental client. Want me to create task list?</p>
          <div style={{display:"flex",gap:5}}>
            <button className="btn-blue" style={{padding:"5px 10px",fontSize:11}}>Create tasks</button>
            <button className="btn-ghost" style={{padding:"5px 8px",fontSize:11}}>Summarize</button>
          </div>
        </div>
        <div className="sgt" style={{color:C.text,fontSize:13,fontWeight:700,marginBottom:9}}>Members</div>
        {[{n:"Mahmoud",s:"online"},{n:"Aisha",s:"online"},{n:"Sam",s:"away"},{n:"Jordan",s:"offline"},{n:"You",s:"online"}].map(({n,s})=>(
          <div key={n} style={{display:"flex",alignItems:"center",gap:8,marginBottom:9}}>
            <div style={{position:"relative"}}><Av l={n[0]} size={24}/>
              <div style={{width:6,height:6,borderRadius:"50%",background:s==="online"?C.green:s==="away"?C.yellow:C.textDim,
                position:"absolute",bottom:-1,right:-1,border:"1.5px solid #fff"}}/>
            </div>
            <div>
              <div style={{color:C.text,fontSize:12,fontWeight:600}}>{n}</div>
              <div style={{color:C.textDim,fontSize:10,textTransform:"capitalize"}}>{s}</div>
            </div>
          </div>
        ))}
        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:12,marginTop:4}}>
          <div className="sgt" style={{color:C.text,fontSize:13,fontWeight:700,marginBottom:8}}>Pinned</div>
          {["Q2 Campaign Brief.pdf","Keyword Clusters.xlsx","Brand Guidelines v2"].map(f=>(
            <div key={f} style={{display:"flex",alignItems:"center",gap:7,padding:"7px 8px",
              background:C.bg,borderRadius:7,marginBottom:5,cursor:"pointer",border:`1px solid ${C.border}`}}>
              <FileText size={11} color={C.blueLight}/>
              <span style={{color:C.textMid,fontSize:11,flex:1}}>{f}</span>
              <Download size={10} color={C.textDim}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ══════════════ SCREEN: CLIENTS ══════════════ */
const Clients=()=>(
  <div className="fade" style={{padding:"22px 24px",overflowY:"auto",height:"calc(100vh - 57px)"}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
      {[
        {l:"Total Clients",v:"18",icon:Users,c:C.blueLight},
        {l:"Active Projects",v:"34",icon:Briefcase,c:C.orange},
        {l:"Pending Approvals",v:"6",icon:AlertCircle,c:C.yellow},
        {l:"Monthly Revenue",v:"$22.1K",icon:TrendingUp,c:C.green},
      ].map(({l,v,icon:Icon,c})=>(
        <div key={l} className="card card-h" style={{padding:"16px 18px"}}>
          <div style={{width:34,height:34,borderRadius:9,background:`${c}18`,
            display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}>
            <Icon size={15} color={c}/>
          </div>
          <div className="sgt" style={{color:C.text,fontSize:22,fontWeight:800}}>{v}</div>
          <div style={{color:C.textDim,fontSize:11,marginTop:2}}>{l}</div>
        </div>
      ))}
    </div>

    <div className="card" style={{overflow:"hidden"}}>
      <div style={{padding:"13px 20px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span className="sgt" style={{color:C.text,fontSize:14,fontWeight:700}}>All Clients</span>
        <div style={{display:"flex",gap:7}}>
          <button className="btn-ghost" style={{display:"flex",gap:5,padding:"6px 12px",fontSize:12}}><Filter size={12}/> Filter</button>
          <button className="btn-blue" style={{display:"flex",gap:5,padding:"7px 14px",fontSize:12}}><Plus size={13}/> Add Client</button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1.2fr 100px",padding:"9px 20px",
        background:C.bg,borderBottom:`1px solid ${C.border}`}}>
        {["Client","Status","Tasks","Revenue","Health Score","Actions"].map(h=>(
          <div key={h} style={{color:C.textDim,fontSize:10.5,fontWeight:700,letterSpacing:.4}}>{h.toUpperCase()}</div>
        ))}
      </div>
      {clients.map(({n,av,status,tasks,done,rev,health,last},i)=>(
        <div key={n} className="td" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1.2fr 100px",
          padding:"13px 20px",borderBottom:i<clients.length-1?`1px solid ${C.border}`:"none",alignItems:"center",cursor:"pointer"}}>
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <Av l={av} size={34}/>
            <div>
              <div style={{color:C.text,fontWeight:700,fontSize:13}}>{n}</div>
              <div style={{color:C.textDim,fontSize:10.5}}>Last active {last}</div>
            </div>
          </div>
          <div><span className="chip" style={{
            color:status==="active"?C.green:status==="review"?C.yellow:C.textDim,
            background:status==="active"?C.greenL:status==="review"?C.yellowL:"#F1F5F9"}}>
            {status.charAt(0).toUpperCase()+status.slice(1)}
          </span></div>
          <div style={{color:C.textMid,fontSize:12.5}}><span style={{color:C.text,fontWeight:700}}>{done}</span>/{tasks}</div>
          <div style={{color:C.green,fontWeight:700,fontSize:13.5}}>{rev}</div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <Prog v={health} c={health>75?C.green:health>50?C.yellow:C.red} h={5}/>
            <span style={{color:health>75?C.green:health>50?C.yellow:C.red,fontSize:11,fontWeight:700,minWidth:28}}>{health}%</span>
          </div>
          <div style={{display:"flex",gap:4}}>
            {[Eye,MessageSquare,ExternalLink].map((Icon,j)=>(
              <button key={j} className="btn-ghost" style={{width:26,height:26,borderRadius:6,padding:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon size={11}/>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ══════════════ SCREEN: SETTINGS ══════════════ */
const SettingsView=()=>{
  const [tab,setTab]=useState("profile");
  return(
    <div className="fade" style={{display:"flex",height:"calc(100vh - 57px)",overflow:"hidden"}}>
      <div style={{width:190,background:C.white,borderRight:`1px solid ${C.border}`,padding:"14px 8px"}}>
        <div style={{color:C.textDim,fontSize:9.5,fontWeight:700,letterSpacing:1.2,padding:"0 8px",marginBottom:5}}>SETTINGS</div>
        {[
          {id:"profile",icon:Users,l:"Profile"},
          {id:"workspace",icon:Briefcase,l:"Workspace"},
          {id:"notifications",icon:Bell,l:"Notifications"},
          {id:"integrations",icon:Cpu,l:"Integrations"},
          {id:"billing",icon:BarChart,l:"Billing"},
          {id:"security",icon:Shield,l:"Security"},
        ].map(({id,icon:Icon,l})=>(
          <div key={id} className={`nav-item${tab===id?" on":""}`} onClick={()=>setTab(id)}>
            <Icon size={14}/>{l}
          </div>
        ))}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"26px 32px",background:C.bg}}>
        {tab==="profile"&&(
          <div>
            <div className="sgt" style={{color:C.text,fontSize:18,fontWeight:800,marginBottom:5}}>Profile Settings</div>
            <p style={{color:C.textDim,fontSize:13,marginBottom:22}}>Manage your personal account details</p>
            <div className="card" style={{padding:"22px 24px",marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",gap:18,marginBottom:22}}>
                <Av l="Y" size={68}/>
                <div>
                  <div style={{color:C.text,fontSize:15,fontWeight:700,marginBottom:3}}>Your Account</div>
                  <div style={{color:C.textDim,fontSize:12,marginBottom:10}}>admin@boostly.app · Pro Plan</div>
                  <button className="btn-ghost" style={{padding:"6px 14px",fontSize:12}}>Change Avatar</button>
                </div>
              </div>
              {[{l:"Full Name",v:"Your Name"},{l:"Email",v:"admin@boostly.app"},{l:"Role",v:"Admin"},{l:"Time Zone",v:"Asia/Manila (UTC+8)"}].map(({l,v})=>(
                <div key={l} style={{marginBottom:14}}>
                  <label style={{color:C.textMid,fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>{l}</label>
                  <input defaultValue={v} style={{width:"100%",background:C.bg,border:`1px solid ${C.border}`,
                    borderRadius:8,padding:"9px 13px",color:C.text,fontSize:13,fontFamily:"inherit",outline:"none"}}/>
                </div>
              ))}
              <button className="btn-blue" style={{padding:"9px 22px",fontSize:13}}>Save Changes</button>
            </div>
          </div>
        )}
        {tab==="integrations"&&(
          <div>
            <div className="sgt" style={{color:C.text,fontSize:18,fontWeight:800,marginBottom:5}}>Integrations</div>
            <p style={{color:C.textDim,fontSize:13,marginBottom:22}}>Connect Boostly with your tools</p>
            {[
              {n:"Semrush",d:"Import keyword data & audits",connected:false},
              {n:"Google Analytics 4",d:"Traffic & conversion tracking",connected:true},
              {n:"Slack",d:"Sync notifications & messages",connected:true},
              {n:"Google Search Console",d:"Rankings & indexation data",connected:false},
              {n:"Ahrefs",d:"Backlink analysis",connected:false},
              {n:"WordPress",d:"One-click content publishing",connected:true},
              {n:"HubSpot",d:"CRM & lead management",connected:false},
            ].map(({n,d,connected})=>(
              <div key={n} className="card" style={{padding:"14px 18px",marginBottom:10,display:"flex",alignItems:"center",gap:14,
                border:connected?`1px solid ${C.green}40`:`1px solid ${C.border}`}}>
                <div style={{width:38,height:38,borderRadius:9,background:C.bgLight,
                  display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Globe size={16} color={C.blueLight}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{color:C.text,fontWeight:700,fontSize:13}}>{n}</div>
                  <div style={{color:C.textDim,fontSize:11.5,marginTop:1}}>{d}</div>
                </div>
                <button style={{padding:"7px 14px",borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit",
                  background:connected?C.greenL:C.blueLight,color:connected?C.green:"#fff"}}>
                  {connected?"Connected ✓":"Connect"}
                </button>
              </div>
            ))}
          </div>
        )}
        {!["profile","integrations"].includes(tab)&&(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"50%",textAlign:"center"}}>
            <Settings size={40} color={C.border} style={{marginBottom:14}}/>
            <div className="sgt" style={{color:C.textMid,fontSize:16,fontWeight:700,marginBottom:5}}>
              {tab.charAt(0).toUpperCase()+tab.slice(1)} Settings
            </div>
            <p style={{color:C.textDim,fontSize:13}}>Configuration options coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ══════════════ SCREEN MAP ══════════════ */
const SCREENS={
  dashboard:{C:Dashboard,title:"Dashboard",sub:"Welcome back — SEO Engine Boost · Boostly Platform"},
  keyword:{C:KeywordResearch,title:"Keyword Research",sub:"Discover high-value keywords and content opportunities"},
  onpage:{C:OnPageAudit,title:"On Page & Tech Audit",sub:"Full technical SEO analysis with AI-powered fixes"},
  competitive:{C:CompetitiveResearch,title:"Competitive Research",sub:"Domain overview, keyword gaps and backlink analysis"},
  backlink:{C:BacklinkResearch,title:"Backlink Research",sub:"Monitor and analyze your full backlink profile"},
  rank:{C:Dashboard,title:"Rank Tracking",sub:"Track keyword positions across devices and regions"},
  messages:{C:Messages,title:"Messages",sub:"Team chat · AI-powered conversations"},
  tasks:{C:Tasks,title:"Tasks & Projects",sub:"Kanban board — plan, track, and ship"},
  clients:{C:Clients,title:"Clients",sub:"Manage all client projects and relationships"},
  calendar:{C:Dashboard,title:"Calendar",sub:"Campaign planner & social media queue"},
  settings:{C:SettingsView,title:"Settings",sub:"Account, workspace & integrations"},
};

/* ══════════════ APP ══════════════ */
export default function App(){
  const [active,setActive]=useState("dashboard");
  const [sub,setSub]=useState(null);
  const {C:Screen,title,subT:subtitle}=SCREENS[active]||{};
  const scr=SCREENS[active]||SCREENS.dashboard;
  return(
    <>
      <style>{CSS}</style>
      <div style={{display:"flex",height:"100vh",background:C.bg,fontFamily:"'Manrope',sans-serif",overflow:"hidden"}}>
        <Sidebar active={active} setActive={setActive} sub={sub} setSub={setSub}/>
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <Topbar title={scr.title} sub={scr.sub}/>
          <scr.C/>
        </div>
      </div>
    </>
  );
}
