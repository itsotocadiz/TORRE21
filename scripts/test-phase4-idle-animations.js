/**
 * test-phase4-idle-animations.js
 * Suite de verificación para FASE 4: Animaciones de Combate (Idle marioneta de papel y matriz).
 * Valida: keyframes y clases de animación idle para jugador y enemigo, integración
 * en la máquina de estados de sprites, y altura mínima de estabilidad en la mesa de cartas.
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
const cssSrc = fs.readFileSync(path.join(rootDir, 'css', 'style.css'), 'utf8');

console.log('== 1. Keyframes de Animación Idle Marioneta de Papel ==');
check('css define keyframe spriteIdlePlayer', /@keyframes spriteIdlePlayer\s*\{/.test(cssSrc));
check('css define keyframe spriteIdleEnemy', /@keyframes spriteIdleEnemy\s*\{/.test(cssSrc));
check('css define clase .sprite.sprite-idle-player con bucle infinito', /\.sprite\.sprite-idle-player\s*\{[^}]*spriteIdlePlayer[^}]*infinite/.test(cssSrc));
check('css define clase .sprite.sprite-idle-enemy con bucle infinito', /\.sprite\.sprite-idle-enemy\s*\{[^}]*spriteIdleEnemy[^}]*infinite/.test(cssSrc));

console.log('\n== 2. Máquina de Estados de Sprites (game.js) ==');
check('setPlayerSpriteState asigna animClass sprite-idle-player en reposo', /case "idle":[\s\S]*?animClass\s*=\s*"sprite-idle-player"/.test(gameJsSrc));
check('setEnemySpriteState asigna animClass sprite-idle-enemy en reposo', /case "idle":[\s\S]*?animClass\s*=\s*"sprite-idle-enemy"/.test(gameJsSrc));
check('allEnemyAnim incluye sprite-idle-enemy para limpiarlo al atacar/dañarse', /allEnemyAnim\s*=\s*\[[\s\S]*?"sprite-idle-enemy"/.test(gameJsSrc));

console.log('\n== 3. Estabilidad de la Mesa de Naipes (cards-area y cards-hand) ==');
check('.cards-area tiene min-height para evitar colapsos', /\.cards-area\s*\{[^}]*min-height:\s*\d+px/.test(cssSrc));
check('.cards-hand tiene min-height para transición suave', /\.cards-hand\s*\{[^}]*min-height:\s*\d+px/.test(cssSrc));

console.log('\n---------------------------------------');
console.log(`RESULTADO: ${passed} pass / ${total - passed} fail\n`);

if (passed !== total) {
  process.exit(1);
}
