import { useState } from "react";
import { authApi } from "@/api/authApi";
import Alert, { ErrorAlert } from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import { InputField, TextareaField } from "@/components/ui/FormFields";
import { useForm } from "@/hooks/useForm";
import { useMutation } from "@/hooks/useMutation";

export default function PerfilForm({ user, onSaved }) {
  const { values, handleChange } = useForm({
    nombre: user.nombre,
    cuatrimestre_actual: String(user.cuatrimestre_actual ?? ""),
    biografia: user.biografia ?? "",
  });
  const [saved, setSaved] = useState(false);
  const { run, loading, error } = useMutation(authApi.updateMe);
  const errors = error?.fieldErrors ?? {};

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaved(false);
    const { ok, data } = await run({
      nombre: values.nombre,
      biografia: values.biografia,
      cuatrimestre_actual: values.cuatrimestre_actual ? Number(values.cuatrimestre_actual) : undefined,
    });
    if (ok) {
      onSaved(data);
      setSaved(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600 sm:p-4">
        <p>{user.email}</p>
        <p>{user.carrera ?? "Sin carrera"}</p>
      </div>
      <InputField label="Nombre" name="nombre" autoComplete="name" value={values.nombre} onChange={handleChange} error={errors.nombre} required />
      <InputField
        label="Cuatrimestre actual"
        type="number"
        min={1}
        name="cuatrimestre_actual"
        value={values.cuatrimestre_actual}
        onChange={handleChange}
        error={errors.cuatrimestre_actual}
      />
      <TextareaField
        label="Biografía"
        name="biografia"
        value={values.biografia}
        onChange={handleChange}
        error={errors.biografia}
        hint="Es la descripción que ven los estudiantes cuando ofreces asesorías."
      />
      <ErrorAlert error={error} />
      {saved && <Alert variant="success">Perfil actualizado.</Alert>}
      <Button type="submit" loading={loading}>
        Guardar cambios
      </Button>
    </form>
  );
}