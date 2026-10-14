# 01 — INFORME GENERAL DE AUDITORÍA Y CALIDAD
**Proyecto:** Black Jack: La Torre del 21 (Roguelike Mobile Edition)  
**ID de Aplicación:** `com.blacktower.roguelike`  
**Versión:** 1.0.0 (VersionCode 1)  
**Fecha de Auditoría:** Octubre 2026  
**Auditoría Técnica:** Equipo Sénior de Ingeniería de Software (Arquitectura, Android & QA)

---

## 1. Resumen Ejecutivo

Se ha realizado una auditoría integral técnica, de arquitectura, lógica de videojuego, ciclo de vida móvil y empaquetado Android sobre el proyecto **Black Jack: La Torre del 21**.

El proyecto es un videojuego híbrido de cartas roguelike con ambientación de fantasía oscura y estética de papel recortado (*paper cutout / marioneta*), desarrollado sobre un motor web nativo empaquetado para Android mediante **Capacitor 8.5.2** y construido con **Gradle 8.14.3** y **Java 21 Hotspot**.

### Estado Inicial vs. Estado Final

| Parámetro | Estado Inicial | Estado Final tras Auditoría |
|---|---|---|
| **Suites de Pruebas Automatizadas** | 29 suites históricas | **32 suites automatizadas** (100% PASS, exit code 0) |
| **Control de Integridad de Catálogos** | Parcialmente manual | **0 errores, 0 advertencias** (`scripts/check-integrity.js`) |
| **Sincronización de Fuentes** | Riesgo de desincronización raíz/www/android | **100% idénticas verificado por MD5** (`scripts/sync-all.js --check`) |
| **Botón Atrás (Hardware Back Button)** | Ausente (riesgo de minimizado abrupto de app) | **Soporte universal jerárquico** (cierre de modales y pausa) |
| **Resiliencia de Almacenamiento Local** | `console.warn` pasivo sin fallback | **Fallback de memoria en runtime** anti-corrupción |
| **Solape de Interfaz en Título** | Pestañas aplastadas por botones flotantes | **Flex-shrink 0 & auto-scroll corregidos** |
| **Pacto del Tahúr & Cartas Dinámicas** | Reglas inertes o no invocadas | **Efectos cableados en motor y combate** |
| **Botín de Victoria & Visor de Baraja** | Reclamación ilimitada y sin visor de mazo | **Flag de persistencia, dedupe (máx 12) y pestaña "Mi Mazo"** |
| **Artefacto Compilado (APK)** | Generado previamente | **Nuevo APK generado (`BlackjackTorre21.apk`, 12.45 MB, SHA-256 verificado)** |

---

## 2. Evaluación de Calidad del Proyecto

- **Arquitectura:** Estructura desacoplada y eficiente. La raíz (`index.html`, `js/game.js`, `js/improvements.js`, `css/style.css`, `assets/`) actúa como fuente única de verdad sincronizada hacia los destinos de distribución (`www/` y `android/app/src/main/assets/public/`).
- **Seguridad y Monetización:** Cumple con la directiva estricta de no otorgar contenido de pago sin cobro verificado mediante Google Play Billing, sin diálogos bloqueantes nativos (`alert`/`confirm`) y con políticas de privacidad integradas.
- **Rendimiento:** Carga instantánea fuera de línea. La totalidad de los 57 activos gráficos son vectores SVG ligeros y tipografías WOFF2 locales embebidas, sin llamadas a CDN externas ni retrasos de red.
- **Mantenibilidad:** El código dispone de 32 suites de pruebas unitarias y de integración que validan desde catálogos y probabilidades hasta animaciones SVG y mecánicas matemáticas de Blackjack.

---

## 3. Problemas Prioritarios Abordados

1. **Gestión del Botón Atrás en Android (P1):** La aplicación no interceptaba el botón físico Atrás, provocando salidas accidentales al consultar la Ficha del Héroe, Tienda o Ajustes. Se implementó una pila de cierre contextual de modales en `improvements.js`.
2. **Defensas contra Saturación de Cuota de Storage (P2):** Se dotó a `_saveSecure` y `_loadSecure` de un almacenamiento de contingencia en memoria viva cuando el WebView impone restricciones transitorias.
3. **Mecánicas Incompletas del Pacto del Tahúr y Cartas Especiales (P1):** Se cablearon los efectos matemáticos de apuestas forzadas, multiplicadores de daño de Blackjack y mutaciones dinámicas de naipes (J Doble, K Cambiante, etc.).
4. **Bucle y Duplicación en Botín de Victoria de Torre (P1):** Se solucionó la entrega repetitiva de cartas de botín estableciendo un flag permanente por clase/dificultad y un modal de salida limpio hacia nueva ascensión o menú principal.

---

## 4. Limitaciones del Entorno y Riesgos Residuales

- **Dispositivos Físicos / Emulador en Sesión:** Durante la sesión actual de auditoría no se detectó un emulador o dispositivo Android conectado a `adb`. Por tanto, la validación en Android se fundamenta en la compilación exitosa con Gradle (`assembleDebug`, exit 0), verificación estricta de activos empaquetados y pruebas de integración web/Node.js.
- **Firma de Producción (Release Signing):** El proyecto cuenta con la variante `debug` configurada por defecto. Para publicar en Google Play Store se requerirá configurar un almacén de claves (`keystore`) en `android/app/build.gradle`.

---

## 5. Recomendaciones Principales

1. Mantener siempre la ejecución de `& npm.cmd run verify` antes de cualquier entrega o build.
2. Probar la pulsación del botón Atrás físico en un dispositivo Android de prueba para validar la ergonomía táctil en pantallas OLED/AMOLED con gestos de borde.
3. Mantener el tope de 12 cartas de botín extra en la baraja para preservar el equilibrio matemático del Blackjack original.
