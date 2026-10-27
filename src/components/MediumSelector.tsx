import React, { useState } from 'react';
import { MediumConfig, MediumType, AspectRatio } from '../types';
import { AVAILABLE_MEDIUMS } from '../constants/presets';
import {
  Layers,
  Sparkles,
  Check,
  Plus,
  Play,
  RefreshCw,
  Building2,
  Newspaper as NewspaperIcon,
  Share2,
  Train,
  BookOpen,
  MonitorPlay,
  Store,
  Package,
} from 'lucide-react';

interface MediumSelectorProps {
  selectedMediums: MediumType[];
  onToggleMedium: (mediumId: MediumType) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onGenerateAll: () => Promise<void>;
  isGeneratingAny: boolean;
  hasMasterProduct: boolean;
  onAddCustomMedium: (title: string, prompt: string, aspectRatio: AspectRatio) => void;
}

export const MediumSelector: React.FC<MediumSelectorProps> = ({
  selectedMediums,
  onToggleMedium,
  onSelectAll,
  onDeselectAll,
  onGenerateAll,
  isGeneratingAny,
  hasMasterProduct,
  onAddCustomMedium,
}) => {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [customRatio, setCustomRatio] = useState<AspectRatio>('16:9');

  const getIcon = (id: MediumType) => {
    switch (id) {
      case 'billboard':
        return <Building2 className="w-4 h-4 text-amber-400" />;
      case 'newspaper':
        return <NewspaperIcon className="w-4 h-4 text-amber-400" />;
      case 'social_post':
        return <Share2 className="w-4 h-4 text-amber-400" />;
      case 'subway':
        return <Train className="w-4 h-4 text-amber-400" />;
      case 'magazine':
        return <BookOpen className="w-4 h-4 text-amber-400" />;
      case 'times_square':
        return <MonitorPlay className="w-4 h-4 text-amber-400" />;
      case 'storefront':
        return <Store className="w-4 h-4 text-amber-400" />;
      case 'unboxing':
        return <Package className="w-4 h-4 text-amber-400" />;
      default:
        return <Layers className="w-4 h-4 text-amber-400" />;
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTitle && customPrompt) {
      onAddCustomMedium(customTitle, customPrompt, customRatio);
      setCustomTitle('');
      setCustomPrompt('');
      setShowCustomModal(false);
    }
  };

  return (
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 lg:p-6 backdrop-blur-sm shadow-xl space-y-4">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            <h2 className="text-xl font-bold text-white font-display">
              2. Select Advertising Mediums
            </h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Imagine your consistent product across billboards, newspapers, social feeds, and more. No people will appear in any medium.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={onSelectAll}
            className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium transition-colors"
          >
            Select All
          </button>
          <button
            type="button"
            onClick={onDeselectAll}
            className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white font-medium transition-colors"
          >
            Deselect All
          </button>
          <button
            type="button"
            onClick={() => setShowCustomModal(true)}
            className="px-3 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-medium transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Custom Placement</span>
          </button>
        </div>
      </div>

      {/* Medium Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {AVAILABLE_MEDIUMS.map((med) => {
          const isSelected = selectedMediums.includes(med.id);
          return (
            <button
              key={med.id}
              type="button"
              onClick={() => onToggleMedium(med.id)}
              className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between relative group ${
                isSelected
                  ? 'bg-amber-950/20 border-amber-500/60 shadow-md shadow-amber-500/5'
                  : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 opacity-80 hover:opacity-100'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800">
                      {getIcon(med.id)}
                    </div>
                    <span className="text-xs font-semibold text-neutral-400">
                      {med.category}
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-amber-500 border-amber-400 text-neutral-950'
                        : 'border-neutral-700 bg-neutral-900'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <div className="font-bold text-sm text-white font-display mt-1">
                  {med.title}
                </div>
                <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                  {med.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-neutral-800/50 flex items-center justify-between text-[11px] text-neutral-500">
                <span className="font-mono">{med.defaultAspectRatio}</span>
                {med.highlightTag && (
                  <span className="text-[10px] text-amber-400 font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {med.highlightTag}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Campaign Generation Trigger */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-neutral-950 to-neutral-900 border border-neutral-800 rounded-xl p-4">
        <div>
          <div className="text-sm font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Multi-Medium Campaign Synthesizer</span>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            {selectedMediums.length} medium{selectedMediums.length === 1 ? '' : 's'} selected for simultaneous generation using Nano-Banana.
          </p>
        </div>

        <button
          type="button"
          onClick={onGenerateAll}
          disabled={isGeneratingAny || selectedMediums.length === 0}
          className={`py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg sm:w-auto w-full ${
            isGeneratingAny || selectedMediums.length === 0
              ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700/50'
              : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 hover:from-amber-400 hover:to-orange-400 text-neutral-950 shadow-amber-500/20 active:scale-[0.99]'
          }`}
        >
          {isGeneratingAny ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-neutral-950" />
              <span>Synthesizing Mediums with Nano-Banana...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current text-neutral-950" />
              <span>Generate Entire Campaign ({selectedMediums.length})</span>
            </>
          )}
        </button>
      </div>

      {/* Custom Medium Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-display mb-1">
              Add Custom Advertising Placement
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Envision your product in any specific setting (e.g., airport lounge digital screen, taxi rooftop sign, holographic museum kiosk).
            </p>

            <form onSubmit={handleAddCustom} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Placement Title
                </label>
                <input
                  type="text"
                  required
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g., Airport VIP Lounge Pillar Banner"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Environment & Context Details
                </label>
                <textarea
                  rows={3}
                  required
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g., Elegant backlit floor-to-ceiling pillar banner in a futuristic glass airport lounge overlooking tarmac runways at sunset..."
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Aspect Ratio
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['16:9', '1:1', '4:3', '3:4'] as AspectRatio[]).map((ratio) => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => setCustomRatio(ratio)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-mono font-medium border ${
                        customRatio === ratio
                          ? 'bg-amber-500 text-neutral-950 border-amber-400 font-bold'
                          : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950"
                >
                  Add Placement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
