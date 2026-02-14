import { create } from "zustand";
import { persist } from "zustand/middleware";

// Store para manejo del usuario autenticado
// Guarda el objeto `user` en localStorage (clave 'peluqueria_auth')
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      // setUser recibe el objeto user (por ejemplo { id, nombre, token })
      setUser: (user) => set({ user }),
      // actualiza parcialmente el user
      updateUser: (patch) => set({ user: { ...(get().user || {}), ...patch } }),
      logout: () => set({ user: null })
    }),
    {
      name: "peluqueria_auth",
      // Opcional: serializar solo lo necesario
      partialize: (state) => ({ user: state.user })
    }
  )
);

export const selectUser = (state) => state.user;
export const selectIsLogged = (state) => Boolean(state.user);

export default useAuthStore;
