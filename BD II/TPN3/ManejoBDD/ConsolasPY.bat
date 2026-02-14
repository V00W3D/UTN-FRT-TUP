@echo off
set /p archivo=Nombre del archivo principal (sin .py): 
pyinstaller --onefile --console ^
--hidden-import=textos ^
--paths=. ^
%archivo%.py
pause
