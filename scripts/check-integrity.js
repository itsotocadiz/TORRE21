/* Auditoría de integridad del proyecto.
   Detecta: IDs de DOM referenciados inexistentes, assets rotos,
   dependencias de localStorage sin try/catch y globals huérfanos.
   Uso: node scripts/check-integrity.js */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(rootDir, p), 'utf8');

const gameSrc = read('js/game.js');
const impSrc = read('js/improvements.js');
const htmlSrc = read('index.html');
const jsSrc = gameSrc + '\n' + impSrc;

let errors = 0;
let warnings = 0;
const fail = (m) => { errors++; console.log('  ✗ ' + m); };
const warn = (m) => { warnings++; console.log('  ! ' + m); };
const ok = (m) => console.log('  ✓ ' + m);

/* ---------- 1. Assets referenciados que no existen ---------- */
console.log('\n== 1. Assets referenciados ==');
const assetRefs = new Set();
for (const m of jsSrc.matchAll(/["'(](assets\/[\w\-./]+\.(?:jpg|jpeg|png|webp|gif|svg))/g)) assetRefs.add(m[1]);
for (const m of htmlSrc.matchAll(/["'(](assets\/[\w\-./]+\.(?:jpg|jpeg|png|webp|gif|svg))/g)) assetRefs.add(m[1]);
let missingAssets = 0;
for (const a of [...assetRefs].sort()) {
  if (!fs.existsSync(path.join(rootDir, a))) { fail(`Asset inexistente: ${a}`); missingAssets++; }
}
if (!missingAssets) ok(`${assetRefs.size} assets referenciados existen todos`);

/* ---------- 2. IDs de DOM referenciados inexistentes ---------- */
console.log('\n== 2. IDs de DOM (getElementById vs index.html) ==');
const htmlIds = new Set([...htmlSrc.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
const dynamicIds = new Set([...jsSrc.matchAll(/\bid\s*=\s*["']([^"'\s]+)["']/g)].map((m) => m[1]));
// IDs que JS construye en tiempo de ejecución (plantillas / argumentos de render)
for (const m of jsSrc.matchAll(/\brenderHandDeckFan\s*\([^,]+,\s*["']([\w-]+)["']/g)) dynamicIds.add(m[1]);
for (const id of dynamicIds) htmlIds.add(id);
const referencedIds = new Set([...jsSrc.matchAll(/getElementById\(\s*["']([^"']+)["']\s*\)/g)].map((m) => m[1]));
const missingIds = [...referencedIds].filter((id) => !htmlIds.has(id)).sort();
if (missingIds.length) {
  for (const id of missingIds) warn(`ID referenciado sin nodo en index.html ni en JS: #${id}`);
} else ok(`Todos los ${referencedIds.size} IDs referenciados existen (HTML o creados en JS)`);

/* ---------- 3. querySelector a IDs inexistentes ---------- */
console.log('\n== 3. querySelector("#...") ==');
const qsIds = new Set([...jsSrc.matchAll(/querySelector\(\s*["']#([\w-]+)["']\s*\)/g)].map((m) => m[1]));
const missingQs = [...qsIds].filter((id) => !htmlIds.has(id)).sort();
if (missingQs.length) for (const id of missingQs) warn(`querySelector a ID inexistente: #${id}`);
else ok('Todos los querySelector(#) existen');

/* ---------- 4. JSON.parse sin protección ---------- */
console.log('\n== 4. JSON.parse sin try/catch ==');
const unprotected = [];
for (const [file, src] of [['js/game.js', gameSrc], ['js/improvements.js', impSrc]]) {
  const srcLines = src.split('\n');
  let inBlockComment = false;
  srcLines.forEach((line, i) => {
    let code = line;
    if (inBlockComment) {
      const end = code.indexOf('*/');
      if (end === -1) return;
      code = code.slice(end + 2);
      inBlockComment = false;
    }
    const open = code.indexOf('/*');
    if (open !== -1 && code.indexOf('*/', open) === -1) {
      inBlockComment = true;
      code = code.slice(0, open);
    }
    if (!/JSON\.parse\(/.test(code)) return;
    if (/\btry\b/.test(code)) return;
    // Mira hacia atrás: si hay un 'try {' abierto sin 'catch' intermedio, está protegido.
    let protectedLine = null;
    for (let j = i - 1; j >= Math.max(0, i - 60); j--) {
      const prev = srcLines[j];
      if (/\b(catch|finally)\b/.test(prev)) break;
      if (/\btry\b/.test(prev)) { protectedLine = j + 1; break; }
    }
    if (protectedLine === null) unprotected.push(`${file}:${i + 1}`);
  });
}
if (unprotected.length) {
  warn(`${unprotected.length} JSON.parse aparentemente sin try`);
  for (const loc of unprotected) console.log(`      ${loc}`);
} else ok('Todo JSON.parse está dentro de un bloque try');

/* ---------- 5. console.log/debug en producción ---------- */
console.log('\n== 5. Depuración ==');
const debugCalls = [...jsSrc.matchAll(/\bconsole\.(log|debug|dir)\(/g)].length;
if (debugCalls) warn(`${debugCalls} console.log/debug presentes`);
else ok('Sin console.log/debug');

/* ---------- 6. Alert / confirm nativos ---------- */
console.log('\n== 6. Diálogos nativos bloqueantes ==');
const alerts = [...jsSrc.matchAll(/\balert\(/g)].length;
const confirms = [...jsSrc.matchAll(/\bconfirm\(/g)].length;
if (alerts || confirms) warn(`${alerts} alert() y ${confirms} confirm() nativos`);
else ok('Sin alert/confirm nativos');

/* ---------- 7. Precios en UI sin Billing ---------- */
console.log('\n== 7. Monetización ==');
const billing = /play[-_]?billing|BillingClient|capacitor-billing/i.test(
  (fs.existsSync(path.join(rootDir, 'package.json')) ? fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8') : '')
);
if (!billing) warn('Sin plugin de Google Play Billing en package.json');
const hasPrivacy = /privacy|privacidad|politica-de-privacidad/i.test(htmlSrc + jsSrc);
if (!hasPrivacy) fail('Sin política de privacidad referenciada en la app');
const promoCode = /TALO123/.test(htmlSrc);
if (promoCode) fail('Código promocional TALO123 visible en index.html (UI pública)');

/* ---------- 8. Sincronización de copias ---------- */
console.log('\n== 8. Copias sincronizadas ==');
const crypto = require('crypto');
const md5 = (f) => crypto.createHash('md5').update(fs.readFileSync(f)).digest('hex');
for (const rel of ['index.html', 'js/game.js', 'js/improvements.js', 'css/style.css']) {
  const src = path.join(rootDir, rel);
  for (const base of [path.join(rootDir, 'www'), path.join(rootDir, 'android', 'app', 'src', 'main', 'assets', 'public')]) {
    const dest = path.join(base, rel);
    const label = path.relative(rootDir, dest).replace(/\\/g, '/');
    if (!fs.existsSync(dest)) fail(`Copia ausente: ${label}`);
    else if (md5(dest) !== md5(src)) fail(`Copia desfasada: ${label}`);
  }
}
console.log('');

console.log(`RESULTADO: ${errors} error(es), ${warnings} advertencia(s)`);
process.exit(errors ? 1 : 0);
