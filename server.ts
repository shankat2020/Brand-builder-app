import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import {
  generateStudioMasterShot,
  generateStudioMediumShot,
  generateStudioBrandKit,
} from './src/server/studioSynthesis';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini Client with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Nano-Banana model identifiers according to system guidelines:
// 'gemini-3.1-flash-lite-image' (Nano-Banana / Flash Image default)
// 'gemini-nano-banana-2.1' (Nano-Banana 2.1 high quality)
const NANO_BANANA_MODELS = {
  standard: 'gemini-3.1-flash-lite-image',
  enhanced: 'gemini-nano-banana-2.1',
};

async function startServer() {
  const app = express();
  const PORT = 3000; // Dev server must run on port 3000 per environment constraints

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasApiKey: !!process.env.GEMINI_API_KEY,
      defaultModel: NANO_BANANA_MODELS.standard,
    });
  });

  // Generate Master Product Shot (The visual consistency anchor)
  app.post('/api/generate-master', async (req, res) => {
    const {
      productName,
      category = 'premium product',
      description = '',
      brandAesthetic = 'Modern luxury minimalist',
      modelType = 'standard',
    } = req.body || {};

    if (!productName || !description) {
      return res.status(400).json({ error: 'Product name and description are required' });
    }

    try {

      const selectedModel =
        modelType === 'enhanced'
          ? NANO_BANANA_MODELS.enhanced
          : NANO_BANANA_MODELS.standard;

      // Master product anchor prompt crafted specifically for high-consistency reference
      const masterPrompt = `Commercial master studio product photography of ${productName}, a ${category || 'premium product'}.
Detailed physical appearance: ${description}.
Brand aesthetic: ${brandAesthetic || 'Modern luxury minimalist'}.
Composition: Centered single hero shot in pristine commercial photography studio, 8k resolution, crisp razor-sharp focus on the product, immaculate packaging typography and brand detailing, authentic material textures (frosted glass, brushed aluminum, matte coating, polished ceramic). Soft natural contact shadow on pure neutral studio podium, elegant balanced studio softbox lighting with subtle specular highlights.
STRICT NEGATIVE INSTRUCTION: ABSOLUTELY NO PEOPLE, NO HUMANS, NO HANDS, NO FINGERS, NO FACES, NO BODIES, NO SILHOUETTES OF PEOPLE. ONLY THE PRODUCT IN THE STUDIO.`;

      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: {
          parts: [{ text: masterPrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: '1:1',
          },
        },
      });

      let masterImageUrl = '';
      let masterBase64 = '';

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            masterBase64 = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || 'image/png';
            masterImageUrl = `data:${mimeType};base64,${masterBase64}`;
            break;
          }
        }
      }

      if (!masterImageUrl) {
        return res.status(500).json({
          error: 'No image data returned from Nano-Banana model. Please try again.',
        });
      }

      // Generate Brand Identity Kit & Copy via Gemini 3.8 Flash
      let brandKit = {
        tagline: `${productName}: Redefining ${category || 'Excellence'}.`,
        primaryHeadline: `Crafted for Distinction.`,
        colors: [
          { name: 'Core Onyx', hex: '#111827' },
          { name: 'Accented Gold', hex: '#D97706' },
          { name: 'Neutral Mist', hex: '#F3F4F6' },
        ],
        attributes: ['Precision Engineered', 'Signature Silhouette', 'Pure Aesthetic'],
        vibeSummary: `${brandAesthetic} identity with iconic visual presence.`,
      };

      try {
        const copyResponse = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `You are an elite creative brand director. Analyze this product and provide creative advertising headlines, brand colors, and core visual attributes.
Product: ${productName} (${category})
Description: ${description}
Aesthetic: ${brandAesthetic}

Return JSON with format:
{
  "tagline": "Short punchy slogan",
  "primaryHeadline": "Dramatic advertising headline",
  "colors": [
    {"name": "Color name", "hex": "#HEXCODE"},
    {"name": "Color name", "hex": "#HEXCODE"},
    {"name": "Color name", "hex": "#HEXCODE"}
  ],
  "attributes": ["attribute 1", "attribute 2", "attribute 3"],
  "vibeSummary": "One sentence summary of the brand aesthetic"
}`,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (copyResponse.text) {
          brandKit = JSON.parse(copyResponse.text.trim());
        }
      } catch (copyErr) {
        console.warn('Failed to generate brand kit copy, using fallback:', copyErr);
      }

      res.json({
        success: true,
        masterImageUrl,
        masterBase64,
        modelUsed: selectedModel,
        brandKit,
        prompt: masterPrompt,
      });
    } catch (err: any) {
      console.warn('Live Nano-Banana call unavailable, synthesizing with Studio Engine:', err.message);
      // Fallback: Generate customized high-fidelity studio asset for user's product
      const studioMasterUrl = generateStudioMasterShot({
        productName,
        category,
        description,
        brandAesthetic,
      });
      const brandKit = generateStudioBrandKit({
        productName,
        category,
        description,
        brandAesthetic,
      });

      return res.json({
        success: true,
        masterImageUrl: studioMasterUrl,
        masterBase64: studioMasterUrl,
        modelUsed: 'Studio Synthesis Engine (Nano-Banana Fallback)',
        brandKit,
        prompt: `Commercial master studio product photography of ${productName}. Zero people.`,
      });
    }
  });

  // Generate Image across Mediums (Billboard, Newspaper, Social Post, etc.) maintaining consistency
  app.post('/api/generate-medium', async (req, res) => {
    const {
      productName,
      category = 'Product',
      description = '',
      brandAesthetic = 'Modern luxury',
      medium,
      customMediumTitle,
      customMediumPrompt,
      aspectRatio = '16:9',
      masterBase64,
      modelType = 'standard',
      headline,
      tagline,
    } = req.body || {};

    if (!productName || !medium) {
      return res.status(400).json({ error: 'Product name and medium are required' });
    }

    let targetAspectRatio = aspectRatio || '16:9';

    try {

      const selectedModel =
        modelType === 'enhanced'
          ? NANO_BANANA_MODELS.enhanced
          : NANO_BANANA_MODELS.standard;

      // Medium-specific environmental scene builders
      let mediumEnvironmentPrompt = '';
      targetAspectRatio = aspectRatio;

      switch (medium) {
        case 'billboard':
          targetAspectRatio = '16:9';
          mediumEnvironmentPrompt = `A colossal high-impact outdoor commercial highway billboard towering above a scenic modern metropolitan expressway at blue hour twilight.
The gigantic illuminated billboard banner prominently features the EXACT SAME PRODUCT: ${productName} (${description}), showcased in crisp hyper-scale with dramatic commercial advertising typography and the tagline "${tagline || 'Engineered for Perfection'}".
The environment features sweeping highway bridges, smooth trailing car light streaks below, clean modern skyline architecture against an atmospheric dusk sky.
STRICT MANDATE: ZERO PEOPLE. NO human beings, NO drivers visible, NO pedestrians, NO hands, NO faces, NO silhouettes of people. The focus is exclusively on the massive architectural billboard showcasing ${productName}.`;
          break;

        case 'newspaper':
          targetAspectRatio = '4:3';
          mediumEnvironmentPrompt = `An editorial still life photograph of a full-page luxury print advertisement in a prestigious daily broadsheet newspaper (such as the Financial Times or International Herald).
The open broadsheet newspaper is laid cleanly on a minimalist polished dark marble or light oak architect's table next to designer glasses and a ceramic espresso cup.
The printed advertisement in the newspaper features the EXACT SAME PRODUCT: ${productName} (${description}), reproduced with authentic tactile newsprint ink textures, vintage/modern serif typography layout, bold editorial headline "${headline || 'The Standard of Distinction'}", and elegant dual-column body text.
Diffused natural morning light casting soft architectural window shadows.
STRICT MANDATE: ZERO PEOPLE. NO hands holding the paper, NO human figures, NO faces, NO people anywhere. Pure still-life print ad presentation.`;
          break;

        case 'social_post':
          targetAspectRatio = '1:1';
          mediumEnvironmentPrompt = `A high-aesthetic, trendsetting social media ad creative shot (Instagram & Pinterest hero still life).
The EXACT SAME PRODUCT: ${productName} (${description}) is staged on floating geometric architectural travertine pedestals surrounded by serene rippling water caustics and organic palm leaf shadows cast against a minimalist textured limestone wall.
Vibrant editorial color harmony matching ${brandAesthetic || 'modern luxury'}, crystal-clear reflections, dynamic modern angle, ultra-sharp product details.
STRICT MANDATE: ZERO PEOPLE. NO hands holding the product, NO human models, NO faces, NO bodies. Pure stylized aesthetic still life product scene.`;
          break;

        case 'subway':
          targetAspectRatio = '3:4';
          mediumEnvironmentPrompt = `A sleek illuminated glass advertising poster display inside an ultra-modern, serene architectural underground subway transit station.
The large vertical backlit lightbox poster vividly showcases the EXACT SAME PRODUCT: ${productName} (${description}) with crisp high-fashion transit typography and minimalist layout.
The surrounding station features polished granite floors with crisp reflections of the poster glow, minimalist architectural columns, and soft ambient station lighting. The station is tranquil and empty.
STRICT MANDATE: ZERO PEOPLE. NO commuters, NO passengers, NO pedestrians, NO human silhouettes. Only the architectural transit space and illuminated product poster.`;
          break;

        case 'magazine':
          targetAspectRatio = '16:9';
          mediumEnvironmentPrompt = `A high-fashion double-page luxury editorial spread inside a heavy-weight matte art magazine lying flat on a minimalist concrete table.
Across both open pages is an expansive, breathtaking print campaign starring the EXACT SAME PRODUCT: ${productName} (${description}).
Sophisticated Swiss graphic design grid layout, delicate typography, striking negative space, tactile paper grain texture visible in the spine fold.
STRICT MANDATE: ZERO PEOPLE. NO hands turning pages, NO human figures, NO faces. Pure editorial print mockup.`;
          break;

        case 'times_square':
          targetAspectRatio = '16:9';
          mediumEnvironmentPrompt = `An awe-inspiring architectural photograph of a massive curved 3D anamorphic digital LED billboard on the corner of a modern skyscraper at dusk.
The hyper-realistic 3D screen creates a jaw-dropping optical illusion of the EXACT SAME PRODUCT: ${productName} (${description}) seemingly emerging outward from the display into the sky with volumetric light rays and vivid reflections.
Modern glass towers in the background, deep twilight purple sky.
STRICT MANDATE: ZERO PEOPLE. NO pedestrians, NO crowds, NO human figures. Uninhabited high-angle architectural vista centered on the giant 3D screen.`;
          break;

        case 'storefront':
          targetAspectRatio = '1:1';
          mediumEnvironmentPrompt = `A prestigious luxury flagship boutique storefront vitrine window display at night.
Behind pristine anti-reflective gallery glass, the EXACT SAME PRODUCT: ${productName} (${description}) is elevated on a bespoke sculpted pedestal under dramatic museum pinpoint spotlights, framed by rich architectural accents and textured velvet backdrops.
STRICT MANDATE: ZERO PEOPLE. NO shoppers, NO store staff, NO pedestrians in reflection. Pure opulent window presentation.`;
          break;

        case 'unboxing':
          targetAspectRatio = '1:1';
          mediumEnvironmentPrompt = `An exquisite premium packaging and unboxing still-life setup.
The EXACT SAME PRODUCT: ${productName} (${description}) is presented beside its bespoke rigid matte gift box, featuring debossed metallic foil branding, crisp unboxing tissue paper, and architectural presentation cards on a honed terrazzo surface.
STRICT MANDATE: ZERO PEOPLE. NO hands opening boxes, NO human figures. Pure luxury packaging still life.`;
          break;

        case 'custom':
        default:
          targetAspectRatio = aspectRatio || '16:9';
          mediumEnvironmentPrompt = `Commercial advertising showcase of the EXACT SAME PRODUCT: ${productName} (${description}).
Medium environment: ${customMediumPrompt || customMediumTitle || 'Modern advertising placement'}.
Brand aesthetic: ${brandAesthetic || 'Modern luxury'}.
STRICT MANDATE: ZERO PEOPLE. ABSOLUTELY NO HUMANS, NO FACES, NO HANDS, NO BODIES, NO PEOPLE ANYWHERE IN THE SHOT. Pure commercial product scene.`;
          break;
      }

      // Consistency instruction referencing the master product
      const consistencyInstruction = `
CRITICAL VISUAL CONSISTENCY REQUIREMENT:
You must strictly preserve the identical product identity, packaging silhouette, materials, color scheme, logo branding, and physical shape of ${productName} as shown in the reference image. The exact same item must be rendered into this specific advertising context.
ABSOLUTE NEGATIVE REQUIREMENT: NO PEOPLE. NO HUMANS. NO HANDS. NO FACES. Pure still life / architecture / scenery only.`;

      const fullPrompt = `${mediumEnvironmentPrompt} \n${consistencyInstruction}`;

      const contentsParts: any[] = [];

      // If we have the master product image base64, pass it as multimodal context for visual consistency
      if (masterBase64) {
        // Strip data:image/...;base64, prefix if present
        const cleanBase64 = masterBase64.replace(/^data:image\/[a-z]+;base64,/, '');
        contentsParts.push({
          inlineData: {
            mimeType: 'image/png',
            data: cleanBase64,
          },
        });
      }

      contentsParts.push({
        text: fullPrompt,
      });

      // Call Nano-Banana model
      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: {
          parts: contentsParts,
        },
        config: {
          imageConfig: {
            aspectRatio: targetAspectRatio as any,
          },
        },
      });

      let generatedImageUrl = '';
      let generatedBase64 = '';

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            generatedBase64 = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || 'image/png';
            generatedImageUrl = `data:${mimeType};base64,${generatedBase64}`;
            break;
          }
        }
      }

      if (!generatedImageUrl) {
        return res.status(500).json({
          error: `Nano-Banana failed to produce an image for medium "${medium}".`,
        });
      }

      res.json({
        success: true,
        medium,
        imageUrl: generatedImageUrl,
        base64: generatedBase64,
        aspectRatio: targetAspectRatio,
        modelUsed: selectedModel,
        promptUsed: fullPrompt,
      });
    } catch (err: any) {
      console.warn(`Live Nano-Banana medium generation unavailable for ${medium}, using Studio Engine:`, err.message);
      // Fallback: Generate customized medium asset matching user's product with zero people
      const studioMediumUrl = generateStudioMediumShot(
        {
          productName,
          category,
          description,
          brandAesthetic,
          headline,
          tagline,
        },
        medium,
        targetAspectRatio
      );

      return res.json({
        success: true,
        medium,
        imageUrl: studioMediumUrl,
        base64: studioMediumUrl,
        aspectRatio: targetAspectRatio,
        modelUsed: 'Studio Synthesis Engine (Nano-Banana Fallback)',
        promptUsed: `Commercial advertising showcase of ${productName} in ${medium}. Strictly no people.`,
      });
    }
  });

  // Generate Medium-Specific Copywriting (Headlines, Taglines, Social Captions)
  app.post('/api/generate-copy', async (req, res) => {
    try {
      const { productName, category, description, brandAesthetic, mediums } = req.body;

      const prompt = `You are a world-class advertising copywriter. Create tailored ad copy for each medium for:
Product: ${productName} (${category})
Description: ${description}
Brand Tone: ${brandAesthetic}

Provide specific copy for:
1. Billboard (Punchy 3-6 word headline, ultra high impact)
2. Newspaper (Thoughtful editorial headline, prestigious subhead, and 2-sentence journalistic ad body)
3. Social Post (Hook headline, engaging caption with product benefits, call to action, and 4 hashtags)
4. Subway / Transit (Bold urban commuter slogan)
5. Luxury Magazine (Evocative poetic phrase)

Return valid JSON with format:
{
  "billboard": { "headline": "...", "subtext": "..." },
  "newspaper": { "headline": "...", "subhead": "...", "body": "..." },
  "social_post": { "headline": "...", "caption": "...", "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4"] },
  "subway": { "headline": "...", "subtext": "..." },
  "magazine": { "headline": "...", "subtext": "..." }
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const copyData = JSON.parse(response.text?.trim() || '{}');
      res.json({ success: true, copy: copyData });
    } catch (err: any) {
      console.error('Copy generation error:', err);
      res.status(500).json({ error: 'Failed to generate copywriting.' });
    }
  });

  // Mount Vite dev server or serve production build
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Brand Builder server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
