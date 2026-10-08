@echo off
setlocal
node tooling/validate-storefront-v2.0.mjs || exit /b 1
call npm run typecheck -w @lavic/storefront || exit /b 1
call npm run build -w @lavic/storefront || exit /b 1
echo.
echo STOREFRONT V2.0 VALIDADA COM SUCESSO.
