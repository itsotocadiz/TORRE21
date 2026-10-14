// Test: Juramento del Gran Tahur (Fase B)
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("Iniciando test: Pacto del Gran Tahur (Fase B)...");

const gameSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf8');

// 1. Verificacion de CURSE_NAMES en game.js
assert(gameSrc.includes('const CURSE_NAMES ='), 'CURSE_NAMES debe estar definido en game.js');
assert(gameSrc.includes('gambler_pact: "Juramento del Gran Tahúr'), 'CURSE_NAMES debe incluir gambler_pact con nombre legible');
assert(gameSrc.includes('window.CURSE_NAMES = CURSE_NAMES;'), 'CURSE_NAMES debe exponerse');

// 2. Verificacion de validacion en placeBet
assert(gameSrc.includes('p.curse === "gambler_pact" && p.hp >= 10 && amount < 10'), 'placeBet debe bloquear apuestas menores a 10 HP con gambler_pact');

// 3. Verificacion de desactivacion visual en showBetScreen
assert(gameSrc.includes('const blockedByCurse = isGamblerPact && p.hp >= 10 && amt < 10'), 'showBetScreen debe marcar disabled para apuestas menores a 10');

// 4. Verificacion del multiplicador x3.5 en playerAttack
assert(gameSrc.includes('isBlackjackImpact && ((p.blackjackMultiplier && p.blackjackMultiplier > 1) || (p && p.curse === "gambler_pact"))'), 'playerAttack debe aplicar multiplicador al tener gambler_pact');
assert(gameSrc.includes('dmg = Math.max(1, Math.round(dmg * mult));'), 'playerAttack debe calcular el daño multiplicado');

// 5. Verificacion de reseteo en purga de hoguera y nueva run
assert(gameSrc.includes('p.blackjackMultiplier = 1;'), 'La purga y reseteo deben reiniciar blackjackMultiplier a 1');

// 6. Prueba funcional simulada de placeBet
function simulatePlaceBet(player, enemy, amount) {
  let logs = [];
  function addLog(msg, type) { logs.push({ msg, type }); }
  let handStarted = false;
  function startNewHand() { handStarted = true; }

  const p = player;
  const gameState = { player, enemy, phase: 'bet' };

  if (p && p.curse === "gambler_pact" && p.hp >= 10 && amount < 10) {
    addLog("🎲 Juramento del Gran Tahúr: Tu apuesta mínima de combate queda fijada en 10 HP.", "warning");
    return { ok: false, logs, betAmount: p.betAmount, handStarted };
  }
  if (amount > p.hp) {
    addLog(`No puedes apostar ${amount} HP — tienes solo ${p.hp}.`, "warning");
    return { ok: false, logs, betAmount: p.betAmount, handStarted };
  }
  p.betAmount = amount;
  gameState.phase = "hand";
  startNewHand();
  return { ok: true, logs, betAmount: p.betAmount, handStarted };
}

// Caso A: Jugador sin pacto puede apostar 0 y 5
const pNormal = { hp: 50, curse: null, betAmount: 0 };
const eNormal = { hp: 50 };
let res = simulatePlaceBet(pNormal, eNormal, 0);
assert.strictEqual(res.ok, true, "Sin pacto debe poder apostar 0");
assert.strictEqual(res.betAmount, 0);
res = simulatePlaceBet(pNormal, eNormal, 5);
assert.strictEqual(res.ok, true, "Sin pacto debe poder apostar 5");
assert.strictEqual(res.betAmount, 5);

// Caso B: Jugador con pacto y 50 HP intenta apostar 0 o 5 -> Rechazado
const pCurse = { hp: 50, curse: "gambler_pact", betAmount: 0 };
res = simulatePlaceBet(pCurse, eNormal, 0);
assert.strictEqual(res.ok, false, "Con pacto no debe poder apostar 0");
assert.strictEqual(res.betAmount, 0);
assert(res.logs.some(l => l.msg.includes("Juramento del Gran Tahúr")));

res = simulatePlaceBet(pCurse, eNormal, 5);
assert.strictEqual(res.ok, false, "Con pacto no debe poder apostar 5");

// Caso C: Jugador con pacto y 50 HP apuesta 10, 15, 25 -> Aceptado
res = simulatePlaceBet(pCurse, eNormal, 10);
assert.strictEqual(res.ok, true, "Con pacto debe poder apostar 10");
assert.strictEqual(res.betAmount, 10);

res = simulatePlaceBet(pCurse, eNormal, 15);
assert.strictEqual(res.ok, true, "Con pacto debe poder apostar 15");
assert.strictEqual(res.betAmount, 15);

res = simulatePlaceBet(pCurse, eNormal, 25);
assert.strictEqual(res.ok, true, "Con pacto debe poder apostar 25");
assert.strictEqual(res.betAmount, 25);

// Caso D: Jugador con pacto en estado crítico (HP < 10) no queda bloqueado
const pLowHp = { hp: 7, curse: "gambler_pact", betAmount: 0 };
res = simulatePlaceBet(pLowHp, eNormal, 5);
assert.strictEqual(res.ok, true, "Con < 10 HP debe permitir apostar el saldo disponible sin softlock");
assert.strictEqual(res.betAmount, 5);

// 7. Prueba funcional del multiplicador x3.5 en Blackjack
function simulateDamageMultiplier(baseDmg, isBlackjack, player) {
  let dmg = baseDmg;
  const isBlackjackImpact = isBlackjack;
  if (isBlackjackImpact && ((player.blackjackMultiplier && player.blackjackMultiplier > 1) || (player && player.curse === "gambler_pact"))) {
    const mult = player.blackjackMultiplier || 3.5;
    dmg = Math.max(1, Math.round(dmg * mult));
  }
  return dmg;
}

const dmgNormal = simulateDamageMultiplier(20, true, { curse: null, blackjackMultiplier: 1 });
assert.strictEqual(dmgNormal, 20, "Sin pacto el daño no se multiplica");

const dmgPact = simulateDamageMultiplier(20, true, { curse: "gambler_pact", blackjackMultiplier: 3.5 });
assert.strictEqual(dmgPact, 70, "Con pacto el daño de 20 en Blackjack debe ser 20 * 3.5 = 70");

console.log("PASS: Todas las pruebas del Pacto del Gran Tahur superadas correctamente (Fase B).");
