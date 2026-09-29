import React, { useState } from 'react';
import { MysteryCase, CustomNames, Suspect, Evidence, ALL_SUSPECT_IDS } from '../types';
import { replaceNames } from '../utils/nameFormatter';
import { Award, BarChart3, CheckCircle2, Shield, Sparkles, RefreshCw, Trophy, FileText, AlertTriangle, UserCheck, Flame, ArrowUpDown } from 'lucide-react';
import { sounds } from '../utils/sound';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts';

interface CaseAnalyticsViewProps {
  currentCase: MysteryCase;
  customNames: CustomNames;
  suspects: Record<string, Suspect>;
  evidenceList: Evidence[];
  onShuffleCase?: () => void;
}

export const CaseAnalyticsView: React.FC<CaseAnalyticsViewProps> = ({
  currentCase,
  customNames,
  suspects,
  evidenceList,
  onShuffleCase,
}) => {
  const [sortBySuspicion, setSortBySuspicion] = useState(false);

  const totalClues = evidenceList.length;
  const discoveredClues = evidenceList.filter(e => e.discovered).length;
  const discoveryPercent = totalClues > 0 ? Math.round((discoveredClues / totalClues) * 100) : 0;

  const suspectCount = Object.keys(suspects).length;

  let detectiveRank = 'Rank B - Competent Investigator';
  if (discoveryPercent >= 80) detectiveRank = 'Rank S - Master Detective';
  else if (discoveryPercent >= 50) detectiveRank = 'Rank A - Senior Inspector';

  // Build data for all 15 suspects
  const rawData = ALL_SUSPECT_IDS.map((id, idx) => {
    const suspect = suspects[id];
    const resolvedName = customNames[id as keyof CustomNames] || (suspect ? suspect.defaultName : `Suspect ${idx + 1}`);
    const suspicion = suspect ? Math.min(100, Math.max(0, suspect.suspicionLevel ?? 20)) : 20;
    const interrogationCount = suspect && suspect.interrogationHistory ? suspect.interrogationHistory.length : 0;
    
    return {
      id,
      name: resolvedName,
      shortName: resolvedName.length > 10 ? resolvedName.slice(0, 9) + '…' : resolvedName,
      suspicion,
      role: suspect ? suspect.role : 'Classmate / Staff',
      interrogationCount,
      isKiller: suspect ? suspect.isKiller : false,
    };
  });

  const chartData = [...rawData].sort((a, b) => {
    if (sortBySuspicion) return b.suspicion - a.suspicion;
    return ALL_SUSPECT_IDS.indexOf(a.id as any) - ALL_SUSPECT_IDS.indexOf(b.id as any);
  });

  const primeSuspect = [...rawData].sort((a, b) => b.suspicion - a.suspicion)[0];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-950 border border-amber-600/80 p-3.5 rounded-xl shadow-2xl font-mono text-xs space-y-1.5 max-w-xs z-50">
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5">
            <span className="font-bold text-amber-200 text-sm">{data.name}</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              data.suspicion >= 75 ? 'bg-rose-950 text-rose-300 border border-rose-800' :
              data.suspicion >= 40 ? 'bg-amber-950 text-amber-300 border border-amber-800' :
              'bg-emerald-950 text-emerald-300 border border-emerald-800'
            }`}>
              {data.suspicion}% SUSPICION
            </span>
          </div>
          <p className="text-slate-400 text-[11px]"><strong className="text-slate-300">Role:</strong> {data.role}</p>
          <p className="text-slate-400 text-[11px]"><strong className="text-slate-300">Interrogations Logged:</strong> {data.interrogationCount} messages</p>
          {data.suspicion >= 80 && (
            <p className="text-rose-400 font-bold text-[10px] bg-rose-950/60 p-1 rounded border border-rose-900 mt-1">
              🚨 HIGH THREAT - Strong contradictions or physical links detected!
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3 text-indigo-400">
          <BarChart3 className="w-7 h-7 text-indigo-400" />
          <div>
            <h2 className="text-xl font-serif font-bold text-indigo-100 uppercase tracking-wider">
              INVESTIGATION ANALYTICS & SUSPECT AUDIT
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Live evidence discovery progress, suspect suspicion levels & case audit metrics
            </p>
          </div>
        </div>
        <div className="px-3 py-1 bg-indigo-950/80 border border-indigo-600/60 rounded-xl text-xs font-mono text-indigo-300 font-bold">
          {detectiveRank}
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-2">
          <div className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-widest">
            EVIDENCE DISCOVERED
          </div>
          <div className="text-2xl font-serif font-bold text-amber-100">
            {discoveredClues} / {totalClues}
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${discoveryPercent}%` }} />
          </div>
          <div className="text-[10px] font-mono text-slate-400 text-right">{discoveryPercent}% Unlocked</div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-2">
          <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-widest">
            SUSPECTS UNDER AUDIT
          </div>
          <div className="text-2xl font-serif font-bold text-emerald-100">
            {chartData.length} Suspects
          </div>
          <div className="text-[10px] font-mono text-slate-400">Class 9A & Precinct Roster</div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-2">
          <div className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-widest">
            DETECTIVE RATING
          </div>
          <div className="text-xl font-serif font-bold text-purple-200 truncate">
            {detectiveRank.split(' - ')[0]}
          </div>
          <div className="text-[10px] font-mono text-slate-400">{detectiveRank.split(' - ')[1]}</div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-2">
          <div className="text-[10px] font-mono text-rose-400 uppercase font-bold tracking-widest flex items-center justify-between">
            <span>PRIME SUSPECT</span>
            <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
          </div>
          <div className="text-lg font-serif font-bold text-rose-200 truncate">
            {primeSuspect ? primeSuspect.name : 'Unknown'}
          </div>
          <div className="text-[10px] font-mono text-rose-400 font-bold">
            {primeSuspect ? `${primeSuspect.suspicion}% Suspicion` : '0%'}
          </div>
        </div>

      </div>

      {/* Recharts Bar Chart Section: All 15 Suspects Suspicion Levels */}
      <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs uppercase tracking-widest">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              <span>DYNAMIC SUSPICION MATRIX (ALL {chartData.length} SUSPECTS)</span>
            </div>
            <h3 className="text-lg font-serif font-bold text-amber-100">
              Suspect Threat & Guilt Metric Breakdown
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                sounds.playClick();
                setSortBySuspicion(prev => !prev);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-amber-700/60 text-amber-300 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>{sortBySuspicion ? 'Sort: Roster Order' : 'Sort: Highest Suspicion'}</span>
            </button>
          </div>
        </div>

        <p className="text-xs font-mono text-slate-400">
          Suspicion levels adjust dynamically as you conduct interrogations, present evidence, and uncover key alibi contradictions across all suspects.
        </p>

        {/* Chart Canvas */}
        <div className="w-full h-80 pt-4 bg-slate-950/80 rounded-xl border border-slate-800/80 p-2 sm:p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 45 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
              <XAxis 
                dataKey="shortName" 
                tick={{ fill: '#cbd5e1', fontSize: 10, fontFamily: 'monospace' }} 
                interval={0}
                angle={-45}
                textAnchor="end"
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="suspicion" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => {
                  let fillColor = '#10b981'; // green for low
                  if (entry.suspicion >= 75) fillColor = '#f43f5e'; // rose for high
                  else if (entry.suspicion >= 45) fillColor = '#f59e0b'; // amber for mid
                  return <Cell key={`cell-${index}`} fill={fillColor} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono pt-2">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
            <span className="text-slate-300">Low Suspicion (&lt;45%)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block"></span>
            <span className="text-slate-300">Elevated Risk (45%-74%)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-sm bg-rose-500 inline-block"></span>
            <span className="text-slate-300">Prime Suspect (75%+)</span>
          </div>
        </div>
      </div>

      {/* Case Overview & Detective Notebook Report */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-serif font-bold text-indigo-200 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>OFFICIAL POLICE CASE BRIEFING SUMMARY</span>
          </h3>

          {onShuffleCase && (
            <button
              onClick={() => {
                sounds.playClueFound();
                onShuffleCase();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-950 hover:bg-indigo-900 border border-indigo-600/60 text-indigo-200 text-xs font-mono font-bold transition-all active:scale-95 flex items-center space-x-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Shuffle Killer & Replay Case</span>
            </button>
          )}
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-sans text-slate-300 leading-relaxed">
          <div><strong className="text-amber-300 font-serif">Case Title:</strong> {currentCase.title}</div>
          <div><strong className="text-amber-300 font-serif">Victim:</strong> {customNames.victim}</div>
          <div><strong className="text-amber-300 font-serif">Time of Incident:</strong> {currentCase.timeOfDeath}</div>
          <div><strong className="text-amber-300 font-serif">Cause of Death:</strong> {currentCase.causeOfDeath}</div>
          <div className="pt-2 border-t border-slate-800 text-slate-400 italic">
            "{replaceNames(currentCase.synopsis, customNames)}"
          </div>
        </div>
      </div>

    </div>
  );
};

