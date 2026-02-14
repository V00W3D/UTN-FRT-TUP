import fotoTcnWeb from "../assets-home/fotoTcnWeb.png"
import fotoRutransWeb from "../assets-home/fotoRutransWeb.png"
import "../../../styles/Proyectos.css"

const Proyectos = () => {

    return (
        <div className="ProyectosBox">

            <h1>Proyectos</h1>

            <div className="CardProyectos">

                <img src={fotoTcnWeb} alt="" className="imgProyecto" />

                <div>
                    <h3>Landing Page para Transporte Cargas del Norte <p style={{ fontWeight: 700 }}> (React, MUI, TS, NodeJS) </p> </h3>
                    <a href="https://transportecargasdelnorte.com" className="links">Pagina Web</a>
                </div>

            </div>
            <div className="CardProyectos">

                <img src={fotoRutransWeb} alt="" className="imgProyecto" />

                <div>
                    <h3>Landing Page para Rutrans(Son la misma empresa) <p style={{ fontWeight: 700 }}> (React, MUI, TS, NodeJS) </p> </h3>
                    <a href="https://rutranssrl.com" className="links">Pagina Web</a>
                </div>

            </div>

        </div>
    )

}

export default Proyectos;