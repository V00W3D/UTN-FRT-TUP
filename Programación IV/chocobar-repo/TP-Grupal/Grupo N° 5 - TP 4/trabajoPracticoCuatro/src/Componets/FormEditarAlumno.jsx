import "../Styles/FormEditar.css";

const FormEditarAlumno = () => {
  return (
    <div className="containerEditarLibro">
      <form className="formEditarLibro">
        <h2>Editar Alumno</h2>

        <div className="campo">
          <label>Nombre</label>
          <input type="text" placeholder="Ingrese el nombre" />
        </div>

        <div className="campo">
          <label>DNI</label>
          <input type="number" placeholder="Ingrese el DNI" />
        </div>

        <div className="campo">
          <label>Edad</label>
          <input type="number" placeholder="Ingrese la edad" />
        </div>

        <div className="campo">
          <label>Fecha de inscripción</label>
          <input type="date" />
        </div>

        <button type="submit" className="btnGuardar">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default FormEditarAlumno;


