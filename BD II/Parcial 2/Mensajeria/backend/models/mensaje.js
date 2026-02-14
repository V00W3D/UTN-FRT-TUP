const MONGOOSE = require("mongoose")

const Mensaje = new MONGOOSE.Schema({
  emisor: { type: MONGOOSE.Schema.Types.ObjectId, ref: "Usuario", required: true },
  receptor: [{ type: MONGOOSE.Schema.Types.ObjectId, ref: "Usuario", required: true }],
  texto: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  sala: { type: MONGOOSE.Schema.Types.ObjectId, ref: "Sala" }
})

module.exports = MONGOOSE.model('Mensaje', Mensaje);