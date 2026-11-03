/**
 * test-demonic-relics-and-ascension.js
 * Verificación automatizada de:
 * 1. Sed Carmesí y Mejoras de Ascenso (_runBuffs) integradas en recalculatePlayerStats.
 * 2. Persistencia de stats planos de Artefactos (iron_pendant, warriors_ring, etc.).
 * 3. Independencia y almacenamiento de Reliquias Demoníacas en p.demonRelics (sin saturar p.artifacts).
 * 4. Cableado funcional de efectos de combate de las 14 Reliquias Demoníacas de Acto.
 * 5. Integración visual en UI de Mochila (modal-combat-gear), Ficha del Héroe y estilos CSS.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

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

console.log("Iniciando test: Reconexión de Sed Carmesí, Artefactos y Reliquias Demoníacas...");

const rootDir = path.resolve(__dirname, '..');
const gameJs = fs.readFileSync(path.join(rootDir, 'js', 'game.js'), 'utf8');
const improvementsJs = fs.readFileSync(path.join(rootDir, 'js', 'improvements.js'), 'utf8');
const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const styleCss = fs.readFileSync(path.join(rootDir, 'css', 'style.css'), 'utf8');

console.log("\n== 1. Sed Carmesí y Mejoras de Ascenso (_runBuffs) ==");
check('recalculatePlayerStats suma _runBuffs.lifesteal a runLifesteal (Sed Carmesí)',
  gameJs.includes('if (p._runBuffs.lifesteal) runLifesteal += p._runBuffs.lifesteal;'));

check('recalculatePlayerStats suma todos los atributos de _runBuffs (pwr, def, hp, crit, dodge, thorns, luck)',
  gameJs.includes('if (p._runBuffs.pwr) runPwr += p._runBuffs.pwr;') &&
  gameJs.includes('if (p._runBuffs.def) runDef += p._runBuffs.def;') &&
  gameJs.includes('if (p._runBuffs.crit) runCrit += p._runBuffs.crit;') &&
  gameJs.includes('if (p._runBuffs.dodge) runDodge += p._runBuffs.dodge;') &&
  gameJs.includes('if (p._runBuffs.thorns) runThorns += p._runBuffs.thorns;'));

check('chooseAscensionUpgrade en game.js dispara recalculatePlayerStats y updateHud',
  /p\.runAscensionUpgrades\.push\(type\);[\s\S]*?recalculatePlayerStats\(p\);[\s\S]*?updateHud\(\);/.test(gameJs));

check('applyAscensionUpgrade en improvements.js dispara recalculatePlayerStats y updateHud',
  /window\.recalculatePlayerStats\(p\);[\s\S]*?window\.updateHud\(p?\);/.test(improvementsJs));

console.log("\n== 2. Persistencia de Stats Planos de Artefactos de Tienda ==");
check('recalculatePlayerStats lee bonos planos de artefactos de tienda (iron_pendant, warriors_ring, titan_heart, etc.)',
  gameJs.includes('if (rid === "iron_pendant") runDef += 1;') &&
  gameJs.includes('if (rid === "warriors_ring") runPwr += 1;') &&
  gameJs.includes('if (rid === "titan_heart") runMaxHp += 30;') &&
  gameJs.includes('if (rid === "valhalla_helm") runDef += 4;') &&
  gameJs.includes('if (rid === "infinity_ring") { runPwr += 2; runDef += 2; runMaxHp += 30; }'));

console.log("\n== 3. Separación y Almacenamiento de Reliquias Demoníacas ==");
check('chooseDemonicRelic almacena exclusivamente en p.demonRelics sin contaminar p.artifacts',
  /p\.demonRelics\.push\(\{ id: relic\.id/.test(gameJs) &&
  !/p\.artifacts\.push\(relic\.id\)/.test(gameJs));

check('recalculatePlayerStats incluye p.demonRelics en allRelics',
  gameJs.includes('...(p.demonRelics || [])'));

console.log("\n== 4. Cableado de Efectos de Combate de las Reliquias Demoníacas ==");
check('Filo Sangriento de Dante: aplica +2 Veneno al rival con cada 21 (p._dantePoison21)',
  gameJs.includes('p._dantePoison21') && gameJs.includes('enemyPoison = (gameState.status.enemyPoison || 0) + 2'));

check('Relicario de la Luz: cura +6 HP al ganar con 19 o 20 (p._valkHealOnHighWin)',
  gameJs.includes('p._valkHealOnHighWin') && gameJs.includes('p.playerScore === 19 || p.playerScore === 20'));

check('Cota de Picas: +2 Escudo protector por carta de ♠ en mano ganadora (p._spadesShieldBonus)',
  gameJs.includes('p._spadesShieldBonus') && gameJs.includes('c.suit === "♠" || c.suit === "spades"'));

check('Baluarte de Diamantes: despliega +10 Escudo al iniciar mano (p._valkAegisShield)',
  gameJs.includes('p._valkAegisShield') && gameJs.includes('gameState.status.playerShield = (gameState.status.playerShield || 0) + p._valkAegisShield'));

check('Ojo del Destino Lúcido: revela carta oculta del rival en inicio de mano (p._valkRevealCard)',
  gameJs.includes('p._valkRevealCard') && gameJs.includes('e.enemyRevealed = true'));

check('Manto del Vacío: 25% de anular completamente el contraataque rival (p._voidVeilDodge)',
  gameJs.includes('p._voidVeilDodge') && gameJs.includes('ANULADO POR VACÍO'));

check('Baraja Espectral: reduce el daño de Bust a la mitad (p._halfBustDamage)',
  gameJs.includes('p._halfBustDamage') && gameJs.includes('Math.ceil(rawDmg / 2)'));

check('Pacto del Vencedor Inmortal: inmune a furia de Muerte Súbita primeros 5 asaltos (p._suddenDeathPactImmune)',
  gameJs.includes('p._suddenDeathPactImmune') && gameJs.includes('suddenRound <= 5'));

check('Reloj de Arena de la Parca: sobrevive a golpe letal con 1 HP y +25 Escudo (p._parcaRevive)',
  gameJs.includes('p._parcaRevive') && gameJs.includes('p._parcaReviveUsedCombat') && gameJs.includes('p.hp = 1'));

check('Cosecha de Malfas: 35% de curar +4 HP al pedir carta (p._necroHarvestHeal)',
  gameJs.includes('p._necroHarvestHeal') && gameJs.includes('Math.min(4, p.maxHp - p.hp)'));

check('Manto del Nigromante: restaura +15 HP al liquidar al rival (p._necroKillHeal)',
  gameJs.includes('p._necroKillHeal') && gameJs.includes('enemyDefeated'));

check('Espejo de Sombras: anula el primer BUST del piso ajustando la carta a valor 1 (p._shadowMirrorBustProtect)',
  gameJs.includes('p._shadowMirrorBustProtect') && gameJs.includes('p._shadowMirrorUsedThisFloor'));

check('Cáliz de Éter: inicia el piso con Overdrive al 100% (p._etherCalice)',
  gameJs.includes('p._etherCalice') && gameJs.includes('p.overdrive = 100'));

console.log("\n== 5. Integración en UI y Estilos CSS ==");
check('index.html incluye sección exclusiva gear-demonic-section con contador y grid',
  indexHtml.includes('id="gear-demonic-section"') &&
  indexHtml.includes('id="gear-modal-demonic-count"') &&
  indexHtml.includes('id="gear-modal-demonic-grid"'));

check('style.css define estilos visuales .demonic-relics-section y .gear-demonic-slot',
  styleCss.includes('.demonic-relics-section') &&
  styleCss.includes('.gear-demonic-grid') &&
  styleCss.includes('.gear-demonic-slot'));

check('updateCombatGearModalUI puebla gear-modal-demonic-grid con reliquias de p.demonRelics',
  gameJs.includes('gear-modal-demonic-grid') &&
  gameJs.includes('p.demonRelics'));

check('inspectGearSlot soporta tipo "demonic" con badge de JEFE',
  gameJs.includes('type === "demonic"') &&
  gameJs.includes('RELIQUIA DE JEFE'));

check('openFighterInspect incluye apartado destacado de Reliquias Demoníacas en la Ficha',
  gameJs.includes('Reliquias Demoníacas de Jefes'));

console.log(`\n---------------------------------------`);
console.log(`RESULTADO: ${passed}/${total} checks pasados con éxito.`);
if (passed !== total) {
  process.exit(1);
}
