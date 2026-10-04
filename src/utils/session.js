const ACCESS_KEY = "linkup.access";
const REFRESH_KEY = "linkup.refresh";

export const getAccessToken = () => sessionStorage.getItem(ACCESS_KEY);
export const getRefreshToken = () => sessionStorage.getItem(REFRESH_KEY);

export function saveTokens({ access, refresh }) {
  if (access) sessionStorage.setItem(ACCESS_KEY, access);
  if (refresh) sessionStorage.setItem(REFRESH_KEY, refresh);
}

export function clearSession() {
  sessionStorage.removeItem(ACCESS_KEY);
  sessionStorage.removeItem(REFRESH_KEY);
}