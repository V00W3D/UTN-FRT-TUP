import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import EditarArt from "./pages/EditarArt"
import AgregarArt from "./pages/AgregarArt"
import VerArt from "./pages/VerArt"
import Error from "./components/Error"

function App() {
 

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/articulos/editar/:id" element={<EditarArt/>}/>
        <Route path="/articulos/agregar" element={<AgregarArt/>}/>
        <Route path="/articulos/ver/:id" element={<VerArt/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
