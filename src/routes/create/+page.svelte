<script lang="ts">
    import {generateCaptcha, loggedIn, URL} from "$lib/index.js";

    let loading = false;

    async function handleSubmit(event: any) {
        event.preventDefault();
        loading = true;

        try {
            const formData = new FormData(event.currentTarget);

            const response = await fetch(`${URL}/create/${event.currentTarget.board.value}`, {
                method: "POST",
                body: formData,
            });

            const responseBody = await response.json();
            if (!response.ok) alert(`${response.status}: ${responseBody.error || "Unknown error!"}`)
            else alert("Thread created! It may take a few minutes to become visible on the board.");
        }
        catch (err: any) { alert(err?.message || String(err)); }
        finally { loading = false; }
    }

    async function setSVG() {
        const svg = await generateCaptcha();

        let element = document.getElementById('captcha-container');
        if(element != null) element.innerHTML = svg;
    }
</script>

<main class="create-post-centered">
    <h1>Create a New Thread</h1>

    <form id="post-create" class="triangle-pattern" enctype="multipart/form-data" on:submit={handleSubmit} aria-busy={loading}>
        <label for="image"><input name="image" type="file" accept="image/*"></label>

        <label>
            Board: <select name="board">
                <option value="Main">Main</option>
                <option value="Anime">Anime</option>
                <option value="Cooking">Cooking</option>
                <option value="Fitness">Fitness</option>
                <option value="Technology">Technology</option>
                <option value="Vidya">Video Games</option>
            </select>
        </label>

        <label>Title: <input type="text" name="title" required /></label>

        <div id="post-content">
            <label for="content">Content:</label>
            <textarea id="content" name="content"></textarea>
        </div>

        {#if !loggedIn}
            <div id="captcha-container"></div>
            <label><input type="text" name="captcha" placeholder="Enter CAPTCHA" required></label>

            {#await setSVG()}{/await}
        {/if}

        <button type="submit">Create Thread</button>
    </form>
</main>