<script lang="ts">
  import type {DnDBackground} from "$lib/srdData/backgrounds";

  interface Props {
    onChange: (val: string) => void;
    options: DnDBackground[];
    value?: string;
  }

  let {onChange, options, value}: Props = $props();

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
</div>