/* Test: AUDITORÍA DE BUFOS Y NERFEOS
   Comprueba que los efectos de Sellos, Artefactos, Bendiciones, Tiendas y
   Extras están cableados y que sus aplicaciones hacen ALGO real (no son
   cartas prometidas sin efecto). */
const fs = require('fs');

const base = 'C:/Proyectos/Juego de prueba/';
const game = fs.readFileSync(base + 'js/game.js', 'utf8');
const imp = fs.readFileSync(base + 'js/improvements.js', 'utf8');

let pass = 0;
let fail = 0;
function ok(cond, msg) {
  if (cond) { console.log('  PASS ' + msg); pass++; }
  else { console.log('  FAIL ' + msg); fail++; }
}

/* ---------- utilidades de extracción ---------- */
function extractArray(src, name) {
  const m = new RegExp('(?:const|let|var)\\s+' + name + '\\s*=\\s*\\[').exec(src);
  if (!m) return null;
  const start = src.indexOf('[', m.index);
  let depth = 0;
  for (let i = start; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') { depth--; if (depth === 0) return src.slice(start, i + 1); }
  }
  return null;
}

function extractObject(src, name) {
  const m = new RegExp('(?:const|let|var)\\s+' + name + '\\s*=\\s*\\{').exec(src);
  if (!m) return null;
  const start = src.indexOf('{', m.index);
  let depth = 0;
  for (let i = start; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) return src.slice(start, i + 1); }
  }
  return null;
}

/* Divide un array literal en sus objetos {..} de primer nivel (con scanner de
   llaves y comillas para no cortar dentro de textos). */
function splitObjects(arrayText) {
  const out = [];
  let depth = 0, start = -1, inStr = false, quote = '';
  for (let i = 0; i < arrayText.length; i++) {
    const c = arrayText[i];
    if (inStr) {
      if (c === '\\') { i++; continue; }
      if (c === quote) inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = true; quote = c; continue; }
    if (c === '{') { if (depth === 0) start = i; depth++; }
    else if (c === '}') { depth--; if (depth === 0 && start >= 0) { out.push(arrayText.slice(start, i + 1)); start = -1; } }
  }
  return out;
}

function countId(src, id) {
  const rx = new RegExp('"' + id.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + '"', 'g');
  return (src.match(rx) || []).length;
}

/* ---------- mocks rastreados ---------- */
function track(obj, writes, path) {
  if (obj === null || typeof obj !== 'object') return obj;
  return new Proxy(obj, {
    get(t, k) {
      const v = t[k];
      if (v && typeof v === 'object') return track(v, writes, path + '.' + String(k));
      return v;
    },
    set(t, k, v) { writes.push(path + '.' + String(k)); t[k] = v; return true; }
  });
}

function basePlayer() {
  return {
    hp: 50, maxHp: 60, pwr: 2, def: 1, gold: 120, potions: 2, rerolls: 1,
    level: 1, class: 'knight', playerScore: 18, enemyScore: 15,
    gem: '', gems: 0, accessory: null, accessories: [], relics: [],
    artifacts: [], perks: [], curse: '', _flags: 0, startingShield: 0
  };
}
function baseGameState() {
  return {
    gold: 120, floor: 1, killCount: 0, cryptCoins: 0, status: {
      playerShield: 0, enemyShield: 0, playerPoison: 0, enemyPoison: 0,
      playerBurn: 0, enemyBurn: 0
    },
    player: null, enemy: null, deck: [], hand: [], phase: 'combat'
  };
}

const stubs = [];
function installStubs() {
  const save = {};
  const names = ['addLog', 'updateHud', 'showGameToast', 'showGameAlert', 'showGameConfirm',
    'playButtonClickSound', 'playVictoryFanfareSound', 'getHeroMeta', 'getPlayerCryptCoins',
    'spendPlayerCryptCoins', 'addCryptCoins', 'openHeroSheet', 'renderHeroBook', 'saveGame',
    'renderDailyLoginUI', 'window', 'document', 'localStorage', 'navigator', 'gameState'];
  names.forEach(n => { save[n] = globalThis[n]; });
  const fakeStorage = (() => { const m = {}; return { getItem: k => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); }, removeItem: k => { delete m[k]; }, _m: m }; })();
  globalThis.addLog = () => {};
  globalThis.updateHud = () => {};
  globalThis.showGameToast = () => {};
  globalThis.showGameAlert = () => {};
  globalThis.showGameConfirm = () => {};
  globalThis.playButtonClickSound = () => {};
  globalThis.playVictoryFanfareSound = () => {};
  globalThis.getHeroMeta = () => ({ knight: { level: 1, masteryLevel: 1 } });
  globalThis.getPlayerCryptCoins = () => 100;
  globalThis.spendPlayerCryptCoins = () => true;
  globalThis.addCryptCoins = () => {};
  globalThis.openHeroSheet = () => {};
  globalThis.renderHeroBook = () => {};
  globalThis.saveGame = () => {};
  globalThis.renderDailyLoginUI = () => {};
  globalThis.localStorage = fakeStorage;
  globalThis.document = { getElementById: () => null, querySelector: () => null, createElement: () => ({ style: {}, classList: { add() {}, remove() {} } }) };
  globalThis.navigator = { vibrate: () => {} };
  stubs.push(() => names.forEach(n => { if (save[n] === undefined) delete globalThis[n]; else globalThis[n] = save[n]; }));
}

/* Ejecuta el código de efecto de una entrada y devuelve las escrituras. */
function runEffect(fnText, args) {
  const writes = [];
  const p = track(basePlayer(), writes, 'p');
  const gs = track(baseGameState(), writes, 'gs');
  globalThis.gameState = gs;
  gs.player = p;
  let fn = null;
  try {
    fn = eval('(' + fnText + ')');
  } catch (err) { return { writes: [], error: 'sintaxis: ' + err.message }; }
  if (typeof fn !== 'function') return { writes: [], error: 'no es función' };
  try {
    fn.apply(null, args.map(a => (a === 'p' ? p : a === 'e' ? {} : gs)));
  } catch (err) { return { writes: [], error: 'ejecución: ' + err.message }; }
  return { writes, error: null };
}

function effectText(obj, key) {
  const m = new RegExp('\\b' + key + '\\s*:').exec(obj);
  if (!m) return null;
  let s = m.index + m[0].length;
  while (s < obj.length && /\s/.test(obj[s])) s++;
  const from = obj.indexOf('{', s);
  if (from < 0 || from - s > 200) return null;
  let depth = 0, inStr = false, quote = '';
  for (let i = from; i < obj.length; i++) {
    const c = obj[i];
    if (inStr) { if (c === '\\') { i++; continue; } if (c === quote) inStr = false; continue; }
    if (c === '"' || c === "'" || c === '`') { inStr = true; quote = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return obj.slice(s, i + 1); }
  }
  return null;
}

function isEmptyEffect(text) {
  if (!text) return true;
  return /=>\s*\{\s*\}/.test(text) || /function\s*\w*\s*\(\s*\)\s*\{\s*\}/.test(text);
}

installStubs();

/* ============================================================
   1. SELLOS ARCANAOS (SEAL_ENCHANTMENTS)
   ============================================================ */
console.log('== 1. Sellos arcanos: catálogo y efectos cableados en el motor ==');
const sealsText = extractObject(game, 'SEAL_ENCHANTMENTS');
ok(!!sealsText, 'SEAL_ENCHANTMENTS existe');
let sealKeys = [];
if (sealsText) {
  sealKeys = (sealsText.match(/^\s{4}(\w+):\s*\{/gm) || []).map(s => s.trim().replace(/[:{].*$/, ''));
  ok(sealKeys.length >= 14, 'hay al menos 14 sellos (' + sealKeys.length + ')');
  const dup = sealKeys.filter((v, i) => sealKeys.indexOf(v) !== i);
  ok(dup.length === 0, 'sin sellos duplicados' + (dup.length ? ' -> ' + dup.join(',') : ''));
  sealKeys.forEach(k => {
    const idx = sealsText.indexOf('\n    ' + k + ': {');
    let end = sealsText.indexOf('\n    },', idx);
    if (end < 0) end = sealsText.length;
    const tail = sealsText.slice(idx, end);
    const price = /price:\s*(\d+)/.exec(tail);
    const desc = /desc:\s*"([^"]+)"/.exec(tail);
    ok(!!price && Number(price[1]) > 0, 'sello ' + k + ' tiene precio > 0 (' + (price ? price[1] : 'sin precio') + ')');
    ok(!!desc && desc[1].length > 10, 'sello ' + k + ' describe su efecto');
    const wired = new RegExp('sealId\\s*===\\s*"' + k + '"').test(game) ||
                  new RegExp('seal\\.type\\s*===\\s*"' + k + '"').test(game) ||
                  new RegExp('case\\s*"' + k + '"').test(game);
    ok(wired, 'sello ' + k + ' está cableado en el motor de combate');
  });
}

/* ============================================================
   2. APLICACIONES QUE DEBEN HACER ALGO REAL
   ============================================================ */
console.log('== 2. Efectos ejecutables: ninguna promesa sin efecto ==');
const catalogs = ['ALL_RELICS', 'SHOP_ARTIFACTS', 'STARTER_BLESSINGS'];
const effectKeys = ['apply', 'onApply', 'bonus'];
const wiredOnly = [];
const noEffect = [];

catalogs.forEach(cat => {
  const text = extractArray(game, cat);
  ok(!!text, cat + ' existe');
  if (!text) return;
  const entries = splitObjects(text);
  ok(entries.length > 0, cat + ' tiene entradas (' + entries.length + ')');
  let executed = 0;
  entries.forEach(entry => {
    const idM = /id:\s*"([\w-]+)"/.exec(entry);
    const id = idM ? idM[1] : null;
    if (!id) return;
    const key = effectKeys.find(k => new RegExp('\\b' + k + '\\s*:').test(entry));
    if (!key) { wiredOnly.push(cat + ':' + id); return; }
    const fnText = effectText(entry, key);
    if (isEmptyEffect(fnText)) { wiredOnly.push(cat + ':' + id); return; }
    const r = runEffect(fnText, ['p', 'e', 'gs']);
    if (r.error) { noEffect.push(id + ' (' + r.error + ')'); return; }
    if (r.writes.length === 0) { noEffect.push(id + ' (sin escrituras)'); return; }
    executed++;
  });
  ok(executed > 0, cat + ': ' + executed + ' efectos se ejecutan y modifican estado');
});
ok(noEffect.length === 0, 'ningún efecto falla o resulta vacío' + (noEffect.length ? ' -> ' + noEffect.join(', ') : ''));

/* Los efectos sin cuerpo deben estar cableados por id en el motor */
console.log('== 3. Efectos por id: cableado en el motor ==');
const notWired = wiredOnly.filter(ref => {
  const id = ref.split(':')[1];
  const inGame = countId(game, id);
  const inImp = countId(imp, id);
  return (inGame + inImp) < 2;
});
ok(wiredOnly.length > 0, 'hay efectos resueltos por id en el motor (' + wiredOnly.length + ')');
ok(notWired.length === 0, 'todos los ids sin apply están referenciados en el código' + (notWired.length ? ' -> ' + notWired.join(', ') : ''));

/* ============================================================
   4. TIENDA: precios y descuento
   ============================================================ */
console.log('== 4. Tiendas: precios válidos y cobro real ==');
function pricesOf(src, name, key) {
  const text = extractArray(src, name) || extractObject(src, name);
  if (!text) return null;
  return splitObjects(text).map(entry => {
    const id = /id:\s*"([\w-]+)"/.exec(entry);
    const price = new RegExp('\\b' + key + ':\\s*(\\d+)').exec(entry);
    return { id: id ? id[1] : null, price: price ? Number(price[1]) : null, entry };
  });
}
const priceChecks = [
  ['SHOP_ARTIFACTS', 'price'],
  ['CARD_UPGRADES', 'price'],
  ['SPECIAL_DYNAMIC_CARDS', 'cost']
];
priceChecks.forEach(([name, key]) => {
  const rows = pricesOf(game, name, key);
  if (!rows) { ok(false, name + ' existe'); return; }
  ok(rows.length > 0, name + ' tiene ' + rows.length + ' entradas con precio');
  const bad = rows.filter(r => r.price === null || r.price <= 0);
  ok(bad.length === 0, name + ': todos los precios son > 0' + (bad.length ? ' -> ' + bad.map(b => b.id).join(', ') : ''));
});

/* Vestiduras: la clásica es la inicial gratuita; el resto se paga con Criptas */
const skinsText = extractObject(game, 'HERO_SKINS') || extractArray(game, 'HERO_SKINS');
ok(!!skinsText, 'HERO_SKINS existe');
if (skinsText) {
  const skins = splitObjects(skinsText.slice(1, -1)).filter(e => /costCrypt/.test(e));
  ok(skins.length >= 12, 'hay al menos 12 vestiduras (' + skins.length + ')');
  const paid = skins.filter(e => !/id:\s*"\w+_classic"/.test(e));
  const free = paid.filter(e => { const m = /costCrypt:\s*(\d+)/.exec(e); return !m || Number(m[1]) <= 0; });
  ok(free.length === 0, 'toda vestidura no clásica tiene coste en Criptas > 0' + (free.length ? ' -> ' + paid.filter(e => free.indexOf(e) >= 0).map(e => (/id:\s*"([^"]+)"/.exec(e) || [])[1]).join(', ') : ''));
}
ok(/function\s+buyShopArtifact|function\s+purchaseCardUpgrade|function\s+buyCardUpgrade/.test(game) ||
   /spendPlayerCryptCoins\s*\(/.test(game) || /gameState\.gold\s*-=/.test(game),
   'existen funciones de compra que descuentan recursos');

/* ============================================================
   5. MEJORAS DE CARTA (CARD_UPGRADES) cableadas
   ============================================================ */
console.log('== 5. Mejoras de carta: cada mejora tiene su efecto en el motor ==');
const upgrades = pricesOf(game, 'CARD_UPGRADES', 'price');
if (upgrades) {
  const dead = upgrades.filter(u => !u.id || countId(game, u.id) + countId(imp, u.id) < 2);
  ok(dead.length === 0, 'todas las mejoras de carta están referenciadas en el motor' + (dead.length ? ' -> ' + dead.map(d => d.id).join(', ') : ''));
}

/* ============================================================
   6. EXTRAS: eventos semanales, pactos de sacrificio, perks
   ============================================================ */
console.log('== 6. Extras: eventos semanales, pactos del altar y perks ==');
const weeklyText = extractArray(imp, 'WEEKLY_EVENTS');
ok(!!weeklyText, 'WEEKLY_EVENTS existe');
if (weeklyText) {
  const entries = splitObjects(weeklyText);
  ok(entries.length === 4, 'hay 4 eventos semanales (' + entries.length + ')');
  const placeholder = entries.filter(e => /icon:\s*"X"/.test(e));
  ok(placeholder.length === 0, 'ningún evento usa el icono provisional "X"' + (placeholder.length ? ' -> ' + entries.map(e => /id:\s*"(\w+)"/.exec(e)[1]).join(', ') : ''));
  const accented = entries.filter(e => {
    const n = /name:\s*"([^"]+)"/.exec(e);
    const d = /desc:\s*"([^"]+)"/.exec(e);
    const txt = (n ? n[1] : '') + ' ' + (d ? d[1] : '');
    return /\bMAESTRIA\b|\bDRAGON\b|\bFRENESI\b|\bCRONICA\b/.test(txt);
  });
  ok(accented.length === 0, 'los textos de eventos llevan tildes' + (accented.length ? ' -> ' + accented.map(e => (/id:\s*"(\w+)"/.exec(e) || [])[1]).join(', ') : ''));
  let okBonus = 0;
  const flags = [];
  entries.forEach(e => {
    const id = /id:\s*"(\w+)"/.exec(e)[1];
    const r = runEffect(effectText(e, 'bonus'), ['p', 'e', 'gs']);
    if (!r.error && r.writes.length > 0) { okBonus++; r.writes.forEach(w => flags.push(w.replace(/^gs\./, ''))); }
  });
  ok(okBonus === entries.length, 'los 4 eventos escriben su bonus en el estado (' + okBonus + '/' + entries.length + ')');
  const unread = [];
  flags.forEach(f => {
    const key = f.split('.').pop();
    if (game.indexOf('_' + key.replace(/^_/, '')) < 0 && imp.indexOf(key) < 0 && game.indexOf(key) < 0) unread.push(key);
  });
  ok(unread.length === 0, 'los flags semanales se leen en el motor' + (unread.length ? ' -> ' + unread.join(', ') : ''));
}

const sacText = extractArray(game, 'SACRIFICE_PACTS_POOL');
if (sacText) {
  const entries = splitObjects(sacText);
  const dead = [];
  entries.forEach(e => {
    const id = /id:\s*"([\w-]+)"/.exec(e)[1];
    const r = runEffect(effectText(e, 'onApply'), ['p', 'e', 'gs']);
    if (r.error || r.writes.length === 0) dead.push(id + (r.error ? ' (' + r.error + ')' : ' (sin escrituras)'));
  });
  ok(dead.length === 0, 'los ' + entries.length + ' pactos del altar aplican su efecto real' + (dead.length ? ' -> ' + dead.join(', ') : ''));
}

/* ============================================================
   7. HONESTIDAD: ningún efecto regala contenido de pago
   ============================================================ */
console.log('== 7. Honestidad: sin contenido de pago regalado ==');
const bodies = [];
[...catalogs.map(c => extractArray(game, c) || ''), extractArray(imp, 'WEEKLY_EVENTS') || '',
  extractArray(game, 'SACRIFICE_PACTS_POOL') || ''].forEach(t => { if (t) bodies.push(...splitObjects(t)); });
const freebie = bodies.filter(b => /grantRoyalPerk|showIAP|royal_pack|royal_tomo|royal_bundle|unlockHero\(|buyHero\(/.test(b));
ok(freebie.length === 0, 'ningún efecto gratuito desbloquea perks/héroes/packs de pago' + (freebie.length ? ' -> ' + freebie.length + ' entradas' : ''));

stubs.forEach(fn => fn());

console.log('\nRESULTADO: ' + pass + ' pass / ' + fail + ' fail');
process.exit(fail ? 1 : 0);
