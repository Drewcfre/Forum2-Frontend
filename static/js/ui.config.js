function changeTheme(theme) {
    let themeHex = [ '#000', '#222', '#CCC', '#FFF', '#358', '#FB4', '#797' ]

    switch (theme) {
        case 'light':
            themeHex = [ '#FFF', '#DDD', '#333', '#000', '#68A', '#FA3', '#ACA' ]
            break;
        case 'low-contrast':
            themeHex = [ '#111', '#222', '#888', '#AAA', '#247', '#EA3', '#686' ]
            break;
        case 'slate':
            themeHex = [ '#233', '#344', '#9AA', '#EFF', '#35A', '#BC4', '#4A7' ]
            break;
        case 'garden':
            themeHex = [ '#242', '#353', '#ADA', '#EFE', '#4B6', '#9CF', '#8F8' ]
            break;
    }

    document.documentElement.style.setProperty('--primary-color',   themeHex[0])
    document.documentElement.style.setProperty('--light-primary',   themeHex[1])
    document.documentElement.style.setProperty('--light-secondary', themeHex[2])
    document.documentElement.style.setProperty('--secondary-color', themeHex[3])

    document.documentElement.style.setProperty('--accent-color-one',   themeHex[4])
    document.documentElement.style.setProperty('--accent-color-two',   themeHex[5])
    document.documentElement.style.setProperty('--accent-color-three', themeHex[6])
}

function changeFont(font) { document.documentElement.style.setProperty('--primary-font', font) }

function changeStyle(style) {
    const headers = document.getElementsByTagName('header')
    for(let header of headers) { header.classList.remove('flat-backdrop', 'gradient-backdrop', 'bubble-background', 'triangle-pattern') }

    let styleClass = 'triangle-pattern'
    switch(style) {
        case 'flat':
            styleClass = 'flat-backdrop'
            break
        case 'gradient':
            styleClass = 'gradient-backdrop'
            break
    }
    for(let header of headers) { header.classList.add(styleClass) }
}

function randomizeUI() {
    const themes = [ 'classic', 'light', 'low-contrast', 'slate', 'garden' ]
    const fonts = []
    const styles = []
}