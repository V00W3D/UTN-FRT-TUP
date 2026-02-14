import LibroIcono from "../assets/LibroIcono.png"
import PrestamosIcono from "../assets/PrestamosIcono.png"
import AuditoriaIcono from "../assets/AuditoriaIcono.png"
import AlumnosIcono from "../assets/AlumnosIcono.png"
import "../Styles/HeaderStyles.css"


const Header = () => {
    return (

        <div className="boxNavBar">

            <div className="boxHeadNavBar">
                <h2 >
                    ADMINN
                </h2>
            </div>

            <div className="boxItems">

                <div className="boxItemNavBar">
                    <a href="/inicio" className="boxItemNavBar">


                        <span> Inicio </span>
                    </a>
                </div>
                <div className="boxItemNavBar">
                    <a href="/alumnos" className="boxItemNavBar">
                        <div className="boxItemNavBarImg">
                            <img src={AlumnosIcono} alt="" style={{ width: "35px", }} />
                        </div>

                        <span> Alumnos </span>
                    </a>
                </div>

                <div className="boxItemNavBar">
                    <a href="/auditoria" className="boxItemNavBar">
                        <div className="boxItemNavBarImg">
                            <img src={AuditoriaIcono} alt="" style={{ width: "35px", }} />
                        </div>

                        <span> Auditoria </span>
                    </a>
                </div>

                <div className="boxItemNavBar">
                    <a href="/libros" className="boxItemNavBar">
                        <div className="boxItemNavBarImg">
                            <img src={LibroIcono} alt="" style={{ width: "35px", }} />
                        </div>

                        <span> Libros </span>
                    </a>
                </div>

                <div className="boxItemNavBar">
                    <a href="/prestamos" className="boxItemNavBar">
                        <div className="boxItemNavBarImg">
                            <img src={PrestamosIcono} alt="" style={{ width: "30px", height: "30px" }} />
                        </div>

                        <span> Prestamos </span>
                    </a>
                </div>
            </div>

        </div>

    )
}

export default Header;