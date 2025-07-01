import axios from "axios";
import { jwtDecode } from "jwt-decode";   // ← import nombrado

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

/* rutas que NO deben llevar Authorization */
const AUTH_PATHS = ["/auth", "/v1/auth"];

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  /* 1. Skip header en endpoints de auth */
  const isAuthCall = AUTH_PATHS.some((p) => config.url.includes(p));
  if (isAuthCall) return config;

  /* 2. Adjuntar token si está vigente */
  if (token) {
    try {
      const { exp } = jwtDecode(token);      // función nombrada
      const now = Date.now() / 1000;
      if (exp < now) {
        localStorage.removeItem("token");    // vencido → limpiar
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      localStorage.removeItem("token");      // token corrupto
    }
  }
  return config;
});

export default axiosInstance;
