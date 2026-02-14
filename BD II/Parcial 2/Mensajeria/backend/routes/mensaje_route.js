const express = require("express");
const router = express.Router();
const {getMensajes,postMensaje,putMensaje,deleteMensaje,getMensajesPorSala} = require("../controllers/mensaje_controller.js");

router.get("/mensajes", getMensajes);
router.post("/mensajes/add", postMensaje);
router.put("/mensajes/:id", putMensaje);
router.delete("/mensajes/:id", deleteMensaje);
router.get("/mensajes/sala/:salaId", getMensajesPorSala);



module.exports = router;
