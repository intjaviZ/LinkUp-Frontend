import { useCallback, useEffect, useRef, useState } from "react";

/** Envuelve una escritura. `run()` nunca lanza: devuelve { ok, data } o { ok: false, error }. */
export function useMutation(mutationFn) {
  const [state, setState] = useState({ loading: false, error: null });
  const fnRef = useRef(mutationFn);

  useEffect(() => {
    fnRef.current = mutationFn;
  });

  const run = useCallback(async (...args) => {
    setState({ loading: true, error: null });
    try {
      const data = await fnRef.current(...args);
      setState({ loading: false, error: null });
      return { ok: true, data };
    } catch (error) {
      setState({ loading: false, error });
      return { ok: false, error };
    }
  }, []);

  const reset = useCallback(() => setState({ loading: false, error: null }), []);
  return { run, reset, ...state };
}