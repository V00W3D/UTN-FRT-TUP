import React from "react";
import "../styles/Sections.css"; // CSS común para mantener uniformidad

const softSkills = ["Trabajo en equipo", "Comunicación", "Resolución de problemas"];

export default function SoftSkills() {
  return (
    <section id="softskills" className="section">
      <h2>Soft Skills</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {softSkills.map((skill, index) => (
          <div key={index} className="card">
            <h3>{skill}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
