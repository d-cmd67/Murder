import React from 'react';
import { GameStage, CustomNames } from '../types';
import { 
  Search, 
  MessageSquareText, 
  Briefcase, 
  BookOpen, 
  Gavel, 
  UserCog, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  Sparkles,
  Shuffle
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface NavbarProps {
  currentStage: GameStage;
  setStage: (stage: GameStage) => void;
  caseTitle: string;
  customNames: CustomNames;
  onOpenNameManager: () => void;
  onOpenCaseSelector: () => void;
  onShuffleCase: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  evidenceCount: number;
  totalEvidence: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStage,
  setStage,
  caseTitle,
  customNames,
  onOpenNameManager,
  onOpenCaseSelector,
  onShuffleCase,
  soundEnabled,
  setSoundEnabled,
  evidenceCount,
  totalEvidence,
}) => {
  const handleNavClick = (stage: GameStage) => {
    sounds.playPaperFlip();
    setStage(stage);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    sounds.enabled = next;
    setSoundEnabled(next);
    if (next) sounds.playClick();
  };

  return (
    <header className="bg-slate-950 border-b border-amber-900/40 text-amber-50 sticky top-0 z-30 shadow-2xl backdrop-blur-md bg-slate-950/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Case Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-amber-900/30 border border-amber-600/50 flex items-center justify-center text-amber-400 font-serif text-xl shadow-inner">
              🕵️‍♂️
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono tracking-widest text-amber-500 uppercase">NOIR CASE FILE</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono border border-slate-700">
                  {customNames.detective}
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-serif font-bold text-amber-100 truncate max-w-[200px] sm:max-w-xs">
                {caseTitle}
              </h1>
            </div>
          </div>

          {/* Navigation Buttons */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => handleNavClick('CHARACTER_CREATOR')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentStage === 'CHARACTER_CREATOR'
                  ? 'bg-amber-600 text-slate-950 font-bold shadow-md'
                  : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800'
              }`}
            >
              <UserCog className="w-3.5 h-3.5 text-amber-400" />
              <span>Detective & Cast</span>
            </button>

            <button
              onClick={() => handleNavClick('INVESTIGATING')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentStage === 'INVESTIGATING'
                  ? 'bg-amber-600 text-slate-950 font-bold shadow-md'
                  : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Crime Scene</span>
            </button>

            <button
              onClick={() => handleNavClick('INTERROGATING')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentStage === 'INTERROGATING'
                  ? 'bg-amber-600 text-slate-950 font-bold shadow-md'
                  : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800'
              }`}
            >
              <MessageSquareText className="w-3.5 h-3.5" />
              <span>Interrogate</span>
            </button>

            <button
              onClick={() => handleNavClick('EVIDENCE')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentStage === 'EVIDENCE'
                  ? 'bg-amber-600 text-slate-950 font-bold shadow-md'
                  : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Evidence ({evidenceCount}/{totalEvidence})</span>
            </button>

            <button
              onClick={() => handleNavClick('NOTEBOOK')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentStage === 'NOTEBOOK'
                  ? 'bg-amber-600 text-slate-950 font-bold shadow-md'
                  : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Deductions</span>
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Shuffle Killer Button */}
            <button
              onClick={onShuffleCase}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-600/60 text-indigo-200 text-xs font-semibold shadow-sm transition-all active:scale-95"
              title="Randomize killer and evidence trail for a brand-new murder plot!"
            >
              <Shuffle className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Shuffle Killer</span>
            </button>

            {/* Provide / Edit Custom Names button */}
            <button
              onClick={onOpenNameManager}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-600/60 text-amber-300 text-xs font-semibold shadow-sm transition-all active:scale-95"
              title="Provide or customize character names"
            >
              <UserCog className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Provided Names</span>
            </button>

            {/* Accuse Killer Button */}
            <button
              onClick={() => handleNavClick('ACCUSATION')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-700 to-red-800 hover:from-rose-600 hover:to-red-700 text-white text-xs font-bold shadow-lg shadow-rose-900/40 border border-rose-500/50 animate-pulse active:scale-95"
            >
              <Gavel className="w-4 h-4" />
              <span>Accuse</span>
            </button>

            {/* Switch Case */}
            <button
              onClick={onOpenCaseSelector}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-amber-300 hover:bg-slate-800 border border-slate-800 transition-colors"
              title="Change Case Scenario"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-amber-300 hover:bg-slate-800 border border-slate-800 transition-colors"
              title={soundEnabled ? "Mute SFX" : "Enable SFX"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Nav */}
      <div className="flex md:hidden items-center justify-around bg-slate-900 px-2 py-2 border-t border-slate-800 text-xs">
        <button
          onClick={() => handleNavClick('INVESTIGATING')}
          className={`flex flex-col items-center space-y-1 p-1 ${
            currentStage === 'INVESTIGATING' ? 'text-amber-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Scene</span>
        </button>
        <button
          onClick={() => handleNavClick('INTERROGATING')}
          className={`flex flex-col items-center space-y-1 p-1 ${
            currentStage === 'INTERROGATING' ? 'text-amber-400 font-bold' : 'text-slate-400'
          }`}
        >
          <MessageSquareText className="w-4 h-4" />
          <span>Suspects</span>
        </button>
        <button
          onClick={() => handleNavClick('EVIDENCE')}
          className={`flex flex-col items-center space-y-1 p-1 ${
            currentStage === 'EVIDENCE' ? 'text-amber-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Clues ({evidenceCount})</span>
        </button>
        <button
          onClick={() => handleNavClick('NOTEBOOK')}
          className={`flex flex-col items-center space-y-1 p-1 ${
            currentStage === 'NOTEBOOK' ? 'text-amber-400 font-bold' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Notebook</span>
        </button>
      </div>
    </header>
  );
};
