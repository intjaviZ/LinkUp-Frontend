import Button from "@/components/ui/Button";
import AsyncBoundary from "@/components/ui/AsyncBoundary";
import { ErrorAlert } from "@/components/ui/Alert";
import EmptyState from "@/components/ui/EmptyState";
import { InputField } from "@/components/ui/FormFields";
import { skillsApi } from "@/api/skillsApi";
import { useForm } from "@/hooks/useForm";
import { useMutation } from "@/hooks/useMutation";
import { useSkills } from "@/hooks/useSkills";

const INITIAL = { skill: "" };

export default function SkillsSection() {
  const skills = useSkills();
  const { values, handleChange, reset } = useForm(INITIAL);
  const add = useMutation(skillsApi.create);
  const remove = useMutation(skillsApi.remove);

  const handleAdd = async (event) => {
    event.preventDefault();
    const { ok } = await add.run(values.skill);
    if (ok) {
      reset();
      skills.reload();
    }
  };

  const handleRemove = async (id) => {
    const { ok } = await remove.run(id);
    if (ok) skills.reload();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAdd} className="flex items-end gap-3">
        <div className="flex-1">
          <InputField label="Nueva skill o tema clave" name="skill" value={values.skill} onChange={handleChange} maxLength={100} required />
        </div>
        <Button type="submit" loading={add.loading}>Agregar</Button>
      </form>
      <ErrorAlert error={add.error ?? remove.error} />

      <AsyncBoundary state={skills}>
        {skills.data?.length ? (
          <ul className="flex flex-wrap gap-2">
            {skills.data.map((item) => (
              <li key={item.id} className="flex items-center gap-2 rounded-full bg-slate-100 py-1 pl-3 pr-2 text-sm">
                {item.skill}
                <button type="button" onClick={() => handleRemove(item.id)} aria-label={`Quitar ${item.skill}`} className="text-slate-500 hover:text-red-600">
                  ✕
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState>Aún no has agregado skills.</EmptyState>
        )}
      </AsyncBoundary>
    </div>
  );
}