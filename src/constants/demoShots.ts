// High-fidelity pre-rendered sample visual assets for instant demo preview
// featuring the exact same SOLIS Botanical Cold Brew product across billboard, newspaper, social post, and subway

export const DEMO_MASTER_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#2a2521"/>
      <stop offset="60%" stop-color="#141210"/>
      <stop offset="100%" stop-color="#090807"/>
    </radialGradient>
    <linearGradient id="podiumGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2d2824"/>
      <stop offset="100%" stop-color="#181513"/>
    </linearGradient>
    <linearGradient id="amberLiquid" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#78350f"/>
      <stop offset="35%" stop-color="#b45309"/>
      <stop offset="65%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#78350f"/>
    </linearGradient>
    <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.4)"/>
      <stop offset="15%" stop-color="rgba(255,255,255,0.05)"/>
      <stop offset="85%" stop-color="rgba(255,255,255,0)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.3)"/>
    </linearGradient>
    <linearGradient id="corkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a16207"/>
      <stop offset="50%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#854d0e"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Studio Background -->
  <rect width="800" height="800" fill="url(#bgGrad)"/>

  <!-- Studio Podium -->
  <ellipse cx="400" cy="680" rx="260" ry="60" fill="rgba(0,0,0,0.6)"/>
  <ellipse cx="400" cy="650" rx="240" ry="45" fill="url(#podiumGrad)"/>
  <ellipse cx="400" cy="640" rx="230" ry="38" fill="#38322c"/>

  <!-- Bottle Ambient Drop Shadow -->
  <ellipse cx="400" cy="620" rx="100" ry="25" fill="rgba(0,0,0,0.8)"/>

  <!-- SOLIS Bottle Body -->
  <!-- Main Glass Cylinder -->
  <rect x="330" y="320" width="140" height="280" rx="18" fill="url(#amberLiquid)"/>
  <!-- Bottle Shoulder curve -->
  <path d="M 330 340 C 330 260, 370 240, 380 220 L 420 220 C 430 240, 470 260, 470 340 Z" fill="url(#amberLiquid)"/>
  <!-- Bottle Neck -->
  <rect x="380" y="180" width="40" height="45" rx="4" fill="url(#amberLiquid)"/>
  <!-- Glass Rim lip -->
  <ellipse cx="400" cy="180" rx="22" ry="6" fill="#f59e0b"/>

  <!-- Cork Stopper -->
  <rect x="382" y="145" width="36" height="35" rx="3" fill="url(#corkGrad)"/>
  <ellipse cx="400" cy="145" rx="18" ry="5" fill="#ca8a04"/>
  <!-- Black wax drip seal -->
  <path d="M 380 178 Q 400 185 420 178 L 420 190 Q 400 195 380 190 Z" fill="#18181b"/>

  <!-- Frosted Glass Specular Highlights -->
  <rect x="330" y="320" width="140" height="280" rx="18" fill="url(#glassReflection)"/>
  <!-- Vertical soft reflection streak -->
  <rect x="345" y="330" width="14" height="260" rx="7" fill="rgba(255,255,255,0.25)" filter="url(#glow)"/>

  <!-- Premium Minimalist Gold Label -->
  <rect x="345" y="370" width="110" height="180" rx="8" fill="#1c1917" stroke="#d97706" stroke-width="1.5"/>
  <rect x="350" y="375" width="100" height="170" rx="5" fill="none" stroke="#b45309" stroke-width="0.75" stroke-dasharray="3,2"/>

  <!-- Label Typography -->
  <text x="400" y="415" font-family="'Syne', sans-serif" font-size="18" font-weight="800" fill="#fbbf24" text-anchor="middle" letter-spacing="4">SOLIS</text>
  <text x="400" y="432" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="600" fill="#fef3c7" text-anchor="middle" letter-spacing="2">BOTANICAL COLD BREW</text>
  <line x1="375" y1="442" x2="425" y2="442" stroke="#d97706" stroke-width="1"/>
  <circle cx="400" cy="460" r="12" fill="none" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="400" cy="460" r="4" fill="#fbbf24"/>
  <text x="400" y="495" font-family="'Newsreader', serif" font-size="9" font-style="italic" fill="#d6d3d1" text-anchor="middle">Reserve Batch No. 04</text>
  <text x="400" y="525" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="500" fill="#a8a29e" text-anchor="middle" letter-spacing="1">350 ML • ROASTED ELEVATION</text>

  <!-- Bottom glass reflection -->
  <ellipse cx="400" cy="600" rx="60" ry="12" fill="none" stroke="rgba(251, 191, 36, 0.4)" stroke-width="2"/>
</svg>
`)}`;

export const DEMO_BILLBOARD_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  <defs>
    <linearGradient id="twilightSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="50%" stop-color="#1e1b4b"/>
      <stop offset="85%" stop-color="#311042"/>
      <stop offset="100%" stop-color="#4a044e"/>
    </linearGradient>
    <linearGradient id="highwayStreaks" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#ef4444"/>
    </linearGradient>
    <linearGradient id="billboardGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1c1917"/>
      <stop offset="100%" stop-color="#0c0a09"/>
    </linearGradient>
  </defs>

  <!-- Twilight Sky -->
  <rect width="1600" height="900" fill="url(#twilightSky)"/>

  <!-- Distant Cityscape Architecture (Uninhabited, No people) -->
  <rect x="100" y="420" width="120" height="380" fill="#0f172a"/>
  <rect x="240" y="380" width="160" height="420" fill="#090d16"/>
  <rect x="420" y="460" width="90" height="340" fill="#0d131f"/>
  <rect x="1100" y="400" width="140" height="400" fill="#0f172a"/>
  <rect x="1260" y="350" width="180" height="450" fill="#090d16"/>
  <rect x="1460" y="440" width="110" height="360" fill="#0d131f"/>

  <!-- Highway Overpass & Bridge Curves -->
  <path d="M 0 780 Q 800 680 1600 780 L 1600 900 L 0 900 Z" fill="#0a0a0c"/>
  <path d="M 0 820 Q 800 720 1600 820" stroke="url(#highwayStreaks)" stroke-width="8" opacity="0.85"/>
  <path d="M 0 835 Q 800 735 1600 835" stroke="#fef08a" stroke-width="4" opacity="0.7"/>

  <!-- Huge Highway Billboard Truss & Display (Center) -->
  <!-- Billboard Steel Truss Support -->
  <rect x="760" y="480" width="80" height="320" fill="#27272a"/>
  <line x1="760" y1="520" x2="840" y2="600" stroke="#3f3f46" stroke-width="4"/>
  <line x1="840" y1="520" x2="760" y2="600" stroke="#3f3f46" stroke-width="4"/>
  <line x1="760" y1="600" x2="840" y2="680" stroke="#3f3f46" stroke-width="4"/>
  <line x1="840" y1="600" x2="760" y2="680" stroke="#3f3f46" stroke-width="4"/>

  <!-- Billboard Giant Screen Frame -->
  <rect x="300" y="100" width="1000" height="420" rx="12" fill="#18181b" stroke="#3f3f46" stroke-width="8"/>
  <rect x="315" y="115" width="970" height="390" rx="6" fill="url(#billboardGlow)"/>

  <!-- Billboard Spotlights -->
  <circle cx="450" cy="90" r="8" fill="#fde68a"/>
  <circle cx="700" cy="90" r="8" fill="#fde68a"/>
  <circle cx="900" cy="90" r="8" fill="#fde68a"/>
  <circle cx="1150" cy="90" r="8" fill="#fde68a"/>

  <!-- BILLBOARD CONTENT: EXACT CONSISTENT SOLIS BOTTLE ON LEFT -->
  <!-- Bottle Silhouette -->
  <g transform="translate(420, 140) scale(0.65)">
    <rect x="130" y="120" width="140" height="280" rx="18" fill="#b45309"/>
    <path d="M 130 140 C 130 60, 170 40, 180 20 L 220 20 C 230 40, 270 60, 270 140 Z" fill="#b45309"/>
    <rect x="180" y="-15" width="40" height="35" rx="3" fill="#d97706"/>
    <!-- Cork -->
    <rect x="182" y="-50" width="36" height="35" rx="3" fill="#a16207"/>
    <!-- Glass Highlight -->
    <rect x="145" y="130" width="14" height="260" rx="7" fill="rgba(255,255,255,0.3)"/>
    <!-- Label -->
    <rect x="145" y="170" width="110" height="180" rx="8" fill="#1c1917" stroke="#d97706" stroke-width="1.5"/>
    <text x="200" y="215" font-family="'Syne', sans-serif" font-size="18" font-weight="800" fill="#fbbf24" text-anchor="middle" letter-spacing="4">SOLIS</text>
    <text x="200" y="235" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="600" fill="#fef3c7" text-anchor="middle">BOTANICAL COLD BREW</text>
  </g>

  <!-- BILLBOARD CONTENT: HEADLINE & COPY ON RIGHT -->
  <text x="680" y="250" font-family="'Syne', sans-serif" font-size="44" font-weight="800" fill="#ffffff" letter-spacing="2">INFUSED WITH SUN.</text>
  <text x="680" y="305" font-family="'Syne', sans-serif" font-size="44" font-weight="800" fill="#fbbf24" letter-spacing="2">BREWED IN SHADOW.</text>
  <text x="680" y="360" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="400" fill="#a8a29e" letter-spacing="1">The signature reserve cold brew for discerning palettes.</text>
  <text x="680" y="420" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#f59e0b" letter-spacing="4">AVAILABLE AT SELECT RESERVE STORES WORLDWIDE</text>

  <!-- Outdoor billboard catwalk with safety yellow markings -->
  <rect x="290" y="525" width="1020" height="12" fill="#27272a"/>
  <rect x="300" y="537" width="1000" height="4" fill="#eab308"/>
</svg>
`)}`;

export const DEMO_NEWSPAPER_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="100%" height="100%">
  <!-- Tabletop Background (Warm Oak / Slate) -->
  <rect width="1200" height="900" fill="#262320"/>

  <!-- Morning Espresso Ceramic Cup on Left -->
  <circle cx="140" cy="450" r="70" fill="#1c1917" stroke="#44403c" stroke-width="4"/>
  <circle cx="140" cy="450" r="50" fill="#451a03"/>
  <circle cx="140" cy="450" r="40" fill="#78350f"/>
  <ellipse cx="140" cy="445" rx="20" ry="10" fill="#b45309" opacity="0.6"/>

  <!-- Designer Eyeglasses on Table -->
  <circle cx="1060" cy="380" r="35" fill="none" stroke="#ca8a04" stroke-width="3"/>
  <circle cx="1140" cy="380" r="35" fill="none" stroke="#ca8a04" stroke-width="3"/>
  <line x1="1095" y1="380" x2="1105" y2="380" stroke="#ca8a04" stroke-width="3"/>

  <!-- Broadsheet Newspaper Opened Flat (No people) -->
  <rect x="260" y="60" width="680" height="780" fill="#F4EFE6" rx="4" stroke="#d6d3d1" stroke-width="2"/>

  <!-- Newspaper Header -->
  <text x="600" y="110" font-family="'Newsreader', serif" font-size="32" font-weight="700" fill="#1c1917" text-anchor="middle" letter-spacing="2">THE GLOBAL CHRONICLE</text>
  <line x1="290" y1="125" x2="910" y2="125" stroke="#1c1917" stroke-width="1.5"/>
  <text x="300" y="140" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="#57534e">ISSUE 58,190 • FINANCIAL & DESIGN REVIEW</text>
  <text x="900" y="140" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="#57534e" text-anchor="end">PRICE $4.50</text>
  <line x1="290" y1="148" x2="910" y2="148" stroke="#1c1917" stroke-width="0.75"/>

  <!-- Ad Frame Border -->
  <rect x="290" y="165" width="620" height="645" fill="#fcfbf7" stroke="#1c1917" stroke-width="2"/>
  <text x="600" y="185" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" fill="#78716c" text-anchor="middle" letter-spacing="3">SPECIAL PRINT ADVERTISEMENT</text>

  <!-- Big Editorial Headline -->
  <text x="600" y="235" font-family="'Newsreader', serif" font-size="30" font-weight="700" fill="#1c1917" text-anchor="middle">
    A Quiet Revolution in Botanical Fermentation.
  </text>
  <text x="600" y="260" font-family="'Newsreader', serif" font-size="14" font-style="italic" fill="#57534e" text-anchor="middle">
    Crafted slowly over thirty-six hours at peak atmospheric pressure.
  </text>

  <!-- Newspaper Ad Halftone Image of SOLIS Bottle -->
  <rect x="470" y="290" width="260" height="340" fill="#e7e5e4" stroke="#1c1917" stroke-width="1"/>
  <!-- Bottle in Newsprint ink tone -->
  <g transform="translate(470, 290) scale(0.65)">
    <!-- Amber Bottle rendered in crisp halftone style -->
    <rect x="130" y="120" width="140" height="280" rx="18" fill="#292524"/>
    <path d="M 130 140 C 130 60, 170 40, 180 20 L 220 20 C 230 40, 270 60, 270 140 Z" fill="#292524"/>
    <rect x="180" y="-15" width="40" height="35" rx="3" fill="#44403c"/>
    <rect x="182" y="-50" width="36" height="35" rx="3" fill="#57534e"/>
    <rect x="145" y="130" width="14" height="260" rx="7" fill="rgba(255,255,255,0.6)"/>
    <rect x="145" y="170" width="110" height="180" rx="8" fill="#fafaf9" stroke="#1c1917" stroke-width="1.5"/>
    <text x="200" y="215" font-family="'Syne', sans-serif" font-size="18" font-weight="800" fill="#1c1917" text-anchor="middle" letter-spacing="4">SOLIS</text>
    <text x="200" y="235" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="600" fill="#44403c" text-anchor="middle">BOTANICAL COLD BREW</text>
  </g>

  <!-- Dual Editorial Newspaper Columns -->
  <!-- Column 1 -->
  <text x="315" y="660" font-family="'Newsreader', serif" font-size="11" fill="#1c1917">
    In an era saturated by hurried production and artificial additives,
  </text>
  <text x="315" y="676" font-family="'Newsreader', serif" font-size="11" fill="#1c1917">
    SOLIS presents an unyielding devotion to patience. Single-origin
  </text>
  <text x="315" y="692" font-family="'Newsreader', serif" font-size="11" fill="#1c1917">
    highland beans are married with botanical infusions beneath cork.
  </text>

  <!-- Column 2 -->
  <text x="615" y="660" font-family="'Newsreader', serif" font-size="11" fill="#1c1917">
    Each bottle represents a curated harvest, preserved in heavy
  </text>
  <text x="615" y="676" font-family="'Newsreader', serif" font-size="11" fill="#1c1917">
    amber glass to protect light-sensitive antioxidant profiles.
  </text>
  <text x="615" y="692" font-family="'Newsreader', serif" font-size="11" fill="#1c1917">
    Now available at foremost culinary institutions globally.
  </text>

  <line x1="315" y1="730" x2="885" y2="730" stroke="#1c1917" stroke-width="1"/>
  <text x="600" y="755" font-family="'Syne', sans-serif" font-size="12" font-weight="700" fill="#1c1917" text-anchor="middle" letter-spacing="3">
    WWW.SOLIS-RESERVE.COM • ZERO COMPROMISE
  </text>
</svg>
`)}`;

export const DEMO_SOCIAL_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <defs>
    <linearGradient id="terracottaBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fffbeb"/>
      <stop offset="50%" stop-color="#fef3c7"/>
      <stop offset="100%" stop-color="#fde68a"/>
    </linearGradient>
    <linearGradient id="travertine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e7e5e4"/>
      <stop offset="100%" stop-color="#d6d3d1"/>
    </linearGradient>
  </defs>

  <!-- High-Aesthetic Mediterranean / Travertine Studio Still Life (No people) -->
  <rect width="800" height="800" fill="url(#terracottaBg)"/>

  <!-- Organic Palm Leaf Shadows -->
  <path d="M 0 0 Q 300 120 400 40 Q 250 200 120 300 Z" fill="rgba(180, 83, 9, 0.08)"/>
  <path d="M 50 0 Q 350 200 450 100 Q 320 280 180 380 Z" fill="rgba(180, 83, 9, 0.06)"/>

  <!-- Geometric Travertine Blocks / Pedestals -->
  <polygon points="260,560 540,560 620,640 180,640" fill="#e7e5e4"/>
  <rect x="180" y="640" width="440" height="80" fill="#d6d3d1"/>

  <!-- Ripling Water Caustics reflections -->
  <ellipse cx="400" cy="580" rx="200" ry="20" fill="rgba(251, 191, 36, 0.3)"/>

  <!-- Exact Consistent SOLIS Bottle Staged on Travertine -->
  <g transform="translate(260, 160) scale(0.7)">
    <rect x="130" y="120" width="140" height="280" rx="18" fill="#b45309"/>
    <path d="M 130 140 C 130 60, 170 40, 180 20 L 220 20 C 230 40, 270 60, 270 140 Z" fill="#b45309"/>
    <rect x="180" y="-15" width="40" height="35" rx="3" fill="#d97706"/>
    <rect x="182" y="-50" width="36" height="35" rx="3" fill="#a16207"/>
    <rect x="145" y="130" width="14" height="260" rx="7" fill="rgba(255,255,255,0.4)"/>
    <rect x="145" y="170" width="110" height="180" rx="8" fill="#1c1917" stroke="#d97706" stroke-width="1.5"/>
    <text x="200" y="215" font-family="'Syne', sans-serif" font-size="18" font-weight="800" fill="#fbbf24" text-anchor="middle" letter-spacing="4">SOLIS</text>
    <text x="200" y="235" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="600" fill="#fef3c7" text-anchor="middle">BOTANICAL COLD BREW</text>
  </g>

  <!-- Editorial Still Life Accessories: Botanical sprig on travertine -->
  <path d="M 520 620 Q 560 590 600 610" stroke="#78350f" stroke-width="3" fill="none"/>
  <ellipse cx="550" cy="595" rx="10" ry="5" fill="#a16207"/>
  <ellipse cx="585" cy="605" rx="10" ry="5" fill="#a16207"/>
</svg>
`)}`;

export const DEMO_SUBWAY_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1066" width="100%" height="100%">
  <!-- Midnight Subway Station Architecture (Polished Concrete, No commuters) -->
  <rect width="800" height="1066" fill="#09090b"/>

  <!-- Station Platform Granite Floor with poster reflection -->
  <polygon points="0,750 800,750 800,1066 0,1066" fill="#18181b"/>
  <line x1="0" y1="750" x2="800" y2="750" stroke="#27272a" stroke-width="2"/>

  <!-- Poster Lightbox Frame -->
  <rect x="140" y="100" width="520" height="740" rx="16" fill="#0c0a09" stroke="#3f3f46" stroke-width="12"/>
  <rect x="156" y="116" width="488" height="708" rx="8" fill="#1c1917"/>

  <!-- Backlit Poster Content -->
  <text x="400" y="200" font-family="'Syne', sans-serif" font-size="32" font-weight="800" fill="#fbbf24" text-anchor="middle" letter-spacing="4">SOLIS</text>
  <text x="400" y="230" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" fill="#fef3c7" text-anchor="middle" letter-spacing="2">BOTANICAL COLD BREW</text>

  <!-- Exact Bottle -->
  <g transform="translate(255, 270) scale(0.72)">
    <rect x="130" y="120" width="140" height="280" rx="18" fill="#b45309"/>
    <path d="M 130 140 C 130 60, 170 40, 180 20 L 220 20 C 230 40, 270 60, 270 140 Z" fill="#b45309"/>
    <rect x="180" y="-15" width="40" height="35" rx="3" fill="#d97706"/>
    <rect x="182" y="-50" width="36" height="35" rx="3" fill="#a16207"/>
    <rect x="145" y="130" width="14" height="260" rx="7" fill="rgba(255,255,255,0.4)"/>
    <rect x="145" y="170" width="110" height="180" rx="8" fill="#1c1917" stroke="#d97706" stroke-width="1.5"/>
    <text x="200" y="215" font-family="'Syne', sans-serif" font-size="18" font-weight="800" fill="#fbbf24" text-anchor="middle" letter-spacing="4">SOLIS</text>
  </g>

  <text x="400" y="660" font-family="'Syne', sans-serif" font-size="20" font-weight="700" fill="#ffffff" text-anchor="middle">
    AWAKEN THE EXTRAORDINARY.
  </text>
  <text x="400" y="690" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="#a8a29e" text-anchor="middle">
    CRAFTED IN SMALL BATCHES • DISTRIBUTED NATIONWIDE
  </text>

  <!-- Lightbox Floor Reflection -->
  <ellipse cx="400" cy="800" rx="180" ry="18" fill="rgba(251, 191, 36, 0.15)"/>
</svg>
`)}`;
