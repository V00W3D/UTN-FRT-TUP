const Proyectos = () => {
  const projects = [
    {
      title: "Plataforma E-commerce",
      description:
        "Una plataforma de comercio electrónico completa con carrito de compras, pasarela de pago y panel de administración.",
      tech: ["React", "Node.js", "Express", "MongoDB"],
    },
    {
      title: "App de Gestión de Tareas",
      description:
        "Una aplicación para organizar tareas personales y de equipo con tableros estilo Kanban.",
      tech: ["Vue.js", "Firebase", "Tailwind CSS"],
    },
    {
      title: "Sitio Web para Agencia",
      description:
        "Página web corporativa con un diseño moderno, animaciones y un formulario de contacto funcional.",
      tech: ["HTML5", "CSS3", "JavaScript", "GSAP"],
    },
  ];

  return (
    <section id="proyectos" className="proyectos-section">
      <h2>Proyectos</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="tech-stack">
              {project.tech.map((tech, i) => (
                <span key={i} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Proyectos;
