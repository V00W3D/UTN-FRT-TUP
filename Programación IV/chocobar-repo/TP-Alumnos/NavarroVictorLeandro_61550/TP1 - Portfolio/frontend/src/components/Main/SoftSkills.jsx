import "../../CSS/softskills.css";

const softSkills = [
  {
    habilidad: "Autodidacta",
    descripcion:
      "Aprendo rápidamente nuevas tecnologías y conceptos por cuenta propia.",
  },
  {
    habilidad: "Pasión por el código",
    descripcion:
      "Disfruto profundamente programar y resolver problemas a través del desarrollo.",
  },
  {
    habilidad: "Compromiso y entrega",
    descripcion:
      "Tiendo a involucrarme emocionalmente con mis proyectos, buscando siempre dar lo mejor.",
  },
  {
    habilidad: "Espíritu entusiasta",
    descripcion:
      "Me emociono con las nuevas ideas y desafíos, manteniendo una actitud positiva y energética.",
  },
  {
    habilidad: "Adaptabilidad",
    descripcion:
      "Capaz de ajustarme a distintos entornos y metodologías de trabajo rápidamente.",
  },
];

const SoftSkills = () => {
  return (
    <section id="soft-skills" className="softskills-section container">
      <h2 className="softskills-title">Soft Skills</h2>

      <div className="softskills-timeline">
        {softSkills.map((skill, i) => (
          <div key={i} className="softskills-item fade-in-skill">
            <div className="softskills-left">
              <div className="softskills-dot" />
              {i !== softSkills.length - 1 && (
                <div className="softskills-link-line" />
              )}
            </div>
            <div className="softskills-content">
              <h3 className="softskills-name">{skill.habilidad}</h3>
              <p className="softskills-desc">{skill.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SoftSkills;
