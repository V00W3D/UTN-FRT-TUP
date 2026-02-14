// src/config/db.js
const MYSQL = require("mysql2");

const HOST = process.env.HOST;
const USER = process.env.USER;
const PORT = process.env.DB_PORT;
const PASS = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;

// -------------------------------------------------------------
// ⚙️ Crear pool de conexiones
// -------------------------------------------------------------
const conn = MYSQL.createPool({
  host: HOST,
  user: USER,
  password: PASS,
  database: DATABASE,
  port: PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// -------------------------------------------------------------
// 🧠 Función auxiliar para mostrar info bonita de conexión
// -------------------------------------------------------------
const buildURI = () => {
  const passPreview = PASS ? PASS : "(sin contraseña)";
  return `mysql://${USER}:${passPreview}@${HOST}:${PORT}/${DATABASE}`;
};

// -------------------------------------------------------------
// 🚦 Probar la conexión al iniciar
// -------------------------------------------------------------
conn.getConnection((err, connection) => {
  console.log(`[MySQL2] URI: "${buildURI()}"`);

  if (err) {
    console.error("❌ [MySQL2] Error al conectar con la base de datos.");

    switch (err.code) {
      case "ECONNREFUSED":
        console.error(
          "🧱 Conexión rechazada. El servidor MySQL no está disponible."
        );
        break;
      case "ER_ACCESS_DENIED_ERROR":
        console.error(
          "🚫 Credenciales inválidas. Revisá usuario o contraseña."
        );
        break;
      case "ENOTFOUND":
        console.error(
          "📡 Host no encontrado. Revisá la variable HOST en .env."
        );
        break;
      default:
        console.error(`⚠️ Error desconocido: ${err.message}`);
        break;
    }

    console.error("Detalles del error:", {
      name: err.name,
      code: err.code,
      fatal: err.fatal,
      message: err.message,
    });

    console.log("═══════════════════════════════════════════════════");
    process.exit(1); // 💀 Abortamos para evitar fallos posteriores
  } else {
    connection.release(); // 🔓 Liberar conexión de prueba
  }
});

module.exports = conn;
