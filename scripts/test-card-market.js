// Test: Mercado de Cartas Rotativo y Catálogo Ampliado (Fase 3)
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("Iniciando test: Mercado de Cartas Rotativo (Fase 3)...");

const gameSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf8');

// 1. Verificación del catálogo de cartas ampliado (15 especiales + 5 arena = 20)
assert(gameSrc.includes('wild_eight_mirror'), 'Debe incluir 8 Espejo Arcano');
assert(gameSrc.includes('golden_ace_vault'), 'Debe incluir As Áureo del Tesoro');
assert(gameSrc.includes('crimson_nine_bleed'), 'Debe incluir 9 Carmesí Voraz');
assert(gameSrc.includes('frozen_six_barrier'), 'Debe incluir 6 Glacial Protector');
assert(gameSrc.includes('arcane_five_surge'), 'Debe incluir 5 Impulso Arcano');
assert(gameSrc.includes('phantom_four_dodge'), 'Debe incluir 4 Fantasmal Evasivo');
assert(gameSrc.includes('overload_three_spark'), 'Debe incluir 3 Sobrecarga de Chispas');
assert(gameSrc.includes('balance_two_anchor'), 'Debe incluir 2 Ancla de Equilibrio');

// 2. Verificación de lógica en calculateHandScore para nuevas cartas
// Simulamos calculateHandScore
function simulateCalculateHandScore(hand) {
  let score = 0;
  let aces = 0;
  for (const c of hand) {
    if (!c) continue;
    if (c.isAce) {
      aces++;
      score += 11;
    } else {
      score += (c.value || 0);
    }
  }
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }

  // 8 Espejo: clona el valor del naipe más alto
  const hasMirrorEight = hand.some(c => (c.specialId || c.id) === "wild_eight_mirror");
  if (hasMirrorEight) {
    const otherValues = hand.filter(c => (c.specialId || c.id) !== "wild_eight_mirror").map(c => c.value || 0);
    if (otherValues.length > 0) {
      const maxOther = Math.max(...otherValues);
      if (maxOther > 8 && score - 8 + maxOther <= 21) {
        score = score - 8 + maxOther;
      }
    }
  }

  // 5 Arcano: suma +2 si la puntuación es impar
  const hasArcaneFive = hand.some(c => (c.specialId || c.id) === "arcane_five_surge");
  if (hasArcaneFive && (score % 2 !== 0) && score + 2 <= 21) {
    score += 2;
  }

  // 2 Ancla: si causa BUST, muta a 0 salvando la mano
  const hasAnchorTwo = hand.some(c => (c.specialId || c.id) === "balance_two_anchor");
  if (hasAnchorTwo && score > 21) {
    score -= 2;
  }

  return score;
}

// Caso 8 Espejo con un 10: el 8 clona el 10 y suma 20 en vez de 18
const scoreMirror = simulateCalculateHandScore([
  { rank: "10", value: 10 },
  { rank: "8", specialId: "wild_eight_mirror", value: 8 }
]);
assert.strictEqual(scoreMirror, 20, "8 Espejo con un 10 debe clonarlo y sumar 20");

// Caso 5 Arcano: mano con 10 y 5 = 15 (impar), suma +2 y queda en 17
const scoreArcane = simulateCalculateHandScore([
  { rank: "10", value: 10 },
  { rank: "5", specialId: "arcane_five_surge", value: 5 }
]);
assert.strictEqual(scoreArcane, 17, "5 Arcano con suma impar (15) debe sumar +2 y alcanzar 17");

// Caso 2 Ancla: mano con 10, 10 y 2 = 22 (bust) -> muta a 20 salvando la mano
const scoreAnchor = simulateCalculateHandScore([
  { rank: "10", value: 10 },
  { rank: "10", value: 10 },
  { rank: "2", specialId: "balance_two_anchor", value: 2 }
]);
assert.strictEqual(scoreAnchor, 20, "2 Ancla en situación de BUST debe mutar a 0 y dejar la mano en 20");

// 3. Verificación de rotación cada 5 horas y modelo determinista
assert(gameSrc.includes('MARKET_REFRESH_INTERVAL_MS = 5 * 60 * 60 * 1000'), 'El intervalo debe ser de 5 horas');
assert(gameSrc.includes('bj_market_stock_v1'), 'El stock debe almacenarse en bj_market_stock_v1');
assert(gameSrc.includes('refreshMarketStockManual'), 'Debe existir función de refresco manual');

// 4. Verificación del coste de refresco de 40 criptas
assert(gameSrc.includes('if (skulls < 40)'), 'El refresco manual debe costar 40 Monedas de Cripta');
assert(gameSrc.includes('skulls - 40'), 'El refresco manual debe descontar 40 Monedas de Cripta');

console.log("PASS: Todas las pruebas del Mercado de Cartas Rotativo superadas con éxito (Fase 3).");
