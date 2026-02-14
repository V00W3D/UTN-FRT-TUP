const API_BASE = "http://localhost:3001/api";

const handleResponse = async (res, defaultMessage) => {
  if (!res.ok) {
    let message;
    try {
      const data = await res.json();
      message = data?.message;
    } catch (error) {
      message = await res.text();
    }
    throw new Error(message || defaultMessage);
  }
  return res.json();
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return handleResponse(res, "Error al iniciar sesión");
};

export const registerUser = async (user) => {
  const res = await fetch(`${API_BASE}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return handleResponse(res, "Error al registrar usuario");
};
