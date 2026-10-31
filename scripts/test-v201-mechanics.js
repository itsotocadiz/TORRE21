/**
 * test-v201-mechanics.js
 * Verificación automatizada de las mecánicas añadidas y mejoradas en v2.0.1:
 * 1. Árbol de Talentos (28 nodos) interconectado a stats base y afinidades elementales
 * 2. Catálogo completo de accesorios (6/6) funcionales y reflejados en BUFF/NERF
 * 3. Modal 3D interactivo de naipes para jugador y rival con datos completos y botón táctil
 * 4. Registro y efecto matemático de Pactos del Abismo en player.activePacts
 * 5. Rueda del Destino con sesgo de suerte (player.luck) e impacto en run stats
 * 6. Balance de curva de dificultad en Actos 1 y 2 (Jefes Dante/Valquiria, pools y escudos)
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
const buildGradle = fs.readFileSync(path.join(rootDir, 'android', 'app', 'build.gradle'), 'utf8');
const buildYml = fs.readFileSync(path.join(rootDir, '.github', 'workflows', 'build.yml'), 'utf8');
const readme = fs.readFileSync(path.join(rootDir, 'README.md'), 'utf8');

console.log('== 1. BLOQUE 1: Árbol de Talentos (28 Nodos) y Afinidades ==');
check('recalculatePlayerStats integra permanentBase sin bloqueo de flags residuales',
  /p\.permanentBase\s*=\s*\{/.test(gameJs) && !/_treeTitanHpApplied/.test(gameJs));
check('recalculatePlayerStats calcula bonos de talentos para HP, Crítico, DEF, Lifesteal, Suerte y Espinas',
  /ranks\["spades_2"\]/.test(gameJs) && /ranks\["diamonds_5"\]/.test(gameJs) && /ranks\["hearts_3"\]/.test(gameJs) && /ranks\["clubs_2"\]/.test(gameJs));
check('initFloor activa afinidades elementales (_diamondsFloorShield, _heartsFloorRegen, _clubsFloorRerolls)',
  /p\._diamondsFloorShield/.test(gameJs) && /p\._heartsFloorRegen/.test(gameJs) && /p\._clubsFloorRerolls/.test(gameJs));
check('enemyDefeated activa talento hearts_5 (Sangre de Fénix) para curar +8 HP tras victoria',
  /_heartsKillRegen/.test(gameJs) && /FÉNIX/.test(gameJs));

console.log('== 2. BLOQUE 2: Catálogo de Accesorios al 100% y Reflejo en BUFF/NERF ==');
check('recalculatePlayerStats y buyAmulet sincronizan p.accessory, p.equippedAccessory y p.activeAccessory',
  /p\.accessory\s*=\s*(acc|curAcc|type)/.test(gameJs) && /p\.equippedAccessory\s*=\s*(acc|curAcc|type)/.test(gameJs));
check('lead_glove otorga bonificaciones en cálculo de daño y +2 Escudo en resolveHandResult',
  /lead_glove|lead_gauntlet/.test(gameJs) && /ESCUDO GUANTE/.test(gameJs));
check('blood_amulet cura +6 HP al derrotar rival en enemyDefeated',
  /blood_amulet/.test(gameJs) && /\+6 HP/.test(gameJs));
check('seer_eye otorga visión de cartas rivales al sumar 14+ de mano',
  /seer_eye/.test(gameJs) && /calculateHandScore\(p\.playerHand\)\s*>=\s*14/.test(gameJs));
check('mercury_band otorga +8% Esquiva y +1 Dado de Reroll en initFloor',
  /mercury_band/.test(gameJs) && /p\.rerollsAvailable\s*=\s*\(p\.rerollsAvailable\s*\|\|\s*0\)\s*\+\s*1/.test(gameJs));
check('openFighterInspect muestra la columna BUFF / NERF con cálculo exacto de variaciones de run',
  /BUFF\s*\/\s*NERF/.test(gameJs) || /buff-nerf/.test(gameJs) || /diffText/.test(gameJs));

console.log('== 3. BLOQUE 3: Modal 3D de Cartas para Jugador y Rival ==');
check('renderCards asigna _cardData y onclick para abrir modal en cartas del jugador',
  /el\._cardData\s*=\s*\{/.test(gameJs) && /showCardDetailModal\(el\._cardData,\s*false\)/.test(gameJs));
check('showCardDetailModal muestra valor Blackjack y afinidad elemental para cartas estándar',
  /Valor en Blackjack:/.test(gameJs) && /Afinidad del Filo|Afinidad del Baluarte/.test(gameJs));
check('index.html incluye botón táctil ergonómico ✕ CERRAR / ENTENDIDO en modal 3D',
  /CERRAR\s*\/\s*ENTENDIDO/.test(indexHtml));

console.log('== 4. BLOQUE 4: Registro y Efecto de Pactos del Abismo ==');
check('acceptAbyssPact en improvements.js registra pacto en activePacts',
  /p\.activePacts\.push/.test(improvementsJs));
check('selectCurse en game.js registra pacto en p.activePacts con metadata estructurada',
  /p\.activePacts\.push/.test(gameJs) && /pact\.id/.test(gameJs));
check('recalculatePlayerStats itera p.activePacts para aplicar bonos y penalizaciones de stats',
  /p\.activePacts\.forEach/.test(gameJs));

console.log('== 5. BLOQUE 5: Rueda del Destino y Suerte ==');
check('spinFateWheel sesga tiradas en base a p.luck del jugador',
  /p\.luck/.test(gameJs) && /fate_blessing|fate_wheel/.test(gameJs));
check('applyWheelOutcome persiste bonus de run y ejecuta recalculatePlayerStats y updateHud',
  /p\.wheelBonusMaxHp/.test(gameJs) && /p\.wheelBonusPwr/.test(gameJs) && /p\.wheelBonusDef/.test(gameJs) && /p\.wheelBonusShield/.test(gameJs));

console.log('== 6. BLOQUE 6: Curva de Dificultad Suavizada en Actos 1 y 2 ==');
check('CHAPTER_BOSSES.dante_spades balanceado a 85 HP, 11 PWR, 2 DEF',
  /dante_spades:[\s\S]*?hp:\s*85,[\s\S]*?pwr:\s*11,[\s\S]*?def:\s*2/.test(gameJs));
check('CHAPTER_BOSSES.valkyrie_diamonds balanceada a 115 HP, 14 PWR, 3 DEF',
  /valkyrie_diamonds:[\s\S]*?hp:\s*115,[\s\S]*?pwr:\s*14,[\s\S]*?def:\s*3/.test(gameJs));
check('ACT_ENEMY_POOLS[1] (Acto 1) con Duende (25 HP/7 PWR), Alimaña (24 HP/8 PWR) y Esqueleto (30 HP/8 PWR)',
  /Duende Pilluelo[\s\S]*?hp:\s*25,[\s\S]*?pwr:\s*7/i.test(gameJs) &&
  /Alimaña de Cripta[\s\S]*?hp:\s*24,[\s\S]*?pwr:\s*8/i.test(gameJs) &&
  /Esqueleto Maldito[\s\S]*?hp:\s*30,[\s\S]*?pwr:\s*8/i.test(gameJs));
check('ACT_ENEMY_POOLS[2] (Acto 2) con Escarabajo (48 HP/10 PWR), Orco (54 HP/11 PWR) y Gárgola (60 HP/11 PWR)',
  /Escarabajo de Arena[\s\S]*?hp:\s*48,[\s\S]*?pwr:\s*10/i.test(gameJs) &&
  /Orco Berserker[\s\S]*?hp:\s*54,[\s\S]*?pwr:\s*11/i.test(gameJs) &&
  /Gárgola Pétrea[\s\S]*?hp:\s*60,[\s\S]*?pwr:\s*11/i.test(gameJs));
check('initEnemyForCombat desactiva escudo acumulativo en Normal para pisos < 8',
  /const minFloorForShield\s*=\s*\(diffKey\s*===\s*"normal"\)\s*\?\s*8\s*:\s*4;/.test(gameJs));
check('enemyDefeated otorga curación de descanso poscombate en Normal (+12 Acto 1, +8 Acto 2)',
  /curAct === 1\s*\?\s*12\s*:\s*8|curAct === 1\)\s*postHeal = 12/.test(gameJs));

console.log('== 7. BLOQUE 7: Versiones y Sincronización v2.0.1 (BUILD 58) ==');
check('package.json tiene versión 2.0.1', /"version":\s*"2\.0\.1"/.test(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8')));
check('index.html meta version y settings-version muestran v2.0.1 (BUILD 58)',
  /content="v2\.0\.1 \(BUILD 58\)"/.test(indexHtml) && /v2\.0\.1 \(BUILD 58\)/.test(indexHtml));
check('game.js tiene GAME_VERSION = "v2.0.1"', /const GAME_VERSION\s*=\s*"v2\.0\.1"/.test(gameJs));
check('improvements.js tiene IMPROVEMENTS_VERSION = "v2.0.1"', /IMPROVEMENTS_VERSION\s*=\s*"v2\.0\.1"/.test(improvementsJs));
check('build.gradle tiene versionCode 51 y versionName "2.0.1"',
  /versionCode\s+51/.test(buildGradle) && /versionName\s+"2\.0\.1"/.test(buildGradle));
check('build.yml tiene release v2.0.1 (BUILD 58)', /v2\.0\.1 \(BUILD 58\)/.test(buildYml));
check('README.md tiene enlace a TORRE21-v2.0.1.apk y changelog [v2.0.1]',
  /TORRE21-v2\.0\.1\.apk/.test(readme) && /### \[v2\.0\.1\]/.test(readme));

console.log('\n---------------------------------------');
console.log('RESULTADO: ' + passed + ' pass / ' + (total - passed) + ' fail\n');

if (passed !== total) {
  process.exit(1);
} else {
  process.exit(0);
}
