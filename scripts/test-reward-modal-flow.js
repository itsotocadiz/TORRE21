// Test para validar el flujo de muerte del enemigo y apertura de la pantalla de 3 beneficios
const fs = require('fs');
const path = require('path');

const gameJsPath = path.resolve(__dirname, '..', 'js', 'game.js');
const gameContent = fs.readFileSync(gameJsPath, 'utf8');

let pass = 0;
let fail = 0;

function assert(condition, desc) {
  if (condition) {
    console.log(`  PASS: ${desc}`);
    pass++;
  } else {
    console.error(`  FAIL: ${desc}`);
    fail++;
  }
}

console.log("== 1. Verificación de variables en showRewardModal ==");
assert(gameContent.includes('const descEl = document.getElementById("event-desc");'), 'descEl está declarado');
assert(gameContent.includes('const optEl = document.getElementById("event-options");'), 'optEl está declarado');
assert(!gameContent.includes('if (descEl) {') || gameContent.indexOf('const descEl') < gameContent.indexOf('if (descEl) {'), 'descEl se declara antes de usarse');

console.log("== 2. Verificación de las 3 opciones en la pantalla de beneficios ==");
assert(gameContent.includes('LA HOGUERA ANCESTRAL'), 'Opción 1: Hoguera Ancestral presente');
assert(gameContent.includes('EL BAZAR DEL DESTINO'), 'Opción 2: El Bazar del Destino presente');
assert(gameContent.includes('EL YUNQUE TAHÚR'), 'Opción 3: El Yunque Tahúr presente');

console.log("== 3. Verificación de resumeSavedRun ==");
const resumeSnippet = gameContent.slice(gameContent.indexOf('function resumeSavedRun'), gameContent.indexOf('function resumeSavedRun') + 5000);
assert(resumeSnippet.includes('floorCleared'), 'Manejo de floorCleared presente');
assert(resumeSnippet.includes('showRewardModal()'), 'Al reanudar con piso despejado abre showRewardModal (no solo la tienda)');

console.log("== 4. Ocultar overlays solapados al mostrar recompensas ==");
const rewardModalSnippet = gameContent.slice(gameContent.indexOf('function showRewardModal'), gameContent.indexOf('function showRewardModal') + 6000);
assert(rewardModalSnippet.includes('m.classList.remove("hidden")'), 'screen-event se hace visible');
assert(rewardModalSnippet.includes('screen-bet'), 'Oculta screen-bet para evitar solapamiento');

console.log(`\nResultado: ${pass} pass / ${fail} fail`);
if (fail > 0) process.exit(1);
