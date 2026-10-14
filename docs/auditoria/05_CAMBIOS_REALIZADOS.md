# 05 — REGISTRO DE CAMBIOS REALIZADOS Y TRAZABILIDAD

A continuación se documentan con precisión todos los cambios introducidos en el proyecto durante el proceso de auditoría y saneamiento:

---

### 1. Archivo: `js/game.js`
- **Motivo del cambio:**
  1. Conexión del "Pacto del Gran Tahúr" (`gambler_pact`): validación de mínimo 10 HP en apuestas, deshabilitación de opciones inválidas en la UI y multiplicador x3.5 en ataque por Blackjack.
  2. Prevención de botín infinito tras vencer la Torre: clave persistente `blackjack_victory_cards_claimed_${class}_${diff}`, deduplicación estricta y tope lógico de seguridad de 12 naipes (`MAX_PERSISTENT_EXTRA_CARDS`).
  3. Integración de la pestaña "🃏 MI MAZO" en la Ficha del Héroe (`openHeroSheet`), desglosando sellos arcanos y naipes extra obtenidos.
  4. Saneamiento del contador de cartas de la tienda de `52/52` a `52 + extraCards.length`.
  5. Hook centralizado `calculateHandScore` para cartas dinámicas (J Doble, Q Versátil, K Cambiante, 10 Oscuro, Ás Par, 7 Maldito, Comodín Fiesta, 7 Astral).
  6. Cableado activo de combate para naipes de la Arena (As Diamante +4 escudo, Rey Picas Blackjack x3, Reina Corazones +8 HP, Sota Tréboles +15 criptas).
  7. Almacenamiento de contingencia en memoria viva (`_memoryStorageFallback` y `_storageBroken`) ante excepciones de cuota en `localStorage`.
- **Efectos esperados:** Mecánicas vivas y funcionales, persistencia robusta y eliminación de vulnerabilidades de repetición.
- **Pruebas asociadas:** `test-gambler-pact.js`, `test-phase-c-victory-loot.js`, `test-phase-e-dynamic-cards.js`, `test-royal-billing.js`.

---

### 2. Archivo: `js/improvements.js`
- **Motivo del cambio:**
  1. Implementación de `_initHardwareBackButtonHandler()`: intercepta el botón físico Atrás de Android (`document.addEventListener("backbutton")`) y la tecla Escape (`window.addEventListener("keydown")`), cerrando modales en orden de prioridad y abriendo la pausa si está en combate.
  2. Ajuste del modal de confirmación `showGameConfirm` y toasts para interactuar correctamente con el ciclo de vida móvil.
- **Efectos esperados:** La aplicación responde como una app Android nativa ante gestos de navegación hacia atrás, sin minimizarse abruptamente.
- **Pruebas asociadas:** `check-integrity.js`, `test-phase1-mobile-blockers.js`.

---

### 3. Archivo: `index.html`
- **Motivo del cambio:**
  1. Creación de la estructura del modal de finalización de victoria `screen-victory-reward-saved-modal` con botones `[⚔️ NUEVA ASCENSIÓN]` y `[🏠 MENÚ PRINCIPAL]` y botón de cierre `✕`.
  2. Botón de cierre `✕` incorporado en `screen-mastery-forge-modal`.
  3. Contenedores y badges para la pestaña "🃏 MI MAZO" en la Ficha del Héroe.
- **Efectos esperados:** Salida limpia de la pantalla de victoria sin recargar la página ciegamente y visualización del mazo propio.
- **Pruebas asociadas:** `check-integrity.js`, `test-phase-c-victory-loot.js`.

---

### 4. Archivo: `css/style.css`
- **Motivo del cambio:**
  1. Corrección de solapamiento en el menú de título: regla `#screen-title > * { flex-shrink: 0; }` y fijación de `.title-nav-tabs` con `flex: 0 0 auto !important; min-height: max-content !important;`.
  2. Estilos para `.won-loot-card`, `.card-loot-badge`, `.hero-deck-card-grid` y etiquetas del mazo.
- **Efectos esperados:** Pestañas estables en cualquier resolución de pantalla e insignias visuales claras en los naipes de botín.
- **Pruebas asociadas:** `test-phase1-mobile-blockers.js`.

---

### 5. Archivo: `package.json`
- **Motivo del cambio:**
  1. Incorporación formal del script `"build:apk": "scripts\\build-apk.bat"`.
  2. Inclusión en la cadena `test` de las suites de prueba: `test-gambler-pact.js`, `test-phase-c-victory-loot.js` y `test-phase-e-dynamic-cards.js`.
- **Efectos esperados:** Trazabilidad de compilación y cobertura de tests automatizada de 32 suites.
- **Pruebas asociadas:** `npm test`, `npm run verify`.

---

### 6. Archivos Creados
- `scripts/test-gambler-pact.js`: Suite de validación del pacto del Tahúr.
- `scripts/test-phase-c-victory-loot.js`: Suite de validación de recompensas de torre y visor de mazo.
- `scripts/test-phase-e-dynamic-cards.js`: Suite de validación de cartas dinámicas y catálogo de arena.
- `docs/auditoria/01_INFORME_GENERAL.md`
- `docs/auditoria/02_INVENTARIO_Y_ARQUITECTURA.md`
- `docs/auditoria/03_HALLAZGOS_Y_ERRORES.md`
- `docs/auditoria/04_LOGICA_Y_CASOS_DE_PRUEBA.md`
- `docs/auditoria/05_CAMBIOS_REALIZADOS.md`
- `docs/auditoria/06_GUIA_DE_COMPILACION_Y_VALIDACION.md`
- `BlackjackTorre21.apk`: Binario APK compilado para Android.
- `BlackjackTorre21.apk.bak`: Respaldo del APK previo de línea base.
