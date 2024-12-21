import type {DnDClass} from "$lib/DnDClassSchema";

export class DnDCharacterCreator {
  private classes: DnDClass[];

  constructor(classes: DnDClass[]) {
    this.classes = classes;
  }

  getClassList() {
    return this.classes;
  }

  getClass(classIndex: string) {
    return this.classes.findLast(c => c.index === classIndex);
  }
}
