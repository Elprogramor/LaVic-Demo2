@echo off
setlocal
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0CAPTURAR_HOME_1440.ps1" %*
exit /b %errorlevel%
