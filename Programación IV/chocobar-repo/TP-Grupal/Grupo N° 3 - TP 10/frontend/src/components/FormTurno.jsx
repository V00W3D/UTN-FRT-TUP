// import { useEffect, useState } from "react";
// import { get, post } from "../api.js";

// export default function FormTurno({ clienteSeleccionado, onAgendar }) {
//   const [clientes, setClientes] = useState([]);
//   const [servicios, setServicios] = useState([]);
//   const [clienteId, setClienteId] = useState("");
//   const [servicioId, setServicioId] = useState("");
//   const [fechaHora, setFechaHora] = useState("");
//   const [disponible, setDisponible] = useState(null);

//   useEffect(() => {
//     get("/clientes").then(setClientes);
//     get("/servicios").then(setServicios);
//   }, []);

//   useEffect(() => {
//     if (clienteSeleccionado) setClienteId(String(clienteSeleccionado.id));
//   }, [clienteSeleccionado]);

//   const chequear = async () => {
//     if (!fechaHora || !servicioId) return;
//     const s = servicios.find(x => String(x.id) === String(servicioId));
//     if (!s) return;

//     const inicio = new Date(fechaHora).toISOString().slice(0, 19).replace("T", " ");
//     const fin = new Date(new Date(fechaHora).getTime() + s.duracion_minutos * 60000)
//       .toISOString()
//       .slice(0, 19)
//       .replace("T", " ");

//     const r = await get(`/disponibilidad?inicio=${encodeURIComponent(inicio)}&fin=${encodeURIComponent(fin)}`);
//     setDisponible(r.disponible);
//   };

//   const enviar = async e => {
//     e.preventDefault();
//     if (!clienteId || !servicioId || !fechaHora)
//       return alert("Completa todos los campos");

//     const inicio = new Date(fechaHora).toISOString().slice(0, 19).replace("T", " ");

//     try {
//       await post("/turnos", {
//         cliente_id: Number(clienteId),
//         servicio_id: Number(servicioId),
//         inicio
//       });
//       setFechaHora("");
//       setDisponible(null);
//       onAgendar && onAgendar();
//     } catch (err) {
//       alert(err.error || "Error al guardar el turno");
//     }
//   };

//   return (
//     <div className="card">
//       <h2>Asignar Turno</h2>
//       <form onSubmit={enviar} className="row">
//         <select value={clienteId} onChange={e => setClienteId(e.target.value)}>
//           <option value="">Cliente</option>
//           {clientes.map(c => (
//             <option key={c.id} value={c.id}>{c.nombre}</option>
//           ))}
//         </select>

//         <select value={servicioId} onChange={e => setServicioId(e.target.value)}>
//           <option value="">Servicio</option>
//           {servicios.map(s => (
//             <option key={s.id} value={s.id}>{s.nombre}</option>
//           ))}
//         </select>

//         <input
//           type="datetime-local"
//           value={fechaHora}
//           onChange={e => setFechaHora(e.target.value)}
//         />
//         <button type="submit">Guardar</button>
//       </form>

//       <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "14px" }}>
//         <div style={{ textAlign: "center" }}>
//           <button type="button" onClick={chequear}>Ver disponibilidad</button>
//           {disponible === true && (
//             <div style={{ marginTop: "6px" }}>
//               <span className="pill badge-ok">Disponible</span>
//             </div>
//           )}
//           {disponible === false && (
//             <div style={{ marginTop: "6px" }}>
//               <span className="pill badge-bad">Ocupado</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { get, post } from "../api.js";

// export default function FormTurno({ clienteSeleccionado, onAgendar }) {
//   const [clientes, setClientes] = useState([]);
//   const [servicios, setServicios] = useState([]);
//   const [clienteId, setClienteId] = useState("");
//   const [servicioId, setServicioId] = useState("");
//   const [fechaHora, setFechaHora] = useState("");
//   const [disponible, setDisponible] = useState(null);

//   // Cargar clientes y servicios al montar
//   useEffect(() => {
//     get("/clientes").then(data => setClientes(Array.isArray(data) ? data : []));
//     get("/servicios").then(data => setServicios(Array.isArray(data) ? data : []));
//   }, []);

//   // Actualizar cliente seleccionado
//   useEffect(() => {
//     if (clienteSeleccionado) setClienteId(String(clienteSeleccionado.id));
//   }, [clienteSeleccionado]);

//   // Chequear disponibilidad del turno
//   const chequear = async () => {
//     if (!fechaHora || !servicioId) return;
//     const s = servicios.find(x => String(x.id) === String(servicioId));
//     if (!s) return;

//     const inicio = new Date(fechaHora).toISOString().slice(0, 19).replace("T", " ");
//     const fin = new Date(new Date(fechaHora).getTime() + s.duracion_minutos * 60000)
//       .toISOString()
//       .slice(0, 19)
//       .replace("T", " ");

//     const r = await get(`/disponibilidad?inicio=${encodeURIComponent(inicio)}&fin=${encodeURIComponent(fin)}`);
//     setDisponible(r.disponible);
//   };

//   // Enviar formulario
//   const enviar = async e => {
//     e.preventDefault();
//     if (!clienteId || !servicioId || !fechaHora)
//       return alert("Completa todos los campos");

//     const inicio = new Date(fechaHora).toISOString().slice(0, 19).replace("T", " ");

//     try {
//       await post("/turnos", {
//         cliente_id: Number(clienteId),
//         servicio_id: Number(servicioId),
//         inicio
//       });
//       setFechaHora("");
//       setDisponible(null);
//       onAgendar && onAgendar();
//     } catch (err) {
//       alert(err.error || "Error al guardar el turno");
//     }
//   };

//   return (
//     <div className="card">
//       <h2>Asignar Turno</h2>
//       <form onSubmit={enviar} className="row">
//         <select value={clienteId} onChange={e => setClienteId(e.target.value)}>
//           <option value="">Cliente</option>
//           {Array.isArray(clientes) && clientes.map(c => (
//             <option key={c.id} value={c.id}>{c.nombre}</option>
//           ))}
//         </select>

//         <select value={servicioId} onChange={e => setServicioId(e.target.value)}>
//           <option value="">Servicio</option>
//           {Array.isArray(servicios) && servicios.map(s => (
//             <option key={s.id} value={s.id}>{s.nombre}</option>
//           ))}
//         </select>

//         <input
//           type="datetime-local"
//           value={fechaHora}
//           onChange={e => setFechaHora(e.target.value)}
//         />
//         <button type="submit">Guardar</button>
//       </form>

//       <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "14px" }}>
//         <div style={{ textAlign: "center" }}>
//           <button type="button" onClick={chequear}>Ver disponibilidad</button>
//           {disponible === true && (
//             <div style={{ marginTop: "6px" }}>
//               <span className="pill badge-ok">Disponible</span>
//             </div>
//           )}
//           {disponible === false && (
//             <div style={{ marginTop: "6px" }}>
//               <span className="pill badge-bad">Ocupado</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { agregarTurno as agregarTurnoService } from "../services/turnosService";
import "../styles/FormTurno.css";

export default function FormTurno({ clientes = [], servicios = [], onAgendar, setClienteSeleccionado }) {
  const [clienteId, setClienteId] = useState("");
  const [servicioId, setServicioId] = useState("");
  const [fechaHora, setFechaHora] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    if (!clienteId || !servicioId || !fechaHora) return alert("Completa todos los campos");

    const sourceClientes = Array.isArray(clientes) ? clientes : [];
    const sourceServicios = Array.isArray(servicios) ? servicios : [];

    const cliente = sourceClientes.find((c) => String(c.id) === String(clienteId));
    const servicio = sourceServicios.find((s) => String(s.id) === String(servicioId));

    if (!cliente || !servicio) return alert("Cliente o servicio no válidos");

    const nuevoTurno = {
      clienteId: cliente.id,
      servicioId: servicio.id,
      fechaHora,
    };

    setIsSubmitting(true);
    try {
      // Intentar persistir en backend y obtener el recurso guardado
      const saved = await agregarTurnoService(nuevoTurno);
      // Notificar al resto de la app con el objeto real devuelto por el backend
      try {
        window.dispatchEvent(new CustomEvent("turnosChanged", { detail: saved }));
      } catch (e) {
        console.error("Error dispatching turnosChanged event:", e);
      }
      if (typeof onAgendar === "function") onAgendar();
    } catch (err) {
      console.error("Error guardando turno en backend:", err);
      // En caso de fallo, aún notificamos para que la UI intente recargar (opcional)
      try {
        window.dispatchEvent(new CustomEvent("turnosChanged", { detail: nuevoTurno }));
      } catch (e) {
        console.error("Error dispatching fallback turnosChanged event:", e);
      }
      if (typeof onAgendar === "function") onAgendar();
    } finally {
      setFechaHora("");
      setClienteId("");
      setServicioId("");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2>Asignar Turno</h2>
      <form onSubmit={enviar} className="form-turno">
        <select
          value={clienteId}
          onChange={(e) => {
            setClienteId(e.target.value);
            const cliente = (Array.isArray(clientes) ? clientes : []).find((c) => String(c.id) === e.target.value);
            if (typeof setClienteSeleccionado === "function") setClienteSeleccionado(cliente);
          }}
        >
          <option value="">Selecciona Cliente</option>
          {(Array.isArray(clientes) ? clientes : []).map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <select value={servicioId} onChange={(e) => setServicioId(e.target.value)}>
          <option value="">Selecciona Servicio</option>
          {(Array.isArray(servicios) ? servicios : []).map((s) => (
            <option key={s.id} value={s.id}>{s.nombre}</option>
          ))}
        </select>

        <input type="datetime-local" value={fechaHora} onChange={(e) => setFechaHora(e.target.value)} />

        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Guardando..." : "Agregar Turno"}</button>
      </form>
    </div>
  );
}