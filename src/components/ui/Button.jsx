import { Link } from "react-router";

const BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium shadow-sm ring-1 ring-transparent transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4";
const VARIANTS = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800",
  secondary: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
};
const classes = (variant, extra) => `${BASE} ${VARIANTS[variant]} ${extra}`.trim();

export default function Button({
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  children,
  ...props
}) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classes(variant, className)}
      {...props}
    >
      {loading ? "Procesando..." : children}
    </button>
  );
}

export function ButtonLink({ variant = "primary", className = "", ...props }) {
  return <Link className={classes(variant, className)} {...props} />;
}