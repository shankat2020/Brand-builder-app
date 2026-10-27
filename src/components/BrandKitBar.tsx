import React, { useState } from 'react';
import { BrandKit } from '../types';
import { Check, Copy, Palette, Tag, Compass, Sparkles } from 'lucide-react';

interface BrandKitBarProps {
  brandKit: BrandKit;
  productName: string;
}

export const BrandKitBar: React.FC<BrandKitBarProps> = ({ brandKit, productName }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 sm:p-5 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Extracted Brand Identity Kit</span>
          </div>
          <h3 className="text-lg font-bold text-white font-display">
            {brandKit.primaryHeadline || `${productName} Creative Identity`}
          </h3>
          <p className="text-sm text-neutral-400 italic">
            "{brandKit.tagline}"
          </p>
        </div>

        {/* Color Palette Swatches */}
        <div className="flex items-center gap-2">
          <div className="text-xs text-neutral-400 mr-1 flex items-center gap-1 font-medium">
            <Palette className="w-3.5 h-3.5 text-neutral-400" />
            <span>Palette:</span>
          </div>
          <div className="flex items-center gap-2">
            {brandKit.colors?.map((color, idx) => (
              <button
                key={idx}
                onClick={() => copyColor(color.hex)}
                className="group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-neutral-950/80 border border-neutral-700/60 hover:border-amber-500/50 transition-all text-left"
                title={`Click to copy ${color.hex}`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-white/20 shadow-inner flex-shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-xs font-mono text-neutral-300 group-hover:text-amber-300">
                  {color.hex}
                </span>
                {copiedHex === color.hex ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3 text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Core Attributes */}
        <div className="flex items-center flex-wrap gap-1.5">
          <Tag className="w-3.5 h-3.5 text-neutral-500 mr-0.5" />
          <span className="text-neutral-400 font-medium">Consistency Anchors:</span>
          {brandKit.attributes?.map((attr, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-full bg-neutral-800/80 text-neutral-300 border border-neutral-700/60 font-medium"
            >
              {attr}
            </span>
          ))}
        </div>

        {/* Vibe Summary */}
        {brandKit.vibeSummary && (
          <div className="flex items-center gap-1.5 text-neutral-400 text-xs italic">
            <Compass className="w-3.5 h-3.5 text-amber-500/80" />
            <span>{brandKit.vibeSummary}</span>
          </div>
        )}
      </div>
    </div>
  );
};
