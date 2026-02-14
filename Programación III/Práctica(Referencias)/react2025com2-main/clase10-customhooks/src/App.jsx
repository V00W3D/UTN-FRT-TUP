import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Personajes from "./pages/Personajes"
import Error from "./components/Error"
import Personaje from "./pages/Personaje"
import PrivateRoute from "./components/PrivateRoute"
import { LOGIN,REGISTER,PERSONAJES,PERSONAJE,ERROR } from "./routes/rutas"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* rutas publicas */}
          <Route path={LOGIN} element={<Login />} />
          <Route path={REGISTER} element={<Register />} />

          <Route element={<PrivateRoute/>}>
            <Route path={PERSONAJES} element={<Personajes />} />
            <Route path={PERSONAJE} element={<Personaje />} />
          </Route>

          <Route path={ERROR} element={<Error />} />
        </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App
