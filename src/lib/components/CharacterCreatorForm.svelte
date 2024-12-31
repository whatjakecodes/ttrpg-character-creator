<script lang="ts">

  import ClassSelect from "$lib/components/ClassSelect.svelte";
  import ClassSkillChooser from "$lib/components/ClassSkillChooser.svelte";
  import type {DnDClass} from "$lib/DnDClassSchema";

  interface CharacterCreatorFormProps {
    classes: DnDClass[];
    characterClass: DnDClass | undefined;
    onCharacterClassChange: (newClass: DnDClass) => void;
  }

  const {classes, characterClass, onCharacterClassChange}: CharacterCreatorFormProps = $props();

  const handleClassChange = (classIndex: string) => {
    const selectedClass = classes.findLast(c => c.index === classIndex);
    onCharacterClassChange(selectedClass!);
  }

  function getSkillChoiceOptions(forClass: DnDClass): { name: string, index: string }[] {
    return forClass.skill_proficiency_choices
      .flatMap(c => c.from.options)
      .filter(o => o.item != undefined)
      .map(o => {
        return {
          name: o.item!.name.replace('Skill: ', ''),
          index: o.item!.index
        }
      });
  }

  let selectedSkillIndicies: string[];
  const handleSkillChoiceChange = (skillIndices: string[]) => {
    selectedSkillIndicies = skillIndices;
  }
</script>

<ClassSelect
        options={classes}
        value={characterClass?.index}
        change={handleClassChange}
/>
{#if characterClass}
    <ClassSkillChooser
            options={getSkillChoiceOptions(characterClass)}
            onChange={handleSkillChoiceChange}
    />
{/if}
