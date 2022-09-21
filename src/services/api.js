import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
