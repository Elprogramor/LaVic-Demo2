@echo off
setlocal
cd /d "%~dp0"
echo.
echo ========================================
echo    LAVIC - VALIDACAO V0.1
echo ========================================
echo.
node tooling\validate-v0.1.mjs
if errorlevel 1 (
  echo.
  echo VALIDACAO FALHOU.
  exit /b 1
)
echo.
echo VALIDACAO CONCLUIDA COM SUCESSO.
