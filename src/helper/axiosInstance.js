import axios from "axios";
let adminUrl = "https://vibe-connect-server.onrender.com";

export const baseURL = adminUrl;
let axiosInstance = axios.create({
  baseURL,
});

export { adminUrl };

export const getImage = (media) => {
  return `https://vibe-connect-server.onrender.com/${media}`;
};

axiosInstance.interceptors.request.use(
  async function (config) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token !== null || token !== undefined) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);
export default axiosInstance;
