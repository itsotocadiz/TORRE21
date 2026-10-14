@echo off
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.12.101-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"
cd /d "C:\Proyectos\Juego de prueba\android"
echo [START] Gradle build iniciado a las %TIME% > "C:\Proyectos\Juego de prueba\build_apk.log"
call gradlew.bat assembleDebug --rerun-tasks >> "C:\Proyectos\Juego de prueba\build_apk.log" 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [GRADLE_OK] Compilacion exitosa. Copiando APK... >> "C:\Proyectos\Juego de prueba\build_apk.log"
    copy /Y "C:\Proyectos\Juego de prueba\android\app\build\outputs\apk\debug\app-debug.apk" "C:\Proyectos\Juego de prueba\BlackjackTorre21.apk" >> "C:\Proyectos\Juego de prueba\build_apk.log" 2>&1
    echo [DONE] APK generado y copiado como BlackjackTorre21.apk >> "C:\Proyectos\Juego de prueba\build_apk.log"
) else (
    echo [ERROR] Gradle fallo con codigo %ERRORLEVEL% >> "C:\Proyectos\Juego de prueba\build_apk.log"
)
