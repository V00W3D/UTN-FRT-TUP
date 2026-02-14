import { useEffect, useState } from "react";
import { useAdminUIStore } from "../../store/AdminUIStore";
import { useUsers } from "../../hooks/UsersHook";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const AlumnosAdminSection = () => {
  const { mode } = useAdminUIStore();
  const [alumnos, setAlumnos] = useState([]);

  // 🔹 Cargar los usuarios con rol "user" desde la API
  const { users } = useUsers();

  useEffect(() => {
    const soloAlumnos = (users || []).filter((u) => (u.role || u.rol) === "user");
    setAlumnos(soloAlumnos);
  }, [users]);

  // Actualizar solo el estado en memoria; la persistencia debe estar en la API.
  const actualizarAlumnosEnEstado = (data) => {
    setAlumnos(data);
  };

  // ==============================
  // 🧩 ACCIONES SEGÚN MODO
  // ==============================

  const handleRowClick = (alumno) => {
    switch (mode) {
      case "ver":
        alert(`👁️ ${alumno.nombre}\n📧 ${alumno.correo}`);
        break;

      case "editar": {
        const nuevoNombre = prompt("Nuevo nombre:", alumno.nombre);
        const nuevoCorreo = prompt("Nuevo correo:", alumno.correo);
        if (!nuevoNombre || !nuevoCorreo) return;

        
        (async () => {
            try {
              if (alumno.id) {
                const res = await fetch(`${API_BASE}/users/${alumno.id}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ nombre: nuevoNombre, correo: nuevoCorreo }),
                });
                if (res.ok) {
                  const actualizadoServidor = await res.json();
                  const actualizado = alumnos.map((a) =>
                    a.id === alumno.id ? actualizadoServidor : a
                  );
                  actualizarAlumnosEnEstado(actualizado);
                  alert("✏️ Alumno actualizado.");
                  return;
                }
              }
            } catch (err) {
              console.error("Error al actualizar alumno en servidor:", err);
              try {
                alert(
                  "No se pudo actualizar el alumno en el servidor: " +
                    (err?.message || "")
                );
              } catch {
                // ignora errores
              }
              return;
            }
        })();
        break;
      }

      case "eliminar": {
        if (!confirm(`¿Eliminar a "${alumno.nombre}"?`)) return;

        (async () => {
          try {
                if (alumno.id) {
                  const res = await fetch(`${API_BASE}/users/${alumno.id}`, {
                    method: "DELETE",
                  });
                  if (res.ok) {
                    const nuevo = alumnos.filter((a) => a.id !== alumno.id);
                    actualizarAlumnosEnEstado(nuevo);
                    alert("🗑️ Alumno eliminado.");
                    return;
                  }
                }
              } catch (err) {
                console.error("Error al eliminar alumno en servidor:", err);
                try {
                  alert(
                    "No se pudo eliminar el alumno en el servidor: " +
                      (err?.message || "")
                  );
                } catch {
                  // ignora errores
                }

                return;
              }
        })();

        break;
      }

      default:
        break;
    }
  };

  const handleAdd = () => {
    const nombre = prompt("Nombre del alumno:");
    const correo = prompt("Correo:");
    if (!nombre || !correo) return;

    (async () => {
      try {
        const nuevoUser = { nombre, correo, role: "user", password: "123" };
        const res = await fetch(`${API_BASE}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoUser),
        });
        if (res.ok) {
          const saved = await res.json();
          const nuevo = [...alumnos, saved];
          actualizarAlumnosEnEstado(nuevo);
          alert(`✅ Alumno "${nombre}" registrado.`);
          return;
        }
      } catch (err) {
        console.error("Error al crear alumno en servidor:", err);
        try {
          alert(
            "No se pudo registrar el alumno en el servidor: " +
              (err?.message || "")
          );
        } catch {
          // ignora errores
        }
        
        return;
      }
    })();
  };

  // ==============================
  // 🧩 RENDER ÚNICO
  // ==============================

  return (
    <section className="student-section">
      <h2 className="section-title">Alumnos ({mode.toUpperCase()})</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            {mode === "eliminar" && <th>Acción</th>}
          </tr>
        </thead>
        <tbody>
          {alumnos.length > 0 ? (
            alumnos.map((a) => (
              <tr
                key={a.id}
                className={
                  ["ver", "editar"].includes(mode) ? "clickable-row" : ""
                }
                onClick={() =>
                  ["ver", "editar"].includes(mode) ? handleRowClick(a) : null
                }
              >
                <td>{a.nombre}</td>
                <td>{a.correo}</td>
                {mode === "eliminar" && (
                  <td>
                    <button
                      className="crud-btn"
                      style={{
                        background: "rgba(255,0,0,0.2)",
                        color: "#ff7070",
                      }}
                      onClick={() => handleRowClick(a)}
                    >
                      ❌
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={mode === "eliminar" ? 3 : 2}>
                No hay alumnos registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {mode === "crear" && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button className="crud-btn" onClick={handleAdd}>
            ➕ Registrar alumno
          </button>
        </div>
      )}

      <p style={{ marginTop: "1.2rem", textAlign: "center", opacity: 0.8 }}>
        {mode === "ver" && "⚪ Modo Visualización"}
        {mode === "crear" && "🟣 Modo Crear Alumno"}
        {mode === "editar" && "🟠 Modo Editar Alumno"}
        {mode === "eliminar" && "🔴 Modo Eliminar Alumno"}
      </p>
    </section>
  );
};

export default AlumnosAdminSection;
