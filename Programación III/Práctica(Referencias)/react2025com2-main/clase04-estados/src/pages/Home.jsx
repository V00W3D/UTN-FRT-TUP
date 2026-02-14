import FetchRickMorty from "../components/FetchRickMorty"
import Footer from "../components/Footer"
import Header from "../components/Header"
import MainHome from "../components/MainHome"

const Home = ()=>{



    return (

        <div className="text-center">
        <Header/>
        <FetchRickMorty />
        <Footer/>
        </div>
    )
}

export default Home