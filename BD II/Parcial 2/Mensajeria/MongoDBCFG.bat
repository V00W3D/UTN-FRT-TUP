@echo off
REM Abre el archivo mongod.cfg con el Bloc de Notas


:: ========== FORZAR MODO ADMIN ==========
@echo off
:: Intenta escribir en una carpeta del sistema (requiere admin)
fsutil dirty query %systemdrive% >nul 2>&1
if %errorlevel% NEQ 0 (
    echo Este script requiere permisos de administrador.
    echo Reiniciando como administrador...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)
:: ========================================

echo -------------------------------------
echo - Busque la linea: 
echo 	"bindIp: 127.0.0.1" (Esta es la IP Default, solo acepta conexiones LOCALES)
echo -------------------------------------
echo -OPCION 1:
echo	Cambiela por:
echo 	"bindIp: 0.0.0.0" 
echo	(Esta IP permite conexiones desde cualquier fuente)
echo -------------------------------------
echo -OPCION 2: 
echo	 O intente tambien:
echo 	"bindIp: 127.0.0.1,26.51.56.75"
echo	(Esto permitira conexiones tanto LOCALES como las de la IP del Alumno)
echo -------------------------------------
echo - Guarde el archivo y cierre el Bloc de Notas
echo -------------------------------------
echo Cuando este listo:
pause

echo Abriendo archivo de configuracion de MongoDB...
start notepad "C:\Program Files\MongoDB\Server\8.0\bin\mongod.cfg"

pause
echo Reiniciando el servicio de MongoDB...
echo -------------------------------------
net stop MongoDB
net start MongoDB
echo -------------------------------------

echo MongoDB reiniciado correctamente.
echo Ya puede conectarse desde otra computadora usando Compass con su IP de RadminVPN.
echo -------------------------------------
echo Si desea volver a los valores de fabrica:
pause

start notepad "C:\Program Files\MongoDB\Server\8.0\bin\mongod.cfg"
pause