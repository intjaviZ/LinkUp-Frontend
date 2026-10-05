import AsyncBoundary from "@/components/ui/AsyncBoundary";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import OfertaEditable from "@/components/materias/OfertaEditable";
import PublicarMateriaForm from "@/components/materias/PublicarMateriaForm";
import SkillsSection from "@/components/materias/SkillsSection";
import { useMisOfertas } from "@/hooks/useOfertas";

export default function MisMateriasPage() {
  const ofertas = useMisOfertas();
  const registradas = ofertas.data?.map((o) => o.materia.id) ?? [];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Mis materias y skills</h1>
        <p className="mt-1 text-sm text-slate-500 sm:text-base">Gestiona lo que ofreces y tus fortalezas como asesor.</p>
      </div>

      <section className="space-y-2 sm:space-y-3">
        <h2 className="text-lg font-semibold">Publicar una materia</h2>
        <Card>
          <PublicarMateriaForm registradas={registradas} onPublished={ofertas.reload} />
        </Card>
      </section>

      <section className="space-y-2 sm:space-y-3">
        <h2 className="text-lg font-semibold">Materias que ofrezco</h2>
        <AsyncBoundary state={ofertas}>
          {ofertas.data?.length ? (
            <div className="space-y-2 sm:space-y-3">
              {ofertas.data.map((oferta) => (
                <OfertaEditable key={oferta.id} oferta={oferta} onChanged={ofertas.reload} />
              ))}
            </div>
          ) : (
            <EmptyState>Todavía no ofreces ninguna materia.</EmptyState>
          )}
        </AsyncBoundary>
      </section>

      <section className="space-y-2 sm:space-y-3">
        <h2 className="text-lg font-semibold">Mis skills</h2>
        <Card>
          <SkillsSection />
        </Card>
      </section>
    </div>
  );
}