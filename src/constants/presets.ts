import { MediumConfig, PresetProduct } from '../types';

export const PRESET_PRODUCTS: PresetProduct[] = [
  {
    id: 'solis-cold-brew',
    name: 'SOLIS Botanical Cold Brew',
    category: 'Craft Beverage',
    tagline: 'Infused with Sun, Brewed in Shadow.',
    brandAesthetic: 'Organic Nordic Minimalist with Warm Amber Accents',
    description:
      'Heavy-base cylindrical frosted amber glass bottle (350ml) sealed with a ribbed raw sustainable cork and a debossed matte black wax seal. Front features minimalist metallic gold sans-serif foil typography with clean line art of botanical herbs. Amber liquid with faint sunlit translucence.',
    sampleColors: [
      { name: 'Amber Glow', hex: '#D97706' },
      { name: 'Forest Moss', hex: '#1C3829' },
      { name: 'Warm Cork', hex: '#D1A066' },
    ],
  },
  {
    id: 'lumina-serum',
    name: 'LUMINA Cellular Renewal Elixir',
    category: 'Luxury Skincare',
    tagline: 'The Architecture of Radiance.',
    brandAesthetic: 'Ultra-Clean High-End Swiss Dermatology',
    description:
      'Heavy fluted optical crystal dropper vial (50ml) with an architectural brushed titanium collar and precision pipette. The vial reveals an iridescent opalescent milky serum with microscopic gold mica suspension. Crisp silver micro-embossed typography reading "LUMINA FORMULA 07".',
    sampleColors: [
      { name: 'Titanium Slate', hex: '#4B5563' },
      { name: 'Opalescent Pearl', hex: '#F3F4F6' },
      { name: 'Rose Platinum', hex: '#E5D4C0' },
    ],
  },
  {
    id: 'aero-chrono',
    name: 'AERO-01 Precision Chronometer',
    category: 'Horology / Hardware',
    tagline: 'Zero Drag. Pure Velocity.',
    brandAesthetic: 'Industrial Brutalism & Aerospace Grade Precision',
    description:
      'Chiseled 42mm monolithic sandblasted matte dark gray titanium watch case with exposed geometric screws. Recessed dual-layer matte carbon dial, skeletonized hands with a vibrant international high-visibility safety orange second hand tip. Heavy matte titanium integrated bracelet on a dark podium.',
    sampleColors: [
      { name: 'Titanium Gunmetal', hex: '#1F2937' },
      { name: 'Aero Safety Orange', hex: '#F97316' },
      { name: 'Carbon Black', hex: '#0F172A' },
    ],
  },
  {
    id: 'kura-speaker',
    name: 'KURA Acoustic Wave Speaker',
    category: 'Acoustic Industrial Design',
    tagline: 'Sculpted for Pure Resonance.',
    brandAesthetic: 'Japanese Wabi-Sabi Sculptural Minimalism',
    description:
      'Curved monolithic acoustic speaker crafted from textured matte off-white volcanic ceramic clay. Features an asymmetrical circular sound aperture with an internal warm spun-brass acoustic horn reflector, resting on a floating black charred cedar wood stand.',
    sampleColors: [
      { name: 'Volcanic Ceramic', hex: '#E5E7EB' },
      { name: 'Spun Brass', hex: '#CA8A04' },
      { name: 'Charred Cedar', hex: '#18181B' },
    ],
  },
];

export const AVAILABLE_MEDIUMS: MediumConfig[] = [
  {
    id: 'billboard',
    title: 'Highway Billboard',
    category: 'Outdoor',
    description: 'Towering highway billboard against dramatic twilight metropolitan expressway. Colossal product presence, zero people.',
    defaultAspectRatio: '16:9',
    iconName: 'Billboard',
    highlightTag: 'Requested by User',
  },
  {
    id: 'newspaper',
    title: 'Broadsheet Newspaper Ad',
    category: 'Print',
    description: 'Full-page tactile newspaper print ad on morning coffee table desk with authentic ink halftone texture, no people.',
    defaultAspectRatio: '4:3',
    iconName: 'Newspaper',
    highlightTag: 'Requested by User',
  },
  {
    id: 'social_post',
    title: 'Social Media Feed Post',
    category: 'Digital',
    description: 'Trendsetting Instagram/Pinterest still life on architectural travertine pedestals with water caustics, no people.',
    defaultAspectRatio: '1:1',
    iconName: 'Share2',
    highlightTag: 'Requested by User',
  },
  {
    id: 'subway',
    title: 'Subway Lightbox Poster',
    category: 'Outdoor',
    description: 'Sleek backlit illuminated advertising glass poster inside a tranquil modern midnight transit station, no commuters.',
    defaultAspectRatio: '3:4',
    iconName: 'Train',
  },
  {
    id: 'magazine',
    title: 'Luxury Magazine Spread',
    category: 'Print',
    description: 'Open double-page glossy editorial spread on concrete surface with Swiss graphic grid typography layout, no people.',
    defaultAspectRatio: '16:9',
    iconName: 'BookOpen',
  },
  {
    id: 'times_square',
    title: 'Times Square 3D LED Display',
    category: 'Digital',
    description: 'Massive curved 3D anamorphic digital billboard wrapping skyscraper corner at dusk with floating optical illusion, no crowd.',
    defaultAspectRatio: '16:9',
    iconName: 'MonitorPlay',
  },
  {
    id: 'storefront',
    title: 'Flagship Vitrine Window',
    category: 'Retail',
    description: 'Luxury boutique window vitrine at night with museum spotlighting on sculpted podium, no pedestrians.',
    defaultAspectRatio: '1:1',
    iconName: 'Store',
  },
  {
    id: 'unboxing',
    title: 'Unboxing Packaging Suite',
    category: 'Retail',
    description: 'Bespoke rigid matte presentation gift box with debossed metallic foil stamping and archival tissue, no hands.',
    defaultAspectRatio: '1:1',
    iconName: 'Package',
  },
];
