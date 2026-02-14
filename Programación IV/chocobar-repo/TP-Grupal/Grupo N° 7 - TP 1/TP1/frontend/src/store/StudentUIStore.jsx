// src/store/useStudentUIStore.js
import { create } from "zustand";

export const useStudentUIStore = create((set) => ({
  section: "cursos", // cursos | inscribir | misinscripciones
  setSection: (section) => set({ section }),
  mode: "ver", // ver | añadir | editar | eliminar
  setMode: (mode) => set({ mode }),
}));
