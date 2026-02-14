const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: {type: String, required: true},
  imagen: {type: String},
  disponible: { type: Boolean, default: true },
  password: {type: String}
});

module.exports = mongoose.model("Usuario", usuarioSchema);
