<script lang="ts">

  import ClassSelect from "$lib/components/ClassSelect.svelte";
  import ClassSkillChooser from "$lib/components/ClassSkillChooser.svelte";
  import {dndSRDStore} from '$lib/stores/dnd5eStore';
  import type {DnDClass} from "$lib/DnDClassSchema";

  interface CharacterCreatorFormProps {
    characterClass: DnDClass | undefined;
    onCharacterClassChange: (newClass: DnDClass) => void;
  }

  const {characterClass, onCharacterClassChange}: CharacterCreatorFormProps = $props();
  
  const handleClassChange = (classIndex: string) => {
    const selectedClass = $dndSRDStore.characterCreator.getClass(classIndex)
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

{#if $dndSRDStore.loading}
    <div>Loading classes...</div>
{:else if $dndSRDStore.error}
    <div class="text-red-600">{$dndSRDStore.error}</div>
{:else}
    <ClassSelect
            options={$dndSRDStore.characterCreator.getClassList()}
            value={characterClass?.index}
            change={handleClassChange}
    />
    {#if characterClass}
        <ClassSkillChooser
                options={getSkillChoiceOptions(characterClass)}
                onChange={handleSkillChoiceChange}
        />
    {/if}
{/if}
