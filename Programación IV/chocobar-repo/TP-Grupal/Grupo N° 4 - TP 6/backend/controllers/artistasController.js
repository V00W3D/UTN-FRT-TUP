const artistasModel = require("../models/artistasModel");

async function getAll(req, res) {
  try {
    const artistas = await artistasModel.getAll();
    res.json(artistas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener artistas", error: error.message });
  }
}

async function getById(req, res) {
  try {
    const artista = await artistasModel.getById(req.params.id);
    if (!artista) return res.status(404).json({ message: "Artista no encontrado" });
    res.json(artista);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener artista", error: error.message });
  }
}

async function create(req, res) {
  const { nombre, tipo } = req.body;
  if (!nombre || !tipo) {
    return res
      .status(400)
      .json({ message: "Los campos nombre y tipo son obligatorios" });
  }

  try {
    const nuevo = await artistasModel.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear artista", error: error.message });
  }
}

async function update(req, res) {
  try {
    const actualizado = await artistasModel.update(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ message: "Artista no encontrado" });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar artista", error: error.message });
  }
}

async function remove(req, res) {
  try {
    const eliminado = await artistasModel.remove(req.params.id);
    if (!eliminado) return res.status(404).json({ message: "Artista no encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar artista", error: error.message });
  }
}

module.exports = { getAll, getById, create, update, remove };
