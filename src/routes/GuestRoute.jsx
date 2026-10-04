import { Navigate, Outlet } from "react-router";
import { hasSession } from "@/utils/session";

export default function GuestRoute() {
  return hasSession() ? <Navigate to="/" replace /> : <Outlet />;
}