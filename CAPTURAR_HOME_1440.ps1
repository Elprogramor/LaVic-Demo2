param(
  [string]$Url = "http://localhost:3000",
  [string]$Output = "lavic-home-1440.png"
)

$ErrorActionPreference = "Stop"

try {
  Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 4 | Out-Null
} catch {
  Write-Host "[ERRO] Nao foi possivel acessar $Url" -ForegroundColor Red
  Write-Host "Inicie o storefront primeiro com: npm run dev:storefront" -ForegroundColor Yellow
  exit 1
}

$candidates = @(
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
)

$browser = $candidates | Where-Object { $_ -and (Test-Path $_) } | Select-Object -First 1
if (-not $browser) {
  Write-Host "[ERRO] Chrome ou Edge nao encontrado." -ForegroundColor Red
  exit 1
}

$absoluteOutput = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $Output))

$args = @(
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  "--window-size=1440,5230",
  "--virtual-time-budget=3500",
  "--screenshot=$absoluteOutput",
  $Url
)

& $browser $args
if ($LASTEXITCODE -ne 0) {
  Write-Host "[ERRO] O navegador nao conseguiu gerar a captura." -ForegroundColor Red
  exit $LASTEXITCODE
}

if (-not (Test-Path $absoluteOutput)) {
  Write-Host "[ERRO] Arquivo de captura nao foi criado." -ForegroundColor Red
  exit 1
}

Write-Host "[OK] Screenshot criado em:" -ForegroundColor Green
Write-Host $absoluteOutput
