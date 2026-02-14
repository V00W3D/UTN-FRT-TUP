const BASE_URL = "http://localhost:3001/api/asistentes";

const handleResponse = async (res) => {
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Error en la solicitud de asistentes");
  }
  if (res.status === 204) return null;
  return res.json();
};

export const getAsistentes = async () => {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
};

export const createAsistente = async (asistente) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(asistente),
  });
  return handleResponse(res);
};

export const updateAsistente = async (id, asistente) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(asistente),
  });
  return handleResponse(res);
};

export const deleteAsistente = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  await handleResponse(res);
};
