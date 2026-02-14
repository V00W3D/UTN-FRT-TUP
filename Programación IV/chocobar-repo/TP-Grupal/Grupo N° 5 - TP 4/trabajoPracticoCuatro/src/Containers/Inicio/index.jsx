import Header from "../../Componets/Header";
import "../../Styles/InicioStyles.css";

const Inicio = () => {
  const datos =({
    usuarios: 0,
    libros: 0,
    autores: 0,
    editoriales: 0,
    estudiantes: 0,
    prestamos: 0,
  });



  return (
    <>
      <Header />
      <div className="inicio-container">
        <h1>Panel de Administración</h1>

        <div className="inicio-grid">
          <div className="card usuarios">
            <h2>Usuarios</h2>
            <p>{datos.usuarios}</p>
          </div>

          <div className="card libros">
            <h2>Libros</h2>
            <p>{datos.libros}</p>
          </div>

          <div className="card autores">
            <h2>Autores</h2>
            <p>{datos.autores}</p>
          </div>

          <div className="card editoriales">
            <h2>Editoriales</h2>
            <p>{datos.editoriales}</p>
          </div>

          <div className="card estudiantes">
            <h2>Estudiantes</h2>
            <p>{datos.estudiantes}</p>
          </div>

          <div className="card prestamos">
            <h2>Préstamos</h2>
            <p>{datos.prestamos}</p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Inicio;