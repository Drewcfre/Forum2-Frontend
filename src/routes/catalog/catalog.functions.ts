import {URL} from "$lib/index.js";
import {changeFont, changeStyle, changeTheme} from "$lib/ui.config.js";

export async function setCookiesNotice(): Promise<void> {
    await fetch(`${URL}/tools/notice`, {method: 'POST', credentials: "include"});
}

export async function checkCookieNotice(): Promise<boolean> {
    const data = await fetch(`${URL}/tools/notice`, {method: 'GET', credentials: "include"})
        .then((response): Promise<any> => response.json());

    return data.cookieNotice;
}

export async function getCustomizations(): Promise<void> {
    const data = await fetch(`${URL}/tools/notice`, {method: 'GET', credentials: "include"})
        .then((response): Promise<any> => response.json());

    changeTheme(data.theme);
    changeFont(data.font || "Monospace");
    changeStyle(data.style);
}