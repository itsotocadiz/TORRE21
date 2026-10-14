/* Test: catálogos con `apply: () => {}` deben tener su efecto cableado por id.
   Evita artículos que prometen en su descripción pero no hacen nada. */
const fs = require('fs');

const base = 'C:/Proyectos/Juego de prueba/';
const gamePath = base + 'js/game.js';
const impPath = base + 'js/improvements.js';

const game = fs.readFileSync(gamePath, 'utf8');
const imp = fs.readFileSync(impPath, 'utf8');
const gameLines = game.split('\n');
const impLines = imp.split('\n');

let pass = 0;
let fail = 0;
function ok(cond, msg) {
  if (cond) { console.log('  PASS ' + msg); pass++; }
  else { console.log('  FAIL ' + msg); fail++; }
}

const EMPTY = /apply:\s*\(\s*\)\s*=>\s*\{\s*\}/;

function ownerEntry(idx) {
  for (let j = idx; j >= 0; j--) {
    const m = gameLines[j].match(/^\s+id:\s*"([\w-]+)"/);
    if (m) return m[1];
  }
  return null;
}

console.log('== Artículos con apply vacío cableados por id ==');
const dead = [];
let emptyCount = 0;
gameLines.forEach((line, i) => {
  if (!EMPTY.test(line)) return;
  emptyCount++;
  const id = ownerEntry(i);
  ok(!!id, 'apply vacío en línea ' + (i + 1) + ' tiene id propietario');
  if (!id) return;
  const rx = new RegExp('\\b' + id + '\\b');
  const decl = gameLines.findIndex(x => x.indexOf('id: "' + id + '"') !== -1);
  let used = false;
  gameLines.forEach((l, k) => { if (k !== decl && rx.test(l)) used = true; });
  impLines.forEach(l => { if (rx.test(l)) used = true; });
  if (!used) dead.push(id);
});
console.log('  (hay ' + emptyCount + ' entradas con apply vacío)');
ok(dead.length === 0, 'ningún artículo con apply vacío queda sin efecto' + (dead.length ? ' -> ' + dead.join(', ') : ''));

console.log('== Catálogos sin ids duplicados ==');
function extractArray(name) {
  const m = new RegExp('(?:const|let|var)\\s+' + name + '\\s*=\\s*\\[').exec(game);
  if (!m) return null;
  const start = game.indexOf('[', m.index);
  let depth = 0;
  for (let i = start; i < game.length; i++) {
    if (game[i] === '[') depth++;
    else if (game[i] === ']') { depth--; if (depth === 0) return game.slice(start, i + 1); }
  }
  return null;
}

for (const cat of ['SHOP_ARTIFACTS', 'STARTER_BLESSINGS']) {
  const arr = extractArray(cat);
  ok(!!arr, cat + ' existe');
  if (!arr) continue;
  const ids = (arr.match(/^\s*id:\s*"([\w-]+)"/gm) || []).map(s => s.trim().replace(/^\s*id:\s*"/, '').replace(/"$/, ''));
  ok(ids.length > 0, cat + ' tiene entradas (' + ids.length + ')');
  const dup = ids.filter((v, i) => ids.indexOf(v) !== i);
  ok(dup.length === 0, cat + ' sin ids duplicados' + (dup.length ? ' -> ' + dup.join(', ') : ''));
  const broken = [];
  ids.forEach(id => {
    const idx = arr.indexOf('id: "' + id + '"');
    const tail = arr.slice(idx, arr.indexOf('}', idx));
    if (!/apply:/.test(tail)) broken.push(id);
  });
  ok(broken.length === 0, cat + ' todas las entradas declaran apply' + (broken.length ? ' -> ' + broken.join(', ') : ''));
}

console.log('\nRESULTADO: ' + pass + ' pass / ' + fail + ' fail');
process.exit(fail ? 1 : 0);
