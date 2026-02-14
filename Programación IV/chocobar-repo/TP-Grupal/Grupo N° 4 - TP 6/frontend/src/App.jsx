// src/styles/App.jsx
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import FormularioLogin from './pages/FormularioLogin';
import FormularioRegistro from './pages/FormularioRegistro';
import TablaEventos from './pages/TablaEventos';
import TablaArtistas from './pages/TablaArtistas';
import TablaAsistentes from './pages/TablaAsistentes';
import DashboardPrincipal from './dashboard/DashboardPrincipal';
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<FormularioLogin />} />
      <Route path="/registro" element={<FormularioRegistro />} />

      {/* Rutas privadas */}
      <Route 
        path="/tabla-eventos" 
        element={
          <PrivateRoute>
            <TablaEventos />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/tabla-artistas" 
        element={
          <PrivateRoute>
            <TablaArtistas />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/tabla-asistentes" 
        element={
          <PrivateRoute>
            <TablaAsistentes />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <DashboardPrincipal />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}

export default App;
