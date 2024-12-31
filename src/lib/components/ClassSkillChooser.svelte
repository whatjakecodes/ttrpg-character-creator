<script lang="ts">
  import type {DnDSkillName} from "$lib/srdData/skills";

  type ButtonOption = {
    name: string;
    index: string;
  }

  let {options, onChange, backgroundSkills} = $props<{
    options: ButtonOption[];
    backgroundSkills: DnDSkillName[],
    onChange: (selectedIndices: string[]) => void;
  }>();

  let activeButtons = $state(new Set<number>());

  function handleToggle(index: number): void {
    activeButtons = activeButtons.has(index)
      ? new Set([...activeButtons].filter(x => x !== index))
      : new Set([...activeButtons, index].slice(-2));

    onChange([...activeButtons]);
  }
</script>

<label for="choose-skills" id="choose-skills-label" class="text-sm font-medium text-gray-700">Choose Class Skills:</label>
<div role="group" id="choose-skills" aria-labelledby="choose-skills-label" class="flex flex-wrap gap-4 p-4">
    {#each options as {name, index}}
        <button
                onclick={() => handleToggle(index)}
                disabled={backgroundSkills.includes(name)}
                class="px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:bg-blue-300
        {activeButtons.has(index) || backgroundSkills.includes(name)
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
        >
            {name}
        </button>
    {/each}
</div>