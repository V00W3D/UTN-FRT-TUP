import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/Home";
import SociosPage from "./components/Socios";
import ActividadesPage from "./components/Actividades";
import ReservasPage from "./components/Reservas";
import HistorialPage from "./components/Historial";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Login";
import { fetchSocios, createSocio, updateSocio, deleteSocio } from "./services/socios";
import { fetchActividades, createActividad, updateActividad, deleteActividad } from "./services/actividades";
import { fetchReservas, createReserva, updateReserva, deleteReserva } from "./services/reservas";

function App() {
  const [socios, setSocios] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    fetchSocios().then(setSocios).catch(() => setSocios([]));
    fetchActividades().then(setActividades).catch(() => setActividades([]));
    fetchReservas().then(setReservas).catch(() => setReservas([]));
  }, []);
  function addSocio(s) { return createSocio(s).then((r) => setSocios((x) => [...x, r])); }
  function updateSocioFn(s) { return updateSocio(s.id, s).then((r) => setSocios((x) => x.map((i) => i.id === r.id ? r : i))); }
  function deleteSocioFn(id) { return deleteSocio(id).then(() => setSocios((x) => x.filter((i) => i.id !== id))); }

  function addActividad(a) { return createActividad(a).then((r) => setActividades((x) => [...x, r])); }
  function updateActividadFn(a) { return updateActividad(a.id, a).then((r) => setActividades((x) => x.map((i) => i.id === r.id ? r : i))); }
  function deleteActividadFn(id) { return deleteActividad(id).then(() => setActividades((x) => x.filter((i) => i.id !== id))); }

  function addReserva(r) { return createReserva(r).then((n) => setReservas((x) => [...x, n])); }
  function updateReservaFn(r) { return updateReserva(r.id, r).then((u) => setReservas((x) => x.map((i) => i.id === u.id ? u : i))); }
  function deleteReservaFn(id) { return deleteReserva(id).then(() => setReservas((x) => x.filter((i) => i.id !== id))); }

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/socios" element={
              <PrivateRoute>
                <SociosPage socios={socios} setSocios={(fn) => fn ? setSocios(fn) : null} onAdd={addSocio} onUpdate={updateSocioFn} onDelete={deleteSocioFn} />
              </PrivateRoute>
            } />
            <Route path="/actividades" element={
              <PrivateRoute>
                <ActividadesPage actividades={actividades} setActividades={(fn) => fn ? setActividades(fn) : null} onAdd={addActividad} onUpdate={updateActividadFn} onDelete={deleteActividadFn} />
              </PrivateRoute>
            } />
            <Route path="/reservas" element={
              <PrivateRoute>
                <ReservasPage socios={socios} actividades={actividades} reservas={reservas} setReservas={(fn) => fn ? setReservas(fn) : null} onAdd={addReserva} onUpdate={updateReservaFn} onDelete={deleteReservaFn} />
              </PrivateRoute>
            } />
            <Route path="/historial" element={
              <PrivateRoute>
                <HistorialPage socios={socios} actividades={actividades} reservas={reservas} />
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
