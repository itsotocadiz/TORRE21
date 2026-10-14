/**
 * test-phase7-wheel-visuals.js
 * Suite de verificación para FASE 7: Rueda del Destino Visual (Paper Mario).
 *
 * Valida:
 * 1. Existencia y formato de assets/svg/wheel_kneeling.svg y assets/svg/wheel_tomb.svg.
 * 2. Integración en index.html con IDs de escenario teatral (#wheel-beam, #wheel-actor-kneeling, #wheel-actor-tomb).
 * 3. Estilos y animaciones en css/style.css (.beam-salvation, .beam-annihilation, .tomb-drop, .kneeling-tremble).
 * 4. Control de actores y efectos de rayo/tumba en showFateWheel y spinFateWheel en js/game.js.
 * 5. Pulido del canvas de la rueda (remaches con relieve, glow dorado, gema central facetada).
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const gameSrc = fs.readFileSync(path.join(rootDir, 'js', 'game.js'), 'utf8');
const indexSrc = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const cssSrc = fs.readFileSync(path.join(rootDir, 'css', 'style.css'), 'utf8');

let pass = 0;
let fail = 0;

function ok(cond, msg) {
  if (cond) { console.log('  PASS ' + msg); pass++; }
  else { console.error('  FAIL ' + msg); fail++; }
}

console.log('== 1. Existencia de Actores SVG Paper Mario ==');
const kneelingSvgPath = path.join(rootDir, 'assets', 'svg', 'wheel_kneeling.svg');
const tombSvgPath = path.join(rootDir, 'assets', 'svg', 'wheel_tomb.svg');
ok(fs.existsSync(kneelingSvgPath), 'assets/svg/wheel_kneeling.svg existe');
ok(fs.existsSync(tombSvgPath), 'assets/svg/wheel_tomb.svg existe');

const kneelingContent = fs.readFileSync(kneelingSvgPath, 'utf8');
const tombContent = fs.readFileSync(tombSvgPath, 'utf8');
ok(kneelingContent.includes('viewBox="0 0 160 160"'), 'wheel_kneeling.svg cumple formato 160x160');
ok(tombContent.includes('viewBox="0 0 160 160"'), 'wheel_tomb.svg cumple formato 160x160');
ok(tombContent.includes('R.I.P.'), 'wheel_tomb.svg incluye epitafio fúnebre');

console.log('== 2. Integración en index.html ==');
ok(indexSrc.includes('id="wheel-beam"'), 'index.html incluye contenedor #wheel-beam');
ok(indexSrc.includes('id="wheel-actor-kneeling"'), 'index.html incluye #wheel-actor-kneeling');
ok(indexSrc.includes('id="wheel-actor-tomb"'), 'index.html incluye #wheel-actor-tomb');
ok(indexSrc.includes('assets/svg/wheel_kneeling.svg'), 'index.html referencia wheel_kneeling.svg');
ok(indexSrc.includes('assets/svg/wheel_tomb.svg'), 'index.html referencia wheel_tomb.svg');

console.log('== 3. Estilos y Efectos en style.css ==');
ok(cssSrc.includes('.wheel-light-beam.beam-salvation'), 'style.css define .beam-salvation (rayo de vida)');
ok(cssSrc.includes('.wheel-light-beam.beam-annihilation'), 'style.css define .beam-annihilation (rayo de juicio)');
ok(cssSrc.includes('.wheel-actor-sprite.kneeling-tremble'), 'style.css define animación de súplica');
ok(cssSrc.includes('.wheel-actor-sprite.tomb-drop'), 'style.css define animación de caída de tumba');
ok(cssSrc.includes('@keyframes divineBeamPulse'), 'style.css define @keyframes divineBeamPulse');
ok(cssSrc.includes('@keyframes doomLightningFlash'), 'style.css define @keyframes doomLightningFlash');

console.log('== 4. Lógica de Rayo y Tumba en game.js ==');
ok(gameSrc.includes('beam.className = "wheel-light-beam beam-salvation"'), 'game.js activa rayo de salvación al sobrevivir');
ok(gameSrc.includes('beam.className = "wheel-light-beam beam-annihilation"'), 'game.js activa rayo aniquilador al perecer');
ok(gameSrc.includes('tomb.classList.remove("hidden")'), 'game.js revela lápida sepulcral en la muerte');
ok(gameSrc.includes('kneeling.classList.add("hidden")'), 'game.js oculta figura suplicante al morir');
ok(gameSrc.includes('EL RAYO DEL JUICIO TE HA PULVERIZADO'), 'game.js muestra mensaje épico de rayo y juicio');

console.log('== 5. Pulido de Canvas 2D de la Rueda ==');
ok(gameSrc.includes('gemGrad.addColorStop(0, "#a5f3fc")'), 'drawWheel incorpora gema central facetada');
ok(gameSrc.includes('ctx.shadowColor = "rgba(255, 209, 102, 0.45)"'), 'drawWheel aplica resplandor exterior');
ok(gameSrc.includes('ctx.arc(rx - 0.7, ry - 0.7, 0.8, 0, Math.PI * 2)'), 'drawWheel dibuja brillos en los remaches');

console.log(`\nRESULTADO: ${pass} pass / ${fail} fail`);
if (fail > 0) process.exit(1);
