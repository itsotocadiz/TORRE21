// Test: Catálogo de 25 Logros y Progresión Permanente (Fase 5)
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("Iniciando test: Catálogo de 25 Logros (Fase 5)...");

const gameSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf8');
const htmlSrc = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const cssSrc = fs.readFileSync(path.join(__dirname, '..', 'css', 'style.css'), 'utf8');

// 1. Verificación de catálogo de 25 logros en game.js
assert(gameSrc.includes('const ACHIEVEMENTS_CATALOG = ['), 'ACHIEVEMENTS_CATALOG debe estar definido en game.js');
assert(gameSrc.includes('window.ACHIEVEMENTS_CATALOG = ACHIEVEMENTS_CATALOG;'), 'ACHIEVEMENTS_CATALOG debe exponerse en window');

// Extraer el catálogo para comprobar longitud y familias
const catalogMatch = gameSrc.match(/const\s+ACHIEVEMENTS_CATALOG\s*=\s*\[([\s\S]*?)\];/);
assert(catalogMatch, 'Debe encontrarse el array ACHIEVEMENTS_CATALOG');

const items = (catalogMatch[1].match(/id:\s*"[^"]+"/g) || []);
assert.strictEqual(items.length, 25, `El catálogo debe contener exactamente 25 logros (encontrados: ${items.length})`);

// 2. Verificación de familias
const families = ["tower", "combat", "economy", "collection", "arena"];
families.forEach(fam => {
  assert(gameSrc.includes(`family: "${fam}"`), `Debe existir la familia de logros ${fam}`);
});

// 3. Verificación de métodos y clave de persistencia
assert(gameSrc.includes('bj_achievements_v1'), 'Debe utilizar la clave de persistencia bj_achievements_v1');
assert(gameSrc.includes('function unlockAchievement'), 'Debe implementar unlockAchievement');
assert(gameSrc.includes('function getUnlockedAchievements'), 'Debe implementar getUnlockedAchievements');
assert(gameSrc.includes('function openAchievementsModal'), 'Debe implementar openAchievementsModal');
assert(gameSrc.includes('function renderAchievementsList'), 'Debe implementar renderAchievementsList');

// 4. Verificación de UI en HTML y CSS
assert(htmlSrc.includes('id="screen-achievements-modal"'), 'index.html debe tener el modal de logros');
assert(htmlSrc.includes('openAchievementsModal()'), 'index.html debe tener botón para abrir logros');
assert(cssSrc.includes('.achievements-overlay'), 'style.css debe definir estilos de logros');
assert(cssSrc.includes('.achievement-row'), 'style.css debe definir estilos para cada fila de logro');

// 5. Prueba funcional simulada de desbloqueo y cálculo de progreso
let mockStorage = {};
const fakeLocalStorage = {
  getItem: (k) => mockStorage[k] || null,
  setItem: (k, v) => { mockStorage[k] = String(v); }
};

function simulateUnlock(id, catalog) {
  const ach = catalog.find(a => a.id === id);
  if (!ach) return false;
  let unlocked = {};
  try {
    unlocked = JSON.parse(fakeLocalStorage.getItem("bj_achievements_v1") || "{}");
  } catch (_) {}
  if (unlocked[id]) return false; // ya estaba
  unlocked[id] = Date.now();
  fakeLocalStorage.setItem("bj_achievements_v1", JSON.stringify(unlocked));
  return true;
}

const mockCatalog = [
  { id: "tower_first_step", family: "tower" },
  { id: "combat_first_bj", family: "combat" },
  { id: "eco_first_gold", family: "economy" },
  { id: "col_first_hero", family: "collection" }
];

mockStorage = {};
let didUnlock = simulateUnlock("tower_first_step", mockCatalog);
assert.strictEqual(didUnlock, true, "Debe desbloquearse con éxito el primer logro");

let data = JSON.parse(fakeLocalStorage.getItem("bj_achievements_v1"));
assert(data.tower_first_step, "El logro debe persistir en storage");

// Re-desbloqueo (idempotencia)
didUnlock = simulateUnlock("tower_first_step", mockCatalog);
assert.strictEqual(didUnlock, false, "No debe duplicarse ni re-desbloquearse un logro ya completado");

// Desbloquear otro
simulateUnlock("combat_first_bj", mockCatalog);
data = JSON.parse(fakeLocalStorage.getItem("bj_achievements_v1"));
const count = Object.keys(data).length;
assert.strictEqual(count, 2, "Debe haber 2 logros completados");
const pct = Math.round((count / mockCatalog.length) * 100);
assert.strictEqual(pct, 50, "El progreso debe ser 50%");

console.log("PASS: Todas las pruebas del Catálogo de 25 Logros superadas con éxito (Fase 5).");
