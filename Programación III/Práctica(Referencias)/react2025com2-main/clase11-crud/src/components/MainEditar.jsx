import React, { useState, useEffect } from 'react'
import { Form, Button } from "react-bootstrap"
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios"


const MainEditar = () => {

  const navigate = useNavigate()
  const { id } = useParams()


  const initialState = {
    nombre: "",
    descripcion: "",
    stock: null,
    precio: null,

  }

  const [art, setArt] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setArt({ ...art, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let response = await axios.put("http://localhost:3001/articulos/"+id, art)
    if (response) {
      alert("el articulo se actualizo correctamente")
      navigate("/")
    }else {
      alert("algo malio sal")
    }
  }
  const getDatos = async () => {
    let response = await axios.get("http://localhost:3001/articulos/" + id)
    console.log(response.data);
    setArt(response.data)
  }

  useEffect(() => {
    getDatos()
  }, [])

  return (
    <div>
      <br />
      <Form onSubmit={handleSubmit} className='formulario'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>nombre</Form.Label>
          <Form.Control type="text" placeholder="" onChange={handleChange} name="nombre" defaultValue={art.nombre}/>

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control type="text" placeholder="" onChange={handleChange} name="descripcion" defaultValue={art.descripcion}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" placeholder="" onChange={handleChange} name="precio" defaultValue={art.precio}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Stock</Form.Label>
          <Form.Control type="number" placeholder="" onChange={handleChange} name="stock" defaultValue={art.stock}/>
        </Form.Group>
        <Button variant="info" type="submit">
          actualizar articulo
        </Button>
      </Form>


      <br />
    </div>
  )
}

export default MainEditar