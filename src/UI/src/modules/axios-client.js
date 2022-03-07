import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const tokenLocalStorageName = "jwtToken";

const getJwtToken = () => localStorage.getItem(tokenLocalStorageName);

export const axiosClient = createClient();

function createClient() {
  let settings = { baseURL: apiBaseUrl };
  const jwtToken = getJwtToken();

  if (jwtToken) {
    settings = {
      ...settings,
      withCredentials: true,
      headers: { Authorization: `Bearer ${jwtToken}` },
    };
  }

  return axios.create(settings);
}
