const connection = require("./config/mongoose.js")
connection()
const {APP,APPlisten} = require("./config/express.js")
APPlisten()

const mensajesRoute = require("./routes/mensaje_route.js")
const usuariosRoute = require("./routes/usuario_route.js")
const salasRoute = require("./routes/sala_route.js");

APP.use("/", mensajesRoute)
APP.use("/", usuariosRoute)
APP.use("/", salasRoute);
