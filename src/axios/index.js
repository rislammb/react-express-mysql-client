import axios from "axios";
import { getToken } from "../utils/storage.js";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 2500,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 2500,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized, please log in");
    }
    return Promise.reject(error);
  }
);

export { axiosPublic, axiosPrivate };
