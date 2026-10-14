/**
 * test-sprint-gamble-and-filters.js
 * Verificación exhaustiva de:
 * 1. Intro particles sin "+1", naipes reales
 * 2. Filtros por palo en la Crónica / Inspección de baraja
 * 3. Bazar con solo 4 pestañas (sin yunque)
 * 4. Sobres ordinarios aplican a 1 carta individual
 * 5. Yunque Tahúr de Apuesta Riesgosa con tiers de oro elevado y grupos de lote al ganar
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  PASS  ${name}`);
    passed++;
  } catch (e) {
    console.error(`  FAIL  ${name}: ${e.message}`);
    failed++;
  }
}

console.log("\n== 1. Partículas de la Intro (Naipes reales sin '+1') ==");
const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const styleCss = fs.readFileSync(path.join(__dirname, '..', 'css', 'style.css'), 'utf8');
const gameJs = fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf8');

test("index.html: naipes de intro no contienen tag '+1'", () => {
  const introCardsMatch = indexHtml.match(/<div class="intro-cards-container"[\s\S]*?>([\s\S]*?)<\/div>/);
  assert(introCardsMatch, "Debe existir intro-cards-container");
  assert(!introCardsMatch[1].includes("+1"), "No debe tener '+1' en las partículas de intro");
  assert(introCardsMatch[1].includes("intro-card-rank"), "Debe tener contenedor de rango");
  assert(introCardsMatch[1].includes("intro-card-suit"), "Debe tener contenedor de palo");
});

test("css/style.css: estilo de partícula naipe vertical", () => {
  assert(styleCss.includes(".intro-card-particle"), "Debe existir clase .intro-card-particle");
  assert(styleCss.includes(".intro-card-rank"), "Debe existir clase .intro-card-rank");
  assert(styleCss.includes(".intro-card-suit"), "Debe existir clase .intro-card-suit");
});

console.log("\n== 2. Filtros por palo en la baraja (Crónica e Inspección) ==");
test("game.js: soporte de filtro por palo en renderHandDeckFan", () => {
  assert(gameJs.includes("activeFanSuitFilter"), "Debe definir activeFanSuitFilter");
  assert(gameJs.includes("fan-suit-filters"), "Debe renderizar la barra fan-suit-filters");
  assert(gameJs.includes("setFanSuitFilter"), "Debe existir función window.setFanSuitFilter");
});

test("css/style.css: estilos de barra de filtros por palo y scroll fluido", () => {
  assert(styleCss.includes(".fan-suit-filters"), "Debe existir .fan-suit-filters");
  assert(styleCss.includes(".fan-suit-btn"), "Debe existir .fan-suit-btn");
  assert(styleCss.includes(".hand-deck-cards-scroll"), "Debe existir .hand-deck-cards-scroll");
});

console.log("\n== 3. Bazar del Destino (solo 4 pestañas: Provisiones, Artefactos, Sobres, Tesoro Real) ==");
test("showShopModal: no contiene botón de pestaña Yunque en la navegación", () => {
  const shopTabsMatch = gameJs.match(/<div class="shop-tabs-nav">([\s\S]*?)<\/div>/);
  assert(shopTabsMatch, "Debe existir shop-tabs-nav");
  const navContent = shopTabsMatch[1];
  assert(!navContent.includes("🔨 YUNQUE"), "No debe tener la pestaña 🔨 YUNQUE en el bazar");
  assert(navContent.includes("PROVISIONES"), "Debe tener Provisiones");
  assert(navContent.includes("ARTEFACTOS"), "Debe tener Artefactos");
  assert(navContent.includes("SOBRES"), "Debe tener Sobres");
  assert(navContent.includes("TESORO REAL"), "Debe tener Tesoro Real");
});

test("cardsBoosterHtml en tienda describe imbuir 1 carta individual", () => {
  assert(gameJs.includes("1 sola carta"), "cardsBoosterHtml debe indicar que encanta 1 sola carta");
  assert(gameJs.includes("Sobre de Sellos Arcanos"), "Título debe ser Sobre de Sellos Arcanos");
});

console.log("\n== 4. Sobres ordinarios aplican a 1 sola carta ==");
test("game.js: generatePackOptions separa arcane (individual) de arcane_group (lote)", () => {
  assert(gameJs.includes('packType === "arcane_group"'), "Debe verificar packType arcane_group");
  assert(gameJs.includes('drawCandidatesForEnchantment'), "Debe definir drawCandidatesForEnchantment");
});

test("choosePackOption: sobre común abre renderBoosterModal para elegir 1 carta", () => {
  const chooseMatch = gameJs.match(/function choosePackOption\(idx\) {([\s\S]*?)\n  window\.choosePackOption/);
  assert(chooseMatch, "Debe existir choosePackOption");
  const body = chooseMatch[1];
  assert(body.includes("activeBoosterPack = {"), "Debe armar activeBoosterPack");
  assert(body.includes("renderBoosterModal()"), "Debe invocar renderBoosterModal para 1 carta");
  assert(body.includes("applyArchetypeBlessing"), "Debe reservar applyArchetypeBlessing para arcane_group");
});

console.log("\n== 5. El Yunque Tahúr (Pantalla modal y apuesta riesgosa) ==");
test("index.html: contiene modal #screen-gamble-forge y sus elementos", () => {
  assert(indexHtml.includes('id="screen-gamble-forge"'), "Debe existir #screen-gamble-forge");
  assert(indexHtml.includes('id="gamble-forge-gold"'), "Debe existir #gamble-forge-gold");
  assert(indexHtml.includes('id="gamble-forge-crypt"'), "Debe existir #gamble-forge-crypt");
  assert(indexHtml.includes('id="gamble-tiers-container"'), "Debe existir #gamble-tiers-container");
  assert(indexHtml.includes('id="gamble-forge-btn"'), "Debe existir #gamble-forge-btn");
  assert(indexHtml.includes('executeGambleForge()'), "Debe tener executeGambleForge");
});

test("game.js: GAMBLE_FORGE_TIERS con costes elevados de oro y probabilidades solicitadas", () => {
  assert(gameJs.includes("GAMBLE_FORGE_TIERS = {"), "Debe definir GAMBLE_FORGE_TIERS");
  // Extraer valores usando regex
  const goldMatch = gameJs.match(/gold:\s*{[\s\S]*?costGold:\s*(\d+)[\s\S]*?prob:\s*(\d+)/);
  assert(goldMatch, "Debe existir tier gold");
  assert(parseInt(goldMatch[1], 10) >= 80, `Coste de oro debe ser >= 80 (es ${goldMatch[1]})`);
  assert(parseInt(goldMatch[2], 10) === 25, `Probabilidad oro debe ser 25% (es ${goldMatch[2]})`);

  const hybridMatch = gameJs.match(/hybrid:\s*{[\s\S]*?costGold:\s*(\d+)[\s\S]*?costCrypt:\s*(\d+)[\s\S]*?prob:\s*(\d+)/);
  assert(hybridMatch, "Debe existir tier hybrid");
  assert(parseInt(hybridMatch[1], 10) >= 100, `Coste de oro híbrido debe ser >= 100 (es ${hybridMatch[1]})`);
  assert(parseInt(hybridMatch[2], 10) >= 10, `Coste de criptas híbrido debe ser >= 10 (es ${hybridMatch[2]})`);
  assert(parseInt(hybridMatch[3], 10) === 45, `Probabilidad híbrida debe ser 45% (es ${hybridMatch[3]})`);

  const cryptMatch = gameJs.match(/crypt:\s*{[\s\S]*?costCrypt:\s*(\d+)[\s\S]*?prob:\s*(\d+)/);
  assert(cryptMatch, "Debe existir tier crypt");
  assert(parseInt(cryptMatch[1], 10) >= 25, `Coste de criptas debe ser >= 25 (es ${cryptMatch[1]})`);
  assert(parseInt(cryptMatch[2], 10) === 60, `Probabilidad cripta debe ser 60% (es ${cryptMatch[2]})`);
});

test("game.js: controladores del modal tahúr exportados a window", () => {
  assert(gameJs.includes("window.openGambleForgeModal = openGambleForgeModal;"), "Exporta openGambleForgeModal");
  assert(gameJs.includes("window.closeGambleForgeModal = closeGambleForgeModal;"), "Exporta closeGambleForgeModal");
  assert(gameJs.includes("window.selectGambleTier = selectGambleTier;"), "Exporta selectGambleTier");
  assert(gameJs.includes("window.renderGambleTiers = renderGambleTiers;"), "Exporta renderGambleTiers");
  assert(gameJs.includes("window.executeGambleForge = executeGambleForge;"), "Exporta executeGambleForge");
  assert(gameJs.includes("window.playAnvilStrikeSound = playAnvilStrikeSound;"), "Exporta playAnvilStrikeSound");
});

test("showRewardModal: la 3ª puerta abre el Yunque Tahúr", () => {
  const rewardMatch = gameJs.match(/function showRewardModal\(\) {([\s\S]*?)\n  function chooseForgeReward/);
  assert(rewardMatch, "Debe existir showRewardModal");
  assert(rewardMatch[1].includes("openGambleForgeModal()"), "3ª opción debe llamar a openGambleForgeModal");
  assert(rewardMatch[1].includes("EL YUNQUE TAHÚR"), "Título de 3ª opción debe ser EL YUNQUE TAHÚR");
});

console.log("\n=======================================");
console.log(`TOTAL: ${passed} pass / ${failed} fail`);
if (failed > 0) process.exit(1);
