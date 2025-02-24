<script lang="ts">
  import {skills} from "$lib/srdData/skills";
  import {type DnDAbility, presentDnDAbility, presentModifier} from "$lib/srdData/abilities";
  import BoxWrapper from "$lib/components/common/BoxWrapper.svelte";
  import type {DnDSelection} from "$lib";

  interface AbilityScoreBoxProps {
    name: DnDAbility,
    selection: DnDSelection,
  }

  const {
    name = 'STR',
    selection
  }: AbilityScoreBoxProps = $props();

  const longName = presentDnDAbility(name);
  const abilitySkills = $derived(skills.filter(s => s.ability === longName));
</script>

<BoxWrapper>
    <h3 class="text-center">{longName.toUpperCase()}</h3>
    <div class="flex justify-evenly  border-b border-gray-400 pb-2">
        <div class="flex flex-col">
            <p class="text-center">
                <span class="number-circle">{presentModifier(selection.getAbilityModifier(name))}</span>
            </p>
            <div>
                Modifier
            </div>
        </div>
        <div class="flex flex-col justify-center">
            <p class="text-center">
                <span class="number-box">{selection.getAbilityScore(name)}</span>
            </p>
            <div>
                Score
            </div>
        </div>
    </div>
    <div class="flex flex-col">
        <p class="text-nowrap border-b border-gray-400 pb-2 mb-2">
            <span>{selection.isSavingThrowProficient(name) ? `[x]` : `[ ]`}</span>
            <span>{presentModifier(selection.getSavingThrowProficiencyBonus(name))}</span>
            <span>Saving Throw</span>
        </p>
        {#each abilitySkills as skill}
            <p class="text-nowrap">
                <span>{selection.isSkillProficient(skill.skillName) ? `[x]` : `[ ]`}</span>
                <span>{presentModifier(selection.getSkillModifier(skill))}</span>
                <span>{skill.skillName}</span>
            </p>
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