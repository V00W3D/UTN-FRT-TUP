function SoftSkills() {
  const habilidades = ["Trabajo en equipo", "Responsabilidad", "Comunicación", "Adaptabilidad"];

  return (
    <section id="softskills">
      <h2>Soft Skills</h2>
      <ul>
        {habilidades.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

export default SoftSkills;