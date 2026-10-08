@echo off
setlocal
cd /d "%~dp0"
echo ========================================
echo   LAVIC - VALIDACAO V0.2
echo ========================================
echo.
call npm run validate
if errorlevel 1 (
  echo.
  echo FALHA NA VALIDACAO.
  exit /b 1
)
echo.
echo V0.2 VALIDADA COM SUCESSO.
endlocal
