import { useState } from "react"
import Hijo1 from "./components/Hijo1"
import Hijo2 from "./components/Hijo2"
import { Row, Col } from "react-bootstrap"
import useStore from "./store/useStore"

function App() {

  const {color,cambiarColor} = useStore()

 

  return (
    <>
<button onClick={cambiarColor}>cambiar color</button>
 
      <Row>
        <Col className={color ? "bg-success":"bg-info"}> 
          <Hijo1 />
        </Col>
        <Col>
          <Hijo2 />
        </Col>
      </Row>
    </>
  )
}

export default App
