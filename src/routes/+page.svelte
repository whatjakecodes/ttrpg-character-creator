<script lang="ts">
  import {dndSRDStore} from '$lib/stores/dnd5eStore';
  import AiCreateForm from "$lib/components/AiCreateForm.svelte";
  import type {DnDAbility, DnDClass} from "$lib/DnDClassSchema";
  import {presentDnDAbility} from "$lib";
  import CharacterCreatorForm from "$lib/components/CharacterCreatorForm.svelte";

  let selectedClass: DnDClass | undefined;

  const handleCharacterClassChange = (createdClass: DnDClass) => {
    selectedClass = createdClass;
  };

  function getSkillChoiceNames(): string {
    if (!selectedClass) return '';
    const options = selectedClass.skill_proficiency_choices.flatMap(c => c.from.options);
    return options.map(o => o.item?.name.replace('Skill: ', '')).join(', ');
  }

  function getSavingThrowProficiencies(forClass: DnDClass): string {
    return forClass.saving_throws.map(st => presentDnDAbility(st.name as DnDAbility)).join(", ");
  }

</script>

<div class="min-h-screen p-4 md:p-8 bg-gray-50">
    <div class="max-w-7xl mx-auto">
        <!-- Main container with responsive layout -->
        <div class="flex flex-col lg:flex-row lg:gap-12">
            <!-- Left side content -->
            <div class="lg:w-1/2 mb-8 lg:mb-0">
                <h1 class="text-3xl font-bold mb-8 text-gray-800">Create a D&D Character</h1>

                <div class="space-y-6">
                    <div class="flex flex-col gap-2">
                        <label for="char-name" class="text-sm font-medium text-gray-700">
                            Character Name
                        </label>
                        <input
                                id="char-name"
                                type="text"
                                class="rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {#if selectedClass}
                        <div class="flex flex-col gap-2">
                            <p>Selected Class: {selectedClass.name}</p>
                        </div>
                        <div class="flex flex-col gap-2">
                            <p>Skill Choices: {getSkillChoiceNames()}</p>
                        </div>
                        <div class="flex flex-col gap-2">
                            <p>Saving Throw Proficiencies: {getSavingThrowProficiencies(selectedClass)}</p>
                        </div>
                    {/if}
                </div>
            </div>

            <!-- Right side form -->
            <div class="lg:w-1/2">
                <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                    {#if $dndSRDStore.loading}
                        <div>Loading classes...</div>
                    {:else if $dndSRDStore.error}
                        <div class="text-red-600">{$dndSRDStore.error}</div>
                    {:else}
                        <CharacterCreatorForm
                                classes={$dndSRDStore.characterCreator.getClassList()}
                                characterClass="{selectedClass}"
                                onCharacterClassChange={handleCharacterClassChange}
                        />
                    {/if}

                </div>

                <p class="p-1 mb-1">Alternatively, generate a class with an LLM:</p>

                <AiCreateForm create={handleCharacterClassChange}/>
            </div>
        </div>
    </div>
</div>
