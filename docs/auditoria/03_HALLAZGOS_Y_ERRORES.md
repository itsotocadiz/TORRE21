# 03 — REGISTRO DE HALLAZGOS Y AUDITORÍA DE ERRORES

A continuación se detalla la matriz de hallazgos identificados, priorizados y verificados en el proyecto:

---

### Hallazgo H-01
- **ID:** H-01
- **Prioridad:** P1 (Alta)
- **Categoría:** Ciclo de vida / UX Móvil
- **Ubicación:** `js/improvements.js:1493-1570`
- **Problema:** Ausencia de captura del botón Atrás (Hardware Back Button) de Android y de la tecla Escape.
- **Evidencia:** Al pulsar el botón físico o gesto Atrás en un dispositivo Android mientras se navegaba en la Ficha del Héroe, Códice o Menú de Ajustes, el WebView salía intempestivamente de la aplicación sin cerrar el modal.
- **Reproducción:** Abrir la app -> Abrir Ficha del Héroe -> Presionar botón Atrás de Android -> La app se minimiza o cierra.
- **Causa raíz:** Capacitor no asigna por defecto el evento `backbutton` a la jerarquía de modales DOM.
- **Impacto:** Experiencia de usuario defectuosa y abandono no deseado de la partida activa.
- **Corrección propuesta:** Implementar `_initHardwareBackButtonHandler()` escuchando `document.addEventListener("backbutton")` y `window.addEventListener("keydown")`, resolviendo en orden inverso de profundidad (confirm -> modales visibles -> pausa en combate).
- **Riesgo de regresión:** Mínimo. No altera la lógica interna de juego.
- **Validación:** Comprobado mediante simulación de eventos en entorno web y tests de integración.
- **Estado:** **Corregido y Validado**.
- **Confianza:** Confirmado.

---

### Hallazgo H-02
- **ID:** H-02
- **Prioridad:** P2 (Media)
- **Categoría:** Robustez / Persistencia
- **Ubicación:** `js/game.js:235-275`
- **Problema:** Fallo pasivo de almacenamiento ante excepciones de cuota en `localStorage`.
- **Evidencia:** En `_saveSecure` y `_loadSecure`, un error de cuota o restricción de política privada (`QuotaExceededError`) solo emitía `console.warn` y provocaba que las lecturas subsiguientes devolvieran `null`.
- **Reproducción:** Simular bloqueo de `localStorage.setItem` mediante mock -> Guardar progreso de run -> Intentar leer -> Los datos se pierden.
- **Causa raíz:** Ausencia de almacenamiento de contingencia en memoria viva (in-memory cache) cuando el sistema restringe el acceso al disco.
- **Impacto:** Pérdida del progreso de la partida en curso si el sistema restringe temporalmente el almacenamiento.
- **Corrección propuesta:** Añadir `_memoryStorageFallback` y flag `_storageBroken` que retengan el estado en la sesión actual mientras el storage físico se restablece.
- **Riesgo de regresión:** Bajo. Se asegura que `localStorage.removeItem` y `clear()` limpien la memoria para evitar interferencia en pruebas limpias.
- **Validación:** Validado en `test-royal-billing.js` y `test-sprint1-progression.js`.
- **Estado:** **Corregido y Validado**.
- **Confianza:** Confirmado.

---

### Hallazgo H-03
- **ID:** H-03
- **Prioridad:** P1 (Alta)
- **Categoría:** Lógica de Juego / Pactos
- **Ubicación:** `js/game.js:9255-9265` y `js/game.js:10400-10410`
- **Problema:** "Juramento del Gran Tahúr" (`gambler_pact`) no imponía la apuesta mínima de 10 HP ni el daño x3.5 en Blackjack.
- **Evidencia:** El jugador podía apostar 0 o 5 HP libremente aun teniendo activo el pacto. El daño de Blackjack ejecutaba el multiplicador x1 estándar.
- **Reproducción:** Iniciar partida -> Elegir pacto del Tahúr -> Ir a pantalla de apuestas -> Opción de 5 HP habilitada -> Daño de Blackjack sin bonificación.
- **Causa raíz:** La clave `p.curse === "gambler_pact"` no era leída por `placeBet` ni `showBetScreen` ni `playerAttack`.
- **Impacto:** Mecánica de alto riesgo rota e inocua para el jugador.
- **Corrección propuesta:** Validar el mínimo de 10 HP en `placeBet` (permitiendo saldo menor si el HP actual es inferior a 10), deshabilitar opciones <10 en `showBetScreen` con tooltip explicativo, y multiplicar el daño de Blackjack por x3.5 en `playerAttack`.
- **Riesgo de regresión:** Nulo. Se verificó que el jugador con menos de 10 HP no sufra bloqueo (softlock).
- **Validación:** Test dedicado `scripts/test-gambler-pact.js` (PASS).
- **Estado:** **Corregido y Validado**.
- **Confianza:** Confirmado.

---

### Hallazgo H-04
- **ID:** H-04
- **Prioridad:** P1 (Alta)
- **Categoría:** Lógica de Progresión / Recompensas
- **Ubicación:** `js/game.js:14030-14115`, `index.html:1480-1510`
- **Problema:** Bucle de reclamación infinita de naipes al ganar la Torre y reinicio ciego con `location.reload()`.
- **Evidencia:** Al vencer en el Piso 21, se entregaban 3 cartas permanentemente en cada recarga sin límite; no había dónde visualizarlas y el modal obligaba a recargar la página web.
- **Reproducción:** Superar piso 21 -> Confirmar cartas -> Recargar -> Se vuelve a ofrecer selección de 3 cartas -> Cartas duplicadas acumuladas sin límite en la baraja.
- **Causa raíz:** Falta de flag de victoria reclamada por combinación héroe/dificultad y falta de deduplicación estricta al guardar.
- **Impacto:** Desbalance severo del juego y vulnerabilidad de repetición de botín.
- **Corrección propuesta:** Implementar flag `blackjack_victory_cards_claimed_${class}_${diff}`, deduplicación por palo/rango, tope estricto de 12 cartas extra (`MAX_PERSISTENT_EXTRA_CARDS`), pestaña "🃏 MI MAZO" en la Ficha del Héroe, y modal con botones directos `[⚔️ NUEVA ASCENSIÓN]` y `[🏠 MENÚ PRINCIPAL]`.
- **Riesgo de regresión:** Nulo. Compatible con ascensión limpia.
- **Validación:** Test dedicado `scripts/test-phase-c-victory-loot.js` (PASS).
- **Estado:** **Corregido y Validado**.
- **Confianza:** Confirmado.

---

### Hallazgo H-05
- **ID:** H-05
- **Prioridad:** P1 (Alta)
- **Categoría:** Lógica de Naipes / Combate
- **Ubicación:** `js/game.js:1200-1280` y `js/game.js:6300-6420`
- **Problema:** Cartas especiales dinámicas (J Doble, Q Versátil, K Cambiante, etc.) y cartas de la Arena sin cableado activo en combate.
- **Evidencia:** Las cartas de la Arena se compraban pero actuaban como naipes comunes; sus efectos de robo, vampirismo o escudo no se disparaban en combate.
- **Reproducción:** Comprar As de Diamantes (Baluarte) en la Arena -> Iniciar combate -> No otorga escudo al robarlo.
- **Causa raíz:** Catálogo estático sin integración en `calculateHandScore`, `startNewHand` y `playerAttack`.
- **Impacto:** Contenido adquirido en la Arena sin utilidad real en partida.
- **Corrección propuesta:** Hook centralizado de puntuación para las 7 cartas dinámicas y disparadores específicos de combate para las 5 cartas de la Arena (As Diamante +4 escudo, Rey Picas Blackjack x3, Reina Corazones +8 HP, Sota Tréboles +15 criptas).
- **Riesgo de regresión:** Verificado contra posibles desbordamientos de mano en 21.
- **Validación:** Test dedicado `scripts/test-phase-e-dynamic-cards.js` (PASS).
- **Estado:** **Corregido y Validado**.
- **Confianza:** Confirmado.

---

### Hallazgo H-06
- **ID:** H-06
- **Prioridad:** P2 (Media)
- **Categoría:** Interfaz / Layout Flexbox
- **Ubicación:** `css/style.css:457`, `css/style.css:6608`
- **Problema:** Solape de las pestañas del menú principal (#screen-title) por los botones de Reanudar y Leyenda.
- **Evidencia:** Las pestañas de navegación (Torre, Arena, Lore, Tienda, Config) se aplastaban verticalmente a altura 0 cuando aparecía el botón "Reanudar Run".
- **Reproducción:** Iniciar run -> Salir al menú -> Observar el menú principal -> Pestañas tapadas por los bloques superiores.
- **Causa raíz:** `.title-nav-tabs` tenía un flex-shrink no restringido dentro de un contenedor flex con overflow.
- **Impacto:** Bloqueo visual e imposibilidad de acceder a pestañas en dispositivos con pantallas pequeñas.
- **Corrección propuesta:** Añadir `#screen-title > * { flex-shrink: 0; }` y fijar `.title-nav-tabs` con `flex: 0 0 auto !important; min-height: max-content !important;`.
- **Riesgo de regresión:** Nulo. Mejora la estabilidad responsiva.
- **Validación:** Validado en suite `test-phase1-mobile-blockers.js`.
- **Estado:** **Corregido y Validado**.
- **Confianza:** Confirmado.
