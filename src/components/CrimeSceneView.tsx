import React, { useState } from 'react';
import { CrimeLocation, CustomNames, Evidence } from '../types';
import { replaceNames } from '../utils/nameFormatter';
import { Search, Eye, Sparkles, CheckCircle2, Compass, HelpCircle } from 'lucide-react';
import { sounds } from '../utils/sound';

interface CrimeSceneViewProps {
  locations: CrimeLocation[];
  evidenceList: Evidence[];
  customNames: CustomNames;
  onInspectClue: (locationId: string, clueId: string, evidenceId?: string) => void;
}

export const CrimeSceneView: React.FC<CrimeSceneViewProps> = ({
  locations,
  evidenceList,
  customNames,
  onInspectClue,
}) => {
  const [activeLocationId, setActiveLocationId] = useState<string>(locations[0]?.id || 'loc_dining');
  const [selectedClue, setSelectedClue] = useState<{
    title: string;
    description: string;
    evidenceFound?: Evidence;
  } | null>(null);

  const currentLocation = locations.find((l) => l.id === activeLocationId) || locations[0];

  const handleClueClick = (clue: typeof currentLocation.clues[0]) => {
    sounds.playClueFound();
    onInspectClue(currentLocation.id, clue.id, clue.evidenceId);

    let foundEv: Evidence | undefined = undefined;
    if (clue.evidenceId) {
      foundEv = evidenceList.find((e) => e.id === clue.evidenceId);
    }

    setSelectedClue({
      title: replaceNames(clue.title, customNames),
      description: replaceNames(clue.description, customNames),
      evidenceFound: foundEv,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-slate-100 animate-fadeIn">
      
      {/* Header Info */}
      <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 mb-1">
            <Compass className="w-4 h-4 text-amber-500" />
            <span>INVESTIGATION SECTOR</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-amber-100">
            {replaceNames(currentLocation.name, customNames)}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            {replaceNames(currentLocation.description, customNames)}
          </p>
        </div>

        {/* Location selector buttons */}
        <div className="flex flex-wrap gap-2">
          {locations.map((loc) => {
            const inspectedCount = loc.clues.filter((c) => c.inspected).length;
            const totalCount = loc.clues.length;
            const isActive = loc.id === activeLocationId;

            return (
              <button
                key={loc.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveLocationId(loc.id);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
                  isActive
                    ? 'bg-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-900/30'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-amber-200 border border-slate-700'
                }`}
              >
                <span>{replaceNames(loc.name, customNames)}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive ? 'bg-slate-950 text-amber-300' : 'bg-slate-900 text-slate-400'
                }`}>
                  {inspectedCount}/{totalCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Scene Canvas */}
      <div className="relative w-full h-[450px] sm:h-[520px] rounded-2xl overflow-hidden border-2 border-amber-900/40 shadow-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 flex flex-col justify-between p-6">
        
        {/* Ambient Room Watermark / Background Styling */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-black" />
        
        <div className="relative z-10 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-mono text-amber-300 backdrop-blur-md">
            Click hot spots 🔍 to examine the crime scene
          </span>
          <span className="text-xs font-mono text-slate-400">
            Location ID: {currentLocation.id}
          </span>
        </div>

        {/* Hot Spots */}
        <div className="relative z-10 flex-1 w-full my-4 rounded-xl border border-dashed border-amber-800/30 bg-slate-950/40 backdrop-blur-sm relative overflow-hidden">
          {currentLocation.clues.map((clue) => {
            return (
              <button
                key={clue.id}
                onClick={() => handleClueClick(clue)}
                style={{ left: `${clue.x}%`, top: `${clue.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group p-3 rounded-full transition-all transform hover:scale-125 focus:outline-none ${
                  clue.inspected
                    ? 'bg-slate-800/90 text-emerald-400 border border-emerald-500/50 shadow-md shadow-emerald-950'
                    : 'bg-amber-500 text-slate-950 font-bold border-2 border-amber-300 shadow-xl shadow-amber-500/50 animate-bounce'
                }`}
              >
                <Search className="w-5 h-5" />
                
                {/* Tooltip on Hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-lg bg-slate-950 border border-amber-500/50 text-amber-100 text-[11px] shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20 text-center font-serif">
                  {replaceNames(clue.title, customNames)}
                  {clue.inspected && (
                    <span className="block text-[10px] text-emerald-400 font-sans mt-0.5">
                      ✓ Inspected
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Legend */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block animate-pulse" />
              <span>Unexplored Clue</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span>Examined Clue</span>
            </div>
          </div>
          <span>Case File: {customNames.location}</span>
        </div>
      </div>

      {/* Clue Inspection Modal / Drawer */}
      {selectedClue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/50 rounded-2xl w-full max-w-lg p-6 shadow-2xl text-slate-100 space-y-4">
            
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-amber-400">
                <Search className="w-5 h-5" />
                <h3 className="text-lg font-serif font-bold text-amber-200">
                  {selectedClue.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedClue(null)}
                className="text-slate-400 hover:text-white text-xs bg-slate-800 px-2 py-1 rounded"
              >
                Close
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedClue.description}
            </p>

            {selectedClue.evidenceFound ? (
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-600/50 space-y-2">
                <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold font-mono uppercase">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                  <span>NEW EVIDENCE ADDED TO INVENTORY</span>
                </div>
                <h4 className="text-base font-serif font-bold text-amber-100">
                  {replaceNames(selectedClue.evidenceFound.title, customNames)}
                </h4>
                <p className="text-xs text-amber-200/90">
                  {replaceNames(selectedClue.evidenceFound.description, customNames)}
                </p>
                {selectedClue.evidenceFound.detailedAnalysis && (
                  <p className="text-[11px] text-amber-400 italic bg-slate-950/60 p-2 rounded border border-amber-900/50 mt-2">
                    Detective's Note: {replaceNames(selectedClue.evidenceFound.detailedAnalysis, customNames)}
                  </p>
                )}
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-slate-950 text-slate-400 text-xs italic">
                No immediate physical evidence was retrieved from this spot, but the observations have been logged in your notebook.
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedClue(null)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold shadow-md"
              >
                Continue Investigation
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
