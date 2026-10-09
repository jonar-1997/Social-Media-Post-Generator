import React, { useState } from 'react';
import { Bookmark, Calendar, Check, Copy, Trash2, X } from 'lucide-react';
import { SavedProject } from '../types';
import { formatFullDraft } from '../utils/textMerge';

interface SavedDraftsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedProjects: SavedProject[];
  onLoadProject: (project: SavedProject) => void;
  onDeleteProject: (projectId: string) => void;
}

export const SavedDraftsModal: React.FC<SavedDraftsModalProps> = ({
  isOpen,
  onClose,
  savedProjects,
  onLoadProject,
  onDeleteProject,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyDraft = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-stone-200">
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Saved Holiday Draft Sets
              </h3>
              <p className="text-xs text-stone-700">
                Bookmarks stored locally in your browser storage.
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

        <div className="p-5 overflow-y-auto space-y-4">
          {savedProjects.length === 0 ? (
            <div className="text-center py-16 text-stone-700 space-y-2">
              <Bookmark className="w-8 h-8 mx-auto text-stone-300 stroke-1" />
              <p className="text-sm font-medium text-stone-600">No saved draft sets yet</p>
              <p className="text-xs text-stone-700 max-w-sm mx-auto">
                Click the bookmark icon on any draft or save the current merge set to revisit anytime.
              </p>
            </div>
          ) : (
            savedProjects.map((proj) => {
              const formattedDate = new Date(proj.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl border border-stone-200 hover:border-stone-300 bg-white transition-all space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-stone-700">
                        <span className="font-semibold text-stone-800">{proj.holiday}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{proj.tone} tone</span>
                        <span aria-hidden="true">·</span>
                        <span>{formattedDate}</span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-stone-900 mt-0.5">
                        {proj.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onLoadProject(proj);
                          onClose();
                        }}
                        className="px-3 py-1.5 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white rounded-lg transition-colors"
                      >
                        Load Set
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteProject(proj.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-stone-700 hover:text-red-600 transition-colors"
                        title="Delete saved set"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Snippets of drafts */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-stone-100 text-xs">
                    {proj.drafts.map((d, i) => {
                      const text = formatFullDraft(d);
                      const isCopied = copiedId === `${proj.id}-${i}`;
                      return (
                        <div
                          key={i}
                          className="p-2.5 rounded-lg bg-stone-50 border border-stone-100 flex flex-col justify-between"
                        >
                          <div>
                            <span className="font-mono text-[10px] text-stone-700 block mb-1">
                              Draft 0{i + 1}: {d.formulaTitle}
                            </span>
                            <p className="line-clamp-3 text-stone-700 text-[11px] leading-snug">
                              {d.hook} {d.body}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopyDraft(text, `${proj.id}-${i}`)}
                            className="mt-2 text-[10px] font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 self-start"
                          >
                            {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{isCopied ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <span className="text-xs text-stone-700">
            {savedProjects.length} saved sets in browser storage
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
