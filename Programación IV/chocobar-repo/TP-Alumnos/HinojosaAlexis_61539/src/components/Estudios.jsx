function Estudios() {
  const estudios = [
    {
      titulo: "Tecnicatura Universitaria en Programación",
      institucion: "UTN",
      año: "2024 - 2025",
      descripcion: "Formación integral en programación y desarrollo de software",
      estado: "En curso",
      logo: "🎓",
      materias: [
        "Programación Web",
        "Bases de Datos",
        "Algoritmos y Estructuras de Datos",
        "Desarrollo de Software"
      ]
    }
  ];

  return (
    <section className="estudios-section">
      <h2>Formación Académica</h2>
      <div className="estudios-container">
        {estudios.map((estudio, index) => (
          <div key={index} className="estudio-card">
            <div className="estudio-header">
              <span className="estudio-logo">{estudio.logo}</span>
              <div className="estado-badge">{estudio.estado}</div>
            </div>
            
            <div className="estudio-content">
              <h3>{estudio.titulo}</h3>
              <div className="institucion-info">
                <span className="institucion-nombre">{estudio.institucion}</span>
                <span className="año-estudio">{estudio.año}</span>
              </div>
              
              <p className="estudio-descripcion">{estudio.descripcion}</p>
              
              <div className="materias-container">
                <h4>Materias Destacadas</h4>
                <div className="materias-grid">
                  {estudio.materias.map((materia, idx) => (
                    <div key={idx} className="materia-tag">
                      {materia}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Estudios
