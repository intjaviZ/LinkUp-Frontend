import { NavLink, Outlet } from "react-router";

const links = [
  { to: "/asesores", label: "Catálogo" },
  { to: "/asesorias", label: "Mis asesorías" },
  { to: "/mis-materias", label: "Mis materias" },
  { to: "/perfil", label: "Perfil" },
];

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
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
        </nav>
      </header>
      <main className="mx-auto max-w-6xl p-4">
        <Outlet />
      </main>
    </div>
  );
}