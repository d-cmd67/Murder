import React, { useState } from 'react';
import { MysteryCase, CustomNames, Evidence } from '../types';
import { replaceNames } from '../utils/nameFormatter';
import { Sparkles, Microscope, Flame, Zap, CheckCircle2, Shield, Activity, RefreshCw } from 'lucide-react';
import { sounds } from '../utils/sound';

interface ForensicLabViewProps {
  currentCase: MysteryCase;
  customNames: CustomNames;
  evidenceList: Evidence[];
}

export const ForensicLabView: React.FC<ForensicLabViewProps> = ({
  currentCase,
  customNames,
  evidenceList,
}) => {
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>(evidenceList[0]?.id || '');
  const [activeTest, setActiveTest] = useState<'luminol' | 'fingerprint' | 'spectrogram' | 'toxicology'>('luminol');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const selectedEvidence = evidenceList.find(e => e.id === selectedEvidenceId) || evidenceList[0];

  const handleRunTest = (testType: 'luminol' | 'fingerprint' | 'spectrogram' | 'toxicology') => {
    setActiveTest(testType);
    setIsAnalyzing(true);
    sounds.playUVToggle();

    setTimeout(() => {
      setIsAnalyzing(false);
      sounds.playClueFound();

      if (!selectedEvidence) return;

      const title = replaceNames(selectedEvidence.title, customNames);
      const detailed = selectedEvidence.detailedAnalysis
        ? replaceNames(selectedEvidence.detailedAnalysis, customNames)
        : 'Microscopic inspection verifies localized friction marks and trace residue.';

      if (testType === 'luminol') {
        setTestResult(`🧪 LUMINOL SCAN RESULT FOR "${title}": Blue chemical chemiluminescence detected under UV spectrum (λ=425nm). Trace hemoglobin smudges match time of incident.`);
      } else if (testType === 'fingerprint') {
        setTestResult(`🔍 FINGERPRINT RIDGE SCAN FOR "${title}": Isolated 12 minutiae points. Cross-referenced against police database: 98.6% match confirmed.`);
      } else if (testType === 'spectrogram') {
        setTestResult(`🎧 AUDIO & DIGITAL SPECTROGRAM FOR "${title}": Background noise filtered (-24dB). High frequency glass vibration frequency pattern extracted.`);
      } else {
        setTestResult(`⚗️ TOXICOLOGY & CHEMICAL TEST FOR "${title}": Chemical compound analysis: ${detailed}`);
      }
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-purple-500/40 rounded-2xl p-6 shadow-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3 text-purple-400">
          <Microscope className="w-7 h-7 text-purple-400" />
          <div>
            <h2 className="text-xl font-serif font-bold text-purple-100 uppercase tracking-wider">
              FORENSIC SCIENCE & SPECTROMETRY LAB
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Run Spectrograms, Luminol Scans, Fingerprint Matching & Chemical Toxicology Tests
            </p>
          </div>
        </div>
        <div className="px-3 py-1 bg-purple-950/80 border border-purple-600/60 rounded-xl text-xs font-mono text-purple-300 font-bold">
          High Precision Workstation
        </div>
      </div>

      {/* Lab Workstation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Evidence Sample Selector */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-3">
          <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-2">
            <Shield className="w-4 h-4 text-amber-500" />
            <span>1. SELECT EVIDENCE SAMPLE</span>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {evidenceList.map((ev) => {
              const title = replaceNames(ev.title, customNames);
              const isSelected = selectedEvidenceId === ev.id;

              return (
                <div
                  key={ev.id}
                  onClick={() => {
                    setSelectedEvidenceId(ev.id);
                    setTestResult(null);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-purple-950/80 border-purple-500 text-purple-100 shadow-md scale-101'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="font-serif font-bold text-xs flex items-center space-x-1.5">
                    <span>{ev.isKeyEvidence ? '🔑' : '🧪'}</span>
                    <span className="truncate">{title}</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 mt-1 truncate">
                    Category: {ev.category}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center/Right 2 Columns: Test Bench & Live Results */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-widest">
                ACTIVE SAMPLE:
              </span>
              <h3 className="text-lg font-serif font-bold text-amber-200">
                {selectedEvidence ? replaceNames(selectedEvidence.title, customNames) : 'No Sample Selected'}
              </h3>
            </div>
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-400">
              Lab Tag #{selectedEvidenceId.toUpperCase()}
            </span>
          </div>

          {/* Test Buttons Toolbar (Tactile 3D Push Buttons) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => handleRunTest('luminol')}
              disabled={isAnalyzing}
              className={`p-3.5 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                activeTest === 'luminol'
                  ? 'bg-gradient-to-b from-purple-600 to-purple-700 text-purple-100 border-b-4 border-purple-950 shadow-[0_4px_0_0_#581c87] active:shadow-none active:translate-y-1'
                  : 'bg-slate-950 text-slate-300 border-b-2 border-slate-800 hover:border-slate-700 hover:bg-slate-900 shadow-[0_2px_0_0_#020617] active:translate-y-0.5 active:shadow-none'
              }`}
            >
              <Zap className="w-4 h-4 text-purple-400" />
              <span>PUSH: LUMINOL UV</span>
            </button>

            <button
              onClick={() => handleRunTest('fingerprint')}
              disabled={isAnalyzing}
              className={`p-3.5 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                activeTest === 'fingerprint'
                  ? 'bg-gradient-to-b from-indigo-600 to-indigo-700 text-indigo-100 border-b-4 border-indigo-950 shadow-[0_4px_0_0_#3730a3] active:shadow-none active:translate-y-1'
                  : 'bg-slate-950 text-slate-300 border-b-2 border-slate-800 hover:border-slate-700 hover:bg-slate-900 shadow-[0_2px_0_0_#020617] active:translate-y-0.5 active:shadow-none'
              }`}
            >
              <Activity className="w-4 h-4 text-indigo-400" />
              <span>PUSH: FINGERPRINT</span>
            </button>

            <button
              onClick={() => handleRunTest('spectrogram')}
              disabled={isAnalyzing}
              className={`p-3.5 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                activeTest === 'spectrogram'
                  ? 'bg-gradient-to-b from-emerald-600 to-emerald-700 text-emerald-100 border-b-4 border-emerald-950 shadow-[0_4px_0_0_#065f46] active:shadow-none active:translate-y-1'
                  : 'bg-slate-950 text-slate-300 border-b-2 border-slate-800 hover:border-slate-700 hover:bg-slate-900 shadow-[0_2px_0_0_#020617] active:translate-y-0.5 active:shadow-none'
              }`}
            >
              <Flame className="w-4 h-4 text-emerald-400" />
              <span>PUSH: SPECTROGRAM</span>
            </button>

            <button
              onClick={() => handleRunTest('toxicology')}
              disabled={isAnalyzing}
              className={`p-3.5 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                activeTest === 'toxicology'
                  ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 border-b-4 border-amber-950 shadow-[0_4px_0_0_#78350f] active:shadow-none active:translate-y-1'
                  : 'bg-slate-950 text-slate-300 border-b-2 border-slate-800 hover:border-slate-700 hover:bg-slate-900 shadow-[0_2px_0_0_#020617] active:translate-y-0.5 active:shadow-none'
              }`}
            >
              <Microscope className="w-4 h-4 text-amber-400" />
              <span>PUSH: TOXICOLOGY</span>
            </button>
          </div>

          {/* Test Screen Output */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 min-h-48 flex items-center justify-center text-center">
            {isAnalyzing ? (
              <div className="space-y-3">
                <RefreshCw className="w-8 h-8 text-purple-400 animate-spin mx-auto" />
                <div className="text-xs font-mono text-purple-300 font-bold animate-pulse">
                  CALIBRATING HIGH-PRECISION FORENSIC SENSORS...
                </div>
              </div>
            ) : testResult ? (
              <div className="space-y-3 text-left w-full animate-fadeIn">
                <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-bold border-b border-slate-800 pb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ANALYSIS COMPLETE & VERIFIED</span>
                </div>
                <p className="text-xs sm:text-sm font-mono text-purple-200 leading-relaxed bg-purple-950/40 p-4 rounded-xl border border-purple-800/60">
                  {testResult}
                </p>
                {selectedEvidence?.detailedAnalysis && (
                  <div className="text-[11px] font-serif text-slate-300 italic p-3 bg-slate-900 rounded-xl border border-slate-800">
                    "Forensic Lab Note: {replaceNames(selectedEvidence.detailedAnalysis, customNames)}"
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs font-mono text-slate-500 space-y-1">
                <div>SELECT A TEST FROM THE TOOLBAR ABOVE TO ANALYZE SAMPLE</div>
                <div className="text-[10px] text-slate-600">Spectrometry accuracy: 99.98%</div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
