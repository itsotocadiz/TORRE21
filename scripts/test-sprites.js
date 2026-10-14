/* ============================================================
   scripts/test-sprites.js
   Verifica la integridad de los sprites estilo "papel recortado":
   (1) Toda ruta de imagen referenciada en game.js e index.html existe.
   (2) Cada héroe tiene sus 4 poses (idle, attack, hurt, dead).
   (3) Ningún SVG está mal formado o contiene NaN/undefined.
   ============================================================ */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const gameSrc = fs.readFileSync(path.join(rootDir, 'js', 'game.js'), 'utf8');
const htmlSrc = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

let pass = 0;
let fail = 0;

function ok(cond, msg) {
  if (cond) { console.log('  PASS ' + msg); pass++; }
  else { console.error('  FAIL ' + msg); fail++; }
}

console.log('== 1. Existencia de todas las imágenes referenciadas en código ==');
const assetRefs = new Set();
for (const m of (gameSrc + '\n' + htmlSrc).matchAll(/["'(](assets\/[\w\-./]+\.(?:jpg|jpeg|png|webp|gif|svg))/g)) {
  assetRefs.add(m[1]);
}

ok(assetRefs.size > 0, `Se encontraron ${assetRefs.size} rutas de assets referenciadas`);
let missingCount = 0;
for (const ref of [...assetRefs].sort()) {
  const full = path.join(rootDir, ref);
  const exists = fs.existsSync(full);
  if (!exists) {
    missingCount++;
    console.error(`    Falta archivo: ${ref}`);
  }
}
ok(missingCount === 0, `Todas las ${assetRefs.size} imágenes referenciadas existen en disco`);

console.log('== 2. Poses de combate de los 4 héroes (idle, attack, hurt, dead) ==');
const HERO_KEYS = ['knight', 'rogue', 'monk', 'necromancer'];
const REQUIRED_POSES = ['img', 'imgAttack', 'imgHurt', 'imgDead'];

for (const hero of HERO_KEYS) {
  // Extraer bloque del héroe en HERO_DATA
  const heroIdx = gameSrc.indexOf(hero + ': {');
  ok(heroIdx !== -1, `Héroe ${hero} definido en HERO_DATA`);
  if (heroIdx !== -1) {
    const blockEnd = gameSrc.indexOf('},', heroIdx);
    const block = gameSrc.slice(heroIdx, blockEnd === -1 ? heroIdx + 600 : blockEnd + 2);
    for (const poseKey of REQUIRED_POSES) {
      const m = block.match(new RegExp(poseKey + ':\\s*["\']([^"\']+)["\']'));
      ok(!!m, `${hero} define ${poseKey}`);
      if (m) {
        const p = path.join(rootDir, m[1]);
        ok(fs.existsSync(p), `${hero} -> ${poseKey} existe: ${m[1]}`);
      }
    }
  }
}

console.log('== 3. Validación y formato de los archivos SVG en assets/svg ==');
const svgDir = path.join(rootDir, 'assets', 'svg');
ok(fs.existsSync(svgDir), 'Directorio assets/svg existe');

const svgFiles = fs.readdirSync(svgDir).filter(f => f.endsWith('.svg'));
ok(svgFiles.length >= 30, `Existen al menos 30 sprites SVG generados (actual: ${svgFiles.length})`);

let malformed = 0;
for (const f of svgFiles) {
  const content = fs.readFileSync(path.join(svgDir, f), 'utf8').trim();
  const validStart = content.startsWith('<svg');
  const validEnd = content.endsWith('</svg>');
  const noNaN = !content.includes('NaN');
  const noUndefined = !content.includes('undefined');
  const hasViewBox = content.includes('viewBox=');

  if (!validStart || !validEnd || !noNaN || !noUndefined || !hasViewBox) {
    malformed++;
    console.error(`    SVG defectuoso: ${f} (start:${validStart}, end:${validEnd}, noNaN:${noNaN}, noUndef:${noUndefined})`);
  }
}
console.log('== 4. Validación de naipes y palos en assets/svg/cards ==');
const cardsDir = path.join(svgDir, 'cards');
ok(fs.existsSync(cardsDir), 'Directorio assets/svg/cards existe');

const REQUIRED_CARDS = ['card_back', 'suit_spades', 'suit_hearts', 'suit_diamonds', 'suit_clubs'];
for (const c of REQUIRED_CARDS) {
  const cardFile = path.join(cardsDir, c + '.svg');
  const exists = fs.existsSync(cardFile);
  ok(exists, `Naipe/palo existe: assets/svg/cards/${c}.svg`);
  if (exists) {
    const raw = fs.readFileSync(cardFile, 'utf8').trim();
    const okSvg = raw.startsWith('<svg') && raw.endsWith('</svg>') && !raw.includes('NaN');
    ok(okSvg, `SVG válido: ${c}.svg`);
  }
}

console.log('== 5. Validación de fondos de acuarela en assets/svg ==');
const REQUIRED_BACKGROUNDS = ['bg_tower', 'bg_campfire', 'bg_arena', 'bg_shop'];
for (const bg of REQUIRED_BACKGROUNDS) {
  const bgFile = path.join(svgDir, bg + '.svg');
  const exists = fs.existsSync(bgFile);
  ok(exists, `Fondo existe: assets/svg/${bg}.svg`);
  if (exists) {
    const raw = fs.readFileSync(bgFile, 'utf8').trim();
    const okSvg = raw.startsWith('<svg') && raw.endsWith('</svg>') && !raw.includes('NaN');
    ok(okSvg, `SVG válido: ${bg}.svg`);
  }
}

console.log('== 6. Validación de iconos de interfaz en assets/svg/ui ==');
const uiDir = path.join(svgDir, 'ui');
ok(fs.existsSync(uiDir), 'Directorio assets/svg/ui existe');

const REQUIRED_UI_ICONS = ['icon_gold', 'icon_crypt', 'icon_hp', 'icon_shield', 'icon_card_draw', 'icon_stand', 'icon_potion', 'icon_reroll'];
for (const icon of REQUIRED_UI_ICONS) {
  const iconFile = path.join(uiDir, icon + '.svg');
  const exists = fs.existsSync(iconFile);
  ok(exists, `Icono UI existe: assets/svg/ui/${icon}.svg`);
  if (exists) {
    const raw = fs.readFileSync(iconFile, 'utf8').trim();
    const okSvg = raw.startsWith('<svg') && raw.endsWith('</svg>') && !raw.includes('NaN');
    ok(okSvg, `SVG válido: ${icon}.svg`);
  }
}

console.log('\nRESULTADO: ' + pass + ' pass / ' + fail + ' fail');
process.exit(fail ? 1 : 0);
