@echo off
setlocal
cd /d "%~dp0"

echo ============================================================
echo LaVic Storefront v1.3 - Validacao
 echo ============================================================

node tooling\validate-storefront-v1.3.mjs
if errorlevel 1 (
  echo.
  echo FALHA: a validacao da v1.3 encontrou erros.
  exit /b 1
)

echo.
echo SUCESSO: estrutura, typecheck e build da v1.3 passaram.
exit /b 0
