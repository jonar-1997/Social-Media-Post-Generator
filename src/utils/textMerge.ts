import { DraftItem, FormulaTemplate, PlatformTarget, TextMergeVariables } from '../types';
import { FORMULA_LIBRARY } from '../data/formulas';

export function generateThreeDrafts(vars: TextMergeVariables): DraftItem[] {
  // We pick 3 distinct formulas to guarantee 3 diverse angles
  // Angle 1: Relatable Hook & Pivot
  // Angle 2: Gratitude & Story Reflection
  // Angle 3: Contrarian / Promotional Action Hook (or Micro-Ritual depending on tone)
  const formula1 = FORMULA_LIBRARY.find((f) => f.id === 'formula-relatable-hook') || FORMULA_LIBRARY[0];
  const formula2 = FORMULA_LIBRARY.find((f) => f.id === 'formula-gratitude-reflection') || FORMULA_LIBRARY[1];
  
  // If tone is educational/practical, pick micro-ritual; if urgent, pick flash celebration; else contrarian
  let formula3 = FORMULA_LIBRARY.find((f) => f.id === 'formula-contrarian-action') || FORMULA_LIBRARY[2];
  if (vars.toneProfile.id === 'educational') {
    formula3 = FORMULA_LIBRARY.find((f) => f.id === 'formula-micro-ritual') || formula3;
  } else if (vars.toneProfile.id === 'urgent') {
    formula3 = FORMULA_LIBRARY.find((f) => f.id === 'formula-flash-celebration') || formula3;
  }

  return [
    createDraftFromFormula(formula1, vars, 0),
    createDraftFromFormula(formula2, vars, 1),
    createDraftFromFormula(formula3, vars, 2)
  ];
}

export function createDraftFromFormula(
  formula: FormulaTemplate,
  vars: TextMergeVariables,
  slotIndex: number
): DraftItem {
  const hook = formula.hookTemplate(vars);
  const body = formula.bodyTemplate(vars);
  const cta = formula.ctaTemplate(vars);
  const hashtags = formula.hashtagsTemplate(vars);
  const visualPrompt = formula.visualPromptTemplate(vars);

  return {
    id: `draft-${Date.now()}-${slotIndex}-${Math.random().toString(36).substring(2, 7)}`,
    slotIndex,
    formulaId: formula.id,
    formulaTitle: formula.title,
    category: formula.angleDescription,
    hook,
    body,
    cta,
    hashtags,
    visualPrompt,
    isEdited: false,
    activePlatform: 'instagram'
  };
}

export function formatFullDraft(draft: DraftItem, platform: PlatformTarget = draft.activePlatform): string {
  const cleanHook = draft.hook.trim();
  const cleanBody = draft.body.trim();
  const cleanCta = draft.cta.trim();
  const hashtagsBlock = draft.hashtags.length > 0 ? draft.hashtags.join(' ') : '';

  switch (platform) {
    case 'instagram':
      return `${cleanHook}\n\n${cleanBody}\n\n${cleanCta}\n\n.\n.\n.\n${hashtagsBlock}`;
    
    case 'linkedin':
      // LinkedIn benefits from short paragraph chunks and no dense hashtag clouds
      return `${cleanHook}\n\n${cleanBody}\n\n${cleanCta}\n\n${draft.hashtags.slice(0, 3).join(' ')}`;
    
    case 'x':
      // X is condensed and punchy
      const combined = `${cleanHook} ${cleanBody.split('\n\n')[0]} ${cleanCta}`;
      return combined.length > 270 ? combined.substring(0, 267) + '...' : combined;

    case 'newsletter':
      return `Subject Idea: ${cleanHook}\n\n---\n\n${cleanBody}\n\n${cleanCta}\n\nWarmly,\nTeam`;

    default:
      return `${cleanHook}\n\n${cleanBody}\n\n${cleanCta}\n\n${hashtagsBlock}`;
  }
}

export function getPlatformLimits(platform: PlatformTarget) {
  switch (platform) {
    case 'instagram':
      return { maxChars: 2200, recommended: '150 - 300 words', label: 'Instagram' };
    case 'linkedin':
      return { maxChars: 3000, recommended: '100 - 250 words', label: 'LinkedIn' };
    case 'x':
      return { maxChars: 280, recommended: 'Under 280 chars', label: 'X (Twitter)' };
    case 'newsletter':
      return { maxChars: 5000, recommended: '300 - 600 words', label: 'Newsletter' };
  }
}

export function calculateStats(text: string) {
  const characters = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const readingTimeSeconds = Math.max(1, Math.round((words / 200) * 60));
  return { characters, words, readingTimeSeconds };
}

// Quick rule-based polish transformations
export function makePunchier(text: string): string {
  return text
    .replace(/In order to/gi, 'To')
    .replace(/At this point in time/gi, 'Now')
    .replace(/We wanted to take a moment to/gi, 'We want to')
    .replace(/Due to the fact that/gi, 'Because')
    .replace(/It is important to remember that/gi, 'Remember:')
    .replace(/Every single year/gi, 'Every year')
    .replace(/A whole lot of/gi, 'Lots of')
    .replace(/Without further ado/gi, 'Here it is')
    .trim();
}

export function stripEmojis(text: string): string {
  return text
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function addSprinkleEmojis(text: string, toneEmojis: string[]): string {
  const emojis = toneEmojis.length > 0 ? toneEmojis : ['✨', '💛', '🌿', '⚡'];
  const lines = text.split('\n');
  const enhancedLines = lines.map((line, idx) => {
    if (line.trim().length === 0) return line;
    // Add emoji to headers or lists
    if (line.match(/^\d+\./)) {
      const e = emojis[idx % emojis.length];
      return `${line} ${e}`;
    }
    return line;
  });
  return enhancedLines.join('\n');
}
