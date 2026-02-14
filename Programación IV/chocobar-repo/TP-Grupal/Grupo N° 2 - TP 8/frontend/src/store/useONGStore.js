import { create } from "zustand";

export const useONGStore = create((set) => ({
  info: {
    nombre: "Organización Sin Fines de Lucro",
    email: "contacto@ong.org",
    direccion: "Av. Solidaridad 123, Buenos Aires",
  },

  ui: {
    online: true,
    mantenimiento: false,
  },

  setInfo: (info) => set({ info }),
  setUI: (newUI) =>
    set((state) => ({
      ui: { ...state.ui, ...newUI },
    })),
}));
