//==============================================================================

const {APP,APPlisten} = require("./config/express.js")
APPlisten()

const empleadosAdminRoute = require("./routes/admin/empleados_adminroute.js")

const productosAdminRoute = require("./routes/admin/productos_adminroute.js")
const productosRoute = require("./routes/public/productos_route.js")
const categoriasRoute = require("./routes/public/categorias_route.js")

const usuariosAdminRoute = require("./routes/admin/usuarios_adminroute.js")
const usuariosRoute = require("./routes/public/usuarios_route.js")
const sesionesRoute = require("./routes/public/sesiones_route.js")

const ventasAdminRoute = require("./routes/admin/ventas_adminroute.js")
const carritoRoute = require("./routes/public/carrito_route.js")
//==============================================================================
APP.use("/admin",empleadosAdminRoute)
APP.use("/admin",productosAdminRoute)
APP.use("/admin",usuariosAdminRoute)
APP.use("/admin",ventasAdminRoute)

APP.use("/",productosRoute)
APP.use("/",categoriasRoute)
APP.use("/",usuariosRoute)
APP.use("/",sesionesRoute)
APP.use("/",carritoRoute)

