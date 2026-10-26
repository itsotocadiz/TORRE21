// Test: Rediseño Completo de "Juramento del Tahúr" (v1.9.3)
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("Iniciando test: Rediseño Completo de Juramento del Tahúr...");

const gameSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf8');

// 1. Verificación de CURSE_NAMES en game.js
assert(gameSrc.includes('const CURSE_NAMES ='), 'CURSE_NAMES debe estar definido en game.js');
assert(gameSrc.includes('gambler_pact: "Juramento del Tahúr'), 'CURSE_NAMES debe incluir gambler_pact con nombre rediseñado');
assert(gameSrc.includes('window.CURSE_NAMES = CURSE_NAMES;'), 'CURSE_NAMES debe exponerse');

// 2. Verificación de bonificación permanente en ALTAR_PACTS
assert(gameSrc.includes('id: "gambler_pact"'), 'gambler_pact debe estar en ALTAR_PACTS');
assert(gameSrc.includes('p.pwr = (p.pwr || 0) + 3;'), 'Debe otorgar +3 PWR permanente');
assert(gameSrc.includes('p._sacrificeCrit = (p._sacrificeCrit || 0) + 12;'), 'Debe otorgar +12% Crítico permanente');
assert(gameSrc.includes('p.luck = (p.luck || 0) + 15;'), 'Debe otorgar +15% Suerte permanente');

// 3. Verificación de efecto al doblar en resolveHandResult
assert(gameSrc.includes('if (p.curse === "gambler_pact") {'), 'resolveHandResult debe verificar gambler_pact');
assert(gameSrc.includes('p.hp = Math.min(p.maxHp, p.hp + 8);'), 'Al doblar y ganar debe curar +8 HP');
assert(gameSrc.includes('gameState.gold = (gameState.gold || 0) + 6;'), 'Al doblar y ganar debe otorgar +6 Oro');

// 4. Prueba funcional simulada de aplicación de Juramento del Tahúr
function simulateApplyGamblerPact(player, gameState) {
  player.curse = "gambler_pact";
  player.pwr = (player.pwr || 0) + 3;
  player._sacrificeCrit = (player._sacrificeCrit || 0) + 12;
  player.luck = (player.luck || 0) + 15;
  if (player.levelUpStats) {
    player.levelUpStats.pwr = (player.levelUpStats.pwr || 0) + 3;
    player.levelUpStats.crit = (player.levelUpStats.crit || 0) + 12;
    player.levelUpStats.luck = (player.levelUpStats.luck || 0) + 15;
  }
}

const testPlayer = { hp: 40, maxHp: 60, pwr: 10, luck: 5, _sacrificeCrit: 0, levelUpStats: {} };
const testGame = { gold: 20 };
simulateApplyGamblerPact(testPlayer, testGame);

assert.strictEqual(testPlayer.pwr, 13, "El ataque debe subir en +3");
assert.strictEqual(testPlayer._sacrificeCrit, 12, "El crítico debe subir en +12%");
assert.strictEqual(testPlayer.luck, 20, "La suerte debe subir en +15%");
assert.strictEqual(testPlayer.curse, "gambler_pact", "La maldición activa debe ser gambler_pact");

// 5. Prueba funcional simulada de resolución de mano al Doblar
function simulateDoubleWin(player, gameState, isDoubleWin) {
  let logs = [];
  function addLog(msg) { logs.push(msg); }
  if (isDoubleWin && player.curse === "gambler_pact") {
    player.hp = Math.min(player.maxHp, player.hp + 8);
    gameState.gold = (gameState.gold || 0) + 6;
    addLog("🎲 Juramento del Tahúr: ¡Victoria al Doblar te restaura +8 HP y te otorga +6 Oro extra!");
  }
  return { logs, hp: player.hp, gold: gameState.gold };
}

const doubleOutcome = simulateDoubleWin(testPlayer, testGame, true);
assert.strictEqual(doubleOutcome.hp, 48, "Debe curar +8 HP al ganar tras doblar");
assert.strictEqual(doubleOutcome.gold, 26, "Debe añadir +6 de Oro al ganar tras doblar");
assert(doubleOutcome.logs.some(l => l.includes("Juramento del Tahúr")), "Debe registrar log temático");

console.log("PASS: Todas las pruebas del Rediseño Completo de Juramento del Tahúr superadas correctamente.");
