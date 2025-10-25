<script lang="ts">
    import {URL} from "$lib/index.js";
    import {goto} from "$app/navigation";

    let loading = false;
    let message = '';
    let error = '';

    async function handleSubmit(event: any) {
        event.preventDefault();
        loading = true;
        message = '';
        error = '';

        try {
            const response = await fetch(`${URL}/user/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({
                    username: event.currentTarget.username.value,
                    password: event.currentTarget.password.value,
                    email: event.currentTarget.email.value,
                }),
            });

            const responseBody = await response.json();

            if (!response.ok) alert(`${response.status}: ${responseBody.error || "Unknown error!"}`)
            else alert("A verification email has been sent to confirm your registration.");
        } catch (err: any) {
            error = err?.message || String(err);
        } finally {
            loading = false;
        }
    }
</script>

<main class="create-post-centered">
    <h1>Create an Account</h1>
    <form id="post-create" class="triangle-pattern" on:submit={handleSubmit} aria-busy={loading}>
        <label>Username: <input name="username" type="text"></label>
        <label>Password: <input name="password" type="text"></label>
        <label>Email:    <input name="email"    type="text"></label>

        <button type="submit" disabled={loading}>
            {#if loading}Creating...{:else}Create Account{/if}
        </button>
    </form>

    {#if message}
        <p class="success">{message}</p>
    {/if}
    {#if error}
        <p class="error">{error}</p>
    {/if}
</main>