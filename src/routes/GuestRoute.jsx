import { Navigate, Outlet, useLocation } from "react-router";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";

export default function GuestRoute() {
  const { isAuthenticated, initializing } = useAuth();
  const location = useLocation();

  if (initializing) {
    return <div className="grid min-h-screen place-items-center"><Spinner /></div>;
  }
  // Tras iniciar sesión, vuelve a la página que se intentaba abrir
  return isAuthenticated ? <Navigate to={location.state?.from?.pathname ?? "/"} replace /> : <Outlet />;
}