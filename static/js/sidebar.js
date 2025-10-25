document.getElementById('sidebar-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('sidebar-collapsed')

    document.getElementById('sidebar-label'   ).classList.toggle('visibility-hidden')
    document.getElementById('sidebar-search'  ).classList.toggle('visibility-hidden')
    document.getElementById('sidebar-sort'    ).classList.toggle('visibility-hidden')
    document.getElementById('sidebar-timespan').classList.toggle('visibility-hidden')

    document.getElementById('grid-toggle'   ).classList.toggle('visibility-hidden')
    document.getElementById('sidebar-toggle').classList.toggle('button-collapsed')

    document.getElementById('nav-boards').classList.toggle('visibility-hidden')

    // TODO: At some point, replace shortened versions with custom SVG graphics.

    const anchorTags = [
        [document.getElementById('ba1'), "Main", "Main"],
        [document.getElementById('ba2'), "Anime", "Anime"],
        [document.getElementById('ba3'), "Cook", "Cooking"],
        [document.getElementById('ba4'), "Fit", "Fitness"],
        [document.getElementById('ba5'), "Tech", "Technology"],
        [document.getElementById('ba6'), "Vidya", "Video Games"],

        [document.getElementById('bb1'), "Create", "Create Thread"],
    ]

    const profileAnchor = document.getElementById('bb2')
    if(profileAnchor) anchorTags.push([profileAnchor, "Prof", "Profile"])

    const loginAnchor = document.getElementById('bb3')
    if(loginAnchor) anchorTags.push([loginAnchor, "Login", "Login"])

    const signupAnchor = document.getElementById('bb4')
    if(signupAnchor) anchorTags.push([signupAnchor, "S Up", "Sign Up"])

    const adminBoard = document.getElementById('ba7')
    if(adminBoard) anchorTags.push([adminBoard, "Admin", "Admin"])


    let anchorIndex = 2
    if(document.getElementById('nav-boards').classList.contains('visibility-hidden')) anchorIndex = 1
    anchorTags.forEach(anchorTag => anchorTag[0].innerText = anchorTag[anchorIndex])

    document.getElementById('nav-account').classList.toggle('visibility-hidden')

    document.getElementById('site-header' ).classList.toggle('header-expanded')
    document.getElementById('main-content').classList.toggle('content-expanded')
});

document.getElementById('grid-toggle').addEventListener('click', () => {
    document.getElementById('main-content').classList.toggle('content-grid')

    if(document.getElementById('thread-info').style.display === 'flex') {
        document.getElementById('thread-info').style.display = 'block';
    } else document.getElementById('thread-info').style.display = 'flex';
})