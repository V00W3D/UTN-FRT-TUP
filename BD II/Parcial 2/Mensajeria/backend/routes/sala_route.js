const express = require("express");
const router = express.Router();
const {
  getSalas,
  getSalaById,
  postSala,
  agregarUsuarioSala,
  deleteSala
} = require("../controllers/sala_controller.js");

router.get("/salas", getSalas);
router.get("/salas/:id", getSalaById);
router.post("/salas/add", postSala);
router.put("/salas/:salaId/agregar/:usuarioId", agregarUsuarioSala);
router.delete("/salas/delete/:id", deleteSala);

module.exports = router;
