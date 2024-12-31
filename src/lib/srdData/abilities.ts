export type DnDAbility = 'CON' | 'STR' | 'DEX' | 'WIS' | 'INT' | 'CHA';

export function presentDnDAbility(name: DnDAbility) {
  const lookup: Record<DnDAbility, string> = {
    CHA: "Charisma",
    CON: "Constitution",
    DEX: "Dexterity",
    INT: "Intelligence",
    STR: "Strength",
    WIS: "Wisdom"
  };
  return lookup[name];
}