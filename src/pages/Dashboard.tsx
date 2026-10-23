import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, CheckCircle2, Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useSession } from "@/components/AuthSessionProvider";
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

interface LoginState {
  platform_id: string;
  is_logged_in: boolean;
}

// Brand colors per slug
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

// Simple Icons CDN slug mapping (some differ from our slug)
const ICON_SLUG: Record<string, string> = {
  twitter: "x", // rebranded to X
};

// Icons with light brand colors need a dark icon instead of white
const ICON_COLOR: Record<string, string> = {
  snapchat: "000000", // black icon on yellow bg
};

function getIconUrl(slug: string): string {
  const iconSlug = ICON_SLUG[slug] ?? slug;
  const iconColor = ICON_COLOR[slug] ?? "ffffff";
  return `https://cdn.simpleicons.org/${iconSlug}/${iconColor}`;
}

const CATEGORY_LABELS: Record<string, string> = {
  social:       "Social",
  video:        "Video",
  messaging:    "Messaging",
  professional: "Professional",
  community:    "Community",
};

function PlatformCard({
  platform,
  isLoggedIn,
  onClick,
}: {
  platform: Platform;
  isLoggedIn: boolean;
  onClick: () => void;
}) {
  const bgColor = BRAND_COLOR[platform.slug] ?? "#6B7280";
  const iconUrl = getIconUrl(platform.slug);
  const [iconError, setIconError] = useState(false);

  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center gap-3 p-6 rounded-lg text-center transition-all duration-150 cursor-pointer"
      style={{
        backgroundColor: "var(--bk-surface)",
        border: "1px solid var(--bk-border)",
        boxShadow: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 1px 2px rgba(14,24,48,0.08), 0 2px 8px rgba(14,24,48,0.06)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--bk-ink-muted)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--bk-border)";
      }}
    >
      {/* Logged-in badge */}
      {isLoggedIn && (
        <div className="absolute top-2 right-2">
          <CheckCircle2 size={14} style={{ color: "#16A34A" }} />
        </div>
      )}

      {/* Brand icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        {!iconError ? (
          <img
            src={iconUrl}
            alt={platform.name}
            className="w-8 h-8"
            style={{ objectFit: "contain" }}
            onError={() => setIconError(true)}
          />
        ) : (
          <span className="text-white font-bold text-lg">
            {platform.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      <div>
        <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--bk-ink)" }}>{platform.name}</p>
        <p
          className="mt-0.5 uppercase"
          style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.06em", color: "var(--bk-ink-muted)" }}
        >
          {CATEGORY_LABELS[platform.category] ?? platform.category}
        </p>
      </div>

      <div
        className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ fontSize: "0.75rem", color: "var(--bk-accent-bright)" }}
      >
        <ExternalLink size={11} />
        <span>Open</span>
      </div>
    </button>
  );
}

export default function Dashboard() {
  const { user } = useSession();
  const navigate = useNavigate();
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loginStates, setLoginStates] = useState<LoginState[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [pRes, sRes] = await Promise.all([
        api.get<Platform[]>("/api/platforms"),
        api.get<LoginState[]>("/api/platform-sessions"),
      ]);
      if (pRes.success) setPlatforms(pRes.data);
      if (sRes.success) setLoginStates(sRes.data);
      setLoading(false);
    }
    void load();
  }, []);

  const loggedInIds = new Set(loginStates.filter((s) => s.is_logged_in).map((s) => s.platform_id));

  function handleOpen(platform: Platform) {
    void api.post("/api/activity/visit", { platform_id: platform.id });
    navigate(`/platform/${platform.id}`);
  }

  const filtered = platforms.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const grouped = Object.entries(CATEGORY_LABELS).reduce<Record<string, Platform[]>>((acc, [key]) => {
    const group = filtered.filter((p) => p.category === key);
    if (group.length > 0) acc[key] = group;
    return acc;
  }, {});

  const knownCategories = new Set(Object.keys(CATEGORY_LABELS));
  const other = filtered.filter((p) => !knownCategories.has(p.category));
  if (other.length > 0) grouped["other"] = other;

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bk-page)" }}>
        <Navbar />

        <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="w-8 h-0.5 mb-3" style={{ backgroundColor: "var(--bk-accent-bright)" }} />
              <h1 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--bk-ink)" }}>
                Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
              </h1>
              <p style={{ color: "var(--bk-ink-muted)", fontSize: "0.9375rem" }}>
                Pick a platform to open it inside SocialHub.
              </p>
            </div>
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded"
              style={{ backgroundColor: "var(--bk-accent-wash)", border: "1px solid var(--bk-accent-wash)" }}
            >
              <span
                className="uppercase"
                style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", color: "var(--bk-accent)" }}
              >
                {loggedInIds.size} session{loggedInIds.size !== 1 ? "s" : ""} active
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="relative mt-6 mb-8 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--bk-ink-muted)" }} />
            <input
              className="w-full pl-9 pr-3 py-2 rounded text-sm"
              style={{
                backgroundColor: "var(--bk-surface)",
                border: "1px solid var(--bk-border)",
                color: "var(--bk-ink)",
                outline: "none",
              }}
              placeholder="Search platforms…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div
                className="w-8 h-8 border-2 rounded-full animate-spin"
                style={{ borderColor: "var(--bk-border)", borderTopColor: "var(--bk-accent-bright)" }}
              />
            </div>
          ) : (
            <div className="space-y-10">
              {Object.entries(grouped).map(([category, items]) => (
                <section key={category}>
                  <h2
                    className="mb-4 uppercase"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: "var(--bk-ink-muted)",
                      borderBottom: "1px solid var(--bk-border)",
                      paddingBottom: "0.5rem",
                    }}
                  >
                    {CATEGORY_LABELS[category] ?? category}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {items.map((p) => (
                      <PlatformCard
                        key={p.id}
                        platform={p}
                        isLoggedIn={loggedInIds.has(p.id)}
                        onClick={() => handleOpen(p)}
                      />
                    ))}
                  </div>
                </section>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <p style={{ color: "var(--bk-ink-muted)" }}>No platforms match "{search}"</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
