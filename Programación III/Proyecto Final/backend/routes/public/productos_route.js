const EXPRESS = require('express')
const router = EXPRESS.Router()
const {getProductos,getProductobyID} = require("../../controllers/productos_controller.js")

router.get("/productos",getProductos);
router.get("/productos/:ID_Prod",getProductobyID);

module.exports = router