import type {DnDClass} from "$lib/DnDClassSchema";
import type {DnDBackground} from "$lib/srdData/backgrounds";
import type {DnDSpecies} from "$lib/srdData/species";
import type {DnDSkillName} from "$lib/srdData/skills";

export interface DnDSelection {
  characterName?: string;
  characterClass?: DnDClass;
  background?: DnDBackground;
  species?: DnDSpecies;
  classSkills: DnDSkillName[];
}
