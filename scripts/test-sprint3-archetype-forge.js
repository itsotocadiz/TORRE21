/* Sprint 3 — Verificación de la Forja Arquetípica de Lote (solo lectura de js/game.js) */
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf8');

function scan(openIdx) {
  const openCh = src[openIdx];
  const closeCh = openCh === '{' ? '}' : ']';
  let depth = 0, j = openIdx, quote = null, lineComment = false, blockComment = false;
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
    if (ch === openCh) depth++;
    else if (ch === closeCh) { depth--; if (depth === 0) { j++; break; } }
  }
  return j;
}

function extractFunction(name) {
  const m = new RegExp('function\\s+' + name.replace(/\$/g, '\\$') + '\\s*\\(').exec(src);
  if (!m) throw new Error('Función no encontrada: ' + name);
  return src.slice(m.index, scan(src.indexOf('{', m.index)) + 1);
}

function extractDeclaration(pattern) {
  const m = pattern.exec(src);
  if (!m) throw new Error('Declaración no encontrada: ' + pattern);
  const idx = m.index + m[0].length;
  if (src[idx] !== '[' && src[idx] !== '{') {
    throw new Error('Se esperaba [ o { en: ' + pattern + ' (llegó "' + src[idx] + '")');
  }
  return src.slice(m.index, scan(idx) + 1);
}

const extracted = [
  extractDeclaration(/const\s+SUITS\s*=\s*/),
  extractDeclaration(/const\s+CARD_RANKS\s*=\s*/),
  extractDeclaration(/const\s+SEAL_ENCHANTMENTS\s*=\s*/),
  extractDeclaration(/const\s+RARITY_CONFIG\s*=\s*/),
  extractFunction('buildStandardDeck'),
  extractFunction('generateArchetypeBlessings'),
  extractFunction('showForgeResult'),
  extractFunction('closeForgeResult'),
  extractFunction('applyArchetypeBlessing'),
  'let forgeResultRedirect = null;'
].join('\n\n');

const harness = `
  const __els = {};
  function __el(id) {
    if (!__els[id]) {
      __els[id] = {
        id: id, innerHTML: '', innerText: '', _hidden: true,
        classList: {
          add: function (c) { if (c === 'hidden') __els[id]._hidden = true; },
          remove: function (c) { if (c === 'hidden') __els[id]._hidden = false; }
        }
      };
    }
    return __els[id];
  }
  const document = { getElementById: function (id) { return __el(id); } };
  let gameState = { floor: 1, player: { class: 'knight', level: 1, cardEnchantments: {} } };
  const addLog = function () {};
  const playEnchantChimeSound = function () {};
  const triggerHaptic = function () {};
  const spawnFloatingText = function () {};
  const saveMidRunState = function () { gameState.__saved = true; };
  const updateHud = function () { gameState.__hud = true; };
  const showChronicleModal = function () { showChronicleModal.__called = (showChronicleModal.__called || 0) + 1; };
  const showShopModal = function () { showShopModal.__called = (showShopModal.__called || 0) + 1; };

${extracted}

  module.exports = {
    generateArchetypeBlessings: generateArchetypeBlessings,
    applyArchetypeBlessing: applyArchetypeBlessing,
    closeForgeResult: closeForgeResult,
    buildStandardDeck: buildStandardDeck,
    SEAL_ENCHANTMENTS: SEAL_ENCHANTMENTS,
    getState: function () { return gameState; },
    setState: function (s) { gameState = s; },
    els: __els,
    showChronicleModal: showChronicleModal,
    showShopModal: showShopModal
  };
`;

const Module = require('module');
const m = new Module('sprint3-harness');
m._compile(harness, path.join(__dirname, 'sprint3-harness.js'));
const api = m.exports;

let pass = 0, fail = 0;
function check(label, cond, detail) {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail ? '  ->  ' + detail : '')); }
}

const SEAL_KEYS = Object.keys(api.SEAL_ENCHANTMENTS);

console.log('\n== 1. Generación de las 3 Bendiciones Arquetípicas ==');
let genOk = true, genDetail = '';
for (let run = 0; run < 40; run++) {
  const items = api.generateArchetypeBlessings(1, 1, false);
  if (!Array.isArray(items) || items.length !== 3) { genOk = false; genDetail = 'len=' + (items && items.length); break; }
  if (!items.every(i => i.type === 'archetype' && i.seal && i.target)) { genOk = false; genDetail = 'shape incorrecto'; break; }
}
check('40 iteraciones devuelven 3 arquetipos con seal/target', genOk, genDetail);

const sample = api.generateArchetypeBlessings(1, 1, false);
check('incluye un grupo de UN RANGO numérico',
  sample.some(i => i.target.kind === 'ranks' && i.target.ranks.length === 1 && i.target.count === 4));
check('incluye un grupo FIGURAS (J·Q·K, 12) o ASES (4)',
  sample.some(i => i.target.kind === 'ranks' &&
    ((i.target.ranks.length === 3 && i.target.count === 12) ||
     (i.target.ranks.length === 1 && i.target.ranks[0] === 'A' && i.target.count === 4))));
check('incluye un PALO completo (13 cartas)', sample.some(i => i.target.kind === 'suit' && i.target.count === 13));
check('los 3 targets son distintos', new Set(sample.map(i => i.target.title)).size === 3);
check('icono, descripción y rareza presentes', sample.every(i => !!i.icon && !!i.desc && !!i.rarityLabel));

console.log('\n== 2. OBS7: filtros por nivel de desbloqueo de sello ==');
let lvl1Ok = true;
for (let i = 0; i < 60; i++) {
  api.generateArchetypeBlessings(1, 1, false).forEach(it => { if (it.seal.unlockLevel > 1) lvl1Ok = false; });
}
check('nivel 1 nunca ofrece sellos con unlockLevel > 1', lvl1Ok);

let lvl9Ok = true;
for (let i = 0; i < 60; i++) {
  api.generateArchetypeBlessings(9, 12, false).forEach(it => {
    if (it.seal.unlockLevel > 9 || SEAL_KEYS.indexOf(it.seal.id) === -1) lvl9Ok = false;
  });
}
check('nivel 9: sellos válidos y dentro del catálogo', lvl9Ok);

const lvl1Pool = new Set();
for (let i = 0; i < 60; i++) api.generateArchetypeBlessings(1, 1, false).forEach(it => lvl1Pool.add(it.seal.id));
const lvl1Allowed = ['sharp', 'steel', 'healing', 'ignite', 'poison'];
check('nivel 1: solo pool de 5 sellos desbloqueados',
  [...lvl1Pool].every(k => lvl1Allowed.indexOf(k) !== -1),
  'pool=' + [...lvl1Pool].join(','));

console.log('\n== 3. Pity (garantía de rareza épica+) ==');
let pityOk = true;
for (let i = 0; i < 40; i++) {
  const items = api.generateArchetypeBlessings(9, 12, true);
  if (items[0].rarity !== 'epic' && items[0].rarity !== 'legendary') pityOk = false;
}
check('con pity activo el primer arquetipo es ÉPICA o LEGENDARIA (nivel 9)', pityOk);

console.log('\n== 4. Aplicación en lote ==');
api.setState({ floor: 1, player: { class: 'knight', level: 9, cardEnchantments: {} } });

const rankBlessing = api.generateArchetypeBlessings(9, 12, false)
  .find(i => i.target.kind === 'ranks' && i.target.ranks.length === 1);
const rank = rankBlessing.target.ranks[0];
let applied = api.applyArchetypeBlessing(rankBlessing, 'shop');
let ce = api.getState().player.cardEnchantments;
const rankCards = Object.keys(ce).filter(cid => cid.split('_')[1] === rank);
check('rango "' + rank + '": se encantan exactamente 4 cartas', applied === true && rankCards.length === 4, 'count=' + rankCards.length);
check('cada carta afectada lleva el sello elegido', rankCards.every(cid => ce[cid].id === rankBlessing.seal.id));
check('el resto del mazo queda intacto', Object.keys(ce).length === 4, 'total=' + Object.keys(ce).length);
check('guardado de mitad de partida + HUD', api.getState().__saved === true && api.getState().__hud === true);

api.getState().player.cardEnchantments = {};
const suitBlessing = api.generateArchetypeBlessings(9, 12, false).find(i => i.target.kind === 'suit');
applied = api.applyArchetypeBlessing(suitBlessing, 'postCombat');
ce = api.getState().player.cardEnchantments;
const suitCount = api.buildStandardDeck().filter(c => c.suit === suitBlessing.target.suit).length;
check('palo ' + suitBlessing.target.suit + ': se encantan las 13 cartas',
  applied === true && suitCount === 13 && Object.keys(ce).length === 13,
  'deck=' + suitCount + ' enchanted=' + Object.keys(ce).length);
check('las 13 cartas coinciden con el palo elegido',
  Object.keys(ce).every(cid => cid.split('_')[0] === suitBlessing.target.suit));

api.getState().player.cardEnchantments = {};
const figBlessing = api.generateArchetypeBlessings(9, 12, false)
  .find(i => i.target.kind === 'ranks' && (i.target.count === 12 || (i.target.ranks.length === 1 && i.target.ranks[0] === 'A')));
applied = api.applyArchetypeBlessing(figBlessing, 'shop');
ce = api.getState().player.cardEnchantments;
check('grupo "' + figBlessing.target.title + '": se encantan ' + figBlessing.target.count + ' cartas',
  applied === true && Object.keys(ce).length === figBlessing.target.count,
  'count=' + Object.keys(ce).length);
check('solo se encantan cartas del grupo',
  Object.keys(ce).every(cid => figBlessing.target.ranks.indexOf(cid.split('_')[1]) !== -1));

const rankCard = api.buildStandardDeck().find(c => c.rank === rank);
const targetCid = rankCard.suit + '_' + rankCard.rank;
ce[targetCid] = { id: 'oldSeal', name: 'Sello Viejo' };
api.applyArchetypeBlessing(rankBlessing, 'shop');
ce = api.getState().player.cardEnchantments;
check('sobrescribe el sello previo de la carta afectada', ce[targetCid].id === rankBlessing.seal.id, 'id=' + ce[targetCid].id);

console.log('\n== 5. Overlay de resultado y redirección ==');
check('overlay visible tras forjar', api.els['screen-forge-result']._hidden === false);
const title = api.els['forge-result-title'].innerHTML;
check('título anuncia el número de cartas encantadas', /\d+ CARTAS ENCANTADAS EN TU MAZO/.test(title), 'title=' + title);
check('descripción menciona el sello aplicado', api.els['forge-result-desc'].innerHTML.indexOf(rankBlessing.seal.name) !== -1);

api.closeForgeResult();
check('overlay se cierra al continuar', api.els['screen-forge-result']._hidden === true);
check('redirige a la Tienda cuando source=shop', (api.showShopModal.__called || 0) >= 1, 'shop=' + api.showShopModal.__called);

api.getState().player.cardEnchantments = {};
api.applyArchetypeBlessing(suitBlessing, 'postCombat');
api.closeForgeResult();
check('redirige a la Crónica cuando source=postCombat', (api.showChronicleModal.__called || 0) === 1, 'chron=' + api.showChronicleModal.__called);

console.log('\n---------------------------------------');
console.log('RESULTADO: ' + pass + ' pass / ' + fail + ' fail');
if (fail > 0) process.exitCode = 1;
