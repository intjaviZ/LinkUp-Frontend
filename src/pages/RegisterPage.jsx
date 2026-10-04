import { Link } from "react-router";
import Button from "@/components/ui/Button";
import { ErrorAlert } from "@/components/ui/Alert";
import { InputField, SelectField, TextareaField } from "@/components/ui/FormFields";
import { useAuth } from "@/hooks/useAuth";
import { useCarreras } from "@/hooks/useCatalogo";
import { useForm } from "@/hooks/useForm";
import { useMutation } from "@/hooks/useMutation";

const INITIAL = { nombre: "", email: "", password: "", plan_estudiantil: "", cuatrimestre_actual: "", biografia: "" };

export default function RegisterPage() {
  const { register } = useAuth();
  const carreras = useCarreras();
  const { values, handleChange } = useForm(INITIAL);
  const { run, loading, error } = useMutation(register);
  const errors = error?.fieldErrors ?? {};
  const carrera = carreras.data?.find((c) => String(c.id) === values.plan_estudiantil);

  const handleSubmit = (event) => {
    event.preventDefault();
    run({
      ...values,
      plan_estudiantil: Number(values.plan_estudiantil),
      cuatrimestre_actual: Number(values.cuatrimestre_actual),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">Crear cuenta</h1>
      <ErrorAlert error={error ?? carreras.error} />
      <InputField label="Nombre" name="nombre" value={values.nombre} onChange={handleChange} error={errors.nombre} required />
      <InputField label="Email" type="email" name="email" value={values.email} onChange={handleChange} error={errors.email} required />
      <InputField
        label="Contraseña" type="password" name="password" value={values.password} onChange={handleChange}
        error={errors.password} hint="Mínimo 8 caracteres, no demasiado común ni solo números." required
      />
      <SelectField label="Carrera" name="plan_estudiantil" value={values.plan_estudiantil} onChange={handleChange} error={errors.plan_estudiantil} required>
        <option value="">Selecciona tu carrera</option>
        {carreras.data?.map((c) => <option key={c.id} value={c.id}>{c.carrera}</option>)}
      </SelectField>
      <InputField
        label="Cuatrimestre actual" type="number" name="cuatrimestre_actual" min={1} max={carrera?.numero_cuatrimestres}
        value={values.cuatrimestre_actual} onChange={handleChange} error={errors.cuatrimestre_actual} required
      />
      <TextareaField
        label="Biografía (opcional)" name="biografia" value={values.biografia} onChange={handleChange}
        error={errors.biografia} hint="Si ofreces asesorías, esto es lo que verán los estudiantes."
      />
      <Button type="submit" loading={loading} className="w-full">Registrarme</Button>
      <p className="text-center text-sm text-slate-600">
        ¿Ya tienes cuenta? <Link to="/login" className="text-indigo-600 hover:underline">Inicia sesión</Link>
      </p>
    </form>
  );
}