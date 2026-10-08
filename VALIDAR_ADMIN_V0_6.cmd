@echo off
setlocal
cd /d "%~dp0"

echo.
echo ===============================================
echo   LaVic Admin v0.6 - Financeiro + Relatorios
echo ===============================================
echo.

call npm run validate:admin:v0.6
if errorlevel 1 goto :fail

echo.
echo [1/3] Limpando cache gerado do Admin...
call npm run clean:admin:cache
if errorlevel 1 goto :cachefail

echo.
echo [2/3] Executando typecheck do Admin...
call npm run typecheck -w @lavic/admin
if errorlevel 1 goto :fail

echo.
echo [3/3] Executando build de producao do Admin...
call npm run build -w @lavic/admin
if errorlevel 1 goto :fail

echo.
echo [OK] LaVic Admin v0.6 validado com sucesso.
exit /b 0

:cachefail
echo.
echo [ERRO] O cache do Next nao pode ser limpo.
echo Feche qualquer servidor dev do Admin com Ctrl+C e rode este arquivo novamente.
exit /b 1

:fail
echo.
echo [ERRO] A validacao encontrou problemas. Revise a saida acima.
exit /b 1
