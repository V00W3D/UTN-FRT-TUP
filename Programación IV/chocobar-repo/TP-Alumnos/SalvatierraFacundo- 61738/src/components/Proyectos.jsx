import React from "react";

const proyectos = [
  {
    nombre: "Portfolio Personal",
    descripcion: "Sitio creado con React, Bootstrap y CSS personalizado.",
  },
  {
    nombre: "Gestor de Clientes",
    descripcion: "Aplicación CRUD con Spring Boot y MySQL.",
  },
  {
    nombre: "API de Productos",
    descripcion: "REST API construida en Java con validación y seguridad.",
  },
];

export default function Proyectos() {
  return (
    <section id="proyectos" className="text-center mb-5">
      <h2 className="text-success mb-4">Proyectos</h2>
      <div className="row">
        {proyectos.map((p, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card bg-dark text-light h-100 shadow-sm border-success">
              <div className="card-body">
                <h5 className="card-title text-success">{p.nombre}</h5>
                <p className="card-text">{p.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


