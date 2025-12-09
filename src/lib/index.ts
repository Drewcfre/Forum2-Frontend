// TODO: Maybe split this file into smaller ones to make it more readable.

// TODO: Review image -> WebP -> Base64 conversion.
import {changeFont, changeStyle, changeTheme} from "$lib/ui.config.js";

export async function processImage(file: any) {
    const bitmap = await createImageBitmap(file);

    const { width, height } = bitmap;
    const maxSize = 800;

    let targetWidth = width;
    let targetHeight = height;

    if (width > maxSize || height > maxSize) {
        const ratio = Math.min(maxSize / width, maxSize / height);
        targetWidth = Math.round(width * ratio);
        targetHeight = Math.round(height * ratio);
    }

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext("2d");
    if(ctx) ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.8));

    const base64: any = await blobToBase64(blob);
    return {
        filename: `${crypto.randomUUID().toString()}.webp`,
        mimeType: "image/webp",
        data: base64.split(",")[1],
    };
}

function blobToBase64(blob: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

import {type Writable, writable} from "svelte/store";
import type {ChangeEventHandler, MouseEventHandler} from "svelte/elements";

// TODO: Change this to the deployed backend URL.
export const URL = "http://127.0.0.1:5001/forum2-1134f/us-central1/app";
export const selfURL = "http://localhost:4173";

export let selfQuery: Writable<boolean> = writable(false);

// region Board Details (Click to Expand)
export let currentBoard: string = "Main";
export let currentDesc: string = "A collection of popular posts from each board.";

export let threads: any[];
export let queriedThreads: Writable<any> = writable();

export const startDate: Writable<Date> = writable();
export const endDate: Writable<Date> = writable();

export let currentThread: Writable<any> = writable();

export let threadUUID: Writable<string> = writable("");
export let replyUUID: string;

export async function getThreads(): Promise<void> {
    await fetch(`${URL}/anon/catalog/${currentBoard}`, {method: 'GET'})
        .then((response) => response.json())
        .then(async (data) => threads = await data.body)
        .catch((error) => console.error("Error fetching threads:", error));

    queriedThreads.set(threads);
}

export function searchThreads(query: string): void {
    query = query.trim().toLowerCase();
    if(!query || query == "") queriedThreads.set(threads);
    else {
        queriedThreads.set(threads.filter(item =>
            (item.title && item.title.toLowerCase().includes(query)) ||
            (item.content && item.content.toLowerCase().includes(query))
        ));
    }

    console.log("Query made for " + query);
    console.log("Threads: " + JSON.stringify(queriedThreads));

    selfQuery.set(true);
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

        selfQuery.set(true);
    }
}

export function restrictThreadDate(): ChangeEventHandler<HTMLInputElement> {
    return (): void => {
        queriedThreads.set(threads.filter(item => (item.creationDate >= startDate && item.creationDate <= endDate)));
        selfQuery.set(true);
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
export let loggedIn: Writable<boolean> = writable(false);
export const isAdmin: boolean = false;

export let username: string = "";

export async function generateCaptcha(): Promise<any> {
    let svg: any;

    await fetch(`${URL}/tools/captcha`, {method: 'GET', credentials: "include"})
        .then((response): Promise<string> => response.text())
        .then(async (data): Promise<string> => svg = data);

    return svg;
}
// endregion

export async function getCustomization(): Promise<any> {
    const data = await fetch(`${URL}/tools/customization`, {method: 'GET', credentials: "include"})
        .then((response): Promise<any> => response.json());


}

export async function testGet() {
    let data;

    data = await fetch(`${URL}/user/test`,  {method: 'GET', credentials: "include"})
        .then((response): Promise<any> => response.json());

    return data;
}

export async function testPost() {
    let data;

    data = await fetch(`${URL}/user/test`,  {method: 'POST', credentials: "include"})
        .then((response): Promise<any> => response.json());

    return data;
}