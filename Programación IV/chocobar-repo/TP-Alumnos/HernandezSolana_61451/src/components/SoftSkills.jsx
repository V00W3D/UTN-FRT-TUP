import React from "react";


export default function SoftSkills() {
  const skills = [
    { nombre: "Trabajo en equipo",img: "/equipo.png" },
    { nombre: "Comunicacion" ,img: "/comunicacion.png"},
    { nombre: "Resolución de problemas", img: "/problemas.png" },
    { nombre: "Adaptabilidad", img: "/adaptable.png" }
  ];

  return (
    <section id="soft-skills">
      <div className="titulo">
        <img src="/Softskills.png" alt="Soft Skills" className="icono" />
        <h2>Soft Skills</h2>
      </div>

      <div className="cards-container">
        {skills.map((skill, index) => (
          <div className="card" key={index}>
            <img src={skill.img} alt={skill.nombre} className="iconito" />
            <p>{skill.nombre}</p>
          </div>
        ))}
      </div>
    </section>
  );
}