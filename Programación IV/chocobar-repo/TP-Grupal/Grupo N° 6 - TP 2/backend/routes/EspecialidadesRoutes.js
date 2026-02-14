const express = require("express");
const router = express.Router();
const EspecialidadesController = require("../controllers/EspecialidadesController");

router.get("/", EspecialidadesController.ListarEspecialidades);

module.exports = router;
