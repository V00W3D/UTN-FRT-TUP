import { Link } from "react-router-dom";
import "../../../Styles/TablaLibrosStyles.css";
import { useLibros } from "../../../hooks/useLibros";
import { EDITAR_LIBRO } from "../../../routers/libros.routes";

const TablaLibros = () => {
  const {
    libros,
    fetchLibroPorId,
    registroLibro,
    modificarLibro,
    eliminacionLibro,
  } = useLibros();

  return (
    <div className="tablaContainer">
      <h2>Libros</h2>
      <Link to="/registrarLibro" className="botonRegistrarLibro">
        Nuevo libro
      </Link>
      <table className="librosTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Año</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => (
            <tr key={libro.id}>
              <td>{libro.id}</td>
              <td>{libro.titulo}</td>
              <td>{libro.autor}</td>
              <td>{libro.año}</td>
              <td>
                <Link to={EDITAR_LIBRO}>Editar</Link>
                <button>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaLibros;
