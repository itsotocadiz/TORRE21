// Test: Auditoría de Fase 0 (Arreglos Rápidos) y Fase 1 (Misiones de Héroes)
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("Iniciando test: Auditoría Fase 0 y Fase 1...");

const gameSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf8');
const htmlSrc = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const cssSrc = fs.readFileSync(path.join(__dirname, '..', 'css', 'style.css'), 'utf8');

// ==========================================
// 1. FASE 0.1: Apuestas [1, 5, 10, 15, 25] y sin "gratis"
// ==========================================
assert(gameSrc.includes('const BET_OPTIONS = [1, 5, 10, 15, 25];'), 'BET_OPTIONS debe iniciar en 1 HP, sin opción 0');
assert(!gameSrc.includes('0 HP (gratis)'), 'BET_LABELS no debe incluir "0 HP (gratis)"');
assert(htmlSrc.includes('onclick="placeBet(1)"'), 'index.html debe ofrecer apuesta mínima de 1 HP');
assert(!htmlSrc.includes('onclick="placeBet(0)"'), 'index.html no debe ofrecer apuesta de 0 HP');

// ==========================================
// 2. FASE 0.2: Ataque enemigo animado aun con 0 daño
// ==========================================
assert(gameSrc.includes('// Ejecutar animación de embestida del rival'), 'game.js debe animar al rival en todos los ataques');
const enemyIdx = gameSrc.indexOf('// Ejecutar animación de embestida del rival');
const strikeIdx = gameSrc.indexOf('setEnemySpriteState("strike")', enemyIdx);
const dmgCheckIdx = gameSrc.indexOf('if (incomingDmg === 0)', strikeIdx);
assert(strikeIdx !== -1 && dmgCheckIdx !== -1 && strikeIdx < dmgCheckIdx, 'La animación de golpe debe preceder al cálculo de absorción de armadura');

// ==========================================
// 3. FASE 0.3: Arena estable (centrado, sin ronda 4/3 en empate, reset al cerrar)
// ==========================================
assert(cssSrc.includes('.pvp-enter-btn') && cssSrc.includes('margin: 10px auto'), 'El botón ENTRAR de la arena debe estar centrado');
assert(gameSrc.includes('arenaMatch.isDrawRound = true;'), 'arenaPlayerStand debe marcar isDrawRound en empate');
assert(gameSrc.includes('if (arenaMatch.isDrawRound)'), 'arenaNextRound debe comprobar si hubo empate para no inflar la ronda');
assert(gameSrc.includes('arenaMatch = null;'), 'closeArenaPvpModal debe resetear el estado de la partida');

// ==========================================
// 4. FASE 0.4: Selector de dificultad en pausa completo
// ==========================================
assert(gameSrc.includes('value="mythic"'), 'El selector de pausa debe incluir dificultad Mítica');
assert(gameSrc.includes('value="nightmare"'), 'El selector de pausa debe incluir Pesadilla');

// ==========================================
// 5. FASE 0.6: Textos honestos en UI
// ==========================================
assert(!htmlSrc.includes('🏆 DUELOS MULTIJUGADOR'), 'index.html no debe publicitar multijugador inexistente');
assert(!htmlSrc.includes('apuestas ciegas y trofeos'), 'index.html no debe publicitar apuestas ciegas');
assert(htmlSrc.includes('🏆 DUELOS DE LA ARENA'), 'index.html debe titular apropiadamente DUELOS DE LA ARENA');

// ==========================================
// 6. FASE 1: Misiones de Héroes endurecidas
// ==========================================
assert(gameSrc.includes('rogue: { unlocked: false, progress: 0, target: 30, missionText: "Gana 30 manos con número par" }'), 'Pícaro debe requerir 30 manos pares');
assert(gameSrc.includes('monk: { unlocked: false, progress: 0, target: 7, missionText: "Alcanza el Piso 7 en la Torre" }'), 'Monje debe requerir Piso 7');
assert(gameSrc.includes('necromancer: { unlocked: false, progress: 0, target: 30, missionText: "💀 Derrota 30 rivales en la Torre" }'), 'Nigromante debe requerir 30 rivales');

console.log("PASS: Todas las aserciones de Fase 0 y Fase 1 superadas con éxito.");
