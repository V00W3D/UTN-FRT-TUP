const express = require("express");
const router = express.Router();
const {getUsuarios,getUsuarioById,postUsuario,putUsuario,deleteUsuario,actualizarUsuario} = require("../controllers/usuario_controller.js");

router.get("/usuarios", getUsuarios);
router.get("/usuarios/:id", getUsuarioById);
router.post("/usuarios", postUsuario);
router.put("/usuarios/:id", putUsuario);
router.delete("/usuarios/:id", deleteUsuario);
router.put("/usuarios/:id/liberar", actualizarUsuario)


module.exports = router;
