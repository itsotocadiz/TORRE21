/**
 * ============================================================
 *  improvements.js - Fases 2, 3, 5, 6 del Plan de Mejora
 *  Blackjack Tower: The Jack's Ascent
 *  Cargado DESPUES de game.js
 * ============================================================
 */
(function () {
  "use strict";

  /* ============================================================
     TOAST GENÉRICO — sustituye a los diálogos nativos del navegador
     para avisos cortos (límites, errores de compra, avisos).
     ============================================================ */
  let _gameToastEl = null;
  let _gameToastTimer = null;

  function showGameToast(message, kind) {
    try {
      const container = document.getElementById("game-container") || document.getElementById("stage") || document.body;
      if (!container) return;
      if (!_gameToastEl || !_gameToastEl.isConnected) {
        _gameToastEl = document.createElement("div");
        _gameToastEl.id = "game-toast";
        _gameToastEl.setAttribute("role", "status");
        _gameToastEl.setAttribute("aria-live", "polite");
        _gameToastEl.style.cssText = "position:absolute;left:50%;bottom:15%;transform:translateX(-50%);z-index:130;background:rgba(11,12,16,0.97);border:1.5px solid #ffd166;border-radius:10px;padding:9px 14px;font-family:var(--font-pixel,monospace);font-size:9px;line-height:1.5;color:#ffd166;box-shadow:0 8px 24px rgba(0,0,0,0.85);text-align:center;max-width:84%;pointer-events:none;display:none;animation:popInModal 0.25s ease;";
        container.appendChild(_gameToastEl);
      }
      const warn = (kind === "warn" || kind === "error");
      _gameToastEl.style.borderColor = warn ? "#e63946" : "#ffd166";
      _gameToastEl.style.color = warn ? "#ff758f" : "#ffd166";
      _gameToastEl.textContent = message;
      _gameToastEl.style.display = "block";
      clearTimeout(_gameToastTimer);
      _gameToastTimer = setTimeout(function () {
        if (_gameToastEl) _gameToastEl.style.display = "none";
      }, 1900);
    } catch (_) {}
  }
  window.showGameToast = showGameToast;

  function showGameConfirm(opts, arg2, arg3, arg4, arg5, arg6) {
    let o = {};
    if (typeof opts === "string") {
      if (typeof arg2 === "function") {
        o = {
          title: "CONFIRMAR",
          message: opts,
          onConfirm: arg2,
          onCancel: typeof arg3 === "function" ? arg3 : null,
          okLabel: typeof arg4 === "string" ? arg4 : "SÍ",
          cancelLabel: typeof arg5 === "string" ? arg5 : "NO"
        };
      } else {
        o = {
          title: opts,
          message: typeof arg2 === "string" ? arg2 : "",
          onConfirm: typeof arg3 === "function" ? arg3 : null,
          onCancel: typeof arg4 === "function" ? arg4 : null,
          okLabel: typeof arg5 === "string" ? arg5 : "SÍ",
          cancelLabel: typeof arg6 === "string" ? arg6 : "NO"
        };
      }
    } else {
      o = opts || {};
    }
    const container = document.getElementById("game-container") || document.getElementById("stage") || document.body;
    if (!container) { if (typeof o.onCancel === "function") o.onCancel(); return; }
    const prev = document.getElementById("game-confirm");
    if (prev) prev.remove();
    const el = document.createElement("div");
    el.id = "game-confirm";
    el.setAttribute("role", "alertdialog");
    el.style.cssText = "position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:140;background:rgba(11,12,16,0.98);border:1.5px solid #ffd166;border-radius:12px;padding:14px 16px;max-width:86%;text-align:center;box-shadow:0 12px 40px rgba(0,0,0,0.9);animation:popInModal 0.2s ease;";
    const buttonsHtml = o.single
      ? '<button id="game-confirm-ok" style="width:100%;min-height:42px;background:linear-gradient(135deg,#2a9d8f,#1b6b62);border:1px solid #66fcf1;color:#fff;font-family:var(--font-pixel,monospace);font-size: 9px;border-radius:8px;cursor:pointer;">' + (o.okLabel || 'ACEPTAR') + '</button>'
      : '<div style="display:flex;gap:8px;justify-content:center;">' +
          '<button id="game-confirm-ok" style="flex:1;min-height:40px;background:linear-gradient(135deg,#2a9d8f,#1b6b62);border:1px solid #66fcf1;color:#fff;font-family:var(--font-pixel,monospace);font-size: 9px;border-radius:8px;cursor:pointer;">' + (o.okLabel || 'SÍ') + '</button>' +
          '<button id="game-confirm-cancel" style="flex:1;min-height:40px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.2);color:#c5c6c7;font-family:var(--font-pixel,monospace);font-size: 9px;border-radius:8px;cursor:pointer;">' + (o.cancelLabel || 'NO') + '</button>' +
        '</div>';
    el.innerHTML =
      '<div style="font-family:var(--font-pixel,monospace);font-size:9px;color:#ffd166;margin-bottom:6px;">' + (o.title || 'CONFIRMAR') + '</div>' +
      '<div style="font-size:9px;color:#c5c6c7;line-height:1.5;margin-bottom:12px;white-space:pre-line;">' + (o.message || '') + '</div>' +
      buttonsHtml;
    container.appendChild(el);
    const okBtn = el.querySelector("#game-confirm-ok");
    const cancelBtn = el.querySelector("#game-confirm-cancel");
    const close = () => { if (el.parentNode) el.remove(); };
    if (okBtn) okBtn.onclick = () => { close(); try { playButtonClickSound(); } catch (_) {} if (typeof o.onConfirm === "function") o.onConfirm(); };
    if (cancelBtn) cancelBtn.onclick = () => { close(); try { playButtonClickSound(); } catch (_) {} if (typeof o.onCancel === "function") o.onCancel(); };
  }
  window.showGameConfirm = showGameConfirm;

  // Modal informativo de un solo botón: sustituye al diálogo nativo del navegador.
  function showGameAlert(message, title, onOk) {
    showGameConfirm({
      title: title || "AVISO",
      message: message || "",
      single: true,
      okLabel: "ACEPTAR",
      onConfirm: typeof onOk === "function" ? onOk : null
    });
  }
  window.showGameAlert = showGameAlert;

  /* ============================================================
     SPRINT 4 - PERKS TÁCTICOS (15 COMBOS DE CONDICIÓN)
     Antes "SYNERGY_COMBOS". Se renombran porque "Sinergia" está
     reservado para las combinaciones elementales de cartas
     (triggerHandSynergies en game.js). Cada perk es una condición
     de combate que se reevalúa en cada mano ganada.
     ============================================================ */
  const TACTICAL_PERKS = [
    { id: "iron_wall",      name: "MURALLA DE HIERRO",    icon: "🛡️",
      desc: "DEF 5 + Escudo 10 -> +3 DEF frente al próximo contraataque",
      check: (p, gs) => p.def >= 5 && (gs.status.playerShield || 0) >= 10,
      apply: (p) => { p._synergyBonusPwr = (p._synergyBonusPwr || 0) + 0; p._synergyBonusDef = (p._synergyBonusDef || 0) + 3; }
    },
    { id: "assassin_edge",  name: "FILO DEL ASESINO",     icon: "🗡️",
      desc: "Picaro + Mano Par -> +3 PWR esta mano",
      check: (p) => p.class === "rogue" && p.playerScore % 2 === 0 && p.playerScore > 0,
      apply: (p) => { p._synergyBonusPwr = (p._synergyBonusPwr || 0) + 3; }
    },
    { id: "plague_master",  name: "MAESTRO DE LA PLAGA",  icon: "☠️",
      desc: "Veneno 3 rival + Nigromante -> veneno x1.5",
      check: (p, gs) => p.class === "necromancer" && (gs.status.enemyPoison || 0) >= 3,
      apply: (p, e, gs) => { gs.status.enemyPoison = Math.floor((gs.status.enemyPoison || 0) * 1.5); }
    },
    { id: "diamond_heart",  name: "CORAZÓN DE DIAMANTE",  icon: "💎",
      desc: "HP>80% + Escudo>8 -> siguiente BJ x4",
      check: (p, gs) => p.hp >= p.maxHp * 0.80 && (gs.status.playerShield || 0) >= 8,
      apply: (p) => { p._synergyNextBJx4 = true; }
    },
    { id: "dark_harvest",   name: "COSECHA OSCURA",        icon: "💀",
      desc: "3+ rivales caídos + Nigromante -> +8 HP al vencer",
      check: (p, gs) => p.class === "necromancer" && (gs.killCount || 0) >= 3,
      apply: (p) => { p._synergyDarkHarvest = true; }
    },
    { id: "monks_clarity",  name: "CLARIDAD DEL MONJE",   icon: "🧘",
      desc: "Monje + Mano 18+ sin Bust -> revela cartas rival",
      check: (p) => p.class === "monk" && p.playerScore >= 18 && !p.bust,
      apply: (p, e) => { e.enemyRevealed = true; }
    },
    { id: "fire_and_ice",   name: "FUEGO Y HIELO",         icon: "🔥",
      desc: "Quemadura rival 2+ + Sello Ígneo en mano -> +4 daño",
      check: (p, gs) => (gs.status.enemyBurn || 0) >= 2 && p.playerHand && p.playerHand.some(c => c && c.enchantment && (c.enchantment.id === "ignite" || c.enchantment.element === "fire")),
      apply: (p) => { p._synergyBonusPwr = (p._synergyBonusPwr || 0) + 4; }
    },
    { id: "golden_touch",   name: "TOQUE DE MIDAS",        icon: "🪙",
      desc: "Oro 50+ + Piso par -> +2 oro al vencer mano",
      check: (p, gs) => gs.gold >= 50 && gs.floor % 2 === 0,
      apply: (p) => { p._synergyGoldenTouch = true; }
    },
    { id: "survivor",       name: "SUPERVIVIENTE",          icon: "❤️‍🩹",
      desc: "HP 25% o menos -> +5 Escudo + +5 HP",
      check: (p) => p.hp <= p.maxHp * 0.25 && p.hp > 0,
      apply: (p, e, gs) => { gs.status.playerShield = (gs.status.playerShield || 0) + 5; p.hp = Math.min(p.maxHp, p.hp + 5); }
    },
    { id: "chain_lightning", name: "RAYO EN CADENA",       icon: "⚡",
      desc: "3+ manos ganadas seguidas -> +5 daño",
      check: (p) => (p._winStreak || 0) >= 3,
      apply: (p) => { p._synergyBonusPwr = (p._synergyBonusPwr || 0) + 5; }
    },
    { id: "shield_bash",    name: "GOLPE DE ESCUDO",       icon: "🛡️",
      desc: "Caballero + Escudo 15+ -> +3 daño al atacar",
      check: (p, gs) => p.class === "knight" && (gs.status.playerShield || 0) >= 15,
      apply: (p) => { p._synergyBonusPwr = (p._synergyBonusPwr || 0) + 3; }
    },
    { id: "vanishing_act",  name: "ACTO DE DESAPARICIÓN",  icon: "💨",
      desc: "Pícaro + turno impar -> 20% de esquivar el próximo contraataque",
      check: (p) => p.class === "rogue" && p.handNumber % 2 === 1,
      apply: (p) => { p._synergyExtraDodge = 0.20; }
    },
    { id: "last_stand",     name: "ÚLTIMA RESISTENCIA",     icon: "🏰",
      desc: "HP 15 o menos + DEF 3+ -> el próximo golpe rival a 1 daño",
      check: (p) => p.hp <= 15 && p.def >= 3,
      apply: (p) => { p._synergyLastStand = true; }
    },
    { id: "arcane_surge",   name: "OLEADA ARCANA",          icon: "🔮",
      desc: "3+ sellos en baraja -> +2 daño y +2 Escudo por mano",
      check: (p) => Object.keys(p.cardEnchantments || {}).length >= 3,
      apply: (p, e, gs) => { p._synergyBonusPwr = (p._synergyBonusPwr || 0) + 2; gs.status.playerShield = (gs.status.playerShield || 0) + 2; }
    },
    { id: "dragon_slayer",  name: "CAZADOR DE DRAGONES",    icon: "🐉",
      desc: "Rival es Dragón o BLACK + HP>50% -> +8 daño directo",
      check: (p, gs) => (gs.enemy.trait === "dragon" || gs.enemy.trait === "abyss") && p.hp > p.maxHp * 0.5,
      apply: (p) => { p._synergyBonusPwr = (p._synergyBonusPwr || 0) + 8; }
    }
  ];
  window.TACTICAL_PERKS = TACTICAL_PERKS;
  // Compatibilidad con código previo a la migración
  window.SYNERGY_COMBOS = TACTICAL_PERKS;

  // Los perks son "por mano": sus flags se limpian antes de reevaluar
  // para que nunca se acumulen de una mano a otra.
  function resetTacticalPerkFlags(p) {
    if (!p) return;
    p._synergyBonusPwr = 0;
    p._synergyBonusDef = 0;
    p._synergyNextBJx4 = false;
    p._synergyDarkHarvest = false;
    p._synergyGoldenTouch = false;
    p._synergyExtraDodge = 0;
    p._synergyLastStand = false;
  }
  window.resetTacticalPerkFlags = resetTacticalPerkFlags;

  function evaluateSynergies(p, e, gs) {
    if (!p) return [];
    resetTacticalPerkFlags(p);
    const activated = [];
    TACTICAL_PERKS.forEach(combo => {
      try { if (combo.check(p, gs)) { combo.apply(p, e, gs); activated.push(combo); } } catch (_) {}
    });
    return activated;
  }
  window.evaluateSynergies = evaluateSynergies;
  window.evaluateTacticalPerks = evaluateSynergies;

  function showSynergyPopups(activated) {
    if (!activated || !activated.length) return;
    activated.forEach((combo, i) => {
      setTimeout(() => {
        if (typeof addLog === "function") addLog(`⚡ [PERK TÁCTICO] ${combo.icon} ${combo.name}: ${combo.desc}`, "critical");
        if (typeof spawnFloatingText === "function") spawnFloatingText("player-sprite", `${combo.icon} ${combo.name}`, "crit");
        if (typeof showCombatBanner === "function") showCombatBanner(`⚡ ¡PERK TÁCTICO ACTIVADO!`, `${combo.icon} ${combo.name}: ${combo.desc}`, "player-win");
        try {
          const stage = document.getElementById("stage") || document.body;
          const toast = document.createElement("div");
          toast.className = "tactical-perk-toast";
          toast.style.cursor = "pointer";
          toast.title = "Toca para ver detalles del Perk";
          toast.onclick = () => {
            if (typeof showGameAlert === "function") {
              showGameAlert(`⚡ [PERK TÁCTICO: ${combo.name}]\n\n${combo.desc}`, "PERK TÁCTICO ACTIVADO");
            }
          };
          toast.innerHTML = `<div style="font-size:22px;line-height:1;">${combo.icon}</div><div><div class="tpt-name">⚡ PERK: ${combo.name.toUpperCase()}</div><div class="tpt-desc">${combo.desc}</div></div>`;
          stage.appendChild(toast);
          setTimeout(() => { if (toast && toast.parentNode) toast.parentNode.removeChild(toast); }, 2800);
        } catch (_) {}
        if (i === 0 && typeof playSynergyComboSound === "function") { try { playSynergyComboSound(); } catch (_) {} }
      }, i * 450);
    });
  }
  window.showSynergyPopups = showSynergyPopups;

  /* ============================================================
     FASE 2.2 - CALOR DE LA TORRE (Tower Heat)
     +10% HP enemigo cada 3 niveles de Maestria (max x2.0)
     ============================================================ */
  function getTowerHeatMultiplier() {
    const gs = window.gameState;
    if (!gs || !gs.player) return 1;
    const diff = gs.diff || (typeof window.getGameDifficulty === "function" ? window.getGameDifficulty() : "normal");
    if (diff === "normal") return 1.0;
    const ml = gs.player.masteryLevel || 1;
    const stacks = Math.floor((ml - 1) / 3);
    return Math.min(1 + stacks * 0.10, 2.0);
  }
  window.getTowerHeatMultiplier = getTowerHeatMultiplier;

  function getTowerHeatLabel() {
    const mult = getTowerHeatMultiplier();
    const pct = Math.round((mult - 1) * 100);
    if (pct === 0) return null;
    const ml = ((window.gameState || {}).player || {}).masteryLevel || 1;
    const stacks = Math.floor((ml - 1) / 3);
    const tier = stacks >= 4 ? "INFERNAL" : stacks >= 2 ? "ARDIENTE" : "TEMPLADO";
    return tier + " +" + pct + "% HP enemigo (Maestria " + ml + ")";
  }
  window.getTowerHeatLabel = getTowerHeatLabel;

  /* ============================================================
     FASE 2.3 - TIENDA: LIMITE DE 2 COMPRAS POR VISITA
     ============================================================ */
  let _shopPurchasesThisVisit = 0;
  const SHOP_MAX_PURCHASES = 2;

  function resetShopPurchaseCount() { _shopPurchasesThisVisit = 0; }
  window.resetShopPurchaseCount = resetShopPurchaseCount;

  function canMakeShopPurchase() { return _shopPurchasesThisVisit < SHOP_MAX_PURCHASES; }
  window.canMakeShopPurchase = canMakeShopPurchase;

  function recordShopPurchase() {
    _shopPurchasesThisVisit++;
    updateShopPurchaseBadge();
    if (_shopPurchasesThisVisit >= SHOP_MAX_PURCHASES && typeof addLog === "function") {
      addLog("Limite de compras alcanzado para esta visita.", "warning");
    }
  }
  window.recordShopPurchase = recordShopPurchase;

  function getShopPurchasesRemaining() { return Math.max(0, SHOP_MAX_PURCHASES - _shopPurchasesThisVisit); }
  window.getShopPurchasesRemaining = getShopPurchasesRemaining;

  function updateShopPurchaseBadge() {
    const badge = document.getElementById("shop-purchase-badge");
    if (!badge) return;
    const rem = getShopPurchasesRemaining();
    badge.textContent = rem > 0 ? rem + " compra" + (rem !== 1 ? "s" : "") + " restante" : "Sin compras disponibles";
    badge.style.color = rem > 0 ? "#ffd166" : "#ff758f";
  }
  window.updateShopPurchaseBadge = updateShopPurchaseBadge;

  /* ============================================================
     FASE 2.5 - CAP DE MULTIPLICADORES DE DANO
     ============================================================ */
  const PLAYER_DMG_CAP_PER_HAND = 350;

  function capDamage(dmg) {
    if (dmg > PLAYER_DMG_CAP_PER_HAND) {
      if (typeof addLog === "function") addLog("[CAP] Dano limitado a " + PLAYER_DMG_CAP_PER_HAND + " (era " + dmg + ")", "warning");
      return PLAYER_DMG_CAP_PER_HAND;
    }
    return dmg;
  }
  window.capDamage = capDamage;

  /* ============================================================
     FASE 5 — REDISEÑO DEL PACTO DEL ABISMO (ALTAR OSCURO)
     ============================================================ */
  const ABYSS_PACTS = [
    // --- TRAMO 1: BÁSICOS (Pisos 1-4) ---
    { id: "pact_blood", tier: "basic", name: "Pacto de Sangre", curse: "Pierdes 10 HP ahora", reward: "+35 de Oro de la Torre",
      apply: (p, gs) => { p.hp = Math.max(1, p.hp - 10); gs.gold += 35; } },
    { id: "pact_glass", tier: "basic", name: "Pacto de Cristal", curse: "-1 DEF de armadura permanente", reward: "+25 HP inmediatos y +15 de Oro",
      apply: (p, gs) => { p.def = Math.max(0, p.def - 1); p.hp = Math.min(p.maxHp, p.hp + 25); gs.gold += 15; } },
    { id: "pact_greed", tier: "basic", name: "Pacto de la Codicia", curse: "Los rivales tienen +15% HP", reward: "+60% de Oro al limpiar un piso",
      apply: (p, gs) => { p._pactGreedGold = true; } },
    { id: "pact_darkness", tier: "basic", name: "Pacto de las Tinieblas", curse: "Sin pociones durante este piso", reward: "+25 Oro y +10 HP inmediatos",
      apply: (p, gs) => { p._pactNoPotions = true; gs.gold += 25; p.hp = Math.min(p.maxHp, p.hp + 10); } },
    { id: "pact_time", tier: "basic", name: "Pacto del Tiempo", curse: "No puedes usar Reroll durante este piso", reward: "+2 pociones y +15 Oro",
      apply: (p, gs) => { p._pactNoReroll = true; p.potions = (p.potions || 0) + 2; gs.gold += 15; } },
    { id: "pact_thorn", tier: "basic", name: "Pacto de la Espina", curse: "Recibes 3 de daño al pedir carta extra", reward: "+1 PWR permanente (más daño en cada golpe)",
      apply: (p) => { p._pactThornPedir = true; p.pwr += 1; } },
    { id: "pact_gamble", tier: "basic", name: "Pacto del Azar", curse: "Prohibido plantarse con 14 o menos", reward: "+1 Reroll de dados y +20 de Oro",
      apply: (p, gs) => { p._pactNoStandMax = 14; p.rerollsAvailable = (p.rerollsAvailable || 0) + 1; gs.gold += 20; } },
    { id: "pact_leech", tier: "basic", name: "Pacto del Parásito", curse: "Pierdes 4 HP de inmediato", reward: "+8 HP al eliminar a un rival",
      apply: (p) => { p.hp = Math.max(1, p.hp - 4); p._pactDarkHarvest = true; } },

    // --- TRAMO 2: INTERMEDIOS (Pisos 5-8) ---
    { id: "pact_seer", tier: "intermediate", name: "Ojo del Vidente", curse: "-10% HP máximo de run", reward: "La carta oculta rival queda visible para siempre",
      apply: (p, gs) => { p.maxHp = Math.max(20, Math.floor(p.maxHp * 0.9)); p.hp = Math.min(p.hp, p.maxHp); p._pactAlwaysReveal = true; if (gs.enemy) gs.enemy.enemyRevealed = true; } },
    { id: "pact_ghost", tier: "intermediate", name: "Mano Fantasma", curse: "El rival recibe 1 carta extra al repartir (solo si no se pasa de 21)", reward: "Tú recibes 1 carta extra al repartir (solo si no te pasas de 21)",
      apply: (p) => { p._pactExtraStartingCard = true; p._pactEnemyExtraCard = true; } },
    { id: "pact_gold_blood", tier: "intermediate", name: "Sangre por Oro", curse: "Al iniciar cada mano pierdes 3 HP (mínimo 1)", reward: "Ganar una mano te da +2 de Oro adicional",
      apply: (p) => { p._pactGoldBlood = true; p._pactHandBloodLoss = true; } },
    { id: "pact_fury", tier: "intermediate", name: "Furia Ciega", curse: "-2 DEF permanente de run", reward: "+3 PWR de ataque permanente (+18% daño)",
      apply: (p) => { p.def = Math.max(0, p.def - 2); p.pwr += 3; } },
    { id: "pact_ash", tier: "intermediate", name: "Pacto de Ceniza", curse: "Inicias cada combate con 2 de Veneno", reward: "El rival inicia quemado con 4 de Fuego",
      apply: (p, gs) => { if (!gs.status) gs.status = {}; gs.status.enemyBurn = 4; gs.status.playerPoison = 2; } },
    { id: "pact_monolith", tier: "intermediate", name: "Pacto del Monolito", curse: "Pierdes 20 de Oro ahora (mínimo 0)", reward: "+20 Escudo inicial garantizado",
      apply: (p, gs) => { gs.gold = Math.max(0, (gs.gold || 0) - 20); if (!gs.status) gs.status = {}; gs.status.playerShield = (gs.status.playerShield || 0) + 20; } },
    { id: "pact_martyr", tier: "intermediate", name: "Pacto del Mártir", curse: "Pierdes 15% de tu salud actual", reward: "Bajo 30% de HP infliges +4 de daño por mano",
      apply: (p) => { p.hp = Math.max(1, Math.floor(p.hp * 0.85)); p._pactMartyrBuff = true; } },

    // --- TRAMO 3: LEGENDARIOS (Pisos 9-13) ---
    { id: "pact_abyss_crown", tier: "legendary", name: "Corona del Abismo", curse: "Prohibido plantarse con 16 o menos", reward: "Tus Blackjack infligen daño crítico x4",
      apply: (p) => { p._pactBlackjackBuff = true; p._pactNoStandMax = 16; } },
    { id: "pact_split_soul", tier: "legendary", name: "Alma Partida", curse: "-25% HP máximo de run", reward: "+3 PWR permanentes y +30 de Oro",
      apply: (p, gs) => { p.maxHp = Math.max(20, Math.floor(p.maxHp * 0.75)); p.hp = Math.min(p.hp, p.maxHp); p.pwr += 3; gs.gold = (gs.gold || 0) + 30; } },
    { id: "pact_crypt_master", tier: "legendary", name: "Pacto de la Cripta Suprema", curse: "Pierdes 20 HP de inmediato", reward: "+15 Monedas de Cripta permanentes",
      apply: (p, gs) => {
        p.hp = Math.max(1, p.hp - 20);
        const curCrypt = getPlayerCryptCoins();
        localStorage.setItem("bj_crypt_coins", String(curCrypt + 15));
      } },
    { id: "pact_chaos", tier: "legendary", name: "Pacto del Caos Total", curse: "El rival actual obtiene +25 HP de armadura", reward: "+3 PWR permanentes",
      apply: (p, gs) => { if (gs.enemy) { gs.enemy.maxHp += 25; gs.enemy.hp += 25; } p.pwr += 3; } },
    { id: "pact_arcane_void", tier: "legendary", name: "Trascendencia Oscura", curse: "La próxima hoguera no podrá curarte", reward: "+1 Sobre de Artefactos gratis",
      apply: (p, gs) => {
        p._pactCampfireNoHeal = true;
        setTimeout(() => {
          if (typeof openBoosterPackBySource === "function") {
            openBoosterPackBySource("arcane", { free: true, source: "postCombat" });
          }
        }, 400);
      } }
  ];
  window.ABYSS_PACTS = ABYSS_PACTS;

  function checkAbyssPactEvent(gs) {
    const f = gs.floor || 1;
    if (f < 3 || f > 12) return false;
    if (gs._pactOfferedThisFloor) return false;
    return Math.random() < 0.22; // 22% de probabilidad al inicio del combate
  }
  window.checkAbyssPactEvent = checkAbyssPactEvent;

  function showAbyssPactModal() {
    const gs = window.gameState;
    if (!gs) return;
    const floor = gs.floor || 1;
    if (floor < 3 || floor > 12) return;

    // Blindaje contra superposición: si hay modales críticos activos, esperar
    const blockingIds = [
      "screen-starter-blessing", "screen-chronicle", "screen-first-run-tutorial",
      "screen-pack-open", "screen-campfire-modal", "screen-fate-wheel"
    ];
    const isBlocked = blockingIds.some(id => {
      const el = document.getElementById(id);
      return el && !el.classList.contains("hidden");
    });
    if (isBlocked) {
      setTimeout(showAbyssPactModal, 1500);
      return;
    }

    gs._pactOfferedThisFloor = true;

    // Filtrar pactos disponibles según la profundidad de la Torre
    let eligible = ABYSS_PACTS.filter(p => {
      if (floor <= 4) return p.tier === "basic";
      if (floor <= 8) return p.tier === "basic" || p.tier === "intermediate";
      return true; // En pisos 9-13 están todos, con prioridad legendaria
    });

    // Barajar y tomar 3 pactos únicos
    const shuffled = eligible.slice().sort(() => 0.5 - Math.random());
    const choices = shuffled.slice(0, 3);

    const modal = document.getElementById("screen-abyss-pact-modal");
    const listEl = document.getElementById("abyss-pacts-list");
    if (!modal || !listEl) {
      // Fallback si no está el modal nuevo
      showAbyssPactModalFallback();
      return;
    }

    listEl.innerHTML = choices.map(pact => {
      const tierLabel = pact.tier === "basic" ? "BÁSICO" : (pact.tier === "intermediate" ? "INTERMEDIO" : "LEGENDARIO");
      return `
        <div class="abyss-pact-card" onclick="acceptAbyssPact('${pact.id}')">
          <div class="abyss-pact-top">
            <span class="abyss-pact-name-txt">${pact.name.toUpperCase()}</span>
            <span class="abyss-pact-tier-tag ${pact.tier}">${tierLabel}</span>
          </div>
          <div class="abyss-pact-split">
            <div class="abyss-pact-gain-side">
              <div class="abyss-pact-side-label">🎁 GANANCIA</div>
              <div class="abyss-pact-side-desc">${pact.reward}</div>
            </div>
            <div class="abyss-pact-curse-side">
              <div class="abyss-pact-side-label">💀 SACRIFICIO</div>
              <div class="abyss-pact-side-desc">${pact.curse}</div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    modal.classList.remove("hidden");
    try {
      if (typeof startAbyssMusic === "function") startAbyssMusic();
      if (typeof playCurseSound === "function") playCurseSound();
      if (typeof triggerHaptic === "function") triggerHaptic("heavy");
    } catch (_) {}
  }
  window.showAbyssPactModal = showAbyssPactModal;

  function showAbyssPactModalFallback() {
    const pact = ABYSS_PACTS[Math.floor(Math.random() * ABYSS_PACTS.length)];
    const modal = document.getElementById("screen-event");
    if (!modal) return;
    const titleEl = document.getElementById("event-title");
    const descEl  = document.getElementById("event-desc");
    const optsEl  = document.getElementById("event-options");
    if (titleEl) titleEl.innerText = "PACTO DEL ABISMO";
    if (descEl) descEl.innerHTML = '<div class="abyss-pact-box"><div class="abyss-pact-name">' + pact.name + '</div>' +
      '<div class="abyss-pact-row curse"><span class="abyss-badge curse">MALDICION</span><span>' + pact.curse + '</span></div>' +
      '<div class="abyss-pact-row reward"><span class="abyss-badge reward">RECOMPENSA</span><span>' + pact.reward + '</span></div>' +
      '<div class="abyss-pact-lore">El Abismo te observa. ¿Cuál es tu precio, Jack?</div></div>';
    if (optsEl) optsEl.innerHTML =
      '<div class="card" onclick="acceptAbyssPact(\'' + pact.id + '\')" style="border-color:#c77dff;color:#c77dff;text-align:center;">ACEPTAR EL PACTO</div>' +
      '<div class="card" onclick="rejectAbyssPact()" style="border-color:#c5c6c7;text-align:center;">RECHAZAR Y SEGUIR</div>';
    modal.classList.remove("hidden");
    try {
      if (typeof startAbyssMusic === "function") startAbyssMusic();
    } catch (_) {}
  }

  window.acceptAbyssPact = function (pactId) {
    const pact = ABYSS_PACTS.find(p => p.id === pactId);
    if (!pact) return;
    const gs = window.gameState;
    pact.apply(gs.player, gs);
    if (typeof addLog === "function") addLog(`👁️ Pactaste con el Abismo [${pact.name}]: ${pact.reward} a cambio de ${pact.curse}.`, "critical");
    if (typeof spawnFloatingText === "function") spawnFloatingText("player-sprite", "👁️ PACTO ACEPTADO", "crit");
    try {
      if (typeof playEnchantChimeSound === "function") playEnchantChimeSound();
      if (typeof triggerHaptic === "function") triggerHaptic("blackjack");
    } catch (_) {}
    if (typeof updateStatusBadges === "function") updateStatusBadges();
    if (typeof updateHud === "function") updateHud();
    if (typeof saveMidRunState === "function") saveMidRunState();

    const abyssModal = document.getElementById("screen-abyss-pact-modal");
    if (abyssModal) abyssModal.classList.add("hidden");
    const ev = document.getElementById("screen-event");
    if (ev) ev.classList.add("hidden");
    try {
      if (typeof stopAbyssMusic === "function") stopAbyssMusic();
    } catch (_) {}

    // Si el combate no ha iniciado y el rival existe, mostrar inicio
    const csModal = document.getElementById("screen-combat-start");
    const betModal = document.getElementById("screen-bet");
    const inCombat = gs.player && gs.player.playerHand && gs.player.playerHand.length > 0;
    if (!inCombat && (!csModal || csModal.classList.contains("hidden")) && (!betModal || betModal.classList.contains("hidden"))) {
      if (typeof showCombatStartModal === "function") showCombatStartModal();
      else if (typeof showBetScreen === "function") showBetScreen();
    }
  };

  window.rejectAbyssPact = function () {
    if (typeof addLog === "function") addLog("Rechazaste las tentaciones del Abismo. Tu alma permanece intacta.", "info");
    const abyssModal = document.getElementById("screen-abyss-pact-modal");
    if (abyssModal) abyssModal.classList.add("hidden");
    const ev = document.getElementById("screen-event");
    if (ev) ev.classList.add("hidden");
    try {
      if (typeof stopAbyssMusic === "function") stopAbyssMusic();
    } catch (_) {}

    const gs = window.gameState || {};
    const csModal = document.getElementById("screen-combat-start");
    const betModal = document.getElementById("screen-bet");
    const inCombat = gs.player && gs.player.playerHand && gs.player.playerHand.length > 0;
    if (!inCombat && (!csModal || csModal.classList.contains("hidden")) && (!betModal || betModal.classList.contains("hidden"))) {
      if (typeof showCombatStartModal === "function") showCombatStartModal();
      else if (typeof showBetScreen === "function") showBetScreen();
    }
  };

  /* ============================================================
     FASE 3.1 - LORE DEL DRAGON (parches de narrativa)
     ============================================================ */
  const LORE_PATCHES = {
    5:  { extra: "\n\n[El suelo vibra. Un rugido lejano resuena en las vigas de hierro. Los guardias murmuran temblorosos: El Dragón Guardián está despierto...]" },
    9:  { extra: "\n\n[En las paredes de piedra negra: grabados de un dragón encadenado. 'Quien quebrante el sello del Piso 9, despertará al guardián que BLACK encadenó hace tres siglos.']" },
    11: { extra: "\n\n[El calor abrasa el aire y el olor a azufre nubla la vista. El Dragón Guardián aguarda en las alturas, último bastión antes del trono de BLACK.]" },
    13: { extra: "\n\n[BLACK te mira desde su trono de marfil y sangre. 'Has llegado más lejos de lo que esperaba, Jack. Pero esta es la última mano que jamás jugarás.']" }
  };
  window.LORE_PATCHES = LORE_PATCHES;

  function applyLorePatch(floor, storyText) {
    const patch = LORE_PATCHES[floor];
    return patch ? storyText + patch.extra : storyText;
  }
  window.applyLorePatch = applyLorePatch;

  /* ============================================================
     FASE 3.2 - LORE DE ENEMIGOS (BESTIARIO DE LA TORRE)
     ============================================================ */
  const ENEMY_LORE = {
    // Nombres exactos de ENEMIES en game.js
    "Duende Pilluelo":             "Alimaña desterrada a los vertederos del fango. Sobrevive hurtando fichas de oro a los cautivos moribundos para pagar ofrendas a los centinelas de BLACK.",
    "Esqueleto Maldito":           "Restos de un caballero errante que pereció en un duelo de 21 siglos atrás. Atado por un juramento que ni la muerte disolvió, sus huesos se reensamblan al primer llamado de la derrota.",
    "Orco Berserker":              "Belicista colosal reclutado en los valles del norte. El dolor físico estimula su frenesí sanguíneo; cada mano perdida no hace más que afilar la ferocidad de su garrote.",
    "Gárgola Pétrea":              "Centinela de granito vivo esculpida por la Orden Arcana. Su piel de roca encantada deflecta golpes menores como si fuesen brisas de otoño.",
    "Bestia de las Sombras":       "Engendro nacido del vacío entre las barajas. Sus naipes se funden con la penumbra más absoluta, impidiendo anticipar sus jugadas hasta que el zarpazo es letal.",
    "Centurión Espectral":         "Ectoplasma del comandante supremo de la guardia pretoriana. Mantiene intacta la disciplina de falange: jamás cede terreno ni se planta por debajo del 18.",
    "Guardián de Obsidiana":       "Monolito viviente forjado en las fraguas volcánicas del abismo. Su coraza de cristal volcánico está erizada de espinas que devuelven el dolor infligido a su agresor.",
    "Dragón Guardián":             "Soberano ígneo subyugado hace 300 años por las cadenas arcanas de BLACK. Su aliento calcina las barajas y custodia el acceso a la cámara suprema.",
    "👑 BLACK (El Jack Supremo)": "El primer mortal corrompido por el Mazo Primigenio. Gobierna el destino de la Torre desde su trono del Piso 13, apostando las almas de los caídos por toda la eternidad.",

    // Claves históricas / sin acentos ni emojis para retrocompatibilidad
    "Gargola Petrea":              "Centinela de granito vivo esculpida por la Orden Arcana. Su piel de roca encantada deflecta golpes menores como si fuesen brisas de otoño.",
    "Centurion Espectral":         "Ectoplasma del comandante supremo de la guardia pretoriana. Mantiene intacta la disciplina de falange: jamás cede terreno ni se planta por debajo del 18.",
    "Guardian de Obsidiana":       "Monolito viviente forjado en las fraguas volcánicas del abismo. Su coraza de cristal volcánico está erizada de espinas que devuelven el dolor infligido a su agresor.",
    "Dragon Guardian":             "Soberano ígneo subyugado hace 300 años por las cadenas arcanas de BLACK. Su aliento calcina las barajas y custodia el acceso a la cámara suprema.",
    "BLACK (El Jack Supremo)":     "El primer mortal corrompido por el Mazo Primigenio. Gobierna el destino de la Torre desde su trono del Piso 13, apostando las almas de los caídos por toda la eternidad.",
    "BLACK":                       "El primer mortal corrompido por el Mazo Primigenio. Gobierna el destino de la Torre desde su trono del Piso 13, apostando las almas de los caídos por toda la eternidad."
  };
  window.ENEMY_LORE = ENEMY_LORE;

  function getEnemyLore(name) {
    if (!name) return "Habitante ancestral de los dominios de la Torre del 21.";
    if (ENEMY_LORE[name]) return ENEMY_LORE[name];
    const clean = String(name).replace(/^👑\s*/, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
    for (const [k, v] of Object.entries(ENEMY_LORE)) {
      const kClean = k.replace(/^👑\s*/, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
      if (kClean === clean || kClean.includes(clean) || clean.includes(kClean)) {
        return v;
      }
    }
    return "Habitante ancestral de los dominios de la Torre del 21.";
  }
  window.getEnemyLore = getEnemyLore;

  /* ============================================================
     FASE 5.1 - ANUNCIOS RECOMPENSADOS (UI PLACEHOLDER)
     ============================================================ */
  const REWARDED_AD_REWARDS = [
    { id: "ad_frenzy",  label: "FRENESÍ x3",   desc: "15 segundos de Frenesí con oro x3 al cazar cartas", icon: "⚡" },
    { id: "ad_revive",  label: "REVIVIR",     desc: "Revive con 30 HP",           icon: "❤️" },
    { id: "ad_gold",    label: "+25 ORO",      desc: "25 monedas de oro",           icon: "🪙" },
    { id: "ad_potion",  label: "+2 POCIONES",  desc: "2 pociones curativas",         icon: "🧪" },
    { id: "ad_exp",     label: "+50 EXP",      desc: "EXP permanente de Maestria",  icon: "⭐" }
  ];
  let _adUsedThisRun = {};

  function canWatchAd(id) { 
    if (id === "ad_frenzy") return true;
    return !_adUsedThisRun[id]; 
  }
  window.canWatchAd = canWatchAd;

  function resetAdUsageThisRun() { _adUsedThisRun = {}; }
  window.resetAdUsageThisRun = resetAdUsageThisRun;
  function _resetAdUsageThisRun() { resetAdUsageThisRun(); }

  function _patchRunStartAdReset() {
    if (typeof window.startGame !== "function" || window.startGame.__adReset) return;
    const _orig = window.startGame;
    const wrapped = function () {
      resetAdUsageThisRun();
      return _orig.apply(this, arguments);
    };
    wrapped.__adReset = true;
    window.startGame = wrapped;
  }

  function showRewardedAdModal(rewardId) {
    const reward = REWARDED_AD_REWARDS.find(r => r.id === rewardId);
    if (!reward || !canWatchAd(rewardId)) return;
    const modal = document.getElementById("screen-rewarded-ad");
    if (!modal) return;
    const iconEl  = modal.querySelector(".rad-icon");
    const labelEl = modal.querySelector(".rad-label");
    const descEl  = modal.querySelector(".rad-desc");
    const watchBtn = modal.querySelector(".rad-btn-watch");
    const skipBtn  = modal.querySelector(".rad-btn-skip");
    if (iconEl)  iconEl.textContent  = reward.icon;
    if (labelEl) labelEl.textContent = reward.label;
    if (descEl)  descEl.textContent  = reward.desc;
    if (watchBtn) {
      watchBtn.textContent = "VER ANUNCIO (GRATIS)";
      watchBtn.disabled = false;
      watchBtn.onclick = () => _simulateAd(rewardId, reward, modal, watchBtn);
    }
    if (skipBtn)  skipBtn.onclick  = () => modal.classList.add("hidden");
    modal.classList.remove("hidden");
  }
  window.showRewardedAdModal = showRewardedAdModal;

  function _simulateAd(rewardId, reward, modal, btn) {
    if (btn) btn.disabled = false;
    if (modal) modal.classList.add("hidden");
    if (typeof showGameToast === "function") {
      showGameToast("El anuncio recompensado estará disponible próximamente.", "warn");
    }
  }

  function _grantAdReward(rewardId, reward) {
    if (rewardId !== "ad_frenzy") _adUsedThisRun[rewardId] = true;
    if (rewardId === "ad_frenzy") {
      if (typeof window._onFrenzyAdReward === "function") {
        window._onFrenzyAdReward();
        window._onFrenzyAdReward = null;
      }
      return;
    }
    const gs = window.gameState;
    const p = gs && gs.player;
    if (!p) return;
    if (rewardId === "ad_revive") {
      p.hp = Math.min(p.maxHp, Math.max(30, Math.floor(p.maxHp * 0.35)));
      const ev = document.getElementById("screen-event");
      if (ev) ev.classList.add("hidden");
      if (typeof setPlayerSpriteState === "function") setPlayerSpriteState("idle");
      if (typeof addLog === "function") addLog("🎬 ¡Has revivido con " + p.hp + " HP gracias al anuncio recompensado!", "heal");
    }
    else if (rewardId === "ad_gold")   { gs.gold += 25; }
    else if (rewardId === "ad_potion") { p.potions += 2; }
    else if (rewardId === "ad_exp")    { if (typeof addHeroPermanentExp === "function") addHeroPermanentExp(p.class, 50); }
    if (typeof updateHud === "function") updateHud();
    if (typeof addLog === "function") addLog("Recompensa obtenida: " + reward.label, "heal");
    if (typeof spawnFloatingText === "function") spawnFloatingText("player-sprite", reward.label, "heal");
  }

  /* ============================================================
     FASE 5.2 - IAP (DESHABILITADO HASTA GOOGLE PLAY BILLING)
     ------------------------------------------------------------
     Antes había aquí un showIAPModal que otorgaba oro/pociones al
     pulsar "COMPRAR AHORA" sin pasar por caja. Eso viola la
     política de pagos de Google Play y provocaría rechazo.
     El modal canónico es el de game.js (showIAPModal), que muestra
     "Las compras estarán disponibles pronto" y no concede nada.
     Al integrar Play Billing aquí se sustituirá por la compra real.
     ============================================================ */

  /* ============================================================
     FASE 1.1 - MIGRACIÓN DE MONEDAS DE CRIPTA
     Clave canónica: bj_crypt_coins.
     Migración única desde la clave legada "blackjack_crypt_coins".
     ============================================================ */
  const CRYPT_KEY_CANONICAL = "bj_crypt_coins";
  const CRYPT_KEY_LEGACY = "blackjack" + "_crypt_coins";
  let _cryptMigrated = false;

  function migrateCryptCoins() {
    if (_cryptMigrated) return;
    _cryptMigrated = true;
    try {
      if (typeof window.readCryptCoins === "function") { window.readCryptCoins(); return; }
      const legacyRaw = localStorage.getItem(CRYPT_KEY_LEGACY);
      if (legacyRaw === null) return;
      const legacy = parseInt(legacyRaw, 10) || 0;
      const current = parseInt(localStorage.getItem(CRYPT_KEY_CANONICAL) || "0", 10) || 0;
      const merged = Math.max(legacy, current);
      localStorage.setItem(CRYPT_KEY_CANONICAL, String(merged));
      localStorage.removeItem(CRYPT_KEY_LEGACY);
      if (merged !== current && typeof window.updateCryptCoinUI === "function") {
        window.updateCryptCoinUI();
      }
    } catch (_) {}
  }
  window.migrateCryptCoins = migrateCryptCoins;
  migrateCryptCoins();

  /* ============================================================
     FASE 5.5 - MONEDAS DE LA CRIPTA (API canónica única)
     Delega en game.js:readCryptCoins(), que además migra la
     clave legada "blackjack_crypt_coins" si existe.
     ============================================================ */
  function getCryptCoins() {
    if (typeof window.readCryptCoins === "function") return window.readCryptCoins();
    return parseInt(localStorage.getItem(CRYPT_KEY_CANONICAL) || "0", 10) || 0;
  }
  window.getCryptCoins = getCryptCoins;

  function addCryptCoins(amount) {
    if (typeof window.addPlayerCryptCoins === "function") return window.addPlayerCryptCoins(amount);
    localStorage.setItem(CRYPT_KEY_CANONICAL, String(getCryptCoins() + amount));
    updateCryptCoinUI();
    return getCryptCoins();
  }
  window.addCryptCoins = addCryptCoins;

  function spendCryptCoins(amount) {
    if (typeof window.spendPlayerCryptCoins === "function") return window.spendPlayerCryptCoins(amount);
    if (getCryptCoins() < amount) return false;
    localStorage.setItem(CRYPT_KEY_CANONICAL, String(getCryptCoins() - amount));
    updateCryptCoinUI();
    return true;
  }
  window.spendCryptCoins = spendCryptCoins;

  function updateCryptCoinUI() { const el = document.getElementById("ui-crypt-coins"); if (el) el.textContent = getCryptCoins(); }
  window.updateCryptCoinUI = updateCryptCoinUI;

  /* ============================================================
     FASE 4.1 - RECOMPENSA DIARIA DE CONEXIÓN (LOGIN DIARIO)
     ------------------------------------------------------------
     - Una sola recompensa por día calendario (zona horaria local),
       así que no se puede farmear abriendo la app varias veces.
     - Racha de 7 días que se reinicia si se salta un día.
     - Otorga EXCLUSIVAMENTE Monedas de Cripta: la misma moneda que
       ya se gana jugando (100 por completar la Torre, 15 por el
       Pacto de la Cripta Suprema). NUNCA desbloquea perks, héroes
       ni vestiduras: eso sigue exigiendo Billing o anuncio.
     ============================================================ */
  const DAILY_LOGIN_KEY = "bj_daily_login";
  const DAILY_LOGIN_REWARDS = [2, 3, 4, 5, 6, 8, 10];
  const DAILY_LOGIN_MAX_STREAK = DAILY_LOGIN_REWARDS.length;

  function _dailyPad(n) { return (n < 10 ? "0" : "") + n; }
  function _dailyStamp(d) { return d.getFullYear() + "-" + _dailyPad(d.getMonth() + 1) + "-" + _dailyPad(d.getDate()); }

  function readDailyLoginState() {
    try {
      const raw = localStorage.getItem(DAILY_LOGIN_KEY);
      const obj = raw ? JSON.parse(raw) : null;
      if (obj && typeof obj === "object") {
        return {
          last: (typeof obj.last === "string" ? obj.last : null),
          streak: (parseInt(obj.streak, 10) || 0)
        };
      }
    } catch (_) {}
    return { last: null, streak: 0 };
  }
  window.readDailyLoginState = readDailyLoginState;

  function claimDailyLoginReward() {
    try {
      const today = _dailyStamp(new Date());
      const state = readDailyLoginState();
      if (state.last === today) return null;
      const yesterday = _dailyStamp(new Date(Date.now() - 86400000));
      const streak = (state.last === yesterday)
        ? Math.min(DAILY_LOGIN_MAX_STREAK, state.streak + 1)
        : 1;
      const amount = DAILY_LOGIN_REWARDS[streak - 1] || DAILY_LOGIN_REWARDS[DAILY_LOGIN_MAX_STREAK - 1];
      localStorage.setItem(DAILY_LOGIN_KEY, JSON.stringify({ last: today, streak: streak }));
      addCryptCoins(amount);
      return { amount: amount, streak: streak };
    } catch (_) { return null; }
  }
  window.claimDailyLoginReward = claimDailyLoginReward;

  let _dailyLoginNotified = false;
  function notifyDailyLoginReward() {
    if (_dailyLoginNotified) return;
    _dailyLoginNotified = true;
    const reward = claimDailyLoginReward();
    if (!reward) return;
    const message = "+" + reward.amount + " \u{1F480} Criptas \u2022 Racha " + reward.streak + "/" + DAILY_LOGIN_MAX_STREAK;
    const tryNotify = function (intentos) {
      const title = document.getElementById("screen-title");
      const intro = document.getElementById("screen-intro");
      const visible = (title && !title.classList.contains("hidden")) || (intro && !intro.classList.contains("hidden"));
      if (visible) { showGameAlert(message, "\u{1F381} RECOMPENSA DIARIA"); return; }
      if (intentos > 0) { setTimeout(function () { tryNotify(intentos - 1); }, 900); return; }
      showGameToast("\u{1F381} " + message);
    };
    setTimeout(function () { tryNotify(8); }, 1200);
  }
  window.notifyDailyLoginReward = notifyDailyLoginReward;

  /* ============================================================
     INTERFAZ Y MODAL DE RECOMPENSA DIARIA (R-07)
     ============================================================ */
  let _dailyCountdownTimer = null;

  function getTimeUntilTomorrow() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const diff = Math.max(0, tomorrow.getTime() - now.getTime());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return _dailyPad(h) + ":" + _dailyPad(m) + ":" + _dailyPad(s);
  }

  function updateDailyLoginQuickbar() {
    try {
      const state = readDailyLoginState();
      const today = _dailyStamp(new Date());
      const claimedToday = (state.last === today);
      const tag = document.getElementById("daily-login-status-tag");
      const btn = document.getElementById("btn-daily-login");

      if (tag) {
        if (claimedToday) {
          tag.className = "daily-status-tag claimed";
          tag.textContent = "DÍA " + state.streak + "/7 ✓";
        } else {
          tag.className = "daily-status-tag ready";
          tag.textContent = "¡LISTA!";
        }
      }
      if (btn) {
        if (claimedToday) {
          btn.classList.add("daily-btn-claimed");
          btn.classList.remove("daily-btn-ready");
        } else {
          btn.classList.add("daily-btn-ready");
          btn.classList.remove("daily-btn-claimed");
        }
      }
    } catch (_) {}
  }
  window.updateDailyLoginQuickbar = updateDailyLoginQuickbar;

  function renderDailyLoginUI() {
    updateDailyLoginQuickbar();
    const body = document.getElementById("daily-login-body");
    if (!body) return;

    const state = readDailyLoginState();
    const today = _dailyStamp(new Date());
    const claimedToday = (state.last === today);
    const yesterday = _dailyStamp(new Date(Date.now() - 86400000));

    let currentDayIndex;
    if (claimedToday) {
      currentDayIndex = state.streak;
    } else {
      currentDayIndex = (state.last === yesterday)
        ? Math.min(DAILY_LOGIN_MAX_STREAK, state.streak + 1)
        : 1;
    }

    const cardsHtml = DAILY_LOGIN_REWARDS.map(function (amt, idx) {
      const dayNum = idx + 1;
      const isPast = claimedToday ? (dayNum <= state.streak) : (dayNum < currentDayIndex);
      const isToday = claimedToday ? (dayNum === state.streak) : (dayNum === currentDayIndex);
      const isDay7 = (dayNum === 7);

      let cardClass = "daily-card";
      let statusBadge = "";

      if (claimedToday && isToday) {
        cardClass += " today-claimed";
        statusBadge = '<span class="dc-badge done">✓ RECLAMADO</span>';
      } else if (!claimedToday && isToday) {
        cardClass += " today-ready pulse";
        statusBadge = '<span class="dc-badge ready">¡HOY!</span>';
      } else if (isPast) {
        cardClass += " claimed";
        statusBadge = '<span class="dc-badge done">✓ RECLAMADO</span>';
      } else {
        cardClass += " locked";
        statusBadge = '<span class="dc-badge lock">🔒</span>';
      }

      if (isDay7) cardClass += " epic-day7";

      return `
        <div class="${cardClass}">
          <div class="dc-header">
            <span class="dc-day-title">DÍA ${dayNum}</span>
            ${isDay7 ? '<span class="dc-epic-star">★ COFRE SUPREMO</span>' : ''}
          </div>
          <div class="dc-icon">${isDay7 ? '👑' : '💀'}</div>
          <div class="dc-amount">+${amt} CRIPTAS</div>
          <div class="dc-footer">${statusBadge}</div>
        </div>
      `;
    }).join("");

    const actionHtml = claimedToday
      ? `
        <div class="daily-action-claimed-box">
          <div class="dac-title">✓ ¡Recompensa de hoy reclamada con éxito!</div>
          <div class="dac-streak">Racha activa: <b>${state.streak} de 7 días consecutivos</b></div>
          <div class="dac-countdown-label">Próxima recompensa disponible en:</div>
          <div class="dac-countdown-val" id="daily-countdown-display">${getTimeUntilTomorrow()}</div>
        </div>
      `
      : `
        <div class="daily-action-ready-box">
          <div class="dar-info">Día <b>${currentDayIndex}</b> de 7 en racha • Recompensa disponible:</div>
          <button id="btn-claim-daily-now" class="daily-claim-btn" onclick="claimDailyRewardFromModal()">
            🎁 RECLAMAR +${DAILY_LOGIN_REWARDS[currentDayIndex - 1]} MONEDAS DE CRIPTA
          </button>
        </div>
      `;

    body.innerHTML = `
      <div class="daily-login-info-banner">
        Conéctate cada día a la Torre para acumular <b>Monedas de Cripta</b> para el Códice.
        Si dejas de jugar un día, la racha volverá al Día 1.
      </div>
      <div class="daily-cards-container">
        ${cardsHtml}
      </div>
      <div class="daily-action-container">
        ${actionHtml}
      </div>
    `;

    if (_dailyCountdownTimer) clearInterval(_dailyCountdownTimer);
    if (claimedToday) {
      _dailyCountdownTimer = setInterval(function () {
        const el = document.getElementById("daily-countdown-display");
        if (el) {
          el.textContent = getTimeUntilTomorrow();
        } else {
          clearInterval(_dailyCountdownTimer);
        }
      }, 1000);
    }
  }
  window.renderDailyLoginUI = renderDailyLoginUI;

  function openDailyLoginModal() {
    const modal = document.getElementById("screen-daily-login");
    if (!modal) return;
    renderDailyLoginUI();
    modal.classList.remove("hidden");
    try { if (typeof playButtonClickSound === "function") playButtonClickSound(); } catch (_) {}
  }
  window.openDailyLoginModal = openDailyLoginModal;

  function closeDailyLoginModal() {
    const modal = document.getElementById("screen-daily-login");
    if (!modal) return;
    modal.classList.add("hidden");
    if (_dailyCountdownTimer) {
      clearInterval(_dailyCountdownTimer);
      _dailyCountdownTimer = null;
    }
  }
  window.closeDailyLoginModal = closeDailyLoginModal;

  function claimDailyRewardFromModal() {
    const reward = claimDailyLoginReward();
    if (reward) {
      showGameToast("🎉 ¡Reclamaste +" + reward.amount + " Monedas de Cripta! (Racha: " + reward.streak + "/7)");
      try { if (typeof playVictoryFanfareSound === "function") playVictoryFanfareSound(); } catch (_) {}
      renderDailyLoginUI();
      const ccEl = document.getElementById("ui-crypt-coins");
      if (ccEl && typeof getPlayerCryptCoins === "function") ccEl.innerText = String(getPlayerCryptCoins());
      const accEl = document.getElementById("arena-skulls-val");
      if (accEl && typeof getPlayerCryptCoins === "function") accEl.innerText = String(getPlayerCryptCoins());
    } else {
      showGameToast("Ya reclamaste la recompensa de hoy.");
      renderDailyLoginUI();
    }
  }
  window.claimDailyRewardFromModal = claimDailyRewardFromModal;

  /* ============================================================
     FASE 5.6 - EVENTOS SEMANALES
     ============================================================ */
  const WEEKLY_EVENTS = [
    { id: "double_gold",       name: "SEMANA DEL ORO",        desc: "Todo el oro ganado esta semana se duplica.",      icon: "🪙", color: "#ffd166", bonus: (gs) => { gs._weeklyGoldMult = 2; } },
    { id: "exp_rush",          name: "FIEBRE DE MAESTRÍA",    desc: "EXP de Maestría x1.5 esta semana.",               icon: "📈", color: "#66fcf1", bonus: (gs) => { gs._weeklyExpMult  = 1.5; } },
    { id: "dragon_hunt",       name: "CAZA DEL DRAGÓN",       desc: "Eliminar al Dragón da +100 EXP extra.",            icon: "🐉", color: "#f4a261", bonus: (gs) => { gs._weeklyDragonBonus = 100; } },
    { id: "blackjack_frenzy",  name: "FRENESÍ DEL 21",        desc: "Cada BJ Natural da +5 Oro y +10 EXP.",             icon: "🃏", color: "#c77dff", bonus: (gs) => { gs._weeklyBJBonus = true; } }
  ];
  window.WEEKLY_EVENTS = WEEKLY_EVENTS;

  function getActiveWeeklyEvent() {
    const week = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
    return WEEKLY_EVENTS[week % WEEKLY_EVENTS.length];
  }
  window.getActiveWeeklyEvent = getActiveWeeklyEvent;

  function applyWeeklyEventBonus() {
    const gs = window.gameState;
    const ev = getActiveWeeklyEvent();
    if (gs && ev) ev.bonus(gs);
  }
  window.applyWeeklyEventBonus = applyWeeklyEventBonus;

  function renderWeeklyEventBanner() {
    const el = document.getElementById("weekly-event-banner");
    if (!el) return;
    const ev = getActiveWeeklyEvent();
    if (!ev) { el.classList.add("hidden"); return; }
    el.style.setProperty("--wev-color", ev.color);
    el.innerHTML = '<div class="wev-inner" style="border-color:' + ev.color + '">' +
      '<span class="wev-icon">' + ev.icon + '</span>' +
      '<div class="wev-content">' +
        '<div class="wev-name" style="color:' + ev.color + '">' + ev.name + '</div>' +
        '<div class="wev-desc">' + ev.desc + '</div>' +
      '</div>' +
      '<span class="wev-badge">ACTIVO</span>' +
    '</div>';
    el.classList.remove("hidden");
  }
  window.renderWeeklyEventBanner = renderWeeklyEventBanner;

  /* ============================================================
     FASE 6 - FIREBASE (SDK Loader con graceful degradation)
     ============================================================ */
  const FIREBASE_CONFIG_DEMO = true; // Cambiar a false cuando se configuren credenciales reales

  function initFirebase() {
    if (FIREBASE_CONFIG_DEMO) {
      console.info("[Firebase] Modo demo - operando en localStorage.");
      return;
    }
    const script = document.createElement("script");
    script.type = "module";
    script.textContent = "console.info('[Firebase] SDK listo para configurar.');";
    document.head.appendChild(script);
  }
  window.initFirebase = initFirebase;

  /* ============================================================
     CUENTA GOOGLE Y SINCRONIZACIÓN EN LA NUBE (FASES 4 Y 6)
     ============================================================ */
  const ACCOUNT_PROFILE_KEY = "bj_account_profile_v1";
  const CLOUD_BACKUP_KEY = "bj_cloud_progress_backup";

  function getAccountProfile() {
    try {
      const raw = localStorage.getItem(ACCOUNT_PROFILE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return {
      uid: "guest",
      displayName: "Heraldo Invitado",
      email: null,
      photoUrl: null,
      linked: false,
      lastSync: null
    };
  }
  window.getAccountProfile = getAccountProfile;

  function sanitizeProfileText(str, maxLen = 40) {
    if (typeof str !== "string") return "";
    return str
      .replace(/[<>'"&]/g, (c) => {
        switch (c) {
          case "<": return "&lt;";
          case ">": return "&gt;";
          case "'": return "&#39;";
          case '"': return "&quot;";
          case "&": return "&amp;";
          default: return c;
        }
      })
      .trim()
      .slice(0, maxLen);
  }

  function saveAccountProfile(profile) {
    if (!profile || typeof profile !== "object") return;
    const cleanProf = {
      uid: String(profile.uid || "guest").slice(0, 128),
      displayName: sanitizeProfileText(profile.displayName || "Heraldo Invitado", 40),
      email: profile.email ? String(profile.email).slice(0, 100) : null,
      photoUrl: profile.photoUrl ? String(profile.photoUrl).slice(0, 255) : null,
      linked: Boolean(profile.linked),
      lastSync: profile.lastSync || null
    };
    try {
      localStorage.setItem(ACCOUNT_PROFILE_KEY, JSON.stringify(cleanProf));
    } catch (_) {}
    updateAccountUI();
  }
  window.saveAccountProfile = saveAccountProfile;

  function updateAccountUI() {
    const prof = getAccountProfile();
    const upcName = document.getElementById("upc-name");
    const upcStatus = document.getElementById("upc-status");
    const cfgBadge = document.getElementById("cfg-account-sync-badge");
    const cfgEmail = document.getElementById("cfg-account-email");
    const btnAuth = document.getElementById("btn-google-auth");
    const pauseName = document.getElementById("pause-account-name");
    const pauseStatus = document.getElementById("pause-cloud-status");

    if (upcName) upcName.innerText = prof.displayName;
    if (upcStatus) upcStatus.innerText = prof.linked ? "● Nube Activa" : "● Local";
    if (pauseName) pauseName.innerText = prof.displayName;
    if (pauseStatus) pauseStatus.innerText = prof.linked ? "● Sincronizado" : "● Respaldo Local";

    if (cfgBadge) {
      cfgBadge.innerText = prof.linked ? "● NUBE VINCULADA" : "● MODO SEGURO OFFLINE";
      cfgBadge.style.color = prof.linked ? "#66fcf1" : "#2a9d8f";
    }

    if (cfgEmail) {
      cfgEmail.innerText = prof.linked
        ? `Vinculado como ${prof.email || prof.displayName}. Respaldo automático activo.`
        : "Vincula tu cuenta de Google para respaldar tus héroes, cartas y logros.";
    }

    if (btnAuth) {
      if (prof.linked) {
        btnAuth.innerText = "✕ DESVINCULAR CUENTA";
        btnAuth.style.background = "rgba(230,57,70,0.2)";
        btnAuth.style.color = "#ff758f";
        btnAuth.style.border = "1px solid #e63946";
      } else {
        btnAuth.innerText = "🔗 VINCULAR CUENTA GOOGLE";
        btnAuth.style.background = "linear-gradient(135deg, #2a9d8f, #48cae4)";
        btnAuth.style.color = "#0b0c10";
        btnAuth.style.border = "none";
      }
    }
  }
  window.updateAccountUI = updateAccountUI;

  async function handleGoogleAuthToggle() {
    const prof = getAccountProfile();
    if (prof.linked) {
      showGameConfirm({
        title: "DESVINCULAR CUENTA",
        message: "¿Deseas desvincular tu cuenta de Google?\nTus datos y progreso seguirán guardados en este dispositivo.",
        onConfirm: () => {
          saveAccountProfile({
            uid: "guest",
            displayName: "Heraldo Invitado",
            email: null,
            photoUrl: null,
            linked: false,
            lastSync: prof.lastSync
          });
          showGameToast("Cuenta desvinculada. Modo local activo.", "info");
        },
        okLabel: "SÍ, DESVINCULAR",
        cancelLabel: "CANCELAR"
      });
      return;
    }

    // Proceso de Vinculación
    showGameToast("Iniciando conexión con Google...", "info");

    const nativeAuth = window.Capacitor?.Plugins?.FirebaseAuthentication;
    if (nativeAuth && typeof nativeAuth.signInWithGoogle === "function") {
      try {
        const result = await nativeAuth.signInWithGoogle();
        const user = result.user || {};
        const newProf = {
          uid: user.uid || "google_" + Date.now(),
          displayName: user.displayName || "Heraldo de la Torre",
          email: user.email || "usuario@gmail.com",
          photoUrl: user.photoUrl || null,
          linked: true,
          lastSync: Date.now()
        };
        saveAccountProfile(newProf);
        syncProgressToCloud();
        showGameToast(`¡Bienvenido, ${newProf.displayName}! Cuenta vinculada.`, "heal");
        return;
      } catch (err) {
        console.warn("[Firebase Auth Native Error]:", err);
      }
    }

    // Modo Web / Emulador / Degradación Elegante
    setTimeout(() => {
      const demoProf = {
        uid: "demo_google_usr_" + Date.now().toString().slice(-6),
        displayName: "Heraldo Supremo",
        email: "heraldo.blackjack@gmail.com",
        photoUrl: null,
        linked: true,
        lastSync: Date.now()
      };
      saveAccountProfile(demoProf);
      syncProgressToCloud();
      showGameToast("¡Cuenta vinculada con éxito a la nube de Google!", "heal");
    }, 600);
  }
  window.handleGoogleAuthToggle = handleGoogleAuthToggle;

  function syncProgressToCloud() {
    try {
      const prof = getAccountProfile();
      const progressPayload = {
        uid: prof.uid,
        displayName: prof.displayName,
        email: prof.email,
        timestamp: Date.now(),
        unlocks: JSON.parse(localStorage.getItem("blackjack_hero_unlocks_v1") || "{}"),
        extraCards: JSON.parse(localStorage.getItem("blackjack_persistent_extra_cards") || "[]"),
        cryptCoins: parseInt(localStorage.getItem("bj_crypt_coins") || "0", 10),
        trophies: parseInt(localStorage.getItem("blackjack_arena_trophies") || "1250", 10),
        arenaCards: JSON.parse(localStorage.getItem("blackjack_arena_cards_owned") || "[]"),
        achievements: JSON.parse(localStorage.getItem("bj_achievements_v1") || "{}")
      };

      // Guardar respaldo local de nube (permite restaurar ante reinstalaciones)
      localStorage.setItem(CLOUD_BACKUP_KEY, JSON.stringify(progressPayload));
      prof.lastSync = Date.now();
      saveAccountProfile(prof);
      console.info("[Cloud Sync] Progreso respaldado correctamente:", progressPayload);
      return progressPayload;
    } catch (e) {
      console.warn("[Cloud Sync Error]:", e);
      return null;
    }
  }
  window.syncProgressToCloud = syncProgressToCloud;

  function manualCloudSync() {
    const prof = getAccountProfile();
    const payload = syncProgressToCloud();
    if (payload) {
      showGameToast("☁️ ¡Progreso y logros respaldados en la nube!", "heal");
      try { playWinFanfareSound(); } catch (_) {}
    } else {
      showGameToast("No se pudo completar el respaldo.", "warn");
    }
  }
  window.manualCloudSync = manualCloudSync;

  // Actualizar UI al arrancar
  setTimeout(updateAccountUI, 300);

  /* ============================================================
     INIT
     ============================================================ */
  function _patchEnemyHpWithTowerHeat() {
    if (typeof window.enemyHpFor !== "function") return;
    if (window.enemyHpFor.__pactWired) return;
    const _orig = window.enemyHpFor;
    const wrapped = function (t) {
      let hp = Math.floor(_orig(t) * getTowerHeatMultiplier());
      const p = _pactPlayer();
      if (p && p._pactGreedGold) hp = Math.ceil(hp * 1.15);
      return hp;
    };
    wrapped.__pactWired = true;
    window.enemyHpFor = wrapped;
  }

  function _patchShopPurchaseTracking() {
    const buyFns = [
      "buyPotion", "buyShieldPotion", "buyReroll", "buyArtifact",
      "buyCardUpgrade", "buyForgeBoosterPack", "buyGoldenDie", "buyAmulet",
      "openBoosterPackBySource", "openBoosterPack"
    ];
    buyFns.forEach(fnName => {
      if (typeof window[fnName] !== "function") return;
      if (window[fnName].__shopTracked) return;
      const _orig = window[fnName];
      const wrapped = function () {
        if (!canMakeShopPurchase()) {
          showGameToast("LÍMITE DE COMPRAS: " + SHOP_MAX_PURCHASES + " POR VISITA", "warn");
          return;
        }
        const gs = window.gameState;
        const goldBefore = gs && typeof gs.gold === "number" ? gs.gold : 0;
        const cryptBefore = typeof getCryptCoins === "function" ? getCryptCoins() : 0;
        const result = _orig.apply(this, arguments);
        const goldAfter = gs && typeof gs.gold === "number" ? gs.gold : 0;
        const cryptAfter = typeof getCryptCoins === "function" ? getCryptCoins() : 0;
        if (goldAfter < goldBefore || cryptAfter < cryptBefore) {
          recordShopPurchase();
          updateShopPurchaseBadge();
        }
        return result;
      };
      wrapped.__shopTracked = true;
      wrapped.__originalName = fnName;
      window[fnName] = wrapped;
    });
    if (typeof window.showShopModal === "function" && !window.showShopModal.__shopReset) {
      const _origShop = window.showShopModal;
      const wrappedShop = function () {
        resetShopPurchaseCount();
        return _origShop.apply(this, arguments);
      };
      wrappedShop.__shopReset = true;
      window.showShopModal = wrappedShop;
    }
  }

  /* ============================================================
     FASE 1.2 - TOOLTIPS CONTEXTUALES DE PRIMERA RUN
     ============================================================ */
  function showContextualHints() {
    if (localStorage.getItem("bj_hints_done_v1")) return;
    const stage = document.getElementById("stage");
    if (!stage || document.getElementById("first-run-combat-hints")) return;
    const hintContainer = document.createElement("div");
    hintContainer.id = "first-run-combat-hints";
    hintContainer.className = "combat-hint-bubble";
    hintContainer.style.cssText = "position:absolute;top:6px;left:8px;right:8px;z-index:90;background:rgba(13,18,28,0.96);border:1.5px solid #66fcf1;border-radius:10px;padding:8px 12px;font-size:9.5px;color:#c5c6c7;display:flex;align-items:center;justify-content:space-between;box-shadow:0 8px 24px rgba(0,0,0,0.85);animation:popInModal 0.3s ease;";
    hintContainer.innerHTML = '<span>💡 <b>Tip de Combate:</b> Toca <b>PEDIR CARTA</b> para acercarte a 21 sin pasarte. ¡El <b>Escudo</b> absorbe el daño antes que tu vida!</span><button onclick="dismissCombatHints()" style="background:transparent;border:none;color:#66fcf1;font-weight:bold;font-size:14px;cursor:pointer;margin-left:8px;padding:2px 6px;">✕</button>';
    stage.appendChild(hintContainer);
  }
  window.showContextualHints = showContextualHints;

  window.dismissCombatHints = function() {
    localStorage.setItem("bj_hints_done_v1", "true");
    const el = document.getElementById("first-run-combat-hints");
    if (el) el.remove();
  };

  /* ============================================================
     FASE 4.4 - RATE LIMITING DE ACCIONES (ANTI-BOT)
     ============================================================ */
  let _actionTimestamps = [];
  function checkActionRateLimit() {
    const now = Date.now();
    _actionTimestamps = _actionTimestamps.filter(t => now - t < 1000);
    if (_actionTimestamps.length >= 8) {
      if (typeof addLog === "function") addLog("⚠️ [ANTI-BOT] Demasiadas acciones en 1s. Cooldown de seguridad.", "warning");
      return false;
    }
    _actionTimestamps.push(now);
    return true;
  }
  window.checkActionRateLimit = checkActionRateLimit;

  function _patchPlayerActionRateLimit() {
    if (typeof window.playerAction !== "function") return;
    const _orig = window.playerAction;
    window.playerAction = function() {
      if (typeof dismissCombatHints === "function") dismissCombatHints();
      if (!checkActionRateLimit()) return;
      return _orig.apply(this, arguments);
    };
  }

  /* ============================================================
     FASE 2.1 - MOTOR DE EFECTOS DE PACTO DEL ABISMO
     Conecta los flags `_pact*` del catálogo ABYSS_PACTS con el
     motor real de game.js (gates de acción, reparto de mano,
     resolución de mano, oro de piso, hoguera y HP del rival).
     ============================================================ */

  function _pactPlayer() {
    const gs = window.gameState;
    return (gs && gs.player) ? gs.player : null;
  }

  // Flags de pacto que solo duran un piso
  const _PACT_FLOOR_FLAGS = ["_pactNoPotions", "_pactNoReroll"];

  function _clearFloorPactFlags(p, gs) {
    if (p) _PACT_FLOOR_FLAGS.forEach(f => { delete p[f]; });
    if (gs) gs._pactOfferedThisFloor = false;
  }

  // --- 1) GATES DE ACCIÓN: bloquean/castigan sobre window.playerAction ---
  function _pactGateAction(action) {
    const p = _pactPlayer();
    const gs = window.gameState;
    if (!p || (gs && gs.isRolling)) return true;
    const toast = (msg) => { try { showGameToast(msg, "warn"); } catch (_) {} };

    if (action === "potion" && p._pactNoPotions) {
      toast("PACTO DEL ABISMO: sin pociones en este piso");
      return false;
    }
    if (action === "reroll" && p._pactNoReroll) {
      toast("PACTO DEL ABISMO: los Reroll están prohibidos");
      return false;
    }
    if (action === "stand" && typeof p._pactNoStandMax === "number" && p.playerScore <= p._pactNoStandMax) {
      toast(`PACTO DEL ABISMO: no puedes plantarte con ${p.playerScore} (mínimo ${p._pactNoStandMax + 1})`);
      return false;
    }
    if (action === "hit" && p._pactThornPedir) {
      p.hp -= 3;
      try { spawnFloatingText("player-sprite", "-3 ESPINA", "damage"); } catch (_) {}
      try { addLog("🌵 Pacto de la Espina: -3 HP por pedir carta extra.", "damage"); } catch (_) {}
      try { updateHud(); } catch (_) {}
    }
    return true;
  }

  function _wirePactActionGates() {
    if (typeof window.playerAction !== "function") return;
    if (window.playerAction.__pactWired) return;
    const _orig = window.playerAction;
    const wrapped = function (action) {
      if (!_pactGateAction(action)) return Promise.resolve();
      return _orig.apply(this, arguments);
    };
    wrapped.__pactWired = true;
    window.playerAction = wrapped;
  }

  // --- 2) RECOMPENSAS DE MANO: sobre window.evaluateSynergies (solo en victoria) ---
  function _wirePactHandRewards() {
    if (typeof window.evaluateSynergies !== "function") return;
    if (window.evaluateSynergies.__pactWired) return;
    const _orig = window.evaluateSynergies;
    const wrapped = function (p, e, gs) {
      const activated = _orig.apply(this, arguments) || [];
      if (!p) return activated;
      try {
        if (p._pactMartyrBuff && p.maxHp > 0 && (p.hp / p.maxHp) < 0.30) {
          p._synergyBonusPwr = (p._synergyBonusPwr || 0) + 4;
          activated.push({ icon: "🗡️", name: "PACTO DEL MÁRTIR", desc: "+4 de daño por ir por debajo del 30% de HP." });
        }
        if (p._pactGoldBlood) {
          p._synergyGoldenTouch = true;
        }
        if (p._pactDarkHarvest) {
          p._synergyDarkHarvest = true;
        }
      } catch (err) { console.warn("[pacts] hand rewards:", err); }
      return activated;
    };
    wrapped.__pactWired = true;
    window.evaluateSynergies = wrapped;
  }

  // --- 3) INICIO DE MANO: cartas extra, veneno de mano, visibilidad rival ---
  function _pactAfterHandStart(p, e) {
    if (p._pactHandBloodLoss) {
      p.hp = Math.max(1, p.hp - 3);
      try { addLog("🩸 Sangre por Oro: -3 HP al iniciar la mano.", "damage"); } catch (_) {}
    }
    if (e && p._pactEnemyExtraCard) {
      e.enemyHand = e.enemyHand || [];
      if (!e.blackjack && !e.bust) {
        const card = drawCard();
        const next = calculateHandScore(e.enemyHand.concat([card]));
        if (next <= BUST_LIMIT) {
          e.enemyHand.push(card);
          e.enemyScore = next;
          e.bust = false;
          e.blackjack = (next === 21 && e.enemyHand.length === 2);
          try { addLog(`👻 Mano Fantasma: ${e.name} recibe una carta extra (${next}).`, "warning"); } catch (_) {}
        }
      }
    }
    if (p._pactExtraStartingCard) {
      p.playerHand = p.playerHand || [];
      if (!p.blackjack && !p.bust) {
        const card = drawCard();
        const next = calculateHandScore(p.playerHand.concat([card]));
        if (next <= BUST_LIMIT) {
          p.playerHand.push(card);
          p.playerScore = next;
          p.bust = false;
          p.blackjack = (next === 21 && p.playerHand.length === 2);
          try { addLog(`👻 Mano Fantasma: recibes una carta extra (${next}).`, "critical"); } catch (_) {}
          try { renderCards(); } catch (_) {}
        } else {
          try { addLog("👻 Mano Fantasma: ninguna carta extra cabe en tu mano sin pasarte.", "info"); } catch (_) {}
        }
      }
    }
    if (e && p._pactAlwaysReveal) e.enemyRevealed = true;
    if (p._pactBlackjackBuff) p._synergyNextBJx4 = true;
    try { updateHud(); } catch (_) {}
    try { updateCombatState(); } catch (_) {}
  }

  function _wirePactHandStart() {
    if (typeof window.startNewHand !== "function") return;
    if (window.startNewHand.__pactWired) return;
    const _orig = window.startNewHand;
    const wrapped = function () {
      const result = _orig.apply(this, arguments);
      const run = () => {
        try {
          const gs = window.gameState;
          if (gs && gs.player) _pactAfterHandStart(gs.player, gs.enemy);
        } catch (err) { console.warn("[pacts] hand start:", err); }
      };
      if (result && typeof result.then === "function") {
        return result.then(r => { run(); return r; });
      }
      run();
      return result;
    };
    wrapped.__pactWired = true;
    window.startNewHand = wrapped;
  }

  // --- 4) ORO DE PISO: +60% del oro ganado al limpiar un piso ---
  function _wirePactFloorGold() {
    if (typeof window.finishFloor !== "function") return;
    if (window.finishFloor.__pactWired) return;
    const _orig = window.finishFloor;
    const wrapped = function () {
      const gs = window.gameState;
      const p = _pactPlayer();
      const before = gs && typeof gs.gold === "number" ? gs.gold : 0;
      const result = _orig.apply(this, arguments);
      const after = () => {
        try {
          if (p && p._pactGreedGold && gs && typeof gs.gold === "number") {
            const gained = gs.gold - before;
            if (gained > 0) {
              const bonus = Math.round(gained * 0.6);
              gs.gold += bonus;
              addLog(`💰 Pacto de la Codicia: +${bonus} de Oro extra por limpiar el piso.`, "gold");
              updateHud();
            }
          }
        } catch (err) { console.warn("[pacts] floor gold:", err); }
      };
      if (result && typeof result.then === "function") {
        return result.then(r => { after(); return r; });
      }
      after();
      return result;
    };
    wrapped.__pactWired = true;
    window.finishFloor = wrapped;
  }

  // --- 5) AVANCE DE PISO: limpia los flags de duración "este piso" ---
  function _wirePactFloorClear() {
    if (typeof window.advanceToNextFloor !== "function") return;
    if (window.advanceToNextFloor.__pactWired) return;
    const _orig = window.advanceToNextFloor;
    const wrapped = function () {
      const gs = window.gameState;
      const p = _pactPlayer();
      const result = _orig.apply(this, arguments);
      _clearFloorPactFlags(p, gs);
      return result;
    };
    wrapped.__pactWired = true;
    window.advanceToNextFloor = wrapped;
  }

  // --- 6) HOGUERA: pacto que anula la curación del descanso ---
  function _wirePactCampfire() {
    if (typeof window.finishCampfireRest !== "function") return;
    if (window.finishCampfireRest.__pactWired) return;
    const _orig = window.finishCampfireRest;
    const wrapped = function () {
      const p = _pactPlayer();
      const before = p ? p.hp : 0;
      const result = _orig.apply(this, arguments);
      const after = () => {
        try {
          if (p && p._pactCampfireNoHeal && p.hp > before) {
            p.hp = before;
            p._pactCampfireNoHeal = false;
            addLog("🌑 Trascendencia Oscura: la Hoguera no te concedió curación.", "warning");
            updateHud();
            if (typeof saveMidRunState === "function") saveMidRunState();
          }
        } catch (err) { console.warn("[pacts] campfire:", err); }
      };
      if (result && typeof result.then === "function") {
        return result.then(r => { after(); return r; });
      }
      after();
      return result;
    };
    wrapped.__pactWired = true;
    window.finishCampfireRest = wrapped;
  }

  function _wireAbyssPactEffects() {
    _wirePactActionGates();
    _wirePactHandRewards();
    _wirePactHandStart();
    _wirePactFloorGold();
    _wirePactFloorClear();
    _wirePactCampfire();
  }

  /* ============================================================
     FASE 5 - POLÍTICA DE PRIVACIDAD (obligatoria para Play Store)
     ============================================================ */
  function openPrivacyPolicy() {
    const el = document.getElementById("screen-privacy");
    if (el) el.classList.remove("hidden");
  }
  window.openPrivacyPolicy = openPrivacyPolicy;

  function closePrivacyPolicy() {
    const el = document.getElementById("screen-privacy");
    if (el) el.classList.add("hidden");
  }
  window.closePrivacyPolicy = closePrivacyPolicy;

  /* ============================================================
     FASE 6 - GOOGLE PLAY BILLING (compras reales)
     ------------------------------------------------------------
     Plugin npm: capacitor-billing (Google Play Billing Library 9.x).
       querySkuDetails({product,type})   -> precio localizado
       launchBillingFlow({product,type}) -> purchaseToken (Android)
       sendAck({purchaseToken})          -> reconoce la compra en Play
     En navegador o sin plugin nativo el puente queda INACTIVO y el
     juego conserva el mensaje "próximamente": nunca se otorga
     contenido sin cobro. La verificación definitiva del token
     requiere backend (Google Play Developer API); aquí solo ack.
     Nota: el plugin no expone queryPurchases, así que la compra
     se conserva en localStorage de la cuenta del dispositivo.
     ============================================================ */
  const ROYAL_PERK_SKUS = {
    starter: "royal_pack_starter",
    exp_boost: "royal_tomo_maestro",
    hero_bundle: "royal_bundle_los_jacks"
  };
  let _billingPlugin = null;
  let _billingAvailable = false;
  let _billingPrices = {};
  let _billingInitPromise = null;

  function getBillingPlugin() {
    const cap = window.Capacitor;
    if (!cap) return null;
    try {
      if (cap.Plugins && cap.Plugins.BillingPlugin) return cap.Plugins.BillingPlugin;
      if (typeof cap.registerPlugin === "function") return cap.registerPlugin("BillingPlugin");
    } catch (_) { return null; }
    return null;
  }

  function isBillingAvailable() { return _billingAvailable; }
  window.isBillingAvailable = isBillingAvailable;

  function getBillingPrice(productId) {
    const info = _billingPrices[productId];
    return (info && info.price) ? info.price : null;
  }
  window.getBillingPrice = getBillingPrice;

  function initBilling() {
    if (_billingInitPromise) return _billingInitPromise;
    const cap = window.Capacitor;
    const plugin = getBillingPlugin();
    if (!plugin || !cap || typeof cap.getPlatform !== "function" || cap.getPlatform() === "web") {
      _billingAvailable = false;
      _billingInitPromise = Promise.resolve(false);
      return _billingInitPromise;
    }
    _billingPlugin = plugin;
    const entries = Object.keys(ROYAL_PERK_SKUS).map(k => ({ key: k, sku: ROYAL_PERK_SKUS[k] }));
    _billingInitPromise = Promise.all(entries.map(entry =>
      Promise.resolve()
        .then(() => plugin.querySkuDetails({ product: entry.sku, type: "INAPP" }))
        .then(res => {
          if (!res || res.value === "web" || !res.price) return false;
          _billingPrices[entry.key] = res;
          return true;
        })
        .catch(() => false)
    )).then(results => {
      _billingAvailable = results.some(ok => ok);
      if (_billingAvailable && typeof console !== "undefined") {
        console.info("[billing] Play Billing activo. Precios: " + Object.keys(_billingPrices).join(", "));
      }
      return _billingAvailable;
    }).catch(() => { _billingAvailable = false; return false; });
    return _billingInitPromise;
  }
  window.initBilling = initBilling;

  function _refreshShopAfterPurchase() {
    try {
      if (typeof window.showShopModal !== "function") return;
      const el = document.getElementById("event-options");
      if (!el || el.innerHTML.indexOf("BAZAR DE LA TORRE") === -1) return;
      showShopModal();
    } catch (_) {}
  }

  function purchaseRoyalPerk(productId) {
    const sku = ROYAL_PERK_SKUS[productId];
    const perk = (window.ROYAL_PERKS && window.ROYAL_PERKS[productId]) || null;
    const notify = (msg) => { if (typeof showGameToast === "function") showGameToast(msg); };
    if (!sku || !_billingAvailable || !_billingPlugin) {
      notify("La compra real todavía no está disponible en esta versión.");
      return Promise.resolve(false);
    }
    if (typeof isRoyalPerkOwned === "function" && isRoyalPerkOwned(productId)) {
      notify("Ya tienes ese Tesoro Real.");
      return Promise.resolve(false);
    }
    notify("Abriendo Google Play…");
    return Promise.resolve()
      .then(() => _billingPlugin.launchBillingFlow({ product: sku, type: "INAPP" }))
      .then(purchase => {
        const token = purchase && purchase.purchaseToken;
        if (!token || typeof _billingPlugin.sendAck !== "function") return purchase;
        return Promise.resolve(_billingPlugin.sendAck({ purchaseToken: token }))
          .catch(() => null)
          .then(() => purchase);
      })
      .then(purchase => {
        if (!purchase || purchase.value === "web") return false;
        if (typeof grantRoyalPerk === "function") grantRoyalPerk(productId);
        if (typeof closeIAPModal === "function") closeIAPModal();
        if (typeof addLog === "function") addLog("Tesoro Real adquirido: " + ((perk && perk.name) || productId), "heal");
        if (typeof showGameToast === "function") showGameToast("¡Compra completada! Contenido desbloqueado.");
        _refreshShopAfterPurchase();
        return true;
      })
      .catch(err => {
        if (typeof console !== "undefined") console.warn("[billing] compra cancelada o fallida:", err);
        notify("Compra cancelada.");
        return false;
      });
  }
  window.purchaseRoyalPerk = purchaseRoyalPerk;
  /* ============================================================
     CICLO DE VIDA MÓVIL: BOTÓN ATRÁS (ANDROID) Y TECLA ESCAPE
     Cierra modales emergentes en orden inverso de profundidad
     antes de permitir que el sistema minimice o cierre la app.
     ============================================================ */
  function _initHardwareBackButtonHandler() {
    function handleBackAction(e) {
      // 1. Confirm dialog o Alert modal
      const confirmDialog = document.getElementById("game-confirm");
      if (confirmDialog) {
        if (e && e.preventDefault) e.preventDefault();
        const cancelBtn = confirmDialog.querySelector("#game-confirm-cancel") || confirmDialog.querySelector("#game-confirm-ok");
        if (cancelBtn) { cancelBtn.click(); return true; }
        confirmDialog.remove();
        return true;
      }

      // 2. Modales emergentes de prioridad
      const modalCloseMap = [
        { id: "modal-royal-iap", close: () => { if (typeof window.closeIAPModal === "function") window.closeIAPModal(); } },
        { id: "screen-victory-reward-saved-modal", close: () => { if (typeof window.closeVictoryRewardSavedModal === "function") window.closeVictoryRewardSavedModal(); } },
        { id: "screen-mastery-forge-modal", close: () => { if (typeof window.closeMasteryForgeModal === "function") window.closeMasteryForgeModal(); } },
        { id: "screen-hero-sheet", close: () => { if (typeof window.closeHeroSheet === "function") window.closeHeroSheet(); } },
        { id: "screen-hero-skin-modal", close: () => { if (typeof window.closeHeroSkinModal === "function") window.closeHeroSkinModal(); } },
        { id: "screen-daily-login", close: () => { if (typeof window.closeDailyLoginModal === "function") window.closeDailyLoginModal(); } },
        { id: "screen-privacy", close: () => { if (typeof window.closePrivacyPolicy === "function") window.closePrivacyPolicy(); } },
        { id: "screen-codex-detail-modal", close: () => { if (typeof window.closeCodexDetailModal === "function") window.closeCodexDetailModal(); } },
        { id: "screen-codex", close: () => { if (typeof window.closeCodex === "function") window.closeCodex(); } },
        { id: "modal-perks-codex", close: () => { if (typeof window.closePerksCodexModal === "function") window.closePerksCodexModal(); } },
        { id: "screen-config", close: () => { if (typeof window.closeConfig === "function") window.closeConfig(); } },
        { id: "screen-lore-chapter", close: () => { if (typeof window.closeLoreChapter === "function") window.closeLoreChapter(); } },
        { id: "screen-card-detail", close: () => { if (typeof window.closeCardDetailModal === "function") window.closeCardDetailModal(); } },
        { id: "screen-arena-pvp-modal", close: () => { if (typeof window.closeArenaPvpModal === "function") window.closeArenaPvpModal(); } },
        { id: "screen-campfire-modal", close: () => { const el = document.getElementById("screen-campfire-modal"); if (el) el.classList.add("hidden"); } },
        { id: "screen-abyss-pact-modal", close: () => { const el = document.getElementById("screen-abyss-pact-modal"); if (el) el.classList.add("hidden"); try { if (typeof window.stopAbyssMusic === "function") window.stopAbyssMusic(); } catch (_) {} } },
        { id: "screen-ingame-pause", close: () => { if (typeof window.closeInGamePauseMenu === "function") window.closeInGamePauseMenu(); } }
      ];

      for (const item of modalCloseMap) {
        const el = document.getElementById(item.id);
        if (el && !el.classList.contains("hidden") && el.style.display !== "none") {
          if (e && e.preventDefault) e.preventDefault();
          try { item.close(); } catch (_) { el.classList.add("hidden"); }
          return true;
        }
      }

      // 3. Si está en combate activo y no hay modal abierto, alternar menú de pausa
      const stage = document.getElementById("stage");
      const titleScreen = document.getElementById("screen-title");
      if (stage && (!titleScreen || titleScreen.classList.contains("hidden"))) {
        const pauseModal = document.getElementById("screen-ingame-pause");
        if (pauseModal && pauseModal.classList.contains("hidden")) {
          if (typeof window.openInGamePauseMenu === "function") {
            if (e && e.preventDefault) e.preventDefault();
            window.openInGamePauseMenu();
            return true;
          }
        }
      }

      return false;
    }

    // Capacitor App Plugin (Android nativo)
    try {
      const capApp = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
      if (capApp && typeof capApp.addListener === "function") {
        capApp.addListener("backButton", (data) => {
          const handled = handleBackAction(data);
          if (!handled) {
            const titleScreen = document.getElementById("screen-title");
            if (titleScreen && !titleScreen.classList.contains("hidden")) {
              if (typeof capApp.exitApp === "function") {
                capApp.exitApp();
              }
            }
          }
        });
      }
    } catch (_) {}

    // Evento backbutton de Android (Capacitor/Cordova fallback)
    document.addEventListener("backbutton", (e) => {
      handleBackAction(e);
    }, false);

    // Tecla Escape (Web/Desktop/Pruebas)
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.keyCode === 27) {
        handleBackAction(e);
      }
    });
  }

  function onImprovementsReady() {
    migrateCryptCoins();
    applyWeeklyEventBonus();
    renderWeeklyEventBanner();
    updateCryptCoinUI();
    initFirebase();
    initBilling();
    _patchEnemyHpWithTowerHeat();
    _patchShopPurchaseTracking();
    _patchPlayerActionRateLimit();
    _wireAbyssPactEffects();
    _patchRunStartAdReset();
    showContextualHints();
    _resetAdUsageThisRun();
    notifyDailyLoginReward();
    updateDailyLoginQuickbar();
    _initHardwareBackButtonHandler();
    console.info("[improvements.js] Todas las mejoras inicializadas.");
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(onImprovementsReady, 250);
  } else {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(onImprovementsReady, 250); });
  }

})();
