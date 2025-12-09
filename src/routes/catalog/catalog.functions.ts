import {URL} from "$lib/index.js";
import {applyTheme, applyFont, applyStyle} from "$lib/ui.config.js";

export async function setCookiesNotice(): Promise<void> {
    await fetch(`${URL}/tools/notice`, {method: 'POST', credentials: "include"});
}

export async function checkCookieNotice(): Promise<boolean> {
    let data;

    await fetch(`${URL}/tools/notice`, {method: 'GET', credentials: "include"})
        .then((response): Promise<any> => response.json())
        .then(async (body) => data = body.cookieNotice);

    return (data === "true");
}

export async function setThemeCustomizations(theme: string): Promise<void> {
    await fetch(`${URL}/tools/theme/${theme}`, {method: 'POST', credentials: "include"});
}

export async function setFontCustomizations(font: string): Promise<void> {
    await fetch(`${URL}/tools/font/${font}`, {method: 'POST', credentials: "include"});
}

export async function setStyleCustomizations(style: string): Promise<void> {
    await fetch(`${URL}/tools/style/${style}`, {method: 'POST', credentials: "include"});
}

export async function getCustomizations(): Promise<void> {
    let data = {
        "theme": "classic",
        "font": "Monospace",
        "style": "classic",
    };

    await fetch(`${URL}/tools/customization`, {method: 'GET', credentials: "include"})
        .then((response): Promise<any> => response.json())
        .then(async (body) => data = body);

    await applyTheme(data.theme);
    await applyFont(data.font);
    await applyStyle(data.style);
}