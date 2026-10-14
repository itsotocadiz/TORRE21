/* Fase 4.1 — Recompensa diaria de conexión: anti-farmeo, racha y honestidad del pago */
const fs = require('fs');
const path = require('path');
const Module = require('module');

const impSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'improvements.js'), 'utf8');
const htmlSrc = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const START = impSrc.indexOf('const DAILY_LOGIN_KEY');
const END_MARK = 'window.notifyDailyLoginReward = notifyDailyLoginReward;';
const END = impSrc.indexOf(END_MARK);
if (START < 0 || END < 0) { console.error('FAIL: bloque de login diario no encontrado'); process.exit(1); }
const block = impSrc.slice(START, END + END_MARK.length);

const RealDate = Date;
let MOCK_NOW = null;
class MockDate extends RealDate {
  constructor(...a) { if (a.length === 0) super(MOCK_NOW || RealDate.now()); else super(...a); }
  static now() { return MOCK_NOW || RealDate.now(); }
}
global.Date = MockDate;

function pad(n) { return (n < 10 ? '0' : '') + n; }
function stamp(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
const TODAY = new RealDate(2026, 9, 7, 12, 0, 0);
const S_TODAY = stamp(TODAY);
const S_YESTERDAY = stamp(new RealDate(2026, 9, 6, 12, 0, 0));
const S_OLD = stamp(new RealDate(2026, 9, 1, 12, 0, 0));

/* --- stubs de entorno --- */
if (typeof global.window === 'undefined') global.window = global;
const store = {};
global.localStorage = global.localStorage || {
  _data: store,
  getItem(k) { return this._data[k] !== undefined ? this._data[k] : null; },
  setItem(k, v) { this._data[k] = String(v); },
  removeItem(k) { delete this._data[k]; }
};
let granted = 0;
let lastGrant = null;
global.addCryptCoins = (amount) => { granted += amount; lastGrant = amount; return granted; };
global.updateCryptCoinUI = () => {};
global.showGameToast = () => {};
global.showGameAlert = () => {};
global.document = { getElementById: () => null };

const harness = `
${block}
module.exports = {
  DAILY_LOGIN_KEY: DAILY_LOGIN_KEY,
  DAILY_LOGIN_REWARDS: DAILY_LOGIN_REWARDS,
  DAILY_LOGIN_MAX_STREAK: DAILY_LOGIN_MAX_STREAK,
  readDailyLoginState: readDailyLoginState,
  claimDailyLoginReward: claimDailyLoginReward,
  notifyDailyLoginReward: notifyDailyLoginReward
};
`;
const m = new Module('daily-login-harness');
m._compile(harness, path.join(__dirname, 'daily-login-harness.js'));
const api = m.exports;

let pass = 0, fail = 0;
function check(label, cond, detail) {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail ? '  ->  ' + detail : '')); }
}
function reset(st) {
  store[api.DAILY_LOGIN_KEY] = st === undefined ? undefined : JSON.stringify(st);
  if (st === undefined) delete store[api.DAILY_LOGIN_KEY];
  granted = 0; lastGrant = null;
}

console.log('\n== 1. Tabla de recompensas (7 días, progresión, tope bajo) ==');
const R = api.DAILY_LOGIN_REWARDS;
check('clave de almacenamiento única', api.DAILY_LOGIN_KEY === 'bj_daily_login', api.DAILY_LOGIN_KEY);
check('7 recompensas (racha semanal)', R.length === 7, 'n=' + R.length);
check('MAX_STREAK coherente con la tabla', api.DAILY_LOGIN_MAX_STREAK === R.length);
check('todas enteras y positivas', R.every(v => Number.isInteger(v) && v > 0), JSON.stringify(R));
check('monótona no decreciente', R.every((v, i) => i === 0 || v >= R[i - 1]), JSON.stringify(R));
check('progresión estricta (cada día paga más)', R.every((v, i) => i === 0 || v > R[i - 1]), JSON.stringify(R));
check('tope por día ≤ 10', Math.max.apply(null, R) <= 10, 'max=' + Math.max.apply(null, R));
check('semana completa ≤ 40 (una Torre da 100)', R.reduce((a, b) => a + b, 0) <= 40, 'suma=' + R.reduce((a, b) => a + b, 0));
check('día 7 ≤ 15 (un Pacto de la Cripta Suprema da 15)', R[6] <= 15, 'd7=' + R[6]);

console.log('\n== 2. Anti-farmeo: una sola recompensa por día calendario ==');
MOCK_NOW = TODAY.getTime();
reset(undefined);
let r = api.claimDailyLoginReward();
check('primera conexión da día 1', r && r.streak === 1 && r.amount === R[0], JSON.stringify(r));
check('otorga exactamente la recompensa del día', lastGrant === R[0], 'grant=' + lastGrant);
check('persiste el sello del día', JSON.parse(store[api.DAILY_LOGIN_KEY]).last === S_TODAY);
r = api.claimDailyLoginReward();
check('segunda apertura el MISMO día devuelve null', r === null, JSON.stringify(r));
check('no se ha añadido nada extra', granted === R[0], 'total=' + granted);

console.log('\n== 3. Racha: continúa, reinicia y se atasca en 7 ==');
reset({ last: S_YESTERDAY, streak: 1 });
r = api.claimDailyLoginReward();
check('ayer reclamado → racha 2', r && r.streak === 2, JSON.stringify(r));
check('día 2 paga 3', lastGrant === R[1], 'grant=' + lastGrant);

reset({ last: S_OLD, streak: 5 });
r = api.claimDailyLoginReward();
check('hueco de varios días → racha vuelve a 1', r && r.streak === 1, JSON.stringify(r));
check('paga el mínimo del día 1', lastGrant === R[0], 'grant=' + lastGrant);

reset({ last: S_YESTERDAY, streak: 6 });
r = api.claimDailyLoginReward();
check('racha 6 → 7 (día máximo)', r && r.streak === 7, JSON.stringify(r));
check('día 7 paga el tope', lastGrant === R[6], 'grant=' + lastGrant);

reset({ last: S_YESTERDAY, streak: 99 });
r = api.claimDailyLoginReward();
check('estado corrupto se atasca en 7', r && r.streak === 7, JSON.stringify(r));
check('el tope evita pagar por encima de la tabla', lastGrant === R[6], 'grant=' + lastGrant);

console.log('\n== 4. Robustez del estado guardado ==');
store[api.DAILY_LOGIN_KEY] = '{corrupto';
check('JSON corrupto → estado por defecto (sin crash)',
  api.readDailyLoginState().last === null && api.readDailyLoginState().streak === 0);
reset({ last: 12345, streak: 'x' });
const bad = api.readDailyLoginState();
check('campos con tipos erróneos → null/0', bad.last === null && bad.streak === 0, JSON.stringify(bad));

console.log('\n== 5. Honestidad del pago: solo criptas, nunca contenido de pago ==');
reset(undefined);
api.claimDailyLoginReward();
check('solo llama a addCryptCoins (moneda de juego)', lastGrant !== null);
check('el bloque no menciona perks/royal/heroes/skins',
  !/grantRoyalPerk|ROYAL_PERK|unlockHero|unlockSkin|addRoyalPerk/i.test(block),
  (block.match(/grantRoyalPerk|ROYAL_PERK|unlockHero|unlockSkin|addRoyalPerk/i) || []).join(','));
check('el bloque no llama a showGameIAP ni a compras',
  !/showGameIAP|purchase\(|buy\(|capacitor-billing/i.test(block));
check('sin alert()/confirm() nativos en el bloque',
  !/(^|[^.\w])alert\s*\(|(^|[^.\w])confirm\s*\(/.test(block));
check('usa showGameAlert/showGameToast (diálogos in-app)',
  /showGameAlert\s*\(/.test(block) && /showGameToast\s*\(/.test(block));
check('el bloque no toca otras claves de localStorage',
  (block.match(/localStorage\.setItem\(/g) || []).length === 1);
check('no usa sessionStorage ni cookies', !/sessionStorage|document\.cookie/.test(block));

console.log('\n== 6. Cableado en el arranque y control de doble aviso ==');
check('onImprovementsReady llama a notifyDailyLoginReward',
  /function\s+onImprovementsReady\s*\([\s\S]*?notifyDailyLoginReward\(\)/.test(impSrc));
check('notifyDailyLoginReward solo dispara una vez (guardia)', /if\s*\(\s*_dailyLoginNotified\s*\)\s*return;/.test(block));
check('espera a que exista pantalla antes de avisar', /screen-title/.test(block) && /screen-intro/.test(block));
check('la recompensa se reclama al arrancar, no al pulsar un botón',
  /const reward = claimDailyLoginReward\(\);/.test(block));
check('index.html define screen-intro y screen-title',
  htmlSrc.indexOf('id="screen-intro"') !== -1 && htmlSrc.indexOf('id="screen-title"') !== -1);

console.log('\n---------------------------------------');
console.log('RESULTADO: ' + pass + ' pass / ' + fail + ' fail');
MOCK_NOW = null;
global.Date = RealDate;
process.exitCode = fail > 0 ? 1 : 0;
