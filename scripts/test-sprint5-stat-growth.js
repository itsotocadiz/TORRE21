/* Sprint 5 — Verificación de crecimiento de stats por nivel y límite de 2 compras en tienda */
const fs = require('fs');
const path = require('path');

const gameSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf8');
const impSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'improvements.js'), 'utf8');

function makeScanner(source) {
  return function scan(openIdx) {
    const openCh = source[openIdx];
    const closeCh = openCh === '{' ? '}' : ']';
    let depth = 0, j = openIdx, quote = null, lineComment = false, blockComment = false;
    for (; j < source.length; j++) {
      const ch = source[j], next = source[j + 1];
      if (lineComment) { if (ch === '\n') lineComment = false; continue; }
      if (blockComment) { if (ch === '*' && next === '/') { blockComment = false; j++; } continue; }
      if (quote) {
        if (ch === '\\') { j++; continue; }
        if (ch === quote) quote = null;
        continue;
      }
      if (ch === '/' && next === '/') { lineComment = true; j++; continue; }
      if (ch === '/' && next === '*') { blockComment = true; j++; continue; }
      if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
      if (ch === openCh) depth++;
      else if (ch === closeCh) { depth--; if (depth === 0) { j++; break; } }
    }
    return j;
  };
}

function extract(source, re) {
  const scan = makeScanner(source);
  const m = re.exec(source);
  if (!m) throw new Error('No encontrado: ' + re);
  let idx = m.index + m[0].length;
  while (source[idx] !== '{' && source[idx] !== '[') idx++;
  return source.slice(m.index, scan(idx) + 1);
}

const extracted = [
  extract(gameSrc, /const LEVEL_GROWTH\s*=/),
  extract(gameSrc, /function _calcLevelGrowth\s*\(/),
  'LEVEL_GROWTH.rogue.defDiv2 = true;\nLEVEL_GROWTH.necromancer.defDiv2 = true;',
  extract(gameSrc, /function recalculatePlayerStats\s*\(/),
  extract(gameSrc, /function getHeroDisplayStats\s*\(/),
  extract(gameSrc, /function checkShopGoldLimit\s*\(/),
  extract(gameSrc, /function recordGoldShopPurchase\s*\(/),
  extract(gameSrc, /function buyPotion\s*\(/),
  extract(gameSrc, /function buyShieldPotion\s*\(/)
].join('\n\n');

const harness = `
const TORRE21_HERO_PERMANENT_STATS_KEY = 'torre21_hero_stats';
const HERO_DATA = {
  knight: { name: 'Caballero', class: 'knight', maxHp: 110, pwr: 12, def: 5, startingShield: 6, critChance: 5, dodgeChance: 5, lifesteal: 0, luck: 0, thorns: 0 },
  rogue: { name: 'Pícaro', class: 'rogue', maxHp: 80, pwr: 15, def: 1, startingShield: 0, critChance: 10, dodgeChance: 5, lifesteal: 0, luck: 5, thorns: 0 },
  monk: { name: 'Monje', class: 'monk', maxHp: 95, pwr: 13, def: 3, startingShield: 0, critChance: 5, dodgeChance: 5, lifesteal: 8, luck: 0, thorns: 0 },
  necromancer: { name: 'Nigromante', class: 'necromancer', maxHp: 75, pwr: 17, def: 1, startingShield: 0, critChance: 10, dodgeChance: 5, lifesteal: 0, luck: 0, thorns: 0 },
  mage: { name: 'Mago', class: 'mage', maxHp: 75, pwr: 17, def: 1, startingShield: 0, critChance: 10, dodgeChance: 5, lifesteal: 0, luck: 0, thorns: 0 }
};
let gameState = { floor: 1, gold: 0, shopPurchasesThisFloor: 0, status: {}, player: null };
const _ls = {};
const localStorage = { getItem: (k) => (_ls[k] !== undefined ? _ls[k] : null), setItem: (k, v) => { _ls[k] = String(v); } };
let _mockLevel = 1;
const getHeroMeta = () => ({
  knight: { level: _mockLevel, baseMaxHp: null, basePwr: null, baseDef: null, legacyHp: 0, legacyPwr: 0, legacyDef: 0, totalExp: 0, masteryLevel: 1, exp: 0, runs: 0, wins: 0, legacyPoints: 0, prestigeTrophies: 0 },
  rogue: { level: _mockLevel, baseMaxHp: null, basePwr: null, baseDef: null, legacyHp: 0, legacyPwr: 0, legacyDef: 0, totalExp: 0, masteryLevel: 1, exp: 0, runs: 0, wins: 0, legacyPoints: 0, prestigeTrophies: 0 },
  monk: { level: _mockLevel, baseMaxHp: null, basePwr: null, baseDef: null, legacyHp: 0, legacyPwr: 0, legacyDef: 0, totalExp: 0, masteryLevel: 1, exp: 0, runs: 0, wins: 0, legacyPoints: 0, prestigeTrophies: 0 },
  necromancer: { level: _mockLevel, baseMaxHp: null, basePwr: null, baseDef: null, legacyHp: 0, legacyPwr: 0, legacyDef: 0, totalExp: 0, masteryLevel: 1, exp: 0, runs: 0, wins: 0, legacyPoints: 0, prestigeTrophies: 0 }
});
const getMasteryBonuses = () => ({ hp: 0, pwr: 0, def: 0 });
const getHeroPermanentStats = () => ({ pwr: 0, def: 0, hp: 0, crit: 0, dodge: 0, thorns: 0, lifesteal: 0, luck: 0 });
const getHeroTalentTree = () => ({ ranks: {} });
const hasArtifact = () => false;
const applyHeroTalentsToPlayer = () => {};
const initHeroAttributes = (p, cls) => ({ str: 10, dex: 10, vit: 10, int: 10, freePoints: 0 });
const showGameToast = () => {};
const addLog = () => {};
const updateHud = () => {};
const showShopModal = () => {};
const playPotionDrinkSound = () => {};
const playCoinSound = () => {};
const triggerHaptic = () => {};
const spawnFloatingText = () => {};
const SHOP_MAX_PURCHASES = 2;
${extracted}
module.exports = {
  recalculatePlayerStats, getHeroDisplayStats, checkShopGoldLimit, recordGoldShopPurchase,
  buyPotion, buyShieldPotion, SHOP_MAX_PURCHASES,
  setMockLevel: (v) => { _mockLevel = v; },
  get gameState() { return gameState; },
  set gameState(v) { gameState = v; }
};
`;

const Module = require('module');
const mod = new Module('sprint5-stat-growth-harness');
mod._compile(harness, path.join(__dirname, 'sprint5-stat-growth-harness.js'));
const api = mod.exports;

let pass = 0, fail = 0;
function check(label, cond, detail) {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail ? '  ->  ' + detail : '')); }
}

// === ASSERT 1: Stats por Nivel ===
console.log('\n== 1. Stats base por nivel (recalculatePlayerStats) ==');
const classes = {
  knight:      { base: { maxHp: 110, pwr: 12, def: 5 },   level3: { maxHp: 140, pwr: 14, def: 7 } },
  rogue:       { base: { maxHp: 80, pwr: 15, def: 1 },    level3: { maxHp: 100, pwr: 19, def: 2 } },
  monk:        { base: { maxHp: 95, pwr: 13, def: 3 },    level3: { maxHp: 119, pwr: 15, def: 5 } },
  necromancer: { base: { maxHp: 75, pwr: 17, def: 1 },    level3: { maxHp: 91, pwr: 21, def: 2 } }
};
Object.keys(classes).forEach(cls => {
  const cfg = classes[cls];
  const p = { class: cls, classKey: cls, level: 1, maxHp: cfg.base.maxHp, pwr: cfg.base.pwr, def: cfg.base.def, hp: cfg.base.maxHp };
  api.setMockLevel(1);
  api.recalculatePlayerStats(p);
  check('[' + cls + '] L1: maxHp === ' + cfg.base.maxHp, p.maxHp === cfg.base.maxHp, 'maxHp=' + p.maxHp);
  check('[' + cls + '] L1: pwr === ' + cfg.base.pwr, p.pwr === cfg.base.pwr, 'pwr=' + p.pwr);
  check('[' + cls + '] L1: def === ' + cfg.base.def, p.def === cfg.base.def, 'def=' + p.def);
  p.level = 3;
  api.setMockLevel(3);
  api.recalculatePlayerStats(p);
  check('[' + cls + '] L3: maxHp === ' + cfg.level3.maxHp, p.maxHp === cfg.level3.maxHp, 'maxHp=' + p.maxHp);
  check('[' + cls + '] L3: pwr === ' + cfg.level3.pwr, p.pwr === cfg.level3.pwr, 'pwr=' + p.pwr);
  check('[' + cls + '] L3: def === ' + cfg.level3.def, p.def === cfg.level3.def, 'def=' + p.def);
});

console.log('\n== 2. Stats base por nivel (getHeroDisplayStats) ==');
Object.keys(classes).forEach(cls => {
  const cfg = classes[cls];
  api.setMockLevel(1);
  const s1 = api.getHeroDisplayStats(cls);
  check('[' + cls + '] display L1: hp.base === ' + cfg.base.maxHp, s1.hp.base === cfg.base.maxHp, 'base=' + s1.hp.base);
  check('[' + cls + '] display L1: pwr.base === ' + cfg.base.pwr, s1.pwr.base === cfg.base.pwr, 'base=' + s1.pwr.base);
  check('[' + cls + '] display L1: def.base === ' + cfg.base.def, s1.def.base === cfg.base.def, 'base=' + s1.def.base);
  api.setMockLevel(3);
  const s3 = api.getHeroDisplayStats(cls);
  check('[' + cls + '] display L3: hp.base === ' + cfg.level3.maxHp, s3.hp.base === cfg.level3.maxHp, 'base=' + s3.hp.base);
  check('[' + cls + '] display L3: pwr.base === ' + cfg.level3.pwr, s3.pwr.base === cfg.level3.pwr, 'base=' + s3.pwr.base);
  check('[' + cls + '] display L3: def.base === ' + cfg.level3.def, s3.def.base === cfg.level3.def, 'base=' + s3.def.base);
});

// === ASSERT 2: 2 compras reales en tienda ===
console.log('\n== 3. Limite estricto de 2 compras en la tienda ==');
api.gameState = { floor: 1, gold: 500, shopPurchasesThisFloor: 0, status: { playerShield: 0 }, player: { potions: 0, shopBoughtItemsThisFloor: {} } };
check('inicial: shopPurchasesThisFloor === 0', api.gameState.shopPurchasesThisFloor === 0);
check('checkShopGoldLimit() false con 0 compras', api.checkShopGoldLimit() === false);
check('SHOP_MAX_PURCHASES === 2', api.SHOP_MAX_PURCHASES === 2, 'value=' + api.SHOP_MAX_PURCHASES);
api.buyPotion();
check('tras buyPotion: shopPurchasesThisFloor === 1', api.gameState.shopPurchasesThisFloor === 1, 'actual=' + api.gameState.shopPurchasesThisFloor);
check('tras 1 compra: checkShopGoldLimit() === false (tienda sigue abierta)', api.checkShopGoldLimit() === false);
api.buyShieldPotion(10, 15);
check('tras buyShieldPotion: shopPurchasesThisFloor === 2', api.gameState.shopPurchasesThisFloor === 2, 'actual=' + api.gameState.shopPurchasesThisFloor);
check('tras 2 compras: checkShopGoldLimit() === true (Limite alcanzado)', api.checkShopGoldLimit() === true);
api.gameState = { floor: 1, gold: 500, shopPurchasesThisFloor: 0, status: { playerShield: 0 }, player: { potions: 0, shopBoughtItemsThisFloor: {} } };
api.buyPotion();
check('no doble incremento: shopPurchasesThisFloor === 1 tras 1 compra', api.gameState.shopPurchasesThisFloor === 1, 'actual=' + api.gameState.shopPurchasesThisFloor);

// === ASSERT 4: Verificacion de codigo fuente ===
console.log('\n== 4. Codigo fuente: botones deshabilitados solo tras 2 compras ==');
check('game.js: checkShopGoldLimit usa >= 2', /shopPurchasesThisFloor\s*\|\|\s*0\)\s*>=\s*2/.test(gameSrc));
check('game.js: NO usa >= 1', !/shopPurchasesThisFloor\s*\|\|\s*0\)\s*>=\s*1/.test(gameSrc));
check('improvements.js: SHOP_MAX_PURCHASES === 2', /SHOP_MAX_PURCHASES\s*=\s*2/.test(impSrc));
check('improvements.js: canMakeShopPurchase usa < SHOP_MAX_PURCHASES', /_getShopPurchases\(\)\s*<\s*SHOP_MAX_PURCHASES/.test(impSrc));
check('improvements.js: updateShopPurchaseBadge deshabilita solo cuando rem <= 0', /rem\s*<=\s*0/.test(impSrc));
check('game.js: recalcular stats tras gainExp', /saveHeroRunProgress\(p,\s*null\)[\s\S]{0,200}recalculatePlayerStats\(p\)/.test(gameSrc));
check('game.js: recalcular stats en startGame', /p\.gold\s*=\s*gameState\.gold;[\s\S]{0,200}recalculatePlayerStats\(p\)/.test(gameSrc));
check('game.js: _calcLevelGrowth aplicado en recalculatePlayerStats', /_calcLevelGrowth\(heroKey,\s*p\.level\)/.test(gameSrc));
check('game.js: _calcLevelGrowth aplicado en getHeroDisplayStats', /_calcLevelGrowth\(heroKey,\s*permLevel\)/.test(gameSrc));

console.log('\n---------------------------------------');
console.log('RESULTADO: ' + pass + ' pass / ' + fail + ' fail');
process.exit(fail ? 1 : 0);
