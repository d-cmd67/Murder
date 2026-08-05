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
import { NameManagerModal } from './components/NameManagerModal';
import { CrimeSceneView } from './components/CrimeSceneView';
import { InterrogationView } from './components/InterrogationView';
import { EvidenceView } from './components/EvidenceView';
import { NotebookView } from './components/NotebookView';
import { AccusationModal } from './components/AccusationModal';
import { CaseSelectModal } from './components/CaseSelectModal';
import { sounds } from './utils/sound';

import { CharacterCreatorView } from './components/CharacterCreatorView';
import { DetectiveProfile } from './types';

export default function App() {
  const [stage, setStage] = useState<GameStage>('INVESTIGATING');
  const [customNames, setCustomNames] = useState<CustomNames>(PRESET_NAME_PACKAGES[0].names);
  
  // Initialize with a randomized starting case
  const initialRandomizedCase = randomizeCase(PRESET_CASES[0], PRESET_NAME_PACKAGES[0].names);
  const [currentCase, setCurrentCase] = useState<MysteryCase>(initialRandomizedCase);

  // Detective Profile State
  const [detectiveProfile, setDetectiveProfile] = useState<DetectiveProfile>({
    name: PRESET_NAME_PACKAGES[0].names.detective,
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
  
  // UI Controls
  const [isNameManagerOpen, setIsNameManagerOpen] = useState(false);
  const [isCaseSelectOpen, setIsCaseSelectOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>('🕵️ Mystery initialized with randomized murderer & evidence!');

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col">
      
      {/* Top Notification Toast */}
      {toastMessage && (
        <div className="bg-indigo-900 border-b border-indigo-600/60 text-indigo-100 px-4 py-2 text-xs font-mono text-center flex items-center justify-center space-x-2 animate-fadeIn shadow-lg sticky top-16 z-20">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        currentStage={stage}
        setStage={setStage}
        caseTitle={replaceNames(currentCase.title, customNames)}
        customNames={customNames}
        onOpenNameManager={() => setIsNameManagerOpen(true)}
        onOpenCaseSelector={() => setIsCaseSelectOpen(true)}
        onShuffleCase={handleShuffleCase}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        evidenceCount={discoveredCount}
        totalEvidence={evidenceList.length}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-12">
        {stage === 'CHARACTER_CREATOR' && (
          <CharacterCreatorView
            detectiveProfile={detectiveProfile}
            onUpdateDetective={setDetectiveProfile}
            customNames={customNames}
            onUpdateCustomNames={setCustomNames}
            onStartInvestigation={() => setStage('INVESTIGATING')}
          />
        )}

        {stage === 'INVESTIGATING' && (
          <CrimeSceneView
            locations={locations}
            evidenceList={evidenceList}
            customNames={customNames}
            onInspectClue={handleInspectClue}
          />
        )}

        {stage === 'INTERROGATING' && (
          <InterrogationView
            suspects={suspects}
            customNames={customNames}
            evidenceList={evidenceList}
            currentCase={currentCase}
            onSendMessage={handleSendMessage}
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
      />

      <CaseSelectModal
        isOpen={isCaseSelectOpen}
        onClose={() => setIsCaseSelectOpen(false)}
        customNames={customNames}
        onSelectCase={handleSelectCase}
        onGenerateAICase={handleGenerateAICase}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500 font-mono">
        Noir Murder Mystery Engine &bull; Custom Character Name Integration &bull; Powered by Gemini AI
      </footer>

    </div>
  );
}
