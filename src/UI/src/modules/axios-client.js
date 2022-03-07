import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const axiosClient = createClient();

function createClient() {
  let settings = { baseURL: apiBaseUrl };
  const jwtToken = localStorage.getItem("jwtToken");

  if (jwtToken) {
    settings = {
      ...settings,
      withCredentials: true,
      headers: { Authorization: `Bearer ${jwtToken}` },
    };
  }

  return axios.create(settings);
}
