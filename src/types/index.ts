export type ToneType =
  | 'witty'
  | 'heartfelt'
  | 'bold'
  | 'minimalist'
  | 'educational'
  | 'urgent'
  | 'whimsical'
  | 'custom';

export interface ToneProfile {
  id: ToneType;
  label: string;
  tagline: string;
  emoji: string;
  starterVocabulary: string[];
  emojiPalette: string[];
  visualStyle: string;
  colorMood: string;
}

export interface HolidayPreset {
  name: string;
  category: 'seasonal' | 'cultural' | 'commercial' | 'wellness' | 'quirky';
  dateHint: string;
  keywords: string[];
  suggestedAngle: string;
  defaultColors: string[];
}

export type PlatformTarget = 'instagram' | 'linkedin' | 'x' | 'newsletter';

export interface FormulaTemplate {
  id: string;
  title: string;
  category: 'story' | 'relatable' | 'action' | 'contrarian' | 'educational' | 'ritual';
  description: string;
  angleDescription: string;
  hookTemplate: (vars: TextMergeVariables) => string;
  bodyTemplate: (vars: TextMergeVariables) => string;
  ctaTemplate: (vars: TextMergeVariables) => string;
  hashtagsTemplate: (vars: TextMergeVariables) => string[];
  visualPromptTemplate: (vars: TextMergeVariables) => VisualPromptData;
}

export interface VisualPromptData {
  headline: string;
  artDirection: string;
  composition: string;
  lightingAndAtmosphere: string;
  colorPalette: string[];
  recommendedRatio: '1:1' | '4:5' | '9:16' | '16:9';
  suggestedTypography: string;
  generatorPrompt: string; // Ready for Midjourney / DALL-E / Canva
}

export interface TextMergeVariables {
  holiday: string;
  tone: string;
  toneProfile: ToneProfile;
  brandName: string;
  nicheOrProduct: string;
  offerOrPerk: string;
  callToActionGoal: string;
  customToneDetails?: string;
}

export interface DraftItem {
  id: string;
  slotIndex: number; // 0, 1, 2
  formulaId: string;
  formulaTitle: string;
  category: string;
  hook: string;
  body: string;
  cta: string;
  hashtags: string[];
  visualPrompt: VisualPromptData;
  isEdited: boolean;
  activePlatform: PlatformTarget;
  isSaved?: boolean;
}

export interface SavedProject {
  id: string;
  title: string;
  holiday: string;
  tone: string;
  createdAt: number;
  drafts: DraftItem[];
}
