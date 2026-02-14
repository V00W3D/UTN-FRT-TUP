const Mensaje = require("../models/mensaje.js");

// Obtener todos los mensajes (debug general)
const getMensajes = async (req, res) => {
  const mensajes = await Mensaje.find().sort({ fecha: 1 });
  res.json(mensajes);
};

// Enviar nuevo mensaje (receptor puede ser array de usuarios)
const postMensaje = async (req, res) => {
  const { emisor, receptor, texto,sala } = req.body;

  if (!Array.isArray(receptor) || receptor.length === 0)
    return res.status(400).json({ msg: "El receptor debe ser un array con al menos un ID." });

  try {
    const nuevoMensaje = await Mensaje.create({ emisor, receptor, texto,sala });
    res.status(201).json(nuevoMensaje);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el mensaje" });
  }
};

// Editar texto de un mensaje
const putMensaje = async (req, res) => {
  const { id } = req.params;
  const { texto } = req.body;

  try {
    const actualizado = await Mensaje.findByIdAndUpdate(
      id,
      { texto },
      { new: true }
    );

    if (!actualizado)
      return res.status(404).json({ msg: "Mensaje no encontrado" });

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el mensaje" });
  }
};

// Eliminar mensaje por ID
const deleteMensaje = async (req, res) => {
  const { id } = req.params;

  try {
    const eliminado = await Mensaje.findByIdAndDelete(id);

    if (!eliminado)
      return res.status(404).json({ msg: "Mensaje no encontrado" });

    res.json({ msg: "Mensaje eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar mensaje" });
  }
};

const getMensajesPorSala = async (req, res) => {
  const { salaId } = req.params;

  try {

    const mensajes = await Mensaje.find({ sala: salaId })
      .sort({ fecha: 1 })
      .populate("emisor", "nombre imagen");

    res.json(mensajes);
  } catch (error) {
    console.error("❌ Error al buscar mensajes por sala:", error);
    res.status(500).json({ error: "Error al obtener mensajes de la sala" });
  }
};



module.exports = {
  getMensajes,
  postMensaje,
  putMensaje,
  deleteMensaje,
  getMensajesPorSala
};
