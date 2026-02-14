import { estudios } from "../../../utils/estudiosData";
import "../../../styles/Estudios.css"


const Estudios = () => {

    return (
        
            <div className="EstudiosBox">
                <h1>Estudios</h1>
                <div className="EstudiosList">
                    {estudios.map((item, index) => (
                        <div key={index} className="EstudioCard">
                            <h3>{item.titulo}</h3>
                            <p ><strong>{item.institucion}</strong></p>
                            <p>{item.año}</p>
                            {item.descripcion && <p className="descripcion">{item.descripcion}</p>}
                        </div>
                    ))}
                </div>
            </div>
    )

}

export default Estudios;