import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        <Outlet />
      </div>
    </main>
  );
}