import { ApiError } from "./ApiError";
import { getAccessToken, getRefreshToken, saveTokens } from "@/utils/session";

const BASE_URL = import.meta.env.VITE_API_URL;

let onSessionExpired = () => {};
export const setSessionExpiredHandler = (handler) => {
  onSessionExpired = handler;
};

const networkError = () => new ApiError(0, "network_error", "No se pudo conectar con el servidor.");

function buildUrl(path, params) {
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  });
  return url;
}

async function parseBody(response) {
  if (response.status === 204) return null;
  try {
    return await response.json();
  } catch {
    return null;
  }
}

// ---- Renovación del access token (una sola a la vez) ----
let refreshing = null;

async function doRefresh() {
  let response;
  try {
    response = await fetch(`${BASE_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: getRefreshToken() }),
    });
  } catch {
    throw networkError();
  }
  const body = await parseBody(response);
  if (!response.ok) throw ApiError.fromBody(response.status, body);
  saveTokens(body);
}

function refreshAccessToken() {
  refreshing ??= doRefresh().finally(() => {
    refreshing = null;
  });
  return refreshing;
}

// ---- Petición base ----
async function request(path, { method = "GET", body, params, auth = true } = {}, canRetry = true) {
  const headers = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const token = auth ? getAccessToken() : null;
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(buildUrl(path, params), {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw networkError();
  }

  if (response.status === 401 && auth && canRetry && getRefreshToken()) {
    try {
      await refreshAccessToken();
    } catch (error) {
      if (error.status === 401) onSessionExpired();
      throw error;
    }
    return request(path, { method, body, params, auth }, false);
  }

  const data = await parseBody(response);
  if (!response.ok) {
    if (response.status === 401 && auth) onSessionExpired();
    throw ApiError.fromBody(response.status, data);
  }
  return data;
}

export const http = {
  get: (path, options) => request(path, { ...options }),
  post: (path, body, options) => request(path, { ...options, method: "POST", body }),
  patch: (path, body, options) => request(path, { ...options, method: "PATCH", body }),
  delete: (path, options) => request(path, { ...options, method: "DELETE" }),
};