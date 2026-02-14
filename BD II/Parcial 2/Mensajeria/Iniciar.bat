@echo off
set IP=26.51.56.75
set PUERTO=5500
set URL=http://%IP%:%PUERTO%

echo Verificando conectividad con %IP%...
ping -n 2 %IP% >nul
if %errorlevel% neq 0 (
    echo No se pudo contactar la IP %IP%. ¿RadminVPN esta conectado?
    pause
    exit /b
)

echo IP responde.
	start %URL% 
exit
