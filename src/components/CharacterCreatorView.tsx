import React, { useState } from 'react';
import { DetectiveProfile, CustomNames, Suspect, SuspectId, ALL_SUSPECT_IDS } from '../types';
import { Shield, User, Sparkles, BookOpen, UserCheck, Eye, Compass, Award, ArrowRight, Check } from 'lucide-react';
import { sounds } from '../utils/sound';

interface CharacterCreatorViewProps {
  detectiveProfile: DetectiveProfile;
  onUpdateDetective: (profile: DetectiveProfile) => void;
  customNames: CustomNames;
  onUpdateCustomNames: (names: CustomNames) => void;
  suspects?: Record<string, Suspect>;
  onStartInvestigation: () => void;
}

const APPEARANCE_PRESETS = [
  {
    id: 'trenchcoat',
    title: 'Classic Trenchcoat & Fedora',
    desc: 'Sharp charcoal trenchcoat, tailored felt fedora, brass pocket watch, and a keen golden magnifying monocle.',
    icon: '🎩',
  },
  {
    id: 'cyber',
    title: 'Modern High-Tech Sleuth',
    desc: 'Sleek dark tactical blazer, smart AR forensic lenses, thermal scanner, and voice spectrum analyzer.',
    icon: '👓',
  },
  {
    id: 'tweed',
    title: 'Aristocratic Tweed Investigator',
    desc: 'Vintage dark-amber tweed suit, leather-bound notebook, fountain pen, and a calm, calculating demeanor.',
    icon: '🔍',
  },
  {
    id: 'rogue',
    title: 'Rogue Hardboiled Detective',
    desc: 'Worn leather jacket, tarnished silver police badge, stubble, and a piercing gaze that unnerves suspects.',
    icon: '🛡️',
  },
];

const BACKSTORY_PRESETS = [
  'Ex-Special Homicide Inspector who resigned after exposing top-level syndicate corruption. Known for relentless tenacity and an unblemished record.',
  'Brilliant Forensic Technologist from the National Crime Bureau who specializes in micro-data, physical trace evidence, and crime-scene reconstruction.',
  'Maverick Independent Investigator called in exclusively by high-society clients when high-profile murders require discretion and flawless deduction.',
];

export const CharacterCreatorView: React.FC<CharacterCreatorViewProps> = ({
  detectiveProfile,
  onUpdateDetective,
  customNames,
  onUpdateCustomNames,
  suspects,
  onStartInvestigation,
}) => {
  const [selectedAppearanceIndex, setSelectedAppearanceIndex] = useState(0);

  const suspectKeys = suspects ? (Object.keys(suspects) as SuspectId[]) : [];

  const handleNameChange = (val: string) => {
    onUpdateDetective({ ...detectiveProfile, name: val });
    onUpdateCustomNames({ ...customNames, detective: val });
  };

  const handleStart = () => {
    sounds.playClick();
    onStartInvestigation();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-slate-100 animate-fadeIn">
      
      {/* Title Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 border border-amber-900/50 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Shield className="w-64 h-64 text-amber-500" />
        </div>

        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
            <Award className="w-4 h-4 text-amber-500" />
            <span>DETECTIVE CREATION & CAST BRIEFING</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
            Design Your Detective & Review Cast
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Customize your lead investigator's persona, appearance, and backstory before diving into the murder mystery case at the Grand Azure Estate.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Detective Creator Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6 bg-slate-900/90 border border-amber-900/40 rounded-2xl p-6 shadow-xl">
          
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-serif font-bold text-amber-200 flex items-center space-x-2">
              <User className="w-5 h-5 text-amber-500" />
              <span>1. Detective Personal Identity</span>
            </h2>
          </div>

          {/* Primary & Secondary Detective Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-amber-400 uppercase">
                Primary Lead Detective Name:
              </label>
              <input
                type="text"
                value={detectiveProfile.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Akshat Mishra"
                className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-sm text-amber-100 font-serif focus:outline-none shadow-inner"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-indigo-400 uppercase">
                Secondary Detective / Partner Name:
              </label>
              <input
                type="text"
                value={detectiveProfile.detective2 || customNames.detective2 || 'Inspector Devrik Basu'}
                onChange={(e) => {
                  const val = e.target.value;
                  onUpdateDetective({ ...detectiveProfile, detective2: val });
                  onUpdateCustomNames({ ...customNames, detective2: val });
                }}
                placeholder="e.g. Inspector Devrik Basu"
                className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-indigo-100 font-serif focus:outline-none shadow-inner"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-amber-400 uppercase">
                Badge / License ID:
              </label>
              <input
                type="text"
                value={detectiveProfile.badgeNumber}
                onChange={(e) => onUpdateDetective({ ...detectiveProfile, badgeNumber: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-sm text-amber-100 font-mono focus:outline-none shadow-inner"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-indigo-400 uppercase">
                Partner Unit Assignment:
              </label>
              <input
                type="text"
                value={detectiveProfile.partnerSpecialization || 'Special Cyber Operations Unit'}
                onChange={(e) => onUpdateDetective({ ...detectiveProfile, partnerSpecialization: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-indigo-100 font-mono focus:outline-none shadow-inner"
              />
            </div>
          </div>

          {/* Specialization Perk */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-amber-400 uppercase block">
              Detective Core Specialization Perk:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Forensic Analyst', 'Micro-Expression Expert', 'Rogue Interrogator', 'Cyber Sleuth'] as const).map((spec) => {
                const isSelected = detectiveProfile.specialization === spec;
                return (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      onUpdateDetective({ ...detectiveProfile, specialization: spec });
                    }}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-amber-400 mb-0.5">PERK</div>
                    {spec}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Appearance Choice */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-amber-400 uppercase block">
              Select Visual Appearance & Style:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {APPEARANCE_PRESETS.map((preset, idx) => {
                const isSelected = selectedAppearanceIndex === idx;
                return (
                  <div
                    key={preset.id}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedAppearanceIndex(idx);
                      onUpdateDetective({ ...detectiveProfile, appearance: preset.desc });
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-amber-950/60 border-amber-500 text-amber-100 shadow-lg'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2 font-serif font-bold text-xs sm:text-sm text-amber-200">
                      <span className="text-lg">{preset.icon}</span>
                      <span>{preset.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      {preset.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Backstory */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-amber-400 uppercase">
                Detective Backstory & Origin:
              </label>
              <span className="text-[10px] text-slate-400 font-mono">Customizable</span>
            </div>

            <textarea
              value={detectiveProfile.backstory}
              onChange={(e) => onUpdateDetective({ ...detectiveProfile, backstory: e.target.value })}
              rows={3}
              className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl p-3 text-xs text-amber-100 font-mono leading-relaxed focus:outline-none resize-none shadow-inner"
            />

            <div className="flex flex-wrap gap-2 pt-1">
              {BACKSTORY_PRESETS.map((story, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    onUpdateDetective({ ...detectiveProfile, backstory: story });
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 font-mono"
                >
                  Preset {i + 1}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Assigned Cast Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <h2 className="text-base font-serif font-bold text-amber-200 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                <span>2. Active Case Cast Briefing</span>
              </h2>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                11 Characters
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Your detective profile is assigned to the investigation of <strong className="text-amber-200">{customNames.victim}</strong>'s murder. Below is the suspect and witness manifest:
            </p>

            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              
              {/* Victim Card */}
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-serif font-bold text-rose-200 flex items-center space-x-1.5">
                    <span>💀 {customNames.victim}</span>
                  </div>
                  <p className="text-[11px] text-rose-300/80">The Victim & Host of Grand Azure Estate</p>
                </div>
                <span className="text-[10px] font-mono bg-rose-900/60 text-rose-200 px-2 py-0.5 rounded">
                  DECEASED
                </span>
              </div>

              {/* Suspects & Witnesses */}
              {(suspectKeys.length > 0 ? suspectKeys : ALL_SUSPECT_IDS).map((sKey, idx) => {
                const suspect = suspects?.[sKey];
                const customName = customNames[sKey as keyof CustomNames] || suspect?.defaultName || `Suspect #${idx + 1}`;
                const role = suspect?.role || 'Suspect Person of Interest';

                return (
                  <div
                    key={sKey}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-amber-900/50 transition-colors"
                  >
                    <div>
                      <div className="text-xs font-serif font-bold text-amber-100 flex items-center space-x-1.5">
                        <span>🕵️ {customName}</span>
                      </div>
                      <p className="text-[10px] text-slate-400">{role}</p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      SUSPECT #{idx + 1}
                    </span>
                  </div>
                );
              })}

            </div>

            {/* Launch Investigation Button */}
            <div className="pt-2">
              <button
                onClick={handleStart}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-950/50 flex items-center justify-center space-x-2 transition-all transform active:scale-95"
              >
                <span>Enter Crime Scene & Begin Investigation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
