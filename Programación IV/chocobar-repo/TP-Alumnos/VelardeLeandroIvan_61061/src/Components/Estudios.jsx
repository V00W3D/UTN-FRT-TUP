const Estudios = () => {
  const educacion = [
    {
      titulo: "Tecnicatura Universitaria en Programación",
      institucion: "Universidad Tecnológica Nacional",
      periodo: "2025 - cursando ",
      descripcion:
        "Especialización en desarrollo de software y programación web",
    },
    {
      titulo: "Desarrollo Web Frontend",
      institucion: "Universidad Tecnológica Nacional",
      periodo: "2025",
      descripcion: "Formación intensiva en tecnologías web modernas",
    },
  ];

  return (
    <section id="estudios" className="estudios-section">
      <h2> Estudios </h2>
      <div className="education-list">
        {educacion.map((item, index) => (
          <div key={index} className="education-item">
            <h3>{item.titulo}</h3>
            <p className="institucion">{item.institucion}</p>
            <p className="periodo">{item.periodo}</p>
            <p className="descripcion">{item.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Estudios;
