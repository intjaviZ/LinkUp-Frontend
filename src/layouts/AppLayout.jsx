import { NavLink, Outlet } from "react-router";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { to: "/asesores", label: "Catálogo" },
  { to: "/asesorias", label: "Mis asesorías" },
  { to: "/mis-materias", label: "Mis materias" },
  { to: "/perfil", label: "Perfil" },
];

export default function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-3 py-3 sm:gap-6 sm:px-4">
          <span className="text-lg font-bold">LinkUp</span>
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "text-sm font-semibold text-indigo-600 sm:text-base"
                    : "text-sm text-slate-600 hover:text-slate-900 sm:text-base"
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className="ml-auto flex flex-wrap items-center justify-end gap-2 text-sm sm:gap-3">
            <span className="max-w-[150px] truncate text-slate-600 sm:max-w-none">{user.nombre}</span>
            <Button variant="secondary" onClick={logout}>
              Salir
            </Button>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl p-3 sm:p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  );
}