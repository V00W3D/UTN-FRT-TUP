import {useState} from 'react'
import {Button} from "react-bootstrap"
import Aside from './Aside';

//hook -> gancho es una funcion que resuelve determinado problema 

const Main = ({saludo}) => {
    //console.log(saludo)
    // ;
//useState Hook
    const [numero,setNumero] = useState(0)


    // const resultado = useState("karen")
    // console.log(resultado);

    //mi useState es una funcion que devuelve un array con 2 posiciones
    //enla primera posicion tengo el valor inicial del estado
    //y en la 2da tengo una funcion que actualiza mi 1ra parte

    // const primerValor = resultado[0]
    // const segundaPosicion = resultado[1]

    const [nombre,setNombre] = useState("karen")

    let numero = 10;

    let valor = false

    let gatitos = ["blanquita","negrita","napoleon"]

    const handleClick = () =>{
        //al tocar el boton sumar en 10 mi variable numero
        numero = numero + 10
        console.log(numero);
    }


    return (
        <div className='bg-secondary'>
            <br />
            <h3 className='text-blue-500'>Welcome to PROPS</h3>
            <br />
            <Button disabled={valor ? true : false} onClick={handleClick}>boton bootstrap</Button>
            <br />
            <Aside saludo={saludo} gatitos={gatitos}/>
            <br />

            <h2>el numero es: {numero}</h2>



            <br />
        </div>
    )
}

export default Main