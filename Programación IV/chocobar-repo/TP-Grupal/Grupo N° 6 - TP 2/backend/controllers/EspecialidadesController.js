const conn = require("../config/db");

const EspecialidadesController = {
  async ListarEspecialidades(_req, res) {
    const query = "SELECT EspecialidadID, Nombre FROM Especialidades";

    conn.query(query, (err, results) => {
      if (err) {
        console.log("[Especialidades] Error al listar especialidades:\n", err);
        return res.json({
          ok: false,
          message: "Error al obtener especialidades.",
        });
      }
      res.json({ ok: true, data: results });
    });
  },
};

module.exports = EspecialidadesController;
