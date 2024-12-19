import {afterEach, describe, expect, it, vi} from 'vitest';
import {dndSRDStore} from '../index';
import {get} from "svelte/store";

describe('DnD5eStore', () => {
  it('should provide classes after fetch', async () => {
    const testData = [{
      name: 'test-name-1',
    }, {
      name: 'test-name-2',
    }];
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(testData)
    })
    vi.stubGlobal('fetch', mockFetch);

    await dndSRDStore.fetchClasses();

    expect(get(dndSRDStore).characterCreator.getClassList()).toHaveLength(2);
  });

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.resetAllMocks()
  })
});


 