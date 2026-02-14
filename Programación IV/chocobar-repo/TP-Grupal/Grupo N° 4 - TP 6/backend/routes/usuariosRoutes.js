const express = require("express");
const usuariosController = require("../controllers/usuariosController");

const router = express.Router();

router.get("/", usuariosController.getAll);
router.get("/:id", usuariosController.getById);
router.post("/", usuariosController.create);
router.put("/:id", usuariosController.update);
router.delete("/:id", usuariosController.remove);

module.exports = router;
