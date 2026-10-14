# ANÁLISIS DEL SISTEMA DE AUDIO Y FUENTES DE MÚSICA LIBRES
**Proyecto:** Black Jack: La Torre del 21 (Roguelike Mobile Edition)
**Fecha:** Octubre 2026
**Rol:** Diseño sonoro para videojuegos (auditoría técnica de audio + curaduría musical)
**Alcance:** Análisis del audio actual, mapa sonoro, fuentes MP3 gratuitas con licencia segura y guía de integración.

---

## 1. Resumen ejecutivo

El juego dispone de un **sistema de audio 100 % procedural** (Web Audio API, síntesis en tiempo real) sin **ningún archivo de audio** en el proyecto: 0 KB de peso, 36 efectos de sonido, 2 pistas de música generadas por código y una capa de control de volumen maestro.

**Fortalezas:** sin dependencias de red, sin problemas de autoplay, sin peso en el APK, SFX de calidad razonable y un diseño de "Tensión de Muerte Súbita" escalado dinámicamente que es difícil de mejorar con pistas fijas.

**Debilidades detectadas (7 hallazgos, 5 de ellos bugs reales):** funciones de sonido invocadas que **no existen** (victoria, maldición), música de combate que **no se detiene** al abandonar la run, ajustes de audio **no persistidos**, y ausencia total de pantalla de créditos — imprescindible si se incorpora música con licencia CC-BY.

**Recomendación estratégica:** conservar los SFX procedurales y la marcha de título (son identidad propia y cuestan 0 KB), y añadir **6–8 pistas MP3/OGG de 60–90 s** para las escenas que hoy están en silencio (combate, jefe, bazar, fogata), usando exclusivamente fuentes con licencia **CC0 / dominio público / CC-BY**.

---

## 2. Auditoría del sistema actual

**Arquitectura:** todo vive en `js/game.js` (líneas 390–1569). Motor: `AudioContext` con un `masterGainNode` único; todos los sonidos pasan por `audioGain()` y `playTone()`.

| Componente | Ubicación | Estado |
|---|---|---|
| Núcleo `ensureAudio` / `updateMasterGain` / `audioGain` / `playTone` | `game.js:396–457` | ✅ Fuente única de verdad del volumen, todo protegido con `try/catch` |
| Desbloqueo de autoplay (primer gesto) | `game.js:459–476` | ✅ `pointerdown`/`touchstart` + `resume()` — cumple la política de autoplay |
| Marcha gótica de título (32 pasos @ 240 ms, Re menor: lead square + órgano + campana + bombo ritual) | `game.js:487–712` | ⚠️ Buena identidad, pero el loop dura ~7,7 s → se percibe mecánico |
| Bajo de combate (16 pasos @ 280 ms, saw filtrada + pad) | `game.js:747–814` | ⚠️ Solo bajo: falta armonía y melodía |
| Tensión de Muerte Súbita (latido + alarma, acelera y sube de tono por asalto) | `game.js:822–874` | ✅ **Excelente diseño dinámico — no sustituir por MP3** |
| 36 SFX (`playCardDealSound`, `playBustSound`, `playBlackjackFanfareSound`, `playJackpotSound`, `playPackTearSound`…) | `game.js:879–1527` | ✅ Buenos: ruido filtrado para reparto de cartas, LFO en terror, sweeps. **No tocar** |
| Controles: botón header (`:1529`), pausa (`:9271`), sliders (`:10636`) | `index.html:736/745/826` | ✅ Funcional; un único canal maestro (sin canales música/SFX) |

### Hallazgos / bugs

| # | Hallazgo | Ubicación | Impacto |
|---|---|---|---|
| 1 | **`playWinFanfareSound` no existe** pero se invoca en 8 puntos | `game.js:14020, 14240, 14307, 14386, 14974, 15391` + `improvements.js:1200` | El `try/catch` se traga el `ReferenceError` → **silencio total** en modales de victoria, Forja y cuenta atrás de Furia |
| 2 | **`playVictoryFanfareSound` no existe** | `improvements.js:964` | Victoria sin fanfarria |
| 3 | **`playCurseSound` no existe** | `improvements.js:435` | Maldiciones sin sonido |
| 4 | **`playTitleMusic` no existe** | `game.js:14330` | Al volver al menú desde "Recompensa guardada", el título queda **en silencio** |
| 5 | **`exitToMainMenu()` no detiene la música de combate** | `game.js:9253` | Pausa → "Abandonar ascensión" deja el **bucle de combate sonando sobre la pantalla de título** |
| 6 | **`audioEnabled` / `audioVolume` no se persisten** | ausente en todo el guardado | Al reabrir la app vuelve a `true / 50 %` |
| 7 | Sin canales separados, sin crossfade, sin ducking; `setInterval` para la música (deriva de timing y *throttling* en segundo plano); `visibilitychange` no suspende el `AudioContext` | `game.js:13593` | CPU/batería desperdiciadas en background; un único volumen para todo |
| 8 | **No existe pantalla de créditos en el juego** (0 resultados de búsqueda) | — | **Impide cumplir las licencias CC-BY** en el futuro |

---

## 3. Mapa sonoro propuesto

**Identidad:** gótico-eclesiástico (órgano, coros, campanas) × **noir de casino** (jazz oscuro, contrabajo) × dark ambient de torre.

| Escena | Música recomendada | BPM / Loop | Prioridad |
|---|---|---|---|
| Título | Marcha gótica actual (mantener) o MP3 dark-epic | 100 / 60–90 s | Media |
| Combate normal | Dark orchestral *driving* | 110–130 / 60–90 s | **Alta** |
| Jefe / Heraldo | Épico con coro o metal gótico | 140–160 / 60–90 s | **Alta** |
| Muerte súbita | **Mantener el procedural** (su escalado dinámico no lo iguala ningún MP3) | dinámico | — |
| Bazar / tienda | **Jazz noir lounge** (aire de casino subterráneo) | 70–90 / 60 s | **Alta** |
| Fogata | Dark ambient cálido, drones | libre / 90 s | Media |
| Arena / PvP | Swing oscuro rítmico | 100–120 | Baja |
| Victoria / Derrota | Fanfarria **procedural** corta (`playWinFanfareSound`) | stinger 3 s | **Alta (bug #1)** |
| Rueda / sobres / menús | **Sin música** (los SFX ya lo cubren bien) | — | — |

**Presupuesto:** 6–8 pistas × 60–90 s ≈ **8–12 MB** a 128 kbps (menos si se re codifica a 96 kbps o se usa OGG).

---

## 4. Fuentes de música MP3 gratis (verificadas en Octubre 2026)

### 4.1 Criterios de seguridad para este proyecto

El juego es gratis **con IAP y anuncios** → cualquier música incorporada se usa en un contexto **comercial**. Solo se admiten:

- ✅ **CC0** / dominio público (sin atribución)
- ✅ **CC-BY** (con pantalla de créditos)
- ✅ Licencias *royalty-free* propias que autoricen expresamente apps/juegos
- ❌ **CC-BY-SA** (copyleft viral: obligaría a licenciar el juego entero igual)
- ❌ **NC** (no comercial: incompatible con IAP/anuncios)
- ❌ **ND** (no puedes ajustar BPM ni crear loops)
- ❌ IA generativa con litigios (Suno/Udio) o licencias ambiguas

### 4.2 Tabla de fuentes verificadas

| Fuente | URL | Licencia | ¿Crédito? | Formato | Encaje con el tema |
|---|---|---|---|---|---|
| **Incompetech** (Kevin MacLeod) | `incompetech.com/music/royalty-free/music.html` | **CC BY 4.0** ✅ | **Sí**, formato exacto en su web | MP3 | Gótico/épico/jazz: *Southern Gothic*, *Grand Dark Waltz*, *Lord of the Rangs* |
| **OpenGameArt** | `opengameart.org` | **CC0 / CC-BY** (el sitio prohíbe añadir restricciones extra) | Solo si CC-BY | MP3/OGG | El mejor para nicho. **Verificado: *Moil* (Ruskerdax) — dark jazz CC0 con descarga MP3 directa**; *In Darkness* (CC-BY 4.0); colección *CC0 Cinematic Music* |
| **Pixabay Music** | `pixabay.com/music/` | **Pixabay Content License** ✅ | **No obligatorio** | MP3 | Catálogo enorme. ⚠️ No reventa *standalone*; conservar constancia de descarga (posibles Content ID falsos) |
| **Soundimage.org** (Eric Matyas) | `soundimage.org` | Licencia propia tipo CC-BY | **Sí, dentro del juego** | MP3 + **OGG** (él recomienda OGG para loops) | Miles de pistas hechas para videojuegos, sin IA |
| **itch.io** (packs sueltos) | `itch.io` | CC-BY / royalty-free por pack | Según pack | WAV/MP3/OGG | **Verificados:** *Heart Of Sin* (FarBeyond Studio, CC-BY 4.0, dark fantasy loops), *Crimson Rose of the Labyrinth* (Yugen Mukaido, gothic BGM) |
| **Free Music Archive** | `freemusicarchive.org` | CC **pista a pista** | Sí | MP3 | Usar **solo filtros CC-BY/CC0**; abundan NC y ND |
| **Kenney.nl** | `kenney.nl` | **CC0** | No | MP3/WAV | Básico/UI; poco encaje gótico |

### 4.3 Descartados (y por qué)

- **FreePD.com** → cerrado oficialmente tras 17 años (los *mirrors* no oficiales no son fiables).
- **YouTube Audio Library** → no cubre el uso dentro de apps/juegos.
- **Bensound** → su tier gratuito restringe apps y uso comercial.
- **Suno / Udio** → IA con litigios de copyright vigentes: riesgo directo para Google Play.
- Packs tipo *Velvet Lounge* / *Low-Pass Lounge* → de pago ($1,99–2,79), no cumplen "gratis".

### 4.4 Recomendación concreta por escena

- **Bazar / casino →** *Moil* (OpenGameArt, **CC0**, descarga directa verificada) — dark jazz con Rhodes, batería, saxo barítono y contrabajo: es literalmente el ambiente de casino corrupto, y **no exige créditos**.
- **Combate →** *Heart Of Sin* (itch, CC-BY 4.0) o *Dances of the shadows – Unstoppable* (OGA, CC-BY 4.0, 1:34 ya pensado para loop).
- **Título →** dejar la marcha procedural actual: es identidad propia y 0 KB.
- **Derrota / victoria →** arreglar la fanfarria procedural (no hace falta MP3).

---

## 5. Guía de integración

1. **Ubicación:** `assets/audio/musica/*.mp3` en la **raíz** (fuente única de verdad) → `node scripts\sync-all.js` replica en `www/` y `android/…/public/` (el script ya copia `assets/` de forma recursiva).
2. **Formato:** MP3 96–128 kbps (≈1 MB/min) u **OGG 64–96 kbps** (−40 % peso, mejor para loops). El WebView de Android soporta ambos.
3. **Reproducción:** `fetch → decodeAudioData` sobre el `AudioContext` existente, conectado a un **canal de música** colgado del `masterGainNode` → hereda `audioEnabled`/`audioVolume` sin duplicar lógica. Loop con `source.loop = true` (nunca `setInterval`).
4. **Canales:** `musicGain` + `sfxGain` bajo el maestro → volúmenes independientes y **ducking** (−6 dB bajo fanfarrias).
5. **Transiciones:** crossfade de 1–2 s entre escenas; stingers de 2–3 s para victoria/derrota.
6. **Fallback:** si un archivo no existe o falla la decodificación, se mantiene la música procedural actual (el juego nunca se queda en silencio por un MP3 ausente).
7. **Corregir los hallazgos 1–8** de la sección 2.
8. **Créditos obligatorios** con CC-BY: sección en la pestaña *Config* del título con el formato exacto que exige cada autor.
9. **Reglas del proyecto:** sin `alert()`/`confirm()` nativos (`showGameToast`/`showGameAlert`); la música es **arte base del juego** y no puede condicionarse tras pago (eso solo aplica a perks/héroes/packs).

---

## 6. Estado de implementación

> Esta sección se actualiza con los cambios realizados en el código.

| Entrega | Estado |
|---|---|
| Este documento (`docs/analisis-audio.md`) | ✅ Hecho |
| SFX faltantes (`playWinFanfareSound`, `playVictoryFanfareSound`, `playCurseSound`, `playTitleMusic`) | ✅ Hecho — añadidos en `game.js` con export `window.*`; cubren las llamadas de `improvements.js` (pactos, victoria, pack) |
| `exitToMainMenu` detiene la música de combate | ✅ Hecho — `stopCombatMusic()` + `stopSuddenDeathTension()` + `playTitleMusic()` |
| Persistencia de `audioEnabled`/`audioVolume` | ✅ Hecho — `loadAudioSettings`/`saveAudioSettings` con clave `bj_audio_settings_v1` (JSON protegido con `try/catch`) |
| Suspensión del `AudioContext` en `visibilitychange` | ✅ Hecho — `suspend()` al ocultar, `resume()` al volver (sigue guardando la partida) |
| Motor de música por archivos (canales, crossfade, fallback) | ✅ Hecho — canal `musicGainNode` bajo el maestro, `MUSIC_TRACKS`, crossfade 0,6 s, fade 1,2 s, fallback procedural si falla la carga o el formato |
| Pistas libres en `assets/audio/` | ✅ Hecho — 3 pistas CC0 convertidas a MP3 128 k en `assets/audio/musica/`: *Determined Pursuit* (combate), *The Final Battle* (jefe), *Moil* (bazar) |
| Pantalla de créditos musicales | ✅ Hecho — bloque "🎵 CRÉDITOS MUSICALES" en `index.html` con autoría y licencia CC0 |
| `npm run verify` en verde | ✅ Hecho — todas las suites 0 fail, integridad 0/0; la integración queda blindada por `scripts/test-audio-integration.js` (64 checks, enlazada en `package.json`) |
