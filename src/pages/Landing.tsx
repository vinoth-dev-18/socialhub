import { Link } from "react-router-dom";
import { Globe, BarChart3, Shield, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

const PLATFORMS = [
  { slug: "facebook",  name: "Facebook",  color: "#1877F2", abbr: "Fb" },
  { slug: "instagram", name: "Instagram", color: "#E4405F", abbr: "Ig" },
  { slug: "youtube",   name: "YouTube",   color: "#FF0000", abbr: "Yt" },
  { slug: "twitter",   name: "X",         color: "#1C1C1E", abbr: "X" },
  { slug: "linkedin",  name: "LinkedIn",  color: "#0A66C2", abbr: "In" },
  { slug: "tiktok",    name: "TikTok",    color: "#010101", abbr: "Tt" },
  { slug: "discord",   name: "Discord",   color: "#5865F2", abbr: "Dc" },
  { slug: "reddit",    name: "Reddit",    color: "#FF4500", abbr: "Rd" },
  { slug: "whatsapp",  name: "WhatsApp",  color: "#25D366", abbr: "Wa" },
  { slug: "telegram",  name: "Telegram",  color: "#26A5E4", abbr: "Tg" },
  { slug: "twitch",    name: "Twitch",    color: "#9146FF", abbr: "Tw" },
  { slug: "pinterest", name: "Pinterest", color: "#E60023", abbr: "Pt" },
];

const FEATURES = [
  { icon: Globe, title: "15+ platforms, zero tab chaos", desc: "Every major social network in one dashboard. Switch instantly without losing context." },
  { icon: Zap, title: "Session memory built-in", desc: "Your logged-in state is remembered per platform. Pick up exactly where you left off." },
  { icon: BarChart3, title: "Real-time admin analytics", desc: "See which platforms your users visit, how often, and when — in beautiful charts." },
  { icon: Shield, title: "Two-role access control", desc: "First signup becomes admin automatically. Admins see everything; consumers see their hub." },
];

export default function Landing() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bk-navy-deep)", fontFamily: "var(--font-sans)" }}>

      {/* Navbar */}
      <nav className="flex items-center px-6 md:px-10" style={{ height: 64, borderBottom: "1px solid rgba(255,255,255,0.08)", position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(12px)", backgroundColor: "rgba(14,24,48,0.85)" }}>
        <div className="flex items-center gap-2">
          <Globe size={20} style={{ color: "var(--bk-accent-bright)" }} />
          <span style={{ color: "white", fontWeight: 700, fontSize: "1.125rem", letterSpacing: "-0.01em" }}>SocialHub</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <Link to="/login" className="hidden sm:inline-flex items-center px-4 py-2 rounded text-sm font-semibold no-underline" style={{ color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.15)" }}>Sign in</Link>
          <Link to="/signup" className="inline-flex items-center gap-1.5 px-4 py-2 rounded text-sm font-semibold no-underline hover:opacity-90" style={{ backgroundColor: "var(--bk-accent-bright)", color: "white" }}>Get started <ArrowRight size={14} /></Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 md:px-10" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(180,83,9,0.25) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ backgroundColor: "rgba(180,83,9,0.15)", border: "1px solid rgba(180,83,9,0.35)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--bk-accent-bright)" }} />
            <span style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", color: "var(--bk-accent-bright)" }}>ALL-IN-ONE SOCIAL PLATFORM</span>
          </div>

          <h1 className="text-white" style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
            Every social network,
            <br />
            <span style={{ background: "linear-gradient(135deg, #FCD34D 0%, var(--bk-accent-bright) 50%, #92400E 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              one powerful hub
            </span>
          </h1>

          <p className="max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            Access Facebook, Instagram, YouTube, X, LinkedIn, TikTok and 10+ more in a single session-aware dashboard. No more tab overload.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Link to="/signup" className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm no-underline hover:opacity-90" style={{ backgroundColor: "var(--bk-accent-bright)", color: "white", boxShadow: "0 4px 24px rgba(180,83,9,0.4)" }}>Start for free <ArrowRight size={16} /></Link>
            <Link to="/login" className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm no-underline" style={{ color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.2)" }}>Sign in</Link>
          </div>

          {/* Platform grid card */}
          <div className="rounded-2xl p-6 md:p-8 mx-auto" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", maxWidth: 640, backdropFilter: "blur(8px)" }}>
            <p style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", marginBottom: "1.25rem" }}>AVAILABLE PLATFORMS</p>
            <div className="grid grid-cols-6 gap-3">
              {PLATFORMS.map((p) => (
                <div key={p.slug} className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-110 cursor-default" style={{ backgroundColor: p.color, boxShadow: `0 4px 12px ${p.color}55` }} title={p.name}>{p.abbr}</div>
                  <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>{p.name}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginTop: "1rem" }}>+ Snapchat, Mastodon, Threads and more</p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-wrap justify-center gap-12">
          {[{ value: "15+", label: "Platforms" }, { value: "2", label: "Roles" }, { value: "100%", label: "Session-aware" }, { value: "Free", label: "To start" }].map((s) => (
            <div key={s.label} className="text-center">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.75rem", fontWeight: 700, color: "var(--bk-accent-bright)", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", marginTop: "0.35rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="px-6 md:px-10" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-8 h-0.5 mx-auto mb-4" style={{ backgroundColor: "var(--bk-accent-bright)" }} />
            <h2 className="text-white" style={{ fontSize: "1.75rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>Built for the social-first era</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem" }}>Everything you need to manage your social media presence in one place.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(180,83,9,0.2)", border: "1px solid rgba(180,83,9,0.3)" }}>
                  <f.icon size={18} style={{ color: "var(--bk-accent-bright)" }} />
                </div>
                <h3 className="text-white mb-2" style={{ fontWeight: 600, fontSize: "1rem" }}>{f.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9375rem", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 md:px-10" style={{ paddingTop: "5rem", paddingBottom: "5rem", backgroundColor: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white mb-12" style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em" }}>Get started in 3 steps</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Create account", desc: "Sign up — first user auto-becomes the admin. No config needed." },
              { step: "02", title: "Open any platform", desc: "Pick an icon from your dashboard and it opens inside SocialHub." },
              { step: "03", title: "Stay signed in", desc: "Mark yourself as logged in and we’ll remember it next visit." },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.875rem", color: "var(--bk-accent-bright)", border: "2px solid rgba(180,83,9,0.4)", backgroundColor: "rgba(180,83,9,0.1)" }}>{item.step}</div>
                <h3 className="text-white mb-2" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>{item.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin callout */}
      <section className="px-6 md:px-10" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(180,83,9,0.2) 0%, rgba(14,24,48,0.9) 60%)", border: "1px solid rgba(180,83,9,0.3)" }}>
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(180,83,9,0.25)", border: "1px solid rgba(180,83,9,0.4)" }}>
              <BarChart3 size={24} style={{ color: "var(--bk-accent-bright)" }} />
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-2" style={{ fontSize: "1.25rem", fontWeight: 600 }}>Powerful admin dashboard</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "1.25rem" }}>See exactly which platforms your users visit, when they were last active, and total usage across the board — in rich interactive charts.</p>
              <div className="flex flex-wrap gap-2">
                {["User activity charts", "Platform usage breakdown", "Live user count", "Per-user details"].map((tag) => (
                  <div key={tag} className="flex items-center gap-1.5 px-2.5 py-1 rounded" style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <CheckCircle2 size={11} style={{ color: "#4ADE80" }} />
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 text-center" style={{ paddingTop: "5rem", paddingBottom: "6rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="w-12 h-0.5 mx-auto mb-6" style={{ backgroundColor: "var(--bk-accent-bright)" }} />
        <h2 className="text-white mb-4" style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.02em" }}>Ready to simplify your social life?</h2>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", marginBottom: "2rem" }}>Create your free account — the first user becomes the admin automatically.</p>
        <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded font-semibold no-underline hover:opacity-90" style={{ backgroundColor: "var(--bk-accent-bright)", color: "white", fontSize: "1rem", boxShadow: "0 8px 32px rgba(180,83,9,0.4)" }}>Create free account <ArrowRight size={18} /></Link>
        <p style={{ marginTop: "1.25rem", fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)" }}>No credit card required • Instant access • First user = admin</p>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2">
          <Globe size={16} style={{ color: "var(--bk-accent-bright)" }} />
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", fontWeight: 600 }}>SocialHub</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8125rem" }}>&copy; {new Date().getFullYear()} SocialHub. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/login" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8125rem", textDecoration: "none" }}>Sign in</Link>
          <Link to="/signup" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8125rem", textDecoration: "none" }}>Sign up</Link>
        </div>
      </footer>
    </div>
  );
}
