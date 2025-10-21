<script>
    import {URL} from "$lib/index.js";
</script>

<main class="create-post-centered">
    <h1>Create an Account</h1>
    <form id="post-create" class="triangle-pattern" enctype="multipart/form-data" method="POST" action="{URL}/user/register">
        <label>Username: <input name="username" type="text"></label>
        <label>Password: <input name="password" type="text"></label>
        <label>Email:    <input name="email"    type="text"></label>

        <button type="submit">Create Account</button>
    </form>
</main>