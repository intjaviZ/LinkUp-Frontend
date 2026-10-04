import { useState } from "react";
import { resenasApi } from "@/api/resenasApi";
import { ErrorAlert } from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { TextareaField } from "@/components/ui/FormFields";
import { StarPicker } from "@/components/ui/Rating";
import { useForm } from "@/hooks/useForm";
import { useMutation } from "@/hooks/useMutation";

const INITIAL = { comentario: "" };

export default function ReseniaForm({ asesoriaId, onCreated }) {
  const [puntuacion, setPuntuacion] = useState(0);
  const { values, handleChange } = useForm(INITIAL);
  const { run, loading, error } = useMutation(resenasApi.create);
  const errors = error?.fieldErrors ?? {};

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { ok } = await run({ asesoria: asesoriaId, puntuacion, comentario: values.comentario });
    if (ok) onCreated();
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="font-semibold">Califica esta asesoría</h2>
        <StarPicker value={puntuacion} onChange={setPuntuacion} />
        <TextareaField
          label="Comentario (opcional)" name="comentario" value={values.comentario}
          onChange={handleChange} error={errors.comentario} maxLength={1000}
        />
        <ErrorAlert error={error} />
        <Button type="submit" loading={loading} disabled={puntuacion === 0}>Enviar reseña</Button>
      </form>
    </Card>
  );
}