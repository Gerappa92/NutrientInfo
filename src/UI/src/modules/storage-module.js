const tokenLocalStorageName = "jwtToken";
export const setJwtToken = (token) =>
  localStorage.setItem(tokenLocalStorageName, token);
export const getJwtToken = () => localStorage.getItem(tokenLocalStorageName);
export const deleteJwtToken = () => localStorage.clear(tokenLocalStorageName);

const userStorageName = "user";
export const setUser = (user) =>
  localStorage.setItem(userStorageName, JSON.stringify(user));
export const getUser = () => JSON.parse(localStorage.getItem(userStorageName));
