const skillNames = [
  "Acrobatics",
  "Animal Handling",
  "Arcana",
  "Athletics",
  "Deception",
  "History",
  "Insight",
  "Intimidation",
  "Investigation",
  "Medicine",
  "Nature",
  "Perception",
  "Performance",
  "Persuasion",
  "Religion",
  "Sleight of Hand",
  "Stealth",
  "Survival",
] as const;
export type DnDSkillName = typeof skillNames[number];

interface DnDSkill {
  skillName: DnDSkillName,
  ability: string,
  exampleUse: string
}

const skills: DnDSkill[] = [
  {
    skillName: "Acrobatics",
    ability: "Dexterity",
    exampleUse: "Stay on your feet in a tricky situation, or perform an acrobatic stunt"
  },
  {
    skillName: "Animal Handling",
    ability: "Wisdom",
    exampleUse: "Calm or train an animal, or get an animal to behave in a certain way"
  },
  {
    skillName: "Arcana",
    ability: "Intelligence",
    exampleUse: "Recall lore about spells, magic items, and the planes of existence"
  },
  {
    skillName: "Athletics",
    ability: "Strength",
    exampleUse: "Jump farther than normal, stay afloat in rough water, or break something"
  },
  {
    skillName: "Deception",
    ability: "Charisma",
    exampleUse: "Tell a convincing lie, or wear a disguise convincingly"
  },
  {
    skillName: "History",
    ability: "Intelligence",
    exampleUse: "Recall lore about historical events, people, nations, and cultures"
  },
  {
    skillName: "Insight",
    ability: "Wisdom",
    exampleUse: "Discern a person's mood and intentions"
  },
  {
    skillName: "Intimidation",
    ability: "Charisma",
    exampleUse: "Awe or threaten someone into doing what you want"
  },
  {
    skillName: "Investigation",
    ability: "Intelligence",
    exampleUse: "Find obscure information in books, or deduce how something works"
  },
  {
    skillName: "Medicine",
    ability: "Wisdom",
    exampleUse: "Diagnose an illness, or determine what killed the recently slain"
  },
  {
    skillName: "Nature",
    ability: "Intelligence",
    exampleUse: "Recall lore about terrain, plants, animals, and weather"
  },
  {
    skillName: "Perception",
    ability: "Wisdom",
    exampleUse: "Using a combination of senses, notice something that's easy to miss"
  },
  {
    skillName: "Performance",
    ability: "Charisma",
    exampleUse: "Act, tell a story, perform music, or dance"
  },
  {
    skillName: "Persuasion",
    ability: "Charisma",
    exampleUse: "Honestly and graciously convince someone of something"
  },
  {
    skillName: "Religion",
    ability: "Intelligence",
    exampleUse: "Recall lore about gods, religious rituals, and holy symbols"
  },
  {
    skillName: "Sleight of Hand",
    ability: "Dexterity",
    exampleUse: "Pick a pocket, conceal a handheld object, or perform legerdemain"
  },
  {
    skillName: "Stealth",
    ability: "Dexterity",
    exampleUse: "Escape notice by moving quietly and hiding behind things"
  },
  {
    skillName: "Survival",
    ability: "Wisdom",
    exampleUse: "Follow tracks, forage, find a trail, or avoid natural hazards"
  }
];

export default {skills, skillNames };