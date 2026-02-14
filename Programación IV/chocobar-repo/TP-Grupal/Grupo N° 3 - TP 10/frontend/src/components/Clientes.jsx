// import { useEffect, useState } from "react";
// import { get } from "../api.js";

// export default function Clientes() {
//   const [lista, setLista] = useState([]);
//   const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });

//   const cargar = async () => {
//     const data = await get("/clientes");
//     setLista(data);
//   };

//   useEffect(() => {
//     cargar();
//   }, []);

//   const enviar = async (e) => {
//     e.preventDefault();
//     if (!form.nombre || !form.email || !form.telefono)
//       return alert("Completa todos los campos");

//     await fetch("http://localhost:3001/clientes", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         nombre: form.nombre,
//         correo: form.email,
//         telefono: form.telefono,
//       }),
//     });

//     window.location.reload();
//   };

//   const eliminar = async (id) => {
//     if (!confirm("¿Seguro que deseas eliminar este cliente?")) return;
//     await fetch(`http://localhost:3001/clientes/${id}`, { method: "DELETE" });
//     window.location.reload();
//   };

//   return (
//     <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
//       <h2>Clientes</h2>
//       <form onSubmit={enviar} style={{ display: "grid", gap: 8 }}>
//         <input
//           placeholder="Nombre"
//           value={form.nombre}
//           onChange={(e) => setForm((v) => ({ ...v, nombre: e.target.value }))}
//         />
//         <input
//           placeholder="Correo electrónico"
//           value={form.email}
//           onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))}
//         />
//         <input
//           placeholder="Teléfono"
//           value={form.telefono}
//           onChange={(e) => setForm((v) => ({ ...v, telefono: e.target.value }))}
//         />
//         <button>Agregar</button>
//       </form>

//       <ul style={{ marginTop: 10 }}>
//         {lista.map((c) => (
//           <li
//             key={c.id}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               gap: 8,
//               alignItems: "center",
//               padding: "6px 0",
//             }}
//           >
//             <span>{c.nombre}</span>
//             <button onClick={() => eliminar(c.id)}>Eliminar</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import "../styles/Clientes.css";

// const Clientes = () => {
//   const [clientes, setClientes] = useState([]);
//   const [nuevoCliente, setNuevoCliente] = useState({
//     nombre: "",
//     email: "",
//     telefono: "",
//   });

//   const handleChange = (e) => {
//     setNuevoCliente({ ...nuevoCliente, [e.target.name]: e.target.value });
//   };

//   const agregarCliente = (e) => {
//     e.preventDefault();
//     if (!nuevoCliente.nombre || !nuevoCliente.email || !nuevoCliente.telefono) return;

//     setClientes([...clientes, nuevoCliente]);
//     setNuevoCliente({ nombre: "", email: "", telefono: "" });
//   };

//   const eliminarCliente = (index) => {
//     const nuevos = clientes.filter((_, i) => i !== index);
//     setClientes(nuevos);
//   };

//   return (
//     <div className="clientes-container">
//       <h2>Gestión de Clientes</h2>

//       <form onSubmit={agregarCliente}>
//         <input
//           type="text"
//           name="nombre"
//           placeholder="Nombre"
//           value={nuevoCliente.nombre}
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={nuevoCliente.email}
//           onChange={handleChange}
//         />
//         <input
//           type="tel"
//           name="telefono"
//           placeholder="Teléfono"
//           value={nuevoCliente.telefono}
//           onChange={handleChange}
//         />
//         <button type="submit">Agregar Cliente</button>
//       </form>

//       <ul>
//         {clientes.map((c, index) => (
//           <li key={index}>
//             <span>
//               <strong>{c.nombre}</strong> - {c.email} - {c.telefono}
//             </span>
//             <button onClick={() => eliminarCliente(index)}>Eliminar</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import "../styles/Clientes.css";
import {
  fetchClientes as apiFetchClientes,
  agregarCliente as apiAgregarCliente,
  eliminarCliente as apiEliminarCliente,
} from "../services/clientesService.js";

export default function Clientes() {
  // Nota: el componente usa siempre la DB. El mock fue desactivado en
  // src/services/clientesService.js. Aquí mantenemos estado local sólo para
  // renderizar los datos que vienen de la API y para manejar el formulario.
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });
  const [loading, setLoading] = useState(false);

  const cargar = async () => {
    setLoading(true);
    try {
      const data = await apiFetchClientes();
      // Backend devuelve campos: { id, nombre, correo, telefono }
      // Mapeamos correo -> email para la UI
      setClientes(
        Array.isArray(data)
          ? data.map((c) => ({ ...c, email: c.correo ?? c.email }))
          : []
      );
    } catch (err) {
      console.error("Error cargando clientes:", err);
      setClientes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const enviar = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.telefono)
      return alert("Completa todos los campos");

    setLoading(true);
    try {
      const creado = await apiAgregarCliente({
        nombre: form.nombre,
        // el servicio mapeará email -> correo
        email: form.email,
        telefono: form.telefono,
      });
      // El backend devuelve el registro creado con los campos finales.
      // Normalizamos para la UI (correo -> email)
      const nuevo = { ...creado, email: creado.correo ?? creado.email };
      setClientes((prev) => [nuevo, ...prev]);
      setForm({ nombre: "", email: "", telefono: "" });
    } catch (err) {
      console.error("Error creando cliente:", err);
      alert(err.message || "Error al crear cliente");
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este cliente?")) return;
    setLoading(true);
    try {
      await apiEliminarCliente(id);
      // actualizar lista local
      setClientes((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error eliminando cliente:", err);
      alert(err.message || "Error al eliminar cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Clientes</h2>

      <form onSubmit={enviar} className="form-cliente">
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          disabled={loading}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          disabled={loading}
        />
        <input
          placeholder="Teléfono"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Agregar Cliente"}
        </button>
      </form>

      {loading && clientes.length === 0 ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {clientes.map((c) => (
            <li key={c.id} style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", padding: "6px 0" }}>
              <span>
                <strong>{c.nombre}</strong> • {c.email} • {c.telefono}
              </span>
              <div>
                <button onClick={() => eliminar(c.id)} disabled={loading}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

