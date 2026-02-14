import { Link } from "react-router-dom";
import { useAlumnos } from "../../../hooks/useAlumnos";
import "../../../Styles/TablaAlumnosStyles.css"
import { EDITAR_ALUMNO } from "../../../routers/alumnos.routes";

const TablaAlumnos = () => {

    const { alumnos,
        fetchAlumnosPorId,
        registroAlumno,
        modificarAlumno,
        eliminacionAlumno } = useAlumnos()

    return (
        <div className="tablaContainer">
            <h2>Alumnos</h2>
            <Link to="/registrarAlumno" className="botonRegistrarAlumno">
                Nuevo alumno
            </Link>
            <table className="alumnosTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre y Apellido</th>
                        <th>DNI</th>
                        <th>Edad</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {alumnos.map((alumno) => (
                        <tr key={alumno.id}>
                            <td>{alumno.id}</td>
                            <td>{alumno.nombre}</td>
                            <td>{alumno.dni}</td>
                            <td>{alumno.edad}</td>
                            <td>{alumno.fecha}</td>
                            <td>
                                <Link to={EDITAR_ALUMNO}>Editar</Link>
                                <button>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
};


export default TablaAlumnos;