function SoftSkills() {
  const skills = [
    {
      nombre: "Trabajo en Equipo",
      descripcion: "Capacidad para colaborar efectivamente y contribuir al éxito del grupo",
      nivel: 85
    },
    {
      nombre: "Comunicación",
      descripcion: "Habilidad para expresar ideas de manera clara y efectiva",
      nivel: 80
    },
    {
      nombre: "Resolución de Problemas",
      descripcion: "Capacidad analítica para encontrar soluciones efectivas",
      nivel: 90
    },
    {
      nombre: "Adaptabilidad",
      descripcion: "Flexibilidad para adaptarse a nuevos desafíos y cambios",
      nivel: 85
    }
  ];

  return (
    <section className="softskills-section">
      <div className="skills-container">
        {skills.map((skill, index) => (
          <div key={index} className="skill-card">
            <div className="skill-header">
              <h3>{skill.nombre}</h3>
            </div>
            <p className="skill-description">{skill.descripcion}</p>
            <div className="skill-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${skill.nivel}%` }}
                >
                  <div className="progress-glow"></div>
                </div>
              </div>
              <span className="progress-value">{skill.nivel}%</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SoftSkills