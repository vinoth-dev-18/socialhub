import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PlatformViewer from "./pages/PlatformViewer";
import AdminDashboard from "./pages/AdminDashboard";

export const routes: RouteObject[] = [
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/platform/:id", element: <PlatformViewer /> },
  { path: "/admin", element: <AdminDashboard /> },
  { path: "*", element: <Navigate to="/" replace /> },
];
