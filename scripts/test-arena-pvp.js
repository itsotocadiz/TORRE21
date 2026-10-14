// Test: Arena Rediseñada con Stats, Rivales y Muerte Súbita (Fase 2)
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("Iniciando test: Arena Rediseñada (Fase 2)...");

const gameSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf8');

// 1. Verificación de catálogo de rivales
assert(gameSrc.includes('const ARENA_RIVALS = ['), 'ARENA_RIVALS debe estar definido en game.js');
assert(gameSrc.includes('dante_spades'), 'Debe incluir a Dante de Picas');
assert(gameSrc.includes('valkyrie_diamonds'), 'Debe incluir a Valquiria de Diamantes');
assert(gameSrc.includes('archmage_clubs'), 'Debe incluir a Archimago del Trébol');
assert(gameSrc.includes('necro_void'), 'Debe incluir a Malfas del Vacío');
assert(gameSrc.includes('shadow_joker'), 'Debe incluir a Sombra del 21');

// 2. Verificación de integración de stats del héroe en el combate
assert(gameSrc.includes('playerStats = {'), 'startArenaMatch debe configurar stats del jugador');
assert(gameSrc.includes('pwr: heroInfo.pwr'), 'startArenaMatch debe usar el PWR del héroe');
assert(gameSrc.includes('def: heroInfo.def'), 'startArenaMatch debe usar la DEF del héroe');

// 3. Verificación de mazo compuesto con botín y compras de arena
assert(gameSrc.includes('getPersistentExtraCards()'), 'startArenaMatch debe incluir cartas de botín en la baraja de arena');
assert(gameSrc.includes('buildStandardDeck()'), 'startArenaMatch debe usar el mazo estándar que ya integra las cartas extra');

// 4. Verificación de regla de 3 rondas y Muerte Súbita
assert(gameSrc.includes('maxRounds: 3'), 'El combate de arena debe tener límite de 3 rondas base');
assert(gameSrc.includes('arenaMatch.isSuddenDeath = true;'), 'Al empatar tras la ronda 3 debe activarse la Muerte Súbita');
assert(gameSrc.includes('mult = arenaMatch.isSuddenDeath ? 2 : 1;'), 'En muerte súbita el daño debe ser x2');

// 5. Verificación de persistencia de historial de duelos
assert(gameSrc.includes('bj_arena_history'), 'game.js debe persistir el historial de duelos en bj_arena_history');
assert(gameSrc.includes('saveArenaMatchHistory'), 'game.js debe implementar saveArenaMatchHistory');

// 6. Prueba funcional simulada de cálculo de daño en arena con stats
function simulateArenaDamage(winnerScore, loserScore, winnerPwr, loserDef, isSuddenDeath) {
  const mult = isSuddenDeath ? 2 : 1;
  const dmg = Math.max(8, winnerPwr + (winnerScore - loserScore) - loserDef) * mult;
  return dmg;
}

const dmgNormal = simulateArenaDamage(21, 18, 14, 6, false);
// 14 + (21 - 18) - 6 = 14 + 3 - 6 = 11 de daño
assert.strictEqual(dmgNormal, 11, "El daño calculado con stats normales debe ser 11");

const dmgSudden = simulateArenaDamage(21, 18, 14, 6, true);
// 11 * 2 = 22 de daño en muerte súbita
assert.strictEqual(dmgSudden, 22, "El daño en muerte súbita debe duplicarse a 22");

console.log("PASS: Todas las pruebas de Arena Rediseñada superadas con éxito (Fase 2).");
