// src/hooks/useAuthUIStore.js
import { create } from "zustand";

export const useAuthUIStore = create((set) => ({
  formMode: "login", // "login" o "register"

  setFormMode: (mode) => set({ formMode: mode }),
  toggleMode: () =>
    set((state) => ({
      formMode: state.formMode === "login" ? "register" : "login",
    })),
}));
