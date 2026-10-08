@echo off
setlocal
cd /d "%~dp0"

echo [1/3] Validacao estrutural e seguranca v1.0...
node tooling\validate-storefront-v1.0.mjs
if errorlevel 1 exit /b 1

echo [2/3] TypeScript storefront...
call npm run typecheck -w @lavic/storefront
if errorlevel 1 exit /b 1

echo [3/3] Build de producao storefront...
call npm run build -w @lavic/storefront
if errorlevel 1 exit /b 1

echo.
echo STOREFRONT V1.0 VALIDADO COM SUCESSO.
endlocal
