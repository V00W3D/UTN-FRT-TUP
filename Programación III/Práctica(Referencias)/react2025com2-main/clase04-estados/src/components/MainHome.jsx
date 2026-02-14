
import { useState } from "react"
import { Button } from "react-bootstrap"
import Register from "./Register"

const MainHome = () => {


    const [num, setNum] = useState(65)
    const [apellido, setApellido] = useState("cardozo")
    const [mostrar, setMostrar] = useState(false)

    // let numero = 10

    // let numeros = [1, 2, 4, 7, 9, 4]

    //destructuracion de un array
    // const [a, v, c, d, e] = numeros

    // let perros = ["firu","lazy"]

    // const [firu,lazy] = perros

    //snippet 
    //const [first, setfirst] = useState(second)

    // let resultado = useState("cardozo")
    // console.log(resultado);

    // let valorInicial = resultado[0]
    // let cambioValor = resultado[1]



    let Persona = {
        nombre: "belen",
        edad: 20,
        mail: "belen@gmail,com"
    }
    //destructurando un object
    //const { mail, edad, nombre } = Persona

    const handleClick = () => {
        // numero = numero + 15
        // console.log(numero);
        setNum(num + 15)
    }

    const handleApellido = () => {
        setApellido("olivares")
    }

    const handleRegister = () => {
        // if (mostrar === true) {
        //     setMostrar(false)
        // } else {
        //     setMostrar(true)
        // }
        setMostrar(!mostrar) //toggle button
    }

    // const handleOcultar= () => {
    //     setMostrar(false)
    // }

    return (
        <div className='text-center bg-info'>
            <br />
            <h3>Bienvenidos a los Estados</h3>
            <br />
            <h4>numero: {num}</h4>
            <button onClick={handleClick}>sumar 15</button>
            <Button type="button" onClick={handleApellido}>cambiar apellido</Button>
            <h4>alumno: {apellido}</h4>
            <br />
            <Button type="button" className={mostrar ? "bg-danger" : "bg-success"} onClick={handleRegister}>{mostrar ? "ocultar registro" : "mostrar registro"}</Button>
            {/* <Button type="button" onClick={handleOcultar}>ocultar Registro</Button> */}
            {mostrar === true ? <Register /> : null}

            <br />
            <br />
        </div>
    )
}



// public class Persona {
//     private strin nombre {get; set;}
// }

export default MainHome