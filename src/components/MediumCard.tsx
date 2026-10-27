import React from 'react';
import { MediumShot, AspectRatio } from '../types';
import {
  RefreshCw,
  Eye,
  Download,
  Split,
  FileText,
  AlertTriangle,
  Sparkles,
  Maximize2,
  CheckCircle2,
} from 'lucide-react';

interface MediumCardProps {
  shot: MediumShot;
  masterImageUrl?: string;
  productName: string;
  onGenerateSingle: (mediumId: string) => Promise<void>;
  onOpenMockup: (shot: MediumShot) => void;
  onOpenCompare: (shot: MediumShot) => void;
  onDownload: (shot: MediumShot) => void;
}

export const MediumCard: React.FC<MediumCardProps> = ({
  shot,
  masterImageUrl,
  productName,
  onGenerateSingle,
  onOpenMockup,
  onOpenCompare,
  onDownload,
}) => {
  const getAspectRatioClass = (ratio: AspectRatio) => {
    switch (ratio) {
      case '16:9':
        return 'aspect-video';
      case '4:3':
        return 'aspect-[4/3]';
      case '3:4':
        return 'aspect-[3/4]';
      case '9:16':
        return 'aspect-[9/16]';
      case '1:1':
      default:
        return 'aspect-square';
    }
  };

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-neutral-700 transition-all">
      {/* Card Header */}
      <div className="p-4 border-b border-neutral-800/80 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-white font-display truncate">
              {shot.title}
            </span>
          </div>
          <span className="text-[11px] font-mono text-neutral-400">
            Ratio: {shot.aspectRatio}
          </span>
        </div>

        {/* Status Pill */}
        <div>
          {shot.status === 'completed' && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" />
              <span>Consistent</span>
            </span>
          )}
          {shot.status === 'generating' && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-950/50 border border-amber-500/30 px-2 py-0.5 rounded-full animate-pulse">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Synthesizing...</span>
            </span>
          )}
          {shot.status === 'error' && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-400 bg-rose-950/50 border border-rose-500/30 px-2 py-0.5 rounded-full">
              <AlertTriangle className="w-3 h-3" />
              <span>Failed</span>
            </span>
          )}
          {shot.status === 'idle' && (
            <span className="text-[10px] text-neutral-500 bg-neutral-800/80 px-2 py-0.5 rounded-full font-medium">
              Ready
            </span>
          )}
        </div>
      </div>

      {/* Image / Viewport Area */}
      <div
        className={`w-full bg-neutral-950 relative overflow-hidden flex items-center justify-center ${getAspectRatioClass(
          shot.aspectRatio
        )}`}
      >
        {shot.status === 'completed' && shot.imageUrl ? (
          <>
            <img
              src={shot.imageUrl}
              alt={`${productName} in ${shot.title}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover overlay with action triggers */}
            <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] flex items-center justify-center gap-2 p-3">
              <button
                type="button"
                onClick={() => onOpenMockup(shot)}
                className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-lg font-semibold text-xs flex items-center gap-1.5 transition-transform active:scale-95"
                title="View in Realistic Medium Mockup"
              >
                <Eye className="w-4 h-4" />
                <span>Mockup</span>
              </button>

              {masterImageUrl && (
                <button
                  type="button"
                  onClick={() => onOpenCompare(shot)}
                  className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 shadow-lg text-xs font-medium flex items-center gap-1.5 transition-transform active:scale-95"
                  title="Side-by-side consistency check with master product"
                >
                  <Split className="w-4 h-4 text-amber-400" />
                  <span>Inspect</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onDownload(shot)}
                className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 shadow-lg text-xs font-medium transition-transform active:scale-95"
                title="Download High-Res PNG"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : shot.status === 'generating' ? (
          <div className="p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin mx-auto" />
            <p className="text-xs text-amber-400 font-medium">
              Generating with Nano-Banana...
            </p>
            <p className="text-[11px] text-neutral-500">
              Matching product packaging & enforcing zero people
            </p>
          </div>
        ) : shot.status === 'error' ? (
          <div className="p-6 text-center space-y-2">
            <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto" />
            <div className="text-xs text-rose-400 font-medium">Generation Error</div>
            <p className="text-[11px] text-neutral-400 line-clamp-2">
              {shot.errorMessage || 'Failed to render image with Nano-Banana.'}
            </p>
            <button
              onClick={() => onGenerateSingle(shot.mediumId)}
              className="mt-2 text-xs font-semibold text-amber-400 hover:underline inline-flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </div>
        ) : (
          <div className="p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-600">
              <Sparkles className="w-5 h-5 text-neutral-600" />
            </div>
            <div className="text-xs text-neutral-400 font-medium">
              Awaiting Generation
            </div>
            <button
              type="button"
              onClick={() => onGenerateSingle(shot.mediumId)}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium border border-neutral-700 transition-colors inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Render Single Shot</span>
            </button>
          </div>
        )}
      </div>

      {/* Card Footer with Copy and Re-roll */}
      <div className="p-3.5 border-t border-neutral-800/80 bg-neutral-950/40 flex items-center justify-between gap-2 text-xs">
        <div className="text-neutral-400 text-[11px] truncate flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          <span>Zero People Enforced</span>
        </div>

        <div className="flex items-center gap-1.5">
          {shot.status === 'completed' && (
            <button
              type="button"
              onClick={() => onGenerateSingle(shot.mediumId)}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
              title="Re-roll this shot with Nano-Banana"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => onOpenMockup(shot)}
            disabled={shot.status !== 'completed'}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
              shot.status === 'completed'
                ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                : 'text-neutral-600 cursor-not-allowed'
            }`}
          >
            <Maximize2 className="w-3 h-3" />
            <span>View</span>
          </button>
        </div>
      </div>
    </div>
  );
};
