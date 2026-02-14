import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Container, Row, Col } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";

const proyectos = [
  {
    id: 1,
    nombre: "Pagina e-commerce Electrodomesticos",
    descripcion: "Sitio web de venta de electrodomésticos con catálogo y carrito de compras.",
    imagen: "/electrodomestico.png"
  },
  {
    id: 2,
    nombre: "Tienda Online",
    descripcion: "Sitio de venta online con carrito, login de usuarios, gestión de productos y gestión de Proveedores.",
    imagen: "/proveedor.png"
  },
  {
    id: 3,
    nombre: "Ventas Online - Tienda de Zapatos",
    descripcion: "Plataforma de venta online y catálogo de calzado.",
    imagen: "/zapatillas.png"
  }
];

const Proyectos = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProj, setCurrentProj] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const abrirModal = (proj) => {
    setCurrentProj(proj);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setCurrentProj(null);
  };

  const cardStyle = {
    background: "linear-gradient(135deg, #4b0082, #1c0036)",
    color: "#fff",
    cursor: "pointer",
    transition: "transform 0.3s",
  };

  const cardHover = {
    transform: "translateY(-5px)",
  };

  return (
    <Container fluid className="px-5 py-5">
      <Row className="g-4 justify-content-center">
        {proyectos.map((proj, index) => (
          <Col 
            key={proj.id} 
            xs={12} md={6} lg={6} 
            data-aos="fade-up" 
            data-aos-delay={index * 150}
          >
            <Card 
              onClick={() => abrirModal(proj)} 
              className="h-100 shadow-sm rounded"
              style={cardStyle}
              onMouseEnter={e => e.currentTarget.style.transform = cardHover.transform}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}
            >
              <Card.Img variant="top" src={proj.imagen} alt={proj.nombre} className="rounded-top" />
              <Card.Body className="text-center">
                <Card.Title className="fs-4">{proj.nombre}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {currentProj && (
        <Modal show={modalOpen} onHide={cerrarModal} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{currentProj.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img 
              src={currentProj.imagen} 
              alt={currentProj.nombre} 
              className="img-fluid mb-3 rounded shadow-sm"
            />
            <p>{currentProj.descripcion}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cerrarModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Proyectos;
