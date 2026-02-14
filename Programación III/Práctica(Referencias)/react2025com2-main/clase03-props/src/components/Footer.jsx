import {Card} from "react-bootstrap"

export const Footer = ({legajo,nombre,apellido,edad,sexo,casado}) => {

    // console.log(Alumno);

    // const {legajo,nombre,apellido,edad,sexo} = Alumno
    return (
        <div className="footer">

            <h3 className="text-blue-500 text-center bg-warning">FR UTN 2025</h3>
            <br />
            <h4>Datos del Alumno</h4>
            <br />
            <Card style={{width:"50%",margin:"auto"}} className="text-center mt-3">
                <Card.Title>{nombre}{" "}{apellido}</Card.Title>
                <Card.Body>
                    <Card.Text>Legajo: {legajo}</Card.Text>
                    <Card.Text>edad: {edad}</Card.Text>
                    <Card.Text>sexo: {sexo}</Card.Text>
                    <Card.Text>casado: {casado===true ? "lo tienen esposado" : "esta libre sin apuros"}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

