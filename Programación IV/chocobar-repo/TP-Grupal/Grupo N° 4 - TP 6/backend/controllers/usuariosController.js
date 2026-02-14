const usuariosModel = require("../models/usuariosModel");

async function getAll(req, res) {
  try {
    const usuarios = await usuariosModel.getAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
  }
}

async function getById(req, res) {
  try {
    const usuario = await usuariosModel.getById(req.params.id);
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error: error.message });
  }
}

async function create(req, res) {

  console.log("🔥 BODY RECIBIDO DESDE EL FRONT:", req.body);

  const { nombre, password } = req.body;

  if (!nombre || !password) {
    return res
      .status(400)
      .json({ message: "Los campos nombre y password son obligatorios" });
  }

  try {
    const nuevo = await usuariosModel.create(req.body);
    return res.status(201).json(nuevo);
  } catch (error) {
    console.error("🔥 ERROR AL CREAR USUARIO:", error);
    return res
      .status(500)
      .json({ message: "Error al crear usuario", error: error.message });
  }
}


async function update(req, res) {
  try {
    const actualizado = await usuariosModel.update(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error: error.message });
  }
}

async function remove(req, res) {
  try {
    const eliminado = await usuariosModel.remove(req.params.id);
    if (!eliminado) return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error: error.message });
  }
}

module.exports = { getAll, getById, create, update, remove };
