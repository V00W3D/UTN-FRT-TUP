const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

function validateToken(token) {
  if (!token) return { ok: false, bad: "Token no proporcionado" };

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { ok: true, data: decoded };
  } catch (err) {
    console.error("[validateToken]", err);
    return { ok: false, bad: "Token inválido o expirado" };
  }
}

function refreshToken(cupCake, cake) {
  try {
    // 1️⃣ Validar el CupCake (access token)
    const cup = validateToken(cupCake);
    if (cup.ok) return cup;

    // 2️⃣ Si CupCake expiró, intentar con Cake (refresh)
    if (cake) {
      const refresh = validateToken(cake);
      if (refresh.ok && refresh.data) {
        const { UserID, Nombre, RolID, Imagen } = refresh.data;

        const newCupCake = jwt.sign(
          { UserID, Nombre, RolID, Imagen },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        return {
          ok: true,
          data: jwt.verify(newCupCake, JWT_SECRET),
          newCupCake,
        };
      }

      return { ok: false, bad: "Sesión expirada" };
    }

    return { ok: false, bad: "Token inexistente" };
  } catch (err) {
    console.error("[refreshToken]", err);
    return { ok: false, bad: "Error inesperado en refreshToken" };
  }
}

module.exports = { validateToken, refreshToken };
