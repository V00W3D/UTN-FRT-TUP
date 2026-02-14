const EXPRESS = require("express");
const CORS = require("cors");
const MORGAN = require("morgan");
const HELMET = require("helmet");
const { contextMiddleware } = require("../middleware/contextMiddleware");
//==========================================
const APP = EXPRESS();
APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: true }));
APP.use(CORS());
APP.use(HELMET());
APP.use(MORGAN("dev"));
APP.use(contextMiddleware);
//==========================================
const IP = process.env.IP;
const PORT = process.env.PORT;
const URL = `http://${IP}:${PORT}/`;
//==========================================
const AuthRoutes = require("../routes/AuthRoutes");
const TurnosRoutes = require("../routes/TurnosRoutes");
const EspecialidadesRoutes = require("../routes/EspecialidadesRoutes");
const ProfesionalesRoutes = require("../routes/ProfesionalesRoutes");
APP.use("/auth", AuthRoutes);
APP.use("/turnos", TurnosRoutes);
APP.use("/especialidades", EspecialidadesRoutes);
APP.use("/profesionales", ProfesionalesRoutes);

//==========================================
APP.get("/", (_req, res) => {
  res.json({ "~": "El inicio del fin..." });
});
APP.listen(PORT, IP, () => {
  console.log(`[Express] API "${URL}"`);
});
