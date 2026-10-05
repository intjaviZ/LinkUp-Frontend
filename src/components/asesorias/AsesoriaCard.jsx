import { Link } from "react-router";
import Card from "@/components/ui/Card";
import { ROL } from "@/utils/constants";
import { formatDateTime, formatMoney } from "@/utils/format";
import EstadoBadge from "./EstadoBadge";

export default function AsesoriaCard({ asesoria }) {
  const esEstudiante = asesoria.mi_rol === ROL.ESTUDIANTE;
  const contraparte = esEstudiante ? asesoria.asesor : asesoria.estudiante;

  return (
    <Link to={`/asesorias/${asesoria.id}`} className="block">
      <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">{asesoria.materia.nombre}</p>
          <p className="text-sm text-slate-500">
            {esEstudiante ? "Asesor" : "Estudiante"}: {contraparte.nombre} · {formatDateTime(asesoria.fecha)} · {asesoria.horas} h
          </p>
        </div>
        <div className="flex items-start justify-between gap-2 sm:flex-col sm:items-end sm:justify-center">
          <EstadoBadge estado={asesoria.estado} />
          <p className="font-semibold">{formatMoney(asesoria.precio_total)}</p>
        </div>
      </Card>
    </Link>
  );
}