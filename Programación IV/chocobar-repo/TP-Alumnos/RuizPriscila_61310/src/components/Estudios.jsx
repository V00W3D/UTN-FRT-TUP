import React from 'react';
import { FaBook } from "react-icons/fa";

function Estudios() {
  const estudios = [
    { id: 1, titulo: "Tecnicatura Universitaria en Programación", institucion: "UTN - Facultad Regional", año: "2024 - Actualidad" },
    { id: 2, titulo: "Curso de Programacion Web", institucion: "Noa", año: "2023" },
    { id: 3, titulo: "Curso de JavaScript ", año: "2024" },
  ];

  return (
    <section id="estudios">
      <h2><FaBook /> Estudios</h2>
      <ul>
        {estudios.map((item) => (
          <li key={item.id}>
            <h3>{item.titulo}</h3>
            <p>{item.institucion}</p>
            <small>{item.año}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Estudios;

