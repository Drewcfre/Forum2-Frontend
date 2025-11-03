<script>
    import {loggedIn, username} from "$lib/index.js";
</script>

<main>
    {#if $loggedIn}
        <h1>Welcome back {username}!</h1>
    {:else}
        <h1>You are not logged in!</h1>
    {/if}
</main>