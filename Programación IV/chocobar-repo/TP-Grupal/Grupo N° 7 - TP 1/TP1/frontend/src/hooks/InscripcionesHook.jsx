export const InscripcionesHook = {
  getAll() {
    return JSON.parse(localStorage.getItem("inscripciones")) || [];
  },

  add(inscripcion) {
    const inscripciones = this.getAll();
    inscripciones.push(inscripcion);
    localStorage.setItem("inscripciones", JSON.stringify(inscripciones));
  },

  inscribirAlumno(idAlumno, idCurso) {
    const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
    const inscripciones = this.getAll();

    const curso = cursos.find((c) => c.id === idCurso);
    const alumno = alumnos.find((a) => a.id === idAlumno);

    if (!curso || !alumno) {
      alert("Alumno o curso no encontrado.");
      return;
    }

    const yaInscripto = inscripciones.some(
      (i) => i.idAlumno === idAlumno && i.idCurso === idCurso
    );
    if (yaInscripto) {
      alert("El alumno ya está inscripto en este curso.");
      return;
    }

    if (curso.cupo <= 0) {
      alert("No hay cupos disponibles.");
      return;
    }

    // Crear inscripción
    const nuevaInscripcion = {
      id: Date.now(),
      idAlumno,
      idCurso,
      fecha: new Date().toLocaleDateString(),
    };

    inscripciones.push(nuevaInscripcion);
    localStorage.setItem("inscripciones", JSON.stringify(inscripciones));

    // Reducir cupo
    curso.cupo -= 1;
    localStorage.setItem("cursos", JSON.stringify(cursos));

    // 🚀 Disparar evento para avisar al hook que se refresque
    window.dispatchEvent(new CustomEvent("cursosChanged"));

    alert(`✅ ${alumno.nombre} se inscribió en ${curso.nombre}`);
  },
};
