import React, { useState } from 'react';
import { MysteryCase, CustomNames, Suspect, Evidence, TimelineEvent } from '../types';
import { replaceNames } from '../utils/nameFormatter';
import { Clock, AlertTriangle, CheckCircle2, UserCheck, ShieldAlert, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import { sounds } from '../utils/sound';

interface TimelineViewProps {
  currentCase: MysteryCase;
  customNames: CustomNames;
  suspects: Record<string, Suspect>;
  evidenceList: Evidence[];
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  currentCase,
  customNames,
  suspects,
  evidenceList,
}) => {
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);
  const [reconstructedEntries, setReconstructedEntries] = useState<Record<number, string>>({});
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(null);

  // Default preset timeline events if case doesn't specify custom ones
  const defaultTimelineEvents: TimelineEvent[] = currentCase.timeline && currentCase.timeline.length > 0 ? currentCase.timeline : [
    {
      time: '09:00 PM',
      title: 'Formal Dinner Begins',
      description: 'All estate guests and staff were accounted for in the main dining hall. {VICTIM} made an announcement regarding upcoming academic/estate audits.',
      involvedNameKey: '{VICTIM}',
      isKeyTurningPoint: false,
    },
    {
      time: '09:30 PM',
      title: 'Dispute & Early Departure',
      description: 'A heated argument erupted near the terrace. {SUSPECT_3} was overheard storming out toward the east corridor.',
      involvedNameKey: '{SUSPECT_3}',
      isKeyTurningPoint: true,
    },
    {
      time: '09:47 PM',
      title: 'Observatory Door Access Logged',
      description: 'Security keycard log records unauthorized entry into the restricted Observatory chamber.',
      involvedNameKey: '{SUSPECT_1}',
      isKeyTurningPoint: true,
    },
    {
      time: '10:05 PM',
      title: 'Telescope & Laboratory Equipment Activated',
      description: 'Power grid fluctuations indicate high-draw optical or chemical equipment was booted up in the crime scene.',
      involvedNameKey: '{VICTIM}',
      isKeyTurningPoint: false,
    },
    {
      time: '10:18 PM',
      title: 'MISSING TIMELINE GAP [CRUCIAL MURDER WINDOW]',
      description: 'Unaccounted 12 minutes. Security cameras in the hallway went silent or were tampered with.',
      involvedNameKey: 'UNKNOWN CULPRIT',
      isKeyTurningPoint: true,
    },
    {
      time: '10:30 PM',
      title: 'Body Discovered & Lockdown Initiated',
      description: '{VICTIM}\'s body was discovered. Police and Detective {DETECTIVE} were summoned to seal the perimeter.',
      involvedNameKey: '{VICTIM}',
      isKeyTurningPoint: true,
    },
  ];

  const timelineEvents = defaultTimelineEvents;

  const handleChallengeEvent = (event: TimelineEvent, index: number) => {
    sounds.playClueFound();
    setSelectedEventIndex(index);

    if (index === 4) { // Missing gap
      const killerSuspect = (Object.values(suspects) as Suspect[]).find(s => s.isKiller);
      const killerName = killerSuspect ? customNames[killerSuspect.id as keyof CustomNames] || killerSuspect.defaultName : 'The Killer';
      setChallengeFeedback(`🔎 TIMELINE RECONSTRUCTION: At 10:18 PM, ${killerName} entered the room using stolen access codes while security cameras were disabled!`);
    } else {
      setChallengeFeedback(`Verified Event: Cross-referenced with witness statements & physical logs at ${event.time}.`);
    }
  };

  const TIMELINE_THEMES = [
    {
      border: 'border-emerald-500/50 hover:border-emerald-400',
      bg: 'bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-900',
      badge: 'bg-emerald-950 text-emerald-300 border-emerald-600/70',
      title: 'text-emerald-100',
      dot: 'bg-emerald-950 border-emerald-400 text-emerald-300',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]',
    },
    {
      border: 'border-orange-500/50 hover:border-orange-400',
      bg: 'bg-gradient-to-br from-orange-950/30 via-slate-900 to-slate-900',
      badge: 'bg-orange-950 text-orange-300 border-orange-600/70',
      title: 'text-orange-100',
      dot: 'bg-orange-950 border-orange-400 text-orange-300',
      glow: 'shadow-[0_0_15px_rgba(249,115,22,0.2)]',
    },
    {
      border: 'border-cyan-500/50 hover:border-cyan-400',
      bg: 'bg-gradient-to-br from-cyan-950/30 via-slate-900 to-slate-900',
      badge: 'bg-cyan-950 text-cyan-300 border-cyan-600/70',
      title: 'text-cyan-100',
      dot: 'bg-cyan-950 border-cyan-400 text-cyan-300',
      glow: 'shadow-[0_0_15px_rgba(6,182,212,0.2)]',
    },
    {
      border: 'border-indigo-500/50 hover:border-indigo-400',
      bg: 'bg-gradient-to-br from-indigo-950/30 via-slate-900 to-slate-900',
      badge: 'bg-indigo-950 text-indigo-300 border-indigo-600/70',
      title: 'text-indigo-100',
      dot: 'bg-indigo-950 border-indigo-400 text-indigo-300',
      glow: 'shadow-[0_0_15px_rgba(99,102,241,0.2)]',
    },
    {
      border: 'border-rose-500 ring-2 ring-rose-500/40',
      bg: 'bg-gradient-to-br from-rose-950/60 via-slate-900 to-slate-900',
      badge: 'bg-rose-950 text-rose-200 border-rose-500 font-bold',
      title: 'text-rose-100',
      dot: 'bg-rose-950 border-rose-500 text-rose-300 animate-pulse',
      glow: 'shadow-[0_0_20px_rgba(244,63,94,0.4)]',
    },
    {
      border: 'border-amber-400/70 hover:border-amber-300',
      bg: 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900',
      badge: 'bg-amber-950 text-amber-300 border-amber-500/80',
      title: 'text-amber-100',
      dot: 'bg-amber-950 border-amber-400 text-amber-300',
      glow: 'shadow-[0_0_15px_rgba(245,158,11,0.25)]',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner with Multi-spectral Gradient */}
      <div className="relative bg-gradient-to-r from-amber-950/80 via-purple-950/70 to-cyan-950/80 border border-amber-500/40 rounded-2xl p-6 shadow-2xl space-y-2 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-amber-400">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-amber-500/60 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-cyan-200">
                CRIME NIGHT CHRONOLOGICAL TIMELINE
              </h2>
              <p className="text-xs font-mono text-slate-300">
                Reconstruct events from 9:00 PM to 10:30 PM &bull; Locate the missing 10:18 PM murder window
              </p>
            </div>
          </div>
          <div className="px-3.5 py-1.5 bg-gradient-to-r from-rose-950 to-amber-950 border border-rose-500/60 rounded-xl text-xs font-mono text-rose-200 font-bold shadow-lg flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>Time of Death: {currentCase.timeOfDeath}</span>
          </div>
        </div>
      </div>

      {/* Challenge Feedback Modal / Alert */}
      {challengeFeedback && (
        <div className="p-4 bg-gradient-to-r from-amber-950/90 via-purple-950/90 to-slate-900 border-2 border-amber-500 rounded-xl text-amber-100 text-xs font-mono font-bold shadow-2xl animate-fadeIn flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 animate-spin" />
            <span>{challengeFeedback}</span>
          </div>
          <button
            onClick={() => setChallengeFeedback(null)}
            className="text-slate-400 hover:text-white px-2 py-1 bg-slate-900 rounded border border-slate-700"
          >
            ✕
          </button>
        </div>
      )}

      {/* Timeline Event Cards Vertical Spine */}
      <div className="relative border-l-2 border-gradient-to-b from-amber-500 via-rose-500 to-cyan-500 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
        {timelineEvents.map((evt, idx) => {
          const formattedDesc = replaceNames(evt.description, customNames);
          const isGap = evt.title.includes('MISSING') || evt.time === '10:18 PM';
          const isSelected = selectedEventIndex === idx;
          const theme = isGap ? TIMELINE_THEMES[4] : TIMELINE_THEMES[idx % TIMELINE_THEMES.length];

          return (
            <div key={idx} className="relative group">
              {/* Timeline Marker Dot */}
              <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shadow-md ${theme.dot}`}>
                {isGap ? <AlertTriangle className="w-3.5 h-3.5" /> : <Clock className="w-3 h-3" />}
              </div>

              {/* Event Content Card */}
              <div className={`p-5 rounded-2xl border transition-all ${theme.bg} ${theme.border} ${theme.glow} ${
                isSelected ? 'ring-2 ring-amber-400/80 shadow-2xl scale-[1.01]' : 'shadow-xl'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold border ${theme.badge}`}>
                      {evt.time}
                    </span>
                    <h3 className={`font-serif font-bold text-sm sm:text-base ${theme.title}`}>
                      {evt.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleChallengeEvent(evt, idx)}
                    className={`px-3 py-1.5 rounded-lg text-slate-950 text-xs font-bold font-mono transition-all active:scale-95 flex items-center space-x-1 shadow-md ${
                      isGap ? 'bg-rose-500 hover:bg-rose-400 text-white' : 'bg-amber-500 hover:bg-amber-400'
                    }`}
                  >
                    <span>{isGap ? 'Reconstruct Gap' : 'Inspect Event'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-3">
                  {formattedDesc}
                </p>

                {/* Suspects Whereabouts at this time */}
                <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-2 text-[11px] font-mono">
                  <span className="text-slate-400 uppercase tracking-widest font-bold">Key Figure:</span>
                  <span className="text-amber-300 font-bold bg-slate-950/90 px-2.5 py-0.5 rounded-lg border border-amber-500/40">
                    {replaceNames(evt.involvedNameKey, customNames)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Suspect Alibi Verification Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
        <h3 className="text-sm font-serif font-bold text-amber-200 flex items-center space-x-2">
          <UserCheck className="w-4 h-4 text-amber-500" />
          <span>SUSPECT ALIBI CROSS-REFERENCE TABLE</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {(Object.values(suspects) as Suspect[]).map((s, idx) => {
            const customName = customNames[s.id as keyof CustomNames] || s.defaultName;
            const alibiText = replaceNames(s.alibi, customNames);
            const isContradictory = s.isKiller;

            return (
              <div 
                key={s.id} 
                className={`p-4 rounded-2xl border transition-all space-y-2 text-xs shadow-lg ${
                  isContradictory
                    ? 'bg-gradient-to-br from-rose-950/40 via-slate-950 to-slate-950 border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                    : 'bg-gradient-to-br from-emerald-950/30 via-slate-950 to-slate-950 border-emerald-500/40 hover:border-emerald-400'
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${isContradictory ? 'bg-rose-500 animate-pulse' : 'bg-emerald-400'}`} />
                    <span className="font-serif font-bold text-slate-100">{customName}</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-300 bg-slate-900 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    {s.role}
                  </span>
                </div>
                <div className="text-slate-300 font-sans italic text-[11px] leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                  "{alibiText}"
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono pt-1">
                  <span className="text-slate-400">Alibi Credibility:</span>
                  <span className={`px-2 py-0.5 rounded-full border font-bold ${
                    isContradictory 
                      ? 'bg-rose-950 text-rose-300 border-rose-500/80' 
                      : 'bg-emerald-950 text-emerald-300 border-emerald-500/80'
                  }`}>
                    {isContradictory ? '⚠️ Contradictory' : '✓ Verified Alibi'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
