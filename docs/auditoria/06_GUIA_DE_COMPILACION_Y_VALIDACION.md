# 06 — GUÍA DE COMPILACIÓN, VALIDACIÓN Y ENTREGA

## 1. Requisitos del Entorno

Para compilar y verificar este proyecto se requiere el siguiente entorno en Windows:

| Herramienta | Versión / Ruta Requerida | Propósito |
|---|---|---|
| **Node.js** | v20+ / v22+ (`node`, `npm.cmd`) | Ejecución de scripts, tests y sincronización |
| **Java JDK** | Java 21 LTS (`JAVA_HOME`) | Compilación de Android con Gradle 8.14.3 |
| **Android SDK** | `%ANDROID_HOME%` / `$env:LOCALAPPDATA\Android\Sdk` (API 36, Build-Tools) | Compilación y herramientas nativas |
| **Capacitor CLI** | 8.5.2 (vía dependencias locales de `package.json`) | Empaquetado de Web Assets en Android |

> [!IMPORTANT]
> Gradle 8.14.3 **no soporta** Java 25. Es imperativo que la variable de entorno `JAVA_HOME` apunte al JDK 21 de Adoptium para evitar errores de compatibilidad.

---

## 2. Procedimiento de Verificación Estricta

Antes de compilar, es obligatorio ejecutar la suite de verificación completa:

```powershell
& npm.cmd run verify
```

Este comando encadena secuencialmente:
1. `npm test`: Ejecuta las **32 suites de pruebas** unitarias y de integración.
2. `node scripts/check-integrity.js`: Audita IDs del DOM, assets inexistentes, `console.log` de depuración y diálogos bloqueantes.
3. `node scripts/sync-all.js --check`: Valida mediante sumas MD5 que la raíz, `www/` y `android/app/src/main/assets/public/` son exactamente idénticas.

**Criterio de Aceptación:** Debe terminar con `exit 0`, `0 errores` y `0 advertencias`.

---

## 3. Procedimiento de Sincronización

Si se edita cualquier archivo en la raíz (`index.html`, `js/`, `css/`, `assets/`):

```powershell
node scripts\sync-all.js
```

Copia automáticamente los cambios a `www/` y al directorio de assets públicos de Android.

---

## 4. Compilación del APK

El APK se compila ejecutando el script estandarizado:

```powershell
& npm.cmd run build:apk
```
*O alternativamente vía shell:*
```cmd
call scripts\build-apk.bat
```

### Qué realiza internamente:
1. Configura `JAVA_HOME` al JDK 21 y añade su `bin` al `PATH`.
2. Se posiciona en la carpeta `android/`.
3. Ejecuta `gradlew.bat assembleDebug` redirigiendo la salida a `build_apk.log`.
4. Al finalizar exitosamente, copia el artefacto desde `android/app/build/outputs/apk/debug/app-debug.apk` a la raíz del proyecto como `BlackjackTorre21.apk`.

---

## 5. Ubicación y Trazabilidad del Binario Compilado

- **Ruta del APK final:** `./BlackjackTorre21.apk` (en la raíz del repositorio)
- **Tamaño:** `12.451.350 bytes` (~12.45 MB)
- **Hash SHA-256 Definitivo:** `DAB9C6D7DB06D3F113E7DA22DD2A49794FDB0E83E96CAFC90F0D8ED17634448D`
- **Hash de Línea Base (`BlackjackTorre21.apk.bak`):** `7FBBD1B58CF1E4B0FEEE71400DF35CE0515991DB6E2D13FFF8CF578BF69A9C6B`

---

## 6. Procedimiento de Instalación en Dispositivo Android

1. Conectar el dispositivo Android con depuración USB activada.
2. Ejecutar a través de ADB (asegurando `adb` en PATH o vía SDK):
```powershell
adb install -r ".\BlackjackTorre21.apk"
```
3. Lanzar la aplicación en el dispositivo o mediante comando:
```powershell
adb shell am start -n com.blacktower.roguelike/.MainActivity
```
