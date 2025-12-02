<script lang="ts">
    import {profileMessages, selectedMessage, accessProfileMessages, inProgress, sendMessage} from "../account.functions.js";
    import "./message.style.css";

    let messageStream: any;

    setInterval(() => {
        accessProfileMessages()
        $profileMessages.forEach(item => {
            if (item.id == $selectedMessage) messageStream = item;
        });
    }, 1000);
</script>

<main id="dm">
    <div id="messageDiv" class="centered-form">
        {#if messageStream}
            <div id="messages">
                {#each messageStream.content as message}
                    {#if messageStream.user === message.from}
                        <p class="other-user">{message.content}</p>
                    {:else}
                        <p class="current-user">{message.content}</p>
                    {/if}
                {/each}
            </div>
        {/if}

        <form id="send-message" class="triangle-pattern" on:submit={sendMessage} aria-busy={$inProgress}>
            <label><input id="message" name="message" type="text" placeholder="Type response here..."></label>

            <button type="submit" disabled={$inProgress}>
                {#if $inProgress}Sending...{:else}Send{/if}
            </button>
        </form>
    </div>
</main>