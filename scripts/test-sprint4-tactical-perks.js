/* Sprint 4 — Verificación de los Perks Tácticos (solo lectura de js/*.js) */
const fs = require('fs');
const path = require('path');

const impSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'improvements.js'), 'utf8');
const gameSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf8');

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
  extract(impSrc, /const\s+TACTICAL_PERKS\s*=\s*/),
  extract(impSrc, /function\s+resetTacticalPerkFlags\s*\(/),
  extract(impSrc, /function\s+evaluateSynergies\s*\(/)
].join('\n\n');

const harness = `
${extracted}
module.exports = {
  TACTICAL_PERKS: TACTICAL_PERKS,
  resetTacticalPerkFlags: resetTacticalPerkFlags,
  evaluateSynergies: evaluateSynergies
};
`;

const Module = require('module');
const m = new Module('sprint4-harness');
m._compile(harness, path.join(__dirname, 'sprint4-harness.js'));
const api = m.exports;

let pass = 0, fail = 0;
function check(label, cond, detail) {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail ? '  ->  ' + detail : '')); }
}

console.log('\n== 1. Renombre SYNERGY_COMBOS -> TACTICAL_PERKS ==');
check('improvements.js declara const TACTICAL_PERKS', /const\s+TACTICAL_PERKS\s*=\s*\[/.test(impSrc));
check('improvements.js ya NO declara const SYNERGY_COMBOS', !/const\s+SYNERGY_COMBOS\s*=/.test(impSrc));
check('exporta window.TACTICAL_PERKS', /window\.TACTICAL_PERKS\s*=\s*TACTICAL_PERKS/.test(impSrc));
check('mantiene alias window.SYNERGY_COMBOS (compatibilidad)', /window\.SYNERGY_COMBOS\s*=\s*TACTICAL_PERKS/.test(impSrc));
check('sin "SINERGIA" en log de perk', !/\[SINERGIA\]/.test(impSrc));
check('log usa [PERK TÁCTICO]', /\[PERK TÁCTICO\]/.test(impSrc));
check('banner usa ¡PERK TÁCTICO ACTIVADO!', /¡PERK TÁCTICO ACTIVADO!/.test(impSrc));

console.log('\n== 2. Estructura de los 15 perks ==');
check('hay 15 perks', api.TACTICAL_PERKS.length === 15, 'n=' + api.TACTICAL_PERKS.length);
check('ids únicos', new Set(api.TACTICAL_PERKS.map(p => p.id)).size === 15);
check('cada perk tiene name/desc/icon/check/apply',
  api.TACTICAL_PERKS.every(p => p.name && p.desc && p.icon && typeof p.check === 'function' && typeof p.apply === 'function'));
check('ningún icono placeholder "X"', api.TACTICAL_PERKS.every(p => p.icon !== 'X'));

console.log('\n== 3. Cada perk se activa con su condición ==');
const cases = [
  { id: 'iron_wall',       p: { def: 5 },                                        gs: { status: { playerShield: 10 } }, e: {} },
  { id: 'assassin_edge',   p: { class: 'rogue', playerScore: 18 },               gs: { status: {} },                   e: {} },
  { id: 'plague_master',   p: { class: 'necromancer' },                          gs: { status: { enemyPoison: 3 } },   e: {} },
  { id: 'diamond_heart',   p: { hp: 100, maxHp: 100 },                           gs: { status: { playerShield: 8 } },  e: {} },
  { id: 'dark_harvest',    p: { class: 'necromancer' },                          gs: { status: {}, killCount: 3 },     e: {} },
  { id: 'monks_clarity',   p: { class: 'monk', playerScore: 19, bust: false },   gs: { status: {} },                   e: {} },
  { id: 'fire_and_ice',    p: { playerHand: [{ enchantment: { id: 'ignite' } }] }, gs: { status: { enemyBurn: 2 } },   e: {} },
  { id: 'golden_touch',    p: {},                                                gs: { status: {}, gold: 50, floor: 2 }, e: {} },
  { id: 'survivor',        p: { hp: 25, maxHp: 100 },                            gs: { status: {} },                   e: {} },
  { id: 'chain_lightning', p: { _winStreak: 3 },                                 gs: { status: {} },                   e: {} },
  { id: 'shield_bash',     p: { class: 'knight' },                               gs: { status: { playerShield: 15 } }, e: {} },
  { id: 'vanishing_act',   p: { class: 'rogue', handNumber: 1 },                 gs: { status: {} },                   e: {} },
  { id: 'last_stand',      p: { hp: 15, def: 3 },                                gs: { status: {} },                   e: {} },
  { id: 'arcane_surge',    p: { cardEnchantments: { a: 1, b: 2, c: 3 } },        gs: { status: {} },                   e: {} },
  { id: 'dragon_slayer',   p: { hp: 100, maxHp: 100 },                           gs: { status: {}, enemy: { trait: 'dragon' } }, e: {} }
];
cases.forEach(c => {
  const activated = api.evaluateSynergies(c.p, c.e, c.gs);
  check('se activa: ' + c.id, activated.some(a => a.id === c.id),
    'activadas=' + activated.map(a => a.id).join(','));
});

console.log('\n== 4. Efectos laterales reales ==');
let pA = { class: 'necromancer' }, gsA = { status: { enemyPoison: 4 }, killCount: 0 }, eA = {};
api.evaluateSynergies(pA, eA, gsA);
check('plague_master multiplica el veneno rival x1.5 (4 -> 6)', gsA.status.enemyPoison === 6, 'poison=' + gsA.status.enemyPoison);

let pB = { class: 'monk', playerScore: 19, bust: false }, gsB = { status: {} }, eB = {};
api.evaluateSynergies(pB, eB, gsB);
check('monks_clarity revela las cartas rivales', eB.enemyRevealed === true);

let pC = { hp: 10, maxHp: 100 }, gsC = { status: { playerShield: 0 } }, eC = {};
api.evaluateSynergies(pC, eC, gsC);
check('survivor cura +5 HP y otorga +5 Escudo', pC.hp === 15 && gsC.status.playerShield === 5,
  'hp=' + pC.hp + ' shield=' + gsC.status.playerShield);

console.log('\n== 5. Sin acumulación entre manos ==');
const pD = { class: 'knight', def: 5, hp: 100, maxHp: 100, cardEnchantments: {} };
const gsD = { status: { playerShield: 15, enemyPoison: 0, enemyBurn: 0 }, gold: 60, floor: 2, killCount: 0, enemy: { trait: 'dragon' } };
const eD = {};
api.evaluateSynergies(pD, eD, gsD);
const firstPwr = pD._synergyBonusPwr;
const firstDef = pD._synergyBonusDef;
api.evaluateSynergies(pD, eD, gsD);
check('el daño de perk NO se acumula entre manos', pD._synergyBonusPwr === firstPwr,
  '1ª=' + firstPwr + ' 2ª=' + pD._synergyBonusPwr);
check('la DEF de perk NO se acumula entre manos', pD._synergyBonusDef === firstDef,
  '1ª=' + firstDef + ' 2ª=' + pD._synergyBonusDef);
check('perk [Muralla de Hierro] armado con +3 DEF', pD._synergyBonusDef === 3, 'def=' + pD._synergyBonusDef);
check('perk [Corazón de Diamante] armado: +6 daño directo y +15% Crítico',
  pD._synergyDiamondHeartDirect === 6 && pD._synergyDiamondHeartCrit === 0.15);
check('perk [Toque de Midas] armado para la mano ganada', pD._synergyGoldenTouch === true);

console.log('\n== 6. resetTacticalPerkFlags limpia todo ==');
api.resetTacticalPerkFlags(pD);
check('flags de daño a 0', pD._synergyBonusPwr === 0 && pD._synergyBonusDef === 0);
check('flags numéricas a 0',
  pD._synergyBonusPwr === 0 && pD._synergyBonusDef === 0 &&
  pD._synergyDiamondHeartDirect === 0 && pD._synergyDiamondHeartCrit === 0);
check('flag de esquiva a 0', pD._synergyExtraDodge === 0);

console.log('\n== 7. Cableado en game.js (los flags SÍ se leen en combate) ==');
[
  ['_synergyBonusPwr', 'daño de esta mano en la fórmula'],
  ['_synergyBonusDef', 'DEF del contraataque rival'],
  ['_synergyDiamondHeartDirect', '+6 Ataque directo en bonus'],
  ['_synergyDiamondHeartCrit', '+15% Crítico efectivo'],
  ['_synergyDarkHarvest', '+8 HP al tumbar al rival'],
  ['_synergyGoldenTouch', '+2 Oro por mano ganada'],
  ['_synergyExtraDodge', 'esquiva del contraataque'],
  ['_synergyLastStand', 'golpe rival reducido a 1']
].forEach(([flag, what]) => {
  check('game.js lee ' + flag + ' (' + what + ')', gameSrc.indexOf(flag) !== -1);
});
check('game.js suma el daño de perk en bonus', gameSrc.indexOf('bonus += p._synergyBonusPwr') !== -1);
check('game.js suma la DEF de perk al contraataque', gameSrc.indexOf('totalDef += p._synergyBonusDef') !== -1);
check('game.js conecta el bonus directo del Corazón de Diamante', gameSrc.indexOf('p._synergyDiamondHeartDirect > 0') !== -1);
check('game.js conecta el crit del Corazón de Diamante', gameSrc.indexOf('diamondHeartCrit') !== -1);
check('game.js evalúa los perks al ganar la mano', gameSrc.indexOf('evaluateSynergies(p, e, gameState)') !== -1);

console.log('\n---------------------------------------');
console.log('RESULTADO: ' + pass + ' pass / ' + fail + ' fail');
if (fail > 0) process.exitCode = 1;
