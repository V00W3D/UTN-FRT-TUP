import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../../routes/rutas"
import { Row, Col,Card,Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAxios } from "../../customHooks/useAxios"

const MainPersonajes = () => {

 const [datos,loading,error] = useAxios("characters")


  return (
    <div>
      <br />
      <h2>LISTADO DE PERSONAJES</h2>

      <br />
      <Row>
        {loading ? <h3>cargando.......</h3> :datos.map(dato => <Col key={dato.id} md={4}>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={dato.image} />
            <Card.Body>
              <Card.Title>{dato.name}</Card.Title>
              <Card.Text>
                descripcion: {dato.description}
              </Card.Text>
              <Link className="btn btn-success" to={`/personaje/${dato.id}`}>ver</Link>
            </Card.Body>
          </Card>
        </Col>) }
        
      </Row>



      <br />
    </div>
  )
}

export default MainPersonajes