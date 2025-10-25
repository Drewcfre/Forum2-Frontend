<script lang="ts">
    import {loggedIn, replyUUID, selfURL, threadUUID, URL} from "$lib/index.js";

    let loading = false;

    async function handleSubmit(event: any) {
        event.preventDefault();
        loading = true;

        let link = `${selfURL}/thread/${threadUUID}`;

        try {
            const response = await fetch(`${URL}/create/Admin`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    title: `${link} (${replyUUID || "thread"}) -- ${event.currentTarget.title.value}`,
                    content: event.currentTarget.content.value,
                }),
            });

            const responseBody = await response.json();
            if (!response.ok) alert(`${response.status}: ${responseBody.error || "Unknown error!"}`)
            else alert("Report submitted. Thank you for helping to make our forum safer!");
        }
        catch (err: any) { alert(err?.message || String(err)); }
        finally { loading = false; }
    }
</script>

<main class="create-post-centered report-correct">
    {#if !loggedIn}
        <h1>Only verified accounts can submit reports.</h1>
    {:else}
        <h1>Report Form</h1>

        <form id="report-create" class="triangle-pattern" enctype="multipart/form-data" on:submit={handleSubmit} aria-busy={loading}>
            <label>Reason: <input type="text" name="title" required /></label>
            <div id="post-content">
                <label for="content">Details:</label>
                <textarea id="content" name="content"></textarea>
            </div>

            <button type="submit">Create Report</button>
        </form>
    {/if}
</main>