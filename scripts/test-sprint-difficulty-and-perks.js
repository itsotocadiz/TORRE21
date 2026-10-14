const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== TEST SPRINT: DIFICULTADES, PERKS, SKINS Y BALANCE ===');

// 1. Verificar HTML
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
assert(html.includes('difficulty-selection-container'), 'HTML: selector de dificultad presente');
assert(html.includes('modal-perks-codex'), 'HTML: modal del compendio de perks presente');
assert(html.includes('screen-hero-skin-modal'), 'HTML: modal de vestiduras / skins presente');
assert(html.includes('data-diff="normal"'), 'HTML: botón dificultad normal presente');
assert(html.includes('data-diff="hard"'), 'HTML: botón dificultad heroico presente');
assert(html.includes('data-diff="mythic"'), 'HTML: botón dificultad mítico presente');
assert(html.includes('data-diff="nightmare"'), 'HTML: botón dificultad pesadilla presente');
console.log('✔ HTML: Todos los contenedores y modales existen en index.html');

// 2. Mock environment para ejecutar game.js y improvements.js
const domMock = {
  document: {
    getElementById: () => ({
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      innerHTML: '',
      innerText: '',
      dataset: {},
      style: {},
      appendChild: () => {},
      addEventListener: () => {},
      getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 })
    }),
    querySelectorAll: () => [],
    addEventListener: () => {},
    createElement: () => ({
      classList: { add: () => {}, remove: () => {} },
      innerHTML: '',
      style: {},
      appendChild: () => {}
    }),
    body: {
      classList: { add: () => {}, remove: () => {} }
    }
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
global.alert = domMock.alert;
global.AudioContext = function() {
  return { createOscillator: () => ({ connect: () => {}, start: () => {}, stop: () => {} }), createGain: () => ({ gain: { setValueAtTime: () => {} }, connect: () => {} }) };
};

// Cargar scripts
require('../js/improvements.js');
require('../js/game.js');

// 3. Probar Dificultades
assert(typeof window.DIFFICULTY_CONFIGS === 'object', 'DIFFICULTY_CONFIGS definido');
assert(window.DIFFICULTY_CONFIGS.normal, 'Dificultad normal definida');
assert(window.DIFFICULTY_CONFIGS.hard, 'Dificultad hard definida');
assert(window.DIFFICULTY_CONFIGS.mythic, 'Dificultad mythic definida');
assert(window.DIFFICULTY_CONFIGS.nightmare, 'Dificultad nightmare definida');

window.setGameDifficulty('normal');
assert.strictEqual(window.getGameDifficulty(), 'normal', 'getGameDifficulty devuelve normal');
assert.strictEqual(window.gameState.diff, 'normal', 'gameState.diff es normal');

// 4. Probar que NO hay rubber-banding en Normal
const goblin = { name: 'Duende Tramposo', hp: 24, pwr: 2, def: 0 };
window.gameState.floor = 1;
window.gameState.player = { level: 1, class: 'knight' };
const hpLvl1 = window.enemyHpFor(goblin);

window.gameState.player = { level: 10, class: 'knight' }; // Jugador nivel 10
const hpLvl10 = window.enemyHpFor(goblin);

assert.strictEqual(hpLvl1, hpLvl10, `Normal mode: Enemigo piso 1 NO escala por nivel del jugador (HP lvl 1: ${hpLvl1}, HP lvl 10: ${hpLvl10})`);
console.log(`✔ Anti Rubber-Banding: Duende Floor 1 tiene ${hpLvl1} HP sin importar que el jugador sea Nivel 1 o Nivel 10.`);

// Probar bloqueo de ascensión tipo Mortal Kombat
localStorage.setItem("bj_tower_total_wins", "0");
localStorage.setItem("blackjack_has_won_run", "false");
const blocked = window.setGameDifficulty('nightmare');
assert.strictEqual(blocked, false, "Nightmare debe estar bloqueado con 0 victorias");
console.log('✔ Bloqueo Mortal Kombat: Pesadilla bloqueada si no hay victorias previas.');

// Simular 3 victorias para desbloquear Pesadilla
localStorage.setItem("bj_tower_total_wins", "3");
const unlocked = window.setGameDifficulty('nightmare');
assert.strictEqual(unlocked, true, "Nightmare debe desbloquearse con 3 victorias");
const hpNightmareLvl10 = window.enemyHpFor(goblin);
assert(hpNightmareLvl10 > hpLvl1, `Nightmare mode: HP de enemigo escala correctamente (${hpNightmareLvl10} > ${hpLvl1})`);
console.log(`✔ Pesadilla: Duende Floor 1 tiene ${hpNightmareLvl10} HP (desafío alto confirmado).`);
window.setGameDifficulty('normal');

// 5. Probar Tower Heat en Normal
window.gameState.player.masteryLevel = 9;
const heatNormal = window.getTowerHeatMultiplier();
assert.strictEqual(heatNormal, 1.0, `Tower heat en Normal es 1.0 (obtenido: ${heatNormal})`);
console.log('✔ Tower Heat: Desactivado (1.0) en dificultad Normal');

// 6. Probar Sistema de Skins
assert(typeof window.HERO_SKINS === 'object', 'HERO_SKINS definido');
assert(Array.isArray(window.HERO_SKINS.knight), 'Skins de Caballero existen');
assert.strictEqual(window.HERO_SKINS.knight.length, 3, 'Caballero tiene 3 skins');

const equippedInit = window.getHeroEquippedSkin('knight');
assert.strictEqual(equippedInit.id, 'knight_classic', 'Skin inicial es clásica');

// Verificar bloqueo de skin dorada sin criptas ni victoria
assert.strictEqual(window.isHeroSkinUnlocked('knight', 'knight_golden'), false, 'Skin dorada bloqueada inicialmente');

// Simular desbloqueo por compra con cripta
localStorage.setItem('blackjack_crypt_coins', '100');
const unlockedBuy = window.unlockHeroSkinWithCrypt('knight', 'knight_golden');
assert.strictEqual(unlockedBuy, true, 'Desbloqueo con cripta exitoso');
assert.strictEqual(window.isHeroSkinUnlocked('knight', 'knight_golden'), true, 'Skin dorada ahora está desbloqueada');

const equippedSkin = window.getHeroEquippedSkin('knight');
assert.strictEqual(equippedSkin.id, 'knight_golden', 'Skin dorada equipada');
console.log('✔ Skins: Sistema de equipamiento y compra con Criptas 💀 100% operativo');

// 7. Probar Compendio de Perks
assert(Array.isArray(window.TACTICAL_PERKS), 'TACTICAL_PERKS es un array');
assert.strictEqual(window.TACTICAL_PERKS.length, 15, `TACTICAL_PERKS contiene 15 perks (actual: ${window.TACTICAL_PERKS.length})`);
console.log('✔ Compendio: 15 Perks Tácticos registrados y listos para consulta');

console.log('=== TODOS LOS TESTS DEL SPRINT PASARON CON ÉXITO ===');
