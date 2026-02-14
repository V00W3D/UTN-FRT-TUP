import React from 'react'
import { useState } from 'react'

const Main = (props) => {

    let nombre = "Matias"

    console.log("nombre", nombre)

    const cambiarNombre = () => {
        nombre = "Pedro"
        console.log("nombre", nombre)
    }
    // cambiarNombre()

    console.log("nombre 2 = ",nombre)

    const [nombreState, setNombreState] = useState("Matias")

    setNombreState("Pedro")

    

    console.log("nombreState", nombreState)
  return (
    <div>
      <h2>Hola soy Main</h2>
      <h3>Edad: {props.añosHome}</h3>
    </div>
  )
}

export default Main
