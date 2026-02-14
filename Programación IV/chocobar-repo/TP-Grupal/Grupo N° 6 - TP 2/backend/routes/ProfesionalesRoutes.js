const express = require("express");
const router = express.Router();
const ProfesionalesController = require("../controllers/ProfesionalesController");

router.get("/", ProfesionalesController.ListarProfesionales);
router.post("/", ProfesionalesController.AgregarProfesional);

module.exports = router;
