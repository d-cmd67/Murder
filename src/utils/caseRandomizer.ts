import { MysteryCase, SuspectId, Suspect, Evidence, CustomNames, CrimeLocation } from '../types';

export interface RoleArchetype {
  role: string;
  relationToVictim: string;
  motive: string;
  alibi: string;
  personality: string;
  avatarColor: string;
  avatarIcon: string;
}

export const ROLE_ARCHETYPES: RoleArchetype[] = [
  {
    role: 'Ambitious Tech Co-Founder & CTO',
    relationToVictim: 'Co-founded the high-tech neural venture with {VICTIM}',
    motive: 'Discovered {VICTIM} was secretly siphoning company patent royalties into offshore accounts.',
    alibi: 'Claims to have been recalibrating server hardware in the basement server room.',
    personality: 'Calculated, intense, speaks in sharp tech jargon with restless eye movement.',
    avatarColor: 'from-blue-600 to-indigo-900',
    avatarIcon: 'Cpu',
  },
  {
    role: 'Disinherited Heir & High-Stakes Gambler',
    relationToVictim: 'Estranged relative of {VICTIM}',
    motive: 'Owed $3.5 Million to underground loan sharks and learned {VICTIM} was disinheriting them.',
    alibi: 'Claims to have been nursing a drink alone in the smoking lounge balcony.',
    personality: 'Nervous, arrogant, fidgets with a gold signet ring while talking fast.',
    avatarColor: 'from-rose-600 to-red-900',
    avatarIcon: 'Coins',
  },
  {
    role: 'Chief Security Officer & Cryptographer',
    relationToVictim: 'Head of personal security for {VICTIM}',
    motive: 'Was facing immediate termination and blacklisting after a major security clearance breach.',
    alibi: 'Claims to have been conducting perimeter security patrols along the south terrace.',
    personality: 'Stoic, vigilant, gives brief stern answers and folds arms tightly.',
    avatarColor: 'from-slate-600 to-slate-900',
    avatarIcon: 'Shield',
  },
  {
    role: 'Chief Financial Auditor & Embezzler',
    relationToVictim: 'Appointed financial trustee for {VICTIM}',
    motive: 'Facing imminent federal indictment after {VICTIM} ordered an unannounced forensic audit.',
    alibi: 'Claims to have been reviewing quarterly balance sheets in the private library alcove.',
    personality: 'Meticulous, defensive, adjusts wire-rimmed glasses frequently.',
    avatarColor: 'from-amber-600 to-yellow-900',
    avatarIcon: 'FileText',
  },
  {
    role: 'Chief Medical Officer & Toxicologist',
    relationToVictim: 'Personal physician and medical advisor to {VICTIM}',
    motive: '{VICTIM} was threatening to expose unauthorized medical trials conducted in secret.',
    alibi: 'Claims to have been preparing herbal sedative mixtures in the medical dispensary.',
    personality: 'Clinical, soft-spoken, unnervingly calm under intense questioning.',
    avatarColor: 'from-emerald-600 to-teal-900',
    avatarIcon: 'Activity',
  },
  {
    role: 'Estate Archival Historian & Curator',
    relationToVictim: 'Historical consultant hired by {VICTIM}',
    motive: 'Discovered {VICTIM} planned to illegally auction off priceless stolen family heirlooms.',
    alibi: 'Claims to have been cataloging rare manuscripts in the conservatory repository.',
    personality: 'Obsessive, academic, speaks passionately about antiquities and history.',
    avatarColor: 'from-purple-600 to-purple-900',
    avatarIcon: 'BookOpen',
  },
  {
    role: 'Lead AI Research Fellow & Neural Specialist',
    relationToVictim: 'Lead scientist employed by {VICTIM}',
    motive: '{VICTIM} took sole credit for breakthrough neural AI algorithms and threatened termination.',
    alibi: 'Claims to have been running cloud server diagnostics in the laboratory terminal.',
    personality: 'Introverted, hyper-analytical, pauses frequently to calculate responses.',
    avatarColor: 'from-cyan-600 to-blue-900',
    avatarIcon: 'Zap',
  },
  {
    role: 'Underground Syndicate Envoy & Broker',
    relationToVictim: 'Secret business liaison to {VICTIM}',
    motive: '{VICTIM} reneged on a multi-million dollar contraband trade agreement.',
    alibi: 'Claims to have been pacing in the courtyard garden answering an encrypted satellite call.',
    personality: 'Smooth, mysterious, speaks in cryptic riddles with a cold composure.',
    avatarColor: 'from-fuchsia-600 to-pink-900',
    avatarIcon: 'UserCheck',
  },
  {
    role: 'Personal Valet & Confidential Aide',
    relationToVictim: 'Longtime personal confidant to {VICTIM}',
    motive: 'Endured years of ruthless verbal abuse and was blackmailing {VICTIM} with secret recordings.',
    alibi: 'Claims to have been polishing antique silverware in the pantry prep room.',
    personality: 'Deferential, observant, holds secrets close with polite composure.',
    avatarColor: 'from-stone-600 to-stone-900',
    avatarIcon: 'Feather',
  },
  {
    role: 'Head of Operations & Logistics Director',
    relationToVictim: 'Managed facility operations for {VICTIM}',
    motive: 'Discovered illegal financial kickbacks and was offered a bribe to stay quiet.',
    alibi: 'Claims to have been inspecting circuit breakers in the basement generator room.',
    personality: 'Pragmatic, gruff, impatient with small talk and pretense.',
    avatarColor: 'from-orange-600 to-amber-900',
    avatarIcon: 'Wrench',
  },
  {
    role: 'Investigative Journalist & Whistleblower',
    relationToVictim: 'Undercover reporter investigating {VICTIM}',
    motive: 'Discovered {VICTIM}\'s empire was built on fraud, but {VICTIM} confiscated their proof.',
    alibi: 'Claims to have been surreptitiously taking notes in the second-floor gallery.',
    personality: 'Inquisitive, sharp, quick-witted and persistent.',
    avatarColor: 'from-red-600 to-rose-900',
    avatarIcon: 'Search',
  },
  {
    role: 'Senior Astrophysics Director',
    relationToVictim: 'Observatory director working under {VICTIM}',
    motive: '{VICTIM} threatened to destroy decades of astronomical research to build a luxury helipad.',
    alibi: 'Claims to have been aligning the optical telescope lens on the upper observation deck.',
    personality: 'Eccentric, detail-oriented, obsessed with physical precision.',
    avatarColor: 'from-indigo-600 to-violet-900',
    avatarIcon: 'Compass',
  },
  {
    role: 'Mathematics Olympiad & Cryptography Champion',
    relationToVictim: 'Academic mentee competing in national rankings under {VICTIM}',
    motive: '{VICTIM} stole breakthrough cryptography proof and presented it under their own name.',
    alibi: 'Claims to have been solving differential equations in the library study carrel.',
    personality: 'Quiet, intensely focused, speaks in precise mathematical analogies.',
    avatarColor: 'from-blue-700 to-cyan-900',
    avatarIcon: 'GraduationCap',
  },
  {
    role: 'High School Athletics & Sports Team Captain',
    relationToVictim: 'Sports leader managing tournament squads for {VICTIM}',
    motive: '{VICTIM} threatened to leak confidential disciplinary reports that would disqualify the team.',
    alibi: 'Claims to have been conducting physical drills outside on the sports pavilion.',
    personality: 'Competitive, energetic, fiercely loyal to teammates.',
    avatarColor: 'from-amber-600 to-red-900',
    avatarIcon: 'Activity',
  },
  {
    role: 'Student Council Discipline & Honor Prefect',
    relationToVictim: 'Enforced academy code of conduct for {VICTIM}',
    motive: '{VICTIM} was blackmailing them with a forged attendance record discrepancy.',
    alibi: 'Claims to have been checking perimeter hallway security locks during the bell.',
    personality: 'Rigid, rule-abiding, uncomfortable when authority is challenged.',
    avatarColor: 'from-slate-700 to-zinc-900',
    avatarIcon: 'ShieldAlert',
  },
  {
    role: 'Campus IT & Cybersecurity Lead',
    relationToVictim: 'Maintained internal database servers for {VICTIM}',
    motive: 'Discovered {VICTIM} was covertly logging private communications across the student network.',
    alibi: 'Claims to have been patching server firewall vulnerabilities in the server rack.',
    personality: 'Tech-obsessed, skeptical, guarded about data privacy.',
    avatarColor: 'from-emerald-700 to-teal-950',
    avatarIcon: 'Terminal',
  },
  {
    role: 'Drama Society Director & Stage Manager',
    relationToVictim: 'Coordinated gala stage productions and speeches for {VICTIM}',
    motive: '{VICTIM} publicly humiliated their artistic work and cut the drama department budget.',
    alibi: 'Claims to have been adjusting backstage spotlight fixtures and curtain lines.',
    personality: 'Dramatic, expressive, uses vivid metaphors when explaining events.',
    avatarColor: 'from-rose-700 to-purple-950',
    avatarIcon: 'Sparkles',
  },
  {
    role: 'Chemical Reagent Laboratory Assistant',
    relationToVictim: 'Managed toxic chemical inventory under {VICTIM}',
    motive: '{VICTIM} framed them for a missing hazardous substance shipment.',
    alibi: 'Claims to have been sanitizing glass beakers and test tube racks at the laboratory sink.',
    personality: 'Cautious, detail-obsessed, obsessed with safety compliance logs.',
    avatarColor: 'from-cyan-700 to-blue-950',
    avatarIcon: 'FlaskConical',
  },
];

export interface EvidenceTemplate {
  title: string;
  description: string;
  iconName: string;
  locationFound: string;
  isKeyEvidence: boolean;
  detailedAnalysisTemplate: (killerPlaceholder: string) => string;
}

export const WEAPON_TEMPLATES: EvidenceTemplate[] = [
  {
    title: 'Obsidian Star-Pointer',
    description: 'A heavy 14-inch polished obsidian pointer antique used in astronomical viewing. Shows blood traces on tip.',
    locationFound: 'Telescope Upper Deck Floor',
    iconName: 'Sparkles',
    isKeyEvidence: true,
    detailedAnalysisTemplate: (killer) => `Wiped partially clean, but forensic luminol testing reveals latent thumbprints matching ${killer} near the hilt base.`,
  },
  {
    title: 'Poisoned Crystal Decanter & Stopper',
    description: 'A heavy crystal decanter containing vintage port laced with high-concentration potassium cyanide.',
    locationFound: 'Observatory Side Bar Table',
    iconName: 'Activity',
    isKeyEvidence: true,
    detailedAnalysisTemplate: (killer) => `Toxicology testing confirmed lethal cyanide dosage. Clear thumbprints of ${killer} were extracted from the decanter neck!`,
  },
  {
    title: 'Sharpened Silver Letter Opener',
    description: 'An ornate silver letter opener bearing intricate family crest engravings, stained with arterial blood.',
    locationFound: 'Executive Study Blotter',
    iconName: 'Feather',
    isKeyEvidence: true,
    detailedAnalysisTemplate: (killer) => `Forensic blade angle analysis and palm-grip impressions directly match ${killer}'s dominant hand prints!`,
  },
  {
    title: 'Heavy Brass Telescope Wrench',
    description: 'A solid brass mechanical wrench with blunt impact residue and microscopic fabric fibers attached.',
    locationFound: 'Telescope Pedestal Base',
    iconName: 'Wrench',
    isKeyEvidence: true,
    detailedAnalysisTemplate: (killer) => `Impact geometry and palm grease residue recover distinct dermal ridge patterns belonging to ${killer}.`,
  },
  {
    title: 'Custom Damascus Steel Blade',
    description: 'A high-precision folding blade found tucked beneath the floorboard near the crime scene.',
    locationFound: 'Observatory Balcony Corner',
    iconName: 'Bookmark',
    isKeyEvidence: true,
    detailedAnalysisTemplate: (killer) => `Serial number purchase records and handle DNA swabs confirm this custom blade belongs directly to ${killer}.`,
  },
];

export const INCRIMINATING_TEMPLATES: EvidenceTemplate[] = [
  {
    title: 'Stained Cufflink & Torn Silk Fabric',
    description: 'A silver cufflink torn from a designer dress coat, carrying a microscopic speck of fresh arterial blood.',
    locationFound: 'Observatory Railing Corner',
    iconName: 'Bookmark',
    isKeyEvidence: true,
    detailedAnalysisTemplate: (killer) => `Matches the exact tailored coat worn by ${killer} during the gala, proving direct physical presence at the scene at the moment of death.`,
  },
  {
    title: 'Blood-Speckled Leather Driver Glove',
    description: 'A left-hand black leather glove recovered from behind the balcony curtain with blood spatter.',
    locationFound: 'Lounge Curtain Fold',
    iconName: 'Shield',
    isKeyEvidence: true,
    detailedAnalysisTemplate: (killer) => `Interior glove lining yielded skin cell DNA matching ${killer}, while exterior leather bears blood matching {VICTIM}!`,
  },
  {
    title: 'Monogrammed Silk Handkerchief',
    description: 'A fine silk handkerchief damp with chemical solvents and blood residue found in the waste bin.',
    locationFound: 'Study Waste Bin',
    iconName: 'FileText',
    isKeyEvidence: true,
    detailedAnalysisTemplate: (killer) => `Embroidered initials and saliva DNA analysis conclusively identify ${killer} as the owner.`,
  },
  {
    title: 'Unlocked Master Keycard with Latent Prints',
    description: 'An administrative security pass card logged as unlocking the crime scene door at 10:22 PM.',
    locationFound: 'Security Terminal Slot',
    iconName: 'Terminal',
    isKeyEvidence: true,
    detailedAnalysisTemplate: (killer) => `Terminal keycard log data and thumbprint dust confirm ${killer} swiped into the room during the blackout window!`,
  },
  {
    title: 'Hidden Micro-Recorder Pen with Threat Audio',
    description: 'A digital audio pen found under the armchair containing recorded high-decibel arguments.',
    locationFound: 'Study Armchair Base',
    iconName: 'Zap',
    isKeyEvidence: true,
    detailedAnalysisTemplate: (killer) => `Acoustic voiceprint analysis verifies ${killer}'s voice screaming fatal threats at {VICTIM} just minutes before the murder!`,
  },
];

export const SECONDARY_TEMPLATES: EvidenceTemplate[] = [
  {
    title: 'Unsigned Disinheritance Will Draft',
    description: 'Legal document explicitly removing ${killer} from {VICTIM}\'s $25 Million estate trust.',
    locationFound: 'Study Desk Drawer',
    iconName: 'Scroll',
    isKeyEvidence: true,
    detailedAnalysisTemplate: (killer) => `Dated today with red wax seal. Confirms urgent financial motive for ${killer} to act before the midnight signature.`,
  },
  {
    title: 'Manual Circuit Relay Override Log',
    description: 'Server records proving the 12-minute blackout was manually executed using internal admin access code.',
    locationFound: 'Tech Hub Terminal',
    iconName: 'Terminal',
    isKeyEvidence: false,
    detailedAnalysisTemplate: () => `Logged by an authorized user workstation, proving the estate blackout was deliberately engineered to blind security feeds.`,
  },
  {
    title: 'Encrypted Patent Royalty Transfer Drive',
    description: 'USB memory key containing leaked algorithms and patent transfer agreements to offshore accounts.',
    locationFound: 'Wine Cellar Cabinet',
    iconName: 'HardDrive',
    isKeyEvidence: false,
    detailedAnalysisTemplate: () => `Contains high-value corporate patent transfers establishing severe financial disputes among suspects.`,
  },
  {
    title: 'Financial Audit Discrepancy Ledger',
    description: 'Detailed accounting report flagging $800,000 in unrecorded offshore wire transfers.',
    locationFound: 'Library Wall Safe',
    iconName: 'BookOpen',
    isKeyEvidence: false,
    detailedAnalysisTemplate: () => `Provides strong financial scandal motives for multiple estate guests.`,
  },
  {
    title: 'Shredded Confidential Wiretap Memorandum',
    description: 'Pieced-together document detailing secret blackmail payments and threat letters.',
    locationFound: 'Security Guard Booth',
    iconName: 'FileText',
    isKeyEvidence: false,
    detailedAnalysisTemplate: () => `Exposes private extortion rings operating inside the observatory estate.`,
  },
];

/**
 * Randomizes the killer identity, suspect roles/motives/alibis, evidence pointers, evidence items, and solution
 * for any given MysteryCase so every single playthrough is unique.
 */
export function randomizeCase(baseCase: MysteryCase, customNames: CustomNames): MysteryCase {
  const suspectKeys = Object.keys(baseCase.suspects) as SuspectId[];
  if (suspectKeys.length === 0) return baseCase;

  // Check if baseCase has bespoke/predefined evidence and tailored suspect roles
  const hasPredefinedContent = Boolean(baseCase.evidenceList && baseCase.evidenceList.length > 0);

  if (hasPredefinedContent) {
    // Pick TWO fresh random suspects for reshuffled gameplay
    const randomK1Index = Math.floor(Math.random() * suspectKeys.length);
    const killerId = suspectKeys[randomK1Index];

    let randomK2Index = (randomK1Index + 3) % suspectKeys.length;
    if (randomK2Index === randomK1Index) {
      randomK2Index = (randomK1Index + 1) % suspectKeys.length;
    }
    const killerId2 = suspectKeys[randomK2Index];

    const updatedSuspects: Record<string, Suspect> = {};
    suspectKeys.forEach((id) => {
      const original = baseCase.suspects[id];
      const isKiller = id === killerId || id === killerId2;
      let killerRole: 'Primary Mastermind' | 'Co-Conspirator Accomplice' | undefined = undefined;
      if (id === killerId) killerRole = 'Primary Mastermind';
      if (id === killerId2) killerRole = 'Co-Conspirator Accomplice';

      updatedSuspects[id] = {
        ...original,
        isKiller,
        killerRole,
        interrogationHistory: [], // reset chat history for fresh gameplay
      };
    });

    const updatedLocations = baseCase.locations.map((loc) => ({
      ...loc,
      clues: loc.clues.map((clue) => ({ ...clue, inspected: false })),
    }));

    // Update evidence pointers to match new random killers
    const originalK1 = baseCase.killerId || 'suspect3';
    const originalK2 = baseCase.killerId2 || 'suspect9';

    const updatedEvidence = baseCase.evidenceList.map((ev) => {
      let pointsTo = ev.pointsToSuspectId;
      if (pointsTo === originalK1 || pointsTo === 'suspect3') {
        pointsTo = killerId;
      } else if (pointsTo === originalK2 || pointsTo === 'suspect9') {
        pointsTo = killerId2;
      }
      return {
        ...ev,
        pointsToSuspectId: pointsTo,
        discovered: false,
      };
    });

    return {
      ...baseCase,
      id: `${baseCase.id}_rand_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      killerId,
      killerId2,
      suspects: updatedSuspects,
      evidenceList: updatedEvidence,
      locations: updatedLocations,
    };
  }

  // Pick TWO random suspects to be the co-conspirator killers for dynamic generic cases
  const randomKillerIndex = Math.floor(Math.random() * suspectKeys.length);
  const newKillerId = suspectKeys[randomKillerIndex];

  let randomKillerIndex2 = (randomKillerIndex + 3) % suspectKeys.length;
  if (randomKillerIndex2 === randomKillerIndex) {
    randomKillerIndex2 = (randomKillerIndex + 1) % suspectKeys.length;
  }
  const newKillerId2 = suspectKeys[randomKillerIndex2];

  // Derive suspect placeholder keys e.g. {SUSPECT_1}, {SUSPECT_2}, etc.
  const killerNumIndex = parseInt(newKillerId.replace('suspect', ''), 10);
  const killerPlaceholder = `{SUSPECT_${killerNumIndex}}`;

  const killer2NumIndex = parseInt(newKillerId2.replace('suspect', ''), 10);
  const killer2Placeholder = `{SUSPECT_${killer2NumIndex}}`;

  // Shuffle role archetypes randomly
  const shuffledArchetypes = [...ROLE_ARCHETYPES].sort(() => Math.random() - 0.5);

  // Clone and assign randomized roles, motives, alibis, and killer status to suspects
  const updatedSuspects: Record<string, Suspect> = {};
  suspectKeys.forEach((id, index) => {
    const original = baseCase.suspects[id];
    const isKiller = id === newKillerId || id === newKillerId2;
    const archetype = shuffledArchetypes[index % shuffledArchetypes.length];

    let secret = archetype.motive;
    let killerRole: 'Primary Mastermind' | 'Co-Conspirator Accomplice' | undefined = undefined;

    if (id === newKillerId) {
      killerRole = 'Primary Mastermind';
      secret = `CRITICAL MASTERMIND SECRET: Planned the crime with ${killer2Placeholder} and left latent fingerprint traces on the primary weapon.`;
    } else if (id === newKillerId2) {
      killerRole = 'Co-Conspirator Accomplice';
      secret = `CRITICAL CO-CONSPIRATOR SECRET: Aided ${killerPlaceholder} by disabling security sensors and hiding incriminating physical evidence.`;
    } else {
      secret = `Concealed a secret financial disagreement with {VICTIM} regarding their role as ${archetype.role}, but has a verified physical alibi for the exact time of death.`;
    }

    updatedSuspects[id] = {
      ...original,
      role: archetype.role,
      relationToVictim: archetype.relationToVictim,
      motive: archetype.motive,
      alibi: archetype.alibi,
      personality: archetype.personality,
      avatarColor: archetype.avatarColor,
      avatarIcon: archetype.avatarIcon,
      isKiller,
      killerRole,
      secret,
      suspicionLevel: isKiller ? 70 + Math.floor(Math.random() * 20) : 20 + Math.floor(Math.random() * 40),
      interrogationHistory: [], // reset chat history for fresh gameplay
    };
  });

  // Randomize Evidence Items
  const randomWeapon = WEAPON_TEMPLATES[Math.floor(Math.random() * WEAPON_TEMPLATES.length)];
  const randomIncriminating = INCRIMINATING_TEMPLATES[Math.floor(Math.random() * INCRIMINATING_TEMPLATES.length)];
  const shuffledSecondary = [...SECONDARY_TEMPLATES].sort(() => Math.random() - 0.5);

  const evidenceSlot1: Evidence = {
    id: 'ev_gala_pointer',
    title: randomWeapon.title,
    description: randomWeapon.description,
    locationFound: randomWeapon.locationFound,
    iconName: randomWeapon.iconName,
    discovered: false,
    isKeyEvidence: true,
    pointsToSuspectId: newKillerId,
    detailedAnalysis: randomWeapon.detailedAnalysisTemplate(killerPlaceholder),
  };

  const evidenceSlot2: Evidence = {
    id: 'ev_gala_blood_cuff',
    title: randomIncriminating.title,
    description: randomIncriminating.description,
    locationFound: randomIncriminating.locationFound,
    iconName: randomIncriminating.iconName,
    discovered: false,
    isKeyEvidence: true,
    pointsToSuspectId: newKillerId2,
    detailedAnalysis: randomIncriminating.detailedAnalysisTemplate(killer2Placeholder),
  };

  const evidenceSlot3: Evidence = {
    id: 'ev_gala_will',
    title: shuffledSecondary[0].title.replace('${killer}', killerPlaceholder),
    description: shuffledSecondary[0].description.replace('${killer}', killerPlaceholder),
    locationFound: shuffledSecondary[0].locationFound,
    iconName: shuffledSecondary[0].iconName,
    discovered: false,
    isKeyEvidence: true,
    pointsToSuspectId: newKillerId,
    detailedAnalysis: shuffledSecondary[0].detailedAnalysisTemplate(killerPlaceholder),
  };

  const evidenceSlot4: Evidence = {
    id: 'ev_gala_blackout_log',
    title: shuffledSecondary[1].title,
    description: shuffledSecondary[1].description,
    locationFound: shuffledSecondary[1].locationFound,
    iconName: shuffledSecondary[1].iconName,
    discovered: false,
    isKeyEvidence: false,
    pointsToSuspectId: newKillerId2,
    detailedAnalysis: shuffledSecondary[1].detailedAnalysisTemplate(killer2Placeholder),
  };

  const evidenceSlot5: Evidence = {
    id: 'ev_gala_drive',
    title: shuffledSecondary[2].title,
    description: shuffledSecondary[2].description,
    locationFound: shuffledSecondary[2].locationFound,
    iconName: shuffledSecondary[2].iconName,
    discovered: false,
    isKeyEvidence: false,
    pointsToSuspectId: suspectKeys[(randomKillerIndex + 2) % suspectKeys.length],
    detailedAnalysis: shuffledSecondary[2].detailedAnalysisTemplate(killerPlaceholder),
  };

  const evidenceSlot6: Evidence = {
    id: 'ev_gala_audit',
    title: shuffledSecondary[3].title,
    description: shuffledSecondary[3].description,
    locationFound: shuffledSecondary[3].locationFound,
    iconName: shuffledSecondary[3].iconName,
    discovered: false,
    isKeyEvidence: false,
    pointsToSuspectId: suspectKeys[(randomKillerIndex + 4) % suspectKeys.length],
    detailedAnalysis: shuffledSecondary[3].detailedAnalysisTemplate(killerPlaceholder),
  };

  const updatedEvidenceList: Evidence[] = [
    evidenceSlot1,
    evidenceSlot2,
    evidenceSlot3,
    evidenceSlot4,
    evidenceSlot5,
    evidenceSlot6,
  ];

  // Update Crime Scene Clues in Locations to display the randomized evidence titles
  const updatedLocations: CrimeLocation[] = baseCase.locations.map((loc) => ({
    ...loc,
    clues: loc.clues.map((clue) => {
      const matchedEv = updatedEvidenceList.find((ev) => ev.id === clue.evidenceId);
      if (matchedEv) {
        return {
          ...clue,
          title: matchedEv.title,
          description: matchedEv.description,
          inspected: false,
        };
      }
      return { ...clue, inspected: false };
    }),
  }));

  // Generate dynamic solution explanation
  const solutionExplanation = `DUO CONSPIRACY CONVICTION SECURED!\n\n` +
    `The murder was a joint crime executed by Mastermind ${killerPlaceholder} and Co-Conspirator Accomplice ${killer2Placeholder}!\n\n` +
    `Taking advantage of the chaotic window at ${baseCase.timeOfDeath}, ${killerPlaceholder} masterminded the attack at {LOCATION} while ${killer2Placeholder} provided crucial assistance by disabling security feeds.\n\n` +
    `Confronted with physical proof including ${randomWeapon.title} and ${randomIncriminating.title} bearing their fingerprints and matching DNA, both culprits broke down under interrogation and confessed!`;

  return {
    ...baseCase,
    id: `${baseCase.id}_rand_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    killerId: newKillerId,
    killerId2: newKillerId2,
    suspects: updatedSuspects,
    evidenceList: updatedEvidenceList,
    locations: updatedLocations,
    solutionExplanation,
  };
}

