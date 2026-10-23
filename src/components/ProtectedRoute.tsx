import { Navigate } from "react-router-dom";
import { useSession } from "./AuthSessionProvider";

interface Props {
  children: React.ReactNode;
  role?: string;
}

export function ProtectedRoute({ children, role }: Props) {
  const { status, user } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bk-page)" }}>
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-8 h-8 border-2 rounded-full animate-spin"
            style={{ borderColor: "var(--bk-border)", borderTopColor: "var(--bk-accent-bright)" }}
          />
          <span style={{ color: "var(--bk-ink-muted)", fontSize: "0.875rem" }}>Loading…</span>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
