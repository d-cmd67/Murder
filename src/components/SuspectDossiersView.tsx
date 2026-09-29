import React, { useState } from 'react';
import { MysteryCase, CustomNames, Suspect, SuspectId } from '../types';
import { replaceNames } from '../utils/nameFormatter';
import { Users, ShieldAlert, Award, FileText, CheckCircle2, AlertCircle, Eye, Sparkles } from 'lucide-react';
import { sounds } from '../utils/sound';

interface SuspectDossiersViewProps {
  currentCase: MysteryCase;
  customNames: CustomNames;
  suspects: Record<string, Suspect>;
}

export const SuspectDossiersView: React.FC<SuspectDossiersViewProps> = ({
  currentCase,
  customNames,
  suspects,
}) => {
  const suspectList = Object.values(suspects) as Suspect[];
  const [selectedSuspectId, setSelectedSuspectId] = useState<SuspectId>(suspectList[0]?.id || 'suspect1');
  const [flaggedSuspectId, setFlaggedSuspectId] = useState<SuspectId | null>(null);

  const activeSuspect = suspects[selectedSuspectId] || suspectList[0];
  const customName = customNames[selectedSuspectId as keyof CustomNames] || activeSuspect?.defaultName || 'Suspect';

  const handleFlagSuspect = (id: SuspectId) => {
    sounds.playClueFound();
    setFlaggedSuspectId(id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3 text-amber-400">
          <Users className="w-7 h-7 text-amber-500" />
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-100 uppercase tracking-wider">
              SUSPECT DOSSIERS & POLICE ARCHIVE
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Verified background records, alibis, motives & psychological profiles
            </p>
          </div>
        </div>
        <div className="px-3 py-1 bg-amber-950/80 border border-amber-600/60 rounded-xl text-xs font-mono text-amber-300 font-bold">
          {suspectList.length} Active Suspects
        </div>
      </div>

      {/* Suspect Selector Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto p-1 custom-scrollbar">
        {suspectList.map((s) => {
          const sName = customNames[s.id as keyof CustomNames] || s.defaultName;
          const isSelected = selectedSuspectId === s.id;
          const isFlagged = flaggedSuspectId === s.id;

          return (
            <div
              key={s.id}
              onClick={() => {
                sounds.playClueFound();
                setSelectedSuspectId(s.id);
              }}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-gradient-to-br from-amber-950/90 via-slate-900 to-amber-950/70 border-amber-400 shadow-2xl scale-[1.02] ring-2 ring-amber-500/50 text-amber-100'
                  : 'bg-slate-900/90 border-slate-800 hover:border-amber-500/40 hover:scale-[1.01]'
              }`}
            >
              <div className="space-y-0.5 min-w-0">
                <div className="font-serif font-bold text-sm text-slate-100 truncate flex items-center space-x-1">
                  <span className={isSelected ? 'text-amber-200' : ''}>{sName}</span>
                  {isFlagged && <span className="text-rose-400 text-xs">🚩</span>}
                </div>
                <div className="text-[10px] font-mono text-slate-400 truncate">{s.role}</div>
                <div className="text-[10px] font-mono font-bold text-amber-400 flex items-center space-x-1">
                  <span>Suspicion: {s.suspicionLevel}%</span>
                  {isSelected && <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/40">SELECTED</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Dossier Detail Card */}
      {activeSuspect && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 animate-fadeIn">
          
          <div className="flex flex-wrap items-start justify-between border-b border-slate-800 pb-4 gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-2xl font-serif font-bold text-amber-200">
                  {customName}
                </h3>
                {flaggedSuspectId === activeSuspect.id && (
                  <span className="px-2.5 py-0.5 bg-rose-950 text-rose-300 border border-rose-500/60 text-[10px] font-mono font-bold rounded-full">
                    PRIMARY SUSPECT FLAG
                  </span>
                )}
              </div>
              <div className="text-xs font-mono text-slate-400 mt-0.5">
                Role: <span className="text-slate-200 font-bold">{activeSuspect.role}</span> &bull; Age: {activeSuspect.age || 38} &bull; Case ID: #{activeSuspect.id.toUpperCase()}
              </div>
            </div>

            <button
              onClick={() => handleFlagSuspect(activeSuspect.id)}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all shadow-md flex items-center space-x-2 ${
                flaggedSuspectId === activeSuspect.id
                  ? 'bg-rose-800 text-rose-100 border border-rose-500'
                  : 'bg-amber-600 hover:bg-amber-500 text-slate-950 active:scale-95'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{flaggedSuspectId === activeSuspect.id ? 'Flagged as Prime Suspect' : 'Flag as Prime Suspect'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Bio & Background */}
            <div className="p-4 bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 rounded-xl border border-indigo-500/30 space-y-2 shadow-inner">
              <div className="text-[10px] font-mono font-extrabold text-indigo-400 uppercase tracking-widest flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>POLICE DOSSIER BACKGROUND</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {replaceNames(activeSuspect.bio || `${activeSuspect.defaultName} serves as ${activeSuspect.role} with direct access to the estate grounds and key victims.`, customNames)}
              </p>
            </div>

            {/* Motive & Relationship to Victim */}
            <div className="p-4 bg-gradient-to-br from-slate-950 via-rose-950/30 to-slate-950 rounded-xl border border-rose-500/30 space-y-2 shadow-inner">
              <div className="text-[10px] font-mono font-extrabold text-rose-400 uppercase tracking-widest flex items-center space-x-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>ALLEGED MOTIVE & RELATIONSHIP</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {replaceNames(activeSuspect.motive, customNames)}
              </p>
            </div>

          </div>

          {/* Recorded Alibi & Physical Traits */}
          <div className="p-4 bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-950 rounded-xl border border-emerald-500/30 space-y-2 shadow-inner">
            <div className="text-[10px] font-mono font-extrabold text-emerald-400 uppercase tracking-widest flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>RECORDED NIGHT ALIBI</span>
            </div>
            <p className="text-xs text-slate-200 font-serif italic leading-relaxed">
              "{replaceNames(activeSuspect.alibi, customNames)}"
            </p>
          </div>

          {/* Psychological & Suspicion Assessment Meter */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 shadow-inner">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-amber-400 font-bold flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>SUSPICION LEVEL RATING:</span>
              </span>
              <span className={`font-extrabold text-sm ${
                activeSuspect.suspicionLevel > 70
                  ? 'text-rose-400'
                  : activeSuspect.suspicionLevel > 40
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}>{activeSuspect.suspicionLevel}%</span>
            </div>
            <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-500 shadow-md ${
                  activeSuspect.suspicionLevel > 70
                    ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 shadow-[0_0_12px_rgba(244,63,94,0.7)]'
                    : activeSuspect.suspicionLevel > 40
                    ? 'bg-gradient-to-r from-emerald-500 via-yellow-500 to-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.7)]'
                    : 'bg-gradient-to-r from-teal-500 to-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]'
                }`}
                style={{ width: `${activeSuspect.suspicionLevel}%` }}
              />
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
