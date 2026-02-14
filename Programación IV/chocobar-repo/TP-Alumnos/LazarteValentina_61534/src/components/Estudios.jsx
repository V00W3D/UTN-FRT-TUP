import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const estudios = [
  {
    id: 1,
    titulo: "Tecnicatura Universitaria en Programación",
    institucion: "Universidad Tecnológica Nacional (UTN)",
    fecha: "2023 - Presente",
    descripcion:
      "Formación en desarrollo web, bases de datos, algoritmos y estructuras de datos.",
  },
  {
    id: 2,
    titulo: "Curso de Ingles Intermedio",
    institucion: "Instituto de Ingles UP! Tucumán",
    fecha: "2022 - 2023",
    descripcion:
      "Mejora de habilidades en comprensión lectora, escritura y conversación en inglés.",
  },
  {
    id: 3,
    titulo: "Bachillerato en Ciencias Naturales",
    institucion: "Escuela de Educación Secundaria Lomas de Tafí",
    fecha: "2018 - 2023",
    descripcion:
      "Estudios secundarios con énfasis en ciencias naturales y matemáticas.",
  }
];

const Estudios = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEst, setCurrentEst] = useState(null);

  const abrirModal = (estudio) => {
    setCurrentEst(estudio);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setCurrentEst(null);
  };

  return (
    <div className="row g-4">
      {estudios.map((est, index) => (
        <div
          key={est.id}
          className="col-12 col-md-6"
          data-aos="fade-up"
          data-aos-delay={index * 150}
        >
          <div
            className="card shadow-sm border-0 h-100 d-flex flex-column justify-content-center"
            onClick={() => abrirModal(est)}
            style={{
              cursor: "pointer",
              minHeight: "250px",
              padding: "1rem",
              background: "linear-gradient(135deg, #4b0082, #1c0036)",
              color: "#fff",
            }}
          >
            <div className="card-body text-center">
              <h5 className="card-title">{est.titulo}</h5>
              <h6 className="card-subtitle mb-2" style={{ color: "#d1c4e9" }}>
                {est.institucion}
              </h6>
            </div>
          </div>
        </div>
      ))}

      {currentEst && (
        <Modal show={modalOpen} onHide={cerrarModal} centered>
          <Modal.Header closeButton style={{ background: "#1c0036" }}>
            <Modal.Title style={{ color: "#d7cccbff" }}>
              {currentEst.titulo}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: "#4b0082", color: "#e0e0e0" }}>
            <h6 style={{ color: "#d1c4e9" }}>{currentEst.institucion}</h6>
            <p>{currentEst.fecha}</p>
            <p>{currentEst.descripcion}</p>
          </Modal.Body>
          <Modal.Footer style={{ background: "#1c0036" }}>
            <Button variant="secondary" onClick={cerrarModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Estudios;

