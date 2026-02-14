import { useEffect, useState } from "react";
import { crearAlumno, editarAlumno, eliminarAlumno, obtenerAlumno, obtenerAlumnoPorId } from "../services/alumnos.services";
import { useNavigate } from "react-router-dom";

export const useAlumnos = () => {
    const navigate = useNavigate()
    const [alumnos, setAlumnos] = useState([])

    const fetchAlumnos = async () => {
        try {
            const data = await obtenerAlumno() //se obtienen los alumnos del servicio de alumnos
            setAlumnos(data) //se modifica el array de alumnos poniendo todos los alumnos obtenidos
        } catch (error) {
            console.error("Error al obtener los datos")
        }
    }


    useEffect(() => {
        //se muestran los alumnos al montar el componente
        fetchAlumnos()
    }, [])

    const fetchAlumnosPorId = async (id) => {
        try {
            const alumno = await obtenerAlumnoPorId(id) //se obtienen los alumnos del servicio de alumnos
            setAlumnos(alumno) //se modifica el array de alumnos poniendo el alumno encontrado por ID
        } catch (error) {
            console.error("Error al obtener los datos")
        }
    }

    const registroAlumno = async (body) => {
        try {
            const nuevoAlumno = await crearAlumno(body)
            setAlumnos([...alumnos, nuevoAlumno])
            navigate("/alumnos")
        } catch (error) {
            console.error("Error al crear un nuevo alumno");
        }
    }

    const modificarAlumno = async (id, bodyEditado) => {
        try {
            const alumnoEditado = await editarAlumno(id, bodyEditado)
            setAlumnos(alumnos.map(alu => alu.id === id ? alumnoEditado : alu))
        } catch (error) {
            console.error("Error al editar un alumno");
        }
    }

    const eliminacionAlumno = async (id) => {
        try {
            await eliminarAlumno(id)
            setAlumnos(alumnos.filter(alu => alu.id !== id))
        } catch (error) {
            console.error("Error al eliminar un alumno");
        }
    }

    return {
        alumnos,
        fetchAlumnosPorId,
        registroAlumno,
        modificarAlumno,
        eliminacionAlumno
    }
    
}