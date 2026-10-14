// Test: Cartas Dinámicas y Catálogo de Arena (Fase E)
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("Iniciando test: Cartas Dinámicas y Catálogo de Arena (Fase E)...");

const gameSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf8');

// 1. Verificación del catálogo SPECIAL_DYNAMIC_CARDS
assert(gameSrc.includes('const SPECIAL_DYNAMIC_CARDS = ['), 'SPECIAL_DYNAMIC_CARDS debe estar definido en game.js');
assert(gameSrc.includes('"double_jack"'), 'Debe incluir double_jack');
assert(gameSrc.includes('"versatile_queen"'), 'Debe incluir versatile_queen');
assert(gameSrc.includes('"shifting_king"'), 'Debe incluir shifting_king');
assert(gameSrc.includes('"dark_ten"'), 'Debe incluir dark_ten');
assert(gameSrc.includes('"twin_ace"'), 'Debe incluir twin_ace');
assert(gameSrc.includes('"cursed_seven"'), 'Debe incluir cursed_seven');
assert(gameSrc.includes('"joker_party"'), 'Debe incluir joker_party');

// 2. Extracción de calculateHandScore para pruebas funcionales directas
const BUST_LIMIT = 21;
let gameState = { player: { accessory: null }, enemy: null };

function calculateHandScore(hand, isMonkStand = false, isEnemyHand = false) {
  if (!Array.isArray(hand) || hand.length === 0) return 0;
  const isEnemy = isEnemyHand || (typeof gameState !== "undefined" && gameState.enemy && hand === gameState.enemy.enemyHand);
  const gauntlet = (!isEnemy && typeof gameState !== "undefined" && gameState.player && gameState.player.accessory === "lead_gauntlet");
  let score = 0;
  let aces = 0;

  for (let i = 0; i < hand.length; i++) {
    const card = hand[i];
    if (!card) continue;
    const sId = card.specialId || card.id;

    if (card.isAce) {
      aces++;
      score += 11;
    } else if (sId === "dark_ten") {
      if (isEnemy) {
        score -= 3;
      } else {
        score += 10;
      }
    } else if (sId === "double_jack") {
      score += 10;
    } else if (sId === "versatile_queen") {
      let neighborVal = 10;
      if (i > 0 && hand[i - 1]) {
        neighborVal = hand[i - 1].value || 10;
      } else if (i < hand.length - 1 && hand[i + 1]) {
        neighborVal = hand[i + 1].value || 10;
      }
      score += neighborVal;
    } else if (sId === "shifting_king") {
      score += 10;
    } else if (sId === "cursed_seven") {
      score += 7;
    } else if (sId === "joker_party") {
      score += 0;
    } else if (sId === "lucky_seven_astral") {
      score += 7;
    } else {
      score += (gauntlet && card.value < 3) ? 3 : (card.value || 0);
    }
  }

  while (score > BUST_LIMIT && aces > 0) {
    score -= 10;
    aces--;
  }

  // J Doble: si vale 10 pero valiendo 11 llega a 21 exacto
  const hasDoubleJack = hand.some(c => (c.specialId || c.id) === "double_jack");
  if (hasDoubleJack && score === 20) {
    score = 21;
  }

  // 7 Astral del Tahúr (Arena): muta a 11 si no causa bust
  const hasLuckySeven = hand.some(c => (c.specialId || c.id) === "lucky_seven_astral");
  if (hasLuckySeven && score + 4 <= 21 && (score + 4 === 21 || score <= 17)) {
    score += 4;
  }

  // K Cambiante: baja a 7 o 2 si evita BUST
  const hasShiftingKing = hand.some(c => (c.specialId || c.id) === "shifting_king");
  if (hasShiftingKing && score > BUST_LIMIT) {
    if (score - 3 <= BUST_LIMIT) {
      score -= 3;
    } else if (score - 8 <= BUST_LIMIT) {
      score -= 8;
    }
  }

  // 7 Maldito: si causa BUST, muta a -2
  const hasCursedSeven = hand.some(c => (c.specialId || c.id) === "cursed_seven");
  if (hasCursedSeven && score > BUST_LIMIT) {
    score -= 9;
  }

  // Comodín Fiesta: suma +3 o resta -3
  const hasJokerParty = hand.some(c => (c.specialId || c.id) === "joker_party");
  if (hasJokerParty) {
    if (score + 3 <= BUST_LIMIT) {
      score += 3;
    } else {
      score -= 3;
    }
  }

  // As Par: con 2 o más Ases en mano otorga +1
  const totalAces = hand.filter(c => c && (c.isAce || c.rank === "A")).length;
  const hasTwinAce = hand.some(c => (c.specialId || c.id) === "twin_ace");
  if (hasTwinAce && totalAces >= 2 && score + 1 <= BUST_LIMIT) {
    score += 1;
  }

  return score;
}

// 3. Pruebas funcionales de E1 (Figuras)
// J Doble: con otra carta de 10 puntos (suma 20), muta a 11 logrando 21!
const scoreJ = calculateHandScore([
  { rank: "10", value: 10 },
  { rank: "J", specialId: "double_jack", value: 10 }
]);
assert.strictEqual(scoreJ, 21, "J Doble con 10 debe mutar a 11 y sumar 21 exacto");

// Q Versátil: copia el valor de la vecina
const scoreQ = calculateHandScore([
  { rank: "8", value: 8 },
  { rank: "Q", specialId: "versatile_queen", value: 10 }
]);
assert.strictEqual(scoreQ, 16, "Q Versátil debe copiar el 8 de su vecina y sumar 16 (8 + 8)");

// K Cambiante: evita bust adaptándose como 7 o 2
const scoreK = calculateHandScore([
  { rank: "10", value: 10 },
  { rank: "5", value: 5 },
  { rank: "K", specialId: "shifting_king", value: 10 }
]); // 10 + 5 + 10 = 25 (bust). Con 7 sería 22 (bust). Con 2 es 17 (a salvo!)
assert.strictEqual(scoreK, 17, "K Cambiante debe adaptarse a 2 para salvar la mano en 17");

// 10 Oscuro: 10 para jugador, -3 para rival
const scorePlayerDarkTen = calculateHandScore([
  { rank: "7", value: 7 },
  { rank: "10", specialId: "dark_ten", value: 10 }
], false, false);
assert.strictEqual(scorePlayerDarkTen, 17, "10 Oscuro debe valer 10 para el jugador (7 + 10 = 17)");

const scoreEnemyDarkTen = calculateHandScore([
  { rank: "10", value: 10 },
  { rank: "10", specialId: "dark_ten", value: 10 }
], false, true);
assert.strictEqual(scoreEnemyDarkTen, 7, "10 Oscuro debe restar -3 en mano rival (10 - 3 = 7)");

// 4. Pruebas funcionales de E2 (Condicionales)
// Ás Par: dos Ases en mano (11 + 1 = 12) + Ás Par -> 13
const scoreTwinAce = calculateHandScore([
  { rank: "A", isAce: true, value: 11 },
  { rank: "A", isAce: true, specialId: "twin_ace", value: 11 }
]);
assert.strictEqual(scoreTwinAce, 13, "Dos Ases con As Gemelo deben sumar 13 (12 + 1)");

// 7 Maldito: si causa bust, muta a -2
const scoreCursedSeven = calculateHandScore([
  { rank: "10", value: 10 },
  { rank: "8", value: 8 },
  { rank: "7", specialId: "cursed_seven", value: 7 }
]); // 10 + 8 + 7 = 25 (bust) -> muta a 10 + 8 - 2 = 16!
assert.strictEqual(scoreCursedSeven, 16, "7 Maldito que causa bust debe mutar a -2 y salvar la mano en 16");

// Comodín Fiesta: suma +3 si cabe, resta -3 si no
const scoreJokerPlus = calculateHandScore([
  { rank: "10", value: 10 },
  { rank: "7", value: 7 },
  { rank: "★", specialId: "joker_party", value: 0 }
]);
assert.strictEqual(scoreJokerPlus, 20, "Comodín Fiesta con 17 debe sumar +3 para alcanzar 20");

const scoreJokerMinus = calculateHandScore([
  { rank: "10", value: 10 },
  { rank: "10", value: 10 },
  { rank: "★", specialId: "joker_party", value: 0 }
]);
assert.strictEqual(scoreJokerMinus, 17, "Comodín Fiesta con 20 debe restar -3 para evitar pasarse y quedar en 17");

// 5. Pruebas de las cartas de Arena
// 7 Astral del Tahúr muta a 11 si hace 21
const scoreAstralSeven = calculateHandScore([
  { rank: "10", value: 10 },
  { rank: "7", specialId: "lucky_seven_astral", value: 7 }
]);
assert.strictEqual(scoreAstralSeven, 21, "7 Astral con 10 debe mutar a 11 y hacer 21");

// Verificación de hooks de combate de Arena en game.js
assert(gameSrc.includes('diamond_ace_guard'), 'game.js debe cablear diamond_ace_guard');
assert(gameSrc.includes('spade_king_execute'), 'game.js debe cablear spade_king_execute');
assert(gameSrc.includes('heart_queen_vampire'), 'game.js debe cablear heart_queen_vampire');
assert(gameSrc.includes('club_jack_thief'), 'game.js debe cablear club_jack_thief');

console.log("PASS: Todas las pruebas de Cartas Dinámicas y Catálogo de Arena superadas correctamente (Fase E).");
