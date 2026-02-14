const asistentesModel = require("../models/asistentesModel");

async function getAll(req, res) {
  try {
    const asistentes = await asistentesModel.getAll();
    res.json(asistentes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener asistentes", error: error.message });
  }
}

async function getById(req, res) {
  try {
    const asistente = await asistentesModel.getById(req.params.id);
    if (!asistente) return res.status(404).json({ message: "Asistente no encontrado" });
    res.json(asistente);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener asistente", error: error.message });
  }
}

async function create(req, res) {
  const { nombre, email, eventoId } = req.body;
  if (!nombre || !email || !eventoId) {
    return res.status(400).json({ message: "Nombre, email y eventoId son obligatorios" });
  }

  try {
    const nuevo = await asistentesModel.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Error al crear asistente" });
  }
}

async function update(req, res) {
  try {
    const actualizado = await asistentesModel.update(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ message: "Asistente no encontrado" });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar asistente", error: error.message });
  }
}

async function remove(req, res) {
  try {
    const eliminado = await asistentesModel.remove(req.params.id);
    if (!eliminado) return res.status(404).json({ message: "Asistente no encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar asistente", error: error.message });
  }
}

module.exports = { getAll, getById, create, update, remove };
