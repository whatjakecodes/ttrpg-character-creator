import type {DnDClass} from "$lib/DnDClassSchema";
import type {DnDBackground} from "$lib/srdData/backgrounds";
import type {DnDSkillName} from "$lib/srdData/skills";
import type {DnDSpecies} from "$lib/srdData/species";
import type {DnDSelection} from "$lib";

export interface CharacterCreatorFormProps {
  selection: DnDSelection;
  classes: DnDClass[];
  onCharacterNameChange: (name: string) => void;
  onCharacterClassChange: (newClass: DnDClass) => void;
  onBackgroundChange: (newBackground: DnDBackground) => void;
  onSpeciesChange: (species: DnDSpecies) => void;
  onClassSkillsChange: (newSkills: DnDSkillName[]) => void;
}