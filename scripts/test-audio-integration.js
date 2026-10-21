/**
 * test-audio-integration.js
 * Suite de verificación del sistema de audio:
 *  - SFX antes huérfanos (playWinFanfareSound, playVictoryFanfareSound,
 *    playCurseSound, playTitleMusic) definidos y exportados.
 *  - exitToMainMenu detiene la música de combate y arranca la de título.
 *  - Persistencia de audioEnabled/audioVolume en localStorage.
 *  - Suspensión del AudioContext al ocultar la app (visibilitychange).
 *  - Motor de música por archivos: canal, carga, crossfade y pistas CC0
 *    descargadas (assets/audio/musica) referenciadas correctamente.
 *  - Sección de créditos musicales en index.html.
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== TEST: INTEGRACIÓN DE AUDIO Y MÚSICA ===');

const rootDir = path.resolve(__dirname, '..');
const gameSrc = fs.readFileSync(path.join(rootDir, 'js', 'game.js'), 'utf8');
const htmlSrc = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

let total = 0;
let passed = 0;
function check(desc, ok, extra) {
  total++;
  if (ok) { passed++; console.log('  PASS ' + desc); }
  else { console.error('  FAIL ' + desc + (extra ? '  -> ' + extra : '')); }
}

/* ---------- 1. SFX / música huérfanos resueltos ---------- */
console.log('\n== 1. SFX y música antes inexistentes ==');
for (const fn of ['playWinFanfareSound', 'playVictoryFanfareSound', 'playCurseSound', 'playTitleMusic']) {
  check(`game.js define function ${fn}`, new RegExp('function\\s+' + fn + '\\s*\\(').test(gameSrc));
  check(`exporta window.${fn}`, new RegExp('window\\.' + fn + '\\s*=\\s*' + fn).test(gameSrc));
}
check('No quedan llamadas sin definir en improvements.js', (function () {
  const impSrc = fs.readFileSync(path.join(rootDir, 'js', 'improvements.js'), 'utf8');
  const calls = [...new Set([...impSrc.matchAll(/\b(play[A-Za-z]+Sound)\s*\(/g)].map(m => m[1]))];
  return calls.every(fn =>
    new RegExp('function\\s+' + fn + '\\s*\\(').test(gameSrc) ||
    new RegExp('window\\.' + fn + '\\s*=').test(gameSrc)
  );
})());

/* ---------- 2. exitToMainMenu ---------- */
console.log('\n== 2. exitToMainMenu limpia el audio ==');
const exitMatch = /function\s+exitToMainMenu\s*\(/.exec(gameSrc);
check('existe exitToMainMenu', !!exitMatch);
if (exitMatch) {
  let i = exitMatch.index + exitMatch[0].length;
  while (gameSrc[i] !== '{' && i < gameSrc.length) i++;
  // escáner de llaves
  let depth = 0, j = i, quote = null, lineComment = false, blockComment = false;
  for (; j < gameSrc.length; j++) {
    const ch = gameSrc[j], next = gameSrc[j + 1];
    if (lineComment) { if (ch === '\n') lineComment = false; continue; }
    if (blockComment) { if (ch === '*' && next === '/') { blockComment = false; j++; } continue; }
    if (quote) { if (ch === '\\') { j++; continue; } if (ch === quote) quote = null; continue; }
    if (ch === '/' && next === '/') { lineComment = true; j++; continue; }
    if (ch === '/' && next === '*') { blockComment = true; j++; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) { j++; break; } }
  }
  const block = gameSrc.slice(i, j);
  check('detiene la música de combate', /stopCombatMusic\s*\(\s*\)/.test(block));
  check('detiene la tensión de muerte súbita', /stopSuddenDeathTension\s*\(\s*\)/.test(block));
  check('arranca la música de título', /playTitleMusic\s*\(\s*\)/.test(block));
}

/* ---------- 3. Persistencia de ajustes ---------- */
console.log('\n== 3. Persistencia audioEnabled/audioVolume ==');
check('define AUDIO_SETTINGS_KEY', /AUDIO_SETTINGS_KEY\s*=/.test(gameSrc));
check('define loadAudioSettings', /function\s+loadAudioSettings\s*\(/.test(gameSrc));
check('define saveAudioSettings', /function\s+saveAudioSettings\s*\(/.test(gameSrc));
check('toggleSound guarda ajustes', /function\s+toggleSound\s*\([\s\S]{0,600}saveAudioSettings\s*\(\s*\)/.test(gameSrc));
check('changeVolume guarda ajustes', /function\s+changeVolume\s*\([\s\S]{0,600}saveAudioSettings\s*\(\s*\)/.test(gameSrc));
check('se cargan al arrancar (carga perezosa top-level)', /^\s*loadAudioSettings\s*\(\s*\);/m.test(gameSrc));
check('JSON.parse protegido en loadAudioSettings', /function\s+loadAudioSettings\s*\([\s\S]{0,300}\btry\b/.test(gameSrc));

/* ---------- 4. Suspend/resume en background ---------- */
console.log('\n== 4. visibilitychange ==');
check('suspende el AudioContext al ocultar', /visibilitychange[\s\S]{0,400}audioCtx\.suspend\s*\(/.test(gameSrc));
check('reanuda al volver a primer plano', /visibilitychange[\s\S]{0,700}audioCtx\.resume\s*\(/.test(gameSrc));
check('sigue guardando la partida al ocultar', /visibilitychange[\s\S]{0,300}saveMidRunState\s*\(\s*\)/.test(gameSrc));

/* ---------- 5. Motor de música por archivos ---------- */
console.log('\n== 5. Motor de música (carga, canal, fallback) ==');
check('define MUSIC_TRACKS', /const\s+MUSIC_TRACKS\s*=\s*\{/.test(gameSrc));
for (const fn of ['ensureMusicChannel', 'loadMusicBuffer', 'stopSceneMusic', 'stopSceneMusicIfScene', 'startTrackedSceneMusic']) {
  check(`define ${fn}`, new RegExp('function\\s+' + fn + '\\s*\\(').test(gameSrc));
}
check('startIntroMusic usa el motor con fallback procedural', /startTrackedSceneMusic\s*\(\s*"title"\s*,\s*startProceduralIntroMusic\s*\)/.test(gameSrc));
check('startCombatMusic usa el motor con fallback procedural', /startTrackedSceneMusic\s*\(\s*sceneKey\s*,\s*startProceduralCombatMusic\s*\)/.test(gameSrc));
check('stopIntroMusic corta la pista del título', /stopSceneMusicIfScene\s*\(\s*"title"\s*\)/.test(gameSrc));
check('stopCombatMusic corta combate y jefe', /stopSceneMusicIfScene\s*\(\s*"combat"\s*\)/.test(gameSrc) && /stopSceneMusicIfScene\s*\(\s*"boss"\s*\)/.test(gameSrc));
check('el canal de música cuelga del masterGainNode', /musicGainNode\.connect\s*\(\s*masterGainNode\s*\)/.test(gameSrc));
check('la música se reproduce en bucle con loop', /src\.loop\s*=\s*true/.test(gameSrc));
check('carga con fetch + decodeAudioData', /fetch\s*\(\s*url\s*\)/.test(gameSrc) && /decodeAudioData\s*\(/.test(gameSrc));
check('sin canales masterGainNode.gain.setValueAtTime extra (límite del test sprint6)', (gameSrc.match(/masterGainNode\.gain\.setValueAtTime/g) || []).length <= 3, 'apariciones=' + (gameSrc.match(/masterGainNode\.gain\.setValueAtTime/g) || []).length);

/* ---------- 6. Enganches de escena ---------- */
console.log('\n== 6. Enganches de escena ==');
check('showShopModal lanza la música del bazar', /function\s+showShopModal\s*\([\s\S]{0,300}startTrackedSceneMusic\s*\(\s*"bazaar"/.test(gameSrc));
check('chooseCampfireRest lanza la música de la fogata', /function\s+chooseCampfireRest\s*\([\s\S]{0,500}startTrackedSceneMusic\s*\(\s*"campfire"/.test(gameSrc));
check('showFateWheel detiene combate y arranca la música de la Rueda', /function\s+showFateWheel\s*\([\s\S]{0,800}stopCombatMusic\s*\(\s*\)[\s\S]{0,200}startFateWheelMusic\s*\(\s*\)/.test(gameSrc));
check('define playResurrectionSound', /function\s+playResurrectionSound\s*\(/.test(gameSrc) && /window\.playResurrectionSound\s*=/.test(gameSrc));
check('define playAnnihilationSound', /function\s+playAnnihilationSound\s*\(/.test(gameSrc) && /window\.playAnnihilationSound\s*=/.test(gameSrc));
check('define playJackpotCoinsSound', /function\s+playJackpotCoinsSound\s*\(/.test(gameSrc) && /window\.playJackpotCoinsSound\s*=/.test(gameSrc));

/* ---------- 7. Pistas CC0 descargadas y referenciadas ---------- */
console.log('\n== 7. Pistas de música en assets/audio ==');
const tracksMatch = /const\s+MUSIC_TRACKS\s*=\s*\{([\s\S]*?)\};/.exec(gameSrc);
const tracksBody = tracksMatch
  ? tracksMatch[1].split('\n').filter(line => !/^\s*\/\//.test(line)).join('\n')
  : '';
const trackEntries = [...tracksBody.matchAll(/["']?(\w+)["']?\s*:\s*["']([^"']+)["']/g)];
check('hay al menos 3 pistas registradas', trackEntries.length >= 3, 'encontradas=' + trackEntries.length);
for (const [, scene, rel] of trackEntries) {
  const abs = path.join(rootDir, rel);
  const exists = fs.existsSync(abs);
  check(`pista '${scene}' existe: ${rel}`, exists);
  if (exists) {
    const size = fs.statSync(abs).size;
    check(`pista '${scene}' de tamaño razonable (< 4 MB)`, size > 50000 && size < 4 * 1024 * 1024, size + ' bytes');
    const head = fs.readFileSync(abs).slice(0, 3).toString('latin1');
    check(`pista '${scene}' es MP3 válido (ID3/Frame sync)`, head === 'ID3' || head.charCodeAt(0) === 0xff, JSON.stringify(head));
  }
}

/* ---------- 8. Créditos en la UI ---------- */
console.log('\n== 8. Créditos musicales en index.html ==');
check('sección CRÉDITOS MUSICALES presente', /CRÉDITOS MUSICALES/.test(htmlSrc));
check('lista las 3 pistas con autoría', /Determined Pursuit/.test(htmlSrc) && /The Final Battle/.test(htmlSrc) && /Moil/.test(htmlSrc));
check('menciona la licencia CC0', /CC0/.test(htmlSrc));

/* ---------- 9. Ejecución real con mocks (sin ReferenceError) ---------- */
console.log('\n== 9. Ejecución con entorno simulado ==');
const mockEl = () => ({
  classList: { add: () => {}, remove: () => {}, contains: () => true },
  innerHTML: '', innerText: '', className: '', dataset: {}, style: {}, value: '',
  children: [], firstChild: null, scrollTop: 0, scrollHeight: 0,
  appendChild: () => {}, removeChild: () => {}, addEventListener: () => {},
  getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 })
});
global.window = { addEventListener: () => {}, AudioContext: function () {
  return {
    state: 'running', currentTime: 0, sampleRate: 44100, destination: {},
    createOscillator: () => ({ connect: () => {}, start: () => {}, stop: () => {}, frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {}, linearRampToValueAtTime: () => {} }, type: '' }),
    createGain: () => ({ gain: { value: 1, setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {}, linearRampToValueAtTime: () => {}, cancelScheduledValues: () => {} }, connect: () => {} }),
    createBuffer: () => ({ getChannelData: () => new Float32Array(8) }),
    createBufferSource: () => ({ connect: () => {}, start: () => {}, stop: () => {}, buffer: null, loop: false, onended: null }),
    createBiquadFilter: () => ({ connect: () => {}, frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }, Q: { setValueAtTime: () => {} }, type: '' }),
    resume: () => Promise.resolve(), suspend: () => Promise.resolve(),
    decodeAudioData: (b, ok) => { if (ok) ok({ duration: 1 }); return Promise.resolve({ duration: 1 }); }
  };
} };
global.document = {
  getElementById: () => mockEl(),
  querySelectorAll: () => [],
  addEventListener: () => {},
  createElement: () => mockEl(),
  body: { classList: { add: () => {}, remove: () => {} } },
  visibilityState: 'visible'
};
global.localStorage = { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = String(v); }, removeItem(k) { delete this._d[k]; } };
global.alert = () => {};

let api = null;
try {
  require('../js/improvements.js');
  require('../js/game.js');
  // Simula la semántica del navegador: window.x = fn implica global x
  for (const [k, v] of Object.entries(global.window)) {
    if (typeof v === 'function' && global[k] === undefined) global[k] = v;
  }
  api = global.window;
  check('game.js carga sin errores con mocks', true);
} catch (e) {
  check('game.js carga sin errores con mocks', false, e && e.message);
}

if (api) {
  check('window.playWinFanfareSound es función', typeof api.playWinFanfareSound === 'function');
  check('window.playVictoryFanfareSound es función', typeof api.playVictoryFanfareSound === 'function');
  check('window.playCurseSound es función', typeof api.playCurseSound === 'function');
  check('window.playTitleMusic es función', typeof api.playTitleMusic === 'function');

  // Persistencia: changeVolume debe guardar en localStorage
  try {
    api.changeVolume(75);
    const raw = global.localStorage.getItem('bj_audio_settings_v1');
    const saved = raw ? JSON.parse(raw) : null;
    check('changeVolume persiste el volumen (75 → 0.75)', !!saved && Math.abs(saved.volume - 0.75) < 1e-9, JSON.stringify(saved));
    api.toggleSound();
    const raw2 = JSON.parse(global.localStorage.getItem('bj_audio_settings_v1'));
    check('toggleSound persiste el estado on/off', typeof raw2.enabled === 'boolean' && raw2.enabled === false, JSON.stringify(raw2));
    api.toggleSound();
  } catch (e) {
    check('persistencia de ajustes funciona', false, e && e.message);
  }

  // Re-carga del módulo: los ajustes guardados deben restaurarse
  try {
    global.window.gameState.audioVolume = 0.5;
    global.window.gameState.audioEnabled = true;
    delete require.cache[require.resolve('../js/game.js')];
    require('../js/game.js');
    for (const [k, v] of Object.entries(global.window)) {
      if (typeof v === 'function' && global[k] === undefined) global[k] = v;
    }
    check('loadAudioSettings restaura volumen 0.75 tras recargar', Math.abs(global.window.gameState.audioVolume - 0.75) < 1e-9, String(global.window.gameState.audioVolume));
    check('loadAudioSettings restaura sonido activado', global.window.gameState.audioEnabled === true);
  } catch (e) {
    check('restauración de ajustes tras recargar', false, e && e.message);
  }

  // Los SFX nuevos no lanzan excepciones
  for (const fn of ['playWinFanfareSound', 'playVictoryFanfareSound', 'playCurseSound']) {
    try { api[fn](); check(`${fn}() no lanza excepciones`, true); }
    catch (e) { check(`${fn}() no lanza excepciones`, false, e && e.message); }
  }
}

console.log('\n---------------------------------------');
console.log(`RESULTADO: ${passed} pass / ${total - passed} fail\n`);
if (api && typeof api.stopMainMenuMusic === 'function') {
  try { api.stopMainMenuMusic(); } catch (_) {}
}
if (passed !== total) process.exit(1);
process.exit(0);

