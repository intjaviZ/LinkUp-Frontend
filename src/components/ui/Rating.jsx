export default function Rating({ value, total }) {
  if (value == null) return <span className="text-sm text-slate-400">Sin reseñas</span>;
  return (
    <span className="text-sm text-amber-600" aria-label={`Calificación ${value.toFixed(1)} de 5, ${total} reseñas`}>
      ★ {value.toFixed(1)} <span className="text-slate-500">({total})</span>
    </span>
  );
}

export function StarPicker({ value, onChange }) {
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Calificación">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          onClick={() => onChange(n)}
          className={`text-3xl ${n <= value ? "text-amber-500" : "text-slate-300"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}