function Idiomas() {
  const idiomas = [
    {
      id: 1,
      nombre: "Español",
      nivel: "Nativo",
      porcentaje: 100
    },
    {
      id: 2,
      nombre: "Inglés",
      nivel: "Intermedio",
      porcentaje: 60
    }
  ];

  return (
    <section>
      <ul className="idiomas-list">
        {idiomas.map(idioma => (
          <li key={idioma.id} className="idioma-item">
            <div className="idioma-info">
              <h3>{idioma.nombre}</h3>
              <p>{idioma.nivel}</p>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${idioma.porcentaje}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Idiomas
