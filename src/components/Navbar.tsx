import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameStage, CustomNames, DetectiveProfile } from '../types';
import detectiveBadgeImg from '../assets/images/detective_badge_icon_1786542381714.jpg';
import { 
  UserCog, 
  Volume2, 
  VolumeX, 
  Gavel, 
  Menu, 
  Search, 
  Map, 
  Scan, 
  Radar, 
  Sparkles,
  CheckCircle2,
  Radio,
  Crosshair
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface NavbarProps {
  currentStage: GameStage;
  setStage: (stage: GameStage) => void;
  caseTitle: string;
  customNames: CustomNames;
  detectiveProfile?: DetectiveProfile;
  onOpenNameManager: () => void;
  onOpenCaseSelector: () => void;
  onShuffleCase: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  onOpenMobileSidebar: () => void;
  discoveredCount?: number;
  totalEvidence?: number;
  latestDiscoveredEvidence?: {
    title: string;
    id: string;
    timestamp: number;
  } | null;
  onOpenCrimeSceneMap?: () => void;
  isSameRoomAsPrimarySuspect?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStage,
  setStage,
  caseTitle,
  customNames,
  detectiveProfile,
  onOpenNameManager,
  onOpenCaseSelector,
  onShuffleCase,
  soundEnabled,
  setSoundEnabled,
  onOpenMobileSidebar,
  discoveredCount = 0,
  totalEvidence = 10,
  latestDiscoveredEvidence,
  onOpenCrimeSceneMap,
  isSameRoomAsPrimarySuspect = false,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedClueTitle, setScannedClueTitle] = useState<string | null>(null);
  
  const prevCountRef = useRef<number>(discoveredCount);
  const prevTimestampRef = useRef<number | undefined>(latestDiscoveredEvidence?.timestamp);
  const scanTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger scanner overlay on new evidence discovery
  useEffect(() => {
    const isNewCount = discoveredCount > prevCountRef.current && prevCountRef.current >= 0;
    const isNewEvidenceTimestamp = 
      latestDiscoveredEvidence?.timestamp !== undefined && 
      latestDiscoveredEvidence.timestamp !== prevTimestampRef.current;

    if (isNewCount || isNewEvidenceTimestamp) {
      if (latestDiscoveredEvidence?.title) {
        setScannedClueTitle(latestDiscoveredEvidence.title);
      } else {
        setScannedClueTitle(null);
      }

      setIsScanning(true);
      sounds.playEvidenceScan();

      if (scanTimerRef.current) {
        clearTimeout(scanTimerRef.current);
      }

      scanTimerRef.current = setTimeout(() => {
        setIsScanning(false);
      }, 3400);
    }

    prevCountRef.current = discoveredCount;
    prevTimestampRef.current = latestDiscoveredEvidence?.timestamp;

    return () => {
      if (scanTimerRef.current) {
        clearTimeout(scanTimerRef.current);
      }
    };
  }, [discoveredCount, latestDiscoveredEvidence]);

  // Manual tactile scan trigger for detective testing / re-inspection
  const handleManualScan = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playEvidenceScan();
    setIsScanning(true);
    if (latestDiscoveredEvidence?.title) {
      setScannedClueTitle(latestDiscoveredEvidence.title);
    } else {
      setScannedClueTitle(null);
    }

    if (scanTimerRef.current) {
      clearTimeout(scanTimerRef.current);
    }

    scanTimerRef.current = setTimeout(() => {
      setIsScanning(false);
    }, 3400);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    sounds.enabled = next;
    setSoundEnabled(next);
    if (next) sounds.playClick();
  };

  const percentage = totalEvidence > 0 ? Math.round((discoveredCount / totalEvidence) * 100) : 0;

  const getStatusLabel = (pct: number) => {
    if (pct === 100) return 'ALL EVIDENCE FOUND';
    if (pct >= 75) return 'KEY PROOF UNCOVERED';
    if (pct >= 40) return 'GATHERING LEADS';
    if (pct > 0) return 'INITIAL EVIDENCE';
    return 'NO EVIDENCE YET';
  };

  return (
    <header className="relative bg-slate-950/95 border-b border-amber-900/40 text-amber-50 sticky top-0 z-20 shadow-2xl backdrop-blur-md overflow-hidden">
      {/* Top Chromatic Accent Line */}
      <div className="h-[2.5px] w-full bg-gradient-to-r from-amber-500 via-rose-500 via-purple-500 via-cyan-400 to-emerald-400 shadow-[0_0_10px_rgba(244,63,94,0.6)]" />
      
      {/* ========================================================================= */}
      {/* SCANNER ANIMATION OVERLAY - Triggered upon Evidence Discovery            */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            key="navbar-scanner-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
          >
            {/* Holographic Forensic Scan Grid */}
            <div 
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, rgba(16, 185, 129, 0.3) 0px, rgba(16, 185, 129, 0.3) 1px, transparent 1px, transparent 4px),
                  repeating-linear-gradient(90deg, rgba(245, 158, 11, 0.2) 0px, rgba(245, 158, 11, 0.2) 1px, transparent 1px, transparent 40px)
                `
              }}
            />

            {/* Glowing Ambient Sweep Area */}
            <motion.div
              initial={{ x: '-30%' }}
              animate={{ x: '130%' }}
              transition={{
                repeat: 2,
                duration: 1.1,
                ease: 'easeInOut',
              }}
              className="absolute top-0 bottom-0 w-64 bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent blur-md"
            />

            {/* High-Intensity Laser Line Beam */}
            <motion.div
              initial={{ x: '-30%' }}
              animate={{ x: '130%' }}
              transition={{
                repeat: 2,
                duration: 1.1,
                ease: 'easeInOut',
              }}
              className="absolute top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-300 via-emerald-300 to-amber-300 shadow-[0_0_18px_4px_rgba(52,211,153,0.95),0_0_35px_rgba(245,158,11,0.8)]"
            />

            {/* Secondary Laser Line Beam (Offset) */}
            <motion.div
              initial={{ x: '-40%' }}
              animate={{ x: '120%' }}
              transition={{
                repeat: 2,
                duration: 1.1,
                delay: 0.08,
                ease: 'easeInOut',
              }}
              className="absolute top-0 bottom-0 w-0.5 bg-emerald-400 opacity-70 shadow-[0_0_10px_2px_rgba(52,211,153,0.8)]"
            />

            {/* Tactical Forensic HUD Notification Pill */}
            <motion.div
              initial={{ y: -30, opacity: 0, scale: 0.92 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -30, opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="absolute top-1 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-slate-950/95 border border-emerald-400/90 shadow-[0_0_30px_rgba(16,185,129,0.55)] flex items-center space-x-2.5 backdrop-blur-lg z-40"
            >
              <div className="relative flex items-center justify-center shrink-0">
                <Scan className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '3s' }} />
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
              </div>

              <div className="flex items-center space-x-2 font-mono text-[10px] sm:text-xs">
                <span className="text-emerald-400 font-extrabold tracking-wider uppercase flex items-center space-x-1">
                  <Radar className="w-3 h-3 text-emerald-400 inline animate-pulse" />
                  <span>CLUE SCANNER:</span>
                </span>
                <span className="text-amber-100 font-bold max-w-[170px] sm:max-w-[340px] truncate">
                  {scannedClueTitle ? `"${scannedClueTitle}"` : 'NEW CLUE LOGGED // CHAIN OF CUSTODY UPDATED'}
                </span>
                <span className="px-1.5 py-0.5 bg-emerald-950 border border-emerald-500/80 text-emerald-300 rounded font-extrabold text-[9px] shadow-[0_0_8px_rgba(16,185,129,0.4)]">
                  +1 EVIDENCE
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 relative z-10">
        
        {/* Left: Mobile Menu & Case Info */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-amber-900/50 text-amber-300 hover:bg-slate-800 transition-all active:scale-95 cursor-pointer"
            title="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Active Stage or Case Title */}
          <div className="hidden md:flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase">ACTIVE INVESTIGATION</span>
            <span className="text-xs font-serif font-bold text-amber-100 truncate max-w-[150px] lg:max-w-[200px]">
              {caseTitle}
            </span>
          </div>

          {/* Detective Badge & Specialization Visual Element */}
          {detectiveProfile && (
            <div 
              onClick={() => {
                sounds.playPaperFlip();
                setStage('CHARACTER_CREATOR');
              }}
              className="hidden lg:flex items-center space-x-2.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-slate-950 via-amber-950/80 to-slate-950 border border-amber-500/60 hover:border-amber-400 cursor-pointer transition-all shadow-xl hover:shadow-amber-500/30 group shrink-0 ring-1 ring-amber-500/20"
              title={`Detective Badge #${detectiveProfile.badgeNumber || 'DET-8804'} | Specialization: ${detectiveProfile.specialization || 'Forensic Analyst'} - Click to edit Detective Profile`}
            >
              <div className="relative flex items-center justify-center p-0.5 rounded-lg bg-gradient-to-br from-amber-500/30 via-amber-950 to-black border border-amber-400/60 shadow-md group-hover:border-amber-300 group-hover:scale-105 transition-all shrink-0 overflow-hidden">
                <img 
                  src={detectiveBadgeImg} 
                  alt="Detective Shield Badge" 
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 object-cover rounded-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                />
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400 shadow-sm"></span>
                </span>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center space-x-1 leading-none">
                  <span className="text-[9px] font-mono font-extrabold text-amber-400 uppercase tracking-widest drop-shadow-sm">
                    BADGE #{detectiveProfile.badgeNumber || 'DET-8804'}
                  </span>
                </div>
                <div className="text-[11px] font-serif font-bold text-amber-100 group-hover:text-amber-200 truncate max-w-[130px] xl:max-w-[160px] leading-tight">
                  {detectiveProfile.specialization || 'Forensic Analyst'}
                </div>
              </div>
            </div>
          )}

          {/* Detective & Victim & Location Header Badge */}
          <div 
            onClick={onOpenNameManager}
            className="hidden xl:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-amber-900/50 hover:border-amber-500/60 cursor-pointer transition-all shadow-inner text-xs group"
            title="Click to manage custom character names and location"
          >
            <div className="flex items-center space-x-1 text-amber-200 font-serif">
              <span className="text-[10px] font-mono text-amber-400 font-bold">DETS:</span>
              <span className="font-semibold text-amber-100">{customNames.detective}</span>
              <span className="text-amber-500 font-bold text-[10px]">&</span>
              <span className="font-semibold text-indigo-300">{customNames.detective2 || 'Nabhya Tyagi'}</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center space-x-1 text-rose-200 font-serif">
              <span className="text-[10px] font-mono text-rose-400 font-bold">VICTIM:</span>
              <span className="font-semibold text-rose-100">{customNames.victim}</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center space-x-1 text-emerald-200 font-serif">
              <span className="text-[10px] font-mono text-emerald-400 font-bold">LOCATION:</span>
              <span className="font-semibold text-emerald-100">{customNames.location || 'Cambridge School Noida'}</span>
            </div>
            <UserCog className="w-3.5 h-3.5 text-amber-500/80 group-hover:text-amber-400 ml-1" />
          </div>
        </div>

        {/* Center: Visual Evidence Discovery Progress Bar with Tactile Scanner State */}
        <div 
          onClick={() => {
            sounds.playPaperFlip();
            setStage('EVIDENCE');
          }}
          title="Click to view Evidence Locker"
          className={`flex-1 max-w-xs sm:max-w-md lg:max-w-lg bg-slate-900/90 hover:bg-slate-900 border p-2 sm:px-3.5 sm:py-1.5 rounded-xl cursor-pointer transition-all duration-300 shadow-inner group flex items-center space-x-2 sm:space-x-3 relative overflow-hidden ${
            isScanning 
              ? 'border-emerald-400 ring-2 ring-emerald-400/80 shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
              : 'border-amber-900/60 hover:border-amber-500/70'
          }`}
        >
          {/* Active Scanner Glow Pulse */}
          {isScanning && (
            <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none animate-pulse" />
          )}

          <div className={`p-1.5 rounded-lg border transition-colors shrink-0 ${
            isScanning
              ? 'bg-emerald-950 border-emerald-500 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.8)]'
              : 'bg-amber-950/80 border-amber-700/60 text-amber-400 group-hover:text-amber-300'
          }`}>
            {isScanning ? (
              <Scan className="w-4 h-4 text-emerald-300 animate-spin" style={{ animationDuration: '2.5s' }} />
            ) : (
              <Search className="w-4 h-4 animate-pulse" />
            )}
          </div>

          <div className="flex-1 min-w-0 space-y-1 relative z-10">
            <div className="flex items-center justify-between text-[11px] font-mono leading-none">
              <span className={`font-bold transition-colors flex items-center space-x-1 ${
                isScanning ? 'text-emerald-300' : 'text-amber-300/90 group-hover:text-amber-200'
              }`}>
                <span>EVIDENCE:</span>
                <span className="text-amber-100">{discoveredCount}/{totalEvidence}</span>
              </span>
              <div className="flex items-center space-x-1.5">
                <span className="hidden sm:inline text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  {getStatusLabel(percentage)}
                </span>
                
                {/* Manual Tactical Scanner Ping Trigger */}
                <button
                  type="button"
                  onClick={handleManualScan}
                  title="Run Evidence Radar Scan"
                  className="hidden md:flex items-center space-x-1 px-1.5 py-0.5 rounded bg-slate-950 border border-emerald-500/50 hover:border-emerald-400 text-[9px] font-mono text-emerald-400 hover:text-emerald-200 transition-all hover:scale-105 active:scale-95"
                >
                  <Radar className={`w-2.5 h-2.5 ${isScanning ? 'animate-spin text-emerald-300' : 'text-emerald-400'}`} />
                  <span>SCAN</span>
                </button>

                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  percentage === 100 
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' 
                    : percentage >= 50 
                      ? 'bg-amber-950 text-amber-300 border border-amber-700' 
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                }`}>
                  {percentage}%
                </span>
              </div>
            </div>

            {/* Visual Bar Track */}
            <div className="w-full h-2 bg-slate-950 rounded-full border border-slate-800/80 overflow-hidden relative p-0.5">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  isScanning
                    ? 'bg-gradient-to-r from-emerald-500 via-amber-300 to-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.9)]'
                    : 'bg-gradient-to-r from-amber-600 via-amber-400 to-emerald-400 shadow-[0_0_10px_rgba(245,158,11,0.6)]'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Map Overlay, Sound Toggle & Accuse Action */}
        <div className="flex items-center space-x-2 shrink-0">
          {onOpenCrimeSceneMap && (
            <button
              onClick={() => {
                sounds.playClick();
                onOpenCrimeSceneMap();
              }}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border-b-2 text-xs font-bold font-mono transition-all cursor-pointer ${
                isSameRoomAsPrimarySuspect
                  ? 'bg-rose-950/90 hover:bg-rose-900 border-rose-600/80 text-rose-200 shadow-[0_3px_0_0_#881337]'
                  : 'bg-amber-950/90 hover:bg-amber-900 border-amber-600/60 text-amber-300 hover:text-amber-100 shadow-[0_3px_0_0_#78350f]'
              }`}
              title={isSameRoomAsPrimarySuspect ? "⚠️ PRIMARY SUSPECT IN THIS ROOM! Click for Map" : "Open Crime Scene Map Overlay"}
            >
              <div className="relative flex items-center justify-center">
                <Map className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  {isSameRoomAsPrimarySuspect ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
                    </>
                  ) : (
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                  )}
                </span>
              </div>
              <span className="hidden sm:inline">Map Overlay</span>
              {isSameRoomAsPrimarySuspect && (
                <span className="hidden md:inline-block text-[9px] font-mono px-1 py-0.2 rounded bg-rose-900 text-rose-100 border border-rose-500 animate-pulse">
                  SUSPECT
                </span>
              )}
            </button>
          )}

          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border-b-2 transition-all cursor-pointer ${
              soundEnabled 
                ? 'bg-slate-900 border-amber-900/50 text-amber-300 hover:bg-slate-800 shadow-[0_3px_0_0_#451a03] active:translate-y-0.5 active:shadow-none' 
                : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-400 shadow-[0_2px_0_0_#0f172a] active:translate-y-0.5 active:shadow-none'
            }`}
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Accuse Button */}
          <button
            onClick={() => {
              sounds.playPaperFlip();
              setStage('ACCUSATION');
            }}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-b from-rose-600 to-red-800 hover:from-rose-500 hover:to-red-700 text-white text-xs font-bold font-mono shadow-[0_4px_0_0_#881337] active:shadow-none active:translate-y-1 border-b-4 border-rose-950 transition-all cursor-pointer"
          >
            <Gavel className="w-4 h-4" />
            <span className="hidden sm:inline">MAKE ACCUSATION</span>
          </button>
        </div>

      </div>
    </header>
  );
};
