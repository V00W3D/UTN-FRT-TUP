const { refreshToken } = require("../utils/tokenUtils");

function contextMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const refreshHeader = req.headers["x-refresh-token"] || "";

    const cupCake = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    const cake = refreshHeader || null;

    const tokenStatus = refreshToken(cupCake, cake);

    if (tokenStatus.ok && tokenStatus.data) {
      req.context = {
        UserID: tokenStatus.data.UserID,
        Nombre: tokenStatus.data.Nombre,
        RolID: tokenStatus.data.RolID,
        Imagen: tokenStatus.data.Imagen,
        newCupCake: tokenStatus.newCupCake || null,
        isTasty: true,
      };
    } else {
      req.context = { isTasty: false };
    }

    next();
  } catch (err) {
    console.error("[contextMiddleware]", err);
    req.context = { isTasty: false };
    next();
  }
}

module.exports = { contextMiddleware };
