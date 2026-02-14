
Proyecto Chat con MongoDB + Express + RadminVPN
=================================================

Este proyecto es una aplicación de chat que utiliza MongoDB como base de datos, Express como backend y RadminVPN para permitir la conexión remota desde otras computadoras.
Los datos (usuarios y mensajes) están almacenados en la PC del desarrollador, y se puede acceder a ellos a través de la IP RadminVPN: 26.51.56.75.

-------------------------------------------------
📌 Requisitos para conectarse a la base de datos
-------------------------------------------------

Antes de ejecutar el proyecto o intentar conectarse mediante MongoDB Compass, asegúrese de cumplir con los siguientes requisitos:

✅ 1. Tener instalado MongoDB y usar el script de configuración

Debe ejecutar el script .bat que viene con el proyecto. Este:
- Fuerza el inicio en modo administrador
- Abre el archivo mongod.cfg
- Le pide modificar la IP de escucha de MongoDB para aceptar conexiones remotas
- Reinicia automáticamente el servicio de MongoDB

¿Qué modificar en mongod.cfg?

Busque la línea:
    bindIp: 127.0.0.1

Y cámbiela por alguna de estas opciones:

Opción 1 – Conexiones desde cualquier IP:
    bindIp: 0.0.0.0

Opción 2 – Conexiones locales + IP específica (RadminVPN):
    bindIp: 127.0.0.1,26.51.56.75

Guarde los cambios, cierre el bloc de notas y deje que el script reinicie el servicio de MongoDB.

✅ 2. Tener instalado RadminVPN

- Instale RadminVPN: 
	Use el instalador en la carpeta redist
	
	O en su defecto
	https://www.radmin-vpn.com/
	
- Conéctese a la red:
    Nombre de red: BaseDatos II
    Contraseña:     789456123

✅ 3. Configurar el Firewall (si no conecta)

Si no puede conectarse a la base de datos desde Compass, puede que el firewall esté bloqueando los puertos necesarios.
Asegúrese de permitir los siguientes puertos en el firewall (entrante y saliente):

- Puerto 5500 → utilizado por MongoDB para conexiones externas
- Puerto 8000 → utilizado por el servidor backend en Express

-------------------------------------------------
🧪 Prueba rápida
-------------------------------------------------

1. Ejecutar el .bat como administrador y configurar el bindIp.
2. Conectarse a la red RadminVPN con las credenciales dadas.
3. Abrir MongoDB Compass.
4. Conectarse a:
   mongodb://26.51.56.75:27017

-------------------------------------------------
❓ Preguntas frecuentes
-------------------------------------------------

¿El profesor tiene que instalar algo más?
No. El backend, la base de datos y el frontend están alojados en la PC del desarrollador.
Solo debe conectarse correctamente a través de RadminVPN y seguir los pasos para permitir el acceso a MongoDB.

¿Se necesita ejecutar nodemon o http-server?
No, esos ya están corriendo en la PC del host.

-------------------------------------------------
🧠 Información técnica del proyecto
-------------------------------------------------

- Backend: Express + Mongoose
- Servidor: hosteado con nodemon desde la PC del desarrollador
- Frontend: http-server (no se utiliza Live Server)
- Conexiones: vía axios apuntando a http://26.51.56.75:8000
- CORS: habilitado

-------------------------------------------------
🗃️ Estructura de la base de datos
-------------------------------------------------

Colección: usuarios
{
  "_id": ObjectId,
  "nombre": "Nombre del usuario",
  "imagen": "URL o base64",
  "disponible": true
}

Colección: mensajes
{
  "emisor": "ID del emisor",
  "receptor": "ID del receptor",
  "texto": "Contenido del mensaje",
  "fecha": "Se genera automáticamente"
}

💬 La fecha se guarda correctamente aunque aún no se muestra visualmente en el chat.
Una mejora futura sería mostrarla al final del mensaje, con letra muy pequeña (tipo footnote).
