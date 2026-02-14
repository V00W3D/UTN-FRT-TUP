import { useEffect, useState } from "react";
import { useAdminUIStore } from "../../store/AdminUIStore";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const CursosSection = () => {
  const { mode } = useAdminUIStore();
  const [cursos, setCursos] = useState([]);

  // 🔹 Cargar cursos iniciales (desde API con fallback local)
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/cursos`);
        if (!res.ok) throw new Error("No hay cursos");
        const data = await res.json();
        setCursos(data);
      } catch {
        console.error("Error al cargar cursos desde API");
        alert(
          "No se pudieron cargar los cursos desde la API. Asegúrate de iniciar el servidor de la API."
        );
        setCursos([]);
      }
    };
    load();
  }, []);

  // 🔹 Guardar y refrescar (local + API)
  const guardarCursos = async (data) => {
    // Intentar persistir cada curso en la API
    try {
      for (let i = 0; i < data.length; i++) {
        const c = data[i];
        if (c.id) {
          const res = await fetch(`${API_BASE}/cursos/${c.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(c),
          });
          if (!res.ok) throw new Error("Error al actualizar curso en API");
        } else {
          const res = await fetch(`${API_BASE}/cursos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(c),
          });
          if (!res.ok) throw new Error("Error al crear curso en API");
          const saved = await res.json();
          data[i] = saved; // actualizar id asignado
        }
      }
      // si todo ok, actualizar estado
      setCursos(data);
    } catch (err) {
      console.warn("No se pudo sincronizar cursos con API:", err.message);
      try {
        alert("No se pudieron sincronizar los cursos con la API: " + (err?.message || ""));
      } catch {
        // ignora errores
      }

    }
  };

  // ==============================
  // 🧩 ACCIONES POR MODO
  // ==============================

  const handleRowClick = async (curso) => {
    switch (mode) {
      case "ver":
        alert(
          `👁️ Curso: ${curso.nombre}\nDuración: ${curso.duracion}\nCupo: ${curso.cupo}`
        );
        break;

      case "editar": {
        const nuevoNombre = prompt("Nuevo nombre:", curso.nombre);
        if (!nuevoNombre) return;

        const actualizado = cursos.map((c) =>
          c.id === curso.id ? { ...c, nombre: nuevoNombre } : c
        );
        guardarCursos(actualizado);
        alert(`✏️ Curso actualizado correctamente.`);
        break;
      }

      case "eliminar": {
        if (!confirm(`¿Eliminar el curso "${curso.nombre}"?`)) return;
        const nuevo = cursos.filter((c) => c.id !== curso.id);
        guardarCursos(nuevo);
        alert("🗑️ Curso eliminado.");
        break;
      }

      case "inscribir": {
        const userId = localStorage.getItem("userId");
        if (!userId) return alert("⚠️ Usuario no identificado.");

        try {
          // check server-side duplicates
          const q = new URLSearchParams({ userId, cursoId: curso.id });
          const chk = await fetch(`${API_BASE}/inscripciones?${q.toString()}`);
          const existing = await chk.json();
          if (existing && existing.length > 0) return alert("⚠️ Ya estás inscripto en este curso.");
          if (curso.cupo <= 0) return alert("❌ No hay cupos disponibles.");

          const nuevaInscripcion = {
            userId,
            cursoId: curso.id,
            cursoNombre: curso.nombre,
            categoria: curso.categoria,
            duracion: curso.duracion,
            estado: "Activo",
            fecha: new Date().toLocaleDateString(),
          };

          const res = await fetch(`${API_BASE}/inscripciones`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaInscripcion),
          });
          if (!res.ok) throw new Error("Error al crear inscripción");
          const saved = await res.json();

          // Notificar a otras partes de la app que se creó una nueva inscripción
          try {
            window.dispatchEvent(new CustomEvent("inscripcionesChanged", { detail: saved }));
          } catch {
            // ignore dispatch errors
          }

          // decrement cupo on server
          await fetch(`${API_BASE}/cursos/${curso.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cupo: curso.cupo - 1 }),
          });

          // decrement cupo on server
          await fetch(`${API_BASE}/cursos/${curso.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cupo: curso.cupo - 1 }),
          });

          // actualizar estado local basándose en la respuesta del servidor
          const actualizado = cursos.map((c) =>
            c.id === curso.id ? { ...c, cupo: c.cupo - 1 } : c
          );
          setCursos(actualizado);

          alert(`✅ Inscripción exitosa en "${curso.nombre}"`);
        } catch (err) {
          console.error(err);
          alert(err.message || "Error al inscribir");
        }
        break;
      }

      default:
        break;
    }
  };

  const handleAdd = () => {
    (async () => {
      const nombre = prompt("Nombre del curso:");
      if (!nombre) return;

      const categoria = prompt("Categoría del curso:") || "General";
      const duracion = prompt("Duración en meses:") || "Sin especificar";
      const cupo = parseInt(prompt("Cupo inicial:"), 10) || 10;

      const payload = {
        nombre,
        categoria,
        duracion: `${duracion} meses`,
        cupo,
      };

  // intentar persistir en el servidor primero; si falla, usar almacenamiento local como respaldo
      try {
        const res = await fetch(`${API_BASE}/cursos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Error al crear curso en API");
        const saved = await res.json();
        const nuevo = [...cursos, saved];
        setCursos(nuevo);
        alert(`✅ Curso "${saved.nombre}" creado correctamente (guardado en DB).`);
      } catch (err) {
        console.error("Error al crear curso en API:", err);
        alert(
          "No se pudo crear el curso en la API: " + (err?.message || "")
        );
        // No crear localmente: la persistencia debe ser en la API
        return;
      }
    })();
  };

  // ==============================
  // 🧩 RENDER ÚNICO
  // ==============================

  return (
    <section className="student-section">
      <h2 className="section-title">Cursos ({mode.toUpperCase()})</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Duración</th>
            <th>Cupo</th>
            {mode === "eliminar" && <th>Acción</th>}
          </tr>
        </thead>
        <tbody>
          {cursos.length > 0 ? (
            cursos.map((c) => (
              <tr
                key={c.id}
                className={
                  ["ver", "editar", "inscribir"].includes(mode)
                    ? "clickable-row"
                    : ""
                }
                onClick={() =>
                  ["ver", "editar", "inscribir"].includes(mode)
                    ? handleRowClick(c)
                    : null
                }
              >
                <td>{c.nombre}</td>
                <td>{c.categoria}</td>
                <td>{c.duracion}</td>
                <td>{c.cupo}</td>
                {mode === "eliminar" && (
                  <td>
                    <button
                      className="crud-btn"
                      style={{
                        background: "rgba(255,0,0,0.2)",
                        color: "#ff7070",
                      }}
                      onClick={() => handleRowClick(c)}
                    >
                      ❌
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={mode === "eliminar" ? 5 : 4}>
                No hay cursos registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {mode === "crear" && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button className="crud-btn" onClick={handleAdd}>
            ➕ Crear nuevo curso
          </button>
        </div>
      )}

      <p style={{ marginTop: "1.2rem", textAlign: "center", opacity: 0.8 }}>
        {mode === "ver" && "⚪ Modo Visualización"}
        {mode === "inscribir" && "🟢 Modo Inscripción"}
        {mode === "crear" && "🟣 Modo Crear Curso"}
        {mode === "editar" && "🟠 Modo Editar Curso"}
        {mode === "eliminar" && "🔴 Modo Eliminar Curso"}
      </p>
    </section>
  );
};

export default CursosSection;
