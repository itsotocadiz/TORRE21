/* Sprint 6 — updateMasterGain, slider de volumen en pausa y widget de resumen en Game Over */
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

let pass = 0, fail = 0;
function check(label, cond, detail) {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail ? '  ->  ' + detail : '')); }
}

console.log('\n== 1. updateMasterGain (bug de ReferenceError) ==');
check('define function updateMasterGain()', /function\s+updateMasterGain\s*\(\s*\)/.test(gameSrc));
check('exporta window.updateMasterGain', /window\.updateMasterGain\s*=\s*updateMasterGain/.test(gameSrc));
check('toggleSound llama a updateMasterGain()', /function\s+toggleSound\s*\([\s\S]{0,400}updateMasterGain\(\)/.test(gameSrc));
check('changeVolume llama a updateMasterGain()', /function\s+changeVolume\s*\([\s\S]{0,400}updateMasterGain\(\)/.test(gameSrc));
check('ensureAudio reutiliza updateMasterGain()', /function\s+ensureAudio\s*\([\s\S]{0,900}updateMasterGain\(\)/.test(gameSrc));
check('no queda setValueAtTime duplicado fuera de updateMasterGain', (gameSrc.match(/masterGainNode\.gain\.setValueAtTime/g) || []).length <= 3,
  'apariciones=' + (gameSrc.match(/masterGainNode\.gain\.setValueAtTime/g) || []).length);

console.log('\n== 2. Slider de volumen en la pausa in-game ==');
check('index.html: input#pause-volume-slider', /id="pause-volume-slider"/.test(htmlSrc));
check('index.html: badge #pause-vol-val', /id="pause-vol-val"/.test(htmlSrc));
check('index.html: oninput llama a changeVolumeFromPause', /oninput="changeVolumeFromPause\(this\.value\)"/.test(htmlSrc));
check('index.html: el slider vive dentro de #screen-ingame-pause', /id="screen-ingame-pause"[\s\S]*?id="pause-volume-slider"/.test(htmlSrc));
check('game.js define changeVolumeFromPause', /function\s+changeVolumeFromPause\s*\(\s*val\s*\)/.test(gameSrc));
check('game.js exporta window.changeVolumeFromPause', /window\.changeVolumeFromPause\s*=\s*changeVolumeFromPause/.test(gameSrc));
check('openInGamePauseMenu sincroniza el slider', /function\s+openInGamePauseMenu\s*\([\s\S]{0,2200}pause-volume-slider/.test(gameSrc));
check('openInGamePauseMenu sincroniza el badge', /function\s+openInGamePauseMenu\s*\([\s\S]{0,2400}pause-vol-val/.test(gameSrc));
check('changeVolume actualiza el badge de la pausa', /function\s+changeVolume\s*\([\s\S]{0,700}pause-vol-val/.test(gameSrc));
check('gameState tiene audioVolume', /audioVolume:\s*0\.5/.test(gameSrc));

console.log('\n== 3. Trackers de estadísticas de la run ==');
check('define function trackRunStat', /function\s+trackRunStat\s*\(\s*key\s*,\s*amount\s*\)/.test(gameSrc));
check('exporta window.trackRunStat', /window\.trackRunStat\s*=\s*trackRunStat/.test(gameSrc));
check('define function setRunStatMax', /function\s+setRunStatMax\s*\(\s*key\s*,\s*value\s*\)/.test(gameSrc));
check('exporta window.setRunStatMax', /window\.setRunStatMax\s*=\s*setRunStatMax/.test(gameSrc));
check('startGame inicializa gameState.runStats', /gameState\.runStats\s*=\s*\{\s*damageDealt/.test(gameSrc));
check('runStats se persiste en saveMidRunState', /runStats:\s*gameState\.runStats\s*\|\|\s*null/.test(gameSrc));
check('runStats se restaura al reanudar', /gameState\.runStats\s*=\s*saved\.runStats/.test(gameSrc));

console.log('\n== 4. Instrumentación de combate ==');
const resolveBlock = extract(gameSrc, /async\s+function\s+resolveHandResult\s*\(/);
check('resolveHandResult cuenta Blackjacks propios', /trackRunStat\(\s*["']blackjacks["']/.test(resolveBlock));
check('resolveHandResult cuenta Blackjacks del rival', /trackRunStat\(\s*["']enemyBlackjacks["']/.test(resolveBlock));
check('resolveHandResult registra la mejor mano', /setRunStatMax\(\s*["']bestHand["']/.test(resolveBlock));
check('daño al rival contabilizado (dmg)', /trackRunStat\(\s*["']damageDealt["'],\s*dmg\s*\)/.test(gameSrc));
check('daño residual del rival contabilizado (veneno)', /trackRunStat\(\s*["']damageDealt["'],\s*pDmg\s*\)/.test(gameSrc));
check('quemadura del rival contabilizada', /trackRunStat\(\s*["']damageDealt["'],\s*bDmg\s*\)/.test(gameSrc));
check('daño entrante contabilizado (incomingDmg)', /trackRunStat\(\s*["']damageTaken["'],\s*incomingDmg\s*\)/.test(gameSrc));
check('espinas contabilizadas', /trackRunStat\(\s*["']damageTaken["'],\s*(?:1|2)\s*\)/.test(gameSrc));
check('quemadura del jugador contabilizada', /trackRunStat\(\s*["']damageTaken["'],\s*pDmg\s*\)/.test(gameSrc));
check('aliento del dragón contabilizado', /trackRunStat\(\s*["']damageTaken["'],\s*3\s*\)/.test(gameSrc));
check('p._runBustCount sigue inicializándose en startGame', /p\._runBustCount\s*=\s*0/.test(gameSrc));

console.log('\n== 5. Widget de resumen en showGameOver ==');
check('define function _buildRunSummaryWidget', /function\s+_buildRunSummaryWidget\s*\(\s*p\s*,\s*floor\s*\)/.test(gameSrc));
const goBlock = extract(gameSrc, /function\s+showGameOver\s*\(/);
check('showGameOver inserta el widget', /_buildRunSummaryWidget\(\s*p\s*,\s*gameState\.floor\s*\)/.test(goBlock));
check('css define .run-summary-box', /\.run-summary-box\s*\{/.test(cssSrc));
check('css define .run-summary-row', /\.run-summary-row\s*\{/.test(cssSrc));

const extracted = extract(gameSrc, /function\s+_buildRunSummaryWidget\s*\(/);
const harness = `
const gameState = {
  killCount: 7,
  gold: 145,
  runStats: { damageDealt: 320, damageTaken: 118, blackjacks: 4, enemyBlackjacks: 2, bestHand: 21, startedAt: Date.now() - 95000 }
};
${extracted}
module.exports = { _buildRunSummaryWidget: _buildRunSummaryWidget };
`;
const Module = require('module');
const mod = new Module('sprint6-harness');
mod._compile(harness, path.join(__dirname, 'sprint6-harness.js'));
const api = mod.exports;

const widget = api._buildRunSummaryWidget({ _runBustCount: 3 }, 5);
console.log('\n== 6. Salida del widget ==');
check('título RESUMEN DE LA RUN', /RESUMEN DE LA RUN/.test(widget));
check('fila Piso alcanzado', /Piso alcanzado/.test(widget) && />5 \/ 13</.test(widget));
check('fila Rivales vencidos', /Rivales vencidos/.test(widget) && />7<\//.test(widget));
check('fila Oro acumulado', /Oro acumulado/.test(widget) && />145<\//.test(widget));
check('fila Daño infligido', /Daño infligido/.test(widget) && />320<\//.test(widget));
check('fila Daño recibido', /Daño recibido/.test(widget) && />118<\//.test(widget));
check('fila Mejor mano', /Mejor mano/.test(widget) && />21 pts<\//.test(widget));
check('fila Blackjacks', /Blackjacks/.test(widget) && /4 \(rival 2\)/.test(widget));
check('fila BUSTs sufridos', /BUSTs sufridos/.test(widget) && />3<\//.test(widget));
check('fila Duración (mm:ss)', /Duración/.test(widget) && />\d{2}:\d{2}<\//.test(widget));

console.log('\n== Resultado: ' + pass + ' pass / ' + fail + ' fail ==');
process.exit(fail ? 1 : 0);
