const Experiencia = () => {
  const experiences = [
    {
      role: "Desarrollador Frontend",
      company: "Universidad Tecnológica Nacional",
      period: "2025 - cursando",
      description:
        "Desarrollo de interfaces de usuario con React, implementación de diseños responsivos y optimización del rendimiento de aplicaciones web.",
    },
    {
      role: "Desarrollador Backend",
      company: "Universidad Tecnológica Nacional",
      period: "2024 - 2025",
      description:
        "Desarrollo de APIs REST, gestión de bases de datos y implementación de lógica de negocio utilizando Node.js y Express.",
    },
    // {
    //   role: "Pasante",
    //   company: "Empresa 123",
    //   period: "2021 - 2022",
    //   description:
    //     "Colaboración en proyectos web, aprendizaje de metodologías ágiles y desarrollo de funcionalidades básicas.",
    // },
  ];

  return (
    <section id="experiencia" className="experiencia-section">
      <h2>Experiencia Laboral</h2>
      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{exp.role}</h3>
            <p className="company">{exp.company}</p>
            <p className="period">{exp.period}</p>
            <p className="description">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experiencia;
