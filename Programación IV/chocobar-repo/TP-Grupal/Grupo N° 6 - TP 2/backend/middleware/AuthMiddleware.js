const { z } = require("zod");

// =====================================================
// 🧱 AUTH MIDDLEWARE
// =====================================================
const AuthMiddleware = {
  // Validación de login
  Login: (req, res, next) => {
    const schema = z.object({
      nombre: z.string().min(1, "El nombre es obligatorio"),
      contraseña: z.string().min(1, "La contraseña es obligatoria"),
    });

    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        ok: false,
        message: "Datos inválidos en el inicio de sesión",
        errors: result.error.errors.map((e) => e.message),
      });
    }

    next();
  },

  // Validación de registro
  Register: (req, res, next) => {
    const schema = z.object({
      nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
      contraseña: z.string().min(4, "La contraseña es demasiado corta"),
      correo: z.string().email("Correo inválido"),
      telefono: z
        .string()
        .regex(/^\+?\d{7,15}$/, "Teléfono inválido (mínimo 7 dígitos)"),
      imagen: z.string().url("La imagen debe ser una URL válida").optional(),
      fechanacimiento: z.string().optional(),
    });

    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        ok: false,
        message: "Datos inválidos en el registro",
        errors: result.error.errors.map((e) => e.message),
      });
    }

    next();
  },
};

module.exports = AuthMiddleware;
