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
* **Predictivo Táctico de Daño y Señal Dinámica de Crítico:** Visualización en vivo del daño neto proyectado `⚔️ ATAQUE: X HP` o `⚔️ ATAQUE: X–Y HP` (o `⚡ ATAQUE x2:` al doblar), complementada con una señal visual emergente `⚡ ¡GOLPE CRÍTICO!` animada en pantalla cuando se confirma un impacto crítico por Destreza, afinidad o 19–21.

### 🗺️ Campaña en 6 Actos (Estilo Diablo II)
* **21 Pisos de Ascensión:** Estructurados en 6 Actos temáticos secuenciales que recorren desde los confines de las catacumbas hasta el trono supremo:
  * **Acto I (P.1 a P.3):** Criptas de Picas • Jefe: *Dante de Picas*.
  * **Acto II (P.4 a P.7):** Arenas de Diamante • Jefa: *Valquiria de Diamantes*.
  * **Acto III (P.8 a P.11):** Pantano del Trébol • Jefe: *Archimago del Trébol*.
  * **Acto IV (P.12 a P.15):** Ciudadela del Vacío • Jefe: *Malfas del Vacío*.
  * **Acto V (P.16 a P.19):** Cumbres de la Sombra • Jefe: *Sombra del 21 (BLACK)*.
  * **Acto VI (P.20 a P.21):** Sagrario del Mandinga • Subjefe: *Dragón de Ébano* (P.20) • Jefe Final: *👑 El Mandinga, Señor del 21* (P.21).
* **Portal de Waypoints:** Desbloqueo de puntos de teletransporte permanentes entre actos guardados en almacenamiento local.
* **Dificultades de Ascensión:** *Normal*, *Heroico*, *Mítico*, *Pesadilla* y el desafiante modo *♾️ ENDLESS (Modo Sin Fin)* con biomas astrales y escalado procedural infinito.

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

### [v1.7.4] — Octubre 2026 (Actual)
* **Balanceo de Daño Vorpal y Sincronización Predictiva en Blackjack Natural:**
  * Corregido el solapamiento multiplicativo involuntario en Blackjack Natural (`isNatural21`), donde el multiplicador RPG base (x2.0) se aplicaba conjuntamente con el multiplicador Vorpal (x3.0 / x4.0), provocando picos desmedidos de 140+ HP de daño contra jerarcas. Ahora se aplica un multiplicador vorpal unificado y directo de **x3.0** (o **x4.0** con *Blackjack Heredado*), preservando la letalidad épica sin desvirtuar la progresión táctica.
  * Sincronizados los cálculos predictivos del HUD (`calculateTacticalAttackRange` y `calculateExactTacticalDamage`) con el multiplicador real x3.0 para 2 cartas que suman 21, y x2.0 para 21 con 3 o más cartas.
  * **Erradicación del Residuo de Apuesta Cero en el Log:** Eliminadas las etiquetas `Apuesta: 0 HP` y `+ Apuesta (0)` en el historial de combate cuando no existe una apuesta activa de vida (la cual solo entra en juego bajo el *Juramento del Gran Tahúr* o en el Coliseo Arena).
* **Árbol de Talentos Elemental Expandido (28 Maestrías en 4 Ramas D&D):**
  * Cada rama elemental (♠️ Filo, ♦️ Baluarte, ♥️ Vitalidad, ♣️ Fortuna) se expande a **7 Tiers escalonados** (28 maestrías en total) con costes de 1 a 4 puntos y requisitos de inversión acumulada por rama (`reqBranch`), permitiendo una especialización RPG profunda para cada héroe:
    * **♠️ Filo (Picas):** Afinidad del Filo (daño perforante), Ojo Crítico (+4% crítico por rango), Mella de Armadura (-DEF rival por pica en mano), Estocada Vorpal (+15% daño físico con 20/21), Filo Vampírico (12% robo de vida al asestar crítico), Cuchillas Gemelas (multiplicador crítico x2.2 al ganar con 2+ picas) y Sentencia de Muerte (ejecución fulminante del rival con Blackjack si tiene 25% o menos HP).
    * **♦️ Baluarte (Diamantes):** Afinidad del Baluarte (escudo azul por diamantes), Placas Reactivas (-2 mitigación de contragolpes rivales por rango), Baluarte Inicial (+8 escudo azul de piso por rango), Reflejo Diamantino (devuelve 25% del impacto sufrido si tienes escudo activo), Muralla Inamovible (+2 DEF base permanente), Fortaleza de Ases (+10 escudo al plantarte con As de diamantes) y Égida Inexpugnable (revive a 1 HP con +30 escudo tras un golpe letal, 1 vez por combate).
    * **♥️ Vitalidad (Corazones):** Afinidad Vital (curación por corazones al ganar), Segundo Aliento (+4 HP por rango al ascender de piso), Vigor de Titán (+15 HP Máx permanente por rango), Alquimia Solar (+35% curación de pociones y purga inmediata de Veneno y Quemadura), Sangre de Fénix (+8 HP al derrotar cualquier enemigo), Marea Carmesí (curación x2 duplicada al ganar con 2+ corazones) y Renacimiento Solar (+15 HP y purificación total de dolencias con Blackjack).
    * **♣️ Fortuna (Tréboles):** Afinidad de la Fortuna (oro de cripta por tréboles), Trébol Afortunado (+6% probabilidad clutch en robo de cartas 10/As), Bolsa de la Cripta (+20 oro inicial al arrancar la expedición por rango), Alquimia de Dados (+1 Dado de Reroll gratuito al inicio de cada piso por rango), Mano del Tahúr (25% probabilidad de conservar poción al beberla), Doble o Nada (+25 oro extra y +1 Moneda de Cripta al ganar doblando) y Soberanía Tahúr (+25 oro y +1 Dado de Reroll al lograr Blackjack con tréboles).
* **Integración Total en el Motor de Combate y Transición de Pisos:**
  * Cableados todos los disparadores pasivos y de combate en `resolveHandResult`, `initFloor`, `startTowerAscent`, `usePotion` y en la tirada clutch de `hit`.
* **Rebalanceo de Artefactos de Tienda:**
  * Orbe del Nigromante restaura 100% HP al subir de nivel; Blasón del Desafío inflige 6 daño y otorga +6 escudo en empate; Espuela de Celeridad otorga +8 daño y +15 oro en la primera mano; Daga del Vampiro drena hasta 6 HP en manos ganadoras de 20+.

### [v1.7.3] — Octubre 2026
* **Afinidad Elemental Despertada por el Árbol de Talentos (Tier 1):**
  * Las afinidades elementales de los 4 palos ya no se activan todas a la vez por defecto en cada combate.
  * Cada afinidad se desbloquea invirtiendo puntos en el **Tier 1 de la rama correspondiente**, permitiendo al jugador definir una auténtica **"Línea de Combate"** (Ofensiva/Perforante con Picas, Baluarte de Escudos con Diamantes, Vitalidad/Regeneración con Corazones o Economía con Tréboles), reduciendo el ruido en pantalla y escalando de +2 a +4 de impacto según el rango del talento.
* **Erradicación de los Sellos Pasivos de Forja (`CARD_UPGRADES`):**
  * Eliminadas las antiguas mejoras pasivas genéricas de mazo (*Corazones Sanadores*, *Diamantes Reforzados*, *Tréboles de Fortuna*, *Picas Cortantes*, *Filo de Sangre*, etc.) que se disparaban al robar cartas interrumpiendo el flujo de combate. La Tienda y el mazo de 52 cartas quedan limpios y enfocados en las cartas transmutadas reales y las ramas de talentos.
* **Campaña Completa de 21 Pisos (6 Actos) en Todas las Dificultades:**
  * Sincronizado `maxFloors = 21` en todas las dificultades de campaña (Normal, Heroico, Mítico, Pesadilla), erradicando el corte prematuro en el piso 7. Los jugadores pueden ascender fluidamente a lo largo de los 6 Actos completos en cualquier dificultad.
* **Botín Arcano de Jefes Fuertes (50% Probabilidad de Transmutación en 52 Cartas):**
  * Al derrotar a los jerarcas y guardianes mayores de la Torre (Dante de Picas P.3, Valquiria de Diamantes P.7, Archimago del Trébol P.11, Malfas del Vacío P.15, Sombra del 21 P.19 y Dragón Guardián P.20), existe un **50% de probabilidad** de obtener una Transmutación Arcana.
  * El jugador elige **1 naipe arcano de entre 3 candidatos** (ej. 6 Modular Alquímico, 8 Armónico de Fusión, As Multiplicador x2, Rey Verdugo Crítico x2, 7 Elástico +2/-2, etc.).
  * **Regla Reglamentaria de 52 Cartas:** El naipe arcano transmutado sustituye de inmediato a su carta ordinaria en el mazo activo y en la baraja persistente, garantizando que el jugador mantenga siempre exactamente 52 cartas reglamentarias en mano.
* **Cola de Notificaciones Tácticas de Perks (Fin de Mensajes Superpuestos):**
  * Eliminado el solapamiento visual cuando se activan múltiples Perks Tácticos en una misma mano.
  * Los mensajes se apilan verticalmente de forma dinámica (`top: calc(75px + ${offsetY}px)`) con animación individual de desvanecimiento secuencial (`slideInRight` + `fadeOutToast`).
* **Blindaje y Persistencia de la Run al Reanudar:**
  * Al reanudar una partida guardada (`resumeSavedRun`), se re-vinculan automáticamente las Bendiciones del Destino activas con su catálogo oficial y se fuerza el refresco de `#player-acc-slot` para que el medallón protector del héroe permanezca visible y activo.
* **Unificación del HUD de Defensa y Escudo:**
  * Eliminada la redundancia de escudos duplicados en la pantalla de combate.
  * Unificado el visor de estadísticas mínimas en un formato limpio: `⚔️ PWR  🛡️ DEF (+Escudo)` (ej: `⚔️ 3  🛡️ 2 (+4)` en cian brillante).
* **HUD Interactivo y Explicación Táctil de Calaveras y Tiempo de Mesa:**
  * `#ui-kills` (💀 0/5) y `#table-hand-pill` (MANO 1/5) ahora son interactivos al toque táctil (`explainCryptKills()` y `explainTableHands()`), explicando claramente la apertura de Cofres de Cripta cada 5 bajas y el inicio de la Muerte Súbita al agotar las manos del piso.
* **Reposicionamiento del Banner de Racha (`#player-streak-badge`):**
  * Reubicado hacia el margen superior derecho sin superponerse al avatar del héroe ni tapar el slot de bendiciones.
* **Ajuste del Frenesí en la Intro:**
  * El Frenesí aplica estrictamente su multiplicador x3 de monedas/recursos recolectados durante 15 segundos, sin otorgar recargas indebidas de tiros extra de pelota.
* **Pasivas de Clase Documentadas y Activas:**
  * Actualizadas las biografías del Monje (*Concentración Zen: +1 punto automático al plantarse con 18 o 19*) y del Nigromante (*Devorador de Almas: +8 HP al abatir cualquier enemigo*).
  * Corrección de la resolución de la clase activa en el cálculo de críticos del Árbol de Talentos.

### [v1.7.2] — Octubre 2026
* **Despeje y Optimización Vertical del Menú de Inicio:**
  * Eliminado el banner redundante `«En el trono del piso 21 aguarda El Mandinga...»` de la pantalla de inicio, reduciendo 80px de altura vertical y permitiendo visualizar los héroes y dificultades completas sin scroll en pantallas móviles.
  * Retirada la barra rápida superior (`.daily-reward-quickbar`) que saturaba la portada con botones fragmentados.
* **Erradicación de Perks Duplicados en el Selector de Héroes:**
  * Eliminado el botón `⚡ PERKS` de la tarjeta del héroe en el libro (`renderHeroBook`), unificando las acciones en dos botones amplios y cómodos: `[📊 FICHA DEL HÉROE]` y `[🎨 ASPECTOS]`.
  * La consulta y combinatoria de Perks Tácticos se gestiona de manera coherente dentro de la Ficha del Personaje y el Códice.
* **Reorganización Ergonómica del Flujo de Partida ("Reanudar Ascensión"):**
  * Reubicado el botón dinámico de reanudación (`#container-resume-run`) para situarse **inmediatamente debajo del selector de héroe (`#hero-book-dots`) y sobre el selector de dificultad (`.difficulty-selection-container`)**. Flujo optimizado: *Héroe activo → Reanudar partida guardada → O configurar dificultad para una nueva ascensión*.
* **Recompensa Diaria de Conexión Integrada en Pestaña Tiendas:**
  * Trasladado el botón y estatus de reclamo diario (`openDailyLoginModal()`) desde el inicio a una **tarjeta destacada en la pestaña `🏪 TIENDAS`**, promoviendo el bucle diario de retención de los jugadores hacia el Bazar de forma limpia y sin intrusiones en la pantalla de bienvenida.
* **Talentos Centralizados en la Ficha del Personaje:**
  * Acceso al Árbol de Talentos Permanente (`openHeroTalentsModal()`) consolidado exclusivamente dentro de la pestaña `🌳 TALENTOS` de la Ficha de cada Héroe, eliminando botones genéricos sueltos en el menú.
* **Tutoriales y Guías Paso a Paso Reubicados en LORE:**
  * Los tutoriales interactivos (`openInteractiveTutorialModal()`) y la Guía de Combate D&D se integran de manera intuitiva dentro de la pestaña `📖 LORE` bajo **"Reglas del Blackjack y Guía de Combate"** y el botón destacado de **Tutoriales Interactivos**.
* **HUD de Combate Limpio y Señal Dinámica de Impacto Crítico:**
  * Retirada la píldora fija permanente `[⚡ CRÍTICO: X%]` del HUD superior de combate en Campaña y Arena PvP para despejar la vista de la mesa.
  * Nueva **Señal Visual Dinámica de Crítico** (`.combat-crit-signal`): cuando el jugador asesta un golpe crítico por destreza, mano 19–21 o Blackjack, emerge en pantalla un cartel animado centelleante `⚡ ¡GOLPE CRÍTICO! (x1.5 / x2.0)` con sacudida sutil de pantalla.
* **Predictivo de Daño Táctico Simplificado:**
  * La fórmula predictiva en vivo muestra únicamente el rango honesto y directo: `⚔️ ATAQUE: X HP` o `⚔️ ATAQUE: X–Y HP` (o `⚡ ATAQUE x2:` si se ha duplicado), eliminando coletillas redundantes de texto como `(crít.)` o `(CRÍTICO 21)`.
* **Normalización Narrativa ("Actos" vs "Memorias"):**
  * La ascensión por los 21 pisos de la Torre se define canónicamente en **6 Actos (Actos I al VI)**.
  * Los pasajes de vida y crónicas del Grimorio de cada héroe se unifican bajo la denominación de **"MEMORIAS" (Memoria I a IV)**, eliminando la palabra "Capítulo" para evitar confusiones de progresión.
* **Delimitación Estricta de la Mecánica de Frenesí:**
  * El multiplicador y botón `⚡ FRENESÍ x3` queda delimitado exclusivamente al minijuego de atrapar cartas y monedas de la cinemática de introducción (`#screen-intro`), garantizando que no aparezca como stat ni habilidad incompleta en configuraciones ni menús.

### [v1.7.1] — Octubre 2026
* **Corrección Crítica del Botón "⚡ FRENESÍ x3" y Recarga de Tiros en la Intro:**
  * Desbloqueado el multiplicador x3 de oro: al presionar el botón `[⚡ FRENESÍ x3]`, se activa inmediatamente el temporizador de 15 segundos con multiplicador x3 (`introFrenzyMultiplier = 3`), eliminando el bloqueo que provocaba el fallback del anuncio simulado.
  * Recarga táctica de lanzamientos: si el jugador agotó sus lanzamientos (`throwsLeft <= 0`) o le quedan pocos, el botón recarga automáticamente **+3 lanzamientos extra** de la pelota/héroe para cazar cartas y acumular oro multiplicado en la intro.
  * Sonido triunfal de fanfarria y pulso háptico inmediato.
* **Protección Táctil Anti-Bust en 20 Puntos y Bloqueo en 21:**
  * Advertencia visual en `#btn-hit`: cuando la mano del jugador suma exactamente 20 puntos, el botón cambia de color a ámbar pulsante (`.btn-hit-warn`) con el texto `⚠️ PEDIR (TIENES 20)`.
  * Doble confirmación táctil: el primer toque muestra advertencia de riesgo (`"⚠️ ¡Tienes 20 puntos! Pulsa de nuevo para confirmar riesgo de BUST"`) y cambia a `⚠️ ¿SEGURO? PEDIR`. Solo un segundo toque intencional pide carta, previniendo muertes accidentales por toques involuntarios.
  * Bloqueo automático en 21 o más: el botón se desactiva de forma estricta para evitar pasarse de 21 una vez alcanzado el objetivo.
* **Jackpot Euphoria (Blackjack Natural 21 y Triple 7):**
  * Al sacar Blackjack Natural (21 con 2 cartas) o la combinación cósmica 7-7-7, se desata una sacudida de pantalla pesada (`heavy`), triple pulso háptico rítmico, texto flotante y un Jackpot de Oro extra (+5 Oro por 21 Natural, +15 Oro por Triple Siete).
* **Mutadores del Abismo en Modo Sin Fin (Pisos > 21):**
  * En pisos superiores al 21, se activan dinámicamente modificaciones de entorno cósmico que alteran las reglas del combate:
    * *Tormenta Diamantina:* +6 de Escudo inicial para ambos combatientes.
    * *Eclipse de Picas:* +3 de daño perforante puro por carta de Picas.
    * *Marea Carmesí:* +3 de curación extra por carta de Corazones.
    * *Nebulosa del Trébol:* Oro de manos ganadas multiplicado x2.
* **Física de Caída de Naipes Paper Mario (Micro-rotación Orgánica):**
* **Auditoría DevSecOps y Blindaje para Repositorio Público:**
  * Actualizado `.gitignore` con exclusiones estrictas de prevención para variables de entorno (`.env*`), almacenes de claves y certificados (`*.keystore`, `*.jks`, `*.pem`, `*.key`) y archivos de infraestructura (`google-services.json`, `*service-account*.json`).
  * Sanitización y portabilidad de scripts de compilación (`scripts/build-apk.bat`, `scripts/build-apk.ps1`, `scripts/build-instructions.js`) usando rutas relativas automáticas en lugar de rutas absolutas locales.
  * Sanitización de guías de auditoría eliminando rutas con nombres de usuario de desarrollo local.
* **Preparación para Google Play Store y Seguridad Robusta (Fases 1–3):**
  * **Política de Privacidad Pública y Web Standalone:** Creada página web independiente `privacy-policy.html` y guía de publicación `docs/GUIA_PUBLICACION_PLAY_STORE.md` con respuestas exactas para los cuestionarios IARC (*Simulated Gambling*) y Data Safety de Google Play Console.
  * **Content Security Policy (CSP):** Incorporada cabecera meta CSP estricta en `index.html` para restringir la ejecución de scripts y carga de recursos.
  * **Barajado Criptográfico (CSPRNG):** Sustituido `Math.random()` en `shuffleArray()` por `secureRandom()` con `crypto.getRandomValues()` para garantizar impredecibilidad matemática en el reparto de naipes.
* **Auditoría y Rediseño del Paisaje Sonoro (Rueda del Destino y SFX de Clímax):**
  * **Aislamiento Musical de la Rueda del Destino / Resurrección:** Corregida la fuga musical que mantenía el combate sonando en la pantalla de la Rueda. Al entrar a la Rueda se detiene el combate y se activa la atmósfera solemne de juicio y trance (`startFateWheelMusic`), deteniéndose formalmente al resolver el destino.
  * **Música Enriquecida de la Rueda:** Añadido un tañido periódico de campana catedralicia en Re bajo con arpegios suspendidos para crear una experiencia inmersiva de vida o muerte.
  * **Efectos Sonoros Exclusivos (Stingers):**
    * `playResurrectionSound()`: Acorde mayor celestial arpegiado con campana brillante para el Rayo de Salvación.
    * `playAnnihilationSound()`: Trueno sordo con filtro paso bajo descendente y sub-bajo tenebroso para el Rayo del Juicio y la Lápida.
    * `playJackpotCoinsSound()`: Cascada metálica de 8 monedas para Blackjack Natural y Triple Siete.
* **Auditoría de Diseño, Unificación Tipográfica y Ergonomía Táctil (WCAG 2.5.5):**
  * **Unificación Tipográfica Offline:** Erradicadas las fuentes fantasma externas (`Cinzel`, `Outfit`, `Georgia`) que provocaban degradación a tipos de letra genéricos sin conexión. Toda la interfaz utiliza ahora el sistema local oficial `var(--font-display)` (Fredoka Bold para títulos, marcas e impacto) y `var(--font-ui)` (Nunito para lectura, cuerpos y diálogos).
  * **Eliminación de Microtextos Ilegibles (<10px):** Subsanadas más de 60 ocurrencias de tamaños diminutos (7px, 8px, 8.5px, 9px) en descripciones de Lore, Bazar, Política de Privacidad, Rueda del Destino, Coliseo Arena, Ficha de Héroe y Logros, elevándolos a un rango plenamente legible de 10.5px a 12.5px en pantallas móviles.
  * **Ergonomía Táctil Accesible:** Garantizada una altura de contacto mínima de **44px** (o padding generoso) en todos los botones primarios y de cierre modal (`closeFighterInspect`, `comic-skip-btn`, `rad-btn-*`, `btn-google-auth`, etc.) cumpliendo el estándar WCAG 2.5.5 y Material Design.
  * **Tokens Paper Mario Centralizados:** Consolidada en `:root` la paleta de color y sombras entintadas de recorte (`--paper-ink: #17110c`, `--paper-shadow: 0 3px 0 #17110c`, `--touch-target-min: 44px`).
  * **Saneamiento de Codificación CSS:** Reparado el bloque de efectos holográficos que contenía bytes nulos por mojibake heredado, garantizando un código CSS 100% válido y sin desperfectos sintácticos.

### [v1.7.0] — Octubre 2026
* **Afinidad Elemental de los 4 Palos Conectada en Combate:**
  * ♠️ **Picas (Filo de la Agonía):** Otorga +2 de daño perforante puro directo por naipe al ganar la mano.
  * ♦️ **Diamantes (Baluarte Sagrado):** Genera +2 de Escudo/Baluarte automático al ganar la mano.
  * ♥️ **Corazones (Flujo Vital):** Restaura +2 HP de regeneración al ganar la mano.
  * ♣️ **Tréboles (Fortuna del Tahúr):** Otorga +1 de Oro extra de recompensa al ganar la mano.
* **Visualización Táctica del Ataque en Rango (`⚔️ ATAQUE: Mín–Máx HP (crít.)`):**
  * Sustituido el cálculo estático anterior por un rango honesto y predictivo que desglosa el daño garantizado frente al golpe crítico máximo posible (con soporte para `⚡ ATAQUE x2:` al pulsar ¡DOBLAR!).
* **Árbol de Talentos Expandido v3 (Metaprogresión Larga y Equilibrada):**
  * Rediseño con 20 nodos (5 tiers por rama elemental: Picas, Diamantes, Corazones, Tréboles) con progresión a largo plazo (~30+ partidas) y requisitos acumulativos de inversión.
  * Eliminado el exploit de +2 puntos por cualquier victoria simple; los puntos derivan de la maestría real (`heroLevel - 1` + bonus ganados).
  * Talentos conectados al motor real de combate: Escudo de inicio de piso (`diamonds_1`), mitigación del primer golpe (`diamonds_3`), regeneración por piso (`hearts_2`), curación por bajas (`hearts_3`), potenciación de pociones (`hearts_4`) y probabilidad de conservar poción (`clubs_3`).
* **Cinemáticas de Cambio de Acto de 5 Segundos y Lore Canónico:**
  * Ampliada la duración a 5 segundos con barra de progreso fluida y botón táctil de omisión (skip de 44px).
  * Incorporada la cinemática de introducción al Acto I tras elegir la bendición inicial.
  * Corrección de los jerarcas canónicos: Acto IV (Malfas del Vacío) y Acto V (Sombra del 21 / BLACK).
  * Enriquecido el lore de los 4 héroes bajo la jerarquía canónica: **Mandinga (Señor Supremo del 21) → BLACK (Avatar y Sombra Primigenia) → Heraldos de Palo (Dante de Picas, Valquiria de Diamantes, Archimago de Tréboles, Malfas del Vacío)**.
* **Modo Sin Fin (Endless / Pisos > 21) Renovado:**
  * Eliminada la repetición infinita del dragón.
  * 2 nuevos biomas en acuarela vectorial: La Falla Astral (`bg_zone_endless_astral.svg`) y El Vacío Interminable (`bg_zone_endless_void.svg`).
  * 4 nuevos sprites temáticos Paper Cutout: `enemy_void_titan.svg`, `enemy_astral_herald.svg`, `enemy_chronos_specter.svg` y `enemy_chaos_chimera.svg`.
  * Rotación procedural de sub-jefes cada 5 pisos y jefes supremos del Abismo cada 10 pisos (Mandinga del Abismo, Sombra del 21 Ascendida, Titán del Vacío Eterno).

### [v1.6.2] — Octubre 2026
* **Aislamiento Estructural de la Arena PvP y Menús Principales:**
  * Corregido el cierre omitido de `<div id="screen-arena-pvp-modal">` en `index.html`. Debido a este tag faltante, todos los modales subsiguientes (Árbol de Talentos, Manual del Tahúr/Tutoriales, Selector de Vestiduras/Skins, Salón de Logros y Cinemáticas) quedaban atrapados como elementos hijos de la Arena, provocando que no respondieran en el Menú Principal y aparecieran indebidamente dentro del Coliseo PvP.
  * Selector de Vestiduras/Skins (`#screen-hero-skin-modal`) unificado con la clase `.modal-overlay-center` (`z-index: 10050`, centrado flex absoluto) y resolución automática del héroe activo en el libro.
* **Salvaguarda y Linter DOM Automático (`scripts/check-integrity.js`):**
  * Incorporada la validación automática de balanceo de etiquetas HTML en el pipeline de integridad (`check-integrity.js` y `npm run verify`). Todo cierre huérfano, tag desbalanceado o contenedor abierto sin cerrar bloquea inmediatamente el test impidiendo que este tipo de error estructural vuelva a ocurrir.

### [v1.6.1] — Octubre 2026
* **Árbol de Talentos y Tutoriales en Pantalla Principal (Fotos 1 & 5):**
  * Corregida la apertura de `#modal-hero-talents` y `#modal-interactive-tutorials` con clase `overlay hidden modal-overlay-center` y `z-index: 10050`.
  * Integración con `#screen-levelup` para abrir el árbol y asignar inmediatamente el punto elemental obtenido en la ascensión.
* **Modo ENDLESS y Selector de Dificultades (Foto 2):**
  * Cuatro dificultades clásicas (Normal, Heroico, Mítico, Pesadilla) y la quinta reconvertida en **♾️ ENDLESS (Modo Sin Fin)** con escalado ilimitado de pisos.
  * Eliminado el botón redundante `◀ VOLVER AL MENÚ` dentro del panel de capítulos que provocaba inconsistencias de navegación.
* **Cámara del Destino con Retorno al Menú (Foto 3):**
  * Agregado el botón `◀ VOLVER AL MENÚ PRINCIPAL` (`cancelRunBeforeStart()`) en `#screen-starter-blessing` para abortar limpiamente la run antes de comenzar.
  * Soporte de retroceso con el botón físico/atrás del sistema Android (`backButton`).
* **Cálculo Predictivo Unificado de Ataque y Crítico (Foto 4):**
  * Creada la función `calculateExactTacticalDamage(player, enemy, hand, isDouble)` compartida con idéntica matemática por el HUD y la resolución de combate.
  * El HUD predice con precisión milimétrica el daño neto (incluyendo margen, nivel, armadura rival y crítico activo en 19-21) permitiendo al jugador tomar decisiones tácticas óptimas al pedir carta o plantarse.

### [v1.6.0] — Octubre 2026
* **Cinemáticas Narrativas de Cambio de Acto (3 Segundos):** Al superar al jerarca de cada Acto, se despliega una cinemática vectorial ligera (máximo 3s con skip táctil) con arte del jefe y narrativa exclusiva según la motivación de tu héroe (el honor del Caballero, la apuesta del Pícaro, el zen del Monje o la cosecha de almas del Nigromante).
* **Modales Fijos y Accesibilidad Táctil:** Modales de Talentos y Tutoriales migrados a `game-modal-fixed-overlay` (`position: fixed; z-index: 10005`), garantizando su apertura fluida desde el Menú Principal, la Ficha del Héroe o la ventana de subida de nivel.
* **Animación y Movimiento de Rivales Restaurada:** Corregida la asignación de clases en `initEnemyForCombat`, devolviendo a todos los enemigos y jefes su respiración `@keyframes spriteIdleEnemy`, dimensiones de 96px y balanceo en combate.
* **HUD de Daño Neto Limpio:** `⚔️ ATAQUE: X HP` (o `⚡ ATAQUE x2: X HP`), mostrando únicamente el valor neto final que impactará en el rival tras considerar todos los buffs activos y defensas.
* **Sistema de Golpe Crítico RPG (x1.5 / x2.0):** El porcentaje de crítico escala formalmente con la estadística de Destreza (DEX) y talentos de Filo, aplicando daño amplificado x1.5 (o x2.0 en 21) con destello dorado, texto flotante y sacudida de pantalla.
* **Vestiduras Desbloqueables por Maestría:** La segunda vestidura de cada héroe se desbloquea automáticamente al alcanzar Nivel de Maestría 2 (y la tercera al Nivel 5) sin barreras monetarias iniciales.
* **Navegación Móvil y Botón Atrás de Android:** Separado el panel de selección de capítulos de la dificultad de ascensión, incorporado el botón `◀ VOLVER AL MENÚ` de 44px de alto y enganchado al evento físico `backButton` de Capacitor.

### [v1.5.0] — Octubre 2026
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
