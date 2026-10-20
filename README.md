# ♠ BLACK JACK: LA TORRE DEL 21 ♠

Roguelike táctico de cartas para Android y Web basado en la mística del 21, combate estratégico por turnos, progresión RPG profunda y ascensión procedural.

---

## 📱 Descarga del APK para Móviles

El proyecto cuenta con **compilación continua automatizada (CI/CD)** mediante GitHub Actions. Cada actualización genera automáticamente un instalador APK listo para Android:

👉 **[Descargar última versión (APK) en GitHub Releases](https://github.com/itsotocadiz/TORRE21/releases)**

1. Descarga el archivo `BlackjackTorre21.apk` desde tu celular Android.
2. Ábrelo para instalar o actualizar (permite la instalación de aplicaciones de fuentes confiables si tu dispositivo lo solicita).
3. ¡Asciende por la Torre!

---

## 🎮 Características Principales

### ⚔️ Combate D&D + Blackjack
* **Duelos Tácticos al 21:** Cada carta extraída de la baraja suma hacia el 21. Si te plantas o consigues Blackjack, desatas un impacto devastador contra tu adversario.
* **Mecánica ¡DOBLAR! (Double Down):** Con tus 2 cartas iniciales, puedes duplicar tu apuesta de combate para robar exactamente 1 última carta: ¡daño multiplicado x2 si vences, o contraataque multiplicado x2 si caes!
* **Afinidad Elemental por Palos de la Baraja:**
  * ♠️ **Picas:** Daño físico perforante y estocadas críticas.
  * ♦️ **Diamantes:** Generación de baluarte y escudos protectores.
  * ♥️ **Corazones:** Regeneración de vitalidad y curación arcana.
  * ♣️ **Tréboles:** Carga de Overdrive, robo de recursos y fortuna de cripta.
* **Sistema D&D de Tiradas:** Críticos naturales (Nat 20), impacto vorpal en Blackjack Natural, fintas con tiradas de salvación basadas en Destreza/Inteligencia y pifias críticas (Nat 1 / BUST).
* **Oleadas de Rivales y Muerte Súbita:** En cada piso combates contra oleadas de esbirros antes de encarar al jerarca. Al llegar al límite de manos entra el **Modo Furia / Muerte Súbita** con daño multiplicado exponencialmente.

### 🗺️ Campaña en 6 Actos (Estilo Diablo II)
* **21 Pisos de Ascensión:** Estructurados en 6 Capítulos temáticos que recorren desde los confines de las catacumbas hasta el trono supremo.
  * **Acto I (P.1 a P.3):** Criptas Sombrías • Jefe: *Dante de Picas*.
  * **Acto II (P.4 a P.6):** Caverna de Hielo • Jefe: *Valquiria de Diamantes*.
  * **Acto III (P.7 a P.10):** Bastión Enano • Jefe: *Archimago de Tréboles*.
  * **Acto IV (P.11 a P.14):** Inframundo Arcano • Jefe: *El Dragón Ancestral*.
  * **Acto V (P.15 a P.18):** Pico del Juicio • Jefe: *Víbora de Sombras*.
  * **Acto VI (P.19 a P.21):** Trono del Caos • Jefe Final: *El Rey del 21*.
* **Portal de Waypoints:** Desbloqueo de puntos de teletransporte permanentes entre actos guardados en almacenamiento local.
* **3 Dificultades Maestras:** *Normal*, *Pesadilla* e *Infierno*, con escalado de IA enemiga, botines superiores y mutadores de ascensión.

### 🧙 4 Clases de Héroes y Progresión RPG
* **Caballero:** Tanque inamovible con armadura de placas, generación de escudo protector pasivo y mitigación de daño físico.
* **Pícaro:** Maestro del filo crítico, faroles de combate y generación acelerada de oro.
* **Monje:** Especialista en concentración mental (+1 punto táctico con 18-19 de mano), esquiva y curación sostenida.
* **Nigromante:** Cosechador de almas enemigas al liquidar rivales, transmutación de daño en salud y pactos prohibidos.
* **Árbol de Talentos Elemental:** Progresión permanente en 4 ramas (♠️ Filo, ♦️ Baluarte, ♥️ Vitalidad, ♣️ Fortuna) con bonificaciones porcentuales acumulativas para cada héroe.
* **Aspectos y Skins:** Vestiduras cosméticas (Clásica, Dorada, Sombra, Loto, Lich, etc.) con maestrías permanentes.

### 🏟️ Coliseo Arena PvP (Duelos de Asaltos a K.O.)
* Duelos de alto voltaje contra campeones de la torre por asaltos continuos hasta vaciar la barra de salud (HP) del adversario a 0.
* **Bote de Fichas Progresivo:** Apuestas acumulables entre asaltos.
* **Duelos Psicológicos de Farol:** Plantarse con manos engañosas (14-16) para forzar al rival a arriesgar de más y sufrir BUST (+50% de daño).
* **Barra de Overdrive & Mutadores:** Habilidades tácticas de clase al llenar la barra de impacto.

### 🎨 Arte Vectorial & Sonido
* **Estilo Paper Mario:** 57 ilustraciones vectoriales SVG procedurales en alta definición (héroes, enemigos, fondos recortados y efectos).
* **Prólogo en Cómic Vertical:** Cinemática de 7 viñetas interactivas con narrativa inmersiva.
* **Banda Sonora Completa:** Pistas orquestales y jazz oscuro dedicadas para Título, Combate, Jefes, Bazar y Fogata bajo licencia libre CC0.

---

## 📜 Historial de Versiones (Changelog)

### [v1.5.0] — Octubre 2026 (Actual)
* **Unificación en el Árbol de Talentos Permanente (Metaprogresión Diablo II / PoE):** Se eliminó el sistema arcaico del "Altar del Legado" y los 5 puntos planos de estadísticas por nivel. Ahora toda la progresión se canaliza en el Árbol de Talentos en 4 ramas elementales (♠️ Filo/Picas, ♦️ Baluarte/Diamantes, ♥️ Vitalidad/Corazones, ♣️ Fortuna/Tréboles), otorgando mejoras porcentuales acumulativas para cada héroe.
* **Depuración del HUD de Combate (Fin del Dado):** Eliminado el dado `🎲 % Seguro` para limpiar la interfaz. El HUD ahora destaca exclusivamente dos indicadores tácticos contiguos:
  * `[⚡ CRÍTICO: X%]`: Probabilidad de Golpe Crítico (19–21), potenciada en vivo por la Rama del Filo, afinidad de naipes y sellos.
  * `[⚔️ ATAQUE: Y HP (21: Z)]`: Cálculo en tiempo real del daño neto que asestarás con tu mano actual vs impacto aplastante de 21 (y `⚡ ATAQUE x2` al doblar).
* **Alineación de la Arena PvP (Combate a K.O., No BO3):** Corregidas todas las descripciones del juego y manuales que aludían incorrectamente a "al mejor de 3". La Arena es oficialmente un **Duelo de Asaltos Continuos a K.O. de HP** donde cada mano ganada inflige daño directo hasta noquear al rival a 0 HP.
* **Reparación de Modales y Tutorial Inicial Modernizado:** Independizados los contenedores de los modales de Talentos y Tutoriales para garantizar apertura táctil instantánea. Actualizado el tutorial de inicio de primera partida (`showFirstRunTutorial`) con las mecánicas vigentes (Regla del 21, ¡DOBLAR! x2, los 4 Palos Arcanos, Crítico y Ataque, Muerte Súbita y Reliquias Demoníacas).
* **Sistema de Campamento de Guardado (Pausar y Continuar):** Salir al menú principal desde la pausa in-game (`🏕️ SALIR AL CAMPAMENTO`) ya no destruye tu ascensión activa; guarda el piso y cartas para reanudar con **"CONTINUAR ASCENSIÓN"**.
* **Reliquias del Demonio (Draft Roguelike Diablo II):** Al derrotar al líder de cada Acto (pisos 3, 7, 11, 15 y 19), se despliega un draft de 3 cartas/reliquias demoníacas a elegir.
* **Rebalanceo Numérico Integral de los Actos II al VI:** Corrección del estancamiento defensivo. Los rivales escalan agresivamente (Acto II PWR 6-7, Acto III PWR 9-11, Acto IV PWR 13-15, Acto V PWR 16-18, Acto VI PWR 20-22).
* **21 / Blackjack Crítico del Rival:** Perfora 4 puntos de DEF y desata impacto vorpal garantizado (mínimo 5 HP penetrante).
* **Control Táctil y Navegación:** Botón `◀ VOLVER` en la selección de capítulos/waypoints de la Campaña y debounce táctil de 350ms en "Pedir Carta".

### [v1.4.0] — Octubre 2026
* **Corrección Crítica de ¡DOBLAR!:** Solucionado el congelamiento de combate tras pulsar "⚡ ¡DOBLAR!". Ahora ejecuta la jugada rival, evalúa el desenlace, aplica multiplicadores `x2` y muestra el botón de Siguiente Ronda.
* **Fluidez en Batallas de Oleadas:** Solucionado el bug donde el segundo enemigo aparecía "sin energía" (0% HP fantasma) y con botones bloqueados. Limpieza total de clases de animación y reactivación inmediata de controles.
* **Rebalanceo Numérico del Combate:**
  * Caballero reajustado a 80 HP, 2 DEF y 4 Escudo inicial (fin de la invulnerabilidad monótona de los primeros pisos).
  * Monje ajustado a 1 DEF.
  * Enemigos del Acto I reforzados ofensivamente (Duende 4 PWR, Alimaña 4 PWR, Esqueleto 5 PWR).
  * Nueva fórmula de contraataque rival dinámica proporcional al margen de naipes perdidos.
* **Unificación de Campaña (Acto I):** Unificado oficialmente a 3 Pisos (`P.1/3`, `P.2/3` y `P.3/3` Boss Dante de Picas), eliminando remanentes de pisos antiguos.
* **Integración y Tests:** Nueva suite de pruebas `test-double-down.js`. Suite global ampliada a **42 suites de pruebas (100% aprobadas)**.

### [v1.3.0] — Octubre 2026
* **Campaña Estilo Diablo II:** Estructuración de los 21 pisos en 6 Actos con Waypoints y dificultades Normal, Pesadilla e Infierno.
* **Sistema de Atributos RPG:** Introducción de puntos libres (STR, DEX, INT, VIT) al subir de nivel con escalado suave de EXP y anti rubber-banding.
* **Combate D&D 21:** Escuelas de naipes por palos, tiradas de salvación y multiplicadores de impacto (Nat 20, Vorpal, Pifia).
* **Mecánica de Oleadas:** Combates secuenciales por piso antes de encarar al jerarca.

### [v1.2.0] — Octubre 2026
* **Coliseo PvP Definitivo:** Fusión de Planes A al E en la Arena (Bote Progresivo, Doblar x2, barra de Overdrive, Farol Psicológico y Mutadores).
* **Mercado Rotativo de Cartas:** Tienda de naipes dinámicos con habilidades activas y pasivas.
* **Catálogo de 25 Logros:** Sistema de metas con recompensas en Criptas y Oro.
* **Sincronización en la Nube:** Soporte de vinculación con cuenta de Google y Firebase Sync.

### [v1.1.0] — Octubre 2026
* **Splash Screen de la Varita Arcana:** Bienvenida táctil interactiva.
* **Prólogo en Cómic Vertical:** Secuencia visual de 7 actos que introduce el lore de la Torre y los 4 palos arcanos.
* **Motor de Audio Estéreo:** Gestión nativa de pistas de fondo (combate, bazar, fogata, jefe) y efectos sonoros hápticos.
* **Premio Diario y Minijuego de Dados:** Recompensas de retención diaria con límite de tiradas y multiplicador de calaveras.

### [v1.0.0] — Octubre 2026
* **Lanzamiento Fundacional:** Motor de combate Blackjack por turnos, 4 héroes arquetípicos, ascensión inicial procedural y Rueda del Destino.
* **CI/CD Automatizado:** Pipeline de compilación Android en GitHub Actions con Capacitor 7, Gradle 8.14 y Java 21 LTS.

---

## 🛠️ Tecnologías y Arquitectura

* **Motor Frontend:** Vanilla JavaScript (ES6+ modular, sin dependencias pesadas), HTML5 Canvas 2D, CSS3 Glassmorphism y Flexbox/Grid adaptativo.
* **Wrapper Móvil:** [Capacitor](https://capacitorjs.com/) v8 (App, Haptics, Status Bar).
* **Build System:** Gradle 8.14.3 + Java 21 LTS (Temurin / Adoptium).
* **Target SDK:** Android 36 (Android 16 Ready).
* **Arquitectura de Código:** La raíz del proyecto (`index.html`, `js/`, `css/`, `assets/`) es la **única fuente de verdad**, sincronizada hacia `www/` y `android/app/src/main/assets/public/`.

---

## 🚀 Comandos del Proyecto

### Verificación Integral (Obligatoria)
```powershell
& npm.cmd run verify      # Ejecuta las 42 suites de pruebas + check de integridad + sincronización
& npm.cmd test            # Ejecuta únicamente las 42 suites de pruebas unitarias
node scripts/check-integrity.js  # Auditoría estricta de assets, IDs del DOM y reglas duras
```

### Sincronización de Fuentes
```powershell
node scripts/sync-all.js  # Copia idéntica: raíz -> www/ -> android/.../public/
```

### Compilación Local de Android (APK)
```powershell
npm run build:apk         # Ejecuta el script de compilación desacoplado en Windows
# o mediante Capacitor:
npm run cap:sync
cd android
./gradlew assembleDebug
```

---

## 📜 Licencia y Atribución

* **Música y Efectos de Sonido:** Dominio público ([CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)).
* **Código Fuente y Diseño Lúdico:** Proyecto *Black Jack: La Torre del 21*. Todos los derechos reservados.
