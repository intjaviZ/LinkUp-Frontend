import { formatMoney } from "@/utils/format";

export default function DesgloseCostos({ data }) {
  const rows = [
    ["Precio por hora", formatMoney(data.precio_hora)],
    ["Horas", data.horas],
    ["Costo base", formatMoney(data.monto_base)],
    ["Comisión de la plataforma", formatMoney(data.comision_plataforma)],
  ];

  return (
    <dl className="space-y-1 rounded-lg bg-slate-50 p-4 text-sm">
      {rows.map(([label, value]) => (
        <div key={label} className="flex justify-between">
          <dt className="text-slate-600">{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
      <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-semibold">
        <dt>Total a pagar</dt>
        <dd>{formatMoney(data.precio_total)}</dd>
      </div>
    </dl>
  );
}