# 🧾 Auditoría — Semana 3

### Grupo Nº: 4

### Tema asignado: Migrar el proyecto de la Semana 2 hacia un entorno Full Stack real, reemplazando el uso de json-server y localStorage por un backend Node.js conectado a una base de datos MySQL.

### Integrantes (Nombre completo + Legajo):

- Elias asfoura 61629
- Barrionuevo Luis 61591
- Ricciuti Marco Teodoro 61628

1. Relevamiento — Antes de comenzar a trabajar
   El proyecto sólo contaba con el frontend de Vite dentro de la carpeta legada y no tenía la estructura solicitada ni un backend real los servicios consumían datos simulados, por lo que se identificó la necesidad de separar frontend/backend y reemplazar json-server/localStorage por una API.

No existía archivo de configuración de base de datos ni variables de entorno unificadas. Habia que agregarlas para conectarla con la base

Se detectaron validaciones mínimas y ausencia de manejo de errores en las operaciones CRUD.

2. Soluciones implementadas + Nuevo agregado
   Soluciones aplicadas a problemas detectados
   Reestructuramos el repositorio bajo grupo4/ y creamos un backend Express con su propio package.json, scripts de inicio y dependencias obligatorias (express, mysql2, dotenv, cors, helmet, morgan, jsonwebtoken, nodemon).

Añadimos un pool MySQL configurable mediante variables de entorno y documentamos todas las claves requeridas en .env.

Implementamos modelos SQL y controladores CRUD para usuarios, eventos, artistas y asistentes, con validaciones y mensajes de error consistentes, junto con rutas REST bajo /api.

Se incorporó autenticación JWT que devuelve token, nombre y rol del usuario, ajustando el flujo de login para el consumo del frontend.

Generamos script.sql con la definición completa de la base de datos (tablas, claves primarias y foráneas) para automatizar la creación del esquema exigido.

Reactualizamos los servicios del frontend para consumir el backend real y manejamos respuestas/errores de manera homogénea, eliminando dependencias anteriores de json-server/localStorage.

Nuevos requerimientos de Semana 2 agregados
Configuramos index.js con Express, CORS, Helmet, Morgan, registro de rutas y verificación de conexión al pool, mostrando los mensajes solicitados al levantar el servidor.

Creamos un store de Zustand para mantener usuario y token, preparado para integrarse con los hooks del frontend conforme a la nueva autenticación.

Observaciones finales
El flujo de trabajo quedó documentado con scripts de inicio (npm run dev/npm start) en frontend y backend, y la estructura reorganizada facilita que cada integrante se encargue de módulos específicos (modelos, controladores o vistas) sin interferencias.
