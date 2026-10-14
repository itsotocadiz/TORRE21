/**
 * TEST: TESORO REAL — migración de la clave VIP legada, compras reales
 * y política de privacidad coherente con Google Play Billing.
 *
 * Se carga game.js con la clave VIP legada YA presente para comprobar que
 * la migración de un solo disparo funciona y que la clave desaparece.
 * El bloque de billing de improvements.js se extrae con el mismo escáner
 * que test-abyss-pacts.js para no disparar onImprovementsReady().
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

global.window = global;
global.window.addEventListener = () => {};
global.document = {
  getElementById: (id) => ({
    id,
    classList: { add: () => {}, remove: () => {}, contains: () => false },
    style: {},
    innerText: '',
    innerHTML: '',
    querySelectorAll: () => [],
    addEventListener: () => {}
  }),
  querySelectorAll: () => [],
  addEventListener: () => {},
  createElement: () => ({ style: {}, classList: { add: () => {}, remove: () => {} }, appendChild: () => {} }),
  body: { appendChild: () => {} }
};

global.localStorage = {
  _data: {},
  getItem(k) { return this._data[k] !== undefined ? this._data[k] : null; },
  setItem(k, v) { this._data[k] = String(v); },
  removeItem(k) { delete this._data[k]; },
  clear() { this._data = {}; }
};

global.Audio = class { play() {} pause() {} };
global.navigator = { vibrate: () => {} };

const root = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const gameSrc = read('js/game.js');
const impSrc = read('js/improvements.js');
const htmlSrc = read('index.html');

let pass = 0;
const ok = (msg) => { pass++; console.log('  PASS ' + msg); };

// --- PRE: instálame una cuenta con la clave VIP legada activa ---
localStorage.setItem('blackjack_vip_unlocked', 'true');

eval(gameSrc);

console.log('== 1. Migración de la clave VIP legada ==');

assert.strictEqual(localStorage.getItem('blackjack_vip_unlocked'), null,
  'La clave VIP legada debe eliminarse tras migrar');
ok('La clave blackjack_vip_unlocked ya no existe');

const perks = JSON.parse(localStorage.getItem('blackjack_royal_perks') || '{}');
['starter', 'exp_boost', 'hero_bundle'].forEach(id => {
  assert.strictEqual(perks[id], true, `El perk ${id} debe haberse migrado`);
  assert.strictEqual(isRoyalPerkOwned(id), true, `isRoyalPerkOwned(${id}) debe ser true`);
});
ok('Los 3 perks se convirtieron en datos reales de blackjack_royal_perks');

assert.strictEqual(isRoyalPerkOwned('no_existe'), false,
  'Un perk inventado no debe darse por adquirido');
ok('isRoyalPerkOwned solo responde a perks reales');

const unlocks = getHeroUnlocks();
Object.keys(unlocks).forEach(k => {
  assert.strictEqual(unlocks[k].unlocked, true, `El héroe ${k} debe quedar desbloqueado`);
});
ok('El Bundle entrega los 4 héroes desbloqueados');

console.log('== 2. Nadie mantiene el interruptor permanente ==');

assert.ok(!isRoyalPerkOwned.toString().includes('vip_unlocked'),
  'isRoyalPerkOwned no debe consultar blackjack_vip_unlocked');
assert.ok(!getHeroUnlocks.toString().includes('isVip'),
  'getHeroUnlocks no debe consultar isVip');
assert.ok(!triggerIntroFrenzy.toString().includes('isVip'),
  'triggerIntroFrenzy no debe tener atajo VIP (sin anuncio)');
assert.ok(/function\s+migrateLegacyRoyalVip\s*\(/.test(gameSrc), 'Falta migrateLegacyRoyalVip');
assert.ok(/migrateLegacyRoyalVip\(\)\s*;/.test(gameSrc), 'La migración debe ejecutarse al cargar');
ok('Sin isVip ni claves permanentes fuera de la migración');

console.log('== 3. Instalación nueva (sin clave legada) ==');

localStorage.clear();
assert.strictEqual(isRoyalPerkOwned('starter'), false,
  'Sin compra ni migración no debe haber perks');
assert.strictEqual(getHeroUnlocks().necromancer.unlocked, false,
  'Sin compra ni misión el Nigromante debe seguir bloqueado');
ok('Instalación limpia no regala nada');

grantRoyalPerk('exp_boost');
assert.strictEqual(isRoyalPerkOwned('exp_boost'), true, 'grantRoyalPerk debe activar el perk');
assert.strictEqual(isRoyalPerkOwned('hero_bundle'), false,
  'Conceder un perk no debe regalar los demás');
ok('grantRoyalPerk funciona y no regala perks vecinos');

console.log('== 4. Google Play Billing cableado ==');

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
      if (ch === '/' && next === '/') { lineComment = true; continue; }
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

eval([
  extract(impSrc, /const\s+ROYAL_PERK_SKUS\s*=\s*/),
  'let _billingPlugin = null, _billingAvailable = false, _billingPrices = {}, _billingInitPromise = null;',
  extract(impSrc, /function\s+getBillingPlugin\s*\(/),
  extract(impSrc, /function\s+isBillingAvailable\s*\(/),
  extract(impSrc, /function\s+getBillingPrice\s*\(/),
  extract(impSrc, /function\s+initBilling\s*\(/),
  extract(impSrc, /function\s+_refreshShopAfterPurchase\s*\(/),
  extract(impSrc, /function\s+purchaseRoyalPerk\s*\(/),
  'window.ROYAL_PERK_SKUS = ROYAL_PERK_SKUS;',
  'window.isBillingAvailable = isBillingAvailable;',
  'window.getBillingPrice = getBillingPrice;',
  'window.initBilling = initBilling;',
  'window.purchaseRoyalPerk = purchaseRoyalPerk;'
].join('\n\n'));

assert.ok(ROYAL_PERK_SKUS.starter === 'royal_pack_starter', 'Falta el SKU starter');
assert.ok(ROYAL_PERK_SKUS.exp_boost === 'royal_tomo_maestro', 'Falta el SKU exp_boost');
assert.ok(ROYAL_PERK_SKUS.hero_bundle === 'royal_bundle_los_jacks', 'Falta el SKU hero_bundle');
ok('initBilling / purchaseRoyalPerk / 3 SKUs presentes');

const initResult = initBilling();
assert.ok(initResult && typeof initResult.then === 'function', 'initBilling debe devolver una promesa');

initBilling().then(() => {
  assert.strictEqual(isBillingAvailable(), false,
    'Sin Capacitor nativo el billing debe quedar inactivo');
  assert.strictEqual(getBillingPrice('starter'), null,
    'Sin precio real no debe inventarse ninguno');
  ok('Degrada a "próximamente" en web (cero contenido sin cobro)');

  console.log('== 5. Política de privacidad coherente con Billing ==');

  assert.ok(htmlSrc.includes('itsotocadiz@gmail.com'), 'Falta el correo de contacto');
  assert.ok(htmlSrc.includes('screen-privacy'), 'Falta la pantalla de privacidad');
  assert.ok(!htmlSrc.includes('no integra anuncios de terceros ni compras dentro de la app'),
    'El texto antiguo que negaba las compras ya no debe existir');
  assert.ok(/Google Play Billing/.test(htmlSrc), 'Debe declarar el SDK de pagos');
  assert.ok(/compras dentro de la app/i.test(htmlSrc), 'Debe declarar las compras dentro de la app');
  ok('Privacidad: contacto, Billing y sin texto obsoleto');

  assert.ok(gameSrc.includes('_iapBuyHtml'), 'Falta _iapBuyHtml en showIAPModal');
  assert.ok(!/TALO123/.test(gameSrc + htmlSrc), 'No debe quedar TALO123 en la UI');
  ok('Modal IAP cableado y sin códigos promocionales públicos');

  console.log('---------------------------------------');
  console.log(`RESULTADO: ${pass} pass / 0 fail`);
}).catch(err => {
  console.error('FAIL:', err.message);
  process.exit(1);
});
