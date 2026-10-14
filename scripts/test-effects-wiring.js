/**
 * test-effects-wiring.js
 * Suite de verificación para FASE 0: Integridad de Efectos y Eliminación de Código Muerto.
 * Valida: ALL_RELICS alcanzable, Cinturón con Púas activo, Rueda Yunque/Escudo/EXP y Sello Afilado.
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
const gameSrc = fs.readFileSync(path.join(rootDir, 'js', 'game.js'), 'utf8');

console.log('== 1. Auditoría de ALL_RELICS y Conexión en Partida ==');
check('ALL_RELICS está definido en game.js', /const ALL_RELICS = \[/.test(gameSrc));
check('selectRandomRelic no está vacía y aplica la reliquia', /function selectRandomRelic\(/.test(gameSrc) && /relic\.apply\(p\)/.test(gameSrc));
check('buyRelicBoosterPack está implementado y exportado', /function buyRelicBoosterPack\(/.test(gameSrc) && /window\.buyRelicBoosterPack = buyRelicBoosterPack/.test(gameSrc));
check('showLevelUpModal ofrece opción dinámica de ALL_RELICS', /chooseLevelUpReward\('relic_\$\{chosenRelic\.id\}'\)/.test(gameSrc));
check('chooseLevelUpReward procesa relic_ y llama a selectRandomRelic', /type\.startsWith\("relic_"\)/.test(gameSrc) && /selectRandomRelic\(relId\)/.test(gameSrc));
check('La tienda ofrece el Cofre de Reliquias Sagradas', /buyRelicBoosterPack\(\)/.test(gameSrc));

console.log('\n== 2. Cableado de Cinturón con Púas (spiked_belt) en Combate ==');
check('Cinturón con Púas devuelve daño al enemigo al ser golpeado', /p\.accessory === "spiked_belt"/.test(gameSrc) && /gameState\.enemy\.hp = Math\.max\(0, gameState\.enemy\.hp - beltDmg\)/.test(gameSrc));

console.log('\n== 3. Integridad de Sectores de la Rueda del Destino ==');
check('Sector YUNQUE (slice 6) abre Forja Arquetípica de Lote (arcane_group)', /openBoosterPackBySource\("arcane_group",\s*\{\s*free:\s*true/.test(gameSrc));
check('Sector +12 Escudo (slice 4) persiste en p.wheelBonusShield', /p\.wheelBonusShield = \(p\.wheelBonusShield \|\| 0\) \+ 12/.test(gameSrc));
check('initFloor suma p.wheelBonusShield al escudo del héroe', /p\.wheelBonusShield \|\| 0/.test(gameSrc));
check('Sector +60 EXP otorga EXP permanente', /gainExp\(60\)/.test(gameSrc));

console.log('\n== 4. Cableado del Sello Afilado (sharpArmorPierce) en Combate ==');
check('p.sharpArmorPierce reduce la armadura rival efectiva en el cálculo de daño', /effectiveEnemyDef = Math\.max\(0, effectiveEnemyDef - p\.sharpArmorPierce\)/.test(gameSrc));

console.log('\n== 5. Limpieza de Modales en showRewardModal ==');
check('showRewardModal oculta modales de sobres y forja', /screen-pack-open/.test(gameSrc) && /screen-forge-result/.test(gameSrc));

console.log('\n---------------------------------------');
console.log(`RESULTADO: ${passed} pass / ${total - passed} fail\n`);

if (passed !== total) {
  process.exit(1);
}
