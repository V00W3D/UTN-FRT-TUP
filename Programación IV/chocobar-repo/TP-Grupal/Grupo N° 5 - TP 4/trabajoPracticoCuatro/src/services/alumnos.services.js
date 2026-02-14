//aqui van las peticiones a las url
import { ALUMNOS_URL } from "../endpoints/alumnos.endpoint"
import api from "./api"

export const obtenerAlumno = async () => {
    //con la ruta del endpoint (ALUMNOS_URL), podemos obtener los datos del server de json-server
    const res = await api.get(ALUMNOS_URL)
    console.log(res);
    return res.data
}

export const obtenerAlumnoPorId = async (id) => {
    const res = await api.get(`${ALUMNOS_URL}/${id}`)
    return res.data
}

export const crearAlumno = async (body) => {
    const res = await api.post(ALUMNOS_URL, body)
    return res.data
}

export const editarAlumno = async (id, bodyEditado) => {
    const res = await api.put(`${ALUMNOS_URL}/${id}`, bodyEditado)
    return res.data
}

export const eliminarAlumno = async(id) => {
    const res = await api.delete(`${ALUMNOS_URL}/${id}`)
    return res.data
}