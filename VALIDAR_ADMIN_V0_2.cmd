@echo off
setlocal
cd /d "%~dp0"

echo.
echo ===============================================
echo   LaVic Admin v0.2 - Validacao de Estoque
echo ===============================================
echo.

call npm run validate:admin:v0.2
if errorlevel 1 goto :fail

call npm run typecheck -w @lavic/admin
if errorlevel 1 goto :fail

call npm run build -w @lavic/admin
if errorlevel 1 goto :fail

echo.
echo [OK] LaVic Admin v0.2 validado com sucesso.
exit /b 0

:fail
echo.
echo [ERRO] A validacao encontrou problemas. Revise a saida acima.
exit /b 1
