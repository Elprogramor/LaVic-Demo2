@echo off
setlocal
cd /d "%~dp0"
echo.
echo ===============================================
echo   LaVic Storefront v0.6.3 - Water Fill CTA
echo ===============================================
echo.
node tooling\validate-storefront-v0.6.3.mjs
if errorlevel 1 goto :error
if exist apps\storefront\.next rmdir /s /q apps\storefront\.next
call npm run typecheck -w @lavic/storefront
if errorlevel 1 goto :error
call npm run build -w @lavic/storefront
if errorlevel 1 goto :error
echo.
echo [OK] v0.6.3 validada com sucesso.
exit /b 0
:error
echo.
echo [ERRO] A validacao encontrou problemas. Revise a saida acima.
exit /b 1
