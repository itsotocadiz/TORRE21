/* Test Suite — Fase 4: Recompensa diaria visible + Limpieza de ficha de héroe (R-07, R-08) */
const fs = require('fs');
const path = require('path');

const htmlSrc = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const cssSrc = fs.readFileSync(path.join(__dirname, '..', 'css', 'style.css'), 'utf8');
const gameSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf8');
const impSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'improvements.js'), 'utf8');

let pass = 0, fail = 0;
function check(label, cond, detail) {
  if (cond) { pass++; console.log('  PASS ' + label); }
  else { fail++; console.log('  FAIL ' + label + (detail ? ' -> ' + detail : '')); }
}

console.log('\n== 1. Auditoría de Recompensa Diaria Visible (R-07) en HTML y CSS ==');
check('index.html tiene botón de acceso rápido #btn-daily-login', htmlSrc.indexOf('id="btn-daily-login"') !== -1);
check('index.html tiene tag de estado #daily-login-status-tag', htmlSrc.indexOf('id="daily-login-status-tag"') !== -1);
check('index.html tiene modal overlay #screen-daily-login', htmlSrc.indexOf('id="screen-daily-login"') !== -1);
check('index.html tiene cuerpo de modal #daily-login-body', htmlSrc.indexOf('id="daily-login-body"') !== -1);
check('index.html llama a openDailyLoginModal() en click', /onclick="openDailyLoginModal\(\)"/.test(htmlSrc));
check('css define .daily-reward-quickbar', /\.daily-reward-quickbar\s*\{/.test(cssSrc));
check('css define .daily-login-badge-btn', /\.daily-login-badge-btn\s*\{/.test(cssSrc));
check('css define .daily-login-card', /\.daily-login-card\s*\{/.test(cssSrc));
check('css define .daily-card con variante epic-day7', /\.daily-card\.epic-day7\s*\{/.test(cssSrc));
check('css define .daily-claim-btn de mínimo 44px', /\.daily-claim-btn\s*\{[\s\S]*?min-height:\s*44px/.test(cssSrc));

console.log('\n== 2. Auditoría de API y Lógica de Recompensa Diaria en improvements.js ==');
check('improvements.js exporta window.openDailyLoginModal', /window\.openDailyLoginModal\s*=\s*openDailyLoginModal/.test(impSrc));
check('improvements.js exporta window.closeDailyLoginModal', /window\.closeDailyLoginModal\s*=\s*closeDailyLoginModal/.test(impSrc));
check('improvements.js exporta window.renderDailyLoginUI', /window\.renderDailyLoginUI\s*=\s*renderDailyLoginUI/.test(impSrc));
check('improvements.js exporta window.updateDailyLoginQuickbar', /window\.updateDailyLoginQuickbar\s*=\s*updateDailyLoginQuickbar/.test(impSrc));
check('improvements.js exporta window.claimDailyRewardFromModal', /window\.claimDailyRewardFromModal\s*=\s*claimDailyRewardFromModal/.test(impSrc));
check('renderDailyLoginUI genera las 7 casillas semanales', /cardsHtml\s*=\s*DAILY_LOGIN_REWARDS\.map/.test(impSrc));
check('renderDailyLoginUI maneja cuenta atrás para el día siguiente', /getTimeUntilTomorrow/.test(impSrc));

console.log('\n== 3. Auditoría de Ficha de Héroe (R-08) en game.js y CSS ==');
check('game.js define function switchHeroSheetTab', /function\s+switchHeroSheetTab\s*\(\s*tabKey\s*\)/.test(gameSrc));
check('game.js exporta window.switchHeroSheetTab', /window\.switchHeroSheetTab\s*=\s*switchHeroSheetTab/.test(gameSrc));
check('openHeroSheet genera navegación .hero-sheet-tabs-nav', /hero-sheet-tabs-nav/.test(gameSrc));
check('openHeroSheet tiene pestaña de atributos #hst-tab-combat', /id="hst-tab-combat"/.test(gameSrc));
check('openHeroSheet tiene pestaña de legado #hst-tab-legacy', /id="hst-tab-legacy"/.test(gameSrc));
check('openHeroSheet tiene pestaña de memorias #hst-tab-lore', /id="hst-tab-lore"/.test(gameSrc));
check('openHeroSheet tiene panel de atributos #hst-panel-combat', /id="hst-panel-combat"/.test(gameSrc));
check('openHeroSheet tiene panel de legado #hst-panel-legacy', /id="hst-panel-legacy"/.test(gameSrc));
check('openHeroSheet tiene panel de memorias #hst-panel-lore', /id="hst-panel-lore"/.test(gameSrc));
check('css define .hero-sheet-tabs-nav', /\.hero-sheet-tabs-nav\s*\{/.test(cssSrc));
check('css define .hero-sheet-tab-btn', /\.hero-sheet-tab-btn\s*\{/.test(cssSrc));
check('css define .hero-sheet-tab-panel', /\.hero-sheet-tab-panel\s*\{/.test(cssSrc));

console.log('\n== 4. No duplicación de estadísticas en Nivel Permanente ==');
// Extraer el bloque del panel combat
const combatPanelMatch = gameSrc.match(/id="hst-panel-combat"[\s\S]*?id="hst-panel-legacy"/);
check('panel de combate existe', !!combatPanelMatch);
if (combatPanelMatch) {
  const combatContent = combatPanelMatch[0];
  const legacyChipDuplicates = /<span class="hero-sheet-chip">❤️ \+\$\{legHp\} HP de Legado<\/span>/.test(combatContent);
  check('chips de legado eliminados de Nivel Permanente (evita confusión)', !legacyChipDuplicates);
  check('Nivel Permanente incluye Rango de Maestría limpio', /Maestría de Clase Rango/.test(combatContent));
}

console.log('\n---------------------------------------');
console.log('RESULTADO: ' + pass + ' pass / ' + fail + ' fail');
process.exitCode = fail > 0 ? 1 : 0;
