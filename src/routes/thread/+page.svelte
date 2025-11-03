<script>
    import {threadUUID, currentThread, loggedIn} from "$lib/index.js";
    import {goto} from "$app/navigation";
</script>

<main>
    <article>
        <div class="triangle-pattern">
            <div id="thread-info">
                <img src="{$currentThread.url}" alt="">

                <div>
                    <h2>{$currentThread.title}</h2>
                    <p>{$currentThread.content}</p>
                </div>
            </div>

            <div id="bottom-thread-select">
                {#if loggedIn}
                    <form>
                        <input type="range" min="1" max="5" value="3">
                        <button>Rate</button>
                    </form>
                {/if}

                <button on:click={() => { threadUUID.set($currentThread.UUID); goto("/report", { replaceState: true }); }}>Report Post</button>
            </div>
        </div>
    </article>
    {#each $currentThread.replies as reply}
        <article>
            <div class="triangle-pattern">
                <div id="thread-info">
                    <img src="{reply.url}" alt="">

                    <div>
                        <p>{reply.content}</p>
                    </div>
                </div>

                <div id="bottom-thread-select">
                    {#if loggedIn}
                        <form>
                            <input type="range" min="1" max="5" value="3">
                            <button>Rate</button>
                        </form>
                    {/if}

                    <button on:click={() => { threadUUID.set($currentThread.UUID); goto("/report", { replaceState: true }); }}>Report Post</button>
                </div>
            </div>
        </article>
    {/each}
</main>