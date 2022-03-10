import { axiosClient } from "./axios-client";

const tokenLocalStorageName = "jwtToken";
let refreshIntervalId = 0;

const setJwtToken = (token) =>
  localStorage.setItem(tokenLocalStorageName, token);
const clearJwtToken = () => localStorage.removeItem(tokenLocalStorageName);

export const register = async (credentails) => {
  await axiosClient().post("user/register", credentails, {
    withCredentials: true,
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
  const timeout = 4 * 60 * 1000;
  refreshIntervalId = setInterval(async () => {
    await axiosClient()
      .post("user/refresh-token")
      .then((response) => {
        setJwtToken(response.data.token);
      })
      .catch((e) => {
        logout();
        throw e;
      });
  }, timeout);
};

export const login = async (credentails) => {
  await axiosClient()
    .post("user/login", credentails, {
      withCredentials: true,
    })
    .then((response) => {
      setJwtToken(response.data.token);
      refreshTokenInterval();
    });
};

export const isLoggedIn = async () => {
  return await axiosClient()
    .post("user/is-authenticated")
    .then(() => true)
    .catch(() => false);
};

export const deleteAccount = async (credentials) => {
  return await axiosClient()
    .post("user/delete-account", credentials)
    .then(() => logout());
};

export const resetPassword = async (credentrials) => {
  return await axiosClient().post("user/reset-password", credentrials);
};
