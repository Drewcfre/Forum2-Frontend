<script lang="ts">
    // TODO: Ensure all sort methods are functional.

    import {
        changeBoard, checkLogin, endDate, isAdmin,
        restrictThreadDate, searchThreads, sortThreads, startDate
    } from "$lib/index.js";
    import type {ChangeEventHandler} from "svelte/elements";

    function getSelectValue() {
        const select: HTMLSelectElement = <HTMLSelectElement>document.getElementById("sort-select");
        if(select) return select.value;

        return "";
    }

    function updateDates(isStart: boolean): ChangeEventHandler<HTMLInputElement> {
        return (): void => {
            if (isStart) {
                const date: HTMLInputElement = <HTMLInputElement>document.getElementById('startDate');
                startDate.set(<Date>date.valueAsDate);
            } else {
                const date: HTMLInputElement = <HTMLInputElement>document.getElementById('endDate');
                endDate.set(<Date>date.valueAsDate);
            }

            restrictThreadDate();
        }
    }
</script>

<aside id="sidebar">
    <div id="sidebar-header">
        <a href="/" id="sidebar-logo-link">
            <img src="/images/favicon.svg" alt="Forum2 Logo" />
        </a>

        <div id="sidebar-label">
            <h2>Forum2</h2>
            <h4>Community boards</h4>
        </div>
    </div>

    <form id="sidebar-search" >
        <label><input id="query" type="text" placeholder="Search..." /></label>
        <button onclick={searchThreads(document.getElementById("query")?.innerText)}>🔍</button>
    </form>

    <div id="sidebar-sort">
        <label for="sort-select">Sort by:</label>
        <select id="sort-select" onchange={sortThreads(getSelectValue())}>
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="comments">Most Comments</option>
        </select>
    </div>

    <div id="sidebar-timespan">
        <label for="startDate"></label>
        <input id="startDate" name="startDate" type="date" accept="mm/dd/yyyy" onchange={updateDates(true)}>

        <label for="endDate"></label>
        <input id="endDate" name="endDate" type="date" accept="mm/dd/yyyy" onchange={updateDates(false)}>
    </div>

    <nav id="sidebar-navigation">
        <h2 id="nav-boards">Boards</h2>
        <ul>
            <li><a id="ba1" role="button" tabindex="0" onmousedown={changeBoard("Main")} href="/">      Main       </a></li>
            <li><a id="ba2" role="button" tabindex="0" onmousedown={changeBoard("Anime")} href="/">     Anime      </a></li>
            <li><a id="ba3" role="button" tabindex="0" onmousedown={changeBoard("Cooking")} href="/">   Cooking    </a></li>
            <li><a id="ba4" role="button" tabindex="0" onmousedown={changeBoard("Fitness")} href="/">   Fitness    </a></li>
            <li><a id="ba5" role="button" tabindex="0" onmousedown={changeBoard("Technology")} href="/">Technology </a></li>
            <li><a id="ba6" role="button" tabindex="0" onmousedown={changeBoard("Vidya")} href="/">     Video Games</a></li>
            {#if isAdmin}
                <li><a id="ba7" role="button" tabindex="0" onmousedown={changeBoard("Admin")} href="/">Admin</a></li>
            {/if}
        </ul>

        <h2 id="nav-account">Account</h2>
        <ul>
            <li><a id="bb1" href="/create">Create Thread</a></li>

            {#await checkLogin() then response}
                {#if response}
                    <li><a id="bb2" href="/account">Profile</a></li>
                {:else}
                    <li><a id="bb3" href="/login">Login</a></li>
                    <li><a id="bb4" href="/signup">Sign Up</a></li>
                {/if}
            {/await}
        </ul>
    </nav>

    <div id="site-controls">
        <button id="grid-toggle">   ⧉</button>
        <button id="sidebar-toggle">☰</button>
    </div>
</aside>