<script lang="ts">
  import BoxWrapper from "$lib/components/common/BoxWrapper.svelte";
  import {presentModifier} from "$lib/srdData/abilities";

  const {
    bonus = 0,
  } = $props();

</script>

<BoxWrapper>
    <h3 class="text-center text-nowrap">PROFICIENCY BONUS</h3>
    <p class="text-center mt-4"><span class="number-circle">{presentModifier(bonus)}</span></p>
</BoxWrapper>

<style>
    .number-circle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid #000;
        margin: 0 5px;
    }
</style>