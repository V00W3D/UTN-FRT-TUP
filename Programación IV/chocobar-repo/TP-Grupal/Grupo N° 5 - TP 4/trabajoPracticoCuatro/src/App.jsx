import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Inicio from "./Containers/Inicio"
import RegistrarAlumno from "./Containers/RegistrarAlumno"
import FormEditarAlumno from "./Componets/FormEditarAlumno"
import RegistrarLibro from "./Containers/RegistrarLibro"
import Alumnos from "./Containers/Alumnos"
import Libros from "./Containers/Libros"
import Auditoria from "./Containers/Auditoria"
import Prestamos from "./Containers/Prestamos"
import { VER_ALUMNOS, CREAR_ALUMNOS, EDITAR_ALUMNO } from "./routers/alumnos.routes"
import { CREAR_LIBRO, EDITAR_LIBRO, VER_LIBROS } from "./routers/libros.routes"
import { INICIO, RAIZ } from "./routers/inicio.routes"
import { LOGIN } from "./routers/login.routes"
import LoginPage from "./pages/LoginPage"
import FormEditarLibro from "./Componets/FormEditarLibro"
import { REGISTRAR_AUDITORIA, VER_AUDITORIA } from "./routers/auditoria.routes"
import FormRegistrarAuditoria from "./Componets/FormRegistrarAuditoria"

function App() {

  return (
    <Router>
      <Routes>
        <Route path={RAIZ} element={<Navigate to={LOGIN} replace />} />
        <Route path={LOGIN} element={<LoginPage/>}/>
        <Route path={INICIO} element={<Inicio/>}/>
        <Route path={VER_ALUMNOS} element={<Alumnos/>}/>
        <Route path={CREAR_ALUMNOS} element={<RegistrarAlumno/>} />
        <Route path={EDITAR_ALUMNO} element={<FormEditarAlumno/>}/>
         <Route path={CREAR_LIBRO} element={<RegistrarLibro/>}/>
         <Route path={VER_LIBROS} element={<Libros/>}/>
         <Route path={EDITAR_LIBRO} element={<FormEditarLibro/>}/>
        <Route path={VER_AUDITORIA} element={<Auditoria />} />
        <Route path={REGISTRAR_AUDITORIA} element={<FormRegistrarAuditoria/>}/>
         <Route path="/prestamos" element={<Prestamos/>}/>
      </Routes>
    </Router>
  )
}

export default App
