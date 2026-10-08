@echo off
setlocal
node tooling/validate-v3-clean.mjs || exit /b 1
call npm run typecheck || exit /b 1
call npm run build || exit /b 1
echo.
echo LAVIC V3 CLEAN VALIDADA COM SUCESSO.
