import {Header} from "../component/Header"
import Main from "../component/Main"
import Footer from "../component/Footer"

const HomePage = (props) =>{

// console.log("props",props.nombre)
// const {nombre} = props
    return(
        <div>
            <h1>Hola {nombre}</h1>
        <Header />
        <Main/>
        <Footer/>
        </div>
    )
}

export default HomePage