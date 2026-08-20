# Build locally and create a cPanel upload zip (includes components/ + .next/).
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host "Building production app..."
npm run build
if (-not (Test-Path ".next\BUILD_ID")) {
  throw "Build failed: .next/BUILD_ID missing"
}

$required = @(
  "components\Hero.tsx",
  "components\Section.tsx",
  "components\Container.tsx",
  "components\StatCard.tsx",
  "components\TeamCard.tsx",
  "server.cjs",
  "package.json",
  "next.config.mjs"
)
foreach ($f in $required) {
  if (-not (Test-Path $f)) { throw "Missing required file: $f" }
}

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$outZip = Join-Path $root "mappedskills-cpanel-$stamp.zip"
$staging = Join-Path $env:TEMP "mappedskills-cpanel-pack-$stamp"

if (Test-Path $staging) { Remove-Item $staging -Recurse -Force }
New-Item -ItemType Directory -Path $staging | Out-Null

$include = @(
  "app",
  "components",
  "hooks",
  "lib",
  "public",
  "styles",
  "scripts",
  ".next",
  "package.json",
  "package-lock.json",
  "next.config.mjs",
  "postcss.config.mjs",
  "tsconfig.json",
  "next-env.d.ts",
  "server.cjs",
  "components.json"
)

foreach ($item in $include) {
  $src = Join-Path $root $item
  if (-not (Test-Path $src)) {
    Write-Warning "Skip missing: $item"
    continue
  }
  $dest = Join-Path $staging $item
  Copy-Item -Path $src -Destination $dest -Recurse -Force
}

if (Test-Path $outZip) { Remove-Item $outZip -Force }
Compress-Archive -Path (Join-Path $staging "*") -DestinationPath $outZip -Force
Remove-Item $staging -Recurse -Force

Write-Host ""
Write-Host "Created: $outZip"
Write-Host "Upload this zip to ~/ms.mappedskills.com, extract, then:"
Write-Host "  npm install"
Write-Host "  # DO NOT run npm run build on the server"
Write-Host "  # Restart Node app with startup file: server.cjs"
Write-Host ""
Write-Host "Verify on server after extract:"
Write-Host "  ls components/Hero.tsx components/Section.tsx components/Container.tsx"
Write-Host "  test -f .next/BUILD_ID && cat .next/BUILD_ID"
