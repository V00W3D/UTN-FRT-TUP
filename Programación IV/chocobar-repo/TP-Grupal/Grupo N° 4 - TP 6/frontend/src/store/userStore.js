import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  token: null,
  setAuth: ({ user, token }) => set({ user, token }),
  clearAuth: () => set({ user: null, token: null }),
}));
