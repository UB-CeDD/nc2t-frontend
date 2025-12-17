import axios from "axios";
import { validateRefreshToken } from "./authService";
import store from "@/store/store";
import { logout } from "@/store/thunks/authThunks";
import { notify } from "@/components/commons/NotificationContext";
import { setLoading, unsetLoading } from "@/store/actions/loadingActions";

const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.API_URL || "http://localhost:8000/api"; // Prefer VITE_API_URL for Vite; fallback to API_URL if present


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface FailedQueuePromise {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedQueuePromise[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    store.dispatch(setLoading());
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    store.dispatch(unsetLoading());
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    store.dispatch(unsetLoading());
    return response;
  },
  async (error) => {
    store.dispatch(unsetLoading());
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = localStorage.getItem("refresh_token");

        if (refreshToken) {
          try {
            const response = await validateRefreshToken(refreshToken);
            console.log("login response", response);
            
            const newAccessToken = response.access;
            const newExpiresIn = response.expires_in;
            localStorage.setItem("access_token", newAccessToken);
            localStorage.setItem("expires_in", newExpiresIn);

            isRefreshing = false;
            processQueue(null, newAccessToken);

            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          } catch (err) {
            isRefreshing = false;
            processQueue(err, null);
            store.dispatch(logout());
            return Promise.reject(err);
          }
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(api(originalRequest));
          },
          reject: (err) => {
            reject(err);
          },
        });
      });
    }

    return Promise.reject(error);
  },
);

export default api;
