<script lang="ts">
    import {generateCaptcha, loggedIn, URL} from "$lib/index.js";

    // TODO: Review image -> WebP -> Base64 conversion.

    async function processImage(file: any) {
        const bitmap = await createImageBitmap(file);

        const { width, height } = bitmap;
        const maxSize = 800;

        let targetWidth = width;
        let targetHeight = height;

        if (width > maxSize || height > maxSize) {
            const ratio = Math.min(maxSize / width, maxSize / height);
            targetWidth = Math.round(width * ratio);
            targetHeight = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext("2d");
        if(ctx) ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);

        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.8));

        const base64: any = await blobToBase64(blob);
        return {
            filename: `${crypto.randomUUID().toString()}.webp`,
            mimeType: "image/webp",
            data: base64.split(",")[1],
        };
    }

    function blobToBase64(blob: any) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }


    let loading = false;

    async function handleSubmit(event: any) {
        event.preventDefault();
        loading = true;

        try {
            let imageData: any;

            const post = event.currentTarget;

            const file = post.image.files[0];
            if(file) imageData = await processImage(file);

            const response = await fetch(`${URL}/anon/create/${post.board.value}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    image: {
                        filename: imageData.filename,
                        mimetype: imageData.mimeType,
                        data: imageData.data,
                    },
                    title: post.title.value,
                    content: post.content.value || "",
                    captcha: post.captcha.value || "",
                }),
            });

            const responseBody = await response.json();
            if (!response.ok) alert(`${response.status}: ${responseBody.error || "Unknown error!"}`);
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

<main class="centered-form">
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

        <label>Title: <input type="text" id="title" name="title" required /></label>

        <div id="post-content">
            <label for="content">Content:</label>
            <textarea id="content" name="content"></textarea>
        </div>

        {#if !$loggedIn}
            <div id="captcha-container"></div>
            <label><input type="text" name="captcha" placeholder="Enter CAPTCHA" required></label>

            {#await setSVG()}{/await}
        {/if}

        <button type="submit">Create Thread</button>
    </form>
</main>