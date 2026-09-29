import React, { useState } from 'react';
import { MysteryCase, CustomNames, Suspect, SuspectId } from '../types';
import { replaceNames } from '../utils/nameFormatter';
import { DollarSign, Award, Heart, ShieldAlert, Zap, Flame, Lock } from 'lucide-react';
import { sounds } from '../utils/sound';

interface MotiveMatrixViewProps {
  currentCase: MysteryCase;
  customNames: CustomNames;
  suspects: Record<string, Suspect>;
}

export const MotiveMatrixView: React.FC<MotiveMatrixViewProps> = ({
  currentCase,
  customNames,
  suspects,
}) => {
  const suspectList = Object.values(suspects) as Suspect[];
  const [selectedSuspectId, setSelectedSuspectId] = useState<SuspectId>(suspectList[0]?.id || 'suspect1');
  const [motiveEvaluation, setMotiveEvaluation] = useState<string | null>(null);

  const activeSuspect = suspects[selectedSuspectId] || suspectList[0];
  const activeCustomName = customNames[selectedSuspectId as keyof CustomNames] || activeSuspect?.defaultName || 'Suspect';

  const handleEvaluateMotive = (suspect: Suspect) => {
    sounds.playClueFound();
    const name = customNames[suspect.id as keyof CustomNames] || suspect.defaultName;

    if (suspect.isKiller) {
      setMotiveEvaluation(`🔥 HIGH RISK MOTIVE THREAT LEVEL (CRITICAL): ${name} faced imminent exposure regarding estate embezzlement and academic falsification. Their financial survival depended entirely on silencing the victim before 10:30 PM!`);
    } else {
      setMotiveEvaluation(`⚠️ MODERATE MOTIVE THREAT LEVEL: ${name} had minor personal grievances, but lack the financial desperation or career-ending threat necessary to commit premeditated murder.`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3 text-amber-400">
          <Flame className="w-7 h-7 text-amber-500" />
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-100 uppercase tracking-wider">
              MOTIVE & FINANCIAL THREAT MATRIX
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Cross-reference Financial Debt, Inheritance Wills, Revenge & Blackmail Threats
            </p>
          </div>
        </div>
        <div className="px-3 py-1 bg-amber-950/80 border border-amber-600/60 rounded-xl text-xs font-mono text-amber-300 font-bold">
          Detective Threat Board
        </div>
      </div>

      {/* Motive Evaluation Result Modal */}
      {motiveEvaluation && (
        <div className="p-4 bg-amber-950/90 border-2 border-amber-500 rounded-xl text-amber-100 text-xs font-mono font-bold shadow-2xl animate-fadeIn flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />
            <span>{motiveEvaluation}</span>
          </div>
          <button
            onClick={() => setMotiveEvaluation(null)}
            className="text-slate-400 hover:text-white px-2 py-1 bg-slate-900 rounded"
          >
            ✕
          </button>
        </div>
      )}

      {/* Suspect Motive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Suspect Selector List */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-3">
          <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2">
            SUSPECT MOTIVE AUDIT LIST
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
            {suspectList.map((s) => {
              const name = customNames[s.id as keyof CustomNames] || s.defaultName;
              const isSelected = selectedSuspectId === s.id;

              return (
                <div
                  key={s.id}
                  onClick={() => {
                    sounds.playClueFound();
                    setSelectedSuspectId(s.id);
                    setMotiveEvaluation(null);
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-amber-400 text-amber-100 shadow-xl scale-[1.02] ring-2 ring-amber-500/50'
                      : 'bg-slate-950/80 border-slate-800 hover:border-amber-500/40 text-slate-300'
                  }`}
                >
                  <div>
                    <div className={`font-serif font-bold text-xs ${isSelected ? 'text-amber-200' : ''}`}>{name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{s.role}</div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    s.isKiller ? 'bg-rose-950 text-rose-300 border border-rose-600' : 'bg-slate-900 text-slate-400'
                  }`}>
                    {s.isKiller ? 'High Threat' : 'Low Threat'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Motive Deep Breakdown */}
        {activeSuspect && (
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold text-amber-100">
                  {activeCustomName}
                </h3>
                <div className="text-xs font-mono text-slate-400">
                  Motive Profile Breakdown & Financial Vulnerability
                </div>
              </div>

              <button
                onClick={() => handleEvaluateMotive(activeSuspect)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold font-mono rounded-xl shadow-md transition-all active:scale-95 flex items-center space-x-1"
              >
                <Zap className="w-4 h-4" />
                <span>Evaluate Threat</span>
              </button>
            </div>

            {/* Motive Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center space-x-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>FINANCIAL INTEREST</span>
                </div>
                <div className="text-xs text-slate-300 font-sans">
                  {activeSuspect.isKiller ? 'Imminent debt default & revoked inheritance trust' : 'Stable salary & modest savings'}
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>CAREER / AUDIT RISK</span>
                </div>
                <div className="text-xs text-slate-300 font-sans">
                  {activeSuspect.isKiller ? 'Imminent expulsion and public fraud exposure' : 'Minor academic competition'}
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-widest flex items-center space-x-1">
                  <Heart className="w-3.5 h-3.5" />
                  <span>PERSONAL RESENTMENT</span>
                </div>
                <div className="text-xs text-slate-300 font-sans">
                  {replaceNames(activeSuspect.motive, customNames)}
                </div>
              </div>
            </div>

            {/* Summary Narrative */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                DETECTIVE ANALYSIS NOTE
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-serif">
                "{replaceNames(activeSuspect.bio || `${activeSuspect.defaultName} is under scrutiny for suspicious presence at the estate.`, customNames)}"
              </p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
