<script lang="ts">
  import ClassSelect from "$lib/components/ClassSelect.svelte";
  import type {DnDClass} from "$lib/DnDClassSchema";
  import type {CharacterCreatorFormProps} from "$lib/components/types";
  import {backgrounds} from "$lib/srdData/backgrounds";
  import BackgroundSelect from "$lib/components/BackgroundSelect.svelte";
  import type {DnDSkillName} from "$lib/srdData/skills";
  import Label from "$lib/components/common/Label.svelte";
  import {species} from "$lib/srdData/species";

  const {
    selection,
    classes,
    onCharacterNameChange,
    onCharacterClassChange,
    onBackgroundChange,
    onSpeciesChange,
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
    const newClassSkills = selection.classSkills.includes(skill)
        ? new Set([...selection.classSkills].filter(x => x !== skill))
        : new Set([...selection.classSkills, skill].slice(-2));
    onClassSkillsChange(Array.from(newClassSkills));
  }

  const classSkillChoices = $derived(selection.characterClass ? getSkillChoiceOptions(selection.characterClass) : []);
  const backgroundSkills = $derived(selection.background ? selection.background.starting_skill_proficiencies : []);
  const allActiveSkills = $derived(new Set<DnDSkillName>([...backgroundSkills, ...selection.classSkills]));
  const selectedSpeciesIndex = $derived(selection.species?.index) as string;
</script>

<div class="flex flex-col gap-2 mb-2">
    <label for="char-name" class="text-sm font-medium text-gray-700">
        Character Name
    </label>
    <input
            id="char-name"
            type="text"
            class="rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selection.characterName}
            autocomplete="off"
            oninput={e => onCharacterNameChange(e.currentTarget.value)}
    />
</div>

<div class="flex flex-col gap-2 mb-2">
    <ClassSelect
            options={classes}
            value={selection.characterClass?.index}
            change={handleClassChange}
    />
</div>

{#if selection.characterClass}
    <div class="flex flex-col gap-2 mb-2">
        <label
                for="species-select"
                class="text-sm font-medium text-gray-700"
        >
            Select a species
        </label>
        <select
                id="species-select"
                value={selectedSpeciesIndex}
                class="rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                onchange={(e) => {
                    const specie = species.find(s => s.index === e.currentTarget.value);
                    if (specie) {
                        onSpeciesChange(specie);
                    } else console.error(`Invalid species: ${e.currentTarget.value}`);
                }}
        >
            <option value={undefined} disabled>Select a species...</option>
            {#each species as specie}
                <option value={specie.index}>{specie.name}</option>
            {/each}
        </select>
    </div>
    <div class="flex flex-col gap-2 mb-2">
        <BackgroundSelect
                options={backgrounds}
                value={selection.background?.index}
                onChange={handleBackgroundChange}
        />
    </div>
{/if}

{#if selection.background && selection.characterClass}
    <Label for="choose-skills" id="choose-skills-label" text="Choose 2 {selection.characterClass.name} Class Skills:"/>
    <div role="group" id="choose-skills" aria-labelledby="choose-skills-label" class="flex flex-wrap gap-4 p-4 mb-2">
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
    