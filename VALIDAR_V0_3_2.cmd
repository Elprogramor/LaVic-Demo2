@echo off
setlocal
cd /d "%~dp0"

echo ============================================================
echo LaVic v0.3.2 - validacao completa
echo ============================================================

call npm run validate:v0.3.2
if errorlevel 1 goto :erro

call npm run typecheck
if errorlevel 1 goto :erro

call npm run build
if errorlevel 1 goto :erro

call npm audit
if errorlevel 1 goto :erro

echo.
echo ============================================================
echo OK - LaVic v0.3.2 passou por todas as validacoes.
echo ============================================================
exit /b 0

:erro
echo.
echo ============================================================
echo ERRO - validacao interrompida. Veja a mensagem acima.
echo ============================================================
exit /b 1
