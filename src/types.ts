export interface CustomNames {
  detective: string;
  detective2?: string;
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
  suspect10?: string;
  suspect11?: string;
  suspect12?: string;
  suspect13?: string;
  suspect14?: string;
  suspect15?: string;
  suspect16?: string;
  suspect17?: string;
  suspect18?: string;
  suspect19?: string;
  suspect20?: string;
  location: string;
}

export const ALL_SUSPECT_IDS = [
  'suspect1',
  'suspect2',
  'suspect3',
  'suspect4',
  'suspect5',
  'suspect6',
  'suspect7',
  'suspect8',
  'suspect9',
  'suspect10',
  'suspect11',
  'suspect12',
  'suspect13',
  'suspect14',
  'suspect15',
  'suspect16',
  'suspect17',
  'suspect18',
  'suspect19',
  'suspect20',
] as const;

export type SuspectId = typeof ALL_SUSPECT_IDS[number];

export interface DetectiveProfile {
  name: string;
  name2?: string; // Partner Detective Name
  appearance: string;
  backstory: string;
  specialization: 'Forensic Analyst' | 'Micro-Expression Expert' | 'Rogue Interrogator' | 'Cyber Sleuth';
  partnerSpecialization?: 'Forensic Analyst' | 'Micro-Expression Expert' | 'Rogue Interrogator' | 'Cyber Sleuth';
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
  avatarUrl?: string;
  age?: number;
  bio?: string;
  suspicionLevel: number; // 0 - 100
  isKiller: boolean;
  killerRole?: 'Primary Mastermind' | 'Co-Conspirator Accomplice';
  requiredEvidenceToExpose: string[]; // evidence IDs
  interrogationHistory: Array<{
    sender: 'player' | 'suspect' | 'system';
    text: string;
    timestamp: string;
  }>;
}

export interface EvidenceAnalysisLayer {
  layerNumber: number;
  toolName: string;
  finding: string;
  confidence: number;
  suspectInlinkedKey?: string;
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
  examinationLayers?: EvidenceAnalysisLayer[];
  currentExamLevel?: number;
  confidence?: number;
  source?: 'Forensic Lab' | 'Crime Scene' | 'Interrogation' | 'Digital Leak' | 'Witness Statement' | 'Surveillance Footage' | string;
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
  killerId: SuspectId; // Primary Killer / Mastermind
  killerId2?: SuspectId; // Secondary Co-Conspirator Killer
  suspects: Record<string, Suspect>;
  evidenceList: Evidence[];
  locations: CrimeLocation[];
  solutionExplanation: string;
  timeline?: TimelineEvent[];
  motives?: MotiveGuide[];
}

export type GameStage = 
  | 'CHARACTER_CREATOR' 
  | 'INVESTIGATING' 
  | 'INTERROGATING' 
  | 'EVIDENCE' 
  | 'NOTEBOOK' 
  | 'PHONE_LEAKS' 
  | 'CASE_BOARD' 
  | 'TIMELINE' 
  | 'CONTRADICTIONS' 
  | 'SUSPECT_DOSSIERS' 
  | 'FORENSIC_LAB' 
  | 'MOTIVE_MATRIX' 
  | 'SURVEILLANCE' 
  | 'CASE_ANALYTICS' 
  | 'ACCUSATION' 
  | 'CASE_CLOSED' 
  | 'VIDEO_ANIMATOR' 
  | 'DEVELOPER_CAST'
  // 20 Additional Detective Tabs
  | 'BALLISTICS_REPORT'
  | 'TOXICOLOGY_LOG'
  | 'FINGERPRINT_DATABASE'
  | 'AUTOPSY_ROOM'
  | 'WITNESS_STATEMENTS'
  | 'FINANCIAL_LEDGER'
  | 'DISPATCH_RADIO'
  | 'POLYGRAPH_TEST'
  | 'GEOLOCATION_MAP'
  | 'CRYPTANALYSIS_DECODER'
  | 'COLD_CASE_FILES'
  | 'ANONYMOUS_TIPS'
  | 'PSYCHOLOGICAL_PROFILE'
  | 'SEARCH_WARRANTS'
  | 'SEARCH_AND_RESCUE'
  | 'ALIBI_VERIFIER'
  | 'BLACKMAIL_VAULT'
  | 'DARK_WEB_FORUM'
  | 'RECONSTRUCTION_3D'
  | 'CHIEF_BRIEFING'
  // 5 New Advanced Detective Extensions
  | 'DNA_PROFILING'
  | 'TACTICAL_ENTRY'
  | 'VOICE_SPECTRUM'
  | 'HANDWRITING_ANALYSIS'
  | 'DRONE_RECON'
  // 20 Ultra Detective Operations
  | 'CELL_TOWER_TRIANGULATION'
  | 'K9_SEARCH_LOGS'
  | 'THERMAL_IMAGING'
  | 'CYBER_FORENSICS'
  | 'WEAPON_TRACEABILITY'
  | 'INTERPOL_RED_NOTICE'
  | 'UNDERCOVER_STING'
  | 'ARSON_INVESTIGATION'
  | 'BLOOD_SPATTER_ANALYSIS'
  | 'PASSENGER_MANIFEST'
  | 'EVIDENCE_LOCKER'
  | 'INFORMANT_REGISTRY'
  | 'CORONER_INQUEST'
  | 'SECURITY_LOGS'
  | 'FIBER_MICROSCOPY'
  | 'SATELLITE_IMAGERY'
  | 'SHADOW_BANKING'
  | 'CRIME_SCENE_SKETCH'
  | 'COURT_SUBPOENA'
  | 'PRESS_CONFERENCE';

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
