import React, { useState } from 'react';
import { CrimeLocation, CustomNames, Evidence, MysteryCase } from '../types';
import { replaceNames } from '../utils/nameFormatter';
import { getPrimarySuspectLocationId } from '../utils/suspectLocationUtils';
import { 
  Map, 
  Compass, 
  X, 
  CheckCircle2, 
  Search, 
  Footprints, 
  Zap, 
  Sparkles, 
  Navigation, 
  Radio, 
  AlertCircle,
  Eye,
  ArrowRight,
  Shield,
  Layers,
  FlaskConical,
  GraduationCap,
  Laptop,
  Telescope,
  BookOpen,
  Cpu,
  Building,
  Flame,
  Grid,
  SearchCode,
  UtensilsCrossed,
  Trees,
  Bed,
  Wine,
  Palette,
  Wrench,
  Coffee,
  Vault,
  Microscope,
  DoorOpen,
  Briefcase
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface CrimeSceneMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  locations: CrimeLocation[];
  evidenceList: Evidence[];
  customNames: CustomNames;
  currentLocationId: string;
  onSelectLocation: (locationId: string) => void;
  onInspectClue?: (locationId: string, clueId: string, evidenceId?: string) => void;
  currentCase?: MysteryCase;
}

const getRoomIcon = (locationId: string, locationName: string) => {
  const lower = (locationId + ' ' + locationName).toLowerCase();
  
  // Kitchen / Dining / Pantry
  if (lower.includes('kitchen') || lower.includes('pantry') || lower.includes('cook') || lower.includes('chef') || lower.includes('dining')) {
    return UtensilsCrossed;
  }
  // Study / Office / Writing Desk / Den
  if (lower.includes('study') || lower.includes('office') || lower.includes('desk') || lower.includes('den') || lower.includes('writing')) {
    return Search; // Magnifying glass for Study
  }
  // Laboratory / Chem / Science / Medical
  if (lower.includes('lab') || lower.includes('science') || lower.includes('chem') || lower.includes('medical') || lower.includes('infirmary')) {
    return FlaskConical;
  }
  // Observatory / Telescope / Stargazing
  if (lower.includes('observatory') || lower.includes('telescope') || lower.includes('stargaz') || lower.includes('astronomy')) {
    return Telescope;
  }
  // Library / Archive / Books
  if (lower.includes('library') || lower.includes('archive') || lower.includes('book')) {
    return BookOpen;
  }
  // Computer / Robotics / Tech Hub / Server Room / IT
  if (lower.includes('computer') || lower.includes('robotics') || lower.includes('tech') || lower.includes('server') || lower.includes('terminal') || lower.includes('it')) {
    return Cpu;
  }
  // Garden / Courtyard / Greenhouse / Conservatory / Lawn
  if (lower.includes('garden') || lower.includes('courtyard') || lower.includes('greenhouse') || lower.includes('conservatory') || lower.includes('patio') || lower.includes('lawn')) {
    return Trees;
  }
  // Bedroom / Guest Room / Quarters / Dorm
  if (lower.includes('bedroom') || lower.includes('guest') || lower.includes('quarters') || lower.includes('dorm') || lower.includes('suite')) {
    return Bed;
  }
  // Wine Cellar / Cellar / Vault / Bar
  if (lower.includes('cellar') || lower.includes('wine') || lower.includes('bar') || lower.includes('vault')) {
    return Wine;
  }
  // Classroom / School / Academy
  if (lower.includes('classroom') || lower.includes('class') || lower.includes('school') || lower.includes('academy')) {
    return GraduationCap;
  }
  // Gallery / Art Studio / Exhibition / Museum
  if (lower.includes('gallery') || lower.includes('art') || lower.includes('exhibit') || lower.includes('museum') || lower.includes('studio')) {
    return Palette;
  }
  // Garage / Workshop / Maintenance / Hangar
  if (lower.includes('garage') || lower.includes('workshop') || lower.includes('maintenance') || lower.includes('hangar')) {
    return Wrench;
  }
  // Corridor / Hallway / Lobby / Foyer / Passage
  if (lower.includes('corridor') || lower.includes('hallway') || lower.includes('lobby') || lower.includes('foyer') || lower.includes('passage')) {
    return Footprints;
  }
  // Lounge / Parlor / Living Room / Reception
  if (lower.includes('lounge') || lower.includes('parlor') || lower.includes('living') || lower.includes('reception') || lower.includes('salon')) {
    return Coffee;
  }
  
  return Building;
};

const getRoomColorTheme = (locationId: string, locationName: string) => {
  const lower = (locationId + ' ' + locationName).toLowerCase();
  
  if (lower.includes('kitchen') || lower.includes('pantry') || lower.includes('cook') || lower.includes('dining')) {
    return {
      border: 'border-orange-500/60 hover:border-orange-400',
      bg: 'bg-slate-900/90 hover:bg-orange-950/40',
      badge: 'bg-orange-950 text-orange-300 border-orange-600/60',
      text: 'text-orange-400',
      glow: 'shadow-orange-900/30',
      lineColor: '#f97316',
      sectorCode: 'SEC-KIT-05'
    };
  }
  if (lower.includes('study') || lower.includes('office') || lower.includes('desk') || lower.includes('den')) {
    return {
      border: 'border-amber-500/60 hover:border-amber-400',
      bg: 'bg-slate-900/90 hover:bg-amber-950/40',
      badge: 'bg-amber-950 text-amber-300 border-amber-600/60',
      text: 'text-amber-400',
      glow: 'shadow-amber-900/30',
      lineColor: '#f59e0b',
      sectorCode: 'SEC-STD-02'
    };
  }
  if (lower.includes('lab') || lower.includes('science') || lower.includes('chem') || lower.includes('medical')) {
    return {
      border: 'border-emerald-500/60 hover:border-emerald-400',
      bg: 'bg-slate-900/90 hover:bg-emerald-950/40',
      badge: 'bg-emerald-950 text-emerald-300 border-emerald-600/60',
      text: 'text-emerald-400',
      glow: 'shadow-emerald-900/30',
      lineColor: '#10b981',
      sectorCode: 'SEC-LAB-01'
    };
  }
  if (lower.includes('observatory') || lower.includes('telescope') || lower.includes('stargaz')) {
    return {
      border: 'border-indigo-500/60 hover:border-indigo-400',
      bg: 'bg-slate-900/90 hover:bg-indigo-950/40',
      badge: 'bg-indigo-950 text-indigo-300 border-indigo-600/60',
      text: 'text-indigo-400',
      glow: 'shadow-indigo-900/30',
      lineColor: '#6366f1',
      sectorCode: 'SEC-OBS-08'
    };
  }
  if (lower.includes('library') || lower.includes('archive') || lower.includes('book')) {
    return {
      border: 'border-teal-500/60 hover:border-teal-400',
      bg: 'bg-slate-900/90 hover:bg-teal-950/40',
      badge: 'bg-teal-950 text-teal-300 border-teal-600/60',
      text: 'text-teal-400',
      glow: 'shadow-teal-900/30',
      lineColor: '#14b8a6',
      sectorCode: 'SEC-LIB-03'
    };
  }
  if (lower.includes('computer') || lower.includes('robotics') || lower.includes('tech') || lower.includes('server') || lower.includes('it')) {
    return {
      border: 'border-cyan-500/60 hover:border-cyan-400',
      bg: 'bg-slate-900/90 hover:bg-cyan-950/40',
      badge: 'bg-cyan-950 text-cyan-300 border-cyan-600/60',
      text: 'text-cyan-400',
      glow: 'shadow-cyan-900/30',
      lineColor: '#06b6d4',
      sectorCode: 'SEC-SYS-04'
    };
  }
  if (lower.includes('garden') || lower.includes('courtyard') || lower.includes('greenhouse') || lower.includes('conservatory')) {
    return {
      border: 'border-lime-500/60 hover:border-lime-400',
      bg: 'bg-slate-900/90 hover:bg-lime-950/40',
      badge: 'bg-lime-950 text-lime-300 border-lime-600/60',
      text: 'text-lime-400',
      glow: 'shadow-lime-900/30',
      lineColor: '#84cc16',
      sectorCode: 'SEC-GRD-07'
    };
  }
  if (lower.includes('cellar') || lower.includes('wine') || lower.includes('bar') || lower.includes('vault')) {
    return {
      border: 'border-purple-500/60 hover:border-purple-400',
      bg: 'bg-slate-900/90 hover:bg-purple-950/40',
      badge: 'bg-purple-950 text-purple-300 border-purple-600/60',
      text: 'text-purple-400',
      glow: 'shadow-purple-900/30',
      lineColor: '#a855f7',
      sectorCode: 'SEC-CEL-06'
    };
  }
  if (lower.includes('gallery') || lower.includes('art') || lower.includes('studio') || lower.includes('exhibit')) {
    return {
      border: 'border-pink-500/60 hover:border-pink-400',
      bg: 'bg-slate-900/90 hover:bg-pink-950/40',
      badge: 'bg-pink-950 text-pink-300 border-pink-600/60',
      text: 'text-pink-400',
      glow: 'shadow-pink-900/30',
      lineColor: '#ec4899',
      sectorCode: 'SEC-GAL-04'
    };
  }
  if (lower.includes('bedroom') || lower.includes('guest') || lower.includes('quarters')) {
    return {
      border: 'border-sky-500/60 hover:border-sky-400',
      bg: 'bg-slate-900/90 hover:bg-sky-950/40',
      badge: 'bg-sky-950 text-sky-300 border-sky-600/60',
      text: 'text-sky-400',
      glow: 'shadow-sky-900/30',
      lineColor: '#0ea5e9',
      sectorCode: 'SEC-BED-09'
    };
  }
  if (lower.includes('garage') || lower.includes('workshop') || lower.includes('maintenance')) {
    return {
      border: 'border-yellow-500/60 hover:border-yellow-400',
      bg: 'bg-slate-900/90 hover:bg-yellow-950/40',
      badge: 'bg-yellow-950 text-yellow-300 border-yellow-600/60',
      text: 'text-yellow-400',
      glow: 'shadow-yellow-900/30',
      lineColor: '#eab308',
      sectorCode: 'SEC-WRK-10'
    };
  }
  
  return {
    border: 'border-amber-500/60 hover:border-amber-400',
    bg: 'bg-slate-900/90 hover:bg-slate-800/80',
    badge: 'bg-slate-900 text-amber-300 border-amber-600/60',
    text: 'text-amber-300',
    glow: 'shadow-amber-900/30',
    lineColor: '#d97706',
    sectorCode: 'SEC-GEN-02'
  };
};

export const CrimeSceneMapModal: React.FC<CrimeSceneMapModalProps> = ({
  isOpen,
  onClose,
  locations,
  evidenceList,
  customNames,
  currentLocationId,
  onSelectLocation,
  onInspectClue,
  currentCase,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'searched'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'schematic' | 'architectural'>('schematic');

  const primarySuspectLocationId = currentCase ? getPrimarySuspectLocationId(currentCase, locations) : '';

  if (!isOpen) return null;

  const totalClues = locations.reduce((sum, loc) => sum + loc.clues.length, 0);
  const totalInspected = locations.reduce(
    (sum, loc) => sum + loc.clues.filter((c) => c.inspected).length,
    0
  );

  const filteredLocations = locations.filter((loc) => {
    const inspectedCount = loc.clues.filter((c) => c.inspected).length;
    let matchesStatus = true;
    if (filter === 'pending') matchesStatus = inspectedCount < loc.clues.length;
    if (filter === 'searched') matchesStatus = inspectedCount === loc.clues.length;

    if (!matchesStatus) return false;

    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const roomName = replaceNames(loc.name, customNames).toLowerCase();
    const roomDesc = replaceNames(loc.description, customNames).toLowerCase();
    const clueMatch = loc.clues.some(c => replaceNames(c.title, customNames).toLowerCase().includes(query));

    return roomName.includes(query) || roomDesc.includes(query) || clueMatch;
  });

  const handleRoomClick = (locId: string) => {
    sounds.playClick();
    onSelectLocation(locId);
    onClose();
  };

  const handleClueClick = (locId: string, clueId: string, evidenceId?: string) => {
    sounds.playClick();
    onSelectLocation(locId);
    if (onInspectClue) {
      onInspectClue(locId, clueId, evidenceId);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] bg-slate-950 border-2 border-amber-600/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-25" />

        {/* Modal Header */}
        <div className="relative z-10 px-5 py-4 border-b border-amber-900/50 bg-slate-900/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-950/90 border border-amber-500/60 text-amber-400 shadow-lg shadow-amber-950/50">
              <Map className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">
                  TACTICAL BLUEPRINT OVERLAY
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700/60 text-[10px] font-mono font-bold">
                  LIVE SCENE RADAR
                </span>
              </div>
              <h2 className="text-xl font-serif font-bold text-amber-100">
                Crime Scene Location Map
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end flex-wrap gap-y-2">
            {/* View Mode Toggle */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 space-x-1">
              <button
                onClick={() => setViewMode('schematic')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center space-x-1 ${
                  viewMode === 'schematic'
                    ? 'bg-amber-600 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Corridors</span>
              </button>
              <button
                onClick={() => setViewMode('architectural')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center space-x-1 ${
                  viewMode === 'architectural'
                    ? 'bg-amber-600 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Floor Plan</span>
              </button>
            </div>

            {/* Quick Status Filter Buttons */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 space-x-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  filter === 'all'
                    ? 'bg-amber-600 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All ({locations.length})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  filter === 'pending'
                    ? 'bg-amber-600 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('searched')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  filter === 'searched'
                    ? 'bg-emerald-600 text-white font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Searched
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition-all active:scale-95 cursor-pointer"
              title="Close Map (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Blueprint Summary & Search Bar */}
        <div className="relative z-10 px-5 py-3 bg-slate-950/95 border-b border-slate-900 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-300 shrink-0">
          <div className="flex items-center space-x-4 flex-wrap gap-y-1">
            <div className="flex items-center space-x-1.5 text-amber-300">
              <Compass className="w-4 h-4 text-amber-500" />
              <span>LOCATIONS: <strong className="text-amber-100">{filteredLocations.length} / {locations.length}</strong></span>
            </div>
            <span className="text-slate-800">|</span>
            <div className="flex items-center space-x-1.5 text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>CLUES INSPECTED: <strong className="text-emerald-100">{totalInspected}/{totalClues}</strong></span>
            </div>
            {searchQuery && (
              <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700/60 text-[10px] font-mono animate-pulse">
                FILTERING BY "{searchQuery}"
              </span>
            )}
          </div>

          {/* Real-time Filter Text Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-amber-500/80" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter crime scene locations in real time..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-900/90 border border-amber-600/40 text-slate-100 text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-500/50 placeholder:text-slate-500 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-amber-300 text-xs p-0.5 rounded-full hover:bg-slate-800 transition-colors"
                title="Clear search filter"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Modal Body: Interactive Schematic Corridor Map & Location Cards */}
        <div className="relative z-10 flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
          
          {/* SCHEMATIC VS ARCHITECTURAL FLOOR PLAN */}
          {viewMode === 'schematic' ? (
            <div className="relative bg-slate-900/90 border border-amber-900/40 rounded-2xl p-5 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">
                    INTERCONNECTED SECTOR FLOOR PLAN & CORRIDOR NETWORK
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {filteredLocations.length} SECTOR{filteredLocations.length !== 1 ? 'S' : ''} VISIBLE
                </span>
              </div>

              {/* SVG Corridor Lines Layer */}
              <div className="relative w-full min-h-[140px] bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex items-center justify-center">
                {filteredLocations.length === 0 ? (
                  <div className="text-center py-6 text-slate-400 font-mono text-xs">
                    No location corridors match filter "{searchQuery}".
                  </div>
                ) : (
                  <>
                    {/* SVG Connector Lines connecting visible room nodes */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                      <defs>
                        <linearGradient id="corridorGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>

                      {/* Connecting lines across nodes in a row */}
                      <line 
                        x1="12%" y1="50%" x2="38%" y2="50%" 
                        stroke="url(#corridorGlow)" 
                        strokeWidth="3" 
                        strokeDasharray="6 4" 
                        className="animate-pulse"
                      />
                      <line 
                        x1="38%" y1="50%" x2="62%" y2="50%" 
                        stroke="url(#corridorGlow)" 
                        strokeWidth="3" 
                        strokeDasharray="6 4" 
                        className="animate-pulse"
                      />
                      <line 
                        x1="62%" y1="50%" x2="88%" y2="50%" 
                        stroke="url(#corridorGlow)" 
                        strokeWidth="3" 
                        strokeDasharray="6 4" 
                        className="animate-pulse"
                      />
                    </svg>

                    {/* Node Nodes along the pipeline */}
                    <div className="relative z-10 w-full grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                      {filteredLocations.map((loc, idx) => {
                        const inspected = loc.clues.filter((c) => c.inspected).length;
                        const total = loc.clues.length;
                        const undiscovered = total - inspected;
                        const isCurrent = loc.id === currentLocationId;
                        const isPrimarySuspectHere = loc.id === primarySuspectLocationId;
                        const theme = getRoomColorTheme(loc.id, loc.name);
                        const IconComp = getRoomIcon(loc.id, loc.name);
                        const roomTitle = replaceNames(loc.name, customNames);
                        const tooltipText = undiscovered === 0 
                          ? `${roomTitle}: All ${total} clues inspected` 
                          : `${roomTitle}: ${undiscovered} undiscovered clue${undiscovered !== 1 ? 's' : ''} available (${inspected}/${total} found)`;

                        return (
                          <button
                            key={loc.id}
                            onClick={() => handleRoomClick(loc.id)}
                            title={tooltipText}
                            className={`relative group p-3 rounded-xl border-2 transition-all flex flex-col items-center justify-between space-y-2 cursor-pointer active:scale-95 ${
                              isPrimarySuspectHere
                                ? 'border-rose-500 bg-rose-950/60 shadow-lg shadow-rose-950/80 ring-2 ring-rose-500/50'
                                : isCurrent
                                ? 'border-amber-400 bg-amber-950/70 shadow-lg shadow-amber-950/80 ring-2 ring-amber-400/50'
                                : `${theme.border} ${theme.bg} shadow-md`
                            }`}
                          >
                            {/* Hover Tooltip Popover */}
                            <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none px-2.5 py-1 rounded-lg bg-slate-900/95 border border-amber-500/80 text-[10px] font-mono whitespace-nowrap shadow-xl flex items-center space-x-1.5 backdrop-blur-sm">
                              <Search className="w-3 h-3 text-amber-400 shrink-0" />
                              <span className={undiscovered > 0 ? "text-amber-300 font-bold" : "text-emerald-400 font-bold"}>
                                {undiscovered === 0 ? '✓ Fully Investigated' : `${undiscovered} Undiscovered Clue${undiscovered !== 1 ? 's' : ''}`}
                              </span>
                            </div>

                            {isPrimarySuspectHere && (
                              <div className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full bg-rose-600 text-rose-100 text-[8px] font-mono font-bold tracking-wider shadow-lg border border-rose-400 flex items-center space-x-1 animate-pulse z-20">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                                <span>PRIMARY SUSPECT</span>
                              </div>
                            )}

                            {isCurrent && (
                              <div className="absolute -top-2.5 left-2 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[9px] font-mono font-bold tracking-wider shadow animate-bounce z-20">
                                YOU ARE HERE
                              </div>
                            )}

                            <div className="flex items-center space-x-2">
                              <div className="relative">
                                <div className={`p-1.5 rounded-lg bg-slate-950 border border-slate-700 ${theme.text}`}>
                                  <IconComp className="w-4 h-4" />
                                </div>
                                {isPrimarySuspectHere && (
                                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] font-mono text-slate-400">
                                NODE 0{idx + 1}
                              </span>
                            </div>

                            <span className="text-xs font-serif font-bold text-slate-100 line-clamp-1 group-hover:text-amber-200">
                              {roomTitle}
                            </span>

                            <div className="flex items-center space-x-1.5 text-[10px] font-mono">
                              <span className={`px-1.5 py-0.5 rounded-full border ${
                                inspected === total
                                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-600'
                                  : 'bg-slate-950 text-amber-400 border-slate-700'
                              }`}>
                                {inspected}/{total} Clues
                              </span>
                              {undiscovered > 0 && (
                                <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                                  {undiscovered} Left
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            /* ARCHITECTURAL 2D BLUEPRINT VIEW */
            <div className="relative bg-slate-900/90 border border-amber-900/40 rounded-2xl p-5 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Grid className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">
                    2D ARCHITECTURAL LAYOUT SCHEMATIC
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {filteredLocations.length} SECTOR{filteredLocations.length !== 1 ? 'S' : ''} VISIBLE
                </span>
              </div>

              {filteredLocations.length === 0 ? (
                <div className="p-8 text-center bg-slate-950/80 rounded-2xl border border-slate-800 text-slate-400 font-mono text-xs">
                  No floor plan sectors match filter "{searchQuery}".
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-950/90 rounded-2xl border border-slate-800">
                  {filteredLocations.map((loc) => {
                    const inspected = loc.clues.filter((c) => c.inspected).length;
                    const total = loc.clues.length;
                    const undiscovered = total - inspected;
                    const isCurrent = loc.id === currentLocationId;
                    const theme = getRoomColorTheme(loc.id, loc.name);
                    const IconComp = getRoomIcon(loc.id, loc.name);
                    const roomTitle = replaceNames(loc.name, customNames);
                    const tooltipText = undiscovered === 0 
                      ? `${roomTitle}: All ${total} clues inspected` 
                      : `${roomTitle}: ${undiscovered} undiscovered clue${undiscovered !== 1 ? 's' : ''} available (${inspected}/${total} found)`;

                    return (
                      <div
                        key={loc.id}
                        onClick={() => handleRoomClick(loc.id)}
                        title={tooltipText}
                        className={`relative group p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                          isCurrent
                            ? 'border-amber-400 bg-amber-950/60 ring-2 ring-amber-500/50'
                            : `${theme.border} ${theme.bg}`
                        }`}
                      >
                        {/* Hover Tooltip Popover */}
                        <div className="absolute -top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none px-2.5 py-1 rounded-lg bg-slate-900 border border-amber-500/80 text-[10px] font-mono shadow-xl flex items-center space-x-1 backdrop-blur-sm">
                          <Search className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className={undiscovered > 0 ? "text-amber-300 font-bold" : "text-emerald-400 font-bold"}>
                            {undiscovered === 0 ? '✓ Fully Discovered' : `${undiscovered} Undiscovered Clue${undiscovered !== 1 ? 's' : ''}`}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <IconComp className={`w-5 h-5 ${theme.text}`} />
                            <span className="text-sm font-serif font-bold text-slate-100">
                              {roomTitle}
                            </span>
                          </div>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[9px] font-mono font-bold">
                              CURRENT
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-1">
                          {replaceNames(loc.description, customNames)}
                        </p>

                        <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-slate-800/80">
                          <span className="text-slate-400">Clues Discovered:</span>
                          <div className="flex items-center space-x-2">
                            <span className={inspected === total ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                              {inspected} / {total}
                            </span>
                            {undiscovered > 0 && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                                {undiscovered} Undiscovered
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* GRID OF DETAILED LOCATION CARDS */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center space-x-2">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>SECTOR INVESTIGATION CARDS & CLUE REGISTRY</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                Click any sector or clue to inspect immediately
              </span>
            </div>

            {filteredLocations.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-2xl text-slate-400 font-mono text-xs">
                No crime scene sectors match your filter or search query "{searchQuery}".
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredLocations.map((loc) => {
                  const inspectedCount = loc.clues.filter((c) => c.inspected).length;
                  const totalCount = loc.clues.length;
                  const isFullySearched = inspectedCount === totalCount;
                  const isCurrent = loc.id === currentLocationId;
                  const isPrimarySuspectHere = loc.id === primarySuspectLocationId;
                  const theme = getRoomColorTheme(loc.id, loc.name);
                  const IconComp = getRoomIcon(loc.id, loc.name);

                  // Find evidence items in this location
                  const locationEvidences = evidenceList.filter((e) =>
                    loc.clues.some((c) => c.evidenceId === e.id)
                  );

                  return (
                    <div
                      key={loc.id}
                      onClick={() => handleRoomClick(loc.id)}
                      className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer group shadow-xl flex flex-col justify-between space-y-4 hover:scale-[1.01] ${
                        isPrimarySuspectHere
                          ? 'border-rose-500 bg-rose-950/40 ring-1 ring-rose-500/50 shadow-rose-950/50'
                          : isCurrent
                          ? 'border-amber-400 bg-amber-950/40 ring-1 ring-amber-500/50 shadow-amber-950/50'
                          : `${theme.border} ${theme.bg}`
                      }`}
                    >
                      {/* Top Header info */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            <div className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800 ${theme.text} shrink-0 group-hover:scale-110 transition-transform`}>
                              <IconComp className="w-5 h-5" />
                            </div>
                            {isPrimarySuspectHere && (
                              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                              <span className="text-[9px] font-mono text-slate-400 tracking-wider">
                                {theme.sectorCode}
                              </span>
                              {isCurrent && (
                                <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 text-[9px] font-mono font-bold">
                                  ACTIVE LOCATION
                                </span>
                              )}
                              {isPrimarySuspectHere && (
                                <span className="px-1.5 py-0.5 rounded bg-rose-600 text-rose-100 text-[9px] font-mono font-bold animate-pulse border border-rose-400 flex items-center space-x-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                  <span>PRIMARY SUSPECT HERE</span>
                                </span>
                              )}
                            </div>
                            <h4 className="text-base font-serif font-bold text-amber-100 group-hover:text-amber-200 transition-colors">
                              {replaceNames(loc.name, customNames)}
                            </h4>
                          </div>
                        </div>

                        {/* Search Progress Status */}
                        <div className="text-right shrink-0">
                          <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full border text-xs font-mono font-bold ${
                            isFullySearched
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                              : inspectedCount > 0
                              ? 'bg-amber-950 text-amber-300 border-amber-700'
                              : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}>
                            {isFullySearched ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Search className="w-3.5 h-3.5 text-amber-400" />
                            )}
                            <span>
                              {inspectedCount}/{totalCount} Clues
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Room Description */}
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {replaceNames(loc.description, customNames)}
                      </p>

                      {/* Clues Preview List with Click-to-Inspect */}
                      <div className="space-y-1.5 bg-slate-950/80 p-3 rounded-xl border border-slate-900">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          CLUES IN THIS SECTOR (CLICK TO FAST-INSPECT):
                        </span>
                        {loc.clues.map((clue, index) => {
                          const clueTitle = replaceNames(clue.title, customNames);
                          return (
                            <button
                              key={clue.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleClueClick(loc.id, clue.id, clue.evidenceId);
                              }}
                              className="w-full flex items-center justify-between text-xs text-slate-300 hover:bg-slate-900 p-1 rounded transition-colors group/clue text-left cursor-pointer"
                            >
                              <div className="flex items-center space-x-2 truncate">
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                  clue.inspected ? 'bg-emerald-400' : 'bg-amber-500/60'
                                }`} />
                                <span className={`truncate ${clue.inspected ? 'text-slate-200 font-medium' : 'text-slate-400 italic group-hover/clue:text-amber-300'}`}>
                                  Clue #{index + 1}: {clueTitle}
                                </span>
                              </div>
                              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded shrink-0 ${
                                clue.inspected
                                  ? 'text-emerald-400 bg-emerald-950/60'
                                  : 'text-amber-400 bg-amber-950/60 group-hover/clue:bg-amber-500 group-hover/clue:text-slate-950'
                              }`}>
                                {clue.inspected ? 'INSPECTED' : 'INSPECT →'}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Evidence Badges Found Here */}
                      {locationEvidences.length > 0 && (
                        <div className="flex items-center space-x-2 pt-1">
                          <span className="text-[10px] font-mono text-amber-400 font-bold">KEY EVIDENCE:</span>
                          <div className="flex flex-wrap gap-1">
                            {locationEvidences.map((ev) => (
                              <span
                                key={ev.id}
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold border flex items-center space-x-1 ${
                                  ev.discovered
                                    ? 'bg-amber-950/80 text-amber-200 border-amber-600/60'
                                    : 'bg-slate-950 text-slate-500 border-slate-800'
                                }`}
                              >
                                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                                <span>{replaceNames(ev.title, customNames)}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      <div className="pt-2 flex items-center justify-between border-t border-slate-900/80">
                        <span className="text-[10px] font-mono text-slate-400">
                          {isCurrent ? '● Current Active Sector' : 'Click to inspect this crime scene'}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRoomClick(loc.id);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono flex items-center space-x-1.5 transition-all shadow ${
                            isCurrent
                              ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                              : 'bg-slate-900 hover:bg-amber-600 hover:text-slate-950 text-amber-300 border border-slate-700'
                          }`}
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>{isCurrent ? 'INSPECT ROOM' : 'FAST TRAVEL HERE'}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="relative z-10 px-5 py-3.5 bg-slate-900/90 border-t border-amber-900/50 flex items-center justify-between text-xs font-mono shrink-0">
          <div className="flex items-center space-x-2 text-slate-400">
            <Shield className="w-4 h-4 text-amber-500" />
            <span>Detective Fast-Travel System • Instant Crime Scene Teleportation</span>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700 transition-all active:scale-95 cursor-pointer"
          >
            Close Map Overlay
          </button>
        </div>

      </div>
    </div>
  );
};
