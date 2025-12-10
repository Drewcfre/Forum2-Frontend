<script lang="ts">
    import {loggedIn} from "$lib/index.js";
    import {threadUUID, currentThread, currentBoard} from "$lib/thread.queries.js";
    import {goto} from "$app/navigation";

    import {generateCaptcha, URL, processImage} from "$lib/index.js";
    import {get} from "svelte/store";
    import {accessOtherProfile} from "../account/account.functions.js";

    let loading = false;

    async function handleSubmit(event: any) {
        event.preventDefault();
        loading = true;

        try {
            let imageData: any;

            const post = event.currentTarget;

            const file = post.image.files[0];
            if(file) imageData = await processImage(file);

            const response = await fetch(`${URL}/anon/reply/${get(currentBoard)}/${get(threadUUID)}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    image: {
                        filename: imageData.filename,
                        mimetype: imageData.mimeType,
                        data: imageData.data,
                    },
                    content: (post.content) ? post.content.value : "",
                    captcha: (post.captcha) ? post.captcha.value : "",
                }),
            });

            const responseBody = await response.json();
            if (!response.ok) alert(`${response.status}: ${responseBody.error || "Unknown error!"}`);
            else alert("Reply created! Refresh page to see your reply.");
        }
        catch (err: any) { alert(err?.message || String(err)); }
        finally { loading = false; }
    }

    async function setSVG() {
        const svg = await generateCaptcha();

        let element = document.getElementById('captcha-container');
        if(element != null) element.innerHTML = svg;
    }

    async function rateThread() {

    }
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
                    <form on:submit={rateThread}>
                        <input type="range" min="1" max="5" value="3">
                        <button>Rate</button>
                    </form>
                {/if}

                <button on:click={() => { threadUUID.set($currentThread.UUID); goto("/report", { replaceState: true }); }}>Report Post</button>
                <button on:click={() => { accessOtherProfile($currentThread.username); goto("/account", { replaceState: true }); }}>Visit Account</button>
            </div>
        </div>
    </article>
    <article>
        <div class="triangle-pattern">
            <form id="post-create" class="triangle-pattern" enctype="multipart/form-data" on:submit={handleSubmit} aria-busy={loading}>
                <label for="image"><input name="image" type="file" accept="image/*"></label>

                <div id="post-content">
                    <label for="content">Content:</label>
                    <input id="content" name="content" />
                </div>

                {#if !$loggedIn}
                    <div id="captcha-container"></div>
                    <label><input type="text" name="captcha" placeholder="Enter CAPTCHA" required></label>

                    {#await setSVG()}{/await}
                {/if}

                <button type="submit">Reply</button>
            </form>
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