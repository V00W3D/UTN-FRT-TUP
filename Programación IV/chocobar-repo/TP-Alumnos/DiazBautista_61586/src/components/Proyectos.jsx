import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

const Proyectos = () => {
  return (
    <div className="containerCards">
      <section id="proyectos">
        <h3>Proyectos</h3>
        <div className="containerCard">
          <Card className="proyectoCard">
            <Card.Img variant="top" src="ecommercefarmacia.png" className="imagenProyecto"/>
            <Card.Body className="proyectoCardBody">
              <Card.Title>E-Commerce Farmacia</Card.Title>
              <Card.Text>Tecnologias Utilizadas:</Card.Text>
              <Card.Img
                variant="bottom"
                src="html.png"
                className="imagenTecnologia"
              />
              <Card.Img
                variant="bottom"
                src="css.png"
                className="imagenTecnologia"
              />
              <Card.Img
                variant="bottom"
                src="js.png"
                className="imagenTecnologia"
              />
              <Card.Img
                variant="bottom"
                src="node.png"
                className="imagenTecnologia"
              />
              <Card.Img
                variant="bottom"
                src="express.png"
                className="imagenTecnologia"
              />
              <Card.Img
                variant="bottom"
                src="mysql.png"
                className="imagenTecnologia"
              />
            </Card.Body>
          </Card>
        </div>
        <div className="containerAlert">
          <Alert variant="secondary">
            <Alert.Heading>Aviso ⚠</Alert.Heading>
            <p>
              Actualmente cuento con proyectos en proceso pero que aún no tienen
              un frontend implementado. Por lo tanto este es el unico proyecto
              completo FullStack
            </p>
          </Alert>
        </div>
      </section>
    </div>
  );
};

export default Proyectos;
