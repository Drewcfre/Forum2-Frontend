<script lang="ts">
    import {changeBoard, endDate, loggedIn, isAdmin, restrictThreadDate, searchThreads, sortThreads, startDate} from "$lib/index.js";
    import type {ChangeEventHandler, MouseEventHandler} from "svelte/elements";

    function getQuery(): MouseEventHandler<HTMLButtonElement> {
        return (): void => {
            const query = <HTMLInputElement>document.getElementById("query");
            searchThreads(query.value);
        }
    }

    function sortBySelect(): ChangeEventHandler<HTMLSelectElement> {
        return (): void => {
            const sortBy = <HTMLSelectElement>document.getElementById("sort-select");
            sortThreads(sortBy.value);
        }
    }

    function updateDates(isStart: boolean): ChangeEventHandler<HTMLInputElement> {
        return (): void => {
            if (isStart) {
                const date = <HTMLInputElement>document.getElementById('startDate');
                startDate.set(<Date>date.valueAsDate);
            } else {
                const date = <HTMLInputElement>document.getElementById('endDate');
                endDate.set(<Date>date.valueAsDate);
            }

            restrictThreadDate();
        }
    }

    export function setLoggedIn(state: boolean): MouseEventHandler<HTMLAnchorElement> {
        return async (): Promise<void> => loggedIn.set(state);
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
        <button type="button" onclick={getQuery()}>🔍</button>
    </form>

    <div id="sidebar-sort">
        <label for="sort-select">Sort by:</label>
        <select id="sort-select" onchange={sortBySelect()}>
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="comments">Most Comments</option>
        </select>
    </div>

    <div id="sidebar-timespan">
        <label for="startDate"></label>
        <input id="startDate" name="startDate" type="date" accept="mm/dd/yyyy" onclick={updateDates(true)}>

        <label for="endDate"></label>
        <input id="endDate" name="endDate" type="date" accept="mm/dd/yyyy" onclick={updateDates(false)}>
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

            {#if $loggedIn}
                <li><a id="bb2" href="/account">Profile</a></li>
                <li><a id="bb3" role="button" tabindex="0" onmousedown={setLoggedIn(false)} href="/">Logout</a></li>
            {:else}
                <li><a id="bb4" href="/login">Login</a></li>
                <li><a id="bb5" href="/signup">Sign Up</a></li>
            {/if}
        </ul>
    </nav>

    <div id="site-controls">
        <button id="grid-toggle">   ⧉</button>
        <button id="sidebar-toggle">☰</button>
    </div>
</aside>