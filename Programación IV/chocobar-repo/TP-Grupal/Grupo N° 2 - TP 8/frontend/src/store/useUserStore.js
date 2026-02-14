import { create } from "zustand";

export const useUserStore = create((set) => ({
  perfil: null,
  campañas: [],
  donaciones: [],
  ui: { loading: false, error: null },

  setPerfil: (perfil) => set({ perfil }),
  setCampañas: (campañas) => set({ campañas }),
  setDonaciones: (donaciones) => set({ donaciones }),
  setUI: (ui) => set((state) => ({ ui: { ...state.ui, ...ui } })),
}));
