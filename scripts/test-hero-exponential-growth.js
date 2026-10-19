// Test: Crecimiento Exponencial del Personaje y Atributos RPG (Fase 2)
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("=== TEST: CRECIMIENTO DEL PERSONAJE Y ATRIBUTOS RPG ===");

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

// 1. Verificación de inicialización de atributos RPG
assert(typeof window.initHeroAttributes === 'function', 'initHeroAttributes debe ser función');
const knightAttrs = window.initHeroAttributes(null, 'knight');
assert(knightAttrs.str >= 10, 'Knight tiene STR base >= 10');
assert(knightAttrs.vit >= 10, 'Knight tiene VIT base >= 10');
assert(knightAttrs.dex >= 8, 'Knight tiene DEX base >= 8');
assert(knightAttrs.int >= 8, 'Knight tiene INT base >= 8');
assert.strictEqual(typeof knightAttrs.freePoints, 'number', 'freePoints debe ser número');
console.log("  PASS  initHeroAttributes: Inicialización balanceada por arquetipo de héroe");

// 2. Verificación de asignación de puntos (+5 puntos por nivel)
window.gameState.player = {
  class: 'knight',
  level: 2,
  maxHp: 100,
  hp: 100,
  pwr: 3,
  def: 3,
  attributes: { str: 14, dex: 10, vit: 14, int: 8, freePoints: 5 }
};

const okAssign = window.assignHeroAttribute('str', 2);
assert.strictEqual(okAssign, true, 'Asignación de STR debe ser exitosa');
assert.strictEqual(window.gameState.player.attributes.str, 16, 'STR sube de 14 a 16');
assert.strictEqual(window.gameState.player.attributes.freePoints, 3, 'freePoints se reduce de 5 a 3');

const okVit = window.assignHeroAttribute('vit', 3);
assert.strictEqual(okVit, true, 'Asignación de VIT debe ser exitosa');
assert.strictEqual(window.gameState.player.attributes.vit, 17, 'VIT sube de 14 a 17');
assert.strictEqual(window.gameState.player.attributes.freePoints, 0, 'freePoints llega a 0');

const overAssign = window.assignHeroAttribute('dex', 1);
assert.strictEqual(overAssign, false, 'No se puede asignar sin puntos libres');
console.log("  PASS  assignHeroAttribute: Distribución de puntos y consumo estricto de freePoints");

// 3. Verificación de escalado compuesto de HP con Vitalidad
const vitGain = window.gameState.player.maxHp;
assert(vitGain > 100, 'Vitalidad aumenta la Salud Máxima del héroe');
console.log(`  PASS  Escalado de Vitalidad: HP Máx incrementado a ${vitGain}`);

// 4. Verificación de Curva de XP (Niveles 1 a 8 idénticos, 9+ suavizados)
assert.strictEqual(window.getExpRequiredForLevel(1), 60, 'XP nivel 1 debe ser 60');
assert.strictEqual(window.getExpRequiredForLevel(2), 140, 'XP nivel 2 debe ser 140');
assert.strictEqual(window.getExpRequiredForLevel(6), 1050, 'XP nivel 6 debe ser 1050');
assert.strictEqual(window.getExpRequiredForLevel(8), 2200, 'XP nivel 8 debe ser 2200');

const xpLvl9 = window.getExpRequiredForLevel(9);
assert(xpLvl9 < 60 * Math.pow(1.5, 8) + 400, 'XP nivel 9 debe ser más accesible que la curva exponencial 1.5 pura');
console.log(`  PASS  getExpRequiredForLevel: Curva suavizada (Nivel 8: 2200, Nivel 9: ${xpLvl9} XP)`);

// 5. Anti Rubber-Banding: Desacoplado en Normal
const goblin = { name: 'Duende', hp: 24, pwr: 2, def: 0 };
window.gameState.diff = 'normal';
window.gameState.floor = 1;
window.gameState.player.level = 1;
const hp1 = window.enemyHpFor(goblin);

window.gameState.player.level = 10;
const hp10 = window.enemyHpFor(goblin);
assert.strictEqual(hp1, hp10, `HP de rival en Normal piso 1 NO escala por nivel del jugador (${hp1} vs ${hp10})`);
console.log("  PASS  Anti Rubber-Banding: Normal piso 1 mantiene HP sin inflarse por nivel del héroe");

console.log("\n---------------------------------------");
console.log("RESULTADO: Todos los tests de Crecimiento y Atributos RPG pasaron con éxito.\n");
process.exit(0);
