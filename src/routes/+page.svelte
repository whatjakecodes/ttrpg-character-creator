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

  let characterName = $state<string>('');
  let selectedClass = $state<DnDClass>();
  let selectedBackground = $state<DnDBackground>();
  let selectedSpecies = $state<DnDSpecies>();
  let selectedClassSkills = $state<DnDSkillName[]>([]);

  const handleCharacterNameChange = (newName: string) => {
    characterName = newName;
  };

  const handleCharacterClassChange = (newClass: DnDClass) => {
    selectedClass = newClass;
    selectedClassSkills = [];
  };

  const handleBackgroundChange = (newBackground: DnDBackground) => {
    selectedBackground = newBackground;
  };

  const handleSpeciesChange = (newSpecies: DnDSpecies) => {
    console.log({newSpecies, selectedSpecies})
    selectedSpecies = newSpecies;
  };

  const handleClassSkillsChange = (newSkills: DnDSkillName[]) => {
    selectedClassSkills = newSkills;
  };

  function getSavingThrowProficiencies(forClass: DnDClass): string {
    return forClass.saving_throws.map(st => presentDnDAbility(st.name as DnDAbility)).join(", ");
  }

  const backgroundSkills: DnDSkillName[] = $derived(selectedBackground ? selectedBackground.starting_skill_proficiencies : []);
  const selectedSkills: DnDSkillName[] = $derived(Array.from(new Set([...backgroundSkills, ...selectedClassSkills])));
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
                                characterName={characterName}
                                classes={$dndSRDStore.characterCreator.getClassList()}
                                characterClass={selectedClass}
                                background={selectedBackground}
                                selectedSpecies={selectedSpecies}
                                selectedClassSkills={selectedClassSkills}
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
                        <ReadonlyInput value={characterName} labelText="Character Name"/>
                    </div>

                    <div class="flex flex-col lg:flex-row lg:items-stretch gap-2">
                        <div class="w-full lg:w-1/2">
                            <div class="flex-col gap-1">
                                <ReadonlyInput inputId="backgroundId" value={selectedBackground?.name}
                                               labelText="Background"/>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/2">
                            <div class="flex-col gap-1">
                                <ReadonlyInput inputId="classId" value={selectedClass?.name} labelText="Class"/>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col lg:flex-row lg:items-stretch gap-2">
                        <div class="w-full lg:w-1/2">
                            <div class="flex-col gap-1">
                                <ReadonlyInput inputId="speciesId" value={selectedSpecies?.name} labelText="Species"/>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/2">
                            <div class="flex-col gap-1">
                                <ReadonlyInput value={""} labelText="Subclass"/>
                            </div>
                        </div>
                    </div>

                    {#if selectedClass}
                        <div class="flex flex-col gap-2">
                            <p>Selected Skills: {selectedSkills.join(', ')}</p>
                        </div>

                        <div class="flex flex-col gap-2">
                            <p>Saving Throw Proficiencies: {getSavingThrowProficiencies(selectedClass)}</p>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>
