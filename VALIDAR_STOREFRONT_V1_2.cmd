@echo off
setlocal
cd /d "%~dp0"
node tooling\validate-storefront-v1.2.mjs
if errorlevel 1 (
  echo.
  echo [FAIL] LaVic Storefront v1.2 nao passou na validacao.
  exit /b 1
)
echo.
echo [OK] LaVic Storefront v1.2 validado.
endlocal
