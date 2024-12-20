<script>
    import {dndSRDStore} from "$lib/stores/dnd5eStore";
    import '../app.css';

    dndSRDStore.fetchClasses();
</script>

<slot/>