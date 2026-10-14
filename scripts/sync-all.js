/* Sincroniza la fuente única de verdad (raíz) hacia www/ y android/public/,
   y verifica con MD5 que las 3 copias son idénticas.
   Uso: node scripts/sync-all.js [--check] */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..');
const wwwDir = path.join(rootDir, 'www');
const androidDir = path.join(rootDir, 'android', 'app', 'src', 'main', 'assets', 'public');

const STATIC_FILES = ['index.html', 'js/game.js', 'js/improvements.js', 'css/style.css'];

function walkAssets(dir, base) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) out.push(...walkAssets(abs, rel));
    else out.push(rel);
  }
  return out;
}

const ASSET_FILES = walkAssets(path.join(rootDir, 'assets'), 'assets').map(p => p.replace(/\\/g, '/'));
const FILES = STATIC_FILES.concat(ASSET_FILES);

const checkOnly = process.argv.includes('--check');

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function md5(file) {
  return crypto.createHash('md5').update(fs.readFileSync(file)).digest('hex');
}

function relTargets(rel) {
  return [path.join(wwwDir, rel), path.join(androidDir, rel)];
}

let errors = 0;
let copied = 0;

for (const rel of FILES) {
  const src = path.join(rootDir, rel);
  if (!fs.existsSync(src)) {
    console.log(`✗ FALTA fuente: ${rel}`);
    errors++;
    continue;
  }
  for (const dest of relTargets(rel)) {
    if (checkOnly) continue;
    if (!fs.existsSync(dest) || md5(dest) !== md5(src)) {
      copyFile(src, dest);
      copied++;
    }
  }
}

console.log(checkOnly ? '[SYNC --check] Verificando copias...' : `[SYNC] ${copied} archivo(s) copiado(s).`);

for (const rel of FILES) {
  const src = path.join(rootDir, rel);
  if (!fs.existsSync(src)) continue;
  const srcHash = md5(src);
  for (const dest of relTargets(rel)) {
    const label = path.relative(rootDir, dest).replace(/\\/g, '/');
    if (!fs.existsSync(dest)) {
      console.log(`✗ DESFASE  ${rel} -> ${label} (no existe)`);
      errors++;
    } else if (md5(dest) !== srcHash) {
      console.log(`✗ DESFASE  ${rel} -> ${label}`);
      errors++;
    } else {
      console.log(`✓ OK       ${label}`);
    }
  }
}

if (errors) {
  console.log(`\n[SYNC] ${errors} discrepancia(s). Ejecuta: npm run sync`);
  process.exit(1);
}
console.log('\n[SYNC] Las 3 copias son idénticas. ✓');
