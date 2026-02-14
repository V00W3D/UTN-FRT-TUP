const BASE_URL = "http://localhost:3001/api/artistas";

const handleResponse = async (res) => {
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Error en la solicitud de artistas");
  }
  if (res.status === 204) return null;
  return res.json();
};

export const getArtistas = async () => {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
};

export const createArtista = async (artista) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(artista),
  });
  return handleResponse(res);
};

export const updateArtista = async (id, artista) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(artista),
  });
  return handleResponse(res);
};

export const deleteArtista = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  await handleResponse(res);
};
