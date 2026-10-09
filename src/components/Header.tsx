import React from 'react';
import { BookOpen, Bookmark, Download, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenCatalog: () => void;
  onOpenSaved: () => void;
  onOpenExport: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCatalog,
  onOpenSaved,
  onOpenExport,
  savedCount,
}) => {
  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-stone-900 text-stone-100 flex items-center justify-center font-serif text-lg font-bold shadow-sm">
            D
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-900 tracking-tight text-base sm:text-lg">DraftSprout</span>
              <span className="text-stone-300">·</span>
              <span className="text-xs font-medium text-stone-700 hidden sm:inline">Formula Copy & Visual Studio</span>
            </div>
            <p className="text-xs text-stone-700 hidden md:block">
              Skip the blank page: merge holiday briefs with battle-tested caption formulas
            </p>
          </div>
        </div>

        {/* Global Toolbar Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCatalog}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 rounded-md transition-colors"
            title="Browse all static formulas"
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden sm:inline">Formula</span> Library
          </button>

          <button
            type="button"
            onClick={onOpenSaved}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 rounded-md transition-colors relative"
            title="View saved drafts"
          >
            <Bookmark className="w-3.5 h-3.5 text-stone-500" />
            <span>Saved</span>
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold bg-amber-600 text-white rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-stone-50 bg-stone-900 hover:bg-stone-800 rounded-md transition-colors shadow-sm"
            title="Export all drafts and visual briefs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export All</span>
          </button>
        </div>
      </div>
    </header>
  );
};
