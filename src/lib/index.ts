// place files you want to import through the `$lib` alias in this folder.
import type {DnDAbility} from './srdData/abilities';

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

export * from './types';