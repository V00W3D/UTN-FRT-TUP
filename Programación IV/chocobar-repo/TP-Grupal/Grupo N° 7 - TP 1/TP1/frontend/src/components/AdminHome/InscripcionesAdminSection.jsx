import { useEffect, useState } from "react";
import { useAdminUIStore } from "../../store/AdminUIStore";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const InscripcionesAdminSection = () => {
  const { mode } = useAdminUIStore();
  const [inscripciones, setInscripciones] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/inscripciones`);
        if (!res.ok) throw new Error("Error al obtener inscripciones");
        const data = await res.json();
        setInscripciones(data);
      } catch (err) {
        console.error(err);
        alert(
          "No se pudieron cargar las inscripciones desde el servidor. Asegúrate de iniciar el servidor de la API."
        );
        setInscripciones([]);
      }
    };
    load();
  }, []);

  const actualizarInscripcionesEnEstado = (data) => {
    setInscripciones(data);
  };

  const handleRowClick = async (i) => {
    try {
      switch (mode) {
        case "ver":
          alert(
            `📘 Curso: ${i.cursoNombre || i.curso}\n👤 Alumno: ${
              i.alumno || i.userId
            }\n📅 ${i.fecha || "Sin fecha"}\nEstado: ${i.estado || "Pendiente"}`
          );
          break;

        case "aceptar": {
          // actualizar en el servidor
          const res = await fetch(`${API_BASE}/inscripciones/${i.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estado: "Aceptada" }),
          });
          if (!res.ok) throw new Error("Error al actualizar inscripción");
          const updated = await res.json();
          const nuevo = inscripciones.map((insc) => (insc.id === i.id ? updated : insc));
          actualizarInscripcionesEnEstado(nuevo);
          alert(`✅ Inscripción aceptada (${i.curso || i.cursoNombre}).`);
          break;
        }

        case "rechazar": {
          const res = await fetch(`${API_BASE}/inscripciones/${i.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estado: "Rechazada" }),
          });
          if (!res.ok) throw new Error("Error al actualizar inscripción");
          const updated = await res.json();
          const nuevo = inscripciones.map((insc) => (insc.id === i.id ? updated : insc));
          actualizarInscripcionesEnEstado(nuevo);
          alert(`❌ Inscripción rechazada (${i.curso || i.cursoNombre}).`);
          break;
        }

        default:
          break;
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Error en la operación");
    }
  };

  const handleAdd = async () => {
    const alumno = prompt("Nombre del alumno:");
    const curso = prompt("Nombre del curso:");
    if (!alumno || !curso) return;
    try {
      const payload = {
        alumno,
        curso,
        estado: "Pendiente",
        fecha: new Date().toLocaleDateString(),
      };
      const res = await fetch(`${API_BASE}/inscripciones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error al crear inscripción");
  const saved = await res.json();
  const nueva = [...inscripciones, saved];
  actualizarInscripcionesEnEstado(nueva);
      alert(`📋 Inscripción creada para ${alumno} en "${curso}".`);
    } catch (err) {
      console.error(err);
      alert(err.message || "Error al crear inscripción");
    }
  };

  return (
    <section className="student-section">
      <h2 className="section-title">Inscripciones ({mode.toUpperCase()})</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>Alumno</th>
            <th>Curso</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {inscripciones.length > 0 ? (
            inscripciones.map((i) => (
              <tr
                key={i.id}
                className={
                  ["ver", "aceptar", "rechazar"].includes(mode)
                    ? "clickable-row"
                    : ""
                }
                onClick={() =>
                  ["ver", "aceptar", "rechazar"].includes(mode)
                    ? handleRowClick(i)
                    : null
                }
              >
                <td>{i.alumno || i.userId}</td>
                <td>{i.curso || i.cursoNombre}</td>
                <td>{i.fecha || "-"}</td>
                <td>{i.estado || "Pendiente"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No hay inscripciones registradas
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {mode === "crear" && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button className="crud-btn" onClick={handleAdd}>
            ➕ Registrar inscripción
          </button>
        </div>
      )}

      <p style={{ marginTop: "1.2rem", textAlign: "center", opacity: 0.8 }}>
        {mode === "ver" && "⚪ Modo Visualización"}
        {mode === "crear" && "🟣 Modo Crear Inscripción"}
        {mode === "aceptar" && "🟢 Modo Aceptar Inscripción"}
        {mode === "rechazar" && "🔴 Modo Rechazar Inscripción"}
      </p>
    </section>
  );
};

export default InscripcionesAdminSection;
