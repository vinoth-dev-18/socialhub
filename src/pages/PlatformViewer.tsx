/**
 * PlatformViewer — Popup-window launcher.
 *
 * Opens the social media platform in a dedicated popup window (full browser
 * context — no embedding restrictions, works for every platform) while
 * SocialHub stays open for session tracking.
 */
import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, CheckCircle2, Circle,
  Monitor, X, Maximize2,
} from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { api } from "@/lib/api-client";

interface Platform {
  id: string;
  slug: string;
  name: string;
  url: string;
  icon_url: string | null;
  category: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

const BRAND_COLOR: Record<string, string> = {
  facebook:  "#1877F2",
  instagram: "#E4405F",
  twitter:   "#000000",
  youtube:   "#FF0000",
  linkedin:  "#0A66C2",
  tiktok:    "#010101",
  reddit:    "#FF4500",
  pinterest: "#E60023",
  snapchat:  "#FFFC00",
  whatsapp:  "#25D366",
  telegram:  "#26A5E4",
  discord:   "#5865F2",
  twitch:    "#9146FF",
  threads:   "#000000",
  mastodon:  "#6364FF",
};

const ICON_SLUG: Record<string, string> = { twitter: "x" };
const ICON_COLOR: Record<string, string> = { snapchat: "000000" };

function getIconUrl(slug: string): string {
  return `https://cdn.simpleicons.org/${ICON_SLUG[slug] ?? slug}/${ICON_COLOR[slug] ?? "ffffff"}`;
}

function openPopup(url: string, name: string): Window | null {
  const w    = Math.min(1280, window.screen.width  - 120);
  const h    = Math.min(900,  window.screen.height - 120);
  const left = Math.round((window.screen.width  - w) / 2);
  const top  = Math.round((window.screen.height - h) / 2);
  return window.open(
    url, name,
    `width=${w},height=${h},left=${left},top=${top},toolbar=1,menubar=0,location=1,status=0,scrollbars=1,resizable=1`,
  );
}

export default function PlatformViewer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [platform, setPlatform]                 = useState<Platform | null>(null);
  const [isLoggedIn, setIsLoggedIn]             = useState(false);
  const [appLoading, setAppLoading]             = useState(true);
  const [popupOpen, setPopupOpen]               = useState(false);
  const [showReturnPrompt, setShowReturnPrompt] = useState(false);
  const [iconError, setIconError]               = useState(false);
  const [popupBlocked, setPopupBlocked]         = useState(false);

  const popupRef = useRef<Window | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const launch = useCallback((p: Platform) => {
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.focus();
      return;
    }
    const popup = openPopup(p.url, `socialhub_${p.slug}`);
    if (!popup) { setPopupBlocked(true); return; }
    setPopupBlocked(false);
    setPopupOpen(true);
    setShowReturnPrompt(false);
    popupRef.current = popup;
    void api.post("/api/activity/visit", { platform_id: p.id });
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (popupRef.current?.closed) {
        clearInterval(timerRef.current!);
        timerRef.current = null;
        popupRef.current = null;
        setPopupOpen(false);
        setShowReturnPrompt(true);
      }
    }, 600);
  }, []);

  useEffect(() => {
    if (!id) return;
    async function load() {
      const [pRes, sRes] = await Promise.all([
        api.get<Platform[]>("/api/platforms"),
        api.get<{ platform_id: string; is_logged_in: boolean }[]>("/api/platform-sessions"),
      ]);
      let found: Platform | undefined;
      if (pRes.success) { found = pRes.data.find((p) => p.id === id); setPlatform(found ?? null); }
      if (sRes.success) { const s = sRes.data.find((s) => s.platform_id === id); setIsLoggedIn(s?.is_logged_in ?? false); }
      setAppLoading(false);
      if (found) launch(found); // auto-launch on load
    }
    void load();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [id, launch]);

  async function markLoggedIn(val: boolean) {
    if (!platform) return;
    setIsLoggedIn(val);
    await api.put("/api/platform-sessions", { platform_id: platform.id, is_logged_in: val });
  }

  if (appLoading) return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bk-page)" }}>
        <div className="w-8 h-8 border-2 rounded-full animate-spin"
          style={{ borderColor: "var(--bk-border)", borderTopColor: "var(--bk-accent-bright)" }} />
      </div>
    </ProtectedRoute>
  );

  if (!platform) return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center flex-col gap-4" style={{ backgroundColor: "var(--bk-page)" }}>
        <p style={{ color: "var(--bk-ink-muted)" }}>Platform not found.</p>
        <Link to="/dashboard" style={{ color: "var(--bk-accent-bright)" }}>Back to dashboard</Link>
      </div>
    </ProtectedRoute>
  );

  const brandColor    = BRAND_COLOR[platform.slug] ?? "#6B7280";
  const iconUrl       = getIconUrl(platform.slug);
  const isSnapchat    = platform.slug === "snapchat";
  const fgColor       = isSnapchat ? "#000" : "#fff";

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bk-page)" }}>

        {/* Topbar */}
        <div className="flex items-center gap-3 px-4 shrink-0"
          style={{ backgroundColor: "var(--bk-navy-deep)", height: 48,
            borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1.5 text-white hover:text-amber-400 transition-colors">
            <ArrowLeft size={16} />
            <span style={{ fontSize: "0.8125rem" }}>Dashboard</span>
          </button>
          <div className="flex items-center gap-2 ml-2">
            <div className="w-6 h-6 rounded overflow-hidden shrink-0 flex items-center justify-center"
              style={{ backgroundColor: brandColor }}>
              {!iconError
                ? <img src={iconUrl} alt={platform.name} className="w-4 h-4" style={{ objectFit: "contain" }}
                    onError={() => setIconError(true)} />
                : <span style={{ fontSize: "0.6rem", fontWeight: 700, color: fgColor }}>{platform.name[0]}</span>}
            </div>
            <span style={{ color: "white", fontWeight: 600, fontSize: "0.9375rem" }}>{platform.name}</span>
          </div>
          {popupOpen && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded"
              style={{ backgroundColor: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)" }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#4ADE80" }} />
              <span style={{ fontSize: "0.6875rem", color: "#4ADE80" }}>Live</span>
            </div>
          )}
          <div className="flex-1" />
          {isLoggedIn && <div className="hidden sm:flex items-center gap-1" style={{ fontSize: "0.75rem", color: "#4ADE80" }}>
            <CheckCircle2 size={12} /><span>Logged in</span>
          </div>}
          <a href={platform.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-white/60 hover:text-white transition-colors"
            style={{ fontSize: "0.8125rem" }}>
            <ExternalLink size={13} /><span>Open tab</span>
          </a>
        </div>

        {/* Main */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md space-y-4">

            {/* Platform card */}
            <div className="rounded-lg p-8 text-center"
              style={{ backgroundColor: "var(--bk-surface)", border: "1px solid var(--bk-border)" }}>

              {/* Icon */}
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: brandColor,
                  boxShadow: `0 4px 24px ${brandColor}40` }}>
                {!iconError
                  ? <img src={iconUrl} alt={platform.name} className="w-14 h-14"
                      style={{ objectFit: "contain" }} onError={() => setIconError(true)} />
                  : <span style={{ fontWeight: 700, fontSize: "1.5rem", color: fgColor }}>
                      {platform.name.slice(0, 2).toUpperCase()}
                    </span>}
              </div>

              <h1 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--bk-ink)", marginBottom: "0.25rem" }}>
                {platform.name}
              </h1>
              <p style={{ fontSize: "0.8125rem", color: "var(--bk-ink-muted)", marginBottom: "2rem" }}>
                {platform.url}
              </p>

              {/* ── POPUP IS OPEN ── */}
              {popupOpen && (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg"
                    style={{ backgroundColor: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#4ADE80" }} />
                    <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#16A34A" }}>
                      {platform.name} is currently open
                    </span>
                  </div>
                  <button onClick={() => popupRef.current?.focus()}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded font-semibold transition-all hover:opacity-90"
                    style={{ backgroundColor: brandColor, color: fgColor, fontSize: "0.9375rem" }}>
                    <Maximize2 size={16} /> Focus {platform.name} window
                  </button>
                  <button onClick={() => popupRef.current?.close()}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded font-semibold transition-all"
                    style={{ backgroundColor: "var(--bk-surface-raised)",
                      border: "1px solid var(--bk-border)", color: "var(--bk-ink-muted)", fontSize: "0.875rem" }}>
                    <X size={14} /> Close window
                  </button>
                </div>
              )}

              {/* ── RETURN PROMPT ── */}
              {showReturnPrompt && (
                <div className="space-y-3">
                  <div className="rounded-lg p-4 text-left"
                    style={{ backgroundColor: "var(--bk-accent-wash)", border: "1px solid #F3D5A0" }}>
                    <p style={{ fontWeight: 600, color: "var(--bk-ink)", marginBottom: "0.25rem" }}>Welcome back!</p>
                    <p style={{ fontSize: "0.875rem", color: "var(--bk-ink-muted)" }}>
                      Did you log into {platform.name}?
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => { void markLoggedIn(true); setShowReturnPrompt(false); }}
                      className="flex-1 py-2.5 rounded font-semibold transition-all hover:opacity-90"
                      style={{ backgroundColor: "#16A34A", color: "#fff", fontSize: "0.875rem" }}>
                      Yes, I logged in ✓
                    </button>
                    <button onClick={() => setShowReturnPrompt(false)}
                      className="flex-1 py-2.5 rounded font-semibold"
                      style={{ backgroundColor: "var(--bk-surface-raised)",
                        border: "1px solid var(--bk-border)", color: "var(--bk-ink-muted)", fontSize: "0.875rem" }}>
                      Not yet
                    </button>
                  </div>
                  <button onClick={() => launch(platform)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded font-semibold transition-all hover:opacity-90"
                    style={{ backgroundColor: brandColor, color: fgColor, fontSize: "0.9375rem" }}>
                    <Monitor size={16} /> Reopen {platform.name}
                  </button>
                </div>
              )}

              {/* ── IDLE ── */}
              {!popupOpen && !showReturnPrompt && (
                <div className="space-y-3">
                  {popupBlocked && (
                    <div className="rounded p-3 text-sm"
                      style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", color: "#B91C1C" }}>
                      Popup blocked by browser. Allow popups for this site and click Launch again.
                    </div>
                  )}
                  <button onClick={() => launch(platform)}
                    className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-lg font-semibold transition-all hover:opacity-90"
                    style={{ backgroundColor: brandColor, color: fgColor, fontSize: "1.0625rem" }}>
                    <Monitor size={20} /> Launch {platform.name}
                  </button>
                  <a href={platform.url} target="_blank" rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded font-semibold no-underline"
                    style={{ backgroundColor: "var(--bk-surface-raised)",
                      border: "1px solid var(--bk-border)", color: "var(--bk-ink-muted)", fontSize: "0.875rem" }}>
                    <ExternalLink size={14} /> Open in new tab instead
                  </a>
                </div>
              )}
            </div>

            {/* Session status */}
            <div className="rounded-lg px-6 py-4 flex items-center justify-between"
              style={{ backgroundColor: "var(--bk-surface)", border: "1px solid var(--bk-border)" }}>
              <span style={{ fontSize: "0.875rem", color: "var(--bk-ink-muted)" }}>Session status</span>
              <button onClick={() => void markLoggedIn(!isLoggedIn)}
                className="flex items-center gap-2 px-3 py-1.5 rounded transition-all"
                style={{
                  backgroundColor: isLoggedIn ? "rgba(22,163,74,0.1)" : "var(--bk-surface-raised)",
                  border: isLoggedIn ? "1px solid rgba(22,163,74,0.3)" : "1px solid var(--bk-border)",
                }}>
                {isLoggedIn
                  ? <CheckCircle2 size={14} style={{ color: "#16A34A" }} />
                  : <Circle size={14} style={{ color: "var(--bk-ink-muted)" }} />}
                <span style={{ fontSize: "0.8125rem", fontWeight: 600,
                  color: isLoggedIn ? "#16A34A" : "var(--bk-ink)" }}>
                  {isLoggedIn ? "Logged in" : "Not logged in"}
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
