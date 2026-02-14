const EXPRESS = require('express')
const router = EXPRESS.Router()
const {getEmpleados,getEmpleadobyID,addEmpleado,updateEmpleado,deleteEmpleado} = require("../../controllers/empleados_controller")

router.get("/empleados",getEmpleados) 
router.get("/empleados/:ID_Empleado",getEmpleadobyID)
router.post("/empleados/add",addEmpleado)
router.put("/empleados/update/:ID_Empleado",updateEmpleado)
router.delete("/empleados/delete/:ID_Empleado",deleteEmpleado)

module.exports = router