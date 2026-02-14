import "../../../Styles/RegistrarAlumnoStyles.css"

const BoxRegistrarAlumno = () => {
    return (
        <div className="registroContainer">
            <h2>Registro de Alumnos</h2>

            <form className="registroForm">
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre completo"
                    className="registroInput"
                />

                <input
                    type="number"
                    name="dni"
                    placeholder="DNI"
                    className="registroInput"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="registroInput"
                />

                <input
                    type="text"
                    name="telefono"
                    placeholder="Teléfono"
                    className="registroInput"
                />

                <button type="submit" className="registroButton">
                    Registrar
                </button>
            </form>
        </div>
    )
}

export default BoxRegistrarAlumno