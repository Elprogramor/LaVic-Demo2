@echo off
setlocal
cd /d "%~dp0"

echo =========================================================
echo  LaVic v0.3.3 - validacao completa do storefront
echo =========================================================

echo.
echo [1/4] Auditoria estatica v0.3.3...
call npm run validate:v0.3.3
if errorlevel 1 goto :fail

echo.
echo [2/4] TypeScript storefront...
call npm run typecheck -w @lavic/storefront
if errorlevel 1 goto :fail

echo.
echo [3/4] Build de producao storefront...
call npm run build -w @lavic/storefront
if errorlevel 1 goto :fail

echo.
echo [4/4] Auditoria de dependencias...
call npm audit --audit-level=high
if errorlevel 1 goto :fail

echo.
echo =========================================================
echo  OK - v0.3.3 passou por todas as validacoes.
echo =========================================================
exit /b 0

:fail
echo.
echo =========================================================
echo  FALHA - corrija o erro acima antes de continuar.
echo =========================================================
exit /b 1
