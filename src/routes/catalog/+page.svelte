<script lang="ts">
    import {threads, getThreads} from "$lib/index.js";
    import {goto} from "$app/navigation";

    getThreads();
</script>

<main id="main-content">
    {#each threads as thread (thread.id)}
        <article>
            <div>
                <h2>{thread.title}</h2>
                <p>{thread.content}</p>
                <button on:click={() => { goto("/thread", { replaceState: true }) }}>View Thread</button>
            </div>
        </article>
    {/each}
</main>