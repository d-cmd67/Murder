import React, { useState } from 'react';
import { CrimeLocation, CustomNames, Evidence, MysteryCase } from '../types';
import { replaceNames } from '../utils/nameFormatter';
import { getPrimarySuspectLocationId } from '../utils/suspectLocationUtils';
import { Search, Eye, Sparkles, CheckCircle2, Compass, Camera, Zap, Shield, Flame, Activity, Map, LayoutGrid } from 'lucide-react';
import { sounds } from '../utils/sound';
import cambridgeSchoolBg from '../assets/images/cambridge_school_scene_1786266051111.jpg';
import classroomBg from '../assets/images/classroom_9a_bg_1786266588001.jpg';
import computerCornerBg from '../assets/images/computer_corner_bg_1786266609709.jpg';
import observatoryBg from '../assets/images/observatory_deck_bg_1786266622901.jpg';

interface RoomAtmosphere {
  bgImage: string;
  gradientOverlay: string;
  badgeLabel: string;
  badgeColor: string;
}

const getRoomAtmosphere = (locationId: string, locationName: string): RoomAtmosphere => {
  const lowerId = locationId.toLowerCase();
  const lowerName = locationName.toLowerCase();

  if (lowerId.includes('lab') || lowerName.includes('lab') || lowerId.includes('loc_lab_2')) {
    return {
      bgImage: cambridgeSchoolBg,
      gradientOverlay: 'from-slate-950 via-emerald-950/40 to-slate-950/80',
      badgeLabel: '🧪 SECTOR: SCIENCE LAB 2',
      badgeColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-600/50',
    };
  }

  if (lowerId.includes('classroom') || lowerName.includes('classroom') || lowerId.includes('loc_classroom_9a')) {
    return {
      bgImage: classroomBg,
      gradientOverlay: 'from-slate-950 via-amber-950/40 to-slate-950/80',
      badgeLabel: '🏫 SECTOR: CLASS 9A CLASSROOM',
      badgeColor: 'text-amber-400 bg-amber-950/80 border-amber-600/50',
    };
  }

  if (lowerId.includes('computer') || lowerId.includes('robotics') || lowerName.includes('computer') || lowerName.includes('robotics') || lowerId.includes('loc_computer_corner')) {
    return {
      bgImage: computerCornerBg,
      gradientOverlay: 'from-slate-950 via-cyan-950/50 to-slate-950/80',
      badgeLabel: '💻 SECTOR: ROBOTICS & IT CORNER',
      badgeColor: 'text-cyan-400 bg-cyan-950/80 border-cyan-600/50',
    };
  }

  if (lowerId.includes('observatory') || lowerName.includes('observatory') || lowerId.includes('loc_observatory')) {
    return {
      bgImage: observatoryBg,
      gradientOverlay: 'from-slate-950 via-indigo-950/50 to-slate-950/80',
      badgeLabel: '🔭 SECTOR: TELESCOPE OBSERVATORY',
      badgeColor: 'text-indigo-400 bg-indigo-950/80 border-indigo-600/50',
    };
  }

  if (lowerId.includes('study') || lowerName.includes('study')) {
    return {
      bgImage: observatoryBg,
      gradientOverlay: 'from-slate-950 via-amber-950/60 to-slate-950/90',
      badgeLabel: '📜 SECTOR: EXECUTIVE STUDY',
      badgeColor: 'text-amber-300 bg-amber-950/80 border-amber-600/50',
    };
  }

  if (lowerId.includes('tech') || lowerId.includes('hub') || lowerName.includes('tech')) {
    return {
      bgImage: computerCornerBg,
      gradientOverlay: 'from-slate-950 via-purple-950/50 to-slate-950/80',
      badgeLabel: '⚡ SECTOR: POWER & SERVER HUB',
      badgeColor: 'text-purple-400 bg-purple-950/80 border-purple-600/50',
    };
  }

  // Default fallback room
  return {
    bgImage: cambridgeSchoolBg,
    gradientOverlay: 'from-slate-950 via-slate-900/50 to-slate-950/80',
    badgeLabel: `📍 SECTOR: ${locationName.toUpperCase()}`,
    badgeColor: 'text-amber-400 bg-slate-900/90 border-amber-600/50',
  };
};

interface CrimeSceneViewProps {
  locations: CrimeLocation[];
  evidenceList: Evidence[];
  customNames: CustomNames;
  onInspectClue: (locationId: string, clueId: string, evidenceId?: string) => void;
  selectedLocationId?: string;
  onSelectLocation?: (locId: string) => void;
  onOpenMapModal?: () => void;
  currentCase?: MysteryCase;
}

export const CrimeSceneView: React.FC<CrimeSceneViewProps> = ({
  locations,
  evidenceList,
  customNames,
  onInspectClue,
  selectedLocationId,
  onSelectLocation,
  onOpenMapModal,
  currentCase,
}) => {
  const [internalActiveLocationId, setInternalActiveLocationId] = useState<string>(
    selectedLocationId || locations[0]?.id || 'loc_dining'
  );

  const activeLocationId = selectedLocationId || internalActiveLocationId;

  const primarySuspectLocationId = currentCase ? getPrimarySuspectLocationId(currentCase, locations) : '';
  const isSameRoomAsPrimarySuspect = activeLocationId && primarySuspectLocationId ? activeLocationId === primarySuspectLocationId : false;

  const setActiveLocationId = (locId: string) => {
    setInternalActiveLocationId(locId);
    if (onSelectLocation) {
      onSelectLocation(locId);
    }
  };
  const [viewType, setViewType] = useState<'scene' | 'floorplan'>('scene');
  const [visionMode, setVisionMode] = useState<'standard' | 'uv' | 'thermal'>('standard');
  const [showSnapshotEffect, setShowSnapshotEffect] = useState(false);
  const [selectedClue, setSelectedClue] = useState<{
    title: string;
    description: string;
    evidenceFound?: Evidence;
    x: number;
    y: number;
    markerNum: number;
  } | null>(null);

  const currentLocation = locations.find((l) => l.id === activeLocationId) || locations[0];

  const [examinedFurther, setExaminedFurther] = useState(false);
  const [evidenceCollected, setEvidenceCollected] = useState(false);

  const handleClueClick = (clue: typeof currentLocation.clues[0], index: number) => {
    sounds.playClueFound();
    onInspectClue(currentLocation.id, clue.id, clue.evidenceId);
    setExaminedFurther(false);
    setEvidenceCollected(false);

    let foundEv: Evidence | undefined = undefined;
    if (clue.evidenceId) {
      foundEv = evidenceList.find((e) => e.id === clue.evidenceId);
    }

    setSelectedClue({
      title: replaceNames(clue.title, customNames),
      description: replaceNames(clue.description, customNames),
      evidenceFound: foundEv,
      x: clue.x,
      y: clue.y,
      markerNum: index + 1,
    });
  };

  const handleTakeSnapshot = () => {
    sounds.playCameraShutter();
    setShowSnapshotEffect(true);
    setTimeout(() => setShowSnapshotEffect(false), 500);
  };

  const handleToggleVision = (mode: 'standard' | 'uv' | 'thermal') => {
    sounds.playUVToggle();
    setVisionMode(mode);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-slate-100 animate-fadeIn">
      
      {/* Header Info & View Type Toggles */}
      <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 mb-1">
            <Compass className="w-4 h-4 text-amber-500" />
            <span>CRIME SCENE SECTOR SCANNER &bull; BLUEPRINT FLOOR PLAN</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-amber-100">
            {replaceNames(currentLocation.name, customNames)}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            {replaceNames(currentLocation.description, customNames)}
          </p>
        </div>

        {/* Tactile Detective Push-Button Control Console */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-950 p-3 rounded-2xl border-2 border-amber-600/50 shadow-xl">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
              TACTILE DESK CONTROLS:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Quick Inspect Next Clue Push Button */}
            <button
              onClick={() => {
                const uninspectedIdx = currentLocation.clues.findIndex((c) => !c.inspected);
                const targetIdx = uninspectedIdx !== -1 ? uninspectedIdx : 0;
                const clueToInspect = currentLocation.clues[targetIdx];
                if (clueToInspect) {
                  handleClueClick(clueToInspect, targetIdx);
                }
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-bold font-mono flex items-center space-x-2 bg-gradient-to-b from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 border-b-4 border-amber-900 shadow-[0_4px_0_0_#78350f] hover:shadow-[0_2px_0_0_#78350f] active:shadow-none active:translate-y-1 transition-all cursor-pointer"
              title="Push to automatically jump to and inspect the next clue in this sector"
            >
              <Sparkles className="w-4 h-4 text-slate-950 animate-bounce" />
              <span>PUSH: INSPECT NEXT CLUE</span>
            </button>

            {/* View Switcher: Interactive Hotspot View vs Visual Floor Plan */}
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 space-x-1 shadow-inner">
              <button
                onClick={() => {
                  sounds.playClick();
                  setViewType('scene');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-all cursor-pointer ${
                  viewType === 'scene'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_2px_0_0_#92400e] border-b-2 border-amber-800'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>3D Hotspot View</span>
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setViewType('floorplan');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-all cursor-pointer ${
                  viewType === 'floorplan'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_2px_0_0_#92400e] border-b-2 border-amber-800'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>Blueprint Floor Plan</span>
              </button>
            </div>

            {/* Vision Modes Push Buttons */}
            {viewType === 'scene' && (
              <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 space-x-1 shadow-inner">
                <button
                  onClick={() => handleToggleVision('standard')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1 transition-all cursor-pointer ${
                    visionMode === 'standard'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_2px_0_0_#92400e] border-b-2 border-amber-800'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Optic</span>
                </button>
                <button
                  onClick={() => handleToggleVision('uv')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1 transition-all cursor-pointer ${
                    visionMode === 'uv'
                      ? 'bg-purple-600 text-purple-100 font-bold shadow-[0_2px_0_0_#581c87] border-b-2 border-purple-900'
                      : 'text-purple-400 hover:text-purple-200'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>UV Luminol</span>
                </button>
                <button
                  onClick={() => handleToggleVision('thermal')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1 transition-all cursor-pointer ${
                    visionMode === 'thermal'
                      ? 'bg-rose-600 text-rose-100 font-bold shadow-[0_2px_0_0_#881337] border-b-2 border-rose-900'
                      : 'text-rose-400 hover:text-rose-200'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Thermal</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sector Fast Travel Push Buttons Deck */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mr-1">SECTORS:</span>
          {onOpenMapModal && (
            <button
              onClick={() => {
                sounds.playClick();
                onOpenMapModal();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono flex items-center space-x-2 border-b-2 shadow-[0_3px_0_0_#78350f] active:shadow-none active:translate-y-0.5 transition-all cursor-pointer ${
                isSameRoomAsPrimarySuspect
                  ? 'bg-rose-950/90 hover:bg-rose-900 text-rose-200 border-rose-600/80 shadow-[0_3px_0_0_#881337]'
                  : 'bg-amber-950/90 hover:bg-amber-900 text-amber-300 hover:text-amber-100 border-amber-600/60 shadow-[0_3px_0_0_#78350f]'
              }`}
              title={isSameRoomAsPrimarySuspect ? "⚠️ PRIMARY SUSPECT IS IN THIS ROOM! Click for Map" : "Open Crime Scene Map Overlay"}
            >
              <div className="relative flex items-center justify-center shrink-0">
                <Map className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
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
              <span>MAP OVERLAY</span>
              {isSameRoomAsPrimarySuspect && (
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-900 text-rose-100 border border-rose-500 animate-pulse ml-0.5">
                  SUSPECT
                </span>
              )}
            </button>
          )}

          {locations.map((loc) => {
            const inspectedCount = loc.clues.filter((c) => c.inspected).length;
            const totalCount = loc.clues.length;
            const isActive = loc.id === activeLocationId;
            const isPrimarySuspectSector = primarySuspectLocationId === loc.id;

            return (
              <button
                key={loc.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveLocationId(loc.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono flex items-center space-x-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 shadow-[0_3px_0_0_#78350f] border-b-2 border-amber-800'
                    : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-amber-200 border-b-2 border-slate-900 shadow-[0_2px_0_0_#0f172a] active:translate-y-0.5 active:shadow-none'
                }`}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  {isPrimarySuspectSector ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-[0_0_6px_#f43f5e]" />
                    </>
                  ) : (
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_4px_#34d399]" />
                  )}
                </span>
                <span>{replaceNames(loc.name, customNames)}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive ? 'bg-slate-950 text-amber-300' : 'bg-slate-900 text-slate-400'
                }`}>
                  {inspectedCount}/{totalCount}
                </span>
                {isPrimarySuspectSector && (
                  <span className="text-[9px] font-mono text-rose-400 font-extrabold ml-0.5">
                    [SUSPECT]
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Scene or Floor Plan Canvas */}
      {viewType === 'scene' ? (
        <div className={`relative w-full h-[460px] sm:h-[520px] rounded-2xl overflow-hidden border-2 shadow-2xl flex flex-col justify-between p-6 transition-all duration-500 ${
          visionMode === 'uv'
            ? 'border-purple-600/60 bg-gradient-to-br from-slate-950 via-purple-950/60 to-indigo-950'
            : visionMode === 'thermal'
            ? 'border-rose-600/60 bg-gradient-to-br from-slate-950 via-rose-950/60 to-amber-950'
            : 'border-amber-900/40 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40'
        }`}>
          
          {/* Flash Photo Effect Overlay */}
          {showSnapshotEffect && (
            <div className="absolute inset-0 z-50 bg-white animate-fadeOut pointer-events-none" />
          )}

          {/* Ambient Grid Overlay for Realistic Scanning */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full border text-xs font-mono backdrop-blur-md flex items-center space-x-1.5 ${
                visionMode === 'uv'
                  ? 'bg-purple-950/80 border-purple-500 text-purple-200'
                  : visionMode === 'thermal'
                  ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                  : 'bg-slate-900/80 border-slate-700 text-amber-300'
              }`}>
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>
                  {visionMode === 'uv'
                    ? 'LUMINOL UV SPECTRUM ACTIVE'
                    : visionMode === 'thermal'
                    ? 'THERMAL INFRARED ACTIVE'
                    : 'OPTICAL MAGNIFICATION ACTIVE'}
                </span>
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleTakeSnapshot}
                className="px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 hover:border-amber-500 text-slate-300 hover:text-amber-200 text-xs font-mono flex items-center space-x-1.5 transition-all active:scale-95 shadow"
              >
                <Camera className="w-3.5 h-3.5 text-amber-400" />
                <span>Snapshot</span>
              </button>
              <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                Sector Coordinates: [X: 42.8, Y: 18.4]
              </span>
            </div>
          </div>

          {/* Hot Spots / Evidence Markers */}
          {(() => {
            const roomAtmo = getRoomAtmosphere(currentLocation.id, replaceNames(currentLocation.name, customNames));
            return (
              <div className="relative z-10 flex-1 w-full my-4 rounded-xl border border-dashed border-slate-700/60 bg-slate-950/60 backdrop-blur-sm relative overflow-hidden group min-h-[380px] sm:min-h-[460px]">
                
                {/* Room Sector Floating Badge */}
                <div className="absolute top-3 left-3 z-20 pointer-events-none">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold border shadow-lg backdrop-blur-md tracking-wider flex items-center space-x-1 ${roomAtmo.badgeColor}`}>
                    <span>{roomAtmo.badgeLabel}</span>
                  </span>
                </div>

                {/* Atmospheric Scene Background for Selected Room */}
                <img 
                  key={currentLocation.id}
                  src={roomAtmo.bgImage} 
                  alt={replaceNames(currentLocation.name, customNames)} 
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none ${
                    visionMode === 'uv'
                      ? 'opacity-35 mix-blend-color-dodge filter hue-rotate-90 saturate-200'
                      : visionMode === 'thermal'
                      ? 'opacity-40 mix-blend-hard-light filter contrast-200 saturate-150'
                      : 'opacity-60 mix-blend-luminosity group-hover:opacity-75'
                  }`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${roomAtmo.gradientOverlay} pointer-events-none`} />

                {currentLocation.clues.map((clue, idx) => {
                  return (
                    <button
                      key={clue.id}
                      onClick={() => handleClueClick(clue, idx)}
                      style={{ left: `${clue.x}%`, top: `${clue.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 group p-2.5 rounded-full transition-all transform hover:scale-125 focus:outline-none ${
                        clue.inspected
                          ? 'bg-slate-800/90 text-emerald-400 border border-emerald-500/60 shadow-md shadow-emerald-950'
                          : visionMode === 'uv'
                          ? 'bg-purple-600 text-purple-100 font-bold border-2 border-purple-300 shadow-xl shadow-purple-600/60 animate-bounce'
                          : visionMode === 'thermal'
                          ? 'bg-rose-600 text-rose-100 font-bold border-2 border-rose-300 shadow-xl shadow-rose-600/60 animate-bounce'
                          : 'bg-amber-500 text-slate-950 font-bold border-2 border-amber-300 shadow-xl shadow-amber-500/60 animate-bounce'
                      }`}
                    >
                      <div className="flex items-center space-x-1 font-mono text-xs px-1">
                        <Search className="w-4 h-4" />
                        <span className="font-bold">#{idx + 1}</span>
                      </div>
                      
                      {/* Tooltip on Hover */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 rounded-xl bg-slate-950 border border-amber-500/50 text-amber-100 text-[11px] shadow-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20 text-center font-serif">
                        <div className="font-bold text-amber-200">{replaceNames(clue.title, customNames)}</div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">Marker #{idx + 1} &bull; X:{clue.x}% Y:{clue.y}%</div>
                        {clue.inspected && (
                          <span className="block text-[10px] text-emerald-400 font-sans font-semibold mt-1">
                            ✓ Forensics Logged
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })()}

          {/* Bottom Legend */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400 bg-slate-950/80 p-3 rounded-xl border border-slate-800 backdrop-blur-md">
            <div className="flex items-center space-x-4 font-mono text-[11px]">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block animate-pulse" />
                <span>Uninspected Clue</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                <span>Examined</span>
              </div>
            </div>
            <span className="font-mono text-[11px] text-amber-400/90">
              Case Location File: {customNames.location}
            </span>
          </div>
        </div>
      ) : (
        /* Visual Architectural Floor Plan Mode */
        <div className="bg-slate-950 border-2 border-amber-600/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-lg font-serif font-bold text-amber-200 flex items-center space-x-2">
                <Map className="w-5 h-5 text-amber-500" />
                <span>ARCHITECTURAL ESTATE FLOOR PLAN & SECTOR MAP</span>
              </h3>
              <p className="text-xs text-slate-400">
                Click room zones to select sector locations and reveal localized evidence hotspots.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-slate-900 border border-emerald-600/40 px-3 py-1 rounded-lg">
              SECURITY ACCESS: LEVEL 4 CLEARED
            </span>
          </div>

          {/* Architectural Grid Map Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[380px]">
            {locations.map((loc) => {
              const isCurrent = loc.id === activeLocationId;
              const inspectedCount = loc.clues.filter((c) => c.inspected).length;
              const isAllInspected = inspectedCount === loc.clues.length;
              const isPrimarySuspectSector = primarySuspectLocationId === loc.id;
              const roomAtmo = getRoomAtmosphere(loc.id, replaceNames(loc.name, customNames));

              return (
                <div
                  key={loc.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveLocationId(loc.id);
                  }}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 shadow-xl ${
                    isPrimarySuspectSector
                      ? 'bg-gradient-to-br from-rose-950/80 via-slate-900 to-rose-950/50 border-rose-500 shadow-rose-950/50 scale-[1.02] ring-1 ring-rose-500/60'
                      : isCurrent
                      ? 'bg-gradient-to-br from-amber-950/80 via-slate-900 to-amber-950/50 border-amber-400 shadow-amber-950/60 scale-[1.02] ring-1 ring-amber-400/60'
                      : isAllInspected
                      ? 'bg-slate-900/90 border-emerald-700/60 hover:border-emerald-500'
                      : 'bg-slate-900/90 border-slate-800 hover:border-amber-500/50 hover:bg-slate-900'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-lg border ${roomAtmo.badgeColor}`}>
                        {loc.id}
                      </span>
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                        isAllInspected 
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/60' 
                          : 'bg-slate-950 text-amber-300 border border-slate-800'
                      }`}>
                        Clues: {inspectedCount}/{loc.clues.length}
                      </span>
                    </div>

                    <h4 className="text-base font-serif font-bold text-amber-100 flex items-center justify-between">
                      <span>{replaceNames(loc.name, customNames)}</span>
                      {isPrimarySuspectSector && (
                        <span className="text-[9px] font-mono bg-rose-900 text-rose-100 px-1.5 py-0.2 rounded border border-rose-500 animate-pulse font-extrabold">
                          SUSPECT HERE
                        </span>
                      )}
                    </h4>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {replaceNames(loc.description, customNames)}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400 font-bold">
                      Clue Hotspots in Sector:
                    </div>
                    <div className="space-y-1.5">
                      {loc.clues.map((c, idx) => (
                        <div
                          key={c.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveLocationId(loc.id);
                            handleClueClick(c, idx);
                          }}
                          className={`p-2 rounded-xl border text-xs flex items-center justify-between hover:border-amber-400 transition-all cursor-pointer ${
                            c.inspected
                              ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
                              : 'bg-slate-950 border-amber-900/40 text-amber-100 font-semibold hover:bg-slate-900'
                          }`}
                        >
                          <span className="truncate pr-2">#{idx + 1} {replaceNames(c.title, customNames)}</span>
                          {c.inspected ? (
                            <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-600/40">✓ Logged</span>
                          ) : (
                            <span className="text-[10px] text-amber-400 font-mono font-bold bg-amber-950 px-1.5 py-0.5 rounded border border-amber-600/40">Inspect &rarr;</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Clue Inspection Forensic Modal */}
      {selectedClue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border-2 border-amber-500/60 rounded-2xl w-full max-w-lg p-6 shadow-2xl text-slate-100 space-y-4">
            
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-amber-400">
                <Search className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                    OBJECT: {selectedClue.title}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Evidence Marker #{selectedClue.markerNum} &bull; Sector Coords: [{selectedClue.x}°, {selectedClue.y}°]
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedClue(null)}
                className="text-slate-400 hover:text-white text-xs bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg font-mono transition-colors"
              >
                ✕ Leave
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-sm text-slate-200 leading-relaxed font-serif">
              "{selectedClue.description}"
            </div>

            {/* Deep Forensics Examination reveal */}
            {examinedFurther && (
              <div className="p-3.5 bg-purple-950/60 border border-purple-600/50 rounded-xl text-xs space-y-1.5 animate-fadeIn">
                <div className="text-purple-300 font-mono font-bold flex items-center space-x-1.5">
                  <Zap className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span>MICROSCOPIC OPTICAL EXAMINATION</span>
                </div>
                <p className="text-purple-100 text-[11px]">
                  {selectedClue.evidenceFound?.detailedAnalysis
                    ? replaceNames(selectedClue.evidenceFound.detailedAnalysis, customNames)
                    : "Magnified optical inspection reveals trace smudges, localized friction marks, and partial dermal impressions logged into your case file."}
                </p>
              </div>
            )}

            {/* Evidence Collection Feedback */}
            {evidenceCollected && (
              <div className="p-3.5 bg-emerald-950/60 border border-emerald-600/50 rounded-xl text-xs space-y-1 animate-fadeIn">
                <div className="text-emerald-300 font-mono font-bold flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>EVIDENCE RETRIEVED TO INVENTORY</span>
                </div>
                <p className="text-emerald-100 text-[11px]">
                  {selectedClue.evidenceFound
                    ? `Collected: ${replaceNames(selectedClue.evidenceFound.title, customNames)}`
                    : "Environmental evidence & field measurements logged to detective notebook."}
                </p>
              </div>
            )}

            {/* Forensic Field Scan Table */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1.5">
              <div className="text-amber-400 font-bold flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-500" />
                <span>FIELD SCAN REPORT</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
                <div>Dermal Print: <span className="text-emerald-400 font-bold">Isolated</span></div>
                <div>Luminol Reaction: <span className="text-purple-400 font-bold">Positive</span></div>
                <div>Status: <span className="text-sky-400">{evidenceCollected ? 'Collected' : 'Inspected'}</span></div>
                <div>Confidence: <span className="text-amber-300 font-bold">High (98%)</span></div>
              </div>
            </div>

            {/* Interactive Action Options: Collect Evidence, Examine Further, Leave */}
            <div className="pt-2 grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  sounds.playClueFound();
                  setEvidenceCollected(true);
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center space-x-1 shadow-md ${
                  evidenceCollected
                    ? 'bg-emerald-800 text-emerald-100 border border-emerald-500'
                    : 'bg-amber-600 hover:bg-amber-500 text-slate-950 active:scale-95'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{evidenceCollected ? 'Collected ✓' : 'Collect Evidence'}</span>
              </button>

              <button
                onClick={() => {
                  sounds.playUVToggle();
                  setExaminedFurther(true);
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center space-x-1 shadow-md ${
                  examinedFurther
                    ? 'bg-purple-800 text-purple-100 border border-purple-500'
                    : 'bg-indigo-900 hover:bg-indigo-800 text-indigo-100 border border-indigo-700 active:scale-95'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{examinedFurther ? 'Examined ✓' : 'Examine Further'}</span>
              </button>

              <button
                onClick={() => setSelectedClue(null)}
                className="py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold font-mono transition-all flex items-center justify-center active:scale-95"
              >
                <span>Leave</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
