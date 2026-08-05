export interface CustomNames {
  detective: string;
  victim: string;
  suspect1: string;
  suspect2: string;
  suspect3: string;
  suspect4: string;
  suspect5?: string;
  suspect6?: string;
  suspect7?: string;
  suspect8?: string;
  suspect9?: string;
  location: string;
}

export type SuspectId =
  | 'suspect1'
  | 'suspect2'
  | 'suspect3'
  | 'suspect4'
  | 'suspect5'
  | 'suspect6'
  | 'suspect7'
  | 'suspect8'
  | 'suspect9';

export interface DetectiveProfile {
  name: string;
  appearance: string;
  backstory: string;
  specialization: 'Forensic Analyst' | 'Micro-Expression Expert' | 'Rogue Interrogator' | 'Cyber Sleuth';
  badgeNumber: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  involvedNameKey: string; // e.g. "{VICTIM}", "{SUSPECT_1}"
  isKeyTurningPoint?: boolean;
}

export interface MotiveGuide {
  id: string;
  title: string;
  description: string;
  suspectKey: SuspectId;
  uncoverMethod: string;
  discovered: boolean;
}

export interface Suspect {
  id: SuspectId;
  defaultName: string;
  role: string; // e.g. "The Loyal Butler", "The Disinherited Daughter"
  relationToVictim: string;
  motive: string;
  alibi: string;
  secret: string;
  personality: string;
  avatarColor: string;
  avatarIcon: string;
  suspicionLevel: number; // 0 - 100
  isKiller: boolean;
  requiredEvidenceToExpose: string[]; // evidence IDs
  interrogationHistory: Array<{
    sender: 'player' | 'suspect' | 'system';
    text: string;
    timestamp: string;
  }>;
}

export interface Evidence {
  id: string;
  title: string;
  description: string;
  locationFound: string;
  iconName: string;
  discovered: boolean;
  isKeyEvidence: boolean;
  pointsToSuspectId?: SuspectId;
  detailedAnalysis?: string;
}

export interface CrimeLocation {
  id: string;
  name: string;
  description: string;
  imagePrompt?: string;
  clues: Array<{
    id: string;
    title: string;
    description: string;
    evidenceId?: string;
    x: number; // percentage position
    y: number; // percentage position
    inspected: boolean;
  }>;
}

export interface MysteryCase {
  id: string;
  title: string;
  settingDescription: string;
  timeOfDeath: string;
  causeOfDeath: string;
  synopsis: string;
  defaultNames: CustomNames;
  killerId: SuspectId;
  suspects: Record<string, Suspect>;
  evidenceList: Evidence[];
  locations: CrimeLocation[];
  solutionExplanation: string;
  timeline?: TimelineEvent[];
  motives?: MotiveGuide[];
}

export type GameStage = 'CHARACTER_CREATOR' | 'INVESTIGATING' | 'INTERROGATING' | 'EVIDENCE' | 'NOTEBOOK' | 'ACCUSATION' | 'CASE_CLOSED' | 'VIDEO_ANIMATOR';

export interface InterrogationRequest {
  caseId: string;
  suspectId: SuspectId;
  suspectRole: string;
  userQuestion: string;
  customNames: CustomNames;
  evidencePresentedIds?: string[];
  caseContext: {
    title: string;
    victim: string;
    location: string;
    timeOfDeath: string;
    causeOfDeath: string;
  };
}
