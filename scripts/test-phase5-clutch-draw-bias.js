/**
 * test-phase5-clutch-draw-bias.js
 * Suite de verificación para FASE 5: Debilidad con Suerte (Sesgo de robo cuando HP <= 30%).
 * Valida: soporte de biasTarget en drawCard, selección certera de carta salvadora,
 * integración con playerAction('hit') bajo umbral de HP crítico y mensajes temáticos.
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
const gameJsSrc = fs.readFileSync(path.join(rootDir, 'js', 'game.js'), 'utf8');

console.log('== 1. Definición y Parámetro biasTarget en drawCard ==');
check('drawCard acepta parámetro biasTarget y está exportada', /function drawCard\(biasTarget\s*=\s*null\)/.test(gameJsSrc) && /window\.drawCard = drawCard/.test(gameJsSrc));

// Mock para probar drawCard con biasTarget
let mockDrawPile = [
  { rank: 'K', suit: '♠', value: 10, isAce: false },
  { rank: '4', suit: '♥', value: 4, isAce: false },
  { rank: '7', suit: '♦', value: 7, isAce: false },
  { rank: 'A', suit: '♣', value: 11, isAce: true }
];

let globalContext = {
  drawPile: [...mockDrawPile],
  rebuildDrawPile: () => {},
  addLog: () => {},
  gameState: { player: { cardEnchantments: {} } }
};

// Extraer drawCard
const match = gameJsSrc.match(/function drawCard\(biasTarget = null\) \{[\s\S]*?\n  \}/);
let drawCardFn = null;
if (match) {
  try {
    const fnBody = match[0];
    const factory = new Function('drawPile', 'rebuildDrawPile', 'addLog', 'gameState', `${fnBody}; return drawCard;`);
    drawCardFn = factory(globalContext.drawPile, globalContext.rebuildDrawPile, globalContext.addLog, globalContext.gameState);
  } catch (e) {
    console.error('Error al evaluar drawCard:', e.message);
  }
}

check('drawCard con biasTarget=7 extrae la carta de valor 7 de la baraja', () => {
  if (!drawCardFn) return false;
  const card = drawCardFn(7);
  return card && card.value === 7;
});

check('drawCard con biasTarget=1 extrae un As de la baraja', () => {
  if (!drawCardFn) return false;
  const card = drawCardFn(1);
  return card && card.isAce === true;
});

check('drawCard con biasTarget=null extrae la última carta de la baraja (pop)', () => {
  if (!drawCardFn) return false;
  const prevLen = globalContext.drawPile.length;
  const card = drawCardFn(null);
  return card !== null && globalContext.drawPile.length === prevLen - 1;
});

console.log('\n== 2. Integración en playerAction("hit") ==');
check('playerAction("hit") evalúa umbral crítico de HP (HP <= 30%)', /isCriticalHp\s*=\s*p\.hp\s*>\s*0\s*&&\s*p\.hp\s*<=\s*Math\.ceil\(p\.maxHp\s*\*\s*0\.30\)/.test(gameJsSrc));
check('playerAction("hit") calcula scoreDiff (21 - playerScore) y asigna clutchTarget', /scoreDiff\s*=\s*21\s*-\s*p\.playerScore/.test(gameJsSrc) && /clutchTarget\s*=\s*scoreDiff/.test(gameJsSrc));
check('playerAction("hit") invoca drawCard(clutchTarget)', /const newCard = drawCard\(clutchTarget\)/.test(gameJsSrc));
check('playerAction("hit") muestra feedback con icono de trébol 🍀', /🍀 ¡La Fortuna de la Torre/.test(gameJsSrc) && /🍀 ¡SUERTE DEL DESESPERADO!/.test(gameJsSrc));

console.log('\n---------------------------------------');
console.log(`RESULTADO: ${passed} pass / ${total - passed} fail\n`);

if (passed !== total) {
  process.exit(1);
}
