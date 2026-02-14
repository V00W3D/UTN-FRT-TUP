
import React from "react";

const estudiosData = [
  { titulo: "Tecnicatura en Programacion", lugar: "UTN-FRT" },
  { titulo: "Curso de SQL", lugar: "MetalCode" },
  { titulo: "Curso JAVA y SpringBoot", lugar: "TodoCode" }
];

const Estudios = () => {
  return (
    <section id="estudios">
      <h2>Estudios</h2>
      <ul>
        {estudiosData.map((estudio, index) => (
          <li key={index}>
            <strong>{estudio.titulo}</strong> — {estudio.lugar}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Estudios;
