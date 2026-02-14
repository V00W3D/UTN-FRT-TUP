import api from "../api";

export const AuthServices = {
  /**
   * 🧠 Iniciar sesión
   * @param {string} nombre
   * @param {string} contraseña
   */
  async login({ nombre, contraseña }) {
    try {
      const res = await api.post("/auth/login", { nombre, contraseña });
      if (res.data.ok) {
        const { cupcake, cake } = res.data.desserts || {};
        if (cupcake) localStorage.setItem("cupcake", cupcake);
        if (cake) localStorage.setItem("cake", cake);
      }
      return res.data;
    } catch (err) {
      console.error("🕹️[AuthServices] Login error:", err);
      return { ok: false, message: "Error en el login" };
    }
  },

  /**
   * 🧾 Registrar nuevo usuario (paciente)
   */
  async register({
    nombre,
    contraseña,
    correo,
    telefono,
    imagen,
    fechanacimiento,
  }) {
    try {
      const res = await api.post("/auth/register", {
        nombre,
        contraseña,
        correo,
        telefono,
        imagen,
        fechanacimiento,
      });
      return res.data;
    } catch (err) {
      console.error("🕹️[AuthServices] Register error:", err);
      return { ok: false, message: "Error en el registro" };
    }
  },

  /**
   * 🚪 Cerrar sesión
   */
  async logout() {
    try {
      const res = await api.post("/auth/logout");
      if (res.data.ok) {
        localStorage.removeItem("cupcake");
        localStorage.removeItem("cake");
      }
      return res.data;
    } catch (err) {
      console.error("🕹️[AuthServices] Logout error:", err);
      return { ok: false, message: "Error al cerrar sesión" };
    }
  },

  /**
   * 🍰 Obtener datos del usuario actual usando el token
   */
  async Me() {
    try {
      // Buscar el token guardado
      const token =
        localStorage.getItem("cupcake") || localStorage.getItem("cake");

      if (!token) {
        return { ok: false, message: "No se encontró token" };
      }

      // Enviar token al backend
      const res = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      console.error("🕹️[AuthServices] Me error:", err);
      return { ok: false, message: "Error al verificar sesión" };
    }
  },
};
