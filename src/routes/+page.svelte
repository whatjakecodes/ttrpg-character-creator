<script lang="ts">
  import ClassSelect from "$lib/components/ClassSelect.svelte";
  import {dndSRDStore} from '$lib/stores/dnd5eStore/index';
  import AiCreateForm from "$lib/components/AiCreateForm.svelte";
  import type {DnDClass} from "$lib/DnDClassSchema";

  let selectedClass = '';

  const handleClassChange = (selection: string) => {
    selectedClass = selection;
  }

  const onAiClassCreated = (createdClass: DnDClass) => {
    selectedClass = createdClass.name;
  };

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

                    <div class="flex flex-col gap-2">
                        <label for="char-class" class="text-sm font-medium text-gray-700">
                            Class
                        </label>
                        <input
                                id="char-class"
                                type="text"
                                bind:value={selectedClass}
                                class="rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
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
                        <ClassSelect
                                options={$dndSRDStore.classes.map(c => c.index)}
                                value={selectedClass}
                                change={handleClassChange}
                        />
                    {/if}
                </div>

                <p class="p-1 mb-1">Alternatively, generate a class with an LLM:</p>

                <AiCreateForm create={onAiClassCreated}/>
            </div>
        </div>
    </div>
</div>
