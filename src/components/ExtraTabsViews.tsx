import React, { useState } from 'react';
import { 
  GameStage, 
  MysteryCase, 
  CustomNames, 
  Suspect, 
  SuspectId, 
  Evidence 
} from '../types';
import { 
  Crosshair, 
  FlaskConical, 
  Fingerprint, 
  Activity, 
  FileText, 
  DollarSign, 
  Radio, 
  HeartPulse, 
  MapPin, 
  Key, 
  Archive, 
  ShieldAlert, 
  Brain, 
  FileCheck, 
  Dog, 
  Clock, 
  Lock, 
  Terminal, 
  Box, 
  Building,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  Download,
  Search,
  Filter,
  Eye,
  RefreshCw,
  Zap,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Cpu,
  UserCheck,
  Dna,
  Mic,
  PenTool,
  Navigation,
  Volume2,
  Layers,
  Signal,
  PawPrint,
  Globe,
  EyeOff,
  Droplets,
  Plane,
  Satellite,
  Compass,
  Landmark,
  Ruler,
  Scale,
  Megaphone,
  Shield,
  Users,
  Flame
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface ExtraTabsViewsProps {
  stage: GameStage;
  currentCase: MysteryCase;
  customNames: CustomNames;
  suspects: Record<string, Suspect>;
  evidenceList: Evidence[];
}

export const ExtraTabsViews: React.FC<ExtraTabsViewsProps> = ({
  stage,
  currentCase,
  customNames,
  suspects,
  evidenceList,
}) => {
  const [selectedSuspectId, setSelectedSuspectId] = useState<SuspectId>('suspect1');
  const [activeSubTab, setActiveSubTab] = useState<string>('overview');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cipherInput, setCipherInput] = useState('LXW VSNUBNW DBX VNXUD');
  const [cipherShift, setCipherShift] = useState(3);
  const [safeCombination, setSafeCombination] = useState(['0', '0', '0', '0']);

  // Dynamic Refresh / Re-analyze Indices for all 20 Tabs
  const [ballisticsIndex, setBallisticsIndex] = useState(0);
  const [toxIndex, setToxIndex] = useState(0);
  const [fingerprintIndex, setFingerprintIndex] = useState(0);
  const [autopsyIndex, setAutopsyIndex] = useState(0);
  const [witnessIndex, setWitnessIndex] = useState(0);
  const [ledgerIndex, setLedgerIndex] = useState(0);
  const [radioIndex, setRadioIndex] = useState(0);
  const [gpsIndex, setGpsIndex] = useState(0);
  const [cipherIndex, setCipherIndex] = useState(0);
  const [coldCaseIndex, setColdCaseIndex] = useState(0);
  const [tipsIndex, setTipsIndex] = useState(0);
  const [psychIndex, setPsychIndex] = useState(0);
  const [warrantIndex, setWarrantIndex] = useState(0);
  const [k9Index, setK9Index] = useState(0);
  const [alibiIndex, setAlibiIndex] = useState(0);
  const [vaultIndex, setVaultIndex] = useState(0);
  const [darkWebIndex, setDarkWebIndex] = useState(0);
  const [recon3dIndex, setRecon3dIndex] = useState(0);
  const [chiefIndex, setChiefIndex] = useState(0);
  const [dnaIndex, setDnaIndex] = useState(0);
  const [tacticalIndex, setTacticalIndex] = useState(0);
  const [voiceIndex, setVoiceIndex] = useState(0);
  const [handwritingIndex, setHandwritingIndex] = useState(0);
  const [droneIndex, setDroneIndex] = useState(0);

  // 20 Ultra Detective Tab State Indices
  const [cellTowerIndex, setCellTowerIndex] = useState(0);
  const [k9SearchIndex, setK9SearchIndex] = useState(0);
  const [thermalIndex, setThermalIndex] = useState(0);
  const [cyberIndex, setCyberIndex] = useState(0);
  const [weaponIndex, setWeaponIndex] = useState(0);
  const [interpolIndex, setInterpolIndex] = useState(0);
  const [undercoverIndex, setUndercoverIndex] = useState(0);
  const [arsonIndex, setArsonIndex] = useState(0);
  const [spatterIndex, setSpatterIndex] = useState(0);
  const [passengerIndex, setPassengerIndex] = useState(0);
  const [lockerIndex, setLockerIndex] = useState(0);
  const [informantIndex, setInformantIndex] = useState(0);
  const [inquestIndex, setInquestIndex] = useState(0);
  const [securityIndex, setSecurityIndex] = useState(0);
  const [fiberIndex, setFiberIndex] = useState(0);
  const [satelliteIndex, setSatelliteIndex] = useState(0);
  const [shadowIndex, setShadowIndex] = useState(0);
  const [sketchIndex, setSketchIndex] = useState(0);
  const [subpoenaIndex, setSubpoenaIndex] = useState(0);
  const [pressIndex, setPressIndex] = useState(0);

  const getSuspectName = (id: SuspectId) => {
    return customNames[id as keyof CustomNames] || suspects[id]?.defaultName || `Suspect ${id}`;
  };

  const suspectList = Object.keys(suspects).map((k) => suspects[k as SuspectId]).filter(Boolean);

  const victimName = customNames.victim || 'Devrik Basu';
  const detectiveName = customNames.detective || 'Akshat Mishra';

  // Render individual view based on stage
  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* 1. BALLISTICS REPORT */}
      {stage === 'BALLISTICS_REPORT' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-rose-950/80 border border-rose-600/50 rounded-xl text-rose-400">
                <Crosshair className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-rose-400 uppercase">LAB FILE #BAL-902 &bull; SCAN #{ballisticsIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Ballistics & Firearms Analysis</h2>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  setBallisticsIndex(prev => (prev + 1) % 3);
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-Scan Casing / Cycle Micro-Zoom</span>
              </button>
              <span className="text-xs font-mono bg-slate-800 text-amber-300 px-3 py-1.5 rounded-lg border border-slate-700">
                Caliber: {ballisticsIndex === 0 ? '9mm Luger' : ballisticsIndex === 1 ? '.38 Special' : '.45 ACP'} &bull; Rifling: 1:10 Right
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-2">
                <Crosshair className="w-4 h-4 text-rose-400" />
                <span>Microscopic Striation Analysis (View #{ballisticsIndex + 1})</span>
              </h3>
              <div className="aspect-square bg-slate-900 rounded-lg border border-slate-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <div className={`w-32 h-32 rounded-full border-4 ${ballisticsIndex === 0 ? 'border-amber-500/80' : ballisticsIndex === 1 ? 'border-rose-500/80' : 'border-emerald-500/80'} flex items-center justify-center relative animate-pulse`}>
                  <div className="w-24 h-24 rounded-full border-2 border-rose-500/60 flex items-center justify-center">
                    <span className="text-2xl">{ballisticsIndex === 0 ? '🎯' : ballisticsIndex === 1 ? '🔍' : '⚡'}</span>
                  </div>
                </div>
                <p className="text-xs font-mono text-slate-300 mt-4 text-center font-bold">
                  {ballisticsIndex === 0 && 'Firing Pin Impression: Striated Groove Delta-B (High Match)'}
                  {ballisticsIndex === 1 && 'Breech Face Markings: Diagonal Shearing Pattern (Modified Gun)'}
                  {ballisticsIndex === 2 && 'Ejector Port Scratching: Parallel Micro-Groove Match'}
                </p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-lg text-xs font-mono text-slate-300 space-y-1 border border-slate-800">
                <p><span className="text-amber-400 font-bold">Location Found:</span> {currentCase.locations[ballisticsIndex % currentCase.locations.length]?.name || 'Crime Scene'}</p>
                <p><span className="text-amber-400 font-bold">Distance Range:</span> {ballisticsIndex === 0 ? '3.5m - 4.2m' : ballisticsIndex === 1 ? '1.2m Close Contact' : '7.0m Long Shot'}</p>
                <p><span className="text-amber-400 font-bold">Trajectory Angle:</span> {ballisticsIndex === 0 ? 'High-angle Entry (-18°)' : ballisticsIndex === 1 ? 'Horizontal Trajectory (0°)' : 'Upward Deflection (+12°)'}</p>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <h3 className="text-sm font-mono font-bold text-amber-300 uppercase tracking-wider">Firearm Permit & Suspect Ownership Cross-Reference</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                {suspectList.slice(0, 8).map((s, idx) => (
                  <div key={s.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-amber-600/40 transition-all flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-lg shrink-0">
                      🕵️
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-amber-100 truncate">{getSuspectName(s.id)}</p>
                      <p className="text-[11px] font-mono text-slate-400 truncate">{s.role}</p>
                      <p className="text-[10px] font-mono text-amber-500/90 mt-0.5">
                        {(idx + ballisticsIndex) % 3 === 0 ? '⚠️ Unregistered 9mm Sig Pistol found in locker' : '✅ No registered firearm matching casing'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. TOXICOLOGY LOG */}
      {stage === 'TOXICOLOGY_LOG' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-950/80 border border-purple-600/50 rounded-xl text-purple-400">
                <FlaskConical className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">CHEMICAL LAB RECORD #TOX-408 &bull; TEST #{toxIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Chemical & Toxicology Screen</h2>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  setToxIndex(prev => (prev + 1) % 3);
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-run Mass Spectrometry / Cycle Tissue</span>
              </button>
              <span className="text-xs font-mono bg-purple-900/40 text-purple-300 border border-purple-700/50 px-3 py-1.5 rounded-lg">
                Sample Source: {toxIndex === 0 ? 'Victim Blood Screen' : toxIndex === 1 ? 'Gastric Contents' : 'Hepatic Organ Tissue'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-mono font-bold text-purple-300 uppercase tracking-wider flex items-center space-x-2">
                <FlaskConical className="w-4 h-4" />
                <span>Mass Spectrometry Compound Breakdown</span>
              </h3>
              <div className="space-y-3">
                {[
                  { compound: toxIndex === 0 ? 'Potassium Cyanide Traces' : toxIndex === 1 ? 'Strychnine Residue' : 'Arsenic Trioxide', conc: toxIndex === 0 ? '4.8 mg/L' : toxIndex === 1 ? '8.2 mg/L' : '3.1 mg/L', status: 'CRITICAL', color: 'bg-rose-500' },
                  { compound: toxIndex === 0 ? 'Synthetic Sedative (Zolpidem)' : toxIndex === 1 ? 'Benzodiazepine' : 'Barbiturate Derivative', conc: toxIndex === 0 ? '1.2 mg/L' : toxIndex === 1 ? '2.4 mg/L' : '0.8 mg/L', status: 'SEDATED', color: 'bg-purple-500' },
                  { compound: 'Ethanol / Alcohol Concentration', conc: toxIndex === 0 ? '0.04% BAC' : toxIndex === 1 ? '0.12% BAC' : '0.01% BAC', status: 'NORMAL', color: 'bg-emerald-500' },
                  { compound: 'Organophosphate Residue', conc: '0.01 mg/L', status: 'DETECTED', color: 'bg-amber-500' },
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="font-bold text-slate-200">{item.compound}</span>
                      <span className="text-purple-400 font-bold">{item.conc}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: i === 0 ? '88%' : i === 1 ? '60%' : '30%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-mono font-bold text-purple-300 uppercase tracking-wider">Access To Hazardous Reagents</h3>
              <p className="text-xs text-slate-400 font-mono">Chemical inventory logs cross-referenced with suspect credentials:</p>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {suspectList.slice(0, 6).map((s, idx) => (
                  <div key={s.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono flex items-center justify-between">
                    <div>
                      <span className="font-bold text-amber-200">{getSuspectName(s.id)}</span>
                      <p className="text-[11px] text-slate-400">{s.role}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${(idx + toxIndex) % 2 === 0 ? 'bg-purple-950 text-purple-300 border border-purple-700' : 'bg-slate-800 text-slate-400'}`}>
                      {(idx + toxIndex) % 2 === 0 ? '🧪 Chemical Lab Keycard Access' : '🚫 No Lab Clearance'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. FINGERPRINT DATABASE */}
      {stage === 'FINGERPRINT_DATABASE' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-emerald-950/80 border border-emerald-600/50 rounded-xl text-emerald-400">
                <Fingerprint className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">AFIS IDENTIFICATION MATRIX &bull; BATCH #{fingerprintIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Latent Fingerprint Matcher</h2>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  setFingerprintIndex(prev => (prev + 1) % 3);
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-run AFIS Match / Rescan Minutiae</span>
              </button>
              <span className="text-xs font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1.5 rounded-lg">
                Minutiae Points: {fingerprintIndex === 0 ? '18/20' : fingerprintIndex === 1 ? '15/20' : '19/20'} Matched
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center space-y-4">
              <h3 className="text-sm font-mono font-bold text-emerald-300 uppercase">
                {fingerprintIndex === 0 ? 'Dusting: Crime Scene Glassware' : fingerprintIndex === 1 ? 'Dusting: Door Handle Keypad' : 'Dusting: Safe Combination Dial'}
              </h3>
              <div className="w-40 h-40 mx-auto rounded-full bg-slate-900 border-2 border-emerald-500/50 flex items-center justify-center relative overflow-hidden group">
                <Fingerprint className="w-28 h-28 text-emerald-400/80 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 border border-emerald-500/30 rounded-full animate-ping opacity-20"></div>
              </div>
              <p className="text-xs font-mono text-slate-400">
                {fingerprintIndex === 0 ? 'Smudge recovered from glass beaker handle & table edge.' : fingerprintIndex === 1 ? 'Oily partial print lifted from electronic door keypad #4.' : 'Crisp thumbprint found on vault combination knob.'}
              </p>
            </div>

            <div className="md:col-span-2 space-y-3">
              <h3 className="text-sm font-mono font-bold text-amber-300 uppercase">AFIS Suspect Comparison</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                {suspectList.map((s, idx) => {
                  const match = (idx + fingerprintIndex) % 3 === 0 || s.isKiller;
                  return (
                    <div key={s.id} className={`p-3 rounded-xl border font-mono text-xs transition-all ${match ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-300'}`}>
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-amber-100">{getSuspectName(s.id)}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${match ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                          {match ? '98.4% MATCH' : 'NO MATCH'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">Minutiae Score: {match ? '18 points' : `${((idx + 1) * 4) % 10} points`}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. AUTOPSY ROOM */}
      {stage === 'AUTOPSY_ROOM' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-rose-950/80 border border-rose-600/50 rounded-xl text-rose-400">
                <Activity className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-rose-400 uppercase">CORONER AUTOPSY REPORT #ME-202 &bull; PHASE #{autopsyIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Medical Examiner Autopsy</h2>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  setAutopsyIndex(prev => (prev + 1) % 3);
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-examine Trauma / Next Autopsy Phase</span>
              </button>
              <span className="text-xs font-mono bg-rose-950 text-rose-300 border border-rose-800 px-3 py-1.5 rounded-lg">
                Deceased: {victimName} &bull; TOD: {currentCase.timeOfDeath}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-mono font-bold text-rose-300 uppercase">Autopsy Phase #{autopsyIndex + 1} Findings</h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">🩸 Primary Cause of Death:</span>
                  <p className="text-slate-300">{currentCase.causeOfDeath}</p>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">⏱️ Rigor & Temperature Assessment:</span>
                  <p className="text-slate-300">
                    {autopsyIndex === 0 && 'Full stiffness reached in jaw and upper torso. Liver temp drops indicate TOD between 18:00 - 18:30.'}
                    {autopsyIndex === 1 && 'Petechial hemorrhaging in eyes confirms asphyxiation component prior to chemical exposure.'}
                    {autopsyIndex === 2 && 'Sub-dermal bruising on neck reveals pressure points from a gloved hand.'}
                  </p>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">🔎 Epidermal Scrapings:</span>
                  <p className="text-slate-300">Fingernail scrapings recovered fiber strands matching high-grade wool uniform material.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-mono font-bold text-rose-300 uppercase mb-3">Coroner Summary Note</h3>
                <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                  {autopsyIndex === 0 && '"The victim suffered acute respiratory failure combined with blunt force trauma to the occipital bone."' }
                  {autopsyIndex === 1 && '"Laryngoscopy confirms chemical burns in upper airway. Toxins were ingested or inhaled minutes before death."' }
                  {autopsyIndex === 2 && '"Traces of golden-yellow chalk dust and synthetic lubricant were found transferred onto the victim\'s lapel."' }
                </p>
              </div>
              <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs font-mono text-rose-300">
                ⚠️ CORONER CONCLUSION: Homicide verified. Primary suspect possessed access during window {currentCase.timeOfDeath}.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. WITNESS STATEMENTS */}
      {stage === 'WITNESS_STATEMENTS' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-indigo-950/80 border border-indigo-600/50 rounded-xl text-indigo-400">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">DEPOSITION ARCHIVE &bull; CYCLE #{witnessIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Witness Deposition Logs</h2>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  setWitnessIndex(prev => (prev + 1) % 3);
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-examine Next Statement / Reset View</span>
              </button>
              <span className="text-xs font-mono bg-slate-800 text-amber-300 px-3 py-1.5 rounded-lg border border-slate-700">
                Recorded Depositions: {suspectList.length}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {suspectList.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSuspectId(s.id)}
                  className={`w-full text-left p-3 rounded-xl border font-mono text-xs transition-all ${selectedSuspectId === s.id ? 'bg-indigo-950 border-indigo-500 text-amber-200' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'}`}
                >
                  <p className="font-bold">{getSuspectName(s.id)}</p>
                  <p className="text-[10px] text-slate-500 truncate">{s.role}</p>
                </button>
              ))}
            </div>

            <div className="md:col-span-2 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-sm font-mono font-bold text-indigo-300">
                  Official Statement #{witnessIndex + 1}: {getSuspectName(selectedSuspectId)}
                </h3>
                <span className="text-xs font-mono bg-indigo-900/50 text-indigo-200 px-2 py-0.5 rounded border border-indigo-700">
                  Credibility Index: {witnessIndex === 0 ? '78%' : witnessIndex === 1 ? '45% (Suspicious)' : '92%'}
                </span>
              </div>
              <div className="space-y-3 text-xs font-mono text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p><span className="text-amber-400 font-bold">Relation to Victim:</span> {suspects[selectedSuspectId]?.relationToVictim}</p>
                <p><span className="text-amber-400 font-bold">Stated Alibi:</span> {suspects[selectedSuspectId]?.alibi}</p>
                <p><span className="text-amber-400 font-bold">Deposition Excerpt #{witnessIndex + 1}:</span>
                  {witnessIndex === 0 && ' "I was nowhere near the science wing at that hour. I was reviewing council notes near the cafeteria. Ask anyone!"'}
                  {witnessIndex === 1 && ' "Okay, I might have walked past the corridor around 18:10, but I only heard raised voices. I didn\'t enter!"'}
                  {witnessIndex === 2 && ' "I saw someone wearing a dark hoodie leaving the rear exit in a hurry right around 18:25."'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 6. FINANCIAL LEDGER */}
      {stage === 'FINANCIAL_LEDGER' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-emerald-950/80 border border-emerald-600/50 rounded-xl text-emerald-400">
                <DollarSign className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">AUDIT & BANK TRANSACTIONS &bull; LEDGER BATCH #{ledgerIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Financial Ledger & Money Trail</h2>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  setLedgerIndex(prev => (prev + 1) % 3);
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Run Financial Audit / Fetch Next Bank Ledger</span>
              </button>
              <span className="text-xs font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1.5 rounded-lg">
                Unaccounted Slush Fund: ${(45000 + ledgerIndex * 12500).toLocaleString()}.00
              </span>
            </div>
          </div>

          <div className="space-y-3 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-slate-950 text-emerald-400 border-b border-slate-800">
                  <th className="p-3">Date / Time</th>
                  <th className="p-3">Account Holder</th>
                  <th className="p-3">Transaction Type</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Audit Flag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-950/60 text-slate-300">
                {suspectList.slice(0, 7).map((s, idx) => {
                  const flag = (idx + ledgerIndex) % 3 === 1;
                  return (
                    <tr key={s.id} className="hover:bg-slate-900">
                      <td className="p-3 text-slate-400">2026-08-08 14:{20 + idx * 5}</td>
                      <td className="p-3 font-bold text-amber-200">{getSuspectName(s.id)}</td>
                      <td className="p-3">
                        {ledgerIndex === 0 ? (idx % 2 === 0 ? 'Wire Transfer Out' : 'Crypto Wallet Deposit') :
                         ledgerIndex === 1 ? (idx % 2 === 0 ? 'Offshore Escrow Pay' : 'Cash Withdrawal') :
                         (idx % 2 === 0 ? 'Pawn Shop Purchase' : 'Anonymous Bribe Deposit')}
                      </td>
                      <td className="p-3 font-bold text-emerald-400">${((idx + 1) * 3500 + ledgerIndex * 1500).toLocaleString()}.00</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${flag ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-800 text-slate-400'}`}>
                          {flag ? '🚨 UNEXPLAINED BRIBE / SLUSH' : 'VERIFIED'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. DISPATCH RADIO */}
      {stage === 'DISPATCH_RADIO' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-950/80 border border-amber-600/50 rounded-xl text-amber-400">
                <Radio className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">PRECINCT DISPATCH FREQUENCY {154.250 + radioIndex * 0.125} MHz</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Police Dispatch & Radio Logs</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setRadioIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Tune Frequency / Next Dispatch Shift</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
            {(radioIndex === 0 ? [
              { time: '18:14:02', sender: 'DISPATCH', msg: '911 Emergency caller reporting disturbance near Science Wing.' },
              { time: '18:16:45', sender: 'UNIT 404', msg: 'En route to St. Jude High School. ETA 3 minutes.' },
              { time: '18:20:10', sender: 'UNIT 404', msg: `On scene. Perimeter secured. Requesting Homicide Detective ${detectiveName}.` },
              { time: '18:25:00', sender: 'FORENSICS UNIT', msg: 'Lab team arriving with crime scene lockdown kit.' },
            ] : radioIndex === 1 ? [
              { time: '18:32:15', sender: 'PERIMETER 1', msg: 'Blockading north parking lot exit. Checking all departing vehicles.' },
              { time: '18:40:00', sender: 'CANINE UNIT', msg: 'K9 handler requesting access to locker room hallway.' },
              { time: '18:48:22', sender: 'DISPATCH', msg: 'Coroner report received. Time of death estimated at 18:15.' },
              { time: '18:55:04', sender: 'UNIT 404', msg: 'Found discarded latex gloves near rear fire escape door.' },
            ] : [
              { time: '19:05:10', sender: 'DETECTIVE', msg: 'Subpoena issued for cell tower ping logs across 500m radius.' },
              { time: '19:12:45', sender: 'LAB TECH', msg: 'Chemical toxicology screen reveals elevated toxin presence.' },
              { time: '19:20:00', sender: 'DISPATCH', msg: 'Chief requesting full suspect lineup in Interrogation Room 1.' },
              { time: '19:30:15', sender: 'PRECINCT COMMAND', msg: 'Lockdown status active. No suspects permitted to leave campus.' },
            ]).map((log, i) => (
              <div key={i} className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-start space-x-3">
                <span className="text-amber-500 font-bold shrink-0">{log.time}</span>
                <span className="text-slate-400 font-bold shrink-0">[{log.sender}]:</span>
                <span className="text-slate-200">{log.msg}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. POLYGRAPH TEST */}
      {stage === 'POLYGRAPH_TEST' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-rose-950/80 border border-rose-600/50 rounded-xl text-rose-400">
                <HeartPulse className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-rose-400 uppercase">LIE DETECTOR MONITOR</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Polygraph & Stress Analysis</h2>
              </div>
            </div>
            <select 
              value={selectedSuspectId}
              onChange={(e) => {
                sounds.playClick();
                setSelectedSuspectId(e.target.value as SuspectId);
              }}
              className="bg-slate-950 text-amber-200 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono"
            >
              {suspectList.map(s => (
                <option key={s.id} value={s.id}>{getSuspectName(s.id)}</option>
              ))}
            </select>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="h-28 bg-slate-900 rounded-xl border border-slate-800 flex items-end justify-between p-4 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-around opacity-20">
                <div className="w-full border-t border-rose-500"></div>
              </div>
              {Array.from({ length: 24 }).map((_, i) => {
                const height = (i % 3 === 0 ? 80 : (i * 17) % 60) + 20;
                return (
                  <div 
                    key={i} 
                    className="w-1.5 bg-rose-500 rounded-t animate-pulse"
                    style={{ height: `${height}%`, animationDelay: `${i * 100}ms` }}
                  ></div>
                );
              })}
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Heart Rate</span>
                <span className="text-rose-400 font-bold text-base">124 BPM ⚠️</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">GSR Skin Conductance</span>
                <span className="text-amber-400 font-bold text-base">8.4 µS High</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Deception Probability</span>
                <span className="text-rose-400 font-bold text-base">89% SPIKE</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. GEOLOCATION MAP */}
      {stage === 'GEOLOCATION_MAP' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-emerald-950/80 border border-emerald-600/50 rounded-xl text-emerald-400">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">CELL TOWER TRIANGULATION &bull; SECTOR #{gpsIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Cell Tower & GPS Tracking</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setGpsIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Re-Triangulate Cell Towers / Switch Sector</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 aspect-video flex flex-col items-center justify-center relative overflow-hidden">
              <div className="w-48 h-48 rounded-full border border-emerald-500/30 flex items-center justify-center relative">
                <div className="w-32 h-32 rounded-full border border-emerald-500/50 flex items-center justify-center">
                  <div className="w-3 h-3 bg-rose-500 rounded-full animate-ping"></div>
                </div>
              </div>
              <p className="text-xs font-mono text-emerald-400 mt-4 font-bold">
                Tower Ping Grid: {gpsIndex === 0 ? 'Sector 4 - Science Wing Radius 50m' : gpsIndex === 1 ? 'Sector 2 - East Stairwell & Gymnasium' : 'Sector 7 - North Campus Exit Gate'}
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
              <h3 className="text-sm font-bold text-amber-300 uppercase">Suspect Distance at {currentCase.timeOfDeath}</h3>
              {suspectList.slice(0, 6).map((s, idx) => {
                const distance = ((idx + gpsIndex) * 90) % 500;
                return (
                  <div key={s.id} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                    <span className="font-bold text-slate-200">{getSuspectName(s.id)}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded ${distance < 50 ? 'bg-rose-950 text-rose-300 border border-rose-800 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                      {distance < 50 ? '📍 Science Wing (0m - CRITICAL)' : `📍 ${distance}m Away`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 10. CRYPTANALYSIS DECODER */}
      {stage === 'CRYPTANALYSIS_DECODER' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-950/80 border border-amber-600/50 rounded-xl text-amber-400">
                <Key className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">CIPHER DECODER &bull; NOTE #{cipherIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Cryptanalysis & Cipher Solver</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                const newIndex = (cipherIndex + 1) % 3;
                setCipherIndex(newIndex);
                if (newIndex === 0) setCipherInput('LXW VSNUBNW DBX VNXUD');
                else if (newIndex === 1) setCipherInput('KHOOR ERDUG PHPEHU');
                else setCipherInput('MEET AT THE TOWER AT MIDNIGHT');
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Load Next Encrypted Clue / Reset Cipher</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Encrypted Cipher Note Found at Scene:</label>
              <input 
                type="text" 
                value={cipherInput}
                onChange={(e) => setCipherInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-amber-200"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="text-slate-400">Caesar Shift Key:</label>
              <input 
                type="range" min="1" max="25" value={cipherShift} 
                onChange={(e) => setCipherShift(Number(e.target.value))}
                className="accent-amber-500"
              />
              <span className="text-amber-400 font-bold">Shift: {cipherShift}</span>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-amber-600/40 space-y-1">
              <span className="text-amber-500 font-bold">DECRYPTED MESSAGE OUTPUT:</span>
              <p className="text-base text-amber-100 font-mono tracking-widest">
                {cipherInput.split('').map(char => {
                  if (/[A-Z]/.test(char)) {
                    return String.fromCharCode(((char.charCodeAt(0) - 65 + cipherShift) % 26) + 65);
                  }
                  return char;
                }).join('')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 11. COLD CASE FILES */}
      {stage === 'COLD_CASE_FILES' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-950/80 border border-amber-600/50 rounded-xl text-amber-400">
                <Archive className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">PRECINCT ARCHIVES &bull; VAULT BATCH #{coldCaseIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Cold Case & Prior Records</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setColdCaseIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Search Cold Case Vault / Cycle Archives</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {(coldCaseIndex === 0 ? [
              { year: '2023', case: 'Unsolved Lab Break-in', suspect: 'Unknown Prowler', mo: 'Overridden electronic door sensor.' },
              { year: '2024', case: 'Missing Exam Registry', suspect: 'Student Council Leak', mo: 'Master key duplicated.' },
              { year: '2025', case: 'Anomalous Power Cut', suspect: 'Lab Assistant', mo: 'Breaker box bypassed.' },
            ] : coldCaseIndex === 1 ? [
              { year: '2022', case: 'Extortion File Theft', suspect: 'Anonymous Whistleblower', mo: 'Blackmail USB drive concealed in locker.' },
              { year: '2023', case: 'Poisoned Water Cooler', suspect: 'Chemistry Society President', mo: 'Organophosphate traces in glassware.' },
              { year: '2024', case: 'Falsified Grade Audit', suspect: 'Vice Principal Assistant', mo: 'Admin password brute-forced.' },
            ] : [
              { year: '2021', case: 'High School Vault Robbery', suspect: 'Syndicate Operative', mo: '4-digit mechanical tumbler cracked.' },
              { year: '2023', case: 'CCTV Blindspot Sabotage', suspect: 'Security Guard', mo: 'Power relay disabled at 18:00.' },
              { year: '2025', case: 'Unregistered Sig Sauer Seizure', suspect: 'Local Gun Dealer', mo: 'Serial number filed off casing.' },
            ]).map((item, i) => (
              <div key={i} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-700 text-[10px] font-bold">{item.year} COLD FILE</span>
                <h4 className="font-bold text-amber-100 text-sm">{item.case}</h4>
                <p className="text-slate-400">Modus Operandi: {item.mo}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 12. ANONYMOUS TIPS */}
      {stage === 'ANONYMOUS_TIPS' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-rose-950/80 border border-rose-600/50 rounded-xl text-rose-400">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-rose-400 uppercase">HOTLINE TIP INBOX &bull; QUEUE #{tipsIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Crime Stoppers Anonymous Tips</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setTipsIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Hotline Feed / Fetch Next Tip Queue</span>
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {(tipsIndex === 0 ? [
              { id: 'TIP-801', source: 'Encrypted Whistleblower', text: 'Check the locker behind the gym. Someone threw a wiped USB drive in the drain at 18:30!' },
              { id: 'TIP-802', source: 'Payphone Call', text: 'The killer was arguing with the victim about council budget funds earlier that morning.' },
            ] : tipsIndex === 1 ? [
              { id: 'TIP-803', source: 'Darkweb Forum PM', text: 'I saw someone wiping down a beaker in the chemical supply room right before the alarm sounded.' },
              { id: 'TIP-804', source: 'Anonymous SMS', text: 'Look at the financial ledger! Bribes were transferred from an offshore account.' },
            ] : [
              { id: 'TIP-805', source: 'Encrypted Voice Note', text: 'The keycard logs were tampered with around 18:12 to create a fake alibi!' },
              { id: 'TIP-806', source: 'Student Drop Box', text: 'Someone dropped a leather glove stained with yellow chalk near the east fire exit.' },
            ]).map((tip) => (
              <div key={tip.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-amber-400 font-bold">
                  <span>{tip.id} &bull; {tip.source}</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">VERIFIED HIGH PRIORITY</span>
                </div>
                <p className="text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">"{tip.text}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 13. PSYCHOLOGICAL PROFILE */}
      {stage === 'PSYCHOLOGICAL_PROFILE' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-950/80 border border-purple-600/50 rounded-xl text-purple-400">
                <Brain className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">BEHAVIORAL PROFILER &bull; LAYER #{psychIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Criminal Psychological Profile</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setPsychIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Re-evaluate Psych Matrix / Next Layer</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-purple-300 uppercase">Profiler Assessment Layer #{psychIndex + 1}</h3>
              <p className="text-slate-300 leading-relaxed">
                {psychIndex === 0 && 'The offender displays high-functioning premeditated traits. Choice of crime scene indicates intimate familiarity with school schedules and keycard access locks.'}
                {psychIndex === 1 && 'Narcissistic personality pattern present. Offender seeks control and orchestrated a calculated staging to frame an innocent peer.'}
                {psychIndex === 2 && 'High stress-vulnerability observed during interrogation. Likely to experience sudden deception spikes when confronted with physical fiber evidence.'}
              </p>
            </div>
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-purple-300 uppercase">Suspect Risk Score</h3>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300 font-bold">{getSuspectName('suspect1')}</span>
                <span className="text-rose-400 font-bold">Psychopathy Index: {82 + psychIndex * 5}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 14. SEARCH WARRANTS */}
      {stage === 'SEARCH_WARRANTS' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-950/80 border border-amber-600/50 rounded-xl text-amber-400">
                <FileCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">JUDICIAL AUTHORIZATION &bull; WARRANT #{warrantIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Search Warrants & Seizures</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setWarrantIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Issue New Judicial Search Warrant / Refresh Seizures</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
              <div>
                <span className="font-bold text-amber-200">
                  {warrantIndex === 0 && 'Warrant #W-901: Locker & Personal Electronics'}
                  {warrantIndex === 1 && 'Warrant #W-902: Off-Campus Residence & Vehicle Search'}
                  {warrantIndex === 2 && 'Warrant #W-903: Encrypted Cloud Storage & Financial Records'}
                </span>
                <p className="text-slate-400">Target: {getSuspectName('suspect1')}</p>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-700 rounded text-[10px] font-bold">APPROVED BY JUDGE</span>
            </div>
          </div>
        </div>
      )}

      {/* 15. SEARCH AND RESCUE */}
      {stage === 'SEARCH_AND_RESCUE' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-emerald-950/80 border border-emerald-600/50 rounded-xl text-emerald-400">
                <Dog className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">K9 CANINE TRACKING &bull; TRAIL #{k9Index + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">K9 Unit & Scent Trail Logs</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setK9Index(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Redeploy K9 Handler / Track Next Scent Trail</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
            <p className="text-emerald-400 font-bold">🐕 Handler Note (K9 Unit "Buster" - Trail #{k9Index + 1}):</p>
            <p className="text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
              {k9Index === 0 && 'Scent acquired from victim\'s jacket. K9 tracked scent from Science Wing corridor directly to the east stairwell, terminating at Locker #14.'}
              {k9Index === 1 && 'Scent acquired from discarded latex glove. K9 alerted aggressively near the chemical storage room entrance.'}
              {k9Index === 2 && 'Scent acquired from yellow chalk smudge. K9 followed trail past rear exit into north parking bay.'}
            </p>
          </div>
        </div>
      )}

      {/* 16. ALIBI VERIFIER */}
      {stage === 'ALIBI_VERIFIER' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-950/80 border border-amber-600/50 rounded-xl text-amber-400">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">TIME GAP AUDITOR &bull; GRID VIEW #{alibiIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Alibi Verification Grid</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setAlibiIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Cross-Reference CCTV Timelines / Reset Grid</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {suspectList.slice(0, 6).map((s, idx) => {
              const gap = (idx + alibiIndex) % 3 === 1;
              return (
                <div key={s.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-amber-200 font-bold">
                    <span>{getSuspectName(s.id)}</span>
                    <span className={gap ? 'text-rose-400' : 'text-emerald-400'}>
                      {gap ? '⚠️ 15 MIN UNACCOUNTED GAP' : '✅ ALIBI VERIFIED'}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{s.alibi}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 17. BLACKMAIL VAULT */}
      {stage === 'BLACKMAIL_VAULT' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-rose-950/80 border border-rose-600/50 rounded-xl text-rose-400">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-rose-400 uppercase">SECRET EVIDENCE SAFE &bull; VAULT LOCK #{vaultIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Blackmail Safe & Extortion Vault</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setVaultIndex(prev => (prev + 1) % 3);
                setSafeCombination([String((vaultIndex + 1) % 10), '8', '3', '0']);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Scramble Lock / Reveal Next Document</span>
            </button>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 font-mono text-xs space-y-4 text-center">
            <p className="text-amber-400 font-bold">🔒 Enter 4-Digit Combination Tumbler:</p>
            <div className="flex justify-center space-x-3">
              {safeCombination.map((digit, i) => (
                <button 
                  key={i} 
                  onClick={() => {
                    sounds.playClick();
                    const next = [...safeCombination];
                    next[i] = String((Number(next[i]) + 1) % 10);
                    setSafeCombination(next);
                  }}
                  className="w-12 h-14 bg-slate-900 border-2 border-amber-500/60 rounded-xl text-xl font-bold text-amber-200 flex items-center justify-center shadow-inner hover:border-amber-400 transition-all"
                >
                  {digit}
                </button>
              ))}
            </div>
            <p className="text-slate-500 text-[11px]">Click digits to rotate combination dials (Vault Lock #{vaultIndex + 1})</p>
          </div>
        </div>
      )}

      {/* 18. DARK WEB FORUM */}
      {stage === 'DARK_WEB_FORUM' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-emerald-950/80 border border-emerald-600/50 rounded-xl text-emerald-400">
                <Terminal className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">CYBER UNDERGROUND IRC &bull; NODE #{darkWebIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Dark Web & Crypto Wallet Logs</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setDarkWebIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Intercept Next Darknet IRC Feed / Refresh Node</span>
            </button>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-600/40 font-mono text-xs text-emerald-400 space-y-2">
            <p>[IRC Node 192.168.1.{104 + darkWebIndex} Connected - SSL Encrypted]</p>
            {darkWebIndex === 0 && (
              <>
                <p>&lt;Anon_Ghost&gt;: Selling leaked master answer key PDF for 0.05 BTC.</p>
                <p>&lt;User_Dark_Net&gt;: Payment confirmed to wallet 0x88f...91a.</p>
              </>
            )}
            {darkWebIndex === 1 && (
              <>
                <p>&lt;Shadow_Admin&gt;: Wiping server access logs for St. Jude High School.</p>
                <p>&lt;Cipher_Zero&gt;: Crypto transaction 0.12 ETH escowed to anonymizer pool.</p>
              </>
            )}
            {darkWebIndex === 2 && (
              <>
                <p>&lt;K3y_Clon3r&gt;: Master keycard RFID clone file generated for Science Lab.</p>
                <p>&lt;Anon_Ghost&gt;: Delivery confirmed to locker #14 drop site.</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* 19. RECONSTRUCTION 3D */}
      {stage === 'RECONSTRUCTION_3D' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-indigo-950/80 border border-indigo-600/50 rounded-xl text-indigo-400">
                <Box className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">3D VIRTUAL SPATIAL MODEL &bull; PERSPECTIVE #{recon3dIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">3D Crime Scene Reconstruction</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setRecon3dIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Rotate 3D Perspective / Re-simulate Trajectory</span>
            </button>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 aspect-video flex flex-col items-center justify-center space-y-3 font-mono text-xs">
            <div className={`w-32 h-32 border-2 ${recon3dIndex === 0 ? 'border-indigo-500/60 rotate-45' : recon3dIndex === 1 ? 'border-amber-500/60 rotate-12' : 'border-rose-500/60 -rotate-12'} rounded-xl flex items-center justify-center animate-spin`} style={{ animationDuration: '15s' }}>
              <span className="text-2xl">{recon3dIndex === 0 ? '📐' : recon3dIndex === 1 ? '📊' : '🎯'}</span>
            </div>
            <p className="text-indigo-300 font-bold">
              {recon3dIndex === 0 && '3D Wireframe Trajectory Simulation Loaded (Top-Down Overview)'}
              {recon3dIndex === 1 && '3D Spatial Collision & Point of Impact Projection'}
              {recon3dIndex === 2 && '3D Escape Vector & Blindspot Sightline Map'}
            </p>
          </div>
        </div>
      )}

      {/* 20. CHIEF BRIEFING */}
      {stage === 'CHIEF_BRIEFING' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-950/80 border border-amber-600/50 rounded-xl text-amber-400">
                <Building className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">PRECINCT COMMAND &bull; BRIEFING #{chiefIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Police Chief Daily Briefing</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setChiefIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Call Press Conference / Chief Update</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-amber-400 font-bold">Chief of Police Memo #{chiefIndex + 1}:</span>
              <span className="text-slate-400">Detective: {detectiveName}</span>
            </div>
            <p className="text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
              {chiefIndex === 0 && '"Detective, the Mayor and the Press are breathing down my neck. You have 24 hours to present conclusive physical evidence before this case gets reassigned!"'}
              {chiefIndex === 1 && '"Good work on gathering the lab forensics. Now verify the alibis and test the primary suspect on the polygraph machine!"'}
              {chiefIndex === 2 && '"The District Attorney is ready to issue an indictment warrant. Make sure your physical evidence chain of custody is bulletproof!"'}
            </p>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Precinct Press Pressure</span>
                <span className="text-rose-400 font-bold text-sm">{94 - chiefIndex * 10}%</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Evidence Integrity Score</span>
                <span className="text-emerald-400 font-bold text-sm">EXCELLENT {98}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 21. DNA & GENETIC PROFILING */}
      {stage === 'DNA_PROFILING' && (
        <div className="bg-slate-900 border border-purple-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-950/80 border border-purple-600/50 rounded-xl text-purple-400">
                <Dna className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">GENETIC LAB &bull; BATCH #{dnaIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">DNA & Genetic Profiling</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setDnaIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Re-Sequence PCR Genetic Sample</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">Select Suspect Sample</h3>
              <div className="space-y-1.5 max-h-72 overflow-y-auto custom-scrollbar">
                {suspectList.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedSuspectId(s.id);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg text-xs font-mono transition-all flex items-center justify-between ${
                      selectedSuspectId === s.id
                        ? 'bg-purple-950 text-purple-200 border border-purple-500/60 font-bold'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-850'
                    }`}
                  >
                    <span className="truncate">{getSuspectName(s.id)}</span>
                    <span className="text-[10px] text-purple-400 font-bold shrink-0 ml-1">
                      {selectedSuspectId === s.id ? 'MATCHING...' : 'CHECK'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-xs font-mono text-purple-400 font-bold uppercase">
                  STR Allele Comparison: {getSuspectName(selectedSuspectId)}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  PCR Cycle #32
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs text-center">
                <div className="p-3 bg-slate-900 rounded-lg border border-purple-900/40">
                  <span className="text-slate-400 text-[10px] block">TH01 Locus</span>
                  <span className="text-purple-300 font-bold text-sm">9.3 / 9.3</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-purple-900/40">
                  <span className="text-slate-400 text-[10px] block">TPOX Locus</span>
                  <span className="text-purple-300 font-bold text-sm">8 / 11</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-purple-900/40">
                  <span className="text-slate-400 text-[10px] block">CSF1PO Locus</span>
                  <span className="text-purple-300 font-bold text-sm">10 / 12</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-purple-900/40">
                  <span className="text-slate-400 text-[10px] block">vWA Marker</span>
                  <span className="text-purple-300 font-bold text-sm">16 / 18</span>
                </div>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Familial Genetic Probability Match:</span>
                  <span className="text-purple-400 font-bold">
                    {dnaIndex === 0 ? '98.4% High Partial Match' : dnaIndex === 1 ? '12.1% Non-Match Excluded' : '99.9% Definitive Match'}
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="bg-purple-500 h-full transition-all duration-500"
                    style={{ width: dnaIndex === 0 ? '98%' : dnaIndex === 1 ? '12%' : '100%' }}
                  />
                </div>
                <p className="text-slate-400 text-[11px] pt-1">
                  {dnaIndex === 0 && `Epithelial skin cell trace recovered from the beaker handle matches ${getSuspectName(selectedSuspectId)}.`}
                  {dnaIndex === 1 && `Hair follicle sample shows a distinct genetic allele variation; excluding primary suspect from secondary door sample.`}
                  {dnaIndex === 2 && `Saliva swab recovered from the lab counter yields a 1 in 4.2 billion random match probability.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 22. TACTICAL SWAT BREACH */}
      {stage === 'TACTICAL_ENTRY' && (
        <div className="bg-slate-900 border border-rose-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-rose-950/80 border border-rose-600/50 rounded-xl text-rose-400">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-rose-400 uppercase">TACTICAL COMMAND &bull; PLAN #{tacticalIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Tactical SWAT Breach Protocol</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setTacticalIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Re-Calculate Entry Vector</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-900 rounded-lg border border-rose-900/40">
                <span className="text-slate-400 block text-[10px]">Breach Route Target</span>
                <span className="text-rose-400 font-bold text-sm">
                  {tacticalIndex === 0 ? 'Rear Exit Door B' : tacticalIndex === 1 ? 'Chemistry Lab Window' : 'Main Corridor Entry'}
                </span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-rose-900/40">
                <span className="text-slate-400 block text-[10px]">Thermal Heat Signatures</span>
                <span className="text-amber-400 font-bold text-sm">3 Individuals Detected</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-rose-900/40">
                <span className="text-slate-400 block text-[10px]">Perimeter Containment</span>
                <span className="text-emerald-400 font-bold text-sm">100% LOCKED DOWN</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-rose-400 font-bold text-xs uppercase flex items-center space-x-2">
                <span>Tactical Entry Directive:</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                {tacticalIndex === 0 && 'Deploy flashbang canisters at 04:18 PM. Alpha team enters from the gymnasium corridor while Bravo secures the rear emergency stairs.'}
                {tacticalIndex === 1 && 'Deploy thermal drone over Science Lab 2. Secure suspect belongings and isolate all Class 9A witnesses before evidence tampering can occur.'}
                {tacticalIndex === 2 && 'Perimeter officers holding position. Search warrant #409-B executed on suspect lockers and private storage bins.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 23. VOICE SPECTRUM & WIRETAP */}
      {stage === 'VOICE_SPECTRUM' && (
        <div className="bg-slate-900 border border-indigo-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-indigo-950/80 border border-indigo-600/50 rounded-xl text-indigo-400">
                <Mic className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">ACOUSTICS LAB &bull; RECORDING #{voiceIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Voice Spectrum & Wiretap Analysis</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setVoiceIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Isolate Background Noise / Filter Wiretap</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-indigo-400 font-bold">Audio Wiretap Spectrogram Visualizer</span>
              <span className="text-slate-400">Sample Rate: 48 kHz / 24-bit</span>
            </div>

            <div className="h-20 bg-slate-900 rounded-xl border border-indigo-900/40 p-3 flex items-center justify-center space-x-1 overflow-hidden">
              {[40, 75, 30, 90, 60, 100, 45, 80, 55, 95, 35, 70, 85, 50, 65, 90, 40, 70, 85, 30, 95, 60].map((h, i) => (
                <div
                  key={i}
                  className={`w-2 bg-gradient-to-t ${i % 2 === 0 ? 'from-indigo-600 to-amber-400' : 'from-indigo-900 to-rose-400'} rounded-full transition-all duration-300 animate-pulse`}
                  style={{ height: `${(h * (voiceIndex + 1)) % 100}%` }}
                />
              ))}
            </div>

            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-slate-300">
                <span>Vocal Pitch & Stress Frequency Match:</span>
                <span className="text-indigo-400 font-bold">{92.8 - voiceIndex * 8}% Confidence</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {voiceIndex === 0 && `"Background audio analysis isolates the Class 9A school bell chime at 04:14 PM right before the call disconnected."`}
                {voiceIndex === 1 && `"Acoustic analysis reveals a second voice in the background whispering about the chemistry podium key."`}
                {voiceIndex === 2 && `"Vocal micro-tremors in the voice note indicate elevated heart rate and stress consistent with high deception."`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 24. FORENSIC HANDWRITING & INK */}
      {stage === 'HANDWRITING_ANALYSIS' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-950/80 border border-amber-600/50 rounded-xl text-amber-400">
                <PenTool className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">GRAPHOLOGY LAB &bull; SAMPLE #{handwritingIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Handwriting & Ink Chromatography</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setHandwritingIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Run Ink Solvent Chromatography</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-slate-900 rounded-lg border border-amber-900/40">
                <span className="text-slate-400 block text-[10px]">Ink Dye Composition</span>
                <span className="text-amber-400 font-bold text-sm">Gel Ballpoint #4</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-amber-900/40">
                <span className="text-slate-400 block text-[10px]">Stroke Pen Pressure</span>
                <span className="text-amber-400 font-bold text-sm">Heavy Downward</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-amber-900/40">
                <span className="text-slate-400 block text-[10px]">Letter Slant Slopes</span>
                <span className="text-amber-400 font-bold text-sm">15° Right Inclination</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-amber-900/40">
                <span className="text-slate-400 block text-[10px]">Forgery Probability</span>
                <span className="text-rose-400 font-bold text-sm">
                  {handwritingIndex === 0 ? 'HIGH (Forged)' : handwritingIndex === 1 ? 'LOW (Authentic)' : 'MODERATE'}
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Document Examiner Note:</span>
              <p className="text-slate-300 leading-relaxed">
                {handwritingIndex === 0 && 'Tear marks on the hall pass paper match the spiral notebook recovered from the Class 9A desk drawer.'}
                {handwritingIndex === 1 && 'Chemical solvent testing isolates iron gall ink components identical to the pen found in the crime scene coat pocket.'}
                {handwritingIndex === 2 && 'Microscopic stroke analysis shows hesitation marks near the signature line, indicating a rushed copy.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 25. DRONE AERIAL RECON */}
      {stage === 'DRONE_RECON' && (
        <div className="bg-slate-900 border border-emerald-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-emerald-950/80 border border-emerald-600/50 rounded-xl text-emerald-400">
                <Navigation className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">AERIAL COMMAND &bull; PATROL #{droneIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Drone Thermal Aerial Recon</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setDroneIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Switch Thermal Drone Flight Pattern</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center text-emerald-400 font-bold border-b border-slate-800 pb-2">
              <span>LIVE DRONE RECON FEED [4K THERMAL]</span>
              <span>Altitude: 120m | Battery: 88%</span>
            </div>

            <div className="aspect-video bg-slate-900 rounded-xl border border-emerald-900/50 p-6 flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
              <div className="w-24 h-24 rounded-full border-2 border-emerald-500/80 flex items-center justify-center animate-ping" />
              <span className="text-emerald-300 font-bold z-10">
                {droneIndex === 0 && '🎯 Scanning Roof Exit Route & Science Block Courtyard'}
                {droneIndex === 1 && '🔍 Tracking Perimeter Gate Movement Near Gymnasium'}
                {droneIndex === 2 && '🚨 Thermal Footprint Tracked to Parking Lot B'}
              </span>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">Aerial Reconnaissance Intelligence:</span>
              <p className="text-slate-300 leading-relaxed">
                {droneIndex === 0 && 'Night-vision aerial imagery confirms no exit occurred through the roof fire escape during the blackout.'}
                {droneIndex === 1 && 'Thermal signature confirms a figure carrying a dark backpack exited the rear science corridor at 04:16 PM.'}
                {droneIndex === 2 && 'Perimeter cameras locked onto a parked bicycle near the east fence line.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 26. CELL TOWER TRIANGULATION */}
      {stage === 'CELL_TOWER_TRIANGULATION' && (
        <div className="bg-slate-900 border border-emerald-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-emerald-950/80 border border-emerald-600/50 rounded-xl text-emerald-400">
                <Signal className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">CELLULAR INFRASTRUCTURE &bull; TOWER SECTOR #{cellTowerIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Cell Tower Triangulation Grid</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setCellTowerIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Ping Nearby Towers</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-900 rounded-lg border border-emerald-900/40">
                <span className="text-slate-400 block text-[10px]">Primary Tower</span>
                <span className="text-emerald-400 font-bold text-sm">Tower #8A (3.2 km)</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-emerald-900/40">
                <span className="text-slate-400 block text-[10px]">Signal Latency / RTT</span>
                <span className="text-amber-400 font-bold text-sm">{14 + cellTowerIndex * 6} ms Ping</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-emerald-900/40">
                <span className="text-slate-400 block text-[10px]">Target Location Sector</span>
                <span className="text-emerald-400 font-bold text-sm">Science Wing Quad</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">Cellular Log Analysis:</span>
              <p className="text-slate-300 leading-relaxed">
                {cellTowerIndex === 0 && 'Device ping logs indicate three active cellular connections registered to Tower #8A between 04:10 PM and 04:20 PM.'}
                {cellTowerIndex === 1 && 'IMSI Catcher log shows an encrypted SMS sent from inside Science Lab 2 at exactly 04:13 PM.'}
                {cellTowerIndex === 2 && 'Signal handoff data indicates rapid movement towards the main parking gate immediately following the alert.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 27. K9 SEARCH LOGS */}
      {stage === 'K9_SEARCH_LOGS' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-950/80 border border-amber-600/50 rounded-xl text-amber-400">
                <PawPrint className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">CANINE UNIT &bull; UNIT #{k9SearchIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">K-9 Cadaver & Scent Sweep</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setK9SearchIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Redeploy Handler & Dog</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Canine Handler Report:</span>
              <p className="text-slate-300 leading-relaxed">
                {k9SearchIndex === 0 && 'K-9 "Rex" alerted strongly at the base of the chemistry supply cabinet in Science Lab 2, sniffing chemical residue.'}
                {k9SearchIndex === 1 && 'Scent trail followed from the lab door down the east staircase toward the locker room.'}
                {k9SearchIndex === 2 && 'Secondary canine unit verified scent elimination near the emergency exit, indicating a waiting vehicle.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 28. THERMAL IMAGING */}
      {stage === 'THERMAL_IMAGING' && (
        <div className="bg-slate-900 border border-rose-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-rose-950/80 border border-rose-600/50 rounded-xl text-rose-400">
                <Compass className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-rose-400 uppercase">INFRARED SENSORS &bull; SWEEP #{thermalIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Infrared Thermal Energy Sweep</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setThermalIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Calibrate Thermal Palette</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold block">Thermal Heat Signature Data:</span>
              <p className="text-slate-300 leading-relaxed">
                {thermalIndex === 0 && 'Residual thermal heat blooming on the teacher chair indicates someone sat there less than 15 minutes ago.'}
                {thermalIndex === 1 && 'Warm palm prints detected on the glass beaker stand, indicating recent handling without gloves.'}
                {thermalIndex === 2 && 'Thermal dissipation curve confirms the Bunsen burner was turned off right before 04:15 PM.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 29. CYBER FORENSICS */}
      {stage === 'CYBER_FORENSICS' && (
        <div className="bg-slate-900 border border-indigo-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-indigo-950/80 border border-indigo-600/50 rounded-xl text-indigo-400">
                <Cpu className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">CYBER UNIT &bull; DUMP #{cyberIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Cyber Forensics & Hex Dump Analysis</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setCyberIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Extract Unallocated Clusters</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="p-3 bg-slate-900 rounded-lg border border-indigo-900/40 text-indigo-300 font-mono text-[11px] overflow-x-auto">
              0x00001000: 43 68 69 74 72 61 6c 65 6b 68 61 20 44 69 61 72 | Chitralekha Diar<br/>
              0x00001010: 79 20 53 65 63 72 65 74 73 20 45 78 70 6f 73 65 | y Secrets Expose<br/>
              0x00001020: 64 20 61 74 20 30 34 3a 31 35 20 50 4d 2e 00 00 | d at 04:15 PM..
            </div>
            <p className="text-slate-300 leading-relaxed">
              {cyberIndex === 0 && 'Carved deleted partition recovers encrypted PDF titled "Class_9A_Ballots_Final.pdf" modified at 04:02 PM.'}
              {cyberIndex === 1 && 'System log reveals USB thumb drive insertion at 03:58 PM on the main lab terminal.'}
              {cyberIndex === 2 && 'Browser history dump reveals searches for chemical solubility and toxicology equations.'}
            </p>
          </div>
        </div>
      )}

      {/* 30. WEAPON TRACEABILITY */}
      {stage === 'WEAPON_TRACEABILITY' && (
        <div className="bg-slate-900 border border-rose-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-rose-950/80 border border-rose-600/50 rounded-xl text-rose-400">
                <Crosshair className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-rose-400 uppercase">ATF / WEAPONS REGISTRY &bull; QUERY #{weaponIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Firearm & Item Traceability Registry</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setWeaponIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Cross-Reference Serial Number</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold block">Registry Match:</span>
              <p className="text-slate-300 leading-relaxed">
                {weaponIndex === 0 && 'Chemical spray dispenser serial #7701-X registered to Cambridge School Science Department.'}
                {weaponIndex === 1 && 'Brass key found in coat pocket stamped with master key code #9A-LAB.'}
                {weaponIndex === 2 && 'Glass vial batch lot matches supply shipment delivered on Monday morning.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 31. INTERPOL RED NOTICE */}
      {stage === 'INTERPOL_RED_NOTICE' && (
        <div className="bg-slate-900 border border-rose-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-rose-950/80 border border-rose-600/50 rounded-xl text-rose-400">
                <Globe className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-rose-400 uppercase">INTERNATIONAL DATABASE &bull; ALERT #{interpolIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Interpol Red Notice Database</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setInterpolIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Query Passport Border Database</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold block">Border Control Flag:</span>
              <p className="text-slate-300 leading-relaxed">
                {interpolIndex === 0 && 'No active international warrants flagged for Class 9A students; local jurisdiction confirmed.'}
                {interpolIndex === 1 && 'Passport watch request issued for Indira Gandhi International Airport departing flights.'}
                {interpolIndex === 2 && 'Customs clearance records show chemical reagent imported from certified distributor.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 32. UNDERCOVER STING */}
      {stage === 'UNDERCOVER_STING' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-950/80 border border-amber-600/50 rounded-xl text-amber-400">
                <EyeOff className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">COVERT OPERATION &bull; FEED #{undercoverIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Undercover Sting Audio Feed</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setUndercoverIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Switch Covert Wire Channel</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Wire Transcript:</span>
              <p className="text-slate-300 leading-relaxed italic">
                {undercoverIndex === 0 && '"Make sure those ballot sheets stay inside the podium drawer until the principal arrives..."'}
                {undercoverIndex === 1 && '"If Chitralekha checks her drama diary tonight, she will find out the answer keys were swapped..."'}
                {undercoverIndex === 2 && '"Meet me by the sports shed after 4:30 PM. Don\'t talk to the detective."'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 33. ARSON INVESTIGATION */}
      {stage === 'ARSON_INVESTIGATION' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-950/80 border border-amber-600/50 rounded-xl text-amber-400">
                <Flame className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">FIRE MARSHAL &bull; PATTERN #{arsonIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Arson Accelerant Pattern Analysis</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setArsonIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Run Gas Chromatography</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Burn Pattern Findings:</span>
              <p className="text-slate-300 leading-relaxed">
                {arsonIndex === 0 && 'Charring on the lab desk corner indicates localized ethanol flame extinguished quickly without spreading.'}
                {arsonIndex === 1 && 'V-pattern smoke trail points directly to the waste bin behind the teacher podium.'}
                {arsonIndex === 2 && 'Thermal paper fragments recovered from the ash bucket match the Class 9A exam keys.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 34. BLOOD SPATTER ANALYSIS */}
      {stage === 'BLOOD_SPATTER_ANALYSIS' && (
        <div className="bg-slate-900 border border-rose-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-rose-950/80 border border-rose-600/50 rounded-xl text-rose-400">
                <Droplets className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-rose-400 uppercase">BLOODSTAIN PATTERN &bull; ZONE #{spatterIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Blood Spatter Trajectory Profile</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setSpatterIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Recalculate Stringing Angle</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold block">Trajectory Measurement:</span>
              <p className="text-slate-300 leading-relaxed">
                {spatterIndex === 0 && 'Low-velocity passive drops near the sink indicate victim stood still for 20 seconds before collapsing.'}
                {spatterIndex === 1 && 'Impact angle calculated at 38° relative to the floor, consistent with a fall against the lab stool.'}
                {spatterIndex === 2 && 'Wipe pattern on the counter surface suggests someone attempted to clean a spill before help arrived.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 35. PASSENGER MANIFEST */}
      {stage === 'PASSENGER_MANIFEST' && (
        <div className="bg-slate-900 border border-indigo-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-indigo-950/80 border border-indigo-600/50 rounded-xl text-indigo-400">
                <Plane className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">TRANSIT & LOGISTICS &bull; MANIFEST #{passengerIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Transit & Passenger Manifest Logs</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setPassengerIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Check Metro & Bus Swipe Records</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold block">Boarding Timestamp Data:</span>
              <p className="text-slate-300 leading-relaxed">
                {passengerIndex === 0 && 'School bus passenger log confirms all 15 Class 9A students arrived on campus by 08:15 AM.'}
                {passengerIndex === 1 && 'Metro smartcard #9A-88 logged at Noida Sector 18 station at 03:45 PM.'}
                {passengerIndex === 2 && 'After-school sports shuttle log shows two students signed out early at 04:00 PM.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 36. EVIDENCE LOCKER */}
      {stage === 'EVIDENCE_LOCKER' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-950/80 border border-amber-600/50 rounded-xl text-amber-400">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">CHAIN OF CUSTODY &bull; VAULT #{lockerIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Evidence Vault Chain of Custody</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setLockerIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Verify Tamper-Evident Seals</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Vault Custody Register:</span>
              <p className="text-slate-300 leading-relaxed">
                {lockerIndex === 0 && 'Evidence Bag #01 (Chemistry Beaker): Tamper seal unbroken; signed into vault at 04:45 PM by Lead Officer.'}
                {lockerIndex === 1 && 'Evidence Bag #02 (Class 9A Ballot Sheets): Barcode scanned into police archive.'}
                {lockerIndex === 2 && 'Evidence Bag #03 (Chitralekha Drama Diary): Sealed under court evidence locker #4.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 37. INFORMANT REGISTRY */}
      {stage === 'INFORMANT_REGISTRY' && (
        <div className="bg-slate-900 border border-purple-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-950/80 border border-purple-600/50 rounded-xl text-purple-400">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">SECRET NETWORK &bull; INFORMANT #{informantIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Confidential Informant Network</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setInformantIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Contact Secret Informant</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-purple-400 font-bold block">Informant Debriefing:</span>
              <p className="text-slate-300 leading-relaxed italic">
                {informantIndex === 0 && '"Informant Code \'Deep Throat\' reports seeing Vihaan hiding something under the chemistry counter right before 4:00 PM."'}
                {informantIndex === 1 && '"Informant Code \'Shadow\' saw Aryaman arguing with Devrik outside Science Lab 2 at 04:08 PM."'}
                {informantIndex === 2 && '"Informant Code \'Library\' claims the council voting box keys were copied during third period."'}</p>
            </div>
          </div>
        </div>
      )}

      {/* 38. CORONER INQUEST */}
      {stage === 'CORONER_INQUEST' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-950/80 border border-amber-600/50 rounded-xl text-amber-400">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">JUDICIAL CORONER &bull; RECORD #{inquestIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Coroner Inquest Certificate</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setInquestIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Verify Medical Examiner Seal</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Official Inquest Ruling:</span>
              <p className="text-slate-300 leading-relaxed">
                {inquestIndex === 0 && 'Preliminary Coroner Findings: Acute respiratory distress caused by sudden chemical vapor inhalation at 04:15 PM.'}
                {inquestIndex === 1 && 'Toxicology panel confirms absence of organic cardiac pathogens; foul play officially classified as homicide.'}
                {inquestIndex === 2 && 'Final judicial inquest warrant signed by District Magistrate.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 39. SECURITY LOGS */}
      {stage === 'SECURITY_LOGS' && (
        <div className="bg-slate-900 border border-indigo-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-indigo-950/80 border border-indigo-600/50 rounded-xl text-indigo-400">
                <Fingerprint className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">ACCESS CONTROL &bull; LOG #{securityIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Biometric RFID Access Logs</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setSecurityIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Filter RFID Swipe Timestamps</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold block">Biometric Door Audit:</span>
              <p className="text-slate-300 leading-relaxed">
                {securityIndex === 0 && '04:05 PM - RFID Keycard #9A-04 (Devrik Basu) unlocked Science Lab 2 door.'}
                {securityIndex === 1 && '04:11 PM - Master Security Keycard swiped at rear emergency door.'}
                {securityIndex === 2 && '04:17 PM - Automatic magnetic lock triggered lockdown following alarm activation.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 40. FIBER MICROSCOPY */}
      {stage === 'FIBER_MICROSCOPY' && (
        <div className="bg-slate-900 border border-purple-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-950/80 border border-purple-600/50 rounded-xl text-purple-400">
                <Layers className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">MICROSCOPY LAB &bull; SAMPLE #{fiberIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Microscopic Fiber & Fabric Analysis</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setFiberIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Increase Objective Lens (1000x)</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-purple-400 font-bold block">Fiber Spectrum Matching:</span>
              <p className="text-slate-300 leading-relaxed">
                {fiberIndex === 0 && 'Blue polyester fiber recovered from the lab window latch matches the official Cambridge School blazer.'}
                {fiberIndex === 1 && 'Cotton wool thread snippet found under the victim\'s fingernail contains trace yellow drama stage paint.'}
                {fiberIndex === 2 && 'Synthetic nylon fiber matches the straps of the football team equipment duffel bag.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 41. SATELLITE IMAGERY */}
      {stage === 'SATELLITE_IMAGERY' && (
        <div className="bg-slate-900 border border-emerald-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-emerald-950/80 border border-emerald-600/50 rounded-xl text-emerald-400">
                <Satellite className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">ORBITAL RECON &bull; FRAME #{satelliteIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Orbital Satellite Reconnaissance</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setSatelliteIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Enhance Satellite Resolution</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">Geospatial Findings:</span>
              <p className="text-slate-300 leading-relaxed">
                {satelliteIndex === 0 && 'High-resolution satellite frame captured at 04:12 PM shows campus gates clear with two vehicles parked near the science wing.'}
                {satelliteIndex === 1 && 'Multi-spectral infrared overlay confirms heat bloom coming from the Science Lab 2 exhaust ventilation flue.'}
                {satelliteIndex === 2 && 'Perimeter footprint trail mapped leading toward Sector 18 station.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 42. SHADOW BANKING */}
      {stage === 'SHADOW_BANKING' && (
        <div className="bg-slate-900 border border-emerald-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-emerald-950/80 border border-emerald-600/50 rounded-xl text-emerald-400">
                <Landmark className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">OFFSHORE AUDIT &bull; WIRE #{shadowIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Offshore Shell Accounts & Wire Transfers</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setShadowIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Trace Crypto Wallet Hash</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">Financial Wire Trail:</span>
              <p className="text-slate-300 leading-relaxed">
                {shadowIndex === 0 && 'Digital payment transaction of ₹15,000 sent to online tutoring exam leak handle at 02:30 PM.'}
                {shadowIndex === 1 && 'Bank ledger shows recurring transfers for drama prop funding sent to Chitralekha\'s cultural account.'}
                {shadowIndex === 2 && 'Unregistered UPI transfer flagged between two Class 9A council members.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 43. CRIME SCENE SKETCH */}
      {stage === 'CRIME_SCENE_SKETCH' && (
        <div className="bg-slate-900 border border-indigo-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-indigo-950/80 border border-indigo-600/50 rounded-xl text-indigo-400">
                <Ruler className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">ARCHITECTURAL GRID &bull; LAYER #{sketchIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Crime Scene Blueprint & Dimensions</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setSketchIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Toggle Grid Measurements</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold block">Blueprint Coordinate Grid:</span>
              <p className="text-slate-300 leading-relaxed">
                {sketchIndex === 0 && 'Science Lab 2 Dimensions: 12.4m x 8.6m. Distance from victim stool to teacher podium: 3.1 meters.'}
                {sketchIndex === 1 && 'Sightline analysis confirms anyone standing at the Sink cannot see behind the chemistry cabinet.'}
                {sketchIndex === 2 && 'Emergency window latch sits at height 1.4m, accessible without a ladder.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 44. COURT SUBPOENA */}
      {stage === 'COURT_SUBPOENA' && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-950/80 border border-amber-600/50 rounded-xl text-amber-400">
                <Scale className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">JUDICIAL SYSTEM &bull; SUBPOENA #{subpoenaIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Judicial Court Subpoena Register</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setSubpoenaIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Issue Subpoena to Witness</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Legal Court Mandate:</span>
              <p className="text-slate-300 leading-relaxed">
                {subpoenaIndex === 0 && 'Subpoena #881: Ordered principal to surrender Class 9A election ballot box and attendance sheets.'}
                {subpoenaIndex === 1 && 'Subpoena #882: Ordered telecom provider to release cell tower call detail records (CDR).'}
                {subpoenaIndex === 2 && 'Subpoena #883: Authorized judicial search of school locker #14.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 45. PRESS CONFERENCE */}
      {stage === 'PRESS_CONFERENCE' && (
        <div className="bg-slate-900 border border-indigo-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-indigo-950/80 border border-indigo-600/50 rounded-xl text-indigo-400">
                <Megaphone className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">MEDIA ROOM &bull; STATEMENT #{pressIndex + 1}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">Police Press Conference Briefing</h2>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setPressIndex(prev => (prev + 1) % 3);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700 text-xs font-mono font-bold transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Deliver Media Press Update</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold block">Official Press Statement:</span>
              <p className="text-slate-300 leading-relaxed italic">
                {pressIndex === 0 && '"Police have secured Science Lab 2 at Cambridge School. Forensic teams are currently analyzing chemical evidence and digital phone logs."' }
                {pressIndex === 1 && '"All fifteen students present during the 4:15 PM after-school prep session are cooperating fully with lead investigators."' }
                {pressIndex === 2 && '"An official arrest announcement will be made once formal forensic verification is complete."' }
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
