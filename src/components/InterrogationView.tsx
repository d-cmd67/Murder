import React, { useState } from 'react';
import { Suspect, SuspectId, CustomNames, Evidence, MysteryCase } from '../types';
import { replaceNames } from '../utils/nameFormatter';
import { 
  MessageSquare, 
  Send, 
  AlertTriangle, 
  ShieldAlert, 
  UserCheck, 
  Stethoscope, 
  Crown, 
  Briefcase, 
  Cpu, 
  DollarSign, 
  Users, 
  Megaphone,
  Flame,
  Sparkles,
  Search
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface InterrogationViewProps {
  suspects: Record<SuspectId, Suspect>;
  customNames: CustomNames;
  evidenceList: Evidence[];
  currentCase: MysteryCase;
  onSendMessage: (suspectId: SuspectId, questionText: string, evidenceIds?: string[]) => Promise<void>;
}

export const InterrogationView: React.FC<InterrogationViewProps> = ({
  suspects,
  customNames,
  evidenceList,
  currentCase,
  onSendMessage,
}) => {
  const suspectKeys = Object.keys(suspects) as SuspectId[];
  const [selectedSuspectId, setSelectedSuspectId] = useState<SuspectId>(suspectKeys[0] || 'suspect1');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [selectedEvidenceForConfront, setSelectedEvidenceForConfront] = useState<string[]>([]);

  const currentSuspect = suspects[selectedSuspectId] || suspects['suspect1'];

  const getSuspectCustomName = (id: SuspectId) => {
    switch (id) {
      case 'suspect1': return customNames.suspect1 || suspects[id]?.defaultName;
      case 'suspect2': return customNames.suspect2 || suspects[id]?.defaultName;
      case 'suspect3': return customNames.suspect3 || suspects[id]?.defaultName;
      case 'suspect4': return customNames.suspect4 || suspects[id]?.defaultName;
      case 'suspect5': return customNames.suspect5 || suspects[id]?.defaultName;
      case 'suspect6': return customNames.suspect6 || suspects[id]?.defaultName;
      case 'suspect7': return customNames.suspect7 || suspects[id]?.defaultName;
      case 'suspect8': return customNames.suspect8 || suspects[id]?.defaultName;
      case 'suspect9': return customNames.suspect9 || suspects[id]?.defaultName;
      default: return suspects[id]?.defaultName || 'Suspect';
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck': return <UserCheck className="w-5 h-5" />;
      case 'Stethoscope': return <Stethoscope className="w-5 h-5" />;
      case 'Crown': return <Crown className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'DollarSign': return <DollarSign className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Megaphone': return <Megaphone className="w-5 h-5" />;
      default: return <UserCheck className="w-5 h-5" />;
    }
  };

  const handleSend = async (qText?: string, evIds?: string[]) => {
    const textToSend = qText || inputText;
    if (!textToSend.trim() && (!evIds || evIds.length === 0)) return;

    sounds.playClick();
    setLoading(true);
    setInputText('');
    setShowEvidenceModal(false);

    await onSendMessage(selectedSuspectId, textToSend || 'Confronting suspect with evidence...', evIds);
    setLoading(false);
    setSelectedEvidenceForConfront([]);
  };

  const quickQuestions = [
    `Where were you around ${currentCase.timeOfDeath}?`,
    `What was your relationship with ${customNames.victim}?`,
    `Why would someone want ${customNames.victim} dead?`,
    `Are you hiding anything from Detective ${customNames.detective}?`,
  ];

  const discoveredEvidence = evidenceList.filter((e) => e.discovered);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-slate-100 animate-fadeIn">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Suspect Selector Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              PRIME SUSPECTS ({suspectKeys.length})
            </span>
            <span className="text-[10px] text-slate-400">Click to interrogate</span>
          </div>

          <div className="space-y-2">
            {suspectKeys.map((id) => {
              const s = suspects[id];
              const customName = getSuspectCustomName(id);
              const isSelected = id === selectedSuspectId;

              return (
                <div
                  key={id}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedSuspectId(id);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-950/80 border-amber-500/80 shadow-xl shadow-amber-950/50'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${s.avatarColor} text-amber-200 border border-amber-500/30 shadow-md`}>
                      {renderIcon(s.avatarIcon)}
                    </div>
                    <div>
                      <h3 className="text-sm font-serif font-bold text-amber-100">
                        {customName}
                      </h3>
                      <p className="text-xs text-slate-400">{s.role}</p>
                    </div>
                  </div>

                  {/* Suspicion Bar */}
                  <div className="text-right space-y-1">
                    <span className="text-[10px] font-mono text-amber-400">
                      Suspicion: {s.suspicionLevel}%
                    </span>
                    <div className="w-16 h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full transition-all duration-500 ${
                          s.suspicionLevel > 60
                            ? 'bg-rose-500'
                            : s.suspicionLevel > 30
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${s.suspicionLevel}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Suspect Brief */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-bold uppercase font-mono">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>SUSPECT DOSSIER</span>
            </div>
            <div>
              <span className="text-slate-400">Motive: </span>
              <span className="text-slate-200">{replaceNames(currentSuspect.motive, customNames)}</span>
            </div>
            <div>
              <span className="text-slate-400">Stated Alibi: </span>
              <span className="text-slate-200">{replaceNames(currentSuspect.alibi, customNames)}</span>
            </div>
          </div>
        </div>

        {/* Chat / Interrogation Area (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-amber-900/40 rounded-2xl shadow-2xl flex flex-col h-[600px] overflow-hidden">
          
          {/* Header Bar */}
          <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${currentSuspect.avatarColor} text-amber-200`}>
                {renderIcon(currentSuspect.avatarIcon)}
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-amber-100">
                  Interrogating {getSuspectCustomName(selectedSuspectId)}
                </h3>
                <p className="text-xs text-slate-400">{currentSuspect.role}</p>
              </div>
            </div>

            <button
              onClick={() => setShowEvidenceModal(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-900/40 hover:bg-amber-900/80 border border-amber-600/50 text-amber-300 text-xs font-semibold transition-all active:scale-95"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Confront with Evidence</span>
            </button>
          </div>

          {/* Messages History */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/40">
            {currentSuspect.interrogationHistory.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
                <MessageSquare className="w-10 h-10 text-slate-600" />
                <p className="text-sm font-serif font-semibold text-slate-300">
                  Interrogation Room Ready
                </p>
                <p className="text-xs max-w-sm text-slate-400">
                  Ask {getSuspectCustomName(selectedSuspectId)} a question below or present key evidence from your investigation.
                </p>
              </div>
            ) : (
              currentSuspect.interrogationHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === 'player' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm shadow-md space-y-1 ${
                      msg.sender === 'player'
                        ? 'bg-amber-600 text-slate-950 font-medium rounded-tr-none'
                        : 'bg-slate-800 border border-amber-900/30 text-amber-100 rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] opacity-75 font-mono mb-1">
                      <span>
                        {msg.sender === 'player'
                          ? `Detective ${customNames.detective}`
                          : getSuspectCustomName(selectedSuspectId)}
                      </span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-amber-900/30 text-amber-200 text-xs p-3 rounded-2xl rounded-tl-none flex items-center space-x-2 animate-pulse">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                  <span>{getSuspectCustomName(selectedSuspectId)} is considering their response...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions Chips */}
          <div className="p-2 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-slate-500 font-mono pl-2 shrink-0">Quick Ask:</span>
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                disabled={loading}
                className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-amber-900/40 text-slate-300 hover:text-amber-200 border border-slate-700 whitespace-nowrap transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Ask ${getSuspectCustomName(selectedSuspectId)} anything...`}
              disabled={loading}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-slate-950 text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Ask</span>
            </button>
          </div>

        </div>

      </div>

      {/* Evidence Confrontation Modal */}
      {showEvidenceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-amber-600/50 rounded-2xl w-full max-w-lg p-6 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-serif font-bold text-amber-200 flex items-center space-x-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <span>Confront {getSuspectCustomName(selectedSuspectId)} with Evidence</span>
              </h3>
              <button
                onClick={() => setShowEvidenceModal(false)}
                className="text-slate-400 hover:text-white text-xs bg-slate-800 px-2 py-1 rounded"
              >
                Cancel
              </button>
            </div>

            {discoveredEvidence.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs space-y-2">
                <Search className="w-8 h-8 text-slate-600 mx-auto" />
                <p>No physical evidence discovered yet!</p>
                <p className="text-[11px] text-slate-500">
                  Inspect locations in the Crime Scene tab to uncover clues before confronting suspects.
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto p-1">
                <p className="text-xs text-slate-400">
                  Select evidence to present during interrogation:
                </p>
                {discoveredEvidence.map((ev) => {
                  const isChecked = selectedEvidenceForConfront.includes(ev.id);
                  return (
                    <div
                      key={ev.id}
                      onClick={() => {
                        sounds.playClick();
                        if (isChecked) {
                          setSelectedEvidenceForConfront((prev) => prev.filter((id) => id !== ev.id));
                        } else {
                          setSelectedEvidenceForConfront((prev) => [...prev, ev.id]);
                        }
                      }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-amber-950/80 border-amber-500 text-amber-100'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div>
                        <h4 className="text-xs font-serif font-bold text-amber-200">
                          {replaceNames(ev.title, customNames)}
                        </h4>
                        <p className="text-[11px] text-slate-400 line-clamp-1">
                          {replaceNames(ev.description, customNames)}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded border-slate-700 text-amber-600 focus:ring-amber-500"
                      />
                    </div>
                  );
                })}
              </div>
            )}

            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => setShowEvidenceModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const evTitles = discoveredEvidence
                    .filter((e) => selectedEvidenceForConfront.includes(e.id))
                    .map((e) => replaceNames(e.title, customNames));
                  handleSend(`I have evidence regarding ${evTitles.join(', ')}. Explain this!`, selectedEvidenceForConfront);
                }}
                disabled={selectedEvidenceForConfront.length === 0}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-slate-950 text-xs font-bold shadow-md"
              >
                Confront Suspect
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
