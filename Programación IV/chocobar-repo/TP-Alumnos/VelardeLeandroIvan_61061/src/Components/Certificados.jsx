const Certificados = () => {
  const certificaciones = [
    {
      nombre: "Desarrollo Web Frontend",
      plataforma: "Facultad / Aprendizaje autodidacta",
      fecha: "2025 - En curso",
      credencial: "Formación en progreso",
    },
    {
      nombre: "JavaScript Avanzado",
      plataforma: "Facultad y cursos online",
      fecha: "2025",
      credencial: "Sin credencial — En aprendizaje",
    },
  ];

  return (
    <section className="certificados-section">
      <h2>Certificados</h2>
      <div className="certificados-grid">
        {certificaciones.map((cert, index) => (
          <div key={index} className="certificado-card">
            <h3>{cert.nombre}</h3>
            <p>Plataforma: {cert.plataforma}</p>
            <p>Fecha: {cert.fecha}</p>
            <p className="credencial">ID: {cert.credencial}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificados;
