# Plan de Trabajo y Diseño Técnico para Antigravity: Black Jack — La Torre del 21 (`itsotocadiz/TORRE21`)

**Proyecto objetivo:** Repositorio `itsotocadiz/TORRE21` (HTML5 + Vanilla JS en `js/game.js` y `js/improvements.js` + Capacitor v8 Android)
**Modo de ejecución:** Auditoría de diseño, arquitectura de cambios y plan de implementación incremental para **Google Antigravity** (sin alterar código en esta fase de planificación).

## 1. Diagnóstico Técnico del Estado Actual del Repositorio

A partir de la inspección del repositorio `itsotocadiz/TORRE21` y sus suites de validación (`scripts/test-*.js`), se identifican tres cuellos de botella estructurales que limitan la retención y el equilibrio matemático del juego:

| Componente Actual | Implementación en Código (`js/game.js` / `js/improvements.js`) | Problema Detectado |
| :--- | :--- | :--- |
| **Progresión de la Torre** | `DIFFICULTY_CONFIGS` define 4 torres lineales aisladas: `normal` (7 pisos), `hard` (9 pisos), `mythic` (11 pisos) y `nightmare` (13 pisos, exige `bj_tower_total_wins >= 3`). | No existen **Capítulos (Actos)** temáticos dentro de cada dificultad. La partida se siente como una escalera única sin hitos intermedios, puntos de control (*waypoints*) ni progresión de campaña estilo *Diablo II*. |
| **Escalado Enemigo vs. Héroe** | Enemigos: `enemyHpFor(enemy)` aplica $\lfloor \text{baseHp} \times (1 + (\text{floor}-1)\times 0.15) \rfloor \times \text{getTowerHeatMultiplier()}$. Héroe: `getMasteryBonuses()` da solo $+6\text{ HP}$, $+\lfloor \text{lvl}/2 \rfloor\text{ PWR}$ y $+\lfloor \text{lvl}/3 \rfloor\text{ DEF}$, mientras `getExpRequiredForLevel()` crece como $60 \times 1.5^{\text{lvl}-1}$. | **Estancamiento (*rubber-banding*) y desbalance explosivo:** el calor de la torre castiga al jugador por subir su Maestría, el costo de XP se dispara exponencialmente desde el nivel 8, pero las estadísticas del héroe crecen de forma lineal y baja. |
| **Combate PvP / Arena ("OVP / PVP")** | `ARENA_RIVALS` y `simulateArenaDamage` calculan $\max(8, \text{winnerPwr} + (\text{winnerScore} - \text{loserScore}) - \text{loserDef}) \times \text{mult}$ al mejor de 3 rondas (`maxRounds: 3`). | Aunque tiene los Planes A–E (Doblar, Farol, Overdrive, Mutadores, Apuestas), el núcleo matemático es una resta plana. No aprovecha la riqueza de **Calabozos y Dragones (D&D)** combinada con las probabilidades del **Blackjack** (tiradas contra Clase de Armadura, críticos naturales con 21, pifias al pasarse, dados de daño por clase y tiradas de salvación). |

## 2. Arquitectura de Diseño Propuesta

### Eje A: Sistema de Progresión Estilo *Diablo II* (3 Dificultades × 6 Capítulos)

En lugar de torres cortas aisladas, la progresión principal se reestructura en una **Campaña de 3 Dificultades Clásicas**, donde cada dificultad contiene **6 Capítulos (Actos)** desbloqueables en orden:

| Dificultad | Nombre en el Juego | Capítulos | Reglas Especiales (Inspiración *Diablo II*) |
| :--- | :--- | :--- | :--- |
| **1. Normal** | **Senda del Novicio** | Capítulos I al VI (5 pisos por capítulo = 30 pisos totales) | Sin penalización de defensa/resistencias. Enemigos estándar y 1 Jefe de Acto al final de cada capítulo. Desbloquea *Pesadilla* al vencer el Capítulo VI. |
| **2. Pesadilla** | **Senda de la Pesadilla** | Capítulos I al VI (6 pisos por capítulo = 36 pisos totales) | Penalización base del $-20\%$ al escudo inicial del héroe. Aparición de enemigos **Campeones y Élites** con 1 afijo aleatorio (ej. *Encantado con Fuego*, *Maldición de Sangre*, *Drenaje de Oro*). Cartas y reliquias de rango **Excepcional**. Desbloquea *Infierno* al vencer el Capítulo VI. |
| **3. Infierno** | **Senda del Infierno** | Capítulos I al VI (7 pisos por capítulo = 42 pisos totales) | Penalización del $-40\%$ al escudo base. Enemigos Élites con **2 afijos e Inmunidades** a ciertos Sellos Arcanos (`SEAL_ENCHANTMENTS`), obligando a usar builds híbridas. Botín de rango **Élite / Rúnico / Único**. |

#### Estructura de los 6 Capítulos (Actos) dentro de cada Dificultad

Cada capítulo funciona como un Acto de *Diablo II* con su propia ambientación, eventos, campamento seguro y Jefe de Acto:

1. **Capítulo I — Las Criptas de Picas:** Ambientación gótica inicial. Enemigos no-muertos y guardias de picas. **Jefe de Acto I:** *Dante de Picas* (`dante_spades`).
2. **Capítulo II — Las Arenas de Diamante:** Desierto arcano y mercaderes de reliquias. Enemigos con alto escudo y reflejo de daño (*espinas*). **Jefe de Acto II:** *Valquiria de Diamantes* (`valkyrie_diamonds`).
3. **Capítulo III — El Pantano del Trébol:** Selva alquímica con venenos, maldiciones de mazo y cartas trampa. **Jefe de Acto III:** *Archimago del Trébol* (`archmage_clubs`).
4. **Capítulo IV — La Ciudadela del Vacío:** Fortaleza infernal con Pactos del Abismo (`ABYSS_PACTS`) obligatorios y drenaje de alma. **Jefe de Acto IV:** *Malfas del Vacío* (`necro_void`).
5. **Capítulo V — Las Cumbres de la Sombra:** Asedio ancestral con mutadores climáticos y forja rúnica. **Jefe de Acto V:** *Sombra del 21* (`shadow_joker`).
6. **Capítulo VI — El Trono del Mandinga (Acto Final):** Ascenso al santuario final con guardia pretoriana de los jefes anteriores y enfrentamiento en 2 fases contra el **Señor del 21 / El Mandinga**.

* **Sistema de Transportadores (*Waypoints*):** Al completar un Capítulo dentro de una dificultad, se desbloquea su *Waypoint* permanente. El jugador puede iniciar futuras incursiones directamente desde cualquier Capítulo desbloqueado (con un bono de nivel/equipamiento acorde al capítulo) o recorrer la dificultad completa para maximizar su botín.

### Eje B: Crecimiento Exponencial del Personaje frente a la Dificultad Explosiva

Para que el héroe pueda enfrentar una curva de dificultad explosiva a lo largo de 18 capítulos totales (6 capítulos × 3 dificultades), el crecimiento del personaje debe pasar de **aditivo/plano** a **compuesto/multiplicativo**:

| Sistema de Progresión | Diseño Actual | Nuevo Diseño Estilo *Diablo II* + RPG |
| :--- | :--- | :--- |
| **Puntos de Atributo por Nivel** | Selección simple de 1 mejora menor (`chooseLevelUpReward`). | **+5 Puntos de Atributo asignables por nivel** (más bonos permanentes por misión de Capítulo) repartidos en 4 atributos con escalado porcentual: **Fuerza (STR)**, **Destreza (DEX)**, **Vitalidad (VIT)** y **Arcano/Energía (INT)**. |
| **Fórmulas de Escalamiento de Atributos** | Sumas planas (+1 PWR, +1 DEF, +6 HP). | **STR:** $+\text{STR} \times 6\%$ al daño base de ataque y bonificación por cartas altas (10, J, Q, K).<br>**DEX:** $+\text{DEX} \times 1.5\%$ de probabilidad de Crítico / Evasión y bonificador de precisión contra la Clase de Armadura (CA) rival.<br>**VIT:** $\text{HP Máx} = (\text{HP Base} + \text{VIT} \times 12) \times (1 + 0.06 \times \text{Nivel})$.<br>**INT:** $+\text{INT} \times 8\%$ a la potencia de Sellos Arcanos (`SEAL_ENCHANTMENTS`), curación y generación de *Overdrive*. |
| **Árbol de Habilidades y Sinergias** | Perks aislados de 1 nivel (`iron_wall`, `assassin_edge`, etc.). | **3 Ramas por Clase (`HERO_DATA`) con Rangos 1 a 10 y Sinergias Cruzadas:** Invertir puntos en una habilidad base aumenta un $+12\%$ por rango el efecto de las habilidades avanzadas de la misma rama (igual que el sistema de sinergias de *Diablo II* v1.10+). |
| **Eliminación del Castigo por Maestría** | `getTowerHeatMultiplier()` sube la vida enemiga cuando sube el nivel de maestría del jugador. | **Desacoplar el Calor de la Torre del nivel del jugador:** La dificultad depende exclusivamente del **Capítulo (1–6) y Dificultad (Normal/Pesadilla/Infierno)** elegidos. Si el jugador mejora su personaje y vuelve a un capítulo anterior, sentirá su crecimiento real. |
| **Evolución del Mazo y Yunque** | Cartas con sello aisladas. | **Forja Rúnica de Cartas:** Las cartas mejoradas reemplazan a la carta base del mismo número y pinta, escalando en grados (*Normal → Sello → Holográfica → Rúnica*) con multiplicadores de daño/escudo que escalan con el atributo principal del héroe. |

### Eje C: Combate PvP / Arena ("OVP / PVP") — Fusión *Calabozos y Dragones (D&D)* + *Blackjack*

El combate PvP/Arena (y opcionalmente el motor de combate élite de la Torre) se transforma en un **sistema táctico de probabilidades donde la mano de Blackjack reemplaza al dado $d20$ de D&D**, manteniendo la adrenalina del 21:

#### 1. El Blackjack como Tirada de Ataque ($d20$) contra Clase de Armadura (CA / AC)

En lugar de que cualquier victoria haga daño plano, la puntuación obtenida en la mano de Blackjack (de 12 a 21) determina la **Calidad del Impacto** frente a la **Clase de Armadura (CA)** del oponente:

| Resultado de la Mano (Blackjack) | Equivalente en *Calabozos y Dragones (D&D)* | Efecto Mecánico y Probabilístico en el Combate |
| :--- | :--- | :--- |
| **Menos de 15 (Mano Tímida)** | **Tirada Baja ($< \text{CA}$)** | **Golpe Amortiguado / Guardia:** Si ganas la ronda con menos de 15 (porque el rival se pasó), causas solo el $50\%$ del daño base pero ganas $+100\%$ de bonificación defensiva (Escudo) para el siguiente turno. |
| **15 a 18 (Mano Estándar)** | **Impacto Sólido ($\ge \text{CA}$)** | **Ataque Confirmado ($1\times$):** Supera la CA estándar. Tira los **Dados de Daño del Arma/Clase** + Modificador de Atributo (STR/DEX/INT). |
| **19 a 20 (Mano Superior)** | **Impacto Preciso (Ventaja / Alto Rango)** | **Ataque Perforante ($1.35\times$):** Ignora el $50\%$ de la Defensa/CA del rival y añade $+1$ dado adicional de daño elemental según las pintas jugadas. |
| **21 Exacto (3 o más cartas)** | **Crítico Natural ("Natural 20")** | **Golpe Crítico ($2.0\times$):** Duplica todos los dados de daño de las cartas jugadas, ignora el $100\%$ de la DEF enemiga y activa el efecto crítico de los Sellos Arcanos en la mano. |
| **21 Blackjack Natural (As + 10/Figura en 2 cartas)** | **Crítico Vorpal / Castigo Divino (*Smite*)** | **Ejecución Letal ($2.5\times$):** Daño $\times 2.5$ + aplica un **Estado Alterado Mayor** garantizado (Aturdimiento, Sangrado Grave o Silencio Arcano) sin tirada de salvación. |
| **Pasarse de 21 (*Bust*)** | **Pifia Crítica ("Natural 1")** | **Fallo Crítico y Ataque de Oportunidad:** Pierdes la acción ofensiva, quedas en estado **Expuesto** ($-50\%$ DEF en ese turno) y el rival ejecuta inmediatamente un **Ataque de Oportunidad** con ventaja. |

#### 2. Las Cartas y Pintas como "Dados de Daño" y Acciones de Rol

Cada carta que compone tu mano ganadora aporta **dados y efectos de rol** según su valor y su pinta:

* **Valor Numérico = Caras del Dado de Daño:**
  * Cartas **2–5**: Aportan daño equivalente a $1d4$ + carga táctica rápida (útiles para encadenar combos de 4 o 5 cartas sin pasarse, activando bonos de *Pícaro / Combo*).
  * Cartas **6–9**: Aportan daño equivalente a $1d8$ equilibrado.
  * Cartas **10, J, Q, K**: Aportan daño pesado equivalente a $1d12$ (ideales para builds de *Caballero / Golpe Pesado*).
  * **As (1 u 11)**: Actúa como **Dado de Destino ($1d20$ / Comodín Divino)** que se adapta entre postura ofensiva (11) o supervivencia táctica (1) otorgando un bono de Tirada de Salvación.
* **Pintas = Escuela de Combate D&D:**
  * ♠️ **Picas (Fuerza / Corte Físico):** Añade daño físico directo y perforación de armadura.
  * ♦️ **Diamantes (Clase de Armadura / Escudo):** Otorga puntos de Escudo/CA al finalizar la mano (incluso si empatas).
  * ♥️ **Corazones (Constitución / Clérigo):** Recupera HP proporcional al daño infligido o limpia desventajas (*debuffs*).
  * ♣️ **Tréboles (Arcano / Conjuros):** Carga la barra de *Overdrive / Maná* y multiplica el daño de los Sellos Arcanos.

#### 3. Acciones del Blackjack convertidas en Maniobras Tácticas de D&D

* **Pedir Carta (*Hit*) → *Ataque Múltiple / Canalizar Conjuro*:** Cada carta adicional que pidas sin pasarte de 21 suma un $+15\%$ al multiplicador de combo ("Racha de Dados"), premiando el cálculo de probabilidades cuando tienes manos bajas.
* **Plantarse (*Stand*) → *Postura Defensiva (Escudo en Alto)*:** Al plantarte, sumas a tu Clase de Armadura (CA) un bono temporal igual a las cartas de Diamantes en tu mano.
* **Doblar (*Double Down*) → *Ataque Temerario (Reckless Attack / All-In)*:** Pides exactamente 1 carta adicional duplicando los dados de daño ($\times 2$) si ganas la mano, pero reduciendo tu CA si te pasas o pierdes.
* **Dividir (*Split*) → *Combate con Dos Armas (Dual Wielding / Twin Spell)*:** Si tus 2 primeras cartas tienen el mismo valor, puedes dividirlas en dos manos independientes que realizan **dos tiradas de ataque separadas** en la misma ronda.
* **Tirada de Salvación (*Saving Throw* contra Pifia o Estado):** Cuando el jugador va a pasarse de 21 (*Bust*) o recibe un ataque crítico del rival, su atributo de **Destreza (DEX)** o **Sabiduría/Arcano (INT)** permite activar una *Tirada de Salvación* (con probabilidad visible en pantalla, ej. $35\%$) para reducir la carta que lo pasaba a valor 1 o mitigar el $50\%$ del daño recibido.

#### 4. Interfaz de Probabilidades en Tiempo Real (El "Factor Entretenido")

Para que el jugador disfrute calculando probabilidades en cada turno (tanto en Torre como en PvP/Arena):
* **Visor Táctico de Probabilidades (HUD D&D + 21):** Muestra en tiempo real:
  1. **% de Probabilidad de no pasarse (*Safe Hit %*)** y **% de lograr 19–21 (*Crítico/Impacto Alto %*)** calculado sobre las cartas restantes del mazo real (`gameState.deck`).
  2. **Predictor de Daño / Rango de Dados:** Muestra en la barra de vida del rival la proyección exacta del daño actual y el daño potencial si pides otra carta (ej. `Daño Proyectado: 28–42 [Crítico 21: 68]`).

## 3. Plan de Trabajo Paso a Paso para Antigravity

Este plan está estructurado siguiendo las fases de tu documento `PROMPT MAESTRO PARA ANTIGRAVITY` y la carpeta `docs/auditoria/` del repositorio para que Antigravity lo ejecute de forma controlada, modular y verificable.

### Fase 0: Preparación, Respaldo y Rama de Trabajo
1. Crear una rama dedicada en Git: `git checkout -b feat/diablo2-progression-dnd-combat`.
2. Ejecutar la batería actual de pruebas (`node scripts/check-integrity.js` y suites en `scripts/test-*.js`) para registrar la línea base antes de tocar `js/game.js`.
3. Respaldar la configuración actual de `DIFFICULTY_CONFIGS`, `HERO_DATA`, `enemyHpFor` y `simulateArenaDamage`.

### Fase 1: Reestructuración de Campaña Estilo *Diablo II* (Dificultades × 6 Capítulos)
1. **Refactorizar `DIFFICULTY_CONFIGS` en `js/game.js`:**
   * Definir las 3 dificultades maestras (`normal`, `nightmare`, `hell`) con sus penalizaciones globales de escudo/resistencia, multiplicadores de botín y requisitos de desbloqueo secuencial.
2. **Crear el catálogo `CAMPAIGN_CHAPTERS` (Capítulos I al VI):**
   * Configurar los 6 capítulos dentro de cada dificultad con su número de pisos, pool de enemigos temáticos, modificadores ambientales, recompensas de primera victoria y Jefe de Acto correspondiente (`dante_spades`, `valkyrie_diamonds`, `archmage_clubs`, `necro_void`, `shadow_joker` y el nuevo Jefe de Acto VI).
3. **Implementar Sistema de *Waypoints* (Puntos de Control por Capítulo):**
   * Guardar en `localStorage` el progreso por `[difficulty][chapter]` para permitir iniciar desde el último capítulo alcanzado o repetir capítulos anteriores para farmear cartas, oro y experiencia.
4. **Actualizar UI de Selección de Campaña:**
   * Rediseñar el selector de torre para mostrar las 3 pestañas de Dificultad (*Normal / Pesadilla / Infierno*) y el mapa visual de los **6 Capítulos** con su estado (*Bloqueado, En Progreso, Completado*).

### Fase 2: Rediseño del Crecimiento del Personaje y Curva Exponencial
1. **Desacoplar el *Rubber-Banding* (`getTowerHeatMultiplier`):**
   * Eliminar la penalización automática que infla el HP enemigo según `masteryLevel` en pisos bajos; fijar la curva `enemyHpFor(enemy)` en función de `(difficultyMult * chapterMult * floorScaling)` mediante la fórmula compuesta controlada:
     $$\text{HP Enemigo} = \lfloor \text{baseHp} \times \text{diffMult} \times (1.22)^{\text{chapter}-1} \times (1 + (\text{floorInChapter}-1) \times 0.12) \rfloor$$
2. **Implementar Atributos RPG (`STR`, `DEX`, `VIT`, `INT`) y Puntos por Nivel:**
   * Extender `gameState.player` y la persistencia de héroes (`HERO_DATA`) para otorgar **+5 puntos de atributo por nivel** y bonos compuestos porcentuales en daño, precisión/crítico, HP máximo y potencia de sellos.
3. **Evolucionar Perks a Árbol de Habilidades con Rangos y Sinergias:**
   * Permitir subir de rango las habilidades de clase (Nivel 1 a 10) y añadir bonos de sinergia pasiva entre habilidades de la misma rama.
4. **Ajustar la Curva de XP y Recompensas (`getExpRequiredForLevel` y `test-victory-rewards.js`):**
   * Suavizar el exponente de XP a partir del nivel 8 (cambiar $1.5^{\text{lvl}-1}$ por una curva polinómica/exponencial moderada $1.28^{\text{lvl}-1}$ acompañada de un multiplicador de XP alto en *Pesadilla* ($\times 2.5$) e *Infierno* ($\times 5.0$)).

### Fase 3: Motor de Combate D&D + Blackjack (PvP Arena y Combate Táctico)
1. **Crear el Resolutor de Combate D&D-21 (`resolveDnDBlackjackRound`):**
   * Implementar los umbrales de tirada ($<15$ Roce/Guardia, $15\text{–}18$ Impacto, $19\text{–}20$ Perforante, $21$ Crítico Natural $\times 2.0$, *Blackjack Natural* $\times 2.5$, *Bust* = Pifia Crítica + Ataque de Oportunidad).
2. **Vincular Cartas y Pintas a Dados de Daño y Escuelas D&D:**
   * Mapear cada carta jugada en la mano ganadora a su aportación de daño/efecto (♠️ Físico/Perforación, ♦️ CA/Escudo, ♥️ Curación/Salvación, ♣️ Arcano/Overdrive).
3. **Integrar Maniobras D&D en los Botones de Blackjack (PvP y Torre):**
   * Conectar *Hit* (Bono de Combo por carta extra), *Stand* (Postura Defensiva con Diamantes), *Double Down* (Ataque Temerario $\times 2$), *Split* (Doble Ataque en pares) y *Tirada de Salvación* basada en `DEX`/`INT`.
4. **Construir el HUD de Probabilidades y Predictor de Daño en Tiempo Real:**
   * Calcular dinámicamente sobre `gameState.deck` el `% de Éxito (No pasarse)` y el `% de Impacto Crítico (19–21)`, mostrándolo junto al predictor de daño superpuesto en la barra de HP del rival.

### Fase 4: Sincronización, Pruebas Automatizadas y Compilación APK
1. **Crear Nuevas Suites de Pruebas en `scripts/`:**
   * `scripts/test-diablo-chapters.js`: Verifica la progresión de 3 dificultades × 6 capítulos, desbloqueo de *Waypoints* y escalado de jefes.
   * `scripts/test-hero-exponential-growth.js`: Simula el combate de un héroe Nivel 1 a 30 contra enemigos de *Normal*, *Pesadilla* e *Infierno* para validar que el tiempo para matar (*TTK*) se mantenga equilibrado.
   * `scripts/test-dnd-blackjack-pvp.js`: Valida críticos con 21, pifias al pasarse, tiradas de salvación, bonos por pinta y cálculo de probabilidades del mazo.
2. **Sincronización y Validación de Compilación:**
   * Ejecutar `node scripts/sync-all.js` y `node scripts/check-integrity.js`.
   * Revisar y corregir el workflow de GitHub Actions (`.github/workflows/`) para asegurar que la tarea `Compilar APK Android` genere el `.apk` sin fallos.

## 4. Prompt Listo para Copiar y Pegar en Antigravity

Cuando decidas ejecutar los cambios en **Antigravity**, puedes entregarle directamente la siguiente instrucción estructurada:

> **INSTRUCCIÓN DE IMPLEMENTACIÓN PARA ANTIGRAVITY — PROYECTO `TORRE21`**
>
> Actúa bajo las reglas de nuestro `PROMPT MAESTRO PARA ANTIGRAVITY` (preservar estabilidad, trabajar con trazabilidad, sincronizar con `scripts/sync-all.js` y validar con tests en `scripts/`). Vamos a implementar una evolución mayor dividida en 3 módulos sobre el repositorio `itsotocadiz/TORRE21`:
>
> **MÓDULO 1 — Progresión Estilo Diablo II (3 Dificultades × 6 Capítulos):**
> 1. Reestructura `DIFFICULTY_CONFIGS` en `js/game.js` en 3 dificultades desbloqueables en cadena: `normal` (Senda del Novicio), `nightmare` (Senda de la Pesadilla) y `hell` (Senda del Infierno).
> 2. Dentro de cada dificultad, estructura una campaña de **6 Capítulos (Actos I al VI)** con puntos de control (*Waypoints*) persistentes y un Jefe de Acto al final de cada capítulo (`dante_spades`, `valkyrie_diamonds`, `archmage_clubs`, `necro_void`, `shadow_joker` y el Jefe Final de Acto VI).
> 3. En *Pesadilla* e *Infierno*, añade afijos de élite a los enemigos y penalizaciones de escudo base, otorgando recompensas y cartas de rango superior.
>
> **MÓDULO 2 — Crecimiento Exponencial del Personaje:**
> 1. Elimina el *rubber-banding* de `getTowerHeatMultiplier()` que infla a los enemigos según la maestría del jugador; el escalado en `enemyHpFor(enemy)` debe depender solo de la Dificultad, el Capítulo (1–6) y el Piso.
> 2. Implementa un sistema de crecimiento compuesto con **+5 puntos de atributo por nivel** (`STR` para % de daño físico, `DEX` para precisión/crítico/evasión, `VIT` para HP compuesto, `INT` para % de potencia de sellos y Overdrive) y rangos acumulables (1–10) con sinergias en las habilidades de cada clase (`HERO_DATA`).
>
> **MÓDULO 3 — Combate PvP / Arena y Torre estilo Calabozos y Dragones (D&D) + Blackjack:**
> 1. Evoluciona `simulateArenaDamage` y la resolución de manos para que el puntaje de Blackjack funcione como una tirada de ataque de D&D contra la Defensa/CA rival: `<15` Golpe de Roce + Guardia, `15–18` Impacto Estándar ($1\times$), `19–20` Impacto Perforante ($1.35\times$, ignora 50% DEF), `21` Crítico Natural ("Nat 20", daño $\times 2.0$ e ignora DEF), `Blackjack Natural` Crítico Devastador ($\times 2.5$ + estado alterado), y `Pasarse de 21 (Bust)` Pifia Crítica ("Nat 1", queda Expuesto y sufre Ataque de Oportunidad).
> 2. Vincula las pintas jugadas a efectos de rol (♠️ Daño físico, ♦️ Escudo/CA, ♥️ Curación/Salvación, ♣️ Magia/Overdrive) y muestra en el HUD el **% de probabilidad en tiempo real** de no pasarse y de sacar 19–21 según las cartas restantes en `gameState.deck`, junto al predictor visual de daño sobre la barra de vida rival.
> 3. Ejecuta primero la Fase de Inventario y Diseño Detallado de cambios en `js/game.js` y `js/improvements.js`, crea los tests unitarios correspondientes en `scripts/` y sincroniza con `node scripts/sync-all.js` al finalizar cada módulo.
