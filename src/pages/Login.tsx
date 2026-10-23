import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Globe, Layers, BarChart3, Shield } from "lucide-react";
import { useSession } from "@/components/AuthSessionProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const { status, signIn } = useSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (status === "authenticated") return <Navigate to="/dashboard" replace />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn(email, password);
    setLoading(false);
    if (!res.success) {
      setError(res.error);
      return;
    }
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: brand panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12"
        style={{ backgroundColor: "var(--bk-navy-deep)" }}
      >
        <Link to="/" className="flex items-center gap-2 no-underline">
          <Globe size={22} className="text-amber-400" />
          <span style={{ color: "white", fontWeight: 700, fontSize: "1.125rem" }}>SocialHub</span>
        </Link>

        <div>
          <div className="w-12 h-0.5 mb-6" style={{ backgroundColor: "var(--bk-accent-bright)" }} />
          <h1
            className="text-white mb-4"
            style={{ fontSize: "2rem", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.2 }}
          >
            Your social world,
            <br />
            <span style={{ color: "var(--bk-accent-bright)" }}>all in one hub</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
            Access 15+ platforms without the tab chaos. Session-aware and always ready.
          </p>
          <div className="mt-8 space-y-4">
            {[
              { icon: Layers, text: "15+ social platforms in one dashboard" },
              { icon: BarChart3, text: "Admin analytics with live usage charts" },
              { icon: Shield, text: "Role-based access — admin & consumer" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <item.icon size={14} style={{ color: "var(--bk-accent-bright)" }} />
                </div>
                <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9375rem" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-lg p-4 flex items-start gap-3"
          style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div
            className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm font-bold text-white"
            style={{ backgroundColor: "var(--bk-accent-bright)" }}
          >
            A
          </div>
          <div>
            <p style={{ color: "white", fontSize: "0.875rem", fontWeight: 600 }}>Admin tip</p>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8125rem" }}>
              The first person to register becomes the admin automatically.
            </p>
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div
        className="flex-1 flex items-center justify-center px-8"
        style={{ backgroundColor: "var(--bk-page)" }}
      >
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8 no-underline">
            <Globe size={20} style={{ color: "var(--bk-accent-bright)" }} />
            <span style={{ color: "var(--bk-ink)", fontWeight: 700 }}>SocialHub</span>
          </Link>

          <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--bk-ink)", marginBottom: "0.5rem" }}>
            Sign in
          </h2>
          <p style={{ color: "var(--bk-ink-muted)", fontSize: "0.9375rem", marginBottom: "2rem" }}>
            Don’t have an account?{" "}
            <Link to="/signup" style={{ color: "var(--bk-accent-bright)", fontWeight: 600 }}>Create one</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--bk-ink-muted)" }}>Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--bk-ink-muted)" }}>Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1"
              />
            </div>

            {error && (
              <p className="text-sm rounded px-3 py-2" style={{ backgroundColor: "#FEE2E2", color: "var(--bk-danger)" }}>
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-2"
              style={{ backgroundColor: "var(--bk-ink)", color: "white" }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center" style={{ fontSize: "0.8125rem", color: "var(--bk-ink-muted)" }}>
            <Link to="/forgot-password" style={{ color: "var(--bk-accent)" }}>Forgot your password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
