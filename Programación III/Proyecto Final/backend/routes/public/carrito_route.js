const express = require("express");
const router = express.Router();
const {getCarrito, addCarrito, updateCantidad, deleteItem, vaciarCarrito} = require("../../controllers/carrito_controller");

router.get("/carrito/get",getCarrito)
router.post("/carrito/add",addCarrito)
router.put("/carrito/update/:id",updateCantidad)
router.delete("/carrito/delete/:id",deleteItem)
router.delete("/carrito/clear",vaciarCarrito)

module.exports = router