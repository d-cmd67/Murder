import React, { useState } from 'react';
import { Evidence, CustomNames } from '../types';
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
  CheckCircle, 
  Lock 
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-slate-100 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 mb-1">
            <Briefcase className="w-4 h-4 text-amber-500" />
            <span>EVIDENCE LOCKER & INVENTORY</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-amber-100">
            Case Physical Clues ({discoveredCount}/{evidenceList.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Examine physical proof, forensic analysis reports, and key motives gathered by Detective {customNames.detective}.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 space-x-1">
          <button
            onClick={() => {
              sounds.playClick();
              setFilter('ALL');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'ALL'
                ? 'bg-amber-600 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({evidenceList.length})
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setFilter('DISCOVERED');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'DISCOVERED'
                ? 'bg-amber-600 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Discovered ({discoveredCount})
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setFilter('KEY');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'KEY'
                ? 'bg-amber-600 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Key Evidence
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

          return (
            <div
              key={item.id}
              onClick={() => {
                sounds.playClick();
                setSelectedEvidence(item);
              }}
              className="p-5 rounded-2xl bg-slate-900 border border-amber-900/40 hover:border-amber-500/80 cursor-pointer shadow-lg hover:shadow-amber-950/40 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-600/40 text-amber-400 group-hover:scale-105 transition-transform">
                    {renderIcon(item.iconName)}
                  </div>
                  {item.isKeyEvidence && (
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-600/50 text-[10px] font-mono uppercase font-bold">
                      Key Proof
                    </span>
                  )}
                </div>

                <h3 className="text-base font-serif font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                  {replaceNames(item.title, customNames)}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {replaceNames(item.description, customNames)}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Location: {replaceNames(item.locationFound, customNames)}</span>
                <span className="text-amber-400 font-semibold group-hover:underline">
                  Inspect &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Evidence Detail Modal */}
      {selectedEvidence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/50 rounded-2xl w-full max-w-lg p-6 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-xl bg-amber-950 border border-amber-500/50 text-amber-400">
                  {renderIcon(selectedEvidence.iconName)}
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-amber-100">
                    {replaceNames(selectedEvidence.title, customNames)}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Retrieved from: {replaceNames(selectedEvidence.locationFound, customNames)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEvidence(null)}
                className="text-slate-400 hover:text-white text-xs bg-slate-800 px-2 py-1 rounded"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                {replaceNames(selectedEvidence.description, customNames)}
              </p>

              {selectedEvidence.detailedAnalysis && (
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-600/40 space-y-1">
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase block">
                    Forensic & Detective Analysis
                  </span>
                  <p className="text-xs text-amber-200">
                    {replaceNames(selectedEvidence.detailedAnalysis, customNames)}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedEvidence(null)}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold shadow-md"
              >
                Return to Locker
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
