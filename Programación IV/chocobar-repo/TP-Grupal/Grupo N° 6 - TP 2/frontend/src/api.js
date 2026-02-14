import axios from "axios";

const IP = import.meta.env.VITE_IP;
const PORT = import.meta.env.VITE_PORT;
const URL = `http://${IP}:${PORT}/`;
const api = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// 🧁 Interceptor para enviar tokens automáticamente si existen
api.interceptors.request.use((config) => {
  const cupcake = localStorage.getItem("cupcake");
  const cake = localStorage.getItem("cake");

  if (cupcake) config.headers.Authorization = `Bearer ${cupcake}`;
  if (cake) config.headers["x-refresh-token"] = cake;

  return config;
});

// 🍰 Interceptor para refrescar el token si viene uno nuevo
api.interceptors.response.use(
  (response) => {
    const newCupcake = response.data?.newCupCake;
    if (newCupcake) {
      localStorage.setItem("cupcake", newCupcake);
    }
    return response;
  },
  (error) => {
    console.error("🍰[API Error]", error.response || error);
    throw error;
  }
);

export default api;
