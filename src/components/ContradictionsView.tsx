import React, { useState } from 'react';
import { MysteryCase, CustomNames, Suspect, Evidence, SuspectId } from '../types';
import { replaceNames } from '../utils/nameFormatter';
import { ShieldAlert, AlertTriangle, CheckCircle2, Sparkles, MessageSquareText, Search, Zap, Flame } from 'lucide-react';
import { sounds } from '../utils/sound';

interface ContradictionsViewProps {
  currentCase: MysteryCase;
  customNames: CustomNames;
  suspects: Record<string, Suspect>;
  evidenceList: Evidence[];
  onExposeContradiction?: (suspectId: SuspectId) => void;
}

export const ContradictionsView: React.FC<ContradictionsViewProps> = ({
  currentCase,
  customNames,
  suspects,
  evidenceList,
  onExposeContradiction,
}) => {
  const suspectList = Object.values(suspects) as Suspect[];
  const [selectedSuspectId, setSelectedSuspectId] = useState<SuspectId>(suspectList[0]?.id || 'suspect1');
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | null>(null);
  const [contradictionResult, setContradictionResult] = useState<{
    detected: boolean;
    title: string;
    description: string;
  } | null>(null);

  const activeSuspect = suspects[selectedSuspectId] || suspectList[0];
  const customSuspectName = customNames[selectedSuspectId as keyof CustomNames] || activeSuspect?.defaultName || 'Suspect';

  const handleChallengeAlibi = () => {
    sounds.playClueFound();
    if (!selectedEvidenceId) {
      setContradictionResult({
        detected: false,
        title: 'SELECT EVIDENCE TO PRESENT',
        description: 'You must select a piece of physical evidence or digital security log to pit against the suspect\'s statement.',
      });
      return;
    }

    const selectedEv = evidenceList.find(e => e.id === selectedEvidenceId);
    if (!selectedEv) return;

    const evTitle = replaceNames(selectedEv.title, customNames);

    // Check if evidence points to this suspect or if suspect is the killer & evidence is key evidence
    const isDirectMatch = selectedEv.pointsToSuspectId === selectedSuspectId;
    const isKillerKeyEvidence = activeSuspect?.isKiller && selectedEv.isKeyEvidence;

    if (isDirectMatch || isKillerKeyEvidence) {
      sounds.playClueFound();
      setContradictionResult({
        detected: true,
        title: '🚨 ALIBI CONTRADICTION DETECTED!',
        description: `CRUCIAL BREAKTHROUGH: Presenting "${evTitle}" directly shatters ${customSuspectName}'s claim! They stumbled nervously and retracted their previous timeline claim!`,
      });
      if (onExposeContradiction) {
        onExposeContradiction(selectedSuspectId);
      }
    } else {
      setContradictionResult({
        detected: false,
        title: 'NO IMMEDIATE CONTRADICTION',
        description: `${customSuspectName} examined "${evTitle}" calmly: "That has nothing to do with where I was at 10:00 PM, Detective." Try presenting another clue.`,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-rose-500/40 rounded-2xl p-6 shadow-2xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-rose-400">
            <Flame className="w-7 h-7 text-rose-500 animate-pulse" />
            <div>
              <h2 className="text-xl font-serif font-bold text-rose-100">
                ALIBI CONTRADICTION & INTERROGATION PRESS
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Pit recorded suspect statements against retrieved forensic evidence to expose lies
              </p>
            </div>
          </div>
          <div className="px-3 py-1 bg-rose-950/80 border border-rose-600/60 rounded-xl text-xs font-mono text-rose-300 font-bold">
            Detective Press Chamber
          </div>
        </div>
      </div>

      {/* Contradiction Result Banner */}
      {contradictionResult && (
        <div className={`p-5 rounded-2xl border-2 shadow-2xl animate-fadeIn space-y-2 ${
          contradictionResult.detected
            ? 'bg-rose-950/90 border-rose-500 text-rose-100'
            : 'bg-slate-900 border-slate-700 text-slate-200'
        }`}>
          <div className="flex items-center space-x-2 font-mono font-bold text-sm uppercase">
            {contradictionResult.detected ? (
              <ShieldAlert className="w-5 h-5 text-rose-400 animate-bounce" />
            ) : (
              <Zap className="w-5 h-5 text-amber-400" />
            )}
            <span>{contradictionResult.title}</span>
          </div>
          <p className="text-xs sm:text-sm font-sans leading-relaxed">
            {contradictionResult.description}
          </p>
        </div>
      )}

      {/* Main 2-Column Challenge Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Suspect Selection & Recorded Statement */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm font-serif font-bold text-amber-200 flex items-center space-x-2">
              <MessageSquareText className="w-4 h-4 text-amber-500" />
              <span>1. SELECT SUSPECT STATEMENT</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Step 1 of 2</span>
          </div>

          {/* Suspect Selector Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {suspectList.map((s) => {
              const name = customNames[s.id as keyof CustomNames] || s.defaultName;
              const isSelected = selectedSuspectId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedSuspectId(s.id);
                    setContradictionResult(null);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-serif font-bold transition-all text-left border ${
                    isSelected
                      ? 'bg-amber-600 text-slate-950 border-amber-400 shadow-lg scale-102'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="truncate">{name}</div>
                  <div className="text-[9px] font-mono opacity-80">{s.role}</div>
                </button>
              );
            })}
          </div>

          {/* Recorded Alibi Statement Box */}
          {activeSuspect && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                RECORDED ALIBI STATEMENT ({customSuspectName})
              </div>
              <p className="text-xs sm:text-sm font-serif italic text-slate-200 leading-relaxed">
                "{replaceNames(activeSuspect.alibi, customNames)}"
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Physical Evidence Selection */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm font-serif font-bold text-amber-200 flex items-center space-x-2">
              <Search className="w-4 h-4 text-amber-500" />
              <span>2. SELECT CONTRADICTORY EVIDENCE</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Step 2 of 2</span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {evidenceList.map((ev) => {
              const title = replaceNames(ev.title, customNames);
              const isSelected = selectedEvidenceId === ev.id;

              return (
                <div
                  key={ev.id}
                  onClick={() => {
                    setSelectedEvidenceId(ev.id);
                    setContradictionResult(null);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-rose-950/80 border-rose-500 text-rose-100 shadow-md scale-101'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-serif font-bold flex items-center space-x-1.5">
                      <span>{ev.isKeyEvidence ? '🔑' : '🔍'}</span>
                      <span>{title}</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 truncate max-w-xs">
                      {replaceNames(ev.description, customNames)}
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />}
                </div>
              );
            })}
          </div>

          {/* Action Challenge Button */}
          <button
            onClick={handleChallengeAlibi}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-700 to-red-800 hover:from-rose-600 hover:to-red-700 text-white font-mono font-bold text-xs shadow-xl border border-rose-500/50 transition-all active:scale-98 flex items-center justify-center space-x-2"
          >
            <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>CHALLENGE ALIBI WITH SELECTED EVIDENCE</span>
          </button>
        </div>

      </div>

    </div>
  );
};
