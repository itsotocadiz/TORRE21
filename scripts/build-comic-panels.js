/**
 * Generador de Paneles Verticales de Cómic para TORRE 21: El Pacto de Black Jack
 * Genera 7 paneles SVG vectoriales verticales (340x460) en assets/comic_panel_1.svg a assets/comic_panel_7.svg
 */
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.resolve(__dirname, '..', 'assets');

const panels = [
  // Panel 1: La Torre y el Pacto Maldito
  {
    num: 1,
    title: 'La Maldición del 21',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 460" width="100%" height="100%">
  <defs>
    <linearGradient id="bg1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0a0512"/>
      <stop offset="60%" stop-color="#190a2a"/>
      <stop offset="100%" stop-color="#06020a"/>
    </linearGradient>
    <radialGradient id="bloodMoon" cx="70%" cy="25%" r="45%">
      <stop offset="0%" stop-color="#ff4d4d"/>
      <stop offset="40%" stop-color="#b30000"/>
      <stop offset="100%" stop-color="#3d0000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="towerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0e131d"/>
      <stop offset="50%" stop-color="#1d2636"/>
      <stop offset="100%" stop-color="#0a0e17"/>
    </linearGradient>
    <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="340" height="460" fill="url(#bg1)"/>
  <!-- Luna ensangrentada -->
  <circle cx="230" cy="110" r="70" fill="url(#bloodMoon)"/>
  <circle cx="230" cy="110" r="48" fill="#ff3344" opacity="0.85"/>
  <circle cx="218" cy="98" r="38" fill="#ff5566" opacity="0.4"/>
  <!-- Nubes tenebrosas y niebla -->
  <path d="M-20 180 Q60 140 160 170 T360 150 L360 460 L-20 460 Z" fill="#110820" opacity="0.6"/>
  <path d="M-20 230 Q80 200 200 220 T360 210 L360 460 L-20 460 Z" fill="#090510" opacity="0.8"/>
  <!-- Silueta de la Torre del 21 -->
  <path d="M120 460 L135 120 L150 70 L170 30 L190 70 L205 120 L220 460 Z" fill="url(#towerGrad)"/>
  <!-- Almenas y ventanas brillantes -->
  <polygon points="170,18 162,35 178,35" fill="#ffd166" filter="url(#glow1)"/>
  <rect x="165" y="85" width="10" height="24" rx="5" fill="#66fcf1" opacity="0.85" filter="url(#glow1)"/>
  <rect x="163" y="145" width="14" height="28" rx="6" fill="#ffd166" opacity="0.75"/>
  <rect x="160" y="215" width="20" height="32" rx="6" fill="#ff4d4d" opacity="0.8"/>
  <rect x="156" y="295" width="28" height="40" rx="6" fill="#66fcf1" opacity="0.6"/>
  <!-- Cartas flotantes malditas -->
  <g transform="translate(60, 160) rotate(-18)">
    <rect width="38" height="54" rx="4" fill="#1b2434" stroke="#e63946" stroke-width="2"/>
    <text x="19" y="34" fill="#e63946" font-family="monospace" font-size="20" font-weight="bold" text-anchor="middle">♠</text>
  </g>
  <g transform="translate(240, 240) rotate(22)">
    <rect width="42" height="60" rx="4" fill="#1b2434" stroke="#ffd166" stroke-width="2"/>
    <text x="21" y="38" fill="#ffd166" font-family="monospace" font-size="22" font-weight="bold" text-anchor="middle">21</text>
  </g>
  <!-- Niebla basal -->
  <ellipse cx="170" cy="450" rx="190" ry="40" fill="#000000" opacity="0.9"/>
  <!-- Runa del 21 en el cielo -->
  <text x="170" y="445" fill="#66fcf1" font-family="monospace" font-size="12" letter-spacing="4" text-anchor="middle" opacity="0.8">EL PACTO DEL ABISMO</text>
</svg>`
  },

  // Panel 2: Los Cuatro Heraldos
  {
    num: 2,
    title: 'Los Heraldos de la Luz',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 460" width="100%" height="100%">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0d1b2a"/>
      <stop offset="50%" stop-color="#1b263b"/>
      <stop offset="100%" stop-color="#070a0e"/>
    </linearGradient>
    <radialGradient id="portalLight" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#48cae4" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#0077b6" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="5" result="b"/>
      <feComposite in="SourceGraphic" in2="b" operator="over"/>
    </filter>
  </defs>
  <rect width="340" height="460" fill="url(#bg2)"/>
  <!-- Portal Arcano en el horizonte -->
  <ellipse cx="170" cy="200" rx="130" ry="170" fill="url(#portalLight)"/>
  <ellipse cx="170" cy="200" rx="90" ry="130" fill="none" stroke="#66fcf1" stroke-width="3" stroke-dasharray="12 6" opacity="0.7"/>
  <!-- Gran arco de piedra de la entrada -->
  <path d="M40 460 L40 220 Q170 120 300 220 L300 460 Z" fill="none" stroke="#2c3e50" stroke-width="14"/>
  <!-- Siluetas de los 4 Héroes -->
  <!-- 1. Caballero (Izquierda exterior) -->
  <g transform="translate(45, 270)">
    <path d="M25 50 L10 170 L40 170 Z" fill="#1e293b"/>
    <circle cx="25" cy="40" r="14" fill="#334155"/>
    <!-- Yelmo y espada -->
    <path d="M20 32 L30 32 L25 22 Z" fill="#ffd166"/>
    <line x1="5" y1="60" x2="5" y2="150" stroke="#94a3b8" stroke-width="4"/>
    <line x1="-3" y1="80" x2="13" y2="80" stroke="#ffd166" stroke-width="3"/>
  </g>
  <!-- 2. Hechicera (Izquierda centro) con báculo brillante -->
  <g transform="translate(105, 250)">
    <path d="M30 65 L10 190 L50 190 Z" fill="#2d1b4e"/>
    <circle cx="30" cy="48" r="12" fill="#4a287a"/>
    <!-- Sombrero cónico -->
    <polygon points="18,48 42,48 30,15" fill="#6a38aa"/>
    <!-- Orbe mágico -->
    <circle cx="55" cy="70" r="9" fill="#e0aaff" filter="url(#glow2)"/>
    <line x1="55" y1="70" x2="55" y2="185" stroke="#7b2cbf" stroke-width="3"/>
  </g>
  <!-- 3. Asesino / Pícaro (Derecha centro) con dagas gemelas -->
  <g transform="translate(180, 265)">
    <path d="M25 55 L8 175 L42 175 Z" fill="#14213d"/>
    <circle cx="25" cy="44" r="12" fill="#1f325c"/>
    <!-- Capucha y bufanda escarlata -->
    <path d="M16 48 L34 48 L25 32 Z" fill="#0f172a"/>
    <path d="M20 56 Q35 65 42 85" stroke="#e63946" stroke-width="4" fill="none"/>
    <line x1="45" y1="80" x2="52" y2="120" stroke="#66fcf1" stroke-width="2.5" filter="url(#glow2)"/>
  </g>
  <!-- 4. Paladín / Monje (Derecha exterior) con mazo/escudo -->
  <g transform="translate(245, 255)">
    <path d="M25 60 L5 185 L45 185 Z" fill="#264653"/>
    <circle cx="25" cy="44" r="13" fill="#2a9d8f"/>
    <!-- Escudo solar dorado -->
    <ellipse cx="5" cy="100" rx="14" ry="24" fill="#e76f51" stroke="#ffd166" stroke-width="3"/>
    <text x="5" y="106" fill="#ffd166" font-size="14" text-anchor="middle">✦</text>
  </g>
  <!-- Suelo de losas rúnicas -->
  <path d="M0 430 L340 430 L340 460 L0 460 Z" fill="#050811"/>
  <text x="170" y="448" fill="#ffd166" font-family="monospace" font-size="11" letter-spacing="3" text-anchor="middle">CUATRO DESTINOS, UN JURAMENTO</text>
</svg>`
  },

  // Panel 3: Los Sellos Arcanos de los Naipes
  {
    num: 3,
    title: 'Los Sellos Arcanos',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 460" width="100%" height="100%">
  <defs>
    <linearGradient id="bg3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#140b24"/>
      <stop offset="50%" stop-color="#1f1438"/>
      <stop offset="100%" stop-color="#0a0512"/>
    </linearGradient>
    <filter id="glow3" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="340" height="460" fill="url(#bg3)"/>
  <!-- Círculo astrológico/mágico central -->
  <circle cx="170" cy="220" r="125" fill="none" stroke="#ffd166" stroke-width="2" stroke-dasharray="6 4" opacity="0.6"/>
  <circle cx="170" cy="220" r="140" fill="none" stroke="#48cae4" stroke-width="1" opacity="0.4"/>
  <circle cx="170" cy="220" r="45" fill="#0d0818" stroke="#ff4d4d" stroke-width="2"/>
  <text x="170" y="228" fill="#ffd166" font-family="monospace" font-size="24" font-weight="bold" text-anchor="middle" filter="url(#glow3)">21</text>
  
  <!-- Sello 1: PICAS (Filo Crítico - Norte) -->
  <g transform="translate(170, 95)">
    <circle cx="0" cy="0" r="32" fill="#182338" stroke="#66fcf1" stroke-width="3" filter="url(#glow3)"/>
    <text x="0" y="10" fill="#66fcf1" font-size="30" text-anchor="middle">♠</text>
    <text x="0" y="44" fill="#a5f3fc" font-family="monospace" font-size="9" text-anchor="middle">FILO CRÍTICO</text>
  </g>

  <!-- Sello 2: CORAZONES (Vitalidad - Este) -->
  <g transform="translate(265, 220)">
    <circle cx="0" cy="0" r="32" fill="#2b111a" stroke="#ff4d6d" stroke-width="3" filter="url(#glow3)"/>
    <text x="0" y="10" fill="#ff4d6d" font-size="28" text-anchor="middle">♥</text>
    <text x="0" y="44" fill="#fda4af" font-family="monospace" font-size="9" text-anchor="middle">VITALIDAD</text>
  </g>

  <!-- Sello 3: DIAMANTES (Égida y Escudo - Sur) -->
  <g transform="translate(170, 345)">
    <circle cx="0" cy="0" r="32" fill="#262210" stroke="#ffd166" stroke-width="3" filter="url(#glow3)"/>
    <text x="0" y="10" fill="#ffd166" font-size="28" text-anchor="middle">♦</text>
    <text x="0" y="44" fill="#fef08a" font-family="monospace" font-size="9" text-anchor="middle">ESCUDO RÚNICO</text>
  </g>

  <!-- Sello 4: TRÉBOLES (Suerte y Maná - Oeste) -->
  <g transform="translate(75, 220)">
    <circle cx="0" cy="0" r="32" fill="#0d261e" stroke="#2ec4b6" stroke-width="3" filter="url(#glow3)"/>
    <text x="0" y="10" fill="#2ec4b6" font-size="28" text-anchor="middle">♣</text>
    <text x="0" y="44" fill="#99f6e4" font-family="monospace" font-size="9" text-anchor="middle">AZAR DIVINO</text>
  </g>

  <!-- Líneas de resonancia mística que unen los 4 palos -->
  <line x1="170" y1="127" x2="235" y2="200" stroke="#ffd166" stroke-width="1.5" opacity="0.6"/>
  <line x1="235" y1="240" x2="190" y2="315" stroke="#ff4d6d" stroke-width="1.5" opacity="0.6"/>
  <line x1="150" y1="315" x2="105" y2="240" stroke="#2ec4b6" stroke-width="1.5" opacity="0.6"/>
  <line x1="105" y1="200" x2="150" y2="127" stroke="#66fcf1" stroke-width="1.5" opacity="0.6"/>

  <text x="170" y="445" fill="#e2e8f0" font-family="monospace" font-size="10" letter-spacing="2" text-anchor="middle">CADA PALO DESPIERTA UN PODER</text>
</svg>`
  },

  // Panel 4: Guardianes del Abismo
  {
    num: 4,
    title: 'Guardianes del Abismo',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 460" width="100%" height="100%">
  <defs>
    <linearGradient id="bg4" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1f090d"/>
      <stop offset="60%" stop-color="#2d1217"/>
      <stop offset="100%" stop-color="#0a0305"/>
    </linearGradient>
    <radialGradient id="lavaGlow" cx="50%" cy="80%" r="50%">
      <stop offset="0%" stop-color="#ff3300" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#990000" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <filter id="glow4" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="5" result="b"/>
      <feComposite in="SourceGraphic" in2="b" operator="over"/>
    </filter>
  </defs>
  <rect width="340" height="460" fill="url(#bg4)"/>
  <ellipse cx="170" cy="380" rx="160" ry="80" fill="url(#lavaGlow)"/>
  <!-- Pilares góticos de calaveras -->
  <rect x="25" y="60" width="30" height="360" fill="#180b0f" rx="6"/>
  <rect x="285" y="60" width="30" height="360" fill="#180b0f" rx="6"/>
  <!-- Bestia / Dragón Guardián colosal -->
  <g transform="translate(170, 200)">
    <!-- Ojos resplandecientes -->
    <ellipse cx="-45" cy="-30" rx="14" ry="8" fill="#ffd166" filter="url(#glow4)"/>
    <ellipse cx="45" cy="-30" rx="14" ry="8" fill="#ffd166" filter="url(#glow4)"/>
    <circle cx="-45" cy="-30" r="4" fill="#990000"/>
    <circle cx="45" cy="-30" r="4" fill="#990000"/>
    <!-- Mandíbula y colmillos -->
    <path d="M-70 10 Q0 60 70 10 L50 80 Q0 120 -50 80 Z" fill="#2d0b13" stroke="#e63946" stroke-width="3"/>
    <!-- Colmillos afilados -->
    <polygon points="-40,15 -30,45 -20,15" fill="#f8fafc"/>
    <polygon points="-10,20 0,55 10,20" fill="#f8fafc"/>
    <polygon points="20,15 30,45 40,15" fill="#f8fafc"/>
    <!-- Garras tenebrosas sujetando cartas de ruina -->
    <g transform="translate(-110, 60) rotate(-25)">
      <rect width="40" height="60" rx="4" fill="#0f0709" stroke="#e63946" stroke-width="2"/>
      <text x="20" y="38" fill="#e63946" font-size="20" font-weight="bold" text-anchor="middle">☠</text>
    </g>
    <g transform="translate(80, 60) rotate(25)">
      <rect width="40" height="60" rx="4" fill="#0f0709" stroke="#ffd166" stroke-width="2"/>
      <text x="20" y="38" fill="#ffd166" font-size="20" font-weight="bold" text-anchor="middle">K</text>
    </g>
  </g>
  <!-- Llamas inferiores -->
  <path d="M0 460 Q40 400 80 440 T160 410 T240 435 T340 410 L340 460 Z" fill="#ff4d00" opacity="0.8"/>
  <text x="170" y="445" fill="#fca5a5" font-family="monospace" font-size="10" letter-spacing="2" text-anchor="middle">CADA PISO EXIGE UN TRIBUTO</text>
</svg>`
  },

  // Panel 5: El Filo del 21 (Blackjack vs BUST)
  {
    num: 5,
    title: 'El Filo del 21',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 460" width="100%" height="100%">
  <defs>
    <linearGradient id="bg5" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0a192f"/>
      <stop offset="50%" stop-color="#020c1b"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
    <linearGradient id="goldCard" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fffbeb"/>
      <stop offset="100%" stop-color="#fef08a"/>
    </linearGradient>
    <filter id="divineGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="340" height="460" fill="url(#bg5)"/>
  <!-- Relámpagos astrales de energía pura -->
  <path d="M40 0 L100 120 L70 130 L160 250 L110 260 L210 460" stroke="#66fcf1" stroke-width="2.5" fill="none" opacity="0.7" filter="url(#divineGlow)"/>
  <path d="M300 0 L240 100 L270 110 L190 230 L220 240 L130 460" stroke="#ffd166" stroke-width="2" fill="none" opacity="0.6"/>

  <!-- Mano perfecta: AS de Picas + JOTA de Diamantes = 21 -->
  <!-- Carta 1: AS (Izquierda inclinada) -->
  <g transform="translate(75, 120) rotate(-12)">
    <rect width="90" height="135" rx="8" fill="url(#goldCard)" stroke="#1e293b" stroke-width="3" filter="url(#divineGlow)"/>
    <text x="16" y="26" fill="#0f172a" font-family="monospace" font-size="20" font-weight="bold">A</text>
    <text x="16" y="44" fill="#0f172a" font-size="16">♠</text>
    <text x="45" y="85" fill="#0f172a" font-size="44" text-anchor="middle">♠</text>
    <text x="74" y="125" fill="#0f172a" font-family="monospace" font-size="16" font-weight="bold" text-anchor="end">11</text>
  </g>

  <!-- Carta 2: JACK (Derecha sobrepuesta) -->
  <g transform="translate(170, 140) rotate(10)">
    <rect width="90" height="135" rx="8" fill="url(#goldCard)" stroke="#ffd166" stroke-width="4" filter="url(#divineGlow)"/>
    <text x="16" y="26" fill="#b45309" font-family="monospace" font-size="20" font-weight="bold">J</text>
    <text x="16" y="44" fill="#b45309" font-size="16">♦</text>
    <!-- Corona de Jack -->
    <path d="M30 65 L45 50 L60 65 L55 80 L35 80 Z" fill="#b45309"/>
    <circle cx="45" cy="50" r="3" fill="#ffd166"/>
    <text x="45" y="105" fill="#b45309" font-size="28" text-anchor="middle">♦</text>
    <text x="74" y="125" fill="#b45309" font-family="monospace" font-size="16" font-weight="bold" text-anchor="end">10</text>
  </g>

  <!-- Sello de Impacto: ¡BLACKJACK! -->
  <g transform="translate(170, 340)">
    <circle cx="0" cy="0" r="48" fill="#ffd166" filter="url(#divineGlow)"/>
    <circle cx="0" cy="0" r="42" fill="#0f172a"/>
    <text x="0" y="8" fill="#ffd166" font-family="monospace" font-size="32" font-weight="bold" text-anchor="middle">21</text>
  </g>
  <text x="170" y="415" fill="#66fcf1" font-family="monospace" font-size="13" font-weight="bold" letter-spacing="3" text-anchor="middle">¡PERFECCIÓN O RUINA!</text>
  <text x="170" y="440" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Superar 21 desata el BUST y consume tu alma</text>
</svg>`
  },

  // Panel 6: Hogueras, Reliquias y Pactos Prohibidos
  {
    num: 6,
    title: 'Reliquias y Pactos',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 460" width="100%" height="100%">
  <defs>
    <linearGradient id="bg6" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1c1106"/>
      <stop offset="50%" stop-color="#2b1a08"/>
      <stop offset="100%" stop-color="#080402"/>
    </linearGradient>
    <radialGradient id="fireLight" cx="50%" cy="65%" r="45%">
      <stop offset="0%" stop-color="#ff9f1c"/>
      <stop offset="40%" stop-color="#e71d36" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <filter id="fireGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="b"/>
      <feComposite in="SourceGraphic" in2="b" operator="over"/>
    </filter>
  </defs>
  <rect width="340" height="460" fill="url(#bg6)"/>
  <!-- Resplandor cálido de la hoguera del descanso -->
  <circle cx="170" cy="300" r="140" fill="url(#fireLight)"/>

  <!-- Altar de Piedra con Reliquias -->
  <polygon points="50,260 290,260 320,380 20,380" fill="#1f1813" stroke="#523a28" stroke-width="3"/>

  <!-- Cáliz Maldito con Gema carmesí -->
  <g transform="translate(100, 195)">
    <path d="M10 20 Q25 45 40 20 L30 55 L38 65 L12 65 L20 55 Z" fill="#ffd166" stroke="#b45309" stroke-width="2"/>
    <ellipse cx="25" cy="20" rx="14" ry="6" fill="#e63946" filter="url(#fireGlow)"/>
  </g>

  <!-- Pergamino de Pacto Prohibido con sello de cera -->
  <g transform="translate(180, 185) rotate(8)">
    <rect width="70" height="65" rx="3" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
    <line x1="12" y1="18" x2="58" y2="18" stroke="#92400e" stroke-width="2"/>
    <line x1="12" y1="28" x2="48" y2="28" stroke="#92400e" stroke-width="2"/>
    <line x1="12" y1="38" x2="54" y2="38" stroke="#92400e" stroke-width="2"/>
    <!-- Sello de sangre del Abismo -->
    <circle cx="50" cy="50" r="10" fill="#dc2626" stroke="#7f1d1d" stroke-width="1.5"/>
    <text x="50" y="54" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">☠</text>
  </g>

  <!-- Llamas danzantes en primer plano -->
  <path d="M140 370 Q170 280 180 340 Q195 290 205 370 Z" fill="#ff9f1c" filter="url(#fireGlow)"/>
  <path d="M155 370 Q170 310 180 350 Q188 320 195 370 Z" fill="#ffffff"/>

  <!-- Chispas ascendentes -->
  <circle cx="150" cy="230" r="3" fill="#ffd166"/>
  <circle cx="190" cy="210" r="2.5" fill="#ff4d4d"/>
  <circle cx="165" cy="160" r="2" fill="#ffd166"/>
  <circle cx="180" cy="130" r="2.5" fill="#ff9f1c"/>

  <text x="170" y="420" fill="#fed7aa" font-family="monospace" font-size="11" letter-spacing="2" text-anchor="middle">EL BAZAR Y LA HOGUERA</text>
  <text x="170" y="442" fill="#fdba74" font-family="monospace" font-size="9" text-anchor="middle">Compra reliquias o sella pactos que cambiarán tus cartas</text>
</svg>`
  },

  // Panel 7: El Trono de Black Jack y la Batalla Final
  {
    num: 7,
    title: 'El Trono de Black Jack',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 460" width="100%" height="100%">
  <defs>
    <linearGradient id="bg7" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#020408"/>
      <stop offset="60%" stop-color="#080e18"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
    <radialGradient id="jackAura" cx="50%" cy="35%" r="45%">
      <stop offset="0%" stop-color="#7928ca" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#4338ca" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <filter id="crownGlow" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="340" height="460" fill="url(#bg7)"/>
  <!-- Aura mística del Trono de Obsidiana -->
  <ellipse cx="170" cy="180" rx="140" ry="160" fill="url(#jackAura)"/>

  <!-- Trono gótico en punta de picas -->
  <path d="M100 360 L120 70 L170 20 L220 70 L240 360 Z" fill="#090d16" stroke="#1e293b" stroke-width="4"/>
  <path d="M140 100 L170 50 L200 100 Z" fill="#ffd166" opacity="0.3"/>

  <!-- Silueta imponente de Black Jack -->
  <g transform="translate(170, 160)">
    <!-- Capa oscura ondeando con forro púrpura -->
    <path d="M-60 60 Q-90 160 -80 200 Q0 220 80 200 Q90 160 60 60 Z" fill="#1e1035" stroke="#7928ca" stroke-width="2"/>
    <!-- Pecho y armadura real de Jack -->
    <path d="M-35 50 L35 50 L25 150 L-25 150 Z" fill="#0f172a" stroke="#ffd166" stroke-width="2"/>
    <!-- Corona de Picas Imperial de Jack -->
    <polygon points="-30,-10 -15,15 0,-25 15,15 30,-10 25,25 -25,25" fill="#ffd166" stroke="#b45309" stroke-width="2" filter="url(#crownGlow)"/>
    <!-- Rostro sombrío y ojos espectrales cian -->
    <circle cx="0" cy="22" r="22" fill="#0b0f19"/>
    <ellipse cx="-8" cy="20" rx="4" ry="2" fill="#66fcf1" filter="url(#crownGlow)"/>
    <ellipse cx="8" cy="20" rx="4" ry="2" fill="#66fcf1" filter="url(#crownGlow)"/>
    <!-- Sonrisa desafiante -->
    <path d="M-8 32 Q0 38 8 32" stroke="#66fcf1" stroke-width="1.8" fill="none"/>
    
    <!-- Mano extendida arrojando el naipe supremo hacia el jugador -->
    <g transform="translate(-10, 110)">
      <rect x="-24" y="-36" width="48" height="72" rx="4" fill="#ffffff" stroke="#ffd166" stroke-width="3" filter="url(#crownGlow)"/>
      <text x="0" y="-8" fill="#e63946" font-family="monospace" font-size="24" font-weight="bold" text-anchor="middle">♠</text>
      <text x="0" y="20" fill="#0b0f19" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">JACK</text>
    </g>
  </g>

  <!-- Escalones del santuario final -->
  <polygon points="30,420 310,420 340,460 0,460" fill="#050811"/>
  <line x1="20" y1="420" x2="320" y2="420" stroke="#66fcf1" stroke-width="2" opacity="0.6"/>

  <text x="170" y="410" fill="#ffd166" font-family="monospace" font-size="12" font-weight="bold" letter-spacing="3" text-anchor="middle">EL PISO 21 TE AGUARDA</text>
  <text x="170" y="445" fill="#e2e8f0" font-family="monospace" font-size="9" letter-spacing="1" text-anchor="middle">¿Reclamarás tu alma o serás siervo de las sombras?</text>
</svg>`
  }
];

// Generar los 7 archivos
for (const p of panels) {
  const filePath = path.join(ASSETS_DIR, `comic_panel_${p.num}.svg`);
  fs.writeFileSync(filePath, p.svg.trim() + '\n', 'utf8');
  console.log(`✓ Generado panel ${p.num}: ${filePath}`);
}
console.log('¡Todos los 7 paneles de cómic verticales generados con éxito!');
