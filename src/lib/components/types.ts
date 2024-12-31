import type {DnDClass} from "$lib/DnDClassSchema";

export interface CharacterCreatorFormProps {
  classes: DnDClass[];
  characterClass: DnDClass | undefined;
  onCharacterClassChange: (newClass: DnDClass) => void;
}