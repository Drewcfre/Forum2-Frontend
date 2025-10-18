<script lang="ts">
    import {changeBoard, checkLogin, searchThreads, sortThreads} from "$lib/index.js";
</script>

<aside id="sidebar">
    <div id="sidebar-header">
        <a href="/" id="sidebar-logo-link">
            <img src="../../static/favicon.svg" alt="Forum2 Logo" />
        </a>

        <div id="sidebar-label">
            <h2>Forum2</h2>
            <h4>Community boards</h4>
        </div>
    </div>

    <form id="sidebar-search" >
        <label><input id="query" type="text" placeholder="Search..." /></label>
        <button onclick={searchThreads(document.getElementById("query"))}>🔍</button>
    </form>

    <div id="sidebar-sort">
        <label for="sort-select">Sort by:</label>
        <select id="sort-select" onchange={sortThreads(document.getElementById("sort-select"))}>
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="comments">Most Comments</option>
        </select>
    </div>

    <div id="sidebar-timespan">
        <label for="startDate"></label>
        <input id="startDate" name="startDate" type="date" accept="mm/dd/yyyy">

        <label for="endDate"></label>
        <input id="endDate" name="endDate" type="date" accept="mm/dd/yyyy">
    </div>

    <nav id="sidebar-navigation">
        <h2>Boards</h2>
        <ul>
            <li><a id="ba1" role="button" tabindex="0" onmousedown={changeBoard("Main")}>      Main       </a></li>
            <li><a id="ba2" role="button" tabindex="0" onmousedown={changeBoard("Anime")}>     Anime      </a></li>
            <li><a id="ba3" role="button" tabindex="0" onmousedown={changeBoard("Cooking")}>   Cooking    </a></li>
            <li><a id="ba4" role="button" tabindex="0" onmousedown={changeBoard("Fitness")}>   Fitness    </a></li>
            <li><a id="ba5" role="button" tabindex="0" onmousedown={changeBoard("Technology")}>Technology </a></li>
            <li><a id="ba6" role="button" tabindex="0" onmousedown={changeBoard("Vidya")}>     Video Games</a></li>
        </ul>

        <h2>Account</h2>
        <ul>
            <li><a href="/create">Create Thread</a></li>

            <li><a href="/account">
                {#if checkLogin()}
                    Profile
                {:else}
                    Login
                {/if}
            </a></li>
        </ul>
    </nav>

    <div id="site-controls">
        <button id="grid-toggle"   >⧉</button>
        <button id="sidebar-toggle">☰</button>
    </div>
</aside>