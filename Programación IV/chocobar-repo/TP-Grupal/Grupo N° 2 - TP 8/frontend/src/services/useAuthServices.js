import { ApiService } from "./api";

export const useAuthServices = {
  /**
   * 🔐 Inicia sesión
   * Busca usuario por email y contraseña en la base de datos.
   */
  login: async (email, contraseña) => {
    const users = await ApiService.getAll("usuarios");
    const found = users.find(
      (u) => u.email === email && u.contraseña === contraseña
    );

    if (!found) throw new Error("Credenciales incorrectas");

    localStorage.setItem("usuario", JSON.stringify(found));
    return found;
  },

  /**
   * 🧾 Registro de usuario
   * Crea un nuevo usuario en la base de datos si el email no existe.
   */
  register: async (nombre, email, contraseña, rol = "colaborador") => {
    const users = await ApiService.getAll("usuarios");
    const exists = users.some((u) => u.email === email);

    if (exists) throw new Error("El correo ya está registrado");

    const nuevoUsuario = {
      nombre,
      email,
      contraseña,
      rol,
    };

    const created = await ApiService.create("usuarios", nuevoUsuario);
    localStorage.setItem("usuario", JSON.stringify(created));
    return created;
  },

  /**
   * 🚪 Cierra la sesión
   */
  logout: () => {
    localStorage.removeItem("usuario");
    return true;
  },

  /**
   * 🧩 Obtiene el usuario actualmente logueado
   */
  getUsuario: () => {
    const data = localStorage.getItem("usuario");
    return data ? JSON.parse(data) : null;
  },

  /**
   * 🧠 Obtiene el rol del usuario actual
   */
  getRol: () => {
    const usuario = useAuthServices.getUsuario();
    return usuario?.rol || "visitante";
  },
};
