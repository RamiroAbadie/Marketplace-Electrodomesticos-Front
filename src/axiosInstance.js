import axios from "axios";
import { jwtDecode } from "jwt-decode";   // ← import nombrado

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

/* rutas que NO deben llevar Authorization */
const AUTH_PATHS = ["/auth", "/v1/auth"];



export default axiosInstance;
