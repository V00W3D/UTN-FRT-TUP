import React from "react";

const experiencias = [
  {
    id: 1,
    puesto: "Desarrolladora Full Stack",
    titulo: "Página Web e-commerce de Electrodomésticos",
    empresa: "Universidad Tecnológica Nacional",
    periodo: "2024 - Presente",
    descripcion: "Desarrollo de un e-commerce con sistema de carrito, login y base de datos en MySQL.",
  },
  {
    id: 2,
    puesto: "Practicante en Desarrollo Web",
    titulo: "Tienda Online de Natura",
    empresa: "Universidad Tecnológica Nacional",
    periodo: "May 2025 - Jun 2025",
    descripcion: "Creación de una tienda online para productos de belleza, con frontend dinámico y base de datos relacional.",
  },
];

const Experiencia = () => {
  return (
    <div className="row g-4">
      {experiencias.map((exp, index) => (
        <div key={exp.id} className="col-12 col-md-6" data-aos="fade-up" data-aos-delay={index * 150}>
          <div className="card shadow" style={{ backgroundColor: "rgba(0,0,0,0.4)", border: "1px solid #ff6f61", borderRadius: "15px" }}>
            <div className="card-body">
              <h5 style={{ color: "#ff6f61", fontWeight: "bold" }}>{exp.puesto}</h5>
              <h6 style={{ color: "#9fa8da" }}>{exp.empresa}</h6>
              <p style={{ fontWeight: "600", color: "#ffffff" }}>{exp.titulo}</p>
              <span className="badge" style={{ backgroundColor: "#6a1b9a", color: "#fff" }}>{exp.periodo}</span>
              <p style={{ color: "#ccc" }}>{exp.descripcion}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experiencia;

