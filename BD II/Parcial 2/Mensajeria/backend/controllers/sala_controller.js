const Sala = require("../models/sala.js");

// Obtener todas las salas
const getSalas = async (req, res) => {
  try {
    const salas = await Sala.find().populate("participantes");
    res.json(salas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener salas" });
  }
};

// Obtener una sala por ID
const getSalaById = async (req, res) => {
  const { id } = req.params;
  try {
    const sala = await Sala.findById(id).populate("participantes");
    if (!sala) return res.status(404).json({ msg: "Sala no encontrada" });
    res.json(sala);
  } catch (err) {
    res.status(500).json({ error: "Error al buscar sala" });
  }
};

// Crear una nueva sala
const postSala = async (req, res) => {
  const { nombre, maxParticipantes,tipo, password ,owner} = req.body;

  try {
    const nuevaSala = await Sala.create({
      nombre,
      maxParticipantes,
      participantes: [],
      tipo: tipo?tipo:"publica",
      password,
      owner
    });
    res.status(201).json(nuevaSala);
  } catch (err) {
    res.status(500).json({ error: "No se pudo crear la sala" });
  }
};

// Agregar un usuario a la sala (si no supera el máximo)
const agregarUsuarioSala = async (req, res) => {
  const { salaId, usuarioId } = req.params;

  try {
    const sala = await Sala.findById(salaId);
    if (!sala) return res.status(404).json({ msg: "Sala no encontrada" });

    // ✅ Comparación robusta
    if (sala.participantes.some(id => id.toString() === usuarioId)) {
      return res.status(200).json({ msg: "Usuario ya estaba en la sala", sala });
    }

    if (sala.participantes.length >= sala.maxParticipantes) {
      return res.status(400).json({ msg: "La sala está llena" });
    }

    sala.participantes.push(usuarioId);
    await sala.save();

    // ✅ ¡Devuelve sala populada si querés!
    const salaActualizada = await Sala.findById(salaId).populate("participantes", "nombre imagen");

    res.json(salaActualizada);
  } catch (err) {
    res.status(500).json({ error: "Error al agregar usuario a la sala" });
  }
};

// Eliminar sala por ID
const deleteSala = async (req, res) => {
  const { id } = req.params;

  try {
    const eliminada = await Sala.findByIdAndDelete(id);
    if (!eliminada) return res.status(404).json({ msg: "Sala no encontrada" });
    res.json({ msg: "Sala eliminada con éxito" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar sala" });
  }
};

module.exports = {
  getSalas,
  getSalaById,
  postSala,
  agregarUsuarioSala,
  deleteSala
};
