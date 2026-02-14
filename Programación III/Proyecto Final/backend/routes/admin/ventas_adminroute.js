const EXPRESS = require("express")
const router = EXPRESS.Router()

const {getVentas,getVentabyOrder,addVenta,deleteVenta} = require("../../controllers/ventas_controller.js")

router.get("/ventas", getVentas)
router.get("/ventas/:numero_orden", getVentabyOrder)
router.post("/ventas/add", addVenta)
router.delete("/ventas/delete/:numero_orden", deleteVenta)

module.exports = router


