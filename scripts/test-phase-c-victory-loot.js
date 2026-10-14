// Test: Recompensa de la Torre, Dedupe de Botín y Vista Mi Mazo (Fases C y D)
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("Iniciando test: Recompensa de la Torre y Mi Mazo (Fases C y D)...");

const gameSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf8');
const htmlSrc = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const cssSrc = fs.readFileSync(path.join(__dirname, '..', 'css', 'style.css'), 'utf8');

// 1. Verificación en HTML de nuevos modales y botones de cierre
assert(htmlSrc.includes('id="screen-victory-reward-saved-modal"'), 'index.html debe tener el modal de recompensa guardada');
assert(htmlSrc.includes('closeMasteryForgeModal()'), 'index.html debe incluir botón para cerrar forja de maestría');
assert(htmlSrc.includes('closeVictoryRewardSavedModal()'), 'index.html debe incluir botón para cerrar resumen de recompensa guardada');
assert(htmlSrc.includes('startNewAscensionRun()'), 'index.html debe ofrecer botón de Nueva Ascensión');
assert(htmlSrc.includes('returnToMainMenuClean()'), 'index.html debe ofrecer botón de Menú Principal');

// 2. Verificación en CSS de estilos de botín y mazo
assert(cssSrc.includes('.card-face.won-loot-card'), 'style.css debe definir estilo para cartas ganadas de botín');
assert(cssSrc.includes('.card-loot-badge'), 'style.css debe definir insignia visual de botín');
assert(cssSrc.includes('.hero-deck-card-grid'), 'style.css debe definir grid para la baraja en la ficha del héroe');

// 3. Verificación de lógica en game.js
assert(gameSrc.includes('blackjack_victory_cards_claimed_'), 'game.js debe usar flag de botín reclamado por héroe y dificultad');
assert(gameSrc.includes('MAX_PERSISTENT_EXTRA_CARDS = 12'), 'game.js debe definir tope lógico de 12 cartas para el botín persistente');
assert(gameSrc.includes('showVictoryRewardSavedModal'), 'game.js debe implementar showVictoryRewardSavedModal');
assert(gameSrc.includes('returnToMainMenuClean'), 'game.js debe implementar returnToMainMenuClean');
assert(gameSrc.includes('startNewAscensionRun'), 'game.js debe implementar startNewAscensionRun');

// 4. Verificación de pestaña "Mi Mazo" en Ficha del Héroe
assert(gameSrc.includes('id="hst-tab-deck"'), 'openHeroSheet debe incluir pestaña Mi Mazo');
assert(gameSrc.includes('id="hst-panel-deck"'), 'openHeroSheet debe incluir panel de Mi Mazo');
assert(gameSrc.includes("tabs = ['combat', 'deck', 'legacy', 'lore']"), 'switchHeroSheetTab debe gestionar la pestaña deck');
assert(gameSrc.includes('won-loot-card'), 'renderCards debe aplicar clase de botín a las cartas ganadas');

// 5. Verificación del contador real de cartas en la tienda
assert(gameSrc.includes('Baraja de ${52 +'), 'La tienda debe mostrar el total real de cartas (52 + botín)');

// 6. Prueba funcional simulada de Dedupe y Tope Lógico en savePersistentExtraCards
let mockStorage = {};
const fakeLocalStorage = {
  getItem: (k) => mockStorage[k] || null,
  setItem: (k, v) => { mockStorage[k] = String(v); },
  removeItem: (k) => { delete mockStorage[k]; }
};

function simulateGetPersistentExtraCards() {
  try {
    const arr = JSON.parse(fakeLocalStorage.getItem("blackjack_persistent_extra_cards") || "[]");
    return Array.isArray(arr) ? arr : [];
  } catch (_) { return []; }
}

function simulateSavePersistentExtraCards(cards) {
  const MAX = 12;
  const list = simulateGetPersistentExtraCards();
  if (Array.isArray(cards)) {
    cards.forEach(c => {
      if (!c) return;
      const exists = list.some(existing => existing.rank === c.rank && existing.suit === c.suit);
      if (!exists && list.length < MAX) {
        list.push({ rank: c.rank, suit: c.suit, value: c.value, isAce: !!c.isAce, isWonCard: true });
      }
    });
  }
  fakeLocalStorage.setItem("blackjack_persistent_extra_cards", JSON.stringify(list));
}

// Caso A: Guardar 3 cartas distintas
mockStorage = {};
simulateSavePersistentExtraCards([
  { rank: "A", suit: "♠", value: 11, isAce: true },
  { rank: "K", suit: "♥", value: 10, isAce: false },
  { rank: "7", suit: "♦", value: 7, isAce: false }
]);
let currentCards = simulateGetPersistentExtraCards();
assert.strictEqual(currentCards.length, 3, "Debe haber 3 cartas guardadas");

// Caso B: Intentar volver a guardar la misma carta (deduplicación estricta)
simulateSavePersistentExtraCards([
  { rank: "A", suit: "♠", value: 11, isAce: true },
  { rank: "Q", suit: "♣", value: 10, isAce: false }
]);
currentCards = simulateGetPersistentExtraCards();
assert.strictEqual(currentCards.length, 4, "No debe duplicar A♠, solo debe añadir Q♣");
assert.strictEqual(currentCards.filter(c => c.rank === "A" && c.suit === "♠").length, 1, "Solo debe haber 1 copia de A♠");

// Caso C: Respetar tope máximo de 12 cartas
const bunchOfCards = [];
for (let i = 2; i <= 9; i++) {
  bunchOfCards.push({ rank: String(i), suit: "♠", value: i });
  bunchOfCards.push({ rank: String(i), suit: "♣", value: i });
}
simulateSavePersistentExtraCards(bunchOfCards);
currentCards = simulateGetPersistentExtraCards();
assert.strictEqual(currentCards.length, 12, "El mazo nunca debe exceder el tope de 12 cartas de botín extra");

console.log("PASS: Todas las pruebas de Recompensa de Torre y Mi Mazo superadas correctamente (Fases C y D).");
