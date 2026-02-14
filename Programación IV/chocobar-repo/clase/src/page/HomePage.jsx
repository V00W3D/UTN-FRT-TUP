import Header from "../component/Header"
import {Footer} from "../component/Footer"
import Main from "../component/Main"

const HomePage = (props) =>{

    const {nombre, años, desarrollador} = props

console.log("props en HomePage", años)

    return(
        <div>
            <Header/>
            <Main añosHome={años} />
            <Footer/>
        </div>
    )
}

export default HomePage