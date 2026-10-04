import { Navigate, Outlet, useLocation } from "react-router";
import { hasSession } from "@/utils/session";

export default function ProtectedRoute() {
  const location = useLocation();
  return hasSession() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}