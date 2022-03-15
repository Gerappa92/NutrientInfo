import axios from "axios";
import { getJwtToken, setJwtToken, getUser } from "./storage-module";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

// export const axiosClient = () => createClient();

// function createClient() {
//   let settings = { baseURL: apiBaseUrl };
//   const jwtToken = getJwtToken();

//   if (jwtToken) {
//     settings = {
//       ...settings,
//       withCredentials: true,
//       headers: { Authorization: `Bearer ${jwtToken}` },
//     };
//   }

//   return axios.create(settings);
// }

const httpClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

httpClient.interceptors.request.use(
  (config) => {
    const token = getJwtToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalConfig = error.config;
    const status = error.response.status;
    const authHeader = error.response.headers["www-authenticate"];
    const isTokenExpired = authHeader && authHeader.includes("token expired");
    const user = getUser();
    console.log(status, isTokenExpired, user);
    console.log(status === 401 && isTokenExpired && user && user.email);

    if (status === 401 && isTokenExpired && user && user.email) {
      try {
        const refreshResponse = await httpClient.post("user/refresh-token", {
          email: user.email,
        });
        const { token } = refreshResponse.data;
        setJwtToken(token);
        return httpClient(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;
