import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center p-4 text-center">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="text-slate-600">Esta página no existe.</p>
        <Link to="/" className="text-indigo-600 hover:underline">Volver al inicio</Link>
      </div>
    </main>
  );
}