/**
 * TEST AUTOMATIZADO: RETENCIÓN, DIFICULTADES ESCALADAS, FORJA Y PVP
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

// 1. Simular entorno DOM
global.window = global;
global.window.addEventListener = () => {};
global.document = {
  getElementById: (id) => ({
    id,
    classList: { add: () => {}, remove: () => {}, contains: () => false },
    style: {},
    innerText: '',
    innerHTML: '',
    querySelectorAll: () => [],
    addEventListener: () => {}
  }),
  querySelectorAll: () => [],
  addEventListener: () => {}
};

global.localStorage = {
  _data: {},
  getItem(k) { return this._data[k] !== undefined ? this._data[k] : null; },
  setItem(k, v) { this._data[k] = String(v); },
  removeItem(k) { delete this._data[k]; },
  clear() { this._data = {}; }
};

global.Audio = class { play() {} pause() {} };
global.navigator = { vibrate: () => {} };

// Cargar game.js
const gameCode = fs.readFileSync(path.join(__dirname, '../js/game.js'), 'utf8');
eval(gameCode);

console.log('=== VERIFICACIÓN DE REQUERIMIENTOS DEL USUARIO ===');

// 1. Verificar alturas de torre (Pisos progresivos tipo Mortal Kombat)
assert.strictEqual(window.getMaxFloorsForDifficulty('normal'), 7, 'Torre Normal debe tener 7 pisos');
assert.strictEqual(window.getMaxFloorsForDifficulty('hard'), 9, 'Torre Heroica debe tener 9 pisos');
assert.strictEqual(window.getMaxFloorsForDifficulty('mythic'), 11, 'Torre Mítica debe tener 11 pisos');
assert.strictEqual(window.getMaxFloorsForDifficulty('nightmare'), 13, 'Torre Pesadilla debe tener 13 pisos');
console.log('✔ Pisos por torre: Normal=7, Heroico=9, Mítico=11, Pesadilla=13.');

// 2. Verificar desbloqueo secuencial (Estilo Mortal Kombat)
localStorage.setItem('bj_tower_total_wins', '0');
localStorage.setItem('blackjack_has_won_run', 'false');
assert.strictEqual(window.isDifficultyUnlocked('normal'), true, 'Normal siempre abierta');
assert.strictEqual(window.isDifficultyUnlocked('hard'), false, 'Heroico bloqueado al inicio');
assert.strictEqual(window.isDifficultyUnlocked('mythic'), false, 'Mítico bloqueado al inicio');
assert.strictEqual(window.isDifficultyUnlocked('nightmare'), false, 'Pesadilla bloqueado al inicio');

// Con 1 victoria de torre
localStorage.setItem('bj_tower_total_wins', '1');
assert.strictEqual(window.isDifficultyUnlocked('hard'), true, 'Heroico se desbloquea con 1 victoria');
assert.strictEqual(window.isDifficultyUnlocked('mythic'), false, 'Mítico aún bloqueado con 1 victoria');

// Con 2 victorias de torre
localStorage.setItem('bj_tower_total_wins', '2');
assert.strictEqual(window.isDifficultyUnlocked('mythic'), true, 'Mítico se desbloquea con 2 victorias');

// Con 3 victorias de torre
localStorage.setItem('bj_tower_total_wins', '3');
assert.strictEqual(window.isDifficultyUnlocked('nightmare'), true, 'Pesadilla se desbloquea con 3 victorias');
console.log('✔ Desbloqueo progresivo tipo Mortal Kombat 100% verificado.');

// 3. Forja de Maestría: Candidatas = 4 cartas
const candidates = window.drawCandidatesForEnchantment();
assert.strictEqual(candidates.length, 4, 'Candidatas a forja de sello deben ser exactamente 4 cartas');
console.log('✔ Forja de Sello Arcano: Ofrece exactamente 4 cartas como opción.');

// 4. Arena PvP desbloqueada y operativa
let pvpModalOpened = false;
global.document.getElementById = (id) => {
  if (id === 'screen-arena-pvp-modal') {
    return {
      classList: {
        remove: (c) => { if (c === 'hidden') pvpModalOpened = true; },
        add: () => {}
      }
    };
  }
  return { classList: { add: () => {}, remove: () => {} }, style: {}, innerText: '', innerHTML: '' };
};

localStorage.setItem('blackjack_vip_unlocked', 'false');
localStorage.setItem('blackjack_has_won_run', 'false');
window.openArenaPvpModal();
assert.strictEqual(pvpModalOpened, true, 'Arena PvP abre libremente para cualquier jugador nuevo');
console.log('✔ Arena PvP: Acceso libre sin bloqueo ni candados.');

// 5. Selector por palos de Barajas Forjadas
const testEnchanted = {
  "♠_A": { name: "Sello Afilado", icon: "🗡️" },
  "♥_K": { name: "Sello Ígneo", icon: "🔥" }
};
const fanHtml = window.renderHandDeckFan(testEnchanted, "test-container");
assert(fanHtml.includes('<select class="fan-suit-select"'), 'Debe incluir selector desplegable');
assert(fanHtml.includes('♠ PICAS'), 'Debe listar conteo de picas');
assert(fanHtml.includes('♥ CORAZONES'), 'Debe listar conteo de corazones');
console.log('✔ Barajas Forjadas: Menú desplegable por palo implementado para ahorrar espacio vertical.');

console.log('=== TODOS LOS REQUERIMIENTOS NUEVOS VALIDADOS CON ÉXITO ===');
