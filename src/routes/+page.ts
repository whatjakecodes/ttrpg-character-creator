import type {CharacterCreatorSettings} from '$lib/types';

export const load = (() => {
  const settings: CharacterCreatorSettings = {
    characterClasses: [
      {name: 'cleric'},
      {name: 'druid'},
      {name: 'paladin'}],
  };

  return {
    settings,
  };
});
