import React, { useState, useEffect } from 'react';
import { FaLaptopCode } from "react-icons/fa";


function Proyectos() {
  const [selectedImage, setSelectedImage] = useState(null);

  const proyectos = [
    {
      id: 1,
      nombre: "Portfolio Personal",
      descripcion: "Mi portfolio hecho en React + Vite con navegación interna y componentes dinámicos.",
      enlace: "https://github.com/prii20/TP_Comison_9_TUP",
    },
    {
      id: 2,
      nombre: "E-commerce Compra gamer",
      descripcion: "Aplicación de ventas de gamer con carrito de compras y backend en Node.js.",
      img: "../public/imagenes/compra-gamer.png"
    },
    {
      id: 3,
      nombre: "Web de Peluquería Canina",
      descripcion: "Sitio web para una peluquería canina con información de servicios y contacto.",
      enlace: "https://github.com/TuUsuario/app-turnos",
      img: "../public/imagenes/pelucanina.png"
    },
    {
      id: 4,
      nombre: "Supermercado Gestion de inventario",
      descripcion: "Aplicación para gestionar el inventario de un supermercado con funcionalidades CRUD.",
      img: "../public/imagenes/super-inventario.png"
    }
  ];

  // cerrar con Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setSelectedImage(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="proyectos">
      <h2><FaLaptopCode /> Proyectos Realizados</h2>
      <div className="proyectos-list">
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} className="proyecto-item">
            <h3>{proyecto.nombre}</h3>
            <p>{proyecto.descripcion}</p>

            {/* Si existe imagen, abrir modal; si no, abrir enlace si lo hay */}
            <button
              className="ver-proyecto-btn"
              onClick={() => {
                if (proyecto.img) {
                  setSelectedImage(proyecto.img);
                } else if (proyecto.enlace) {
                  window.open(proyecto.enlace, "_blank", "noopener,noreferrer");
                }
              }}
            >
              Ver Proyecto
            </button>
          </div>
        ))}
      </div>

      {/* Modal  para mostrar imagen */}
      {selectedImage && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 20
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "500px",
              maxHeight: "500px",
              background: "#fff",
              borderRadius: 8,
              padding: 8,
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              gap: 8
            }}
          >
            <button
              onClick={() => setSelectedImage(null)}
              aria-label="Cerrar"
              style={{
                alignSelf: "flex-end",
                background: "transparent",
                border: "none",
                fontSize: 20,
                cursor: "pointer"
              }}
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Vista del proyecto"
              style={{ width: "100%", height: "auto", borderRadius: 6 }}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Proyectos;