import type {MouseEventHandler} from "svelte/elements";

export const changeTheme = (theme: string): MouseEventHandler<HTMLAnchorElement> => {
    return (): void => {
        const themeHex: string[] = ((): string[] => {
            switch (theme) {
                case 'light':
                    return ['#FFF', '#DDD', '#333', '#000', '#68A', '#FA3', '#ACA']
                case 'low-contrast':
                    return ['#111', '#222', '#888', '#AAA', '#247', '#EA3', '#686']
                case 'slate':
                    return ['#233', '#344', '#9AA', '#EFF', '#35A', '#BC4', '#4A7']
                case 'garden':
                    return ['#242', '#353', '#ADA', '#EFE', '#4B6', '#9CF', '#8F8']
                default:
                    return ['#000', '#222', '#CCC', '#FFF', '#358', '#FB4', '#797']
            }
        })()

        document.documentElement.style.setProperty('--primary-color', themeHex[0])
        document.documentElement.style.setProperty('--light-primary', themeHex[1])
        document.documentElement.style.setProperty('--light-secondary', themeHex[2])
        document.documentElement.style.setProperty('--secondary-color', themeHex[3])

        document.documentElement.style.setProperty('--accent-color-one', themeHex[4])
        document.documentElement.style.setProperty('--accent-color-two', themeHex[5])
        document.documentElement.style.setProperty('--accent-color-three', themeHex[6])
    }
}

export const changeFont = (font: string): MouseEventHandler<HTMLAnchorElement> => {
    return (): void => document.documentElement.style.setProperty('--primary-font', font)
}

export const changeStyle = (style: string): MouseEventHandler<HTMLAnchorElement> => {
    return (): void => {
        const elements = [
            document.getElementById('site-header'),
            document.getElementById('post-create'),
            document.getElementById('login-form'),
        ]

        const threads = document.getElementsByTagName('article')
        for (let i = 0; i < threads.length; i++) elements.push(threads.item(i))

        const forms = document.getElementsByClassName('centered-form')
        for (let i = 0; i < forms.length; i++) elements.push(forms.item(i) as HTMLElement)

        elements.forEach((element) => {
            element?.classList.remove('flat-backdrop', 'gradient-backdrop', 'triangle-pattern')
            element?.classList.add(((): string => {
                switch (style) {
                    case 'flat':
                        return 'flat-backdrop'
                    case 'gradient':
                        return 'gradient-backdrop'
                    default:
                        return 'triangle-pattern'
                }
            })())
        })
    }
}