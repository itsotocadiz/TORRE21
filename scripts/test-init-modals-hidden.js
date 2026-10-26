/**
 * test-init-modals-hidden.js
 * Verificación automatizada de inicio limpio para v1.9.0:
 * 1. Modales de combate (#modal-combat-gear, #modal-combat-log) 100% ocultos al cargar.
 * 2. Reglas CSS .hidden con máxima especificidad (!important).
 * 3. Eliminación total de "Estudio Arcano" en assets/barita_logo.svg e index.html.
 * 4. Selector de idioma (Español / Inglés) en Ajustes y Pausa.
 * 5. Versión sincronizada a v1.9.0.
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
const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const styleCss = fs.readFileSync(path.join(rootDir, 'css', 'style.css'), 'utf8');
const gameJs = fs.readFileSync(path.join(rootDir, 'js', 'game.js'), 'utf8');
const improvementsJs = fs.readFileSync(path.join(rootDir, 'js', 'improvements.js'), 'utf8');
const baritaSvg = fs.readFileSync(path.join(rootDir, 'assets', 'barita_logo.svg'), 'utf8');

console.log('== 1. Estado Inicial de Modales de Combate en index.html ==');
const gearModalMatch = /<div id="modal-combat-gear" class="([^"]+)"([^>]*)>/.exec(indexHtml);
check('modal-combat-gear existe en index.html', !!gearModalMatch);
check('modal-combat-gear incluye clase hidden', gearModalMatch && gearModalMatch[1].includes('hidden'));
check('modal-combat-gear incluye style display: none', gearModalMatch && gearModalMatch[2].includes('display: none'));

const logModalMatch = /<div id="modal-combat-log" class="([^"]+)"([^>]*)>/.exec(indexHtml);
check('modal-combat-log existe en index.html', !!logModalMatch);
check('modal-combat-log incluye clase hidden', logModalMatch && logModalMatch[1].includes('hidden'));
check('modal-combat-log incluye style display: none', logModalMatch && logModalMatch[2].includes('display: none'));

console.log('== 2. Reglas de Ocultamiento en css/style.css ==');
check('CSS declara #modal-combat-gear.hidden con display: none !important', /#modal-combat-gear\.hidden[\s\S]*?display:\s*none\s*!important/.test(styleCss));
check('CSS declara #modal-combat-log.hidden con display: none !important', /#modal-combat-log\.hidden[\s\S]*?display:\s*none\s*!important/.test(styleCss));
check('CSS restringe display: flex a :not(.hidden)', /\.combat-modal-overlay:not\(\.hidden\)\s*\{[\s\S]*?display:\s*flex/.test(styleCss));

console.log('== 3. Eliminación de "Estudio Arcano" en Pantalla de Inicio ==');
check('barita_logo.svg NO contiene el texto ESTUDIO ARCANO', !/ESTUDIO\s+ARCANO/i.test(baritaSvg));
check('index.html NO contiene "Estudio Arcano"', !/Estudio\s+Arcano/i.test(indexHtml));
check('index.html alt del logo de Barita es limpio', /alt="BARITA"/.test(indexHtml));

console.log('== 4. Selector de Idioma (Español / Inglés) i18n ==');
check('index.html contiene botón de idioma Español en Ajustes (cfg-lang-es)', /id="cfg-lang-es"/.test(indexHtml));
check('index.html contiene botón de idioma Inglés en Ajustes (cfg-lang-en)', /id="cfg-lang-en"/.test(indexHtml));
check('index.html contiene selector de idioma en Menú de Pausa (pause-lang-es / pause-lang-en)', /id="pause-lang-es"/.test(indexHtml) && /id="pause-lang-en"/.test(indexHtml));
check('game.js define getGameLanguage y setGameLanguage', /function getGameLanguage\(/.test(gameJs) && /function setGameLanguage\(/.test(gameJs));
check('game.js exporta getGameLanguage y setGameLanguage en window', /window\.getGameLanguage\s*=\s*getGameLanguage/.test(gameJs) && /window\.setGameLanguage\s*=\s*setGameLanguage/.test(gameJs));
check('game.js define diccionario I18N_TRANSLATIONS con claves es y en', /const I18N_TRANSLATIONS\s*=\s*\{[\s\S]*?es:\s*\{[\s\S]*?en:\s*\{/.test(gameJs));

console.log('== 5. Control Seguro de Modales en game.js e improvements.js ==');
check('game.js define openCombatGearModal y closeCombatGearModal', /function openCombatGearModal\(/.test(gameJs) && /function closeCombatGearModal\(/.test(gameJs));
check('game.js define openCombatLogModal y closeCombatLogModal', /function openCombatLogModal\(/.test(gameJs) && /function closeCombatLogModal\(/.test(gameJs));
check('game.js forzado de cierre en init y DOMContentLoaded', /closeCombatGearModal\(\);[\s\S]*?closeCombatLogModal\(\);/.test(gameJs));
check('improvements.js incluye guardia de cierre en arranque', /modal-combat-gear[\s\S]*?classList\.add\("hidden"\)/.test(improvementsJs));

console.log('== 6. Versión Sincronizada v1.9.2 (BUILD 49) ==');
check('index.html muestra versión v1.9.2', /v1\.9\.2/.test(indexHtml));
check('game.js tiene GAME_VERSION = "v1.9.2"', /const GAME_VERSION\s*=\s*"v1\.9\.2"/.test(gameJs));
check('improvements.js tiene IMPROVEMENTS_VERSION = "v1.9.2"', /window\.IMPROVEMENTS_VERSION\s*=\s*"v1\.9\.2"/.test(improvementsJs));

console.log('\n---------------------------------------');
console.log(`RESULTADO: ${passed} pass / ${total - passed} fail\n`);

if (passed !== total) {
  process.exit(1);
} else {
  process.exit(0);
}
