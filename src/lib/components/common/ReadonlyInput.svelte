<script lang="ts">
  const {
    value = '',
    labelText = 'Label',
    inputId = '',
    width = 'w-full'
  } = $props();
</script>

<div class={`${width}`}>
    <input id={inputId} type="text" {value} disabled
           class="w-full text-xl py-2 px-0 bg-transparent text-gray-500 placeholder-gray-400 focus:outline-none disabled:opacity-75"
    />

    <div class="w-full h-px bg-gray-400"></div>

    <label for={inputId} class="text-xs text-gray-500 mt-1">
        {labelText.toUpperCase()}
    </label>
</div>