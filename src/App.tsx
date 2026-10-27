import React, { useState, useEffect } from 'react';
import {
  ProductProfile,
  MediumType,
  MediumShot,
  AspectRatio,
  PresetProduct,
} from './types';
import { PRESET_PRODUCTS, AVAILABLE_MEDIUMS } from './constants/presets';
import {
  DEMO_MASTER_IMAGE,
  DEMO_BILLBOARD_IMAGE,
  DEMO_NEWSPAPER_IMAGE,
  DEMO_SOCIAL_IMAGE,
  DEMO_SUBWAY_IMAGE,
} from './constants/demoShots';
import { Header } from './components/Header';
import { MasterProductForm } from './components/MasterProductForm';
import { BrandKitBar } from './components/BrandKitBar';
import { MediumSelector } from './components/MediumSelector';
import { MediumCard } from './components/MediumCard';
import { MockupViewer } from './components/MockupViewer';
import { ComparisonModal } from './components/ComparisonModal';
import { BrandDeckModal } from './components/BrandDeckModal';
import {
  Layers,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Play,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function App() {
  // Model state: default 'standard' (gemini-3.1-flash-lite-image alias for Nano-Banana)
  const [modelType, setModelType] = useState<'standard' | 'enhanced'>('standard');

  // Product Profile State
  const defaultPreset = PRESET_PRODUCTS[0]; // SOLIS Botanical Cold Brew
  const [profile, setProfile] = useState<ProductProfile>({
    name: defaultPreset.name,
    category: defaultPreset.category,
    description: defaultPreset.description,
    brandAesthetic: defaultPreset.brandAesthetic,
    modelType: 'standard',
    brandKit: {
      tagline: defaultPreset.tagline,
      primaryHeadline: `${defaultPreset.name} • Master Campaign`,
      colors: defaultPreset.sampleColors,
      attributes: ['Frosted Amber Glass', 'Gold Foil Embossing', 'Sustainable Cork Seal'],
      vibeSummary: 'Organic Nordic Minimalist with warm amber botanicals and clean typography.',
    },
  });

  const [isGeneratingMaster, setIsGeneratingMaster] = useState(false);
  const [isGeneratingCampaign, setIsGeneratingCampaign] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Selected mediums for the campaign (default to the ones requested: billboard, newspaper, social_post, plus subway)
  const [selectedMediums, setSelectedMediums] = useState<MediumType[]>([
    'billboard',
    'newspaper',
    'social_post',
    'subway',
  ]);

  // Medium shots state
  const [shots, setShots] = useState<MediumShot[]>(() =>
    AVAILABLE_MEDIUMS.map((med) => ({
      mediumId: med.id,
      title: med.title,
      status: 'idle',
      aspectRatio: med.defaultAspectRatio,
    }))
  );

  // Active modals
  const [activeMockupShot, setActiveMockupShot] = useState<MediumShot | null>(null);
  const [activeCompareShot, setActiveCompareShot] = useState<MediumShot | null>(null);
  const [showBrandDeck, setShowBrandDeck] = useState(false);

  // Load Sample Campaign (Instant pre-rendered consistent shots)
  const handleLoadSampleCampaign = () => {
    setProfile((prev) => ({
      ...prev,
      masterImageUrl: DEMO_MASTER_IMAGE,
      masterBase64: DEMO_MASTER_IMAGE,
    }));

    setShots((prev) =>
      prev.map((s) => {
        if (s.mediumId === 'billboard') {
          return { ...s, status: 'completed', imageUrl: DEMO_BILLBOARD_IMAGE, promptUsed: 'Billboard highway display of SOLIS Botanical Cold Brew. Zero people.' };
        }
        if (s.mediumId === 'newspaper') {
          return { ...s, status: 'completed', imageUrl: DEMO_NEWSPAPER_IMAGE, promptUsed: 'Broadsheet newspaper full-page print ad of SOLIS Botanical Cold Brew. Zero people.' };
        }
        if (s.mediumId === 'social_post') {
          return { ...s, status: 'completed', imageUrl: DEMO_SOCIAL_IMAGE, promptUsed: 'Social feed travertine still life of SOLIS Botanical Cold Brew. Zero people.' };
        }
        if (s.mediumId === 'subway') {
          return { ...s, status: 'completed', imageUrl: DEMO_SUBWAY_IMAGE, promptUsed: 'Subway station backlit lightbox of SOLIS Botanical Cold Brew. Zero people.' };
        }
        return s;
      })
    );
  };

  // Handle Preset selection
  const handleSelectPreset = (preset: PresetProduct) => {
    setProfile((prev) => ({
      ...prev,
      name: preset.name,
      category: preset.category,
      description: preset.description,
      brandAesthetic: preset.brandAesthetic,
      brandKit: {
        tagline: preset.tagline,
        primaryHeadline: `${preset.name} • Creative Identity`,
        colors: preset.sampleColors,
        attributes: [preset.category, 'Signature Silhouette', 'Pure Aesthetic'],
        vibeSummary: preset.brandAesthetic,
      },
      // Keep master image if user generated one or clear for new preset
      masterImageUrl: undefined,
      masterBase64: undefined,
    }));
    // Reset shots status
    setShots((prev) =>
      prev.map((s) => ({
        ...s,
        status: 'idle',
        imageUrl: undefined,
        base64: undefined,
      }))
    );
  };

  // Generate Master Product Shot (Visual consistency anchor)
  const handleGenerateMaster = async () => {
    setIsGeneratingMaster(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-master', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: profile.name,
          category: profile.category,
          description: profile.description,
          brandAesthetic: profile.brandAesthetic,
          modelType,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate master product shot');
      }

      setProfile((prev) => ({
        ...prev,
        masterImageUrl: data.masterImageUrl,
        masterBase64: data.masterBase64,
        brandKit: data.brandKit || prev.brandKit,
      }));
    } catch (err: any) {
      console.error('Master generation error:', err);
      setErrorMessage(err.message || 'Error communicating with Nano-Banana model.');
    } finally {
      setIsGeneratingMaster(false);
    }
  };

  // Generate a single medium shot
  const handleGenerateSingleMedium = async (mediumId: string) => {
    setShots((prev) =>
      prev.map((s) => (s.mediumId === mediumId ? { ...s, status: 'generating', errorMessage: undefined } : s))
    );

    const shot = shots.find((s) => s.mediumId === mediumId);
    if (!shot) return;

    try {
      const response = await fetch('/api/generate-medium', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: profile.name,
          category: profile.category,
          description: profile.description,
          brandAesthetic: profile.brandAesthetic,
          medium: shot.mediumId,
          customMediumTitle: shot.customTitle,
          customMediumPrompt: shot.customPrompt,
          aspectRatio: shot.aspectRatio,
          masterBase64: profile.masterBase64,
          modelType,
          headline: profile.brandKit?.primaryHeadline,
          tagline: profile.brandKit?.tagline,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || `Failed to generate image for ${shot.title}`);
      }

      setShots((prev) =>
        prev.map((s) =>
          s.mediumId === mediumId
            ? {
                ...s,
                status: 'completed',
                imageUrl: data.imageUrl,
                base64: data.base64,
                promptUsed: data.promptUsed,
                generatedAt: Date.now(),
              }
            : s
        )
      );
    } catch (err: any) {
      console.error(`Error generating ${mediumId}:`, err);
      setShots((prev) =>
        prev.map((s) =>
          s.mediumId === mediumId
            ? { ...s, status: 'error', errorMessage: err.message || 'Generation failed' }
            : s
        )
      );
    }
  };

  // Generate all selected mediums in the campaign
  const handleGenerateAllSelected = async () => {
    if (selectedMediums.length === 0) return;

    setIsGeneratingCampaign(true);
    setErrorMessage(null);

    // If master product shot has not been generated yet, generate it first for visual consistency!
    let masterBase64ToUse = profile.masterBase64;
    if (!profile.masterImageUrl) {
      try {
        setIsGeneratingMaster(true);
        const masterRes = await fetch('/api/generate-master', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productName: profile.name,
            category: profile.category,
            description: profile.description,
            brandAesthetic: profile.brandAesthetic,
            modelType,
          }),
        });
        const masterData = await masterRes.json();
        if (masterRes.ok && masterData.success) {
          masterBase64ToUse = masterData.masterBase64;
          setProfile((prev) => ({
            ...prev,
            masterImageUrl: masterData.masterImageUrl,
            masterBase64: masterData.masterBase64,
            brandKit: masterData.brandKit || prev.brandKit,
          }));
        }
      } catch (masterErr) {
        console.warn('Auto-master generation notice:', masterErr);
      } finally {
        setIsGeneratingMaster(false);
      }
    }

    // Set all selected mediums to generating
    setShots((prev) =>
      prev.map((s) =>
        selectedMediums.includes(s.mediumId)
          ? { ...s, status: 'generating', errorMessage: undefined }
          : s
      )
    );

    // Execute generation in parallel
    const promises = selectedMediums.map(async (mediumId) => {
      const shot = shots.find((s) => s.mediumId === mediumId);
      if (!shot) return;

      try {
        const response = await fetch('/api/generate-medium', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productName: profile.name,
            category: profile.category,
            description: profile.description,
            brandAesthetic: profile.brandAesthetic,
            medium: shot.mediumId,
            customMediumTitle: shot.customTitle,
            customMediumPrompt: shot.customPrompt,
            aspectRatio: shot.aspectRatio,
            masterBase64: masterBase64ToUse,
            modelType,
            headline: profile.brandKit?.primaryHeadline,
            tagline: profile.brandKit?.tagline,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || `Failed to generate image for ${shot.title}`);
        }

        setShots((prev) =>
          prev.map((s) =>
            s.mediumId === mediumId
              ? {
                  ...s,
                  status: 'completed',
                  imageUrl: data.imageUrl,
                  base64: data.base64,
                  promptUsed: data.promptUsed,
                  generatedAt: Date.now(),
                }
              : s
          )
        );
      } catch (err: any) {
        console.error(`Failed ${mediumId}:`, err);
        setShots((prev) =>
          prev.map((s) =>
            s.mediumId === mediumId
              ? { ...s, status: 'error', errorMessage: err.message || 'Generation error' }
              : s
          )
        );
      }
    });

    await Promise.allSettled(promises);
    setIsGeneratingCampaign(false);
  };

  // Toggle medium selection
  const handleToggleMedium = (mediumId: MediumType) => {
    setSelectedMediums((prev) =>
      prev.includes(mediumId) ? prev.filter((id) => id !== mediumId) : [...prev, mediumId]
    );
  };

  // Select all / Deselect all
  const handleSelectAll = () => {
    setSelectedMediums(shots.map((s) => s.mediumId));
  };
  const handleDeselectAll = () => {
    setSelectedMediums([]);
  };

  // Add custom placement medium
  const handleAddCustomMedium = (title: string, prompt: string, aspectRatio: AspectRatio) => {
    const newId = `custom_${Date.now()}` as MediumType;
    const newShot: MediumShot = {
      mediumId: newId,
      title,
      status: 'idle',
      aspectRatio,
      customTitle: title,
      customPrompt: prompt,
    };

    setShots((prev) => [newShot, ...prev]);
    setSelectedMediums((prev) => [newId, ...prev]);
  };

  // Download image file
  const handleDownloadShot = (shot: MediumShot) => {
    if (!shot.imageUrl) return;
    const a = document.createElement('a');
    a.href = shot.imageUrl;
    a.download = `${profile.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${shot.mediumId}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-400 selection:text-neutral-950">
      {/* App Header */}
      <Header
        modelType={modelType}
        onModelChange={setModelType}
        hasMasterProduct={!!profile.masterImageUrl}
        onOpenBrandDeck={() => setShowBrandDeck(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Banner Announcement & Guarantees */}
        <div className="bg-gradient-to-r from-amber-950/40 via-neutral-900 to-neutral-900 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm sm:text-base font-display">
                  Nano-Banana Multi-Medium Brand Studio
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500 text-neutral-950">
                  Consistency Locked
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Describe any product and imagine it across billboards, broadsheet newspapers, social feeds, and more.
                <strong className="text-neutral-200 ml-1">Zero people appear in any shot</strong>, maintaining 100% packaging and brand consistency.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleLoadSampleCampaign}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Instantly explore pre-rendered billboard, newspaper, and social post shots"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Load Sample Campaign</span>
            </button>
            <div className="text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Strictly Human-Free</span>
            </div>
          </div>
        </div>

        {/* Global Error Banner if any */}
        {errorMessage && (
          <div className="p-4 bg-rose-950/40 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-400 hover:text-white font-semibold underline text-xs"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* STEP 1: Master Product Profile Form & Visual Anchor */}
        <MasterProductForm
          profile={profile}
          onChange={(updated) => setProfile((prev) => ({ ...prev, ...updated }))}
          onGenerateMaster={handleGenerateMaster}
          isGenerating={isGeneratingMaster}
          onSelectPreset={handleSelectPreset}
        />

        {/* Brand Kit Bar (Displays when profile has brandKit) */}
        {profile.brandKit && (
          <BrandKitBar brandKit={profile.brandKit} productName={profile.name} />
        )}

        {/* STEP 2: Advertising Medium Selector & Campaign Trigger */}
        <MediumSelector
          selectedMediums={selectedMediums}
          onToggleMedium={handleToggleMedium}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          onGenerateAll={handleGenerateAllSelected}
          isGeneratingAny={isGeneratingCampaign}
          hasMasterProduct={!!profile.masterImageUrl}
          onAddCustomMedium={handleAddCustomMedium}
        />

        {/* STEP 3: Campaign Executions Showcase */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <h2 className="text-xl font-bold text-white font-display">
                  3. Campaign Executions Across Mediums
                </h2>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                High-fidelity advertising shots synthesized with Nano-Banana. Click "Mockup" to view in context, or "Inspect" for side-by-side consistency check.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-400">
                Completed:{' '}
                <strong className="text-white">
                  {shots.filter((s) => s.status === 'completed').length} / {shots.length}
                </strong>
              </span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {shots.map((shot) => (
              <MediumCard
                key={shot.mediumId}
                shot={shot}
                masterImageUrl={profile.masterImageUrl}
                productName={profile.name}
                onGenerateSingle={handleGenerateSingleMedium}
                onOpenMockup={(s) => setActiveMockupShot(s)}
                onOpenCompare={(s) => setActiveCompareShot(s)}
                onDownload={handleDownloadShot}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800 bg-neutral-950 py-6 px-4 mt-12 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-300">Brand Builder</span>
            <span>• Powered by Google Gemini Nano-Banana</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Zero People Guarantee</span>
            <span>•</span>
            <span>Multimodal Consistency Locking</span>
            <span>•</span>
            <span>Billboard • Newspaper • Social Feed</span>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Realistic Mockup Viewer (Billboard, Newspaper, Social post frame) */}
      {activeMockupShot && (
        <MockupViewer
          shot={activeMockupShot}
          productName={profile.name}
          category={profile.category}
          brandKit={profile.brandKit}
          onClose={() => setActiveMockupShot(null)}
          onDownload={handleDownloadShot}
        />
      )}

      {/* 2. Side-by-Side Consistency Comparison Modal */}
      {activeCompareShot && profile.masterImageUrl && (
        <ComparisonModal
          shot={activeCompareShot}
          masterImageUrl={profile.masterImageUrl}
          productName={profile.name}
          onClose={() => setActiveCompareShot(null)}
        />
      )}

      {/* 3. Full Brand Campaign Deck Presentation Modal */}
      {showBrandDeck && (
        <BrandDeckModal
          profile={profile}
          shots={shots}
          onClose={() => setShowBrandDeck(false)}
        />
      )}
    </div>
  );
}
