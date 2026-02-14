import { create } from "zustand";

export const useAdminHomeStore = create((set) => ({
  // Estado del panel de administración
  adminMode: "dashboard", // vista inicial del home admin
  ui: {
    loading: false,
    error: null,
  },

  // Funciones de control de interfaz
  setAdminMode: (mode) => set({ adminMode: mode }),

  setUI: (newUI) =>
    set((state) => ({
      ui: { ...state.ui, ...newUI },
    })),
}));
