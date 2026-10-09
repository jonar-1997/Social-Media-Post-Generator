import React, { useState } from 'react';
import { Check, Copy, Eye, Image as ImageIcon, Sparkles, Type } from 'lucide-react';
import { VisualPromptData } from '../types';

interface VisualPromptCardProps {
  promptData: VisualPromptData;
  holiday: string;
  brandName?: string;
}

export const VisualPromptCard: React.FC<VisualPromptCardProps> = ({
  promptData,
  holiday,
  brandName,
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [showLayoutGuide, setShowLayoutGuide] = useState(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(promptData.generatorPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  const primaryColor = promptData.colorPalette[0] || '#1E293B';
  const secondaryColor = promptData.colorPalette[1] || '#F8FAFC';
  const accentColor = promptData.colorPalette[2] || '#D97706';

  return (
    <div className="border-t border-stone-200 pt-4 mt-5 space-y-4">
      {/* Header with Visual Direction Title */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700">
            <ImageIcon className="w-3.5 h-3.5 text-stone-500" />
            <span>Visual Design Prompt</span>
            <span className="text-stone-300">·</span>
            <span className="font-mono lowercase text-stone-700">{promptData.recommendedRatio}</span>
          </div>
          <h4 className="text-sm font-semibold text-stone-900 mt-0.5">
            {promptData.headline}
          </h4>
        </div>

        <button
          type="button"
          onClick={handleCopyPrompt}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
            copiedPrompt
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
          title="Copy prompt for Midjourney, DALL-E, or Canva"
        >
          {copiedPrompt ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
          <span>{copiedPrompt ? 'Copied' : 'Copy Prompt'}</span>
        </button>
      </div>

      {/* Visual Canvas Layout Simulation */}
      <div className="relative rounded-lg overflow-hidden border border-stone-200 bg-stone-900 shadow-inner group">
        <div
          className="h-32 sm:h-36 w-full relative p-4 flex flex-col justify-between transition-all"
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, #18181b 100%)`,
          }}
        >
          {/* Subtle noise/texture overlay indicator */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />

          {/* Golden/accent atmospheric glow circle */}
          <div
            className="absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl opacity-40 pointer-events-none"
            style={{ backgroundColor: accentColor }}
          />

          {/* Top overlay metadata simulation */}
          <div className="relative z-10 flex items-center justify-between text-xs text-white/70">
            <span className="font-mono text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-black/30 backdrop-blur-xs">
              {brandName || 'Brand Visual Brief'}
            </span>
            <span className="font-mono text-[10px] text-white/50">{promptData.recommendedRatio} Frame</span>
          </div>

          {/* Center visual composition mock */}
          <div className="relative z-10 my-auto text-center px-4">
            <p className="font-serif italic text-lg sm:text-xl text-white font-medium drop-shadow-sm tracking-wide">
              "{holiday}"
            </p>
            <p className="text-[11px] text-white/70 line-clamp-1 mt-0.5 font-sans">
              {promptData.artDirection.split('.')[0]}
            </p>
          </div>

          {/* Bottom color mood indicators */}
          <div className="relative z-10 flex items-center justify-between text-[10px] text-white/60">
            <span>{promptData.suggestedTypography.split(' ')[0]} Typography</span>
            <div className="flex items-center gap-1">
              {promptData.colorPalette.slice(0, 4).map((c, i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full border border-white/20"
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>
          </div>

          {/* Rule of thirds grid overlay toggle */}
          {showLayoutGuide && (
            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 z-20">
              <div className="border-r border-b border-white/20" />
              <div className="border-r border-b border-white/20" />
              <div className="border-b border-white/20" />
              <div className="border-r border-b border-white/20" />
              <div className="border-r border-b border-white/20" />
              <div className="border-b border-white/20" />
              <div className="border-r border-white/20" />
              <div className="border-r border-white/20" />
              <div />
            </div>
          )}
        </div>

        {/* Toggle Grid Guide Overlay */}
        <button
          type="button"
          onClick={() => setShowLayoutGuide(!showLayoutGuide)}
          className="absolute bottom-2 right-2 z-30 p-1 rounded bg-black/60 hover:bg-black text-white/80 text-[10px] flex items-center gap-1 backdrop-blur-xs transition-colors"
          title="Toggle Rule-of-Thirds Grid Guide"
        >
          <Eye className="w-2.5 h-2.5" />
          <span>{showLayoutGuide ? 'Hide Grid' : 'Grid'}</span>
        </button>
      </div>

      {/* Art Direction & Composition Specs */}
      <div className="space-y-2 text-xs text-stone-600 bg-stone-50/70 p-3 rounded-lg border border-stone-200">
        <div>
          <span className="font-semibold text-stone-800">Art Direction: </span>
          <span>{promptData.artDirection}</span>
        </div>
        <div>
          <span className="font-semibold text-stone-800">Composition & Space: </span>
          <span>{promptData.composition}</span>
        </div>
        <div>
          <span className="font-semibold text-stone-800">Atmosphere: </span>
          <span>{promptData.lightingAndAtmosphere}</span>
        </div>
        <div className="flex items-center gap-2 pt-1 border-t border-stone-200">
          <Type className="w-3.5 h-3.5 text-stone-500 shrink-0" />
          <div>
            <span className="font-semibold text-stone-800">Type Pairing: </span>
            <span>{promptData.suggestedTypography}</span>
          </div>
        </div>

        {/* Clickable Color Swatches */}
        <div className="pt-2 border-t border-stone-200 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-stone-700">Palette:</span>
          {promptData.colorPalette.map((col, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleCopyColor(col)}
              className="group flex items-center gap-1.5 px-2 py-0.5 rounded bg-white border border-stone-200 hover:border-stone-400 transition-colors cursor-pointer text-[11px] font-mono text-stone-700"
              title="Click to copy HEX color"
            >
              <span
                className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                style={{ backgroundColor: col }}
              />
              <span>{col}</span>
              {copiedColor === col && <Check className="w-2.5 h-2.5 text-emerald-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* Generator Prompt Pre-formatted for AI Image Generators or Creative Brief */}
      <div>
        <div className="flex items-center justify-between text-[11px] font-medium text-stone-700 mb-1">
          <span>AI Generator Prompt (Midjourney / DALL-E / Flux):</span>
        </div>
        <pre className="text-[11px] font-mono bg-stone-900 text-stone-200 p-2.5 rounded-lg overflow-x-auto whitespace-pre-wrap leading-relaxed border border-stone-800 selection:bg-amber-400 selection:text-stone-900">
          {promptData.generatorPrompt}
        </pre>
      </div>
    </div>
  );
};
