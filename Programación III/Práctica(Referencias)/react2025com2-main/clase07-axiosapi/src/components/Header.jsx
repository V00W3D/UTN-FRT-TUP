import { useState, } from "react"
import Navigation from "./Navigation"

const Header = (props) => {

    console.log(props);

    const [nombre, setNombre] = useState("cristian")



    const handleSubmit = (e) => {
        e.preventDefault()
        props.getValor(nombre)
    }

    return (
        <div className="bg-amber-400 ">
           
            <Navigation />
            <br />
            <h1 className="text-blue-500 text-3xl font-bold text-center">Rick y morty API</h1>
            <br />
            <form action="" className="flex justify-center" onSubmit={handleSubmit}>
                <label htmlFor="">buscar</label>
                <input type="search" placeholder="imgresa un valor" onChange={(e) => setNombre(e.target.value)} />
                <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">mostrar</button>
            </form>
            <br />
            
            <br />
        </div>
    )
}

export default Header