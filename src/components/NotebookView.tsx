import React, { useState } from 'react';
import { Suspect, SuspectId, CustomNames, MysteryCase } from '../types';
import { replaceNames } from '../utils/nameFormatter';
import { BookOpen, Edit3, CheckSquare, Square, Clock, FileText, Check, ShieldAlert, Sparkles, Compass, AlertCircle } from 'lucide-react';
import { sounds } from '../utils/sound';

interface NotebookViewProps {
  suspects: Record<string, Suspect>;
  customNames: CustomNames;
  currentCase: MysteryCase;
  notes: string;
  onUpdateNotes: (newNotes: string) => void;
}

export const NotebookView: React.FC<NotebookViewProps> = ({
  suspects,
  customNames,
  currentCase,
  notes,
  onUpdateNotes,
}) => {
  const suspectKeys = Object.keys(suspects) as SuspectId[];
  const [clearedSuspects, setClearedSuspects] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'matrix' | 'mindmap' | 'timeline' | 'motives'>('matrix');

  const toggleCleared = (id: string) => {
    sounds.playClick();
    setClearedSuspects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getCustomName = (id: SuspectId) => {
    return customNames[id as keyof CustomNames] || suspects[id]?.defaultName || 'Suspect';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-slate-100 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 mb-1">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>DETECTIVE'S CASEBOOK & JOURNAL</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-amber-100">
            {replaceNames(currentCase.title, customNames)}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Victim: <strong className="text-rose-300">{customNames.victim}</strong> &bull; Location: <strong className="text-amber-200">{customNames.location}</strong> &bull; Cause: {currentCase.causeOfDeath}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start md:self-center">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'matrix' ? 'bg-amber-600 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Suspect Matrix ({suspectKeys.length})
          </button>
          <button
            onClick={() => setActiveTab('mindmap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'mindmap' ? 'bg-amber-600 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            📌 Case Board
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'timeline' ? 'bg-amber-600 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Plot Timeline
          </button>
          <button
            onClick={() => setActiveTab('motives')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'motives' ? 'bg-amber-600 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Core Motives
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Notebook Tab Content (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* TAB 1: SUSPECT MATRIX */}
          {activeTab === 'matrix' && (
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                SUSPECT ALIBIS & MOTIVES MATRIX
              </span>

              {suspectKeys.map((id) => {
                const s = suspects[id];
                if (!s) return null;
                const name = getCustomName(id);
                const isCleared = !!clearedSuspects[id];

                return (
                  <div
                    key={id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isCleared
                        ? 'bg-slate-950/60 border-slate-800 opacity-60'
                        : 'bg-slate-900 border-amber-900/40 shadow-lg'
                    }`}
                  >
                    <div className="flex items-start justify-between border-b border-slate-800 pb-3 mb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className={`text-base font-serif font-bold ${isCleared ? 'line-through text-slate-500' : 'text-amber-100'}`}>
                            {name}
                          </h3>
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                            {s.role}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Relation to Victim: {replaceNames(s.relationToVictim, customNames)}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleCleared(id)}
                        className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                          isCleared
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-600/50'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {isCleared ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                        <span>{isCleared ? 'Suspect Cleared' : 'Rule Out'}</span>
                      </button>
                    </div>

                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-amber-400 font-bold block mb-0.5">Known Motive:</span>
                        {replaceNames(s.motive, customNames)}
                      </div>
                      <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-amber-400 font-bold block mb-0.5">Stated Alibi:</span>
                        {replaceNames(s.alibi, customNames)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: CASE BOARD / MIND MAP */}
          {activeTab === 'mindmap' && (
            <div className="space-y-4 bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2 text-amber-300 font-serif font-bold text-base">
                  <Compass className="w-5 h-5 text-amber-500" />
                  <span>Detective Case Board & Red Thread Links</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-1 rounded border border-amber-800">
                  VISUAL NETWORK MAP
                </span>
              </div>

              {/* Central Victim Node */}
              <div className="flex flex-col items-center justify-center p-4 bg-rose-950/80 border-2 border-rose-600 rounded-2xl shadow-xl space-y-1 text-center">
                <span className="text-[10px] font-mono font-bold text-rose-300 uppercase tracking-widest">
                  VICTIM (CENTER OF INVESTIGATION)
                </span>
                <h3 className="text-xl font-serif font-bold text-rose-100">
                  {customNames.victim}
                </h3>
                <p className="text-xs text-rose-200/90 font-mono">
                  Location: {customNames.location} &bull; Time of Crime: {currentCase.timeOfDeath}
                </p>
              </div>

              {/* Red String Connections Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {suspectKeys.map((id) => {
                  const s = suspects[id];
                  if (!s) return null;
                  const name = getCustomName(id);
                  const isCleared = !!clearedSuspects[id];
                  const suspicion = s.suspicionLevel || 20;

                  return (
                    <div
                      key={id}
                      className={`p-4 rounded-xl border relative space-y-2 transition-all ${
                        isCleared
                          ? 'bg-slate-950/50 border-slate-800 opacity-50'
                          : suspicion > 60
                          ? 'bg-amber-950/60 border-amber-500 shadow-md'
                          : 'bg-slate-950/80 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-serif font-bold text-amber-100">{name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-800">
                          {s.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 line-clamp-2">
                        <strong className="text-slate-400 font-mono">Link: </strong>
                        {replaceNames(s.relationToVictim, customNames)}
                      </p>
                      <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-900">
                        <span>Threat Index: <strong className="text-amber-400">{suspicion}%</strong></span>
                        <span className="text-rose-400">🔴 Connected by thread</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 3: PLOT TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-4 bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Clock className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-serif font-bold text-amber-200">
                  Timeline of Events (Pre & Post Murder)
                </h3>
              </div>

              <div className="relative border-l-2 border-amber-900/50 ml-3 space-y-6 py-2">
                {(currentCase.timeline || [
                  {
                    time: '8:00 PM',
                    title: 'Gala Banquet Commences',
                    description: '{VICTIM} gathers all guests in the main dining hall for the evening announcement.',
                    involvedNameKey: '{VICTIM}',
                  },
                  {
                    time: '9:30 PM',
                    title: 'Verbal Dispute Recorded',
                    description: 'Heated altercation breaks out regarding missing funds and patent documents.',
                    involvedNameKey: '{SUSPECT_1}',
                  },
                  {
                    time: '10:15 PM',
                    title: 'Total Power Blackout',
                    description: 'Estate main circuit breaks down. Security cameras dark for 12 minutes.',
                    involvedNameKey: '{SUSPECT_2}',
                    isKeyTurningPoint: true,
                  },
                  {
                    time: '10:25 PM',
                    title: 'Fatal Crime Committed',
                    description: '{VICTIM} suffers fatal blow on the upper deck during the blackout.',
                    involvedNameKey: '{VICTIM}',
                    isKeyTurningPoint: true,
                  },
                  {
                    time: '10:45 PM',
                    title: 'Detective Arrival',
                    description: 'Detective {DETECTIVE} seals all perimeter exits and begins questioning.',
                    involvedNameKey: '{DETECTIVE}',
                  },
                ]).map((event, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${
                      event.isKeyTurningPoint ? 'bg-rose-500 border-rose-200 animate-pulse' : 'bg-amber-600 border-amber-300'
                    }`} />
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-amber-400">
                          ⏱️ {event.time}
                        </span>
                        {event.isKeyTurningPoint && (
                          <span className="text-[10px] font-mono bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                            KEY TURNING POINT
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-serif font-bold text-amber-100">
                        {replaceNames(event.title, customNames)}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {replaceNames(event.description, customNames)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CORE MOTIVES & UNCOVER GUIDE */}
          {activeTab === 'motives' && (
            <div className="space-y-4 bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-serif font-bold text-amber-200">
                  Three Core Motives & How to Uncover Them
                </h3>
              </div>

              <div className="space-y-4">
                {(currentCase.motives || [
                  {
                    id: 'm1',
                    title: '1. Disinheritance & Urgent Debt Crisis',
                    description: '{SUSPECT_3} was facing crippling underground loan shark debts and learned {VICTIM} was cutting them out of the inheritance will.',
                    suspectKey: 'suspect3',
                    uncoverMethod: 'Inspect the Study Desk Drawer in {VICTIM}\'s Study to discover the Unsigned Will Draft.',
                    discovered: true,
                  },
                  {
                    id: 'm2',
                    title: '2. Multi-Million Dollar AI Patent Theft',
                    description: '{SUSPECT_1} & {SUSPECT_2} discovered {VICTIM} was illegally transferring their neural network patents to offshore buyers.',
                    suspectKey: 'suspect1',
                    uncoverMethod: 'Examine the Workstation Terminal in the Tech Hub for the Encrypted Flash Drive.',
                    discovered: false,
                  },
                  {
                    id: 'm3',
                    title: '3. Embezzlement Audit Exposure',
                    description: 'Corporate audit specialists faced immediate criminal indictment after an unexpected financial audit was ordered.',
                    suspectKey: 'suspect4',
                    uncoverMethod: 'Search behind the Oil Painting in the Estate Library to locate the Wall Safe Ledger.',
                    discovered: false,
                  },
                ]).map((motive) => (
                  <div key={motive.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <h4 className="text-sm font-serif font-bold text-amber-300">
                      {replaceNames(motive.title, customNames)}
                    </h4>
                    <p className="text-xs text-slate-300">
                      {replaceNames(motive.description, customNames)}
                    </p>
                    <div className="bg-amber-950/40 p-2.5 rounded-lg border border-amber-900/60 text-xs text-amber-200">
                      <strong className="text-amber-400 font-mono block mb-0.5">🔍 HOW TO UNCOVER IN GAME:</strong>
                      {replaceNames(motive.uncoverMethod, customNames)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Freeform Personal Notepad (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-amber-900/40 rounded-2xl p-5 shadow-2xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2 text-amber-300 font-serif font-bold text-base">
              <Edit3 className="w-5 h-5 text-amber-500" />
              <span>Detective Scratchpad</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
              <Check className="w-3 h-3" />
              <span>Auto-saved</span>
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Write down your observations, piece together timelines, or eliminate suspects:
          </p>

          <textarea
            value={notes}
            onChange={(e) => onUpdateNotes(e.target.value)}
            placeholder={`Notes regarding ${customNames.victim}'s case...\n- ${customNames.suspect1}: claims he was in wine cellar...\n- ${customNames.suspect3}: acted nervous when debts were mentioned...\n- Blackout lasted 12 minutes...`}
            rows={16}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-amber-100 font-mono leading-relaxed focus:outline-none focus:border-amber-500 transition-colors resize-none shadow-inner"
          />

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <span className="font-bold text-amber-400 block font-mono">
              💡 INVESTIGATION TIP:
            </span>
            <p>
              Cross-examine suspect alibis against physical evidence in the Evidence Vault. When you have identified the true culprit, click "Accuse" in the navbar!
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
