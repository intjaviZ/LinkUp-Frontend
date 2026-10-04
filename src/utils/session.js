export const getAccessToken = () => localStorage.getItem("access");
export const hasSession = () => Boolean(getAccessToken());