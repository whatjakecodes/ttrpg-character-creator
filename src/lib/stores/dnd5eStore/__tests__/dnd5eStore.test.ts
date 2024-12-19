import {afterEach, describe, expect, it, vi} from 'vitest';
import {dndSRDStore} from '../index';
import {get} from "svelte/store";
import type {DnDClass} from "$lib/DnDClassSchema";

describe('DnD5eStore', () => {
  it('should provide class data', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true, 
      json: () => Promise.resolve(testClasses)
    })
    vi.stubGlobal('fetch', mockFetch);

    await dndSRDStore.fetchClasses();

    expect(get(dndSRDStore).classes).toHaveLength(2);
  });

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.resetAllMocks()
  })
});

const testClasses : DnDClass[] = [{
  index: '',
  name: 'test-name-1',
  hit_die: 0,
  proficiency_choices: [],
  proficiencies: [],
  saving_throws: [],
  starting_equipment: [],
  starting_equipment_options: [],
  class_levels: '',
  multi_classing: {
    prerequisites: [],
    proficiencies: []
  },
  subclasses: [],
  url: ''
}, {
  index: '',
  name: 'test-name-2',
  hit_die: 0,
  proficiency_choices: [],
  proficiencies: [],
  saving_throws: [],
  starting_equipment: [],
  starting_equipment_options: [],
  class_levels: '',
  multi_classing: {
    prerequisites: [],
    proficiencies: []
  },
  subclasses: [],
  url: ''
}] 