export const setToken = (token: string) => {
  document.cookie = `token=${token}; path=/`;
};

export const getToken = () => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  return cookie ? cookie.split("=")[1] : null;
};

export const removeToken = () => {
  document.cookie = "token=; Max-Age=-99999999;";
};
