
import { useState, useEffect } from 'react'
import axios from "axios"
import { useParams, useNavigate,Link } from "react-router-dom"
import {Card ,Button} from "react-bootstrap"

const MainVer = () => {

  const { id } = useParams()

  const [dato, setDato] = useState({})

  const getDatos = async () => {
    let response = await axios.get("http://localhost:3001/articulos/" + id)
    console.log(response.data);
    setDato(response.data)
  }

  useEffect(() => {
    getDatos()
  }, [])

  return (
    <div>
      <br />
 <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{dato.nombre}</Card.Title>
        <Card.Text>
         {dato.descripcion}
        </Card.Text>
        <Card.Text>
         precio: {dato.precio}
        </Card.Text>
        <Card.Text>
         stock {dato.stock}
        </Card.Text>
        <Link to="/" variant="primary">volver</Link >
      </Card.Body>
    </Card>

      <br />
    </div>
  )
}

export default MainVer