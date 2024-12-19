import type {DnDClass} from "$lib/DnDClassSchema";

export class DnDCharacterCreator {
  private classes: DnDClass[];

  constructor(classes: DnDClass[]) {
    this.classes = classes;
  }

  getClassList() {
    console.log("found classes: " + this.classes.length)
    return this.classes;
  }
}
