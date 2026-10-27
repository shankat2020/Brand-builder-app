import React from 'react';
import { Layers, ShieldCheck, Sparkles, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';

interface HeaderProps {
  modelType: 'standard' | 'enhanced';
  onModelChange: (model: 'standard' | 'enhanced') => void;
  hasMasterProduct: boolean;
  onOpenBrandDeck?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  modelType,
  onModelChange,
  hasMasterProduct,
  onOpenBrandDeck,
}) => {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
              <Layers className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white font-display">
                Brand Builder
              </h1>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Nano-Banana Studio
              </span>
            </div>
            <p className="text-xs text-neutral-400 hidden sm:block">
              Multi-Medium Product Advertising & Consistency Engine
            </p>
          </div>
        </div>

        {/* Feature Badges & Model Switcher */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          {/* Zero People Shield Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-medium" title="Enforced Negative Constraint: No human figures, faces, or hands in any shot">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero People Enforced</span>
          </div>

          {/* Product Consistency Status */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
            hasMasterProduct
              ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
              : 'bg-neutral-900 border-neutral-800 text-neutral-400'
          }`} title={hasMasterProduct ? 'Master anchor locked - all mediums will inherit exact product geometry and colors' : 'Generate or upload master shot to lock consistency'}>
            <Sparkles className={`w-3.5 h-3.5 ${hasMasterProduct ? 'text-amber-400 animate-pulse' : 'text-neutral-500'}`} />
            <span>{hasMasterProduct ? 'Consistency Anchor Locked' : 'Awaiting Master Shot'}</span>
          </div>

          {/* Model Switcher */}
          <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => onModelChange('standard')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
                modelType === 'standard'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="gemini-3.1-flash-lite-image (Official Nano-Banana default)"
            >
              <span>Nano-Banana</span>
            </button>
            <button
              onClick={() => onModelChange('enhanced')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
                modelType === 'enhanced'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="gemini-nano-banana-2.1 (Enhanced resolution Nano-Banana)"
            >
              <span>Nano-Banana 2.1</span>
            </button>
          </div>

          {/* Brand Deck Trigger */}
          {hasMasterProduct && onOpenBrandDeck && (
            <button
              onClick={onOpenBrandDeck}
              className="px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Brand Deck</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
