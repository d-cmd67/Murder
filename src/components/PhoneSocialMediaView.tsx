import React, { useState, useEffect } from 'react';
import { CustomNames, MysteryCase, Suspect, SuspectId } from '../types';
import { replaceNames } from '../utils/nameFormatter';
import { 
  Smartphone, 
  Send, 
  PhoneCall, 
  Video, 
  MoreVertical, 
  Search, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  ThumbsUp, 
  Play, 
  Volume2, 
  Clock, 
  CheckCheck, 
  Sparkles, 
  Lock, 
  ShieldAlert, 
  Hash, 
  Tv, 
  FileText, 
  User, 
  ArrowLeft,
  ChevronRight,
  Eye,
  Filter,
  UserCheck
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface PhoneSocialMediaViewProps {
  customNames: CustomNames;
  suspects: Record<string, Suspect>;
  currentCase?: MysteryCase;
}

type PlatformTab = 'whatsapp' | 'instagram' | 'facebook' | 'youtube';

export const PhoneSocialMediaView: React.FC<PhoneSocialMediaViewProps> = ({
  customNames,
  suspects,
  currentCase,
}) => {
  const [activePlatform, setActivePlatform] = useState<PlatformTab>('whatsapp');
  const [selectedSuspectFilter, setSelectedSuspectFilter] = useState<string>('ALL');
  const [activeChatThread, setActiveChatThread] = useState<string>('thread_vihaan_devrik');
  const [activeVideoId, setActiveVideoId] = useState<string>('vid_1');
  const [playingVoiceNote, setPlayingVoiceNote] = useState<string | null>(null);

  const suspectKeys = Object.keys(suspects) as SuspectId[];

  const getSuspectName = (key: string, defaultName: string = 'Suspect') => {
    if (key === 'victim') return customNames.victim || 'Devrik Basu';
    return customNames[key as keyof CustomNames] || suspects[key]?.defaultName || defaultName;
  };

  // WhatsApp Leaked Conversations - Balanced Multi-Suspect Network
  const allWhatsappThreads = [
    {
      id: 'thread_vihaan_devrik',
      name: `💼 Council Audit DM: ${getSuspectName('suspect1', 'Vihaan')} & ${customNames.victim || 'Devrik Basu'}`,
      type: 'private',
      avatar: '💼',
      involved: ['suspect1', 'victim', 'suspect3'],
      lastMessage: 'If you take those ballot serial sheets to the principal at 4:20 PM, you won\'t like the result.',
      lastTime: '03:50 PM',
      unread: 2,
      messages: [
        {
          id: 'm_vd1',
          sender: getSuspectName('suspect1', 'Vihaan'),
          text: `{VICTIM}! I know you bypassed the council ballot locker behind the auditorium stage! Hand over those audit sheets!`,
          time: '03:42 PM',
          isMe: false,
        },
        {
          id: 'm_vd2',
          sender: customNames.victim || 'Devrik Basu',
          text: `Vihaan, you swapped 40 voting ballots to secure the Class 9A representative seat. I have the original serial numbers logged in my notebook.`,
          time: '03:45 PM',
          isMe: false,
        },
        {
          id: 'm_vd3',
          sender: getSuspectName('suspect1', 'Vihaan'),
          text: `My family spent thousands funding this school gala. If you hand those sheets to the principal at 4:20 PM, you won't like the result.`,
          time: '03:48 PM',
          isMe: false,
        },
        {
          id: 'm_vd4',
          sender: customNames.victim || 'Devrik Basu',
          text: `I'm locking the proof inside my Science Lab 2 desk drawer right now. Try stopping me before the bell.`,
          time: '03:50 PM',
          isMe: false,
        },
      ],
      voiceNoteText: `Devrik... don't be stupid. Me and Aryaman are heading to Science Lab 2 right now. Put those ballot audit sheets away!`,
    },
    {
      id: 'thread_gaurvaansh_devrik',
      name: `⚽ Best Friends DM: ${getSuspectName('suspect13', 'Gaurvaansh Anand')} & ${customNames.victim || 'Devrik Basu'}`,
      type: 'private',
      avatar: '⚽',
      involved: ['suspect13', 'suspect4', 'suspect8', 'victim'],
      lastMessage: 'Stay safe in Science Lab 2, brother! You\'re my best friend, no matter what happens.',
      lastTime: '04:12 PM',
      unread: 1,
      messages: [
        {
          id: 'm_gd1',
          sender: getSuspectName('suspect13', 'Gaurvaansh Anand'),
          text: `Hey ${customNames.victim || 'Devrik Basu'}! Brother, are you still in Science Lab 2? Don't stress about that attendance log. We've been best friends since primary school, I'm with you 100%!`,
          time: '04:00 PM',
          isMe: false,
        },
        {
          id: 'm_gd2',
          sender: customNames.victim || 'Devrik Basu',
          text: `Thanks Gaurvaansh! I know you forged those practice notes to stay on the football team, but I'll make sure the principal doesn't suspend you. You're my best friend too.`,
          time: '04:05 PM',
          isMe: false,
        },
        {
          id: 'm_gd3',
          sender: getSuspectName('suspect13', 'Gaurvaansh Anand'),
          text: `Appreciate it so much! Aryaman and Vihaan were looking furious outside the classroom earlier. Stay safe in Science Lab 2, brother! I've got your back always!`,
          time: '04:12 PM',
          isMe: false,
        },
      ],
    },
    {
      id: 'thread_aryaman_devrik',
      name: `🎓 Rank #1 DM: ${getSuspectName('suspect3', 'Aryaman Vaid')} & ${customNames.victim || 'Devrik Basu'}`,
      type: 'private',
      avatar: '🎓',
      involved: ['suspect3', 'victim'],
      lastMessage: 'Rank #1 belongs to me. I am bringing the potassium reagent to Lab 2.',
      lastTime: '03:58 PM',
      unread: 1,
      messages: [
        {
          id: 'm_ad1',
          sender: getSuspectName('suspect3', 'Aryaman Vaid'),
          text: `{VICTIM}, delete that photo of the leaked Class 9A final exam answer key immediately!`,
          time: '03:52 PM',
          isMe: false,
        },
        {
          id: 'm_ad2',
          sender: customNames.victim || 'Devrik Basu',
          text: `You bought that answer key from the printing shop, Aryaman. You didn't earn Rank #1. The principal will see the metadata at 4:20 PM.`,
          time: '03:55 PM',
          isMe: false,
        },
        {
          id: 'm_ad3',
          sender: getSuspectName('suspect3', 'Aryaman Vaid'),
          text: `Rank #1 in Class 9A belongs to me. I am bringing the potassium reagent to Science Lab 2 right now to destroy that evidence.`,
          time: '03:58 PM',
          isMe: false,
        },
      ],
    },
    {
      id: 'thread_advik_devrik',
      name: `💻 Code Theft DM: ${getSuspectName('suspect2', 'Advik Saxena')} & ${customNames.victim || 'Devrik Basu'}`,
      type: 'private',
      avatar: '⚙️',
      involved: ['suspect2', 'victim', 'suspect3'],
      lastMessage: 'Check PC 4 terminal logs... Aryaman logged into your account!',
      lastTime: '03:56 PM',
      unread: 1,
      messages: [
        {
          id: 'm_adv1',
          sender: getSuspectName('suspect2', 'Advik Saxena'),
          text: `{VICTIM}, why was my robotics project submission folder erased from PC 4 in Science Lab 2?!`,
          time: '03:51 PM',
          isMe: false,
        },
        {
          id: 'm_adv2',
          sender: customNames.victim || 'Devrik Basu',
          text: `I didn't touch your drive, Advik! Check PC 4 terminal logs—${getSuspectName('suspect3', 'Aryaman Vaid')} logged into your profile while you were at sports practice!`,
          time: '03:54 PM',
          isMe: false,
        },
        {
          id: 'm_adv3',
          sender: getSuspectName('suspect2', 'Advik Saxena'),
          text: `Aryaman?! He promised to help me debug! I am coming to Science Lab 2 right now!`,
          time: '03:56 PM',
          isMe: false,
        },
      ],
    },
    {
      id: 'thread_vivaan_gaurvaansh',
      name: `🎲 Debt & Key DM: ${getSuspectName('suspect7', 'Vivaan Tyagi')} & ${getSuspectName('suspect4', 'Gaurvaansh Anand')}`,
      type: 'private',
      avatar: '🔥',
      involved: ['suspect7', 'suspect4', 'victim'],
      lastMessage: 'I took the brass Science Lab 2 key from the teacher podium.',
      lastTime: '04:02 PM',
      unread: 1,
      messages: [
        {
          id: 'm_vg1',
          sender: getSuspectName('suspect4', 'Gaurvaansh Anand'),
          text: `Vivaan! Did ${customNames.victim || 'Devrik Basu'} see the gambling debt IOUs you left inside Locker #12?`,
          time: '03:57 PM',
          isMe: false,
        },
        {
          id: 'm_vg2',
          sender: getSuspectName('suspect7', 'Vivaan Tyagi'),
          text: `He copied the ledger into his notebook, Gaurvaansh! If he hands that to the principal, my family will pull my funding!`,
          time: '03:59 PM',
          isMe: false,
        },
        {
          id: 'm_vg3',
          sender: getSuspectName('suspect7', 'Vivaan Tyagi'),
          text: `Don't worry, I took the brass Science Lab 2 key from the teacher podium. I will lock him inside Lab 2 until he surrenders the ledger.`,
          time: '04:02 PM',
          isMe: false,
        },
      ],
    },
    {
      id: 'thread_kanav_arnav',
      name: `⚡ Stage Power DM: ${getSuspectName('suspect6', 'Kanav Mathur')} & ${getSuspectName('suspect8', 'Arnav Bhandari')}`,
      type: 'private',
      avatar: '⚡',
      involved: ['suspect6', 'suspect8', 'victim'],
      lastMessage: 'The main electrical breaker trips at 04:00 PM.',
      lastTime: '03:58 PM',
      unread: 0,
      messages: [
        {
          id: 'm_ka1',
          sender: getSuspectName('suspect6', 'Kanav Mathur'),
          text: `Arnav, is the stage lighting amp connected to the same breaker panel as Science Lab 2?`,
          time: '03:53 PM',
          isMe: false,
        },
        {
          id: 'm_ka2',
          sender: getSuspectName('suspect8', 'Arnav Bhandari'),
          text: `Yes, switch #4 controls both the auditorium lights and Lab 2 power sockets. Why?`,
          time: '03:56 PM',
          isMe: false,
        },
        {
          id: 'm_ka3',
          sender: getSuspectName('suspect6', 'Kanav Mathur'),
          text: `The main electrical breaker trips at 04:00 PM during my debate rehearsal. Perfect timing for a momentary blackout.`,
          time: '03:58 PM',
          isMe: false,
        },
      ],
    },
    {
      id: 'thread_chitralekha_devrik',
      name: `🎭 Props & Stage DM: ${getSuspectName('suspect5', 'Chitralekha')} & ${customNames.victim || 'Devrik Basu'}`,
      type: 'private',
      avatar: '🎭',
      involved: ['suspect5', 'victim'],
      lastMessage: 'Did you leave the velvet curtain schedule on the Science Lab 2 table?',
      lastTime: '03:45 PM',
      unread: 1,
      messages: [
        {
          id: 'm_cd1',
          sender: getSuspectName('suspect5', 'Chitralekha'),
          text: `{VICTIM}, did you leave the velvet curtain rehearsal schedule on the Science Lab 2 table?`,
          time: '03:40 PM',
          isMe: false,
        },
        {
          id: 'm_cd2',
          sender: customNames.victim || 'Devrik Basu',
          text: `Yes, Chitralekha. It's next to my chemistry notebook. I'll hand it back to you after the 4:15 PM lab session.`,
          time: '03:42 PM',
          isMe: false,
        },
        {
          id: 'm_cd3',
          sender: getSuspectName('suspect5', 'Chitralekha'),
          text: `Thanks! Please don't let Vihaan or Aryaman spill any chemical reagents on it.`,
          time: '03:45 PM',
          isMe: false,
        },
      ],
    },
    {
      id: 'thread_group_class9a',
      name: '🏫 St. Jude Class 9A Official Student Group',
      type: 'group',
      avatar: '🎒',
      involved: ['ALL', 'suspect1', 'suspect2', 'suspect3', 'suspect4', 'suspect5', 'suspect6', 'suspect7', 'suspect8', 'suspect9', 'victim'],
      lastMessage: 'Who took the Science Lab 2 key from the teacher podium?',
      lastTime: '04:08 PM',
      unread: 5,
      messages: [
        {
          id: 'm_g1',
          sender: getSuspectName('suspect1', 'Vihaan'),
          text: 'Reminder: Class 9A council voting ballots close at 4:30 PM today.',
          time: '03:40 PM',
          isMe: false,
        },
        {
          id: 'm_g2',
          sender: getSuspectName('suspect2', 'Advik Saxena'),
          text: 'My robotics project code got deleted from PC 4 in Science Lab 2!',
          time: '03:52 PM',
          isMe: false,
        },
        {
          id: 'm_g3',
          sender: customNames.victim || 'Devrik Basu',
          text: `I caught whoever bought the leaked Class 9A final exam answer key. The principal will see the audit logs at 4:20 PM.`,
          time: '04:02 PM',
          isMe: false,
        },
        {
          id: 'm_g5',
          sender: getSuspectName('suspect3', 'Aryaman Vaid'),
          text: `Stop making false allegations in the group, {VICTIM}. Delete that message right now.`,
          time: '04:06 PM',
          isMe: false,
        },
        {
          id: 'm_g6',
          sender: getSuspectName('suspect9', 'Navyansh Sharda'),
          text: 'Who took the Science Lab 2 key from the teacher\'s podium? The chemical cabinet is left wide open!',
          time: '04:08 PM',
          isMe: false,
        },
      ],
    },
    {
      id: 'thread_aviral_navyansh',
      name: `🧪 Lab Security Log: ${getSuspectName('suspect8', 'Aviral')} & ${getSuspectName('suspect9', 'Navyansh Sharda')}`,
      type: 'private',
      avatar: '🥼',
      involved: ['suspect8', 'suspect9', 'suspect3', 'suspect7'],
      lastMessage: 'I saw Aryaman and Vivaan walking towards Lab 2 at 4:05 PM.',
      lastTime: '04:10 PM',
      unread: 0,
      messages: [
        {
          id: 'm_an1',
          sender: getSuspectName('suspect9', 'Navyansh Sharda'),
          text: 'Warning: Potassium cyanide flask #4 was moved from Shelf B3 without wearing lab safety gloves.',
          time: '04:07 PM',
          isMe: false,
        },
        {
          id: 'm_an2',
          sender: getSuspectName('suspect8', 'Aviral'),
          text: `I saw ${getSuspectName('suspect3', 'Aryaman Vaid')} and ${getSuspectName('suspect7', 'Vivaan Tyagi')} walking towards Science Lab 2 carrying a folder at 4:05 PM.`,
          time: '04:10 PM',
          isMe: false,
        },
      ],
    },
  ];

  // Instagram Leaked Posts
  const allInstagramPosts = [
    {
      id: 'ig_1',
      author: getSuspectName('suspect1', 'Vihaan'),
      handle: `@${getSuspectName('suspect1', 'Vihaan').toLowerCase().replace(/\s+/g, '_')}_council`,
      avatar: '🗳️',
      involved: ['suspect1', 'victim', 'suspect3'],
      imageDesc: 'Class 9A official ballot box sitting on the teacher podium surrounded by blue ribbons.',
      caption: `Class 9A leadership is built on discipline. Anyone trying to sabotage the council elections with fake rumors will be dealt with. 🗳️ #Class9AElections #StJude #${(customNames.victim || 'Devrik Basu').replace(/\s+/g, '')}`,
      likes: '620 likes',
      time: '03:25 PM',
      comments: [
        { author: `@${(customNames.victim || 'Devrik Basu').toLowerCase().replace(/\s+/g, '_')}`, text: 'The principal will check the ballot serial numbers at 4:20 PM.' },
        { author: `@${getSuspectName('suspect3', 'Aryaman Vaid').toLowerCase().replace(/\s+/g, '_')}`, text: 'Science Lab 2 is no place for snitches.' },
      ],
    },
    {
      id: 'ig_2',
      author: getSuspectName('suspect3', 'Aryaman Vaid'),
      handle: `@${getSuspectName('suspect3', 'Aryaman Vaid').toLowerCase().replace(/\s+/g, '_')}_rank1`,
      avatar: '📚',
      involved: ['suspect3', 'victim'],
      imageDesc: 'Class 9A Science Lab 2 experiment workbench with chemical flasks and open textbooks.',
      caption: 'Rank #1 in Class 9A requires perfection and zero distractions. 📚🔬 Nobody ruins my academic record before board exams. #Class9A #StJudeHigh #ScienceExhibition',
      likes: '912 likes',
      time: '03:45 PM',
      comments: [
        { author: `@${(customNames.victim || 'Devrik Basu').toLowerCase().replace(/\s+/g, '_')}`, text: 'Perfection doesn\'t come from stolen exam answer keys, Aryaman.' },
      ],
    },
    {
      id: 'ig_3',
      author: getSuspectName('suspect2', 'Advik Saxena'),
      handle: `@${getSuspectName('suspect2', 'Advik Saxena').toLowerCase().replace(/\s+/g, '_')}_tech`,
      avatar: '⚙️',
      involved: ['suspect2', 'suspect3', 'victim'],
      imageDesc: 'Science Lab PC 4 terminal showing system error logs and erased files.',
      caption: 'Someone wiped my robotics submission drive from PC 4 right before the deadline. System logs don\'t lie. 💻 #Class9ARobotics #StJudeTech',
      likes: '480 likes',
      time: '03:54 PM',
      comments: [
        { author: `@${(customNames.victim || 'Devrik Basu').toLowerCase().replace(/\s+/g, '_')}`, text: 'Check Aryaman\'s login timestamp on PC 4.' },
      ],
    },
    {
      id: 'ig_4',
      author: getSuspectName('suspect7', 'Vivaan Tyagi'),
      handle: `@${getSuspectName('suspect7', 'Vivaan Tyagi').toLowerCase().replace(/\s+/g, '_')}_king`,
      avatar: '🎲',
      involved: ['suspect7', 'victim'],
      imageDesc: 'Class 9A back row desk with contraband phone and a brass lab key.',
      caption: 'High risks, higher rewards. Backbenchers always hold the master keys. 🔑 #Class9ALife',
      likes: '430 likes',
      time: '03:15 PM',
      comments: [
        { author: `@${getSuspectName('suspect7', 'Vivaan Tyagi').toLowerCase().replace(/\s+/g, '_')}`, text: 'Nobody leaves Lab 2 with my ledger.' },
      ],
    },
  ];

  // Facebook Community Posts
  const allFacebookPosts = [
    {
      id: 'fb_1',
      author: 'St. Jude Class 9A Student Council',
      badge: 'Official Class 9A Board',
      avatar: '🎓',
      time: '2 hours ago',
      involved: ['victim', 'suspect1', 'suspect3', 'suspect2'],
      content: `Class 9A Science Exhibition submissions are scheduled for 4:15 PM today in Science Lab 2. Special thanks to Class Representative ${customNames.victim || 'Devrik Basu'} for coordinating the project verification.`,
      reactions: '❤️ 142  👍 98',
      comments: [
        { author: getSuspectName('suspect3', 'Aryaman Vaid'), text: 'Some submissions won\'t make it to 4:15 PM.' },
        { author: getSuspectName('suspect2', 'Advik Saxena'), text: 'Not if my robotics code is restored first!' },
      ],
    },
    {
      id: 'fb_2',
      author: getSuspectName('suspect4', 'Gaurvaansh Anand'),
      badge: 'Debate Team Lead',
      avatar: '📜',
      time: '1 hour ago',
      involved: ['suspect4', 'victim'],
      content: 'Debate competition finalists must verify their academic eligibility sheets by 04:10 PM in Science Lab 2.',
      reactions: '👍 45  😮 8',
      comments: [
        { author: getSuspectName('suspect1', 'Vihaan'), text: 'Eligibility is already verified by the council board.' },
      ],
    },
  ];

  // YouTube Audio Leaks
  const allYoutubeVideos = [
    {
      id: 'vid_1',
      title: `🚨 LEAKED AUDIO: ${getSuspectName('suspect1', 'Vihaan')}, ${customNames.victim || 'Devrik Basu'} & ${getSuspectName('suspect3', 'Aryaman Vaid')} Backstage Showdown (03:50 PM)`,
      channel: 'St. Jude High Student Leaks',
      views: '24K views • 25 mins ago',
      thumbnailBg: 'from-amber-950 to-slate-900',
      duration: '02:10',
      involved: ['suspect1', 'victim', 'suspect3'],
      transcript: `00:08 - ${getSuspectName('suspect1', 'Vihaan')}: "${customNames.victim || 'Devrik'}! Hand over those ballot audit sheets and the exam key proof right now!"\n` +
        `00:25 - ${customNames.victim || 'Devrik Basu'}: "Vihaan, you and Aryaman cheated your way to the top of Class 9A! The principal gets this at 4:20 PM!"\n` +
        `00:48 - ${getSuspectName('suspect3', 'Aryaman Vaid')}: "You won't make it to the principal's office with those files, Devrik!"\n` +
        `01:12 - ${getSuspectName('suspect1', 'Vihaan')}: "He locked them inside his Science Lab 2 desk drawer! Let's get to Lab 2 before the 4:15 PM bell!"\n` +
        `01:40 - Running footsteps down Class 9A corridor towards Science Lab 2.`,
      comments: [
        { user: '@Class9AWatcher', text: `Listen at 00:25! Devrik Basu had concrete proof against both Vihaan and Aryaman Vaid!` },
        { user: '@SchoolForensics', text: 'At 01:12 Aryaman explicitly says they are heading to Science Lab 2 right before Devrik collapsed at 4:15 PM!' },
      ],
    },
    {
      id: 'vid_2',
      title: '🧪 Class 9A Science Lab 2 Security Cam Audio (04:08 PM)',
      channel: 'Forensic Science Archives',
      views: '15K views • 40 mins ago',
      thumbnailBg: 'from-rose-950 to-slate-900',
      duration: '01:30',
      involved: ['victim', 'suspect7'],
      transcript: `00:05 - ${customNames.victim || 'Devrik Basu'}: "Why is the potassium cyanide flask unlocked on the teacher podium?"\n` +
        `00:22 - ${getSuspectName('suspect7', 'Vivaan Tyagi')}: "Put those audit files down, ${customNames.victim || 'Devrik'}. Nobody has to get hurt."\n` +
        `00:45 - ${customNames.victim || 'Devrik Basu'}: "Get away from my lab desk! What did you pour into this beaker?!"\n` +
        `01:10 - Beaker clinking, heavy breathing, sudden heavy collapse on floor.`,
      comments: [
        { user: '@LabSleuth', text: `Vivaan Tyagi was inside Lab 2 with ${customNames.victim || 'Devrik Basu'} right at 04:08 PM!` },
      ],
    },
  ];

  // Dynamic Filtering based on selectedSuspectFilter
  const filteredWhatsApp = allWhatsappThreads.filter((t) => {
    if (selectedSuspectFilter === 'ALL') return true;
    return t.involved.includes(selectedSuspectFilter);
  });

  const filteredInstagram = allInstagramPosts.filter((p) => {
    if (selectedSuspectFilter === 'ALL') return true;
    return p.involved.includes(selectedSuspectFilter);
  });

  const filteredFacebook = allFacebookPosts.filter((p) => {
    if (selectedSuspectFilter === 'ALL') return true;
    return p.involved.includes(selectedSuspectFilter);
  });

  const filteredYouTube = allYoutubeVideos.filter((v) => {
    if (selectedSuspectFilter === 'ALL') return true;
    return v.involved.includes(selectedSuspectFilter);
  });

  // Ensure active thread/video is valid when filter changes
  useEffect(() => {
    if (filteredWhatsApp.length > 0) {
      if (!filteredWhatsApp.some((t) => t.id === activeChatThread)) {
        setActiveChatThread(filteredWhatsApp[0].id);
      }
    }
  }, [selectedSuspectFilter, filteredWhatsApp]);

  useEffect(() => {
    if (filteredYouTube.length > 0) {
      if (!filteredYouTube.some((v) => v.id === activeVideoId)) {
        setActiveVideoId(filteredYouTube[0].id);
      }
    }
  }, [selectedSuspectFilter, filteredYouTube]);

  const currentChat = filteredWhatsApp.find((t) => t.id === activeChatThread) || filteredWhatsApp[0] || allWhatsappThreads[0];
  const currentVideo = filteredYouTube.find((v) => v.id === activeVideoId) || filteredYouTube[0] || allYoutubeVideos[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-slate-100 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 mb-1">
            <Smartphone className="w-4 h-4 text-amber-500" />
            <span>CYBER FORENSIC PHONE & SOCIAL MEDIA LEAKS</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-amber-100">
            Leaked Digital Evidence & Suspect DMs
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Recovered WhatsApp chats, Instagram posts, Facebook group discussions, and YouTube audio leaks revealing private conflicts, blackmail threats, and secret agreements across St. Jude Academy!
          </p>
        </div>

        {/* Suspect Filter Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono text-amber-300 font-bold">Filter Suspect Leaks:</span>
          </div>
          <select
            value={selectedSuspectFilter}
            onChange={(e) => {
              sounds.playClick();
              setSelectedSuspectFilter(e.target.value);
            }}
            className="bg-slate-900 border border-amber-500/40 rounded-xl px-3 py-1.5 text-xs text-amber-200 font-medium focus:outline-none focus:border-amber-400 shadow-inner"
          >
            <option value="ALL">🌐 All Suspect Leaks ({allWhatsappThreads.length} Threads)</option>
            <option value="victim">🎒 {customNames.victim || 'Devrik Basu'} (Victim's Leaked Phone)</option>
            {Object.keys(currentCase.suspects).map((sKey, index) => {
              const sId = sKey as SuspectId;
              const suspect = currentCase.suspects[sId];
              const name = getSuspectName(sId, suspect?.defaultName || `Suspect #${index + 1}`);
              const role = suspect?.role ? ` (${suspect.role})` : '';
              return (
                <option key={sId} value={sId}>
                  🕵️ #{index + 1}: {name}{role}
                </option>
              );
            })}
          </select>
        </div>
      </div>



      {/* Main Smartphone Shell Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Smartphone Frame Container (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
          
          {/* Phone Top Notch & Status Bar */}
          <div className="bg-slate-900 rounded-2xl p-3 border border-slate-800 mb-4 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-200 font-bold">04:18 PM</span>
              <span className="text-[10px] text-amber-400 font-bold">&bull; FORENSIC DECRYPTION ACTIVE</span>
            </div>
            <div className="flex items-center space-x-3 text-[11px]">
              <span>5G 📶</span>
              <span>100% 🔋</span>
            </div>
          </div>

          {/* Platform Tab Switcher Bar */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            <button
              onClick={() => {
                sounds.playClick();
                setActivePlatform('whatsapp');
              }}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center space-y-1 font-bold text-xs transition-all ${
                activePlatform === 'whatsapp'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50 scale-105 border border-emerald-400'
                  : 'bg-slate-900 text-slate-400 hover:text-emerald-400 hover:bg-slate-850 border border-slate-800'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp ({filteredWhatsApp.length})</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActivePlatform('instagram');
              }}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center space-y-1 font-bold text-xs transition-all ${
                activePlatform === 'instagram'
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white shadow-lg shadow-pink-950/50 scale-105 border border-pink-400'
                  : 'bg-slate-900 text-slate-400 hover:text-pink-400 hover:bg-slate-850 border border-slate-800'
              }`}
            >
              <Heart className="w-5 h-5" />
              <span>Instagram ({filteredInstagram.length})</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActivePlatform('facebook');
              }}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center space-y-1 font-bold text-xs transition-all ${
                activePlatform === 'facebook'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/50 scale-105 border border-blue-400'
                  : 'bg-slate-900 text-slate-400 hover:text-blue-400 hover:bg-slate-850 border border-slate-800'
              }`}
            >
              <ThumbsUp className="w-5 h-5" />
              <span>Facebook ({filteredFacebook.length})</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActivePlatform('youtube');
              }}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center space-y-1 font-bold text-xs transition-all ${
                activePlatform === 'youtube'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-950/50 scale-105 border border-red-400'
                  : 'bg-slate-900 text-slate-400 hover:text-red-400 hover:bg-slate-850 border border-slate-800'
              }`}
            >
              <Play className="w-5 h-5" />
              <span>YouTube ({filteredYouTube.length})</span>
            </button>
          </div>

          {/* PLATFORM CONTENT: WHATSAPP */}
          {activePlatform === 'whatsapp' && (
            <div className="space-y-4">
              <div className="bg-emerald-950/40 border border-emerald-800/50 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-emerald-300 font-mono">
                  <Lock className="w-3.5 h-3.5" />
                  <span>END-TO-END ENCRYPTED WHATSAPP CHAT DECRYPTION</span>
                </div>
                <span className="text-[10px] bg-emerald-900/60 text-emerald-200 px-2 py-0.5 rounded border border-emerald-700 font-mono font-bold">
                  {filteredWhatsApp.length} THREADS RECOVERED
                </span>
              </div>

              {/* Chat Thread Selector */}
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
                {filteredWhatsApp.map((thread) => (
                  <button
                    key={thread.id}
                    onClick={() => {
                      sounds.playClick();
                      setActiveChatThread(thread.id);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap flex items-center space-x-2 transition-all cursor-pointer ${
                      activeChatThread === thread.id
                        ? 'bg-emerald-600 text-white font-bold border border-emerald-400 shadow-md scale-102'
                        : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-emerald-600'
                    }`}
                  >
                    <span>{thread.name}</span>
                  </button>
                ))}
              </div>

              {/* Active WhatsApp Chat Window */}
              {currentChat && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-4 min-h-[380px] flex flex-col justify-between shadow-inner">
                  
                  {/* Chat Header */}
                  <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-amber-100">
                        {currentChat.name}
                      </h4>
                      <p className="text-[10px] text-emerald-400 font-mono">
                        Active conversation logged at {currentChat.lastTime}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <PhoneCall className="w-4 h-4 cursor-pointer hover:text-emerald-400" />
                      <Video className="w-4 h-4 cursor-pointer hover:text-emerald-400" />
                    </div>
                  </div>

                  {/* Chat Messages Body */}
                  <div className="space-y-3 flex-1 overflow-y-auto max-h-[380px] pr-2 scrollbar-thin">
                    {currentChat.messages.map((msg) => (
                      <div key={msg.id} className="flex flex-col space-y-1">
                        <div className="bg-slate-950/90 border border-slate-800 p-3 rounded-2xl max-w-[90%] space-y-1.5 self-start shadow-md">
                          <div className="flex items-center justify-between space-x-3 text-[11px] font-bold text-amber-300 border-b border-slate-800/80 pb-1">
                            <span>👤 {msg.sender}</span>
                            <span className="text-[9px] text-slate-400 font-mono">{msg.time}</span>
                          </div>
                          <p className="text-xs text-slate-100 leading-relaxed pt-0.5">
                            {replaceNames(msg.text, customNames)}
                          </p>
                          <div className="flex justify-end pt-1">
                            <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Voice Note Simulation Card if present */}
                  {currentChat.voiceNoteText && (
                    <div className="bg-slate-950 p-3 rounded-xl border border-emerald-700/50 flex items-center justify-between shadow-lg">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            if (playingVoiceNote) {
                              sounds.playClick();
                              setPlayingVoiceNote(null);
                            } else {
                              sounds.playHeartbeatPulse();
                              setPlayingVoiceNote(currentChat.id);
                            }
                          }}
                          className="p-2.5 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-md"
                        >
                          {playingVoiceNote === currentChat.id ? <Volume2 className="w-4 h-4 animate-pulse" /> : <Play className="w-4 h-4" />}
                        </button>
                        <div>
                          <div className="text-xs font-bold text-emerald-300 flex items-center space-x-1">
                            <span>🎙️ Leaked Voice Note Transcript</span>
                            {playingVoiceNote === currentChat.id && <span className="text-[10px] text-amber-400 font-mono animate-bounce">(Playing...)</span>}
                          </div>
                          <p className="text-[11px] text-slate-300 italic">
                            "{replaceNames(currentChat.voiceNoteText, customNames)}"
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-1 rounded border border-emerald-800">
                        0:18
                      </span>
                    </div>
                  )}

                </div>
              )}
            </div>
          )}

          {/* PLATFORM CONTENT: INSTAGRAM */}
          {activePlatform === 'instagram' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-950/40 via-pink-950/40 to-slate-900 border border-pink-800/40 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-pink-300 font-mono">
                  <Heart className="w-3.5 h-3.5 text-pink-400" />
                  <span>SUSPECT INSTAGRAM REELS & LEAKED POSTS</span>
                </div>
                <span className="text-[10px] bg-pink-900/60 text-pink-200 px-2 py-0.5 rounded border border-pink-700 font-mono">
                  {filteredInstagram.length} POSTS FOUND
                </span>
              </div>

              {/* Instagram Feed Grid */}
              <div className="space-y-6">
                {filteredInstagram.map((post) => (
                  <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-xl">
                    {/* Author Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div>
                        <h4 className="text-xs font-bold text-amber-200">{post.author}</h4>
                        <span className="text-[10px] font-mono text-pink-400">{post.handle}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{post.time}</span>
                    </div>

                    {/* Image Mock Container */}
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center space-y-2">
                      <div className="text-3xl">📸</div>
                      <p className="text-xs text-amber-300/90 font-serif italic">
                        {replaceNames(post.imageDesc, customNames)}
                      </p>
                    </div>

                    {/* Caption */}
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      {replaceNames(post.caption, customNames)}
                    </p>

                    {/* Action Counts */}
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                      <span className="text-pink-400 font-bold">{post.likes}</span>
                      <div className="flex space-x-3">
                        <Heart className="w-4 h-4 hover:text-pink-500 cursor-pointer" />
                        <MessageCircle className="w-4 h-4 hover:text-sky-400 cursor-pointer" />
                        <Share2 className="w-4 h-4 hover:text-emerald-400 cursor-pointer" />
                      </div>
                    </div>

                    {/* Comments Leak */}
                    <div className="bg-slate-950/90 rounded-xl p-3 space-y-1.5 text-xs border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                        💬 Flagged Comment Thread:
                      </span>
                      {post.comments.map((c, i) => (
                        <div key={i} className="text-[11px] text-slate-300">
                          <span className="font-bold text-amber-400">{c.author}: </span>
                          <span>{replaceNames(c.text, customNames)}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PLATFORM CONTENT: FACEBOOK */}
          {activePlatform === 'facebook' && (
            <div className="space-y-4">
              <div className="bg-blue-950/40 border border-blue-800/40 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-blue-300 font-mono">
                  <ThumbsUp className="w-3.5 h-3.5 text-blue-400" />
                  <span>FACEBOOK COMMUNITY & CLASSROOM FORUM POSTS</span>
                </div>
                <span className="text-[10px] bg-blue-900/60 text-blue-200 px-2 py-0.5 rounded border border-blue-700 font-mono">
                  {filteredFacebook.length} DISCUSSIONS
                </span>
              </div>

              {/* Facebook Posts List */}
              <div className="space-y-4">
                {filteredFacebook.map((post) => (
                  <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-xl">
                    <div className="border-b border-slate-800 pb-2">
                      <h4 className="text-xs font-bold text-amber-100">{post.author}</h4>
                      <span className="text-[10px] text-blue-400 font-mono">{post.badge} &bull; {post.time}</span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      {replaceNames(post.content, customNames)}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                      <span className="text-blue-300 font-bold">{post.reactions}</span>
                      <span className="text-[10px] font-mono text-slate-400">Public Forum Feed</span>
                    </div>

                    {/* Facebook Comments */}
                    <div className="bg-slate-950 rounded-xl p-3 space-y-2 text-xs border border-slate-800">
                      {post.comments.map((c, i) => (
                        <div key={i} className="border-l-2 border-blue-600 pl-2 space-y-0.5">
                          <span className="font-bold text-amber-300 text-[11px] block">{c.author}</span>
                          <p className="text-[11px] text-slate-300">{replaceNames(c.text, customNames)}</p>
                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PLATFORM CONTENT: YOUTUBE */}
          {activePlatform === 'youtube' && (
            <div className="space-y-4">
              <div className="bg-red-950/40 border border-red-800/40 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-red-300 font-mono">
                  <Tv className="w-3.5 h-3.5 text-red-400" />
                  <span>YOUTUBE LEAKED VIDEO TRANSCRIPTS & AUDIO EVIDENCE</span>
                </div>
                <span className="text-[10px] bg-red-900/60 text-red-200 px-2 py-0.5 rounded border border-red-700 font-mono">
                  {filteredYouTube.length} LEAKED VIDEOS
                </span>
              </div>

              {/* YouTube Video Selector */}
              <div className="space-y-4">
                {filteredYouTube.map((vid) => (
                  <div key={vid.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-2xl">
                    <div className="bg-gradient-to-r from-red-950 via-slate-900 to-black p-4 rounded-xl border border-red-900/40 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-red-600 text-white rounded-full shadow-lg">
                          <Play className="w-5 h-5 fill-current" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-amber-100">{replaceNames(vid.title, customNames)}</h4>
                          <span className="text-[10px] text-red-400 font-mono">{vid.channel} &bull; {vid.views}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono bg-black/60 px-2 py-1 rounded text-red-300 border border-red-800">
                        {vid.duration}
                      </span>
                    </div>

                    {/* Transcript Box */}
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 font-mono text-xs">
                      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block border-b border-slate-800 pb-1">
                        📜 Audio Transcript Log:
                      </span>
                      <pre className="text-[11px] text-slate-200 whitespace-pre-wrap font-sans leading-relaxed pt-1">
                        {replaceNames(vid.transcript, customNames)}
                      </pre>
                    </div>

                    {/* YouTube Comments */}
                    <div className="bg-slate-950/90 rounded-xl p-3 space-y-1.5 text-xs border border-slate-800">
                      <span className="text-[10px] text-red-400 font-mono uppercase block mb-1">
                        🔴 Live Chat Replay Stream Comments:
                      </span>
                      {vid.comments.map((c, i) => (
                        <div key={i} className="text-[11px] text-slate-300">
                          <span className="font-bold text-red-300">{c.user}: </span>
                          <span>{replaceNames(c.text, customNames)}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Detective's Analysis & Suspect Digital Dossier (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 border-b border-slate-800 pb-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>DIGITAL FORENSIC DOSSIER</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-serif font-bold text-amber-100 flex items-center space-x-1.5">
                <span>🕵️ Class 9A Multi-Suspect Digital Dossier</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Leaked messages confirm intersecting motives across multiple suspects (<span className="text-amber-300 font-bold">{customNames.victim || 'Devrik Basu'}</span>, <span className="text-blue-300 font-bold">{getSuspectName('suspect1', 'Vihaan')}</span>, <span className="text-purple-300 font-bold">{getSuspectName('suspect3', 'Aryaman Vaid')}</span>, <span className="text-emerald-300 font-bold">{getSuspectName('suspect2', 'Advik Saxena')}</span>, <span className="text-amber-400 font-bold">{getSuspectName('suspect7', 'Vivaan Tyagi')}</span>, and others):
              </p>

              <ul className="space-y-2 text-xs text-slate-300">
                <li className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-2">
                  <span className="text-rose-400 font-bold font-mono">1.</span>
                  <span>
                    <strong className="text-rose-300">Council & Exam Manipulation:</strong> Vihaan and Aryaman Vaid were directly threatened by Devrik Basu exposing rigged ballots and leaked test answer keys at 4:20 PM.
                  </span>
                </li>
                <li className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-2">
                  <span className="text-amber-400 font-bold font-mono">2.</span>
                  <span>
                    <strong className="text-amber-200">Code Theft & Debts:</strong> Advik Saxena's wiped robotics project files and Vivaan Tyagi's missing lab podium key created intense friction right before the incident.
                  </span>
                </li>
                <li className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-2">
                  <span className="text-red-400 font-bold font-mono">3.</span>
                  <span>
                    <strong className="text-red-300">Lab 2 Backstage Showdown:</strong> Leaked audio logs verify a heated confrontation at 03:50 PM before suspects rushed to Science Lab 2 prior to the electrical blackout.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-950/40 border border-amber-600/40 p-3 rounded-xl text-xs text-amber-200/90 space-y-1">
              <div className="font-bold flex items-center space-x-1 text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Interrogation Strategy:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Confront <span className="text-blue-300 font-semibold">{getSuspectName('suspect1', 'Vihaan')}</span>, <span className="text-purple-300 font-semibold">{getSuspectName('suspect3', 'Aryaman Vaid')}</span>, and <span className="text-amber-300 font-semibold">{getSuspectName('suspect7', 'Vivaan Tyagi')}</span> with their specific leaked DM logs during interrogation to break their composure!
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
