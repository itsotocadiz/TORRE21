// Test: Progresión Estilo Diablo II (Dificultades y 6 Capítulos)
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("=== TEST: CAMPAÑA ESTILO DIABLO II (6 CAPÍTULOS Y WAYPOINTS) ===");

const gameSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf8');
const htmlSrc = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// 1. Verificación en HTML de elementos de Campaña y Dificultad Hell
assert(htmlSrc.includes('data-diff="hell"'), 'index.html debe contener el botón de dificultad Hell (Infierno)');
assert(htmlSrc.includes('id="campaign-chapters-grid"') || htmlSrc.includes('campaign-chapters'), 'index.html debe contener el contenedor de Capítulos de Campaña');
console.log("  PASS  index.html: Contenedores de dificultad Hell y Capítulos de Campaña presentes");

// 2. Mock environment para cargar game.js
const domMock = {
  document: {
    getElementById: (id) => ({
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      innerHTML: '',
      innerText: '',
      dataset: {},
      style: {},
      appendChild: () => {},
      addEventListener: () => {},
      querySelectorAll: () => [],
      querySelector: () => null
    }),
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: () => {},
    createElement: () => ({
      classList: { add: () => {}, remove: () => {} },
      innerHTML: '',
      style: {},
      appendChild: () => {}
    }),
    body: { classList: { add: () => {}, remove: () => {} } }
  },
  localStorage: {
    _data: {},
    getItem(k) { return this._data[k] || null; },
    setItem(k, v) { this._data[k] = String(v); },
    removeItem(k) { delete this._data[k]; }
  },
  window: {
    addEventListener: () => {}
  },
  alert: () => {},
  console: console
};

global.window = domMock.window;
global.document = domMock.document;
global.localStorage = domMock.localStorage;
global.AudioContext = function() {
  return { createOscillator: () => ({ connect: () => {}, start: () => {}, stop: () => {} }), createGain: () => ({ gain: { setValueAtTime: () => {} }, connect: () => {} }) };
};

require('../js/improvements.js');
require('../js/game.js');

// 3. Verificación de DIFFICULTY_CONFIGS (Normal, Nightmare, Hell + Hard, Mythic)
assert(typeof window.DIFFICULTY_CONFIGS === 'object', 'DIFFICULTY_CONFIGS debe ser un objeto');
assert(window.DIFFICULTY_CONFIGS.normal, 'Debe incluir normal');
assert(window.DIFFICULTY_CONFIGS.hard, 'Debe incluir hard (compatibilidad)');
assert(window.DIFFICULTY_CONFIGS.mythic, 'Debe incluir mythic (compatibilidad)');
assert(window.DIFFICULTY_CONFIGS.nightmare, 'Debe incluir nightmare');
assert(window.DIFFICULTY_CONFIGS.hell, 'Debe incluir hell (Infierno)');
assert.strictEqual(window.DIFFICULTY_CONFIGS.hell.shieldPenaltyPct, 0.40, 'Hell debe tener penalización del 40% al escudo');
assert.strictEqual(window.DIFFICULTY_CONFIGS.nightmare.shieldPenaltyPct, 0.20, 'Nightmare debe tener penalización del 20% al escudo');
console.log("  PASS  DIFFICULTY_CONFIGS: 3 dificultades maestras (Normal, Pesadilla, Infierno) + retrocompatibilidad");

// 4. Verificación de Desbloqueo Secuencial de Dificultades
localStorage.setItem("bj_tower_total_wins", "0");
localStorage.setItem("blackjack_has_won_run", "false");
assert.strictEqual(window.isDifficultyUnlocked("normal"), true, "Normal siempre desbloqueado");
assert.strictEqual(window.isDifficultyUnlocked("nightmare"), false, "Nightmare bloqueado con 0 victorias");
assert.strictEqual(window.isDifficultyUnlocked("hell"), false, "Hell bloqueado con 0 victorias");

localStorage.setItem("bj_tower_total_wins", "3");
assert.strictEqual(window.isDifficultyUnlocked("nightmare"), true, "Nightmare desbloqueado con 3 victorias");
assert.strictEqual(window.isDifficultyUnlocked("hell"), false, "Hell aún bloqueado con 3 victorias");

localStorage.setItem("bj_tower_total_wins", "4");
assert.strictEqual(window.isDifficultyUnlocked("hell"), true, "Hell desbloqueado con 4 victorias");
console.log("  PASS  isDifficultyUnlocked: Desbloqueo secuencial verificado");

// 5. Verificación de CAMPAIGN_CHAPTERS (Actos I al VI y sus Jefes)
assert(Array.isArray(window.CAMPAIGN_CHAPTERS), 'CAMPAIGN_CHAPTERS debe ser un arreglo');
assert.strictEqual(window.CAMPAIGN_CHAPTERS.length, 6, 'Debe haber exactamente 6 capítulos');

const expectedBosses = ["dante_spades", "valkyrie_diamonds", "archmage_clubs", "necro_void", "shadow_joker", "mandinga_lord"];
window.CAMPAIGN_CHAPTERS.forEach((ch, idx) => {
  assert.strictEqual(ch.number, idx + 1, `Capítulo ${idx + 1} tiene número correcto`);
  assert(ch.name, `Capítulo ${idx + 1} tiene nombre`);
  assert(ch.bossId, `Capítulo ${idx + 1} tiene bossId`);
  assert.strictEqual(ch.bossId, expectedBosses[idx], `Jefe de Capítulo ${idx + 1} debe ser ${expectedBosses[idx]}`);
  assert(ch.floors, `Capítulo ${idx + 1} define pisos por dificultad`);
});
console.log("  PASS  CAMPAIGN_CHAPTERS: 6 Capítulos definidos con sus respectivos Jefes de Acto");

// 6. Verificación de Waypoints y Persistencia
localStorage.removeItem("bj_campaign_waypoints_v1");
let wp = window.getCampaignWaypoints();
assert.strictEqual(wp.normal, 1, "Waypoint inicial en Normal debe ser Capítulo 1");
assert.strictEqual(wp.nightmare, 1, "Waypoint inicial en Nightmare debe ser Capítulo 1");
assert.strictEqual(wp.hell, 1, "Waypoint inicial en Hell debe ser Capítulo 1");

window.unlockCampaignWaypoint("normal", 2);
wp = window.getCampaignWaypoints();
assert.strictEqual(wp.normal, 2, "Waypoint desbloqueado a Capítulo 2 en Normal");

window.unlockCampaignWaypoint("normal", 6);
wp = window.getCampaignWaypoints();
assert.strictEqual(wp.normal, 6, "Waypoint desbloqueado a Capítulo 6 en Normal");
console.log("  PASS  getCampaignWaypoints / unlockCampaignWaypoint: Persistencia correcta en storage");

console.log("\n---------------------------------------");
console.log("RESULTADO: Todos los tests de Campaña Diablo II pasaron con éxito.\n");
process.exit(0);
