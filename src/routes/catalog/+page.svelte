<script lang="ts">
    import {threadUUID, getThreads, queriedThreads, currentThread} from "$lib/thread.queries.js";
    import {goto} from "$app/navigation";
    import {checkCookieNotice, setCookiesNotice, getCustomizations} from "./catalog.functions.js";
</script>

<main id="main-content" class="">
    {#await checkCookieNotice()}
        <p>Loading...</p>
    {:then cookieNotice}
        {#if !cookieNotice}
            {#if confirm("Enable third-party cookies for Forum2 to function.")}
                {setCookiesNotice()}
            {/if}
        {/if}
    {/await}

    {#await getCustomizations()}
        <p>Loading Customizations...</p>
    {/await}

    {#await getThreads()}
        <p>Loading Threads...</p>
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