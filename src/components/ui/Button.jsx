import { Link } from "react-router";

const BASE =
  "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed";
const VARIANTS = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300",
  secondary: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50",
  danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300",
};
const classes = (variant, extra) => `${BASE} ${VARIANTS[variant]} ${extra}`.trim();

export default function Button({ variant = "primary", loading = false, disabled = false, className = "", children, ...props }) {
  return (
    <button type="button" disabled={disabled || loading} className={classes(variant, className)} {...props}>
      {loading ? "Procesando..." : children}
    </button>
  );
}

export function ButtonLink({ variant = "primary", className = "", ...props }) {
  return <Link className={classes(variant, className)} {...props} />;
}