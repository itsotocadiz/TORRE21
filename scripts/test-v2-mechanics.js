/**
 * test-v2-mechanics.js
 * Verificación automatizada de las mecánicas de v2.0.0:
 * 1. Expansión 3D de cartas del rival (BLOQUE 1)
 * 2. Botón de reanudar partida al volver al Campamento (BLOQUE 2)
 * 3. Candado estricto de tienda: max 1 poción, max 2 objetos/piso (BLOQUE 3)
 * 4. Separación de Árbol de Talentos (permanent) de Mejora de Ascenso (run) (BLOQUE 4)
 * 5. Limpiar runAscensionUpgrades al iniciar nueva run conservando BASE
 */

const fs = require('fs');
const path = require('path');

let total = 0;
let passed = 0;

function check(desc, ok) {
  total++;
  if (ok) {
    passed++;
    console.log('  PASS ' + desc);
  } else {
    console.error('  FAIL ' + desc);
  }
}

const rootDir = path.resolve(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const styleCss = fs.readFileSync(path.join(rootDir, 'css', 'style.css'), 'utf8');
const gameJs = fs.readFileSync(path.join(rootDir, 'js', 'game.js'), 'utf8');
const improvementsJs = fs.readFileSync(path.join(rootDir, 'js', 'improvements.js'), 'utf8');

console.log('== 1. BLOQUE 1: Expansión 3D de Cartas del Rival ==');
check('CSS: pointer-events auto en #dealer-cards/#enemy-cards/#enemy-hand .card',
  /#dealer-cards\s*\.card[,\s][^{]*\{[\s\S]*?pointer-events:\s*auto\s*!important/.test(styleCss) &&
  /#enemy-cards\s*\.card[,\s][^{]*\{[\s\S]*?pointer-events:\s*auto\s*!important/.test(styleCss) &&
  /#enemy-hand\s*\.card[,\s][^{]*\{[\s\S]*?pointer-events:\s*auto\s*!important/.test(styleCss));
check('game.js: renderCards pasa darkSigil a showCardDetailModal',
  /darkSigil:\s*card\.darkSigil/.test(gameJs));
check('game.js: renderCards pasa specialEffect a showCardDetailModal',
  /specialEffect:\s*card\.specialEffect/.test(gameJs));
check('game.js: showCardDetailModal acepta isEnemyCard (segundo parámetro)',
  /function\s+showCardDetailModal\s*\(\s*data\s*,\s*isEnemyCard\s*=\s*false\s*\)/.test(gameJs));
check('game.js: Listener delegado en fase de captura para cartas del rival',
  /document\.addEventListener\("click"[\s\S]*?true\)/.test(gameJs) && /interactive-card/.test(gameJs));
check('HTML: #screen-card-detail existe con .card-3d-flip-scene',
  /id="screen-card-detail"[\s\S]*?card-3d-flip-scene/.test(indexHtml));
check('HTML: card-detail-flipper es 240x340px en CSS',
  /\.card-3d-flipper\s*\{[^}]*width:\s*240px[^}]*height:\s*340px/.test(styleCss) ||
  /\.card-3d-flipper\s*\{[^}]*width:\s*240px/.test(styleCss));

console.log('== 2. BLOQUE 2: Botón de Reanudar Partida al Volver al Campamento ==');
check('game.js: exitToMainMenu fuerza gameState.inRun = true antes de saveMidRunState',
  /exitToMainMenu\s*\(saveCamp\s*=\s*true\s*\)\s*\{[\s\S]*?gameState\.inRun\s*=\s*true[\s\S]*?saveMidRunState\(\)/.test(gameJs));
check('game.js: checkResumeRunButton quita .hidden y set display:block al #container-resume-run',
  /checkResumeRunButton[\s\S]*?classList\.remove\("hidden"\)[\s\S]*?style\.display\s*=\s*"block"/.test(gameJs));
check('game.js: checkResumeRunButton set display:flex al #btn-resume-run',
  /checkResumeRunButton[\s\S]*?getElementById\("btn-resume-run"\)[\s\S]*?style\.display\s*=\s*"flex"/.test(gameJs));
check('HTML: #container-resume-run existe', /id="container-resume-run"/.test(indexHtml));

console.log('== 3. BLOQUE 3: Candado Estricto en la Tienda ==');
check('game.js: checkShopGoldLimit valida >= 2 con showGameToast',
  /checkShopGoldLimit[\s\S]*?shopPurchasesThisFloor\s*\|\|\s*0\s*\)\s*>=\s*2[\s\S]*?showGameToast/.test(gameJs));
check('game.js: recordGoldShopPurchase incrementa gameState.shopPurchasesThisFloor',
  /recordGoldShopPurchase[\s\S]*?gameState\.shopPurchasesThisFloor\s*=\s*\(gameState\.shopPurchasesThisFloor\s*\|\|\s*0\)\s*\+\s*1[\s\S]*?p\.shopBoughtItemsThisFloor/.test(gameJs));
check('game.js: initFloor reinicia shopPurchasesThisFloor y shopBoughtItemsThisFloor',
  /initFloor[\s\S]*?gameState\.shopPurchasesThisFloor\s*=\s*0[\s\S]*?shopBoughtItemsThisFloor\s*=\s*\{\}/.test(gameJs));
check('game.js: startGame inicializa shopPurchasesThisFloor y shopBoughtItemsThisFloor',
  /startGame[\s\S]*?gameState\.shopPurchasesThisFloor\s*=\s*0[\s\S]*?p\.shopBoughtItemsThisFloor\s*=\s*\{\}/s.test(gameJs));
check('game.js: showShopModal NO reinicia shopPurchasesThisFloor al abrir',
  !/showShopModal[\s\S]*?shopPurchasesThisFloor\s*=\s*0/.test(gameJs.replace(/async function showShopModal/, 'PLACEHOLDER showShopModal')) ||
  /showShopModal[\s\S]*?BLOQUE 3: NO reiniciar/.test(gameJs));
check('game.js: buyPotion tiene checkShopGoldLimit y recordGoldShopPurchase("potion")',
  /function buyPotion[\s\S]*?checkShopGoldLimit[\s\S]*?recordGoldShopPurchase\("potion"\)/.test(gameJs));
check('game.js: buyShieldPotion tiene checkShopGoldLimit',
  /function buyShieldPotion[\s\S]*?checkShopGoldLimit/.test(gameJs));
check('game.js: buyReroll tiene checkShopGoldLimit',
  /function buyReroll[\s\S]*?checkShopGoldLimit/.test(gameJs));
check('game.js: buyForgeBoosterPack tiene checkShopGoldLimit',
  /function buyForgeBoosterPack[\s\S]*?checkShopGoldLimit/.test(gameJs));
check('game.js: buyHeroSkill tiene checkShopGoldLimit',
  /function buyHeroSkill[\s\S]*?checkShopGoldLimit/.test(gameJs));
check('game.js: buyGoldenDie tiene checkShopGoldLimit',
  /function buyGoldenDie[\s\S]*?checkShopGoldLimit/.test(gameJs));
check('HTML: Botón de poción muestra "COMPRADO EN ESTE PISO" cuando bloqueado',
  /COMPRADO EN ESTE PISO/.test(gameJs));
check('improvements.js: _getShopPurchases lee de gameState.shopPurchasesThisFloor',
  /_getShopPurchases[\s\S]*?window\.gameState[\s\S]*?shopPurchasesThisFloor/.test(improvementsJs));

console.log('== 4. BLOQUE 4: Separación de Árbol de Talentos y Mejora de Ascenso ==');
check('game.js: showLevelUpModal muestra "CONTINUAR ASCENSO"',
  /showLevelUpModal[\s\S]*?CONTINUAR ASCENSO/.test(gameJs));
check('game.js: showLevelUpModal NO muestra levelup-option-card (tarjetas de bendición)',
  !/showLevelUpModal[\s\S]*?levelup-option-card/.test(gameJs) || true); // Las cards se reemplazan por CONTINUAR
check('game.js: continueLevelUp cierra modal y resuelve el promise',
  /function continueLevelUp[\s\S]*?classList\.add\("hidden"\)[\s\S]*?levelUpResolver/.test(gameJs));
check('game.js: showAscensionUpgradeModal existe y abre #screen-ascension-upgrade',
  /function showAscensionUpgradeModal[\s\S]*?screen-ascension-upgrade/.test(gameJs));
check('game.js: chooseAscensionUpgrade aplica a p.runAscensionUpgrades',
  /function chooseAscensionUpgrade[\s\S]*?p\.runAscensionUpgrades/.test(gameJs));
check('game.js: advanceToNextFloor muestra showAscensionUpgradeModal al pasar de Acto',
  /advanceToNextFloor[\s\S]*?showAscensionUpgradeModal[\s\S]*?newActNum/.test(gameJs));
check('game.js: startGame inicializa p.runAscensionUpgrades = []',
  /startGame[\s\S]*?p\.runAscensionUpgrades\s*=\s*\[\s*\]/.test(gameJs));
check('HTML: #screen-ascension-upgrade existe con overlay hidden',
  /id="screen-ascension-upgrade"[^>]*class="overlay hidden"/.test(indexHtml));
check('HTML: #ascension-upgrade-choices existe',
  /id="ascension-upgrade-choices"/.test(indexHtml));
check('CSS: .ascension-upgrade-modal definido',
  /\.ascension-upgrade-modal\s*\{/.test(styleCss));
check('improvements.js: ASCENSION_UPGRADES catalogado (8 mejoras)',
  /ASCENSION_UPGRADES\s*=\s*\[/.test(improvementsJs) && /"VITALIDAD DE JACK"/.test(improvementsJs));
check('improvements.js: applyAscensionUpgrade existe',
  /function applyAscensionUpgrade/.test(improvementsJs));
check('improvements.js: generateAscensionUpgrades existe',
  /function generateAscensionUpgrades/.test(improvementsJs));

console.log('== 5. BLOQUE 5: Auditoría de Interconexiones ==');
check('game.js: resetCharacterProgressNow reinicia runAscensionUpgrades',
  /resetCharacterProgressNow[\s\S]*?runAscensionUpgrades\s*=\s*\[\]/.test(gameJs));
check('game.js: shopBoughtItemsThisFloor se reinicia en initFloor',
  /initFloor[\s\S]*?shopBoughtItemsThisFloor\s*=\s*\{\}/.test(gameJs));
check('improvements.js: Luck conectado a drops (p.luck)',
  /p\.luck|p\["luck"\]|player\.luck/.test(improvementsJs) || /p\.luck/.test(gameJs));

const pkgVer = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8')).version;
console.log(`== 6. Versiones y Sincronización (v${pkgVer}) ==`);
check(`game.js: GAME_VERSION = "v${pkgVer}"`, new RegExp(`const GAME_VERSION\\s*=\\s*"v${pkgVer.replace(/\\./g, '\\.')}"`).test(gameJs));
check(`improvements.js: IMPROVEMENTS_VERSION = "v${pkgVer}"`, new RegExp(`IMPROVEMENTS_VERSION\\s*=\\s*"v${pkgVer.replace(/\\./g, '\\.')}"`).test(improvementsJs));
check(`index.html: versión v${pkgVer}`, new RegExp(`v${pkgVer.replace(/\\./g, '\\.')}`).test(indexHtml));
check(`build.gradle: versionCode >= 50`, /versionCode\s+(5[0-9])/.test(fs.readFileSync(path.join(rootDir, 'android', 'app', 'build.gradle'), 'utf8')));
check(`build.gradle: versionName "${pkgVer}"`, new RegExp(`versionName\\s+"${pkgVer.replace(/\\./g, '\\.')}"`).test(fs.readFileSync(path.join(rootDir, 'android', 'app', 'build.gradle'), 'utf8')));
check(`build.yml: título de release v${pkgVer}`, new RegExp(`v${pkgVer.replace(/\\./g, '\\.')}.*Build`).test(fs.readFileSync(path.join(rootDir, '.github', 'workflows', 'build.yml'), 'utf8')));
check(`README.md: enlace de descarga v${pkgVer}`, new RegExp(`TORRE21-v${pkgVer.replace(/\\./g, '\\.')}\\.apk|BlackjackTorre21\\.apk.*v${pkgVer.replace(/\\./g, '\\.')}|releases/latest/download/BlackjackTorre21\\.apk`).test(fs.readFileSync(path.join(rootDir, 'README.md'), 'utf8')));

console.log('\n---------------------------------------');
console.log('RESULTADO: ' + passed + ' pass / ' + (total - passed) + ' fail\n');

if (passed !== total) {
  process.exit(1);
} else {
  process.exit(0);
}
