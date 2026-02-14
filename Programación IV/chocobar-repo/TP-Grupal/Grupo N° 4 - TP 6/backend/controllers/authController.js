const jwt = require("jsonwebtoken");
const usuariosModel = require("../models/usuariosModel");

async function login(req, res) {
  const { nombre, password } = req.body;
  if (!nombre || !password) {
    return res.status(400).json({ message: "Nombre y contraseña son obligatorios" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT_SECRET no está configurado" });
  }

  try {
    const user = await usuariosModel.getByNombre(nombre);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
}

module.exports = { login };
