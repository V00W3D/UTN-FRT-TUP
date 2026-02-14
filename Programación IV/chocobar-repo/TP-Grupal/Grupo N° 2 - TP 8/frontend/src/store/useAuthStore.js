import { create } from "zustand";

export const useAuthStore = create((set) => ({
  // Datos del usuario
  usuario: null,

  // Estado de interfaz
  ui: {
    loading: false,
    error: null,
  },

  // Modo actual del AuthLayout (login / register)
  authMode: "login",

  // ======== Funciones ========

  setUsuario: (usuario) => set({ usuario }),
  clearUsuario: () => set({ usuario: null }),

  setUI: (newUI) =>
    set((state) => ({
      ui: { ...state.ui, ...newUI },
    })),

  setAuthMode: (mode) => set({ authMode: mode }),
}));
