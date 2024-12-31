<script lang="ts">

  import ClassSelect from "$lib/components/ClassSelect.svelte";
  import ClassSkillChooser from "$lib/components/ClassSkillChooser.svelte";
  import type {DnDClass} from "$lib/DnDClassSchema";
  import type {CharacterCreatorFormProps} from "$lib/components/types";
  import {backgrounds} from "$lib/srdData/backgrounds";
  import BackgroundSelect from "$lib/components/BackgroundSelect.svelte";

  const {
    classes,
    characterClass,
    background,
    onCharacterClassChange,
    onBackgroundChange,
  }: CharacterCreatorFormProps = $props();

  const handleClassChange = (classIndex: string) => {
    const selectedClass = classes.findLast(c => c.index === classIndex);
    onCharacterClassChange(selectedClass!);
  }
  const handleBackgroundChange = (backgroundIndex: string) => {
    const selectedBackground = backgrounds.findLast(b => b.index === backgroundIndex);
    onBackgroundChange(selectedBackground!);
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
    <BackgroundSelect
            options={backgrounds}
            value={background?.index}
            onChange={handleBackgroundChange}
    />
{/if}
