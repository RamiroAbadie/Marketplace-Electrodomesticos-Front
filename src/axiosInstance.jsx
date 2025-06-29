import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1", // cambia si usás otro puerto o prefijo
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
