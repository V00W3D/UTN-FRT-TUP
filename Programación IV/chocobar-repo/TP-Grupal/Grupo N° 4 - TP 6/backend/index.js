const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const pool = require("./config/db");
const usuariosRoutes = require("./routes/usuariosRoutes");
const eventosRoutes = require("./routes/eventosRoutes");
const artistasRoutes = require("./routes/artistasRoutes");
const asistentesRoutes = require("./routes/asistentesRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Grupo 4" });
});

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/eventos", eventosRoutes);
app.use("/api/artistas", artistasRoutes);
app.use("/api/asistentes", asistentesRoutes);

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log("Base de datos conectada exitosamente");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos", error);
    process.exit(1);
  }
}

startServer();
