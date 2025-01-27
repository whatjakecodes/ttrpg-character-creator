import type {DnDClass} from "$lib/DnDClassSchema";
import type {DnDBackground} from "$lib/srdData/backgrounds";
import type {DnDSkillName} from "$lib/srdData/skills";

export interface CharacterCreatorFormProps {
  characterName: string;
  classes: DnDClass[];
  characterClass: DnDClass | undefined;
  background: DnDBackground | undefined;
  selectedClassSkills: DnDSkillName[];
  onCharacterNameChange: (name: string) => void;
  onCharacterClassChange: (newClass: DnDClass) => void;
  onBackgroundChange: (newBackground: DnDBackground) => void;
  onClassSkillsChange: (newSkills: DnDSkillName[]) => void;
}