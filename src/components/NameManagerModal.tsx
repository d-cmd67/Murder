import React, { useState } from 'react';
import { CustomNames, ALL_SUSPECT_IDS } from '../types';
import { PRESET_NAME_PACKAGES } from '../utils/nameFormatter';
import { UserCheck, Sparkles, Check, X, ShieldAlert, Users, RefreshCw, KeyRound, Unlock, Zap, Crown } from 'lucide-react';
import { sounds } from '../utils/sound';

interface NameManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customNames: CustomNames;
  onSaveNames: (newNames: CustomNames) => void;
  isDeveloperUnlocked?: boolean;
  onUnlockDeveloperCode?: (code: string) => boolean;
  killerId?: string;
}

export const NameManagerModal: React.FC<NameManagerModalProps> = ({
  isOpen,
  onClose,
  customNames,
  onSaveNames,
  isDeveloperUnlocked = false,
  onUnlockDeveloperCode,
  killerId,
}) => {
  const [formData, setFormData] = useState<CustomNames>({ ...customNames });
  const [activeTab, setActiveTab] = useState<'FORM' | 'PRESETS' | 'DEV_CODE' | 'CAST_TRUTH'>('FORM');
  const [devCodeInput, setDevCodeInput] = useState('');
  const [devCodeError, setDevCodeError] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof CustomNames, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyPreset = (pkg: typeof PRESET_NAME_PACKAGES[0]) => {
    sounds.playClick();
    setFormData({ ...pkg.names });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playPaperFlip();
    onSaveNames(formData);
    onClose();
  };

  const handleDevCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUnlockDeveloperCode) {
      const success = onUnlockDeveloperCode(devCodeInput.trim());
      if (success) {
        sounds.playClueFound();
        setDevCodeError(false);
        setDevCodeInput('');
        setActiveTab('CAST_TRUTH');
      } else {
        sounds.playClick();
        setDevCodeError(true);
      }
    } else if (devCodeInput.trim() === '888513') {
      sounds.playClueFound();
      setDevCodeError(false);
      setDevCodeInput('');
      setActiveTab('CAST_TRUTH');
    } else {
      sounds.playClick();
      setDevCodeError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-amber-600/40 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 border-b border-amber-900/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-serif font-bold text-amber-200">
                  Provide & Custom Character Names
                </h2>
                {isDeveloperUnlocked && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 text-[10px] font-mono font-bold flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>DEV CODE 888513</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-400/80">
                Specify custom names for the detective, victim, and suspects at any time.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex flex-wrap border-b border-slate-800 bg-slate-950/50 px-5 pt-3 gap-1">
          <button
            onClick={() => setActiveTab('FORM')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'FORM'
                ? 'border-amber-500 text-amber-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Custom Name Inputs
          </button>
          <button
            onClick={() => setActiveTab('PRESETS')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'PRESETS'
                ? 'border-amber-500 text-amber-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Quick Name Packages
          </button>
          
          <button
            onClick={() => setActiveTab(isDeveloperUnlocked ? 'CAST_TRUTH' : 'DEV_CODE')}
            className={`pb-3 px-4 text-xs font-mono font-bold border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'DEV_CODE' || activeTab === 'CAST_TRUTH'
                ? 'border-amber-500 text-amber-300'
                : 'border-transparent text-amber-500/80 hover:text-amber-300'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>{isDeveloperUnlocked ? '⚡ Cast Truth (Dev)' : '⚡ Developer Code'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'FORM' && (
            <form id="name-form" onSubmit={handleSubmit} className="space-y-4">
              
              {/* Lead Roles Section */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider block">
                  Lead Roles
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      🕵️ Lead Detective Name
                    </label>
                    <input
                      type="text"
                      value={formData.detective}
                      onChange={(e) => handleChange('detective', e.target.value)}
                      placeholder="e.g. Detective Vance"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-amber-100 focus:outline-none focus:border-amber-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      🕵️ Partner Detective Name
                    </label>
                    <input
                      type="text"
                      value={formData.detective2 || ''}
                      onChange={(e) => handleChange('detective2', e.target.value)}
                      placeholder="e.g. Inspector Devrik Basu"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-indigo-200 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      💀 Victim Name
                    </label>
                    <input
                      type="text"
                      value={formData.victim}
                      onChange={(e) => handleChange('victim', e.target.value)}
                      placeholder="e.g. Lord Sterling"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-rose-200 focus:outline-none focus:border-rose-500 transition-colors"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    🏰 Crime Scene / Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="e.g. Blackwood Manor"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Suspects Section */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider block">
                  Suspect Names (Will replace in conversation & clues)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ALL_SUSPECT_IDS.map((key, idx) => {
                    const val = formData[key] ?? '';
                    return (
                      <div key={key}>
                        <label className="block text-xs text-slate-400 mb-1">
                          👤 Suspect #{idx + 1} Name
                        </label>
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => handleChange(key, e.target.value)}
                          placeholder={`e.g. Suspect #${idx + 1}`}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

            </form>
          )}

          {activeTab === 'PRESETS' && (
            /* Presets Tab */
            <div className="space-y-3">
              <p className="text-xs text-slate-400 mb-2">
                Click any preset theme to load pre-formatted character name packages:
              </p>
              {PRESET_NAME_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => handleApplyPreset(pkg)}
                  className="p-4 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/50 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div>
                    <h3 className="text-sm font-serif font-bold text-amber-200 group-hover:text-amber-300">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-400">{pkg.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <span className="text-[10px] bg-slate-900 text-amber-400 px-2 py-0.5 rounded border border-slate-700">
                        Victim: {pkg.names.victim}
                      </span>
                      <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                        Suspects: {pkg.names.suspect1}, {pkg.names.suspect2}, {pkg.names.suspect3}, {pkg.names.suspect4}
                      </span>
                    </div>
                  </div>
                  <Sparkles className="w-5 h-5 text-amber-500/50 group-hover:text-amber-400 transition-colors" />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'DEV_CODE' && !isDeveloperUnlocked && (
            <div className="p-4 bg-slate-950 rounded-xl border border-amber-600/40 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-amber-950 border border-amber-500 rounded-xl text-amber-400">
                  <KeyRound className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-bold text-amber-100">
                    Enter Developer Access Code
                  </h3>
                  <p className="text-xs text-slate-400">
                    Activate developer mode to unlock special cast tabs, true culprit indicators, and developer tools.
                  </p>
                </div>
              </div>

              <form onSubmit={handleDevCodeSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-amber-400 uppercase mb-1">
                    Passcode (6 Digits)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="password"
                      maxLength={10}
                      value={devCodeInput}
                      onChange={(e) => {
                        setDevCodeInput(e.target.value);
                        setDevCodeError(false);
                      }}
                      placeholder="e.g. 888513"
                      className="flex-1 bg-slate-900 border border-amber-600/50 focus:border-amber-400 rounded-xl px-3 py-2 text-sm font-mono tracking-widest text-amber-200 placeholder:text-slate-600 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-mono font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center space-x-1.5"
                    >
                      <Unlock className="w-3.5 h-3.5" />
                      <span>Unlock Dev</span>
                    </button>
                  </div>
                  {devCodeError && (
                    <p className="text-xs text-rose-400 font-mono mt-1.5">
                      ❌ Incorrect developer code. Enter developer passcode: 888513
                    </p>
                  )}
                </div>
              </form>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-slate-400">
                💡 Developer passcode: <span className="text-amber-300 font-bold">888513</span>
              </div>
            </div>
          )}

          {(activeTab === 'CAST_TRUTH' || (activeTab === 'DEV_CODE' && isDeveloperUnlocked)) && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-950/60 border border-emerald-500/60 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-emerald-300">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="font-bold">DEVELOPER ACCESS UNLOCKED (CODE 888513)</span>
                </div>
                <span className="text-[10px] bg-emerald-900/80 text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-500">
                  Cast Truth Tabs Active
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Secret Cast Role Matrix & Killer Reveal:
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ALL_SUSPECT_IDS.map((sId, idx) => {
                    const name = formData[sId] || `Suspect #${idx + 1}`;
                    const isKiller = killerId === sId;
                    return (
                      <div
                        key={sId}
                        className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                          isKiller
                            ? 'bg-rose-950/80 border-rose-500 text-rose-100 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div>
                          <span className="text-[10px] font-mono text-slate-500 block">{sId}</span>
                          <span className="font-serif font-bold text-sm">{name}</span>
                        </div>
                        {isKiller ? (
                          <span className="px-2 py-0.5 rounded-full bg-rose-900 border border-rose-500 text-rose-200 text-[10px] font-mono font-bold flex items-center space-x-1">
                            <Crown className="w-3 h-3 text-amber-400" />
                            <span>ACTUAL KILLER</span>
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-mono">Innocent</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="name-form"
            onClick={(e) => {
              if (activeTab === 'PRESETS' || activeTab === 'CAST_TRUTH') {
                handleSubmit(e);
              }
            }}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold shadow-lg shadow-amber-900/30 transition-all active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Apply Character Names</span>
          </button>
        </div>

      </div>
    </div>
  );
};
