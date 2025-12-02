<script lang="ts">
    import type {MouseEventHandler} from "svelte/elements";

    import {accessProfile, profileMessages, selectedMessage, accessProfileMessages, inProgress, editAccount} from "./account.functions.js";
    import "./account.style.css";

    function selectMessage(message: any): MouseEventHandler<HTMLAnchorElement> {
        return (): void => selectedMessage.set(message);
    }
</script>

{#await accessProfile()}
    <main>
        <h1>Loading profile...</h1>
    </main>
{:then profile}
    {#if profile !== "User not found!"}
        <main>
            <div id="profile-page">
                <div id="profile-container">
                    <div id="left-column">
                        <div id="profile-header">
                            <div id="profile-picture" aria-hidden="true">
                                <img src={profile.profilePic} alt={"Profile Picture"}>
                            </div>

                            <div id="profile-meta">
                                <h2>{profile.title}</h2>
                                <h3>{profile.username}</h3>
                            </div>
                        </div>

                        <div id="description-card">
                            <p>{profile.description}</p>

                            <div id="contacts-area">
                                {#await accessProfileMessages()}
                                    <p>Loading private messages...</p>
                                {:then _}
                                    {#each $profileMessages as message}
                                        <div id="message">
                                            {#if message.lastRead < message.content.slice(-1)[0].date}
                                                <strong>●</strong>
                                            {/if}
                                            <a href="/account/messaging" on:mousedown={selectMessage(message.id)}>
                                                <strong>{message.content.slice(-1)[0].from}:</strong> {message.content.slice(-1)[0].content}
                                            </a>
                                        </div>
                                    {/each}
                                {/await}
                            </div>
                        </div>
                    </div>

                    <div id="right-column">
                        <div class="centered-form">
                            <h3>Change Username</h3>
                            <form id="change-username" class="triangle-pattern" on:submit={editAccount} aria-busy={$inProgress}>
                                <label>New Username: <input id="username" name="username" type="text"></label>
                                <label>Confirm Username: <input id="confirm-username" name="confirm-username" type="text"></label>

                                <button type="submit" disabled={$inProgress}>
                                    {#if $inProgress}Loading...{:else}Change Username (Requires Verification){/if}
                                </button>
                            </form>
                        </div>
                        <br/>
                        <div class="centered-form">
                            <h3>Change Password</h3>
                            <form id="change-password" class="triangle-pattern" on:submit={editAccount} aria-busy={$inProgress}>
                                <label>New Password: <input id="password" name="password" type="text"></label>
                                <label>Confirm Password: <input id="confirm-password" name="confirm-password" type="text"></label>

                                <button type="submit" disabled={$inProgress}>
                                    {#if $inProgress}Loading...{:else}Change Password (Requires Verification){/if}
                                </button>
                            </form>
                        </div>
                        <br/>
                        <div class="centered-form">
                            <h3>Change Email</h3>
                            <form id="change-email" class="triangle-pattern" on:submit={editAccount} aria-busy={$inProgress}>
                                <label>New Email: <input id="email" name="email" type="text"></label>
                                <label>Confirm Email: <input id="confirm-email" name="confirm-email" type="text"></label>

                                <button type="submit" disabled={$inProgress}>
                                    {#if $inProgress}Loading...{:else}Change Email (Requires Verification){/if}
                                </button>
                            </form>
                        </div>
                        <br/>
                        <div class="centered-form">
                            <h3>Change Profile Picture</h3>
                            <form id="change-profile-picture" class="triangle-pattern" enctype="multipart/form-data" on:submit={editAccount} aria-busy={$inProgress}>
                                <label for="profilePic"><input name="profilePic" type="file" accept="image/*"></label>

                                <button type="submit" disabled={$inProgress}>
                                    {#if $inProgress}Loading...{:else}Update Profile Picture{/if}
                                </button>
                            </form>
                        </div>
                        <br/>
                        <div class="centered-form">
                            <h3>Change Title</h3>
                            <form id="change-title" class="triangle-pattern" on:submit={editAccount} aria-busy={$inProgress}>
                                <label>New Title: <input id="title" name="title" type="text"></label>

                                <button type="submit" disabled={$inProgress}>
                                    {#if $inProgress}Loading...{:else}Update Title{/if}
                                </button>
                            </form>
                        </div>
                        <br/>
                        <div class="centered-form">
                            <h3>Change Description</h3>
                            <form id="change-description" class="triangle-pattern" on:submit={editAccount} aria-busy={$inProgress}>
                                <label>New Description: <input id="description" name="description" type="text"></label>

                                <button type="submit" disabled={$inProgress}>
                                    {#if $inProgress}Loading...{:else}Update Description{/if}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    {:else}
        <main>
            <h1>Profile not found!</h1>
        </main>
    {/if}
{/await}