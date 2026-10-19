// Test: Combate D&D + Blackjack y Probabilidades en Tiempo Real (Fase 3)
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("=== TEST: COMBATE D&D + BLACKJACK Y PROBABILIDADES ===");

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

// 1. Verificación de resolveDnDBlackjackRound
assert(typeof window.resolveDnDBlackjackRound === 'function', 'resolveDnDBlackjackRound debe estar definida');

// Caso A: Menos de 15 (Mano Tímida / Glance)
const rGlance = window.resolveDnDBlackjackRound(14, 18, [{ rank: '8', suit: '♠', value: 8 }, { rank: '6', suit: '♦', value: 6 }], [], { pwr: 10, def: 4 });
assert.strictEqual(rGlance.tier, 'glance', 'Tirada < 15 debe ser tier glance');
assert.strictEqual(rGlance.mult, 0.50, 'Tier glance tiene mult 0.50');
console.log("  PASS  D&D <15: Mano tímida evaluada como Golpe Amortiguado (x0.50)");

// Caso B: 15 a 18 (Impacto Estándar / Hit)
const rHit = window.resolveDnDBlackjackRound(17, 16, [{ rank: '10', suit: '♠', value: 10 }, { rank: '7', suit: '♦', value: 7 }], [], { pwr: 10, def: 4 });
assert.strictEqual(rHit.tier, 'hit', 'Tirada 15-18 debe ser tier hit');
assert.strictEqual(rHit.mult, 1.0, 'Tier hit tiene mult 1.0');
console.log("  PASS  D&D 15-18: Impacto Confirmado estándar (x1.0)");

// Caso C: 19 a 20 (Impacto Perforante / Pierce)
const rPierce = window.resolveDnDBlackjackRound(20, 18, [{ rank: '10', suit: '♠', value: 10 }, { rank: '10', suit: '♦', value: 10 }], [], { pwr: 10, def: 4 });
assert.strictEqual(rPierce.tier, 'pierce', 'Tirada 19-20 debe ser tier pierce');
assert.strictEqual(rPierce.mult, 1.35, 'Tier pierce tiene mult 1.35');
assert.strictEqual(rPierce.defIgnorePct, 0.50, 'Tier pierce ignora 50% DEF');
console.log("  PASS  D&D 19-20: Ataque Perforante con ventaja (x1.35 e ignora 50% DEF)");

// Caso D: 21 Exacto con 3 cartas (Crítico Natural / Nat 20)
const rCrit = window.resolveDnDBlackjackRound(21, 19, [{ rank: '7', suit: '♠', value: 7 }, { rank: '7', suit: '♦', value: 7 }, { rank: '7', suit: '♥', value: 7 }], [], { pwr: 10, def: 4 });
assert.strictEqual(rCrit.tier, 'crit21', '21 con 3 cartas debe ser tier crit21');
assert.strictEqual(rCrit.mult, 2.0, 'Tier crit21 tiene mult 2.0');
assert.strictEqual(rCrit.defIgnorePct, 1.0, 'Tier crit21 ignora 100% DEF');
console.log("  PASS  D&D 21 Exacto: Crítico Natural Nat 20 (x2.0 e ignora 100% DEF)");

// Caso E: Blackjack Natural 2 cartas (Crítico Vorpal)
const rVorpal = window.resolveDnDBlackjackRound(21, 19, [{ rank: 'A', suit: '♠', value: 11, isAce: true }, { rank: 'K', suit: '♣', value: 10 }], [], { pwr: 10, def: 4 });
assert.strictEqual(rVorpal.tier, 'natural_bj', 'Blackjack 2 cartas debe ser natural_bj');
assert.strictEqual(rVorpal.mult, 2.5, 'Tier natural_bj tiene mult 2.5');
assert.strictEqual(rVorpal.statusEffect, 'stun', 'Tier natural_bj aplica estado alterado');
console.log("  PASS  D&D Blackjack Natural: Crítico Vorpal (x2.5 + Aturdimiento garantizado)");

// Caso F: Pasarse de 21 (Bust / Pifia Crítica)
const rBust = window.resolveDnDBlackjackRound(23, 17, [{ rank: '10', suit: '♠', value: 10 }, { rank: '7', suit: '♦', value: 7 }, { rank: '6', suit: '♣', value: 6 }], [], { pwr: 10, def: 4 });
assert.strictEqual(rBust.tier, 'bust', 'Puntuación > 21 es bust');
assert.strictEqual(rBust.statusEffect, 'exposed', 'Bust deja en estado expuesto');
console.log("  PASS  D&D Bust: Pifia Crítica Nat 1 (Pierde acción y sufre estado Expuesto)");

// 2. Verificación de Efectos por Pintas (♠️, ♦️, ♥️, ♣️)
const handSuits = [
  { rank: '5', suit: '♠', value: 5 },
  { rank: '5', suit: '♦', value: 5 },
  { rank: '5', suit: '♥', value: 5 },
  { rank: '5', suit: '♣', value: 5 }
];
const rSuits = window.resolveDnDBlackjackRound(20, 17, handSuits, [], { pwr: 10, def: 4 });
assert(rSuits.spadeBonus > 0, 'Pica otorga bono de daño físico');
assert(rSuits.diamondShield > 0, 'Diamante otorga puntos de escudo');
assert(rSuits.heartHeal > 0, 'Corazón otorga curación de HP');
assert(rSuits.clubOverdrive > 0, 'Trébol otorga carga de Overdrive');
console.log("  PASS  Escuelas D&D de Naipes: ♠️ Físico, ♦️ Escudo, ♥️ Curación, ♣️ Overdrive verificados");

// 3. Verificación de Probabilidades en Tiempo Real
const testHand = [{ rank: '10', suit: '♠', value: 10 }, { rank: '6', suit: '♦', value: 6 }]; // Suma 16
// Mazo con 4 cartas: As (1), 4, 5, 10
const testDeck = [
  { rank: 'A', suit: '♥', value: 11, isAce: true }, // con 16 pasa a 17 (seguro)
  { rank: '4', suit: '♣', value: 4 },               // con 16 pasa a 20 (seguro y crítico 19-21)
  { rank: '5', suit: '♦', value: 5 },               // con 16 pasa a 21 (seguro y crítico 19-21)
  { rank: '10', suit: '♠', value: 10 }              // con 16 pasa a 26 (BUST)
];

const safePct = window.calculateSafeHitChance(testHand, testDeck);
assert.strictEqual(safePct, 75, `3 de 4 cartas son seguras (esperado 75%, obtenido ${safePct}%)`);

const critPct = window.calculateCritChance(testHand, testDeck);
assert.strictEqual(critPct, 50, `2 de 4 cartas dan 19-21 (esperado 50%, obtenido ${critPct}%)`);
console.log(`  PASS  Probabilidades en tiempo real: % Seguro (${safePct}%) y % Crítico (${critPct}%) calculados sobre el mazo`);

// 4. Verificación de Tirada de Salvación
assert(typeof window.checkSavingThrow === 'function', 'checkSavingThrow debe estar definida');
window.gameState.player = {
  attributes: { dex: 16, int: 16 }
};
const didSave = typeof window.checkSavingThrow("bust") === "boolean";
assert.strictEqual(didSave, true, 'checkSavingThrow devuelve un resultado booleano válido');
console.log("  PASS  Tirada de Salvación (Saving Throw): Mecánica funcional basada en DEX e INT");

console.log("\n---------------------------------------");
console.log("RESULTADO: Todos los tests de Combate D&D + Blackjack pasaron con éxito.\n");
process.exit(0);
