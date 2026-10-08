@echo off
setlocal
cd /d "%~dp0"

echo.
echo ===============================================
echo   LaVic Admin v0.5.1 - Hotfix de validacao
echo ===============================================
echo.
echo Este validador limpa artefatos .next gerados pelo dev
echo antes do typecheck para evitar tipos de rota corrompidos.
echo.

call npm run validate:admin:v0.5
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
echo [OK] LaVic Admin v0.5 validado com sucesso.
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
