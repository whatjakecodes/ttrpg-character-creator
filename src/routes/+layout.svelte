<script>
    import {onMount} from 'svelte';
    import {dndSRDStore} from "$lib/stores/dnd5eStore/";
    import '../app.css';

    onMount(() => {
        dndSRDStore.fetchClasses();
    });
</script>

<slot/>