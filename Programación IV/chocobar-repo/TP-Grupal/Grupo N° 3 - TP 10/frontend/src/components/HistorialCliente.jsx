// import { useEffect, useState } from "react";
// import { get } from "../api.js";

// export default function HistorialCliente() {
//   const [clientes, setClientes] = useState([]);
//   const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
//   const [turnos, setTurnos] = useState([]);

//   useEffect(() => {
//     get("/clientes").then(setClientes);
//   }, []);

//   useEffect(() => {
//     if (!clienteSeleccionado) {
//       setTurnos([]);
//       return;
//     }
//     get(`/turnos?cliente_id=${clienteSeleccionado.id}`).then(setTurnos);
//   }, [clienteSeleccionado]);

//   return (
//     <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
//       <h2>Historial por Cliente</h2>

//       <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//         {clientes.map(c => (
//           <button
//             key={c.id}
//             onClick={() => setClienteSeleccionado(c)}
//             style={{
//               background: clienteSeleccionado?.id === c.id ? "#000" : "#fff",
//               color: clienteSeleccionado?.id === c.id ? "#fff" : "#000",
//               border: "1px solid #000",
//               borderRadius: "6px",
//               padding: "6px 8px",
//               cursor: "pointer",
//               textAlign: "left"
//             }}
//           >
//             {c.nombre}
//           </button>
//         ))}
//       </div>

//       <div style={{ marginTop: 16 }}>
//         {clienteSeleccionado ? (
//           <>
//             <h3>Turnos de {clienteSeleccionado.nombre}</h3>
//             <ul>
//               {turnos.length > 0 ? (
//                 turnos.map(t => (
//                   <li key={t.id}>
//                     {new Date(t.inicio.replace(" ", "T")).toLocaleString()} •{" "}
//                     {t.servicio_nombre} • {t.estado}
//                   </li>
//                 ))
//               ) : (
//                 <li>No tiene turnos registrados.</li>
//               )}
//             </ul>
//           </>
//         ) : (
//           <div>Selecciona un cliente para ver su historial.</div>
//         )}
//       </div>
//     </div>
//   );
// // }
// import React from "react";
// import "../styles/HistoriaCliente.css"; 

// export default function HistorialCliente({ turnos, clientes, clienteSeleccionado, setClienteSeleccionado }) {
//   // Filtra los turnos del cliente seleccionado
//   const historial = clienteSeleccionado
//     ? turnos.filter(t => t.clienteId === clienteSeleccionado.id)
//     : [];

//   return (
//     <div className="card historial-container">
//       <h2>Historial de Clientes</h2>

//       {/* Lista de todos los clientes para seleccionar */}
//       <div className="clientes-list">
//         <h3>Selecciona un cliente:</h3>
//         <ul>
//           {clientes.map(c => (
//             <li 
//               key={c.id} 
//               className={clienteSeleccionado && clienteSeleccionado.id === c.id ? "selected" : ""}
//               onClick={() => setClienteSeleccionado(c)}
//             >
//               {c.nombre} • {c.email || "-"} • {c.telefono || "-"}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Historial del cliente seleccionado */}
//       {clienteSeleccionado ? (
//         <div className="historial-turnos">
//           <h3>Historial de {clienteSeleccionado.nombre}:</h3>
//           {historial.length === 0 ? (
//             <p>Este cliente no tiene turnos registrados.</p>
//           ) : (
//             <ul>
//               {historial.map(t => (
//                 <li key={t.id}>
//                   {new Date(t.fechaHora).toLocaleString()} • {t.servicioNombre} • {t.estado}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       ) : (
//         <p>Selecciona un cliente para ver su historial.</p>
//       )}
//     </div>
//   );
// }


import React from "react";
import "../styles/HistoriaCliente.css";

export default function HistorialCliente({
  turnos = [],
  clienteSeleccionado = null,
}) {
  if (!clienteSeleccionado)
    return <p className="info-msg">Selecciona un cliente para ver historial.</p>;

  // Normalizar distintas formas de los objetos 'turno' (backend usa snake_case: cliente_id, inicio, servicio_nombre;
  // en el cliente local pueden usarse clienteId, fechaHora, servicioNombre). Con esto mostramos correctamente turnos
  // tanto pasados como futuros independientemente de la forma de los campos.
  const normalized = (turnos || []).map((t) => ({
    id: t.id ?? t.ID ?? null,
    clienteId: t.clienteId ?? t.cliente_id ?? t.cliente ?? null,
    servicioNombre: t.servicioNombre ?? t.servicio_nombre ?? t.servicioName ?? t.servicio ?? "",
    fechaHora: t.fechaHora ?? t.inicio ?? t.fecha ?? null,
    estado: t.estado ?? t.estado_turno ?? "",
  }));

  const historial = normalized.filter((t) => String(t.clienteId) === String(clienteSeleccionado.id));

  return (
    <div className="card">
      <h2>Historial de {clienteSeleccionado.nombre}</h2>
      {historial.length === 0 ? (
        <p>Este cliente no tiene turnos registrados.</p>
      ) : (
        <ul>
          {historial.map((t) => (
            <li key={t.id}>
              {new Date(t.fechaHora).toLocaleString()} • {t.servicioNombre} •{" "}
              {t.estado}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
