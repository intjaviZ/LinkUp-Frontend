import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { InputField, SelectField } from "@/components/ui/FormFields";
import { useCarreras, useMaterias } from "@/hooks/useCatalogo";
import { useForm } from "@/hooks/useForm";

const FILTER_KEYS = ["search", "carrera_id", "materia_id", "cuatrimestre", "tronco_comun", "min_precio", "max_precio", "min_rating", "ordering"];
const EMPTY = Object.fromEntries(FILTER_KEYS.map((key) => [key, ""]));
const fromParams = (params) => Object.fromEntries(FILTER_KEYS.map((key) => [key, params[key] ?? ""]));

export default function CatalogFilters({ params, onApply }) {
  const { values, handleChange, setAll } = useForm(fromParams(params));
  const carreras = useCarreras();
  const materias = useMaterias(values.carrera_id ? { carrera_id: values.carrera_id } : {});

  const handleCarrera = (event) => setAll({ ...values, carrera_id: event.target.value, materia_id: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    onApply(values);
  };

  const handleClear = () => {
    setAll(EMPTY);
    onApply(EMPTY);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InputField label="Buscar (asesor o materia)" name="search" value={values.search} onChange={handleChange} />
        <SelectField label="Carrera" name="carrera_id" value={values.carrera_id} onChange={handleCarrera} hint="Incluye tronco común">
          <option value="">Todas</option>
          {carreras.data?.map((c) => <option key={c.id} value={c.id}>{c.carrera}</option>)}
        </SelectField>
        <SelectField label="Materia" name="materia_id" value={values.materia_id} onChange={handleChange}>
          <option value="">Todas</option>
          {materias.data?.map((m) => <option key={m.id} value={m.id}>{m.nombre}</option>)}
        </SelectField>
        <InputField label="Cuatrimestre" type="number" min={1} name="cuatrimestre" value={values.cuatrimestre} onChange={handleChange} />
        <SelectField label="Tipo de materia" name="tronco_comun" value={values.tronco_comun} onChange={handleChange}>
          <option value="">Todas</option>
          <option value="true">Solo tronco común</option>
          <option value="false">Solo especialidad</option>
        </SelectField>
        <InputField label="Precio mínimo" type="number" min={0} name="min_precio" value={values.min_precio} onChange={handleChange} />
        <InputField label="Precio máximo" type="number" min={0} name="max_precio" value={values.max_precio} onChange={handleChange} />
        <SelectField label="Calificación mínima" name="min_rating" value={values.min_rating} onChange={handleChange}>
          <option value="">Cualquiera</option>
          <option value="3">3 ★ o más</option>
          <option value="4">4 ★ o más</option>
          <option value="4.5">4.5 ★ o más</option>
        </SelectField>
        <SelectField label="Ordenar por" name="ordering" value={values.ordering} onChange={handleChange}>
          <option value="">Por defecto</option>
          <option value="precio_hora">Precio: menor a mayor</option>
          <option value="-precio_hora">Precio: mayor a menor</option>
          <option value="-rating_promedio">Mejor calificados</option>
        </SelectField>
        <div className="flex gap-2 sm:col-span-2 lg:col-span-4">
          <Button type="submit">Filtrar</Button>
          <Button variant="secondary" onClick={handleClear}>Limpiar</Button>
        </div>
      </form>
    </Card>
  );
}