export type MediumType =
  | 'billboard'
  | 'newspaper'
  | 'social_post'
  | 'subway'
  | 'magazine'
  | 'times_square'
  | 'storefront'
  | 'unboxing'
  | 'custom';

export type AspectRatio = '1:1' | '16:9' | '4:3' | '3:4' | '9:16';

export interface MediumConfig {
  id: MediumType;
  title: string;
  category: 'Outdoor' | 'Print' | 'Digital' | 'Retail' | 'Custom';
  description: string;
  defaultAspectRatio: AspectRatio;
  iconName: string;
  highlightTag?: string;
  placeholderPreview?: string;
}

export interface BrandColor {
  name: string;
  hex: string;
}

export interface BrandKit {
  tagline: string;
  primaryHeadline: string;
  colors: BrandColor[];
  attributes: string[];
  vibeSummary: string;
}

export interface ProductProfile {
  name: string;
  category: string;
  description: string;
  brandAesthetic: string;
  modelType: 'standard' | 'enhanced'; // standard = gemini-3.1-flash-lite-image (Nano-Banana), enhanced = gemini-nano-banana-2.1
  masterImageUrl?: string;
  masterBase64?: string;
  brandKit?: BrandKit;
}

export interface MediumShot {
  mediumId: MediumType;
  title: string;
  status: 'idle' | 'generating' | 'completed' | 'error';
  imageUrl?: string;
  base64?: string;
  aspectRatio: AspectRatio;
  promptUsed?: string;
  errorMessage?: string;
  copy?: {
    headline?: string;
    subtext?: string;
    caption?: string;
    hashtags?: string[];
    body?: string;
  };
  customTitle?: string;
  customPrompt?: string;
  generatedAt?: number;
}

export interface PresetProduct {
  id: string;
  name: string;
  category: string;
  tagline: string;
  brandAesthetic: string;
  description: string;
  sampleColors: BrandColor[];
}
