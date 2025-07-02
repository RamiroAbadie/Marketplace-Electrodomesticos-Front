import axios from "axios";
import { jwtDecode } from "jwt-decode";
import store from "./redux/store";
import { logout } from "./redux/slices/userSlice"; // Asegurate que esto está exportado


const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

// Rutas públicas: no llevan Authorization
const AUTH_PATHS = ["/auth", "/v1/auth"];

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().user.token;

  const isAuthCall = AUTH_PATHS.some((p) => config.url.includes(p));
  if (isAuthCall) return config;

  if (token) {
    try {
      const { exp } = jwtDecode(token);
      const now = Date.now() / 1000;

      if (exp >= now) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        // Token vencido → limpiar Redux
        store.dispatch(logout());
      }
    } catch {
      // Token corrupto → limpiar Redux
      store.dispatch(logout());
    }
  }

  return config;
});

export default axiosInstance;
