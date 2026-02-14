import { create } from "zustand";

export const useAdminStore = create((set) => ({
  // Datos principales del panel admin
  usuarios: [],
  donaciones: [],
  beneficiarios: [],
  entregas: [],
  ui: { loading: false, error: null },

  // Setters
  setUsuarios: (usuarios) => set({ usuarios }),
  setDonaciones: (donaciones) => set({ donaciones }),
  setBeneficiarios: (beneficiarios) => set({ beneficiarios }),
  setEntregas: (entregas) => set({ entregas }),

  // Control UI
  setUI: (ui) =>
    set((state) => ({
      ui: { ...state.ui, ...ui },
    })),
}));
