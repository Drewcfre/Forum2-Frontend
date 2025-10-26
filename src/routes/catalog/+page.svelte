<script lang="ts">
    import {threads, threadUUID, getThreads} from "$lib/index.js";
    import {goto} from "$app/navigation";

    getThreads();
</script>

<main id="main-content" class="">
    {#each threads as thread (thread.id)}
        <article>
            <div class="triangle-pattern">
                <div id="thread-info">
                    <img src="/images/picklePepsiGuy.png" alt="Placeholder">

                    <div>
                        <h2>{thread.title}</h2>
                        <p>{thread.content}</p>
                    </div>
                </div>

                <div id="bottom-thread-select">
                    <button on:click={() => { threadUUID.set(thread.UUID); goto("/thread", { replaceState: true }); }}>View Thread</button>
                    <button on:click={() => { threadUUID.set(thread.UUID); goto("/report", { replaceState: true }); }}>Report Post</button>
                </div>
            </div>
        </article>
    {/each}
</main>