export default function SkillChips({ skills }) {
  if (!skills?.length) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {skills.map((skill) => (
        <li key={skill} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700 sm:px-2.5">
          {skill}
        </li>
      ))}
    </ul>
  );
}