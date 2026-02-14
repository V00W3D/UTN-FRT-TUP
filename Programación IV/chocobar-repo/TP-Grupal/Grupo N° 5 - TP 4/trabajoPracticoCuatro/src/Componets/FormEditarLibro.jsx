import "../Styles/FormEditar.css";

const FormEditarLibro = () => {
  return (
    <div className="containerEditarAlumno">
      <form className="formEditarAlumno">
        <h2>Editar Libro</h2>

        <div className="campo">
          <label>Titulo</label>
          <input type="text" placeholder="Ingrese el titulo" />
        </div>

        <div className="campo">
          <label>Autor</label>
          <input type="number" placeholder="Ingrese el autor" />
        </div>

        <div className="campo">
          <label>Año</label>
          <input type="number" placeholder="Ingrese el año" />
        </div>

        <button type="submit" className="btnGuardar">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default FormEditarLibro;