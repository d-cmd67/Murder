import React, { useState } from 'react';
import { Evidence, CustomNames, EvidenceAnalysisLayer } from '../types';
import { replaceNames } from '../utils/nameFormatter';
import { 
  Briefcase, 
  Wine, 
  FileText, 
  Scroll, 
  Key, 
  BookOpen, 
  Radio, 
  Award, 
  HardDrive, 
  Terminal, 
  Search, 
  ShieldCheck, 
  Lock,
  Zap,
  Sparkles,
  Cpu,
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface EvidenceViewProps {
  evidenceList: Evidence[];
  customNames: CustomNames;
}

export const EvidenceView: React.FC<EvidenceViewProps> = ({
  evidenceList,
  customNames,
}) => {
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'KEY' | 'DISCOVERED'>('ALL');
  const [examState, setExamState] = useState<Record<string, number>>({});
  const [isScanning, setIsScanning] = useState(false);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wine': return <Wine className="w-6 h-6" />;
      case 'FileText': return <FileText className="w-6 h-6" />;
      case 'Scroll': return <Scroll className="w-6 h-6" />;
      case 'Key': return <Key className="w-6 h-6" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'Radio': return <Radio className="w-6 h-6" />;
      case 'Award': return <Award className="w-6 h-6" />;
      case 'HardDrive': return <HardDrive className="w-6 h-6" />;
      case 'Terminal': return <Terminal className="w-6 h-6" />;
      default: return <Briefcase className="w-6 h-6" />;
    }
  };

  const filteredList = evidenceList.filter((e) => {
    if (filter === 'KEY') return e.isKeyEvidence && e.discovered;
    if (filter === 'DISCOVERED') return e.discovered;
    return true;
  });

  const discoveredCount = evidenceList.filter((e) => e.discovered).length;

  const getExamLevel = (evId: string) => {
    return examState[evId] || 1;
  };

  const handleAdvanceExam = (ev: Evidence) => {
    sounds.playUVToggle();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      sounds.playClueFound();
      setExamState((prev) => {
        const curr = prev[ev.id] || 1;
        return { ...prev, [ev.id]: Math.min(curr + 1, 4) };
      });
    }, 600);
  };

  const getDefaultLayers = (ev: Evidence): EvidenceAnalysisLayer[] => {
    return [
      {
        layerNumber: 1,
        toolName: '🔍 Initial Physical Inspection',
        finding: replaceNames(ev.description, customNames),
        confidence: 65,
      },
      {
        layerNumber: 2,
        toolName: '🔬 Dactyloscopy & Latent Prints',
        finding: `Latent partial fingerprints recovered. Distinct Ridge loops match high-probability suspect profile in file.`,
        confidence: 85,
      },
      {
        layerNumber: 3,
        toolName: '🧪 Chemical Luminol & Micro-Fiber Scan',
        finding: `Traces of specialized fluorescent reagent and micro-fabric threads matching ${customNames.victim}'s formal attire identified under spectrum analysis.`,
        confidence: 94,
      },
      {
        layerNumber: 4,
        toolName: '💻 Timestamp & Contradiction Decryption',
        finding: `Decrypted metadata confirms exact interaction at 10:14 PM during the blackout, directly refuting the prime suspect's alibi!`,
        confidence: 99,
      },
    ];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-slate-100 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 mb-1">
            <Briefcase className="w-4 h-4 text-amber-500" />
            <span>FORENSIC EXAMINATION LAB & EVIDENCE LOCKER</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-amber-100">
            Case Physical Clues ({discoveredCount}/{evidenceList.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Examine physical proof, conduct multi-layered forensic tests, and uncover hidden contradictions gathered by Detective {customNames.detective}.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex bg-slate-950/90 p-1.5 rounded-xl border border-slate-800 space-x-1.5 shadow-inner">
          <button
            onClick={() => {
              sounds.playClick();
              setFilter('ALL');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === 'ALL'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                : 'text-slate-400 hover:text-amber-200 hover:bg-slate-900'
            }`}
          >
            All ({evidenceList.length})
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setFilter('DISCOVERED');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === 'DISCOVERED'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-900'
            }`}
          >
            Discovered ({discoveredCount})
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setFilter('KEY');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === 'KEY'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                : 'text-slate-400 hover:text-rose-300 hover:bg-slate-900'
            }`}
          >
            Key Proof ({evidenceList.filter(e => e.isKeyEvidence && e.discovered).length})
          </button>
        </div>
      </div>

      {/* Grid of Evidence Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredList.map((item) => {
          if (!item.discovered) {
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-slate-600 flex items-center space-x-4 opacity-60"
              >
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-600">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-bold text-slate-500">
                    Undiscovered Clue #{item.id.replace('ev_', '')}
                  </h3>
                  <p className="text-xs text-slate-600">
                    Search crime scene locations to unlock this evidence.
                  </p>
                </div>
              </div>
            );
          }

          const examLvl = getExamLevel(item.id);
          const isKey = item.isKeyEvidence;

          return (
            <div
              key={item.id}
              onClick={() => {
                sounds.playClick();
                setSelectedEvidence(item);
              }}
              className={`p-5 rounded-2xl bg-slate-900/90 border cursor-pointer shadow-2xl transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden ${
                isKey
                  ? 'border-rose-500/80 animate-glow-rose hover:border-rose-400'
                  : examLvl >= 4
                    ? 'border-emerald-500/80 animate-glow-emerald hover:border-emerald-400'
                    : 'border-amber-500/80 animate-glow-border hover:border-amber-400'
              }`}
            >
              {/* Glowing Discovered Corner Marker */}
              <div className={`absolute -top-1 -right-1 px-3 py-1 font-mono text-[9px] font-extrabold uppercase rounded-bl-xl tracking-wider shadow-lg flex items-center space-x-1 ${
                isKey
                  ? 'bg-gradient-to-l from-rose-500 to-pink-600 text-white'
                  : examLvl >= 4
                    ? 'bg-gradient-to-l from-emerald-500 to-teal-600 text-slate-950'
                    : 'bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950'
              }`}>
                <Sparkles className="w-3 h-3 animate-spin" />
                <span>{isKey ? 'CRITICAL PROOF' : examLvl >= 4 ? 'MAX VERIFIED' : 'DISCOVERED'}</span>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl border group-hover:scale-110 transition-transform shadow-inner ${
                    isKey
                      ? 'bg-rose-950/80 border-rose-500/60 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                      : examLvl >= 4
                        ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                        : 'bg-amber-950/80 border-amber-500/60 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                  }`}>
                    {renderIcon(item.iconName)}
                  </div>
                  <div className="flex items-center space-x-1.5 pr-14">
                    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold ${
                      examLvl === 1
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-700'
                        : examLvl === 2
                          ? 'bg-purple-950 text-purple-300 border-purple-700'
                          : examLvl === 3
                            ? 'bg-amber-950 text-amber-300 border-amber-700'
                            : 'bg-emerald-950 text-emerald-300 border-emerald-600'
                    }`}>
                      Layer {examLvl}/4
                    </span>
                    {item.isKeyEvidence && (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-200 border border-rose-500 text-[10px] font-mono uppercase font-extrabold animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.4)]">
                        Key Proof
                      </span>
                    )}
                  </div>
                </div>

                <h3 className={`text-base font-serif font-bold transition-colors ${
                  isKey ? 'text-rose-100 group-hover:text-rose-300' : 'text-amber-100 group-hover:text-amber-300'
                }`}>
                  {replaceNames(item.title, customNames)}
                </h3>

                <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                  {replaceNames(item.description, customNames)}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-300">
                <span className="truncate pr-2 text-slate-400">Loc: <strong className="text-amber-300">{replaceNames(item.locationFound, customNames)}</strong></span>
                <span className="text-amber-400 font-bold group-hover:underline flex items-center space-x-1 shrink-0">
                  <span>Inspect Clue</span>
                  <span>&rarr;</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Evidence Examination Modal */}
      {selectedEvidence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/50 rounded-2xl w-full max-w-2xl p-6 shadow-2xl text-slate-100 space-y-5 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-xl bg-amber-950 border border-amber-500/50 text-amber-400">
                  {renderIcon(selectedEvidence.iconName)}
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-amber-100">
                    {replaceNames(selectedEvidence.title, customNames)}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Location Recovered: {replaceNames(selectedEvidence.locationFound, customNames)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEvidence(null)}
                className="text-slate-400 hover:text-white text-xs bg-slate-800 px-3 py-1.5 rounded-lg font-mono transition-colors"
              >
                Close
              </button>
            </div>

            {/* Examination Layer Progress & Forensic Controls */}
            {(() => {
              const currentLvl = getExamLevel(selectedEvidence.id);
              const layers = getDefaultLayers(selectedEvidence);

              return (
                <div className="space-y-4">
                  
                  {/* Analysis Confidence Meter Bar */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-400 font-bold flex items-center space-x-1.5">
                        <Layers className="w-4 h-4 text-amber-500" />
                        <span>FORENSIC ANALYSIS DEPTH</span>
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {layers[currentLvl - 1]?.confidence}% CERTAINTY
                      </span>
                    </div>

                    <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800 flex">
                      <div
                        className="bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-500 h-full transition-all duration-500"
                        style={{ width: `${(currentLvl / 4) * 100}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                      <span>Layer 1: Visual</span>
                      <span>Layer 2: Prints</span>
                      <span>Layer 3: Luminol</span>
                      <span>Layer 4: Decrypted</span>
                    </div>
                  </div>

                  {/* Revealed Examination Layers */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                      EXAMINED ANALYSIS LAYERS ({currentLvl}/4 UNLOCKED)
                    </span>

                    {layers.slice(0, currentLvl).map((layer, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 animate-fadeIn"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-amber-300 flex items-center space-x-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{layer.toolName}</span>
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                            Confidence: {layer.confidence}%
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {replaceNames(layer.finding, customNames)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Perform Next Lab Examination Button */}
                  {currentLvl < 4 ? (
                    <div className="p-4 bg-amber-950/40 border border-amber-600/50 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-serif font-bold text-amber-200">
                            Next Test: {layers[currentLvl]?.toolName}
                          </h4>
                          <p className="text-[11px] text-slate-300">
                            Run deep laboratory diagnostics to increase confidence and unlock incriminating links.
                          </p>
                        </div>

                        <button
                          onClick={() => handleAdvanceExam(selectedEvidence)}
                          disabled={isScanning}
                          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-slate-950 text-xs font-bold font-mono flex items-center space-x-1.5 shadow-md active:scale-95 transition-all shrink-0"
                        >
                          <Zap className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                          <span>{isScanning ? 'Scanning...' : 'Run Forensic Test'}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-950/60 border border-emerald-600/50 rounded-xl text-xs text-emerald-200 font-mono flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>100% MAXIMUM FORENSIC ANALYSIS COMPLETED FOR THIS EVIDENCE!</span>
                    </div>
                  )}

                  {selectedEvidence.detailedAnalysis && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-amber-900/60 space-y-1">
                      <span className="text-[11px] font-mono font-bold text-amber-400 uppercase block">
                        Detective's Casebook Note
                      </span>
                      <p className="text-xs text-amber-200 italic">
                        "{replaceNames(selectedEvidence.detailedAnalysis, customNames)}"
                      </p>
                    </div>
                  )}

                </div>
              );
            })()}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedEvidence(null)}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold shadow-md"
              >
                Return to Evidence Locker
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
