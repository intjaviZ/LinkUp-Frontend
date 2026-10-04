import { Navigate, Outlet, useLocation } from "react-router";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute() {
  const { isAuthenticated, initializing } = useAuth();
  const location = useLocation();

  if (initializing) {
    return <div className="grid min-h-screen place-items-center"><Spinner /></div>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}