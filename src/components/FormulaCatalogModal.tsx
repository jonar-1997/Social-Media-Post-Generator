import React, { useState } from 'react';
import { BookOpen, Check, Sparkles, X } from 'lucide-react';
import { FORMULA_LIBRARY } from '../data/formulas';
import { FormulaTemplate } from '../types';

interface FormulaCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFormulaToSlot: (formulaId: string, slotIndex: number) => void;
}

export const FormulaCatalogModal: React.FC<FormulaCatalogModalProps> = ({
  isOpen,
  onClose,
  onApplyFormulaToSlot,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedSlotFeedback, setAppliedSlotFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Formulas' },
    { id: 'relatable', label: 'Relatable & Conversational' },
    { id: 'story', label: 'Gratitude & Story' },
    { id: 'contrarian', label: 'Contrarian & Punchy' },
    { id: 'ritual', label: 'Ritual & Actionable' },
    { id: 'action', label: 'Promotional & Drops' },
  ];

  const filteredFormulas = FORMULA_LIBRARY.filter((f) => {
    const matchesCat = selectedCategory === 'all' || f.category === selectedCategory;
    const matchesSearch =
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleApply = (formulaId: string, slotIndex: number) => {
    onApplyFormulaToSlot(formulaId, slotIndex);
    setAppliedSlotFeedback(`${formulaId}-${slotIndex}`);
    setTimeout(() => setAppliedSlotFeedback(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Built-In Static Formula Library
              </h3>
              <p className="text-xs text-stone-700">
                Browse our collection of battle-tested copywriting frameworks & visual prompt pairings.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-stone-100 text-stone-700 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 sm:px-6 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  selectedCategory === c.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white hover:bg-stone-200/70 text-stone-700 border border-stone-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search formulas..."
            className="px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 w-full sm:w-48"
          />
        </div>

        {/* List of Formulas */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {filteredFormulas.map((f, index) => (
            <div
              key={f.id}
              className="p-4 rounded-xl border border-stone-200 hover:border-stone-300 bg-white transition-all space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <span className="font-mono text-stone-700 font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-stone-700 uppercase tracking-wider text-[10px]">
                      {f.category}
                    </span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-stone-900 mt-0.5">
                    {f.title}
                  </h4>
                  <p className="text-xs text-stone-600 mt-1">{f.description}</p>
                </div>

                {/* Apply buttons */}
                <div className="flex items-center gap-1.5 shrink-0 bg-stone-50 p-1 rounded-lg border border-stone-200">
                  <span className="text-[10px] font-semibold text-stone-700 px-1">Apply to:</span>
                  {[0, 1, 2].map((slotIdx) => {
                    const isFeedback = appliedSlotFeedback === `${f.id}-${slotIdx}`;
                    return (
                      <button
                        key={slotIdx}
                        type="button"
                        onClick={() => handleApply(f.id, slotIdx)}
                        className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
                          isFeedback
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white hover:bg-stone-900 hover:text-white text-stone-800 border border-stone-200 shadow-xs'
                        }`}
                        title={`Apply this formula to Draft Slot 0${slotIdx + 1}`}
                      >
                        {isFeedback ? <Check className="w-3 h-3 inline" /> : `Slot 0${slotIdx + 1}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Formula Anatomy breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2 border-t border-stone-100 text-xs">
                <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                  <span className="font-bold text-[10px] uppercase text-stone-700 block mb-0.5">
                    1. The Hook Tension
                  </span>
                  <span className="text-stone-700 text-[11px] leading-tight">
                    Subverts cliché expectations; acknowledges holiday realities with tone-matched voice.
                  </span>
                </div>
                <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                  <span className="font-bold text-[10px] uppercase text-stone-700 block mb-0.5">
                    2. The Value Pivot
                  </span>
                  <span className="text-stone-700 text-[11px] leading-tight">
                    Smooth bridge from holiday cultural context into your brand story, craft, or seasonal offer.
                  </span>
                </div>
                <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                  <span className="font-bold text-[10px] uppercase text-stone-700 block mb-0.5">
                    3. The Action & Prompt
                  </span>
                  <span className="text-stone-700 text-[11px] leading-tight">
                    Natural invitation for comments, saves, or purchases, paired with matching art direction.
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filteredFormulas.length === 0 && (
            <div className="text-center py-12 text-stone-700 text-sm">
              No formulas found matching "{searchQuery}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <span className="text-xs text-stone-700">
            {FORMULA_LIBRARY.length} formulas available in offline static library
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Done Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
