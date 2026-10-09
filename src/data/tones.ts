import { ToneProfile } from '../types';

export const TONE_PROFILES: ToneProfile[] = [
  {
    id: 'witty',
    label: 'Witty & Playful',
    tagline: 'Self-aware humor, cheeky observations, smart banter',
    emoji: '⚡',
    starterVocabulary: [
      'Unpopular opinion:',
      'Not me overthinking',
      'The math is mathing',
      'Honestly?',
      'Let’s be real for two seconds',
      'PSA:',
      'Consider this your reminder'
    ],
    emojiPalette: ['👀', '✨', '☕', '🙃', '🛋️', '🎯'],
    visualStyle: 'Bold high-contrast photography, playful typography with stickers or hand-drawn doodles, vibrant modern accents',
    colorMood: 'Cobalt blue, electric amber, crisp warm white'
  },
  {
    id: 'heartfelt',
    label: 'Warm & Heartfelt',
    tagline: 'Authentic gratitude, emotional resonance, cozy humanity',
    emoji: '🕯️',
    starterVocabulary: [
      'Taking a quiet pause today to say:',
      'If you need to hear this today:',
      'More than anything, we’re grateful for',
      'May this day bring you',
      'From our small corner to yours,'
    ],
    emojiPalette: ['💛', '🌿', '✨', '🕊️', '🌾', '☕'],
    visualStyle: 'Warm golden hour lighting, tactile textures, film grain, organic floral or cozy interior elements',
    colorMood: 'Muted terracotta, oat milk beige, forest green, warm linen'
  },
  {
    id: 'bold',
    label: 'Bold & Contrarian',
    tagline: 'Direct, provocative, subverting common holiday clichés',
    emoji: '💥',
    starterVocabulary: [
      'Forget what everyone else is telling you about',
      'The holiday cliché we’re officially retiring:',
      'Most brands will tell you to relax. We say:',
      'Here is the truth nobody admits during',
      'Stop doing this during'
    ],
    emojiPalette: ['🔥', '🛑', '⚡', '💣', '👀'],
    visualStyle: 'Brutalist or stark editorial aesthetic, bold heavy typography, stark monochrome with a razor-sharp neon pop',
    colorMood: 'Deep obsidian black, stark chalk white, crimson or acid lime'
  },
  {
    id: 'minimalist',
    label: 'Minimalist & Elevated',
    tagline: 'Sophisticated, understated, quiet luxury, editorial grace',
    emoji: '◻️',
    starterVocabulary: [
      'A gentle pause.',
      'Moments of stillness.',
      'Honoring what matters most.',
      'Simplicity in celebration.',
      'Quiet reflections on'
    ],
    emojiPalette: ['▪️', '▫️', '🕊️', '✨'],
    visualStyle: 'Spacious negative space, editorial architectural composition, subdued natural light, serif typography, serene stillness',
    colorMood: 'Alabaster, stone gray, warm charcoal, brushed brass'
  },
  {
    id: 'educational',
    label: 'Community & Practical',
    tagline: 'Actionable tips, thoughtful rituals, relatable value',
    emoji: '📚',
    starterVocabulary: [
      '3 rituals to reclaim your peace this',
      'The ultimate checklist for',
      'Save this before the weekend rush:',
      'How to actually enjoy',
      'Our team’s go-to guide for'
    ],
    emojiPalette: ['📌', '💡', '✍️', '🌱', '✅'],
    visualStyle: 'Clean infographics or structured carousel cover, crisp flat-lay with clear reading hierarchy, soft neutral tones',
    colorMood: 'Sage green, slate navy, warm cream, taupe'
  },
  {
    id: 'urgent',
    label: 'Urgent & Promotional',
    tagline: 'Scarcity, festive perks, celebratory treats & excitement',
    emoji: '🎁',
    starterVocabulary: [
      'Our biggest celebration of the season is live:',
      'Here is our holiday gift to you:',
      'Only available through midnight:',
      'Because you deserve something sweet this',
      'The holiday countdown is on:'
    ],
    emojiPalette: ['⏳', '🎁', '🎉', '💫', '🏷️'],
    visualStyle: 'Festive unboxing aesthetic, dynamic product spotlight, celebratory sparkle without tacky clutter, punchy badge typography',
    colorMood: 'Deep ruby, champagne gold, festive forest emerald'
  },
  {
    id: 'whimsical',
    label: 'Whimsical & Poetic',
    tagline: 'Dreamy, imaginative, storybook charm and wonder',
    emoji: '🌙',
    starterVocabulary: [
      'There is a quiet magic in the air this',
      'If holidays had flavors, today tastes like',
      'Wishing you slow mornings and starlit evenings this',
      'A little reminder to look for wonder today:'
    ],
    emojiPalette: ['✨', '☁️', '🌙', '🍂', '💫'],
    visualStyle: 'Surreal soft focus, whimsical collage elements, gentle dreamy pastels, fairytale typography accents',
    colorMood: 'Dusty lavender, butter yellow, morning mist blue, rose gold'
  },
  {
    id: 'custom',
    label: 'Custom Voice Profile',
    tagline: 'Define your own unique tone keywords and style',
    emoji: '🎨',
    starterVocabulary: [
      'Here is our take on',
      'Checking in with you this',
      'From all of us at'
    ],
    emojiPalette: ['✨', '💬', '🌟'],
    visualStyle: 'Balanced brand editorial design tailored to your bespoke guidelines',
    colorMood: 'Custom brand colorway'
  }
];

export function getToneProfile(toneId: string): ToneProfile {
  const found = TONE_PROFILES.find((t) => t.id === toneId);
  return found || TONE_PROFILES[0];
}
