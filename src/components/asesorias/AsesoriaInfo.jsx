import { Link } from "react-router";
import Card from "@/components/ui/Card";
import { ROL } from "@/utils/constants";
import { formatDateTime } from "@/utils/format";
import DesgloseCostos from "./DesgloseCostos";
import EstadoBadge from "./EstadoBadge";

export default function AsesoriaInfo({ asesoria }) {
  const esEstudiante = asesoria.mi_rol === ROL.ESTUDIANTE;
  const contraparte = esEstudiante ? asesoria.asesor : asesoria.estudiante;

  return (
    <Card className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{asesoria.materia.nombre}</h1>
          <p className="text-sm text-slate-500">
            {esEstudiante ? "Asesor" : "Estudiante"}:{" "}
            {esEstudiante ? (
              <Link to={`/asesores/${contraparte.id}`} className="text-indigo-600 underline-offset-2 hover:underline">
                {contraparte.nombre}
              </Link>
            ) : (
              contraparte.nombre
            )}
          </p>
        </div>
        <EstadoBadge estado={asesoria.estado} />
      </div>
      <p className="text-sm">
        <strong>Fecha:</strong> {formatDateTime(asesoria.fecha)} · {asesoria.horas} h
      </p>
      <DesgloseCostos data={asesoria} />
    </Card>
  );
}