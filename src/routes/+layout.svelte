<script lang="ts">
    import Header from "./Header.svelte";
    import Sidebar from "./Sidebar.svelte";

    let { children } = $props();
</script>

<Header />
<Sidebar />

{@render children()}