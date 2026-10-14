# AGENTS.md — Black Jack: La Torre del 21

## Verificación (obligatoria tras cualquier cambio)

```powershell
& npm.cmd run verify      # tests (38 suites) + check-integrity + sync --check
& npm.cmd test            # solo tests
node scripts\check-integrity.js
node scripts\sync-all.js  # copia raíz -> www/ -> android/public
```

`verify` debe salir con **exit 0, 0 errores / 0 advertencias, 38/38 suites**.

## Reglas duras

- **La raíz es la única fuente de verdad** (`index.html`, `js/`, `css/`, `assets/`). Existen 3 copias: raíz → `www/` → `android/app/src/main/assets/public/`. Editar SOLO la raíz y ejecutar `node scripts\sync-all.js`.
- **Nunca otorgar contenido sin cobro real** (anuncio recompensado, Google Play Billing o equivalente). El fallback de facturación y anuncios recompensados es "próximamente", nunca entregar gratis sin SDK real.
  - Excepción de **moneda de juego**: oro, EXP y Monedas de Cripta sí se ganan gratis (victoria de la Torre = 100 criptas, pacto legendario = 15, login diario = 2..10). Lo prohibido es desbloquear **perks, héroes, vestiduras o packs** sin pagar.
- **Nunca `alert()` / `confirm()` nativos**: usar `showGameToast` / `showGameAlert` / `showGameConfirm` (`js/improvements.js`). La firma canónica de `showGameConfirm` es un objeto `{ title, message, onConfirm, onCancel, okLabel, cancelLabel }`.
- **Nunca exponer códigos/promos en la UI pública.**
- **Pausa real in-game**: Gestionada mediante `gamePaused` (y `window.gamePaused`), la cual congela las animaciones y turnos en `sleep(ms)`.
- **Ciclo de vida móvil**: Gestionado nativamente con `@capacitor/app` (`App.addListener('backButton')`), cerrando modales en pila y menús antes de permitir salir al sistema.
- **Cartas especiales y baraja**: `buildStandardDeck` preserva `specialId`, atributos y slots (`joker_party`, `lucky_seven_astral`, `trinity_hologram`) garantizando su unicidad en la Arena y su efecto dinámico.
- **Ergonomía táctil**: Mínimo 44x44 px en todos los botones y áreas táctiles (WCAG 2.5.5 / Material Design).
- Responder y documentar siempre en **español**.
- `js/game.js` no tiene IIFE (funciones top-level = globales). `js/improvements.js` SÍ usa IIFE y carga DESPUÉS, así que sus `window.x = …` pisan los de `game.js`.
- **Mojibake**: en PowerShell `Get-Content`/`Select-String` salen mal los acentos. Antes de editar un tramo, usar SIEMPRE el tool `read`.

## Comandos de build Android

- Java requerido: `C:\Program Files\Eclipse Adoptium\jdk-21.0.12.101-hotspot` (`JAVA_HOME`). Gradle 8.14.3 NO soporta el Java 25 del JBR de Android Studio.
- `gradlew` directo en shell se mata por timeout → lanzar desacoplado con `Start-Process` y hacer polling de un log.
- Flujo de APK: `assembleDebug` → copiar a raíz como `BlackjackTorre21.apk` (no hay `signingConfigs` ni keystore; `assembleRelease` sale sin firmar).

## Estructura

- `js/game.js` — motor (~13.500 líneas): estados, combate, tienda, catálogos, HUD.
- `js/improvements.js` — IIFE con utilidades UI, pactos del Abismo, facturación, privacidad.
- `assets/` — **57 SVG** "papel recortado" (44 en la raíz, 5 en `cards/`, 8 en `ui/`); los de héroes/poses/skins/enemigos/fondos los genera `scripts/build-sprites.js`. Los 19 JPG/PNG originales están en `originales/` (raíz): NO se empaquetan ni se sincronizan.
- `originales/` — arte original previo al rediseño vectorial. Solo para consulta humana.
- `scripts/` — SOLO herramientas vivas: `sync-all`, `check-integrity`, `build-*` y los `test-*` referenciados en `package.json`. No añadir scripts de un solo uso.

## Tests

La cadena `npm test` está en `package.json` → `scripts`. Si se añade un test, hay que enlazarlo ahí. Los tests de datos usan el patrón de escáner de llaves (`makeScanner`/`extract`) de `scripts/test-abyss-pacts.js` para no disparar `onImprovementsReady()`.
