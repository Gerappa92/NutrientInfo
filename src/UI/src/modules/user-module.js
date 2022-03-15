import httpClient from "./axios-client";
import { setJwtToken, deleteJwtToken, setUser } from "./storage-module";

export const register = async (credentails) => {
  await httpClient.post("user/register", credentails, {
    withCredentials: true,
  });
};

export const login = async (credentails) => {
  await httpClient
    .post("user/login", credentails, {
      withCredentials: true,
    })
    .then((response) => {
      setJwtToken(response.data.token);
      let user = { email: credentails.email };
      setUser(user);
    });
};

export const logout = () => {
  deleteJwtToken();
};

export const refreshToken = async () => {
  await httpClient
    .post("user/refresh-token")
    .then((response) => {
      setJwtToken(response.data.token);
    })
    .catch((e) => {
      logout();
      throw e;
    });
};

export const isLoggedIn = async () => {
  return await httpClient
    .post("user/is-authenticated")
    .then(() => true)
    .catch(() => false);
};

export const deleteAccount = async (credentials) => {
  return await httpClient
    .post("user/delete-account", credentials)
    .then(() => logout());
};

export const resetPassword = async (credentrials) => {
  return await httpClient.post("user/reset-password", credentrials);
};
