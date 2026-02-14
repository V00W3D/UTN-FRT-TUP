import { useState, useEffect } from "react";
import Header from "../components/Header"; 
import DashboardCard from "./DashboardCard";
import { getUsuarios } from "../services/usuariosService";
import { getEventos } from "../services/eventosService";


const DashboardPrincipal = () => {
  const [usuariosCount, setUsuariosCount] = useState(0);
  const [eventosCount, setEventosCount] = useState(0);
  const [ventasCount, setVentasCount] = useState(0); // simulado por ahora
  const [ingresosTotal, setIngresosTotal] = useState("$0"); // simulado por ahora

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuarios = await getUsuarios();
        const eventos = await getEventos();

        setUsuariosCount(usuarios.length);
        setEventosCount(eventos.length);

        // Aquí se podria calcular ventas e ingresos si agregan una tabla de "ventas"
        setVentasCount(350); 
        setIngresosTotal("$3.250.000");
      } catch (error) {
        console.error("Error al cargar datos del dashboard:", error);
      }
    };
    fetchData();
  }, []);

  const datos = [
    { title: "Usuarios", value: usuariosCount, color: "primary" },
    { title: "Ventas", value: ventasCount, color: "success" },
    { title: "Ingresos", value: ingresosTotal, color: "warning" },
    { title: "Eventos", value: eventosCount, color: "danger" },
  ];

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        {datos.map((dato, index) => (
          <DashboardCard
            key={index}
            title={dato.title}
            value={dato.value}
            color={dato.color}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPrincipal;
