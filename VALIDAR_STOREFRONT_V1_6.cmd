@echo off
setlocal
cd /d "%~dp0"

echo [1/3] Validacao estatica v1.6...
node tooling\validate-storefront-v1.6.mjs
if errorlevel 1 exit /b 1

echo.
echo [2/3] Typecheck do storefront...
call npm run typecheck -w @lavic/storefront
if errorlevel 1 exit /b 1

echo.
echo [3/3] Build de producao do storefront...
call npm run build -w @lavic/storefront
if errorlevel 1 exit /b 1

echo.
echo LaVic Storefront v1.6 validada com sucesso.
endlocal
