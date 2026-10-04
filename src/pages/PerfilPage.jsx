import Card from "@/components/ui/Card";
import PerfilForm from "@/components/perfil/PerfilForm";
import { useAuth } from "@/hooks/useAuth";

export default function PerfilPage() {
  const { user, updateUser } = useAuth();

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Mi perfil</h1>
      <Card><PerfilForm user={user} onSaved={updateUser} /></Card>
    </div>
  );
}