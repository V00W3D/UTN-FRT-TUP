import { AUDITORIA_URL } from "../endpoints/auditoria.endpoint";
import api from "./api";

export const obtenerAuditoria = async () => {
    const res = await api.get(AUDITORIA_URL)
    console.log(res);
    return res.data
}

export const crearAuditoria = async (body) => {
    const res = await api.post(AUDITORIA_URL, body)
    return res.data
}

export const editarAuditoria = async (id, bodyEditado) => {
    const res = await api.put(`${AUDITORIA_URL}/${id}`, bodyEditado)
    return res.data
}

export const eliminarAuditoria = async (id) => {
    const res = await api.delete(`${AUDITORIA_URL}/${id}`)
    return res.data
}