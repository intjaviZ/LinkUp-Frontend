export default function Card({ className = "", children }) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5 ${className}`}
    >
      {children}
    </div>
  );
}