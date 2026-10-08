@echo off
setlocal
cd /d "%~dp0"

echo.
echo =====================================================
echo   LaVic Admin v0.1 - Validacao completa
echo =====================================================
echo.

call npm run validate:admin:v0.1
if errorlevel 1 goto :fail

call npm run typecheck -w @lavic/admin
if errorlevel 1 goto :fail

call npm run build -w @lavic/admin
if errorlevel 1 goto :fail

echo.
echo =====================================================
echo   VALIDACAO APROVADA
echo   Admin v0.1 pronto para revisao visual.
echo =====================================================
exit /b 0

:fail
echo.
echo =====================================================
echo   VALIDACAO FALHOU
echo   Revise o erro acima antes de continuar.
echo =====================================================
exit /b 1
