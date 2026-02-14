const express = require("express");
const asistentesController = require("../controllers/asistentesController");

const router = express.Router();

router.get("/", asistentesController.getAll);
router.get("/:id", asistentesController.getById);
router.post("/", asistentesController.create);
router.put("/:id", asistentesController.update);
router.delete("/:id", asistentesController.remove);

module.exports = router;
