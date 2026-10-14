const fs = require('fs');
let code = fs.readFileSync('c:/Proyectos/Juego de prueba/js/game.js', 'utf8');

// 1. Add getMaxArtifactSlots, hasArtifact, SHOP_ARTIFACTS, hasCardUpgrade, CARD_UPGRADES, applyDrawnCardUpgrades
// We will place this right before SHOP MODAL (around line 2120)

const artifactAndCardCatalogCode = `
  /* ============================================================
     SISTEMA DE ARTEFACTOS (MÁXIMO 5 RANURAS SEGÚN NIVEL - REQ 5)
     ============================================================ */
  function getMaxArtifactSlots() {
    const lvl = (gameState.player && gameState.player.level) ? gameState.player.level : 1;
    return Math.min(5, lvl);
  }
  window.getMaxArtifactSlots = getMaxArtifactSlots;

  function hasArtifact(id) {
    if (!gameState.player || !gameState.player.artifacts) return false;
    return gameState.player.artifacts.some(a => (typeof a === "object" ? a.id === id : a === id));
  }
  window.hasArtifact = hasArtifact;

  const SHOP_ARTIFACTS = [
    {
      id: "iron_pendant",
      name: "Colgante de Hierro",
      icon: "🛡️",
      price: 25,
      desc: "+1 DEF de armadura permanente en todos los combates.",
      apply: (p) => { p.def += 1; }
    },
    {
      id: "warriors_ring",
      name: "Anillo del Gladiador",
      icon: "⚔️",
      price: 30,
      desc: "+1 PWR permanente de ataque base en cada mano.",
      apply: (p) => { p.pwr += 1; }
    },
    {
      id: "guardian_quartz",
      name: "Cuarzo Guardián",
      icon: "💎",
      price: 30,
      desc: "Comienza cada piso con +6 de Escudo azul protector adicional.",
      apply: () => {}
    },
    {
      id: "golden_purse",
      name: "Bolsa del Avaro",
      icon: "💰",
      price: 35,
      desc: "+20% de Oro extra tras liquidar a cada rival de la torre.",
      apply: () => {}
    },
    {
      id: "shadow_cloak",
      name: "Manto de Sombras",
      icon: "🌑",
      price: 40,
      desc: "25% de probabilidad de esquivar el contragolpe rival si pierdes la mano.",
      apply: () => {}
    },
    {
      id: "holy_grail",
      name: "Cáliz Sagrado 21",
      icon: "🏆",
      price: 60,
      desc: "Todo Blackjack suma +10 de daño devastador y restaura +8 HP.",
      apply: () => {}
    }
  ];

  /* ============================================================
     SISTEMA DE MEJORA DE CARTAS: FRAGUA DEL DESTINO (REQ 2)
     ============================================================ */
  function hasCardUpgrade(id) {
    if (!gameState.player || !gameState.player.cardUpgrades) return false;
    return gameState.player.cardUpgrades.includes(id);
  }
  window.hasCardUpgrade = hasCardUpgrade;

  const CARD_UPGRADES = [
    {
      id: "sharp_cards",
      name: "Cartas Afiladas (2 al 5)",
      icon: "🗡️",
      tier: "common",
      tierLabel: "COMÚN",
      price: 18,
      desc: "Cartas 2, 3, 4 y 5 otorgan +2 de daño de corte al jugarse en tu mano."
    },
    {
      id: "armored_cards",
      name: "Cartas Blindadas (6 al 8)",
      icon: "🛡️",
      tier: "common",
      tierLabel: "COMÚN",
      price: 22,
      desc: "Cartas 6, 7 y 8 generan +2 de Escudo azul protector al momento de robarlas."
    },
    {
      id: "royal_prosperity",
      name: "Figuras Reales (J, Q, K)",
      icon: "👑",
      tier: "rare",
      tierLabel: "RARA",
      price: 38,
      desc: "Cada Figura (J, Q, K) te premia con +2 de Oro y restaura +2 HP al entrar a tu mano."
    },
    {
      id: "vampiric_seven",
      name: "Sello Vampírico del 7",
      icon: "🩸",
      tier: "rare",
      tierLabel: "RARA",
      price: 45,
      desc: "Toda carta 7 absorbe 4 HP del rival y te los transfiere directamente a tu salud."
    },
    {
      id: "astral_ace",
      name: "As Astral del 21",
      icon: "✨",
      tier: "mythic",
      tierLabel: "MÍTICA",
      price: 70,
      desc: "Los Ases canalizan energía astral: si alcanzas 21, tu daño crítico se amplifica x1.5 extra."
    },
    {
      id: "phoenix_card",
      name: "Carta Fénix de Salvación",
      icon: "🔥",
      tier: "mythic",
      tierLabel: "LEGENDARIA",
      price: 85,
      desc: "Una vez por piso, si una carta te causa BUST (pasar de 21), su valor se transmuta en 1."
    }
  ];

  function applyDrawnCardUpgrades(cards) {
    if (!cards || !Array.isArray(cards)) return;
    const p = gameState.player;
    if (!p) return;

    for (const card of cards) {
      // 1. Cartas Blindadas (6, 7, 8) -> +2 Escudo
      if (hasCardUpgrade("armored_cards") && [6, 7, 8].includes(card.value)) {
        if (!gameState.status) gameState.status = {};
        gameState.status.playerShield = (gameState.status.playerShield || 0) + 2;
        spawnFloatingText("player-sprite", "🛡️ +2 ESCUDO", "shield");
        addLog("🛡️ Carta Blindada (" + card.rank + "): +2 de Escudo azul protector generado.", "heal");
        updateHud();
      }

      // 2. Figuras Reales (J, Q, K) -> +2 Oro y +2 HP
      if (hasCardUpgrade("royal_prosperity") && ["J", "Q", "K"].includes(card.rank)) {
        gameState.gold += 2;
        p.hp = Math.min(p.maxHp, p.hp + 2);
        spawnFloatingText("player-sprite", "🪙+2 💖+2", "heal");
        addLog("👑 Figura Próspera (" + card.rank + "): +2 Oro obtenido y +2 HP restaurados.", "heal");
        updateHud();
      }

      // 3. Sello Vampírico (7) -> Drena 4 HP del rival
      if (hasCardUpgrade("vampiric_seven") && (card.value === 7 || card.rank === "7")) {
        if (gameState.enemy && gameState.enemy.hp > 0) {
          const drain = Math.min(gameState.enemy.hp, 4);
          gameState.enemy.hp = Math.max(0, gameState.enemy.hp - drain);
          p.hp = Math.min(p.maxHp, p.hp + drain);
          spawnFloatingText("player-sprite", "🩸 +" + drain + " HP", "heal");
          spawnFloatingText("enemy-sprite", "🩸 -" + drain + " HP", "damage");
          addLog("🩸 Sello Vampírico (7): Drenaste " + drain + " HP del rival.", "critical");
          updateHud();
        }
      }
    }
  }
`;

console.log('Artifacts and Card Catalog ready');
