import type {MouseEventHandler} from "svelte/elements";
import {setThemeCustomizations, setFontCustomizations, setStyleCustomizations} from "../routes/catalog/catalog.functions.js";

export async function applyTheme(theme: string): Promise<void> {
    await setThemeCustomizations(theme);

    let themeHex: string[];
    switch (theme) {
        case 'light':
            themeHex = ['#FFF', '#DDD', '#333', '#000', '#68A', '#FA3', '#ACA'];
            break;
        case 'low-contrast':
            themeHex = ['#111', '#222', '#888', '#AAA', '#247', '#EA3', '#686'];
            break;
        case 'slate':
            themeHex = ['#233', '#344', '#9AA', '#EFF', '#35A', '#BC4', '#4A7'];
            break;
        case 'garden':
            themeHex = ['#242', '#353', '#ADA', '#EFE', '#4B6', '#9CF', '#8F8'];
            break;
        default:
            themeHex = ['#000', '#222', '#CCC', '#FFF', '#358', '#FB4', '#797'];
    }

    const root = document.documentElement.style;
    root.setProperty('--primary-color', themeHex[0]);
    root.setProperty('--light-primary', themeHex[1]);
    root.setProperty('--light-secondary', themeHex[2]);
    root.setProperty('--secondary-color', themeHex[3]);
    root.setProperty('--accent-color-one', themeHex[4]);
    root.setProperty('--accent-color-two', themeHex[5]);
    root.setProperty('--accent-color-three', themeHex[6]);
}

export const changeTheme = (theme: string): MouseEventHandler<HTMLAnchorElement> => {
    return async (): Promise<void> => await applyTheme(theme);
}

export async function applyFont(font: string): Promise<void> {
    await setFontCustomizations(font);
    document.documentElement.style.setProperty('--primary-font', font);
}

export const changeFont = (font: string): MouseEventHandler<HTMLAnchorElement> => {
    return async (): Promise<void> => await applyFont(font);
}

export async function applyStyle(style: string): Promise<void> {
    await setStyleCustomizations(style);

    const elements = [
        document.getElementById('site-header'),
        document.getElementById('post-create'),
        document.getElementById('login-form'),
    ];

    const threads = document.getElementsByTagName('article');
    for (let i = 0; i < threads.length; i++) elements.push(threads.item(i));

    const forms = document.getElementsByClassName('centered-form');
    for (let i = 0; i < forms.length; i++) elements.push(forms.item(i) as HTMLElement);

    elements.forEach((element) => {
        element?.classList.remove('flat-backdrop', 'gradient-backdrop', 'triangle-pattern');
        element?.classList.add(((): string => {
            switch (style) {
                case 'flat':
                    return 'flat-backdrop';
                case 'gradient':
                    return 'gradient-backdrop';
                default:
                    return 'triangle-pattern';
            }
        })());
    });
}

export const changeStyle = (style: string): MouseEventHandler<HTMLAnchorElement> => {
    return async (): Promise<void> => await applyStyle(style);
}