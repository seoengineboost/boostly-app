import { useState } from "react";
import { Check, Globe, User, ChevronDown, Search } from "lucide-react";

/* ── Brand tokens from seoengineboost.com ── */
const B = {
  blue:    "#1A56DB",
  blueD:   "#1240A8",
  orange:  "#F97316",
  text:    "#111827",
  textMid: "#4B5563",
  textDim: "#9CA3AF",
  border:  "#E5E7EB",
  bg:      "#F9FAFB",
  white:   "#FFFFFF",
  navyBg:  "#111827",
  green:   "#16A34A",
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Merriweather:wght@700;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Inter',sans-serif;background:#fff;color:#111827;}
.serif{font-family:'Merriweather',serif;}
.fade{animation:fi 0.4s ease;}
@keyframes fi{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
.btn-blue{background:#1A56DB;color:#fff;border:none;cursor:pointer;font-family:'Inter',sans-serif;font-weight:600;transition:all .15s;border-radius:6px;}
.btn-blue:hover{background:#1240A8;}
.btn-outline{background:transparent;border:1.5px solid #D1D5DB;color:#374151;cursor:pointer;font-family:'Inter',sans-serif;font-weight:500;transition:all .15s;border-radius:6px;}
.btn-outline:hover{border-color:#1A56DB;color:#1A56DB;}
.card-hover{transition:all .2s;}.card-hover:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,.1);}
.nav-link{color:#374151;font-size:14px;font-weight:500;cursor:pointer;transition:color .15s;text-decoration:none;}
.nav-link:hover{color:#1A56DB;}
.toggle-active{background:#111827;color:#fff;border-radius:4px;}
.toggle-inactive{background:transparent;color:#374151;}
.check-icon{width:16px;height:16px;background:#DCFCE7;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.table-row:hover{background:#F9FAFB;}
`;

const features = [
  "SEO Training & Support",
  "Reports Per Day",
  "Projects",
  "Chrome Extension Search Limits",
  "Rank Tracking",
  "Site Audit",
  "Keyword Research",
  "Competitive Analysis",
  "Backlinks",
];

const featureMatrix = {
  individual: ["✓", "5/day", "3", "100/day", "100 kw", "500 pages", "✓", "Basic", "100"],
  business:   ["✓", "20/day", "15", "500/day", "1,000 kw", "5,000 pages", "✓", "Advanced", "1,000"],
  enterprise: ["Priority", "Unlimited", "Unlimited", "Unlimited", "Unlimited", "Unlimited", "✓", "Full", "Unlimited"],
};

const plans = [
  {
    id: "individual",
    name: "Individual",
    monthlyPrice: 12,
    yearlyPrice: 9,
    desc: "Perfect for freelancers and solo SEO professionals.",
    current: true,
    color: B.blue,
  },
  {
    id: "business",
    name: "Business",
    monthlyPrice: 20,
    yearlyPrice: 15,
    desc: "For growing agencies managing multiple clients.",
    current: false,
    color: B.blue,
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 40,
    yearlyPrice: 30,
    desc: "Full power for large teams and enterprises.",
    current: false,
    color: B.blue,
  },
];

/* ── Navbar ── */
function Navbar() {
  const links = ["Tools", "Pricing", "Results", "Training", "Consulting", "Contact"];
  return (
    <nav style={{
      background: B.white, borderBottom: `1px solid ${B.border}`,
      padding: "0 40px", display: "flex", alignItems: "center",
      height: 56, position: "sticky", top: 0, zIndex: 50,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 40 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: `linear-gradient(135deg, ${B.orange}, ${B.blue})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 14 }}>B</span>
        </div>
        <span style={{ color: B.text, fontWeight: 700, fontSize: 15 }}>Logo</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 28, flex: 1 }}>
        {links.map((l) => (
          <a key={l} className="nav-link" style={{ color: l === "Pricing" ? B.blue : undefined, fontWeight: l === "Pricing" ? 600 : undefined }}>{l}</a>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
          <span style={{ fontSize: 16 }}>🇳🇬</span>
          <span style={{ fontSize: 13, color: B.textMid }}>Nigeria</span>
          <ChevronDown size={12} color={B.textMid} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", padding: "5px 10px", border: `1px solid ${B.border}`, borderRadius: 6 }}>
          <User size={15} color={B.textMid} />
          <ChevronDown size={11} color={B.textMid} />
        </div>
      </div>
    </nav>
  );
}

/* ── Pricing Cards Section ── */
function PricingCards({ billing }) {
  return (
    <section style={{ padding: "60px 40px 40px", maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: B.text, marginBottom: 48 }}>Pricing</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        {plans.map((plan) => {
          const price = billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
          return (
            <div key={plan.id} className="card-hover" style={{
              background: B.white, border: `1px solid ${B.border}`, borderRadius: 12,
              padding: "28px 24px", position: "relative", overflow: "hidden",
              boxShadow: plan.popular ? "0 4px 20px rgba(26,86,219,0.15)" : "0 1px 4px rgba(0,0,0,.06)",
              borderColor: plan.popular ? B.blue : B.border,
            }}>
              {/* Orange decorative half circle */}
              <div style={{
                position: "absolute", top: -20, right: -20, width: 64, height: 64,
                borderRadius: "50%", background: B.orange, opacity: 0.9,
              }} />

              <div style={{ position: "relative" }}>
                <div style={{ color: B.text, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>{plan.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 10 }}>
                  <span style={{ fontSize: 28, fontWeight: 800, color: B.text }}>${price}</span>
                  <span style={{ fontSize: 13, color: B.textMid }}>/ month</span>
                </div>
                <p style={{ color: B.textMid, fontSize: 12.5, lineHeight: 1.6, marginBottom: 18 }}>{plan.desc}</p>

                {plan.current ? (
                  <button className="btn-outline" style={{ width: "100%", padding: "9px 0", fontSize: 13, marginBottom: 20 }}>
                    Current Plan
                  </button>
                ) : (
                  <button className="btn-blue" style={{ width: "100%", padding: "9px 0", fontSize: 13, marginBottom: 20 }}>
                    Upgrade
                  </button>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {["sit amet, consectetur", "sit amet, consectetur", "sit amet, consectetur", "sit amet, consectetur", "sit amet, consectetur", "sit amet, consectetur", "sit amet, consectetur"].map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="check-icon">
                        <Check size={9} color={B.green} strokeWidth={3} />
                      </div>
                      <span style={{ color: B.textMid, fontSize: 12 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* 4th card (duplicate enterprise) */}
        <div className="card-hover" style={{
          background: B.white, border: `1px solid ${B.border}`, borderRadius: 12,
          padding: "28px 24px", position: "relative", overflow: "hidden",
          boxShadow: "0 1px 4px rgba(0,0,0,.06)",
        }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 64, height: 64, borderRadius: "50%", background: B.orange, opacity: 0.9 }} />
          <div style={{ position: "relative" }}>
            <div style={{ color: B.text, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Enterprise</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 10 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: B.text }}>${billing === "monthly" ? 40 : 30}</span>
              <span style={{ fontSize: 13, color: B.textMid }}>/ month</span>
            </div>
            <p style={{ color: B.textMid, fontSize: 12.5, lineHeight: 1.6, marginBottom: 18 }}>Lorem ipsum dolor sit amet, consectetur</p>
            <button className="btn-blue" style={{ width: "100%", padding: "9px 0", fontSize: 13, marginBottom: 20 }}>Upgrade</button>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[...Array(7)].map((_, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div className="check-icon"><Check size={9} color={B.green} strokeWidth={3} /></div>
                  <span style={{ color: B.textMid, fontSize: 12 }}>sit amet, consectetur</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Toggle ── */
function BillingToggle({ billing, setBilling }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px 0 48px" }}>
      <div style={{ display: "flex", background: "#F3F4F6", borderRadius: 6, padding: 4, gap: 2 }}>
        <button
          onClick={() => setBilling("monthly")}
          style={{
            padding: "8px 28px", border: "none", cursor: "pointer", fontSize: 14,
            fontWeight: 600, fontFamily: "inherit", borderRadius: 4, transition: "all .2s",
            background: billing === "monthly" ? "transparent" : "#111827",
            color: billing === "monthly" ? "#374151" : "#fff",
          }}>
          Monthly
        </button>
        <button
          onClick={() => setBilling("yearly")}
          style={{
            padding: "8px 28px", border: "none", cursor: "pointer", fontSize: 14,
            fontWeight: 600, fontFamily: "inherit", borderRadius: 4, transition: "all .2s",
            background: billing === "yearly" ? "#111827" : "transparent",
            color: billing === "yearly" ? "#fff" : "#374151",
          }}>
          Annually
        </button>
      </div>
    </div>
  );
}

/* ── Comparison Table ── */
function ComparisonTable({ billing }) {
  return (
    <section style={{ background: "#F9FAFB", padding: "0 0 80px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ background: B.white, border: `1px solid ${B.border}`, borderRadius: 16, overflow: "hidden", padding: "40px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 className="serif" style={{ fontSize: 26, fontWeight: 900, color: B.text, fontStyle: "italic" }}>
              Shoot for the stars with your SEO performance
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr 1fr" }}>
            {/* Column headers */}
            <div style={{ padding: "0 0 20px" }}>
              <p style={{ color: B.textMid, fontSize: 13, lineHeight: 1.7 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor consectetur adipiscing
              </p>
            </div>
            {plans.map((plan) => {
              const price = billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
              return (
                <div key={plan.id} style={{ padding: "0 16px 20px", borderLeft: `1px solid ${B.border}`, textAlign: "center" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: B.text, marginBottom: 4 }}>{plan.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 3, justifyContent: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 20, fontWeight: 800, color: B.text }}>${price}</span>
                    <span style={{ fontSize: 11, color: B.textMid }}>/ month</span>
                  </div>
                  <p style={{ color: B.textMid, fontSize: 11, lineHeight: 1.5 }}>Lorem ipsum dolor sit amet, consectetur</p>
                </div>
              );
            })}

            {/* Feature rows */}
            {features.map((feat, i) => (
              <>
                <div key={`feat-${i}`} style={{
                  padding: "13px 0", borderTop: `1px solid ${B.border}`,
                  fontSize: 13, color: B.text, fontWeight: 500,
                }} className="table-row">{feat}</div>
                {["individual", "business", "enterprise"].map((planId) => (
                  <div key={`${planId}-${i}`} style={{
                    padding: "13px 16px", borderTop: `1px solid ${B.border}`,
                    borderLeft: `1px solid ${B.border}`, textAlign: "center",
                    fontSize: 13, color: B.textMid,
                  }} className="table-row">
                    {featureMatrix[planId][i] === "✓" ? (
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className="check-icon"><Check size={9} color={B.green} strokeWidth={3} /></div>
                      </div>
                    ) : (
                      <span style={{ color: B.blue, fontWeight: 600, fontSize: 12 }}>{featureMatrix[planId][i]}</span>
                    )}
                  </div>
                ))}
              </>
            ))}

            {/* CTA row */}
            <div style={{ padding: "20px 0 0", borderTop: `1px solid ${B.border}` }} />
            {plans.map((plan) => (
              <div key={`cta-${plan.id}`} style={{ padding: "20px 16px 0", borderTop: `1px solid ${B.border}`, borderLeft: `1px solid ${B.border}`, textAlign: "center" }}>
                {plan.current ? (
                  <button className="btn-outline" style={{ padding: "7px 20px", fontSize: 13 }}>Current Plan</button>
                ) : (
                  <button className="btn-blue" style={{ padding: "7px 20px", fontSize: 13 }}>Upgrade</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  const footerCols = [
    { title: "COMPANY", links: ["About Us", "Legal Info", "Privacy Policy", "Cookie Settings", "Security Info", "Contact Us"] },
    { title: "FEATURES", links: ["Pricing", "Success Stories", "Stats and Facts", "Data Studies", "News", "Custom Report"] },
    { title: "TOOLS", links: ["Keyword research", "Domain analysis", "On page analysis", "backlinks"] },
  ];
  return (
    <footer style={{ background: B.navyBg, color: "#fff", padding: "48px 40px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 32, marginBottom: 40 }}>
          {/* Contact */}
          <div>
            <div style={{ color: "#9CA3AF", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 16 }}>CONTACT US</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <input placeholder="Enter Email" style={{ flex: 1, background: "#1F2937", border: "1px solid #374151", borderRadius: 6, padding: "8px 12px", color: "#fff", fontSize: 13, fontFamily: "inherit", outline: "none" }} />
              <button className="btn-blue" style={{ padding: "8px 14px", fontSize: 13, borderRadius: 6 }}>Search</button>
            </div>
            <div style={{ color: "#6B7280", fontSize: 12, lineHeight: 1.7, marginBottom: 12 }}>
              10:00 AM - 6:00 PM (EST/EDT), Monday - Friday<br />
              USA, 25 ayo idiaghe Street Suite 2475 Boston, MA 02199
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <select style={{ background: "#1F2937", border: "1px solid #374151", borderRadius: 5, padding: "5px 10px", color: "#9CA3AF", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }}>
                <option>Language: EN</option>
              </select>
            </div>
            <div style={{ color: "#6B7280", fontSize: 12, marginBottom: 6 }}>USA, USA, 25 ayo idiaghe Street, Suite 2475, Boston, MA 02199</div>
            <div style={{ color: "#9CA3AF", fontSize: 12, marginBottom: 4 }}>✉ Mail@example.com</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#9CA3AF", fontSize: 12 }}>
              <span>🇳🇬 Nigeria</span> <span>+2348069035122</span>
            </div>
          </div>

          {footerCols.map(({ title, links }) => (
            <div key={title}>
              <div style={{ color: "#9CA3AF", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 16 }}>{title}</div>
              {links.map((l) => (
                <div key={l} style={{ color: "#6B7280", fontSize: 13, marginBottom: 10, cursor: "pointer", transition: "color .15s" }}
                  onMouseEnter={(e) => e.target.style.color = "#fff"}
                  onMouseLeave={(e) => e.target.style.color = "#6B7280"}>
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid #1F2937", paddingTop: 24, display: "flex", justifyContent: "flex-end" }}>
          <button className="btn-blue" style={{ padding: "9px 20px", fontSize: 13, borderRadius: 6 }}>Get Started</button>
        </div>
      </div>
    </footer>
  );
}

/* ── Main Pricing Page ── */
export default function PricingPage() {
  const [billing, setBilling] = useState("monthly");

  return (
    <>
      <style>{CSS}</style>
      <div className="fade" style={{ minHeight: "100vh", background: B.white }}>
        <Navbar />
        <PricingCards billing={billing} />
        <BillingToggle billing={billing} setBilling={setBilling} />
        <ComparisonTable billing={billing} />
        <Footer />
      </div>
    </>
  );
}
