// src/controllers/TurnosController.js
const conn = require("../config/db");

const TurnosController = {
  // =========================================================
  // Crear un nuevo turno
  // =========================================================
  async CrearTurno(req, res) {
    const { isTasty, UserID, RolID } = req.context || {};
    if (!isTasty || !UserID) {
      return res.json({
        ok: false,
        message: "Token inválido o sesión expirada.",
      });
    }

    const { Fecha, EspecialidadID, ProfesionalID, PacienteID } = req.body;

    if (!Fecha || !EspecialidadID || !ProfesionalID) {
      return res.json({
        ok: false,
        message: "Faltan datos requeridos para registrar el turno.",
      });
    }

    // si es paciente, el PacienteID se fuerza al del token
    let pacienteFinal = PacienteID;
    if (RolID === 2) pacienteFinal = UserID; // 2 = paciente
    if (!pacienteFinal)
      return res.json({
        ok: false,
        message: "No se especificó el paciente del turno.",
      });

    const query = `
      INSERT INTO Turnos (Fecha, EspecialidadID, ProfesionalID, PacienteID)
      VALUES (?, ?, ?, ?)
    `;

    conn.query(
      query,
      [Fecha, EspecialidadID, ProfesionalID, pacienteFinal],
      (err, results) => {
        if (err) {
          console.log("🕹️[Turnos] Error al crear turno:\n", err);
          return res.json({
            ok: false,
            message: err.sqlMessage || "Error al registrar el turno.",
          });
        }

        res.json({
          ok: true,
          message: "[ ✓ ]Turno registrado correctamente",
          TurnoID: results.insertId,
        });
      }
    );
  },

  // =========================================================
  // Cancelar turno
  // =========================================================
  async CancelarTurno(req, res) {
    const { isTasty, UserID, RolID } = req.context || {};
    if (!isTasty || !UserID) {
      return res.json({
        ok: false,
        message: "Token inválido o sesión expirada.",
      });
    }

    const { TurnoID } = req.params;
    if (!TurnoID)
      return res.json({
        ok: false,
        message: "Debe especificar el ID del turno.",
      });

    // Primero verificamos si el turno le pertenece o es admin
    const checkQuery = `
      SELECT PacienteID, ProfesionalID, Estado
      FROM Turnos
      WHERE TurnoID = ?
    `;

    conn.query(checkQuery, [TurnoID], (err, results) => {
      if (err) {
        console.log("🕹️[Turnos] Error al buscar turno:\n", err);
        return res.json({ ok: false, message: "Error al buscar el turno." });
      }

      if (!results.length) {
        return res.json({ ok: false, message: "El turno no existe." });
      }

      const turno = results[0];

      // Permitir cancelar solo si:
      const esPropietario =
        turno.PacienteID === UserID || turno.ProfesionalID === UserID;
      const esAdmin = RolID === 1; // admin
      if (!esAdmin && !esPropietario) {
        return res.json({
          ok: false,
          message: "No tiene permisos para cancelar este turno.",
        });
      }

      if (turno.Estado === "cancelado") {
        return res.json({
          ok: false,
          message: "El turno ya estaba cancelado.",
        });
      }

      // Cancelar turno
      const cancelQuery = `
        UPDATE Turnos
        SET Estado = 'cancelado'
        WHERE TurnoID = ?
      `;

      conn.query(cancelQuery, [TurnoID], (err2) => {
        if (err2) {
          console.log("🕹️[Turnos] Error al cancelar turno:\n", err2);
          return res.json({
            ok: false,
            message: "Error al cancelar el turno.",
          });
        }

        res.json({ ok: true, message: "[ ✓ ]Turno cancelado correctamente" });
      });
    });
  },

  // =========================================================
  // Consultar turnos
  // =========================================================
  async ConsultarTurnos(req, res) {
    const { isTasty, UserID, RolID } = req.context || {};
    if (!isTasty || !UserID) {
      return res.json({
        ok: false,
        message: "Token inválido o sesión expirada.",
      });
    }

    const { fecha, paciente } = req.query;

    // Si no es admin, filtra solo sus propios turnos
    let filtroNombre = paciente || null;
    if (RolID === 2) {
      // paciente → ver solo los suyos
      filtroNombre = null;
    }

    const query = `CALL sp_consultar_turnos(?, ?)`;

    conn.query(query, [fecha || null, filtroNombre], (err, results) => {
      if (err) {
        console.log("🕹️[Turnos] Error al consultar turnos:\n", err);
        return res.json({
          ok: false,
          message: "Error al consultar los turnos.",
        });
      }

      const turnos = results[0];

      // Si es paciente o profesional, filtramos solo los suyos
      let filtrados = turnos;
      if (RolID === 2) {
        filtrados = turnos.filter((t) => t.Paciente === req.context.Nombre);
      } else if (RolID === 3) {
        filtrados = turnos.filter((t) => t.Profesional === req.context.Nombre);
      }

      res.json({
        ok: true,
        message: "[ ✓ ]Consulta de turnos exitosa",
        data: filtrados,
      });
    });
  },
};

module.exports = TurnosController;
