import { useCallback, useState } from "react";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }, []);

  const reset = useCallback(() => setValues(initialValues), [initialValues]);

  return { values, handleChange, setAll: setValues, reset };
}