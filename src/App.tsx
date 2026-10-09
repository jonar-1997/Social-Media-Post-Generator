/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Columns3, Maximize2, Sparkles } from 'lucide-react';
import { DraftCard } from './components/DraftCard';
import { ExportModal } from './components/ExportModal';
import { FormulaCatalogModal } from './components/FormulaCatalogModal';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { SavedDraftsModal } from './components/SavedDraftsModal';
import { FORMULA_LIBRARY } from './data/formulas';
import { POPULAR_HOLIDAYS } from './data/holidays';
import { getToneProfile, TONE_PROFILES } from './data/tones';
import { DraftItem, SavedProject, TextMergeVariables } from './types';
import { createDraftFromFormula, generateThreeDrafts } from './utils/textMerge';

const SAMPLE_BRIEFS: Array<{
  holiday: string;
  toneId: string;
  brandName: string;
  nicheOrProduct: string;
  offerOrPerk: string;
  callToActionGoal: string;
}> = [
  {
    holiday: 'Earth Day',
    toneId: 'witty',
    brandName: 'Moss & Timber',
    nicheOrProduct: 'zero-waste home essentials',
    offerOrPerk: 'We are planting 5 trees with every order this weekend',
    callToActionGoal: 'Drop your favorite low-waste hack below (or just roast our plant addiction) 👇',
  },
  {
    holiday: 'Small Business Saturday',
    toneId: 'heartfelt',
    brandName: 'Parchment & Pine Bookshop',
    nicheOrProduct: 'curated independent indie reads & stationery',
    offerOrPerk: 'Complimentary hand-stamped book tote with any 2 paperbacks',
    callToActionGoal: 'Tell us the title of the book that changed your year 📖',
  },
  {
    holiday: "New Year's Day",
    toneId: 'bold',
    brandName: 'Apex Athletic Club',
    nicheOrProduct: 'functional strength & recovery coaching',
    offerOrPerk: 'First 14 days complimentary for curious movers',
    callToActionGoal: 'No resolutions. Just consistency. Link in bio to begin.',
  },
  {
    holiday: 'Winter Solstice',
    toneId: 'minimalist',
    brandName: 'Studio Kanso',
    nicheOrProduct: 'architectural ceramics & ambient lighting',
    offerOrPerk: 'Free insured holiday shipping through Sunday midnight',
    callToActionGoal: 'Save this quiet pause for your evening ritual.',
  },
  {
    holiday: 'Labor Day',
    toneId: 'educational',
    brandName: 'FocusFlow App',
    nicheOrProduct: 'asynchronous workflow & calendar protection tool',
    offerOrPerk: 'Holiday guide: 4 rules to shut your laptop at 5pm and keep it closed',
    callToActionGoal: 'Bookmark this carousel before your Monday team sync 📌',
  },
  {
    holiday: 'Halloween',
    toneId: 'witty',
    brandName: 'Roast & Revel Coffee Co.',
    nicheOrProduct: 'single-origin dark roast beans',
    offerOrPerk: 'Free mystery ghost roast sample in every seasonal shipment',
    callToActionGoal: 'Which coffee sin are you secretly guilty of? Spill the beans ☕',
  },
];

const INITIAL_VARIABLES: TextMergeVariables = {
  holiday: 'Earth Day',
  tone: 'witty',
  toneProfile: getToneProfile('witty'),
  brandName: 'Moss & Timber',
  nicheOrProduct: 'zero-waste home essentials',
  offerOrPerk: 'Planting 5 trees with every order this weekend',
  callToActionGoal: 'Drop your honest Earth Day ritual in the comments below 👇',
};

export default function App() {
  const [variables, setVariables] = useState<TextMergeVariables>(INITIAL_VARIABLES);
  const [drafts, setDrafts] = useState<DraftItem[]>(() => generateThreeDrafts(INITIAL_VARIABLES));
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);

  // Modals state
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // View mode: 'grid' (all 3 side-by-side) or 'focused' (focus on a specific draft)
  const [viewMode, setViewMode] = useState<'grid' | 'focused'>('grid');
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  // Load saved projects from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('draftsprout_saved_projects');
      if (stored) {
        setSavedProjects(JSON.parse(stored));
      }
    } catch {
      // Ignore storage read error
    }
  }, []);

  const persistSavedProjects = (updated: SavedProject[]) => {
    setSavedProjects(updated);
    try {
      localStorage.setItem('draftsprout_saved_projects', JSON.stringify(updated));
    } catch {
      // Ignore storage write error
    }
  };

  const handleUpdateVariables = (newVars: Partial<TextMergeVariables>) => {
    setVariables((prev) => ({
      ...prev,
      ...newVars,
    }));
  };

  const handleGenerate = () => {
    const newDrafts = generateThreeDrafts(variables);
    setDrafts(newDrafts);
  };

  const handleRandomPreset = () => {
    const randomBrief = SAMPLE_BRIEFS[Math.floor(Math.random() * SAMPLE_BRIEFS.length)];
    const profile = getToneProfile(randomBrief.toneId);
    const updatedVars: TextMergeVariables = {
      holiday: randomBrief.holiday,
      tone: randomBrief.toneId,
      toneProfile: profile,
      brandName: randomBrief.brandName,
      nicheOrProduct: randomBrief.nicheOrProduct,
      offerOrPerk: randomBrief.offerOrPerk,
      callToActionGoal: randomBrief.callToActionGoal,
    };
    setVariables(updatedVars);
    setDrafts(generateThreeDrafts(updatedVars));
  };

  const handleUpdateDraft = (index: number, updated: DraftItem) => {
    setDrafts((prev) => {
      const copy = [...prev];
      copy[index] = updated;
      return copy;
    });
  };

  const handleSwapFormula = (slotIndex: number, formulaId: string) => {
    const formula = FORMULA_LIBRARY.find((f) => f.id === formulaId);
    if (!formula) return;
    const newDraft = createDraftFromFormula(formula, variables, slotIndex);
    handleUpdateDraft(slotIndex, newDraft);
  };

  const handleResetDraft = (slotIndex: number) => {
    const current = drafts[slotIndex];
    const formula = FORMULA_LIBRARY.find((f) => f.id === current.formulaId) || FORMULA_LIBRARY[slotIndex];
    const freshDraft = createDraftFromFormula(formula, variables, slotIndex);
    handleUpdateDraft(slotIndex, freshDraft);
  };

  const handleToggleSaveDraft = (index: number) => {
    const target = drafts[index];
    const newSavedStatus = !target.isSaved;

    handleUpdateDraft(index, { ...target, isSaved: newSavedStatus });

    if (newSavedStatus) {
      // Create a project entry
      const project: SavedProject = {
        id: `project-${Date.now()}`,
        title: `${variables.holiday} · Draft 0${index + 1} (${target.formulaTitle})`,
        holiday: variables.holiday,
        tone: variables.toneProfile.label,
        createdAt: Date.now(),
        drafts: [target],
      };
      persistSavedProjects([project, ...savedProjects]);
    }
  };

  const handleApplyFormulaFromCatalog = (formulaId: string, slotIndex: number) => {
    handleSwapFormula(slotIndex, formulaId);
  };

  const handleLoadProject = (project: SavedProject) => {
    if (project.drafts.length === 3) {
      setDrafts(project.drafts);
    } else {
      // If loaded project has 1 draft, replace slot 0
      setDrafts((prev) => {
        const copy = [...prev];
        copy[0] = project.drafts[0];
        return copy;
      });
    }
    setVariables((prev) => ({
      ...prev,
      holiday: project.holiday,
    }));
  };

  const handleDeleteProject = (projectId: string) => {
    const filtered = savedProjects.filter((p) => p.id !== projectId);
    persistSavedProjects(filtered);
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 font-sans antialiased flex flex-col selection:bg-amber-300 selection:text-stone-900">
      {/* Top Header */}
      <Header
        onOpenCatalog={() => setIsCatalogOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        savedCount={savedProjects.length}
      />

      {/* Main Content Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full">
        {/* Intro Banner */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700">
                <span>Copywriting Accelerator</span>
                <span className="text-stone-300">·</span>
                <span className="font-mono text-stone-800">100% Deterministic Text-Merge</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight mt-0.5">
                Generate 3 Holiday Angles & Art Prompts
              </h1>
            </div>

            {/* Layout Mode Switcher */}
            <div className="flex items-center gap-1 bg-stone-200/80 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="View all 3 drafts side-by-side"
              >
                <Columns3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">3-Angle Comparison</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('focused')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  viewMode === 'focused'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Focus on a single draft in deep editor view"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Deep Editor</span>
              </button>
            </div>
          </div>
        </div>

        {/* Input & Merge Controls */}
        <InputPanel
          variables={variables}
          onChangeVariables={handleUpdateVariables}
          onGenerate={handleGenerate}
          onRandomPreset={handleRandomPreset}
        />

        {/* Results Workspace: 3 Contrasting Drafts */}
        <section aria-label="Generated Drafts Workspace">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-serif font-bold text-stone-900">
                Generated Drafts for "{variables.holiday}"
              </h2>
              <span className="text-stone-300">·</span>
              <span className="text-xs text-stone-700 font-medium">
                {variables.toneProfile.label} voice
              </span>
            </div>

            {viewMode === 'focused' && (
              <div className="flex items-center gap-1 bg-stone-200 p-1 rounded-lg">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFocusedIndex(idx)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                      focusedIndex === idx
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    Draft 0{idx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cards Grid */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {drafts.map((draft, idx) => (
                <DraftCard
                  key={draft.id}
                  draft={draft}
                  slotNumber={idx + 1}
                  variables={variables}
                  onUpdateDraft={(updated) => handleUpdateDraft(idx, updated)}
                  onSwapFormula={(formulaId) => handleSwapFormula(idx, formulaId)}
                  onToggleSave={() => handleToggleSaveDraft(idx)}
                  onResetDraft={() => handleResetDraft(idx)}
                />
              ))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <DraftCard
                draft={drafts[focusedIndex]}
                slotNumber={focusedIndex + 1}
                variables={variables}
                onUpdateDraft={(updated) => handleUpdateDraft(focusedIndex, updated)}
                onSwapFormula={(formulaId) => handleSwapFormula(focusedIndex, formulaId)}
                onToggleSave={() => handleToggleSaveDraft(focusedIndex)}
                onResetDraft={() => handleResetDraft(focusedIndex)}
              />
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white/50 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-700">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-800">DraftSprout</span>
            <span aria-hidden="true">·</span>
            <span>Static copywriting formula engine</span>
            <span aria-hidden="true">·</span>
            <span>No AI key required</span>
          </div>
          <div>
            Built to skip the blank-page phase and get straight to editing.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <FormulaCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onApplyFormulaToSlot={handleApplyFormulaFromCatalog}
      />

      <SavedDraftsModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedProjects={savedProjects}
        onLoadProject={handleLoadProject}
        onDeleteProject={handleDeleteProject}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        drafts={drafts}
        variables={variables}
      />
    </div>
  );
}
