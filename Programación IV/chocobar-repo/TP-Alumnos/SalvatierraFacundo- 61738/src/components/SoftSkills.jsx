// src/components/SoftSkills.jsx
import React from "react";

const softSkills = [
  {
    nombre: "Diseño de APIs robustas",
    descripcion: "Creo endpoints claros, consistentes y escalables, priorizando la eficiencia y seguridad de la comunicación entre servicios."
  },
  {
    nombre: "Optimización de rendimiento backend",
    descripcion: "Identifico cuellos de botella y aplico soluciones para mejorar tiempos de respuesta y consumo de recursos del servidor."
  },
  {
    nombre: "Gestión confiable de bases de datos",
    descripcion: "Planifico esquemas y consultas de manera eficiente, asegurando integridad, consistencia y facilidad de mantenimiento."
  },
  {
    nombre: "Documentación y comunicación transparente",
    descripcion: "Siempre dejo claro cómo funciona cada módulo y qué decisiones se tomaron, para que cualquier compañero pueda entender y mantener el código."
  },
  {
    nombre: "Sinceridad profesional y responsabilidad",
    descripcion: "Si un deadline o una implementación tiene riesgos, los comunico abiertamente y propongo alternativas realistas."
  },

];

const SoftSkills = () => {
  return (
    <section id="softskills">
      <h2>Soft Skills</h2>
      <ul>
        {softSkills.map((skill, index) => (
          <li key={index}>
            <strong>{skill.nombre}:</strong> {skill.descripcion}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SoftSkills;

