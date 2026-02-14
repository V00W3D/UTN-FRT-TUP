const BASE_URL = "http://localhost:3001/api/eventos";

const handleResponse = async (res) => {
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Error en la solicitud de eventos");
  }
  if (res.status === 204) return null;
  return res.json();
};

export const getEventos = async () => {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
};

export const createEvento = async (evento) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(evento),
  });
  return handleResponse(res);
};

export const updateEvento = async (id, evento) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(evento),
  });
  return handleResponse(res);
};

export const deleteEvento = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  await handleResponse(res);
};
