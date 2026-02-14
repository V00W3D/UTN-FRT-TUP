import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
<<<<<<< HEAD:TP-Grupal/Grupo N° 9/trabajoPracticoCuatro/src/App.jsx
import Inicio from "./Containers/Inicio"
import Prestamos from "./Containers/Prestamos"


=======
import Home from "./pages/Home/Home"
import './App.css'
>>>>>>> 028ba0bbcd27d1058ed2a66ae5948b7d1d9158f5:TP-Alumnos/AsfouraElias_61629/trabajoPracticoUno/src/App.jsx

function App() {

  return (
    <>

    <Router>
      <Routes>
<<<<<<< HEAD:TP-Grupal/Grupo N° 9/trabajoPracticoCuatro/src/App.jsx
        <Route path="/inicio" element={<Inicio/>}/>
        <Route path="/prestamos" element={<Prestamos/>}/>

=======
        <Route path="/home" element={<Home/>}/>
>>>>>>> 028ba0bbcd27d1058ed2a66ae5948b7d1d9158f5:TP-Alumnos/AsfouraElias_61629/trabajoPracticoUno/src/App.jsx
      </Routes>
    </Router>

    </>
  )
}

export default App
