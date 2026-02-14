const eventosModel = require("../models/eventosModel");

async function getAll(req, res) {
  try {
    const eventos = await eventosModel.getAll();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener eventos", error: error.message });
  }
}

async function getById(req, res) {
  try {
    const evento = await eventosModel.getById(req.params.id);
    if (!evento) return res.status(404).json({ message: "Evento no encontrado" });
    res.json(evento);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener evento", error: error.message });
  }
}

async function create(req, res) {
  const { nombre, fecha, lugar, cupo } = req.body;
  if (!nombre || !fecha || !lugar || cupo === undefined) {
    return res.status(400).json({ message: "Nombre, fecha, lugar y cupo son obligatorios" });
  }

  try {
    const nuevo = await eventosModel.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear evento", error: error.message });
  }
}

async function update(req, res) {
  try {
    const actualizado = await eventosModel.update(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ message: "Evento no encontrado" });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar evento", error: error.message });
  }
}

async function remove(req, res) {
  try {
    const eliminado = await eventosModel.remove(req.params.id);
    if (!eliminado) return res.status(404).json({ message: "Evento no encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar evento", error: error.message });
  }
}

module.exports = { getAll, getById, create, update, remove };
