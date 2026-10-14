/**
 * test-phase3-dossier-artifacts.js
 * Suite de verificación para FASE 3: Crónica de Ascenso y Dossier de Equipamiento.
 * Valida: normalización de artefactos (strings/objetos), inclusión de accesorio y bendición
 * en el dossier y en el widget de resumen de run, y estilos CSS.
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

console.log('== 1. normalizeArtifact y Catálogos ==');
check('game.js define y exporta normalizeArtifact', /function normalizeArtifact\(/.test(gameJsSrc) && /window\.normalizeArtifact = normalizeArtifact/.test(gameJsSrc));

// Mock básico para probar normalizeArtifact
const globalContext = {
  window: {},
  SHOP_ARTIFACTS: [
    { id: 'iron_pendant', name: 'Colgante de Hierro', icon: '🛡️', desc: '+1 DEF' }
  ],
  ALL_RELICS: [
    { id: 'ruby', name: 'Rubí Ígneo', icon: '💎', desc: '+2 daño' }
  ]
};

// Extraer el cuerpo de normalizeArtifact
const normMatch = gameJsSrc.match(/function normalizeArtifact\([\s\S]*?\n  \}/);
let normFn = null;
if (normMatch) {
  try {
    const fnBody = normMatch[0];
    const factory = new Function('SHOP_ARTIFACTS', 'ALL_RELICS', `${fnBody}; return normalizeArtifact;`);
    normFn = factory(globalContext.SHOP_ARTIFACTS, globalContext.ALL_RELICS);
  } catch (e) {
    console.error('Error al evaluar normalizeArtifact:', e.message);
  }
}

check('normalizeArtifact resuelve objeto intacto', normFn && normFn({ id: 'test', name: 'Test', icon: '⭐' }).name === 'Test');
check('normalizeArtifact resuelve ID string de SHOP_ARTIFACTS', normFn && normFn('iron_pendant').name === 'Colgante de Hierro');
check('normalizeArtifact resuelve ID string de ALL_RELICS', normFn && normFn('ruby').name === 'Rubí Ígneo');
check('normalizeArtifact maneja ID desconocido con fallback elegante', normFn && normFn('unknown_amulet').name === 'Unknown Amulet');

console.log('\n== 2. Crónica de Ascenso (Dossier con Artefactos y Equipamiento) ==');
check('heroDossierEl usa normalizeArtifact para renderizar artefactos', /normalizeArtifact\(rawArt\)/.test(gameJsSrc));
check('Los slots de artefactos llenos tienen onclick para inspeccionar', /dossier-slot filled.*onclick="showGameAlert/.test(gameJsSrc));
check('heroDossierEl incluye fila de equipamiento (dossier-equipment-row) con bendición y accesorio',
  /dossier-equipment-row/.test(gameJsSrc) &&
  /BENDICIÓN/.test(gameJsSrc) &&
  /ACCESORIO/.test(gameJsSrc)
);

console.log('\n== 3. Widget de Resumen de Run (Pantalla de Derrota/GameOver) ==');
check('_buildRunSummaryWidget incluye fila para Accesorio', /row\("💍",\s*"Accesorio"/.test(gameJsSrc));
check('_buildRunSummaryWidget incluye fila para Artefactos equipados', /row\("🎴",\s*"Artefactos"/.test(gameJsSrc));
check('_buildRunSummaryWidget incluye fila para Bendición', /row\("💎",\s*"Bendición"/.test(gameJsSrc));

console.log('\n== 4. Estilos CSS para el Dossier ==');
check('css define .dossier-equipment-row y .dossier-eq-badge', /\.dossier-equipment-row\s*\{/.test(cssSrc) && /\.dossier-eq-badge\s*\{/.test(cssSrc));

console.log('\n---------------------------------------');
console.log(`RESULTADO: ${passed} pass / ${total - passed} fail\n`);

if (passed !== total) {
  process.exit(1);
}
