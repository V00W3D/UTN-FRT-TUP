import React from 'react';
import { FaLightbulb } from "react-icons/fa";

function SoftSkills() {
  const skills = ["Trabajo en equipo", "Responsabilidad", "Comunicación", "Adaptabilidad"];

  return (
    <section id="softskills">
      <h2><FaLightbulb /> Soft Skills</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

export default SoftSkills;
