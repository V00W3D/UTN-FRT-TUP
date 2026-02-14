import { ApiService } from "./api";

/**
 * 🧍‍♂️ Servicios del Usuario (Visitante / Donante)
 * Incluye consultas de perfil, donaciones, historial, etc.
 */
export const useUserServices = {
  /**
   * 🪪 Obtiene los datos del usuario actualmente logueado
   * (desde localStorage o backend)
   */
  async getProfile() {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    if (!usuario?.id) throw new Error("No hay usuario logueado");

    return await ApiService.getById("usuarios", usuario.id);
  },

  /**
   * 🎁 Obtiene todas las campañas o proyectos disponibles para donar
   */
  async getCampañas() {
    return await ApiService.getAll("beneficiarios");
  },

  /**
   * 💰 Realiza una donación
   * Registra el monto, fecha y campaña seleccionada.
   */
  async donar(usuarioId, campañaId, formData) {
    const nuevaDonacion = {
      usuarioId,
      campañaId,
      ...formData,
      fecha: new Date().toISOString(),
    };

    return await ApiService.create("donaciones", nuevaDonacion);
  },

  /**
   * 📜 Obtiene el historial de donaciones del usuario
   */
  async getHistorialDonaciones(usuarioId) {
    const data = await ApiService.getAll("donaciones");
    return data.filter((d) => d.usuarioId === usuarioId);
  },

  /**
   * ✉️ Envía un mensaje o consulta a la ONG
   */
  async enviarMensaje(usuarioId, asunto, mensaje) {
    const nuevoMensaje = {
      usuarioId,
      asunto,
      mensaje,
      fecha: new Date().toISOString(),
    };

    return await ApiService.create("mensajes", nuevoMensaje);
  },
};
