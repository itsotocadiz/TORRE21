/**
 * test-phase2-combat-touch-explains.js
 * Suite de verificación para FASE 2: Explicaciones al tocar en combate.
 * Valida badges de estado y rasgos con tap, desduplicación de explainEquipmentPill,
 * integración de Perks Tácticos en ficha y botones de acción.
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
const gameJsSrc = fs.readFileSync(path.join(rootDir, 'js', 'game.js'), 'utf8');
const impJsSrc = fs.readFileSync(path.join(rootDir, 'js', 'improvements.js'), 'utf8');

console.log('== 1. Insignias de Rasgo y Estado en Combate (Táctiles) ==');
check('game.js define y exporta explainCombatStatus', /function explainCombatStatus\(/.test(gameJsSrc) && /window\.explainCombatStatus = explainCombatStatus/.test(gameJsSrc));
check('game.js define y exporta explainEnemyTrait', /function explainEnemyTrait\(/.test(gameJsSrc) && /window\.explainEnemyTrait = explainEnemyTrait/.test(gameJsSrc));
check('updateStatusBadges enlaza onclick explainCombatStatus para jugador y rival', /onclick="explainCombatStatus\('shield', false\)"/.test(gameJsSrc) && /onclick="explainCombatStatus\('shield', true\)"/.test(gameJsSrc));
check('updateStatusBadges asigna onclick explainEnemyTrait al tag de rasgo', /traitTag\.onclick\s*=\s*explainEnemyTrait/.test(gameJsSrc));
check('renderEnemyIdentity e initFloor asignan onclick explainEnemyTrait', (gameJsSrc.match(/traitTag\.onclick\s*=\s*explainEnemyTrait/g) || []).length >= 3);

console.log('\n== 2. Desduplicación y Cobertura de explainEquipmentPill ==');
const explainDefs = gameJsSrc.match(/function explainEquipmentPill\(/g) || [];
check('explainEquipmentPill tiene exactamente UNA sola definición en game.js', explainDefs.length === 1);
check('explainEquipmentPill cubre artifacts, blessing, accessory, dupla, synergies, perks, limit, turn',
  /case "artifacts":/.test(gameJsSrc) &&
  /case "blessing":/.test(gameJsSrc) &&
  /case "accessory":/.test(gameJsSrc) &&
  /case "dupla":/.test(gameJsSrc) &&
  /case "synergies":/.test(gameJsSrc) &&
  /case "perks":/.test(gameJsSrc) &&
  /case "limit":/.test(gameJsSrc) &&
  /case "turn":/.test(gameJsSrc)
);

console.log('\n== 3. Integración de Perks Tácticos (Toast y Ficha del Héroe) ==');
check('Toast de perks tácticos en improvements.js tiene onclick para showGameAlert', /tactical-perk-toast[\s\S]*?toast\.onclick\s*=\s*\(\)\s*=>[\s\S]*?showGameAlert/.test(impJsSrc));
check('Ficha del héroe (showHeroSheet) incluye botón para consultar compendio de perks', /openPerksCodexModal\(\)/.test(gameJsSrc) && /hero-sheet-section-title">⚡ PERKS TÁCTICOS Y COMBOS/.test(gameJsSrc));

console.log('\n== 4. Botones de Combate con Ayuda Contextual ==');
check('index.html contiene títulos explicativos en btn-hit, btn-stand, btn-reroll, btn-potion',
  /id="btn-hit"[^>]*title="[^"]+"/.test(htmlSrc) &&
  /id="btn-stand"[^>]*title="[^"]+"/.test(htmlSrc) &&
  /id="btn-reroll"[^>]*title="[^"]+"/.test(htmlSrc) &&
  /id="btn-potion"[^>]*title="[^"]+"/.test(htmlSrc)
);

console.log('\n---------------------------------------');
console.log(`RESULTADO: ${passed} pass / ${total - passed} fail\n`);

if (passed !== total) {
  process.exit(1);
}
