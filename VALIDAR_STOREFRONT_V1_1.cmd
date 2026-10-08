@echo off
setlocal
cd /d "%~dp0"
echo.
echo =============================================
echo  LaVic Storefront v1.1 - validacao completa
echo =============================================
echo.
node tooling\validate-storefront-v1.1.mjs
if errorlevel 1 (
  echo.
  echo [ERRO] A validacao falhou. Revise a saida acima.
  exit /b 1
)
echo.
echo [OK] Validacao concluida.
endlocal
