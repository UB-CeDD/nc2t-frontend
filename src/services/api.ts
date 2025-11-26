import axios from "axios";
import { validateRefreshToken } from "./authService";
import store from "@/store/store";
import { logout } from "@/store/thunks/authThunks";
import { notify } from "@/components/commons/NotificationContext";
import { setLoading, unsetLoading } from "@/store/actions/loadingActions";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
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
    if (config.url === "/login/" || config.url === "/register/") {
      return config;
    }
    store.dispatch(setLoading());
    const token = localStorage.getItem("access_token");
    const expiresIn = localStorage.getItem("expires_in"); // should be a timestamp (seconds)

    if (token) {
      const currentTime = Math.floor(Date.now() / 1000); // seconds
      if (expiresIn && Number(expiresIn) < currentTime) {
        // Token is expired, attempt to refresh
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          if (!isRefreshing) {
            isRefreshing = true;
            validateRefreshToken(refreshToken)
              .then((response) => {
                const newAccessToken = response.access;
                const newExpiresIn = response.expires_in;
                localStorage.setItem("access_token", newAccessToken);
                localStorage.setItem("expires_in", newExpiresIn);
                isRefreshing = false;
                processQueue(null, newAccessToken);
              })
              .catch((err) => {
                isRefreshing = false;
                processQueue(err, null);
                store.dispatch(logout());
                notify("Session expired. Please log in again.", "error");
                window.location.href = "/login";
              });
          }
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              config.headers["Authorization"] = `Bearer ${token}`;
              return config;
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        } else {
          store.dispatch(logout());
          notify("Session expired. Please log in again.", "error");
          window.location.href = "/login";
          return Promise.reject(new Error("Refresh token not found."));
        }
      }
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
  (error) => {
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
          return new Promise((resolve, reject) => {
            validateRefreshToken(refreshToken)
              .then((response) => {
                const newAccessToken = response.access;
                const newExpiresIn = response.expires_in;
                localStorage.setItem("access_token", newAccessToken);
                localStorage.setItem("expires_in", newExpiresIn);
                isRefreshing = false;
                processQueue(null, newAccessToken);
                originalRequest.headers["Authorization"] =
                  `Bearer ${newAccessToken}`;
                resolve(api(originalRequest));
              })
              .catch((err) => {
                isRefreshing = false;
                processQueue(err, null);
                store.dispatch(logout());
                notify("Session expired. Please log in again.", "error");
                window.location.href = "/login";
                reject(err);
              });
          });
        } else {
          store.dispatch(logout());
          notify("Session expired. Please log in again.", "error");
          window.location.href = "/login";
          return Promise.reject(new Error("Refresh token not found."));
        }
      } else {
        isRefreshing = false;
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            store.dispatch(logout());
            notify("Session expired. Please log in again.", "error");
            window.location.href = "/login";
            return Promise.reject(err);
          });
      }
    }
    console.log(error.response?.data || error.message);

    return Promise.reject(error);
  },
);

export default api;
