import type {DnDSkillName} from "$lib/srdData/skills";
import type {DnDAbility} from "$lib/srdData/abilities";

export interface DnDBackground {
  index: string;
  name: string;
  ability_score_options: DnDAbility[];
  starting_skill_proficiencies: DnDSkillName[];
  // starting_equipment_options: Choice[];
  // feat: DnDFeat;
}

export const backgrounds: DnDBackground[] = [
  {
    index: "acolyte",
    name: "Acolyte",
    ability_score_options: ["INT", "WIS", "CHA"],
    // feat: 'Magic Initiate',
    starting_skill_proficiencies: [
      "Insight",
      "Religion"
    ],
    // starting_tool_proficiencies: [],
    // starting_equipment_options: [],
  },
  {
    index: "criminal",
    name: "Criminal",
    ability_score_options: ["DEX", "CON", "INT"],
    // feat: "Alert",
    starting_skill_proficiencies: [
      "Sleight of Hand",
      "Stealth"
    ],
    // starting_tool_proficiencies: ["Thieves' Tools"],
    // starting_equipment_options: {
    //   A: ["2 Daggers", "Thieves' Tools", "Crowbar", "2 Pouches", "Traveler's Clothes", "16 GP"],
    //   B: ["50 GP"]
    // }
  },
  {
    index: "sage",
    name: "Sage",
    ability_score_options: ["CON", "INT", "WIS"],
    // feat: "Magic Initiate (Wizard)",
    starting_skill_proficiencies: [
      "Arcana",
      "History"
    ],
    // starting_tool_proficiencies: ["Calligrapher's Supplies"],
    // starting_equipment_options: {
    //   A: ["Quarterstaff", "Calligrapher's Supplies", "Book (history)", "Parchment (8 sheets)", "Robe", "8 GP"],
    //   B: ["50 GP"]
    // }
  },
  {
    index: "soldier",
    name: "Soldier",
    ability_score_options: ["STR", "DEX", "CON"],
    // feat: "Savage Attacker",
    starting_skill_proficiencies: [
      "Athletics",
      "Intimidation"
    ],
    // starting_tool_proficiencies: ["Gaming Set (choose one)"],
    // starting_equipment_options: {
    //   A: ["Spear", "Shortbow", "20 Arrows", "Gaming Set", "Healer's Kit", "Quiver", "Traveler's Clothes", "14 GP"],
    //   B: ["50 GP"]
    // }
  }
];

