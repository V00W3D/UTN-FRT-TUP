import { create } from "zustand";

export const useAdminUIStore = create((set) => ({
  section: "cursos", // cursos | alumnos | inscripciones
  mode: "ver", // ver | crear | editar | eliminar

  setSection: (section) => set({ section }),
  setMode: (mode) => set({ mode }),
}));
