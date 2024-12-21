import {expect, it} from 'vitest';
import {DnDCharacterCreator} from "../core";
import {createDndClass} from "$lib/stores/dnd5eStore/__tests__/testDataUtil";

it('should return class list ', () => {
  expect(new DnDCharacterCreator([]).getClassList()).toHaveLength(0);
  expect(new DnDCharacterCreator([createDndClass(), createDndClass()]).getClassList()).toHaveLength(2);
});

