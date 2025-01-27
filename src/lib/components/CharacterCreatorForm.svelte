<script lang="ts">
  import ClassSelect from "$lib/components/ClassSelect.svelte";
  import type {DnDClass} from "$lib/DnDClassSchema";
  import type {CharacterCreatorFormProps} from "$lib/components/types";
  import {backgrounds} from "$lib/srdData/backgrounds";
  import BackgroundSelect from "$lib/components/BackgroundSelect.svelte";
  import type {DnDSkillName} from "$lib/srdData/skills";
  import Label from "$lib/components/common/Label.svelte";

  const {
    classes,
    characterClass,
    background,
    selectedClassSkills,
    onCharacterClassChange,
    onBackgroundChange,
    onClassSkillsChange
  }: CharacterCreatorFormProps = $props();

  const handleClassChange = (classIndex: string) => {
    const selectedClass = classes.findLast(c => c.index === classIndex);
    onCharacterClassChange(selectedClass!);
  }

  const handleBackgroundChange = (backgroundIndex: string) => {
    const selectedBackground = backgrounds.findLast(b => b.index === backgroundIndex);
    if (selectedBackground) {
      onBackgroundChange(selectedBackground!);
    }
  }

  function getSkillChoiceOptions(forClass: DnDClass): DnDSkillName[] {
    return forClass.skill_proficiency_choices
        .flatMap(c => c.from.options)
        .filter(o => o.item != undefined)
        .map(o => {
          return o.item!.name.replace('Skill: ', '') as DnDSkillName
        });
  }

  function onToggleClassSkill(skill: DnDSkillName): void {
    const newClassSkills = selectedClassSkills.includes(skill)
        ? new Set([...selectedClassSkills].filter(x => x !== skill))
        : new Set([...selectedClassSkills, skill].slice(-2));
    onClassSkillsChange(Array.from(newClassSkills));
  }

  const classSkillChoices = $derived(characterClass ? getSkillChoiceOptions(characterClass) : []);
  const backgroundSkills = $derived(background ? background.starting_skill_proficiencies : []);
  const allActiveSkills = $derived(new Set<DnDSkillName>([...backgroundSkills, ...selectedClassSkills]));
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
    <Label for="choose-skills" id="choose-skills-label" text="Choose 2 {characterClass.name} Class Skills:"/>
    <div role="group" id="choose-skills" aria-labelledby="choose-skills-label" class="flex flex-wrap gap-4 p-4">
        {#each classSkillChoices as skillName}
            <button
                    onclick={() => onToggleClassSkill(skillName)}
                    disabled={backgroundSkills.includes(skillName)}
                    aria-pressed={allActiveSkills.has(skillName)}
                    class="px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:bg-blue-300
                            {allActiveSkills.has(skillName) ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}">
                {skillName}
            </button>
        {/each}
    </div>

{/if}
    