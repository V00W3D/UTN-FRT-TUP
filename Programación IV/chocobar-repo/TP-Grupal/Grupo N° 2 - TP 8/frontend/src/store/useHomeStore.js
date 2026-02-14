import { create } from "zustand";

export const useHomeStore = create((set) => ({
  // Estado de la interfaz Home
  homeMode: "inicio", // vista inicial
  ui: {
    loading: false,
    error: null,
  },

  // Funciones
  setHomeMode: (mode) => set({ homeMode: mode }),

  setUI: (newUI) =>
    set((state) => ({
      ui: { ...state.ui, ...newUI },
    })),
}));
