import {expect, it} from 'vitest';
import {DnDCharacterCreator} from "../core";
import type {DnDClass} from "$lib/DnDClassSchema";

it('should return class list ', () => {
  expect(new DnDCharacterCreator([]).getClassList()).toHaveLength(0);
  expect(new DnDCharacterCreator([createDndClass(), createDndClass()]).getClassList()).toHaveLength(2);
});

function createDndClass(options?: Partial<DnDClass>): DnDClass {
  return {
    class_levels: "",
    hit_die: 0,
    index: "test-index-default",
    multi_classing: {prerequisites: [], proficiencies: []},
    name: "test-name-default",
    proficiencies: [],
    proficiency_choices: [],
    saving_throws: [],
    starting_equipment: [],
    starting_equipment_options: [],
    subclasses: [],
    url: "",
    ...options
  };
}
