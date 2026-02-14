const express = require("express");
const artistasController = require("../controllers/artistasController");

const router = express.Router();

router.get("/", artistasController.getAll);
router.get("/:id", artistasController.getById);
router.post("/", artistasController.create);
router.put("/:id", artistasController.update);
router.delete("/:id", artistasController.remove);

module.exports = router;
