@echo off
setlocal
cd /d "%~dp0"
echo.
echo ==============================================
echo  LaVic Storefront v1.5 - validacao completa
echo ==============================================
echo.
node tooling\validate-storefront-v1.5.mjs
if errorlevel 1 (
  echo.
  echo VALIDACAO V1.5 FALHOU.
  exit /b 1
)
echo.
echo VALIDACAO V1.5 CONCLUIDA COM SUCESSO.
endlocal
