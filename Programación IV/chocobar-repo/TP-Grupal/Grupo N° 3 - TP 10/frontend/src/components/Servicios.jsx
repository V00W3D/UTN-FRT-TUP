// import { useEffect, useState } from "react";
// import { get } from "../api.js";

// export default function Servicios() {
//   const [lista, setLista] = useState([]);
//   const [form, setForm] = useState({ nombre: "", precio: "", duracion: 60 });

//   const cargar = async () => {
//     const data = await get("/servicios");
//     setLista(data);
//   };

//   useEffect(() => {
//     cargar();
//   }, []);

//   const enviar = async e => {
//     e.preventDefault();
//     if (!form.nombre || !form.precio)
//       return alert("Completa todos los campos");

//     await fetch("http://localhost:3001/servicios", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         nombre: form.nombre,
//         precio: Number(form.precio),
//         duracion_minutos: Number(form.duracion)
//       })
//     });

//     window.location.reload();
//   };

//   const eliminar = async id => {
//     if (!confirm("¿Seguro que deseas eliminar este servicio?")) return;
//     await fetch(`http://localhost:3001/servicios/${id}`, { method: "DELETE" });
//     window.location.reload();
//   };

//   return (
//     <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
//       <h2>Servicios</h2>
//       <form onSubmit={enviar} style={{ display: "grid", gap: 8 }}>
//         <input
//           placeholder="Nombre del servicio"
//           value={form.nombre}
//           onChange={e => setForm(v => ({ ...v, nombre: e.target.value }))}
//         />
//         <input
//           placeholder="Precio"
//           value={form.precio}
//           onChange={e => setForm(v => ({ ...v, precio: e.target.value }))}
//         />
//         <input
//           placeholder="Duración (minutos)"
//           value={form.duracion}
//           onChange={e => setForm(v => ({ ...v, duracion: e.target.value }))}
//         />
//         <button>Agregar</button>
//       </form>

//       <ul style={{ marginTop: 10 }}>
//         {lista.map(s => (
//           <li
//             key={s.id}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               gap: 8,
//               padding: "6px 0"
//             }}
//           >
//             <span>
//               {s.nombre} • ${s.precio} • {s.duracion_minutos} min
//             </span>
//             <button onClick={() => eliminar(s.id)}>Eliminar</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// src/components/Servicios.jsx



// import React, { useState } from "react";
// import "../styles/Servicios.css";

// const Servicios = () => {
//   const [servicios, setServicios] = useState([]);
//   const [nuevoServicio, setNuevoServicio] = useState({
//     nombre: "",
//     precio: "",
//     duracion: "",
//   });

//   const handleChange = (e) => {
//     setNuevoServicio({ ...nuevoServicio, [e.target.name]: e.target.value });
//   };

//   const agregarServicio = (e) => {
//     e.preventDefault();
//     if (!nuevoServicio.nombre || !nuevoServicio.precio || !nuevoServicio.duracion) return;

//     setServicios([...servicios, nuevoServicio]);
//     setNuevoServicio({ nombre: "", precio: "", duracion: "" });
//   };

//   const eliminarServicio = (index) => {
//     const nuevos = servicios.filter((_, i) => i !== index);
//     setServicios(nuevos);
//   };

//   return (
//     <div className="servicios-container">
//       <h2>Gestión de Servicios</h2>

//       <form onSubmit={agregarServicio}>
//         <input
//           type="text"
//           name="nombre"
//           placeholder="Nombre del servicio"
//           value={nuevoServicio.nombre}
//           onChange={handleChange}
//         />
//         <input
//           type="number"
//           name="precio"
//           placeholder="Precio ($)"
//           value={nuevoServicio.precio}
//           onChange={handleChange}
//         />
//         <input
//           type="number"
//           name="duracion"
//           placeholder="Duración (minutos)"
//           value={nuevoServicio.duracion}
//           onChange={handleChange}
//         />
//         <button type="submit">Agregar Servicio</button>
//       </form>

//       <ul>
//         {servicios.map((s, index) => (
//           <li key={index}>
//             <span>
//               <strong>{s.nombre}</strong> - ${s.precio} ({s.duracion} min)
//             </span>
//             <button onClick={() => eliminarServicio(index)}>Eliminar</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Servicios;

import { useState } from "react";
import "../styles/Servicios.css";

export default function Servicios({ servicios, setServicios }) {
  const [form, setForm] = useState({ nombre: "", precio: "", duracion: "" });

  const agregarServicio = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio || !form.duracion) return alert("Completa todos los campos");

    const nuevoServicio = {
      id: Date.now(),
      nombre: form.nombre,
      precio: Number(form.precio),
      duracion_minutos: Number(form.duracion)
    };

    setServicios([...servicios, nuevoServicio]);
    setForm({ nombre: "", precio: "", duracion: "" });
  };

  return (
    <div className="card">
      <h2>Servicios</h2>
      <form onSubmit={agregarServicio} className="form-servicio">
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          placeholder="Precio"
          value={form.precio}
          onChange={(e) => setForm({ ...form, precio: e.target.value })}
        />
        <input
          placeholder="Duración (min)"
          value={form.duracion}
          onChange={(e) => setForm({ ...form, duracion: e.target.value })}
        />
        <button type="submit">Agregar Servicio</button>
      </form>

      <ul>
        {servicios.map(s => (
          <li key={s.id}>{s.nombre} • ${s.precio} • {s.duracion_minutos} min</li>
        ))}
      </ul>
    </div>
  );
}
