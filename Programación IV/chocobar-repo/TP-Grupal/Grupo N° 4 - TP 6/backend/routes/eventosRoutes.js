const express = require("express");
const eventosController = require("../controllers/eventosController");

const router = express.Router();

router.get("/", eventosController.getAll);
router.get("/:id", eventosController.getById);
router.post("/", eventosController.create);
router.put("/:id", eventosController.update);
router.delete("/:id", eventosController.remove);

module.exports = router;
