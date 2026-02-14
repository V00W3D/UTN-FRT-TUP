import "../../CSS/proyectosrealizados.css";

const proyectos = [
  {
    nombre: "TucuFerr",
    tipo: "Proyecto Final - Programación 3",
    descripcion:
      "Sistema de gestión para ferretería desarrollado como proyecto final de la materia Programación 3. Ecommerce con un CRUD de empleados, ventas, productos y usuarios.",
    tecnologias: ["HTML", "CSS", "JavaScript", "MySQL"],
    estado: "Versión inicial (en revisión y mejora)",
    imagen: "/img/proyectos/tucuferr.png", // cambia esta ruta por la tuya
    github: "https://github.com/tuusuario/TucuFerr", // link real al repo
  },
];

const ProyectosRealizados = () => {
  return (
    <section id="proyectos" className="proyectos-section container">
      <h2 className="proyectos-title">Proyectos Realizados</h2>

      <div className="proyectos-grid">
        {proyectos.map((proyecto, i) => (
          <div key={i} className="proyecto-card fade-in-proyecto">
            <div className="proyecto-img-wrapper">
              <img
                src={proyecto.imagen}
                alt={proyecto.nombre}
                className="proyecto-img"
              />
            </div>

            <div className="proyecto-content">
              <h3 className="proyecto-nombre">{proyecto.nombre}</h3>
              <p className="proyecto-tipo">{proyecto.tipo}</p>
              <p className="proyecto-desc">{proyecto.descripcion}</p>

              <div className="proyecto-tecnologias">
                {proyecto.tecnologias.map((tec, index) => (
                  <span key={index} className="tec-pill">
                    {tec}
                  </span>
                ))}
              </div>

              <p className="proyecto-estado">{proyecto.estado}</p>

              {proyecto.github && (
                <a
                  href={proyecto.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proyecto-link"
                >
                  Ver en GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProyectosRealizados;
