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
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-4 py-3">
          <span className="text-lg font-bold">LinkUp</span>
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? "font-semibold text-indigo-600" : "text-slate-600 hover:text-slate-900"
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="ml-auto flex items-center gap-3 text-sm">
            <span className="text-slate-600">{user.nombre}</span>
            <Button variant="secondary" onClick={logout}>Salir</Button>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl p-4">
        <Outlet />
      </main>
    </div>
  );
}