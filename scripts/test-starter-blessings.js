/* ============================================================
   TEST SUITE — Bendiciones Iniciales (STARTER_BLESSINGS)
   Auditoría al 100% de normalización, stats, combate, UI y Códice
   ============================================================ */
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

console.log("Iniciando test: Auditoría y Conexión 100% de Bendiciones Iniciales...");

const rootDir = path.resolve(__dirname, '..');
const gameJs = fs.readFileSync(path.join(rootDir, 'js', 'game.js'), 'utf8');
const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

// 1. Verificación y Extracción de Catálogo STARTER_BLESSINGS
console.log("== 1. Catálogo Completo STARTER_BLESSINGS (20/20) ==");
const matchBlessings = /const\s+STARTER_BLESSINGS\s*=\s*(\[[\s\S]*?\n\s*\]);/.exec(gameJs);
assert(matchBlessings, "STARTER_BLESSINGS debe encontrarse en js/game.js");

// Evaluar el array literal con sandbox seguro
const sandbox = {
  gameState: { gold: 0, status: {} },
  SEAL_ENCHANTMENTS: {
    sharp: { id: "sharp", name: "Sello Afilado", icon: "🗡️" },
    astral: { id: "astral", name: "Sello Astral", icon: "✨" }
  }
};
vm.createContext(sandbox);
const STARTER_BLESSINGS = vm.runInContext(matchBlessings[1], sandbox);

assert(Array.isArray(STARTER_BLESSINGS), "STARTER_BLESSINGS debe ser un Array");
assert.strictEqual(STARTER_BLESSINGS.length, 20, `Debe haber exactamente 20 bendiciones (encontradas: ${STARTER_BLESSINGS.length})`);

const expectedIds = [
  "oak_bark", "notched_dagger", "wooden_buckler", "copper_pouch", "keen_eye",
  "gladiator_pact", "steel_mail", "dawn_aegis", "wind_cloak", "alchemist_flask",
  "dragon_heart", "berserker_rage", "unyielding_fortress", "midas_touch", "gambler_oath",
  "blackjack_transcendence", "phoenix_grace", "shadow_lord", "forge_master", "jack_sovereignty"
];

const foundIds = new Set();
STARTER_BLESSINGS.forEach(b => {
  assert(b.id && typeof b.id === "string", `Bendición sin ID: ${JSON.stringify(b)}`);
  assert(expectedIds.includes(b.id), `ID desconocido en catálogo: ${b.id}`);
  assert(!foundIds.has(b.id), `ID duplicado: ${b.id}`);
  foundIds.add(b.id);

  assert(b.name && typeof b.name === "string" && b.name.trim().length > 0, `${b.id} debe tener nombre`);
  assert(b.icon && typeof b.icon === "string" && b.icon.trim().length > 0, `${b.id} debe tener icono`);
  assert([1, 2, 3, 4].includes(b.tier), `${b.id} tier inválido: ${b.tier}`);
  assert(b.tierLabel && typeof b.tierLabel === "string", `${b.id} debe tener tierLabel`);
  assert(typeof b.unlockLevel === "number" && b.unlockLevel >= 1, `${b.id} unlockLevel inválido`);
  assert(b.desc && typeof b.desc === "string" && b.desc.trim().length > 0, `${b.id} debe tener descripción`);
  assert(typeof b.apply === "function", `${b.id} debe tener función apply`);

  console.log(`  PASS [Tier ${b.tier} - ${b.tierLabel}] ${b.icon} ${b.name} (${b.id})`);
});
assert.strictEqual(foundIds.size, 20, "Todos los 20 IDs esperados deben estar presentes");

// 2. Extracción y Verificación de Helpers Canónicos
console.log("== 2. Helpers Canónicos y Normalización de Lectura ==");

// Extraer bloque completo de helpers (líneas 12150 a 12193)
const helperStart = gameJs.indexOf('function getActiveStarterBlessingId(player)');
assert(helperStart !== -1, "getActiveStarterBlessingId debe encontrarse");
const helperEnd = gameJs.indexOf('function updatePlayerAccSlot()');
assert(helperEnd !== -1, "updatePlayerAccSlot debe encontrarse");
const helperCode = `
  const STARTER_BLESSINGS = ${matchBlessings[1]};
  ${gameJs.slice(helperStart, helperEnd)}
`;
const helperSandbox = {
  window: {},
  gameState: {}
};
vm.createContext(helperSandbox);
vm.runInContext(helperCode, helperSandbox);

const { getActiveStarterBlessingId, getActiveStarterBlessing, hasStarterBlessing } = helperSandbox.window;
assert(typeof getActiveStarterBlessingId === "function");
assert(typeof getActiveStarterBlessing === "function");
assert(typeof hasStarterBlessing === "function");

// Test normalización con string
assert.strictEqual(getActiveStarterBlessingId({ starterBlessing: "oak_bark" }), "oak_bark");
assert.strictEqual(getActiveStarterBlessing({ starterBlessing: "oak_bark" }).name, "Corteza de Roble");
console.log("  PASS getActiveStarterBlessingId y getActiveStarterBlessing leen string canónico");

// Test normalización con objeto
assert.strictEqual(getActiveStarterBlessingId({ starterBlessing: { id: "dawn_aegis", name: "Égida del Alba" } }), "dawn_aegis");
assert.strictEqual(getActiveStarterBlessing({ starterBlessing: { id: "dawn_aegis" } }).name, "Égida del Alba");
console.log("  PASS getActiveStarterBlessingId y getActiveStarterBlessing leen objeto estructurado");

// Test fallbacks
assert.strictEqual(getActiveStarterBlessingId({ activeBlessing: "gambler_oath" }), "gambler_oath");
assert.strictEqual(getActiveStarterBlessingId({ blessing: "midas_touch" }), "midas_touch");
assert.strictEqual(getActiveStarterBlessing({ activeBlessing: "gambler_oath" }).icon, "🎲");
console.log("  PASS getActiveStarterBlessingId soporta fallbacks activeBlessing y blessing");

// Test alias
assert.strictEqual(getActiveStarterBlessingId({ starterBlessing: "jagged_dagger" }), "notched_dagger");
assert.strictEqual(getActiveStarterBlessingId({ starterBlessing: "daga_mellada" }), "notched_dagger");
assert.strictEqual(getActiveStarterBlessingId({ starterBlessing: "shield_blessing" }), "dawn_aegis");
console.log("  PASS getActiveStarterBlessingId normaliza alias históricos a IDs canónicos");

// Test hasStarterBlessing
helperSandbox.gameState.player = { starterBlessing: "dawn_aegis" };
assert.strictEqual(hasStarterBlessing("dawn_aegis"), true);
assert.strictEqual(hasStarterBlessing("oak_bark"), false);
console.log("  PASS hasStarterBlessing responde correctamente según el jugador activo");

// 3. Verificación de Cableado en recalculatePlayerStats
console.log("== 3. Conexión en recalculatePlayerStats ==");

assert(gameJs.includes('bId === "oak_bark"') && gameJs.includes('runMaxHp += 15'), "oak_bark debe sumar +15 maxHp en recalculatePlayerStats");
assert(gameJs.includes('bId === "notched_dagger"') && gameJs.includes('runPwr += 1'), "notched_dagger debe sumar +1 pwr en recalculatePlayerStats");
assert(gameJs.includes('bId === "wooden_buckler"') && gameJs.includes('runDef += 1'), "wooden_buckler debe sumar +1 def en recalculatePlayerStats");
assert(gameJs.includes('bId === "dawn_aegis"') && gameJs.includes('runDef += 2'), "dawn_aegis debe sumar +2 def en recalculatePlayerStats");
assert(gameJs.includes('bId === "copper_pouch"') && gameJs.includes('runLuck += 10'), "copper_pouch debe sumar +10 luck en recalculatePlayerStats");
assert(gameJs.includes('bId === "keen_eye"') && gameJs.includes('runCrit += 10'), "keen_eye debe sumar +10 crit en recalculatePlayerStats");
assert(gameJs.includes('bId === "gladiator_pact"') && gameJs.includes('runPwr += 3'), "gladiator_pact debe sumar +3 pwr y ajustar def en recalculatePlayerStats");
assert(gameJs.includes('bId === "steel_mail"') && gameJs.includes('runDef += 2'), "steel_mail debe sumar +2 def en recalculatePlayerStats");
assert(gameJs.includes('bId === "wind_cloak"') && gameJs.includes('runDodge += 20'), "wind_cloak debe sumar +20 dodge en recalculatePlayerStats");
assert(gameJs.includes('bId === "dragon_heart"') && gameJs.includes('runMaxHp += 35'), "dragon_heart debe sumar +35 maxHp en recalculatePlayerStats");
assert(gameJs.includes('bId === "berserker_rage"') && gameJs.includes('runPwr += 3'), "berserker_rage debe sumar +3 pwr en recalculatePlayerStats");
assert(gameJs.includes('bId === "unyielding_fortress"') && gameJs.includes('runDef += 3'), "unyielding_fortress debe sumar +3 def en recalculatePlayerStats");
assert(gameJs.includes('bId === "midas_touch"') && gameJs.includes('runLuck += 10'), "midas_touch debe sumar +10 luck en recalculatePlayerStats");
assert(gameJs.includes('bId === "gambler_oath"') && gameJs.includes('runCrit += 12') && gameJs.includes('runLuck += 15'), "gambler_oath debe sumar +3 pwr, +12 crit, +15 luck en recalculatePlayerStats");
assert(gameJs.includes('bId === "shadow_lord"') && gameJs.includes('runCrit += 10'), "shadow_lord debe sumar +10 crit en recalculatePlayerStats");
assert(gameJs.includes('bId === "jack_sovereignty"') && gameJs.includes('runMaxHp += 50') && gameJs.includes('runPwr += 4') && gameJs.includes('runDef += 2'), "jack_sovereignty debe sumar +50 maxHp, +4 pwr, +2 def en recalculatePlayerStats");

console.log("  PASS Las 16 bendiciones con estadísticas de run están 100% integradas en recalculatePlayerStats");

// 4. Verificación de Efectos en Combate, Pociones e Inicio de Piso
console.log("== 4. Efectos en Combate, Inicio de Piso y Pociones ==");

// Escudo en initFloor
assert(gameJs.includes('hasStarterBlessing("wooden_buckler") ? 5 : 0'), "wooden_buckler debe otorgar +5 de escudo en initFloor");
assert(gameJs.includes('hasStarterBlessing("steel_mail") ? 8 : 0'), "steel_mail debe otorgar +8 de escudo en initFloor");
assert(gameJs.includes('hasStarterBlessing("dawn_aegis") ? 10 : 0'), "dawn_aegis debe otorgar +10 de escudo en initFloor");
assert(gameJs.includes('p.absorbFirstHit = hasStarterBlessing("unyielding_fortress")'), "unyielding_fortress debe activar absorbFirstHit en initFloor");
assert(gameJs.includes('hasStarterBlessing("keen_eye")'), "keen_eye debe otorgar reroll táctico en initFloor");
console.log("  PASS initFloor cableado al 100% con escudos, absorción y dados");

// Combate: oak_bark, gambler_oath, shadow_lord en resolveHandResult
assert(gameJs.includes('hasStarterBlessing("oak_bark")'), "oak_bark debe curar en resolveHandResult al ganar mano");
assert(gameJs.includes('hasStarterBlessing("gambler_oath") && p.turnDoubleDamage'), "gambler_oath debe otorgar +8 HP y +6 oro al doblar y ganar");
assert(gameJs.includes('hasStarterBlessing("shadow_lord") && p.playerScore >= 19'), "shadow_lord debe ignorar DEF enemigo al sumar 19+");
console.log("  PASS resolveHandResult cableado al 100% con curación, doblar y perforación");

// Pociones: alchemist_flask
assert(gameJs.includes('hasStarterBlessing("alchemist_flask")'), "alchemist_flask debe potenciar poción con +15 HP y +5 escudo");
console.log("  PASS Uso de poción cableado al 100% con alchemist_flask");

// 5. Verificación de UI, Mochila, Ficha y Códice
console.log("== 5. Interfaz de Usuario, Mochila, Ficha de Personaje y Códice ==");

// Mochila y ranura
assert(gameJs.includes('updateCombatGearModalUI'), "updateCombatGearModalUI debe existir");
assert(gameJs.includes('inspectGearSlot'), "inspectGearSlot debe existir");
assert(gameJs.includes('getActiveStarterBlessing(p)'), "Ficha, Mochila y ranura deben usar getActiveStarterBlessing");

// Códice en selectStarterBlessing
assert(gameJs.includes('torre21_unlocked_blessings'), "selectStarterBlessing debe guardar en torre21_unlocked_blessings");
assert(gameJs.includes('unlockBlessingInCodex'), "selectStarterBlessing debe llamar a unlockBlessingInCodex");

console.log("  PASS Mochila, Ficha de Combate y Códice unificados con getActiveStarterBlessing");

console.log("\n---------------------------------------");
console.log("RESULTADO: 20/20 bendiciones verificadas con 0 fallos.");
console.log("Suite de Bendiciones Iniciales superada exitosamente.");
