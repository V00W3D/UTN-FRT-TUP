const { z } = require("zod");
// =====================================================
// 🧱 TURNOS MIDDLEWARE
// =====================================================
const TurnosMiddleware = {
  CrearTurno: (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        ok: false,
        message: "No se recibieron datos en el cuerpo de la solicitud.",
      });
    }

    const schema = z.object({
      Fecha: z.string().min(1, "Debe especificar la fecha del turno"),
      EspecialidadID: z
        .number({ invalid_type_error: "Debe ser un número" })
        .int()
        .positive(),
      ProfesionalID: z
        .number({ invalid_type_error: "Debe ser un número" })
        .int()
        .positive(),
      PacienteID: z
        .number({ invalid_type_error: "Debe ser un número" })
        .int()
        .positive()
        .optional(),
    });

    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        ok: false,
        message: "Datos inválidos para crear turno",
        errors: result.error?.errors?.map((e) => e.message) || [
          "Error desconocido al validar datos.",
        ],
      });
    }

    next();
  },
  CancelarTurno: (req, res, next) => {
    const schema = z.object({
      TurnoID: z
        .string()
        .regex(/^\d+$/, "El TurnoID debe ser numérico")
        .transform((val) => parseInt(val, 10)),
    });

    const result = schema.safeParse(req.params);
    if (!result.success) {
      return res.status(400).json({
        ok: false,
        message: "Parámetros inválidos al cancelar turno",
        errors: result.error.errors.map((e) => e.message),
      });
    }

    req.params.TurnoID = result.data.TurnoID;
    next();
  },

  ConsultarTurnos: (req, res, next) => {
    const schema = z.object({
      fecha: z.date().optional(),
      paciente: z.string().optional(),
    });

    const result = schema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({
        ok: false,
        message: "Parámetros inválidos en la consulta de turnos",
        errors: result.error.errors.map((e) => e.message),
      });
    }

    next();
  },
};

module.exports = TurnosMiddleware;
