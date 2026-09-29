import React, { useState, useRef, useEffect } from 'react';
import { Suspect, SuspectId, Evidence, MysteryCase, CustomNames } from '../types';
import { replaceNames } from '../utils/nameFormatter';
import { 
  GitFork, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  StickyNote, 
  Pin, 
  Scissors, 
  Filter, 
  HelpCircle, 
  Zap, 
  ShieldAlert,
  SlidersHorizontal,
  X,
  Layers,
  Award
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface BoardNode {
  id: string;
  type: 'suspect' | 'evidence' | 'motive' | 'location' | 'sticky_note';
  title: string;
  subtitle?: string;
  description?: string;
  x: number;
  y: number;
  color: string;
  avatarIcon?: string;
  badge?: string;
  metadata?: {
    suspectId?: SuspectId;
    evidenceId?: string;
    isKeyEvidence?: boolean;
    suspicionLevel?: number;
    discovered?: boolean;
  };
}

interface BoardConnection {
  id: string;
  fromId: string;
  toId: string;
  label: string;
  color: string; // hex or tailwind stroke color
  style?: 'solid' | 'dashed';
}

interface CaseBoardProps {
  suspects: Record<SuspectId, Suspect>;
  evidenceList: Evidence[];
  currentCase: MysteryCase;
  customNames: CustomNames;
  onAccuse?: () => void;
}

const DEFAULT_LABEL_OPTIONS = [
  'Direct Suspect',
  'Possesses Evidence',
  'Contradicts Alibi',
  'Motive For Crime',
  'Discovered At Scene',
  'Threatened Victim',
  'Secret Accomplice',
  'Financial Gain',
];

const THREAD_COLORS = [
  { name: 'Red String (Accusation)', color: '#ef4444' },
  { name: 'Gold String (Evidence)', color: '#f59e0b' },
  { name: 'Cyan String (Alibi)', color: '#06b6d4' },
  { name: 'Purple String (Motive)', color: '#a855f7' },
  { name: 'Green String (Witness)', color: '#10b981' },
];

const SUSPECT_THEME_COLORS = [
  'bg-amber-950/90 border-amber-500/80 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.3)]',
  'bg-purple-950/90 border-purple-500/80 text-purple-100 shadow-[0_0_15px_rgba(168,85,247,0.3)]',
  'bg-emerald-950/90 border-emerald-500/80 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.3)]',
  'bg-cyan-950/90 border-cyan-500/80 text-cyan-100 shadow-[0_0_15px_rgba(6,182,212,0.3)]',
  'bg-rose-950/90 border-rose-500/80 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.3)]',
  'bg-orange-950/90 border-orange-500/80 text-orange-100 shadow-[0_0_15px_rgba(249,115,22,0.3)]',
  'bg-indigo-950/90 border-indigo-500/80 text-indigo-100 shadow-[0_0_15px_rgba(99,102,241,0.3)]',
  'bg-teal-950/90 border-teal-500/80 text-teal-100 shadow-[0_0_15px_rgba(20,184,166,0.3)]',
  'bg-pink-950/90 border-pink-500/80 text-pink-100 shadow-[0_0_15px_rgba(236,72,153,0.3)]',
];

const STICKY_NOTE_COLORS = [
  { id: 'yellow', name: 'Canary Yellow', class: 'bg-gradient-to-br from-amber-100 to-yellow-200 border-amber-300 text-amber-950 font-sans shadow-xl' },
  { id: 'rose', name: 'Neon Rose', class: 'bg-gradient-to-br from-rose-100 to-pink-200 border-rose-300 text-rose-950 font-sans shadow-xl' },
  { id: 'cyan', name: 'Cyber Cyan', class: 'bg-gradient-to-br from-cyan-100 to-sky-200 border-cyan-300 text-cyan-950 font-sans shadow-xl' },
  { id: 'emerald', name: 'Mint Emerald', class: 'bg-gradient-to-br from-emerald-100 to-teal-200 border-emerald-300 text-emerald-950 font-sans shadow-xl' },
  { id: 'purple', name: 'Lavender Violet', class: 'bg-gradient-to-br from-purple-100 to-indigo-200 border-purple-300 text-purple-950 font-sans shadow-xl' },
];

export const CaseBoard: React.FC<CaseBoardProps> = ({
  suspects,
  evidenceList,
  currentCase,
  customNames,
  onAccuse,
}) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const suspectKeys = Object.keys(suspects) as SuspectId[];

  // Helper to get custom name
  const getSuspectName = (id: SuspectId) => {
    return customNames[id as keyof CustomNames] || suspects[id]?.defaultName || 'Suspect';
  };

  // Build initial default nodes based on game state
  const buildInitialNodes = (): BoardNode[] => {
    const nodes: BoardNode[] = [];

    // Victim & Central Incident Node
    nodes.push({
      id: 'node_victim',
      type: 'location',
      title: customNames.victim || 'Victim (Devrik Basu)',
      subtitle: `Murdered at ${currentCase.timeOfDeath}`,
      description: replaceNames(currentCase.causeOfDeath, customNames),
      x: 520,
      y: 80,
      color: 'bg-rose-950 border-rose-500 text-rose-200',
      badge: 'CRIME VICTIM',
    });

    // Suspect Nodes (Left Column / Oval layout)
    suspectKeys.forEach((sId, idx) => {
      const s = suspects[sId];
      if (!s) return;
      const sName = getSuspectName(sId);
      const colorTheme = SUSPECT_THEME_COLORS[idx % SUSPECT_THEME_COLORS.length];
      nodes.push({
        id: `node_suspect_${sId}`,
        type: 'suspect',
        title: sName,
        subtitle: s.role,
        description: replaceNames(s.motive, customNames),
        x: 60 + (idx % 2) * 190,
        y: 120 + idx * 115,
        color: colorTheme,
        badge: `SUSPECT #${idx + 1}`,
        metadata: {
          suspectId: sId,
          suspicionLevel: s.suspicionLevel,
        },
      });
    });

    // Evidence Nodes (Right Column)
    const discoveredEv = evidenceList.filter((e) => e.discovered);
    const evToDisplay = discoveredEv.length > 0 ? discoveredEv : evidenceList.slice(0, 5);

    evToDisplay.forEach((ev, idx) => {
      nodes.push({
        id: `node_evidence_${ev.id}`,
        type: 'evidence',
        title: replaceNames(ev.title, customNames),
        subtitle: ev.discovered ? `Found: ${replaceNames(ev.locationFound, customNames)}` : 'Undiscovered / Rumored',
        description: replaceNames(ev.description, customNames),
        x: 820 + (idx % 2) * 180,
        y: 120 + idx * 120,
        color: ev.isKeyEvidence 
          ? 'bg-rose-950/90 border-rose-400 text-rose-100'
          : 'bg-slate-900/90 border-amber-600/60 text-slate-200',
        badge: ev.isKeyEvidence ? '🔑 KEY EVIDENCE' : 'CLUE',
        metadata: {
          evidenceId: ev.id,
          isKeyEvidence: ev.isKeyEvidence,
          discovered: ev.discovered,
        },
      });
    });

    // Motive / Incident Nodes (Center Column)
    const presetMotives = [
      { id: 'motive_ballots', title: 'Ballot Rigging', desc: '40 fake voting ballots swapped behind stage' },
      { id: 'motive_exam', title: 'Exam Answer Key Leak', desc: 'Stolen Class 9A test answers bought for Rank #1' },
      { id: 'motive_code', title: 'Robotics Project Wipe', desc: 'PC 4 submission folder erased during practice' },
      { id: 'motive_key', title: 'Science Lab 2 Key Theft', desc: 'Brass key taken from podium to lock Lab 2' },
    ];

    presetMotives.forEach((m, idx) => {
      nodes.push({
        id: `node_${m.id}`,
        type: 'motive',
        title: m.title,
        subtitle: 'Key Mystery Motive',
        description: m.desc,
        x: 480,
        y: 280 + idx * 140,
        color: 'bg-indigo-950/90 border-indigo-500/80 text-indigo-100',
        badge: 'THEORY MOTIVE',
      });
    });

    return nodes;
  };

  // State
  const [nodes, setNodes] = useState<BoardNode[]>(() => buildInitialNodes());
  const [connections, setConnections] = useState<BoardConnection[]>([
    {
      id: 'conn_1',
      fromId: 'node_suspect_suspect1',
      toId: 'node_motive_ballots',
      label: 'Rigged Votes',
      color: '#ef4444',
    },
    {
      id: 'conn_2',
      fromId: 'node_suspect_suspect3',
      toId: 'node_motive_exam',
      label: 'Rank #1 Threat',
      color: '#f59e0b',
    },
  ]);

  // Dragging node state
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Connecting mode state
  const [connectingFromId, setConnectingFromId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedLabel, setSelectedLabel] = useState<string>('Direct Suspect');
  const [selectedColor, setSelectedColor] = useState<string>('#ef4444');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');

  // Visual Logic Board / Deduction Theory slots
  const [theorySlots, setTheorySlots] = useState<{
    suspectId: SuspectId | null;
    motive: string | null;
    location: string | null;
    evidenceId: string | null;
  }>({
    suspectId: null,
    motive: null,
    location: null,
    evidenceId: null,
  });

  const [dragHoverTarget, setDragHoverTarget] = useState<string | null>(null);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  // Auto-clear toast notification after 4s
  useEffect(() => {
    if (toastNotification) {
      const t = setTimeout(() => setToastNotification(null), 4000);
      return () => clearTimeout(t);
    }
  }, [toastNotification]);

  // Drop evidence on node logic
  const handleDropOnNode = (e: React.DragEvent, targetNode: BoardNode) => {
    e.preventDefault();
    setDragHoverTarget(null);
    try {
      const rawData = e.dataTransfer.getData('text/plain');
      if (!rawData) return;
      const data = JSON.parse(rawData);

      sounds.playClueFound();

      // Check if item dropped is evidence or suspect
      if (data.type === 'evidence') {
        const evId = data.id;
        const evTitle = data.title;
        const pointsToSuspect = data.pointsToSuspectId;

        // Auto create thread connection
        const sourceNodeId = nodes.find(n => n.metadata?.evidenceId === evId)?.id || `node_evidence_${evId}`;
        const exists = connections.some(
          (c) => (c.fromId === sourceNodeId && c.toId === targetNode.id) || (c.fromId === targetNode.id && c.toId === sourceNodeId)
        );

        if (!exists) {
          const newConn: BoardConnection = {
            id: `conn_${Date.now()}`,
            fromId: sourceNodeId,
            toId: targetNode.id,
            label: data.isKeyEvidence ? 'Key Evidence' : 'Possible Link',
            color: data.isKeyEvidence ? '#ef4444' : '#f59e0b',
          };
          setConnections((prev) => [...prev, newConn]);
        }

        if (targetNode.type === 'suspect' && pointsToSuspect === targetNode.metadata?.suspectId) {
          setToastNotification(`🔥 DIRECT CONNECTION ESTABLISHED! "${evTitle}" directly implicates ${targetNode.title}!`);
        } else if (targetNode.type === 'suspect') {
          setToastNotification(`Possible connection established: "${evTitle}" linked to ${targetNode.title}.`);
        } else if (targetNode.type === 'location') {
          setToastNotification(`Location connection established: "${evTitle}" placed at ${targetNode.title}.`);
        } else {
          setToastNotification(`Link created: "${evTitle}" ➔ ${targetNode.title}.`);
        }
      } else if (data.type === 'suspect') {
        setToastNotification(`Suspect ${data.title} linked to ${targetNode.title}.`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDropOnTheorySlot = (e: React.DragEvent, slot: 'suspect' | 'motive' | 'location' | 'evidence') => {
    e.preventDefault();
    setDragHoverTarget(null);
    try {
      const rawData = e.dataTransfer.getData('text/plain');
      if (!rawData) return;
      const data = JSON.parse(rawData);
      sounds.playClueFound();

      if (slot === 'suspect' && data.type === 'suspect') {
        setTheorySlots(prev => ({ ...prev, suspectId: data.suspectId || data.id }));
        setToastNotification(`Theory Updated: Accused Suspect set to ${data.title}.`);
      } else if (slot === 'evidence' && data.type === 'evidence') {
        setTheorySlots(prev => ({ ...prev, evidenceId: data.id }));
        setToastNotification(`Theory Updated: Key Evidence set to "${data.title}".`);
      } else if (slot === 'location') {
        setTheorySlots(prev => ({ ...prev, location: data.title }));
        setToastNotification(`Theory Updated: Crime Location set to ${data.title}.`);
      } else if (slot === 'motive') {
        setTheorySlots(prev => ({ ...prev, motive: data.title }));
        setToastNotification(`Theory Updated: Primary Motive set to "${data.title}".`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Sticky Note Modal
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteColor, setNewNoteColor] = useState<string>('yellow');

  // Analysis / Deductions Overlay
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [selectedConnectionForInspect, setSelectedConnectionForInspect] = useState<BoardConnection | null>(null);

  // Theory Solution Analysis State
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [theoryAnalysisResult, setTheoryAnalysisResult] = useState<{
    isGameWinning: boolean;
    isLogicallyConsistent: boolean;
    score: number;
    suspectMatch: boolean;
    evidenceMatch: boolean;
    motiveMatch: boolean;
    locationMatch: boolean;
    suspectMessage: string;
    evidenceMessage: string;
    motiveMessage: string;
    locationMessage: string;
    overallSummary: string;
  } | null>(null);

  // Hint Modal State
  const [showHintModal, setShowHintModal] = useState(false);
  const [currentHint, setCurrentHint] = useState<{
    title: string;
    description: string;
    category: 'EVIDENCE' | 'SUSPECT' | 'MOTIVE' | 'TIMELINE';
  } | null>(null);

  const handleGetHint = () => {
    sounds.playClueFound();

    const actualKillerId = currentCase.killerId || (currentCase as any).killerSuspectId;
    const actualKiller = suspects[actualKillerId as SuspectId];

    const undiscoveredEv = evidenceList.filter((e) => !e.discovered);
    const keyEvidence = evidenceList.find(
      (e) => e.pointsToSuspectId === actualKillerId || (e.isKeyEvidence && e.discovered)
    );

    let title = 'Detective Insight';
    let description = '';
    let category: 'EVIDENCE' | 'SUSPECT' | 'MOTIVE' | 'TIMELINE' = 'EVIDENCE';

    if (theorySlots.suspectId && theorySlots.suspectId !== actualKillerId) {
      const currentTheorySuspectName = getSuspectName(theorySlots.suspectId);
      title = `Re-evaluating ${currentTheorySuspectName}`;
      category = 'SUSPECT';
      description = `Your selected suspect (${currentTheorySuspectName}) has a verified alibi for ${currentCase.timeOfDeath}. Inspect suspect interrogation transcripts and timeline entries for discrepancies!`;
    } else if (undiscoveredEv.length > 0) {
      const randomUndiscovered = undiscoveredEv[Math.floor(Math.random() * undiscoveredEv.length)];
      title = 'Unexplored Crime Scene Lead';
      category = 'EVIDENCE';
      description = `There are unexamined clues waiting at crime scene locations. Head to Crime Scene Investigation to discover items such as "${replaceNames(randomUndiscovered.title, customNames)}".`;
    } else if (keyEvidence && theorySlots.evidenceId !== keyEvidence.id) {
      title = 'Crucial Physical Link';
      category = 'EVIDENCE';
      description = `You have already uncovered key physical evidence ("${replaceNames(keyEvidence.title, customNames)}"). Try dragging it into Slot #3 (Evidence) of your Murder Theory Matrix!`;
    } else if (actualKiller) {
      title = 'Motive & Profile Clue';
      category = 'MOTIVE';
      description = `Examine suspects driven by ${replaceNames(actualKiller.motive, customNames).toLowerCase()}. Their hidden motive directly conflicts with their witness statement.`;
    } else {
      title = 'Timeline & Opportunity Discrepancy';
      category = 'TIMELINE';
      description = `Cross-reference the time of death (${currentCase.timeOfDeath}) against suspect alibis on your Case Board to isolate who had window of opportunity.`;
    }

    setCurrentHint({ title, description, category });
    setShowHintModal(true);
  };

  const handleAnalyzeTheory = () => {
    sounds.playClueFound();

    const actualKillerId = currentCase.killerId || (currentCase as any).killerSuspectId;
    const chosenSuspectId = theorySlots.suspectId;
    const chosenEvidenceId = theorySlots.evidenceId;
    const chosenMotive = theorySlots.motive;
    const chosenLocation = theorySlots.location;

    // Check if suspect is selected
    if (!chosenSuspectId) {
      setToastNotification('⚠️ Drag an Accused Suspect card into Slot #4 to analyze your theory!');
      return;
    }

    const suspectMatch = chosenSuspectId === actualKillerId;
    const selectedEv = evidenceList.find(e => e.id === chosenEvidenceId);
    
    // Evidence matches if it points to the killer or is key evidence associated with killer
    const evidenceMatch = selectedEv
      ? selectedEv.pointsToSuspectId === actualKillerId || (selectedEv.isKeyEvidence && suspectMatch)
      : false;

    // Motive match if motive slot is filled
    const motiveMatch = Boolean(chosenMotive && chosenMotive.length > 0);
    // Location match if location slot is filled
    const locationMatch = Boolean(chosenLocation && chosenLocation.length > 0);

    let score = 0;
    if (suspectMatch) score += 50;
    if (evidenceMatch) score += 30;
    if (motiveMatch) score += 10;
    if (locationMatch) score += 10;

    const isGameWinning = suspectMatch && (evidenceMatch || (selectedEv && selectedEv.isKeyEvidence));
    const isLogicallyConsistent = suspectMatch && score >= 70;

    const suspectName = getSuspectName(chosenSuspectId);

    let suspectMsg = suspectMatch
      ? `✅ CORRECT CULPRIT: ${suspectName} is indeed the actual killer in this case!`
      : `❌ INCORRECT CULPRIT: Evidence indicates ${suspectName} is NOT the real killer.`;

    let evidenceMsg = evidenceMatch
      ? `✅ DECISIVE EVIDENCE: "${selectedEv ? replaceNames(selectedEv.title, customNames) : 'Key Evidence'}" directly implicates the culprit in the crime.`
      : selectedEv
      ? `⚠️ INCONCLUSIVE EVIDENCE: "${replaceNames(selectedEv.title, customNames)}" does not provide a fatal link to the killer.`
      : `⚠️ MISSING EVIDENCE: Drag a key evidence item into Slot #3 to substantiate your claim.`;

    let motiveMsg = motiveMatch
      ? `✅ MOTIVE LOGIC: "${chosenMotive}" aligns with the killer's psychological drive.`
      : `⚠️ MOTIVE UNSET: Drag a motive card into Slot #1 for a complete hypothesis.`;

    let locationMsg = locationMatch
      ? `✅ LOCATION VERIFIED: "${chosenLocation}" matches the time of death and opportunity window.`
      : `⚠️ LOCATION UNSET: Drag a location card into Slot #2 to fix the crime scene.`;

    let summary = '';
    if (isGameWinning) {
      summary = `🏆 GAME-WINNING SOLUTION DETECTED! Your Murder Theory Logic Matrix is completely sound. ${suspectName} executed the crime with "${selectedEv ? replaceNames(selectedEv.title, customNames) : 'Key Clue'}"! You have established an airtight conviction!`;
    } else if (suspectMatch) {
      summary = `🔍 PARTIAL MATCH (${score}% Consistency): You correctly identified ${suspectName} as the killer, but your supporting evidence or motive logic requires further proof for an unappealable court verdict.`;
    } else {
      summary = `❌ THEORY CONTRADICTION: The evidence web and timeline contradict your theory against ${suspectName}. Review suspect alibis and discovered clues on your corkboard.`;
    }

    setTheoryAnalysisResult({
      isGameWinning,
      isLogicallyConsistent,
      score,
      suspectMatch,
      evidenceMatch,
      motiveMatch,
      locationMatch,
      suspectMessage: suspectMsg,
      evidenceMessage: evidenceMsg,
      motiveMessage: motiveMsg,
      locationMessage: locationMsg,
      overallSummary: summary,
    });

    setShowTheoryModal(true);
  };

  // Mouse move handler for dragging and connecting
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    setMousePos({ x: currentX, y: currentY });

    if (draggingNodeId) {
      setNodes((prev) =>
        prev.map((node) => {
          if (node.id !== draggingNodeId) return node;
          return {
            ...node,
            x: Math.max(10, Math.min(1400, currentX - dragOffset.x)),
            y: Math.max(10, Math.min(1200, currentY - dragOffset.y)),
          };
        })
      );
    }
  };

  const handleMouseUp = () => {
    if (draggingNodeId) {
      setDraggingNodeId(null);
    }
  };

  const startDragging = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    if (!boardRef.current) return;
    sounds.playClick();
    const rect = boardRef.current.getBoundingClientRect();
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    setDraggingNodeId(nodeId);
    setDragOffset({
      x: e.clientX - rect.left - node.x,
      y: e.clientY - rect.top - node.y,
    });
  };

  const handleNodeClick = (nodeId: string) => {
    if (connectingFromId) {
      if (connectingFromId === nodeId) {
        // Cancel connection if clicked same node
        setConnectingFromId(null);
        return;
      }

      // Check if connection already exists
      const exists = connections.some(
        (c) =>
          (c.fromId === connectingFromId && c.toId === nodeId) ||
          (c.fromId === nodeId && c.toId === connectingFromId)
      );

      if (!exists) {
        sounds.playClueFound();
        const newConn: BoardConnection = {
          id: `conn_${Date.now()}`,
          fromId: connectingFromId,
          toId: nodeId,
          label: selectedLabel,
          color: selectedColor,
        };
        setConnections((prev) => [...prev, newConn]);
      }
      setConnectingFromId(null);
    }
  };

  const startConnectingFrom = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    sounds.playClick();
    setConnectingFromId(nodeId);
  };

  const deleteConnection = (connId: string) => {
    sounds.playPaperFlip();
    setConnections((prev) => prev.filter((c) => c.id !== connId));
    setSelectedConnectionForInspect(null);
  };

  const deleteNode = (nodeId: string) => {
    sounds.playPaperFlip();
    setNodes((prev) => prev.filter((n) => n.id !== nodeId));
    setConnections((prev) => prev.filter((c) => c.fromId !== nodeId && c.toId !== nodeId));
  };

  const handleAddStickyNote = () => {
    if (!newNoteTitle.trim()) return;
    sounds.playClick();

    const selectedColorObj = STICKY_NOTE_COLORS.find((c) => c.id === newNoteColor) || STICKY_NOTE_COLORS[0];

    const newNote: BoardNode = {
      id: `note_${Date.now()}`,
      type: 'sticky_note',
      title: newNoteTitle,
      description: newNoteContent,
      x: 500 + Math.random() * 100,
      y: 200 + Math.random() * 100,
      color: selectedColorObj.class,
      badge: 'DETECTIVE NOTE',
    };

    setNodes((prev) => [...prev, newNote]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setShowAddNoteModal(false);
  };

  const autoArrangeBoard = () => {
    sounds.playPaperFlip();
    setNodes(buildInitialNodes());
  };

  // Compute node center coordinates for drawing connections
  const getNodeCenter = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };
    // Assuming card width ~220px, height ~100px
    return {
      x: node.x + 110,
      y: node.y + 50,
    };
  };

  // Evaluate board connections completeness
  const calculateCaseClarity = () => {
    let score = 0;
    const connectedSuspects = new Set<string>();
    const connectedEvidence = new Set<string>();

    connections.forEach((c) => {
      if (c.fromId.includes('suspect')) connectedSuspects.add(c.fromId);
      if (c.toId.includes('suspect')) connectedSuspects.add(c.toId);
      if (c.fromId.includes('evidence')) connectedEvidence.add(c.fromId);
      if (c.toId.includes('evidence')) connectedEvidence.add(c.toId);
    });

    score += Math.min(40, connectedSuspects.size * 10);
    score += Math.min(40, connectedEvidence.size * 10);
    score += Math.min(20, connections.length * 5);

    return Math.min(100, score);
  };

  // Filtered nodes
  const filteredNodes = nodes.filter((node) => {
    if (filterType !== 'ALL' && node.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        node.title.toLowerCase().includes(q) ||
        (node.subtitle && node.subtitle.toLowerCase().includes(q)) ||
        (node.description && node.description.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-slate-100 animate-fadeIn space-y-4">
      
      {/* Top Header Bar */}
      <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-amber-950/80 border border-amber-500/50 text-amber-400">
            <GitFork className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-serif font-bold text-amber-100">
                Visual Case Mapping Corkboard
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950/90 border border-amber-500 text-amber-300 text-[10px] font-mono font-bold">
                RED THREAD ENGINE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Drag nodes & click pins to map red string links between suspects, physical clues, and motives.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Thread Color Selector */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {THREAD_COLORS.map((tc) => (
              <button
                key={tc.color}
                onClick={() => setSelectedColor(tc.color)}
                className={`w-5 h-5 rounded-full border transition-all ${
                  selectedColor === tc.color ? 'scale-125 border-white ring-2 ring-amber-500' : 'border-slate-700 hover:scale-110'
                }`}
                style={{ backgroundColor: tc.color }}
                title={tc.name}
              />
            ))}
          </div>

          {/* Connection Label Dropdown */}
          <select
            value={selectedLabel}
            onChange={(e) => setSelectedLabel(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-xs text-amber-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
          >
            {DEFAULT_LABEL_OPTIONS.map((lbl) => (
              <option key={lbl} value={lbl}>
                🏷️ {lbl}
              </option>
            ))}
          </select>

          {/* Add Sticky Note */}
          <button
            onClick={() => setShowAddNoteModal(true)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-amber-900/40 hover:bg-amber-900/80 border border-amber-600/50 text-amber-300 text-xs font-semibold transition-all active:scale-95"
          >
            <StickyNote className="w-3.5 h-3.5" />
            <span>Add Note</span>
          </button>

          {/* Analyze Connections */}
          <button
            onClick={() => {
              sounds.playClueFound();
              setShowAnalysisModal(true);
            }}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-indigo-900/60 hover:bg-indigo-900 border border-indigo-500/60 text-indigo-200 text-xs font-semibold transition-all active:scale-95 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Analyze Web ({connections.length})</span>
          </button>

          {/* Get Hint Button */}
          <button
            onClick={handleGetHint}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-600/60 text-amber-200 text-xs font-semibold transition-all active:scale-95 shadow-md"
            title="Get a subtle logical deduction hint based on current case evidence"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Get Hint</span>
          </button>

          {/* Analyze Theory Button */}
          <button
            onClick={handleAnalyzeTheory}
            className="flex items-center space-x-1 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white text-xs font-mono font-bold transition-all active:scale-95 shadow-lg"
          >
            <Award className="w-4 h-4 text-amber-200" />
            <span>Analyze Theory</span>
          </button>

          {/* Reset Layout */}
          <button
            onClick={autoArrangeBoard}
            className="p-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all"
            title="Reset Board Layout"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Toast Notification Banner */}
      {toastNotification && (
        <div className="p-3.5 rounded-xl bg-amber-950/90 border-2 border-amber-500 text-amber-100 text-xs font-mono font-bold shadow-xl animate-fadeIn flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>{toastNotification}</span>
          </div>
          <button onClick={() => setToastNotification(null)} className="text-slate-400 hover:text-white text-xs">✕</button>
        </div>
      )}

      {/* Interactive Theory Logic Matrix (The Central Puzzle) */}
      <div className="bg-slate-900 border border-indigo-900/60 rounded-2xl p-4 shadow-2xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
            <h3 className="text-xs font-serif font-bold text-indigo-200 tracking-wider uppercase">
              Murder Theory Logic Matrix (Drag & Drop Items to Assemble Theory)
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            {(theorySlots.suspectId || theorySlots.motive || theorySlots.location || theorySlots.evidenceId) && (
              <button
                onClick={() => setTheorySlots({ suspectId: null, motive: null, location: null, evidenceId: null })}
                className="text-[10px] font-mono text-slate-400 hover:text-white bg-slate-800 px-2.5 py-1 rounded-lg"
              >
                Clear Theory
              </button>
            )}
            <button
              onClick={handleGetHint}
              className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-amber-950 hover:bg-amber-900 border border-amber-600/60 text-amber-300 text-xs font-mono font-bold transition-all active:scale-95"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Get Hint</span>
            </button>
            <button
              onClick={handleAnalyzeTheory}
              className="flex items-center space-x-1.5 px-3.5 py-1 rounded-xl bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white text-xs font-mono font-bold shadow-lg transition-all active:scale-95"
            >
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Analyze Theory</span>
            </button>
          </div>
        </div>

        {/* 4 Puzzle Pillars: Motive -> Opportunity -> Method -> Final Theory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {/* Motive Slot */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragHoverTarget('slot_motive'); }}
            onDragLeave={() => setDragHoverTarget(null)}
            onDrop={(e) => handleDropOnTheorySlot(e, 'motive')}
            className={`p-3 rounded-2xl border-2 transition-all shadow-md ${
              dragHoverTarget === 'slot_motive'
                ? 'border-purple-400 bg-purple-950/60 scale-102 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                : 'border-purple-500/50 bg-gradient-to-br from-purple-950/30 via-slate-950 to-slate-950'
            }`}
          >
            <div className="text-[9px] font-mono font-extrabold text-purple-400 uppercase tracking-widest mb-1 flex items-center justify-between">
              <span>1. MOTIVE</span>
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            </div>
            {theorySlots.motive ? (
              <div className="font-serif text-purple-100 font-bold flex items-center justify-between">
                <span className="truncate">{theorySlots.motive}</span>
                <button onClick={() => setTheorySlots(p => ({ ...p, motive: null }))} className="text-purple-400 hover:text-rose-400 text-xs ml-1">✕</button>
              </div>
            ) : (
              <div className="text-[11px] text-purple-300/60 italic">Drag Motive or Clue here...</div>
            )}
          </div>

          {/* Location Slot */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragHoverTarget('slot_location'); }}
            onDragLeave={() => setDragHoverTarget(null)}
            onDrop={(e) => handleDropOnTheorySlot(e, 'location')}
            className={`p-3 rounded-2xl border-2 transition-all shadow-md ${
              dragHoverTarget === 'slot_location'
                ? 'border-cyan-400 bg-cyan-950/60 scale-102 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                : 'border-cyan-500/50 bg-gradient-to-br from-cyan-950/30 via-slate-950 to-slate-950'
            }`}
          >
            <div className="text-[9px] font-mono font-extrabold text-cyan-400 uppercase tracking-widest mb-1 flex items-center justify-between">
              <span>2. OPPORTUNITY / LOCATION</span>
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            </div>
            {theorySlots.location ? (
              <div className="font-serif text-cyan-100 font-bold flex items-center justify-between">
                <span className="truncate">{theorySlots.location}</span>
                <button onClick={() => setTheorySlots(p => ({ ...p, location: null }))} className="text-cyan-400 hover:text-rose-400 text-xs ml-1">✕</button>
              </div>
            ) : (
              <div className="text-[11px] text-cyan-300/60 italic">Drag Location card here...</div>
            )}
          </div>

          {/* Evidence Slot */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragHoverTarget('slot_evidence'); }}
            onDragLeave={() => setDragHoverTarget(null)}
            onDrop={(e) => handleDropOnTheorySlot(e, 'evidence')}
            className={`p-3 rounded-2xl border-2 transition-all shadow-md ${
              dragHoverTarget === 'slot_evidence'
                ? 'border-amber-400 bg-amber-950/60 scale-102 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'border-amber-500/50 bg-gradient-to-br from-amber-950/30 via-slate-950 to-slate-950'
            }`}
          >
            <div className="text-[9px] font-mono font-extrabold text-amber-400 uppercase tracking-widest mb-1 flex items-center justify-between">
              <span>3. METHOD / KEY EVIDENCE</span>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            </div>
            {theorySlots.evidenceId ? (
              (() => {
                const ev = evidenceList.find(e => e.id === theorySlots.evidenceId);
                return (
                  <div className="font-serif text-amber-100 font-bold flex items-center justify-between">
                    <span className="truncate">{ev ? replaceNames(ev.title, customNames) : theorySlots.evidenceId}</span>
                    <button onClick={() => setTheorySlots(p => ({ ...p, evidenceId: null }))} className="text-amber-400 hover:text-rose-400 text-xs ml-1">✕</button>
                  </div>
                );
              })()
            ) : (
              <div className="text-[11px] text-amber-300/60 italic">Drag Evidence chip here...</div>
            )}
          </div>

          {/* Accused Suspect Slot */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragHoverTarget('slot_suspect'); }}
            onDragLeave={() => setDragHoverTarget(null)}
            onDrop={(e) => handleDropOnTheorySlot(e, 'suspect')}
            className={`p-3 rounded-2xl border-2 transition-all shadow-md ${
              dragHoverTarget === 'slot_suspect'
                ? 'border-rose-400 bg-rose-950/60 scale-102 shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                : 'border-rose-500/50 bg-gradient-to-br from-rose-950/30 via-slate-950 to-slate-950'
            }`}
          >
            <div className="text-[9px] font-mono font-extrabold text-rose-400 uppercase tracking-widest mb-1 flex items-center justify-between">
              <span>4. ACCUSED SUSPECT</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            </div>
            {theorySlots.suspectId ? (
              <div className="font-serif text-rose-200 font-bold flex items-center justify-between">
                <span className="truncate">{getSuspectName(theorySlots.suspectId)}</span>
                <button onClick={() => setTheorySlots(p => ({ ...p, suspectId: null }))} className="text-rose-400 hover:text-white text-xs ml-1">✕</button>
              </div>
            ) : (
              <div className="text-[11px] text-rose-300/60 italic">Drag Suspect card here...</div>
            )}
          </div>
        </div>

        {/* Live Theory Conclusion / Deduction Summary */}
        <div className="p-3 bg-slate-950 rounded-xl border border-indigo-900/50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 flex-1 min-w-[280px]">
            <span className="font-mono text-indigo-400 font-bold shrink-0">FINAL THEORY ASSESSMENT:</span>
            <span className="text-slate-200 font-serif">
              {theorySlots.suspectId ? (
                (() => {
                  const sName = getSuspectName(theorySlots.suspectId);
                  const ev = evidenceList.find(e => e.id === theorySlots.evidenceId);
                  const evTitle = ev ? replaceNames(ev.title, customNames) : 'Evidence';
                  const loc = theorySlots.location || 'Crime Scene';
                  const actualKillerId = currentCase.killerId || (currentCase as any).killerSuspectId;
                  const matchesKiller = actualKillerId === theorySlots.suspectId;
                  
                  if (matchesKiller && ev?.isKeyEvidence) {
                    return `🔥 Strong Connection Established: ${evTitle} directly ties ${sName} to ${loc}. Click "Analyze Theory" to test solution.`;
                  } else {
                    return `Hypothesis formulated: ${evTitle} ➔ ${sName} at ${loc}. Click "Analyze Theory" to test logical consistency.`;
                  }
                })()
              ) : (
                <span className="text-slate-500 italic">Incomplete Theory — Drag clues, locations & suspects into slots above to test your hypothesis.</span>
              )}
            </span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleGetHint}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-600/60 text-amber-200 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Get Hint</span>
            </button>
            <button
              onClick={handleAnalyzeTheory}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all active:scale-95"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Analyze Theory</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-950/80 border border-slate-850 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search nodes on board..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto">
          {['ALL', 'suspect', 'evidence', 'motive', 'sticky_note'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold capitalize transition-all ${
                filterType === f
                  ? 'bg-amber-600 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
              }`}
            >
              {f === 'ALL' ? '🌐 All Nodes' : f.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Active Connection Mode Banner */}
        {connectingFromId && (
          <div className="flex items-center space-x-2 bg-rose-950 border border-rose-500 px-3 py-1 rounded-xl text-rose-200 font-mono text-[11px] animate-pulse">
            <Pin className="w-3.5 h-3.5 text-rose-400" />
            <span>Click any node to attach string!</span>
            <button
              onClick={() => setConnectingFromId(null)}
              className="ml-2 text-xs text-rose-400 hover:text-white"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Main Corkboard Canvas Container */}
      <div
        ref={boardRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="relative w-full h-[680px] bg-slate-950 border-4 border-amber-950/80 rounded-2xl shadow-2xl overflow-hidden cursor-crosshair select-none"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(217, 119, 6, 0.1) 1px, transparent 1px),
            linear-gradient(to right, rgba(30, 41, 59, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(30, 41, 59, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 48px 48px, 48px 48px',
        }}
      >
        {/* SVG Canvas overlay for connecting strings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Render Existing Strings */}
          {connections.map((conn) => {
            const start = getNodeCenter(conn.fromId);
            const end = getNodeCenter(conn.toId);
            if (!start.x || !end.x) return null;

            // Draw curved bezier line with natural sag
            const dx = end.x - start.x;
            const dy = end.y - start.y;
            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2 + Math.min(60, Math.abs(dx) * 0.15);

            const pathD = `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;

            return (
              <g key={conn.id} className="group pointer-events-auto cursor-pointer" onClick={() => setSelectedConnectionForInspect(conn)}>
                {/* Thick invisible touch target */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="16"
                />
                {/* Visible Red String Line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={conn.color || '#ef4444'}
                  strokeWidth="3"
                  filter="url(#shadow)"
                  className="transition-all group-hover:stroke-amber-300 group-hover:stroke-4"
                />
                {/* String Knot Pin on Start */}
                <circle cx={start.x} cy={start.y} r="5" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
                {/* String Knot Pin on End */}
                <circle cx={end.x} cy={end.y} r="5" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />

                {/* Connection Label Badge centered along string */}
                <foreignObject x={midX - 60} y={midY - 14} width="120" height="28">
                  <div className="bg-slate-950/90 border border-slate-700 text-[10px] text-amber-200 font-mono px-2 py-0.5 rounded-full text-center shadow-lg truncate group-hover:border-amber-400 group-hover:text-white transition-all">
                    {conn.label}
                  </div>
                </foreignObject>
              </g>
            );
          })}

          {/* Render Active Dragging String when connecting */}
          {connectingFromId && (() => {
            const start = getNodeCenter(connectingFromId);
            if (!start.x) return null;
            return (
              <line
                x1={start.x}
                y1={start.y}
                x2={mousePos.x}
                y2={mousePos.y}
                stroke={selectedColor}
                strokeWidth="3"
                strokeDasharray="6,6"
                className="animate-pulse"
              />
            );
          })()}
        </svg>

        {/* Board Cards / Nodes */}
        {filteredNodes.map((node) => {
          const isConnectingFromMe = connectingFromId === node.id;
          const isHoverTarget = dragHoverTarget === node.id;

          return (
            <div
              key={node.id}
              onClick={() => handleNodeClick(node.id)}
              onMouseDown={(e) => startDragging(e, node.id)}
              onDragOver={(e) => {
                e.preventDefault();
                setDragHoverTarget(node.id);
              }}
              onDragLeave={() => setDragHoverTarget(null)}
              onDrop={(e) => handleDropOnNode(e, node)}
              draggable={true}
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', JSON.stringify({
                  type: node.type,
                  id: node.id,
                  title: node.title,
                  suspectId: node.metadata?.suspectId,
                  evidenceId: node.metadata?.evidenceId,
                  pointsToSuspectId: node.metadata?.evidenceId ? evidenceList.find(ev => ev.id === node.metadata?.evidenceId)?.pointsToSuspectId : undefined,
                }));
              }}
              className={`absolute z-20 w-56 rounded-2xl p-3.5 border-2 shadow-2xl cursor-grab active:cursor-grabbing transition-shadow ${node.color} ${
                isConnectingFromMe
                  ? 'ring-4 ring-rose-500 animate-pulse scale-105'
                  : isHoverTarget
                  ? 'ring-4 ring-amber-400 scale-105 border-amber-300'
                  : 'hover:border-amber-400 hover:scale-[1.02]'
              }`}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
              }}
            >
              {/* Pushpin at Top Center */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-rose-600 border-2 border-rose-300 shadow-lg flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                </div>
              </div>

              {/* Card Header */}
              <div className="flex items-start justify-between border-b border-slate-700/60 pb-2 mb-2">
                <div>
                  <span className="text-[9px] font-mono font-bold tracking-widest uppercase opacity-75 block">
                    {node.badge || node.type}
                  </span>
                  <h3 className="text-xs font-serif font-bold text-amber-100 line-clamp-1">
                    {node.title}
                  </h3>
                </div>

                {/* Node Pin Connector & Delete Button */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={(e) => startConnectingFrom(e, node.id)}
                    className="p-1 rounded-md bg-amber-900/60 hover:bg-amber-600 text-amber-300 hover:text-slate-950 transition-colors"
                    title="Attach Red Thread"
                  >
                    <Pin className="w-3.5 h-3.5" />
                  </button>
                  {node.type === 'sticky_note' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNode(node.id);
                      }}
                      className="p-1 rounded-md bg-rose-900/60 hover:bg-rose-600 text-rose-300 hover:text-white transition-colors"
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Subtitle / Description */}
              {node.metadata?.suspectId && (
                <div className="text-[10px] font-mono text-slate-300 truncate my-0.5">
                  {suspects[node.metadata.suspectId]?.role}
                </div>
              )}
              {node.subtitle && !node.metadata?.suspectId && (
                <p className="text-[10px] font-mono text-slate-300 mb-1 line-clamp-1">
                  {node.subtitle}
                </p>
              )}
              {node.description && (
                <p className="text-[11px] text-slate-300 leading-tight line-clamp-2">
                  {node.description}
                </p>
              )}

              {/* Suspect specific suspicion bar */}
              {node.metadata?.suspicionLevel !== undefined && (
                <div className="mt-2 pt-1 border-t border-slate-800">
                  <div className="flex justify-between text-[9px] font-mono text-slate-400 mb-0.5">
                    <span>SUSPICION</span>
                    <span className="text-amber-400 font-bold">{node.metadata.suspicionLevel}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full"
                      style={{ width: `${node.metadata.suspicionLevel}%` }}
                    />
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Evidence & Clues Drag Palette */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>EVIDENCE & CLUES DRAG PALETTE (DRAG ONTO SUSPECTS, LOCATIONS OR THEORY SLOTS)</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            {evidenceList.filter(e => e.discovered).length} / {evidenceList.length} Discovered
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1 max-h-36 overflow-y-auto">
          {evidenceList.map((ev) => {
            const evTitle = replaceNames(ev.title, customNames);
            return (
              <div
                key={ev.id}
                draggable={true}
                onDragStart={(e) => {
                  e.dataTransfer.setData(
                    'text/plain',
                    JSON.stringify({
                      type: 'evidence',
                      id: ev.id,
                      title: evTitle,
                      pointsToSuspectId: ev.pointsToSuspectId,
                      isKeyEvidence: ev.isKeyEvidence,
                    })
                  );
                }}
                className={`px-3 py-2 rounded-xl text-xs font-serif font-semibold border shadow cursor-grab active:cursor-grabbing flex items-center space-x-2 transition-all hover:scale-105 ${
                  ev.discovered
                    ? ev.isKeyEvidence
                      ? 'bg-rose-950/90 border-rose-500 text-rose-200'
                      : 'bg-slate-950 border-amber-600/60 text-amber-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-70'
                }`}
              >
                <span>{ev.isKeyEvidence ? '🔑' : '🔍'}</span>
                <span>{evTitle}</span>
                {!ev.discovered && <span className="text-[9px] font-mono text-slate-600">(Undiscovered)</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Sticky Note Modal */}
      {showAddNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-amber-600/50 rounded-2xl w-full max-w-md p-6 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-serif font-bold text-amber-200 flex items-center space-x-2">
                <StickyNote className="w-5 h-5 text-amber-400" />
                <span>Pin Custom Detective Note</span>
              </h3>
              <button
                onClick={() => setShowAddNoteModal(false)}
                className="text-slate-400 hover:text-white text-xs bg-slate-800 px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-mono text-amber-400 block mb-1">
                  Note Color:
                </label>
                <div className="flex items-center gap-2">
                  {STICKY_NOTE_COLORS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setNewNoteColor(c.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                        newNoteColor === c.id
                          ? 'ring-2 ring-white scale-105 shadow-md'
                          : 'opacity-70 hover:opacity-100'
                      } ${c.class}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-amber-400 block mb-1">
                  Note Title:
                </label>
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="e.g. Blackout Timing Anomaly"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-amber-400 block mb-1">
                  Deduction Details:
                </label>
                <textarea
                  rows={3}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Write down key witness statements or contradictions..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => setShowAddNoteModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStickyNote}
                disabled={!newNoteTitle.trim()}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-slate-950 text-xs font-bold shadow-md"
              >
                Pin to Board
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inspect Connection / Cut String Modal */}
      {selectedConnectionForInspect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-rose-600/50 rounded-2xl w-full max-w-sm p-5 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-serif font-bold text-rose-300 flex items-center space-x-2">
                <Scissors className="w-4 h-4 text-rose-400" />
                <span>Red Thread Link</span>
              </h3>
              <button
                onClick={() => setSelectedConnectionForInspect(null)}
                className="text-slate-400 hover:text-white text-xs bg-slate-800 px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
              <p className="font-mono text-amber-400">
                Relationship: <span className="text-white font-bold">{selectedConnectionForInspect.label}</span>
              </p>
              <p className="text-slate-400">
                Connected between active nodes on your corkboard.
              </p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => deleteConnection(selectedConnectionForInspect.id)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-rose-900 hover:bg-rose-800 text-rose-200 text-xs font-bold transition-all shadow-md"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Cut String</span>
              </button>
              <button
                onClick={() => setSelectedConnectionForInspect(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analyze Web Modal */}
      {showAnalysisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-indigo-500/50 rounded-2xl w-full max-w-lg p-6 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-serif font-bold text-indigo-300 flex items-center space-x-2">
                <Award className="w-5 h-5 text-indigo-400" />
                <span>Caseboard Web Analysis & Clarity</span>
              </h3>
              <button
                onClick={() => setShowAnalysisModal(false)}
                className="text-slate-400 hover:text-white text-xs bg-slate-800 px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Clarity Meter */}
              {(() => {
                const clarity = calculateCaseClarity();
                return (
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">DEDUCTION CLARITY INDEX:</span>
                      <span className="text-amber-400 font-bold">{clarity}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-indigo-500 h-full transition-all duration-500"
                        style={{ width: `${clarity}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 italic">
                      {clarity > 75
                        ? '🔥 Excellent Case Web! You have established clear lines connecting primary suspects, physical evidence, and key motives.'
                        : clarity > 40
                        ? '🔍 Solid Progress! Connect remaining undiscovered evidence and motives to build an airtight court conviction.'
                        : '⚠️ Sparse Connections! Click red pins on node cards to string together suspects, evidence, and motives.'}
                    </p>
                  </div>
                );
              })()}

              <div className="space-y-2 text-xs">
                <span className="font-mono text-indigo-400 font-bold uppercase block">
                  Active Red Thread Connections ({connections.length}):
                </span>
                {connections.length === 0 ? (
                  <p className="text-slate-500 italic">No red string connections placed yet.</p>
                ) : (
                  <div className="max-h-40 overflow-y-auto space-y-1.5 p-1">
                    {connections.map((c) => {
                      const fromNode = nodes.find((n) => n.id === c.fromId);
                      const toNode = nodes.find((n) => n.id === c.toId);
                      return (
                        <div
                          key={c.id}
                          className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-[11px]"
                        >
                          <div className="truncate pr-2">
                            <span className="text-amber-200 font-bold">{fromNode?.title || c.fromId}</span>
                            <span className="text-slate-500 mx-1.5">➔ [{c.label}] ➔</span>
                            <span className="text-indigo-200 font-bold">{toNode?.title || c.toId}</span>
                          </div>
                          <button
                            onClick={() => deleteConnection(c.id)}
                            className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                            title="Cut Thread"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowAnalysisModal(false)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analyze Theory Result Modal */}
      {showTheoryModal && theoryAnalysisResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border-2 border-indigo-500/60 rounded-2xl w-full max-w-xl p-6 shadow-2xl text-slate-100 space-y-4">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-xl ${theoryAnalysisResult.isGameWinning ? 'bg-emerald-950 border border-emerald-500 text-emerald-400' : theoryAnalysisResult.isLogicallyConsistent ? 'bg-amber-950 border border-amber-500 text-amber-400' : 'bg-rose-950 border border-rose-500 text-rose-400'}`}>
                  {theoryAnalysisResult.isGameWinning ? <Award className="w-5 h-5 animate-bounce text-amber-400" /> : <Sparkles className="w-5 h-5 text-indigo-400" />}
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-amber-100">
                    Murder Theory Evaluation & Verdict
                  </h3>
                  <p className="text-xs text-slate-400">
                    Logical Consistency Engine Analysis
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowTheoryModal(false)}
                className="text-slate-400 hover:text-white text-xs bg-slate-800 px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>

            {/* Score & Consistency Bar */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400 uppercase tracking-wider">Theory Consistency Index:</span>
                <span className={`font-bold text-sm ${theoryAnalysisResult.score >= 80 ? 'text-emerald-400' : theoryAnalysisResult.score >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {theoryAnalysisResult.score}%
                </span>
              </div>
              <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full transition-all duration-500 ${
                    theoryAnalysisResult.score >= 80
                      ? 'bg-gradient-to-r from-amber-500 to-emerald-500'
                      : theoryAnalysisResult.score >= 50
                      ? 'bg-gradient-to-r from-rose-500 to-amber-500'
                      : 'bg-rose-600'
                  }`}
                  style={{ width: `${theoryAnalysisResult.score}%` }}
                />
              </div>
              <p className="text-xs font-semibold text-slate-200 mt-2 leading-relaxed">
                {theoryAnalysisResult.overallSummary}
              </p>
            </div>

            {/* Pillar Breakdown */}
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className={`p-3 rounded-xl border ${theoryAnalysisResult.suspectMatch ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-200' : 'bg-rose-950/40 border-rose-600/50 text-rose-200'}`}>
                {theoryAnalysisResult.suspectMessage}
              </div>
              <div className={`p-3 rounded-xl border ${theoryAnalysisResult.evidenceMatch ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-200' : 'bg-amber-950/40 border-amber-600/50 text-amber-200'}`}>
                {theoryAnalysisResult.evidenceMessage}
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                {theoryAnalysisResult.motiveMessage}
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                {theoryAnalysisResult.locationMessage}
              </div>
            </div>

            {/* Solution Explanation if winning */}
            {theoryAnalysisResult.isGameWinning && currentCase.solutionExplanation && (
              <div className="p-3 bg-amber-950/60 border border-amber-500/50 rounded-xl space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  CONFIRMED CASE SOLUTION DETAIL:
                </span>
                <p className="text-xs text-amber-100 font-serif leading-relaxed">
                  {replaceNames(currentCase.solutionExplanation, customNames)}
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowTheoryModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800 transition-colors"
                >
                  Refine Hypothesis
                </button>
                {!theoryAnalysisResult.isGameWinning && (
                  <button
                    onClick={() => {
                      setShowTheoryModal(false);
                      handleGetHint();
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-950/80 hover:bg-amber-900 border border-amber-600/60 text-amber-300 flex items-center space-x-1.5 transition-all"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Get Logical Hint</span>
                  </button>
                )}
              </div>

              {onAccuse && (
                <button
                  onClick={() => {
                    setShowTheoryModal(false);
                    sounds.playClueFound();
                    onAccuse();
                  }}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-xl transition-all active:scale-95 flex items-center space-x-2 ${
                    theoryAnalysisResult.isGameWinning
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 animate-pulse'
                      : 'bg-rose-900 hover:bg-rose-800 text-rose-100'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>
                    {theoryAnalysisResult.isGameWinning
                      ? '🎯 Trigger Final Accusation Victory!'
                      : 'Make Formal Accusation'}
                  </span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Detective Logical Hint Modal */}
      {showHintModal && currentHint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border-2 border-amber-500/80 rounded-2xl w-full max-w-lg p-6 shadow-2xl text-slate-100 space-y-4">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-amber-900/60 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-amber-950 border border-amber-500 rounded-xl text-amber-400 shadow-md">
                  <HelpCircle className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                    DETECTIVE LOGIC HINT • {currentHint.category}
                  </div>
                  <h3 className="text-base font-serif font-bold text-amber-100">
                    {currentHint.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowHintModal(false)}
                className="text-slate-400 hover:text-white text-xs bg-slate-800 px-2.5 py-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Hint Content Box */}
            <div className="p-4 bg-slate-950 rounded-xl border border-amber-800/40 space-y-2">
              <p className="text-xs text-slate-200 font-serif leading-relaxed italic">
                "{currentHint.description}"
              </p>
            </div>

            <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-900/40 text-[11px] text-amber-300 font-mono flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Use this lead to inspect clues or rearrange your Murder Theory Matrix slots.</span>
            </div>

            {/* Actions */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowHintModal(false)}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95"
              >
                Got It, Detective
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
