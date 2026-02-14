import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import "../css/AgregarArt.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const MainAgregar = () => {

  let navigate = useNavigate()

  const initialState = {
    nombre: "",
    descripcion: "",
    stock: null,
    precio: null,

  }

  const [art, setArt] = useState(initialState)

  const handleChange = (e) => {
    const {name,value} =  e.target 
    setArt({...art,[name]:value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let response = await axios.post("http://localhost:3001/articulos",art)
    if (response) {
      alert("el articulo se agrego correctamente")
      navigate("/")
    }
  }

  return (
    <div className='text-center formulario'>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>nombre</Form.Label>
          <Form.Control type="text" placeholder="" onChange={handleChange} name="nombre" />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control type="text" placeholder="" onChange={handleChange} name="descripcion" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" placeholder="" onChange={handleChange} name="precio" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Stock</Form.Label>
          <Form.Control type="number" placeholder="" onChange={handleChange} name="stock" />
        </Form.Group>
        <Button variant="primary" type="submit">
          agregar articulo
        </Button>
      </Form>

      <br />
      <h3>{art.nombre}{art.descripcion}</h3>
    </div>
  )
}

export default MainAgregar