// import { useEffect, useState } from "react";
// import { get } from "../api.js";

// const formato = s => new Date(s.replace(" ", "T")).toLocaleString();

// export default function TurnosHoy() {
//   const [turnos, setTurnos] = useState([]);
//   const hoy = new Date().toISOString().slice(0, 10);

//   const cargar = async () => {
//     const data = await get(`/turnos?fecha=${hoy}`);
//     setTurnos(data);
//   };

//   useEffect(() => {
//     cargar();
//   }, []);

//   const cambiarEstado = async (id, estado) => {
//     await fetch(`http://localhost:3001/turnos/${id}/estado`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ estado })
//     });
//     window.location.reload();
//   };

//   const eliminar = async id => {
//     if (!confirm("¿Seguro que deseas eliminar este turno?")) return;
//     await fetch(`http://localhost:3001/turnos/${id}`, { method: "DELETE" });
//     window.location.reload();
//   };

//   return (
//     <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
//       <h2>Turnos del Día</h2>
//       <ul>
//         {turnos.map(t => (
//           <li
//             key={t.id}
//             style={{
//               margin: "6px 0",
//               display: "flex",
//               gap: 8,
//               alignItems: "center",
//               justifyContent: "space-between"
//             }}
//           >
//             <div>
//               {formato(t.inicio)} • {t.cliente_nombre} • {t.servicio_nombre} •{" "}
//               {t.estado}
//             </div>
//             <div style={{ display: "flex", gap: 6 }}>
//               <button onClick={() => cambiarEstado(t.id, "hecho")}>
//                 Finalizar
//               </button>
//               <button onClick={() => cambiarEstado(t.id, "cancelado")}>
//                 Cancelar
//               </button>
//               <button onClick={() => eliminar(t.id)}>Eliminar</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// src/components/TurnosHoy.jsx
// import React from "react";
// import "../styles/Turno.css";

// const TurnosHoy = ({ turnos }) => {
//   const hoy = new Date().toISOString().split("T")[0];
//   const turnosHoy = turnos.filter((t) => t.fecha === hoy);

//   return (
//     <div className="turnos-container">
//       <h2>Turnos de Hoy ({hoy})</h2>
//       {turnosHoy.length === 0 ? (
//         <p>No hay turnos asignados para hoy.</p>
//       ) : (
//         <ul>
//           {turnosHoy.map((t, i) => (
//             <li key={i}>
//               <strong>{t.cliente}</strong> - {t.servicio}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TurnosHoy;
import React, { useEffect, useState } from "react";
import { fetchTurnos, actualizarTurno, eliminarTurno } from "../services/turnosService";
import "../styles/Turno.css";

export default function TurnosHoy() {
  const [turnos, setTurnos] = useState([]);
  const hoy = new Date().toISOString().slice(0, 10);

  const cargarTurnos = async () => {
    try {
      const data = await fetchTurnos(hoy);
      setTurnos(data);
    } catch (err) {
      console.error("Error cargando turnos:", err);
    }
  };

  useEffect(() => {
    cargarTurnos();

    // Escuchar eventos globales cuando se añaden/actualizan turnos
    const handleChanged = () => cargarTurnos();
    window.addEventListener("turnosChanged", handleChanged);
    return () => {
      window.removeEventListener("turnosChanged", handleChanged);
    };
  }, []);

  const cambiarEstado = async (id, estado) => {
    try {
      await actualizarTurno(id, { estado });
      cargarTurnos();
    } catch (err) {
      alert("Error al actualizar estado");
    }
  };

  const eliminar = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este turno?")) return;
    try {
      await eliminarTurno(id);
      cargarTurnos();
    } catch (err) {
      alert("Error al eliminar turno");
    }
  };

  return (
    <div className="card">
      <h2>Turnos del Día</h2>
      {turnos.length === 0 ? (
        <p>No hay turnos para hoy.</p>
      ) : (
        <ul>
          {turnos.map(t => (
            <li key={t.id} style={{ margin: "6px 0", display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between" }}>
              <div>
                {new Date(t.inicio.replace(" ", "T")).toLocaleString()} • {t.cliente_nombre} • {t.servicio_nombre} • {t.estado}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => cambiarEstado(t.id, "hecho")}>Finalizar</button>
                <button onClick={() => cambiarEstado(t.id, "cancelado")}>Cancelar</button>
                <button onClick={() => eliminar(t.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
