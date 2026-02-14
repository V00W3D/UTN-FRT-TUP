const conn = require("../config/db");

const ProfesionalesController = {
  /* =======================================================
     📋 Listar profesionales
  ======================================================= */
  async ListarProfesionales(req, res) {
    const { especialidad } = req.query;
    let query = `
      SELECT u.UserID, u.Nombre, e.Nombre AS Especialidad
      FROM Usuarios u
      LEFT JOIN Especialidades e ON e.EspecialidadID = u.EspecialidadID
      WHERE u.RolID = 3
    `;
    const params = [];

    if (especialidad) {
      query += " AND u.EspecialidadID = ?";
      params.push(especialidad);
    }

    conn.query(query, params, (err, results) => {
      if (err) {
        console.log("[Profesionales] Error al listar profesionales:\n", err);
        return res.json({
          ok: false,
          message: "Error al obtener profesionales.",
        });
      }
      res.json({ ok: true, data: results });
    });
  },

  /* =======================================================
     ➕ Agregar profesional
  ======================================================= */
  async AgregarProfesional(req, res) {
    const { nombre, correo, telefono, especialidadID, imagen, contraseña } =
      req.body;

    if (!nombre || !correo || !telefono || !especialidadID || !contraseña) {
      return res.json({
        ok: false,
        message: "Todos los campos son obligatorios.",
      });
    }

    const query = `
      INSERT INTO Usuarios (Correo, Nombre, RolID, EspecialidadID, Imagen, Contraseña, Teléfono)
      VALUES (?, ?, 3, ?, ?, ?, ?)
    `;
    const params = [
      correo,
      nombre,
      especialidadID,
      imagen || "",
      contraseña,
      telefono,
    ];

    conn.query(query, params, (err, result) => {
      if (err) {
        console.log("[Profesionales] Error al agregar profesional:\n", err);
        return res.json({
          ok: false,
          message: "Error al agregar profesional.",
        });
      }

      res.json({
        ok: true,
        message: "Profesional agregado correctamente.",
        data: { id: result.insertId, nombre, correo, telefono, especialidadID },
      });
    });
  },
};

module.exports = ProfesionalesController;
