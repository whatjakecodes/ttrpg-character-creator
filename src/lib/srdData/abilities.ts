export type DnDAbility = 'CON' | 'STR' | 'DEX' | 'WIS' | 'INT' | 'CHA';
export type DnDAbilityName = 'Constitution' | 'Strength' | 'Dexterity' | 'Wisdom' | 'Intelligence' | 'Charisma';

export const abilityLookup: Record<DnDAbility, DnDAbilityName> = {
  CHA: "Charisma",
  CON: "Constitution",
  DEX: "Dexterity",
  INT: "Intelligence",
  STR: "Strength",
  WIS: "Wisdom"
};

export function presentDnDAbility(name: DnDAbility) {
  return abilityLookup[name];
}

export function presentModifier(score: number): string {
  if (score >= 0) {
    return `+${score}`;
  }
  return `-${score}`;
}