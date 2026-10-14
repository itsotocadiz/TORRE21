console.log(`
======================================================================
  ♠ BLACK JACK: LA TORRE DEL 21 — GUÍA DE COMPILACIÓN DE APK / AAB ♠
======================================================================

El proyecto nativo de Android ya está 100% generado y configurado en:
📁 c:\\Proyectos\\Juego de prueba\\android

Tienes 2 alternativas sencillas y profesionales para compilar el APK:

----------------------------------------------------------------------
OPCIÓN 1: CON ANDROID STUDIO (RECOMENDADO Y MÁS RÁPIDO)
----------------------------------------------------------------------
1. Descarga e instala Android Studio si aún no lo tienes:
   https://developer.android.com/studio
2. Abre Android Studio y haz clic en "Open":
   Selecciona la carpeta: C:\\Proyectos\\Juego de prueba\\android
3. Espera unos segundos a que Gradle sincronice las dependencias.
4. En el menú superior de Android Studio, ve a:
   👉 Build > Build Bundle(s) / APK(s) > Build APK(s)
5. ¡Listo! Al terminar saldrá una notificación:
   "APK(s) generated successfully: locate"
   El archivo 'app-debug.apk' estará listo para instalar en cualquier
   teléfono Android.

----------------------------------------------------------------------
OPCIÓN 2: POR CONSOLA (LÍNEA DE COMANDOS)
----------------------------------------------------------------------
Si tienes JDK (Java Development Kit 17 o 21) instalado en tu PATH:
1. Abre tu terminal en: C:\\Proyectos\\Juego de prueba\\android
2. Ejecuta:
   cmd /c gradlew assembleDebug
3. El archivo APK se generará directamente en:
   android/app/build/outputs/apk/debug/app-debug.apk

----------------------------------------------------------------------
OPCIÓN 3: PARA PUBLICAR EN GOOGLE PLAY STORE (.AAB)
----------------------------------------------------------------------
En Android Studio:
👉 Build > Generate Signed Bundle / APK... > Android App Bundle (.aab)
Sigue los pasos para firmar con tu clave de desarrollador y subirlo
a la consola de Google Play.
======================================================================
`);
