@echo off
setlocal
cd /d "%~dp0"

echo ======================================================
echo  LaVic Storefront v0.7 - Motion System Validation
echo ======================================================

node tooling\validate-storefront-v0.7.mjs
if errorlevel 1 goto :fail

echo.
echo [INFO] Executando typecheck do storefront...
call npm run typecheck -w @lavic/storefront
if errorlevel 1 goto :fail

echo.
echo [INFO] Executando build de producao do storefront...
call npm run build -w @lavic/storefront
if errorlevel 1 goto :fail

echo.
echo [OK] Validacao completa aprovada.
exit /b 0

:fail
echo.
echo [FAIL] A validacao encontrou um erro. Nenhuma etapa posterior deve ser considerada aprovada.
exit /b 1
