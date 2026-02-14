import { useEffect, useState } from "react";

export const useCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [refresh, setRefresh] = useState(0); // 👈 Forzar recarga manual

  // ======================================================
  // 🧩 CARGA INICIAL + REFRESH
  // ======================================================
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cursos"));
    if (!stored) {
      const defaultCursos = [
        {
          id: 1,
          nombre: "Programación 1",
          categoria: "Programación",
          duracion: "3 meses",
          cupo: 10,
        },
        {
          id: 2,
          nombre: "Programación 2",
          categoria: "Programación",
          duracion: "4 meses",
          cupo: 8,
        },
        {
          id: 3,
          nombre: "Diseño Web",
          categoria: "Frontend",
          duracion: "2 meses",
          cupo: 12,
        },
        {
          id: 4,
          nombre: "Bases de Datos",
          categoria: "Backend",
          duracion: "3 meses",
          cupo: 9,
        },
        {
          id: 5,
          nombre: "Programación 4",
          categoria: "Avanzado",
          duracion: "5 meses",
          cupo: 10,
        },
      ];
      localStorage.setItem("cursos", JSON.stringify(defaultCursos));
      setCursos(defaultCursos);
      const handleChange = () => setRefresh((r) => r + 1);
      window.addEventListener("cursosChanged", handleChange);
      return () => window.removeEventListener("cursosChanged", handleChange);
    } else {
      setCursos(stored);
    }
  }, [refresh]); // 👈 se ejecuta cada vez que cambie "refresh"

  // ======================================================
  // 🔄 FUNCIÓN PARA REFRESCAR MANUALMENTE
  // ======================================================
  const reloadCursos = () => setRefresh((r) => r + 1);

  // ======================================================
  // ➕ AGREGAR CURSO
  // ======================================================
  const addCurso = (nuevoCurso) => {
    const updated = [...cursos, nuevoCurso];
    setCursos(updated);
    localStorage.setItem("cursos", JSON.stringify(updated));
  };

  // ======================================================
  // ❌ ELIMINAR CURSO
  // ======================================================
  const removeCurso = (id) => {
    const updated = cursos.filter((c) => c.id !== id);
    setCursos(updated);
    localStorage.setItem("cursos", JSON.stringify(updated));
  };

  // ======================================================
  // 🔄 ACTUALIZAR CURSO
  // ======================================================
  const updateCurso = (id, data) => {
    const updated = cursos.map((c) => (c.id === id ? { ...c, ...data } : c));
    setCursos(updated);
    localStorage.setItem("cursos", JSON.stringify(updated));
  };

  return { cursos, addCurso, removeCurso, updateCurso, reloadCursos };
};
