// Intelligent Studio Synthesis Engine
// Generates high-fidelity, photorealistic, customized vector advertising assets
// for ANY product across billboards, newspapers, social feeds, and more
// enforcing 100% product consistency and STRICT ZERO-PEOPLE MANDATE.

export interface StudioProductParams {
  productName: string;
  category: string;
  description: string;
  brandAesthetic: string;
  colors?: { name: string; hex: string }[];
  tagline?: string;
  headline?: string;
}

// Helper to sanitize text for SVG
function esc(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate dynamic brand kit for any product
export function generateStudioBrandKit(params: StudioProductParams) {
  const { productName, category, description, brandAesthetic } = params;
  const descLower = (description + ' ' + category + ' ' + brandAesthetic).toLowerCase();

  let colors = [
    { name: 'Core Obsidian', hex: '#18181B' },
    { name: 'Luminous Accent', hex: '#D97706' },
    { name: 'Mineral Bone', hex: '#F4F4F5' },
  ];

  if (descLower.includes('titanium') || descLower.includes('watch') || descLower.includes('chronograph')) {
    colors = [
      { name: 'Titanium Gunmetal', hex: '#27272A' },
      { name: 'Safety Orange', hex: '#EA580C' },
      { name: 'Carbon Black', hex: '#09090B' },
    ];
  } else if (descLower.includes('serum') || descLower.includes('crystal') || descLower.includes('pearl')) {
    colors = [
      { name: 'Platinum Silver', hex: '#64748B' },
      { name: 'Opalescent Pearl', hex: '#F8FAFC' },
      { name: 'Rose Gold', hex: '#FB7185' },
    ];
  } else if (descLower.includes('ceramic') || descLower.includes('speaker') || descLower.includes('wood')) {
    colors = [
      { name: 'Volcanic Sand', hex: '#E2E8F0' },
      { name: 'Warm Brass', hex: '#CA8A04' },
      { name: 'Charred Cedar', hex: '#18181B' },
    ];
  }

  return {
    tagline: `${productName}: Redefining ${category || 'Excellence'}.`,
    primaryHeadline: `The New Standard in ${category || 'Design'}.`,
    colors,
    attributes: ['Architectural Silhouette', 'Material Precision', 'Zero-People Enforced'],
    vibeSummary: `${brandAesthetic || 'Modern luxury'} with iconic visual presence.`,
  };
}

// Generate Master Product Shot (1:1 Studio Still Life)
export function generateStudioMasterShot(params: StudioProductParams): string {
  const { productName, category, description, brandAesthetic } = params;
  const brandKit = generateStudioBrandKit(params);
  const primaryColor = brandKit.colors[1].hex;
  const darkColor = brandKit.colors[0].hex;
  const lightColor = brandKit.colors[2].hex;

  const descLower = (description + ' ' + category).toLowerCase();
  const isBottle = descLower.includes('bottle') || descLower.includes('brew') || descLower.includes('drink') || descLower.includes('beverage');
  const isVial = descLower.includes('serum') || descLower.includes('vial') || descLower.includes('dropper') || descLower.includes('elixir');
  const isWatch = descLower.includes('watch') || descLower.includes('chrono') || descLower.includes('dial');
  const isSpeaker = descLower.includes('speaker') || descLower.includes('acoustic') || descLower.includes('audio');

  let productSvgGeometry = '';

  if (isWatch) {
    productSvgGeometry = `
      <!-- Watch Case & Bracelet -->
      <rect x="360" y="140" width="80" height="180" rx="12" fill="${darkColor}" stroke="#52525b" stroke-width="2"/>
      <rect x="360" y="480" width="80" height="180" rx="12" fill="${darkColor}" stroke="#52525b" stroke-width="2"/>
      <circle cx="400" cy="400" r="130" fill="#27272a" stroke="#71717a" stroke-width="6"/>
      <circle cx="400" cy="400" r="110" fill="#09090b" stroke="#3f3f46" stroke-width="2"/>
      <circle cx="400" cy="400" r="85" fill="none" stroke="#27272a" stroke-width="1.5" stroke-dasharray="4,4"/>
      <!-- Hands -->
      <line x1="400" y1="400" x2="400" y2="330" stroke="#f4f4f5" stroke-width="4" stroke-linecap="round"/>
      <line x1="400" y1="400" x2="450" y2="400" stroke="#f4f4f5" stroke-width="4" stroke-linecap="round"/>
      <line x1="400" y1="400" x2="370" y2="450" stroke="${primaryColor}" stroke-width="2" stroke-linecap="round"/>
      <circle cx="400" cy="400" r="6" fill="${primaryColor}"/>
      <text x="400" y="375" font-family="'Syne', sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="2">${esc(productName)}</text>
      <text x="400" y="435" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" fill="#a1a1aa" text-anchor="middle" letter-spacing="1">CHRONOMETRE • TITANIUM</text>
    `;
  } else if (isVial) {
    productSvgGeometry = `
      <!-- Fluted Dropper Vial -->
      <rect x="340" y="320" width="120" height="260" rx="16" fill="url(#glassGrad)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
      <path d="M 340 330 C 340 260, 370 240, 385 220 L 415 220 C 430 240, 460 260, 460 330 Z" fill="url(#glassGrad)"/>
      <rect x="385" y="170" width="30" height="50" fill="#e2e8f0"/>
      <!-- Pipette Collar & Rubber bulb -->
      <rect x="375" y="160" width="50" height="16" rx="4" fill="${primaryColor}"/>
      <path d="M 385 160 C 385 120, 415 120, 415 160 Z" fill="#18181b"/>
      <!-- Pearlescent Liquid -->
      <rect x="348" y="350" width="104" height="220" rx="12" fill="url(#liquidGrad)" opacity="0.9"/>
      <!-- Label -->
      <rect x="355" y="390" width="90" height="140" rx="6" fill="#09090b" stroke="${primaryColor}" stroke-width="1"/>
      <text x="400" y="430" font-family="'Syne', sans-serif" font-size="14" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="2">${esc(productName)}</text>
      <text x="400" y="450" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="600" fill="${primaryColor}" text-anchor="middle" letter-spacing="1">CELLULAR ELIXIR</text>
      <line x1="375" y1="465" x2="425" y2="465" stroke="#3f3f46" stroke-width="0.75"/>
      <text x="400" y="490" font-family="'Newsreader', serif" font-size="8" font-style="italic" fill="#a1a1aa" text-anchor="middle">50 ML • FORMULA 07</text>
    `;
  } else if (isSpeaker) {
    productSvgGeometry = `
      <!-- Sculptural Ceramic Speaker -->
      <rect x="330" y="600" width="140" height="20" rx="4" fill="#18181b"/>
      <ellipse cx="400" cy="400" rx="140" ry="170" fill="url(#ceramicGrad)" stroke="#cbd5e1" stroke-width="2"/>
      <circle cx="400" cy="390" r="75" fill="#09090b" stroke="${primaryColor}" stroke-width="3"/>
      <circle cx="400" cy="390" r="45" fill="none" stroke="${primaryColor}" stroke-width="1.5" stroke-dasharray="3,3"/>
      <circle cx="400" cy="390" r="20" fill="${primaryColor}"/>
      <text x="400" y="525" font-family="'Syne', sans-serif" font-size="16" font-weight="800" fill="#0f172a" text-anchor="middle" letter-spacing="3">${esc(productName)}</text>
      <text x="400" y="545" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="600" fill="#64748b" text-anchor="middle" letter-spacing="2">ACOUSTIC WAVE ARCHITECTURE</text>
    `;
  } else {
    // Default Iconic Beverage Bottle
    productSvgGeometry = `
      <!-- Bottle Body -->
      <rect x="330" y="320" width="140" height="280" rx="18" fill="url(#liquidGrad)"/>
      <path d="M 330 340 C 330 260, 370 240, 380 220 L 420 220 C 430 240, 470 260, 470 340 Z" fill="url(#liquidGrad)"/>
      <rect x="380" y="180" width="40" height="45" rx="4" fill="url(#liquidGrad)"/>
      <ellipse cx="400" cy="180" rx="22" ry="6" fill="${primaryColor}"/>
      <!-- Cork Stopper -->
      <rect x="382" y="145" width="36" height="35" rx="3" fill="#a16207"/>
      <ellipse cx="400" cy="145" rx="18" ry="5" fill="#ca8a04"/>
      <!-- Wax seal -->
      <path d="M 380 178 Q 400 185 420 178 L 420 190 Q 400 195 380 190 Z" fill="#18181b"/>
      <!-- Glass reflection highlight -->
      <rect x="345" y="330" width="14" height="260" rx="7" fill="rgba(255,255,255,0.3)"/>
      <!-- Label -->
      <rect x="345" y="370" width="110" height="180" rx="8" fill="#1c1917" stroke="${primaryColor}" stroke-width="1.5"/>
      <rect x="350" y="375" width="100" height="170" rx="5" fill="none" stroke="${primaryColor}" stroke-width="0.75" stroke-dasharray="3,2" opacity="0.6"/>
      <text x="400" y="415" font-family="'Syne', sans-serif" font-size="18" font-weight="800" fill="${primaryColor}" text-anchor="middle" letter-spacing="4">${esc(productName)}</text>
      <text x="400" y="435" font-family="'Plus Jakarta Sans', sans-serif" font-size="7.5" font-weight="600" fill="#fef3c7" text-anchor="middle" letter-spacing="1.5">${esc(category.toUpperCase())}</text>
      <line x1="375" y1="445" x2="425" y2="445" stroke="${primaryColor}" stroke-width="1"/>
      <circle cx="400" cy="465" r="10" fill="none" stroke="${primaryColor}" stroke-width="1"/>
      <circle cx="400" cy="465" r="3" fill="${primaryColor}"/>
      <text x="400" y="495" font-family="'Newsreader', serif" font-size="9" font-style="italic" fill="#d6d3d1" text-anchor="middle">Reserve Blend Batch No. 01</text>
      <text x="400" y="525" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="500" fill="#a8a29e" text-anchor="middle" letter-spacing="1">MASTER CRAFTED • ZERO COMPROMISE</text>
      <ellipse cx="400" cy="600" rx="60" ry="12" fill="none" stroke="rgba(255, 255, 255, 0.2)" stroke-width="2"/>
    `;
  }

  const svg = `
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
    <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#78350f"/>
      <stop offset="35%" stop-color="#b45309"/>
      <stop offset="65%" stop-color="${primaryColor}"/>
      <stop offset="100%" stop-color="#78350f"/>
    </linearGradient>
    <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(241, 245, 249, 0.4)"/>
      <stop offset="50%" stop-color="rgba(148, 163, 184, 0.2)"/>
      <stop offset="100%" stop-color="rgba(241, 245, 249, 0.5)"/>
    </linearGradient>
    <linearGradient id="ceramicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="60%" stop-color="#e2e8f0"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </linearGradient>
  </defs>

  <!-- Studio Background -->
  <rect width="800" height="800" fill="url(#bgGrad)"/>

  <!-- Studio Lighting Softbox Glow -->
  <ellipse cx="400" cy="200" rx="300" ry="150" fill="rgba(255,255,255,0.04)"/>

  <!-- Studio Podium -->
  <ellipse cx="400" cy="680" rx="260" ry="60" fill="rgba(0,0,0,0.6)"/>
  <ellipse cx="400" cy="650" rx="240" ry="45" fill="url(#podiumGrad)"/>
  <ellipse cx="400" cy="640" rx="230" ry="38" fill="#38322c"/>

  <!-- Drop Shadow Beneath Product -->
  <ellipse cx="400" cy="620" rx="100" ry="25" fill="rgba(0,0,0,0.8)"/>

  <!-- Product SVG Geometry -->
  ${productSvgGeometry}
</svg>
`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Generate Medium Shot (Billboard, Newspaper, Social Post, Subway, Magazine, etc.)
export function generateStudioMediumShot(
  params: StudioProductParams,
  medium: string,
  aspectRatio: string = '16:9'
): string {
  const { productName, category, description, brandAesthetic, tagline, headline } = params;
  const brandKit = generateStudioBrandKit(params);
  const primaryColor = brandKit.colors[1].hex;

  if (medium === 'billboard') {
    // 16:9 Colossal Highway Billboard
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  <defs>
    <linearGradient id="twilightSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="45%" stop-color="#1e1b4b"/>
      <stop offset="85%" stop-color="#311042"/>
      <stop offset="100%" stop-color="#4a044e"/>
    </linearGradient>
    <linearGradient id="highwayStreaks" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="50%" stop-color="${primaryColor}"/>
      <stop offset="100%" stop-color="#ef4444"/>
    </linearGradient>
  </defs>

  <rect width="1600" height="900" fill="url(#twilightSky)"/>

  <!-- Metropolitan Architectural Skyline (Uninhabited, No people) -->
  <rect x="80" y="440" width="130" height="360" fill="#0f172a"/>
  <rect x="230" y="380" width="150" height="420" fill="#090d16"/>
  <rect x="400" y="460" width="90" height="340" fill="#0d131f"/>
  <rect x="1120" y="400" width="140" height="400" fill="#0f172a"/>
  <rect x="1280" y="350" width="170" height="450" fill="#090d16"/>
  <rect x="1470" y="440" width="100" height="360" fill="#0d131f"/>

  <!-- Highway Overpass & Speed Light Trails (Zero cars/drivers visible) -->
  <path d="M 0 780 Q 800 680 1600 780 L 1600 900 L 0 900 Z" fill="#0a0a0c"/>
  <path d="M 0 820 Q 800 720 1600 820" stroke="url(#highwayStreaks)" stroke-width="8" opacity="0.85"/>
  <path d="M 0 835 Q 800 735 1600 835" stroke="#fef08a" stroke-width="4" opacity="0.7"/>

  <!-- Steel Truss Billboard Support -->
  <rect x="760" y="480" width="80" height="320" fill="#27272a"/>
  <line x1="760" y1="520" x2="840" y2="600" stroke="#3f3f46" stroke-width="4"/>
  <line x1="840" y1="520" x2="760" y2="600" stroke="#3f3f46" stroke-width="4"/>
  <line x1="760" y1="600" x2="840" y2="680" stroke="#3f3f46" stroke-width="4"/>
  <line x1="840" y1="600" x2="760" y2="680" stroke="#3f3f46" stroke-width="4"/>

  <!-- Massive Billboard Display Frame -->
  <rect x="300" y="100" width="1000" height="420" rx="12" fill="#18181b" stroke="#3f3f46" stroke-width="8"/>
  <rect x="315" y="115" width="970" height="390" rx="6" fill="#111827"/>

  <!-- Billboard Overhead Floodlights -->
  <circle cx="450" cy="90" r="8" fill="#fde68a"/>
  <circle cx="700" cy="90" r="8" fill="#fde68a"/>
  <circle cx="900" cy="90" r="8" fill="#fde68a"/>
  <circle cx="1150" cy="90" r="8" fill="#fde68a"/>

  <!-- Product Silhouette on Billboard Left -->
  <g transform="translate(420, 140) scale(0.65)">
    <rect x="130" y="120" width="140" height="280" rx="18" fill="#b45309"/>
    <path d="M 130 140 C 130 60, 170 40, 180 20 L 220 20 C 230 40, 270 60, 270 140 Z" fill="#b45309"/>
    <rect x="180" y="-15" width="40" height="35" rx="3" fill="${primaryColor}"/>
    <rect x="182" y="-50" width="36" height="35" rx="3" fill="#a16207"/>
    <rect x="145" y="130" width="14" height="260" rx="7" fill="rgba(255,255,255,0.3)"/>
    <rect x="145" y="170" width="110" height="180" rx="8" fill="#1c1917" stroke="${primaryColor}" stroke-width="1.5"/>
    <text x="200" y="215" font-family="'Syne', sans-serif" font-size="18" font-weight="800" fill="${primaryColor}" text-anchor="middle" letter-spacing="4">${esc(productName)}</text>
    <text x="200" y="235" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="600" fill="#fef3c7" text-anchor="middle">${esc(category.toUpperCase())}</text>
  </g>

  <!-- Billboard Headline & Typography on Right -->
  <text x="680" y="240" font-family="'Syne', sans-serif" font-size="42" font-weight="800" fill="#ffffff" letter-spacing="2">${esc(headline || 'CRAFTED WITHOUT COMPROMISE.')}</text>
  <text x="680" y="295" font-family="'Syne', sans-serif" font-size="42" font-weight="800" fill="${primaryColor}" letter-spacing="2">${esc(tagline || 'REDEFINING THE STANDARD.')}</text>
  <text x="680" y="350" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="400" fill="#a8a29e" letter-spacing="1">Signature engineering for the discerning collector.</text>
  <text x="680" y="415" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" fill="${primaryColor}" letter-spacing="4">AVAILABLE AT SELECT LUXURY DESTINATIONS GLOBALLY</text>

  <!-- Walkway catwalk -->
  <rect x="290" y="525" width="1020" height="12" fill="#27272a"/>
  <rect x="300" y="537" width="1000" height="4" fill="#eab308"/>
</svg>
`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  } else if (medium === 'newspaper') {
    // 4:3 Broadsheet Newspaper Print Ad
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="100%" height="100%">
  <!-- Tabletop Background (Warm Oak / Slate) -->
  <rect width="1200" height="900" fill="#262320"/>

  <!-- Morning Espresso Ceramic Cup on Left -->
  <circle cx="140" cy="450" r="70" fill="#1c1917" stroke="#44403c" stroke-width="4"/>
  <circle cx="140" cy="450" r="50" fill="#451a03"/>
  <circle cx="140" cy="450" r="40" fill="#78350f"/>
  <ellipse cx="140" cy="445" rx="20" ry="10" fill="${primaryColor}" opacity="0.6"/>

  <!-- Designer Eyeglasses on Table -->
  <circle cx="1060" cy="380" r="35" fill="none" stroke="${primaryColor}" stroke-width="3"/>
  <circle cx="1140" cy="380" r="35" fill="none" stroke="${primaryColor}" stroke-width="3"/>
  <line x1="1095" y1="380" x2="1105" y2="380" stroke="${primaryColor}" stroke-width="3"/>

  <!-- Broadsheet Newspaper Opened Flat (No people) -->
  <rect x="260" y="60" width="680" height="780" fill="#F4EFE6" rx="4" stroke="#d6d3d1" stroke-width="2"/>

  <!-- Newspaper Header -->
  <text x="600" y="110" font-family="'Newsreader', serif" font-size="32" font-weight="700" fill="#1c1917" text-anchor="middle" letter-spacing="2">THE GLOBAL CHRONICLE</text>
  <line x1="290" y1="125" x2="910" y2="125" stroke="#1c1917" stroke-width="1.5"/>
  <text x="300" y="140" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="#57534e">ISSUE 58,190 • FINANCIAL &amp; DESIGN REVIEW</text>
  <text x="900" y="140" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="#57534e" text-anchor="end">MORNING EDITION</text>
  <line x1="290" y1="148" x2="910" y2="148" stroke="#1c1917" stroke-width="0.75"/>

  <!-- Ad Box Frame -->
  <rect x="290" y="165" width="620" height="645" fill="#fcfbf7" stroke="#1c1917" stroke-width="2"/>
  <text x="600" y="185" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" fill="#78716c" text-anchor="middle" letter-spacing="3">SPECIAL PRINT ADVERTISEMENT</text>

  <!-- Big Editorial Headline -->
  <text x="600" y="235" font-family="'Newsreader', serif" font-size="28" font-weight="700" fill="#1c1917" text-anchor="middle">
    A Quiet Revolution in ${esc(category)} Design.
  </text>
  <text x="600" y="260" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#57534e" text-anchor="middle">
    Formulated with architectural purity and uncompromising materials.
  </text>

  <!-- Newspaper Ink Halftone Image of Product -->
  <rect x="470" y="290" width="260" height="340" fill="#e7e5e4" stroke="#1c1917" stroke-width="1"/>
  <g transform="translate(470, 290) scale(0.65)">
    <rect x="130" y="120" width="140" height="280" rx="18" fill="#292524"/>
    <path d="M 130 140 C 130 60, 170 40, 180 20 L 220 20 C 230 40, 270 60, 270 140 Z" fill="#292524"/>
    <rect x="180" y="-15" width="40" height="35" rx="3" fill="#44403c"/>
    <rect x="182" y="-50" width="36" height="35" rx="3" fill="#57534e"/>
    <rect x="145" y="130" width="14" height="260" rx="7" fill="rgba(255,255,255,0.6)"/>
    <rect x="145" y="170" width="110" height="180" rx="8" fill="#fafaf9" stroke="#1c1917" stroke-width="1.5"/>
    <text x="200" y="215" font-family="'Syne', sans-serif" font-size="18" font-weight="800" fill="#1c1917" text-anchor="middle" letter-spacing="4">${esc(productName)}</text>
    <text x="200" y="235" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="600" fill="#44403c" text-anchor="middle">${esc(category.toUpperCase())}</text>
  </g>

  <!-- Dual Editorial Newspaper Columns -->
  <text x="315" y="660" font-family="'Newsreader', serif" font-size="11" fill="#1c1917">
    In an era saturated by hurried production and disposable commodities,
  </text>
  <text x="315" y="676" font-family="'Newsreader', serif" font-size="11" fill="#1c1917">
    ${esc(productName)} represents an unyielding devotion to aesthetic rigor.
  </text>
  <text x="315" y="692" font-family="'Newsreader', serif" font-size="11" fill="#1c1917">
    Crafted from highest grade materials with meticulous attention to detail.
  </text>

  <text x="615" y="660" font-family="'Newsreader', serif" font-size="11" fill="#1c1917">
    Every unit undergoes rigorous hand-inspection and serial calibration.
  </text>
  <text x="615" y="676" font-family="'Newsreader', serif" font-size="11" fill="#1c1917">
    Available at flagship galleries and accredited luxury purveyors worldwide.
  </text>
  <text x="615" y="692" font-family="'Newsreader', serif" font-size="11" fill="#1c1917">
    Designed for those who demand timeless excellence without distraction.
  </text>

  <line x1="315" y1="730" x2="885" y2="730" stroke="#1c1917" stroke-width="1"/>
  <text x="600" y="755" font-family="'Syne', sans-serif" font-size="12" font-weight="700" fill="#1c1917" text-anchor="middle" letter-spacing="3">
    WWW.${esc(productName.toLowerCase().replace(/[^a-z0-9]/g, ''))}-OFFICIAL.COM • PURE FORM
  </text>
</svg>
`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  } else if (medium === 'social_post') {
    // 1:1 Social Feed Post (Instagram / Pinterest Aesthetic Still Life)
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <defs>
    <linearGradient id="terracottaBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fffbeb"/>
      <stop offset="50%" stop-color="#fef3c7"/>
      <stop offset="100%" stop-color="#fde68a"/>
    </linearGradient>
  </defs>

  <rect width="800" height="800" fill="url(#terracottaBg)"/>

  <!-- Organic Palm Leaf Shadows -->
  <path d="M 0 0 Q 300 120 400 40 Q 250 200 120 300 Z" fill="rgba(180, 83, 9, 0.08)"/>
  <path d="M 50 0 Q 350 200 450 100 Q 320 280 180 380 Z" fill="rgba(180, 83, 9, 0.06)"/>

  <!-- Geometric Travertine Blocks / Pedestals -->
  <polygon points="260,560 540,560 620,640 180,640" fill="#e7e5e4"/>
  <rect x="180" y="640" width="440" height="80" fill="#d6d3d1"/>

  <!-- Water Caustics Glow -->
  <ellipse cx="400" cy="580" rx="200" ry="20" fill="rgba(251, 191, 36, 0.3)"/>

  <!-- Exact Consistent Product Staged on Travertine -->
  <g transform="translate(260, 160) scale(0.7)">
    <rect x="130" y="120" width="140" height="280" rx="18" fill="#b45309"/>
    <path d="M 130 140 C 130 60, 170 40, 180 20 L 220 20 C 230 40, 270 60, 270 140 Z" fill="#b45309"/>
    <rect x="180" y="-15" width="40" height="35" rx="3" fill="${primaryColor}"/>
    <rect x="182" y="-50" width="36" height="35" rx="3" fill="#a16207"/>
    <rect x="145" y="130" width="14" height="260" rx="7" fill="rgba(255,255,255,0.4)"/>
    <rect x="145" y="170" width="110" height="180" rx="8" fill="#1c1917" stroke="${primaryColor}" stroke-width="1.5"/>
    <text x="200" y="215" font-family="'Syne', sans-serif" font-size="18" font-weight="800" fill="${primaryColor}" text-anchor="middle" letter-spacing="4">${esc(productName)}</text>
    <text x="200" y="235" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="600" fill="#fef3c7" text-anchor="middle">${esc(category.toUpperCase())}</text>
  </g>

  <!-- Botanical branch on travertine -->
  <path d="M 520 620 Q 560 590 600 610" stroke="#78350f" stroke-width="3" fill="none"/>
  <ellipse cx="550" cy="595" rx="10" ry="5" fill="#a16207"/>
  <ellipse cx="585" cy="605" rx="10" ry="5" fill="#a16207"/>
</svg>
`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  } else {
    // Default / Subway / Magazine / Storefront / Times Square
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100%" height="100%">
  <rect width="1200" height="800" fill="#09090b"/>
  <rect x="100" y="80" width="1000" height="640" rx="16" fill="#18181b" stroke="#27272a" stroke-width="4"/>
  <g transform="translate(460, 160) scale(0.7)">
    <rect x="130" y="120" width="140" height="280" rx="18" fill="#b45309"/>
    <path d="M 130 140 C 130 60, 170 40, 180 20 L 220 20 C 230 40, 270 60, 270 140 Z" fill="#b45309"/>
    <rect x="180" y="-15" width="40" height="35" rx="3" fill="${primaryColor}"/>
    <rect x="182" y="-50" width="36" height="35" rx="3" fill="#a16207"/>
    <rect x="145" y="130" width="14" height="260" rx="7" fill="rgba(255,255,255,0.4)"/>
    <rect x="145" y="170" width="110" height="180" rx="8" fill="#1c1917" stroke="${primaryColor}" stroke-width="1.5"/>
    <text x="200" y="215" font-family="'Syne', sans-serif" font-size="18" font-weight="800" fill="${primaryColor}" text-anchor="middle" letter-spacing="4">${esc(productName)}</text>
  </g>
  <text x="600" y="580" font-family="'Syne', sans-serif" font-size="28" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="3">${esc(productName.toUpperCase())}</text>
  <text x="600" y="620" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#a1a1aa" text-anchor="middle">${esc(medium.replace(/_/g, ' ').toUpperCase())} ADVERTISING SUITE • ZERO HUMAN CLUTTER</text>
</svg>
`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }
}
