@echo off
setlocal
cd /d "%~dp0"

echo [1/4] Validacao estatica...
call npm run validate:v0.3
if errorlevel 1 exit /b 1

echo [2/4] Typecheck storefront...
call npm run typecheck -w @lavic/storefront
if errorlevel 1 exit /b 1

echo [3/4] Build storefront...
call npm run build -w @lavic/storefront
if errorlevel 1 exit /b 1

echo [4/4] Auditoria de dependencias...
call npm audit
if errorlevel 1 exit /b 1

echo.
echo OK - LaVic storefront v0.3 validado.
endlocal
