// Test: Habilidades de Héroe y Rasgos de Rivales 100% Ejecutables (v1.9.3)
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("Iniciando test: Habilidades de Héroe y Rasgos de Rivales...");

const gameSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf8');
const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const styleCss = fs.readFileSync(path.join(__dirname, '..', 'css', 'style.css'), 'utf8');

// 1. Verificación de HERO_SKILLS en game.js
assert(gameSrc.includes('const HERO_SKILLS = {'), 'HERO_SKILLS debe estar definido en game.js');
assert(gameSrc.includes('vorpal_execution:'), 'Debe incluir vorpal_execution');
assert(gameSrc.includes('immortal_bulwark:'), 'Debe incluir immortal_bulwark');
assert(gameSrc.includes('arcane_twentyone:'), 'Debe incluir arcane_twentyone');
assert(gameSrc.includes('crimson_feast:'), 'Debe incluir crimson_feast');
assert(gameSrc.includes('champion_devastation:'), 'Debe incluir champion_devastation');
assert(gameSrc.includes('window.HERO_SKILLS = HERO_SKILLS;'), 'HERO_SKILLS debe exponerse globalmente');

// 2. Verificación de UI para Habilidad de Héroe
assert(indexHtml.includes('id="btn-hero-skill"'), 'index.html debe contener el botón #btn-hero-skill');
assert(indexHtml.includes('onclick="triggerHeroSkill()"'), 'El botón debe llamar a triggerHeroSkill()');
assert(styleCss.includes('.btn-hero-skill'), 'css/style.css debe definir .btn-hero-skill');
assert(styleCss.includes('.skill-status-pill'), 'css/style.css debe definir .skill-status-pill');

// 3. Verificación de Códice y Ficha de Personaje
assert(indexHtml.includes('id="codex-tab-skills"'), 'index.html debe contener el botón de pestaña #codex-tab-skills');
assert(gameSrc.includes('tab === "skills"'), 'switchCodexTab debe manejar la pestaña skills');
assert(gameSrc.includes('⚡ HABILIDAD ACTIVA DE COMBATE'), 'openHeroSheet debe mostrar la sección de habilidad de combate');

// 4. Verificación de rasgos mecánicos de enemigos en resolveHandResult
// ★ ROBO (Duende)
assert(gameSrc.includes('e.trait === "thief"'), 'thief debe evaluarse en resolveHandResult');
assert(gameSrc.includes('gameState._duendeStolenGold'), 'Debe acumular oro robado para devolución');
assert(gameSrc.includes('curPShield - 3') || gameSrc.includes('curPShield'), 'Debe drenar escudo si oro es 0');

// ★ PESTE (Alimaña)
assert(gameSrc.includes('e.trait === "plague"'), 'plague debe evaluarse en resolveHandResult');
assert(gameSrc.includes('gameState.status.playerPoison = (gameState.status.playerPoison || 0) + 2;'), 'Debe aplicar +2 de veneno');
assert(gameSrc.includes('p.def = Math.max(0, p.def - 1);'), 'Debe reducir DEF en -1');

// ★ RESURRECCIÓN (Esqueleto)
assert(gameSrc.includes('e.trait === "undead"'), 'undead debe evaluarse en resolveHandResult');
assert(gameSrc.includes('e._resurrected'), 'Debe controlar resurrección con _resurrected');
assert(gameSrc.includes('Math.round(e.maxHp * 0.35)'), 'Debe revivir con el 35% de vida máxima');

// ★ FURIA (Orco)
assert(gameSrc.includes('e.trait === "fury"'), 'fury debe evaluarse en resolveHandResult');
assert(gameSrc.includes('e.pwr = (e.pwr || 16) + 2;'), 'Debe aumentar ATQ en +2 permanentemente');
assert(gameSrc.includes('e._furyEnraged'), 'Debe verificar enojo extremo al bajar del 50% de HP');

// ★ CAPARAZÓN (Escarabajo)
assert(gameSrc.includes('e.trait === "carapace"'), 'carapace debe evaluarse');
assert(gameSrc.includes('curShield + 4'), 'Debe regenerar +4 de escudo al finalizar la mano');

// ★ PONZOÑA (Víbora)
assert(gameSrc.includes('e.trait === "venom"'), 'venom debe evaluarse');
assert(gameSrc.includes('gameState.status.playerPoison = (gameState.status.playerPoison || 0) + 3;'), 'Debe inocular +3 de veneno');

// ★ PIEL PÉTREA / BALUARTE (Gárgola / Valquiria)
assert(gameSrc.includes('dmg = Math.max(0, dmg - 2);'), 'Piel pétrea debe mitigar 2 de daño');
assert(gameSrc.includes('e.enemyScore >= 19 && e.enemyScore <= 21'), 'Baluarte debe activarse con 19, 20 o 21');

// ★ JEFES DE CAPÍTULO
assert(gameSrc.includes('e.trait === "spade_lord"'), 'spade_lord debe evaluarse');
assert(gameSrc.includes('e.trait === "diamond_aegis"'), 'diamond_aegis debe evaluarse');
assert(gameSrc.includes('e.trait === "arcane_burst"'), 'arcane_burst debe evaluarse');
assert(gameSrc.includes('e.trait === "void_drain"'), 'void_drain debe evaluarse');
assert(gameSrc.includes('e.trait === "shadow_gamble"'), 'shadow_gamble debe evaluarse');
assert(gameSrc.includes('e.trait === "mandinga_abyss"'), 'mandinga_abyss debe evaluarse');

// 5. Verificación de Desbloqueo Automático en Nivel 6 y Re-roll en Forja (v1.9.8)
assert(gameSrc.includes('getHeroDefaultStartingSkill'), 'game.js debe definir getHeroDefaultStartingSkill');
assert(gameSrc.includes('isSkillEligibleAtStart = ((p.level || heroLevel || 1) >= 6)'), 'startGame debe evaluar si heroLevel >= 6');
assert(gameSrc.includes('p.level >= 6 && (!p.skillUnlocked || !p.activeSkill)'), 'gainExp debe auto-desbloquear la habilidad en nivel 6');
assert(gameSrc.includes('Se desbloquea automáticamente al alcanzar el Nivel 6'), 'triggerHeroSkill debe avisar que se desbloquea en Nivel 6');
assert(gameSrc.includes('REQUIERE NIVEL 6'), 'La Forja debe bloquear el botón antes de nivel 6');
assert(gameSrc.includes('RE-ROLL (CAMBIAR)'), 'La Forja debe permitir Re-roll si es nivel 6 o superior');

console.log("PASS: Todas las pruebas de Habilidades de Héroe y Rasgos de Rivales superadas con éxito.");

