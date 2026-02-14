import { useCursos } from "../../hooks/CursosHook";
import { useStudentUIStore } from "../../store/StudentUIStore";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const CursosSection = () => {
  const { cursos, updateCurso, reloadCursos } = useCursos(); // 👈 agregamos hooks extra
  const { mode } = useStudentUIStore();

  const handleCursoClick = async (curso) => {
    if (mode === "inscribir") {
      const userId = localStorage.getItem("userId");

      try {
        // Verificar inscripción existente en el servidor
        const q = new URLSearchParams({ userId, cursoId: curso.id });
        const resCheck = await fetch(`${API_BASE}/inscripciones?${q.toString()}`);
        const exists = await resCheck.json();
        if (exists && exists.length > 0) {
          alert("⚠️ Ya estás inscripto en este curso.");
          return;
        }

        // Verificar cupo disponible en el servidor
        if (curso.cupo <= 0) {
          alert("❌ No hay cupos disponibles en este curso.");
          return;
        }

        // Crear inscripción en el servidor
        const nueva = {
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
          body: JSON.stringify(nueva),
        });
        if (!res.ok) throw new Error("Error al crear inscripción en el servidor");

        const saved = await res.json();

        try {
          window.dispatchEvent(new CustomEvent("inscripcionesChanged", { detail: saved }));
        } catch {
          // ignora errores
        }

        await fetch(`${API_BASE}/cursos/${curso.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cupo: curso.cupo - 1 }),
        });

        // Actualizar UI local basándose en la confirmación del servidor
        updateCurso(curso.id, { cupo: curso.cupo - 1 });
        reloadCursos();

        alert(`✅ Inscripción exitosa al curso: ${curso.nombre}`);
      } catch (err) {
        console.error(err);
        alert(err.message || "Error al inscribir");
      }
    } else if (mode === "ver") {
      alert(`👁️ Curso: ${curso.nombre}\nDuración: ${curso.duracion}`);
    }
  };

  return (
    <section className="student-section">
      <h2 className="section-title">Cursos disponibles</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Duración</th>
            <th>Cupo</th>
          </tr>
        </thead>
        <tbody>
          {cursos.length > 0 ? (
            cursos.map((c) => (
              <tr
                key={c.id}
                className="clickable-row"
                onClick={() => handleCursoClick(c)}
              >
                <td>{c.nombre}</td>
                <td>{c.categoria}</td>
                <td>{c.duracion}</td>
                <td>{c.cupo}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No hay cursos registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        {mode === "inscribir" && "🟢 Modo Inscribir activo"}
        {mode === "ver" && "⚪ Modo Visualización"}
      </p>
    </section>
  );
};

export default CursosSection;
