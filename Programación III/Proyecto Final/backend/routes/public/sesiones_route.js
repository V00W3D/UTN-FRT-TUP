const express = require("express");
const router = express.Router();
const { crearSesion, getSesiones, cerrarSesion } = require("../../controllers/sesiones_controller.js");

router.post("/sesiones", crearSesion);
router.get("/sesiones", getSesiones);
router.put("/sesiones/:ID_Sesion", cerrarSesion);

module.exports = router;
