import React from "react";

export default function Proyectos() {
  const proyectos = [
    {
      nombre: "Sitio Web - Veterinaria",
      descripcion: "Sitio Web con Ecommerce y gestión de turnos y pacientes de una veterinaria.",
      imgEstado: "/Veterinaria.jpeg" 
    }
  ];
  
  return (
    <section id="proyectos">
      <div className="titulo">
        <img src="/Proyectos.png" alt="Proyectos" className="icono" />
        <h2>Proyectos</h2>
      </div>
      <ul>
        {proyectos.map((proyecto, index) => (
          <li key={index} className="proyecto-item">
            <strong>{proyecto.nombre}</strong>
            <img src={proyecto.imgEstado} alt="Proyecto Veterinaria" className="proyecto-img" />
            <p>{proyecto.descripcion}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}