const Usuario = require("../models/usuario.js");

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

const getUsuarioById = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id);
  if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });
  res.json(usuario);
};

const postUsuario = async (req, res) => {
  const { nombre, imagen, disponible, password } = req.body;
  const nuevoUsuario = await Usuario.create({ nombre, imagen, disponible, password });
  res.status(201).json(nuevoUsuario);
};

const putUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, imagen, disponible, password } = req.body;
  const actualizado = await Usuario.findByIdAndUpdate(
    id,
    { nombre, imagen, disponible, password },
    { new: true }
  );
  if (!actualizado) return res.status(404).json({ msg: "Usuario no encontrado" });
  res.json(actualizado);
};

const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  const eliminado = await Usuario.findByIdAndDelete(id);
  if (!eliminado) return res.status(404).json({ msg: "Usuario no encontrado" });
  res.json({ msg: "Usuario eliminado" });
};

const actualizarUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndUpdate(req.params.id, { disponible: true });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: "No se pudo liberar el usuario" });
  }
};

module.exports = {getUsuarios,getUsuarioById,postUsuario,putUsuario,deleteUsuario,actualizarUsuario};
