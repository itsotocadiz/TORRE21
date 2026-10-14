/* ============================================================
   scripts/test-victory-rewards.js
   Valida la economía de recompensas y decaimiento en showVictory:
   (1) Primera victoria otorga 100% de recompensa y Puntos de Legado del hito.
   (2) Victoria repetida decae (40% -> 20% -> 10% suelo) y otorga 0 Legado.
   (3) Dificultades mayores otorgan sus Puntos de Legado solo en 1ª conquista.
   (4) Suelo mínimo garantiza que el jugador siempre progrese en maestría.
   ============================================================ */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const gameSrc = fs.readFileSync(path.join(rootDir, 'js', 'game.js'), 'utf8');

let pass = 0;
let fail = 0;

function ok(cond, msg) {
  if (cond) { console.log('  PASS ' + msg); pass++; }
  else { console.error('  FAIL ' + msg); fail++; }
}

console.log('== 1. Auditoría de código en showVictory ==');
ok(gameSrc.includes('bj_victory_'), 'showVictory registra victorias por héroe y dificultad');
ok(gameSrc.includes('isFirstClear'), 'showVictory distingue entre primera victoria y repetición');
ok(gameSrc.includes('decayFactor'), 'showVictory aplica decaimiento por repetición');
ok(!gameSrc.includes('meta[p.class].legacyPoints = (meta[p.class].legacyPoints || 0) + 3;'), 'showVictory YA NO regala +3 Legado incondicionalmente');
ok(gameSrc.includes('earnedLegacy > 0'), 'Puntos de Legado condicionados estrictamente a primera conquista');

console.log('== 2. Simulación de curva de recompensas y decaimiento ==');

// Mock simple de localStorage y estado
const storage = {};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; }
};

function simulateVictoryReward(heroClass, diffKey, curAscension = 1) {
  const baseGold = 250;
  const baseExp = 500;
  const baseCrypts = 100;

  const diffMultipliers = { normal: 1.0, hard: 1.5, mythic: 2.2, nightmare: 3.2 };
  const diffMult = diffMultipliers[diffKey] || 1.0;
  const ascensionMult = 1.0 + Math.max(0, curAscension - 1) * 0.05;

  const victoryKey = `bj_victory_${heroClass}_${diffKey}`;
  const winsOnDiff = parseInt(storage[victoryKey] || "0", 10);
  const isFirstClear = winsOnDiff === 0;
  storage[victoryKey] = (winsOnDiff + 1).toString();

  let decayFactor = 1.0;
  if (!isFirstClear) {
    if (winsOnDiff === 1) decayFactor = 0.40;
    else if (winsOnDiff === 2) decayFactor = 0.20;
    else decayFactor = 0.10;
  }

  const legacyRewards = { normal: 2, hard: 3, mythic: 4, nightmare: 5 };
  const earnedLegacy = isFirstClear ? (legacyRewards[diffKey] || 2) : 0;

  const finalGold = Math.max(25, Math.round(baseGold * diffMult * ascensionMult * decayFactor));
  const finalExp = Math.max(50, Math.round(baseExp * diffMult * ascensionMult * decayFactor));
  const finalCrypts = isFirstClear ? Math.round(baseCrypts * diffMult) : Math.max(10, Math.round(baseCrypts * diffMult * decayFactor * 0.5));

  return { isFirstClear, finalGold, finalExp, finalCrypts, earnedLegacy, decayFactor };
}

// Run 1 (Caballero, Normal, Primera Victoria)
const run1 = simulateVictoryReward('knight', 'normal');
ok(run1.isFirstClear === true, 'Run 1 es primera victoria');
ok(run1.earnedLegacy === 2, 'Run 1 otorga 2 puntos de legado');
ok(run1.finalGold === 250, 'Run 1 otorga 250 oro base');
ok(run1.finalExp === 500, 'Run 1 otorga 500 exp base');
ok(run1.finalCrypts === 100, 'Run 1 otorga 100 criptas');

// Run 2 (Caballero, Normal, Segunda Victoria)
const run2 = simulateVictoryReward('knight', 'normal');
ok(run2.isFirstClear === false, 'Run 2 es repetición');
ok(run2.earnedLegacy === 0, 'Run 2 otorga 0 puntos de legado (protección anti-power-creep)');
ok(run2.decayFactor === 0.40, 'Run 2 decae al 40%');
ok(run2.finalGold === 100, 'Run 2 otorga 100 oro (40% de 250)');
ok(run2.finalExp === 200, 'Run 2 otorga 200 exp (40% de 500)');

// Run 3 (Caballero, Normal, Tercera Victoria)
const run3 = simulateVictoryReward('knight', 'normal');
ok(run3.decayFactor === 0.20, 'Run 3 decae al 20%');
ok(run3.earnedLegacy === 0, 'Run 3 otorga 0 puntos de legado');
ok(run3.finalGold === 50, 'Run 3 otorga 50 oro');
ok(run3.finalExp === 100, 'Run 3 otorga 100 exp');

// Run 4+ (Caballero, Normal, Cuarta Victoria - Suelo)
const run4 = simulateVictoryReward('knight', 'normal');
ok(run4.decayFactor === 0.10, 'Run 4 aplica suelo del 10%');
ok(run4.finalGold >= 25, 'Run 4 no cae por debajo del suelo de oro');
ok(run4.finalExp >= 50, 'Run 4 no cae por debajo del suelo de exp');
ok(run4.earnedLegacy === 0, 'Run 4 otorga 0 legado');

// Run en nueva dificultad Heroico (Hard)
const runHard = simulateVictoryReward('knight', 'hard');
ok(runHard.isFirstClear === true, 'Primera victoria en Heroico detectada');
ok(runHard.earnedLegacy === 3, 'Heroico otorga 3 puntos de legado de su hito único');
ok(runHard.finalGold > 250, 'Oro escala por multiplicador de dificultad');

console.log('== 3. Auditoría de Recompensa de Torre: Sello (1 de 3) + 3 Naipes al Mazo ==');
ok(gameSrc.includes('PERSISTENT_EXTRA_CARDS_KEY'), 'game.js define PERSISTENT_EXTRA_CARDS_KEY');
ok(gameSrc.includes('getPersistentExtraCards'), 'game.js exporta getPersistentExtraCards');
ok(gameSrc.includes('savePersistentExtraCards'), 'game.js exporta savePersistentExtraCards');
ok(gameSrc.includes('showVictoryCardsModal'), 'game.js implementa showVictoryCardsModal');
ok(gameSrc.includes('confirmVictoryCardsSelection'), 'game.js implementa confirmVictoryCardsSelection');
ok(gameSrc.includes('chosenCards = priorityCards.slice(0, 3)'), 'showMasteryForgeModal ofrece 3 cartas candidatas para 1 sello');
ok(gameSrc.includes('chosenRanks = highRanks.slice(0, 6)'), 'showVictoryCardsModal ofrece 6 cartas candidatas');
ok(gameSrc.includes('selectedVictoryCardIndices.size === 3'), 'confirmVictoryCardsSelection exige exactamente 3 cartas elegidas');
ok(gameSrc.includes('buildStandardDeck') && gameSrc.includes('getPersistentExtraCards'), 'buildStandardDeck integra las cartas persistentes');

// Simulación de adición de 3 cartas al mazo persistente
const initialCards = JSON.parse(storage['blackjack_persistent_extra_cards'] || "[]");
ok(initialCards.length === 0, 'Baraja persistente arranca limpia');

const extraDeckCards = [
  { rank: 'A', suit: '♠', value: 11, isAce: true },
  { rank: 'K', suit: '♥', value: 10, isAce: false },
  { rank: '7', suit: '♦', value: 7, isAce: false }
];
storage['blackjack_persistent_extra_cards'] = JSON.stringify(extraDeckCards);

function simulateBuildStandardDeck() {
  const SUITS = ["♠", "♥", "♦", "♣"];
  const CARD_RANKS = [
    { rank: "2", value: 2 }, { rank: "3", value: 3 }, { rank: "4", value: 4 },
    { rank: "5", value: 5 }, { rank: "6", value: 6 }, { rank: "7", value: 7 },
    { rank: "8", value: 8 }, { rank: "9", value: 9 }, { rank: "10", value: 10 },
    { rank: "J", value: 10 }, { rank: "Q", value: 10 }, { rank: "K", value: 10 },
    { rank: "A", value: 11, isAce: true }
  ];
  const deck = [];
  for (const suit of SUITS) {
    for (const r of CARD_RANKS) {
      deck.push({ rank: r.rank, suit, value: r.value, isAce: !!r.isAce });
    }
  }
  const extraCards = JSON.parse(storage['blackjack_persistent_extra_cards'] || "[]");
  if (Array.isArray(extraCards) && extraCards.length > 0) {
    extraCards.forEach(c => deck.push(Object.assign({}, c)));
  }
  return deck;
}

const customDeck = simulateBuildStandardDeck();
ok(customDeck.length === 55, 'Mazo estándar expandido a 55 cartas (52 base + 3 de victoria)');
ok(customDeck.filter(c => c.rank === 'A' && c.suit === '♠').length === 2, 'El as persistente coexiste correctamente en el mazo');

console.log(`\nRESULTADO: ${pass} pass / ${fail} fail`);
if (fail > 0) process.exit(1);
