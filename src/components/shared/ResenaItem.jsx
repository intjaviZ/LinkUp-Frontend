import Card from "@/components/ui/Card";
import { formatDateTime } from "@/utils/format";

export default function ResenaItem({ resena }) {
  return (
    <Card className="space-y-2">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-amber-500" aria-label={`Puntuación ${resena.puntuacion} de 5`}>
          {"★".repeat(resena.puntuacion)}
          <span className="text-slate-300">{"★".repeat(5 - resena.puntuacion)}</span>
        </span>
        <span className="text-xs text-slate-500">{formatDateTime(resena.created_at)}</span>
      </div>
      {resena.comentario && <p className="text-sm leading-relaxed text-slate-700">{resena.comentario}</p>}
      {resena.estudiante && (
        <p className="text-xs text-slate-500">
          {resena.estudiante.nombre}
          {resena.materia && ` · ${resena.materia}`}
        </p>
      )}
    </Card>
  );
}