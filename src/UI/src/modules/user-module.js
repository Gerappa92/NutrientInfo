import { axiosClient } from "./axios-client";

const tokenLocalStorageName = "jwtToken";
let refreshIntervalId = 0;

const setJwtToken = (token) =>
  localStorage.setItem(tokenLocalStorageName, token);
const clearJwtToken = () => localStorage.removeItem(tokenLocalStorageName);

export const register = async (credentails) => {
  await axiosClient
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

const refreshTokenInterval = () => {
  const timeout = 0.1 * 60 * 1000;
  refreshIntervalId = setInterval(async () => {
    const response = await axiosClient.post("user/refresh-token").catch((e) => {
      console.error("Refresh login failed", e);
      logout();
    });
    console.log("Refresh", response);
    setJwtToken(response.data.token);
  }, timeout);
};

export const isLoggedIn = () =>
  localStorage.getItem(tokenLocalStorageName) !== null;

export const login = async (credentails) => {
  const response = await axiosClient
    .post("user/login", credentails, {
      withCredentials: true,
    })
    .catch((e) => {
      console.error("Login failed", e);
    });

  setJwtToken(response.data.token);
  refreshTokenInterval();
};
