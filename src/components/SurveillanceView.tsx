import React, { useState } from 'react';
import { MysteryCase, CustomNames, Suspect } from '../types';
import { replaceNames } from '../utils/nameFormatter';
import { Camera, Eye, Zap, Shield, Play, Pause, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';
import { sounds } from '../utils/sound';

interface SurveillanceViewProps {
  currentCase: MysteryCase;
  customNames: CustomNames;
  suspects: Record<string, Suspect>;
}

export const SurveillanceView: React.FC<SurveillanceViewProps> = ({
  currentCase,
  customNames,
  suspects,
}) => {
  const [activeCam, setActiveCam] = useState<'cam1' | 'cam2' | 'cam3' | 'cam4'>('cam1');
  const [activeTime, setActiveTime] = useState<'09:00 PM' | '09:30 PM' | '09:47 PM' | '10:18 PM' | '10:30 PM'>('09:47 PM');
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [isNightVision, setIsNightVision] = useState(false);

  const cameras = [
    { id: 'cam1', name: 'CAM-01: OBSERVATORY ENTRY HALL', location: 'Restricted Wing' },
    { id: 'cam2', name: 'CAM-02: MAIN DINING ROOM', location: 'Ground Floor' },
    { id: 'cam3', name: 'CAM-03: EAST TERRACE', location: 'Perimeter Courtyard' },
    { id: 'cam4', name: 'CAM-04: PRIVATE STUDY & OFFICE', location: 'Second Floor' },
  ];

  const times = ['09:00 PM', '09:30 PM', '09:47 PM', '10:18 PM', '10:30 PM'] as const;

  const getFeedDescription = () => {
    const killerSuspect = (Object.values(suspects) as Suspect[]).find(s => s.isKiller);
    const killerName = killerSuspect ? customNames[killerSuspect.id as keyof CustomNames] || killerSuspect.defaultName : 'A shadowy figure';

    if (activeCam === 'cam1' && activeTime === '09:47 PM') {
      return `⚠️ ANOMALY DETECTED: Electronic keycard log activated at Observatory doorway. ${killerName} observed entering quietly with gloved hands.`;
    } else if (activeCam === 'cam1' && activeTime === '10:18 PM') {
      return `🚨 SIGNAL INTERRUPTED: Security feed cuts to static for 12 minutes. Tampered wiring or intentional circuit break detected!`;
    } else if (activeCam === 'cam2' && activeTime === '09:00 PM') {
      return `Normal Feed: Guests seated at formal dinner. Victim presiding at head of the table.`;
    } else if (activeCam === 'cam3' && activeTime === '09:30 PM') {
      return `Terrace Feed: Suspect departing toward courtyard after heated verbal dispute.`;
    } else if (activeCam === 'cam4' && activeTime === '10:30 PM') {
      return `Office Feed: Police flashlight beams illuminate desk drawer containing broken telescope lens fragments.`;
    } else {
      return `Standard Security Archive Footage. No direct physical contact logged at this exact minute mark.`;
    }
  };

  const handleEnhance = () => {
    sounds.playUVToggle();
    setIsEnhanced(prev => !prev);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 shadow-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3 text-emerald-400">
          <Camera className="w-7 h-7 text-emerald-500" />
          <div>
            <h2 className="text-xl font-serif font-bold text-emerald-100 uppercase tracking-wider">
              ESTATE CCTV SURVEILLANCE CONTROL ROOM
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Scrub recorded security feeds across critical time windows to spot movement anomalies
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsNightVision(prev => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
              isNightVision
                ? 'bg-emerald-900 text-emerald-200 border-emerald-500'
                : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
          >
            {isNightVision ? 'Night Vision ON' : 'Night Vision OFF'}
          </button>
        </div>
      </div>

      {/* CCTV Monitor Setup */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Left Column: Camera Selector */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-3">
          <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-2">
            CAMERA CHANNELS
          </div>

          <div className="space-y-2">
            {cameras.map((cam) => {
              const isSelected = activeCam === cam.id;
              return (
                <button
                  key={cam.id}
                  onClick={() => {
                    sounds.playClueFound();
                    setActiveCam(cam.id as any);
                    setIsEnhanced(false);
                  }}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100 shadow-md scale-102 font-bold'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-mono">{cam.name}</div>
                  <div className="text-[10px] font-mono text-slate-500">{cam.location}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center/Right 3 Columns: Main Video Monitor Screen */}
        <div className="md:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          
          {/* Time Scrubber Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">
              SELECT TIMESTAMPS:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {times.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    sounds.playClueFound();
                    setActiveTime(t);
                    setIsEnhanced(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    activeTime === t
                      ? 'bg-emerald-600 text-slate-950 shadow-md scale-105'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Simulated CCTV Screen Container */}
          <div className={`relative w-full h-80 rounded-2xl border-2 overflow-hidden flex flex-col justify-between p-4 shadow-2xl transition-all ${
            isNightVision ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-200'
          }`}>
            {/* Screen Header Overlay */}
            <div className="flex justify-between items-center text-xs font-mono font-bold border-b border-white/10 pb-2 z-10">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span>REC &bull; {cameras.find(c => c.id === activeCam)?.name}</span>
              </div>
              <div>{activeTime} &bull; 30 FPS</div>
            </div>

            {/* Middle Video Frame Content */}
            <div className="relative z-10 my-auto text-center space-y-2 p-4 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10">
              <div className="text-xs sm:text-sm font-mono leading-relaxed text-slate-100">
                {getFeedDescription()}
              </div>

              {isEnhanced && (
                <div className="p-2.5 bg-emerald-900/60 border border-emerald-500 rounded-lg text-xs font-mono text-emerald-200 animate-fadeIn">
                  🔍 ENHANCED OPTICAL ZOOM: Thermal shadow detected near door handle. Friction smudges logged.
                </div>
              )}
            </div>

            {/* Screen Footer Overlay */}
            <div className="flex justify-between items-center text-[10px] font-mono z-10 border-t border-white/10 pt-2">
              <span>SECURITY LOG ID: #{activeCam.toUpperCase()}_{activeTime.replace(/[\s:]/g, '')}</span>
              <button
                onClick={handleEnhance}
                className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg shadow transition-all active:scale-95 flex items-center space-x-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>{isEnhanced ? 'Reset Zoom' : 'Enhance Frame'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
