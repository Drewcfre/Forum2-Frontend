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

    <article>
        <div class="triangle-pattern">
            <div id="thread-info">
                <img src="/images/picklePepsiGuy.png" alt="Placeholder">

                <div>
                    <h2>This is a rather long title</h2>
                    <p>Some content and such. Some more content here and some more here. How will this react to grid?</p>
                </div>
            </div>

            <div id="bottom-thread-select">
                <button on:click={() => { goto("/thread", { replaceState: true }) }}>View Thread</button>
                <button on:click={() => { goto("/report", { replaceState: true }) }}>Report Post</button>
            </div>
        </div>
    </article>

    <article>
        <div class="triangle-pattern">
            <div id="thread-info">
                <img src="/images/picklePepsiGuy.png" alt="Placeholder">

                <div>
                    <h2>This is a rather long title</h2>
                    <p>Some content and such. Some more content here and some more here. How will this react to grid?</p>
                </div>
            </div>

            <div id="bottom-thread-select">
                <button on:click={() => { goto("/thread", { replaceState: true }) }}>View Thread</button>
                <button on:click={() => { goto("/report", { replaceState: true }) }}>Report Post</button>
            </div>
        </div>
    </article>

    <article>
        <div class="triangle-pattern">
            <div id="thread-info">
                <img src="/images/picklePepsiGuy.png" alt="Placeholder">

                <div>
                    <h2>This is a rather long title</h2>
                    <p>Some content and such. Some more content here and some more here. How will this react to grid?</p>
                </div>
            </div>

            <div id="bottom-thread-select">
                <button on:click={() => { goto("/thread", { replaceState: true }) }}>View Thread</button>
                <button on:click={() => { goto("/report", { replaceState: true }) }}>Report Post</button>
            </div>
        </div>
    </article>

    <article>
        <div class="triangle-pattern">
            <div id="thread-info">
                <img src="/images/picklePepsiGuy.png" alt="Placeholder">

                <div>
                    <h2>This is a rather long title</h2>
                    <p>Some content and such. Some more content here and some more here. How will this react to grid?</p>
                </div>
            </div>

            <div id="bottom-thread-select">
                <button on:click={() => { goto("/thread", { replaceState: true }) }}>View Thread</button>
                <button on:click={() => { goto("/report", { replaceState: true }) }}>Report Post</button>
            </div>
        </div>
    </article>

    <article>
        <div class="triangle-pattern">
            <div id="thread-info">
                <img src="/images/picklePepsiGuy.png" alt="Placeholder">

                <div>
                    <h2>This is a rather long title</h2>
                    <p>Some content and such. Some more content here and some more here. How will this react to grid?</p>
                </div>
            </div>

            <div id="bottom-thread-select">
                <button on:click={() => { goto("/thread", { replaceState: true }) }}>View Thread</button>
                <button on:click={() => { goto("/report", { replaceState: true }) }}>Report Post</button>
            </div>
        </div>
    </article>

    <article>
        <div class="triangle-pattern">
            <div id="thread-info">
                <img src="/images/picklePepsiGuy.png" alt="Placeholder">

                <div>
                    <h2>This is a rather long title</h2>
                    <p>Some content and such. Some more content here and some more here. How will this react to grid?</p>
                </div>
            </div>

            <div id="bottom-thread-select">
                <button on:click={() => { goto("/thread", { replaceState: true }) }}>View Thread</button>
                <button on:click={() => { goto("/report", { replaceState: true }) }}>Report Post</button>
            </div>
        </div>
    </article>
</main>