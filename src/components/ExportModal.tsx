import React, { useState } from 'react';
import { Check, Copy, Download, FileText, X } from 'lucide-react';
import { DraftItem, TextMergeVariables } from '../types';
import { formatFullDraft } from '../utils/textMerge';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  drafts: DraftItem[];
  variables: TextMergeVariables;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  drafts,
  variables,
}) => {
  const [exportFormat, setExportFormat] = useState<'markdown' | 'text'>('markdown');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const buildExportContent = (): string => {
    const brand = variables.brandName || 'Our Brand';
    const holiday = variables.holiday;
    const tone = variables.toneProfile.label;

    if (exportFormat === 'markdown') {
      let md = `# Holiday Creative Brief & Copy Suite\n\n`;
      md += `**Holiday / Event:** ${holiday}  \n`;
      md += `**Brand Voice:** ${tone}  \n`;
      md += `**Brand:** ${brand}  \n`;
      if (variables.nicheOrProduct) md += `**Niche / Focus:** ${variables.nicheOrProduct}  \n`;
      if (variables.offerOrPerk) md += `**Special Offer:** ${variables.offerOrPerk}  \n`;
      md += `**Generated:** ${new Date().toLocaleDateString()} via DraftSprout\n\n---\n\n`;

      drafts.forEach((draft, idx) => {
        md += `## Draft 0${idx + 1}: ${draft.formulaTitle}\n`;
        md += `*Angle: ${draft.category}* | *Platform Format: ${draft.activePlatform.toUpperCase()}*\n\n`;
        md += `### Caption Copy\n\`\`\`text\n${formatFullDraft(draft, draft.activePlatform)}\n\`\`\`\n\n`;
        md += `### Visual Design Prompt\n`;
        md += `- **Concept Headline:** ${draft.visualPrompt.headline}\n`;
        md += `- **Art Direction:** ${draft.visualPrompt.artDirection}\n`;
        md += `- **Composition:** ${draft.visualPrompt.composition}\n`;
        md += `- **Color Palette:** ${draft.visualPrompt.colorPalette.join(', ')}\n`;
        md += `- **Typography Suggestion:** ${draft.visualPrompt.suggestedTypography}\n`;
        md += `- **Recommended Aspect Ratio:** ${draft.visualPrompt.recommendedRatio}\n\n`;
        md += `#### AI Image Generator Prompt\n\`\`\`text\n${draft.visualPrompt.generatorPrompt}\n\`\`\`\n\n---\n\n`;
      });

      return md;
    } else {
      let txt = `=====================================================\n`;
      txt += `HOLIDAY CREATIVE BRIEF & COPY SUITE\n`;
      txt += `=====================================================\n`;
      txt += `Holiday: ${holiday}\nBrand: ${brand}\nTone: ${tone}\nDate: ${new Date().toLocaleDateString()}\n\n`;

      drafts.forEach((draft, idx) => {
        txt += `-----------------------------------------------------\n`;
        txt += `DRAFT 0${idx + 1}: ${draft.formulaTitle.toUpperCase()}\n`;
        txt += `Angle: ${draft.category}\n`;
        txt += `-----------------------------------------------------\n\n`;
        txt += `[CAPTION COPY - ${draft.activePlatform.toUpperCase()}]\n`;
        txt += `${formatFullDraft(draft, draft.activePlatform)}\n\n`;
        txt += `[VISUAL DESIGN PROMPT]\n`;
        txt += `Direction: ${draft.visualPrompt.artDirection}\n`;
        txt += `Composition: ${draft.visualPrompt.composition}\n`;
        txt += `Palette: ${draft.visualPrompt.colorPalette.join(', ')}\n`;
        txt += `Prompt: ${draft.visualPrompt.generatorPrompt}\n\n\n`;
      });

      return txt;
    }
  };

  const exportText = buildExportContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = exportFormat === 'markdown' ? 'md' : 'txt';
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const cleanHoliday = variables.holiday.toLowerCase().replace(/[^a-z0-9]/g, '-');
    link.href = url;
    link.download = `${cleanHoliday}-draftsprout-brief.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-stone-200">
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-900 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Export Creative Suite
              </h3>
              <p className="text-xs text-stone-700">
                All 3 drafts and visual prompts bundled for your team or workflow.
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

        {/* Format Selector */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-stone-200/60 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setExportFormat('markdown')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                exportFormat === 'markdown'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Markdown (.md)
            </button>
            <button
              type="button"
              onClick={() => setExportFormat('text')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                exportFormat === 'text'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Plain Text (.txt)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied All!' : 'Copy to Clipboard'}</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Preview box */}
        <div className="p-5 overflow-y-auto flex-1 font-mono text-xs bg-stone-900 text-stone-200 select-all whitespace-pre-wrap leading-relaxed">
          {exportText}
        </div>

        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
