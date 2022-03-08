import { axiosClient } from "./axios-client";

const tokenLocalStorageName = "jwtToken";
let refreshIntervalId = 0;

const setJwtToken = (token) =>
  localStorage.setItem(tokenLocalStorageName, token);
const clearJwtToken = () => localStorage.removeItem(tokenLocalStorageName);

export const register = async (credentails) => {
  await axiosClient()
    .post("user/register", credentails, {
      withCredentials: true,
    })
    .catch((e) => {
      console.error("Register failed", e);
    });
};

const stopRefreshTokenInterval = () => {
  clearInterval(refreshIntervalId);
};

export const logout = () => {
  stopRefreshTokenInterval();
  clearJwtToken();
};

export const refreshTokenInterval = () => {
  const timeout = 1 * 60 * 1000;
  refreshIntervalId = setInterval(async () => {
    const response = await axiosClient()
      .post("user/refresh-token")
      .catch((e) => {
        console.error("Refresh login failed", e);
        logout();
      });

    setJwtToken(response.data.token);
  }, timeout);
};

export const login = async (credentails) => {
  const response = await axiosClient()
    .post("user/login", credentails, {
      withCredentials: true,
    })
    .catch((e) => {
      console.error("Login failed", e);
    });

  setJwtToken(response.data.token);
  refreshTokenInterval();
};

export const isLoggedIn = async () => {
  return await axiosClient()
    .post("user/is-authenticated")
    .then(() => true)
    .catch(() => false);
};
