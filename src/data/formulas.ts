import { FormulaTemplate, TextMergeVariables, VisualPromptData } from '../types';

export const FORMULA_LIBRARY: FormulaTemplate[] = [
  // 1. RELATABLE / STORY
  {
    id: 'formula-relatable-hook',
    title: 'The Relatable Hook & Cultural Pivot',
    category: 'relatable',
    description: 'Opens with an unvarnished human truth about the holiday, then seamlessly bridges to your brand perspective.',
    angleDescription: 'Angle A: Relatable, conversational & high engagement',
    hookTemplate: (vars) => {
      const holiday = vars.holiday;
      switch (vars.toneProfile.id) {
        case 'witty':
          return `Real talk: half of us are already romanticizing ${holiday}, and the other half are wondering how it's already here.`;
        case 'bold':
          return `Let’s stop pretending ${holiday} is about the generic fluff everyone posts every single year.`;
        case 'minimalist':
          return `A quiet pause amid the noise of ${holiday}.`;
        case 'heartfelt':
          return `If ${holiday} feels a little louder or tenderer for you this year, know you're not alone.`;
        case 'urgent':
          return `Tick-tock: ${holiday} is officially here, and this window won’t stay open for long.`;
        case 'educational':
          return `Before you get swept into the chaotic spin of ${holiday}, bookmark this reminder.`;
        case 'whimsical':
          return `There’s a soft sort of magic in the morning air today—welcome to ${holiday}.`;
        default:
          return `Taking a moment as ${holiday} arrives to share what’s genuinely on our mind.`;
      }
    },
    bodyTemplate: (vars) => {
      const { holiday, brandName, nicheOrProduct, offerOrPerk } = vars;
      const bName = brandName ? brandName : 'our team';
      const nProd = nicheOrProduct ? `in the world of ${nicheOrProduct}` : 'in what we create every day';
      const perkText = offerOrPerk ? `\n\n✨ A little holiday treat from us: ${offerOrPerk}.` : '';

      switch (vars.toneProfile.id) {
        case 'witty':
          return `Every year around this time, feeds fill with the exact same polished stock photos and rehearsed cheer.\n\nAt ${bName}, we believe in celebrating ${holiday} without the exhaustion. Whether you're all-in or silently counting down the minutes until your couch calls your name, we're right here with you ${nProd}.${perkText}`;
        case 'bold':
          return `The traditional script for ${holiday} is tired. It demands perfection, speed, and manufactured excitement.\n\nHere’s what ${bName} stands for instead: substance over spectacle, real craft ${nProd}, and zero obligation to follow the herd.${perkText}`;
        case 'minimalist':
          return `Beyond the celebrations and the calendar milestones lies a simple invitation: to honor what remains essential.\n\nAt ${bName}, we design ${nProd} around stillness, intention, and meaningful touchpoints.${perkText}`;
        case 'heartfelt':
          return `Holidays have a way of magnifying what truly matters: the people in our corner, the small daily rituals, and the steady community we share.\n\nFrom everyone at ${bName}, thank you for welcoming us into your life ${nProd}. We wouldn't be here without your trust.${perkText}`;
        case 'educational':
          return `Most people burn out trying to do everything right for ${holiday}.\n\nHere is our 3-second sanity rule:\n1. Prioritize presence over performance.\n2. Protect your energy first.\n3. Remember that ${bName} is in your corner for ${nProd}.${perkText}`;
        default:
          return `Holidays bring an opportunity to reflect on what keeps us grounded.\n\nAt ${bName}, our focus has always been creating meaningful moments ${nProd}. As you navigate ${holiday}, we hope you find space for what genuinely brings you life.${perkText}`;
      }
    },
    ctaTemplate: (vars) => {
      if (vars.callToActionGoal) return vars.callToActionGoal;
      switch (vars.toneProfile.id) {
        case 'witty':
          return `Drop your honest ${vars.holiday} plans below in three emojis (no judgment). 👇`;
        case 'bold':
          return `Agree or disagree? Sound off below.`;
        case 'minimalist':
          return `Save this gentle note for when you need quiet clarity today.`;
        case 'heartfelt':
          return `Tag someone who made your year warmer and tell them why. 💛`;
        case 'urgent':
          return `Tap the link in bio to claim your holiday access before midnight.`;
        default:
          return `How are you marking ${vars.holiday} this season? We’d love to hear below.`;
      }
    },
    hashtagsTemplate: (vars) => {
      const hClean = vars.holiday.replace(/[^a-zA-Z0-9]/g, '');
      const bClean = vars.brandName ? vars.brandName.replace(/[^a-zA-Z0-9]/g, '') : '';
      return [
        `#${hClean}`,
        `#${hClean}Vibes`,
        bClean ? `#${bClean}` : '#BrandStorytelling',
        '#HolidayReflections',
        '#IntentionalLiving',
        '#CommunityFirst'
      ];
    },
    visualPromptTemplate: (vars) => generateVisualPrompt(vars, 'relatable')
  },

  // 2. HEARTFELT / GRATITUDE STORY
  {
    id: 'formula-gratitude-reflection',
    title: 'The Behind-the-Scenes Gratitude Reflection',
    category: 'story',
    description: 'Warm, candid celebration focused on human craft, team gratitude, and community connection.',
    angleDescription: 'Angle B: Values-driven, emotional resonance & team humanity',
    hookTemplate: (vars) => {
      const holiday = vars.holiday;
      switch (vars.toneProfile.id) {
        case 'witty':
          return `Before the champagne pops or the nap begins: a quick note from the messy desk where the magic happens this ${holiday}.`;
        case 'bold':
          return `No marketing campaign or polished slogan could ever say what our community actually means to us this ${holiday}.`;
        case 'minimalist':
          return `Stillness, gratitude, and the quiet beauty of ${holiday}.`;
        case 'heartfelt':
          return `If we could write a handwritten thank-you letter to each one of you this ${holiday}, it would start like this:`;
        default:
          return `Looking back at this season as ${holiday} arrives, our hearts are completely full.`;
      }
    },
    bodyTemplate: (vars) => {
      const { holiday, brandName, nicheOrProduct, offerOrPerk } = vars;
      const bName = brandName ? brandName : 'our team';
      const nProd = nicheOrProduct ? `building ${nicheOrProduct}` : 'doing the work we care deeply about';
      const perk = offerOrPerk ? `\n\n🎁 Because you deserve it: ${offerOrPerk}.` : '';

      return `Behind every order, message, feedback loop, and high-five is a small team dedicated to ${nProd}.\n\nWhen we first set out, we dreamed of finding people who care about intentional quality as much as we do. This ${holiday}, seeing the community that has gathered around ${bName} is the single greatest milestone we could have wished for.\n\nMay your ${holiday} be filled with deep laughs, warm cups, unhurried conversations, and space to simply be.${perk}`;
    },
    ctaTemplate: (vars) => {
      if (vars.callToActionGoal) return vars.callToActionGoal;
      return `Leave a 🌿 below if you’re taking today completely offline to rest with people you love.`;
    },
    hashtagsTemplate: (vars) => {
      const hClean = vars.holiday.replace(/[^a-zA-Z0-9]/g, '');
      return [`#${hClean}`, '#BehindTheScenes', '#GratitudePost', '#SmallTeamBigHeart', '#CommunityLove', '#SlowCelebration'];
    },
    visualPromptTemplate: (vars) => generateVisualPrompt(vars, 'gratitude')
  },

  // 3. ACTION / CONTRARIAN OR PROMOTIONAL
  {
    id: 'formula-contrarian-action',
    title: 'The Anti-Cliché / High-Conversion Action Hook',
    category: 'contrarian',
    description: 'Flips the conventional holiday script on its head, creates instant curiosity, and offers a punchy, actionable payoff.',
    angleDescription: 'Angle C: Punchy, conversion-focused & memorable hook',
    hookTemplate: (vars) => {
      const holiday = vars.holiday;
      switch (vars.toneProfile.id) {
        case 'witty':
          return `Unpopular opinion: 90% of holiday traditions are just peer pressure from people in the 1800s.`;
        case 'bold':
          return `Here is the one rule everyone breaks on ${holiday}—and why you should too.`;
        case 'urgent':
          return `Don't scroll past this if you're planning on treating yourself for ${holiday}.`;
        case 'minimalist':
          return `Less noise. More intention this ${holiday}.`;
        default:
          return `The one thing we refuse to compromise on this ${holiday}:`;
      }
    },
    bodyTemplate: (vars) => {
      const { holiday, brandName, nicheOrProduct, offerOrPerk } = vars;
      const bName = brandName ? brandName : 'our crew';
      const nProd = nicheOrProduct ? `in ${nicheOrProduct}` : 'in our daily decisions';
      const perk = offerOrPerk
        ? `\n\n⚡ Here’s our holiday gift to make that effortless: ${offerOrPerk}.`
        : `\n\n⚡ That’s why at ${bName}, we’re stripping away the holiday clutter and doubling down on what actually moves the needle.`;

      return `Most brands spend ${holiday} shouting louder to get noticed. More confetti, more spam, more frenzy.\n\nWe decided to do the exact opposite ${nProd}.\n\nInstead of rushing, we’re curating. Instead of generic noise, we’re giving you real, lasting substance.${perk}`;
    },
    ctaTemplate: (vars) => {
      if (vars.callToActionGoal) return vars.callToActionGoal;
      return `Link in bio to explore the curated ${vars.holiday} lineup before it sells out.`;
    },
    hashtagsTemplate: (vars) => {
      const hClean = vars.holiday.replace(/[^a-zA-Z0-9]/g, '');
      return [`#${hClean}`, '#HolidayDrop', '#UnconventionalMarketing', '#BrandValues', '#CuratedLifestyle', '#ShopMindful'];
    },
    visualPromptTemplate: (vars) => generateVisualPrompt(vars, 'contrarian')
  },

  // 4. MICRO-RITUAL GUIDE
  {
    id: 'formula-micro-ritual',
    title: 'The 3-Step Holiday Micro-Ritual Guide',
    category: 'ritual',
    description: 'Provides structured, high-value steps for the audience to reclaim their peace, time, or joy during the holiday.',
    angleDescription: 'Actionable carousel or bullet-list format engineered for saves',
    hookTemplate: (vars) => `The 3-step ${vars.holiday} ritual we swear by at ${vars.brandName || 'our studio'}:`,
    bodyTemplate: (vars) => {
      const { holiday, brandName, nicheOrProduct, offerOrPerk } = vars;
      const perk = offerOrPerk ? `\n\n💡 Bonus: ${offerOrPerk}` : '';
      return `When the holiday rush threatens to take over, run this simple circuit:\n\n1. ☕ Protect the first 30 minutes: No notifications, just warm tea, fresh air, and your own thoughts.\n2. 🎯 Pick ONE meaningful highlight: You don’t have to attend every event or say yes to every request.\n3. 🌿 Choose quality over quantity: Whether it’s gifting, time, or ${nicheOrProduct || 'your creative projects'}, focus on what lasts.\n\nAt ${brandName || 'our brand'}, this philosophy shapes everything we build.${perk}`;
    },
    ctaTemplate: (vars) => vars.callToActionGoal || `Bookmark this post 📌 so you have it ready when the ${vars.holiday} rush peaks.`,
    hashtagsTemplate: (vars) => [`#${vars.holiday.replace(/[^a-zA-Z0-9]/g, '')}`, '#MindfulRituals', '#HolidayWellness', '#SlowLiving', '#IntentionalHabits'],
    visualPromptTemplate: (vars) => generateVisualPrompt(vars, 'ritual')
  },

  // 5. FLASH CELEBRATION DROP
  {
    id: 'formula-flash-celebration',
    title: 'The Festive Celebration Perk & Drop',
    category: 'action',
    description: 'High-energy celebration centered around a limited perk, gift with purchase, or holiday treat.',
    angleDescription: 'Direct promotional momentum without feeling spammy',
    hookTemplate: (vars) => `Consider this our official ${vars.holiday} toast to you. 🥂`,
    bodyTemplate: (vars) => {
      const { holiday, brandName, nicheOrProduct, offerOrPerk } = vars;
      const bName = brandName || 'our team';
      const offer = offerOrPerk || 'Exclusive seasonal access + free shipping all weekend long';
      return `To celebrate ${holiday}, we wanted to give something tangible back to the community that keeps ${bName} thriving.\n\nStarting right now: ${offer}.\n\nWhether you’re shopping for someone on your list or finally claiming what you’ve had your eye on ${nicheOrProduct ? `in our ${nicheOrProduct} collection` : ''}, we packed this drop with love.`;
    },
    ctaTemplate: (vars) => vars.callToActionGoal || `Tap the link in bio to unlock the celebration before items run out. 🎁`,
    hashtagsTemplate: (vars) => [`#${vars.holiday.replace(/[^a-zA-Z0-9]/g, '')}`, '#HolidayTreat', '#LimitedRelease', '#ShopIndependent', '#CelebrationPerk'],
    visualPromptTemplate: (vars) => generateVisualPrompt(vars, 'celebration')
  },

  // 6. PERMISSION SLIP
  {
    id: 'formula-permission-slip',
    title: 'The "Permission Slip" Unplug Reminder',
    category: 'relatable',
    description: 'Gives the audience permission to slow down, opt out of toxic hustle, and breathe during the holiday.',
    angleDescription: 'High-share empathetic empathy post that builds deep brand loyalty',
    hookTemplate: (vars) => `Your official permission slip for ${vars.holiday}:`,
    bodyTemplate: (vars) => {
      const { holiday, brandName } = vars;
      return `You have full permission to:\n• Mute the work group chat without guilt\n• Eat the dessert without calculating the steps\n• Say "no thank you" to gatherings that drain your spirit\n• Sleep in until the coffee is practically calling you\n\nThe world will still be spinning on the other side of ${holiday}. From ${brandName || 'all of us'}, take all the time you need to recharge your heart.`;
    },
    ctaTemplate: (vars) => vars.callToActionGoal || `Send this to a friend who needs a reminder to breathe today. 💛`,
    hashtagsTemplate: (vars) => [`#${vars.holiday.replace(/[^a-zA-Z0-9]/g, '')}`, '#PermissionToRest', '#GentleReminders', '#MentalHealthMatters', '#Unplugged'],
    visualPromptTemplate: (vars) => generateVisualPrompt(vars, 'permission')
  }
];

function generateVisualPrompt(vars: TextMergeVariables, formulaKind: string): VisualPromptData {
  const { holiday, toneProfile, brandName, nicheOrProduct } = vars;
  const brand = brandName || 'modern boutique brand';
  const niche = nicheOrProduct || 'lifestyle essentials';
  const colors = toneProfile.colorMood;

  switch (formulaKind) {
    case 'relatable':
      return {
        headline: `Editorial Candid Snapshot — "${holiday} Unfiltered"`,
        artDirection: `Contemporary lifestyle editorial photography with natural afternoon sunlight and slight cinematic 35mm film grain. Authentic, un-staged feel.`,
        composition: `Central hero product or subject with a clean 40% negative space area in the upper third for bold headline overlay text. Depth of field with soft bokeh background.`,
        lightingAndAtmosphere: `Warm natural daylight, soft dappled window shadows, cozy ambiance conveying relaxed celebration.`,
        colorPalette: ['#1E293B', '#F8FAFC', '#D97706', '#E2E8F0'],
        recommendedRatio: '4:5',
        suggestedTypography: `Bold editorial serif (e.g., Ogg or Fraunces) for the holiday title paired with a clean monospace or geometric sans (e.g., Inter/Neue Haas Grotesk) for the sub-caption.`,
        generatorPrompt: `Editorial photograph for ${brand} celebrating ${holiday}, candid aesthetic, featuring ${niche}, bathed in golden afternoon window light, subtle 35mm film grain, generous negative space at top for typography overlay, palette of ${colors}, Leica M11 photography, 50mm f/1.4 lens, 8k resolution, authentic and aspirational --ar 4:5 --v 6.1 --style raw`
      };

    case 'gratitude':
      return {
        headline: `Warm Golden Hour Vignette — "${holiday} Heartfelt Thanks"`,
        artDirection: `Warm tactile still life, artisanal textures (linen, kraft paper, ceramic cup, dried botanicals) highlighting human touch and thoughtful craft.`,
        composition: `Overhead flat-lay or low-angle angle with tactile organic props framing the frame, with an open parchment or card area for message display.`,
        lightingAndAtmosphere: `Golden hour sunset light with soft long shadows, warm amber glow, cozy and deeply grounding.`,
        colorPalette: ['#78350F', '#FEF3C7', '#B45309', '#F5F5F4'],
        recommendedRatio: '1:1',
        suggestedTypography: `Warm human humanist serif with generous tracking (letter spacing) and an understated italicized sign-off.`,
        generatorPrompt: `Warm artisanal still life for ${holiday} by ${brand}, tactile textures of textured cotton paper, natural linen cloth, ceramic accents and handcrafted elements of ${niche}, bathed in soft amber candlelight and warm golden hour dusk, cozy organic studio setting, shot on Hasselblad, high dynamic range --ar 1:1 --v 6.1`
      };

    case 'contrarian':
      return {
        headline: `High-Contrast Minimalist Statement — "The ${holiday} Pivot"`,
        artDirection: `Stark Swiss-style graphic design or high-contrast studio editorial with bold geometric shapes, dramatic shadows, and punchy visual presence.`,
        composition: `Asymmetrical modern composition with stark contrast between dark and light planes. Maximum visual punch in social feed scroll.`,
        lightingAndAtmosphere: `Direct studio flash or crisp razor-sharp side lighting, high contrast, clean architectural shadows.`,
        colorPalette: ['#09090B', '#FAFAFA', '#E11D48', '#71717A'],
        recommendedRatio: '4:5',
        suggestedTypography: `Ultra-bold grotesque sans-serif (e.g., Akzidenz-Grotesk or Neue Haas Grotesk Bold) in tight line-height, stark contrast.`,
        generatorPrompt: `Avant-garde studio still life for ${brand} celebrating ${holiday}, stark high-contrast directional lighting with sharp architectural shadows, showcasing ${niche} as an artistic hero sculpture, minimalist gallery aesthetic, clean monochrome background with a striking saturated accent, shot on medium format, ultra-crisp detail --ar 4:5 --v 6.1`
      };

    case 'ritual':
      return {
        headline: `Clean Editorial Checklist / Flatlay — "${holiday} Rituals"`,
        artDirection: `Calm Scandinavian studio flat-lay with organized elements, mindful objects (journal, matcha/coffee, fresh botanicals, product sample).`,
        composition: `Organized knolling arrangement with balanced spacing, crisp grid alignment, and clean quadrant zones for carousel slides or story format.`,
        lightingAndAtmosphere: `Diffused soft north-facing studio light, clean airy white balance, zero harsh glare.`,
        colorPalette: ['#065F46', '#D1FAE5', '#F8FAFC', '#334155'],
        recommendedRatio: '4:5',
        suggestedTypography: `Structured modern sans-serif with numbered step indicators and quiet gray body annotations.`,
        generatorPrompt: `Top-down knolling flat-lay for ${holiday} by ${brand}, minimalist Scandinavian morning aesthetic, items neatly arranged on light travertine stone: journal, fountain pen, ${niche}, fresh sage leaves, soft diffused daylight, airy and tranquil, high resolution editorial product photography --ar 4:5 --v 6.1`
      };

    case 'celebration':
      return {
        headline: `Celebratory Festive Spotlight — "${holiday} Gift Drop"`,
        artDirection: `Refined festive luxury with metallic champagne highlights, subtle confetti or textured silk ribbons, avoiding cheap holiday clichés.`,
        composition: `Centrally anchored product hero elevated on a minimal stone or silk pedestal, surrounded by tasteful festive accoutrements.`,
        lightingAndAtmosphere: `Gleaming spotlight with gentle rim lighting and sparkling reflections, rich festive richness.`,
        colorPalette: ['#881337', '#FFF1F2', '#D97706', '#1E293B'],
        recommendedRatio: '1:1',
        suggestedTypography: `Modern elegant display serif with high stroke contrast, paired with micro-caps sans labels.`,
        generatorPrompt: `Luxury celebration product reveal for ${brand} celebrating ${holiday}, hero presentation of ${niche} on a velvet pedestal, soft champagne gold reflections, subtle elegant ribbon details, deep jewel-toned backdrop, commercial studio lighting, award-winning advertising photography --ar 1:1 --v 6.1`
      };

    default:
      return {
        headline: `Modern Lifestyle Frame — "${holiday} Story"`,
        artDirection: `Natural contemporary lifestyle photography reflecting authentic brand values and thoughtful celebration.`,
        composition: `Harmonious rule-of-thirds framing with designated negative space for typography overlay.`,
        lightingAndAtmosphere: `Balanced ambient light, pleasant warmth, welcoming and approachable mood.`,
        colorPalette: ['#1E293B', '#F8FAFC', '#3B82F6', '#64748B'],
        recommendedRatio: '4:5',
        suggestedTypography: `Clean contemporary sans-serif with balanced tracking and modern title hierarchy.`,
        generatorPrompt: `Editorial commercial photograph for ${brand} for ${holiday}, thoughtful contemporary scene featuring ${niche}, natural lighting, serene atmosphere, high aesthetic fidelity --ar 4:5 --v 6.1`
      };
  }
}
