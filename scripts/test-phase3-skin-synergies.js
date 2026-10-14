/* Test Suite — Fase 3: Metajuego: Vestiduras evolucionan con sinergias (R-02) */
const fs = require('fs');
const path = require('path');
const Module = require('module');

const gameSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf8');
const cssSrc = fs.readFileSync(path.join(__dirname, '..', 'css', 'style.css'), 'utf8');

let pass = 0, fail = 0;
function check(label, cond, detail) {
  if (cond) { pass++; console.log('  PASS ' + label); }
  else { fail++; console.log('  FAIL ' + label + (detail ? ' -> ' + detail : '')); }
}

// Extraer el bloque de HERO_SKINS y funciones auxiliares de game.js
const START = gameSrc.indexOf('const HERO_SKINS = {');
const END_MARK = 'window.renderHeroSkinGrid = renderHeroSkinGrid;';
const END = gameSrc.indexOf(END_MARK);

if (START < 0 || END < 0) {
  console.error('FAIL: bloque HERO_SKINS no encontrado en game.js');
  process.exit(1);
}

const block = gameSrc.slice(START, END + END_MARK.length);

// Entorno simulado
global.window = global;
global.localStorage = {
  _data: {},
  getItem(k) { return this._data[k] || null; },
  setItem(k, v) { this._data[k] = String(v); },
  removeItem(k) { delete this._data[k]; }
};
global.gameState = { player: { class: 'knight', hp: 50, maxHp: 50, pwr: 5, def: 2 }, gold: 10, status: {} };
global.parseJSONArray = (raw, fallback) => {
  try { return raw ? JSON.parse(raw) : fallback; } catch (_) { return fallback; }
};
global.getPlayerCryptCoins = () => 100;
global.spendPlayerCryptCoins = () => true;
global.showGameToast = () => {};
global.spawnFloatingText = () => {};
global.playJackpotSound = () => {};
global.playButtonClickSound = () => {};
global.playTone = () => {};
global.triggerHaptic = () => {};
global.renderHeroBook = () => {};
global.openHeroSheet = () => {};
global.addLog = () => {};
global.updateHud = () => {};
global.HERO_DATA = {
  knight: { name: 'Caballero' },
  rogue: { name: 'Pícaro' },
  monk: { name: 'Monje' },
  necromancer: { name: 'Nigromante' }
};

let MOCK_META = {};
global.getHeroMeta = () => MOCK_META;

const harness = `
${block}
module.exports = {
  HERO_SKINS: HERO_SKINS,
  getHeroEquippedSkin: getHeroEquippedSkin,
  isHeroSkinUnlocked: isHeroSkinUnlocked,
  equipHeroSkin: equipHeroSkin,
  getSkinSynergyData: getSkinSynergyData,
  applyEquippedSkinSynergy: applyEquippedSkinSynergy,
  renderHeroSkinGrid: renderHeroSkinGrid
};
`;

const m = new Module('skin-synergies-harness');
m._compile(harness, path.join(__dirname, 'skin-synergies-harness.js'));
const api = m.exports;

console.log('\n== 1. Auditoría del Catálogo de Vestiduras (12 Vestiduras, 0 Stats Planos) ==');
const classes = ['knight', 'rogue', 'monk', 'necromancer'];
check('Las 4 clases están definidas en HERO_SKINS', classes.every(c => Array.isArray(api.HERO_SKINS[c])));

let totalSkins = 0;
let flatStatsFound = false;
let allHaveSynergies = true;

classes.forEach(c => {
  const list = api.HERO_SKINS[c];
  totalSkins += list.length;
  list.forEach(skin => {
    // Verificar que no haya stats planos incondicionales
    if (typeof skin.maxHp === 'number' || typeof skin.pwr === 'number' || typeof skin.def === 'number') {
      flatStatsFound = true;
    }
    // Verificar sinergia completa
    if (!skin.synergy || !skin.synergy.id || !skin.synergy.suit || !Array.isArray(skin.synergy.ranks) || skin.synergy.ranks.length !== 3) {
      allHaveSynergies = false;
    }
  });
});

check('Total exacto de 12 vestiduras registradas (3 por clase)', totalSkins === 12, 'total=' + totalSkins);
check('Cero estadísticas planas incondicionales en vestiduras (anti-power creep)', !flatStatsFound);
check('Todas las 12 vestiduras definen sinergias con palos y 3 rangos', allHaveSynergies);

console.log('\n== 2. Progresión y Evolución por Nivel Permanente (Rango I, II y III) ==');
// Nivel 1 -> Rango I
MOCK_META = { knight: { level: 1 } };
const synN1 = api.getSkinSynergyData('knight', 'knight_classic');
check('Nivel 1 activa Rango 1', synN1.rank === 1 && synN1.currentRank.rank === 1);
check('Nivel 1 indica próxima evolución a Nivel 4', synN1.nextLevelReq === 4);

// Nivel 4 -> Rango II
MOCK_META = { knight: { level: 4 } };
const synN4 = api.getSkinSynergyData('knight', 'knight_classic');
check('Nivel 4 activa Rango 2', synN4.rank === 2 && synN4.currentRank.rank === 2);
check('Nivel 4 indica próxima evolución a Nivel 8', synN4.nextLevelReq === 8);

// Nivel 8 -> Rango III (Maestro)
MOCK_META = { knight: { level: 8 } };
const synN8 = api.getSkinSynergyData('knight', 'knight_classic');
check('Nivel 8 activa Rango 3 (Maestro)', synN8.rank === 3 && synN8.currentRank.rank === 3);
check('Nivel 8 es rango máximo (sin siguiente nivel)', synN8.nextRank === null && synN8.nextLevelReq === null);

console.log('\n== 3. Mecánica de Activación y Topes en Combate ==');
// Simular combate con Caballero Clásico (Baluarte de Tréboles)
localStorage.setItem('bj_hero_skin_knight', 'knight_classic');
MOCK_META = { knight: { level: 1 } }; // Rango 1: +2 Escudo por carta de ♣, máx 4 por mano
const gsCombat = { status: { playerShield: 0 }, _skinSynergyUsage: {} };
const pCombat = { class: 'knight', playerHand: [{ suit: '♣' }, { suit: '♣' }] };

const act = api.applyEquippedSkinSynergy('hand_win', pCombat, {}, gsCombat);
check('Baluarte de Tréboles se activa en victoria con cartas de ♣', act === true);
check('Genera exactamente +4 Escudo (2 cartas x 2)', gsCombat.status.playerShield === 4, 'shield=' + gsCombat.status.playerShield);

// Probar tope por mano (3 cartas de trebol con max 4)
gsCombat.status.playerShield = 0;
const p3Clubs = { class: 'knight', playerHand: [{ suit: '♣' }, { suit: '♣' }, { suit: '♣' }] };
api.applyEquippedSkinSynergy('hand_win', p3Clubs, {}, gsCombat);
check('Tope por mano respeta el límite numérico (+4)', gsCombat.status.playerShield === 4, 'shield=' + gsCombat.status.playerShield);

// Probar Paladín de la Luz con tope de Oro por combate
localStorage.setItem('bj_hero_skin_knight', 'knight_golden');
MOCK_META = { knight: { level: 1 } }; // Rango 1: +4 Oro al ganar con 20/21, máx 12 por combate (3 veces)
const gsGold = { gold: 0, _skinSynergyUsage: {} };
const pGold = { class: 'knight', playerScore: 21, playerHand: [] };

api.applyEquippedSkinSynergy('hand_win_high', pGold, {}, gsGold);
api.applyEquippedSkinSynergy('hand_win_high', pGold, {}, gsGold);
api.applyEquippedSkinSynergy('hand_win_high', pGold, {}, gsGold);
check('3 victorias con 20/21 otorgan +12 Oro', gsGold.gold === 12, 'gold=' + gsGold.gold);

const actExceed = api.applyEquippedSkinSynergy('hand_win_high', pGold, {}, gsGold);
check('4ª victoria bloqueada por tope de combate (evita exploits)', actExceed === null);
check('Oro se mantiene en el tope de 12', gsGold.gold === 12);

console.log('\n== 4. Estilos CSS de las Sinergias (Paper Mario) ==');
check('CSS define .skin-card-synergy-box', /\.skin-card-synergy-box\s*\{/.test(cssSrc));
check('CSS define .scs-suit', /\.scs-suit\s*\{/.test(cssSrc));
check('CSS define .scs-rank', /\.scs-rank\s*\{/.test(cssSrc));
check('CSS define .scs-effect', /\.scs-effect\s*\{/.test(cssSrc));

console.log('\n---------------------------------------');
console.log('RESULTADO: ' + pass + ' pass / ' + fail + ' fail');
process.exitCode = fail > 0 ? 1 : 0;
