import { LIBROS_URL } from "../endpoints/libros.endpoint";
import api from "./api"

export const obtenerLibro = async () => {
    const res = await api.get(LIBROS_URL)
    console.log(res);
    return res.data
}

export const obtenerLibroPorId = async (id) => {
    const res = await api.get(`${LIBROS_URL}/${id}`)
    return res.data
}

export const crearLibro = async (body) => {
    const res = await api.post(LIBROS_URL, body)
    return res.data
}

export const editarLibro = async (id, bodyEditado) => {
    const res = await api.put(`${LIBROS_URL}/${id}`, bodyEditado)
    return res.data
}

export const eliminarLibro = async(id) => {
    const res = await api.delete(`${LIBROS_URL}/${id}`)
    return res.data
}