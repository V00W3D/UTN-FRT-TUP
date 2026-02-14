const BASE_URL = "http://localhost:3001/api/usuarios";

const handleResponse = async (res) => {
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Error en la solicitud de usuarios");
  }
  if (res.status === 204) return null;
  return res.json();
};

export const getUsuarios = async () => {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
};

export const getUsuarioById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return handleResponse(res);
};

export const createUsuario = async (usuario) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  return handleResponse(res);
};

export const updateUsuario = async (id, usuario) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  return handleResponse(res);
};

export const deleteUsuario = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  await handleResponse(res);
};
