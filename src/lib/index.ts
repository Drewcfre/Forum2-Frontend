import {type Writable, writable} from "svelte/store";
import type {ChangeEventHandler, MouseEventHandler} from "svelte/elements";

const URL = "http://localhost:8080"; // TODO: Change this to the deployed backend URL.

export const currentBoard: string = "Main";
export const currentDesc: string = "A collection of popular posts from each board.";

export const loggedIn: boolean = false;

export const threads: Writable<unknown> = writable();

export async function getThreads() {
    await fetch(`${URL}/anon/catalog/${currentBoard}`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => threads.set(data))
        .catch((error) => console.error("Error fetching threads:", error));
}

// TODO: Implement search functionality. Sidebar.svelte should already have the necessary UI elements.
export const searchThreads = (query: HTMLElement | null): MouseEventHandler<HTMLButtonElement> => {
    return (): void => {
        const searchQuery: string = query?.textContent ?? "";
        console.log("NOT IMPLEMENTED: Search for threads with query:", searchQuery);
    };
}

// TODO: Implement sort functionality. Sidebar.svelte should already have the necessary UI elements.
export function sortThreads(by: HTMLElement | null): ChangeEventHandler<HTMLSelectElement> {
    return (): void => {
        const sortBy: string = by?.textContent ?? "";
        console.log("NOT IMPLEMENTED: Sort threads by:", sortBy);
    }
}

// TODO: Implement method for date range filtering. Make sure to update Sidebar.svelte accordingly.

// TODO: Implement board change functionality. Sidebar.svelte should already have the necessary UI elements.
export function changeBoard(Board: string): MouseEventHandler<HTMLAnchorElement> {
    return (): void => {
        console.log("NOT IMPLEMENTED: Change board to:", Board);
    }
}

export function checkLogin(): boolean {
    console.log("NOT IMPLEMENTED: Check login status.");
    return true;
}