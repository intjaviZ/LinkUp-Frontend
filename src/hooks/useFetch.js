import { useCallback, useEffect, useRef, useState } from "react";

/** Carga datos al montar y cada vez que cambian `deps`. `reload()` vuelve a pedirlos. */
export function useFetch(fetcher, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [version, setVersion] = useState(0);
  const fetcherRef = useRef(fetcher);

  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  useEffect(() => {
    let cancelled = false; // evita pintar respuestas viejas
    const run = async () => {
      if (cancelled) return;
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const data = await fetcherRef.current();
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (!cancelled) {
          setState((prev) => ({ ...prev, loading: false, error }));
        }
      }
    };
    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, version]);

  const reload = useCallback(() => setVersion((v) => v + 1), []);
  return { ...state, reload };
}