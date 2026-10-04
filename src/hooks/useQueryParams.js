import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

/** Filtros y página guardados en la URL. `defaults` debe definirse fuera del componente. */
export function useQueryParams(defaults = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(
    () => ({ ...defaults, ...Object.fromEntries(searchParams) }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams]
  );

  const update = useCallback(
    (patch) => {
      const next = { ...params, ...patch };
      const clean = Object.fromEntries(
        Object.entries(next).filter(([, v]) => v !== "" && v !== null && v !== undefined)
      );
      setSearchParams(clean);
    },
    [params, setSearchParams]
  );

  return [params, update];
}