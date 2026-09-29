import { CustomNames } from '../types';

export function replaceNames(text: string, names: CustomNames): string {
  if (!text) return '';
  return text
    .replace(/\{DETECTIVE\}/g, names.detective || 'Lead Detective')
    .replace(/\{DETECTIVE_2\}/g, names.detective2 || 'Partner Detective')
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
    .replace(/\{SUSPECT_10\}/g, names.suspect10 || 'Suspect 10')
    .replace(/\{SUSPECT_11\}/g, names.suspect11 || 'Suspect 11')
    .replace(/\{SUSPECT_12\}/g, names.suspect12 || 'Suspect 12')
    .replace(/\{SUSPECT_13\}/g, names.suspect13 || 'Suspect 13')
    .replace(/\{SUSPECT_14\}/g, names.suspect14 || 'Suspect 14')
    .replace(/\{SUSPECT_15\}/g, names.suspect15 || 'Suspect 15')
    .replace(/\{SUSPECT_16\}/g, names.suspect16 || 'Suspect 16')
    .replace(/\{SUSPECT_17\}/g, names.suspect17 || 'Suspect 17')
    .replace(/\{SUSPECT_18\}/g, names.suspect18 || 'Suspect 18')
    .replace(/\{SUSPECT_19\}/g, names.suspect19 || 'Suspect 19')
    .replace(/\{SUSPECT_20\}/g, names.suspect20 || 'Suspect 20')
    .replace(/\{LOCATION\}/g, names.location || 'The Estate');
}

export const PRESET_NAME_PACKAGES: Array<{ id: string; name: string; description: string; names: CustomNames }> = [
  {
    id: 'school_class_9a',
    name: '🏫 Cambridge School Noida - Class 9A Incident',
    description: 'A high-stakes mystery in Class 9A featuring Lead Detective Akshat & Partner Detective Nabhya Tyagi investigating the murder of Devrik Basu at Cambridge School Noida.',
    names: {
      detective: 'Akshat Mishra',
      detective2: 'Nabhya Tyagi',
      victim: 'Devrik Basu',
      suspect1: 'Vihaan',
      suspect2: 'Advik Saxena',
      suspect3: 'Aryaman Vaid',
      suspect4: 'Prahlad',
      suspect5: 'Chitralekha',
      suspect6: 'Arnav Bhandari',
      suspect7: 'Vivaan Tyagi',
      suspect8: 'Aviral',
      suspect9: 'Navyansh Sharda',
      suspect10: 'Divyansh Saxena',
      suspect11: 'Nabhya Tyagi',
      suspect12: 'Kinshuk',
      suspect13: 'Gaurvaansh Anand',
      suspect14: 'Arnav Rai',
      suspect15: 'Atharv Maindola',
      suspect16: 'Arman',
      suspect17: 'Arav Gupta',
      suspect18: 'Chirag Suneja',
      suspect19: 'Lakshay Chauhan',
      suspect20: 'Arav Kailash Yadav',
      location: 'Cambridge School Noida - Class 9A Science Wing',
    },
  },
  {
    id: 'st_jude_prahlad',
    name: '🌟 Cambridge School Noida - Dual Detective Squad',
    description: 'Featuring Lead Detective Akshat & Partner Detective Nabhya Tyagi investigating the murder of Devrik Basu.',
    names: {
      detective: 'Akshat Mishra',
      detective2: 'Nabhya Tyagi',
      victim: 'Devrik Basu',
      suspect1: 'Vihaan',
      suspect2: 'Advik Saxena',
      suspect3: 'Aryaman Vaid',
      suspect4: 'Prahlad',
      suspect5: 'Chitralekha',
      suspect6: 'Arnav Bhandari',
      suspect7: 'Vivaan Tyagi',
      suspect8: 'Aviral',
      suspect9: 'Navyansh Sharda',
      location: 'Cambridge School Noida - Science Wing',
    },
  },
  {
    id: 'detective_prahlad',
    name: '🕵️ Detectives Prahlad & Nabhya Tyagi Squad',
    description: 'Lead Detective Prahlad & Partner Detective Nabhya Tyagi investigating the murder of Devrik Basu.',
    names: {
      detective: 'Prahlad',
      detective2: 'Nabhya Tyagi',
      victim: 'Devrik Basu',
      suspect1: 'Vihaan',
      suspect2: 'Advik Saxena',
      suspect3: 'Aryaman Vaid',
      suspect4: 'Gaurvaansh Anand',
      suspect5: 'Chitralekha',
      suspect6: 'Arnav Bhandari',
      suspect7: 'Vivaan Tyagi',
      suspect8: 'Aviral',
      suspect9: 'Navyansh Sharda',
      location: 'Cambridge School Noida - Observatory Wing',
    },
  },
  {
    id: 'st_jude_gala',
    name: '🏰 Cambridge School Noida - Science Gala',
    description: 'Featuring Lead Detective Akshat & Partner Detective Nabhya Tyagi investigating the murder of Devrik Basu.',
    names: {
      detective: 'Akshat Mishra',
      detective2: 'Nabhya Tyagi',
      victim: 'Devrik Basu',
      suspect1: 'Vihaan',
      suspect2: 'Advik Saxena',
      suspect3: 'Aryaman Vaid',
      suspect4: 'Prahlad',
      suspect5: 'Chitralekha',
      suspect6: 'Arnav Bhandari',
      suspect7: 'Vivaan Tyagi',
      suspect8: 'Aviral',
      suspect9: 'Navyansh Sharda',
      location: 'Cambridge School Noida - Grand Assembly Hall',
    },
  },
  {
    id: 'classic_noir',
    name: '🎩 Classic Noir Dual Investigator Estate',
    description: '1940s classic mansion murder mystery with lead & partner detectives.',
    names: {
      detective: 'Detective Vance',
      detective2: 'Nabhya Tyagi',
      victim: 'Devrik Basu',
      suspect1: 'Benedict the Butler',
      suspect2: 'Dr. Evelyn Cross',
      suspect3: 'Victoria Sterling',
      suspect4: 'Julian Vance',
      location: 'Cambridge School Noida',
    },
  },
];
