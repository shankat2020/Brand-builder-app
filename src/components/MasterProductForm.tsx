import React, { useState } from 'react';
import { ProductProfile, PresetProduct } from '../types';
import { PRESET_PRODUCTS } from '../constants/presets';
import { Sparkles, Upload, RefreshCw, CheckCircle2, Lock, Eye, AlertCircle } from 'lucide-react';

interface MasterProductFormProps {
  profile: ProductProfile;
  onChange: (updated: Partial<ProductProfile>) => void;
  onGenerateMaster: () => Promise<void>;
  isGenerating: boolean;
  onSelectPreset: (preset: PresetProduct) => void;
}

export const MasterProductForm: React.FC<MasterProductFormProps> = ({
  profile,
  onChange,
  onGenerateMaster,
  isGenerating,
  onSelectPreset,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'custom' | 'upload'>('presets');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('solis-cold-brew');

  // Handle image upload from disk
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onChange({
          masterImageUrl: base64String,
          masterBase64: base64String,
          brandKit: {
            tagline: `${profile.name || 'Custom Product'} - Authentic Essence`,
            primaryHeadline: 'Signature Product Master',
            colors: [
              { name: 'Core Tone', hex: '#262626' },
              { name: 'Highlight Accent', hex: '#F59E0B' },
              { name: 'Pure White', hex: '#FAFAFA' },
            ],
            attributes: ['Custom Master Photo', 'Exact Reference Silhouette', 'No People Mandate'],
            vibeSummary: 'Custom uploaded product reference locked for multi-medium generation.',
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 lg:p-6 backdrop-blur-sm shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <h2 className="text-xl font-bold text-white font-display">
              1. Define & Lock Master Product Shot
            </h2>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Generate or upload the primary hero product shot. The Nano-Banana model uses this image as the visual anchor to maintain 100% packaging, shape, and color consistency across all advertising mediums.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'presets'
                ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Curated Presets
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'custom'
                ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Custom Product
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'upload'
                ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Upload Own Image
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form Area (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {activeTab === 'presets' && (
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Select a Curated Brand Preset:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PRESET_PRODUCTS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setSelectedPresetId(preset.id);
                        onSelectPreset(preset);
                      }}
                      className={`text-left p-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-amber-950/30 border-amber-500/60 shadow-lg shadow-amber-500/10'
                          : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-amber-400">
                          {preset.category}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        )}
                      </div>
                      <div className="font-semibold text-sm text-white font-display leading-snug">
                        {preset.name}
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-1 mt-1">
                        {preset.tagline}
                      </p>
                      {/* Color dots */}
                      <div className="flex items-center gap-1.5 mt-2">
                        {preset.sampleColors.map((col, i) => (
                          <span
                            key={i}
                            className="w-2.5 h-2.5 rounded-full border border-white/20"
                            style={{ backgroundColor: col.hex }}
                          />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="p-4 bg-neutral-950/70 border border-dashed border-neutral-700 rounded-xl text-center">
              <Upload className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <div className="text-sm font-semibold text-white">
                Upload your Product Image as Master Reference
              </div>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-1 mb-3">
                Have an existing product photo or 3D render? Upload it to lock the packaging, shape, and colors for all advertising mediums.
              </p>
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs rounded-xl cursor-pointer transition-colors shadow-md">
                <Upload className="w-3.5 h-3.5" />
                <span>Select Image File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {/* Core Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => onChange({ name: e.target.value })}
                placeholder="e.g., SOLIS Botanical Cold Brew"
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Product Category / Industry
              </label>
              <input
                type="text"
                value={profile.category}
                onChange={(e) => onChange({ category: e.target.value })}
                placeholder="e.g., Craft Beverage, Luxury Cosmetics, Watch"
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Physical & Packaging Visual Details (Shape, Materials, Label, Typography, Cap)
            </label>
            <textarea
              rows={3}
              value={profile.description}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder="Detailed description: bottle silhouette, glass texture, debossed foil typography, cork, color of liquid, logo details..."
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              Tip: The more concrete physical descriptors you provide (e.g. "frosted amber cylinder", "gold sans-serif foil"), the higher the consistency.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Brand Aesthetic & Mood
            </label>
            <input
              type="text"
              value={profile.brandAesthetic}
              onChange={(e) => onChange({ brandAesthetic: e.target.value })}
              placeholder="e.g., Modern Nordic Minimalist, High-Tech Brutalism, Clean Organic Wellness"
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Action button */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onGenerateMaster}
              disabled={isGenerating || !profile.name || !profile.description}
              className={`w-full py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                isGenerating || !profile.name || !profile.description
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700/50'
                  : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 hover:from-amber-400 hover:to-orange-400 text-neutral-950 shadow-amber-500/20 active:scale-[0.99]'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-neutral-950" />
                  <span>Synthesizing Master Product Shot with Nano-Banana...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-neutral-950" />
                  <span>
                    {profile.masterImageUrl ? 'Re-Generate Master Anchor Shot' : 'Generate Master Product Shot'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Preview Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-[340px] aspect-square rounded-2xl bg-neutral-950 border-2 border-neutral-800 overflow-hidden relative group shadow-2xl flex items-center justify-center">
            {profile.masterImageUrl ? (
              <>
                <img
                  src={profile.masterImageUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-xs font-semibold text-amber-400">Master Product Anchor</span>
                  <span className="text-sm font-bold text-white font-display">{profile.name}</span>
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-neutral-900/90 border border-amber-500/50 text-[10px] font-semibold text-amber-300 flex items-center gap-1 shadow-md">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Consistency Anchor</span>
                </div>
              </>
            ) : (
              <div className="p-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-600">
                  <Sparkles className="w-7 h-7 text-amber-500/60" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-300">
                    Master Product Preview
                  </div>
                  <p className="text-xs text-neutral-500 mt-1 max-w-[220px]">
                    Click "Generate Master Product Shot" to create your visual consistency reference.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 text-[11px] text-amber-400/90 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                  <AlertCircle className="w-3 h-3" />
                  <span>Zero People In Shot</span>
                </div>
              </div>
            )}
          </div>

          {profile.masterImageUrl && (
            <div className="mt-3 text-center">
              <span className="text-xs text-emerald-400 font-medium flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Reference Locked: All medium shots will match this product.</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
