const EXPRESS = require('express')
const router = EXPRESS.Router()
const {addProducto,updateProducto,deleteProducto} = require("../../controllers/productos_controller")

router.post("/productos/add",addProducto);
router.put("/productos/update/:ID_Prod",updateProducto);
router.delete("/productos/delete/:ID_Prod",deleteProducto);

module.exports = router