import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg ring-1 ring-slate-200/60 sm:p-8">
        <Outlet />
      </div>
    </main>
  );
}