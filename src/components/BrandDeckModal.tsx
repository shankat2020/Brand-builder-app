import React from 'react';
import { ProductProfile, MediumShot } from '../types';
import { X, Printer, Download, Sparkles, Layers, ShieldCheck } from 'lucide-react';

interface BrandDeckModalProps {
  profile: ProductProfile;
  shots: MediumShot[];
  onClose: () => void;
}

export const BrandDeckModal: React.FC<BrandDeckModalProps> = ({
  profile,
  shots,
  onClose,
}) => {
  const completedShots = shots.filter((s) => s.status === 'completed' && s.imageUrl);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[95vh]">
        {/* Controls Bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60 print:hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white font-display">
              Brand Campaign Presentation Deck
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Deck Content Canvas */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-10 bg-neutral-950 text-white">
          {/* Deck Cover / Header */}
          <div className="border-b border-neutral-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                Brand Builder Campaign Deck • Model: Nano-Banana
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold font-display tracking-tight text-white mt-2">
                {profile.name}
              </h1>
              <p className="text-lg text-neutral-300 font-editorial italic mt-1">
                "{profile.brandKit?.tagline || profile.description}"
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                  {profile.category}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero Human Clutter Enforced</span>
                </span>
              </div>
            </div>

            {/* Color Palette */}
            {profile.brandKit?.colors && (
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                  Campaign Brand Palette
                </span>
                <div className="flex items-center gap-2">
                  {profile.brandKit.colors.map((c, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div
                        className="w-10 h-10 rounded-xl border border-white/20 shadow-md"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[10px] font-mono text-neutral-400">{c.hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Master Anchor Section */}
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 aspect-square rounded-xl overflow-hidden border border-neutral-700 bg-black">
              {profile.masterImageUrl && (
                <img
                  src={profile.masterImageUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="md:col-span-7 space-y-3">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Visual Consistency Reference Anchor
              </span>
              <h3 className="text-2xl font-bold font-display text-white">
                Master Studio Product Asset
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {profile.description}
              </p>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-xs text-neutral-400">
                <span className="text-neutral-200 font-semibold">Aesthetic Profile: </span>
                {profile.brandAesthetic}
              </div>
            </div>
          </div>

          {/* Campaign Executions Across Mediums */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h2 className="text-2xl font-bold font-display text-white">
                Advertising Medium Executions
              </h2>
              <span className="text-xs text-neutral-400 font-mono">
                {completedShots.length} Mediums Synthesized
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedShots.map((shot) => (
                <div
                  key={shot.mediumId}
                  className="bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] bg-neutral-950 overflow-hidden">
                    <img
                      src={shot.imageUrl}
                      alt={shot.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white font-display">
                        {shot.title}
                      </span>
                      <span className="font-mono text-neutral-500 text-[10px]">
                        {shot.aspectRatio}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 line-clamp-2">
                      Zero-human commercial execution preserving {profile.name} packaging integrity.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Deck Signoff */}
          <div className="pt-8 border-t border-neutral-800 text-center text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Brand Builder Studio • Synthesized using Nano-Banana</span>
            <span>All advertising mediums rendered with strict product visual consistency</span>
          </div>
        </div>
      </div>
    </div>
  );
};
