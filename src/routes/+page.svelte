<script lang="ts">
  import {dndSRDStore} from '$lib/stores/dnd5eStore';
  import AiCreateForm from "$lib/components/AiCreateForm.svelte";
  import type {DnDClass} from "$lib/DnDClassSchema";
  import CharacterCreatorForm from "$lib/components/CharacterCreatorForm.svelte";
  import {type DnDAbility, presentDnDAbility} from "$lib/srdData/abilities";
  import type {DnDBackground} from "$lib/srdData/backgrounds";
  import type {DnDSkillName} from "$lib/srdData/skills";
  import ReadonlyInput from "$lib/components/common/ReadonlyInput.svelte";
  import type {DnDSpecies} from "$lib/srdData/species";
  import AbilityScoreBox from "$lib/components/common/AbilityScoreBox.svelte";
  import ProficiencyBonusBox from "$lib/components/common/ProficiencyBonusBox.svelte";
  import type {DnDSelection} from "$lib";

  let selection = $state<DnDSelection>({classSkills: []});

  const handleCharacterNameChange = (newName: string) => {
    selection.characterName = newName;
  };

  const handleCharacterClassChange = (newClass: DnDClass) => {
    selection.characterClass = newClass;
    selection.classSkills = [];
  };

  const handleBackgroundChange = (newBackground: DnDBackground) => {
    selection.background = newBackground;
  };

  const handleSpeciesChange = (newSpecies: DnDSpecies) => {
    selection.species = newSpecies;
  };

  const handleClassSkillsChange = (newSkills: DnDSkillName[]) => {
    selection.classSkills = newSkills;
  };

  function getSavingThrowProficiencies(forClass: DnDClass): string {
    return forClass.saving_throws.map(st => presentDnDAbility(st.name as DnDAbility)).join(", ");
  }

  const backgroundSkills: DnDSkillName[] = $derived(selection.background ? selection.background.starting_skill_proficiencies : []);
  const selectedSkills: DnDSkillName[] = $derived(Array.from(new Set([...backgroundSkills, ...selection.classSkills])));
</script>

<div class="min-h-screen p-4 md:p-8 bg-gray-50">
    <div class="max-w-7xl mx-auto">
        <div class="flex flex-col lg:flex-row lg:gap-12">
            <!-- Left side content -->
            <div class="lg:w-1/2">
                <h1 class="text-3xl font-bold mb-8 text-gray-800">Create a D&D Character</h1>
                <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                    {#if $dndSRDStore.loading}
                        <div>Loading classes...</div>
                    {:else if $dndSRDStore.error}
                        <div class="text-red-600">{$dndSRDStore.error}</div>
                    {:else}
                        <CharacterCreatorForm
                                selection={selection}
                                classes={$dndSRDStore.characterCreator.getClassList()}
                                onCharacterNameChange={handleCharacterNameChange}
                                onCharacterClassChange={handleCharacterClassChange}
                                onBackgroundChange={handleBackgroundChange}
                                onSpeciesChange={handleSpeciesChange}
                                onClassSkillsChange={handleClassSkillsChange}
                        />
                    {/if}

                </div>

                <p class="p-1 mb-1">Alternatively, generate a class with an LLM:</p>

                <AiCreateForm create={handleCharacterClassChange}/>
            </div>

            <!-- Right side content -->
            <div class="lg:w-1/2 mb-8 lg:mb-0">
                <h2 class="text-2xl mb-8 text-gray-800">Character Sheet</h2>
                <div class="space-y-6">
                    <div class="flex flex-col gap-1">
                        <ReadonlyInput value={selection.characterName} labelText="Character Name"/>
                    </div>

                    <div class="flex flex-col lg:flex-row lg:items-stretch gap-2">
                        <div class="w-full lg:w-1/2">
                            <div class="flex-col gap-1">
                                <ReadonlyInput inputId="backgroundId" value={selection.background?.name}
                                               labelText="Background"/>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/2">
                            <div class="flex-col gap-1">
                                <ReadonlyInput inputId="classId" value={selection.characterClass?.name} labelText="Class"/>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col lg:flex-row lg:items-stretch gap-2">
                        <div class="w-full lg:w-1/2">
                            <div class="flex-col gap-1">
                                <ReadonlyInput inputId="speciesId" value={selection.species?.name} labelText="Species"/>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/2">
                            <div class="flex-col gap-1">
                                <ReadonlyInput value={""} labelText="Subclass"/>
                            </div>
                        </div>
                    </div>

                    {#if selection.characterClass}
                        <div class="flex flex-col gap-2">
                            <p>Selected Skills: {selectedSkills.join(', ')}</p>
                        </div>

                        <div class="flex flex-col gap-2">
                            <p>Saving Throw Proficiencies: {getSavingThrowProficiencies(selection.characterClass)}</p>
                        </div>
                    {/if}

                    <div class="flex gap-6 justify-evenly">
                        <div class="flex flex-col justify-between">
                            <ProficiencyBonusBox bonus={2}/>
                            <AbilityScoreBox name="STR" modifier={2} score={15}/>
                            <AbilityScoreBox name="DEX" modifier={2} score={14}/>
                            <AbilityScoreBox name="CON" modifier={1} score={13}/>
                        </div>
                        <div class="flex flex-col justify-between">
                            <AbilityScoreBox name="INT" modifier={1} score={12}/>
                            <AbilityScoreBox name="WIS" modifier={0} score={10}/>
                            <AbilityScoreBox name="CHA" modifier={-1} score={8}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
