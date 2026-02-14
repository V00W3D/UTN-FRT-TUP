// src/store/useAuthStore.js
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: {
    cupcake: localStorage.getItem("cupcake") || null,
    cake: localStorage.getItem("cake") || null,
  },

  // ✅ Setear usuario
  setUser: (user) => set({ user }),

  // ✅ Setear tokens
  setToken: (token) => set({ token }),

  // ✅ Limpiar sesión completa
  clearAuth: () =>
    set(() => {
      localStorage.removeItem("cupcake");
      localStorage.removeItem("cake");
      return { user: null, token: null };
    }),
}));
