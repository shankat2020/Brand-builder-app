import React, { useState } from 'react';
import { MediumShot, BrandKit } from '../types';
import {
  X,
  Download,
  Share2,
  Heart,
  MessageCircle,
  Bookmark,
  Sparkles,
  Building2,
  Newspaper as NewspaperIcon,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';

interface MockupViewerProps {
  shot: MediumShot;
  productName: string;
  category: string;
  brandKit?: BrandKit;
  onClose: () => void;
  onDownload: (shot: MediumShot) => void;
}

export const MockupViewer: React.FC<MockupViewerProps> = ({
  shot,
  productName,
  category,
  brandKit,
  onClose,
  onDownload,
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activeTab, setActiveTab] = useState<'mockup' | 'raw' | 'prompt'>('mockup');

  const copyPromptText = () => {
    if (shot.promptUsed) {
      navigator.clipboard.writeText(shot.promptUsed);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between gap-4 bg-neutral-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-display">
                  {shot.title} Presentation
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Zero People Enforced
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Product: <span className="text-neutral-200 font-medium">{productName}</span> • Model: <span className="text-amber-400 font-mono">Nano-Banana</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher Tabs */}
            <div className="hidden sm:flex items-center bg-neutral-900 border border-neutral-800 rounded-xl p-1 text-xs">
              <button
                onClick={() => setActiveTab('mockup')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  activeTab === 'mockup'
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Realistic Mockup
              </button>
              <button
                onClick={() => setActiveTab('raw')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  activeTab === 'raw'
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Clean Asset
              </button>
              <button
                onClick={() => setActiveTab('prompt')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  activeTab === 'prompt'
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Prompt Audit
              </button>
            </div>

            <button
              onClick={() => onDownload(shot)}
              className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
              title="Download Image"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white border border-neutral-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-950 flex flex-col items-center justify-center min-h-[400px]">
          {activeTab === 'mockup' && (
            <div className="w-full flex items-center justify-center">
              {/* BILLBOARD MOCKUP */}
              {shot.mediumId === 'billboard' && (
                <div className="w-full max-w-4xl bg-gradient-to-b from-slate-900 to-neutral-950 rounded-2xl p-6 sm:p-8 border border-neutral-800 shadow-2xl relative">
                  {/* Spotlights above billboard */}
                  <div className="flex justify-around mb-2 px-12">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-3 h-2 bg-neutral-600 rounded-t" />
                        <div className="w-1.5 h-1.5 bg-amber-200 rounded-full shadow-[0_0_12px_#fde68a]" />
                      </div>
                    ))}
                  </div>

                  {/* Billboard Steel Trim Frame */}
                  <div className="relative border-4 border-neutral-700 bg-neutral-950 rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                    <img
                      src={shot.imageUrl}
                      alt={shot.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-cover max-h-[55vh]"
                    />
                    {/* Bottom billboard catwalk */}
                    <div className="h-2 bg-neutral-800 border-t border-neutral-700 flex items-center justify-between px-4">
                      <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
                        METRO HIGHWAY DISPLAY #409 • {productName.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Steel Pylon Support Pillar */}
                  <div className="w-16 h-12 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 mx-auto border-x border-neutral-600 mt-0 shadow-lg" />
                  <div className="w-28 h-2 bg-neutral-700 mx-auto rounded-full" />
                </div>
              )}

              {/* NEWSPAPER MOCKUP */}
              {shot.mediumId === 'newspaper' && (
                <div className="w-full max-w-2xl bg-[#F7F4EB] text-neutral-900 rounded-lg p-6 sm:p-10 shadow-2xl border border-neutral-300 newsprint-overlay relative">
                  {/* Paper Header */}
                  <div className="text-center border-b-2 border-neutral-900 pb-3 mb-4">
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-600 uppercase tracking-widest border-b border-neutral-400 pb-1 mb-2">
                      <span>Vol. CLXXXVII • No. 54,209</span>
                      <span>The Global Daily Chronicle</span>
                      <span>Morning Edition</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-editorial font-bold tracking-tight uppercase text-neutral-950">
                      The Global Chronicle
                    </h2>
                    <div className="flex items-center justify-between text-[11px] font-serif italic text-neutral-700 mt-1">
                      <span>International Commerce & Design</span>
                      <span>Special Full-Page Feature</span>
                    </div>
                  </div>

                  {/* Advertising Box */}
                  <div className="border border-neutral-900 p-3 bg-white/70 shadow-sm">
                    <div className="text-center mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                        Advertisement
                      </span>
                      <h4 className="text-lg font-serif font-bold text-neutral-950">
                        {brandKit?.primaryHeadline || `Introducing ${productName}`}
                      </h4>
                    </div>

                    <div className="overflow-hidden border border-neutral-300">
                      <img
                        src={shot.imageUrl}
                        alt={shot.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-cover max-h-[48vh] filter contrast-[1.05]"
                      />
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3 text-[11px] font-serif leading-relaxed text-neutral-800 text-justify">
                      <p>
                        Engineered with timeless distinction, {productName} represents a watershed moment in {category.toLowerCase()} design. Formulated without compromise to elevate daily ritual.
                      </p>
                      <p>
                        Available at flagship purveyors globally. Designed for those who demand uncompromising aesthetic purity and unmatched craftsmanship.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SOCIAL MEDIA POST MOCKUP */}
              {shot.mediumId === 'social_post' && (
                <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl text-white">
                  {/* Social Profile Header */}
                  <div className="p-3.5 flex items-center justify-between border-b border-neutral-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5">
                        <div className="w-full h-full bg-neutral-950 rounded-full flex items-center justify-center text-[10px] font-bold text-amber-400">
                          {productName.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold leading-none">
                            {productName.toLowerCase().replace(/[^a-z0-9]/g, '')}.official
                          </span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
                        </div>
                        <span className="text-[10px] text-neutral-400 leading-none">
                          Sponsored • Global Campaign
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-neutral-500 font-bold">•••</span>
                  </div>

                  {/* Social Feed Image */}
                  <div className="w-full aspect-square bg-black overflow-hidden">
                    <img
                      src={shot.imageUrl}
                      alt={shot.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Social Action Bar */}
                  <div className="p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-neutral-200">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20 cursor-pointer" />
                        <MessageCircle className="w-5 h-5 hover:text-white cursor-pointer" />
                        <Share2 className="w-5 h-5 hover:text-white cursor-pointer" />
                      </div>
                      <Bookmark className="w-5 h-5 hover:text-white cursor-pointer" />
                    </div>

                    <div className="text-xs font-semibold">14,289 likes</div>

                    {/* Caption */}
                    <div className="text-xs text-neutral-200 leading-relaxed">
                      <span className="font-bold mr-1.5">
                        {productName.toLowerCase().replace(/[^a-z0-9]/g, '')}.official
                      </span>
                      <span>
                        {brandKit?.tagline || `Discover the future of ${category}.`} Pure form, zero clutter.
                      </span>
                      <div className="mt-1 text-amber-400/90 font-medium">
                        #brandbuilder #nanoBanana #{category.toLowerCase().replace(/[^a-z0-9]/g, '')} #minimalism #editorial
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DEFAULT / OTHER MEDIUM MOCKUPS */}
              {shot.mediumId !== 'billboard' &&
                shot.mediumId !== 'newspaper' &&
                shot.mediumId !== 'social_post' && (
                  <div className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col items-center">
                    <div className="w-full rounded-xl overflow-hidden border border-neutral-700/80 shadow-2xl">
                      <img
                        src={shot.imageUrl}
                        alt={shot.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-cover max-h-[60vh]"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-sm font-semibold text-white font-display">
                        {shot.title} Placement
                      </div>
                      <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
                        Rendered with exact visual consistency matching {productName}. No people present in scene.
                      </p>
                    </div>
                  </div>
                )}
            </div>
          )}

          {activeTab === 'raw' && (
            <div className="w-full max-w-3xl flex items-center justify-center p-2">
              <img
                src={shot.imageUrl}
                alt={shot.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain max-h-[70vh] rounded-xl shadow-2xl"
              />
            </div>
          )}

          {activeTab === 'prompt' && (
            <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl p-5 text-left space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Nano-Banana Synthesis Prompt & Mandates
                </span>
                <button
                  onClick={copyPromptText}
                  className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-300 flex items-center gap-1.5 transition-colors"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 text-xs text-neutral-300 font-mono leading-relaxed whitespace-pre-wrap max-h-[40vh] overflow-y-auto">
                {shot.promptUsed || 'Nano-Banana prompt synthesized dynamically.'}
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Consistency & Human-Free Guarantee</div>
                  <div className="text-emerald-400/80 text-[11px] mt-0.5">
                    Multimodal reference image input locked the exact silhouette and branding, while strict negative constraints ensured zero human models or hands.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
