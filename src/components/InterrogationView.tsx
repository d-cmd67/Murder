import React, { useState, useEffect } from 'react';
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
  Search,
  Zap,
  HelpCircle,
  Volume2,
  HeartPulse,
  Activity,
  CheckCircle2,
  Play
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface InterrogationViewProps {
  suspects: Record<SuspectId, Suspect>;
  customNames: CustomNames;
  evidenceList: Evidence[];
  currentCase: MysteryCase;
  onSendMessage: (suspectId: SuspectId, questionText: string, evidenceIds?: string[]) => Promise<void>;
  initialSubTab?: 'chat' | 'polygraph';
}

const SUSPECT_CARD_THEMES: Record<string, { border: string; bg: string; iconBg: string; text: string; glow: string }> = {
  suspect1: { border: 'border-amber-500/60', bg: 'from-amber-950/40 via-slate-900 to-slate-900', iconBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40', text: 'text-amber-300', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.2)]' },
  suspect2: { border: 'border-rose-500/60', bg: 'from-rose-950/40 via-slate-900 to-slate-900', iconBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40', text: 'text-rose-300', glow: 'shadow-[0_0_15px_rgba(244,63,94,0.2)]' },
  suspect3: { border: 'border-purple-500/60', bg: 'from-purple-950/40 via-slate-900 to-slate-900', iconBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40', text: 'text-purple-300', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.2)]' },
  suspect4: { border: 'border-sky-500/60', bg: 'from-sky-950/40 via-slate-900 to-slate-900', iconBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40', text: 'text-sky-300', glow: 'shadow-[0_0_15px_rgba(14,165,233,0.2)]' },
  suspect5: { border: 'border-emerald-500/60', bg: 'from-emerald-950/40 via-slate-900 to-slate-900', iconBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', text: 'text-emerald-300', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]' },
  suspect6: { border: 'border-teal-500/60', bg: 'from-teal-950/40 via-slate-900 to-slate-900', iconBg: 'bg-teal-500/20 text-teal-300 border-teal-500/40', text: 'text-teal-300', glow: 'shadow-[0_0_15px_rgba(20,184,166,0.2)]' },
  suspect7: { border: 'border-red-500/60', bg: 'from-red-950/40 via-slate-900 to-slate-900', iconBg: 'bg-red-500/20 text-red-300 border-red-500/40', text: 'text-red-300', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.2)]' },
  suspect8: { border: 'border-orange-500/60', bg: 'from-orange-950/40 via-slate-900 to-slate-900', iconBg: 'bg-orange-500/20 text-orange-300 border-orange-500/40', text: 'text-orange-300', glow: 'shadow-[0_0_15px_rgba(249,115,22,0.2)]' },
  suspect9: { border: 'border-indigo-500/60', bg: 'from-indigo-950/40 via-slate-900 to-slate-900', iconBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40', text: 'text-indigo-300', glow: 'shadow-[0_0_15px_rgba(99,102,241,0.2)]' },
};

export const InterrogationView: React.FC<InterrogationViewProps> = ({
  suspects,
  customNames,
  evidenceList,
  currentCase,
  onSendMessage,
  initialSubTab = 'chat',
}) => {
  const suspectKeys = Object.keys(suspects) as SuspectId[];
  const [selectedSuspectId, setSelectedSuspectId] = useState<SuspectId>(suspectKeys[0] || 'suspect1');
  const [inputText, setInputText] = useState('');
  const [interrogationTone, setInterrogationTone] = useState<'neutral' | 'pressured' | 'confrontational'>('neutral');
  const [loading, setLoading] = useState(false);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [selectedEvidenceForConfront, setSelectedEvidenceForConfront] = useState<string[]>([]);
  const [lastContradictionAlert, setLastContradictionAlert] = useState<string | null>(null);
  
  // Joined Polygraph State
  const [viewMode, setViewMode] = useState<'chat' | 'polygraph'>(initialSubTab);
  const [polygraphQuestion, setPolygraphQuestion] = useState('Were you present at the crime scene during the incident window?');
  const [polygraphLogs, setPolygraphLogs] = useState<Record<string, Array<{ question: string; bpmSpike: number; deception: boolean; timestamp: string }>>>({});
  const [isTestingPolygraph, setIsTestingPolygraph] = useState(false);

  useEffect(() => {
    if (initialSubTab) {
      setViewMode(initialSubTab);
    }
  }, [initialSubTab]);

  const currentSuspect = suspects[selectedSuspectId] || suspects['suspect1'];

  const getSuspectCustomName = (id: SuspectId) => {
    return customNames[id as keyof CustomNames] || suspects[id]?.defaultName || 'Suspect';
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

  const getSuspectMood = (s?: Suspect) => {
    if (!s) return { emoji: '😐', label: 'Neutral', colorClass: 'text-slate-300 bg-slate-900 border-slate-700' };
    const historyLen = s.interrogationHistory ? s.interrogationHistory.length : 0;
    
    if (historyLen >= 6) {
      return { emoji: '😱', label: 'Panicked', colorClass: 'text-rose-400 bg-rose-950/80 border-rose-800' };
    } else if (historyLen >= 4) {
      return { emoji: '😤', label: 'Pressured', colorClass: 'text-amber-400 bg-amber-950/80 border-amber-800' };
    } else if (historyLen >= 2) {
      return { emoji: '👁️', label: 'Guarded', colorClass: 'text-sky-400 bg-sky-950/80 border-sky-800' };
    }

    switch (s.id) {
      case 'suspect1': return { emoji: '😰', label: 'Nervous', colorClass: 'text-amber-300 bg-amber-950/60 border-amber-900' };
      case 'suspect2': return { emoji: '😤', label: 'Defensive', colorClass: 'text-rose-300 bg-rose-950/60 border-rose-900' };
      case 'suspect3': return { emoji: '🤫', label: 'Secretive', colorClass: 'text-purple-300 bg-purple-950/60 border-purple-900' };
      case 'suspect4': return { emoji: '👁️', label: 'Suspicious', colorClass: 'text-sky-300 bg-sky-950/60 border-sky-900' };
      case 'suspect5': return { emoji: '😐', label: 'Calm', colorClass: 'text-emerald-300 bg-emerald-950/60 border-emerald-900' };
      case 'suspect6': return { emoji: '🤝', label: 'Cooperative', colorClass: 'text-teal-300 bg-teal-950/60 border-teal-900' };
      case 'suspect7': return { emoji: '🤬', label: 'Hostile', colorClass: 'text-red-400 bg-red-950/60 border-red-900' };
      case 'suspect8': return { emoji: '😟', label: 'Anxious', colorClass: 'text-orange-300 bg-orange-950/60 border-orange-900' };
      case 'suspect9': return { emoji: '🧐', label: 'Calculating', colorClass: 'text-indigo-300 bg-indigo-950/60 border-indigo-900' };
      default: return { emoji: '😐', label: 'Neutral', colorClass: 'text-slate-300 bg-slate-900 border-slate-700' };
    }
  };

  const handleSend = async (qText?: string, evIds?: string[]) => {
    let textToSend = qText || inputText;
    if (!textToSend.trim() && (!evIds || evIds.length === 0)) return;

    if (interrogationTone === 'pressured') {
      textToSend = `[PRESSURED] ${textToSend}`;
    } else if (interrogationTone === 'confrontational') {
      textToSend = `[CONFRONTATIONAL] ${textToSend}`;
    }

    if (evIds && evIds.length > 0) {
      sounds.playHeartbeatPulse();
      setLastContradictionAlert(`CONTRADICTION DETECTED: Physical Evidence directly conflicts with ${getSuspectCustomName(selectedSuspectId)}'s statement!`);
    } else {
      sounds.playClick();
      setLastContradictionAlert(null);
    }

    setLoading(true);
    setInputText('');
    setShowEvidenceModal(false);

    await onSendMessage(selectedSuspectId, textToSend, evIds);
    setLoading(false);
    setSelectedEvidenceForConfront([]);
  };

  const quickQuestions = [
    `Where were you around ${currentCase.timeOfDeath}?`,
    `What was your relationship with ${customNames.victim}?`,
    `What happened behind the stage at 03:50 PM?`,
    `Are you hiding anything from Detective ${customNames.detective}?`,
  ];

  const handleRunPolygraphTest = () => {
    if (!polygraphQuestion.trim() || isTestingPolygraph) return;
    setIsTestingPolygraph(true);
    sounds.playClick();

    setTimeout(() => {
      sounds.playSpike();
      const isKiller = currentSuspect.isKiller;
      const isSuspicious = (currentSuspect.suspicionLevel || 20) > 50;
      const deception = isKiller || (isSuspicious && Math.random() > 0.3);
      const bpmSpike = deception ? Math.floor(Math.random() * 35) + 25 : Math.floor(Math.random() * 10) + 2;

      const newLog = {
        question: polygraphQuestion,
        bpmSpike,
        deception,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      };

      setPolygraphLogs(prev => ({
        ...prev,
        [selectedSuspectId]: [newLog, ...(prev[selectedSuspectId] || [])],
      }));

      setIsTestingPolygraph(false);
    }, 1200);
  };

  const discoveredEvidence = evidenceList.filter((e) => e.discovered);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-slate-100 animate-fadeIn space-y-4">
      
      {/* Contradiction Alert Banner */}
      {lastContradictionAlert && (
        <div className="bg-rose-950/90 border-2 border-rose-500 rounded-2xl p-4 flex items-center justify-between shadow-2xl animate-bounce text-xs sm:text-sm text-rose-100">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
            <span className="font-serif font-bold">{lastContradictionAlert}</span>
          </div>
          <button
            onClick={() => setLastContradictionAlert(null)}
            className="text-xs bg-rose-900 hover:bg-rose-800 text-rose-200 px-3 py-1 rounded-lg"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Suspect Selector Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              PRIME SUSPECTS - {suspectKeys.length}
            </span>
            <span className="text-[10px] text-slate-400">Click to interrogate</span>
          </div>

          <div className="space-y-2 max-h-[650px] overflow-y-auto pr-1 custom-scrollbar">
            {suspectKeys.map((id) => {
              const s = suspects[id];
              const customName = getSuspectCustomName(id);
              const isSelected = id === selectedSuspectId;
              const mood = getSuspectMood(s);
              const theme = SUSPECT_CARD_THEMES[id] || SUSPECT_CARD_THEMES.suspect1;

              return (
                <div
                  key={id}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedSuspectId(id);
                  }}
                  className={`group p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between shadow-lg ${
                    isSelected
                      ? `bg-gradient-to-r ${theme.bg} ${theme.border} ring-2 ring-amber-400/60 shadow-xl scale-[1.02]`
                      : 'bg-slate-900/90 border-slate-800/80 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl border ${theme.iconBg} shrink-0`}>
                      {renderIcon(s.icon)}
                    </div>
                    <div>
                      <h3 className={`text-sm font-serif font-bold ${isSelected ? theme.text : 'text-slate-100'}`}>
                        {customName}
                      </h3>
                      <p className="text-[11px] font-mono text-slate-400">{s.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${mood.colorClass}`}>
                      {mood.emoji} {mood.label}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {s.interrogationHistory?.length || 0} msgs
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Suspect Brief & Real-Time Biometrics */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs space-y-3">
            <div className="flex items-center justify-between text-amber-400 font-bold uppercase font-mono border-b border-slate-850 pb-2">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span>SUSPECT DOSSIER & BIOMETRICS</span>
              </div>
              <span className="text-[10px] text-slate-400 font-normal">POLICE SENSOR UNIT</span>
            </div>
            
            <div className="space-y-1">
              <div>
                <span className="text-slate-400">Motive: </span>
                <span className="text-slate-200">{replaceNames(currentSuspect.motive, customNames)}</span>
              </div>
              <div>
                <span className="text-slate-400">Stated Alibi: </span>
                <span className="text-slate-200">{replaceNames(currentSuspect.alibi, customNames)}</span>
              </div>
            </div>

            {/* Physiological Biometrics Monitor */}
            {(() => {
              const suspicion = currentSuspect.suspicionLevel || 20;
              const historyCount = currentSuspect.interrogationHistory.length;
              const bpm = Math.min(150, Math.max(62, 70 + suspicion * 0.7 + historyCount * 4));
              const voiceStress = Math.min(98, Math.max(10, Math.round(suspicion * 0.85 + historyCount * 5)));
              let microCue = "Steady gaze, relaxed posture";
              if (suspicion >= 70 || historyCount >= 6) {
                microCue = "Pulse spiking, avoiding direct eye contact, trembling fingers";
              } else if (suspicion >= 40 || historyCount >= 3) {
                microCue = "Nervous throat clear, shifting weight, defensive posture";
              }

              return (
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-slate-400 flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
                      <span>HEART RATE:</span>
                    </span>
                    <span className={`font-bold ${bpm > 110 ? 'text-rose-400' : bpm > 85 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {Math.round(bpm)} BPM
                    </span>
                  </div>

                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-slate-400">VOICE STRESS:</span>
                    <span className={`font-bold ${voiceStress > 70 ? 'text-rose-400' : voiceStress > 40 ? 'text-amber-400' : 'text-sky-400'}`}>
                      {voiceStress}% STRESS
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-1 border-t border-slate-800">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-400">Current Assessment:</span>
                      <span className={`font-bold ${
                        suspicion > 65 ? 'text-rose-400' : suspicion > 35 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {suspicion > 65 ? 'Prime Suspect' : suspicion > 35 ? 'Possible' : 'Unlikely'}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-400">Confidence:</span>
                      <span className="text-amber-300 font-bold">
                        {historyCount >= 5 ? 'High' : historyCount >= 2 ? 'Medium' : 'Low'}
                      </span>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 font-mono italic pt-1 border-t border-slate-800/80">
                    <span className="text-amber-500 font-semibold">Micro-Expression: </span>
                    <span>"{microCue}"</span>
                  </div>
                </div>
              );
            })()}

          </div>
        </div>

        {/* Chat or Polygraph / Interrogation Area (8 Cols) */}
        {viewMode === 'chat' ? (
          <div className="lg:col-span-8 bg-slate-900 border border-amber-900/40 rounded-2xl shadow-2xl flex flex-col h-[620px] overflow-hidden">
            
            {/* Header Bar */}
            <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-base font-serif font-bold text-amber-100">
                  Interrogating {getSuspectCustomName(selectedSuspectId)}
                </h3>
              </div>

              {/* Interrogation Tone Controls (3D Tactile Push Buttons) */}
              <div className="flex items-center bg-slate-950 p-1.5 rounded-xl border-2 border-amber-800/60 space-x-1.5 shadow-inner">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setInterrogationTone('neutral');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    interrogationTone === 'neutral'
                      ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 shadow-[0_3px_0_0_#78350f] border-b-2 border-amber-900'
                      : 'bg-slate-900 text-slate-300 hover:text-amber-200 border-b-2 border-slate-950 hover:bg-slate-800 shadow-[0_2px_0_0_#020617] active:translate-y-0.5 active:shadow-none'
                  }`}
                >
                  🕊️ NEUTRAL
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setInterrogationTone('pressured');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    interrogationTone === 'pressured'
                      ? 'bg-gradient-to-b from-orange-500 to-orange-600 text-slate-950 shadow-[0_3px_0_0_#7c2d12] border-b-2 border-orange-900'
                      : 'bg-slate-900 text-slate-300 hover:text-orange-200 border-b-2 border-slate-950 hover:bg-slate-800 shadow-[0_2px_0_0_#020617] active:translate-y-0.5 active:shadow-none'
                  }`}
                >
                  ⚡ PRESSURED
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setInterrogationTone('confrontational');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    interrogationTone === 'confrontational'
                      ? 'bg-gradient-to-b from-rose-600 to-rose-700 text-rose-50 shadow-[0_3px_0_0_#881337] border-b-2 border-rose-900'
                      : 'bg-slate-900 text-slate-300 hover:text-rose-200 border-b-2 border-slate-950 hover:bg-slate-800 shadow-[0_2px_0_0_#020617] active:translate-y-0.5 active:shadow-none'
                  }`}
                >
                  🔥 CONFRONTATIONAL
                </button>
              </div>

              {/* Confront with Evidence 3D Push Button */}
              <button
                onClick={() => {
                  sounds.playPaperFlip();
                  setShowEvidenceModal(true);
                }}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-b from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 text-xs font-bold border-b-4 border-amber-950 shadow-[0_4px_0_0_#78350f] hover:shadow-[0_2px_0_0_#78350f] active:shadow-none active:translate-y-1 transition-all cursor-pointer"
              >
                <Flame className="w-4 h-4 text-slate-950 animate-pulse" />
                <span>CONFRONT WITH EVIDENCE</span>
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
                currentSuspect.interrogationHistory.map((msg, idx) => {
                  const isPlayer = msg.sender === 'player';
                  const theme = SUSPECT_CARD_THEMES[selectedSuspectId] || SUSPECT_CARD_THEMES.suspect1;

                  return (
                    <div
                      key={idx}
                      className={`flex ${isPlayer ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm shadow-xl space-y-1.5 ${
                          isPlayer
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium rounded-tr-none shadow-[0_4px_15px_rgba(245,158,11,0.25)] border border-amber-400'
                            : `bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border ${theme.border} text-slate-100 rounded-tl-none shadow-[0_4px_15px_rgba(0,0,0,0.5)]`
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono border-b border-black/10 dark:border-white/10 pb-1 mb-1">
                          <span className={isPlayer ? 'font-bold text-slate-950 uppercase tracking-wide' : `${theme.text} font-bold`}>
                            {isPlayer
                              ? `🕵️ Detective ${customNames.detective}`
                              : `💬 ${getSuspectCustomName(selectedSuspectId)}`}
                          </span>
                          <span className={isPlayer ? 'text-slate-800' : 'text-slate-400'}>{msg.timestamp}</span>
                        </div>
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      </div>
                    </div>
                  );
                })
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

            {/* Quick Questions Push Buttons Deck */}
            <div className="p-2.5 bg-slate-950 border-t-2 border-slate-800 flex items-center gap-2 overflow-x-auto text-[11px]">
              <span className="text-amber-400 font-mono font-bold pl-2 shrink-0 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>QUICK ASK:</span>
              </span>
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-amber-950/60 text-slate-200 hover:text-amber-200 border-b-2 border-slate-950 hover:border-amber-700 shadow-[0_2px_0_0_#020617] active:translate-y-0.5 active:shadow-none font-sans whitespace-nowrap transition-all cursor-pointer disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Box with Tactile Ask Push Button */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Ask ${getSuspectCustomName(selectedSuspectId)} anything (${interrogationTone.toUpperCase()} tone active)...`}
                disabled={loading}
                className="flex-1 bg-slate-900 border-2 border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500/80 transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !inputText.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 text-xs font-bold font-mono flex items-center space-x-2 border-b-4 border-amber-900 shadow-[0_4px_0_0_#78350f] hover:shadow-[0_2px_0_0_#78350f] active:shadow-none active:translate-y-1 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>PUSH: ASK</span>
              </button>
            </div>

          </div>
        ) : (
          <div className="lg:col-span-8 bg-slate-900 border border-rose-900/40 rounded-2xl shadow-2xl flex flex-col h-[620px] overflow-hidden p-5 space-y-4">
            {/* Polygraph Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-rose-950 border border-rose-600/50 rounded-xl text-rose-400">
                  <HeartPulse className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-amber-100 flex items-center space-x-2">
                    <span>Polygraph Lie Detector: {getSuspectCustomName(selectedSuspectId)}</span>
                    <span className="text-[10px] font-mono bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded">
                      GSR Active
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">Galvanic Skin Response, Heart Rate & Micro-Tremor Analysis</p>
                </div>
              </div>
            </div>

            {/* Live Pulse Waveform & Sensor Gauge Grid */}
            {(() => {
              const suspicion = currentSuspect.suspicionLevel || 20;
              const logs = polygraphLogs[selectedSuspectId] || [];
              const lastLog = logs[0];
              const bpm = Math.min(160, Math.max(68, 72 + suspicion * 0.8 + (lastLog?.bpmSpike || 0)));
              const gsr = (4.2 + (suspicion * 0.08) + (lastLog?.deception ? 3.5 : 0)).toFixed(1);
              const deceptionProb = Math.min(99, Math.round(suspicion * 0.9 + (currentSuspect.isKiller ? 25 : 0)));

              return (
                <div className="space-y-4 flex-1 overflow-y-auto pr-1">
                  {/* Waveform Box */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-rose-400 font-bold flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-rose-500 animate-spin" />
                        <span>ECG PULSE WAVEFORM MONITOR</span>
                      </span>
                      <span className="text-slate-400">Sampling Rate: 1000 Hz</span>
                    </div>

                    <div className="h-24 bg-slate-900 rounded-lg border border-slate-800 flex items-end justify-between p-3 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-around opacity-20">
                        <div className="w-full border-t border-rose-500"></div>
                      </div>
                      {Array.from({ length: 28 }).map((_, i) => {
                        const height = (i % 4 === 0 ? 85 : (i * 19) % 55) + 20;
                        return (
                          <div 
                            key={i} 
                            className={`w-1.5 rounded-t transition-all ${isTestingPolygraph ? 'bg-amber-400 animate-ping' : lastLog?.deception ? 'bg-rose-500' : 'bg-emerald-500'}`}
                            style={{ height: `${height}%`, animationDelay: `${i * 80}ms` }}
                          ></div>
                        );
                      })}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Heart Rate</span>
                        <span className={`font-bold text-sm ${bpm > 110 ? 'text-rose-400' : 'text-emerald-400'}`}>{Math.round(bpm)} BPM</span>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Galvanic Skin (GSR)</span>
                        <span className="text-amber-400 font-bold text-sm">{gsr} µS</span>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Deception Risk</span>
                        <span className={`font-bold text-sm ${deceptionProb > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>{deceptionProb}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Question Polygraph Test Tool */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                    <h4 className="font-bold text-amber-300 uppercase flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>Run Targeted Lie Detector Question</span>
                    </h4>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={polygraphQuestion}
                        onChange={(e) => setPolygraphQuestion(e.target.value)}
                        placeholder="Ask a specific question to measure biometrics spike..."
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-amber-100 text-xs focus:outline-none focus:border-rose-500"
                      />
                      <button
                        onClick={handleRunPolygraphTest}
                        disabled={isTestingPolygraph || !polygraphQuestion.trim()}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold rounded-lg flex items-center space-x-1.5 shrink-0 shadow-md"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{isTestingPolygraph ? 'Analyzing...' : 'Test Biometrics'}</span>
                      </button>
                    </div>

                    {/* Preset Test Questions */}
                    <div className="flex gap-2 overflow-x-auto text-[10px] text-slate-400 pt-1">
                      <span className="shrink-0 font-bold text-slate-500">Presets:</span>
                      {[
                        "Did you enter the Science Wing alone?",
                        "Do you own the unregistered firearm?",
                        "Were you blackmailing the victim?",
                        "Is your stated alibi truthful?"
                      ].map((pq, idx) => (
                        <button
                          key={idx}
                          onClick={() => setPolygraphQuestion(pq)}
                          className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 shrink-0"
                        >
                          {pq}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question Deception Log */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                    <h4 className="font-bold text-slate-300 uppercase text-[11px]">
                      Polygraph Question History ({logs.length} Recorded)
                    </h4>
                    {logs.length === 0 ? (
                      <p className="text-slate-500 italic text-[11px] p-2">No polygraph questions recorded yet. Run a test above!</p>
                    ) : (
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                        {logs.map((log, i) => (
                          <div key={i} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center text-[11px]">
                            <div className="space-y-0.5 max-w-[70%]">
                              <p className="text-amber-200 font-bold truncate">"{log.question}"</p>
                              <p className="text-slate-500 text-[10px]">{log.timestamp} &bull; Heart Rate Spike: +{log.bpmSpike} BPM</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-[10px] font-bold ${log.deception ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'}`}>
                              {log.deception ? '🚨 DECEPTION INDICATED' : '✅ TRUTHFUL RESPONSE'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

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
                  handleSend(`I have physical evidence regarding ${evTitles.join(', ')}. Explain this!`, selectedEvidenceForConfront);
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
