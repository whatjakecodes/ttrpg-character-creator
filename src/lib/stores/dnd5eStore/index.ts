import {writable} from 'svelte/store';
import {DnDCharacterCreator} from "./core";

type DndClassStore = {
  characterCreator: DnDCharacterCreator;
  loading: boolean;
  error: string | null;
}

const createDnd5eSrdStore = () => {
  const {subscribe, set, update} = writable<DndClassStore>({
    characterCreator: new DnDCharacterCreator([]),
    loading: false,
    error: null
  });

  const fetchClasses = async () => {
    update(state => ({...state, loading: true, error: null}));

    try {
      console.log("fetching data... ")
      
      const response = await fetch(`/data/5e-SRD-Classes.json`);
      const data = await response.json();
      console.log("got data: ", {data})
      const creator = new DnDCharacterCreator(data);

      set({
        characterCreator: creator,
        loading: false,
        error: null
      });
    } catch (error) {
      update(state => ({
        ...state,
        loading: false,
        error: 'Failed to load D&D 5e SRD classes'
      }));
    }
  };

  return {
    subscribe,
    fetchClasses
  };
}

export const dndSRDStore = createDnd5eSrdStore();
