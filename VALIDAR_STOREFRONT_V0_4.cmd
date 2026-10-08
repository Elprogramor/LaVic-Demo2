@echo off
setlocal
cd /d "%~dp0"
echo.
echo ===============================================
echo   LaVic Storefront v0.4 - Commerce Foundation
echo ===============================================
echo.
call npm run validate:storefront:v0.4
if errorlevel 1 goto :error
call npm run typecheck -w @lavic/storefront
if errorlevel 1 goto :error
call npm run build -w @lavic/storefront
if errorlevel 1 goto :error
echo.
echo [OK] Storefront v0.4 validado com sucesso.
exit /b 0
:error
echo.
echo [ERRO] A validacao encontrou problemas. Revise a saida acima.
exit /b 1
