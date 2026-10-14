/**
 * test-phase1-mobile-blockers.js
 * Suite de verificación para FASE 1: Bloqueos de Móvil (Frontend/UI).
 * Valida: banner de botín extra con auto-cierre y botón ✕, safe area en pantalla de derrota,
 * safe area en menú principal y eliminación del recuadro inset del sprite del héroe.
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

console.log('== 1. Banner "Botín Extra" (Auto-cierre, botón ✕ y cierre en menú) ==');
check('index.html contiene botón banner-close-btn dentro del banner de botín', /banner-close-btn.*dismissIntroGoldBanner/.test(htmlSrc));
check('game.js define dismissIntroGoldBanner y la exporta', /function dismissIntroGoldBanner\(/.test(jsSrc) && /window\.dismissIntroGoldBanner = dismissIntroGoldBanner/.test(jsSrc));
check('startFromIntro tiene auto-cierre con timer de 4s', /_introGoldBannerTimer = setTimeout\(/.test(jsSrc) && /4000\)/.test(jsSrc));
check('exitToMainMenu oculta explícitamente intro-gold-reward-banner', /screensToHide.*intro-gold-reward-banner/.test(jsSrc));
check('css define estilo compacto y botón banner-close-btn', /\.banner-close-btn\s*\{/.test(cssSrc));

console.log('\n== 2. Pantalla de Derrota (#screen-event.overlay y #event-title) ==');
check('#screen-event.overlay reserva safe-area-inset-top para evitar notch', /#screen-event\.overlay\s*\{[\s\S]*?padding-top:\s*max\(\s*26px,\s*env\(safe-area-inset-top/.test(cssSrc));
check('#screen-event.overlay usa justify-content: flex-start !important', /#screen-event\.overlay\s*\{[\s\S]*?justify-content:\s*flex-start\s*!important/.test(cssSrc));
check('#event-title tiene tamaño legible (15px) y no está pisado por 9.5px', /#screen-event h2,\s*#event-title\s*\{[\s\S]*?font-size:\s*15px\s*!important/.test(cssSrc));

console.log('\n== 3. Selección de Héroe y Safe Area Inferior (#screen-title) ==');
check('#screen-title reserva calc(36px + env(safe-area-inset-bottom))', /#screen-title\s*\{[\s\S]*?padding-bottom:\s*calc\(36px\s*\+\s*env\(safe-area-inset-bottom/.test(cssSrc));
check('#screen-title tiene overflow-y: auto para permitir scroll completo', /#screen-title\s*\{[\s\S]*?overflow-y:\s*auto/.test(cssSrc));

console.log('\n== 4. Sprite del Héroe sin Cuadro Rectangular (Halo Limpio) ==');
check('.shield-bio no usa recuadro inset y tiene drop-shadow suave', /\.sprite\.shield-bio\s*\{[^}]*filter:\s*drop-shadow\(/.test(cssSrc) && !/\.sprite\.shield-bio\s*\{[^}]*inset\s*0/.test(cssSrc));
check('.blood-bio no usa recuadro inset y tiene drop-shadow suave', /\.sprite\.blood-bio\s*\{[^}]*filter:\s*drop-shadow\(/.test(cssSrc) && !/\.sprite\.blood-bio\s*\{[^}]*inset\s*0/.test(cssSrc));
check('.zen-bio no usa recuadro inset y tiene drop-shadow suave', /\.sprite\.zen-bio\s*\{[^}]*filter:\s*drop-shadow\(/.test(cssSrc) && !/\.sprite\.zen-bio\s*\{[^}]*inset\s*0/.test(cssSrc));

console.log('\n== 5. Solapes del Menú Principal (Fase A) ==');
check('.title-nav-tabs tiene flex: 0 0 auto !important y min-height: max-content !important', /\.title-nav-tabs\s*\{[\s\S]*?flex:\s*0\s+0\s+auto\s*!important[\s\S]*?min-height:\s*max-content\s*!important/.test(cssSrc));
check('#screen-title > * previene aplastamiento con flex-shrink: 0', /#screen-title\s*>\s*\*\s*\{\s*flex-shrink:\s*0;\s*\}/.test(cssSrc));

console.log('\n---------------------------------------');
console.log(`RESULTADO: ${passed} pass / ${total - passed} fail\n`);

if (passed !== total) {
  process.exit(1);
}
