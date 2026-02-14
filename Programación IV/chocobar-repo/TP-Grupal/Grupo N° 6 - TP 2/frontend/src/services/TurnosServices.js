import api from "../api";

export const TurnosService = {
  /**
   * 📅 Crear un nuevo turno
   * @param {Object} data
   * @param {string} data.Fecha
   * @param {number} data.EspecialidadID
   * @param {number} data.ProfesionalID
   * @param {number=} data.PacienteID (opcional, se fuerza desde el token si es paciente)
   */
  async crearTurno(data) {
    try {
      const token = localStorage.getItem("cupcake");
      if (!token) return { ok: false, message: "Token no encontrado" };

      // 🔧 Normalizamos los datos antes de enviarlos
      const normalizedData = {
        ...data,
        EspecialidadID: Number(data.EspecialidadID),
        ProfesionalID: Number(data.ProfesionalID),
        PacienteID: data.PacienteID ? Number(data.PacienteID) : undefined,
      };

      const res = await api.post("/turnos/crear", normalizedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return res.data;
    } catch (err) {
      console.error("🕹️[TurnosService] Error al crear turno:", err);
      return { ok: false, message: "Error al crear el turno" };
    }
  },
  /**
   * ❌ Cancelar un turno por ID
   * @param {number} TurnoID
   */
  async cancelarTurno(TurnoID) {
    try {
      const token = localStorage.getItem("cupcake");
      if (!token) return { ok: false, message: "Token no encontrado" };

      const res = await api.put(`/turnos/cancelar/${TurnoID}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (err) {
      console.error("🕹️[TurnosService] Error al cancelar turno:", err);
      return { ok: false, message: "Error al cancelar el turno" };
    }
  },

  /**
   * 🔍 Consultar turnos (por fecha o paciente, si es admin)
   * @param {Object} filtros
   * @param {string=} filtros.fecha
   * @param {string=} filtros.paciente
   */
  async consultarTurnos(filtros = {}) {
    try {
      const token = localStorage.getItem("cupcake");
      if (!token) return { ok: false, message: "Token no encontrado" };

      const res = await api.get("/turnos/consultar", {
        params: filtros,
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (err) {
      console.error("🕹️[TurnosService] Error al consultar turnos:", err);
      return { ok: false, message: "Error al consultar turnos" };
    }
  },
};
