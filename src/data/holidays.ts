import { HolidayPreset } from '../types';

export const POPULAR_HOLIDAYS: HolidayPreset[] = [
  {
    name: "New Year's Day",
    category: 'seasonal',
    dateHint: 'Jan 1',
    keywords: ['fresh start', 'intentions', 'blank slate', 'habits', 'resolutions', 'celebrate'],
    suggestedAngle: 'Focus on thoughtful intentions over exhausting hustle resolutions.',
    defaultColors: ['#0f172a', '#e2e8f0', '#d97706', '#f8fafc']
  },
  {
    name: "Valentine's Day",
    category: 'cultural',
    dateHint: 'Feb 14',
    keywords: ['love', 'self-care', 'connection', 'friendship', 'kindness', 'treat yourself'],
    suggestedAngle: 'Celebrate genuine connection, community love, or intentional self-care.',
    defaultColors: ['#be123c', '#ffe4e6', '#fb7185', '#4c0519']
  },
  {
    name: "International Women's Day",
    category: 'cultural',
    dateHint: 'Mar 8',
    keywords: ['empowerment', 'leadership', 'trailblazers', 'community', 'gratitude', 'impact'],
    suggestedAngle: 'Spotlight real women shaping your industry, community, or company story.',
    defaultColors: ['#6b21a8', '#f3e8ff', '#9333ea', '#3b0764']
  },
  {
    name: "St. Patrick's Day",
    category: 'cultural',
    dateHint: 'Mar 17',
    keywords: ['luck', 'green', 'celebration', 'gratitude', 'good vibes', 'cheers'],
    suggestedAngle: 'Make your own luck through craftsmanship, consistency, and good cheer.',
    defaultColors: ['#15803d', '#dcfce7', '#166534', '#fef08a']
  },
  {
    name: "Earth Day",
    category: 'wellness',
    dateHint: 'Apr 22',
    keywords: ['sustainability', 'planet', 'mindful', 'nature', 'renewal', 'conscious choices'],
    suggestedAngle: 'Transparent reflections on mindful practices and stewardship of our surroundings.',
    defaultColors: ['#065f46', '#d1fae5', '#047857', '#bbf7d0']
  },
  {
    name: "Mother's Day",
    category: 'cultural',
    dateHint: 'May (2nd Sun)',
    keywords: ['caregivers', 'unconditional love', 'nurture', 'strength', 'gratitude', 'pampering'],
    suggestedAngle: 'Honoring all forms of maternal energy and quiet everyday sacrifices.',
    defaultColors: ['#9d174d', '#fce7f3', '#f472b6', '#831843']
  },
  {
    name: "Pride Month",
    category: 'cultural',
    dateHint: 'June',
    keywords: ['authenticity', 'belonging', 'pride', 'diversity', 'expression', 'solidarity'],
    suggestedAngle: 'Unapologetic authenticity, year-round allyship, and celebrating diverse voices.',
    defaultColors: ['#e11d48', '#ea580c', '#ca8a04', '#16a34a', '#2563eb', '#7c3aed']
  },
  {
    name: "Juneteenth",
    category: 'cultural',
    dateHint: 'Jun 19',
    keywords: ['freedom', 'resilience', 'heritage', 'reflection', 'community', 'progress'],
    suggestedAngle: 'Reflecting on freedom, honoring Black culture, and lifelong education.',
    defaultColors: ['#b91c1c', '#15803d', '#111827', '#eab308']
  },
  {
    name: "Summer Solstice",
    category: 'seasonal',
    dateHint: 'Jun 20-22',
    keywords: ['longest day', 'sunshine', 'golden hour', 'vitality', 'adventure', 'warmth'],
    suggestedAngle: 'Savoring lingering daylight, playful adventures, and unhurried ease.',
    defaultColors: ['#d97706', '#fef3c7', '#ea580c', '#0284c7']
  },
  {
    name: "Labor Day",
    category: 'cultural',
    dateHint: 'Sep (1st Mon)',
    keywords: ['rest', 'hard work', 'unplug', 'recharge', 'late summer', 'balance'],
    suggestedAngle: 'Giving permission to clock out, unplug, and celebrate hard-earned rest.',
    defaultColors: ['#1e3a8a', '#dbeafe', '#b91c1c', '#f1f5f9']
  },
  {
    name: "Halloween",
    category: 'cultural',
    dateHint: 'Oct 31',
    keywords: ['spooky', 'unmasking', 'fun', 'treats', 'curiosity', 'playful chaos'],
    suggestedAngle: 'Playful spooky analogies, unmasking industry myths, or sweet treats.',
    defaultColors: ['#c2410c', '#18181b', '#7c3aed', '#fef08a']
  },
  {
    name: "Thanksgiving",
    category: 'cultural',
    dateHint: 'Nov (4th Thu)',
    keywords: ['gratitude', 'gathering', 'shared table', 'community', 'warmth', 'abundance'],
    suggestedAngle: 'Heartfelt appreciation for the community and clients who make the work worthwhile.',
    defaultColors: ['#78350f', '#fef3c7', '#b45309', '#92400e']
  },
  {
    name: "Black Friday & Cyber Monday",
    category: 'commercial',
    dateHint: 'Late Nov',
    keywords: ['holiday savings', 'exclusive perks', 'gift guide', 'limited drop', 'smart shopping'],
    suggestedAngle: 'Thoughtful curated specials that respect customer inboxes without cheap tricks.',
    defaultColors: ['#09090b', '#f43f5e', '#fafafa', '#27272a']
  },
  {
    name: "Small Business Saturday",
    category: 'commercial',
    dateHint: 'Late Nov',
    keywords: ['shop small', 'indie makers', 'local love', 'behind the scenes', 'craftsmanship'],
    suggestedAngle: 'Championing local dreamers, hands-on craft, and why shopping small matters.',
    defaultColors: ['#0369a1', '#e0f2fe', '#0284c7', '#0f172a']
  },
  {
    name: "Winter Solstice",
    category: 'seasonal',
    dateHint: 'Dec 21',
    keywords: ['return of light', 'hygge', 'stillness', 'reflection', 'cozy warmth', 'hibernation'],
    suggestedAngle: 'Quiet embrace of the shortest day, cozy candlelit warmth, and inner restoration.',
    defaultColors: ['#0f172a', '#1e293b', '#fbbf24', '#e2e8f0']
  },
  {
    name: "Christmas & Festive Season",
    category: 'seasonal',
    dateHint: 'Dec 25',
    keywords: ['merry', 'togetherness', 'cheer', 'magic', 'holiday spirit', 'peace'],
    suggestedAngle: 'Warm greetings, joy of giving, and slowing down to be present with loved ones.',
    defaultColors: ['#15803d', '#b91c1c', '#fef2f2', '#eab308']
  },
  {
    name: "National Coffee Day",
    category: 'quirky',
    dateHint: 'Sep 29',
    keywords: ['caffeine', 'morning ritual', 'fuel', 'pause', 'cozy sips', 'focus'],
    suggestedAngle: 'Celebrating the daily fuel and mindful ritual that powers our big ideas.',
    defaultColors: ['#451a03', '#fef3c7', '#78350f', '#d97706']
  },
  {
    name: "World Mental Health Day",
    category: 'wellness',
    dateHint: 'Oct 10',
    keywords: ['mental health', 'boundaries', 'check in', 'compassion', 'gentle pace', 'support'],
    suggestedAngle: 'Normalizing taking time, setting firm boundaries, and prioritizing well-being.',
    defaultColors: ['#0d9488', '#ccfbf1', '#115e59', '#f0fdfa']
  }
];
