<script>
    import {generateCaptcha, loggedIn, username} from "$lib/index.js";
</script>

<main>
    {#if loggedIn}
        <h1>Welcome back {username}!</h1>
    {:else}
        <h1>Login</h1>
        <form id="login-form" class="triangle-pattern" enctype="multipart/form-data" method="POST" action="/anon/catalog">
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

                {#await generateCaptcha() then svg}
                    {#if svg}{setSVG(svg)}{/if}
                {/await}
            {/if}

            <button type="submit">Create Thread</button>
        </form>
    {/if}
</main>