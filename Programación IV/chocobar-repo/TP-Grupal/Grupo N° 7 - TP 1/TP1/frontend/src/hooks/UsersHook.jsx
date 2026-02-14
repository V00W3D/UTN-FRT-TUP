// 📁 src/hooks/UsersHook.ts
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(0);

  // Obtener usuarios desde la API falsa; no usar respaldo en localStorage
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/users`);
        if (!res.ok) throw new Error("no ok");
        const data = await res.json();
        if (mounted) setUsers(data);
      } catch (err) {
        // No usar localStorage como respaldo: informar al usuario y dejar la lista vacía
        console.error("UsersHook load error:", err);
        try {
          alert(
            "No se pudieron cargar los usuarios desde la API. Asegúrate de iniciar el servidor de la API."
          );
        } catch {
          if (mounted) setUsers([]);
        }
      }
    };

    load();

    // Escuchar cambios (opcional)
    const handleChange = () => setRefresh((r) => r + 1);
    window.addEventListener("usersChanged", handleChange);
    return () => {
      mounted = false;
      window.removeEventListener("usersChanged", handleChange);
    };
  }, [refresh]);

  return { users };
};
