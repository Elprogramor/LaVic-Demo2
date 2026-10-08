@echo off
setlocal
cd /d "%~dp0"

echo ========================================
echo LaVic Storefront v1.7 - Validacao
echo ========================================

node tooling\validate-storefront-v1.7.mjs
if errorlevel 1 goto :fail

echo.
echo [2/4] Typecheck storefront
call npm run typecheck -w @lavic/storefront
if errorlevel 1 goto :fail

echo.
echo [3/4] Build storefront
call npm run build -w @lavic/storefront
if errorlevel 1 goto :fail

echo.
echo [4/4] Concluido
 echo VALIDACAO V1.7: PASS
exit /b 0

:fail
echo.
echo VALIDACAO V1.7: FAIL
exit /b 1
