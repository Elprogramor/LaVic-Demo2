@echo off
setlocal
cd /d "%~dp0"

echo.
echo ===============================================
echo   LaVic Storefront v0.6 - Home Refinement
echo ===============================================
echo.

call npm run validate:storefront:v0.6
if errorlevel 1 goto :fail

if exist apps\storefront\.next rmdir /s /q apps\storefront\.next
if exist apps\storefront\tsconfig.tsbuildinfo del /f /q apps\storefront\tsconfig.tsbuildinfo

call npm run typecheck -w @lavic/storefront
if errorlevel 1 goto :fail

call npm run build -w @lavic/storefront
if errorlevel 1 goto :fail

echo.
echo [OK] Storefront v0.6 validada com sucesso.
exit /b 0

:fail
echo.
echo [ERRO] A validacao encontrou problemas. Revise a saida acima.
exit /b 1
