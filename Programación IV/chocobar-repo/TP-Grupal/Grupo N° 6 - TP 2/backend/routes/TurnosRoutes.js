const TurnosController = require("../controllers/TurnosController");
const TurnosMiddleware = require("../middleware/TurnosMiddleware");
const router = require("express").Router();

router.get(
  "/consultar",
  TurnosMiddleware.ConsultarTurnos,
  TurnosController.ConsultarTurnos
);
router.post("/crear", TurnosMiddleware.CrearTurno, TurnosController.CrearTurno);
router.put(
  "/cancelar/:TurnoID",
  TurnosMiddleware.CancelarTurno,
  TurnosController.CancelarTurno
);

module.exports = router;
