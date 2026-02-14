import React from "react";
import "../styles/Sections.css"; // CSS común para mantener uniformidad

const proyectos = [
  { nombre: "Portfolio React", descripcion: "Proyecto de presentación personal" },
  { nombre: "App ToDo", descripcion: "Aplicación de tareas pendientes" },
  { nombre: "Base de datos", descripcion: "Base de datos de una distribuidora de electrodomésticos" },
  { nombre: "Página Web", descripcion: "Página web para una veterinaria" },
];

export default function Proyectos() {
  return (
    <section id="proyectos" className="section">
      <h2>Proyectos</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {proyectos.map((proyecto, index) => (
          <div key={index} className="card">
            <h3>{proyecto.nombre}</h3>
            <p>{proyecto.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
