import React from 'react';
import { GameStage, CustomNames } from '../types';
import { 
  Search, 
  MessageSquareText, 
  Briefcase, 
  BookOpen, 
  Smartphone,
  GitFork,
  Clock,
  Flame,
  Users,
  Microscope,
  Zap,
  Camera,
  BarChart3,
  UserCog,
  ChevronLeft,
  ChevronRight,
  Gavel,
  X,
  FileSearch,
  Sparkles,
  Shuffle,
  RotateCcw,
  Volume2,
  VolumeX,
  Sliders,
  KeyRound,
  Crosshair,
  FlaskConical,
  Fingerprint,
  Activity,
  FileText,
  DollarSign,
  Radio,
  HeartPulse,
  MapPin,
  Key,
  Archive,
  ShieldAlert,
  Brain,
  FileCheck,
  Dog,
  Lock,
  Terminal,
  Box,
  Building,
  UserCheck,
  Dna,
  ShieldCheck,
  Mic,
  PenTool,
  Navigation,
  Signal,
  PawPrint,
  Cpu,
  Globe,
  EyeOff,
  Droplets,
  Plane,
  Layers,
  Satellite,
  Compass,
  Landmark,
  Ruler,
  Scale,
  Megaphone,
  Tv,
  Map
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface SidebarProps {
  currentStage: GameStage;
  setStage: (stage: GameStage) => void;
  evidenceCount: number;
  totalEvidence: number;
  isOpen: boolean;
  onToggleOpen: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onShuffleCase: () => void;
  onOpenNameManager: () => void;
  onOpenCaseSelector: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  isDeveloperUnlocked?: boolean;
  customNames: CustomNames;
  onOpenCrimeSceneMap?: () => void;
  isSameRoomAsPrimarySuspect?: boolean;
}

interface NavItem {
  id: GameStage;
  label: string;
  icon: React.ElementType;
  badge?: string;
  color: string;
}

interface NavCategory {
  title: string;
  badgeTheme: {
    text: string;
    bg: string;
    border: string;
    dot: string;
  };
  activeGradient: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentStage,
  setStage,
  evidenceCount,
  totalEvidence,
  isOpen,
  onToggleOpen,
  isMobileOpen,
  onCloseMobile,
  onShuffleCase,
  onOpenNameManager,
  onOpenCaseSelector,
  soundEnabled,
  setSoundEnabled,
  isDeveloperUnlocked = false,
  customNames,
  onOpenCrimeSceneMap,
  isSameRoomAsPrimarySuspect = false,
}) => {
  const handleNavClick = (stage: GameStage) => {
    sounds.playPaperFlip();
    setStage(stage);
    onCloseMobile();
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    sounds.enabled = next;
    setSoundEnabled(next);
    if (next) sounds.playClick();
  };

  const navCategories: NavCategory[] = [
    {
      title: 'PRIMARY INVESTIGATION',
      badgeTheme: {
        text: 'text-amber-400',
        bg: 'bg-amber-950/80',
        border: 'border-amber-500/50',
        dot: 'bg-amber-400',
      },
      activeGradient: 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 shadow-[0_0_16px_rgba(245,158,11,0.6)] font-extrabold',
      items: [
        { id: 'INVESTIGATING', label: 'Crime Scene', icon: Search, color: 'text-amber-400' },
        { id: 'INTERROGATING', label: 'Interrogate', icon: MessageSquareText, color: 'text-orange-400' },
        { id: 'EVIDENCE', label: 'Evidence & Clues', icon: Briefcase, badge: `${evidenceCount}/${totalEvidence}`, color: 'text-amber-300' },
        { id: 'SUSPECT_DOSSIERS', label: 'Suspect Dossiers', icon: Users, color: 'text-yellow-400' },
        { id: 'WITNESS_STATEMENTS', label: 'Witness Statements', icon: FileText, color: 'text-indigo-400' },
        { id: 'ANONYMOUS_TIPS', label: 'Anonymous Tips', icon: ShieldAlert, color: 'text-rose-400' },
      ],
    },
    {
      title: 'FORENSICS & LAB',
      badgeTheme: {
        text: 'text-purple-300',
        bg: 'bg-purple-950/80',
        border: 'border-purple-500/50',
        dot: 'bg-purple-400',
      },
      activeGradient: 'bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 text-white shadow-[0_0_16px_rgba(168,85,247,0.6)] font-extrabold',
      items: [
        { id: 'FORENSIC_LAB', label: 'Forensic Lab', icon: Microscope, color: 'text-purple-400' },
        { id: 'DNA_PROFILING', label: 'DNA & Genetic Profiling', icon: Dna, color: 'text-fuchsia-400' },
        { id: 'HANDWRITING_ANALYSIS', label: 'Handwriting & Ink', icon: PenTool, color: 'text-amber-400' },
        { id: 'BALLISTICS_REPORT', label: 'Ballistics & Arms', icon: Crosshair, color: 'text-rose-400' },
        { id: 'TOXICOLOGY_LOG', label: 'Toxicology Screen', icon: FlaskConical, color: 'text-violet-400' },
        { id: 'FINGERPRINT_DATABASE', label: 'Latent Fingerprints', icon: Fingerprint, color: 'text-emerald-400' },
        { id: 'AUTOPSY_ROOM', label: 'Coroner Autopsy', icon: Activity, color: 'text-rose-400' },
        { id: 'FIBER_MICROSCOPY', label: 'Microscopic Fiber Analysis', icon: Layers, color: 'text-purple-400' },
        { id: 'BLOOD_SPATTER_ANALYSIS', label: 'Blood Spatter Trajectory', icon: Droplets, color: 'text-rose-400' },
        { id: 'ARSON_INVESTIGATION', label: 'Arson Pattern Analysis', icon: Flame, color: 'text-orange-400' },
      ],
    },
    {
      title: 'INTELLIGENCE & BOARD',
      badgeTheme: {
        text: 'text-rose-300',
        bg: 'bg-rose-950/80',
        border: 'border-rose-500/50',
        dot: 'bg-rose-400',
      },
      activeGradient: 'bg-gradient-to-r from-rose-600 via-pink-500 to-rose-600 text-white shadow-[0_0_16px_rgba(244,63,94,0.6)] font-extrabold',
      items: [
        { id: 'NOTEBOOK', label: 'Deduction Notes', icon: BookOpen, color: 'text-amber-400' },
        { id: 'PHONE_LEAKS', label: 'Phone Leaks', icon: Smartphone, color: 'text-emerald-400' },
        { id: 'CASE_BOARD', label: 'Pinboard String Map', icon: GitFork, color: 'text-rose-400' },
        { id: 'TIMELINE', label: 'Incident Timeline', icon: Clock, color: 'text-cyan-400' },
        { id: 'CONTRADICTIONS', label: 'Contradictions', icon: Flame, color: 'text-rose-400' },
        { id: 'ALIBI_VERIFIER', label: 'Alibi Verification', icon: UserCheck, color: 'text-emerald-400' },
        { id: 'CRIME_SCENE_SKETCH', label: 'Crime Scene Blueprint', icon: Ruler, color: 'text-indigo-400' },
        { id: 'CORONER_INQUEST', label: 'Coroner Inquest Certificate', icon: FileText, color: 'text-amber-400' },
      ],
    },
    {
      title: 'AUDIT & TRACKING',
      badgeTheme: {
        text: 'text-cyan-300',
        bg: 'bg-cyan-950/80',
        border: 'border-cyan-500/50',
        dot: 'bg-cyan-400',
      },
      activeGradient: 'bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 text-slate-950 shadow-[0_0_16px_rgba(6,182,212,0.6)] font-extrabold',
      items: [
        { id: 'SURVEILLANCE', label: 'CCTV Surveillance', icon: Camera, color: 'text-emerald-400' },
        { id: 'DRONE_RECON', label: 'Drone Aerial Recon', icon: Navigation, color: 'text-teal-400' },
        { id: 'VOICE_SPECTRUM', label: 'Voice Wiretap & Spectrum', icon: Mic, color: 'text-indigo-400' },
        { id: 'MOTIVE_MATRIX', label: 'Motive Matrix', icon: Zap, color: 'text-amber-400' },
        { id: 'CASE_ANALYTICS', label: 'Case Audit & Metrics', icon: BarChart3, color: 'text-cyan-400' },
        { id: 'FINANCIAL_LEDGER', label: 'Financial Ledger', icon: DollarSign, color: 'text-emerald-400' },
        { id: 'GEOLOCATION_MAP', label: 'Cell GPS Tracking', icon: MapPin, color: 'text-rose-400' },
        { id: 'DISPATCH_RADIO', label: 'Police Dispatch Radio', icon: Radio, color: 'text-amber-400' },
        { id: 'CELL_TOWER_TRIANGULATION', label: 'Cell Tower Triangulation', icon: Signal, color: 'text-emerald-400' },
        { id: 'THERMAL_IMAGING', label: 'Infrared Thermal Sweep', icon: Compass, color: 'text-orange-400' },
        { id: 'PASSENGER_MANIFEST', label: 'Transit Manifest Logs', icon: Plane, color: 'text-indigo-400' },
        { id: 'SATELLITE_IMAGERY', label: 'Satellite Recon', icon: Satellite, color: 'text-cyan-400' },
        { id: 'SECURITY_LOGS', label: 'Biometric Access Logs', icon: Fingerprint, color: 'text-purple-400' },
      ],
    },
    {
      title: 'TACTICAL & DEEP SEARCH',
      badgeTheme: {
        text: 'text-blue-300',
        bg: 'bg-blue-950/80',
        border: 'border-blue-500/50',
        dot: 'bg-blue-400',
      },
      activeGradient: 'bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-600 text-white shadow-[0_0_16px_rgba(59,130,246,0.6)] font-extrabold',
      items: [
        { id: 'TACTICAL_ENTRY', label: 'Tactical SWAT Breach', icon: ShieldCheck, color: 'text-rose-400' },
        { id: 'POLYGRAPH_TEST', label: 'Polygraph Detector', icon: HeartPulse, color: 'text-rose-400' },
        { id: 'CRYPTANALYSIS_DECODER', label: 'Cipher Decoder', icon: Key, color: 'text-amber-400' },
        { id: 'COLD_CASE_FILES', label: 'Cold Case Archives', icon: Archive, color: 'text-yellow-400' },
        { id: 'PSYCHOLOGICAL_PROFILE', label: 'Psych Profile', icon: Brain, color: 'text-purple-400' },
        { id: 'SEARCH_WARRANTS', label: 'Search Warrants', icon: FileCheck, color: 'text-emerald-400' },
        { id: 'SEARCH_AND_RESCUE', label: 'K9 Search Unit', icon: Dog, color: 'text-emerald-400' },
        { id: 'BLACKMAIL_VAULT', label: 'Blackmail Safe Vault', icon: Lock, color: 'text-rose-400' },
        { id: 'DARK_WEB_FORUM', label: 'Dark Web IRC', icon: Terminal, color: 'text-cyan-400' },
        { id: 'RECONSTRUCTION_3D', label: '3D Scene Model', icon: Box, color: 'text-indigo-400' },
        { id: 'CHIEF_BRIEFING', label: 'Police Chief Briefing', icon: Building, color: 'text-amber-400' },
        { id: 'K9_SEARCH_LOGS', label: 'Cadaver K9 Search Sweep', icon: PawPrint, color: 'text-orange-400' },
        { id: 'CYBER_FORENSICS', label: 'Cyber Hex Dump Analysis', icon: Cpu, color: 'text-cyan-400' },
        { id: 'WEAPON_TRACEABILITY', label: 'Firearm Serial Registry', icon: Crosshair, color: 'text-rose-400' },
        { id: 'INTERPOL_RED_NOTICE', label: 'Interpol Red Notice', icon: Globe, color: 'text-rose-400' },
        { id: 'UNDERCOVER_STING', label: 'Undercover Sting Wire', icon: EyeOff, color: 'text-amber-400' },
        { id: 'EVIDENCE_LOCKER', label: 'Vault Chain of Custody', icon: Lock, color: 'text-amber-400' },
        { id: 'INFORMANT_REGISTRY', label: 'Confidential Informants', icon: Users, color: 'text-purple-400' },
        { id: 'SHADOW_BANKING', label: 'Offshore Shell Accounts', icon: Landmark, color: 'text-emerald-400' },
        { id: 'COURT_SUBPOENA', label: 'Judicial SubPOENAs', icon: Scale, color: 'text-amber-400' },
        { id: 'PRESS_CONFERENCE', label: 'Press Conference Room', icon: Megaphone, color: 'text-pink-400' },
      ],
    },
    {
      title: 'SETTINGS & CAST',
      badgeTheme: {
        text: 'text-amber-300',
        bg: 'bg-amber-950/80',
        border: 'border-amber-500/50',
        dot: 'bg-amber-400',
      },
      activeGradient: 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-slate-950 shadow-[0_0_16px_rgba(251,191,36,0.6)] font-extrabold',
      items: [
        { 
          id: 'DEVELOPER_CAST', 
          label: isDeveloperUnlocked ? '⚡ Developer Cast (Unlocked)' : '⚡ Developer Cast (Code 888513)', 
          icon: KeyRound, 
          badge: isDeveloperUnlocked ? '888513' : 'LOCK', 
          color: isDeveloperUnlocked ? 'text-amber-300 font-bold' : 'text-amber-400' 
        },
      ],
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-950 border-r border-amber-900/40 text-amber-50 select-none shadow-2xl">
      {/* Sidebar Header */}
      <div className="p-3.5 border-b border-slate-900 flex flex-col space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-600/50 flex items-center justify-center text-amber-400 font-serif text-lg shadow-inner shrink-0">
              🕵️‍♂️
            </div>
            {isOpen && (
              <div className="truncate">
                <h2 className="text-xs font-mono font-bold tracking-widest text-amber-500 uppercase truncate">
                  CASE TABS
                </h2>
                <p className="text-[10px] font-mono text-slate-400">Noir Detective Desk</p>
              </div>
            )}
          </div>

          {/* Toggle Collapse Button on Desktop */}
          <button
            onClick={onToggleOpen}
            className="hidden md:flex p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-300 border border-slate-800 transition-all"
            title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-amber-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Detective & Victim Names Squad Badge */}
        {isOpen && (
          <div 
            onClick={onOpenNameManager}
            className="p-2.5 rounded-xl bg-slate-900/90 border border-amber-900/50 hover:border-amber-500/70 transition-all cursor-pointer group shadow-inner space-y-1.5"
            title="Click to customize Detective & Victim names"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono font-bold text-amber-500 uppercase tracking-wider flex items-center space-x-1">
                <span>DETECTIVE & VICTIM</span>
              </span>
              <UserCog className="w-3 h-3 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-[11px] font-serif space-y-1">
              <div className="flex items-center space-x-1.5 text-amber-100 truncate">
                <span className="text-amber-400 text-[10px] font-mono font-bold shrink-0">DET 1:</span>
                <span className="font-bold truncate">{customNames.detective}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-indigo-200 truncate">
                <span className="text-indigo-400 text-[10px] font-mono font-bold shrink-0">DET 2:</span>
                <span className="font-bold truncate">{customNames.detective2 || 'Nabhya Tyagi'}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-rose-200 truncate">
                <span className="text-rose-400 text-[10px] font-mono text-bold shrink-0">VICTIM:</span>
                <span className="font-bold truncate">{customNames.victim}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-emerald-200 truncate pt-0.5 border-t border-slate-800/80">
                <span className="text-emerald-400 text-[10px] font-mono font-bold shrink-0">LOCATION:</span>
                <span className="font-bold truncate">{customNames.location || 'Cambridge School Noida'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Links Scrollable */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6 custom-scrollbar">
        {navCategories.map((cat, idx) => (
          <div key={idx} className="space-y-1.5">
            {isOpen && (
              <div className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className={`w-2 h-2 rounded-full ${cat.badgeTheme.dot} shadow-[0_0_6px_currentColor] animate-pulse`} />
                  <span className={`text-[10px] font-mono font-extrabold uppercase tracking-wider ${cat.badgeTheme.text}`}>
                    {cat.title}
                  </span>
                </div>
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${cat.badgeTheme.bg} ${cat.badgeTheme.border} ${cat.badgeTheme.text}`}>
                  {cat.items.length}
                </span>
              </div>
            )}
            <div className="space-y-1">
              {cat.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentStage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    title={!isOpen ? item.label : undefined}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all active:translate-y-0.5 active:shadow-none cursor-pointer focus:outline-none ${
                      isActive
                        ? `${cat.activeGradient} border-b-2 border-slate-900/40 ring-1 ring-white/20`
                        : 'text-slate-300 hover:text-white hover:bg-slate-900/90 border-b-2 border-transparent hover:border-slate-800 hover:shadow-[0_2px_8px_rgba(0,0,0,0.4)]'
                    }`}
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <Icon className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? (cat.activeGradient.includes('text-slate-950') ? 'text-slate-950' : 'text-white') : item.color}`} />
                      {isOpen && <span className="truncate">{item.label}</span>}
                    </div>

                    {isOpen && item.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        isActive 
                          ? (cat.activeGradient.includes('text-slate-950') ? 'bg-slate-950 text-amber-300' : 'bg-slate-950/80 text-white') 
                          : 'bg-slate-900 text-amber-400 border border-slate-800 shadow-sm'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {/* Case Action Utilities Section */}
        <div className="pt-3 border-t border-slate-900 space-y-2">
          {isOpen && (
            <div className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-950/60 via-purple-950/60 to-cyan-950/60 border border-amber-500/30 flex items-center justify-between">
              <span className="text-[10px] font-mono font-extrabold text-amber-400 uppercase tracking-widest flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b] animate-pulse" />
                <span>CASE UTILITIES & ACTIONS</span>
              </span>
              <Sliders className="w-3 h-3 text-amber-400" />
            </div>
          )}

          <div className="space-y-1.5">
            {/* Crime Scene Map Button */}
            {onOpenCrimeSceneMap && (
              <button
                onClick={() => {
                  onOpenCrimeSceneMap();
                  onCloseMobile();
                }}
                title={!isOpen ? (isSameRoomAsPrimarySuspect ? "⚠️ Primary Suspect In Room! Click for Map" : "Crime Scene Map Overlay") : undefined}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 shadow-lg group cursor-pointer focus:outline-none ${
                  isSameRoomAsPrimarySuspect
                    ? 'bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 hover:from-rose-900 hover:to-rose-800 text-rose-100 border border-rose-500 shadow-rose-950/60'
                    : 'bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-950 hover:from-emerald-900 hover:to-teal-900 text-emerald-200 border border-emerald-500/50 hover:border-emerald-400 shadow-emerald-950/50'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <div className="relative flex items-center justify-center shrink-0">
                    <Map className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      {isSameRoomAsPrimarySuspect ? (
                        <>
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-[0_0_6px_#f43f5e]" />
                        </>
                      ) : (
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                      )}
                    </span>
                  </div>
                  {isOpen && <span className="truncate font-semibold text-emerald-100">Crime Scene Map</span>}
                </div>
                {isOpen && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold flex items-center space-x-1 ${
                    isSameRoomAsPrimarySuspect ? 'bg-rose-900 text-rose-100 border border-rose-500 animate-pulse' : 'bg-emerald-900/80 text-emerald-300 border border-emerald-600/60'
                  }`}>
                    {isSameRoomAsPrimarySuspect ? 'SUSPECT HERE!' : 'Tactical Map'}
                  </span>
                )}
              </button>
            )}

            {/* Shuffle Killer Button */}
            <button
              onClick={() => {
                onShuffleCase();
                onCloseMobile();
              }}
              title={!isOpen ? "Shuffle Killer & Replay Plot" : undefined}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-950 hover:from-indigo-900 hover:to-purple-900 text-indigo-100 border border-indigo-500/50 hover:border-indigo-400 transition-all active:scale-95 shadow-md group cursor-pointer focus:outline-none"
            >
              <div className="flex items-center space-x-3 truncate">
                <Shuffle className="w-4 h-4 shrink-0 text-indigo-400 group-hover:rotate-180 transition-transform duration-500" />
                {isOpen && <span className="truncate font-semibold">Shuffle Killer Plot</span>}
              </div>
              {isOpen && (
                <span className="text-[10px] font-mono text-indigo-300 bg-indigo-900/80 border border-indigo-500/40 px-1.5 py-0.5 rounded font-bold">
                  Re-roll
                </span>
              )}
            </button>

            {/* Change Case Scenario Button */}
            <button
              onClick={() => {
                onOpenCaseSelector();
                onCloseMobile();
              }}
              title={!isOpen ? "Change Case Scenario" : undefined}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-850 text-cyan-200 border border-cyan-800/40 hover:border-cyan-500/60 transition-all active:scale-95 shadow-sm cursor-pointer focus:outline-none"
            >
              <div className="flex items-center space-x-3 truncate">
                <RotateCcw className="w-4 h-4 shrink-0 text-cyan-400" />
                {isOpen && <span className="truncate">Change Case Scenario</span>}
              </div>
              {isOpen && (
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-800 px-1.5 py-0.5 rounded">
                  Cases
                </span>
              )}
            </button>

            {/* Sound Audio Toggle Button */}
            <button
              onClick={toggleSound}
              title={!isOpen ? (soundEnabled ? "Mute SFX Audio" : "Enable SFX Audio") : undefined}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-850 text-amber-200 border border-amber-900/40 hover:border-amber-500/60 transition-all active:scale-95 shadow-sm cursor-pointer focus:outline-none"
            >
              <div className="flex items-center space-x-3 truncate">
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 shrink-0 text-amber-400 animate-pulse" />
                ) : (
                  <VolumeX className="w-4 h-4 shrink-0 text-slate-500" />
                )}
                {isOpen && <span>SFX Sound Effects</span>}
              </div>
              {isOpen && (
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  soundEnabled ? 'bg-amber-950 text-amber-400 border border-amber-500/60 shadow-[0_0_8px_rgba(245,158,11,0.3)]' : 'bg-slate-800 text-slate-500'
                }`}>
                  {soundEnabled ? 'ON' : 'MUTED'}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Accuse Action at Sidebar Bottom */}
      <div className="p-3 border-t border-slate-900 bg-slate-950/80">
        <button
          onClick={() => handleNavClick('ACCUSATION')}
          className={`w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-700 to-red-800 hover:from-rose-600 hover:to-red-700 text-white text-xs font-bold shadow-lg shadow-rose-900/40 border border-rose-500/50 transition-all active:scale-95 cursor-pointer focus:outline-none focus:ring-1 focus:ring-rose-500/50 ${
            !isOpen && 'px-0'
          }`}
          title="Make Formal Accusation"
        >
          <Gavel className="w-4 h-4 shrink-0" />
          {isOpen && <span>Make Final Accusation</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block sticky top-0 h-screen transition-all duration-300 z-30 shrink-0 ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[80vw] h-full z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
