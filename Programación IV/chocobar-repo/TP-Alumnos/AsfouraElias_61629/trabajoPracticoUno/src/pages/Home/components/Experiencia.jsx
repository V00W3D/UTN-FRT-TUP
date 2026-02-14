import N438 from "../assets-home/N438.jpg"
import "../../../styles/Experiencia.css"


const Experiencia = () => {

    return(

        <div className="ExpBox">

            <title>Experiencia</title>

            <img src={N438} alt="IMG-ME" className="AvatarStyle"/>

            <h2 style={{fontWeight: 700}}>Hola, Soy Elías</h2>

            <h3 style={{fontWeight: 300}}>Estudiante de la Universidad Tecnologica Nacional y
                <spam style={{fontWeight: 700}}> Desarrollador Frontend Freelance(TS, React, MUI, JS)</spam>, 
                Realizacion de trabajos frontend para una Empresa de Logistica.
            </h3>

            <a href="https://www.linkedin.com/in/hugo-el%C3%ADas-asfoura-assaff-ab9731303/" className="buttonLinkedin">Linkedin</a>
            
        </div>

    )

}

export default Experiencia;