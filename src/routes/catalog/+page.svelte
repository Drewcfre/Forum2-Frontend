<script lang="ts">
    import {threadUUID, getThreads, queriedThreads, currentThread} from "$lib/index.js";
    import {goto} from "$app/navigation";
    import {selfQuery} from "$lib/index.js";
</script>

{#key $queriedThreads}
    <main id="main-content" class="">
        {#await (!selfQuery) ? getThreads() : selfQuery.set(false)}
            <p>Loading...</p>
        {:then _}
            {#each $queriedThreads as thread}
                <article>
                    <div class="triangle-pattern">
                        <div id="thread-info">
                            <img src="{thread.url}" alt="">

                            <div>
                                <h2>{thread.title}</h2>
                                <p>{thread.content}</p>
                            </div>
                        </div>

                        <div id="bottom-thread-select">
                            <button on:click={() => { threadUUID.set(thread.UUID); currentThread.set(thread); goto("/thread", { replaceState: true }); }}>View Thread</button>
                            <button on:click={() => { threadUUID.set(thread.UUID); goto("/report", { replaceState: true }); }}>Report Post</button>
                        </div>
                    </div>
                </article>
            {/each}
        {/await}
    </main>
{/key}