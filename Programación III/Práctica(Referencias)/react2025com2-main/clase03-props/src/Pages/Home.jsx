import Header from "../components/Header";
import Main from "../components/Main";
import {Footer} from "../components/Footer";


const Home = () => {


    const titulo = "Clase 03 - PROPS"



    const perritos = ["firu","lazy","satanas","mordelon"]


    const [a,b,c,d] = perritos


    const Alumno = {
        legajo:61649,
        nombre:"lautaro",
        apellido:"messi",
        edad:19,
        sexo:"masculino",
        casado:false,
        mascota:{
            nombreMascota:"kala",
            raza:"felina"
        }
    }

    //const {legajo,nombre,apellido} = Alumno




    return ( 
        <>
      
        <Header titulo={titulo}/>
        <Main saludo="Bienvenidos"/>
        <Footer {...Alumno}/>
        <br />
        {/* <h3>perrito: {d}</h3>
        <br />
        <h3>datos del alumno: {Alumno.sexo}</h3>
        <h3>gato del alumno: {Alumno.mascota.nombreMascota}</h3> */}



        </>
        
       
     );
}
 
export default Home;