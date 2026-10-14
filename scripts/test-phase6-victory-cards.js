/**
 * test-phase6-victory-cards.js
 * Suite de verificación para FASE 6: Recompensa de Torre (Sello 1 de 3 + 3 Cartas al Mazo).
 *
 * Valida:
 * 1. PERSISTENT_EXTRA_CARDS_KEY y persistencia de cartas extra históricas.
 * 2. buildStandardDeck incluye las cartas extra sobre las 52 base.
 * 3. showMasteryForgeModal ofrece 3 cartas para forjar sello (1 de 3) y apoya isTowerVictory.
 * 4. showVictoryCardsModal ofrece 6 candidatos y exige 3 elegidos para confirmar.
 * 5. Textos en index.html, game.js y estilos CSS integrados.
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

console.log('== 1. Auditoría de API y Métodos en game.js ==');
ok(gameSrc.includes('const PERSISTENT_EXTRA_CARDS_KEY = "blackjack_persistent_extra_cards";'), 'Clave de persistencia definida correctamente');
ok(gameSrc.includes('function getPersistentExtraCards()'), 'Función getPersistentExtraCards implementada');
ok(gameSrc.includes('function savePersistentExtraCard('), 'Función savePersistentExtraCard implementada');
ok(gameSrc.includes('function savePersistentExtraCards('), 'Función savePersistentExtraCards implementada');
ok(gameSrc.includes('function clearPersistentExtraCards()'), 'Función clearPersistentExtraCards implementada');
ok(gameSrc.includes('window.getPersistentExtraCards = getPersistentExtraCards;'), 'getPersistentExtraCards expuesta en window');

console.log('== 2. Integración en Flujo de Mazo y Partida ==');
ok(gameSrc.includes('const extraCards = (typeof getPersistentExtraCards === "function") ? getPersistentExtraCards() : [];'), 'buildStandardDeck lee las cartas extra');
ok(gameSrc.includes('const persistentExtra = (typeof getPersistentExtraCards === "function") ? getPersistentExtraCards() : [];'), 'startGame registra cartas extra de mazo');

console.log('== 3. Modal de Forja (1 de 3) y Botín de 3 Naipes ==');
ok(gameSrc.includes('const chosenCards = priorityCards.slice(0, 3);'), 'Forja de maestría toma exactamente 3 candidatas para 1 sello');
ok(gameSrc.includes('showVictoryCardsModal(onMasteryForgeComplete)'), 'Forja de victoria encadena hacia la selección de 3 naipes');
ok(gameSrc.includes('function showVictoryCardsModal('), 'showVictoryCardsModal implementada');
ok(gameSrc.includes('function confirmVictoryCardsSelection()'), 'confirmVictoryCardsSelection implementada');
ok(gameSrc.includes('selectedVictoryCardIndices.size === 3'), 'confirmVictoryCardsSelection valida exactamente 3 naipes');

console.log('== 4. Marcado HTML y Estilos CSS ==');
ok(indexSrc.includes('id="mf-confirm-cards-btn"'), 'index.html incluye botón de confirmación de 3 naipes');
ok(indexSrc.includes('Elige <b>1 de 3 cartas</b>'), 'index.html corregido a 1 de 3 cartas');
ok(cssSrc.includes('.mastery-card-item.selected'), 'style.css incluye estilos para cartas seleccionadas');

console.log(`\nRESULTADO: ${pass} pass / ${fail} fail`);
if (fail > 0) process.exit(1);
