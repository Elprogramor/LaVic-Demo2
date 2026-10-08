@echo off
setlocal
node tooling/validate-storefront-v1.12.mjs || exit /b 1
call npm run typecheck -w @lavic/storefront || exit /b 1
call npm run build -w @lavic/storefront || exit /b 1
echo.
echo STOREFRONT V1.12 VALIDADA COM SUCESSO.
