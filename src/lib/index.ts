// TODO: Maybe split this file into smaller ones to make it more readable.

// TODO: Review image -> WebP -> Base64 conversion.
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

// TODO: Change this to the deployed backend URL.
export const URL = "http://127.0.0.1:5001/forum2-1134f/us-central1/app";
export const selfURL = "http://localhost:4173";




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

// export async function testGet() {
//     let data;
//
//     data = await fetch(`${URL}/user/test`,  {method: 'GET', credentials: "include"})
//         .then((response): Promise<any> => response.json());
//
//     return data;
// }
//
// export async function testPost() {
//     let data;
//
//     data = await fetch(`${URL}/user/test`,  {method: 'POST', credentials: "include"})
//         .then((response): Promise<any> => response.json());
//
//     return data;
// }