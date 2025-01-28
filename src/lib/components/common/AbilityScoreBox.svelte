<script lang="ts">
  import {skills, type DnDSkill} from "$lib/srdData/skills";
  import {type DnDAbility, presentDnDAbility} from "$lib/srdData/abilities";
  import BoxWrapper from "$lib/components/common/BoxWrapper.svelte";

  interface AbilityScoreBoxProps {
    name: DnDAbility,
    modifier: number,
    score: number
  }

  const {
    name = 'STR',
    modifier = 0,
    score = 0
  }: AbilityScoreBoxProps = $props();

  const longName = presentDnDAbility(name);
  const abilitySkills = $derived(skills.filter(s => s.ability === longName));
</script>

<BoxWrapper >
    <h3 class="text-center">{longName.toUpperCase()}</h3>
    <div class="flex justify-evenly  border-b border-gray-400 pb-2">
        <div class="flex flex-col">
            <p class="text-center">
                <span class="number-circle">{modifier > 0 ? '+' : null }{modifier}</span>
            </p>
            <div>
                Modifier
            </div>
        </div>
        <div class="flex flex-col justify-center">
            <p class="text-center">
                <span class="number-box">{score}</span>
            </p>
            <div>
                Score
            </div>
        </div>
    </div>
    <div class="flex flex-col">
        <p class="text-nowrap border-b border-gray-400 pb-2 mb-2">[ ] ____ Saving Throw</p>
        {#each abilitySkills as skill}
            <p class="text-nowrap">[ ] ____ {skill.skillName}</p>
        {/each}
    </div>
</BoxWrapper>


<style>
    .number-circle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        border: 2px solid #000;
        margin: 0 5px;
    }
    .number-box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border: 2px solid #000;
        margin: 0 5px;
    }
</style>