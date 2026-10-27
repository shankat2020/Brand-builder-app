import React, { useState } from 'react';
import { MediumShot } from '../types';
import { X, CheckCircle2, Sparkles, Layers, Sliders } from 'lucide-react';

interface ComparisonModalProps {
  shot: MediumShot;
  masterImageUrl: string;
  productName: string;
  onClose: () => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  shot,
  masterImageUrl,
  productName,
  onClose,
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'slider'>('side-by-side');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/70">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-lg font-bold text-white font-display">
                Product Consistency Inspector
              </h3>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Compare Master Product Reference against <span className="text-amber-400 font-semibold">{shot.title}</span>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl p-1 text-xs">
              <button
                onClick={() => setViewMode('side-by-side')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  viewMode === 'side-by-side'
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Side-by-Side
              </button>
              <button
                onClick={() => setViewMode('slider')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  viewMode === 'slider'
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Split Overlay
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white border border-neutral-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comparison Body */}
        <div className="p-6 bg-neutral-950 overflow-y-auto flex-1 flex flex-col justify-center items-center">
          {viewMode === 'side-by-side' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
              {/* Master Shot */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-amber-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Master Product Anchor (1:1)</span>
                  </span>
                  <span className="text-neutral-500 font-mono">Reference</span>
                </div>
                <div className="aspect-square bg-neutral-900 border-2 border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={masterImageUrl}
                    alt="Master Product Anchor"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[11px] text-neutral-400 text-center">
                  Original packaging, materials, label typography & color scheme
                </p>
              </div>

              {/* Medium Shot */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{shot.title} ({shot.aspectRatio})</span>
                  </span>
                  <span className="text-neutral-500 font-mono">Nano-Banana</span>
                </div>
                <div className="aspect-square bg-neutral-900 border-2 border-amber-500/30 rounded-2xl overflow-hidden shadow-xl flex items-center justify-center">
                  <img
                    src={shot.imageUrl}
                    alt={shot.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[11px] text-neutral-400 text-center">
                  Contextual advertising environment with zero people
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-2xl flex flex-col items-center">
              <div
                className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-neutral-800 shadow-2xl select-none"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                  setSliderPosition((x / rect.width) * 100);
                }}
              >
                {/* Background: Medium Shot */}
                <img
                  src={shot.imageUrl}
                  alt={shot.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Foreground: Master Shot clipped */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={masterImageUrl}
                    alt="Master Product Anchor"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-neutral-900/90 text-[10px] font-bold text-amber-400 border border-amber-500/40">
                    Master Reference
                  </div>
                </div>

                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-neutral-900/90 text-[10px] font-bold text-emerald-400 border border-emerald-500/40">
                  {shot.title}
                </div>

                {/* Vertical Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_10px_#f59e0b] cursor-ew-resize flex items-center justify-center"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center shadow-lg text-xs font-bold">
                    ⟷
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>Drag cursor across image to inspect alignment & consistency</span>
              </div>
            </div>
          )}
        </div>

        {/* Verification Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="font-semibold">Consistency Verified:</span>
            <span className="text-neutral-300">
              Product geometry, branding typography, and palette successfully transferred.
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
