@echo off
setlocal
set "SCRIPT_DIR=%~dp0"
for %%I in ("%SCRIPT_DIR%..") do set "REPO_ROOT=%%~fI"

if not defined JAVA_HOME (
    if exist "C:\Program Files\Eclipse Adoptium\jdk-21.0.12.101-hotspot" (
        set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.12.101-hotspot"
    )
)
if defined JAVA_HOME set "PATH=%JAVA_HOME%\bin;%PATH%"

cd /d "%REPO_ROOT%\android"
echo [START] Gradle build iniciado a las %TIME% > "%REPO_ROOT%\build_apk.log"
call gradlew.bat assembleDebug --rerun-tasks >> "%REPO_ROOT%\build_apk.log" 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [GRADLE_OK] Compilacion exitosa. Copiando APK... >> "%REPO_ROOT%\build_apk.log"
    copy /Y "%REPO_ROOT%\android\app\build\outputs\apk\debug\app-debug.apk" "%REPO_ROOT%\BlackjackTorre21.apk" >> "%REPO_ROOT%\build_apk.log" 2>&1
    copy /Y "%REPO_ROOT%\android\app\build\outputs\apk\debug\app-debug.apk" "%REPO_ROOT%\TORRE21-v2.0.0.apk" >> "%REPO_ROOT%\build_apk.log" 2>&1
    echo [DONE] APK generado y copiado como BlackjackTorre21.apk y TORRE21-v2.0.0.apk >> "%REPO_ROOT%\build_apk.log" 2>&1
) else (
    echo [ERROR] Gradle fallo con codigo %ERRORLEVEL% >> "%REPO_ROOT%\build_apk.log"
)
endlocal
