const SoftSkills = () => {
  const skills = [
    {
      nombre: "Trabajo en equipo",
      descripcion:
        "Experiencia en colaboración y comunicación efectiva en equipos multidisciplinarios",
    },
    {
      nombre: "Resolución de problemas",
      descripcion:
        "Capacidad analítica y enfoque metódico para resolver desafíos técnicos",
    },
    {
      nombre: "Adaptabilidad",
      descripcion:
        "Flexibilidad para adaptarme a nuevas tecnologías y entornos de trabajo",
    },
    {
      nombre: "Gestión del tiempo",
      descripcion:
        "Habilidad para priorizar tareas y cumplir con los plazos establecidos",
    },
  ];

  return (
    <section className="soft-skills-section">
      <h2>Habilidades </h2>
      <div className="soft-grid">
        {skills.map((skill, index) => (
          <div key={index} className="soft-card">
            <h3>{skill.nombre}</h3>
            <p>{skill.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SoftSkills;
