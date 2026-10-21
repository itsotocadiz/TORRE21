$repoRoot = Split-Path -Parent $PSScriptRoot

if (-not $env:JAVA_HOME -or -not (Test-Path $env:JAVA_HOME)) {
    $defaultJdk = "C:\Program Files\Eclipse Adoptium\jdk-21.0.12.101-hotspot"
    if (Test-Path $defaultJdk) {
        $env:JAVA_HOME = $defaultJdk
    }
}
if ($env:JAVA_HOME) {
    $env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
}

$androidDir = Join-Path $repoRoot "android"
$logPath = Join-Path $repoRoot "build_apk.log"
Set-Location $androidDir

Write-Host "Iniciando gradlew assembleDebug..."
& .\gradlew.bat assembleDebug *> $logPath
if ($LASTEXITCODE -eq 0) {
    Write-Host "Gradle terminado con exito."
    $apkSrc = Join-Path $androidDir "app\build\outputs\apk\debug\app-debug.apk"
    $apkDest = Join-Path $repoRoot "BlackjackTorre21.apk"
    if (Test-Path $apkSrc) {
        Copy-Item -Path $apkSrc -Destination $apkDest -Force
        Add-Content -Path $logPath -Value "`n[SUCCESS] APK copiado a $apkDest"
    }
} else {
    Add-Content -Path $logPath -Value "`n[ERROR] Gradle fallo con codigo $LASTEXITCODE"
}

