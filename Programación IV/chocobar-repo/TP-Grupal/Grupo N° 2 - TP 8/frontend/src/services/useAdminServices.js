import { ApiService } from "./api";

/**
 * 🧑‍💼 Servicios del Panel de Administración
 * CRUD de usuarios, beneficiarios, donaciones y entregas.
 */
export const useAdminServices = {
  /* =======================================================
     👥 USUARIOS
  ======================================================= */
  async getUsuarios() {
    return await ApiService.getAll("usuarios");
  },

  async createUsuario(formData) {
    const nuevo = { ...formData, id: crypto.randomUUID() };
    return await ApiService.create("usuarios", nuevo);
  },

  async updateUsuario(id, formData) {
    return await ApiService.update("usuarios", id, formData);
  },

  async deleteUsuario(id) {
    return await ApiService.delete("usuarios", id);
  },

  /* =======================================================
     🎁 DONACIONES
  ======================================================= */
  async getDonaciones() {
    return await ApiService.getAll("donaciones");
  },

  async updateDonacion(id, formData) {
    return await ApiService.update("donaciones", id, formData);
  },

  async createEntregaFromDonacion(donacion, beneficiarioId, responsableId) {
    const nuevaEntrega = {
      id: crypto.randomUUID(),
      donacionId: donacion.id,
      beneficiarioId,
      cantidad_entregada: donacion.cantidad,
      fecha_entrega: new Date().toISOString().split("T")[0],
      responsableId,
      confirmada: true,
    };
    return await ApiService.create("entregas", nuevaEntrega);
  },

  /* =======================================================
     🧍 BENEFICIARIOS
  ======================================================= */
  async getBeneficiarios() {
    return await ApiService.getAll("beneficiarios");
  },
  async createBeneficiario(formData) {
    const nuevo = { ...formData, id: crypto.randomUUID() };
    return await ApiService.create("beneficiarios", nuevo);
  },

  async updateBeneficiario(id, formData) {
    return await ApiService.update("beneficiarios", id, formData);
  },

  async deleteBeneficiario(id) {
    return await ApiService.delete("beneficiarios", id);
  },

  /* =======================================================
     📦 ENTREGAS
  ======================================================= */
  async getEntregas() {
    return await ApiService.getAll("entregas");
  },

  async updateEntrega(id, formData) {
    return await ApiService.update("entregas", id, formData);
  },
};
