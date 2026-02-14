// src/store/usePageStore.js
import { create } from "zustand";

export const usePageStore = create((set) => ({
  page: "auth",
  setPage: (page) => set({ page }),
}));
