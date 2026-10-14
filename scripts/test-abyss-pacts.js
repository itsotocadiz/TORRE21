/* Fase 2.1 — Los pactos del Abismo: texto honesto + flags realmente cableados */
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const Module = require('module');

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
  extract(impSrc, /const\s+ABYSS_PACTS\s*=\s*/),
  extract(impSrc, /const\s+_PACT_FLOOR_FLAGS\s*=\s*/),
  extract(impSrc, /function\s+_pactPlayer\s*\(/),
  extract(impSrc, /function\s+_clearFloorPactFlags\s*\(/),
  extract(impSrc, /function\s+_pactGateAction\s*\(/),
  extract(impSrc, /function\s+_pactAfterHandStart\s*\(/)
].join('\n\n');

const harness = `
${extracted}
module.exports = {
  ABYSS_PACTS: ABYSS_PACTS,
  _PACT_FLOOR_FLAGS: _PACT_FLOOR_FLAGS,
  _pactGateAction: _pactGateAction,
  _pactAfterHandStart: _pactAfterHandStart,
  _clearFloorPactFlags: _clearFloorPactFlags
};
`;

if (typeof global.window === 'undefined') global.window = global;
global.localStorage = global.localStorage || {
  _data: {},
  getItem(k) { return this._data[k] !== undefined ? this._data[k] : null; },
  setItem(k, v) { this._data[k] = String(v); },
  removeItem(k) { delete this._data[k]; }
};
global.BUST_LIMIT = 21;
global.addLog = () => {};
global.updateHud = () => {};
global.updateCombatState = () => {};
global.renderCards = () => {};
global.spawnFloatingText = () => {};
global.showGameToast = () => {};
global.getPlayerCryptCoins = () => 0;
global.openBoosterPackBySource = () => {};

let NEXT_CARD = 10;
global.drawCard = () => ({ value: NEXT_CARD, rank: String(NEXT_CARD), suit: '\u2660' });
global.calculateHandScore = (hand) => hand.reduce((s, c) => s + (c && c.value ? c.value : 0), 0);

const m = new Module('abyss-pacts-harness');
m._compile(harness, path.join(__dirname, 'abyss-pacts-harness.js'));
const api = m.exports;
const PACTS = api.ABYSS_PACTS;

let pass = 0, fail = 0;
function check(label, cond, detail) {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail ? '  ->  ' + detail : '')); }
}

function freshPlayer(extra) {
  return Object.assign({
    hp: 60, maxHp: 100, pwr: 5, def: 3, gold: 0, potions: 1,
    rerollsAvailable: 0, playerScore: 12, handNumber: 0,
    playerHand: [{ value: 7, rank: '7', suit: '\u2660' }, { value: 5, rank: '5', suit: '\u2660' }],
    bust: false, blackjack: false, enemyRevealed: false
  }, extra || {});
}
function freshState(p) {
  return { player: p, gold: 0, floor: 3, status: {}, enemy: { name: 'Prueba', enemyHand: [{ value: 6, rank: '6', suit: '\u2665' }, { value: 6, rank: '6', suit: '\u2665' }], enemyRevealed: false } };
}

console.log('\n== 1. Catálogo: 20 pactos, ids y apply ejecutables ==');
check('hay 20 pactos', PACTS.length === 20, 'n=' + PACTS.length);
check('ids únicos', new Set(PACTS.map(p => p.id)).size === PACTS.length);
check('cada pacto tiene name/curse/reward/apply',
  PACTS.every(p => p.name && p.curse && p.reward && typeof p.apply === 'function'));

let applyOk = true, applyErr = '';
PACTS.forEach(pact => {
  try {
    const p = freshPlayer();
    pact.apply(p, freshState(p));
  } catch (e) { applyOk = false; applyErr = pact.id + ': ' + e.message; }
});
check('las 20 apply() se ejecutan sin error', applyOk, applyErr);

console.log('\n== 2. Sin flags muertos (todo flag escrito debe estar cableado) ==');
const WIRED_FLAGS = [
  '_pactGreedGold', '_pactNoPotions', '_pactNoReroll', '_pactThornPedir', '_pactNoStandMax',
  '_pactMartyrBuff', '_pactGoldBlood', '_pactDarkHarvest', '_pactHandBloodLoss',
  '_pactEnemyExtraCard', '_pactExtraStartingCard', '_pactAlwaysReveal',
  '_pactBlackjackBuff', '_pactCampfireNoHeal'
];
const pactSource = extracted.slice(0, extracted.indexOf('const _PACT_FLOOR_FLAGS'));
const writtenFlags = Array.from(new Set((pactSource.match(/\bp\._pact[A-Za-z]+/g) || []).map(s => s.slice(2))));
check('flags escritos:', writtenFlags.length > 0, JSON.stringify(writtenFlags));
const deadFlags = writtenFlags.filter(f => WIRED_FLAGS.indexOf(f) === -1);
check('ningún flag cableado se queda sin usar', deadFlags.length === 0, 'sin cablear: ' + deadFlags.join(', '));

const LEGACY = ['_pactBlackjackX5', '_pactChaosTens', '_pactBlackjackDrain', '_pactNoDouble', '_pactReducedHands', 'maxAccessories'];
LEGACY.forEach(flag => {
  check('ya no se escribe ' + flag, impSrc.indexOf(flag) === -1, 'aparece en mejoras.js');
});
check('_PACT_FLOOR_FLAGS solo contiene flags con escritor',
  api._PACT_FLOOR_FLAGS.every(f => writtenFlags.indexOf(f) !== -1 || WIRED_FLAGS.indexOf(f) !== -1),
  JSON.stringify(api._PACT_FLOOR_FLAGS));

console.log('\n== 3. Texto honesto: la recompensa prometida existe en el código ==');
const crown = PACTS.find(p => p.id === 'pact_abyss_crown');
check('Corona del Abismo promete x4 (el motor solo sabe multiplicar x4)', /x4/.test(crown.reward), crown.reward);
check('Corona del Abismo fija el límite de plantarse (16)', crown.apply.toString().indexOf('_pactNoStandMax = 16') !== -1);

const thorn = PACTS.find(p => p.id === 'pact_thorn');
check('Espina ya no promete "+5 daño" (su apply solo da +1 PWR)', thorn.reward.indexOf('+5') === -1, thorn.reward);

const split = PACTS.find(p => p.id === 'pact_split_soul');
check('Alma Partida ya no promete 2 amuletos (slot único en game.js)', !/amulet/i.test(split.reward), split.reward);
check('Alma Partida ya no escribe maxAccessories', split.apply.toString().indexOf('maxAccessories') === -1);

const chaos = PACTS.find(p => p.id === 'pact_chaos');
check('Caos Total ya no promete "Figuras valen 11" (no existe ese cálculo)', !/11/.test(chaos.reward), chaos.reward);

const monolith = PACTS.find(p => p.id === 'pact_monolith');
check('Monolito ya no cita "Double Down" (mecánica inexistente)', !/double|doblars/i.test(monolith.curse), monolith.curse);
check('Monolito ya no escribe _pactNoDouble', monolith.apply.toString().indexOf('_pactNoDouble') === -1);

const time = PACTS.find(p => p.id === 'pact_time');
check('Tiempo ya no promete "4 manos" (TURNS_PER_FLOOR es const)', !/manos/i.test(time.curse), time.curse);
check('Tiempo ahora prohíbe los Reroll', time.apply.toString().indexOf('_pactNoReroll') !== -1);

const goldBlood = PACTS.find(p => p.id === 'pact_gold_blood');
check('Sangre por Oro promete +2 (Toque de Midas paga exactamente 2)', /\+2 de Oro/.test(goldBlood.reward), goldBlood.reward);
check('Sangre por Oro castiga al iniciar la mano (no a la derrota)', goldBlood.apply.toString().indexOf('_pactHandBloodLoss') !== -1);

const leech = PACTS.find(p => p.id === 'pact_leech');
check('Parásito ya no promete drenaje en Blackjack', !/drenas/i.test(leech.reward), leech.reward);
check('Parásito aplica su pérdida de HP al aceptarse', leech.apply.toString().indexOf('p.hp = Math.max(1, p.hp - 4)') !== -1);

const darkness = PACTS.find(p => p.id === 'pact_darkness');
check('Tinieblas ya no promete "revela cartas" (se resetea en cada reparto)', !/revela/i.test(darkness.reward), darkness.reward);

console.log('\n== 4. Gates de acción (_pactGateAction) ==');
function gate(player, action, rolling) {
  global.gameState = { player: player, isRolling: !!rolling };
  return api._pactGateAction(action);
}
check('sin pactos: deja pasar todo',
  gate(freshPlayer(), 'potion') === true && gate(freshPlayer(), 'stand') === true);
check('pacto Tinieblas bloquea Poción', gate(freshPlayer({ _pactNoPotions: true }), 'potion') === false);
check('pacto Tiempo bloquea Reroll', gate(freshPlayer({ _pactNoReroll: true }), 'reroll') === false);
check('Azar impide plantarse con 12', gate(freshPlayer({ _pactNoStandMax: 14, playerScore: 12 }), 'stand') === false);
check('Azar permite plantarse con 15', gate(freshPlayer({ _pactNoStandMax: 14, playerScore: 15 }), 'stand') === true);
check('Corona impide plantarse con 16', gate(freshPlayer({ _pactNoStandMax: 16, playerScore: 16 }), 'stand') === false);
check('Corona permite plantarse con 17', gate(freshPlayer({ _pactNoStandMax: 16, playerScore: 17 }), 'stand') === true);

const thornPlayer = freshPlayer({ _pactThornPedir: true, hp: 40 });
const thornOk = gate(thornPlayer, 'hit') === true && thornPlayer.hp === 37;
check('Espina resta exactamente 3 HP al pedir carta', thornOk, 'hp=' + thornPlayer.hp);

const rollPlayer = freshPlayer({ _pactThornPedir: true, hp: 40 });
gate(rollPlayer, 'hit', true);
check('Espina no castiga mientras el motor está ocupado', rollPlayer.hp === 40, 'hp=' + rollPlayer.hp);

console.log('\n== 5. Inicio de mano (_pactAfterHandStart) ==');
const bloodP = freshPlayer({ _pactHandBloodLoss: true, hp: 10 });
api._pactAfterHandStart(bloodP, { name: 'E', enemyHand: [], enemyRevealed: false });
check('Sangre por Oro resta 3 HP por mano', bloodP.hp === 7, 'hp=' + bloodP.hp);

const bloodLow = freshPlayer({ _pactHandBloodLoss: true, hp: 2 });
api._pactAfterHandStart(bloodLow, null);
check('Sangre por Oro nunca mata (mínimo 1 HP)', bloodLow.hp === 1, 'hp=' + bloodLow.hp);

NEXT_CARD = 5;
const ghostP = freshPlayer({ _pactExtraStartingCard: true });
api._pactAfterHandStart(ghostP, null);
check('Mano Fantasma reparte la 3ª carta si cabe', ghostP.playerHand.length === 3 && ghostP.playerScore === 17,
  'len=' + ghostP.playerHand.length + ' score=' + ghostP.playerScore);

NEXT_CARD = 11;
const ghostBust = freshPlayer({ _pactExtraStartingCard: true });
const ghostLog = [];
global.addLog = (msg) => { ghostLog.push(String(msg)); };
api._pactAfterHandStart(ghostBust, null);
global.addLog = () => {};
check('Mano Fantasma NO rompe la mano si la 3ª carta pasa de 21',
  ghostBust.playerHand.length === 2 && ghostBust.bust === false,
  'len=' + ghostBust.playerHand.length);
check('Mano Fantasma lo explica en el registro', ghostLog.some(l => l.indexOf('sin pasarte') !== -1), JSON.stringify(ghostLog));

const bjP = freshPlayer({ _pactExtraStartingCard: true, blackjack: true, playerScore: 21 });
api._pactAfterHandStart(bjP, null);
check('Mano Fantasma no toca un Blackjack natural', bjP.playerHand.length === 2, 'len=' + bjP.playerHand.length);

NEXT_CARD = 10;
const enemyGhost = freshPlayer({ _pactEnemyExtraCard: true });
const enemy = { name: 'Duende', enemyHand: [{ value: 6, rank: '6', suit: '\u2665' }, { value: 5, rank: '5', suit: '\u2665' }], enemyRevealed: false, enemyScore: 11, bust: false, blackjack: false };
api._pactAfterHandStart(enemyGhost, enemy);
check('Mano Fantasma da carta extra también al rival', enemy.enemyHand.length === 3 && enemy.enemyScore === 21,
  'len=' + enemy.enemyHand.length + ' score=' + enemy.enemyScore);

const crownP = freshPlayer({ _pactBlackjackBuff: true });
api._pactAfterHandStart(crownP, null);
check('Corona del Abismo arma el multiplicador de Blackjack en cada mano', crownP._synergyNextBJx4 === true);

const seerP = freshPlayer({ _pactAlwaysReveal: true });
const seerEnemy = { name: 'E', enemyHand: [], enemyRevealed: false };
api._pactAfterHandStart(seerP, seerEnemy);
check('Ojo del Vidente mantiene revelado al rival', seerEnemy.enemyRevealed === true);

console.log('\n== 6. Límite por piso (_clearFloorPactFlags) ==');
const clearP = freshPlayer({ _pactNoPotions: true, _pactNoReroll: true, _pactNoStandMax: 14, _pactCampfireNoHeal: true });
const clearGs = { _pactOfferedThisFloor: true };
api._clearFloorPactFlags(clearP, clearGs);
check('borra el castigo de Tinieblas', clearP._pactNoPotions === undefined);
check('borra el castigo de Tiempo', clearP._pactNoReroll === undefined);
check('conserva pactos permanentes', clearP._pactNoStandMax === 14 && clearP._pactCampfireNoHeal === true);
check('permite ofrecer un nuevo pacto el siguiente piso', clearGs._pactOfferedThisFloor === false);

console.log('\n== 7. Cableado del motor en improvements.js ==');
check('onImprovementsReady llama a _wireAbyssPactEffects',
  /function\s+onImprovementsReady\s*\([\s\S]*?_wireAbyssPactEffects\(\)/.test(impSrc));
['_wirePactActionGates', '_wirePactHandRewards', '_wirePactHandStart', '_wirePactFloorGold', '_wirePactFloorClear', '_wirePactCampfire']
  .forEach(fn => check('define ' + fn, new RegExp('function\\s+' + fn + '\\s*\\(').test(impSrc)));

check('enemyHpFor suma +15% de HP con Pacto de la Codicia', /_pactGreedGold[\s\S]{0,120}1\.15/.test(impSrc));
check('finishFloor reparte el +60% de Oro de la Codicia', /Math\.round\(gained \* 0\.6\)/.test(impSrc));
check('finishCampfireRest anula la curación del pacto', /_pactCampfireNoHeal/.test(impSrc));
check('advanceToNextFloor limpia los flags de piso', /_clearFloorPactFlags\(p, gs\)/.test(impSrc));

check('evaluateSynergies premia con Toque de Midas (+2 Oro)', /_pactGoldBlood[\s\S]{0,80}_synergyGoldenTouch/.test(impSrc));
check('evaluateSynergies activa Cosecha Oscura (+8 HP)', /_pactDarkHarvest[\s\S]{0,80}_synergyDarkHarvest/.test(impSrc));
check('evaluateSynergies arma el bonus del Mártir', /_pactMartyrBuff[\s\S]{0,160}_synergyBonusPwr/.test(impSrc));

check('game.js expone playerAction en window para poder envolverlo', /window\.playerAction\s*=/.test(gameSrc) || /function playerAction\s*\(/.test(gameSrc));
check('game.js expone startNewHand global', /function startNewHand\s*\(/.test(gameSrc));
check('game.js expone finishFloor global', /function finishFloor\s*\(/.test(gameSrc));

console.log('\n== 8. Sin restos de la versión simulada ==');
check('sin IAP falso en mejoras.js', impSrc.indexOf('IAP_PACKS') === -1);
check('sin pantalla #screen-iap en index.html',
  fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8').indexOf('id="screen-iap"') === -1);

console.log('\n---------------------------------------');
console.log('RESULTADO: ' + pass + ' pass / ' + fail + ' fail');
process.exitCode = fail > 0 ? 1 : 0;
