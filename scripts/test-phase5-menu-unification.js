/**
 * test-phase5-menu-unification.js
 * Suite de verificación para Fase 5: Unificación de Pestañas y Menús (R-09).
 * Audita ergonomía táctil (44px), estética Paper Mario compartida y scroll limpio.
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
const cssSrc = fs.readFileSync(path.join(rootDir, 'css', 'style.css'), 'utf8');
const indexSrc = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const gameSrc = fs.readFileSync(path.join(rootDir, 'js', 'game.js'), 'utf8');

console.log('== 1. Auditoría de Selectores y Clases de Pestañas ==');
const tabFamilies = [
  '.game-tab-btn',
  '.title-tab-btn',
  '.shop-tab-btn',
  '.codex-tab-btn',
  '.arena-tab-btn',
  '.hero-sheet-tab-btn',
  '.tut-tab',
  '.pct-tab-btn'
];

tabFamilies.forEach(selector => {
  check(`Selector unificado ${selector} presente en CSS`, cssSrc.includes(selector));
});

console.log('\n== 2. Ergonomía Táctil y Accesibilidad (44px min-height) ==');
check('CSS garantiza min-height: 44px en pestañas', cssSrc.includes('min-height: 44px !important'));
check('CSS incluye touch-action: manipulation', cssSrc.includes('touch-action: manipulation !important'));
check('CSS previene selección de texto en botones', cssSrc.includes('user-select: none !important'));

console.log('\n== 3. Feedback Táctil Paper Mario (Micro-hundimiento y Sombras) ==');
check('Feedback :active con translateY(2px)', cssSrc.includes('transform: translateY(2px) scale(0.98) !important'));
check('Pestañas activas tienen sombra Paper Mario recortada (2px 2px 0)', cssSrc.includes('box-shadow: 2px 2px 0'));

console.log('\n== 4. Contenedores de Pestañas y Scroll Horizontal Limpio ==');
const tabContainers = [
  '.title-nav-tabs',
  '.shop-tabs-nav',
  '.codex-tabs',
  '.arena-tabs-nav',
  '.tutorial-tabs',
  '.perks-codex-tabs',
  '.hero-sheet-tabs-nav'
];

tabContainers.forEach(container => {
  check(`Contenedor ${container} incluido en regla de scroll limpio`, cssSrc.includes(container));
});

check('Regla scrollbar-width: none configurada', cssSrc.includes('scrollbar-width: none !important'));
check('Regla ::-webkit-scrollbar oculta en contenedores', cssSrc.includes('::-webkit-scrollbar'));

console.log('\n== 5. Integración en Marcado HTML y Motor JS ==');
check('index.html contiene title-nav-tabs y sus 5 pestañas', indexSrc.includes('title-nav-tabs') && indexSrc.includes('btn-tab-play'));
check('index.html contiene codex-tabs', indexSrc.includes('codex-tabs'));
check('index.html contiene arena-tabs-nav', indexSrc.includes('arena-tabs-nav'));
check('index.html contiene tutorial-tabs', indexSrc.includes('tutorial-tabs'));
check('js/game.js genera shop-tabs-nav', gameSrc.includes('shop-tabs-nav'));
check('js/game.js genera hero-sheet-tabs-nav', gameSrc.includes('hero-sheet-tabs-nav'));

console.log('\n---------------------------------------');
console.log(`RESULTADO: ${passed} pass / ${total - passed} fail\n`);

if (passed !== total) {
  process.exit(1);
}
