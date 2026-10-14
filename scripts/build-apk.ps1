$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-21.0.12.101-hotspot"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
Set-Location "C:\Proyectos\Juego de prueba\android"
Write-Host "Iniciando gradlew assembleDebug..."
& .\gradlew.bat assembleDebug *> "C:\Proyectos\Juego de prueba\build_apk.log"
if ($LASTEXITCODE -eq 0) {
    Write-Host "Gradle terminado con exito."
    $apkSrc = "C:\Proyectos\Juego de prueba\android\app\build\outputs\apk\debug\app-debug.apk"
    $apkDest = "C:\Proyectos\Juego de prueba\BlackjackTorre21.apk"
    if (Test-Path $apkSrc) {
        Copy-Item -Path $apkSrc -Destination $apkDest -Force
        Add-Content -Path "C:\Proyectos\Juego de prueba\build_apk.log" -Value "`n[SUCCESS] APK copiado a $apkDest"
    }
} else {
    Add-Content -Path "C:\Proyectos\Juego de prueba\build_apk.log" -Value "`n[ERROR] Gradle fallo con codigo $LASTEXITCODE"
}
