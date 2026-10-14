/**
 * test-lore-grimoire.js
 * Suite de verificación para FASE 8: Lore y Narrativa de la Torre del 21.
 *
 * Valida:
 * 1. Bestiario & Lore de Enemigos: todos los 9 rivales poseen lore accesible (acentos y emoji).
 * 2. Crónica de las 4 Torres: DIFFICULTY_CONFIGS incluye campos lore y loreTitle en todas las dificultades.
 * 3. Sistema Unificado de Zonas: getFloorZoneInfo y getFloorZoneTitle escalan en torres de 7, 9, 11 y 13 pisos.
 * 4. Conexión de LORE_PATCHES: narrativas de dragón y BLACK integradas en crónicas y capítulos de grimorio.
 * 5. Grimorio de Memorias y UI: funciones exportadas, marcado en index.html y estilos en style.css.
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const gameSrc = fs.readFileSync(path.join(rootDir, 'js', 'game.js'), 'utf8');
const improSrc = fs.readFileSync(path.join(rootDir, 'js', 'improvements.js'), 'utf8');
const indexSrc = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const cssSrc = fs.readFileSync(path.join(rootDir, 'css', 'style.css'), 'utf8');

let pass = 0;
let fail = 0;

function ok(cond, msg) {
  if (cond) {
    console.log('  PASS ' + msg);
    pass++;
  } else {
    console.error('  FAIL ' + msg);
    fail++;
  }
}

// Mock DOM & Storage environment
const mockStorage = {};
global.localStorage = {
  getItem: k => mockStorage[k] || null,
  setItem: (k, v) => { mockStorage[k] = String(v); },
  removeItem: k => { delete mockStorage[k]; }
};

global.window = {
  addEventListener: () => {},
  localStorage: global.localStorage
};

global.document = {
  getElementById: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {}
};

// Cargar motor e improvements
eval(improSrc);
eval(gameSrc);

console.log('== 1. Bestiario & Lore de Enemigos (9/9 Rivales Accesibles) ==');
ok(typeof window.ENEMY_LORE === 'object', 'window.ENEMY_LORE expuesto como objeto');
ok(typeof window.getEnemyLore === 'function', 'window.getEnemyLore expuesta como función');

const ENEMIES_LIST = [
  "Duende Pilluelo",
  "Esqueleto Maldito",
  "Orco Berserker",
  "Gárgola Pétrea",
  "Bestia de las Sombras",
  "Centurión Espectral",
  "Guardián de Obsidiana",
  "Dragón Guardián",
  "👑 BLACK (El Jack Supremo)"
];

ENEMIES_LIST.forEach(name => {
  const lore = window.getEnemyLore(name);
  const isValid = lore && !lore.includes("Habitante ancestral") && lore.length > 20;
  ok(isValid, `Lore accesible para: "${name}" (${lore ? lore.slice(0, 45) + '...' : 'VACÍO'})`);
});

// Prueba de normalización sin emoji ni acentos
const loreBlackRaw = window.getEnemyLore("BLACK");
ok(loreBlackRaw && loreBlackRaw.includes("Mazo Primigenio"), 'getEnemyLore("BLACK") resuelve mediante normalización');
const loreGargolaRaw = window.getEnemyLore("Gargola Petrea");
ok(loreGargolaRaw && loreGargolaRaw.includes("roca encantada"), 'getEnemyLore("Gargola Petrea") resuelve sin acentos');

console.log('\n== 2. Crónica de las 4 Torres en DIFFICULTY_CONFIGS ==');
ok(typeof window.DIFFICULTY_CONFIGS === 'object', 'DIFFICULTY_CONFIGS disponible');
['normal', 'hard', 'mythic', 'nightmare'].forEach(diff => {
  const cfg = window.DIFFICULTY_CONFIGS[diff];
  ok(cfg && typeof cfg.lore === 'string' && cfg.lore.length > 30, `Torre [${diff}] (${cfg.name}) incluye crónica de lore`);
  ok(cfg && typeof cfg.loreTitle === 'string' && cfg.loreTitle.length > 5, `Torre [${diff}] incluye loreTitle: "${cfg.loreTitle}"`);
});
ok(gameSrc.includes('diff-lore-box'), 'updateDifficultySelectorUI renderiza diff-lore-box en la selección');

console.log('\n== 3. Sistema Unificado de Zonas (getFloorZoneInfo / getFloorZoneTitle) ==');
ok(typeof window.getFloorZoneInfo === 'function', 'window.getFloorZoneInfo implementada');
ok(typeof window.getFloorZoneTitle === 'function', 'window.getFloorZoneTitle implementada');

// Prueba con Torre Normal (7 pisos)
const z1Normal = window.getFloorZoneInfo(1, 7);
ok(z1Normal.zone === 1 && z1Normal.icon === "👺", 'Piso 1 en Torre Normal (7) = Calabozo (👺)');
const zBossNormal = window.getFloorZoneInfo(7, 7);
ok(zBossNormal.zone === 6 && zBossNormal.icon === "🐉" && zBossNormal.title.includes("CÚSPIDE"), 'Piso 7 en Torre Normal (7) = La Cúspide (🐉)');

// Prueba con Torre Pesadilla (13 pisos)
const zMidNightmare = window.getFloorZoneInfo(7, 13);
ok(zMidNightmare.zone === 3 && zMidNightmare.icon === "⚔️", 'Piso 7 en Torre Pesadilla (13) = Cuarteles de Hierro (⚔️)');
const zHighNightmare = window.getFloorZoneInfo(9, 13);
ok(zHighNightmare.zone === 4 && zHighNightmare.icon === "👑", 'Piso 9 en Torre Pesadilla (13) = Salones Dorados (👑)');
const zBossNightmare = window.getFloorZoneInfo(13, 13);
ok(zBossNightmare.zone === 6 && zBossNightmare.title.includes("DRAGÓN ANCESTRAL Y BLACK"), 'Piso 13 en Pesadilla = Cúspide Suprema');

// Delegación de getFloorZoneTitle
ok(window.getFloorZoneTitle(1, 7) === z1Normal.title, 'getFloorZoneTitle delega a getFloorZoneInfo.title');
ok(gameSrc.includes('const zoneInfo = getFloorZoneInfo(floorNum, maxFloors);'), 'showFloorTransition consume getFloorZoneInfo unificado');

console.log('\n== 4. Conexión de LORE_PATCHES y Narrativa Ambiental ==');
ok(typeof window.LORE_PATCHES === 'object', 'window.LORE_PATCHES disponible');
ok(typeof window.applyLorePatch === 'function', 'window.applyLorePatch disponible');

const baseText = "Texto base del piso.";
const patchedP5 = window.applyLorePatch(5, baseText);
ok(patchedP5.includes("Dragón Guardián está despierto"), 'applyLorePatch(5) añade eco del Dragón Guardián');
const patchedP13 = window.applyLorePatch(13, baseText);
ok(patchedP13.includes("BLACK te mira desde su trono"), 'applyLorePatch(13) añade desafío supremo de BLACK');
const unpatchedP2 = window.applyLorePatch(2, baseText);
ok(unpatchedP2 === baseText, 'applyLorePatch(2) no altera pisos sin parche ambiental');

ok(gameSrc.includes('storyText = window.applyLorePatch(currentFloor, storyText);'), 'showAscentChronicle aplica applyLorePatch');
ok(gameSrc.includes('text = window.applyLorePatch(lvl, text);'), 'openLoreChapter aplica applyLorePatch en grimorio');
ok(gameSrc.includes('csSub.innerHTML = `<span style="color:#ffd166;font-style:italic;">"${enemyLoreSnippet}"</span>`;'), 'showCombatStartPrompt proyecta el lore del rival');

console.log('\n== 5. Grimorio de Memorias y UI ==');
ok(/function\s+renderLoreGrimoire/.test(gameSrc), 'game.js define renderLoreGrimoire');
ok(/window\.renderLoreGrimoire\s*=\s*renderLoreGrimoire/.test(gameSrc), 'window.renderLoreGrimoire exportada');
ok(/function\s+openLoreChapter/.test(gameSrc), 'game.js define openLoreChapter');
ok(/window\.openLoreChapter\s*=\s*openLoreChapter/.test(gameSrc), 'window.openLoreChapter exportada');
ok(indexSrc.includes('id="lore-heroes-grimoire"'), 'index.html contiene contenedor #lore-heroes-grimoire');
ok(indexSrc.includes('id="screen-lore-chapter"'), 'index.html contiene modal #screen-lore-chapter');
ok(cssSrc.includes('.lore-grimoire-section'), 'style.css contiene estilos .lore-grimoire-section');
ok(cssSrc.includes('.lore-chapter-item'), 'style.css contiene estilos .lore-chapter-item');

console.log(`\nRESULTADO: ${pass} pass / ${fail} fail`);
if (fail > 0) process.exit(1);
