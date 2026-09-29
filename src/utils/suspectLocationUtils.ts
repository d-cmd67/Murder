import { MysteryCase, CrimeLocation, SuspectId } from '../types';

/**
 * Determines the specific room/location ID where the primary suspect (killerId) is located.
 */
export function getPrimarySuspectLocationId(
  currentCase: MysteryCase,
  locations: CrimeLocation[]
): string {
  if (!currentCase || !locations || locations.length === 0) return '';

  const primaryKillerId: SuspectId = currentCase.killerId || (currentCase as any).killerSuspectId || 'suspect3';
  const primarySuspect = currentCase.suspects?.[primaryKillerId];

  // 1. Search evidence list for evidence linked to primary killer, and check locationFound against room names/ids
  if (currentCase.evidenceList) {
    const killerEvidence = currentCase.evidenceList.find(
      (ev) => ev.pointsToSuspectId === primaryKillerId || ev.isKeyEvidence
    );
    if (killerEvidence && killerEvidence.locationFound) {
      const locFoundLower = killerEvidence.locationFound.toLowerCase();
      const matchedLoc = locations.find(
        (loc) =>
          locFoundLower.includes(loc.name.toLowerCase()) ||
          locFoundLower.includes(loc.id.toLowerCase()) ||
          loc.clues.some(
            (clue) =>
              clue.title.toLowerCase().includes(locFoundLower) ||
              clue.description.toLowerCase().includes(locFoundLower)
          )
      );
      if (matchedLoc) return matchedLoc.id;
    }
  }

  // 2. Search primary suspect's alibi or role or secret for location keywords
  if (primarySuspect) {
    const suspectText = `${primarySuspect.alibi || ''} ${primarySuspect.role || ''} ${primarySuspect.secret || ''}`.toLowerCase();
    const matchedLoc = locations.find(
      (loc) =>
        suspectText.includes(loc.name.toLowerCase()) ||
        loc.name
          .toLowerCase()
          .split(' ')
          .some((word) => word.length > 3 && suspectText.includes(word))
    );
    if (matchedLoc) return matchedLoc.id;
  }

  // 3. Fallback: Map suspect index deterministically to one of the locations
  const suspectKeys = Object.keys(currentCase.suspects || {}) as SuspectId[];
  const killerIndex = suspectKeys.indexOf(primaryKillerId);
  const safeIndex = killerIndex >= 0 ? killerIndex % locations.length : 0;
  return locations[safeIndex]?.id || locations[0].id;
}

/**
 * Returns true if player's current location matches the primary suspect's location.
 */
export function isPlayerInSameRoomAsPrimarySuspect(
  selectedLocationId: string,
  currentCase: MysteryCase,
  locations: CrimeLocation[]
): boolean {
  if (!selectedLocationId || !currentCase || !locations || locations.length === 0) return false;
  const primaryLocId = getPrimarySuspectLocationId(currentCase, locations);
  return selectedLocationId === primaryLocId;
}
