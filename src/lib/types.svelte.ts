import type {DnDClass} from "$lib/DnDClassSchema";
import type {DnDBackground} from "$lib/srdData/backgrounds";
import type {DnDSpecies} from "$lib/srdData/species";
import type {DnDSkill, DnDSkillName} from "$lib/srdData/skills";
import {skills} from "$lib/srdData/skills";
import {abilityLookup, type DnDAbility, type DnDAbilityName} from "$lib/srdData/abilities";

export class DnDSelection {
  characterName?: string = $state();
  characterClass?: DnDClass = $state();
  background?: DnDBackground = $state();
  species?: DnDSpecies = $state();
  classSkills: DnDSkillName[] = $state([]);
  backgroundAbilities = $state<DnDAbility[]>([]);
  // backgroundAbilities = $state<DnDAbility[]>(['STR', 'STR', 'CHA']);
  proficiencyBonus: number = 2;

  skills = $derived.by(this.getSkills);
  skillNames = $derived.by(this.getSkillNames);

  private baseScores = $state<Record<DnDAbilityName, number>>({
    Charisma: 10,
    Constitution: 10,
    Dexterity: 10,
    Intelligence: 10,
    Strength: 10,
    Wisdom: 10
  });

  constructor(
      characterName?: string,
      characterClass?: DnDClass,
      background?: DnDBackground,
      species?: DnDSpecies,
      classSkills: DnDSkillName[] = []
  ) {
    this.characterName = characterName;
    this.characterClass = characterClass;
    this.background = background;
    this.species = species;
    this.classSkills = classSkills;
  }

  getSkills(): DnDSkill[] {
    const skillNames = this.getSkillNames();
    return skills.filter(skill => skillNames.includes(skill.skillName));
  }

  getSkillNames(): DnDSkillName[] {
    const backgroundSkills = this.background ? this.background.starting_skill_proficiencies : [];
    return [...this.classSkills, ...backgroundSkills];
  }

  isSavingThrowProficient(ability: DnDAbility): boolean {
    return !!this.characterClass && this.characterClass.saving_throws.findIndex(st => st.name === ability) > -1;
  }

  getSavingThrowProficiencyBonus(ability: DnDAbility): number {
    let bonus = 0;
    if (this.isSavingThrowProficient(ability)) {
      bonus += this.proficiencyBonus;
    }
    return bonus;
  }

  isSkillProficient(skillName: DnDSkillName): boolean {
    if (this.classSkills.includes(skillName)) {
      return true;
    }

    if (this.background && this.background.starting_skill_proficiencies.includes(skillName)) {
      return true;
    }

    return false;
  }

  getAbilityScore(ability: DnDAbility): number {
    const baseScore = this.baseScores[abilityLookup[ability]];
    const backgroundBonus = this.backgroundAbilities.filter(a => a === ability).length;
    return baseScore + backgroundBonus;
  }

  getAbilityModifier(ability: DnDAbility): number {
    const score = this.getAbilityScore(ability);
    const modifier = Math.floor((score - 10) / 2);
    return modifier;
  }

  getSkillModifier(skill: DnDSkill): number {
    const abilityModifier = this.getAbilityModifier(skill.abilityShort);
    if (this.isSkillProficient(skill.skillName)) {
      return this.proficiencyBonus + abilityModifier;
    }
    return abilityModifier;
  }
}
