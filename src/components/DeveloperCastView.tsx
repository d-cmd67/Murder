import React, { useState } from 'react';
import { MysteryCase, CustomNames, SuspectId, Suspect } from '../types';
import { replaceNames } from '../utils/nameFormatter';
import { 
  ShieldAlert, 
  Terminal, 
  CheckCircle2, 
  KeyRound, 
  Lock, 
  Unlock, 
  Users, 
  Crown, 
  Sparkles, 
  Edit3, 
  AlertTriangle,
  RotateCcw,
  Zap,
  Eye,
  Check
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface DeveloperCastViewProps {
  currentCase: MysteryCase;
  customNames: CustomNames;
  onUpdateCustomNames: (names: CustomNames) => void;
  onUpdateSuspects: (suspects: Record<SuspectId, Suspect>) => void;
  onChangeKiller: (killerId: SuspectId, killerId2?: SuspectId) => void;
  isDeveloperUnlocked: boolean;
  onUnlockDeveloperCode: (code: string) => boolean;
}

export const DeveloperCastView: React.FC<DeveloperCastViewProps> = ({
  currentCase,
  customNames,
  onUpdateCustomNames,
  onUpdateSuspects,
  onChangeKiller,
  isDeveloperUnlocked,
  onUnlockDeveloperCode,
}) => {
  const [inputCode, setInputCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [activeTab, setActiveTab] = useState<'ROSTER' | 'CAST_EDIT' | 'DEBUG' | 'SOLUTION'>('ROSTER');
  const [editedNames, setEditedNames] = useState<CustomNames>({ ...customNames });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const suspectKeys = Object.keys(currentCase.suspects) as SuspectId[];
  const actualKillerId = currentCase.killerId;
  const actualKillerId2 = currentCase.killerId2 || currentCase.killerId;

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onUnlockDeveloperCode(inputCode.trim());
    if (success) {
      sounds.playClueFound();
      setCodeError(false);
      setInputCode('');
    } else {
      sounds.playClick();
      setCodeError(true);
    }
  };

  const handleSaveNames = () => {
    sounds.playPaperFlip();
    onUpdateCustomNames(editedNames);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleNameFieldChange = (key: keyof CustomNames, val: string) => {
    setEditedNames(prev => ({ ...prev, [key]: val }));
  };

  const getSuspectDisplayName = (id: SuspectId) => {
    const suspectObj = currentCase.suspects[id];
    if (customNames[id]) return customNames[id]!;
    if (suspectObj?.defaultName) return replaceNames(suspectObj.defaultName, customNames);
    return id;
  };

  if (!isDeveloperUnlocked) {
    return (
      <div className="max-w-3xl mx-auto my-12 px-4 animate-fadeIn">
        <div className="bg-slate-900 border-2 border-amber-500/60 rounded-2xl p-8 shadow-2xl space-y-6 text-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Lock className="w-64 h-64 text-amber-500" />
          </div>

          <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
            <div className="p-3 bg-amber-950 border border-amber-500/50 rounded-xl text-amber-400">
              <KeyRound className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest">
                RESTRICTED DEVELOPER ACCESS
              </div>
              <h2 className="text-2xl font-serif font-bold text-amber-100">
                Developer Cast & Truth Matrix Locked
              </h2>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Enter the 6-digit developer access passcode to unlock developer cast tabs, true culprit overrides, secret role matrix, and full character customization.
          </p>

          <form onSubmit={handleCodeSubmit} className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-mono font-bold text-amber-400 uppercase mb-2">
                Developer Passcode (6 Digits)
              </label>
              <div className="flex space-x-2">
                <input
                  type="password"
                  maxLength={10}
                  value={inputCode}
                  onChange={(e) => {
                    setInputCode(e.target.value);
                    if (codeError) setCodeError(false);
                  }}
                  placeholder="Enter passcode"
                  className="flex-1 bg-slate-950 border-2 border-amber-600/50 focus:border-amber-400 rounded-xl px-4 py-3 text-lg font-mono tracking-widest text-amber-200 placeholder:text-slate-600 focus:outline-none transition-all shadow-inner"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-mono font-bold text-sm rounded-xl shadow-lg transition-all active:scale-95 flex items-center space-x-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Activate</span>
                </button>
              </div>
              {codeError && (
                <p className="text-xs text-rose-400 font-mono mt-2 flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Invalid developer passcode</span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-slate-100 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 border-2 border-amber-500/80 rounded-2xl p-6 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500 text-amber-300 shadow-inner">
            <Zap className="w-8 h-8 text-amber-400 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                ⚡ DEVELOPER CODE 888513 ACTIVE
              </span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-amber-100 mt-1">
              Developer Cast Tabs & Case Secrets Console
            </h1>
            <p className="text-xs text-slate-300">
              Full developer override access to cast roles, killer assignments, custom character names, and solution truth.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono text-amber-400/80 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            Case: {currentCase.title}
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-800 bg-slate-900/60 p-1.5 rounded-xl gap-2">
        <button
          onClick={() => setActiveTab('ROSTER')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'ROSTER'
              ? 'bg-amber-600 text-slate-950 shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Cast Truth Roster</span>
        </button>

        <button
          onClick={() => setActiveTab('CAST_EDIT')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'CAST_EDIT'
              ? 'bg-amber-600 text-slate-950 shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Cast Name Editor</span>
        </button>

        <button
          onClick={() => setActiveTab('DEBUG')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'DEBUG'
              ? 'bg-amber-600 text-slate-950 shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Crown className="w-4 h-4" />
          <span>Culprit Override</span>
        </button>

        <button
          onClick={() => setActiveTab('SOLUTION')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'SOLUTION'
              ? 'bg-amber-600 text-slate-950 shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Full Solution Reveal</span>
        </button>
      </div>

      {/* Tab 1: Cast Truth Roster */}
      {activeTab === 'ROSTER' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-serif font-bold text-amber-200 flex items-center space-x-2">
                <Users className="w-5 h-5 text-amber-400" />
                <span>Cast Roles & Truth Matrix</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {suspectKeys.length} Cast Suspects Listed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suspectKeys.map((sId) => {
                const s = currentCase.suspects[sId];
                const isKiller1 = sId === actualKillerId;
                const isKiller2 = sId === actualKillerId2 && actualKillerId2 !== actualKillerId;
                const isKiller = isKiller1 || isKiller2;
                const displayName = getSuspectDisplayName(sId);

                return (
                  <div
                    key={sId}
                    className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                      isKiller
                        ? 'bg-rose-950/40 border-rose-500/80 shadow-lg shadow-rose-950/50'
                        : 'bg-slate-950/80 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">
                          {sId}
                        </span>
                        {isKiller1 ? (
                          <span className="px-2 py-0.5 rounded-full bg-rose-900 text-rose-200 text-[10px] font-mono font-bold flex items-center space-x-1 border border-rose-500">
                            <Crown className="w-3 h-3 text-amber-400" />
                            <span>PRIMARY MASTERMIND</span>
                          </span>
                        ) : isKiller2 ? (
                          <span className="px-2 py-0.5 rounded-full bg-purple-900 text-purple-200 text-[10px] font-mono font-bold flex items-center space-x-1 border border-purple-500">
                            <Crown className="w-3 h-3 text-amber-300" />
                            <span>CO-CONSPIRATOR</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono">
                            Innocent
                          </span>
                        )}
                      </div>

                      <div className="mt-2">
                        <h4 className="text-base font-serif font-bold text-amber-100">
                          {displayName}
                        </h4>
                        <p className="text-xs text-amber-400/90 font-mono">
                          {replaceNames(s.role, customNames)}
                        </p>
                      </div>

                      <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                        <div>
                          <span className="text-slate-500 font-mono block text-[10px] uppercase">
                            Motive:
                          </span>
                          <span>{replaceNames(s.motive, customNames)}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-mono block text-[10px] uppercase">
                            Alibi Claim:
                          </span>
                          <span className="italic">{replaceNames(s.alibi, customNames)}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-mono block text-[10px] uppercase">
                            Secret:
                          </span>
                          <span className="text-amber-300/90">{replaceNames(s.secret, customNames)}</span>
                        </div>
                      </div>
                    </div>

                    {!isKiller1 && (
                      <div className="flex space-x-1 mt-2">
                        <button
                          onClick={() => {
                            sounds.playClick();
                            onChangeKiller(sId, actualKillerId2);
                          }}
                          className="flex-1 py-1 bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-200 text-[10px] font-mono rounded border border-slate-700 hover:border-rose-500 transition-all"
                        >
                          Set Mastermind
                        </button>
                        {!isKiller2 && (
                          <button
                            onClick={() => {
                              sounds.playClick();
                              onChangeKiller(actualKillerId, sId);
                            }}
                            className="flex-1 py-1 bg-slate-800 hover:bg-purple-950 text-slate-300 hover:text-purple-200 text-[10px] font-mono rounded border border-slate-700 hover:border-purple-500 transition-all"
                          >
                            Set Accomplice
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Cast Name Editor */}
      {activeTab === 'CAST_EDIT' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-lg font-serif font-bold text-amber-200 flex items-center space-x-2">
                <Edit3 className="w-5 h-5 text-amber-400" />
                <span>Developer Cast Name Batch Editor</span>
              </h3>
              <p className="text-xs text-slate-400">
                Override character names across all clues, dialogues, and case evidence.
              </p>
            </div>
            {saveSuccess && (
              <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-500 rounded-xl text-xs font-mono font-bold flex items-center space-x-1 animate-fadeIn">
                <Check className="w-3.5 h-3.5" />
                <span>Cast Names Saved!</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-amber-400 uppercase mb-1">
                🕵️ Primary Detective
              </label>
              <input
                type="text"
                value={editedNames.detective}
                onChange={(e) => handleNameFieldChange('detective', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-indigo-400 uppercase mb-1">
                🕵️ Secondary Detective / Partner
              </label>
              <input
                type="text"
                value={editedNames.detective2 || ''}
                onChange={(e) => handleNameFieldChange('detective2', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-indigo-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-rose-400 uppercase mb-1">
                💀 Victim
              </label>
              <input
                type="text"
                value={editedNames.victim}
                onChange={(e) => handleNameFieldChange('victim', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-rose-200 focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">
                🏰 Crime Location
              </label>
              <input
                type="text"
                value={editedNames.location}
                onChange={(e) => handleNameFieldChange('location', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            {suspectKeys.map((sId, index) => (
              <div key={sId}>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">
                  👤 Suspect #{index + 1} ({sId})
                </label>
                <input
                  type="text"
                  value={editedNames[sId] || ''}
                  onChange={(e) => handleNameFieldChange(sId, e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={handleSaveNames}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95 flex items-center space-x-2"
            >
              <Check className="w-4 h-4" />
              <span>Apply & Save Cast Names</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Culprit Override */}
      {activeTab === 'DEBUG' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-serif font-bold text-amber-200 flex items-center space-x-2">
              <Crown className="w-5 h-5 text-rose-400" />
              <span>Case Culprit Debug Override</span>
            </h3>
            <p className="text-xs text-slate-400">
              Select which suspect is designated as the true murderer for the current active mystery case.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-rose-900/50 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase block">Current Designated Killer:</span>
              <span className="text-lg font-serif font-bold text-rose-300">
                {getSuspectDisplayName(actualKillerId)} ({actualKillerId})
              </span>
            </div>
            <span className="px-3 py-1 bg-rose-950 border border-rose-500 text-rose-300 text-xs font-mono font-bold rounded-xl">
              ACTIVE CULPRIT
            </span>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              Select New Killer Override:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {suspectKeys.map((sId) => {
                const name = getSuspectDisplayName(sId);
                const isSelected = sId === actualKillerId;
                return (
                  <button
                    key={sId}
                    onClick={() => {
                      sounds.playClick();
                      onChangeKiller(sId);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-rose-950 border-rose-500 text-rose-100 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-amber-500'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 block">{sId}</span>
                      <span className="text-xs font-bold font-serif">{name}</span>
                    </div>
                    {isSelected && <Crown className="w-4 h-4 text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Full Solution Reveal */}
      {activeTab === 'SOLUTION' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-serif font-bold text-amber-200 flex items-center space-x-2">
              <Eye className="w-5 h-5 text-amber-400" />
              <span>Full Case Solution & Forensic Explanation</span>
            </h3>
            <p className="text-xs text-slate-400">
              Developer revelation of the exact sequence of events, killer motive, and decisive physical clue.
            </p>
          </div>

          <div className="p-5 bg-slate-950 rounded-xl border border-amber-900/50 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 font-bold uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Solution Deduction Narrative:</span>
            </div>
            <p className="text-sm text-amber-100 font-serif leading-relaxed">
              {replaceNames(currentCase.solutionExplanation, customNames)}
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
            <span className="font-mono text-slate-400 font-bold uppercase block">CASE METRICS SUMMARY:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Time of Death:</span>
                <span className="text-amber-300 font-bold">{currentCase.timeOfDeath}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Cause of Death:</span>
                <span className="text-amber-300 font-bold">{currentCase.causeOfDeath}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Killer ID:</span>
                <span className="text-rose-400 font-bold">{actualKillerId}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Killer Name:</span>
                <span className="text-amber-300 font-bold">{getSuspectDisplayName(actualKillerId)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
