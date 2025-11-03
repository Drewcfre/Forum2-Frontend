<script lang="ts">
    import {URL, loggedIn} from "$lib/index.js";
    import {goto} from "$app/navigation";

    let loading = false;

    async function handleSubmit(event: any) {
        event.preventDefault();
        loading = true;

        try {
            const response = await fetch(`${URL}/user/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({
                    username: event.currentTarget.username.value,
                    password: event.currentTarget.password.value,
                }),
            });

            const responseBody = await response.json();

            if (!response.ok) alert(`${response.status}: ${responseBody.error || "Unknown error!"}`);
            else {
                alert("Successfully logged in!");
                loggedIn.set(true);
                await goto("/", {replaceState: true});
            }
        }
        catch (err: any) { alert(err?.message || String(err)); }
        finally { loading = false; }
    }
</script>

<main class="centered-form signup-correct">
    <h1>Login</h1>
    <form id="post-create" class="triangle-pattern" on:submit={handleSubmit} aria-busy={loading}>
        <label>Username: <input name="username" type="text"></label>
        <label>Password: <input name="password" type="text"></label>

        <button type="submit" disabled={loading}>
            {#if loading}Logging in...{:else}Login{/if}
        </button>
    </form>
</main>