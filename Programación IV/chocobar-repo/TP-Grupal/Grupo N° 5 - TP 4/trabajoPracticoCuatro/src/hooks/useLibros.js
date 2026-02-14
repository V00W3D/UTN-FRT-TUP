import { crearLibro, editarLibro, eliminarLibro, obtenerLibro, obtenerLibroPorId } from "../services/libros.services";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VER_LIBROS } from "../routers/libros.routes";

export const useLibros = () => {
    const navigate = useNavigate()
    const [libros, setLibros] = useState([])

    const fetchLibros = async () => {
        try {
            const data = await obtenerLibro()
            setLibros(data)
        } catch (error) {
            console.error("Error al obtener los datos")
        }
    }

    useEffect(() => {
        fetchLibros()
    }, [])

    const fetchLibroPorId = async (id) => {
        try {
            const libro = await obtenerLibroPorId(id)
            setLibros(libro)
        } catch (error) {
            console.error("Error al obtener los datos")
        }
    }

    const registroLibro = async (bodyLibro) => {
        try {
            const nuevoLibro = await crearLibro(bodyLibro)
            setLibros([...libros, nuevoLibro])
            navigate(VER_LIBROS)
        } catch (error) {
            console.error("Error al crear un libro nuevo");
        }
    }

    const modificarLibro = async (id, bodyEditado) => {
        try {
            const libroEditado = await editarLibro(id, bodyEditado)
            setLibros(libros.map(lib => lib.id === id ? libroEditado : lib))
        } catch (error) {
            console.error("Error al editar un libro");
        }
    }

    const eliminacionLibro = async (id) => {
        try {
            await eliminarLibro(id)
            setLibros(libros.filter(lib => lib.id !== id))
        } catch (error) {
            console.error("Error al eliminar un libro");
        }
    }

    return {
        libros,
        fetchLibroPorId,
        registroLibro,
        modificarLibro,
        eliminacionLibro
    }
    
}