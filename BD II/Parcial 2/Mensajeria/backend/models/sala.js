const MONGOOSE = require("mongoose")

const Sala = new MONGOOSE.Schema({
  nombre: String,
  maxParticipantes: Number,
  participantes: [{ type: MONGOOSE.Schema.Types.ObjectId, ref: "Usuario" }],
  fechaCreacion: { type: Date, default: Date.now },
  tipo: { type: String, enum: ["publica", "privada"], default: "publica" },
  password: { type: String },
  owner: { type: MONGOOSE.Schema.Types.ObjectId, ref: "Usuario" }
});

module.exports = MONGOOSE.model("Sala",Sala)
