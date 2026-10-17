/* ============================================================
   scripts/build-sprites.js
   Genera los sprites vectoriales estilo "papel recortado"
   (Paper Mario) en assets/svg/.

   Estilo fijo (única fuente de verdad):
   - Lienzo cuadrado 160x160, personaje centrado, sin fondo.
   - Relleno plano: SIN degradados, SIN sombreado interno.
   - Contorno de tinta #17110c, grosor 7, uniones y remates redondos.
   - Sombra de papel: copia silueta en negro al 32% desplazada (6,8).
   - Suelo: elipse negra al 25% bajo los pies.
   - Proporción "chibi": cabeza grande (radio 25) y cuerpo corto.

   Uso:  node scripts\build-sprites.js
   ============================================================ */
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'assets', 'svg');
const W = 160, H = 160;
const INK = '#17110c';
const INK_W = 7;
const CUTOUT_W = 12; // Borde negro grueso troquelado de papel (Paper Mario hecho a mano)

const SHADOW_OFFSET = 'translate(6,8)';
const SHADOW_OPACITY = 0.32;

/* ---------- helpers de primitivas (solo texto, sin dependencias) ---------- */
function rr(x, y, w, h, r, f) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}"/>`;
}
function ci(cx, cy, r, f) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}"/>`;
}
function el(cx, cy, rx, ry, f) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}"/>`;
}
function pt(d, f) {
  return `<path d="${d}" fill="${f}"/>`;
}
function noInk(f) { return ` fill="${f}" stroke="none"`; }

function eyes(p, cx1, cx2, cy) {
  if (p.eye === 'x') {
    const s = 5;
    return `<path d="M${cx1 - s} ${cy - s}L${cx1 + s} ${cy + s}M${cx1 + s} ${cy - s}L${cx1 - s} ${cy + s}" fill="none" stroke-width="6"/>` +
           `<path d="M${cx2 - s} ${cy - s}L${cx2 + s} ${cy + s}M${cx2 + s} ${cy - s}L${cx2 - s} ${cy + s}" fill="none" stroke-width="6"/>`;
  }
  if (p.eye === 'glow') {
    return `<circle cx="${cx1}" cy="${cy}" r="5.5"${noInk(p.eyeColor || p.gold)}/>` +
           `<circle cx="${cx2}" cy="${cy}" r="5.5"${noInk(p.eyeColor || p.gold)}/>`;
  }
  return `<circle cx="${cx1}" cy="${cy}" r="4.5"${noInk(p.ink || INK)}/>` +
         `<circle cx="${cx2}" cy="${cy}" r="4.5"${noInk(p.ink || INK)}/>`;
}

function mouth(p) {
  if (p.mouth === 'open') return `<ellipse cx="80" cy="82" rx="7" ry="6"${noInk(p.ink || INK)}/>`;
  if (p.mouth === 'flat') return `<path d="M72 81 L88 81" fill="none" stroke-width="5"/>`;
  if (p.mouth === 'fangs') return `<path d="M72 79 Q80 85 88 79" fill="none" stroke-width="5"/><path d="M74 79 L76 85 L78 79 M82 79 L84 85 L86 79" fill="${p.blade || '#fff'}"/>`;
  return `<path d="M72 79 Q80 88 88 79" fill="none" stroke-width="5"/>`;
}

/* ---------- armas y accesorios ---------- */
function sword(p, angle) {
  return `<g transform="translate(109.5,124) rotate(${angle})">` +
    pt('M0 -54 L6 -40 L6 -4 L-6 -4 L-6 -40 Z', p.blade) +
    rr(-15, -7, 30, 9, 4, p.gold) +
    rr(-5.5, 2, 11, 17, 5, p.grip) +
    ci(0, 24, 6, p.gold) +
    `</g>`;
}

function dagger(p, angle, x, y) {
  return `<g transform="translate(${x},${y}) rotate(${angle})">` +
    pt('M0 -34 L5 -24 L4 -2 L-4 -2 L-5 -24 Z', p.blade) +
    rr(-10, -5, 20, 7, 3, p.gold) +
    rr(-4, 2, 8, 12, 3, p.grip) +
    ci(0, 16, 4, p.gold) +
    `</g>`;
}

function staff(p, angle) {
  return `<g transform="translate(112,122) rotate(${angle})">` +
    rr(-5, -60, 10, 85, 4, p.grip) +
    ci(0, -66, 14, p.magic || p.gold) +
    pt('M-12 -66 L0 -82 L12 -66 Z', p.bone || p.gold) +
    `</g>`;
}

/* ---------- poses estándar de héroes ---------- */
const POSES = {
  idle:   { armR: 0,    armL: 0,  sword: 28,  daggerR: 35,  daggerL: -35, eye: 'dot',  mouth: 'smile', tf: '' },
  attack: { armR: -105, armL: 20, sword: 40,  daggerR: -60, daggerL: 45,  eye: 'dot',  mouth: 'flat',  tf: 'rotate(-8 80 148)' },
  hurt:   { armR: -100, armL: 100,sword: 15,  daggerR: 90,  daggerL: -90, eye: 'x',    mouth: 'open',  tf: 'rotate(-14 80 148)' },
  dead:   { armR: -70,  armL: 80, sword: 70,  daggerR: 80,  daggerL: -80, eye: 'x',    mouth: 'flat',  tf: 'rotate(-90 80 83)' }
};

/* ============================================================
   PARTES DE HÉROES
   ============================================================ */

/* 1. Caballero */
function knightParts(p, pose) {
  let s = '';
  s += rr(62, 110, 15, 32, 7, p.armorDark);
  s += rr(83, 110, 15, 32, 7, p.armorDark);
  s += rr(57, 133, 24, 14, 6, p.boot);
  s += rr(79, 133, 24, 14, 6, p.boot);
  s += rr(56, 84, 48, 36, 13, p.armor);
  s += rr(56, 108, 48, 9, 3, p.armorDark);
  s += ci(80, 112.5, 5, p.gold);
  s += `<g transform="rotate(${pose.armL} 50.5 94)">` +
       rr(44, 88, 13, 34, 6.5, p.armor) +
       ci(50.5, 124, 7.5, p.skin) +
       rr(28, 96, 30, 36, 8, p.shield) +
       ci(43, 114, 7, p.gold) +
       `</g>`;
  s += `<g transform="rotate(${pose.armR} 109.5 94)">` +
       rr(103, 88, 13, 34, 6.5, p.armor) +
       ci(109.5, 124, 7.5, p.skin) +
       sword(p, pose.sword) +
       `</g>`;
  s += ci(80, 56, 25, p.skin);
  s += pt('M55 55 A25 25 0 0 1 105 55 Z', p.armor);
  s += rr(51, 51, 58, 9, 4, p.armorDark);
  s += rr(50, 53, 10, 23, 5, p.armorDark);
  s += rr(100, 53, 10, 23, 5, p.armorDark);
  s += eyes(p, 71, 89, 69);
  s += mouth(p);
  s += pt('M76 34 C 68 12 88 0 102 6 C 113 11 113 26 100 33 Z', p.plume);
  return s;
}

/* 2. Pícaro */
function rogueParts(p, pose) {
  let s = '';
  // piernas y botas ágiles
  s += rr(63, 112, 14, 30, 6, p.pants || p.armorDark);
  s += rr(83, 112, 14, 30, 6, p.pants || p.armorDark);
  s += rr(58, 134, 22, 13, 5, p.boot);
  s += rr(80, 134, 22, 13, 5, p.boot);
  // torso cuero + capa
  s += pt('M52 86 L108 86 L112 122 L48 122 Z', p.cloak || p.armorDark);
  s += rr(58, 86, 44, 34, 10, p.armor);
  s += rr(58, 108, 44, 8, 3, p.belt || p.armorDark);
  s += rr(76, 107, 8, 10, 2, p.gold);
  // brazo izquierdo + daga
  s += `<g transform="rotate(${pose.armL} 52 94)">` +
       rr(46, 88, 12, 32, 6, p.armor) +
       ci(52, 122, 7, p.skin) +
       dagger(p, pose.daggerL || -30, 52, 122) +
       `</g>`;
  // brazo derecho + daga
  s += `<g transform="rotate(${pose.armR} 108 94)">` +
       rr(102, 88, 12, 32, 6, p.armor) +
       ci(108, 122, 7, p.skin) +
       dagger(p, pose.daggerR || 30, 108, 122) +
       `</g>`;
  // cabeza y capucha puntiaguda
  s += ci(80, 56, 25, p.skin);
  s += pt('M55 58 Q55 24 80 18 Q105 24 105 58 Q105 78 80 84 Q55 78 55 58 Z', p.hood || p.armor);
  s += pt('M78 18 L80 10 L84 18 Z', p.hood || p.armor); // pico capucha
  s += el(80, 60, 20, 14, p.skin); // cara visible
  s += pt('M60 66 Q80 76 100 66 L98 74 Q80 82 62 74 Z', p.mask || p.armorDark); // máscara inferior
  s += eyes(p, 72, 88, 58);
  s += mouth(p);
  return s;
}

/* 3. Monje */
function monkParts(p, pose) {
  let s = '';
  // piernas con vendajes
  s += rr(63, 110, 14, 32, 6, p.pants || p.armorDark);
  s += rr(83, 110, 14, 32, 6, p.pants || p.armorDark);
  s += rr(59, 134, 21, 13, 5, p.boot);
  s += rr(80, 134, 21, 13, 5, p.boot);
  // túnica monacal cruzada
  s += rr(56, 85, 48, 38, 12, p.armor);
  s += pt('M56 85 L90 123 L80 123 L56 95 Z', p.armorDark);
  s += rr(54, 106, 52, 9, 3, p.belt || p.gold);
  // collar de cuentas de oración
  s += `<g fill="${p.beads || p.gold}">` +
       ci(67, 86, 5, p.beads || p.gold) +
       ci(75, 91, 5, p.beads || p.gold) +
       ci(85, 91, 5, p.beads || p.gold) +
       ci(93, 86, 5, p.beads || p.gold) +
       ci(80, 96, 6, p.gold) +
       `</g>`;
  // brazo izquierdo (puño vendado)
  s += `<g transform="rotate(${pose.armL} 52 94)">` +
       rr(46, 88, 12, 30, 6, p.armor) +
       rr(44, 114, 15, 12, 4, p.wrap || '#fff') +
       ci(52, 124, 8, p.skin) +
       `</g>`;
  // brazo derecho (puño de combate)
  s += `<g transform="rotate(${pose.armR} 108 94)">` +
       rr(102, 88, 12, 30, 6, p.armor) +
       rr(101, 114, 15, 12, 4, p.wrap || '#fff') +
       ci(108, 124, 8, p.skin) +
       `</g>`;
  // cabeza rapada + puntos de monje
  s += ci(80, 56, 25, p.skin);
  // 6 puntos rituales en la frente
  s += `<g fill="${p.dot || '#8a5a3b'}">` +
       ci(76, 42, 2, p.dot || '#8a5a3b') + ci(80, 42, 2, p.dot || '#8a5a3b') + ci(84, 42, 2, p.dot || '#8a5a3b') +
       ci(76, 47, 2, p.dot || '#8a5a3b') + ci(80, 47, 2, p.dot || '#8a5a3b') + ci(84, 47, 2, p.dot || '#8a5a3b') +
       `</g>`;
  s += eyes(p, 71, 89, 62);
  s += mouth(p);
  return s;
}

/* 4. Nigromante */
function necroParts(p, pose) {
  let s = '';
  // toga ceremonial hasta el suelo
  s += pt('M54 90 L106 90 L114 144 L46 144 Z', p.armorDark);
  s += pt('M60 90 L100 90 L106 142 L54 142 Z', p.armor);
  s += pt('M72 100 L80 115 L88 100 L80 94 Z', p.bone || '#fff'); // broche calavera
  // brazo izquierdo (conjurando fuego de alma)
  s += `<g transform="rotate(${pose.armL} 50 94)">` +
       rr(44, 88, 13, 32, 6, p.armor) +
       ci(50, 122, 7, p.skin) +
       ci(50, 128, 9, p.magic || '#06d6a0') + // llama espectral
       `</g>`;
  // brazo derecho sosteniendo el báculo
  s += `<g transform="rotate(${pose.armR} 110 94)">` +
       rr(103, 88, 13, 32, 6, p.armor) +
       ci(110, 122, 7, p.skin) +
       staff(p, 15) +
       `</g>`;
  // cabeza con capucha oscura y rostro pálido
  s += ci(80, 56, 25, p.skin);
  s += pt('M54 58 Q54 22 80 16 Q106 22 106 58 Q106 80 80 84 Q54 80 54 58 Z', p.hood || p.armorDark);
  s += el(80, 62, 17, 16, p.skin);
  p.eyeColor = p.magic || '#06d6a0';
  p.eye = pose.eye === 'x' ? 'x' : 'glow';
  s += eyes(p, 72, 88, 62);
  s += mouth(p);
  // cuernos de carnero en la capucha
  s += pt('M62 38 Q50 26 44 38 Q42 50 56 46 Z', p.bone || '#ffd166');
  s += pt('M98 38 Q110 26 116 38 Q118 50 104 46 Z', p.bone || '#ffd166');
  return s;
}

/* ============================================================
   PARTES DE ENEMIGOS
   ============================================================ */

/* 1. Duende Pilluelo */
function goblinParts(p) {
  let s = '';
  // orejas gigantes puntiagudas
  s += pt('M58 56 L30 42 L52 68 Z', p.skin);
  s += pt('M102 56 L130 42 L108 68 Z', p.skin);
  // cuerpo y patas cortas
  s += rr(65, 112, 12, 28, 5, p.skin);
  s += rr(83, 112, 12, 28, 5, p.skin);
  s += rr(60, 84, 40, 34, 10, p.tunic);
  // saco de oro robado en espalda
  s += ci(114, 102, 18, p.sack);
  s += ci(118, 92, 6, p.gold);
  // cabeza grande y fea
  s += ci(80, 60, 24, p.skin);
  s += el(80, 66, 8, 6, p.nose); // narizota
  p.eye = 'dot';
  s += eyes(p, 72, 88, 56);
  s += pt('M70 76 Q80 84 90 76', p.ink || INK); // sonrisa pícara
  return s;
}

/* 2. Esqueleto Maldito */
function skeletonParts(p) {
  let s = '';
  // costillas y huesos
  s += rr(66, 112, 10, 30, 4, p.bone);
  s += rr(84, 112, 10, 30, 4, p.bone);
  s += rr(76, 82, 8, 32, 4, p.bone); // columna
  s += rr(62, 88, 36, 6, 3, p.bone); // costilla 1
  s += rr(64, 98, 32, 6, 3, p.bone); // costilla 2
  s += rr(66, 108, 28, 6, 3, p.bone); // pelvis
  // brazo con escudo astillado
  s += rr(46, 88, 8, 28, 3, p.bone);
  s += rr(26, 92, 24, 32, 5, p.shield);
  // brazo con espada rota
  s += rr(106, 88, 8, 28, 3, p.bone);
  s += sword(p, 35);
  // cráneo
  s += ci(80, 52, 22, p.bone);
  s += rr(71, 68, 18, 12, 3, p.bone); // mandíbula
  s += ci(73, 52, 6, p.ink || INK); // cuencas oscuras
  s += ci(87, 52, 6, p.ink || INK);
  s += ci(73, 52, 2, '#ef233c'); // chispa roja en ojo
  s += ci(87, 52, 2, '#ef233c');
  s += pt('M79 62 L78 66 L82 66 Z', p.ink || INK); // fosa nasal
  return s;
}

/* 3. Orco Berserker */
function orcParts(p) {
  let s = '';
  // hombreras con púas y cuerpo macizo
  s += rr(60, 114, 18, 30, 6, p.skinDark);
  s += rr(82, 114, 18, 30, 6, p.skinDark);
  s += rr(52, 80, 56, 40, 14, p.skin);
  s += rr(50, 106, 60, 10, 4, p.leather);
  // hombrera con pincho
  s += ci(46, 80, 14, p.iron);
  s += pt('M40 70 L46 54 L52 70 Z', p.iron);
  s += ci(114, 80, 14, p.iron);
  // garrote con clavos
  s += rr(114, 60, 16, 55, 6, p.wood);
  s += ci(122, 66, 5, p.iron);
  s += ci(122, 80, 5, p.iron);
  // cabezota y colmillos inferiores
  s += ci(80, 52, 26, p.skin);
  s += rr(52, 48, 56, 10, 4, p.iron); // cinta metálica
  s += eyes(p, 70, 90, 52);
  s += pt('M72 68 Q80 72 88 68', p.ink || INK);
  // colmillos que suben
  s += pt('M71 70 L73 60 L76 70 Z', '#ffffff');
  s += pt('M84 70 L87 60 L89 70 Z', '#ffffff');
  return s;
}

/* 4. Gárgola Pétrea */
function gargoyleParts(p) {
  let s = '';
  // alas de murciélago extendidas
  s += pt('M56 80 L18 42 L26 78 L12 86 L38 98 L56 94 Z', p.wing);
  s += pt('M104 80 L142 42 L134 78 L148 86 L122 98 L104 94 Z', p.wing);
  // patas garras de piedra
  s += rr(62, 112, 15, 30, 6, p.stoneDark);
  s += rr(83, 112, 15, 30, 6, p.stoneDark);
  s += rr(56, 82, 48, 36, 12, p.stone);
  // cabeza demoníaca de piedra con cuernos
  s += pt('M62 44 L48 22 L66 34 Z', p.stoneDark);
  s += pt('M98 44 L112 22 L94 34 Z', p.stoneDark);
  s += ci(80, 56, 24, p.stone);
  s += eyes(p, 72, 88, 56);
  s += pt('M70 70 Q80 76 90 70', p.ink || INK);
  return s;
}

/* 5. Bestia de las Sombras */
function shadowbeastParts(p) {
  let s = '';
  // cuerpo y zarpas umbrías
  s += rr(56, 112, 18, 30, 8, p.furDark);
  s += rr(86, 112, 18, 30, 8, p.furDark);
  s += pt('M40 84 Q30 110 50 128 L110 128 Q130 110 120 84 Z', p.fur);
  // melena de sombras con picos
  s += pt('M46 64 L30 76 L48 84 L32 98 L56 102 Z', p.furDark);
  s += pt('M114 64 L130 76 L112 84 L128 98 L104 102 Z', p.furDark);
  // cabeza felina/lobo con orejas triangulares
  s += pt('M60 48 L50 24 L72 38 Z', p.furDark);
  s += pt('M100 48 L110 24 L88 38 Z', p.furDark);
  s += ci(80, 58, 25, p.fur);
  // ojos y fauces brillantes
  s += ci(71, 56, 6, p.eyeGlow);
  s += ci(89, 56, 6, p.eyeGlow);
  s += pt('M72 72 Q80 78 88 72', p.ink || INK);
  s += pt('M74 72 L76 78 L78 72 M82 72 L84 78 L86 72 Z', '#fff'); // colmillos
  return s;
}

/* 6. Centurión Espectral */
function centurionParts(p) {
  let s = '';
  // cuerpo y armadura etérea
  s += rr(62, 110, 15, 32, 6, p.armorDark);
  s += rr(83, 110, 15, 32, 6, p.armorDark);
  s += rr(56, 84, 48, 36, 12, p.armor);
  // scutum (escudo rectangular centurión)
  s += rr(26, 82, 28, 48, 6, p.shield);
  s += pt('M34 106 L46 96 L46 116 Z', p.gold); // emblema rayo
  // pilum / lanza espectral
  s += rr(114, 52, 6, 85, 3, p.wood);
  s += pt('M111 52 L117 32 L123 52 Z', p.armor);
  // casco con cresta transversal romana
  s += ci(80, 56, 24, p.skin);
  s += pt('M54 52 A26 26 0 0 1 106 52 Z', p.armor);
  s += pt('M50 36 Q80 20 110 36 L106 42 Q80 28 54 42 Z', p.crest); // penacho transversal
  s += eyes(p, 72, 88, 60);
  s += mouth(p);
  return s;
}

/* 7. Guardián de Obsidiana */
function obsidianParts(p) {
  let s = '';
  // cuerpo de roca volcánica quebrada
  s += rr(60, 110, 18, 32, 6, p.rockDark);
  s += rr(82, 110, 18, 32, 6, p.rockDark);
  s += rr(50, 78, 60, 40, 14, p.rock);
  // grietas de lava incandescente
  s += pt('M64 88 L72 98 L68 112', p.lava);
  s += pt('M96 86 L88 98 L92 110', p.lava);
  s += pt('M76 82 L84 86 L80 94', p.lava);
  // brazos pesados de roca
  s += rr(32, 84, 20, 36, 8, p.rockDark);
  s += rr(108, 84, 20, 36, 8, p.rockDark);
  // cabeza cúbica y ojos de fuego
  s += rr(56, 36, 48, 40, 10, p.rock);
  s += pt('M60 36 L52 20 L68 32 Z', p.rockDark); // cuernos de roca
  s += pt('M100 36 L108 20 L92 32 Z', p.rockDark);
  s += ci(70, 56, 6, p.lava);
  s += ci(90, 56, 6, p.lava);
  return s;
}

/* 8. Dragón Guardián */
function dragonParts(p) {
  let s = '';
  // alas majestuosas de dragón
  s += pt('M56 86 L12 40 L24 82 L8 96 L42 108 L56 100 Z', p.wing);
  s += pt('M104 86 L148 40 L136 82 L152 96 L118 108 L104 100 Z', p.wing);
  // garras y cuerpo escamado
  s += rr(60, 114, 17, 28, 7, p.scaleDark);
  s += rr(83, 114, 17, 28, 7, p.scaleDark);
  s += rr(54, 84, 52, 38, 14, p.scale);
  // pecho acorazado
  s += pt('M68 88 L92 88 L86 116 L74 116 Z', p.belly);
  // cabeza de dragón con cuernos hacia atrás
  s += pt('M62 46 L40 20 L64 34 Z', p.horn);
  s += pt('M98 46 L120 20 L96 34 Z', p.horn);
  s += el(80, 56, 26, 22, p.scale);
  s += el(80, 68, 16, 12, p.scaleDark); // hocico
  s += ci(70, 52, 6, p.eyeColor);
  s += ci(90, 52, 6, p.eyeColor);
  // humo / brasa en las fosas
  s += ci(76, 68, 3, p.fire);
  s += ci(84, 68, 3, p.fire);
  return s;
}

/* 9. BLACK (El Jack Supremo) */
function blackParts(p) {
  let s = '';
  // piernas elegantes y botas altas
  s += rr(62, 110, 15, 32, 6, p.armorDark);
  s += rr(83, 110, 15, 32, 6, p.armorDark);
  s += rr(58, 132, 22, 14, 5, p.boot);
  s += rr(80, 132, 22, 14, 5, p.boot);
  // capa del rey con cuello alto alzado
  s += pt('M48 76 L112 76 L122 142 L38 142 Z', p.cloak);
  s += rr(56, 82, 48, 38, 12, p.armor);
  // bordado de Picas de oro en el pecho
  s += pt('M80 92 C74 84 66 94 74 102 L80 108 L86 102 C94 94 86 84 80 92 Z M78 108 L82 108 L84 114 L76 114 Z', p.gold);
  // cetro real rematado en Pica dorada
  s += rr(112, 68, 8, 70, 4, p.gold);
  s += pt('M116 52 C110 44 102 54 110 62 L116 68 L122 62 C130 54 122 44 116 52 Z', p.gold);
  // cabeza aristocrática y corona de oro
  s += ci(80, 54, 25, p.skin);
  s += pt('M58 40 L60 22 L70 32 L80 18 L90 32 L100 22 L102 40 Z', p.crown || p.gold); // corona real
  s += ci(80, 22, 4, p.ruby || '#ef233c');
  s += eyes(p, 72, 88, 56);
  s += pt('M72 70 Q80 76 88 70', p.ink || INK); // sonrisa maquiavélica
  return s;
}

/* ============================================================
   ESCENARIO Y ELEMENTOS DE ENTORNO
   ============================================================ */

/* Torre del 21 (Paper Mario Landscape) */
function towerParts(p) {
  let s = '';
  // colina de piedra base
  s += pt('M10 160 Q80 130 150 160 Z', p.hill || '#1f242d');
  // cuerpo de la torre de piedra
  s += pt('M56 150 L64 36 L96 36 L104 150 Z', p.stone || '#415a77');
  s += pt('M60 150 L66 38 L94 38 L100 150 Z', p.stoneLight || '#778da9');
  // almenas y cúspide
  s += rr(60, 30, 40, 10, 3, p.stoneDark || '#1b263b');
  s += pt('M58 30 L62 16 L70 26 L80 10 L90 26 L98 16 L102 30 Z', p.gold || '#ffd166');
  // ventanas arqueadas iluminadas
  s += rr(74, 52, 12, 18, 6, p.glow || '#ffd166');
  s += rr(74, 82, 12, 18, 6, p.glow || '#ffd166');
  s += rr(74, 112, 12, 18, 6, p.glow || '#ffd166');
  // emblema arcano "21"
  s += pt('M72 138 C68 132 64 138 70 144 L80 148 L90 144 C96 138 92 132 88 138 Z', p.gold || '#ffd166');
  return s;
}

/* Icono de la App Minimalista (Pica Imperial, Corona de la Torre y Grabado 21) */
function iconParts(p) {
  let s = '';
  // 1. Squircle obsidiana profundo
  s += rr(10, 10, 140, 140, 32, p.bg || '#0b132b');
  // 2. Filete dorado satinado interior
  s += `<rect x="16" y="16" width="128" height="128" rx="26" fill="none" stroke="${p.gold || '#ffd166'}" stroke-width="2" opacity="0.6"/>`;
  // 3. Destellos arcanos minimalistas en esquinas
  s += pt('M124 30 L125 34 L129 35 L125 36 L124 40 L123 36 L119 35 L123 34 Z', p.gold || '#ffd166');
  s += pt('M34 120 L35 123 L38 124 L35 125 L34 128 L33 125 L30 124 L33 123 Z', p.gold || '#ffd166');
  // 4. Corona de tres puntas de la Torre del 21
  s += pt('M68 34 L71 22 L76 27 L80 18 L84 27 L89 22 L92 34 Z', p.gold || '#ffd166');
  s += ci(80, 27, 2.5, '#ef233c');
  // 5. Pica Imperial minimalista de oro
  s += pt('M80 40 C66 56 38 72 38 88 C38 102 54 108 66 101 C73 97 77 91 78 85 C76 96 72 108 64 116 L96 116 C88 108 84 96 82 85 C83 91 87 97 94 101 C106 108 122 102 122 88 C122 72 94 56 80 40 Z', p.gold || '#ffd166');
  // 6. Faceta derecha sombreada (efecto 3D pulido y minimalista)
  s += `<path d="M80 40 L80 116 L96 116 C88 108 84 96 82 85 C83 91 87 97 94 101 C106 108 122 102 122 88 C122 72 94 56 80 40 Z" fill="#b45309" opacity="0.22" stroke="none"/>`;
  // 7. Grabado arcano "21" en negativo obsidiana
  s += `<text x="80" y="88" font-family="'Fredoka', 'Nunito', sans-serif" font-weight="900" font-size="24" fill="${p.bg || '#0b132b'}" text-anchor="middle" stroke="none" letter-spacing="-0.5">21</text>`;
  return s;
}

/* ============================================================
   FUNCIÓN GENERADORA SVG
   ============================================================ */
function sprite(bodyFn, pal, poseName, customGround) {
  const pose = (poseName && POSES[poseName]) ? POSES[poseName] : { tf: '' };
  const isCharacter = customGround !== false;
  const BLACK = {};
  for (const k of Object.keys(pal)) BLACK[k] = INK;
  BLACK.ink = INK;
  BLACK.eye = pose.eye;
  BLACK.mouth = pose.mouth;

  const inner = pose.tf ? `<g transform="${pose.tf}">` : '<g>';
  const groundRx = poseName === 'dead' ? 62 : 46;
  const groundCy = poseName === 'dead' ? 130 : 147;

  const ground = customGround !== false ?
    `<ellipse cx="80" cy="${groundCy}" rx="${groundRx}" ry="8" fill="#000" opacity="0.25"/>` : '';

  // Sombra de papel recortado proyectada sobre la superficie
  const shadowStroke = isCharacter ? ` stroke="#000" stroke-width="${CUTOUT_W}" stroke-linejoin="round" stroke-linecap="round"` : '';
  const shadow = `<g transform="${SHADOW_OFFSET}" opacity="${SHADOW_OPACITY}"${shadowStroke}>` +
    inner + bodyFn(BLACK, pose) + '</g></g>';

  // Troquelado artesanal de corte de papel (borde negro exterior continuo hecho a mano estilo Paper Mario)
  const cutout = isCharacter ?
    '  <g stroke="' + INK + '" stroke-width="' + CUTOUT_W + '" stroke-linejoin="round" stroke-linecap="round" fill="' + INK + '">' +
    inner + bodyFn(BLACK, pose) + '</g></g>' : '';

  // Figura principal a color con trazo de tinta artesanal
  const main = `<g stroke="${INK}" stroke-width="${INK_W}" stroke-linejoin="round" stroke-linecap="round">` +
    inner + bodyFn(pal, pose) + '</g></g>';

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`,
    ground ? '  ' + ground : '',
    '  ' + shadow,
    cutout,
    '  ' + main,
    '</svg>',
    ''
  ].filter(Boolean).join('\n');
}

/* ============================================================
   PALETAS DE COLOR
   ============================================================ */
const PAL_KNIGHT = {
  armor: '#c9d4e3', armorDark: '#8496ad', boot: '#5b6b80', skin: '#f4c99b',
  plume: '#e63946', shield: '#2a9d8f', blade: '#e9f1f8', grip: '#8a5a3b',
  gold: '#ffd166', ink: INK, eye: 'dot', mouth: 'smile'
};
const PAL_KNIGHT_GOLDEN = Object.assign({}, PAL_KNIGHT, {
  armor: '#ffd166', armorDark: '#f39c12', boot: '#d35400', plume: '#ffffff',
  shield: '#66fcf1', blade: '#ffffff', gold: '#ffffff'
});
const PAL_KNIGHT_SHADOW = Object.assign({}, PAL_KNIGHT, {
  armor: '#1e293b', armorDark: '#0f172a', boot: '#020617', plume: '#a855f7',
  shield: '#ef4444', blade: '#cbd5e1', gold: '#9333ea'
});

const PAL_ROGUE = {
  armor: '#334155', armorDark: '#1e293b', boot: '#0f172a', pants: '#1e293b',
  skin: '#f4c99b', hood: '#1e293b', cloak: '#0f172a', mask: '#334155',
  belt: '#0f172a', blade: '#e2e8f0', grip: '#78350f', gold: '#ffd166',
  ink: INK, eye: 'dot', mouth: 'smile'
};
const PAL_ROGUE_GOLDEN = Object.assign({}, PAL_ROGUE, {
  armor: '#ca8a04', armorDark: '#854d0e', boot: '#713f12', pants: '#854d0e',
  hood: '#eab308', cloak: '#ca8a04', mask: '#eab308', blade: '#fef08a', gold: '#ffffff'
});
const PAL_ROGUE_PHANTOM = Object.assign({}, PAL_ROGUE, {
  armor: '#06b6d4', armorDark: '#0891b2', boot: '#164e63', pants: '#0e7490',
  skin: '#cffafe', hood: '#0891b2', cloak: '#155e75', mask: '#06b6d4', blade: '#a5f3fc', gold: '#67e8f9'
});

const PAL_MONK = {
  armor: '#e76f51', armorDark: '#c44536', boot: '#582f0e', pants: '#c44536',
  skin: '#f4c99b', beads: '#f4a261', belt: '#264653', wrap: '#f8f9fa',
  dot: '#8a5a3b', gold: '#ffd166', ink: INK, eye: 'dot', mouth: 'smile'
};
const PAL_MONK_LOTUS = Object.assign({}, PAL_MONK, {
  armor: '#fce7f3', armorDark: '#f472b6', boot: '#db2777', pants: '#f472b6',
  beads: '#ec4899', belt: '#9d174d', wrap: '#fdf2f8', dot: '#ec4899', gold: '#f43f5e'
});
const PAL_MONK_ZEN = Object.assign({}, PAL_MONK, {
  armor: '#1e1b4b', armorDark: '#312e81', boot: '#0f172a', pants: '#312e81',
  beads: '#eab308', belt: '#ca8a04', wrap: '#e0e7ff', dot: '#eab308', gold: '#facc15'
});

const PAL_NECRO = {
  armor: '#3b0764', armorDark: '#1e1b4b', boot: '#0f172a', skin: '#e2e8f0',
  hood: '#1e1b4b', bone: '#cbd5e1', magic: '#06d6a0', grip: '#582f0e',
  gold: '#ffd166', ink: INK, eye: 'glow', mouth: 'smile'
};
const PAL_NECRO_LICH = Object.assign({}, PAL_NECRO, {
  armor: '#0284c7', armorDark: '#0369a1', skin: '#f0f9ff',
  hood: '#075985', bone: '#e0f2fe', magic: '#38bdf8', gold: '#7dd3fc'
});
const PAL_NECRO_VOID = Object.assign({}, PAL_NECRO, {
  armor: '#581c87', armorDark: '#3b0764', skin: '#f5d0fe',
  hood: '#2e1065', bone: '#d8b4fe', magic: '#c084fc', gold: '#e9d5ff'
});

/* Paletas de enemigos */
const PAL_GOBLIN = {
  skin: '#55a630', nose: '#2b9348', tunic: '#7f5539', sack: '#b08968',
  gold: '#ffd166', ink: INK
};
const PAL_SKELETON = {
  bone: '#e9ecef', shield: '#8d99ae', blade: '#ced4da', grip: '#5c5552',
  gold: '#ffd166', ink: INK
};
const PAL_ORC = {
  skin: '#406343', skinDark: '#283618', leather: '#582f0e', iron: '#495057',
  wood: '#7f5539', ink: INK
};
const PAL_GARGOYLE = {
  stone: '#6c757d', stoneDark: '#495057', wing: '#343a40', ink: INK
};
const PAL_SHADOWBEAST = {
  fur: '#10002b', furDark: '#240046', eyeGlow: '#ffb703', ink: INK
};
const PAL_CENTURION = {
  armor: '#48cae4', armorDark: '#0077b6', skin: '#90e0ef', shield: '#023e8a',
  crest: '#d90429', wood: '#6c584c', gold: '#ffd166', ink: INK
};
const PAL_OBSIDIAN = {
  rock: '#212529', rockDark: '#0b090a', lava: '#ff4800', ink: INK
};
const PAL_DRAGON = {
  scale: '#d90429', scaleDark: '#9b2226', belly: '#f77f00', wing: '#6a040f',
  horn: '#ffd166', eyeColor: '#ffea00', fire: '#ff5400', ink: INK
};
const PAL_BLACK = {
  armor: '#0d1b2a', armorDark: '#1b263b', boot: '#080e14', cloak: '#1b263b',
  skin: '#e0e1dd', crown: '#ffd166', gold: '#ffd166', ruby: '#ef233c', ink: INK
};

const PAL_TOWER = {
  stone: '#3a506b', stoneLight: '#5bc0be', stoneDark: '#1c2541',
  hill: '#0b132b', gold: '#ffd166', glow: '#ffd166', ink: INK
};
const PAL_ICON = {
  bg: '#0b132b', gold: '#ffd166', ink: INK
};

/* ============================================================
   PLAN DE GENERACIÓN
   ============================================================ */
const PLAN = [
  // 1. Caballero (4 poses)
  { name: 'knight_idle',   body: knightParts, pal: PAL_KNIGHT, pose: 'idle' },
  { name: 'knight_attack', body: knightParts, pal: PAL_KNIGHT, pose: 'attack' },
  { name: 'knight_hurt',   body: knightParts, pal: PAL_KNIGHT, pose: 'hurt' },
  { name: 'knight_dead',   body: knightParts, pal: PAL_KNIGHT, pose: 'dead' },

  // 2. Pícaro (4 poses)
  { name: 'rogue_idle',    body: rogueParts,  pal: PAL_ROGUE,  pose: 'idle' },
  { name: 'rogue_attack',  body: rogueParts,  pal: PAL_ROGUE,  pose: 'attack' },
  { name: 'rogue_hurt',    body: rogueParts,  pal: PAL_ROGUE,  pose: 'hurt' },
  { name: 'rogue_dead',    body: rogueParts,  pal: PAL_ROGUE,  pose: 'dead' },

  // 3. Monje (4 poses)
  { name: 'monk_idle',     body: monkParts,   pal: PAL_MONK,   pose: 'idle' },
  { name: 'monk_attack',   body: monkParts,   pal: PAL_MONK,   pose: 'attack' },
  { name: 'monk_hurt',     body: monkParts,   pal: PAL_MONK,   pose: 'hurt' },
  { name: 'monk_dead',     body: monkParts,   pal: PAL_MONK,   pose: 'dead' },

  // 4. Nigromante (4 poses)
  { name: 'necro_idle',    body: necroParts,  pal: PAL_NECRO,  pose: 'idle' },
  { name: 'necro_attack',  body: necroParts,  pal: PAL_NECRO,  pose: 'attack' },
  { name: 'necro_hurt',    body: necroParts,  pal: PAL_NECRO,  pose: 'hurt' },
  { name: 'necro_dead',    body: necroParts,  pal: PAL_NECRO,  pose: 'dead' },

  // 5. Skins de Caballero
  { name: 'skin_knight_classic', body: knightParts, pal: PAL_KNIGHT,        pose: 'idle' },
  { name: 'skin_knight_golden',  body: knightParts, pal: PAL_KNIGHT_GOLDEN, pose: 'idle' },
  { name: 'skin_knight_shadow',  body: knightParts, pal: PAL_KNIGHT_SHADOW, pose: 'idle' },

  // 6. Skins de Pícaro
  { name: 'skin_rogue_classic',  body: rogueParts,  pal: PAL_ROGUE,         pose: 'idle' },
  { name: 'skin_rogue_golden',   body: rogueParts,  pal: PAL_ROGUE_GOLDEN,  pose: 'idle' },
  { name: 'skin_rogue_phantom',  body: rogueParts,  pal: PAL_ROGUE_PHANTOM, pose: 'idle' },

  // 7. Skins de Monje
  { name: 'skin_monk_classic',   body: monkParts,   pal: PAL_MONK,          pose: 'idle' },
  { name: 'skin_monk_lotus',     body: monkParts,   pal: PAL_MONK_LOTUS,    pose: 'idle' },
  { name: 'skin_monk_zen',       body: monkParts,   pal: PAL_MONK_ZEN,      pose: 'idle' },

  // 8. Skins de Nigromante
  { name: 'skin_necro_classic',  body: necroParts,  pal: PAL_NECRO,         pose: 'idle' },
  { name: 'skin_necro_lich',     body: necroParts,  pal: PAL_NECRO_LICH,    pose: 'idle' },
  { name: 'skin_necro_void',     body: necroParts,  pal: PAL_NECRO_VOID,    pose: 'idle' },

  // 9. Los 9 Enemigos
  { name: 'enemy_goblin',      body: goblinParts,      pal: PAL_GOBLIN,      pose: 'idle' },
  { name: 'enemy_skeleton',    body: skeletonParts,    pal: PAL_SKELETON,    pose: 'idle' },
  { name: 'enemy_orc',         body: orcParts,         pal: PAL_ORC,         pose: 'idle' },
  { name: 'enemy_gargoyle',    body: gargoyleParts,    pal: PAL_GARGOYLE,    pose: 'idle' },
  { name: 'enemy_shadowbeast', body: shadowbeastParts, pal: PAL_SHADOWBEAST, pose: 'idle' },
  { name: 'enemy_centurion',   body: centurionParts,   pal: PAL_CENTURION,   pose: 'idle' },
  { name: 'enemy_obsidian',    body: obsidianParts,    pal: PAL_OBSIDIAN,    pose: 'idle' },
  { name: 'enemy_dragon',      body: dragonParts,      pal: PAL_DRAGON,      pose: 'idle' },
  { name: 'enemy_black',       body: blackParts,       pal: PAL_BLACK,       pose: 'idle' },

  // 10. Entorno e icono
  { name: 'tower',    body: towerParts, pal: PAL_TOWER, pose: null, customGround: false },
  { name: 'app_icon', body: iconParts,  pal: PAL_ICON,  pose: null, customGround: false },
  { name: 'icon',     body: iconParts,  pal: PAL_ICON,  pose: null, customGround: false }
];

fs.mkdirSync(OUT_DIR, { recursive: true });
let written = 0;
for (const item of PLAN) {
  const file = path.join(OUT_DIR, item.name + '.svg');
  fs.writeFileSync(file, sprite(item.body, item.pal, item.pose, item.customGround), 'utf8');
  written++;
  console.log('  OK  assets/svg/' + item.name + '.svg');
}
// 11. Naipes y Palos estilo Paper Mario
const CARDS_DIR = path.join(OUT_DIR, 'cards');
fs.mkdirSync(CARDS_DIR, { recursive: true });

const CARD_ASSETS = [
  {
    name: 'card_back',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" width="100" height="140">
  <rect x="5" y="5" width="90" height="130" rx="8" fill="#17110c" opacity="0.32"/>
  <rect x="2" y="2" width="90" height="130" rx="8" fill="#1c2331" stroke="#17110c" stroke-width="4" stroke-linejoin="round"/>
  <rect x="8" y="8" width="78" height="118" rx="6" fill="#243046" stroke="#ffd166" stroke-width="2.5" stroke-dasharray="6 3"/>
  <circle cx="47" cy="67" r="22" fill="#1c2331" stroke="#ffd166" stroke-width="2"/>
  <path d="M47 53 L52 63 L63 63 L54 70 L57 81 L47 74 L37 81 L40 70 L31 63 L42 63 Z" fill="#ffd166" stroke="#17110c" stroke-width="2"/>
  <text x="47" y="103" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="13" font-weight="bold" fill="#66fcf1" stroke="#17110c" stroke-width="1">21</text>
</svg>`
  },
  {
    name: 'suit_spades',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <path d="M20 4 C15 14 6 18 6 26 C6 31 11 34 16 33 C18 32 19 31 20 29 C21 31 22 32 24 33 C29 34 34 31 34 26 C34 18 25 14 20 4 Z" fill="#1d3557" stroke="#17110c" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M18 29 L16 37 L24 37 L22 29 Z" fill="#1d3557" stroke="#17110c" stroke-width="2.5" stroke-linejoin="round"/>
</svg>`
  },
  {
    name: 'suit_hearts',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <path d="M20 36 C20 36 6 25 6 15 C6 8 12 4 17 6 C19 7 20 9 20 9 C20 9 21 7 23 6 C28 4 34 8 34 15 C34 25 20 36 20 36 Z" fill="#d90429" stroke="#17110c" stroke-width="2.5" stroke-linejoin="round"/>
</svg>`
  },
  {
    name: 'suit_diamonds',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <path d="M20 4 L34 20 L20 36 L6 20 Z" fill="#f77f00" stroke="#17110c" stroke-width="2.5" stroke-linejoin="round"/>
</svg>`
  },
  {
    name: 'suit_clubs',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <circle cx="20" cy="13" r="8" fill="#2a9d8f" stroke="#17110c" stroke-width="2.5"/>
  <circle cx="12" cy="22" r="8" fill="#2a9d8f" stroke="#17110c" stroke-width="2.5"/>
  <circle cx="28" cy="22" r="8" fill="#2a9d8f" stroke="#17110c" stroke-width="2.5"/>
  <path d="M18 22 L15 37 L25 37 L22 22 Z" fill="#2a9d8f" stroke="#17110c" stroke-width="2.5" stroke-linejoin="round"/>
</svg>`
  }
];

for (const card of CARD_ASSETS) {
  const f = path.join(CARDS_DIR, card.name + '.svg');
  fs.writeFileSync(f, card.svg, 'utf8');
}

// 12. Fondos en Aguada de Acuarela (Watercolor Wash)
const BACKGROUND_ASSETS = [
  {
    name: 'bg_tower',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 640" width="360" height="640">
  <defs>
    <radialGradient id="skyWash" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#1b2838"/>
      <stop offset="60%" stop-color="#0f1722"/>
      <stop offset="100%" stop-color="#070a0f"/>
    </radialGradient>
    <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff8db" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#ffd166" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ffd166" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="cloudWash1" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#2a3b50" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#141d28" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="towerBaseWash" cx="50%" cy="85%" r="45%">
      <stop offset="0%" stop-color="#2a9d8f" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#070a0f" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="360" height="640" fill="url(#skyWash)"/>
  <!-- Manchas acuareladas de nubes altas -->
  <path d="M-20 80 Q60 50 140 90 T300 70 Q370 90 390 140 Q350 200 240 170 T60 180 Z" fill="url(#cloudWash1)"/>
  <path d="M20 220 Q120 180 220 230 T380 200 Q400 280 290 300 T80 280 Z" fill="url(#cloudWash1)" opacity="0.6"/>
  <!-- Luna acuarelada difusa -->
  <circle cx="280" cy="110" r="55" fill="url(#moonGlow)"/>
  <circle cx="280" cy="110" r="28" fill="#fff8db" opacity="0.85"/>
  <!-- Resplandor arcano en la base -->
  <circle cx="180" cy="540" r="160" fill="url(#towerBaseWash)"/>
  <!-- Silueta de la Gran Torre 21 (pigmento azul pizarra húmedo) -->
  <path d="M140 180 L180 120 L220 180 L212 260 L228 260 L220 400 L236 400 L248 640 L112 640 L124 400 L140 400 L132 260 L148 260 Z" fill="#141c26" opacity="0.95"/>
  <!-- Aguja y almenas -->
  <path d="M176 90 L184 90 L182 120 L178 120 Z" fill="#ffd166" opacity="0.8"/>
  <polygon points="180,70 176,90 184,90" fill="#ffd166"/>
  <!-- Ventanas con luz de vela dorada acuarelada -->
  <rect x="174" y="220" width="12" height="20" rx="6" fill="#ffd166" opacity="0.75"/>
  <rect x="172" y="320" width="16" height="24" rx="8" fill="#ffd166" opacity="0.65"/>
  <rect x="170" y="440" width="20" height="30" rx="10" fill="#ffd166" opacity="0.7"/>
</svg>`
  },
  {
    name: 'bg_campfire',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 400" width="360" height="400">
  <defs>
    <radialGradient id="fireWash" cx="50%" cy="65%" r="55%">
      <stop offset="0%" stop-color="#ffb703" stop-opacity="0.85"/>
      <stop offset="25%" stop-color="#f77f00" stop-opacity="0.6"/>
      <stop offset="55%" stop-color="#d90429" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0b0c10" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="nightWash" cx="50%" cy="20%" r="80%">
      <stop offset="0%" stop-color="#141923"/>
      <stop offset="100%" stop-color="#080a0f"/>
    </radialGradient>
  </defs>
  <rect width="360" height="400" fill="url(#nightWash)"/>
  <!-- Suelo de tierra y bosque en sombra de pigmento sepia -->
  <ellipse cx="180" cy="380" rx="220" ry="80" fill="#15110d"/>
  <!-- Lavado cálido de la fogata -->
  <circle cx="180" cy="270" r="160" fill="url(#fireWash)"/>
  <!-- Brasas y chispas acuareladas -->
  <circle cx="170" cy="210" r="6" fill="#ffd166" opacity="0.7"/>
  <circle cx="195" cy="190" r="4" fill="#ffb703" opacity="0.8"/>
  <circle cx="160" cy="170" r="3" fill="#f77f00" opacity="0.75"/>
  <circle cx="185" cy="140" r="2.5" fill="#ffd166" opacity="0.6"/>
</svg>`
  },
  {
    name: 'bg_arena',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 640" width="360" height="640">
  <defs>
    <radialGradient id="arenaWash" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#182635" stop-opacity="0.9"/>
      <stop offset="60%" stop-color="#101824" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#080d14"/>
    </radialGradient>
    <radialGradient id="arenaSpotlight" cx="50%" cy="52%" r="40%">
      <stop offset="0%" stop-color="#2a9d8f" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#101824" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="360" height="640" fill="url(#arenaWash)"/>
  <circle cx="180" cy="330" r="150" fill="url(#arenaSpotlight)"/>
  <!-- Círculo arcano sutil de suelo (aguada de piedra) -->
  <ellipse cx="180" cy="360" rx="140" ry="70" fill="none" stroke="#45a29e" stroke-width="2" stroke-dasharray="12 8" opacity="0.2"/>
  <ellipse cx="180" cy="360" rx="90" ry="45" fill="none" stroke="#ffd166" stroke-width="1.5" stroke-dasharray="8 6" opacity="0.18"/>
</svg>`
  },
  {
    name: 'bg_shop',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 500" width="360" height="500">
  <defs>
    <radialGradient id="shopWash" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#29183b"/>
      <stop offset="65%" stop-color="#160e22"/>
      <stop offset="100%" stop-color="#0a0610"/>
    </radialGradient>
    <radialGradient id="goldAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffd166" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#29183b" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="360" height="500" fill="url(#shopWash)"/>
  <circle cx="180" cy="220" r="140" fill="url(#goldAura)"/>
  <!-- Toldo decorativo del Bazar en pigmento vino y dorado -->
  <path d="M20 40 Q90 60 180 45 Q270 60 340 40 L350 90 Q265 110 180 95 Q95 110 10 90 Z" fill="#4a154b" opacity="0.5"/>
</svg>`
  }
];

for (const bg of BACKGROUND_ASSETS) {
  const f = path.join(OUT_DIR, bg.name + '.svg');
  fs.writeFileSync(f, bg.svg, 'utf8');
  written++;
  console.log('  OK  assets/svg/' + bg.name + '.svg');
}

// 13. Iconos de Interfaz y HUD (UI Paper Cutout)
const UI_DIR = path.join(OUT_DIR, 'ui');
fs.mkdirSync(UI_DIR, { recursive: true });

const UI_ICONS = [
  {
    name: 'icon_gold',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <circle cx="23" cy="23" r="16" fill="#17110c" opacity="0.32"/>
  <circle cx="20" cy="20" r="16" fill="#ffb703" stroke="#17110c" stroke-width="3"/>
  <circle cx="20" cy="20" r="11" fill="none" stroke="#ffd166" stroke-width="2"/>
  <text x="20" y="26" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="16" font-weight="bold" fill="#17110c">G</text>
</svg>`
  },
  {
    name: 'icon_crypt',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <path d="M13 8 C13 8 20 4 27 8 C33 12 33 22 29 28 L27 34 L13 34 L11 28 C7 22 7 12 13 8 Z" transform="translate(3,3)" fill="#17110c" opacity="0.32"/>
  <path d="M13 8 C13 8 20 4 27 8 C33 12 33 22 29 28 L27 34 L13 34 L11 28 C7 22 7 12 13 8 Z" fill="#a370f7" stroke="#17110c" stroke-width="3" stroke-linejoin="round"/>
  <!-- Ojos y nariz de cráneo -->
  <ellipse cx="15" cy="18" rx="3.5" ry="4.5" fill="#17110c"/>
  <ellipse cx="25" cy="18" rx="3.5" ry="4.5" fill="#17110c"/>
  <polygon points="20,22 18,25 22,25" fill="#17110c"/>
  <line x1="16" y1="31" x2="16" y2="34" stroke="#17110c" stroke-width="2"/>
  <line x1="20" y1="31" x2="20" y2="34" stroke="#17110c" stroke-width="2"/>
  <line x1="24" y1="31" x2="24" y2="34" stroke="#17110c" stroke-width="2"/>
</svg>`
  },
  {
    name: 'icon_hp',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <path d="M20 34 C20 34 7 24 7 14 C7 8 13 5 17 7 C19 8 20 10 20 10 C20 10 21 8 23 7 C27 5 33 8 33 14 C33 24 20 34 20 34 Z" transform="translate(3,3)" fill="#17110c" opacity="0.32"/>
  <path d="M20 34 C20 34 7 24 7 14 C7 8 13 5 17 7 C19 8 20 10 20 10 C20 10 21 8 23 7 C27 5 33 8 33 14 C33 24 20 34 20 34 Z" fill="#e63946" stroke="#17110c" stroke-width="3" stroke-linejoin="round"/>
  <!-- Brillo de papel recortado -->
  <path d="M12 11 Q15 8 18 9" stroke="#fff" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
</svg>`
  },
  {
    name: 'icon_shield',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <path d="M8 8 L32 8 L32 20 C32 30 20 36 20 36 C20 36 8 30 8 20 Z" transform="translate(3,3)" fill="#17110c" opacity="0.32"/>
  <path d="M8 8 L32 8 L32 20 C32 30 20 36 20 36 C20 36 8 30 8 20 Z" fill="#4cc9f0" stroke="#17110c" stroke-width="3" stroke-linejoin="round"/>
  <path d="M14 13 L26 13 L26 20 C26 26 20 30 20 30 C20 30 14 26 14 20 Z" fill="none" stroke="#fff" stroke-width="2" opacity="0.75"/>
</svg>`
  },
  {
    name: 'icon_card_draw',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <rect x="10" y="8" width="22" height="28" rx="4" transform="translate(2,2)" fill="#17110c" opacity="0.32"/>
  <rect x="7" y="5" width="22" height="28" rx="4" fill="#fbf7ee" stroke="#17110c" stroke-width="3"/>
  <path d="M12 14 L18 8 L24 14" fill="none" stroke="#2a9d8f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="18" y1="8" x2="18" y2="24" stroke="#2a9d8f" stroke-width="3" stroke-linecap="round"/>
</svg>`
  },
  {
    name: 'icon_stand',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <path d="M10 14 L24 6 L30 14 L18 28 L10 24 Z" transform="translate(2,2)" fill="#17110c" opacity="0.32"/>
  <rect x="12" y="8" width="16" height="24" rx="4" fill="#e76f51" stroke="#17110c" stroke-width="3"/>
  <line x1="16" y1="14" x2="24" y2="14" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <line x1="16" y1="20" x2="24" y2="20" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <line x1="16" y1="26" x2="24" y2="26" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
</svg>`
  },
  {
    name: 'icon_potion',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <path d="M16 6 L24 6 L24 12 L30 20 L30 32 L10 32 L10 20 L16 12 Z" transform="translate(2,2)" fill="#17110c" opacity="0.32"/>
  <!-- Tapón de corcho -->
  <rect x="17" y="3" width="6" height="5" rx="1.5" fill="#b07d62" stroke="#17110c" stroke-width="2"/>
  <!-- Frasco de vidrio -->
  <path d="M16 7 L24 7 L24 12 L30 20 C32 24 32 32 28 34 L12 34 C8 32 8 24 10 20 L16 12 Z" fill="#2a9d8f" stroke="#17110c" stroke-width="3" stroke-linejoin="round"/>
  <!-- Reflejo blanco -->
  <path d="M12 24 L14 30" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
</svg>`
  },
  {
    name: 'icon_reroll',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <path d="M20 8 A12 12 0 1 0 32 20" fill="none" stroke="#ffd166" stroke-width="3.5" stroke-linecap="round"/>
  <polyline points="28,4 32,8 28,12" fill="none" stroke="#ffd166" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
  }
];

for (const icon of UI_ICONS) {
  const f = path.join(UI_DIR, icon.name + '.svg');
  fs.writeFileSync(f, icon.svg, 'utf8');
  written++;
  console.log('  OK  assets/svg/ui/' + icon.name + '.svg');
}

// 14. Sprites de la Rueda del Destino (Figura arrodillada y Tumba fúnebre)
const WHEEL_SCENE_SPRITES = [
  {
    name: 'wheel_kneeling',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
  <!-- Suelo de piedra -->
  <ellipse cx="80" cy="144" rx="55" ry="12" fill="#17110c" opacity="0.25"/>
  <!-- Sombra proyectada de papel -->
  <g transform="translate(6,8)" opacity="0.32" fill="#17110c">
    <ellipse cx="80" cy="136" rx="34" ry="16"/>
    <path d="M52 136 L60 90 L100 90 L108 136 Z"/>
    <circle cx="80" cy="74" r="22"/>
    <path d="M46 112 L70 134 L90 134 L114 112 Z"/>
  </g>
  <!-- Figura recortada arrodillada -->
  <g stroke="#17110c" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
    <!-- Capa / túnica rasgada caída -->
    <path d="M50 96 C42 120 46 138 52 142 L108 142 C114 138 118 120 110 96 Z" fill="#2d3748"/>
    <!-- Piernas / rodillas dobladas en el suelo -->
    <rect x="52" y="128" width="24" height="15" rx="6" fill="#1e293b"/>
    <rect x="84" y="128" width="24" height="15" rx="6" fill="#1e293b"/>
    <!-- Torso encorvado hacia la rueda -->
    <path d="M58 88 L102 88 L98 126 L62 126 Z" fill="#334155"/>
    <path d="M68 94 L92 94 L88 120 L72 120 Z" fill="#475569" stroke-width="4"/>
    <!-- Brazos en súplica hacia la rueda -->
    <path d="M58 92 L42 110 L50 126" fill="none" stroke="#334155" stroke-width="10"/>
    <circle cx="50" cy="126" r="6" fill="#e2e8f0" stroke-width="4"/>
    <path d="M102 92 L118 110 L110 126" fill="none" stroke="#334155" stroke-width="10"/>
    <circle cx="110" cy="126" r="6" fill="#e2e8f0" stroke-width="4"/>
    <!-- Cabeza / casco mirando arriba hacia la rueda -->
    <circle cx="80" cy="68" r="20" fill="#1e293b"/>
    <path d="M64 66 C68 54 92 54 96 66 Z" fill="#475569"/>
    <!-- Ojos mirando a la rueda con brillo temeroso / suplicante -->
    <circle cx="73" cy="66" r="4.5" fill="#ffd166" stroke="none"/>
    <circle cx="87" cy="66" r="4.5" fill="#ffd166" stroke="none"/>
    <!-- Cinta / paño de cabeza -->
    <path d="M64 74 Q80 78 96 74" fill="none" stroke="#e63946" stroke-width="4"/>
  </g>
</svg>`
  },
  {
    name: 'wheel_tomb',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
  <!-- Suelo de montículo fúnebre -->
  <ellipse cx="80" cy="146" rx="60" ry="12" fill="#17110c" opacity="0.3"/>
  <!-- Sombra de papel proyectada -->
  <g transform="translate(6,8)" opacity="0.32" fill="#17110c">
    <path d="M50 144 L50 62 C50 38 110 38 110 62 L110 144 Z"/>
  </g>
  <!-- Lápida de piedra estilo Paper Mario -->
  <g stroke="#17110c" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
    <!-- Montículo de tierra recortado -->
    <ellipse cx="80" cy="142" rx="52" ry="12" fill="#292524"/>
    <!-- Lápida pétrea con arco superior -->
    <path d="M50 140 L50 62 C50 36 110 36 110 62 L110 140 Z" fill="#64748b"/>
    <!-- Textura y grieta en la piedra -->
    <path d="M60 48 L70 65 L66 82 L76 95" fill="none" stroke="#334155" stroke-width="3.5"/>
    <!-- Cruz tallada en la lápida -->
    <path d="M80 60 L80 100 M68 74 L92 74" fill="none" stroke="#17110c" stroke-width="6"/>
    <!-- Epitafio RIP grabado en piedra -->
    <text x="80" y="122" text-anchor="middle" font-family="'Nunito', 'Fredoka', sans-serif" font-size="14" font-weight="900" fill="#17110c" stroke="none">R.I.P.</text>
    <!-- Vela izquierda con llama parpadeante -->
    <rect x="36" y="126" width="8" height="18" rx="2" fill="#fef08a"/>
    <ellipse cx="40" cy="120" rx="4" ry="7" fill="#f97316" stroke="#17110c" stroke-width="2"/>
    <!-- Vela derecha con llama -->
    <rect x="116" y="128" width="8" height="16" rx="2" fill="#fef08a"/>
    <ellipse cx="120" cy="122" rx="4" ry="7" fill="#f97316" stroke="#17110c" stroke-width="2"/>
  </g>
</svg>`
  }
];

for (const sp of WHEEL_SCENE_SPRITES) {
  const f = path.join(OUT_DIR, sp.name + '.svg');
  fs.writeFileSync(f, sp.svg, 'utf8');
  written++;
  console.log('  OK  assets/svg/' + sp.name + '.svg');
}

console.log('[build-sprites] ' + written + ' sprite(s) escritos en assets/svg/');
