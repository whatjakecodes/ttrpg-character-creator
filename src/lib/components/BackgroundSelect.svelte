<script lang="ts">
  import type {DnDBackground} from "$lib/srdData/backgrounds";

  interface Props {
    onChange: (val: string) => void;
    options: DnDBackground[];
    value?: string;
  }

  let {onChange, options, value}: Props = $props();
  let selected = $derived(options.find(bg => bg.index === value));
</script>

<div class="flex flex-col gap-2">
    <label
            for="background-select"
            class="text-sm font-medium text-gray-700"
    >
        Pick a 5e Background
    </label>

    <select
            id="background-select"
            bind:value
            onchange={(e) => {
                onChange(e.currentTarget.value);
            }}
            class="rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
    >
        <option value={undefined} disabled>Select a background...</option>
        {#each options as option}
            <option value={option.index}>{option.name}</option>
        {/each}
    </select>

    {#if selected}
        <label for="background-skills"
               id="background-skills-label"
               class="text-sm font-medium text-gray-700">{selected.name} Background Skills:</label>
        <div role="group" id="background-skills" aria-labelledby="background-skills-label"
             class="flex flex-wrap gap-4 p-4">
            {#each selected.starting_skill_proficiencies as skill}
                <button
                        disabled
                        class="px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-blue-600 text-white shadow-lg">
                    {skill}
                </button>
            {/each}
        </div>
    {/if}
</div>