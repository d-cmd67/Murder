import { CustomNames } from '../types';

export function replaceNames(text: string, names: CustomNames): string {
  if (!text) return '';
  return text
    .replace(/\{DETECTIVE\}/g, names.detective || 'Detective')
    .replace(/\{VICTIM\}/g, names.victim || 'The Victim')
    .replace(/\{SUSPECT_1\}/g, names.suspect1 || 'Suspect 1')
    .replace(/\{SUSPECT_2\}/g, names.suspect2 || 'Suspect 2')
    .replace(/\{SUSPECT_3\}/g, names.suspect3 || 'Suspect 3')
    .replace(/\{SUSPECT_4\}/g, names.suspect4 || 'Suspect 4')
    .replace(/\{SUSPECT_5\}/g, names.suspect5 || 'Suspect 5')
    .replace(/\{SUSPECT_6\}/g, names.suspect6 || 'Suspect 6')
    .replace(/\{SUSPECT_7\}/g, names.suspect7 || 'Suspect 7')
    .replace(/\{SUSPECT_8\}/g, names.suspect8 || 'Suspect 8')
    .replace(/\{SUSPECT_9\}/g, names.suspect9 || 'Suspect 9')
    .replace(/\{LOCATION\}/g, names.location || 'The Estate');
}

export const PRESET_NAME_PACKAGES: Array<{ id: string; name: string; description: string; names: CustomNames }> = [
  {
    id: 'st_jude_gala',
    name: '🏰 St. Jude Academy & Grand Azure Estate Gala',
    description: 'Custom 11-character murder mystery featuring your specified cast list.',
    names: {
      detective: 'Akshat Mishra',
      victim: 'Devrik Basu',
      suspect1: 'Aviral',
      suspect2: 'Navyansh Sharda',
      suspect3: 'Vivaan Tyagi',
      suspect4: 'Kushagra',
      suspect5: 'Divyansh Saxena',
      suspect6: 'Nabhya Tyagi',
      suspect7: 'Kinshuk',
      suspect8: 'Gaurvaansh Anand',
      suspect9: 'Arnav Rai',
      location: 'Grand Azure Observatory Estate',
    },
  },
  {
    id: 'classic_noir',
    name: '🎩 Classic Noir Estate',
    description: '1940s classic mansion murder mystery with aristocrats and staff.',
    names: {
      detective: 'Detective Vance',
      victim: 'Lord Arthur Sterling',
      suspect1: 'Benedict the Butler',
      suspect2: 'Dr. Evelyn Cross',
      suspect3: 'Victoria Sterling',
      suspect4: 'Julian Vance (Nephew)',
      location: 'Blackwood Manor',
    },
  },
  {
    id: 'modern_office',
    name: '🏢 Tech Startup Whodunit',
    description: 'A high-stakes corporate homicide at a Silicon Valley venture.',
    names: {
      detective: 'Agent Miller',
      victim: 'CEO Richard Vance',
      suspect1: 'Bob (Lead Developer)',
      suspect2: 'Clara (CFO)',
      suspect3: 'David (Co-founder)',
      suspect4: 'Emma (Head of HR)',
      location: 'Nexus Tower Suite',
    },
  },
];
