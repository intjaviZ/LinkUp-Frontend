import { useCallback, useEffect, useMemo, useState } from "react";
import { authApi } from "@/api/authApi";
import { setSessionExpiredHandler } from "@/api/http";
import { clearSession, getAccessToken, saveTokens } from "@/utils/session";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(() => Boolean(getAccessToken()));

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  // Si el API reporta que la sesión venció, se cierra sola
  useEffect(() => {
    setSessionExpiredHandler(logout);
  }, [logout]);

  // Al recargar la página, recupera al usuario con el token guardado
  useEffect(() => {
    if (!getAccessToken()) return;
    let cancelled = false;
    authApi
      .me()
      .then((me) => !cancelled && setUser(me))
      .catch(() => !cancelled && logout())
      .finally(() => !cancelled && setInitializing(false));
    return () => {
      cancelled = true;
    };
  }, [logout]);

  const startSession = useCallback(({ access, refresh, user: me }) => {
    saveTokens({ access, refresh });
    setUser(me);
  }, []);

  const login = useCallback(
    async (email, password) => startSession(await authApi.login(email, password)),
    [startSession]
  );
  const register = useCallback(
    async (payload) => startSession(await authApi.register(payload)),
    [startSession]
  );

  const value = useMemo(
    () => ({ user, initializing, isAuthenticated: Boolean(user), login, register, logout, updateUser: setUser }),
    [user, initializing, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}