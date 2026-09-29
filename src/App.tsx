import React, { useState, useEffect } from 'react';
import { 
  GameStage, 
  CustomNames, 
  MysteryCase, 
  SuspectId, 
  Suspect, 
  Evidence, 
  CrimeLocation 
} from './types';
import { PRESET_CASES } from './data/presetCases';
import { PRESET_NAME_PACKAGES, replaceNames } from './utils/nameFormatter';
import { randomizeCase } from './utils/caseRandomizer';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { NameManagerModal } from './components/NameManagerModal';
import { CrimeSceneView } from './components/CrimeSceneView';
import { InterrogationView } from './components/InterrogationView';
import { EvidenceView } from './components/EvidenceView';
import { NotebookView } from './components/NotebookView';
import { PhoneSocialMediaView } from './components/PhoneSocialMediaView';
import { CaseBoard } from './components/CaseBoard';
import { TimelineView } from './components/TimelineView';
import { ContradictionsView } from './components/ContradictionsView';
import { SuspectDossiersView } from './components/SuspectDossiersView';
import { ForensicLabView } from './components/ForensicLabView';
import { MotiveMatrixView } from './components/MotiveMatrixView';
import { SurveillanceView } from './components/SurveillanceView';
import { CaseAnalyticsView } from './components/CaseAnalyticsView';
import { AccusationModal } from './components/AccusationModal';
import { CaseSelectModal } from './components/CaseSelectModal';
import { BackgroundDecorations } from './components/BackgroundDecorations';
import { sounds } from './utils/sound';

import { CharacterCreatorView } from './components/CharacterCreatorView';
import { DeveloperCastView } from './components/DeveloperCastView';
import { ExtraTabsViews } from './components/ExtraTabsViews';
import { CrimeSceneMapModal } from './components/CrimeSceneMapModal';
import { DetectiveProfile } from './types';
import { isPlayerInSameRoomAsPrimarySuspect } from './utils/suspectLocationUtils';
import { Map } from 'lucide-react';

export default function App() {
  const [stage, setStage] = useState<GameStage>('INVESTIGATING');
  const [customNames, setCustomNames] = useState<CustomNames>(PRESET_NAME_PACKAGES[0].names);
  
  // Initialize with a randomized starting case
  const initialRandomizedCase = randomizeCase(PRESET_CASES[0], PRESET_NAME_PACKAGES[0].names);
  const [currentCase, setCurrentCase] = useState<MysteryCase>(initialRandomizedCase);

  // Detective Profile State
  const [detectiveProfile, setDetectiveProfile] = useState<DetectiveProfile>({
    name: PRESET_NAME_PACKAGES[0].names.detective,
    detective2: PRESET_NAME_PACKAGES[0].names.detective2 || 'Nabhya Tyagi',
    appearance: 'Classic charcoal trenchcoat, fedora, and brass pocket watch.',
    backstory: 'Ex-Special Homicide Inspector known for unblemished record and relentless deduction.',
    specialization: 'Forensic Analyst',
    badgeNumber: 'DET-8804',
  });
  
  // Game State
  const [locations, setLocations] = useState<CrimeLocation[]>(initialRandomizedCase.locations);
  const [evidenceList, setEvidenceList] = useState<Evidence[]>(initialRandomizedCase.evidenceList);
  const [suspects, setSuspects] = useState<Record<SuspectId, Suspect>>(initialRandomizedCase.suspects);
  const [notes, setNotes] = useState<string>('');
  const [selectedLocationId, setSelectedLocationId] = useState<string>(initialRandomizedCase.locations[0]?.id || 'loc_dining');
  const [latestDiscoveredEvidence, setLatestDiscoveredEvidence] = useState<{
    title: string;
    id: string;
    timestamp: number;
  } | null>(null);
  
  // UI Controls
  const [isNameManagerOpen, setIsNameManagerOpen] = useState(false);
  const [isCaseSelectOpen, setIsCaseSelectOpen] = useState(false);
  const [isCrimeSceneMapOpen, setIsCrimeSceneMapOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>('🕵️ Mystery initialized with randomized murderer & evidence!');

  // Developer Access Code State (Code: 888513)
  const [isDeveloperUnlocked, setIsDeveloperUnlocked] = useState(false);

  const handleUnlockDeveloperCode = (code: string) => {
    if (code.trim() === '888513') {
      setIsDeveloperUnlocked(true);
      setToastMessage('⚡ DEVELOPER CODE 888513 ACTIVATED! Cast Tabs & Secrets Unlocked.');
      sounds.playClueFound();
      return true;
    }
    return false;
  };

  const handleChangeKiller = (newKillerId: SuspectId, newKillerId2?: SuspectId) => {
    const k2 = newKillerId2 || (newKillerId === 'suspect3' ? 'suspect9' : 'suspect2');
    setCurrentCase((prev) => ({
      ...prev,
      killerId: newKillerId,
      killerId2: k2,
    }));
    setSuspects((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => {
        const sKey = k as SuspectId;
        if (updated[sKey]) {
          const isK1 = sKey === newKillerId;
          const isK2 = sKey === k2 && k2 !== newKillerId;
          updated[sKey] = {
            ...updated[sKey],
            isKiller: isK1 || isK2,
            killerRole: isK1 ? 'Primary Mastermind' : isK2 ? 'Co-Conspirator Accomplice' : undefined,
          };
        }
      });
      return updated;
    });
    setToastMessage(`⚡ DEVELOPER OVERRIDE: Duo culprits updated to ${customNames[newKillerId as keyof CustomNames] || newKillerId} & ${customNames[k2 as keyof CustomNames] || k2}!`);
  };

  // Sidebar Controls
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Load / Reset Case with Random Murderer
  const handleSelectCase = (selectedCase: MysteryCase) => {
    const activeNames = selectedCase.defaultNames || customNames;
    if (selectedCase.defaultNames) {
      setCustomNames(selectedCase.defaultNames);
    }
    const randomized = randomizeCase(selectedCase, activeNames);
    setCurrentCase(randomized);
    setLocations(randomized.locations.map(l => ({
      ...l,
      clues: l.clues.map(c => ({ ...c, inspected: false }))
    })));
    setEvidenceList(randomized.evidenceList.map(e => ({ ...e, discovered: false })));
    setSuspects(randomized.suspects);
    setNotes('');
    setLatestDiscoveredEvidence(null);
    if (randomized.locations[0]) {
      setSelectedLocationId(randomized.locations[0].id);
    }
    setStage('INVESTIGATING');
    setToastMessage('🎲 New Case Loaded! The killer & evidence trail have been randomized.');
  };

  // Re-randomize murderer & evidence for current case
  const handleShuffleCase = () => {
    sounds.playClick();
    const randomized = randomizeCase(currentCase, customNames);
    setCurrentCase(randomized);
    setLocations(randomized.locations.map(l => ({
      ...l,
      clues: l.clues.map(c => ({ ...c, inspected: false }))
    })));
    setEvidenceList(randomized.evidenceList.map(e => ({ ...e, discovered: false })));
    setSuspects(randomized.suspects);
    setNotes('');
    setLatestDiscoveredEvidence(null);
    if (randomized.locations[0]) {
      setSelectedLocationId(randomized.locations[0].id);
    }
    setStage('INVESTIGATING');
    setToastMessage('🔀 Case Murderer Reshuffled! Suspect roles and evidence have been re-assigned.');
  };

  // Inspect Clue in Crime Scene
  const handleInspectClue = (locationId: string, clueId: string, evidenceId?: string) => {
    setLocations((prevLocs) =>
      prevLocs.map((loc) => {
        if (loc.id !== locationId) return loc;
        return {
          ...loc,
          clues: loc.clues.map((c) => (c.id === clueId ? { ...c, inspected: true } : c)),
        };
      })
    );

    if (evidenceId) {
      const targetEv = evidenceList.find((e) => e.id === evidenceId);
      if (targetEv && !targetEv.discovered) {
        setLatestDiscoveredEvidence({
          title: replaceNames(targetEv.title, customNames),
          id: evidenceId,
          timestamp: Date.now(),
        });
      }
      setEvidenceList((prevEv) =>
        prevEv.map((ev) => (ev.id === evidenceId ? { ...ev, discovered: true } : ev))
      );
    }
  };

  // Interrogate Suspect
  const handleSendMessage = async (suspectId: SuspectId, questionText: string, evidenceIds?: string[]) => {
    const suspect = suspects[suspectId];
    if (!suspect) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append player message
    setSuspects((prev) => ({
      ...prev,
      [suspectId]: {
        ...prev[suspectId],
        interrogationHistory: [
          ...prev[suspectId].interrogationHistory,
          { sender: 'player', text: questionText, timestamp },
        ],
      },
    }));

    try {
      const evidenceTitles = evidenceIds
        ? evidenceList
            .filter((e) => evidenceIds.includes(e.id))
            .map((e) => replaceNames(e.title, customNames))
        : [];

      // Look up custom name for suspect dynamically
      const customSuspectName = customNames[suspectId as keyof CustomNames] || suspect.defaultName;

      const res = await fetch('/api/mystery/interrogate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          suspectName: customSuspectName,
          suspectRole: suspect.role,
          suspectPersonality: suspect.personality,
          suspectMotive: replaceNames(suspect.motive, customNames),
          suspectAlibi: replaceNames(suspect.alibi, customNames),
          suspectSecret: replaceNames(suspect.secret, customNames),
          isKiller: suspect.isKiller,
          userQuestion: questionText,
          customNames,
          evidencePresented: evidenceTitles,
          caseContext: {
            title: replaceNames(currentCase.title, customNames),
            victim: customNames.victim,
            location: customNames.location,
            timeOfDeath: currentCase.timeOfDeath,
            causeOfDeath: currentCase.causeOfDeath,
          },
        }),
      });

      const data = await res.json();
      const replyText = data.reply || "I have nothing to say to you, Detective.";
      const suspicionDelta = data.suspicionChange || 5;

      // Append suspect response
      setSuspects((prev) => ({
        ...prev,
        [suspectId]: {
          ...prev[suspectId],
          suspicionLevel: Math.min(100, Math.max(0, prev[suspectId].suspicionLevel + suspicionDelta)),
          interrogationHistory: [
            ...prev[suspectId].interrogationHistory,
            { sender: 'suspect', text: replyText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
          ],
        },
      }));
    } catch (err) {
      console.error('Interrogation API error:', err);
      // Fallback response
      setSuspects((prev) => ({
        ...prev,
        [suspectId]: {
          ...prev[suspectId],
          interrogationHistory: [
            ...prev[suspectId].interrogationHistory,
            {
              sender: 'suspect',
              text: `I've told you everything I know regarding ${customNames.victim}'s death, Detective ${customNames.detective}! Check my alibi!`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ],
        },
      }));
    }
  };

  // Generate Custom AI Case
  const handleGenerateAICase = async (theme: string) => {
    try {
      const res = await fetch('/api/mystery/generate-case', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customNames, theme }),
      });
      const data = await res.json();
      if (data.caseData) {
        const generated = data.caseData;
        const newCase: MysteryCase = {
          ...PRESET_CASES[0],
          id: `ai_case_${Date.now()}`,
          title: generated.title || `The ${theme} Murder Case`,
          settingDescription: generated.settingDescription || `A mysterious location shrouded in danger.`,
          timeOfDeath: generated.timeOfDeath || 'Midnight',
          causeOfDeath: generated.causeOfDeath || 'Foul Play',
          synopsis: generated.synopsis || `A crime occurred involving ${customNames.victim}.`,
          killerId: generated.killerId || 'suspect3',
          solutionExplanation: generated.solutionExplanation || `The killer was brought to justice.`,
        };
        handleSelectCase(newCase);
      }
    } catch (err) {
      console.error('AI Case Generation error:', err);
    }
  };

  const discoveredCount = evidenceList.filter((e) => e.discovered).length;

  const isSameRoomAsPrimarySuspect = isPlayerInSameRoomAsPrimarySuspect(selectedLocationId, currentCase, locations);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex overflow-x-hidden">
      
      {/* Creative Atmospheric Background */}
      <BackgroundDecorations />
      
      {/* Sidebar Navigation */}
      <Sidebar
        currentStage={stage}
        setStage={setStage}
        evidenceCount={discoveredCount}
        totalEvidence={evidenceList.length}
        isOpen={isSidebarOpen}
        onToggleOpen={() => setIsSidebarOpen(!isSidebarOpen)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onShuffleCase={handleShuffleCase}
        onOpenNameManager={() => setIsNameManagerOpen(true)}
        onOpenCaseSelector={() => setIsCaseSelectOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        isDeveloperUnlocked={isDeveloperUnlocked}
        customNames={customNames}
        onOpenCrimeSceneMap={() => setIsCrimeSceneMapOpen(true)}
        isSameRoomAsPrimarySuspect={isSameRoomAsPrimarySuspect}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen relative z-10">

        {/* Top Notification Toast */}
        {toastMessage && (
          <div className="bg-indigo-900 border-b border-indigo-600/60 text-indigo-100 px-4 py-2 text-xs font-mono text-center flex items-center justify-center space-x-2 animate-fadeIn shadow-lg sticky top-0 z-30">
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Header Bar */}
        <Navbar
          currentStage={stage}
          setStage={setStage}
          caseTitle={replaceNames(currentCase.title, customNames)}
          customNames={customNames}
          detectiveProfile={detectiveProfile}
          onOpenNameManager={() => setIsNameManagerOpen(true)}
          onOpenCaseSelector={() => setIsCaseSelectOpen(true)}
          onShuffleCase={handleShuffleCase}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          discoveredCount={discoveredCount}
          totalEvidence={evidenceList.length}
          latestDiscoveredEvidence={latestDiscoveredEvidence}
          onOpenCrimeSceneMap={() => setIsCrimeSceneMapOpen(true)}
          isSameRoomAsPrimarySuspect={isSameRoomAsPrimarySuspect}
        />

        {/* Main View Area */}
        <main className="flex-1 pb-12 overflow-x-hidden">
        {stage === 'CHARACTER_CREATOR' && (
          <CharacterCreatorView
            detectiveProfile={detectiveProfile}
            onUpdateDetective={setDetectiveProfile}
            customNames={customNames}
            onUpdateCustomNames={setCustomNames}
            suspects={suspects}
            onStartInvestigation={() => setStage('INVESTIGATING')}
          />
        )}

        {stage === 'INVESTIGATING' && (
          <CrimeSceneView
            locations={locations}
            evidenceList={evidenceList}
            customNames={customNames}
            onInspectClue={handleInspectClue}
            selectedLocationId={selectedLocationId}
            onSelectLocation={setSelectedLocationId}
            onOpenMapModal={() => setIsCrimeSceneMapOpen(true)}
            currentCase={currentCase}
          />
        )}

        {(stage === 'INTERROGATING' || stage === 'POLYGRAPH_TEST') && (
          <InterrogationView
            suspects={suspects}
            customNames={customNames}
            evidenceList={evidenceList}
            currentCase={currentCase}
            onSendMessage={handleSendMessage}
            initialSubTab={stage === 'POLYGRAPH_TEST' ? 'polygraph' : 'chat'}
          />
        )}

        {stage === 'EVIDENCE' && (
          <EvidenceView
            evidenceList={evidenceList}
            customNames={customNames}
          />
        )}

        {stage === 'NOTEBOOK' && (
          <NotebookView
            suspects={suspects}
            customNames={customNames}
            currentCase={currentCase}
            notes={notes}
            onUpdateNotes={setNotes}
          />
        )}

        {stage === 'PHONE_LEAKS' && (
          <PhoneSocialMediaView
            customNames={customNames}
            suspects={suspects}
            currentCase={currentCase}
          />
        )}

        {stage === 'CASE_BOARD' && (
          <CaseBoard
            suspects={suspects}
            evidenceList={evidenceList}
            currentCase={currentCase}
            customNames={customNames}
          />
        )}

        {stage === 'TIMELINE' && (
          <TimelineView
            currentCase={currentCase}
            customNames={customNames}
            suspects={suspects}
            evidenceList={evidenceList}
          />
        )}

        {stage === 'CONTRADICTIONS' && (
          <ContradictionsView
            currentCase={currentCase}
            customNames={customNames}
            suspects={suspects}
            evidenceList={evidenceList}
            onExposeContradiction={(sId) => {
              setSuspects(prev => ({
                ...prev,
                [sId]: {
                  ...prev[sId],
                  suspicionLevel: Math.min(100, prev[sId].suspicionLevel + 25),
                }
              }));
              setToastMessage(`🚨 CONTRADICTION EXPOSED! Suspicion level increased for ${customNames[sId as keyof CustomNames] || suspects[sId]?.defaultName}!`);
              setTimeout(() => setToastMessage(null), 5000);
            }}
          />
        )}

        {stage === 'SUSPECT_DOSSIERS' && (
          <SuspectDossiersView
            currentCase={currentCase}
            customNames={customNames}
            suspects={suspects}
          />
        )}

        {stage === 'FORENSIC_LAB' && (
          <ForensicLabView
            currentCase={currentCase}
            customNames={customNames}
            evidenceList={evidenceList}
          />
        )}

        {stage === 'MOTIVE_MATRIX' && (
          <MotiveMatrixView
            currentCase={currentCase}
            customNames={customNames}
            suspects={suspects}
          />
        )}

        {stage === 'SURVEILLANCE' && (
          <SurveillanceView
            currentCase={currentCase}
            customNames={customNames}
            suspects={suspects}
          />
        )}

        {stage === 'CASE_ANALYTICS' && (
          <CaseAnalyticsView
            currentCase={currentCase}
            customNames={customNames}
            suspects={suspects}
            evidenceList={evidenceList}
            onShuffleCase={handleShuffleCase}
          />
        )}

        {stage === 'DEVELOPER_CAST' && (
          <DeveloperCastView
            currentCase={currentCase}
            customNames={customNames}
            onUpdateCustomNames={setCustomNames}
            onUpdateSuspects={setSuspects}
            onChangeKiller={handleChangeKiller}
            isDeveloperUnlocked={isDeveloperUnlocked}
            onUnlockDeveloperCode={handleUnlockDeveloperCode}
          />
        )}

        {!['CHARACTER_CREATOR', 'INVESTIGATING', 'INTERROGATING', 'EVIDENCE', 'NOTEBOOK', 'PHONE_LEAKS', 'CASE_BOARD', 'TIMELINE', 'CONTRADICTIONS', 'SUSPECT_DOSSIERS', 'FORENSIC_LAB', 'MOTIVE_MATRIX', 'SURVEILLANCE', 'CASE_ANALYTICS', 'DEVELOPER_CAST', 'ACCUSATION'].includes(stage) && (
          <ExtraTabsViews
            stage={stage}
            currentCase={currentCase}
            customNames={customNames}
            suspects={suspects}
            evidenceList={evidenceList}
          />
        )}

        {stage === 'ACCUSATION' && (
          <AccusationModal
            currentCase={currentCase}
            customNames={customNames}
            evidenceList={evidenceList}
            onClose={() => setStage('INVESTIGATING')}
            onResetCase={() => handleSelectCase(PRESET_CASES[0])}
            onShuffleKiller={handleShuffleCase}
          />
        )}
      </main>

      {/* Modals */}
      <NameManagerModal
        isOpen={isNameManagerOpen}
        onClose={() => setIsNameManagerOpen(false)}
        customNames={customNames}
        onSaveNames={(newNames) => {
          setCustomNames(newNames);
          sounds.playPaperFlip();
        }}
        isDeveloperUnlocked={isDeveloperUnlocked}
        onUnlockDeveloperCode={handleUnlockDeveloperCode}
        killerId={currentCase.killerId || (currentCase as any).killerSuspectId}
      />

      <CaseSelectModal
        isOpen={isCaseSelectOpen}
        onClose={() => setIsCaseSelectOpen(false)}
        customNames={customNames}
        onSelectCase={handleSelectCase}
        onGenerateAICase={handleGenerateAICase}
      />

      <CrimeSceneMapModal
        isOpen={isCrimeSceneMapOpen}
        onClose={() => setIsCrimeSceneMapOpen(false)}
        locations={locations}
        evidenceList={evidenceList}
        customNames={customNames}
        currentLocationId={selectedLocationId}
        onSelectLocation={(locId) => {
          setSelectedLocationId(locId);
          setStage('INVESTIGATING');
        }}
        onInspectClue={(locId, clueId, evidenceId) => {
          setSelectedLocationId(locId);
          handleInspectClue(locId, clueId, evidenceId);
          setStage('INVESTIGATING');
        }}
        currentCase={currentCase}
      />

      {/* Floating Quick Action Map Trigger Button */}
      {stage !== 'CHARACTER_CREATOR' && (
        <button
          onClick={() => {
            sounds.playClick();
            setIsCrimeSceneMapOpen(true);
          }}
          className={`fixed bottom-5 right-5 z-40 px-3.5 py-2.5 rounded-2xl bg-slate-950/95 hover:bg-slate-900 font-bold border-2 shadow-2xl flex items-center space-x-2 transition-all active:scale-95 group cursor-pointer backdrop-blur-md ${
            isSameRoomAsPrimarySuspect
              ? 'text-rose-200 border-rose-500 shadow-rose-950/90 hover:border-rose-400'
              : 'text-amber-300 border-amber-500/80 shadow-amber-950/90 hover:border-amber-400'
          }`}
          title={isSameRoomAsPrimarySuspect ? "⚠️ PRIMARY SUSPECT IS IN THIS ROOM! Click to open Map" : "Quick Navigate Crime Scene Locations Map"}
        >
          <div className="relative flex items-center justify-center shrink-0">
            <Map className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              {isSameRoomAsPrimarySuspect ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
                </>
              ) : (
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              )}
            </span>
          </div>
          <span className="text-xs font-mono font-bold tracking-wider hidden sm:inline">CRIME SCENE MAP</span>
          {isSameRoomAsPrimarySuspect ? (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-950 text-rose-200 border border-rose-600 font-bold shrink-0 animate-pulse">
              SUSPECT HERE!
            </span>
          ) : (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700/60 shrink-0">
              {locations.length} Sectors
            </span>
          )}
        </button>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500 font-mono">
        Noir Murder Mystery Engine &bull; Custom Character Name Integration &bull; Powered by Gemini AI
      </footer>

      </div>

    </div>
  );
}
