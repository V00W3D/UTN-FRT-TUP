import Header from "../../components/Header";
import Experiencia from "./components/Experiencia"
import Proyectos from "./components/Proyectos"
import Estudios from "./components/Estudios"
import Idiomas from "./components/Idiomas";
import SoftSkills from "./components/SoftSkills";
import Footer from "../../components/Footer";

const Home = () => {

    return(
        <>

        <Header/>
        
      <section id="experiencia">
        <Experiencia />
      </section>

      <section id="proyectos">
        <Proyectos />
      </section>

      <section id="estudios">
        <Estudios />
      </section>

      <section id="idiomas">
        <Idiomas />
      </section>

      <section id="softskills">
        <SoftSkills />
      </section>

        <Footer/>

        </>
    )

}

export default Home;