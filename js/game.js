"use strict";
  /* ============================================================
     TORRE DEL BLACKJACK 21 — ROGUELIKE
     ============================================================ */

  const HERO_DATA = {
    knight: {
      name: "Caballero",
      title: "El Jack de Diamantes",
      class: "knight",
      sprite: "🛡️",
      img: "assets/svg/knight_idle.svg",
      imgAttack: "assets/svg/knight_attack.svg",
      imgHurt: "assets/svg/knight_hurt.svg",
      imgDead: "assets/svg/knight_dead.svg",
      maxHp: 90,
      pwr: 2,
      def: 3,
      startingShield: 6,
      styleClass: "shield-bio",
      desc: "Baluarte de Diamantes: Comienza cada piso con 6 de Escudo protector. Trascendencia del 21: Lograr 21 con tus 2 primeras cartas otorga +15 de Escudo Sagrado."
    },
    rogue: {
      name: "Pícaro",
      title: "El Jack de Picas",
      class: "rogue",
      sprite: "🗡️",
      img: "assets/svg/rogue_idle.svg",
      imgAttack: "assets/svg/rogue_attack.svg",
      imgHurt: "assets/svg/rogue_hurt.svg",
      imgDead: "assets/svg/rogue_dead.svg",
      maxHp: 65,
      pwr: 4,
      def: 1,
      styleClass: "blood-bio",
      desc: "Trascendencia del 21: Lograr 21 con tus 2 primeras cartas inflige daño crítico x3 perforando el 100% de la armadura rival."
    },
    monk: {
      name: "Monje",
      title: "El Jack de Corazones",
      class: "monk",
      sprite: "💍",
      img: "assets/svg/monk_idle.svg",
      imgAttack: "assets/svg/monk_attack.svg",
      imgHurt: "assets/svg/monk_hurt.svg",
      imgDead: "assets/svg/monk_dead.svg",
      maxHp: 75,
      pwr: 3,
      def: 2,
      styleClass: "zen-bio",
      desc: "Trascendencia del 21: Lograr 21 con tus 2 primeras cartas restaura +20 HP y aturde al rival."
    },
    necromancer: {
      name: "Nigromante",
      title: "El Jack de Tréboles",
      class: "necromancer",
      sprite: "💀",
      img: "assets/svg/necro_idle.svg",
      imgAttack: "assets/svg/necro_attack.svg",
      imgHurt: "assets/svg/necro_hurt.svg",
      imgDead: "assets/svg/necro_dead.svg",
      maxHp: 70,
      pwr: 3,
      def: 1,
      styleClass: "blood-bio",
      desc: "Trascendencia del 21: Lograr 21 con tus 2 primeras cartas drena 10 HP al rival y le inocula 5 de Veneno residual."
    }
  };

  const HERO_LORES = {
    knight: {
      1: "Despierto en el fango de las celdas inferiores. Me despojaron de mi capa y mellaron mi escudo, pero mi juramento sigue intacto. Subiré esta maldita torre y haré pagar a los nobles que me traicionaron.",
      2: "Los carceleros y rateros se apiñan en los pasillos húmedos. Creen que un caballero desarmado es presa fácil; aprenderán que el acero más fuerte es la voluntad inquebrantable.",
      3: "Las catacumbas huelen a podredumbre y desesperación. Condenados de ojos vacíos deambulan buscando sangre. Mi deber como protector comienza liberando a estas almas de su tormento.",
      4: "Muros de piedra negra manchados de azufre. Siento la mirada de los centinelas en las troneras. Mi espada no vacilará; cada peldaño que subo es una afrenta a los tiranos de arriba.",
      5: "Alcanzo los cuarteles mercenarios. Traidores a sueldo que vendieron su lealtad por unas monedas de oro. Hoy conocerán la justicia que juré impartir.",
      6: "Los escudos de mis antiguos camaradas cuelgan como trofeos en los muros. La furia arde en mi pecho. No descansaré hasta que el estandarte del honor vuelva a ondear aquí.",
      7: "El sonido de los tambores de guerra retumba en las bóvedas. La élite mercenaria me espera con formación de falange. Que vengan; ningún muro de hierro resiste el embate de la verdad.",
      8: "Salones alfombrados en terciopelo carmesí y candelabros de oro. Los nobles corruptos me miran con terror tras sus máscaras. Aquí comenzó la conspiración contra mi casa.",
      9: "El aire está cargado de incienso y venenos sutiles. Los cortesanos intentan sobornarme con riquezas robadas. Su oro jamás limpiará la sangre derramada de inocentes.",
      10: "Las puertas del salón del trono se abren. Los consejeros reales tiemblan mientras desenvaino. La torre entera se tambalea sobre sus propios cimientos de mentira.",
      11: "El viento gélido de las alturas azota mi armadura. He dejado atrás los palacios de la corte. Solo los guardianes divinos custodian el paso final hacia la cima.",
      12: "Las nubes quedan bajo mis pies. El firmamento se tiñe de un violeta crepuscular. Los campeones celestiales intentan disuadirme, pero mi destino aguarda más arriba.",
      13: "La cúspide del 21. El rugido del Dragón Ancestral hace vibrar la piedra bajo mis botas. Es hora de cumplir el juramento supremo y liberar este reino para siempre."
    },
    rogue: {
      1: "Las cerraduras de estas celdas son un chiste de mal gusto. Una horquilla y dos segundos bastaron. Nadie encierra al mejor ladrón del bajo mundo. La torre tiene un tesoro en la cima, y va a ser mío.",
      2: "Matones de poca monta patrullan el foso. Pobres diablos; ni siquiera me oyen pasar a sus espaldas. Una estocada precisa en la sombra y sigo avanzando con los bolsillos más pesados.",
      3: "Túneles de contrabando y viejas cloacas. Me muevo como pez en el agua. Encuentro marcas dejadas por antiguos ladrones... la mayoría murieron aquí. Yo no cometeré sus errores.",
      4: "Trampas de presión y ballestas en las esquinas. Desarmarlas es casi un arte que disfruto. Los criminales que habitan este sector son descuidados; les arrebataré hasta las botas.",
      5: "Los mercenarios montaron un peaje aquí. Creen que el músculo supera al cerebro. Les daré una lección de juego limpio: quien no mira su espalda, no llega a ver el amanecer.",
      6: "Filos envenenados y dados cargados. En estos cuarteles se respira trampa y codicia. Si quieren jugar sucio, yo inventé las reglas de este juego.",
      7: "El capitán mercenario tiene una buena recompensa por mi cabeza. Qué halago. Veremos cuánto vale su cabeza cuando mi daga encuentre la comisura de su yelmo.",
      8: "Vaya, vaya... tapices de seda y copas de plata. El botín empieza a ponerse interesante. Los señores de la torre celebran fiestas mientras el pueblo se pudre abajo. Qué pena que su fiesta termine hoy.",
      9: "Cofres con cerraduras de triple pestillo. Pan comido. La nobleza gasta fortunas en seguridad inútil mientras conspiran unos contra otros. Me llevo sus secretos y sus vidas.",
      10: "Pisos de mármol pulido tan brillante que refleja mi silueta entre las sombras. La guardia del barón está en alerta máxima. Lástima para ellos que yo ya esté detrás del trono.",
      11: "El aire se vuelve tan fino que cuesta respirar. El balcón exterior cuelga sobre el abismo. Un paso en falso y son mil metros de caída. La adrenalina me mantiene más vivo que nunca.",
      12: "Los guardianes de la cima brillan como faros en la niebla. Su luz los hace blancos fáciles para mis flechas de sombra. La corona de la torre está a un suspiro de mis dedos.",
      13: "El nido del Dragón. El calor de sus llamas ilumina montañas de naipes de oro y gemas del 21. El mayor golpe de la historia está a punto de concretarse. Es todo o nada."
    },
    monk: {
      1: "La oscuridad de esta fosa es densa, pero mi espíritu arde con serenidad. La Torre 21 es una herida abierta en la tierra que engulle a los hombres por su avaricia. Comienzo mi ascenso para sanarla.",
      2: "Criaturas desdichadas atacan ciegas de rabia. Mi palma no busca destruir, sino calmar su sufrimiento con un golpe certero que apague su frenesí. La compasión también exige firmeza.",
      3: "El dolor acumulado durante siglos impregna la piedra de las catacumbas. Cierro los ojos, medito entre la penumbra y canalizo el pulso del Corazón Sagrado. Mi fe me protege.",
      4: "Las almas perdidas intentan aferrarse a mi túnica. Les ofrezco un mantra de despedida. El juego de cartas que domina este lugar es un laberinto mental; solo quien vacía su ego encuentra el 21.",
      5: "Los soldados de fortuna empuñan lanzas oxidadas y corazones corruptos. No comprenden que la fuerza bruta es efímera como el rocío del alba. Mis palmas quebrarán sus lanzas.",
      6: "Un templo profanado sirve ahora de armería para asesinos. Encenderé un incienso sobre sus escombros. La torre debe ser purificada peldaño a peldaño con la luz del espíritu.",
      7: "La furia de los generales de la torre no turba mi aliento. Inhalo paz, exhalo resolución. Su ira será el combustible que devore su propia defensa.",
      8: "El exceso de placeres mundanos ha entorpecido los sentidos de los señores de la torre. Viven en una jaula dorada creyéndose libres. Les mostraré la verdad del desapego.",
      9: "Veneno en copas de oro y sonrisas fingidas. El karma es una ley ineludible: lo que sembraron en engaños, hoy lo cosecharán ante mis puños consagrados.",
      10: "He alcanzado la cúspide de la vanidad humana. Los cortesanos suplican clemencia cuando sus trucos fallan. La clemencia empieza con la disolución de su tiranía.",
      11: "El santuario de las alturas roza las estrellas. El silencio aquí es sobrecogedor, solo interrumpido por el eco del viento. Los guardianes celestes ponen a prueba mi templanza.",
      12: "La prueba del espíritu. Mis chakras vibran en resonancia con la energía de la torre. No hay miedo en mi corazón, solo el deseo puro de restaurar la armonía cósmica.",
      13: "Ante el Dragón Ancestral, el guardián de la llama primordial. No vengo a profanar tu nido, bestia sagrada, sino a romper la rueda del juego maldito y liberar tu fuego."
    },
    necromancer: {
      1: "Me arrojaron aquí pensando que moriría en el lodo. Necios... la muerte es mi hogar y mi más leal sirvienta. Los huesos de los caídos bajo mis pies ya susurran mi nombre. La torre me pertenecerá.",
      2: "La sangre de los primeros idiotas que intentaron emboscarme nutre las raíces de mi magia. Cada vida que apago enciende una flama verde en mi báculo. El ascenso recién comienza.",
      3: "Las catacumbas son un festín para mis sentidos. Cientos de cadáveres olvidados esperan mi llamado. Extraigo su esencia espectral para fortalecer mi baraja con sellos prohibidos.",
      4: "Sombras sin descanso intentan devorarme. Pobres espectros... no reconocen a su nuevo amo. Los subyugo y los convierto en escudos de tinieblas para mi viaje hacia arriba.",
      5: "Los mercenarios temen a los vivos, pero aúllan de terror ante lo invisible. Su disciplina militar se desmorona cuando sus propios camaradas caídos se levantan a servirme.",
      6: "El suelo está empapado en aceite de armas y sangre vieja. Dibujo un círculo arcano con cenizas. Cuanto más combato, más fuerte late el corazón oscuro de mi pacto.",
      7: "Los oficiales enemigos traen talismanes para ahuyentarme. Cenizas en el viento. Ningún talismán puede detener la marea de la muerte cuando reclama su deuda.",
      8: "Los nobles visten sedas para ocultar que huelen a tumba. Sus almas están marchitas por siglos de corrupción; serán el abono perfecto para mis rituales de invocación.",
      9: "Los banquetes de la corte se convierten en funerales a mi paso. Sus riquezas no me interesan; solo busco el elixir de vitalidad que esconden en sus bodegas subterráneas.",
      10: "El salón real cae en penumbras cuando cruzo el umbral. Los guardias huyen arrojando sus armas. Los reyes de este piso ahora me sirven de rodillas como sombras eternas.",
      11: "Las alturas celestiales queman la piel de los débiles, pero mi magia oscura absorbe la luz helada del éter. Los heraldos alados de la cima intentan frenar mi tormenta.",
      12: "Arranco las plumas plateadas de los centinelas celestes. Su magia divina es exquisita cuando se transmuta en fuego negro. El trono del 21 está a un solo piso de distancia.",
      13: "El Dragón del 21. El origen de toda la magia de esta torre. Tu corazón de fuego negro alimentará mi nigromancia por milenios. Arrodíllate ante el Señor de la Muerte."
    }
  };
  window.HERO_LORES = HERO_LORES;

  const ENEMIES = [
    { name: "Duende Pilluelo",         sprite: "👺", img: "assets/svg/enemy_goblin.svg", hp: 24, pwr: 1, def: 0, trait: "thief", traitShort: "★ ROBO", traitName: "Robo (te roba 5 oro si gana)" },
    { name: "Esqueleto Maldito",      sprite: "💀", img: "assets/svg/enemy_skeleton.svg", hp: 34, pwr: 2, def: 1, trait: "undead", traitShort: "★ RESURRECCIÓN", traitName: "Resurrección (revive una vez con 15 HP)" },
    { name: "Orco Berserker",         sprite: "👹", img: "assets/svg/enemy_orc.svg", hp: 44, pwr: 2, def: 2, trait: "fury", traitShort: "★ FURIA", traitName: "Furia (+1 PWR al perder una mano)" },
    { name: "Gárgola Pétrea",        sprite: "🦇", img: "assets/svg/enemy_gargoyle.svg", hp: 68, pwr: 3, def: 3, trait: "stone", traitShort: "★ PIEL PÉTREA", traitName: "Piel de Piedra (ignora golpes de ≤3 daño)" },
    { name: "Bestia de las Sombras",  sprite: "🌑", img: "assets/svg/enemy_shadowbeast.svg", hp: 82, pwr: 4, def: 3, trait: "stealth", traitShort: "★ SIGILO", traitName: "Sigilo (juega con cartas 100% ocultas)" },
    { name: "Centurión Espectral",    sprite: "🏛️", img: "assets/svg/enemy_centurion.svg", hp: 95, pwr: 4, def: 4, trait: "disciplined", traitShort: "★ DISCIPLINA", traitName: "Disciplina (no se planta hasta 18+)" },
    { name: "Guardián de Obsidiana",  sprite: "🗿", img: "assets/svg/enemy_obsidian.svg", hp: 110, pwr: 5, def: 5, trait: "thorns", traitShort: "★ ESPINAS", traitName: "Espinas (devuelve 2 daño al ser golpeado)" },
    { name: "Dragón Guardián",        sprite: "🐉", img: "assets/svg/enemy_dragon.svg", hp: 140, pwr: 5, def: 5, trait: "dragon", traitShort: "★ ALIENTO ÍGNEO", traitName: "Aliento Dracónico (quema 3 HP; Blackjack x3)" },
    { name: "👑 BLACK (El Jack Supremo)", sprite: "👑", img: "assets/svg/enemy_black.svg", hp: 185, pwr: 6, def: 5, trait: "abyss", traitShort: "★ ABISMO 21", traitName: "Abismo 21 (Todo Blackjack drena 10 HP; inmune a veneno)" }
  ];

  const gameState = {
    floor: 1,
    gold: 0,
    isRolling: false,
    diff: "normal",
    showEnemyCards: false,
    audioEnabled: true,
    audioVolume: 0.5,
    musicVolume: 0.5,
    sfxVolume: 0.8,
    hapticsEnabled: true,
    revivesUsed: 0,
    curseTakenOnFloor: {},
    status: {
      playerShield: 0,
      playerPoison: 0,
      playerBurn: 0,
      enemyShield: 0,
      enemyPoison: 0,
      enemyBurn: 0,
      enemyRevived: false
    },
    player: {
      level: 1,
      exp: 0,
      nextLevelExp: 60,
      class: "knight",
      name: "Caballero",
      sprite: "🛡️",
      maxHp: 90,
      hp: 90,
      pwr: 2,
      def: 3,
      potions: 2,
      rerollsAvailable: 0,
      gem: null,
      accessory: null,
      curse: null,
      hasGoldenDie: false,
      playerHand: [],
      playerScore: 0,
      bust: false,
      blackjack: false,
      stand: false,
      handNumber: 0,
      betAmount: 0,
      turnShieldBonus: 0,
      turnDoubleDamage: false,
      duplaDef: 0,
    },
    enemy: {
      name: "Duende Pilluelo",
      sprite: "👺",
      maxHp: 32,
      hp: 32,
      pwr: 1,
      def: 0,
      trait: "thief",
      traitName: "Robo (te roba 5 oro si gana)",
      enemyHand: [],
      enemyScore: 0,
      bust: false,
      blackjack: false,
      stand: false,
      enemyRevealed: false,
    },
    phase: "bet",
    fateWheelSpinning: false,
    killCount: 0,
    wheelMode: "death",
  };
  window.gameState = gameState;

  const TURNS_PER_FLOOR = 5; // Batallas a 5 turnos tensos antes de Furia Mortal
  const BUST_LIMIT = 21;

  /* ============================================================
     ANTI-CHEAT: HASH DE INTEGRIDAD PARA localStorage
     Disuade trampas de edición manual con un checksum simple.
     Si el hash no coincide, el dato se invalida y se resetea.
     ============================================================ */
  const _INTEGRITY_SALT = "torre21_bj_v2_salt_k8x9z";

  function _simpleHash(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h * 0x01000193) >>> 0;
    }
    return h.toString(36);
  }

  const _memoryStorageFallback = {};
  let _storageBroken = false;

  function _saveSecure(key, data) {
    try {
      const payload = JSON.stringify(data);
      const hash = _simpleHash(payload + _INTEGRITY_SALT);
      localStorage.setItem(key, JSON.stringify({ d: payload, h: hash, v: 2 }));
    } catch (e) {
      _storageBroken = true;
      _memoryStorageFallback[key] = data;
      console.warn("Error guardando (secure):", e);
    }
  }

  function _loadSecure(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        if (_storageBroken && key in _memoryStorageFallback) return _memoryStorageFallback[key];
        return fallback;
      }
      const parsed = JSON.parse(raw);
      // Soporte legado: datos guardados sin hash (versión 1)
      if (!parsed.v || parsed.v < 2) {
        // Migrar dato legado: re-guardar con hash
        const legacyData = parsed;
        _saveSecure(key, legacyData);
        return legacyData;
      }
      // Validar hash
      const expectedHash = _simpleHash(parsed.d + _INTEGRITY_SALT);
      if (parsed.h !== expectedHash) {
        console.warn(`⚠️ [ANTI-CHEAT] Dato corrupto o editado manualmente detectado en '${key}'. Reseteando.`);
        localStorage.removeItem(key);
        delete _memoryStorageFallback[key];
        return fallback;
      }
      return JSON.parse(parsed.d);
    } catch (e) {
      if (_storageBroken && key in _memoryStorageFallback) return _memoryStorageFallback[key];
      return fallback;
    }
  }

  function _clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }

  /* FASE 1.6 — Parseo seguro de JSON persistido.
     Envuelve los JSON.parse() que leen localStorage para que un dato
     corrupto no impida el arranque de la aplicación. */
  function parseJSONSafe(raw, fallback) {
    if (raw === null || raw === undefined || raw === "") return fallback;
    if (typeof raw !== "string") return raw;
    try {
      const value = JSON.parse(raw);
      return (value === null || value === undefined) ? fallback : value;
    } catch (_) {
      return fallback;
    }
  }
  window.parseJSONSafe = parseJSONSafe;

  function parseJSONArray(raw, fallback) {
    const value = parseJSONSafe(raw, fallback);
    return Array.isArray(value) ? value : fallback;
  }
  window.parseJSONArray = parseJSONArray;

  function _validateMetaRanges(meta) {
    const MAX_EXP = 250000;
    const MAX_MASTERY = 50;
    const MAX_RUNS = 99999;
    const heroes = ["knight", "rogue", "monk", "necromancer"];
    heroes.forEach(h => {
      if (!meta[h]) return;
      meta[h].totalExp = _clamp(meta[h].totalExp || 0, 0, MAX_EXP);
      meta[h].masteryLevel = _clamp(meta[h].masteryLevel || 1, 1, MAX_MASTERY);
      meta[h].level = _clamp(meta[h].level || meta[h].masteryLevel || 1, 1, MAX_MASTERY);
      meta[h].exp = _clamp(Math.floor(meta[h].exp || 0), 0, 1000000);
      meta[h].runs = _clamp(meta[h].runs || 0, 0, MAX_RUNS);
      meta[h].wins = _clamp(meta[h].wins || 0, 0, MAX_RUNS);
      meta[h].prestigeTrophies = _clamp(Math.floor(meta[h].prestigeTrophies || 0), 0, 9999);
      // Fase 3: Doble Progresión (Legado Permanente)
      meta[h].legacyPoints = _clamp(meta[h].legacyPoints || 0, 0, 9999);
      meta[h].legacyHp = _clamp(meta[h].legacyHp || 0, 0, 10);   // Max 10 pts = +30 HP
      meta[h].legacyPwr = _clamp(meta[h].legacyPwr || 0, 0, 5);   // Max 5 pts = +5 PWR
      meta[h].legacyDef = _clamp(meta[h].legacyDef || 0, 0, 5);   // Max 5 pts = +5 DEF
    });
    return meta;
  }

  /* ============================================================
     SPRINT 1: NIVEL PERMANENTE REAL — MIGRACIÓN DE GUARDADOS
     El héroe conserva Nivel, EXP y Estadísticas entre runs.
     ============================================================ */
  function _migrateHeroMeta(meta) {
    let changed = false;
    const heroes = ["knight", "rogue", "monk", "necromancer"];
    heroes.forEach(h => {
      const m = meta[h];
      if (!m) return;
      const hero = HERO_DATA[h] || HERO_DATA.knight;

      if (typeof m.level !== "number" || m.level < 1) {
        m.level = Math.max(1, m.masteryLevel || calculateMasteryLevel(m.totalExp || 0));
        changed = true;
      }
      if (m.masteryLevel !== m.level) { m.masteryLevel = m.level; changed = true; }
      if (typeof m.exp !== "number" || m.exp < 0) { m.exp = 0; changed = true; }
      const need = getExpRequiredForLevel(m.level);
      if (m.exp >= need) { m.exp = Math.max(0, need - 1); changed = true; }

      const bonuses = getMasteryBonuses(m.level);
      if (typeof m.baseMaxHp !== "number" || m.baseMaxHp <= 0) { m.baseMaxHp = hero.maxHp + bonuses.hp; changed = true; }
      if (typeof m.basePwr !== "number" || m.basePwr < 0) { m.basePwr = hero.pwr + bonuses.pwr; changed = true; }
      if (typeof m.baseDef !== "number" || m.baseDef < 0) { m.baseDef = hero.def + bonuses.def; changed = true; }
      m.baseMaxHp = _clamp(Math.floor(m.baseMaxHp), 1, 9999);
      m.basePwr = _clamp(Math.floor(m.basePwr), 0, 999);
      m.baseDef = _clamp(Math.floor(m.baseDef), 0, 999);

      if (typeof m.prestigeTrophies !== "number" || m.prestigeTrophies < 0) { m.prestigeTrophies = 0; changed = true; }
    });
    return changed;
  }

  /* Persiste Nivel + EXP del héroe. Si se pasa `growth`, acumula el crecimiento
     automático de clase en las Estadísticas Base permanentes (sin legado ni bonuses de run). */
  function saveHeroRunProgress(p, growth) {
    if (!p) return null;
    const meta = getHeroMeta();
    const hKey = p.class || "knight";
    if (!meta[hKey]) {
      meta[hKey] = { totalExp: 0, masteryLevel: 1, level: 1, exp: 0, baseMaxHp: 0, basePwr: 0, baseDef: 0, runs: 0, wins: 0, legacyPoints: 0, legacyHp: 0, legacyPwr: 0, legacyDef: 0, prestigeTrophies: 0 };
    }
    const h = meta[hKey];
    const hero = HERO_DATA[hKey] || HERO_DATA.knight;
    if (typeof h.baseMaxHp !== "number" || h.baseMaxHp <= 0) h.baseMaxHp = hero.maxHp;
    if (typeof h.basePwr !== "number" || h.basePwr < 0) h.basePwr = hero.pwr;
    if (typeof h.baseDef !== "number" || h.baseDef < 0) h.baseDef = hero.def;
    if (growth) {
      if (growth.hp) h.baseMaxHp += growth.hp;
      if (growth.pwr) h.basePwr += growth.pwr;
      if (growth.def) h.baseDef += growth.def;
      h.baseMaxHp = _clamp(Math.floor(h.baseMaxHp), 1, 9999);
      h.basePwr = _clamp(Math.floor(h.basePwr), 0, 999);
      h.baseDef = _clamp(Math.floor(h.baseDef), 0, 999);
    }
    h.level = p.level || 1;
    h.masteryLevel = h.level;
    h.exp = Math.max(0, Math.floor(p.exp || 0));
    saveHeroMeta(meta);
    return h;
  }

  /* ============================================================
     SISTEMA DE AUDIO INTEGRAL Y SÍNTESIS PROCEDURAL WEB AUDIO
     ============================================================ */
  let audioCtx = null;
  let masterGainNode = null;
  let sfxGainNode = null;

  function ensureAudio() {
    if (typeof window === "undefined") return;
    if (!audioCtx) {
      try {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        if (AudioClass) {
          audioCtx = new AudioClass();
          masterGainNode = audioCtx.createGain();
          masterGainNode.connect(audioCtx.destination);
          updateMasterGain();
        }
      } catch (_) { audioCtx = null; }
    }
    if (audioCtx && masterGainNode && !sfxGainNode) {
      try {
        sfxGainNode = audioCtx.createGain();
        sfxGainNode.connect(masterGainNode);
        updateMasterGain();
      } catch (_) { sfxGainNode = null; }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
  }

  // SPRINT 6: única fuente de verdad del volumen maestro de audio.
  // Antes esta lógica estaba duplicada y `toggleSound()` llamaba a una
  // función `updateMasterGain()` que no existía -> ReferenceError.
  function updateMasterGain() {
    if (!masterGainNode || !audioCtx) return;
    try {
      masterGainNode.gain.setValueAtTime(gameState.audioEnabled ? gameState.audioVolume : 0, audioCtx.currentTime);
    } catch (_) {}
    if (sfxGainNode) {
      try {
        sfxGainNode.gain.value = gameState.audioEnabled ? (gameState.sfxVolume !== undefined ? gameState.sfxVolume : 0.8) : 0;
      } catch (_) {}
    }
  }
  window.updateMasterGain = updateMasterGain;

  // Persistencia de los ajustes de sonido (on/off + volumen maestro + música + SFX)
  const AUDIO_SETTINGS_KEY = "bj_audio_settings_v1";
  function loadAudioSettings() {
    try {
      const raw = localStorage.getItem(AUDIO_SETTINGS_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!saved || typeof saved !== "object") return;
      if (typeof saved.enabled === "boolean") gameState.audioEnabled = saved.enabled;
      if (typeof saved.volume === "number" && isFinite(saved.volume)) {
        gameState.audioVolume = Math.max(0, Math.min(1, saved.volume));
      }
      if (typeof saved.musicVolume === "number" && isFinite(saved.musicVolume)) {
        gameState.musicVolume = Math.max(0, Math.min(1, saved.musicVolume));
      } else {
        gameState.musicVolume = 0.5;
      }
      if (typeof saved.sfxVolume === "number" && isFinite(saved.sfxVolume)) {
        gameState.sfxVolume = Math.max(0, Math.min(1, saved.sfxVolume));
      } else {
        gameState.sfxVolume = 0.8;
      }
      const headerBtn = document.getElementById("btn-header-sound");
      if (headerBtn) {
        headerBtn.innerText = gameState.audioEnabled ? "🔊" : "🔇";
        headerBtn.title = gameState.audioEnabled ? "Sonido Activado" : "Sonido Silenciado";
      }
    } catch (_) {}
  }
  function saveAudioSettings() {
    try {
      localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify({
        enabled: gameState.audioEnabled,
        volume: gameState.audioVolume,
        musicVolume: gameState.musicVolume !== undefined ? gameState.musicVolume : 0.5,
        sfxVolume: gameState.sfxVolume !== undefined ? gameState.sfxVolume : 0.8
      }));
    } catch (_) {}
  }
  loadAudioSettings();

  function audioGain(customVol = 1.0) {
    ensureAudio();
    const target = sfxGainNode || masterGainNode;
    if (!audioCtx || !target || !gameState.audioEnabled) return null;
    try {
      const g = audioCtx.createGain();
      g.gain.setValueAtTime(customVol, audioCtx.currentTime);
      g.connect(target);
      return g;
    } catch (_) { return null; }
  }

  function musicGain(customVol = 1.0) {
    ensureAudio();
    const channel = ensureMusicChannel();
    if (!audioCtx || !channel || !gameState.audioEnabled) return null;
    try {
      const g = audioCtx.createGain();
      g.gain.setValueAtTime(customVol, audioCtx.currentTime);
      g.connect(channel);
      return g;
    } catch (_) { return null; }
  }

  function playTone(freq, duration, type = "sine", volScale = 1.0, when = null) {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const t = when || audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const g = audioGain(volScale);
      if (!g) return;
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.001, t);
      g.gain.linearRampToValueAtTime(volScale, t + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
      osc.connect(g);
      osc.start(t);
      osc.stop(t + duration + 0.02);
    } catch (_) {}
  }

  function unlockAudio() {
    ensureAudio();
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    const isAtTitleOrIntro = (typeof document !== "undefined") && (
      (!document.getElementById("screen-intro")?.classList.contains("hidden")) ||
      (!document.getElementById("screen-title")?.classList.contains("hidden"))
    );
    if (isAtTitleOrIntro && !introMusicActive && gameState.audioEnabled) {
      startIntroMusic();
    }
  }

  if (typeof window !== "undefined") {
    window.addEventListener("pointerdown", unlockAudio, { once: true, passive: true });
    window.addEventListener("touchstart", unlockAudio, { once: true, passive: true });
  }

  /* ------------------------------------------------------------
     1. PANTALLA DE INICIO: MARCHA GÓTICA ÉPICA Y TÉTRICA EN RE MENOR
     ------------------------------------------------------------ */
  let introMusicActive = false;
  let introMusicInterval = null;
  let introMusicStep = 0;

  // Secuencia melódica gótica, tenebrosa y triunfal en D menor (Re Menor)
  // Con acordes de órgano oscuro, campana fúnebre catedralicia y bombo ritual
  const INTRO_GOTHIC_STEPS = [
    // Compás 1: Re Menor (D-F-A) Tenebroso y majestuoso
    { lead: 293.7, organ: [146.8, 220.0, 349.2], bell: 587.3, kick: true,  snare: false },
    { lead: 0,     organ: [146.8, 220.0, 349.2], bell: 0,     kick: false, snare: false },
    { lead: 349.2, organ: [146.8, 220.0, 349.2], bell: 0,     kick: false, snare: true  },
    { lead: 440.0, organ: [146.8, 220.0, 349.2], bell: 0,     kick: true,  snare: false },
    { lead: 523.3, organ: [146.8, 220.0, 349.2], bell: 0,     kick: false, snare: false },
    { lead: 587.3, organ: [146.8, 220.0, 349.2], bell: 0,     kick: false, snare: true  },
    { lead: 523.3, organ: [146.8, 220.0, 349.2], bell: 0,     kick: true,  snare: false },
    { lead: 466.2, organ: [146.8, 220.0, 349.2], bell: 0,     kick: false, snare: false },

    // Compás 2: Si bemol Mayor / Disonancia oscura (Bb-D-F)
    { lead: 466.2, organ: [116.5, 174.6, 233.1], bell: 466.2, kick: true,  snare: false },
    { lead: 440.0, organ: [116.5, 174.6, 233.1], bell: 0,     kick: false, snare: false },
    { lead: 392.0, organ: [116.5, 174.6, 233.1], bell: 0,     kick: false, snare: true  },
    { lead: 349.2, organ: [116.5, 174.6, 233.1], bell: 0,     kick: true,  snare: false },
    { lead: 392.0, organ: [116.5, 174.6, 233.1], bell: 0,     kick: false, snare: false },
    { lead: 440.0, organ: [116.5, 174.6, 233.1], bell: 0,     kick: false, snare: true  },
    { lead: 466.2, organ: [116.5, 174.6, 233.1], bell: 0,     kick: true,  snare: false },
    { lead: 523.3, organ: [116.5, 174.6, 233.1], bell: 0,     kick: false, snare: false },

    // Compás 3: Sol Menor / Caverna abisal (G-Bb-D)
    { lead: 587.3, organ: [98.0, 146.8, 196.0],  bell: 587.3, kick: true,  snare: false },
    { lead: 659.3, organ: [98.0, 146.8, 196.0],  bell: 0,     kick: false, snare: false },
    { lead: 698.5, organ: [98.0, 146.8, 196.0],  bell: 0,     kick: false, snare: true  },
    { lead: 587.3, organ: [98.0, 146.8, 196.0],  bell: 0,     kick: true,  snare: false },
    { lead: 523.3, organ: [98.0, 146.8, 196.0],  bell: 0,     kick: false, snare: false },
    { lead: 466.2, organ: [98.0, 146.8, 196.0],  bell: 0,     kick: false, snare: true  },
    { lead: 440.0, organ: [98.0, 146.8, 196.0],  bell: 0,     kick: true,  snare: false },
    { lead: 392.0, organ: [98.0, 146.8, 196.0],  bell: 0,     kick: false, snare: false },

    // Compás 4: La 7ma con Tritono diabólico y resolución siniestra (A-C#-G-Bb)
    { lead: 440.0, organ: [110.0, 138.6, 196.0], bell: 880.0, kick: true,  snare: false },
    { lead: 554.4, organ: [110.0, 138.6, 196.0], bell: 0,     kick: false, snare: false },
    { lead: 587.3, organ: [110.0, 138.6, 196.0], bell: 0,     kick: false, snare: true  },
    { lead: 466.2, organ: [110.0, 138.6, 196.0], bell: 0,     kick: true,  snare: false },
    { lead: 440.0, organ: [110.0, 138.6, 196.0], bell: 0,     kick: false, snare: false },
    { lead: 370.0, organ: [73.4,  110.0, 146.8], bell: 0,     kick: false, snare: true  },
    { lead: 293.7, organ: [73.4,  110.0, 146.8], bell: 587.3, kick: true,  snare: false },
    { lead: 0,     organ: [73.4,  73.4,  146.8], bell: 0,     kick: false, snare: false }
  ];

  function playGothicBell(t, freq = 587.3) {
    if (typeof t === "number" && freq === 587.3 && t > 50) {
      freq = t;
      t = (audioCtx ? audioCtx.currentTime : 0);
    }
    if (t === undefined) t = (audioCtx ? audioCtx.currentTime : 0);
    ensureAudio();
    if (!audioCtx || !gameState.audioEnabled) return;
    try {
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const g = audioGain(0.16);
      if (!g) return;
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(freq, t);
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(freq * 2.76, t);
      g.gain.setValueAtTime(0.16, t);
      g.gain.exponentialRampToValueAtTime(0.0005, t + 1.3);
      osc1.connect(g);
      osc2.connect(g);
      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 1.35);
      osc2.stop(t + 1.35);
    } catch (_) {}
  }
  window.playGothicBell = playGothicBell;

  function playRitualKick(t) {
    if (t === undefined) t = (audioCtx ? audioCtx.currentTime : 0);
    ensureAudio();
    if (!audioCtx || !gameState.audioEnabled) return;
    try {
      const osc = audioCtx.createOscillator();
      const g = audioGain(0.32);
      if (!g) return;
      osc.type = "sine";
      osc.frequency.setValueAtTime(105, t);
      osc.frequency.exponentialRampToValueAtTime(32, t + 0.18);
      g.gain.setValueAtTime(0.32, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      osc.connect(g);
      osc.start(t);
      osc.stop(t + 0.22);
    } catch (_) {}
  }
  window.playRitualKick = playRitualKick;

  function playAltarSummonSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      const g = audioGain(0.4);
      if (g) {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(95, t);
        osc.frequency.exponentialRampToValueAtTime(38, t + 1.2);
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(380, t);
        filter.Q.setValueAtTime(5, t);
        g.gain.setValueAtTime(0.01, t);
        g.gain.linearRampToValueAtTime(0.4, t + 0.15);
        g.gain.exponentialRampToValueAtTime(0.001, t + 1.3);
        osc.connect(filter);
        filter.connect(g);
        osc.start(t);
        osc.stop(t + 1.35);
      }
      playGothicBell(t + 0.1, 440);
    } catch (_) {}
  }
  window.playAltarSummonSound = playAltarSummonSound;

  function playSynergyComboSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const notes = [587.3, 739.9, 880.0, 1174.6];
      notes.forEach((f, idx) => {
        setTimeout(() => {
          if (!audioCtx) return;
          playTone(f, 0.25, "triangle", 0.45);
          playTone(f * 1.5, 0.18, "sine", 0.25);
        }, idx * 60);
      });
    } catch (_) {}
  }
  window.playSynergyComboSound = playSynergyComboSound;

  function startIntroMusic() {
    if (introMusicActive || !gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    introMusicActive = true;
    introMusicStep = 0;
    // Si el título tiene pista de archivo configurada, se usa; si no (o si
    // falla la carga), se recurre a la marcha gótica procedural de siempre.
    if (startTrackedSceneMusic("title", startProceduralIntroMusic)) return;
    startProceduralIntroMusic();
  }

  function startProceduralIntroMusic() {
    if (!introMusicActive || !gameState.audioEnabled || !audioCtx) return;
    if (introMusicInterval) return;
    stopSceneMusic(MUSIC_CROSSFADE_SEC);
    const stepDuration = 240;
    introMusicInterval = setInterval(() => {
      if (!introMusicActive || !gameState.audioEnabled || !audioCtx) return;
      const note = INTRO_GOTHIC_STEPS[introMusicStep];
      const t = audioCtx.currentTime;

      // 1. Melodía solista (Square wave con vibrato gótico)
      if (note && note.lead > 0) {
        try {
          const osc = audioCtx.createOscillator();
          const g = audioGain(0.18);
          if (g) {
            osc.type = "square";
            osc.frequency.setValueAtTime(note.lead, t);
            osc.frequency.linearRampToValueAtTime(note.lead * 1.018, t + 0.20);
            g.gain.setValueAtTime(0.18, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
            osc.connect(g);
            osc.start(t);
            osc.stop(t + 0.23);
          }
        } catch (_) {}
      }

      // 2. Acorde de Órgano Gótico (Sawtooth con filtro catedral)
      if (note && note.organ && Array.isArray(note.organ)) {
        note.organ.forEach((freq, idx) => {
          try {
            const orgOsc = audioCtx.createOscillator();
            const filter = audioCtx.createBiquadFilter();
            const orgG = audioGain(0.08);
            if (orgG) {
              orgOsc.type = "sawtooth";
              orgOsc.frequency.setValueAtTime(freq, t);
              filter.type = "lowpass";
              filter.frequency.setValueAtTime(460, t);
              filter.Q.setValueAtTime(3.0, t);
              orgG.gain.setValueAtTime(0.08, t);
              orgG.gain.exponentialRampToValueAtTime(0.001, t + 0.24);
              orgOsc.connect(filter);
              filter.connect(orgG);
              orgOsc.start(t);
              orgOsc.stop(t + 0.25);
            }
          } catch (_) {}
        });
      }

      // 3. Campana fúnebre catedralicia
      if (note && note.bell > 0) {
        try {
          playGothicBell(t, note.bell);
        } catch (_) {}
      }

      // 4. Bombo ritual pesado
      if (note && note.kick) {
        try {
          playRitualKick(t);
        } catch (_) {}
      }

      // 5. Caja ceremonial chiptune
      if (note && note.snare) {
        try {
          playChiptuneSnare(t);
        } catch (_) {}
      }

      introMusicStep = (introMusicStep + 1) % INTRO_GOTHIC_STEPS.length;
    }, stepDuration);
  }
  window.startIntroMusic = startIntroMusic;

  function stopIntroMusic() {
    introMusicActive = false;
    if (introMusicInterval) {
      clearInterval(introMusicInterval);
      introMusicInterval = null;
    }
    stopSceneMusicIfScene("title");
  }
  window.stopIntroMusic = stopIntroMusic;

  function playChiptuneSnare(t) {
    if (!audioCtx) return;
    try {
      const bufferSize = Math.floor(audioCtx.sampleRate * 0.04);
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = audioCtx.createBufferSource();
      whiteNoise.buffer = buffer;
      const filter = audioCtx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.setValueAtTime(1200, t);
      const g = audioGain(0.07);
      if (g) {
        g.gain.setValueAtTime(0.07, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.038);
        whiteNoise.connect(filter);
        filter.connect(g);
        whiteNoise.start(t);
        whiteNoise.stop(t + 0.04);
      }
    } catch (_) {}
  }

  /* ------------------------------------------------------------
     2. MÚSICA DE FONDO EN BATALLA (SUTIL PERO ÉPICA)
     ------------------------------------------------------------ */
  let combatMusicActive = false;
  let combatMusicInterval = null;
  let combatMusicStep = 0;

  const COMBAT_BASS_STEPS = [
    110.0, 110.0, 130.8, 146.8,
    110.0, 110.0, 164.8, 146.8,
    98.0,  98.0,  123.5, 146.8,
    87.3,  87.3,  110.0, 130.8
  ];

  function startCombatMusic() {
    if (combatMusicActive || !gameState.audioEnabled) return;
    stopIntroMusic();
    ensureAudio();
    if (!audioCtx) return;
    combatMusicActive = true;
    combatMusicStep = 0;
    // Pista de archivo de combate (o de jefe si está configurada) con
    // fallback al bucle procedural actual.
    const isBossFight = gameState.enemy && String(gameState.enemy.name || "").indexOf("BLACK") >= 0;
    const sceneKey = (isBossFight && MUSIC_TRACKS.boss) ? "boss" : "combat";
    if (startTrackedSceneMusic(sceneKey, startProceduralCombatMusic)) return;
    startProceduralCombatMusic();
  }

  function startProceduralCombatMusic() {
    if (!combatMusicActive || !gameState.audioEnabled || !audioCtx) return;
    if (combatMusicInterval) return;
    stopSceneMusic(MUSIC_CROSSFADE_SEC);
    const stepDuration = 280;
    combatMusicInterval = setInterval(() => {
      if (!combatMusicActive || !gameState.audioEnabled || !audioCtx) return;
      const freq = COMBAT_BASS_STEPS[combatMusicStep];
      const t = audioCtx.currentTime;

      try {
        const osc = audioCtx.createOscillator();
        const filter = audioCtx.createBiquadFilter();
        const g = audioGain(0.12);
        if (g) {
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, t);
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(320, t);
          filter.Q.setValueAtTime(3.5, t);
          g.gain.setValueAtTime(0.12, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.26);
          osc.connect(filter);
          filter.connect(g);
          osc.start(t);
          osc.stop(t + 0.27);
        }

        if (combatMusicStep % 4 === 0) {
          const padOsc = audioCtx.createOscillator();
          const padG = audioGain(0.04);
          if (padG) {
            padOsc.type = "sine";
            padOsc.frequency.setValueAtTime(freq * 2, t);
            padG.gain.setValueAtTime(0.01, t);
            padG.gain.linearRampToValueAtTime(0.04, t + 0.3);
            padG.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
            padOsc.connect(padG);
            padOsc.start(t);
            padOsc.stop(t + 1.05);
          }
        }
      } catch (_) {}

      combatMusicStep = (combatMusicStep + 1) % COMBAT_BASS_STEPS.length;
    }, stepDuration);
  }
  window.startCombatMusic = startCombatMusic;

  function stopCombatMusic() {
    combatMusicActive = false;
    if (combatMusicInterval) {
      clearInterval(combatMusicInterval);
      combatMusicInterval = null;
    }
    stopSceneMusicIfScene("combat");
    stopSceneMusicIfScene("boss");
  }
  window.stopCombatMusic = stopCombatMusic;

  /* ------------------------------------------------------------
     3. MUERTE SÚBITA: ALARMA Y TENSIÓN ESCALADA POR ASALTOS
     ------------------------------------------------------------ */
  let suddenDeathActive = false;
  let suddenDeathInterval = null;

  function startSuddenDeathTension(suddenRound = 1) {
    stopSuddenDeathTension();
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    suddenDeathActive = true;

    const intervalMs = Math.max(170, 480 - (suddenRound - 1) * 90);
    const basePitch = 120 + Math.min(180, (suddenRound - 1) * 35);
    const alarmPitch = 880 + Math.min(900, (suddenRound - 1) * 220);

    suddenDeathInterval = setInterval(() => {
      if (!suddenDeathActive || !gameState.audioEnabled || !audioCtx) return;
      const t = audioCtx.currentTime;
      try {
        const oscHeart = audioCtx.createOscillator();
        const gHeart = audioGain(0.35);
        if (gHeart) {
          oscHeart.type = "sine";
          oscHeart.frequency.setValueAtTime(basePitch, t);
          oscHeart.frequency.exponentialRampToValueAtTime(45, t + 0.12);
          gHeart.gain.setValueAtTime(0.35, t);
          gHeart.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
          oscHeart.connect(gHeart);
          oscHeart.start(t);
          oscHeart.stop(t + 0.15);
        }

        const oscAlarm = audioCtx.createOscillator();
        const gAlarm = audioGain(0.18);
        if (gAlarm) {
          oscAlarm.type = "sawtooth";
          oscAlarm.frequency.setValueAtTime(alarmPitch, t);
          oscAlarm.frequency.exponentialRampToValueAtTime(alarmPitch * 0.8, t + 0.08);
          gAlarm.gain.setValueAtTime(0.18, t);
          gAlarm.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
          oscAlarm.connect(gAlarm);
          oscAlarm.start(t);
          oscAlarm.stop(t + 0.1);
        }
      } catch (_) {}
    }, intervalMs);
  }
  window.startSuddenDeathTension = startSuddenDeathTension;

  function stopSuddenDeathTension() {
    suddenDeathActive = false;
    if (suddenDeathInterval) {
      clearInterval(suddenDeathInterval);
      suddenDeathInterval = null;
    }
  }
  window.stopSuddenDeathTension = stopSuddenDeathTension;

  /* ------------------------------------------------------------
     4. EFECTOS SONOROS DE COMBATE Y JUEGO
     ------------------------------------------------------------ */
  function playCombatEncounterTerrorSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      const g = audioGain(0.48);
      if (g) {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(160, t);
        osc.frequency.exponentialRampToValueAtTime(38, t + 0.85);

        const lfo = audioCtx.createOscillator();
        const lfoGain = audioCtx.createGain();
        lfo.frequency.setValueAtTime(28, t);
        lfoGain.gain.setValueAtTime(25, t);
        lfo.connect(osc.frequency);
        lfo.start(t);
        lfo.stop(t + 0.9);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(550, t);
        filter.frequency.exponentialRampToValueAtTime(140, t + 0.85);
        filter.Q.setValueAtTime(6.0, t);

        g.gain.setValueAtTime(0.01, t);
        g.gain.linearRampToValueAtTime(0.48, t + 0.1);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.9);

        osc.connect(filter);
        filter.connect(g);
        osc.start(t);
        osc.stop(t + 0.95);
      }

      const noiseLen = 0.7;
      const bufSize = Math.floor(audioCtx.sampleRate * noiseLen);
      const noiseBuf = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
      const out = noiseBuf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) out[i] = (Math.random() * 2 - 1) * 0.5;
      const nSource = audioCtx.createBufferSource();
      nSource.buffer = noiseBuf;
      const nFilter = audioCtx.createBiquadFilter();
      nFilter.type = "bandpass";
      nFilter.frequency.setValueAtTime(380, t);
      nFilter.frequency.exponentialRampToValueAtTime(120, t + noiseLen);
      nFilter.Q.setValueAtTime(4.0, t);
      const nGain = audioGain(0.24);
      if (nGain) {
        nGain.gain.setValueAtTime(0.24, t);
        nGain.gain.exponentialRampToValueAtTime(0.001, t + noiseLen);
        nSource.connect(nFilter);
        nFilter.connect(nGain);
        nSource.start(t);
        nSource.stop(t + noiseLen + 0.05);
      }
    } catch (_) {}
  }
  window.playCombatEncounterTerrorSound = playCombatEncounterTerrorSound;

  function playCardDealSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const t = audioCtx.currentTime;
      const bufSize = Math.floor(audioCtx.sampleRate * 0.065);
      const buf = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1);
      const src = audioCtx.createBufferSource();
      src.buffer = buf;
      const filter = audioCtx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(2400, t);
      filter.frequency.exponentialRampToValueAtTime(1200, t + 0.06);
      filter.Q.setValueAtTime(1.8, t);
      const g = audioGain(0.24);
      if (g) {
        g.gain.setValueAtTime(0.02, t);
        g.gain.linearRampToValueAtTime(0.24, t + 0.012);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.065);
        src.connect(filter);
        filter.connect(g);
        src.start(t);
        src.stop(t + 0.07);
      }
    } catch (_) {}
  }
  window.playCardDealSound = playCardDealSound;
  window.playCardSound = playCardDealSound;

  function playHitActionSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    playTone(720, 0.04, "triangle", 0.35);
    playCardDealSound();
  }
  window.playHitActionSound = playHitActionSound;

  function playStandActionSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const g = audioGain(0.45);
      if (g) {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(130, t);
        osc.frequency.exponentialRampToValueAtTime(45, t + 0.09);
        g.gain.setValueAtTime(0.45, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.connect(g);
        osc.start(t);
        osc.stop(t + 0.11);
      }
    } catch (_) {}
  }
  window.playStandActionSound = playStandActionSound;

  function playRerollActionSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      [0, 45, 95, 140].forEach((delay, idx) => {
        setTimeout(() => {
          if (!audioCtx) return;
          const t = audioCtx.currentTime;
          const osc = audioCtx.createOscillator();
          const g = audioGain(0.24 - idx * 0.03);
          if (g) {
            osc.type = "sine";
            osc.frequency.setValueAtTime(650 + Math.random() * 200, t);
            osc.frequency.exponentialRampToValueAtTime(150, t + 0.025);
            g.gain.setValueAtTime(0.24, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.028);
            osc.connect(g);
            osc.start(t);
            osc.stop(t + 0.03);
          }
        }, delay);
      });
    } catch (_) {}
  }
  window.playRerollActionSound = playRerollActionSound;

  function playPotionDrinkSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const t = audioCtx.currentTime;
      playTone(360, 0.04, "triangle", 0.35, t);
      setTimeout(() => playTone(240, 0.07, "sine", 0.45), 55);
      setTimeout(() => playTone(310, 0.07, "sine", 0.45), 120);
      setTimeout(() => playTone(880, 0.22, "sine", 0.4), 210);
      setTimeout(() => playTone(1100, 0.22, "sine", 0.4), 270);
      setTimeout(() => playTone(1320, 0.32, "triangle", 0.5), 330);
    } catch (_) {}
  }
  window.playPotionDrinkSound = playPotionDrinkSound;

  function playBustSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const t = audioCtx.currentTime;
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const g = audioGain(0.42);
      if (g) {
        osc1.type = "sawtooth";
        osc2.type = "sawtooth";
        osc1.frequency.setValueAtTime(170, t);
        osc1.frequency.exponentialRampToValueAtTime(65, t + 0.4);
        osc2.frequency.setValueAtTime(240, t);
        osc2.frequency.exponentialRampToValueAtTime(92, t + 0.4);

        g.gain.setValueAtTime(0.42, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.42);

        osc1.connect(g);
        osc2.connect(g);
        osc1.start(t);
        osc2.start(t);
        osc1.stop(t + 0.45);
        osc2.stop(t + 0.45);
      }
    } catch (_) {}
  }
  window.playBustSound = playBustSound;

  function playBlackjackFanfareSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const notes = [523.3, 659.3, 784.0, 1046.5, 1318.5, 1568.0];
      notes.forEach((f, idx) => {
        setTimeout(() => {
          if (!audioCtx) return;
          playTone(f, 0.35, "sine", 0.65);
          playTone(f * 2, 0.22, "triangle", 0.35);
        }, idx * 65);
      });
    } catch (_) {}
  }
  window.playBlackjackFanfareSound = playBlackjackFanfareSound;
  window.playBlackjackSound = playBlackjackFanfareSound;

  function playWeaponClashPushSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const t = audioCtx.currentTime;
      const oscMetal1 = audioCtx.createOscillator();
      const oscMetal2 = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      const g = audioGain(0.5);
      if (g) {
        oscMetal1.type = "sawtooth";
        oscMetal1.frequency.setValueAtTime(1950, t);
        oscMetal1.frequency.exponentialRampToValueAtTime(1200, t + 0.25);

        oscMetal2.type = "square";
        oscMetal2.frequency.setValueAtTime(2850, t);
        oscMetal2.frequency.exponentialRampToValueAtTime(1800, t + 0.25);

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(2200, t);
        filter.Q.setValueAtTime(8.0, t);

        g.gain.setValueAtTime(0.5, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

        oscMetal1.connect(filter);
        oscMetal2.connect(filter);
        filter.connect(g);

        oscMetal1.start(t);
        oscMetal2.start(t);
        oscMetal1.stop(t + 0.38);
        oscMetal2.stop(t + 0.38);
      }
    } catch (_) {}
  }
  window.playWeaponClashPushSound = playWeaponClashPushSound;
  window.playSwordClashSound = playWeaponClashPushSound;

  function playNextRoundSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const g = audioGain(0.48);
      if (g) {
        osc.type = "sine";
        osc.frequency.setValueAtTime(125, t);
        osc.frequency.exponentialRampToValueAtTime(48, t + 0.3);
        g.gain.setValueAtTime(0.48, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
        osc.connect(g);
        osc.start(t);
        osc.stop(t + 0.35);
      }
    } catch (_) {}
  }
  window.playNextRoundSound = playNextRoundSound;

  function playWheelTickSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const g = audioGain(0.28);
      if (g) {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(1450, t);
        osc.frequency.exponentialRampToValueAtTime(220, t + 0.018);
        g.gain.setValueAtTime(0.28, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
        osc.connect(g);
        osc.start(t);
        osc.stop(t + 0.025);
      }
    } catch (_) {}
  }
  window.playWheelTickSound = playWheelTickSound;

  function playLevelUpSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const fanfare = [
        { f: 392.0, dur: 0.16, vol: 0.65 }, // Sol 4
        { f: 523.3, dur: 0.18, vol: 0.70 }, // Do 5
        { f: 659.3, dur: 0.20, vol: 0.75 }, // Mi 5
        { f: 784.0, dur: 0.24, vol: 0.80 }, // Sol 5
        { f: 1046.5, dur: 0.55, vol: 0.90 } // Do 6 (Clímax)
      ];
      fanfare.forEach((n, idx) => {
        setTimeout(() => {
          if (!audioCtx) return;
          playTone(n.f, n.dur, "triangle", n.vol);
          playTone(n.f * 1.5, n.dur * 0.7, "sine", n.vol * 0.4);
          if (idx === fanfare.length - 1) {
            // Campana de triunfo al final
            try { playGothicBell(audioCtx.currentTime, 1046.5); } catch (_) {}
          }
        }, idx * 75);
      });
    } catch (_) {}
  }
  window.playLevelUpSound = playLevelUpSound;

  function playCampfireSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const t = audioCtx.currentTime;
      playTone(180, 0.45, "sine", 0.25, t);
      [40, 110, 180, 260, 340].forEach((delay) => {
        setTimeout(() => {
          if (!audioCtx) return;
          playTone(850 + Math.random() * 400, 0.03, "triangle", 0.15);
        }, delay);
      });
    } catch (_) {}
  }
  window.playCampfireSound = playCampfireSound;

  function playBazaarShopSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const chimes = [1318.5, 1568.0, 1975.5, 2637.0];
      chimes.forEach((f, idx) => {
        setTimeout(() => {
          if (!audioCtx) return;
          playTone(f, 0.3, "sine", 0.45);
        }, idx * 60);
      });
    } catch (_) {}
  }
  window.playBazaarShopSound = playBazaarShopSound;

  function playFloorAscentSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      [0, 260].forEach((delay) => {
        setTimeout(() => {
          if (!audioCtx) return;
          const t = audioCtx.currentTime;
          const osc = audioCtx.createOscillator();
          const g = audioGain(0.35);
          if (g) {
            osc.type = "sine";
            osc.frequency.setValueAtTime(85, t);
            osc.frequency.exponentialRampToValueAtTime(35, t + 0.18);
            g.gain.setValueAtTime(0.35, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
            osc.connect(g);
            osc.start(t);
            osc.stop(t + 0.22);
          }
        }, delay);
      });
    } catch (_) {}
  }
  window.playFloorAscentSound = playFloorAscentSound;

  function playMenuClickSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const g = audioGain(0.12);
      if (g) {
        osc.type = "sine";
        osc.frequency.setValueAtTime(1150, t);
        osc.frequency.exponentialRampToValueAtTime(320, t + 0.022);
        g.gain.setValueAtTime(0.12, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.025);
        osc.connect(g);
        osc.start(t);
        osc.stop(t + 0.03);
      }
    } catch (_) {}
  }
  window.playMenuClickSound = playMenuClickSound;
  window.playButtonClickSound = playMenuClickSound;

  function playBounceSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const g = audioGain(0.3);
      if (g) {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(180, t);
        osc.frequency.linearRampToValueAtTime(340, t + 0.03);
        osc.frequency.exponentialRampToValueAtTime(120, t + 0.08);
        g.gain.setValueAtTime(0.3, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
        osc.connect(g);
        osc.start(t);
        osc.stop(t + 0.1);
      }
    } catch (_) {}
  }
  window.playBounceSound = playBounceSound;
  window.playIntroBounceSound = playBounceSound;

  function playCoinSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      playTone(987.8, 0.08, "square", 0.35);
      setTimeout(() => playTone(1318.5, 0.14, "square", 0.45), 55);
    } catch (_) {}
  }
  window.playCoinSound = playCoinSound;
  window.playIntroCoinHitSound = playCoinSound;

  function playAnvilStrikeSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      playTone(180, 0.25, "sawtooth", 0.9);
      setTimeout(() => playTone(880, 0.45, "triangle", 0.8), 20);
      setTimeout(() => playTone(1760, 0.35, "sine", 0.6), 40);
    } catch (_) {}
  }
  window.playAnvilStrikeSound = playAnvilStrikeSound;

  function playLaunchSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      playTone(280, 0.07, "sine", 0.4);
      setTimeout(() => playTone(560, 0.1, "sine", 0.6), 40);
    } catch (_) {}
  }
  window.playLaunchSound = playLaunchSound;

  function playHitSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    playTone(120, 0.22, "sawtooth", 1.2);
    playTone(80, 0.28, "square", 0.8);
  }
  window.playHitSound = playHitSound;

  function playBaritaChimeSound() {
    if (!gameState || !gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      playTone(523.25, 0.15, "sine", 0.4);
      setTimeout(() => playTone(659.25, 0.18, "sine", 0.45), 70);
      setTimeout(() => playTone(783.99, 0.22, "sine", 0.5), 140);
      setTimeout(() => playTone(1046.50, 0.35, "triangle", 0.55), 210);
      setTimeout(() => playTone(1567.98, 0.4, "sine", 0.35), 280);
    } catch (_) {}
  }
  window.playBaritaChimeSound = playBaritaChimeSound;

  function playComicPageTurnSound() {
    if (!gameState || !gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      playTone(320, 0.08, "triangle", 0.3);
      setTimeout(() => playTone(480, 0.06, "sine", 0.25), 35);
    } catch (_) {}
  }
  window.playComicPageTurnSound = playComicPageTurnSound;

  function playComicImpactSound() {
    if (!gameState || !gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      playTone(180, 0.12, "square", 0.4);
      setTimeout(() => playTone(90, 0.18, "sawtooth", 0.35), 20);
    } catch (_) {}
  }
  window.playComicImpactSound = playComicImpactSound;

  function playCoinLandSound() {
    if (!gameState || !gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      playTone(640, 0.06, "triangle", 0.4);
      setTimeout(() => playTone(820, 0.09, "sine", 0.35), 35);
      setTimeout(() => playTone(1200, 0.12, "sine", 0.25), 70);
    } catch (_) {}
  }
  window.playCoinLandSound = playCoinLandSound;

  function playSealStampSound() {
    if (!gameState || !gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      playTone(240, 0.1, "triangle", 0.45);
      setTimeout(() => playTone(480, 0.14, "sine", 0.4), 30);
    } catch (_) {}
  }
  window.playSealStampSound = playSealStampSound;

  function playTacticalAbilitySound() {
    if (!gameState || !gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      playTone(360, 0.09, "sawtooth", 0.35);
      setTimeout(() => playTone(720, 0.16, "sine", 0.4), 45);
    } catch (_) {}
  }
  window.playTacticalAbilitySound = playTacticalAbilitySound;

  function playDamageSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    playTone(190, 0.16, "sawtooth", 0.9);
    playTone(140, 0.22, "square", 0.6);
  }
  window.playDamageSound = playDamageSound;

  function playVictorySound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    const melody = [523, 659, 784, 1047];
    melody.forEach((f, i) => {
      setTimeout(() => playTone(f, 0.2, "triangle", 1.0), i * 120);
    });
  }
  window.playVictorySound = playVictorySound;

  function playGameOverSound() {
    if (!gameState.audioEnabled) return;
    stopCombatMusic();
    stopSuddenDeathTension();
    ensureAudio();
    if (!audioCtx) return;
    const melody = [400, 350, 300, 220];
    melody.forEach((f, i) => {
      setTimeout(() => playTone(f, 0.25, "sawtooth", 0.8), i * 150);
    });
  }
  window.playGameOverSound = playGameOverSound;

  function playShieldSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    playTone(850, 0.08, "triangle", 0.7);
    setTimeout(() => playTone(600, 0.12, "sine", 0.5), 35);
  }
  window.playShieldSound = playShieldSound;

  function playPoisonSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    playTone(320, 0.07, "sawtooth", 0.4);
    setTimeout(() => playTone(240, 0.09, "sine", 0.6), 50);
  }
  window.playPoisonSound = playPoisonSound;

  function playDodgeSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    playTone(450, 0.05, "sine", 0.5);
    setTimeout(() => playTone(750, 0.08, "triangle", 0.6), 30);
  }
  window.playDodgeSound = playDodgeSound;

  function playJackpotSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    [523, 659, 784, 1046].forEach((f, idx) => {
      setTimeout(() => playTone(f, 0.1, "sine", 0.7), idx * 60);
    });
  }
  window.playJackpotSound = playJackpotSound;

  function playPackTearSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const g = audioGain(0.45);
      if (!g) return;
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1350, t);
      osc.frequency.exponentialRampToValueAtTime(160, t + 0.18);
      g.gain.setValueAtTime(0.45, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      osc.connect(g);
      osc.start(t);
      osc.stop(t + 0.22);

      setTimeout(() => {
        if (!audioCtx) return;
        const t2 = audioCtx.currentTime;
        const osc2 = audioCtx.createOscillator();
        const g2 = audioGain(0.35);
        if (!g2) return;
        osc2.type = "sawtooth";
        osc2.frequency.setValueAtTime(650, t2);
        osc2.frequency.exponentialRampToValueAtTime(80, t2 + 0.12);
        g2.gain.setValueAtTime(0.35, t2);
        g2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.14);
        osc2.connect(g2);
        osc2.start(t2);
        osc2.stop(t2 + 0.15);
      }, 65);
    } catch (_) {}
  }
  window.playPackTearSound = playPackTearSound;

  function playEnchantChimeSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const notes = [1046, 1318, 1568, 2093, 2637];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (!audioCtx) return;
          playTone(freq, 0.32, "sine", 0.7);
        }, idx * 50);
      });
    } catch (_) {}
  }
  window.playEnchantChimeSound = playEnchantChimeSound;

  function playTypewriterClickSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const g = audioGain(0.12);
      if (!g) return;
      const baseFreq = 920 + Math.random() * 260;
      osc.type = "triangle";
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(90, t + 0.022);
      g.gain.setValueAtTime(0.12, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.025);
      osc.connect(g);
      osc.start(t);
      osc.stop(t + 0.03);
    } catch (_) {}
  }
  window.playTypewriterClickSound = playTypewriterClickSound;

  function playVampiricSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      playTone(220, 0.22, "sawtooth", 0.65);
      setTimeout(() => playTone(165, 0.26, "sawtooth", 0.75), 70);
      setTimeout(() => playTone(110, 0.35, "sine", 0.85), 150);
    } catch (_) {}
  }
  window.playVampiricSound = playVampiricSound;

  function playSteelSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      playTone(880, 0.18, "triangle", 0.8);
      playTone(1760, 0.12, "sine", 0.5);
      setTimeout(() => playTone(440, 0.22, "sine", 0.6), 35);
    } catch (_) {}
  }
  window.playSteelSound = playSteelSound;

  function playCoinCascadeSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      [987, 1318, 1567, 1975, 2637].forEach((f, i) => {
        setTimeout(() => playTone(f, 0.08, "sine", 0.6), i * 35);
      });
    } catch (_) {}
  }
  window.playCoinCascadeSound = playCoinCascadeSound;

  /* ------------------------------------------------------------
     4B. SFX DE VICTORIA, RECOMPENSAS Y MALDICIÓN
         (antes invocados desde modales e improvements.js sin existir:
          el try/catch silenciaba el ReferenceError y no sonaba nada)
      ------------------------------------------------------------ */
  function playWinFanfareSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const steps = [
        [523.3, 0], [523.3, 110], [523.3, 220],
        [659.3, 330], [784.0, 450], [1046.5, 600]
      ];
      steps.forEach((step) => {
        setTimeout(() => {
          if (!audioCtx) return;
          playTone(step[0], 0.28, "triangle", 0.7);
          playTone(step[0] * 0.5, 0.28, "sine", 0.3);
        }, step[1]);
      });
      setTimeout(() => {
        if (!audioCtx) return;
        playTone(1318.5, 0.55, "sine", 0.6);
        playTone(1568.0, 0.55, "triangle", 0.35);
        playTone(659.3, 0.55, "sine", 0.3);
      }, 760);
    } catch (_) {}
  }
  window.playWinFanfareSound = playWinFanfareSound;

  function playVictoryFanfareSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      [784.0, 987.8, 1174.7, 1568.0].forEach((f, idx) => {
        setTimeout(() => {
          if (!audioCtx) return;
          playTone(f, 0.2, "sine", 0.55);
          playTone(f * 1.5, 0.14, "triangle", 0.25);
        }, idx * 70);
      });
    } catch (_) {}
  }
  window.playVictoryFanfareSound = playVictoryFanfareSound;

  function playCurseSound() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      const g = audioGain(0.4);
      if (g) {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.exponentialRampToValueAtTime(55, t + 0.9);
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(900, t);
        filter.frequency.exponentialRampToValueAtTime(160, t + 0.9);
        filter.Q.setValueAtTime(7, t);
        g.gain.setValueAtTime(0.02, t);
        g.gain.linearRampToValueAtTime(0.4, t + 0.12);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.0);
        osc.connect(filter);
        filter.connect(g);
        osc.start(t);
        osc.stop(t + 1.05);
      }
      // Añadillo disonante (tritono): firma clásica de maldición
      playTone(311.1, 0.5, "square", 0.16, t + 0.18);
      playTone(440.0, 0.6, "sine", 0.2, t + 0.34);
    } catch (_) {}
  }
  window.playCurseSound = playCurseSound;

  // Música de pantalla de título (menú principal suave vs intro cinemática)
  function playTitleMusic() {
    stopCombatMusic();
    stopSuddenDeathTension();
    const isAtIntro = (typeof document !== "undefined") && (!document.getElementById("screen-intro")?.classList.contains("hidden"));
    if (isAtIntro) {
      startIntroMusic();
    } else {
      startMainMenuMusic();
    }
  }
  window.playTitleMusic = playTitleMusic;

  /* ============================================================
     MOTOR DE MÚSICA POR ARCHIVOS (MP3/OGG) — CANAL INDEPENDIENTE
     - `musicGain` cuelga del masterGainNode → hereda mute/volumen.
     - Si la escena tiene pista en MUSIC_TRACKS y el archivo se decodifica
       bien, suena en bucle; si no, fallback a la música procedural.
     - Una sola pista de archivo a la vez (crossfade corto).
     ============================================================ */
  const MUSIC_TRACKS = {
    // escena -> ruta relativa a la raíz del proyecto (fuente única de verdad).
    // Todas las pistas actuales son CC0 (dominio público): no exigen crédito.
    // Para activar/desactivar una escena basta con añadir o quitar su entrada:
    // "title":    "assets/audio/musica/xxx.mp3",
    // "campfire": "assets/audio/musica/xxx.mp3",
    combat: "assets/audio/musica/combate_determined_pursuit.mp3",
    boss: "assets/audio/musica/jefe_the_final_battle.mp3",
    bazaar: "assets/audio/musica/moil_dark_jazz.mp3"
  };
  const MUSIC_FADE_SEC = 1.2;
  const MUSIC_CROSSFADE_SEC = 0.6;
  const MUSIC_CHANNEL_VOLUME = 0.9;
  let musicGainNode = null;
  const musicBufferPromises = Object.create(null);
  const sceneMusicToken = Object.create(null);
  let currentMusicSource = null;
  let currentMusicScene = null;

  function ensureMusicChannel() {
    ensureAudio();
    if (!audioCtx || !masterGainNode) return null;
    if (!musicGainNode) {
      try {
        musicGainNode = audioCtx.createGain();
        musicGainNode.gain.value = MUSIC_CHANNEL_VOLUME;
        musicGainNode.connect(masterGainNode);
      } catch (_) { musicGainNode = null; }
    }
    return musicGainNode;
  }

  function loadMusicBuffer(url) {
    if (musicBufferPromises[url]) return musicBufferPromises[url];
    if (typeof fetch !== "function" || !audioCtx) {
      return Promise.reject(new Error("audio o fetch no disponible"));
    }
    musicBufferPromises[url] = fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status + " para " + url);
        return res.arrayBuffer();
      })
      .then((arrayBuffer) => new Promise((resolve, reject) => {
        // Forma con callbacks: compatible con WebView Android antiguos
        const p = audioCtx.decodeAudioData(arrayBuffer, resolve, reject);
        if (p && typeof p.then === "function") p.then(resolve, reject);
      }))
      .catch((err) => {
        delete musicBufferPromises[url];
        throw err;
      });
    return musicBufferPromises[url];
  }

  function stopSceneMusic(fadeSec = MUSIC_CROSSFADE_SEC) {
    stopProceduralSceneMusic();
    const src = currentMusicSource;
    const scene = currentMusicScene;
    currentMusicSource = null;
    currentMusicScene = null;
    if (scene) sceneMusicToken[scene] = (sceneMusicToken[scene] || 0) + 1;
    if (!src) return;
    try {
      const fade = src._sceneFadeGain;
      if (audioCtx && fade) {
        const t = audioCtx.currentTime;
        const cur = Math.max(fade.gain.value, 0.0001);
        fade.gain.cancelScheduledValues(t);
        fade.gain.setValueAtTime(cur, t);
        fade.gain.linearRampToValueAtTime(0.0001, t + fadeSec);
        src.stop(t + fadeSec + 0.05);
      } else {
        src.stop();
      }
    } catch (_) {}
  }

  // Detiene la pista de una escena concreta (y cancela cargas pendientes de esa escena)
  function stopSceneMusicIfScene(sceneKey, fadeSec = MUSIC_CROSSFADE_SEC) {
    sceneMusicToken[sceneKey] = (sceneMusicToken[sceneKey] || 0) + 1;
    if (currentMusicScene === sceneKey) stopSceneMusic(fadeSec);
    if (activeProceduralScene === sceneKey) stopProceduralSceneMusic();
  }

  /* Intenta reproducir la pista de archivo de una escena.
     Devuelve true si la escena TIENE pista configurada (el llamante no debe
     lanzar la música procedural en ese caso); si la carga falla, ejecuta
     `fallbackFn` para que el juego nunca se quede en silencio. */
  function startTrackedSceneMusic(sceneKey, fallbackFn) {
    const url = MUSIC_TRACKS[sceneKey];
    if (!url) return false;
    if (currentMusicScene === sceneKey && currentMusicSource) return true;
    if (!gameState.audioEnabled) return true;
    const channel = ensureMusicChannel();
    if (!audioCtx || !channel) return false;
    const token = (sceneMusicToken[sceneKey] = (sceneMusicToken[sceneKey] || 0) + 1);
    loadMusicBuffer(url).then((buffer) => {
      if (!audioCtx || !gameState.audioEnabled) return;
      if (sceneMusicToken[sceneKey] !== token) return; // cancelado por otra escena
      if (currentMusicScene === sceneKey && currentMusicSource) return;
      stopSceneMusic(MUSIC_CROSSFADE_SEC);
      try {
        const src = audioCtx.createBufferSource();
        src.buffer = buffer;
        src.loop = true;
        const fade = audioCtx.createGain();
        fade.gain.value = 0.0001;
        src.connect(fade);
        fade.connect(channel);
        const t = audioCtx.currentTime;
        fade.gain.setValueAtTime(0.0001, t);
        fade.gain.linearRampToValueAtTime(1, t + MUSIC_FADE_SEC);
        src._sceneFadeGain = fade;
        src.onended = () => {
          if (currentMusicSource === src) {
            currentMusicSource = null;
            currentMusicScene = null;
          }
        };
        src.start(t);
        currentMusicSource = src;
        currentMusicScene = sceneKey;
      } catch (_) {}
    }).catch(() => {
      if (typeof fallbackFn === "function" && gameState.audioEnabled) {
        try { fallbackFn(); } catch (_) {}
      }
    });
    return true;
  }

  /* ============================================================
     SINTETIZADORES DE MÚSICA PROCEDURAL POR ESCENA (WEB AUDIO)
     Garantizan música temática única para cada menú sin depender
     exclusivamente de archivos MP3 externos.
     ============================================================ */
  let activeProceduralMusicInterval = null;
  let activeProceduralScene = null;
  let activeProceduralStep = 0;

  function stopProceduralSceneMusic() {
    if (activeProceduralMusicInterval) {
      clearInterval(activeProceduralMusicInterval);
      activeProceduralMusicInterval = null;
    }
    activeProceduralScene = null;
    activeProceduralStep = 0;
  }
  window.stopProceduralSceneMusic = stopProceduralSceneMusic;

  // 1. MENÚ PRINCIPAL: Melodía suave, tranquila y ambiental (La Menor / Do Mayor)
  const MAIN_MENU_STEPS = [
    { notes: [220.0, 329.6], bass: 110.0 },
    { notes: [261.6, 392.0], bass: 130.8 },
    { notes: [246.9, 369.9], bass: 123.5 },
    { notes: [220.0, 349.2], bass: 110.0 },
    { notes: [261.6, 440.0], bass: 130.8 },
    { notes: [293.7, 392.0], bass: 146.8 },
    { notes: [329.6, 493.9], bass: 164.8 },
    { notes: [220.0, 329.6], bass: 110.0 }
  ];

  function startProceduralMainMenuMusic() {
    if (!gameState.audioEnabled || !audioCtx) return;
    if (activeProceduralScene === "main_menu" && activeProceduralMusicInterval) return;
    stopProceduralSceneMusic();
    activeProceduralScene = "main_menu";
    activeProceduralStep = 0;
    const stepDuration = 520;

    activeProceduralMusicInterval = setInterval(() => {
      if (!gameState.audioEnabled || !audioCtx || activeProceduralScene !== "main_menu") return;
      const step = MAIN_MENU_STEPS[activeProceduralStep % MAIN_MENU_STEPS.length];
      const t = audioCtx.currentTime;

      if (step.bass) {
        try {
          const osc = audioCtx.createOscillator();
          const filter = audioCtx.createBiquadFilter();
          const g = musicGain(0.08);
          if (g) {
            osc.type = "sine";
            osc.frequency.setValueAtTime(step.bass, t);
            filter.type = "lowpass";
            filter.frequency.setValueAtTime(260, t);
            g.gain.setValueAtTime(0.001, t);
            g.gain.linearRampToValueAtTime(0.08, t + 0.04);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.48);
            osc.connect(filter);
            filter.connect(g);
            osc.start(t);
            osc.stop(t + 0.50);
          }
        } catch (_) {}
      }

      if (step.notes && Array.isArray(step.notes)) {
        step.notes.forEach((freq, i) => {
          try {
            const osc = audioCtx.createOscillator();
            const filter = audioCtx.createBiquadFilter();
            const g = musicGain(0.06);
            if (g) {
              osc.type = "triangle";
              osc.frequency.setValueAtTime(freq, t + i * 0.05);
              filter.type = "lowpass";
              filter.frequency.setValueAtTime(540, t);
              g.gain.setValueAtTime(0.001, t + i * 0.05);
              g.gain.linearRampToValueAtTime(0.06, t + i * 0.05 + 0.03);
              g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
              osc.connect(filter);
              filter.connect(g);
              osc.start(t + i * 0.05);
              osc.stop(t + 0.48);
            }
          } catch (_) {}
        });
      }

      activeProceduralStep = (activeProceduralStep + 1) % MAIN_MENU_STEPS.length;
    }, stepDuration);
  }

  // 2. HOGUERA ANCESTRAL: Acordes cálidos y acústicos de reposo
  const CAMPFIRE_STEPS = [
    { triad: [146.8, 185.0, 220.0, 293.7] },
    { triad: [164.8, 196.0, 246.9, 329.6] },
    { triad: [196.0, 246.9, 293.7, 392.0] },
    { triad: [146.8, 220.0, 293.7, 370.0] }
  ];

  function startProceduralCampfireMusic() {
    if (!gameState.audioEnabled || !audioCtx) return;
    if (activeProceduralScene === "campfire" && activeProceduralMusicInterval) return;
    stopProceduralSceneMusic();
    activeProceduralScene = "campfire";
    activeProceduralStep = 0;
    const stepDuration = 650;

    activeProceduralMusicInterval = setInterval(() => {
      if (!gameState.audioEnabled || !audioCtx || activeProceduralScene !== "campfire") return;
      const step = CAMPFIRE_STEPS[activeProceduralStep % CAMPFIRE_STEPS.length];
      const t = audioCtx.currentTime;

      if (step.triad) {
        step.triad.forEach((freq, idx) => {
          try {
            const osc = audioCtx.createOscillator();
            const g = musicGain(0.07);
            if (g) {
              osc.type = "sine";
              osc.frequency.setValueAtTime(freq, t + idx * 0.03);
              g.gain.setValueAtTime(0.001, t + idx * 0.03);
              g.gain.linearRampToValueAtTime(0.07, t + idx * 0.03 + 0.06);
              g.gain.exponentialRampToValueAtTime(0.0001, t + 0.60);
              osc.connect(g);
              osc.start(t + idx * 0.03);
              osc.stop(t + 0.63);
            }
          } catch (_) {}
        });
      }

      activeProceduralStep = (activeProceduralStep + 1) % CAMPFIRE_STEPS.length;
    }, stepDuration);
  }

  // 3. RECOMPENSA / BOTÍN DE VICTORIA: Arpegio triunfante y festivo
  const REWARD_STEPS = [
    { root: 261.6, arps: [329.6, 392.0, 523.3] },
    { root: 329.6, arps: [392.0, 523.3, 659.3] },
    { root: 349.2, arps: [440.0, 523.3, 698.5] },
    { root: 392.0, arps: [493.9, 587.3, 784.0] }
  ];

  function startProceduralRewardMusic() {
    if (!gameState.audioEnabled || !audioCtx) return;
    if (activeProceduralScene === "reward" && activeProceduralMusicInterval) return;
    stopProceduralSceneMusic();
    activeProceduralScene = "reward";
    activeProceduralStep = 0;
    const stepDuration = 360;

    activeProceduralMusicInterval = setInterval(() => {
      if (!gameState.audioEnabled || !audioCtx || activeProceduralScene !== "reward") return;
      const step = REWARD_STEPS[activeProceduralStep % REWARD_STEPS.length];
      const t = audioCtx.currentTime;

      if (step.arps) {
        step.arps.forEach((freq, idx) => {
          try {
            const osc = audioCtx.createOscillator();
            const g = musicGain(0.09);
            if (g) {
              osc.type = "triangle";
              osc.frequency.setValueAtTime(freq, t + idx * 0.08);
              g.gain.setValueAtTime(0.001, t + idx * 0.08);
              g.gain.linearRampToValueAtTime(0.09, t + idx * 0.08 + 0.02);
              g.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);
              osc.connect(g);
              osc.start(t + idx * 0.08);
              osc.stop(t + 0.35);
            }
          } catch (_) {}
        });
      }

      activeProceduralStep = (activeProceduralStep + 1) % REWARD_STEPS.length;
    }, stepDuration);
  }

  // 4. DERROTA / PANTALLA DE MUERTE: Réquiem sombrío fúnebre
  const DEATH_STEPS = [
    { bass: 73.4, bell: 293.7 },
    { bass: 65.4, bell: 261.6 },
    { bass: 58.3, bell: 233.1 },
    { bass: 55.0, bell: 220.0 }
  ];

  function startProceduralDeathMusic() {
    if (!gameState.audioEnabled || !audioCtx) return;
    if (activeProceduralScene === "death" && activeProceduralMusicInterval) return;
    stopProceduralSceneMusic();
    activeProceduralScene = "death";
    activeProceduralStep = 0;
    const stepDuration = 700;

    activeProceduralMusicInterval = setInterval(() => {
      if (!gameState.audioEnabled || !audioCtx || activeProceduralScene !== "death") return;
      const step = DEATH_STEPS[activeProceduralStep % DEATH_STEPS.length];
      const t = audioCtx.currentTime;

      if (step.bass) {
        try {
          const osc = audioCtx.createOscillator();
          const filter = audioCtx.createBiquadFilter();
          const g = musicGain(0.12);
          if (g) {
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(step.bass, t);
            filter.type = "lowpass";
            filter.frequency.setValueAtTime(180, t);
            g.gain.setValueAtTime(0.001, t);
            g.gain.linearRampToValueAtTime(0.12, t + 0.08);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.65);
            osc.connect(filter);
            filter.connect(g);
            osc.start(t);
            osc.stop(t + 0.68);
          }
        } catch (_) {}
      }

      if (step.bell) {
        try {
          const bellOsc = audioCtx.createOscillator();
          const g = musicGain(0.06);
          if (g) {
            bellOsc.type = "sine";
            bellOsc.frequency.setValueAtTime(step.bell, t + 0.1);
            g.gain.setValueAtTime(0.06, t + 0.1);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.65);
            bellOsc.connect(g);
            bellOsc.start(t + 0.1);
            bellOsc.stop(t + 0.68);
          }
        } catch (_) {}
      }

      activeProceduralStep = (activeProceduralStep + 1) % DEATH_STEPS.length;
    }, stepDuration);
  }

  // 5. RULETA DEL DESTINO: Melodía misteriosa de carnaval arcano
  const FATE_WHEEL_STEPS = [
    329.6, 392.0, 493.9, 587.3, 493.9, 392.0, 440.0, 523.3
  ];

  function startProceduralFateWheelMusic() {
    if (!gameState.audioEnabled || !audioCtx) return;
    if (activeProceduralScene === "fate_wheel" && activeProceduralMusicInterval) return;
    stopProceduralSceneMusic();
    activeProceduralScene = "fate_wheel";
    activeProceduralStep = 0;
    const stepDuration = 200;

    activeProceduralMusicInterval = setInterval(() => {
      if (!gameState.audioEnabled || !audioCtx || activeProceduralScene !== "fate_wheel") return;
      const freq = FATE_WHEEL_STEPS[activeProceduralStep % FATE_WHEEL_STEPS.length];
      const t = audioCtx.currentTime;

      try {
        const osc = audioCtx.createOscillator();
        const g = musicGain(0.08);
        if (g) {
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, t);
          g.gain.setValueAtTime(0.08, t);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
          osc.connect(g);
          osc.start(t);
          osc.stop(t + 0.19);
        }
      } catch (_) {}

      activeProceduralStep = (activeProceduralStep + 1) % FATE_WHEEL_STEPS.length;
    }, stepDuration);
  }

  // 6. PACTO DEL ABISMO: Disonancia siniestra y atmósfera abisal
  const ABYSS_STEPS = [
    { sub: 73.4, tritono: 103.8 },
    { sub: 65.4, tritono: 92.5 },
    { sub: 58.3, tritono: 82.4 },
    { sub: 55.0, tritono: 77.8 }
  ];

  function startProceduralAbyssMusic() {
    if (!gameState.audioEnabled || !audioCtx) return;
    if (activeProceduralScene === "abyss" && activeProceduralMusicInterval) return;
    stopProceduralSceneMusic();
    activeProceduralScene = "abyss";
    activeProceduralStep = 0;
    const stepDuration = 600;

    activeProceduralMusicInterval = setInterval(() => {
      if (!gameState.audioEnabled || !audioCtx || activeProceduralScene !== "abyss") return;
      const step = ABYSS_STEPS[activeProceduralStep % ABYSS_STEPS.length];
      const t = audioCtx.currentTime;

      try {
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const g = musicGain(0.10);
        if (g) {
          osc1.type = "sawtooth";
          osc1.frequency.setValueAtTime(step.sub, t);
          osc2.type = "sine";
          osc2.frequency.setValueAtTime(step.tritono, t);
          g.gain.setValueAtTime(0.001, t);
          g.gain.linearRampToValueAtTime(0.10, t + 0.08);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.56);
          osc1.connect(g);
          osc2.connect(g);
          osc1.start(t);
          osc2.start(t);
          osc1.stop(t + 0.58);
          osc2.stop(t + 0.58);
        }
      } catch (_) {}

      activeProceduralStep = (activeProceduralStep + 1) % ABYSS_STEPS.length;
    }, stepDuration);
  }

  // Controladores de escena universales
  function startMainMenuMusic() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    stopIntroMusic();
    stopCombatMusic();
    if (startTrackedSceneMusic("main_menu", startProceduralMainMenuMusic)) return;
    startProceduralMainMenuMusic();
  }
  window.startMainMenuMusic = startMainMenuMusic;

  function stopMainMenuMusic() {
    stopSceneMusicIfScene("main_menu");
    if (activeProceduralScene === "main_menu") stopProceduralSceneMusic();
  }
  window.stopMainMenuMusic = stopMainMenuMusic;

  function startCampfireMusic() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    stopCombatMusic();
    if (startTrackedSceneMusic("campfire", startProceduralCampfireMusic)) return;
    startProceduralCampfireMusic();
  }
  window.startCampfireMusic = startCampfireMusic;

  function stopCampfireMusic() {
    stopSceneMusicIfScene("campfire");
    if (activeProceduralScene === "campfire") stopProceduralSceneMusic();
  }
  window.stopCampfireMusic = stopCampfireMusic;

  function startRewardMusic() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    stopCombatMusic();
    if (startTrackedSceneMusic("reward", startProceduralRewardMusic)) return;
    startProceduralRewardMusic();
  }
  window.startRewardMusic = startRewardMusic;

  function stopRewardMusic() {
    stopSceneMusicIfScene("reward");
    if (activeProceduralScene === "reward") stopProceduralSceneMusic();
  }
  window.stopRewardMusic = stopRewardMusic;

  function startDeathMusic() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    stopCombatMusic();
    if (startTrackedSceneMusic("death", startProceduralDeathMusic)) return;
    startProceduralDeathMusic();
  }
  window.startDeathMusic = startDeathMusic;

  function stopDeathMusic() {
    stopSceneMusicIfScene("death");
    if (activeProceduralScene === "death") stopProceduralSceneMusic();
  }
  window.stopDeathMusic = stopDeathMusic;

  function startFateWheelMusic() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    stopCombatMusic();
    if (startTrackedSceneMusic("fate_wheel", startProceduralFateWheelMusic)) return;
    startProceduralFateWheelMusic();
  }
  window.startFateWheelMusic = startFateWheelMusic;

  function stopFateWheelMusic() {
    stopSceneMusicIfScene("fate_wheel");
    if (activeProceduralScene === "fate_wheel") stopProceduralSceneMusic();
  }
  window.stopFateWheelMusic = stopFateWheelMusic;

  function startAbyssMusic() {
    if (!gameState.audioEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    stopCombatMusic();
    if (startTrackedSceneMusic("abyss", startProceduralAbyssMusic)) return;
    startProceduralAbyssMusic();
  }
  window.startAbyssMusic = startAbyssMusic;

  function stopAbyssMusic() {
    stopSceneMusicIfScene("abyss");
    if (activeProceduralScene === "abyss") stopProceduralSceneMusic();
  }
  window.stopAbyssMusic = stopAbyssMusic;

  function toggleSound() {
    gameState.audioEnabled = !gameState.audioEnabled;
    ensureAudio();
    updateMasterGain();
    saveAudioSettings();
    if (!gameState.audioEnabled) {
      stopIntroMusic();
      stopCombatMusic();
      stopSuddenDeathTension();
      stopProceduralSceneMusic();
      addLog("🔇 Sonido desactivado.", "info");
    } else {
      playButtonClickSound();
      addLog("🔊 Sonido activado.", "info");
      const titleEl = document.getElementById("screen-title");
      const introEl = document.getElementById("screen-intro");
      const isAtIntro = (introEl && !introEl.classList.contains("hidden"));
      const isAtTitle = (titleEl && !titleEl.classList.contains("hidden"));
      if (isAtIntro) startIntroMusic();
      else if (isAtTitle) startMainMenuMusic();
    }
    const headerBtn = document.getElementById("btn-header-sound");
    if (headerBtn) {
      headerBtn.innerText = gameState.audioEnabled ? "🔊" : "🔇";
      headerBtn.title = gameState.audioEnabled ? "Sonido Activado" : "Sonido Silenciado";
    }
    const configBody = document.getElementById("config-body");
    if (configBody && !document.getElementById("screen-config")?.classList.contains("hidden")) {
      showConfig();
    }
  }
  window.toggleSound = toggleSound;

  // Escuchador global para retroalimentación sutil al hacer clic en menús y pestañas
  if (typeof document !== "undefined") {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("button, .tut-tab, .codex-tab-btn, .shop-tab-btn, .hero-dot, .hero-book-nav");
      if (btn && !btn.disabled) {
        const isSpecialAction = btn.matches("#btn-hit, #btn-stand, #btn-reroll, #btn-potion, #btn-spin-wheel");
        if (!isSpecialAction) {
          try { playMenuClickSound(); } catch (_) {}
        }
      }
    }, { passive: true });
  }

  /* ============================================================
     SISTEMA DE MAZO ESTÁNDAR (52 CARTAS)
     ============================================================ */
  const SUITS = ["♠", "♥", "♦", "♣"];
  const CARD_RANKS = [
    { rank: "2", value: 2 },
    { rank: "3", value: 3 },
    { rank: "4", value: 4 },
    { rank: "5", value: 5 },
    { rank: "6", value: 6 },
    { rank: "7", value: 7 },
    { rank: "8", value: 8 },
    { rank: "9", value: 9 },
    { rank: "10", value: 10 },
    { rank: "J", value: 10 },
    { rank: "Q", value: 10 },
    { rank: "K", value: 10 },
    { rank: "A", value: 11, isAce: true }
  ];

  let drawPile = [];

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function buildStandardDeck() {
    const extraCards = (typeof getPersistentExtraCards === "function") ? getPersistentExtraCards() : [];
    const extraCardsMap = {};
    if (Array.isArray(extraCards)) {
      extraCards.forEach(c => {
        if (!c) return;
        const enriched = Object.assign({ isWonCard: true }, c);
        if (c.slot) {
          extraCardsMap[c.slot] = enriched;
        } else if (c.suit && c.rank) {
          extraCardsMap[`${c.suit}_${c.rank}`] = enriched;
        }
      });
    }

    const deck = [];
    for (const suit of SUITS) {
      for (const r of CARD_RANKS) {
        const key = `${suit}_${r.rank}`;
        if (extraCardsMap[key]) {
          deck.push(extraCardsMap[key]);
        } else {
          deck.push({ rank: r.rank, suit, value: r.value, isAce: !!r.isAce });
        }
      }
    }
    // Mantener siempre exactamente 52 cartas sin cartas extra excedentes
    if (deck.length > 52) {
      deck.length = 52;
    }
    return deck;
  }

  function rebuildDrawPile() {
    drawPile = buildStandardDeck();
    shuffleArray(drawPile);
    return drawPile;
  }

  function drawCard(biasTarget = null) {
    if (drawPile.length === 0) {
      rebuildDrawPile();
      addLog(`Se ha barajado un nuevo mazo de ${drawPile.length} cartas.`, "info");
    }

    // Sesgo de robo cuando se solicita un valor objetivo (clutch / fortuna)
    if (biasTarget !== null && drawPile.length > 0) {
      const idx = drawPile.findIndex(c => {
        if (biasTarget === 1 || biasTarget === 11) return c.isAce;
        return c.value === biasTarget;
      });
      if (idx !== -1) {
        const [clutchCard] = drawPile.splice(idx, 1);
        if (clutchCard && gameState.player && gameState.player.cardEnchantments) {
          const cid = `${clutchCard.suit}_${clutchCard.rank}`;
          if (gameState.player.cardEnchantments[cid]) {
            clutchCard.enchantment = Object.assign({}, gameState.player.cardEnchantments[cid]);
          }
        }
        return clutchCard;
      }
    }

    const card = drawPile.pop();
    if (card && gameState.player && gameState.player.cardEnchantments) {
      const cid = `${card.suit}_${card.rank}`;
      if (gameState.player.cardEnchantments[cid]) {
        card.enchantment = Object.assign({}, gameState.player.cardEnchantments[cid]);
      }
    }
    return card;
  }
  window.drawCard = drawCard;

  function isEven(n) { return n % 2 === 0; }

  /* ============================================================
     SISTEMA HÁPTICO MÓVIL Y SCREEN SHAKE (JUICINESS)
     ============================================================ */
  function triggerHaptic(type = "button_click") {
    if (gameState.hapticsEnabled === false) return;
    try {
      // 1. Integración Nativa Directa con Capacitor Android (Hardware Real)
      const capHaptics = window.Capacitor?.Plugins?.Haptics;
      if (capHaptics) {
        switch (type) {
          case "card_draw":
          case "coin":
          case "button_click":
            capHaptics.impact({ style: "LIGHT" }).catch(() => {});
            return;
          case "stand":
          case "potion":
          case "hit_enemy":
            capHaptics.impact({ style: "MEDIUM" }).catch(() => {});
            return;
          case "hit_player":
          case "bust":
            capHaptics.notification({ type: "ERROR" }).catch(() => {});
            return;
          case "blackjack":
            capHaptics.notification({ type: "SUCCESS" }).catch(() => {});
            return;
        }
      }

      // 2. Fallback Web Estándar (navigator.vibrate para navegadores móviles)
      if (!navigator || typeof navigator.vibrate !== "function") return;
      switch (type) {
        case "card_draw":
          navigator.vibrate(14);
          break;
        case "stand":
          navigator.vibrate([16, 25, 20]);
          break;
        case "potion":
          navigator.vibrate([20, 35, 25]);
          break;
        case "hit_enemy":
          navigator.vibrate(28);
          break;
        case "hit_player":
          navigator.vibrate([45, 30, 85]);
          break;
        case "blackjack":
          navigator.vibrate([35, 45, 55, 45, 120]);
          break;
        case "bust":
          navigator.vibrate([60, 40, 80]);
          break;
        case "coin":
          navigator.vibrate(12);
          break;
        case "button_click":
        default:
          navigator.vibrate(8);
          break;
      }
    } catch (e) {
      // Ignorar excepciones de permisos
    }
  }

  let screenShakeTimer = null;
  function triggerScreenShake(type = "light") {
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const container = document.getElementById("game-container");
    if (!container) return;
    if (screenShakeTimer) {
      clearTimeout(screenShakeTimer);
      screenShakeTimer = null;
    }
    const cls = (type === "heavy") ? "screen-shake-heavy" : "screen-shake-light";
    container.classList.remove("screen-shake-light", "screen-shake-heavy");
    void container.offsetWidth; // Forzar reflow limpio
    container.classList.add(cls);
    screenShakeTimer = setTimeout(() => {
      container.classList.remove(cls);
      screenShakeTimer = null;
    }, (type === "heavy") ? 360 : 230);
  }

  async function applyHitStop(ms = 90) {
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const stage = document.getElementById("stage");
    if (stage) stage.classList.add("hit-stop-frozen");
    await sleep(ms);
    if (stage) stage.classList.remove("hit-stop-frozen");
  }

  /* ============================================================
     EFECTOS VISUALES Y FLOATING COMBAT TEXT
     ============================================================ */
  function spawnFloatingText(targetId, text, type = "damage") {
    const target = document.getElementById(targetId);
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const stage = document.getElementById("stage");
    if (!stage) return;
    const stageRect = stage.getBoundingClientRect();

    const el = document.createElement("div");
    el.className = `floating-text ${type}`;
    el.innerText = text;
    el.style.left = `${Math.max(10, rect.left - stageRect.left + (rect.width / 2) - 30)}px`;
    el.style.top = `${Math.max(10, rect.top - stageRect.top)}px`;
    stage.appendChild(el);
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 1750);
  }

  function explainCombatStatus(type, isEnemy = false) {
    try { playButtonClickSound(); } catch (_) {}
    const target = isEnemy ? "Rival" : "Héroe";
    const st = gameState.status || {};
    switch (type) {
      case "shield": {
        const val = isEnemy ? (st.enemyShield || 0) : (st.playerShield || 0);
        showGameAlert(`🛡️ Escudo protector (${val} pts).\nAbsorbe el daño de los ataques antes de que afecte a los puntos de vida directos.`, `ESCUDO (${target.toUpperCase()})`);
        break;
      }
      case "poison": {
        const val = isEnemy ? (st.enemyPoison || 0) : (st.playerPoison || 0);
        showGameAlert(`☠️ Veneno residual (${val} acumulado).\nInflige daño directo al inicio de cada mano y se reduce gradualmente.`, `VENENO (${target.toUpperCase()})`);
        break;
      }
      case "burn": {
        const val = isEnemy ? (st.enemyBurn || 0) : (st.playerBurn || 0);
        showGameAlert(`🔥 Quemadura activa (${val} acumulada).\nConsume salud adicional en cada ronda de combate.`, `QUEMADURA (${target.toUpperCase()})`);
        break;
      }
      case "fury": {
        showGameAlert("⚡ Golpe Traicionero x2.\n¡El próximo impacto que asestes infligirá el doble de daño!", "FURIA / GOLPE CRÍTICO");
        break;
      }
      case "pact_thorn": {
        showGameAlert("🌵 Pacto de la Espina activo.\nCada vez que pulsas 'Pedir Carta' recibes 3 de daño directo por la maldición, pero tienes +1 PWR permanente de ataque.", "PACTO DEL ABISMO: ESPINA");
        break;
      }
      case "pact_no_potions": {
        showGameAlert("🚫 Pacto de las Tinieblas activo.\nNo puedes consumir pociones durante este piso a cambio de Oro y Salud.", "PACTO DEL ABISMO: TINIEBLAS");
        break;
      }
      case "pact_no_reroll": {
        showGameAlert("🎲 Pacto del Tiempo activo.\nNo puedes usar Reroll de dados durante este piso a cambio de pociones y Oro.", "PACTO DEL ABISMO: TIEMPO");
        break;
      }
      case "pact_gold_blood": {
        showGameAlert("🩸 Sangre por Oro activo.\nPierdes 3 HP al comenzar cada mano, pero ganar la mano te recompensa con +2 de Oro adicional.", "PACTO DEL ABISMO: SANGRE POR ORO");
        break;
      }
      case "pact_seer": {
        showGameAlert("👁️ Ojo del Vidente activo.\nLa carta oculta del rival se mantiene siempre revelada durante toda tu ascensión.", "PACTO DEL ABISMO: OJO VIDENTE");
        break;
      }
    }
  }
  window.explainCombatStatus = explainCombatStatus;

  function explainEnemyTrait() {
    try { playButtonClickSound(); } catch (_) {}
    const e = gameState.enemy;
    if (!e || !e.name) return;
    const tName = e.traitName || e.traitShort || "Sin rasgo especial";
    showGameAlert(`Rival: ${e.name.toUpperCase()}\n\n★ Rasgo: ${tName}\n\nAtaque base: ${e.pwr} | Defensa: ${e.def} | Salud máx: ${e.maxHp}`, "RASGO DEL ENEMIGO");
  }
  window.explainEnemyTrait = explainEnemyTrait;

  function updateStatusBadges() {
    const pBadges = document.getElementById("player-status-badges");
    const eBadges = document.getElementById("enemy-status-badges");
    const st = gameState.status || {};
    const p = gameState.player;
    const e = gameState.enemy;

    if (pBadges) {
      let html = "";
      if (st.playerShield > 0) html += `<div class="status-badge shield" onclick="explainCombatStatus('shield', false)" style="cursor:pointer;" title="Escudo que absorbe daño (Toca para ver)">🛡️ ${st.playerShield}</div>`;
      if (st.playerPoison > 0) html += `<div class="status-badge poison" onclick="explainCombatStatus('poison', false)" style="cursor:pointer;" title="Veneno residual (Toca para ver)">☠️ ${st.playerPoison}</div>`;
      if (st.playerBurn > 0) html += `<div class="status-badge burn" onclick="explainCombatStatus('burn', false)" style="cursor:pointer;" title="Quemadura activa (Toca para ver)">🔥 ${st.playerBurn}</div>`;
      if (p && p.turnDoubleDamage) html += `<div class="status-badge fury" onclick="explainCombatStatus('fury', false)" style="cursor:pointer;" title="Golpe Traicionero x2 (Toca para ver)">⚡ x2</div>`;

      // Insignias de Pactos del Abismo activos en el héroe
      if (p && p._pactThornPedir) {
        html += `<div class="status-badge thorn" onclick="explainCombatStatus('pact_thorn', false)" style="cursor:pointer;background:rgba(217,119,6,0.25);border:1px solid #f59e0b;color:#fde047;" title="Pacto de la Espina: -3 HP al pedir carta (Toca para ver)">🌵 ESPINA (-3)</div>`;
      }
      if (p && p._pactNoPotions) {
        html += `<div class="status-badge pact-curse" onclick="explainCombatStatus('pact_no_potions', false)" style="cursor:pointer;background:rgba(220,38,38,0.25);border:1px solid #ef4444;color:#fca5a5;" title="Sin pociones este piso">🚫 SIN POCIONES</div>`;
      }
      if (p && p._pactNoReroll) {
        html += `<div class="status-badge pact-curse" onclick="explainCombatStatus('pact_no_reroll', false)" style="cursor:pointer;background:rgba(220,38,38,0.25);border:1px solid #ef4444;color:#fca5a5;" title="Sin reroll este piso">🎲 SIN REROLL</div>`;
      }
      if (p && p._pactGoldBlood) {
        html += `<div class="status-badge pact-curse" onclick="explainCombatStatus('pact_gold_blood', false)" style="cursor:pointer;background:rgba(234,179,8,0.25);border:1px solid #eab308;color:#fef08a;" title="Sangre por Oro: -3 HP por mano">🩸 SANGRE/ORO</div>`;
      }
      if (p && p._pactAlwaysReveal) {
        html += `<div class="status-badge pact-buff" onclick="explainCombatStatus('pact_seer', false)" style="cursor:pointer;background:rgba(59,130,246,0.25);border:1px solid #3b82f6;color:#93c5fd;" title="Ojo Vidente: Carta rival revelada">👁️ VIDENTE</div>`;
      }

      pBadges.innerHTML = html;
    }

    if (eBadges) {
      let html = "";
      if (st.enemyShield > 0) html += `<div class="status-badge shield" onclick="explainCombatStatus('shield', true)" style="cursor:pointer;" title="Escudo rival (Toca para ver)">🛡️ ${st.enemyShield}</div>`;
      if (st.enemyPoison > 0) html += `<div class="status-badge poison" onclick="explainCombatStatus('poison', true)" style="cursor:pointer;" title="Veneno rival (Toca para ver)">☠️ ${st.enemyPoison}</div>`;
      if (st.enemyBurn > 0) html += `<div class="status-badge burn" onclick="explainCombatStatus('burn', true)" style="cursor:pointer;" title="Quemadura rival (Toca para ver)">🔥 ${st.enemyBurn}</div>`;
      eBadges.innerHTML = html;
    }

    const traitTag = document.getElementById("enemy-trait-tag");
    if (traitTag) {
      traitTag.innerText = e.traitShort || (e.traitName ? `★ ${e.traitName.split(' ')[0]}` : "");
      traitTag.title = e.traitName ? `Rasgo: ${e.traitName} (Toca para ver)` : "";
      traitTag.onclick = explainEnemyTrait;
      traitTag.style.cursor = "pointer";
    }
  }

  /* ============================================================
     CATÁLOGO DE CARTAS DINÁMICAS (FASE E)
     ============================================================ */
  const SPECIAL_DYNAMIC_CARDS = [
    { specialId: "double_jack", rank: "J", suit: "♦", value: 10, name: "Jota Doble", icon: "🃏", rarity: "rare", cost: 70, cardType: "ability", sealTheme: "gold", abilityAction: "adaptive_value", source: "pvp_market", desc: "Vale 10 u 11; si alcanzas 21 con ella, ganas +10 EXP permanente." },
    { specialId: "versatile_queen", rank: "Q", suit: "♥", value: 10, name: "Reina Versátil", icon: "👑", rarity: "epic", cost: 85, cardType: "ability", sealTheme: "arcane", abilityAction: "clone_neighbor", source: "pvp_market", desc: "Copia el valor de su carta vecina (o 10 si está sola)." },
    { specialId: "shifting_king", rank: "K", suit: "♠", value: 10, name: "Rey Cambiante", icon: "🎭", rarity: "legendary", cost: 110, cardType: "ability", sealTheme: "arcane", abilityAction: "adaptive_trio", source: "pvp_market", desc: "Se adapta como 10, 7 o 2 para optimizar tu mano y evitar BUST." },
    { specialId: "dark_ten", rank: "10", suit: "♣", value: 10, name: "Diez Umbrío", icon: "🌑", rarity: "common", cost: 45, cardType: "seal", sealTheme: "crimson", sealEffect: "weaken_enemy", source: "pvp_market", desc: "Vale 10 para ti. Si el rival la roba, resta -3 a su puntuación." },
    { specialId: "twin_ace", rank: "A", suit: "♠", value: 11, isAce: true, name: "As Gemelo", icon: "✨", rarity: "rare", cost: 65, cardType: "seal", sealTheme: "gold", sealEffect: "synergy_aces", source: "pvp_market", desc: "Si tienes 2 o más Ases en mano: suma +1 a la puntuación total." },
    { specialId: "cursed_seven", rank: "7", suit: "♦", value: 7, name: "7 Maldito", icon: "🩸", rarity: "rare", cost: 60, cardType: "seal", sealTheme: "crimson", sealEffect: "bonus_damage", source: "pvp_market", desc: "Vale -2 si te pasarías de 21; otorga +8 de daño extra al ganar la mano." },
    { specialId: "joker_party", rank: "★", suit: "★", slot: "♣_K", value: 0, name: "Comodín Festivo", icon: "🎉", rarity: "epic", cost: 90, cardType: "ability", sealTheme: "arcane", abilityAction: "mutate", source: "pvp_market", desc: "Ajuste dinámico: suma +3 o resta -3 según tu conveniencia. Ocupa el lugar del K♣." },
    { specialId: "wild_eight_mirror", rank: "8", suit: "♠", value: 8, name: "8 Espejo Arcano", icon: "🪞", rarity: "rare", cost: 65, cardType: "ability", sealTheme: "arcane", abilityAction: "mirror_highest", source: "pvp_market", desc: "Clona el valor del naipe más alto que tengas en mano para potenciar la suma." },
    { specialId: "golden_ace_vault", rank: "A", suit: "♦", value: 11, isAce: true, name: "As Áureo del Tesoro", icon: "🪙", rarity: "legendary", cost: 120, cardType: "seal", sealTheme: "gold", sealEffect: "bonus_gold", source: "pvp_market", desc: "Cuenta como As (1/11) y otorga +15 de Oro al plantarte sin pasarte de 21." },
    { specialId: "crimson_nine_bleed", rank: "9", suit: "♥", value: 9, name: "9 Carmesí Voraz", icon: "🩸", rarity: "rare", cost: 70, cardType: "seal", sealTheme: "crimson", sealEffect: "poison_bleed", source: "pvp_market", desc: "Al jugarla, infunde filo sangriento aplicando +2 de Veneno al contrincante." },
    { specialId: "frozen_six_barrier", rank: "6", suit: "♣", value: 6, name: "6 Glacial Protector", icon: "❄️", rarity: "common", cost: 40, cardType: "seal", sealTheme: "emerald", sealEffect: "auto_shield", source: "pvp_market", desc: "Otorga +6 de Escudo automático si te plantas con 18 o menos." },
    { specialId: "arcane_five_surge", rank: "5", suit: "♦", value: 5, name: "5 Impulso Arcano", icon: "⚡", rarity: "common", cost: 45, cardType: "seal", sealTheme: "arcane", sealEffect: "odd_bonus", source: "pvp_market", desc: "Si la suma de tu mano es impar, canaliza energía sumando +2 puntos extra." },
    { specialId: "phantom_four_dodge", rank: "4", suit: "♠", value: 4, name: "4 Fantasmal Evasivo", icon: "👻", rarity: "common", cost: 50, cardType: "seal", sealTheme: "emerald", sealEffect: "damage_cushion", source: "pvp_market", desc: "Al plantarte con él, amortigua 5 puntos del próximo ataque recibido." },
    { specialId: "overload_three_spark", rank: "3", suit: "♥", value: 3, name: "3 Sobrecarga de Chispas", icon: "💥", rarity: "rare", cost: 65, cardType: "seal", sealTheme: "crimson", sealEffect: "critical_overload", source: "pvp_market", desc: "Desata +12 de daño crítico adicional si logras Blackjack o 21 exacto." },
    { specialId: "balance_two_anchor", rank: "2", suit: "♣", value: 2, name: "2 Ancla de Equilibrio", icon: "⚓", rarity: "common", cost: 40, cardType: "ability", sealTheme: "emerald", abilityAction: "anti_bust", source: "pvp_market", desc: "Si tu mano va a superar 21, muta su valor a 0 anulando el exceso." },
    { specialId: "trinity_hologram", rank: "★", suit: "♦", value: 3, dynamicValues: [3, 6, 9], name: "Trinidad Holográfica", icon: "✨", rarity: "legendary", cost: 110, cardType: "ability", sealTheme: "arcane", abilityAction: "adaptive_trio", source: "pvp_market", desc: "Se ajusta automáticamente a 3, 6 o 9 para optimizar tu puntuación." },
    { specialId: "diamond_ace_guard", rank: "A", suit: "♦", value: 11, isAce: true, name: "As de Diamantes Baluarte", icon: "🛡️", rarity: "epic", cost: 60, cardType: "seal", sealTheme: "emerald", sealEffect: "start_shield", source: "pvp_market", desc: "Inicia cualquier mano con +4 de Escudo protector." },
    { specialId: "spade_king_execute", rank: "K", suit: "♠", value: 10, name: "Rey de Picas Verdugo", icon: "⚔️", rarity: "legendary", cost: 90, cardType: "seal", sealTheme: "crimson", sealEffect: "crit_execute", source: "pvp_market", desc: "Tus Blackjacks asestan daño crítico devastador (x3)." },
    { specialId: "heart_queen_vampire", rank: "Q", suit: "♥", value: 10, name: "Reina de Corazones Sangrienta", icon: "🩸", rarity: "epic", cost: 80, cardType: "seal", sealTheme: "crimson", sealEffect: "vampiric_heal", source: "pvp_market", desc: "Al jugarse en una mano ganadora, restaura +8 HP a tu duelista." },
    { specialId: "club_jack_thief", rank: "J", suit: "♣", value: 10, name: "Jota de Tréboles de Fortuna", icon: "🪙", rarity: "rare", cost: 50, cardType: "seal", sealTheme: "gold", sealEffect: "extra_crypt_coins", source: "pvp_market", desc: "Te recompensa con +15 Monedas de Cripta adicionales al vencer el duelo." },
    { specialId: "lucky_seven_astral", rank: "7", suit: "⭐", value: 7, name: "7 Astral del Tahúr", icon: "🔮", rarity: "legendary", cost: 120, cardType: "ability", sealTheme: "arcane", abilityAction: "astral_morph", source: "pvp_market", desc: "Permite mutar su valor a 11 si evita que hagas BUST al pedir carta." }
  ];
  window.SPECIAL_DYNAMIC_CARDS = SPECIAL_DYNAMIC_CARDS;

  /* ============================================================
     CÁLCULO EXACTO DE PUNTUACIÓN DE BLACKJACK (HOOK UNIFICADO)
     ============================================================ */
  function calculateHandScore(hand, isMonkStand = false, isEnemyHand = false) {
    if (!Array.isArray(hand) || hand.length === 0) return 0;
    const isEnemy = isEnemyHand || (typeof gameState !== "undefined" && gameState.enemy && hand === gameState.enemy.enemyHand);
    const gauntlet = (!isEnemy && typeof gameState !== "undefined" && gameState.player && gameState.player.accessory === "lead_gauntlet");
    let score = 0;
    let aces = 0;

    for (let i = 0; i < hand.length; i++) {
      const card = hand[i];
      if (!card) continue;
      const sId = card.specialId || card.id;

      if (card.isAce) {
        aces++;
        score += 11;
      } else if (sId === "dark_ten") {
        if (isEnemy) {
          score -= 3;
        } else {
          score += 10;
        }
      } else if (sId === "double_jack") {
        score += 10;
      } else if (sId === "versatile_queen") {
        let neighborVal = 10;
        if (i > 0 && hand[i - 1]) {
          neighborVal = hand[i - 1].value || 10;
        } else if (i < hand.length - 1 && hand[i + 1]) {
          neighborVal = hand[i + 1].value || 10;
        }
        score += neighborVal;
      } else if (sId === "shifting_king") {
        score += 10;
      } else if (sId === "cursed_seven") {
        score += 7;
      } else if (sId === "joker_party" || (card.dynamicValues && Array.isArray(card.dynamicValues))) {
        // Se calcula después del bucle principal
        score += 0;
      } else {
        score += (gauntlet && card.value < 3) ? 3 : (card.value || 0);
      }
    }

    while (score > BUST_LIMIT && aces > 0) {
      score -= 10;
      aces--;
    }

    // J Doble: si vale 10 pero valiendo 11 llega a 21 exacto
    const hasDoubleJack = hand.some(c => (c.specialId || c.id) === "double_jack");
    if (hasDoubleJack && score === 20) {
      score = 21;
    }

    // 7 Astral del Tahúr (Arena): muta a 11 si no causa bust (suma +4 a los 7 ya calculados)
    const hasLuckySeven = hand.some(c => (c.specialId || c.id) === "lucky_seven_astral");
    if (hasLuckySeven && score + 4 <= 21 && (score + 4 === 21 || score <= 17)) {
      score += 4;
    }

    // Calcular valores dinámicos
    const dynCards = hand.filter(c => (c.specialId || c.id) === "joker_party" || (c.dynamicValues && Array.isArray(c.dynamicValues)));
    dynCards.forEach(c => {
      if ((c.specialId || c.id) === "joker_party") {
        if (score + 3 <= BUST_LIMIT) score += 3;
        else if (score - 3 > 0) score -= 3;
      } else if (c.dynamicValues && Array.isArray(c.dynamicValues)) {
        let bestVal = c.dynamicValues[0];
        let bestScore = -1;
        for (const val of c.dynamicValues) {
          if (score + val <= BUST_LIMIT && score + val > bestScore) {
            bestScore = score + val;
            bestVal = val;
          }
        }
        if (bestScore === -1) {
          // Si todos causan BUST, usa el valor mínimo
          bestVal = Math.min(...c.dynamicValues);
        }
        score += bestVal;
      }
    });

    // K Cambiante: baja a 7 o 2 si evita BUST
    const hasShiftingKing = hand.some(c => (c.specialId || c.id) === "shifting_king");
    if (hasShiftingKing && score > BUST_LIMIT) {
      if (score - 3 <= BUST_LIMIT) {
        score -= 3;
      } else if (score - 8 <= BUST_LIMIT) {
        score -= 8;
      }
    }

    // 7 Maldito: si causa BUST, muta a -2
    const hasCursedSeven = hand.some(c => (c.specialId || c.id) === "cursed_seven");
    if (hasCursedSeven && score > BUST_LIMIT) {
      score -= 9;
    }

    // 8 Espejo: clona el valor del naipe más alto
    const hasMirrorEight = hand.some(c => (c.specialId || c.id) === "wild_eight_mirror");
    if (hasMirrorEight) {
      const otherValues = hand.filter(c => (c.specialId || c.id) !== "wild_eight_mirror").map(c => c.value || 0);
      if (otherValues.length > 0) {
        const maxOther = Math.max(...otherValues);
        if (maxOther > 8 && score - 8 + maxOther <= BUST_LIMIT) {
          score = score - 8 + maxOther;
        }
      }
    }

    // 5 Arcano: suma +2 si la puntuación es impar
    const hasArcaneFive = hand.some(c => (c.specialId || c.id) === "arcane_five_surge");
    if (hasArcaneFive && (score % 2 !== 0) && score + 2 <= BUST_LIMIT) {
      score += 2;
    }

    // 2 Ancla: si causa BUST, muta a 0 salvando la mano
    const hasAnchorTwo = hand.some(c => (c.specialId || c.id) === "balance_two_anchor");
    if (hasAnchorTwo && score > BUST_LIMIT) {
      score -= 2;
    }

    // As Par: con 2 o más Ases en mano otorga +1
    const totalAces = hand.filter(c => c && (c.isAce || c.rank === "A")).length;
    const hasTwinAce = hand.some(c => (c.specialId || c.id) === "twin_ace");
    if (hasTwinAce && totalAces >= 2 && score + 1 <= BUST_LIMIT) {
      score += 1;
    }

    // Autoajuste inteligente de Sello Maleable / Camaleónico (±1)
    const malleableCards = hand.filter(c => c && c.enchantment && (c.enchantment.id === "malleable" || c.enchantment.type === "malleable"));
    if (malleableCards.length > 0) {
      for (let i = 0; i < malleableCards.length; i++) {
        if (score > BUST_LIMIT && (score - 1) <= BUST_LIMIT) {
          score -= 1;
        }
      }
      if (score === 20) {
        score = 21;
      }
    }

    if (isMonkStand && (score === 18 || score === 19)) {
      score += 1;
    }

    return score;
  }

  /* ============================================================
     GESTIÓN DE ESTADOS DINÁMICOS DEL SPRITE DEL JUGADOR
     ============================================================ */
  let playerSpriteTimer = null;

  function showLockedHeroNotice(heroName) {
    addLog(`🔒 ${heroName} está bloqueado en esta prueba. Elige al Caballero.`, "warning");
    const container = document.getElementById("game-container");
    if (!container) return;
    let toast = document.getElementById("hero-lock-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "hero-lock-toast";
      toast.style.cssText = "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(11,12,16,0.95);border:2px solid #e63946;color:#ff758f;padding:10px 14px;border-radius:6px;font-size: 9px;z-index:999;text-align:center;box-shadow:0 0 16px rgba(230,57,70,0.6);pointer-events:none;animation:totalGlow 0.3s ease-out;";
      container.appendChild(toast);
    }
    toast.innerText = `🔒 ${heroName} bloqueado en esta prueba.\n¡Elige al Caballero!`;
    toast.style.display = "block";
    setTimeout(() => { if (toast) toast.style.display = "none"; }, 1600);
  }

  function setPlayerSpriteState(state, options = {}) {
    const p = gameState.player;
    if (!p) return;
    const hero = HERO_DATA[p.class] || HERO_DATA.knight;
    const sp = document.getElementById("player-sprite");
    const spIcon = document.getElementById("player-sprite-icon");
    if (!sp || !spIcon) return;

    if (playerSpriteTimer) {
      clearTimeout(playerSpriteTimer);
      playerSpriteTimer = null;
    }

    let imgSrc = hero.img;
    let animClass = "";

    switch (state) {
      case "windup":
        imgSrc = hero.imgAttack || hero.img;
        animClass = "sprite-windup-player";
        break;
      case "strike":
      case "attack":
        imgSrc = hero.imgAttack || hero.img;
        animClass = "sprite-strike-player";
        break;
      case "recover":
        imgSrc = hero.img;
        animClass = "sprite-recover-player";
        break;
      case "block":
      case "blocked":
        imgSrc = hero.img;
        animClass = "sprite-block-player";
        break;
      case "parry":
        imgSrc = hero.imgAttack || hero.img;
        animClass = "sprite-parry-player";
        break;
      case "dodge":
        imgSrc = hero.img;
        break;
      case "hit_weak":
        imgSrc = hero.img;
        animClass = "sprite-hit-weak-player";
        break;
      case "hit_normal":
      case "hurt":
        imgSrc = hero.imgHurt || hero.img;
        animClass = "sprite-hit-normal-player";
        break;
      case "hit_crit":
        imgSrc = hero.imgHurt || hero.img;
        animClass = "sprite-hit-crit-player";
        break;
      case "blackjack":
      case "victory_pose":
        imgSrc = hero.imgAttack || hero.img;
        animClass = "sprite-victory-player";
        break;
      case "bust":
        imgSrc = hero.imgHurt || hero.img;
        animClass = "sprite-bust-player";
        break;
      case "dead":
        imgSrc = hero.imgDead || hero.img;
        animClass = "sprite-dead-player";
        break;
      case "idle":
      default:
        imgSrc = hero.img;
        animClass = "sprite-idle-player";
        break;
    }

    if (imgSrc) {
      spIcon.innerHTML = `<img src="${imgSrc}" class="sprite-img" alt="${hero.name}" onerror="this.outerHTML='${hero.sprite}'">`;
    } else {
      spIcon.innerText = hero.sprite;
    }

    sp.className = `sprite ${hero.styleClass || ""}`;
    if (animClass) sp.classList.add(animClass);

    const tempStates = ["windup", "strike", "attack", "recover", "block", "blocked", "parry", "dodge", "hit_weak", "hit_normal", "hurt", "hit_crit", "blackjack", "victory_pose", "bust"];
    if (tempStates.includes(state) && p.hp > 0) {
      const duration = (options && options.duration) ? options.duration : (state === "hit_crit" ? 750 : state === "strike" || state === "attack" ? 600 : 500);
      playerSpriteTimer = setTimeout(() => {
        if (p.hp > 0) {
          setPlayerSpriteState("idle");
        }
      }, duration);
    }
  }

  let enemySpriteTimer = null;
  function setEnemySpriteState(state, options = {}) {
    const e = gameState.enemy;
    const sp = document.getElementById("enemy-sprite");
    if (!sp) return;

    if (enemySpriteTimer) {
      clearTimeout(enemySpriteTimer);
      enemySpriteTimer = null;
    }

    let animClass = "";
    switch (state) {
      case "windup":
        animClass = "sprite-windup-enemy";
        break;
      case "strike":
      case "attack":
        animClass = "sprite-strike-enemy";
        break;
      case "recover":
        animClass = "sprite-recover-enemy";
        break;
      case "block":
      case "blocked":
        animClass = "sprite-block-enemy";
        break;
      case "hit_weak":
        animClass = "sprite-hit-weak-enemy";
        break;
      case "hit_normal":
      case "hurt":
        animClass = "sprite-hit-normal-enemy";
        break;
      case "hit_crit":
        animClass = "sprite-hit-crit-enemy";
        break;
      case "dead":
        animClass = "sprite-dead-enemy";
        break;
      case "idle":
      default:
        animClass = "sprite-idle-enemy";
        break;
    }

    const allEnemyAnim = [
      "sprite-idle-enemy", "sprite-windup-enemy", "sprite-strike-enemy", "enemy-attack", "sprite-recover-enemy",
      "sprite-block-enemy", "sprite-hit-weak-enemy", "sprite-hit-normal-enemy",
      "sprite-hit-crit-enemy", "sprite-dead-enemy", "flash-damage"
    ];
    sp.classList.remove(...allEnemyAnim);
    if (animClass) sp.classList.add(animClass);

    const tempEnemyStates = ["windup", "strike", "attack", "recover", "block", "blocked", "hit_weak", "hit_normal", "hurt", "hit_crit"];
    if (tempEnemyStates.includes(state) && (!e || e.hp > 0)) {
      const duration = (options && options.duration) ? options.duration : (state === "hit_crit" ? 750 : state === "strike" || state === "attack" ? 600 : 500);
      enemySpriteTimer = setTimeout(() => {
        if (!e || e.hp > 0) {
          setEnemySpriteState("idle");
        }
      }, duration);
    }
  }

  /* ============================================================
     META-PROGRESIÓN: PERFIL PERMANENTE Y MAESTRÍA DE LOS JACKS
     ============================================================ */
  const HERO_META_KEY = "blackjack_tower_heroes_meta_v1";

  function getHeroMeta() {
    const makeDefaults = () => ({
      knight: { totalExp: 0, masteryLevel: 1, level: 1, exp: 0, baseMaxHp: null, basePwr: null, baseDef: null, runs: 0, wins: 0, legacyPoints: 0, legacyHp: 0, legacyPwr: 0, legacyDef: 0, prestigeTrophies: 0 },
      rogue: { totalExp: 0, masteryLevel: 1, level: 1, exp: 0, baseMaxHp: null, basePwr: null, baseDef: null, runs: 0, wins: 0, legacyPoints: 0, legacyHp: 0, legacyPwr: 0, legacyDef: 0, prestigeTrophies: 0 },
      monk: { totalExp: 0, masteryLevel: 1, level: 1, exp: 0, baseMaxHp: null, basePwr: null, baseDef: null, runs: 0, wins: 0, legacyPoints: 0, legacyHp: 0, legacyPwr: 0, legacyDef: 0, prestigeTrophies: 0 },
      necromancer: { totalExp: 0, masteryLevel: 1, level: 1, exp: 0, baseMaxHp: null, basePwr: null, baseDef: null, runs: 0, wins: 0, legacyPoints: 0, legacyHp: 0, legacyPwr: 0, legacyDef: 0, prestigeTrophies: 0 }
    });
    const defaultMeta = makeDefaults();
    let meta = defaultMeta;
    let fromStorage = false;
    try {
      const parsed = _loadSecure(HERO_META_KEY, null);
      if (parsed && typeof parsed === "object") {
        const base = makeDefaults();
        meta = {};
        ["knight", "rogue", "monk", "necromancer"].forEach(hk => {
          const stored = (parsed[hk] && typeof parsed[hk] === "object") ? parsed[hk] : null;
          meta[hk] = Object.assign({}, base[hk], stored || {});
          if (stored && typeof stored.level !== "number") {
            // Guardado anterior al Nivel Permanente Real: se deriva de masteryLevel/totalExp
            meta[hk].level = null;
            meta[hk].exp = null;
          }
        });
        fromStorage = true;
      }
    } catch (e) {
      console.warn("Error cargando meta-progresión:", e);
    }
    meta = _validateMetaRanges(meta);
    if (_migrateHeroMeta(meta) && fromStorage) {
      try { _saveSecure(HERO_META_KEY, meta); } catch (_) {}
    }
    return meta;
  }

  function saveHeroMeta(meta) {
    try {
      _saveSecure(HERO_META_KEY, meta);
    } catch (e) {
      console.warn("Error guardando meta-progresión:", e);
    }
  }

  /* Fase 3: Altar del Legado — Asignación y reembolso de estadísticas permanentes */
  function upgradeHeroLegacy(heroKey, stat) {
    if (!heroKey) return;
    const meta = getHeroMeta();
    if (!meta[heroKey]) return;
    const h = meta[heroKey];
    if ((h.legacyPoints || 0) <= 0) {
      if (typeof addLog === "function") addLog("Sin Puntos de Legado. Completa la Torre (derrota a BLACK en el Piso 13) para ganarlos.", "warning");
      return;
    }

    if (stat === "hp") {
      if ((h.legacyHp || 0) >= 10) return;
      h.legacyHp = (h.legacyHp || 0) + 1;
      h.legacyPoints--;
    } else if (stat === "pwr") {
      if ((h.legacyPwr || 0) >= 5) return;
      h.legacyPwr = (h.legacyPwr || 0) + 1;
      h.legacyPoints--;
    } else if (stat === "def") {
      if ((h.legacyDef || 0) >= 5) return;
      h.legacyDef = (h.legacyDef || 0) + 1;
      h.legacyPoints--;
    }

    saveHeroMeta(meta);
    try { playCoinSound(); } catch (_) {}
    if (typeof triggerHaptic === "function") triggerHaptic("selection");
    if (typeof renderHeroBook === "function") renderHeroBook();
  }
  window.upgradeHeroLegacy = upgradeHeroLegacy;

  function refundHeroLegacy(heroKey) {
    if (!heroKey) return;
    const meta = getHeroMeta();
    if (!meta[heroKey]) return;
    const h = meta[heroKey];
    const spent = (h.legacyHp || 0) + (h.legacyPwr || 0) + (h.legacyDef || 0);
    if (spent <= 0) return;

    h.legacyPoints = (h.legacyPoints || 0) + spent;
    h.legacyHp = 0;
    h.legacyPwr = 0;
    h.legacyDef = 0;

    saveHeroMeta(meta);
    try { playEnchantChimeSound(); } catch (_) {}
    if (typeof triggerHaptic === "function") triggerHaptic("impactLight");
    if (typeof renderHeroBook === "function") renderHeroBook();
  }
  window.refundHeroLegacy = refundHeroLegacy;

  function calculateMasteryLevel(exp) {
    if (exp < 80) return 1;
    if (exp < 200) return 2;
    if (exp < 400) return 3;
    if (exp < 700) return 4;
    if (exp < 1100) return 5;
    if (exp < 1600) return 6;
    if (exp < 2300) return 7;
    if (exp < 3200) return 8;
    if (exp < 4500) return 9;
    return Math.floor(10 + (exp - 4500) / 1500);
  }

  /* Curva de experiencia por nivel de combate: Entre más nivel, más experiencia se necesita */
  function getExpRequiredForLevel(level) {
    if (level <= 1) return 60;
    if (level === 2) return 140;
    if (level === 3) return 260;
    if (level === 4) return 440;
    if (level === 5) return 700;
    if (level === 6) return 1050;
    if (level === 7) return 1550;
    if (level === 8) return 2200;
    return Math.floor(60 * Math.pow(1.5, level - 1) + (level - 1) * 50);
  }

  function getMasteryBonuses(masteryLevel) {
    const bonusLvl = Math.max(0, (masteryLevel || 1) - 1);
    return {
      hp: bonusLvl * 6,
      pwr: Math.floor(bonusLvl / 2),
      def: Math.floor(bonusLvl / 3),
      gold: bonusLvl * 15,
      potions: bonusLvl >= 1 ? 1 : 0,
      rerolls: bonusLvl >= 2 ? 1 : 0,
      startingSeal: bonusLvl >= 3
    };
  }

  function addHeroPermanentExp(heroClass, amount) {
    if (!heroClass) return;
    const meta = getHeroMeta();
    if (!meta[heroClass]) {
      meta[heroClass] = { totalExp: 0, masteryLevel: 1, level: 1, exp: 0, runs: 0, wins: 0, prestigeTrophies: 0 };
    }
    if (amount > 0 && typeof isRoyalPerkOwned === "function" && isRoyalPerkOwned("exp_boost")) {
      amount = Math.round(amount * 1.5);
    }
    meta[heroClass].totalExp = (meta[heroClass].totalExp || 0) + amount;
    // SPRINT 1: el Nivel de Maestría y el Nivel de Run son el MISMO Nivel Permanente Real
    meta[heroClass].masteryLevel = meta[heroClass].level || meta[heroClass].masteryLevel || 1;
    saveHeroMeta(meta);
    updateHeroSelectUI();
  }

  /* ============================================================
     FASE 3: SISTEMA DE DESBLOQUEO Y MISIONES DE HÉROES
     ============================================================ */
  const HERO_UNLOCKS_KEY = "blackjack_hero_unlocks_v1";

  function getHeroUnlocks() {
    const defaults = {
      knight: { unlocked: true, progress: 0, target: 0, missionText: "Héroe inicial" },
      rogue: { unlocked: false, progress: 0, target: 30, missionText: "Gana 30 manos con número par" },
      monk: { unlocked: false, progress: 0, target: 7, missionText: "Alcanza el Piso 7 en la Torre" },
      necromancer: { unlocked: false, progress: 0, target: 30, missionText: "💀 Derrota 30 rivales en la Torre" }
    };
    try {
      const parsed = _loadSecure(HERO_UNLOCKS_KEY, null);
      if (parsed && typeof parsed === "object") {
        return {
          knight: { unlocked: true, progress: 0, target: 0, missionText: "Héroe inicial" },
          rogue: Object.assign({}, defaults.rogue, parsed.rogue),
          monk: Object.assign({}, defaults.monk, parsed.monk),
          necromancer: Object.assign({}, defaults.necromancer, parsed.necromancer)
        };
      }
    } catch (e) {
      console.warn("Error cargando desbloqueos:", e);
    }
    return defaults;
  }

  function saveHeroUnlocks(unlocks) {
    try {
      _saveSecure(HERO_UNLOCKS_KEY, unlocks);
    } catch (e) {
      console.warn("Error guardando desbloqueos:", e);
    }
  }
  window.getHeroUnlocks = getHeroUnlocks;
  window.saveHeroUnlocks = saveHeroUnlocks;

  function checkHeroUnlockCondition(heroKey, amount = 1, mode = "add") {
    const unlocks = getHeroUnlocks();
    const item = unlocks[heroKey];
    if (!item || item.unlocked) return;

    if (mode === "max") {
      item.progress = Math.max(item.progress, amount);
    } else {
      item.progress += amount;
    }

    if (item.progress >= item.target) {
      item.progress = item.target;
      item.unlocked = true;
      saveHeroUnlocks(unlocks);
      triggerHaptic("blackjack");
      const hero = HERO_DATA[heroKey];
      const heroName = hero ? hero.name : heroKey.toUpperCase();
      addLog(`🎉 ¡DESBLOQUEO LEGENDARIO! Has liberado a ${heroName}.`, "critical");
      spawnFloatingText("stage", `🎉 ¡${heroName} DESBLOQUEADO!`, "crit");
    } else {
      saveHeroUnlocks(unlocks);
    }
    updateHeroSelectUI();
  }

  function onHeroCardClick(heroKey) {
    const unlocks = getHeroUnlocks();
    if (unlocks[heroKey] && unlocks[heroKey].unlocked) {
      startGame(heroKey);
    } else {
      selectLockedHero(heroKey);
    }
  }
  window.onHeroCardClick = onHeroCardClick;

  let lockedToastTimeout = null;
  function selectLockedHero(heroKey) {
    const heroNames = {
      rogue: "JACK PÍCARO",
      monk: "JACK MONJE",
      necromancer: "JACK NIGROMANTE"
    };
    const name = heroNames[heroKey] || "Este campeón";
    const unlocks = getHeroUnlocks();
    const item = unlocks[heroKey] || { progress: 0, target: 10, missionText: "Misión" };

    playTone(150, 0.12, "sawtooth", 0.25);
    setTimeout(() => playTone(120, 0.18, "sawtooth", 0.25), 100);
    triggerHaptic("button_click");

    const toast = document.getElementById("hero-locked-toast");
    if (toast) {
      toast.innerHTML = `🔒 <b>${name}</b> está bloqueado.<br><b>Misión de Desbloqueo:</b> ${item.missionText} (${item.progress}/${item.target}).<br>¡Juega con Caballero para liberarlo!`;
      toast.classList.remove("hidden");
      if (lockedToastTimeout) clearTimeout(lockedToastTimeout);
      lockedToastTimeout = setTimeout(() => {
        toast.classList.add("hidden");
      }, 4500);
    }
  }
  window.selectLockedHero = selectLockedHero;

  let currentHeroBookIndex = 0;
  window.getCurrentHeroBookIndex = () => currentHeroBookIndex;
  const HERO_KEYS = ["knight", "rogue", "monk", "necromancer"];

  function prevHeroBook() {
    currentHeroBookIndex = (currentHeroBookIndex - 1 + HERO_KEYS.length) % HERO_KEYS.length;
    playTone(260, 0.08, "sine", 0.3);
    triggerHaptic("selection_change");
    renderHeroBook();
  }
  window.prevHeroBook = prevHeroBook;

  function nextHeroBook() {
    currentHeroBookIndex = (currentHeroBookIndex + 1) % HERO_KEYS.length;
    playTone(320, 0.08, "sine", 0.3);
    triggerHaptic("selection_change");
    renderHeroBook();
  }
  window.nextHeroBook = nextHeroBook;

  function setHeroBookIndex(idx) {
    if (idx >= 0 && idx < HERO_KEYS.length) {
      currentHeroBookIndex = idx;
      playTone(300, 0.08, "sine", 0.3);
      triggerHaptic("selection_change");
      renderHeroBook();
    }
  }
  window.setHeroBookIndex = setHeroBookIndex;

  /* ============================================================
     SISTEMA DE 4 DIFICULTADES ESCALONADAS (ESTILO MORTAL KOMBAT)
     - Normal (Torre del Novicio): 7 Pisos (BLACK en Piso 7)
     - Heroico (Torre Guerrera): 9 Pisos (BLACK en Piso 9, requiere 1 victoria)
     - Mítico (Torre Maestra): 11 Pisos (BLACK en Piso 11, requiere 2 victorias)
     - Pesadilla (Torre de la Perdición): 13 Pisos (BLACK en Piso 13, requiere 3 victorias)
     ============================================================ */
  const DIFFICULTY_CONFIGS = {
    normal: {
      id: "normal",
      label: "NORMAL",
      name: "Torre del Novicio",
      icon: "🟢",
      maxFloors: 7,
      reqWins: 0,
      desc: "🟢 <b>Torre del Novicio (7 Pisos):</b> Batallas rápidas y fluidas (~7 min). ¡Vence a BLACK en el Piso 7 y desbloquea Heroico! (🏆 +1 Trofeo)",
      loreTitle: "La Fosa de los Condenados",
      lore: "Erigida sobre las cloacas del reino, esta aguja menor sirve como foso donde los señores del 21 arrojan a los rebeldes. Solo quienes dominan la prudencia y el valor logran abrirse paso hasta el primer avatar de BLACK.",
      multHp: 1.0,
      bonusFloorHp: 4,
      levelHpMult: 0,
      pwrBonusFloorDiv: 4,
      levelPwrBonus: 0,
      legacyMult: 1.0,
      trophies: 1
    },
    hard: {
      id: "hard",
      label: "HEROICO",
      name: "Torre Guerrera",
      icon: "🟡",
      maxFloors: 9,
      reqWins: 1,
      desc: "🟡 <b>Torre Guerrera (9 Pisos):</b> Requiere ganar la Torre Normal. Rivales con +15% HP y escudos tempranos. (🏆 +2 Trofeos)",
      loreTitle: "El Bastión de Sangre y Acero",
      lore: "Custodiada por mercenarios veteranos y falanges blindadas. Aquí la suerte no basta: cada naipe es una estocada y cada error cuesta caro. Quien corone su cima demostrará la madera de un auténtico paladín.",
      multHp: 1.15,
      bonusFloorHp: 6,
      levelHpMult: 2,
      pwrBonusFloorDiv: 3,
      levelPwrBonus: 1,
      legacyMult: 1.0,
      trophies: 2
    },
    mythic: {
      id: "mythic",
      label: "MÍTICO",
      name: "Torre Maestra",
      icon: "🔴",
      maxFloors: 11,
      reqWins: 2,
      desc: "🔴 <b>Torre Maestra (11 Pisos):</b> Requiere ganar la Torre Heroica. Rivales con +35% HP y +1 PWR extra. (🏆 +3 Trofeos)",
      loreTitle: "El Sagrario del Éter Prohibido",
      lore: "Flotando entre nubes purpúreas, esta torre concentra la magia ancestral del Mazo Primigenio. Los cortesanos y centinelas celestes emplean hechizos oscuros para aniquilar a los intrusos antes del salón del trono.",
      multHp: 1.35,
      bonusFloorHp: 8,
      levelHpMult: 3,
      pwrBonusFloorDiv: 3,
      levelPwrBonus: 1,
      legacyMult: 1.01,
      trophies: 3
    },
    nightmare: {
      id: "nightmare",
      label: "PESADILLA",
      name: "Torre de la Perdición",
      icon: "🟣",
      maxFloors: 13,
      reqWins: 3,
      desc: "🟣 <b>Torre de la Perdición (13 Pisos):</b> Desafío supremo legendario. Requiere ganar la Torre Mítica. (🏆 +5 Trofeos)",
      loreTitle: "La Cúspide del Abismo Eterno",
      lore: "La cúspide definitiva donde el Dragón Guardián y BLACK gobiernan la realidad del juego. 13 pisos de agonía pura, maldiciones arcanas y poder desatado. Solo una leyenda viva puede romper la maldición del 21.",
      multHp: 1.60,
      bonusFloorHp: 10,
      levelHpMult: 5,
      pwrBonusFloorDiv: 2,
      levelPwrBonus: 2,
      legacyMult: 1.02,
      trophies: 5
    }
  };
  window.DIFFICULTY_CONFIGS = DIFFICULTY_CONFIGS;

  function getTotalTowerWins() {
    return parseInt(localStorage.getItem("bj_tower_total_wins") || "0", 10);
  }
  window.getTotalTowerWins = getTotalTowerWins;

  function isDifficultyUnlocked(diffKey) {
    if (diffKey === "normal") return true;
    const wins = getTotalTowerWins();
    const hasWonAny = (localStorage.getItem("blackjack_has_won_run") === "true");
    if (diffKey === "hard") return wins >= 1 || hasWonAny;
    if (diffKey === "mythic") return wins >= 2;
    if (diffKey === "nightmare") return wins >= 3;
    return false;
  }
  window.isDifficultyUnlocked = isDifficultyUnlocked;

  function getMaxFloorsForDifficulty(diffKey) {
    const k = diffKey || (gameState && gameState.diff) || getGameDifficulty();
    return DIFFICULTY_CONFIGS[k]?.maxFloors || 7;
  }
  window.getMaxFloorsForDifficulty = getMaxFloorsForDifficulty;

  function getGameDifficulty() {
    return localStorage.getItem("bj_game_difficulty") || "normal";
  }
  window.getGameDifficulty = getGameDifficulty;

  function setGameDifficulty(diffKey) {
    if (!DIFFICULTY_CONFIGS[diffKey]) diffKey = "normal";
    if (!isDifficultyUnlocked(diffKey)) {
      const cfg = DIFFICULTY_CONFIGS[diffKey];
      const prevName = diffKey === "hard" ? "Normal" : (diffKey === "mythic" ? "Heroico" : "Mítico");
      spawnFloatingText("hero-book-stage", `🔒 Supera la Torre en ${prevName} para desbloquear ${cfg.label}`, "crit");
      try { playBustSound(); } catch (_) {}
      return false;
    }
    localStorage.setItem("bj_game_difficulty", diffKey);
    gameState.diff = diffKey;
    updateDifficultySelectorUI();
    try { playTone(440, 0.08, "triangle", 0.4); } catch (_) {}
    return true;
  }
  window.setGameDifficulty = setGameDifficulty;

  function updateDifficultySelectorUI() {
    const cur = getGameDifficulty();
    const btns = document.querySelectorAll(".diff-btn");
    btns.forEach(b => {
      if (!b || !b.dataset) return;
      const dKey = b.dataset.diff;
      const unlocked = isDifficultyUnlocked(dKey);
      if (unlocked) {
        if (b.classList) b.classList.remove("locked");
      } else {
        if (b.classList) b.classList.add("locked");
      }
      if (dKey === cur) {
        if (b.classList) b.classList.add("active");
      } else if (b.classList) {
        b.classList.remove("active");
      }
    });
    const descEl = document.getElementById("difficulty-desc-box");
    if (descEl && DIFFICULTY_CONFIGS[cur]) {
      const cfg = DIFFICULTY_CONFIGS[cur];
      const loreHtml = cfg.lore ? `<div class="diff-lore-box" style="margin-top:4px;font-size:8.5px;color:#94a3b8;font-style:italic;line-height:1.3;border-left:2px solid #ffd166;padding-left:6px;background:rgba(255,255,255,0.02);border-radius:0 4px 4px 0;"><span style="color:#ffd166;font-style:normal;font-weight:bold;font-family:var(--font-pixel,monospace);font-size:8.5px;">📜 ${cfg.loreTitle || 'CRÓNICA'}:</span> "${cfg.lore}"</div>` : '';
      descEl.innerHTML = `<div id="ascension-difficulty-desc" class="ascension-diff-desc ascension-info-text"><span class="ascension-modifier-tag">${cfg.desc}</span>${loreHtml}</div>`;

      if (typeof document.querySelector === "function") {
        const playBtn = document.querySelector(".hero-book-action-btn.play");
        if (playBtn) {
          const curHeroKey = (typeof HERO_KEYS !== "undefined" && typeof heroBookIndex === "number" && HERO_KEYS[heroBookIndex]) ? HERO_KEYS[heroBookIndex] : "knight";
          const hData = (typeof HERO_DATA !== "undefined" && HERO_DATA[curHeroKey]) ? HERO_DATA[curHeroKey] : null;
          const hName = hData ? hData.name.toUpperCase() : "CABALLERO";
          playBtn.innerHTML = `⚔️ DESAFIAR ${cfg.name.toUpperCase()} • ${hName}`;
        }
      }
    }
  }
  window.updateDifficultySelectorUI = updateDifficultySelectorUI;

  /* ============================================================
     SISTEMA DE ASPECTOS Y VESTIDURAS DE HÉROE (SKINS)
     - Aspecto Clásico desbloqueado por defecto
     - Aspecto Dorado desbloqueable con Victoria de Torre o 25 Criptas
     - Aspecto Umbrío/Especial desbloqueable con Victoria o 40 Criptas
     ============================================================ */
  /* ============================================================
     SISTEMA DE ASPECTOS Y VESTIDURAS DE HÉROE (SKINS & SINERGIAS)
     - Cero estadísticas planas (+HP / +PWR fijos prohibidos)
     - Sinergias condicionales temáticas ligadas a palos de naipes
     - Evolución por Nivel Permanente: Rango I (N1), II (N4), III (N8)
     ============================================================ */
  const HERO_SKINS = {
    knight: [
      {
        id: "knight_classic",
        name: "Guardián de Hierro",
        icon: "🛡️",
        sprite: "🛡️",
        img: "assets/svg/skin_knight_classic.svg",
        desc: "Armadura clásica forjada en los baluartes del 21.",
        costCrypt: 0,
        synergy: {
          id: "bastion_clubs",
          name: "Baluarte de Tréboles",
          suit: "♣",
          trigger: "hand_win",
          condDesc: "Tener naipes de Tréboles (♣) en mano ganadora",
          ranks: [
            { rank: 1, reqLevel: 1, bonusShield: 2, maxPerHand: 4, text: "+2 Escudo por cada naipe ♣ (máx +4/mano)" },
            { rank: 2, reqLevel: 4, bonusShield: 3, maxPerHand: 6, text: "+3 Escudo por cada naipe ♣ (máx +6/mano)" },
            { rank: 3, reqLevel: 8, bonusShield: 4, maxPerHand: 8, text: "+4 Escudo por cada naipe ♣ (máx +8/mano)" }
          ]
        }
      },
      {
        id: "knight_golden",
        name: "Paladín de la Luz",
        icon: "⚔️",
        sprite: "⚔️",
        img: "assets/svg/skin_knight_golden.svg",
        desc: "Bendecido por los astros sagrados de la Torre.",
        costCrypt: 25,
        req: "Supera la Torre o 25 💀",
        synergy: {
          id: "sacred_tribute",
          name: "Sentencia Sagrada",
          suit: "♦",
          trigger: "hand_win_high",
          condDesc: "Ganar la mano con 20 o 21 puntos",
          ranks: [
            { rank: 1, reqLevel: 1, bonusGold: 4, maxPerBattle: 3, text: "+4 Oro al ganar con 20/21 (tope +12/combate)" },
            { rank: 2, reqLevel: 4, bonusGold: 7, maxPerBattle: 3, text: "+7 Oro al ganar con 20/21 (tope +21/combate)" },
            { rank: 3, reqLevel: 8, bonusGold: 10, maxPerBattle: 3, text: "+10 Oro al ganar con 20/21 (tope +30/combate)" }
          ]
        }
      },
      {
        id: "knight_shadow",
        name: "Cruzado Umbrío",
        icon: "🌑",
        sprite: "🌑",
        img: "assets/svg/skin_knight_shadow.svg",
        desc: "Templado con fuego negro del Abismo.",
        costCrypt: 40,
        req: "Supera la Torre o 40 💀",
        synergy: {
          id: "shadow_retaliation",
          name: "Represalia Umbría",
          suit: "♠",
          trigger: "take_damage",
          condDesc: "Recibir daño directo si jugaste Picas (♠) en tu mano",
          ranks: [
            { rank: 1, reqLevel: 1, thornsDmg: 2, maxPerBattle: 2, text: "Devuelve 2 daño al rival (máx 2 veces)" },
            { rank: 2, reqLevel: 4, thornsDmg: 4, maxPerBattle: 2, text: "Devuelve 4 daño al rival (máx 2 veces)" },
            { rank: 3, reqLevel: 8, thornsDmg: 6, maxPerBattle: 3, text: "Devuelve 6 daño al rival (máx 3 veces)" }
          ]
        }
      }
    ],
    rogue: [
      {
        id: "rogue_classic",
        name: "Sombras del Callejón",
        icon: "🗡️",
        sprite: "🗡️",
        img: "assets/svg/skin_rogue_classic.svg",
        desc: "Capucha de cuero y dagas silenciosas.",
        costCrypt: 0,
        synergy: {
          id: "cautious_strike",
          name: "Corte Traicionero",
          suit: "♠",
          trigger: "stand_low_win",
          condDesc: "Ganar plantándote en 16 o menos",
          ranks: [
            { rank: 1, reqLevel: 1, poisonAdd: 1, maxPerBattle: 2, text: "+1 Veneno al rival (máx 2 veces/combate)" },
            { rank: 2, reqLevel: 4, poisonAdd: 2, maxPerBattle: 3, text: "+2 Veneno al rival (máx 3 veces/combate)" },
            { rank: 3, reqLevel: 8, poisonAdd: 3, maxPerBattle: 4, text: "+3 Veneno al rival (máx 4 veces/combate)" }
          ]
        }
      },
      {
        id: "rogue_golden",
        name: "Corsario Dorado",
        icon: "🪙",
        sprite: "🪙",
        img: "assets/svg/skin_rogue_golden.svg",
        desc: "Vestiduras tejidas con hilos de oro puro.",
        costCrypt: 25,
        req: "Supera la Torre o 25 💀",
        synergy: {
          id: "corsair_loot",
          name: "Botín Corsario",
          suit: "♦",
          trigger: "blackjack_natural",
          condDesc: "Conseguir Blackjack Natural (21 en 2 cartas)",
          ranks: [
            { rank: 1, reqLevel: 1, bonusGold: 3, maxPerBattle: 3, text: "+3 Oro por BJ Natural (tope +9/combate)" },
            { rank: 2, reqLevel: 4, bonusGold: 5, maxPerBattle: 3, text: "+5 Oro por BJ Natural (tope +15/combate)" },
            { rank: 3, reqLevel: 8, bonusGold: 8, maxPerBattle: 3, text: "+8 Oro por BJ Natural (tope +24/combate)" }
          ]
        }
      },
      {
        id: "rogue_phantom",
        name: "Fantasma de la Niebla",
        icon: "💨",
        sprite: "💨",
        img: "assets/svg/skin_rogue_phantom.svg",
        desc: "Manto espectral casi invisible a los ojos rivales.",
        costCrypt: 40,
        req: "Supera la Torre o 40 💀",
        synergy: {
          id: "mist_evasion",
          name: "Velo de Niebla",
          suit: "♠",
          trigger: "score_21_win",
          condDesc: "Ganar con puntuación exacta de 21",
          ranks: [
            { rank: 1, reqLevel: 1, dodgeChance: 0.25, maxPerBattle: 1, text: "25% esquivar próximo golpe (1 vez)" },
            { rank: 2, reqLevel: 4, dodgeChance: 0.40, maxPerBattle: 2, text: "40% esquivar próximo golpe (2 veces)" },
            { rank: 3, reqLevel: 8, dodgeChance: 0.60, maxPerBattle: 2, text: "60% esquivar próximo golpe (2 veces)" }
          ]
        }
      }
    ],
    monk: [
      {
        id: "monk_classic",
        name: "Sabio del Templo",
        icon: "🧘",
        sprite: "🧘",
        img: "assets/svg/skin_monk_classic.svg",
        desc: "Túnica monacal de meditación y templanza.",
        costCrypt: 0,
        synergy: {
          id: "serene_hand",
          name: "Mano Serena",
          suit: "♥",
          trigger: "hearts_win",
          condDesc: "Ganar con al menos un naipe de Corazones (♥)",
          ranks: [
            { rank: 1, reqLevel: 1, healAmount: 2, maxPerBattle: 2, text: "Sana +2 HP con Corazones (máx 2 veces)" },
            { rank: 2, reqLevel: 4, healAmount: 3, maxPerBattle: 3, text: "Sana +3 HP con Corazones (máx 3 veces)" },
            { rank: 3, reqLevel: 8, healAmount: 5, maxPerBattle: 3, text: "Sana +5 HP con Corazones (máx 3 veces)" }
          ]
        }
      },
      {
        id: "monk_lotus",
        name: "Iluminado de Loto",
        icon: "🪷",
        sprite: "🪷",
        img: "assets/svg/skin_monk_lotus.svg",
        desc: "Paz espiritual que absorbe impactos devastadores.",
        costCrypt: 25,
        req: "Supera la Torre o 25 💀",
        synergy: {
          id: "lotus_shield",
          name: "Flor de Protección",
          suit: "♣",
          trigger: "player_bust",
          condDesc: "Hacer BUST al pasarte de 21",
          ranks: [
            { rank: 1, reqLevel: 1, shieldAmount: 3, maxPerBattle: 1, text: "+3 Escudo tras hacer BUST (1 vez/combate)" },
            { rank: 2, reqLevel: 4, shieldAmount: 5, maxPerBattle: 2, text: "+5 Escudo tras hacer BUST (2 veces/combate)" },
            { rank: 3, reqLevel: 8, shieldAmount: 8, maxPerBattle: 2, text: "+8 Escudo tras hacer BUST (2 veces/combate)" }
          ]
        }
      },
      {
        id: "monk_zen",
        name: "Dragón del Espíritu",
        icon: "☯️",
        sprite: "☯️",
        img: "assets/svg/skin_monk_zen.svg",
        desc: "Armonía suprema de puños celestiales.",
        costCrypt: 40,
        req: "Supera la Torre o 40 💀",
        synergy: {
          id: "zen_dragon",
          name: "Dragón Celestial",
          suit: "Universal",
          trigger: "streak_win",
          condDesc: "Ganar 2 manos consecutivas",
          ranks: [
            { rank: 1, reqLevel: 1, bonusDamage: 2, maxPerBattle: 1, text: "+2 daño en la 2ª victoria consecutiva (1 vez)" },
            { rank: 2, reqLevel: 4, bonusDamage: 4, maxPerBattle: 2, text: "+4 daño en la 2ª victoria consecutiva (2 veces)" },
            { rank: 3, reqLevel: 8, bonusDamage: 6, maxPerBattle: 3, text: "+6 daño en la 2ª victoria consecutiva (3 veces)" }
          ]
        }
      }
    ],
    necromancer: [
      {
        id: "necro_classic",
        name: "Conjurador de Almas",
        icon: "💀",
        sprite: "💀",
        img: "assets/svg/skin_necro_classic.svg",
        desc: "Manto fúnebre adornado con cráneos arcanos.",
        costCrypt: 0,
        synergy: {
          id: "soul_spades",
          name: "Resonancia Fúnebre",
          suit: "♠",
          trigger: "spades_win",
          condDesc: "Tener naipes de Picas (♠) en mano ganadora",
          ranks: [
            { rank: 1, reqLevel: 1, bonusDmgPerSpade: 1, maxPerHand: 3, text: "+1 daño directo por Pica ♠ (máx +3/mano)" },
            { rank: 2, reqLevel: 4, bonusDmgPerSpade: 2, maxPerHand: 6, text: "+2 daño directo por Pica ♠ (máx +6/mano)" },
            { rank: 3, reqLevel: 8, bonusDmgPerSpade: 3, maxPerHand: 9, text: "+3 daño directo por Pica ♠ (máx +9/mano)" }
          ]
        }
      },
      {
        id: "necro_lich",
        name: "Rey Exánime",
        icon: "👑",
        sprite: "👑",
        img: "assets/svg/skin_necro_lich.svg",
        desc: "Corona helada de almas cautivas.",
        costCrypt: 25,
        req: "Supera la Torre o 25 💀",
        synergy: {
          id: "glacial_touch",
          name: "Toque Glacial",
          suit: "♠",
          trigger: "has_ace_win",
          condDesc: "Ganar mano que contenga al menos un As (A)",
          ranks: [
            { rank: 1, reqLevel: 1, weakenPwr: 1, maxPerBattle: 2, text: "-1 PWR al rival siguiente turno (máx 2 veces)" },
            { rank: 2, reqLevel: 4, weakenPwr: 2, maxPerBattle: 3, text: "-2 PWR al rival siguiente turno (máx 3 veces)" },
            { rank: 3, reqLevel: 8, weakenPwr: 3, maxPerBattle: 3, text: "-3 PWR al rival siguiente turno (máx 3 veces)" }
          ]
        }
      },
      {
        id: "necro_void",
        name: "Heraldo del Vacío",
        icon: "🔮",
        sprite: "🔮",
        img: "assets/svg/skin_necro_void.svg",
        desc: "Energía del vacío estelar insondable.",
        costCrypt: 40,
        req: "Supera la Torre o 40 💀",
        synergy: {
          id: "void_singularity",
          name: "Singularidad del Vacío",
          suit: "Universal",
          trigger: "low_hp_win",
          condDesc: "Ganar la mano cuando tus HP son ≤ 40%",
          ranks: [
            { rank: 1, reqLevel: 1, voidDmg: 3, maxPerBattle: 1, text: "+3 daño letal adicional (1 vez/combate)" },
            { rank: 2, reqLevel: 4, voidDmg: 6, maxPerBattle: 1, text: "+6 daño letal adicional (1 vez/combate)" },
            { rank: 3, reqLevel: 8, voidDmg: 10, maxPerBattle: 2, text: "+10 daño letal adicional (2 veces/combate)" }
          ]
        }
      }
    ]
  };
  HERO_SKINS.necro = HERO_SKINS.necromancer;
  window.HERO_SKINS = HERO_SKINS;

  function getHeroEquippedSkin(heroKey) {
    const list = HERO_SKINS[heroKey] || HERO_SKINS.knight;
    const savedId = localStorage.getItem(`bj_hero_skin_${heroKey}`) || list[0].id;
    return list.find(s => s.id === savedId) || list[0];
  }
  window.getHeroEquippedSkin = getHeroEquippedSkin;

  function getCurrentSkinSvg(heroKey, skinId) {
    const normKey = (heroKey === "necro") ? "necromancer" : (heroKey || "knight");
    const list = HERO_SKINS[normKey] || HERO_SKINS.knight || [];
    if (skinId) {
      const found = list.find(s => s.id === skinId);
      if (found && found.img) return found.img;
    }
    const equipped = getHeroEquippedSkin(normKey);
    if (equipped && equipped.img) return equipped.img;
    const hero = HERO_DATA[normKey] || HERO_DATA.knight;
    return (hero && hero.img) ? hero.img : "assets/svg/knight_idle.svg";
  }
  window.getCurrentSkinSvg = getCurrentSkinSvg;

  function isHeroSkinUnlocked(heroKey, skinId) {
    const list = HERO_SKINS[heroKey] || HERO_SKINS.knight;
    const skin = list.find(s => s.id === skinId);
    if (!skin || skin.costCrypt === 0) return true;
    const unlockedList = parseJSONArray(localStorage.getItem(`bj_unlocked_skins_${heroKey}`), []);
    return unlockedList.includes(skinId);
  }
  window.isHeroSkinUnlocked = isHeroSkinUnlocked;

  function equipHeroSkin(heroKey, skinId) {
    if (!isHeroSkinUnlocked(heroKey, skinId)) return false;
    localStorage.setItem(`bj_hero_skin_${heroKey}`, skinId);
    const skin = getHeroEquippedSkin(heroKey);
    if (gameState.player && (gameState.player.class === heroKey || (heroKey === 'necromancer' && gameState.player.class === 'necro'))) {
      gameState.player.sprite = skin.sprite;
      const sprEl = document.getElementById("player-sprite");
      if (sprEl) sprEl.innerText = skin.sprite;
    }
    renderHeroBook();
    if (document.getElementById("screen-hero-sheet") && !document.getElementById("screen-hero-sheet").classList.contains("hidden")) {
      openHeroSheet(heroKey);
    }
    renderHeroSkinGrid(heroKey);
    try { playTone(600, 0.1, "sine", 0.4); } catch (_) {}
    triggerHaptic("button_click");
    return true;
  }
  window.equipHeroSkin = equipHeroSkin;

  function unlockHeroSkinWithCrypt(heroKey, skinId) {
    const list = HERO_SKINS[heroKey] || HERO_SKINS.knight;
    const skin = list.find(s => s.id === skinId);
    if (!skin) return false;
    if (isHeroSkinUnlocked(heroKey, skinId)) return true;

    const crypts = getPlayerCryptCoins();
    if (crypts < skin.costCrypt) {
      showGameToast(`Criptas insuficientes: necesitas ${skin.costCrypt} 💀 Monedas de Cripta (tienes ${crypts} 💀).`, "warn");
      return false;
    }

    spendPlayerCryptCoins(skin.costCrypt);
    const unlockedList = parseJSONArray(localStorage.getItem(`bj_unlocked_skins_${heroKey}`), []);
    unlockedList.push(skinId);
    localStorage.setItem(`bj_unlocked_skins_${heroKey}`, JSON.stringify(unlockedList));
    equipHeroSkin(heroKey, skinId);
    spawnFloatingText("stage", `👑 ¡VESTIDURA DESBLOQUEADA!`, "crit");
    try { playJackpotSound(); } catch (_) {}
    return true;
  }
  window.unlockHeroSkinWithCrypt = unlockHeroSkinWithCrypt;

  let currentSkinModalHero = "knight";
  function openHeroSkinModal(heroKey) {
    currentSkinModalHero = heroKey || "knight";
    const modal = document.getElementById("screen-hero-skin-modal");
    if (!modal) return;
    const hero = HERO_DATA[currentSkinModalHero] || HERO_DATA.knight;
    const titleEl = document.getElementById("smc-hero-title");
    if (titleEl) titleEl.innerText = `${hero.name.toUpperCase()} • VESTIDURAS`;
    renderHeroSkinGrid(currentSkinModalHero);
    modal.classList.remove("hidden");
    try { playButtonClickSound(); } catch (_) {}
  }
  window.openHeroSkinModal = openHeroSkinModal;

  function closeHeroSkinModal() {
    const modal = document.getElementById("screen-hero-skin-modal");
    if (modal) modal.classList.add("hidden");
    renderHeroBook();
  }
  window.closeHeroSkinModal = closeHeroSkinModal;

  function getSkinSynergyData(heroKey, skinId) {
    const list = HERO_SKINS[heroKey] || HERO_SKINS.knight;
    const skin = skinId ? (list.find(s => s.id === skinId) || list[0]) : (getHeroEquippedSkin(heroKey) || list[0]);
    if (!skin || !skin.synergy) return null;

    const meta = (typeof getHeroMeta === "function") ? getHeroMeta() : {};
    const hMeta = meta[heroKey] || { level: 1, masteryLevel: 1 };
    const permLevel = hMeta.level || hMeta.masteryLevel || 1;

    let rankIdx = 0;
    if (permLevel >= 8) rankIdx = 2;
    else if (permLevel >= 4) rankIdx = 1;

    const currentRank = skin.synergy.ranks[rankIdx];
    const nextRank = (rankIdx < 2) ? skin.synergy.ranks[rankIdx + 1] : null;
    const nextLevelReq = (rankIdx === 0) ? 4 : (rankIdx === 1 ? 8 : null);

    return {
      skin: skin,
      synergy: skin.synergy,
      rank: rankIdx + 1,
      permLevel: permLevel,
      currentRank: currentRank,
      nextRank: nextRank,
      nextLevelReq: nextLevelReq
    };
  }
  window.getSkinSynergyData = getSkinSynergyData;

  function applyEquippedSkinSynergy(triggerEvent, p, e, gs, extraData) {
    if (!p || !p.class) return null;
    const heroKey = (p.class === 'necro') ? 'necromancer' : p.class;
    const equipped = getHeroEquippedSkin(heroKey);
    const synData = getSkinSynergyData(heroKey, equipped ? equipped.id : null);
    if (!synData || !synData.synergy || synData.synergy.trigger !== triggerEvent) return null;

    if (!gs) gs = window.gameState || {};
    if (!gs._skinSynergyUsage) gs._skinSynergyUsage = {};
    const usageKey = synData.synergy.id;
    const currentUsage = gs._skinSynergyUsage[usageKey] || 0;
    const rankInfo = synData.currentRank;

    if (rankInfo.maxPerBattle && currentUsage >= rankInfo.maxPerBattle) return null;

    let activated = false;
    let logMsg = "";
    let floatText = "";

    switch (synData.synergy.id) {
      case "bastion_clubs": {
        const clubsCount = (p.playerHand || []).filter(c => c.suit === "♣" || (c.suit && c.suit.name === "clubs")).length;
        if (clubsCount > 0) {
          const shieldGain = Math.min(rankInfo.maxPerHand, clubsCount * rankInfo.bonusShield);
          if (!gs.status) gs.status = {};
          gs.status.playerShield = (gs.status.playerShield || 0) + shieldGain;
          activated = true;
          floatText = `🛡️ +${shieldGain} BALUARTE`;
          logMsg = `🛡️ [Vestidura: Guardián de Hierro] +${shieldGain} Escudo generado por ${clubsCount} naipes de Tréboles (♣).`;
        }
        break;
      }
      case "sacred_tribute": {
        if (p.playerScore === 20 || p.playerScore === 21) {
          gs.gold = (gs.gold || 0) + rankInfo.bonusGold;
          activated = true;
          floatText = `🪙 +${rankInfo.bonusGold} SENTENCIA`;
          logMsg = `🪙 [Vestidura: Paladín de la Luz] +${rankInfo.bonusGold} Oro sagrado por ganar con ${p.playerScore}.`;
        }
        break;
      }
      case "shadow_retaliation": {
        const hadSpades = (p.playerHand || []).some(c => c.suit === "♠" || (c.suit && c.suit.name === "spades"));
        if (hadSpades && e && e.hp > 0) {
          e.hp = Math.max(0, e.hp - rankInfo.thornsDmg);
          activated = true;
          floatText = `🌑 ${rankInfo.thornsDmg} REPRESALIA`;
          logMsg = `🌑 [Vestidura: Cruzado Umbrío] ${rankInfo.thornsDmg} daño devuelto al rival por represalia de Picas.`;
        }
        break;
      }
      case "cautious_strike": {
        if (p.playerScore <= 16 && e) {
          if (!gs.status) gs.status = {};
          gs.status.enemyPoison = (gs.status.enemyPoison || 0) + rankInfo.poisonAdd;
          activated = true;
          floatText = `☠️ +${rankInfo.poisonAdd} VENENO`;
          logMsg = `🗡️ [Vestidura: Sombras del Callejón] +${rankInfo.poisonAdd} Veneno aplicado tras plantarte con ${p.playerScore}.`;
        }
        break;
      }
      case "corsair_loot": {
        if (p.blackjack && p.playerHand.length === 2) {
          gs.gold = (gs.gold || 0) + rankInfo.bonusGold;
          activated = true;
          floatText = `🪙 +${rankInfo.bonusGold} CORSARIO`;
          logMsg = `🪙 [Vestidura: Corsario Dorado] +${rankInfo.bonusGold} Oro por Blackjack Natural.`;
        }
        break;
      }
      case "mist_evasion": {
        if (p.playerScore === 21) {
          p._skinDodgeActive = true;
          p._skinDodgeChance = rankInfo.dodgeChance;
          activated = true;
          floatText = `💨 VELO NIEBLA`;
          logMsg = `💨 [Vestidura: Fantasma de la Niebla] ${Math.round(rankInfo.dodgeChance * 100)}% prob. de esquivar el siguiente ataque.`;
        }
        break;
      }
      case "serene_hand": {
        const hasHearts = (p.playerHand || []).some(c => c.suit === "♥" || (c.suit && c.suit.name === "hearts"));
        if (hasHearts) {
          p.hp = Math.min(p.maxHp, p.hp + rankInfo.healAmount);
          activated = true;
          floatText = `💖 +${rankInfo.healAmount} SERENIDAD`;
          logMsg = `♥ [Vestidura: Sabio del Templo] +${rankInfo.healAmount} HP restaurados por ganar con Corazones.`;
        }
        break;
      }
      case "lotus_shield": {
        if (!gs.status) gs.status = {};
        gs.status.playerShield = (gs.status.playerShield || 0) + rankInfo.shieldAmount;
        activated = true;
        floatText = `🪷 +${rankInfo.shieldAmount} FLOR LOTO`;
        logMsg = `🪷 [Vestidura: Iluminado de Loto] +${rankInfo.shieldAmount} Escudo generado para amortiguar el BUST.`;
        break;
      }
      case "zen_dragon": {
        if (gs.playerStreak >= 2) {
          if (extraData && typeof extraData.addDamage === "function") {
            extraData.addDamage(rankInfo.bonusDamage);
          }
          activated = true;
          floatText = `☯️ +${rankInfo.bonusDamage} DRAGÓN`;
          logMsg = `☯️ [Vestidura: Dragón del Espíritu] +${rankInfo.bonusDamage} daño extra por racha de 2 victorias.`;
        }
        break;
      }
      case "soul_spades": {
        const spadesCount = (p.playerHand || []).filter(c => c.suit === "♠" || (c.suit && c.suit.name === "spades")).length;
        if (spadesCount > 0 && e && e.hp > 0) {
          const soulDmg = Math.min(rankInfo.maxPerHand, spadesCount * rankInfo.bonusDmgPerSpade);
          e.hp = Math.max(0, e.hp - soulDmg);
          activated = true;
          floatText = `💀 -${soulDmg} ALMAS`;
          logMsg = `💀 [Vestidura: Conjurador de Almas] -${soulDmg} daño directo por ${spadesCount} naipes de Picas (♠).`;
        }
        break;
      }
      case "glacial_touch": {
        const hasAce = (p.playerHand || []).some(c => c.rank === "A" || c.value === 11 || c.value === 1);
        if (hasAce && e) {
          e.pwr = Math.max(1, e.pwr - rankInfo.weakenPwr);
          activated = true;
          floatText = `👑 -${rankInfo.weakenPwr} PWR RIVAL`;
          logMsg = `👑 [Vestidura: Rey Exánime] -${rankInfo.weakenPwr} PWR al rival por toque gélido con As (A).`;
        }
        break;
      }
      case "void_singularity": {
        if (p.hp / Math.max(1, p.maxHp) <= 0.40 && e && e.hp > 0) {
          e.hp = Math.max(0, e.hp - rankInfo.voidDmg);
          activated = true;
          floatText = `🔮 -${rankInfo.voidDmg} VACÍO`;
          logMsg = `🔮 [Vestidura: Heraldo del Vacío] -${rankInfo.voidDmg} daño de vacío en estado crítico (≤40% HP).`;
        }
        break;
      }
    }

    if (activated) {
      gs._skinSynergyUsage[usageKey] = currentUsage + 1;
      if (floatText && typeof spawnFloatingText === "function") {
        spawnFloatingText("player-sprite", floatText, "crit");
      }
      if (logMsg && typeof addLog === "function") {
        addLog(logMsg, "critical");
      }
      if (typeof updateHud === "function") updateHud();
      return true;
    }
    return false;
  }
  window.applyEquippedSkinSynergy = applyEquippedSkinSynergy;

  function renderHeroSkinGrid(heroKey) {
    const grid = document.getElementById("skin-selector-grid");
    if (!grid) return;
    const list = HERO_SKINS[heroKey] || HERO_SKINS.knight;
    const equipped = getHeroEquippedSkin(heroKey);
    const crypts = getPlayerCryptCoins();

    grid.innerHTML = list.map(skin => {
      const isEquipped = (skin.id === equipped.id);
      const isUnlocked = isHeroSkinUnlocked(heroKey, skin.id);
      const synData = getSkinSynergyData(heroKey, skin.id);

      let actionBadge = "";
      if (isEquipped) {
        actionBadge = `<span class="skin-card-badge equipped">✔ EQUIPADO</span>`;
      } else if (isUnlocked) {
        actionBadge = `<button class="skin-card-badge buy-btn" onclick="equipHeroSkin('${heroKey}', '${skin.id}')">EQUIPAR</button>`;
      } else {
        const canBuy = (crypts >= skin.costCrypt);
        actionBadge = `
          <button class="skin-card-badge ${canBuy ? 'buy-btn' : 'locked'}" onclick="unlockHeroSkinWithCrypt('${heroKey}', '${skin.id}')">
            ${skin.costCrypt} 💀 DESBLOQUEAR
          </button>
        `;
      }

      const skinThumb = skin.img
        ? `<img src="${skin.img}" style="width:38px;height:38px;object-fit:contain;" alt="${skin.name}" onerror="this.outerHTML='${skin.icon}'">`
        : skin.icon;

      const synergyHtml = synData ? `
        <div class="skin-card-synergy-box">
          <div class="scs-header">
            <span class="scs-suit">${synData.synergy.suit}</span>
            <span class="scs-name">${synData.synergy.name}</span>
            <span class="scs-rank">Rango ${synData.rank}/3</span>
          </div>
          <div class="scs-cond">${synData.synergy.condDesc}</div>
          <div class="scs-effect">⚡ ${synData.currentRank.text}</div>
          ${synData.nextRank
            ? `<div class="scs-next">▸ Nivel Permanente ${synData.nextLevelReq}: ${synData.nextRank.text}</div>`
            : `<div class="scs-max">★ Rango Maestro alcanzado</div>`}
        </div>
      ` : "";

      return `
        <div class="skin-card-item ${isEquipped ? 'equipped' : ''}" onclick="${isUnlocked ? `equipHeroSkin('${heroKey}', '${skin.id}')` : ''}">
          <div class="skin-card-top-row">
            <div style="font-size:26px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);border-radius:8px;border:1.5px solid ${isEquipped ? '#2a9d8f' : 'rgba(255,255,255,0.2)'};">
              ${skinThumb}
            </div>
            <div class="skin-card-info">
              <div class="skin-card-name">${skin.name}</div>
              <div class="skin-card-desc">${skin.desc}</div>
              ${!isUnlocked ? `<div style="font-size: 9px;color:#ffd166;margin-top:2px;">Requisito: ${skin.req || 'Completar la Torre'}</div>` : ''}
            </div>
            <div>${actionBadge}</div>
          </div>
          ${synergyHtml}
        </div>
      `;
    }).join("");
  }
  window.renderHeroSkinGrid = renderHeroSkinGrid;

  /* ============================================================
     COMPENDIO Y GLOSARIO DE PERKS TÁCTICOS (#modal-perks-codex)
     ============================================================ */
  let activePerksCodexFilter = "all";
  function openPerksCodexModal() {
    const modal = document.getElementById("modal-perks-codex");
    if (!modal) return;
    renderPerksCodex(activePerksCodexFilter);
    modal.classList.remove("hidden");
    try { playButtonClickSound(); } catch (_) {}
  }
  window.openPerksCodexModal = openPerksCodexModal;

  function closePerksCodexModal() {
    const modal = document.getElementById("modal-perks-codex");
    if (modal) modal.classList.add("hidden");
  }
  window.closePerksCodexModal = closePerksCodexModal;

  function switchPerksCodexTab(filterKey) {
    if (filterKey === "necromancer") filterKey = "necro";
    activePerksCodexFilter = filterKey;
    const btns = document.querySelectorAll("#perks-codex-tabs .pct-tab-btn");
    btns.forEach(b => {
      const dataFilter = b.getAttribute("data-filter");
      const isMatch = dataFilter
        ? (dataFilter === filterKey)
        : (b.innerText.toLowerCase().includes(filterKey.toLowerCase()) || (filterKey === "all" && b.innerText.includes("TODOS")) || (filterKey === "universal" && b.innerText.includes("UNIVERSALES")));
      if (isMatch) {
        b.classList.add("active");
      } else {
        b.classList.remove("active");
      }
    });
    renderPerksCodex(filterKey);
    try { playTone(500, 0.05, "sine", 0.3); } catch (_) {}
  }
  window.switchPerksCodexTab = switchPerksCodexTab;

  function renderPerksCodex(filter = "all") {
    if (filter === "necromancer") filter = "necro";
    const grid = document.getElementById("perks-codex-grid");
    if (!grid) return;

    const perks = (typeof window.TACTICAL_PERKS !== "undefined") ? window.TACTICAL_PERKS : [];
    const filtered = perks.filter(p => {
      if (filter === "all") return true;
      if (filter === "knight") return p.id === "iron_wall" || p.id === "shield_bash";
      if (filter === "rogue") return p.id === "assassin_edge" || p.id === "vanishing_act";
      if (filter === "monk") return p.id === "monks_clarity";
      if (filter === "necro") return p.id === "plague_master" || p.id === "dark_harvest";
      if (filter === "universal") return !["iron_wall", "shield_bash", "assassin_edge", "vanishing_act", "monks_clarity", "plague_master", "dark_harvest"].includes(p.id);
      return true;
    });

    const classTags = {
      iron_wall: "🛡️ Caballero", shield_bash: "🛡️ Caballero",
      assassin_edge: "🗡️ Pícaro", vanishing_act: "🗡️ Pícaro",
      monks_clarity: "🧘 Monje",
      plague_master: "💀 Nigromante", dark_harvest: "💀 Nigromante"
    };

    grid.innerHTML = filtered.map(p => {
      const tag = classTags[p.id] || "⚡ Universal";
      return `
        <div class="perk-codex-item">
          <div class="perk-codex-icon">${p.icon}</div>
          <div class="perk-codex-info">
            <div class="perk-codex-name">
              <span>${p.name}</span>
              <span class="perk-codex-class-badge">${tag}</span>
            </div>
            <div class="perk-codex-cond">
              <b>Condición:</b> ${p.desc}
            </div>
          </div>
        </div>
      `;
    }).join("");
  }
  window.renderPerksCodex = renderPerksCodex;

  function renderHeroBook() {
    const stage = document.getElementById("hero-book-stage");
    if (!stage) return;

    const heroKey = HERO_KEYS[currentHeroBookIndex];
    const hero = HERO_DATA[heroKey] || HERO_DATA.knight;
    const meta = getHeroMeta();
    const unlocks = getHeroUnlocks();
    const hMeta = meta[heroKey] || { totalExp: 0, masteryLevel: 1 };
    const bonuses = getMasteryBonuses(hMeta.level || hMeta.masteryLevel || 1);
    const isUnlocked = unlocks[heroKey] ? unlocks[heroKey].unlocked : (heroKey === "knight");
    const unl = unlocks[heroKey] || { progress: 0, target: 10, missionText: "" };

    const pageBadge = document.getElementById("hero-book-page-badge");
    if (pageBadge) {
      pageBadge.innerText = `📖 LIBRO DE LOS JACKS • ${currentHeroBookIndex + 1} / ${HERO_KEYS.length}`;
    }

    // Actualizar dots indicadores
    const dots = document.querySelectorAll(".hero-book-dots .hero-dot");
    dots.forEach((dot, idx) => {
      if (idx === currentHeroBookIndex) dot.classList.add("active");
      else dot.classList.remove("active");
    });

    const cardClass = `hero-book-card ${hero.class} ${isUnlocked ? 'active-test' : 'locked'}`;
    const badgeClass = isUnlocked ? 'hero-book-badge active' : 'hero-book-badge locked';
    let badgeText = isUnlocked ? `⭐ ${hero.title.toUpperCase()} (HABILITADO)` : `🔒 BLOQUEADO (MISIÓN)`;
    if (!isUnlocked && (heroKey === "necro" || heroKey === "necromancer")) {
      badgeText = `🔒 EXCLUSIVO: COMPLETA SU MISIÓN`;
    }

    // SPRINT 1 + 5: Nivel Permanente Real con barra de EXP y Trofeos de Prestigio
    const permLevel = hMeta.level || hMeta.masteryLevel || 1;
    const expNeed = getExpRequiredForLevel(permLevel);
    const expNow = Math.max(0, Math.min(hMeta.exp || 0, expNeed));
    const expPct = Math.round((expNow / Math.max(1, expNeed)) * 100);
    const trophies = hMeta.prestigeTrophies || 0;
    const currentRunGold = (typeof gameState !== "undefined" && gameState.gold) ? gameState.gold : 0;
    const metaCryptCoins = (typeof getPlayerCryptCoins === "function") ? getPlayerCryptCoins() : 0;
    const masteryHtml = isUnlocked
      ? `<div class="hero-mastery-banner" style="margin-bottom:6px;">
           <span class="term" data-term="mastery">⭐ Nivel ${permLevel}</span> • ${expNow}/${expNeed} Exp (${expPct}%)${trophies > 0 ? ` • 🏆 ${trophies}` : ""}
           <div style="height:4px;background:rgba(255,255,255,0.10);border-radius:3px;margin-top:3px;overflow:hidden;">
             <div style="height:100%;width:${expPct}%;background:linear-gradient(90deg,#2a9d8f,#ffd166);"></div>
           </div>
         </div>`
      : `<div class="hero-mastery-banner locked" style="margin-bottom:6px;">🔒 MISIÓN: ${unl.progress}/${unl.target}</div>`;

    const pct = Math.min(100, Math.round((unl.progress / Math.max(1, unl.target)) * 100));
    const missionHtml = !isUnlocked ? `
      <div class="hero-mission-box" style="width:100%;margin-bottom:8px;">
        <div class="hero-mission-header">
          <span>MISIÓN: ${unl.missionText}</span>
          <span>${unl.progress}/${unl.target}</span>
        </div>
        <div class="hero-mission-bar">
          <div class="hero-mission-fill" style="width: ${pct}%;"></div>
        </div>
      </div>
    ` : "";

    const curDiff = (typeof getGameDifficulty === "function") ? getGameDifficulty() : "normal";
    const curCfg = (typeof DIFFICULTY_CONFIGS !== "undefined" && DIFFICULTY_CONFIGS[curDiff]) ? DIFFICULTY_CONFIGS[curDiff] : null;
    const towerLabel = curCfg ? curCfg.name.toUpperCase() : "TORRE DEL NOVICIO";

    const actionBtnHtml = isUnlocked
      ? `<button class="hero-book-action-btn play" onclick="event.stopPropagation(); startGame('${heroKey}')">⚔️ DESAFIAR ${towerLabel} • ${hero.name.toUpperCase()}</button>`
      : `<button class="hero-book-action-btn locked" onclick="event.stopPropagation(); selectLockedHero('${heroKey}')">🔒 BLOQUEADO — VER MISIÓN</button>`;

    const heroColor = heroKey === 'knight' ? '#2a9d8f' : (heroKey === 'rogue' ? '#f4a261' : (heroKey === 'monk' ? '#a8dadc' : '#c77dff'));

    const legHp = (hMeta.legacyHp || 0) * 3;
    const legPwr = (hMeta.legacyPwr || 0) * 1;
    const legDef = (hMeta.legacyDef || 0) * 1;
    const totalSpent = (hMeta.legacyHp || 0) + (hMeta.legacyPwr || 0) + (hMeta.legacyDef || 0);

    const equippedSkin = (typeof getHeroEquippedSkin === "function") ? getHeroEquippedSkin(heroKey) : null;
    const skinImg = (equippedSkin && equippedSkin.img) ? equippedSkin.img : hero.img;
    const skinSprite = (equippedSkin && equippedSkin.sprite) ? equippedSkin.sprite : hero.sprite;
    const skinName = equippedSkin ? equippedSkin.name : "Clásica";

    // SPRINT 1: las Estadísticas Base son las acumuladas por el héroe (crecimiento de clase + maestría inicial)
    const baseHp = (typeof hMeta.baseMaxHp === "number" && hMeta.baseMaxHp > 0) ? hMeta.baseMaxHp : (hero.maxHp + bonuses.hp);
    const basePwr = (typeof hMeta.basePwr === "number" && hMeta.basePwr >= 0) ? hMeta.basePwr : (hero.pwr + bonuses.pwr);
    const baseDef = (typeof hMeta.baseDef === "number" && hMeta.baseDef >= 0) ? hMeta.baseDef : (hero.def + bonuses.def);

    stage.innerHTML = `
      <div class="${cardClass}" onclick="onHeroCardClick('${heroKey}')">
        <div class="${badgeClass}">${badgeText}</div>
        
        <div class="hero-book-avatar-wrap" onclick="event.stopPropagation(); openHeroSheet('${heroKey}')" title="Toca para inspeccionar la ficha completa del héroe">
          <img src="${skinImg}" class="hero-book-thumb ${hero.class}" alt="${hero.name}" onerror="this.outerHTML='<span style=\\'font-size:36px;\\'>${skinSprite}</span>'">
        </div>

        <div class="hero-book-title" style="color:${heroColor};">${hero.name.toUpperCase()}</div>
        <div class="hero-book-subtitle">${hero.title} • <span style="color:#ffd166;">${skinName}</span></div>

        ${masteryHtml}

        <div class="hero-book-stats-row">
          <span class="hero-book-stat-pill term" data-term="hp" title="Estadística Base permanente: ${baseHp} + Legado: ${legHp}">❤️ HP: ${baseHp + legHp}${legHp > 0 ? ` <b style="color:#2a9d8f;">(+${legHp})</b>` : ''}</span>
          <span class="hero-book-stat-pill term" data-term="pwr" title="Estadística Base permanente: ${basePwr} + Legado: ${legPwr}">⚔️ PWR: ${basePwr + legPwr}${legPwr > 0 ? ` <b style="color:#2a9d8f;">(+${legPwr})</b>` : ''}</span>
          <span class="hero-book-stat-pill term" data-term="def" title="Estadística Base permanente: ${baseDef} + Legado: ${legDef}">🛡️ DEF: ${baseDef + legDef}${legDef > 0 ? ` <b style="color:#2a9d8f;">(+${legDef})</b>` : ''}</span>
          ${hero.startingShield ? `<span class="hero-book-stat-pill term" data-term="shield" style="color:#48cae4;">🛡️ Escudo: ${hero.startingShield}</span>` : ''}
        </div>

        <div class="hero-book-passive-box">
          <div class="hero-book-passive-title term" data-term="passive">📜 HABILIDAD PASIVA DE CLASE:</div>
          <div class="hero-book-passive-desc">${hero.desc}</div>
        </div>

        ${missionHtml}

        <div style="display:flex;gap:4px;width:100%;margin-bottom:6px;">
          <button class="hero-book-sheet-btn" style="flex:1;font-size: 9px;padding:4px 3px;" onclick="event.stopPropagation(); openHeroSheet('${heroKey}')">📊 FICHA</button>
          <button class="hero-book-sheet-btn" style="flex:1;font-size: 9px;padding:4px 3px;background:rgba(42,157,143,0.25);border-color:#2a9d8f;color:#66fcf1;" onclick="event.stopPropagation(); openHeroPerksDirect('${heroKey}')">⚡ PERKS</button>
          <button class="hero-book-sheet-btn" style="flex:1;font-size: 9px;padding:4px 3px;background:rgba(217,119,6,0.22);border-color:#d97706;color:#fef08a;" onclick="event.stopPropagation(); openHeroSkinModal('${heroKey}')">🎨 ASPECTOS</button>
        </div>

        ${actionBtnHtml}
      </div>
    `;

    if (typeof updateDifficultySelectorUI === "function") {
      updateDifficultySelectorUI();
    }
  }
  window.renderHeroBook = renderHeroBook;

  function openHeroPerksDirect(heroKey) {
    const filterKey = (heroKey === "necromancer" || heroKey === "necro") ? "necro" : heroKey;
    openPerksCodexModal();
    switchPerksCodexTab(filterKey);
  }
  window.openHeroPerksDirect = openHeroPerksDirect;

  /* ============================================================
     SPRINT 5: FICHA COMPLETA DEL HÉROE (GRIMORIO)
     - Botón 📊 FICHA en la tarjeta (el click de la tarjeta sigue
       arrancando la partida: el botón corta la propagación).
     - Capítulos de HERO_LORES gateados por Nivel Permanente.
     ============================================================ */
  const HERO_SHEET_LORE_LEVELS = [1, 3, 6, 9];

  function openHeroSheet(heroKey) {
    if (heroKey === "necro") heroKey = "necromancer";
    const sheet = document.getElementById("screen-hero-sheet");
    const currentRunGold = (typeof gameState !== "undefined" && gameState && typeof gameState.gold === "number") ? gameState.gold : 0;
    const metaCryptCoins = (typeof getPlayerCryptCoins === "function") ? getPlayerCryptCoins() : 0;
    if (!sheet) return;
    const hero = HERO_DATA[heroKey] || HERO_DATA.knight;
    const meta = getHeroMeta();
    const unlocks = getHeroUnlocks();
    const hMeta = meta[heroKey] || { totalExp: 0, masteryLevel: 1, level: 1, exp: 0 };
    const permLevel = hMeta.level || hMeta.masteryLevel || 1;
    const bonuses = getMasteryBonuses(permLevel);
    const isUnlocked = unlocks[heroKey] ? unlocks[heroKey].unlocked : (heroKey === "knight");
    const unl = unlocks[heroKey] || { progress: 0, target: 10, missionText: "" };

    const legHp = (hMeta.legacyHp || 0) * 3;
    const legPwr = (hMeta.legacyPwr || 0) * 1;
    const legDef = (hMeta.legacyDef || 0) * 1;
    const baseHp = (typeof hMeta.baseMaxHp === "number" && hMeta.baseMaxHp > 0) ? hMeta.baseMaxHp : (hero.maxHp + bonuses.hp);
    const basePwr = (typeof hMeta.basePwr === "number" && hMeta.basePwr >= 0) ? hMeta.basePwr : (hero.pwr + bonuses.pwr);
    const baseDef = (typeof hMeta.baseDef === "number" && hMeta.baseDef >= 0) ? hMeta.baseDef : (hero.def + bonuses.def);

    const expNeed = getExpRequiredForLevel(permLevel);
    const expNow = Math.max(0, Math.min(hMeta.exp || 0, expNeed));
    const expPct = Math.round((expNow / Math.max(1, expNeed)) * 100);
    const trophies = hMeta.prestigeTrophies || 0;
    const heroColor = heroKey === 'knight' ? '#2a9d8f' : (heroKey === 'rogue' ? '#f4a261' : (heroKey === 'monk' ? '#a8dadc' : '#c77dff'));
    const totalSpent = (hMeta.legacyHp || 0) + (hMeta.legacyPwr || 0) + (hMeta.legacyDef || 0);

    const equippedSkin = (typeof getHeroEquippedSkin === "function") ? getHeroEquippedSkin(heroKey) : { name: "Clásica", icon: hero.sprite, desc: hero.title };

    // Perks tácticos específicos de esta clase
    const classPerksMap = {
      knight: [
        { icon: "🛡️", name: "Muro de Hierro", cond: "Tener ≥ 15 Escudo activo", effect: "Otorga +2 PWR de contraataque adicional en tu siguiente turno." },
        { icon: "💥", name: "Golpe de Escudo", cond: "Tener Escudo activo y mano de 20 o 21", effect: "Aturde al rival reduciendo su PWR en -1 permanentemente este piso." }
      ],
      rogue: [
        { icon: "🗡️", name: "Filo Asesino", cond: "Plantarse en mano exacta de 20 o 21", effect: "Inflige +4 daño crítico garantizado ignorando armadura." },
        { icon: "💨", name: "Desaparición", cond: "Mano actual con valor ≤ 14", effect: "30% de probabilidad de esquivar el siguiente ataque del rival." }
      ],
      monk: [
        { icon: "🧘", name: "Claridad del Monje", cond: "Conseguir un 21 exacto en la mano", effect: "Restaura inmediatamente +6 HP y otorga +3 de Escudo divino." }
      ],
      necro: [
        { icon: "💀", name: "Maestro de Plagas", cond: "Jugar naipes de Picas (♠) en tu mano", effect: "Aplica +1 Veneno acumulativo al rival por cada carta de Picas." },
        { icon: "🌾", name: "Cosecha Oscura", cond: "Eliminar a un rival con Veneno activo", effect: "Absorbes el 100% de las cargas de Veneno como regeneración de HP." }
      ],
      necromancer: [
        { icon: "💀", name: "Maestro de Plagas", cond: "Jugar naipes de Picas (♠) en tu mano", effect: "Aplica +1 Veneno acumulativo al rival por cada carta de Picas." },
        { icon: "🌾", name: "Cosecha Oscura", cond: "Eliminar a un rival con Veneno activo", effect: "Absorbes el 100% de las cargas de Veneno como regeneración de HP." }
      ]
    };

    const classPerks = classPerksMap[heroKey] || classPerksMap.knight;
    const persistentSeals = (typeof getPersistentDeckSeals === "function") ? getPersistentDeckSeals() : {};
    const extraCards = (typeof getPersistentExtraCards === "function") ? getPersistentExtraCards() : [];

    const renderHeroDeckSealsHtml = (seals) => {
      const keys = Object.keys(seals);
      if (keys.length === 0) {
        return `<div style="font-size:9px;color:#94a3b8;background:rgba(0,0,0,0.3);padding:8px 10px;border-radius:6px;border:1px dashed #475569;">Sin sellos forjados aún. Al subir de maestría o conquistar la Torre podrás sellar un naipe.</div>`;
      }
      return `
        <div class="hero-deck-card-grid">
          ${keys.map(k => {
            const seal = seals[k];
            const parts = k.split("_");
            const suit = parts[0];
            const rank = parts[1];
            const isRed = (suit === "♥" || suit === "♦");
            return `
              <div class="hero-deck-card-item sealed">
                <div style="font-size:12px;font-weight:bold;color:${isRed ? '#ff758f' : '#f8fafc'};">${rank}${suit}</div>
                <div style="font-size:20px;margin:2px 0;">${seal.icon}</div>
                <div style="font-family:var(--font-pixel);font-size:8px;color:#ffd166;font-weight:bold;">${seal.name.toUpperCase()}</div>
                <div style="font-size:8px;color:#94a3b8;text-align:center;line-height:1.2;margin-top:2px;">${seal.desc}</div>
              </div>
            `;
          }).join("")}
        </div>
      `;
    };

        const renderHeroDeckLootHtml = (cards) => {
      if (!Array.isArray(cards) || cards.length === 0) {
        return `<div style="font-size:9px;color:#94a3b8;background:rgba(0,0,0,0.3);padding:8px 10px;border-radius:6px;border:1px dashed #475569;">Aún no tienes naipes de botín. Derrota a BLACK (Piso 13) para transmutar hasta 12 naipes arcanos dentro de tu baraja oficial de 52 cartas.</div>`;
      }
      return `
        <div style="font-family:var(--font-pixel);font-size:8.5px;color:#66fcf1;margin-bottom:6px;display:flex;align-items:center;justify-content:space-between;">
          <span>🃏 NAIPES ARCANOS TRANSMUTADOS</span>
          <span style="color:#ffd166;">${cards.length} / 12 EN MAZO (52 MÁX)</span>
        </div>
        <div class="hero-deck-card-grid">
          ${cards.map((c, i) => {
            const isRed = (c.suit === "♥" || c.suit === "♦");
            const badgeBg = c.badgeClass === "fusion" ? "rgba(56,189,248,0.2)" : (c.badgeClass === "mult" ? "rgba(251,191,36,0.2)" : "rgba(168,85,247,0.2)");
            const badgeColor = c.badgeClass === "fusion" ? "#38bdf8" : (c.badgeClass === "mult" ? "#fbbf24" : "#c084fc");
            const badgeBorder = c.badgeClass === "fusion" ? "#0284c7" : (c.badgeClass === "mult" ? "#d97706" : "#7e22ce");
            const icon = c.icon || (c.isAce ? '⚡' : (c.fusion ? '⚗️' : (c.operator ? '⚔️' : '⚖️')));
            const name = c.name || `${c.rank}${c.suit} Arcano`;
            const badgeText = c.badgeText || (c.fusion ? 'FUSIÓN' : (c.operator ? 'POTENCIADOR x2' : 'AJUSTE'));
            const desc = c.desc || (c.fusion ? 'Fusión flexible de valores para evitar BUST.' : (c.operator ? 'Multiplica el daño x2 al ganar.' : 'Ajusta sumando o restando para 21.'));

            return `
              <div class="hero-deck-card-item loot-card ${isRed ? 'suit-red' : 'suit-black'}" style="border:1.5px solid ${badgeBorder};background:rgba(15,23,42,0.85);box-shadow:0 0 10px ${badgeBg};padding:6px;border-radius:6px;text-align:center;">
                <div style="font-size:12px;font-weight:bold;color:${isRed ? '#ff758f' : '#f8fafc'};">${c.rank}${c.suit}</div>
                <div style="font-size:20px;margin:2px 0;">${icon}</div>
                <div style="font-family:var(--font-pixel);font-size:8px;color:#ffd166;font-weight:bold;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${name.toUpperCase()}</div>
                <div style="display:inline-block;padding:2px 5px;background:${badgeBg};border:1px solid ${badgeBorder};color:${badgeColor};font-size:7px;font-weight:bold;border-radius:4px;margin-bottom:3px;">
                  ${badgeText}
                </div>
                <div style="font-size:7.5px;color:#cbd5e1;line-height:1.2;text-align:center;">${desc}</div>
                <div style="font-size:7px;color:#38bdf8;margin-top:3px;font-style:italic;">✓ Activo en tu mazo de 52</div>
              </div>
            `;
          }).join("")}
        </div>
      `;
    };

    const classPerksHtml = classPerks.map(p => `
      <div style="background:rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,0.08);border-left:3px solid #2a9d8f;border-radius:6px;padding:7px 10px;">
        <div style="display:flex;align-items:center;gap:6px;font-family:var(--font-pixel,monospace);font-size: 9px;color:#ffd166;font-weight:bold;">
          <span>${p.icon}</span> <span>${p.name}</span>
        </div>
        <div style="font-size: 9px;color:#cbd5e1;margin-top:3px;">
          <b>Activación:</b> ${p.cond}
        </div>
        <div style="font-size: 9px;color:#a8dadc;margin-top:2px;">
          <b>Efecto:</b> ${p.effect}
        </div>
      </div>
    `).join("");

    const statRow = (icon, label, base, leg) => `
      <div class="hero-sheet-stat-row">
        <span class="hss-icon">${icon}</span>
        <span class="hss-label">${label}</span>
        <span class="hss-base">Base ${base}</span>
        <span class="hss-leg ${leg > 0 ? 'has' : ''}">Legado +${leg}</span>
        <span class="hss-total">Total <b>${base + leg}</b></span>
      </div>`;

    const titleEl = document.getElementById("hero-sheet-title");
    if (titleEl) {
      titleEl.innerHTML = `📊 FICHA DE <span style="color:${heroColor}">${hero.name.toUpperCase()}</span>`;
      titleEl.title = hero.title;
    }

    const body = document.getElementById("hero-sheet-body");
    if (body) {
      body.innerHTML = `
        <div class="hero-sheet-subtitle">${hero.title}</div>

        <!-- SELECTOR DE PESTAÑAS INTERNAS DE LA FICHA -->
        <div class="hero-sheet-tabs-nav">
          <button class="hero-sheet-tab-btn active" id="hst-tab-combat" onclick="switchHeroSheetTab('combat')">⚔️ ATRIBUTOS</button>
          <button class="hero-sheet-tab-btn" id="hst-tab-deck" onclick="switchHeroSheetTab('deck')">🃏 MI MAZO</button>
          <button class="hero-sheet-tab-btn" id="hst-tab-legacy" onclick="switchHeroSheetTab('legacy')">🏛️ ALTAR LEGADO</button>
          <button class="hero-sheet-tab-btn" id="hst-tab-lore" onclick="switchHeroSheetTab('lore')">📖 MEMORIAS</button>
        </div>

        <!-- PANEL 1: COMBATE, PROGRESO Y PASIVAS -->
        <div class="hero-sheet-tab-panel active" id="hst-panel-combat">
          <!-- SECCIÓN DE LAS 2 MONEDAS DE ECONOMÍA -->
          <div style="display:flex;gap:8px;margin-bottom:12px;">
            <div style="flex:1;background:rgba(255,209,102,0.12);border:1px solid #ffd166;border-radius:8px;padding:6px 10px;text-align:center;">
              <div style="font-family:var(--font-pixel);font-size:7.5px;color:#ffd166;font-weight:bold;">🪙 ORO DE EXPEDICIÓN</div>
              <div style="font-size:13px;font-weight:bold;color:#fff;">${currentRunGold} 🪙</div>
              <div style="font-size:7px;color:#cbd5e1;margin-top:2px;">Compras en tienda del piso</div>
            </div>
            <div style="flex:1;background:rgba(230,57,70,0.12);border:1px solid #ff758f;border-radius:8px;padding:6px 10px;text-align:center;">
              <div style="font-family:var(--font-pixel);font-size:7.5px;color:#ff758f;font-weight:bold;">💀 META-ORO (CRIPTAS)</div>
              <div style="font-size:13px;font-weight:bold;color:#fff;">${metaCryptCoins} 💀</div>
              <div style="font-size:7px;color:#cbd5e1;margin-top:2px;">Mejoras máximas & Mercado</div>
            </div>
          </div>
          <!-- SECCIÓN DE APARIENCIA / VESTIDURA (AVATAR) -->
          <div class="hero-sheet-section">
            <div class="hero-sheet-section-title">🎨 VESTIDURA Y APARIENCIA</div>
            <div style="display:flex;align-items:center;gap:12px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:8px 10px;">
              <div style="font-size:32px;width:50px;height:50px;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);border-radius:8px;border:1.5px solid #ffd166;">
                ${equippedSkin.img ? `<img src="${equippedSkin.img}" style="width:44px;height:44px;object-fit:contain;" alt="${equippedSkin.name}" onerror="this.outerHTML='${equippedSkin.icon}'">` : equippedSkin.icon}
              </div>
              <div style="flex:1;">
                <div style="font-family:var(--font-pixel,monospace);color:#ffd166;font-size:10px;font-weight:bold;">${equippedSkin.name}</div>
                <div style="font-size: 9px;color:#cbd5e1;margin-top:2px;">${equippedSkin.desc}</div>
                <div style="font-size: 9px;color:#2a9d8f;margin-top:2px;">✔ Equipado actualmente</div>
              </div>
              <button class="hero-book-action-btn" style="padding:6px 10px;font-size: 9px;background:linear-gradient(135deg,#d97706,#b45309);border-color:#ffd166;color:#fff;cursor:pointer;white-space:nowrap;" onclick="openHeroSkinModal('${heroKey}')">
                🎨 CAMBIAR
              </button>
            </div>
          </div>

          <div class="hero-sheet-section">
            <div class="hero-sheet-section-title">⭐ NIVEL PERMANENTE</div>
            <div class="hero-sheet-mastery">
              Nivel ${permLevel} • ${expNow}/${expNeed} EXP (${expPct}%)${trophies > 0 ? ` • 🏆 ${trophies} Trofeos` : ""}
              <div class="hero-sheet-mastery-bar"><div style="width:${expPct}%;"></div></div>
            </div>
            <div class="hero-sheet-chips">
              <span class="hero-sheet-chip">⭐ Maestría de Clase Rango ${permLevel}</span>
              <span class="hero-sheet-chip">🏆 ${trophies} Trofeos de Torre</span>
            </div>
            ${!isUnlocked ? `<div class="hero-sheet-mission">🔒 MISIÓN: ${unl.missionText} (${unl.progress}/${unl.target})</div>` : ""}
          </div>

          <div class="hero-sheet-section">
            <div class="hero-sheet-section-title">📈 ESTADÍSTICAS DE COMBATE</div>
            ${statRow('❤️', 'SALUD', baseHp, legHp)}
            ${statRow('⚔️', 'PODER', basePwr, legPwr)}
            ${statRow('🛡️', 'BASTIÓN', baseDef, legDef)}
            ${hero.startingShield ? `<div class="hero-sheet-stat-row"><span class="hss-icon">🛡️</span><span class="hss-label">ESCUDO INICIAL</span><span class="hss-total">Total <b>${hero.startingShield}</b></span></div>` : ""}
          </div>

          <div class="hero-sheet-section">
            <div class="hero-sheet-section-title">📜 PASIVA DE CLASE</div>
            <div class="hero-sheet-passive">${hero.desc}</div>
          </div>

          <div class="hero-sheet-section">
            <div class="hero-sheet-section-title">⚡ PERKS TÁCTICOS Y COMBOS</div>
            <button class="hero-book-action-btn" style="width:100%;padding:8px;background:rgba(255,209,102,0.12);border:1px solid #ffd166;color:#ffd166;font-size:10px;font-family:var(--font-pixel,monospace);border-radius:6px;cursor:pointer;" onclick="openPerksCodexModal()">
              💡 CONSULTAR COMPENDIO DE PERKS TÁCTICOS (15 COMBOS)
            </button>
          </div>
        </div>

        <!-- PANEL MI MAZO (BARAJA HISTÓRICA DE ASCENSIÓN) -->
        <div class="hero-sheet-tab-panel" id="hst-panel-deck">
          <div class="hero-sheet-section">
            <div class="hero-sheet-section-title">🃏 BARAJA OFICIAL DE ASCENSIÓN (52 CARTAS MÁXIMO)</div>
            <div style="font-size:9px;color:#cbd5e1;line-height:1.45;margin-bottom:8px;">
              Tu baraja oficial reglamentaria consta de un <b>máximo estricto de 52 cartas</b>. Los naipes del Botín de la Torre <b>transmutan y sustituyen</b> naipes estándar de tu mazo con poderes arcanos de Fusión, Multiplicadores x2 y Ajustes (+/-).
            </div>
            <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;">
              <div style="background:rgba(0,0,0,0.5);border:1px solid #ffd166;border-radius:6px;padding:6px 10px;display:flex;align-items:center;gap:6px;">
                <span style="font-size:14px;">🎴</span>
                <div>
                  <div style="font-family:var(--font-pixel);font-size:8px;color:#ffd166;">BARAJA REGLAMENTARIA</div>
                  <div style="font-size:12px;font-weight:bold;color:#fff;">52 CARTAS (FIJO)</div>
                </div>
              </div>
              <div style="background:rgba(0,0,0,0.5);border:1px solid #2a9d8f;border-radius:6px;padding:6px 10px;display:flex;align-items:center;gap:6px;">
                <span style="font-size:14px;">⭐</span>
                <div>
                  <div style="font-family:var(--font-pixel);font-size:8px;color:#2a9d8f;">BOTÍN TRANSMUTADO</div>
                  <div style="font-size:12px;font-weight:bold;color:#fff;">${extraCards.length} / 12 ACTIVOS</div>
                </div>
              </div>
              <div style="background:rgba(0,0,0,0.5);border:1px solid #a8dadc;border-radius:6px;padding:6px 10px;display:flex;align-items:center;gap:6px;">
                <span style="font-size:14px;">✨</span>
                <div>
                  <div style="font-family:var(--font-pixel);font-size:8px;color:#a8dadc;">SELLOS FORJADOS</div>
                  <div style="font-size:12px;font-weight:bold;color:#fff;">${Object.keys(persistentSeals).length} SELLOS</div>
                </div>
              </div>
            </div>

            <!-- SECCIÓN SELLOS ARCANOS -->
            <div class="hero-sheet-section-title" style="margin-top:10px;">✨ CARTAS CON SELLO ARCANO (${Object.keys(persistentSeals).length})</div>
            ${renderHeroDeckSealsHtml(persistentSeals)}

            <!-- SECCIÓN NAIPES DE BOTÍN -->
            <div class="hero-sheet-section-title" style="margin-top:12px;">🏆 NAIPES DE BOTÍN DE LA TORRE (${extraCards.length}/12)</div>
            ${renderHeroDeckLootHtml(extraCards)}

            <!-- COMPOSICIÓN BASE -->
            <div class="hero-sheet-section-title" style="margin-top:12px;">📊 COMPOSICIÓN BASE (52 CARTAS)</div>
            <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:8px;font-size:9px;color:#cbd5e1;line-height:1.5;">
              • <b>4 Ases</b> (♥ ♦ ♣ ♠) — Valor dinámico 1 u 11 puntos.<br>
              • <b>16 Figuras y Dieces</b> (K, Q, J, 10 de cada palo) — Valor 10 puntos fijos.<br>
              • <b>32 Naipes numéricos</b> (2 al 9 de cada palo) — Valor nominal 2..9 puntos.
            </div>
          </div>
        </div>

        <!-- PANEL 2: ALTAR DEL LEGADO ANCESTRAL -->
        <div class="hero-sheet-tab-panel" id="hst-panel-legacy">
          <div class="hero-sheet-section hero-sheet-legacy-section">
            <div class="hero-sheet-section-title">🏛️ ALTAR DEL LEGADO ANCESTRAL (PRESTIGIO DEL PISO 13)</div>
            <div class="hero-sheet-legacy-desc" style="font-size: 9px;color:#cbd5e1;line-height:1.45;margin-bottom:6px;">
              Los <b>Puntos de Legado Supremo</b> solo se forjan al <b>COMPLETAR LA TORRE</b> (derrotando a BLACK en el Piso 13 por primera vez en cada dificultad). Otorgan mejoras permanentes a las estadísticas de este Jack.
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
              <span style="font-size: 9px;color:#ffd166;font-family:var(--font-pixel,monospace);">🏆 Trofeos de Prestigio: ${trophies}</span>
              <span class="legacy-points-badge ${(hMeta.legacyPoints || 0) > 0 ? 'has-points' : ''}">
                ${hMeta.legacyPoints || 0} ${(hMeta.legacyPoints || 0) === 1 ? 'PTO' : 'PTOS'} DISPONIBLES
              </span>
            </div>
            <div class="legacy-stats-grid">
              <div class="legacy-stat-row">
                <span class="ls-label">❤️ SALUD:</span>
                <div class="ls-meter">
                  <div class="ls-meter-bar" style="width:${Math.min(100, ((hMeta.legacyHp || 0) / 10) * 100)}%;"></div>
                  <span class="ls-meter-text">+${legHp} / +30 HP (${hMeta.legacyHp || 0}/10)</span>
                </div>
                <button class="legacy-plus-btn" ${(hMeta.legacyPoints <= 0 || (hMeta.legacyHp || 0) >= 10) ? 'disabled' : ''} onclick="upgradeHeroLegacy('${heroKey}', 'hp'); openHeroSheet('${heroKey}'); switchHeroSheetTab('legacy');" title="Añadir +3 HP base">+</button>
              </div>
              <div class="legacy-stat-row">
                <span class="ls-label">⚔️ PODER:</span>
                <div class="ls-meter">
                  <div class="ls-meter-bar" style="width:${Math.min(100, ((hMeta.legacyPwr || 0) / 5) * 100)}%;"></div>
                  <span class="ls-meter-text">+${legPwr} / +5 PWR (${hMeta.legacyPwr || 0}/5)</span>
                </div>
                <button class="legacy-plus-btn" ${(hMeta.legacyPoints <= 0 || (hMeta.legacyPwr || 0) >= 5) ? 'disabled' : ''} onclick="upgradeHeroLegacy('${heroKey}', 'pwr'); openHeroSheet('${heroKey}'); switchHeroSheetTab('legacy');" title="Añadir +1 PWR base">+</button>
              </div>
              <div class="legacy-stat-row">
                <span class="ls-label">🛡️ BASTIÓN:</span>
                <div class="ls-meter">
                  <div class="ls-meter-bar" style="width:${Math.min(100, ((hMeta.legacyDef || 0) / 5) * 100)}%;"></div>
                  <span class="ls-meter-text">+${legDef} / +5 DEF (${hMeta.legacyDef || 0}/5)</span>
                </div>
                <button class="legacy-plus-btn" ${(hMeta.legacyPoints <= 0 || (hMeta.legacyDef || 0) >= 5) ? 'disabled' : ''} onclick="upgradeHeroLegacy('${heroKey}', 'def'); openHeroSheet('${heroKey}'); switchHeroSheetTab('legacy');" title="Añadir +1 DEF base">+</button>
              </div>
            </div>
            ${totalSpent > 0 ? `
              <div style="text-align:right;margin-top:6px;">
                <button class="legacy-refund-btn" onclick="refundHeroLegacy('${heroKey}'); openHeroSheet('${heroKey}'); switchHeroSheetTab('legacy');" title="Reembolsar puntos asignados">↺ REINICIAR PUNTOS</button>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- PANEL 3: GRIMORIO DE MEMORIAS -->
        <div class="hero-sheet-tab-panel" id="hst-panel-lore">
          <div class="hero-sheet-section">
            <div class="hero-sheet-section-title">📖 GRIMORIO DE MEMORIAS</div>
            ${(() => {
              const lores = (typeof HERO_LORES !== "undefined" && HERO_LORES[heroKey]) ? HERO_LORES[heroKey] : {};
              const levels = HERO_SHEET_LORE_LEVELS;
              let revealed = 0;
              const items = levels.map(lvl => {
                const text = lores[lvl];
                if (!text) return "";
                const unlocked = permLevel >= lvl;
                if (unlocked) {
                  revealed++;
                  return `<div class="hero-sheet-lore-item unlocked">
                    <div class="hero-sheet-lore-head">📖 CAPÍTULO ${lvl} · PISO ${lvl} — ✓ REVELADO</div>
                    <div class="hero-sheet-lore-text">${text}</div>
                  </div>`;
                }
                return `<div class="hero-sheet-lore-item locked">
                  <div class="hero-sheet-lore-head">🔒 CAPÍTULO ${lvl} · PISO ${lvl} — REQ. NIVEL ${lvl}</div>
                  <div class="hero-sheet-lore-text locked-text">Fragmento de memoria sellado. Para revelarlo, alcanza el Nivel Permanente ${lvl} con ${hero.name} (actualmente Nivel ${permLevel}).</div>
                </div>`;
              }).join("");
              return `<div class="hero-sheet-lore-count">${revealed} / ${levels.length} revelados</div>${items}`;
            })()}
          </div>
        </div>
      `;
    }

    sheet.classList.remove("hidden");
    try { playButtonClickSound(); } catch (_) {}
  }
  window.openHeroSheet = openHeroSheet;

  function switchHeroSheetTab(tabKey) {
    const tabs = ['combat', 'deck', 'legacy', 'lore'];
    tabs.forEach(t => {
      const btn = document.getElementById(`hst-tab-${t}`);
      const pnl = document.getElementById(`hst-panel-${t}`);
      if (btn) btn.classList.toggle('active', t === tabKey);
      if (pnl) pnl.classList.toggle('active', t === tabKey);
    });
    try { if (typeof playButtonClickSound === "function") playButtonClickSound(); } catch (_) {}
  }
  window.switchHeroSheetTab = switchHeroSheetTab;

  function closeHeroSheet() {
    const sheet = document.getElementById("screen-hero-sheet");
    if (!sheet) return;
    sheet.classList.add("hidden");
  }
  window.closeHeroSheet = closeHeroSheet;

  function updateHeroSelectUI() {
    renderHeroBook();
    checkResumeRunButton();
    try { renderLoreGrimoire(); } catch (_) {}
  }
  window.updateHeroSelectUI = updateHeroSelectUI;

  /* ============================================================
     GRIMORIO DE HISTORIA DE LOS 4 JACKS (PESTAÑA LORE)
     - Desbloqueo progresivo por Nivel Permanente (Nvl 1, 3, 6, 9)
     - Sello del olvido si el héroe está bloqueado
     ============================================================ */
  let currentLoreHeroTab = "knight";

  function setLoreHeroTab(heroKey) {
    currentLoreHeroTab = heroKey;
    try { playButtonClickSound(); } catch (_) {}
    renderLoreGrimoire();
  }
  window.setLoreHeroTab = setLoreHeroTab;

  function renderLoreGrimoire() {
    const container = document.getElementById("lore-heroes-grimoire");
    if (!container) return;

    const meta = getHeroMeta();
    const unlocks = getHeroUnlocks();
    const keys = ["knight", "rogue", "monk", "necromancer"];

    const tabsHtml = keys.map(k => {
      const hero = HERO_DATA[k] || HERO_DATA.knight;
      const isUnlocked = unlocks[k] ? unlocks[k].unlocked : (k === "knight");
      const isActive = (k === currentLoreHeroTab);
      const icon = isUnlocked ? hero.sprite : "🔒";
      const heroColor = k === 'knight' ? '#2a9d8f' : (k === 'rogue' ? '#f4a261' : (k === 'monk' ? '#a8dadc' : '#c77dff'));
      return `
        <button class="lore-hero-nav-btn ${isActive ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}" 
                onclick="setLoreHeroTab('${k}')" 
                style="${isActive ? `border-color:${heroColor};background:rgba(255,255,255,0.08);color:${heroColor};` : ''}">
          <span>${icon}</span>
          <span>${hero.name.toUpperCase()}</span>
        </button>
      `;
    }).join("");

    const selHero = HERO_DATA[currentLoreHeroTab] || HERO_DATA.knight;
    const isSelUnlocked = unlocks[currentLoreHeroTab] ? unlocks[currentLoreHeroTab].unlocked : (currentLoreHeroTab === "knight");
    const hMeta = meta[currentLoreHeroTab] || { level: 1, masteryLevel: 1 };
    const permLevel = hMeta.level || hMeta.masteryLevel || 1;
    const lores = (typeof HERO_LORES !== "undefined" && HERO_LORES[currentLoreHeroTab]) ? HERO_LORES[currentLoreHeroTab] : {};
    const heroColor = currentLoreHeroTab === 'knight' ? '#2a9d8f' : (currentLoreHeroTab === 'rogue' ? '#f4a261' : (currentLoreHeroTab === 'monk' ? '#a8dadc' : '#c77dff'));

    let contentHtml = "";
    if (!isSelUnlocked) {
      contentHtml = `
        <div class="lore-hero-card locked-pane" style="background:rgba(15,23,42,0.7);border:1px dashed #e63946;border-radius:8px;padding:14px;text-align:center;">
          <div style="font-size:24px;margin-bottom:6px;">🔒</div>
          <div style="font-family:var(--font-pixel,monospace);font-size: 9px;color:#ff758f;margin-bottom:6px;">SELLO DEL OLVIDO: ${selHero.name.toUpperCase()} BLOQUEADO</div>
          <p style="font-size: 9px;color:#94a3b8;line-height:1.45;margin:0 auto;max-width:320px;">
            Este heraldo aún no ha despertado sus recuerdos en la Torre. Desbloquéalo en el Libro de Héroes para develar los secretos de su linaje y sus memorias prohibidas.
          </p>
        </div>
      `;
    } else {
      const chapters = HERO_SHEET_LORE_LEVELS;
      const chaptersHtml = chapters.map(lvl => {
        const text = lores[lvl];
        if (!text) return "";
        const unlocked = permLevel >= lvl;
        if (unlocked) {
          return `
            <button type="button" class="lore-chapter-item unlocked" onclick="openLoreChapter(${lvl})" title="Abrir la ventana de la crónica" style="display:flex;align-items:center;gap:8px;width:100%;text-align:left;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.10);border-left:3px solid ${heroColor};border-radius:4px;padding:9px 10px;margin-bottom:6px;cursor:pointer;color:inherit;font-family:inherit;">
              <span style="font-size:11px;">📖</span>
              <span style="flex:1;font-family:var(--font-pixel,monospace);font-size:9px;color:#ffd166;">CAPÍTULO ${lvl} · PISO ${lvl}</span>
              <span style="font-family:var(--font-pixel,monospace);font-size:9px;color:#2a9d8f;">ABRIR ▸</span>
            </button>
          `;
        } else {
          return `
            <button type="button" class="lore-chapter-item locked" onclick="openLoreChapter(${lvl})" title="Crónica sellada: toca para ver el requisito" style="display:flex;align-items:center;gap:8px;width:100%;text-align:left;background:rgba(0,0,0,0.35);border:1px dashed rgba(148,163,184,0.35);border-left:3px solid #64748b;border-radius:4px;padding:9px 10px;margin-bottom:6px;cursor:pointer;color:inherit;font-family:inherit;opacity:0.8;">
              <span style="font-size:11px;">🔒</span>
              <span style="flex:1;font-family:var(--font-pixel,monospace);font-size:9px;color:#94a3b8;">CAPÍTULO ${lvl} · PISO ${lvl}</span>
              <span style="font-family:var(--font-pixel,monospace);font-size:9px;color:#f4a261;">NIV. ${lvl}</span>
            </button>
          `;
        }
      }).join("");

      contentHtml = `
        <div class="lore-hero-card" style="background:rgba(15,23,42,0.65);border:1px solid rgba(255,209,102,0.25);border-radius:8px;padding:10px 12px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid rgba(255,255,255,0.08);">
            <img src="${selHero.img}" alt="${selHero.name}" style="width:36px;height:36px;border-radius:6px;border:1.5px solid ${heroColor};object-fit:cover;" onerror="this.outerHTML='<span style=\\'font-size:24px;\\'>${selHero.sprite}</span>'">
            <div style="flex:1;">
              <div style="font-family:var(--font-pixel,monospace);font-size:9px;color:${heroColor};">${selHero.name.toUpperCase()}</div>
              <div style="font-size: 9px;color:#94a3b8;">${selHero.title} · <b style="color:#ffd166;">Nivel Permanente ${permLevel}</b></div>
            </div>
          </div>
          <div class="lore-chapters-list">
            ${chaptersHtml}
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="lore-hero-nav" style="display:flex;gap:4px;margin-bottom:8px;overflow-x:auto;padding-bottom:2px;">
        ${tabsHtml}
      </div>
      ${contentHtml}
    `;
  }
  window.renderLoreGrimoire = renderLoreGrimoire;

  /* Las crónicas se muestran CERRADAS en el menú; al pulsarlas se abren en una ventana. */
  function openLoreChapter(lvl) {
    const hero = HERO_DATA[currentLoreHeroTab] || HERO_DATA.knight;
    const meta = getHeroMeta();
    const hMeta = meta[currentLoreHeroTab] || { level: 1, masteryLevel: 1 };
    const permLevel = hMeta.level || hMeta.masteryLevel || 1;
    const lores = (typeof HERO_LORES !== "undefined" && HERO_LORES[currentLoreHeroTab]) ? HERO_LORES[currentLoreHeroTab] : {};
    let text = lores[lvl] || "";
    if (typeof window.applyLorePatch === "function") {
      text = window.applyLorePatch(lvl, text);
    }
    const unlocked = permLevel >= lvl;
    const color = currentLoreHeroTab === 'knight' ? '#2a9d8f' : (currentLoreHeroTab === 'rogue' ? '#f4a261' : (currentLoreHeroTab === 'monk' ? '#a8dadc' : '#c77dff'));

    const titleEl = document.getElementById("lore-chapter-title");
    const bodyEl = document.getElementById("lore-chapter-body");
    if (titleEl) titleEl.innerHTML = `📖 ${hero.name.toUpperCase()} · CAPÍTULO ${lvl}`;
    if (bodyEl) {
      bodyEl.innerHTML = unlocked
        ? `
          <div class="hero-sheet-subtitle">${hero.title} · PISO ${lvl}</div>
          <div style="background:rgba(255,255,255,0.04);border-left:3px solid ${color};border-radius:6px;padding:10px 12px;margin-top:6px;">
            <div style="font-family:var(--font-pixel,monospace);font-size:9px;color:#ffd166;margin-bottom:6px;">📖 MEMORIA REVELADA</div>
            <div style="font-size:10px;color:#e2e8f0;line-height:1.6;white-space:pre-line;text-align:left;">${text}</div>
          </div>`
        : `
          <div class="hero-sheet-subtitle">${hero.title} · PISO ${lvl}</div>
          <div style="background:rgba(0,0,0,0.35);border:1px dashed #64748b;border-radius:6px;padding:14px 12px;margin-top:6px;text-align:center;">
            <div style="font-size:24px;margin-bottom:6px;">🔒</div>
            <div style="font-family:var(--font-pixel,monospace);font-size:9px;color:#f4a261;margin-bottom:6px;">CRÓNICA SELLADA</div>
            <div style="font-size:9px;color:#94a3b8;line-height:1.5;">
              Alcanza el Nivel Permanente ${lvl} con ${hero.name} (actualmente Nivel ${permLevel}) para develar este capítulo del grimorio.
            </div>
          </div>`;
    }
    const overlay = document.getElementById("screen-lore-chapter");
    if (overlay) overlay.classList.remove("hidden");
    try { playButtonClickSound(); } catch (_) {}
  }
  window.openLoreChapter = openLoreChapter;

  function closeLoreChapter() {
    const overlay = document.getElementById("screen-lore-chapter");
    if (overlay) overlay.classList.add("hidden");
    try { playButtonClickSound(); } catch (_) {}
  }
  window.closeLoreChapter = closeLoreChapter;

  /* ============================================================
     CÓDICE DE LA TORRE — COMPENDIO DE COLECCIONABLES
     ============================================================ */
  const CODEX_KEY = "blackjack_codex_v1";

  function getCodex() {
    try {
      const parsed = _loadSecure(CODEX_KEY, null);
      if (parsed && typeof parsed === "object") {
        return {
          relics: parsed.relics || {},
          amulets: parsed.amulets || {},
          enemies: parsed.enemies || {}
        };
      }
    } catch (e) {
      console.warn("Error leyendo códice:", e);
    }
    return { relics: {}, amulets: {}, enemies: {} };
  }

  function saveCodex(data) {
    try {
      _saveSecure(CODEX_KEY, data);
    } catch (e) {
      console.warn("Error guardando códice:", e);
    }
  }

  function registerCodexDiscovery(category, id) {
    if (!category || !id) return;
    const codex = getCodex();
    if (!codex[category]) codex[category] = {};
    if (!codex[category][id]) {
      codex[category][id] = true;
      saveCodex(codex);
      addLog(`📜 ¡Nuevo registro descubierto en el Códice! (${id})`, "info");
    }
  }

  let currentCodexTab = "relics";
  function openCodex() {
    switchCodexTab("relics");
    const m = document.getElementById("screen-codex");
    if (m) m.classList.remove("hidden");
    triggerHaptic("button_click");
  }
  window.openCodex = openCodex;

  function closeCodex() {
    const m = document.getElementById("screen-codex");
    if (m) m.classList.add("hidden");
    triggerHaptic("button_click");
  }
  window.closeCodex = closeCodex;

  function switchCodexTab(tab = "relics") {
    currentCodexTab = tab;
    const tabs = ["relics", "amulets", "enemies"];
    tabs.forEach(t => {
      const btn = document.getElementById("codex-tab-" + t);
      if (btn) {
        if (t === tab) btn.classList.add("active");
        else btn.classList.remove("active");
      }
    });

    const codex = getCodex();
    const grid = document.getElementById("codex-grid");
    if (!grid) return;

    let itemsHtml = "";
    if (tab === "relics") {
      itemsHtml = ALL_RELICS.map(r => {
        const discovered = !!(codex.relics && codex.relics[r.id]);
        if (discovered) {
          const typeCls = r.type === "buff" ? "buff" : "nerf";
          return `
            <div class="codex-card ${typeCls}" onclick="inspectCodexItem('${r.id}', 'relic')" style="cursor:pointer;" title="Toca para ver ficha detallada">
              <div class="codex-card-icon">${r.icon}</div>
              <div class="codex-card-body">
                <div class="codex-card-title">${r.name}</div>
                <div class="codex-card-desc">${r.desc}</div>
                <div style="font-size: 9px;color:#66fcf1;margin-top:2px;">🔍 Toca para inspeccionar</div>
              </div>
            </div>
          `;
        } else {
          return `
            <div class="codex-card silhouette" onclick="inspectCodexItem('${r.id}', 'relic')" style="cursor:pointer;" title="Toca para ver ficha">
              <div class="codex-card-icon">❓</div>
              <div class="codex-card-body">
                <div class="codex-card-title">??? Reliquia Oculta</div>
                <div class="codex-card-desc">Se ofrece como recompensa mística al superar pisos de la Torre.</div>
              </div>
            </div>
          `;
        }
      }).join("");
    } else if (tab === "amulets") {
      itemsHtml = Object.keys(AMULET_INFO).map(key => {
        const info = AMULET_INFO[key];
        const discovered = !!(codex.amulets && codex.amulets[key]);
        if (discovered) {
          return `
            <div class="codex-card buff" onclick="inspectCodexItem('${key}', 'amulet')" style="cursor:pointer;" title="Toca para ver ficha detallada">
              <div class="codex-card-icon">${info.icon}</div>
              <div class="codex-card-body">
                <div class="codex-card-title">${info.name}</div>
                <div class="codex-card-desc">${info.desc}</div>
                <div style="font-size: 9px;color:#ffd166;margin-top:2px;">🔍 Toca para inspeccionar</div>
              </div>
            </div>
          `;
        } else {
          return `
            <div class="codex-card silhouette" onclick="inspectCodexItem('${key}', 'amulet')" style="cursor:pointer;" title="Toca para ver ficha">
              <div class="codex-card-icon">🔒</div>
              <div class="codex-card-body">
                <div class="codex-card-title">??? Amuleto Legendario</div>
                <div class="codex-card-desc">Disponible en la Joyería Secreta de la Torre (Piso 8).</div>
              </div>
            </div>
          `;
        }
      }).join("");
    } else if (tab === "enemies") {
      itemsHtml = ENEMIES.map(e => {
        const discovered = !!(codex.enemies && codex.enemies[e.name]);
        if (discovered) {
          const loreText = (typeof getEnemyLore === "function" ? getEnemyLore(e.name) : (window.ENEMY_LORE && window.ENEMY_LORE[e.name])) || (e.traitName || "");
          return `
            <div class="codex-card nerf" onclick="inspectCodexItem('${e.name}', 'enemy')" style="cursor:pointer;" title="Toca para ver ficha detallada">
              <div class="codex-card-icon">${e.sprite}</div>
              <div class="codex-card-body">
                <div class="codex-card-title">${e.name}</div>
                <div class="codex-card-desc" style="margin-bottom:4px;">${loreText}</div>
                <div class="codex-card-desc" style="opacity:0.8;font-size: 9px;color:#ff758f;">${e.traitShort} — HP: ${e.hp} • PWR: ${e.pwr} • DEF: ${e.def}</div>
                <div style="font-size: 9px;color:#ff758f;margin-top:2px;">🔍 Toca para inspeccionar</div>
              </div>
            </div>
          `;
        } else {
          return `
            <div class="codex-card silhouette" onclick="inspectCodexItem('${e.name}', 'enemy')" style="cursor:pointer;" title="Toca para ver ficha">
              <div class="codex-card-icon">👤</div>
              <div class="codex-card-body">
                <div class="codex-card-title">??? Rival Enigmático</div>
                <div class="codex-card-desc">Habita en los pisos superiores de la Torre. Enfréntalo para registrarlo.</div>
              </div>
            </div>
          `;
        }
      }).join("");
    }
    grid.innerHTML = itemsHtml;

    // Calcular progreso total
    const totalItems = ALL_RELICS.length + Object.keys(AMULET_INFO).length + ENEMIES.length;
    const discoveredItems = Object.keys(codex.relics || {}).length + Object.keys(codex.amulets || {}).length + Object.keys(codex.enemies || {}).length;
    const badgeEl = document.getElementById("codex-count-badge");
    if (badgeEl) {
      const pct = Math.round((discoveredItems / totalItems) * 100);
      badgeEl.innerText = `${discoveredItems} / ${totalItems} (${pct}%)`;
    }
  }
  window.switchCodexTab = switchCodexTab;

  /* ============================================================
     PERSISTENCIA MÓVIL: GUARDADO ANTI-INTERRUPCIONES
     ============================================================ */
  const MID_RUN_STORAGE_KEY = "blackjack_active_run_v1";

  function saveMidRunState() {
    if (!gameState.player || gameState.player.hp <= 0) return;
    const titleEl = document.getElementById("screen-title");
    if (titleEl && !titleEl.classList.contains("hidden")) return;
    // Una partida ya terminada (Torre superada) no debe re-guardarse
    const maxFloors = (typeof getMaxFloorsForDifficulty === "function") ? getMaxFloorsForDifficulty() : 13;
    if (gameState.floor > maxFloors) return;

    try {
      const stateToSave = {
        version: 2,
        floor: gameState.floor,
        enemyFloor: gameState.enemyFloor || gameState.floor,
        gold: gameState.gold,
        killCount: gameState.killCount,
        runStats: gameState.runStats || null,
        revivesUsed: gameState.revivesUsed || 0,
        curseTakenOnFloor: gameState.curseTakenOnFloor || {},
        wheelMode: gameState.wheelMode || "death",
        pityPacksWithoutEpic: gameState.pityPacksWithoutEpic || 0,
        diff: gameState.diff,
        status: gameState.status,
        player: gameState.player,
        enemy: gameState.enemy,
        phase: gameState.phase,
        savedAt: Date.now()
      };
      localStorage.setItem(MID_RUN_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn("Error guardando estado de partida activa:", e);
    }
  }

  function clearMidRunState() {
    try {
      localStorage.removeItem(MID_RUN_STORAGE_KEY);
    } catch (e) {}
    checkResumeRunButton();
  }

  function checkResumeRunButton() {
    const container = document.getElementById("container-resume-run");
    if (!container) return;
    try {
      const raw = localStorage.getItem(MID_RUN_STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved && saved.player && saved.player.hp > 0 && saved.floor >= 1) {
          const heroName = String(saved.player.name || "Héroe").replace(/^jack\s+/i, "");
          container.innerHTML = `
            <button class="btn-resume-run" onclick="resumeSavedRun()">
              ▶ REANUDAR PARTIDA (PISO ${saved.floor} • ${heroName} [${saved.player.hp}/${saved.player.maxHp} HP])
            </button>
          `;
          return;
        }
      }
    } catch (e) {}
    container.innerHTML = "";
  }

  // Pinta nombre, rasgo y retrato del rival actual (usado al reanudar sin regenerar el piso)
  function renderEnemyIdentity() {
    const e = gameState.enemy;
    if (!e || !e.name) return;
    const nameTag = document.getElementById("enemy-name-tag");
    if (nameTag) nameTag.innerText = e.name.toUpperCase();
    const traitTag = document.getElementById("enemy-trait-tag");
    if (traitTag) {
      traitTag.innerText = e.traitShort || (e.traitName ? `★ ${e.traitName.split(" ")[0]}` : "");
      traitTag.title = e.traitName ? `Rasgo: ${e.traitName} (Toca para ver)` : "";
      traitTag.onclick = explainEnemyTrait;
      traitTag.style.cursor = "pointer";
    }
    const sprite = document.getElementById("enemy-sprite");
    if (sprite) {
      if (e.img) {
        sprite.innerHTML = `<img src="${e.img}" class="sprite-img" alt="${e.name}" onerror="this.outerHTML='${e.sprite}'">`;
      } else {
        sprite.innerText = e.sprite || "👺";
      }
      sprite.className = "sprite enemy-avatar";
    }
  }

  function resumeSavedRun() {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(MID_RUN_STORAGE_KEY) || "null");
    } catch (_) { saved = null; }
    if (!saved || !saved.player) {
      checkResumeRunButton();
      return;
    }

    try {
      try { stopIntroMinigame(); } catch (_) {}
      try { stopIntroMusic(); } catch (_) {}

      gameState.floor = saved.floor;
      gameState.enemyFloor = saved.enemyFloor || saved.floor;
      gameState.gold = saved.gold || 0;
      gameState.killCount = saved.killCount || 0;
      gameState.runStats = saved.runStats || gameState.runStats || null;
      gameState.revivesUsed = saved.revivesUsed || 0;
      gameState.curseTakenOnFloor = saved.curseTakenOnFloor || {};
      gameState.wheelMode = saved.wheelMode || "death";
      gameState.pityPacksWithoutEpic = saved.pityPacksWithoutEpic || 0;
      gameState.diff = saved.diff || "normal";
      gameState.status = Object.assign({
        playerShield: 0, playerPoison: 0, playerBurn: 0,
        enemyShield: 0, enemyPoison: 0, enemyBurn: 0, enemyRevived: false
      }, saved.status || {});
      gameState.isRolling = false;
      Object.assign(gameState.player, saved.player);
      if (saved.enemy) Object.assign(gameState.enemy, saved.enemy);

      const p = gameState.player;
      const e = gameState.enemy;
      // La mano en curso se reinicia de forma limpia (las cartas no se pueden reconstruir con seguridad)
      p.playerHand = []; p.playerScore = 0; p.bust = false; p.blackjack = false; p.stand = false; p.crimsonApplied = false; p.frozenApplied = false;
      p.betAmount = 0; p.turnShieldBonus = 0; p.turnDoubleDamage = false; p.duplaDef = 0;
      if (e) { e.enemyHand = []; e.enemyScore = 0; e.bust = false; e.blackjack = false; e.stand = false; e.enemyRevealed = false; }

      ["screen-title", "screen-intro", "screen-controls", "screen-config"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add("hidden");
      });
      try { setPlayerSpriteState("idle"); } catch (_) {}
      try { rebuildDrawPile(); } catch (_) {}

      const enemyAlive = e && e.name && e.hp > 0;
      const floorCleared = !enemyAlive && gameState.enemyFloor === gameState.floor;

      addLog(`⚡ ¡Partida reanudada en el Piso ${gameState.floor}!`, "info");
      triggerHaptic("stand");

      if (enemyAlive) {
        // Combate en curso: retomar contra el mismo rival, desde una mano nueva
        renderEnemyIdentity();
        renderCards();
        updateHud();
        showBetScreen();
      } else if (floorCleared) {
        // Rival ya vencido en este piso: mostrar selección de caminos y beneficios (Hoguera / Tienda / Forja)
        updateHud();
        showRewardModal();
      } else {
        // Se guardó al ascender: generar el rival del nuevo piso
        initFloor();
      }
    } catch (err) {
      // Nunca borramos el guardado en silencio: el jugador decide
      console.error("Error reanudando partida:", err);
      const title = document.getElementById("screen-title");
      if (title) title.classList.remove("hidden");
      showGameAlert("No se pudo reanudar la partida guardada.\n\nTu guardado sigue intacto. Puedes intentarlo de nuevo o iniciar una nueva run eligiendo un héroe.", "ERROR AL REANUDAR");
      checkResumeRunButton();
    }
  }
  window.resumeSavedRun = resumeSavedRun;

  /* ============================================================
     INICIO DE PARTIDA (CON SELECCIÓN DE HÉROE)
     ============================================================ */
  function startGame(heroKey = "knight", bypassPendingCheck = false) {
    if (!bypassPendingCheck) {
      let hasPendingReward = false;
      try {
        hasPendingReward = Boolean(localStorage.getItem("bj_pending_tower_victory_reward"));
      } catch (_) {}
      if (hasPendingReward && typeof showGameConfirm === "function") {
        showGameConfirm({
          title: "👑 BOTÍN DE VICTORIA PENDIENTE",
          message: "¡Tienes 1 Sello de Maestría y 3 Naipes Arcanos sin reclamar de tu victoria previa en la Torre! ¿Deseas reclamarlos ahora antes de iniciar una nueva run?",
          onConfirm: () => {
            if (typeof openPendingTowerReward === "function") openPendingTowerReward();
          },
          onCancel: () => {
            startGame(heroKey, true);
          },
          okLabel: "RECLAMAR AHORA",
          cancelLabel: "INICIAR RUN DE TODOS MODOS"
        });
        return;
      }
    }
    const unlocks = getHeroUnlocks();
    if (!unlocks[heroKey] || !unlocks[heroKey].unlocked) {
      selectLockedHero(heroKey);
      return;
    }
    clearMidRunState();
    document.body.classList.remove("sudden-death-active");
    const hero = HERO_DATA[heroKey] || HERO_DATA.knight;

    const meta = getHeroMeta();
    const heroMeta = meta[heroKey] || { totalExp: 0, masteryLevel: 1, level: 1, exp: 0 };
    heroMeta.runs = (heroMeta.runs || 0) + 1;
    saveHeroMeta(meta);

    const heroLevel = heroMeta.level || heroMeta.masteryLevel || 1;
    const masteryBonuses = getMasteryBonuses(heroLevel);

    gameState.diff = (typeof getGameDifficulty === "function") ? getGameDifficulty() : "normal";
    gameState.floor = 1;
    const minigameGold = window.introMinigameGold || 0;
    const frenzyBonus = (window.introFrenzyMultiplier > 1 || window._frenzyTowerBenefit) ? 50 : 0;
    gameState.gold = (masteryBonuses.gold || 0) + minigameGold + frenzyBonus;
    gameState.isRolling = false;
    gameState.killCount = 0;
    gameState.revivesUsed = 0;
    gameState.curseTakenOnFloor = {};
    gameState.wheelMode = "death";
    gameState.status = {
      playerShield: hero.startingShield || 0,
      playerPoison: 0,
      playerBurn: 0,
      enemyShield: 0,
      enemyPoison: 0,
      enemyBurn: 0,
      enemyRevived: false
    };

    const equippedSkin = (typeof getHeroEquippedSkin === "function") ? getHeroEquippedSkin(heroKey) : null;
    const p = gameState.player;
    p.class = hero.class;
    p.name = hero.name;
    p.sprite = (equippedSkin && equippedSkin.sprite) ? equippedSkin.sprite : hero.sprite;
    p.equippedSkinId = equippedSkin ? equippedSkin.id : null;
    p.masteryLevel = heroLevel;
    p.totalPermanentExp = heroMeta.totalExp || 0;
    const legHp = (heroMeta.legacyHp || 0) * 3;
    const legPwr = (heroMeta.legacyPwr || 0) * 1;
    const legDef = (heroMeta.legacyDef || 0) * 1;
    // SPRINT 1: NIVEL PERMANENTE REAL — el héroe arranca con su nivel, EXP y stats acumulados.
    // Las Estadísticas Base ya incluyen el crecimiento de clase + bono de maestría inicial (sembrado en migración).
    p.level = heroLevel;
    p.exp = heroMeta.exp || 0;
    p.nextLevelExp = getExpRequiredForLevel(p.level);
    p.maxHp = ((typeof heroMeta.baseMaxHp === "number" && heroMeta.baseMaxHp > 0) ? heroMeta.baseMaxHp : (hero.maxHp + masteryBonuses.hp)) + legHp;
    p.hp = p.maxHp;
    p.expMultiplier = 1;
    p.bonusKillExp = 0;
    p.pwr = ((typeof heroMeta.basePwr === "number" && heroMeta.basePwr >= 0) ? heroMeta.basePwr : (hero.pwr + masteryBonuses.pwr)) + legPwr;
    p.def = ((typeof heroMeta.baseDef === "number" && heroMeta.baseDef >= 0) ? heroMeta.baseDef : (hero.def + masteryBonuses.def)) + legDef;
    p.potions = 2 + (masteryBonuses.potions || 0);
    p.rerollsAvailable = (masteryBonuses.rerolls || 0);
    p.gem = null;
    p.accessory = null;
    p.curse = null;
    p.blackjackMultiplier = 1;
    p.hasGoldenDie = false;
    p.starterBlessing = null;
    p.phoenixGraceUsed = false;
    p.artifacts = p.artifacts || [];
    
    // FASE 6: Artefactos por victoria (1 a 3 aleatorios al iniciar ascensión si ya se ha ganado)
    try {
      if (localStorage.getItem("blackjack_has_won_run") === "true") {
        let count = Math.floor(Math.random() * 3) + 1;
        let available = [];
        if (typeof ALL_RELICS !== "undefined") available = [...ALL_RELICS];
        else if (typeof SHOP_ARTIFACTS !== "undefined") available = [...SHOP_ARTIFACTS];
        
        if (available.length > 0) {
          shuffleArray(available);
          for (let i = 0; i < count; i++) {
            let art = available.pop();
            if (art) {
              p.artifacts.push({ id: art.id, name: art.name, icon: art.icon });
              if (typeof art.apply === "function") art.apply(p);
            }
          }
          addLog(`🏆 Legado de Victoria: Comienzas con ${count} artefacto(s).`, "magic");
        }
      }
    } catch (_) {}
    p.cardUpgrades = p.cardUpgrades || [];
    p.cardEnchantments = p.cardEnchantments || {};
    // Cargar los sellos permanentes forjados por el jugador
    const persistentSeals = (typeof getPersistentDeckSeals === "function") ? getPersistentDeckSeals() : {};
    Object.assign(p.cardEnchantments, persistentSeals);

    const persistentExtra = (typeof getPersistentExtraCards === "function") ? getPersistentExtraCards() : [];
    const persistentKeys = Object.keys(persistentSeals);
    if (persistentKeys.length > 0 || persistentExtra.length > 0) {
      addLog(`👑 Maestría de Baraja: ${persistentKeys.length} naipes con sello y ${persistentExtra.length} naipes de botín permanentes.`, "critical");
    } else if (masteryBonuses.startingSeal && Object.keys(p.cardEnchantments).length === 0) {
      setTimeout(() => {
        if (typeof showMasteryForgeModal === "function") {
          showMasteryForgeModal();
        }
      }, 1000);
    }
    p.phoenixUsedThisFloor = false;
    p.cardBonusDamage = 0;
    p.astralCardInHand = false;
    p.playerHand = [];
    p.playerScore = 0;
    p.bust = false;
    p.crimsonApplied = false;
    p.frozenApplied = false;
    p.blackjack = false;
    p.stand = false;
    p.turnShieldBonus = 0;
    p.turnDoubleDamage = false;
    p.duplaDef = 0;
    p._runBustCount = 0; // Contador de BUSTs para post-mortem

    // SPRINT 6: estadísticas de la run para el widget de resumen en Game Over
    gameState.runStats = { damageDealt: 0, damageTaken: 0, blackjacks: 0, enemyBlackjacks: 0, bestHand: 0, startedAt: Date.now() };

    // TESORO REAL: Pack del Heredero (+50 oro, +3 pociones; 2x EXP en la primera run)
    if (typeof isRoyalPerkOwned === "function" && isRoyalPerkOwned("starter")) {
      gameState.gold += 50;
      p.potions += 3;
      let firstHeirRun = false;
      try { firstHeirRun = !localStorage.getItem("blackjack_heir_first_used"); } catch (_) {}
      if (firstHeirRun) {
        p.expMultiplier = 2;
        try { localStorage.setItem("blackjack_heir_first_used", "true"); } catch (_) {}
      }
      addLog(`👑 Tesoro Real: Pack del Heredero activo (+50 Oro, +3 Pociones${firstHeirRun ? ", 2x EXP en esta run" : ""}).`, "gold");
    }
    if (typeof isRoyalPerkOwned === "function" && isRoyalPerkOwned("exp_boost")) {
      addLog("📖 Tesoro Real: Tomo del Maestro activo (EXP de Maestría x1.5).", "gold");
    }

    // Sprite y estilo del héroe elegido (inicia en reposo)
    setPlayerSpriteState("idle");

    document.getElementById("screen-title").classList.add("hidden");
    document.getElementById("screen-controls").classList.add("hidden");
    document.getElementById("screen-config").classList.add("hidden");

    if (p.masteryLevel > 1) {
      let perks = [`+${masteryBonuses.gold} Oro`];
      if (masteryBonuses.potions) perks.push(`+${masteryBonuses.potions} Poción`);
      if (masteryBonuses.rerolls) perks.push(`+${masteryBonuses.rerolls} Reroll`);
      if (masteryBonuses.startingSeal) perks.push(`1 Carta Forjada`);
      addLog(`🌟 ${p.name}: NIVEL PERMANENTE ${p.masteryLevel} — EXP ${p.exp}/${p.nextLevelExp} (${perks.join(", ")}).`, "critical");
    }

    if (minigameGold > 0) {
      addLog(`🪙 ¡Comienzas la aventura con +${minigameGold} de Oro obtenido cazando cartas en la intro!`, "gold");
      window.introMinigameGold = 0;
      const goldBanner = document.getElementById("intro-gold-reward-banner");
      if (goldBanner) goldBanner.classList.add("hidden");
    }

    // TUTORIAL DE PRIMERA PARTIDA: Solo en la primera run histórica del jugador
    const tutorialDone = localStorage.getItem("blackjack_tutorial_done_v1");
    if (!tutorialDone) {
      showFirstRunTutorial(() => {
        // FASE 6: Elección del Destino (Medallón de Bendición Inicial en Piso 1)
        if (gameState.floor === 1 && typeof showStarterBlessingModal === "function") {
          showStarterBlessingModal();
        } else {
          initFloor();
        }
      });
    } else {
      // FASE 6: Elección del Destino (Medallón de Bendición Inicial en Piso 1)
      if (gameState.floor === 1 && typeof showStarterBlessingModal === "function") {
        showStarterBlessingModal();
      } else {
        initFloor();
      }
    }
  }

  /* ============================================================
     PASIVAS DE CLASE FUNCIONALES
     ============================================================ */
  function detectClassPassives() {
    // Las habilidades supremas de los Jacks se activan exclusivamente con el 21 en la 1ª mano (Blackjack Natural).
    updateStatusBadges();
  }

  /* ============================================================
     MALDICIÓN: MAZO ASTILLADO (5 HP por As que robes)
     ============================================================ */
  function applyCurseOnDraw(cards) {
    const p = gameState.player;
    if (p.curse !== "cursed_deck") return;
    const aces = cards.filter(c => c.isAce).length;
    if (aces > 0) {
      p.hp = Math.max(0, p.hp - 5 * aces);
      spawnFloatingText("player-sprite", `⚡ -${5 * aces} HP`, "damage");
      addLog(`⚡ Mazo Astillado: ${aces === 1 ? "un As" : aces + " Ases"} = -${5 * aces} HP.`, "damage");
      setPlayerSpriteState("hurt");
      updateHud();
    }
  }

  /* ============================================================
     RENDER CARTAS
     ============================================================ */
  async function animateInitialDeal() {
    const pCards = document.querySelectorAll("#player-cards .card-face");
    const eCards = document.querySelectorAll("#enemy-cards .card-face");
    const all = [...pCards, ...eCards];
    if (all.length === 0) return;

    gameState.isRolling = true;
    setButtonsDisabled(true);
    all.forEach((el, i) => {
      el.style.animationDelay = (i * 0.18) + "s";
      el.classList.add("deal-anim");
      setTimeout(() => {
        try { playCardDealSound(); } catch (_) {}
      }, i * 180);
    });
    await sleep((all.length - 1) * 180 + 450);
    all.forEach(el => {
      el.classList.remove("deal-anim");
      el.style.animationDelay = "";
    });
    gameState.isRolling = false;
    updateCombatState();
  }

  function renderCards() {
    const pHandEl = document.getElementById("player-cards");
    const eHandEl = document.getElementById("enemy-cards");
    const pTotalEl = document.getElementById("player-total");
    const eTotalEl = document.getElementById("enemy-total");
    const eInfoEl = document.getElementById("enemy-info");
    const p = gameState.player;
    const e = gameState.enemy;

    pHandEl.innerHTML = "";
    for (const card of p.playerHand) {
      const el = document.createElement("div");
      const suitClass = card.suit === "♥" ? "suit-red suit-hearts" : (card.suit === "♦" ? "suit-diamonds" : (card.suit === "♣" ? "suit-clubs" : "suit-spades"));
      el.className = `card-face player-card interactive-card ${suitClass}`;
      if (p.bust) el.classList.add("bust");
      if (p.blackjack) el.classList.add("blackjack");
      const isLoot = !!card.isWonCard;
      const lootBadge = isLoot ? '<span class="card-loot-badge" title="Naipe de Botín de Torre">⭐</span>' : '';
      if (isLoot) el.classList.add("won-loot-card");
      if (card.dynamicValues || card.rarity === 'legendary') el.classList.add("card-holographic", "card-holographic-legendary");
      else if (card.rarity === 'epic' || card.rarity === 'rare' || card.specialId) el.classList.add("card-holographic");
      if (card.cardType === "ability" || card.abilityAction || card.fusion) {
        el.classList.add("card-has-ability");
      }
      if (card.cardType === "seal" || card.sealEffect || card.enchantment) {
        const sTheme = card.sealTheme || (card.enchantment ? (card.enchantment.element || "gold") : "gold");
        el.classList.add("card-has-seal", `seal-${sTheme}`);
      }
      if (card.enchantment) {
        const elType = card.enchantment.element || card.enchantment.type || "arcane";
        el.classList.add("enchanted", `seal-${card.enchantment.type || card.enchantment.id}`, `element-${elType}`);
        el.innerHTML = `
          ${lootBadge}
          <span class="card-seal-icon">${card.enchantment.icon}</span>
          <span class="card-value">${card.rank}</span>
          <span class="suit" style="font-size:14px;opacity:0.85;">${card.suit}</span>
          <span class="card-label">${card.value}</span>
        `;
      } else {
        el.innerHTML = `
          ${lootBadge}
          <span class="card-value">${card.rank}</span>
          <span class="suit" style="font-size:14px;opacity:0.85;">${card.suit}</span>
          <span class="card-label">${card.value}</span>
        `;
      }
      el.onclick = () => {
        showCardDetailModal({
          rank: card.rank,
          suit: card.suit,
          value: card.value,
          seal: card.enchantment || null
        });
      };
      pHandEl.appendChild(el);
    }

    eHandEl.innerHTML = "";
    const showAll = (e.enemyRevealed || gameState.showEnemyCards || e.stand);
    const isStealth = (e.trait === "stealth" && !e.stand && !e.enemyRevealed && !gameState.showEnemyCards);
    const fogged = (p.curse === "heavy_fog" && !e.stand && !e.enemyRevealed && !gameState.showEnemyCards) || isStealth;

    for (let i = 0; i < e.enemyHand.length; i++) {
      const card = e.enemyHand[i];
      const el = document.createElement("div");
      const suitClass = card.suit === "♥" ? "suit-red suit-hearts" : (card.suit === "♦" ? "suit-diamonds" : (card.suit === "♣" ? "suit-clubs" : "suit-spades"));
      el.className = `card-face enemy-card ${suitClass}`;
      if (e.bust) el.classList.add("bust");
      if (e.blackjack) el.classList.add("blackjack");
      if (card.dynamicValues || card.rarity === 'legendary') el.classList.add("card-holographic", "card-holographic-legendary");
      else if (card.rarity === 'epic' || card.rarity === 'rare' || card.specialId) el.classList.add("card-holographic");

      if ((i === 0 && !showAll && !e.stand) || fogged) {
        el.className = "card-face cover";
        el.innerHTML = `<span>?</span>`;
      } else {
        el.innerHTML = `<span class="card-value">${card.rank}</span><span class="suit" style="font-size:14px;opacity:0.8;">${card.suit}</span><span class="card-label">${card.value}</span>`;
      }
      eHandEl.appendChild(el);
    }

    pTotalEl.innerText = p.bust ? `BUST (${p.playerScore})` : (p.blackjack ? `BLACKJACK!!! (${p.playerScore})` : String(p.playerScore));
    pTotalEl.className = "hand-total" + (p.bust ? " bust" : "") + (p.blackjack ? " blackjack" : "");

    if (e.stand || e.enemyRevealed || gameState.showEnemyCards) {
      eTotalEl.innerText = e.bust ? `BUST (${e.enemyScore})` : (e.blackjack ? `BLACKJACK!!! (${e.enemyScore})` : String(e.enemyScore));
      eTotalEl.className = "hand-total" + (e.bust ? " bust" : "") + (e.blackjack ? " blackjack" : "");
      eInfoEl.innerText = "■ Cartas visibles";
      eInfoEl.className = "enemy-card-info revealed";
    } else {
      eTotalEl.innerText = "SUMA: ?";
      eTotalEl.className = "hand-total";
      eInfoEl.innerText = isStealth ? "■ Sigilo (Ocultas)" : "■ Cartas ocultas";
      eInfoEl.className = "enemy-card-info";
    }

    document.getElementById("ui-dupla").innerText = p.duplaDef > 0 ? `SÍ (+${p.duplaDef} DEF)` : "NO";
    updateStatusBadges();
    if (typeof updateTacticalDamagePredictor === "function") updateTacticalDamagePredictor();
  }

  /* ============================================================
     UPDATE COMBAT STATE
     ============================================================ */
  function updateCombatState() {
    const hitBtn = document.getElementById("btn-hit");
    const standBtn = document.getElementById("btn-stand");
    const rerollBtn = document.getElementById("btn-reroll");
    const potionBtn = document.getElementById("btn-potion");
    const p = gameState.player;

    if (gameState.isRolling) {
      hitBtn.disabled = true;
      standBtn.disabled = true;
      rerollBtn.disabled = true;
      potionBtn.disabled = true;
      return;
    }

    if (p.bust) {
      hitBtn.disabled = true;
      standBtn.disabled = true;
      rerollBtn.disabled = (p.rerollsAvailable <= 0);
      potionBtn.disabled = (p.potions <= 0);
      rerollBtn.innerText = `🔄 REROLL (${p.rerollsAvailable})`;
      return;
    }

    hitBtn.disabled = false;
    standBtn.disabled = false;
    rerollBtn.disabled = (p.rerollsAvailable <= 0);
    potionBtn.disabled = (p.potions <= 0);

    if (p.blackjack && p.playerHand.length === 2) {
      hitBtn.disabled = true;
    }

    rerollBtn.innerText = `🔄 REROLL (${p.rerollsAvailable})`;
  }

  /* ============================================================
     PLAYER ACTION
     ============================================================ */
  async function playerAction(action) {
    if (gameState.isRolling) return;
    const p = gameState.player;
    const e = gameState.enemy;

    if (action === "potion") {
      if (p.potions > 0 && p.hp < p.maxHp) {
        triggerHaptic("potion");
        try { playPotionDrinkSound(); } catch (_) {}
        p.potions--;
        const healed = Math.min(30, p.maxHp - p.hp);
        p.hp += healed;
        spawnFloatingText("player-sprite", `+${healed} HP`, "heal");
        addLog(`+${healed} HP (${p.hp}/${p.maxHp})`, "heal");
        updateHud();
      } else {
        triggerHaptic("button_click");
        addLog("No tienes pociones o tu vida está llena.", "warning");
      }
      return;
    }

    if (action === "reroll") {
      if (p.rerollsAvailable > 0 && !p.bust) {
        triggerHaptic("button_click");
        try { playRerollActionSound(); } catch (_) {}
        p.rerollsAvailable--;

        gameState.isRolling = true;
        setButtonsDisabled(true);
        const pCardEl = document.getElementById("player-cards");
        pCardEl.classList.add("rolling");
        await sleep(500);
        pCardEl.classList.remove("rolling");

        p.playerHand = [drawCard(), drawCard()];
        p.playerScore = calculateHandScore(p.playerHand);
        p.bust = p.playerScore > BUST_LIMIT;
        p.blackjack = (p.playerScore === 21 && p.playerHand.length === 2);

        p.duplaDef = 0;
        if (p.playerHand.length === 2 && p.playerHand[0].rank === p.playerHand[1].rank) {
          p.duplaDef = 2;
          spawnFloatingText("player-sprite", "DUPLA +2 DEF", "shield");
          addLog("¡DUPLA! +2 DEF esta mano.", "info");
        }

        detectClassPassives();
        applyCurseOnDraw(p.playerHand);

        renderCards();
        updateHud();
        gameState.isRolling = false;
        setButtonsDisabled(false);

        if (p.hp <= 0) {
          addLog("💀 ¡HP agotado! Muerte súbita...", "damage");
          await sleep(400);
          showFateWheel("death");
          return;
        }

        updateCombatState();

        if (p.blackjack) {
          try { playBlackjackFanfareSound(); } catch (_) {}
          await resolveHandResult(true);
        } else if (p.bust) {
          try { playBustSound(); } catch (_) {}
          await resolveHandResult(false);
        }
        return;
      } else if (p.rerollsAvailable > 0 && p.bust) {
        triggerHaptic("button_click");
        addLog("No puedes reroll con mano bust — espera el desenlace.", "warning");
        return;
      } else {
        triggerHaptic("button_click");
        addLog("No tienes Rerolls disponibles.", "warning");
        return;
      }
    }

    if (action === "hit") {
      if (p.bust) {
        triggerHaptic("button_click");
        addLog("No puedes pedir carta — ya te pasaste de 21.", "warning");
        return;
      }

      triggerHaptic("card_draw");
      try { playHitActionSound(); } catch (_) {}
      gameState.isRolling = true;
      setButtonsDisabled(true);
      const pCardEl = document.getElementById("player-cards");
      pCardEl.classList.add("rolling");
      await sleep(300);
      pCardEl.classList.remove("rolling");

      // Debilidad con suerte: Sesgo de robo cuando HP <= 30%
      let clutchTarget = null;
      const isCriticalHp = p.hp > 0 && p.hp <= Math.ceil(p.maxHp * 0.30);
      const scoreDiff = 21 - p.playerScore;
      if (isCriticalHp && scoreDiff >= 1 && scoreDiff <= 10 && Math.random() < 0.30) {
        clutchTarget = scoreDiff;
      }

      const newCard = drawCard(clutchTarget);
      if (clutchTarget !== null && (newCard.value === clutchTarget || (newCard.isAce && (clutchTarget === 1 || clutchTarget === 11)))) {
        addLog("🍀 ¡La Fortuna de la Torre favorece al Jack en su hora más oscura!", "heal");
        spawnFloatingText("player-sprite", "🍀 ¡SUERTE DEL DESESPERADO!", "heal");
      }
      playCardSound();
      p.playerHand.push(newCard);
      applyDrawnCardUpgrades([newCard]);

      p.playerScore = calculateHandScore(p.playerHand);
      // Salvación de Sello Fénix individual (Sello Arcano) o Bendición de Fénix
      const phoenixCard = p.playerHand.find(c => c.enchantment && (c.enchantment.id === "phoenix" || c.enchantment.type === "phoenix") && c.value > 1);
      if (p.playerScore > BUST_LIMIT && phoenixCard) {
        phoenixCard.value = 1;
        p.playerScore = calculateHandScore(p.playerHand);
        spawnFloatingText("player-sprite", "🔥 ¡FÉNIX SALVADOR!", "crit");
        addLog(`🔥 ¡El Sello Fénix de [${phoenixCard.rank}${phoenixCard.suit}] te salvó del BUST transmutando su valor a 1!`, "critical");
        playVictorySound();
      } else if (p.playerScore > BUST_LIMIT && hasCardUpgrade("phoenix_card") && !p.phoenixUsedThisFloor) {
        p.phoenixUsedThisFloor = true;
        newCard.value = 1;
        p.playerScore = calculateHandScore(p.playerHand);
        spawnFloatingText("player-sprite", "🔥 ¡FÉNIX SALVADOR!", "crit");
        addLog("🔥 ¡Bendición del Fénix! La carta transmuta a As (1) y te salva de pasarte (BUST).", "critical");
        playVictorySound();
      }
      p.bust = p.playerScore > BUST_LIMIT;
      p.blackjack = (p.playerScore === 21 && p.playerHand.length === 2);

      if (p.blackjack) {
        setPlayerSpriteState("blackjack");
        spawnFloatingText("player-sprite", "¡BLACKJACK 21!", "crit");
      } else if (p.bust) {
        setPlayerSpriteState("bust");
        spawnFloatingText("player-sprite", "¡BUST! > 21", "damage-weak");
      }

      if (p.playerHand.length >= 2 && p.playerHand[0].rank === p.playerHand[1].rank) {
        if (p.duplaDef === 0) {
          p.duplaDef = 2;
          spawnFloatingText("player-sprite", "DUPLA +2 DEF", "shield");
          addLog("¡DUPLA detectada! +2 DEF esta mano.", "info");
        }
      }

      detectClassPassives();
      applyCurseOnDraw([newCard]);

      renderCards();
      updateHud();

      const newCardEl = document.getElementById("player-cards").lastElementChild;
      if (newCardEl) {
        newCardEl.classList.add("deal-anim");
        await sleep(350);
        newCardEl.classList.remove("deal-anim");
      }

      if (p.hp <= 0) {
        gameState.isRolling = false;
        setButtonsDisabled(true);
        addLog("💀 ¡HP agotado! Muerte súbita...", "damage");
        await sleep(400);
        showFateWheel("death");
        return;
      }

      if (p.blackjack && p.playerHand.length === 2) {
        gameState.isRolling = true;
        setButtonsDisabled(true);
        try { playBlackjackFanfareSound(); } catch (_) {}
        addLog("❤️‍🔥 ¡BLACKJACK NATURAL! 21 puntos.", "critical");
        await sleep(800);
        await resolveHandResult(true);
      } else if (p.bust) {
        gameState.isRolling = true;
        setButtonsDisabled(true);
        triggerHaptic("bust");
        triggerScreenShake("light");
        try { playBustSound(); } catch (_) {}
        p._runBustCount = (p._runBustCount || 0) + 1; // Tracking para post-mortem
        addLog("💥 ¡BUST! Te pasaste de 21.", "damage");
        await sleep(900);
        await resolveHandResult(false);
      } else {
        gameState.isRolling = false;
        updateCombatState();
      }
      return;
    }

    if (action === "stand") {
      triggerHaptic("stand");
      try { playStandActionSound(); } catch (_) {}
      if (p.bust) {
        addLog("No puedes plantarte — ya te pasaste de 21.", "warning");
        return;
      }

      // Monje: Concentración (+1 punto si tiene 18 o 19)
      if (p.class === "monk" && (p.playerScore === 18 || p.playerScore === 19)) {
        p.playerScore += 1;
        spawnFloatingText("player-sprite", "+1 CONCENTRACIÓN", "heal");
        addLog(`¡Monje: Tu concentración mental ajusta tu puntuación a ${p.playerScore}!`, "heal");
      }

      p.stand = true;
      gameState.isRolling = true;
      setButtonsDisabled(true);

      const pCardEl = document.getElementById("player-cards");
      pCardEl.classList.add("rolling");
      await sleep(300);
      pCardEl.classList.remove("rolling");

      await enemyPlayAuto(e);

      gameState.isRolling = false;
      const playerScoreValid = !p.bust && p.playerScore <= BUST_LIMIT;
      const enemyScoreValid = !e.bust && e.enemyScore <= BUST_LIMIT;

      let outcome = "lose";
      if (!playerScoreValid && !enemyScoreValid) {
        outcome = "lose"; // Ambos BUST: la casa gana
        addLog(`💥 ¡Ambos se pasaron de 21! La torre gana la mano.`, "damage");
      } else if (!playerScoreValid) {
        outcome = "lose";
        addLog(`💥 ¡BUST! Te pasaste de 21 (${p.playerScore}). Pierdes la mano.`, "damage");
      } else if (!enemyScoreValid) {
        outcome = "win";
        addLog(`💥 ¡${e.name} se pasó de 21 (${e.enemyScore})! Ganas la mano.`, "heal");
      } else if (p.blackjack && !e.blackjack) {
        outcome = "win";
        addLog(`❤️‍🔥 ¡BLACKJACK NATURAL! Superas a ${e.name}.`, "critical");
      } else if (!p.blackjack && e.blackjack) {
        outcome = "lose";
        addLog(`💀 ¡${e.name} tiene Blackjack Natural!`, "damage");
      } else if (p.playerScore > e.enemyScore) {
        outcome = "win";
        addLog(`⚔️ Ganaste la mano: ${p.playerScore} vs ${e.enemyScore}.`, "heal");
      } else if (e.enemyScore > p.playerScore) {
        outcome = "lose";
        addLog(`👹 Perdiste la mano: ${p.playerScore} vs ${e.enemyScore}.`, "damage");
      } else {
        outcome = "push";
        addLog(`🤝 ¡EMPATE (PUSH)! Puntuaciones iguales (${p.playerScore} vs ${e.enemyScore}). Nadie sufre daño directo.`, "info");
      }

      // Pausa para que el jugador compare ambas manos y puntuaciones antes de los golpes
      await sleep(900);
      await resolveHandResult(outcome);
      return;
    }

    addLog("Acción no reconocida.", "warning");
  }

  /* ============================================================
     ENEMY AUTO-PLAY CON RASGOS DE IA
     ============================================================ */
  async function enemyPlayAuto(e) {
    const p = gameState.player;
    let attempts = 0;
    const maxAttempts = 15;
    const standThreshold = (e.trait === "disciplined" ? 18 : 17);

    while (!e.bust && e.enemyScore < standThreshold && !e.stand && attempts < maxAttempts && p.hp > 0) {
      e.enemyHand.push(drawCard());
      playCardSound();
      e.enemyScore = calculateHandScore(e.enemyHand);
      e.bust = e.enemyScore > BUST_LIMIT;
      e.blackjack = (e.enemyScore === 21 && e.enemyHand.length === 2);
      renderCards();
      await sleep(550); // Pacing pausado y legible al robar cartas
      attempts++;
    }

    e.stand = true;

    if (e.bust) {
      addLog(`💥 El rival se pasó de 21 (BUST, ${e.enemyScore})`, "damage");
    } else if (e.blackjack) {
      addLog(`❤️‍🔥 ¡El rival sacó BLACKJACK! (${e.enemyScore})`, "critical");
    } else {
      addLog(`✋ El rival se plantó con ${e.enemyScore} puntos.`, "info");
    }

    renderCards();
  }

  /* ============================================================
     PLAYER ATTACK — mediante apuesta de vida (7 manos)
     ============================================================ */
  /* ============================================================
     ENEMIGO DERROTADO
     ============================================================ */
  async function enemyDefeated() {
    try {
      stopSuddenDeathTension();
      stopCombatMusic();
    } catch (_) {}
    const p = gameState.player;
    const e = gameState.enemy;
    const sprite = document.getElementById("enemy-sprite");
    const flash = document.getElementById("damage-flash");

    sprite.classList.add("flash-kill");
    flash.className = "green";
    setTimeout(() => { flash.className = ""; }, 350);

    addLog(`¡${e.name} ha sido derrotado!`, "kill");
    playVictorySound();
    await sleep(800);
    sprite.classList.remove("flash-kill");

    if (p.accessory === "blood_amulet") {
      p.hp = Math.min(p.maxHp, p.hp + 6);
      addLog(`Amuleto de Sangre: +6 HP (${p.hp}/${p.maxHp})`, "heal");
    }

    if (p.playerHand && p.playerHand.some(c => (c.specialId || c.id) === "club_jack_thief")) {
      const curCoins = (typeof getPlayerCryptCoins === "function") ? getPlayerCryptCoins() : 0;
      localStorage.setItem("bj_crypt_coins", String(curCoins + 15));
      spawnFloatingText("player-sprite", "+15 CRIPTAS FORTUNA", "gold");
      addLog("🪙 Jota de Tréboles de Fortuna: +15 Monedas de Cripta adicionales al derrotar al rival.", "gold");
    }

    // EXP por eliminar al rival (potenciable por artefactos)
    let baseKillExp = 55 + gameState.floor * 15;
    if (p.bonusKillExp) baseKillExp += p.bonusKillExp;
    const mult = p.expMultiplier || 1;
    const finalKillExp = Math.round(baseKillExp * mult);
    const boostNote = mult > 1 ? ` (x${mult.toFixed(2)} por Artefactos)` : "";
    addLog(`🎓 ¡Eliminaste a ${e.name}! Ganaste +${finalKillExp} EXP${boostNote}.`, "critical");
    await gainExp(finalKillExp);

    // Victoria directa en piso cumbre al vencer al rival final (según torre elegida)
    const maxFloors = (typeof getMaxFloorsForDifficulty === "function") ? getMaxFloorsForDifficulty() : 13;
    if (gameState.floor >= maxFloors) {
      showVictory();
      return;
    }

    // Cada 5 rivales eliminados → Rueda del Destino (buff/nerf permanente)
    gameState.killCount++;
    updateHud();
    if (gameState.killCount % 5 === 0) {
      showFateWheel("milestone");
    } else {
      await finishFloor(true);
    }
  }

  /* ============================================================
     FLOOR TRANSITION & ZONAS NARRATIVAS DE LA TORRE
     ============================================================ */
  function getFloorZoneInfo(floorNum, maxFloors) {
    maxFloors = maxFloors || (typeof getMaxFloorsForDifficulty === "function" ? getMaxFloorsForDifficulty() : 13);
    if (floorNum >= maxFloors) {
      return {
        zone: 6,
        icon: "🐉",
        title: "LA CÚSPIDE: EL DRAGÓN ANCESTRAL Y BLACK",
        name: "El Dragón Ancestral y BLACK te esperan",
        flavor: "El trono del Jack Supremo donde el fuego negro y el Mazo Primigenio deciden tu destino."
      };
    }
    const ratio = (floorNum - 1) / Math.max(1, maxFloors - 1);
    if (ratio >= 0.8) {
      return {
        zone: 5,
        icon: "🏰",
        title: "BARRANCO CELESTIAL: LOS GUARDIANES DE LA CIMA",
        name: "Los guardianes de la cima",
        flavor: "Vientos gélidos y abismos de vértigo custodiados por centinelas arcanos."
      };
    }
    if (ratio >= 0.6) {
      return {
        zone: 4,
        icon: "👑",
        title: "SALONES DORADOS: LA NOBLEZA CORRUPTA",
        name: "Los nobles de la torre",
        flavor: "Tapices carmesí, oro manchado y copas envenenadas de la corte usurpadora."
      };
    }
    if (ratio >= 0.4) {
      return {
        zone: 3,
        icon: "⚔️",
        title: "CUARTELES DE HIERRO: LOS MERCENARIOS",
        name: "Los mercenarios de la torre",
        flavor: "Bóvedas de acero, falanges veteranas y tambores de guerra despiadados."
      };
    }
    if (ratio >= 0.2) {
      return {
        zone: 2,
        icon: "🗡️",
        title: "CATACUMBAS PROFUNDAS: LOS CRIMINALES",
        name: "Los criminales de la torre",
        flavor: "Pasadizos fúnebres de piedra negra donde las sombras acechan cada paso."
      };
    }
    return {
      zone: 1,
      icon: "👺",
      title: "CALABOZOS DEL FANGO: LOS DELINCUENTES",
      name: "Los delincuentes de la torre",
      flavor: "Celdas húmedas, fango hediondo y los primeros rebeldes caídos en desgracia."
    };
  }
  window.getFloorZoneInfo = getFloorZoneInfo;

  function updateBattleZoneAtmosphere(floorNum) {
    const stage = document.getElementById("stage");
    if (!stage) return;
    const f = floorNum || (typeof gameState !== "undefined" && gameState.floor) || 1;
    const maxFloors = (typeof getMaxFloorsForDifficulty === "function") ? getMaxFloorsForDifficulty() : 13;
    const zoneInfo = getFloorZoneInfo(f, maxFloors);
    
    for (let z = 1; z <= 6; z++) {
      stage.classList.remove("stage-zone-" + z);
    }
    stage.classList.add("stage-zone-" + zoneInfo.zone);
    stage.setAttribute("data-zone-name", zoneInfo.title);
  }
  window.updateBattleZoneAtmosphere = updateBattleZoneAtmosphere;

  function showFloorTransition(callback) {
    try { playFloorAscentSound(); } catch (_) {}
    const ft = document.getElementById("screen-floor-transition");
    const icon = document.getElementById("ft-icon");
    const title = document.getElementById("ft-title");
    const sub = document.getElementById("ft-sub");
    const flavor = document.getElementById("ft-flavor");

    const floorNum = gameState.floor;
    const maxFloors = getMaxFloorsForDifficulty();
    const zoneInfo = getFloorZoneInfo(floorNum, maxFloors);

    if (icon) icon.innerText = zoneInfo.icon;
    if (title) title.innerText = `PISO ${floorNum} / ${maxFloors}`;
    if (sub) sub.innerText = zoneInfo.name;
    if (flavor) flavor.innerText = zoneInfo.flavor || `Ascendiendo peldaños de piedra al Piso ${floorNum}...`;
    if (ft) {
      ft.classList.remove("hidden");
      ft.classList.add("active");
    }
    setTimeout(() => {
      if (ft) {
        ft.classList.remove("active");
        ft.classList.add("hidden");
      }
      if (callback) callback();
    }, 1500);
  }

  /* ============================================================
     FIN DE PISO — oro + recompensa + tienda
     ============================================================ */
  async function finishFloor(killed) {
    const p = gameState.player;
    let gold = 15 + gameState.floor * 2 + (killed ? 10 : 0);
    if (hasArtifact("golden_purse")) {
      gold = Math.round(gold * 1.20);
      addLog("💰 Bolsa del Avaro: +20% oro adicional obtenido.", "heal");
    }
    if (hasStarterBlessing("copper_pouch") && killed) {
      gold += 2;
      addLog("🪙 Bolsita de Cobre: +2 Oro adicional por rival derrotado.", "gold");
    }
    if (hasArtifact("philosophers_stone") && gameState.gold > 0) {
      const interest = Math.floor(gameState.gold * 0.20);
      gold += interest;
      addLog("💎 Piedra Filosofal: +20% interés alquímico (+" + interest + " Oro).", "gold");
    }
    if (p && hasStarterBlessing("dragon_heart")) {
      p.hp = Math.min(p.maxHp, p.hp + 12);
      addLog("🐉 Corazón de Dragón: +12 HP restaurados al ascender de piso.", "heal");
    }
    gameState.gold += gold;
    addLog(`Piso superado: +${gold} oro${killed ? " (rival derrotado: +10 extra)" : ""}.`, "heal");
    updateHud();
    showRewardModal();
  }

  /* ============================================================
     CATÁLOGO DE RELIQUIAS: BUFFS Y NERFS ALEATORIOS
     ============================================================ */
  const ALL_RELICS = [
    // --- BUFFS (Bendiciones / Reliquias Sagradas) ---
    {
      id: "ruby",
      name: "Rubí Ígneo",
      icon: "💎",
      type: "buff",
      badge: "🟢 BENDICIÓN",
      desc: "+2 de daño en tiradas impares (cuando el valor de tu mano es impar).",
      apply: (p) => {
        p.gem = "ruby";
        addLog("Obtuviste Rubí Ígneo: +2 de daño en manos impares.", "heal");
      }
    },
    {
      id: "sapphire",
      name: "Zafiro Guardián",
      icon: "🛡️",
      type: "buff",
      badge: "🟢 BENDICIÓN",
      desc: "Comienza cada piso con +5 de Escudo protector adicional.",
      apply: (p) => {
        p.gem = "sapphire";
        if (!gameState.status) gameState.status = { playerShield: 0 };
        gameState.status.playerShield = (gameState.status.playerShield || 0) + 5;
        addLog("Obtuviste Zafiro Guardián: +5 de escudo inicial por piso.", "heal");
      }
    },
    {
      id: "emerald",
      name: "Esmeralda del Destino",
      icon: "🌿",
      type: "buff",
      badge: "🟢 BENDICIÓN",
      desc: "+1 PWR permanente (Poder de ataque aumentado para siempre).",
      apply: (p) => {
        p.pwr += 1;
        p.gem = "emerald";
        addLog(`Obtuviste Esmeralda del Destino: PWR +1 (Ataque total: ${p.pwr}).`, "heal");
      }
    },
    {
      id: "topaz",
      name: "Topacio de Asalto",
      icon: "💛",
      type: "buff",
      badge: "🟢 BENDICIÓN",
      desc: "+1 de daño fijo en cada mano que ganes.",
      apply: (p) => {
        p.gem = "topaz";
        addLog("Obtuviste Topacio de Asalto: +1 daño plano en manos ganadas.", "heal");
      }
    },
    {
      id: "steel_helm",
      name: "Casco de Acero Templado",
      icon: "⛑️",
      type: "buff",
      badge: "🟢 BENDICIÓN",
      desc: "+1 DEF permanente (Mayor absorción de daño en tu armadura).",
      apply: (p) => {
        p.def += 1;
        p.accessory = "steel_helm";
        addLog(`Obtuviste Casco de Acero: DEF +1 (Defensa total: ${p.def}).`, "heal");
      }
    },
    {
      id: "spiked_belt",
      name: "Cinturón con Púas",
      icon: "👖",
      type: "buff",
      badge: "🟢 BENDICIÓN",
      desc: "Espinas pasivas: Devuelve 2 de daño al rival cuando recibas un golpe.",
      apply: (p) => {
        p.accessory = "spiked_belt";
        addLog("Obtuviste Cinturón con Púas: devuelves 2 de daño al ser golpeado.", "heal");
      }
    },
    {
      id: "lead_gauntlet",
      name: "Guante de Plomo",
      icon: "🥊",
      type: "buff",
      badge: "🟢 BENDICIÓN",
      desc: "Cartas mínimas elevadas: Tus cartas de valor 2 cuentan como mínimo 3.",
      apply: (p) => {
        p.accessory = "lead_gauntlet";
        addLog("Obtuviste Guante de Plomo: tus cartas mínimas ahora valen 3.", "heal");
      }
    },
    {
      id: "blood_chalice",
      name: "Cáliz de Vitalidad",
      icon: "🍷",
      type: "buff",
      badge: "🟢 BENDICIÓN",
      desc: "+12 HP Máximo y te restaura +20 HP de vida inmediatamente.",
      apply: (p) => {
        p.maxHp += 12;
        p.hp = Math.min(p.maxHp, p.hp + 20);
        addLog(`Obtuviste Cáliz de Vitalidad: +12 HP Máx y +20 HP curados (${p.hp}/${p.maxHp} HP).`, "heal");
      }
    },
    {
      id: "lucky_coin",
      name: "Moneda de la Fortuna",
      icon: "🪙",
      type: "buff",
      badge: "🟢 BENDICIÓN",
      desc: "Ganas +35 de Oro de inmediato y +1 carga de Reroll.",
      apply: (p) => {
        gameState.gold += 35;
        p.rerollsAvailable += 1;
        addLog(`Obtuviste Moneda de la Fortuna: +35 Oro y +1 Reroll.`, "heal");
      }
    },
    {
      id: "blackjack_heritage",
      name: "Joya Heredada del 21",
      icon: "👑",
      type: "buff",
      badge: "🟢 BENDICIÓN",
      desc: "Al lograr Blackjack (21): Daño x4 (en vez de x3) y curas +16 HP.",
      apply: (p) => {
        p.gem = "blackjack_heritage";
        addLog("Obtuviste Joya Heredada: Blackjack ahora causa daño x4 y sana +16 HP.", "heal");
      }
    },
    {
      id: "alchemist_flask",
      name: "Frasco del Alquimista",
      icon: "🧪",
      type: "buff",
      badge: "🟢 BENDICIÓN",
      desc: "Recibes +2 Pociones curativas de inmediato para tu inventario.",
      apply: (p) => {
        p.potions += 2;
        addLog("Obtuviste Frasco del Alquimista: +2 pociones curativas.", "heal");
      }
    },
    {
      id: "scholar_tome",
      name: "Tomo del Gran Sabio",
      icon: "📖",
      type: "buff",
      badge: "🟢 BENDICIÓN",
      desc: "Sabiduría arcana: +60% de EXP adicional cada vez que elimines a un rival.",
      apply: (p) => {
        p.expMultiplier = (p.expMultiplier || 1) + 0.60;
        addLog("Obtuviste Tomo del Gran Sabio: +60% de EXP por cada rival eliminado.", "heal");
      }
    },
    {
      id: "knowledge_talisman",
      name: "Talismán del Conocimiento",
      icon: "🧿",
      type: "buff",
      badge: "🟢 BENDICIÓN",
      desc: "Mente despierta: +35 de EXP fija extra cada vez que elimines a un rival.",
      apply: (p) => {
        p.bonusKillExp = (p.bonusKillExp || 0) + 35;
        addLog("Obtuviste Talismán del Conocimiento: +35 EXP adicional fija por baja.", "heal");
      }
    },

    // --- NERFS / PACTOS MALDITOS (Desventajas / Riesgo-Recompensa con Nerf) ---
    {
      id: "pact_blood",
      name: "Pacto de Sangre",
      icon: "🩸",
      type: "nerf",
      badge: "🔴 MALDICIÓN / PACTO",
      desc: "Ganas +3 PWR de ataque masivo, pero pierdes -15 HP de vida máxima y sufres 10 daño.",
      apply: (p) => {
        p.pwr += 3;
        p.maxHp = Math.max(25, p.maxHp - 15);
        p.hp = Math.max(1, Math.min(p.hp - 10, p.maxHp));
        addLog(`Pacto de Sangre firmado: +3 PWR pero pierdes -15 HP Máx y sufres 10 daño (${p.hp}/${p.maxHp} HP).`, "damage");
      }
    },
    {
      id: "heavy_chains",
      name: "Grilletes de Plomo",
      icon: "⛓️",
      type: "nerf",
      badge: "🔴 NERF PURO",
      desc: "Maldición pesada: -1 DEF permanente y pierdes 15 de Oro.",
      apply: (p) => {
        p.def = Math.max(0, p.def - 1);
        gameState.gold = Math.max(0, gameState.gold - 15);
        addLog(`Grilletes de Plomo: -1 DEF (Defensa actual: ${p.def}) y pierdes 15 de Oro.`, "damage");
      }
    },
    {
      id: "cursed_deck",
      name: "Mazo Astillado",
      icon: "🎴",
      type: "nerf",
      badge: "🔴 MALDICIÓN",
      desc: "Cada As que robes del mazo te hiere infligiéndote 5 de daño residual.",
      apply: (p) => {
        p.curse = "cursed_deck";
        addLog("Mazo Astillado activo: Robar un As te costará 5 de vida.", "damage");
      }
    },
    {
      id: "glass_dagger",
      name: "Daga de Cristal Quebradizo",
      icon: "🗡️",
      type: "nerf",
      badge: "🔴 MALDICIÓN / PACTO",
      desc: "Ganas +4 PWR de impacto letal, pero tu armadura se quiebra: -2 DEF permanente.",
      apply: (p) => {
        p.pwr += 4;
        p.def = Math.max(0, p.def - 2);
        addLog(`Daga de Cristal: +4 PWR pero sufres -2 DEF permanente (DEF: ${p.def}).`, "damage");
      }
    },
    {
      id: "greed_skull",
      name: "Cráneo de la Codicia",
      icon: "💀",
      type: "nerf",
      badge: "🔴 MALDICIÓN / PACTO",
      desc: "Ganas +50 de Oro inmediato, pero la codicia te debilita: -1 DEF permanente.",
      apply: (p) => {
        gameState.gold += 50;
        p.def = Math.max(0, p.def - 1);
        addLog(`Cráneo de la Codicia: +50 Oro pero sufres -1 DEF (DEF actual: ${p.def}).`, "damage");
      }
    },
    {
      id: "heavy_fog",
      name: "Ojo de la Niebla",
      icon: "👁️",
      type: "nerf",
      badge: "🔴 MALDICIÓN",
      desc: "Recuperas +20 HP de vida, pero las cartas de los rivales se jugarán 100% ocultas.",
      apply: (p) => {
        p.hp = Math.min(p.maxHp, p.hp + 20);
        p.curse = "heavy_fog";
        addLog(`Ojo de la Niebla: +20 HP curados pero las cartas enemigas estarán ocultas.`, "damage");
      }
    },
    {
      id: "crushing_gravity",
      name: "Gravedad Aplastante",
      icon: "🗿",
      type: "nerf",
      badge: "🔴 NERF PURO",
      desc: "Una fuerza aplastante reduce tu DEF permanente en -2 puntos.",
      apply: (p) => {
        p.def = Math.max(0, p.def - 2);
        p.curse = "crushing_gravity";
        addLog(`Gravedad Aplastante: -2 DEF permanente (DEF actual: ${p.def}).`, "damage");
      }
    },
    {
      id: "vampire_tax",
      name: "Tributo Sanguíneo",
      icon: "🧛",
      type: "nerf",
      badge: "🔴 MALDICIÓN / PACTO",
      desc: "Sufres -15 HP de daño directo inmediato, a cambio de ganar +1 Poción y +25 Oro.",
      apply: (p) => {
        p.hp = Math.max(1, p.hp - 15);
        p.potions += 1;
        gameState.gold += 25;
        addLog(`Tributo Sanguíneo: -15 HP sufridos a cambio de +1 Poción y +25 Oro.`, "damage");
      }
    },
    {
      id: "scholar_pact",
      name: "Pacto del Erudito",
      icon: "📜",
      type: "nerf",
      badge: "🔴 MALDICIÓN / PACTO",
      desc: "Ganas el doble de EXP (+100% adicional) por cada rival eliminado, pero tu fragilidad mental reduce tu HP Máximo en -10.",
      apply: (p) => {
        p.expMultiplier = (p.expMultiplier || 1) + 1.0;
        p.maxHp = Math.max(25, p.maxHp - 10);
        p.hp = Math.min(p.hp, p.maxHp);
        addLog(`Pacto del Erudito firmado: ¡+100% de EXP por cada rival eliminado! pero tu HP Máx disminuye en -10 (${p.hp}/${p.maxHp} HP).`, "damage");
      }
    }
  ];

  let currentOfferedRelics = [];

  /* ============================================================
     RECOMPENSA POST-COMBATE: SISTEMA DE 3 PUERTAS (FASE 4)
     Hoguera (Curar 30% / Purgar) • Tienda (Bazar) • Forja (Yunque de lote gratis)
     ============================================================ */
  function showRewardModal() {
    saveMidRunState();
    const m = document.getElementById("screen-event");
    const titleEl = document.getElementById("event-title");
    const descEl = document.getElementById("event-desc");
    const optEl = document.getElementById("event-options");
    const maxFloors = (typeof getMaxFloorsForDifficulty === "function") ? getMaxFloorsForDifficulty() : 13;
    const isBoss = (gameState.floor % 4 === 0 || gameState.floor >= maxFloors);

    // Asegurar que modales transitorios no solapen la selección de beneficios
    ["screen-bet", "screen-combat-start", "screen-levelup", "screen-fate-wheel", "screen-floor-transition", "screen-pack-open", "screen-booster", "screen-forge-result"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add("hidden");
    });
    const nextRoundCont = document.getElementById("next-round-container");
    if (nextRoundCont) nextRoundCont.classList.add("hidden");

    if (titleEl) {
      titleEl.style.display = "";
      titleEl.innerText = isBoss ? "👑 ¡JEFE DERROTADO!" : "¡PISO CONQUISTADO!";
    }
    if (descEl) {
      descEl.style.display = "";
      descEl.innerText = isBoss
        ? "Has doblegado al Guardián de la Torre. Como tributo de campeón, ¡puedes reclamar todas las recompensas antes de ascender!"
        : "Has derrotado al rival de este piso. Ante ti se abren 3 caminos hacia la gloria:";
    }

    const p = gameState.player;
    const healAmount = p ? Math.min(p.maxHp - p.hp, Math.max(25, Math.round(p.maxHp * 0.30))) : 30;
    const healText = healAmount > 0 ? `+${healAmount} HP` : "SALUD AL MÁXIMO";

    const bossTributeHtml = isBoss ? `
      <div class="boss-tribute-banner">
        <div class="boss-tribute-title">🏆 TRIBUTO DEL CAMPEÓN DISPONIBLE</div>
        <div class="boss-tribute-desc">Al abatir a un Jefe, no tienes que renunciar a ningún camino: ¡puedes sanar tus heridas en la Hoguera, forjar un Sello Arcano gratis y luego visitar el Bazar!</div>
      </div>
    ` : "";

    if (optEl) {
      optEl.innerHTML = `
        ${bossTributeHtml}
      <div class="floor-fork-container">
        <!-- OPCIÓN 1: LA HOGUERA -->
        <div class="fork-choice-card campfire" onclick="chooseCampfireRest()">
          <div class="fork-card-badge campfire-badge">🔥 REFUGIO Y DESCANSO</div>
          <div class="fork-card-main">
            <div class="fork-card-icon">🏕️</div>
            <div>
              <div class="fork-card-title">LA HOGUERA ANCESTRAL</div>
              <div class="fork-card-desc">
                Enciende un fuego reparador: sana el 30% de tu salud máxima o aviva la llama para purgar estados negativos y ganar armadura.
              </div>
            </div>
          </div>
          <div class="fork-card-stat">
            <span class="stat-tag">❤️ CURACIÓN ESTIMADA</span>
            <span class="stat-highlight heal">+30% HP (${healText})</span>
          </div>
          <button class="fork-action-btn campfire-btn" onclick="event.stopPropagation(); chooseCampfireRest();">
            🔥 ENTRAR A LA HOGUERA
          </button>
        </div>

        <!-- OPCIÓN 2: LA TIENDA -->
        <div class="fork-choice-card shop" onclick="showShopModal()">
          <div class="fork-card-badge shop-badge">🛒 MERCADER DE LA TORRE</div>
          <div class="fork-card-main">
            <div class="fork-card-icon">🏪</div>
            <div>
              <div class="fork-card-title">EL BAZAR DEL DESTINO</div>
              <div class="fork-card-desc">
                Negocia con el mercader: adquiere Sobres de Artefactos, Sobres de Amuletos o pociones de combate.
              </div>
            </div>
          </div>
          <div class="fork-card-stat">
            <span class="stat-tag">🪙 TUS FONDOS</span>
            <span class="stat-highlight gold">${gameState.gold} ORO DISPONIBLE</span>
          </div>
          <button class="fork-action-btn shop-btn" onclick="event.stopPropagation(); showShopModal();">
            🛒 VISITAR EL BAZAR
          </button>
        </div>

        <!-- OPCIÓN 3: EL YUNQUE DE APUESTA RIESGOSA -->
        <div class="fork-choice-card forge" onclick="openGambleForgeModal()">
          <div class="fork-card-badge forge-badge">🎰 APUESTA DE LA FORJA</div>
          <div class="fork-card-main">
            <div class="fork-card-icon">⚡🔨</div>
            <div>
              <div class="fork-card-title">EL YUNQUE TAHÚR</div>
              <div class="fork-card-desc">
                Fragua clandestina de alto riesgo: apuesta <b>Oro</b> y <b>Criptas</b>. Si el fuego sagrado despierta, ¡encantarás un <b>GRUPO ENTERO DE CARTAS</b> de golpe!
              </div>
            </div>
          </div>
          <div class="fork-card-stat">
            <span class="stat-tag">🎲 RIESGO Y GLORIA</span>
            <span class="stat-highlight forge">APUESTA 🪙 / 💀 • LOTE COMPLETO</span>
          </div>
          <button class="fork-action-btn forge-btn" onclick="event.stopPropagation(); openGambleForgeModal();">
            🎰 TENTAR AL YUNQUE (APUESTA)
          </button>
        </div>
      </div>
    `;
    }
    if (m) m.classList.remove("hidden");
  }

  function chooseForgeReward() {
    openGambleForgeModal();
  }
  window.chooseForgeReward = chooseForgeReward;

  /* ============================================================
     EL YUNQUE TAHÚR (APUESTA RIESGOSA - 3.ª PUERTA POST-COMBATE)
     Apuesta con Oro (80 🪙): éxito ~25%
     Apuesta Híbrida (100 🪙 + 15 💀): éxito ~45%
     Pacto del Criptario (30 💀): éxito ~60%
     Si acierta: Forja Arquetípica de Lote (todo el grupo)
     Si falla: pierde la ofrenda apostada
     ============================================================ */
  const GAMBLE_FORGE_TIERS = {
    gold: {
      id: "gold",
      name: "Apuesta con Oro",
      icon: "🪙",
      costGold: 80,
      costCrypt: 0,
      prob: 25,
      probClass: "low",
      badge: "RIESGO ALTO",
      desc: "Ofrenda de 80 🪙 Oro de la run. Éxito modesto (~25%). Si despierta el fuego, ¡forjarás un grupo entero de cartas!"
    },
    hybrid: {
      id: "hybrid",
      name: "Apuesta Híbrida",
      icon: "⚡🪙💀",
      costGold: 100,
      costCrypt: 15,
      prob: 45,
      probClass: "med",
      badge: "CRISOL ALQUÍMICO",
      desc: "Funde 100 🪙 Oro y 15 💀 Criptas. Mayor resonancia mágica con la Torre (~45% de éxito)."
    },
    crypt: {
      id: "crypt",
      name: "Pacto del Criptario",
      icon: "💀🔥",
      costGold: 0,
      costCrypt: 30,
      prob: 60,
      probClass: "high",
      badge: "PACTO SUPREMO",
      desc: "Sacrifica 30 💀 Monedas de Cripta del metajuego. Máxima probabilidad de consagración (~60% de éxito)."
    }
  };
  window.GAMBLE_FORGE_TIERS = GAMBLE_FORGE_TIERS;

  let selectedGambleTier = "gold";
  let isGambleForging = false;

  const CRYPT_COINS_KEY = "bj_crypt_coins";
  const CRYPT_COINS_LEGACY_KEY = "blackjack" + "_crypt_coins";
  const MAX_CRYPT_COINS = 99999;

  function readCryptCoins() {
    let value = parseInt(localStorage.getItem(CRYPT_COINS_KEY) || "0", 10);
    if (!isFinite(value) || value < 0) value = 0;
    if (value > MAX_CRYPT_COINS) value = MAX_CRYPT_COINS;
    try {
      const legacyRaw = localStorage.getItem(CRYPT_COINS_LEGACY_KEY);
      if (legacyRaw !== null && legacyRaw !== undefined) {
        const legacy = parseInt(legacyRaw, 10);
        if (isFinite(legacy) && legacy > value) value = Math.min(legacy, MAX_CRYPT_COINS);
        localStorage.setItem(CRYPT_COINS_KEY, String(value));
        localStorage.removeItem(CRYPT_COINS_LEGACY_KEY);
      }
    } catch (_) {}
    return value;
  }
  window.readCryptCoins = readCryptCoins;

  function getPlayerCryptCoins() { return readCryptCoins(); }
  window.getPlayerCryptCoins = getPlayerCryptCoins;

  function addPlayerCryptCoins(amount) {
    if (!(amount > 0)) return readCryptCoins();
    const next = Math.min(MAX_CRYPT_COINS, readCryptCoins() + Math.floor(amount));
    localStorage.setItem(CRYPT_COINS_KEY, String(next));
    if (typeof window.updateCryptCoinUI === "function") window.updateCryptCoinUI();
    return next;
  }
  window.addPlayerCryptCoins = addPlayerCryptCoins;

  function spendPlayerCryptCoins(amount) {
    if (amount <= 0) return true;
    const curr = readCryptCoins();
    if (curr < amount) return false;
    const next = curr - amount;
    localStorage.setItem(CRYPT_COINS_KEY, String(next));
    if (typeof window.updateCryptCoinUI === "function") window.updateCryptCoinUI();
    return true;
  }
  window.spendPlayerCryptCoins = spendPlayerCryptCoins;

  function openGambleForgeModal() {
    isGambleForging = false;
    const modal = document.getElementById("screen-gamble-forge");
    if (!modal) return;

    const goldEl = document.getElementById("gamble-forge-gold");
    const cryptEl = document.getElementById("gamble-forge-crypt");
    const statusEl = document.getElementById("gamble-forge-status");
    const btn = document.getElementById("gamble-forge-btn");

    if (goldEl) goldEl.innerText = `${gameState.gold || 0} 🪙`;
    if (cryptEl) cryptEl.innerText = `${getPlayerCryptCoins()} 💀`;

    if (statusEl) {
      statusEl.classList.add("hidden");
      statusEl.innerHTML = "";
    }
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = "🔨 GOLPEAR EL YUNQUE";
    }

    renderGambleTiers();
    modal.classList.remove("hidden");
    try { playAnvilStrikeSound(); } catch (_) {}
  }
  window.openGambleForgeModal = openGambleForgeModal;

  function closeGambleForgeModal() {
    if (isGambleForging) return;
    const modal = document.getElementById("screen-gamble-forge");
    if (modal) modal.classList.add("hidden");
  }
  window.closeGambleForgeModal = closeGambleForgeModal;

  function selectGambleTier(tierId) {
    if (isGambleForging) return;
    if (!GAMBLE_FORGE_TIERS[tierId]) return;
    selectedGambleTier = tierId;
    renderGambleTiers();
    try { playCardDealSound(); } catch (_) {}
  }
  window.selectGambleTier = selectGambleTier;

  function renderGambleTiers() {
    const container = document.getElementById("gamble-tiers-container");
    if (!container) return;

    const gold = gameState.gold || 0;
    const crypt = getPlayerCryptCoins();

    container.innerHTML = Object.keys(GAMBLE_FORGE_TIERS).map(key => {
      const t = GAMBLE_FORGE_TIERS[key];
      const isSelected = (selectedGambleTier === key);
      const canAffordGold = gold >= t.costGold;
      const canAffordCrypt = crypt >= t.costCrypt;
      const canAfford = canAffordGold && canAffordCrypt;

      let costParts = [];
      if (t.costGold > 0) costParts.push(`${t.costGold} 🪙 Oro`);
      if (t.costCrypt > 0) costParts.push(`${t.costCrypt} 💀 Criptas`);
      const costStr = costParts.join(" + ");

      return `
        <div class="gamble-tier-card ${isSelected ? 'selected' : ''} ${!canAfford ? 'disabled' : ''}" onclick="selectGambleTier('${key}')">
          <div class="gamble-tier-header">
            <div class="gamble-tier-name">
              <span>${t.icon}</span> <b>${t.name}</b>
            </div>
            <div class="gamble-tier-prob ${t.probClass}">
              🎲 ${t.prob}% ÉXITO
            </div>
          </div>
          <div class="gamble-tier-desc">${t.desc}</div>
          <div class="gamble-tier-cost ${canAfford ? 'can-afford' : 'cannot-afford'}">
            <b>Coste:</b> ${costStr} ${!canAfford ? '⚠️ (Fondos insuficientes)' : '✔ Disponible'}
          </div>
        </div>
      `;
    }).join("");
  }
  window.renderGambleTiers = renderGambleTiers;

  function executeGambleForge() {
    if (isGambleForging) return;
    const tier = GAMBLE_FORGE_TIERS[selectedGambleTier];
    if (!tier) return;

    const gold = gameState.gold || 0;
    const crypt = getPlayerCryptCoins();

    if (gold < tier.costGold || crypt < tier.costCrypt) {
      addLog(`⚠️ Fondos insuficientes para ${tier.name}.`, "warning");
      spawnFloatingText("screen-gamble-forge", "⚠️ FONDOS INSUFICIENTES", "warning");
      try { playBustSound(); } catch (_) {}
      return;
    }

    // Descontar tributos
    isGambleForging = true;
    gameState.gold -= tier.costGold;
    spendPlayerCryptCoins(tier.costCrypt);
    updateHud();

    // Actualizar chips de fondos
    const goldEl = document.getElementById("gamble-forge-gold");
    const cryptEl = document.getElementById("gamble-forge-crypt");
    if (goldEl) goldEl.innerText = `${gameState.gold || 0} 🪙`;
    if (cryptEl) cryptEl.innerText = `${getPlayerCryptCoins()} 💀`;

    const statusEl = document.getElementById("gamble-forge-status");
    const btn = document.getElementById("gamble-forge-btn");
    const forgeCard = document.querySelector(".gamble-forge-card");

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = "⚡ FORJANDO EN EL YUNQUE...";
    }
    if (forgeCard) forgeCard.classList.add("shaking");

    try { playAnvilStrikeSound(); } catch (_) {}
    triggerHaptic("hit");

    if (statusEl) {
      statusEl.classList.remove("hidden");
      statusEl.innerHTML = `
        <div style="color:#ffd166;font-family:var(--font-pixel);font-size: 9px;text-align:center;">
          🔨 ¡EL MARTILLO IMPACTA EL ACERO ARCANO!...
        </div>
      `;
    }

    setTimeout(() => {
      if (forgeCard) forgeCard.classList.remove("shaking");
      try { playAnvilStrikeSound(); } catch (_) {}
      triggerHaptic("blackjack");

      const roll = Math.random() * 100;
      const isSuccess = (roll < tier.prob);

      if (isSuccess) {
        // ÉXITO: Despierta el fuego arcano
        try { playJackpotSound(); } catch (_) {}
        try { playEnchantChimeSound(); } catch (_) {}
        addLog(`🔥 ¡EL YUNQUE TAHÚR DESPERTÓ! (${Math.round(roll)}% < ${tier.prob}%). ¡Apuesta ganada! Forjarás un lote entero de cartas.`, "critical");
        spawnFloatingText("screen-gamble-forge", "🔥 ¡APUESTA GANADA!", "crit");

        if (statusEl) {
          statusEl.innerHTML = `
            <div class="gamble-result-success">
              🔥 ¡EL FUEGO SAGRADO HA DESPERTADO! (Tirada: ${Math.round(roll)}% ≤ ${tier.prob}%)<br>
              ¡Apuesta ganada! Abriendo la Forja Arquetípica de Lote...
            </div>
          `;
        }

        setTimeout(() => {
          isGambleForging = false;
          closeGambleForgeModal();
          openBoosterPackBySource("arcane_group", { free: true, source: "postCombat" });
        }, 1400);

      } else {
        // FRACASO: El fuego se extingue
        try { playBustSound(); } catch (_) {}
        addLog(`💥 Yunque Tahúr: La llama se extinguió (${Math.round(roll)}% ≥ ${tier.prob}%). Perdiste la ofrenda apostada.`, "warning");
        spawnFloatingText("screen-gamble-forge", "💥 FUEGO EXTINGUIDO", "warning");

        if (statusEl) {
          statusEl.innerHTML = `
            <div class="gamble-result-fail">
              💥 ¡EL MARTILLO SE ENFRIÓ! (Tirada: ${Math.round(roll)}% > ${tier.prob}%)<br>
              El fuego se extinguió y tu ofrenda fue devorada por la ceniza.
            </div>
          `;
        }

        if (btn) {
          btn.disabled = false;
          btn.innerHTML = "🔨 REINTENTAR OTRA APUESTA";
        }
        renderGambleTiers();
        isGambleForging = false;
      }
    }, 1100);
  }
  window.executeGambleForge = executeGambleForge;

  function chooseCampfireRest() {
    const p = gameState.player;
    if (!p) return;
    const hero = HERO_DATA[p.class] || HERO_DATA.knight;
    const modal = document.getElementById("screen-campfire-modal");
    const heroImg = document.getElementById("campfire-hero-img");
    if (heroImg) heroImg.src = hero.img || "assets/svg/knight_idle.svg";

    try { playCampfireSound(); } catch (_) {}
    try {
      if (!startTrackedSceneMusic("campfire", startProceduralCampfireMusic)) {
        startProceduralCampfireMusic();
      }
    } catch (_) {}
    triggerHaptic("potion");

    if (modal) {
      modal.classList.remove("hidden");
    } else {
      finishCampfireRest("heal");
    }
  }
  window.chooseCampfireRest = chooseCampfireRest;

  function finishCampfireRest(choice) {
    try { stopSceneMusicIfScene("campfire"); } catch (_) {}
    const modal = document.getElementById("screen-campfire-modal");
    if (modal) modal.classList.add("hidden");
    const p = gameState.player;
    if (!p) return;

    if (choice === "cleanse") {
      if (!gameState.status) gameState.status = {};
      gameState.status.playerPoison = 0;
      gameState.status.playerBurn = 0;
      if (p.curse) {
        const curseName = (typeof CURSE_NAMES !== "undefined" && CURSE_NAMES[p.curse]) ? CURSE_NAMES[p.curse] : p.curse;
        addLog(`✨ La Llama Sagrada ha purgado la maldición [${curseName}].`, "heal");
        p.curse = null;
        p.blackjackMultiplier = 1;
      }
      gameState.status.playerShield = (gameState.status.playerShield || 0) + 10;
      const heal = Math.min(p.maxHp - p.hp, 15);
      p.hp += heal;
      spawnFloatingText("player-sprite", `+${heal} HP & +10 ESCUDO`, "shield");
      addLog(`✨ Has meditado junto a la Hoguera: purificaste todas las aflicciones, sanaste +${heal} HP y ganaste +10 de Escudo protector.`, "heal");
    } else {
      // heal 30% max HP
      const heal = Math.min(p.maxHp - p.hp, Math.max(25, Math.round(p.maxHp * 0.30)));
      p.hp += heal;
      spawnFloatingText("player-sprite", `+${heal} HP`, "heal");
      addLog(`🔥 Has descansado junto a la Hoguera: recuperaste +${heal} HP (${p.hp}/${p.maxHp} HP).`, "heal");
    }

    try { playEnchantChimeSound(); } catch (_) {}
    updateHud();
    saveMidRunState();
    showChronicleModal();
  }
  window.finishCampfireRest = finishCampfireRest;
  window.showRewardModal = showRewardModal;

  function selectRandomRelic(relicOrId) {
    const p = gameState.player;
    if (!p) return;
    let relic = null;
    if (typeof relicOrId === "object" && relicOrId !== null) {
      relic = relicOrId;
    } else if (typeof relicOrId === "number") {
      relic = ALL_RELICS[relicOrId];
    } else if (typeof relicOrId === "string") {
      relic = ALL_RELICS.find(r => r.id === relicOrId);
    }
    if (!relic) {
      const buffs = ALL_RELICS.filter(r => r.type === "buff");
      relic = buffs[Math.floor(Math.random() * buffs.length)];
    }
    if (relic && typeof relic.apply === "function") {
      relic.apply(p);
      if (!p.obtainedRelics) p.obtainedRelics = [];
      if (!p.obtainedRelics.includes(relic.id)) p.obtainedRelics.push(relic.id);
      try { playLevelUpSound(); } catch (_) {}
      updateHud();
      saveMidRunState();
    }
  }
  window.selectRandomRelic = selectRandomRelic;

  function skipRelicReward() {
    addLog("Decidiste prescindir de la reliquia para preservar tu destino intacto.", "info");
    updateHud();
    saveMidRunState();
  }
  window.skipRelicReward = skipRelicReward;

  function buyRelicBoosterPack() {
    const p = gameState.player;
    const price = 45;
    if (gameState.gold < price) {
      showGameToast(`No posees suficiente oro (cuesta ${price} 🪙). Te faltan ${price - gameState.gold} 🪙.`, "warn");
      return;
    }
    const unowned = ALL_RELICS.filter(r => r.type === "buff" && !(p.obtainedRelics || []).includes(r.id));
    if (unowned.length === 0) {
      showGameToast("¡Ya has dominado todas las bendiciones arcanas disponibles!", "warn");
      return;
    }
    gameState.gold -= price;
    const chosen = unowned[Math.floor(Math.random() * unowned.length)];
    selectRandomRelic(chosen);
    try { playCoinSound(); } catch (_) {}
    showGameToast(`¡Has adquirido la bendición: ${chosen.name}!`, "success");
    updateHud();
    showShopModal();
  }
  window.buyRelicBoosterPack = buyRelicBoosterPack;

  function selectReward(type) {
    const p = gameState.player;
    if (type === "ruby" || type === "sapphire" || type === "emerald" || type === "topaz" || type === "blackjack_heritage") {
      p.gem = type;
      addLog(`Bendición: ${type}`, "info");
    }
    if (type === "emerald") {
      p.pwr += 1;
      addLog(`Esmeralda del Destino: PWR +1 (ahora ${p.pwr}).`, "critical");
    }
    if (["spiked_belt","lead_gauntlet","steel_helm"].includes(type)) {
      p.accessory = type;
      addLog(`Accesorio: ${type}`, "info");
    }
    if (type === "steel_helm") {
      p.def += 1;
      addLog(`Casco de Acero: DEF +1 (ahora ${p.def}).`, "critical");
    }
    if (type === "blackjack_gem") {
      p.gem = type;
      addLog(`Bendición: ${type}`, "info");
    }
    document.getElementById("screen-event").classList.add("hidden");
    showShopModal();
  }

  /* ============================================================
     SISTEMA DE ARTEFACTOS (MÁXIMO 5 RANURAS SEGÚN NIVEL - REQ 5)
     ============================================================ */

  /* ============================================================
     SISTEMA DE BENDICIONES DE INICIO (MEDALLÓN DEL DESTINO - REQ FASE 6)
     ============================================================ */
  const STARTER_BLESSINGS = [
    // Tier I (Común - Nvl 1)
    {
      id: "oak_bark",
      name: "Corteza de Roble",
      icon: "🪵",
      tier: 1,
      tierLabel: "COMÚN",
      unlockLevel: 1,
      desc: "+15 Salud Máxima base y regenera +3 HP tras ganar cada mano.",
      apply: (p) => { p.maxHp += 15; p.hp += 15; }
    },
    {
      id: "notched_dagger",
      name: "Daga Mellada",
      icon: "🗡️",
      tier: 1,
      tierLabel: "COMÚN",
      unlockLevel: 1,
      desc: "+1 PWR permanente a todos los golpes de ataque.",
      apply: (p) => { p.pwr += 1; }
    },
    {
      id: "wooden_buckler",
      name: "Rodela de Madera",
      icon: "🛡️",
      tier: 1,
      tierLabel: "COMÚN",
      unlockLevel: 1,
      desc: "Inicias cada piso con +5 de Escudo protector azul.",
      apply: () => {}
    },
    {
      id: "copper_pouch",
      name: "Bolsita de Cobre",
      icon: "🪙",
      tier: 1,
      tierLabel: "COMÚN",
      unlockLevel: 1,
      desc: "+20 Oro inicial y +2 Oro por cada rival liquidado.",
      apply: () => { gameState.gold += 20; }
    },
    {
      id: "keen_eye",
      name: "Ojo Avizor",
      icon: "👁️",
      tier: 1,
      tierLabel: "COMÚN",
      unlockLevel: 1,
      desc: "+1 Reroll táctico adicional en cada piso de la Torre.",
      apply: (p) => { p.rerollsAvailable = (p.rerollsAvailable || 0) + 1; }
    },

    // Tier II (Rara - Nvl 3)
    {
      id: "gladiator_pact",
      name: "Pacto del Gladiador",
      icon: "🩸",
      tier: 2,
      tierLabel: "RARA",
      unlockLevel: 3,
      desc: "+20 HP Máx y +1 PWR; al bajar del 30% de HP ganas +2 DEF de emergencia.",
      apply: (p) => { p.maxHp += 20; p.hp += 20; p.pwr += 1; }
    },
    {
      id: "steel_mail",
      name: "Malla de Acero Templado",
      icon: "⛓️",
      tier: 2,
      tierLabel: "RARA",
      unlockLevel: 3,
      desc: "+2 DEF fija y +8 de Escudo inicial al entrar a cada piso.",
      apply: (p) => { p.def += 2; }
    },
    {
      id: "wind_cloak",
      name: "Capa de Viento",
      icon: "💨",
      tier: 2,
      tierLabel: "RARA",
      unlockLevel: 3,
      desc: "20% de probabilidad pasiva de esquivar el daño al perder una mano.",
      apply: () => {}
    },
    {
      id: "alchemist_flask",
      name: "Frasco Alquímico",
      icon: "🧪",
      tier: 2,
      tierLabel: "RARA",
      unlockLevel: 3,
      desc: "Las pociones curan +15 HP extra y otorgan +5 de Escudo azul.",
      apply: () => {}
    },

    // Tier III (Épica - Nvl 6)
    {
      id: "dragon_heart",
      name: "Corazón de Dragón",
      icon: "🐉",
      tier: 3,
      tierLabel: "ÉPICA",
      unlockLevel: 6,
      desc: "+35 HP Máx y recuperas +12 HP automáticamente al subir de piso.",
      apply: (p) => { p.maxHp += 35; p.hp += 35; }
    },
    {
      id: "berserker_rage",
      name: "Ira del Berserker",
      icon: "⚡",
      tier: 3,
      tierLabel: "ÉPICA",
      unlockLevel: 6,
      desc: "+3 PWR permanente; tus manos con valor 20 o 21 infligen +30% daño.",
      apply: (p) => { p.pwr += 3; }
    },
    {
      id: "unyielding_fortress",
      name: "Fortaleza Inexpugnable",
      icon: "🏰",
      tier: 3,
      tierLabel: "ÉPICA",
      unlockLevel: 6,
      desc: "+3 DEF permanente y absorbes el primer golpe de cada piso sin daño.",
      apply: (p) => { p.def += 3; }
    },
    {
      id: "midas_touch",
      name: "Toque del Rey Midas",
      icon: "👑",
      tier: 3,
      tierLabel: "ÉPICA",
      unlockLevel: 6,
      desc: "+40 Oro inicial; todos los artículos del Bazar tienen 25% de descuento.",
      apply: () => { gameState.gold += 40; }
    },

    // Tier IV (Mítica/Legendaria - Nvl 9-10)
    {
      id: "blackjack_transcendence",
      name: "Trascendencia del 21",
      icon: "🃏",
      tier: 4,
      tierLabel: "MÍTICA",
      unlockLevel: 9,
      desc: "Todo Blackjack causa daño crítico x2.5 y restaura +15 HP al héroe.",
      apply: () => {}
    },
    {
      id: "phoenix_grace",
      name: "Gracia del Fénix",
      icon: "🔥",
      tier: 4,
      tierLabel: "MÍTICA",
      unlockLevel: 9,
      desc: "Si tu vida llega a 0, revives instantáneamente con el 50% de HP (1 vez).",
      apply: () => {}
    },
    {
      id: "shadow_lord",
      name: "Señor de las Sombras",
      icon: "⚔️",
      tier: 4,
      tierLabel: "MÍTICA",
      unlockLevel: 9,
      desc: "Ignoras el 100% de la armadura enemiga cuando tu mano suma 19, 20 o 21.",
      apply: () => {}
    },
    {
      id: "forge_master",
      name: "Maestro de la Forja",
      icon: "🌟",
      tier: 4,
      tierLabel: "MÍTICA",
      unlockLevel: 9,
      desc: "Inicias la partida con 2 cartas forjadas con Sellos Arcanos de Nivel 2.",
      apply: (p) => {
        p.cardEnchantments = p.cardEnchantments || {};
        p.cardEnchantments["♠_K"] = Object.assign({}, (typeof SEAL_ENCHANTMENTS !== "undefined" && SEAL_ENCHANTMENTS.sharp) ? SEAL_ENCHANTMENTS.sharp : { id: "sharp", name: "Sello Afilado", icon: "🗡️" });
        p.cardEnchantments["♥_A"] = Object.assign({}, (typeof SEAL_ENCHANTMENTS !== "undefined" && SEAL_ENCHANTMENTS.astral) ? SEAL_ENCHANTMENTS.astral : { id: "astral", name: "Sello Astral", icon: "✨" });
      }
    },
    {
      id: "jack_sovereignty",
      name: "Soberanía de Jack",
      icon: "👑",
      tier: 4,
      tierLabel: "LEGENDARIA",
      unlockLevel: 10,
      desc: "+50 HP Máx, +4 PWR, +2 DEF, +50 Oro y +2 Rerolls al arrancar la run.",
      apply: (p) => {
        p.maxHp += 50; p.hp += 50; p.pwr += 4; p.def += 2; gameState.gold += 50; p.rerollsAvailable = (p.rerollsAvailable || 0) + 2;
      }
    }
  ];
  window.STARTER_BLESSINGS = STARTER_BLESSINGS;

  function hasStarterBlessing(id) {
    if (!gameState.player || !gameState.player.starterBlessing) return false;
    return gameState.player.starterBlessing.id === id;
  }
  window.hasStarterBlessing = hasStarterBlessing;

  function updatePlayerAccSlot() {
    const p = gameState.player;
    const accSlot = document.getElementById("player-acc-slot");
    if (!accSlot) return;

    if (p && p.starterBlessing) {
      const b = p.starterBlessing;
      accSlot.innerHTML = `<span class="acc-blessing-icon" style="font-size:11px;line-height:1;display:block;">${b.icon || "🔮"}</span>`;
      accSlot.className = `player-acc-slot equipped blessing-tier-${b.tier || 1}`;
      accSlot.style.display = "flex";
      accSlot.title = `🔮 ${b.name} (${b.tierLabel || 'TIER ' + b.tier}): ${b.desc} (Toca para ver)`;
    } else if (p && p.accessory) {
      const accInfo = (typeof AMULET_INFO !== "undefined" && AMULET_INFO[p.accessory]) ? AMULET_INFO[p.accessory] : { icon: "💍", name: p.accessory, desc: "" };
      accSlot.innerHTML = `<span class="acc-blessing-icon" style="font-size:14px;line-height:1;display:block;">${accInfo.icon || "💍"}</span>`;
      accSlot.className = "player-acc-slot equipped";
      accSlot.style.display = "flex";
      accSlot.title = `💍 ${accInfo.name}: ${accInfo.desc}`;
    } else {
      accSlot.innerHTML = "";
      accSlot.className = "player-acc-slot empty";
      accSlot.style.display = "none";
      accSlot.title = "🔮 Medallón del Destino: Toca para inspeccionar tu Bendición activa";
    }
  }
  window.updatePlayerAccSlot = updatePlayerAccSlot;

  function inspectActiveBlessing(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const p = gameState.player;
    if (!p) return;
    const modal = document.getElementById("modal-blessing-detail");
    const iconEl = document.getElementById("bmodal-icon");
    const titleEl = document.getElementById("bmodal-title");
    const tagEl = document.getElementById("bmodal-tag");
    const descEl = document.getElementById("bmodal-desc");

    if (p.starterBlessing) {
      const b = p.starterBlessing;
      if (iconEl) iconEl.innerText = b.icon || "🔮";
      if (titleEl) titleEl.innerText = (b.name || "BENDICIÓN").toUpperCase();
      if (tagEl) tagEl.innerText = (b.tierLabel || ("TIER " + (b.tier || "I"))) + " • PASIVA PERMANENTE";
      if (descEl) descEl.innerText = b.desc || "Efecto activo durante toda la ascensión.";
    } else if (p.accessory) {
      const acc = (typeof AMULET_INFO !== "undefined" && AMULET_INFO[p.accessory]) ? AMULET_INFO[p.accessory] : { icon: "💍", name: p.accessory, desc: "Accesorio de combate." };
      if (iconEl) iconEl.innerText = acc.icon || "💍";
      if (titleEl) titleEl.innerText = (acc.name || "ACCESORIO").toUpperCase();
      if (tagEl) tagEl.innerText = "ACCESORIO EQUIPADO";
      if (descEl) descEl.innerText = acc.desc || "Accesorio de combate incrustado.";
    } else {
      if (iconEl) iconEl.innerText = "🔮";
      if (titleEl) titleEl.innerText = "MEDALLÓN DEL DESTINO";
      if (tagEl) tagEl.innerText = "RANURA VACÍA";
      if (descEl) descEl.innerText = "Al comenzar tu partida en el Piso 1, la Torre te ofrece elegir 1 Bendición entre 3 opciones para incrustarla aquí.";
    }

    if (modal) modal.classList.remove("hidden");
    try { playCardDealSound(); } catch (_) {}
  }
  window.inspectActiveBlessing = inspectActiveBlessing;

  function closeBlessingDetailModal() {
    const modal = document.getElementById("modal-blessing-detail");
    if (modal) modal.classList.add("hidden");
  }
  window.closeBlessingDetailModal = closeBlessingDetailModal;

  function explainEquipmentPill(type) {
    try { playButtonClickSound(); } catch (_) {}
    const p = gameState.player;
    if (!p) return;

    switch (type) {
      case "artifacts": {
        const maxSlots = (typeof getMaxArtifactSlots === "function") ? getMaxArtifactSlots() : Math.min(5, p.level || 1);
        const count = (p.artifacts && Array.isArray(p.artifacts)) ? p.artifacts.length : 0;
        showGameAlert(`RANURAS DE ARTEFACTOS (${count}/${maxSlots})\nTienes ${count} artefactos pasivos equipados de un máximo de ${maxSlots} (desbloqueas más ranuras al subir de nivel).\nSe compran en la Tienda (Pestaña 2: Artefactos) y otorgan ventajas tácticas durante toda la partida.`, "ARTEFACTOS EQUIPADOS");
        break;
      }
      case "blessing": {
        if (p.starterBlessing && typeof inspectActiveBlessing === "function") {
          inspectActiveBlessing();
        } else {
          const bName = p.gem || "Ninguna";
          showGameAlert(`[${bName.toUpperCase()}]\nElige una bendición inicial al comenzar tu run para recibir bonificaciones elementales permanentes en tu Medallón.`, "BENDICIÓN DEL DESTINO");
        }
        break;
      }
      case "accessory": {
        const acc = (p.accessory && typeof AMULET_INFO !== "undefined" && AMULET_INFO[p.accessory]) ? AMULET_INFO[p.accessory] : null;
        if (acc) {
          showGameAlert(`[${acc.name}]\n${acc.desc}\nPuedes adquirir o cambiar amuletos en la Tienda (Pestaña 2).`, "ACCESORIO EQUIPADO");
        } else {
          showGameAlert("Actualmente no tienes ningún amuleto o accesorio equipado.\nPuedes comprarlos en la Tienda (Pestaña 2: Artefactos y Accesorios) para obtener efectos protectores o contraataques.", "ACCESORIO DE COMBATE");
        }
        break;
      }
      case "dupla": {
        const hasDupla = (p && p.duplaDef > 0);
        showGameAlert(hasDupla
          ? `¡DUPLA ACTIVA! Tus dos primeras cartas coinciden en valor numérico.\nRecibes +${p.duplaDef} de Escudo protector adicional para esta mano.`
          : "Si tus 2 primeras cartas tienen el mismo valor numérico (por ejemplo dos 7 o dos Reyes), ¡activas una Dupla que te otorga Escudo defensivo (+2 DEF)!",
          "DUPLA DEFENSIVA");
        break;
      }
      case "synergies": {
        const synList = [];
        if (p.activeHandSynergies) {
          if (p.activeHandSynergies["fire"]) synList.push("🔥 FUEGO: 10 Daño directo + Quemadura y -2 DEF al rival");
          if (p.activeHandSynergies["blood"]) synList.push("🩸 SANGRE: Restaura vida y purga veneno acumulado");
          if (p.activeHandSynergies["shield"]) synList.push("🛡️ ACERO: +10 Escudo azul protector");
          if (p.activeHandSynergies["blade"]) synList.push("⚔️ HOJAS: +8 Daño de impacto cortante");
          if (p.activeHandSynergies["toxic"]) synList.push("☠️ VENENO: Inocula plaga tóxica virulenta al rival");
          if (p.activeHandSynergies["arcane"]) synList.push("🔮 ARCANO: Otorga +1 Reroll gratuito en combate");
        }
        const activeText = synList.length > 0 ? ("\n\nSinergias activas en esta mano:\n• " + synList.join("\n• ")) : "\n\n(No tienes sinergias activas en esta mano. Junta 2 cartas del mismo elemento con sellos para desatarlas).";
        showGameAlert("Al juntar 2 o más cartas con sellos del mismo elemento en tu mano, ¡se desata un efecto de combate inmediato!" + activeText, "SINERGIAS ELEMENTALES");
        break;
      }
      case "perks": {
        if (typeof openPerksCodexModal === "function") {
          openPerksCodexModal();
        } else {
          showGameAlert("Los Perks Tácticos son 15 combinaciones situacionales que potencian a tu héroe cuando se cumplen condiciones específicas en combate.", "PERKS TÁCTICOS");
        }
        break;
      }
      case "limit": {
        showGameAlert("La regla de oro del juego: Tu meta es sumar 21 o acercarte lo más posible. Si la suma de tus cartas supera 21, ¡te pasas (BUST) y sufres daño!", "LÍMITE BLACK JACK 21");
        break;
      }
      case "turn": {
        const maxTurns = 7;
        showGameAlert(`Ronda actual: ${gameState.turn || 1} de ${maxTurns}.\nTienes un máximo de ${maxTurns} manos para quebrar la salud del enemigo antes del tiempo límite.`, "MANOS DE COMBATE");
        break;
      }
      default:
        break;
    }
  }
  window.explainEquipmentPill = explainEquipmentPill;

  function showStarterBlessingModal() {
    const p = gameState.player;
    const heroClass = (p && p.class) ? p.class : "knight";
    const meta = (typeof getHeroMeta === "function") ? getHeroMeta() : {};
    const heroMeta = meta[heroClass] || { totalExp: 0, masteryLevel: 1 };
    const mLevel = heroMeta.level || heroMeta.masteryLevel || (p && p.masteryLevel) || 1;

    // Filter available blessings unlocked up to player's permanent mastery level
    const available = STARTER_BLESSINGS.filter(b => (b.unlockLevel || 1) <= mLevel);
    const shuffled = [...available].sort(() => 0.5 - Math.random());
    const choices = shuffled.slice(0, 3);

    // If fewer than 3, complete with tier 1 commons
    if (choices.length < 3) {
      const commons = STARTER_BLESSINGS.filter(b => (b.tier || 1) === 1);
      for (const c of commons) {
        if (!choices.some(x => x.id === c.id)) {
          choices.push(c);
          if (choices.length >= 3) break;
        }
      }
    }

    const grid = document.querySelector(".starter-blessings-grid");
    if (grid) {
      grid.innerHTML = choices.map(b => `
        <div class="starter-option-row tier-${b.tier || 1}" onclick="selectStarterBlessing('${b.id}')">
          <div class="starter-opt-left">
            <div class="starter-opt-icon">${b.icon}</div>
            <div class="starter-opt-tier">${b.tierLabel || ('T' + b.tier)}</div>
          </div>
          <div class="starter-opt-info">
            <div class="starter-opt-title">${b.name.toUpperCase()}</div>
            <div class="starter-opt-desc">${b.desc}</div>
          </div>
        </div>
      `).join("");
    }

    const modal = document.getElementById("screen-starter-blessing");
    if (modal) {
      modal.classList.remove("hidden");
      try { playLevelUpSound(); } catch (_) {}
    } else {
      initFloor();
    }
  }
  window.showStarterBlessingModal = showStarterBlessingModal;

  function selectStarterBlessing(id) {
    const blessing = STARTER_BLESSINGS.find(b => b.id === id);
    if (!blessing) {
      initFloor();
      return;
    }
    const p = gameState.player;
    p.starterBlessing = blessing;
    if (typeof blessing.apply === "function") {
      blessing.apply(p);
    }
    addLog(`✨ ¡Elegiste la Bendición del Destino! ${blessing.icon} ${blessing.name} incrustada en tu Medallón.`, "critical");
    updatePlayerAccSlot();
    updateHud();

    const modal = document.getElementById("screen-starter-blessing");
    if (modal) modal.classList.add("hidden");

    initFloor();
  }
  window.selectStarterBlessing = selectStarterBlessing;

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
    // --- TIER 1: COMÚN (Nvl 1-2) ---
    {
      id: "iron_pendant",
      name: "Colgante de Hierro",
      icon: "🛡️",
      tier: 1,
      unlockLevel: 1,
      price: 22,
      desc: "+1 DEF de armadura permanente en todos los combates.",
      apply: (p) => { p.def += 1; }
    },
    {
      id: "warriors_ring",
      name: "Anillo del Gladiador",
      icon: "⚔️",
      tier: 1,
      unlockLevel: 1,
      price: 25,
      desc: "+1 PWR permanente de ataque base en cada mano.",
      apply: (p) => { p.pwr += 1; }
    },
    {
      id: "guardian_quartz",
      name: "Cuarzo Guardián",
      icon: "💎",
      tier: 1,
      unlockLevel: 1,
      price: 25,
      desc: "Comienza cada piso con +6 de Escudo azul protector adicional.",
      apply: () => {}
    },
    {
      id: "golden_purse",
      name: "Bolsa del Avaro",
      icon: "💰",
      tier: 1,
      unlockLevel: 1,
      price: 30,
      desc: "+20% de Oro extra tras liquidar a cada rival de la torre.",
      apply: () => {}
    },
    {
      id: "bone_die",
      name: "Dado de Hueso",
      icon: "🎲",
      tier: 1,
      unlockLevel: 1,
      price: 20,
      desc: "Otorga +1 Reroll gratuito al inicio de cada piso.",
      apply: () => {}
    },
    {
      id: "eternal_potion",
      name: "Poción Eterna",
      icon: "🧪",
      tier: 1,
      unlockLevel: 2,
      price: 28,
      desc: "Al comenzar cada piso, recibes +1 Poción Curativa si tienes 0.",
      apply: () => {}
    },

    // --- TIER 2: RARA (Nvl 2-4) ---
    {
      id: "shadow_cloak",
      name: "Manto de Sombras",
      icon: "🌑",
      tier: 2,
      unlockLevel: 2,
      price: 35,
      desc: "25% de probabilidad de esquivar el contragolpe rival si pierdes la mano.",
      apply: () => {}
    },
    {
      id: "rider_spur",
      name: "Espuela del Jinete",
      icon: "👞",
      tier: 2,
      unlockLevel: 3,
      price: 32,
      desc: "La primera mano de cada piso inflige +5 de daño directo garantizado.",
      apply: () => {}
    },
    {
      id: "bloody_chalice",
      name: "Cáliz Sangriento",
      icon: "🍷",
      tier: 2,
      unlockLevel: 3,
      price: 38,
      desc: "Drenas +3 HP del rival cada vez que ganas una mano con valor impar.",
      apply: () => {}
    },
    {
      id: "copper_amulet",
      name: "Amuleto de Cobre",
      icon: "💍",
      tier: 2,
      unlockLevel: 3,
      price: 30,
      desc: "Si empatas una mano (Push), ganas +2 de Escudo azul en lugar de nada.",
      apply: () => {}
    },
    {
      id: "golden_horseshoe",
      name: "Herradura de Oro",
      icon: "🧾",
      tier: 2,
      unlockLevel: 4,
      price: 40,
      desc: "Los sobres arcanos en la tienda cuestan 10 monedas menos.",
      apply: () => {}
    },
    {
      id: "fury_bracer",
      name: "Brazal de Furia",
      icon: "🥊",
      tier: 2,
      unlockLevel: 4,
      price: 36,
      desc: "Cada mano consecutiva que ganes aumenta tu PWR en +1 (se resetea al perder).",
      apply: () => {}
    },
    {
      id: "hourglass_time",
      name: "Reloj de Arena",
      icon: "⏳",
      tier: 2,
      unlockLevel: 4,
      price: 35,
      desc: "Si sufres BUST (>21), tienes 50% de probabilidad de no recibir daño esa ronda.",
      apply: () => {}
    },

    // --- TIER 3: ÉPICA (Nvl 5-8) ---
    {
      id: "mirror_shield",
      name: "Escudo de Espejo",
      icon: "🪞",
      tier: 3,
      unlockLevel: 5,
      price: 45,
      desc: "Refleja el 30% del daño recibido de vuelta a la salud enemiga.",
      apply: () => {}
    },
    {
      id: "titan_heart",
      name: "Corazón de Titán",
      icon: "🫀",
      tier: 3,
      unlockLevel: 5,
      price: 50,
      desc: "+30 Salud Máxima y cura +15 HP al instante de comprarlo; +4 HP por mano ganada.",
      apply: (p) => { p.maxHp += 30; p.hp = Math.min(p.maxHp, p.hp + 15); }
    },
    {
      id: "behemoth_fang",
      name: "Colmillo de Behemoth",
      icon: "🦴",
      tier: 3,
      unlockLevel: 5,
      price: 48,
      desc: "Ignora 3 puntos de la armadura (DEF) de todos los rivales de la torre.",
      apply: () => {}
    },
    {
      id: "thorn_crown",
      name: "Corona de Espinas",
      icon: "👑",
      tier: 3,
      unlockLevel: 6,
      price: 52,
      desc: "Cuando recibes un golpe rival, el enemigo sufre 5 de daño punzante inmediato.",
      apply: () => {}
    },
    {
      id: "holy_grail",
      name: "Cáliz Sagrado 21",
      icon: "🏆",
      tier: 3,
      unlockLevel: 7,
      price: 60,
      desc: "Todo Blackjack suma +10 de daño devastador y restaura +10 HP.",
      apply: () => {}
    },
    {
      id: "necromancer_orb",
      name: "Orbe del Nigromante",
      icon: "🔮",
      tier: 3,
      unlockLevel: 8,
      price: 55,
      desc: "Cada rival derrotado otorga +30% EXP para subir de nivel más rápido.",
      apply: (p) => { p.expMultiplier = (p.expMultiplier || 1) * 1.30; }
    },
    {
      id: "midas_gauntlet",
      name: "Guantelete de Midas",
      icon: "🧣",
      tier: 3,
      unlockLevel: 8,
      price: 58,
      desc: "Convierte el 10% del daño que infliges directamente en monedas de oro.",
      apply: () => {}
    },

    // --- TIER 4: MÍTICA / LEGENDARIA (Nvl 9-10) ---
    {
      id: "easter_bell",
      name: "Campana de Pascua",
      icon: "🔔",
      tier: 4,
      unlockLevel: 9,
      price: 65,
      desc: "Elimina permanentemente todo Veneno y Quemadura al inicio de cada piso.",
      apply: () => {}
    },
    {
      id: "philosophers_stone",
      name: "Piedra Filosofal",
      icon: "💎",
      tier: 4,
      unlockLevel: 9,
      price: 70,
      desc: "Al superar un piso, duplica el 20% del oro que tengas acumulado.",
      apply: () => {}
    },
    {
      id: "valhalla_helm",
      name: "Yelmo de Valhalla",
      icon: "🪖",
      tier: 4,
      unlockLevel: 10,
      price: 80,
      desc: "+4 DEF permanente y reduce todo el daño sufrido a un máximo de 20 por golpe.",
      apply: (p) => { p.def += 4; }
    },
    {
      id: "glory_hand",
      name: "Mano de Gloria",
      icon: "🕯️",
      tier: 4,
      unlockLevel: 10,
      price: 90,
      desc: "Blackjack con As de Picas o Diamantes ejecuta al rival si tiene <30% HP.",
      apply: () => {}
    },
    {
      id: "infinity_ring",
      name: "Anillo del Infinito",
      icon: "♾️",
      tier: 4,
      unlockLevel: 10,
      price: 100,
      desc: "+2 PWR, +2 DEF, +30 HP Máx y +2 Rerolls en cada piso de la torre.",
      apply: (p) => { p.pwr += 2; p.def += 2; p.maxHp += 30; p.hp = Math.min(p.maxHp, p.hp + 30); }
    }
  ];
  window.SHOP_ARTIFACTS = SHOP_ARTIFACTS;
  SHOP_ARTIFACTS.forEach(a => {
    if (!a.rarity) {
      if (a.tier === 1) a.rarity = "common";
      else if (a.tier === 2) a.rarity = "rare";
      else if (a.tier === 3) a.rarity = "epic";
      else a.rarity = "legendary";
    }
  });

  function normalizeArtifact(art) {
    if (!art) return null;
    if (typeof art === "object" && art.name && art.icon) {
      return art;
    }
    const id = typeof art === "string" ? art : (art.id || "");
    if (typeof SHOP_ARTIFACTS !== "undefined") {
      const found = SHOP_ARTIFACTS.find(a => a.id === id);
      if (found) return { id: found.id, name: found.name, icon: found.icon, desc: found.desc || "" };
    }
    if (typeof ALL_RELICS !== "undefined") {
      const foundRelic = ALL_RELICS.find(r => r.id === id);
      if (foundRelic) return { id: foundRelic.id, name: foundRelic.name, icon: foundRelic.icon, desc: foundRelic.desc || "" };
    }
    const cleanName = id ? id.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()) : "Artefacto Antiguo";
    return { id: id || "artifact", name: cleanName, icon: "🎴", desc: "Artefacto arcano de la Torre." };
  }
  window.normalizeArtifact = normalizeArtifact;

  function getFloorShopArtifacts() {
    if (!gameState.cachedShopArtifacts || gameState.shopOfferingsFloor !== gameState.floor) {
      gameState.shopOfferingsFloor = gameState.floor;
      const p = gameState.player;
      const heroClass = (p && p.class) ? p.class : "knight";
      const meta = (typeof getHeroMeta === "function") ? getHeroMeta() : {};
      const heroMeta = meta[heroClass] || { totalExp: 0, masteryLevel: 1 };
      const mLevel = heroMeta.level || heroMeta.masteryLevel || (p && p.masteryLevel) || 1;

      // Desbloqueo dinámico por nivel de maestría permanente
      const unlocked = SHOP_ARTIFACTS.filter(a => (a.unlockLevel || 1) <= mLevel);
      const unowned = unlocked.filter(a => !hasArtifact(a.id));
      const pool = unowned.length >= 3 ? unowned : (unlocked.length > 0 ? unlocked : SHOP_ARTIFACTS.slice(0, 5));
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      gameState.cachedShopArtifacts = shuffled.slice(0, 3);
    }
    return gameState.cachedShopArtifacts;
  }
  window.getFloorShopArtifacts = getFloorShopArtifacts;

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
      name: "Filo de Sangre (2 al 5)",
      icon: "🗡️",
      tier: "common",
      tierLabel: "COMÚN",
      unlockLevel: 1,
      price: 55,
      desc: "Cartas 2, 3, 4 y 5 otorgan +2 de daño de corte al jugarse en tu mano."
    },
    {
      id: "armored_cards",
      name: "Placas de Muralla (6 al 8)",
      icon: "🛡️",
      tier: "common",
      tierLabel: "COMÚN",
      unlockLevel: 1,
      price: 60,
      desc: "Cartas 6, 7 y 8 generan +2 de Escudo azul protector al momento de robarlas."
    },
    {
      id: "royal_prosperity",
      name: "Nobleza Próspera (J, Q, K)",
      icon: "👑",
      tier: "rare",
      tierLabel: "RARA",
      unlockLevel: 2,
      price: 65,
      desc: "Cada Figura (J, Q, K) te premia con +2 de Oro y restaura +2 HP al entrar a tu mano."
    },
    {
      id: "vampiric_seven",
      name: "Sello Vampírico del 7",
      icon: "🩸",
      tier: "rare",
      tierLabel: "RARA",
      unlockLevel: 3,
      price: 70,
      desc: "Toda carta 7 absorbe 4 HP del rival y te los transfiere directamente a tu salud."
    },
    {
      id: "devastating_pair",
      name: "Dupla Devastadora",
      icon: "👯",
      tier: "rare",
      tierLabel: "RARA",
      unlockLevel: 4,
      price: 70,
      desc: "Toda pareja de naipes iguales en mano suma +5 de daño adicional a tu ataque."
    },
    {
      id: "fortune_clover",
      name: "Tréboles de Fortuna",
      icon: "♣",
      tier: "rare",
      tierLabel: "RARA",
      unlockLevel: 4,
      price: 65,
      desc: "Toda carta del palo Trébol otorga +2 de Oro extra al entrar a tu mano."
    },
    {
      id: "healing_hearts",
      name: "Corazones Sanadores",
      icon: "♥",
      tier: "rare",
      tierLabel: "RARA",
      unlockLevel: 5,
      price: 75,
      desc: "Toda carta del palo Corazones restaura +2 HP inmediatos al momento de robarla."
    },
    {
      id: "piercing_spades",
      name: "Picas Cortantes",
      icon: "♠",
      tier: "mythic",
      tierLabel: "MÍTICA",
      unlockLevel: 6,
      price: 85,
      desc: "Toda carta del palo Picas ignora 2 puntos de armadura (DEF) del rival."
    },
    {
      id: "fortified_diamonds",
      name: "Diamantes Reforzados",
      icon: "♦",
      tier: "mythic",
      tierLabel: "MÍTICA",
      unlockLevel: 6,
      price: 85,
      desc: "Toda carta del palo Diamantes genera +3 de Escudo azul protector al robarla."
    },
    {
      id: "astral_ace",
      name: "As Astral del 21",
      icon: "✨",
      tier: "mythic",
      tierLabel: "MÍTICA",
      unlockLevel: 7,
      price: 70,
      desc: "Los Ases canalizan energía astral: si alcanzas 21, tu daño crítico se amplifica x1.5 extra."
    },
    {
      id: "phoenix_card",
      name: "Carta Fénix de Salvación",
      icon: "🔥",
      tier: "mythic",
      tierLabel: "LEGENDARIA",
      unlockLevel: 8,
      price: 85,
      desc: "Una vez por piso, si una carta te causa BUST (pasar de 21), su valor se transmuta en 1."
    }
  ];
  window.CARD_UPGRADES = CARD_UPGRADES;

  /* ============================================================
     SISTEMA DE ENCANTAMIENTO ARCANO: SOBRES Y SELLOS INDIVIDUALES
     ============================================================ */
  const SEAL_ENCHANTMENTS = {
    sharp: {
      id: "sharp",
      name: "Sello Afilado",
      icon: "🗡️",
      element: "blade",
      type: "sharp",
      rarity: "common",
      badge: "AFILADA",
      tagClass: "sharp",
      unlockLevel: 1,
      desc: "Al atacar con esta carta: Añade +4 de filo letal e ignora 2 DEF rival.",
      price: 30
    },
    steel: {
      id: "steel",
      name: "Sello de Acero",
      icon: "🛡️",
      element: "shield",
      type: "steel",
      rarity: "common",
      badge: "ACERO",
      tagClass: "steel",
      unlockLevel: 1,
      desc: "Al entrar en mano: Otorga +6 de Escudo azul protector.",
      price: 30
    },
    healing: {
      id: "healing",
      name: "Sello Restaurador",
      icon: "💖",
      element: "blood",
      type: "healing",
      rarity: "common",
      badge: "RESTAURADOR",
      tagClass: "healing",
      unlockLevel: 1,
      desc: "Al entrar en mano: Restaura +6 HP de salud de inmediato.",
      price: 30
    },
    ignite: {
      id: "ignite",
      name: "Sello Ígneo",
      icon: "🔥",
      element: "fire",
      type: "ignite",
      rarity: "rare",
      badge: "ÍGNEO",
      tagClass: "ignite",
      unlockLevel: 1,
      desc: "Al jugarse: Aplica Quemadura (4 daño/asalto) y quema 1 de armadura rival.",
      price: 30
    },
    poison: {
      id: "poison",
      name: "Sello de Cicuta",
      icon: "☠️",
      element: "toxic",
      type: "poison",
      rarity: "rare",
      badge: "VENENO",
      tagClass: "poison",
      unlockLevel: 1,
      desc: "Al entrar en mano: Inocula +3 de Veneno acumulativo al enemigo.",
      price: 30
    },
    vampiric: {
      id: "vampiric",
      name: "Sello Vampírico",
      icon: "🩸",
      element: "blood",
      type: "vampiric",
      rarity: "epic",
      badge: "VAMPÍRICO",
      tagClass: "vampiric",
      unlockLevel: 3,
      desc: "Al jugarse esta carta: Drena 4 HP del rival y restaura tu salud.",
      price: 30
    },
    fury: {
      id: "fury",
      name: "Sello de Furia",
      icon: "⚔️",
      element: "blade",
      type: "fury",
      rarity: "rare",
      badge: "FURIA",
      tagClass: "fury",
      unlockLevel: 3,
      desc: "Al atacar con esta carta: Añade +5 de daño de impacto directo.",
      price: 30
    },
    malleable: {
      id: "malleable",
      name: "Sello Maleable",
      icon: "🔮",
      element: "arcane",
      type: "malleable",
      rarity: "epic",
      badge: "MALEABLE",
      tagClass: "malleable",
      unlockLevel: 3,
      desc: "Autoajuste inteligente ±1: Si te pasas reduce -1 para evitar BUST; si estás en 20 suma +1 para dar 21.",
      price: 30
    },
    gold: {
      id: "gold",
      name: "Sello Dorado",
      icon: "🪙",
      element: "fortune",
      type: "gold",
      rarity: "rare",
      badge: "DORADO",
      tagClass: "gold",
      unlockLevel: 3,
      desc: "Al jugarse esta carta: Otorga inmediatamente +5 de Oro.",
      price: 30
    },
    astral: {
      id: "astral",
      name: "Sello Astral",
      icon: "✨",
      element: "arcane",
      type: "astral",
      rarity: "legendary",
      badge: "ASTRAL",
      tagClass: "astral",
      unlockLevel: 6,
      desc: "Si alcanzas 21 con esta carta: Duplica x2 el daño total de Blackjack.",
      price: 30
    },
    thunder: {
      id: "thunder",
      name: "Sello del Trueno",
      icon: "⚡",
      element: "storm",
      type: "thunder",
      rarity: "epic",
      badge: "TRUENO",
      tagClass: "thunder",
      unlockLevel: 6,
      desc: "Al atacar con esta carta: Desata relámpago (+3 daño) y aturde al rival para que no contraataque.",
      price: 30
    },
    glacial: {
      id: "glacial",
      name: "Sello Glacial",
      icon: "❄️",
      element: "ice",
      type: "glacial",
      rarity: "epic",
      badge: "GLACIAL",
      tagClass: "glacial",
      unlockLevel: 6,
      desc: "Al entrar en mano: Congela al rival reduciendo su PWR en 1 y genera +4 de Escudo azul.",
      price: 30
    },
    phoenix: {
      id: "phoenix",
      name: "Sello Fénix",
      icon: "🔥",
      element: "fire",
      type: "phoenix",
      rarity: "legendary",
      badge: "FÉNIX",
      tagClass: "phoenix",
      unlockLevel: 9,
      desc: "Salvación divina: Si esta carta causara BUST (>21), su valor se transmuta en 1.",
      price: 30
    },
    void: {
      id: "void",
      name: "Sello del Vacío",
      icon: "🌑",
      element: "darkness",
      type: "void",
      rarity: "legendary",
      badge: "VACÍO",
      tagClass: "void",
      unlockLevel: 9,
      desc: "Al entrar en mano: Distorsiona la realidad causando 4 daño sombrío directo e ignorando toda armadura.",
      price: 30
    }
  };
  window.SEAL_ENCHANTMENTS = SEAL_ENCHANTMENTS;

  /* ============================================================
     MOTOR DE APERTURA DE SOBRES — ESTILO BALATRO / POKÉMON (FASE 2)
     ============================================================ */
  const RARITY_CONFIG = {
    common: { id: "common", label: "COMÚN", color: "#94a3b8", badgeClass: "common", weight: 1 },
    rare: { id: "rare", label: "RARA", color: "#38bdf8", badgeClass: "rare", weight: 2 },
    epic: { id: "epic", label: "ÉPICA", color: "#c084fc", badgeClass: "epic", weight: 3 },
    legendary: { id: "legendary", label: "LEGENDARIA", color: "#facc15", badgeClass: "legendary", weight: 4 }
  };
  window.RARITY_CONFIG = RARITY_CONFIG;

  function getPackOdds(level, floor) {
    const fl = floor || (gameState && gameState.floor) || 1;
    const lvl = level || (gameState && gameState.player && gameState.player.level) || 1;
    let common, rare, epic, legendary;
    if (fl <= 3) {
      common = 70; rare = 25; epic = 5; legendary = 0;
    } else if (fl <= 8) {
      common = 45; rare = 40; epic = 13; legendary = 2;
    } else {
      common = 25; rare = 45; epic = 22; legendary = 8;
    }
    // Bono por nivel de héroe: a mayor nivel, mejores cartas y menos comunes
    if (lvl > 1) {
      const steps = Math.min(4, lvl - 1);
      const epicBonus = steps * 1.5;
      const legBonus = steps * 0.5;
      epic += epicBonus;
      legendary += legBonus;
      common = Math.max(10, common - (epicBonus + legBonus));
    }
    const sum = common + rare + epic + legendary;
    return {
      common: Math.round((common / sum) * 100),
      rare: Math.round((rare / sum) * 100),
      epic: Math.round((epic / sum) * 100),
      legendary: Math.round((legendary / sum) * 100)
    };
  }
  window.getPackOdds = getPackOdds;

  function rollRarity(level, floor, forceMinRarity) {
    if (forceMinRarity) return forceMinRarity;
    const odds = getPackOdds(level, floor);
    const roll = Math.random() * 100;
    if (roll < odds.legendary) return "legendary";
    if (roll < odds.legendary + odds.epic) return "epic";
    if (roll < odds.legendary + odds.epic + odds.rare) return "rare";
    return "common";
  }
  window.rollRarity = rollRarity;

  let currentActivePack = null;
  let activeBoosterPack = null;

  function generatePackOptions(packType, level, floor) {
    const fl = floor || (gameState && gameState.floor) || 1;
    const lvl = level || (gameState && gameState.player && gameState.player.level) || 1;
    if (!gameState.pityPacksWithoutEpic) gameState.pityPacksWithoutEpic = 0;
    const forceEpicPity = gameState.pityPacksWithoutEpic >= 4;

    const items = [];
    const usedIds = new Set();

    if (packType === "artifacts") {
      const playerArts = (gameState.player && gameState.player.artifacts) || [];
      for (let i = 0; i < 3; i++) {
        let targetRarity = rollRarity(lvl, fl);
        if (i === 0 && forceEpicPity) {
          targetRarity = Math.random() < 0.2 ? "legendary" : "epic";
        }
        let pool = SHOP_ARTIFACTS.filter(a => (a.rarity || "common") === targetRarity && !usedIds.has(a.id) && !playerArts.includes(a.id));
        if (pool.length === 0) {
          pool = SHOP_ARTIFACTS.filter(a => !usedIds.has(a.id) && !playerArts.includes(a.id));
        }
        if (pool.length === 0) {
          pool = SHOP_ARTIFACTS.filter(a => !usedIds.has(a.id));
        }
        if (pool.length === 0) pool = SHOP_ARTIFACTS;
        const chosen = pool[Math.floor(Math.random() * pool.length)];
        usedIds.add(chosen.id);
        const resolvedRarity = chosen.rarity || targetRarity;
        const rConf = RARITY_CONFIG[resolvedRarity] || RARITY_CONFIG.common;
        items.push({
          type: "artifact",
          id: chosen.id,
          name: chosen.name,
          icon: chosen.icon,
          desc: chosen.desc,
          rarity: resolvedRarity,
          rarityLabel: rConf.label,
          apply: chosen.apply
        });
      }
    } else if (packType === "accessories") {
      const accKeys = Object.keys(AMULET_INFO);
      for (let i = 0; i < 3; i++) {
        let targetRarity = rollRarity(lvl, fl);
        if (i === 0 && forceEpicPity) {
          targetRarity = Math.random() < 0.2 ? "legendary" : "epic";
        }
        let pool = accKeys.filter(k => (AMULET_INFO[k].rarity || "common") === targetRarity && !usedIds.has(k));
        if (pool.length === 0) {
          pool = accKeys.filter(k => !usedIds.has(k));
        }
        if (pool.length === 0) pool = accKeys;
        const chosenKey = pool[Math.floor(Math.random() * pool.length)];
        usedIds.add(chosenKey);
        const acc = AMULET_INFO[chosenKey];
        const resolvedRarity = acc.rarity || targetRarity;
        const rConf = RARITY_CONFIG[resolvedRarity] || RARITY_CONFIG.common;
        items.push({
          type: "accessory",
          id: chosenKey,
          name: acc.name,
          icon: acc.icon,
          desc: acc.desc,
          rarity: resolvedRarity,
          rarityLabel: rConf.label
        });
      }
    } else if (packType === "arcane_group") {
      // SPRINT 3 + TAHÚR: Forja Arquetípica de Lote (3 arquetipos, eliges 1 para todo el grupo)
      const archetypes = generateArchetypeBlessings(lvl, fl, forceEpicPity);
      for (const item of archetypes) items.push(item);
    } else {
      // SOBRE DE SELLOS ARCANOS ORDINARIO: 3 sellos para encantar 1 carta individual
      const sealKeys = Object.keys(SEAL_ENCHANTMENTS);
      for (let i = 0; i < 3; i++) {
        let targetRarity = rollRarity(lvl, fl);
        if (i === 0 && forceEpicPity) {
          targetRarity = Math.random() < 0.2 ? "legendary" : "epic";
        }
        let pool = sealKeys.filter(k => (SEAL_ENCHANTMENTS[k].rarity || "common") === targetRarity && !usedIds.has(k));
        if (pool.length === 0) pool = sealKeys.filter(k => !usedIds.has(k));
        if (pool.length === 0) pool = sealKeys;
        const chosenKey = pool[Math.floor(Math.random() * pool.length)];
        usedIds.add(chosenKey);
        const seal = SEAL_ENCHANTMENTS[chosenKey];
        const resolvedRarity = seal.rarity || targetRarity;
        const rConf = RARITY_CONFIG[resolvedRarity] || RARITY_CONFIG.common;
        items.push({
          type: "seal",
          id: chosenKey,
          seal: seal,
          name: seal.name,
          icon: seal.icon,
          desc: seal.desc,
          rarity: resolvedRarity,
          rarityLabel: rConf.label
        });
      }
    }

    // Actualizar contador de pity
    const hasEpicPlus = items.some(x => x.rarity === "epic" || x.rarity === "legendary");
    if (hasEpicPlus) {
      gameState.pityPacksWithoutEpic = 0;
    } else {
      gameState.pityPacksWithoutEpic += 1;
    }

    return items;
  }
  window.generatePackOptions = generatePackOptions;

  /* ============================================================
     SPRINT 3: FORJA ARQUETÍPICA DE LOTE (YUNQUE DE LOS ANTIGUOS)
     En lugar de encantar 1 carta de 3 candidatas, el jugador elige
     1 de 3 BENDICIONES ARQUETÍPICAS y graba el sello en TODAS las
     cartas que cumplan el patrón (rango, figuras o palo completo).
     ============================================================ */
  function generateArchetypeBlessings(level, floor, forceEpicPity) {
    const lvl = level || (gameState && gameState.player && gameState.player.level) || 1;

    // OBS7: un sello solo puede ofrecerse si su nivel de desbloqueo está alcanzado
    const unlocked = Object.keys(SEAL_ENCHANTMENTS).filter(k => (SEAL_ENCHANTMENTS[k].unlockLevel || 1) <= lvl);
    const pool = unlocked.length ? unlocked
      : Object.keys(SEAL_ENCHANTMENTS).filter(k => (SEAL_ENCHANTMENTS[k].unlockLevel || 1) <= 1);
    const usedSeals = new Set();

    const pickSeal = (forceRarity) => {
      let free = pool.filter(k => !usedSeals.has(k));
      if (forceRarity) {
        const exact = free.filter(k => (SEAL_ENCHANTMENTS[k].rarity || "common") === forceRarity);
        if (exact.length) {
          free = exact;
        } else {
          const order = forceRarity === "legendary"
            ? ["legendary", "epic", "rare", "common"]
            : ["epic", "legendary", "rare", "common"];
          for (const t of order) {
            const cand = free.filter(k => (SEAL_ENCHANTMENTS[k].rarity || "common") === t);
            if (cand.length) { free = cand; break; }
          }
        }
      }
      if (!free.length) free = pool;
      const key = free[Math.floor(Math.random() * free.length)];
      usedSeals.add(key);
      return SEAL_ENCHANTMENTS[key];
    };

    const numericRanks = ["2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const rank = numericRanks[Math.floor(Math.random() * numericRanks.length)];
    const figuresInsteadOfAces = Math.random() < 0.5;
    const suits = [
      { suit: "♥", name: "CORAZONES" },
      { suit: "♦", name: "DIAMANTES" },
      { suit: "♠", name: "PICAS" },
      { suit: "♣", name: "TREBOLES" }
    ];
    const su = suits[Math.floor(Math.random() * suits.length)];

    const targets = [
      {
        kind: "ranks", ranks: [rank],
        title: "TODOS LOS " + rank,
        hint: "las 4 cartas de valor " + rank,
        count: 4
      },
      figuresInsteadOfAces
        ? {
            kind: "ranks", ranks: ["J", "Q", "K"],
            title: "TODAS LAS FIGURAS",
            hint: "las 12 figuras (J, Q y K)",
            count: 12
          }
        : {
            kind: "ranks", ranks: ["A"],
            title: "TODOS LOS ASES",
            hint: "las 4 cartas de valor A",
            count: 4
          },
      {
        kind: "suit", suit: su.suit,
        title: "PALO DE " + su.name,
        hint: "las 13 cartas de " + su.name,
        count: 13
      }
    ];

    return targets.map((t, idx) => {
      const forced = (idx === 0 && forceEpicPity) ? (Math.random() < 0.2 ? "legendary" : "epic") : null;
      const seal = pickSeal(forced);
      const rarity = seal.rarity || "common";
      const rConf = RARITY_CONFIG[rarity] || RARITY_CONFIG.common;
      return {
        type: "archetype",
        id: "arch_" + idx + "_" + seal.id,
        name: t.title,
        icon: seal.icon,
        desc: seal.icon + " " + seal.name + " (" + seal.badge + ") — graba el sello en " + t.hint + " de tu mazo.",
        rarity: rarity,
        rarityLabel: rConf.label,
        seal: seal,
        target: t
      };
    });
  }
  window.generateArchetypeBlessings = generateArchetypeBlessings;

  let forgeResultRedirect = null;

  function showForgeResult(opts) {
    opts = opts || {};
    forgeResultRedirect = opts.redirect || null;
    const modal = document.getElementById("screen-forge-result");
    const title = document.getElementById("forge-result-title");
    const desc = document.getElementById("forge-result-desc");
    if (title) title.innerHTML = opts.title || "";
    if (desc) desc.innerHTML = opts.desc || "";
    if (modal) modal.classList.remove("hidden");
  }
  window.showForgeResult = showForgeResult;

  function closeForgeResult() {
    const modal = document.getElementById("screen-forge-result");
    if (modal) modal.classList.add("hidden");
    const redirect = forgeResultRedirect;
    forgeResultRedirect = null;
    if (redirect === "postCombat") {
      if (typeof showChronicleModal === "function") showChronicleModal();
    } else if (redirect === "shop") {
      if (typeof showShopModal === "function") showShopModal();
    }
  }
  window.closeForgeResult = closeForgeResult;

  function applyArchetypeBlessing(blessing, redirect) {
    const p = gameState.player;
    if (!p || !blessing || !blessing.seal || !blessing.target) return false;
    if (!p.cardEnchantments) p.cardEnchantments = {};

    const t = blessing.target;
    let count = 0;
    buildStandardDeck().forEach(card => {
      const matches = (t.kind === "suit") ? (card.suit === t.suit) : (t.ranks.indexOf(card.rank) !== -1);
      if (!matches) return;
      const cid = card.suit + "_" + card.rank;
      p.cardEnchantments[cid] = Object.assign({}, blessing.seal);
      count++;
    });
    if (count <= 0) return false;

    try { playEnchantChimeSound(); } catch (_) {}
    try { triggerHaptic("blackjack"); } catch (_) {}
    try { spawnFloatingText("stage", "✨ " + count + " CARTAS", "crit"); } catch (_) {}

    const seal = blessing.seal;
    addLog("🔨 ¡FORJA ARQUETÍPICA! " + seal.icon + " " + seal.name + " grabado en " + count + " cartas (" + t.title + ").", "critical");
    saveMidRunState();
    if (typeof updateHud === "function") updateHud();

    showForgeResult({
      title: "✨ ¡" + count + " CARTAS ENCANTADAS EN TU MAZO!",
      desc: "<b>" + seal.icon + " " + seal.name + "</b> (" + seal.badge + ") ahora marca " + t.hint + ".<br><span style=\"font-size: 9px;color:#94a3b8;\">Se restaura el sello de Maestría de cada carta al iniciar una nueva partida.</span>",
      redirect: redirect || "shop"
    });
    return true;
  }
  window.applyArchetypeBlessing = applyArchetypeBlessing;

  function openBoosterPackBySource(packType, options) {
    options = options || {};
    const p = gameState.player;
    if (!p) return;

    let baseCost = 40;
    if (packType === "arcane") baseCost = hasArtifact("golden_horseshoe") ? 45 : 55;
    else if (packType === "artifacts") baseCost = hasArtifact("golden_horseshoe") ? 32 : 40;
    else if (packType === "accessories") baseCost = 40;

    const isFree = !!options.free;
    const packCost = isFree ? 0 : baseCost;

    if (!isFree && gameState.gold < packCost) {
      addLog("Oro insuficiente: necesitas " + packCost + " monedas de oro.", "warning");
      spawnFloatingText("screen-shop", `⚠️ ORO INSUFICIENTE (${packCost} 🪙)`, "warning");
      try { playBustSound(); } catch (_) {}
      return;
    }

    if (!isFree) {
      gameState.gold -= packCost;
      try { playCoinSound(); } catch (_) {}
    }

    const items = generatePackOptions(packType, p.level || 1, gameState.floor || 1);
    const refundAmt = isFree ? 0 : Math.max(1, Math.floor(packCost * 0.20));

    currentActivePack = {
      packType: packType,
      cost: packCost,
      refundAmt: refundAmt,
      items: items,
      isRipped: false,
      source: options.source || "shop"
    };

    // Renderizar modal de apertura de sobre
    const modal = document.getElementById("screen-pack-open");
    const badgeEl = document.getElementById("pack-badge-pill");
    const foilCard = document.getElementById("pack-foil-card");
    const foilArt = document.getElementById("pack-foil-art");
    const foilTitle = document.getElementById("pack-foil-title");
    const foilSub = document.getElementById("pack-foil-subtitle");
    const foilContainer = document.getElementById("pack-foil-container");
    const cardsContainer = document.getElementById("pack-cards-container");
    const refundEl = document.getElementById("pack-refund-amt");
    const packInstructions = document.getElementById("pack-instructions");

    if (packType === "artifacts") {
      if (badgeEl) badgeEl.innerText = "🎴 SOBRE DE ARTEFACTOS";
      if (foilArt) foilArt.innerText = "🎴";
      if (foilTitle) foilTitle.innerText = "SOBRE DE ARTEFACTOS";
      if (foilSub) foilSub.innerText = "CONTIENE 3 ARTEFACTOS • ELIGE 1";
      if (packInstructions) packInstructions.innerText = "✨ Selecciona 1 de las 3 recompensas reveladas:";
    } else if (packType === "accessories") {
      if (badgeEl) badgeEl.innerText = "💍 SOBRE DE ACCESORIOS";
      if (foilArt) foilArt.innerText = "💍";
      if (foilTitle) foilTitle.innerText = "SOBRE DE ACCESORIOS";
      if (foilSub) foilSub.innerText = "CONTIENE 3 AMULETOS • ELIGE 1";
      if (packInstructions) packInstructions.innerText = "✨ Selecciona 1 de las 3 recompensas reveladas:";
    } else if (packType === "arcane_group") {
      if (badgeEl) badgeEl.innerText = "🎰 APUESTA GANADA • FORJA ARQUETÍPICA";
      if (foilArt) foilArt.innerText = "⚡🔨";
      if (foilTitle) foilTitle.innerText = "FORJA ARQUETÍPICA DE LOTE";
      if (foilSub) foilSub.innerText = "3 BENDICIONES DE GRUPO • ELIGE 1";
      if (packInstructions) packInstructions.innerText = "✨ Elige 1 Bendición Arquetípica: ¡encantará a TODO el grupo de cartas!";
    } else {
      if (badgeEl) badgeEl.innerText = isFree ? "✨ FORJA • SOBRE GRATUITO" : "📦 SOBRE DE SELLOS ARCANOS";
      if (foilArt) foilArt.innerText = "✨";
      if (foilTitle) foilTitle.innerText = isFree ? "SOBRE DE SELLOS DE LA TORRE" : "SOBRE DE SELLOS ARCANOS";
      if (foilSub) foilSub.innerText = "CONTIENE 3 SELLOS • ELIGE 1 PARA 1 CARTA";
      if (packInstructions) packInstructions.innerText = "✨ Elige 1 Sello Arcano para imbuir en 1 sola carta de tu mazo:";
    }

    if (refundEl) refundEl.innerText = refundAmt;
    if (foilCard) {
      foilCard.classList.remove("shaking", "ripping");
      // Color y brillo según la rareza máxima dentro del sobre (anticipación sensorial)
      const hasLegendary = items.some(x => x.rarity === "legendary");
      const hasEpic = items.some(x => x.rarity === "epic");
      const hasRare = items.some(x => x.rarity === "rare");
      if (hasLegendary) {
        foilCard.style.borderColor = "#facc15";
        foilCard.style.boxShadow = "0 12px 40px rgba(250, 204, 21, 0.5), inset 0 0 25px rgba(250, 204, 21, 0.3)";
      } else if (hasEpic) {
        foilCard.style.borderColor = "#c084fc";
        foilCard.style.boxShadow = "0 12px 35px rgba(192, 132, 252, 0.4), inset 0 0 20px rgba(192, 132, 252, 0.25)";
      } else if (hasRare) {
        foilCard.style.borderColor = "#38bdf8";
        foilCard.style.boxShadow = "0 12px 30px rgba(56, 189, 248, 0.35), inset 0 0 15px rgba(56, 189, 248, 0.2)";
      } else {
        foilCard.style.borderColor = "#94a3b8";
        foilCard.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.7)";
      }
    }

    if (foilContainer) foilContainer.classList.remove("hidden");
    if (cardsContainer) cardsContainer.classList.add("hidden");
    if (modal) modal.classList.remove("hidden");

    updateHud();
    addLog(`📦 Abriste un ${foilTitle ? foilTitle.innerText : 'Sobre'} de la Torre.`, "heal");
  }
  window.openBoosterPackBySource = openBoosterPackBySource;

  // Compatible con llamadas previas
  function openBoosterPack() {
    openBoosterPackBySource("arcane");
  }
  window.openBoosterPack = openBoosterPack;

  function ripBoosterPack() {
    if (!currentActivePack || currentActivePack.isRipped) return;
    currentActivePack.isRipped = true;

    const foilCard = document.getElementById("pack-foil-card");
    const foilContainer = document.getElementById("pack-foil-container");
    const cardsContainer = document.getElementById("pack-cards-container");
    const cardsRow = document.getElementById("pack-cards-row");

    if (foilCard) foilCard.classList.add("shaking");
    try { playPackTearSound(); } catch (_) {}
    try { triggerHaptic("blackjack"); } catch (_) {}

    setTimeout(() => {
      if (foilCard) foilCard.classList.add("ripping");
    }, 200);

    setTimeout(() => {
      if (foilContainer) foilContainer.classList.add("hidden");
      if (!cardsContainer || !cardsRow) return;

      cardsRow.innerHTML = currentActivePack.items.map((item, idx) => `
        <div class="pack-card-item" id="pack-card-${idx}" onclick="choosePackOption(${idx})">
          <div class="pack-card-inner">
            <div class="pack-card-face pack-card-back">
              <div class="pack-card-back-seal">🎴</div>
              <div class="pack-card-back-text">TORRE DEL 21</div>
            </div>
            <div class="pack-card-face pack-card-front rarity-${item.rarity}">
              <div class="pack-card-rarity-badge ${item.rarity}">${item.rarityLabel}</div>
              <div class="pack-card-icon">${item.icon}</div>
              <div class="pack-card-title">${item.name.toUpperCase()}</div>
              <div class="pack-card-desc">${item.desc}</div>
              <button class="pack-card-choose-btn" onclick="event.stopPropagation(); choosePackOption(${idx})">
                ELEGIR ESTA OPCIÓN
              </button>
            </div>
          </div>
        </div>
      `).join("");

      cardsContainer.classList.remove("hidden");

      // Revelación escalonada 3D Flip (0.15s, 0.35s, 0.55s)
      currentActivePack.items.forEach((item, idx) => {
        setTimeout(() => {
          const cardEl = document.getElementById(`pack-card-${idx}`);
          if (cardEl) {
            cardEl.classList.add("flipped");
            try { playCardDealSound(); } catch (_) {}
            if (item.rarity === "epic") {
              try { playEnchantChimeSound(); } catch (_) {}
              spawnFloatingText("stage", "¡ÉPICA!", "crit");
            } else if (item.rarity === "legendary") {
              try { playJackpotSound(); } catch (_) {}
              try { triggerHaptic("blackjack"); } catch (_) {}
              spawnFloatingText("stage", "¡LEGENDARIA!", "crit");
            }
          }
        }, 150 + idx * 200);
      });
    }, 600);
  }
  window.ripBoosterPack = ripBoosterPack;

  function choosePackOption(idx) {
    if (!currentActivePack || !currentActivePack.items || !currentActivePack.items[idx]) return;
    const chosen = currentActivePack.items[idx];
    const isPostCombat = (currentActivePack.source === "postCombat");
    const p = gameState.player;
    if (!p) return;

    if (currentActivePack.packType === "artifacts") {
      if (!p.artifacts) p.artifacts = [];
      const maxSlots = getMaxArtifactSlots();
      if (p.artifacts.length >= maxSlots) {
        const replaced = p.artifacts.shift();
        addLog(`Ranuras al límite: sustituiste [${replaced}] por [${chosen.name}].`, "warning");
      }
      p.artifacts.push(chosen.id);
      if (typeof chosen.apply === "function") {
        try { chosen.apply(p); } catch (e) { console.warn("Error aplicando artefacto:", e); }
      }
      playEnchantChimeSound();
      triggerHaptic("blackjack");
      spawnFloatingText("stage", `✨ ¡${chosen.name}!`, "heal");
      addLog(`🎴 ¡Sobre de Artefactos: Has equipado [${chosen.name}] (${chosen.rarityLabel})!`, "heal");
      closePackOpeningModal();
      saveMidRunState();
      if (isPostCombat) {
        showChronicleModal();
      } else {
        showShopModal();
      }
    } else if (currentActivePack.packType === "accessories") {
      const prev = p.accessory;
      p.accessory = chosen.id;
      playEnchantChimeSound();
      triggerHaptic("blackjack");
      spawnFloatingText("stage", `💍 ¡${chosen.name}!`, "heal");
      if (prev && prev !== chosen.id) {
        addLog(`💍 ¡Sobre de Accesorios: Equipaste [${chosen.name}] (reemplazando el anterior)!`, "heal");
      } else {
        addLog(`💍 ¡Sobre de Accesorios: Equipaste [${chosen.name}] (${chosen.rarityLabel})!`, "heal");
      }
      closePackOpeningModal();
      saveMidRunState();
      if (isPostCombat) {
        showChronicleModal();
      } else {
        showShopModal();
      }
    } else if (currentActivePack.packType === "arcane_group") {
      // SPRINT 3 + TAHÚR: Forja Arquetípica de Lote ganada en la apuesta — encanta todo el grupo
      closePackOpeningModal();
      applyArchetypeBlessing(chosen, isPostCombat ? "postCombat" : "shop");
    } else {
      // SOBRE DE SELLOS ARCANOS ORDINARIO: aplica a 1 sola carta individual
      const sealToApply = chosen.seal || chosen;
      closePackOpeningModal();
      activeBoosterPack = {
        seal: sealToApply,
        candidates: drawCandidatesForEnchantment(),
        source: isPostCombat ? "postCombat" : "shop"
      };
      renderBoosterModal();
    }
  }
  window.choosePackOption = choosePackOption;

  function drawCandidatesForEnchantment() {
    const allCards = buildStandardDeck();
    shuffleArray(allCards);
    return allCards.slice(0, 4);
  }
  window.drawCandidatesForEnchantment = drawCandidatesForEnchantment;

  function skipBoosterPack() {
    if (!currentActivePack) {
      closePackOpeningModal();
      return;
    }
    const isPostCombat = (currentActivePack && currentActivePack.source === "postCombat");
    const refund = currentActivePack.refundAmt || 0;
    if (refund > 0) {
      gameState.gold += refund;
      try { playCoinSound(); } catch (_) {}
      addLog(`Saltaste el sobre y recuperaste +${refund} 🪙 de oro.`, "heal");
      spawnFloatingText("stage", `+${refund} 🪙 REEMBOLSO`, "heal");
    }
    closePackOpeningModal();
    updateHud();
    if (isPostCombat) {
      showChronicleModal();
    } else {
      showShopModal();
    }
  }
  window.skipBoosterPack = skipBoosterPack;

  function closePackOpeningModal() {
    currentActivePack = null;
    const modal = document.getElementById("screen-pack-open");
    if (modal) modal.classList.add("hidden");
  }
  window.closePackOpeningModal = closePackOpeningModal;

  function showPackOddsModal() {
    const modal = document.getElementById("modal-pack-odds");
    const content = document.getElementById("pack-odds-content");
    const pityEl = document.getElementById("pack-pity-notice");
    if (!modal || !content) return;

    const fl = gameState.floor || 1;
    const lvl = (gameState.player && gameState.player.level) || 1;
    const odds = getPackOdds(lvl, fl);
    const pity = gameState.pityPacksWithoutEpic || 0;

    content.innerHTML = `
      <table class="pack-odds-table">
        <thead>
          <tr>
            <th>ZONA</th>
            <th>COMÚN</th>
            <th>RARA</th>
            <th>ÉPICA</th>
            <th>LEGENDARIA</th>
          </tr>
        </thead>
        <tbody>
          <tr style="${fl <= 3 ? 'background:rgba(102,252,241,0.15);font-weight:bold;' : ''}">
            <td>Pisos 1–3</td>
            <td>70%</td>
            <td>25%</td>
            <td>5%</td>
            <td>0%</td>
          </tr>
          <tr style="${fl >= 4 && fl <= 8 ? 'background:rgba(102,252,241,0.15);font-weight:bold;' : ''}">
            <td>Pisos 4–8</td>
            <td>45%</td>
            <td>40%</td>
            <td>13%</td>
            <td>2%</td>
          </tr>
          <tr style="${fl >= 9 ? 'background:rgba(102,252,241,0.15);font-weight:bold;' : ''}">
            <td>Pisos 9–13</td>
            <td>25%</td>
            <td>45%</td>
            <td>22%</td>
            <td>8%</td>
          </tr>
        </tbody>
      </table>
      <div style="font-size: 9px;color:#66fcf1;margin-bottom:8px;padding:4px 6px;background:rgba(102,252,241,0.1);border-radius:4px;">
        📍 <b>Probabilidades actuales (Piso ${fl}, Héroe Nivel ${lvl}):</b><br>
        Común: ${odds.common}% · Rara: ${odds.rare}% · Épica: ${odds.epic}% · Legendaria: ${odds.legendary}%
      </div>
    `;

    if (pityEl) {
      pityEl.innerHTML = `
        🛡️ <b>Garantía de Suerte (Pity Counter):</b><br>
        Llevas <b>${pity} / 4</b> sobres consecutivos sin cartas Épicas o Legendarias.<br>
        ${pity >= 4 ? '<span style="color:#2a9d8f;font-weight:bold;">¡TU PRÓXIMO SOBRE TIENE GARANTIZADA AL MENOS 1 CARTA ÉPICA O LEGENDARIA!</span>' : `Si el contador llega a 4, el 5.º sobre traerá al menos 1 Épica garantizada.`}
      `;
    }

    modal.classList.remove("hidden");
  }
  window.showPackOddsModal = showPackOddsModal;

  function closePackOddsModal(e) {
    if (e && e.target && e.target.closest && e.target.closest(".pack-odds-card") && !e.target.classList.contains("pack-odds-close-btn")) {
      return;
    }
    const modal = document.getElementById("modal-pack-odds");
    if (modal) modal.classList.add("hidden");
  }
  window.closePackOddsModal = closePackOddsModal;

  function renderBoosterModal() {
    if (!activeBoosterPack) return;
    const { seal, candidates, source } = activeBoosterPack;

    const modal = document.getElementById("screen-booster-pack");
    const revealEl = document.getElementById("booster-seal-reveal");
    const candidatesEl = document.getElementById("booster-cards-candidates");
    const cancelBtn = modal ? modal.querySelector(".booster-cancel-btn") : null;
    if (!modal || !revealEl || !candidatesEl) return;

    if (cancelBtn) {
      if (source === "postCombat") {
        cancelBtn.innerText = "◀ OMITIR MEJORA Y CONTINUAR CAMINO";
      } else {
        cancelBtn.innerText = "◀ CANCELAR Y VOLVER A LA TIENDA";
      }
    }

    revealEl.innerHTML = `
      <div class="seal-icon-display">${seal.icon}</div>
      <div class="seal-info-meta">
        <span class="seal-badge-tag ${seal.tagClass || seal.type}">${seal.badge}</span>
        <div class="seal-title-text">${seal.name.toUpperCase()}</div>
        <div class="seal-desc-text">${seal.desc}</div>
      </div>
    `;

    candidatesEl.innerHTML = candidates.map((card, idx) => {
      const isRed = (card.suit === "♥" || card.suit === "♦");
      const cid = `${card.suit}_${card.rank}`;
      const existing = (gameState.player && gameState.player.cardEnchantments) ? gameState.player.cardEnchantments[cid] : null;
      return `
        <div class="booster-card-item booster-reveal ${isRed ? 'suit-red' : 'suit-black'}" style="animation-delay:${idx * 0.15}s" onclick="applySealToCandidate(${idx})" title="Toca para encantar permanentemente esta carta">
          <div class="bci-corner">
            <span>${card.rank}</span>
            <span style="font-size:11px;">${card.suit}</span>
          </div>
          <div class="bci-center">${card.suit}</div>
          <div class="bci-val-badge">VALOR ${card.value}</div>
          ${existing ? `<div style="font-size: 9px;color:#e63946;margin-top:2px;font-weight:bold;">REEMPLAZA ${existing.icon}</div>` : ''}
          <div class="bci-tap-tag">ENCANTAR</div>
        </div>
      `;
    }).join("");

    modal.classList.remove("hidden");
  }
  window.renderBoosterModal = renderBoosterModal;

  function applySealToCandidate(candidateIdx) {
    if (!activeBoosterPack) return;
    const { seal, candidates, source } = activeBoosterPack;
    const card = candidates[candidateIdx];
    if (!card) return;

    const p = gameState.player;
    if (!p.cardEnchantments) p.cardEnchantments = {};
    const cid = `${card.suit}_${card.rank}`;
    p.cardEnchantments[cid] = Object.assign({}, seal);

    playEnchantChimeSound();
    triggerHaptic("blackjack");
    spawnFloatingText("stage", `✨ ¡${card.rank}${card.suit} ENCANTADA!`, "crit");
    addLog(`✨ Sobre Arcano: Has impregnado la carta [${card.rank} de ${card.suit}] con el ${seal.name} (${seal.icon}). ¡Se activará cada vez que la juegues!`, "critical");

    const wasPostCombat = (source === "postCombat");
    closeBoosterPackModal(true);
    saveMidRunState();
    if (wasPostCombat) {
      showChronicleModal();
    } else {
      showShopModal();
    }
  }
  window.applySealToCandidate = applySealToCandidate;

  function closeBoosterPackModal(suppressRedirect) {
    const wasPostCombat = activeBoosterPack && activeBoosterPack.source === "postCombat";
    activeBoosterPack = null;
    const modal = document.getElementById("screen-booster-pack");
    if (modal) modal.classList.add("hidden");
    if (!suppressRedirect && wasPostCombat) {
      showChronicleModal();
    }
  }
  window.closeBoosterPackModal = closeBoosterPackModal;


  function triggerHandSynergies() {
    const p = gameState.player;
    const e = gameState.enemy;
    if (!p || !p.playerHand || p.playerHand.length < 2) return;
    if (!p.activeHandSynergies) p.activeHandSynergies = {};

    const elementCounts = {};
    p.playerHand.forEach(c => {
      if (c && c.enchantment) {
        const el = c.enchantment.element || c.enchantment.id;
        elementCounts[el] = (elementCounts[el] || 0) + 1;
      }
    });

    // 1. Sinergia Ígnea (2+ Cartas de Fuego: ignite, phoenix)
    if ((elementCounts["fire"] || 0) >= 2 && !p.activeHandSynergies["fire"]) {
      p.activeHandSynergies["fire"] = true;
      if (e) {
        e.hp = Math.max(0, e.hp - 10);
        e.def = Math.max(0, e.def - 2);
        if (!gameState.status) gameState.status = {};
        gameState.status.enemyBurn = (gameState.status.enemyBurn || 0) + 4;
        spawnFloatingText("enemy-sprite", "🔥 -10 EXPLOSIÓN", "crit");
        addLog("🔥⚡ ¡SINERGIA ÍGNEA! 2+ cartas de Fuego desatan EXPLOSIÓN INFERNAL: 10 daño directo, -2 DEF y Quemadura.", "critical");
        playSynergyComboSound();
        updateHud();
      }
    }

    // 2. Sinergia Sangrienta (2+ Cartas de Sangre: vampiric, healing)
    if ((elementCounts["blood"] || 0) >= 2 && !p.activeHandSynergies["blood"]) {
      p.activeHandSynergies["blood"] = true;
      const heal = Math.min(8, p.maxHp - p.hp);
      p.hp += heal;
      if (gameState.status) gameState.status.playerPoison = 0;
      spawnFloatingText("player-sprite", `🩸 +${heal} HP PACTO`, "heal");
      addLog(`🩸⚡ ¡SINERGIA DE SANGRE! 2+ cartas de Sangre activan PACTO VITAL: +${heal} HP extra y purga de veneno.`, "critical");
      playSynergyComboSound();
      updateHud();
    }

    // 3. Sinergia Titánica (2+ Cartas de Acero)
    if ((elementCounts["shield"] || 0) >= 2 && !p.activeHandSynergies["shield"]) {
      p.activeHandSynergies["shield"] = true;
      if (!gameState.status) gameState.status = {};
      gameState.status.playerShield = (gameState.status.playerShield || 0) + 10;
      spawnFloatingText("player-sprite", "🛡️ +10 BALUARTE", "shield");
      addLog("🛡️⚡ ¡SINERGIA DE ACERO! 2+ cartas de Acero forman FORTALEZA IMPENETRABLE: +10 de Escudo protector azul extra.", "critical");
      playSynergyComboSound();
      updateHud();
    }

    // 4. Sinergia de Filo (2+ Cartas de Armas: fury, sharp)
    if ((elementCounts["blade"] || 0) >= 2 && !p.activeHandSynergies["blade"]) {
      p.activeHandSynergies["blade"] = true;
      p.cardBonusDamage = (p.cardBonusDamage || 0) + 8;
      spawnFloatingText("player-sprite", "⚔️ +8 FILO COMBO", "crit");
      addLog("⚔️⚡ ¡SINERGIA DE HOJAS! 2+ cartas de Armas activan FRENESÍ CORTANTE: +8 de daño de impacto directo.", "critical");
      playSynergyComboSound();
    }

    // 5. Sinergia Tóxica (2+ Cartas Venenosas)
    if ((elementCounts["toxic"] || 0) >= 2 && !p.activeHandSynergies["toxic"]) {
      p.activeHandSynergies["toxic"] = true;
      if (!gameState.status) gameState.status = {};
      const curP = gameState.status.enemyPoison || 0;
      const added = Math.max(4, curP);
      gameState.status.enemyPoison = curP + added;
      spawnFloatingText("enemy-sprite", `☠️ +${added} VENENO`, "poison");
      addLog(`☠️⚡ ¡SINERGIA TÓXICA! 2+ cartas venenosas desatan PESTE VIRULENTA: Veneno rival incrementado en +${added}.`, "critical");
      playSynergyComboSound();
      updateHud();
    }

    // 6. Sinergia Arcana (2+ Cartas Arcanas: malleable, astral)
    if ((elementCounts["arcane"] || 0) >= 2 && !p.activeHandSynergies["arcane"]) {
      p.activeHandSynergies["arcane"] = true;
      p.rerollsAvailable = (p.rerollsAvailable || 0) + 1;
      p.astralCardInHand = true;
      spawnFloatingText("player-sprite", "🔮 +1 REROLL", "gold");
      addLog("🔮⚡ ¡SINERGIA ARCANA! 2+ cartas Arcanas abren CONVERGENCIA DEL DESTINO: +1 Reroll gratuito y daño cósmico.", "critical");
      playSynergyComboSound();
      updateHud();
    }
  }
  window.triggerHandSynergies = triggerHandSynergies;

  function applyDrawnCardUpgrades(cards) {
    if (!cards || !Array.isArray(cards)) return;
    const p = gameState.player;
    if (!p) return;

    for (const card of cards) {
      if (!card) continue;

      // 1. SELLOS INDIVIDUALES ARCANOS (Impregnados en la carta específica)
      if (card.enchantment) {
        const seal = card.enchantment;
        const sealId = seal.id || seal.type;

        if (sealId === "vampiric") {
          if (gameState.enemy && gameState.enemy.hp > 0) {
            const drain = Math.min(gameState.enemy.hp, 4);
            gameState.enemy.hp = Math.max(0, gameState.enemy.hp - drain);
            p.hp = Math.min(p.maxHp, p.hp + drain);
            spawnFloatingText("player-sprite", `🩸 +${drain} HP`, "heal");
            spawnFloatingText("enemy-sprite", `🩸 -${drain} HP`, "damage");
            addLog(`🩸 Sello Vampírico (${card.rank}${card.suit}): Drenaste ${drain} HP del rival y sanaste tus heridas.`, "critical");
            playVampiricSound();
            updateHud();
          }
        } else if (sealId === "healing") {
          p.hp = Math.min(p.maxHp, p.hp + 6);
          spawnFloatingText("player-sprite", "💖 +6 HP", "heal");
          addLog(`💖 Sello Restaurador (${card.rank}${card.suit}): +6 HP de salud regenerados al robar esta carta.`, "heal");
          playVictorySound();
          updateHud();
        } else if (sealId === "steel") {
          if (!gameState.status) gameState.status = {};
          gameState.status.playerShield = (gameState.status.playerShield || 0) + 6;
          spawnFloatingText("player-sprite", "🛡️ +6 ESCUDO", "shield");
          addLog(`🛡️ Sello de Acero (${card.rank}${card.suit}): +6 de Escudo azul protector generado.`, "heal");
          playSteelSound();
          updateHud();
        } else if (sealId === "fury") {
          p.cardBonusDamage = (p.cardBonusDamage || 0) + 5;
          spawnFloatingText("player-sprite", "⚔️ +5 FURIA", "crit");
          addLog(`⚔️ Sello de Furia (${card.rank}${card.suit}): +5 de daño de impacto directo a tu mano.`, "critical");
          playHitSound();
        } else if (sealId === "sharp") {
          p.cardBonusDamage = (p.cardBonusDamage || 0) + 4;
          p.sharpArmorPierce = (p.sharpArmorPierce || 0) + 2;
          spawnFloatingText("player-sprite", "🗡️ +4 DAÑO", "crit");
          addLog(`🗡️ Sello Afilado (${card.rank}${card.suit}): +4 de filo letal e ignora 2 armadura rival.`, "critical");
          playSwordClashSound();
        } else if (sealId === "malleable") {
          spawnFloatingText("player-sprite", "🔮 MALEABLE ±1", "crit");
          addLog(`🔮 Sello Maleable (${card.rank}${card.suit}): La carta se autoajusta ±1 para optimizar tu puntuación y evitar BUST.`, "info");
          playEnchantChimeSound();
        } else if (sealId === "ignite") {
          if (gameState.enemy && gameState.enemy.hp > 0) {
            if (!gameState.status) gameState.status = {};
            gameState.status.enemyBurn = (gameState.status.enemyBurn || 0) + 4;
            gameState.enemy.def = Math.max(0, gameState.enemy.def - 1);
            spawnFloatingText("enemy-sprite", "🔥 QUEMADURA (4)", "crit");
            addLog(`🔥 Sello Ígneo (${card.rank}${card.suit}): Rival quemado (4 daño/turno) y -1 DEF calcinada.`, "critical");
            playHitSound();
            updateHud();
          }
        } else if (sealId === "poison") {
          if (gameState.enemy && gameState.enemy.hp > 0) {
            if (!gameState.status) gameState.status = {};
            gameState.status.enemyPoison = (gameState.status.enemyPoison || 0) + 3;
            spawnFloatingText("enemy-sprite", "☠️ +3 VENENO", "poison");
            addLog(`☠️ Sello de Cicuta (${card.rank}${card.suit}): Inoculaste +3 de Veneno al rival.`, "poison");
            playPoisonSound();
            updateHud();
          }
        } else if (sealId === "gold") {
          gameState.gold += 5;
          spawnFloatingText("player-sprite", "🪙 +5 ORO", "gold");
          addLog(`🪙 Sello Dorado (${card.rank}${card.suit}): +5 de Oro obtenido al robar esta carta.`, "gold");
          playCoinCascadeSound();
          updateHud();
        } else if (sealId === "astral") {
          p.astralCardInHand = true;
          spawnFloatingText("player-sprite", "✨ PODER ASTRAL", "crit");
          addLog(`✨ Sello Astral (${card.rank}${card.suit}): Canalizando cosmos. Si logras 21, ¡tu daño se duplica x2!`, "critical");
          playEnchantChimeSound();
        } else if (sealId === "phoenix") {
          spawnFloatingText("player-sprite", "🔥 FÉNIX LISTO", "crit");
          addLog(`🔥 Sello Fénix (${card.rank}${card.suit}): Si te pasas de 21, se transmutará a As (1).`, "info");
        } else if (sealId === "thunder") {
          p.cardBonusDamage = (p.cardBonusDamage || 0) + 3;
          if (!gameState.status) gameState.status = {};
          gameState.status.enemyStunned = true;
          spawnFloatingText("player-sprite", "⚡ RAYO ATURDIDOR", "crit");
          addLog(`⚡ Sello del Trueno (${card.rank}${card.suit}): +3 daño eléctrico y aturde al rival impidiendo su contragolpe.`, "critical");
          playHitSound();
        } else if (sealId === "glacial") {
          if (gameState.enemy && gameState.enemy.pwr > 1) {
            gameState.enemy.pwr = Math.max(1, gameState.enemy.pwr - 1);
          }
          if (!gameState.status) gameState.status = {};
          gameState.status.playerShield = (gameState.status.playerShield || 0) + 4;
          spawnFloatingText("player-sprite", "❄️ ESCUDO HELADO +4", "shield");
          spawnFloatingText("enemy-sprite", "❄️ PWR -1", "damage");
          addLog(`❄️ Sello Glacial (${card.rank}${card.suit}): Congela al rival (-1 PWR) y otorga +4 Escudo azul.`, "heal");
          playSteelSound();
          updateHud();
        } else if (sealId === "void") {
          if (gameState.enemy && gameState.enemy.hp > 0) {
            const voidDmg = 4;
            gameState.enemy.hp = Math.max(0, gameState.enemy.hp - voidDmg);
            if (gameState.status && gameState.status.enemyShield > 0) {
              gameState.status.enemyShield = Math.max(0, gameState.status.enemyShield - 2);
            }
            spawnFloatingText("enemy-sprite", "🌑 VACÍO -4 HP", "crit");
            addLog(`🌑 Sello del Vacío (${card.rank}${card.suit}): Impacto sombrío causa ${voidDmg} de daño directo que ignora armadura.`, "critical");
            playVampiricSound();
            updateHud();
          }
        }
      }

      // 2. Cartas Blindadas (6, 7, 8)
      if (hasCardUpgrade("armored_cards") && [6, 7, 8].includes(card.value)) {
        if (!gameState.status) gameState.status = {};
        gameState.status.playerShield = (gameState.status.playerShield || 0) + 2;
        spawnFloatingText("player-sprite", "🛡️ +2 ESCUDO", "shield");
        addLog("🛡️ Carta Blindada (" + card.rank + "): +2 de Escudo azul protector generado.", "heal");
        updateHud();
      }

      // 3. Figuras Reales (J, Q, K)
      if (hasCardUpgrade("royal_prosperity") && ["J", "Q", "K"].includes(card.rank)) {
        gameState.gold += 2;
        p.hp = Math.min(p.maxHp, p.hp + 2);
        spawnFloatingText("player-sprite", "🪙+2 💖+2", "heal");
        addLog("👑 Figura Próspera (" + card.rank + "): +2 Oro obtenido y +2 HP restaurados.", "heal");
        updateHud();
      }

      // 4. Tréboles de Fortuna (♣): +2 de Oro al entrar a la mano
      if (hasCardUpgrade("fortune_clover") && card.suit === "♣") {
        gameState.gold += 2;
        spawnFloatingText("player-sprite", "🪙 +2 ORO", "gold");
        addLog("♣ Tréboles de Fortuna (" + card.rank + "): +2 de Oro obtenido.", "heal");
        updateHud();
      }

      // 5. Corazones Sanadores (♥): +2 HP al robar la carta
      if (hasCardUpgrade("healing_hearts") && card.suit === "♥") {
        p.hp = Math.min(p.maxHp, p.hp + 2);
        spawnFloatingText("player-sprite", "💖 +2 HP", "heal");
        addLog("♥ Corazones Sanadores (" + card.rank + "): +2 HP restaurados.", "heal");
        updateHud();
      }

      // 6. Diamantes Reforzados (♦): +3 de Escudo al robar la carta
      if (hasCardUpgrade("fortified_diamonds") && card.suit === "♦") {
        if (!gameState.status) gameState.status = {};
        gameState.status.playerShield = (gameState.status.playerShield || 0) + 3;
        spawnFloatingText("player-sprite", "🛡️ +3 ESCUDO", "shield");
        addLog("♦ Diamantes Reforzados (" + card.rank + "): +3 de Escudo azul protector.", "heal");
        updateHud();
      }

      // 7. Sello Vampírico del 7
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

    // Comprobación de Sinergias Elementales en Mano
    triggerHandSynergies();
  }
  window.applyDrawnCardUpgrades = applyDrawnCardUpgrades;

  /* ============================================================
     TIENDA DEL BAZAR, ARTEFACTOS Y FRAGUA (TRES PESTAÑAS)
     ============================================================ */
  let currentShopTab = "consumables";
  function switchShopTab(tab) {
    if (tab === "forge") tab = "cards";
    currentShopTab = tab;
    showShopModal();
  }
  window.switchShopTab = switchShopTab;

  // Amuletos: comprables en el Bazar y Tienda de la Torre
  const AMULET_PRICES = {
    amber_amulet: 25,
    blood_amulet: 45,
    lucky_charm: 55,
    spiked_belt: 35,
    lead_gauntlet: 40,
    steel_helm: 50
  };
  const AMULET_INFO = {
    amber_amulet: { icon: "💍", name: "AMULETO ÁMBAR", short: "ÁMBAR", desc: "+1 HP al inicio de cada piso", rarity: "common", tier: 1 },
    lead_gauntlet: { icon: "🥊", name: "GUANTE DE PLOMO", short: "PLOMO", desc: "Tus cartas de valor bajo cuentan como mínimo 3", rarity: "common", tier: 1 },
    spiked_belt: { icon: "⛓️", name: "CINTURÓN CON PÚAS", short: "PÚAS", desc: "Devuelves 2 de daño al rival cuando recibes daño", rarity: "rare", tier: 2 },
    steel_helm: { icon: "⛑️", name: "CASCO DE ACERO", short: "CASCO", desc: "+1 de DEF permanente", rarity: "epic", tier: 3 },
    blood_amulet: { icon: "🩸", name: "AMULETO DE SANGRE", short: "SANGRE", desc: "+6 HP al liquidar rivales", rarity: "epic", tier: 3 },
    lucky_charm: { icon: "🍀", name: "AMULETO DE LA SUERTE", short: "SUERTE", desc: "25% de chance de evitar daño", rarity: "legendary", tier: 4 },
  };
  window.AMULET_INFO = AMULET_INFO;




  function buyForgeBoosterPack() {
    const p = gameState.player;
    const price = 50;
    if (gameState.gold < price) {
      showGameToast(`No posees suficiente oro para forjar el sobre (cuesta 50 🪙). Te faltan ${price - gameState.gold} 🪙.`, "warn");
      return;
    }
    const unowned = CARD_UPGRADES.filter(cu => !hasCardUpgrade(cu.id));
    if (unowned.length === 0) {
      showGameToast("¡Ya has forjado todas las mejoras pasivas de la baraja para tu héroe!", "warn");
      return;
    }
    gameState.gold -= price;
    // Elección al azar de entre el pool disponible (mecánica roguelike de azar y suerte)
    const picked = unowned[Math.floor(Math.random() * unowned.length)];
    if (!p.cardUpgrades) p.cardUpgrades = [];
    p.cardUpgrades.push(picked.id);

    try { playPackTearSound(); } catch (_) {}
    try { playEnchantChimeSound(); } catch (_) {}
    spawnFloatingText("stage", `🔨 ¡${picked.name.toUpperCase()}!`, "crit");
    addLog(`🔨 Sobre del Yunque Ancestral: ¡Has desbloqueado al azar la mejora [${picked.name}] (${picked.icon})! ${picked.desc}`, "critical");
    showGameAlert(`Has obtenido la mejora aleatoria:\n\n${picked.icon} ${picked.name}\n${picked.desc}`, "¡SOBRE DEL YUNQUE ABIERTO!");
    updateHud();
    showShopModal();
  }
  window.buyForgeBoosterPack = buyForgeBoosterPack;

  function getAccessoryDisplay(id) {
    if (!id) return null;
    const a = AMULET_INFO[id];
    if (a) return a;
    const fallback = String(id).replace(/_/g, " ").toUpperCase();
    return { icon: "💍", name: fallback, short: fallback.split(" ")[0], desc: "Accesorio de combate." };
  }
  window.getAccessoryDisplay = getAccessoryDisplay;

  function showShopModal() {
    try { playBazaarShopSound(); } catch (_) {}
    try { startTrackedSceneMusic("bazaar", null); } catch (_) {}
    const p = gameState.player;
    if (!p.artifacts) p.artifacts = [];
    if (!p.cardUpgrades) p.cardUpgrades = [];
    const maxSlots = getMaxArtifactSlots();

    const titleEl = document.getElementById("event-title");
    const descEl = document.getElementById("event-desc");
    if (titleEl) titleEl.style.display = "none";
    if (descEl) descEl.style.display = "none";

    const canP = gameState.gold >= 20;
    const canShieldMinor = gameState.gold >= 15;
    const canShieldMajor = gameState.gold >= 28;
    const canR = gameState.gold >= 15;

    // Pestaña 1: Provisiones (Poción vida, pociones armadura, reroll)
    let consumablesHtml = `
      <!-- POCIÓN CURATIVA -->
      <div class="shop-card ${canP ? 'affordable' : 'unaffordable'}">
        <div class="shop-card-left">
          <div class="shop-item-icon-box potion">🧪</div>
          <div class="shop-item-details">
            <div class="shop-item-badge consumable">CURACIÓN</div>
            <div class="shop-item-name">Poción Curativa de Vida</div>
            <div class="shop-item-desc">Restaura <b>+30 HP</b> inmediatamente cuando estés en apuros.</div>
            <div class="shop-item-stock">En inventario: <b style="color:#2a9d8f;">${p.potions} en reserva</b></div>
          </div>
        </div>
        <div class="shop-card-right">
          ${canP 
            ? `<button class="shop-action-btn buy" onclick="buyPotion()">
                 <span class="shop-btn-price">🪙 20 ORO</span>
                 <span class="shop-btn-action">COMPRAR +1</span>
               </button>`
            : `<button class="shop-action-btn locked" disabled>
                 <span class="shop-btn-price">🪙 20 ORO</span>
                 <span class="shop-btn-action">FALTAN ${20 - gameState.gold} 🪙</span>
               </button>`
          }
        </div>
      </div>

      <!-- POCIÓN DE ARMADURA MENOR -->
      <div class="shop-card ${canShieldMinor ? 'affordable' : 'unaffordable'}">
        <div class="shop-card-left">
          <div class="shop-item-icon-box shield-potion" style="border-color:#48cae4;background:rgba(72,202,228,0.12);">🛡️</div>
          <div class="shop-item-details">
            <div class="shop-item-badge" style="background:rgba(72,202,228,0.2);color:#90e0ef;border-color:#48cae4;">ARMADURA (+10)</div>
            <div class="shop-item-name">Poción de Armadura Menor</div>
            <div class="shop-item-desc">Impregna a tu héroe con <b>+10 de Escudo azul</b> protector que absorbe daño.</div>
            <div class="shop-item-stock">Escudo activo: <b style="color:#48cae4;">${gameState.status.playerShield || 0} DEF</b></div>
          </div>
        </div>
        <div class="shop-card-right">
          ${canShieldMinor 
            ? `<button class="shop-action-btn buy" onclick="buyShieldPotion(10, 15)">
                 <span class="shop-btn-price">🪙 15 ORO</span>
                 <span class="shop-btn-action">BEBER (+10)</span>
               </button>`
            : `<button class="shop-action-btn locked" disabled>
                 <span class="shop-btn-price">🪙 15 ORO</span>
                 <span class="shop-btn-action">FALTAN ${15 - gameState.gold} 🪙</span>
               </button>`
          }
        </div>
      </div>

      <!-- POCIÓN DE ARMADURA MAYOR -->
      <div class="shop-card ${canShieldMajor ? 'affordable' : 'unaffordable'}">
        <div class="shop-card-left">
          <div class="shop-item-icon-box shield-potion" style="border-color:#66fcf1;background:rgba(102,252,241,0.14);">🛡️</div>
          <div class="shop-item-details">
            <div class="shop-item-badge" style="background:rgba(102,252,241,0.2);color:#66fcf1;border-color:#66fcf1;">ARMADURA MAYOR (+20)</div>
            <div class="shop-item-name">Poción de Armadura Mayor</div>
            <div class="shop-item-desc">Refuerzo titánico: otorga <b>+20 de Escudo azul</b> protector para resistir ataques devastadores.</div>
            <div class="shop-item-stock">Escudo activo: <b style="color:#66fcf1;">${gameState.status.playerShield || 0} DEF</b></div>
          </div>
        </div>
        <div class="shop-card-right">
          ${canShieldMajor 
            ? `<button class="shop-action-btn buy" onclick="buyShieldPotion(20, 28)">
                 <span class="shop-btn-price">🪙 28 ORO</span>
                 <span class="shop-btn-action">BEBER (+20)</span>
               </button>`
            : `<button class="shop-action-btn locked" disabled>
                 <span class="shop-btn-price">🪙 28 ORO</span>
                 <span class="shop-btn-action">FALTAN ${28 - gameState.gold} 🪙</span>
               </button>`
          }
        </div>
      </div>

      <!-- REROLL EXTRA -->
      <div class="shop-card ${canR ? 'affordable' : 'unaffordable'}">
        <div class="shop-card-left">
          <div class="shop-item-icon-box reroll">🔄</div>
          <div class="shop-item-details">
            <div class="shop-item-badge tactic">TÁCTICA</div>
            <div class="shop-item-name">Dado de Reroll</div>
            <div class="shop-item-desc">Descarta tu última carta robada y pide otra carta de inmediato.</div>
            <div class="shop-item-stock">Disponibles: <b style="color:#ffd166;">${p.rerollsAvailable} dados</b></div>
          </div>
        </div>
        <div class="shop-card-right">
          ${canR 
            ? `<button class="shop-action-btn buy" onclick="buyReroll()">
                 <span class="shop-btn-price">🪙 15 ORO</span>
                 <span class="shop-btn-action">COMPRAR +1</span>
               </button>`
            : `<button class="shop-action-btn locked" disabled>
                 <span class="shop-btn-price">🪙 15 ORO</span>
                 <span class="shop-btn-action">FALTAN ${15 - gameState.gold} 🪙</span>
               </button>`
          }
        </div>
      </div>
    `;

    // Pestaña 2: Sobres de Artefactos y Accesorios (Estilo Balatro / Pokémon)
    const isSlotsFull = p.artifacts.length >= maxSlots;
    const artPackPrice = hasArtifact("golden_horseshoe") ? 32 : 40;
    const accPackPrice = 40;
    const canBuyArtPack = gameState.gold >= artPackPrice;
    const canBuyAccPack = gameState.gold >= accPackPrice;

    const ownedArtifactsList = (p.artifacts || []).map(id => SHOP_ARTIFACTS.find(a => a.id === id) || { id, name: id, icon: "🎴", desc: "" });
    const currentAccInfo = (p.accessory && AMULET_INFO[p.accessory]) ? AMULET_INFO[p.accessory] : null;

    const artifactsHtml = `
      <!-- SOBRE DE ARTEFACTOS (RELIQUIAS) -->
      <div class="shop-card ${canBuyArtPack ? 'affordable' : 'unaffordable'}" style="border: 2px solid #66fcf1; background: radial-gradient(circle at 10% 10%, rgba(102,252,241,0.12), rgba(13,18,28,0.95)); margin-bottom:10px;">
        <div class="shop-card-left">
          <div class="shop-item-icon-box artifact" style="border-color:#66fcf1;font-size:26px;">🎴</div>
          <div class="shop-item-details">
            <div class="shop-item-badge" style="display:flex;gap:4px;align-items:center;background:rgba(102,252,241,0.2);color:#66fcf1;border-color:#66fcf1;">
              <span class="card-tier-badge rare">ARTEFACTOS</span>
              <span>3 OPCIONES • ELIGE 1</span>
            </div>
            <div class="shop-item-name" style="color:#66fcf1;">Sobre de Artefactos de la Torre</div>
            <div class="shop-item-desc">Abre este sobre de artefactos escalado por piso y nivel para elegir 1 artefacto permanente entre 3 revelaciones.</div>
            <div class="shop-item-stock" style="color:#ffd166;">Ranuras: <b>${p.artifacts.length} / ${maxSlots}</b> ${isSlotsFull ? '(Al límite: reemplazará una)' : '(Espacio libre)'}</div>
          </div>
        </div>
        <div class="shop-card-right">
          ${canBuyArtPack 
            ? `<button class="shop-action-btn buy gold-relic" onclick="openBoosterPackBySource('artifacts')">
                 <span class="shop-btn-price">🪙 ${artPackPrice} ORO</span>
                 <span class="shop-btn-action">ABRIR SOBRE</span>
               </button>`
            : `<button class="shop-action-btn locked" disabled>
                 <span class="shop-btn-price">🪙 ${artPackPrice} ORO</span>
                 <span class="shop-btn-action">FALTAN ${artPackPrice - gameState.gold} 🪙</span>
               </button>`
          }
        </div>
      </div>

      <!-- SOBRE DE ACCESORIOS (AMULETOS) -->
      <div class="shop-card ${canBuyAccPack ? 'affordable' : 'unaffordable'}" style="border: 2px solid #c77dff; background: radial-gradient(circle at 10% 10%, rgba(199,125,255,0.12), rgba(13,18,28,0.95)); margin-bottom:12px;">
        <div class="shop-card-left">
          <div class="shop-item-icon-box amulet" style="border-color:#c77dff;font-size:26px;">💍</div>
          <div class="shop-item-details">
            <div class="shop-item-badge accessory" style="display:flex;gap:4px;align-items:center;background:rgba(199,125,255,0.2);color:#c77dff;border-color:#c77dff;">
              <span>ACCESORIOS DE COMBATE</span>
              <span>3 AMULETOS • ELIGE 1</span>
            </div>
            <div class="shop-item-name" style="color:#c77dff;">Sobre de Amuletos y Joyas</div>
            <div class="shop-item-desc">Abre este sobre de accesorios de combate con rarezas escaladas para forjar tu talismán protector o de asalto.</div>
            <div class="shop-item-stock" style="color:#ffd166;">Equipado: <b>${currentAccInfo ? currentAccInfo.name : 'Ninguno'}</b></div>
          </div>
        </div>
        <div class="shop-card-right">
          ${canBuyAccPack 
            ? `<button class="shop-action-btn buy" style="border-color:#c77dff;color:#c77dff;" onclick="openBoosterPackBySource('accessories')">
                 <span class="shop-btn-price">🪙 ${accPackPrice} ORO</span>
                 <span class="shop-btn-action">ABRIR SOBRE</span>
               </button>`
            : `<button class="shop-action-btn locked" disabled>
                 <span class="shop-btn-price">🪙 ${accPackPrice} ORO</span>
                 <span class="shop-btn-action">FALTAN ${accPackPrice - gameState.gold} 🪙</span>
               </button>`
          }
        </div>
      </div>

      <!-- COFRE DE RELIQUIAS SAGRADAS (ALL_RELICS) -->
      <div class="shop-card ${gameState.gold >= 45 ? 'affordable' : 'unaffordable'}" style="border: 2px solid #ffd166; background: radial-gradient(circle at 10% 10%, rgba(255,209,102,0.12), rgba(13,18,28,0.95)); margin-bottom:12px;">
        <div class="shop-card-left">
          <div class="shop-item-icon-box golden-die" style="border-color:#ffd166;font-size:26px;">💎</div>
          <div class="shop-item-details">
            <div class="shop-item-badge tactic" style="display:flex;gap:4px;align-items:center;">
              <span>RELIQUIA ARCANA</span>
              <span>BENDICIÓN PASIVA</span>
            </div>
            <div class="shop-item-name" style="color:#ffd166;">Cofre de Reliquias Sagradas</div>
            <div class="shop-item-desc">Desbloquea e integra de inmediato una bendición arcana de las Reliquias de la Torre a tu personaje.</div>
            <div class="shop-item-stock" style="color:#ffd166;">Bendición: <b>${p.gem ? (ITEM_INFO[p.gem] || p.gem).toUpperCase() : 'Ninguna'}</b></div>
          </div>
        </div>
        <div class="shop-card-right">
          ${gameState.gold >= 45 
            ? `<button class="shop-action-btn buy gold-relic" onclick="buyRelicBoosterPack()">
                 <span class="shop-btn-price">🪙 45 ORO</span>
                 <span class="shop-btn-action">EXTRAER</span>
               </button>`
            : `<button class="shop-action-btn locked" disabled>
                 <span class="shop-btn-price">🪙 45 ORO</span>
                 <span class="shop-btn-action">FALTAN ${45 - gameState.gold} 🪙</span>
               </button>`
          }
        </div>
      </div>

      <!-- RESUMEN DE EQUIPAMIENTO ACTIVO DEL HÉROE -->
      <div style="background:rgba(0,0,0,0.35);border:1px dashed rgba(255,255,255,0.15);border-radius:8px;padding:8px 10px;text-align:left;">
        <div style="font-family:var(--font-pixel);font-size: 9px;color:#66fcf1;margin-bottom:4px;display:flex;justify-content:space-between;">
          <span>🎴 ARTEFACTOS ACTIVOS (${p.artifacts.length}/${maxSlots}):</span>
          <span style="color:#ffd166;">Nivel ${p.level}</span>
        </div>
        ${ownedArtifactsList.length > 0 
          ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px;">
               ${ownedArtifactsList.map(a => `
                 <span style="font-size: 9px;background:#0d1420;border:1px solid #2a9d8f;padding:2px 6px;border-radius:4px;color:#cbd5e1;" title="${a.desc}">
                   ${a.icon} <b>${a.name}</b>
                 </span>
               `).join("")}
             </div>`
          : `<div style="font-size: 9px;color:#94a3b8;margin-bottom:8px;">Sin artefactos equipados. Abre un sobre para obtener tu primera reliquia.</div>`
        }

        <div style="font-family:var(--font-pixel);font-size: 9px;color:#c77dff;margin-bottom:4px;border-top:1px solid rgba(255,255,255,0.08);padding-top:6px;">
          💍 ACCESORIO DE COMBATE ACTIVO:
        </div>
        ${currentAccInfo 
          ? `<div style="font-size: 9px;color:#cbd5e1;background:#0d1420;border:1px solid #c77dff;padding:4px 8px;border-radius:4px;">
               ${currentAccInfo.icon} <b style="color:#c77dff;">${currentAccInfo.name}</b>: ${currentAccInfo.desc}
             </div>`
          : `<div style="font-size: 9px;color:#94a3b8;">Sin accesorio equipado actualmente.</div>`
        }
      </div>
    `;

    // Pestaña 3: Sobres Arcanos y Cartas Encantadas
    const enchantedMap = p.cardEnchantments || {};
    const enchantedList = Object.keys(enchantedMap);
    const boosterPrice = hasArtifact("golden_horseshoe") ? 45 : 55;
    const canBuyBooster = gameState.gold >= boosterPrice;

    let enchantedCardsSummaryHtml = "";
    if (enchantedList.length === 0) {
      enchantedCardsSummaryHtml = `
        <div style="font-size:10px;color:#94a3b8;padding:10px;background:rgba(0,0,0,0.4);border-radius:8px;border:1px dashed #374151;text-align:center;">
          Tu baraja aún no posee cartas con sellos individuales.<br>
          ¡Usa el <b>Yunque de los Antiguos</b> para grabar un sello en todo un arquetipo de tu baraja!
        </div>
      `;
    } else {
      enchantedCardsSummaryHtml = `
        <div style="display:flex;flex-wrap:wrap;gap:8px;padding:6px 0;">
          ${enchantedList.map(cid => {
            const seal = enchantedMap[cid];
            const [suit, rank] = cid.split("_");
            const isRed = (suit === "♥" || suit === "♦");
            return `
              <div style="display:inline-flex;align-items:center;gap:6px;background:#0d1420;border:1.5px solid #ffd166;padding:4px 8px;border-radius:6px;font-size:10px;">
                <span style="font-size:13px;">${seal.icon}</span>
                <span style="font-weight:bold;color:${isRed ? '#ff4d6d' : '#f1f5f9'};">${rank}${suit}</span>
                <span style="color:#ffd166;font-size:9px;">[${seal.name}]</span>
              </div>
            `;
          }).join("")}
        </div>
      `;
    }

    const cryptForgePrice = 50;
    const playerCrypts = (typeof getPlayerCryptCoins === "function") ? getPlayerCryptCoins() : 0;
    const canBuyCryptForge = playerCrypts >= cryptForgePrice;

    const cryptForgeCardHtml = `
      <!-- FORJA ARCANA DE LA CRIPTA (50 CRIPTAS • EXCLUSIVO PARA LA RUN) -->
      <div class="shop-card ${canBuyCryptForge ? 'affordable' : 'unaffordable'}" style="border: 2px solid #f87171; background: radial-gradient(circle at 10% 10%, rgba(239,68,68,0.15), rgba(13,18,28,0.95)); margin-top:8px;">
        <div class="shop-card-left">
          <div class="shop-item-icon-box card-forge" style="border-color:#f87171;font-size:28px;">💀⚡</div>
          <div class="shop-item-details">
            <div class="shop-item-badge" style="display:flex;gap:4px;align-items:center;background:rgba(239,68,68,0.2);color:#fca5a5;border-color:#f87171;">
              <span class="card-tier-badge legendary">OFRENDA DE CRIPTA</span>
              <span>EXCLUSIVO DE ESTA RUN</span>
            </div>
            <div class="shop-item-name" style="color:#fca5a5;">Forja Arcana de la Cripta</div>
            <div class="shop-item-desc">Ofrenda 50 Monedas de Cripta 💀 para forjar un <b>Sello Arcano Supremo</b> en 1 naipe de tu baraja. Beneficio de máximo poder activo <b>solo durante esta ascensión</b> (no se guarda en el perfil permanente).</div>
            <div class="shop-item-stock" style="color:#ffd166;">💀 Tienes ${playerCrypts} Monedas de Cripta • Poder temporal de ascensión</div>
          </div>
        </div>
        <div class="shop-card-right">
          ${canBuyCryptForge
            ? `<button class="shop-action-btn buy" style="border-color:#f87171;color:#fca5a5;background:rgba(239,68,68,0.18);" onclick="buyCryptForgeBoosterPack()">
                 <span class="shop-btn-price">💀 ${cryptForgePrice} CRIPTAS</span>
                 <span class="shop-btn-action">FORJAR PARA LA RUN</span>
               </button>`
            : `<button class="shop-action-btn locked" disabled>
                 <span class="shop-btn-price">💀 ${cryptForgePrice} CRIPTAS</span>
                 <span class="shop-btn-action">FALTAN ${cryptForgePrice - playerCrypts} 💀</span>
               </button>`
          }
        </div>
      </div>
    `;

    // TAB 3: SOBRES ARCANOS (APLICA A 1 CARTA INDIVIDUAL)
    const cardsBoosterHtml = `
      <!-- SOBRE DE SELLOS ARCANOS (1 CARTA INDIVIDUAL) -->
      <div class="shop-card ${canBuyBooster ? 'affordable' : 'unaffordable'}" style="border: 2px solid #ffd166; background: radial-gradient(circle at 10% 10%, rgba(255,209,102,0.12), rgba(13,18,28,0.95));">
        <div class="shop-card-left">
          <div class="shop-item-icon-box card-forge" style="border-color:#ffd166;font-size:28px;">📦✨</div>
          <div class="shop-item-details">
            <div class="shop-item-badge" style="display:flex;gap:4px;align-items:center;background:rgba(255,209,102,0.2);color:#ffd166;border-color:#ffd166;">
              <span class="card-tier-badge mythic">SELLO INDIVIDUAL</span>
              <span>3 SELLOS • ELIGE 1 PARA 1 CARTA</span>
            </div>
            <div class="shop-item-name" style="color:#ffd166;">Sobre de Sellos Arcanos</div>
            <div class="shop-item-desc">Abre este sobre para revelar 3 <b>Sellos Arcanos</b> legendarios. Escoge 1 para imbuirlo en <b>1 sola carta</b> de tu baraja.</div>
            <div class="shop-item-stock" style="color:#66fcf1;">✨ Revelación 3D • Encanta permanentemente 1 naipe para toda la run</div>
          </div>
        </div>
        <div class="shop-card-right">
          ${canBuyBooster
            ? `<button class="shop-action-btn buy gold-relic" onclick="openBoosterPackBySource('arcane')">
                 <span class="shop-btn-price">🪙 ${boosterPrice} ORO</span>
                 <span class="shop-btn-action">ABRIR SOBRE</span>
               </button>`
            : `<button class="shop-action-btn locked" disabled>
                 <span class="shop-btn-price">🪙 ${boosterPrice} ORO</span>
                 <span class="shop-btn-action">FALTAN ${boosterPrice - gameState.gold} 🪙</span>
               </button>`
          }
        </div>
      </div>

      ${cryptForgeCardHtml}

      <!-- COLECCIÓN DE CARTAS ENCANTADAS EN BARAJA -->
      <div style="margin-top:12px;text-align:left;">
        <div style="font-family:var(--font-pixel);font-size: 9px;color:#ffd166;margin-bottom:6px;display:flex;justify-content:space-between;">
          <span>🃏 CARTAS CON SELLOS ARCANOS (${enchantedList.length})</span>
          <span style="color:#94a3b8;font-size: 9px;">Baraja de ${52 + 0} cartas (${((typeof getPersistentExtraCards === "function") ? getPersistentExtraCards().length : 0)} arcanas transmutadas en las 52)</span>
        </div>
        ${enchantedCardsSummaryHtml}
      </div>
    `;

    // TAB 4: YUNQUE DE CARTAS (SOBRE MISTERIOSO ROGUELIKE DE MEJORA PASIVA)
    const heroClass = (p && p.class) ? p.class : "knight";
    const meta = (typeof getHeroMeta === "function") ? getHeroMeta() : {};
    const heroMeta = meta[heroClass] || { totalExp: 0, masteryLevel: 1 };
    const mLevel = heroMeta.level || heroMeta.masteryLevel || (p && p.masteryLevel) || 1;
    const ownedUpgrades = (p.cardUpgrades || []).map(id => CARD_UPGRADES.find(c => c.id === id)).filter(Boolean);
    const unownedCandidates = CARD_UPGRADES.filter(cu => !hasCardUpgrade(cu.id));

    const forgePackPrice = 50;
    const canBuyForgePack = gameState.gold >= forgePackPrice && unownedCandidates.length > 0;
    let forgeOffersHtml = "";
    if (unownedCandidates.length > 0) {
      forgeOffersHtml = `
        <div class="shop-card ${canBuyForgePack ? 'affordable' : 'unaffordable'}" style="border: 2px solid #66fcf1; background: radial-gradient(circle at 10% 10%, rgba(102,252,241,0.15), rgba(13,18,28,0.95)); margin-bottom:8px;">
          <div class="shop-card-left">
            <div class="shop-item-icon-box card-forge" style="border-color:#66fcf1;font-size:28px;">🔨</div>
            <div class="shop-item-details">
              <div class="shop-item-badge" style="display:flex;gap:4px;align-items:center;background:rgba(102,252,241,0.2);color:#66fcf1;border-color:#66fcf1;">
                <span class="card-tier-badge rare">FORJA ROGUELIKE</span>
                <span>SOBRE DE MEJORA PASIVA</span>
              </div>
              <div class="shop-item-name" style="color:#66fcf1;">Sobre del Yunque Ancestral</div>
              <div class="shop-item-desc">Abre este sobre de forja roguelike para extraer 1 mejora pasiva al azar para tu baraja de entre ${unownedCandidates.length} mejoras disponibles.</div>
              <div class="shop-item-stock" style="color:#ffd166;">🎲 Azar puro: forja pasivos de gran impacto durante la run</div>
            </div>
          </div>
          <div class="shop-card-right">
            ${canBuyForgePack 
              ? `<button class="shop-action-btn buy gold-relic" onclick="buyForgeBoosterPack()">
                   <span class="shop-btn-price">🪙 ${forgePackPrice} ORO</span>
                   <span class="shop-btn-action">FORJAR AL AZAR</span>
                 </button>`
              : `<button class="shop-action-btn locked" disabled>
                   <span class="shop-btn-price">🪙 ${forgePackPrice} ORO</span>
                   <span class="shop-btn-action">FALTAN ${forgePackPrice - gameState.gold} 🪙</span>
                 </button>`
            }
          </div>
        </div>
      `;
    } else {
      forgeOffersHtml = `
        <div style="font-size:9.5px;color:#2a9d8f;padding:12px;background:rgba(42,157,143,0.1);border-radius:8px;border:1px dashed #2a9d8f;text-align:center;margin-bottom:8px;">
          ✓ ¡Has forjado todas las mejoras pasivas disponibles del Yunque para tu héroe!
        </div>
      `;
    }

    const forgeTabHtml = `
      <div style="text-align:left;">
        <div style="font-family:var(--font-pixel);font-size: 9px;color:#66fcf1;margin-bottom:8px;border-bottom:1px solid rgba(102,252,241,0.2);padding-bottom:4px;display:flex;justify-content:space-between;">
          <span>🔨 YUNQUE ANCESTRAL: FORJA Y MEJORAS DE ASCENSIÓN</span>
          <span style="color:#ffd166;font-size: 9px;">Maestría Nvl ${mLevel}</span>
        </div>
        ${forgeOffersHtml}
        ${cryptForgeCardHtml}

        <!-- LISTA DE PASIVAS DEL YUNQUE ACTIVAS EN ESTA RUN -->
        <div style="margin-top:10px;background:rgba(0,0,0,0.35);border:1px dashed rgba(102,252,241,0.25);border-radius:8px;padding:8px 10px;">
          <div style="font-family:var(--font-pixel);font-size: 9px;color:#66fcf1;margin-bottom:4px;">
            🔨 PASIVAS DEL YUNQUE ACTIVAS EN TU BARAJA (${ownedUpgrades.length}):
          </div>
          ${ownedUpgrades.length > 0
            ? `<div style="display:flex;flex-wrap:wrap;gap:6px;">
                ${ownedUpgrades.map(u => `
                  <span style="font-size: 9px;background:#0d1420;border:1px solid #2a9d8f;padding:2px 6px;border-radius:4px;color:#cbd5e1;" title="${u.desc}">
                    ${u.icon} <b>${u.name}</b>
                  </span>
                `).join("")}
              </div>`
            : `<span style="font-size: 9px;color:#94a3b8;">Aún no has forjado mejoras pasivas del Yunque en esta ascensión.</span>`
          }
        </div>
      </div>
    `;

    let activeTabContent = consumablesHtml;
    if (currentShopTab === "artifacts") activeTabContent = artifactsHtml;
    else if (currentShopTab === "cards") activeTabContent = cardsBoosterHtml;
    else if (currentShopTab === "forge") activeTabContent = forgeTabHtml;
    else if (currentShopTab === "iap") {
      activeTabContent = Object.keys(ROYAL_PERKS).map(id => {
        const pk = ROYAL_PERKS[id];
        const owned = isRoyalPerkOwned(id);
        return `
        <div class="shop-card ${owned ? 'purchased' : 'affordable'}" style="border:1.5px solid ${pk.color};background:radial-gradient(circle at 10% 10%, ${pk.color}26, rgba(13,18,28,0.95));">
          <div class="shop-card-left">
            <div class="shop-item-icon-box" style="border-color:${pk.color};font-size:24px;">${pk.icon}</div>
            <div class="shop-item-details">
              <div class="shop-item-badge" style="background:${pk.color}33;color:${pk.color};border-color:${pk.color};">${owned ? 'ADQUIRIDO' : 'TESORO REAL'}</div>
              <div class="shop-item-name" style="color:${pk.color};">${pk.name}</div>
              <div class="shop-item-desc">${pk.desc}</div>
            </div>
          </div>
          <div class="shop-card-right">
            <button class="shop-action-btn buy" style="background:${owned ? 'rgba(42,157,143,0.35)' : `linear-gradient(135deg,${pk.color},#e63946)`};border-color:${owned ? '#2a9d8f' : pk.color};" onclick="showIAPModal('${id}')">
              <span class="shop-btn-price">${owned ? '✔' : ((typeof getBillingPrice === 'function' && getBillingPrice(id)) || pk.price)}</span>
              <span class="shop-btn-action">${owned ? 'ACTIVO' : 'ADQUIRIR'}</span>
            </button>
          </div>
        </div>`;
      }).join("");
    }

    document.getElementById("event-options").innerHTML = `
      <div class="shop-panel">
        <div class="shop-top-header">
          <div class="shop-header-left">
            <div class="shop-merchant-avatar">🏪</div>
            <div class="shop-title-group">
              <span class="shop-tag">BAZAR DE LA TORRE • PISO ${gameState.floor}</span>
              <h2 class="shop-main-title">MERCADO DEL DESTINO</h2>
            </div>
          </div>
          <div class="shop-wallet-badge">
            <span class="shop-wallet-icon">🪙</span>
            <div class="shop-wallet-info">
              <span class="shop-wallet-label">ORO DISPONIBLE</span>
              <span class="shop-wallet-val">${gameState.gold} ORO</span>
              <span id="shop-purchase-badge" style="display:inline-block;margin-top:2px;font-size: 9px;font-weight:bold;color:#ffd166;">${typeof getShopPurchasesRemaining === 'function' ? getShopPurchasesRemaining() + ' compras restantes' : '2 compras'}</span>
            </div>
          </div>
        </div>

        <div class="shop-tabs-nav">
          <button class="shop-tab-btn ${currentShopTab === 'consumables' ? 'active' : ''}" onclick="switchShopTab('consumables')">🧪 PROVISIONES</button>
          <button class="shop-tab-btn ${currentShopTab === 'artifacts' ? 'active' : ''}" onclick="switchShopTab('artifacts')">🎴 ARTEFACTOS (${p.artifacts.length}/${maxSlots})</button>
          <button class="shop-tab-btn ${currentShopTab === 'cards' ? 'active' : ''}" onclick="switchShopTab('cards')">📦 SOBRES (${enchantedList.length})</button>
          <button class="shop-tab-btn ${currentShopTab === 'forge' ? 'active' : ''}" onclick="switchShopTab('forge')">🔨 FORJA (${ownedUpgrades.length})</button>
          <button class="shop-tab-btn ${currentShopTab === 'iap' ? 'active' : ''}" onclick="switchShopTab('iap')">👑 TESORO REAL</button>
        </div>

        <div class="shop-grid">
          ${activeTabContent}
        </div>

        <div class="shop-footer">
          <button class="shop-leave-button" onclick="skipShop()">
            <span class="shop-leave-text">🚪 CONTINUAR ASCENSO AL PISO ${gameState.floor + 1}</span>
            <span class="shop-leave-subtext">Avanzar al siguiente combate de la Torre ➔</span>
          </button>
        </div>
      </div>
    `;
    document.getElementById("screen-event").classList.remove("hidden");
  }

  function buyArtifact(id) {
    const p = gameState.player;
    if (!p.artifacts) p.artifacts = [];
    const item = SHOP_ARTIFACTS.find(a => a.id === id);
    if (!item) return;
    if (hasArtifact(id)) {
      addLog("Ya posees este artefacto equipado.", "warning");
      return;
    }
    const maxSlots = getMaxArtifactSlots();
    if (p.artifacts.length >= maxSlots) {
      showGameToast("¡Capacidad de artefactos al límite (" + p.artifacts.length + "/" + maxSlots + ")! Sube de nivel para desbloquear más ranuras.", "warn");
      return;
    }
    if (gameState.gold < item.price) {
      addLog("Oro insuficiente: necesitas " + item.price + " oro (tienes " + gameState.gold + ").", "warning");
      return;
    }
    gameState.gold -= item.price;
    p.artifacts.push({ id: item.id, name: item.name, icon: item.icon });
    if (typeof item.apply === "function") item.apply(p);
    playEnchantChimeSound();
    playCoinSound();
    addLog("🎴 Equipaste " + item.name + " (-" + item.price + " oro). Ranuras: " + p.artifacts.length + "/" + maxSlots + ".", "heal");
    updateHud();
    showShopModal();
  }
  window.buyArtifact = buyArtifact;

  function buyCardUpgrade(id) {
    const p = gameState.player;
    if (!p.cardUpgrades) p.cardUpgrades = [];
    const item = CARD_UPGRADES.find(c => c.id === id);
    if (!item) return;
    if (hasCardUpgrade(id)) {
      addLog("Ya posees esta mejora de carta.", "warning");
      return;
    }
    if (gameState.gold < item.price) {
      addLog("Oro insuficiente: necesitas " + item.price + " oro (tienes " + gameState.gold + ").", "warning");
      return;
    }
    gameState.gold -= item.price;
    p.cardUpgrades.push(item.id);
    playCoinSound();
    addLog("✨ Fragua: ¡" + item.name + " forjada con éxito! (-" + item.price + " oro).", "critical");
    updateHud();
    showShopModal();
  }
  window.buyCardUpgrade = buyCardUpgrade;

  function buyForgeBoosterPack() {
    const p = gameState.player;
    if (!p) return;
    const forgePackPrice = 50;
    if (gameState.gold < forgePackPrice) {
      addLog("Oro insuficiente: necesitas " + forgePackPrice + " oro.", "warning");
      spawnFloatingText("screen-shop", `⚠️ ORO INSUFICIENTE (${forgePackPrice} 🪙)`, "warning");
      try { playBustSound(); } catch (_) {}
      return;
    }
    const unowned = CARD_UPGRADES.filter(cu => !hasCardUpgrade(cu.id));
    if (unowned.length === 0) {
      if (typeof showGameToast === "function") showGameToast("¡Ya has forjado todas las mejoras pasivas de la Torre!", "info");
      return;
    }
    gameState.gold -= forgePackPrice;
    const chosen = unowned[Math.floor(Math.random() * unowned.length)];
    if (!p.cardUpgrades) p.cardUpgrades = [];
    p.cardUpgrades.push(chosen.id);
    try { playCoinSound(); } catch (_) {}
    try { playEnchantChimeSound(); } catch (_) {}
    spawnFloatingText("screen-shop", `🔨 ¡${chosen.name.toUpperCase()} FORJADA!`, "crit");
    addLog(`🔨 Yunque Ancestral: Has forjado pasivamente [${chosen.name}] (${chosen.desc}) para toda esta run.`, "critical");
    saveMidRunState();
    showShopModal();
  }
  window.buyForgeBoosterPack = buyForgeBoosterPack;

  function buyCryptForgeBoosterPack() {
    const p = gameState.player;
    if (!p) return;
    const cryptCost = 50;
    const curCrypts = (typeof getPlayerCryptCoins === "function") ? getPlayerCryptCoins() : 0;
    if (curCrypts < cryptCost) {
      if (typeof showGameToast === "function") {
        showGameToast(`Criptas insuficientes: necesitas ${cryptCost} 💀 Monedas de Cripta.`, "warning");
      }
      spawnFloatingText("screen-shop", `⚠️ FALTAN ${cryptCost - curCrypts} 💀`, "warning");
      try { playBustSound(); } catch (_) {}
      return;
    }
    spendPlayerCryptCoins(cryptCost);
    try { playCoinSound(); } catch (_) {}
    spawnFloatingText("screen-shop", "-50 💀 CRIPTAS", "shield");
    addLog(`💀 Forja de Cripta: Has ofrendado ${cryptCost} Monedas de Cripta para forjar un Sello Arcano temporal exclusivo para esta ascensión (no se guarda en el perfil permanente).`, "critical");
    openBoosterPackBySource("arcane", { free: true, source: "shop_crypt_run_only" });
  }
  window.buyCryptForgeBoosterPack = buyCryptForgeBoosterPack;

  function buyAmulet(type) {
    const p = gameState.player;
    const price = AMULET_PRICES[type];
    if (!price || p.accessory === type || gameState.gold < price) return;
    gameState.gold -= price;
    p.accessory = type;
    registerCodexDiscovery("amulets", type);
    saveMidRunState();
    playCoinSound();
    addLog(`Compraste ${AMULET_INFO[type].name} (-${price} oro).`, "heal");
    updateHud();
    showShopModal();
  }
  window.buyAmulet = buyAmulet;

  function buyPotion() {
    if (gameState.gold >= 20) {
      gameState.gold -= 20;
      gameState.player.potions++;
      playPotionDrinkSound();
      playCoinSound();
      addLog("Compraste una Poción Curativa (+1).", "heal");
      updateHud();
      showShopModal();
    }
  }

  function buyShieldPotion(amount, price) {
    if (gameState.gold >= price) {
      gameState.gold -= price;
      gameState.status.playerShield = (gameState.status.playerShield || 0) + amount;
      playPotionDrinkSound();
      playCoinSound();
      triggerHaptic("potion");
      spawnFloatingText("player-sprite", `🛡️ +${amount} ESCUDO`, "shield");
      addLog(`🛡️ ¡Bebiste Poción de Armadura! +${amount} Escudo azul protector (${gameState.status.playerShield} escudo total).`, "heal");
      updateHud();
      showShopModal();
    } else {
      addLog(`Faltan ${price - gameState.gold} 🪙 para comprar la Poción de Armadura.`, "warning");
    }
  }
  window.buyShieldPotion = buyShieldPotion;

  function buyReroll() {
    if (gameState.gold >= 15) {
      gameState.gold -= 15;
      gameState.player.rerollsAvailable++;
      playRerollActionSound();
      playCoinSound();
      addLog("Compraste un Dado de Reroll (+1).", "heal");
      updateHud();
      showShopModal();
    }
  }

  function buyGoldenDie() {
    if (gameState.gold >= 50 && !gameState.player.hasGoldenDie) {
      gameState.gold -= 50;
      gameState.player.hasGoldenDie = true;
      playEnchantChimeSound();
      playCoinSound();
      addLog("Compraste el Dado de Oro Supremo: +3 daño cuando mano > 4.", "critical");
      updateHud();
      showShopModal();
    }
  }

  /* ============================================================
     MOTOR DE MÁQUINA DE ESCRIBIR (TYPEWRITER EFFECT)
     ============================================================ */
  let typewriterTimeout = null;
  let typewriterActive = false;
  let typewriterFullText = "";
  let typewriterTargetEl = null;
  let typewriterOnComplete = null;

  function runTypewriter(el, text, speed = 20, onComplete = null) {
    if (!el) return;
    if (typewriterTimeout) clearTimeout(typewriterTimeout);
    typewriterActive = true;
    typewriterFullText = text;
    typewriterTargetEl = el;
    typewriterOnComplete = onComplete;
    el.innerHTML = "";
    
    let contentEl;
    let cursorEl;
    if (typeof document !== "undefined" && typeof document.createElement === "function") {
      contentEl = document.createElement("span");
      contentEl.className = "typewriter-content";
      cursorEl = document.createElement("span");
      cursorEl.className = "typewriter-cursor";
      cursorEl.innerText = "|";
      if (el.appendChild) {
        el.appendChild(contentEl);
        el.appendChild(cursorEl);
      }
    }
    let idx = 0;

    function typeChar() {
      if (!typewriterActive) return;
      if (idx < text.length) {
        const char = text.charAt(idx);
        if (contentEl) {
          contentEl.textContent += char;
        } else {
          el.innerText = text.substring(0, idx + 1);
        }
        if (char !== " " && char !== "\n") {
          try { playTypewriterClickSound(); } catch (_) {}
        }
        idx++;
        let delay = speed;
        if (char === "." || char === "!" || char === "?" || char === "…") delay = speed * 9;
        else if (char === "," || char === ";" || char === ":") delay = speed * 4;
        typewriterTimeout = setTimeout(typeChar, delay);
      } else {
        typewriterActive = false;
        if (cursorEl && typeof cursorEl.remove === "function") {
          cursorEl.remove();
        }
        if (typewriterOnComplete) {
          const cb = typewriterOnComplete;
          typewriterOnComplete = null;
          cb();
        }
      }
    }
    typeChar();
  }
  window.runTypewriter = runTypewriter;

  function skipTypewriter() {
    if (!typewriterActive || !typewriterTargetEl) return;
    if (typewriterTimeout) clearTimeout(typewriterTimeout);
    typewriterActive = false;
    typewriterTargetEl.innerHTML = `<span class="typewriter-content">${typewriterFullText}</span>`;
    if (typewriterOnComplete) {
      const cb = typewriterOnComplete;
      typewriterOnComplete = null;
      cb();
    }
  }
  window.skipTypewriter = skipTypewriter;

  function getFloorZoneTitle(floor, maxFloors) {
    return getFloorZoneInfo(floor, maxFloors).title;
  }
  window.getFloorZoneTitle = getFloorZoneTitle;

  /* ============================================================
     FASE 5: BARAJA TÁCTIL EN ABANICO (HAND-DECK FAN) & INSPECTOR
     ============================================================ */
  window.activeFanSuitFilter = "all";

  function setFanSuitFilter(suit, containerId) {
    window.activeFanSuitFilter = suit;
    try { playButtonClickSound(); } catch (_) {}
    const p = gameState.player;
    if (!p) return;
    const map = p.cardEnchantments || {};

    // Si estamos en el inspect modal
    const encGrid = document.getElementById("inspect-enchanted-grid");
    if (encGrid) {
      encGrid.innerHTML = renderHandDeckFan(map, "inspect-hand-deck-fan");
    }

    // Si estamos en la crónica
    const chronicleContainer = document.getElementById("chronicle-hand-deck-fan");
    if (chronicleContainer) {
      const parent = chronicleContainer.closest(".hand-deck-fan-container");
      if (parent) {
        parent.outerHTML = renderHandDeckFan(map, "chronicle-hand-deck-fan");
      }
    }
  }
  window.setFanSuitFilter = setFanSuitFilter;

  function renderHandDeckFan(enchantedMap, containerId) {
    const keys = Object.keys(enchantedMap || {});
    if (keys.length === 0) {
      return `
        <div class="dossier-empty-enchanted">
          Baraja sin sellos arcanos aún. ¡Abre <b>Sobres Arcanos</b> en el Bazar para forjar cartas!
        </div>
      `;
    }
    const total = keys.length;
    const currentFilter = window.activeFanSuitFilter || "all";

    // Conteo por palos
    const counts = { "♠": 0, "♥": 0, "♦": 0, "♣": 0 };
    keys.forEach(k => {
      const s = k.split("_")[0];
      if (counts[s] !== undefined) counts[s]++;
    });

    // Filtrado de cartas a mostrar
    const filteredKeys = currentFilter === "all"
      ? keys
      : keys.filter(k => k.split("_")[0] === currentFilter);

    const filterBarHtml = `
      <div class="fan-suit-filters" onclick="event.stopPropagation()">
        <span class="fan-suit-label">Filtrar por Palo:</span>
        <select class="fan-suit-select" onchange="setFanSuitFilter(this.value, '${containerId || ''}')" aria-label="Filtrar cartas forjadas por palo">
          <option value="all" ${currentFilter === 'all' ? 'selected' : ''}>🃏 TODAS LAS CARTAS (${total})</option>
          <option value="♠" ${currentFilter === '♠' ? 'selected' : ''}>♠ PICAS (${counts['♠']})</option>
          <option value="♥" ${currentFilter === '♥' ? 'selected' : ''}>♥ CORAZONES (${counts['♥']})</option>
          <option value="♦" ${currentFilter === '♦' ? 'selected' : ''}>♦ DIAMANTES (${counts['♦']})</option>
          <option value="♣" ${currentFilter === '♣' ? 'selected' : ''}>♣ TRÉBOLES (${counts['♣']})</option>
        </select>
      </div>
    `;

    let cardsHtml = "";
    if (filteredKeys.length === 0) {
      cardsHtml = `<div style="font-size: 9px;color:#94a3b8;padding:12px;text-align:center;width:100%;">Sin cartas forjadas en este palo aún.</div>`;
    } else {
      cardsHtml = filteredKeys.map((cid) => {
        const seal = enchantedMap[cid] || {};
        const parts = cid.split("_");
        const suit = parts[0] || "♠";
        const rank = parts[1] || "?";
        const suitClass = suit === "♥" ? "suit-red suit-hearts" : (suit === "♦" ? "suit-diamonds" : (suit === "♣" ? "suit-clubs" : "suit-spades"));
        const sealIcon = seal.icon || "✨";
        const sealName = seal.name || "Sello";
        const element = seal.element || "arcane";
        const sealPayload = JSON.stringify(seal).replace(/"/g, '&quot;');
        return `
          <div class="fan-card ${suitClass} element-${element}"
               style="transform:none;flex-shrink:0;"
               onclick="showCardDetailModal({rank:'${rank}', suit:'${suit}', value:'${rank}', seal: ${sealPayload}})"
               title="${rank}${suit} [${sealName}]">
            <div class="fan-card-top">
              <span>${rank}</span>
              <span>${suit}</span>
            </div>
            <div class="fan-card-seal">${sealIcon}</div>
            <div class="fan-card-bottom">${sealName.substring(0, 6)}</div>
          </div>
        `;
      }).join("");
    }

    return `
      <div class="hand-deck-fan-container">
        ${filterBarHtml}
        <div class="hand-deck-cards-scroll" id="${containerId || 'hand-deck-fan'}">
          ${cardsHtml}
        </div>
        <div class="hand-fan-hint">👆 Desliza horizontalmente y toca cualquier carta para ver su función y efecto</div>
      </div>
    `;
  }
  window.renderHandDeckFan = renderHandDeckFan;

  function setupHandFanInteractions(containerId) {
    setTimeout(() => {
      const container = document.getElementById(containerId);
      if (!container) return;
      const cards = container.querySelectorAll(".fan-card");
      if (!cards.length) return;

      container.ontouchmove = (e) => {
        if (!e.touches || !e.touches[0]) return;
        const touch = e.touches[0];
        const el = document.elementFromPoint(touch.clientX, touch.clientY);
        if (el) {
          const cardEl = el.closest(".fan-card");
          cards.forEach(c => c.classList.remove("lifted"));
          if (cardEl) {
            cardEl.classList.add("lifted");
          }
        }
      };

      container.ontouchend = () => {
        cards.forEach(c => c.classList.remove("lifted"));
      };
    }, 60);
  }
  window.setupHandFanInteractions = setupHandFanInteractions;

  function showCardDetailModal(data) {
    if (!data) return;
    const modal = document.getElementById("screen-card-detail");
    if (!modal) return;

    const rankEl = document.getElementById("card-detail-rank");
    const suitEl = document.getElementById("card-detail-suit");
    const valEl = document.getElementById("card-detail-val");
    const sealIconEl = document.getElementById("card-detail-seal-icon");
    const cardPreview = document.getElementById("card-detail-card-preview");
    const nameEl = document.getElementById("card-detail-name");
    const sealBadgeEl = document.getElementById("card-detail-seal-badge");
    const descEl = document.getElementById("card-detail-desc");
    const synergyEl = document.getElementById("card-detail-synergy");

    const rank = data.rank || "?";
    const suit = data.suit || "♠";
    const isRed = (suit === "♥" || suit === "♦");
    const seal = data.seal || null;

    let suitName = "Picas";
    if (suit === "♥") suitName = "Corazones";
    else if (suit === "♦") suitName = "Diamantes";
    else if (suit === "♣") suitName = "Tréboles";

    let rankName = rank;
    if (rank === "A") rankName = "As";
    else if (rank === "K") rankName = "Rey";
    else if (rank === "Q") rankName = "Reina";
    else if (rank === "J") rankName = "Jack";

    if (cardPreview) {
      if (isRed) cardPreview.classList.add("suit-red");
      else cardPreview.classList.remove("suit-red");
    }

    if (rankEl) rankEl.innerText = rank;
    if (suitEl) suitEl.innerText = suit;
    if (valEl) valEl.innerText = data.value || (rank === "A" ? "1 u 11" : (["K", "Q", "J"].includes(rank) ? "10" : rank));

    if (nameEl) nameEl.innerText = `${rankName.toUpperCase()} DE ${suitName.toUpperCase()}`;

    if (seal) {
      if (sealIconEl) {
        sealIconEl.innerText = seal.icon || "✨";
        sealIconEl.style.display = "";
      }
      if (sealBadgeEl) {
        sealBadgeEl.innerText = `${seal.icon || ''} ${seal.name || 'SELLO ARCANO'} (${seal.badge || 'FORJADO'})`;
        sealBadgeEl.style.display = "";
      }
      if (descEl) descEl.innerText = seal.desc || "Carta forjada con energía arcana.";
      
      const elNames = {
        fire: "Fuego (Explosión Ígnea)",
        blood: "Sangre (Pacto Carmesí)",
        shield: "Acero (Baluarte Defensivo)",
        blade: "Filo (Frenesí Cortante)",
        toxic: "Cicuta (Miasma Venenoso)",
        arcane: "Arcano (Convergencia Astral)",
        fortune: "Fortuna (Avaricia Dorada)"
      };
      const element = seal.element || "arcane";
      if (synergyEl) {
        synergyEl.innerText = `${elNames[element] || element}. Se activa al jugar cartas del mismo elemento juntas.`;
      }
    } else {
      if (sealIconEl) sealIconEl.style.display = "none";
      if (sealBadgeEl) {
        sealBadgeEl.innerText = "CARTA ESTÁNDAR";
        sealBadgeEl.style.display = "";
      }
      if (descEl) descEl.innerText = "Naipe de la baraja básica. Puedes impregnarle sellos arcanos en los Sobres del Bazar.";
      if (synergyEl) synergyEl.innerText = "Forma parejas (Duplas) para ganar +2 de Defensa de armadura.";
    }

    modal.classList.remove("hidden");
    try { playCardDealSound(); } catch (_) {}
  }
  window.showCardDetailModal = showCardDetailModal;

  function closeCardDetailModal(e) {
    if (e && e.target && e.target.classList && e.target.classList.contains("card-detail-card")) return;
    const modal = document.getElementById("screen-card-detail");
    if (modal) modal.classList.add("hidden");
  }
  window.closeCardDetailModal = closeCardDetailModal;

  /* ============================================================
     FASE 5: SISTEMA DE PAUSA Y MENÚ IN-GAME
     ============================================================ */
  let gameSpeedMultiplier = 1;
  let hapticsActive = true;
  var gamePaused = false;
  window.gamePaused = gamePaused;

  function openInGamePauseMenu() {
    gamePaused = true;
    window.gamePaused = true;
    const modal = document.getElementById("screen-ingame-pause");
    if (!modal) return;
    cancelPauseConfirm();

    const metaEl = document.getElementById("pause-run-meta");
    const p = gameState.player;
    const maxF = (typeof getMaxFloorsForDifficulty === "function") ? getMaxFloorsForDifficulty() : 13;
    if (metaEl && p) {
      metaEl.innerText = `PISO ${gameState.floor} / ${maxF} • ${(p.name || 'JACK').toUpperCase()} • NVL ${p.level || 1} (🪙 ${gameState.gold} ORO)`;
    }

    const soundBtn = document.getElementById("pause-btn-sound");
    if (soundBtn) {
      const isSoundOn = Boolean(gameState.audioEnabled);
      soundBtn.innerText = isSoundOn ? "ACTIVADO" : "SILENCIADO";
      if (isSoundOn) soundBtn.classList.add("active");
      else soundBtn.classList.remove("active");
    }

    const volPct = Math.round((gameState.audioVolume || 0) * 100);
    const volSlider = document.getElementById("pause-volume-slider");
    if (volSlider) volSlider.value = String(volPct);
    const volVal = document.getElementById("pause-vol-val");
    if (volVal) volVal.innerText = `${volPct}%`;

    const musPct = Math.round((gameState.musicVolume !== undefined ? gameState.musicVolume : 0.5) * 100);
    const musSlider = document.getElementById("pause-music-slider");
    if (musSlider) musSlider.value = String(musPct);
    const musVal = document.getElementById("pause-vol-music-val");
    if (musVal) musVal.innerText = `${musPct}%`;

    const sfxPct = Math.round((gameState.sfxVolume !== undefined ? gameState.sfxVolume : 0.8) * 100);
    const sfxSlider = document.getElementById("pause-sfx-slider");
    if (sfxSlider) sfxSlider.value = String(sfxPct);
    const sfxVal = document.getElementById("pause-vol-sfx-val");
    if (sfxVal) sfxVal.innerText = `${sfxPct}%`;

    modal.classList.remove("hidden");
    try { playCardDealSound(); } catch (_) {}
  }
  window.openInGamePauseMenu = openInGamePauseMenu;

  function closeInGamePauseMenu() {
    gamePaused = false;
    window.gamePaused = false;
    const modal = document.getElementById("screen-ingame-pause");
    if (!modal) return;
    modal.classList.add("hidden");
    cancelPauseConfirm();
  }
  window.closeInGamePauseMenu = closeInGamePauseMenu;

  function askRestartRun() {
    const box = document.getElementById("pause-confirm-box");
    const msg = document.getElementById("pause-confirm-msg");
    const okBtn = document.getElementById("pause-confirm-ok-btn");
    const mainActions = document.getElementById("pause-actions-main");

    if (box && msg && okBtn) {
      msg.innerText = "¿Deseas reiniciar la Torre desde el Piso 1? Conservarás toda la EXP de maestría ganada.";
      okBtn.onclick = () => {
        closeInGamePauseMenu();
        restartCurrentRun();
      };
      box.classList.remove("hidden");
      if (mainActions) mainActions.style.display = "none";
    }
  }
  window.askRestartRun = askRestartRun;

  function askExitToMainMenu() {
    const box = document.getElementById("pause-confirm-box");
    const msg = document.getElementById("pause-confirm-msg");
    const okBtn = document.getElementById("pause-confirm-ok-btn");
    const mainActions = document.getElementById("pause-actions-main");

    if (box && msg && okBtn) {
      msg.innerText = "¿Abandonar la ascensión actual y volver al Menú Principal? Se guardará tu EXP permanente.";
      okBtn.onclick = () => {
        closeInGamePauseMenu();
        exitToMainMenu();
      };
      box.classList.remove("hidden");
      if (mainActions) mainActions.style.display = "none";
    }
  }
  window.askExitToMainMenu = askExitToMainMenu;

  function cancelPauseConfirm() {
    const box = document.getElementById("pause-confirm-box");
    const mainActions = document.getElementById("pause-actions-main");
    if (box) box.classList.add("hidden");
    if (mainActions) mainActions.style.display = "";
  }
  window.cancelPauseConfirm = cancelPauseConfirm;

  function restartCurrentRun() {
    const p = gameState.player;
    const heroKey = (p && p.class) ? p.class : "knight";
    clearMidRunState();
    startGame(heroKey);
  }
  window.restartCurrentRun = restartCurrentRun;

  function exitToMainMenu() {
    clearMidRunState();
    // La run termina: hay que silenciar la música de combate/alarma o quedaría
    // sonando sobre la pantalla de título (bug de audio reportado).
    try { stopCombatMusic(); } catch (_) {}
    try { stopSuddenDeathTension(); } catch (_) {}
    const screensToHide = ["screen-event", "screen-inspect", "screen-chronicle", "screen-levelup", "screen-combat-start", "screen-booster-pack", "screen-ingame-pause", "screen-card-detail", "intro-gold-reward-banner"];
    screensToHide.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add("hidden");
    });
    if (window._introGoldBannerTimer) {
      clearTimeout(window._introGoldBannerTimer);
      window._introGoldBannerTimer = null;
    }
    const screenTitle = document.getElementById("screen-title");
    if (screenTitle) screenTitle.classList.remove("hidden");
    if (typeof updateResumeRunButton === "function") updateResumeRunButton();
    if (typeof renderHeroBook === "function") renderHeroBook();
    try { playTitleMusic(); } catch (_) {}
  }
  window.exitToMainMenu = exitToMainMenu;

  function toggleSoundFromPause() {
    toggleSound();
    const soundBtn = document.getElementById("pause-btn-sound");
    if (soundBtn) {
      const isSoundOn = Boolean(gameState.audioEnabled);
      soundBtn.innerText = isSoundOn ? "ACTIVADO" : "SILENCIADO";
      if (isSoundOn) soundBtn.classList.add("active");
      else soundBtn.classList.remove("active");
    }
  }
  window.toggleSoundFromPause = toggleSoundFromPause;

  function setGameSpeed(speed) {
    gameSpeedMultiplier = speed;
    ["speed-btn-1", "speed-btn-15", "speed-btn-2"].forEach(id => {
      const b = document.getElementById(id);
      if (b) b.classList.remove("active");
    });
    if (speed === 1) {
      const b = document.getElementById("speed-btn-1");
      if (b) b.classList.add("active");
    } else if (speed === 1.5) {
      const b = document.getElementById("speed-btn-15");
      if (b) b.classList.add("active");
    } else if (speed === 2) {
      const b = document.getElementById("speed-btn-2");
      if (b) b.classList.add("active");
    }
    const badge = document.getElementById("speed-indicator-badge");
    if (badge) {
      badge.innerText = speed === 1 ? "1x Normal" : (speed === 1.5 ? "1.5x Rápido" : "2x Turbo");
    }
  }
  window.setGameSpeed = setGameSpeed;

  function toggleHapticsFromPause() {
    hapticsActive = !hapticsActive;
    const btn = document.getElementById("pause-btn-haptic");
    if (btn) {
      btn.innerText = hapticsActive ? "ACTIVADA" : "DESACTIVADA";
      if (hapticsActive) btn.classList.add("active");
      else btn.classList.remove("active");
    }
  }
  window.toggleHapticsFromPause = toggleHapticsFromPause;

  /* ============================================================
     MODAL DE CRÓNICA NARRATIVA Y REVISIÓN DEL HÉROE (LORE GATING)
     ============================================================ */
  function showChronicleModal(overrideFloor = null) {
    const p = gameState.player;
    if (!p) return;
    const heroKey = p.class || "knight";
    const currentFloor = overrideFloor || gameState.floor;
    const nextFloor = currentFloor + 1;
    const hero = HERO_DATA[heroKey] || HERO_DATA.knight;

    const heroStories = HERO_LORES[heroKey] || HERO_LORES.knight;
    let storyText = heroStories[currentFloor] || `Has superado los desafíos del Piso ${currentFloor}. Tu ascensión continúa por la Torre del 21.`;
    if (typeof window.applyLorePatch === "function") {
      storyText = window.applyLorePatch(currentFloor, storyText);
    }

    const screenEvent = document.getElementById("screen-event");
    if (screenEvent) screenEvent.classList.add("hidden");

    const screenChronicle = document.getElementById("screen-chronicle");
    const badgeEl = document.getElementById("chronicle-floor-badge");
    const zoneTitleEl = document.getElementById("chronicle-zone-title");
    const storyTextEl = document.getElementById("chronicle-story-text");
    const heroDossierEl = document.getElementById("chronicle-hero-dossier");
    const btnAscend = document.getElementById("btn-ascend-tower");
    const btnMain = document.getElementById("chronicle-btn-main");
    const btnSub = document.getElementById("chronicle-btn-sub");

    const maxFloors = (typeof getMaxFloorsForDifficulty === "function") ? getMaxFloorsForDifficulty() : 13;
    if (badgeEl) badgeEl.innerText = `📜 CRÓNICA DEL ASCENSO • PISO ${currentFloor} / ${maxFloors}`;
    if (zoneTitleEl) zoneTitleEl.innerText = getFloorZoneTitle(currentFloor);

    // BLOQUEO DE ASCENSIÓN HASTA FINALIZAR LA LECTURA DE LA HISTORIA
    if (btnAscend) {
      btnAscend.disabled = true;
      btnAscend.classList.remove("chronicle-btn-ready");
      btnAscend.classList.add("chronicle-btn-locked");
    }
    if (btnMain) btnMain.innerText = "⏳ LEYENDO CRÓNICA...";
    if (btnSub) btnSub.innerText = "Debes asimilar la historia del piso para abrir la puerta de ascenso";

    const unlockAscent = () => {
      if (btnAscend) {
        btnAscend.disabled = false;
        btnAscend.classList.remove("chronicle-btn-locked");
        btnAscend.classList.add("chronicle-btn-ready");
      }
      try { playLevelUpSound(); } catch (_) {}
      if (btnMain && btnSub) {
        if (nextFloor > maxFloors) {
          btnMain.innerText = "🐉 ENFRENTAR AL DRAGÓN ANCESTRAL";
          btnSub.innerText = `Entrar a la Cúspide de la Torre (Piso ${maxFloors})`;
        } else {
          btnMain.innerText = `✨ ASCENDER AL PISO ${nextFloor}`;
          btnSub.innerText = `Subir por las escaleras hacia el Piso ${nextFloor}`;
        }
      }
    };

    if (storyTextEl) {
      runTypewriter(storyTextEl, storyText, 38, unlockAscent);
      storyTextEl.onclick = () => {
        if (typewriterActive) {
          skipTypewriter();
          unlockAscent();
        }
      };
    }

    if (heroDossierEl) {
      const maxSlots = getMaxArtifactSlots();
      const artifacts = p.artifacts || [];
      const enchantedMap = p.cardEnchantments || {};
      const enchantedKeys = Object.keys(enchantedMap);
      const cardsUpgraded = enchantedKeys.length + (p.cardUpgrades ? p.cardUpgrades.length : 0);
      const currentShield = gameState.status ? (gameState.status.playerShield || 0) : 0;

      let slotsHtml = "";
      for (let i = 0; i < maxSlots; i++) {
        if (i < artifacts.length) {
          const rawArt = artifacts[i];
          const art = normalizeArtifact(rawArt) || { icon: "🎴", name: "Artefacto", desc: "Artefacto equipado." };
          const artIcon = art.icon || "🎴";
          const artName = art.name || "Artefacto";
          const artDesc = art.desc ? `${artName}: ${art.desc}` : artName;
          slotsHtml += `<div class="dossier-slot filled" title="${artDesc}" style="cursor:pointer;" onclick="showGameAlert('${(art.desc || art.name).replace(/'/g, "\\'")}', 'ARTEFACTO: ${(art.name || '').replace(/'/g, "\\'")}')">${artIcon}</div>`;
        } else {
          slotsHtml += `<div class="dossier-slot empty" title="Ranura Libre">[+]</div>`;
        }
      }

      // Baraja de mano táctil forjada con sellos arcanos en abanico
      let enchantedGalleryHtml = renderHandDeckFan(enchantedMap, "chronicle-hand-deck-fan");
      setupHandFanInteractions("chronicle-hand-deck-fan");

      // Cálculo de sinergias elementales activas en la baraja
      const elementCounts = {};
      enchantedKeys.forEach(cid => {
        const s = enchantedMap[cid];
        if (s) {
          const el = s.element || s.id;
          elementCounts[el] = (elementCounts[el] || 0) + 1;
        }
      });
      const synergiesList = [];
      if ((elementCounts.fire || 0) >= 2) synergiesList.push({ icon: "🔥", name: "Explosión Ígnea" });
      if ((elementCounts.blood || 0) >= 2) synergiesList.push({ icon: "🩸", name: "Pacto Carmesí" });
      if ((elementCounts.shield || 0) >= 2) synergiesList.push({ icon: "🛡️", name: "Baluarte Acero" });
      if ((elementCounts.blade || 0) >= 2) synergiesList.push({ icon: "⚔️", name: "Frenesí de Filo" });
      if ((elementCounts.toxic || 0) >= 2) synergiesList.push({ icon: "☠️", name: "Miasma Tóxico" });
      if ((elementCounts.arcane || 0) >= 2) synergiesList.push({ icon: "🔮", name: "Convergencia Arcana" });

      let synergiesBannerHtml = "";
      if (synergiesList.length > 0) {
        synergiesBannerHtml = `
          <div class="dossier-synergies-banner">
            <span>⚡ Sinergias:</span>
            <span style="color:#fff;font-weight:bold;">${synergiesList.map(s => `${s.icon} ${s.name}`).join(" • ")}</span>
          </div>
        `;
      }

      const accInfo = (p.accessory && typeof AMULET_INFO !== "undefined" && AMULET_INFO[p.accessory])
        ? AMULET_INFO[p.accessory]
        : (p.accessory ? { name: p.accessory, icon: "💍", desc: "Accesorio equipado." } : null);
      const blessingInfo = (p.starterBlessing && typeof STARTER_BLESSINGS !== "undefined")
        ? STARTER_BLESSINGS.find(b => b.id === p.starterBlessing)
        : (p.gem ? { name: p.gem.toUpperCase(), icon: "💎", desc: "Bendición activa." } : null);

      heroDossierEl.innerHTML = `
        <div class="dossier-hero-header">
          <div class="dossier-avatar">
            ${hero.img ? `<img src="${hero.img}" class="dossier-avatar" alt="${p.name}">` : (p.sprite || "🛡️")}
          </div>
          <div class="dossier-hero-meta">
            <div class="dossier-hero-name">${(p.name || "JACK").toUpperCase()}</div>
            <div class="dossier-hero-level">⭐ Nivel ${p.level || 1} • ${hero.title || "Héroe del 21"}</div>
          </div>
        </div>

        <div class="dossier-stats-grid">
          <div class="dossier-stat-pill">
            <span class="lbl">❤️ SALUD</span>
            <span class="val hp">${p.hp} / ${p.maxHp} HP</span>
          </div>
          <div class="dossier-stat-pill">
            <span class="lbl">⚔️ ATAQUE</span>
            <span class="val pwr">${p.pwr} PWR</span>
          </div>
          <div class="dossier-stat-pill">
            <span class="lbl">🛡️ ARMADURA</span>
            <span class="val def">${p.def} DEF ${currentShield > 0 ? `(+${currentShield})` : ""}</span>
          </div>
          <div class="dossier-stat-pill">
            <span class="lbl">🪙 ORO</span>
            <span class="val gold">${gameState.gold} ORO</span>
          </div>
        </div>

        <div class="dossier-equipment-row" style="display:flex;gap:8px;margin-bottom:8px;">
          <div class="dossier-eq-badge" style="flex:1;background:rgba(0,0,0,0.45);border:1px solid rgba(255,209,102,0.3);border-radius:6px;padding:6px 8px;display:flex;align-items:center;gap:6px;cursor:pointer;" onclick="explainEquipmentPill('blessing')">
            <span style="font-size:18px;">${blessingInfo ? blessingInfo.icon : "💎"}</span>
            <div style="min-width:0;text-align:left;">
              <div style="font-size:8px;color:#94a3b8;letter-spacing:0.5px;">BENDICIÓN</div>
              <div style="font-size:10px;color:#ffd166;font-weight:bold;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${blessingInfo ? blessingInfo.name : "Ninguna"}</div>
            </div>
          </div>
          <div class="dossier-eq-badge" style="flex:1;background:rgba(0,0,0,0.45);border:1px solid rgba(100,180,255,0.3);border-radius:6px;padding:6px 8px;display:flex;align-items:center;gap:6px;cursor:pointer;" onclick="explainEquipmentPill('accessory')">
            <span style="font-size:18px;">${accInfo ? accInfo.icon : "💍"}</span>
            <div style="min-width:0;text-align:left;">
              <div style="font-size:8px;color:#94a3b8;letter-spacing:0.5px;">ACCESORIO</div>
              <div style="font-size:10px;color:#64b4ff;font-weight:bold;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${accInfo ? accInfo.name : "Ninguno"}</div>
            </div>
          </div>
        </div>

        <div class="dossier-artifacts-section">
          <div class="dossier-artifacts-title">
            <span>🎴 ARTEFACTOS (${artifacts.length}/${maxSlots})</span>
            <span style="color:#66fcf1;">✨ ${cardsUpgraded} Cartas Forjadas</span>
          </div>
          <div class="dossier-slots-row">
            ${slotsHtml}
          </div>
        </div>

        <div class="dossier-enchanted-section">
          <div class="dossier-enchanted-title">
            <span>🃏 CARTAS FORJADAS EN BARAJA (${enchantedKeys.length})</span>
            <span style="color:#ffd166;font-size: 9px;">52 cartas</span>
          </div>
          ${enchantedGalleryHtml}
          ${synergiesBannerHtml}
        </div>
      `;
    }

    if (screenChronicle) screenChronicle.classList.remove("hidden");
  }
  window.showChronicleModal = showChronicleModal;

  function startTowerAscent() {
    const btnAscend = document.getElementById("btn-ascend-tower");
    if (btnAscend && btnAscend.disabled) {
      addLog("Debes terminar de leer la crónica del piso antes de ascender.", "warning");
      return;
    }
    skipTypewriter();
    const screenChronicle = document.getElementById("screen-chronicle");
    if (screenChronicle) screenChronicle.classList.add("hidden");

    advanceToNextFloor();
  }
  window.startTowerAscent = startTowerAscent;

  function advanceToNextFloor() {
    const titleEl = document.getElementById("event-title");
    const descEl = document.getElementById("event-desc");
    if (titleEl) titleEl.style.display = "";
    if (descEl) descEl.style.display = "";
    const screenEv = document.getElementById("screen-event");
    if (screenEv) screenEv.classList.add("hidden");
    const p = gameState.player;

    // Niebla Profunda solo dura el piso en que se eligió
    if (p && p.curse === "heavy_fog") {
      p.curse = null;
      addLog("La Niebla Profunda se disipa.", "info");
    }

    gameState.floor++;
    checkHeroUnlockCondition("monk", gameState.floor, "max");
    saveMidRunState();
    const maxFloors = (typeof getMaxFloorsForDifficulty === "function") ? getMaxFloorsForDifficulty() : 13;
    if (gameState.floor > maxFloors) {
      showVictory();
      return;
    }

    showFloorTransition(() => {
      if (gameState.player) {
        gameState.player.turnShieldBonus = 0;
        gameState.player.turnDoubleDamage = false;
        gameState.player.duplaDef = 0;
      }
      initFloor();
    });
  }
  window.advanceToNextFloor = advanceToNextFloor;

  function skipShop() {
    showChronicleModal();
  }
  window.skipShop = skipShop;

  /* ============================================================
     CURSE ALTAR — PISOS 5 y 9 (ALTAR DEL SACRIFICIO OSCURO)
     ============================================================ */
  const SACRIFICE_PACTS_POOL = [
    {
      id: "heavy_fog",
      badge: "SACRIFICIO VISUAL",
      title: "Pacto de la Niebla Ciega",
      icon: "🌫️",
      costText: "Cartas rivales quedan en penumbra todo este piso.",
      gainText: "Recibes +30 Oro ensangrentado del altar.",
      btnText: "🩸 SELLAR PACTO (+30 ORO)",
      onApply: (p, g) => { p.curse = "heavy_fog"; g.gold += 30; addLog("🩸 Pacto del Altar: Niebla Ciega sellada (+30 Oro).", "critical"); }
    },
    {
      id: "crushing_gravity",
      badge: "SACRIFICIO DE HIERRO",
      title: "Pacto del Hierro Quebrado",
      icon: "⚖️",
      costText: "Tu armadura se parte: -2 DEF permanente.",
      gainText: "El altar restaura +35 HP de vida a tu héroe.",
      btnText: "🩸 SELLAR PACTO (+35 HP)",
      onApply: (p, g) => { p.def = Math.max(0, p.def - 2); p.curse = "crushing_gravity"; const h = Math.min(35, p.maxHp - p.hp); p.hp += h; addLog(`🩸 Pacto del Altar: Hierro Quebrado (-2 DEF, +${h} HP).`, "critical"); }
    },
    {
      id: "cursed_deck",
      badge: "SACRIFICIO VITAL",
      title: "Pacto del Mazo Astillado",
      icon: "⚡",
      costText: "Los Ases te drenan -5 HP al robarse.",
      gainText: "Otorga +2 PWR de ataque permanente a tu héroe.",
      btnText: "🩸 SELLAR PACTO (+2 PWR)",
      onApply: (p, g) => { p.curse = "cursed_deck"; p.pwr += 2; addLog("🩸 Pacto del Altar: Mazo Astillado sellado (+2 PWR permanente).", "critical"); }
    },
    {
      id: "blood_tithe",
      badge: "DIEZMO DE SANGRE",
      title: "Tributo de Sangre Carmesí",
      icon: "🩸",
      costText: "Pierdes 15 HP de golpe en la mesa sacrificial.",
      gainText: "Ganas +2 Dados de Reroll táctico y +1 Poción curativa.",
      btnText: "🩸 SELLAR PACTO (+2 REROLL / +1 POCIÓN)",
      onApply: (p, g) => { p.hp = Math.max(1, p.hp - 15); p.rerollsAvailable = (p.rerollsAvailable || 0) + 2; p.potions = (p.potions || 0) + 1; addLog("🩸 Pacto del Altar: Diezmo de Sangre (-15 HP, +2 Rerolls, +1 Poción).", "critical"); }
    },
    {
      id: "frail_soul",
      badge: "SACRIFICIO DEL ALMA",
      title: "Pacto del Alma Desgarrada",
      icon: "💀",
      costText: "-12 HP Máximo permanente durante toda la ascensión.",
      gainText: "¡Ira frenética! Otorga +3 PWR permanente de ataque.",
      btnText: "🩸 SELLAR PACTO (+3 PWR / -12 HP MÁX)",
      onApply: (p, g) => { p.maxHp = Math.max(30, p.maxHp - 12); p.hp = Math.min(p.hp, p.maxHp); p.pwr += 3; addLog("🩸 Pacto del Altar: Alma Desgarrada (-12 HP Máx, +3 PWR).", "critical"); }
    },
    {
      id: "greed_curse",
      badge: "AVARICIA PROHIBIDA",
      title: "Pacto de Midas Corrupto",
      icon: "🪙",
      costText: "Maldición de la Codicia: la próxima tienda costará 50% más.",
      gainText: "Recibes inmediatamente una bolsa de +50 Oro al instante.",
      btnText: "🩸 SELLAR PACTO (+50 ORO)",
      onApply: (p, g) => { p.curse = "greed_curse"; g.gold += 50; addLog("🩸 Pacto del Altar: Avaricia Sellada (+50 Oro de tributo).", "critical"); }
    },
    {
      id: "shadow_veil",
      badge: "VELO OSCURO",
      title: "Pacto del Silencio de Sombras",
      icon: "🌑",
      costText: "Incapacidad para beber pociones curativas en el piso.",
      gainText: "El altar te envuelve con +15 Escudo azul y +20 Oro.",
      btnText: "🩸 SELLAR PACTO (+15 ESCUDO / +20 ORO)",
      onApply: (p, g) => { p.curse = "shadow_veil"; if (!g.status) g.status = {}; g.status.playerShield = (g.status.playerShield || 0) + 15; g.gold += 20; addLog("🩸 Pacto del Altar: Velo de Sombras (+15 Escudo, +20 Oro).", "critical"); }
    },
    {
      id: "gambler_pact",
      badge: "PACTO DEL AZAR",
      title: "Juramento del Gran Tahúr",
      icon: "🎲",
      costText: "Tu apuesta mínima de combate queda fijada en 10 HP.",
      gainText: "¡Blackjack Letal! Todo 21 multiplica tu impacto por x3.5.",
      btnText: "🩸 SELLAR PACTO (BLACKJACK x3.5)",
      onApply: (p, g) => { p.curse = "gambler_pact"; p.blackjackMultiplier = 3.5; addLog("🩸 Pacto del Altar: Gran Tahúr sellado (Apuestas altas, Blackjack x3.5).", "critical"); }
    }
  ];

  const CURSE_NAMES = {
    cursed_deck: "Mazo Astillado (-5 HP por cada As)",
    gambler_pact: "Juramento del Gran Tahúr (Apuesta mín. 10 HP, Blackjack x3.5)",
    greed_curse: "Avaricia Sellada (+50% costes en tienda)",
    shadow_veil: "Velo del Silencio (Sin pociones curativas)",
    frail_soul: "Alma Desgarrada (-12 HP Máx)",
    blood_tithe: "Diezmo de Sangre (-15 HP)",
    heavy_fog: "Niebla Ciega (Cartas rivales ocultas)",
    crushing_gravity: "Hierro Quebrado (-2 DEF)"
  };
  window.CURSE_NAMES = CURSE_NAMES;

  let currentAltarPacts = [];

  function showCurseAltar() {
    try { playAltarSummonSound(); } catch (_) {}
    const titleEl = document.getElementById("event-title");
    const descEl = document.getElementById("event-desc");
    if (titleEl) {
      titleEl.style.display = "";
      titleEl.innerText = "🩸 CÁMARA DEL ALTAR OSCURO";
    }
    if (descEl) {
      descEl.style.display = "";
      descEl.innerText = "La Torre exige un tributo de sangre a cambio de franquear el paso. Elige cuál de los 3 pactos oscuros sellarás con tu alma:";
    }

    const poolCopy = [...SACRIFICE_PACTS_POOL];
    shuffleArray(poolCopy);
    currentAltarPacts = poolCopy.slice(0, 3);

    document.getElementById("event-options").innerHTML = `
      <div class="altar-ritual-chamber">
        <!-- ESCENA VISUAL DEL ALTAR -->
        <div class="altar-scene-container">
          <div class="altar-occult-runes">✦ 🜏 🜍 🜎 ✦</div>
          <div class="altar-table-scene">
            <span class="altar-candle">🕯️</span>
            <div class="altar-monolith">
              <span>💀</span>
              <span style="font-size:18px;color:#ff758f;font-weight:bold;letter-spacing:1px;">MESA SACRIFICIAL</span>
              <span>🍷</span>
            </div>
            <span class="altar-candle">🕯️</span>
          </div>
          <div class="altar-narrative-box">
            Velas negras gotean cera ardiente sobre la piedra agrietada. Un cáliz de sangre oscura aguarda tu firma ritual.
          </div>
        </div>

        <!-- 3 PACTOS OSCUROS ALEATORIOS DEL POOL DE SACRIFICIOS -->
        <div class="altar-pact-grid">
          ${currentAltarPacts.map(pact => `
            <div class="altar-pact-card" onclick="selectCurse('${pact.id}')">
              <div class="altar-pact-header">
                <div class="altar-pact-icon">${pact.icon}</div>
                <div class="altar-pact-meta">
                  <div class="altar-pact-badge">${pact.badge}</div>
                  <div class="altar-pact-title">${pact.title}</div>
                </div>
              </div>
              <div class="altar-pact-desc">
                <span class="altar-pact-cost">☠️ Maldición:</span> ${pact.costText}<br>
                <span class="altar-pact-gain">✨ Tributo:</span> <b>${pact.gainText}</b>
              </div>
              <button class="altar-pact-btn" onclick="event.stopPropagation(); selectCurse('${pact.id}');">${pact.btnText}</button>
            </div>
          `).join("")}
        </div>
      </div>
    `;
    document.getElementById("screen-event").classList.remove("hidden");
  }
  window.showCurseAltar = showCurseAltar;

  function selectCurse(curseType) {
    try { playSwordClashSound(); } catch (_) {}
    const p = gameState.player;
    gameState.curseTakenOnFloor[gameState.floor] = true;

    const pact = SACRIFICE_PACTS_POOL.find(p => p.id === curseType);
    if (pact && typeof pact.onApply === "function") {
      pact.onApply(p, gameState);
    }

    updateHud();
    document.getElementById("screen-event").classList.add("hidden");
    p.turnShieldBonus = 0;
    p.turnDoubleDamage = false;
    p.duplaDef = 0;
    initFloor();
  }
  window.selectCurse = selectCurse;

  /* ============================================================
     HUD UPDATE
     ============================================================ */
  // Icono del accesorio reflejado en el sprite del jugador (hueco vacío si no hay)
  const ACC_ICONS = {
    blood_amulet: "🩸",
    amber_amulet: "💍",
    lucky_charm: "🍀",
    spiked_belt: "👖",
    lead_gauntlet: "🥇",
    steel_helm: "⛑️",
  };

  // Descripción de cada mejora (tooltips al pasar el cursor)
  const ITEM_INFO = {
    ruby: "RUBÍ ÍGNEO: +2 de daño cuando tu mano total es impar",
    sapphire: "ZAFIRO GUARDIÁN: cada piso empiezas con 5 de escudo",
    emerald: "ESMERALDA DEL DESTINO: +1 de PWR permanente",
    topaz: "TOPACIO: +1 de daño en cada mano ganada",
    blackjack_gem: "JOYA DE BLACKJACK: al sacar 21, +5 de daño extra y +15 HP",
    blackjack_heritage: "JOYA HEREDADA: al sacar 21, daño x4 (en vez de x3) y +16 HP",
    blood_amulet: "AMULETO DE SANGRE: +6 HP al derrotar a un rival",
    amber_amulet: "AMULETO ÁMBAR: +1 HP al inicio de cada piso",
    lucky_charm: "AMULETO DE LA SUERTE: 25% de evitar por completo un golpe",
    spiked_belt: "CINTURÓN CON PÚAS: devuelves 2 de daño al rival cuando recibes daño",
    lead_gauntlet: "GUANTE DE PLOMO: tus cartas de valor bajo cuentan como mínimo 3",
    steel_helm: "CASCO DE ACERO: +1 de DEF permanente",
    heavy_fog: "NIEBLA PROFUNDA: las cartas del rival están ocultas todo el piso",
    crushing_gravity: "GRAVEDAD APLASTANTE: -2 de DEF permanente",
    cursed_deck: "MAZO ASTILLADO: cada As (valor 11) que robes te cuesta 5 HP",
    golden_die: "DADO DE ORO: +3 de daño en cada mano que ganes (compra única, 50 oro)",
    scholar_tome: "TOMO DEL GRAN SABIO: +60% de EXP adicional al matar rivales",
    knowledge_talisman: "TALISMÁN DEL CONOCIMIENTO: +35 de EXP fija extra cada vez que elimines a un rival",
    scholar_pact: "PACTO DEL ERUDITO: +100% de EXP (el doble) por baja, pero -10 HP Máximo",
    gambler_pact: "JURAMENTO DEL GRAN TAHÚR: Apuesta mínima 10 HP, todo Blackjack inflige daño x3.5",
    greed_curse: "AVARICIA SELLADA: Los costes de la tienda aumentan un 50%",
    shadow_veil: "VELO DEL SILENCIO: No puedes beber pociones curativas",
    frail_soul: "ALMA DESGARRADA: -12 HP Máximo permanente",
    blood_tithe: "DIEZMO DE SANGRE: Sacrificio de 15 HP al pactar",
  };

  /* ============================================================
     INSPECCIÓN DETALLADA DE PERSONAJES (FICHA DE COMBATE)
     ============================================================ */
  function getEnemyTraitDescription(e) {
    if (e.trait === "thief") return "Robo: Si el rival gana la mano, te roba 5 de oro.";
    if (e.trait === "undead") return "Resurrección: Al caer a 0 HP, revive inmediatamente una vez con 15 HP.";
    if (e.trait === "fury") return "Furia: Cada vez que recibe daño, su ira aumenta (+1 PWR permanente).";
    if (e.trait === "stone") return "Piel Pétrea: Su corteza de granito anula y bloquea todo golpe de ≤ 3 de daño.";
    if (e.trait === "stealth") return "Sigilo: Juega con cartas totalmente ocultas hasta que se planta.";
    if (e.trait === "disciplined") return "Disciplina: No se planta jamás hasta alcanzar 18 o más puntos.";
    if (e.trait === "thorns") return "Espinas: Devuelve 2 de daño directo al atacante cada vez que es golpeado.";
    if (e.trait === "dragon") return "Aliento Ígneo: Quema 3 HP cada 2 manos y su Blackjack inflige daño triple (x3).";
    return e.traitName || "Sin rasgo especial activo.";
  }

  function openFighterInspect(who = "player") {
    if (window.__isSwiping) return;
    const p = gameState.player;
    const e = gameState.enemy;
    const modal = document.getElementById("screen-inspect");
    if (!modal) return;

    const avatarBox = document.getElementById("inspect-avatar-container");
    const nameEl = document.getElementById("inspect-name");
    const subEl = document.getElementById("inspect-subtitle");
    const hpEl = document.getElementById("inspect-hp");
    const pwrEl = document.getElementById("inspect-pwr");
    const defEl = document.getElementById("inspect-def");
    const shieldEl = document.getElementById("inspect-shield");
    const traitEl = document.getElementById("inspect-trait");
    const statusEl = document.getElementById("inspect-status");

    if (who === "player") {
      const hero = HERO_DATA[p.class] || HERO_DATA.knight;
      const meta = getHeroMeta();
      const hMeta = meta[p.class] || { totalExp: 0, masteryLevel: 1 };
      nameEl.innerText = p.name.toUpperCase();
      nameEl.style.color = "#66fcf1";
      subEl.innerText = `⭐ NIVEL PERMANENTE ${hMeta.level || hMeta.masteryLevel || 1} • ${hMeta.exp || 0}/${getExpRequiredForLevel(hMeta.level || hMeta.masteryLevel || 1)} EXP • ${hMeta.totalExp || 0} EXP TOTAL`;
      if (hero.img) {
        avatarBox.innerHTML = `<img src="${hero.img}" alt="${hero.name}" onerror="this.outerHTML='${hero.sprite}'">`;
      } else {
        avatarBox.innerText = hero.sprite;
      }
      avatarBox.style.borderColor = "#66fcf1";

      hpEl.innerText = `${p.hp} / ${p.maxHp}`;
      hpEl.style.color = "#2a9d8f";

      const levelMultPct = Math.round(((p.level || 1) - 1) * 12);
      let pwrExtra = levelMultPct > 0 ? ` (+${levelMultPct}% por Nvl ${p.level})` : "";
      if (p.turnDoubleDamage) pwrExtra += " (x2 Activo)";
      if (p.hasGoldenDie) pwrExtra += " (+3 Dado Oro)";
      pwrEl.innerText = `${p.pwr}${pwrExtra}`;

      const totalDef = p.def + p.turnShieldBonus + p.duplaDef + (p._synergyBonusDef || 0);
      let defExtra = [];
      if (p.turnShieldBonus > 0) defExtra.push(`+${p.turnShieldBonus} Pasiva`);
      if (p.duplaDef > 0) defExtra.push(`+${p.duplaDef} Dupla`);
      if ((p._synergyBonusDef || 0) > 0) defExtra.push(`+${p._synergyBonusDef} Perk`);
      defEl.innerText = `${totalDef} (Base: ${p.def}${defExtra.length ? ", " + defExtra.join(", ") : ""})`;

      shieldEl.innerText = gameState.status.playerShield > 0 ? `${gameState.status.playerShield} HP (Absorbe daño)` : "0 HP";
      shieldEl.style.color = gameState.status.playerShield > 0 ? "#48cae4" : "#888";

      traitEl.innerHTML = `<b style="color:#66fcf1;">${hero.name}:</b> ${hero.desc}`;

      let statusList = [];
      if (gameState.status.playerShield > 0) statusList.push(`🛡️ <b>Escudo:</b> ${gameState.status.playerShield} HP de protección activa.`);
      if ((p._synergyBonusDef || 0) > 0) statusList.push(`🛡️ <b>Perk [Muralla de Hierro]:</b> +${p._synergyBonusDef} DEF frente al próximo contraataque.`);
      if (p._synergyExtraDodge > 0) statusList.push(`💨 <b>Perk [Acto de Desaparición]:</b> ${Math.round(p._synergyExtraDodge * 100)}% de esquivar el próximo contraataque.`);
      if (p._synergyLastStand) statusList.push(`🏰 <b>Perk [Última Resistencia]:</b> el próximo golpe rival queda en 1 daño.`);
      if (gameState.status.playerPoison > 0) statusList.push(`☠️ <b>Veneno:</b> ${gameState.status.playerPoison} de daño al final del turno.`);
      if (p.duplaDef > 0) statusList.push(`⚡ <b>Dupla:</b> +${p.duplaDef} DEF activa esta mano.`);
      if (p.starterBlessing) {
        const b = p.starterBlessing;
        statusList.push(`✨ <b>Bendición del Destino [${b.tierLabel || ('TIER ' + b.tier)}]:</b> ${b.icon} ${b.name} — <span style="color:#ffd166;">${b.desc}</span>`);
      }
      if (p.gem) statusList.push(`💎 <b>Bendición:</b> ${ITEM_INFO[p.gem] || p.gem}.`);
      if (p.accessory) statusList.push(`💍 <b>Accesorio:</b> ${ITEM_INFO[p.accessory] || p.accessory}.`);
      if (p.cardUpgrades && p.cardUpgrades.length > 0) {
        const uList = p.cardUpgrades.map(id => {
          const u = CARD_UPGRADES.find(c => c.id === id);
          return u ? `${u.icon} ${u.name}` : id;
        });
        statusList.push(`🔨 <b>Pasivas del Yunque:</b> ${uList.join(", ")}.`);
      }
      if (p.curse) statusList.push(`🩸 <b>Maldición:</b> ${CURSE_NAMES[p.curse] || (p.curse === "cursed_deck" ? "Mazo Astillado (-5 HP por cada As)" : p.curse)}.`);
      if (p.relics && p.relics.length > 0) statusList.push(`🔮 <b>Reliquias:</b> ${p.relics.join(", ")}.`);
      if ((p.expMultiplier && p.expMultiplier > 1) || (p.bonusKillExp && p.bonusKillExp > 0)) {
        let expBonusStr = [];
        if (p.expMultiplier > 1) expBonusStr.push(`+${Math.round((p.expMultiplier - 1) * 100)}% EXP`);
        if (p.bonusKillExp > 0) expBonusStr.push(`+${p.bonusKillExp} EXP fija`);
        statusList.push(`🎓 <b>Bono de Aprendizaje:</b> ${expBonusStr.join(" y ")} extra por baja.`);
      }

      statusEl.innerHTML = statusList.length ? statusList.join("<br>") : "Sin estados alterados.";

      const encSection = document.getElementById("inspect-enchanted-section");
      const encGrid = document.getElementById("inspect-enchanted-grid");
      const encTitle = document.getElementById("inspect-enchanted-title");
      if (encSection && encGrid) {
        const enchantedMap = p.cardEnchantments || {};
        const enchantedKeys = Object.keys(enchantedMap);
        if (enchantedKeys.length > 0) {
          encSection.style.display = "block";
          if (encTitle) encTitle.innerText = `🃏 CARTAS FORJADAS EN BARAJA (${enchantedKeys.length}):`;
          encGrid.innerHTML = renderHandDeckFan(enchantedMap, "inspect-hand-deck-fan");
          setupHandFanInteractions("inspect-hand-deck-fan");
        } else {
          encSection.style.display = "none";
        }
      }
    } else {
      const encSection = document.getElementById("inspect-enchanted-section");
      if (encSection) encSection.style.display = "none";

      const maxF = (typeof getMaxFloorsForDifficulty === "function") ? getMaxFloorsForDifficulty() : 13;
      nameEl.innerText = e.name.toUpperCase();
      nameEl.style.color = "#ff758f";
      subEl.innerText = `PISO ${gameState.floor} / ${maxF} — RIVAL DE LA TORRE`;
      if (e.img) {
        avatarBox.innerHTML = `<img src="${e.img}" alt="${e.name}" onerror="this.outerHTML='${e.sprite}'">`;
      } else {
        avatarBox.innerText = e.sprite;
      }
      avatarBox.style.borderColor = "#e63946";

      hpEl.innerText = `${e.hp} / ${e.maxHp}`;
      hpEl.style.color = "#e63946";

      pwrEl.innerText = `${e.pwr}`;
      defEl.innerText = `${e.def}`;

      shieldEl.innerText = gameState.status.enemyShield > 0 ? `${gameState.status.enemyShield} HP` : "0 HP";
      shieldEl.style.color = gameState.status.enemyShield > 0 ? "#48cae4" : "#888";

      traitEl.innerHTML = `<b style="color:#ffd166;">${e.traitName || e.traitShort || "Rasgo"}:</b> ${getEnemyTraitDescription(e)}`;

      let statusList = [];
      if (gameState.status.enemyShield > 0) statusList.push(`🛡️ <b>Escudo:</b> ${gameState.status.enemyShield} HP absorbibles.`);
      if (gameState.status.enemyPoison > 0) statusList.push(`☠️ <b>Veneno:</b> ${gameState.status.enemyPoison} daño residual.`);
      if (gameState.status.enemyRevived) statusList.push(`💀 <b>Resurrección:</b> Ya utilizada en este combate.`);

      statusEl.innerHTML = statusList.length ? statusList.join("<br>") : "Sin estados alterados.";
    }

    modal.classList.remove("hidden");
  }

  function closeFighterInspect(e) {
    if (e && e.target && e.target.closest && e.target.closest(".inspect-card") && !e.target.classList.contains("inspect-close-btn")) {
      return;
    }
    const modal = document.getElementById("screen-inspect");
    if (modal) modal.classList.add("hidden");
  }

  function updateHud() {
    const p = gameState.player;
    const e = gameState.enemy;

    const maxF = (typeof getMaxFloorsForDifficulty === "function") ? getMaxFloorsForDifficulty() : 13;
    const uiFloor = document.getElementById("ui-floor");
    if (uiFloor) uiFloor.innerText = `PISO ${gameState.floor} / ${maxF}`;

    const uiGold = document.getElementById("ui-gold");
    if (uiGold) uiGold.innerHTML = `<img src="assets/svg/ui/icon_gold.svg" class="hud-icon" alt=""> ${gameState.gold}`;

    const uiKills = document.getElementById("ui-kills");
    if (uiKills) uiKills.innerHTML = `<img src="assets/svg/ui/icon_crypt.svg" class="hud-icon" alt=""> ${gameState.killCount % 5}/5`;

    const pClassTitle = document.getElementById("player-class-title");
    if (pClassTitle) pClassTitle.innerText = p.name ? p.name.toUpperCase().replace(/^JACK\s+/i, "") : "CABALLERO";

    const pHpText = document.getElementById("player-hp-text");
    if (pHpText) pHpText.innerText = `${Math.max(0, p.hp)}/${p.maxHp}`;

    const pHpBar = document.getElementById("player-hp-bar");
    if (pHpBar) pHpBar.style.width = `${(p.hp / p.maxHp) * 100}%`;

    const lvlEl = document.getElementById("ui-player-lvl");
    if (lvlEl) lvlEl.innerText = p.level || 1;

    const neededExp = getExpRequiredForLevel(p.level || 1);
    p.nextLevelExp = neededExp;

    const expTextEl = document.getElementById("ui-player-exp-text");
    if (expTextEl) expTextEl.innerText = `${p.exp || 0}/${neededExp} EXP`;

    const expBarEl = document.getElementById("player-exp-bar");
    if (expBarEl) {
      const pct = Math.min(100, Math.round(((p.exp || 0) / neededExp) * 100));
      expBarEl.style.width = `${pct}%`;
    }

    const uiGem = document.getElementById("ui-gem");
    if (uiGem) {
      const sb = p.starterBlessing;
      if (sb) {
        const shortName = (sb.name || "Bendición").split(" ")[0].toUpperCase();
        uiGem.innerText = `${sb.icon || "🔮"} ${shortName}`;
        uiGem.className = `blessing-tier-text-${sb.tier || 1}`;
      } else if (p.gem) {
        uiGem.innerText = p.gem.toUpperCase();
      } else {
        uiGem.innerText = "NINGUNA";
      }
      if (uiGem.parentElement) {
        uiGem.parentElement.title = sb ? `${sb.name}: ${sb.desc}` : (p.gem ? (ITEM_INFO[p.gem] || p.gem) : "Sin bendición");
      }
    }

    const uiAcc = document.getElementById("ui-acc");
    if (uiAcc) {
      const accInfo = (p.accessory && typeof getAccessoryDisplay === "function") ? getAccessoryDisplay(p.accessory) : null;
      uiAcc.innerText = accInfo ? `${accInfo.icon} ${accInfo.short}` : "NINGUNO";
      if (uiAcc.parentElement) {
        uiAcc.parentElement.title = accInfo ? `${accInfo.name}: ${accInfo.desc}` : "Sin accesorio: se compra en el Bazar o en eventos";
      }
    }

    const uiArtifactsCount = document.getElementById("ui-artifacts-count");
    if (uiArtifactsCount) {
      const artLen = (p.artifacts && Array.isArray(p.artifacts)) ? p.artifacts.length : 0;
      const maxSlots = (typeof getMaxArtifactSlots === "function") ? getMaxArtifactSlots() : Math.min(5, p.level || 1);
      uiArtifactsCount.innerText = artLen + "/" + maxSlots;
      const pill = document.getElementById("ui-artifacts-pill");
      if (pill) {
        pill.title = "Ranuras de Artefactos: " + artLen + "/" + maxSlots + " (Máx 5 según tu Nivel de Jack)";
      }
    }

    const uiDupla = document.getElementById("ui-dupla");
    if (uiDupla) {
      uiDupla.innerText = p.duplaDef > 0 ? `SÍ (+ ${p.duplaDef} DEF)` : "NO";
      if (uiDupla.parentElement) {
        uiDupla.parentElement.title = p.duplaDef > 0 ? `DUPLA: tus 2 primeras cartas son iguales — + ${p.duplaDef} DEF durante esta mano` : "Dupla: si tus 2 primeras cartas son iguales, +2 DEF durante esa mano";
      }
    }

    const pMini = document.getElementById("player-stats-mini");
    if (pMini) {
      const effDef = p.def + p.turnShieldBonus + p.duplaDef + (p._synergyBonusDef || 0);
      const shieldStr = gameState.status.playerShield > 0 ? ` <span style="color:#48cae4;">[🛡️+${gameState.status.playerShield}]</span>` : "";
      pMini.innerHTML = `⚔️ ${p.pwr}  🛡️ ${effDef}${shieldStr}`;
    }

    const eMini = document.getElementById("enemy-stats-mini");
    if (eMini && e) {
      const shieldStr = gameState.status.enemyShield > 0 ? ` <span style="color:#48cae4;">[🛡️+${gameState.status.enemyShield}]</span>` : "";
      eMini.innerHTML = `⚔️ ${e.pwr}  🛡️ ${e.def}${shieldStr}`;
    }

    if (typeof updatePlayerAccSlot === "function") {
      updatePlayerAccSlot();
    }

    // Control de Viñeta Roja y Estado de Salud del Héroe (Full, Mid, Low HP)
    const hpRatio = (p && p.maxHp > 0) ? (p.hp / p.maxHp) : 1;
    const vignetteEl = document.getElementById("low-hp-vignette");
    if (vignetteEl) {
      const isTitleHidden = document.getElementById("screen-title")?.classList.contains("hidden");
      if (hpRatio <= 0.30 && p && p.hp > 0 && isTitleHidden) {
        vignetteEl.classList.add("active");
      } else {
        vignetteEl.classList.remove("active");
      }
    }
    const pSprite = document.getElementById("player-sprite");
    if (pSprite) {
      pSprite.classList.remove("hp-full", "hp-mid", "hp-low");
      if (hpRatio <= 0.30) pSprite.classList.add("hp-low");
      else if (hpRatio <= 0.60) pSprite.classList.add("hp-mid");
      else pSprite.classList.add("hp-full");
    }

    if (e) {
      const eHpText = document.getElementById("enemy-hp-text");
      if (eHpText) eHpText.innerText = `${Math.max(0, e.hp)}/${e.maxHp}`;

      const eHpBar = document.getElementById("enemy-hp-bar");
      if (eHpBar) eHpBar.style.width = `${(e.hp / e.maxHp) * 100}%`;
    }

    const pShield = gameState.status.playerShield || 0;
    const pShieldBar = document.getElementById("player-shield-bar");
    const pShieldText = document.getElementById("player-shield-text");
    const pShieldWrapper = document.getElementById("player-shield-wrapper");
    if (pShieldBar && pShieldText) {
      const pct = pShield > 0 ? Math.min(100, Math.max(12, (pShield / 15) * 100)) : 0;
      pShieldBar.style.width = `${pct}%`;
      pShieldText.innerText = `🛡️ ${pShield}`;
      if (pShieldWrapper) {
        if (pShield > 0) pShieldWrapper.classList.add("has-shield");
        else pShieldWrapper.classList.remove("has-shield");
      }
    }

    const eShield = gameState.status.enemyShield || 0;
    const eShieldBar = document.getElementById("enemy-shield-bar");
    const eShieldText = document.getElementById("enemy-shield-text");
    const eShieldWrapper = document.getElementById("enemy-shield-wrapper");
    if (eShieldBar && eShieldText) {
      const pct = eShield > 0 ? Math.min(100, Math.max(12, (eShield / 15) * 100)) : 0;
      eShieldBar.style.width = `${pct}%`;
      eShieldText.innerText = `🛡️ ${eShield}`;
      if (eShieldWrapper) {
        if (eShield > 0) eShieldWrapper.classList.add("has-shield");
        else eShieldWrapper.classList.remove("has-shield");
      }
    }

    const btnPotion = document.getElementById("btn-potion");
    if (btnPotion) {
      btnPotion.innerText = `🧪 POCIÓN (${p.potions})`;
    }

    // Actualizar Estante y Contador de Sinergias Activas en Combate
    const synShelf = document.getElementById("active-synergies-shelf");
    const synCountEl = document.getElementById("ui-synergies-count");
    const activeSyns = [];
    if (p && p.activeHandSynergies) {
      if (p.activeHandSynergies["fire"]) activeSyns.push({ icon: "🔥", name: "Explosión Ígnea", desc: "10 Daño directo + Quemadura" });
      if (p.activeHandSynergies["blood"]) activeSyns.push({ icon: "🩸", name: "Pacto Carmesí", desc: "+HP y purga veneno" });
      if (p.activeHandSynergies["shield"]) activeSyns.push({ icon: "🛡️", name: "Baluarte Acero", desc: "+10 Escudo azul" });
      if (p.activeHandSynergies["blade"]) activeSyns.push({ icon: "⚔️", name: "Frenesí de Filo", desc: "+8 Daño de impacto" });
      if (p.activeHandSynergies["toxic"]) activeSyns.push({ icon: "☠️", name: "Peste Tóxica", desc: "Veneno masivo al rival" });
      if (p.activeHandSynergies["arcane"]) activeSyns.push({ icon: "🔮", name: "Convergencia", desc: "+1 Reroll gratis" });
    }
    if (synCountEl) synCountEl.innerText = String(activeSyns.length);
    if (synShelf) {
      if (activeSyns.length > 0) {
        synShelf.classList.remove("hidden");
        synShelf.innerHTML = activeSyns.map(s => `
          <div class="synergy-chip" onclick="explainEquipmentPill('synergies')" title="${s.desc}">
            <span>${s.icon}</span> <b>${s.name}</b>
          </div>
        `).join("");
      } else {
        synShelf.classList.add("hidden");
        synShelf.innerHTML = "";
      }
    }

    // SPRINT 2: Contador de manos traslúcido en el centro superior de la mesa
    updateHUDHandNumber();

    if (typeof updateTacticalDamagePredictor === "function") updateTacticalDamagePredictor();
  }

  /* ============================================================
     SET BUTTONS DISABLED
     ============================================================ */
  function setButtonsDisabled(disabled) {
    const btns = document.querySelectorAll("#action-grid button");
    btns.forEach(btn => { btn.disabled = disabled; });
  }

  /* ============================================================
     LOG
     ============================================================ */
  function addLog(msg, type) {
    type = type || "info";
    const lc = document.getElementById("log-container");
    const entry = document.createElement("div");
    entry.className = "log-entry " + type;
    entry.innerText = msg;
    lc.appendChild(entry);
    lc.scrollTop = lc.scrollHeight;

    while (lc.children.length > 30) {
      lc.removeChild(lc.firstChild);
    }
  }

  /* ============================================================
     GAME OVER
     ============================================================ */
  /* SPRINT 6: acumuladores de estadísticas de la run (widget de Game Over) */
  function _ensureRunStats() {
    if (!gameState.runStats) {
      gameState.runStats = { damageDealt: 0, damageTaken: 0, blackjacks: 0, enemyBlackjacks: 0, bestHand: 0, startedAt: Date.now() };
    }
    return gameState.runStats;
  }

  function trackRunStat(key, amount) {
    const rs = _ensureRunStats();
    if (typeof rs[key] !== "number") rs[key] = 0;
    rs[key] += (typeof amount === "number" && isFinite(amount)) ? amount : 0;
  }
  window.trackRunStat = trackRunStat;

  function setRunStatMax(key, value) {
    const rs = _ensureRunStats();
    if (typeof rs[key] !== "number") rs[key] = 0;
    if (typeof value === "number" && value > rs[key]) rs[key] = value;
  }
  window.setRunStatMax = setRunStatMax;

  function _buildPostMortem(p, floor) {
    // Analiza la causa más probable de derrota y da un consejo contextual
    const bust = (p._runBustCount || 0);
    const lowDef = p.def <= 1;
    const highBet = (p.betAmount || 0) >= 10;
    const lowHp = p.hp <= 0 && p.maxHp <= 80;
    const reasons = [];
    const tips = [];

    if (bust >= 2) {
      reasons.push(`💥 Sufriste BUST ${bust} veces → el rival atacó sin que pudieras defenderte`);
      tips.push("Cuando tengas 17-18 puntos, es más seguro Plantarse que pedir carta");
    }
    if (highBet && lowDef) {
      reasons.push(`⚠️ Apostaste ${p.betAmount} HP con solo ${p.def} DEF → daño recibido amplificado`);
      tips.push("Con DEF baja (≤1), apuesta conservador (0-5 HP) en los primeros pisos");
    }
    if (lowHp && floor <= 4) {
      reasons.push(`❤️ Tu HP máximo (${p.maxHp}) era bajo para el Piso ${floor}`);
      tips.push("Compra el Corazón de Titán o Colgante de Hierro en la tienda para aumentar resistencia");
    }
    if (floor >= 7) {
      reasons.push(`🔥 Los pisos superiores (7+) tienen rivales con rasgos especiales muy agresivos`);
      tips.push("Llega al Piso 7+ con al menos 2 artefactos equipados y una Bendición activa");
    }
    if (reasons.length === 0) {
      reasons.push("La suerte del mazo no estuvo de tu lado esta vez");
      tips.push("El azar es parte del roguelike — tus bonificaciones de Maestría te harán más fuerte cada run");
    }

    return `
      <div class="postmortem-box">
        <div class="postmortem-title">💀 ¿POR QUÉ CAÍSTE?</div>
        <ul class="postmortem-list">${reasons.map(r => `<li>${r}</li>`).join("")}</ul>
        <div class="postmortem-tip-title">💡 CONSEJO PARA TU PRÓXIMA RUN:</div>
        <ul class="postmortem-list tip">${tips.map(t => `<li>${t}</li>`).join("")}</ul>
      </div>
    `;
  }

  /* SPRINT 6: widget de resumen de la run en la pantalla de derrota */
  function _buildRunSummaryWidget(p, floor) {
    const rs = gameState.runStats || {};
    const started = rs.startedAt || 0;
    const elapsedMs = started > 0 ? Math.max(0, Date.now() - started) : 0;
    const mins = Math.floor(elapsedMs / 60000);
    const secs = Math.floor((elapsedMs % 60000) / 1000);
    const timeStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    const accInfo = (p && p.accessory && typeof AMULET_INFO !== "undefined" && AMULET_INFO[p.accessory])
      ? AMULET_INFO[p.accessory]
      : (p && p.accessory ? { name: p.accessory, icon: "💍" } : null);
    const artCount = (p && p.artifacts && Array.isArray(p.artifacts)) ? p.artifacts.length : 0;
    const blessingInfo = (p && p.starterBlessing && typeof STARTER_BLESSINGS !== "undefined")
      ? STARTER_BLESSINGS.find(b => b.id === p.starterBlessing)
      : (p && p.gem ? { name: p.gem.toUpperCase(), icon: "💎" } : null);

    const row = (icon, label, value) => `
      <div class="run-summary-row">
        <span class="rs-icon">${icon}</span>
        <span class="rs-label">${label}</span>
        <span class="rs-value">${value}</span>
      </div>`;

    return `
      <div class="run-summary-box">
        <div class="run-summary-title">📋 RESUMEN DE LA RUN</div>
        <div class="run-summary-grid">
          ${row("🏰", "Piso alcanzado", `${floor} / 13`)}
          ${row("⚔️", "Rivales vencidos", `${gameState.killCount || 0}`)}
          ${row("🪙", "Oro acumulado", `${gameState.gold || 0}`)}
          ${row("💍", "Accesorio", accInfo ? `${accInfo.icon} ${accInfo.name}` : "Ninguno")}
          ${row("🎴", "Artefactos", `${artCount} equipados`)}
          ${row("💎", "Bendición", blessingInfo ? `${blessingInfo.icon} ${blessingInfo.name}` : "Ninguna")}
          ${row("💥", "Daño infligido", `${rs.damageDealt || 0}`)}
          ${row("🩸", "Daño recibido", `${rs.damageTaken || 0}`)}
          ${row("🃏", "Mejor mano", `${rs.bestHand || 0} pts`)}
          ${row("🎯", "Blackjacks", `${rs.blackjacks || 0} (rival ${rs.enemyBlackjacks || 0})`)}
          ${row("💥", "BUSTs sufridos", `${p._runBustCount || 0}`)}
          ${row("⏱️", "Duración", timeStr)}
        </div>
      </div>
    `;
  }

  function showGameOver() {
    clearMidRunState();
    try {
      stopCombatMusic();
      stopSuddenDeathTension();
      startDeathMusic();
    } catch (_) {}
    const p = gameState.player;
    setPlayerSpriteState("dead");
    playGameOverSound();
    const hero = HERO_DATA[p.class] || HERO_DATA.knight;
    const deadImg = hero.imgDead || hero.img;
    const meta = getHeroMeta();
    const hMeta = meta[p.class] || { totalExp: 0, masteryLevel: 1, level: 1, exp: 0 };
    const mLevel = hMeta.level || hMeta.masteryLevel || 1;
    const nextExp = (typeof getExpRequiredForLevel === "function") ? getExpRequiredForLevel(mLevel) : (mLevel * 150);
    const expProgressPct = Math.min(100, Math.round(((hMeta.exp || 0) / Math.max(1, nextExp)) * 100));
    const unlockedBlessingsCount = (typeof STARTER_BLESSINGS !== "undefined") ? STARTER_BLESSINGS.filter(b => (b.unlockLevel || 1) <= mLevel).length : 0;
    const unlockedArtifactsCount = (typeof SHOP_ARTIFACTS !== "undefined") ? SHOP_ARTIFACTS.filter(a => (a.unlockLevel || 1) <= mLevel).length : 0;
    const postMortem = _buildPostMortem(p, gameState.floor);

    document.getElementById("event-title").innerText = "💀 HAS CAÍDO EN LA TORRE";
    document.getElementById("event-desc").innerHTML = `
      <div style="text-align:center;margin-bottom:6px;">
        <img src="${deadImg}" class="hero-thumb" style="width:64px;height:64px;border:2px solid #e63946;box-shadow:0 0 18px rgba(230,57,70,0.7);border-radius:50%;" alt="Héroe Derrotado" onerror="this.outerHTML='💀'">
      </div>
      <div style="margin-bottom:8px;text-align:center;font-size:9px;color:#c5c6c7;">
        <b style="color:#ff758f;">${p.name}</b> cayó en el <b>Piso ${gameState.floor}/13</b><br>
        Nivel de partida: <b>${p.level}</b> &nbsp;•&nbsp; Oro: <b>${gameState.gold} 🪙</b> &nbsp;•&nbsp; Rivales vencidos: <b>${gameState.killCount || 0}</b>
      </div>
      ${postMortem}
      ${_buildRunSummaryWidget(p, gameState.floor)}
      <div class="dopamine-mastery-banner" style="margin-top:8px;">
        <div class="dopamine-banner-title">🌟 MAESTRÍA PERMANENTE GUARDADA</div>
        <div class="dopamine-progress-text">NIVEL ${mLevel} &nbsp;•&nbsp; ${hMeta.totalExp} EXP ACUMULADA</div>
        <div class="dopamine-progress-bar-bg">
          <div class="dopamine-progress-bar-fill" style="width:${expProgressPct}%;"></div>
        </div>
        <div class="dopamine-unlock-chips">
          <span class="dopamine-chip">✨ ${unlockedBlessingsCount}/20 Bendiciones</span>
          <span class="dopamine-chip">🎴 ${unlockedArtifactsCount}/30 Artefactos</span>
          <span class="dopamine-chip">Tier ${Math.min(4, Math.ceil(mLevel / 3))} desbloqueado</span>
        </div>
        <div style="font-size: 9px;color:#94a3b8;margin-top:4px;">
          ¡Tu EXP se guarda! La próxima run comenzará más fuerte.
        </div>
      </div>
    `;

    document.getElementById("event-options").innerHTML = `
      ${(typeof canWatchAd === "function" && canWatchAd("ad_revive")) ? `
        <div class="card" onclick="if(typeof showRewardedAdModal === 'function') showRewardedAdModal('ad_revive');" style="border-color:#66fcf1;color:#66fcf1;text-align:center;font-weight:bold;background:rgba(102,252,241,0.08);margin-bottom:6px;">
          🎬 VER ANUNCIO Y REVIVIR (+35% HP)
        </div>
      ` : ""}
      <div class="card" onclick="confirmRestart()" style="border-color:#ffd166;color:#ffd166;text-align:center;">🔄 REINTENTAR — AHORA MÁS FUERTE</div>
      <div class="card" onclick="confirmLeave()" style="border-color:#c5c6c7;text-align:center;">🚪 MENÚ DE SELECCIÓN DE HÉROES</div>
    `;
    document.getElementById("screen-event").classList.remove("hidden");
  }
  window.showGameOver = showGameOver;

  function confirmRestart() {
    startNewAscensionRun();
  }

  function confirmLeave() {
    returnToMainMenuClean();
  }

  /* ============================================================
     VICTORY
     ============================================================ */
  function showVictory() {
    try {
      stopSuddenDeathTension();
      stopCombatMusic();
      startRewardMusic();
    } catch (_) {}
    clearMidRunState();
    const p = gameState.player;
    playVictorySound();

    const diffKey = gameState.diff || (typeof getGameDifficulty === "function" ? getGameDifficulty() : "normal");
    const diffConfig = (typeof DIFFICULTY_CONFIGS !== "undefined" && DIFFICULTY_CONFIGS[diffKey]) ? DIFFICULTY_CONFIGS[diffKey] : { trophies: 1 };
    const earnedTrophies = diffConfig.trophies || 1;

    // FASE 2: Economía y balance de recompensas por victoria
    const baseGold = 250;
    const baseExp = 500;
    const baseCrypts = 100;

    const diffMultipliers = { normal: 1.0, hard: 1.5, mythic: 2.2, nightmare: 3.2 };
    const diffMult = diffMultipliers[diffKey] || 1.0;

    const curAscension = parseInt(localStorage.getItem("blackjack_ascension_level") || "1", 10);
    const ascensionMult = 1.0 + Math.max(0, curAscension - 1) * 0.05;

    const victoryKey = `bj_victory_${p.class}_${diffKey}`;
    const winsOnDiff = parseInt(localStorage.getItem(victoryKey) || "0", 10);
    const isFirstClear = winsOnDiff === 0;
    localStorage.setItem(victoryKey, (winsOnDiff + 1).toString());

    // Guardar victorias totales globales de la Torre para desbloqueo de dificultades (Heroico, Mítico, Pesadilla)
    const totalWins = (typeof getTotalTowerWins === "function") ? getTotalTowerWins() : parseInt(localStorage.getItem("bj_tower_total_wins") || "0", 10);
    localStorage.setItem("bj_tower_total_wins", (totalWins + 1).toString());

    // Progresión de Torre: al vencer al Jack de la Torre actual, la siguiente es:
    // normal (Novato, 7 pisos) -> hard (Heroico, 9 pisos) -> mythic (Mítico, 11 pisos) -> nightmare (Pesadilla, 13 pisos)
    const diffProgression = { normal: "hard", hard: "mythic", mythic: "nightmare", nightmare: "nightmare" };
    const nextDiffKey = diffProgression[diffKey] || "hard";
    const nextTowerCfg = (typeof DIFFICULTY_CONFIGS !== "undefined" && DIFFICULTY_CONFIGS[nextDiffKey]) 
      ? DIFFICULTY_CONFIGS[nextDiffKey] 
      : { label: "Heroico", maxFloors: 9 };

    // Decaimiento por repetición: 100% (1ª vez) -> 40% (2ª) -> 20% (3ª) -> 10% (suelo)
    let decayFactor = 1.0;
    if (!isFirstClear) {
      if (winsOnDiff === 1) decayFactor = 0.40;
      else if (winsOnDiff === 2) decayFactor = 0.20;
      else decayFactor = 0.10;
    }

    // Puntos de Legado: Hito de prestigio único por combinación [Héroe x Dificultad]
    const legacyRewards = { normal: 2, hard: 3, mythic: 4, nightmare: 5 };
    const earnedLegacy = isFirstClear ? (legacyRewards[diffKey] || 2) : 0;

    const finalGold = Math.max(25, Math.round(baseGold * diffMult * ascensionMult * decayFactor));
    const finalExp = Math.max(50, Math.round(baseExp * diffMult * ascensionMult * decayFactor));
    const finalCrypts = isFirstClear ? Math.round(baseCrypts * diffMult) : Math.max(10, Math.round(baseCrypts * diffMult * decayFactor * 0.5));

    gameState.gold = (gameState.gold || 0) + finalGold;
    addHeroPermanentExp(p.class, finalExp);

    const meta = getHeroMeta();
    if (meta[p.class]) {
      meta[p.class].wins = (meta[p.class].wins || 0) + 1;
      meta[p.class].prestigeTrophies = (meta[p.class].prestigeTrophies || 0) + earnedTrophies;
      if (earnedLegacy > 0) {
        meta[p.class].legacyPoints = (meta[p.class].legacyPoints || 0) + earnedLegacy;
      }
      saveHeroMeta(meta);
    }
    const hMeta = meta[p.class] || { totalExp: 0, masteryLevel: 1, level: 1, exp: 0 };
    const mLevel = hMeta.level || hMeta.masteryLevel || 1;
    const unlockedBlessingsCount = STARTER_BLESSINGS.filter(b => (b.unlockLevel || 1) <= mLevel).length;
    const unlockedArtifactsCount = SHOP_ARTIFACTS.filter(a => (a.unlockLevel || 1) <= mLevel).length;

    // Desbloqueo de skins por completar la Torre
    const heroKey = p.class === "necro" ? "necromancer" : p.class;
    const unlockedKey = `bj_unlocked_skins_${heroKey}`;
    const unlockedList = parseJSONArray(localStorage.getItem(unlockedKey), []);
    const heroSkins = (typeof HERO_SKINS !== "undefined" && HERO_SKINS[heroKey]) ? HERO_SKINS[heroKey] : [];
    let newlyUnlockedSkinNames = [];

    if (heroSkins[1] && !unlockedList.includes(heroSkins[1].id)) {
      unlockedList.push(heroSkins[1].id);
      newlyUnlockedSkinNames.push(heroSkins[1].name);
    }
    if ((diffKey === "hard" || diffKey === "mythic" || diffKey === "nightmare") && heroSkins[2] && !unlockedList.includes(heroSkins[2].id)) {
      unlockedList.push(heroSkins[2].id);
      newlyUnlockedSkinNames.push(heroSkins[2].name);
    }
    localStorage.setItem(unlockedKey, JSON.stringify(unlockedList));

    // Escalado de dificultad por ascensión y recompensa de cripta
    const newAscension = curAscension + 1;
    localStorage.setItem("blackjack_ascension_level", newAscension.toString());
    localStorage.setItem("blackjack_has_won_run", "true");

    const curCoins = getPlayerCryptCoins() + finalCrypts;
    localStorage.setItem("bj_crypt_coins", curCoins.toString());

    // Persistir señal de botín de victoria pendiente SOLO si es primera conquista
    if (isFirstClear) {
      try {
        localStorage.setItem("bj_pending_tower_victory_reward", JSON.stringify({
          floor: 13,
          hero: p.class,
          diff: diffKey,
          timestamp: Date.now()
        }));
      } catch (_) {}
    } else {
      try {
        localStorage.removeItem("bj_pending_tower_victory_reward");
      } catch (_) {}
    }

    const skinUnlockChips = newlyUnlockedSkinNames.map(sName => 
      `<span class="dopamine-chip" style="background:rgba(217,119,6,0.3);border-color:#ffd166;color:#fef08a;">🎨 ¡Vestidura Desbloqueada: ${sName}!</span>`
    ).join("");

    const firstClearBannerHtml = isFirstClear ? `
      <div class="first-clear-banner" style="background:linear-gradient(135deg,#ffd166,#e76f51);color:#17110c;font-family:var(--font-display);font-size:11px;font-weight:bold;padding:6px 12px;border-radius:6px;border:2px solid #17110c;box-shadow:0 3px 0 #17110c;margin:6px 0;text-align:center;">
        🎉 ¡PRIMERA CONQUISTA DE ${p.name.toUpperCase()} EN ${(diffConfig.label || diffKey).toUpperCase()}!
      </div>
    ` : `
      <div style="font-size: 9px;color:#cbd5e1;background:rgba(15,23,42,0.6);border:1px solid #334155;border-radius:4px;padding:4px 8px;margin:6px 0;text-align:center;">
        🔄 Victoria repetida (Recompensas al ${Math.round(decayFactor * 100)}%). El Botín de Forja y los Puntos de Legado son exclusivos de tu primera conquista de cada Torre.
      </div>
    `;

    const maxF = (typeof getMaxFloorsForDifficulty === "function") ? getMaxFloorsForDifficulty() : 13;
    const evTitleEl = document.getElementById("event-title");
    const evDescEl = document.getElementById("event-desc");
    if (evTitleEl) {
      evTitleEl.style.display = "";
      evTitleEl.innerText = "🏆 ¡HAS DERROTADO A BLACK!";
    }
    if (evDescEl) {
      evDescEl.style.display = "";
      evDescEl.innerHTML = `
      <div style="margin-bottom:8px;">
        ¡Has vencido al Jack Supremo y quebrado la maldición de la Torre!<br>
        Dificultad: <b style="color:#ffd166;">${(diffConfig.label || diffKey).toUpperCase()}</b> • Pisos: <b>${maxF}/${maxF}</b> • Oro final: <b>+${finalGold} 🪙</b> • Salud: <b>${p.hp}/${p.maxHp} HP</b>
      </div>
      ${firstClearBannerHtml}
      <div class="dopamine-mastery-banner" style="border-color:#ffd166;box-shadow:0 0 16px rgba(255,209,102,0.4);">
        <div class="dopamine-banner-title" style="color:#ffd166;">👑 LEYENDA ETERNA DE LA TORRE</div>
        <div class="dopamine-progress-text">NIVEL DE MAESTRÍA ${mLevel} • +${finalExp} EXP GANADA (${hMeta.totalExp} TOTAL)</div>
        <div class="dopamine-unlock-chips">
          <span class="dopamine-chip">🏆 +${earnedTrophies} Trofeos de Prestigio (${hMeta.prestigeTrophies || earnedTrophies} acumulados)</span>
          ${earnedLegacy > 0 ? `<span class="dopamine-chip" style="background:rgba(245,158,11,0.25);border-color:#ffd166;color:#fef08a;">🏛️ +${earnedLegacy} Puntos de Legado (Altar)</span>` : `<span class="dopamine-chip" style="opacity:0.65;">🏛️ 0 Puntos de Legado (Repetición)</span>`}
          <span class="dopamine-chip">✨ +${finalCrypts} Monedas de Cripta 💀</span>
          ${isFirstClear ? `<span class="dopamine-chip" style="background:rgba(59,130,246,0.25);border-color:#60a5fa;color:#bfdbfe;">🃏 +1 Naipe con Sello & +3 Cartas al Mazo</span>` : `<span class="dopamine-chip" style="opacity:0.65;">🃏 Botín de Cartas ya reclamado en esta Torre</span>`}
          ${skinUnlockChips}
          <span class="dopamine-chip">🔥 Ascensión Nivel ${newAscension} Desbloqueada</span>
          <span class="dopamine-chip">⚔️ Arena Multijugador Desbloqueada</span>
        </div>
        <div style="font-size: 9px;color:#cbd5e1;margin-top:6px;line-height:1.4;">
          ${isFirstClear 
            ? '¡Has ganado una <b>Bendición Permanente de Forja</b> y <b>3 Naipes Arcanos</b>! Graba 1 sello permanente en tu baraja y transmuta 3 nuevos naipes a tu mazo de 52 cartas.'
            : 'Has superado nuevamente este desafío de la Torre. Tus ganancias se han ajustado según el factor de repetición.'}
        </div>
      </div>
    `;
    }

    const claimBtnHtml = isFirstClear ? `
      <button class="card victory-reward-btn" id="btn-victory-claim-reward" onclick="showMasteryForgeModal(null, true)" style="border-color:#ffd166;color:#ffd166;text-align:center;font-weight:bold;background:rgba(255,209,102,0.22);box-shadow:0 0 16px rgba(255,209,102,0.45);cursor:pointer;padding:12px 10px;width:100%;border-radius:6px;font-family:inherit;display:block;">
        👑 RECLAMAR BOTÍN: 1 SELLO DE MAESTRÍA & 3 NAIPES ARCANOS
      </button>
    ` : `
      <div style="font-size:9.5px;color:#94a3b8;background:rgba(0,0,0,0.4);border:1px dashed #475569;border-radius:6px;padding:8px;text-align:center;margin-bottom:6px;">
        🃏 Botín de Forja y Naipes Arcanos ya reclamado en la primera conquista de esta Torre.
      </div>
    `;

    document.getElementById("event-options").innerHTML = `
      ${claimBtnHtml}
      <div class="card" onclick="handleVictoryNewAscension(${newAscension}, '${nextDiffKey}')" style="border-color:#2a9d8f;color:#66fcf1;text-align:center;font-weight:bold;cursor:pointer;">⚔️ AVANZAR A LA SIGUIENTE TORRE: ${(nextTowerCfg.label || nextDiffKey).toUpperCase()} (${nextTowerCfg.maxFloors || 9} PISOS)</div>
      <div class="card" onclick="returnToMainMenuClean()" style="border-color:#c5c6c7;text-align:center;cursor:pointer;">🏠 VOLVER AL MENÚ PRINCIPAL</div>
    `;
    document.getElementById("screen-event").classList.remove("hidden");
    addLog("¡VICTORIA! Has completado la torre en dificultad " + (diffConfig.label || diffKey) + ". Trofeos: +" + earnedTrophies + " | Oro: +" + finalGold + " | EXP: +" + finalExp, "critical");
  }
  window.showVictory = showVictory;

  /* ============================================================
     CONTROLS & TUTORIAL MODAL
     ============================================================ */
  function openTutorial(tab = 'attacks') {
    try { playButtonClickSound(); } catch (_) {}
    const modal = document.getElementById("screen-tutorial");
    if (!modal) return;
    modal.classList.remove("hidden");
    switchTutorialTab(tab);
  }
  window.openTutorial = openTutorial;

  function closeTutorial() {
    const modal = document.getElementById("screen-tutorial");
    if (modal) modal.classList.add("hidden");
  }
  window.closeTutorial = closeTutorial;

  function switchTutorialTab(tab) {
    try { playButtonClickSound(); } catch (_) {}
    const tabs = ['attacks', 'rules', 'lore'];
    tabs.forEach(t => {
      const btn = document.getElementById(`tab-btn-${t}`);
      const content = document.getElementById(`tut-content-${t}`);
      if (btn) {
        if (t === tab) btn.classList.add('active');
        else btn.classList.remove('active');
      }
      if (content) {
        if (t === tab) content.classList.remove('hidden');
        else content.classList.add('hidden');
      }
    });
  }
  window.switchTutorialTab = switchTutorialTab;

  function showControls() {
    openTutorial('rules');
  }
  window.showControls = showControls;

  function closeControls() {
    closeTutorial();
  }
  window.closeControls = closeControls;

  /* ============================================================
     CONFIG PAGE
     ============================================================ */
  function showConfig() {
    const body = document.getElementById("config-body");
    const musPct = Math.round((gameState.musicVolume !== undefined ? gameState.musicVolume : 0.5) * 100);
    const sfxPct = Math.round((gameState.sfxVolume !== undefined ? gameState.sfxVolume : 0.8) * 100);
    const mastPct = Math.round(gameState.audioVolume * 100);

    body.innerHTML = `
      <div class="config-group">
        <label>🔊 CONTROLES DE VOLUMEN INDEPENDIENTES</label>
        
        <div class="status-row">
          <span>🎵 Volumen de Música</span>
          <span id="vol-music-val" style="color:#66fcf1;font-weight:bold;">${musPct}%</span>
        </div>
        <input type="range" min="0" max="100" value="${musPct}" oninput="changeMusicVolume(this.value)" style="width:100%;accent-color:#45a29e;margin-top:4px;">

        <div class="status-row" style="margin-top:8px;">
          <span>🔊 Volumen de Efectos (SFX)</span>
          <span id="vol-sfx-val" style="color:#ffd166;font-weight:bold;">${sfxPct}%</span>
        </div>
        <input type="range" min="0" max="100" value="${sfxPct}" oninput="changeSfxVolume(this.value)" style="width:100%;accent-color:#ffd166;margin-top:4px;">

        <!-- Retrocompatibilidad con tests del sistema -->
        <span id="vol-val" style="display:none;">${mastPct}%</span>

        <div style="margin-top:10px;display:flex;gap:6px;justify-content:space-between;align-items:center;">
          <button class="toggle-btn ${gameState.audioEnabled ? 'on' : ''}" onclick="toggleSound()" style="font-size: 9px;">${gameState.audioEnabled ? "Audio General: ON" : "Audio General: OFF"}</button>
          <button class="toggle-btn ${gameState.hapticsEnabled !== false ? 'on' : ''}" onclick="toggleHaptics()" style="font-size: 9px;">${gameState.hapticsEnabled !== false ? "Vibración: ON" : "Vibración: OFF"}</button>
        </div>
      </div>

      <div class="config-group">
        <label>🌙 MODO DE DIFICULTAD</label>
        <div class="status-row">
          <select id="diff-select" onchange="changeDifficulty(this.value)" style="background:#1f2833;color:#66fcf1;border:1px solid #45a29e;padding:2px 6px;border-radius:3px;font-family:inherit;font-size: 9px;cursor:pointer;">
            <option value="normal" ${gameState.difficulty === 'normal' ? 'selected' : ''}>🟢 Normal (Clásica)</option>
            <option value="hard" ${gameState.difficulty === 'hard' ? 'selected' : ''}>🟡 Heroico (Reto mayor)</option>
            <option value="mythic" ${gameState.difficulty === 'mythic' ? 'selected' : ''}>🔴 Mítico (Alta exigencia)</option>
            <option value="nightmare" ${gameState.difficulty === 'nightmare' ? 'selected' : ''}>🟣 Pesadilla (Extremo)</option>
          </select>
        </div>
      </div>

      <div class="config-group">
        <label>🃏 VISUALIZACIÓN DE CARTAS RIVAL</label>
        <div class="status-row">
          <select id="card-vis" onchange="changeCardVisibility(this.value)" style="background:#1f2833;color:#66fcf1;border:1px solid #45a29e;padding:2px 6px;border-radius:3px;font-family:inherit;font-size: 9px;cursor:pointer;">
            <option value="hide">Ocultar cartas del rival</option>
            <option value="show">Mostrar todas las cartas</option>
          </select>
        </div>
        <p style="font-size: 9px;color:#c5c6c7;margin-top:4px;">Esta configuración anula la regla del Monje de "Desatar".</p>
      </div>

      <div class="config-group">
        <label>📊 ESTADÍSTICAS DE LA PARTIDA</label>
        <div class="status-row"><span>Pisos subidos</span><span style="color:#66fcf1;">${gameState.floor}/13</span></div>
        <div class="status-row"><span>Oro acumulado</span><span style="color:#66fcf1;">${gameState.gold}</span></div>
        <div class="status-row"><span>HP actual</span><span style="color:#2a9d8f;">${gameState.player.hp}/${gameState.player.maxHp}</span></div>
        <div class="status-row"><span>Clase</span><span style="color:#66fcf1;">${gameState.player.name}</span></div>
        <div class="status-row"><span>PWR / DEF</span><span style="color:#66fcf1;">${gameState.player.pwr} / ${gameState.player.def}</span></div>
        <div class="status-row"><span title="${gameState.player.gem ? (ITEM_INFO[gameState.player.gem] || '') : 'Sin bendición aún'}">Bendición</span><span style="color:#f4a261;">${gameState.player.gem ? gameState.player.gem.toUpperCase() : "NINGUNA"}</span></div>
        <div class="status-row"><span title="${gameState.player.accessory ? (ITEM_INFO[gameState.player.accessory] || '') : 'Sin accesorio aún'}">Accesorio</span><span style="color:#f4a261;">${gameState.player.accessory ? gameState.player.accessory.toUpperCase() : "NINGUNO"}</span></div>
        <div class="status-row"><span title="${gameState.player.curse ? (ITEM_INFO[gameState.player.curse] || CURSE_NAMES[gameState.player.curse] || '') : 'Sin maldición activa'}">Maldición</span><span style="color:#ffd166;">${gameState.player.curse ? ((CURSE_NAMES[gameState.player.curse] || gameState.player.curse).split(' (')[0]).toUpperCase() : "NINGUNA"}</span></div>
        <div class="status-row"><span>Dupla activa</span><span style="color:#66fcf1;">${gameState.player.duplaDef > 0 ? "SÍ (+"+gameState.player.duplaDef+" DEF)" : "NO"}</span></div>
        <div class="status-row"><span title="POCIÓN: recupera 30 HP al usarla">Pociones</span><span style="color:#66fcf1;">${gameState.player.potions}</span></div>
        <div class="status-row"><span title="REROLL: vuelve a repartir tu mano completa (no sirve con mano bust)">Rerolls</span><span style="color:#66fcf1;">${gameState.player.rerollsAvailable}</span></div>
        <div class="status-row"><span title="${ITEM_INFO.golden_die}">Dado de Oro</span><span style="color:#f4a261;">${gameState.player.hasGoldenDie ? "SÍ" : "NO"}</span></div>
      </div>

      <div class="config-group danger">
        <label style="color:#ff758f;">⚠️ REINICIAR PROGRESO / RUN DESDE CERO</label>
        <p style="font-size: 9px;color:#c5c6c7;line-height:1.4;margin-bottom:8px;">
          Elimina toda la experiencia acumulada y niveles de maestría guardados. Comenzarás una partida totalmente limpia desde el <b>Nivel 1 (0 EXP)</b> con estadísticas base.
        </p>
        <button class="config-danger-btn" onclick="resetCharacterProgress()">
          <span>🗑️ ELIMINAR PROGRESO Y REINICIAR A 0 EXP</span>
        </button>
      </div>
    `;

    // Los elementos existen solo después de inyectar el HTML
    const diffEl = document.getElementById("diff-select");
    const cardVisEl = document.getElementById("card-vis");
    if (diffEl) diffEl.value = gameState.diff || "normal";
    if (cardVisEl) cardVisEl.value = gameState.showEnemyCards ? "show" : "hide";

    // Configuración dinámica de botones inferiores: volver a la partida vs reiniciar o volver al menú
    const footerEl = document.getElementById("config-footer-actions");
    const titleScreen = document.getElementById("screen-title");
    const isTitleVisible = titleScreen && !titleScreen.classList.contains("hidden");
    const isRunActive = Boolean(gameState.player && gameState.player.hp > 0 && (gameState.floor > 1 || gameState.inCombat || !isTitleVisible));

    if (footerEl) {
      if (isRunActive && !isTitleVisible) {
        footerEl.innerHTML = `
          <button onclick="resumeGameFromConfig()" class="config-btn-resume">
            <span>🟢 REGRESAR A LA PARTIDA</span>
          </button>
          <button onclick="confirmRestartRunFromConfig()" class="config-btn-abandon">
            <span>🔄 REINICIAR LA PARTIDA COMPLETA</span>
          </button>
        `;
      } else {
        footerEl.innerHTML = `
          <button onclick="closeConfig()" class="config-btn-back">
            ◀ VOLVER AL MENÚ
          </button>
        `;
      }
    }

    document.getElementById("screen-config").classList.remove("hidden");
  }

  function changeVolume(val) {
    const v = parseInt(val, 10);
    gameState.audioVolume = Math.max(0, Math.min(100, isNaN(v) ? 50 : v)) / 100;
    updateMasterGain();
    saveAudioSettings();
    const volValEl = document.getElementById("vol-val");
    if (volValEl) volValEl.innerText = `${Math.round(gameState.audioVolume * 100)}%`;
    const pauseVolVal = document.getElementById("pause-vol-val");
    if (pauseVolVal) pauseVolVal.innerText = `${Math.round(gameState.audioVolume * 100)}%`;
  }
  window.changeVolume = changeVolume;

  function changeMusicVolume(val) {
    const v = parseInt(val, 10);
    gameState.musicVolume = Math.max(0, Math.min(100, isNaN(v) ? 50 : v)) / 100;
    if (musicGainNode && audioCtx) {
      try {
        musicGainNode.gain.setValueAtTime(gameState.audioEnabled ? gameState.musicVolume : 0, audioCtx.currentTime);
      } catch (_) {}
    }
    saveAudioSettings();
    const mvEl = document.getElementById("vol-music-val");
    if (mvEl) mvEl.innerText = `${Math.round(gameState.musicVolume * 100)}%`;
    const pmvEl = document.getElementById("pause-vol-music-val");
    if (pmvEl) pmvEl.innerText = `${Math.round(gameState.musicVolume * 100)}%`;
    const pms = document.getElementById("pause-music-slider");
    if (pms) pms.value = String(Math.round(gameState.musicVolume * 100));
  }
  window.changeMusicVolume = changeMusicVolume;

  function changeSfxVolume(val) {
    const v = parseInt(val, 10);
    gameState.sfxVolume = Math.max(0, Math.min(100, isNaN(v) ? 80 : v)) / 100;
    if (sfxGainNode && audioCtx) {
      try {
        sfxGainNode.gain.setValueAtTime(gameState.audioEnabled ? gameState.sfxVolume : 0, audioCtx.currentTime);
      } catch (_) {}
    }
    saveAudioSettings();
    const svEl = document.getElementById("vol-sfx-val");
    if (svEl) svEl.innerText = `${Math.round(gameState.sfxVolume * 100)}%`;
    const psvEl = document.getElementById("pause-vol-sfx-val");
    if (psvEl) psvEl.innerText = `${Math.round(gameState.sfxVolume * 100)}%`;
    const pss = document.getElementById("pause-sfx-slider");
    if (pss) pss.value = String(Math.round(gameState.sfxVolume * 100));
  }
  window.changeSfxVolume = changeSfxVolume;

  function changeVolumeFromPause(val) {
    changeVolume(val);
    const slider = document.getElementById("pause-volume-slider");
    if (slider) slider.value = String(Math.round(gameState.audioVolume * 100));
  }
  window.changeVolumeFromPause = changeVolumeFromPause;

  function toggleHaptics() {
    gameState.hapticsEnabled = (gameState.hapticsEnabled === false) ? true : false;
    if (gameState.hapticsEnabled) triggerHaptic("button_click");
    addLog(gameState.hapticsEnabled ? "Vibración háptica activada." : "Vibración desactivada.", "info");
    const configBody = document.getElementById("config-body");
    if (configBody) showConfig();
  }
  window.toggleHaptics = toggleHaptics;

  function resumeGameFromConfig() {
    try { playButtonClickSound(); } catch (_) {}
    document.getElementById("screen-config").classList.add("hidden");
  }
  window.resumeGameFromConfig = resumeGameFromConfig;

  function confirmRestartRunFromConfig() {
    try { playButtonClickSound(); } catch (_) {}
    showGameConfirm({
      title: "REINICIAR PARTIDA",
      message: "¿Estás seguro de que deseas reiniciar la partida actual desde el Piso 1? Perderás el progreso de la ascensión en curso.",
      okLabel: "REINICIAR",
      cancelLabel: "CANCELAR",
      onConfirm: restartRunFromConfigNow
    });
  }
  window.confirmRestartRunFromConfig = confirmRestartRunFromConfig;

  function restartRunFromConfigNow() {
    try { stopCombatMusic(); } catch (_) {}
    try { stopSuddenDeathTension(); } catch (_) {}
    clearMidRunState();

    document.getElementById("screen-config").classList.add("hidden");
    const overlays = [
      "screen-event", "screen-chronicle", "screen-combat-start", "screen-fate-wheel",
      "screen-booster-modal", "screen-card-forge-modal", "screen-levelup",
      "screen-game-over", "screen-win", "screen-floor-transition", "screen-controls", "screen-codex",
      "screen-lore-chapter", "screen-hero-sheet", "screen-daily-login"
    ];
    overlays.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add("hidden");
    });

    const titleEl = document.getElementById("screen-title");
    if (titleEl) titleEl.classList.remove("hidden");
    try { startIntroMusic(); } catch (_) {}
    addLog("Partida reiniciada.", "info");
  }
  window.restartRunFromConfigNow = restartRunFromConfigNow;

  function closeConfig() {
    try { playButtonClickSound(); } catch (_) {}
    document.getElementById("screen-config").classList.add("hidden");
    const titleScreen = document.getElementById("screen-title");
    const isRunActive = Boolean(gameState.player && gameState.player.hp > 0 && (gameState.floor > 1 || gameState.inCombat));
    if (titleScreen && !isRunActive) {
      titleScreen.classList.remove("hidden");
    }
  }

  function resetCharacterProgress() {
    showGameConfirm({
      title: "ELIMINAR PROGRESO",
      message: "Esta acción borrará toda la maestría y EXP guardada en el navegador. Comenzarás una partida totalmente desde 0 con estadísticas base (Nivel 1, 0 EXP).",
      okLabel: "ELIMINAR",
      cancelLabel: "CANCELAR",
      onConfirm: resetCharacterProgressNow
    });
  }
  window.resetCharacterProgress = resetCharacterProgress;

  function resetCharacterProgressNow() {
    // 1. Limpiar localStorage de meta-progresión, desbloqueos y códice
    try {
      localStorage.removeItem(HERO_META_KEY);
      localStorage.removeItem(HERO_UNLOCKS_KEY);
      localStorage.removeItem(CODEX_KEY);
      clearMidRunState();
      const cleanMeta = {
        knight: { totalExp: 0, masteryLevel: 1, level: 1, exp: 0, baseMaxHp: null, basePwr: null, baseDef: null, runs: 0, wins: 0, legacyPoints: 0, legacyHp: 0, legacyPwr: 0, legacyDef: 0, prestigeTrophies: 0 },
        rogue: { totalExp: 0, masteryLevel: 1, level: 1, exp: 0, baseMaxHp: null, basePwr: null, baseDef: null, runs: 0, wins: 0, legacyPoints: 0, legacyHp: 0, legacyPwr: 0, legacyDef: 0, prestigeTrophies: 0 },
        monk: { totalExp: 0, masteryLevel: 1, level: 1, exp: 0, baseMaxHp: null, basePwr: null, baseDef: null, runs: 0, wins: 0, legacyPoints: 0, legacyHp: 0, legacyPwr: 0, legacyDef: 0, prestigeTrophies: 0 },
        necromancer: { totalExp: 0, masteryLevel: 1, level: 1, exp: 0, baseMaxHp: null, basePwr: null, baseDef: null, runs: 0, wins: 0, legacyPoints: 0, legacyHp: 0, legacyPwr: 0, legacyDef: 0, prestigeTrophies: 0 }
      };
      saveHeroMeta(cleanMeta);
    } catch (e) {
      console.warn("Error reiniciando meta:", e);
    }

    // 2. Reestablecer jugador a stats base de nivel 1 con 0 EXP
    if (gameState.player) {
      const hero = HERO_DATA.knight;
      gameState.player.class = "knight";
      gameState.player.name = hero.name;
      gameState.player.masteryLevel = 1;
      gameState.player.totalPermanentExp = 0;
      gameState.player.level = 1;
      gameState.player.exp = 0;
      gameState.player.nextLevelExp = getExpRequiredForLevel(1);
      gameState.player.maxHp = hero.maxHp;
      gameState.player.hp = hero.maxHp;
      gameState.player.pwr = hero.pwr;
      gameState.player.def = hero.def;
      gameState.player.potions = 2;
      gameState.player.rerollsAvailable = 0;
      gameState.player.gem = null;
      gameState.player.accessory = null;
      gameState.player.curse = null;
      gameState.player.blackjackMultiplier = 1;
      gameState.player.hasGoldenDie = false;
      gameState.player.expMultiplier = 1;
      gameState.player.bonusKillExp = 0;
      gameState.player.relics = [];
      gameState.player.artifacts = [];
      gameState.player.cardUpgrades = [];
      gameState.gold = 0;
      gameState.floor = 1;
      updateHud();
    }

    // 3. Actualizar tarjetas en pantalla de selección de héroe
    updateHeroSelectUI();

    // 4. Sonido de confirmación y cierre de config
    playTone(180, 0.12, "sine", 0.5);
    setTimeout(() => playTone(300, 0.18, "sine", 0.6), 80);
    closeConfig();

    // 5. Asegurar retorno a pantalla de título con héroe limpio
    document.getElementById("screen-title").classList.remove("hidden");
    addLog("Progreso eliminado con éxito. Listo para una nueva run limpia desde Nivel 1 (0 EXP).", "critical");

    showGameAlert("Tu Caballero ha vuelto a Nivel 1 con 0 EXP y estadísticas base (90 HP, 2 PWR, 3 DEF). ¡Listo para tu nueva run limpia!", "PROGRESO ELIMINADO");
  }
  window.resetCharacterProgressNow = resetCharacterProgressNow;

  function changeDifficulty(val) {
    gameState.diff = val;
    addLog(`Modo de dificultad: ${val}`, "info");

    if (gameState.enemy && gameState.enemy.maxHp > 0 && !gameState.isRolling) {
      const t = ENEMIES.find(n => n.name === gameState.enemy.name) || ENEMIES[0];
      const newMax = enemyHpFor(t);
      if (newMax !== gameState.enemy.maxHp) {
        gameState.enemy.maxHp = newMax;
        gameState.enemy.hp = Math.min(gameState.enemy.hp, newMax);
        addLog(`Dificultad cambiada: HP rival ahora ${gameState.enemy.hp}/${gameState.enemy.maxHp}`, "warning");
      }
    }
  }

  function changeCardVisibility(val) {
    gameState.showEnemyCards = (val === "show");
    if (gameState.showEnemyCards) {
      addLog("Mostrando todas las cartas del rival (configuración anula Monje Desatar).", "info");
    }
    renderCards();
  }

  /* ============================================================
     APUESTA DE VIDA — 7 MANOS POR PISO
     ============================================================ */
  const BET_OPTIONS = [1, 5, 10, 15, 25];
  const BET_LABELS = ["1 HP (prudente)", "5 HP (poco riesgo)", "10 HP (riesgo medio)", "15 HP (arriesgado)", "25 HP (máximo riesgo)"];
  const BET_COLORS = ["#45a29e", "#e63946", "#f4a261", "#a8dadc", "#ff6b6b"];

  function showBetScreen() {
    const p = gameState.player;
    const e = gameState.enemy;
    const desc = document.getElementById("bet-desc");
    const pShield = gameState.status.playerShield || 0;
    const eShield = gameState.status.enemyShield || 0;
    const pShieldStr = pShield > 0 ? ` <span style="color:#48cae4;">[🛡️+${pShield}]</span>` : "";
    const eShieldStr = eShield > 0 ? ` <span style="color:#48cae4;">[🛡️+${eShield}]</span>` : "";

    if (p.handNumber >= TURNS_PER_FLOOR) {
      document.body.classList.add("sudden-death-active");
      const suddenRound = p.handNumber - TURNS_PER_FLOOR + 1;
      const suddenMult = 1 + suddenRound;
      desc.innerHTML = `<div class="sudden-death-badge">🔥 MUERTE SÚBITA — ASALTO ${suddenRound} (¡DAÑO x${suddenMult}!)</div><br>` +
        `<span style="color:#ff758f;font-size: 9px;letter-spacing:0.5px;">⚡ ¡FRENESÍ ESCALABLE! Daño x${suddenMult} para ambos. ¡Cada asalto suma +1 al multiplicador!</span><br><br>` +
        `<span style="color:#2a9d8f;">🧑 Tu HP: ${p.hp}/${p.maxHp}${pShieldStr}</span> &nbsp;|&nbsp; ` +
        `<span style="color:#e63946;">👹 Rival: ${e.hp}/${e.maxHp}${eShieldStr}</span>`;
    } else {
      document.body.classList.remove("sudden-death-active");
      desc.innerHTML = `<b style="color:#ffd166;font-size: 9px;">MANO ${p.handNumber + 1}/${TURNS_PER_FLOOR}</b><br>` +
        `Elige cuánta vida apostar contra ${e.name}:<br><br>` +
        `<span style="color:#2a9d8f;">🧑 Tu HP: ${p.hp}/${p.maxHp}${pShieldStr}</span> &nbsp;|&nbsp; ` +
        `<span style="color:#e63946;">👹 Rival: ${e.hp}/${e.maxHp}${eShieldStr}</span>`;
    }
    if (p && p.curse === "gambler_pact") {
      desc.innerHTML += `<div style="margin-top:6px;font-size:9px;color:#ffd166;background:rgba(217,119,6,0.15);padding:4px 8px;border-radius:4px;border:1px solid #ffd166;">🎲 Juramento del Gran Tahúr activo: Apuesta mínima fijada en 10 HP (Blackjack x3.5).</div>`;
    }
    // update card styles
    const cards = document.querySelectorAll("#screen-bet .card");
    const isGamblerPact = p && p.curse === "gambler_pact";
    cards.forEach((card, i) => {
      const amt = BET_OPTIONS[i];
      card.style.borderColor = BET_COLORS[i];
      const blockedByCurse = isGamblerPact && p.hp >= 10 && amt < 10;
      if (amt > p.hp || blockedByCurse) {
        card.classList.add("disabled");
        if (blockedByCurse) {
          card.setAttribute("title", "🎲 Bloqueado por el Juramento del Gran Tahúr (Apuesta mínima 10 HP)");
        } else {
          card.removeAttribute("title");
        }
      } else {
        card.classList.remove("disabled");
        card.removeAttribute("title");
      }
    });
    gameState.phase = "bet";
    document.getElementById("screen-bet").classList.remove("hidden");
    document.getElementById("controls").style.display = "none";
  }

  let _isPlacingBet = false;
  function placeBet(amount) {
    if (_isPlacingBet) return;
    const p = gameState.player;
    if (p && p.curse === "gambler_pact" && p.hp >= 10 && amount < 10) {
      addLog("🎲 Juramento del Gran Tahúr: Tu apuesta mínima de combate queda fijada en 10 HP.", "warning");
      return;
    }
    if (amount > p.hp) {
      addLog(`No puedes apostar ${amount} HP — tienes solo ${p.hp}.`, "warning");
      return;
    }
    if (amount > gameState.enemy.hp && amount > 0) {
      addLog(`El rival tiene ${gameState.enemy.hp} HP: el exceso de la apuesta se desperdicia.`, "warning");
    }
    _isPlacingBet = true;
    p.betAmount = amount;
    gameState.phase = "hand";
    document.getElementById("screen-bet").classList.add("hidden");
    document.getElementById("controls").style.display = "flex";
    Promise.resolve(startNewHand()).finally(() => {
      _isPlacingBet = false;
    });
  }

  /* ============================================================
     INICIAR NUEVA MANO
     ============================================================ */
  async function startNewHand() {
    const p = gameState.player;
    const e = gameState.enemy;

    p.playerHand = [drawCard(), drawCard()];
    p.playerScore = calculateHandScore(p.playerHand);
    p.bust = p.playerScore > BUST_LIMIT;
    p.blackjack = (p.playerScore === 21 && p.playerHand.length === 2);
    p.stand = false;
    p.turnShieldBonus = 0;
    p.turnDoubleDamage = false;
    p.duplaDef = 0;
    p.activeHandSynergies = {};
    p.cardBonusDamage = 0;
    p.sharpArmorPierce = 0;
    p.astralCardInHand = false;

    e.enemyHand = [drawCard(), drawCard()];
    e.enemyScore = calculateHandScore(e.enemyHand);
    e.bust = e.enemyScore > BUST_LIMIT;
    e.blackjack = (e.enemyScore === 21 && e.enemyHand.length === 2);
    e.stand = false;
    e.enemyRevealed = false;

    // Dupla por rango idéntico (ej: 2 Ases, 2 Reyes, 2 Dieces)
    if (p.playerHand.length === 2 && p.playerHand[0].rank === p.playerHand[1].rank) {
      p.duplaDef = 2;
      spawnFloatingText("player-sprite", "DUPLA +2 DEF", "shield");
      addLog("¡DUPLA! +2 DEF esta mano.", "info");
    }

    detectClassPassives();
    applyCurseOnDraw(p.playerHand);
    applyDrawnCardUpgrades(p.playerHand);

    // As de Diamantes Baluarte (Arena): +4 de Escudo al inicio de mano
    const hasDiamondGuard = p.playerHand.some(c => (c.specialId || c.id) === "diamond_ace_guard");
    if (hasDiamondGuard) {
      if (!gameState.status) gameState.status = {};
      gameState.status.playerShield = (gameState.status.playerShield || 0) + 4;
      spawnFloatingText("player-sprite", "+4 ESCUDO BALUARTE", "shield");
      addLog("🛡️ As de Diamantes Baluarte: +4 Escudo protector al inicio de la mano.", "shield");
    }

    renderCards();
    updateHud();
    updateCombatState();
    updateHUDHandNumber();

    addLog(`MANO ${p.handNumber + 1}/${TURNS_PER_FLOOR} — Apuesta: ${p.betAmount} HP`, "info");

    // Reparto animado: tus 2 primeras cartas y las del rival
    await animateInitialDeal();

    // Muerte por Mazo Astillado durante el reparto
    if (p.hp <= 0) {
      addLog("💀 ¡HP agotado! Muerte súbita...", "damage");
      await sleep(400);
      showFateWheel("death");
      return;
    }

    // Comprobación reglamentaria de Blackjack Natural en el reparto
    if (p.blackjack && e.blackjack) {
      addLog("🤝 ¡BLACKJACK SIMULTÁNEO! Ambos contendientes tienen 21.", "info");
      await resolveHandResult("push");
    } else if (p.blackjack && p.playerHand.length === 2) {
      try { playBlackjackFanfareSound(); } catch (_) {}
      await resolveHandResult(true);
    } else if (e.blackjack && e.enemyHand.length === 2) {
      addLog(`💀 ¡${e.name} tiene Blackjack Natural de entrada!`, "damage");
      await resolveHandResult(false);
    } else if (p.bust) {
      try { playBustSound(); } catch (_) {}
      p._runBustCount = (p._runBustCount || 0) + 1; // Tracking para post-mortem
      addLog("💥 ¡BUST al iniciar! Pierdes la mano.", "damage");
      await resolveHandResult(false);
    }
  }

  function updateHUDHandNumber() {
    const p = gameState.player;
    if (!p) return;
    const el = document.getElementById("table-hand-pill");
    if (!el) return;
    if (p.handNumber >= TURNS_PER_FLOOR) {
      // EN MODO FURIA: rojo parpadeante
      const suddenRound = p.handNumber - TURNS_PER_FLOOR + 1;
      const suddenMult = 1 + suddenRound;
      el.classList.add("sudden-death");
      el.innerHTML = `<span class="sudden-death-hud-badge">🔥 ASALTO ${suddenRound} — x${suddenMult}</span>`;
      el.title = `Muerte Súbita: Asalto ${suddenRound} con daño x${suddenMult}`;
    } else {
      el.classList.remove("sudden-death");
      const handsLeft = TURNS_PER_FLOOR - (p.handNumber + 1);
      const isWarning = handsLeft <= 1; // Última mano antes de Furia
      if (isWarning) {
        el.innerHTML = `<span class="hand-hud-warning">⚠️ MANO ${p.handNumber + 1}/${TURNS_PER_FLOOR} — ¡ÚLTIMA ANTES DE FURIA!</span>`;
      } else {
        el.innerText = `MANO ${p.handNumber + 1}/${TURNS_PER_FLOOR}`;
      }
      el.title = `Mano ${p.handNumber + 1} de ${TURNS_PER_FLOOR} en el Piso ${gameState.floor}`;
    }
  }
  window.updateHUDHandNumber = updateHUDHandNumber;


  /* ============================================================
     BANNER DINÁMICO DE RESOLUCIÓN DE COMBATE
     ============================================================ */
  let bannerTimeout = null;
  function showCombatBanner(title, detail, type = "player-win") {
    const banner = document.getElementById("combat-banner");
    const titleEl = document.getElementById("combat-banner-title");
    const detailEl = document.getElementById("combat-banner-detail");
    if (!banner || !titleEl || !detailEl) return;

    if (bannerTimeout) clearTimeout(bannerTimeout);

    banner.className = "combat-banner " + type;
    titleEl.innerText = title;
    detailEl.innerText = detail;

    bannerTimeout = setTimeout(() => {
      banner.classList.add("hidden");
    }, 3400);
  }

  /* ============================================================
     SISTEMA DE EXP Y SUBIDA DE NIVEL (RPG CLASS GROWTH + BENDICIONES)
     ============================================================ */
  const CLASS_STAT_GROWTH = {
    knight: {
      name: "Caballero",
      role: "🛡️ Tanque de Diamantes",
      hp: 15,
      heal: 20,
      pwr: (lvl) => (lvl % 2 === 0 ? 1 : 0),
      def: 1,
      bonusShield: 5,
      desc: "+15 HP Máx, +1 DEF, +5 Escudo de base por piso"
    },
    rogue: {
      name: "Pícaro",
      role: "🗡️ Asesino Crítico",
      hp: 7,
      heal: 12,
      pwr: 2,
      def: (lvl) => (lvl % 3 === 0 ? 1 : 0),
      bonusCrit: 0.05,
      desc: "+2 PWR permanente, +7 HP Máx, crítico mortal"
    },
    monk: {
      name: "Monje",
      role: "💍 Artista Marcial",
      hp: 11,
      heal: 25,
      pwr: 1,
      def: (lvl) => (lvl % 2 === 0 ? 1 : 0),
      bonusDodge: 0.05,
      desc: "+11 HP Máx, +1 PWR, sanación interior +25 HP"
    },
    necromancer: {
      name: "Nigromante",
      role: "💀 Cosechador de Almas",
      hp: 9,
      heal: 15,
      pwr: 2,
      def: (lvl) => (lvl % 3 === 0 ? 1 : 0),
      soulShield: 6,
      desc: "+2 PWR místico, +9 HP Máx, +6 Escudo de Almas"
    }
  };
  window.CLASS_STAT_GROWTH = CLASS_STAT_GROWTH;

  let levelUpResolver = null;
  async function gainExp(amount) {
    const p = gameState.player;
    if (!p) return;
    p.exp = (p.exp || 0) + amount;
    
    // Guardar simultáneamente en la maestría permanente del Jack activo para siempre
    addHeroPermanentExp(p.class, amount);

    spawnFloatingText("player-sprite", `+${amount} EXP`, "heal");
    updateHud();

    let needed = getExpRequiredForLevel(p.level || 1);
    while (p.exp >= needed) {
      p.exp -= needed;
      p.level = (p.level || 1) + 1;
      needed = getExpRequiredForLevel(p.level);
      p.nextLevelExp = needed;

      // Crecimiento base automático del personaje según su clase RPG
      const growth = CLASS_STAT_GROWTH[p.class] || CLASS_STAT_GROWTH.knight;
      const hpGain = growth.hp;
      const pwrGain = typeof growth.pwr === "function" ? growth.pwr(p.level) : growth.pwr;
      const defGain = typeof growth.def === "function" ? growth.def(p.level) : growth.def;
      const healGain = growth.heal;

      p.maxHp += hpGain;
      p.hp = Math.min(p.maxHp, p.hp + healGain);
      p.pwr += pwrGain;
      p.def += defGain;
      if (growth.bonusShield) {
        p.turnShieldBonus = (p.turnShieldBonus || 0) + growth.bonusShield;
        if (!gameState.status) gameState.status = {};
        gameState.status.playerShield = (gameState.status.playerShield || 0) + growth.bonusShield;
      }
      if (growth.soulShield) {
        if (!gameState.status) gameState.status = {};
        gameState.status.playerShield = (gameState.status.playerShield || 0) + growth.soulShield;
      }

      // SPRINT 1: Nivel Permanente Real — el crecimiento automático de clase se guarda para siempre.
      // (Los Puntos de Legado ya no se otorgan por subir de nivel: solo al completar la Torre.)
      saveHeroRunProgress(p, { hp: hpGain, pwr: pwrGain, def: defGain });

      spawnFloatingText("player-sprite", `⭐ ¡NIVEL ${p.level}!`, "crit");
      addLog(`✨ ¡SUBISTE AL NIVEL ${p.level}! Crecimiento de ${growth.name}: +${hpGain} HP Máx, +${pwrGain} PWR, +${defGain} DEF${growth.bonusShield ? `, +${growth.bonusShield} Escudo` : ""}. Guardado en tu Nivel Permanente.`, "critical");
      updateHud();
      await triggerLevelUp();
    }
    p.nextLevelExp = getExpRequiredForLevel(p.level || 1);
    // SPRINT 1: la EXP restante también es permanente (sobrevive a la muerte)
    saveHeroRunProgress(p, null);
    updateHud();
  }

  function triggerLevelUp() {
    return new Promise(resolve => {
      levelUpResolver = resolve;
      showLevelUpModal();
    });
  }

  function showLevelUpModal() {
    const p = gameState.player;
    const maxSlots = getMaxArtifactSlots();
    const lvlNum = document.getElementById("levelup-lvl-num");
    if (lvlNum) lvlNum.innerText = "NIVEL " + p.level;

    const growth = CLASS_STAT_GROWTH[p.class] || CLASS_STAT_GROWTH.knight;
    const hpGain = growth.hp;
    const pwrGain = typeof growth.pwr === "function" ? growth.pwr(p.level) : growth.pwr;
    const defGain = typeof growth.def === "function" ? growth.def(p.level) : growth.def;

    const choicesEl = document.getElementById("levelup-choices");
    if (choicesEl) {
      const availableRelics = ALL_RELICS.filter(r => r.type === "buff" && !(p.obtainedRelics || []).includes(r.id));
      const chosenRelic = (availableRelics.length > 0)
        ? availableRelics[Math.floor(Math.random() * availableRelics.length)]
        : ALL_RELICS[0];
      choicesEl.innerHTML = `
        <!-- DESGLOSE DE CRECIMIENTO AUTOMÁTICO RPG -->
        <div style="background:rgba(102,252,241,0.08);border:1px solid rgba(102,252,241,0.3);border-radius:8px;padding:8px;margin-bottom:10px;text-align:center;">
          <div style="font-family:var(--font-display);font-size:11px;font-weight:700;color:#66fcf1;margin-bottom:4px;">
            👑 CRECIMIENTO NATURAL DE ${growth.name.toUpperCase()}:
          </div>
          <div style="font-size:10px;font-weight:bold;color:#ffd166;">
            ❤️ +${hpGain} HP &nbsp;•&nbsp; ⚔️ +${pwrGain} PWR &nbsp;•&nbsp; 🛡️ +${defGain} DEF
          </div>
          <div style="font-size: 9px;color:#94a3b8;margin-top:2px;">${growth.desc}</div>
        </div>

        <div class="levelup-sub" style="margin-bottom:10px;font-size: 9px;color:#94a3b8;line-height:1.4;">
          ⚡ ¡Has alcanzado un nuevo nivel de poder! Ranuras de artefactos: <b style="color:#ffd166;">${maxSlots}/5</b>. Elige tu bendición de atributos para esta ascensión:
        </div>

        <div class="levelup-option-card" onclick="chooseLevelUpReward('hp')">
          <div class="levelup-opt-icon">💖</div>
          <div>
            <div class="levelup-opt-title">VITALIDAD DE JACK</div>
            <div class="levelup-opt-desc">+20 Salud Máxima y curación inmediata de +30 HP.</div>
          </div>
        </div>
        <div class="levelup-option-card" onclick="chooseLevelUpReward('pwr')">
          <div class="levelup-opt-icon">⚔️</div>
          <div>
            <div class="levelup-opt-title">FURIA DE JACK</div>
            <div class="levelup-opt-desc">+2 PWR permanente (+12% de daño escalable a todos tus ataques).</div>
          </div>
        </div>
        <div class="levelup-option-card" onclick="chooseLevelUpReward('def')">
          <div class="levelup-opt-icon">🛡️</div>
          <div>
            <div class="levelup-opt-title">BASTIÓN DE JACK</div>
            <div class="levelup-opt-desc">+1 DEF de armadura permanente y +8 de Escudo protector azul por piso.</div>
          </div>
        </div>
        <!-- chooseLevelUpReward('relic_${chosenRelic.id}') retirado de subida de nivel según solicitud del usuario -->
      `;
    }
    const screenLvl = document.getElementById("screen-levelup");
    if (screenLvl) screenLvl.classList.remove("hidden");
    try { playLevelUpSound(); } catch (_) {}
  }

  function chooseLevelUpReward(type) {
    const p = gameState.player;
    if (!p.artifacts) p.artifacts = [];
    const maxSlots = getMaxArtifactSlots();

    if (typeof type === "string" && type.startsWith("relic_")) {
      const relId = type.replace("relic_", "");
      selectRandomRelic(relId);
      spawnFloatingText("player-sprite", "🎁 RELIQUIA", "crit");
      addLog("⭐ Bendición de Nivel " + p.level + ": Has integrado una reliquia arcana a tu poder.", "critical");
    } else if (type === "hp") {
      p.maxHp += 20;
      p.hp = Math.min(p.maxHp, p.hp + 30);
      spawnFloatingText("player-sprite", "+20 MAX HP", "heal");
      addLog("⭐ Bendición de Nivel " + p.level + ": +20 HP Máx y +30 HP curados (" + p.hp + "/" + p.maxHp + " HP).", "heal");
    } else if (type === "pwr") {
      p.pwr += 2;
      spawnFloatingText("player-sprite", "+2 PWR", "crit");
      addLog("⭐ Bendición de Nivel " + p.level + ": +2 PWR permanente (PWR actual: " + p.pwr + ").", "heal");
    } else if (type === "def") {
      p.def += 1;
      if (!gameState.status) gameState.status = { playerShield: 0 };
      gameState.status.playerShield = (gameState.status.playerShield || 0) + 8;
      spawnFloatingText("player-sprite", "+1 DEF", "shield");
      addLog("⭐ Bendición de Nivel " + p.level + ": +1 DEF permanente y +8 Escudo azul (DEF actual: " + p.def + ").", "heal");
    } else if (type === "relic_hp") {
      p.maxHp += 15;
      p.hp = Math.min(p.maxHp, p.hp + 20);
      if (p.artifacts.length < maxSlots) {
        p.artifacts.push({ id: "titan_heart", name: "Corazón de Titán", icon: "🩸" });
      }
      addLog("⭐ Reliquia de Nivel " + p.level + ": Corazón de Titán equipado (+15 HP Máx y +4 HP por mano ganada).", "critical");
    } else if (type === "relic_pwr") {
      p.pwr += 2;
      if (p.artifacts.length < maxSlots) {
        p.artifacts.push({ id: "war_fang", name: "Colmillo de Guerra", icon: "⚡" });
      }
      addLog("⭐ Reliquia de Nivel " + p.level + ": Colmillo de Guerra equipado (+2 PWR y perforación de armadura).", "critical");
    } else if (type === "relic_def") {
      p.def += 1;
      if (p.artifacts.length < maxSlots) {
        p.artifacts.push({ id: "diamond_aegis", name: "Égida de Diamante", icon: "🛡️" });
      }
      if (!gameState.status) gameState.status = { playerShield: 0 };
      gameState.status.playerShield = (gameState.status.playerShield || 0) + 10;
      addLog("⭐ Reliquia de Nivel " + p.level + ": Égida de Diamante equipada (+1 DEF y +10 Escudo azul por piso).", "critical");
    }
    const screenLvl = document.getElementById("screen-levelup");
    if (screenLvl) screenLvl.classList.add("hidden");
    updateHud();
    if (levelUpResolver) {
      const res = levelUpResolver;
      levelUpResolver = null;
      res();
    }
  }
  window.chooseLevelUpReward = chooseLevelUpReward;
  window.showLevelUpModal = showLevelUpModal;

  /* ============================================================
     RESOLVER RESULTADO DE MANO CON EFECTOS DE ESTADO Y RASGOS
     ============================================================ */
  async function resolveHandResult(result) {
    const p = gameState.player;
    const e = gameState.enemy;
    const bet = p.betAmount;
    const enemyHasBJ = e.blackjack && e.enemyHand.length === 2;
    const isPlayerWin = (result === true || result === "win");
    const isPush = (result === "push");
    const isSuddenDeath = (p.handNumber >= TURNS_PER_FLOOR);
    const suddenRound = isSuddenDeath ? (p.handNumber - TURNS_PER_FLOOR + 1) : 0;
    const suddenMult = isSuddenDeath ? (1 + suddenRound) : 1;

    // SPRINT 6: estadísticas de la run para el widget de resumen en Game Over
    if (p.blackjack && p.playerHand.length === 2) trackRunStat("blackjacks", 1);
    if (enemyHasBJ) trackRunStat("enemyBlackjacks", 1);
    setRunStatMax("bestHand", p.playerScore || 0);

    const clashIcon = document.getElementById("fighter-clash-icon");
    if (clashIcon) clashIcon.classList.add("clashing");

    const hasCrimsonNine = p.playerHand.some(c => (c.specialId || c.id) === "crimson_nine_bleed");
    if (hasCrimsonNine && !p.crimsonApplied) {
      p.crimsonApplied = true;
      gameState.status.enemyPoison = (gameState.status.enemyPoison || 0) + 2;
      spawnFloatingText("enemy-sprite", "+2 VENENO", "poison");
      addLog("🩸 9 Carmesí Voraz: ¡Infunde filo sangriento aplicando +2 de Veneno al rival!", "damage");
    }

    const hasFrozenSix = p.playerHand.some(c => (c.specialId || c.id) === "frozen_six_barrier");
    if (hasFrozenSix && p.stand && p.playerScore <= 18 && !p.frozenApplied) {
      p.frozenApplied = true;
      p.shield += 6;
      spawnFloatingText("player-sprite", "+6 ESCUDO", "shield");
      addLog("❄️ 6 Glacial Protector: ¡Te plantas con 18 o menos y obtienes +6 de Escudo!", "heal");
    }

    if (isPush) {
      // -------------------------------------------------------------
      // CASO EMPATE (PUSH): CHOQUE DE ARMAS (0 DAÑO PARA AMBOS)
      // -------------------------------------------------------------
      showCombatBanner("🤝 ¡CHOQUE DE ARMAS!", `Empate a ${p.playerScore} puntos. Los ataques se neutralizan.`, "tie");
      spawnFloatingText("player-sprite", "🛡️ CHOQUE (0)", "shield");
      spawnFloatingText("enemy-sprite", "🛡️ CHOQUE (0)", "shield");
      try { playWeaponClashPushSound(); } catch (_) {}
      addLog(`🤝 ¡EMPATE! Las espadas chocan en el aire. Ni tú ni ${e.name} reciben daño.`, "info");
      gameState.playerStreak = 0;
      const streakBadgePush = document.getElementById("player-streak-badge");
      if (streakBadgePush) {
        streakBadgePush.classList.add("hidden");
        streakBadgePush.classList.remove("active");
      }
      if (hasArtifact("copper_amulet")) {
        if (!gameState.status) gameState.status = {};
        gameState.status.playerShield = (gameState.status.playerShield || 0) + 2;
        spawnFloatingText("player-sprite", "🛡️ +2 ESCUDO", "shield");
        addLog("💍 Amuleto de Cobre: +2 de Escudo azul protector tras empatar mano.", "heal");
        updateHud();
      }
      await sleep(450);

    } else if (isPlayerWin) {
      if (p.playerScore === 21) {
        try { playBlackjackFanfareSound(); } catch (_) {}
      }

      // Racha "¡ON FIRE! 🔥" (Dopamina pura y ritmo frenético)
      gameState.playerStreak = (gameState.playerStreak || 0) + 1;
      let streakMult = 1.0;
      const streakBadge = document.getElementById("player-streak-badge");
      if (gameState.playerStreak >= 3) {
        streakMult = 2.0;
        if (streakBadge) {
          streakBadge.innerText = `🔥 x2.0 (${gameState.playerStreak} RACHA)`;
          streakBadge.classList.remove("hidden");
          streakBadge.classList.add("active");
        }
        spawnFloatingText("player-sprite", `🔥 ¡ON FIRE x2.0!`, "crit");
        triggerScreenShake("light");
      } else if (gameState.playerStreak >= 2) {
        streakMult = 1.5;
        if (streakBadge) {
          streakBadge.innerText = `🔥 x1.5 (2 RACHA)`;
          streakBadge.classList.remove("hidden");
          streakBadge.classList.add("active");
        }
        spawnFloatingText("player-sprite", "🔥 ¡ON FIRE x1.5!", "crit");
      } else {
        if (streakBadge) {
          streakBadge.classList.add("hidden");
          streakBadge.classList.remove("active");
        }
      }

      // Misión de Jack Pícaro: Ganar manos con valor par
      if (isEven(p.playerScore)) {
        checkHeroUnlockCondition("rogue", 1, "add");
      }

      // SPRINT 4 — Perks Tácticos: se captura el flag "pendiente" de la mano
      // anterior ANTES de reevaluar (evaluateSynergies limpia los flags).
      const pendingNextBJx4 = !!p._synergyNextBJx4;

      // SPRINT 4 — Perks Tácticos: evaluar y aplicar los combos de condición
      if (typeof evaluateSynergies === "function") {
        const perkActivated = evaluateSynergies(p, e, gameState);
        if (perkActivated.length > 0) {
          if (typeof showSynergyPopups === "function") showSynergyPopups(perkActivated);
        }
      }

      // Perk Táctico [Toque de Midas]: +2 de Oro por ganar la mano
      if (p._synergyGoldenTouch) {
        p._synergyGoldenTouch = false;
        gameState.gold += 2;
        spawnFloatingText("player-sprite", "+2 🪙 MIDAS", "gold");
        addLog("🪙 Perk Táctico [Toque de Midas]: +2 de Oro por ganar la mano.", "gold");
      }

      // Win streak para Rayo en Cadena
      p._winStreak = (p._winStreak || 0) + 1;

      // FASE 3 (R-02): SINERGIAS CONDICIONALES DE VESTIDURAS
      const isNatural21 = p.blackjack && p.playerHand.length === 2;
      if (typeof applyEquippedSkinSynergy === "function") {
        applyEquippedSkinSynergy("hand_win", p, e, gameState);
        if (p.playerScore === 20 || p.playerScore === 21) applyEquippedSkinSynergy("hand_win_high", p, e, gameState);
        if (p.stand && p.playerScore <= 16) applyEquippedSkinSynergy("stand_low_win", p, e, gameState);
        if (isNatural21) applyEquippedSkinSynergy("blackjack_natural", p, e, gameState);
        if (p.playerScore === 21) applyEquippedSkinSynergy("score_21_win", p, e, gameState);
        applyEquippedSkinSynergy("hearts_win", p, e, gameState);
        applyEquippedSkinSynergy("streak_win", p, e, gameState);
        applyEquippedSkinSynergy("spades_win", p, e, gameState);
        applyEquippedSkinSynergy("has_ace_win", p, e, gameState);
        applyEquippedSkinSynergy("low_hp_win", p, e, gameState);
      }

      // -------------------------------------------------------------
      // FASE 1: ATAQUE DEL JUGADOR (FÓRMULA TRANSPARENTE: PWR + APUESTA - DEF)
      // -------------------------------------------------------------
      let effectiveEnemyDef = e.def;

      // HABILIDAD SUPREMA DE CLASE: ÚNICAMENTE CON 21 EN LA PRIMERA MANO
      if (isNatural21) {
        if (p.class === "knight") {
          gameState.status.playerShield += 15;
          spawnFloatingText("player-sprite", "🛡️ +15 ESCUDO SAGRADO", "shield");
          addLog("💎 ¡Trascendencia del 21 (Caballero)! Muro de Diamantes: +15 de Escudo Sagrado.", "critical");
          playShieldSound();
        } else if (p.class === "rogue") {
          effectiveEnemyDef = 0; // Asesinato de Picas ignora el 100% de la defensa enemiga
          spawnFloatingText("player-sprite", "🗡️ ASESINATO PERFORANTE", "crit");
          addLog("♠ ¡Trascendencia del 21 (Pícaro)! Asesinato de Picas ignora la defensa rival.", "critical");
        } else if (p.class === "monk") {
          p.hp = Math.min(p.maxHp, p.hp + 20);
          spawnFloatingText("player-sprite", "💖 +20 HP NIRVANA", "heal");
          addLog("♥ ¡Trascendencia del 21 (Monje)! Nirvana del 21 restaura +20 HP de vida.", "critical");
          playVictorySound();
        } else if (p.class === "necromancer") {
          gameState.status.enemyPoison += 5;
          p.hp = Math.min(p.maxHp, p.hp + 10);
          e.hp = Math.max(0, e.hp - 10);
          spawnFloatingText("enemy-sprite", "☠️ +5 VENENO / -10 HP", "poison");
          spawnFloatingText("player-sprite", "🩸 +10 HP DRENADOS", "heal");
          addLog("♣ ¡Trascendencia del 21 (Nigromante)! Cosecha de Almas drena 10 HP y aplica 5 de Veneno.", "critical");
          playPoisonSound();
        }
      }

      let bonus = 0;
      if (p.gem === "ruby" && isEven(p.playerScore) === false) bonus += 2;
      if (p.gem === "topaz") bonus += 1;
      if (p.hasGoldenDie && p.playerHand.length > 2) bonus += 3;
      if (hasArtifact("warriors_ring")) bonus += 1;
      if (hasArtifact("war_fang")) effectiveEnemyDef = Math.max(0, effectiveEnemyDef - 1);
      if (hasArtifact("behemoth_fang")) effectiveEnemyDef = Math.max(0, effectiveEnemyDef - 3);
      if (hasArtifact("rider_spur") && !p.riderSpurUsedThisFloor) {
        p.riderSpurUsedThisFloor = true;
        bonus += 5;
        addLog("👞 Espuela del Jinete: +5 de daño directo garantizado en primera mano.", "critical");
      }
      if (hasArtifact("fury_bracer")) {
        p.furyBracerStreak = (p.furyBracerStreak || 0) + 1;
        bonus += p.furyBracerStreak;
        addLog("🥊 Brazal de Furia: Racha +" + p.furyBracerStreak + " de daño extra.", "critical");
      }
      if (hasArtifact("bloody_chalice") && !isEven(p.playerScore)) {
        p.hp = Math.min(p.maxHp, p.hp + 3);
        spawnFloatingText("player-sprite", "+3 HP CÁLIZ", "heal");
        addLog("🍷 Cáliz Sangriento: +3 HP drenados por mano impar ganada.", "heal");
      }
      if (hasArtifact("titan_heart")) {
        p.hp = Math.min(p.maxHp, p.hp + 4);
        spawnFloatingText("player-sprite", "+4 HP TITÁN", "heal");
        addLog("🩸 Corazón de Titán: +4 HP restaurados por victoria en mano.", "heal");
      }
      if (hasArtifact("holy_grail") && isNatural21) {
        bonus += 10;
        p.hp = Math.min(p.maxHp, p.hp + 10);
        spawnFloatingText("player-sprite", "+10 HP GRIAL", "heal");
        addLog("🏆 Cáliz del 21: ¡Blackjack desata +10 daño y cura +10 HP!", "critical");
      }
      if (hasStarterBlessing("oak_bark")) {
        p.hp = Math.min(p.maxHp, p.hp + 3);
        spawnFloatingText("player-sprite", "+3 HP ROBLE", "heal");
        addLog("🪵 Corteza de Roble: +3 HP regenerados tras ganar la mano.", "heal");
      }
      if (hasStarterBlessing("shadow_lord") && p.playerScore >= 19) {
        effectiveEnemyDef = 0;
        addLog("⚔️ Señor de las Sombras: Ignoraste el 100% de la armadura enemiga (DEF 0).", "critical");
      }
      if (hasCardUpgrade("sharp_cards")) {
        const sharpCount = p.playerHand.filter(c => [2, 3, 4, 5].includes(c.value)).length;
        if (sharpCount > 0) {
          bonus += sharpCount * 2;
          addLog("🗡️ Cartas Afiladas: +" + (sharpCount * 2) + " daño de corte.", "critical");
        }
      }
      if (hasCardUpgrade("devastating_pair") && p.playerHand.length >= 2 && p.playerHand[0].rank === p.playerHand[1].rank) {
        bonus += 5;
        addLog("👯 Dupla Devastadora: +5 de daño de impacto.", "critical");
      }
      if (hasCardUpgrade("piercing_spades")) {
        const spadeCount = p.playerHand.filter(c => c.suit === "♠" || c.suit === "spades").length;
        if (spadeCount > 0) effectiveEnemyDef = Math.max(0, effectiveEnemyDef - (spadeCount * 2));
      }
      if (p.sharpArmorPierce && p.sharpArmorPierce > 0) {
        effectiveEnemyDef = Math.max(0, effectiveEnemyDef - p.sharpArmorPierce);
        addLog(`🗡️ Sello Afilado: Ignora ${p.sharpArmorPierce} DEF de armadura rival (DEF efectiva: ${effectiveEnemyDef}).`, "critical");
      }

      // SPRINT 4 — Perks Tácticos: daño extra de esta mano (Acumulado por
      // assassin_edge / fire_and_ice / chain_lightning / shield_bash /
      // arcane_surge / dragon_slayer)
      if (p._synergyBonusPwr > 0) {
        bonus += p._synergyBonusPwr;
        addLog(`⚡ Perk Táctico: +${p._synergyBonusPwr} de daño de impacto en este golpe.`, "critical");
      }

      // 1. Margen de victoria en las cartas (más aplastante la victoria en la mano = más impacto)
      const scoreMargin = Math.max(0, p.playerScore - (e.bust ? 15 : e.enemyScore));
      const marginBonus = Math.floor(scoreMargin * 0.75);

      // 2. Escalado por Porcentaje de Nivel (+12% de daño directo por cada nivel de tu Jack)
      const levelMult = 1 + ((p.level || 1) - 1) * 0.12;

      // 3. FÓRMULA DE DAÑO: Base = PWR normal + Apuesta + Margen de Mano + Reliquias / Mejoras de Cartas
      let baseStrike = p.pwr + bet + marginBonus + bonus + (p.cardBonusDamage || 0);
      let rawPlayerDmg = Math.round(baseStrike * levelMult);
      let dmg = Math.max(0, rawPlayerDmg - effectiveEnemyDef);
      if (hasCardUpgrade("astral_ace") && isNatural21) {
        dmg = Math.round(dmg * 1.5);
        addLog("✨ ¡As Astral! Tu golpe crítico se amplifica x1.5.", "critical");
      }
      if (hasStarterBlessing("berserker_rage") && (p.playerScore === 20 || p.playerScore === 21)) {
        dmg = Math.round(dmg * 1.30);
        addLog("⚡ Ira del Berserker: ¡Daño amplificado +30% por puntuación 20/21!", "critical");
      }
      if (hasStarterBlessing("blackjack_transcendence") && isNatural21) {
        dmg = Math.round(dmg * 2.5);
        p.hp = Math.min(p.maxHp, p.hp + 15);
        spawnFloatingText("player-sprite", "+15 HP TRANSCENDENCIA", "heal");
        addLog("🃏 Trascendencia del 21: ¡Daño crítico x2.5 y +15 HP restaurados!", "critical");
      }
      if (hasArtifact("glory_hand") && isNatural21 && (p.playerHand.some(c => (c.suit === "♠" || c.suit === "♦") && (c.value === 11 || c.rank === "A")))) {
        if (e.hp / e.maxHp <= 0.30) {
          dmg = e.hp;
          spawnFloatingText("enemy-sprite", "💀 EJECUCIÓN", "crit");
          addLog("🕯️ Mano de Gloria: ¡Ejecución fulminante del rival con Blackjack!", "critical");
        }
      }
      if (hasArtifact("midas_gauntlet") && dmg > 0) {
        const midasGold = Math.max(1, Math.floor(dmg * 0.10));
        gameState.gold += midasGold;
        spawnFloatingText("player-sprite", "+" + midasGold + " 🪙", "gold");
        addLog("🧣 Guantelete de Midas: +" + midasGold + " Oro transmutado por impacto.", "gold");
      }
      if (p.astralCardInHand && isNatural21) {
        dmg = Math.round(dmg * 2.0);
        addLog("✨ ¡Sello Astral Arcano! Impacto cósmico duplica x2 tu daño final.", "critical");
      }

      const isBlackjackImpact = isNatural21 || p.blackjack || (p.playerScore === 21);
      if (isBlackjackImpact && ((p.blackjackMultiplier && p.blackjackMultiplier > 1) || (p && p.curse === "gambler_pact"))) {
        const mult = p.blackjackMultiplier || 3.5;
        dmg = Math.max(1, Math.round(dmg * mult));
        spawnFloatingText("player-sprite", `🎲 x${mult} BLACKJACK TAHÚR`, "crit");
        addLog(`🎲 Juramento del Gran Tahúr: ¡Blackjack demoledor amplifica tu impacto x${mult}!`, "critical");
      }

      // Efectos de cartas dinámicas en ataque (Fase E)
      const hasDoubleJack = p.playerHand.some(c => (c.specialId || c.id) === "double_jack");
      if (hasDoubleJack && p.playerScore === 21) {
        addHeroPermanentExp(p.class, 10);
        spawnFloatingText("player-sprite", "+10 EXP JOTA DOBLE", "gold");
        addLog("🃏 Jota Doble: ¡Blackjack con Jota Doble otorga +10 EXP permanente!", "critical");
      }

      const hasCursedSeven = p.playerHand.some(c => (c.specialId || c.id) === "cursed_seven");
      if (hasCursedSeven && p.stand) {
        dmg += 8;
        spawnFloatingText("player-sprite", "+8 DAÑO 7 MALDITO", "crit");
        addLog("🩸 7 Maldito: ¡Plantarte con el 7 Maldito añade +8 de daño sacrificial!", "critical");
      }

      const hasOverloadThree = p.playerHand.some(c => (c.specialId || c.id) === "overload_three_spark");
      if (hasOverloadThree && p.playerScore === 21) {
        dmg += 12;
        spawnFloatingText("player-sprite", "💥 +12 SOBRECARGA", "crit");
        addLog("💥 3 Sobrecarga de Chispas: ¡Blackjack o 21 exacto desata +12 de daño crítico adicional!", "critical");
      }

      const hasSpadeExecute = p.playerHand.some(c => (c.specialId || c.id) === "spade_king_execute");
      if (isBlackjackImpact && hasSpadeExecute) {
        dmg = Math.max(dmg, Math.round(dmg * 3.0));
        spawnFloatingText("player-sprite", "⚔️ x3 VERDUGO", "crit");
        addLog("⚔️ Rey de Picas Verdugo: ¡Tus Blackjacks desatan impacto crítico demoledor x3!", "critical");
      }

      const hasHeartVampire = p.playerHand.some(c => (c.specialId || c.id) === "heart_queen_vampire");
      if (hasHeartVampire) {
        p.hp = Math.min(p.maxHp, p.hp + 8);
        spawnFloatingText("player-sprite", "+8 HP VAMPIRO", "heal");
        addLog("🩸 Reina de Corazones Sangrienta: +8 HP restaurados por mano ganadora.", "heal");
      }

      if (isSuddenDeath && dmg > 0) {
        dmg *= suddenMult;
        spawnFloatingText("player-sprite", `🔥 DAÑO x${suddenMult} FURIA`, "crit");
        addLog(`🔥 ¡FURIA ASALTO ${suddenRound}! Tu impacto se multiplica x${suddenMult}: ¡${dmg} de daño demoledor!`, "critical");
      }

      if (typeof streakMult !== "undefined" && streakMult > 1.0 && dmg > 0) {
        dmg = Math.round(dmg * streakMult);
        addLog(`🔥 ¡RACHA ON FIRE (x${streakMult})! Daño fulminante amplificado = ${dmg} daño.`, "critical");
      }

      if (dmg === 0) {
        addLog(`🛡️ ¡GOLPE RESISTIDO! La armadura de ${e.name} (DEF ${effectiveEnemyDef}) bloqueó tu ataque (${rawPlayerDmg} vs ${effectiveEnemyDef} DEF). ¡0 daño infligido!`, "warning");
        showCombatBanner("🛡️ ¡GOLPE RESISTIDO!", `${e.name} resistió tu impacto con su armadura (DEF ${effectiveEnemyDef})`, "tie");
        spawnFloatingText("enemy-sprite", "🛡️ BLOQUEADO (0)", "shield");
        playShieldSound();
        await sleep(650);
      } else {
        if (isNatural21) {
          triggerHaptic("blackjack");
          triggerScreenShake("heavy");
          if (p.gem === "blackjack_heritage") {
            dmg *= 4;
            p.hp = Math.min(p.maxHp, p.hp + 16);
            spawnFloatingText("player-sprite", "+16 HP", "heal");
            addLog("❤️‍🔥 ¡BLACKJACK HEREDADO! Daño x4 = " + dmg + " y +16 HP.", "critical");
          } else {
            dmg *= 3;
            addLog("❤️‍🔥 ¡BLACKJACK NATURAL (21)! Daño crítico x3 = " + dmg + ".", "critical");
          }
          // SPRINT 4 — Perk Táctico [Corazón de Diamante]: siguiente BJ x4
          if (pendingNextBJx4) {
            dmg = Math.round(dmg * 4);
            addLog("💎 Perk Táctico [Corazón de Diamante]: tu Blackjack se multiplica x4 adicional. Daño = " + dmg + ".", "critical");
          }
          playBlackjackSound();
        } else {
          triggerHaptic("hit_enemy");
          triggerScreenShake(isSuddenDeath ? "heavy" : "light");
        }

        setPlayerSpriteState("windup");
        await sleep(100);
        setPlayerSpriteState("strike");
        const suddenTag = isSuddenDeath ? ` [🔥FURIA x${suddenMult}]` : "";
        const levelTag = p.level > 1 ? ` (x${levelMult.toFixed(2)} Nvl ${p.level})` : "";
        addLog(`⚔️ ¡${p.name} asesta un golpe${suddenTag}! PWR (${p.pwr}) + Apuesta (${bet}) + Margen (+${marginBonus})${levelTag} - DEF (${effectiveEnemyDef}) = ${dmg} daño.`, "heal");
        // Naipes de Botín: Potenciador Multiplicador x2
        const multCard = p.playerHand && p.playerHand.find(c => c && c.operator === "mult");
        if (multCard) {
          dmg = Math.round(dmg * 2);
          addLog(`⚡ ${multCard.name || 'Naipe Multiplicador'}: ¡Impacto x2 potenciado! Daño = ${dmg}.`, "critical");
          spawnFloatingText("player-sprite", "⚡ x2 DAÑO", "crit");
        }

        // Rasgo Gárgola: Piel Pétrea (anula daño <= 3)
        if (e.trait === "stone" && dmg <= 3) {
          dmg = 0;
          setEnemySpriteState("block");
          spawnFloatingText("enemy-sprite", "¡PIEL PÉTREA!", "shield");
          addLog("Gárgola Pétrea: Su dura piel pétrea anula el daño leve.", "warning");
          await sleep(400);
        }

        // Absorción por escudo rival
        if (gameState.status.enemyShield > 0 && dmg > 0) {
          const absorbed = Math.min(gameState.status.enemyShield, dmg);
          gameState.status.enemyShield -= absorbed;
          dmg -= absorbed;
          setEnemySpriteState("block");
          spawnFloatingText("enemy-sprite", `🛡️ -${absorbed}`, "shield");
          playShieldSound();
          const eShieldWrap = document.getElementById("enemy-shield-wrapper");
          if (eShieldWrap) {
            eShieldWrap.classList.add("shield-hit");
            setTimeout(() => eShieldWrap.classList.remove("shield-hit"), 400);
          }
          updateHud();
          await sleep(400);
        }

        // Daño restante impacta en HP del rival
        if (dmg > 0) {
          const isCritHit = isNatural21 || dmg >= 20;
          if (isCritHit) {
            await applyHitStop(90);
            triggerScreenShake("heavy");
            setEnemySpriteState("hit_crit");
            spawnFloatingText("enemy-sprite", `-${dmg} ¡CRÍTICO!`, "crit");
          } else if (dmg < 8) {
            setEnemySpriteState("hit_weak");
            spawnFloatingText("enemy-sprite", `-${dmg}`, "damage-weak");
          } else {
            setEnemySpriteState("hit_normal");
            spawnFloatingText("enemy-sprite", `-${dmg}`, "damage");
          }

          e.hp = Math.max(0, e.hp - dmg);
          trackRunStat("damageDealt", dmg);
          addLog(`${e.name} recibe ${dmg} de daño (${e.hp}/${e.maxHp} HP).`, "heal");
          playDamageSound();
          const eSprite = document.getElementById("enemy-sprite");
          if (eSprite) {
            eSprite.classList.add("flash-damage");
            setTimeout(() => eSprite.classList.remove("flash-damage"), 350);
          }
          updateHud();
          await sleep(450);
        }

        setPlayerSpriteState("idle");

        // Rasgo Guardián de Obsidiana: Espinas reflectantes
        if (e.trait === "thorns" && dmg > 0 && p.hp > 0) {
          await sleep(350);
          p.hp = Math.max(0, p.hp - 2);
          trackRunStat("damageTaken", 2);
          spawnFloatingText("player-sprite", "ESPINAS -2", "damage");
          addLog("Guardián de Obsidiana: Sus espinas devuelven 2 de daño.", "damage");
          setPlayerSpriteState("hurt");
          playHitSound();
          updateHud();
          await sleep(750);
          setPlayerSpriteState("idle");
        }

        // Rasgo Orco Berserker: Furia
        if (e.trait === "fury" && e.hp > 0) {
          await sleep(350);
          e.pwr += 1;
          spawnFloatingText("enemy-sprite", "+1 PWR FURIA", "crit");
          addLog(`¡Orco Berserker se enfurece por el golpe (+1 PWR, ahora ${e.pwr})!`, "warning");
          updateHud();
          await sleep(600);
        }
      }
    } else {
      // Reset racha de victorias al perder mano
      gameState.playerStreak = 0;
      const streakBadgeLoss = document.getElementById("player-streak-badge");
      if (streakBadgeLoss) {
        streakBadgeLoss.classList.add("hidden");
        streakBadgeLoss.classList.remove("active");
      }
      const _p = window.gameState && window.gameState.player; if (_p) _p._winStreak = 0;
      // FASE 2: CONTRA-ATAQUE DEL RIVAL (JERARQUÍA: DEF ARMADURA -> ESCUDO AZUL -> VIDA HP)
      // -------------------------------------------------------------
      let totalDef = p.def + (p.turnShieldBonus || 0) + (p.duplaDef || 0);
      // SPRINT 4 — Perk Táctico [Muralla de Hierro]: +3 DEF frente a este contraataque
      if (p._synergyBonusDef > 0) {
        totalDef += p._synergyBonusDef;
        addLog(`🛡️ Perk Táctico [Muralla de Hierro]: +${p._synergyBonusDef} DEF frente a este contraataque (DEF total ${totalDef}).`, "critical");
        p._synergyBonusDef = 0;
      }
      let rawDmg = e.pwr + bet;
      if (enemyHasBJ) rawDmg *= (e.trait === "dragon" ? 3 : 2);

      if (isSuddenDeath) {
        rawDmg *= suddenMult; // Daño rival se multiplica por x2, x3, x4...
        totalDef = Math.max(0, totalDef - (1 + suddenRound)); // Perforación de armadura creciente
        spawnFloatingText("enemy-sprite", `🔥 ATAQUE x${suddenMult}`, "crit");
      }
      // Reset de racha de brazal de furia al perder mano
      if (hasArtifact("fury_bracer")) p.furyBracerStreak = 0;

      // Aturdimiento por Sello del Trueno
      if (gameState.status && gameState.status.enemyStunned) {
        gameState.status.enemyStunned = false;
        addLog("⚡ Sello del Trueno: ¡El rival está aturdido y no puede contraatacar!", "heal");
        spawnFloatingText("enemy-sprite", "⚡ ATURDIDO", "crit");
        rawDmg = 0;
      }
      // Fortaleza Inexpugnable (Starter Blessing): absorbe el primer golpe del piso
      if (hasStarterBlessing("unyielding_fortress") && p.absorbFirstHit) {
        p.absorbFirstHit = false;
        addLog("🏰 Fortaleza Inexpugnable: ¡Absorbiste el primer golpe del piso sin daño!", "heal");
        spawnFloatingText("player-sprite", "🏰 ABSORBIDO (0)", "shield");
        rawDmg = 0;
      }
      // Manto de Sombras (Artefacto 25% esquiva)
      if (hasArtifact("shadow_cloak") && Math.random() < 0.25) {
        addLog("🌑 Manto de Sombras: ¡Esquivaste el golpe enemigo por completo!", "heal");
        spawnFloatingText("player-sprite", "💨 ¡ESQUIVADO!", "crit");
        rawDmg = 0;
      }
      // Capa de Viento (Starter Blessing 20% esquiva)
      if (hasStarterBlessing("wind_cloak") && Math.random() < 0.20 && rawDmg > 0) {
        addLog("💨 Capa de Viento: ¡Esquivaste ágilmente el golpe del rival!", "heal");
        spawnFloatingText("player-sprite", "💨 ¡ESQUIVADO!", "crit");
        rawDmg = 0;
      }
      // SPRINT 4 — Perk Táctico [Acto de Desaparición]: 20% de esquivar este golpe
      if (p._synergyExtraDodge > 0 && rawDmg > 0 && Math.random() < p._synergyExtraDodge) {
        addLog("💨 Perk Táctico [Acto de Desaparición]: ¡Esquivaste el contraataque del rival!", "heal");
        spawnFloatingText("player-sprite", "💨 ¡ESQUIVADO!", "crit");
        rawDmg = 0;
      }
      p._synergyExtraDodge = 0;

      // FASE 3 (R-02): Evasión por Velo de Niebla (Vestidura Fantasma)
      if (p._skinDodgeActive && rawDmg > 0 && Math.random() < (p._skinDodgeChance || 0.25)) {
        addLog("💨 [Vestidura: Fantasma de la Niebla] ¡Esquivaste el contraataque envuelto en bruma espectral!", "heal");
        spawnFloatingText("player-sprite", "💨 ¡ESQUIVADO!", "crit");
        rawDmg = 0;
      }
      p._skinDodgeActive = false;

      // FASE 3 (R-02): Absorción por Flor de Protección (Vestidura Loto) en BUST
      if (p.bust && typeof applyEquippedSkinSynergy === "function") {
        applyEquippedSkinSynergy("player_bust", p, e, gameState);
      }

      // Reloj de Arena (50% no daño en BUST)
      if (hasArtifact("hourglass_time") && p.bust && Math.random() < 0.50 && rawDmg > 0) {
        addLog("⏳ Reloj de Arena: ¡El tiempo se detiene y anulas el daño del BUST!", "heal");
        spawnFloatingText("player-sprite", "⏳ BUST ANULADO", "shield");
        rawDmg = 0;
      }
      // Pacto del Gladiador: +2 DEF si HP < 30%
      if (hasStarterBlessing("gladiator_pact") && (p.hp / p.maxHp) <= 0.30) {
        totalDef += 2;
        addLog("🩸 Pacto del Gladiador: Furia desesperada (+2 DEF bajo 30% HP).", "critical");
      }
      let incomingDmg = Math.max(0, rawDmg - totalDef);
      // Yelmo de Valhalla: daño recibido limitado a un máximo de 20
      if (hasArtifact("valhalla_helm") && incomingDmg > 20) {
        incomingDmg = 20;
        addLog("🪖 Yelmo de Valhalla: Daño sufrido mitigado a un tope de 20.", "heal");
      }
      // SPRINT 4 — Perk Táctico [Última Resistencia]: el próximo golpe rival a 1
      if (p._synergyLastStand && incomingDmg > 0) {
        incomingDmg = 1;
        addLog("🏰 Perk Táctico [Última Resistencia]: ¡el golpe rival queda reducido a 1 daño!", "critical");
        spawnFloatingText("player-sprite", "🏰 ÚLTIMA RESISTENCIA", "shield");
      }
      p._synergyLastStand = false;

      // Ejecutar animación de embestida del rival
      setEnemySpriteState("windup");
      await sleep(100);
      setEnemySpriteState("strike");
      await sleep(200);

      if (incomingDmg === 0) {
        // BLOQUEO TOTAL POR ARMADURA (DEF)
        const suddenNote = isSuddenDeath ? ` [EN MUERTE SÚBITA x${suddenMult}]` : "";
        addLog(`🛡️ ¡BLOQUEO HEROICO${suddenNote}! Tu armadura (DEF ${totalDef}) neutraliza el ataque de ${e.name} (${rawDmg} Ataque vs ${totalDef} DEF). ¡0 daño recibido!`, "heal");
        showCombatBanner("🛡️ ¡GOLPE BLOQUEADO!", `Tu armadura (DEF ${totalDef}) neutralizó el ataque x${suddenMult} de ${e.name} (0 daño)`, "player-win");
        spawnFloatingText("player-sprite", "🛡️ BLOQUEADO (0)", "shield");
        playShieldSound();
        const pShieldWrap = document.getElementById("player-shield-wrapper");
        if (pShieldWrap) {
          pShieldWrap.classList.add("shield-hit");
          setTimeout(() => pShieldWrap.classList.remove("shield-hit"), 400);
        }
        await sleep(350);
        setEnemySpriteState("idle");
      } else {
        if (isSuddenDeath) {
          addLog(`🔥 ¡FURIA ASALTO ${suddenRound}! ${e.name} ataca con daño x${suddenMult} y perfora armadura (${rawDmg} Ataque - ${totalDef} DEF = ${incomingDmg} daño entrante).`, "damage");
          showCombatBanner(`🔥 ¡GOLPE DE FURIA (x${suddenMult})!`, `Ataque x${suddenMult} (${rawDmg}) - DEF (${totalDef}) = ${incomingDmg} daño`, "enemy-win");
        } else {
          addLog(`👹 ¡${e.name} contraataca! Ataque Rival (${rawDmg}) - Tu DEF (${totalDef}) = ${incomingDmg} daño entrante.`, "damage");
          showCombatBanner("🛡️ ¡CONTRAGOLPE RIVAL!", `Ataque (${rawDmg}) - DEF (${totalDef}) = ${incomingDmg} daño`, "enemy-win");
        }
        await sleep(50);

        // Subfase 1: Absorción por Escudo azul del jugador
        if (gameState.status.playerShield > 0 && incomingDmg > 0) {
          const absorbed = Math.min(gameState.status.playerShield, incomingDmg);
          gameState.status.playerShield -= absorbed;
          incomingDmg -= absorbed;
          setPlayerSpriteState("block");
          spawnFloatingText("player-sprite", `🛡️ -${absorbed} ESCUDO`, "shield");
          addLog(`¡Tu Escudo azul absorbió ${absorbed} de daño! (Quedan ${gameState.status.playerShield} escudo)`, "heal");
          playShieldSound();
          const pShieldWrap = document.getElementById("player-shield-wrapper");
          if (pShieldWrap) {
            pShieldWrap.classList.add("shield-hit");
            setTimeout(() => pShieldWrap.classList.remove("shield-hit"), 400);
          }
          updateHud();
          await sleep(400);
        }

        // Subfase 2: Amuleto de la Suerte (esquiva fortuita)
        if (incomingDmg > 0 && p.accessory === "lucky_charm" && Math.random() < 0.25) {
          incomingDmg = 0;
          setPlayerSpriteState("dodge");
          spawnFloatingText("player-sprite", "¡AMULETO SUERTE!", "shield");
          addLog("Amuleto de la Suerte: Anulaste milagrosamente el golpe rival.", "heal");
          playDodgeSound();
          await sleep(350);
        }

        // Subfase 3: Daño que penetra a los Puntos de Vida (HP)
        if (incomingDmg > 0) {
          const isPlayerCritTaken = enemyHasBJ || incomingDmg >= 15;
          if (isPlayerCritTaken) {
            await applyHitStop(90);
            triggerScreenShake("heavy");
            setPlayerSpriteState("hit_crit");
            spawnFloatingText("player-sprite", `-${incomingDmg} HP ¡CRÍTICO!`, "crit");
          } else if (incomingDmg < 8) {
            setPlayerSpriteState("hit_weak");
            spawnFloatingText("player-sprite", `-${incomingDmg} HP`, "damage-weak");
          } else {
            setPlayerSpriteState("hit_normal");
            spawnFloatingText("player-sprite", `-${incomingDmg} HP`, "damage");
          }

          triggerHaptic("hit_player");
          p.hp = Math.max(0, p.hp - incomingDmg);
          trackRunStat("damageTaken", incomingDmg);
          if (hasArtifact("mirror_shield") && incomingDmg > 0 && gameState.enemy) {
            const refl = Math.max(1, Math.floor(incomingDmg * 0.30));
            gameState.enemy.hp = Math.max(0, gameState.enemy.hp - refl);
            spawnFloatingText("enemy-sprite", "🪞 -" + refl + " REFLEJO", "crit");
            addLog("🪞 Escudo de Espejo: Reflejaste " + refl + " de daño al rival.", "critical");
          }
          if (hasArtifact("thorn_crown") && incomingDmg > 0 && gameState.enemy) {
            gameState.enemy.hp = Math.max(0, gameState.enemy.hp - 5);
            spawnFloatingText("enemy-sprite", "👑 -5 ESPINAS", "damage");
            addLog("👑 Corona de Espinas: El rival sufre 5 de daño punzante.", "damage");
          }
          if (p.accessory === "spiked_belt" && incomingDmg > 0 && gameState.enemy) {
            const beltDmg = 2;
            gameState.enemy.hp = Math.max(0, gameState.enemy.hp - beltDmg);
            spawnFloatingText("enemy-sprite", `👖 -${beltDmg} PÚAS`, "damage");
            addLog(`👖 Cinturón con Púas: Devuelves ${beltDmg} de daño al rival al ser golpeado.`, "damage");
          }
          // FASE 3 (R-02): Represalia Umbría al recibir daño
          if (incomingDmg > 0 && typeof applyEquippedSkinSynergy === "function") {
            applyEquippedSkinSynergy("take_damage", p, e, gameState);
          }
          addLog(`Recibes ${incomingDmg} de daño a tu vida (${p.hp}/${p.maxHp} HP).`, "damage");
          playHitSound();
          const flash = document.getElementById("damage-flash");
          if (flash) {
            flash.className = "red";
            setTimeout(() => { flash.className = ""; }, 250);
          }
          updateHud();
          await sleep(650);
        } else {
          addLog(`¡Tu Escudo protegió tu vida por completo! Vida intacta (${p.hp}/${p.maxHp} HP).`, "heal");
          await sleep(350);
        }

        // Rasgo Duende: Robo de oro
        if (e.trait === "thief" && gameState.gold > 0) {
          await sleep(350);
          const stolen = Math.min(5, gameState.gold);
          gameState.gold -= stolen;
          spawnFloatingText("enemy-sprite", `+${stolen} ORO`, "crit");
          spawnFloatingText("player-sprite", `-${stolen} ORO`, "damage");
          addLog(`¡El Duende Pilluelo te robó ${stolen} de oro!`, "damage");
          updateHud();
          await sleep(650);
        }
      }
    }

    // -------------------------------------------------------------
    // FASE 3: EFECTOS DE ESTADO RESIDUALES
    // -------------------------------------------------------------
    if (gameState.status.enemyPoison > 0 && e.hp > 0) {
      await sleep(400);
      const pDmg = gameState.status.enemyPoison;
      e.hp = Math.max(0, e.hp - pDmg);
      trackRunStat("damageDealt", pDmg);
      spawnFloatingText("enemy-sprite", `☠️ -${pDmg}`, "poison");
      addLog(`Veneno: ${e.name} sufre ${pDmg} de daño residual.`, "damage");
      gameState.status.enemyPoison = Math.max(0, gameState.status.enemyPoison - 1);
      playPoisonSound();
      updateHud();
      await sleep(700);
    }

    if (gameState.status.enemyBurn > 0 && e.hp > 0) {
      await sleep(400);
      const bDmg = gameState.status.enemyBurn;
      e.hp = Math.max(0, e.hp - bDmg);
      trackRunStat("damageDealt", bDmg);
      spawnFloatingText("enemy-sprite", `🔥 -${bDmg}`, "burn");
      addLog(`Llamas arcanas: ${e.name} sufre ${bDmg} de daño por quemadura residual.`, "damage");
      gameState.status.enemyBurn = Math.max(0, gameState.status.enemyBurn - 2);
      playHitSound();
      updateHud();
      await sleep(700);
    }

    if (gameState.status.playerPoison > 0 && p.hp > 0) {
      await sleep(400);
      const pDmg = gameState.status.playerPoison;
      p.hp = Math.max(0, p.hp - pDmg);
      trackRunStat("damageTaken", pDmg);
      spawnFloatingText("player-sprite", `☠️ -${pDmg}`, "poison");
      addLog(`Veneno: Sufres ${pDmg} de daño residual.`, "damage");
      gameState.status.playerPoison = Math.max(0, gameState.status.playerPoison - 1);
      setPlayerSpriteState("hurt");
      playPoisonSound();
      updateHud();
      await sleep(750);
      setPlayerSpriteState("idle");
    }

    // Aliento de fuego dracónico cada 2 manos
    if (e.trait === "dragon" && p.handNumber % 2 === 1 && e.hp > 0 && p.hp > 0) {
      await sleep(450);
      p.hp = Math.max(0, p.hp - 3);
      trackRunStat("damageTaken", 3);
      spawnFloatingText("player-sprite", "🔥 FUEGO -3", "burn");
      addLog("¡El Dragón Ancestral te quema con su llamarada (-3 HP)!", "damage");
      setPlayerSpriteState("hurt");
      playHitSound();
      updateHud();
      await sleep(800);
      setPlayerSpriteState("idle");
    }

    if (clashIcon) clashIcon.classList.remove("clashing");

    updateHud();

    // -------------------------------------------------------------
    // FASE 4: EVALUACIÓN DE MUERTE / PROGRESIÓN
    // -------------------------------------------------------------
    // Muerte del jugador → Rueda de Destino (1 sola vez por partida)
    if (p.hp <= 0) {
      if (hasStarterBlessing("phoenix_grace") && !p.phoenixGraceUsed) {
        p.phoenixGraceUsed = true;
        p.hp = Math.round(p.maxHp * 0.50);
        setPlayerSpriteState("idle");
        spawnFloatingText("player-sprite", "🔥 GRACIA DEL FÉNIX", "crit");
        addLog("🔥 ¡Gracia del Fénix activada! Renaces milagrosamente con el 50% de tu salud.", "critical");
        try { playVictorySound(); } catch (_) {}
        updateHud();
        showNextRoundButton();
        return;
      }
      setPlayerSpriteState("dead");
      if (gameState.revivesUsed < 1) {
        addLog("¡HP agotado! Rueda del Destino: Último Aliento...", "damage");
        await sleep(700);
        showFateWheel("death");
        return;
      } else {
        addLog("💀 Has caído definitivamente en la torre.", "damage");
        await sleep(800);
        showGameOver();
        return;
      }
    }

    // Muerte del rival
    if (e.hp <= 0) {
      setEnemySpriteState("dead");
      // Rasgo Esqueleto: Resurrección
      if (e.trait === "undead" && !gameState.status.enemyRevived) {
        gameState.status.enemyRevived = true;
        e.hp = 15;
        setEnemySpriteState("idle");
        spawnFloatingText("enemy-sprite", "💀 RESURRECCIÓN", "crit");
        addLog("¡El Esqueleto Maldito se recompone de sus huesos (+15 HP)!", "warning");
        updateHud();
        await sleep(2200);
        showBetScreen();
        return;
      }

      // Nigromante devora alma
      if (p.class === "necromancer") {
        p.hp = Math.min(p.maxHp, p.hp + 8);
        spawnFloatingText("player-sprite", "+8 HP ALMA", "heal");
        addLog("Nigromante: Devoraste el alma del enemigo caído (+8 HP).", "heal");
        updateHud();
        await sleep(500);
      }

      // SPRINT 4 — Perk Táctico [Cosecha Oscura]: +8 HP al vencer al rival
      if (p._synergyDarkHarvest) {
        p._synergyDarkHarvest = false;
        p.hp = Math.min(p.maxHp, p.hp + 8);
        spawnFloatingText("player-sprite", "+8 HP COSECHA", "heal");
        addLog("💀 Perk Táctico [Cosecha Oscura]: +8 HP restaurados por dar de baja al rival.", "heal");
        updateHud();
        await sleep(500);
      }

      // Misión de Jack Nigromante: derrotar rivales
      checkHeroUnlockCondition("necromancer", 1, "add");

      await enemyDefeated();
      return;
    }

    // -------------------------------------------------------------
    // FASE 4: PAUSA TÁCTICA Y BOTÓN MANUAL DE SIGUIENTE RONDA
    // -------------------------------------------------------------
    showNextRoundButton();
  }

    
  /* ============================================================
     CONTROL MANUAL DE RONDAS DE COMBATE (UX MEJORADA)
     ============================================================ */
  function showNextRoundButton() {
    const actionGrid = document.getElementById("action-grid");
    const nextRoundCont = document.getElementById("next-round-container");
    const btnNextRound = document.getElementById("btn-next-round");

    if (actionGrid) actionGrid.classList.add("hidden");
    if (nextRoundCont) nextRoundCont.classList.remove("hidden");
    if (btnNextRound) {
      btnNextRound.disabled = false;
      btnNextRound.removeAttribute("disabled");
      const nextHandNum = gameState.player.handNumber + 2;
      if (nextHandNum > TURNS_PER_FLOOR) {
        const suddenRound = nextHandNum - TURNS_PER_FLOOR;
        const suddenMult = 1 + suddenRound;
        btnNextRound.classList.add("sudden-death");
        btnNextRound.innerText = `🔥 ASALTO ${suddenRound} (¡MUERTE SÚBITA x${suddenMult}!)`;
      } else {
        btnNextRound.classList.remove("sudden-death");
        btnNextRound.innerText = `▶ SIGUIENTE RONDA (MANO ${nextHandNum}/${TURNS_PER_FLOOR})`;
      }
    }
  }

  function advanceToNextRound() {
    const btnNextRound = document.getElementById("btn-next-round");
    if (btnNextRound) {
      if (btnNextRound.disabled) return;
      btnNextRound.disabled = true;
    }
    try { playNextRoundSound(); } catch (_) {}
    const actionGrid = document.getElementById("action-grid");
    const nextRoundCont = document.getElementById("next-round-container");
    if (actionGrid) actionGrid.classList.remove("hidden");
    if (nextRoundCont) nextRoundCont.classList.add("hidden");

    const p = gameState.player;
    const e = gameState.enemy;
    p.handNumber++;

    if (p.handNumber >= TURNS_PER_FLOOR) {
      document.body.classList.add("sudden-death-active");
      const suddenRound = p.handNumber - TURNS_PER_FLOOR + 1;
      const suddenMult = 1 + suddenRound;
      try { startSuddenDeathTension(suddenRound); } catch (_) {}
      addLog(`🔥 ¡MUERTE SÚBITA (ASALTO ${suddenRound})! Modo Furia escala a DAÑO x${suddenMult}!`, "critical");
      showCombatBanner(`🔥 ¡MUERTE SÚBITA x${suddenMult}!`, `¡Asalto ${suddenRound}! Daño x${suddenMult} para ambos bandos.`, "enemy-win");
      playHitSound();
      updateHud();
      showBetScreen();
    } else {
      try { stopSuddenDeathTension(); } catch (_) {}
      document.body.classList.remove("sudden-death-active");
      addLog(`Preparando mano ${p.handNumber + 1}/${TURNS_PER_FLOOR}...`, "info");
      showBetScreen();
    }
  }
  window.advanceToNextRound = advanceToNextRound;

  /* ============================================================
     RUEDA DE DESTINO
     ============================================================ */
  let wheelCanvas = null;
  let wheelCtx = null;
  let wheelAnimating = false;
  const WHEEL_CSS_SIZE = 220;

  // Sectores fijos de la rueda de hito (Fase 6: 10 sectores, 8 buffs [80%] / 2 nerfs [20%])
  const WHEEL_OUTCOMES = [
    { type: "buff", label: "+15HP", desc: "+15 HP Máximo y curación completa", short: "+15 HP" },
    { type: "buff", label: "+2PWR", desc: "+2 PWR permanente de ataque (+12% daño)", short: "+2 PWR" },
    { type: "buff", label: "+2DEF", desc: "+2 DEF de armadura permanente", short: "+2 DEF" },
    { type: "buff", label: "+40ORO", desc: "+40 de Oro de la torre acumulado", short: "+40 ORO" },
    { type: "buff", label: "+12ESC", desc: "+12 de Escudo inicial cada piso", short: "+12 ESCUDO" },
    { type: "buff", label: "+1POC", desc: "+1 Poción curativa y +1 Reroll de dados", short: "+1 POCIÓN" },
    { type: "buff", label: "YUNQUE", desc: "Abre 1 Yunque gratis: 3 arquetipos, elige 1", short: "FORJA DE LOTE" },
    { type: "buff", label: "+60EXP", desc: "+60 de EXP permanente para tu Héroe", short: "+60 EXP" },
    { type: "nerf", label: "-6HP", desc: "-6 de HP Máximo", short: "-6 HP" },
    { type: "nerf", label: "-1PWR", desc: "-1 de PWR permanente", short: "-1 PWR" }
  ];

  let wheelCountdownTimer = null;
  let wheelCountdownSeconds = 6;

  function showFateWheel(mode) {
    gameState.phase = "fateWheel";
    gameState.wheelMode = mode;
    const overlay = document.getElementById("screen-fate-wheel");
    const desc = document.getElementById("wheel-desc");
    const result = document.getElementById("wheel-result");
    const btn = document.getElementById("btn-spin-wheel");
    const countdownBox = document.getElementById("wheel-countdown-container");
    const countdownVal = document.getElementById("wheel-countdown-val");

    result.innerText = "";
    result.style.color = "";
    if (wheelCountdownTimer) clearInterval(wheelCountdownTimer);

    // Resetear escenario teatral de la Rueda (actores y rayos)
    const beam = document.getElementById("wheel-beam");
    const kneeling = document.getElementById("wheel-actor-kneeling");
    const tomb = document.getElementById("wheel-actor-tomb");
    if (beam) beam.className = "wheel-light-beam hidden";
    if (kneeling) {
      kneeling.classList.remove("hidden");
      kneeling.classList.add("kneeling-tremble");
    }
    if (tomb) {
      tomb.classList.add("hidden");
      tomb.classList.remove("tomb-drop");
    }

    const isFirstTime = !gameState.revivesUsed || gameState.revivesUsed === 0;

    if (mode === "milestone") {
      desc.innerHTML = `Has eliminado a <b>${gameState.enemy.name}</b> (baja ${gameState.killCount}). La Rueda del Destino gira con fortuna favorable: <b style="color:#2a9d8f;">8 sectores de bendición (80%)</b> y solo <b style="color:#e63946;">2 sectores de castigo (20%)</b>. ¡Aquí no se muere!`;
      if (countdownBox) countdownBox.classList.add("hidden");
      if (btn) {
        btn.innerText = "🎲 GIRAR LA RUEDA (80% BENDICIÓN)";
        btn.onclick = () => spinFateWheel();
      }
    } else {
      // Modo Muerte
      if (isFirstTime) {
        desc.innerHTML = `Tu HP llegó a 0. <b style="color:#7ae582;">⭐ PRIMERA SALVACIÓN: GIRO GRATUITO</b> (~50% de probabilidad de sobrevivir).`;
        if (countdownBox) countdownBox.classList.add("hidden");
        if (btn) {
          btn.innerText = "🎲 GIRAR LA RUEDA (GRATIS)";
          btn.onclick = () => spinFateWheel();
        }
      } else {
        // Segunda oportunidad en adelante: DE PAGO (20 Criptas) + Reloj de retroceso 6s a 0s
        const cryptCoins = getPlayerCryptCoins();
        desc.innerHTML = `Tu HP llegó a 0 nuevamente. <b style="color:#ff758f;">💀 SALVACIÓN EXTRA: PAGO DE 20 CRIPTAS</b> (Tienes ${cryptCoins} 💀). ¡Decide antes de que el reloj llegue a 0!`;
        if (countdownBox) {
          countdownBox.classList.remove("hidden");
          wheelCountdownSeconds = 6;
          if (countdownVal) countdownVal.innerText = "6";
        }
        if (btn) {
          btn.innerText = "💀 GIRAR RUEDA (20 CRIPTAS)";
          btn.onclick = () => {
            if (cryptCoins < 20) {
              showGameToast("No posees suficientes Monedas de Cripta (necesitas 20).", "warn");
              return;
            }
            localStorage.setItem("bj_crypt_coins", String(cryptCoins - 20));
            if (wheelCountdownTimer) clearInterval(wheelCountdownTimer);
            if (countdownBox) countdownBox.classList.add("hidden");
            spinFateWheel();
          };
        }

        // Iniciar reloj en retroceso de 6 a 0
        wheelCountdownTimer = setInterval(() => {
          wheelCountdownSeconds--;
          if (countdownVal) countdownVal.innerText = String(wheelCountdownSeconds);
          if (wheelCountdownSeconds <= 0) {
            clearInterval(wheelCountdownTimer);
            if (countdownBox) countdownBox.classList.add("hidden");
            if (btn) btn.disabled = true;
            if (beam) beam.className = "wheel-light-beam beam-annihilation";
            if (kneeling) kneeling.classList.add("hidden");
            if (tomb) {
              tomb.classList.remove("hidden");
              tomb.classList.add("tomb-drop");
            }
            try { playHitSound(); } catch (_) {}
            triggerHaptic("heavy");
            result.innerHTML = "⚡ <b>¡EL DESTINO NO ESPERA!</b><br><span style='font-size:8.5px;color:#fca5a5;font-style:italic;'>\"Aquí descansa quien dudó ante la Torre del 21. La vacilación es muerte.\"</span>";
            result.style.color = "#e63946";
            setTimeout(() => {
              overlay.classList.add("hidden");
              showGameOver();
            }, 1500);
          }
        }, 1000);
      }
    }

    initWheelCanvas();
    overlay.classList.remove("hidden");
    if (btn) {
      btn.disabled = false;
      btn.style.opacity = "1";
      btn.style.pointerEvents = "auto";
    }
    wheelAnimating = false;
  }

  function initWheelCanvas() {
    const canvas = document.getElementById("wheel-canvas");
    if (!canvas) return;
    wheelCanvas = canvas;
    // Resolución nativa x DevicePixelRatio: sin esto la rueda sale borrosa
    // en pantallas de alta densidad (canvas 220x220 escalado por el navegador).
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const cssSize = 220;
    canvas.width = Math.round(cssSize * dpr);
    canvas.height = Math.round(cssSize * dpr);
    canvas.style.width = cssSize + "px";
    canvas.style.height = cssSize + "px";
    wheelCtx = canvas.getContext("2d");
    wheelCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawWheel(wheelCtx, 0);
  }

  function drawWheel(ctx, rotation) {
    // Siempre en píxeles CSS (el escalado DPR vive en la transformación del contexto)
    const w = WHEEL_CSS_SIZE;
    const h = WHEEL_CSS_SIZE;
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(cx, cy) - 12;

    const milestone = (gameState.wheelMode === "milestone");
    const slices = milestone ? 10 : 8; // 10 sectores en hito (80/20), 8 en salvación de muerte (50/50)
    const survivors = 4;
    const sliceAngle = (2 * Math.PI) / slices;

    ctx.clearRect(0, 0, w, h);

    // 1. Borde dorado exterior decorativo con glow Paper Mario y remaches
    ctx.save();
    ctx.shadowColor = "rgba(255, 209, 102, 0.45)";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 6, 0, Math.PI * 2);
    ctx.fillStyle = "#1e293b";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ffd166";
    ctx.stroke();

    // Remaches dorados con relieve
    const rivetCount = slices * 2;
    for (let k = 0; k < rivetCount; k++) {
      const ang = (k * Math.PI) / (rivetCount / 2);
      const rx = cx + Math.cos(ang) * (r + 3);
      const ry = cy + Math.sin(ang) * (r + 3);
      ctx.beginPath();
      ctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffd166";
      ctx.fill();
      // Brillo especular del remache
      ctx.beginPath();
      ctx.arc(rx - 0.7, ry - 0.7, 0.8, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }
    ctx.restore();

    // Aro decorativo interior tallado
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r - 30, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 209, 102, 0.25)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    // 2. Sectores de la rueda
    for (let i = 0; i < slices; i++) {
      const startAngle = rotation + i * sliceAngle;
      const endAngle = startAngle + sliceAngle;
      const isGoodSlice = milestone ? (i < 8) : (i < survivors);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, endAngle);
      ctx.closePath();

      // Gradiente radial para look de madera / metal bruñido
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
      if (isGoodSlice) {
        grad.addColorStop(0, "#1b4944");
        grad.addColorStop(1, "#2a9d8f");
      } else {
        grad.addColorStop(0, "#4a0e17");
        grad.addColorStop(1, "#9b1d20");
      }
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = "#ffd166";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Etiqueta del sector
      ctx.translate(cx, cy);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = isGoodSlice ? "#66fcf1" : "#ffd166";
      ctx.font = milestone ? "bold 9px 'Fredoka', 'Nunito', sans-serif" : "bold 10px 'Fredoka', 'Nunito', sans-serif";
      ctx.shadowColor = "#000";
      ctx.shadowBlur = 4;
      const label = milestone ? WHEEL_OUTCOMES[i].label : (isGoodSlice ? "VIDA" : "MUERTE");
      ctx.fillText(label, r - 14, 4);
      ctx.restore();
    }

    // 3. Medallón central de oro y gema arcana facetada
    ctx.save();
    ctx.shadowColor = "rgba(255, 209, 102, 0.5)";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(cx, cy, 23, 0, Math.PI * 2);
    ctx.fillStyle = "#0f172a";
    ctx.fill();
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = "#ffd166";
    ctx.stroke();

    // Anillo interior grabado
    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 209, 102, 0.4)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Gema central turquesa facetada
    ctx.beginPath();
    ctx.arc(cx, cy, 13, 0, Math.PI * 2);
    const gemGrad = ctx.createRadialGradient(cx - 3, cy - 3, 2, cx, cy, 13);
    gemGrad.addColorStop(0, "#a5f3fc");
    gemGrad.addColorStop(0.4, "#66fcf1");
    gemGrad.addColorStop(1, "#0e7490");
    ctx.fillStyle = gemGrad;
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#ffd166";
    ctx.stroke();

    // Reflejo blanco de papel recortado en la gema
    ctx.beginPath();
    ctx.arc(cx - 4, cy - 4, 3, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.fill();
    ctx.restore();

    // 4. Puntero / aguja superior dorado con sombra y rubí
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy - r + 5);
    ctx.lineTo(cx - 11, cy - r - 13);
    ctx.lineTo(cx + 11, cy - r - 13);
    ctx.closePath();
    ctx.fillStyle = "#ffd166";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#e63946";
    ctx.stroke();

    // Pequeño rubí en la cabeza del puntero
    ctx.beginPath();
    ctx.arc(cx, cy - r - 8, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = "#e63946";
    ctx.fill();
    ctx.restore();
  }

  async function spinFateWheel() {
    if (wheelAnimating) return;
    wheelAnimating = true;

    const btn = document.getElementById("btn-spin-wheel");
    const result = document.getElementById("wheel-result");
    const beam = document.getElementById("wheel-beam");
    const kneeling = document.getElementById("wheel-actor-kneeling");
    const tomb = document.getElementById("wheel-actor-tomb");

    btn.disabled = true;
    btn.style.opacity = "0.5";
    btn.style.pointerEvents = "none";
    result.innerText = "Girando la rueda...";

    // Animación de giro
    const canvas = document.getElementById("wheel-canvas");
    if (!canvas) { wheelAnimating = false; return; }
    const ctx = canvas.getContext("2d");
    const milestone = (gameState.wheelMode === "milestone");
    const slices = milestone ? 10 : 8;
    const sliceAngle = (2 * Math.PI) / slices;

    let rotation = Math.random() * 2 * Math.PI;
    const extraSpins = 5 + Math.floor(Math.random() * 4); // 5-8 vueltas extra
    const totalRotation = rotation + extraSpins * 2 * Math.PI;
    const steps = 30;
    let currentRotation = rotation;

    for (let step = 0; step <= steps; step++) {
      const t = step / steps;
      // easing: curva de desaceleración
      const eased = 1 - Math.pow(1 - t, 3);
      currentRotation = rotation + (totalRotation - rotation) * eased;
      drawWheel(ctx, currentRotation);
      if (step % 2 === 0) {
        try { playWheelTickSound(); } catch (_) {}
      }
      await sleep(30);
    }

    // Determinar resultado: el slice que queda en la parte superior (ángulo -PI/2)
    const arrowAngle = -Math.PI / 2;
    let normalizedRotation = currentRotation % (2 * Math.PI);
    if (normalizedRotation < 0) normalizedRotation += 2 * Math.PI;

    // Wrap correcto: +4PI garantiza modulo positivo (con +2PI salían indices negativos)
    const rawSlice = (arrowAngle - normalizedRotation + 4 * Math.PI) % (2 * Math.PI);
    const sliceIndex = Math.floor(rawSlice / sliceAngle) % slices;

    if (gameState.wheelMode === "milestone") {
      // ---- HITO 80/20: modificador permanente (no hay muerte) ----
      const outcome = WHEEL_OUTCOMES[sliceIndex];
      const isBuff = outcome.type === "buff";
      if (beam) beam.className = isBuff ? "wheel-light-beam beam-salvation" : "wheel-light-beam beam-annihilation";
      if (kneeling) kneeling.classList.remove("kneeling-tremble");
      result.innerText = `${isBuff ? "🎁" : "💀"} ${outcome.desc}`;
      result.style.color = isBuff ? "#2a9d8f" : "#e63946";
      addLog(`Rueda del Destino (80/20): ${isBuff ? "BENDICIÓN" : "CASTIGO"} — ${outcome.desc}.`, isBuff ? "heal" : "damage");
      applyWheelOutcome(sliceIndex);
      updateHud();
      await sleep(2000);
      document.getElementById("screen-fate-wheel").classList.add("hidden");
      finishFloor(true);
    } else {
      // ---- MUERTE: 4/8 de salvación (1 sola vez por partida) ----
      const survived = sliceIndex < 4;
      if (survived) {
        gameState.revivesUsed++;
        const p = gameState.player;
        const heal = Math.floor(p.maxHp * 0.4);
        p.hp = Math.min(p.maxHp, heal);
        setPlayerSpriteState("idle");
        if (beam) beam.className = "wheel-light-beam beam-salvation";
        if (kneeling) kneeling.classList.remove("kneeling-tremble");
        try { playVictorySound(); } catch (_) {}
        triggerHaptic("blackjack");
        result.innerHTML = `✨ <b>¡RAYO DE SALVACIÓN!</b><br><span style="font-size:9px;color:#cbd5e1;">El Destino te otorga un segundo aliento (+${heal} HP).</span>`;
        result.style.color = "#2a9d8f";
        addLog(`La Rueda del Destino te concedió una segunda oportunidad (+${heal} HP).`, "heal");
        updateHud();
        setTimeout(() => {
          document.getElementById("screen-fate-wheel").classList.add("hidden");
          showBetScreen();
        }, 1500);
      } else {
        if (beam) beam.className = "wheel-light-beam beam-annihilation";
        if (kneeling) kneeling.classList.add("hidden");
        if (tomb) {
          tomb.classList.remove("hidden");
          tomb.classList.add("tomb-drop");
        }
        try { playHitSound(); } catch (_) {}
        triggerHaptic("heavy");
        result.innerHTML = `⚡ <b>¡EL RAYO DEL JUICIO TE HA PULVERIZADO!</b><br><span style="font-size:8.5px;color:#fca5a5;font-style:italic;">"Aquí descansa quien desafió a la Torre del 21. El Destino no concede tregua."</span>`;
        result.style.color = "#e63946";
        addLog("⚡ Rayo del Juicio: La Rueda del Destino dictó tu final. Game Over.", "damage");
        await sleep(1500);
        document.getElementById("screen-fate-wheel").classList.add("hidden");
        showGameOver();
      }
    }

    wheelAnimating = false;
  }

  function applyWheelOutcome(sliceIndex) {
    const p = gameState.player;
    if (sliceIndex === 0) {
      p.maxHp += 15;
      p.hp = p.maxHp;
      spawnFloatingText("player-sprite", "+15 MAX HP", "heal");
    } else if (sliceIndex === 1) {
      p.pwr += 2;
      spawnFloatingText("player-sprite", "+2 PWR", "crit");
    } else if (sliceIndex === 2) {
      p.def += 2;
      spawnFloatingText("player-sprite", "+2 DEF", "shield");
    } else if (sliceIndex === 3) {
      gameState.gold += 40;
      p.rerollsAvailable = (p.rerollsAvailable || 0) + 1;
      spawnFloatingText("player-sprite", "+40 ORO", "heal");
    } else if (sliceIndex === 4) {
      if (!gameState.status) gameState.status = {};
      p.wheelBonusShield = (p.wheelBonusShield || 0) + 12;
      gameState.status.playerShield = (gameState.status.playerShield || 0) + 12;
      spawnFloatingText("player-sprite", "+12 ESCUDO", "shield");
      addLog("🛡️ ¡La Rueda del Destino te otorga +12 de Escudo inicial cada piso!", "heal");
    } else if (sliceIndex === 5) {
      p.potions = (p.potions || 0) + 1;
      p.rerollsAvailable = (p.rerollsAvailable || 0) + 1;
      spawnFloatingText("player-sprite", "+1 POCIÓN", "heal");
    } else if (sliceIndex === 6) {
      // SPRINT 3: Abre 1 Yunque gratis (Forja Arquetípica de Lote)
      setTimeout(() => {
        if (typeof openBoosterPackBySource === "function") {
          openBoosterPackBySource("arcane_group", { free: true, source: "postCombat" });
        }
      }, 500);
    } else if (sliceIndex === 7) {
      addLog("✨ ¡La Rueda del Destino te concede +60 de EXP permanente!", "critical");
      if (typeof gainExp === "function") {
        gainExp(60).catch(() => {});
      }
    } else if (sliceIndex === 8) {
      p.maxHp = Math.max(20, p.maxHp - 6);
      p.hp = Math.min(p.hp, p.maxHp);
      spawnFloatingText("player-sprite", "-6 MAX HP", "damage");
    } else if (sliceIndex === 9) {
      p.pwr = Math.max(0, p.pwr - 1);
      spawnFloatingText("player-sprite", "-1 PWR", "damage");
    }
    saveMidRunState();
  }

  /* ============================================================
     initFloor — Combate por piso contra el rival (Dificultad Escalable)
     ============================================================ */
  function enemyHpFor(t) {
    const diffKey = gameState.diff || (typeof getGameDifficulty === "function" ? getGameDifficulty() : "normal");
    const cfg = (typeof DIFFICULTY_CONFIGS !== "undefined" && DIFFICULTY_CONFIGS[diffKey]) ? DIFFICULTY_CONFIGS[diffKey] : { multHp: 1.0, bonusFloorHp: 4, levelHpMult: 0, legacyMult: 1.0 };
    const p = gameState.player || {};

    const floorHpBonus = (gameState.floor - 1) * (cfg.bonusFloorHp !== undefined ? cfg.bonusFloorHp : 4);
    const levelHpBonus = Math.max(0, ((p.level || 1) - 1)) * (cfg.levelHpMult !== undefined ? cfg.levelHpMult : 0);

    let legacyEnemyMult = 1;
    if (cfg.legacyMult && cfg.legacyMult > 1 && p && p.class && typeof getHeroMeta === "function") {
      const meta = getHeroMeta();
      const hm = meta[p.class];
      if (hm) {
        const spent = (hm.legacyHp || 0) + (hm.legacyPwr || 0) + (hm.legacyDef || 0);
        legacyEnemyMult = 1 + (spent * (cfg.legacyMult - 1));
      }
    }
    return Math.floor((t.hp * (cfg.multHp || 1.0) + floorHpBonus + levelHpBonus) * legacyEnemyMult);
  }
  window.enemyHpFor = enemyHpFor;

  async function initFloor() {
    document.body.classList.remove("sudden-death-active");
    try { updateBattleZoneAtmosphere(gameState.floor); } catch (_) {}
    const p = gameState.player;
    const e = gameState.enemy;

    p.handNumber = 0;
    p.betAmount = 0;

    // Mazo nuevo (barajado) al inicio de cada piso
    rebuildDrawPile();

    // Cada piso genera un rival nuevo escalado a la altura de la torre elegida
    const maxFloors = (typeof getMaxFloorsForDifficulty === "function") ? getMaxFloorsForDifficulty() : 13;
    let enemyIdx;
    if (gameState.floor >= maxFloors) {
      enemyIdx = ENEMIES.length - 1; // BLACK / Rival cumbre
    } else {
      const maxNonBoss = ENEMIES.length - 2;
      const progressRatio = (gameState.floor - 1) / Math.max(1, maxFloors - 1);
      enemyIdx = Math.min(Math.floor(progressRatio * (maxNonBoss + 1)), maxNonBoss);
    }
    const t = ENEMIES[enemyIdx];

    const diffKey = gameState.diff || (typeof getGameDifficulty === "function" ? getGameDifficulty() : "normal");
    const cfg = (typeof DIFFICULTY_CONFIGS !== "undefined" && DIFFICULTY_CONFIGS[diffKey]) ? DIFFICULTY_CONFIGS[diffKey] : { pwrBonusFloorDiv: 4, levelPwrBonus: 0 };

    e.maxHp = enemyHpFor(t);
    e.hp = e.maxHp;

    // Escalamiento dinámico de ataque (PWR) y defensa (DEF) del rival según dificultad
    const floorPwrBonus = Math.floor((gameState.floor - 1) / (cfg.pwrBonusFloorDiv || 4));
    const levelPwrBonus = cfg.levelPwrBonus ? Math.floor(Math.max(0, (p.level || 1) - 1) / 3) * cfg.levelPwrBonus : 0;
    e.pwr = t.pwr + floorPwrBonus + levelPwrBonus;

    const floorDefBonus = Math.floor((gameState.floor - 1) / 4);
    e.def = t.def + floorDefBonus;

    // Escudo rival creciente en pisos avanzados (según dificultad)
    let enemyStartShield = 0;
    if (gameState.floor >= 4) {
      const shieldMult = (diffKey === "normal") ? 2 : (diffKey === "hard" ? 3 : 4);
      enemyStartShield = Math.min(30, (gameState.floor - 3) * shieldMult);
    }

    e.name = t.name;
    e.sprite = t.sprite;
    e.img = t.img;
    e.trait = t.trait;
    e.traitShort = t.traitShort;
    e.traitName = t.traitName;
    registerCodexDiscovery("enemies", t.name);
    gameState.enemyFloor = gameState.floor;
    saveMidRunState();

    // FASE 2.4 — Pacto del Abismo (15% de probabilidad pisos 5-10)
    if (typeof checkAbyssPactEvent === "function" && checkAbyssPactEvent(gameState)) {
      setTimeout(() => { if (typeof showAbyssPactModal === "function") showAbyssPactModal(); }, 800);
    }
    e.enemyHand = [];
    e.enemyScore = 0;
    e.bust = false;
    e.blackjack = false;
    e.stand = false;
    e.enemyRevealed = false;

    // Reset de estados de combate por piso
    const heroCfg = HERO_DATA[p.class] || HERO_DATA.knight;
    const baseHeroShield = heroCfg.startingShield || 0;
    gameState.status.playerShield = baseHeroShield + (p.gem === "sapphire" ? 5 : 0) + (p.wheelBonusShield || 0) + (hasArtifact("guardian_quartz") ? 6 : 0) + (hasArtifact("diamond_aegis") ? 10 : 0) + (hasStarterBlessing("wooden_buckler") ? 5 : 0) + (hasStarterBlessing("steel_mail") ? 8 : 0);
    p.absorbFirstHit = hasStarterBlessing("unyielding_fortress");
    p.riderSpurUsedThisFloor = false;
    if (hasArtifact("bone_die")) p.rerollsAvailable = (p.rerollsAvailable || 0) + 1;
    if (hasArtifact("infinity_ring")) p.rerollsAvailable = (p.rerollsAvailable || 0) + 2;
    if (hasStarterBlessing("keen_eye")) p.rerollsAvailable = (p.rerollsAvailable || 0) + 1;
    if (hasArtifact("eternal_potion") && p.potions <= 0) p.potions = 1;
    if (hasArtifact("easter_bell")) {
      gameState.status.playerPoison = 0;
      gameState.status.playerBurn = 0;
      addLog("🔔 Campana de Pascua: Purificaste todo Veneno y Quemadura.", "heal");
    }
    p.phoenixUsedThisFloor = false;
    gameState.status.enemyShield = enemyStartShield;
    gameState.status.enemyPoison = 0;
    gameState.status.enemyRevived = false;

    document.getElementById("enemy-name-tag").innerText = e.name.toUpperCase();
    const traitTag = document.getElementById("enemy-trait-tag");
    if (traitTag) {
      traitTag.innerText = e.traitShort || (e.traitName ? `★ ${e.traitName.split(' ')[0]}` : "");
      traitTag.title = e.traitName ? `Rasgo: ${e.traitName} (Toca para ver)` : "";
      traitTag.onclick = explainEnemyTrait;
      traitTag.style.cursor = "pointer";
    }

    const sprite = document.getElementById("enemy-sprite");
    if (e.img) {
      sprite.innerHTML = `<img src="${e.img}" class="sprite-img" alt="${e.name}" onerror="this.outerHTML='${e.sprite}'">`;
    } else {
      sprite.innerText = e.sprite;
    }
    sprite.className = "sprite enemy-avatar";

    if (baseHeroShield > 0) {
      addLog(`🛡️ Baluarte de Diamantes: Inicias el piso con ${baseHeroShield} de Escudo protector.`, "heal");
    }

    addLog(`⚠️ ${e.name} te desafía en el Piso ${gameState.floor} [Ataque: ${e.pwr} | DEF: ${e.def} | HP: ${e.maxHp}${enemyStartShield > 0 ? " | 🛡️" + enemyStartShield : ""}]`, "warning");

    // Bonus del zafiro al inicio de piso
    if (p.gem === "sapphire") {
      addLog("Zafiro Guardián: +5 de escudo inicial.", "heal");
    }

    // Bonus del amuleto ámbar
    if (p.accessory === "amber_amulet") {
      p.maxHp += 1;
      p.hp = Math.min(p.maxHp, p.hp + 1);
    }

    // Si piso 5 o 9 y aún no se eligió maldición en este piso:
    if ((gameState.floor === 5 || gameState.floor === 9) && !gameState.curseTakenOnFloor[gameState.floor]) {
      showCurseAltar();
      return;
    }

    renderCards();
    updateHud();
    addLog(`PISO ${gameState.floor}: ¡${e.name} (${e.hp}/${e.maxHp} HP)! Pulsa Iniciar Combate para desafiarlo.`, "info");

    // Modal interactivo de inicio de combate manual (Requerimiento 1)
    showCombatStartPrompt();
  }

  /* ============================================================
     INICIO DE COMBATE MANUAL (REQUERIMIENTO 1)
     ============================================================ */
  function showCombatStartPrompt() {
    const p = gameState.player;
    const e = gameState.enemy;

    const maxFloors = (typeof getMaxFloorsForDifficulty === "function") ? getMaxFloorsForDifficulty() : 13;
    const floorBadge = document.getElementById("cs-floor-badge");
    if (floorBadge) floorBadge.innerText = `🏰 PISO ${gameState.floor} / ${maxFloors}`;

    const pAvatar = document.getElementById("cs-player-avatar");
    if (pAvatar) {
      const hero = HERO_DATA[p.class] || HERO_DATA.knight;
      if (hero && hero.img) {
        pAvatar.innerHTML = `<img src="${hero.img}" class="cs-avatar-img" alt="" onerror="this.outerHTML='<span style=\'font-size:28px;\'>${hero.sprite}</span>'">`;
      } else {
        pAvatar.innerText = p.sprite || "🛡️";
      }
    }

    const pName = document.getElementById("cs-player-name");
    if (pName) pName.innerText = (p.name || "JACK").toUpperCase();

    const pShield = gameState.status ? (gameState.status.playerShield || 0) : 0;
    const pStats = document.getElementById("cs-player-stats");
    if (pStats) pStats.innerHTML = `❤️ ${p.hp}/${p.maxHp} HP &nbsp;|&nbsp; ⚔️ ${p.pwr} PWR &nbsp;|&nbsp; 🛡️ ${p.def} DEF`;

    const pSub = document.getElementById("cs-player-sub");
    if (pSub) pSub.innerText = pShield > 0 ? `🛡️ Escudo: +${pShield}` : `🧪 Pociones: ${p.potions}`;

    const eAvatar = document.getElementById("cs-enemy-avatar");
    if (eAvatar) {
      if (e.img) {
        eAvatar.innerHTML = `<img src="${e.img}" class="cs-avatar-img" alt="" onerror="this.outerHTML='<span style=\'font-size:28px;\'>${e.sprite}</span>'">`;
      } else {
        eAvatar.innerText = e.sprite || "👺";
      }
    }

    const eName = document.getElementById("cs-enemy-name");
    if (eName) eName.innerText = (e.name || "RIVAL").toUpperCase();

    const eStats = document.getElementById("cs-enemy-stats");
    const eShield = gameState.status ? (gameState.status.enemyShield || 0) : 0;
    if (eStats) eStats.innerHTML = `❤️ ${e.hp}/${e.maxHp} HP &nbsp;|&nbsp; ⚔️ ${e.pwr} PWR &nbsp;|&nbsp; 🛡️ ${e.def} DEF`;

    const eTrait = document.getElementById("cs-enemy-trait");
    if (eTrait) {
      const traitTxt = e.traitName || e.traitShort || "Sin rasgo especial";
      eTrait.innerHTML = `<span style="color:#ffd166;">★ ${traitTxt}</span>${eShield > 0 ? ` <span style="color:#48cae4;">[🛡️+${eShield}]</span>` : ""}`;
    }

    const csSub = document.getElementById("cs-sub-text");
    if (csSub) {
      const enemyLoreSnippet = (typeof getEnemyLore === "function" ? getEnemyLore(e.name) : (window.ENEMY_LORE && window.ENEMY_LORE[e.name])) || "";
      if (enemyLoreSnippet) {
        csSub.innerHTML = `<span style="color:#ffd166;font-style:italic;">"${enemyLoreSnippet}"</span>`;
      }
    }

    const screen = document.getElementById("screen-combat-start");
    if (screen) screen.classList.remove("hidden");
    try { playCombatEncounterTerrorSound(); } catch (_) {}
  }
  window.showCombatStartPrompt = showCombatStartPrompt;

  function confirmStartCombat() {
    try { stopIntroMusic(); } catch (_) {}
    try { startCombatMusic(); } catch (_) {}
    try {
      playWeaponClashPushSound();
    } catch (_) {}
    try {
      triggerHaptic("button_click");
    } catch (_) {}
    const screen = document.getElementById("screen-combat-start");
    if (screen) screen.classList.add("hidden");
    showBetScreen();
  }
  window.confirmStartCombat = confirmStartCombat;

  /* ============================================================
     UTILITY
     ============================================================ */
  function sleep(ms) {
    const speed = (typeof gameSpeedMultiplier === "number" && gameSpeedMultiplier > 0) ? gameSpeedMultiplier : 1;
    const scaled = Math.max(0, Math.round(ms / speed));
    if (scaled === 0) return Promise.resolve();
    return new Promise(resolve => {
      let elapsed = 0;
      const step = 40;
      const timer = setInterval(() => {
        if (!window.gamePaused && !gamePaused) {
          elapsed += step;
        }
        if (elapsed >= scaled) {
          clearInterval(timer);
          resolve();
        }
      }, step);
    });
  }
  window.sleep = sleep;

  /* ============================================================
     MINIJUEGO INTRODUCTORIO: LANZAMIENTO DEL HÉROE Y CAZA DE CARTAS
     ============================================================ */
  window.introMinigameGold = 0;

  let introMinigameState = {
    running: false,
    animId: null,
    // Coordenadas del centro de la burbuja del héroe
    x: 0,
    y: 0,
    // Velocidades en px/frame
    vx: 0,
    vy: 0,
    // Radio de colisión del medallón (diámetro 92px -> radio 46px)
    radius: 46,
    // Posición de anclaje (reposo inicial)
    anchorX: 0,
    anchorY: 0,
    // Estados de arrastre
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragHistory: [],
    isFlying: false,
    lastTime: 0,
    initialized: false,
    maxThrows: 5,
    throwsLeft: 5,
    throwCardHits: 0,
    comboStreak: 0
  };

  const requestFrame = (typeof requestAnimationFrame === "function") ? requestAnimationFrame : (fn => setTimeout(fn, 16));
  const cancelFrame = (typeof cancelAnimationFrame === "function") ? cancelAnimationFrame : (id => clearTimeout(id));

  function stopIntroMinigame() {
    if (introMinigameState.animId) {
      cancelFrame(introMinigameState.animId);
      introMinigameState.animId = null;
    }
    introMinigameState.running = false;
  }
  window.stopIntroMinigame = stopIntroMinigame;

  function spawnIntroFloatingGold(x, y, goldVal) {
    const fx = document.getElementById("intro-fx-container");
    if (!fx) return;
    const el = document.createElement("div");
    el.className = "intro-gold-float";
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.textContent = `+${goldVal} ORO`;
    fx.appendChild(el);
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 950);
  }

  function spawnIntroFloatingSkull(x, y, cryptCount) {
    const fx = document.getElementById("intro-fx-container");
    if (!fx) return;
    const el = document.createElement("div");
    el.className = "intro-gold-float";
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.color = "#ffd166";
    el.style.borderColor = "#ffd166";
    el.style.textShadow = "0 0 12px #ff6b6b, 0 0 20px #ffd166";
    el.textContent = `💀 +${cryptCount} CRIPTA${cryptCount > 1 ? 'S' : ''}!`;
    fx.appendChild(el);
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 1400);
  }

  function spawnIntroHitRing(x, y) {
    const fx = document.getElementById("intro-fx-container");
    if (!fx) return;
    const ring = document.createElement("div");
    ring.className = "intro-hit-ring";
    ring.style.left = x + "px";
    ring.style.top = y + "px";
    fx.appendChild(ring);
    setTimeout(() => { if (ring.parentNode) ring.parentNode.removeChild(ring); }, 500);
  }

  function shakeIntroScene() {
    const scene = document.getElementById("intro-scene");
    if (!scene) return;
    scene.classList.remove("intro-shake");
    void scene.offsetWidth;
    scene.classList.add("intro-shake");
    setTimeout(() => scene.classList.remove("intro-shake"), 250);
  }

  function hitIntroCard(cardEl, cardCx, cardCy) {
    // Multiplicador de frenesí x3 activo o 1 base
    const parsedGold = parseInt(cardEl.getAttribute("data-gold") || "1", 10);
    const mult = (window.introFrenzyMultiplier && window.introFrenzyMultiplier > 1) ? window.introFrenzyMultiplier : 1;
    const goldVal = (isNaN(parsedGold) ? 1 : parsedGold) * mult;

    // Sumar oro al acumulador del héroe y persistirlo al saldo real
    window.introMinigameGold = (window.introMinigameGold || 0) + goldVal;
    if (typeof gameState !== "undefined" && gameState) {
      gameState.gold = (gameState.gold || 0) + goldVal;
    }

    // Contar cartas consecutivas atrapadas en el lanzamiento y racha global
    introMinigameState.throwCardHits = (introMinigameState.throwCardHits || 0) + 1;
    introMinigameState.comboStreak = (introMinigameState.comboStreak || 0) + 1;

    // Moneda de Calavera: al atrapar 7 cartas consecutivas en el lanzamiento (o combo de 7), otorga 1 Moneda de Cripta (x3 en Frenesí)
    if (introMinigameState.throwCardHits === 7 || introMinigameState.comboStreak % 7 === 0) {
      const isFrenzy = (window.introFrenzyMultiplier && window.introFrenzyMultiplier > 1);
      const cryptReward = isFrenzy ? 3 : 1;
      if (typeof addPlayerCryptCoins === "function") {
        addPlayerCryptCoins(cryptReward);
      }
      spawnIntroFloatingSkull(cardCx, cardCy - 18, cryptReward);
      try { playWinFanfareSound(); } catch (_) {}
      if (typeof triggerHaptic === "function") triggerHaptic("blackjack");
      if (typeof showGameToast === "function") {
        showGameToast(`💀 ¡BONO 7 CARTAS! +${cryptReward} Cripta${cryptReward > 1 ? 's' : ''}`, "gold");
      }
    }

    // Actualizar HUD con animación
    const goldValEl = document.getElementById("intro-gold-val");
    if (goldValEl) goldValEl.textContent = window.introMinigameGold + " ORO";
    const badge = document.getElementById("intro-gold-badge");
    if (badge) {
      badge.classList.remove("bump");
      void badge.offsetWidth;
      badge.classList.add("bump");
      setTimeout(() => badge.classList.remove("bump"), 250);
    }

    // Efectos sonoros y hápticos
    try { playCoinSound(); } catch (_) {}
    try { triggerHaptic("hit_enemy"); } catch (_) {}

    // Spawn de partículas visuales (+1 ORO) y sacudida suave
    spawnIntroFloatingGold(cardCx, cardCy, goldVal);
    spawnIntroHitRing(cardCx, cardCy);
    shakeIntroScene();

    // Animación de pop y explosión de la carta
    cardEl.classList.add("card-hit-pop");

    // Respawn de la carta tras 1.3 segundos en una nueva posición aleatoria
    setTimeout(() => {
      const randTop = 16 + Math.floor(Math.random() * 46);
      const randLeft = 8 + Math.floor(Math.random() * 74);
      cardEl.style.top = randTop + "%";
      cardEl.style.left = randLeft + "%";
      cardEl.style.right = "auto";
      cardEl.classList.remove("card-hit-pop");
      cardEl.classList.add("card-respawn");
      setTimeout(() => cardEl.classList.remove("card-respawn"), 450);
    }, 1300);
  }

  function initIntroMinigame() {
    const scene = document.getElementById("intro-scene");
    const container = document.getElementById("intro-hero-container");
    const medallion = document.getElementById("intro-hero-medallion");
    const canvas = document.getElementById("intro-slingshot-canvas");
    if (!scene || !container || !medallion || !canvas || !canvas.getContext) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resizeCanvas() {
      const rect = scene.getBoundingClientRect ? scene.getBoundingClientRect() : { width: 400, height: 700 };
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        if (!introMinigameState.isFlying && !introMinigameState.isDragging) {
          introMinigameState.anchorX = rect.width / 2;
          introMinigameState.anchorY = rect.height * 0.72;
          introMinigameState.x = introMinigameState.anchorX;
          introMinigameState.y = introMinigameState.anchorY;
          container.style.left = introMinigameState.x + "px";
          container.style.top = introMinigameState.y + "px";
        }
      }
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const throwsInitEl = document.getElementById("intro-throws-val");
    if (throwsInitEl) {
      throwsInitEl.textContent = `${introMinigameState.throwsLeft}/${introMinigameState.maxThrows}`;
    }

    // Dibujar elástico del tirachinas y trayectoria de vuelo
    function drawSlingshot() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!introMinigameState.isDragging) return;

      const ax = introMinigameState.anchorX;
      const ay = introMinigameState.anchorY;
      const mx = introMinigameState.x;
      const my = introMinigameState.y;

      const pullDx = mx - ax;
      const pullDy = my - ay;
      const pullDist = Math.hypot(pullDx, pullDy);

      // Dibujar goma elástica tensa
      ctx.save();
      ctx.strokeStyle = "rgba(255, 209, 102, 0.85)";
      ctx.lineWidth = Math.max(2, 4 - (pullDist / 120) * 2);
      ctx.shadowColor = "#ffd166";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(ax - 28, ay);
      ctx.lineTo(mx, my);
      ctx.lineTo(ax + 28, ay);
      ctx.stroke();

      // Proyectar puntos de trayectoria en la dirección contraria al arrastre (impulso frontal)
      if (pullDist > 16) {
        const dirX = -pullDx / pullDist;
        const dirY = -pullDy / pullDist;
        const dotSpacing = 28;
        const maxDots = 5;

        for (let i = 1; i <= maxDots; i++) {
          const px = ax + dirX * (i * dotSpacing);
          const py = ay + dirY * (i * dotSpacing);
          const alpha = 0.95 - (i / maxDots) * 0.55;
          const radius = Math.max(2, 4.5 - i * 0.5);

          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(102, 252, 241, ${alpha})`;
          ctx.shadowColor = "#66fcf1";
          ctx.shadowBlur = 10;
          ctx.fill();
        }
      }
      ctx.restore();
    }

    // Manejo de eventos Pointer para soporte unificado táctil y ratón
    let pointerId = null;

    function onPointerDown(e) {
      if (e.target.closest("#intro-start-btn") || e.target.closest("#intro-hint") || e.target.closest("#intro-frenzy-btn")) return;
      if (introMinigameState.throwsLeft <= 0) {
        if (typeof showGameToast === "function") {
          showGameToast("¡Límite de 5 lanzamientos alcanzado! Entra a la Torre.", "info");
        }
        return;
      }
      const sceneRect = scene.getBoundingClientRect();
      const px = e.clientX - sceneRect.left;
      const py = e.clientY - sceneRect.top;

      const dist = Math.hypot(px - introMinigameState.x, py - introMinigameState.y);
      if (dist <= 68) {
        pointerId = e.pointerId;
        introMinigameState.isDragging = true;
        introMinigameState.isFlying = false;
        introMinigameState.vx = 0;
        introMinigameState.vy = 0;

        introMinigameState.anchorX = introMinigameState.x;
        introMinigameState.anchorY = introMinigameState.y;
        introMinigameState.dragStartX = px;
        introMinigameState.dragStartY = py;
        introMinigameState.dragHistory = [{ x: px, y: py, t: performance.now() }];

        medallion.classList.add("aiming");
        medallion.classList.remove("flying");
        container.classList.add("dragging");
        triggerHaptic("selection_change");

        try { scene.setPointerCapture(e.pointerId); } catch (_) {}
      }
    }

    function onPointerMove(e) {
      if (!introMinigameState.isDragging || e.pointerId !== pointerId) return;
      const sceneRect = scene.getBoundingClientRect();
      const px = e.clientX - sceneRect.left;
      const py = e.clientY - sceneRect.top;

      introMinigameState.dragHistory.push({ x: px, y: py, t: performance.now() });
      if (introMinigameState.dragHistory.length > 5) introMinigameState.dragHistory.shift();

      let dx = px - introMinigameState.anchorX;
      let dy = py - introMinigameState.anchorY;
      const dist = Math.hypot(dx, dy);
      const maxPull = 110;

      if (dist > maxPull) {
        dx = (dx / dist) * maxPull;
        dy = (dy / dist) * maxPull;
      }

      introMinigameState.x = introMinigameState.anchorX + dx;
      introMinigameState.y = introMinigameState.anchorY + dy;

      container.style.left = introMinigameState.x + "px";
      container.style.top = introMinigameState.y + "px";

      drawSlingshot();
    }

    function onPointerUp(e) {
      if (!introMinigameState.isDragging || e.pointerId !== pointerId) return;
      introMinigameState.isDragging = false;
      pointerId = null;
      medallion.classList.remove("aiming");
      container.classList.remove("dragging");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pullDx = introMinigameState.x - introMinigameState.anchorX;
      const pullDy = introMinigameState.y - introMinigameState.anchorY;
      const pullDist = Math.hypot(pullDx, pullDy);

      // Evaluar velocidad rápida de flick/swipe
      let flickVx = 0;
      let flickVy = 0;
      const hist = introMinigameState.dragHistory;
      if (hist.length >= 2) {
        const first = hist[0];
        const last = hist[hist.length - 1];
        const dt = Math.max(16, last.t - first.t);
        flickVx = (last.x - first.x) / dt;
        flickVy = (last.y - first.y) / dt;
      }
      const flickSpeed = Math.hypot(flickVx, flickVy);

      // Lanzamiento: Tirachinas si se estiró hacia atrás, o Flick si se deslizó hacia adelante
      if (pullDist > 16) {
        const slingshotPower = 0.28;
        introMinigameState.vx = -pullDx * slingshotPower;
        introMinigameState.vy = -pullDy * slingshotPower;
      } else if (flickSpeed > 0.35) {
        introMinigameState.vx = flickVx * 18;
        introMinigameState.vy = flickVy * 18;
      }

      const launchSpeed = Math.hypot(introMinigameState.vx, introMinigameState.vy);
      if (launchSpeed > 2.2) {
        const maxSpd = 26;
        if (launchSpeed > maxSpd) {
          introMinigameState.vx = (introMinigameState.vx / launchSpeed) * maxSpd;
          introMinigameState.vy = (introMinigameState.vy / launchSpeed) * maxSpd;
        }
        introMinigameState.isFlying = true;
        medallion.classList.add("flying");

        // Descontar exactamente 1 lanzamiento y actualizar contador 5/5
        if (introMinigameState.throwsLeft > 0) {
          introMinigameState.throwsLeft--;
          introMinigameState.throwCardHits = 0; // Reiniciar racha de cartas consecutivas en este lanzamiento
          const throwsEl = document.getElementById("intro-throws-val");
          if (throwsEl) {
            throwsEl.textContent = `${introMinigameState.throwsLeft}/${introMinigameState.maxThrows}`;
          }
          const throwsBadge = document.getElementById("intro-throws-badge");
          if (throwsBadge) {
            throwsBadge.classList.remove("bump");
            void throwsBadge.offsetWidth;
            throwsBadge.classList.add("bump");
            setTimeout(() => throwsBadge.classList.remove("bump"), 250);
          }
        }

        playLaunchSound();
        triggerHaptic("button_click");
      } else {
        introMinigameState.vx = 0;
        introMinigameState.vy = 0;
        introMinigameState.x = introMinigameState.anchorX;
        introMinigameState.y = introMinigameState.anchorY;
        container.style.left = introMinigameState.x + "px";
        container.style.top = introMinigameState.y + "px";
      }
    }

    if (!introMinigameState.initialized) {
      scene.addEventListener("pointerdown", onPointerDown, { passive: true });
      scene.addEventListener("pointermove", onPointerMove, { passive: true });
      scene.addEventListener("pointerup", onPointerUp, { passive: true });
      scene.addEventListener("pointercancel", onPointerUp, { passive: true });
      introMinigameState.initialized = true;
    }

    // Bucle físico en tiempo real (60 FPS)
    introMinigameState.running = true;
    introMinigameState.lastTime = performance.now();

    function physicsLoop(timestamp) {
      if (!introMinigameState.running) return;

      const dt = Math.min(32, timestamp - introMinigameState.lastTime) || 16.6;
      introMinigameState.lastTime = timestamp;
      const timeFactor = dt / 16.67;

      if (introMinigameState.isFlying) {
        introMinigameState.x += introMinigameState.vx * timeFactor;
        introMinigameState.y += introMinigameState.vy * timeFactor;

        // Fricción suave del aire
        const friction = Math.pow(0.991, timeFactor);
        introMinigameState.vx *= friction;
        introMinigameState.vy *= friction;

        const sceneRect = scene.getBoundingClientRect();
        const W = sceneRect.width;
        const H = sceneRect.height;
        const R = introMinigameState.radius;

        // Colisión con paredes laterales
        let bounced = false;
        if (introMinigameState.x - R < 6) {
          introMinigameState.x = 6 + R;
          introMinigameState.vx = Math.abs(introMinigameState.vx) * 0.86;
          bounced = true;
        } else if (introMinigameState.x + R > W - 6) {
          introMinigameState.x = W - 6 - R;
          introMinigameState.vx = -Math.abs(introMinigameState.vx) * 0.86;
          bounced = true;
        }

        // Colisión con límites superior e inferior
        const topLimit = 65;
        const bottomLimit = H - 85;

        if (introMinigameState.y - R < topLimit) {
          introMinigameState.y = topLimit + R;
          introMinigameState.vy = Math.abs(introMinigameState.vy) * 0.86;
          bounced = true;
        } else if (introMinigameState.y + R > bottomLimit) {
          introMinigameState.y = bottomLimit - R;
          introMinigameState.vy = -Math.abs(introMinigameState.vy) * 0.86;
          bounced = true;
        }

        if (bounced) {
          playBounceSound();
          triggerHaptic("selection_change");
        }

        // Detección de colisión con cartas flotantes
        const cards = scene.querySelectorAll(".intro-card-particle:not(.card-hit-pop)");
        for (let i = 0; i < cards.length; i++) {
          const cardEl = cards[i];
          const cardRect = cardEl.getBoundingClientRect();
          const cardCx = cardRect.left + cardRect.width / 2 - sceneRect.left;
          const cardCy = cardRect.top + cardRect.height / 2 - sceneRect.top;

          const dist = Math.hypot(introMinigameState.x - cardCx, introMinigameState.y - cardCy);
          const hitRadius = R + 26;

          if (dist < hitRadius) {
            const nx = (introMinigameState.x - cardCx) / (dist || 1);
            const ny = (introMinigameState.y - cardCy) / (dist || 1);

            const dot = introMinigameState.vx * nx + introMinigameState.vy * ny;
            if (dot < 0) {
              introMinigameState.vx = introMinigameState.vx - 1.85 * dot * nx;
              introMinigameState.vy = introMinigameState.vy - 1.85 * dot * ny;
              const spd = Math.hypot(introMinigameState.vx, introMinigameState.vy);
              if (spd < 7) {
                introMinigameState.vx = nx * 8;
                introMinigameState.vy = ny * 8;
              }
            }

            hitIntroCard(cardEl, cardCx, cardCy);
            break;
          }
        }

        container.style.left = introMinigameState.x + "px";
        container.style.top = introMinigameState.y + "px";

        const currentSpeed = Math.hypot(introMinigameState.vx, introMinigameState.vy);
        if (currentSpeed < 0.25) {
          introMinigameState.isFlying = false;
          introMinigameState.vx = 0;
          introMinigameState.vy = 0;
          medallion.classList.remove("flying");
          introMinigameState.anchorX = introMinigameState.x;
          introMinigameState.anchorY = introMinigameState.y;
        }
      }

      introMinigameState.animId = requestFrame(physicsLoop);
    }

    if (introMinigameState.animId) cancelFrame(introMinigameState.animId);
    introMinigameState.animId = requestFrame(physicsLoop);
  }
  window.initIntroMinigame = initIntroMinigame;

  /* ============================================================
     CINEMÁTICA DE APERTURA Y SALIDA AL MENÚ
     ============================================================ */
  function startFromIntro(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    stopIntroMinigame();

    const intro = document.getElementById("screen-intro");
    const title = document.getElementById("screen-title");
    if (intro) intro.classList.add("hidden");
    if (title) title.classList.remove("hidden");

    // Mostrar el botín ganado en la pantalla de títulos
    const goldBanner = document.getElementById("intro-gold-reward-banner");
    const goldValEl = document.getElementById("title-minigame-gold-val");
    if (goldBanner && goldValEl) {
      if ((window.introMinigameGold || 0) > 0) {
        goldValEl.textContent = window.introMinigameGold;
        goldBanner.classList.remove("hidden");
        if (window._introGoldBannerTimer) clearTimeout(window._introGoldBannerTimer);
        window._introGoldBannerTimer = setTimeout(() => {
          if (goldBanner) goldBanner.classList.add("hidden");
        }, 4000);
      } else {
        goldBanner.classList.add("hidden");
      }
    }
  }
  window.startFromIntro = startFromIntro;

  function dismissIntroGoldBanner(event) {
    if (event) {
      try { event.stopPropagation(); } catch (_) {}
    }
    const goldBanner = document.getElementById("intro-gold-reward-banner");
    if (goldBanner) goldBanner.classList.add("hidden");
    if (window._introGoldBannerTimer) {
      clearTimeout(window._introGoldBannerTimer);
      window._introGoldBannerTimer = null;
    }
  }
  window.dismissIntroGoldBanner = dismissIntroGoldBanner;

  /* ============================================================
     SPLASH SCREEN (BARITA) Y PRÓLOGO TIPO CÓMIC DINÁMICO
     ============================================================ */
  const PROLOGUE_PAGES = [
    {
      id: 1,
      image: "assets/comic_panel_1.jpg",
      act: "ACTO I: EL PACTO DE BLACK",
      title: "EL PACTO DE BLACK",
      text: "«Quien suba los 21 pisos reclamará su alma.»"
    },
    {
      id: 2,
      image: "assets/comic_panel_2.jpg",
      act: "ACTO II: SELLOS ARCANOS",
      title: "DUELO DE SOMBRAS",
      text: "«¡Domina los sellos arcanos o cae en la sombra!»"
    },
    {
      id: 3,
      image: "assets/comic_panel_3.jpg",
      act: "ACTO III: LA CONQUISTA SUPREMA",
      title: "ASCENSIÓN FINAL",
      text: "«¡Desafía la Torre del 21!» Un torbellino de naipes arcanos aguarda."
    }
  ];
  window.PROLOGUE_PAGES = PROLOGUE_PAGES;

  let _splashTimer = null;
  let currentComicPanel = 1;
  const TOTAL_COMIC_PANELS = 3;

  function dismissSplashStudio() {
    if (_splashTimer) {
      clearTimeout(_splashTimer);
      _splashTimer = null;
    }
    const splash = document.getElementById("screen-splash-studio");
    if (!splash) return;
    try { playBaritaChimeSound(); } catch (_) {}
    // Garantizar que screen-intro nunca sea visible entre el splash y el cómic
    const introScreen = document.getElementById("screen-intro");
    if (introScreen) introScreen.classList.add("hidden");
    splash.classList.add("fade-out");
    setTimeout(() => {
      splash.classList.add("hidden");
      try {
        if (typeof ensureAudio === "function") ensureAudio();
        if (audioCtx && audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
      } catch (_) {}

      // El cómic aparece SIEMPRE que se inicie el juego (sin restricción de visto)
      openComicPrologue();
    }, 450);
  }
  window.dismissSplashStudio = dismissSplashStudio;

  function openComicPrologue() {
    const introScreen = document.getElementById("screen-intro");
    if (introScreen) introScreen.classList.add("hidden");
    const comicScreen = document.getElementById("screen-comic-prologue") || document.getElementById("screen-prologue-comic");
    if (!comicScreen) return;
    currentComicPanel = 1;
    renderComicPanel(1);
    comicScreen.classList.remove("hidden");
    try { playComicPageTurnSound(); } catch (_) {}
  }
  window.openComicPrologue = openComicPrologue;

  function renderComicPanel(panelNum) {
    const panels = document.querySelectorAll("#comic-viewport .comic-panel");
    panels.forEach(p => {
      const idx = parseInt(p.getAttribute("data-panel"), 10);
      if (idx === panelNum) {
        p.classList.add("active");
      } else {
        p.classList.remove("active");
      }
    });

    const dots = document.querySelectorAll("#comic-progress-dots .comic-dot");
    dots.forEach((dot, idx) => {
      if (idx + 1 === panelNum) dot.classList.add("active");
      else dot.classList.remove("active");
    });

    const nextBtn = document.getElementById("comic-next-btn");
    if (nextBtn) {
      nextBtn.innerText = (panelNum >= TOTAL_COMIC_PANELS) ? "¡A JUGAR! ⚔️" : "SIGUIENTE ➔";
    }
  }

  function advanceComicPanel() {
    if (currentComicPanel < TOTAL_COMIC_PANELS) {
      currentComicPanel++;
      renderComicPanel(currentComicPanel);
      try { playComicPageTurnSound(); } catch (_) {}
    } else {
      finishComicPrologue();
    }
  }
  window.advanceComicPanel = advanceComicPanel;

  function skipComicPrologue(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    finishComicPrologue();
  }
  window.skipComicPrologue = skipComicPrologue;

  function finishComicPrologue() {
    try {
      localStorage.removeItem("torre21_prologue_seen");
    } catch (_) {}
    const comicScreen = document.getElementById("screen-comic-prologue") || document.getElementById("screen-prologue-comic");
    if (comicScreen) comicScreen.classList.add("hidden");
    const introScreen = document.getElementById("screen-intro");
    if (introScreen) introScreen.classList.remove("hidden");
    try {
      if (typeof initIntroMinigame === "function") initIntroMinigame();
    } catch (_) {}
    try {
      if (typeof playButtonClickSound === "function") playButtonClickSound();
    } catch (_) {}
  }
  window.finishComicPrologue = finishComicPrologue;

  function initIntro() {
    const splash = document.getElementById("screen-splash-studio");
    if (splash && !splash.classList.contains("hidden")) {
      try { playBaritaChimeSound(); } catch (_) {}
      if (_splashTimer) clearTimeout(_splashTimer);
      _splashTimer = setTimeout(() => {
        dismissSplashStudio();
      }, 3500);
    }

    const btn = document.getElementById("intro-start-btn");
    const hint = document.getElementById("intro-hint");

    if (btn) {
      btn.classList.add("visible");
      btn.onclick = function(e) { startFromIntro(e); };
    }

    if (hint) {
      hint.onclick = function(e) { startFromIntro(e); };
    }

    // Inicializar minijuego interactivo
    initIntroMinigame();
  }

  // Exportar funciones interactivas a window para garantizar funcionamiento de todos los onclick en HTML
  window.startFromIntro = startFromIntro;
  window.dismissSplashStudio = dismissSplashStudio;
  window.openComicPrologue = openComicPrologue;
  window.advanceComicPanel = advanceComicPanel;
  window.skipComicPrologue = skipComicPrologue;
  window.finishComicPrologue = finishComicPrologue;
  window.startGame = startGame;
  window.openTutorial = openTutorial;
  window.closeTutorial = closeTutorial;
  window.switchTutorialTab = switchTutorialTab;
  window.showControls = showControls;
  window.closeControls = closeControls;
  window.showConfig = showConfig;
  window.closeConfig = closeConfig;
  window.playerAction = playerAction;
  window.placeBet = placeBet;
  window.spinFateWheel = spinFateWheel;
  window.toggleSound = toggleSound;
  window.openFighterInspect = openFighterInspect;
  window.closeFighterInspect = closeFighterInspect;
  window.chooseLevelUpReward = chooseLevelUpReward;
  window.advanceToNextRound = advanceToNextRound;
  window.updateHeroSelectUI = updateHeroSelectUI;
  const playSwordClashSound = playWeaponClashPushSound;
  window.playSwordClashSound = playSwordClashSound;
  window.hitIntroCard = hitIntroCard;
  window.openBoosterPack = openBoosterPack;
  window.renderBoosterModal = renderBoosterModal;
  window.applySealToCandidate = applySealToCandidate;
  window.closeBoosterPackModal = closeBoosterPackModal;
  window.playPackTearSound = playPackTearSound;
  window.playEnchantChimeSound = playEnchantChimeSound;
  window.playTypewriterClickSound = playTypewriterClickSound;
  window.playVampiricSound = playVampiricSound;
  window.playSteelSound = playSteelSound;
  window.playCoinCascadeSound = playCoinCascadeSound;
  window.SEAL_ENCHANTMENTS = SEAL_ENCHANTMENTS;
  window.drawCard = drawCard;
  window.calculateHandScore = calculateHandScore;
  window.buildStandardDeck = buildStandardDeck;
  window.setDrawPile = function(p) { drawPile = p; };

  /* ============================================================
     GESTOS TÁCTILES MÓVILES (SWIPE CONTROLS)
     ============================================================ */
  function initMobileSwipeGestures() {
    const stage = document.getElementById("stage");
    if (!stage) return;

    let touchStartY = 0;
    let touchStartX = 0;
    let touchStartTime = 0;

    stage.addEventListener("touchstart", (e) => {
      if (e.touches.length !== 1) return;
      if (e.target.closest("button") || e.target.closest(".eq-pill") || e.target.closest(".overlay") || e.target.closest(".btn-close-tut")) return;
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      touchStartTime = Date.now();
    }, { passive: true });

    stage.addEventListener("touchend", (e) => {
      if (e.changedTouches.length !== 1) return;
      if (e.target.closest("button") || e.target.closest(".eq-pill") || e.target.closest(".overlay") || e.target.closest(".btn-close-tut")) return;
      const deltaY = e.changedTouches[0].clientY - touchStartY;
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaTime = Date.now() - touchStartTime;

      if (deltaTime > 450) return;
      if (Math.abs(deltaY) < 36 || Math.abs(deltaY) < Math.abs(deltaX) * 1.15) return;

      const p = gameState.player;
      if (!p || gameState.isRolling || p.bust || p.stand) return;

      // Marcar flag global para prevenir que se abra la inspección táctil tras un gesto
      window.__isSwiping = true;
      setTimeout(() => { window.__isSwiping = false; }, 350);

      // Deslizar hacia arriba -> PEDIR CARTA (HIT)
      if (deltaY < -36) {
        playerAction("hit");
      }
      // Deslizar hacia abajo -> PLANTARSE (STAND)
      else if (deltaY > 36) {
        playerAction("stand");
      }
    }, { passive: true });
  }

  /* ============================================================
     TUTORIAL DE PRIMERA RUN — Modal de bienvenida interactivo
     Se activa solo una vez (primera partida histórica del jugador)
     ============================================================ */
  let _tutorialCallback = null;
  let _tutorialStep = 0;
  const _TUTORIAL_STEPS = [
    {
      icon: "🃏",
      title: "¿Qué es una Mano?",
      body: `Recibes <b>2 cartas</b> al inicio de cada ronda. Su valor se suma:<br><br>
        • Números <b>2–10</b>: valen su número<br>
        • Figuras <b>J, Q, K</b>: valen <b>10 puntos</b><br>
        • <b>As (A)</b>: vale 1 u 11 automáticamente<br><br>
        <div class="tut-demo-hand">
          <div class="tut-demo-card"><span>K</span><span>♠</span><span>10</span></div>
          <div class="tut-demo-card"><span>7</span><span>♥</span><span>7</span></div>
          <div class="tut-demo-total">= 17 pts</div>
        </div>`,
      hint: "Si tu suma supera la del rival, ¡tú atacas!"
    },
    {
      icon: "💥",
      title: "¿Qué es BUST?",
      body: `Si sumas <b>más de 21 puntos</b> al pedir carta, haces <b>BUST</b>.<br><br>
        <div style="color:#ff4d4d;font-size:12px;font-weight:bold;text-align:center;padding:8px 0;">21+ = 💥 BUST = ¡EL RIVAL TE ATACA!</div>
        <br>Cuando hagas BUST, el rival te golpea con su poder total.<br>
        Con <b>DEF alta</b> puedes absorber el golpe. Con DEF baja, duele mucho.<br><br>
        <div class="tut-tip-box">💡 Si tienes 17–18 puntos, considera <b>Plantarte</b> antes de arriesgar un BUST.</div>`,
      hint: "¡El BUST es la forma más común de morir en los primeros pisos!"
    },
    {
      icon: "⚔️",
      title: "Apuesta y Combate",
      body: `Al inicio de cada mano puedes <b>apostar HP</b>:<br><br>
        <div class="tut-bet-row">
          <div class="tut-bet-card low">0 HP<div>Sin riesgo</div></div>
          <div class="tut-bet-card mid">5 HP<div>Arriesgado</div></div>
          <div class="tut-bet-card high">10-25 HP<div>Alto riesgo</div></div>
        </div>
        <br>🔴 Si <b>pierdes</b> la mano → el rival te ataca con su poder + tu apuesta<br>
        🟢 Si <b>ganas</b> la mano → tú atacas con tu poder + tu apuesta<br><br>
        <div class="tut-tip-box">💡 Más apuesta = más daño SI ganas. Pero también más dolor si pierdes.</div>`,
      hint: "La apuesta es el corazón del combate — controla el riesgo."
    },
    {
      icon: "✨",
      title: "Sellos y Artefactos",
      body: `Tu aventura tiene dos capas de poder:<br><br>
        <b>🔮 Sellos Arcanos</b> — Se graban en cartas de tu baraja.<br>
        Toca una carta durante el combate para ver su sello y efecto.<br><br>
        <b>🎴 Artefactos</b> — Se compran en la Tienda entre pisos.<br>
        Dan bonificaciones pasivas permanentes para toda la run.<br><br>
        <b>✨ Bendición de Inicio</b> — Al comenzar cada partida eliges<br>
        1 de 3 bendiciones especiales que te acompañarán todo el ascenso.<br><br>
        <div class="tut-tip-box">💡 Tu progreso de <b>Maestría</b> se guarda siempre. ¡Cada run te hace más fuerte!</div>`,
      hint: "¡Ya estás listo para conquistar la Torre!"
    }
  ];

  function showFirstRunTutorial(callback) {
    _tutorialCallback = callback;
    _tutorialStep = 0;
    _renderTutorialStep();
    const modal = document.getElementById("screen-first-run-tutorial");
    if (modal) modal.classList.remove("hidden");
  }
  window.showFirstRunTutorial = showFirstRunTutorial;

  function _renderTutorialStep() {
    const step = _TUTORIAL_STEPS[_tutorialStep];
    if (!step) return;
    const total = _TUTORIAL_STEPS.length;
    const modal = document.getElementById("screen-first-run-tutorial");
    if (!modal) return;

    const iconEl    = modal.querySelector(".frt-icon");
    const titleEl   = modal.querySelector(".frt-title");
    const bodyEl    = modal.querySelector(".frt-body");
    const hintEl    = modal.querySelector(".frt-hint");
    const dotsEl    = modal.querySelector(".frt-dots");
    const nextBtn   = modal.querySelector(".frt-btn-next");
    const skipBtn   = modal.querySelector(".frt-btn-skip");

    if (iconEl)  iconEl.textContent  = step.icon;
    if (titleEl) titleEl.textContent = step.title;
    if (bodyEl)  bodyEl.innerHTML    = step.body;
    if (hintEl)  hintEl.textContent  = step.hint;

    // Dots de progreso
    if (dotsEl) {
      dotsEl.innerHTML = _TUTORIAL_STEPS.map((_, i) =>
        `<span class="frt-dot${i === _tutorialStep ? " active" : ""}"></span>`
      ).join("");
    }

    // Botón siguiente / finalizar
    if (nextBtn) {
      const isLast = _tutorialStep >= total - 1;
      nextBtn.textContent = isLast ? "🚀 ¡A CONQUISTAR LA TORRE!" : `SIGUIENTE (${_tutorialStep + 1}/${total}) ▶`;
      nextBtn.onclick = isLast ? _closeTutorialAndContinue : _nextTutorialStep;
    }
    if (skipBtn) {
      skipBtn.onclick = _closeTutorialAndContinue;
    }
  }

  function _nextTutorialStep() {
    if (_tutorialStep < _TUTORIAL_STEPS.length - 1) {
      _tutorialStep++;
      _renderTutorialStep();
    }
  }
  window._nextTutorialStep = _nextTutorialStep;

  function _closeTutorialAndContinue() {
    localStorage.setItem("blackjack_tutorial_done_v1", "true");
    const modal = document.getElementById("screen-first-run-tutorial");
    if (modal) modal.classList.add("hidden");
    if (typeof _tutorialCallback === "function") {
      _tutorialCallback();
      _tutorialCallback = null;
    }
  }
  window._closeTutorialAndContinue = _closeTutorialAndContinue;

  /* ============================================================
     INIT
     ============================================================ */
  try {
    updateHud();
    updateHeroSelectUI();
  } catch (err) {
    console.error("Error in init:", err);
  }
  initIntro();
  initMobileSwipeGestures();

  /* ============================================================
     EVENTOS DE CICLO DE VIDA MÓVIL (ANTI-INTERRUPCIONES)
     ============================================================ */
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      saveMidRunState();
      // Ahorro de batería: al pasar a segundo plano se suspende todo el audio
      // (música procedural por setInterval y SFX) y se reanuda al volver.
      try { if (audioCtx && audioCtx.state === "running") audioCtx.suspend().catch(() => {}); } catch (_) {}
    } else {
      try {
        if (audioCtx && gameState.audioEnabled && audioCtx.state === "suspended") {
          audioCtx.resume().catch(() => {});
        }
      } catch (_) {}
    }
  });

  window.addEventListener("pagehide", () => {
    saveMidRunState();
  });

  /* ============================================================
     SISTEMA DE PESTAÑAS DEL MENÚ PRINCIPAL Y CÓDIGO PROMOCIONAL
     ============================================================ */
  function switchTitleTab(tab) {
    try { playButtonClickSound(); } catch (_) {}
    const tabs = ["play", "pvp", "lore", "shop", "config"];
    tabs.forEach(t => {
      const btn = document.getElementById(`btn-tab-${t}`);
      const pane = document.getElementById(`title-pane-${t}`);
      if (btn) {
        if (t === tab) btn.classList.add("active");
        else btn.classList.remove("active");
      }
      if (pane) {
        if (t === tab) pane.classList.add("active");
        else pane.classList.remove("active");
      }
    });
    if (tab === "lore") {
      try { renderLoreGrimoire(); } catch (_) {}
    }
  }
  window.switchTitleTab = switchTitleTab;

  /* ============================================================
     TESORO REAL: perks premium (desbloqueables por compra o código)
     ============================================================ */
  var ROYAL_PERKS = {
    starter: { icon: "⚡", name: "Pack del Heredero", price: "$0.99 USD", color: "#f4a261",
      desc: "+50 Oro y +3 Pociones al iniciar CADA run. 2x EXP en tu primera run con el pack." },
    exp_boost: { icon: "📖", name: "Tomo del Maestro", price: "$1.99 USD", color: "#ffd166",
      desc: "EXP de Maestría x1.5 permanente para todos los Jacks en todas las runs." },
    hero_bundle: { icon: "👑", name: "Bundle de los 4 Jacks", price: "$2.99 USD", color: "#c77dff",
      desc: "Desbloquea para siempre a los 4 héroes jugables de la Torre." }
  };
  window.ROYAL_PERKS = ROYAL_PERKS;

  function getRoyalPerks() {
    try { return JSON.parse(localStorage.getItem("blackjack_royal_perks") || "{}") || {}; } catch (_) { return {}; }
  }

  const ROYAL_PERK_IDS = ["starter", "exp_boost", "hero_bundle"];
  const ROYAL_VIP_LEGACY_KEY = "blackjack_vip_unlocked";

  /* ------------------------------------------------------------------
     Migración de la clave VIP legada (blackjack_vip_unlocked).

     Esa clave era un interruptor PERMANENTE que hacía que
     isRoyalPerkOwned() devolviera true para todo el Tesoro Real sin
     pasar por Google Play Store. Aquí se consume UNA sola vez:
       1) se borra la clave,
       2) se convierten los 3 perks en datos reales de
          blackjack_royal_perks,
       3) se desbloquean los 4 héroes (lo que promete el Bundle).
     Después, isRoyalPerkOwned() solo mira los perks reales.

     PARA REACTIVAR UNA PROMOCIÓN EN EL FUTURO: añade la condición
     AQUÍ (una vez, con migración como esta) y NO reintroduzcas un
     switch permanente dentro de isRoyalPerkOwned().
     ------------------------------------------------------------------ */
  function migrateLegacyRoyalVip() {
    let legacy = false;
    try { legacy = localStorage.getItem(ROYAL_VIP_LEGACY_KEY) === "true"; } catch (_) {}
    try { localStorage.removeItem(ROYAL_VIP_LEGACY_KEY); } catch (_) {}
    if (!legacy) return;
    try {
      const perks = getRoyalPerks();
      ROYAL_PERK_IDS.forEach(id => { perks[id] = true; });
      localStorage.setItem("blackjack_royal_perks", JSON.stringify(perks));
      const unlocks = getHeroUnlocks();
      Object.keys(unlocks).forEach(k => {
        unlocks[k].unlocked = true;
        unlocks[k].progress = unlocks[k].target;
      });
      saveHeroUnlocks(unlocks);
      if (typeof console !== "undefined") console.info("[royal] Promoción VIP legada migrada a perks reales.");
    } catch (e) {
      if (typeof console !== "undefined") console.warn("[royal] Migración VIP fallida:", e);
    }
  }
  migrateLegacyRoyalVip();

  function isRoyalPerkOwned(id) {
    return !!getRoyalPerks()[id];
  }
  window.isRoyalPerkOwned = isRoyalPerkOwned;

  function grantRoyalPerk(id) {
    const perks = getRoyalPerks();
    perks[id] = true;
    try { localStorage.setItem("blackjack_royal_perks", JSON.stringify(perks)); } catch (_) {}
    if (id === "hero_bundle" && typeof getHeroUnlocks === "function") {
      try {
        const u = getHeroUnlocks();
        Object.keys(u).forEach(k => { u[k].unlocked = true; });
        if (typeof saveHeroUnlocks === "function") saveHeroUnlocks(u);
        else localStorage.setItem("blackjack_hero_unlocks_v1", JSON.stringify(u));
        if (typeof renderHeroBook === "function") renderHeroBook();
      } catch (_) {}
    }
  }
  window.grantRoyalPerk = grantRoyalPerk;

  function _iapBuyHtml(id) {
    const price = (typeof getBillingPrice === "function") ? getBillingPrice(id) : null;
    const available = (typeof isBillingAvailable === "function") && isBillingAvailable();
    if (!available || !price) {
      return `<div class="royal-iap-soon">Esta mejora todavía no está disponible.<br>La compra real se habilitará en una futura actualización.</div>`;
    }
    return `
      <div class="royal-iap-price">${price}</div>
      <button class="royal-iap-buy" onclick="purchaseRoyalPerk('${id}')">COMPRAR AHORA</button>
      <div class="royal-iap-note">Pago gestionado por Google Play. El contenido se activa al confirmar la compra.</div>`;
  }

  function showIAPModal(id) {
    const perk = ROYAL_PERKS[id] || ROYAL_PERKS.starter;
    const owned = isRoyalPerkOwned(id);
    let modal = document.getElementById("modal-royal-iap");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "modal-royal-iap";
      modal.className = "royal-iap-overlay";
      document.body.appendChild(modal);
    }
    modal.innerHTML = `
      <div class="royal-iap-card" style="--perk-color:${perk.color};">
        <div class="royal-iap-crown">👑 TESORO REAL 👑</div>
        <div class="royal-iap-icon">${perk.icon}</div>
        <div class="royal-iap-title">${perk.name.toUpperCase()}</div>
        <div class="royal-iap-desc">${perk.desc}</div>
        ${owned
          ? `<div class="royal-iap-owned">✔ ACTIVO EN TU CUENTA</div>`
          : _iapBuyHtml(id)}
        <button class="royal-iap-close" onclick="closeIAPModal()">CERRAR</button>
      </div>`;
    modal.classList.remove("hidden");
    try { playCardDealSound(); } catch (_) {}
  }
  window.showIAPModal = showIAPModal;

  function closeIAPModal() {
    const modal = document.getElementById("modal-royal-iap");
    if (modal) modal.classList.add("hidden");
  }
  window.closeIAPModal = closeIAPModal;

  /* ============================================================
     GLOSARIO TÁCTIL PARA NOVATOS: toca cualquier [data-term]
     ============================================================ */
  var GLOSSARY = {
    hp: { icon: "❤️", title: "HP (Puntos de Vida)", text: "Tu vida. Si llega a 0, la run termina. Se recupera con pociones, descansos y algunos objetos." },
    pwr: { icon: "⚔️", title: "PWR (Poder)", text: "Daño extra que sumas a cada golpe. Cuanto más alto, más rápido derrotas a los rivales." },
    def: { icon: "🛡️", title: "DEF (Defensa)", text: "Resta daño a cada golpe que recibes. Con 3 de DEF, un golpe de 10 te hace solo 7." },
    shield: { icon: "🔷", title: "Escudo", text: "Vida temporal que se gasta antes que tu HP. Desaparece al terminar el combate." },
    exp: { icon: "✨", title: "EXP (Experiencia)", text: "Se gana al vencer rivales. Al llenar la barra subes de nivel y mejoras tus stats durante esta run." },
    level: { icon: "📈", title: "Nivel", text: "Nivel de tu héroe en la run actual. Cada nivel da mejoras y desbloquea ranuras de artefactos. Se reinicia al morir." },
    mastery: { icon: "⭐", title: "Maestría", text: "Progreso PERMANENTE de cada Jack. Aunque mueras, la EXP acumulada sube su Maestría y empiezas más fuerte la próxima vez." },
    passive: { icon: "📜", title: "Habilidad pasiva", text: "Efecto automático y siempre activo de tu héroe. No tienes que activarlo." },
    blackjack: { icon: "🃏", title: "Blackjack / 21", text: "El objetivo: que tus cartas sumen 21 o lo más cerca posible SIN pasarte. Un 21 exacto con 2 cartas hace daño crítico." },
    hit: { icon: "🂠", title: "Pedir carta", text: "Toma una carta más para acercarte a 21. Cuidado: si pasas de 21, haces BUST." },
    stand: { icon: "✋", title: "Plantarse", text: "Te quedas con tu mano actual. Luego juega el rival y gana quien esté más cerca de 21." },
    bust: { icon: "💥", title: "Bust (Pasarse)", text: "Si tus cartas suman más de 21, pierdes la mano automáticamente y recibes el golpe del rival." },
    ace: { icon: "🅰️", title: "As", text: "Vale 11 o 1, lo que más te convenga. Ideal para llegar a 21 sin pasarte." },
    face: { icon: "👑", title: "Figuras (J, Q, K)", text: "Todas valen 10. Un As + una figura = Blackjack." },
    blessing: { icon: "🔮", title: "Bendición", text: "Poder pasivo que eliges al empezar la run (1 de 3 opciones). Dura toda la partida." },
    curse: { icon: "💀", title: "Maldición", text: "Penalización que aceptas a cambio de una gran recompensa. Dura hasta que termina la run." },
    artifact: { icon: "🎴", title: "Artefacto", text: "Reliquia con un poder permanente durante la run. Tienes ranuras limitadas que se desbloquean subiendo de nivel." },
    accessory: { icon: "💍", title: "Accesorio", text: "1 ranura extra para un amuleto o pieza de equipo (casco, cinturón, guante). Se consiguen en el Bazar o en eventos." },
    seal: { icon: "🔏", title: "Sello Arcano", text: "Encantamiento que se graba en una carta de tu baraja. Cada vez que te salga esa carta, su efecto se activa." },
    reroll: { icon: "🎲", title: "Reroll", text: "Permite volver a sortear las opciones (recompensas o tienda) para buscar algo mejor." },
    potion: { icon: "🧪", title: "Poción", text: "Úsala en combate para recuperar HP. Son limitadas: guárdalas para cuando estés en peligro." },
    gold: { icon: "🪙", title: "Oro", text: "Moneda de la run. Se gasta en el Bazar y se pierde al morir." },
    crypt: { icon: "💠", title: "Monedas de Cripta", text: "Moneda PERMANENTE. Se conserva entre runs y sirve para desbloqueos duraderos." }
  };
  window.GLOSSARY = GLOSSARY;

  function showGlossaryTip(term, anchorEl) {
    const g = GLOSSARY[term];
    if (!g) return;
    let tip = document.getElementById("glossary-tip");
    if (!tip) {
      tip = document.createElement("div");
      tip.id = "glossary-tip";
      tip.className = "glossary-tip";
      document.body.appendChild(tip);
    }
    tip.innerHTML = `
      <div class="glossary-tip-head"><span class="glossary-tip-icon">${g.icon}</span>${g.title}</div>
      <div class="glossary-tip-text">${g.text}</div>
      <div class="glossary-tip-foot">Toca en cualquier lugar para cerrar</div>`;
    tip.classList.remove("show");
    tip.style.visibility = "hidden";
    tip.style.display = "block";
    const r = anchorEl.getBoundingClientRect();
    const tw = tip.offsetWidth, th = tip.offsetHeight;
    const vw = window.innerWidth, vh = window.innerHeight;
    let left = Math.min(Math.max(8, r.left + r.width / 2 - tw / 2), vw - tw - 8);
    let top = r.top - th - 10;
    if (top < 8) top = Math.min(r.bottom + 10, vh - th - 8);
    tip.style.left = left + "px";
    tip.style.top = top + "px";
    tip.style.visibility = "visible";
    requestAnimationFrame(() => tip.classList.add("show"));
    try { playCardDealSound(); } catch (_) {}
  }
  window.showGlossaryTip = showGlossaryTip;

  function hideGlossaryTip() {
    const tip = document.getElementById("glossary-tip");
    if (tip) { tip.classList.remove("show"); tip.style.display = "none"; }
  }
  window.hideGlossaryTip = hideGlossaryTip;

  if (typeof document !== "undefined" && document.addEventListener) {
    document.addEventListener("click", (ev) => {
      const target = ev.target && ev.target.closest ? ev.target.closest("[data-term]") : null;
      const tip = document.getElementById("glossary-tip");
      const tipOpen = tip && tip.style.display === "block";
      if (target) {
        ev.stopPropagation();
        ev.preventDefault();
        showGlossaryTip(target.getAttribute("data-term"), target);
      } else if (tipOpen) {
        hideGlossaryTip();
      }
    }, true);
  }

  /* ============================================================
     PREDICTOR TÁCTICO DE COMBATE Y BARRAS FANTASMA (GHOST HP)
     ============================================================ */
  function updateTacticalDamagePredictor() {
    const p = gameState.player;
    const e = gameState.enemy;
    const enemyGhost = document.getElementById("enemy-hp-ghost-bar");
    const playerGhost = document.getElementById("player-hp-ghost-bar");
    if (!p || !e) return;

    if (!p.playerHand || p.playerHand.length === 0) {
      if (enemyGhost) { enemyGhost.style.width = "0%"; enemyGhost.classList.remove("active"); }
      if (playerGhost) { playerGhost.style.width = "0%"; playerGhost.classList.remove("active"); }
      return;
    }

    // 1. Calcular Daño proyectado al Rival si gana el jugador
    const lvlMult = 1 + ((p.level || 1) - 1) * 0.12;
    const rawPlayerStrike = (p.pwr + (p.betAmount || 0) + (p.cardBonusDamage || 0));
    const effectiveEnemyDef = (typeof hasStarterBlessing === "function" && hasStarterBlessing("shadow_lord") && p.playerScore >= 19) ? 0 : (e.def || 0);
    const estPlayerDmg = Math.max(1, Math.round(rawPlayerStrike * lvlMult) - effectiveEnemyDef);

    // 2. Calcular Daño proyectado al Jugador si gana el rival o el jugador bustea
    const rawEnemyStrike = (e.pwr + (p.betAmount || 0));
    const totalDef = p.def + (p.duplaDef || 0) + (p.turnShieldBonus || 0) + (p._synergyBonusDef || 0);
    const estEnemyDmg = Math.max(1, rawEnemyStrike - totalDef);

    if (p.bust) {
      if (enemyGhost) { enemyGhost.style.width = "0%"; enemyGhost.classList.remove("active"); }
      if (playerGhost) {
        const ghostPct = Math.min((estEnemyDmg / p.maxHp) * 100, (p.hp / p.maxHp) * 100);
        const curHpPct = (p.hp / p.maxHp) * 100;
        playerGhost.style.width = `${ghostPct}%`;
        playerGhost.style.left = `${Math.max(0, curHpPct - ghostPct)}%`;
        playerGhost.classList.add("active");
      }
    } else {
      if (enemyGhost) {
        const ghostPct = Math.min((estPlayerDmg / e.maxHp) * 100, (e.hp / e.maxHp) * 100);
        const curHpPct = (e.hp / e.maxHp) * 100;
        enemyGhost.style.width = `${ghostPct}%`;
        enemyGhost.style.left = `${Math.max(0, curHpPct - ghostPct)}%`;
        enemyGhost.classList.add("active");
      }
      if (playerGhost) {
        const ghostPct = Math.min((estEnemyDmg / p.maxHp) * 100, (p.hp / p.maxHp) * 100);
        const curHpPct = (p.hp / p.maxHp) * 100;
        playerGhost.style.width = `${ghostPct}%`;
        playerGhost.style.left = `${Math.max(0, curHpPct - ghostPct)}%`;
        playerGhost.classList.add("active");
      }
    }
  }
  window.updateTacticalDamagePredictor = updateTacticalDamagePredictor;

  /* ============================================================
     PERSISTENCIA DE SELLOS Y CARTAS ADICIONALES DE BARAJA
     ============================================================ */
  const PERSISTENT_SEALS_KEY = "blackjack_persistent_deck_seals";
  const PERSISTENT_EXTRA_CARDS_KEY = "blackjack_persistent_extra_cards";

  function getPersistentDeckSeals() {
    try {
      return JSON.parse(localStorage.getItem(PERSISTENT_SEALS_KEY) || "{}") || {};
    } catch (_) { return {}; }
  }
  window.getPersistentDeckSeals = getPersistentDeckSeals;

  function savePersistentDeckSeal(cid, seal) {
    const seals = getPersistentDeckSeals();
    seals[cid] = Object.assign({}, seal);
    try {
      localStorage.setItem(PERSISTENT_SEALS_KEY, JSON.stringify(seals));
    } catch (_) {}
  }
  window.savePersistentDeckSeal = savePersistentDeckSeal;

  function getPersistentExtraCards() {
    try {
      const arr = JSON.parse(localStorage.getItem(PERSISTENT_EXTRA_CARDS_KEY) || "[]");
      return Array.isArray(arr) ? arr : [];
    } catch (_) { return []; }
  }
  window.getPersistentExtraCards = getPersistentExtraCards;

  const MAX_PERSISTENT_EXTRA_CARDS = 12;
  window.MAX_PERSISTENT_EXTRA_CARDS = MAX_PERSISTENT_EXTRA_CARDS;

  function savePersistentExtraCard(card) {
    if (!card) return;
    savePersistentExtraCards([card]);
  }
  window.savePersistentExtraCard = savePersistentExtraCard;

  function savePersistentExtraCards(cards) {
    const list = getPersistentExtraCards();
    if (Array.isArray(cards)) {
      cards.forEach(c => {
        if (!c) return;
        const cSpecialId = c.specialId || c.id || null;
        const existingIdx = list.findIndex(existing => {
          if (cSpecialId && (existing.specialId === cSpecialId || existing.id === cSpecialId)) return true;
          return existing.rank === c.rank && existing.suit === c.suit;
        });
        const cardObj = {
          rank: c.rank,
          suit: c.suit,
          value: c.value,
          isAce: !!c.isAce,
          isWonCard: true,
          specialId: cSpecialId,
          slot: c.slot || null,
          rarity: c.rarity || null,
          cardType: c.cardType || (c.fusion || c.dynamicValues || c.abilityAction ? "ability" : (c.enchantment || c.operator || c.sealEffect ? "seal" : "standard")),
          sealTheme: c.sealTheme || (c.badgeClass === "mult" ? "crimson" : (c.rarity === "legendary" ? "gold" : (c.badgeClass === "fusion" ? "emerald" : "arcane"))),
          sealEffect: c.sealEffect || null,
          abilityAction: c.abilityAction || null,
          source: c.source || "tower_completion",
          fusion: c.fusion || null,
          modifier: c.modifier || null,
          operator: c.operator || null,
          dynamicValues: Array.isArray(c.dynamicValues) ? c.dynamicValues : null,
          name: c.name || `${c.rank}${c.suit}`,
          desc: c.desc || "",
          icon: c.icon || "🃏",
          badgeText: c.badgeText || "",
          badgeClass: c.badgeClass || ""
        };
        if (existingIdx !== -1) {
          list[existingIdx] = cardObj;
        } else if (list.length < MAX_PERSISTENT_EXTRA_CARDS) {
          list.push(cardObj);
        }
      });
    }
    try {
      localStorage.setItem(PERSISTENT_EXTRA_CARDS_KEY, JSON.stringify(list));
    } catch (_) {}
  }
  window.savePersistentExtraCards = savePersistentExtraCards;

  function clearPersistentExtraCards() {
    try {
      localStorage.removeItem(PERSISTENT_EXTRA_CARDS_KEY);
    } catch (_) {}
  }
  window.clearPersistentExtraCards = clearPersistentExtraCards;

  let activeMasteryCandidates = [];
  let onMasteryForgeComplete = null;
  let isTowerVictoryForge = false;

  function showMasteryForgeModal(onComplete = null, isTowerVictory = false) {
    onMasteryForgeComplete = onComplete;
    isTowerVictoryForge = !!isTowerVictory;
    const modal = document.getElementById("screen-mastery-forge-modal");
    const grid = document.getElementById("mf-candidates-grid");
    if (!modal || !grid) return;

    // Resetear textos y elementos a estado de forja de sello
    const crownEl = document.getElementById("mf-crown");
    if (crownEl) crownEl.innerText = "👑 RECOMPENSA DE MAESTRÍA ANCESTRAL";
    const titleEl = document.getElementById("mf-title");
    if (titleEl) titleEl.innerText = "FORJA DE NAIPE PERMANENTE";
    const descEl = document.getElementById("mf-desc");
    if (descEl) descEl.innerHTML = "Tu héroe ha alcanzado un nuevo dominio de la Torre. Elige <b>1 de 3 cartas</b> para sellarla para siempre en tu baraja histórica:";
    const hintEl = document.getElementById("mf-hint");
    if (hintEl) hintEl.innerText = "✨ Este naipe conservará su Sello Arcano en todas tus futuras runs y en la Arena.";
    const actionCont = document.getElementById("mf-action-container");
    if (actionCont) actionCont.style.display = "none";

    const allCards = buildStandardDeck();
    shuffleArray(allCards);
    // Filtrar cartas de alto impacto para dar opciones emocionantes
    const priorityCards = allCards.filter(c => ["A", "K", "Q", "J", "10", "7"].includes(c.rank));
    const chosenCards = priorityCards.slice(0, 3); // 1 de 3 coherente con la UI

    const sealKeys = Object.keys(SEAL_ENCHANTMENTS);
    shuffleArray(sealKeys);

    activeMasteryCandidates = chosenCards.map((card, idx) => {
      const sKey = sealKeys[idx % sealKeys.length];
      const seal = SEAL_ENCHANTMENTS[sKey] || SEAL_ENCHANTMENTS.sharp;
      return { card, seal };
    });

    grid.innerHTML = activeMasteryCandidates.map((cand, idx) => {
      const isRed = (cand.card.suit === "♥" || cand.card.suit === "♦");
      return `
        <div class="mastery-card-item ${isRed ? 'suit-red' : 'suit-black'}" onclick="chooseMasteryForgeCard(${idx})">
          <div style="font-size:12px;font-weight:bold;">${cand.card.rank}${cand.card.suit}</div>
          <div style="font-size:26px;margin:4px 0;">${cand.seal.icon}</div>
          <div style="font-family:var(--font-pixel);font-size: 9px;color:#ffd166;font-weight:bold;text-align:center;">${cand.seal.name.toUpperCase()}</div>
          <div style="font-size: 9px;color:#64748b;text-align:center;line-height:1.2;margin-top:2px;">${cand.seal.desc}</div>
          <div style="margin-top:6px;padding:3px 6px;background:#ffd166;color:#0b0c10;font-size: 9px;font-weight:bold;border-radius:4px;">FORJAR</div>
        </div>
      `;
    }).join("");

    modal.classList.remove("hidden");
    try { playWinFanfareSound(); } catch (_) {}
    triggerHaptic("blackjack");
  }
  window.showMasteryForgeModal = showMasteryForgeModal;

  let lastForgedMasterySeal = null;

  function chooseMasteryForgeCard(idx) {
    const cand = activeMasteryCandidates[idx];
    if (!cand) return;
    const cid = `${cand.card.suit}_${cand.card.rank}`;
    savePersistentDeckSeal(cid, cand.seal);
    lastForgedMasterySeal = {
      cardRank: cand.card.rank,
      cardSuit: cand.card.suit,
      sealName: cand.seal.name,
      sealIcon: cand.seal.icon,
      sealDesc: cand.seal.desc
    };

    if (gameState.player) {
      if (!gameState.player.cardEnchantments) gameState.player.cardEnchantments = {};
      gameState.player.cardEnchantments[cid] = Object.assign({}, cand.seal);
    }

    addLog(`👑 Forja de Maestría: Has bendecido permanentemente a [${cand.card.rank}${cand.card.suit}] con ${cand.seal.name} (${cand.seal.icon}).`, "critical");
    spawnFloatingText("stage", `👑 ¡${cand.card.rank}${cand.card.suit} FORJADA PARA SIEMPRE!`, "crit");
    try { playEnchantChimeSound(); } catch (_) {}
    triggerHaptic("blackjack");

    if (isTowerVictoryForge) {
      // Proceder al paso 2 de la victoria de torre: elegir 3 de 6 cartas para el mazo
      showVictoryCardsModal(onMasteryForgeComplete);
      return;
    }

    const modal = document.getElementById("screen-mastery-forge-modal");
    if (modal) modal.classList.add("hidden");

    if (onMasteryForgeComplete) {
      const cb = onMasteryForgeComplete;
      onMasteryForgeComplete = null;
      cb();
    }
  }
  window.chooseMasteryForgeCard = chooseMasteryForgeCard;

  /* ============================================================
     SELECCIÓN DE 3 NAIPES AL VENCER LA TORRE (PASO 2)
     ============================================================ */
  let activeVictoryCardCandidates = [];
  let selectedVictoryCardIndices = new Set();
  let onVictoryCardsComplete = null;

  function showVictoryCardsModal(onComplete = null) {
    onVictoryCardsComplete = onComplete;
    selectedVictoryCardIndices.clear();

    const modal = document.getElementById("screen-mastery-forge-modal");
    const grid = document.getElementById("mf-candidates-grid");
    if (!modal || !grid) return;

    const crownEl = document.getElementById("mf-crown");
    if (crownEl) crownEl.innerText = "🃏 BOTÍN DE NAIPES DE LA TORRE";
    const titleEl = document.getElementById("mf-title");
    if (titleEl) titleEl.innerText = "TRANSMUTACIÓN DE MAZO (52 CARTAS)";
    const descEl = document.getElementById("mf-desc");
    if (descEl) descEl.innerHTML = `¡Conquista legendaria! Elige <b>3 naipes arcanos de los 6</b> para transmutar y reemplazar sus cartas correspondientes en tu baraja de 52 cartas (<b id="mf-cards-picked-count" style="color:#ffd166;">0/3</b> elegidos):`;
    const hintEl = document.getElementById("mf-hint");
    if (hintEl) hintEl.innerText = "✨ Estos 3 naipes arcanos sustituyen a su número y palo ordinarios, manteniendo siempre 52 cartas exactas en tu baraja.";

    const highRanks = [
      {
        rank: "6", value: 6, isAce: false,
        fusion: "modular_6", dynamicValues: [2, 3, 4, 6],
        name: "6 Modular Alquímico",
        icon: "⚗️", badgeText: "FUSIÓN (2/3/4/6)", badgeClass: "fusion",
        desc: "Fusión: opera como 6, o se divide en 2, 3 o 4 para clavar 21 y evitar BUST."
      },
      {
        rank: "8", value: 8, isAce: false,
        fusion: "split_8", dynamicValues: [4, 5, 8],
        name: "8 Armónico de Fusión",
        icon: "✨", badgeText: "FUSIÓN (4/5/8)", badgeClass: "fusion",
        desc: "Fusión: opera como 8, o se desdobla en 4 o 5 para completar combinaciones."
      },
      {
        rank: "A", value: 11, isAce: true,
        operator: "mult",
        name: "As Resonante Multiplicador",
        icon: "⚡", badgeText: "POTENCIADOR x2", badgeClass: "mult",
        desc: "Multiplicador x2: duplica todo el daño infligido al ganar la mano."
      },
      {
        rank: "K", value: 10, isAce: false,
        operator: "mult",
        name: "Rey Verdugo Crítico",
        icon: "⚔️", badgeText: "POTENCIADOR x2", badgeClass: "mult",
        desc: "Multiplicador x2: inflige el doble de daño devastador si logras 20 o 21."
      },
      {
        rank: "7", value: 7, isAce: false,
        modifier: { plus: 2, minus: 2 }, dynamicValues: [5, 7, 9],
        name: "7 Elástico Alquímico",
        icon: "⚖️", badgeText: "AJUSTE (+2 / -2)", badgeClass: "adjust",
        desc: "Ajuste elástico: suma +2 si te falta para 21, o resta -2 para salvarte del BUST."
      },
      {
        rank: "5", value: 5, isAce: false,
        modifier: { plus: 3, minus: 2 }, dynamicValues: [3, 5, 8],
        name: "5 Balancín de Ajuste",
        icon: "🔮", badgeText: "AJUSTE (+3 / -2)", badgeClass: "adjust",
        desc: "Compensador: se transforma en 3, 5 u 8 según tu mano para asegurar la victoria."
      }
    ];
    const chosenRanks = highRanks.slice(0, 6);

    const suitsCopy = [...SUITS];
    shuffleArray(suitsCopy);

    const ownedExtra = getPersistentExtraCards();
    activeVictoryCardCandidates = chosenRanks.map((arch, i) => {
      let suit = suitsCopy[i % suitsCopy.length];
      for (const s of SUITS) {
        if (!ownedExtra.some(o => o.rank === arch.rank && o.suit === s)) {
          suit = s;
          break;
        }
      }
      return Object.assign({}, arch, { suit });
    });

    renderVictoryCardsSelectionGrid();

    const actionCont = document.getElementById("mf-action-container");
    if (actionCont) {
      actionCont.style.display = "block";
      updateVictoryCardsConfirmButton();
    }
  }
  window.showVictoryCardsModal = showVictoryCardsModal;

  function renderVictoryCardsSelectionGrid() {
    const grid = document.getElementById("mf-candidates-grid");
    if (!grid) return;
    grid.innerHTML = activeVictoryCardCandidates.map((c, idx) => {
      const isRed = (c.suit === "♥" || c.suit === "♦");
      const isSelected = selectedVictoryCardIndices.has(idx);
      const icon = c.icon || (c.isAce ? '🃏' : '⭐');
      const badgeBg = c.badgeClass === "fusion" ? "rgba(56,189,248,0.2)" : (c.badgeClass === "mult" ? "rgba(251,191,36,0.2)" : "rgba(168,85,247,0.2)");
      const badgeColor = c.badgeClass === "fusion" ? "#38bdf8" : (c.badgeClass === "mult" ? "#fbbf24" : "#c084fc");
      const badgeBorder = c.badgeClass === "fusion" ? "#0284c7" : (c.badgeClass === "mult" ? "#d97706" : "#7e22ce");

      return `
        <div class="mastery-card-item ${isRed ? 'suit-red' : 'suit-black'} ${isSelected ? 'selected' : ''}" onclick="toggleVictoryCardSelection(${idx})">
          <div style="font-size:12px;font-weight:bold;">${c.rank}${c.suit}</div>
          <div style="font-size:24px;margin:2px 0;">${icon}</div>
          <div style="font-family:var(--font-pixel);font-size:8.5px;color:#ffd166;font-weight:bold;text-align:center;">${(c.name || '').toUpperCase()}</div>
          <div style="margin:2px 0;padding:2px 4px;background:${badgeBg};border:1px solid ${badgeBorder};color:${badgeColor};font-size:7.5px;font-weight:bold;border-radius:4px;text-align:center;">
            ${c.badgeText || "NAIPE ARCANO"}
          </div>
          <div style="font-size:8.5px;color:#94a3b8;text-align:center;line-height:1.2;margin-top:2px;">${c.desc || ''}</div>
          <div style="margin-top:6px;padding:3px 6px;background:${isSelected ? '#2a9d8f' : '#334155'};color:#fff;font-size: 9px;font-weight:bold;border-radius:4px;text-align:center;">
            ${isSelected ? '✓ ELEGIDA' : '+ SELECCIONAR'}
          </div>
        </div>
      `;
    }).join("");
  }

  function toggleVictoryCardSelection(idx) {
    if (selectedVictoryCardIndices.has(idx)) {
      selectedVictoryCardIndices.delete(idx);
    } else {
      if (selectedVictoryCardIndices.size >= 3) {
        if (typeof showGameToast === "function") showGameToast("Ya has seleccionado 3 naipes. Desmarca uno para cambiar.", "warning");
        return;
      }
      selectedVictoryCardIndices.add(idx);
    }
    try { playCardDealSound(); } catch (_) {}
    renderVictoryCardsSelectionGrid();
    updateVictoryCardsConfirmButton();
  }
  window.toggleVictoryCardSelection = toggleVictoryCardSelection;

  function updateVictoryCardsConfirmButton() {
    const countEl = document.getElementById("mf-cards-picked-count");
    if (countEl) countEl.innerText = `${selectedVictoryCardIndices.size}/3`;
    const btn = document.getElementById("mf-confirm-cards-btn");
    if (!btn) return;
    if (selectedVictoryCardIndices.size === 3) {
      btn.disabled = false;
      btn.style.opacity = "1";
      btn.style.cursor = "pointer";
      btn.innerText = "✅ CONFIRMAR Y TRANSMUTAR 3 NAIPES (52 CARTAS)";
    } else {
      btn.disabled = true;
      btn.style.opacity = "0.6";
      btn.style.cursor = "not-allowed";
      btn.innerText = `ELIGE 3 NAIPES (${selectedVictoryCardIndices.size}/3)`;
    }
  }

  function confirmVictoryCardsSelection() {
    if (selectedVictoryCardIndices.size !== 3) return;
    const cardsToAdd = Array.from(selectedVictoryCardIndices).map(i => activeVictoryCardCandidates[i]);
    savePersistentExtraCards(cardsToAdd);

    if (gameState.player) {
      const p = gameState.player;
      const diffKey = gameState.diff || (typeof getGameDifficulty === "function" ? getGameDifficulty() : "normal");
      const claimedKey = `blackjack_victory_cards_claimed_${p.class}_${diffKey}`;
      try {
        localStorage.setItem(claimedKey, "true");
      } catch (_) {}
    }

    try {
      localStorage.removeItem("bj_pending_tower_victory_reward");
    } catch (_) {}
    if (typeof updatePendingTowerRewardBanner === "function") updatePendingTowerRewardBanner();

    addLog(`👑 Recompensa de Conquista: Has transmutado 3 naipes arcanos en tu baraja de 52 (${cardsToAdd.map(c => c.rank + c.suit).join(", ")}).`, "critical");
    spawnFloatingText("stage", "🃏 +3 NAIPES TRANSMUTADOS (52 CARTAS)", "crit");
    try { playWinFanfareSound(); } catch (_) {}
    triggerHaptic("blackjack");

    const modal = document.getElementById("screen-mastery-forge-modal");
    if (modal) modal.classList.add("hidden");

    showVictoryRewardSavedModal(cardsToAdd);

    if (onVictoryCardsComplete) {
      const cb = onVictoryCardsComplete;
      onVictoryCardsComplete = null;
      cb();
    }
  }
  window.confirmVictoryCardsSelection = confirmVictoryCardsSelection;

  function showVictoryRewardSavedModal(cardsAdded = []) {
    const modal = document.getElementById("screen-victory-reward-saved-modal");
    const summaryEl = document.getElementById("vrs-summary-content");
    if (!modal || !summaryEl) return;

    const extraCards = getPersistentExtraCards();
    const totalDeck = 52;
    const transmutedCount = extraCards.length;

    let sealHtml = "";
    if (lastForgedMasterySeal) {
      sealHtml = `
        <div style="background:rgba(217,119,6,0.15);border:1px solid #ffd166;border-radius:6px;padding:8px;margin-bottom:8px;">
          <div style="font-family:var(--font-pixel);font-size:9px;color:#ffd166;font-weight:bold;">✨ SELLO PERMANENTE FORJADO</div>
          <div style="font-size:11px;color:#f8fafc;margin-top:2px;">
            ${lastForgedMasterySeal.cardRank}${lastForgedMasterySeal.cardSuit} — <b>${lastForgedMasterySeal.sealName}</b> ${lastForgedMasterySeal.sealIcon}
          </div>
          <div style="font-size:8.5px;color:#94a3b8;margin-top:2px;">${lastForgedMasterySeal.sealDesc}</div>
        </div>
      `;
    }

    let cardsHtml = "";
    if (Array.isArray(cardsAdded) && cardsAdded.length > 0) {
      cardsHtml = `
        <div style="background:rgba(42,157,143,0.15);border:1px solid #2a9d8f;border-radius:6px;padding:8px;margin-bottom:8px;">
          <div style="font-family:var(--font-pixel);font-size:9px;color:#2a9d8f;font-weight:bold;">🃏 3 NAIPES ARCANOS TRANSMUTADOS EN EL MAZO DE 52</div>
          <div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap;">
            ${cardsAdded.map(c => `
              <div style="background:rgba(15,23,42,0.9);border:1px solid #64748b;border-radius:4px;padding:4px 8px;font-family:var(--font-display);font-size:10px;color:${(c.suit === '♥' || c.suit === '♦') ? '#ff758f' : '#f8fafc'};">
                ${c.rank}${c.suit} <span style="font-size:8.5px;color:#ffd166;">(${c.isAce ? 'As 1/11' : (c.value === 10 ? 'Valor 10' : 'Val ' + c.value)})</span>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    summaryEl.innerHTML = `
      ${sealHtml}
      ${cardsHtml}
      <div style="background:rgba(15,23,42,0.6);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:8px;text-align:center;">
        <span style="font-size:9px;color:#cbd5e1;">Tamaño de tu baraja histórica permanente:</span>
        <div style="font-family:var(--font-display);font-size:14px;color:#ffd166;font-weight:bold;margin-top:2px;">
          ${totalDeck} CARTAS (${extraCards.length} arcanas transmutadas)
        </div>
        <span style="font-size:8px;color:#94a3b8;">(Puedes consultar tu baraja completa en la Ficha del Héroe > Mi Mazo)</span>
      </div>
    `;

    modal.classList.remove("hidden");
    try { playWinFanfareSound(); } catch (_) {}
  }
  window.showVictoryRewardSavedModal = showVictoryRewardSavedModal;

  function closeMasteryForgeModal() {
    const modal = document.getElementById("screen-mastery-forge-modal");
    if (modal) modal.classList.add("hidden");
    returnToMainMenuClean();
  }
  window.closeMasteryForgeModal = closeMasteryForgeModal;

  function closeVictoryRewardSavedModal() {
    const modal = document.getElementById("screen-victory-reward-saved-modal");
    if (modal) modal.classList.add("hidden");
    returnToMainMenuClean();
  }
  window.closeVictoryRewardSavedModal = closeVictoryRewardSavedModal;

  function returnToMainMenuClean() {
    clearMidRunState();
    try {
      if (typeof stopCombatMusic === "function") stopCombatMusic();
      if (typeof stopSuddenDeathTension === "function") stopSuddenDeathTension();
      if (typeof playTitleMusic === "function") playTitleMusic();
    } catch (_) {}
    const modals = [
      "screen-event",
      "screen-mastery-forge-modal",
      "screen-victory-reward-saved-modal",
      "screen-battle",
      "screen-inspect",
      "screen-campfire-modal",
      "screen-arena-pvp-modal",
      "screen-fate-wheel",
      "screen-bet",
      "screen-ingame-pause",
      "screen-game-over",
      "screen-win",
      "screen-floor-transition"
    ];
    modals.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add("hidden");
    });
    const titleEl = document.getElementById("screen-title");
    if (titleEl) titleEl.classList.remove("hidden");
    if (typeof updateHeroSelectUI === "function") updateHeroSelectUI();
    if (typeof updateHud === "function") updateHud();
    if (typeof updatePendingTowerRewardBanner === "function") updatePendingTowerRewardBanner();
  }
  window.returnToMainMenuClean = returnToMainMenuClean;

  function updatePendingTowerRewardBanner() {
    const banner = document.getElementById("pending-victory-reward-banner");
    if (!banner) return;
    let pending = false;
    try {
      pending = Boolean(localStorage.getItem("bj_pending_tower_victory_reward"));
    } catch (_) {}
    if (pending) {
      banner.classList.remove("hidden");
    } else {
      banner.classList.add("hidden");
    }
  }
  window.updatePendingTowerRewardBanner = updatePendingTowerRewardBanner;

  function openPendingTowerReward() {
    showMasteryForgeModal(null, true);
  }
  window.openPendingTowerReward = openPendingTowerReward;

  function handleVictoryNewAscension(newAscension, targetDiff) {
    if (targetDiff && typeof setGameDifficulty === "function") {
      setGameDifficulty(targetDiff);
    }
    if (localStorage.getItem("bj_pending_tower_victory_reward")) {
      if (typeof showGameConfirm === "function") {
        showGameConfirm({
          title: "👑 BOTÍN DE VICTORIA PENDIENTE",
          message: "Has derrotado a Black Jack pero aún no has reclamado tu Sello de Maestría y los 3 Naipes Arcanos. ¿Deseas reclamarlos ahora antes de avanzar?",
          onConfirm: () => {
            openPendingTowerReward();
          },
          onCancel: () => {
            startNewAscensionRun();
          },
          okLabel: "RECLAMAR AHORA",
          cancelLabel: "AVANZAR DE TODOS MODOS"
        });
        return;
      }
    }
    startNewAscensionRun();
  }
  window.handleVictoryNewAscension = handleVictoryNewAscension;

  function startNewAscensionRun() {
    clearMidRunState();
    const modals = [
      "screen-event",
      "screen-mastery-forge-modal",
      "screen-victory-reward-saved-modal"
    ];
    modals.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add("hidden");
    });
    if (typeof startGame === "function") {
      startGame();
    } else {
      location.reload();
    }
  }
  window.startNewAscensionRun = startNewAscensionRun;

  /* ============================================================
     FRENESÍ DE ORO x3 (REWARDED AD / VENTAJA DE CUENTA)
     ============================================================ */
  let frenzyTimer = null;
  function triggerIntroFrenzy(event) {
    if (event && event.stopPropagation) event.stopPropagation();
    const btn = document.getElementById("intro-frenzy-btn");

    function startFrenzyCountdown() {
      window.introFrenzyMultiplier = 3;
      window._frenzyTowerBenefit = true;
      try { playWinFanfareSound(); } catch (_) {}
      triggerHaptic("blackjack");

      let secsLeft = 15;
      if (btn) {
        btn.classList.add("active");
        btn.innerText = `⚡ ¡FRENESÍ x3 (${secsLeft}s)!`;
      }

      if (frenzyTimer) clearInterval(frenzyTimer);
      frenzyTimer = setInterval(() => {
        secsLeft--;
        if (secsLeft > 0) {
          if (btn) btn.innerText = `⚡ ¡FRENESÍ x3 (${secsLeft}s)!`;
        } else {
          clearInterval(frenzyTimer);
          window.introFrenzyMultiplier = 1;
          if (btn) {
            btn.classList.remove("active");
            btn.innerText = "⚡ FRENESÍ x3";
          }
        }
      }, 1000);
    }

    window._onFrenzyAdReward = startFrenzyCountdown;
    if (typeof showRewardedAdModal === "function") {
      showRewardedAdModal("ad_frenzy");
    } else {
      startFrenzyCountdown();
    }
  }
  window.triggerIntroFrenzy = triggerIntroFrenzy;

  /* ============================================================
     INSPECCIÓN TÁCTIL DE CÓDICE / BESTIARIO / VESTUARIO
     ============================================================ */
  function inspectCodexItem(id, type) {
    const modal = document.getElementById("screen-codex-detail-modal");
    const typeEl = document.getElementById("cdd-type");
    const iconEl = document.getElementById("cdd-icon");
    const nameEl = document.getElementById("cdd-name");
    const metaEl = document.getElementById("cdd-meta");
    const loreEl = document.getElementById("cdd-lore");
    const statsEl = document.getElementById("cdd-stats");
    const tipEl = document.getElementById("cdd-tip");
    if (!modal) return;

    if (type === "enemy") {
      const enemy = ENEMIES.find(e => e.name === id) || ENEMIES[0];
      const lore = (typeof getEnemyLore === "function" ? getEnemyLore(enemy.name) : (window.ENEMY_LORE && window.ENEMY_LORE[enemy.name])) || "Habitante de las profundidades de la Torre 21.";
      if (typeEl) typeEl.innerText = "CRIATURA DEL BESTIARIO";
      if (iconEl) iconEl.innerText = enemy.sprite || "👹";
      if (nameEl) nameEl.innerText = enemy.name.toUpperCase();
      if (metaEl) metaEl.innerText = `${enemy.traitName || 'RASGO DE COMBATE'}`;
      if (loreEl) loreEl.innerText = lore;
      if (statsEl) {
        statsEl.innerHTML = `
          <div class="cdd-stat-box">❤️ HP: ${enemy.hp}</div>
          <div class="cdd-stat-box">⚔️ PWR: ${enemy.pwr}</div>
          <div class="cdd-stat-box">🛡️ DEF: ${enemy.def}</div>
        `;
      }
      if (tipEl) tipEl.innerHTML = `💡 <b>Estrategia:</b> ${enemy.traitShort || 'Plántate cerca del 21 para contrarrestar su poder.'}`;
    } else if (type === "relic") {
      const relic = ALL_RELICS.find(r => r.id === id) || ALL_RELICS[0];
      if (typeEl) typeEl.innerText = "ARTEFACTO ARCANO DE LA TORRE";
      if (iconEl) iconEl.innerText = relic.icon || "🎴";
      if (nameEl) nameEl.innerText = relic.name.toUpperCase();
      if (metaEl) metaEl.innerText = relic.type === "buff" ? "ARTEFACTO BENDITO" : "MALDICIÓN DEL PACTO";
      if (loreEl) loreEl.innerText = relic.desc || "Artefacto milenario.";
      if (statsEl) {
        statsEl.innerHTML = `
          <div class="cdd-stat-box" style="grid-column:span 3;">Efecto pasivo constante durante toda la run</div>
        `;
      }
      if (tipEl) tipEl.innerHTML = `💡 Combina con cartas del mismo elemento para multiplicar su eficacia.`;
    } else if (type === "amulet") {
      const acc = AMULET_INFO[id] || { icon: "💍", name: id, desc: "" };
      if (typeEl) typeEl.innerText = "ACCESORIO DE EQUIPAMIENTO";
      if (iconEl) iconEl.innerText = acc.icon || "💍";
      if (nameEl) nameEl.innerText = acc.name.toUpperCase();
      if (metaEl) metaEl.innerText = "RANURA DE ACCESORIO";
      if (loreEl) loreEl.innerText = acc.desc || "Accesorio de combate.";
      if (statsEl) {
        statsEl.innerHTML = `
          <div class="cdd-stat-box" style="grid-column:span 3;">Ocupa la ranura de amuleto del héroe</div>
        `;
      }
      if (tipEl) tipEl.innerHTML = `💡 Se compra en el Bazar o se halla en cofres secretos.`;
    }

    modal.classList.remove("hidden");
    try { playCardDealSound(); } catch (_) {}
  }
  window.inspectCodexItem = inspectCodexItem;

  function closeCodexDetailModal() {
    const modal = document.getElementById("screen-codex-detail-modal");
    if (modal) modal.classList.add("hidden");
  }
  window.closeCodexDetailModal = closeCodexDetailModal;

  /* ============================================================
     ARENA DEL 21: DUELOS TÁCTICOS CON STATS Y MAZO FORJADO (FASE 2)
     ============================================================ */
  const ARENA_RIVALS = [
    {
      id: "dante_spades",
      name: "Dante de Picas",
      title: "El Filo Veloz",
      avatar: "🗡️",
      img: "assets/svg/enemy_centurion.svg",
      elo: 1280,
      hp: 100,
      pwr: 14,
      def: 6,
      standThreshold: 17,
      quote: "Mi acero no titubea ante los heraldos."
    },
    {
      id: "valkyrie_diamonds",
      name: "Valquiria de Diamantes",
      title: "El Muro Sagrado",
      avatar: "🛡️",
      img: "assets/svg/enemy_gargoyle.svg",
      elo: 1350,
      hp: 120,
      pwr: 11,
      def: 10,
      standThreshold: 16,
      quote: "Ningún golpe quebrajará mi bastión."
    },
    {
      id: "archmage_clubs",
      name: "Archimago del Trébol",
      title: "El Ojo Arcano",
      avatar: "🔮",
      img: "assets/svg/enemy_shadowbeast.svg",
      elo: 1420,
      hp: 90,
      pwr: 18,
      def: 4,
      standThreshold: 18,
      quote: "Los naipes susurran tu destino."
    },
    {
      id: "necro_void",
      name: "Malfas del Vacío",
      title: "El Cosechador de Almas",
      avatar: "💀",
      img: "assets/svg/enemy_skeleton.svg",
      elo: 1510,
      hp: 110,
      pwr: 16,
      def: 7,
      standThreshold: 17,
      quote: "Tus victorias alimentarán la tumba."
    },
    {
      id: "shadow_joker",
      name: "Sombra del 21",
      title: "El Tahúr Espectral",
      avatar: "🎭",
      img: "assets/svg/enemy_black.svg",
      elo: 1600,
      hp: 95,
      pwr: 20,
      def: 5,
      standThreshold: 18,
      quote: "Juego al borde del abismo... ¿y tú?"
    }
  ];
  window.ARENA_RIVALS = ARENA_RIVALS;

  let arenaMatch = null;

  function openArenaPvpModal() {
    const modal = document.getElementById("screen-arena-pvp-modal");
    const trophies = parseInt(localStorage.getItem("blackjack_arena_trophies") || "1250", 10);
    const skulls = getPlayerCryptCoins();
    const trophEl = document.getElementById("arena-trophies-val");
    const skullEl = document.getElementById("arena-skulls-val");
    if (trophEl) trophEl.innerText = trophies.toLocaleString();
    if (skullEl) skullEl.innerText = skulls.toLocaleString();

    // Seleccionar rival dinámico para el lobby
    const rival = ARENA_RIVALS[Math.floor(Math.random() * ARENA_RIVALS.length)];
    const rNameEl = document.getElementById("arena-rival-name");
    const rAvatarEl = document.getElementById("arena-rival-avatar");
    if (rNameEl) rNameEl.innerText = `${rival.name.toUpperCase()}`;
    if (rAvatarEl) {
      if (rival.img) {
        rAvatarEl.innerHTML = `<img src="${rival.img}" class="sprite-img arena-avatar-img" alt="${rival.name}" onerror="this.outerHTML='${rival.avatar || "💀"}'">`;
      } else {
        rAvatarEl.innerText = rival.avatar || "💀";
      }
    }

    // Actualizar nombre y avatar de jugador según héroe y skin
    const pNameEl = document.getElementById("arena-player-name");
    const pAvatarEl = document.getElementById("arena-player-avatar");
    const rawHKey = localStorage.getItem("bj_equipped_hero") || (typeof gameState !== "undefined" && gameState.player && gameState.player.class) || "knight";
    const hKey = (rawHKey === "necro") ? "necromancer" : rawHKey;
    const heroInfo = HERO_DATA[hKey] || HERO_DATA.knight;
    const heroSkinSvg = (typeof getCurrentSkinSvg === "function" ? getCurrentSkinSvg(hKey, localStorage.getItem("bj_equipped_skin_" + hKey)) : null) || heroInfo.img || "assets/svg/knight_idle.svg";
    if (pNameEl) pNameEl.innerText = `TÚ (${heroInfo.name.toUpperCase()})`;
    if (pAvatarEl) {
      pAvatarEl.innerHTML = `<img src="${heroSkinSvg}" class="sprite-img arena-avatar-img" alt="${heroInfo.name}" onerror="this.outerHTML='${heroInfo.sprite || "🛡️"}'">`;
    }

    switchArenaTab('battles');

    if (modal) modal.classList.remove("hidden");
    try { playCardDealSound(); } catch (_) {}
  }
  window.openArenaPvpModal = openArenaPvpModal;
  window.openArenaPvp = openArenaPvpModal;

  function closeArenaPvpModal() {
    const modal = document.getElementById("screen-arena-pvp-modal");
    if (modal) modal.classList.add("hidden");
    document.getElementById("arena-stage-lobby")?.classList.remove("hidden");
    document.getElementById("arena-stage-battle")?.classList.add("hidden");
    arenaMatch = null;
    if (marketTimerInterval) {
      clearInterval(marketTimerInterval);
      marketTimerInterval = null;
    }
    try {
      stopCombatMusic();
      startMainMenuMusic();
    } catch (_) {}
  }
  window.closeArenaPvpModal = closeArenaPvpModal;

  function startArenaMatch() {
    document.getElementById("arena-stage-lobby")?.classList.add("hidden");
    document.getElementById("arena-stage-battle")?.classList.remove("hidden");
    try {
      startCombatMusic();
    } catch (_) {}

    // Seleccionar rival
    const rival = ARENA_RIVALS[Math.floor(Math.random() * ARENA_RIVALS.length)];

    // Obtener stats del héroe actual
    const rawHKey = localStorage.getItem("bj_equipped_hero") || (typeof gameState !== "undefined" && gameState.player && gameState.player.class) || "knight";
    const hKey = (rawHKey === "necro") ? "necromancer" : rawHKey;
    const heroInfo = HERO_DATA[hKey] || HERO_DATA.knight;
    const playerStats = {
      maxHp: heroInfo.maxHp || 90,
      hp: heroInfo.maxHp || 90,
      pwr: heroInfo.pwr || 12,
      def: heroInfo.def || 6
    };

    // Construir mazo combinado: baraja estándar con overrides persistentes ya aplicados (getPersistentExtraCards())
    const fullArenaDeck = buildStandardDeck();
    shuffleArray(fullArenaDeck);
    
    // Inyectar avatares vectoriales reales y nombres en la Arena
    const playerAvatarEl = document.getElementById("arena-combat-player-avatar");
    const playerNameEl = document.getElementById("arena-combat-player-name");
    if (playerAvatarEl) {
      const heroSvg = (typeof getCurrentSkinSvg === "function" ? getCurrentSkinSvg(hKey, localStorage.getItem("bj_equipped_skin_" + hKey)) : null) || heroInfo.img || "assets/svg/knight_idle.svg";
      playerAvatarEl.innerHTML = `<img src="${heroSvg}" class="sprite-img arena-avatar-img" alt="${heroInfo.name}" onerror="this.outerHTML='${heroInfo.sprite || "🛡️"}'">`;
    }
    if (playerNameEl) playerNameEl.innerText = heroInfo.name ? heroInfo.name.toUpperCase().replace(/^JACK\s+/i, "") : "TÚ";
    
    const rivalAvatarEl = document.getElementById("arena-combat-enemy-avatar");
    const rivalNameEl = document.getElementById("arena-combat-enemy-name");
    if (rivalAvatarEl) {
      if (rival.img) {
        rivalAvatarEl.innerHTML = `<img src="${rival.img}" class="sprite-img arena-avatar-img" alt="${rival.name}" onerror="this.outerHTML='${rival.avatar || "💀"}'">`;
      } else {
        rivalAvatarEl.innerHTML = rival.avatar || rival.sprite || "💀";
      }
    }
    if (rivalNameEl) rivalNameEl.innerText = (rival.name || "RIVAL").toUpperCase();

    arenaMatch = {
      round: 1,
      maxRounds: 3,
      isSuddenDeath: false,
      isDrawRound: false,
      playerWins: 0,
      rivalWins: 0,
      playerStats: playerStats,
      rival: rival,
      rivalHp: rival.hp,
      rivalMaxHp: rival.hp,
      playerHand: [],
      rivalHand: [],
      deck: fullArenaDeck,
      firstTurn: "player"
    };

    // FASE: MONEDA AL AIRE INTERACTIVA (CON PARADA GARANTIZADA Y SALTO MANUAL)
    clearArenaCoinTimers(true);
    const coinBox = document.getElementById("arena-coin-box");
    const coinIcon = document.getElementById("arena-coin-icon");
    const coinStatus = document.getElementById("arena-coin-status");
    const coinSub = document.getElementById("arena-coin-result-sub");

    if (coinBox) {
      coinBox.classList.remove("hidden");
      coinBox.style.display = "block";
      if (coinIcon) {
        coinIcon.classList.remove("landed");
        coinIcon.classList.add("spinning");
      }
      if (coinStatus) coinStatus.innerText = "¡LANZANDO MONEDA AL AIRE!";
      if (coinSub) coinSub.innerText = "Sorteando iniciativa de ronda... (Toca para continuar)";
      try {
        if (typeof playCoinSound === "function") playCoinSound();
        if (typeof triggerHaptic === "function") triggerHaptic("coin");
      } catch (_) {}

      // Resolver resultado de la moneda a los 600ms
      arenaCoinTimer1 = setTimeout(() => {
        try {
          const playerStarts = Math.random() < 0.5;
          if (arenaMatch) {
            arenaMatch.firstTurn = playerStarts ? "player" : "rival";
            arenaMatch.settling = false;
            arenaMatch._settling = false;
          }
          if (coinIcon) {
            coinIcon.classList.remove("spinning");
            coinIcon.classList.add("landed");
          }
          if (coinStatus) {
            coinStatus.classList.add("commence-active");
            coinStatus.innerText = "COMIENZA";
          }
          if (coinSub) {
            coinSub.innerText = playerStarts
              ? "🪙 INICIAS TÚ (Iniciativa táctica)"
              : `🪙 INICIA ${rival.name.toUpperCase()}`;
          }
          if (typeof triggerHaptic === "function") triggerHaptic("button_click");
          if (typeof playCoinLandSound === "function") playCoinLandSound();
        } catch (_) {}

        // Ocultar caja e iniciar combate de inmediato a los 550ms
        arenaCoinTimer2 = setTimeout(() => {
          clearArenaCoinTimers(true);
          if (arenaMatch) {
            arenaMatch.settling = false;
            arenaMatch._settling = false;
          }
          const cBox = document.getElementById("arena-coin-box");
          if (cBox) {
            cBox.classList.add("hidden");
            cBox.style.display = "none";
          }
          const actBox = document.getElementById("arena-actions");
          if (actBox) {
            actBox.classList.remove("hidden");
            actBox.style.display = "flex";
          }
          initArenaRound();
        }, 550);
      }, 600);

      // Failsafe de seguridad absoluto por si algún evento de pantalla interrumpe el timeout
      arenaCoinTimerFailsafe = setTimeout(() => {
        skipArenaCoinFlip();
      }, 1600);
    } else {
      setTimeout(() => {
        initArenaRound();
      }, 150);
    }
  }
  window.startArenaMatch = startArenaMatch;

  let arenaCoinTimer1 = null;
  let arenaCoinTimer2 = null;
  let arenaCoinTimerFailsafe = null;

  function clearArenaCoinTimers(hideBox = false) {
    if (arenaCoinTimer1) { clearTimeout(arenaCoinTimer1); arenaCoinTimer1 = null; }
    if (arenaCoinTimer2) { clearTimeout(arenaCoinTimer2); arenaCoinTimer2 = null; }
    if (arenaCoinTimerFailsafe) { clearTimeout(arenaCoinTimerFailsafe); arenaCoinTimerFailsafe = null; }
    if (hideBox) {
      const coinBox = document.getElementById("arena-coin-box");
      if (coinBox) {
        coinBox.classList.add("hidden");
        coinBox.style.display = "none";
      }
      const coinIcon = document.getElementById("arena-coin-icon");
      if (coinIcon) {
        coinIcon.classList.remove("spinning");
        coinIcon.classList.add("landed");
      }
    }
  }
  window.clearArenaCoinTimers = clearArenaCoinTimers;

  function skipArenaCoinFlip() {
    clearArenaCoinTimers(true);
    if (typeof playCoinLandSound === "function") playCoinLandSound();
    if (arenaMatch) {
      if (!arenaMatch.firstTurn) {
        arenaMatch.firstTurn = (Math.random() < 0.5) ? "player" : "rival";
      }
      arenaMatch.settling = false;
      arenaMatch._settling = false;
    }
    const coinBox = document.getElementById("arena-coin-box");
    if (coinBox) {
      coinBox.classList.add("hidden");
      coinBox.style.display = "none";
    }
    const actionsBox = document.getElementById("arena-actions");
    if (actionsBox) {
      actionsBox.classList.remove("hidden");
      actionsBox.style.display = "flex";
    }
    initArenaRound();
  }
  window.skipArenaCoinFlip = skipArenaCoinFlip;

  function initArenaRound() {
    clearArenaCoinTimers(true);
    const coinBox = document.getElementById("arena-coin-box");
    if (coinBox) {
      coinBox.classList.add("hidden");
      coinBox.style.display = "none";
    }
    const actionsBox = document.getElementById("arena-actions");
    if (actionsBox) {
      actionsBox.classList.remove("hidden");
      actionsBox.style.display = "flex";
    }
    
    try {
      if (arenaMatch) {
        arenaMatch.settling = false;
        arenaMatch._settling = false;
      }
      if (!arenaMatch) return;
      document.getElementById("arena-round-result")?.classList.add("hidden");
      
      // Configurar Habilidades de PvP por nivel defensivamente
      arenaMatch.skillsUsed = arenaMatch.skillsUsed || { spy: false, swap: false, steal: false };
      const rawHKey = localStorage.getItem("bj_equipped_hero") || "knight";
      const hKey = (rawHKey === "necro") ? "necromancer" : rawHKey;
      let pLevel = 1;
      try {
        const meta = (typeof getHeroMeta === "function") ? getHeroMeta() : null;
        if (meta && meta[hKey] && typeof meta[hKey].masteryLevel === "number") {
          pLevel = meta[hKey].masteryLevel;
        }
      } catch (_) { pLevel = 1; }
      
      const btnSpy = document.getElementById("btn-arena-spy");
      const btnSwap = document.getElementById("btn-arena-swap");
      const btnSteal = document.getElementById("btn-arena-steal");
      
      if (btnSpy) {
        if (pLevel >= 2) {
          btnSpy.classList.remove("hidden");
          if (arenaMatch.skillsUsed.spy) btnSpy.classList.add("used");
          else btnSpy.classList.remove("used");
        } else {
          btnSpy.classList.add("hidden");
        }
      }
      if (btnSwap) {
        if (pLevel >= 4) {
          btnSwap.classList.remove("hidden");
          if (arenaMatch.skillsUsed.swap) btnSwap.classList.add("used");
          else btnSwap.classList.remove("used");
        } else {
          btnSwap.classList.add("hidden");
        }
      }
      if (btnSteal) {
        if (pLevel >= 6) {
          btnSteal.classList.remove("hidden");
          if (arenaMatch.skillsUsed.steal) btnSteal.classList.add("used");
          else btnSteal.classList.remove("used");
        } else {
          btnSteal.classList.add("hidden");
        }
      }

      // Repartir 2 cartas a cada duelista con sanitización defensiva
      if (!arenaMatch.deck || arenaMatch.deck.length < 10) {
        arenaMatch.deck = buildStandardDeck();
        shuffleArray(arenaMatch.deck);
      }
      const sanitizeCard = (c) => {
        if (!c || typeof c !== "object") return { rank: "10", suit: "♠", value: 10, isAce: false };
        return {
          ...c,
          rank: c.rank || (c.value ? String(c.value) : "10"),
          suit: c.suit || "♠",
          value: typeof c.value === "number" ? c.value : 10,
          isAce: !!c.isAce
        };
      };
      arenaMatch.playerHand = [sanitizeCard(arenaMatch.deck.pop()), sanitizeCard(arenaMatch.deck.pop())];
      arenaMatch.rivalHand = [sanitizeCard(arenaMatch.deck.pop()), sanitizeCard(arenaMatch.deck.pop())];

      // Actualizar marcadores de ronda
      const roundPill = document.getElementById("arena-round-pill");
      if (roundPill) {
        if (arenaMatch.isSuddenDeath) {
          roundPill.innerHTML = `<span style="color:#ff6b6b;font-weight:bold;">🔥 MUERTE SÚBITA</span>`;
        } else {
          roundPill.innerText = `RONDA ${arenaMatch.round} / ${arenaMatch.maxRounds}`;
        }
      }

      const scPlayer = document.getElementById("arena-score-player");
      const scRival = document.getElementById("arena-score-rival");
      if (scPlayer) scPlayer.innerText = `TÚ: ${arenaMatch.playerWins}`;
      if (scRival) scRival.innerText = `RIVAL: ${arenaMatch.rivalWins}`;
      
      const hpPlayer = document.getElementById("arena-score-player-hp");
      const hpRival = document.getElementById("arena-score-rival-hp");
      if (hpPlayer) hpPlayer.innerText = arenaMatch.playerStats ? arenaMatch.playerStats.hp : 90;
      if (hpRival) hpRival.innerText = arenaMatch.rivalHp;

      renderArenaHands(false);
      try {
        if (typeof playCardDealSound === "function") playCardDealSound();
      } catch (_) {}

      // Notificación táctica de iniciativa
      if (arenaMatch.firstTurn === "rival") {
        if (typeof addLog === "function") {
          addLog(`🪙 Cruz: ¡${arenaMatch.rival.name} tiene la iniciativa! Elige con cuidado.`, "warning");
        }
        if (typeof showGameToast === "function") {
          showGameToast(`🪙 ¡Inicia ${arenaMatch.rival.name}!`, "warning");
        }
      } else {
        if (typeof addLog === "function") {
          addLog("🪙 Cara: ¡Tienes la iniciativa táctica de la ronda!", "magic");
        }
        if (typeof showGameToast === "function") {
          showGameToast("🪙 ¡Inicias tú la ronda!", "gold");
        }
      }
    } catch (err) {
      console.error("[Arena] Error controlado en initArenaRound:", err);
    } finally {
      if (coinBox) {
        coinBox.classList.add("hidden");
        coinBox.style.display = "none";
      }
      if (actionsBox) {
        actionsBox.classList.remove("hidden");
        actionsBox.style.display = "flex";
      }
    }
  }
  window.initArenaRound = initArenaRound;

  function renderArenaHands(showAllRival = false) {
    if (!arenaMatch) return;
    const pCardsEl = document.getElementById("arena-player-cards");
    const rCardsEl = document.getElementById("arena-rival-cards");
    const pSumEl = document.getElementById("arena-player-sum");
    const rSumEl = document.getElementById("arena-rival-sum");

    const pScore = calculateHandScore(arenaMatch.playerHand);
    const rScore = calculateHandScore(arenaMatch.rivalHand);

    if (pCardsEl) {
      pCardsEl.innerHTML = arenaMatch.playerHand.map(c => {
        const isAbility = c.cardType === "ability" || c.abilityAction || c.fusion || c.dynamicValues;
        const isSeal = c.cardType === "seal" || c.sealEffect || c.enchantment;
        const sTheme = c.sealTheme || (c.rarity === "legendary" ? "gold" : (c.badgeClass === "mult" ? "crimson" : "emerald"));
        const sealBadge = isSeal ? `<span class="card-seal-stamp ${sTheme}">${sTheme === 'crimson' ? '⚔️' : (sTheme === 'emerald' ? '🛡️' : '✨')}</span>` : (isAbility ? `<span class="card-seal-stamp arcane">⚡</span>` : '');
        return `
          <div class="card-face player-card ${c.isWonCard ? 'won-loot-card' : ''} ${isAbility ? 'card-has-ability' : ''} ${isSeal ? 'card-has-seal' : ''}">
            ${sealBadge}
            <span class="card-value">${c.rank}</span>
            <span class="suit">${c.suit}</span>
            ${c.name ? `<span class="card-spec-name">${c.name}</span>` : ''}
          </div>
        `;
      }).join("");
    }
    if (pSumEl) pSumEl.innerText = pScore > 21 ? `${pScore} (BUST)` : pScore;

    if (rCardsEl) {
      if (showAllRival) {
        rCardsEl.innerHTML = arenaMatch.rivalHand.map(c => `
          <div class="card-face enemy-card">
            <span class="card-value">${c.rank}</span>
            <span class="suit">${c.suit}</span>
          </div>
        `).join("");
        if (rSumEl) rSumEl.innerText = rScore > 21 ? `${rScore} (BUST)` : rScore;
      } else {
        rCardsEl.innerHTML = `
          <div class="card-face enemy-card">
            <span class="card-value">${arenaMatch.rivalHand[0]?.rank || "?"}</span>
            <span class="suit">${arenaMatch.rivalHand[0]?.suit || ""}</span>
          </div>
          <div class="card-face enemy-card card-back-cover" style="background:linear-gradient(135deg,#1f2833,#0b0c10);border:1px dashed #45a29e;">
            <span style="font-size:12px;">🂠</span>
          </div>
        `;
        if (rSumEl) rSumEl.innerText = "?";
      }
    }
  }

  function arenaPlayerHit() {
    if (!arenaMatch) return;
    if (arenaMatch.deck.length === 0) {
      arenaMatch.deck = buildStandardDeck();
      shuffleArray(arenaMatch.deck);
    }
    arenaMatch.playerHand.push(arenaMatch.deck.pop());
    renderArenaHands(false);
    const pScore = calculateHandScore(arenaMatch.playerHand);
    if (pScore > 21) {
      arenaPlayerStand();
    }
  }
  window.arenaPlayerHit = arenaPlayerHit;

  function arenaPlayerSpy() {
    if (!arenaMatch || !arenaMatch.skillsUsed || arenaMatch.skillsUsed.spy) return;
    arenaMatch.skillsUsed.spy = true;
    const btn = document.getElementById("btn-arena-spy");
    if (btn) btn.classList.add("used");
    try { playTacticalAbilitySound(); } catch (_) {}
    
    // Revelar la mano del rival temporalmente renderizando de nuevo pero indicando 'true'
    renderArenaHands(true);
    if (typeof spawnFloatingText === "function") spawnFloatingText("arena-combat-enemy-avatar", "👁️ ¡REVELADO!", "magic");
    addLog("👁️ Espionaje activo: Has revelado la carta oculta del rival.", "magic");
  }
  window.arenaPlayerSpy = arenaPlayerSpy;

  function arenaPlayerSwap() {
    if (!arenaMatch || !arenaMatch.skillsUsed || arenaMatch.skillsUsed.swap) return;
    if (arenaMatch.playerHand.length === 0 || arenaMatch.deck.length === 0) return;
    arenaMatch.skillsUsed.swap = true;
    const btn = document.getElementById("btn-arena-swap");
    if (btn) btn.classList.add("used");
    try { playTacticalAbilitySound(); } catch (_) {}
    
    // Descarta la última carta y roba otra
    arenaMatch.playerHand.pop();
    arenaMatch.playerHand.push(arenaMatch.deck.pop());
    renderArenaHands(false);
    if (typeof spawnFloatingText === "function") spawnFloatingText("arena-combat-player-avatar", "🔄 CAMBIAZO", "magic");
    addLog("🔄 Cambiazo: Has sustituido tu última carta por otra del mazo.", "magic");
    
    if (calculateHandScore(arenaMatch.playerHand) > 21) {
      arenaPlayerStand();
    }
  }
  window.arenaPlayerSwap = arenaPlayerSwap;

  function arenaPlayerSteal() {
    if (!arenaMatch || !arenaMatch.skillsUsed || arenaMatch.skillsUsed.steal) return;
    if (arenaMatch.rivalHand.length === 0) return;
    arenaMatch.skillsUsed.steal = true;
    const btn = document.getElementById("btn-arena-steal");
    if (btn) btn.classList.add("used");
    try { playTacticalAbilitySound(); } catch (_) {}
    
    // Roba una carta aleatoria del rival
    const stealIndex = Math.floor(Math.random() * arenaMatch.rivalHand.length);
    const stolen = arenaMatch.rivalHand.splice(stealIndex, 1)[0];
    arenaMatch.playerHand.push(stolen);
    
    renderArenaHands(false);
    if (typeof spawnFloatingText === "function") {
      spawnFloatingText("arena-combat-enemy-avatar", "🥷 ROBO", "damage");
      setTimeout(() => spawnFloatingText("arena-combat-player-avatar", "+1 CARTA", "magic"), 300);
    }
    addLog(`🥷 Robo impecable: Le has arrebatado un [${stolen.value} de ${stolen.suit}] al rival.`, "magic");
    
    if (calculateHandScore(arenaMatch.playerHand) > 21) {
      arenaPlayerStand();
    }
  }
  window.arenaPlayerSteal = arenaPlayerSteal;

  function arenaPlayerStand() {
    if (!arenaMatch) return;
    document.getElementById("arena-actions")?.classList.add("hidden");

    // El rival juega según su umbral de plantarse
    let rScore = calculateHandScore(arenaMatch.rivalHand);
    const threshold = arenaMatch.rival.standThreshold || 17;
    while (rScore < threshold) {
      if (arenaMatch.deck.length === 0) {
        arenaMatch.deck = buildStandardDeck();
        shuffleArray(arenaMatch.deck);
      }
      arenaMatch.rivalHand.push(arenaMatch.deck.pop());
      rScore = calculateHandScore(arenaMatch.rivalHand);
    }

    renderArenaHands(true);

    const pScore = calculateHandScore(arenaMatch.playerHand);
    const pNaturalBJ = (pScore === 21 && arenaMatch.playerHand.length === 2);
    const rNaturalBJ = (rScore === 21 && arenaMatch.rivalHand.length === 2);
    let playerWonRound = false;
    let isDraw = false;
    let title = "";
    const mult = arenaMatch.isSuddenDeath ? 2 : 1;

    if (pScore > 21 && rScore > 21) {
      title = `💥 AMBOS EN BUST (${pScore} vs ${rScore}). Empate de ronda.`;
      isDraw = true;
    } else if (pScore > 21) {
      const dmg = Math.max(10, (arenaMatch.rival.pwr || 14) - (arenaMatch.playerStats.def || 6)) * mult;
      arenaMatch.playerStats.hp = Math.max(0, arenaMatch.playerStats.hp - dmg);
      title = `💥 BUST: Te pasaste de 21. El rival asesta ${dmg} daño.`;
      arenaMatch.rivalWins++;
    } else if (rScore > 21) {
      let dmg = Math.max(10, (arenaMatch.playerStats.pwr || 12) - (arenaMatch.rival.def || 6)) * mult;
      const multCard1 = arenaMatch.playerHand && arenaMatch.playerHand.find(c => c && c.operator === "mult");
      if (multCard1) { dmg = Math.round(dmg * 2); }
      arenaMatch.rivalHp = Math.max(0, arenaMatch.rivalHp - dmg);
      title = `🎉 ¡${arenaMatch.rival.name} hizo BUST! Asestas ${dmg} daño.`;
      arenaMatch.playerWins++;
      playerWonRound = true;
    } else if (pNaturalBJ && !rNaturalBJ) {
      let dmg = Math.max(12, (arenaMatch.playerStats.pwr || 12) + 5 - (arenaMatch.rival.def || 6)) * mult;
      const multCard = arenaMatch.playerHand && arenaMatch.playerHand.find(c => c && c.operator === "mult");
      if (multCard) { dmg = Math.round(dmg * 2); }
      arenaMatch.rivalHp = Math.max(0, arenaMatch.rivalHp - dmg);
      title = `❤️‍🔥 ¡BLACKJACK NATURAL! Superas a ${arenaMatch.rival.name}: -${dmg} HP.`;
      arenaMatch.playerWins++;
      playerWonRound = true;
    } else if (!pNaturalBJ && rNaturalBJ) {
      const dmg = Math.max(12, (arenaMatch.rival.pwr || 14) + 5 - (arenaMatch.playerStats.def || 6)) * mult;
      arenaMatch.playerStats.hp = Math.max(0, arenaMatch.playerStats.hp - dmg);
      title = `💀 ¡${arenaMatch.rival.name} tiene Blackjack Natural!: recibes ${dmg} daño.`;
      arenaMatch.rivalWins++;
    } else if (pScore > rScore) {
      let dmg = Math.max(8, (arenaMatch.playerStats.pwr || 12) + (pScore - rScore) - (arenaMatch.rival.def || 6)) * mult;
      const multCard2 = arenaMatch.playerHand && arenaMatch.playerHand.find(c => c && c.operator === "mult");
      if (multCard2) { dmg = Math.round(dmg * 2); }
      arenaMatch.rivalHp = Math.max(0, arenaMatch.rivalHp - dmg);
      title = `🎉 ¡${pScore} vs ${rScore}! Victoria de ronda: -${dmg} HP al rival.`;
      arenaMatch.playerWins++;
      playerWonRound = true;
    } else if (rScore > pScore) {
      const dmg = Math.max(8, (arenaMatch.rival.pwr || 14) + (rScore - pScore) - (arenaMatch.playerStats.def || 6)) * mult;
      arenaMatch.playerStats.hp = Math.max(0, arenaMatch.playerStats.hp - dmg);
      title = `❌ ${rScore} vs ${pScore}. Ronda para el rival: recibes ${dmg} daño.`;
      arenaMatch.rivalWins++;
    } else {
      title = `🤝 Empate exacto (${pScore} vs ${rScore}). Se repite la ronda.`;
      isDraw = true;
    }

    if (isDraw) {
      arenaMatch.isDrawRound = true;
    } else {
      arenaMatch.isDrawRound = false;
    }

    const hpPlayer = document.getElementById("arena-score-player-hp");
    const hpRival = document.getElementById("arena-score-rival-hp");
    if (hpPlayer) hpPlayer.innerText = arenaMatch.playerStats.hp;
    if (hpRival) hpRival.innerText = arenaMatch.rivalHp;

    const resEl = document.getElementById("arena-round-result");
    const titleEl = document.getElementById("arr-title");
    if (titleEl) titleEl.innerText = title;
    const nextBtn = document.querySelector(".arena-next-round-btn") || document.getElementById("btn-arena-next-round");
    if (nextBtn) nextBtn.disabled = false;
    if (resEl) resEl.classList.remove("hidden");

    if (playerWonRound) {
      try { playWinFanfareSound(); } catch (_) {}
    } else if (!isDraw) {
      try { playCardBustSound(); } catch (_) {}
    }
  }
  window.arenaPlayerStand = arenaPlayerStand;

  function arenaNextRound() {
    if (!arenaMatch) return;
    if (arenaMatch._settling) return;
    arenaMatch._settling = true;
    const nextBtn = document.querySelector(".arena-next-round-btn") || document.getElementById("btn-arena-next-round");
    if (nextBtn) nextBtn.disabled = true;

    // Verificar si el combate concluyó por victorias (BO3) o por HP
    const isPlayerWin = arenaMatch.playerWins >= 2 || arenaMatch.rivalHp <= 0;
    const isRivalWin = arenaMatch.rivalWins >= 2 || arenaMatch.playerStats.hp <= 0;

    if (isPlayerWin || (arenaMatch.isSuddenDeath && arenaMatch.playerWins > arenaMatch.rivalWins)) {
      // VICTORIA FINAL DEL DUELO
      const trophies = parseInt(localStorage.getItem("blackjack_arena_trophies") || "1250", 10) + 35;
      const extraArenaCoins = getPersistentExtraCards().some(c => (c.specialId || c.id) === "club_jack_thief") ? 15 : 0;
      const skulls = getPlayerCryptCoins() + 20 + extraArenaCoins;
      localStorage.setItem("blackjack_arena_trophies", trophies.toString());
      localStorage.setItem("bj_crypt_coins", skulls.toString());

      // Guardar en historial
      saveArenaMatchHistory({
        rival: arenaMatch.rival.name,
        result: "win",
        trophiesDelta: +35,
        timestamp: Date.now()
      });

      const bonusMsg = extraArenaCoins > 0 ? ` (¡+15 por Jota de Fortuna!)` : "";
      showGameAlert(`Has derrotado a ${arenaMatch.rival.name}.
+35 Trofeos de Ranking (Total: ${trophies})
+20 Monedas de Cripta 💀${bonusMsg}`, "🏆 VICTORIA EN LA ARENA", openArenaPvpModal);
      return;
    } else if (isRivalWin || (arenaMatch.isSuddenDeath && arenaMatch.rivalWins > arenaMatch.playerWins)) {
      // DERROTA FINAL DEL DUELO
      const trophies = Math.max(1000, parseInt(localStorage.getItem("blackjack_arena_trophies") || "1250", 10) - 15);
      localStorage.setItem("blackjack_arena_trophies", trophies.toString());

      saveArenaMatchHistory({
        rival: arenaMatch.rival.name,
        result: "loss",
        trophiesDelta: -15,
        timestamp: Date.now()
      });

      showGameAlert(`${arenaMatch.rival.name} se llevó el duelo.
-15 Trofeos (Total: ${trophies})`, "☠️ DERROTA EN LA ARENA", openArenaPvpModal);
      return;
    }

    // Si fue empate de ronda, repetir sin avanzar número de ronda
    if (arenaMatch.isDrawRound) {
      arenaMatch.isDrawRound = false;
      initArenaRound();
      return;
    }

    // Si completaron la ronda 3 y siguen empatados, activar MUERTE SÚBITA
    if (arenaMatch.round >= 3 && arenaMatch.playerWins === arenaMatch.rivalWins) {
      arenaMatch.isSuddenDeath = true;
      initArenaRound();
      return;
    }

    arenaMatch.round++;
    initArenaRound();
  }
  window.arenaNextRound = arenaNextRound;

  function saveArenaMatchHistory(entry) {
    try {
      const hist = parseJSONArray(localStorage.getItem("bj_arena_history"), []);
      hist.unshift(entry);
      localStorage.setItem("bj_arena_history", JSON.stringify(hist.slice(0, 10)));
    } catch (_) {}
  }

  /* ============================================================
     SISTEMA DE PESTAÑAS, MERCADO BALATRO-LIKE Y RANKING DE ARENA (FASE 3)
     ============================================================ */
  function switchArenaTab(tab) {
    try { playButtonClickSound(); } catch (_) {}
    const tabs = ['battles', 'market', 'ranking'];
    tabs.forEach(t => {
      const btn = document.getElementById(`btn-arena-${t}`);
      const pane = document.getElementById(`arena-view-${t}`);
      if (btn) {
        if (t === tab) btn.classList.add("active");
        else btn.classList.remove("active");
      }
      if (pane) {
        if (t === tab) pane.classList.remove("hidden");
        else pane.classList.add("hidden");
      }
    });

    if (tab === "battles") {
      document.getElementById("arena-stage-lobby")?.classList.remove("hidden");
      document.getElementById("arena-stage-battle")?.classList.add("hidden");
    } else if (tab === "market") {
      renderArenaMarket();
    } else if (tab === "ranking") {
      renderArenaRanking();
    }
  }
  window.switchArenaTab = switchArenaTab;

  const MARKET_REFRESH_INTERVAL_MS = 5 * 60 * 60 * 1000; // 5 horas

  function getMarketStock() {
    const KEY = "bj_market_stock_v1";
    let data = null;
    try {
      data = JSON.parse(localStorage.getItem(KEY));
    } catch (_) {}

    const now = Date.now();
    if (!data || !data.nextRefreshAt || now >= data.nextRefreshAt || !Array.isArray(data.slots) || data.slots.length === 0) {
      // Generar nuevo stock determinista con 4 cartas seleccionadas
      const allPool = SPECIAL_DYNAMIC_CARDS.map(c => ({
        id: c.specialId || c.id,
        name: c.name,
        card: `${c.suit} ${c.rank}`,
        icon: c.icon,
        cost: c.cost || 60,
        desc: c.desc,
        rarity: c.rarity || "rare",
        cardType: c.cardType || "seal",
        sealTheme: c.sealTheme || "gold",
        abilityAction: c.abilityAction || null
      }));

      // Barajar y tomar 4 cartas únicas
      const shuffled = allPool.slice().sort(() => 0.5 - Math.random());
      const slots = shuffled.slice(0, 4);

      data = {
        seed: now,
        slots: slots,
        nextRefreshAt: now + MARKET_REFRESH_INTERVAL_MS
      };
      localStorage.setItem(KEY, JSON.stringify(data));
    }
    return data;
  }
  window.getMarketStock = getMarketStock;

  function refreshMarketStockManual() {
    const skulls = getPlayerCryptCoins();
    if (skulls < 40) {
      showGameToast("Necesitas 40 Monedas de Cripta para refrescar.", "warn");
      return;
    }
    localStorage.setItem("bj_crypt_coins", String(skulls - 40));
    const ccEl = document.getElementById("ui-crypt-coins"); if (ccEl) ccEl.innerText = String(skulls - 40);
    const accEl = document.getElementById("arena-skulls-val"); if (accEl) accEl.innerText = String(skulls - 40);
    localStorage.removeItem("bj_market_stock_v1");
    renderArenaMarket();
    showGameToast("¡Mercado rotado con éxito! (-40 Criptas)", "heal");
    try { playCardDealSound(); } catch (_) {}
  }
  window.refreshMarketStockManual = refreshMarketStockManual;

  let marketTimerInterval = null;
  function renderArenaMarket() {
    const listEl = document.getElementById("arena-market-list");
    if (!listEl) return;
    const cryptCoins = getPlayerCryptCoins();
    const ownedArenaCards = getPersistentExtraCards().map(c => c.specialId || c.id);
    const stock = getMarketStock();

    const remainingMs = Math.max(0, stock.nextRefreshAt - Date.now());
    const hours = Math.floor(remainingMs / 3600000);
    const mins = Math.floor((remainingMs % 3600000) / 60000);
    const secs = Math.floor((remainingMs % 60000) / 1000);
    const timeStr = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    let html = `
      <div class="market-refresh-bar" style="display:flex;justify-content:space-between;align-items:center;background:rgba(0,0,0,0.4);border:1px solid rgba(102,252,241,0.25);border-radius:8px;padding:6px 10px;margin-bottom:8px;">
        <span style="font-size:9px;color:#a8dadc;">⏳ Rotación en: <b id="market-countdown-timer" style="color:#66fcf1;">${timeStr}</b></span>
        <button class="market-refresh-btn" onclick="refreshMarketStockManual()" style="background:#45a29e;color:#0b0c10;border:none;border-radius:4px;font-size:8px;font-weight:bold;padding:4px 8px;cursor:pointer;">
          🔄 REFRESCAR (💀 40)
        </button>
      </div>
    `;

    html += stock.slots.map(c => {
      const isOwned = ownedArenaCards.includes(c.id);
      const canAfford = cryptCoins >= c.cost;
      const tagHtml = c.cardType === "ability"
        ? `<span class="amc-tag tag-ability">⚡ HABILIDAD ACTIVA</span>`
        : `<span class="amc-tag tag-seal ${c.sealTheme || 'gold'}">🔮 SELLO ${(c.sealTheme || 'ORO').toUpperCase()}</span>`;
      return `
        <div class="arena-market-card ${isOwned ? 'owned' : ''}">
          <div class="amc-left">
            <div class="amc-card-badge">${c.card}</div>
            <div class="amc-info">
              <div class="amc-title">${c.icon} ${c.name}</div>
              <div class="amc-desc">${c.desc}</div>
              <div>${tagHtml}</div>
            </div>
          </div>
          <div class="amc-right">
            ${isOwned 
              ? `<button class="arena-market-btn owned">✓ ADQUIRIDA</button>`
              : (canAfford 
                ? `<button class="arena-market-btn buy" onclick="buyArenaMarketCard('${c.id}', ${c.cost})">💀 ${c.cost} CRIPTAS</button>`
                : `<button class="arena-market-btn disabled" disabled>💀 ${c.cost} CRIPTAS</button>`
              )
            }
          </div>
        </div>
      `;
    }).join("");

    listEl.innerHTML = html;

    // Temporizador vivo
    if (marketTimerInterval) clearInterval(marketTimerInterval);
    marketTimerInterval = setInterval(() => {
      const cdEl = document.getElementById("market-countdown-timer");
      if (!cdEl) {
        clearInterval(marketTimerInterval);
        return;
      }
      const stockCur = getMarketStock();
      const rMs = Math.max(0, stockCur.nextRefreshAt - Date.now());
      if (rMs === 0) {
        renderArenaMarket();
        return;
      }
      const h = Math.floor(rMs / 3600000);
      const m = Math.floor((rMs % 3600000) / 60000);
      const s = Math.floor((rMs % 60000) / 1000);
      cdEl.innerText = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }, 1000);
  }
  window.renderArenaMarket = renderArenaMarket;

  function buyArenaMarketCard(cardId, cost) {
    const cryptCoins = getPlayerCryptCoins();
    if (cryptCoins < cost) {
      showGameToast("No posees suficientes Monedas de Cripta.", "warn");
      return;
    }

    const cardDef = SPECIAL_DYNAMIC_CARDS.find(c => (c.specialId || c.id) === cardId);
    if (!cardDef) {
      showGameToast("Carta no encontrada en el catálogo.", "error");
      return;
    }

    // Comprobar si ya existe en mazo
    const currentExtras = getPersistentExtraCards();
    const alreadyOwned = currentExtras.some(c => (c.specialId || c.id) === cardId);
    if (alreadyOwned) {
      showGameToast("Ya posees esta carta en tu mazo.", "warn");
      return;
    }

    localStorage.setItem("bj_crypt_coins", String(cryptCoins - cost));
    const ccEl = document.getElementById("ui-crypt-coins"); if (ccEl) ccEl.innerText = String(cryptCoins - cost);
    const accEl = document.getElementById("arena-skulls-val"); if (accEl) accEl.innerText = String(cryptCoins - cost);
    
    // Se guarda en el mazo principal como override
    savePersistentExtraCard(cardDef);
    
    renderArenaMarket();
    renderArenaRanking();
    showGameToast("¡Carta bendita agregada a tu baraja!", "heal");
    try { playCardDealSound(); } catch (_) {}
  }
  window.buyArenaMarketCard = buyArenaMarketCard;

  function renderArenaRanking() {
    const listEl = document.getElementById("arena-ranking-list");
    if (!listEl) return;
    const trophies = parseInt(localStorage.getItem("blackjack_arena_trophies") || "1250", 10);
    const history = parseJSONArray(localStorage.getItem("bj_arena_history"), []);

    const tiers = [
      { name: "👑 CÚSPIDE SUPREMA", minTrophies: 2200, reward: "+150 Criptas por Victoria", icon: "👑" },
      { name: "💎 LIGA DIAMANTE", minTrophies: 1800, reward: "+100 Criptas por Victoria", icon: "💎" },
      { name: "🥇 LIGA ORO", minTrophies: 1500, reward: "+75 Criptas por Victoria", icon: "🥇" },
      { name: "🥈 LIGA PLATA", minTrophies: 1200, reward: "+50 Criptas por Victoria", icon: "🥈" },
      { name: "🥉 LIGA BRONCE", minTrophies: 1000, reward: "+25 Criptas por Victoria", icon: "🥉" }
    ];

    const topRankings = [
      { rank: 1, name: "LORD CORONA", avatar: "👑", trophies: 2450, tag: "LIGA SUPREMA" },
      { rank: 2, name: "VÍBORA NEGRA", avatar: "🐍", trophies: 2180, tag: "LIGA MAESTRO" },
      { rank: 3, name: "SHADOW_JACK", avatar: "🎭", trophies: 1950, tag: "LIGA DIAMANTE" },
      { rank: 4, name: "HERALDO DEL 21 (TÚ)", avatar: "🛡️", trophies: trophies, tag: "TU ESCALAFÓN", isPlayer: true },
      { rank: 5, name: "DANTE DE PICAS", avatar: "🗡️", trophies: 1280, tag: "LIGA ORO" },
      { rank: 6, name: "CABALLERO NOCTURNO", avatar: "🌑", trophies: 1120, tag: "LIGA PLATA" }
    ].sort((a, b) => b.trophies - a.trophies);

    let html = `<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px;">`;
    html += tiers.map(t => {
      const isCurrent = trophies >= t.minTrophies && (t.minTrophies === 2200 || trophies < t.minTrophies + 300);
      return `
        <div class="arena-rank-tier-row ${isCurrent ? 'current-tier' : ''}">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:18px;">${t.icon}</span>
            <div>
              <div style="font-family:var(--font-pixel);font-size: 9px;color:${isCurrent ? '#ffd166' : '#fff'};font-weight:bold;">${t.name}</div>
              <div style="font-size: 9px;color:#94a3b8;">${t.minTrophies}+ Trofeos • ${t.reward}</div>
            </div>
          </div>
          <div style="font-family:var(--font-pixel);font-size: 9px;color:${isCurrent ? '#ffd166' : '#64748b'};">
            ${isCurrent ? '★ TU LIGA ACTUAL' : 'BLOQUEADO'}
          </div>
        </div>
      `;
    }).join("");
    html += `</div>`;

    html += `<div style="font-family:var(--font-pixel);font-size:8.5px;color:#66fcf1;margin-bottom:6px;">🏆 ESCALAFÓN DE GLADIADORES</div>`;
    html += `<div class="arena-ranking-table">`;
    html += topRankings.map((p, idx) => `
      <div class="ranking-row ${p.isPlayer ? 'player-row' : ''}" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-bottom:1px solid rgba(255,255,255,0.06);${p.isPlayer ? 'background:rgba(42,157,143,0.18);border:1px solid #2a9d8f;border-radius:6px;' : ''}">
        <div style="display:flex;align-items:center;gap:8px;">
          <b style="color:${idx === 0 ? '#ffd166' : '#cbd5e1'};width:18px;">#${idx + 1}</b>
          <span style="font-size:14px;">${p.avatar}</span>
          <div>
            <div style="font-size:9px;font-weight:bold;${p.isPlayer ? 'color:#66fcf1;' : 'color:#f8f9fa;'}">${p.name}</div>
            <div style="font-size:7px;opacity:0.6;">${p.tag}</div>
          </div>
        </div>
        <div style="text-align:right;">
          <b style="color:#ffd166;font-size:10px;">🏆 ${p.trophies.toLocaleString()}</b>
        </div>
      </div>
    `).join("");
    html += `</div>`;

    if (history.length > 0) {
      html += `
        <div style="margin-top:12px;">
          <div style="font-family:var(--font-pixel);font-size:8px;color:#a8dadc;margin-bottom:4px;">📜 ÚLTIMOS DUELOS</div>
          ${history.slice(0, 4).map(h => `
            <div style="display:flex;justify-content:space-between;align-items:center;background:rgba(0,0,0,0.3);padding:4px 8px;margin-bottom:3px;border-radius:4px;font-size:8px;">
              <span>${h.result === 'win' ? '🟢 Victoria' : '🔴 Derrota'} vs ${h.rival}</span>
              <b style="color:${h.trophiesDelta > 0 ? '#2a9d8f' : '#e63946'};">${h.trophiesDelta > 0 ? '+' : ''}${h.trophiesDelta} 🏆</b>
            </div>
          `).join("")}
        </div>
      `;
    }

    listEl.innerHTML = html;
  }
  window.renderArenaRanking = renderArenaRanking;





  /* ============================================================
     SISTEMA DE LOGROS Y PROGRESIÓN PERMANENTE (FASE 5)
     ============================================================ */
  const ACHIEVEMENTS_CATALOG = [
    // 1. TORRE
    { id: "tower_first_step", family: "tower", icon: "🏰", name: "Primer Ascenso", desc: "Supera el Piso 1 de la Torre del 21." },
    { id: "tower_midway", family: "tower", icon: "⚡", name: "A Mitad del Abismo", desc: "Alcanza el Piso 7 de la Torre en cualquier expedición." },
    { id: "tower_conqueror", family: "tower", icon: "👑", name: "Conquistador del 21", desc: "Derrota al Señor de la Torre en el Piso 13." },
    { id: "tower_dragon_slayer", family: "tower", icon: "🐉", name: "Matadragones", desc: "Vence al Dragón de Obsidiana en combate." },
    { id: "tower_nightmare", family: "tower", icon: "🟣", name: "Pesadilla Superada", desc: "Completa la Torre en dificultad Pesadilla." },

    // 2. COMBATE
    { id: "combat_first_bj", family: "combat", icon: "🃏", name: "Golpe Maestro", desc: "Logra tu primer Blackjack natural (As + 10)." },
    { id: "combat_five_card", family: "combat", icon: "🖐️", name: "Charlie de Cinco Naipes", desc: "Pide 5 o más cartas en mano sin pasarte de 21." },
    { id: "combat_perfect_21", family: "combat", icon: "🎯", name: "Perfección Absoluta", desc: "Gana una mano de combate sumando exactamente 21." },
    { id: "combat_overkill", family: "combat", icon: "💥", name: "Devastación Crítica", desc: "Inflige 40 o más de daño en un solo asalto." },
    { id: "combat_untouchable", family: "combat", icon: "🛡️", name: "Defensa Impecable", desc: "Supera un combate de piso sin recibir daño directo a tu HP." },

    // 3. ECONOMÍA
    { id: "eco_first_gold", family: "economy", icon: "🪙", name: "Primeras Monedas", desc: "Acumula 50 de Oro en una expedición." },
    { id: "eco_hoarder", family: "economy", icon: "💰", name: "Tesoro del Tahúr", desc: "Alcanza 200 de Oro en una expedición." },
    { id: "eco_first_crypt", family: "economy", icon: "💀", name: "Monedas de Cripta", desc: "Obtén tus primeras Monedas de Cripta." },
    { id: "eco_crypt_rich", family: "economy", icon: "💎", name: "Opulencia Sepulcral", desc: "Posee 100 o más Monedas de Cripta en reserva." },
    { id: "eco_big_spender", family: "economy", icon: "🛒", name: "Cliente Distinguido", desc: "Compra artículos en el Bazar de la Torre." },

    // 4. COLECCIÓN
    { id: "col_first_hero", family: "collection", icon: "🗡️", name: "Nuevo Campeón", desc: "Desbloquea a cualquier héroe alternativo." },
    { id: "col_all_heroes", family: "collection", icon: "🌟", name: "Los Cuatro Heraldos", desc: "Desbloquea los 4 héroes disponibles." },
    { id: "col_first_loot_card", family: "collection", icon: "🂠", name: "Botín de Victoria", desc: "Consigue tus primeras cartas de botín permanente." },
    { id: "col_full_loot_deck", family: "collection", icon: "🏆", name: "Mazo Legendario", desc: "Alcanza 6 o más cartas de botín en tu baraja." },
    { id: "col_relic_collector", family: "collection", icon: "🔮", name: "Poder Arcano", desc: "Equipa reliquias arcanas en tu expedición." },

    // 5. ARENA Y DIARIO
    { id: "arena_first_win", family: "arena", icon: "⚔️", name: "Primer Gladiador", desc: "Gana tu primer duelo al mejor de 3 en la Arena." },
    { id: "arena_sudden_death", family: "arena", icon: "🔥", name: "Al Filo de la Muerte", desc: "Gana un duelo de la Arena durante la Muerte Súbita." },
    { id: "arena_trophy_1500", family: "arena", icon: "🥇", name: "Rango Ascendido", desc: "Alcanza 1.350 o más Trofeos en la Arena." },
    { id: "daily_first_login", family: "arena", icon: "📅", name: "Visitante Fiel", desc: "Reclama tu primera recompensa de conexión diaria." },
    { id: "daily_streak_3", family: "arena", icon: "🔥", name: "Pacto Inquebrantable", desc: "Mantén una racha de conexión de 3 o más días." }
  ];
  window.ACHIEVEMENTS_CATALOG = ACHIEVEMENTS_CATALOG;

  function getUnlockedAchievements() {
    try {
      const raw = localStorage.getItem("bj_achievements_v1");
      return raw ? JSON.parse(raw) : {};
    } catch (_) { return {}; }
  }
  window.getUnlockedAchievements = getUnlockedAchievements;

  function unlockAchievement(achId) {
    const ach = ACHIEVEMENTS_CATALOG.find(a => a.id === achId);
    if (!ach) return;
    const unlocked = getUnlockedAchievements();
    if (unlocked[achId]) return;

    unlocked[achId] = Date.now();
    try {
      localStorage.setItem("bj_achievements_v1", JSON.stringify(unlocked));
    } catch (_) {}

    try { playWinFanfareSound(); } catch (_) {}
    if (typeof showGameToast === "function") {
      showGameToast(`🏆 ¡LOGRO DESBLOQUEADO!\n${ach.name} — ${ach.desc}`, "epic");
    }
  }
  window.unlockAchievement = unlockAchievement;

  let currentAchievementsFilter = "all";

  function openAchievementsModal(family = "all") {
    currentAchievementsFilter = family;
    renderAchievementsList();
    const modal = document.getElementById("screen-achievements-modal");
    if (modal) modal.classList.remove("hidden");
    try { playButtonClickSound(); } catch (_) {}
  }
  window.openAchievementsModal = openAchievementsModal;

  function closeAchievementsModal() {
    const modal = document.getElementById("screen-achievements-modal");
    if (modal) modal.classList.add("hidden");
  }
  window.closeAchievementsModal = closeAchievementsModal;

  function filterAchievementsFamily(family) {
    currentAchievementsFilter = family;
    const btns = document.querySelectorAll(".ach-filter-btn");
    btns.forEach(btn => {
      if (btn.getAttribute("data-family") === family) btn.classList.add("active");
      else btn.classList.remove("active");
    });
    renderAchievementsList();
    try { playButtonClickSound(); } catch (_) {}
  }
  window.filterAchievementsFamily = filterAchievementsFamily;

  function renderAchievementsList() {
    const listEl = document.getElementById("achievements-list");
    if (!listEl) return;

    const unlocked = getUnlockedAchievements();
    const totalCount = ACHIEVEMENTS_CATALOG.length;
    const unlockedCount = Object.keys(unlocked).length;
    const percent = Math.round((unlockedCount / Math.max(1, totalCount)) * 100);

    const fillEl = document.getElementById("ach-progress-fill");
    const pctEl = document.getElementById("ach-progress-percent");
    const cntEl = document.getElementById("ach-progress-count");
    if (fillEl) fillEl.style.width = `${percent}%`;
    if (pctEl) pctEl.innerText = `${percent}%`;
    if (cntEl) cntEl.innerText = `${unlockedCount} / ${totalCount} Desafíos Completados`;

    const filtered = currentAchievementsFilter === "all"
      ? ACHIEVEMENTS_CATALOG
      : ACHIEVEMENTS_CATALOG.filter(a => a.family === currentAchievementsFilter);

    listEl.innerHTML = filtered.map(ach => {
      const isDone = !!unlocked[ach.id];
      return `
        <div class="achievement-row ${isDone ? 'unlocked' : ''}">
          <div class="ach-icon-box">${ach.icon}</div>
          <div class="ach-info-box">
            <div class="ach-name">${ach.name} ${isDone ? '<span>✓</span>' : ''}</div>
            <div class="ach-desc">${ach.desc}</div>
          </div>
          <div class="ach-status-badge ${isDone ? 'done' : 'locked'}">
            ${isDone ? 'COMPLETADO' : 'BLOQUEADO'}
          </div>
        </div>
      `;
    }).join("");
  }
  window.renderAchievementsList = renderAchievementsList;
