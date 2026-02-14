import { useState } from 'react'
import { Form, Button } from "react-bootstrap"

const Register = () => {

    const initialState = {

        nombre: "",
        apellido: "",
        telefono: null
    }

    const [usuarios, setUsuarios] = useState([])

    const [user, setUser] = useState(initialState)

    //estados independientes
    const [nom, setNom] = useState("")
    const [ape, setApe] = useState("")
    const [tel, setTel] = useState("")

    //let nombre = document.getElementById("nombre").value

    const handleSubmit = (e) => {
        e.preventDefault()
        setUsuarios([...usuarios, user])
        //if(user.nombre==="")
        e.target.reset()
    }


    const handleMouseEnter = () => {
        //console.log(e);
        //alert("ingreso en el label")
    }

    const handleChange = (e) => {

        setUser({ ...user, [e.target.name]: e.target.value })
    }

let gatos = ["machita","garfield"]

let [_,b] = gatos

    const handleEliminar = (id) => {
        console.log(id);
        const usuarioFiltrado = usuarios.filter((_,index)=>id!==index)
        //axios.delete(endppont+id)
setUsuarios(usuarioFiltrado)

    }

    let perritos = ["sultan", "magui", "toby", "cinco"]

    //nanoid ,

    return (
        <div >
            <br />
            <br />
            <Form className="m-auto" style={{ width: "40%", textAlign: "center" }} onSubmit={handleSubmit}>
                <Form.Label htmlFor="" onMouseEnter={handleMouseEnter}>nombre</Form.Label>
                <Form.Control type="text" placeholder='ingresa tu nombre' id='nombre' onChange={handleChange} name='nombre' required />
                <br />
                <Form.Label>apellido</Form.Label>
                <Form.Control type='text' placeholder='ingresa tu apellido' onChange={handleChange} name='apellido' required />
                <br />
                <Form.Label>telefono</Form.Label>
                <Form.Control type='number' placeholder='ingresa tu telefono' onChange={handleChange} name='telefono' required />
                <br />
                <Button type='submit'>guardar</Button>
            </Form>
            <br />
            <br />
            <h3>datos {user.nombre} {user.apellido} {user.telefono}</h3>
            <br />
            <br />
            {usuarios.length > 0 ? usuarios.map((usuario, index) => <li key={index}>user: {usuario.nombre} {usuario.apellido} {usuario.telefono}
                <button onClick={() => handleEliminar(index)} className='btn btn-danger'>eliminar</button>
            </li>) : <h3>no tengo usuarios</h3>}


        </div>
    )
}

export default Register