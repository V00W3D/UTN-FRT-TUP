import express from "express";
import cors from "cors";

import clientesRouter from './Routes/ClientesRoute.js';
import serviciosRouter from './Routes/ServiciosRoute.js';
import turnosRouter from './Routes/TurnosRoute.js';
import disponibilidadRouter from './Routes/DisponibilidadRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

// rutas
app.use("/clientes", clientesRouter);
app.use("/servicios", serviciosRouter);
app.use("/turnos", turnosRouter);
app.use("/disponibilidad", disponibilidadRouter);

// ---------- LISTEN DEL SERVER ----------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Servidor API en puerto " + PORT));
