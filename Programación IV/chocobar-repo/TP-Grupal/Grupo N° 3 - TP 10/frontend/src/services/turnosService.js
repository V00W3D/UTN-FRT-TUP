import { get, post, patch, del } from "../api.js";

export const fetchTurnos = async (fecha = null, cliente_id = null) => {
  let query = "/turnos";
  const params = [];
  if (fecha) params.push(`fecha=${fecha}`);
  if (cliente_id) params.push(`cliente_id=${cliente_id}`);
  if (params.length) query += "?" + params.join("&");
  return await get(query);
};

export const agregarTurno = async (turno) => {
  const { clienteId, servicioId, fechaHora } = turno;
  const inicio = new Date(fechaHora).toISOString().slice(0, 19).replace("T", " ");
  return await post("/turnos", {
    cliente_id: clienteId,
    servicio_id: servicioId,
    inicio
  });
};

export const actualizarTurno = async (id, datos) => {
  return await patch(`/turnos/${id}/estado`, datos);
};

export const eliminarTurno = async (id) => {
  return await del(`/turnos/${id}`);
};