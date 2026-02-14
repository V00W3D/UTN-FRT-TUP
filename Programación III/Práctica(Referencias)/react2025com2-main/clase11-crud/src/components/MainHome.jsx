import React,{useState,useEffect} from 'react'
import {Table} from "react-bootstrap"
import axios from "axios"
import {Link} from "react-router-dom"

const MainHome = () => {

    const [datos,setDatos] = useState([])

    const getDatos = async() =>{
        let response = await axios.get("http://localhost:3001/articulos")
        console.log(response.data);
        setDatos(response.data)
    }

    const handleEliminar = async (id) =>{
        console.log("me llega este id"+id);
        const response = await axios.delete("http://localhost:3001/articulos/"+id)
        if(response){
            alert("artiuclo eliminado correctamnte")
            getDatos()
        }
    }




    useEffect(()=>{
        getDatos()
    },[])



  return (
    <div>
        <br />
        <h3>Listado de articulos</h3>
        <br />
        <Link to="/articulos/agregar" className="btn btn-success">Agregar</Link>
         <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>nombre</th>
          <th>descripcion</th>
          <th>precio</th>
          <th>stock</th>
          <th>acciones</th>
        </tr>
      </thead>
      <tbody>
       {datos.map(dato=><tr key={dato.id}>
            <td>{dato.id}</td>
            <td>{dato.nombre}</td>
            <td>{dato.descripcion}</td>
            <td>{dato.precio}</td>
            <td>
                {dato.stock}
            </td>
            <td><button type='button' className='btn btn-danger' onClick={()=>handleEliminar(dato.id)}>eliminar</button>
            <Link className="btn btn-warning" to={`/articulos/editar/${dato.id}`}>editar</Link >
            <Link className='btn btn-success' to={`/articulos/ver/${dato.id}`}>ver</Link ></td>
            
       </tr>)}
      </tbody>
    </Table>
    </div>
  )
}

export default MainHome