const Idiomas = () => {
  const idiomas = [
    {
      idioma: "Español",
      nivel: "Nativo",
      porcentaje: 100,
    },
    {
      idioma: "Inglés",
      nivel: "Intermedio",
      porcentaje: 55,
    },
  ];

  return (
    <section className="idiomas-section">
      <h2>Idiomas</h2>
      <div className="idiomas-list">
        {idiomas.map((idioma, index) => (
          <div key={index} className="idioma-item">
            <div className="idioma-info">
              <h3>{idioma.idioma}</h3>
              <span>{idioma.nivel}</span>
            </div>
            <div className="barra-progreso">
              <div
                className="progreso"
                style={{ width: `${idioma.porcentaje}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Idiomas;
