/* Sprint 5 — Botón 📊 FICHA en la tarjeta + Grimorio con lore gateado por Nivel Permanente */
const fs = require('fs');
const path = require('path');

const gameSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf8');
const htmlSrc = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const cssSrc = fs.readFileSync(path.join(__dirname, '..', 'css', 'style.css'), 'utf8');

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
  'const HERO_SHEET_LORE_LEVELS = [1, 3, 6, 9];',
  extract(gameSrc, /function\s+openHeroSheet\s*\(/),
  extract(gameSrc, /function\s+closeHeroSheet\s*\(/)
].join('\n\n');

const harness = `
const HERO_DATA = {
  knight: { name: 'Caballero', title: 'El Jack de Diamantes', class: 'knight', img: 'x.jpg', sprite: 'X', maxHp: 90, pwr: 2, def: 3, desc: 'Pasiva de prueba.', startingShield: 5 }
};
const HERO_LORES = { knight: { 1: 'Cap 1', 2: 'x', 3: 'Cap 3', 4: 'x', 5: 'x', 6: 'Cap 6', 7: 'x', 8: 'x', 9: 'Cap 9' } };
let __level = 1;
const getHeroMeta = () => ({ knight: { level: __level, exp: 0, totalExp: 0, legacyPoints: 0, legacyHp: 0, legacyPwr: 0, legacyDef: 0, baseMaxHp: null, basePwr: null, baseDef: null, prestigeTrophies: 0 } });
const getHeroUnlocks = () => ({ knight: { unlocked: true, progress: 1, target: 1, missionText: 'Mision' } });
const getMasteryBonuses = () => ({ hp: 0, pwr: 0, def: 0 });
const getExpRequiredForLevel = (l) => l * 150;
const playButtonClickSound = () => {};

${extracted}

module.exports = {
  HERO_SHEET_LORE_LEVELS: HERO_SHEET_LORE_LEVELS,
  openHeroSheet: openHeroSheet,
  closeHeroSheet: closeHeroSheet,
  setLevel: (v) => { __level = v; }
};
`;

const Module = require('module');
const m = new Module('sprint5-harness');
m._compile(harness, path.join(__dirname, 'sprint5-harness.js'));
const api = m.exports;

let pass = 0, fail = 0;
function check(label, cond, detail) {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail ? '  ->  ' + detail : '')); }
}

const bodyEl = { innerHTML: '', title: '' };
const titleEl = { innerHTML: '', title: '' };
const sheetEl = { classList: { add() {}, remove() {} } };
global.document = {
  getElementById(id) {
    if (id === 'hero-sheet-body') return bodyEl;
    if (id === 'hero-sheet-title') return titleEl;
    if (id === 'screen-hero-sheet') return sheetEl;
    return null;
  }
};

console.log('\n== 1. Estructura (game.js / index.html / css) ==');
check('game.js define function openHeroSheet(heroKey)', /function\s+openHeroSheet\s*\(\s*heroKey\s*\)/.test(gameSrc));
check('game.js exporta window.openHeroSheet', /window\.openHeroSheet\s*=\s*openHeroSheet/.test(gameSrc));
check('game.js define function closeHeroSheet()', /function\s+closeHeroSheet\s*\(\s*\)/.test(gameSrc));
check('game.js exporta window.closeHeroSheet', /window\.closeHeroSheet\s*=\s*closeHeroSheet/.test(gameSrc));
check('levels de lore = [1,3,6,9]', /HERO_SHEET_LORE_LEVELS\s*=\s*\[\s*1\s*,\s*3\s*,\s*6\s*,\s*9\s*\]/.test(gameSrc));
check('tarjeta renderiza botón 📊 FICHA COMPLETA', /hero-book-sheet-btn/.test(gameSrc));
check('el botón corta la propagación', /event\.stopPropagation\(\);\s*openHeroSheet\(/.test(gameSrc));
check('onHeroCardClick sigue arrancando la partida (startGame)', /function\s+onHeroCardClick[\s\S]{0,260}startGame\(\s*heroKey\s*\)/.test(gameSrc));
check('index.html tiene overlay #screen-hero-sheet', /id="screen-hero-sheet"/.test(htmlSrc));
check('index.html tiene #hero-sheet-body', /id="hero-sheet-body"/.test(htmlSrc));
check('index.html tiene #hero-sheet-title', /id="hero-sheet-title"/.test(htmlSrc));
check('css define .hero-book-sheet-btn', /\.hero-book-sheet-btn\s*\{/.test(cssSrc));
check('css define .hero-sheet-card', /\.hero-sheet-card\s*\{/.test(cssSrc));
check('css define .hero-sheet-lore-item', /\.hero-sheet-lore-item\s*\{/.test(cssSrc));
check('overlay cierra con closeHeroSheet()', /onclick="closeHeroSheet\(\)"/.test(htmlSrc));

console.log('\n== 2. openHeroSheet renderiza la ficha ==');
api.setLevel(1);
api.openHeroSheet('knight');
const htmlL1 = bodyEl.innerHTML;
check('contiene sección NIVEL PERMANENTE', /NIVEL PERMANENTE/.test(htmlL1));
check('contiene sección ESTADÍSTICAS DE COMBATE', /ESTADÍSTICAS DE COMBATE/.test(htmlL1));
check('contiene PASIVA DE CLASE', /PASIVA DE CLASE/.test(htmlL1));
check('contiene GRIMORIO', /GRIMORIO/.test(htmlL1));
check('muestra HP/PWR/DEF con Base y Legado', /SALUD/.test(htmlL1) && /PODER/.test(htmlL1) && /BASTIÓN/.test(htmlL1));
check('título del modal actualizado', /CABALLERO/.test(titleEl.innerHTML));

console.log('\n== 3. Gateo de capítulos por Nivel Permanente ==');
const countLocked = (s) => (s.match(/hero-sheet-lore-item locked/g) || []).length;
const countUnlocked = (s) => (s.match(/hero-sheet-lore-item unlocked/g) || []).length;

api.setLevel(1); api.openHeroSheet('knight');
check('nivel 1 -> 1 capítulo revelado', countUnlocked(bodyEl.innerHTML) === 1, 'unlocked=' + countUnlocked(bodyEl.innerHTML));
check('nivel 1 -> 3 capítulos bloqueados', countLocked(bodyEl.innerHTML) === 3, 'locked=' + countLocked(bodyEl.innerHTML));
check('texto de bloqueo indica el nivel requerido', /alcanza el Nivel Permanente 3/.test(bodyEl.innerHTML));

api.setLevel(3); api.openHeroSheet('knight');
check('nivel 3 -> 2 capítulos revelados', countUnlocked(bodyEl.innerHTML) === 2, 'unlocked=' + countUnlocked(bodyEl.innerHTML));

api.setLevel(6); api.openHeroSheet('knight');
check('nivel 6 -> 3 capítulos revelados', countUnlocked(bodyEl.innerHTML) === 3, 'unlocked=' + countUnlocked(bodyEl.innerHTML));

api.setLevel(9); api.openHeroSheet('knight');
check('nivel 9 -> 4 capítulos revelados (todos)', countUnlocked(bodyEl.innerHTML) === 4, 'unlocked=' + countUnlocked(bodyEl.innerHTML));
check('nivel 9 -> 0 bloqueados', countLocked(bodyEl.innerHTML) === 0, 'locked=' + countLocked(bodyEl.innerHTML));
check('contador de revelados 4 / 4', /4 \/ 4 revelados/.test(bodyEl.innerHTML));

console.log('\n== 4. closeHeroSheet ==');
let closed = false;
sheetEl.classList = { add(c) { if (c === 'hidden') closed = true; }, remove() {} };
api.closeHeroSheet();
check('closeHeroSheet oculta el overlay', closed);

console.log('\n== Resultado: ' + pass + ' pass / ' + fail + ' fail ==');
process.exit(fail ? 1 : 0);
