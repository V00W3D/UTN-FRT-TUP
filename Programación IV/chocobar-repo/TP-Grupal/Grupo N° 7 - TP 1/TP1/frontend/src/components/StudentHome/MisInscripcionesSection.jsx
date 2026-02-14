import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const MisInscripcionesSection = () => {
  const [misInscripciones, setMisInscripciones] = useState([]);

  useEffect(() => {
    const load = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const params = new URLSearchParams({ userId });
        const res = await fetch(`${API_BASE}/inscripciones?${params.toString()}`);
        if (!res.ok) throw new Error("Error al obtener inscripciones");
        const data = await res.json();
        setMisInscripciones(data);
      } catch (err) {
        console.error("MisInscripciones load error:", err);
        try {
          alert(
            "No se pudieron obtener las inscripciones desde la API. Asegúrate de iniciar el servidor de la API."
          );
        } catch {
          // ignora errores
        }
        setMisInscripciones([]);
      }
    };
    load();

    const handleInscripcionesChanged = () => {
      load();
    };
    window.addEventListener("inscripcionesChanged", handleInscripcionesChanged);

    return () => {
      window.removeEventListener("inscripcionesChanged", handleInscripcionesChanged);
    };
  }, []);

  return (
    <section className="student-section">
      <h2 className="section-title">Mis inscripciones</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>Curso</th>
            <th>Categoría</th>
            <th>Duración</th>
            <th>Estado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {misInscripciones.length > 0 ? (
            misInscripciones.map((i, idx) => (
              <tr key={idx}>
                <td>{i.cursoNombre}</td>
                <td>{i.categoria}</td>
                <td>{i.duracion}</td>
                <td>{i.estado}</td>
                <td>{i.fecha}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No tenés inscripciones aún
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default MisInscripcionesSection;
