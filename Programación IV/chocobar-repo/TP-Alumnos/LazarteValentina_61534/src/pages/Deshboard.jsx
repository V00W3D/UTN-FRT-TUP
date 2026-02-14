import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    // Datos simulados
    const dataFake = [
      { id: 1, nombre: "Portfolio React", estado: "Completado" },
      { id: 2, nombre: "Ecommerce Shop Hogar", estado: "En desarrollo" },
      { id: 3, nombre: "Restaurante Italiano", estado: "Finalizado" },
    ];
    setTimeout(() => setProyectos(dataFake), 1000);
  }, []);

  return (
    <div className="p-4 text-white bg-dark min-vh-100">
      <h2 className="mb-4 text-center">📊 Dashboard de Proyectos</h2>
      <Row>
        {proyectos.map((p) => (
          <Col md={4} key={p.id}>
            <Card className="mb-3 text-center shadow">
              <Card.Body>
                <Card.Title>{p.nombre}</Card.Title>
                <Card.Text>Estado: {p.estado}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
