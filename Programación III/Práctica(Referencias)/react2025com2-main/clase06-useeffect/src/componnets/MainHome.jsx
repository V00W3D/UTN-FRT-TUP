import { useState, useEffect } from "react"
import Componente1 from "./Componente1"

const MainHome = ({lengProg}) => {




    //const [first, setfirst] = useState(second)
    const [contador, setContador] = useState(0)
    const [nombre, setNombre] = useState("")
    const [show, setShow] = useState(false)
    const [datos,setDatos] = useState([])


    const handleSumar = () => {
        setContador(contador + 1)
        contador >= 10 && setContador(0)
    }

    const handleRestar = () => {
        setContador(contador - 1)
    }

    //callback      //array de dependencias
    useEffect(() => {
        //efecto que necesito que haga mi componente
        console.log("componente Main montado");
    }, [])

    useEffect(() => {
        console.log("cambiando el contador" + contador)
    }, [contador])


    // const saludar = () => {
    //     console.log("hola");
    // }
    // setTimeout(saludar, 3000)

    // useEffect(() => {
    //     first


    //     return () => {
    //        clearInterval()
    //     }
    // }, [third])


    

   

    useEffect(()=>{
        const getData = async () =>{
            let response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
            let resultado = await response.json()
            console.log(resultado.drinks[0]);
            setDatos(resultado.drinks)
        }
        getData()
    },[])



    return (
        <div>
            <br />
            <h3>contador: {contador}</h3>
            <button type="button" onClick={handleSumar}>
                +
            </button>
            <button type="button" onClick={handleRestar}>
                -
            </button>
            <br />
            <input type="text" onChange={(e) => setNombre(e.target.value)} />

            <br /><br /><br />
            <button type="button" onClick={() => setShow(!show)}>{show ? "ocultar" : "mostrar"}</button>
            {show === true ? <Componente1 /> : null}




            <br />
        </div>
    )
}

export default MainHome