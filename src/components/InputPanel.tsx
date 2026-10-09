import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Dices, Layers, Sparkles } from 'lucide-react';
import { POPULAR_HOLIDAYS } from '../data/holidays';
import { TONE_PROFILES } from '../data/tones';
import { TextMergeVariables, ToneType } from '../types';

interface InputPanelProps {
  variables: TextMergeVariables;
  onChangeVariables: (newVars: Partial<TextMergeVariables>) => void;
  onGenerate: () => void;
  onRandomPreset: () => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  variables,
  onChangeVariables,
  onGenerate,
  onRandomPreset,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [holidaySearch, setHolidaySearch] = useState('');

  // Filter popular holidays
  const filteredHolidays = POPULAR_HOLIDAYS.filter((h) =>
    h.name.toLowerCase().includes(holidaySearch.toLowerCase())
  ).slice(0, 8);

  const handleSelectHoliday = (name: string) => {
    onChangeVariables({ holiday: name });
  };

  const handleSelectTone = (toneId: ToneType) => {
    const profile = TONE_PROFILES.find((t) => t.id === toneId) || TONE_PROFILES[0];
    onChangeVariables({
      tone: toneId,
      toneProfile: profile,
    });
  };

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 shadow-sm mb-8">
      {/* Top Banner & Quick Randomizer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-stone-100">
        <div>
          <h2 className="text-lg font-serif font-bold text-stone-900 tracking-tight">
            Merge Brief & Formula Engine
          </h2>
          <p className="text-xs text-stone-700">
            Select a holiday and your brand voice to instantly blend with 3 contrasting copywriting formulas.
          </p>
        </div>
        <button
          type="button"
          onClick={onRandomPreset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
          title="Load a curated sample brand brief"
        >
          <Dices className="w-3.5 h-3.5 text-stone-500" />
          <span>Try Sample Brief</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Holiday Name & Tone (8 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Holiday Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="holiday-input" className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                1. Holiday or Event Name
              </label>
              <span className="text-[11px] text-stone-700">Type any holiday or click below</span>
            </div>
            <div className="relative">
              <input
                id="holiday-input"
                type="text"
                value={variables.holiday}
                onChange={(e) => onChangeVariables({ holiday: e.target.value })}
                placeholder="e.g. Earth Day, Small Business Saturday, New Year's Day..."
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-800 focus:bg-white transition-all font-medium"
              />
            </div>

            {/* Popular quick-select chips */}
            <div className="mt-2.5 flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] text-stone-700 font-medium mr-1">Trending:</span>
              {filteredHolidays.map((h) => {
                const isSelected = variables.holiday.toLowerCase() === h.name.toLowerCase();
                return (
                  <button
                    key={h.name}
                    type="button"
                    onClick={() => handleSelectHoliday(h.name)}
                    className={`px-2.5 py-1 text-xs rounded-md transition-all ${
                      isSelected
                        ? 'bg-stone-900 text-stone-50 font-medium shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {h.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Tone of Voice Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-stone-500" />
                2. Brand Tone of Voice
              </label>
              <span className="text-[11px] text-stone-700">Shapes hook tension & phrasing</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TONE_PROFILES.map((t) => {
                const isSelected = variables.toneProfile.id === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelectTone(t.id)}
                    className={`p-2.5 text-left rounded-lg border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100/80 text-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-sm">{t.emoji}</span>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
                    </div>
                    <span className="text-xs font-semibold leading-tight line-clamp-1">{t.label}</span>
                    <span
                      className={`text-[10px] mt-0.5 line-clamp-1 ${
                        isSelected ? 'text-stone-300' : 'text-stone-700'
                      }`}
                    >
                      {t.tagline}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Tone Note input if Custom selected */}
            {variables.toneProfile.id === 'custom' && (
              <div className="mt-2.5">
                <input
                  type="text"
                  value={variables.customToneDetails || ''}
                  onChange={(e) => onChangeVariables({ customToneDetails: e.target.value })}
                  placeholder="Describe your tone: e.g. Sarcastic cozy bakery, high-tech minimalist, poetic florist..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-md text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Brand Context & Offer Details (5 cols) */}
        <div className="lg:col-span-5 bg-stone-50/70 border border-stone-200 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-stone-500" />
                3. Brand Context & Offer (Optional)
              </span>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-[11px] text-stone-700 hover:text-stone-900 flex items-center gap-0.5"
              >
                {showAdvanced ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>

            {showAdvanced && (
              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-medium text-stone-700 mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={variables.brandName}
                    onChange={(e) => onChangeVariables({ brandName: e.target.value })}
                    placeholder="e.g. Field & Forge Co."
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-md text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-700 mb-1">
                    Product / Niche
                  </label>
                  <input
                    type="text"
                    value={variables.nicheOrProduct}
                    onChange={(e) => onChangeVariables({ nicheOrProduct: e.target.value })}
                    placeholder="e.g. artisanal ceramic coffee drippers"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-md text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-700 mb-1">
                    Holiday Offer / Announcement
                  </label>
                  <input
                    type="text"
                    value={variables.offerOrPerk}
                    onChange={(e) => onChangeVariables({ offerOrPerk: e.target.value })}
                    placeholder="e.g. 20% off bundles with code HARVEST20"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-md text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-700 mb-1">
                    Call To Action Goal
                  </label>
                  <input
                    type="text"
                    value={variables.callToActionGoal}
                    onChange={(e) => onChangeVariables({ callToActionGoal: e.target.value })}
                    placeholder="e.g. Comment your holiday ritual below 👇"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-md text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-800"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Merge & Run Action */}
          <div className="mt-4 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onGenerate}
              className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Generate 3 Caption Drafts & Art Briefs</span>
            </button>
            <p className="text-[10px] text-center text-stone-700 mt-1.5">
              Instant static text-merge · Generates 3 contrasting angles
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
