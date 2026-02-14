
// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import Clientes from "../components/Clientes";
// import Servicios from "../components/Servicios";
// import FormTurno from "../components/FormTurno";
// import TurnosHoy from "../components/TurnosHoy";
// import HistorialCliente from "../components/HistorialCliente";

// import { useFetch } from "../hooks/useFetch";
// import { fetchClientes } from "../services/clientesService";
// import { fetchServicios } from "../services/serviciosService";
// import { fetchTurnos, agregarTurno as agregarTurnoService } from "../services/turnosService";

// import "../styles/Home.css";

// export default function Home() {
//   // Estado para seleccionar cliente y recargar turnos
//   const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

//   // Traemos datos simulados con useFetch
//   const { data: clientes, reload: reloadClientes } = useFetch(fetchClientes);
//   const { data: servicios, reload: reloadServicios } = useFetch(fetchServicios);
//   const { data: turnos, reload: reloadTurnos } = useFetch(fetchTurnos);

//   // Función para agregar turnos
//   const agregarTurno = async (nuevoTurno) => {
//     await agregarTurnoService(nuevoTurno);
//     reloadTurnos();
//   };

//   return (
//     <div className="home-container">
//       <Navbar />

//       <section id="clientes" className="section-container">
//         <Clientes 
//           clientes={clientes} 
//           setClientes={reloadClientes} 
//           onSelect={setClienteSeleccionado} 
//         />
//       </section>

//       <section id="servicios" className="section-container">
//         <Servicios 
//           servicios={servicios} 
//           setServicios={reloadServicios} 
//         />
//       </section>

//       <section id="turnos" className="section-container">
//         <FormTurno
//           clientes={clientes}
//           servicios={servicios}
//           agregarTurno={agregarTurno}
//           clienteSeleccionado={clienteSeleccionado}
//           setClienteSeleccionado={setClienteSeleccionado}
//         />
//       </section>

//       <section id="turnos-hoy" className="section-container">
//         <TurnosHoy turnos={turnos} />
//       </section>

//       <section id="historial" className="section-container">
//         <HistorialCliente
//           turnos={turnos}
//           clienteSeleccionado={clienteSeleccionado}
//         />
//       </section>

//       <Footer />
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Clientes from "../components/Clientes";
import Servicios from "../components/Servicios";
import FormTurno from "../components/FormTurno";
import TurnosHoy from "../components/TurnosHoy";
import HistorialCliente from "../components/HistorialCliente";
import { fetchClientes } from "../services/clientesService";
import { fetchServicios } from "../services/serviciosService";
import { fetchTurnos } from "../services/turnosService";
import "../styles/Home.css";

export default function Home() {
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [recargar, setRecargar] = useState(0);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [clientesData, serviciosData, turnosData] = await Promise.all([
          fetchClientes(),
          fetchServicios(),
          fetchTurnos()
        ]);
        setClientes(clientesData);
        setServicios(serviciosData);
        setTurnos(turnosData);
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };
    cargarDatos();
  }, [recargar]);

  const onAgendar = () => setRecargar(x => x + 1);

  return (
    <div className="home-container">
      <Navbar />

      <section id="clientes" className="section-container">
        <Clientes
          clientes={clientes}
          setClientes={setClientes}
          onSelect={setClienteSeleccionado}
        />
      </section>

      <section id="servicios" className="section-container">
        <Servicios servicios={servicios} setServicios={setServicios} />
      </section>

      <section id="turnos" className="section-container">
        <FormTurno
          clientes={clientes}
          servicios={servicios}
          onAgendar={onAgendar}
          setClienteSeleccionado={setClienteSeleccionado}
        />
      </section>

      <section id="turnos-hoy" className="section-container">
        <TurnosHoy />
      </section>

      <section id="historial" className="section-container">
        <HistorialCliente turnos={turnos} clienteSeleccionado={clienteSeleccionado} />
      </section>

      <Footer />
    </div>
  );
}