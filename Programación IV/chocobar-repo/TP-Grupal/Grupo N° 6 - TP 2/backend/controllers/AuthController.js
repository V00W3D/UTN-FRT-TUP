const conn = require("../config/db");
const jwt = require("jsonwebtoken");
const { validateToken } = require("../utils/tokenUtils");

const AuthControllers = {
  async Login(req, res) {
    const { nombre, contraseña } = req.body;
    const query =
      "SELECT * FROM Usuarios WHERE Nombre = ? AND Contraseña = ? AND Deleted = FALSE";

    conn.query(query, [nombre, contraseña], (err, results) => {
      if (err) {
        console.log("🕹️[Login] algo salió mal:\n", err);
        return res.json({
          ok: false,
          message: "[ ✕ ]Inicio de sesión fallido",
          err,
        });
      }

      if (!results || results.length === 0) {
        return res.json({
          ok: false,
          message: "Credenciales inválidas o usuario eliminado",
        });
      }

      const user = results[0];

      if (!user.Activo) {
        conn.query("UPDATE Usuarios SET Activo = true WHERE UserID = ?", [
          user.UserID,
        ]);
      }

      const payload = {
        UserID: user.UserID,
        Nombre: user.Nombre,
        Imagen: user.Imagen,
        RolID: user.RolID,
      };

      const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
      const cupcake = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
      const cake = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

      res.json({
        ok: true,
        message: "[ ✓ ]Inicio de sesión exitoso",
        desserts: { cupcake, cake },
      });
    });
  },

  async Register(req, res) {
    const { nombre, contraseña, correo, telefono, imagen, fechanacimiento } =
      req.body;
    const query = `
      INSERT INTO Usuarios (Nombre, Contraseña, Correo, Teléfono, Imagen, FechaNacimiento, RolID, Activo)
      VALUES (?, ?, ?, ?, ?, ?, 2, TRUE)
    `;

    conn.query(
      query,
      [nombre, contraseña, correo, telefono, imagen, fechanacimiento],
      (err) => {
        if (err) {
          console.log("🕹️[Register] algo salió mal:\n", err);
          return res.json({ ok: false, message: "[ ✕ ]Registro fallido", err });
        }
        res.json({ ok: true, message: "[ ✓ ]Registro exitoso" });
      }
    );
  },

  async Logout(req, res) {
    const { isTasty, UserID } = req.context || {};

    if (!isTasty || !UserID) {
      return res.json({
        ok: false,
        message: "Token inválido o sesión expirada",
      });
    }

    const query = "UPDATE Usuarios SET Activo = FALSE WHERE UserID = ?";
    conn.query(query, [UserID], (err, results) => {
      if (err) {
        console.log("🕹️[Logout] algo salió mal:\n", err);
        return res.json({
          ok: false,
          message: "[ ✕ ]Finalización de sesión fallida",
          err,
        });
      }

      if (results.affectedRows === 0) {
        return res.json({
          ok: false,
          message: "Usuario no encontrado o ya inactivo",
        });
      }

      res.json({ ok: true, message: "[ ✓ ]Sesión cerrada correctamente" });
    });
  },
  async Me(req, res) {
    try {
      const { isTasty, UserID, Nombre, RolID, Imagen, newCupCake } =
        req.context || {};

      // 🧱 Si el contexto no es válido, fuera.
      if (!isTasty || !UserID) {
        return res.json({
          ok: false,
          message: "Token inválido o sesión expirada",
        });
      }

      // (Opcional) — podemos reconfirmar los datos desde la BD, si querés
      const query = `
        SELECT Nombre, RolID, Imagen 
        FROM Usuarios 
        WHERE UserID = ? AND Deleted = FALSE
      `;

      conn.query(query, [UserID], (err, results) => {
        if (err) {
          console.log("🕹️[Me] algo salió mal:\n", err);
          return res.json({
            ok: false,
            message: "Error interno al obtener datos del usuario",
          });
        }

        const user = results?.[0] || {
          UserID,
          Nombre,
          RolID,
          Imagen,
        };

        res.json({
          ok: true,
          message: "Datos del usuario obtenidos correctamente",
          user: {
            id: user.UserID,
            nombre: user.Nombre,
            rol: user.RolID,
            imagen: user.Imagen,
          },
          // 🍪 por si el refresh generó un nuevo cupcake
          desserts: newCupCake ? { cupcake: newCupCake } : null,
        });
      });
    } catch (err) {
      console.error("🕹️[AuthControllers.Me] Error:", err);
      res.json({
        ok: false,
        message: "Error al verificar los datos del usuario",
      });
    }
  },
};

module.exports = AuthControllers;
