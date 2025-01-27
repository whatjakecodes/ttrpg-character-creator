<script lang="ts">
  let {for: forId, id, text} = $props();
</script>

<label for={forId} {id} class="text-sm font-medium text-gray-700">
    {text}
</label>