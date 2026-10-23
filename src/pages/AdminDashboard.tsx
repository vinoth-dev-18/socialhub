import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { Users, Activity, TrendingUp, Clock, Shield } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { api } from "@/lib/api-client";

interface AdminStats {
  total_users: number;
  total_visits: number;
  active_today: number;
  top_platforms: {
    platform_id: string;
    platform_name: string;
    platform_slug: string;
    total_visits: number;
    unique_users: number;
  }[];
  user_summaries: {
    user_id: string;
    user_email: string;
    user_name: string;
    total_visits: number;
    platforms_used: number;
    last_active: string | null;
  }[];
}

const CHART_COLORS = [
  "#B45309", "#16233F", "#4A5872", "#92400E", "#7C3AED", "#0E7490",
  "#B91C1C", "#065F46", "#1D4ED8", "#6B21A8",
];

function StatCard({ icon: Icon, label, value, sub }: { icon: typeof Users; label: string; value: string | number; sub?: string }) {
  return (
    <div
      className="rounded-lg p-6"
      style={{ backgroundColor: "var(--bk-surface)", border: "1px solid var(--bk-border)" }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className="uppercase"
            style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", color: "var(--bk-ink-muted)" }}
          >
            {label}
          </p>
          <p
            className="mt-1"
            style={{ fontFamily: "var(--font-mono)", fontSize: "1.75rem", fontWeight: 600, color: "var(--bk-ink)" }}
          >
            {value}
          </p>
          {sub && <p style={{ fontSize: "0.8125rem", color: "var(--bk-ink-muted)", marginTop: "0.25rem" }}>{sub}</p>}
        </div>
        <div
          className="w-9 h-9 rounded flex items-center justify-center shrink-0"
          style={{ backgroundColor: "var(--bk-accent-wash)" }}
        >
          <Icon size={18} style={{ color: "var(--bk-accent)" }} />
        </div>
      </div>
    </div>
  );
}

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const res = await api.get<AdminStats>("/api/activity/admin/stats");
      if (res.success) {
        setStats(res.data);
      } else {
        setError(res.error);
      }
      setLoading(false);
    }
    void load();
  }, []);

  return (
    <ProtectedRoute role="admin">
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bk-page)" }}>
        <Navbar />

        <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-9 h-9 rounded flex items-center justify-center"
              style={{ backgroundColor: "var(--bk-navy-deep)" }}
            >
              <Shield size={18} style={{ color: "var(--bk-accent-bright)" }} />
            </div>
            <div>
              <div className="w-8 h-0.5 mb-1" style={{ backgroundColor: "var(--bk-accent-bright)" }} />
              <h1 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--bk-ink)" }}>Admin dashboard</h1>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center py-20">
              <div
                className="w-8 h-8 border-2 rounded-full animate-spin"
                style={{ borderColor: "var(--bk-border)", borderTopColor: "var(--bk-accent-bright)" }}
              />
            </div>
          )}

          {error && (
            <div className="rounded px-4 py-3" style={{ backgroundColor: "#FEE2E2", color: "var(--bk-danger)" }}>
              {error}
            </div>
          )}

          {stats && (
            <>
              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <StatCard icon={Users} label="Total users" value={stats.total_users} />
                <StatCard icon={Activity} label="Total visits" value={stats.total_visits} />
                <StatCard icon={TrendingUp} label="Active today" value={stats.active_today} sub="unique users last 24h" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Top platforms bar chart */}
                <div
                  className="rounded-lg p-6"
                  style={{ backgroundColor: "var(--bk-surface)", border: "1px solid var(--bk-border)" }}
                >
                  <h2
                    className="mb-4"
                    style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--bk-ink)" }}
                  >
                    Top platforms by visits
                  </h2>
                  {stats.top_platforms.length === 0 ? (
                    <p style={{ color: "var(--bk-ink-muted)", fontSize: "0.875rem" }}>No visits yet.</p>
                  ) : (
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart
                        data={stats.top_platforms.slice(0, 8)}
                        margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                      >
                        <XAxis
                          dataKey="platform_name"
                          tick={{ fontSize: 11, fill: "var(--bk-ink-muted)" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fontFamily: "var(--font-mono)", fontSize: 11, fill: "var(--bk-ink-muted)" }}
                          axisLine={false}
                          tickLine={false}
                          allowDecimals={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--bk-surface)",
                            border: "1px solid var(--bk-border)",
                            borderRadius: 4,
                            fontSize: 12,
                          }}
                        />
                        <Bar dataKey="total_visits" fill="var(--bk-ink)" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {/* Pie chart */}
                <div
                  className="rounded-lg p-6"
                  style={{ backgroundColor: "var(--bk-surface)", border: "1px solid var(--bk-border)" }}
                >
                  <h2
                    className="mb-4"
                    style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--bk-ink)" }}
                  >
                    Platform share (unique users)
                  </h2>
                  {stats.top_platforms.filter((p) => p.unique_users > 0).length === 0 ? (
                    <p style={{ color: "var(--bk-ink-muted)", fontSize: "0.875rem" }}>No data yet.</p>
                  ) : (
                    <ResponsiveContainer width="100%" height={240}>
                      <PieChart>
                        <Pie
                          data={stats.top_platforms.filter((p) => p.unique_users > 0)}
                          dataKey="unique_users"
                          nameKey="platform_name"
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          innerRadius={40}
                        >
                          {stats.top_platforms
                            .filter((p) => p.unique_users > 0)
                            .map((_, i) => (
                              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend
                          iconSize={10}
                          wrapperStyle={{ fontSize: 11, color: "var(--bk-ink-muted)" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--bk-surface)",
                            border: "1px solid var(--bk-border)",
                            borderRadius: 4,
                            fontSize: 12,
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* User activity table */}
              <div
                className="rounded-lg overflow-hidden"
                style={{ backgroundColor: "var(--bk-surface)", border: "1px solid var(--bk-border)" }}
              >
                <div className="px-6 py-4" style={{ borderBottom: "1px solid var(--bk-border)" }}>
                  <h2 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--bk-ink)" }}>All users</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ backgroundColor: "var(--bk-surface-raised)" }}>
                        {["User", "Platforms used", "Total visits", "Last active"].map((h) => (
                          <th
                            key={h}
                            className="text-left px-6 py-3 uppercase"
                            style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.06em", color: "var(--bk-ink-muted)" }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {stats.user_summaries.map((u, i) => (
                        <tr
                          key={u.user_id}
                          style={{ borderTop: i > 0 ? "1px solid var(--bk-border)" : undefined }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                                style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
                              >
                                {u.user_name[0]?.toUpperCase() ?? "?"}
                              </div>
                              <div>
                                <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--bk-ink)" }}>
                                  {u.user_name}
                                </p>
                                <p style={{ fontSize: "0.8125rem", color: "var(--bk-ink-muted)" }}>{u.user_email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className="px-2 py-0.5 rounded"
                              style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--bk-accent)", backgroundColor: "var(--bk-accent-wash)" }}
                            >
                              {u.platforms_used}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "var(--bk-ink)" }}>
                              {u.total_visits.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5">
                              <Clock size={12} style={{ color: "var(--bk-ink-muted)" }} />
                              <span style={{ fontSize: "0.8125rem", color: "var(--bk-ink-muted)" }}>
                                {formatDate(u.last_active)}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {stats.user_summaries.length === 0 && (
                    <div className="text-center py-10" style={{ color: "var(--bk-ink-muted)" }}>
                      No users yet.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
