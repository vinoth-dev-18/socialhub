import { Globe, LogOut, LayoutDashboard, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "./AuthSessionProvider";
import { Button } from "./ui/button";

export function Navbar() {
  const { user, status, signOut } = useSession();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate("/");
  }

  return (
    <nav
      style={{ backgroundColor: "var(--bk-navy-deep)", height: 56 }}
      className="w-full flex items-center px-6 shrink-0 z-50 sticky top-0"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 text-white no-underline">
        <Globe size={20} className="text-amber-400" />
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1rem", color: "white" }}>
          SocialHub
        </span>
      </Link>

      <div className="flex-1" />

      {status === "authenticated" && user ? (
        <div className="flex items-center gap-3">
          {user.role === "admin" && (
            <Link to="/admin">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-amber-400 hover:bg-white/10 gap-1.5"
              >
                <Shield size={15} />
                <span className="text-xs font-semibold uppercase tracking-widest">Admin</span>
              </Button>
            </Link>
          )}
          <Link to="/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-amber-400 hover:bg-white/10 gap-1.5"
            >
              <LayoutDashboard size={15} />
              <span className="text-xs font-semibold uppercase tracking-widest">Dashboard</span>
            </Button>
          </Link>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
            style={{ backgroundColor: "var(--bk-accent-bright)" }}
          >
            {(user.name ?? user.email ?? "U")[0].toUpperCase()}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="text-white hover:text-red-400 hover:bg-white/10"
          >
            <LogOut size={15} />
          </Button>
        </div>
      ) : (
        status !== "loading" && (
          <div className="flex gap-2">
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 text-sm"
              >
                Sign in
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                size="sm"
                className="text-sm"
                style={{ backgroundColor: "var(--bk-accent-bright)", color: "white" }}
              >
                Get started
              </Button>
            </Link>
          </div>
        )
      )}
    </nav>
  );
}
