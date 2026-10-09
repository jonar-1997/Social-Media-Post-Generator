import React, { useState } from 'react';
import {
  Bookmark,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Hash,
  Palette,
  RotateCcw,
  Scissors,
  Share2,
  Sparkles,
  Zap,
} from 'lucide-react';
import { FORMULA_LIBRARY } from '../data/formulas';
import { DraftItem, PlatformTarget, TextMergeVariables } from '../types';
import {
  addSprinkleEmojis,
  calculateStats,
  formatFullDraft,
  getPlatformLimits,
  makePunchier,
  stripEmojis,
} from '../utils/textMerge';
import { VisualPromptCard } from './VisualPromptCard';

interface DraftCardProps {
  draft: DraftItem;
  slotNumber: number; // 1, 2, 3
  variables: TextMergeVariables;
  onUpdateDraft: (updated: DraftItem) => void;
  onSwapFormula: (formulaId: string) => void;
  onToggleSave: () => void;
  onResetDraft: () => void;
}

export const DraftCard: React.FC<DraftCardProps> = ({
  draft,
  slotNumber,
  variables,
  onUpdateDraft,
  onSwapFormula,
  onToggleSave,
  onResetDraft,
}) => {
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedFullBrief, setCopiedFullBrief] = useState(false);
  const [showVisualPrompt, setShowVisualPrompt] = useState(true);
  const [showFormulaPicker, setShowFormulaPicker] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');

  const fullText = formatFullDraft(draft, draft.activePlatform);
  const stats = calculateStats(fullText);
  const limits = getPlatformLimits(draft.activePlatform);
  const isOverLimit = stats.characters > limits.maxChars;

  // Copy handlers
  const handleCopyCaption = () => {
    navigator.clipboard.writeText(fullText);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const handleCopyFullBrief = () => {
    const brief = `=== ${draft.formulaTitle.toUpperCase()} ===\n\n[CAPTION - ${limits.label.toUpperCase()}]\n${fullText}\n\n[VISUAL DESIGN BRIEF]\nArt Direction: ${draft.visualPrompt.artDirection}\nComposition: ${draft.visualPrompt.composition}\nPalette: ${draft.visualPrompt.colorPalette.join(', ')}\nTypography: ${draft.visualPrompt.suggestedTypography}\n\n[AI IMAGE GENERATOR PROMPT]\n${draft.visualPrompt.generatorPrompt}`;
    navigator.clipboard.writeText(brief);
    setCopiedFullBrief(true);
    setTimeout(() => setCopiedFullBrief(false), 2000);
  };

  // Quick edit transformations
  const handleMakePunchier = () => {
    onUpdateDraft({
      ...draft,
      hook: makePunchier(draft.hook),
      body: makePunchier(draft.body),
      cta: makePunchier(draft.cta),
      isEdited: true,
    });
  };

  const handleAddEmojis = () => {
    onUpdateDraft({
      ...draft,
      body: addSprinkleEmojis(draft.body, variables.toneProfile.emojiPalette),
      isEdited: true,
    });
  };

  const handleStripEmojis = () => {
    onUpdateDraft({
      ...draft,
      hook: stripEmojis(draft.hook),
      body: stripEmojis(draft.body),
      cta: stripEmojis(draft.cta),
      isEdited: true,
    });
  };

  const handlePlatformChange = (platform: PlatformTarget) => {
    onUpdateDraft({
      ...draft,
      activePlatform: platform,
    });
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onUpdateDraft({
      ...draft,
      hashtags: draft.hashtags.filter((t) => t !== tagToRemove),
      isEdited: true,
    });
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTagInput.trim()) {
      e.preventDefault();
      let clean = newTagInput.trim();
      if (!clean.startsWith('#')) clean = `#${clean}`;
      if (!draft.hashtags.includes(clean)) {
        onUpdateDraft({
          ...draft,
          hashtags: [...draft.hashtags, clean],
          isEdited: true,
        });
      }
      setNewTagInput('');
    }
  };

  const platformTabs: { id: PlatformTarget; label: string }[] = [
    { id: 'instagram', label: 'Instagram' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'x', label: 'X (Twitter)' },
    { id: 'newsletter', label: 'Newsletter' },
  ];

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all hover:border-stone-300">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 pb-4 mb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-700">
              <span className="font-mono font-bold text-stone-900">0{slotNumber}</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-stone-700">{draft.category}</span>
              {draft.isEdited && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-800 font-medium">Edited</span>
                </>
              )}
            </div>
            <h3 className="text-base font-serif font-bold text-stone-900 mt-1">
              {draft.formulaTitle}
            </h3>
          </div>

          {/* Top Actions: Formula Swap & Save Toggle */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowFormulaPicker(!showFormulaPicker)}
              className="p-1.5 rounded-md hover:bg-stone-100 text-stone-700 hover:text-stone-900 transition-colors"
              title="Swap formula for this slot"
            >
              <Zap className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onToggleSave}
              className={`p-1.5 rounded-md transition-colors ${
                draft.isSaved
                  ? 'bg-amber-100 text-amber-800'
                  : 'hover:bg-stone-100 text-stone-700 hover:text-stone-900'
              }`}
              title={draft.isSaved ? 'Saved to bookmarks' : 'Save draft'}
            >
              <Bookmark className={`w-4 h-4 ${draft.isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Formula Swap Dropdown Drawer */}
        {showFormulaPicker && (
          <div className="mb-4 p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs space-y-2">
            <div className="flex items-center justify-between font-semibold text-stone-700">
              <span>Swap with Another Static Formula:</span>
              <button
                type="button"
                onClick={() => setShowFormulaPicker(false)}
                className="text-stone-700 hover:text-stone-700"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {FORMULA_LIBRARY.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    onSwapFormula(f.id);
                    setShowFormulaPicker(false);
                  }}
                  className={`text-left p-2 rounded-md transition-colors flex items-center justify-between ${
                    f.id === draft.formulaId
                      ? 'bg-stone-900 text-white font-medium'
                      : 'bg-white hover:bg-stone-100 text-stone-800 border border-stone-200'
                  }`}
                >
                  <div>
                    <span className="block font-medium">{f.title}</span>
                    <span className={`text-[10px] ${f.id === draft.formulaId ? 'text-stone-300' : 'text-stone-700'}`}>
                      {f.angleDescription}
                    </span>
                  </div>
                  {f.id === draft.formulaId && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Platform Selector Tabs */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
            {platformTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handlePlatformChange(tab.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  draft.activePlatform === tab.id
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Reset button if edited */}
          {draft.isEdited && (
            <button
              type="button"
              onClick={onResetDraft}
              className="flex items-center gap-1 text-[11px] text-stone-700 hover:text-stone-800 transition-colors"
              title="Reset to original template merge"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Interactive Inline Editor */}
        <div className="space-y-3.5">
          {/* 1. Hook Editor */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1">
                <span>The Hook</span>
                <span className="text-[10px] font-normal text-stone-700">(First 1-2 lines)</span>
              </label>
            </div>
            <textarea
              rows={2}
              value={draft.hook}
              onChange={(e) =>
                onUpdateDraft({
                  ...draft,
                  hook: e.target.value,
                  isEdited: true,
                })
              }
              className="w-full p-2.5 text-xs sm:text-sm font-semibold bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-800 focus:bg-white resize-y transition-colors leading-snug"
              placeholder="First line hook..."
            />
          </div>

          {/* 2. Body Text Editor */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700">
                Body Narrative
              </label>
            </div>
            <textarea
              rows={6}
              value={draft.body}
              onChange={(e) =>
                onUpdateDraft({
                  ...draft,
                  body: e.target.value,
                  isEdited: true,
                })
              }
              className="w-full p-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-800 focus:bg-white resize-y transition-colors leading-relaxed font-normal"
              placeholder="Draft body content..."
            />
          </div>

          {/* 3. Call to Action (CTA) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700">
                Call to Action (CTA)
              </label>
            </div>
            <input
              type="text"
              value={draft.cta}
              onChange={(e) =>
                onUpdateDraft({
                  ...draft,
                  cta: e.target.value,
                  isEdited: true,
                })
              }
              className="w-full p-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 font-medium focus:outline-none focus:ring-1 focus:ring-stone-800 focus:bg-white transition-colors"
              placeholder="Action goal..."
            />
          </div>

          {/* 4. Hashtags */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1">
                <Hash className="w-3 h-3 text-stone-500" />
                <span>Curated Hashtags</span>
              </label>
              <span className="text-[10px] text-stone-700">{draft.hashtags.length} tags</span>
            </div>
            <div className="flex flex-wrap gap-1.5 items-center p-2 bg-stone-50 border border-stone-200 rounded-lg min-h-[38px]">
              {draft.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-700 bg-white border border-stone-200 px-2 py-0.5 rounded"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-600 text-stone-700 font-bold ml-0.5"
                    title="Remove tag"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="+ Add tag (Press Enter)"
                className="text-[11px] font-mono text-stone-800 bg-transparent placeholder-stone-400 focus:outline-none px-1 py-0.5 min-w-[120px]"
              />
            </div>
          </div>
        </div>

        {/* Quick Polish Toolbar */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase text-stone-700 mr-1">Quick Tweak:</span>
          <button
            type="button"
            onClick={handleMakePunchier}
            className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 rounded transition-colors"
            title="Remove filler words and tighten sentence structure"
          >
            <Scissors className="w-3 h-3 text-stone-500" />
            <span>Make Punchier</span>
          </button>
          <button
            type="button"
            onClick={handleAddEmojis}
            className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 rounded transition-colors"
            title="Add tone-matched emojis"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>+ Emojis</span>
          </button>
          <button
            type="button"
            onClick={handleStripEmojis}
            className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 rounded transition-colors"
            title="Strip all emojis for a clean editorial look"
          >
            <span>Clean Text</span>
          </button>
        </div>

        {/* Live Copywriting Telemetry / Read Stats */}
        <div className="mt-3 flex items-center justify-between text-xs text-stone-700 pt-2 border-t border-stone-100">
          <div className="flex items-center gap-2">
            <span className={isOverLimit ? 'text-red-600 font-bold' : ''}>
              {stats.characters} / {limits.maxChars} chars
            </span>
            <span aria-hidden="true">·</span>
            <span>{stats.words} words</span>
            <span aria-hidden="true">·</span>
            <span>~{stats.readingTimeSeconds}s read</span>
          </div>
          {isOverLimit && (
            <span className="text-[11px] text-red-600 font-medium">Exceeds platform limit!</span>
          )}
        </div>

        {/* Visual Design Prompt Section Toggle */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowVisualPrompt(!showVisualPrompt)}
            className="w-full flex items-center justify-between py-2 text-xs font-semibold text-stone-800 hover:text-stone-900 border-t border-stone-200 transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-stone-500" />
              <span>Matching Visual Design Prompt & Palette</span>
            </div>
            {showVisualPrompt ? (
              <ChevronUp className="w-3.5 h-3.5 text-stone-700" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-stone-700" />
            )}
          </button>

          {showVisualPrompt && (
            <VisualPromptCard
              promptData={draft.visualPrompt}
              holiday={variables.holiday}
              brandName={variables.brandName}
            />
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-5 pt-4 border-t border-stone-200 flex items-center gap-2">
        <button
          type="button"
          onClick={handleCopyCaption}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs ${
            copiedCaption
              ? 'bg-emerald-600 text-white'
              : 'bg-stone-900 hover:bg-stone-800 text-stone-50'
          }`}
        >
          {copiedCaption ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedCaption ? 'Copied Caption!' : 'Copy Caption Only'}</span>
        </button>

        <button
          type="button"
          onClick={handleCopyFullBrief}
          className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 ${
            copiedFullBrief
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'border-stone-300 hover:bg-stone-100 text-stone-700'
          }`}
          title="Copy formatted copy + visual design brief together"
        >
          {copiedFullBrief ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{copiedFullBrief ? 'Copied' : 'Full Brief'}</span>
        </button>
      </div>
    </div>
  );
};
