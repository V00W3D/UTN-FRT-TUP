// src/hooks/RegisterHook.js
// Ahora usa json-server (API falsa) en http://localhost:4000
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const useRegister = () => {
  const register = async (newUser) => {
    try {
      // check if correo already exists
      const q = new URLSearchParams({ correo: newUser.correo });
      const resCheck = await fetch(`${API_BASE}/users?${q.toString()}`);
      const found = await resCheck.json();
      if (found && found.length > 0) {
        return { ok: false, message: "El correo ya está registrado." };
      }

      // determine role (if there are no users, first becomes admin)
      const resAll = await fetch(`${API_BASE}/users`);
      const all = await resAll.json();
      const role = (Array.isArray(all) && all.length === 0) ? "admin" : "user";

      const userToSave = { ...newUser, role };

      // POST to the fake server; json-server will add an `id`
      const res = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userToSave),
      });

      if (!res.ok) {
        return { ok: false, message: "Error al guardar el usuario en la base de datos." };
      }

      const saved = await res.json();

      // keep a quick reference locally for current session if needed
      // store the json-server assigned id (string) for consistency
      try {
        localStorage.setItem("userId", String(saved.id ?? saved.dni ?? ""));
      } catch {
        // ignore storage errors
      }

      return { ok: true, user: saved };
    } catch (err) {
      console.error("Register error:", err);
      // Avisar al usuario que la operación falló por red/servidor
      try {
        alert("Error de conexión al registrar: " + (err?.message || err));
      } catch {
      return { ok: false, message: "Error de conexión al registrar." };
      }
    }
  };

  return { register };
};

export default useRegister;
