import {type Writable, writable} from "svelte/store";
import type {ChangeEventHandler, MouseEventHandler} from "svelte/elements";

// TODO: Change this to the deployed backend URL.
export const URL = "http://127.0.0.1:5001/forum2-1134f/us-central1/app";
export const selfURL = "http://localhost:4173";


// region Board Details (Click to Expand)
export let currentBoard: string = "Main";
export let currentDesc: string = "A collection of popular posts from each board.";

export let threads: any;
export let queriedThreads: any;

export const startDate: Writable<Date> = writable();
export const endDate: Writable<Date> = writable();

export let threadUUID: string;
export let replyUUID: string;

export async function getThreads(): Promise<void> {
    await fetch(`${URL}/anon/catalog/${currentBoard}`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => threads = data.body)
        .catch((error) => console.error("Error fetching threads:", error));

    queriedThreads = threads
}

export const searchThreads = (query: string | undefined): MouseEventHandler<HTMLButtonElement> => {
    return (): void => {
        if(!query) queriedThreads = threads;
        else queriedThreads = threads.filter((item: any) => item.toString().includes(query));
    };
}

export function sortThreads(by: string): ChangeEventHandler<HTMLSelectElement> {
    return (): void => {
        switch (by) {
            case 'Most Recent':
                queriedThreads = queriedThreads.sort((a: any, b: any): any => (a.creationDate > b.creationDate) ? 1 : -1);
                break;
            case 'Most Popular':
                queriedThreads = queriedThreads.sort((a: any, b: any): any => (a.rating > b.rating) ? 1 : -1);
                break;
            case 'Most Comments':
                queriedThreads = queriedThreads.sort((a: any, b: any): any => (a.replies.size > b.replies.size) ? 1 : -1);
                break;
        }
    }
}

export function restrictThreadDate(): ChangeEventHandler<HTMLInputElement> {
    return (): void => {
        queriedThreads = threads.filter((item: any): any => (item.creationDate >= startDate && item.creationDate <= endDate));
    }
}

export function changeBoard(board: string): MouseEventHandler<HTMLAnchorElement> {
    return async (): Promise<void> => {
        currentBoard = board;
        await getThreads();
    }
}
// endregion

// region User Details (Click to Expand)
export const loggedIn: boolean = false;
export const isAdmin: boolean = false;

export const username: string = "";



export const captcha: Writable<any> = writable();

export async function generateCaptcha(): Promise<string> {
    return await fetch(`${URL}/tools/captcha`, {method: 'GET'})
        .then((response): ReadableStream => <ReadableStream>response.body)
        .then(async (body): Promise<string> => {
            const reader = body.getReader();
            const decoder = new TextDecoder('utf-8');

            let svgText: string = "";
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                svgText += decoder.decode(value, { stream: true });
            }
            svgText += decoder.decode();

            return svgText;
        });
}

export async function checkLogin(): Promise<boolean> {
    return await fetch(`${URL}/user/check`, {method: 'GET'})
        .then((response: any): any => response.json().body.loggedIn)
}