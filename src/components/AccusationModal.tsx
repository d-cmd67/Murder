import React, { useState } from 'react';
import { MysteryCase, SuspectId, CustomNames, Evidence } from '../types';
import { replaceNames } from '../utils/nameFormatter';
import { Gavel, AlertTriangle, ShieldCheck, Award, RotateCcw, XCircle, CheckCircle2, Flame, Shuffle, Layers, Shield } from 'lucide-react';
import { sounds } from '../utils/sound';

interface AccusationModalProps {
  currentCase: MysteryCase;
  customNames: CustomNames;
  evidenceList: Evidence[];
  onClose: () => void;
  onResetCase: () => void;
  onShuffleKiller?: () => void;
}

export const AccusationModal: React.FC<AccusationModalProps> = ({
  currentCase,
  customNames,
  evidenceList,
  onClose,
  onResetCase,
  onShuffleKiller,
}) => {
  const [selectedSuspectIds, setSelectedSuspectIds] = useState<SuspectId[]>([]);
  const [selectedMotive, setSelectedMotive] = useState<string>('debt');
  const [selectedWeapon, setSelectedWeapon] = useState<string>('blunt');
  const [selectedEvidenceIds, setSelectedEvidenceIds] = useState<string[]>([]);
  const [verdictOutcome, setVerdictOutcome] = useState<{
    solved: boolean;
    rank: string;
    score: number;
    title: string;
    description: string;
  } | null>(null);

  const suspectKeys = Object.keys(currentCase.suspects) as SuspectId[];
  const discoveredEvidence = evidenceList.filter((e) => e.discovered);

  const getCustomName = (id: SuspectId) => {
    return customNames[id as keyof CustomNames] || currentCase.suspects[id]?.defaultName || 'Suspect';
  };

  const toggleSuspectSelect = (id: SuspectId) => {
    sounds.playClick();
    if (selectedSuspectIds.includes(id)) {
      setSelectedSuspectIds((prev) => prev.filter((s) => s !== id));
    } else {
      if (selectedSuspectIds.length >= 2) {
        setSelectedSuspectIds(([_, second]) => [second, id]);
      } else {
        setSelectedSuspectIds((prev) => [...prev, id]);
      }
    }
  };

  const toggleEvidenceSelect = (id: string) => {
    sounds.playClick();
    if (selectedEvidenceIds.includes(id)) {
      setSelectedEvidenceIds((prev) => prev.filter((e) => e !== id));
    } else {
      if (selectedEvidenceIds.length >= 2) {
        setSelectedEvidenceIds(([_, second]) => [second, id]);
      } else {
        setSelectedEvidenceIds((prev) => [...prev, id]);
      }
    }
  };

  const handleAccuse = () => {
    if (selectedSuspectIds.length === 0) return;
    sounds.playAccusationGavel();

    const actualKiller1 = currentCase.killerId;
    const actualKiller2 = currentCase.killerId2 || currentCase.killerId;

    const killer1Name = getCustomName(actualKiller1);
    const killer2Name = getCustomName(actualKiller2);

    const caughtKiller1 = selectedSuspectIds.includes(actualKiller1);
    const caughtKiller2 = selectedSuspectIds.includes(actualKiller2);

    let correctCount = 0;
    if (caughtKiller1) correctCount++;
    if (caughtKiller2 && actualKiller2 !== actualKiller1) correctCount++;

    const accusedNames = selectedSuspectIds.map(getCustomName).join(' & ');

    if (correctCount === 2 || (correctCount === 1 && actualKiller1 === actualKiller2)) {
      setVerdictOutcome({
        solved: true,
        rank: 'Rank S - Master Sleuths (100% Accuracy)',
        score: 100,
        title: 'PERFECT SOLUTION — CONSPIRACY UNMASKED IN COURT',
        description: `Under intense cross-examination from Detective ${customNames.detective} and Detective ${customNames.detective2 || 'Partner'}, both co-conspirators (${killer1Name} & ${killer2Name}) broke down and confessed in court!\n\n` +
          `5/5 DEDUCTIONS CORRECT [Master Detective Dual Conviction]\n\n` +
          replaceNames(currentCase.solutionExplanation, customNames),
      });
    } else if (correctCount === 1) {
      setVerdictOutcome({
        solved: true,
        rank: 'Rank B - Partial Conviction (Caught 1 of 2 Killers)',
        score: 65,
        title: 'PARTIAL SOLUTION — CAUGHT 1 CULPRIT, BUT ACCOMPLICE ESCAPED',
        description: `You successfully identified one of the killers (${caughtKiller1 ? killer1Name : killer2Name}), but their co-conspirator (${!caughtKiller1 ? killer1Name : killer2Name}) slipped past border security.\n\n` +
          `DEDUCTION SUMMARY: 1 of 2 co-conspirator killers arrested.\n\n` +
          replaceNames(currentCase.solutionExplanation, customNames),
      });
    } else {
      setVerdictOutcome({
        solved: false,
        rank: 'Rank F - Wrong Arrest Warrant',
        score: 15,
        title: 'WRONG ACCUSATION — THE EVIDENCE CONTRADICTS YOUR THEORY',
        description: `Your formal arrest warrants against ${accusedNames} collapsed in court when security footage verified their alibis.\n\n` +
          `The real co-conspirator killers were actually ${killer1Name} and ${killer2Name}!\n\n` +
          replaceNames(currentCase.solutionExplanation, customNames),
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border-2 border-rose-600/60 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 border-b border-rose-900/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400">
              <Gavel className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-rose-200">
                Formal Arrest Warrant & Crime Reconstruction
              </h2>
              <p className="text-xs text-rose-300/80">
                Reconstruct the murder of {customNames.victim} and present decisive proof in court.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {verdictOutcome ? (
            /* Result Reveal Screen */
            <div className="space-y-6 text-center py-4">
              <div className="inline-flex p-4 rounded-full bg-slate-950 border border-amber-500/40 shadow-2xl">
                {verdictOutcome.solved ? (
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
                ) : (
                  <XCircle className="w-16 h-16 text-rose-500 animate-pulse" />
                )}
              </div>

              <div>
                <h3 className={`text-xl sm:text-2xl font-serif font-bold ${
                  verdictOutcome.solved ? 'text-emerald-300' : 'text-rose-400'
                }`}>
                  {verdictOutcome.title}
                </h3>
                <p className="text-xs font-mono text-amber-400 mt-1 uppercase tracking-widest">
                  {verdictOutcome.rank}
                </p>
              </div>

              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-left text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {verdictOutcome.description}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
                {onShuffleKiller && (
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onShuffleKiller();
                      onClose();
                    }}
                    className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-950 transition-all active:scale-95 w-full sm:w-auto justify-center"
                  >
                    <Shuffle className="w-4 h-4" />
                    <span>🔀 Re-Shuffle Killer & Play Again</span>
                  </button>
                )}
                <button
                  onClick={onResetCase}
                  className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-lg transition-all active:scale-95 w-full sm:w-auto justify-center"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Choose Another Case</span>
                </button>
              </div>
            </div>
          ) : (
            /* Multi-Part Reconstruction Form */
            <div className="space-y-6">
              
              {/* Step 1: Select Up to 2 Suspects (Duo Killers) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                    1. SELECT CO-CONSPIRATOR SUSPECTS TO ARREST:
                  </span>
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                    Selected: {selectedSuspectIds.length}/2
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1 custom-scrollbar">
                  {suspectKeys.map((id) => {
                    const name = getCustomName(id);
                    const s = currentCase.suspects[id];
                    const isSelected = selectedSuspectIds.includes(id);
                    const selIndex = selectedSuspectIds.indexOf(id);

                    return (
                      <div
                        key={id}
                        onClick={() => toggleSuspectSelect(id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 border-rose-400 text-rose-100 shadow-xl ring-2 ring-rose-500/40'
                            : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-serif font-bold text-amber-100">
                              {name}
                            </h4>
                            {isSelected && (
                              <span className="text-[9px] font-mono bg-rose-900 border border-rose-500 text-rose-200 px-1.5 py-0.5 rounded font-bold">
                                {selIndex === 0 ? 'MASTERMIND' : 'ACCOMPLICE'}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400">{s.role}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="text-rose-600 focus:ring-rose-500"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Motive Reconstruction */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  2. PRIMARY MURDER MOTIVE:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'debt', label: '💸 Inheritance Debt Crisis' },
                    { id: 'patent', label: '💻 AI Patent / IP Theft' },
                    { id: 'embezzle', label: '📊 Audit Embezzlement Coverup' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMotive(m.id)}
                      className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                        selectedMotive === m.id
                          ? 'bg-amber-950 border-amber-500 text-amber-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Present 2 Pieces of Key Evidence */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    3. PRESENT 2 PIECES OF DECISIVE PHYSICAL EVIDENCE:
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Selected: {selectedEvidenceIds.length}/2
                  </span>
                </div>

                {discoveredEvidence.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 text-xs text-center">
                    No physical evidence discovered yet! You can still accuse, but evidence strengthens your conviction.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                    {discoveredEvidence.map((ev) => {
                      const isSelected = selectedEvidenceIds.includes(ev.id);

                      return (
                        <div
                          key={ev.id}
                          onClick={() => toggleEvidenceSelect(ev.id)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-amber-950/80 border-amber-500 text-amber-100'
                              : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400'
                          }`}
                        >
                          <div className="truncate pr-2">
                            <h5 className="text-xs font-serif font-bold text-amber-200 truncate">
                              {replaceNames(ev.title, customNames)}
                            </h5>
                            <p className="text-[10px] text-slate-400 truncate">
                              Found: {replaceNames(ev.locationFound, customNames)}
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="text-amber-600 focus:ring-amber-500"
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        {!verdictOutcome && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleAccuse}
              disabled={selectedSuspectIds.length === 0}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-600 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-rose-950 transition-all active:scale-95"
            >
              <Gavel className="w-4 h-4" />
              <span>Issue Formal Arrest Warrant</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
