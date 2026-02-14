import React, { useState,useEffect } from 'react'
import useStore from '../store/useStore'

const Bisnieto2 = () => {

    const {cambiarNombre,cambiarApellido,cambiarTelefono} = useStore()

    // const initialState = {
    //     nombre: "",
    //     apellido: "",
    //     telefono: ""
    // }

    // const [datos, setDatos] = useState(initialState)
    // //const [nombre,setNombre] = useState("")

    // const handleChange = (e) => {
    //     setDatos({ ...datos, [e.target.name]: e.target.value })
        
    // }

    const handleSubmit = (e) =>{
        e.preventDefault()
        //getDatos(datos)
    }

    // useEffect(()=>{
      
    // },[getDatos])

        return (
            <div>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="">nombre</label>
                    <input type="text" onChange={(e)=>cambiarNombre(e.target.value)} name='nombre' />
                    <br />
                    <label htmlFor="">apellido</label>
                    <input type="text" onChange={(e)=>cambiarApellido(e.target.value)} name='apellido' />
                    <br />
                    <label htmlFor="">telefono</label>
                    <input type="text" onChange={(e)=>cambiarTelefono(e.target.value)} name='telefono' />
                    <br />
                    <button type='submit' >enviar</button>
                </form>
                <br />
               
            </div>
        )
    }

    export default Bisnieto2