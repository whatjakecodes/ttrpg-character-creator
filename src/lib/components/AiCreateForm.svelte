<script lang="ts">

  import {createClassFromDescription} from "$lib/CharacterCreatorClient.js";
  import type {DnDClass} from "$lib/DnDClassSchema";

  interface Props {
    create: (createdClass: DnDClass) => void;
  }

  let {create}: Props = $props();

  let apiKey = $state('');
  let userInput = $state('');
  let loading = $state(false);
  let errorMessage = $state('');

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    loading = true;
    errorMessage = '';
    try {
      const createdClass = await createClassFromDescription(userInput, apiKey);
      create(createdClass)
    } catch (e) {
      if (e instanceof Error) {
        errorMessage = e.message;
      }
    } finally {
      loading = false;
    }
  }
</script>

<form
        onsubmit={handleSubmit}
        class="bg-white rounded-xl shadow-md p-6"
>
    <div class="space-y-6">
        <div class="flex flex-col gap-2">
            <label for="apiKey" class="text-sm font-medium text-gray-700">
                API Key
            </label>
            <input
                    type="password"
                    id="apiKey"
                    bind:value={apiKey}
                    placeholder="Enter your Anthropic API key"
                    class="rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>

        <div class="flex flex-col gap-2">
            <label for="message" class="text-sm font-medium text-gray-700">
                Describe your character
            </label>
            <textarea
                    id="message"
                    bind:value={userInput}
                    rows="4"
                    placeholder="Enter a character class description"
                    class="rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
        </div>

        <button
                type="submit"
                disabled={loading}
                class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
            {loading ? 'Sending...' : 'Generate Class'}
        </button>

        {#if errorMessage.trim().length > 0}
            <div class="text-red-600 font-medium bg-red-50 p-4 rounded-lg">
                Error: {errorMessage}
            </div>
        {/if}
    </div>
</form>