export const species = [
  {
    index: 'dwarf',
    name: 'Dwarf',
    create_type: 'humanoid',
    speed: 25,
    size: 'Medium',
    size_description: 'Dwarves stand between 4 and 5 feet tall and average about 150 pounds. Your size is Medium.',
    traits: [
      {
        index: 'darkvision',
        name: 'Darkvision',
        url: '/api/traits/darkvision'
      },
      {
        index: 'dwarven-resilience',
        name: 'Dwarven Resilience',
        url: '/api/traits/dwarven-resilience'
      },
      {
        index: 'dwarven-toughness',
        name: 'Dwarven Toughness',
        url: '/api/traits/dwarven-toughness'
      },
      {
        index: 'stonecunning',
        name: 'Stonecunning',
        url: '/api/traits/stonecunning'
      }
    ],
    subraces: [],
    url: '/api/races/dwarf'
  },
  {
    index: 'elf',
    name: 'Elf',
    create_type: 'humanoid',
    speed: 30,
    size: 'Medium',
    size_description: 'Elves range from under 5 to over 6 feet tall and have slender builds. Your size is Medium.',
    traits: [
      {
        index: 'darkvision',
        name: 'Darkvision',
        url: '/api/traits/darkvision'
      },
      {
        index: 'fey-ancestry',
        name: 'Fey Ancestry',
        url: '/api/traits/fey-ancestry'
      },
      {
        index: 'trance',
        name: 'Trance',
        url: '/api/traits/trance'
      },
      {
        index: 'keen-senses',
        name: 'Keen Senses',
        url: '/api/traits/keen-senses'
      },
      {
        index: 'elven-lineage',
        name: 'Elven Lineage',
        url: '/api/traits/elven-lineage'
      }
    ],
    subraces: [
      {
        index: 'high-elf',
        name: 'High Elf',
        url: '/api/subraces/high-elf'
      }
    ],
    url: '/api/races/elf'
  },
  {
    index: 'halfling',
    name: 'Halfling',
    create_type: 'humanoid',
    speed: 25,
    size: 'Small',
    size_description: 'Halflings average about 3 feet tall and weigh about 40 pounds. Your size is Small.',
    traits: [
      {
        index: 'brave',
        name: 'Brave',
        url: '/api/traits/brave'
      },
      {
        index: 'halfling-nimbleness',
        name: 'Halfling Nimbleness',
        url: '/api/traits/halfling-nimbleness'
      },
      {
        index: 'lucky',
        name: 'Lucky',
        url: '/api/traits/lucky'
      },
      {
        index: 'naturally-stealthy',
        name: 'Naturally Stealthy',
        url: '/api/traits/naturally-stealthy'
      }
    ],
    subraces: [
      {
        index: 'lightfoot-halfling',
        name: 'Lightfoot Halfling',
        url: '/api/subraces/lightfoot-halfling'
      }
    ],
    url: '/api/races/halfling'
  },
  {
    index: 'human',
    name: 'Human',
    create_type: 'humanoid',
    speed: 30,
    size: 'Medium',
    size_description: 'Humans vary widely in height and build, from barely 5 feet to well over 6 feet tall. Regardless of your position in that range, your size is Medium.',
    language_desc: 'You can speak, read, and write Common and one extra language of your choice. Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military phrases, and so on.',
    traits: [
      {
        index: 'resourceful',
        name: 'Resourceful',
        url: '/api/traits/resourceful'
      },
      {
        index: 'skillful',
        name: 'Skillful',
        url: '/api/traits/skillful'
      },
      {
        index: 'versatile',
        name: 'Versatile',
        url: '/api/traits/versatile'
      }
    ],
    subraces: [],
    url: '/api/races/human'
  },
] as const;

type CustomSpecies = {
  index: string,
  name: string,
};
type CustomSpeciesName = string;

export type DnDSpecies = typeof species[number];
export type DnDSpeciesName = typeof species[number]['name'];
export type DnDSpeciesIndex = typeof species[number]['index'];
