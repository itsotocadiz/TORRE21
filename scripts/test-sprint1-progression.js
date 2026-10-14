/* Sprint 1 — Verificación de Progresión Permanente Real (solo lectura de js/game.js) */
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf8');

function extractFunction(name) {
  const re = new RegExp('function\\s+' + name.replace(/\$/g, '\\$') + '\\s*\\(');
  const m = re.exec(src);
  if (!m) throw new Error('Función no encontrada: ' + name);
  let i = src.indexOf('{', m.index);
  let depth = 0, j = i, quote = null, lineComment = false, blockComment = false;
  for (; j < src.length; j++) {
    const ch = src[j], next = src[j + 1];
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
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) { j++; break; } }
  }
  return src.slice(m.index, j);
}

const names = ['_clamp', '_validateMetaRanges', '_migrateHeroMeta', 'saveHeroRunProgress',
  'getHeroMeta', 'saveHeroMeta', 'calculateMasteryLevel', 'getExpRequiredForLevel', 'getMasteryBonuses'];

const extracted = names.map(n => extractFunction(n) + '\n').join('\n');

const harness = `
  const _store = {};
  const localStorage = {
    getItem: k => (k in _store ? _store[k] : null),
    setItem: (k, v) => { _store[k] = String(v); },
    removeItem: k => { delete _store[k]; }
  };
  const _INTEGRITY_SALT = 'test';
  function _loadSecure(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function _saveSecure(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
  const HERO_DATA = {
    knight: { class: 'knight', name: 'Caballero', maxHp: 90, pwr: 2, def: 3 },
    rogue: { class: 'rogue', name: 'Pícaro', maxHp: 65, pwr: 4, def: 1 },
    monk: { class: 'monk', name: 'Monje', maxHp: 75, pwr: 3, def: 2 },
    necromancer: { class: 'necromancer', name: 'Nigromante', maxHp: 70, pwr: 3, def: 1 }
  };
  const addLog = () => {};
  const spawnFloatingText = () => {};
  const updateHeroSelectUI = () => {};
  const HERO_META_KEY = 'blackjack_tower_heroes_meta_v1';
  ${extracted}
  module.exports = { getHeroMeta, saveHeroMeta, saveHeroRunProgress, getExpRequiredForLevel,
    getMasteryBonuses, calculateMasteryLevel, localStorage, _store, HERO_META_KEY, HERO_DATA };
`;

const Module = require('module');
const m = new Module('sprint1-harness');
m._compile(harness, path.join(__dirname, 'sprint1-harness.js'));
const api = m.exports;

let pass = 0, fail = 0;
function check(label, cond, detail) {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail ? '  ->  ' + detail : '')); }
}

console.log('\n== 1. Guardado nuevo (sin storage previo) ==');
let meta = api.getHeroMeta();
check('knight.level = 1', meta.knight.level === 1, 'level=' + meta.knight.level);
check('knight.exp = 0', meta.knight.exp === 0);
check('knight.baseMaxHp = 90 (base héroe)', meta.knight.baseMaxHp === 90, 'base=' + meta.knight.baseMaxHp);
check('knight.basePwr = 2', meta.knight.basePwr === 2);
check('knight.baseDef = 3', meta.knight.baseDef === 3);
check('masteryLevel espejo de level', meta.knight.masteryLevel === meta.knight.level);
check('prestigeTrophies = 0', meta.knight.prestigeTrophies === 0);

console.log('\n== 2. Migración de guardado antiguo (totalExp/masteryLevel sin level/exp/base*) ==');
api.localStorage.removeItem(api.HERO_META_KEY);
api._store[api.HERO_META_KEY] = JSON.stringify({
  knight: { totalExp: 1200, masteryLevel: 5, runs: 12, wins: 1, legacyPoints: 2, legacyHp: 3, legacyPwr: 1, legacyDef: 0 },
  rogue: { totalExp: 0, masteryLevel: 1, runs: 0, wins: 0 }
});
meta = api.getHeroMeta();
const expLvl5 = api.getExpRequiredForLevel(5);
check('migración: level = 5 (desde masteryLevel)', meta.knight.level === 5, 'level=' + meta.knight.level);
check('migración: masteryLevel espejo = 5', meta.knight.masteryLevel === 5);
check('migración: exp = 0 y < requerido (' + expLvl5 + ')', meta.knight.exp === 0 && meta.knight.exp < expLvl5);
const mb5 = api.getMasteryBonuses(5);
check('migración: baseMaxHp = 90 + ' + mb5.hp + ' = ' + (90 + mb5.hp), meta.knight.baseMaxHp === 90 + mb5.hp, 'base=' + meta.knight.baseMaxHp);
check('migración: basePwr = 2 + ' + mb5.pwr + ' = ' + (2 + mb5.pwr), meta.knight.basePwr === 2 + mb5.pwr);
check('migración: baseDef = 3 + ' + mb5.def + ' = ' + (3 + mb5.def), meta.knight.baseDef === 3 + mb5.def);
check('migración: legacy conservado (3)', meta.knight.legacyHp === 3);
check('migración: runs conservadas (12)', meta.knight.runs === 12);
check('migración persistida en storage', JSON.parse(api.localStorage.getItem(api.HERO_META_KEY)).knight.level === 5);
check('héroe sin datos: rogue migrado a nivel 1 / base 65', meta.rogue.level === 1 && meta.rogue.baseMaxHp === 65);

console.log('\n== 3. saveHeroRunProgress: crecimiento de clase acumulado ==');
meta = api.getHeroMeta();
const before = JSON.parse(JSON.stringify(meta.knight));
const p = { class: 'knight', level: 6, exp: 120, maxHp: 200, pwr: 9, def: 7 };
api.saveHeroRunProgress(p, { hp: 15, pwr: 1, def: 1 });
meta = api.getHeroMeta();
check('level persistido = 6', meta.knight.level === 6, 'level=' + meta.knight.level);
check('exp persistida = 120', meta.knight.exp === 120);
check('baseMaxHp crece +15 (' + before.baseMaxHp + ' -> ' + meta.knight.baseMaxHp + ')', meta.knight.baseMaxHp === before.baseMaxHp + 15);
check('basePwr crece +1', meta.knight.basePwr === before.basePwr + 1);
check('baseDef crece +1', meta.knight.baseDef === before.baseDef + 1);
check('masteryLevel espejo = 6', meta.knight.masteryLevel === 6);
check('NO toca legacyPoints', meta.knight.legacyPoints === before.legacyPoints);

console.log('\n== 4. saveHeroRunProgress SIN growth: solo nivel/EXP ==');
api.saveHeroRunProgress({ class: 'knight', level: 7, exp: 10 }, null);
meta = api.getHeroMeta();
check('level = 7', meta.knight.level === 7);
check('exp = 10', meta.knight.exp === 10);
check('stats base intactos', meta.knight.baseMaxHp === before.baseMaxHp + 15);

console.log('\n== 5. Separación Legado vs Base (sin doble conteo) ==');
meta.knight.legacyHp = 10;
api.saveHeroMeta(meta);
const startMaxHp = (function () {
  const mm = api.getHeroMeta();
  const legHp = (mm.knight.legacyHp || 0) * 3;
  return mm.knight.baseMaxHp + legHp;
})();
check('HP en run = base(' + api.getHeroMeta().knight.baseMaxHp + ') + legado(30) = ' + startMaxHp, startMaxHp === api.getHeroMeta().knight.baseMaxHp + 30);
api.saveHeroRunProgress({ class: 'knight', level: 8, exp: 0, maxHp: startMaxHp, pwr: 1, def: 1 }, { hp: 15, pwr: 0, def: 0 });
meta = api.getHeroMeta();
check('base NO contamina el legado al persistir', meta.knight.baseMaxHp === before.baseMaxHp + 30, 'base=' + meta.knight.baseMaxHp);

console.log('\n== 6. Curva de EXP y validación de rangos ==');
check('getExpRequiredForLevel(1) = 60', api.getExpRequiredForLevel(1) === 60);
check('getExpRequiredForLevel(6) = 1050', api.getExpRequiredForLevel(6) === 1050);
check('calculateMasteryLevel(0) = 1', api.calculateMasteryLevel(0) === 1);
api._store[api.HERO_META_KEY] = JSON.stringify({ knight: { level: 9999, exp: 999999, totalExp: 9999999 } });
meta = api.getHeroMeta();
check('level clampado a 50', meta.knight.level === 50, 'level=' + meta.knight.level);

console.log('\n---------------------------------------');
console.log('RESULTADO: ' + pass + ' pass / ' + fail + ' fail');
if (fail > 0) process.exitCode = 1;
