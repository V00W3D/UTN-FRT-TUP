Instrucciones para crear la base de datos `peluqueria`

Este backend usa MySQL (library mysql2/promise). El script `init.sql` en esta carpeta crea la base de datos, las tablas y añade datos de ejemplo.

Pasos para crear la base de datos localmente

1) Asegúrate de tener MySQL/MariaDB instalado y accesible.

2) Desde la línea de comandos (PowerShell) ejecuta (reemplaza user/password si es necesario):

```powershell
# importar usando el usuario root (o el que prefieras)
mysql -u root -p < "C:\Users\Usuario\TP_Comison_9_TUP\TP-Grupal\Grupo N° 3 - TP 10\backend\init.sql"
```

Si prefieres usar MySQL Workbench o Adminer, abre `init.sql` y ejecútalo allí.

3) Configurar variables de entorno para que `db.js` conecte a la base de datos correcta.

El archivo `backend/db.js` usa por defecto:
- host: localhost
- user: root
- password: admin
- database: peluqueria

Puedes crear un archivo `.env` en la carpeta `backend` con estas variables (si usas dotenv y ajustas `db.js`) o exportarlas en tu entorno antes de iniciar el server. Ejemplo de variables:

```powershell
$env:DB_HOST = 'localhost'
$env:DB_USER = 'root'
$env:DB_PASS = 'admin'
$env:DB_NAME = 'peluqueria'
```

4) Ejecutar el servidor (desde la carpeta del backend):

```powershell
cd "C:\Users\Usuario\TP_Comison_9_TUP\TP-Grupal\Grupo N° 3 - TP 10\backend"
# instalar dependencias si no lo hiciste
npm install
# iniciar (por ejemplo) con node
node server.js
```

Notas importantes

- El script crea FOREIGN KEYS con ON DELETE CASCADE para que al borrar un cliente/servicio se eliminen sus turnos relacionados (comportamiento del código actual en `server.js`).
- Las columnas `inicio` y `fin` son DATETIME: el backend hace comparaciones y cálculos (DATE_ADD) sobre esos campos.
- Ajusta los tipos (por ejemplo `precio`) si necesitás mayor precisión o formato.

Si querés, puedo:
- Ejecutar un `mysqld` import aquí (no tengo acceso a tu DB local), o
- Añadir un `docker-compose.yml` que levante MySQL con la DB ya inicializada y listo para usar (útil si preferís contenerizar y no tocar tu instalación local).

Decime si querés que genere también un `docker-compose.yml` para levantar MySQL con este esquema.  