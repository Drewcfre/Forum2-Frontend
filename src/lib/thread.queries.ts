import type {ChangeEventHandler, MouseEventHandler} from "svelte/elements";
import {get, writable, type Writable} from "svelte/store";

import {URL} from "$lib/index.js";

export let currentBoard: Writable<string> = writable("Main");
export let currentDesc: Writable<string> = writable("A board for general, non-specific topics.");

export function changeBoard(board: string): MouseEventHandler<HTMLAnchorElement> {
    return async (): Promise<void> => {
        console.log("Changing board...");

        currentBoard.set(board);

        switch (board) {
            case "Main":
                currentDesc.set("A board for general, non-specific topics.");
                break;
            case "Anime":
                currentDesc.set("For all things anime and manga.");
                break;
            case "Cooking":
                currentDesc.set("A board for sharing favorite foods, recipes, and cooking tips.");
                break;
            case "Fitness":
                currentDesc.set("Post exercise tips, tricks, and stories here.");
                break;
            case "Technology":
                currentDesc.set("Discuss software, hardware, programming, and other computing topics here.");
                break;
            case "Video Games":
                currentDesc.set("From RPGs, to Boomer Shooters; this board is dedicated to any and all video games.");
                break;
        }

        await getThreads();
    }
}

export let selfQuery: boolean = false;

export let threads: any;
export let queriedThreads: Writable<any> = writable();

export const startDate: Writable<Date> = writable();
export const endDate: Writable<Date> = writable();

export let currentThread: Writable<any> = writable();

export let threadUUID: Writable<string> = writable("");
export let replyUUID: string;

export async function getThreads(): Promise<void> {
    // if (!selfQuery) {
        await fetch(`${URL}/anon/catalog/${get(currentBoard)}`, {method: 'GET'})
            .then((response) => response.json())
            .then(async (data) => threads = Object.values(data.body.board))
            .catch((error) => console.error("Error fetching threads:", error));

        queriedThreads.set(threads);
    // }
    // else selfQuery = false;
}

export function searchThreads(query: string): void {
    query = query.trim().toLowerCase();
    if(!query || query == "") queriedThreads.set(threads);
    else {
        queriedThreads.set(threads.filter((item: any) =>
            (item.title && item.title.toLowerCase().includes(query)) ||
            (item.content && item.content.toLowerCase().includes(query))
        ));
    }

    console.log("Query made for " + query);
    console.log("Threads: " + JSON.stringify(queriedThreads));

    selfQuery = true;
}

export function sortThreads(by: string): ChangeEventHandler<HTMLSelectElement> {
    return (): void => {
        switch (by) {
            case 'recent':
                queriedThreads.set(threads.sort((a: any, b: any): any => (a.creationDate > b.creationDate) ? 1 : -1));
                break;
            case 'popular':
                queriedThreads.set(threads.sort((a: any, b: any): any => (a.rating > b.rating) ? 1 : -1));
                break;
            case 'comments':
                queriedThreads.set(threads.sort((a: any, b: any): any => (a.replies.size > b.replies.size) ? 1 : -1));
                break;
        }

        selfQuery = true;
    }
}

export function restrictThreadDate(): ChangeEventHandler<HTMLInputElement> {
    return (): void => {
        queriedThreads.set(threads.filter((item: any) => (item.creationDate >= startDate && item.creationDate <= endDate)));
        selfQuery = true;
    }
}