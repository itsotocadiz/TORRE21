/**
 * test-double-down.js
 * Suite de verificación para la mecánica ¡DOBLAR! (Double Down).
 * Valida: validación de 2 cartas, robo único, IA enemiga, desenlace, resolveHandResult,
 * limpieza de multiplicadores y reseteo de isRolling para evitar congelamientos.
 */

const fs = require('fs');
const path = require('path');

let total = 0;
let passed = 0;

function check(desc, ok) {
  total++;
  if (ok) {
    passed++;
    console.log(`  PASS ${desc}`);
  } else {
    console.error(`  FAIL ${desc}`);
  }
}

const rootDir = path.resolve(__dirname, '..');
const htmlSrc = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const jsSrc = fs.readFileSync(path.join(rootDir, 'js', 'game.js'), 'utf8');
const cssSrc = fs.readFileSync(path.join(rootDir, 'css', 'style.css'), 'utf8');

console.log('== 1. Botón #btn-double en index.html y Estilos en style.css ==');
check('index.html contiene #btn-double con onclick playerAction("double")', /id="btn-double"[\s\S]*?onclick="playerAction\('double'\)"/.test(htmlSrc));
check('css define .btn-double con gradiente y estilo táctil', /\.btn-double\s*\{/.test(cssSrc));
check('css define .btn-double:disabled con opacidad y sin eventos', /\.btn-double:disabled\s*\{[\s\S]*?pointer-events:\s*none/.test(cssSrc));

console.log('\n== 2. Lógica de Doblar y Prevención de Bloqueos en game.js ==');
check('action === "double" restringe el uso a exactamente 2 cartas', /action === "double"[\s\S]*?p\.playerHand\.length !== 2/.test(jsSrc));
check('action === "double" activa p.turnDoubleDamage = true', /action === "double"[\s\S]*?p\.turnDoubleDamage = true/.test(jsSrc));
check('action === "double" ejecuta enemyPlayAuto al no pasarse', /action === "double"[\s\S]*?await enemyPlayAuto\(e\)/.test(jsSrc));
check('action === "double" evalúa el outcome tras el turno rival', /action === "double"[\s\S]*?outcome = "win"[\s\S]*?outcome = "lose"/.test(jsSrc));
check('action === "double" llama a resolveHandResult(outcome) en rama válida', /action === "double"[\s\S]*?await resolveHandResult\(outcome\)/.test(jsSrc));
check('action === "double" resetea gameState.isRolling = false tras el desenlace', /action === "double"[\s\S]*?gameState\.isRolling = false;[\s\S]*?await resolveHandResult/.test(jsSrc));

console.log('\n== 3. Integración de Daño Doble y Control de Rondas ==');
check('resolveHandResult amplifica daño del jugador si turnDoubleDamage es true', /if \(p\.turnDoubleDamage && dmg > 0\)[\s\S]*?doubleMult/.test(jsSrc));
check('resolveHandResult amplifica contraataque rival si turnDoubleDamage es true', /if \(p\.turnDoubleDamage\)[\s\S]*?rawDmg = Math\.round\(rawDmg \* 2\.0\)/.test(jsSrc));
check('resolveHandResult resetea turnDoubleDamage al finalizar la mano', /clashIcon\.classList\.remove\("clashing"\);[\s\S]*?p\.turnDoubleDamage = false;/.test(jsSrc));
check('showNextRoundButton asegura gameState.isRolling = false', /function showNextRoundButton\(\)\s*\{[\s\S]*?gameState\.isRolling = false;/.test(jsSrc));
check('advanceToNextRound asegura gameState.isRolling = false', /function advanceToNextRound\(\)\s*\{[\s\S]*?gameState\.isRolling = false;/.test(jsSrc));

console.log('\n---------------------------------------');
console.log(`RESULTADO: ${passed} pass / ${total - passed} fail\n`);

if (passed !== total) {
  process.exit(1);
}
