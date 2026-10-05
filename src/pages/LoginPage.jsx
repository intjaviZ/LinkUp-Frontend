import { Link } from "react-router";
import Button from "@/components/ui/Button";
import { ErrorAlert } from "@/components/ui/Alert";
import { InputField } from "@/components/ui/FormFields";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { useMutation } from "@/hooks/useMutation";

const INITIAL = { email: "", password: "" };

export default function LoginPage() {
  const { login } = useAuth();
  const { values, handleChange } = useForm(INITIAL);
  const { run, loading, error } = useMutation(login);

  const handleSubmit = (event) => {
    event.preventDefault();
    run(values.email, values.password); // al iniciar sesión, GuestRoute redirige solo
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Iniciar sesión</h1>
      <ErrorAlert error={error} />
      <InputField label="Email" type="email" name="email" autoComplete="email" value={values.email} onChange={handleChange} required />
      <InputField label="Contraseña" type="password" name="password" autoComplete="current-password" value={values.password} onChange={handleChange} required />
      <Button type="submit" loading={loading} className="w-full">
        Entrar
      </Button>
      <p className="text-center text-sm text-slate-600">
        ¿No tienes cuenta?{" "}
        <Link to="/registro" className="text-indigo-600 underline-offset-2 hover:underline">
          Regístrate
        </Link>
      </p>
    </form>
  );
}