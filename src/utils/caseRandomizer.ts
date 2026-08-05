import { MysteryCase, SuspectId, Suspect, Evidence, CustomNames } from '../types';

/**
 * Randomizes the killer identity, killer evidence pointers, secrets, and solution
 * for any given MysteryCase so every playthrough is unique.
 */
export function randomizeCase(baseCase: MysteryCase, customNames: CustomNames): MysteryCase {
  const suspectKeys = Object.keys(baseCase.suspects) as SuspectId[];
  if (suspectKeys.length === 0) return baseCase;

  // Pick a random suspect to be the killer
  const randomKillerIndex = Math.floor(Math.random() * suspectKeys.length);
  const newKillerId = suspectKeys[randomKillerIndex];

  // Derive suspect placeholder key e.g. {SUSPECT_1}, {SUSPECT_2}, etc.
  const killerNumIndex = parseInt(newKillerId.replace('suspect', ''), 10);
  const killerPlaceholder = `{SUSPECT_${killerNumIndex}}`;

  // Clone suspects with new killer status
  const updatedSuspects: Record<string, Suspect> = {};
  suspectKeys.forEach((id) => {
    const original = baseCase.suspects[id];
    const isKiller = id === newKillerId;

    let secret = original.secret;
    if (isKiller) {
      secret = `CRITICAL FORENSIC SECRET: Microscopic blood spatter matching {VICTIM} and latent fingerprints were recovered from their personal belongings.`;
    } else {
      secret = original.secret.replace(/CRITICAL FORENSIC SECRET:.*/g, '').trim();
      if (!secret) {
        secret = `Concealed a minor financial dispute with {VICTIM}, but has a verified alibi for the time of death.`;
      }
    }

    updatedSuspects[id] = {
      ...original,
      isKiller,
      secret,
      suspicionLevel: isKiller ? 65 + Math.floor(Math.random() * 20) : 20 + Math.floor(Math.random() * 40),
      interrogationHistory: [], // reset chat history for fresh gameplay
    };
  });

  // Update evidence list so key physical evidence points to the newly chosen killer
  const updatedEvidenceList: Evidence[] = baseCase.evidenceList.map((ev, index) => {
    // If it's key evidence or one of the top 2 evidence items, link it to the killer
    if (ev.isKeyEvidence || index === 0 || index === 1) {
      return {
        ...ev,
        pointsToSuspectId: newKillerId,
        detailedAnalysis: `High-sensitivity forensic scanning and fingerprint analysis match ${killerPlaceholder}. This piece of physical evidence proves their presence at the crime scene during the exact time of death.`,
      };
    }
    return { ...ev };
  });

  // Get killer's default or custom name
  const killerDefaultName = updatedSuspects[newKillerId]?.defaultName || `Suspect #${killerNumIndex}`;

  // Generate dynamic solution explanation
  const solutionExplanation = `CONVICTION SECURED! The true murderer was ${killerPlaceholder} (${killerDefaultName})!\n\n` +
    `Driven by hidden motives and taking advantage of the chaotic window at ${baseCase.timeOfDeath}, ${killerPlaceholder} executed the crime at {LOCATION}.\n\n` +
    `Confronted with physical evidence bearing their indisputable fingerprints and trace residue, ${killerPlaceholder} broke down under interrogation and signed a full confession!`;

  return {
    ...baseCase,
    id: `${baseCase.id}_rand_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    killerId: newKillerId,
    suspects: updatedSuspects,
    evidenceList: updatedEvidenceList,
    solutionExplanation,
  };
}
