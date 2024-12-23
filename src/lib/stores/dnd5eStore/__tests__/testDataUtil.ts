import type {APIReference, ChoiceOption, ChoiceSet, DnDAbility, DnDClass} from "$lib/DnDClassSchema";
import v from 'voca';

export function createDndClass(options?: Partial<DnDClass>): DnDClass {
  return {
    class_levels: "",
    hit_die: 0,
    index: "test-index-default",
    multi_classing: {prerequisites: [], proficiencies: []},
    name: "test-name-default",
    proficiencies: [],
    skill_proficiency_choices: [],
    tool_proficiency_choices: [],
    saving_throws: [],
    starting_equipment: [],
    starting_equipment_options: [],
    subclasses: [],
    url: "",
    ...options
  };
}

export function createSkillProficiencyChoices(...skillNames: string[]): ChoiceSet[] {
  return [{
    choose: 2,
    type: 'proficiencies',
    desc: `Choose two from ${skillNames.join(', ')}`,
    from: {
      option_set_type: 'options_array',
      options: skillNames.map(skillName => createSkillProficiencyChoiceOption({
        item: {
          index: v.kebabCase(skillName),
          name: `Skill: ${skillName}`,
          url: `/api/proficiencies/skill-${v.kebabCase(skillName)}`
        },
      }))
    },
  }];
}

export function createSkillProficiencyChoice(options?: Partial<ChoiceSet>): ChoiceSet {
  return {
    desc: "Choose two from Test Skill 1, Test Skill 2",
    choose: 2,
    type: "proficiencies",
    from: {
      option_set_type: "options_array",
      options: [
        createSkillProficiencyChoiceOption(),
        createSkillProficiencyChoiceOption(),
      ]
    },
    ...options
  };
}

export function createSkillProficiencyChoiceOption(options?: Partial<ChoiceOption>): ChoiceOption {
  const num = getRandomInt(1, 100);
  return {
    option_type: "reference",
    item: {
      index: `skill-test-skill-${num}`,
      name: `Skill: Test Skill ${num}`,
      url: `/api/proficiencies/skill-test-skill-${num}`
    },
    ...options
  };
}

export function createSavingThrowProficiencies(...abilities: DnDAbility[]): APIReference[] {
  return abilities.map(ability => {
    return {
      index: ability.toLowerCase(),
      name: ability,
      url: `/api/ability-scores/${ability.toLowerCase()}`
    }
  })
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}