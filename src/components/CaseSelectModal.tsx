import React, { useState } from 'react';
import { MysteryCase, CustomNames } from '../types';
import { PRESET_CASES } from '../data/presetCases';
import { replaceNames } from '../utils/nameFormatter';
import { RotateCcw, Sparkles, BookOpen, Compass, ShieldAlert, X } from 'lucide-react';
import { sounds } from '../utils/sound';

interface CaseSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  customNames: CustomNames;
  onSelectCase: (c: MysteryCase) => void;
  onGenerateAICase?: (theme: string) => Promise<void>;
}

export const CaseSelectModal: React.FC<CaseSelectModalProps> = ({
  isOpen,
  onClose,
  customNames,
  onSelectCase,
  onGenerateAICase,
}) => {
  const [loadingAI, setLoadingAI] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('Classic Noir');

  if (!isOpen) return null;

  const handleSelect = (c: MysteryCase) => {
    sounds.playPaperFlip();
    onSelectCase(c);
    onClose();
  };

  const handleGenerateAI = async () => {
    if (!onGenerateAICase) return;
    sounds.playClick();
    setLoadingAI(true);
    await onGenerateAICase(selectedTheme);
    setLoadingAI(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-amber-600/40 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 border-b border-amber-900/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-amber-200">
                Select Murder Mystery Case
              </h2>
              <p className="text-xs text-amber-400/80">
                Choose a pre-built murder mystery or generate an AI case with your custom names.
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

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Pre-built Scenarios */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
              PRE-CONFIGURED MYSTERY CASES
            </span>
            <div className="grid grid-cols-1 gap-3">
              {PRESET_CASES.map((c) => (
                <div
                  key={c.id}
                  onClick={() => handleSelect(c)}
                  className="p-5 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/60 rounded-2xl cursor-pointer transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-serif font-bold text-amber-100 group-hover:text-amber-300">
                      {replaceNames(c.title, customNames)}
                    </h3>
                    <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                      Time: {c.timeOfDeath}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2">
                    {replaceNames(c.synopsis, customNames)}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Cause: {c.causeOfDeath}</span>
                    <span className="text-amber-400 group-hover:underline">Launch Case &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Case Generator Section */}
          {onGenerateAICase && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-950 border border-amber-600/40 space-y-3">
              <div className="flex items-center space-x-2 text-amber-300">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-serif font-bold">
                  Generate AI Custom Mystery Case
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Uses Gemini to generate a brand-new murder mystery with your custom names ({customNames.detective}, {customNames.victim}, {customNames.suspect1}, {customNames.suspect2}, {customNames.suspect3}, {customNames.suspect4}).
              </p>

              <div className="flex items-center space-x-2 pt-1">
                <label className="text-xs text-slate-300">Theme:</label>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-amber-100 focus:outline-none"
                >
                  <option value="Classic Noir">Classic 1940s Noir</option>
                  <option value="St. Jude High - Class 9A School">St. Jude High - Class 9A School</option>
                  <option value="Cyberpunk Syndicate">Cyberpunk Neon City</option>
                  <option value="Victorian Manor">Victorian Gothic</option>
                  <option value="Luxury Cruise Ship">Luxury Ocean Liner</option>
                </select>
                <button
                  onClick={handleGenerateAI}
                  disabled={loadingAI}
                  className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-slate-950 text-xs font-bold flex items-center space-x-1.5 shadow-md"
                >
                  {loadingAI ? (
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  <span>{loadingAI ? 'Generating...' : 'Generate Case'}</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
