import Card from "@/components/ui/Card";
import PerfilForm from "@/components/perfil/PerfilForm";
import { useAuth } from "@/hooks/useAuth";

export default function PerfilPage() {
  const { user, updateUser } = useAuth();

  return (
    <div className="mx-auto max-w-2xl space-y-4 sm:space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Mi perfil</h1>
        <p className="mt-1 text-sm text-slate-500 sm:text-base">
          Actualiza tu información para que otros puedan conocerte.
        </p>
      </div>
      <Card>
        <PerfilForm user={user} onSaved={updateUser} />
      </Card>
    </div>
  );
}