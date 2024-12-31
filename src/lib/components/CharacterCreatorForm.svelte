<script lang="ts">

  import ClassSelect from "$lib/components/ClassSelect.svelte";
  import ClassSkillChooser from "$lib/components/ClassSkillChooser.svelte";
  import type {DnDClass} from "$lib/DnDClassSchema";
  import type {CharacterCreatorFormProps} from "$lib/components/types";
  import {backgrounds} from "$lib/srdData/backgrounds";
  import BackgroundSelect from "$lib/components/BackgroundSelect.svelte";
  import type {DnDSkillName} from "$lib/srdData/skills";

  const {
    classes,
    characterClass,
    background,
    onCharacterClassChange,
    onBackgroundChange,
    onSkillsChange
  }: CharacterCreatorFormProps = $props();

  const handleClassChange = (classIndex: string) => {
    const selectedClass = classes.findLast(c => c.index === classIndex);
    onCharacterClassChange(selectedClass!);

    const selectedBackground = backgrounds.findLast(b => b.index === background?.index);
    if (selectedBackground) {
      onSkillsChange([...selectedBackground.starting_skill_proficiencies]);
    }
  }

  const handleBackgroundChange = (backgroundIndex: string) => {
    const selectedBackground = backgrounds.findLast(b => b.index === backgroundIndex);
    if (selectedBackground) {
      const backgroundSkills = selectedBackground.starting_skill_proficiencies;
      onBackgroundChange(selectedBackground!);
      onSkillsChange([...backgroundSkills]);
    }
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

  const handleSkillChoiceChange = (skillIndices: string[]) => {
    const classSkills = getSkillChoiceOptions(characterClass!)
      .filter(s => skillIndices.includes(s.index))
      .map(s => s.name) as DnDSkillName[];

    const selectedBackground = backgrounds.findLast(b => b.index === background?.index);
    const newSkills: DnDSkillName[] = [];
    if (selectedBackground) {
      newSkills.push(...(selectedBackground.starting_skill_proficiencies));
    }
    
    newSkills.push(...classSkills);
    onSkillsChange(newSkills);
  }
</script>

<ClassSelect
        options={classes}
        value={characterClass?.index}
        change={handleClassChange}
/>

{#if characterClass}
    <BackgroundSelect
            options={backgrounds}
            value={background?.index}
            onChange={handleBackgroundChange}
    />
{/if}

{#if background && characterClass}
    <ClassSkillChooser
            options={getSkillChoiceOptions(characterClass)}
            backgroundSkills={background.starting_skill_proficiencies}
            onChange={handleSkillChoiceChange}
    />
{/if}
    