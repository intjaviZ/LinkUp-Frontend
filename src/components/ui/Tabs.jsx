export default function Tabs({ options, value, onChange }) {
  return (
    <div className="flex gap-2 border-b border-slate-200">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium ${
            option.value === value
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}