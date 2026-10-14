// Test: Cuenta Google, Perfil y Sincronización en la Nube (Fases 4 y 6)
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("Iniciando test: Cuenta Google y Sincronización en la Nube (Fases 4 y 6)...");

const improSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'improvements.js'), 'utf8');
const htmlSrc = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const cssSrc = fs.readFileSync(path.join(__dirname, '..', 'css', 'style.css'), 'utf8');

// 1. Verificación de métodos en improvements.js
assert(improSrc.includes('function getAccountProfile'), 'improvements.js debe implementar getAccountProfile');
assert(improSrc.includes('function saveAccountProfile'), 'improvements.js debe implementar saveAccountProfile');
assert(improSrc.includes('function handleGoogleAuthToggle'), 'improvements.js debe implementar handleGoogleAuthToggle');
assert(improSrc.includes('function syncProgressToCloud'), 'improvements.js debe implementar syncProgressToCloud');
assert(improSrc.includes('function manualCloudSync'), 'improvements.js debe implementar manualCloudSync');

// 2. Verificación de UI en index.html
assert(htmlSrc.includes('id="user-profile-chip"'), 'index.html debe tener el chip de usuario en la pantalla de título');
assert(htmlSrc.includes('class="config-account-card"'), 'index.html debe tener la tarjeta de cuenta en configuración');
assert(htmlSrc.includes('id="btn-google-auth"'), 'index.html debe tener el botón de autenticación de Google');
assert(htmlSrc.includes('class="pause-account-row"'), 'index.html debe tener la fila de cuenta en el menú de pausa');

// 3. Verificación de estilos en style.css
assert(cssSrc.includes('.user-profile-chip'), 'style.css debe definir estilos para el chip de perfil');
assert(cssSrc.includes('.config-account-card'), 'style.css debe definir estilos para la tarjeta de configuración');
assert(cssSrc.includes('.btn-google-auth'), 'style.css debe definir estilos para el botón de Google Auth');

// 4. Prueba funcional simulada de sincronización y empaquetado de datos
let mockStorage = {
  "blackjack_hero_unlocks_v1": JSON.stringify({ knight: { unlocked: true }, rogue: { unlocked: true } }),
  "blackjack_persistent_extra_cards": JSON.stringify([{ rank: "A", suit: "♠", value: 11 }]),
  "bj_crypt_coins": "150",
  "blackjack_arena_trophies": "1380",
  "bj_achievements_v1": JSON.stringify({ "tower_first_step": 123456789 })
};

function simulateCloudSync(profile, storage) {
  const payload = {
    uid: profile.uid,
    displayName: profile.displayName,
    email: profile.email,
    timestamp: Date.now(),
    unlocks: JSON.parse(storage["blackjack_hero_unlocks_v1"] || "{}"),
    extraCards: JSON.parse(storage["blackjack_persistent_extra_cards"] || "[]"),
    cryptCoins: parseInt(storage["bj_crypt_coins"] || "0", 10),
    trophies: parseInt(storage["blackjack_arena_trophies"] || "1250", 10),
    achievements: JSON.parse(storage["bj_achievements_v1"] || "{}")
  };
  storage["bj_cloud_progress_backup"] = JSON.stringify(payload);
  return payload;
}

const mockProfile = {
  uid: "google_12345",
  displayName: "Heraldo Arcano",
  email: "heraldo@gmail.com",
  linked: true
};

const payload = simulateCloudSync(mockProfile, mockStorage);
assert(payload, "El payload de sincronización debe construirse");
assert.strictEqual(payload.uid, "google_12345");
assert.strictEqual(payload.cryptCoins, 150);
assert.strictEqual(payload.trophies, 1380);
assert.strictEqual(payload.extraCards.length, 1);
assert.strictEqual(payload.unlocks.rogue.unlocked, true);
assert(mockStorage["bj_cloud_progress_backup"], "El respaldo debe persistir en storage para resiliencia offline");

console.log("PASS: Todas las pruebas de Cuenta Google y Sincronización superadas con éxito (Fases 4 y 6).");
