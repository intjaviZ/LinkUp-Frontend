import Card from "@/components/ui/Card";
import Rating from "@/components/ui/Rating";
import SkillChips from "@/components/shared/SkillChips";

export default function AsesorHeader({ asesor }) {
  return (
    <Card className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{asesor.nombre}</h1>
          <p className="text-sm text-slate-500">
            {asesor.carrera ?? "Sin carrera"} · Cuatrimestre {asesor.cuatrimestre_actual}
          </p>
        </div>
        <Rating value={asesor.rating_promedio} total={asesor.total_resenas} />
      </div>
      {asesor.biografia && <p className="text-slate-700">{asesor.biografia}</p>}
      <SkillChips skills={asesor.skills} />
    </Card>
  );
}