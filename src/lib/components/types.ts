import type {DnDClass} from "$lib/DnDClassSchema";
import type {DnDBackground} from "$lib/srdData/backgrounds";

export interface CharacterCreatorFormProps {
  classes: DnDClass[];
  characterClass: DnDClass | undefined;
  background: DnDBackground | undefined;
  onCharacterClassChange: (newClass: DnDClass) => void;
  onBackgroundChange: (newBackground: DnDBackground) => void;
}