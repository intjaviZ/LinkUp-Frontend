import Button from "@/components/ui/Button";
import { ErrorAlert } from "@/components/ui/Alert";
import { InputField, SelectField } from "@/components/ui/FormFields";
import { asesorMateriasApi } from "@/api/asesorMateriasApi";
import { useAuth } from "@/hooks/useAuth";
import { useMaterias } from "@/hooks/useCatalogo";
import { useForm } from "@/hooks/useForm";
import { useMutation } from "@/hooks/useMutation";

const INITIAL = { materia: "", precio_hora: "" };

export default function PublicarMateriaForm({ registradas, onPublished }) {
  const { user } = useAuth();
  // Materias de su carrera + tronco común
  const materias = useMaterias(user.plan_estudiantil ? { carrera_id: user.plan_estudiantil } : {});
  const { values, handleChange, reset } = useForm(INITIAL);
  const { run, loading, error } = useMutation(asesorMateriasApi.create);
  const errors = error?.fieldErrors ?? {};
  const disponibles = materias.data?.filter((m) => !registradas.includes(m.id)) ?? [];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { ok } = await run({ materia: Number(values.materia), precio_hora: values.precio_hora });
    if (ok) {
      reset();
      onPublished();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-[2fr_1fr_auto] sm:items-end">
      <SelectField label="Materia" name="materia" value={values.materia} onChange={handleChange} error={errors.materia} required>
        <option value="">Selecciona una materia</option>
        {disponibles.map((m) => <option key={m.id} value={m.id}>{m.nombre} (cuat. {m.cuatrimestre})</option>)}
      </SelectField>
      <InputField
        label="Precio por hora" type="number" name="precio_hora" min={1} step="0.01"
        value={values.precio_hora} onChange={handleChange} error={errors.precio_hora} required
      />
      <Button type="submit" loading={loading}>Publicar</Button>
      <div className="sm:col-span-3"><ErrorAlert error={error ?? materias.error} /></div>
    </form>
  );
}