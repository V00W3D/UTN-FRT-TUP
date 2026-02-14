// 🌐 URL base del backend
export const URL_BASE = "http://26.51.56.75:8000";

// 📦 Endpoints comunes
export const ENDPOINTS = {
  usuarios: `${URL_BASE}/usuarios`,
  mensajes: `${URL_BASE}/mensajes`,
  salas: `${URL_BASE}/salas`
};

// ⚙️ Intervals
export const INTERVALOS = {
  pollingMensajes: 2000, // cada 2 segundos para actualizar mensajes
};

// 🔐 Claves locales (localStorage keys)
export const STORAGE_KEYS = {
  userId: "userId",
  salaId: "salaId",
};
